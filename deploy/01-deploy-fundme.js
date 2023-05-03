//imports
const { network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    //Should use a mock when going for localhost network or hardhat
    if (chainId === 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]
    log("Deploying Fundme contract and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //The Price Feed Address is to enter the constructor in the contract.
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Fudme contracts deployed at: ${fundMe.address}`)
    log("___________________________________________")

    // await verify(fundMe.address, args)

    if (chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundme"]


