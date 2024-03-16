"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitUserOperationGelato = exports.getGasValuesFromGelato = exports.createCallData = exports.submitUserOperationAlchemy = exports.getGasValuesFromAlchemy = exports.getMaxFeePerGas = exports.getFeeValuesFromAlchemy = exports.getGasValuesFromAlchemyPaymaster = exports.signUserOperation = exports.submitUserOperationPimlico = exports.txTypes = void 0;
var dotenv_1 = require("dotenv");
var viem_1 = require("viem");
var safe_1 = require("./safe");
var promises_1 = require("timers/promises");
var erc20_1 = require("./erc20");
var erc721_1 = require("./erc721");
var nativeTransfer_1 = require("./nativeTransfer");
dotenv_1.default.config();
exports.txTypes = ['account', 'erc20', 'erc721', 'native-transfer'];
var submitUserOperationPimlico = function (userOperation, bundlerClient, entryPointAddress, chain) { return __awaiter(void 0, void 0, void 0, function () {
    var userOperationHash, receipt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bundlerClient.sendUserOperation({
                    userOperation: userOperation,
                    entryPoint: entryPointAddress,
                })];
            case 1:
                userOperationHash = _a.sent();
                console.log("UserOperation submitted. Hash: ".concat(userOperationHash));
                console.log("UserOp Link: https://jiffyscan.xyz/userOpHash/".concat(userOperationHash, "?network=") + chain + '\n');
                console.log('Querying for receipts...');
                return [4 /*yield*/, bundlerClient.waitForUserOperationReceipt({
                        hash: userOperationHash,
                    })];
            case 2:
                receipt = _a.sent();
                console.log("Receipt found!\nTransaction hash: ".concat(receipt.receipt.transactionHash));
                if (chain == 'mumbai') {
                    console.log("Transaction Link: https://mumbai.polygonscan.com/tx/".concat(receipt.receipt.transactionHash));
                }
                else {
                    console.log("Transaction Link: https://" + chain + ".etherscan.io/tx/".concat(receipt.receipt.transactionHash));
                }
                console.log("\nGas Used (Account or Paymaster): ".concat(receipt.actualGasUsed));
                console.log("Gas Used (Transaction): ".concat(receipt.receipt.gasUsed, "\n"));
                return [2 /*return*/];
        }
    });
}); };
exports.submitUserOperationPimlico = submitUserOperationPimlico;
var signUserOperation = function (userOperation, signer, chainID, entryPointAddress, safe4337ModuleAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var signatures, signatureBytes, _i, signatures_1, sig;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {
                    signer: signer.address
                };
                return [4 /*yield*/, signer.signTypedData({
                        domain: {
                            chainId: chainID,
                            verifyingContract: safe4337ModuleAddress,
                        },
                        types: safe_1.EIP712_SAFE_OPERATION_TYPE,
                        primaryType: 'SafeOp',
                        message: {
                            safe: userOperation.sender,
                            nonce: userOperation.nonce,
                            initCode: userOperation.initCode,
                            callData: userOperation.callData,
                            callGasLimit: userOperation.callGasLimit,
                            verificationGasLimit: userOperation.verificationGasLimit,
                            preVerificationGas: userOperation.preVerificationGas,
                            maxFeePerGas: userOperation.maxFeePerGas,
                            maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
                            paymasterAndData: userOperation.paymasterAndData,
                            validAfter: '0x000000000000',
                            validUntil: '0x000000000000',
                            entryPoint: entryPointAddress,
                        },
                    })];
            case 1:
                signatures = [
                    (_a.data = _b.sent(),
                        _a)
                ];
                signatures.sort(function (left, right) { return left.signer.toLowerCase().localeCompare(right.signer.toLowerCase()); });
                signatureBytes = '0x000000000000000000000000';
                for (_i = 0, signatures_1 = signatures; _i < signatures_1.length; _i++) {
                    sig = signatures_1[_i];
                    signatureBytes += sig.data.slice(2);
                }
                return [2 /*return*/, signatureBytes];
        }
    });
}); };
exports.signUserOperation = signUserOperation;
var getGasValuesFromAlchemyPaymaster = function (policyID, entryPointAddress, sponsoredUserOperation, chain, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var gasOptions, rv, responseValues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gasOptions = {
                    method: 'POST',
                    headers: { accept: 'application/json', 'content-type': 'application/json' },
                    body: JSON.stringify({
                        id: 1,
                        jsonrpc: '2.0',
                        method: 'alchemy_requestGasAndPaymasterAndData',
                        params: [
                            {
                                policyId: policyID,
                                entryPoint: entryPointAddress,
                                dummySignature: sponsoredUserOperation.signature,
                                userOperation: {
                                    sender: sponsoredUserOperation.sender,
                                    nonce: '0x' + sponsoredUserOperation.nonce.toString(16),
                                    initCode: sponsoredUserOperation.initCode,
                                    callData: sponsoredUserOperation.callData,
                                },
                            },
                        ],
                    }),
                };
                return [4 /*yield*/, fetch('https://eth-' + chain + '.g.alchemy.com/v2/' + apiKey, gasOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (response) { return (responseValues = response); })
                        .catch(function (err) { return console.error(err); })];
            case 1:
                _a.sent();
                console.log('\nReceived Paymaster Data from Alchemy.');
                if (responseValues && responseValues['result']) {
                    rv = responseValues['result'];
                }
                return [2 /*return*/, rv];
        }
    });
}); };
exports.getGasValuesFromAlchemyPaymaster = getGasValuesFromAlchemyPaymaster;
var getFeeValuesFromAlchemy = function (chain, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var feeOptions, responseValues, rvFee;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feeOptions = {
                    method: 'POST',
                    headers: { accept: 'application/json', 'content-type': 'application/json' },
                    body: JSON.stringify({
                        id: 1,
                        jsonrpc: '2.0',
                        method: 'rundler_maxPriorityFeePerGas',
                    }),
                };
                return [4 /*yield*/, fetch('https://eth-' + chain + '.g.alchemy.com/v2/' + apiKey, feeOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (response) { return (responseValues = response); })
                        .catch(function (err) { return console.error(err); })];
            case 1:
                _a.sent();
                console.log('\nReceived Fee Data from Alchemy.');
                if (responseValues && responseValues['result']) {
                    rvFee = responseValues['result'];
                }
                return [2 /*return*/, rvFee];
        }
    });
}); };
exports.getFeeValuesFromAlchemy = getFeeValuesFromAlchemy;
var getMaxFeePerGas = function (alchemy, maxPriorityFeePerGas) { return __awaiter(void 0, void 0, void 0, function () {
    var maxFeePerGas, latestBlockNum, rvBlock;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, alchemy.core.getBlockNumber()
                // Get latest Block Details
            ];
            case 1:
                latestBlockNum = _a.sent();
                return [4 /*yield*/, alchemy.core.getBlock(latestBlockNum)];
            case 2:
                rvBlock = _a.sent();
                if (rvBlock && rvBlock.baseFeePerGas) {
                    maxFeePerGas = ((BigInt(rvBlock.baseFeePerGas._hex) + BigInt(maxPriorityFeePerGas)) * 15n) / 10n; // Adding a buffer. Recommended is atleast 50%.
                    // https://docs.alchemy.com/reference/bundler-api-fee-logic
                }
                return [2 /*return*/, ('0x' + (maxFeePerGas === null || maxFeePerGas === void 0 ? void 0 : maxFeePerGas.toString(16)))];
        }
    });
}); };
exports.getMaxFeePerGas = getMaxFeePerGas;
var getGasValuesFromAlchemy = function (entryPointAddress, sponsoredUserOperation, chain, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var gasOptions, responseValues, rvGas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gasOptions = {
                    method: 'POST',
                    headers: { accept: 'application/json', 'content-type': 'application/json' },
                    body: JSON.stringify({
                        id: 1,
                        jsonrpc: '2.0',
                        method: 'eth_estimateUserOperationGas',
                        params: [
                            {
                                sender: sponsoredUserOperation.sender,
                                nonce: '0x' + sponsoredUserOperation.nonce.toString(16),
                                initCode: sponsoredUserOperation.initCode,
                                callData: sponsoredUserOperation.callData,
                                callGasLimit: '0x1',
                                verificationGasLimit: '0x1',
                                preVerificationGas: '0x1',
                                maxFeePerGas: sponsoredUserOperation.maxFeePerGas.toString(16),
                                maxPriorityFeePerGas: sponsoredUserOperation.maxPriorityFeePerGas.toString(16),
                                signature: sponsoredUserOperation.signature,
                                paymasterAndData: '0x',
                            },
                            entryPointAddress,
                        ],
                    }),
                };
                return [4 /*yield*/, fetch('https://eth-' + chain + '.g.alchemy.com/v2/' + apiKey, gasOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (response) { return (responseValues = response); })
                        .catch(function (err) { return console.error(err); })];
            case 1:
                _a.sent();
                console.log('\nReceived Gas Data from Alchemy.');
                if (responseValues && responseValues['result']) {
                    rvGas = responseValues['result'];
                }
                return [2 /*return*/, rvGas];
        }
    });
}); };
exports.getGasValuesFromAlchemy = getGasValuesFromAlchemy;
var submitUserOperationAlchemy = function (entryPointAddress, sponsoredUserOperation, chain, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var options, responseValues, hashOptions, runOnce, actualGasUsed, gasUsed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    method: 'POST',
                    headers: { accept: 'application/json', 'content-type': 'application/json' },
                    body: JSON.stringify({
                        id: 1,
                        jsonrpc: '2.0',
                        method: 'eth_sendUserOperation',
                        params: [
                            {
                                sender: sponsoredUserOperation.sender,
                                nonce: '0x' + sponsoredUserOperation.nonce.toString(16),
                                initCode: sponsoredUserOperation.initCode,
                                callData: sponsoredUserOperation.callData,
                                callGasLimit: sponsoredUserOperation.callGasLimit.toString(16),
                                verificationGasLimit: sponsoredUserOperation.verificationGasLimit.toString(16),
                                preVerificationGas: sponsoredUserOperation.preVerificationGas.toString(16),
                                maxFeePerGas: sponsoredUserOperation.maxFeePerGas.toString(16),
                                maxPriorityFeePerGas: sponsoredUserOperation.maxPriorityFeePerGas.toString(16),
                                signature: sponsoredUserOperation.signature,
                                paymasterAndData: sponsoredUserOperation.paymasterAndData,
                            },
                            entryPointAddress,
                        ],
                    }),
                };
                return [4 /*yield*/, fetch('https://eth-' + chain + '.g.alchemy.com/v2/' + apiKey, options)
                        .then(function (response) { return response.json(); })
                        .then(function (response) { return (responseValues = response); })
                        .catch(function (err) { return console.error(err); })];
            case 1:
                _a.sent();
                if (!(responseValues && responseValues['result'])) return [3 /*break*/, 6];
                console.log('UserOperation submitted. Hash:', responseValues['result']);
                console.log('UserOp Link: https://jiffyscan.xyz/userOpHash/' + responseValues['result'] + '?network=' + chain);
                hashOptions = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: 1,
                        jsonrpc: '2.0',
                        method: 'eth_getUserOperationReceipt',
                        params: [responseValues['result']],
                        entryPoint: entryPointAddress,
                    }),
                };
                runOnce = true;
                _a.label = 2;
            case 2:
                if (!(responseValues['result'] == null || runOnce)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, promises_1.setTimeout)(25000)];
            case 3:
                _a.sent();
                return [4 /*yield*/, fetch('https://eth-' + chain + '.g.alchemy.com/v2/' + apiKey, hashOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (response) { return (responseValues = response); })
                        .catch(function (err) { return console.error(err); })];
            case 4:
                _a.sent();
                runOnce = false;
                return [3 /*break*/, 2];
            case 5:
                if (responseValues['result'] && responseValues['result']['receipt']['transactionHash']) {
                    console.log('\nTransaction Link: https://' + chain + '.etherscan.io/tx/' + responseValues['result']['receipt']['transactionHash']);
                    actualGasUsed = (0, viem_1.fromHex)(responseValues['result']['actualGasUsed'], 'number');
                    gasUsed = (0, viem_1.fromHex)(responseValues['result']['receipt']['gasUsed'], 'number');
                    console.log("\nGas Used (Account or Paymaster): ".concat(actualGasUsed));
                    console.log("Gas Used (Transaction): ".concat(gasUsed, "\n"));
                }
                else {
                    console.log('\n' + responseValues['error']);
                }
                return [3 /*break*/, 7];
            case 6:
                if (responseValues && responseValues['error']['message']) {
                    console.log('\n' + responseValues['error']['message']);
                }
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.submitUserOperationAlchemy = submitUserOperationAlchemy;
var createCallData = function (chain, publicClient, signer, txType, senderAddress, erc20TokenAddress, erc721TokenAddress, paymaster) { return __awaiter(void 0, void 0, void 0, function () {
    var txCallData, erc20Decimals, erc20Amount, senderERC20Balance, weiToSend, safeETHBalance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(txType == 'account')) return [3 /*break*/, 1];
                txCallData = (0, safe_1.encodeCallData)({
                    to: senderAddress,
                    data: '0x',
                    value: 0n,
                });
                return [3 /*break*/, 19];
            case 1:
                if (!(txType == 'erc20')) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, erc20_1.getERC20Decimals)(erc20TokenAddress, publicClient)];
            case 2:
                erc20Decimals = _a.sent();
                erc20Amount = BigInt(Math.pow(10, erc20Decimals));
                return [4 /*yield*/, (0, erc20_1.getERC20Balance)(erc20TokenAddress, publicClient, senderAddress)];
            case 3:
                senderERC20Balance = _a.sent();
                console.log('\nSafe Wallet ERC20 Balance:', Number(senderERC20Balance / erc20Amount));
                if (!(senderERC20Balance < erc20Amount)) return [3 /*break*/, 9];
                console.log('\nMinting ERC20 Tokens to Safe Wallet.');
                return [4 /*yield*/, (0, erc20_1.mintERC20Token)(erc20TokenAddress, publicClient, signer, senderAddress, erc20Amount, chain, paymaster)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!(senderERC20Balance < erc20Amount)) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, promises_1.setTimeout)(15000)];
            case 6:
                _a.sent();
                return [4 /*yield*/, (0, erc20_1.getERC20Balance)(erc20TokenAddress, publicClient, senderAddress)];
            case 7:
                senderERC20Balance = _a.sent();
                return [3 /*break*/, 5];
            case 8:
                console.log('\nUpdated Safe Wallet ERC20 Balance:', Number(senderERC20Balance / erc20Amount));
                _a.label = 9;
            case 9:
                txCallData = (0, safe_1.encodeCallData)({
                    to: erc20TokenAddress,
                    data: (0, erc20_1.generateTransferCallData)(signer.address, erc20Amount), // transfer() function call with corresponding data.
                    value: 0n,
                });
                return [3 /*break*/, 19];
            case 10:
                if (!(txType == 'erc721')) return [3 /*break*/, 11];
                txCallData = (0, safe_1.encodeCallData)({
                    to: erc721TokenAddress,
                    data: (0, erc721_1.generateMintingCallData)(signer.address), // safeMint() function call with corresponding data.
                    value: 0n,
                });
                return [3 /*break*/, 19];
            case 11:
                if (!(txType == 'native-transfer')) return [3 /*break*/, 19];
                weiToSend = (0, viem_1.parseEther)('0.000001');
                return [4 /*yield*/, publicClient.getBalance({
                        address: senderAddress,
                    })];
            case 12:
                safeETHBalance = _a.sent();
                if (!(safeETHBalance < weiToSend)) return [3 /*break*/, 18];
                console.log('\nTransferring', (0, viem_1.formatEther)(weiToSend - safeETHBalance), 'ETH to Safe for native transfer.');
                return [4 /*yield*/, (0, nativeTransfer_1.transferETH)(publicClient, signer, senderAddress, weiToSend - safeETHBalance, chain, paymaster)];
            case 13:
                _a.sent();
                _a.label = 14;
            case 14:
                if (!(safeETHBalance < weiToSend)) return [3 /*break*/, 17];
                return [4 /*yield*/, (0, promises_1.setTimeout)(30000)]; // Sometimes it takes time to index.
            case 15:
                _a.sent(); // Sometimes it takes time to index.
                return [4 /*yield*/, publicClient.getBalance({
                        address: senderAddress,
                    })];
            case 16:
                safeETHBalance = _a.sent();
                return [3 /*break*/, 14];
            case 17:
                console.log('\nTransferred required ETH for the native transfer.');
                _a.label = 18;
            case 18:
                txCallData = (0, safe_1.encodeCallData)({
                    to: signer.address,
                    data: '0x',
                    value: weiToSend,
                });
                _a.label = 19;
            case 19:
                console.log('\nAppropriate calldata created.');
                return [2 /*return*/, txCallData];
        }
    });
}); };
exports.createCallData = createCallData;
var getGasValuesFromGelato = function (entryPointAddress, sponsoredUserOperation, chainID, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var gasOptions, responseValues, rvGas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gasOptions = {
                    method: 'POST',
                    headers: { accept: 'application/json', 'content-type': 'application/json' },
                    body: JSON.stringify({
                        id: 0,
                        jsonrpc: '2.0',
                        method: 'eth_estimateUserOperationGas',
                        params: [
                            {
                                sender: sponsoredUserOperation.sender,
                                nonce: '0x' + sponsoredUserOperation.nonce.toString(16),
                                initCode: sponsoredUserOperation.initCode,
                                callData: sponsoredUserOperation.callData,
                                signature: sponsoredUserOperation.signature,
                                paymasterAndData: '0x',
                            },
                            entryPointAddress,
                        ],
                    }),
                };
                return [4 /*yield*/, fetch("https://api.gelato.digital//bundlers/".concat(chainID, "/rpc?sponsorApiKey=").concat(apiKey), gasOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (response) { return (responseValues = response); })
                        .catch(function (err) { return console.error(err); })];
            case 1:
                _a.sent();
                console.log('\nReceived Gas Data from Gelato.');
                if (responseValues && responseValues['result']) {
                    rvGas = responseValues['result'];
                }
                return [2 /*return*/, rvGas];
        }
    });
}); };
exports.getGasValuesFromGelato = getGasValuesFromGelato;
var submitUserOperationGelato = function (entryPointAddress, sponsoredUserOperation, chain, chainID, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var options, responseValues, hashOptions, runOnce, rvEntryPoint, userOpHash, actualGasUsed, gasUsed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    method: 'POST',
                    headers: { accept: 'application/json', 'content-type': 'application/json' },
                    body: JSON.stringify({
                        id: 0,
                        jsonrpc: '2.0',
                        method: 'eth_sendUserOperation',
                        params: [
                            {
                                sender: sponsoredUserOperation.sender,
                                nonce: '0x' + sponsoredUserOperation.nonce.toString(16),
                                initCode: sponsoredUserOperation.initCode,
                                callData: sponsoredUserOperation.callData,
                                signature: sponsoredUserOperation.signature,
                                paymasterAndData: sponsoredUserOperation.paymasterAndData,
                                callGasLimit: sponsoredUserOperation.callGasLimit,
                                verificationGasLimit: sponsoredUserOperation.verificationGasLimit,
                                preVerificationGas: sponsoredUserOperation.preVerificationGas,
                                maxFeePerGas: '0x' + sponsoredUserOperation.maxFeePerGas.toString(16),
                                maxPriorityFeePerGas: '0x' + sponsoredUserOperation.maxPriorityFeePerGas.toString(16),
                            },
                            entryPointAddress,
                        ],
                    }),
                };
                return [4 /*yield*/, fetch("https://api.gelato.digital//bundlers/".concat(chainID, "/rpc?sponsorApiKey=").concat(apiKey), options)
                        .then(function (response) { return response.json(); })
                        .then(function (response) { return (responseValues = response); })
                        .catch(function (err) { return console.error(err); })];
            case 1:
                _a.sent();
                if (!(responseValues && responseValues['result'])) return [3 /*break*/, 6];
                console.log('\nUserOperation submitted.\n\nGelato Relay Task ID:', responseValues['result']);
                console.log('Gelato Relay Task Link: https://api.gelato.digital/tasks/status/' + responseValues['result']);
                hashOptions = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: 0,
                        jsonrpc: '2.0',
                        method: 'eth_getUserOperationReceipt',
                        params: [responseValues['result']],
                    }),
                };
                runOnce = true;
                _a.label = 2;
            case 2:
                if (!(responseValues['result'] == null || runOnce)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, promises_1.setTimeout)(25000)];
            case 3:
                _a.sent();
                return [4 /*yield*/, fetch("https://api.gelato.digital//bundlers/".concat(chainID, "/rpc?sponsorApiKey=").concat(apiKey), hashOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (response) { return (responseValues = response); })
                        .catch(function (err) { return console.error(err); })];
            case 4:
                _a.sent();
                runOnce = false;
                return [3 /*break*/, 2];
            case 5:
                if (responseValues['result'] && responseValues['result']['receipt']['transactionHash']) {
                    rvEntryPoint = responseValues['result']['logs'][responseValues['result']['logs'].length - 2]['address'];
                    if (rvEntryPoint == entryPointAddress) {
                        userOpHash = responseValues['result']['logs'][responseValues['result']['logs'].length - 2]['topics'][1];
                        console.log('\nUser OP Hash: ' + userOpHash + '\nUserOp Link: https://jiffyscan.xyz/userOpHash/' + userOpHash + '?network=' + chain);
                    }
                    console.log('\nTransaction Link: https://' + chain + '.etherscan.io/tx/' + responseValues['result']['receipt']['transactionHash']);
                    actualGasUsed = (0, viem_1.fromHex)(responseValues['result']['actualGasUsed'], 'number');
                    gasUsed = (0, viem_1.fromHex)(responseValues['result']['receipt']['gasUsed'], 'number');
                    console.log("\nGas Used (Account or Paymaster): ".concat(actualGasUsed));
                    console.log("Gas Used (Transaction): ".concat(gasUsed, "\n"));
                }
                else {
                    console.log('\n' + responseValues['error']);
                }
                return [3 /*break*/, 7];
            case 6:
                if (responseValues && responseValues['message']) {
                    console.log('\n' + responseValues['message']);
                }
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.submitUserOperationGelato = submitUserOperationGelato;
