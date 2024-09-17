
//Find the highest number of times one player has been dismissed by another player

function getHighestNumberOfTimesDismissedPlayers(deliveries){
    let playersList = {};                // created an object
    
        for(let j=0;j<deliveries.length;j++){         // iterate the deliveries data
            let matchId = deliveries[j].match_id;
                let dismissed  = deliveries[j].player_dismissed;
                if(dismissed!==null){                       // check only dismissed is not null
                    let bowlerName = deliveries[j].bowler;
                    let batterName = deliveries[j].batsman;
                    let dismissedPlayer = bowlerName+" dismissed "+batterName;
                    if(!playersList.hasOwnProperty(dismissedPlayer)){  // check the property in player list
                      playersList[dismissedPlayer]={
                        count:0,
                      };
                    }
                    playersList[dismissedPlayer].count+=1;   // increment the count
                }
            
        }
    
    

    let maxDissalPlayer = {player:'',count:0};    // creating the object

    for(let player in playersList){
        if(playersList[player].count>maxDissalPlayer.count){   // if previous count is more the previous count 
            maxDissalPlayer.player=player;
            maxDissalPlayer.count=playersList[player].count;
        }
    }
   
   return maxDissalPlayer;

}


module.exports ={getHighestNumberOfTimesDismissedPlayers};