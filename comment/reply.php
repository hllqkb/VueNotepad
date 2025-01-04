<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"> 
	<title>回复页面</title>
<?php require('include/start.php');islogin(); ?>
</head>
<body>
</body>
</html>
<?php
if (!isset($_GET["id"])){
die("缺少参数");
}
$id=$_GET["id"];
if (isset($_POST['avatar'])){
$avatar=$_POST['avatar'];
$name=$_COOKIE["name"];
include "install/config.php";
$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn){
die("数据库连接失败<br>"."原因:".mysqli_connect_error());
}
$sql=$conn->prepare("INSERT INTO $dbb (name,email,subject,message,reply,avatar) VALUES (?,?,?,?,?,?)");
$sql->bind_param("ssssss",$name,$email,$subject,$message,$reply,$avatar);
$subject="";
$get=getUser();
$name=$get['name'];
$email=$get['email'];
$message=$avatar;
$reply=$id;
$avatar=$get["avatar"];
//die($name);
$sql->execute();
$sql->close();
$conn->close();
modal("回复","成功");
echo "<script>setTimeout(\"window.location='comments.php'\",1500)</script>";
//setTimeout("",1000)
}
else{
die("参数不完整");
}
?>