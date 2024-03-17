import {
    Address,
    Hex,
    PublicClient,
    concatHex,
    encodeFunctionData,
    encodePacked,
    getContractAddress,
    hexToBigInt,
    keccak256,
    zeroAddress,
  } from 'viem'
  import { InternalTx, encodeMultiSend } from '../backend/safe/utils/multisend'
  import { generateApproveCallData } from '../backend/safe/utils/erc20'
  
  export const enableModuleCallData = (safe4337ModuleAddress: `0x${string}`) => {
    return encodeFunctionData({
      abi: [
        {
          inputs: [
            {
              internalType: 'address[]',
              name: 'modules',
              type: 'address[]',
            },
          ],
          name: 'enableModules',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'enableModules',
      args: [[safe4337ModuleAddress]],
    })
  }

  const getMultiInitializerCode = async ({
    owners,
    threshold,
    addModuleLibAddress,
    safe4337ModuleAddress,
    multiSendAddress,
    erc20TokenAddress,
    paymasterAddress,
  }: {
    owners: Address[]
    threshold: bigint
    addModuleLibAddress: Address
    safe4337ModuleAddress: Address
    multiSendAddress: Address
    erc20TokenAddress: Address
    paymasterAddress: Address
  }) => {
    const setupTxs: InternalTx[] = [
      {
        to: addModuleLibAddress,
        data: enableModuleCallData(safe4337ModuleAddress),
        value: 0n,
        operation: 1, // 1 = DelegateCall required for enabling the module
      },
    ]
  
    if (erc20TokenAddress != zeroAddress && paymasterAddress != zeroAddress) {
      setupTxs.push({
        to: erc20TokenAddress,
        data: generateApproveCallData(paymasterAddress),
        value: 0n,
        operation: 0, // 0 = Call
      })
    }
  
    const multiSendCallData = encodeMultiSend(setupTxs)
  
    return encodeFunctionData({
      abi: [
        {
          inputs: [
            {
              internalType: 'address[]',
              name: '_owners',
              type: 'address[]',
            },
            {
              internalType: 'uint256',
              name: '_threshold',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
            {
              internalType: 'address',
              name: 'fallbackHandler',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'paymentToken',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'payment',
              type: 'uint256',
            },
            {
              internalType: 'address payable',
              name: 'paymentReceiver',
              type: 'address',
            },
          ],
          name: 'setup',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'setup',
      args: [owners, threshold, multiSendAddress, multiSendCallData, safe4337ModuleAddress, zeroAddress, 0n, zeroAddress],
    })
  }

export const multiGetAccountInitCode = async ({
    owners,
    threshold,
    addModuleLibAddress,
    safe4337ModuleAddress,
    safeProxyFactoryAddress,
    safeSingletonAddress,
    saltNonce = 0n,
    multiSendAddress,
    erc20TokenAddress,
    paymasterAddress,
  }: {
    owners: Address[]
    threshold: bigint
    addModuleLibAddress: Address
    safe4337ModuleAddress: Address
    safeProxyFactoryAddress: Address
    safeSingletonAddress: Address
    saltNonce?: bigint
    multiSendAddress: Address
    erc20TokenAddress: Address
    paymasterAddress: Address
  }): Promise<Hex> => {
    if (!owners) throw new Error('Owner account not found')
    const initializer = await getMultiInitializerCode({
      owners,
      threshold,
      addModuleLibAddress,
      safe4337ModuleAddress,
      multiSendAddress,
      erc20TokenAddress,
      paymasterAddress,
    })
    const initCodeCallData = encodeFunctionData({
        abi: [
          {
            inputs: [
              {
                internalType: 'address',
                name: '_singleton',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'initializer',
                type: 'bytes',
              },
              {
                internalType: 'uint256',
                name: 'saltNonce',
                type: 'uint256',
              },
            ],
            name: 'createProxyWithNonce',
            outputs: [
              {
                internalType: 'contract SafeProxy',
                name: 'proxy',
                type: 'address',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'createProxyWithNonce',
        args: [safeSingletonAddress, initializer, saltNonce],
      })
    
      return concatHex([safeProxyFactoryAddress, initCodeCallData])
    }

  export const multiGetAccountAddress = async ({
    client,
    owners,
    threshold,
    addModuleLibAddress,
    safe4337ModuleAddress,
    safeProxyFactoryAddress,
    safeSingletonAddress,
    saltNonce = 0n,
    multiSendAddress,
    erc20TokenAddress,
    paymasterAddress,
  }: {
    client: PublicClient
    owners: Address[]
    threshold: bigint
    addModuleLibAddress: Address
    safe4337ModuleAddress: Address
    safeProxyFactoryAddress: Address
    safeSingletonAddress: Address
    saltNonce?: bigint
    multiSendAddress: Address
    erc20TokenAddress: Address
    paymasterAddress: Address
  }): Promise<Address> => {
    const proxyCreationCode = await client.readContract({
      abi: [
        {
          inputs: [],
          name: 'proxyCreationCode',
          outputs: [
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
      ],
      address: safeProxyFactoryAddress,
      functionName: 'proxyCreationCode',
    })
  
    const deploymentCode = encodePacked(['bytes', 'uint256'], [proxyCreationCode, hexToBigInt(safeSingletonAddress)])
  
    const initializer = await getMultiInitializerCode({
      owners,
      threshold,
      addModuleLibAddress,
      safe4337ModuleAddress,
      multiSendAddress,
      erc20TokenAddress,
      paymasterAddress,
    })
  
    const salt = keccak256(encodePacked(['bytes32', 'uint256'], [keccak256(encodePacked(['bytes'], [initializer])), saltNonce]))
  
    return getContractAddress({
      from: safeProxyFactoryAddress,
      salt,
      bytecode: deploymentCode,
      opcode: 'CREATE2',
    })
  }


  const EIP712_SAFE_OPERATION_TYPE = {
    SafeOp: [
      { type: 'address', name: 'safe' },
      { type: 'uint256', name: 'nonce' },
      { type: 'bytes', name: 'initCode' },
      { type: 'bytes', name: 'callData' },
      { type: 'uint256', name: 'callGasLimit' },
      { type: 'uint256', name: 'verificationGasLimit' },
      { type: 'uint256', name: 'preVerificationGas' },
      { type: 'uint256', name: 'maxFeePerGas' },
      { type: 'uint256', name: 'maxPriorityFeePerGas' },
      { type: 'bytes', name: 'paymasterAndData' },
      { type: 'uint48', name: 'validAfter' },
      { type: 'uint48', name: 'validUntil' },
      { type: 'address', name: 'entryPoint' }
    ]
  }
   
import { UserOperation, submitUserOperationPimlico, signUserOperation, txTypes, createCallData } from './utils/userOps'
import { getAccountNonce, bundlerActions, ENTRYPOINT_ADDRESS_V06 } from 'permissionless'
import { PrivateKeyAccount } from 'viem'

export const multiSignUserOperation = async (
    userOperation: UserOperation,
    signer: PrivateKeyAccount,
    signer2: PrivateKeyAccount,
    chainId: any,
    safe4337ModuleAddress: any
  ) => {
    const signatures = [
      {
        signer: signer.address,
        data: await signer.signTypedData({
          domain: {
            chainId,
            verifyingContract: safe4337ModuleAddress
          },
          types: EIP712_SAFE_OPERATION_TYPE,
          primaryType: 'SafeOp',
          message: {
            safe: userOperation.sender,
            nonce: userOperation.nonce,
            initCode: userOperation.initCode,
            callData: userOperation.callData,
            callGasLimit: userOperation.callGasLimit,
            verificationGasLimit: userOperation.verificationGasLimit,
            preVerificationGas: userOperation.preVerificationGas,
            maxFeePerGas: userOperation.maxFeePerGas,
            maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
            paymasterAndData: userOperation.paymasterAndData,
            validAfter: '0x000000000000',
            validUntil: '0x000000000000',
            entryPoint: ENTRYPOINT_ADDRESS_V06
          }
        })
      },
      {
        signer: signer2.address,
        data: await signer2.signTypedData({
          domain: {
            chainId,
            verifyingContract: safe4337ModuleAddress
          },
          types: EIP712_SAFE_OPERATION_TYPE,
          primaryType: 'SafeOp',
          message: {
            safe: userOperation.sender,
            nonce: userOperation.nonce,
            initCode: userOperation.initCode,
            callData: userOperation.callData,
            callGasLimit: userOperation.callGasLimit,
            verificationGasLimit: userOperation.verificationGasLimit,
            preVerificationGas: userOperation.preVerificationGas,
            maxFeePerGas: userOperation.maxFeePerGas,
            maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
            paymasterAndData: userOperation.paymasterAndData,
            validAfter: '0x000000000000',
            validUntil: '0x000000000000',
            entryPoint: ENTRYPOINT_ADDRESS_V06
          }
        })
      }
    ]
    signatures.sort((left, right) => left.signer.toLowerCase().localeCompare(right.signer.toLowerCase()))
    let signatureBytes: Address = '0x000000000000000000000000'
    for (const sig of signatures) {
      signatureBytes += sig.data.slice(2)
    }
    return signatureBytes
  }




  export const signUserOp = async (
    userOperation: UserOperation,
    signer: PrivateKeyAccount,
    chainId: any,
    safe4337ModuleAddress: any
  ) => {
     return {
        signer: signer.address,
        data: await signer.signTypedData({
          domain: {
            chainId,
            verifyingContract: safe4337ModuleAddress
          },
          types: EIP712_SAFE_OPERATION_TYPE,
          primaryType: 'SafeOp',
          message: {
            safe: userOperation.sender,
            nonce: userOperation.nonce,
            initCode: userOperation.initCode,
            callData: userOperation.callData,
            callGasLimit: userOperation.callGasLimit,
            verificationGasLimit: userOperation.verificationGasLimit,
            preVerificationGas: userOperation.preVerificationGas,
            maxFeePerGas: userOperation.maxFeePerGas,
            maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
            paymasterAndData: userOperation.paymasterAndData,
            validAfter: '0x000000000000',
            validUntil: '0x000000000000',
            entryPoint: ENTRYPOINT_ADDRESS_V06
          }
        })
      }
  }


  export const combineSignatures = async (signatures: any) => {
    signatures.sort((left, right) => left.signer.toLowerCase().localeCompare(right.signer.toLowerCase()))
    let signatureBytes: Address = '0x000000000000000000000000'
    for (const sig of signatures) {
      signatureBytes += sig.data.slice(2)
    }
    return signatureBytes
  }