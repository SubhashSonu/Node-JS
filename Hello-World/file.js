
const fs = require('fs');

// // Sync...
// fs.writeFileSync("./test.txt","Hey There");

// Async...
// fs.writeFile("test.txt","Hello World", (error)=>{});

// const result = fs.readFileSync("./contacts.txt", "utf-8");

// console.log(result);


// fs.readFile("./contacts.txt", "utf-8", (error, result) =>{
//     if(error){
//         console.log("Error",error);
//     }

//     else
//     console.log(result);
// })

// fs.appendFileSync("./test.txt",new Date().getFullYear().toString());

// fs.appendFileSync("./test.txt",`${Date.now()} Hey There\n`)

// fs.cpSync("./test.txt","./copy.txt")

// fs.unlinkSync("./copy.txt")

// console.log(fs.statSync("./test.txt"));

console.log(fs.statSync("./test.txt").isFile())