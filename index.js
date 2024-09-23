const matches = require("./src/data/jsonData/matches.json");
const deliveries = require("./src/data/jsonData/deliveries.json");
const fs = require("fs").promises;  // Using fs.promises for async file operations

const { getBestEconomyBowlerInSuperOvers } = require("./src/server/bowler-bestEconomy-in-superOvers");
const { getHighestNumberOfTimesDismissedPlayers } = require("./src/server/highest-number-time-player-dismissed-player");
const { getExtraRunsByTeamInaSeason } = require("./src/server/matches-extra-runs-conceded-per-team");
const { getNoOfMatchesPlayedByTeamInAllSeasons } = require("./src/server/matches-per-year");
const { getTop10EconomicalBowlers } = require("./src/server/matches-top-economical-bowler-2015");
const { getAllIPLWonMatchesForSeason } = require("./src/server/matches-won-per-team-per-year");
const { getAllTeamsWhoWonMatchAndToss } = require("./src/server/matches-wonTossAndMatch-by-team");
const { getHighestNumberPlayerOfMatchAwardForSeason } = require("./src/server/player-has-highestNumber-of-playerOfTheMatch");
const { getStrikeRateOfBatsmanBySeason } = require("./src/server/strikeRate-of-a-batsman-season");

// Collecting all data
const bestEconomyBowlerInSuperOver = getBestEconomyBowlerInSuperOvers(deliveries);
const maxDissalPlayer = getHighestNumberOfTimesDismissedPlayers(deliveries);
const extraRunsByTeam = getExtraRunsByTeamInaSeason(matches, deliveries, 2016);
const matchesPlayed = getNoOfMatchesPlayedByTeamInAllSeasons(matches);
const topEconomicalBowlers = getTop10EconomicalBowlers(matches, deliveries, 2015);
const wonMatches = getAllIPLWonMatchesForSeason(matches);
const matchAndTossWonTeams = getAllTeamsWhoWonMatchAndToss(matches);
const highestNumberOfPlayerOfMatchAwardBySeason = getHighestNumberPlayerOfMatchAwardForSeason(matches);
const strikeRateOfBatsmanBySeason = getStrikeRateOfBatsmanBySeason(matches, deliveries);

//  Function to write JSON data to a file
async function  writeJsonToFile(filePath,jsonData) {
  try{
    await fs.writeFile(filePath,JSON.stringify(jsonData,null,2));
    console.log(`${filePath} added`);
  }
  catch(error){
    console.log(`${filePath}`,error);
  }
  
}

// Writing all data concurrently using Promise.all
Promise.all([
  writeJsonToFile("./src/public/output/bowlerBestEconomyInsuperOver.json", bestEconomyBowlerInSuperOver),
  writeJsonToFile("./src/public/output/highestNumberOfDismissed.json", maxDissalPlayer),
  writeJsonToFile("./src/public/output/matchesExtraRuns.json", extraRunsByTeam),
  writeJsonToFile("./src/public/output/matchesPerYear.json", matchesPlayed),
  writeJsonToFile("./src/public/output/matchesTopEconomicalBowlers.json", topEconomicalBowlers),
  writeJsonToFile("./src/public/output/matchesWonPerTeamPerYear.json", wonMatches),
  writeJsonToFile("./src/public/output/matchesWonTossAndMatch.json", matchAndTossWonTeams),
  writeJsonToFile("./src/public/output/highestNumberOfPlayerOfMatch.json", highestNumberOfPlayerOfMatchAwardBySeason),
  writeJsonToFile("./src/public/output/strikeRateOfEachBatmanInSeason.json", strikeRateOfBatsmanBySeason)
])
.then(() => {
  console.log("All files written successfully!");
})
.catch((error) => {
  console.error("Error writing files:", error);
});
