
// the player car and the opponents car
var Car = function() {
  var t = this;

  t.sprite = 0;

  t.index = 0;

  t.width = 500;//530; // width
  t.height = 0;
  
  t.x = 0;
  t.y = 0;
  t.lastY = false;
  t.yOffset = 0;
  t.z = 0;
  t.lap = 0;
  t.lapStarted = false;
  t.position = 0;

  t.centrifugal = 0.3;
  t.slipstreamLines = [];
  t.slipstreamLengths = false;
  t.slipstream = 0;
  t.slipstreamTime = 0;

  t.percent = 0; // percent remaining in segment
  t.speed = 0;
  t.ySpeed = 0;

  t.turboStartTime = 0;
  t.accelerate=t.brake=t.turnLeft=t.turnRight=t.turbo=t.turboRequest=t.driftRequest=false;
  t.driftAmount = 0;
  t.driftDirection = 0;

  t.turboAmount = 100;
  t.lapStarted = false;

  // these are settings for the player
  // the car init routine will set them for ai players
  t.centrifugal    = 0.3;                     // centrifugal force multiplier when going around curves

  t.maxSpeed       =  26000;
  t.maxTurboSpeed  =  28000;

  t.speedPercent   = 0;  // speed as percentage of max speed

  t.accel          =  6800;
  t.breaking       = -16000;
  t.decel          = -8000;
  /*
  this.offRoadDecel   = -12000;
  this.offRoadLimit   = this.maxSpeed /1.4;
//  this.accel          =  maxSpeed/5;             // acceleration rate - tuned until it 'felt' right
  //this.breaking       = -maxSpeed;               // deceleration rate when braking
  //this.decel          = -maxSpeed/5;             // 'natural' deceleration rate when neither accelerating, nor braking
  //this.offRoadDecel   = -maxSpeed/2;             // off road deceleration is somewhere in between
  //this.offRoadLimit   =  maxSpeed/2;             // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
  //this.sideStripLimit   =  this.maxSpeed/1.5;             // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
  */

  t.currentLapTime = 0;                       // current lap time
  t.lastLapTime    = null;                    // last lap time

  t.position = 0;

  t.turnSpeed = 3000;

  // ai settings
  t.slowOnCorners = false;
  t.takeCornerOnInside = false;

  t.bounce = 1.5;
  t.finishPosition = 0;



}

