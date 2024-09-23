
//Number of matches played per year for all the years in IPL.

function getNoOfMatchesPlayedByTeamInAllSeasons(matches){
    const matchesPlayed = {};             // created a object
    for(let index=0;index<matches.length;index++){
        let team1 = matches[index].team1;          // intalized the variables
        let team2 = matches[index].team2;
        let season = matches[index].season;
        if(!season){         // continue the loop if season is undefined
          continue;
        }
        if(!matchesPlayed.hasOwnProperty(season)){      // checking if season is present or not
          matchesPlayed[season]={};
        }
        if(!matchesPlayed[season].hasOwnProperty(team1)){    // checking team is present in particular season
          matchesPlayed[season][team1]=0;
        }
      if(!matchesPlayed[season].hasOwnProperty(team2)){
        matchesPlayed[season][team2]=0;
      }  
      matchesPlayed[season][team1]+=1;     // increment the count of teams
      matchesPlayed[season][team2]+=1;
    }
    return matchesPlayed;      // return the match
}

module.exports = {getNoOfMatchesPlayedByTeamInAllSeasons};