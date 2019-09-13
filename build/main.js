



var q7 = ' "Helvetica Neue", Helvetica, Arial, sans-serif';

var c6=0;

var u2 = { 

  LIGHT:  { road: '#3a3a3a', grass: '#047804', w0: '#a02222', lane: '#CCCCCC'  },
  DARK:   { road: '#3a3a3a', grass: '#006A00', w0: '#BBBBBB'                   },
  START:  { road: 'white',   grass: '#009A00', w0: '#BBBBBB'                     },
  FINISH: { road: 'black',   grass: 'black',   w0: 'black'                     }
};


var cntx = null;


function j7(width, height) {
  cntx.clearRect(0, 0, width, height);
}

function g1(alpha) {
  cntx.globalAlpha = alpha;
}
function m2(x, y, width, height) {
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

function t9(x,y,r,sAngle,eAngle,counterclockwise) {
  cntx.arc(x,y,r,sAngle,eAngle,counterclockwise);
}

function o9(x, y) {
  cntx.lineTo(x, y);
}
function k0() {
  cntx.closePath();
}

function s2() {
  cntx.fill();
}

function l2(t,x,y) {
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

function q1(a) {
  cntx.rotate(a);
}

function i5(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
  cntx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}


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




// constants
var l3 = 600, 
    k6 = 600,
    l8 = 2400,
    k5 = 2400,
    b4 = 1280,
    a9 = 480,
    c2 = 600,
    b9 = 600,
    j8 = l4(l3, k6),
    t8 = l4(l8, k5)
    j9 = t8.c,
    h0 = t8.x,
    e3 = l4(b4, a9),
    e2 = l4(b4, a9),
    e1 = l4(b4, a9),
    j1 = l4(c2, b9),
    a7=a5=f1=d3=b7=d8=d0=e8=0,
    c8=[],q0=0;

var r5 = '#222222';
var p8 = '#cccccc';
var q5 = '#e5e5e5';

function k9() {
  j8.x.clearRect(0,0,l3,k6);
}
function l4(width, height) {
  var c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  var x = c.getContext('2d');
  
  return { c: c, x: x };
}

var p1 = 0;
var p3 = 0;
var c1 = 0;

function j2() {
  p1 = 0;
  p3 = 0;
  c1 = 0;

  h0.clearRect(0, 0, l8, k5);

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
    o9(x + (radius) * cos(angle), y + (radius) * sin(angle));
  }
  k0();
  s2();

}
function a8() {
  // get the bounds
  var data = j8.x.getImageData(0, 0, j8.c.width, j8.c.height);      // get image data for canvas
  var buffer32 = new Uint32Array(data.data.buffer); // get a 32-bit representation
  var testX, testY;                                      // iterators
  
  var w = j8.c.width;
  var h = j8.c.height;
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
// create a sprite from the scratch canvas, put into new t8
function q4(flipH) {
  var fh = flipH || 0;

  // get the bounds
  var bounds = a8();

  if(p1 + bounds.w > l8) {
    // need to go to next line
    p1 = 0;
    p3 += c1;
    c1 = 0;
  }
  if(bounds.h > c1) {
    c1 = bounds.h;
  }

  h0.save();
  var dstX = p1;

  if(fh) {
    h0.scale(-1, 1);
    dstX = -p1 - bounds.w;
    bounds.cx = bounds.w - bounds.cx - bounds.cw;
  } 

  h0.drawImage(j8.c, bounds.x, bounds.y, bounds.w, bounds.h,
    dstX, p3, bounds.w, bounds.h);
  h0.restore();

  var result = {
    x: p1, y: p3, w: bounds.w, h: bounds.h, cx: bounds.cx, cw: bounds.cw
  }
  p1 += bounds.w + 5;
  return result;
}


// ***************** TURN ARROWS ******************** //
function e5() {
  cntx = j8.x;
  k9();

  k4('#996644');
  m2(0, 0, 200, 200);

  k4('#996644');
  m2(10, 200, 10, 10);

  k4('#996644');
  m2(180, 200, 10, 10);

  k4(p8);
  m2(10, 10, 180, 180);
  k3();
  p0(20, 100);
  o9(160, 30);
  o9(160, 170);
  o9(20, 100);
  k4('#cc2211');
  s2();

  k4(p8);
  m2(10, 10, 20, 180);

  d8 = q4();
  d0 = q4(1);
}


// ***************** BACKGROUND TREES ******************** //

function r0(width, slope) {
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

    var terPoints = r0(8, 7);
      //var terPoints = t5(width, height, height / 2, 0.6);
      var colour = m8(colours.length);
      k4(colours[colour]);
      k3();
      p0(x, 240 - terPoints[0]);
      for (var t = 1; t < terPoints.length; t++) {
        o9(x + t, 240 - terPoints[t]);
      }
      // finish creating the rect so we can fill it
      k0();
      s2();

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

    var terPoints = r0(4, 4);
      //var terPoints = t5(width, height, height / 2, 0.6);
      var colour = m8(colours.length);
      k4(colours[colour]);
      k3();
      p0(x, 240 - terPoints[0]);
      for (var t = 1; t < terPoints.length; t++) {
        o9(x + t, 240 - terPoints[t]);
      }
      k0();
      s2();
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
    o9(x + t, heightOffset - points[t]);
  }
  k0();
  s2();


  x = startX;
  k4('#224a33');
  k3();
  p0(x, heightOffset - highlightpoints[0]);
  for (var t = 1; t < highlightpoints.length; t++) {
    o9(x, heightOffset - highlightpoints[t]);
    x++;
  }

  for (var t = 1; t < highlightBackpoints.length; t++) {
    o9(x, heightOffset - highlightBackpoints[t]);

    if(r9() > 0.4) {
      x--;
    } else if(r9() > 0.4) {
      x++;
    }
  }
  k0();
  s2();  

  // highlight 2
  x = startX + 4;
  k4('#335a3a');
  k3();
  p0(x, heightOffset - highlightpoints2[0]);
  for (var t = 1; t < highlightpoints2.length; t++) {
    o9(x, heightOffset - highlightpoints2[t]);
    x++;
  }

  for (var t = 1; t < highlightBackpoints2.length; t++) {
    o9(x, heightOffset - highlightBackpoints2[t]);

    if(r9() > 0.8) {
      x++;
    } else if(r9() > 0.1) {
      x--;
    }
  }

  k0();
  s2();

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
      
      this.u5(0);
  },
  
  u5 : function(depth) {
    if (depth < 12) {
        k3();
        p0(0,0);
        o9(0,-(500)/10);

        p2();
        
        j4(0,-500/10);
        var randomN = -(r9() * 0.1) + 0.1;

        q1(randomN); 

        if ((r9() * 1) < 0.6) {
          q1(-0.35);
          cntx.scale(0.7,0.7);
          s3();
          this.u5(depth + 1);
          n0();  
          q1(0.6);
          s3();
          this.u5(depth + 1);   
          n0();        
        } else  { 
            this.u5(depth);
        }
    } else {   
          
      k4(this.o0);
      m2(0, 0, 500, 200);
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
      cntx = j8.x;
      j8.x.save();
      k9();
      tree.draw();
      var bounds = a8();
      treeOK = (bounds.w < 300 && bounds.h < 400) || c > 5;

      j8.x.restore();
      c++;
    }
    k1[ti] = q4();
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

  var u0 = 260;

  buildingHeight += 30 * r9();
  k4(buildingColor);
  m2(x, u0 - buildingHeight, buildingWidth, buildingHeight);

  if(r9() < 0.4) {
    var inset = 5;
    var insetHeight = 8;
    m2(x + inset, 
      u0 - (buildingHeight + insetHeight), 
      buildingWidth - 2*inset, 
      buildingHeight + insetHeight);
  }

  if(r9() < 0.2) {
    var inset = 5;
    var insetHeight = 13;
    var insetWidth = 2;

    m2(x + inset, 
      u0 - (buildingHeight + insetHeight), 
      insetWidth, 
      buildingHeight + insetHeight);
  }

  for(var row = 0; row < windowRows; row++) {
    var wy = windowSpacing + row * (windowHeight + windowSpacing);
    for(var col = 0; col < windowColumns; col++) {
      var wx = windowSpacing + col * (windowWidth + windowSpacing);
      k4(windowColor);
      m2(x + wx, u0 - buildingHeight + wy, windowWidth, windowHeight);
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
    k9();
    cntx = j8.x;
    var grey = 100 + r9() * 80;


    if(night) {
      grey = 10 + r9() * 20;
    }
    k4('rgb(' + grey + ',' + grey + ',' + grey + ')');
    m2(0, 30, 240, 500);

    var windowWidth=24, windowHeight=15,windowStartOffset=8,windowSpacingH = 8,windowSpacingV = 10;
    var row=col=x=y=0;

    for(row = 0; row < 18; row++) {
      y = 30 + windowStartOffset + row * (windowHeight + windowSpacingV);
      for(col = 0; col < 7; col++) {
        x = windowStartOffset + col * (windowWidth + windowSpacingH);

        if(night) {
          if(r9() > 0.7) {
            k4('#ffffec');
            m2(x, y, windowWidth, windowHeight);
            k4('#bbbb88');
            m2(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
          } else {          
            k4('#112237');
            m2(x, y, windowWidth, windowHeight);
            k4('#111a30');
            m2(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
          }
        } else {
          k4('#5555a7');
          //ctx.filter = 'blur(1px)';
          m2(x, y, windowWidth, windowHeight);
          k4('#444495');
          m2(x, y + windowHeight / 2, windowWidth, windowHeight / 2);
        }
      }
    }
    c8[ti] = q4();

  }
}

// ***************** STREET LIGHTS ******************** //


function c3(night) {
  cntx = j8.x;
  k9();

  k4('#999999');

  if(night) {
    k4('#555555');
  }

  var poleWidth = 7;

  m2(40, 150, poleWidth, 300);
  k3();
  t9(70, 150, 30, PI, -PI / 2 );
  o9(70, 150 - 30 + poleWidth);
  t9(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  o9(70 - 30, 150);
  s2();

  m2(70, 150 - 30, 70, poleWidth);
  m2(130, 150 - 30 - 1, 35, 6);

  k4('#aaaaaa');
  if(night) {
    k4('#777777');
  }
  m2(40 + poleWidth - 4, 150, 2, 300);
  m2(70, 150 - 30 + poleWidth - 4, 70, 2);

  k3();
  t9(70, 150, 30 - poleWidth + 4, PI, -PI / 2 );
  o9(70, 150 - 30 + poleWidth);
  t9(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  o9(70 - 30, 150);
  s2();

  k4('#aaaaaa');
  if(night) {
    k4('#999999');
  }
  m2(40 + poleWidth - 2, 150, 2, 300);
  m2(70, 150 - 30 + poleWidth - 2, 70, 2);

  k3();
  t9(70, 150, 30 - poleWidth + 2, PI, -PI / 2 );
  o9(70, 150 - 30 + poleWidth);
  t9(70, 150, 30 - poleWidth, -PI / 2, PI, true );
  o9(70 - 30, 150);
  s2();


  if(night) {
    cntx.filter = 'blur(2px)';    
  }

  k4('#ffffff');
  m2(128, 150 - 30 + 4, 38, 12);

  if(night) {
    g1(0.8);
    cntx.globalCompositeOperation = 'lighter';

    cntx.filter = 'blur(4px)';    
    m2(123, 150 - 30 +3, 44, 18);  
    g1(1);
  }

  cntx.filter = null;

  a7 = q4();
  a5 = q4(1);

}

function i0() {
  var xMax = b4;
  var yMax = a9;
  cntx = e3.x;

  var gradient = a6(0, 0, 0, yMax);
  gradient.addColorStop(0, "#00111e");
  gradient.addColorStop(1, "#033d5e");

  k4(gradient);//'#00111e';
  m2(0, 0, b4, a9);


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
    m2(randomX, randomY, randomSize, randomSize);
  }
}



function createLeaf(s) {

  k4(s);
  k3();

  t9(3, 7, 3, PI / 2, PI );
  t9(10, 7, 10, PI, PI * 1.24);
  t9(-4.7, 7, 10, PI * 1.76, 0);
  t9(2.3, 7, 3, 0, PI / 2 );
  s2();  
}

function j5() {
  k9();
  cntx = j8.x;
  var canvas = j8.c;
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
        m2(x, y, 2, height);
        k4('#66cc88');
        m2(x, y, 1, height);
      } else {
        k4('#449955');
        m2(x, y, 2, height);
        k4('#66aa88');
        m2(x, y, 1, height);        
      }

      var flower = m8(2) * 20;

      var dstX = x - 2;
      var dstY = y - 6;
      s3();
      j4(dstX + 3, dstY);
      q1(0.3);
      i5(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      n0();

      s3();
      j4(dstX - 3, dstY + 1);
      q1(-0.3);
      i5(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      n0();

      s3();
      j4(dstX, dstY);
      i5(canvas, 0, flower, 6, 11, 0, 0, 6, 11);
      n0();

      s3();
      j4(dstX + 6, dstY + 10);
      q1(0.6);//Math.random() * Math.PI * 2);
      i5(canvas, 0, 60, 6, 11, 0, 0, 6, 11);
      n0();
    }
  }

  cntx.clearRect(0, 0, 22, 300);
  e8 = q4();

}

function o7(points, color) {
  k3();
  k4(color);
  p0(points[0], points[1]);
  for(var i = 2; i < points.length; i+= 2) {
    o9(points[i], points[i+1]);
  }
  k0();
  s2();
}

function drawLine(x1, y1, x2, y2) {
  k3();
  p0(x1, y1);
  o9(x2, y2);
  cntx.stroke();
}

function r2() {
  k9();
  cntx = j8.x;

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
  o7(points,r5);

  // car tyre
  var points = [
    227, 193,
    230,200,
    241, 204,
    258, 203, 
    265, 197,
    268, 191
  ];
  o7(points,r5);
  

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


  
  // windu1
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

  // windu1
  var points = [
    27, 83,
    33, 77,
    46, 27,
    21, 70
  ];
  o7(points,'#4773dd');

  // windu1
  var points = [
    19, 61,
    46, 17, 
    43, 12,
    19, 51
  ];
  o7(points,'#4773dd');

  // windu1
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


  f1 = q4(0);
  d3 = q4(1);
}

function p6() {
  k9();
  cntx = j8.x;
  var canvas = j8.c;


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
  
  
  // windu1
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
  o7(points, r5);

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

  i5(j8.c, 0, 0, 143, 210,
    -143 -132, 0, 143, 210);
  n0();

  b7 = q4(0);
}

function o6() {
  r2();
  p6();
}

/*
function p7() {
  k9();
  cntx = j8.x;
  var canvas = j8.c;

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
        q1(r9() * PI * 2);
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
        q1(r9() * PI * 2);
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
        q1(r9() * PI * 2);
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

function l1(start, increment, max) {
  var result = start + increment;

  while (result >= max)
    result -= max;
  while (result < 0)
    result += max;
  return result;
}


var m5 = function(canvas, t2) {
  this.canvas = canvas;
  this.t2 = t2;

}

m5.prototype = {

  init: function() {
    v0.reset();
    v5.buildv30();
  },

  keyDown: function(e) {
    if(e.keyCode === 88) {
      startGame();
    }
  },

  keyUp: function(e) {

  },

  p5: function() {
    n2 = true;
    var maxy          = height;    
    v0.y = 400;
    v0.depth = 0.83909963117728;
    v0.x = 0;
    
    var baseSegment   = v5.n1(v0.z);
    var v0Percent = b2(v0.z, v3.t4Length);
    
    v0.y = 500 + g4(baseSegment.p1.v4.y, 
      baseSegment.p3.v4.y, 
      v0Percent);

    var n, i, t4, car, sprite, spriteScale, spriteX, spriteY;
    var dx = 0;
    for(n = 0 ; n < v0.l5 ; n++) {
      t4 = v5.o8((baseSegment.index + n) % v5.o8Count() );
      t4.u9 = t4.index < baseSegment.index;
      t4.clip   = maxy;
      t4.clip   = 0;
  
      v0.t7(t4.p1,  0, t4.u9, width, height, q8);
      v0.t7(t4.p2,  0, t4.u9, width, height, q8);
      v0.t7(t4.p3,  0, t4.u9,  width, height, q8);
      v0.t7(t4.p4,  0, t4.u9,  width, height, q8);
  
  
  
      if ((t4.p1.v0.z <= v0.depth)         || // behind us
          (t4.p3.u1.y >= t4.p1.u1.y) || // back face cull
          (t4.p3.u1.y >= maxy))                  // clip by (already rendered) hill
        continue;

        k2(t4);
      maxy = t4.p1.u1.y;
    }
  
  },


  render: function(dt) {
    cntx = this.t2;
    var t = l6();

    k4(r5);
    m2(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < 30; i++) {
      var fontSize = 100 + i * 10;
      t2.font = 'italic ' + fontSize + 'px ' + q7;
      t2.fontStyle = 'italic';
      var col = 80 + (i * 4);
      col = (col + t / 6) % 200;
      
      if(i == 29) {
        col = 255;
      }

      k4('rgb(' + col + ',' + col + ',' + col + ')');
      l2("racer", 400 - i * 11, 300- i);
    }

    t2.font = '44px ' + q7;
    l2("Arrow keys to drive, z for Turbo, x for Handbreak", 38, 570);
    l2("x To Start", 423, 460);


    v0.z = l1(v0.z, dt * 120, v5.r1());
    this.p5();

  }
  
}

var u3 = function() {
  /*
  var fieldOfView    = 100;                     // angle (degrees) for field of view
  var v0Height   = 1000;                    // z height of v0
  var v0Depth    = null;                    // z distance v0 is from u1 (computed)
  var l5   = 300;                     // number of t4s to draw
var fogDensity     = 5;                       // exponential fog density

  */
  this.fieldOfView = 100;
//  this.y = 800;//1000; //   v0 height   // const  ??

  this.y = 0;
  this.z = 0;
  this.l5 = 300;   // const??
  this.depth = 0;            // z distance v0 is from u1 (computed)
  this.fogDensity =  25;
  this.t6 = 0;          // offset from the back of the u4
  this.u0 = 740;//800;
  this.t6 = 700;//750;


}

u3.prototype = {
  reset: function() {
    this.depth            = 1 / Math.tan( ( this.fieldOfView / 2 ) * Math.PI/180);
    this.u0 = 740;//800;
    this.t6 = 700;//750;
  
  },

// t4 3081
  t7: function(p, v0XOffset, u9, width, height) {
    var v0Z = this.z;
    if(u9) {
      v0Z -= v5.r1();
    }
    var v0X = this.x + v0XOffset;

    p.v0.x     = (p.v4.x || 0) - v0X;
    p.v0.y     = (p.v4.y || 0) - this.y;
    p.v0.z     = (p.v4.z || 0) - v0Z;//this.z;
    p.u1.scale = this.depth / p.v0.z;

    p.u1.x     = Math.round((width/2)  + (p.u1.scale * p.v0.x  * width/2));
    p.u1.y     = Math.round((height/2) - (p.u1.scale * p.v0.y  * height/2));
//    p.u1.w     = Math.round(             (p.u1.scale * roadWidth   * width/2));
  
  },

//|..x.....|

  update: function(dt) {

    // why does t6 depend on y and depth? to lock car to bottom of u1?
//    this.t6 = (this.y * this.depth) + 80;
//    this.t6 = 680;//750;
    this.z = cars[0].z - this.t6;
    if(this.z < 0) {
      this.z += v5.r1();
    }

    v0.x = cars[0].x + cars[0].width/2;// * q8;


    var u4Segment = v5.n1(cars[0].z);
    var u4Percent = b2(cars[0].z, v3.t4Length);
    

    this.y = this.u0 + g4(u4Segment.p1.v4.y, 
      u4Segment.p3.v4.y, 
      u4Percent);

  }
}

                 
var width  = 1024;
var height  = 768;
var resolution = height/480;

var i2       = 0.001;                
var i3      = 0.002;              
var i4      = 0.003;              


var h3      = 0;  
var h4     = 0;   
var h6     = 0;   
var n2 = false;
var lastDriftDraw = 0;

// draw a t0
function j6(x1, y1, x2, y2, x3, y3, x4, y4, color) {
  var ctx = t2;
  k4(color);
  k3();
  p0(x1, y1);
  o9(x2, y2);
  o9(x3, y3);
  o9(x4, y4);
  k0();
  if(n2) {
    g0(p8);
    p2();
  } else {
    s2();
  }
}

  // draw a t4, coordinates passed in are u1 coordinates
  function k2(t4) {
    var lanew1, lanew2, lanex1, lanex2, lane;
    var dark = Math.floor(t4.index/2) % 2;// (t4.index / 2) % 2;

    var w0Color = e4;
    var landColor = d4;
    if(dark) {
      w0Color = g2;
      landColor = g3;
    }

    // draw side land
    if(!n2) {
      k4(landColor);
      m2(0, t4.p3.u1.y, width, t4.p1.u1.y - t4.p3.u1.y);
    }

    // draw w0
    var r1 = t4.r3 * t4.p1.u1.scale * width / 2;
    var r2 = t4.r3 * t4.p4.u1.scale * width / 2;
    j6(
                    t4.p1.u1.x - r1, 
                    t4.p1.u1.y, 
                    t4.p1.u1.x, 
                    t4.p1.u1.y, 
                    t4.p4.u1.x, 
                    t4.p4.u1.y, 
                    t4.p4.u1.x - r2, 
                    t4.p4.u1.y, 
                    w0Color);

    j6(
      t4.p2.u1.x, 
      t4.p2.u1.y, 
      t4.p2.u1.x + r1, 
      t4.p2.u1.y, 
      t4.p3.u1.x + r2, 
      t4.p3.u1.y, 
      t4.p3.u1.x, 
      t4.p3.u1.y, 
      w0Color);
  
    // road 
    if(!n2) {
      var colour = n9;
      if(t4.index == 0) {
        colour = p8;
      }
      j6(
                    t4.p1.u1.x,    
                    t4.p1.u1.y, 
                    t4.p2.u1.x, 
                    t4.p2.u1.y, 
                    t4.p3.u1.x, 
                    t4.p3.u1.y, 
                    t4.p4.u1.x,    
                    t4.p4.u1.y, 
                    colour);
    }


    var l1 = 50 * t4.p1.u1.scale * width / 2;
    var l2 = 50 * t4.p4.u1.scale * width / 2;


    // lines on side of road
    lanex1 = t4.p1.u1.x + 100 * t4.p1.u1.scale * width / 2;
    lanex2 = t4.p4.u1.x + 100 * t4.p4.u1.scale * width / 2;

    j6(
        lanex1 - l1/2, 
        t4.p1.u1.y, 
        lanex1 + l1/2, 
        t4.p1.u1.y, 
        lanex2 + l2/2, 
        t4.p3.u1.y, 
        lanex2 - l2/2, 
        t4.p3.u1.y, 
        c6);

    lanex1 = t4.p2.u1.x - 100 * t4.p1.u1.scale * width / 2;
    lanex2 = t4.p3.u1.x - 100 * t4.p4.u1.scale * width / 2;

    j6(
        lanex1 - l1/2, 
        t4.p1.u1.y, 
        lanex1 + l1/2, 
        t4.p1.u1.y, 
        lanex2 + l2/2, 
        t4.p3.u1.y, 
        lanex2 - l2/2, 
        t4.p3.u1.y, 
        c6 );
      
    lanes = 2;
    // lane marker
    if (dark) { //t4.color.p4) {
      lanew1 = (t4.p2.u1.x - t4.p1.u1.x) / lanes;
      lanew2 = (t4.p3.u1.x - t4.p4.u1.x) / lanes;
      lanex1 = t4.p1.u1.x + lanew1;
      lanex2 = t4.p4.u1.x + lanew2;
      for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++) {
        j6(
          lanex1 - l1/2, 
          t4.p1.u1.y, 
          lanex1 + l1/2, 
          t4.p1.u1.y, 
          lanex2 + l2/2, 
          t4.p3.u1.y, 
          lanex2 - l2/2, 
          t4.p3.u1.y, 
          c6);
      }
    }

    if(q0 != 0) {
      q3(0, t4.p1.u1.y, width, t4.p3.u1.y-t4.p1.u1.y, t4.fog);
    }
  }

  //---------------------------------------------------------------------------

  function e0( background, width, height, rotation, offset) {

//    return;

    
    rotation = rotation || 0;
    offset   = offset   || 0;

    var imageW = b4/2;
    var imageH = a9;

    var u6X = Math.floor(b4 * rotation);
    var u6Y = 0;
    var u6W = Math.min(imageW, b4-u6X);
    var u6H = imageH;
    
    var destX = 0;
    var destY = offset;
    var destW = Math.floor(width * (u6W/imageW));
    var destH = height;

    t2.drawImage(background.c, u6X, u6Y, u6W, u6H, destX, destY, destW, destH);
    if (u6W < imageW)
      t2.drawImage(background.c, 0, u6Y, imageW-u6W, u6H, destW-1, destY, width-destW, destH);
  }

  //---------------------------------------------------------------------------

  function k8(sprite, scale, destX, destY, clipY, fog) {

    var destW  = (sprite.w * scale * width/2) ;
    var destH  = (sprite.h * scale * width/2);


//    destX = destX + (destW * (offsetX || 0));
    destY = destY - destH;// + (destH * (offsetY || 0));


    // clip y for appearing behind a hill..
    var clipH = clipY ? Math.max(0, destY+destH-clipY) : 0;
    if (clipH < destH) {

      t2.drawImage(j9, 
        sprite.x, 
        sprite.y, 
        sprite.w, 
        sprite.h - (sprite.h*clipH/destH), 
        destX, 
        destY, 
        destW, 
        destH - clipH);

      if(fog !== false && q0 != 0) {
        q3(destX, destY, destW, destH, fog);//ctx, x, y, width, height, fog) {
      }
    }

  }

  //---------------------------------------------------------------------------
  function b3(distance, density) { 
    return 1 / (Math.pow(Math.E, (distance * distance * density))); 
  }

  function k7(scale, destX, destY, steer, updown, u4ShadowY) {

    var sprite;
    if(steer < 0) {
      sprite = f1;
    } else if(steer > 0) {
      sprite = d3;
    } else {
      sprite = b7;
    }

    var spriteScale = u4.width * scale / sprite.w;

    var i,j;


    // ************* DRAW SLIP STREAM ********** //
    if(u4.h2 > 0 || u4.p9 > 0) {

      cars[0].b6();

      var amount = 0;
      if(u4.h2 <= 0) {
        amount = u4.p9 ;
        while(amount > 1) {
          amount -= 1;
        }        
      }
      g1(1 - amount);

      for(i = 0; i < cars[0].f2.length; i++) {
        var points = cars[0].f2[i];
        k3();
        p0(points[0].u1.x, points[0].u1.y);
        for(j = 1; j < points.length; j++) {
          o9(points[j].u1.x, points[j].u1.y);
        }

        k4(p8);
        s2();

      }
      g1(1);
    }


    // ***** DRAW SHADOW IF IN AIR *******/
/*
    if(u4ShadowY != destY) {
      g1(0.4);
        var destW  = (sprite.w * spriteScale * width/2) ;
        j6(destX, u4ShadowY,
          destX + destW, u4ShadowY,
          destX + 0.7 * destW, u4ShadowY - 180,
          destX + 0.3 * destW, u4ShadowY - 180,
          
          r5);
      g1(1);      
    }
    */
    // ***** DRAW CAR SPRITE ****** /

    
    k8(
      sprite, 
      spriteScale, 
      destX, 
      destY + u4.u7, 
      false);
      

    // ************** DRAW DRIFT *************** //
    if( u4.m7 > 0) {
      var time = l6();
      if(time - lastDriftDraw > 100) {

        g1(0.8);
        k4(p8);
        var x = destX + 12;
        var y = destY - 4;
        m2(x, y, 50, 10)

        x = destX + 260;
        m2(x, y, 50, 10)

        g1(1);
        lastDriftDraw = time;
      }
    }

    //  ******  DRAW TURBO  ***** /
    if(u4.v7) {
      var centreX = destX + 82;
      var centreY = destY - 10;
      e6(centreX, centreY, 10,'#dd9925' );
      e6(centreX, centreY, 5,'#cccc55');
      centreX = destX + 230;
      e6(centreX, centreY, 10,'#dd9925' );
      e6(centreX, centreY, 5,'#cccc55');
    }    
  }


  function q3(x, y, width, height, fog) {
    if (fog < 1) {
      g1(1-fog)
      k4(q0);
      m2(x, y, width, height);
      g1(1);
    }
  }


  function l9() {
    cntx = t2;
    

    var baseSegment   = v5.n1(v0.z);
  
    var basePercent   = b2(v0.z, v3.t4Length);
    var u4Segment = v5.n1(u4.z);
    var u4Percent = b2(u4.z, v3.t4Length);
    var u4Y       = g4(u4Segment.p1.v4.y, u4Segment.p3.v4.y, u4Percent);
    var maxy          = height;
    var x  = 0;
    var dx = - (baseSegment.v6 * basePercent);
  //  t2.clearRect(0, 0, width, height);
  
    t2.fillStyle = '#4576aa';
    m2(0, 0, width, height);
  
  
    // render background hills, sky, trees
    e0(e3, width, height, h3,  resolution * i2  * u4Y);
    e0(e2, width, height, h4, resolution * i3 * u4Y);
    e0(e1, width, height, h6, resolution * i4 * u4Y);
  
  
    /*
      front to back to render the road
      back to front to render the t8
    */
  
  
    // render t4s from to back
    var n, i, t4, car, sprite, spriteScale, spriteX, spriteY;
    for(n = 0 ; n < v0.l5 ; n++) {
  
  //    t4        = t4s[(baseSegment.index + n) % t4s.length];
  
      t4 = v5.o8((baseSegment.index + n) % v5.o8Count() );
      t4.u9 = t4.index < baseSegment.index;
  
      t4.fog    = b3(n/v0.l5, v0.fogDensity);
      t4.clip   = maxy;
  
      v0.t7(t4.p1,  - x,      t4.u9, width, height);
      v0.t7(t4.p2,  - x,      t4.u9, width, height);
      v0.t7(t4.p3,  - x - dx, t4.u9,  width, height);
      v0.t7(t4.p4,  - x - dx, t4.u9,  width, height);
  
      // do fake v6d road
      x  = x + dx;
      dx = dx + t4.v6;
  
      // cull t4s if behind, facing other way or clipped
      if ((t4.p1.v0.z <= v0.depth)         || 
          (t4.p3.u1.y >= t4.p1.u1.y) || 
          (t4.p3.u1.y >= maxy))                  
        continue;
  

      k2(t4);
      maxy = t4.p1.u1.y;
    }
  
    // draw opponent cars from furthest to closest
    // opponents still in view but closer than the u4 to the v0 should be drawn after the u4..
    for(n = (v0.l5-1) ; n > 0 ; n--) {
      t4 = v5.o8((baseSegment.index + n) % v5.o8Count());
  
      // draw cars in the t4
      for(i = 0 ; i < t4.cars.length ; i++) {
        car         = t4.cars[i];
        
        if(car.index !== 0) {
          sprite      = car.sprite;
          var scale = g4(t4.p1.u1.scale, t4.p3.u1.scale, car.percent);
  
          spriteX     = g4(
            (t4.p1.u1.x + t4.p2.u1.x) / 2,     
            (t4.p3.u1.x + t4.p4.u1.x) / 2,     
            car.percent) 
            + (scale * car.x * width/2);
  
          spriteY     = g4(t4.p1.u1.y,     t4.p4.u1.y,     car.percent);
  

          var sprite = b7;
          spriteScale = car.width * scale / sprite.w;

          if(car.s1) {
            sprite = f1;
          } else if(car.q6) {
            sprite = d3;
          } 
      
  
          k8(
            sprite, 
            spriteScale, 
            spriteX, 
            spriteY, 
            t4.clip,
            t4.fog);
        }
      }
  
      // roadside objects
      for(i = 0 ; i < t4.t8.length ; i++) {
        sprite      = t4.t8[i];
        spriteScale = t4.p1.u1.scale;

        spriteX = t4.p1.u1.x - t4.p1.v4.x * t4.p1.u1.scale * width / 2
                  + spriteScale * sprite.x * width / 2;


        spriteY     = t4.p1.u1.y;
  /*
        sprite.u6.x = 0;
        sprite.u6.y = 0;
        sprite.u6.w = 200;
        sprite.u6.h = 210;
  */
        spriteScale = sprite.s  * spriteScale;//* 800 / sprite.u6.w;
  

        
        k8(
          sprite.u6, 
          spriteScale, 
          spriteX, 
          spriteY, 
          t4.clip,
          false);
          


//-------- COLLISION DISPLAY ----------- //
var destW  = (sprite.u6.w * spriteScale * width/2) ;

var offsetX = -0;//.5;
var destX = spriteX + (destW * (offsetX || 0));

spriteScale = t4.p1.u1.scale;        
spriteScale = sprite.s * spriteScale;//800 * spriteScale / sprite.u6.w;

var collisionx = (sprite.u6.cx ) * spriteScale * width / 2;
var collisionw = sprite.u6.cw * spriteScale * width / 2;
spriteX = destX + collisionx;// + collisionx * spriteScale * width / 2;// + spriteScale * collisionx * width / 2;

//t2.fillStyle = '#ff0000';
//t2.fillRect(spriteX, spriteY - 10, collisionw, 10);              
//-------- COLLISION DISPLAY END ----------- //

    }
  
      if (t4 == u4Segment) {
        var u4ScreenY = g4(u4Segment.p1.u1.y, u4Segment.p3.u1.y, u4Percent);
        
  
        u4ScreenY = (height / 2) 
            - (v0.depth / v0.t6 * g4(u4Segment.p1.v0.y, 
            u4Segment.p3.v0.y, u4Percent) * height/2);

        var u4ShadowY = u4ScreenY;
  
        if(cars[0].u0 > 0) {
          u4ScreenY -= cars[0].u0 * v0.depth / v0.t6 * height / 2;
        }

            
        var carX = width / 2;
        var scale = g4(u4Segment.p1.u1.scale, u4Segment.p3.u1.scale, u4Percent);
  
  
          spriteX     = g4(
            (u4Segment.p1.u1.x + u4Segment.p2.u1.x) / 2,     
            (u4Segment.p3.u1.x + u4Segment.p4.u1.x) / 2,     
            u4Percent) 
            + (scale * cars[0].x * width/2);


        var p = {
          v4: {
            x: u4.x,
            y: u4.y,
            z: u4.z
          },
          v0: {},
          u1: {}

        };

        v0.t7(p, 0, u4Segment.index < baseSegment.index, width, height);
  
        carX = p.u1.x;
        var u4Direction = 0;
        if(u4.v9 > 0) {
          if(u4.h8 != 0) {
            u4Direction = u4.h8;
          } else {
            u4Direction = (u4.s1 ? -1 : u4.q6 ? 1 : 0);
          }
        }

        k7( 
                      v0.depth / v0.t6,  // scale
                      carX,//width/2,   // destx
                      u4ScreenY,
                      u4Direction,
                      u4Segment.p3.v4.y - u4Segment.p1.v4.y,
                      u4ShadowY);
        if(race.state == 4) {
          t2.drawImage(v5.m6, -40, 200, 400, 400);
        }
  
      }
    }
  }






var Car = function() {
  var t = this;

  t.sprite = 0;

  t.index = 0;

  t.width = 500;//530; // width
  t.height = 0;
  
  t.x = 0;
  t.y = 0;
  t.lastY = false;
  t.u0 = 0;
  t.z = 0;
  t.lap = 0;
  t.lapStarted = false;
  t.position = 0;

  t.n4 = 0.3;
  t.f2 = [];
  t.c7 = false;
  t.p9 = 0;
  t.h2 = 0;

  t.percent = 0; // percent remaining in t4
  t.v9 = 0;
  t.v1 = 0;

  t.v7StartTime = 0;
  t.q2=t.v2=t.s1=t.q6=t.v7=t.l7=t.m3=false;
  t.m7 = 0;
  t.h8 = 0;

  t.o1 = 100;
  t.lapStarted = false;

  // these are settings for the u4
  // the car init routine will set them for ai u4s
  t.n4    = 0.3;                     // n4 force multiplier when going around v6s

  t.s4       =  26000;
  t.i8  =  28000;

  t.v9Percent   = 0;  // v9 as percentage of max v9

  t.accel          =  6800;
  t.s9       = -16000;
  t.decel          = -8000;
  /*
  this.offRoadDecel   = -12000;
  this.offRoadLimit   = this.s4 /1.4;
//  this.accel          =  s4/5;             // acceleration rate - tuned until it 'felt' right
  //this.s9       = -s4;               // deceleration rate when braking
  //this.decel          = -s4/5;             // 'natural' deceleration rate when neither accelerating, nor braking
  //this.offRoadDecel   = -s4/2;             // off road deceleration is somewhere in between
  //this.offRoadLimit   =  s4/2;             // limit when off road deceleration no longer applies (e.g. you can always go at least this v9 even when off road)
  //this.sideStripLimit   =  this.s4/1.5;             // limit when off road deceleration no longer applies (e.g. you can always go at least this v9 even when off road)
  */

  t.h5 = 0;                       // current lap time
  t.lastLapTime    = null;                    // last lap time

  t.position = 0;

  t.q9 = 3000;

  // ai settings
  t.slowOnCorners = false;
  t.c5 = false;

  t.u7 = 1.5;
  t.g5 = 0;



}

Car.prototype = {
  l0:       function(v, accel, dt)      { return v + (accel * dt);                                        },

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
    var t4s = 20;

    var angle = 0.0;
    if(this.c7 === false) {
      this.c7 = [];
      for(i = 0; i < t4s; i++) {
        this.c7.push(r9());
      }
    }

    for(i = 0; i < t4s; i++) {
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
        v4: {
          x: x1a,
          y: y1a,
          z: za
        },
        v0: {},
        u1: {}

      });

      line.push({
        v4: {
          x: x2a,
          y: y2a,
          z: za
        },
        v0: {},
        u1: {}
      });


      line.push({
        v4: {
          x: x4a,
          y: y4a,
          z: z2a,//centreZ - lineLength
        },
        v0: {},
        u1: {}

      });

      line.push({
        v4: {
          x: x3a,
          y: y3a,
          z: z2a,//centreZ-lineLength
        },
        v0: {},
        u1: {}
      });

      this.f2.push(line);
      angle += PI / t4s;

    }

    for(i = 0; i < this.f2.length; i++) {
      var points = this.f2[i];
      for(j = 0; j < points.length; j++) {
        v0.t7(points[j], 0, 0, width, height);
      }
    }

  },

  limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));   
  },

  t1: function(x1, w1, x2, w2, percent) {


    var min1 = x1 - (percent - 1) * w1 / 2;
    var max1 = x1 + (w1) * percent;
    var min2 = x2 - (percent - 1) * w2 / 2;
    var max2 = x2 + (w2) * percent;    
    return ! ((max1 < min2) || (min1 > max2));
  },

  // --- u4 controls ----
  setTurnLeft: function(turn) {
    this.s1 = turn;
  },
  m0: function(turn) {
    this.q6 = turn;
  },
  j0: function(q2) {
    this.q2 = q2;
  },
  r6: function(v2) {
    this.v2 = v2;
  },

  s0: function(v7) {
    this.l7 = v7;
  },

  setDrift: function(v8) {
    this.m3 = v8;
  },

  // --- end u4 controls ---

  d2: function() {
    return this.h5;
  },

  getLap: function() {
    if(this.lap < 1) {
      return 1;
    }
    return this.lap;
  },

  n3: function() {
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
    return this.v9;
  },



  update: function(dt) {//}, u4Segment, u4W) {
    var s4 = this.s4;
    this.v9Percent = this.v9 / this.s4;
    var currentSegment = v5.n1(this.z);
    var u4Segment = v5.n1(cars[0].z);
    var v9Percent  = this.v9Percent;
    this.percent = b2(this.z, v3.t4Length);    


    var dx            = dt * this.q9 * v9Percent; // at top v9, should be able to cross from left to right (-1 to 1) in 1 second
    var v5Left = currentSegment.p1.v4.x;
    var v5Right = currentSegment.p2.v4.x;

    var carLeftSide = this.x;
    var carRightSide = this.x + this.width;

    // middle distance is about 900
    // furthest is about 1800
    var distanceToLeft = carLeftSide - v5Left;
    var distanceToRight = v5Right - carRightSide;
    var v5Width = v5Right - v5Left;



    var extraSpeed = 1;

    // is the car on a v6? easy v6 max is about 4
    if(currentSegment.v6 < 0 && distanceToLeft > 0) {
      // turn left
      if(this.index == 0) {
        extraSpeed = 1 + (v5Width - this.width - distanceToLeft) * (-currentSegment.v6) / (v5Width * 80);
      }
    } else if(currentSegment.v6 > 0 && distanceToRight > 0) {
      if(this.index == 0) {
        extraSpeed = 1 + (v5Width - this.width - distanceToRight) * (currentSegment.v6) / (v5Width * 80);
      }
    }

    if(extraSpeed < 1) {
      extraSpeed = 1;
    }


    // max v9 multiplier
    var mult = 0.8;
    var accMult = 1;
    if(this.h2 > 0) {
      mult += 0.4;
    }

    if(this.m3) {
      // can only v8 over certain v9 ,otherwise we're s9
      if(this.v9 > 8000 ) {
        if(!this.v8 && !this.q2) {
          this.m7 = 1.2;
          this.v8 = true;
        }

        //mult -= 0.1;
        // can turn faster
      } else {
        mult -= 0.5;
        this.v8 = false;
      }

    } else {
      this.v8 = false;
    }


    if(this.m7 > 0 && this.v9 > 8000) {
      this.m7 -= dt;
      mult -= 0.04;
      if(this.h8 == 0) {
        if(this.s1) {
          this.h8 = -1;
        }
        if(this.q6) {
          this.h8 = 1;
        }
      }
    } else {
      this.v8 = false;
      this.m7 = 0;
      this.h8 = 0
    }

    var v7On = this.v7;
    // is v7 on?
    if(this.l7) {
      this.v7 = this.o1 > 0 && this.v9 > 8000 && this.q2;  
    } else {
      this.v7 = false;
    }


    if(this.v7) {
      accMult = 1.2;
      s4 = this.i8;
    }

    this.u7 = 3.4;
    // is the car offroad with a bit of leeway??   
    if(distanceToLeft < -this.width * 0.1 || distanceToRight < -this.width * 0.1) {

      if(distanceToLeft + this.width * 0.1 < -u4Segment.r3
         || distanceToRight + this.width * 0.1 < -u4Segment.r3) {
        
        this.u7 = 9.5;
        mult -= 0.6;
        accMult -= 0.2;
      } else {
        mult -= 0.1;
        this.u7 = 6;
      }
    }

    this.u7 = (this.u7 * r9() * v9Percent) ;

    
    if(this.index == 0 && race.state != 5) {
      // its the u4

      this.x = this.x - (dx * v9Percent * u4Segment.v6 * this.n4);

      if(this.h8 != 0) {
        dx = dx * 0.5;
      }
      if(this.s1)
        this.x = this.x - dx;
      else if (this.q6)
        this.x = this.x + dx;
    
      var dv8 = this.h8 * this.v9 * 0.00055;
      this.x += dv8;


      // need to check for collision with other cars..
      this.z = l1(this.z, dt * this.v9 * extraSpeed, v5.r1());

      
      this.y = g4(currentSegment.p1.v4.y, 
        currentSegment.p3.v4.y, 
        this.percent);

      // ---------------------------------------------- JUMP!!!
      // make the car jump if going fast..
      // y is the y position of the t4

        /*
      // gravity

      if(this.u0 >= 0) {
        this.v1 -= dt * 75000;
      } else {
        this.v1 -= dt * 430000;
      }
      if(this.v1 < -2500) {
        this.v1 = -2500;
      }
      // get the dy for the y position of the v5
      var dy = 0;
      if(this.lastY !== false) {
        dy = this.y - this.lastY;
        if(dy < -1000) {
          dy = 0;
        }

      }
      this.lastY = this.y;


      if(this.u0 <= 0) {
        // was last on ground, so y v9 is based on y position of t4

        var ydistTravelled = this.v1 * dt;
        // y offset is 
        this.u0 = this.v1 * dt - dy;
        if(this.u0 <= 0) {
          // we're on the ground
          this.v1 = dy / dt;
          this.u0 = 0;
        }

      } else {
        // in air..
        this.u0 += this.v1 * dt;
        if(this.u0 < 0) {
          // we've landed
          this.u0 = 0;
        }
      }


*/
      this.u0 = 0;

      // -------------- END JUMP
      
      if(this.q2) {
        
        if(this.v7) {
          var time = l6();
          if(!v7On) {
            this.v7StartTime = time;
          }
          // decrease the amount of v7 left
          this.o1 -= dt * 2.45;
          b0(time - this.v7StartTime);
        }
        if(this.v9 < s4 * mult) {
          this.v9 = this.l0(this.v9, this.accel * accMult, dt);
        } else {

          // going too fast, need to decelerate
          this.v9 = this.l0(this.v9, this.decel, dt);
          if(this.v9 < s4 * mult) {
            this.v9 = s4 * mult;
          }
        }
      } else if(this.v2) {
        this.v9 = this.l0(this.v9, this.s9, dt);
      } else {
        // not accelerating or s9, so just decelerate
        this.v9 = this.l0(this.v9, this.decel, dt);
      }


      // check for collisions with roadside objects
      for(var n = 0 ; n < u4Segment.t8.length ; n++) {
        var sprite  = u4Segment.t8[n];
        var spriteW = sprite.s * sprite.u6.cw;
        var spriteX = sprite.x + sprite.u6.cx * sprite.s;
        // check for collision will roadside object, same t4 and rects t1
        var carX = this.x;
        if (this.t1(carX, 
          this.width, 
          spriteX, 
          spriteW, 1)) {

          if(this.index == 0) {
            g8();
            this.p9 = 0;
            this.h2 = 0;
          }
          this.v9 = s4/5;
          this.z = l1(u4Segment.p1.v4.z, 0, v5.r1()); // stop in front of sprite (at front of t4)
          break;
        }
      }
      
      var isBehind = false;
      for(var i = 0; i < cars.length; i++) {
        var distance = cars[i].z - u4.z;
        if(u4.z > v5.r1() - 1200) {
          distance -= v5.r1();
        }

        if(distance > 0 && distance < 1800) {
          var offCentre =  (u4.x - cars[i].x) / cars[i].width;
          if(offCentre < 0) {
            offCentre = - offCentre;
          }
          if(offCentre < 0.4) {
            isBehind = true;
          }
        }
      }

      if(isBehind && this.v9 > 8000) {
        this.p9 += dt * 1;
        if(this.p9 > 0.14) {
          this.h2 = 2;
        }
      } else {
        this.p9 = 0;
      }

      if(this.h2 > 0) {
        this.h2 -= dt;
      }      

    } else {
      if(this.v9 < s4) {
        this.v9 = this.l0(this.v9, this.accel, dt);
      }

      var turnDir = this.d1(currentSegment, u4Segment, u4.width);
      var newX  = this.x + turnDir * dx;

      if(currentSegment.v6 == 0) {
        this.s1 = turnDir == -1;
        this.q6 = turnDir == 1;
      } else {
        this.s1 = currentSegment.v6 < -0.5;
        this.q6 = currentSegment.v6 > 0.5;
      }
        

      if(newX + this.width < v5Right * 0.6 && newX > v5Left * 0.8) {
        this.x = newX;
      }
      this.z = l1(this.z, dt * this.v9, v5.r1());      
    }

    this.percent = b2(this.z, v3.t4Length); // useful for interpolation during rendering phase
    var newSegment  = v5.n1(this.z);


    // check collisions with other cars
    // check other cars

    if(this.index === 0) {
      for(n = 0 ; n < newSegment.cars.length ; n++) {
        var car  = newSegment.cars[n];

        if(car.index != this.index) {
          if (this.v9 > car.v9) {
            // check for collision with other car, same t4 and rects t1
            if (this.t1(this.x, this.width,
              car.x, car.width, 1)) {
              if(this.index !== 0) {
                this.v9 = car.v9 / 2;
                if(car.index !== 0) {
                  car.v9 = car.v9 * 1.2;
                }
              } else {
                if(this.index == 0) {
                  g8();
                  this.p9 = 0;
                  this.h2 = 0;
      
                }
      
                this.v9 = car.v9 ;
                this.z = car.z - 100;
              }
              break;
            }
          }
        }
      }
    }


    // limit how far offroad a car can go
    if(this.x + this.width / 2 < v5Left - 1.2 * this.width) {
      this.x = v5Left - 1.2 * this.width - this.width / 2;
    }

    if(this.x + this.width / 2 > v5Right + 1.2 * this.width) {
      this.x = v5Right + 1.2 * this.width - this.width / 2;
    }
    

    // limit the v9 to max v9
    this.v9   = this.limit(this.v9, 0, s4); // or exceed s4



    if(this.index == 0) {
      b5(this.v9Percent);
    }


    if (currentSegment != newSegment) {
      var index = currentSegment.cars.indexOf(this);
      currentSegment.cars.splice(index, 1);
      newSegment.cars.push(this);
    }


    // next lap?
    if(this.z < v3.t4Length * 1.2 && !this.lapStarted) {    
      this.lap++;
      this.lapStarted = true;
      this.lastLapTime    = this.h5;

      if(this.lap == 2 && this.index == 0) {//!== 1 && this.lap !== 3) {
        speak("lap time " + this.d2().toFixed(2));

      }
      this.h5 = 0;
    } else {
      if(this.z > v3.t4Length * 1.2) {
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
        this.newPosition = this.n3();
        this.e7 = 1;
      }
    }



    if(this.index === 0 && this.lap === 3 && race.state != 5) {
      // race over!!!
      this.g5 = this.n3();
      speak("Race. Over.")
      speak(this.g5 + " Place");

      this.v7 = false;
      this.p9 = 0;
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

  d1: function(carSegment, u4Segment, u4Width) {
    var lookAhead = 60;

    var t4 = null;

    var v5Segments = v5.o8Count();


    for(var i = 1; i < lookAhead; i++) {
      t4 = v5.o8( (carSegment.index+i) % v5Segments );
      var v5Left = t4.p1.v4.x;
      var v5Right = t4.p2.v4.x;
      var dir = 0;

      // avoid other cars less than 8 t4s ahead
      if(i < 8) {


        /*
        if ((t4 === u4Segment) 
        && (this.v9 > u4.v9) 
        && (this.t1(otherCarLeft, otherCarWidth, this.x, this.width, 1.2))) {
        */
        for(n = 0 ; n < t4.cars.length ; n++) {
          var otherCar = t4.cars[n];

          var otherCarLeft = otherCar.x;
          var otherCarWidth = otherCar.width;
          var otherCarRight = otherCar.x + otherCar.width;
  

          if(v5Right - otherCarRight < this.width * 1.4) {
            // can't fit on the right
            dir = -1;
          } else if( otherCarLeft - v5Left < this.width * 1.4) {
            dir = 1;
          } else {
            if(otherCarLeft - v5Left > v5Right - otherCarRight) {
              dir = -1;
            } else {
              dir = 1;
            }
//            dir = (this.x > otherCarLeft) ? 1 : -1;
          }

          return dir * 3/i ;//* (this.v9-u4.v9)/s4;
        }

      }
    }

    if(this.c5) {

      for(var i = 1; i < lookAhead; i++) {
        t4 = v5.o8( (carSegment.index+i) % v5Segments );
        var v5Left = t4.p1.v4.x;
        var v5Right = t4.p2.v4.x;
    
        if(t4.v6 > 0) {
          // move to the right
          if(i < 5) {
            return 1 / (5);
          }
          return 2 / i;
        }

        if(t4.v6 < 0) {
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

var e4 = '#a02222',
    g2 = '#BBBBBB',
    d4 = '#000000',
    g3 = '#000000',
    n9 = '#000000';

var v3 = function() {
  this.v5Length = 0;
  this.m1 = 0;

  this.t4s = [];
  this.map = null;
}

var q8      =1200;// 1200;//2000;   

v3.t4Length  = 300;                   
            
var lanes          = 1;                       

v3.prototype = {
  buildv30: function() {
    q0 = 0;

    this.t4s = [];
    this.m9(200);
    this.e9();    
  },

  createStreetLights: function() {
    var t4Count = this.o8Count();
    
    for(var i = 0; i < t4Count; i++) {
      var t4 = this.t4s[i];

      if(i % 20 == 0) {
        var x = t4.p1.v4.x;
        t4.t8.push({ 
          u6: a7, 
          s: 12, 
          x: x  - 12 * a7.w + 700
        });

        var x = t4.p2.v4.x;
        t4.t8.push({ 
          u6: a5, 
          s: 12, 
          x: x  - 700
        });
      }
    }
  },

  createRoadsideObjects: function(objs, prob, scale, offset, turnSigns) {
    var t4Count = this.o8Count();
    var turnSegment = 0;
    for(var i = 0; i < t4Count; i++) {
      var t4 = this.t4s[i];
      var r = r9();
      if(t4.v6 != 0 && turnSigns) {    
        if(turnSegment % 20 == 0) {
          if(t4.v6 > 0) {
            var x = t4.p1.v4.x;
            t4.t8.push({ 
              u6: d0, 
              s: 3, 
              x: x - 3 * d0.w - 400
            });
          } else {
            var x = t4.p2.v4.x;
            t4.t8.push({ 
              u6: d8, 
              s: 3, 
              x: x + 400
            });
          }
        }
        turnSegment++;
      } else {
        turnSegment = 0;
//      if(t4.v6 == 0 || !turnSigns) {
        var obj = objs[m8(objs.length)];
        if(r > prob) {
          var x = t4.p1.v4.x;

          t4.t8.push({ 
            u6: obj, 
            s: scale, 
            x: x  - scale * obj.w / 2 - offset
          });

          var x = t4.p2.v4.x;
          t4.t8.push({ 
            u6: obj, 
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
    c6 = p8;    
    q0 = 0;

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
    c6 = p8;
    q0 = 0;

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

   c6 = p8;
   q0 = 0;//'#eeeeee';

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

//    t.o8(0).color = u2.START;
    t.e9();
    t.drawMap();
    t.createRoadsideObjects(c8, 0.95, 20, 3300, false);
    t.createStreetLights();

  },


  n6: function() {
    n9 = '#111111';
    c6 = '#555555';    
    q0 = '#000000';
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
    return (this.t4s.length == 0) ? 0 : this.t4s[this.t4s.length-1].p3.v4.y; 
  },

  o8: function(index) {
    return this.t4s[index];    
  },

  o8Count: function() {
    return this.t4s.length;
  },

  r1: function() {
    return this.v5Length;
  },

  e9: function() {
    this.v5Length = v5.t4s.length * v3.t4Length;
    

  },

  addSegment: function(v6, y) {
    var n = this.t4s.length;

    var yFront = this.lastY();
    var yBack = y;
    var zFront = n * v3.t4Length;
    var zBack = (n+1)*v3.t4Length;
    var xLeft = -q8;
    var xRight = q8;

    var r3 = 0;
    if(v6 != 0) {
      r3 = v6 * 40;
      if(r3 < 0) {
        r3 = -r3;
      }
      r3 += 60;

    }
    this.t4s.push({
      index: n,
      p1: { v4: { x: xLeft,  y: yFront,  z:  zFront }, v0: {}, u1: {} },
      p2: { v4: { x: xRight, y: yFront,  z:  zFront }, v0: {}, u1: {} },
      p3: { v4: { x: xRight, y: yBack, z:  zBack }, v0: {}, u1: {} },
      p4: { v4: { x: xLeft,  y: yBack, z: zBack }, v0: {}, u1: {} },
      v6: v6,
      r3: r3,
      t8: [],
      cars: [],
      color: false ? u2.DARK : u2.LIGHT
    });

  },

  easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },
  easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },
  easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },

  t3: function(enter, hold, leave, v6, y, v6Angle) {
    var v6Angle = v6Angle || 0;
    var exitAngle = this.m1 + v6Angle;
    
    var startY   = this.lastY();
    var endY     = startY + (Math.floor(y) * v3.t4Length);
    var n, total = enter + hold + leave;
    var t4Curve = 0;
    var totalCurve = 0;
    var firstSegment = this.t4s.length;
    for(n = 0 ; n < enter ; n++) {
      t4Curve = this.easeIn(0, v6, n/enter);
      totalCurve += t4Curve;
      this.addSegment(t4Curve, this.easeInOut(startY, endY, n/total));
    }
    for(n = 0 ; n < hold  ; n++) {
      t4Curve = v6;
      totalCurve += t4Curve;
      this.addSegment(v6, this.easeInOut(startY, endY, (enter+n)/total));
    }
    for(n = 0 ; n < leave ; n++) {
      t4Curve = this.easeInOut(v6, 0, n/leave);
      totalCurve += t4Curve;
      this.addSegment(t4Curve, this.easeInOut(startY, endY, (enter+hold+n)/total));
    }
  
    var anglePerCurve = 0;
    if(totalCurve != 0) {
      anglePerCurve = (exitAngle - this.m1) / totalCurve;
    }
  
    // fix the angles
    for(var i = firstSegment; i < this.t4s.length; i++) {
      this.m1 += this.t4s[i].v6 * anglePerCurve;
      this.t4s[i].angle = this.m1;
    } 
  
    this.m1 = exitAngle;
    this.t4s[this.t4s.length - 1].angle = exitAngle;
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
    var t4 = this.t4s[n];
    var x = 0;
    if(offset < 0) {
      x = t4.p1.v4.x - 600;
    } else {
      x = t4.p2.v4.x + 600;
    }
    t4.t8.push({ u6: sprite, x: x });
  },


  /*
  When the car reaches the end of the road we will simply loop back to the beginning. 
  To make this a little easier we provide a method to find the t4 for any Z value
  even if it extends beyond the length of the road:
  */
  n1: function(z) {
    return this.t4s[Math.floor(z / v3.t4Length) % this.t4s.length];
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
//    t2.fillStyle = '#222222';
//    t2.fillRect(0, 0, width, height);
    j7(600, 600);
    g0('#666666');
    cntx.lineWidth = 5;
  
    var angle = 0;
    var x = 300;
    var y = 30;
  

  
    k3();
    var t4DrawLength = 0.5;
    p0(x, y);
    for(var i = 0; i < this.t4s.length; i++) {
      angle = (this.t4s[i].angle / 180) * PI;
      x += t4DrawLength * cos(angle);
      y += t4DrawLength * sin(angle);
      o9(x, y);

      // in 2d overhead view
      this.t4s[i].x = x;
      this.t4s[i].y = y;
    }
  
    p2();
  
    g0(q5);
    cntx.lineWidth = 4;
    p2();



    // draw the start line
    t4DrawLength = 4;
    t2.lineWidth = 3;
    g0(q5);
    k3();
    angle = ((this.t4s[0].angle + 90) / 180) * PI;
    x -= t4DrawLength * cos(angle);
    y -= t4DrawLength * sin(angle);
    p0(x, y);
    x += 2 * t4DrawLength * cos(angle);
    y += 2 * t4DrawLength * sin(angle);
    o9(x, y);
  
    p2();
  },


  c9: function() {
    //var canvas = document.getElementById('v5Canvas');
    cntx = j1.x;//canvas.getContext('2d');
    this.m6 = j1.c;

    j7(600, 600);
    i5(this.map, 0, 0, 600, 600, 0, 0, 600, 600);
  
    // opponents
    for(var i = 0; i < cars.length; i++) {
      var carPosition = cars[i].z;
      var t4 = v5.n1(carPosition);
      
      k3();
    
      t9(t4.x, t4.y, 5, 0, 2 * PI, false);
      k4(r5);
      s2();
      cntx.lineWidth = 2;
      g0('#999999');
      p2();
    }

    // v0 z position plus u4 z position from v0
    var u4Position = cars[0].z;
    var u4Segment = v5.n1(u4Position);
  
    k3();
    t9(u4Segment.x, u4Segment.y, 5, 0, 2 * PI, false);
    k4('#ff0000');
    s2();

    t2.lineWidth = 2;
    g0(p8);
    p2();
        
  }
}







                   // total number of cars on the road
var v5 = null;

var numbers = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT'];
var Race = function() {
  this.v5 = null;
//  this.u4 = null;

  this.state = 0;
  this.f0 = 3;
  this.lastTime = 0 ;

  this.r8 = 15;// 10;

  this.v5Number = 0;

  this.zIsDown = false;
  this.xIsDown = false;

  this.raceNumber = 0;
}






Race.c4 = 800;//800;//800;//1;//800;

Race.prototype = {
  init: function() {
    // init never gets called?
  },

  start: function(v5Number) {
    b5(0);

    if(v5Number >= 4) {
      v5Number = 0;
    }
//    v5Number = 3;
    this.raceNumber = v5Number;
    v5 = new v3();

    switch(v5Number) {
      case 0:
        v5.o3();
        break;
      case 1:
        v5.o2();
        break;
      case 2:
        v5.n8();
        break;
      case 3:
        v5.n6();
        break;

    }

    this.resetCars();
    u4 = cars[0];
    u4.b6();

    this.state = 0;
    this.f0 = 4;
    this.lastTime = l6();

  },

  raceOver: function() {
    this.state = 5;
  },

  keyDown: function(e) {
    if(this.state !== 5) {
      switch(e.keyCode) {
        case 90: // z
          this.zIsDown = true;
          u4.setDrift(true);
          break;
        case 88: // x
          this.xIsDown = true;
          u4.s0(true);
          break;
        case 38:
          u4.j0(true);
          break;
        case 40:
          u4.r6(true);
          break;
        case 37:
          u4.setTurnLeft(true);
          break;
        case 39:
          u4.m0(true);
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
          u4.setDrift(false);
          break;
        case 88:
          this.xIsDown = false;
          u4.s0(false);
          break;
        case 38:
          u4.j0(false);
          break;
        case 40:
          u4.r6(false);
          break;
        case 37:
          u4.setTurnLeft(false);
          break;
        case 39:
          u4.m0(false);
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
    var n, car, t4, offset, z, sprite, v9;
    for (var n = 0 ; n < this.r8 ; n++) {
      z = v5.r1() - (this.r8 - n) * v3.t4Length * 13;

      t4 = v5.n1(z);

      var v5Left = t4.p1.v4.x;
      var v5Right = t4.p2.v4.x;
//      var v5Width = v5Right - v5Left;

//      sprite = SPRITES.CAR_STRAIGHT;

      car = new Car();

      var x = 0;
      if(n%2) {
        x = v5Left / 2;
      } else {
        x = v5Right / 2 - car.width;

      }


      car.index = n;
//      car.offset = offset;
      car.x = x;
      car.z = z;
      car.sprite = sprite;
      car.v9 = 0;//v9;      
      car.percent = b2(car.z, v3.t4Length);  

      // u4 v9s are set in car.js
      if(car.index !== 0) {
        var s4 = 23000;//23000;
        if(car.index < 8 && car.index > 3) {
          car.s4 = s4 * 0.905 - r9() * (this.r8 - n - 1) * s4 / 55;
        } else if(car.index > 12) {
          car.s4 = s4 * 0.905 - (this.r8 - n - 1) * s4 / 65;
        } else {
          car.s4 = s4 * 0.905 - (this.r8 - n - 1) * s4 / 45;
        }
        car.accel = s4 / 2;  
        
        if(car.index < 4) {
          car.c5 = false;
        } else if(car.index < 8) {
          car.c5 = r9() > 0.4;
          car.slowOnCorners = r9() > 0.6;
        }
      }
      t4.cars.push(car);
      cars.push(car);
    }

  },

  j3: function(dt) {
    var time = l6();
    if(time - this.lastTime > Race.c4) {
      this.lastTime = l6();
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
    var time = l6();
    if(time - this.lastTime > Race.c4) {
      this.lastTime = l6();
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
    var u4Segment = v5.n1(u4.z);
    var v9Percent  = u4.v9Percent;//u4.v9 / s4;
    var dx            = dt * 2 * v9Percent; // at top v9, should be able to cross from left to right (-1 to 1) in 1 second
    var startPosition = v0.z;
  
    for(var i = 0; i < cars.length; i++) {
      cars[i].update(dt);//, u4Segment, u4.width);
    }
  //  updateCars(dt, u4Segment, u4.width);
  
//    u4.update(dt);
    v0.update(dt);


    h3  = l1(h3,  i2  * u4Segment.v6 * (v0.z-startPosition) / v3.t4Length, 1);
    h4 = l1(h4, i3 * u4Segment.v6 * (v0.z-startPosition) / v3.t4Length, 1);
    h6 = l1(h6, i4 * u4Segment.v6 * (v0.z-startPosition) / v3.t4Length, 1);


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
    l9();
    if(this.state == 0) {
//      t2.font = "120px \"Courier New\", Courier, monospace";
      t2.font = 'italic bold 350px ' + q7;

      if(this.f0 < 4) {
        k4(r5);
        l2("RACE", 14, 304);  
        k4(q5);
        l2("RACE", 10, 300);  
      }

      if(this.f0 < 3) {
        if(this.raceNumber == 0) {
          t2.font = 'italic bold 440px ' + q7;
        } else if(this.raceNumber == 1) {
          t2.font = 'italic bold 430px ' + q7;
        } else if(this.raceNumber == 2) {
          t2.font = 'italic bold 290px ' + q7;
        } else if(this.raceNumber == 3) {
          t2.font = 'italic bold 358px ' + q7;
        }

        k4(r5);
        l2(numbers[this.raceNumber], 14, 674);  
        k4(q5);
        l2(numbers[this.raceNumber], 10, 670);  
      }

    }

    if(this.state == 1) {

      t2.font = ' 300px ' + q7;
      t2.fillStyle= '#111111';
      t2.fillText(this.f0, 449, 254);  
      t2.fillStyle= q5;
      t2.fillText(this.f0, 445, 250);  


    }
    
    if(this.state == 4) {

      k4(q5);
      g0(q5);
      t2.font = ' 80px ' + q7;
      t2.fillText(u4.n3(), 10, 80);

      t2.font = ' 40px ' + q7;
      t2.fillText("Lap " + u4.getLap() + " of 2", 10, 130);
      t2.fillText("Lap Time: " + u4.d2().toFixed(2), 10, 180);


      t2.font = ' 80px ' + q7;

      var v9 = ("000" + Math.round(u4.r7() / 100 ).toString(10)).substr(-3);
      t2.fillText( v9 + "km/h", 695, 80);
      t2.font = ' 40px ' + q7;

      t2.fillText( "Turbo ", 670, 136);
      k3();
      t2.rect(796, 110, 208, 28);
      p2();      
      m2(800, 114, u4.o1 * 2, 20);

      if( cars[0].e7 > 0) {
        t2.font = ' 160px ' + q7;
        k4(q5);
        t2.fillText(cars[0].n3(), 334, 184);
      }

    }

    if(this.state == 5) {
      t2.font = ' 300px ' + q7;
      k4(q5);
      t2.fillText(cars[0].g5, 300, 290);//cars[0].g5, 494, 254);
      t2.font = ' 40px ' + q7;
      var y = 380;
      if(cars[0].g5 == '1st') {
        t2.fillText("x: Next Race", 397, y);
        y += 80;
      }
      t2.fillText("z: Retry", 445, y);
    }


  }
}

var canvas = document.getElementById('gameCanvas');
var t2 = canvas.getContext('2d');
var u8 = false;

var l6 = function() { return performance.now(); };


document.addEventListener("keydown", function(e) {
  if(u8) {
    race.keyDown(e);
  } else {
    m4.keyDown(e);
  }
});


document.addEventListener("keyup", function(e) {
  if(u8) {
    race.keyUp(e);
  } else {
    m4.keyUp(e);
  }
});


var now = l6();
var last = l6();

var dt = 0;
var gdt = 0;

var cars           = [];                      // array of cars on the road
var u4 = null;
var v0 = new u3();
var race = new Race();
v5 = new v3();
var m4 = new m5(canvas, t2);

function startGame(options) {
  i6();
  speak('Start');
  u8 = true;
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

  now = l6();
  dt  = Math.min(1, (now - last) / 1000); 
  gdt = gdt + dt;

  if(!u8) {
    m4.render(dt);
    gdt = 0;
  } else {
    n2 = false;

    var step = 1/180;
    while (gdt > step) {
      gdt = gdt - step;
      race.update(step);
    }

    v5.c9();
    race.render();

    last = now;

  }
  requestAnimationFrame(frame);
//  stats.end();
}
frame(); 




var r4 = null;
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
  if(r4 == null) {
    r4 = new (window.AudioContext || window.webkitAudioContext)();

    a0();
    a1();
    a2();


    f6 = r4.createScriptProcessor(1024);
    f6.onaudioprocess = function(e) {
      //f7 = g7;

      var channel = e.outputBuffer.getChannelData(0);
      var index;

      for (var i = 0; i < channel.length; ++i) {
        // skip more data frames on higher v9

        if(u4.v7) {
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

        if(u4.h2 > 0) {
          channel[i] += Math.random() * 0.4;
        }
        //channel[i] += f7[index] + Math.random() * 0.01;
      }
      d5 %= f7.length;    
      f4 %= g7.length;    
//      audioScriptCurrentFrame %= f7.length;

    }
    f5 = r4.createGain();
    f5.gain.value = 0.14;
    f6.connect(f5);
    f5.connect(r4.destination);
  }
}

function a1() {
  var bufferSize = 1024;//2 * r4.sampleRate;
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
  var bufferSize = 1024;//2 * r4.sampleRate;
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
      f7[index++] = lastValue + step * j;
    }
    lastValue = nextValue;
  }
  
  positionDiff = bufferSize - (index - 1);
  var step = (1 - lastValue) / positionDiff;
  for (var j = 0; j < positionDiff; j++) {
    f7[index++] = lastValue + step * j;
  }


}

function a2() {

  var bufferSize = 2 * r4.sampleRate;
  n7 = r4.createBuffer(1, bufferSize, r4.sampleRate);
  var output = n7.getChannelData(0);

  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
    
}

function i7(freq, duration) {
  var gain = r4.createGain();
    
  var osc = r4.createOscillator();
  osc.connect(gain);
  gain.connect(r4.destination);
  osc.type = "triangle";//"sawtooth";
  osc.frequency.value = freq;
  gain.gain.value = 0.1;
  osc.start(r4.currentTime);
  osc.stop(r4.currentTime + duration);
}

function b5(v9) {
  d6 = 0.2 + v9 * 2;
}

function b8() {
}


var i1 = 0;
function g8() {

  var crashTime = l6();
  if(crashTime - i1 < 1000) {
    return;

  }
  i1 = crashTime;

  var noteLength = 1/2;
  var gain = r4.createGain();

  var audioSource = null;
  audioSource = r4.createBufferSource();
  audioSource.connect(gain);
  gain.connect(r4.destination);

  audioSource.buffer = n7;

  gain.gain.linearRampToValueAtTime(0.5, r4.currentTime );//+ 1/64);
  gain.gain.linearRampToValueAtTime(0, r4.currentTime + noteLength * 0.7 );

  audioSource.playbackRate.setValueAtTime(0.035, r4.currentTime);
  audioSource.playbackRate.setValueAtTime(0.002, r4.currentTime + noteLength);
  audioSource.start(r4.currentTime);
  audioSource.stop(r4.currentTime+noteLength);


}



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


