var cntx = null;


function cntxClearRect(width, height) {
  cntx.clearRect(0, 0, width, height);
}

function cntxGlobalAlpha(alpha) {
  cntx.globalAlpha = alpha;
}
function cntxFillRect(x, y, width, height) {
  cntx.fillRect(x, y, width, height);
}
  
function cntxCreateLinearGradient(x0, y0, x1, y1) {
  return cntx.createLinearGradient(x0, y0, x1, y1);
}

function cntxStrokeStyle(s) {
  cntx.strokeStyle = s;
}

function cntxStroke() {
  cntx.stroke();
}

function cntxFillStyle(s) {
  cntx.fillStyle = s;
}

function cntxBeginPath() {
  cntx.beginPath();
}

function cntxMoveTo(x, y) {
  cntx.moveTo(x, y);
}

function cntxArc(x,y,r,sAngle,eAngle,counterclockwise) {
  cntx.arc(x,y,r,sAngle,eAngle,counterclockwise);
}

function cntxLineTo(x, y) {
  cntx.lineTo(x, y);
}
function cntxClosePath() {
  cntx.closePath();
}

function cntxFill() {
  cntx.fill();
}

function cntxFillText(t,x,y) {
  cntx.fillText(t,x,y);

}

function cntxSave() {
  cntx.save();
}

function cntxRestore() {
  cntx.restore();
}

function cntxTranslate(x, y) {
  cntx.translate(x, y);
}

function cntxRotate(a) {
  cntx.rotate(a);
}

function cntxDrawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
  cntx.drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}
