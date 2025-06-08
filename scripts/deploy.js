const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // 1. BattleRoyale
  const BattleRoyale = await hre.ethers.getContractFactory("BattleRoyale");
  const battleRoyale = await BattleRoyale.deploy();
  await battleRoyale.waitForDeployment();
  const battleRoyaleAddress = await battleRoyale.getAddress();
  const battleRoyaleABI = battleRoyale.interface.format("json");
  console.log("✅ BattleRoyale deployed to:", battleRoyaleAddress);

  // 2. DecentralizedPoker
  const DecentralizedPoker = await hre.ethers.getContractFactory("DecentralizedPoker");
  const decentralizedPoker = await DecentralizedPoker.deploy();
  await decentralizedPoker.waitForDeployment();
  const decentralizedPokerAddress = await decentralizedPoker.getAddress();
  const decentralizedPokerABI = decentralizedPoker.interface.format("json");
  console.log("✅ DecentralizedPoker deployed to:", decentralizedPokerAddress);

  // 3. HorseRaceBetting
  const HorseRaceBetting = await hre.ethers.getContractFactory("HorseRaceBetting");
  const horseRaceBetting = await HorseRaceBetting.deploy();
  await horseRaceBetting.waitForDeployment();
  const horseRaceBettingAddress = await horseRaceBetting.getAddress();
  const horseRaceBettingABI = horseRaceBetting.interface.format("json");
  console.log("✅ HorseRaceBetting deployed to:", horseRaceBettingAddress);

  // 4. PredictionDuel
  const PredictionDuel = await hre.ethers.getContractFactory("PredictionDuel");
  const predictionDuel = await PredictionDuel.deploy();
  await predictionDuel.waitForDeployment();
  const predictionDuelAddress = await predictionDuel.getAddress();
  const predictionDuelABI = predictionDuel.interface.format("json");
  console.log("✅ PredictionDuel deployed to:", predictionDuelAddress);

  // 5. SportsPrediction
  const SportsPrediction = await hre.ethers.getContractFactory("SportsPrediction");
  const sportsPrediction = await SportsPrediction.deploy();
  await sportsPrediction.waitForDeployment();
  const sportsPredictionAddress = await sportsPrediction.getAddress();
  const sportsPredictionABI = sportsPrediction.interface.format("json");
  console.log("✅ SportsPrediction deployed to:", sportsPredictionAddress);

  // Ensure target folder exists
  const outputDir = path.join(__dirname, "../src/lib");
  fs.mkdirSync(outputDir, { recursive: true });

  // Write all addresses & ABIs to one file
  const outputPath = path.join(outputDir, "contractDetails.js");
  const outputContent = `
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.

export const battleRoyaleAddress = "${battleRoyaleAddress}";
export const battleRoyaleABI = ${JSON.stringify(battleRoyaleABI, null, 2)};

export const decentralizedPokerAddress = "${decentralizedPokerAddress}";
export const decentralizedPokerABI = ${JSON.stringify(decentralizedPokerABI, null, 2)};

export const horseRaceBettingAddress = "${horseRaceBettingAddress}";
export const horseRaceBettingABI = ${JSON.stringify(horseRaceBettingABI, null, 2)};

export const predictionDuelAddress = "${predictionDuelAddress}";
export const predictionDuelABI = ${JSON.stringify(predictionDuelABI, null, 2)};

export const sportsPredictionAddress = "${sportsPredictionAddress}";
export const sportsPredictionABI = ${JSON.stringify(sportsPredictionABI, null, 2)};
`;

  fs.writeFileSync(outputPath, outputContent);
  console.log("✅ All ABIs and addresses saved to src/lib/contractDetails.js");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
