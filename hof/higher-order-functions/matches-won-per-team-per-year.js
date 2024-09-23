//Number of matches won per team per year in IPL.
function matchesWonPerTeamPerYear(matches){
    let listOfTeams = matches.reduce((acc,match)=>{
        let winner = match.winner;
        let season = match.season;
        if(!season){   // checking if winner is null or undefined
            return acc;
        }
        if(!acc[winner]){
            acc[winner]={};
        }
        if(!acc[winner][season]){ // checking the season in the wonMatches object
            acc[winner][season]=0;
        }
        acc[winner][season]++; // increment the winner count by season
        return acc;
    },{});
    return listOfTeams;
}

module.exports = {matchesWonPerTeamPerYear};