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
  import { InternalTx, encodeMultiSend } from './utils/multisend'
  import { generateApproveCallData } from './utils/erc20'
  
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

    return initializer
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