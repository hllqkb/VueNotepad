<?php
//get
require_once "install/config.php";
require_once "include/function.php";
if (isset($_GET["p"])){
$page=$_GET["p"];
//echo "$page";
//limit 的m,n意思不是从m到n!
$pagestart=($page-1)*$line;
$pageend=$line;
//echo($pagestart);
$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn){
die("数据库连接失败<br>"."原因:".mysqli_connect_error());
}
$sql="SELECT name,email,subject,message,reply,reg_date,avatar,id FROM comments ORDER BY id DESC LIMIT $pagestart,$pageend";
$r=mysqli_query($conn,$sql);
if(mysqli_num_rows($r)>0){
//echo mysqli_num_rows($r);
while ($row=mysqli_fetch_array($r)){
//limit page
$name=$row["name"];
$email=$row["email"];
$subject=$row["subject"];
$message=$row["message"];
$reply=$row["reply"];
$reg_date=$row["reg_date"];
$avatar=$row["avatar"];
$id=$row["id"];
//die();
comment($name,$email,$subject,$message,$reply,$reg_date,$avatar,$id);

}
}
elseif(mysqli_num_rows($r)==0){
echo "暂时还没有人留言";
}
else{
die("读取留言失败<br>原因:".mysqli_error($conn));
}

}
//get
?>