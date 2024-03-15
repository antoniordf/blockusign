"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateUserOperationGas = void 0;
const deepHexlify_1 = require("../../utils/deepHexlify.js");
const getEstimateUserOperationGasError_1 = require("../../utils/errors/getEstimateUserOperationGasError.js");
const estimateUserOperationGas = async (client, args, stateOverrides) => {
    const { userOperation, entryPoint } = args;
    const userOperationWithBigIntAsHex = (0, deepHexlify_1.deepHexlify)(userOperation);
    const stateOverridesWithBigIntAsHex = (0, deepHexlify_1.deepHexlify)(stateOverrides);
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
        throw (0, getEstimateUserOperationGasError_1.getEstimateUserOperationGasError)(err, args);
    }
};
exports.estimateUserOperationGas = estimateUserOperationGas;
//# sourceMappingURL=estimateUserOperationGas.js.map