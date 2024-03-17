//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface ChanlinkFunctionsConsumer {
    function sendRequest(
        string calldata source,
        bytes calldata encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] calldata args,
        bytes[] calldata bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external returns (bytes32 requestId);
}

contract blockusign{

    address public lastMsgSender;
    address public lastTxOrigin;
    ChanlinkFunctionsConsumer chainlink = ChanlinkFunctionsConsumer(0xA1cB7CE218a96811a8f96CC9384aBf8aaB112E74); //Sepolia

    function callChainLink() public {

        lastMsgSender = msg.sender;
        lastTxOrigin = tx.origin;

        chainlink.sendRequest(
            "const apiResponse = await Functions.makeHttpRequest({url: 'https://6043-213-152-241-52.ngrok-free.app/generate-pdf', method: 'POST', headers: {'Content-Type': 'application/json'}, data: {title: 'Contract 4',signature1: '0x54Ab3',signature2: '0x73c9A',etherscan: 'https://etherscan.io/tx/0xdbf40c4548ae32e4f48e8f33eecf4ed0f1447dae67425fd7b9d56ca8176ec620',txHash: '0xdbf40c4548ae32e4f48e8f33eecf4ed0f1447dae67425fd7b9d56ca8176ec620'}});return Functions.encodeString(apiResponse.data.data.document);",
            bytes(""),
            0,
            0,
            new string[](0),
            new bytes[](0),
            2144,
            300000,
            0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000
        );
    }
     
}

