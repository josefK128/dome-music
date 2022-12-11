// melody/aut2seq.js 
// usage: npm run aut2seq autfilename seqfilename melodylength  nselections startState endStates
// process.chdir('@/@genome') => paths are ./axiom and ./seq resp.
// Select a subset of finite automation generated melodies and record them 
// in a sequences file seq/<seqfile>.seq.
// There are two runs:
// The first is to use wc to get the number of melodies generated by the fa.
// The second is to extract a subset of the melodies produced by the fa.

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';
import fs from 'fs';
import * as url from 'url';


if(process.argv.length < 8){
  console.log('usage: npm run aut2seq autfilename seqfilename melodylength nselections startState endStates');
  process.exit(1);
}

// set cwd to dome-music/@/@genome - location of autogen2.exe and ssline.exe
// by changing cwd to '@/@genome' the path to autfile is './axiom/'.
//console.log(`before process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@/@genome');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executables such as autogen2 and ssline in @/@genome NOT dome-music as before chdir.'); 


const __filename = url.fileURLToPath(import.meta.url),
      __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
      //base = 'c:/public/dome-music/@/@genome',
      //autpath = base + `/axiom/${process.argv[2]}`,
      //seqpath = base + `/seq/${process.argv[3]}`,
      base = process.cwd(),
      autpath = base + `/axiom/${process.argv[2]}`,
      seqpath = base + `/seq/${process.argv[3]}`,
      melodylength = process.argv[4],
      nselections = process.argv[5],
      startState = process.argv[6];

let endStates = '';
for(let i=7; i<process.argv.length; i++){
  endStates += process.argv[i] + ' ';
}
endStates = endStates.trim();

console.log(`__filename = ${__filename}`);
console.log(`__dirname = ${__dirname}`);
console.log(`process.cwd() = ${process.cwd()}`);
console.log(`base = ${base}`);
console.log(`\nautpath = ${autpath}`);
console.log(`seqpath = ${seqpath}`);
console.log(`melodylength = ${melodylength}`);
console.log(`nselections = ${nselections}`);
console.log(`startState = ${startState}`);
console.log(`endStates = ${endStates}`);



// find nmelodies via wc -l
let promise = new Promise(function(resolve, reject){

  let action = `autogen2 ${autpath} ${melodylength} ${startState} ${endStates} | wc -l`;
  console.log(`\nnlines action = ${action}`);
  
  exec(action, (err, stdout) => {
    if(err){
      console.log(`error using ${action}: ${err.message}`);
      process.exit(1);
    }  
    if(stdout){
      console.log(`number of melodies generated is ${stdout}`);
      resolve(stdout);
    }  
  });
});



// generate nselections randomly from the nmelodies melodies
promise.then(function(result){

  const nmelodies = result.trim();
  
  // generate melodies - write to seqpath (exp: @/test/test17/17.txt)
  //let action = `autogen2 ${autpath} ${melodylength} ${startState} ${endStates} | ssline ${nmelodies} ${nselections} > ${seqpath}`;
  let action = `autogen2 ${autpath} ${melodylength} ${startState} ${endStates} | ssline ${nmelodies} ${nselections} > ${seqpath}`;
  console.log(`\ngenerative action = ${action}`);
  
  exec(action, (err, stdout) => {
    if(err){
      console.log(`\n\nerror: ${err.message}`);
    }  
  });
});




