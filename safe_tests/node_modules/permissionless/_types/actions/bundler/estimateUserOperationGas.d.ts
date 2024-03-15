import { type Account, type Chain, type Client, type Transport } from "viem";
import type { PartialBy } from "viem/types/utils";
import type { Prettify } from "../../types";
import type { BundlerRpcSchema, StateOverrides } from "../../types/bundler";
import type { EntryPoint, GetEntryPointVersion } from "../../types/entrypoint";
import type { UserOperation } from "../../types/userOperation";
import { type GetEstimateUserOperationGasErrorReturnType } from "../../utils/errors/getEstimateUserOperationGasError";
export type EstimateUserOperationGasParameters<entryPoint extends EntryPoint> = {
    userOperation: GetEntryPointVersion<entryPoint> extends "v0.6" ? PartialBy<UserOperation<"v0.6">, "callGasLimit" | "preVerificationGas" | "verificationGasLimit"> : PartialBy<UserOperation<"v0.7">, "callGasLimit" | "preVerificationGas" | "verificationGasLimit" | "paymasterVerificationGasLimit" | "paymasterPostOpGasLimit">;
    entryPoint: entryPoint;
};
export type EstimateUserOperationGasReturnType<entryPoint extends EntryPoint> = GetEntryPointVersion<entryPoint> extends "v0.6" ? {
    preVerificationGas: bigint;
    verificationGasLimit: bigint;
    callGasLimit: bigint;
} : {
    preVerificationGas: bigint;
    verificationGasLimit: bigint;
    callGasLimit: bigint;
    paymasterVerificationGasLimit?: bigint;
    paymasterPostOpGasLimit?: bigint;
};
export type EstimateUserOperationErrorType<entryPoint extends EntryPoint> = GetEstimateUserOperationGasErrorReturnType<entryPoint>;
/**
 * Estimates preVerificationGas, verificationGasLimit and callGasLimit for user operation
 *
 * - Docs: https://docs.pimlico.io/permissionless/reference/bundler-actions/estimateUserOperationGas
 *
 * @param client {@link BundlerClient} that you created using viem's createClient and extended it with bundlerActions.
 * @param args {@link EstimateUserOperationGasParameters}
 * @returns preVerificationGas, verificationGasLimit and callGasLimit as {@link EstimateUserOperationGasReturnType}
 *
 *
 * @example
 * import { createClient } from "viem"
 * import { estimateUserOperationGas } from "permissionless/actions"
 *
 * const bundlerClient = createClient({
 *      chain: goerli,
 *      transport: http(BUNDLER_URL)
 * })
 *
 * const gasParameters = estimateUserOperationGas(bundlerClient, {
 *      serOperation: signedUserOperation,
 *      entryPoint: entryPoint
 * })
 *
 * // Return {preVerificationGas: 43492n, verificationGasLimit: 59436n, callGasLimit: 9000n}
 *
 */
export declare const estimateUserOperationGas: <entryPoint extends EntryPoint, TTransport extends Transport = Transport, TChain extends Chain | undefined = Chain | undefined, TAccount extends Account | undefined = Account | undefined>(client: Client<TTransport, TChain, TAccount, BundlerRpcSchema<entryPoint>>, args: Prettify<EstimateUserOperationGasParameters<entryPoint>>, stateOverrides?: StateOverrides) => Promise<EstimateUserOperationGasReturnType<entryPoint>>;
//# sourceMappingURL=estimateUserOperationGas.d.ts.map