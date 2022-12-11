// C2transpose.js 
// usage: npm run C2transpose scltype sclname 
// From scltype/C-<sclname>.abc creates scl-files transposed by 2,4,5,7,9 and 11 semitones.
// These are named <scltype>/D-<sclname>.abc, ..., <scltype>/B-<sclname>.abc
// Therefore the base scl-file in C is transposed to D,E,F,G,A and B

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';
import fs from 'fs';


if(process.argv.length < 4){
  console.log(`usage: npm run C2transpose scltype sclname`);
  console.log(`\n<scltype>/C-<sclname>.abc -> scltype/*-<sclname>.abc`);
  console.log(`where * is a member of {D,E.F,G,A,B}`); 
  console.log(`Thus c-<sclname> is transposed by 2,4,5,7,9 and 11 semitones.`);
  console.log(`These files are named D-<sclname>.abc, ..., B-<sclname>.abc`);
  process.exit(1);
}
  

// cd to @genome to set cwd=@/@genome to use str2abc.exe found there
// and so stems for strfile and abcfile are './str' and './abc' respectively
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@scale');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable str2abc in @/@genome NOT dome-music as before chdir.'); 


const scltype = process.argv[2],
      sclname = process.argv[3],
      sclpath = `./${scltype}`,
      t = {D:2, E:4, F:5, G:7, A:9, B:11};
console.log(`sclpath = ${sclpath}`);
console.log(`sclname = ${sclname}`);



for (const [k, n] of Object.entries(t)) {
  //console.log(`${k}: ${n}`);

  // create .abc-file for each melody-rhythm line in .str-file 
  const action = `abc2abc ${sclpath}/C-${sclname}.abc -t ${n} > ${sclpath}/${k}-${sclname}.abc`;
  console.log(`action = ${action}`);
  exec(action, (err) => {
    if(err){
      console.log(`\nerror creating .midi-file: ${err.message}`);
      process.exit(1);
    }else{
      console.log(`successfully created ${sclpath}/${k}-${sclname}.abc`);
    }
  });
}
