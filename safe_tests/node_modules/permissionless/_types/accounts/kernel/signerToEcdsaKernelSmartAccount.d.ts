import { type Address, type Chain, type Client, type Transport } from "viem";
import type { Prettify } from "../../types";
import type { SmartAccount } from "../types";
import { type SmartAccountSigner } from "../types";
export type KernelEcdsaSmartAccount<transport extends Transport = Transport, chain extends Chain | undefined = Chain | undefined> = SmartAccount<"kernelEcdsaSmartAccount", transport, chain>;
export type SignerToEcdsaKernelSmartAccountParameters<TSource extends string = "custom", TAddress extends Address = Address> = Prettify<{
    signer: SmartAccountSigner<TSource, TAddress>;
    entryPoint: Address;
    address?: Address;
    index?: bigint;
    factoryAddress?: Address;
    accountLogicAddress?: Address;
    ecdsaValidatorAddress?: Address;
    deployedAccountAddress?: Address;
}>;
/**
 * Build a kernel smart account from a private key, that use the ECDSA signer behind the scene
 * @param client
 * @param privateKey
 * @param entryPoint
 * @param index
 * @param factoryAddress
 * @param accountLogicAddress
 * @param ecdsaValidatorAddress
 * @param deployedAccountAddress
 */
export declare function signerToEcdsaKernelSmartAccount<TTransport extends Transport = Transport, TChain extends Chain | undefined = Chain | undefined, TSource extends string = "custom", TAddress extends Address = Address>(client: Client<TTransport, TChain, undefined>, { signer, address, entryPoint, index, factoryAddress, accountLogicAddress, ecdsaValidatorAddress, deployedAccountAddress }: SignerToEcdsaKernelSmartAccountParameters<TSource, TAddress>): Promise<KernelEcdsaSmartAccount<TTransport, TChain>>;
//# sourceMappingURL=signerToEcdsaKernelSmartAccount.d.ts.map