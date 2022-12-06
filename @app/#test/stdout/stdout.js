// time-pitch.js - open Chrome with constant url to time-pitch 
// process copied-replaced @app/time-pitch/track.wav

import {exec} from 'node:child_process';


const action = 'node hello';


exec(action, (err, stdout) => {
  if(err){
    console.log(`error: ${err.message}`);
  }  
  if(stdout){
    console.log(`stdout: ${stdout}`);
  }  
});

