
import csv from 'csv-parser';
import fs from 'fs';
import cluster from 'cluster';

// let worker;
// let csvCount = 0
let otherFileTypes = 0;

function CSVParse(dirname){

    
      
      
      if (cluster.isPrimary) {
        let csvArr = fs.readdirSync(dirname).filter(el=>el.split('.')[1]==='csv')
        console.log('Master ' + process.pid + ' has started.');
      
        // Fork workers.
        for (var i = 0; i < 2; i++) {
          var worker = cluster.fork();
      
          // Receive messages from this worker and handle them in the master process.
          worker.on('message', function(msg) {
          worker.send({files:csvArr, msgFromMaster: 'This is from master ' + process.pid + ' to worker ' + worker.pid + '.'});

            console.log('Master ' + process.pid + ' received message from worker .', msg.csv);
          });
      
          // Send a message from the master process to the worker.
          // worker.send({files:csvArr, msgFromMaster: 'This is from master ' + process.pid + ' to worker ' + worker.pid + '.'});
        }
      
        // Be notified when worker processes die.
        cluster.on('death', function(worker) {
          console.log('Worker ' + worker.pid + ' died.');
        });
      
      }else {
        // let csvCount = 0
        console.log('Worker ' + process.pid + ' has started.');
      
        // Receive messages from the master process.
        process.on('message', function(msg) {
            console.log('Worker ' + process.pid + ' received message from master.', msg);
            let arr = []
            msg.files.forEach(function(filename) {
                let file = filename.split('.')
                fs.createReadStream(dirname + file.join('.'))
                .pipe(csv())//parsing to JSON
                .on('data', (data) => arr.push(data))
                .on('end', () => 
                fs.writeFileSync(`./dir/${file[0]}.json`, JSON.stringify(arr))
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
