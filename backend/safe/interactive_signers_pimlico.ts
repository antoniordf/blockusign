import * as readline from "readline";

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
import { polygonMumbai } from "viem/chains";
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

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt user for input
function promptUser(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main function to perform operations
async function main() {
  // Prompt user for inputs
  const numSigners = parseFloat(await promptUser("N of signers?: "));

  // Check if inputs are valid numbers
  if (isNaN(numSigners)) {
    console.log("Please enter valid numbers.");
    process.exit(0);
  }

  // Array to store signer addresses
  const signerAddresses: string[] = [];

  // Loop to prompt for signer addresses
  for (let i = 1; i <= numSigners; i++) {
    const signerAddress = await promptUser(
      `Enter the address of signer ${i}: `
    );
    signerAddresses.push(signerAddress);
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
  if (chain == "mumbai") {
    bundlerClient = createClient({
      transport: http(
        `https://api.pimlico.io/v1/${chain}/rpc?apikey=${apiKey}`
      ),
      chain: polygonMumbai,
    })
      .extend(bundlerActions(ENTRYPOINT_ADDRESS_V06))
      .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V06));

    publicClient = createPublicClient({
      transport: http(rpcURL),
      chain: polygonMumbai,
    });

    pimlicoPaymasterClient = createClient({
      transport: http(
        `https://api.pimlico.io/v2/${chain}/rpc?apikey=${apiKey}`
      ),
      chain: polygonMumbai,
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
    "Address Link: https://mumbai.polygonscan.com/address/" + senderAddress
  );

  const contractCode = await publicClient.getBytecode({
    address: senderAddress,
  });

  if (contractCode) {
    console.log("\nThe Safe is already deployed.");
    process.exit(0);
  } else {
    console.log(
      "\nDeploying a new Safe and executing calldata passed with it (if any)."
    );
  }

  const newNonce = await getAccountNonce(publicClient as Client, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    sender: senderAddress,
  });

  // Calldata for Increase() in contract - Mumbai testnet
  let txCallData = encodeCallData({
    to: "0x6EE6DEAC2eB4a7753381cbcdbD33eda1A243E777",
    data: "0xe8927fbc",
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

  // --- SIGN ---
  const signers: PrivateKeyAccount[] = [];
  for (let i = 1; i <= numSigners; i++) {
    let privateKey =
      "0x" + (await promptUser(`Enter private key of signer ${i}: `));
    let signer = privateKeyToAccount(privateKey as Hash);
    signers.push(signer);
  }

  let signatures = [];

  for (let i = 0; i < signers.length; i++) {
    let sig = await signUserOp(
      sponsoredUserOperation,
      signers[i],
      chainID,
      chainAddresses.SAFE_4337_MODULE_ADDRESS
    );
    signatures.push(sig);
  }

  let combinedSignatures = await combineSignatures(signatures);
  console.log("combinedSignatures: ", combinedSignatures);
  sponsoredUserOperation.signature = combinedSignatures;

  // --- SUBMIT ---
  await submitUserOperationPimlico(
    sponsoredUserOperation,
    bundlerClient,
    entryPointAddress,
    chain
  );

  // Close readline interface
  rl.close();
}

// Call the main function
main().catch((err) => {
  console.error(err);
});
