const fs = require('fs').promises;
const matches = require("../src/data/jsonData/matches.json");
const deliveries = require("../src/data/jsonData/deliveries.json");

const { getMatchesPerYear } = require('./higher-order-functions/matches-per-year');
const { matchesWonPerTeamPerYear } = require('./higher-order-functions/matches-won-per-team-per-year');
const { extraRunsConcededIn2016 } = require('./higher-order-functions/matches-extra-runs-conceded-per-team');
const { economicalBowlersIn2015 } = require('./higher-order-functions/matches-top-economical-bowler-2015');
const { teamWinBothTossAndMatch } = require('./higher-order-functions/matches-wonTossAndMatch-by-team');
const { getHighestTimePlayerOfMatch } = require('./higher-order-functions/player-has-highestNumber-of-playerOfTheMatch');
const { strikeRateOfABatsman } = require('./higher-order-functions/strikeRate-of-a-batsman-season');
const { playerDismissedByAnotherOne } = require('./higher-order-functions/highest-number-time-player-dismissed-player');
const { bestEconomyBolwerInSuperOver } = require('./higher-order-functions/bestEconomy-in-superOvers');

// Collecting all data
const bestEconomyBowler = bestEconomyBolwerInSuperOver(deliveries);
const maxDissalPlayer = playerDismissedByAnotherOne(deliveries);
const extraRunsByTeam = extraRunsConcededIn2016(matches, deliveries, 2016);
const matchesPlayed = getMatchesPerYear(matches);
const topEconomicalBowlers = economicalBowlersIn2015(matches, deliveries, 2015);
const wonMatches = matchesWonPerTeamPerYear(matches);
const matchAndTossWonTeams = teamWinBothTossAndMatch(matches);
const highestNumberOfPlayerOfMatchAwardBySeason = getHighestTimePlayerOfMatch(matches);
const strikeRateOfBatsmanBySeason = strikeRateOfABatsman(matches, deliveries);

// Function to write JSON data to a file
async function writeJsonToFile(filePath, jsonData) {
  try {
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    console.log(`${filePath} added`);
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

// Writing all data concurrently using Promise.all
Promise.all([
  writeJsonToFile("./output/bowlerBestEconomyInsuperOver.json", bestEconomyBowler),
  writeJsonToFile("./output/highestNumberOfDismissed.json", maxDissalPlayer),
  writeJsonToFile("./output/matchesExtraRuns.json", extraRunsByTeam),
  writeJsonToFile("./output/matchesPerYear.json", matchesPlayed),
  writeJsonToFile("./output/ matchesTopEconomicalBowlers.json", topEconomicalBowlers),
  writeJsonToFile("./output/matchesWonPerTeamPerYear.json", wonMatches),
  writeJsonToFile("./output/matchesWonTossAndMatch.json", matchAndTossWonTeams),
  writeJsonToFile("./output/highestNumberOfPlayerOfMatch.json", highestNumberOfPlayerOfMatchAwardBySeason),
  writeJsonToFile("./output/strikeRateOfEachBatmanInSeason.json", strikeRateOfBatsmanBySeason)
])
.then(() => {
  console.log("All files written successfully!");
})
.catch((error) => {
  console.error("Error writing files:", error);
});
