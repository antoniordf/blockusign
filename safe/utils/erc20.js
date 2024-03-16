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
exports.transferERC20Token = exports.mintERC20Token = exports.getERC20Balance = exports.getERC20Decimals = exports.generateTransferCallData = exports.generateApproveCallData = void 0;
var dotenv_1 = require("dotenv");
var viem_1 = require("viem");
var chains_1 = require("viem/chains");
dotenv_1.default.config();
var pimlicoRPCURL = process.env.PIMLICO_RPC_URL;
var alchemyRPCURL = process.env.ALCHEMY_RPC_URL;
var gelatoRPCURL = process.env.GELATO_RPC_URL;
var generateApproveCallData = function (paymasterAddress) {
    var approveData = (0, viem_1.encodeFunctionData)({
        abi: [
            {
                inputs: [
                    { name: '_spender', type: 'address' },
                    { name: '_value', type: 'uint256' },
                ],
                name: 'approve',
                outputs: [{ name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
        args: [paymasterAddress, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn],
    });
    return approveData;
};
exports.generateApproveCallData = generateApproveCallData;
var generateTransferCallData = function (to, value) {
    var transferData = (0, viem_1.encodeFunctionData)({
        abi: [
            {
                inputs: [
                    { name: '_to', type: 'address' },
                    { name: '_value', type: 'uint256' },
                ],
                name: 'transfer',
                outputs: [{ name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
        args: [to, value],
    });
    return transferData;
};
exports.generateTransferCallData = generateTransferCallData;
var getERC20Decimals = function (erc20TokenAddress, publicClient) { return __awaiter(void 0, void 0, void 0, function () {
    var erc20Decimals;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, publicClient.readContract({
                    abi: [
                        {
                            inputs: [],
                            name: 'decimals',
                            outputs: [{ type: 'uint8' }],
                            type: 'function',
                            stateMutability: 'view',
                        },
                    ],
                    address: erc20TokenAddress,
                    functionName: 'decimals',
                })];
            case 1:
                erc20Decimals = _a.sent();
                return [2 /*return*/, erc20Decimals];
        }
    });
}); };
exports.getERC20Decimals = getERC20Decimals;
var getERC20Balance = function (erc20TokenAddress, publicClient, owner) { return __awaiter(void 0, void 0, void 0, function () {
    var senderERC20Balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, publicClient.readContract({
                    abi: [
                        {
                            inputs: [{ name: '_owner', type: 'address' }],
                            name: 'balanceOf',
                            outputs: [{ name: 'balance', type: 'uint256' }],
                            type: 'function',
                            stateMutability: 'view',
                        },
                    ],
                    address: erc20TokenAddress,
                    functionName: 'balanceOf',
                    args: [owner],
                })];
            case 1:
                senderERC20Balance = _a.sent();
                return [2 /*return*/, senderERC20Balance];
        }
    });
}); };
exports.getERC20Balance = getERC20Balance;
var mintERC20Token = function (erc20TokenAddress, publicClient, signer, to, amount, chain, paymaster) { return __awaiter(void 0, void 0, void 0, function () {
    var walletClient, request;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (paymaster == 'pimlico') {
                    if (chain == 'goerli') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.goerli,
                            transport: (0, viem_1.http)(pimlicoRPCURL),
                        });
                    }
                    else if (chain == 'mumbai') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.polygonMumbai,
                            transport: (0, viem_1.http)(pimlicoRPCURL),
                        });
                    }
                    else {
                        throw new Error('Current code only support limited networks. Please make required changes if you want to use custom network.');
                    }
                }
                else if (paymaster == 'alchemy') {
                    if (chain == 'sepolia') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.sepolia,
                            transport: (0, viem_1.http)(alchemyRPCURL),
                        });
                    }
                    else if (chain == 'goerli') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.goerli,
                            transport: (0, viem_1.http)(alchemyRPCURL),
                        });
                    }
                    else {
                        throw new Error('Current code only support limited networks. Please make required changes if you want to use custom network.');
                    }
                }
                else if (paymaster == 'gelato') {
                    if (chain == 'sepolia') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.sepolia,
                            transport: (0, viem_1.http)(gelatoRPCURL),
                        });
                    }
                    else {
                        throw new Error('Current code only support limited networks. Please make required changes if you want to use custom network.');
                    }
                }
                else {
                    throw new Error('Current code only support Pimlico and Alchemy. Please make required changes if you want to use a different Paymaster.');
                }
                return [4 /*yield*/, publicClient.simulateContract({
                        address: erc20TokenAddress,
                        abi: [
                            {
                                inputs: [
                                    { name: 'to', type: 'address' },
                                    { name: 'amount', type: 'uint256' },
                                ],
                                name: 'mint',
                                outputs: [],
                                type: 'function',
                                stateMutability: 'public',
                            },
                        ],
                        functionName: 'mint',
                        args: [to, amount],
                        account: signer,
                    })];
            case 1:
                request = (_a.sent()).request;
                return [4 /*yield*/, walletClient.writeContract(request)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.mintERC20Token = mintERC20Token;
var transferERC20Token = function (erc20TokenAddress, publicClient, signer, to, amount, chain, paymaster) { return __awaiter(void 0, void 0, void 0, function () {
    var walletClient, signerERC20Bal, request;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (paymaster == 'pimlico') {
                    if (chain == 'goerli') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.goerli,
                            transport: (0, viem_1.http)(pimlicoRPCURL),
                        });
                    }
                    else if (chain == 'mumbai') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.polygonMumbai,
                            transport: (0, viem_1.http)(pimlicoRPCURL),
                        });
                    }
                    else {
                        throw new Error('Current code only support limited networks. Please make required changes if you want to use custom network.');
                    }
                }
                else if (paymaster == 'alchemy') {
                    if (chain == 'sepolia') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.sepolia,
                            transport: (0, viem_1.http)(alchemyRPCURL),
                        });
                    }
                    else if (chain == 'goerli') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.goerli,
                            transport: (0, viem_1.http)(alchemyRPCURL),
                        });
                    }
                    else {
                        throw new Error('Current code only support limited networks. Please make required changes if you want to use custom network.');
                    }
                }
                else if (paymaster == 'gelato') {
                    if (chain == 'sepolia') {
                        walletClient = (0, viem_1.createWalletClient)({
                            account: signer,
                            chain: chains_1.sepolia,
                            transport: (0, viem_1.http)(gelatoRPCURL),
                        });
                    }
                    else {
                        throw new Error('Current code only support limited networks. Please make required changes if you want to use custom network.');
                    }
                }
                else {
                    throw new Error('Current code only support Pimlico and Alchemy. Please make required changes if you want to use a different Paymaster.');
                }
                return [4 /*yield*/, (0, exports.getERC20Balance)(erc20TokenAddress, publicClient, signer.address)];
            case 1:
                signerERC20Bal = _a.sent();
                if (signerERC20Bal < amount) {
                    console.log('Signer does not have enough Tokens to transfer. Please transfer required funds.');
                    process.exit(0);
                }
                return [4 /*yield*/, publicClient.simulateContract({
                        address: erc20TokenAddress,
                        abi: [
                            {
                                inputs: [
                                    { name: 'recipient', type: 'address' },
                                    { name: 'amount', type: 'uint256' },
                                ],
                                name: 'transfer',
                                outputs: [{ name: '', type: 'bool' }],
                                type: 'function',
                                stateMutability: 'public',
                            },
                        ],
                        functionName: 'transfer',
                        args: [to, amount],
                        account: signer,
                    })];
            case 2:
                request = (_a.sent()).request;
                return [4 /*yield*/, walletClient.writeContract(request)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.transferERC20Token = transferERC20Token;
