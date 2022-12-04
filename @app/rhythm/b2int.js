// b2int.js
// binary string file to integer string file where integer is the
// duration of the note-beat indicated by binary 1.
// exp: '10001010' -> '422'

import fs from 'fs';

let bseq = '',
    intseq = '';


// cmdline args
if(process.argv.length < 4){
  console.log('must provide two command line args');
  console.log('The first the input binary string-file path,');
  console.log('The second the output intewger string-file path,');
  process.exit(1);
}


// filepaths
const binpath = process.argv[2];
const intpath = process.argv[3];
console.log(`input binary string-file path is ${binpath}`);
console.log(`output integer string-file path is ${intpath}`);


// read binary string-file
try {
  bseq = fs.readFileSync(binpath, 'utf-8')
  console.log(`\nbinary string read is bseq = ${bseq}`)
} catch (err) {
  console.error(err)
}

// binary -> integer
// NOTE: if bseq starts with '0' change it to '1'
// Later this can be interpreted as a rest interval
bseq = bseq.trim();
const N = bseq.length;
for(let j=0; j<N;){
  let k = 1;
  let c = bseq[j];
  if(j === 0 && c === '0'){
    c = '1';
  }
  //console.log(`c = ${c}`);
  if(c === '1'){
    while(bseq[++j] != '1' && j < N){
      k++;
      //console.log(`k = ${k}`);
    }
    intseq += k.toString();
  }
}
console.log(`integer interval sequence formed is intseq = ${intseq}`);



// write integer string-file
try {
  fs.writeFileSync(intpath, intseq)
  console.log(`File ${intpath} is written successfully.`)
} catch (err) {
  console.error(err)
}
process.exit(1);

