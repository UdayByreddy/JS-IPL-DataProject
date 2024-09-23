function getMatchesPerYear(matches){
    let matchesForSeason = matches.reduce((acc,match)=>{
        let season = match.season;
        if(!season){
            return acc;           
        }
        if(!acc[season]){
            acc[season]=0;
        }
        acc[season]++;
        return acc;
    },{});
    return matchesForSeason;
}

module.exports = {getMatchesPerYear};