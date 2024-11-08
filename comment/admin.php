<!DOCTYPE html>
<html>
<head>
	<title>个人主页</title>
</head>
<body>
<?php require('include/start.php');islogin();include "include/nav.php"; ?>
<?php
$get=getUser();
$background=$get["background"];
$sign=$get["sign"];
if ($background!=""){
echo <<<EOF
<div style="background: url('$background');background-size: cover;" class="jumbotron">
EOF;
}
else{
echo <<<EOF
<div class="jumbotron">
EOF;
}
echo <<<EOF
    <div  class="container">
        <h1>欢迎登陆！</h1>
        <p>$sign</p>
        <p><a href="../" class="btn btn-primary btn-lg" role="button">
         发表留言</a>
        </p>
    </div>
</div>
EOF
?>
<div class="list-group">
	<a href="#" class="list-group-item active">
		<h4 class="list-group-item-heading">
			个人信息
		</h4>
	</a>
	<a href="#" class="list-group-item">
		<h4 class="list-group-item-heading">
			名字:
		</h4>
		<p class="list-group-item-text">
			<?php echo $_COOKIE["name"]; ?>
		</p>
	</a>
	<a href="#" class="list-group-item">
		<h4 class="list-group-item-heading">
			邮箱:
		</h4>
		<p class="list-group-item-text">
		<?php echo $_COOKIE["email"]; ?>
      </p>
	</a>
</div>
<div class="list-group">
	<a href="#" class="list-group-item active">
		<h4 class="list-group-item-heading">
			管理
		</h4>
	</a>
	<a href="name.php" class="list-group-item">
		<h4 class="list-group-item-heading">
			修改名字
		</h4>
		<p class="list-group-item-text">
		    仅支持修改名字
		</p>
	</a>
	<a href="avatar.php" class="list-group-item">
		<h4 class="list-group-item-heading">修改头像</h4>
		<p class="list-group-item-text">上传你的头像</p>
	</a>
   <a href="#" class="list-group-item">
		<h4 class="list-group-item-heading">修改密码</h4>
		<p class="list-group-item-text">修改你的密码</p>
	</a>
   <a href="morecghtml.php" class="list-group-item">
		<h4 class="list-group-item-heading">更多修改</h4>
		<p class="list-group-item-text">更多修改More</p>
	</a>
   <a href="out.php" class="list-group-item">
		<h4 class="list-group-item-heading">退出登录</h4>
		<p class="list-group-item-text">一键注销退出登录</p>
	</a>
</div>
<div class="list-group">
	<a href="#" class="list-group-item active">
		<h4 class="list-group-item-heading">
			消息
		</h4>
	</a>
   <hr >
   <?php //include "include/comments.html"; ?>
</div>

</body>
</html>