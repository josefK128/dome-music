// melody/abc2midi-single.js 
// usage: npm run abc2midi-single abcfile midifile 
// converts the .abc-file abcfile to the .mid-file midifile.
// Also corrects %MIDI by %%MIDI - rewrites abcfile with correction

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';
import fs from 'fs';
import lineReader from 'line-reader';



if(process.argv.length < 4){
  console.log(' usage: npm run abc2midi-single abcfile midifile [droneon [n1 n2 n3]]');
  console.log('\nconverts the .abc-file abcfile to the .mid-file midifile.');
  console.log('corrects %MIDI by %%MIDI - rewrites abcfile with correction');
  process.exit(1);
}


// cd to @genome to set cwd=@/@genome to use abc2midi.exe found there
// and so stems for abcfile and midifile are './abc' and './midi' respectively
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@/@genome');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable abc2midi in @/@genome NOT dome-music as before chdir.'); 



const abcpath = './abc/' + process.argv[2],
      midipath = './midi/' + process.argv[3];
     
console.log(`abcpath = ${abcpath}`);
console.log(`midipath = ${midipath}`);


// read abcfile line by line
let text = '';

lineReader.eachLine(abcpath, (line, last) => {
  console.log(`lineReader read line = ${line}`);
  if(line.startsWith('%')){
    // if necessary repair %MIDI with correct %%MIDI
    if(line[1] !== '%'){
      line = '%' + line;
      console.log(`repaired line = ${line}`);
    }
  }
  text += line + '\n';
  console.log(`\ntext = ${text}`);

  if(last){
    // write abcfile-text with corrected %%MIDI 
    // back to abcfile
    console.log(`last line = ${line}`);
    fs.writeFile(abcpath, text, (err) => {
      if (err) {
        console.log(`error writing back ${abcpath}: ${err.message}`);
      } else {
        console.log(`successfully re-wrote = ${abcpath}`);

        // create .mid-file from (possibly modified) .abc-file 
        const action = `abc2midi ${abcpath} -o ${midipath}`;
        console.log(`action = ${action}`);
        
        exec(action, (err) => {
          if(err){
            console.log(`\nerror creating ${midipath}: ${err.message}`);
          }else{
            console.log(`\nsuccessfully created @/@genome/midi/${process.argv[3]}`);
          }
        });
      }
    });
  }
});



