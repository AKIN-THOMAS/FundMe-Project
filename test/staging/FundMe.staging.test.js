const { assert } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const chainId = network.config.chainId

chainId === 31337
    ? describe.skip
    : describe("FundMe staging testing", async () => {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("1") //1 ETH
          //Deploy the contract to hardhat
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async () => {
              await fundMe.fund({ value: sendValue })
              //   await fundTxResponse.wait(1)
              await fundMe.withdraw()
              //   await withdrawTxResponse.wait(1)
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  `The ending balance is: ${endingBalance}. It should be equal to zero(0). Running assert...`
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })