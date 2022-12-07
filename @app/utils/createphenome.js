//createphenome.js

import fs from "fs";
  


// command line args
if(process.argv.length < 4){
  console.log('too few args - usage: node createphenome <genre> <project>');
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

