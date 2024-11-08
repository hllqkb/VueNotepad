<!DOCTYPE html>
<html>
<head lang="en">
    <title>后台管理系统</title>
 <?php require_once('../include/start.php');include "../include/nav.php";isadmin(); ?>
</head>
<body>
<div class="navbar navbar-default">    <!--navbar是导航条组件，导航条组件为黑色主题-->
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
            <li><a href="content.html"><span class="glyphicon glyphicon-list-alt"></span> 内容管理</a></li>
            <li class="active"><a href="set%20up.html"><span class="glyphicon glyphicon-cog"></span> 网站设置</a></li>
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
            <form class="form-horizontal">
                <div class="form-group">
             <label for="inputEmail3" class="col-sm-2 control-label">网站名称</label>
                    <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" placeholder="支持中文字符">
            </div>
                </div>
                 <div class="form-group">
            <label for="domain name" class="col-sm-2 control-label">域名</label>
                     <div class="col-sm-10">
                <input type="password" class="form-control" id="domain name" placeholder="http://www.xxxx.com">
            </div>
                 </div>
                <div class="form-group">
                    <label for="Upload file" class="col-sm-2 control-label">上传文件类型</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="Upload file" placeholder="png/gif/jpg/jpeg/zip/rar">
                    </div>
                </div>
                <div class="form-group">
                    <label for="Cache time" class="col-sm-2 control-label">缓存时间</label>
                    <div class="col-sm-10">
                        <div class="input-inline" style="width: 80px;">
                        <input type="password" class="form-control" id="Cache time" placeholder="0">
                        </div>
                        <div>本地开发一般推荐设置为 0分钟，线上环境建议设置为 10分钟。</div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="Maximum file" class="col-sm-2 control-label">最大文件上传</label>
                    <div class="col-sm-10">
                        <div class="input-inline" style="width: 80px;">
                        <input type="password" class="form-control" id="Maximum file" placeholder="KB">
                        </div>
                        <div>提示：1 M = 1024 KB</div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="Copyright information" class="col-sm-2 control-label">版权信息</label>
                    <div class="col-sm-10">
                        <input  id="disabledInput"type="password" class="form-control" id="Copyright information" placeholder="@1830510黄朝杰" disabled>
                    </div>
                </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                    <label>
                        <input type="checkbox">记住我的选择
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">确认保存</button>
            </div>
        </div>
    </form>
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