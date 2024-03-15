"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartAccountActions = void 0;
const smartAccount_1 = require("../../actions/smartAccount.js");
const deployContract_1 = require("../../actions/smartAccount/deployContract.js");
const prepareUserOperationRequest_1 = require("../../actions/smartAccount/prepareUserOperationRequest.js");
const sendTransaction_1 = require("../../actions/smartAccount/sendTransaction.js");
const sendUserOperation_1 = require("../../actions/smartAccount/sendUserOperation.js");
const signMessage_1 = require("../../actions/smartAccount/signMessage.js");
const signTypedData_1 = require("../../actions/smartAccount/signTypedData.js");
const writeContract_1 = require("../../actions/smartAccount/writeContract.js");
function smartAccountActions({ sponsorUserOperation }) {
    return (client) => ({
        prepareUserOperationRequest: (args, stateOverrides) => (0, prepareUserOperationRequest_1.prepareUserOperationRequest)(client, {
            ...args,
            sponsorUserOperation
        }, stateOverrides),
        deployContract: (args) => (0, deployContract_1.deployContract)(client, {
            ...args,
            sponsorUserOperation
        }),
        sendTransaction: (args) => (0, sendTransaction_1.sendTransaction)(client, {
            ...args,
            sponsorUserOperation
        }),
        sendTransactions: (args) => (0, smartAccount_1.sendTransactions)(client, {
            ...args,
            sponsorUserOperation
        }),
        sendUserOperation: (args) => (0, sendUserOperation_1.sendUserOperation)(client, {
            ...args,
            sponsorUserOperation
        }),
        signMessage: (args) => (0, signMessage_1.signMessage)(client, args),
        signTypedData: (args) => (0, signTypedData_1.signTypedData)(client, args),
        writeContract: (args) => (0, writeContract_1.writeContract)(client, {
            ...args,
            sponsorUserOperation
        })
    });
}
exports.smartAccountActions = smartAccountActions;
//# sourceMappingURL=smartAccount.js.map