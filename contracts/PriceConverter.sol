// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    //Get the current price of ETH in USD
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint) {
        (
            ,
            /*uint80 roundId*/ int256 price /*uint256 startedAt*/ /*uint256 updatedAt*/ /*uint80 answeredInRound*/,
            ,
            ,

        ) = priceFeed.latestRoundData(); //Get the current price of ETH in USD
        return uint(price * 1e10); //Returns the price and cast it from int256 to uint256
    }

    //Convert an amount from ETH to USD
    function getConversionRate(
        uint ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint) {
        uint ethPrice = getPrice(priceFeed);
        uint ethAmountInUsd = (ethPrice * ethAmount) / 1e18; //(CurrentPriceofETH * AmountofETH) / 1e18. This gets the amount of ETH in USD
        return ethAmountInUsd;
    }
}
