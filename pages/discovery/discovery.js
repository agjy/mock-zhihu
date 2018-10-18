// pages/discovery/discovery.js

var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['推荐','圆桌','热门','收藏'],
    currentNavtab: '0',
    imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.refresh();
  },
  toQuestion: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  bindItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer',
    })
  },
  switchTab: function(event) {
    console.log(event.target.dataset.index)
    this.setData({
      currentNavtab: event.target.dataset.index
    })
  },
  upper: function() {
    console.log("upper");
    wx.showNavigationBarLoading()
    this.refresh()
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  refresh: function() {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 2000
    });
    var feed = util.getDiscoveryData()
    this.setData({
      feed: feed.data,
      feed_length: feed.data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1000
      })
    }, 2000)
  },
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    })
    var next = util.getDiscoveryNextData();
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next.data),
      feed_length: this.data.feed_length + next.data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 1000
      })
    }, 2000)
  }
})