<?php

// hack to make build
include_once("build/buildUtils.php");
include_once("build/buildReplacements.php");



$index = file_get_contents("dev.html");

$exclude = [ ];

$searchString = 'src="js/';
$pos = strpos($index, $searchString);

$source = "";

while($pos !== false) {
  $pos += strlen($searchString);

  $endPos = strpos($index, '"', $pos);
  $pos -= 3;
  $filepath = substr($index, $pos, $endPos - $pos);
  $include = true;
  foreach($exclude as $ex) {
    if(strpos($filepath, $ex) !== false) {
      $include = false;
    }
  }
  if($include) {
    $qpos = strpos($filepath, "?");
    if($qpos !== false) {
      $filepath = substr($filepath, 0, $qpos);
    }
    print $filepath . "\n";

    if(file_exists($filepath)) {
      $source .= file_get_contents($filepath) . "\n\n";

    } else {
      print "FILE NOT FOUND $filepath";
      exit();
    }
  }
  $pos = strpos($index, $searchString, $pos);
}


$source = replaceConstants($source, "build/constants.js");

$source = replaceVariables($source, $buildReplacements);

print_r($GLOBALS["VARIABLEMAP"]);

$fp = fopen("build/main.js", "w");
fwrite($fp, $source);
fclose($fp);

$cmd = "uglifyjs build/main.js --mangle --output build/main.min.js";

exec($cmd);

