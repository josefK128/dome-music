// createphtree.js
// usage: npm run createtree <genre> <project>');
// creates complete phenome directory tree @/<genre>/<project>/track
//                                                            /axiom
//                                                            /seq
//                                                            /str
//                                                            /abc
//                                                            /midi
//                                                            /score
//                                                            /source

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from "fs";
  

// command line args
if(process.argv.length < 4){
  console.log('usage: npm run createtree <genre> <name>');
  process.exit(1);
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
const paths = [axiom, seq, str, abc, midi, score, source, track];


// create genre directory, then genre/project directory - root for all others
fs.mkdir(root, (error) => {
  if (error) {
    console.log(`mkdir(${root}) error:${error.message}`);
  } else {
    console.log(`New Directory ${root} created!`);
  }
});
fs.mkdir(stem, (error) => {
  if (error) {
    console.log(`mkdir(${stem}) error:${error.message}`);
  } else {
    console.log(`New Directory ${stem} created!`);
  }
});

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
          console.log(`Directory ${paths[p]} already exists!:${error.message}`);
        } else {
          console.log(`New Directory ${paths[p]} created!`);
        }
      });
    } else {
      console.log(`Given Directory ${paths[p]} already exists!`);
    }
  });
}//ps
