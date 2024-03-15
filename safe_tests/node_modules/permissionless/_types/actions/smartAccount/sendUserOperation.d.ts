import type { Chain, Client, Hash, Transport } from "viem";
import type { SmartAccount } from "../../accounts/types";
import type { GetAccountParameter, PartialBy, Prettify, UserOperation } from "../../types";
import { type SponsorUserOperationMiddleware } from "./prepareUserOperationRequest";
export type SendUserOperationParameters<TAccount extends SmartAccount | undefined = SmartAccount | undefined> = {
    userOperation: PartialBy<UserOperation, "nonce" | "sender" | "initCode" | "signature" | "callGasLimit" | "maxFeePerGas" | "maxPriorityFeePerGas" | "preVerificationGas" | "verificationGasLimit" | "paymasterAndData">;
} & GetAccountParameter<TAccount> & SponsorUserOperationMiddleware;
export declare function sendUserOperation<TTransport extends Transport = Transport, TChain extends Chain | undefined = Chain | undefined, TAccount extends SmartAccount | undefined = SmartAccount | undefined>(client: Client<TTransport, TChain, TAccount>, args: Prettify<SendUserOperationParameters<TAccount>>): Promise<Hash>;
//# sourceMappingURL=sendUserOperation.d.ts.map