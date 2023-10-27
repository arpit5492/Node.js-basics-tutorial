const fs = require('fs');

// reading files
// fs.readFile("./docs/first.txt", function(err, data){
//     if(err) throw err;
//     console.log(data.toString());
// })

// fs.readFile("./docs/first.txt", "utf8", function(err, data){
//     if(err) console.log(err);
//     console.log(data);
// })

// // The above read process takes time, so if there is any code below, then it will first print the below codes, then
// // after sometime it readFile() part will get printed

// console.log("New line");

// writing files
// fs.writeFile("./docs/first.txt", "Hi I am Arpit", (err) => {
//     if(err) console.log(err);
//     console.log("File has been written successfully!!");
// });

// fs.writeFile("./docs/second.txt", "Hi I am Arpit", (err) => {
//     if(err) console.log(err);
//     console.log("File has been written successfully!!");
// });


// directories

if(!fs.existsSync("./assets")){
    fs.mkdir("./assets", (err) => {
        if(err) {console.log(err)};
        console.log("File has been created!!");
    });
}
else{
    fs.rmdir("./assets", (err) => {
        if(err) console.log(err);
        console.log("Folder deleted");
    });
}
// deleting files

if(fs.existsSync("./docs/deleteme.txt")){
    fs.unlink("./docs/deleteme.txt", (err) => {
        if(err) console.log(err);
        console.log("File has been deleted");
    });
}
else{
    fs.writeFile("./docs/deleteme.txt", "", (err)=>{
        if(err) console.log(err);
        console.log("File has been created");
    });
}