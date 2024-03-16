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
exports.getAccountAddress = exports.encodeCallData = exports.EIP712_SAFE_OPERATION_TYPE = exports.getAccountInitCode = exports.enableModuleCallData = exports.SAFE_ADDRESSES_MAP = void 0;
var viem_1 = require("viem");
var multisend_1 = require("./multisend");
var erc20_1 = require("./erc20");
exports.SAFE_ADDRESSES_MAP = {
    '1.4.1': {
        '11155111': {
            ADD_MODULES_LIB_ADDRESS: '0x8EcD4ec46D4D2a6B64fE960B3D64e8B94B2234eb',
            SAFE_4337_MODULE_ADDRESS: '0xa581c4A4DB7175302464fF3C06380BC3270b4037',
            SAFE_PROXY_FACTORY_ADDRESS: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            SAFE_SINGLETON_ADDRESS: '0x41675C099F32341bf84BFc5382aF534df5C7461a',
        },
        '5': {
            ADD_MODULES_LIB_ADDRESS: '0x8EcD4ec46D4D2a6B64fE960B3D64e8B94B2234eb',
            SAFE_4337_MODULE_ADDRESS: '0xa581c4A4DB7175302464fF3C06380BC3270b4037',
            SAFE_PROXY_FACTORY_ADDRESS: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            SAFE_SINGLETON_ADDRESS: '0x41675C099F32341bf84BFc5382aF534df5C7461a',
        },
        '80001': {
            ADD_MODULES_LIB_ADDRESS: '0x8EcD4ec46D4D2a6B64fE960B3D64e8B94B2234eb',
            SAFE_4337_MODULE_ADDRESS: '0xa581c4A4DB7175302464fF3C06380BC3270b4037',
            SAFE_PROXY_FACTORY_ADDRESS: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
            SAFE_SINGLETON_ADDRESS: '0x41675C099F32341bf84BFc5382aF534df5C7461a',
        },
    },
};
var getInitializerCode = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var setupTxs, multiSendCallData;
    var owner = _b.owner, addModuleLibAddress = _b.addModuleLibAddress, safe4337ModuleAddress = _b.safe4337ModuleAddress, multiSendAddress = _b.multiSendAddress, erc20TokenAddress = _b.erc20TokenAddress, paymasterAddress = _b.paymasterAddress;
    return __generator(this, function (_c) {
        setupTxs = [
            {
                to: addModuleLibAddress,
                data: (0, exports.enableModuleCallData)(safe4337ModuleAddress),
                value: 0n,
                operation: 1, // 1 = DelegateCall required for enabling the module
            },
        ];
        if (erc20TokenAddress != viem_1.zeroAddress && paymasterAddress != viem_1.zeroAddress) {
            setupTxs.push({
                to: erc20TokenAddress,
                data: (0, erc20_1.generateApproveCallData)(paymasterAddress),
                value: 0n,
                operation: 0, // 0 = Call
            });
        }
        multiSendCallData = (0, multisend_1.encodeMultiSend)(setupTxs);
        return [2 /*return*/, (0, viem_1.encodeFunctionData)({
                abi: [
                    {
                        inputs: [
                            {
                                internalType: 'address[]',
                                name: '_owners',
                                type: 'address[]',
                            },
                            {
                                internalType: 'uint256',
                                name: '_threshold',
                                type: 'uint256',
                            },
                            {
                                internalType: 'address',
                                name: 'to',
                                type: 'address',
                            },
                            {
                                internalType: 'bytes',
                                name: 'data',
                                type: 'bytes',
                            },
                            {
                                internalType: 'address',
                                name: 'fallbackHandler',
                                type: 'address',
                            },
                            {
                                internalType: 'address',
                                name: 'paymentToken',
                                type: 'address',
                            },
                            {
                                internalType: 'uint256',
                                name: 'payment',
                                type: 'uint256',
                            },
                            {
                                internalType: 'address payable',
                                name: 'paymentReceiver',
                                type: 'address',
                            },
                        ],
                        name: 'setup',
                        outputs: [],
                        stateMutability: 'nonpayable',
                        type: 'function',
                    },
                ],
                functionName: 'setup',
                args: [[owner], 1n, multiSendAddress, multiSendCallData, safe4337ModuleAddress, viem_1.zeroAddress, 0n, viem_1.zeroAddress],
            })];
    });
}); };
var enableModuleCallData = function (safe4337ModuleAddress) {
    return (0, viem_1.encodeFunctionData)({
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address[]',
                        name: 'modules',
                        type: 'address[]',
                    },
                ],
                name: 'enableModules',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
        functionName: 'enableModules',
        args: [[safe4337ModuleAddress]],
    });
};
exports.enableModuleCallData = enableModuleCallData;
var getAccountInitCode = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var initializer, initCodeCallData;
    var owner = _b.owner, addModuleLibAddress = _b.addModuleLibAddress, safe4337ModuleAddress = _b.safe4337ModuleAddress, safeProxyFactoryAddress = _b.safeProxyFactoryAddress, safeSingletonAddress = _b.safeSingletonAddress, _c = _b.saltNonce, saltNonce = _c === void 0 ? 0n : _c, multiSendAddress = _b.multiSendAddress, erc20TokenAddress = _b.erc20TokenAddress, paymasterAddress = _b.paymasterAddress;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!owner)
                    throw new Error('Owner account not found');
                return [4 /*yield*/, getInitializerCode({
                        owner: owner,
                        addModuleLibAddress: addModuleLibAddress,
                        safe4337ModuleAddress: safe4337ModuleAddress,
                        multiSendAddress: multiSendAddress,
                        erc20TokenAddress: erc20TokenAddress,
                        paymasterAddress: paymasterAddress,
                    })];
            case 1:
                initializer = _d.sent();
                initCodeCallData = (0, viem_1.encodeFunctionData)({
                    abi: [
                        {
                            inputs: [
                                {
                                    internalType: 'address',
                                    name: '_singleton',
                                    type: 'address',
                                },
                                {
                                    internalType: 'bytes',
                                    name: 'initializer',
                                    type: 'bytes',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'saltNonce',
                                    type: 'uint256',
                                },
                            ],
                            name: 'createProxyWithNonce',
                            outputs: [
                                {
                                    internalType: 'contract SafeProxy',
                                    name: 'proxy',
                                    type: 'address',
                                },
                            ],
                            stateMutability: 'nonpayable',
                            type: 'function',
                        },
                    ],
                    functionName: 'createProxyWithNonce',
                    args: [safeSingletonAddress, initializer, saltNonce],
                });
                return [2 /*return*/, (0, viem_1.concatHex)([safeProxyFactoryAddress, initCodeCallData])];
        }
    });
}); };
exports.getAccountInitCode = getAccountInitCode;
exports.EIP712_SAFE_OPERATION_TYPE = {
    SafeOp: [
        { type: 'address', name: 'safe' },
        { type: 'uint256', name: 'nonce' },
        { type: 'bytes', name: 'initCode' },
        { type: 'bytes', name: 'callData' },
        { type: 'uint256', name: 'callGasLimit' },
        { type: 'uint256', name: 'verificationGasLimit' },
        { type: 'uint256', name: 'preVerificationGas' },
        { type: 'uint256', name: 'maxFeePerGas' },
        { type: 'uint256', name: 'maxPriorityFeePerGas' },
        { type: 'bytes', name: 'paymasterAndData' },
        { type: 'uint48', name: 'validAfter' },
        { type: 'uint48', name: 'validUntil' },
        { type: 'address', name: 'entryPoint' },
    ],
};
var encodeCallData = function (params) {
    return (0, viem_1.encodeFunctionData)({
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes',
                    },
                    {
                        internalType: 'uint8',
                        name: 'operation',
                        type: 'uint8',
                    },
                ],
                name: 'executeUserOp',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
        functionName: 'executeUserOp',
        args: [params.to, params.value, params.data, 0],
    });
};
exports.encodeCallData = encodeCallData;
var getAccountAddress = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var proxyCreationCode, deploymentCode, initializer, salt;
    var client = _b.client, owner = _b.owner, addModuleLibAddress = _b.addModuleLibAddress, safe4337ModuleAddress = _b.safe4337ModuleAddress, safeProxyFactoryAddress = _b.safeProxyFactoryAddress, safeSingletonAddress = _b.safeSingletonAddress, _c = _b.saltNonce, saltNonce = _c === void 0 ? 0n : _c, multiSendAddress = _b.multiSendAddress, erc20TokenAddress = _b.erc20TokenAddress, paymasterAddress = _b.paymasterAddress;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, client.readContract({
                    abi: [
                        {
                            inputs: [],
                            name: 'proxyCreationCode',
                            outputs: [
                                {
                                    internalType: 'bytes',
                                    name: '',
                                    type: 'bytes',
                                },
                            ],
                            stateMutability: 'pure',
                            type: 'function',
                        },
                    ],
                    address: safeProxyFactoryAddress,
                    functionName: 'proxyCreationCode',
                })];
            case 1:
                proxyCreationCode = _d.sent();
                deploymentCode = (0, viem_1.encodePacked)(['bytes', 'uint256'], [proxyCreationCode, (0, viem_1.hexToBigInt)(safeSingletonAddress)]);
                return [4 /*yield*/, getInitializerCode({
                        owner: owner,
                        addModuleLibAddress: addModuleLibAddress,
                        safe4337ModuleAddress: safe4337ModuleAddress,
                        multiSendAddress: multiSendAddress,
                        erc20TokenAddress: erc20TokenAddress,
                        paymasterAddress: paymasterAddress,
                    })];
            case 2:
                initializer = _d.sent();
                salt = (0, viem_1.keccak256)((0, viem_1.encodePacked)(['bytes32', 'uint256'], [(0, viem_1.keccak256)((0, viem_1.encodePacked)(['bytes'], [initializer])), saltNonce]));
                return [2 /*return*/, (0, viem_1.getContractAddress)({
                        from: safeProxyFactoryAddress,
                        salt: salt,
                        bytecode: deploymentCode,
                        opcode: 'CREATE2',
                    })];
        }
    });
}); };
exports.getAccountAddress = getAccountAddress;
