// utils/ph2g.js
// usage: npm run ph2g <genre> <project>
// First empties all directories in @/@genome and then copies all files 
// from directories axiom, seq, str, abc, midi and source (dirs of @genome)
// to the corresponding directories in @genome

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from "fs";
import {exec} from 'node:child_process';


// command line args
if(process.argv.length < 4){
  console.log('usage: npm run ph2g <genre> <project>');
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


// for all dir in dirs, empties @genome/dir 
// and then copies @/<genre>/<project>/dir to /@/@genome/dir
console.log(`emptying all files from ${gstem}`);
console.log(`and copying all files form ${phstem} to ${gstem}`);
for(let dir in dirs){

  let d = dirs[dir];

  // empty directory d 
  fs.readdir(gstem + d, (err, files) => {
    if(files && files.length > 0){
      console.log(`\n${gstem + d} contains ${files.length} files`);
      if (err) {
        console.log(`error emptying ${gstem + d}: ${err.message}`);
      } else {
        for(const file of files){
          const filep = gstem + d + '/' + file;
          console.log(`    removing ${file} from ${gstem + d}`);
          fs.unlinkSync(filep);
        }
      }
    }else{
      console.log(`${gstem + d} is already empty`);
    }
  });

  // copy @/@genome/dir to @/genre/project/dir
  const gstemd = gstem + d;
  const phstemd = phstem + d;
  fs.readdirSync(phstemd).forEach(file => {

    const action = `cp ${phstemd}/${file} ${gstemd}/${file}`;  
    exec(action, (err) => {
      if(err){
        console.log(`error copying ${file}: ${err.message}`);
      }else{  
        console.log(`\n${phstemd}/${file} copied to ${gstemd}/${file}`);
      }
    });
  });
}

