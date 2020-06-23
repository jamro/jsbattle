module.exports = (currentScore, hasWon) => {
  let newScore;
  if(hasWon) {
    newScore = currentScore + (10000 - currentScore)/25;
  } else {
    newScore = currentScore + (0 - currentScore)/25;
  }

  return Math.round(newScore);
}
