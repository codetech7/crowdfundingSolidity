const fs = require("fs-extra");
const solc = require("solc");
const path = require('path');


const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

const fileToCompile = path.resolve(__dirname, "contracts", "crowdfunding.sol"); //get a path to the file to be compiled
const source = fs.readFileSync(fileToCompile, "utf-8" ); //read the information from the file.
// let me = "test";
// fs.outputFileSync(path.resolve(buildPath, "tester" + ".sol"), source);
const output = solc.compile(source, 1).contracts;


 for (let indOutput in output){
//     // const temp = path.resolve(buildPath, `${indOutput}`);
//     // fs.ensureFileSync(temp);
//     // temp = fs.readJSONSync(indOutput);
//     // fs.write

    fs.outputJSONSync(path.resolve(buildPath, indOutput.replace(":","")+".json"), output[indOutput]);
 }



