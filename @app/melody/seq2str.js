// seq2str.js 
// read integer sequences representing abstract melodies.
// command line arguments for seqfile-path, strdir-path, scale-length,
// scale-path, rhythm-path and nrepeats of melody.
// creates .str-file containing the supplied data and writes to strdir-path.
// The .str-file is later used to create an abc-file using str2abc.


import {exec} from 'node:child_process';
import fs from 'fs';
import lineReader from 'line-reader';


console.log(`lineREader is ${lineReader}`);
if(process.argc < 6){
  console.log('usage: node seq2str seqpath strpath scalepath rhythmpath nrepeats');
}

const seqpath = process.argv[2],
      strpath = process.argv[3],
      scalepath = process.argv[4],
      rhythmpath = process.argv[5],
      nrepeats = process.argv[6],
      argc = process.argv.length;

//console.log(`autpath = ${autpath}`);
//console.log(`melodylength = ${melodylength}`);
//console.log(`startState = ${startState}`);
//console.log(`endStates = ${endStates}`);
//console.log(`argc = ${argc}`);


// fetch scale and rhythm
const scale = fs.readFileSync(scalepath, 'utf8');
const rhythm = fs.readFileSync(rhythmpath, 'utf8');
const scalelist = scale.split(' ');
const scalelength = scalelist.length;
console.log(`scale = ${scale}`);
console.log(`scalelength = ${scalelength}`);
console.log(`rhythm = ${rhythm}`);


// create .str-file 
