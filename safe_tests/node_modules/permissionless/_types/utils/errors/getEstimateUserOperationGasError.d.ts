import type { EstimateUserOperationGasParameters } from "../../actions/bundler/estimateUserOperationGas";
import { type EstimateUserOperationGasErrorType } from "../../errors/estimateUserOperationGas";
import { type ErrorType } from "../../errors/utils";
import { type GetBundlerErrorReturnType } from "./getBundlerError";
export type GetEstimateUserOperationGasErrorReturnType<cause = ErrorType> = Omit<EstimateUserOperationGasErrorType, "cause"> & {
    cause: cause | GetBundlerErrorReturnType;
};
export declare function getEstimateUserOperationGasError<err extends ErrorType<string>>(error: err, args: EstimateUserOperationGasParameters): void;
//# sourceMappingURL=getEstimateUserOperationGasError.d.ts.map