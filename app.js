#!/usr/bin/env node
// import {emphasize} from 'emphasize';
// import {chalk} from 'chalk';

const fs = require('fs');
const util = require('util');
const path = require('path')
// const chalk = require('chalk');
// const emphasize = import('emphasize');

// method #2
// const lstat = util.promisify(fs.lstat);

// method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }
  const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename));
  });
  const allStats = await Promise.all(statPromises);
  for (let stats of allStats) {
    const index = allStats.indexOf(stats);
    if (stats.isFile()) {
      console.log("File:", filenames[index]);
    } else {
      console.log("Folder:", filenames[index]);
    }
    // console.log(filenames[index], stats.isFile());
  }
});
// method #1
// const lstat = (filename) => {
//   return new Promise((resolve,reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     })
//   })
// }

