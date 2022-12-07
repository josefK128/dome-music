// index.js - entry point for electron application dome-music


//default export from mongoose module
import mongoose from 'mongoose'



//mongodb
async function main() {
  console.log(`trying to connect...`);
  await mongoose.connect('mongodb://localhost:27017/test')
  console.log(`connected!`);
}

main().catch(err => {
  console.log(err)
})

