"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pimlicoPaymasterActions = exports.pimlicoBundlerActions = void 0;
const pimlico_1 = require("../../actions/pimlico.js");
const getUserOperationGasPrice_1 = require("../../actions/pimlico/getUserOperationGasPrice.js");
const getUserOperationStatus_1 = require("../../actions/pimlico/getUserOperationStatus.js");
const sponsorUserOperation_1 = require("../../actions/pimlico/sponsorUserOperation.js");
const pimlicoBundlerActions = (client) => ({
    getUserOperationGasPrice: async () => (0, getUserOperationGasPrice_1.getUserOperationGasPrice)(client),
    getUserOperationStatus: async (args) => (0, getUserOperationStatus_1.getUserOperationStatus)(client, args),
    sendCompressedUserOperation: async (args) => (0, pimlico_1.sendCompressedUserOperation)(client, args)
});
exports.pimlicoBundlerActions = pimlicoBundlerActions;
const pimlicoPaymasterActions = (client) => ({
    sponsorUserOperation: async (args) => (0, sponsorUserOperation_1.sponsorUserOperation)(client, args),
    validateSponsorshipPolicies: async (args) => (0, pimlico_1.validateSponsorshipPolicies)(client, args)
});
exports.pimlicoPaymasterActions = pimlicoPaymasterActions;
//# sourceMappingURL=pimlico.js.map