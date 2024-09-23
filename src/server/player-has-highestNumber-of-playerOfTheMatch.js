
// Find a player who has won the highest number of Player of the Match awards for each season

function getHighestNumberPlayerOfMatchAwardForSeason(matches){
    let playerOfMatchBySeason={};                        // created an object
    for(let i=0;i<matches.length;i++){
        let playerOfTheMatch = matches[i].player_of_match;       
        let season = matches[i].season;
        if(season){
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
   

    let playerOfTheMatchAwardsBySeason = {}; // Creating the object

    for (let season in playerOfMatchBySeason) {
        if (!playerOfTheMatchAwardsBySeason.hasOwnProperty(season)) { // Checking if the season already exists in the object
            playerOfTheMatchAwardsBySeason[season] = {
                player: '',
                awardCount: 0
            };
            
            for (let player in playerOfMatchBySeason[season]) { // Iterate players based on season
                let awardCount = playerOfMatchBySeason[season][player];
                if (awardCount > playerOfTheMatchAwardsBySeason[season].awardCount) { // If the player's count is greater than the current highest
                    playerOfTheMatchAwardsBySeason[season].player = player;
                    playerOfTheMatchAwardsBySeason[season].awardCount = awardCount; // Update the player with the highest count
                }
            }
        }
    }
    
    return playerOfTheMatchAwardsBySeason;
    
}
module.exports = {getHighestNumberPlayerOfMatchAwardForSeason};