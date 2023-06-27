import {Worker, isMainThread, parentPort, workerData,} from 'worker_threads'
import fs from 'fs'
import http, { ServerResponse } from 'http'
import url from 'url'
import { TypeError, TypeToWorkerMessage } from './Types';
import parseJSAsync from './helpers/csvParser'
import { sendResponse } from './helpers/res';
  
if (isMainThread) {
    const server = http.createServer((req:http.IncomingMessage, res:http.ServerResponse) => {
    const reqUrl:string|null = url.parse(req.url as string).pathname
    //Errors
          req.on('error', (err:TypeError) => {
            console.error(err);
            // Handle error...
            res.statusCode = 400;
            res.end('400: Bad Request');
            return;
          });

          res.on('error', (err:TypeError) => {
              console.error(err);
              sendResponse(res, '502 bad Gateway')
          });

  if(typeof reqUrl === 'string'){
      if (reqUrl == "/") sendResponse(res, 'hello');

      if (req.method == "GET") {//GET method
            let body:string
            console.log('Get', reqUrl);
            if (reqUrl == "/files") {
                  req.on('data', function (data:BufferSource) {
                    body=String(data).trim().split(' ')[0]
                  })
                  req.on('end',()=>{
                    fs.readdir(`../${body}/`,(err:TypeError, files:string[]) => {
                      try{
                        console.log("\nCurrent directory filenames:");
                          files.forEach((file:string) => {
                            res.write(`${file}\n`);
                            console.log(file);
                          })
                          res.end('finished')
                      }catch(err){
                          console.log('readdirErr',err);
                          sendResponse(res, 'directory not found')
                      }
                    })
                  })  
              }else if(reqUrl == `/files/${reqUrl.split('/')[2]}` && reqUrl.split('/')[2].trim() !==''){
                req.on('data', function (data:BufferSource) {
                  body=String(data).trim().split(' ')[0]
                })
                req.on('end', ()=>{
                  fs.readFile(`../${body}/${reqUrl.split('/')[2]}`,(err:TypeError, data:BufferSource) => {
                    if (err){
                      console.log('readFileError',err);
                      sendResponse(res, 'Wrong directory or filename')
                      return
                    } 
                    // console.log(data.toString());
                    sendResponse(res, data.toString())
                  });
                })
              }else{
                sendResponse(res, 'Nothing has been sent')
              }

    }else if (req.method == "POST") {//POST method
            console.log('POST', reqUrl);
              if (reqUrl == "/exports") {
                let body:string = '';
          
                req.on('data', function (data:BufferSource) {
                    body = String(data).trim().split(' ')[0];// first word of raw data
                })
                req.on("end",()=>{
                  // console.log(body);
                      parseJSAsync("../data/", body).then(count=>{
                        console.log(`records=>${count}`)
                        sendResponse(res, 'Files have been created')
                      }).catch(err=>{
                        console.log('postErr',err)
                        sendResponse(res, 'no such a file or directory')
                      });
              });
              }
    }else if (req.method == "DELETE") {//DELETE method
      let body:string;
        req.on('data', function (data:BufferSource) {
          body=String(data).trim().split(' ')[0]
        })
        req.on('end',()=>{
            if(reqUrl == `/files/${reqUrl.split('/')[2]}` && reqUrl.split('/')[2].trim() !==''){
              fs.unlink(`../${body}/${reqUrl.split('/')[2]}`,function(err:TypeError):ServerResponse | void{
                if(err){
                  // console.log(err);
                  sendResponse(res, 'Wrong directory or filename')
                } 
                  sendResponse(res, `${reqUrl.split('/')[2]} deleted successfully\n`)
              });  
            }
        })
    }
  }
  })
    server.listen(3000)
  }
