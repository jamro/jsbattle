"use strict";
const RankTable = require("../../../../app/services/league/RankTable.js");

describe("Test Share Battle API", () => {

	it('should initialize with data', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 1932},
      { id: '109384', score: 1029},
      { id: '923836', score: 938}
    ])
    const data = ranktable.getData();
    expect(data).toHaveLength(3);
    expect(data[0]).toHaveProperty('id', '632243');
    expect(data[1]).toHaveProperty('id', '109384');
    expect(data[2]).toHaveProperty('id', '923836');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should pick random element', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 1932},
      { id: '109384', score: 1029},
      { id: '923836', score: 938},
      { id: '479210', score: 394},
    ]);
    for(let i=0; i<100; i++) {
      let opponents = ranktable.pickRandom();
      expect(opponents[0].id).not.toBe(opponents[1].id)
    }
  });

  it('should not pick random when not enough elements', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 1932}
    ]);
    await expect(() => {
      ranktable.pickRandom()
    }).toThrow(/no opponents/i)
  });

  it('should add data', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 1932},
      { id: '109384', score: 1029},
      { id: '923836', score: 938}
    ]);

    ranktable.add({id: '292083', score: 3000})
    ranktable.add({id: '395610', score: 120})
    ranktable.add({id: '984102', score: 1403})

    const data = ranktable.getData();
    expect(data).toHaveLength(6);
    expect(data[0]).toHaveProperty('id', '292083');
    expect(data[1]).toHaveProperty('id', '632243');
    expect(data[2]).toHaveProperty('id', '984102');
    expect(data[3]).toHaveProperty('id', '109384');
    expect(data[4]).toHaveProperty('id', '923836');
    expect(data[5]).toHaveProperty('id', '395610');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should replacde data when duplicated', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 1932},
      { id: '109384', score: 1029},
      { id: '923836', score: 938}
    ]);

    ranktable.add({id: '109384', score: 1109})
    ranktable.add({id: '632243', score: 872})
    ranktable.add({id: '923836', score: 2037})

    const data = ranktable.getData();
    expect(data).toHaveLength(3);
    expect(data[0]).toHaveProperty('id', '923836');
    expect(data[1]).toHaveProperty('id', '109384');
    expect(data[2]).toHaveProperty('id', '632243');
    expect(data[0]).toHaveProperty('score', 2037);
    expect(data[1]).toHaveProperty('score', 1109);
    expect(data[2]).toHaveProperty('score', 872);

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should remove elements', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 1932},
      { id: '923836', score: 938},
      { id: '567231', score: 542},
      { id: '923836', score: 238},
      { id: '123292', score: 103}
    ]);

    ranktable.remove('923836')
    const data = ranktable.getData();
    expect(data).toHaveLength(3);
    expect(data[0]).toHaveProperty('id', '632243');
    expect(data[1]).toHaveProperty('id', '567231');
    expect(data[2]).toHaveProperty('id', '123292');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should update rank elements (upgrade)', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 2932},
      { id: '923836', score: 1983},
      { id: '567231', score: 1563},
      { id: '876325', score: 1231},
      { id: '766325', score: 528},
      { id: '123292', score: 103}
    ]);

    ranktable.updateScore('766325', 1892);
    const data = ranktable.getData();
    expect(data).toHaveLength(6);
    expect(data[0]).toHaveProperty('id', '632243');
    expect(data[1]).toHaveProperty('id', '923836');
    expect(data[2]).toHaveProperty('id', '766325');
    expect(data[2]).toHaveProperty('score', 1892);
    expect(data[3]).toHaveProperty('id', '567231');
    expect(data[4]).toHaveProperty('id', '876325');
    expect(data[5]).toHaveProperty('id', '123292');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should update rank elements (first)', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 2932},
      { id: '923836', score: 1983},
      { id: '567231', score: 1563},
      { id: '876325', score: 1231},
      { id: '766325', score: 528},
      { id: '123292', score: 103}
    ]);

    ranktable.updateScore('766325', 9000);
    const data = ranktable.getData();
    expect(data).toHaveLength(6);
    expect(data[0]).toHaveProperty('id', '766325');
    expect(data[0]).toHaveProperty('score', 9000);
    expect(data[1]).toHaveProperty('id', '632243');
    expect(data[2]).toHaveProperty('id', '923836');
    expect(data[3]).toHaveProperty('id', '567231');
    expect(data[4]).toHaveProperty('id', '876325');
    expect(data[5]).toHaveProperty('id', '123292');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should update rank elements (downgrade)', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 2932},
      { id: '923836', score: 1983},
      { id: '567231', score: 1563},
      { id: '876325', score: 1231},
      { id: '766325', score: 528},
      { id: '123292', score: 103}
    ]);

    ranktable.updateScore('923836', 653);
    const data = ranktable.getData();
    expect(data).toHaveLength(6);
    expect(data[0]).toHaveProperty('id', '632243');
    expect(data[1]).toHaveProperty('id', '567231');
    expect(data[2]).toHaveProperty('id', '876325');
    expect(data[3]).toHaveProperty('id', '923836');
    expect(data[3]).toHaveProperty('score', 653);
    expect(data[4]).toHaveProperty('id', '766325');
    expect(data[5]).toHaveProperty('id', '123292');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should update rank elements (last)', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 2932},
      { id: '923836', score: 1983},
      { id: '567231', score: 1563},
      { id: '876325', score: 1231},
      { id: '766325', score: 528},
      { id: '123292', score: 103}
    ]);

    ranktable.updateScore('923836', 100);
    const data = ranktable.getData();
    expect(data).toHaveLength(6);
    expect(data[0]).toHaveProperty('id', '632243');
    expect(data[1]).toHaveProperty('id', '567231');
    expect(data[2]).toHaveProperty('id', '876325');
    expect(data[3]).toHaveProperty('id', '766325');
    expect(data[4]).toHaveProperty('id', '123292');
    expect(data[5]).toHaveProperty('id', '923836');
    expect(data[5]).toHaveProperty('score', 100);

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should update rank elements (no change)', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 2932},
      { id: '923836', score: 1983},
      { id: '567231', score: 1563},
      { id: '876325', score: 1231},
      { id: '766325', score: 528},
      { id: '123292', score: 103}
    ]);

    ranktable.updateScore('567231', 1609);
    const data = ranktable.getData();
    expect(data).toHaveLength(6);
    expect(data[0]).toHaveProperty('id', '632243');
    expect(data[1]).toHaveProperty('id', '923836');
    expect(data[2]).toHaveProperty('id', '567231');
    expect(data[2]).toHaveProperty('score', 1609);
    expect(data[3]).toHaveProperty('id', '876325');
    expect(data[4]).toHaveProperty('id', '766325');
    expect(data[5]).toHaveProperty('id', '123292');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should update rank elements (same score)', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 2932},
      { id: '923836', score: 1983},
      { id: '567231', score: 1563},
      { id: '876325', score: 1231},
      { id: '766325', score: 528},
      { id: '123292', score: 103}
    ]);

    ranktable.updateScore('567231', 1563);
    const data = ranktable.getData();
    expect(data).toHaveLength(6);
    expect(data[0]).toHaveProperty('id', '632243');
    expect(data[1]).toHaveProperty('id', '923836');
    expect(data[2]).toHaveProperty('id', '567231');
    expect(data[2]).toHaveProperty('score', 1563);
    expect(data[3]).toHaveProperty('id', '876325');
    expect(data[4]).toHaveProperty('id', '766325');
    expect(data[5]).toHaveProperty('id', '123292');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });

  it('should not update rank elements when not exist', async () => {
    const ranktable = new RankTable();
    ranktable.init([
      { id: '632243', score: 2932},
      { id: '923836', score: 1983},
      { id: '567231', score: 1563},
      { id: '876325', score: 1231},
      { id: '766325', score: 528},
      { id: '123292', score: 103}
    ]);

    ranktable.updateScore('111111', 3024);
    const data = ranktable.getData();
    expect(data).toHaveLength(6);
    expect(data[0]).toHaveProperty('id', '632243');
    expect(data[1]).toHaveProperty('id', '923836');
    expect(data[2]).toHaveProperty('id', '567231');
    expect(data[3]).toHaveProperty('id', '876325');
    expect(data[4]).toHaveProperty('id', '766325');
    expect(data[5]).toHaveProperty('id', '123292');

    for(let index in data ) {
      expect(data[index]).toHaveProperty('rank', Number(index)+1);
    }
  });


  it('should slice ranktable', async () => {
    const initData = [
      { id: '632243', score: 2932},
      { id: '923836', score: 1983},
      { id: '567231', score: 1563},
      { id: '876325', score: 1231},
      { id: '287393', score: 1109},
      { id: '091384', score: 983},
      { id: '766325', score: 528},
      { id: '123292', score: 103}
    ];
    const testData = [
      {
        id: '287393',
        range: 4,
        expectedFirstIndex: 2,
      },
      {
        id: '287393',
        range: 3,
        expectedFirstIndex: 3,
      },
      {
        id: '923836',
        range: 5,
        expectedFirstIndex: 0,
      },
      {
        id: '091384',
        range: 5,
        expectedFirstIndex: 3,
      },
      {
        id: '123292',
        range: 3,
        expectedFirstIndex: 5,
      }
    ]

    for(let testCase of testData) {
      const ranktable = new RankTable();
      ranktable.init(initData);

      const result = ranktable.slice(testCase.id, testCase.range);
      expect(result).toHaveLength(testCase.range);

      for(let i=0; i < testCase.range; i++) {
        expect(result[i]).toHaveProperty('id', initData[testCase.expectedFirstIndex+i].id);
        expect(result[i]).toHaveProperty('rank', testCase.expectedFirstIndex+i+1);
      }

    }


  });


});
