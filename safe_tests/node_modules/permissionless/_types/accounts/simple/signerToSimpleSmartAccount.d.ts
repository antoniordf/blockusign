import { type Address, type Chain, type Client, type Transport } from "viem";
import type { Prettify } from "../../types";
import { type SmartAccount, type SmartAccountSigner } from "../types";
export type SimpleSmartAccount<transport extends Transport = Transport, chain extends Chain | undefined = Chain | undefined> = SmartAccount<"SimpleSmartAccount", transport, chain>;
export type SignerToSimpleSmartAccountParameters<TSource extends string = "custom", TAddress extends Address = Address> = Prettify<{
    signer: SmartAccountSigner<TSource, TAddress>;
    factoryAddress: Address;
    entryPoint: Address;
    index?: bigint;
    address?: Address;
}>;
/**
 * @description Creates an Simple Account from a private key.
 *
 * @returns A Private Key Simple Account.
 */
export declare function signerToSimpleSmartAccount<TTransport extends Transport = Transport, TChain extends Chain | undefined = Chain | undefined, TSource extends string = "custom", TAddress extends Address = Address>(client: Client<TTransport, TChain, undefined>, { signer, factoryAddress, entryPoint, index, address }: SignerToSimpleSmartAccountParameters<TSource, TAddress>): Promise<SimpleSmartAccount<TTransport, TChain>>;
//# sourceMappingURL=signerToSimpleSmartAccount.d.ts.map