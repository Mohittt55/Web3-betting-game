// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SportsPrediction {
    address public owner;
    uint256 public betAmount = 0.05 ether;
    bool public resultDeclared;
    string public matchWinner;

    mapping(address => string) public predictions;
    address[] public bettors;

    constructor() {
        owner = msg.sender;
    }

    function placePrediction(string memory team) public payable {
        require(msg.value == betAmount, "Must bet 0.05 ETH");
        require(bytes(predictions[msg.sender]).length == 0, "Already bet");
        require(!resultDeclared, "Game over");

        predictions[msg.sender] = team;
        bettors.push(msg.sender);
    }

    function declareResult(string memory winningTeam) public {
        require(msg.sender == owner, "Only owner can declare");
        require(!resultDeclared, "Already declared");

        matchWinner = winningTeam;
        resultDeclared = true;

        uint winners = 0;
        for (uint i = 0; i < bettors.length; i++) {
            if (
                keccak256(bytes(predictions[bettors[i]])) ==
                keccak256(bytes(winningTeam))
            ) {
                winners++;
            }
        }

        if (winners > 0) {
            uint reward = address(this).balance / winners;
            for (uint i = 0; i < bettors.length; i++) {
                if (
                    keccak256(bytes(predictions[bettors[i]])) ==
                    keccak256(bytes(winningTeam))
                ) {
                    payable(bettors[i]).transfer(reward);
                }
            }
        } else {
            payable(owner).transfer(address(this).balance); // fallback
        }

        // Reset
        delete bettors;
    }

    function getPrediction(address user) public view returns (string memory) {
        return predictions[user];
    }
}
