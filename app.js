App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  globalData: {
    userInfo: "sss",
    URL: 'https://www.ecare.org.cn:4280/wechat/',　　　　　
  },
});

//appid  	2019082366391604