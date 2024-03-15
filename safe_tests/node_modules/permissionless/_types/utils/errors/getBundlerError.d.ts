import { type Address, BaseError, type ExecutionRevertedErrorType, UnknownNodeError, type UnknownNodeErrorType } from "viem";
import { type InitCodeDidNotDeploySenderErrorType, type InitCodeRevertedErrorType, type InvalidSmartAccountNonceErrorType, type SenderAddressMismatchErrorType, type SenderAlreadyDeployedErrorType, type SenderNotDeployedErrorType, type SmartAccountInsufficientFundsErrorType, type SmartAccountSignatureValidityPeriodErrorType, type SmartAccountValidationRevertedErrorType } from "../../errors/account";
import { type PaymasterDataRejectedErrorType, type PaymasterDepositTooLowErrorType, type PaymasterNotDeployedErrorType, type PaymasterValidationRevertedErrorType, type PaymasterValidityPeriodErrorType } from "../../errors/paymaster";
import type { UserOperation } from "../../types";
export type GetBundlerErrorParameters = {
    userOperation: Partial<UserOperation>;
    entryPoint: Address;
};
export type GetBundlerErrorReturnType = ExecutionRevertedErrorType | UnknownNodeErrorType | SenderAlreadyDeployedErrorType | InitCodeRevertedErrorType | SenderAddressMismatchErrorType | InitCodeDidNotDeploySenderErrorType | SenderNotDeployedErrorType | SmartAccountInsufficientFundsErrorType | SmartAccountSignatureValidityPeriodErrorType | SmartAccountValidationRevertedErrorType | InvalidSmartAccountNonceErrorType | PaymasterNotDeployedErrorType | PaymasterDepositTooLowErrorType | PaymasterValidityPeriodErrorType | PaymasterValidationRevertedErrorType | PaymasterDataRejectedErrorType;
export declare function getBundlerError(err: BaseError, args: GetBundlerErrorParameters): UnknownNodeError;
//# sourceMappingURL=getBundlerError.d.ts.map