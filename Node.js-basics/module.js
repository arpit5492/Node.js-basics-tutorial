// const {arr, ages} = require('./people'); // If we are importing people.js, it doesn't we can have full access of that file
// // console.log(xyz);
// console.log(arr, ages); 
// console.log(arr);

// Using node.js, we can also know on which platform we are running using the os module

const os = require('os');

console.log(os.platform(), os.homedir());
