import  { spawn } from 'child_process';
import fs from 'fs';
import path from 'path'

let nodePath =  path.resolve('./');
function getStats(command, args=[], timeout = Infinity ){
//file` <timestamp><command>.json
    //variables
    let start = Date.now();
    let end;
    let success = false;
    let commandSuccess;
    let errors = []
    
const newProcess = spawn(command, [...args]);

        newProcess.stdout.on('data', data => {
            console.log(`stdout:\n${data.toString()}`);
        })
    //errors
        newProcess.stderr.on("data", (err) => {
            commandSuccess = false;
            console.log(`args err or smth else: ${err.toString()}`);
            errors.push(err.toString())
        });
        newProcess.on('error', function(err) {
            commandSuccess = false;
            console.log('command error or smth else' + err.toString());
            errors.push(err.toString())
        });
//exit
    newProcess.on('exit', code => {
       
                console.log(`Process ended with ${code}`);
            })

    //timeout
            if(timeout !== Infinity){
                setTimeout((function() { 
                    return process.exit(22); //node js exit code  
                }), timeout);     
            }
    //close
        newProcess.on('close', (code) => {
            end = Date.now() - start;
            console.log(`duration: ${end}`);
            success = true
            let jsonData = {"start":start, "duration":end, "success":success, "commandSuccess":(!commandSuccess && (commandSuccess)), "error": errors};
                    fs.writeFile(path.join(process.cwd(),'logs', `${String(start)}_${command}.json`), JSON.stringify(jsonData), (err) => {
                        if (err)
                            console.log(err);
                        else {
                            console.log("File written successfully\n");
                            console.log("The written has the following contents:");
                            console.log(fs.readFileSync(path.join(process.cwd(),'logs', `${String(start)}_${command}.json`), "utf8"));//shows file's data
                    }})
            console.log(`child process exited with code ${code}`);
        }); 

        
}

    getStats('node', ['./test.js'], 1000);//node ./test.js
