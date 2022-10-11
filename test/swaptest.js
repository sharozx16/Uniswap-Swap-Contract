
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

   const  DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
    const WETH9 = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

describe("swapExamples", function () {

  it("ExactInputSingle", async function () {
    // Contracts are deployed using the first signer/account by default
    const account = await ethers.getSigners();

    const weth = await ethers.getContractAt("IWETH", WETH9);
    const dai = await ethers.getContractAt("IERC20", DAI);
    
    const SwapExamples= await ethers.getContractFactory("SwapExamples");
    const swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();

    const amountIn = 10n ** 18n;

    await weth.connect(account[0]).deposit({value: amountIn});
    await weth.connect(account[0]).approve(swapExamples.address, amountIn);

    await swapExamples.swapExactInputSingle(amountIn);
    
    console.log("DAI balance", await dai.balanceOf(account[0].address));
   });
  });

