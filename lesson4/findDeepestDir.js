
import fs from 'fs';
import path from 'path'

let nodePath =  path.basename('./node_modules');

let num = 1;
let mainDir; 
const getFileList = (dirName) => {
    const items = fs.readdirSync(dirName, { withFileTypes: true });
    let fullDirName = dirName;
    let directoryDepth;
    for (const item of items) {
        
        if (item.isDirectory()) {
            // console.log(fullDirName);
            getFileList(fullDirName+'/'+item.name)
            // console.log(fullDirName + '/'+item.name +'   after');
        }else{
            directoryDepth = fullDirName + '/'//+item.name;
            let slashCount = directoryDepth.length - directoryDepth.replaceAll('/', '').length;
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
     fs.writeFile(path.join(`./${filePath}`,'file.txt'), "hello world", err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
            console.log('good');
          });
}

createFile(mainDir);// in mainDir directory
