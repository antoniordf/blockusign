# BlocuSign - ETHGlobal London 2024

<p align="center">
  <img src="img/Blocusign_logo.png" alt="Logo" width="300">
</p>

## Description

This project combines Multi-sigs with Account Abstraction & Off-chain compute to allow decentralized organizations to sign PDF documents without .  This would allow DAOs to produce invoice-documents, tax-forms, and other legal documents in a more decentralized fashion. This is crucial for on-boarding the next-generation of Web3 users since it allows Web3 organizations/entities to trustlessly satisfy obligations in the Web2/legal world.
How its made: 

We used Safe AA SDK to produce a multi-sig Smart Wallet that can send transactions without having to pay for gas. We then use Chainlink Functions to call an API that can take the data signed by the multisig and put it into a fillable PDF. We made our own API that allows Chainlink Functions to be used for POST-requests that are non-idempotent.


## Deployed contracts

| Network | Address | Etherscan Verified |
| --------------- | --------------- | --- |
| Sepolia  | [0xc75af90312a4c66c294FDD32CBb56C705A33D5D7](https://sepolia.etherscan.io/address/0xc75af90312a4c66c294FDD32CBb56C705A33D5D7)  | :white_check_mark:  |



Run command line version:
```
tsx scripts/interactive_signers_pimlico.ts
```

Run server:
```
tsx backend/server.ts
```

Run frontend:
```
npm run dev (in /frontend)
```