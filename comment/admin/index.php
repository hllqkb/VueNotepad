<!DOCTYPE html>
<html lang="zh_CN">
<head >
<?php require_once('../include/start.php');include "../include/nav.php";isadmin(); ?>
    <title>后台管理系统</title>
   </head>
<body>
<style>
body,.dropdown-menu,nav
     {
  margin-left: 5%;
}
#dLabel
  {
  margin-left: 10%;
}
.panel,.alert
{
    width: 400px;
    }
    nav
    {
        width: 400px;
        }
</style>
    <!--屏幕宽度小于768px时，该div内的内容默认都会隐藏（通过点击上面的button时展开），大于768px时默认显示-->
    <div class="collapse navbar-collapse navbar-left row" style="width:100%">
          <ul class="nav navbar-nav col-xs-7">
            <li  class="active"><a href="index.html"><span class="glyphicon glyphicon-home"></span> 后台首页</a></li>
            <li><a href="user.html"><span class="glyphicon glyphicon-user"></span> 用户管理</a></li>
            <li><a href="content.html"><span class="glyphicon glyphicon-list-alt"></span> 内容管理</a></li>
            <li><a href="set%20up.html"><span class="glyphicon glyphicon-cog"></span> 网站设置</a></li>
          </ul>

        <form class="navbar-form col-xs-4 hidden-sm" role="search">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="button" class="btn btn-primary" data-toggle="button"> 搜索</button>
        </form>
    </div>
      <ul class="nav navbar-nav">
      <li class="dropdown">
          <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               admin
              <span class="caret"></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dLabel">
              <li><a href="../"><span class="glyphicon glyphicon-screenshot"></span>前台首页</a> </li>
              <li><a href="../admin.php"><span class="glyphicon glyphicon-user"></span> 个人主页</a> </li>
              <li><a href="user.php"><span class="glyphicon glyphicon-cog"></span> 用户管理</a> </li>
              <li><a href="webset.php"><span  class="glyphicon glyphicon-blackboard"></span> 网站设置</a> </li>
              <li><a href="comment.php"><span class="glyphicon glyphicon-folder-open"></span>  留言管理</a> </li>
          </ul>
      </li>
      </ul>
      </div>
</div>
<!------警告框----------->
<?php
$cver=file_get_contents($cloud."version.txt");
$ver=file_get_contents("version.txt");
$ver1=str_replace(".","",$ver);
$cver1=str_replace(".","",$cver);
function add($str,$len){
return str_pad($str,$len,"0");
}
if (strlen($cver1)>strlen($ver1)){
$ver1=add($ver1,strlen($cver1));
}
else{
$cver1=add($cver1,strlen($ver1));
}
if ($cver1>$ver1){
echo <<<EOF
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-success alert-dismissible fade in" role="alert"><!-----警告框样式------>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4>可以更新了！</h4>
                <p>当前版本<b>$ver</b>，最新版本<b>$cver</b>，更新了新的内容和更多的BUG</p>
                <p>
                    <button id="update" type="button" class="btn btn-success">立即更新</button>
                    <button type="button" class="btn btn-default" data-dismiss="alert" >稍后处理</button><!-----关闭------>
                </p>
            </div>
        </div>
EOF;
}
else{
    echo <<<EOF
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-success alert-dismissible fade in" role="alert"><!-----警告框样式------>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4>当前是最新版本！</h4>
                <p>当前版本<b>$ver</b>，当前已经是最新版本</p>
                <p>
                     <button type="button" class="btn btn-default" data-dismiss="alert" >知道了</button><!-----关闭------>
                </p>
            </div>
        </div>
EOF;

}
?>

<!-----------网站统计数据和网站热帖------------>
        <div class="col-md-6">
            <div class="panel panel-default"><!-----面板------>
                <div class="panel-heading">网站统计数据</div>    <!----标题------>
                <div class="panel-body">
                    <table class="table table-hover">
                        <thead><!-----表单------>
                        <tr>
                            <th>统计数据</th>
                            <th>今日</th>
                            <th>昨日</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>注册会员</th>
                            <td>183</td>
                            <td>145</td>
                        </tr>
                        <tr>
                            <th>登录会员</th>
                            <td>1830</td>
                            <td>1510<td>
                        </tr>
                        <tr>
                            <th>发帖数量</th>
                            <td>2347</td>
                            <td>3759</td>
                        </tr>
                        <tr>
                            <th>转载次数</th>
                            <td>964</td>
                            <td>839</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">网站热帖</div>
                   <ul class="list-group">
                       <li class="list-group-item">
                           <a href="index.html"><span class="glyphicon glyphicon-list-alt"></span> 回顾雷霆11年队史的11次大运作<small class="pull-right">2020/06/04</small> </a><!-----日期变小，右浮动------>
                       </li>
                       <li class="list-group-item">
                           <a href="index.html"><span class="glyphicon glyphicon-list-alt"></span> 俯仰之间，已为陈迹：雷霆球迷对杜兰特的感受<small class="pull-right">2020/03/05</small> </a>
                       </li>
                       <li class="list-group-item">
                           <a href="index.html"><span class="glyphicon glyphicon-list-alt"></span> 不愧是你呀，威斯布鲁克<small class="pull-right">2020/02/24</small> </a>
                       </li>
                       <li class="list-group-item">
                           <a href="index.html"><span class="glyphicon glyphicon-list-alt"></span> 亚当斯用中文发推致敬中国的医务人员<small class="pull-right">2020/01/25</small> </a>
                       </li>
                       <li class="list-group-item">
                           <a href="index.html"><span class="glyphicon glyphicon-list-alt"></span>7A雷霆小漫画（四）<small class="pull-right">2019/12/17</small> </a>
                       </li>
                       <li class="list-group-item">
                           <a href="index.html"><span class="glyphicon glyphicon-list-alt"></span> 请拿一个总冠军，@雷霆官方<small class="pull-right">2019/09/24</small> </a>
                       </li>
                   </ul>
                </div>
            </div>
<!---------今日访客统计和服务器状态--------->

            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">今日访客统计</h3><!----------数据统计在最底下引入chart.js和引入曲线图js格式代码----------->
                    </div>
                    <div class="panel-body">
                        <canvas id="myChart" width="400" height="200"></canvas><!---------画布------->
                    </div>
                    <canvas id="gradientChart" width="537" height="30" class="chartjs-render-monitor" style="display: block; height:auto; width: 430px;"></canvas>
                </div>
            </div>
        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">服务器状态</h3><!----------根据情境变化效果的进度条----------->
                </div>
                <div class="panel-body">
                    <p>内存使用率：40%</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                            <span class="sr-only">40% Complete (success)</span>
                        </div>
                    </div>
                    <p>数据库使用率：20%</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
                            <span class="sr-only">20% Complete</span>
                        </div>
                    </div>
                    <p>磁盘使用率：60%</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
                            <span class="sr-only">60% Complete (warning)</span>
                        </div>
                    </div>
                    <p>CPU使用率：80%</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                            <span class="sr-only">80% Complete (danger)</span>
                        </div>
                    </div>
            </div>
        </div>
        </div>
                        </div>
                    </div>
              </div>
    </div>
    <script>
    $(function (){
        $("#update").click(function (){
    alert('已经开始更新，请不要中途退出')
    $.get("update.php",function (d,s){
 alert(d)
})
})
})
    </script>
</body>
</html>