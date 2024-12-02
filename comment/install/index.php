<?php
require_once "../include/function.php";
if (file_exists("install.lock")){
die("您已经安装过了，请删除install.lock重新安装");
}
include "config.php";
@$conn=mysqli_connect($servername,$username,$password,$db);
if (!$conn){
die("数据库连接失败<br>"."原因:".mysqli_connect_error());
}
echo "连接成功<br>";
//删除数据表
$sql="DROP TABLE IF EXISTS $dbb,user";
if (@mysqli_query($conn,$sql)){
echo "清除数据表成功<br>";
}
else{
die("清除数据表失败<br>".mysqli_error($conn));
}
/*$sql="CREATE DATABASE $db";
if (mysqli_query($conn,$sql)){
    echo "数据库创建成功<br>";
}
else{
    die("创建数据库失败<br>"."原因:".mysqli_error($conn));
}*/
$sql="CREATE TABLE $dbb (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(30) NOT NULL,email VARCHAR(30) NOT NULL,subject VARCHAR(50),message LONGTEXT NOT NULL,reply TEXT,reg_date TIMESTAMP,avatar VARCHAR(255))";
if (mysqli_query($conn,$sql)){
echo "创建留言数据表成功<br>";
}
else{
die("创建数据表失败<br>原因:".mysqli_error($conn));
}
$sql="CREATE TABLE user (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(15) NOT NULL,email VARCHAR(30) NOT NULL,avatar VARCHAR(255),comments LONGTEXT,password VARCHAR(50) NOT NULL,isblock TEXT,background TEXT,sign VARCHAR(50),isadmin VARCHAR(10),reg_date TIMESTAMP)";
if (mysqli_query($conn,$sql)){
echo "创建用户数据表成功<br>";
}
else{
die("创建数据表失败<br>原因:".mysqli_error($conn));
}
//注册管理员
$mixpd=mix($userpd);
$sql="INSERT INTO user (name,email,avatar,comments,password,isblock,background,sign,isadmin) VALUES ('$user','$usermail','','','$mixpd','false','','暂无签名','true')";
if (!mysqli_query($conn,$sql)){
die("注册管理员失败".mysqli_error($conn));
}
else{
echo "注册管理员成功<br>";
echo "管理员账号: $user";
echo "<br>";
echo "管理员密码: $userpd";
echo "<br>";
echo "后台管理地址: <a href='../admin/'>admin</a>";
}
file_put_contents("install.lock","");
mysqli_close($conn);
echo "完成<br><a href='../'>主页</a>";
?>