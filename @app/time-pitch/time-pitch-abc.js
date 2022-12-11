// time-pitch/time-pitch-abc.js 
// usage: npm run time-pitch-abc abcfile tpfile double||half a-or n 
// Must include the .abc-ext in abcfile and tpfile
// From <abcfile> creates time-pitch processed <tpfile> (.abc)
// arguments are one of 'double' - time dilate by 2.0*duration of all notes
//                      'half' - time dilate by 0.5*duration of all notes
//                      'double n' tdilate by 2.0 and transpose by n semitones
//                      'half n' tdilate by 0.5 and transpose by n semitones
//                      'n' transpose by n semitones

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';
import fs from 'fs';


if(process.argv.length < 4){
  console.log('usage: npm run time-pitch-abc abcfile tpfile double||half a-or n');
  console.log(`Must include the .abc-ext in abcfile and tpfile`);
  console.log('From <abcfile> creates time-pitch processed <tpfile> (.abc}');
  console.log('args one of:');
  console.log("'double' - time dilate by 2.0*duration of all notes");
  console.log("'half' - time dilate by 0.5*duration of all notes");
  console.log("'double n' t-d by 2.0 and transpose by n semitones");
  console.log("'half n' td by 0.5 and transpose by n semitones");
  console.log("'n' transpose by n semitones");
  process.exit(1);
}
  

// cd to @genome to set cwd=@/@genome to use str2abc.exe found there
// and so stems for abcfile and tpfile are './abc 
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@/@genome');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable pitch-time-abc in @/@genome NOT dome-music as before chdir.'); 

const abcpath = './abc/' + process.argv[2],
      tppath = './abc/' + process.argv[3];

let double = false,
    half = false,
    n = null;

console.log(`abcpath = ${abcpath}`);
console.log(`tppath = ${tppath}`);


// command-line args
if(process.argv.length === 6){
  if(process.argv[4].startsWith('d')){
    double = true;
  }else{
    if(process.argv[4].startsWith('h')){
      half = true;
    }
  }
  n = process.argv[5];
}else{ //nargs is 5
  if(process.argv[4].startsWith('d')){
    double = true;
  }else{
    if(process.argv[4].startsWith('h')){
      half = true;
    }else{
      n = process.argv[4];
    }
  }
}
  

// create time-pitch-transpose file tpfile from abcfile 
let action = `abc2abc ${abcpath} `; 
if(double){
  action += '-d ';
}
if(half){
  action += '-v ';
}
if(n){
  action += `-t ${n} `;
}
action += ` > ${tppath}`;
console.log(`action = ${action}`);

exec(action, (err) => {
  if(err){
    console.log(`\nerror creating ${tppath}: ${err.message}`);
    process.exit(1);
  }else{
    console.log(`successfully created ${tppath}`);
  }
});
