"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on('message', msg => {
    let csvCount = 0;
    let { files, dirname, newDir } = msg;
    // console.log(files);
    files === null || files === void 0 ? void 0 : files.forEach(function (filename) {
        let arr = [];
        let file = filename.split('.');
        fs_1.default.createReadStream(dirname + file.join('.'))
            .pipe((0, csv_parser_1.default)()) //parsing to JSON
            .on('data', (data) => {
            arr.push(data);
            ++csvCount;
        })
            .on('end', () => {
            fs_1.default.writeFile(`../${newDir}/${file[0]}.json`, JSON.stringify(arr), (err) => {
                if (err === null) {
                    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ csvCount: csvCount });
                    console.log('Success');
                }
                else {
                    console.log(`writeFile-Error=>${err}`);
                }
            });
        });
    });
});
