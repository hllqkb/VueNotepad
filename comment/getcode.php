<?php
require_once "include/function.php";
session_start();
sendcode();
function send(){
//send code
$ra=rand(1000,9999);
$_SESSION["code"]=$ra;
$email=$_GET['email'];
$text="<h1>您的邮箱验证码为:</h1><h2><a href='#'>$ra</a></h2>";
$st=sendmail($text,$email);
if ($st){
echo "邮件发送成功";
}
else{
echo "邮件发送失败";   
}
}

function sendcode(){
if (!isset($_SESSION["time"])){
//first send
$_SESSION["time"]=time();
$_SESSION["time1"]=time()+60;
send();
}
else{
$now=time();
if ($now>=$_SESSION["time1"]){
//send
session_start();
//unset($_SESSION["time1"]);
//unset($_SESSION["time"]);
sendcode();
}
else{
echo "60秒还没过去呢";
}
}
}
?>