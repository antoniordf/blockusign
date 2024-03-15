import { BaseError } from "viem";
import { deepHexlify } from "../../utils/deepHexlify.js";
import { getEstimateUserOperationGasError } from "../../utils/errors/getEstimateUserOperationGasError.js";
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
export const estimateUserOperationGas = async (client, args, stateOverrides) => {
    const { userOperation, entryPoint } = args;
    const userOperationWithBigIntAsHex = deepHexlify(userOperation);
    const stateOverridesWithBigIntAsHex = deepHexlify(stateOverrides);
    try {
        const response = await client.request({
            method: "eth_estimateUserOperationGas",
            params: stateOverrides
                ? [
                    userOperationWithBigIntAsHex,
                    entryPoint,
                    stateOverridesWithBigIntAsHex
                ]
                : [userOperationWithBigIntAsHex, entryPoint]
        });
        return {
            preVerificationGas: BigInt(response.preVerificationGas || 0),
            verificationGasLimit: BigInt(response.verificationGasLimit || 0),
            callGasLimit: BigInt(response.callGasLimit || 0)
        };
    }
    catch (err) {
        throw getEstimateUserOperationGasError(err, args);
    }
};
//# sourceMappingURL=estimateUserOperationGas.js.map