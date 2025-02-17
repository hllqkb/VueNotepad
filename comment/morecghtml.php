<!DOCTYPE html>
<html>
<head>
    <title>更多修改</title>
    <body>
<?php
require_once "include/nav.php";
?>
    <?php require('include/start.php');islogin(); ?>
    <script src="https://cdn.staticfile.org/angular.js/1.4.6/angular.min.js"></script>
</head>
<div class="alert alert-warning alert-dismissable">
            <button type="button" class="close" data-dismiss="alert"
                    aria-hidden="true">
                &times;
            </button>
            不要为空!
        </div>
        <div style="padding: 10px 10px 10px;">
	<form method="post" action="morecg.php" class="bs-example bs-example-form" role="form">
		<div class="row">
			<div class="col-lg-6">
				<div class="input-group">
					<input placeholder="你的背景图片，输入链接" id="background" name="background" style="width: 250px;" type="text" class="form-control">
               	<input placeholder="你的签名，不超过30个字" id="sign" name="sign" style="width: 250px;" type="text" class="form-control">
					
				</div><!-- /input-group -->
            <button class="btn btn-default">
							提交
						</button>
			</div><!-- /.col-lg-6 -->
		</div><!-- /.row -->
	</form>
</div>
</body>
</html>