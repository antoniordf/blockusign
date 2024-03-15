import { BaseError } from "viem";
import type { EstimateUserOperationGasParameters } from "../actions/bundler/estimateUserOperationGas";
export type EstimateUserOperationGasErrorType = EstimateUserOperationGasError & {
    name: "EstimateUserOperationGasError";
};
export declare class EstimateUserOperationGasError extends BaseError {
    cause: BaseError;
    name: string;
    constructor(cause: BaseError, { userOperation, entryPoint, docsPath }: EstimateUserOperationGasParameters & {
        docsPath?: string;
    });
}
//# sourceMappingURL=estimateUserOperationGas.d.ts.map