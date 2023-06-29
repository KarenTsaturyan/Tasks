import {Worker, isMainThread, parentPort, workerData,} from 'worker_threads'
import fs from 'fs'
import http, { ServerResponse } from 'http'
import url from 'url'
import { TypeError, TypeToWorkerMessage } from './Types';
import parseJSAsync from './helpers/csvParser'
import { sendResponse } from './helpers/res';
import { readFunc } from './helpers/readFile';
  
if (isMainThread) {
    const server = http.createServer((req:http.IncomingMessage, res:http.ServerResponse) => {
    const reqUrl:string|null = url.parse(req.url as string).pathname
    //Errors
          req.on('error', (err:TypeError) => {
            console.error(err);
            res.statusCode = 400;
            res.end('400: Bad Request');
            return;
          });

          res.on('error', (err:TypeError) => {
              console.error(err);
              sendResponse(res, '502 bad Gateway')
          });

  if(typeof reqUrl === 'string'){
      if (reqUrl == "/"){
        sendResponse(res, 'Hello World');
        return//solution of [ERR_STREAM_WRITE_AFTER_END]: write after end
      } 

      if (req.method == "GET") {//GET method
            let body:string
            console.log('Get', reqUrl);
            if (reqUrl == "/files") {
                  req.on('data', function (data:BufferSource) {
                    body=String(data).trim().split(' ')[0]
                  })
                  req.on('end',()=>{
                    readFunc('dir',`../${body}/`, res)
                  })  
              }else if(reqUrl === `/files/${reqUrl.split('/')[2]}` && reqUrl.split('/')[2].trim() !==''){
                  req.on('data', function (data:BufferSource) {
                  body=String(data).trim().split(' ')[0]
                })
                req.on('end', ()=>{
                  readFunc("file",`../${body}/${reqUrl.split('/')[2]}`, res)
                })
              }else{
                sendResponse(res, 'Nothing has been sent')
              }
    }else if (req.method == "POST" && reqUrl == "/exports") {//POST method
            console.log('POST', reqUrl);
                let body:string;
                req.on('data', function (data:BufferSource) {
                    body = String(data).trim().split(' ')[0];// first word of raw data
                })
                req.on("end",()=>{
                      parseJSAsync("../data/", body).then(count=>{
                        console.log(`records=>${count}`)
                        sendResponse(res, 'Files have been created')
                      }).catch(err=>{
                        console.log('postErr',err)
                        sendResponse(res, 'no such a file or directory')
                      });
              });
    }else if (req.method == "DELETE" && (reqUrl == `/files/${reqUrl.split('/')[2]}` && reqUrl.split('/')[2].trim() !=='')) {//DELETE method
        let body:string;
        req.on('data', function (data:BufferSource) {
          body=String(data).trim().split(' ')[0]
        })
        req.on('end',()=>{
              fs.unlink(`../${body}/${reqUrl.split('/')[2]}`,function(err:TypeError):ServerResponse | void{
                if(err){
                  sendResponse(res, 'Wrong directory or filename')
                  return
                } 
                  sendResponse(res, `${reqUrl.split('/')[2]} deleted successfully\n`)
              });  
        })
    }else sendResponse(res,'Wrong method or Url');
  }
  })
    server.listen(3000)
  }


