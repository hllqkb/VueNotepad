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
            <li  class="active"><a href="user.html"><span class="glyphicon glyphicon-user"></span> 用户管理</a></li>
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
<div class="container"><!---------------栅格布局左2右10------------>
    <div class="row">
        <div class="col-md-2">
            <div class="list-group"><!---------------列表------------>
                <a href="user.html" class="list-group-item active">用户管理</a>
                <a href="user%20_search.html" class="list-group-item ">用户搜索</a>
                <a class="list-group-item" data-toggle="modal" data-target="#myModal">创建用户</a>
            </div>
        </div>
        <div class="col-md-10">
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="user.html">用户列表</a><!----------------用户管理界面----------------->
                </li>
            </ul>
            <table class="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>用户组</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>hcj</td>
                    <td>fhas@163.com</td>
                    <td>官方号</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">2</th>
                    <td>撕破伤口、</td>
                    <td>qerff314@163.com</td>
                    <td>高级会员</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">3</th>
                    <td>Γεια σου κόσμο</td>
                    <td>htq342@163.com</td>
                    <td>官方号</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">4</th>
                    <td>BEN METH</td>
                    <td>Otto425@163.com</td>
                    <td>注册会员</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">5</th>
                    <td>哆啦酷冰</td>
                    <td>pqpd54356@163.com</td>
                    <td>注册会员</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">6</th>
                    <td>知足常乐</td>
                    <td>ncanz434@163.com</td>
                    <td>高级会员</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">7</th>
                    <td>Mechanic</td>
                    <td>nfgddd3@163.com</td>
                    <td>高级会员</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">8</th>
                    <td>大大怪</td>
                    <td>mzlajed234@163.com</td>
                    <td>注册会员</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">9</th>
                    <td>Yogisha.X</td>
                    <td>mfkazn7444@163.com</td>
                    <td>官方号</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th scope="row">10</th>
                    <td>ISD</td>
                    <td>qnidh4215@163.com</td>
                    <td>高级会员</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                操作
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;编辑</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;删除</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;锁定</a></li>
                                <li><a href=""><span class="glyphicon glyphicon-user"></span>&nbsp;修改密码</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--------分页--------->
            <nav aria-label="Page navigation">
                <ul class="pagination pull-right">
                    <li class="disabled">
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
<!--添加用户的模态框-->
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">添加用户</h4>
            </div>
            <div class="modal-body">
                <form action="#" method="post">
                    <div class="form-group">
                        <label for="user_search.username">用户名</label>
                        <input type="text" id="user_search.username" class="form-control"placeholder="长度在5-20个字符">
                    </div>
                    <div class="form-group">
                        <label for="user_search.uid">邮箱</label>
                        <input type="text" id="user_search.uid" class="form-control" placeholder="xxx@163.com">
                    </div>
                    <div class="form-group">
                        <label for="user_search.mima">密码</label>
                        <input type="text" id="user_search.mima" class="form-control"placeholder="不少于8位密码">
                    </div><div class="form-group">
                    <label for="user_search.qr">确认密码</label>
                    <input type="text" id="user_search.qr" class="form-control"placeholder="请确认密码">
                </div>
                    <div class="form-group">
                        <label for="user_search.usergroup">用户组</label>
                        <select name="user_search.usergroup" id="user_search.usergroup" class="form-control">
                            <option value="zh">注册会员</option>
                            <option value="gh">高级会员</option>
                            <option value="gf">官方账号</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">提交</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

            </div>
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