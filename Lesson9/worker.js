import { parentPort } from "worker_threads";
import fs from 'fs'
import csv from 'csv-parser';

parentPort.on('message', msg=>{
    let csvCount = 0
    // let bool = false
    let {files, dirname, newDir} = msg;
    // console.log(files);
    files?.forEach(function(filename) {
        let arr = [];
        let file = filename.split('.')
        fs.createReadStream(dirname + file.join('.'))
        .pipe(csv())//parsing to JSON
        .on('data', (data) =>{
          arr.push(data);
          ++csvCount
        })
        .on('end', () => {
          // bool = true
          fs.writeFile(`./${newDir}/${file[0]}.json`, JSON.stringify(arr), (err)=> {
            if(err === null){
              parentPort.postMessage({csvCount:csvCount})
              console.log('Success')
              // process.exit()
            }else{console.log(`writeFile-Error=>${err}`)
          }
          })
            // console.log(csvCount);
        //  parentPort.postMessage({csvCount:csvCount})
        }
        )
    })
})


