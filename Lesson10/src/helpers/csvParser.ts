import { TypeToWorkerMessage } from "../Types";
import { sliceIntoSubArr } from './sliceIntoSubArr';
import fs from 'fs'
import {Worker, isMainThread, parentPort, workerData,} from 'worker_threads'
import { availableParallelism } from 'os';

export default function parseJSAsync(dirname:string, newDir:string): Promise<number> {
    let newCsvArr:string[][];
    let csvArr:string[] = fs.readdirSync(dirname).filter((el:string)=>el.split('.')[1]==='csv')
    let cpusCore = availableParallelism()
    if(availableParallelism()>csvArr.length){
               newCsvArr = sliceIntoSubArr(csvArr, 1)
               cpusCore = csvArr.length
            }else{
               newCsvArr = sliceIntoSubArr(csvArr, Math.ceil(csvArr.length/availableParallelism()))
            }
  return new Promise((resolve, reject): void => {
    let res:number = 0
        let arr:number[]=[]

    for (let n = 0; n < cpusCore; n++){
        const worker = new Worker('./worker.js' );
       let arrSlice:string[] = newCsvArr[n]
        worker.postMessage({files:arrSlice, dirname:dirname, newDir:newDir});
        worker.on('message', (msg:TypeToWorkerMessage): void=>{
            // console.log(msg.csvCount);
            arr.push(msg.csvCount)
            res += msg.csvCount
            // console.log(arr);
            if(arr.length>=csvArr.length){
              resolve(res)
              // process.exit()
            }else if(msg.writeErr){
                reject( msg.writeErr)
            }
          })
          worker.on('error', reject);//{terminate}
          worker.on('exit', (code:number):void => {
          // worker.terminate()
            if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        });
    }
  });
};