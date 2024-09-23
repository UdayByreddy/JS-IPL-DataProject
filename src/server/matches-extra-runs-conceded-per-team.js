
//Extra runs conceded per team in the year 2016

function getExtraRunsByTeamInaSeason(matches,deliveries,season){

      if(!season){
        return "Please provide the season";
      }
    let extraRunsByTeam = {};               // creating the object

    let matchIds = new Set();

    for(let index=0;index<matches.length;index++){                       // iterate over all matches
        let presentSeason = matches[index].season;            // getting the season of particular match
        if(presentSeason===season){                       // if season should equal to given season
            let match_id = matches[index].id;  
            matchIds.add(match_id);                   // pushing matchid in matchIds array
        } 

    }
  

     // checking if the seson is matching or not
         
            for(let j=0;j<deliveries.length;j++){
                let matches_id = deliveries[j].match_id;
                if(matchIds.has(matches_id)){                       // checking id and match_id are matching or not 
                    let bowlingTeam = deliveries[j].bowling_team;
                    if(!extraRunsByTeam.hasOwnProperty(bowlingTeam)){     // checking the bowlingTeam is in the team
                        extraRunsByTeam[bowlingTeam]=0;
                    }
                    let matchExtraRuns = Number(deliveries[j].extra_runs);   // converting them into numbers and add to bowling team
                    extraRunsByTeam[bowlingTeam]+=matchExtraRuns;

                   /* let matchWideRuns = Number(deliveries[j].wide_runs);   // here wide and no ball runs should be consider if extraruns not inclued
                    extraRuns[bowlingTeam]+=matchWideRuns;

                    let matchNoBallRuns = Number(deliveries[j].noball_runs);
                    extraRuns[bowlingTeam]+=matchNoBallRuns;*/

                }
            }
           
            return extraRunsByTeam;  // returing the extraRuns object
        }
    


module.exports = {getExtraRunsByTeamInaSeason};


