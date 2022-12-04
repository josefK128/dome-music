//createtree.js

import fs from "fs";
  


// command line args
if(process.argv.length < 4){
  console.log('too few args - exiting - usage: node createtree <genre> <name>');
}
const genre = process.argv[2];
const name = process.argv[3];
const root = './@/' + genre;
const stem = root + '/' + name;
const axiom = stem + '/axiom';
const seq = stem + '/seq';
const str = stem + '/str';
const abc = stem + '/abc';
const midi = stem + '/midi';
const score = stem + '/score';
const source = stem + '/source';
const track = stem + '/track';
const paths = [root, stem, axiom, seq, str, abc, midi, score, source, track];

// create directories 
for(let p in paths){
  fs.access(p, (error) => {
     
    // To check if the given directory 
    // already exists or not
    if (error) {
      // If current directory does not exist
      // then create it
      fs.mkdir(paths[p], (error) => {
        if (error) {
          console.log(`Directory ${paths[p]} already exists!`);
        } else {
          console.log(`New Directory ${paths[p]} created!`);
        }
      });
    } else {
      console.log(`Given Directory ${paths[p]} already exists!`);
    }
  });
}//ps