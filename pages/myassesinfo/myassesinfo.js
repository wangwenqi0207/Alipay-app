// pages/myassesinfo/myassesinfo.js
var app = getApp();
var url = "";
Page({

  data: {
    insName: "",
    sex: "",
    age: "",
    insIdCard: "",
    orderStatus: "",
    orderNo: "",
    createdTime: "",
    insPhone: "",
    appointedAddress: "",
    contactName: "",
    contactSex: "",
    contactIdcard: "",
    relationshipInsUser: "",
    city: "",
    contactPhone: "",
    id: "",
  },

  onLoad: function (options) {
    url = app.globalData.URL;
    var _this = this;
    var orderNo = options.newsid;
    var tokens = my.getStorageSync('token');
    console.log(options.newsid);
    var url = url+"user_apply_order";
    my.request({
      method: "post",
      url: url,
      data: {
        act: "getUserApplyOrder",
        orderNo: orderNo,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': tokens
      },
      success(res) {
        //console.log(res)
        if (res.data.errorCode == 0) {
          _this.setData({
            insName: res.data.dataList[1][0].insName,
            age : res.data.dataList[1][0].age,
            insIdCard : res.data.dataList[1][0].insIdCard,
            contactPhone : res.data.dataList[0][0].contactPhone,
            createdTime : res.data.dataList[1][0].createdTime,
          })
          var orderStatus = res.data.dataList[1][0].orderStatus;
          switch (orderStatus) {
            case -1:
              orderStatus = "参保人取消";
              break;
            case -2:
              orderStatus = "拒接单";
              break;
            case -3:
              orderStatus = "系统取消";
              break;
            case 0:
              orderStatus = "待分配";
              break;
            case 1:
              orderStatus = "已完成";
              break;
            case 2:
              orderStatus = "待接单";
              break;
            case 3:
              orderStatus = "待评估";
              break;
            case 4:
              orderStatus = "正在评估";
              break;
            case 5:
              orderStatus = "评估师A完成评估";
              break;
            case 6:
              orderStatus = "已评估";
              break;
            case 8:
              orderStatus = "待指派";
              break;
            case 10:
              orderStatus = "待审核";
              break;
            default:
              orderStatus = "未分配";
              break;
          }
          _this.setData({
            orderStatus: orderStatus,
            orderNo: res.data.dataList[1][0].orderNo,
            insPhone: res.data.dataList[0][0].insPhone,
            appointedAddress: res.data.dataList[0][0].appointedAddress,
            contactName: res.data.dataList[0][0].contactName,
            contactIdcard: res.data.dataList[0][0].contactIdcard,
          })
          var sex = res.data.dataList[1][0].sex;
          if (sex == "M") {
            _this.setData({
              sex:"男"
            })
          } else {
            _this.setData({
              sex: "女"
            })
          }
          var contactSex = res.data.dataList[0][0].contactSex;
          if (contactSex == "M") {
            _this.setData({
              contactSex: "男"
            })
          } else {
            _this.setData({
              contactSex: "女"
            })
          }
          var relationshipInsUser = res.data.dataList[0][0].relationshipInsUser;
          switch (relationshipInsUser) {
            case 0:
              relationshipInsUser = "自己";
              break;
            case 1:
              relationshipInsUser = "子女";
              break;
            case 2:
              relationshipInsUser = "父母";
              break;
            case 3:
              relationshipInsUser = "配偶";
              break;
            case 4:
              relationshipInsUser = "兄弟姐妹";
              break;
            case 5:
              relationshipInsUser = "朋友";
              break;
            case 6:
              relationshipInsUser = "其他";
              break;
            default:
              break;
          }
          _this.setData({
            relationshipInsUser: relationshipInsUser,
            city: res.data.dataList[0][0].city,
          })
        } 
      },
      fail(err) {
        console.log(err)
      }
    }).catch((e) => {
     my.alert({content: e});
  });
  },

})