



var q6 = ' "Helvetica Neue", Helvetica, Arial, sans-serif';

var c6=0;


var cntx = null;


function j7(width, height) {
  cntx.clearRect(0, 0, width, height);
}

function g1(alpha) {
  cntx.globalAlpha = alpha;
}
function m0(x, y, width, height) {
  cntx.fillRect(x, y, width, height);
}
  
function a6(x0, y0, x1, y1) {
  return cntx.createLinearGradient(x0, y0, x1, y1);
}

function g0(s) {
  cntx.strokeStyle = s;
}

function p2() {
  cntx.stroke();
}

function k4(s) {
  cntx.fillStyle = s;
}

function k3() {
  cntx.beginPath();
}

function p0(x, y) {
  cntx.moveTo(x, y);
}

function t4(x,y,r,sAngle,eAngle,counterclockwise) {
  cntx.arc(x,y,r,sAngle,eAngle,counterclockwise);
}

function o8(x, y) {
  cntx.lineTo(x, y);
}
function k0() {
  cntx.closePath();
}

function s9() {
  cntx.fill();
}

function k9(t,x,y) {
  cntx.fillText(t,x,y);

}

function s3() {
  cntx.save();
}

function n0() {
  cntx.restore();
}

function j4(x, y) {
  cntx.translate(x, y);
}

function p9(a) {
  cntx.rotate(a);
}

function i5(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
  cntx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}


// hopefully  versions of math functions which take less bytes
var M = Math;
var PI = Math.PI;

function r9() {
  return M.random();
}
function m8(limit) {
  return M.floor(r9() * limit);
}

function sin(angle) {
  return M.sin(angle);
}

function cos(angle) {
  return M.cos(angle);
}


// generate graphics used in the game

// constants
var l1 = 600, 
    k6 = 600,
    l6 = 2400,
    k5 = 2400,
    b4 = 1280,
    a9 = 480,
    c2 = 600,
    b9 = 600,
    j9 = l9(l1, k6),
    t1 = l9(l6, k5)
    j8 = t1.c,
    h0 = t1.x,
    e3 = l9(b4, a9),
    e2 = l9(b4, a9),
    e1 = l9(b4, a9),
    j1 = l9(c2, b9),
    a7=a5=f1=d3=b7=d8=d0=e8=0,
    c8=[],q1=0;

var r4 = '#222222';
var q2 = '#cccccc';
var q7 = '#e5e5e5';

function m3() {
  j9.x.clearRect(0,0,l1,k6);
}
function l9(width, height) {
  var c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  var x = c.getContext('2d');
  
  return { c: c, x: x };
}

var p3 = 0;
var p4 = 0;
var c1 = 0;

function j2() {
  p3 = 0;
  p4 = 0;
  c1 = 0;

  h0.clearRect(0, 0, l6, k5);

  e1.x.clearRect(0, 0, b4, a9);  
  e2.x.clearRect(0, 0, b4, a9);  
  e3.x.clearRect(0, 0, b4, a9);  
}



function e6(x, y, r, c) {
  
  var angle = 0;

  k4(c);
  var radius = r + r * r9();
  k3();
  p0(x + (radius) * cos(angle), y + (radius) * sin(angle));
  for(var i = 1; i < 30; i++) {
    angle = i * PI * 2 / 30;
    radius = r + r * r9();
    o8(x + (radius) * cos(angle), y + (radius) * sin(angle));
  }
  k0();
  s9();

}
function a8() {
  // get the bounds
  var data = j9.x.getImageData(0, 0, j9.c.width, j9.c.height);      // get image data for canvas
  var buffer32 = new Uint32Array(data.data.buffer); // get a 32-bit representation
  var testX, testY;                                      // iterators
  
  var w = j9.c.width;
  var h = j9.c.height;
  var x1 = w, y1 = h, x2 = 0, y2 = 0;            // min/max values  
// get left edge

  for(testY = 0; testY < h; testY++) {                       // line by line
    for(testX = 0; testX < w; testX++) {                   // 0 to width
      if (buffer32[testX + testY * w] > 0) {         // non-transparent pixel?
        if(testX < x1) {
          x1 = testX;
        }
        if(testX > x2) {
          x2 = testX;
        }
        if(testY < y1) {
          y1 = testY;
        }
        if(testY > y2) {
          y2 = testY;
        }
      }
    }
  } 

  // work out collision box for bottom 100 pixels.
  var collisionYStart = y2 - 50;
  if(collisionYStart < 0) {
    collisionYStart = 0;
  }
  var cx1 = w;
  var cx2 = 0;
  for(testY = collisionYStart; testY < y2; testY++) {
    for(testX = 0; testX < w; testX++) {
      if (buffer32[testX + testY * w] > 0) {         // non-transparent pixel?
        if(testX < cx1) {
          cx1 = testX;
        }
        if(testX > cx2) {
          cx2 = testX;
        }
      }

    }
  }

  return {
    x: x1,
    y: y1,
    w: x2 - x1,
    h: y2 - y1,
    cx: cx1 - x1,
    cw: cx2 - cx1
  }
}
// create a sprite from the scratch canvas, put into new t1
function q3(flipH) {
  var fh = flipH || 0;

  // get the bounds
  var bounds = a8();

  if(p3 + bounds.w > l6) {
    // need to go to next line
    p3 = 0;
    p4 += c1;
    c1 = 0;
  }
  if(bounds.h > c1) {
    c1 = bounds.h;
  }

  h0.save();
  var dstX = p3;

  if(fh) {
    h0.scale(-1, 1);
    dstX = -p3 - bounds.w;
    bounds.cx = bounds.w - bounds.cx - bounds.cw;
  } 

  h0.drawImage(j9.c, bounds.x, bounds.y, bounds.w, bounds.h,
    dstX, p4, bounds.w, bounds.h);
  h0.restore();

  var result = {
    x: p3, y: p4, w: bounds.w, h: bounds.h, cx: bounds.cx, cw: bounds.cw
  }
  p3 += bounds.w + 5;
  return result;
}


// ***************** TURN ARROWS ******************** //
function e5() {
  cntx = j9.x;
  m3();

  k4('#996644');
  m0(0, 0, 200, 200);

  k4('#996644');
  m0(10, 200, 10, 10);

  k4('#996644');
  m0(180, 200, 10, 10);

  k4(q2);
  m0(10, 10, 180, 180);
  k3();
  p0(20, 100);
  o8(160, 30);
  o8(160, 170);
  o8(20, 100);
  k4('#cc2211');
  s9();

  k4(q2);
  m0(10, 10, 20, 180);

  d8 = q3();
  d0 = q3(1);
}


// ***************** BACKGROUND TREES ******************** //

function q5(width, slope) {
  var points = [];
  var y = 0;
  var index = 0;
  points[index++] = 0;
  var multiplier = 1;
  for(var i = 0; i < width; i++) {
    y = y + r9() * slope;
    points[index++] = y;
  }

  while(y > 0) {
    y = y - r9() * slope;
    points[index++] = y;
  }

  return points;
}


function b1() {
  cntx = e1.x;

  // draw the points
  var colours = [
    '#114433',
    '#114e33',
    '#115433',
    '#113433',
    '#114433',
  ];

  var sx = 0;

  for(var j = 0; j < 4; j++) {
    var x = sx;
    var width = 10 + 40 * r9();

    for(var i =0 ; i < width; i++) {
    // get the points

    var terPoints = q5(8, 7);
      //var terPoints = t5(width, height, height / 2, 0.6);
      var colour = m8(colours.length);
      k4(colours[colour]);
      k3();
      p0(x, 240 - terPoints[0]);
      for (var t = 1; t < terPoints.length; t++) {
        o8(x + t, 240 - terPoints[t]);
      }
      // finish creating the rect so we can fill it
      k0();
      s9();

      x += 2 +  r9() * 4;
    }

    var colours = [
      '#226639',
      '#115e33',
      '#316433',
      '#215433',
      '#114433',

    ];

    var x = sx;
    for(var i =0 ; i < width; i++) {
    // get the points

    var terPoints = q5(4, 4);
      //var terPoints = t5(width, height, height / 2, 0.6);
      var colour = m8(colours.length);
      k4(colours[colour]);
      k3();
      p0(x, 240 - terPoints[0]);
      for (var t = 1; t < terPoints.length; t++) {
        o8(x + t, 240 - terPoints[t]);
      }
      k0();
      s9();
      x += 2 +  r9() * 5;
    }


    sx = x + 50 + r9() * 180;
  }
}



// **** BACKGROUND MOUNTAIN RANGE ******** //
function t5(startX) {//}, width, height, displace, roughness) {
  cntx = e2.x;
  
  var points = [];
  var highlightpoints = [];
  var highlightpoints2 = [];
  var highlightBackpoints2 = [];
  var y = 0;
  var index = 0;

  var multiplier = 1;


  multiplier = 0.1 + 3 * r9();
  var across = 20 * 100 * r9();
  for(var i = 0; i < 100; i++) {
    y = y + r9() * multiplier;
    points[index] = y;
    highlightpoints[index] = y;
    index++;
    multiplier += 0.01;
  }

  var across = 5 + 8 * r9();
  for(var i = 0; i < across; i++) {
    y = y + ( 0.4 - r9() ) * 2;
    highlightpoints[index] = y;
    points[index++] = y;
  }


  var highlightBackpoints = [];
  var highlightY = y;
  while(highlightY > 0) {
    highlightY -= r9() * 5;
    highlightBackpoints.push(highlightY);
  }

  if(r9() > 0.6) {
    across = 160 * r9();
  } else {
    across = 20 * r9();
  }
  for(var i = 0; i < across; i++) {
    y = y + ( 0.4 - r9() ) * 2;
    points[index++] = y;
  }

//  multiplier = 1;
//  for(var i = 0; i < 100; i++) {
  while(y > 0) {
    y = y - r9() * multiplier;
    points[index++] = y;
    multiplier -= 0.003;
    if(multiplier < 0) {
      multiplier = 0.03;
    }
  }

  for(var i = 0; i < highlightpoints.length - 20; i++) {
    highlightY = highlightpoints[i] + r9();
    highlightpoints2.push(highlightY);
  }


  for(var i = 0; i < highlightpoints2.length - 10; i++) {
    highlightY -= r9() * 2;
    highlightBackpoints2.push(highlightY);
  }

  var heightOffset = 260;

  var x = startX;
  k4('#114433');
  k3();
  p0(x, heightOffset - points[0]);
  for (var t = 1; t < points.length; t++) {
    o8(x + t, heightOffset - points[t]);
  }
  k0();
  s9();


  x = startX;
  k4('#224a33');
  k3();
  p0(x, heightOffset - highlightpoints[0]);
  for (var t = 1; t < highlightpoints.length; t++) {
    o8(x, heightOffset - highlightpoints[t]);
    x++;
  }

  for (var t = 1; t < highlightBackpoints.length; t++) {
    o8(x, heightOffset - highlightBackpoints[t]);

    if(r9() > 0.4) {
      x--;
    } else if(r9() > 0.4) {
      x++;
    }
  }
  k0();
  s9();  

  // highlight 2
  x = startX + 4;
  k4('#335a3a');
  k3();
  p0(x, heightOffset - highlightpoints2[0]);
  for (var t = 1; t < highlightpoints2.length; t++) {
    o8(x, heightOffset - highlightpoints2[t]);
    x++;
  }

  for (var t = 1; t < highlightBackpoints2.length; t++) {
    o8(x, heightOffset - highlightBackpoints2[t]);

    if(r9() > 0.8) {
      x++;
    } else if(r9() > 0.1) {
      x--;
    }
  }

  k0();
  s9();

  return points;
}

function a3() {

  var x = 0;
  for(var i =0 ; i < 20; i++) {
    t5(x);//, width, height, height / 2, 0.6);
    x += 3 + r9() * 100;;
  }
}


// *********   TREES *********** //
var tree = {

  o0:'',
  
  draw : function() {
      j4(500/2,500);
      this.o0 = '#'+(0x1000000+(r9())*0xffffff).toString(16).substr(1,6);
      cntx.lineWidth = 1 + (r9() * 20);
      cntx.lineJoin = 'round';
      
      this.u2(0);
  },
  
  u2 : function(depth) {
    if (depth < 12) {
        k3();
        p0(0,0);
        o8(0,-(500)/10);

        p2();
        
        j4(0,-500/10);
        var randomN = -(r9() * 0.1) + 0.1;

        p9(randomN); 

        if ((r9() * 1) < 0.6) {
          p9(-0.35);
          cntx.scale(0.7,0.7);
          s3();
          this.u2(depth + 1);
          n0();  
          p9(0.6);
          s3();
          this.u2(depth + 1);   
          n0();        
        } else  { 
            this.u2(depth);
        }
    } else {   
          
      k4(this.o0);
      m0(0, 0, 500, 200);
      p2();
    }
  }
};


