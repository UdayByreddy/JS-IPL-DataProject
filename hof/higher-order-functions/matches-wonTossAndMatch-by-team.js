//Find the number of times each team won the toss and also won the match
function teamWinBothTossAndMatch(matches){
    let teams = matches.reduce((acc,match)=>{
        let tossWinner = match.toss_winner;
        let winner = match.winner;
        if(!winner){      // checking if undefined or not 
            return acc;
        }
        if(tossWinner===winner){   // checking tosswin team equal to win team  
            if(!acc[winner]){
                acc[winner]=0;
            }
            acc[winner]+=1;   // increment to 1
        }
        return acc;
    },{});
    return teams;
}

module.exports = {teamWinBothTossAndMatch};