"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeMultiSend = void 0;
var viem_1 = require("viem");
var encodeInternalTransaction = function (tx) {
    var encoded = (0, viem_1.encodePacked)(['uint8', 'address', 'uint256', 'uint256', 'bytes'], [tx.operation, tx.to, tx.value, BigInt(tx.data.slice(2).length / 2), tx.data]);
    return encoded.slice(2);
};
var encodeMultiSend = function (txs) {
    var data = "0x".concat(txs.map(function (tx) { return encodeInternalTransaction(tx); }).join(''));
    return (0, viem_1.encodeFunctionData)({
        abi: [
            {
                inputs: [{ internalType: 'bytes', name: 'transactions', type: 'bytes' }],
                name: 'multiSend',
                outputs: [],
                stateMutability: 'payable',
                type: 'function',
            },
        ],
        functionName: 'multiSend',
        args: [data],
    });
};
exports.encodeMultiSend = encodeMultiSend;