var k1 = [];
function createTrees() {
  k1 = [];
  
  for(var ti = 0; ti < 6; ti++) {

    var treeSpread = 0.6;
    var treeOK = false;
    var c = 0;
    while(!treeOK) {
      cntx = j9.x;
      j9.x.save();
      m3();
      tree.draw();
      var bounds = a8();
      treeOK = (bounds.w < 300 && bounds.h < 400) || c > 5;

      j9.x.restore();
      c++;
    }
    k1[ti] = q3();
  }
}





// ***************** BACKGROUND BUILDINGS ******************** //


function c0(x, type, buildingColor, windowColor) {
  cntx = e1.x;

  var buildingHeight = 30;//40 ;
  var buildingWidth = 20;//25;

  var windowSpacing = 2;//2;
  var windowWidth = 1;//3;
  var windowHeight = 1;//3;
  var windowColumns = 4;
  var windowRows = 8;


  if(type == 1) {
//    windowSpacing = 2;
    windowWidth = 2;//8;
    windowHeight = 2;
    windowColumns = 3;
    windowRows = 10;
    buildingHeight = 40;//60;
    buildingWidth = 25;//30;

  }

  if(type == 2) {
//    windowSpacing = 2;
    windowWidth = 4;//26;
//    windowHeight = 1;
    windowColumns = 2;
    windowRows = 6;
    buildingHeight = 20;//40;
    buildingWidth = 18;//30;
  }

  var t9 = 260;

  buildingHeight += 30 * r9();
  k4(buildingColor);
  m0(x, t9 - buildingHeight, buildingWidth, buildingHeight);

  if(r9() < 0.4) {
    var inset = 5;
    var insetHeight = 8;
    m0(x + inset, 
      t9 - (buildingHeight + insetHeight), 
      buildingWidth - 2*inset, 
      buildingHeight + insetHeight);
  }

  if(r9() < 0.2) {
    var inset = 5;
    var insetHeight = 13;
    var insetWidth = 2;

    m0(x + inset, 
      t9 - (buildingHeight + insetHeight), 
      insetWidth, 
      buildingHeight + insetHeight);
  }

  for(var row = 0; row < windowRows; row++) {
    var wy = windowSpacing + row * (windowHeight + windowSpacing);
    for(var col = 0; col < windowColumns; col++) {
      var wx = windowSpacing + col * (windowWidth + windowSpacing);
      k4(windowColor);
      m0(x + wx, t9 - buildingHeight + wy, windowWidth, windowHeight);
    }
  }
}

function a4(night) {

  var buildingColor = '#777799';
  var windowColor = '#9999ee';
  if(night) {
    buildingColor = '#060606';
    windowColor = '#929156';
  }
  var x = 0;
  for(var i = 0; i < 80; i++) {
    var n = r9();
    if(n < 0.4) {
      c0(x, 0, buildingColor, windowColor);
    } else if(n < 0.6) {
      c0(x, 1, buildingColor, windowColor);
    } else {
      c0(x, 2, buildingColor, windowColor);
    }
    x += 10 + r9() * 30;
  }
  
  var buildingColor = '#9999aa';
  var windowColor = '#aaaaee';
  if(night) {
    buildingColor = '#101010';
    windowColor = '#929156';
  }

  var x = 0;
  for(var i = 0; i < 80; i++) {
    var n = r9()
    if(n < 0.4) {
      c0(x, 0, buildingColor, windowColor);
    } else if(n < 0.6) {
      c0(x, 1, buildingColor, windowColor);
    } else {
      c0(x, 2, buildingColor, windowColor);
    }
    x += 10 + r9() * 30;
  }
  
}

// ------------ building     --------------

