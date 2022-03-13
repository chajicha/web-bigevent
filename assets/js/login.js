$(function(){
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form=layui.form
    // 从layui中获取layer对象
    var layer=layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个叫pwd的校验规则
        pwd:[/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            let pwdval=$('.reg-box [name=password]').val()
            if (pwdval!==value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form-reg').on('submit',function(e){
        // 阻止默认的提交行为
        e.preventDefault()
        // 发起Ajax的POST请求
        let data={username:$('#form-reg [name=username]').val(),password:$('#form-reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if (res.status!==0) {
                // return console.log(res.message)
                // 通过前面引入的layer对象的layer.msg()方法进行消息提醒
                return layer.msg(res.message)
            }
            // console.log('注册成功！')
            layer.msg('注册成功，请登录！')
            // 跳转登录页面
            $('#link-login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form-login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // .serialize()方法快速获取表单中数据
            data:$(this).serialize(),
            success:function(res){
                if (res.status!==0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // console.log(res.token)
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='/index.html'
            }
        })
    })
})
