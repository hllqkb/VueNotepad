<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"> 
	<title>提交页面</title>
<?php require('include/start.php'); ?>
</head>
<body>
</body>
</html>
<?php
if (isset($_POST['name']) and isset($_POST['email']) and isset($_POST['message'])){
include "install/config.php";
$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn){
die("数据库连接失败<br>"."原因:".mysqli_connect_error());
}
$sql=$conn->prepare("INSERT INTO $dbb (name,email,subject,message,reply,avatar) VALUES (?,?,?,?,?,?)");
$sql->bind_param("ssssss",$name,$email,$subject,$message,$reply,$avatar);
if (isset($_POST['subject'])){
$subject=$_POST['subject'];  
}
else{
$subject="";
}
$name=$_POST['name'];
$email=$_POST['email'];
$message=$_POST['message'];
$reply="";
$get=getUser();
$avatar=$get["avatar"];
//die($avatar);
$sql->execute();
$sql->close();
$conn->close();
modal("留言提交","成功");
echo "<script>setTimeout(\"window.location='../'\",1500)</script>";
//setTimeout("",1000)
}
else{
die("参数不完整");
}
?>