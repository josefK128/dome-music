// initg.js
// usage: npm run initg autfilename
// (the directories below are assumed to already exist)
// empties @/@genome/axiom
//                  /seq
//                  /str
//                  /abc
//                  /midi
//                  /score
//                  /source
// Then <autfile> is copied to @/@genome/axiom.

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from "fs";
import {exec} from 'node:child_process';


// command line args
if(process.argv.length < 3){
  console.log('too few args - usage: npm run initg autfilename');
}
const autfilename = process.argv[2],
      stem = './@/@genome/',
      axiom = stem + 'axiom/',
      seq = stem + 'seq/',
      str = stem + 'str/',
      abc = stem + 'abc/',
      midi = stem + 'midi/',
      score = stem + 'score/',
      source = stem + 'source/',
      paths = [axiom, seq, str, abc, midi, score, source];


// empty directories 
for(let p in paths){
  fs.readdir(paths[p], (err, files) => {
    if(files && files.length > 0){
      console.log(`\n${paths[p]} contains ${files.length} files`);
      if (err) {
        console.log(`error emptying ${paths[p]}: ${err.message}`);
      } else {
        for(const file of files){
          const filep = paths[p] + file;
          console.log(`    removing ${file} from ${paths[p]}`);
          fs.unlinkSync(filep);
        }
      }
    }
  });
};


// seed @/@genome/axiom with autfile
const action = `cp ./@axiom/${autfilename} ./@/@genome/axiom/${autfilename}`;  
exec(action, (err) => {
  if(err){
    console.log(`error using ${action}: ${err.message}`);
    process.exit(1);
  }  
  console.log(`\n./@axiom/${autfilename} copied to @/@genome/axiom`);
});

