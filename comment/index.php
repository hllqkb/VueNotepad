<!DOCTYPE html>
<html>
<head>
    <title>留言板</title>
    <?php require_once("include/start.php");include "include/nav.php"; ?>
    </head>
<style>
    #contact-area {
        padding: 110px 0 120px;
    }
 
    .contact-box {
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 50px 50px 35px;
        background-color: #fff;
        border-radius: 6px;
    }
 
    .contact-box input {
        height: 50px;
        border: 1px solid #f7f6f5;
        font-size: 15px;
        background-color: #f7f6f5;
        font-weight: 500
    }
 
    .contact-box textarea {
        border: 1px solid #f7f6f5;
        padding-top: 10px;
        background-color: #f7f6f5;
        font-size: 15px;
        font-weight: 500
    }
 
    .contact-box button {
        background-color: #325eff;
        border: 0;
        color: #fff;
        padding: 10px 30px;
        border-radius: 4px;
        cursor: pointer;
        outline: 0;
        font-weight: 500;
        font-size: 15px
    }
 
    .contact-box button:hover {
        background-color: #0f39cf;
    }
</style>
<body>
<section id="contact-area">
    <div class="container">
        <div class="row">
            <div class="col-lg-10 offset-lg-1">
                <div class="contact-box text-center">
                    <form id="ajax-contact" action="contact.php" method="post">
                        <div class="form-group row">
                        <h1>平台留言</h1>
                            <div class="col-lg-6"><input value="<?php echo $_COOKIE['name']; ?>" type="text" class="form-control" id="name" name="name"
                                                         placeholder="姓名*" required=""></div>
                            <div class="col-lg-6"><input value="<?php echo $_COOKIE['email']; ?>" type="email" class="form-control" id="email" name="email"
                                                         placeholder="Email*" required=""></div>
                        </div>
                        <div class="form-group"><input type="text" class="form-control" id="subject" name="subject"
                                                       placeholder="标题"></div>
                        <div class="form-group"><textarea class="form-control" id="message" name="message" rows="10"
                                                          placeholder="留言内容" required=""></textarea></div>
                        <button type="submit">提 交</button><br><a href="comments.php">查看留言列表</a>
                        <div id="form-messages"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
</html>