var simulation;
var debugTankId = localStorage.getItem("settings.debugTankId");
debugTankId = debugTankId ? debugTankId : 0;
var rendererName = 'brody';
var canvas = document.getElementById("battlefield");
var renderer;
var keepRenderingTimer = 0;
var scoreTable = []

var simSpeed = localStorage.getItem("settings.simSpeed");
simSpeed = simSpeed ? simSpeed : 1;

setInterval(function() {
  if(renderer && keepRenderingTimer > 0) {
    renderer.preRender();
    renderer.postRender();
    keepRenderingTimer--;
  }
}, 30)

var step = 0;

$( document ).ready(function() {
  if(debugTankId == 0) {
    $('#debug-view').hide();
  } else {
    $('#debug-view').show();
    $('#debug-view > pre').html("");

  }

  buildSimulation();
  showCover();

  $('#sim-super-slow').data('speed', 0.05);
  $('#sim-slow').data('speed', 0.3);
  $('#sim-normal').data('speed', 1);
  $('#sim-fast').data('speed', 8);
  $('#sim-super-fast').data('speed', 50);
  $('.sim-speed').click(function() {
    simSpeed = $(this).data('speed');
    localStorage.setItem("settings.simSpeed", simSpeed);
    if(simulation) {
      simulation.setSpeed(simSpeed);
    }
    $('.sim-speed').removeClass('btn-warning');
    $(this).addClass('btn-warning');
  });

  ($('.sim-speed')).toArray().find(function(item) {
    item = $(item);
    speed = item.data('speed');
    if(speed == simSpeed) {
      item.addClass('btn-warning');
    }
  })

  $('#debug-tank').change(function() {
    debugTankId = $(this).val();
    localStorage.setItem("settings.debugTankId", debugTankId);
    if(debugTankId == 0) {
      $('#debug-view').hide();
    } else {
      $('#debug-view').show();
      $('#debug-view > pre').html("");
    }
  })

  $('#sim-start').click(function() {
    simulation.start();
    hideCover();

    $('.sim-control').show();
    $('#sim-start').hide();
  });
  $('#sim-restart').click(function() {
    $('.sim-finish').hide();
    $('#sim-loading').show();
    buildSimulation();
  });

});

function buildSimulation() {
  renderer = JsBattle.createRenderer(rendererName);
  renderer.loadAssets(onAssetsLoaded.bind(this));
}

function onAssetsLoaded() {
  renderer.init(canvas);

  simulation = JsBattle.createSimulation(renderer);
  simulation.onError(showError);
  simulation.init(900, 600);

  simulation.onRender(updateTanks);
  simulation.setSpeed(simSpeed);
  simulation.onFinish(function() {
    updateTanks(true);

    var topScore = -1;
    var winner = "";
    for(var i in simulation.tankList) {
      var tank = simulation.tankList[i];
      if(tank.score > topScore) {
        topScore = tank.score;
        winner = tank.fullName;
      }
    }
    if(simulation.timeElapsed == simulation.timeLimit) {
      $('.congrats').html("<small>Time out! The winner is:</small><br/> <strong>" + winner + "</strong>!");
    } else {
      $('.congrats').html("<small>And the winner is:</small><br/> <strong>" + winner + "</strong>!");
    }

    $('.sim-finish').show();
    $('.sim-control').hide();
    keepRenderingTimer = 30;
    setTimeout(showCover, 500);
  });

  $('#sim-loading').show();
  $.getJSON( "js/tanks/index.json", function(data) {
    data.forEach(function(tankName) {
      simulation.addTank(tankName);
      $('#sim-loading').hide();
      $('#sim-start').show();
    })
    showCover();
    buildScoreTable(simulation.tankList);
    updateTanks(true);
  })
  .fail(function() {
    showError("Cannot load and parse js/tanks/index.json");
  })
}

function showError(msg) {
  console.error(msg);
  $('#error > span').html(msg);
  $('#error').show();
}

function buildScoreTable(tankList) {
  var row, tank, nameCell, energyCell, scoreCell;
  $('#scoreboard > tbody > tr.tank-data').remove();
  scoreTable = [];
  $('#debug-tank').empty();
  $('#debug-tank').append('<option value="0">[Select Tank for Debug View]</option>');
  for(var i in tankList) {
    tank = tankList[i];

    row = $('<tr class="tank-data"></tr>');
    nameCell = $('<td></td>');
    energyCell = $('<td class="energy" style="text-align: center">' +
      '<div class="progress" style="margin-bottom: 0 !important;">' +
        '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">' +
        '</div>' +
      '</div>' +
    '</td>');
    scoreCell = $('<td style="text-align: right" class="score">0</td>');


    row.append(nameCell);
    row.append(energyCell);
    row.append(scoreCell);

    $('#scoreboard').append(row);

    $('#debug-tank').append('<option value="' + tank.id + '">' + tank.fullName + '</option>');
    scoreTable.push({
      row: row,
      nameCell: nameCell,
      energyCell: energyCell,
      scoreCell: scoreCell,
      progressBar: energyCell.find('.progress > .progress-bar')
    })
  }
  $('#debug-tank').val(debugTankId);


}

function updateTanks(forceUpdate) {
  if(!scoreTable.length) return;
  step++;
  var i, tank;
  for(i in simulation.tankList) {
    tank = simulation.tankList[i];
    if(tank.id == debugTankId) {
      $('#debug-view > pre.debug').html(tank.debugData ? tank.debugData : "{}");
      $('#debug-view > pre.state').html(JSON.stringify(tank.state, null, 2));
    }
  }
  if(!forceUpdate && step % 15 != 0) {
    return;
  }
  var tankData = [];

  for(i in simulation.tankList) {
    tank = simulation.tankList[i];
    tankData.push({
      name: tank.fullName,
      energy: Math.round(100*tank.energy/tank.maxEnergy),
      score: tank.score
    });
  }
  tankData.sort(function(a,b) {
    return b.score - a.score;
  });
  for(i in tankData) {
    scoreTable[i].nameCell.html(tankData[i].name);
    scoreTable[i].progressBar.attr('aria-valuenow', tankData[i].energy);
    scoreTable[i].progressBar.css('width', tankData[i].energy + "%");
    scoreTable[i].progressBar.html(tankData[i].energy.toFixed(2));
    scoreTable[i].scoreCell.html(tankData[i].score.toFixed(2));
  }
}

function showCover() {
  $('#battlefield').hide();
  $('#cover').show();
}

function hideCover() {
  $('#battlefield').show();
  $('#cover').hide();
}
