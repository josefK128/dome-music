// melody/abc2midi.js 
// usage: npm run abc2midi [abcfile midifile]
// If abcfile and midifile are given, converts .abc-file to midi-file
// If abcfile and midifile are omitted, converts /abc/*.abc to midi/*.midi

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';
import fs from 'fs';



// cd to @genome to set cwd=@/@genome to use abc2midi.exe found there
// and so stems for abcfile and midifile are './abc' and './midi' respectively
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@/@genome');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable abc2midi in @/@genome NOT dome-music as before chdir.'); 


if(process.argv[2]){

  const abcpath = './abc/' + process.argv[2],
        midipath = './midi/' + process.argv[3];
  
  console.log(`abcpath = ${abcpath}`);
  console.log(`midipath = ${midipath}`);
  
  
  
  // create .abc-file for each melody-rhythm line in .str-file 
  const action = `abc2midi ${abcpath} -o ${midipath}`;
  
  exec(action, (err) => {
    if(err){
      console.log(`\nerror creating .midi-file: ${err.message}`);
    }else{
      console.log(`\nsuccessfully created @/@genome/midi/${process.argv[3]}`);
    }
  });

}else{

  fs.readdir('./abc', (err, files) => {
    if(err){
      console.log(`\nerror reading .abc-files: ${err.message}`);
      process.exit(1);
    }

    files.forEach(f => {
      if(f.endsWith('.abc')){
        const stem = f.split('.')[0];
        const abcpath = `./abc/${f}`;
        const midipath = `./midi/${stem}.mid`;
        //console.log(`stem = ${stem}`);

        const action = `abc2midi ${abcpath} -o ${midipath}`;
        exec(action, (err) => {
          if(err){
            console.log(`\nerror creating ${midipath}: ${err.message}`);
          }else{
            console.log(`\nsuccessfully created ${midipath}`);
          }
        });
      }
    });

  });

}  
