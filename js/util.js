
function utilPercentRemaining(n, total) { 
  return ( n % total) / total;
}

function utilInterpolate(a,b,percent) { 
  return a + (b-a)*percent                                        
}

function utilIncrease(start, increment, max) {
  var result = start + increment;

  while (result >= max)
    result -= max;
  while (result < 0)
    result += max;
  return result;
}
