export const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newValue",
        "type": "string"
      }
    ],
    "name": "setStringValue1",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newValue",
        "type": "string"
      }
    ],
    "name": "setStringValue2",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "oldValue",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newValue",
        "type": "string"
      }
    ],
    "name": "StringValueChanged",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getStringValue1",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getStringValue2",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const