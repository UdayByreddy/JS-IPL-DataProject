
// Find a player who has won the highest number of Player of the Match awards for each season

function getHighestNumberPlayerOfMatchAwardForSeason(matches){
    let playerOfMatchBySeason={};                        // created an object
    for(let i=0;i<matches.length;i++){
        let playerOfTheMatch = matches[i].player_of_match;       
        let season = matches[i].season;
        if(season===undefined){
            continue;
        }
        if(!playerOfMatchBySeason.hasOwnProperty(season)){   // checking if season having an object
            playerOfMatchBySeason[season]={}
        }
        if(!playerOfMatchBySeason[season].hasOwnProperty(playerOfTheMatch)){  // checking playerofMatch inside the season
            playerOfMatchBySeason[season][playerOfTheMatch]=0;
        }
        playerOfMatchBySeason[season][playerOfTheMatch]+=1;  // increment the player
    }
   // console.log(playerOfMatchBySeason);

   let highestNumberOfPlayerOfMatchAwardBySeason={};    // againg creating the object
   for(let season in playerOfMatchBySeason){
    if(!highestNumberOfPlayerOfMatchAwardBySeason.hasOwnProperty(season)){    // checking the season object inside the object
        highestNumberOfPlayerOfMatchAwardBySeason[season]={
            player:'',
            count:0
        }
        for(let player in playerOfMatchBySeason[season]){                      // iterate player based on season
            let count = playerOfMatchBySeason[season][player];
            if(count>highestNumberOfPlayerOfMatchAwardBySeason[season].count){        // if count of player is greather than before the player
                highestNumberOfPlayerOfMatchAwardBySeason[season].player=player;
                highestNumberOfPlayerOfMatchAwardBySeason[season].count = count;       // replacing the player
            }
        }
    }

   }
  return highestNumberOfPlayerOfMatchAwardBySeason;
}

const highestNumberOfPlayerOfMatchAwardBySeason = getHighestNumberPlayerOfMatchAwardForSeason();
fs.writeFileSync("../public/output/highestNumberOfPlayerOfMatch.json",JSON.stringify(highestNumberOfPlayerOfMatchAwardBySeason,null,2)); // written the output in the mention path
module.exports = {getHighestNumberPlayerOfMatchAwardForSeason};