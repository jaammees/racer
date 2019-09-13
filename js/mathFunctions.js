// hopefully  versions of math functions which take less bytes
var M = Math;
var PI = Math.PI;

function mathRand() {
  return M.random();
}
function mathRandInt(limit) {
  return M.floor(mathRand() * limit);
}

function sin(angle) {
  return M.sin(angle);
}

function cos(angle) {
  return M.cos(angle);
}
