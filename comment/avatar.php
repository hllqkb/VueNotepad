<!DOCTYPE html>
<html>
<head>
    <title>修改头像</title>
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
            输入你的头像链接!
        </div>
        <div style="padding: 10px 10px 10px;">
	<form method="post" action="cgavatar.php" class="bs-example bs-example-form" role="form">
		<div class="row">
			<div class="col-lg-6">
				<div class="input-group">
					<input id="avatar" name="avatar" style="width: 250px;" type="text" class="form-control">
					<span class="input-group-btn">
						<button class="btn btn-default">
							提交
						</button>
					</span>
				</div><!-- /input-group -->
			</div><!-- /.col-lg-6 -->
		</div><!-- /.row -->
	</form>
</div>
</body>
</html>