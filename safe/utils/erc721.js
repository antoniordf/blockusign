"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMintingCallData = void 0;
var viem_1 = require("viem");
var generateMintingCallData = function (to) {
    var transferData = (0, viem_1.encodeFunctionData)({
        abi: [
            {
                inputs: [{ name: '_to', type: 'address' }],
                name: 'safeMint',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
        args: [to],
    });
    return transferData;
};
exports.generateMintingCallData = generateMintingCallData;
