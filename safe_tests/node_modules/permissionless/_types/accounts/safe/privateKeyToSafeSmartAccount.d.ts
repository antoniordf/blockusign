import { type Chain, type Client, type Hex, type Transport } from "viem";
import type { Prettify } from "../../types";
import { type SafeSmartAccount, type SignerToSafeSmartAccountParameters } from "./signerToSafeSmartAccount";
export type PrivateKeyToSafeSmartAccountParameters = Prettify<{
    privateKey: Hex;
} & Omit<SignerToSafeSmartAccountParameters, "signer">>;
/**
 * @description Creates an Simple Account from a private key.
 *
 * @returns A Private Key Simple Account.
 */
export declare function privateKeyToSafeSmartAccount<TTransport extends Transport = Transport, TChain extends Chain | undefined = Chain | undefined>(client: Client<TTransport, TChain, undefined>, { privateKey, ...rest }: PrivateKeyToSafeSmartAccountParameters): Promise<SafeSmartAccount<TTransport, TChain>>;
//# sourceMappingURL=privateKeyToSafeSmartAccount.d.ts.map