const fs = require("fs");  // fs is used read and write a file

const Papa = require("papaparse");  // papaparse is used to converting csv to json


const matchesCSV = fs.readFileSync('./csvFiles/matches.csv','utf8');   // read the file sync (not async)

Papa.parse(matchesCSV,{
    header:true,                     // it create the keys
    dynamicTyping:true,              // // it used to dynamic attch to datatypes
    complete:(results)=>{
        const data = JSON.stringify(results.data,null,2);    // converting csv to json using stringify
        
        fs.writeFileSync('matches.json',data);    // write in this file with sync way
    }
});
