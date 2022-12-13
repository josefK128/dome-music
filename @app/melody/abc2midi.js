// melody/abc2midi.js 
// usage: npm run abc2midi 'all' 
// If abcfile and midifile are omitted, converts /abc/*.abc to midi/*.midi

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from 'fs';
import lineReader from 'line-reader';
import {exec} from 'node:child_process';


// allow no-arg command 'npm run abc2midi' to pause and display
// need for 'useless' single arg 'all'
// This is to warn that all files in the directory will be converted
if(process.argv.length < 3){
  console.log(`usage: npm run abc2midi '*'`);
  console.log(`\nthis is simply a warning that all files in @/@genome/abc will be converted`);
  console.log(`use 'npm run abc2midi-single abcfile midifile' to convert just one file at a time`);
  process.exit(1);
}


// cd to @genome to set cwd=@/@genome to use abc2midi.exe found there
// and so stems for abcfile and midifile are './abc' and './midi' respectively
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@/@genome');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable abc2midi in @/@genome NOT dome-music as before chdir.'); 



fs.readdir('./abc', (err, files) => {
  if(err){
    console.log(`\nerror reading .abc-files: ${err.message}`);
    process.exit(1);
  }

  files.forEach(f => {
    if(f.endsWith('.abc')){
      const stem = f.split('.')[0],
            abcpath = `./abc/${f}`,
            midipath = `./midi/${stem}.mid`;

      // read file line by line - correct %MIDI by %%MIDI - build 'text'
      // later write text back to abcfile
      let text = '';
      lineReader.eachLine(abcpath, (line, last) => {
        //console.log(`lineReader read line = ${line}`);
        if(line.startsWith('%')){
          // if necessary repair %MIDI with correct %%MIDI
          if(line[1] !== '%'){
            line = '%' + line;
            console.log(`repaired line = ${line}`);
          }
        }
        text += line + '\n';
        //console.log(`\ntext = ${text}`);
      
        if(last){
          // write text with corrected %%MIDI back to abcfile
          //console.log(`last line = ${line}`);
          fs.writeFile(abcpath, text, (err) => {
            if (err) {
              console.log(`error writing back ${abcpath}: ${err.message}`);
            } else {
              console.log(`successfully re-wrote = ${abcpath}`);
      
              // create .mid-file from (possibly modified) .abc-file 
              const action = `abc2midi ${abcpath} -o ${midipath}`;
              //console.log(`action = ${action}`);
              
              exec(action, (err) => {
                if(err){
                  console.log(`\nerror creating ${midipath}: ${err.message}`);
                }else{
                  console.log(`successfully created @/@genome/midi/${process.argv[3]}`);
                }
              });
            }
          });
        }
      });
      
    }else{
      console.log(`error: ${f} lacks .abc file-extension - continuing`);
    }

  });
});

