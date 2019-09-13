// entry point, set up main loop

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var racing = false;

var getTimestamp = function() { return performance.now(); };


document.addEventListener("keydown", function(e) {
  if(racing) {
    race.keyDown(e);
  } else {
    titleScreen.keyDown(e);
  }
});


document.addEventListener("keyup", function(e) {
  if(racing) {
    race.keyUp(e);
  } else {
    titleScreen.keyUp(e);
  }
});


var now = getTimestamp();
var last = getTimestamp();

var dt = 0;
var gdt = 0;

var cars           = [];                      // array of cars on the road
var player = null;
var camera = new Camera();
var race = new Race();
track = new Track();
var titleScreen = new TitleScreen(canvas, context);

function startGame(options) {
  raceAudioInit();
  speak('Start');
  racing = true;
  camera.reset();
  race.start(0);

}
titleScreen.init();

/*
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
stats.dom.style.right = 0;
stats.dom.style.left = 'auto';
*/

function frame() {
//  stats.begin();

  now = getTimestamp();
  dt  = Math.min(1, (now - last) / 1000); 
  gdt = gdt + dt;

  if(!racing) {
    titleScreen.render(dt);
    gdt = 0;
  } else {
    outlineOnly = false;

    var step = 1/180;
    while (gdt > step) {
      gdt = gdt - step;
      race.update(step);
    }

    track.drawOverheadTrack();
    race.render();

    last = now;

  }
  requestAnimationFrame(frame);
//  stats.end();
}
frame(); 


