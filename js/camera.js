var Camera = function() {
  this.fieldOfView = 100;

  this.y = 0;
  this.z = 0;
  this.drawDistance = 300;  
  this.depth = 0;           
  this.fogDensity =  25;
  this.zOffset = 0;         
  this.yOffset = 740;
  this.zOffset = 700;


}

Camera.prototype = {
  reset: function() {
    this.depth            = 1 / Math.tan( ( this.fieldOfView / 2 ) * Math.PI/180);
    this.yOffset = 740;
    this.zOffset = 700;
  
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
  
  },


  update: function(dt) {
    this.z = cars[0].z - this.zOffset;
    if(this.z < 0) {
      this.z += track.getLength();
    }

    camera.x = cars[0].x + cars[0].width/2;


    var playerSegment = track.findSegment(cars[0].z);
    var playerPercent = utilPercentRemaining(cars[0].z, Track.segmentLength);
    

    this.y = this.yOffset + utilInterpolate(playerSegment.p1.world.y, 
      playerSegment.p3.world.y, 
      playerPercent);

  }
}