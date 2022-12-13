// melody/str2abc-single.js 
// usage: npm run str2abc strfile abcfile midiprogram key bpm unitnote
// reads .str-file containg melody, scale and rhythm data, and cmdline
// arguments, used to create a .abc-file written to @genome/abc
// process.chdir('@/@genome') => paths are './str/' and './abc/' resp.

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import {exec} from 'node:child_process';


if(process.argv.length < 8){
  console.log('usage: npm run str2abc-single strfile abcfile midiprogram key bpm unitnote');
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



// create .abc-file for each melody-rhythm line in .str-file 
const action = `str2abc ${strpath} ${midiprogram} ${key} ${bpm} ${unitnote} > ${abcpath}`;

exec(action, (err) => {
  if(err){
    console.log(`\nerror creating .abc-file: ${err.message}`);
  }else{
    console.log(`\nsuccessfully created @/@genome/abc/${process.argv[3]}`);
  }
});
    
