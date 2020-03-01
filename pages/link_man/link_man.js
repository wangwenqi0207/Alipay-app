// pages/link_man/link_man.js
var province;
var nextcity;
var district;
var codeProvince;
var codeCity;
var codeArea;
var address ;
var contactName;
var contactIdcard;
var contactPhone;
var app = getApp();
var url = "";
Page({
  data: {
    link_name:'',
    link_id:'',
    link_phone:'',
    link_textarea:'',
    select: false,
    sex:"",
    link_options:"",
    grade_name: '请选择',
    grades: [{
          id: '0',
          label: '自己'
        }, {
          id: '1',
          label: '子女'
        }, {
          id: '2',
          label: '父母'
        }, {
          id: '3',
          label: '配偶'
        }, {
          id: '4',
          label: '兄弟姐妹'
        },{
          id: '5',
          label: '朋友'
        },{
          id: '6',
          label: '其他'
        }],

    parameter: [{ id: "M", name: '男' }, { id: "F", name: '女' }],

    chooseCity: "点击我选择",
    selected: '',
    citySelected: '',
    areaSelected: '',
    provinceL: [],
    cityL: [],
    areaL: [],
    city: [],
    provinceName: '',
    cityName: '',
    areaName: '',
    showProvince: true,
    showCity: false,
    showCity2: false,
    showarea: false,
    chooseTit1: "省",
    chooseTit2: "市",
    chooseTit3: "区",
    tit1: true,
    tit2: false,
    tit3: false,
    mackShow: false,
  },
  // onLoad: function (options) {
  //   url = app.globalData.URL
  //   address = my.getStorageSync('address');
  //   this.setData({
  //     link_textarea: address
  //   })
  //   contactName = my.getStorageSync('contactName');
  //   this.setData({
  //     link_name: contactName
  //   })
  //   contactIdcard = my.getStorageSync('contactIdcard');
  //   this.setData({
  //     link_id: contactIdcard
  //   })
  //   contactPhone = my.getStorageSync('contactPhone');
  //   this.setData({
  //     link_phone: contactPhone
  //   })
  //   console.log(address)
  //   console.log(contactName)
  //   console.log(contactIdcard)
  //   console.log(contactPhone)
    // wx.request({
    //   method: "post",
    //   url: "http://192.168.1.187:4280/wechat/authed/assess_order_apply",
    //   header: {
    //     "Content-Type": "json",
    //     'token': tokens
    //   },
    //   data: {
    //     act: "ApplyForOrder",
    //     insName: "",
    //     insIdcard: "insIdcard",
    //     applyPics: "applyPics",
    //     contactName: "linkman_name",
    //     insPhone: "insPhone",
    //     contactSex: "sex",
    //     contactIdcard: "contactIdcard",
    //     contactPhone: "linkman_phone",
    //     relationshipInsUser: "link_options",
    //     appointedAddress: "textarea",
    //     province: "codeProvince",
    //     city: "codeCity",
    //     district: "codeArea",
    //     phoneNumber: "insPhone",
    //   },
    //   success(res) {
    //     console.log(res.data)
       
    //   },
    //   fail(err) {
    //     console.log(err)
    //   }
    // })

    //性别radio
  //   this.data.parameter[0].checked = true;
  //   this.setData({
  //     parameter: this.data.parameter,
  //     sex:"M"
  //   })//默认parameter数组的第一个对象是选中的

  //   //city
  //   var url = url+"get_regions?parentId=0";
  //   var _this = this;
  //   my.request({
  //     method: "get",
  //     url: url,
  //     data: "data",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //     },
  //     success(res) {
  //       //console.log(res.data)
  //       _this.setData({
  //         provinceL: res.data
  //       })
  //     },
  //     fail(err) {
  //       console.log(err)
  //     }
  //   })
  // },
  // link_name: function (e) {
  //   this.setData({
  //     link_name: e.detail.value
  //   })
  // },
  // link_id: function (e) {
  //   this.setData({
  //     link_id: e.detail.value
  //   })
  // },
  // link_phone: function (e) {
  //   this.setData({
  //     link_phone: e.detail.value
  //   })
  // },
  // link_textarea: function (e) {
  //   this.setData({
  //     link_textarea: e.detail.value
  //   })
  // },
  // //点击下拉框
  // bindShowMsg() {
  //   this.setData({
  //     select: !this.data.select
  //   })
  // },
  // //点击选项
  // mySelect(e) {
  //   var name = e.currentTarget.dataset.name
  //   //console.log(e.currentTarget.dataset.id)
  //   this.setData({
  //     grade_name: name,
  //     select: false,
  //     link_options: e.currentTarget.dataset.id
  //   })
  // },
  // // sex
  // parameterTap: function (e) {   //e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
  //   var that = this
  //   var this_checked = e.currentTarget.dataset.id
  //   //console.log(e.currentTarget.dataset.id)
  //   var parameterList = this.data.parameter//获取Json数组
  //   for (var i = 0; i < parameterList.length; i++) {
  //     if (parameterList[i].id == this_checked) {
  //       parameterList[i].checked = true;//当前点击的位置为true即选中
  //     }
  //     else {
  //       parameterList[i].checked = false;//其他的位置为false
  //     }
  //   }
  //   that.setData({
  //     parameter: parameterList,
  //     sex: e.currentTarget.dataset.id
  //   })
  // },
  // // city
  // //点击选择省市区
  // clickCity() {
  //   this.setData({
  //     showCity: true,
  //     mackShow: true,
  //   })
  // },
  // //点击标题省 省出来 市隐藏
  // chooseProvince() {
  //   this.setData({
  //     showProvince: true,
  //     showCity2: false,
  //   })
  // },
  // //点击标题市 省和区隐藏 市出现
  // chooseCity2() {
  //   this.setData({
  //     showProvince: false,
  //     showCity2: true,
  //     showarea:false
  //   })
  // },
  // //获取市
  // getCity() {
  //   for (var item of this.data.provinceL) {
  //     this.setData({
  //       provinceName: item.regionName,
  //     })
  //   }
  // },
  //  //获取省
  // getProvince(e) {
  //   var _this = this;
  //   // console.log(e.currentTarget.dataset.name)
  //   // console.log(e.currentTarget.dataset.id)
  //   codeProvince = e.currentTarget.dataset.id + "-" + e.currentTarget.dataset.name
  //   province = e.currentTarget.dataset.name;
  //   var regionId = e.currentTarget.dataset.id;
  //   //console.log(codeProvince)
  //   my.request({
  //     method: "get",
  //     url: url +'get_regions?parentId=' + regionId,
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //     },
  //     success(res) {
  //      // console.log(res.data)  //省列表
  //       _this.setData({
  //         cityL: res.data,
  //         showProvince: false,
  //         showCity2: true,
  //         tit2: true,
  //       })
  //     },  
  //     fail(err) {
  //       console.log(err)
  //     }
  //   }).catch((e) => {
  //    my.alert({content: e});
  //   });
  //     this.setData({
  //       areaL: [],
  //   })
  // },
  // // //获取市
  // getCity2(e) {
  //   var _this = this;
  //   codeCity = e.currentTarget.dataset.id + "-" + e.currentTarget.dataset.name
  //   var regionId = e.currentTarget.dataset.id
  //   nextcity = e.currentTarget.dataset.name
  //   wx.request({
  //     method: "get",
  //     url: url +'get_regions?parentId=' + regionId,
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //     },
  //     success(res) {
  //      // console.log(res.data)  //市列表
  //       _this.setData({
  //         areaL: res.data,
  //         showarea: true,
  //         showCity2: false,
  //         tit3: true,
  //       })
  //     },
  //     fail(err) {
  //       console.log(err)
  //     }
  //   }).catch((e) => {
  //    my.alert({content: e});
  //   });
  // },
  // // //获取区
  // getarea(e) {
  //   codeArea = e.currentTarget.dataset.id + "-" + e.currentTarget.dataset.name
  //   district = e.currentTarget.dataset.name
  //   var totalCity = province + "-" + nextcity + "-"+ district
  //   //console.log(codeArea)
  //    this.setData({
  //     chooseCity: totalCity,
  //     showCity: false,
  //     mackShow: false,
  //   })
  // },
  // closeMask() {
  //   this.setData({
  //     showCity: false,
  //     mackShow: false,
  //   })
  // },
  // linkNext() {
  //   var tokens = my.getStorageSync('token');
  //   var insName = my.getStorageSync('userName');
  //   var insIdcard = my.getStorageSync('idCard');
  //   var insPhone = my.getStorageSync('phoneNumber');
  //   if (this.data.link_textarea == "" || this.data.link_name == "" || this.data.link_phone == ""
  //     || this.data.link_options == "" || this.data.sex == "" 
  //     || this.data.chooseCity == "点击我选择" || this.data.grade_name == '请选择' || this.data.link_id =='') {
  //        my.alert({
  //         content: `请输入所有必填的内容`,
  //       });
  //   }
  //     //console.log("通过")
  //   var url = url +"authed/assess_order_apply";
  //   var link_options = this.data.link_options;
  //     var textarea = this.data.link_textarea;
  //     var linkman_name = this.data.link_name;
  //     var linkman_phone = this.data.link_phone;
  //     var contactIdcard = this.data.link_id;
  //     var filepic1 = wx.getStorageSync('filepic1');
  //     var filepic2 = wx.getStorageSync('filepic2');
  //     var applyPics = filepic1 + "," + filepic2;
  //     var sex = this.data.sex;
  //     console.log(codeProvince)
  //     console.log(codeCity)
  //     console.log(codeArea)
  //     console.log("地址" + textarea)
  //     console.log("联系人姓名" + linkman_name)
  //     console.log("联系人电话" + linkman_phone)
  //     console.log("联系人性别" + sex)
  //     console.log("申请人姓名" + insName)
  //     console.log("申请人身份证" + insIdcard)
  //     console.log("申请人电话" + insPhone)
  //     console.log("申请人身份证" + contactIdcard)
  //     console.log(tokens)
  //     console.log("我是图片路径" + applyPics)
  //     my.request({
  //       method: "post",
  //       url: url,
  //       header: {
  //         "content-Type": "application/x-www-form-urlencoded",
  //         'token': tokens
  //       },
  //       data:{
  //         act: "ApplyForOrder", 
  //         insName: insName,  
  //         insIdcard: insIdcard,
  //         applyPics: applyPics,
  //         contactName: linkman_name,
  //         insPhone: insPhone,
  //         contactSex: sex,
  //         contactIdcard: contactIdcard,
  //         contactPhone: linkman_phone,
  //         relationshipInsUser: link_options,
  //         appointedAddress: textarea,
  //         province: codeProvince,
  //         district: codeArea,
  //         city: codeCity,
  //         phoneNumber: insPhone,
  //       },
  //       success(res) {
  //         console.log(res.data)  
  //         if (res.data.errorCode == 0) {
  //           my.navigateTo({
  //             url: '../successful/successful'
  //           })
  //         };  
  //       },
  //       fail(err) {
  //         console.log(err)
  //       }
  //     }).catch((e) => {
  //    my.alert({content: e});
  //   });
    
  // },   
})
