<?php
echo <<<EOF
    <link rel='stylesheet' href='https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css'>
    <script src='https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js'></script>
    <script src='https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js'></script>
    <script src="https://cdn.staticfile.org/angular.js/1.4.6/angular.min.js"></script>
EOF;
echo <<<EOF
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
EOF;

//die(__DIR__);
//die(__DIR__."/../"."install/config.php");
require_once __DIR__."/../include/"."function.php";
require_once root()."install/config.php";

install();
?>