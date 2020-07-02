class RankTable {

  constructor() {
    this.data = [];
  }

  init(data) {
    this.data = data;
    const count = this.data.length;
    for(let i=0; i < count; i++) {
      this.data[i].rank = i+1;
    }
  }

  add(entity) {
    let count = this.data.length;
    let shiftItem = null;
    let insertedIndex;
    let i;
    for(i=0; i < count+1; i++) {
      if(shiftItem) {
        let tmp = this.data[i];
        this.data[i] = shiftItem;
        this.data[i].rank = i+1;
        shiftItem = tmp;
      } else if(!this.data[i] || this.data[i].score < entity.score) {
        shiftItem = this.data[i];
        this.data[i] = entity;
        this.data[i].rank = i+1;
        insertedIndex = i;
      }
    }

    // remove duplicates
    count++;
    let removedCount = 0;
    for(let i=0; i < count; i++) {
      if(this.data[i].id == entity.id && i != insertedIndex) {
        removedCount++;
      }
      this.data[i] = this.data[i+removedCount];
      if(this.data[i]) {
        this.data[i].rank = i+1;
      }
    }
    for(let i=0; i < removedCount; i++) {
      this.data.pop();
    }
  }

  remove(id) {
    const count = this.data.length;
    let removedCount = 0;
    for(let i=0; i < count; i++) {
      if(this.data[i+removedCount] && this.data[i+removedCount].id == id) {
        removedCount++;
      }
      this.data[i] = this.data[i+removedCount];
      if(this.data[i]) {
        this.data[i].rank = i+1;
      }
    }


    for(let i=0; i < removedCount; i++) {
      this.data.pop();
    }

  }

  updateFail(id, fightsError) {
    let entity = this.data.find((e) => e.id == id);
    entity.fights_error = fightsError;
  }

  updateScore(id, newScore, totalFigths, fightsWin, fightsLose) {
    const count = this.data.length;
    let newIndex = -1;
    let oldIndex = -1;
    let i;
    for(i=0; i < count; i++) {
      if(newIndex == -1 && this.data[i].score < newScore) {
        newIndex = i;
      }
      if(oldIndex == -1 && this.data[i].id == id) {
        oldIndex = i;
      }
    }
    if(newIndex == -1) {
      newIndex = count;
    }

    if(oldIndex == -1) {
      return;
    }

    let updatedEntity = this.data[oldIndex];
    updatedEntity.score = newScore;
    updatedEntity.fights_total = totalFigths;
    updatedEntity.fights_win = fightsWin;
    updatedEntity.fights_lose = fightsLose;

    if(newIndex < oldIndex) {
      for(i=oldIndex; i > newIndex; i--) {
        this.data[i] = this.data[i-1];
        this.data[i].rank = i+1;
      }
      this.data[newIndex] = updatedEntity;
      updatedEntity.rank = newIndex+1;
    } else if(newIndex > oldIndex) {
      for(i=oldIndex; i < newIndex-1; i++) {
        this.data[i] = this.data[i+1];
        this.data[i].rank = i+1;
      }
      this.data[newIndex-1] = updatedEntity;
      updatedEntity.rank = newIndex;
    }
  }

  slice(id, range) {
    const count = this.data.length;
    let rank = 1;
    for(let i=0; i < count; i++) {
      if(this.data[i].id == id) {
        rank = i + 1;
      }
    }

    let upperMargin = Math.ceil((range-1)/2);
    let lowerMargin = Math.floor((range-1)/2);

    let upperMarginLimit = rank - 1;
    let lowerMarginLimit = this.data.length - rank;

    if(upperMargin > upperMarginLimit) {
      lowerMargin = lowerMargin + (upperMargin - upperMarginLimit);
      upperMargin = upperMarginLimit;
    }
    if(lowerMargin > lowerMarginLimit) {
      upperMargin = upperMargin + (lowerMargin - lowerMarginLimit);
      lowerMargin = lowerMarginLimit;
    }
    upperMargin = Math.min(upperMargin, upperMarginLimit);
    lowerMargin = Math.min(lowerMargin, lowerMarginLimit);

    let result = [];

    for(let i=rank-upperMargin-1; i <= rank+lowerMargin-1; i++) {
      result.push(this.data[i])
    }

    return result;
  }

  getData() {
    return this.data;
  }

  getLength() {
    return this.data.length;
  }

  pickRandom() {
    let count = this.data.length;
    if(count <= 1) {
      throw new Error('no opponents found for the league match')
    }
    let rand1 = Math.random();
    let rand2 = Math.random();
    let index1 = Math.floor(rand1*count);
    let index2 = Math.floor(rand2*(count-1));
    if(index2 >= index1) {
      index2++;
    }

    return [
      this.data[index1],
      this.data[index2]
    ]
  }
}

module.exports = RankTable;
