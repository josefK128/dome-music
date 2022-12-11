// audio/playwav.js
// usage: node playwav <filepath> (from pwd - dome-music) ['loop']
// If 'loop' is omitted the sf will paly once


import player from "node-wav-player";
  


// command line args
if(process.argv.length < 3){
  console.log(`usage: node playwav <filepath> (from pwd) ['loop']`);
  process.exit(1);
}

//sfpath
const sfpath = process.argv[2];
console.log(`sf path (relative to pwd) read from cmdline is ${sfpath}`);

//loop
let loop = false;   //default
if(process.argv[3]){
  loop = true;
  console.log('playback will loop infinitely');
  console.log('omit any arg for single play');
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

