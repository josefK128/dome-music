// abcscl2transpose.js 
// usage: npm run abcscltranspose scltype sclfile transposefile n
// From scltype/.scl-file creates scltype/.scl-file transposed by n (+-1,...,+-12)

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';
import fs from 'fs';



// cd to @genome to set cwd=@/@genome to use str2abc.exe found there
// and so stems for strfile and abcfile are './str' and './abc' respectively
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@scale');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable str2abc in @/@genome NOT dome-music as before chdir.'); 


const scltype = process.argv[2] + '/',
      sclpath =scltype + process.argv[3],
      transposepath = scltype + process.argv[4],
      n =process.argv[5],
      action = `abc2abc ${sclpath} -t ${n} > ${transposepath}`;

console.log(`sclpath = ${sclpath}`);
console.log(`transposepath = ${transposepath}`);
console.log(`transpose by ${n} semitones`);
console.log(`action = by ${action}`);


// create .abc-file for each melody-rhythm line in .str-file 
exec(action, (err) => {
  if(err){
    console.log(`\nerror creating .midi-file: ${err.message}`);
  }else{
    console.log(`\nsuccessfully created ${transposepath}`);
  }
});

