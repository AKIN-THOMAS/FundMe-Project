const { getNamedAccounts, ethers } = require("hardhat")

const main = async () => {
    const funds = ethers.utils.parseEther("1")

    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Funding Contract...")
    const txResponse = await fundMe.fund({ value: funds })
    await txResponse.wait(1)
    console.log("Funded!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
