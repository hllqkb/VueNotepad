<!DOCTYPE html>
<html>
<head>
    <title>回复页面</title>
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
            文明回复!
        </div>
        <?php
$id=$_GET["id"];
$get=getcomment($id);
$name=$get["name"];
$subject=$get["subject"];
$message=$get["message"];
//echo "$id";
echo <<<EOF
<table class="table table-striped table-bordered">
	<caption><h3>留言详情</h3></caption>
   <thead>
      <tr>
         <th>留言人</th>
         <th>标题</th>
         <th>内容</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>$name</td>
         <td>$subject</td>
         <td>$message</td>
      </tr>
         </tbody>
</table>
<hr >
 <div style="padding: 10px 10px 10px;">
	<form method="post" action="reply.php?id=$id" class="bs-example bs-example-form" role="form">
EOF;
        ?>
		<div class="row">
			<div class="col-lg-6">
				<div class="input-group">
					<input id="avatar" name="avatar" style="width: 250px;" type="text" class="form-control">
					<span class="input-group-btn">
						<button class="btn btn-default">
							回复
						</button>
					</span>
				</div><!-- /input-group -->
			</div><!-- /.col-lg-6 -->
		</div><!-- /.row -->
	</form>
</div>
</body>
</html>