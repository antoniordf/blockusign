import { accounts } from "../../actions/stackup/accounts.js";
import { sponsorUserOperation } from "../../actions/stackup/sponsorUserOperation.js";
import {} from "../stackup.js";
export const stackupPaymasterActions = (entryPointAddress) => (client) => ({
    sponsorUserOperation: async (args) => sponsorUserOperation(client, {
        ...args,
        entryPoint: entryPointAddress
    }),
    accounts: async (args) => accounts(client, args)
});
//# sourceMappingURL=stackup.js.map