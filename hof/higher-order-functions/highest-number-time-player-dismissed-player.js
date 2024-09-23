//Find the highest number of times one player has been dismissed by another player

function playerDismissedByAnotherOne(deliveries){
    let listOfPlayer = deliveries.reduce((acc,deliver)=>{
        let dismissed = deliver.player_dismissed;
        let bowler = deliver.bowler;
        if(dismissed!==null){        // check only dismissed is not null
            let key = bowler+" dismissed "+dismissed;
            if(!acc[key]){
                acc[key]=0;   // check the property in player list
            }
            acc[key]+=1;      // increment the count
        }
        return acc;
    },{})
   
    
    let maxDismissedPlayer = Object.entries(listOfPlayer).reduce((acc,[player,count])=>{
        if(count>acc.count){
            acc.players = player;    // if previous count is more the previous count 
            acc.count = count;
        }
        return acc;
    },{
        players:'',
        count:0
    })
    return maxDismissedPlayer;
}

module.exports = {playerDismissedByAnotherOne};