<?php
require_once "function.php";
if (isset($_COOKIE["login"]) and $_COOKIE["login"]==true){
$user=getUser();
$isblock=$user["isblock"];
if ($isblock=='true'){
modal("提示","此账号已被封禁，请重新登录...");
    echo "<script>setTimeout(\"window.location='loginhtml.php'\",1500)</script>";
    exit;
}
}
else{
setcookie("login",false,time()+$timec,"/");
modal("提示","您还没有登录，正在跳转登录");
echo "<script>setTimeout(\"window.location='./loginhtml.php'\",1500)</script>";
die();
}
?>