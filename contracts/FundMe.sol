// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./PriceConverter.sol";

error FundMe__notOwner();

/**
 * @title A contract for funding diseased people
 * @author Bishop Akin-Thomas
 * @notice This contract is to demo a sample funding contract. #It's not real
 * @dev This implements price feeds as our libary
 */

contract FundMe {
    using PriceConverter for uint;

    uint public constant MINIMUM_USD = 50 * 1e18;
    address private immutable owner;
    address[] private funders;
    mapping(address => uint) private amountToFunders;

    AggregatorV3Interface private priceFeed;

    modifier isPriceEnough() {
        //set a minimum fund amount in USD
        require(
            msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
            "Not enough ether"
        );
        _;
    }
    modifier isOwner() {
        // require(owner == msg.sender, "Not the owner");
        if (owner != msg.sender) {
            revert FundMe__notOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function fund() public payable isPriceEnough {
        funders.push(msg.sender);
        amountToFunders[msg.sender] += msg.value; //add address that funded
    }

    function withdraw() public isOwner {
        for (uint i = 0; i < funders.length; i++) {
            address funder = funders[i];
            amountToFunders[funder] = 0;
        }
        //reset the array
        funders = new address[](0);

        /*Withdraw the funded money*/
        /*transfer method*/
        // payable(msg.sender).transfer(address(this).balance);

        /*send method*/
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Sending failed");

        //call method
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return funders[index];
    }

    function getAmountToFunders(address funder) public view returns (uint256) {
        return amountToFunders[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return priceFeed;
    }
}
