$(function(){
    $('#email').blur(function() {
      checkEmail();
    });

    $('#username').blur(function() {
      checkUsername();
    });

    $('#password').blur(function() {
      checkPassword();
    });
});

// 注册验证
function registeValidation() {
    var username = $.trim($('#username').val());
    if(username === '' || username === undefined) {
        $('#nameError').css("display","inline");
        return false;
    } else {
        $('#nameError').css("display","none");
    }

    var flag = checkUsername() && checkPassword() && checkEmail();

    if(flag) {
        var email = $.trim($('#email').val());
        var emaliRule = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
        if(emaliRule.test(email)) {
            $('#emailRuleError').css("display","none");
            return true;
        } else {
            $('#emailRuleError').css("display","inline");
            return false;
        }
    }
}

// 邮箱非空验证
function checkEmail() {
    var email = $.trim($('#email').val());
    if(email === '' || email === undefined) {
        $('#emailError').css("display","inline");
        return false;
    } else {
        $('#emailError').css("display","none");
        return true;
    }
}

// 密码非空验证
function checkPassword() {
    var password = $.trim($('#password').val());
    if(password === '' || password === undefined) {
        $('#pdError').css("display","inline");
        return false;
    } else {
        $('#pdError').css("display","none");
        return true;
    }
}

// 用户名非空验证
function checkUsername() {
    var username = $.trim($('#username').val());
    if(username === '' || username === undefined) {
        $('#nameError').css("display","inline");
        return false;
    } else {
        $('#nameError').css("display","none");
        return true;
    }
}   