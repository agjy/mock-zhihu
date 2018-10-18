// pages/index/index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feed: [],
    feed_length: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    console.log(111111,this);
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  upper: function() {
    wx.showNavigationBarLoading();
    this.refresh()
    setTimeout(function() {
      wx.hideNavigationBarLoading
      wx.stopPullDownRefresh()
    }, 2000)
  },
  lower: function() {
    wx.showNavigationBarLoading()
    var that = this;
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      that.nextLoad();
    }, 1000);
  },
  refresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getIndexData();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)

  },
  getData: function() {
    var feed = util.getIndexData();
    console.log('getIndexData');
    var feed_data = feed.data;
    console.log(feed_data)
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    })
  },
  nextLoad: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    })
    var next = util.getIndexNextData();
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
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