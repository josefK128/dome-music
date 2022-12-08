// time-pitch.js -
// open Chrome with constant url to time-pitch process 
// The wav-file used is ALWAYS @app/time-pitch/track.wav
// Desired wav-file must be ccccopy-rplaced over track.wav


import {exec} from 'node:child_process';


const action = 'start chrome http://localhost:8081/@app/time-pitch/index.html';


exec(action, (err) => {
  if(err){
    console.log(`error: ${err.message}`);
  }  
});

