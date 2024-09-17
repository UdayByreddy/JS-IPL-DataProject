const matches = require("./data/jsonData/matches.json");
const deliveries = require("./data/jsonData/deliveries.json");
const fs = require("fs").promises;  // Using fs.promises for async file operations

const { getBestEconomyBowlerInSuperOvers } = require("./server/bowler-bestEconomy-in-superOvers");
const { getHighestNumberOfTimesDismissedPlayers } = require("./server/highest-number-time-player-dismissed-player");
const { getExtraRunsByTeamInaSeason } = require("./server/matches-extra-runs-conceded-per-team");
const { getNoOfMatchesPlayedByTeamInAllSeasons } = require("./server/matches-per-year");
const { getTop10EconomicalBowlers } = require("./server/matches-top-economical-bowler-2015");
const { getAllIPLWonMatchesForSeason } = require("./server/matches-won-per-team-per-year");
const { getAllTeamsWhoWonMatchAndToss } = require("./server/matches-wonTossAndMatch-by-team");
const { getHighestNumberPlayerOfMatchAwardForSeason } = require("./server/player-has-highestNumber-of-playerOfTheMatch");
const { getStrikeRateOfBatsmanBySeason } = require("./server/strikeRate-of-a-batsman-season");

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

// Writing all data concurrently using Promise.all
Promise.all([
  fs.writeFile("./public/output/bowlerBestEconomyInsuperOver.json", JSON.stringify(bestEconomyBowlerInSuperOver, null, 2)),
  fs.writeFile("./public/output/highestNumberOfDismissed.json", JSON.stringify(maxDissalPlayer, null, 2)),
  fs.writeFile("./public/output/matchesExtraRuns.json", JSON.stringify(extraRunsByTeam, null, 2)),
  fs.writeFile("./public/output/matchesPerYear.json", JSON.stringify(matchesPlayed, null, 2)),
  fs.writeFile("./public/output/matchesTopEconomicalBowlers.json", JSON.stringify(topEconomicalBowlers, null, 2)),
  fs.writeFile("./public/output/matchesWonPerTeamPerYear.json", JSON.stringify(wonMatches, null, 2)),
  fs.writeFile("./public/output/matchesWonTossAndMatch.json", JSON.stringify(matchAndTossWonTeams, null, 2)),
  fs.writeFile("./public/output/highestNumberOfPlayerOfMatch.json", JSON.stringify(highestNumberOfPlayerOfMatchAwardBySeason, null, 2)),
  fs.writeFile("./public/output/strikeRateOfEachBatmanInSeason.json", JSON.stringify(strikeRateOfBatsmanBySeason, null, 2))
])
.then(() => {
  console.log("All files written successfully!");
})
.catch((error) => {
  console.error("Error writing files:", error);
});
