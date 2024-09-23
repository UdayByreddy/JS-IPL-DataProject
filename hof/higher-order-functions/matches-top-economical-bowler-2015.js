
//Top 10 economical bowlers in the year 2015

function economicalBowlersIn2015(matches,deliveries,season){
    let matchesId = matches
    .filter(match=>match.season===season)
    .map(match=>match.id);
    
    let bowlers = deliveries.reduce((acc,delivery)=>{
        let matchId = delivery.match_id;
        if(matchesId.includes(matchId)){    // checking matchId in deliverires should match the id in the matches data
        let bowler = delivery.bowler;
        let runs = delivery.total_runs;
        let noBall = delivery.noball_runs;
        let wideBall = delivery.wide_runs;
        if(!acc[bowler]){                 // checking bowler prop is present or not
            acc[bowler]={
                totalRuns:0,
                totalBalls:0           // // intize the totaRuns and ballsBowled in bowlerName object
            }
        }
        acc[bowler].totalRuns+=runs;
        acc[bowler].totalBalls+=(noBall===0&&wideBall===0)?1:0;  //  // wide and extrarun should not be consider
        
    }
    return acc;
},{});
    let economicalBowlers = [];
    Object.entries(bowlers).forEach(([key,value])=>{
        let overs = value.totalBalls/6;             // only divide when balls are greather than 0
        if(overs>0){
            let economy = (value.totalRuns/overs);
            economicalBowlers.push({
                Name:key,
                Economy:economy
            });
        }
    })
    return economicalBowlers.sort((a,b)=>a.Economy-b.Economy).slice(0,10);  // sorting the array and returing top10
}

module.exports = {economicalBowlersIn2015};