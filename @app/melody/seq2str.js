// seq2str.js 
// usage: npm run seq2str seqfile strfile scalepath rhythmpath nrepeats
// read integer sequences representing abstract melodies.
// creates .str-file containing the supplied data and writes to @genome/str.

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';
import fs from 'fs';
import lineReader from 'line-reader';


if(process.argv.length < 8){
  console.log('usage: npm run seq2str seqfile strfile scaletype scalefile rhythmtype rhythmfile nrepeats');
  process.exit(1);
}
console.log(`lineReader is ${lineReader}`);

const seqpath = './@/@genome/' + process.argv[2],
      strpath = './@/@genome/' + process.argv[3],
      scaletype = process.argv[4],
      scalepath = './@scale/' + scaletype + '/' + process.argv[5],
      rhythmtype = process.argv[6],
      rhythmpath = './@rhythm/' + rhythmtype + '/' + process.argv[7],
      nrepeats = process.argv[8];

console.log(`seqpath = ${seqpath}`);
console.log(`strpath = ${strpath}`);
console.log(`scalepath = ${scalepath}`);
console.log(`rhythmpath = ${rhythmpath}`);
console.log(`nrepeats = ${nrepeats}`);


// fetch scale and rhythm
const scale = fs.readFileSync(scalepath, 'utf8');
const rhythm = fs.readFileSync(rhythmpath, 'utf8');
const scalelist = scale.split(' ');
const scalelength = scalelist.length;
console.log(`scale = ${scale}`);
console.log(`scalelength = ${scalelength}`);
console.log(`rhythm = ${rhythm}`);


// create .str-file 
