
//  Find the bowler with the best economy in super overs

function bestEconomyBolwerInSuperOver(deliveries){
    let bowlersList = deliveries.reduce((acc,delivery)=>{
        let superOver = delivery.is_super_over;
        if(superOver===1){                  // count only super over
            let bowler = delivery.bowler;
            let wideBall = delivery.wide_runs;
            let noBall = delivery.noball_runs;
            let runs = delivery.total_runs;
            if(!acc[bowler]){               // cheking the bowler property
                acc[bowler]={
                    totalRuns:0,
                    totalBalls:0
                }
            }
            acc[bowler].totalRuns+=runs;
            acc[bowler].totalBalls+=(wideBall===0&&noBall===0)?1:0;   // add ball if   not a wide and noball
        }
        return acc;

},{})

let bestEconomyBolwer = {
    bowlerName:'',
    Economy:Number.MAX_SAFE_INTEGER
}
Object.entries(bowlersList).forEach(([bowler,score])=>{
   
    
        let economy = score.totalRuns/score.totalBalls;  // calculate the economy if balls are more than zero
        if(economy<bestEconomyBolwer.Economy){        // checking economy with created object
            bestEconomyBolwer.bowlerName=bowler;
            bestEconomyBolwer.Economy = economy;
        }
    }
)
return bestEconomyBolwer;
}

module.exports = {bestEconomyBolwerInSuperOver};