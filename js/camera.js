var Camera = function() {
  /*
  var fieldOfView    = 100;                     // angle (degrees) for field of view
  var cameraHeight   = 1000;                    // z height of camera
  var cameraDepth    = null;                    // z distance camera is from screen (computed)
  var drawDistance   = 300;                     // number of segments to draw
var fogDensity     = 5;                       // exponential fog density

  */
  this.fieldOfView = 100;
//  this.y = 800;//1000; //   camera height   // const  ??

  this.y = 0;
  this.z = 0;
  this.drawDistance = 300;   // const??
  this.depth = 0;            // z distance camera is from screen (computed)
  this.fogDensity =  25;
  this.zOffset = 0;          // offset from the back of the player
  this.yOffset = 740;//800;
  this.zOffset = 700;//750;


}

Camera.prototype = {
  reset: function() {
    this.depth            = 1 / Math.tan( ( this.fieldOfView / 2 ) * Math.PI/180);
    this.yOffset = 740;//800;
    this.zOffset = 700;//750;
  
  },

// segment 3081
  project: function(p, cameraXOffset, looped, width, height) {
    var cameraZ = this.z;
    if(looped) {
      cameraZ -= track.getLength();
    }
    var cameraX = this.x + cameraXOffset;

    p.camera.x     = (p.world.x || 0) - cameraX;
    p.camera.y     = (p.world.y || 0) - this.y;
    p.camera.z     = (p.world.z || 0) - cameraZ;//this.z;
    p.screen.scale = this.depth / p.camera.z;

    p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
    p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
//    p.screen.w     = Math.round(             (p.screen.scale * roadWidth   * width/2));
  
  },

//|..x.....|

  update: function(dt) {

    // why does zOffset depend on y and depth? to lock car to bottom of screen?
//    this.zOffset = (this.y * this.depth) + 80;
//    this.zOffset = 680;//750;
    this.z = cars[0].z - this.zOffset;
    if(this.z < 0) {
      this.z += track.getLength();
    }

    camera.x = cars[0].x + cars[0].width/2;// * laneWidth;


    var playerSegment = track.findSegment(cars[0].z);
    var playerPercent = utilPercentRemaining(cars[0].z, Track.segmentLength);
    

    this.y = this.yOffset + utilInterpolate(playerSegment.p1.world.y, 
      playerSegment.p3.world.y, 
      playerPercent);

  }
}