

import fs from 'fs';
import path from 'path'

let nodePath =  path.resolve('./node_modules');
console.log(nodePath)
// console.log(nodePath);
let num = 1;
let mainDir; 
let slash;
const getFileList = (dirName) => {
    const items = fs.readdirSync(dirName, { withFileTypes: true });
    let fullDirName = dirName;
    let directoryDepth;
    for (const item of items) {
        
        if (item.isDirectory()) {
            // console.log(fullDirName);
            getFileList(path.join(fullDirName,item.name))
        }else{
            directoryDepth = fullDirName
            directoryDepth.includes('/') ? slash='/' : slash = '\\';
            let slashCount = directoryDepth.length - directoryDepth.replaceAll(slash, '').length;//slash(directoryDepth[2]
            if(slashCount > 4){
                    // console.log(slashCount);
                    if( slashCount > num){
                        num = slashCount
                        mainDir = directoryDepth;
                    }

                }
                
            }
        }
        
    };
    getFileList(nodePath)
    // console.log(num);
    // console.log(mainDir);
function createFile(filePath){
console.log(filePath);
    fs.writeFile(path.join(`${filePath}`,'file.txt'), "hello world", err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
            console.log('good');
          });
}

createFile(mainDir);// in mainDir directory(node_modules/axios/lib/platform/browser/classes/)
