// define the tracks in the game
var COLORS_KERBLIGHT = '#a02222',
    COLORS_KERBDARK = '#BBBBBB',
    COLORS_LANDLIGHT = '#000000',
    COLORS_LANDDARK = '#000000',
    COLORS_ROAD = '#000000';

var Track = function() {
  this.trackLength = 0;
  this.currentAngle = 0;

  this.segments = [];
  this.map = null;
}

var laneWidth      =1200;// 1200;//2000;   

Track.segmentLength  = 300;                   
            
var lanes          = 1;                       

Track.prototype = {
  buildTrack0: function() {
    COLORS_FOG = 0;

    this.segments = [];
    this.addStraight(200);
    this.calculateLength();    
  },

  createStreetLights: function() {
    var segmentCount = this.getSegmentCount();
    
    for(var i = 0; i < segmentCount; i++) {
      var segment = this.segments[i];

      if(i % 20 == 0) {
        var x = segment.p1.world.x;
        segment.sprites.push({ 
          source: SPRITES_STREETLIGHTLEFT, 
          s: 12, 
          x: x  - 12 * SPRITES_STREETLIGHTLEFT.w + 700
        });

        var x = segment.p2.world.x;
        segment.sprites.push({ 
          source: SPRITES_STREETLIGHTRIGHT, 
          s: 12, 
          x: x  - 700
        });
      }
    }
  },

  createRoadsideObjects: function(objs, prob, scale, offset, turnSigns) {
    var segmentCount = this.getSegmentCount();
    var turnSegment = 0;
    for(var i = 0; i < segmentCount; i++) {
      var segment = this.segments[i];
      var r = mathRand();
      if(segment.curve != 0 && turnSigns) {    
        if(turnSegment % 20 == 0) {
          if(segment.curve > 0) {
            var x = segment.p1.world.x;
            segment.sprites.push({ 
              source: SPRITES_TURNRIGHT, 
              s: 3, 
              x: x - 3 * SPRITES_TURNRIGHT.w - 400
            });
          } else {
            var x = segment.p2.world.x;
            segment.sprites.push({ 
              source: SPRITES_TURNLEFT, 
              s: 3, 
              x: x + 400
            });
          }
        }
        turnSegment++;
      } else {
        turnSegment = 0;
//      if(segment.curve == 0 || !turnSigns) {
        var obj = objs[mathRandInt(objs.length)];
        if(r > prob) {
          var x = segment.p1.world.x;

          segment.sprites.push({ 
            source: obj, 
            s: scale, 
            x: x  - scale * obj.w / 2 - offset
          });

          var x = segment.p2.world.x;
          segment.sprites.push({ 
            source: obj, 
            s: scale, 
            x: x - scale * obj.w / 2 + offset
          });
        }
      }
    }
  },

  buildTrack1: function() {

    COLORS_ROAD = '#3a3a3a';

    COLORS_LANDLIGHT = '#047804',
    COLORS_LANDDARK = '#006A00';
    COLORS_LANEMARKER = MEDIUMGREY;    
    COLORS_FOG = 0;

    resetGraphics();

    createTurnArrows();
    createTrees();
    createBackgroundTrees();
    createBackgroundMountains();
    createCars();

    var t = this;

    t.addStraight(50);
    t.addEasyCurve90(1, 0);
    t.addRoad(50, 50, 39, 0, 40, 0);

    t.addEasyCurve90(1, 0);  

    t.addStraight(25);

    t.addEasyCurve30(-1, 0);
    t.addEasyCurve30(1, 0);

    t.addHill(50, 40);

    t.addEasyCurve90(1, 0);

    t.addEasyCurve30(-1, 0);
    t.addEasyCurve30(1, 0);
  
    t.addEasyCurve90(1, -40);   


    t.addStraight(50, -40);    
    t.addStraight(55,0);

    t.calculateLength();
    t.drawMap();

    t.createRoadsideObjects(SPRITES_TREES, 0.9, 10, 900, true);

  },

  buildTrack2: function() {
    COLORS_ROAD = '#3a3a3a';

    COLORS_LANDLIGHT = '#047804';
    COLORS_LANDDARK = '#006A00';
    COLORS_LANEMARKER = MEDIUMGREY;
    COLORS_FOG = 0;

    resetGraphics();
    createCars();

    createTurnArrows();
    createTrees();
    createBackgroundTrees();
    createBackgroundMountains();
    createFlowers();

    var t = this;
    t.addStraight(20);
    t.addStraight(46, 0);
    t.addEasyCurve90(1, 30);


    t.addStraight(90, 0);
    t.addMediumCurve90(1, 0);

    t.addStraight(25, 0);
    t.addMediumCurve90(1, 50);
    t.addStraight(25, 0);

    t.addMediumCurve90(-1, 0);
    t.addStraight(68, -50);

    t.addMediumCurve90(-1, 0);
    t.addMediumCurve90(1, 0);
    t.addMediumCurve90(1, 0);
    t.addStraight(48, 0);

    t.addEasyCurve90(1, -30);
    t.addStraight(38, 0);

    t.addEasyCurve30(-1, 0);
    t.addEasyCurve30(1, 0)

    t.calculateLength();
    t.drawMap();

    t.createRoadsideObjects([SPRITES_FLOWERS], 0.3, 6, 1300, true);
  },  


  buildTrack3: function() {
   COLORS_ROAD = '#3a3a3a';

   COLORS_LANDLIGHT = '#5a5a5a';
   COLORS_LANDDARK = '#626262';

   COLORS_LANEMARKER = MEDIUMGREY;
   COLORS_FOG = 0;//'#eeeeee';

    resetGraphics();
    createCars();

    createBuildings(false);
    createStreetlights(false);
    createBackgroundBuildings(false);
    //createNightSky();

    var t = this;

    t.addStraight(100);
    t.addMediumCurve90(1, 0);
    t.addStraight(151, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(30, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(80, 0);
    t.addMediumCurve90(-1, 0);
    t.addMediumCurve90(-1, 0);

    t.addStraight(20, 0);
    t.addMediumCurve90(1, 0);
    t.addStraight(10, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(50, 0);
    t.addMediumCurve90(-1, 0);
    t.addMediumCurve90(1, 0);
    t.addMediumCurve90(1, 0);
    t.addStraight(62, 0);

//    t.getSegment(0).color = COLORS.START;
    t.calculateLength();
    t.drawMap();
    t.createRoadsideObjects(SPRITES_BUILDINGS, 0.95, 20, 3300, false);
    t.createStreetLights();

  },


  buildTrack4: function() {
    COLORS_ROAD = '#111111';
    COLORS_LANEMARKER = '#555555';    
    COLORS_FOG = '#000000';
    COLORS_LANDLIGHT =  '#090909';
    COLORS_LANDDARK = '#030303';


    resetGraphics();
    createCars();
    createBuildings(true);
    createStreetlights(true);
    createBackgroundBuildings(true);
    createNightSky();

    var t = this;
    t.addStraight(100);
    t.addHardCurve180(1, 0);
    t.addHardCurve90(-1, 0);
    t.addStraight(40, 0);
    t.addHardCurve90(1, 0);
    t.addHardCurve90(-1, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(50, 0);
    t.addMediumCurve90(-1, 0);
    t.addStraight(20, 0);
    t.addMediumCurve90(1, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(60, 0);
    t.addMediumCurve90(-1, 0);
    t.addMediumCurve90(1, 0);
    t.addStraight(51, 0);
    t.addHardCurve90(1, 0);
    t.addStraight(110, 0);
    t.calculateLength();
    t.drawMap();

    t.createRoadsideObjects(SPRITES_BUILDINGS, 0.95, 20, 3300, false);
    t.createStreetLights();
  },

  lastY: function() { 
    return (this.segments.length == 0) ? 0 : this.segments[this.segments.length-1].p3.world.y; 
  },

  getSegment: function(index) {
    return this.segments[index];    
  },

  getSegmentCount: function() {
    return this.segments.length;
  },

  getLength: function() {
    return this.trackLength;
  },

  calculateLength: function() {
    this.trackLength = track.segments.length * Track.segmentLength;
    

  },

  addSegment: function(curve, y) {
    var n = this.segments.length;

    var yFront = this.lastY();
    var yBack = y;
    var zFront = n * Track.segmentLength;
    var zBack = (n+1)*Track.segmentLength;
    var xLeft = -laneWidth;
    var xRight = laneWidth;

    var kerbWidth = 0;
    if(curve != 0) {
      kerbWidth = curve * 40;
      if(kerbWidth < 0) {
        kerbWidth = -kerbWidth;
      }
      kerbWidth += 60;

    }
    this.segments.push({
      index: n,
      p1: { world: { x: xLeft,  y: yFront,  z:  zFront }, camera: {}, screen: {} },
      p2: { world: { x: xRight, y: yFront,  z:  zFront }, camera: {}, screen: {} },
      p3: { world: { x: xRight, y: yBack, z:  zBack }, camera: {}, screen: {} },
      p4: { world: { x: xLeft,  y: yBack, z: zBack }, camera: {}, screen: {} },
      curve: curve,
      kerbWidth: kerbWidth,
      sprites: [],
      cars: []
    });

  },

  easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },
  easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },
  easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },

  addRoad: function(enter, hold, leave, curve, y, curveAngle) {
    var curveAngle = curveAngle || 0;
    var exitAngle = this.currentAngle + curveAngle;
    
    var startY   = this.lastY();
    var endY     = startY + (Math.floor(y) * Track.segmentLength);
    var n, total = enter + hold + leave;
    var segmentCurve = 0;
    var totalCurve = 0;
    var firstSegment = this.segments.length;
    for(n = 0 ; n < enter ; n++) {
      segmentCurve = this.easeIn(0, curve, n/enter);
      totalCurve += segmentCurve;
      this.addSegment(segmentCurve, this.easeInOut(startY, endY, n/total));
    }
    for(n = 0 ; n < hold  ; n++) {
      segmentCurve = curve;
      totalCurve += segmentCurve;
      this.addSegment(curve, this.easeInOut(startY, endY, (enter+n)/total));
    }
    for(n = 0 ; n < leave ; n++) {
      segmentCurve = this.easeInOut(curve, 0, n/leave);
      totalCurve += segmentCurve;
      this.addSegment(segmentCurve, this.easeInOut(startY, endY, (enter+hold+n)/total));
    }
  
    var anglePerCurve = 0;
    if(totalCurve != 0) {
      anglePerCurve = (exitAngle - this.currentAngle) / totalCurve;
    }
  
    // fix the angles
    for(var i = firstSegment; i < this.segments.length; i++) {
      this.currentAngle += this.segments[i].curve * anglePerCurve;
      this.segments[i].angle = this.currentAngle;
    } 
  
    this.currentAngle = exitAngle;
    this.segments[this.segments.length - 1].angle = exitAngle;
  },

  addStraight: function(len, height) {
    height = height || 0;
    this.addRoad(len, len, len, 0, height, 0);
  },

  addBumps: function() {
    this.addRoad(10, 10, 10, 0,  5);
    this.addRoad(10, 10, 10, 0, -2);
    this.addRoad(10, 10, 10, 0, -5);
    this.addRoad(10, 10, 10, 0,  8);
    this.addRoad(10, 10, 10, 0,  5);
    this.addRoad(10, 10, 10, 0, -7);
    this.addRoad(10, 10, 10, 0,  5);
    this.addRoad(10, 10, 10, 0, -2);
  },

  addEasyCurve90: function(direction, height) {
    
    this.addRoad(25, 100 * 1.4, 25,
       direction * 4.25, height, direction * 90);
  },

  addEasyCurve30: function(direction, height) {
    this.addRoad(25, 50, 25,
       direction * 4.25, height, direction * 30);
  },

  addMediumCurve90: function(direction, height) {
    this.addRoad(25, 
        50 * 1.5, 
        25, 
        direction * 6 * 0.96, 
        height, direction * 90);
  },

  addHardCurve90: function(direction) {
    //7.5
    this.addRoad(18, 50 * 0.8, 18, direction * 8, 0, direction * 90);
  },
  addHardCurve180: function() {
    this.addRoad(50, 50, 50, 7.5, 0, 180);
  },

  addHill: function(num, height) {
    this.addRoad(num, num, num, 0, height, 0);
  },

  addRoadsideObject: function(n, sprite, offset) {
    var segment = this.segments[n];
    var x = 0;
    if(offset < 0) {
      x = segment.p1.world.x - 600;
    } else {
      x = segment.p2.world.x + 600;
    }
    segment.sprites.push({ source: sprite, x: x });
  },


  /*
  When the car reaches the end of the road we will simply loop back to the beginning. 
  To make this a little easier we provide a method to find the segment for any Z value
  even if it extends beyond the length of the road:
  */
  findSegment: function(z) {
    return this.segments[Math.floor(z / Track.segmentLength) % this.segments.length];
  },

  drawMap: function() {
    if(this.map == null) { 
      this.map = document.createElement('canvas');
    }
    this.map.width = 600;
    this.map.height = 600;
    cntx = this.map.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;
//    context.fillStyle = '#222222';
//    context.fillRect(0, 0, width, height);
    cntxClearRect(600, 600);
    cntxStrokeStyle('#666666');
    cntx.lineWidth = 5;
  
    var angle = 0;
    var x = 300;
    var y = 30;
  

  
    cntxBeginPath();
    var segmentDrawLength = 0.5;
    cntxMoveTo(x, y);
    for(var i = 0; i < this.segments.length; i++) {
      angle = (this.segments[i].angle / 180) * PI;
      x += segmentDrawLength * cos(angle);
      y += segmentDrawLength * sin(angle);
      cntxLineTo(x, y);

      // in 2d overhead view
      this.segments[i].x = x;
      this.segments[i].y = y;
    }
  
    cntxStroke();
  
    cntxStrokeStyle(LIGHTGREY);
    cntx.lineWidth = 4;
    cntxStroke();



    // draw the start line
    segmentDrawLength = 4;
    context.lineWidth = 3;
    cntxStrokeStyle(LIGHTGREY);
    cntxBeginPath();
    angle = ((this.segments[0].angle + 90) / 180) * PI;
    x -= segmentDrawLength * cos(angle);
    y -= segmentDrawLength * sin(angle);
    cntxMoveTo(x, y);
    x += 2 * segmentDrawLength * cos(angle);
    y += 2 * segmentDrawLength * sin(angle);
    cntxLineTo(x, y);
  
    cntxStroke();
  },


  drawOverheadTrack: function() {
    //var canvas = document.getElementById('trackCanvas');
    cntx = overheadTrack.x;//canvas.getContext('2d');
    this.overheadMap = overheadTrack.c;

    cntxClearRect(600, 600);
    cntxDrawImage(this.map, 0, 0, 600, 600, 0, 0, 600, 600);
  
    // opponents
    for(var i = 0; i < cars.length; i++) {
      var carPosition = cars[i].z;
      var segment = track.findSegment(carPosition);
      
      cntxBeginPath();
    
      cntxArc(segment.x, segment.y, 5, 0, 2 * PI, false);
      cntxFillStyle(DARKGREY);
      cntxFill();
      cntx.lineWidth = 2;
      cntxStrokeStyle('#999999');
      cntxStroke();
    }

    // camera z position plus player z position from camera
    var playerPosition = cars[0].z;
    var playerSegment = track.findSegment(playerPosition);
  
    cntxBeginPath();
    cntxArc(playerSegment.x, playerSegment.y, 5, 0, 2 * PI, false);
    cntxFillStyle('#ff0000');
    cntxFill();

    context.lineWidth = 2;
    cntxStrokeStyle(MEDIUMGREY);
    cntxStroke();
        
  }
}





