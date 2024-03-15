import { createClient } from "viem";
import {} from "../accounts/types.js";
import {} from "../actions/smartAccount/prepareUserOperationRequest.js";
import {} from "../types/bundler.js";
import { smartAccountActions } from "./decorators/smartAccount.js";
export function createSmartAccountClient(parameters) {
    const { key = "Account", name = "Smart Account Client", transport } = parameters;
    const client = createClient({
        ...parameters,
        key,
        name,
        transport: (opts) => transport({ ...opts, retryCount: 0 }),
        type: "smartAccountClient"
    });
    return client.extend(smartAccountActions({
        sponsorUserOperation: parameters.sponsorUserOperation
    }));
}
//# sourceMappingURL=createSmartAccountClient.js.map