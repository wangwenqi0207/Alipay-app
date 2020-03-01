// pages/home_page/home_page.js
var app = getApp();
var url = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCall: false,
  },
  my_asses() {
    my.navigateTo({
      url: '../bilityform/bilityform'
    })
  },
  apply_for() {
    my.navigateTo({
      url: '../applyfor/applyfor'
    })
    // console.log("sss")
  },
  go_myasses(){
    my.navigateTo({
      url: '../myasses/myasses'
    })
  },
  onLoad: function (options) {
    url = app.globalData.URL
    var phoneNumber = my.getStorageSync('phoneNumber');
    var tokens = my.getStorageSync('token');
    my.request({
      method: "POST",
      url: url+'customer_contact_login',
      data: {
        act: "AppLogin",
        phoneNumber: phoneNumber
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': tokens,
      },
      success(res) {
        console.log(res.data)
       
      },
      fail(err) {
        console.log(err)
      }
    }).catch((e) => {
     my.alert({content: e});
    });
  },
  cllOut(e) {
    this.setData({isCall:true})
  },
  cllOut2(e) {
     my.makePhoneCall({ number: '400365099' });
  },
  callOff(e) {
    this.setData({ isCall: false })
  },
 
})