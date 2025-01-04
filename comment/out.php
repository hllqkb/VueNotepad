<?php
require_once "include/function.php";
foreach ($_COOKIE as $key=>$v){
setcookie($key);
}
session_start();
session_destroy();
modal("提示","退出登录成功，跳转中...");
echo "<script>setTimeout(\"window.location='../'\",1500)</script>";
?>