const app = getApp();
import htmltoObject from '../../utils/htmltoObject.js';

Page({
    data: {
        art: {}
    },
    onReady(){
        wx.setNavigationBarTitle({
            title: '详情页'
        });
    },
    onLoad(options){
        let self = this;
        let id = options.id;
        wx.request({
            url: `http://news.at.zhihu.com/api/4/news/${id}`,
            success(res){
                if(res.data.body){
                    let body = res.data.body;                 
                    let htmlObj = htmltoObject(body);
                    res.data.body = htmlObj;
                }
                self.setData({
                    art: res.data
                });
                // console.log(self.data.art)
            }
        });
    }
})