<html>
	<head>
    <title>留言列表</title>
    <?php require('./include/start.php');islogin();include "include/nav.php"; ?>
	</head>
	<body>
	<div class="alert alert-info alert-dismissable">
            <button type="button" class="close" data-dismiss="alert"
                    aria-hidden="true">
                &times;
            </button>
            请注意文明留言！
        </div>   
<link rel="stylesheet" href="./include/style.css">

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 col-md-offset-3 log-list">
                <ul id="commentlist" class="media-list">
                <!--留言列表--!>
<?php
//获取留言
$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn){
die("数据库连接失败<br>"."原因:".mysqli_connect_error());
}
$i=0;
$sql="SELECT name,email,subject,message,reply,reg_date,avatar,id FROM comments ORDER BY id DESC";
$r=mysqli_query($conn,$sql);
if(mysqli_num_rows($r)>0){
while ($row=mysqli_fetch_assoc($r)){
//limit
$i++;
}
}
elseif(mysqli_num_rows($r)==0){
echo "暂时还没有人留言";
}
else{
die("读取留言失败<br>原因:".mysqli_error($conn));
}

?>
</li>
                </ul>
            </div>
        </div>
    </div>
<?php
$pages=intval(floor($i/$line))+1;
//$remain=$i%$line;
echo <<<EOF
<center><ul class="pagination">
	<li><a href="#">&laquo;</a></li>
EOF;
for ($j=1;$j<=$pages;$j++){
if ($j==1){
echo <<<EOF
<li class="active"><a id="first" class="show" href="#">$j</a></li>
EOF; 
}
else{
echo <<<EOF
<li><a class="show" href="#">$j</a></li>
EOF; 
}
}
echo <<<EOF
<li><a>&raquo;</a></li>
</ul>
</center>
EOF;
/*
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
*/

?>
<script>
$(document).ready(function(){
  $(".show").click(function(){
      $(".show").parent("li").removeClass("active");
      $(this).parent("li").addClass("active")
      page=$(this).text()
      url="getcomments.php?p="+page
        $.get(url,function (d,s){
      $("#commentlist").empty()
    $("#commentlist").append(d)
      })
  });
  $("#first").click();
});
</script>
	</body>
</html>		