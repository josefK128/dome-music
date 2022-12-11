// utils/g2ph.js
// usage: npm run g2ph <genre> <project>
// copies @/@genome/<all dirs> to @/<genre>/<project>/<all dirs> (overwrites!!)
// and makes a directory in @/<genre>/<project> if it doesn't already exist.

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from "fs";
import {exec} from 'node:child_process';


// command line args
if(process.argv.length < 4){
  console.log('usage: npm run g2ph <genre> <project>');
  process.exit(1);
}

const genre = process.argv[2],
      project = process.argv[3],
      gstem = './@/@genome/',
      phstem = `./@/${genre}/${project}/`,
      dirs = ['abc', 'axiom', 'midi', 'score', 'seq', 'source', 'str'];

console.log(`genre = ${genre}`);
console.log(`project = ${project}`);
console.log(`gstem = ${gstem}`);
console.log(`phstem = ${phstem}`);
console.log(`dirs = ${dirs}`);
console.log();


// for all dir in dirs - create @/<project>/dir if it doesn't already exist
// and then copies @/@genome/dir to @/<genre>/<project>/dir
for(let dir in dirs){

  let d = dirs[dir];

  if(!fs.existsSync(phstem + d)){
    fs.mkdirSync(phstem + d + '/');
    console.log(`created directory ${phstem + d}`);
  }else{
    console.log(`directory ${phstem + d} already exists`);
  }
  
  // copy @/@genome/dir to @/genre/project/dir
  console.log();
  fs.readdirSync(gstem + d).forEach(file => {
    const action = `cp ${gstem + d}/${file} ${phstem + d}`;  
    exec(action, (err) => {
      if(err){
        console.log(`error copying ${file}: ${err.message}`);
      }else{  
        console.log(`${gstem + d}/${file} copied to ${phstem + d}`);
      }
    });
  });
}

