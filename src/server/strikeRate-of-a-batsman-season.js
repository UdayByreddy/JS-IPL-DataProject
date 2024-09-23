
//Find the strike rate of a batsman for each season

function getStrikeRateOfBatsmanBySeason(matches,deliveries){
    const batsmanBySeason={};    // create an object 

    for(let i=0;i<matches.length;i++){
       let id = matches[i].id;
       for(let j=0;j<deliveries.length;j++){
        let matchId = deliveries[j].match_id;
        if(id===matchId){                              // checking id with matchId
            let season = matches[i].season;
            if(!season){
                continue;
            }
            if(!batsmanBySeason.hasOwnProperty(season)){  // checking the season property
                batsmanBySeason[season]={}                    
            }
            let batsman = deliveries[j].batsman;
            if(!batsmanBySeason[season].hasOwnProperty(batsman)){  // checking the batsman property inside the season
                batsmanBySeason[season][batsman]={
                    totalRuns:0,
                    totalBallsFaced:0
                }
            }
            let totalScore = deliveries[j].batsman_runs;
            let wideBall = deliveries[j].wide_runs;
          

           batsmanBySeason[season][batsman].totalRuns+=totalScore;    // adding the score

            if(wideBall===0){                                                      // if it is not wide ball then we inc the count of the ball
                batsmanBySeason[season][batsman].totalBallsFaced+=1;
            }
            

        }
       }

    }
   
    let strikeRateOfBatsmanBySeason = {};
   
        for(let season in batsmanBySeason){
            if(!strikeRateOfBatsmanBySeason.hasOwnProperty(season)){
                strikeRateOfBatsmanBySeason[season]={};
            }
            for(let bastman in batsmanBySeason[season]){
                let score = batsmanBySeason[season][bastman].totalRuns;
                let balls = batsmanBySeason[season][bastman]. totalBallsFaced;
                if(!strikeRateOfBatsmanBySeason[season].hasOwnProperty(bastman)){
                    strikeRateOfBatsmanBySeason[season][bastman]=0;
                }
                
                if(balls>0){
                    let strikeRate = (score/balls)*100;
                    strikeRateOfBatsmanBySeason[season][bastman]+=strikeRate;
                   
                }
               
            }
        }
        return strikeRateOfBatsmanBySeason;
}

module.exports = {getStrikeRateOfBatsmanBySeason};