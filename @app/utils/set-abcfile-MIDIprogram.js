// utils/set-abcfile-MIDIprogram.js
// usage: npm run set-abcfile-MIDIprogram abcfile N
// sets MIDIprogram number via insertion or replacement of %%MIDI N
// Also, if necessary, repairs all incorrect %MIDI-lines with %%MIDI-line

// NOTE: process.cwd() returns the directory from which the npm cmd was made
// NOTE: __dirname = url.fileURLToPath(new URL('.', import.meta.url)) is the
// directory containing the npm nodejs-executable file
// NOTE: __filename = url.fileURLToPath(import.meta.url) is the path to the
// npm nodejs-executable file itself


import fs from "fs";
import lineReader from 'line-reader';



if(process.argv.length < 4){
  console.log(`usage: npm run set-abcfile-MIDIprogram abcfile N`);
  process.exit(1);
}


// cmdline args
const abcfile = process.argv[2],
      program = process.argv[3],
      abcpath = `C:/public/dome-music/@/@genome/abc/${abcfile}`;


// chdir to @/@genome so all abc-files *.abc are a t./abc/*.abc
process.chdir('./@/@genome');
//console.log(`cwd = ${process.cwd()}`);


// read ./abc/<abcfile> - change MIDI program and overwrite the file
if(abcfile.endsWith('.abc')){
  let text = '';
  lineReader.eachLine(abcpath, (line, last) => {
    //console.log(`line = ${line}`); 
    if(line[0] === '%' && line[1] !== '%'){
      line = '%' + line;
      //console.log(`repaired line = ${line}`); 
    }
    if(line.includes('program')){
      //console.log(`line '${line}' contains 'program'`);
      let a = line.split(' ');
      //console.log(`a = ${a}`);
      a.pop();
      //console.log(`after pop a = ${a}`);
      a.push(`${program}`);
      //console.log(`after push a = ${a}`);
      line = a.join(' ');
      //console.log(`line with new program number = ${line}`);
    }
    text += `${line}\n`;
    //console.log(`text = ${text}`);
    if(last){
      fs.writeFileSync(abcpath, text);
      console.log(`wrote repaired ${abcpath}`);
    }
  });
}else{
  console.log(`error: ${abcfile} lacks file-extension .abc`);
}
