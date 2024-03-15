"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerToSmartAccountSigner = void 0;
const viem_1 = require("viem");
const walletClientToSmartAccountSigner_1 = require("./walletClientToSmartAccountSigner.js");
const providerToSmartAccountSigner = async (provider, signerAddress) => {
    let account;
    if (!signerAddress) {
        ;
        [account] = await provider.request({ method: "eth_requestAccounts" });
    }
    else {
        account = signerAddress;
    }
    const walletClient = (0, viem_1.createWalletClient)({
        account: account,
        transport: (0, viem_1.custom)(provider)
    });
    return (0, walletClientToSmartAccountSigner_1.walletClientToSmartAccountSigner)(walletClient);
};
exports.providerToSmartAccountSigner = providerToSmartAccountSigner;
//# sourceMappingURL=providerToSmartAccountSigner.js.map