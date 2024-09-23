// Find a player who has won the highest number of Player of the Match awards for each season

function getHighestTimePlayerOfMatch(matches){
    let listofPlayers = matches.reduce((acc,match)=>{
        let season = match.season;
        if(!season){
            return acc;
        } 
        if(!acc[season]){ // checking if season having an object
            acc[season]={};
        }
        let playerOfMatch = match.player_of_match;
        if(!acc[season][playerOfMatch]){      // checking playerofMatch inside the season
            acc[season][playerOfMatch]=0;
        }
        acc[season][playerOfMatch]+=1;
        return acc;
    },{})
   
   let highestTimeOfPlayerInSeason={};
   Object.entries(listofPlayers).forEach(([key,values])=>{
    let season = key;
    if(!highestTimeOfPlayerInSeason[key]){ // Checking if the season already exists in the object
        highestTimeOfPlayerInSeason[key]={
            PlayerName:'',
            count:0
        }
    }
    Object.entries(values).forEach(([player,value])=>{ // Iterate players based on season
        if(value>highestTimeOfPlayerInSeason[season].count){
            highestTimeOfPlayerInSeason[season].PlayerName=player; // If the player's count is greater than the current highest
            highestTimeOfPlayerInSeason[season].count=value;         // Update the player with the highest count
        }
    })
   })
   return highestTimeOfPlayerInSeason;
}

module.exports = {getHighestTimePlayerOfMatch};