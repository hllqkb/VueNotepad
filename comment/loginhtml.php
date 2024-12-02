<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>登入</title>
    <?php require('include/start.php'); ?>
    <style>
        /*将整个登入的div垂直居中*/
      #all 
      {
            opacity: 0.75;
            background-color: white;
            height: 450px;
            padding-top: 40px;
            padding-bottom: 40px;
            transform: translateY(20%);  /*向下移动自身的一半*/
      }
        body {
        height: 100vh;
        width: 100%;
        position: relative;
        background-image:url('./img/bg.jpg');
        backdrop-filter: blur(3px);
        background-size: cover;
        }
      /*lable文字位于同一行*/
      label{
        width: 100px;
        float:left
        white-space:nowrap
      }
    </style>

</head>
<body>
<div class="container">
    <div class="col-md-offset-3 col-sm-6" id="all">
        <h2 style="text-align: center">用户登入</h2>
        <form action="login.php" method="post" class="form-horizontal">
            <!--设置用户名-->
            <div class="form-group">
                <label for="userName" class="col-sm-2 control-label col-md-offset-2">账号：</label>
                <div class="col-sm-6">
                    <input required="" type="text" class="form-control" id="passwd" name="userName" placeholder="请输入用户名/邮箱">
                </div>
            </div>
            <!--设置密码-->
            <div class="form-group">
                <label for="passwd" class="col-sm-2 control-label col-md-offset-2">密码：</label>
                <div class="col-sm-6">
                    <input required="" type="password" class="form-control" id="passwd" name="passwd" placeholder="请输入密码">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-4 col-sm-6">
                    <div class="checkbox">
                        <label>
                            <p><input required="" type="checkbox">已阅读并同意<a id="user">用户协议</a></p>
                            <script>           
                                $(document).ready(function(){
$('#user').click(function (){
    $.get('https://photo.shuia.tk/read.txt',function (d,s){
    alert(d)
})
})
})
                            
                            </script>
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-4 col-sm-4">
                    <button type="submit" class="btn btn-default btn-primary btn-block">登入</button>
                </div>
                <br>
            </div>
        </form>
        <div class="col-sm-offset-4 col-sm-4">
                    <button onclick="window.location='registerhtml.php'" type="submit" class="btn btn-default btn-default btn-block">注册</button>
                </div>
    </div>

</div>
</body>
</html>