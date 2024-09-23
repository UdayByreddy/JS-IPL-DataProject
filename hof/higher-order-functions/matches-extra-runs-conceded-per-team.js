//Extra runs conceded per team in the year 2016
function extraRunsConcededIn2016(matches,deliveries,season){
    
    if(!season){
        return "Enter sesaon please";
    }

    let matchesId = matches
    .filter(match=>match.season===season)   // if season should equal to given season
    .map(match=>match.id);   //   // pushing matchid in matchIds array
   
    // checking if the seson is matching or not

    let extraRuns = deliveries.reduce((acc,delivery)=>{
        let id = delivery.match_id;
        if(matchesId.includes(id)){            // checking id and match_id are matching or not 
            let extraRuns = delivery.extra_runs;
            let team = delivery.bowling_team;
            if(!acc[team]){              // // checking the bowlingTeam is in the team
                acc[team]=0;
            }
            acc[team]+=extraRuns;
            
        }
        return acc;
    },{});

   return extraRuns;

    
}

module.exports = {extraRunsConcededIn2016};