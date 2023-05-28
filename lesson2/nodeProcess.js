import os from 'os';
console.log(`Welcome ${process.env.USERNAME}!`);

process.stdin.on('data', (data)=>{
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
            case 'os os --memory':
                process.stdout.write( os.totalmem() + '\n' )
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
})
process.on('SIGINT', () => {//ctrl + c
    process.stderr.write(`Thank you ${process.env.USERNAME}, goodbye!`)
    process.exit(0)
});







