const matches = require("../data/jsonData/matches.json");
const fs = require("fs");

//Number of matches won per team per year in IPL.

function getAllIPLWonMatchesForSeason(){
    let wonMatches = {};                  // create an object

    for(let index=0;index<matches.length;index++){
        let winner = matches[index].winner;
        if(winner===null||winner===undefined){   // checking if winner is null or undefined
            continue;
        }
        if(!wonMatches.hasOwnProperty(winner)){     // checking winner team is inside the object or not
            wonMatches[winner]={};
        }
        let season = matches[index].season;
        if(!wonMatches[winner].hasOwnProperty(season)){   // checking the season in the wonMatches object
            wonMatches[winner][season]=0;
        }
        wonMatches[winner][season]+=1;   // increment the winner count by season
    }
     
    return wonMatches;  // return the object
}

const wonMatches = getAllIPLWonMatchesForSeason();
fs.writeFileSync("../public/output/matchesWonPerTeamPerYear.json",JSON.stringify(wonMatches,null,2)); // written the output in the mention path
module.exports = {getAllIPLWonMatchesForSeason};