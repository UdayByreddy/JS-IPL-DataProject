const matches =  require("../data/jsonData/matches.json");
const deliveries = require("../data/jsonData/deliveries.json");
const fs = require('fs');
//Find the highest number of times one player has been dismissed by another player

function getHighestNumberOfTimesDismissedPlayers(){
    let playersList = {};                // created an object
    let matchsId = new Set();
    for(let index=0;index<matches.length;index++){ 
                                             // iterate the matches data
        let id = matches[index].id;
        matchsId.add(id);
    }
        for(let j=0;j<deliveries.length;j++){         // iterate the deliveries data
            let matchId = deliveries[j].match_id;
            if(matchsId.has(matchId)){                         // check the matchid with deliveries id
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
const maxDissalPlayer = getHighestNumberOfTimesDismissedPlayers();
fs.writeFileSync("../public/output/highestNumberOfDismissed.json",JSON.stringify(maxDissalPlayer,null,2)); // written the output in the mention path

module.exports ={getHighestNumberOfTimesDismissedPlayers};