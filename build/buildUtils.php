<?php

$GLOBALS["LASTIDINDEX"] = 0;

$GLOBALS["ALLIDS"] = [ "s5","s6","s7","s8","x1","x2","x3","x4","y1","y2","y3","y4"];
function getIdentifier() {
  $letters = range('a', 'z');
  $idOk = false;


  $id = "";

  while(!$idOk) {
    $index = $GLOBALS["LASTIDINDEX"]++;

    $numericPart = $index % 10;
    $id = $numericPart;

    $alphaPart = floor($index / 10);

    $nextAlpha = $alphaPart % 26;
    $alpha = $letters[$nextAlpha];
    $id = $alpha . $id;

    $alphaPart = floor($alphaPart / 26);
    if($alphaPart > 0) {
      $alphaPart -= 1;
      $nextAlpha = $alphaPart % 26;
      $alpha = $letters[$nextAlpha];
      $id = $alpha . $id;
    }

    $alphaPart = floor($alphaPart / 26);
    if($alphaPart > 0) {
      $alphaPart -= 1;
      $nextAlpha = $alphaPart % 26;
      $alpha = $letters[$nextAlpha];
      $id = $alpha . $id;
    }


    if(in_array($id, $GLOBALS["ALLIDS"])) {
      print "ALREADY EXISTS!!!!" . $id . "\n";
//      exit();
    } else {
      $idOk = true;
    }
  }

  $GLOBALS["ALLIDS"][] = $id;
  
  return $id;
}

function recursive_copy($src,$dst) { 
  $dir = opendir($src); 
  @mkdir($dst); 
  while(false !== ( $file = readdir($dir)) ) { 
      if (( $file != '.' ) && ( $file != '..' )) { 
          if ( is_dir($src . '/' . $file) ) { 
            recursive_copy($src . '/' . $file,$dst . '/' . $file); 
          } 
          else { 
              copy($src . '/' . $file,$dst . '/' . $file); 
          } 
      } 
  } 
  closedir($dir); 
} 

function cmpkeys($a, $b) {
  return strlen($b) - strlen($a);
}

/*
function copyWithReplace($src, $dest) {
  $source = file_get_contents($src) . "\n\n";
  $source = replaceConstants($source);
  $source = replaceVariablesWithMap($source);

  $fp = fopen($dest, "w");
  fwrite($fp, $source);
  fclose($fp);
}
*/

function replaceVariables($content, $replacements) {
  
  usort($replacements, "cmpkeys");
  foreach($replacements as $name) {
    $value = getIdentifier();
    $content = str_replace($name, $value, $content);
    $GLOBALS["VARIABLEMAP"][$name] = $value;
  }

  return $content;
}

function replaceVariablesWithMap($content) {
  uksort($GLOBALS["VARIABLEMAP"], "cmpkeys");
  foreach($GLOBALS["VARIABLEMAP"] as $name => $value) {

    print "replace $name with $value\n";
    $content = str_replace($name, $value, $content);
  }

//  print_r($GLOBALS["VARIABLEMAP"]);

  return $content;

}

function replaceConstants($content, $constantsFile = "build/constants.js") {
  if(!file_exists($constantsFile)) {
    print "constants file doesn't exist!!! $constantsFile";
    exit();
  }
  $constants = [];
  $constantsContent = file_get_contents($constantsFile);
  $lines = explode("\n", $constantsContent);
  foreach($lines as $line) {
    $originalLine = $line;
    $line = trim($line);
    if($line) {
      $line = trim($line, ";");
      $line = str_replace("var ", "", $line);
      $parts = explode("=", $line);
      if(count($parts)  != 2) {
        print "parts = " . count($parts) . "\n";
        print $line . "\n";
        exit();
      } else {
//        print $line . "\n";
        $name = trim($parts[0]);
        if(array_key_exists($name, $constants)) {
          print "already exists $name";
          exit();
        } else {  
          $constants[$name] = trim($parts[1]);
        }
        $content = str_replace($originalLine, "", $content);
      }
    }
  }

  uksort($constants, "cmpkeys");

  print_r($constants);
  foreach($constants as $name => $value) {
    $content = str_replace($name, $value, $content);
  }

  return $content;
}



function copyIndex($src, $dest) {
  $source = file_get_contents($src) . "\n\n";
  //$source = replaceConstants($source);

  $source = str_replace("{v}", $GLOBALS["VERSION"], $source);

  $fp = fopen($dest, "w");
  fwrite($fp, $source);
  fclose($fp);  
}




function buildFromSource($jsPath, $exclude, $constantsFile, $replacements, $outputFile) {

  $index = file_get_contents("dev.html");

//  $exclude = [  ];

//  $searchString = 'src="js/c64/c64js/';
  $searchString = 'src="' . $jsPath;

  $pos = strpos($index, $searchString);

  $source = "";

  while($pos !== false) {
    $pos += strlen($searchString);

    $endPos = strpos($index, '"', $pos);
    $pos -= (strlen($searchString) - 5);
    $filepath = substr($index, $pos, $endPos - $pos);
    print "filepath = $filepath\n";
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


  $source = replaceConstants($source, $constantsFile);
  $source = replaceVariables($source, $replacements);

  $fp = fopen($outputFile, "w");
  fwrite($fp, $source);
  fclose($fp);
}

