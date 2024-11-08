<?php
require_once "install/config.php";
require_once "include/function.php";
if(isset($_POST['userName']) and isset($_POST['passwd'])){
$userName=$_POST['userName'];
$passwd=$_POST['passwd'];
$passwordmix=mix($passwd);
$conn=mysqli_connect($servername,$username,$password,$db);
$result = mysqli_query($conn,"SELECT * FROM user WHERE name='$userName' or email='$userName'");
while($row=mysqli_fetch_array($result)) {
    if ($row["password"]!=$passwordmix){
//echo $row["password"]."<br>".$passwordmix;
die("密码错误");
}
    $conn->close();
    setcookie("login",true,time()+$timec,"./");
    setcookie("password",$passwordmix,time()+$timec,"./");
    setcookie("name",$row["name"],time()+$timec,"./");
    setcookie("email",$row["email"],time()+$timec,"./");
    modal("提示","登录成功，跳转中...");
    echo "<script>setTimeout(\"window.location='../'\",1500)</script>";
    exit;
}
echo "登录失败";
}else{
die("参数不完整");
}
?>