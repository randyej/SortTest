
class CountSort {

  /**
   * standard count sort using arrays
   */
  static sort(scores, maxScore) {
    // hold counts of all possible scores up to the max score
    const scoreCounts = new Array(maxScore);
    for (let i = 0; i <= maxScore; i++) {
      scoreCounts[i] = 0;  // init to zero for all...
    }

    // count each score
    for (let i=0; i < scores.length; i++) {
      scoreCounts[scores[i]] += 1;
    }

    const sortedArray = new Array(scores.length);
    let currentSortedIndex = 0;

    // for each score in scoreCounts
    for (let score=0; score < scoreCounts.length; score++) {
        let count = scoreCounts[score];
        // for the number of times the score occurs
        for (let i=0; i < count; i++) {
            sortedArray[currentSortedIndex] = score;
            currentSortedIndex++;
        }
    }

    return sortedArray;
  }

  /**
   * first modified version
   */
  static sortCountish01(scores) {
    // hold all actual scores in an array keyed by score
    // - meaning index:value would look like [1][1], [2][2,2], [3][3,3,3]
    const scoreMap = [];

    // load up the score map
    for (let i=0; i < scores.length; i++) {
      const score = scores[i];
      const scoreArray = scoreMap[score];
      if(scoreArray) {
        scoreArray.push(score);
      }
      else {
        scoreMap[score] = [score];
      }
    }

    // now we only have to sort unique scores instead of all scores
    scoreMap.sort((score1, score2) => {
      return score1[0] - score2[0];
    });

    // at this point we have a sorted array of arrays,
    // so we need to flatten all the arrays into one
    const flatArray = [].concat(...scoreMap);


    // at this point we still need to remove a bunch of empty array indexes at the end
    const prunedArray = [];
    for(let i=0; i < flatArray.length; i++) {
      const score = flatArray[i];
      if(score != undefined) {
        prunedArray.push(score);
      }
      else {
        break; // no need to keep going as the rest will be empty
      }
    }

    return prunedArray;
  }

  /**
   * second modified version
   */
  static sortCountish02(scores) {
    // hold all actual scores in a Map keyed by score
    // - meaning key:value would look like [1][1], [2][2,2], [3][3,3,3]
    const scoreMap = new Map();

    // load up the score map
    for (let i=0; i < scores.length; i++) {
      const score = scores[i];
      const scoreArray = scoreMap.get(score);
      if(scoreArray) {
        scoreArray.push(score);
      }
      else {
        scoreMap.set(score, [score]);
      }
    }

    // now we only have to sort unique scores instead of all scores
    const sorted = [...scoreMap.values()].sort((score1, score2) => {
      return score1[0] - score2[0];
    });

    // at this point we have a sorted array of arrays,
    // so we need to flatten all the arrays into one
    const flatArray = [].concat(...sorted);

    return flatArray;
  }

}

module.exports = CountSort;
