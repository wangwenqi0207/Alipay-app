var token;
var showMsg;
var app = getApp();
var url="";
var num=null;
Page({
  data:{
    phone_number:"",
    time: null,
    isDisabled: false,
    dialogShow: false,
    get_code:"获取验证码",
    code_active:false,
  },
  onLoad(query) {
    url = app.globalData.URL
    console.log(url)  
     var expiration = my.getStorageSync("index_data_expiration");//拿到过期时间
    console.log(expiration)
    var timestamp = Date.parse(new Date());//拿到现在时间
    //进行时间比较
    if (expiration < timestamp) {//过期了，清空缓存，跳转到登录
      console.log("缓存已过期");
      my.clearStorageSync();//清空缓存
      return;
    }
    //获取本地保存的token
    var tokens = my.getStorageSync('token');
     my.request({
      method: "POST",
      url: url+'checkToken',
      header: {
        'ontent-type': 'application/json',
        'token': tokens,
      },
      success(res) {
        console.log(res.data.resultCode)
        if (res.data.resultCode == "000000") {
          setTimeout(function () {
           //跳转
          }, 0)
        } else {
          return
        }
      },
      fail(err) {
        console.log(err)
      }
    }).catch((e) => {
     my.alert({content: e});
    });
  },
  onReady() {
  },
 //点击获取验证码按钮 如果手机号填写正确 开始获取
  get_login(e){
    //console.log(this.data.phone_number)
    if (this.data.phone_number == '') {
      my.alert({
      content: `请输入手机号码`,
    });
    } else {
      this.setData({ 
        time: 5,
      })
      this.timer()
      this.sendCode()
    }
  },
  
   timer() {
    var that =this;
    if (this.data.time > 0) {
      var Open_time =  setInterval(function(){ 
        that.data.time--
        that.setData({ code_active: true, isDisabled: true, get_code: that.data.time + "秒"})
        if(that.data.time ==0){
            clearInterval(Open_time)
            that.setData({ get_code: "获取验证码", isDisabled: false, code_active: false })
        }
       }, 1000);
    }
    // console.log(this.data.time)
  },
  phone_number: function (e) {
    this.setData({
      phone_number: e.detail.value
    })
    //console.log(this.data.phone_number)
  },
  //获取用户输入的验证码
  check_code: function (e) {
    this.setData({
      check_code: e.detail.value
    })
    //console.log(this.data.check_code)
  },
  //获取验证码请求发起
  sendCode() {
    var phoneNumber = this.data.phone_number;
    // var params = JSON.stringify({ 'phoneNumber': phoneNumber });  //如果传的参数是对象，需要用JSON.stringify转义
    var data = { 'phoneNumber': phoneNumber };
    //console.log(phoneNumber)
    my.request({
      url: url +'send_veri_code',
      method: 'POST',
       header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {params: data},
      success: function(res) {
        my.alert({content: 'success'});
      },
      fail: function(res) {
        console.log(res.data)
    //     var getToken = res.data.errorMsg.split(":");  //分割errorMsg
    //     token = getToken[1];  //获取token
    //     showMsg = getToken[0];  //获取验证码
    //     //存一个过期时间
    //     var timestamp = Date.parse(new Date());
    //     var expiration = timestamp + 1296000000;//2592000秒（一个月）
    //     my.setStorageSync("index_data_expiration", expiration);
    //     if (res.data.errorCode == 0) {
    //       my.setStorageSync('token', token);
    //       my.setStorageSync('phoneNumber', phoneNumber);
    //     } else {
    //       if (res.data.errorMsg == null || res.data.errorMsg == "") {
    //          my.alert({
    //             content: `获取验证码失败！`,
    //           });
    //       } else {
    //         console.log(res.data);
    //       }
    //     }
        my.alert({content: 'fail'});
      },
  }).catch((e) => {
     my.alert({content: e});
  });
  },

  // 点击下一步
  formSubmit: function (e) {
    console.log(e.detail.value)
    var str = Math.random() * 100;
    var str1 = str.toFixed(6)
    var time = new Date().getTime();
    //获取设备信息  
    var version;
    // getStorageInfoSync({
    //   success(res) {
    //     //console.log(res.model)
    //     version = res.model
    //   }
    // })
    var appId = version + '-' + time + '-' + str1;
    var tokens = my.getStorageSync('token');
    var veriCode = this.data.check_code
    var phoneNumber = this.data.phone_number
    var datas = JSON.stringify({ "veriCode": veriCode, "phoneNumber": phoneNumber, "appId": appId});
    var _this= this;
    my.request({
      method: "POST",
      url: url +'register_login',
      data: {
        params: datas
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': tokens
      },
      success(res) {
        //console.log(res.header) //Access-Control-Expose-Headers: "Set-Cookie"
        // console.log(showMsg)
        // console.log(_this.data.check_code)
        if (res.data.errorCode = "0") {
          my.setStorageSync("cookie", "Set-Cookie")
          if (showMsg === _this.data.check_code && _this.data.check_code!=undefined) {
            // wx.navigateTo({
            //   url: '../home_page/home_page'
            // })
          } else {
            // wx.showToast({
            //   title: '请您先登录或输入正确的验证码',
            //   icon: 'none',
            //   duration: 2000
            // })
          }
        }
      },
      fail(err) {
        // wx.showToast({
        //   title: '您登录失败',
        //   icon: 'none',
        //   duration: 2000
        // })
        console.log(err)
      }
    }).catch((e) => {
     my.alert({content: e});
  });
  }, 
 
});