Car.prototype = {
  doaccelerate:       function(v, accel, dt)      { return v + (accel * dt);                                        },

  initSlipstreamLines: function() {
    this.slipstreamLines = [];
//    var carWidth = this.width;
    var carHeight = 400;
//    var centreX = this.x + this.width / 2;
    var centreZ = this.z + 500;
//    var centreY = this.y + carHeight;// + carHeight;
    var smallRadius = carHeight - 40;// - 200;// - 570;
    var lineLength = 700;

    var i, j;
    var segments = 20;

    var angle = 0.0;
    if(this.slipstreamLengths === false) {
      this.slipstreamLengths = [];
      for(i = 0; i < segments; i++) {
        this.slipstreamLengths.push(mathRand());
      }
    }

    for(i = 0; i < segments; i++) {
      this.slipstreamLengths[i] += 0.03;
      if(this.slipstreamLengths[i] >= 0.8) {
        this.slipstreamLengths[i] = 0;
      }


      var largeRadius = carHeight + 60;

      if(angle > PI / 6 && angle <  PI / 2) {
        largeRadius = carHeight +60 +  (angle - PI / 6) * 128;// - 200;// - 570;
      }
      if(angle >= PI / 2 && angle < (5 * PI / 6)) {
       largeRadius = carHeight +60 +  (5 * PI / 6 - angle) * 128;// - 200;// - 570; 
      }
      var x1 = this.x + this.width / 2 + smallRadius * Math.cos(angle - 0.05);
      var y1 = this.y + smallRadius * sin(angle - 0.02);
      var x2 = this.x + this.width / 2 + smallRadius * Math.cos(angle + 0.05);
      var y2 = this.y + smallRadius * sin(angle + 0.02);

      var x3 = this.x + this.width / 2 + largeRadius * Math.cos(angle - 0.05);
      var y3 = this.y + largeRadius * sin(angle - 0.05);
      var x4 = this.x + this.width / 2 + largeRadius * Math.cos(angle + 0.05);
      var y4 = this.y + largeRadius * sin(angle + 0.05);

//      x3 = x1;
//      y3 = y1;
//      x4 = x2;
//      y4 = y2;


      var x1a =  x1 + (x3 - x1) * this.slipstreamLengths[i];
      var x2a = x2 + (x4 - x2) * this.slipstreamLengths[i];

      var y1a = y1 + (y3 - y1) * this.slipstreamLengths[i];
      var y2a = y2 + (y4 - y2) * this.slipstreamLengths[i];

      var x3a =  x1 + (x3 - x1) * (this.slipstreamLengths[i] + 0.4);
      var x4a = x2 + (x4 - x2) * (this.slipstreamLengths[i] + 0.4);

      var y3a = y1 + (y3 - y1) * (this.slipstreamLengths[i] + 0.4);
      var y4a = y2 + (y4 - y2) * (this.slipstreamLengths[i] + 0.4);


      var za = centreZ - lineLength * this.slipstreamLengths[i];
      var z2a = centreZ - lineLength * (this.slipstreamLengths[i] + 0.4);
//      var 1a = x1 + (x3 - x1) * this.slipstreamLengths[i];
  //    var x2a = x2 + (x4 - x2) * this.slipstreamLengths[i];

      var line = [];
      line.push({
        world: {
          x: x1a,
          y: y1a,
          z: za
        },
        camera: {},
        screen: {}

      });

      line.push({
        world: {
          x: x2a,
          y: y2a,
          z: za
        },
        camera: {},
        screen: {}
      });


      line.push({
        world: {
          x: x4a,
          y: y4a,
          z: z2a,//centreZ - lineLength
        },
        camera: {},
        screen: {}

      });

      line.push({
        world: {
          x: x3a,
          y: y3a,
          z: z2a,//centreZ-lineLength
        },
        camera: {},
        screen: {}
      });

      this.slipstreamLines.push(line);
      angle += PI / segments;

    }

    for(i = 0; i < this.slipstreamLines.length; i++) {
      var points = this.slipstreamLines[i];
      for(j = 0; j < points.length; j++) {
        camera.project(points[j], 0, 0, width, height);
      }
    }

  },

  limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));   
  },

  overlap: function(x1, w1, x2, w2, percent) {


    var min1 = x1 - (percent - 1) * w1 / 2;
    var max1 = x1 + (w1) * percent;
    var min2 = x2 - (percent - 1) * w2 / 2;
    var max2 = x2 + (w2) * percent;    
    return ! ((max1 < min2) || (min1 > max2));
  },

  // --- player controls ----
  setTurnLeft: function(turn) {
    this.turnLeft = turn;
  },
  setTurnRight: function(turn) {
    this.turnRight = turn;
  },
  setAccelerate: function(accelerate) {
    this.accelerate = accelerate;
  },
  setBrake: function(brake) {
    this.brake = brake;
  },

  setTurbo: function(turbo) {
    this.turboRequest = turbo;
  },

  setDrift: function(drift) {
    this.driftRequest = drift;
  },

  // --- end player controls ---

  getCurrentLapTime: function() {
    return this.currentLapTime;
  },

  getLap: function() {
    if(this.lap < 1) {
      return 1;
    }
    return this.lap;
  },

  getPosition: function() {
      var i = this.position,
          j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return i + "st";
      }
      if (j == 2 && k != 12) {
          return i + "nd";
      }
      if (j == 3 && k != 13) {
          return i + "rd";
      }
      return i + "th";
  },

  getSpeed: function() {
    return this.speed;
  },



  update: function(dt) {//}, playerSegment, playerW) {
    var maxSpeed = this.maxSpeed;
    this.speedPercent = this.speed / this.maxSpeed;
    var currentSegment = track.findSegment(this.z);
    var playerSegment = track.findSegment(cars[0].z);
    var speedPercent  = this.speedPercent;
    this.percent = utilPercentRemaining(this.z, Track.segmentLength);    


    var dx            = dt * this.turnSpeed * speedPercent; // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
    var trackLeft = currentSegment.p1.world.x;
    var trackRight = currentSegment.p2.world.x;

    var carLeftSide = this.x;
    var carRightSide = this.x + this.width;

    // middle distance is about 900
    // furthest is about 1800
    var distanceToLeft = carLeftSide - trackLeft;
    var distanceToRight = trackRight - carRightSide;
    var trackWidth = trackRight - trackLeft;



    var extraSpeed = 1;

    // is the car on a curve? easy curve max is about 4
    if(currentSegment.curve < 0 && distanceToLeft > 0) {
      // turn left
      if(this.index == 0) {
        extraSpeed = 1 + (trackWidth - this.width - distanceToLeft) * (-currentSegment.curve) / (trackWidth * 80);
      }
    } else if(currentSegment.curve > 0 && distanceToRight > 0) {
      if(this.index == 0) {
        extraSpeed = 1 + (trackWidth - this.width - distanceToRight) * (currentSegment.curve) / (trackWidth * 80);
      }
    }

    if(extraSpeed < 1) {
      extraSpeed = 1;
    }


    // max speed multiplier
    var mult = 0.8;
    var accMult = 1;
    if(this.slipstreamTime > 0) {
      mult += 0.4;
    }

    if(this.driftRequest) {
      // can only drift over certain speed ,otherwise we're breaking
      if(this.speed > 8000 ) {
        if(!this.drift && !this.accelerate) {
          this.driftAmount = 1.2;
          this.drift = true;
        }

        //mult -= 0.1;
        // can turn faster
      } else {
        mult -= 0.5;
        this.drift = false;
      }

    } else {
      this.drift = false;
    }


    if(this.driftAmount > 0 && this.speed > 8000) {
      this.driftAmount -= dt;
      mult -= 0.04;
      if(this.driftDirection == 0) {
        if(this.turnLeft) {
          this.driftDirection = -1;
        }
        if(this.turnRight) {
          this.driftDirection = 1;
        }
      }
    } else {
      this.drift = false;
      this.driftAmount = 0;
      this.driftDirection = 0
    }

    var turboOn = this.turbo;
    // is turbo on?
    if(this.turboRequest) {
      this.turbo = this.turboAmount > 0 && this.speed > 8000 && this.accelerate;  
    } else {
      this.turbo = false;
    }


    if(this.turbo) {
      accMult = 1.2;
      maxSpeed = this.maxTurboSpeed;
    }

    this.bounce = 3.4;
    // is the car offroad with a bit of leeway??   
    if(distanceToLeft < -this.width * 0.1 || distanceToRight < -this.width * 0.1) {

      if(distanceToLeft + this.width * 0.1 < -playerSegment.kerbWidth
         || distanceToRight + this.width * 0.1 < -playerSegment.kerbWidth) {
        
        this.bounce = 9.5;
        mult -= 0.6;
        accMult -= 0.2;
      } else {
        mult -= 0.1;
        this.bounce = 6;
      }
    }

    this.bounce = (this.bounce * mathRand() * speedPercent) ;

    
    if(this.index == 0 && race.state != STATE_RACEOVER) {
      // its the player

      this.x = this.x - (dx * speedPercent * playerSegment.curve * this.centrifugal);

      if(this.driftDirection != 0) {
        dx = dx * 0.5;
      }
      if(this.turnLeft)
        this.x = this.x - dx;
      else if (this.turnRight)
        this.x = this.x + dx;
    
      var ddrift = this.driftDirection * this.speed * 0.00055;
      this.x += ddrift;


      // need to check for collision with other cars..
      this.z = utilIncrease(this.z, dt * this.speed * extraSpeed, track.getLength());

      
      this.y = utilInterpolate(currentSegment.p1.world.y, 
        currentSegment.p3.world.y, 
        this.percent);

      // ---------------------------------------------- JUMP!!!
      // make the car jump if going fast..
      // y is the y position of the segment

        /*
      // gravity

      if(this.yOffset >= 0) {
        this.ySpeed -= dt * 75000;
      } else {
        this.ySpeed -= dt * 430000;
      }
      if(this.ySpeed < -2500) {
        this.ySpeed = -2500;
      }
      // get the dy for the y position of the track
      var dy = 0;
      if(this.lastY !== false) {
        dy = this.y - this.lastY;
        if(dy < -1000) {
          dy = 0;
        }

      }
      this.lastY = this.y;


      if(this.yOffset <= 0) {
        // was last on ground, so y speed is based on y position of segment

        var ydistTravelled = this.ySpeed * dt;
        // y offset is 
        this.yOffset = this.ySpeed * dt - dy;
        if(this.yOffset <= 0) {
          // we're on the ground
          this.ySpeed = dy / dt;
          this.yOffset = 0;
        }

      } else {
        // in air..
        this.yOffset += this.ySpeed * dt;
        if(this.yOffset < 0) {
          // we've landed
          this.yOffset = 0;
        }
      }


*/
      this.yOffset = 0;

      // -------------- END JUMP
      
      if(this.accelerate) {
        
        if(this.turbo) {
          var time = getTimestamp();
          if(!turboOn) {
            this.turboStartTime = time;
          }
          // decrease the amount of turbo left
          this.turboAmount -= dt * 2.45;
          raceAudioSetTurboTime(time - this.turboStartTime);
        }
        if(this.speed < maxSpeed * mult) {
          this.speed = this.doaccelerate(this.speed, this.accel * accMult, dt);
        } else {

          // going too fast, need to decelerate
          this.speed = this.doaccelerate(this.speed, this.decel, dt);
          if(this.speed < maxSpeed * mult) {
            this.speed = maxSpeed * mult;
          }
        }
      } else if(this.brake) {
        this.speed = this.doaccelerate(this.speed, this.breaking, dt);
      } else {
        // not accelerating or breaking, so just decelerate
        this.speed = this.doaccelerate(this.speed, this.decel, dt);
      }


      // check for collisions with roadside objects
      for(var n = 0 ; n < playerSegment.sprites.length ; n++) {
        var sprite  = playerSegment.sprites[n];
        var spriteW = sprite.s * sprite.source.cw;
        var spriteX = sprite.x + sprite.source.cx * sprite.s;
        // check for collision will roadside object, same segment and rects overlap
        var carX = this.x;
        if (this.overlap(carX, 
          this.width, 
          spriteX, 
          spriteW, 1)) {

          if(this.index == 0) {
            raceAudioCrash();
            this.slipstream = 0;
            this.slipstreamTime = 0;
          }
          this.speed = maxSpeed/5;
          this.z = utilIncrease(playerSegment.p1.world.z, 0, track.getLength()); // stop in front of sprite (at front of segment)
          break;
        }
      }
      
      var isBehind = false;
      for(var i = 0; i < cars.length; i++) {
        var distance = cars[i].z - player.z;
        if(player.z > track.getLength() - 1200) {
          distance -= track.getLength();
        }

        if(distance > 0 && distance < 1800) {
          var offCentre =  (player.x - cars[i].x) / cars[i].width;
          if(offCentre < 0) {
            offCentre = - offCentre;
          }
          if(offCentre < 0.4) {
            isBehind = true;
          }
        }
      }

      if(isBehind && this.speed > 8000) {
        this.slipstream += dt * 1;
        if(this.slipstream > 0.14) {
          this.slipstreamTime = 2;
        }
      } else {
        this.slipstream = 0;
      }

      if(this.slipstreamTime > 0) {
        this.slipstreamTime -= dt;
      }      

    } else {
      if(this.speed < maxSpeed) {
        this.speed = this.doaccelerate(this.speed, this.accel, dt);
      }

      var turnDir = this.updateCarPosition(currentSegment, playerSegment, player.width);
      var newX  = this.x + turnDir * dx;

      if(currentSegment.curve == 0) {
        this.turnLeft = turnDir == -1;
        this.turnRight = turnDir == 1;
      } else {
        this.turnLeft = currentSegment.curve < -0.5;
        this.turnRight = currentSegment.curve > 0.5;
      }
        

      if(newX + this.width < trackRight * 0.6 && newX > trackLeft * 0.8) {
        this.x = newX;
      }
      this.z = utilIncrease(this.z, dt * this.speed, track.getLength());      
    }

    this.percent = utilPercentRemaining(this.z, Track.segmentLength); // useful for interpolation during rendering phase
    var newSegment  = track.findSegment(this.z);


    // check collisions with other cars
    // check other cars

    if(this.index === 0) {
      for(n = 0 ; n < newSegment.cars.length ; n++) {
        var car  = newSegment.cars[n];

        if(car.index != this.index) {
          if (this.speed > car.speed) {
            // check for collision with other car, same segment and rects overlap
            if (this.overlap(this.x, this.width,
              car.x, car.width, 1)) {
              if(this.index !== 0) {
                this.speed = car.speed / 2;
                if(car.index !== 0) {
                  car.speed = car.speed * 1.2;
                }
              } else {
                if(this.index == 0) {
                  raceAudioCrash();
                  this.slipstream = 0;
                  this.slipstreamTime = 0;
      
                }
      
                this.speed = car.speed ;
                this.z = car.z - 100;
              }
              break;
            }
          }
        }
      }
    }


    // limit how far offroad a car can go
    if(this.x + this.width / 2 < trackLeft - 1.2 * this.width) {
      this.x = trackLeft - 1.2 * this.width - this.width / 2;
    }

    if(this.x + this.width / 2 > trackRight + 1.2 * this.width) {
      this.x = trackRight + 1.2 * this.width - this.width / 2;
    }
    

    // limit the speed to max speed
    this.speed   = this.limit(this.speed, 0, maxSpeed); // or exceed maxSpeed



    if(this.index == 0) {
      raceAudioEngineSpeed(this.speedPercent);
    }


    if (currentSegment != newSegment) {
      var index = currentSegment.cars.indexOf(this);
      currentSegment.cars.splice(index, 1);
      newSegment.cars.push(this);
    }


    // next lap?
    if(this.z < Track.segmentLength * 1.2 && !this.lapStarted) {    
      this.lap++;
      this.lapStarted = true;
      this.lastLapTime    = this.currentLapTime;

      if(this.lap == 2 && this.index == 0) {//!== 1 && this.lap !== 3) {
        speak("lap time " + this.getCurrentLapTime().toFixed(2));

      }
      this.currentLapTime = 0;
    } else {
      if(this.z > Track.segmentLength * 1.2) {
        this.lapStarted = false;
      }
      this.currentLapTime += dt;
    }

    // work out position, position relies on current lap
    var currentPosition = this.position;
    this.position = 1;
    for(var i = 0; i < cars.length; i++) {
      if(i != this.index) {
        if(cars[i].lap > this.lap) {
          this.position++;
        } else if(cars[i].lap === this.lap) {
          if(cars[i].z > this.z) {
            this.position++;
          }
        }
      }
    }

    if(this.index == 0) {
      if(this.newPositionTime > 0) {
        this.newPositionTime -= dt;        
      }
      if(this.position !== currentPosition) {
        // new position!
        this.newPosition = this.getPosition();
        this.newPositionTime = 1;
      }
    }



    if(this.index === 0 && this.lap === 3 && race.state != STATE_RACEOVER) {
      // race over!!!
      this.finishPosition = this.getPosition();
      speak("Race. Over.")
      speak(this.finishPosition + " Place");

      this.turbo = false;
      this.slipstream = 0;
      this.slipstreamTime = 0;

      race.raceOver();
    } 




  },

  /*
  workOutPosition: function() {
    // work out position
    this.position = 0;
    for(var i = 0; i < cars.length; i++) {
      if(cars[i].lap > this.lap) {
        this.position++;
      } else if(cars[i].lap === this.lap) {
        if(cars[i].z > this.z) {
          this.position++;
        }
      }
    }
  },
  */

  updateCarPosition: function(carSegment, playerSegment, playerWidth) {
    var lookAhead = 60;

    var segment = null;

    var trackSegments = track.getSegmentCount();


    for(var i = 1; i < lookAhead; i++) {
      segment = track.getSegment( (carSegment.index+i) % trackSegments );
      var trackLeft = segment.p1.world.x;
      var trackRight = segment.p2.world.x;
      var dir = 0;

      // avoid other cars less than 8 segments ahead
      if(i < 8) {


        /*
        if ((segment === playerSegment) 
        && (this.speed > player.speed) 
        && (this.overlap(otherCarLeft, otherCarWidth, this.x, this.width, 1.2))) {
        */
        for(n = 0 ; n < segment.cars.length ; n++) {
          var otherCar = segment.cars[n];

          var otherCarLeft = otherCar.x;
          var otherCarWidth = otherCar.width;
          var otherCarRight = otherCar.x + otherCar.width;
  

          if(trackRight - otherCarRight < this.width * 1.4) {
            // can't fit on the right
            dir = -1;
          } else if( otherCarLeft - trackLeft < this.width * 1.4) {
            dir = 1;
          } else {
            if(otherCarLeft - trackLeft > trackRight - otherCarRight) {
              dir = -1;
            } else {
              dir = 1;
            }
//            dir = (this.x > otherCarLeft) ? 1 : -1;
          }

          return dir * 3/i ;//* (this.speed-player.speed)/maxSpeed;
        }

      }
    }

    if(this.takeCornerOnInside) {

      for(var i = 1; i < lookAhead; i++) {
        segment = track.getSegment( (carSegment.index+i) % trackSegments );
        var trackLeft = segment.p1.world.x;
        var trackRight = segment.p2.world.x;
    
        if(segment.curve > 0) {
          // move to the right
          if(i < 5) {
            return 1 / (5);
          }
          return 2 / i;
        }

        if(segment.curve < 0) {
          // move to the left
          if(i < 5) {
            return -1/ (5);
          } 
          return 2 / i;
        }

      }
    }

    return 0;
  }
}