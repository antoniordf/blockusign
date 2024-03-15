import { deepHexlify, transactionReceiptStatus } from "./deepHexlify.js";
import { getAction } from "./getAction.js";
import { getAddressFromInitCodeOrPaymasterAndData } from "./getAddressFromInitCodeOrPaymasterAndData.js";
import { getRequiredPrefund } from "./getRequiredPrefund.js";
import { getUserOperationHash } from "./getUserOperationHash.js";
import { isSmartAccountDeployed } from "./isSmartAccountDeployed.js";
import { providerToSmartAccountSigner } from "./providerToSmartAccountSigner.js";
import { AccountOrClientNotFoundError, signUserOperationHashWithECDSA } from "./signUserOperationHashWithECDSA.js";
import { walletClientToSmartAccountSigner } from "./walletClientToSmartAccountSigner.js";
export function parseAccount(account) {
    if (typeof account === "string")
        return { address: account, type: "json-rpc" };
    return account;
}
export { transactionReceiptStatus, deepHexlify, getAction, getUserOperationHash, getRequiredPrefund, walletClientToSmartAccountSigner, signUserOperationHashWithECDSA, AccountOrClientNotFoundError, isSmartAccountDeployed, providerToSmartAccountSigner, getAddressFromInitCodeOrPaymasterAndData };
//# sourceMappingURL=index.js.map