// scale/C2transpose.js 
// usage: npm run C2transpose scltype sclname 
// NOTE: <scltype> can consist of a relative path of directories from @scale.
// From <scltype>/<sclname>(C) creates files transposed by 2,4,5,7,9 and 11 semitones.
// These are named <scltype>/<sclname>(C replaced by transposed tonic)
// Therefore the base <sclfile> in C is transposed to D,E,F,G,A and B
// Exp: npm run C2transpose pentatonic/minor C.abc  produces
//                          pentatonic/minor/D.abc
//                          pentatonic/minor/E.abc
//                          pentatonic/minor/F.abc
//                          pentatonic/minor/G.abc
//                          pentatonic/minor/A.abc
//                          pentatonic/minor/B.abc


import {exec} from 'node:child_process';
import fs from 'fs';


if(process.argv.length < 4){
  console.log(`usage: npm run C2transpose scltype sclname (include .abc-ext)`);
  console.log('\nNOTE: <scltype> may consist of a relative path of directories from @scale.');
  console.log('From <scltype>/<sclname> creates files transposed by 2,4,5,7,9 and 11 semitones.');
  console.log('These are named <scltype>/<sclname>(C replaced by transposed tonic)');
  console.log('Therefore the base <sclfile> in C is transposed to D,E,F,G,A and B');
  console.log('Exp: npm run C2transpose pentatonic/minor C.abc  produces');
  console.log('                         pentatonic/minor/D.abc');
  console.log('                         pentatonic/minor/E.abc');
  console.log('                         pentatonic/minor/F.abc');
  console.log('                         pentatonic/minor/G.abc');
  console.log('                         pentatonic/minor/A.abc');
  console.log('                         pentatonic/minor/B.abc');
  process.exit(1);
}
  

// cd to @genome to set cwd=@/@genome to use str2abc.exe found there
// and so stem for scltype is './scale'
//console.log(`\nbefore process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
process.chdir('@scale');
//console.log(`after process.chdir('@/@genome') process.cwd() = ${process.cwd()}`);
//console.log('Now node.exec will look for executable C2transpose in @/@genome NOT dome-music as before chdir.'); 


const scltype = process.argv[2],
      sclpath = `./${scltype}`,
      t = {D:2, E:4, F:5, G:7, A:9, B:11};

let sclname = process.argv[3];


// replace 'C' with new tonic from {DEFGAB}
console.log(`sclpath = ${sclpath}`);
console.log(`before replacing opening 'C' sclname = ${sclname}`);

// generate transpose scales
for (const [k, n] of Object.entries(t)) {
  //console.log(`${k}: ${n}`);
  let trname = sclname.replace('C', k);

  // create .abc-file for each tonic:interval pair in object 't'
  const action = `abc2abc ${sclpath}/${sclname} -t ${n} > ${sclpath}/${trname}`;
  console.log(`action = ${action}`);

  exec(action, (err) => {
    if(err){
      console.log(`\nerror creating .midi-file: ${err.message}`);
      process.exit(1);
    }else{
      console.log(`successfully created ${sclpath}/${trname}`);
    }
  });
}
