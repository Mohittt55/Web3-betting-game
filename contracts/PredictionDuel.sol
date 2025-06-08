// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PredictionDuel {
    address public owner;
    address public player1;
    address public player2;

    string public prediction1;
    string public prediction2;

    string public correctAnswer;
    bool public resultDeclared;

    uint256 public betAmount = 0.1 ether;

    constructor() {
        owner = msg.sender;
    }

    function joinAndPredict(string memory prediction) public payable {
        require(msg.value == betAmount, "Must bet 0.1 ETH");
        require(player1 == address(0) || player2 == address(0), "Game full");

        if (player1 == address(0)) {
            player1 = msg.sender;
            prediction1 = prediction;
        } else if (player2 == address(0)) {
            require(msg.sender != player1, "Already joined");
            player2 = msg.sender;
            prediction2 = prediction;
        }
    }

    function declareResult(string memory _correctAnswer) public {
        require(msg.sender == owner, "Only owner can declare");
        require(!resultDeclared, "Result already declared");

        correctAnswer = _correctAnswer;
        resultDeclared = true;

        if (
            keccak256(bytes(prediction1)) == keccak256(bytes(correctAnswer)) &&
            keccak256(bytes(prediction2)) != keccak256(bytes(correctAnswer))
        ) {
            payable(player1).transfer(address(this).balance);
        } else if (
            keccak256(bytes(prediction2)) == keccak256(bytes(correctAnswer)) &&
            keccak256(bytes(prediction1)) != keccak256(bytes(correctAnswer))
        ) {
            payable(player2).transfer(address(this).balance);
        } else {
            payable(owner).transfer(address(this).balance); // Draw or both wrong
        }
    }
}
