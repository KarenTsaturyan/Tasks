
import csv from 'csv-parser';
import fs from 'fs';
import cluster from 'cluster';


let results = {}

 process.stdin.on('data', (data)=>{
    if(!data.toString().trim()){
        console.log('Invalid input')
    }else{
        CSVParse(data.toString().trim())
    }

})

function CSVParse(dirname){
    if(cluster.isPrimary){//main process
        fs.readdir(dirname, function(err, filenames){//'./data/'
            if (err) {
              console.log(err);
              return;
            }
            filenames.forEach(function(filename) {
                let file = filename.split('.')
                let arr = []
                
                if(file[1] === 'csv'){
                // const writeStream= fs.createWriteStream(`./dir/${file.join('.')}` );
                    fs.createReadStream(dirname + file.join('.'))
                    .pipe(csv())//parsing to JSON
                    .on('data', (data) => arr.push(data))
                    .on('end', () => {
                        results[`${file.join('.')}`] = arr 
                    })
                    // .pipe(writeStream)
                }
            });
                    console.log(results);
          });
        }else{//worker process
           
        }
}