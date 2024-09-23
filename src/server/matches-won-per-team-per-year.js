
//Number of matches won per team per year in IPL.

function getAllIPLWonMatchesForSeason(matches){
    let wonMatches = {};                  // create an object

    for(let index=0;index<matches.length;index++){
        let winner = matches[index].winner;
        if(!winner){   // checking if winner is null or undefined
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

module.exports = {getAllIPLWonMatchesForSeason};