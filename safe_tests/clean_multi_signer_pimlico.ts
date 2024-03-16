import dotenv from 'dotenv'
import { getAccountNonce, bundlerActions, ENTRYPOINT_ADDRESS_V06 } from 'permissionless'
import { pimlicoBundlerActions, pimlicoPaymasterActions } from 'permissionless/actions/pimlico'
import { setTimeout } from 'timers/promises'
import { Client, Hash, createClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli, polygonMumbai } from 'viem/chains'
import { SAFE_ADDRESSES_MAP, getAccountAddress, getAccountInitCode } from './utils/safe'
import { UserOperation, submitUserOperationPimlico, signUserOperation, txTypes, createCallData } from './utils/userOps'
import { getERC20Decimals, getERC20Balance, transferERC20Token } from './utils/erc20'
import { encodeCallData } from './utils/safe'

import {multiGetAccountInitCode, multiGetAccountAddress, multiSignUserOperation} from './multiSignerSafes'

dotenv.config()
const paymaster = 'pimlico'
const privateKey = process.env.PRIVATE_KEY
const privateKey2 = process.env.PRIVATE_KEY2
const privateKey3 = process.env.PRIVATE_KEY3

const entryPointAddress = process.env.PIMLICO_ENTRYPOINT_ADDRESS as `0x${string}`
const multiSendAddress = process.env.PIMLICO_MULTISEND_ADDRESS as `0x${string}`

const saltNonce = BigInt(process.env.PIMLICO_NONCE as string)

const chain = process.env.PIMLICO_CHAIN
const chainID = Number(process.env.PIMLICO_CHAIN_ID)

const safeVersion = process.env.SAFE_VERSION as string

const rpcURL = process.env.PIMLICO_RPC_URL
const policyID = process.env.PIMLICO_GAS_POLICY
const apiKey = process.env.PIMLICO_API_KEY

const erc20PaymasterAddress = process.env.PIMLICO_ERC20_PAYMASTER_ADDRESS as `0x${string}`
const usdcTokenAddress = process.env.PIMLICO_USDC_TOKEN_ADDRESS as `0x${string}`
const erc20TokenAddress = process.env.PIMLICO_ERC20_TOKEN_CONTRACT as `0x${string}`
const erc721TokenAddress = process.env.PIMLICO_ERC721_TOKEN_CONTRACT as `0x${string}`

// ----------------------

const safeAddresses = (SAFE_ADDRESSES_MAP as Record<string, Record<string, any>>)[safeVersion]
let chainAddresses
if (safeAddresses) {
  chainAddresses = safeAddresses[chainID]
}

const signer = privateKeyToAccount(privateKey as Hash)
const signer2 = privateKeyToAccount(privateKey2 as Hash)

console.log('Signer Extracted from Private Key.')

let bundlerClient
let publicClient
let pimlicoPaymasterClient
if (chain == 'mumbai') {
  bundlerClient = createClient({
    transport: http(`https://api.pimlico.io/v1/${chain}/rpc?apikey=${apiKey}`),
    chain: polygonMumbai,
  })
    .extend(bundlerActions(ENTRYPOINT_ADDRESS_V06))
    .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V06))

  publicClient = createPublicClient({
    transport: http(rpcURL),
    chain: polygonMumbai,
  })

  pimlicoPaymasterClient = createClient({
    transport: http(`https://api.pimlico.io/v2/${chain}/rpc?apikey=${apiKey}`),
    chain: polygonMumbai,
  }).extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V06))
} else {
  throw new Error('Current code only support limited networks. Please make required changes if you want to use custom network.')
}


// ---  SAFE ---

let owners = [signer.address, signer2.address]
let threshold = 2n

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
  })

console.log('\nInit Code Created.', initCode)


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
})
console.log('\nCounterfactual Sender Address Created:', senderAddress)
if (chain == 'mumbai') {
  console.log('Address Link: https://mumbai.polygonscan.com/address/' + senderAddress)
} else {
  console.log('Address Link: https://' + chain + '.etherscan.io/address/' + senderAddress)
}

const contractCode = await publicClient.getBytecode({ address: senderAddress })

if (contractCode) {
  console.log('\nThe Safe is already deployed.')
  process.exit(0)
} else {
  console.log('\nDeploying a new Safe and executing calldata passed with it (if any).')
}

const newNonce = await getAccountNonce(publicClient as Client, {
  entryPoint: ENTRYPOINT_ADDRESS_V06,
  sender: senderAddress,
})
console.log('\nNonce for the sender received from EntryPoint.')


// Calldata for Increase() in counter contract - Mumbai testnet
let txCallData = encodeCallData({
    to: '0x923ecf1a189de145c065a0c25b30ad5408f217ec',
    data: '0xe8927fbc',
    value: 0n,
  })


// --- PROPOSE TRANSACTION (Safe creation + transaction) ---

const sponsoredUserOperation: UserOperation = {
  sender: senderAddress,
  nonce: newNonce,
  initCode: contractCode ? '0x' : initCode,
  callData: txCallData,
  callGasLimit: 1n, // All Gas Values will be filled by Estimation Response Data.
  verificationGasLimit: 1n,
  preVerificationGas: 1n,
  maxFeePerGas: 1n,
  maxPriorityFeePerGas: 1n,
  paymasterAndData: erc20PaymasterAddress,
  signature: '0x',
}


// --- SET GAS PARAMS ---

const gasEstimate = await bundlerClient.estimateUserOperationGas({
  userOperation: sponsoredUserOperation,
})
const maxGasPriceResult = await bundlerClient.getUserOperationGasPrice()

sponsoredUserOperation.callGasLimit = gasEstimate.callGasLimit
sponsoredUserOperation.verificationGasLimit = gasEstimate.verificationGasLimit
sponsoredUserOperation.preVerificationGas = gasEstimate.preVerificationGas
sponsoredUserOperation.maxFeePerGas = maxGasPriceResult.fast.maxFeePerGas
sponsoredUserOperation.maxPriorityFeePerGas = maxGasPriceResult.fast.maxPriorityFeePerGas


// --- SPONSOR OPERATION ---

const sponsorResult = await pimlicoPaymasterClient.sponsorUserOperation({
    userOperation: sponsoredUserOperation,
    sponsorshipPolicyId: policyID,
})
sponsoredUserOperation.callGasLimit = sponsorResult.callGasLimit
sponsoredUserOperation.verificationGasLimit = sponsorResult.verificationGasLimit
sponsoredUserOperation.preVerificationGas = sponsorResult.preVerificationGas
sponsoredUserOperation.paymasterAndData = sponsorResult.paymasterAndData


// --- SIGN ---

sponsoredUserOperation.signature = await multiSignUserOperation(
    sponsoredUserOperation,
    signer,
    signer2,
    chainID,
    chainAddresses.SAFE_4337_MODULE_ADDRESS,
  )
  
console.log("signature:", sponsoredUserOperation.signature)


// --- SUBMIT ---

await submitUserOperationPimlico(sponsoredUserOperation, bundlerClient, entryPointAddress, chain)
