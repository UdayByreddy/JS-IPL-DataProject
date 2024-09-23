
//Find the number of times each team won the toss and also won the match

function getAllTeamsWhoWonMatchAndToss(matches){
    let matchAndTossWonTeams= {};           // created the object
    for(let i=0;i<matches.length;i++){
        let tossWinTeam = matches[i].toss_winner;
        let matchWinTeam = matches[i].winner;
        if(matchWinTeam){  // checking if undefined or not 
            continue;
        }

        if(tossWinTeam===matchWinTeam){      
                                                                   // checking tosswin team equal to win team  
            if(!matchAndTossWonTeams.hasOwnProperty(matchWinTeam)){   // check the prop inside the object
                matchAndTossWonTeams[matchWinTeam]=0;
            }
            matchAndTossWonTeams[matchWinTeam]+=1;   // increment to 1
        }
    }
    
    return matchAndTossWonTeams;   // return the object
}
module.exports = {getAllTeamsWhoWonMatchAndToss};