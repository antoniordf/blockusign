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

contract docusign{

    address public lastMsgSender;
    address public lastTxOrigin;
    ChanlinkFunctionsConsumer chainlink = ChanlinkFunctionsConsumer(0x4377F894e52Dfd0921F0f8b50D45f7c7232Ec2ce); //Mumbai

    function increase() public {

        lastMsgSender = msg.sender;
        lastTxOrigin = tx.origin;

        chainlink.sendRequest(
            "const apiResponse = await Functions.makeHttpRequest({url: `https://blockusign-05843e86beea.herokuapp.com/generate-pdf`, method: 'POST'});return Functions.encodeString(apiResponse.data.data.document);",
            bytes(""),
            0,
            0,
            new string[](0),
            new bytes[](0),
            1402,
            300000,
            0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000
        );
    }
     
}