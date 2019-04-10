$(function () {
  // 绑定点击事件确认验证用户信息
  $('.mui-btn-primary').on('tap', function () {

    // 用户信息全局,才能调用
    var obj = {
      username: "",
      password: ""
    }

    // alert()
    // 1.去获取用户输入的信息
    obj.username = $('.username').val()
    // console.log(obj.username);
    // obj.password = $('.mui-input-row').find('input[type="password"]').val()
    obj.password = $('[type="password"]').val()
    // console.log(obj.password);
    if (!/^1[3-9]\d{9}$/.test(obj.username)) {   //正则验证用户名
      mui.toast('请输入正确的手机号')
      return false
    }
    // alert(!(obj.password.length>6))
    if (obj.password.length < 6) {   //正则验证用户密码
      mui.toast('密码不得少于6位数')
      return false
    }
    // 初步验证通过后发起ajax请求,和数据库验证用户信息
    $.ajax({
      type: 'post',
      url: 'login',
      data: obj,
      datatype: 'json',
      success: function (result) {
        // console.log(result); 
        // 登录成功
        if (result.meta.status == 200){
          // alert(2)
          // 将用户的token值本地存储
          sessionStorage.setItem('pyg_token', result.data.token)
          var req = $.getParameter(location.search).redirectUrl
          console.log(req);
          //如果登录成功,返回原页面,反之跳转到主页面 
          if(req){
            // alert(1)
              location.href=unescape(req)  //解析二进制
          } else{
            location.href="/pxg_index.html"
          }      
        }else{
          mui.toast(result.meta.msg)
        }
      }
    })
  })

})