// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BattleRoyale {
    address public owner;
    uint256 public entryFee = 0.1 ether;
    address[] public players;
    bool public gameStarted;
    bool public winnerDeclared;

    constructor() {
        owner = msg.sender;
    }

    function enterGame() public payable {
        require(!gameStarted, "Game already started");
        require(msg.value == entryFee, "Incorrect ETH sent");

        players.push(msg.sender);
    }

    function startGame() public {
        require(msg.sender == owner, "Only owner can start");
        require(players.length >= 2, "Need at least 2 players");
        gameStarted = true;
    }

    function declareWinner() public {
        require(msg.sender == owner, "Only owner can declare winner");
        require(gameStarted && !winnerDeclared, "Invalid game state");

 uint256 index = uint256(
    keccak256(abi.encodePacked(block.timestamp, block.prevrandao))
) % players.length;


        address winner = players[index];
        payable(winner).transfer(address(this).balance);
        winnerDeclared = true;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
