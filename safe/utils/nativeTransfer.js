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
exports.transferETH = void 0;
var dotenv_1 = require("dotenv");
var viem_1 = require("viem");
var chains_1 = require("viem/chains");
var promises_1 = require("timers/promises");
dotenv_1.default.config();
var pimlicoRPCURL = process.env.PIMLICO_RPC_URL;
var alchemyRPCURL = process.env.ALCHEMY_RPC_URL;
var gelatoRPCURL = process.env.GELATO_RPC_URL;
var transferETH = function (publicClient, signer, receiver, amount, chain, paymaster) { return __awaiter(void 0, void 0, void 0, function () {
    var walletClient, userETHBalance;
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
                        throw new Error('For Pimlico, current code only support using Goerli. Please make required changes if you want to use custom network.');
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
                    throw new Error('Current code only support Pimlico, Alchemy and Gelato. Please make required changes if you want to use a different Paymaster.');
                }
                return [4 /*yield*/, publicClient.getBalance({
                        address: signer.address,
                    })];
            case 1:
                userETHBalance = _a.sent();
                if (!(userETHBalance < amount)) return [3 /*break*/, 6];
                console.log('\nSigner does not have enough balance to deposit to Safe. Deposit atleast', amount, 'wei.');
                _a.label = 2;
            case 2:
                if (!(userETHBalance < amount)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, promises_1.setTimeout)(15000)];
            case 3:
                _a.sent();
                return [4 /*yield*/, publicClient.getBalance({
                        address: signer.address,
                    })];
            case 4:
                userETHBalance = _a.sent();
                return [3 /*break*/, 2];
            case 5:
                console.log('\nSigner now have enough balance for depositing ETH to Safe Transfer.');
                _a.label = 6;
            case 6: return [4 /*yield*/, walletClient.sendTransaction({
                    to: receiver,
                    value: amount,
                })];
            case 7:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.transferETH = transferETH;
