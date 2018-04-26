//index.js
//获取应用实例
const app = getApp();
import util from '../../utils/util.js';

Page({
  data: {
    sliders: [],
    list: []
  },
  index: 1,
  onLoad(){
    let self = this;
    this.setData({
      list: []
    });
    wx.request({
      url: 'https://news.at.zhihu.com/api/4/news/latest',
      success(res){
        // console.log(res);      
        self.setData({
          sliders: res.data.top_stories,
          'list[0]': {
            header: '今日热闻',
            stories: res.data.stories
          }
        });
      }
    });
  },
  loadMore(){
    if(this.data.list.length === 0) return;
    let date = this.getNextDate();
    let self = this;
    wx.request({
      url: `https://news.at.zhihu.com/api/4/news/before/${util.formatDate(date)}`,
      success(res){
        let newList = self.data.list.slice();
        newList.push({
          header: util.formatTitle(res.data.date),
          stories: res.data.stories
        });
        self.setData({
          list: newList
        });
      }
    })
  },
  getNextDate(){
    const now = new Date();
    now.setDate(now.getDate() - this.index++);
    return now;
  },
  onPullDownRefresh(){
    wx.stopPullDownRefresh();
    this.onLoad();
  }
})
