<!DOCTYPE html>
<html>
<head>
   <title>注册</title>
      <?php require('include/start.php'); ?>
</head>
<body class="container">
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
          <h4 class="modal-title" id="myModalLabel">提示</h4>
			</div>
			<div id="recode" class="modal-body">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					关闭
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="row">
  <div class="col-md-4"></div>

  <div class="col-md-4">
      
      <legend class="text-center">用户注册</legend>
    <form id="ajax-contact" action="register.php" method="post">
  <div class="form-group row">
  <div class="form-group">
    <label for="exampleInputEmail1">用户名</label>
    <input required="" type="text" class="form-control" id="user" name="user" placeholder="Username">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">邮箱</label>
    <input required="" type="text" class="form-control" id="email" name="email" placeholder="email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input required="" type="password" class="form-control" id="Password" name="Password" placeholder="Password">
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">确认密码</label>
    <input required="" type="password" class="form-control" id="Password1" name="Password1" placeholder="Password">
  </div>
<div class="form-group">
    <label for="code">发送邮件</label>
     <div class="input-group">
                    <input id="code" name="code" placeholder="输入验证码" type="text" class="form-control">
                    <span class="input-group-btn">
                        <button id="getCode" class="btn btn-primary" type="button">发送验证码</button>
                    </span>
                </div>  </div>
  <center><button style="width: 250px" type="submit" class="btn btn-primary">注册</button>
</center></div>
<div id="form-messages"></div>
</form>
  </div>
  <div class="col-md-4"></div>
</div>
<script>
$(document).ready(function(){
var timer="";
var nums=60;
var validCode=true;//定义该变量是为了处理后面的重复点击事件
$("#getCode").on('click',function(){
            console.log("111");
            var code=$(this);
            if(validCode){
                validCode=false;
                email=$("#email").val()
                //alert(email)
                url="getcode.php?email="+email
                //alert(url)
                $.get(url,function (d,s){
 $('#recode').text(d)
 $('#myModal').modal('show')
})
                timer=setInterval(function(){
                    if(nums>0){
                        nums--;
                        code.text(nums+"秒后重新发送");
                        code.addClass("gray-bg");
                    }
                    else{
                        clearInterval(timer);
                        nums=60;//重置回去
                        validCode=true;
                        code.removeClass("gray-bg");
                        code.text("发送验证码");
            }
                },1000)
            }
            }) 
})
</script>

</body>
</html>