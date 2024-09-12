const matches = require("../data/jsonData/matches.json");
const deliveries = require("../data/jsonData/deliveries.json");
const fs = require("fs");
//  Find the bowler with the best economy in super overs

function getBestEconomyBowlerInSuperOvers(){
    let bowlerList ={};
    let matchesId = new Set();
    for(let index=0;index<matches.length;index++){    // iterate the matches data and store in ids in set
        let id = matches[index].id;
        matchesId.add(id);
    }
        for(j=0;j<deliveries.length;j++){   // iterate the deliveries data
            let matchId = deliveries[j].match_id;
            if(matchesId.has(matchId)){                     // check matchid with deliveries id
              
               let superOverRuns = deliveries[j].is_super_over;
               if(superOverRuns>0){                     // count only super over
                let bowler = deliveries[j].bowler;
                let wideBall = deliveries[j].wide_runs;
                let noBall = deliveries[j].noball_runs;
               if(!bowlerList.hasOwnProperty(bowler)){      // cheking the bowler property
                bowlerList[bowler]={
                    totalRunsInSuperOver:0,
                    totalBallsInSuperOver:0
                }
               }
              bowlerList[bowler].totalRunsInSuperOver +=superOverRuns;
              if(wideBall==0&&noBall===0){                      // add ball if   not a wide and noball
                bowlerList[bowler].totalBallsInSuperOver+=1;
              }
            }
        }
        }
    
  

   let bestEconomyBowlerInSuperOver={        // created the object
    bowlerName:'',
    economy:Number.MAX_SAFE_INTEGER
   };    
   for(let bowler in bowlerList){
    let bowlerData = bowlerList[bowler];       // iterate the object
    
    let totalRuns = bowlerData.totalRunsInSuperOver;
    let totalBalls = bowlerData.totalBallsInSuperOver;
    let totalEconomy =0;
    if(totalBalls>0){                              // calculate the economy if balls are more than zero
        totalEconomy = (totalRuns/totalBalls);
    }
    if(totalEconomy<bestEconomyBowlerInSuperOver.economy){  // checking economy with created object
        bestEconomyBowlerInSuperOver.bowlerName=bowler;
        bestEconomyBowlerInSuperOver.economy=totalEconomy;
    }
   }
  

  
  
   return bestEconomyBowlerInSuperOver; // return highest econmoy bowler

}

const bestEconomyBowlerInSuperOver = getBestEconomyBowlerInSuperOvers();
fs.writeFileSync("../public/output/bowlerBestEconomyInsuperOver.json",JSON.stringify(bestEconomyBowlerInSuperOver,null,2)); // written the output in the mention path
module.exports = {getBestEconomyBowlerInSuperOvers};