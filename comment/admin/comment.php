<!DOCTYPE html>
<html>
<head lang="en">
    <title>后台管理系统</title>
<?php require_once('../include/start.php');include "../include/nav.php";isadmin(); ?>
</head>
<body>
<div class="navbar navbar-default ">    <!--navbar是导航条组件，导航条组件为黑色主题-->
    <div class="navbar-header">     <!--navbar-header指定div元素为导航条组件包裹品牌图标及切换按钮-->
        <button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a href="#" class="navbar-brand">管理后台</a>
    </div>
    <!--屏幕宽度小于768px时，该div内的内容默认都会隐藏（通过点击上面的button时展开），大于768px时默认显示-->
    <div class="collapse navbar-collapse navbar-left row" style="width:70%;">
        <ul class="nav navbar-nav col-xs-7">
            <li><a href="index.html"><span class="glyphicon glyphicon-home"></span> 后台首页</a></li>
            <li><a href="user.html"><span class="glyphicon glyphicon-user"></span> 用户管理</a></li>
            <li class="active"><a href="content.html"><span class="glyphicon glyphicon-list-alt"></span> 内容管理</a></li>
            <li><a href="set%20up.html"><span class="glyphicon glyphicon-cog"></span> 网站设置</a></li>
        </ul>

        <form class="navbar-form col-xs-4 hidden-sm" role="search">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="button" class="btn btn-primary" data-toggle="button"> 搜索</button>
        </form>
    </div>
    <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
            <a id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                admin
                <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dLabel">
                <li><a href="#"><span class="glyphicon glyphicon-screenshot"></span>前台首页</a> </li>
                <li><a href="#"><span class="glyphicon glyphicon-user"></span> 个人主页</a> </li>
                <li><a href="#"><span class="glyphicon glyphicon-cog"></span> 个人设置</a> </li>
                <li><a href="#"><span  class="glyphicon glyphicon-blackboard"></span> 账户中心</a> </li>
                <li><a href="#"><span class="glyphicon glyphicon-folder-open"></span> 我的收藏</a> </li>
            </ul>
        </li>
        <li><a href="#"><span class="glyphicon glyphicon-off">退出</span> </a> </li>
    </ul>
</div>
<div class="container">
    <div class="row">
<div class="col-sm-12 col-xs-12">
    <!--设置面板panel-->
    <div  id="shenhe" class="panel panel-default">
        <div class="panel-body">
            <h4>贴子审核
                <button class="btn btn-success">通过</button>
                <button class="btn btn-primary">恢复</button>
                <button class="btn btn-danger">删除</button>  </h4>
            <ul class="nav  nav-tabs">
                <li class="active"><a href="#name1" data-toggle="tab">全部</a></li>
                <li ><a href="#name2" data-toggle="tab" >未审核</a></li>
                <li ><a href="#name3"  data-toggle="tab">已通过</a></li>
                <li><a href="#name4"  data-toggle="tab">已删除</a></li>
            </ul>
        </div>
        <div class="tab-content panel-body">
            <div id="name1" class="tab-pane fade in active">
                <table class="table">
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th>审核状态</th>
                        <th>标题</th>
                        <th>作者</th>
                        <th>创建时间</th>
                    </tr>
                    <tr class="weishenhe">
                        <td><input type="checkbox" id="inputID"/></td>
                        <td><span class="label label-default">未审核</span></td>
                        <td><a href="#">威少蓝色球衣好还是白色球衣好看</a></td>
                        <td><a href="#">米开朗基罗</a></td>
                        <td>2020/06/08 16:06</td>
                    </tr>
                    <tr class="weishenhe">
                        <td><input type="checkbox"/></td>
                        <td><span class="label label-default">未审核</span></td>
                        <td><a href="#">画了一下午！永远的雷霆战士</a></td>
                        <td><a href="#">平淡小伙</a></td>
                        <td>2020/06/11 17:26</td>
                    </tr>
                    <tr class="yishanchu">
                        <td><input type="checkbox"/></td>
                        <td><span class="label label-danger">已删除</span></td>
                        <td><a href="#">重庆火锅比成都的好吃</a></td>
                        <td><a href="#">智慧祝福</a></td>
                        <td>2020/05/19 11:42</td>
                    </tr>
                    <tr class="yishanchu">
                        <td><input type="checkbox"/></td>
                        <td><span class="label label-danger">已删除</span></td>
                        <td><a href="#">兄弟们，喜欢和肯德基还是麦当劳</a></td>
                        <td><a href="#">大大怪</a></td>
                        <td>2020/03/19 20:22</td>
                    </tr>
                    <tr class="yitongguo">
                        <td><input type="checkbox"/></td>
                        <td><span class="label label-success">已通过</span></td>
                        <td><a href="#">回顾雷霆11年队史的11次大运作</a></td>
                        <td><a href="#">Super仔涛</a></td>
                        <td>2020/06/04 10:52</td>
                    </tr>
                    <tr class="yitongguo">
                        <td><input type="checkbox"/></td>
                        <td><span class="label label-success">已通过</span></td>
                        <td><a href="#">7A雷霆小漫画（四）</a></td>
                        <td><a href="#">7A</a></td>
                        <td>2019/12/17 18:26</td>
                    </tr>
                    <tr class="yitongguo">
                        <td><input type="checkbox"/></td>
                        <td><span class="label label-success">已通过</span></td>
                        <td><a href="#">请拿一个总冠军，@雷霆官方</a></td>
                        <td><a href="#">RW轰雷</a></td>
                        <td>2019/09/24 09:12</td>
                    </tr>
                    <tr class="yitongguo">
                        <td><input type="checkbox"/></td>
                        <td><span class="label label-success">已通过</span></td>
                        <td><a href="#">不愧是你呀，威斯布鲁克</a></td>
                        <td><a href="#">OKC UP</a></td>
                        <td>2020/02/24 15:52</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
            <!-------页脚------>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <p style="text-align: center">版权所有@1830510黄朝杰</p>
        </div>
    </div>
</div>
</body>
</html>