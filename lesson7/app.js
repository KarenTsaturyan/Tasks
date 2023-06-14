import {Worker, isMainThread, parentPort, workerData,} from 'worker_threads'
import fs from 'fs'
import { availableParallelism } from 'os';

function sliceIntoSubArr(arr, size){
    let res = [];
    for (let i = 0; i < arr.length; i += size) {
      const subArr = arr.slice(i, i+size);
      res.push(subArr) 
    }
    return res
  }

if (isMainThread) {
    let promises = []
    function parseJSAsync(dirname) {
        let newCsvArr;
        let csvArr = fs.readdirSync(dirname).filter(el=>el.split('.')[1]==='csv')
        let cpusCore = availableParallelism()
        if(availableParallelism()>csvArr.length){
                   newCsvArr = sliceIntoSubArr(csvArr, 1)
                   cpusCore = csvArr.length
                }else{
                   newCsvArr = sliceIntoSubArr(csvArr, Math.ceil(csvArr.length/availableParallelism()))
                }
      return new Promise((resolve, reject) => {
        let res = 0
            let arr=[]

        for (let n = 0; n < cpusCore; n++){
            const worker = new Worker('./worker.js' );
           let arrSlice = newCsvArr[n]
            worker.postMessage({files:arrSlice, dirname:dirname});
            worker.on('message', (msg)=>{
                // console.log(msg.csvCount);
                arr.push(msg.csvCount)
                res += msg.csvCount
                // console.log(arr);
                if(arr.length>=csvArr.length){
                    resolve(res)
                }
            })
            worker.on('error', reject);//{terminate}
            worker.on('exit', (code) => {
                if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
            });
        }
      });
    };
   parseJSAsync('./data/').then(count=>console.log(`records=>${count}`))
  }