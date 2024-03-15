import { createWalletClient, custom } from "viem";
import { walletClientToSmartAccountSigner } from "./walletClientToSmartAccountSigner.js";
export const providerToSmartAccountSigner = async (provider, signerAddress) => {
    let account;
    if (!signerAddress) {
        ;
        [account] = await provider.request({ method: "eth_requestAccounts" });
    }
    else {
        account = signerAddress;
    }
    const walletClient = createWalletClient({
        account: account,
        transport: custom(provider)
    });
    return walletClientToSmartAccountSigner(walletClient);
};
//# sourceMappingURL=providerToSmartAccountSigner.js.map