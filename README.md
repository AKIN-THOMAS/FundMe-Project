# Sample Hardhat Project
# FundMe

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Fund Me is a decentralized application (dApp) built on the Ethereum blockchain using Solidity smart contracts. The application allows people to fund and support those in need of financial assistance for medical treatment, education, or other personal expenses. The project utilizes Chainlink's Price Converter library to ensure that the minimum funding requirement in USD is met before allowing individuals to fund.

The Fund Me contract is designed such that only the contract owner can withdraw the funds raised. The project was developed using Hardhat, a popular Ethereum development environment, and tested using Mocha and Chai, industry-standard testing frameworks. The contract was deployed to the Sepolia testnet for public testing and verification of its functionality.

The project demonstrates the power of blockchain technology to create transparent, secure, and decentralized financial applications that benefit people in need.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
