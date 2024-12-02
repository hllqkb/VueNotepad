<?php
require_once "../include/function.php";
require_once "../install/config.php";
isadmin();
$name="cloudcomment.zip";
$url=$cloud.$name;
$uz="../".$name;
$r=copy($url,$uz);
if ($r){
if (unzip($uz)==false){
die("解压失败");
}
else{
die("更新完成");
}
}
else{
die("下载失败");
}
?>