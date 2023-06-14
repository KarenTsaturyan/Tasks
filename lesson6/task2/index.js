
import csv from 'csv-parser';
import fs from 'fs';
import cluster from 'cluster';
import  os,{ availableParallelism } from 'os'


function sliceIntoSubArr(arr, size){
  let res = [];
  for (let i = 0; i < arr.length; i += size) {
    const subArr = arr.slice(i, i+size);
    res.push(subArr) 
  }
  return res
}

function CSVParse(dirname){
  let recordsCount = 0
  let csvCount = 0
  
  if (cluster.isPrimary) {
        let newCsvArr;
        let csvArr = fs.readdirSync(dirname).filter(el=>el.split('.')[1]==='csv')
        let cpusCore = availableParallelism()
        let arr = []
        if(cpusCore>csvArr.length){
           newCsvArr = sliceIntoSubArr(csvArr, 1)
           cpusCore = csvArr.length
        }else{
           newCsvArr = sliceIntoSubArr(csvArr, Math.ceil(csvArr.length/availableParallelism()))
        }
        // console.log(newCsvArr);
        console.log('Master ' + process.pid + ' has started.');
      
        // Fork workers.
        for (let i = 0; i < cpusCore; i++) {
          let worker = cluster.fork();

          // Receive messages from this worker and handle them in the master process.
          worker.on('message', function(msg) {

            // Send a message from the master process to the worker.
            if(msg.msgFromWorker){
              worker.send({files:newCsvArr[i], msgFromMaster: 'This is from master ' + process.pid + ' to worker ' + worker.pid + '.'});
            }
            if(msg.count){
              arr.push(msg.count)
              recordsCount += msg.count
            }
              // console.log('Master ' + process.pid + ' received message from worker .', msg.msgFromWorker);
              if(arr.length>=csvArr.length)
                console.log(`\nRecordsCount in all files ${recordsCount}\n`); //I could have just used arr.reduce  
            });
        }
      
      }else {
        console.log('Worker ' + process.pid + ' has started.');
        // Receive messages from the master process.
        process.on('message', function(msg) {
            console.log('Worker ' + process.pid + ' received message from master.', msg);

            msg?.files?.forEach(function(filename) {
                let arr = [];
                let file = filename.split('.')
                fs.createReadStream(dirname + file.join('.'))
                .pipe(csv())//parsing to JSON
                .on('data', (data) =>{
                  arr.push(data);
                  ++csvCount
                })
                .on('end', () => {
                  fs.writeFile(`./dir/${file[0]}.json`, JSON.stringify(arr), (err)=>console.log(`writeErr=> ${err}`))
                  process.send({count: csvCount})
                }
                )
            })
        });
 
        // Send message to master process.
       process.send({msgFromWorker: 'This is from worker ' + process.pid + '.'})
      }

}
        
        if(process.argv[2] === undefined){
            console.log('No args given');
        }else{
            CSVParse(process.argv[2])
        }
