
//Find the strike rate of a batsman for each season

function strikeRateOfABatsman(matches,deliveries){
    let matchesList = matches.reduce((acc,match)=>{
        let matchId = match.id;
        let season = match.season;
        if(!season){
            return acc;
        }
        deliveries.forEach((delivery)=>{
            let id = delivery.match_id;
            if(matchId===id){      // checking id with matchId
            if(!acc[season]){
                acc[season]={};     // checking the season property
            }
            let batsman =delivery.batsman;
            let wideBall = delivery.wide_runs;
            let noBall = delivery.noball_runs;
            let runs = delivery.batsman_runs;
            if(!acc[season][batsman]){    // checking the batsman property inside the season
                acc[season][batsman]={
                    totalSocre:0,
                    totalBall:0
                }
            }
            acc[season][batsman].totalSocre+=runs;
            acc[season][batsman].totalBall+=(wideBall===0&&noBall===0)?1:0;   // if it is not wide ball then we inc the count of the ball
        }
        })
        return acc;

    },{})
   
    let batsmanStrikeRate={};
    Object.entries(matchesList).forEach(([sesaon,players])=>{    // iterate the object
        if(!batsmanStrikeRate[sesaon]){
            batsmanStrikeRate[sesaon]={};
        }
        Object.entries(players).forEach(([player,score])=>{   // adding strike rate to player
            
            if(score.totalBall>0){
                let Sr = (score.totalSocre/score.totalBall)*100;
                batsmanStrikeRate[sesaon][player]=Sr;
            }

        })
    })
    return batsmanStrikeRate;
}

module.exports ={strikeRateOfABatsman};