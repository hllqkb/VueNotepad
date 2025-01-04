<?php
require_once "install/config.php";
require_once "include/function.php";
if (isset($_POST["user"]) and isset($_POST["Password"]) and isset($_POST["Password1"]) and isset($_POST["email"]) and isset($_POST["code"])){
$user=$_POST["user"];
$email=$_POST["email"];
$Password=$_POST["Password"];
$Password1=$_POST["Password1"];
$code=$_POST["code"];
session_start();
//die($_SESSION["code"]);
if ($code!=$_SESSION["code"]){
die("验证码错误");
}
unset($_SESSION["code"]);
$conn=mysqli_connect($servername,$username,$password,$db);
$sql="select * from user where name='$user'";
$r=mysqli_query($conn,$sql);
if (mysqli_num_rows($r)>0){
    while($row =mysqli_fetch_assoc($r)) {
    die("此账号已被注册");
    }
}
$sql="select * from user where email='$email'";
$r=mysqli_query($conn,$sql);
if (mysqli_num_rows($r)>0){
    while($row =mysqli_fetch_assoc($r)) {
    die("此邮箱已被注册");
    }
}

if (mb_strlen($user)<4||mb_strlen($user)>10){
    die("账号长度不合格");
}
if (strlen($user)<4){
    die("密码长度不合格");
}
if (preg_match_all("/^[a-zA-Z][a-zA-Z0-9_]$|\s/",$user))
{
    die("名字含有非法字符");
}
if ($Password==""){
     die("不会真有人不要密码吧？");
}
if (preg_match_all("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/",$Password)){
    die("密码含有非法字符");
}
if ($Password!=$Password1){
   die("两次输入的密码不一样");
}
$password=mix($Password);
$sql="INSERT INTO user (name,email,avatar,comments,password,isblock,background,sign,isadmin) VALUES ('$user','$email','','','$password','false','','暂无签名','false')";
if (!mysqli_query($conn,$sql)){
die("插入数据失败".mysqli_error($conn));
}
mysqli_close($conn);
modal("提示","注册成功，跳转中...");
echo "<script>setTimeout(\"window.location='loginhtml.php'\",1500)</script>";
}
else{
echo "参数不完整";
exit;
}
?>