// melody/str2abc.js 
// usage: npm run str2abc strfile midiprogram key bpm unitnote
// reads .str-file containing melody, scale and rhythm data, and cmdline
// arguments - for each of K melody-rhythm-nrepeats lines in strfile creates 
// an indexed .str-file @/@genome/str/<strfile>_k.str and
// an indexed .abc-file @/@genome/abc/<strfile>_k.abc
// process.chdir('@/@genome') => paths are './str/' and './abc/' resp.

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from 'fs';
import lineReader from 'line-reader';
import {exec} from 'node:child_process';



if(process.argv.length < 7){
  console.log('usage: npm run str2abc strfile midiprogram key bpm unitnote');
  console.log('\nreads .str-file containing melody, scale and rhythm data,');
  console.log('and cmd-line arguments - for each of K melody-rhythm-nrepeats'); 
  console.log('lines in strfile creates:');
  console.log('an indexed .str-file @/@genome/str/<strfile>_k.str and');
  console.log('an indexed .abc-file @/@genome/abc/<strfile>_k.abc');
  console.log(`\nkey signature notes:`); 
  console.log(`key should ALMOST ALWAYS be 'none'!!`);
  console.log(`Then all accidentals are written into the score`);
//  console.log(`\nfor rare case where no accidentals are desired use key-sig:`);
//  console.log(`'b' indicates flat - i.e Eb is E-flat major `); 
//  console.log(`'#' indicates sharp - i.e 'C# is C# major `); 
//  console.log(`'m' indicates minor`);
//  console.log(`Thus Ebm is E-flat minor `); 
//  console.log(`Thus C#m is C# minor `); 
//  console.log('variations are indicated by 2 symbols - K:Am g# is A harmonic minor');
//  console.log('K:Am f# g# is A melodic minor');
//  console.log('modes: append the full name or first 3 letters:')
//  console.log(`Thus C#Aeolian or c#AEO  is C#-Aeolian `); 
//  console.log(`Thus C#Dorian or c#DOR  is C#-Dorlian `); 
//  console.log(`Thus C#Phrygian or c#PHR  is C#-Phrygian `); 
//  console.log(`Thus C#Lydian or c#LYD  is C#-Lydian `); 
//  console.log(`Thus C#Mixolydian or c#MIX  is C#-Mixolydian `); 
//  console.log(`Thus C#Aeolian or c#AEO  is C#-Aeolian `); 
//  console.log(`Thus C#Locrian or c#LOC  is C#-Locrian `); 
  process.exit(1);
}


// cd to @genome to set cwd=@/@genome to use str2abc.exe found there
// and so stems for strfile and abcfile are './str' and './abc' respectively
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@/@genome');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable str2abc in @/@genome NOT dome-music as before chdir.'); 


const strfile = process.argv[2],
      strpath = `./str/${strfile}`, 
      strstem = strfile.split('.')[0],  //i.e strfile = <strstem>.str
      abcpath = './abc/', 
      midiprogram = process.argv[3],
      key = process.argv[4],
      bpm = process.argv[5],
      unitnote = process.argv[6];



console.log(`strpath = ${strpath}`);
console.log(`strstem = ${strstem}`);
console.log(`abcpath = ${abcpath}`);
console.log(`midiprogram = ${midiprogram}`);
console.log(`key = ${key}`);
console.log(`bpm = ${bpm}`);
console.log(`unitnote = ${unitnote}`);



// read strfile
let header = "",
    index = 1;

// find melodies
console.log(`\nreading ${strpath} line-by-line:`);
lineReader.eachLine(strpath, (line, last) => {
  //console.log(`line read is: ${line}`);
  let a = line.split(' ');
  if(a.length === 3){
    let _text = header + line,
        _strpath = `./str/${strstem}-${index}.str`,
        _abcpath = `./abc/${strstem}-${index}.abc`;
    index++;

    // for each individual melody-rhythm-nrepeats line in strfile write a
    // distinct indexed .strfile - thus producing {<strfile>_k.str} for all k
    fs.writeFileSync(_strpath, _text);
    console.log(`wrote ${_strpath}`);

    // action -exec
    // for each individual melody-rhythm-nrepeats line in strfile write a
    // distinct indexed .abcfile - thus producing {<strfile>_k.abc} for all k
    let action = `str2abc ${_strpath} ${midiprogram} ${key} ${bpm} ${unitnote} > ${_abcpath}`;
    exec(action, (err) => {
       if(err){
        console.log(`\nerror creating .abc-file: ${err.message}`);
      }else{
        console.log(`successfully created ${_abcpath}`);
      }
    });
     
  }else{
    header += line + '\n';
  }
});


