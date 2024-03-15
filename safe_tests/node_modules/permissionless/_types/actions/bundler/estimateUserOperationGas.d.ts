import { type Account, type Address, type Chain, type Client, type Transport } from "viem";
import type { PartialBy } from "viem/types/utils";
import type { Prettify } from "../../types";
import type { BundlerRpcSchema, StateOverrides } from "../../types/bundler";
import type { UserOperation } from "../../types/userOperation";
import { type GetEstimateUserOperationGasErrorReturnType } from "../../utils/errors/getEstimateUserOperationGasError";
export type EstimateUserOperationGasParameters = {
    userOperation: PartialBy<UserOperation, "callGasLimit" | "preVerificationGas" | "verificationGasLimit">;
    entryPoint: Address;
};
export type EstimateUserOperationGasReturnType = {
    preVerificationGas: bigint;
    verificationGasLimit: bigint;
    callGasLimit: bigint;
};
export type EstimateUserOperationErrorType = GetEstimateUserOperationGasErrorReturnType;
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
export declare const estimateUserOperationGas: <TTransport extends Transport = Transport, TChain extends Chain | undefined = Chain | undefined, TAccount extends Account | undefined = Account | undefined>(client: Client<TTransport, TChain, TAccount, BundlerRpcSchema>, args: Prettify<EstimateUserOperationGasParameters>, stateOverrides?: StateOverrides) => Promise<Prettify<EstimateUserOperationGasReturnType>>;
//# sourceMappingURL=estimateUserOperationGas.d.ts.map