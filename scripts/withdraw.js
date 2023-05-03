const { getNamedAccounts, ethers } = require("hardhat")

const main = async () => {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Withdrawing Funds...")
    const txResponse = await fundMe.withdraw()
    await txResponse.wait(1)
    console.log("Funds withdrawn");
}
// echo \"Error: no test specified\" && exit 1

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
