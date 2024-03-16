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

export default async function deploySafe(
  privateKeys: string[],
  sponsoredUserOperation: UserOperation
) {
  const signers: PrivateKeyAccount[] = [];
  for (let i = 1; i <= privateKeys.length; i++) {
    let privateKey = "0x" + privateKeys[i];
    let signer = privateKeyToAccount(privateKey as Hash);
    signers.push(signer);
  }

  let signatures = [];

  const safeAddresses = (
    SAFE_ADDRESSES_MAP as Record<string, Record<string, any>>
  )[safeVersion];
  let chainAddresses;
  if (safeAddresses) {
    chainAddresses = safeAddresses[chainID];
  }

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

  await submitUserOperationPimlico(
    sponsoredUserOperation,
    bundlerClient,
    entryPointAddress,
    chain
  );
}
