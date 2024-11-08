<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"> 
	<title>更多修改提交页面</title>
<?php require('include/start.php');islogin(); ?>
</head>
<body>
</body>
</html>
<?php
if (isset($_POST['background']) and isset($_POST['sign'])){
$background=$_POST['background'];
$sign=$_POST['sign'];
$name=$_COOKIE["name"];
include "install/config.php";
$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn){
die("数据库连接失败<br>"."原因:".mysqli_connect_error());
}
//密码要写这
$password=$_COOKIE["password"];
$sql="UPDATE user SET sign='$sign',background='$background' WHERE name='$name' AND password='$password'";
//die($password);
if (@mysqli_query($conn,$sql)){
}
else{
die("修改失败<br>".mysqli_error($conn));
}
$conn->close();
modal("修改","成功");
echo "<script>setTimeout(\"window.location='admin.php'\",1500)</script>";
//setTimeout("",1000)
}
else{
die("参数不完整");
}
?>