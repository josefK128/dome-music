// time-pitch/time-pitch.js -
// usage: npm run time-pitch [wavpath]
// If wavpath is included sf will be copied to @app/time-pitch/track.wav
// If wavpath is omitted the existing  @app/time-pitch/track.wav is used as sf
// opens Chrome with constant url to time-pitch process 
// NOTE: url is localhost:8081/@app/time-pitch/index.html. 
// NOTE: The wav-file used is ALWAYS @app/time-pitch/track.wav
// NOTE: The processed sf is played as audio out (so must be recorded)


import {exec} from 'node:child_process';


console.log(`cwd = ${process.cwd()}`);

let sfpath = null;
if(process.argv.length < 3){
  console.log(`using already existing ./@app/time-pitch/track.wav as sf`);
}else{
  
  //const wavpath = process.cwd() + "/" + process.argv[2].trim();
  const wavpath = process.argv[2].trim();
  console.log(`copying ${wavpath} to ./@app/time-pitch/track.wav as sf`);
  const action = `cp ${wavpath} ./@app/time-pitch/track.wav`;

  exec(action, (err) => {
    if(err){
      console.log(`\nerror copying ${wavpath}: ${err.message}`);
    }else{
      console.log(`\ncopied ${wavpath} to ./@app/time-pitch/track.wav`);
    }
  });
} 

const action = 'start chrome http://localhost:8081/@app/time-pitch/index.html';
console.log(`time-pitch operates on @app/time-pitch/track.wav ONLY'`);
exec(action, (err) => {
  if(err){
    console.log(`error: ${err.message}`);
  }  
});

