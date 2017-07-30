var simulation;
var debugTankId;
var rendererName = 'bw';

var step = 0;

$( document ).ready(function() {
  buildSimulation();

  $('#sim-super-slow').data('speed', 0.05);
  $('#sim-slow').data('speed', 0.3);
  $('#sim-normal').data('speed', 1);
  $('#sim-fast').data('speed', 8);
  $('#sim-super-fast').data('speed', 50);
  $('.sim-speed').click(function() {
    simulation.setSpeed($(this).data('speed'));
  });

  $('#debug-tank').change(function() {
    debugTankId = $(this).val();
    if(debugTankId == 0) {
      $('#debug-view').hide();
    } else {
      $('#debug-view').show();
      $('#debug-view > pre').html("");
    }
  })

  $('#sim-start').click(function() {
    setTimeout(function() {
      simulation.start();
    }, 100);

    $('.cover').hide();
    $('.sim-control').show();
    $('#sim-start').hide();
  });

});

function buildSimulation() {
  debugTankId = 0;
  var canvas = document.getElementById("battlefield");

  var renderer = JsBattle.createRenderer(rendererName);
  renderer.init(canvas);

  simulation = JsBattle.createSimulation(renderer);
  simulation.onError(showError);
  simulation.init(canvas.width, canvas.height);

  simulation.onRender(updateTanks);

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
    $('.cover').show();
    if(simulation.timeElapsed == simulation.timeLimit) {
      $('.congrats').html("Time out! Congrats " + winner + "!");
    } else {
      $('.congrats').html("Congrats " + winner + "!");
    }

    $('.sim-finish').show();
    $('.sim-control').hide();
  });

  $('#sim-loading').show();
  $.getJSON( "js/tanks/index.json", function(data) {
    data.forEach(function(tankName) {
      simulation.addTank(tankName);
      $('#sim-loading').hide();
      $('.cover').show();
      $('#sim-start').show();
    })
    buildScoreTable(simulation.tankList);
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
  var row, tank;
  $('#scoreboard > tbody > tr.tank-data').remove();

  for(var i in tankList) {
    tank = tankList[i];
    row = '<tr class="tank-data tank-' + tank.id + '">' +
      '<td>' + tank.fullName + '</td>' +
      '<td class="energy" style="text-align: center">' +
        '<div class="progress" style="margin-bottom: 0 !important;">' +
          '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">' +
          '</div>' +
        '</div>' +
      '</td>' +
      '<td style="text-align: right" class="score">0</td>' +
    '</tr>';
    $('#scoreboard').append(row);
    $('#debug-tank').append('<option value="' + tank.id + '">' + tank.fullName + '</option>')
  }


}

function updateTanks(force) {
  step++;
  if(!force && step % 3 != 0) {
    return;
  }

  var tank;

  for(var i in simulation.tankList) {
    tank = simulation.tankList[i];

    $('#scoreboard > tbody > tr.tank-' + tank.id + ' > td.score').html(tank.score.toFixed(2));

    var energy = Math.round(100*tank.energy/tank.maxEnergy);

    $('#scoreboard > tbody > tr.tank-' + tank.id + ' > td.energy > .progress > .progress-bar').attr('aria-valuenow', energy);
    $('#scoreboard > tbody > tr.tank-' + tank.id + ' > td.energy > .progress > .progress-bar').css('width', energy + "%");
    $('#scoreboard > tbody > tr.tank-' + tank.id + ' > td.energy > .progress > .progress-bar').html(tank.energy.toFixed(2));

    if(tank.id == debugTankId) {
      $('#debug-view > pre.debug').html(tank.debugData);
      $('#debug-view > pre.state').html(JSON.stringify(tank.state, null, 2));
    }

    var rows = $('#scoreboard > tbody > tr.tank-data').remove();
    rows.sort(function(a, b) {
      a = Number($(a).find('.score').html());
      b = Number($(b).find('.score').html());

      return b-a;
    })
    $('#scoreboard > tbody').append(rows);
  }

}
