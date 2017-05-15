#!/usr/bin/env node
const MergeSort = require('./src/MergeSort');
const CountSort = require('./src/CountSort');

// number of sorts to run
const NUM_SORTS = 5;
// maximum possible score a player can achieve
const LOWEST_POSSIBLE_SCORE = 0;
// maximum possible score a player can achieve
const HIGHEST_POSSIBLE_SCORE = 200;

// get random number between & including min & max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// calculate average sort time in seconds
function calcSortSeconds(sortTimes) {
  const totalTime = sortTimes.reduce(( acc, cur ) => acc + cur, 0);
  const avgTime = totalTime / sortTimes.length;
  const seconds = avgTime / 1000;
  return seconds.toFixed(4);
}

// array with millions of entries
const unsortedScores = [];
for(let i=0; i < 1000000; i++) {
  unsortedScores.push(getRandomInt(LOWEST_POSSIBLE_SCORE, HIGHEST_POSSIBLE_SCORE));
}
//console.log(unsortedScores);

// run merge sorts
const mergeTimes = new Array(NUM_SORTS);
for (let i=0; i < NUM_SORTS; i++) {
  let mergeStart = new Date().getTime();
  let mergeSorted = MergeSort.sort(unsortedScores);
  let mergeFinish = new Date().getTime();
  mergeTimes[i] = mergeFinish - mergeStart;

  // if (i === mergeTimes.length - 1) {
  //   console.log(mergeSorted);
  // }
}
console.log(`MergeSort's average seconds: ${calcSortSeconds(mergeTimes)}`);

// run standard count sorts
const countTimes = new Array(NUM_SORTS);
for (let i=0; i < NUM_SORTS; i++) {
  let countStart = new Date().getTime();
  let countSorted = CountSort.sort(unsortedScores, HIGHEST_POSSIBLE_SCORE);
  let countFinish = new Date().getTime();
  countTimes[i] = countFinish - countStart;

  // if (i === countTimes.length - 1) {
  //   console.log(countSorted);
  // }
}
console.log(`CountSort's (standard) average seconds: ${calcSortSeconds(countTimes)}`);

// run 1st version of count'ish sorts
const countTimes1 = new Array(NUM_SORTS);
for (let i=0; i < NUM_SORTS; i++) {
  let countStart1 = new Date().getTime();
  let countSorted1 = CountSort.sortCountish01(unsortedScores);
  let countFinish1 = new Date().getTime();
  countTimes1[i] = countFinish1 - countStart1;

  // if (i === countTimes.length - 1) {
  //   console.log(countSorted1);
  // }
}
console.log(`CountSort'ish #1's average seconds: ${calcSortSeconds(countTimes1)}`);

// run 2nd version of count'ish sorts
const countTimes2 = new Array(NUM_SORTS);
for (let i=0; i < NUM_SORTS; i++) {
  let countStart2 = new Date().getTime();
  let countSorted2 = CountSort.sortCountish02(unsortedScores);
  let countFinish2 = new Date().getTime();
  countTimes2[i] = countFinish2 - countStart2;

  // if (i === countTimes.length - 1) {
  //   console.log(countSorted2);
  // }
}
console.log(`CountSort'ish #2's average seconds: ${calcSortSeconds(countTimes2)}`);
