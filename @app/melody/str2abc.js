// str2abc.js 
// usage: npm run str2abc strfile abcfile midiprogram key bpm unitnote
// reads .str-file containg melody, scale and rhythm data, and cmdline
// aruments, together used to create a .abc-file written to @genome/abc

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';


if(process.argv.length < 8){
  console.log('usage: npm run str2abc strfile abcfile midi-program key bpm unit-note');
  process.exit(1);
}

const strpath = './str/' + process.argv[2],
      abcpath = './abc/' + process.argv[3],
      midiprogram = process.argv[4],
      key = process.argv[5],
      bpm = process.argv[6],
      unitnote = process.argv[7];

console.log(`strpath = ${strpath}`);
console.log(`abcpath = ${abcpath}`);
console.log(`midiprogram = ${midiprogram}`);
console.log(`key = ${key}`);
console.log(`bpm = ${bpm}`);
console.log(`unitnote = ${unitnote}`);


// cd to @genome to set cwd=@/@genome to use str2abc.exe found there
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@/@genome');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable str2abc in @/@genome NOT dome-music as before chdir.'); 


// create .abc-file 
const action = `str2abc ${strpath} ${midiprogram} ${key} ${bpm} ${unitnote} > ${abcpath}`;

exec(action, (err) => {
  if(err){
    console.log(`\nerror creating .abc-file: ${err.message}`);
  }else{
    console.log(`\nsuccessfully created ${abcpath}`);
  }
});
    
