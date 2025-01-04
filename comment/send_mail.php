<?php
namespace PHPMailer;

require_once("PHPMailer/PHPMailer.php");
require_once("PHPMailer/class.smtp.php");
require_once("install/config.php");

$mail = new PHPMailer();
$mail->SMTPDebug = 1;
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->Host = $host;
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->CharSet = 'UTF-8';
//这里需要自己配置
$mail->Username = $mailname;  //邮箱账号
$mail->Password = $mailpw;    //邮箱密码，QQ邮箱是授权码
$mail->From = $maildz;      //邮箱地址
//这里是提交的内容
//die($mail);
$mail->FromName = '水啊';
// 邮件正文是否为html编码 注意此处是一个方法
$mail->isHTML($isHTML);
// 设置收件人邮箱地址
$mail->addAddress($Adress);
//die($Adress);
// 添加该邮件的主题
$mail->Subject = $mailTitle;
// 添加邮件正文
$mail->Body = $content;
// 为该邮件添加附件
//$mail->addAttachment('C:\Users\maolimeng\Desktop\PHPMailer-master.zip');
// 发送邮件 返回状态
/*
$status = $mail->send();
if ($status=="1"){
echo "邮件发送成功";
}
else{
echo "邮件发送失败";
}
*/
?>