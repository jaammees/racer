// draw all the race stuff to the screen                 
var width  = 1024;
var height  = 768;
var resolution = height/480;

var bgLayer3Speed       = 0.001;                
var bgLayer2Speed      = 0.002;              
var bgLayer1Speed      = 0.003;              


var bgLayer3Offset      = 0;  
var bgLayer2Offset     = 0;   
var bgLayer1Offset     = 0;   
var outlineOnly = false;
var lastDriftDraw = 0;

// draw a polygon
function renderPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color) {
  var ctx = context;
  cntxFillStyle(color);
  cntxBeginPath();
  cntxMoveTo(x1, y1);
  cntxLineTo(x2, y2);
  cntxLineTo(x3, y3);
  cntxLineTo(x4, y4);
  cntxClosePath();
  if(outlineOnly) {
    cntxStrokeStyle(MEDIUMGREY);
    cntxStroke();
  } else {
    cntxFill();
  }
}

  // draw a segment, coordinates passed in are screen coordinates
  function renderSegment(segment) {
    var lanew1, lanew2, lanex1, lanex2, lane;
    var dark = Math.floor(segment.index/2) % 2;// (segment.index / 2) % 2;

    var kerbColor = COLORS_KERBLIGHT;
    var landColor = COLORS_LANDLIGHT;
    if(dark) {
      kerbColor = COLORS_KERBDARK;
      landColor = COLORS_LANDDARK;
    }

    // draw side land
    if(!outlineOnly) {
      cntxFillStyle(landColor);
      cntxFillRect(0, segment.p3.screen.y, width, segment.p1.screen.y - segment.p3.screen.y);
    }

    // draw kerb
    var r1 = segment.kerbWidth * segment.p1.screen.scale * width / 2;
    var r2 = segment.kerbWidth * segment.p4.screen.scale * width / 2;
    renderPolygon(
                    segment.p1.screen.x - r1, 
                    segment.p1.screen.y, 
                    segment.p1.screen.x, 
                    segment.p1.screen.y, 
                    segment.p4.screen.x, 
                    segment.p4.screen.y, 
                    segment.p4.screen.x - r2, 
                    segment.p4.screen.y, 
                    kerbColor);

    renderPolygon(
      segment.p2.screen.x, 
      segment.p2.screen.y, 
      segment.p2.screen.x + r1, 
      segment.p2.screen.y, 
      segment.p3.screen.x + r2, 
      segment.p3.screen.y, 
      segment.p3.screen.x, 
      segment.p3.screen.y, 
      kerbColor);
  
    // road 
    if(!outlineOnly) {
      var colour = COLORS_ROAD;
      if(segment.index == 0) {
        colour = MEDIUMGREY;
      }
      renderPolygon(
                    segment.p1.screen.x,    
                    segment.p1.screen.y, 
                    segment.p2.screen.x, 
                    segment.p2.screen.y, 
                    segment.p3.screen.x, 
                    segment.p3.screen.y, 
                    segment.p4.screen.x,    
                    segment.p4.screen.y, 
                    colour);
    }


    var l1 = 50 * segment.p1.screen.scale * width / 2;
    var l2 = 50 * segment.p4.screen.scale * width / 2;


    // lines on side of road
    lanex1 = segment.p1.screen.x + 100 * segment.p1.screen.scale * width / 2;
    lanex2 = segment.p4.screen.x + 100 * segment.p4.screen.scale * width / 2;

    renderPolygon(
        lanex1 - l1/2, 
        segment.p1.screen.y, 
        lanex1 + l1/2, 
        segment.p1.screen.y, 
        lanex2 + l2/2, 
        segment.p3.screen.y, 
        lanex2 - l2/2, 
        segment.p3.screen.y, 
        COLORS_LANEMARKER);

    lanex1 = segment.p2.screen.x - 100 * segment.p1.screen.scale * width / 2;
    lanex2 = segment.p3.screen.x - 100 * segment.p4.screen.scale * width / 2;

    renderPolygon(
        lanex1 - l1/2, 
        segment.p1.screen.y, 
        lanex1 + l1/2, 
        segment.p1.screen.y, 
        lanex2 + l2/2, 
        segment.p3.screen.y, 
        lanex2 - l2/2, 
        segment.p3.screen.y, 
        COLORS_LANEMARKER );
      
    lanes = 2;
    // lane marker
    if (dark) { //segment.color.laneMarker) {
      lanew1 = (segment.p2.screen.x - segment.p1.screen.x) / lanes;
      lanew2 = (segment.p3.screen.x - segment.p4.screen.x) / lanes;
      lanex1 = segment.p1.screen.x + lanew1;
      lanex2 = segment.p4.screen.x + lanew2;
      for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++) {
        renderPolygon(
          lanex1 - l1/2, 
          segment.p1.screen.y, 
          lanex1 + l1/2, 
          segment.p1.screen.y, 
          lanex2 + l2/2, 
          segment.p3.screen.y, 
          lanex2 - l2/2, 
          segment.p3.screen.y, 
          COLORS_LANEMARKER);
      }
    }

    if(COLORS_FOG != 0) {
      renderFog(0, segment.p1.screen.y, width, segment.p3.screen.y-segment.p1.screen.y, segment.fog);
    }
  }

  //---------------------------------------------------------------------------

  function renderBackground( background, width, height, rotation, offset) {

//    return;

    
    rotation = rotation || 0;
    offset   = offset   || 0;

    var imageW = BACKGROUNDLAYERWIDTH/2;
    var imageH = BACKGROUNDLAYERHEIGHT;

    var sourceX = Math.floor(BACKGROUNDLAYERWIDTH * rotation);
    var sourceY = 0;
    var sourceW = Math.min(imageW, BACKGROUNDLAYERWIDTH-sourceX);
    var sourceH = imageH;
    
    var destX = 0;
    var destY = offset;
    var destW = Math.floor(width * (sourceW/imageW));
    var destH = height;

    context.drawImage(background.c, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
      context.drawImage(background.c, 0, sourceY, imageW-sourceW, sourceH, destW-1, destY, width-destW, destH);
  }

  //---------------------------------------------------------------------------

  function renderSprite(sprite, scale, destX, destY, clipY, fog) {

    var destW  = (sprite.w * scale * width/2) ;
    var destH  = (sprite.h * scale * width/2);


//    destX = destX + (destW * (offsetX || 0));
    destY = destY - destH;// + (destH * (offsetY || 0));


    // clip y for appearing behind a hill..
    var clipH = clipY ? Math.max(0, destY+destH-clipY) : 0;
    if (clipH < destH) {

      context.drawImage(spritesCanvas, 
        sprite.x, 
        sprite.y, 
        sprite.w, 
        sprite.h - (sprite.h*clipH/destH), 
        destX, 
        destY, 
        destW, 
        destH - clipH);

      if(fog !== false && COLORS_FOG != 0) {
        renderFog(destX, destY, destW, destH, fog);//ctx, x, y, width, height, fog) {
      }
    }

  }

  //---------------------------------------------------------------------------
  function renderExponentialFog(distance, density) { 
    return 1 / (Math.pow(Math.E, (distance * distance * density))); 
  }

  function renderPlayer(scale, destX, destY, steer, updown, playerShadowY) {

    var sprite;
    if(steer < 0) {
      sprite = SPRITES_CARLEFT;
    } else if(steer > 0) {
      sprite = SPRITES_CARRIGHT;
    } else {
      sprite = SPRITES_CARSTRAIGHT;
    }

    var spriteScale = player.width * scale / sprite.w;

    var i,j;


    // ************* DRAW SLIP STREAM ********** //
    if(player.slipstreamTime > 0 || player.slipstream > 0) {

      cars[0].initSlipstreamLines();

      var amount = 0;
      if(player.slipstreamTime <= 0) {
        amount = player.slipstream ;
        while(amount > 1) {
          amount -= 1;
        }        
      }
      cntxGlobalAlpha(1 - amount);

      for(i = 0; i < cars[0].slipstreamLines.length; i++) {
        var points = cars[0].slipstreamLines[i];
        cntxBeginPath();
        cntxMoveTo(points[0].screen.x, points[0].screen.y);
        for(j = 1; j < points.length; j++) {
          cntxLineTo(points[j].screen.x, points[j].screen.y);
        }

        cntxFillStyle(MEDIUMGREY);
        cntxFill();

      }
      cntxGlobalAlpha(1);
    }


    // ***** DRAW SHADOW IF IN AIR *******/
/*
    if(playerShadowY != destY) {
      cntxGlobalAlpha(0.4);
        var destW  = (sprite.w * spriteScale * width/2) ;
        renderPolygon(destX, playerShadowY,
          destX + destW, playerShadowY,
          destX + 0.7 * destW, playerShadowY - 180,
          destX + 0.3 * destW, playerShadowY - 180,
          
          DARKGREY);
      cntxGlobalAlpha(1);      
    }
    */
    // ***** DRAW CAR SPRITE ****** /

    
    renderSprite(
      sprite, 
      spriteScale, 
      destX, 
      destY + player.bounce, 
      false);
      

    // ************** DRAW DRIFT *************** //
    if( player.driftAmount > 0) {
      var time = getTimestamp();
      if(time - lastDriftDraw > 100) {

        cntxGlobalAlpha(0.8);
        cntxFillStyle(MEDIUMGREY);
        var x = destX + 12;
        var y = destY - 4;
        cntxFillRect(x, y, 50, 10)

        x = destX + 260;
        cntxFillRect(x, y, 50, 10)

        cntxGlobalAlpha(1);
        lastDriftDraw = time;
      }
    }

    //  ******  DRAW TURBO  ***** /
    if(player.turbo) {
      var centreX = destX + 82;
      var centreY = destY - 10;
      drawFuzzyCircle(centreX, centreY, 10,'#dd9925' );
      drawFuzzyCircle(centreX, centreY, 5,'#cccc55');
      centreX = destX + 230;
      drawFuzzyCircle(centreX, centreY, 10,'#dd9925' );
      drawFuzzyCircle(centreX, centreY, 5,'#cccc55');
    }    
  }


  function renderFog(x, y, width, height, fog) {
    if (fog < 1) {
      cntxGlobalAlpha(1-fog)
      cntxFillStyle(COLORS_FOG);
      cntxFillRect(x, y, width, height);
      cntxGlobalAlpha(1);
    }
  }


  function renderRender() {
    cntx = context;
    

    var baseSegment   = track.findSegment(camera.z);
  
    var basePercent   = utilPercentRemaining(camera.z, Track.segmentLength);
    var playerSegment = track.findSegment(player.z);
    var playerPercent = utilPercentRemaining(player.z, Track.segmentLength);
    var playerY       = utilInterpolate(playerSegment.p1.world.y, playerSegment.p3.world.y, playerPercent);
    var maxy          = height;
    var x  = 0;
    var dx = - (baseSegment.curve * basePercent);
  //  context.clearRect(0, 0, width, height);
  
    context.fillStyle = '#4576aa';
    cntxFillRect(0, 0, width, height);
  
  
    // render background hills, sky, trees
    renderBackground(backgroundLayer3, width, height, bgLayer3Offset,  resolution * bgLayer3Speed  * playerY);
    renderBackground(backgroundLayer2, width, height, bgLayer2Offset, resolution * bgLayer2Speed * playerY);
    renderBackground(backgroundLayer1, width, height, bgLayer1Offset, resolution * bgLayer1Speed * playerY);
  
  
    /*
      front to back to render the road
      back to front to render the sprites
    */
  
  
    // render segments from to back
    var n, i, segment, car, sprite, spriteScale, spriteX, spriteY;
    for(n = 0 ; n < camera.drawDistance ; n++) {
  
  //    segment        = segments[(baseSegment.index + n) % segments.length];
  
      segment = track.getSegment((baseSegment.index + n) % track.getSegmentCount() );
      segment.looped = segment.index < baseSegment.index;
  
      segment.fog    = renderExponentialFog(n/camera.drawDistance, camera.fogDensity);
      segment.clip   = maxy;
  
      camera.project(segment.p1,  - x,      segment.looped, width, height);
      camera.project(segment.p2,  - x,      segment.looped, width, height);
      camera.project(segment.p3,  - x - dx, segment.looped,  width, height);
      camera.project(segment.p4,  - x - dx, segment.looped,  width, height);
  
      // do fake curved road
      x  = x + dx;
      dx = dx + segment.curve;
  
      // cull segments if behind, facing other way or clipped
      if ((segment.p1.camera.z <= camera.depth)         || 
          (segment.p3.screen.y >= segment.p1.screen.y) || 
          (segment.p3.screen.y >= maxy))                  
        continue;
  

      renderSegment(segment);
      maxy = segment.p1.screen.y;
    }
  
    // draw opponent cars from furthest to closest
    // opponents still in view but closer than the player to the camera should be drawn after the player..
    for(n = (camera.drawDistance-1) ; n > 0 ; n--) {
      segment = track.getSegment((baseSegment.index + n) % track.getSegmentCount());
  
      // draw cars in the segment
      for(i = 0 ; i < segment.cars.length ; i++) {
        car         = segment.cars[i];
        
        if(car.index !== 0) {
          sprite      = car.sprite;
          var scale = utilInterpolate(segment.p1.screen.scale, segment.p3.screen.scale, car.percent);
  
          spriteX     = utilInterpolate(
            (segment.p1.screen.x + segment.p2.screen.x) / 2,     
            (segment.p3.screen.x + segment.p4.screen.x) / 2,     
            car.percent) 
            + (scale * car.x * width/2);
  
          spriteY     = utilInterpolate(segment.p1.screen.y,     segment.p4.screen.y,     car.percent);
  

          var sprite = SPRITES_CARSTRAIGHT;
          spriteScale = car.width * scale / sprite.w;

          if(car.turnLeft) {
            sprite = SPRITES_CARLEFT;
          } else if(car.turnRight) {
            sprite = SPRITES_CARRIGHT;
          } 
      
  
          renderSprite(
            sprite, 
            spriteScale, 
            spriteX, 
            spriteY, 
            segment.clip,
            segment.fog);
        }
      }
  
      // roadside objects
      for(i = 0 ; i < segment.sprites.length ; i++) {
        sprite      = segment.sprites[i];
        spriteScale = segment.p1.screen.scale;

        spriteX = segment.p1.screen.x - segment.p1.world.x * segment.p1.screen.scale * width / 2
                  + spriteScale * sprite.x * width / 2;


        spriteY     = segment.p1.screen.y;
  /*
        sprite.source.x = 0;
        sprite.source.y = 0;
        sprite.source.w = 200;
        sprite.source.h = 210;
  */
        spriteScale = sprite.s  * spriteScale;//* 800 / sprite.source.w;
  

        
        renderSprite(
          sprite.source, 
          spriteScale, 
          spriteX, 
          spriteY, 
          segment.clip,
          false);
          


//-------- COLLISION DISPLAY ----------- //
var destW  = (sprite.source.w * spriteScale * width/2) ;

var offsetX = -0;//.5;
var destX = spriteX + (destW * (offsetX || 0));

spriteScale = segment.p1.screen.scale;        
spriteScale = sprite.s * spriteScale;//800 * spriteScale / sprite.source.w;

var collisionx = (sprite.source.cx ) * spriteScale * width / 2;
var collisionw = sprite.source.cw * spriteScale * width / 2;
spriteX = destX + collisionx;// + collisionx * spriteScale * width / 2;// + spriteScale * collisionx * width / 2;

//context.fillStyle = '#ff0000';
//context.fillRect(spriteX, spriteY - 10, collisionw, 10);              
//-------- COLLISION DISPLAY END ----------- //

    }
  
      if (segment == playerSegment) {
        var playerScreenY = utilInterpolate(playerSegment.p1.screen.y, playerSegment.p3.screen.y, playerPercent);
        
  
        playerScreenY = (height / 2) 
            - (camera.depth / camera.zOffset * utilInterpolate(playerSegment.p1.camera.y, 
            playerSegment.p3.camera.y, playerPercent) * height/2);

        var playerShadowY = playerScreenY;
  
        if(cars[0].yOffset > 0) {
          playerScreenY -= cars[0].yOffset * camera.depth / camera.zOffset * height / 2;
        }

            
        var carX = width / 2;
        var scale = utilInterpolate(playerSegment.p1.screen.scale, playerSegment.p3.screen.scale, playerPercent);
  
  
          spriteX     = utilInterpolate(
            (playerSegment.p1.screen.x + playerSegment.p2.screen.x) / 2,     
            (playerSegment.p3.screen.x + playerSegment.p4.screen.x) / 2,     
            playerPercent) 
            + (scale * cars[0].x * width/2);


        var p = {
          world: {
            x: player.x,
            y: player.y,
            z: player.z
          },
          camera: {},
          screen: {}

        };

        camera.project(p, 0, playerSegment.index < baseSegment.index, width, height);
  
        carX = p.screen.x;
        var playerDirection = 0;
        if(player.speed > 0) {
          if(player.driftDirection != 0) {
            playerDirection = player.driftDirection;
          } else {
            playerDirection = (player.turnLeft ? -1 : player.turnRight ? 1 : 0);
          }
        }

        renderPlayer( 
                      camera.depth / camera.zOffset,  // scale
                      carX,//width/2,   // destx
                      playerScreenY,
                      playerDirection,
                      playerSegment.p3.world.y - playerSegment.p1.world.y,
                      playerShadowY);
        if(race.state == STATE_RACING) {
          context.drawImage(track.overheadMap, -40, 200, 400, 400);
        }
  
      }
    }
  }


