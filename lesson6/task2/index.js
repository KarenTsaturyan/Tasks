
import csv from 'csv-parser';
import fs from 'fs';
import cluster from 'cluster';

function CSVParse(dirname){
    if(cluster.isPrimary){//main process
        fs.readdirSync(dirname).forEach(function(filename) {
                    let file = filename.split('.')
                    let arr = []
                    if(file[1] === 'csv'){
                        const writeStream = fs.createWriteStream(`./dir/${file[0]}.json`);
                        fs.createReadStream(dirname + file.join('.'))
                        .pipe(csv())//parsing to JSON
                        .on('data', (data) => arr.push(data))
                        .on('end', () => fs.writeFileSync(`./dir/${file[0]}.json`, JSON.stringify(arr)))
                        // .pipe(writeStream)
                    }
                });
        }else{//worker process
           
        }
}

if(process.argv[2] === undefined){
    console.log('No args given');
}else{
        CSVParse(process.argv[2])
}
