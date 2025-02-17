<?php
require_once "function.php";
require_once root()."install/config.php";
modal("提示","举报成功，等待审核中");
echo "<script>setTimeout(\"window.location='../comments.php'\",1500)</script>";
?>