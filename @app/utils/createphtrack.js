// createphtrack.js
// usage: npm run createphtrack <genre> <project> 
// creates minimal phenome directory tree @/<genre>/<project>/track

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from "fs";



// command line args
if(process.argv.length < 4){
  console.log('too few args - usage: npm run createphtrack <genre> <project>');
}
const genre = process.argv[2];
const project = process.argv[3];
const root = './@/' + genre;
const stem = root + '/' + project;
const track = stem + '/track';


// create genre directory, then genre/project directory - root for all others
fs.mkdir(root, (error) => {
  if (error) {
    console.log(`mkdir(${root}) error:${error.message}`);
  } else {
    console.log(`New Directory ${root} created!`);

    fs.mkdir(stem, (error) => {
      if (error) {
        console.log(`mkdir(${stem}) error:${error.message}`);
      } else {
        console.log(`New Directory ${stem} created!`);

        fs.mkdir(track, (error) => {
          if (error) {
            console.log(`mkdir(${track}) error:${error.message}`);
          } else {
            console.log(`New Directory ${track} created!`);
          }
        });

      }
    });

  }
});

