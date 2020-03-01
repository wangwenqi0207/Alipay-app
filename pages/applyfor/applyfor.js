// pages/applyfor/applyfor.js
var insName;
var insIdcard;
var address;
var contactName;
var contactIdcard;
var contactPhone;
var app = getApp();
var url = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    insIdcard:''
  },
  userName: function (e) {
    let reg = /^[\u4E00-\u9FA5]{1,12}$/;
    if (!reg.test(e.detail.value)) {
        this.setData({
          userName: ''
      })
    }else {this.setData({
      userName: e.detail.value
    })  
    } 
  },
  insIdcard: function (e) {
    var reg = /^[0-9a-zA-Z]+$/;
    if (!reg.test(e.detail.value)) {
      this.setData({
        insIdcard: ''
      })
    }else{
      this.setData({
        insIdcard: e.detail.value
      }) 
    }
  
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    var tokens = my.getStorageSync('token');
    var insIdcard = this.data.insIdcard;
    var userName = this.data.userName;
    var act = "checkIdCard";
    if (this.data.userName == null || this.data.userName == "" || this.data.insIdcard == null || this.data.insIdcard == "") {
      my.alert({content: "请输入姓名或身份证"});
    }else{
      my.request({
        method: "POST",
        url: url+'check_idcard',
        data: {
          act: act,
          insIdcard: insIdcard
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          "token": tokens,
        },
        success(res) {
          console.log(res)
          console.log(userName)
          if (res.data.errorCode == 0) {
            console.log("信息发送成功")
            my.setStorageSync("userName", userName)
            my.setStorageSync("idCard", insIdcard)
            if (res.data.sex == "F") {
              var sex = "女"
            } else if (res.data.sex == "M") {
              var sex = "男"
            }
            my.setStorageSync("sex", sex)
            my.navigateTo({
              url: '../user_info/user_info'
            })
          }
          if (res.data.errorCode == 1100) {
            my.alert({content: "您已经提交过信息"});
          }    
        },
        fail(err) {
          console.log(err)
          my.alert({content: "信息提交失败"});
        }
      }).catch((e) => {
     my.alert({content: e});
    });
    }
  },
  onLoad: function (options) {
     url = app.globalData.URL
     insName = my.getStorageSync('insName');
     insIdcard = my.getStorageSync('insIdcard');
    this.setData({
      userName: insName
    })
    this.setData({
      insIdcard: insIdcard
    })
    console.log(insName)
    console.log(insIdcard)
  },

})
