import os from 'os';
import fs from 'fs';
console.log(`Welcome ${process.env.USERNAME}!`);

process.stdin.on('data', (data)=>{
    let info = []
    switch(data.toString().trim()) {
        case 'os --architecture':
            process.stdout.write(os.arch() + '\n' )
          break;
          case 'os --cpus':
            os.cpus().forEach(el=>{
                process.stdout.write(el.model + '\n' )
            })
            break;
            case 'os --homedir':
                process.stdout.write( os.homedir() + '\n' )
            break;
            case 'os --username':
                process.stdout.write( os.userInfo().username + '\n' )
            break;
            case 'os --hostname':
                process.stdout.write( os.hostname() + '\n' )
            break;
            case 'os --platform':
                process.stdout.write( os.platform() + '\n' )
            break;
            case 'os --memory':
                process.stdout.write( os.totalmem() + '\n' )
            break;
            case 'ls':
               
                fs.readdir('./', (err, files) => {
                    files.forEach(file => {
                        info.push(
                        {
                            'Name': file,
                            'Type': !!file.includes('.')?"file":'directory'
                        });
                    });
                    console.table(info.sort((a, b) =>b.Type.length - a.Type.length));//directory comes first
                  });
            break;
            case '.exit':
                process.on('exit', function() {   
                    console.log(`Thank you ${process.env.USERNAME}, goodbye!`);
                });
                process.exit()
            break;
        default:
          console.log('Invalid input')
      }

      let command = data.toString().trim()
      if(command.slice(0, 3) === 'add'){
            fs.writeFile( command.substring(4), '', err => {
                    if (err) {
                      console.error(err);
                    }
                    // file written successfully
                  });
      }else if(command.slice(0, 2) === 'rn'){//rn rename.txt name.txt
        fs.rename(command.slice(3, command.lastIndexOf(' ')), command.substring(command.lastIndexOf(' ')+1), (err) => {
            if (err) {
                console.error(err);
              }
            process.stdout.write(console.log("\nFile Renamed!\n"))
        })
      }else if(command.slice(0, 2) === 'cp'){ //cp ./B.txt ./A/copy.txt
        fs.copyFile(command.slice(3, command.lastIndexOf(' ')), command.substring(command.lastIndexOf(' ')+1), (err) => {
            if (err) {
                console.error(err);
              }
            process.stdout.write(console.log("\nFile Copied!\n"))
        })
      }else if(command.slice(0, 2) === 'mv'){ //mv ./move.txt ./testFolder/move.txt
        fs.renameSync(command.slice(3, command.lastIndexOf(' ')), command.substring(command.lastIndexOf(' ')+1)); 
      }else if(command.slice(0, 2) === 'rm'){ // rm ./remove.txt 
        fs.unlinkSync(command.slice(3));
      }
})

process.on('SIGINT', () => {//ctrl + c
    process.stderr.write(`Thank you ${process.env.USERNAME}, goodbye!`)
    process.exit(0)
});







