<?php
if (isset($_GET["value"])){
$value=$_GET["value"];
//die($value);
file_put_contents("config.php",$value);
die("修改成功<a href='index.html'>点我跳转到安装页面</a>");
}
echo "<h4>修改配置!</h4>";
$v=file_get_contents("config.php");
echo <<<EOF
<form action="change.php" method="get">
<textarea cols="40" rows="20" id="value" name="value">$v</textarea>
<br><button>修改</button>
</form>
EOF;
?>