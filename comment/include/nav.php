<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <a class="navbar-brand" href="../">留言板</a>
         <?php
require_once( __DIR__.'/../include/start.php');
if (isset($_COOKIE["login"]) and $_COOKIE["login"]==true){
$avatar=getUser();
$avatar=$avatar["avatar"];
}
echo <<<EOF
<a href="../admin.php"><img style="width: 40px;height: 40px;float: right;margin: 5px;" class="img-circle" src="$avatar" alt="头像" onerror="javascript:this.src='../img/user.jpg';"/>
</a>
EOF;
?>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">


      <ul class="nav navbar-nav">
        <li class="active"><a href="../">我要留言<span class="sr-only">(current)</span></a></li>
      </ul>



      <form class="navbar-form navbar-right">
 <form class="navbar-form navbar-right">
<ul class="nav nav-pills">
	<li class="active"><a href="#">消息 <span class="badge">42</span></a></li>
</ul>
   </form>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>