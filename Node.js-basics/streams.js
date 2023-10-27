// streams means data will be printed in chunks
const fs = require('fs');

const readStream = fs.ReadStream("./docs/blogs.txt", "utf8", (err)=>{
    if(err) console.log(err);
});

const writeStream = fs.createWriteStream("./docs/blogs2.txt", (err)=>{
    if(err) console.log(err);
});

// readStream.on("data", (chunk)=>{
//     console.log("------New Chunk-----");
//     console.log(chunk);
//     writeStream.write("\nNew Chunk\n");
//     writeStream.write(chunk);
// });

//piping

readStream.pipe(writeStream);