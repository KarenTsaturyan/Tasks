import { parentPort } from "worker_threads";
import fs from 'fs'
import csv from 'csv-parser';

parentPort?.on('message', msg=>{
    let csvCount:number = 0
    let {files, dirname, newDir} = msg;
    // console.log(files);
    files?.forEach(function(filename:string): void {
        let arr:string[] = [];
        let file:string[] = filename.split('.')
        fs.createReadStream(dirname + file.join('.'))
        .pipe(csv())//parsing to JSON
        .on('data', (data): void =>{
          arr.push(data);
          ++csvCount
        })
        .on('end', (): void => {
          fs.writeFile(`../${newDir}/${file[0]}.json`, JSON.stringify(arr), (err:Error | null): void=> {
            if(err === null){
              parentPort?.postMessage({csvCount:csvCount})
              console.log('Success')
            }else{console.log(`writeFile-Error=>${err}`)
          }
          })
        }
        )
    })
})


