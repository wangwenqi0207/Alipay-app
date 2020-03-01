if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../pages/myassesinfo/myassesinfo');
require('../../pages/myasses/myasses');
require('../../pages/bilityform/bilityform');
require('../../pages/link_man/link_man');
require('../../pages/user_info/user_info');
require('../../pages/applyfor/applyfor');
require('../../pages/homepage/homepage');
require('../../pages/index/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}