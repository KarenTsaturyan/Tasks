import {Worker, isMainThread, parentPort, workerData,} from 'worker_threads'
import fs from 'fs'
import { availableParallelism } from 'os';
import http, { ServerResponse } from 'http'
import url from 'url'

type TypeToWorkerMessage = {
  csvCount:number
}


function sliceIntoSubArr(arr:string[], size:number):string[][]{//[[],[],[],...]
    let res = [];
    for (let i = 0; i < arr.length; i += size) {
      const subArr:string[] = arr.slice(i, i+size);
      res.push(subArr) 
    }
    return res
  }
  
if (isMainThread) {
  const server = http.createServer((req:http.IncomingMessage, res:http.ServerResponse) => {
    const reqUrl:string|null = url.parse(req.url as string).pathname
    /* <as string> is added here because, unlike TypeScript, JavaScript does not guarantee that the `url.parse()`
    function will return a valid object with `pathname` property.
    Hence, we have to inform TypeScript that we know it always have a value.*/
    // console.log(reqUrl.split('/'))
    //Errors
    req.on('error', (err:Error | null) => {
      console.error(err);
      // Handle error...
      res.statusCode = 400;
      res.end('400: Bad Request');
      return;
  });

  res.on('error', (err:Error | null) => {
      console.error(err);
      // Handle error...
  });
  if(typeof reqUrl === 'string'){
      if (reqUrl == "/") {//main path
        res.write('hello world')
        return res.end();
      }
      if (req.method == "GET") {//GET method
        let body:string
        console.log('Get', reqUrl);
      if (reqUrl == "/files") {
            req.on('data', function (data:BufferSource) {
            body=String(data).trim().split(' ')[0]
            })
            req.on('end',()=>{
              fs.readdir(`../${body}/`,(err:Error | null, files:string[]) => {
                if (err){
                  console.log(err);
                }else {
                  console.log("\nCurrent directory filenames:");
                  files.forEach((file:string) => {
                    res.write(`${file}\n`);
                    console.log(file);
                  })
                  res.end('finished')
                }
              })
            })  
        }else if(reqUrl == `/files/${reqUrl.split('/')[2]}` && reqUrl.split('/')[2].trim() !==''){
          req.on('data', function (data:BufferSource) {
            body=String(data).trim().split(' ')[0]
          })
          req.on('end', ()=>{
            fs.readFile(`../${body}/${reqUrl.split('/')[2]}`,(err:Error | null, data:BufferSource) => {
              if (err) throw err;
              // console.log(data.toString());
              res.write(data.toString())
              res.end('finished')
            });
          })
        }else{
          res.write('Nothing has been sent')
          res.end()
        }
    } else if (req.method == "POST") {//POST method
      console.log('POST', reqUrl);
        if (reqUrl == "/exports") {
          let body = '';
    
          req.on('data', function (data:BufferSource) {
              body = String(data).trim().split(' ')[0];// first word of raw data
          })
          req.on("end",()=>{
            console.log(body);
      
            parseJSAsync("../data/", body).then(count=>{
              console.log(`records=>${count}`)
            })//body = dir
            console.log("POST END");     
            res.write('Files have been created')
            return res.end();
        });
        }
    }else if (req.method == "DELETE") {//DELETE method
      let body:string;
      req.on('data', function (data:BufferSource) {
        body=String(data).trim().split(' ')[0]
      })
      req.on('end',()=>{
        if(reqUrl == `/files/${reqUrl.split('/')[2]}` && reqUrl.split('/')[2].trim() !==''){
          fs.unlink(`../${body}/${reqUrl.split('/')[2]}`,function(err:Error | null):ServerResponse | void{
            if(err) return console.log(err);
            console.log('file deleted successfully');
            res.write(`${reqUrl.split('/')[2]} deleted successfully\n`);
            return res.end();
          });  
        }
      })
    }
  }
  })
  // CSV-JSON Parser
    function parseJSAsync(dirname:string, newDir:string): Promise<number> {
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
    server.listen(3000)
  }


