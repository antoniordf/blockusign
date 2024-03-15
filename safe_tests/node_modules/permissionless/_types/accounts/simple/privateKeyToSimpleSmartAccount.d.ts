import { type Chain, type Client, type Hex, type Transport } from "viem";
import type { Prettify } from "../../types";
import { type SignerToSimpleSmartAccountParameters, type SimpleSmartAccount } from "./signerToSimpleSmartAccount";
export type PrivateKeyToSimpleSmartAccountParameters = Prettify<{
    privateKey: Hex;
} & Omit<SignerToSimpleSmartAccountParameters, "signer">>;
/**
 * @description Creates an Simple Account from a private key.
 *
 * @returns A Private Key Simple Account.
 */
export declare function privateKeyToSimpleSmartAccount<TTransport extends Transport = Transport, TChain extends Chain | undefined = Chain | undefined>(client: Client<TTransport, TChain, undefined>, { privateKey, ...rest }: PrivateKeyToSimpleSmartAccountParameters): Promise<SimpleSmartAccount<TTransport, TChain>>;
//# sourceMappingURL=privateKeyToSimpleSmartAccount.d.ts.map