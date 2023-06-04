import fs from 'fs';
import {Transform} from 'stream';

function toTitleCase (str) {
    if (!str) {
      return '';
    }
    const strArr = str.split(' ').map((el) => {
      return el[0].toUpperCase() + el.substring(1).toLowerCase();
    });
    return strArr.join(' ');
  }
  
//Transform operations
const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());//(err, chunk)
    },
});
const lowercase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toLowerCase());
    },
});
const reverse = new Transform({
    transform(chunk, encoding, callback) {
        // console.log(chunk);
        callback(null, chunk.toString().split('').reverse().join('').split('\n').reverse().join(''));
    },
});
const transformToTitleCase = new Transform({
    transform(chunk, encoding, callback) {
        // console.log(chunk);
        callback(null, toTitleCase(chunk.toString()));
    },
});

function operate(input, output, operation){
    const readStream= fs.createReadStream(input);
    const writeStream= fs.createWriteStream(output);
    let operationName;
    // names of operations
        switch(operation){
            case "uppercase":
                operationName = uppercase;
                break;
            case "lowercase":
                operationName = lowercase;
                break;
            case "reverse":
                operationName = reverse;
                break;
            case 'totitlecase':
                operationName = transformToTitleCase;
                break;
            default:
                console.log('Invalid operation')
                process.exit()
        }

        readStream
        .pipe(operationName)
        .pipe(writeStream)
   
    //errors
    writeStream.on('error', (err)=>{
        console.log('writeable file not found');
    })
    readStream.on('error', (err)=>{
        console.log('readable file not found');
        writeStream.end()
    })
    readStream.on('end', ()=>{
        console.log('end');
        writeStream.end()
    })
    writeStream.on('open', ()=>{
        console.log('open writeable');
    })
    writeStream.on('close', ()=>{
        console.log('close writeable');
    })
}


if(process.argv[2] === undefined || process.argv[3] === undefined || process.argv[4] === undefined){
            console.log('No arguments given');
}else{
        operate(process.argv[2], process.argv[3], process.argv[4])
}