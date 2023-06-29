import { TypeError } from "../Types";
import { sendResponse } from "./res";
import fs from 'fs'

export function readFunc(readType:string, path:string, res:any){
    if(readType === 'file'){
        fs.readFile(path, (err:TypeError, data:BufferSource)=>{
            if (err){
                console.log('readFileError',err);
                sendResponse(res, 'Wrong directory or filename')
                return
              } 
              sendResponse(res, data.toString())
        })
    }else if(readType === 'dir'){
        fs.readdir(path,(err:TypeError, files:string[]) => {
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
    }
}