function f8(night) {
  c8 = [];
  for(var ti = 0; ti < 4; ti++) {
    m3();
    cntx = j9.x;
    var grey = 100 + r9() * 80;


    if(night) {
      grey = 10 + r9() * 20;
    }
    k4('rgb(' + grey + ',' + grey + ',' + grey + ')');
    m0(0, 30, 240, 500);

    var windowWidth=24, windowHeight=15,windowStartOffset=8,windowSpacingH = 8,windowSpacingV = 10;
    var row=col=x=y=0;

    for(row = 0; row < 18; row++) {
      y = 30 + windowStartOffset + row * (windowHeight + windowSpacingV);
      for(col = 0; col < 7; col++) {
        x = windowStartOffset + col * (windowWidth + windowSpacingH);

        if(night) {
          if(r9() > 0.7) {
            k4('#ffffec');
            m0(x, y, windowWidth, windowHeight);
            k4('#bbbb88');
            m0(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
          } else {          
            k4('#112237');
            m0(x, y, windowWidth, windowHeight);
            k4('#111a30');
            m0(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
          }
        } else {
          k4('#5555a7');
          //ctx.filter = 'blur(1px)';
          m0(x, y, windowWidth, windowHeight);
          k4('#444495');
          m0(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
        }
      }
    }
    c8[ti] = q3();

  }
}

// ***************** STREET LIGHTS ******************** //


function c3(night) {
  cntx = j9.x;
  m3();
  s3();

  k4('#999999');

  if(night) {
    k4('#555555');
  }

  var poleWidth = 7;

  m0(40, 150, poleWidth, 300);
  k3();
  t4(70, 150, 30, PI, -PI / 2 );
  o8(70, 150 - 30 + poleWidth);
  t4(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  o8(70 - 30, 150);
  s9();

  m0(70, 150 - 30, 70, poleWidth);
  m0(130, 150 - 30 - 1, 35, 6);

  k4('#aaaaaa');
  if(night) {
    k4('#777777');
  }
  m0(40 + poleWidth - 4, 150, 2, 300);
  m0(70, 150 - 30 + poleWidth - 4, 70, 2);

  k3();
  t4(70, 150, 30 - poleWidth + 4, PI, -PI / 2 );
  o8(70, 150 - 30 + poleWidth);
  t4(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  o8(70 - 30, 150);
  s9();

  k4('#aaaaaa');
  if(night) {
    k4('#999999');
  }
  m0(40 + poleWidth - 2, 150, 2, 300);
  m0(70, 150 - 30 + poleWidth - 2, 70, 2);

  k3();
  t4(70, 150, 30 - poleWidth + 2, PI, -PI / 2 );
  o8(70, 150 - 30 + poleWidth);
  t4(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  o8(70 - 30, 150);
  s9();


  if(night) {
    cntx.filter = 'blur(2px)';    
  }

  k4('#ffffff');
  m0(128, 150 - 30 + 4, 38, 12);

  if(night) {
    g1(0.8);
    cntx.globalCompositeOperation = 'lighter';

    cntx.filter = 'blur(4px)';    
    m0(123, 150 - 30 +3, 44, 18);  
    g1(1);
  }

//  cntx.filter = null;
//  cntx.globalCompositeOperation = 'u5-over';

  a7 = q3();
  a5 = q3(1);
  n0();

}

function i0() {
  var xMax = b4;
  var yMax = a9;
  cntx = e3.x;

  var gradient = a6(0, 0, 0, yMax);
  gradient.addColorStop(0, "#00111e");
  gradient.addColorStop(1, "#033d5e");

  k4(gradient);//'#00111e';
  m0(0, 0, b4, a9);


  var hmTimes = Math.round(xMax + yMax);  
  
  for(var i=0; i<=hmTimes; i++) {
    var randomX = m8(xMax);
    var randomY = m8(yMax);
    var randomSize = m8(2) + 1;
    var randomOpacityOne = m8(9) + 1;
    var randomOpacityTwo = m8(9) + 1;
    var randomHue = m8(360);
    if(randomSize>1) {
      cntx.shadowBlur = m8(15) + 5;
      cntx.shadowColor = "white";
    }
    k4( "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")" );
    m0(randomX, randomY, randomSize, randomSize);
  }
}



function createLeaf(s) {

  k4(s);
  k3();

  t4(3, 7, 3, PI / 2, PI );
  t4(10, 7, 10, PI, PI * 1.24);
  t4(-4.7, 7, 10, PI * 1.76, 0);
  t4(2.3, 7, 3, 0, PI / 2 );
  s9();  
}

function j5() {
  m3();
  cntx = j9.x;
  var canvas = j9.c;
  cntx.save();



  var leafGradient = a6(0, 0, 0, 8);
  leafGradient.addColorStop(0, "#ff111e");
  leafGradient.addColorStop(1, "#aa3d5e");

  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf(leafGradient);

  cntx.translate(0, 20);
  createLeaf('#44aa55');
  cntx.restore();
  
  var y = 100;

  for(var j = 0; j < 2; j++) {
    var x = 30;
    for(var i = 0; i < 60; i++) {
      x += 4 + 6 * r9();

      if(x > 780) {
        continue;
      }
      
      var height = 20 + 4 * r9();
      y = 100 + j * 16 - height + r9() * 12;
      // draw the stem
      if(r9() > 0.5) {
        k4('#44aa55');
        m0(x, y, 2, height);
        k4('#66cc88');
        m0(x, y, 1, height);
      } else {
        k4('#449955');
        m0(x, y, 2, height);
        k4('#66aa88');
        m0(x, y, 1, height);        
      }

      var flower = m8(2) * 20;

      var dstX = x - 2;
      var dstY = y - 6;
      s3();
      j4(dstX + 3, dstY);
      p9(0.3);
      i5(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      n0();

      s3();
      j4(dstX - 3, dstY + 1);
      p9(-0.3);
      i5(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      n0();

      s3();
      j4(dstX, dstY);
      i5(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      n0();

      s3();
      j4(dstX + 6, dstY + 10);
      p9(0.6);//Math.random() * Math.PI * 2);
      i5(canvas, 0, 60, 6, 11, 0, 0, 6, 11);
      n0();
    }
  }

  cntx.clearRect(0, 0, 22, 300);
  e8 = q3();

}

function o7(points, color) {
  k3();
  k4(color);
  p0(points[0], points[1]);
  for(var i = 2; i < points.length; i+= 2) {
    o8(points[i], points[i+1]);
  }
  k0();
  s9();
}

function drawLine(x1, y1, x2, y2) {
  k3();
  p0(x1, y1);
  o8(x2, y2);
  cntx.stroke();
}

function r1() {
  m3();
  cntx = j9.x;

  // car tyre
  var points = [
    8, 194, 
    11, 206,
    14, 214,
    18, 216,
    41, 215,
    46, 213,
    47, 205
  ];
  o7(points,r4);

  // car tyre
  var points = [
    227, 193,
    230,200,
    241, 204,
    258, 203, 
    265, 197,
    268, 191
  ];
  o7(points,r4);
  

  // car body
  var points = [
    5, 192,
    25, 206,
    296, 190,
    302, 164, 
    298, 149,
    296, 145, 
    292, 111, 
    289, 103, 
    294, 101, 
    294, 91,
    297, 84, 
    263, 72, 
    208, 14, 
    167, 2, 
    66, 3, 
    45, 7, 
    8, 55, 
    //9, 87,
    5, 65,
    7, 88,
    2, 97, 
    1, 151
  ];
  o7(points,'#a9fb78');


  // car body
  var points = [
  //  5, 192,
    25, 206,
    296, 190,
    302, 164, 
    298, 149,
    296, 145, 
    292, 111, 
    289, 103, 

    294, 101, 
    294, 91,
    297, 84, 

    17, 93, 
    22, 122,

    20, 162, 

    20, 170,
    2, 145, 
    3, 160, 
    6, 187
//    6, 192

  ];
  o7(points,'#4abf74');
  var points = [
    20, 108,
    294, 96,
    296, 89,
    19, 98 
  ];
  o7(points,'#226d7d');


  var points = [
    21, 162,
    296, 149,
    292,112,
    22, 122 
  ];
  o7(points,'#226d7d');


  
  // windu6
  var points = [
    42, 86,
    260, 79,
    208, 21,
    60, 24
  ];
  //o7(points,'#4773dd');
  var gradient = a6(0, 19, 0, 90);
  gradient.addColorStop(0, "#4fa8f7");
  gradient.addColorStop(1, "#2d3c7c");

  o7(points, gradient);//'#4773dd');

  points = [
    51, 62,
    238, 57, 
    253, 76, 
    196, 67,
    159, 64, 
    125, 66, 
    81, 72, 
    45, 82 
  ];
  o7(points, '#95eef7');

  // windu6
  var points = [
    27, 83,
    33, 77,
    46, 27,
    21, 70
  ];
  o7(points,'#4773dd');

  // windu6
  var points = [
    19, 61,
    46, 17, 
    43, 12,
    19, 51
  ];
  o7(points,'#4773dd');

  // windu6
  var points = [
    3, 99,
    10, 113,
    18, 120,
    17, 106, 
    11, 86,
    5, 91
  ];
  o7(points,'#ffd47e');


  // tail light
  var points = [
    21, 127,
    19, 145,
    20, 158,
    106, 153,
    105, 124

  ];
  o7(points,'#b44258');


  // tail light
  var points = [
    20, 158,
    106, 153,
    105, 142,
    19, 146

  ];
  o7(points,'#5d2959');




  // tail light
  var points = [
    217, 120,
    218, 149,
    296, 145, 
    296, 134,
    293, 116

  ];
  o7(points,'#b44258');


  // tail light
  var points = [
    218, 149,
    296, 145, 
    296, 133,
    218, 137

  ];
  o7(points,'#5d2959');

  // strip under lights
  var points = [
    21, 173,
    300, 159, 
    299, 149,
    21, 162
  ];
  o7(points,'#a9fb78');  


  f1 = q3(0);
  d3 = q3(1);
}

function p6() {
  m3();
  cntx = j9.x;
  var canvas = j9.c;


 // car body bottom
 var points = [
  5, 197,
  143, 197,
  141, 87,
  1, 87, 
  4, 106, 
  1, 121, 
  1, 180
 ];
 o7(points, '#4abf74');

 //car body top
 var points = [
  141, 87,
  143, 1,
  87, 3,
  72, 6, 
  61, 17, 
  31, 67, 
  1, 87, 
];
o7(points, '#a9fb78');

  // boot stripe
  points = [
    4, 100,
    143, 100,
    143, 93, 
    3, 93
  ];
  o7(points,'#226d7d');

  // tail green stripe
  points = [
    4, 155,
    143, 155,
    143, 113, 
    4, 113
  ];
  o7(points,'#226d7d');

  // tail light
  points = [
    4, 150,
    86, 149,
    86, 121,
    5, 121,
    3, 139
  ];
  o7(points, '#b44258');

  points = [
    4, 149,
    86, 149,
    86, 138,
    4, 138
  ];
  o7(points, '#5d2959');

  // tail light
  points = [
    22, 131,
    22, 134,
    73, 134,
    73, 131

  ];
  o7(points, '#d65d5b');
  
  
  // windu6
  points = [
    32, 82,
    143, 82,
    143, 19,
    66, 19
  ];

  var gradient = a6(0, 19, 0, 90);
  gradient.addColorStop(0, "#4fa8f7");
  gradient.addColorStop(1, "#2d3c7c");

  o7(points, gradient);//'#4773dd');

  points = [
    47, 59, 
    143, 59, 
    143, 64, 
    78, 68, 
    38, 77
  ];
  o7(points, '#95eef7');

  // wheel
  points = [
    13, 197,
    16, 205,
    23, 208,
    49, 207,
    56, 202,
    58, 197
  ];
  o7(points, r4);

  // strip under lights
  var points = [
    1, 155, 
    1, 167, 
    143, 167, 
    143, 155
  ];
  o7(points,'#a9fb78');
//  o7(points,'#5d2959');  

/*
  g0('#63a96e');
  drawLine(1, 161, 143, 161);

  g0('#111111');
  cntx.lineWidth = 2;
  drawLine(4, 137, 86, 137);

  cntx.lineWidth = 1;

  for(var i = 0; i < 68; i += 4) {
    drawLine(6 + i, 138, 6 + i, 149);
  }
  g0('#204e69');
  cntx.lineWidth = 2;
  drawLine(5, 114, 106, 114);
  cntx.lineWidth = 1;
  drawLine(105, 116, 105, 155);


  g0('#204e69');
  cntx.lineWidth = 1;
  drawLine(143, 21, 65, 21);
  drawLine(65, 21, 32, 82);
  drawLine(32, 82, 143, 82);
*/
  s3();
  cntx.scale(-1, 1);

  i5(j9.c, 0, 0, 143, 210,
    -143 -132, 0, 143, 210);
  n0();

  b7 = q3(0);
}

function o6() {
  r1();
  p6();
}

/*
function p7() {
  m3();
  cntx = j9.x;
  var canvas = j9.c;

  var colours = [
    '#002205',
    '#336622',
    '#448833'
  ];
  for(var j = 0; j < 3; j++) {
    createLeaf(colours[j]);

      for(var i = 0; i < 100; i++) {
        var radius = 30 * r9();
        var angle = PI * 2 * r9();
        var cX = 140;
        var cY = 160;
        var dstX = cX + radius * M.cos(angle);
        var dstY = cY + radius * M.sin(angle);
        s3();
        j4(dstX, dstY);
        p9(r9() * PI * 2);
        i5(canvas, 0, 0, 6, 11, 0, 0, 6, 11);
        n0();
      }

      for(var i = 0; i < 120; i++) {
        var radius = 40 * r9();
        var angle = Math.PI * 2 * Math.random();
        var cX = 160;
        var cY = 150;
        var dstX = cX + radius * cos(angle);
        var dstY = cY + radius * sin(angle);
        s3();
        j4(dstX, dstY);
        p9(r9() * PI * 2);
        i5(canvas, 0, 0, 6, 11, 0, 0, 6, 11);
        n0();
      }


      for(var i = 0; i < 100; i++) {
        var radius = 30 * r9();
        var angle = PI * 2 * r9();
        var cX = 190;
        var cY = 160;
        var dstX = cX + radius * cos(angle);
        var dstY = cY + radius * sin(angle);
        s3();
        j4(dstX, dstY);
        p9(r9() * PI * 2);
        i5(canvas, 0, 0, 6, 11, 0, 0, 6, 11);
        n0();

      }
    }
}
*/



function b2(n, total) { 
  return ( n % total) / total;
}

function g4(a,b,percent) { 
  return a + (b-a)*percent                                        
}

function l0(start, increment, max) {
  var result = start + increment;

  while (result >= max)
    result -= max;
  while (result < 0)
    result += max;
  return result;
}


// the title u6

var m5 = function(canvas, t6) {
  this.canvas = canvas;
  this.t6 = t6;

}

m5.prototype = {

  init: function() {
    v0.reset();
    v3.buildv20();
  },

  keyDown: function(e) {
    if(e.keyCode === 88) {
      startGame();
    }
  },

  keyUp: function(e) {

  },

  p5: function() {
    n3 = true;
    var maxy          = height;    
    v0.y = 400;
    v0.depth = 0.83909963117728;
    v0.x = 0;
    
    var baseSegment   = v3.n1(v0.z);
    var v0Percent = b2(v0.z, v2.u0Length);
    
    v0.y = 500 + g4(baseSegment.p1.v8.y, 
      baseSegment.p3.v8.y, 
      v0Percent);

    var n, i, u0, car, sprite, spriteScale, spriteX, spriteY;
    var dx = 0;
    for(n = 0 ; n < v0.l3 ; n++) {
      u0 = v3.o9((baseSegment.index + n) % v3.o9Count() );
      u0.u9 = u0.index < baseSegment.index;
      u0.clip   = maxy;
      u0.clip   = 0;
  
      v0.t2(u0.p1,  0, u0.u9, width, height, q4);
      v0.t2(u0.p2,  0, u0.u9, width, height, q4);
      v0.t2(u0.p3,  0, u0.u9,  width, height, q4);
      v0.t2(u0.p4,  0, u0.u9,  width, height, q4);
  
  
  
      if ((u0.p1.v0.z <= v0.depth)         || // behind us
          (u0.p3.u6.y >= u0.p1.u6.y) || // back face cull
          (u0.p3.u6.y >= maxy))                  // clip by (already rendered) hill
        continue;

        k2(u0);
      maxy = u0.p1.u6.y;
    }
  
  },


  render: function(dt) {
    cntx = this.t6;
    var t = l2();

    k4(r4);
    m0(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < 30; i++) {
      var fontSize = 100 + i * 10;
      t6.font = 'italic ' + fontSize + 'px ' + q6;
      t6.fontStyle = 'italic';
      var col = 80 + (i * 4);
      col = (col + t / 6) % 200;
      
      if(i == 29) {
        col = 255;
      }

      k4('rgb(' + col + ',' + col + ',' + col + ')');
      k9("racer", 400 - i * 11, 300- i);
    }

    t6.font = '44px ' + q6;
    k9("Arrow keys to drive, x for Turbo, z for Handbrake", 38, 570);
    k9("x To Start", 423, 460);


    v0.z = l0(v0.z, dt * 120, v3.r2());
    this.p5();

  }
  
}

var u3 = function() {
  this.fieldOfView = 100;

  this.y = 0;
  this.z = 0;
  this.l3 = 300;  
  this.depth = 0;           
  this.fogDensity =  25;
  this.t7 = 0;         
  this.t9 = 740;
  this.t7 = 700;


}

u3.prototype = {
  reset: function() {
    this.depth            = 1 / Math.tan( ( this.fieldOfView / 2 ) * Math.PI/180);
    this.t9 = 740;
    this.t7 = 700;
  
  },

// u0 3081
  t2: function(p, v0XOffset, u9, width, height) {
    var v0Z = this.z;
    if(u9) {
      v0Z -= v3.r2();
    }
    var v0X = this.x + v0XOffset;

    p.v0.x     = (p.v8.x || 0) - v0X;
    p.v0.y     = (p.v8.y || 0) - this.y;
    p.v0.z     = (p.v8.z || 0) - v0Z;//this.z;
    p.u6.scale = this.depth / p.v0.z;

    p.u6.x     = Math.round((width/2)  + (p.u6.scale * p.v0.x  * width/2));
    p.u6.y     = Math.round((height/2) - (p.u6.scale * p.v0.y  * height/2));
  
  },


  update: function(dt) {
    this.z = cars[0].z - this.t7;
    if(this.z < 0) {
      this.z += v3.r2();
    }

    v0.x = cars[0].x + cars[0].width/2;


    var u1Segment = v3.n1(cars[0].z);
    var u1Percent = b2(cars[0].z, v2.u0Length);
    

    this.y = this.t9 + g4(u1Segment.p1.v8.y, 
      u1Segment.p3.v8.y, 
      u1Percent);

  }
}

// draw all the race stuff to the u6                 
var width  = 1024;
var height  = 768;
var resolution = height/480;

var i2       = 0.001;                
var i3      = 0.002;              
var i4      = 0.003;              


var h3      = 0;  
var h4     = 0;   
var h6     = 0;   
var n3 = false;
var lastDriftDraw = 0;

// draw a t8
function j6(x1, y1, x2, y2, x3, y3, x4, y4, color) {
  var ctx = t6;
  k4(color);
  k3();
  p0(x1, y1);
  o8(x2, y2);
  o8(x3, y3);
  o8(x4, y4);
  k0();
  if(n3) {
    g0(q2);
    p2();
  } else {
    s9();
  }
}

  // draw a u0, coordinates passed in are u6 coordinates
  function k2(u0) {
    var lanew1, lanew2, lanex1, lanex2, lane;
    var dark = Math.floor(u0.index/2) % 2;// (u0.index / 2) % 2;

    var v9Color = e4;
    var landColor = d4;
    if(dark) {
      v9Color = g2;
      landColor = g3;
    }

    // draw side land
    if(!n3) {
      k4(landColor);
      m0(0, u0.p3.u6.y, width, u0.p1.u6.y - u0.p3.u6.y);
    }

    // draw v9
    var r1 = u0.r0 * u0.p1.u6.scale * width / 2;
    var r2 = u0.r0 * u0.p4.u6.scale * width / 2;
    j6(
                    u0.p1.u6.x - r1, 
                    u0.p1.u6.y, 
                    u0.p1.u6.x, 
                    u0.p1.u6.y, 
                    u0.p4.u6.x, 
                    u0.p4.u6.y, 
                    u0.p4.u6.x - r2, 
                    u0.p4.u6.y, 
                    v9Color);

    j6(
      u0.p2.u6.x, 
      u0.p2.u6.y, 
      u0.p2.u6.x + r1, 
      u0.p2.u6.y, 
      u0.p3.u6.x + r2, 
      u0.p3.u6.y, 
      u0.p3.u6.x, 
      u0.p3.u6.y, 
      v9Color);
  
    // road 
    if(!n3) {
      var colour = n9;
      if(u0.index == 0) {
        colour = q2;
      }
      j6(
                    u0.p1.u6.x,    
                    u0.p1.u6.y, 
                    u0.p2.u6.x, 
                    u0.p2.u6.y, 
                    u0.p3.u6.x, 
                    u0.p3.u6.y, 
                    u0.p4.u6.x,    
                    u0.p4.u6.y, 
                    colour);
    }


    var l1 = 50 * u0.p1.u6.scale * width / 2;
    var l2 = 50 * u0.p4.u6.scale * width / 2;


    // lines on side of road
    lanex1 = u0.p1.u6.x + 100 * u0.p1.u6.scale * width / 2;
    lanex2 = u0.p4.u6.x + 100 * u0.p4.u6.scale * width / 2;

    j6(
        lanex1 - l1/2, 
        u0.p1.u6.y, 
        lanex1 + l1/2, 
        u0.p1.u6.y, 
        lanex2 + l2/2, 
        u0.p3.u6.y, 
        lanex2 - l2/2, 
        u0.p3.u6.y, 
        c6);

    lanex1 = u0.p2.u6.x - 100 * u0.p1.u6.scale * width / 2;
    lanex2 = u0.p3.u6.x - 100 * u0.p4.u6.scale * width / 2;

    j6(
        lanex1 - l1/2, 
        u0.p1.u6.y, 
        lanex1 + l1/2, 
        u0.p1.u6.y, 
        lanex2 + l2/2, 
        u0.p3.u6.y, 
        lanex2 - l2/2, 
        u0.p3.u6.y, 
        c6 );
      
    lanes = 2;
    // lane marker
    if (dark) { //u0.color.p1) {
      lanew1 = (u0.p2.u6.x - u0.p1.u6.x) / lanes;
      lanew2 = (u0.p3.u6.x - u0.p4.u6.x) / lanes;
      lanex1 = u0.p1.u6.x + lanew1;
      lanex2 = u0.p4.u6.x + lanew2;
      for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++) {
        j6(
          lanex1 - l1/2, 
          u0.p1.u6.y, 
          lanex1 + l1/2, 
          u0.p1.u6.y, 
          lanex2 + l2/2, 
          u0.p3.u6.y, 
          lanex2 - l2/2, 
          u0.p3.u6.y, 
          c6);
      }
    }

    if(q1 != 0) {
      q9(0, u0.p1.u6.y, width, u0.p3.u6.y-u0.p1.u6.y, u0.fog);
    }
  }

  //---------------------------------------------------------------------------

  function e0( background, width, height, rotation, offset) {

//    return;

    
    rotation = rotation || 0;
    offset   = offset   || 0;

    var imageW = b4/2;
    var imageH = a9;

    var u5X = Math.floor(b4 * rotation);
    var u5Y = 0;
    var u5W = Math.min(imageW, b4-u5X);
    var u5H = imageH;
    
    var destX = 0;
    var destY = offset;
    var destW = Math.floor(width * (u5W/imageW));
    var destH = height;

    t6.drawImage(background.c, u5X, u5Y, u5W, u5H, destX, destY, destW, destH);
    if (u5W < imageW)
      t6.drawImage(background.c, 0, u5Y, imageW-u5W, u5H, destW-1, destY, width-destW, destH);
  }

  //---------------------------------------------------------------------------

  function m1(sprite, scale, destX, destY, clipY, fog) {

    var destW  = (sprite.w * scale * width/2) ;
    var destH  = (sprite.h * scale * width/2);


//    destX = destX + (destW * (offsetX || 0));
    destY = destY - destH;// + (destH * (offsetY || 0));


    // clip y for appearing behind a hill..
    var clipH = clipY ? Math.max(0, destY+destH-clipY) : 0;
    if (clipH < destH) {

      t6.drawImage(j8, 
        sprite.x, 
        sprite.y, 
        sprite.w, 
        sprite.h - (sprite.h*clipH/destH), 
        destX, 
        destY, 
        destW, 
        destH - clipH);

      if(fog !== false && q1 != 0) {
        q9(destX, destY, destW, destH, fog);//ctx, x, y, width, height, fog) {
      }
    }

  }

  //---------------------------------------------------------------------------
  function b3(distance, density) { 
    return 1 / (Math.pow(Math.E, (distance * distance * density))); 
  }

  function m2(scale, destX, destY, steer, updown, u1ShadowY) {

    var sprite;
    if(steer < 0) {
      sprite = f1;
    } else if(steer > 0) {
      sprite = d3;
    } else {
      sprite = b7;
    }

    var spriteScale = u1.width * scale / sprite.w;

    var i,j;


    // ************* DRAW SLIP STREAM ********** //
    if(u1.h2 > 0 || u1.p8 > 0) {

      cars[0].b6();

      var amount = 0;
      if(u1.h2 <= 0) {
        amount = u1.p8 ;
        while(amount > 1) {
          amount -= 1;
        }        
      }
      g1(1 - amount);

      for(i = 0; i < cars[0].f2.length; i++) {
        var points = cars[0].f2[i];
        k3();
        p0(points[0].u6.x, points[0].u6.y);
        for(j = 1; j < points.length; j++) {
          o8(points[j].u6.x, points[j].u6.y);
        }

        k4(q2);
        s9();

      }
      g1(1);
    }


    // ***** DRAW SHADOW IF IN AIR *******/
/*
    if(u1ShadowY != destY) {
      g1(0.4);
        var destW  = (sprite.w * spriteScale * width/2) ;
        j6(destX, u1ShadowY,
          destX + destW, u1ShadowY,
          destX + 0.7 * destW, u1ShadowY - 180,
          destX + 0.3 * destW, u1ShadowY - 180,
          
          r4);
      g1(1);      
    }
    */
    // ***** DRAW CAR SPRITE ****** /

    
    m1(
      sprite, 
      spriteScale, 
      destX, 
      destY + u1.u8, 
      false);
      

    // ************** DRAW DRIFT *************** //
    if( u1.m6 > 0) {
      var time = l2();
      if(time - lastDriftDraw > 100) {

        g1(0.8);
        k4(q2);
        var x = destX + 12;
        var y = destY - 4;
        m0(x, y, 50, 10)

        x = destX + 260;
        m0(x, y, 50, 10)

        g1(1);
        lastDriftDraw = time;
      }
    }

    //  ******  DRAW TURBO  ***** /
    if(u1.v5) {
      var centreX = destX + 82;
      var centreY = destY - 10;
      e6(centreX, centreY, 10,'#dd9925' );
      e6(centreX, centreY, 5,'#cccc55');
      centreX = destX + 230;
      e6(centreX, centreY, 10,'#dd9925' );
      e6(centreX, centreY, 5,'#cccc55');
    }    
  }


  function q9(x, y, width, height, fog) {
    if (fog < 1) {
      g1(1-fog)
      k4(q1);
      m0(x, y, width, height);
      g1(1);
    }
  }


  function l7() {
    cntx = t6;
    

    var baseSegment   = v3.n1(v0.z);
  
    var basePercent   = b2(v0.z, v2.u0Length);
    var u1Segment = v3.n1(u1.z);
    var u1Percent = b2(u1.z, v2.u0Length);
    var u1Y       = g4(u1Segment.p1.v8.y, u1Segment.p3.v8.y, u1Percent);
    var maxy          = height;
    var x  = 0;
    var dx = - (baseSegment.v4 * basePercent);
  //  t6.clearRect(0, 0, width, height);
  
    t6.fillStyle = '#4576aa';
    m0(0, 0, width, height);
  
  
    // render background hills, sky, trees
    e0(e3, width, height, h3,  resolution * i2  * u1Y);
    e0(e2, width, height, h4, resolution * i3 * u1Y);
    e0(e1, width, height, h6, resolution * i4 * u1Y);
  
  
    /*
      front to back to render the road
      back to front to render the t1
    */
  
  
    // render u0s from to back
    var n, i, u0, car, sprite, spriteScale, spriteX, spriteY;
    for(n = 0 ; n < v0.l3 ; n++) {
  
  //    u0        = u0s[(baseSegment.index + n) % u0s.length];
  
      u0 = v3.o9((baseSegment.index + n) % v3.o9Count() );
      u0.u9 = u0.index < baseSegment.index;
  
      u0.fog    = b3(n/v0.l3, v0.fogDensity);
      u0.clip   = maxy;
  
      v0.t2(u0.p1,  - x,      u0.u9, width, height);
      v0.t2(u0.p2,  - x,      u0.u9, width, height);
      v0.t2(u0.p3,  - x - dx, u0.u9,  width, height);
      v0.t2(u0.p4,  - x - dx, u0.u9,  width, height);
  
      // do fake v4d road
      x  = x + dx;
      dx = dx + u0.v4;
  
      // cull u0s if behind, facing other way or clipped
      if ((u0.p1.v0.z <= v0.depth)         || 
          (u0.p3.u6.y >= u0.p1.u6.y) || 
          (u0.p3.u6.y >= maxy))                  
        continue;
  

      k2(u0);
      maxy = u0.p1.u6.y;
    }
  
    // draw opponent cars from furthest to closest
    // opponents still in view but closer than the u1 to the v0 should be drawn after the u1..
    for(n = (v0.l3-1) ; n > 0 ; n--) {
      u0 = v3.o9((baseSegment.index + n) % v3.o9Count());
  
      // draw cars in the u0
      for(i = 0 ; i < u0.cars.length ; i++) {
        car         = u0.cars[i];
        
        if(car.index !== 0) {
          sprite      = car.sprite;
          var scale = g4(u0.p1.u6.scale, u0.p3.u6.scale, car.percent);
  
          spriteX     = g4(
            (u0.p1.u6.x + u0.p2.u6.x) / 2,     
            (u0.p3.u6.x + u0.p4.u6.x) / 2,     
            car.percent) 
            + (scale * car.x * width/2);
  
          spriteY     = g4(u0.p1.u6.y,     u0.p4.u6.y,     car.percent);
  

          var sprite = b7;
          spriteScale = car.width * scale / sprite.w;

          if(car.s4) {
            sprite = f1;
          } else if(car.q8) {
            sprite = d3;
          } 
      
  
          m1(
            sprite, 
            spriteScale, 
            spriteX, 
            spriteY, 
            u0.clip,
            u0.fog);
        }
      }
  
      // roadside objects
      for(i = 0 ; i < u0.t1.length ; i++) {
        sprite      = u0.t1[i];
        spriteScale = u0.p1.u6.scale;

        spriteX = u0.p1.u6.x - u0.p1.v8.x * u0.p1.u6.scale * width / 2
                  + spriteScale * sprite.x * width / 2;


        spriteY     = u0.p1.u6.y;
  /*
        sprite.u5.x = 0;
        sprite.u5.y = 0;
        sprite.u5.w = 200;
        sprite.u5.h = 210;
  */
        spriteScale = sprite.s  * spriteScale;//* 800 / sprite.u5.w;
  

        
        m1(
          sprite.u5, 
          spriteScale, 
          spriteX, 
          spriteY, 
          u0.clip,
          false);
          


//-------- COLLISION DISPLAY ----------- //
var destW  = (sprite.u5.w * spriteScale * width/2) ;

var offsetX = -0;//.5;
var destX = spriteX + (destW * (offsetX || 0));

spriteScale = u0.p1.u6.scale;        
spriteScale = sprite.s * spriteScale;//800 * spriteScale / sprite.u5.w;

var collisionx = (sprite.u5.cx ) * spriteScale * width / 2;
var collisionw = sprite.u5.cw * spriteScale * width / 2;
spriteX = destX + collisionx;// + collisionx * spriteScale * width / 2;// + spriteScale * collisionx * width / 2;

//t6.fillStyle = '#ff0000';
//t6.fillRect(spriteX, spriteY - 10, collisionw, 10);              
//-------- COLLISION DISPLAY END ----------- //

    }
  
      if (u0 == u1Segment) {
        var u1ScreenY = g4(u1Segment.p1.u6.y, u1Segment.p3.u6.y, u1Percent);
        
  
        u1ScreenY = (height / 2) 
            - (v0.depth / v0.t7 * g4(u1Segment.p1.v0.y, 
            u1Segment.p3.v0.y, u1Percent) * height/2);

        var u1ShadowY = u1ScreenY;
  
        if(cars[0].t9 > 0) {
          u1ScreenY -= cars[0].t9 * v0.depth / v0.t7 * height / 2;
        }

            
        var carX = width / 2;
        var scale = g4(u1Segment.p1.u6.scale, u1Segment.p3.u6.scale, u1Percent);
  
  
          spriteX     = g4(
            (u1Segment.p1.u6.x + u1Segment.p2.u6.x) / 2,     
            (u1Segment.p3.u6.x + u1Segment.p4.u6.x) / 2,     
            u1Percent) 
            + (scale * cars[0].x * width/2);


        var p = {
          v8: {
            x: u1.x,
            y: u1.y,
            z: u1.z
          },
          v0: {},
          u6: {}

        };

        v0.t2(p, 0, u1Segment.index < baseSegment.index, width, height);
  
        carX = p.u6.x;
        var u1Direction = 0;
        if(u1.v7 > 0) {
          if(u1.h8 != 0) {
            u1Direction = u1.h8;
          } else {
            u1Direction = (u1.s4 ? -1 : u1.q8 ? 1 : 0);
          }
        }

        m2( 
                      v0.depth / v0.t7,  // scale
                      carX,//width/2,   // destx
                      u1ScreenY,
                      u1Direction,
                      u1Segment.p3.v8.y - u1Segment.p1.v8.y,
                      u1ShadowY);
        if(race.state == 4) {
          t6.drawImage(v3.m7, -40, 200, 400, 400);
        }
  
      }
    }
  }





// the u1 car and the opponents car
var Car = function() {
  var t = this;

  t.sprite = 0;

  t.index = 0;

  t.width = 500;//530; // width
  t.height = 0;
  
  t.x = 0;
  t.y = 0;
  t.lastY = false;
  t.t9 = 0;
  t.z = 0;
  t.lap = 0;
  t.lapStarted = false;
  t.position = 0;

  t.n4 = 0.3;
  t.f2 = [];
  t.c7 = false;
  t.p8 = 0;
  t.h2 = 0;

  t.percent = 0; // percent remaining in u0
  t.v7 = 0;
  t.v1 = 0;

  t.v5StartTime = 0;
  t.q0=t.brake=t.s4=t.q8=t.v5=t.l5=t.l8=false;
  t.m6 = 0;
  t.h8 = 0;

  t.o1 = 100;
  t.lapStarted = false;

  // these are settings for the u1
  // the car init routine will set them for ai u1s
  t.n4    = 0.3;                     // n4 force multiplier when going around v4s

  t.r6       =  26000;
  t.i8  =  28000;

  t.v7Percent   = 0;  // v7 as percentage of max v7

  t.accel          =  6800;
  t.r8       = -16000;
  t.decel          = -8000;
  /*
  this.offRoadDecel   = -12000;
  this.offRoadLimit   = this.r6 /1.4;
//  this.accel          =  r6/5;             // acceleration rate - tuned until it 'felt' right
  //this.r8       = -r6;               // deceleration rate when braking
  //this.decel          = -r6/5;             // 'natural' deceleration rate when neither accelerating, nor braking
  //this.offRoadDecel   = -r6/2;             // off road deceleration is somewhere in between
  //this.offRoadLimit   =  r6/2;             // limit when off road deceleration no longer applies (e.g. you can always go at least this v7 even when off road)
  //this.sideStripLimit   =  this.r6/1.5;             // limit when off road deceleration no longer applies (e.g. you can always go at least this v7 even when off road)
  */

  t.h5 = 0;                       // current lap time
  t.lastLapTime    = null;                    // last lap time

  t.position = 0;

  t.r3 = 3000;

  // ai settings
  t.slowOnCorners = false;
  t.c5 = false;

  t.u8 = 1.5;
  t.g5 = 0;



}

Car.prototype = {
  k7:       function(v, accel, dt)      { return v + (accel * dt);                                        },

  b6: function() {
    this.f2 = [];
//    var carWidth = this.width;
    var carHeight = 400;
//    var centreX = this.x + this.width / 2;
    var centreZ = this.z + 500;
//    var centreY = this.y + carHeight;// + carHeight;
    var smallRadius = carHeight - 40;// - 200;// - 570;
    var lineLength = 700;

    var i, j;
    var u0s = 20;

    var angle = 0.0;
    if(this.c7 === false) {
      this.c7 = [];
      for(i = 0; i < u0s; i++) {
        this.c7.push(r9());
      }
    }

    for(i = 0; i < u0s; i++) {
      this.c7[i] += 0.03;
      if(this.c7[i] >= 0.8) {
        this.c7[i] = 0;
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


      var x1a =  x1 + (x3 - x1) * this.c7[i];
      var x2a = x2 + (x4 - x2) * this.c7[i];

      var y1a = y1 + (y3 - y1) * this.c7[i];
      var y2a = y2 + (y4 - y2) * this.c7[i];

      var x3a =  x1 + (x3 - x1) * (this.c7[i] + 0.4);
      var x4a = x2 + (x4 - x2) * (this.c7[i] + 0.4);

      var y3a = y1 + (y3 - y1) * (this.c7[i] + 0.4);
      var y4a = y2 + (y4 - y2) * (this.c7[i] + 0.4);


      var za = centreZ - lineLength * this.c7[i];
      var z2a = centreZ - lineLength * (this.c7[i] + 0.4);
//      var 1a = x1 + (x3 - x1) * this.c7[i];
  //    var x2a = x2 + (x4 - x2) * this.c7[i];

      var line = [];
      line.push({
        v8: {
          x: x1a,
          y: y1a,
          z: za
        },
        v0: {},
        u6: {}

      });

      line.push({
        v8: {
          x: x2a,
          y: y2a,
          z: za
        },
        v0: {},
        u6: {}
      });


      line.push({
        v8: {
          x: x4a,
          y: y4a,
          z: z2a,//centreZ - lineLength
        },
        v0: {},
        u6: {}

      });

      line.push({
        v8: {
          x: x3a,
          y: y3a,
          z: z2a,//centreZ-lineLength
        },
        v0: {},
        u6: {}
      });

      this.f2.push(line);
      angle += PI / u0s;

    }

    for(i = 0; i < this.f2.length; i++) {
      var points = this.f2[i];
      for(j = 0; j < points.length; j++) {
        v0.t2(points[j], 0, 0, width, height);
      }
    }

  },

  limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));   
  },

  t0: function(x1, w1, x2, w2, percent) {


    var min1 = x1 - (percent - 1) * w1 / 2;
    var max1 = x1 + (w1) * percent;
    var min2 = x2 - (percent - 1) * w2 / 2;
    var max2 = x2 + (w2) * percent;    
    return ! ((max1 < min2) || (min1 > max2));
  },

  // --- u1 controls ----
  setTurnLeft: function(turn) {
    this.s4 = turn;
  },
  k8: function(turn) {
    this.q8 = turn;
  },
  j0: function(q0) {
    this.q0 = q0;
  },
  r5: function(brake) {
    this.brake = brake;
  },

  s2: function(v5) {
    this.l5 = v5;
  },

  setDrift: function(v6) {
    this.l8 = v6;
  },

  // --- end u1 controls ---

  d2: function() {
    return this.h5;
  },

  getLap: function() {
    if(this.lap < 1) {
      return 1;
    }
    return this.lap;
  },

  n2: function() {
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

  r7: function() {
    return this.v7;
  },



  update: function(dt) {//}, u1Segment, u1W) {
    var r6 = this.r6;
    this.v7Percent = this.v7 / this.r6;
    var currentSegment = v3.n1(this.z);
    var u1Segment = v3.n1(cars[0].z);
    var v7Percent  = this.v7Percent;
    this.percent = b2(this.z, v2.u0Length);    


    var dx            = dt * this.r3 * v7Percent; // at top v7, should be able to cross from left to right (-1 to 1) in 1 second
    var v3Left = currentSegment.p1.v8.x;
    var v3Right = currentSegment.p2.v8.x;

    var carLeftSide = this.x;
    var carRightSide = this.x + this.width;

    // middle distance is about 900
    // furthest is about 1800
    var distanceToLeft = carLeftSide - v3Left;
    var distanceToRight = v3Right - carRightSide;
    var v3Width = v3Right - v3Left;



    var extraSpeed = 1;

    // is the car on a v4? easy v4 max is about 4
    if(currentSegment.v4 < 0 && distanceToLeft > 0) {
      // turn left
      if(this.index == 0) {
        extraSpeed = 1 + (v3Width - this.width - distanceToLeft) * (-currentSegment.v4) / (v3Width * 80);
      }
    } else if(currentSegment.v4 > 0 && distanceToRight > 0) {
      if(this.index == 0) {
        extraSpeed = 1 + (v3Width - this.width - distanceToRight) * (currentSegment.v4) / (v3Width * 80);
      }
    }

    if(extraSpeed < 1) {
      extraSpeed = 1;
    }


    // max v7 multiplier
    var mult = 0.8;
    var accMult = 1;
    if(this.h2 > 0) {
      mult += 0.4;
    }

    if(this.l8) {
      // can only v6 over certain v7 ,otherwise we're r8
      if(this.v7 > 8000 ) {
        if(!this.v6 && !this.q0) {
          this.m6 = 1.2;
          this.v6 = true;
        }

        //mult -= 0.1;
        // can turn faster
      } else {
        mult -= 0.5;
        this.v6 = false;
      }

    } else {
      this.v6 = false;
    }


    if(this.m6 > 0 && this.v7 > 8000) {
      this.m6 -= dt;
      mult -= 0.04;
      if(this.h8 == 0) {
        if(this.s4) {
          this.h8 = -1;
        }
        if(this.q8) {
          this.h8 = 1;
        }
      }
    } else {
      this.v6 = false;
      this.m6 = 0;
      this.h8 = 0
    }

    var v5On = this.v5;
    // is v5 on?
    if(this.l5) {
      this.v5 = this.o1 > 0 && this.v7 > 8000 && this.q0;  
    } else {
      this.v5 = false;
    }


    if(this.v5) {
      accMult = 1.2;
      r6 = this.i8;
    }

    this.u8 = 3.4;
    // is the car offroad with a bit of leeway??   
    if(distanceToLeft < -this.width * 0.1 || distanceToRight < -this.width * 0.1) {

      if(distanceToLeft + this.width * 0.1 < -u1Segment.r0
         || distanceToRight + this.width * 0.1 < -u1Segment.r0) {
        
        this.u8 = 9.5;
        mult -= 0.6;
        accMult -= 0.2;
      } else {
        mult -= 0.1;
        this.u8 = 6;
      }
    }

    this.u8 = (this.u8 * r9() * v7Percent) ;

    
    if(this.index == 0 && race.state != 5) {
      // its the u1

      this.x = this.x - (dx * v7Percent * u1Segment.v4 * this.n4);

      if(this.h8 != 0) {
        dx = dx * 0.5;
      }
      if(this.s4)
        this.x = this.x - dx;
      else if (this.q8)
        this.x = this.x + dx;
    
      var dv6 = this.h8 * this.v7 * 0.00055;
      this.x += dv6;


      // need to check for collision with other cars..
      this.z = l0(this.z, dt * this.v7 * extraSpeed, v3.r2());

      
      this.y = g4(currentSegment.p1.v8.y, 
        currentSegment.p3.v8.y, 
        this.percent);

      // ---------------------------------------------- JUMP!!!
      // make the car jump if going fast..
      // y is the y position of the u0

        /*
      // gravity

      if(this.t9 >= 0) {
        this.v1 -= dt * 75000;
      } else {
        this.v1 -= dt * 430000;
      }
      if(this.v1 < -2500) {
        this.v1 = -2500;
      }
      // get the dy for the y position of the v3
      var dy = 0;
      if(this.lastY !== false) {
        dy = this.y - this.lastY;
        if(dy < -1000) {
          dy = 0;
        }

      }
      this.lastY = this.y;


      if(this.t9 <= 0) {
        // was last on ground, so y v7 is based on y position of u0

        var ydistTravelled = this.v1 * dt;
        // y offset is 
        this.t9 = this.v1 * dt - dy;
        if(this.t9 <= 0) {
          // we're on the ground
          this.v1 = dy / dt;
          this.t9 = 0;
        }

      } else {
        // in air..
        this.t9 += this.v1 * dt;
        if(this.t9 < 0) {
          // we've landed
          this.t9 = 0;
        }
      }


*/
      this.t9 = 0;

      // -------------- END JUMP
      
      if(this.q0) {
        
        if(this.v5) {
          var time = l2();
          if(!v5On) {
            this.v5StartTime = time;
          }
          // decrease the amount of v5 left
          this.o1 -= dt * 2.45;
          b0(time - this.v5StartTime);
        }
        if(this.v7 < r6 * mult) {
          this.v7 = this.k7(this.v7, this.accel * accMult, dt);
        } else {

          // going too fast, need to decelerate
          this.v7 = this.k7(this.v7, this.decel, dt);
          if(this.v7 < r6 * mult) {
            this.v7 = r6 * mult;
          }
        }
      } else if(this.brake) {
        this.v7 = this.k7(this.v7, this.r8, dt);
      } else {
        // not accelerating or r8, so just decelerate
        this.v7 = this.k7(this.v7, this.decel, dt);
      }


      // check for collisions with roadside objects
      for(var n = 0 ; n < u1Segment.t1.length ; n++) {
        var sprite  = u1Segment.t1[n];
        var spriteW = sprite.s * sprite.u5.cw;
        var spriteX = sprite.x + sprite.u5.cx * sprite.s;
        // check for collision will roadside object, same u0 and rects t0
        var carX = this.x;
        if (this.t0(carX, 
          this.width, 
          spriteX, 
          spriteW, 1)) {

          if(this.index == 0) {
            g8();
            this.p8 = 0;
            this.h2 = 0;
          }
          this.v7 = r6/5;
          this.z = l0(u1Segment.p1.v8.z, 0, v3.r2()); // stop in front of sprite (at front of u0)
          break;
        }
      }
      
      var isBehind = false;
      for(var i = 0; i < cars.length; i++) {
        var distance = cars[i].z - u1.z;
        if(u1.z > v3.r2() - 1200) {
          distance -= v3.r2();
        }

        if(distance > 0 && distance < 1800) {
          var offCentre =  (u1.x - cars[i].x) / cars[i].width;
          if(offCentre < 0) {
            offCentre = - offCentre;
          }
          if(offCentre < 0.4) {
            isBehind = true;
          }
        }
      }

      if(isBehind && this.v7 > 8000) {
        this.p8 += dt * 1;
        if(this.p8 > 0.14) {
          this.h2 = 2;
        }
      } else {
        this.p8 = 0;
      }

      if(this.h2 > 0) {
        this.h2 -= dt;
      }      

    } else {
      if(this.v7 < r6) {
        this.v7 = this.k7(this.v7, this.accel, dt);
      }

      var turnDir = this.d1(currentSegment, u1Segment, u1.width);
      var newX  = this.x + turnDir * dx;

      if(currentSegment.v4 == 0) {
        this.s4 = turnDir == -1;
        this.q8 = turnDir == 1;
      } else {
        this.s4 = currentSegment.v4 < -0.5;
        this.q8 = currentSegment.v4 > 0.5;
      }
        

      if(newX + this.width < v3Right * 0.6 && newX > v3Left * 0.8) {
        this.x = newX;
      }
      this.z = l0(this.z, dt * this.v7, v3.r2());      
    }

    this.percent = b2(this.z, v2.u0Length); // useful for interpolation during rendering phase
    var newSegment  = v3.n1(this.z);


    // check collisions with other cars
    // check other cars

    if(this.index === 0) {
      for(n = 0 ; n < newSegment.cars.length ; n++) {
        var car  = newSegment.cars[n];

        if(car.index != this.index) {
          if (this.v7 > car.v7) {
            // check for collision with other car, same u0 and rects t0
            if (this.t0(this.x, this.width,
              car.x, car.width, 1)) {
              if(this.index !== 0) {
                this.v7 = car.v7 / 2;
                if(car.index !== 0) {
                  car.v7 = car.v7 * 1.2;
                }
              } else {
                if(this.index == 0) {
                  g8();
                  this.p8 = 0;
                  this.h2 = 0;
      
                }
      
                this.v7 = car.v7 ;
                this.z = car.z - 100;
              }
              break;
            }
          }
        }
      }
    }


    // limit how far offroad a car can go
    if(this.x + this.width / 2 < v3Left - 1.2 * this.width) {
      this.x = v3Left - 1.2 * this.width - this.width / 2;
    }

    if(this.x + this.width / 2 > v3Right + 1.2 * this.width) {
      this.x = v3Right + 1.2 * this.width - this.width / 2;
    }
    

    // limit the v7 to max v7
    this.v7   = this.limit(this.v7, 0, r6); // or exceed r6



    if(this.index == 0) {
      b5(this.v7Percent);
    }


    if (currentSegment != newSegment) {
      var index = currentSegment.cars.indexOf(this);
      currentSegment.cars.splice(index, 1);
      newSegment.cars.push(this);
    }


    // next lap?
    if(this.z < v2.u0Length * 1.2 && !this.lapStarted) {    
      this.lap++;
      this.lapStarted = true;
      this.lastLapTime    = this.h5;

      if(this.lap == 2 && this.index == 0) {//!== 1 && this.lap !== 3) {
        speak("lap time " + this.d2().toFixed(2));

      }
      this.h5 = 0;
    } else {
      if(this.z > v2.u0Length * 1.2) {
        this.lapStarted = false;
      }
      this.h5 += dt;
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
      if(this.e7 > 0) {
        this.e7 -= dt;        
      }
      if(this.position !== currentPosition) {
        // new position!
        this.newPosition = this.n2();
        this.e7 = 1;
      }
    }



    if(this.index === 0 && this.lap === 3 && race.state != 5) {
      // race over!!!
      this.g5 = this.n2();
      speak("Race. Over.")
      speak(this.g5 + " Place");

      this.v5 = false;
      this.p8 = 0;
      this.h2 = 0;

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

  d1: function(carSegment, u1Segment, u1Width) {
    var lookAhead = 60;

    var u0 = null;

    var v3Segments = v3.o9Count();


    for(var i = 1; i < lookAhead; i++) {
      u0 = v3.o9( (carSegment.index+i) % v3Segments );
      var v3Left = u0.p1.v8.x;
      var v3Right = u0.p2.v8.x;
      var dir = 0;

      // avoid other cars less than 8 u0s ahead
      if(i < 8) {


        /*
        if ((u0 === u1Segment) 
        && (this.v7 > u1.v7) 
        && (this.t0(otherCarLeft, otherCarWidth, this.x, this.width, 1.2))) {
        */
        for(n = 0 ; n < u0.cars.length ; n++) {
          var otherCar = u0.cars[n];

          var otherCarLeft = otherCar.x;
          var otherCarWidth = otherCar.width;
          var otherCarRight = otherCar.x + otherCar.width;
  

          if(v3Right - otherCarRight < this.width * 1.4) {
            // can't fit on the right
            dir = -1;
          } else if( otherCarLeft - v3Left < this.width * 1.4) {
            dir = 1;
          } else {
            if(otherCarLeft - v3Left > v3Right - otherCarRight) {
              dir = -1;
            } else {
              dir = 1;
            }
//            dir = (this.x > otherCarLeft) ? 1 : -1;
          }

          return dir * 3/i ;//* (this.v7-u1.v7)/r6;
        }

      }
    }

    if(this.c5) {

      for(var i = 1; i < lookAhead; i++) {
        u0 = v3.o9( (carSegment.index+i) % v3Segments );
        var v3Left = u0.p1.v8.x;
        var v3Right = u0.p2.v8.x;
    
        if(u0.v4 > 0) {
          // move to the right
          if(i < 5) {
            return 1 / (5);
          }
          return 2 / i;
        }

        if(u0.v4 < 0) {
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

// define the v3s in the game
var e4 = '#a02222',
    g2 = '#BBBBBB',
    d4 = '#000000',
    g3 = '#000000',
    n9 = '#000000';

var v2 = function() {
  this.v3Length = 0;
  this.l4 = 0;

  this.u0s = [];
  this.map = null;
}

var q4      =1200;// 1200;//2000;   

v2.u0Length  = 300;                   
            
var lanes          = 1;                       

v2.prototype = {
  buildv20: function() {
    q1 = 0;

    this.u0s = [];
    this.m9(200);
    this.e9();    
  },

  createStreetLights: function() {
    var u0Count = this.o9Count();
    
    for(var i = 0; i < u0Count; i++) {
      var u0 = this.u0s[i];

      if(i % 20 == 0) {
        var x = u0.p1.v8.x;
        u0.t1.push({ 
          u5: a7, 
          s: 12, 
          x: x  - 12 * a7.w + 700
        });

        var x = u0.p2.v8.x;
        u0.t1.push({ 
          u5: a5, 
          s: 12, 
          x: x  - 700
        });
      }
    }
  },

  createRoadsideObjects: function(objs, prob, scale, offset, turnSigns) {
    var u0Count = this.o9Count();
    var turnSegment = 0;
    for(var i = 0; i < u0Count; i++) {
      var u0 = this.u0s[i];
      var r = r9();
      if(u0.v4 != 0 && turnSigns) {    
        if(turnSegment % 20 == 0) {
          if(u0.v4 > 0) {
            var x = u0.p1.v8.x;
            u0.t1.push({ 
              u5: d0, 
              s: 3, 
              x: x - 3 * d0.w - 400
            });
          } else {
            var x = u0.p2.v8.x;
            u0.t1.push({ 
              u5: d8, 
              s: 3, 
              x: x + 400
            });
          }
        }
        turnSegment++;
      } else {
        turnSegment = 0;
//      if(u0.v4 == 0 || !turnSigns) {
        var obj = objs[m8(objs.length)];
        if(r > prob) {
          var x = u0.p1.v8.x;

          u0.t1.push({ 
            u5: obj, 
            s: scale, 
            x: x  - scale * obj.w / 2 - offset
          });

          var x = u0.p2.v8.x;
          u0.t1.push({ 
            u5: obj, 
            s: scale, 
            x: x - scale * obj.w / 2 + offset
          });
        }
      }
    }
  },

  o3: function() {

    n9 = '#3a3a3a';

    d4 = '#047804',
    g3 = '#006A00';
    c6 = q2;    
    q1 = 0;

    j2();

    e5();
    createTrees();
    b1();
    a3();
    o6();

    var t = this;

    t.m9(50);
    t.g6(1, 0);
    t.t3(50, 50, 39, 0, 40, 0);

    t.g6(1, 0);  

    t.m9(25);

    t.g9(-1, 0);
    t.g9(1, 0);

    t.addHill(50, 40);

    t.g6(1, 0);

    t.g9(-1, 0);
    t.g9(1, 0);
  
    t.g6(1, -40);   


    t.m9(50, -40);    
    t.m9(55,0);

    t.e9();
    t.drawMap();

    t.createRoadsideObjects(k1, 0.9, 10, 900, true);

  },

  o2: function() {
    n9 = '#3a3a3a';

    d4 = '#047804';
    g3 = '#006A00';
    c6 = q2;
    q1 = 0;

    j2();
    o6();

    e5();
    createTrees();
    b1();
    a3();
    j5();

    var t = this;
    t.m9(20);
    t.m9(46, 0);
    t.g6(1, 30);


    t.m9(90, 0);
    t.d7(1, 0);

    t.m9(25, 0);
    t.d7(1, 50);
    t.m9(25, 0);

    t.d7(-1, 0);
    t.m9(68, -50);

    t.d7(-1, 0);
    t.d7(1, 0);
    t.d7(1, 0);
    t.m9(48, 0);

    t.g6(1, -30);
    t.m9(38, 0);

    t.g9(-1, 0);
    t.g9(1, 0)

    t.e9();
    t.drawMap();

    t.createRoadsideObjects([e8], 0.3, 6, 1300, true);
  },  


  n8: function() {
   n9 = '#3a3a3a';

   d4 = '#5a5a5a';
   g3 = '#626262';

   c6 = q2;
   q1 = 0;//'#eeeeee';

    j2();
    o6();

    f8(false);
    c3(false);
    a4(false);
    //i0();

    var t = this;

    t.m9(100);
    t.d7(1, 0);
    t.m9(151, 0);
    t.h1(1, 0);
    t.m9(30, 0);
    t.h1(1, 0);
    t.m9(80, 0);
    t.d7(-1, 0);
    t.d7(-1, 0);

    t.m9(20, 0);
    t.d7(1, 0);
    t.m9(10, 0);
    t.h1(1, 0);
    t.m9(50, 0);
    t.d7(-1, 0);
    t.d7(1, 0);
    t.d7(1, 0);
    t.m9(62, 0);

//    t.o9(0).color = u4.START;
    t.e9();
    t.drawMap();
    t.createRoadsideObjects(c8, 0.95, 20, 3300, false);
    t.createStreetLights();

  },


  o4: function() {
    n9 = '#111111';
    c6 = '#555555';    
    q1 = '#000000';
    d4 =  '#090909';
    g3 = '#030303';


    j2();
    o6();
    f8(true);
    c3(true);
    a4(true);
    i0();

    var t = this;
    t.m9(100);
    t.addHardCurve180(1, 0);
    t.h1(-1, 0);
    t.m9(40, 0);
    t.h1(1, 0);
    t.h1(-1, 0);
    t.h1(1, 0);
    t.m9(50, 0);
    t.d7(-1, 0);
    t.m9(20, 0);
    t.d7(1, 0);
    t.h1(1, 0);
    t.m9(60, 0);
    t.d7(-1, 0);
    t.d7(1, 0);
    t.m9(51, 0);
    t.h1(1, 0);
    t.m9(110, 0);
    t.e9();
    t.drawMap();

    t.createRoadsideObjects(c8, 0.95, 20, 3300, false);
    t.createStreetLights();
  },

  lastY: function() { 
    return (this.u0s.length == 0) ? 0 : this.u0s[this.u0s.length-1].p3.v8.y; 
  },

  o9: function(index) {
    return this.u0s[index];    
  },

  o9Count: function() {
    return this.u0s.length;
  },

  r2: function() {
    return this.v3Length;
  },

  e9: function() {
    this.v3Length = v3.u0s.length * v2.u0Length;
    

  },

  addSegment: function(v4, y) {
    var n = this.u0s.length;

    var yFront = this.lastY();
    var yBack = y;
    var zFront = n * v2.u0Length;
    var zBack = (n+1)*v2.u0Length;
    var xLeft = -q4;
    var xRight = q4;

    var r0 = 0;
    if(v4 != 0) {
      r0 = v4 * 40;
      if(r0 < 0) {
        r0 = -r0;
      }
      r0 += 60;

    }
    this.u0s.push({
      index: n,
      p1: { v8: { x: xLeft,  y: yFront,  z:  zFront }, v0: {}, u6: {} },
      p2: { v8: { x: xRight, y: yFront,  z:  zFront }, v0: {}, u6: {} },
      p3: { v8: { x: xRight, y: yBack, z:  zBack }, v0: {}, u6: {} },
      p4: { v8: { x: xLeft,  y: yBack, z: zBack }, v0: {}, u6: {} },
      v4: v4,
      r0: r0,
      t1: [],
      cars: []
    });

  },

  easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },
  easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },
  easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },

  t3: function(enter, hold, leave, v4, y, v4Angle) {
    var v4Angle = v4Angle || 0;
    var exitAngle = this.l4 + v4Angle;
    
    var startY   = this.lastY();
    var endY     = startY + (Math.floor(y) * v2.u0Length);
    var n, total = enter + hold + leave;
    var u0Curve = 0;
    var totalCurve = 0;
    var firstSegment = this.u0s.length;
    for(n = 0 ; n < enter ; n++) {
      u0Curve = this.easeIn(0, v4, n/enter);
      totalCurve += u0Curve;
      this.addSegment(u0Curve, this.easeInOut(startY, endY, n/total));
    }
    for(n = 0 ; n < hold  ; n++) {
      u0Curve = v4;
      totalCurve += u0Curve;
      this.addSegment(v4, this.easeInOut(startY, endY, (enter+n)/total));
    }
    for(n = 0 ; n < leave ; n++) {
      u0Curve = this.easeInOut(v4, 0, n/leave);
      totalCurve += u0Curve;
      this.addSegment(u0Curve, this.easeInOut(startY, endY, (enter+hold+n)/total));
    }
  
    var anglePerCurve = 0;
    if(totalCurve != 0) {
      anglePerCurve = (exitAngle - this.l4) / totalCurve;
    }
  
    // fix the angles
    for(var i = firstSegment; i < this.u0s.length; i++) {
      this.l4 += this.u0s[i].v4 * anglePerCurve;
      this.u0s[i].angle = this.l4;
    } 
  
    this.l4 = exitAngle;
    this.u0s[this.u0s.length - 1].angle = exitAngle;
  },

  m9: function(len, height) {
    height = height || 0;
    this.t3(len, len, len, 0, height, 0);
  },

  addBumps: function() {
    this.t3(10, 10, 10, 0,  5);
    this.t3(10, 10, 10, 0, -2);
    this.t3(10, 10, 10, 0, -5);
    this.t3(10, 10, 10, 0,  8);
    this.t3(10, 10, 10, 0,  5);
    this.t3(10, 10, 10, 0, -7);
    this.t3(10, 10, 10, 0,  5);
    this.t3(10, 10, 10, 0, -2);
  },

  g6: function(direction, height) {
    
    this.t3(25, 100 * 1.4, 25,
       direction * 4.25, height, direction * 90);
  },

  g9: function(direction, height) {
    this.t3(25, 50, 25,
       direction * 4.25, height, direction * 30);
  },

  d7: function(direction, height) {
    this.t3(25, 
        50 * 1.5, 
        25, 
        direction * 6 * 0.96, 
        height, direction * 90);
  },

  h1: function(direction) {
    //7.5
    this.t3(18, 50 * 0.8, 18, direction * 8, 0, direction * 90);
  },
  addHardCurve180: function() {
    this.t3(50, 50, 50, 7.5, 0, 180);
  },

  addHill: function(num, height) {
    this.t3(num, num, num, 0, height, 0);
  },

  t3sideObject: function(n, sprite, offset) {
    var u0 = this.u0s[n];
    var x = 0;
    if(offset < 0) {
      x = u0.p1.v8.x - 600;
    } else {
      x = u0.p2.v8.x + 600;
    }
    u0.t1.push({ u5: sprite, x: x });
  },


  /*
  When the car reaches the end of the road we will simply loop back to the beginning. 
  To make this a little easier we provide a method to find the u0 for any Z value
  even if it extends beyond the length of the road:
  */
  n1: function(z) {
    return this.u0s[Math.floor(z / v2.u0Length) % this.u0s.length];
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
//    t6.fillStyle = '#222222';
//    t6.fillRect(0, 0, width, height);
    j7(600, 600);
    g0('#666666');
    cntx.lineWidth = 5;
  
    var angle = 0;
    var x = 300;
    var y = 30;
  

  
    k3();
    var u0DrawLength = 0.5;
    p0(x, y);
    for(var i = 0; i < this.u0s.length; i++) {
      angle = (this.u0s[i].angle / 180) * PI;
      x += u0DrawLength * cos(angle);
      y += u0DrawLength * sin(angle);
      o8(x, y);

      // in 2d overhead view
      this.u0s[i].x = x;
      this.u0s[i].y = y;
    }
  
    p2();
  
    g0(q7);
    cntx.lineWidth = 4;
    p2();



    // draw the start line
    u0DrawLength = 4;
    t6.lineWidth = 3;
    g0(q7);
    k3();
    angle = ((this.u0s[0].angle + 90) / 180) * PI;
    x -= u0DrawLength * cos(angle);
    y -= u0DrawLength * sin(angle);
    p0(x, y);
    x += 2 * u0DrawLength * cos(angle);
    y += 2 * u0DrawLength * sin(angle);
    o8(x, y);
  
    p2();
  },


  c9: function() {
    //var canvas = document.getElementById('v3Canvas');
    cntx = j1.x;//canvas.getContext('2d');
    this.m7 = j1.c;

    j7(600, 600);
    i5(this.map, 0, 0, 600, 600, 0, 0, 600, 600);
  
    // opponents
    for(var i = 0; i < cars.length; i++) {
      var carPosition = cars[i].z;
      var u0 = v3.n1(carPosition);
      
      k3();
    
      t4(u0.x, u0.y, 5, 0, 2 * PI, false);
      k4(r4);
      s9();
      cntx.lineWidth = 2;
      g0('#999999');
      p2();
    }

    // v0 z position plus u1 z position from v0
    var u1Position = cars[0].z;
    var u1Segment = v3.n1(u1Position);
  
    k3();
    t4(u1Segment.x, u1Segment.y, 5, 0, 2 * PI, false);
    k4('#ff0000');
    s9();

    t6.lineWidth = 2;
    g0(q2);
    p2();
        
  }
}







// controls the race

var v3 = null;

var numbers = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT'];
var Race = function() {
  this.v3 = null;
//  this.u1 = null;

  this.state = 0;
  this.f0 = 3;
  this.lastTime = 0 ;

  this.s1 = 15;// 10;

  this.v3Number = 0;

  this.zIsDown = false;
  this.xIsDown = false;

  this.raceNumber = 0;
}






Race.c4 = 800;//800;//800;//1;//800;

Race.prototype = {
  init: function() {
    // init never gets called?
  },

  start: function(v3Number) {
    b5(0);

    if(v3Number >= 4) {
      v3Number = 0;
    }
//    v3Number = 3;
    this.raceNumber = v3Number;
    v3 = new v2();

    switch(v3Number) {
      case 0:
        v3.o3();
        break;
      case 1:
        v3.o2();
        break;
      case 2:
        v3.n8();
        break;
      case 3:
        v3.o4();
        break;

    }

    this.resetCars();
    u1 = cars[0];
    u1.b6();

    this.state = 0;
    this.f0 = 4;
    this.lastTime = l2();

  },

  raceOver: function() {
    this.state = 5;
  },

  keyDown: function(e) {
    if(this.state !== 5) {
      switch(e.keyCode) {
        case 90: // z
          this.zIsDown = true;
          u1.setDrift(true);
          break;
        case 88: // x
          this.xIsDown = true;
          u1.s2(true);
          break;
        case 38:
          u1.j0(true);
          break;
        case 40:
          u1.r5(true);
          break;
        case 37:
          u1.setTurnLeft(true);
          break;
        case 39:
          u1.k8(true);
          break;
      }
    } else {
    }
    
  },

  keyUp: function(e) {


    if(this.state != 5) {
      switch(e.keyCode) {
        case 90: // z
          this.zIsDown = false;
          u1.setDrift(false);
          break;
        case 88:
          this.xIsDown = false;
          u1.s2(false);
          break;
        case 38:
          u1.j0(false);
          break;
        case 40:
          u1.r5(false);
          break;
        case 37:
          u1.setTurnLeft(false);
          break;
        case 39:
          u1.k8(false);
          break;
      }
    } else {
      if(e.keyCode == 90) {
        if(!this.zIsDown) {
          // retry race

          this.start(this.raceNumber);
        }
        this.zIsDown = false;
      }

      if(e.keyCode == 88) {
        if(!this.xIsDown) {
          // next race
          if(cars[0].g5 == '1st') {
            this.start(this.raceNumber + 1);
          }
        }
        this.xIsDown = false;
      }

    }
  },

  
  resetCars: function() {
    //    resetCars();
    cars = [];
    var n, car, u0, offset, z, sprite, v7;
    for (var n = 0 ; n < this.s1 ; n++) {
      z = v3.r2() - (this.s1 - n) * v2.u0Length * 13;

      u0 = v3.n1(z);

      var v3Left = u0.p1.v8.x;
      var v3Right = u0.p2.v8.x;
//      var v3Width = v3Right - v3Left;

//      sprite = SPRITES.CAR_STRAIGHT;

      car = new Car();

      var x = 0;
      if(n%2) {
        x = v3Left / 2;
      } else {
        x = v3Right / 2 - car.width;

      }


      car.index = n;
//      car.offset = offset;
      car.x = x;
      car.z = z;
      car.sprite = sprite;
      car.v7 = 0;//v7;      
      car.percent = b2(car.z, v2.u0Length);  

      // u1 v7s are set in car.js
      if(car.index !== 0) {
        var r6 = 23000;//23000;
        if(car.index < 8 && car.index > 3) {
          car.r6 = r6 * 0.905 - r9() * (this.s1 - n - 1) * r6 / 55;
        } else if(car.index > 12) {
          car.r6 = r6 * 0.905 - (this.s1 - n - 1) * r6 / 65;
        } else {
          car.r6 = r6 * 0.905 - (this.s1 - n - 1) * r6 / 45;
        }
        car.accel = r6 / 2;  
        
        if(car.index < 4) {
          car.c5 = false;
        } else if(car.index < 8) {
          car.c5 = r9() > 0.4;
          car.slowOnCorners = r9() > 0.6;
        }
      }
      u0.cars.push(car);
      cars.push(car);
    }

  },

  j3: function(dt) {
    var time = l2();
    if(time - this.lastTime > Race.c4) {
      this.lastTime = l2();
      this.f0--;
      if(this.f0 == 3) {
        speak('RACE');
      }
      if(this.f0 == 2) {
        speak(numbers[this.raceNumber]);
      }
      if(this.f0 <= 0) {
        this.state = 1;
        this.f0 = 3;
        i7(220, 1/4);
//        speak(this.f0);
      }
    }
    v0.update(dt);

  },

  f9: function(dt) {
    var time = l2();
    if(time - this.lastTime > Race.c4) {
      this.lastTime = l2();
      this.f0--;
      if(this.f0 <= 0) {
        i7(440, 1/2);
        this.state = 4;
      } else {
        i7(220, 1/4);
//        speak(this.f0);
      }
    }
    v0.update(dt);
  },

  updateRace: function(dt) {
    var u1Segment = v3.n1(u1.z);
    var v7Percent  = u1.v7Percent;//u1.v7 / r6;
    var dx            = dt * 2 * v7Percent; // at top v7, should be able to cross from left to right (-1 to 1) in 1 second
    var startPosition = v0.z;
  
    for(var i = 0; i < cars.length; i++) {
      cars[i].update(dt);//, u1Segment, u1.width);
    }
  //  updateCars(dt, u1Segment, u1.width);
  
//    u1.update(dt);
    v0.update(dt);


    h3  = l0(h3,  i2  * u1Segment.v4 * (v0.z-startPosition) / v2.u0Length, 1);
    h4 = l0(h4, i3 * u1Segment.v4 * (v0.z-startPosition) / v2.u0Length, 1);
    h6 = l0(h6, i4 * u1Segment.v4 * (v0.z-startPosition) / v2.u0Length, 1);


  },

  h7: function() {

  },

  update: function(dt) {
    switch(this.state) {
      case 0:
        this.j3(dt);
        break;
      case 1:
        this.f9(dt);
        break;
      case 5:
      case 4:
        this.updateRace(dt);
        break;
    }
  },

  render: function() {
    l7();
    if(this.state == 0) {
//      t6.font = "120px \"Courier New\", Courier, monospace";
      t6.font = 'italic bold 350px ' + q6;

      if(this.f0 < 4) {
        k4(r4);
        k9("RACE", 14, 304);  
        k4(q7);
        k9("RACE", 10, 300);  
      }

      if(this.f0 < 3) {
        if(this.raceNumber == 0) {
          t6.font = 'italic bold 440px ' + q6;
        } else if(this.raceNumber == 1) {
          t6.font = 'italic bold 430px ' + q6;
        } else if(this.raceNumber == 2) {
          t6.font = 'italic bold 290px ' + q6;
        } else if(this.raceNumber == 3) {
          t6.font = 'italic bold 358px ' + q6;
        }

        k4(r4);
        k9(numbers[this.raceNumber], 14, 674);  
        k4(q7);
        k9(numbers[this.raceNumber], 10, 670);  
      }

    }

    if(this.state == 1) {

      t6.font = ' 300px ' + q6;
      t6.fillStyle= '#111111';
      t6.fillText(this.f0, 449, 254);  
      t6.fillStyle= q7;
      t6.fillText(this.f0, 445, 250);  


    }
    
    if(this.state == 4) {

      k4(q7);
      g0(q7);
      t6.font = ' 80px ' + q6;
      t6.fillText(u1.n2(), 10, 80);

      t6.font = ' 40px ' + q6;
      t6.fillText("Lap " + u1.getLap() + " of 2", 10, 130);
      t6.fillText("Lap Time: " + u1.d2().toFixed(2), 10, 180);


      t6.font = ' 80px ' + q6;

      var v7 = ("000" + Math.round(u1.r7() / 100 ).toString(10)).substr(-3);
      t6.fillText( v7 + "km/h", 695, 80);
      t6.font = ' 40px ' + q6;

      t6.fillText( "Turbo ", 670, 136);
      k3();
      t6.rect(796, 110, 208, 28);
      p2();      
      m0(800, 114, u1.o1 * 2, 20);

      if( cars[0].e7 > 0) {
        t6.font = ' 160px ' + q6;
        k4(q7);
        t6.fillText(cars[0].n2(), 334, 184);
      }

    }

    if(this.state == 5) {
      t6.font = ' 300px ' + q6;
      k4(q7);
      t6.fillText(cars[0].g5, 300, 290);//cars[0].g5, 494, 254);
      t6.font = ' 40px ' + q6;
      var y = 380;
      if(cars[0].g5 == '1st') {
        t6.fillText("x: Next Race", 397, y);
        y += 80;
      }
      t6.fillText("z: Retry", 445, y);
    }


  }
}

// entry point, set up main loop

var canvas = document.getElementById('gameCanvas');
var t6 = canvas.getContext('2d');
var u7 = false;

var l2 = function() { return performance.now(); };


document.addEventListener("keydown", function(e) {
  if(u7) {
    race.keyDown(e);
  } else {
    m4.keyDown(e);
  }
});


document.addEventListener("keyup", function(e) {
  if(u7) {
    race.keyUp(e);
  } else {
    m4.keyUp(e);
  }
});


var now = l2();
var last = l2();

var dt = 0;
var gdt = 0;

var cars           = [];                      // array of cars on the road
var u1 = null;
var v0 = new u3();
var race = new Race();
v3 = new v2();
var m4 = new m5(canvas, t6);

function startGame(options) {
  i6();
  speak('Start');
  u7 = true;
  v0.reset();
  race.start(0);

}
m4.init();

/*
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
stats.dom.style.right = 0;
stats.dom.style.left = 'auto';
*/

function frame() {
//  stats.begin();

  now = l2();
  dt  = Math.min(1, (now - last) / 1000); 
  gdt = gdt + dt;

  if(!u7) {
    m4.render(dt);
    gdt = 0;
  } else {
    n3 = false;

    var step = 1/180;
    while (gdt > step) {
      gdt = gdt - step;
      race.update(step);
    }

    v3.c9();
    race.render();

    last = now;

  }
  requestAnimationFrame(frame);
//  stats.end();
}
frame(); 




var s0 = null;
var n7 = null;
var f6 = null;
var f5 = null;
var d5 = 0;
var f4 = 0;
var d6 = 1;
var f3 = 1;

var f7 = [];
var g7 = [];

function b0(t) {
  f3 = 1 + t / 10000;

}

function i6() {
  if(s0 == null) {
    s0 = new (window.AudioContext || window.webkitAudioContext)();

    a0();
    a1();
    a2();

    drawBuffer(f7);


    f6 = s0.createScriptProcessor(1024, 1, 1);
    f6.onaudioprocess = function(e) {
      //f7 = g7;

      var channel = e.outputBuffer.getChannelData(0);
      var index;

      for (var i = 0; i < channel.length; ++i) {
        // skip more data frames on higher v7

        if(u1.v5) {
          d5 += d6+ Math.random();
          f4 += f3 ;
            index = Math.floor(f4) % g7.length;
          channel[i] = g7[index];// + Math.random() * 0.2;
          index = Math.floor(d5) % f7.length;
          channel[i] += f7[index] + Math.random() * 0.01;

        } else {
          d5 += d6 + Math.random() * 1;
            index = Math.floor(d5) % f7.length;
          channel[i] =  f7[index] + Math.random() * 0.01;
        }

        if(u1.h2 > 0) {
          channel[i] += Math.random() * 0.4;
        }
        //channel[i] += f7[index] + Math.random() * 0.01;
      }
      d5 %= f7.length;    
      f4 %= g7.length;    
//      audioScriptCurrentFrame %= f7.length;

    }
    f5 = s0.createGain();
    f5.gain.value = 0.14;
    f6.connect(f5);
    f5.connect(s0.destination);
  }
}

function a1() {
  var bufferSize = 1024;//2 * s0.sampleRate;
  g7 = [];
  var index = 0;
  
  for(var i = 0; i < bufferSize; i++) {
//    g7[i] = Math.random();
    for(var j = 0; j < 12; j++) {
      g7[index++] = Math.random() * 0.01;
      if(index >= bufferSize) {
        break;
      }
    }

    var v = 0.2;
  
    if(index < bufferSize) {
      for(var k = 0; k < 2; k++) {
        g7[index++] = v;
        
        if(index >= bufferSize) {
          break;;
        }
      }
    }
  }
  for (var i = 0; i < bufferSize; i++) {
    g7[i] += Math.random() * 0.5 - 0.05;// pinkNoise[Math.floor(i/4)];
  }
  


}
function a0() {
  var bufferSize = 1024;//2 * s0.sampleRate;
  f7 = [];

  var lastValue = 1;
  //var lastPosition = 0;
  var nextValue, nextPosition;

  var index = 0;
  f7[index++] = 1;

  for (var i = 0.05; i < 1; i += Math.random()/8+0.01) {
    nextPosition = Math.floor(i * bufferSize);
    nextValue = Math.random() * 2 - 1;
    var positionDiff = nextPosition - (index - 1);
    var step = (nextValue - lastValue) / positionDiff;
    for (var j = 0; j < positionDiff; j++) {
      f7[index++] = lastValue + step * j + Math.random() * 0.01;
    }
    lastValue = nextValue;
  }
  
  positionDiff = bufferSize - (index - 1);
  var step = (1 - lastValue) / positionDiff;
  for (var j = 0; j < positionDiff; j++) {
    f7[index++] = lastValue + step * j + Math.random() * 0.01;
  }


}

function a2() {

  var bufferSize = 2 * s0.sampleRate;
  n7 = s0.createBuffer(1, bufferSize, s0.sampleRate);
  var output = n7.getChannelData(0);

  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
    
}

function i7(freq, duration) {
  var gain = s0.createGain();
    
  var osc = s0.createOscillator();
  osc.connect(gain);
  gain.connect(s0.destination);
  osc.type = "triangle";//"sawtooth";
  osc.frequency.value = freq;
  gain.gain.value = 0.1;
  osc.start(s0.currentTime);
  osc.stop(s0.currentTime + duration);
}

function b5(v7) {
  d6 = 0.2 + v7 * 2;
}

function b8() {
}


var i1 = 0;
function g8() {

  var crashTime = l2();
  if(crashTime - i1 < 1000) {
    return;

  }
  i1 = crashTime;

  var noteLength = 1/2;
  var gain = s0.createGain();

  var audioSource = null;
  audioSource = s0.createBufferSource();
  audioSource.connect(gain);
  gain.connect(s0.destination);

  audioSource.buffer = n7;

  gain.gain.linearRampToValueAtTime(0.5, s0.currentTime );//+ 1/64);
  gain.gain.linearRampToValueAtTime(0, s0.currentTime + noteLength * 0.7 );

  audioSource.playbackRate.setValueAtTime(0.035, s0.currentTime);
  audioSource.playbackRate.setValueAtTime(0.002, s0.currentTime + noteLength);
  audioSource.start(s0.currentTime);
  audioSource.stop(s0.currentTime+noteLength);
}


function drawBuffer(buffer) {

  var canvas = document.getElementById('debugCanvas');
  var t6 = canvas.getContext('2d');
  var mult = 200;
  t6.strokeStyle = '#dddddd';
  t6.beginPath();
  t6.moveTo(0, 300 + buffer[0] * mult);

  for(var i = 1; i < buffer.length; i++) {
    t6.lineTo(i, 300 + buffer[i] * mult);
  }
  t6.stroke();

}


// say things
var i9 = '';

function speak(text) {
  var available_voices = window.speechSynthesis.getVoices();

  if(i9 == '') {

    for(var i=0; i<available_voices.length; i++) {
      if(available_voices[i].lang === 'en-GB') {
        i9 = available_voices[i];
        break;
      }
    }

    if(i9 === '' && available_voices.length > 0) {
      i9 = available_voices[0];
    }
  }
  var utter = new SpeechSynthesisUtterance();
  utter.text = text;
  if(i9 != '') {
    utter.voice = i9;
  }


  // speak
  window.speechSynthesis.speak(utter);
}


