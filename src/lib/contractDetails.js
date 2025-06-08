
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.

export const battleRoyaleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const battleRoyaleABI = [
  "constructor()",
  "function declareWinner()",
  "function enterGame() payable",
  "function entryFee() view returns (uint256)",
  "function gameStarted() view returns (bool)",
  "function getPlayers() view returns (address[])",
  "function owner() view returns (address)",
  "function players(uint256) view returns (address)",
  "function startGame()",
  "function winnerDeclared() view returns (bool)"
];

export const decentralizedPokerAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const decentralizedPokerABI = [
  "function betAmount() view returns (uint256)",
  "function declareWinner()",
  "function gameStarted() view returns (bool)",
  "function getPlayers() view returns (address,address)",
  "function joinGame() payable",
  "function player1() view returns (address)",
  "function player2() view returns (address)",
  "function winner() view returns (address)"
];

export const horseRaceBettingAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
export const horseRaceBettingABI = [
  "constructor()",
  "function betAmount() view returns (uint256)",
  "function bets(uint256) view returns (address,uint256)",
  "function getBets() view returns ((address,uint256)[])",
  "function owner() view returns (address)",
  "function placeBet(uint256) payable",
  "function raceId() view returns (uint256)",
  "function raceStarted() view returns (bool)",
  "function startRace()",
  "function totalHorses() view returns (uint256)"
];

export const predictionDuelAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export const predictionDuelABI = [
  "constructor()",
  "function betAmount() view returns (uint256)",
  "function correctAnswer() view returns (string)",
  "function declareResult(string)",
  "function joinAndPredict(string) payable",
  "function owner() view returns (address)",
  "function player1() view returns (address)",
  "function player2() view returns (address)",
  "function prediction1() view returns (string)",
  "function prediction2() view returns (string)",
  "function resultDeclared() view returns (bool)"
];

export const sportsPredictionAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
export const sportsPredictionABI = [
  "constructor()",
  "function betAmount() view returns (uint256)",
  "function bettors(uint256) view returns (address)",
  "function declareResult(string)",
  "function getPrediction(address) view returns (string)",
  "function matchWinner() view returns (string)",
  "function owner() view returns (address)",
  "function placePrediction(string) payable",
  "function predictions(address) view returns (string)",
  "function resultDeclared() view returns (bool)"
];
