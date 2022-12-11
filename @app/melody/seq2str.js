// melody/seq2str.js 
// usage: npm run seq2str seqfile strfile scaletype sclfile rhythmtype rmfile nrepeats
// NOTE: seqfile is at @/@genome/seq/<seqfile>
// NOTE: strfile is at @/@genome/str/<strfile>
// NOTE: sclfile is at ./@scale/<scaletype>/<sclfile>
// NOTE: rmfile is at ./@scale/<rhythmtype>/<rmfile>
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
  console.log('usage: npm run seq2str seqfile strfile scaletype sclfile rhythmtype rmfile nrepeats');
  process.exit(1);
}
console.log(`lineReader is ${lineReader}`);


const seqpath = './@/@genome/seq/' + process.argv[2],
      strpath = './@/@genome/str/' + process.argv[3],
      scaletype = process.argv[4],
      scalepath = './@scale/' + scaletype + '/' + process.argv[5],
      rhythmtype = process.argv[6],
      rhythmpath = './@rhythm/' + rhythmtype + '/' + process.argv[7],
      nrepeats = process.argv[8].toString().trim();

console.log(`seqpath = ${seqpath}`);
console.log(`strpath = ${strpath}`);
console.log(`scalepath = ${scalepath}`);
console.log(`rhythmpath = ${rhythmpath}`);
console.log(`nrepeats = ${nrepeats}`);
console.log();


// fetch scale and rhythm
const scale = fs.readFileSync(scalepath, 'utf8').trim();
const rhythm = fs.readFileSync(rhythmpath, 'utf8').trim();
const scalelist = scale.split(' ');
const scalelength = scalelist.length.toString();
console.log(`scale = ${scale}`);
console.log(`scalelength = ${scalelength}`);
console.log(`rhythm = ${rhythm}`);



// create .str-file for the .seq-file
//write first 5 lines of .str-file
fs.writeFileSync(strpath, 'title/descriptiom', 'utf8');
fs.appendFileSync(strpath, '\nRudolph', 'utf8');
fs.appendFileSync(strpath, '\nRudolph', 'utf8');
fs.appendFileSync(strpath, `\n${scalelength}`, 'utf8');
fs.appendFileSync(strpath, `\n${scale}`, 'utf8');


// write melody-state-seq and rhythm integer-interval-seq
lineReader.eachLine(seqpath, (line, last) => {
  line = '\n' + line + ' ' + rhythm + ' ' + nrepeats;
  //console.log(`line = ${line}`);
  fs.appendFileSync(strpath, line, 'utf8');
  if(last){
    console.log(`\nsuccessfully created ${strpath}`); 
    process.exit(1);
  }
});
