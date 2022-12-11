// utils/midi2ph.js
// usage: npm run midi2ph <genre> <project>
// copies @/@genome/midi/* to @/<genre>/<project>/midi/*

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from "fs";
import {exec} from 'node:child_process';


// command line args
if(process.argv.length < 4){
  console.log('npm run midi2ph <genre> <project>');
  process.exit(1);
}

const genre = process.argv[2],
      project = process.argv[3],
      gstem = './@/@genome/midi',
      phstem = `./@/${genre}/${project}/midi`;

console.log(`genre = ${genre}`);
console.log(`project = ${project}`);
console.log(`gstem = ${gstem}`);
console.log(`phstem = ${phstem}`);
console.log();


// create phstem = @/<genre>/<project>/midi if it doesn't already exist
if(!fs.existsSync(phstem)){
  fs.mkdirSync(phstem + '/');
  console.log(`created directory ${phstem}`);
}


// copy @/@genome/midi/* to @/genre/project/midi/*
fs.readdirSync(gstem).forEach(file => {
  const action = `cp ${gstem}/${file} ${phstem}`;  
  exec(action, (err) => {
    if(err){
      console.log(`error copying ${file}: ${err.message}`);
    }else{  
      console.log(`${gstem}/${file} copied to ${phstem}`);
    }
  });
});

