import { BaseError } from "viem";
import { type SendUserOperationParameters } from "../actions/bundler/sendUserOperation";
export type SendUserOperationErrorType = SendUserOperationError & {
    name: "SendUserOperationError";
};
export declare class SendUserOperationError extends BaseError {
    cause: BaseError;
    name: string;
    constructor(cause: BaseError, { userOperation, entryPoint, docsPath }: SendUserOperationParameters & {
        docsPath?: string;
    });
}
//# sourceMappingURL=sendUserOperation.d.ts.map