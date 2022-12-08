//playwav.js

import player from "node-wav-player";
  


// command line args
if(process.argv.length < 3){
  console.log('usage: node playwav <filepath>');
  process.exit(1);
}

//sfpath
const sfpath = process.argv[2];
console.log(`sf path read from cmdline is ${sfpath}`);

//loop
let loop = false;   //default
if(process.argv[3]){
  loop = true;
  console.log('playback will loop infinitely');
}


//play wav-sf
player.play({
  path: sfpath,
  loop: loop
}).then(() => {
  console.log(`playing wav file ${sfpath}.`);
}).catch((error) => {
  console.error(error);
});

