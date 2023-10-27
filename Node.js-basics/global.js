// Global object
// Web Browser's global object is "window"
// But in node, the global object is "global"

// console.log(global);
// global.setTimeout(() => {
//     console.log("Hello World!!");
// }, 3000);

// setTimeout(() => {
//     console.log("Hello World!!");
//     clearInterval(interval);
// }, 3000);

// const interval = setInterval(() => {
//     console.log("Print in interval after every 1s");
// }, 1000);

console.log(__dirname); // Gives the path of the folder in which the current file is
console.log(__filename); // Gives the path of the file

// But we can't do document.querySelector here in node and we don't need that because
// node.js is basically used for the backend or the server side of the application