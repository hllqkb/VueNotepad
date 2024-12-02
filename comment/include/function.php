<?php
$timec=3600*24*365;
$line=15;
function unzip(string $zipName){
  $dest="../";
  //检测要解压压缩包是否存在
  if(!is_file($zipName)){
    return false;
  }
  //检测目标路径是否存在
  if(!is_dir($dest)){
    mkdir($dest,0777,true);
  }
  $zip=new ZipArchive();
  if($zip->open($zipName)){
    $zip->extractTo($dest);
    $zip->close();
    return true;
  }else{
    return false;
  }
}
function isadmin(){
$get=getUser();
$is=$get['isadmin'];
if ($is!="true"){
modal("提示","没有权限!");
echo "<script>window.location='../'</script>";
exit;
}
}
function sendmail($text,$adress){
global $mailname,$mailpw,$maildz,$host;
$content=$text;  //邮件内容
$isHTML=true;  //是否为html格式
$mailTitle="留言板";     //邮件标题
$Adress=$adress;   //收件人邮箱地址
require_once "send_mail.php";
$status = $mail->send();
if ($status=="1"){
//echo "邮件发送成功";
return true;
}
else{
//echo "邮件发送失败";
return false;
}
}
function getcomment($id){
global $servername,$username, $password, $db;
$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn){
die("数据库连接失败<br>"."原因:".mysqli_connect_error());
}
$sql="SELECT * FROM comments WHERE id='$id'";
$r=mysqli_query($conn,$sql);
$get=array();
if(mysqli_num_rows($r)>0){
while ($row=mysqli_fetch_assoc($r)){
$get["name"]=$row["name"];
$get["email"]=$row["email"];
$get["subject"]=$row["subject"];
$get["message"]=$row["message"];
$get["reply"]=$row["reply"];
$get["reg_date"]=$row["reg_date"];
$get["avatar"]=$row["avatar"];
}
}
else{
die("未找到留言");
}
return $get;
}
function root(){
return __DIR__."/../";
}
function getUser(){
//获取用户信息
global $servername,$username, $password, $db;
$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn){
die("数据库连接失败<br>"."原因:".mysqli_connect_error());
}
$name=$_COOKIE["name"];
$r = mysqli_query($conn,"SELECT * FROM user WHERE name='$name'");
//avatar,comments,reg_date
if (!$r) {
 printf("错误: %s\n", mysqli_error($conn));
 exit();
}
$information=array();
while($row = mysqli_fetch_array($r))
{
$information["avatar"]=$row["avatar"];
$information["comments"]=$row["comments"];
$information["reg_date"]=$row["reg_date"];
$information["isblock"]=$row["isblock"];
$information["email"]=$row["email"];
$information["name"]=$row["name"];
$information["background"]=$row["background"];
$information["sign"]=$row["sign"];
$information["isadmin"]=$row["isadmin"];
}
//防止本地cookie注入!!!very important
if (empty($information)){
modal("⚠警告⚠","检测到非法请求，重新登录!");
echo "<script>window.location='../out.php'</script>";
exit;
}
return $information;
}
function comment($name,$email,$subject,$message,$reply,$reg_date,$avatar,$id){
//echo("$subject");
if ($avatar==""){
//头像
$avatar="../img/user.jpg";  
}

if ($subject=="" and $reply!=""){
$get=getcomment($reply);
$replymessage=$get["message"];
$rename=$get["name"];
//echo "回复";
echo <<<EOF
<li class="media">
                        <div class="media-left">
                            <a href="admin.php">
                                <img style="width: 50px;height: 50px;" src="$avatar" class="img-rounded media-object">
                            </a>
                        </div>
 <div class="media-body">
 <h4>$name</h4>
                            <h6>$reg_date</h6>
                            <p>回复 $rename 的留言</p><div class="well well-sm">$replymessage<p class="well">$message</p></div>
                            <a href="../" target="_blank" class="pull-left">来自留言板</a>
                            <a href="include/report.php?id=$id" target="_blank" class="pull-right">举报</a>
                            <a href="../replyhtml.php?id=$id" target="_blank" class="pull-right">回复</a>
                        </div>
                    </li>
EOF;
}
else{
echo <<<EOF
 <li class="media">
                        <div class="media-left">
                            <a href="admin.php">
                                <img src="$avatar" class="img-rounded media-object">
                            </a>
                        </div>
 <div class="media-body">
 <h4>$name</h4>
                            <h6>$reg_date</h6>
                            <h3>$subject</h3>
                            <p class="well">$message</p>
                            <a href="../" target="_blank" class="pull-left">来自留言板</a>
                            <a href="include/report.php?id=$id" target="_blank" class="pull-right">举报</a>
                            <a href="../replyhtml.php?id=$id" target="_blank" class="pull-right">回复</a>
                        </div>
                    </li>
EOF;
}
}
function mix($pd){
$salt="hllqk";
$pd=$pd.md5($salt);
$pd=md5($pd);
return $pd;
}
function install(){
if (!file_exists(root()."install/install.lock")){
echo "<script>window.location='../install/index.html'</script>";
}  
}
function islogin(){
//判断登录
require_once "islogin.php";
}
function modal($title,$subject){
require_once "start.php";
echo <<<EOF
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">$title</h4>
			</div>
			<div class="modal-body">
				$subject
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					关闭
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
EOF;
echo "<script>$('#myModal').modal('show')</script>";
}
//echo "<link rel='stylesheet' href='./include/all.css'>";
?>