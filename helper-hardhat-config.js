const networkConfig = {
    31337: {
        name: "localhost"
    },
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    // 137: {
    //     name: "mumbai", //Polygon Testnet
    //     ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    // },
}
const developmentChains = ["hardhat", "localhost"]


module.exports = {
    networkConfig,
    developmentChains,
}
