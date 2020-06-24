module.exports = (currentScore, hasWon) => {
  let newScore;
  if(hasWon) {
    newScore = currentScore + Math.min(100, (10000 - currentScore)/50);
  } else {
    newScore = currentScore - Math.min(100, currentScore/50);
  }
  return Math.round(newScore);
}
