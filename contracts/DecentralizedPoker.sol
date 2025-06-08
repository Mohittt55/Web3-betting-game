// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DecentralizedPoker {
    address public player1;
    address public player2;
    uint256 public betAmount = 0.1 ether;
    bool public gameStarted;
    address public winner;

    modifier onlyPlayers() {
        require(msg.sender == player1 || msg.sender == player2, "Not a player");
        _;
    }

    function joinGame() public payable {
        require(!gameStarted, "Game already started");
        require(msg.value == betAmount, "Invalid bet");

        if (player1 == address(0)) {
            player1 = msg.sender;
        } else if (player2 == address(0)) {
            require(msg.sender != player1, "Already joined");
            player2 = msg.sender;
            gameStarted = true;
        } else {
            revert("Game full");
        }
    }

    function declareWinner() public onlyPlayers {
        require(gameStarted, "Game not started");
        require(winner == address(0), "Winner already declared");

        // Random winner selection (demo purposes)
        uint256 hash = uint256(keccak256(abi.encodePacked(block.timestamp, block.number)));
        winner = hash % 2 == 0 ? player1 : player2;

        payable(winner).transfer(address(this).balance);
    }

    function getPlayers() public view returns (address, address) {
        return (player1, player2);
    }
}
