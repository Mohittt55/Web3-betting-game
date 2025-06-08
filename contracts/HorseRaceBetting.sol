// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HorseRaceBetting {
    struct Bet {
        address player;
        uint horseId;
    }

    Bet[] public bets;
    uint public raceId;
    uint public totalHorses = 5; // Horses with IDs 0-4
    bool public raceStarted;

    address public owner;
    uint256 public betAmount = 0.05 ether;

    constructor() {
        owner = msg.sender;
    }

    function placeBet(uint horseId) public payable {
        require(msg.value == betAmount, "Invalid bet");
        require(horseId < totalHorses, "Invalid horse ID");
        require(!raceStarted, "Race already started");

        bets.push(Bet(msg.sender, horseId));
    }

    function startRace() public {
        require(msg.sender == owner, "Only owner can start");
        require(bets.length >= 2, "Need at least 2 bets");

        raceStarted = true;
        uint winningHorse = uint(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % totalHorses;

        address winner;
        for (uint i = 0; i < bets.length; i++) {
            if (bets[i].horseId == winningHorse) {
                winner = bets[i].player;
                break;
            }
        }

        if (winner != address(0)) {
            payable(winner).transfer(address(this).balance);
        } else {
            payable(owner).transfer(address(this).balance); // No winner fallback
        }

        delete bets;
        raceStarted = false;
        raceId++;
    }

    function getBets() public view returns (Bet[] memory) {
        return bets;
    }
}
