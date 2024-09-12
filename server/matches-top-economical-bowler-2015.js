const matches = require("../data/jsonData/matches.json");

const deliveries = require("../data/jsonData/deliveries.json");

const fs = require("fs");

//Top 10 economical bowlers in the year 2015

function getTop10EconomicalBowlers(season){

    if(season===undefined|| season===null){
        return "Please provide the season";
    }
    const economicalBowlers = {};       // creating the object

    let matchesId = new Set();
    for(let index=0;index<matches.length;index++){
        let presentSeason = matches[index].season;
        if(presentSeason===season){
            let match_id = matches[index].id;
            matchesId.add(match_id);
        }
    }

   
             for(let j=0;j<deliveries.length;j++){
                let matchId = deliveries[j].match_id;
                
                if(matchesId.has(matchId)){                    // checking matchId in deliverires should match the id in the matches data
                    let bowlerName = deliveries[j].bowler;
                    if(!economicalBowlers.hasOwnProperty(bowlerName)){   // checking bowler prop is present or not
                        economicalBowlers[bowlerName]={
                            totalRuns:0,                            // intize the totaRuns and ballsBowled in bowlerName object
                            ballsBowled:0
                        };
                    }
                    let runs = deliveries[j].total_runs;
                    let wideRun = deliveries[j].wide_runs;
                    let extraRun = deliveries[j].extra_runs;

                    economicalBowlers[bowlerName].totalRuns+=runs;  // adding the runs
                    if(wideRun===0&&extraRun===0){                   // wide and extrarun should not be consider
                        economicalBowlers[bowlerName].ballsBowled+=1;
                    }

                }

            }
           

    let topEconomicalBowlers=[];                           // intize the array
    for(let bowler in economicalBowlers){                        
        let totalRuns = economicalBowlers[bowler].totalRuns;
        let ballsBowled = economicalBowlers[bowler].ballsBowled;
        if(ballsBowled>0){                                           // only divide when balls are greather than 0
            let economany = totalRuns/ballsBowled;
            topEconomicalBowlers.push({name:bowler,economyRate:economany});   // calulate and pushing the economy

        }
    }
    //console.log(topEconomicalBowlers);

    topEconomicalBowlers.sort((a,b)=>
        a.economyRate-b.economyRate);                    // sorting the array
   
        return [topEconomicalBowlers.slice(0,10)];   // returing the top 10 bowlers
}

const topEconomicalBowlers = getTop10EconomicalBowlers(2015);
fs.writeFileSync("../public/output/matchesTopEconomicalBowlers.json",JSON.stringify(topEconomicalBowlers,null,2)); // written the output in the mention path

module.exports = {getTop10EconomicalBowlers};

