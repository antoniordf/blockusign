import dotenv from "dotenv";
import {
  getAccountNonce,
  bundlerActions,
  ENTRYPOINT_ADDRESS_V06,
} from "permissionless";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import {
  Client,
  Hash,
  createClient,
  createPublicClient,
  http,
  PrivateKeyAccount,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { SAFE_ADDRESSES_MAP } from "./utils/safe.ts";
import { UserOperation, submitUserOperationPimlico } from "./utils/userOps.ts";
import { encodeCallData } from "./utils/safe.ts";
import {
  multiGetAccountInitCode,
  multiGetAccountAddress,
  signUserOp,
  combineSignatures,
} from "./multiSignerSafes.ts";

dotenv.config();

const entryPointAddress = process.env
  .PIMLICO_ENTRYPOINT_ADDRESS as `0x${string}`;
const multiSendAddress = process.env.PIMLICO_MULTISEND_ADDRESS as `0x${string}`;
const saltNonce = BigInt(process.env.PIMLICO_NONCE as string);
const chain = process.env.PIMLICO_CHAIN;
const chainID = Number(process.env.PIMLICO_CHAIN_ID);
const safeVersion = process.env.SAFE_VERSION as string;
const rpcURL = process.env.PIMLICO_RPC_URL;
const policyID = process.env.PIMLICO_GAS_POLICY;
const apiKey = process.env.PIMLICO_API_KEY;
const erc20PaymasterAddress = process.env
  .PIMLICO_ERC20_PAYMASTER_ADDRESS as `0x${string}`;
const usdcTokenAddress = process.env
  .PIMLICO_USDC_TOKEN_ADDRESS as `0x${string}`;

// Propose safe function to perform operations
export default async function proposeSafe(
  signerAddresses: string[]
): Promise<UserOperation> {
  // Prompt user for inputs
  const numSigners = signerAddresses.length;

  // Check if inputs are valid numbers
  if (isNaN(numSigners)) {
    console.log("Please enter valid numbers.");
  }

  let owners = signerAddresses;
  let threshold = BigInt(numSigners);

  const safeAddresses = (
    SAFE_ADDRESSES_MAP as Record<string, Record<string, any>>
  )[safeVersion];
  let chainAddresses;
  if (safeAddresses) {
    chainAddresses = safeAddresses[chainID];
  }

  let bundlerClient;
  let publicClient;
  let pimlicoPaymasterClient;
  if (chain == "sepolia") {
    bundlerClient = createClient({
      transport: http(
        `https://api.pimlico.io/v1/${chain}/rpc?apikey=${apiKey}`
      ),
      chain: sepolia,
    })
      .extend(bundlerActions(ENTRYPOINT_ADDRESS_V06))
      .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V06));

    publicClient = createPublicClient({
      transport: http(rpcURL),
      chain: sepolia,
    });

    pimlicoPaymasterClient = createClient({
      transport: http(
        `https://api.pimlico.io/v2/${chain}/rpc?apikey=${apiKey}`
      ),
      chain: sepolia,
    }).extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V06));
  } else {
    throw new Error(
      "Current code only support limited networks. Please make required changes if you want to use custom network."
    );
  }

  const initCode = await multiGetAccountInitCode({
    owners: owners,
    threshold: threshold,
    addModuleLibAddress: chainAddresses.ADD_MODULES_LIB_ADDRESS,
    safe4337ModuleAddress: chainAddresses.SAFE_4337_MODULE_ADDRESS,
    safeProxyFactoryAddress: chainAddresses.SAFE_PROXY_FACTORY_ADDRESS,
    safeSingletonAddress: chainAddresses.SAFE_SINGLETON_ADDRESS,
    saltNonce: saltNonce,
    multiSendAddress: multiSendAddress,
    erc20TokenAddress: usdcTokenAddress,
    paymasterAddress: erc20PaymasterAddress,
  });

  console.log("\nInit Code Created.", initCode);

  // We need to calculate the address of the safe account (as it has not been created yet)
  const senderAddress = await multiGetAccountAddress({
    client: publicClient,
    owners: owners,
    threshold: threshold,
    addModuleLibAddress: chainAddresses.ADD_MODULES_LIB_ADDRESS,
    safe4337ModuleAddress: chainAddresses.SAFE_4337_MODULE_ADDRESS,
    safeProxyFactoryAddress: chainAddresses.SAFE_PROXY_FACTORY_ADDRESS,
    safeSingletonAddress: chainAddresses.SAFE_SINGLETON_ADDRESS,
    saltNonce: saltNonce,
    multiSendAddress: multiSendAddress,
    erc20TokenAddress: usdcTokenAddress,
    paymasterAddress: erc20PaymasterAddress,
  });
  console.log("\nCounterfactual Sender Address Created:", senderAddress);
  console.log(
    "Address Link: https://sepolia.etherscan.io/address/" + senderAddress
  );

  const contractCode = await publicClient.getBytecode({
    address: senderAddress,
  });

  if (contractCode) {
    console.log("\nThe Safe is already deployed.");
  } else {
    console.log(
      "\nProposing a new Safe with calldata passed with it."
    );
  }

  const newNonce = await getAccountNonce(publicClient as Client, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    sender: senderAddress,
  });

  // Calldata for callChainLink() in contract
  let txCallData = encodeCallData({
      to: "0xc75af90312a4c66c294FDD32CBb56C705A33D5D7",
      data: "0x27b43b13",
      value: 0n,
  });

  // --- PROPOSE TRANSACTION (Safe creation + transaction) ---

  const sponsoredUserOperation: UserOperation = {
    sender: senderAddress,
    nonce: newNonce,
    initCode: contractCode ? "0x" : initCode,
    callData: txCallData,
    callGasLimit: 1n, // All Gas Values will be filled by Estimation Response Data.
    verificationGasLimit: 1n,
    preVerificationGas: 1n,
    maxFeePerGas: 1n,
    maxPriorityFeePerGas: 1n,
    paymasterAndData: erc20PaymasterAddress,
    signature: "0x",
  };

  // --- SET GAS PARAMS ---
  const gasEstimate = await bundlerClient.estimateUserOperationGas({
    userOperation: sponsoredUserOperation,
  });
  const maxGasPriceResult = await bundlerClient.getUserOperationGasPrice();

  sponsoredUserOperation.callGasLimit = gasEstimate.callGasLimit;
  sponsoredUserOperation.verificationGasLimit =
    gasEstimate.verificationGasLimit;
  sponsoredUserOperation.preVerificationGas = gasEstimate.preVerificationGas;
  sponsoredUserOperation.maxFeePerGas = maxGasPriceResult.fast.maxFeePerGas;
  sponsoredUserOperation.maxPriorityFeePerGas =
    maxGasPriceResult.fast.maxPriorityFeePerGas;

  // --- SPONSOR OPERATION ---
  const sponsorResult = await pimlicoPaymasterClient.sponsorUserOperation({
    userOperation: sponsoredUserOperation,
    sponsorshipPolicyId: policyID,
  });
  sponsoredUserOperation.callGasLimit = sponsorResult.callGasLimit;
  sponsoredUserOperation.verificationGasLimit =
    sponsorResult.verificationGasLimit;
  sponsoredUserOperation.preVerificationGas = sponsorResult.preVerificationGas;
  sponsoredUserOperation.paymasterAndData = sponsorResult.paymasterAndData;

  return sponsoredUserOperation;
}
