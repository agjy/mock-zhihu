const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')

function getData(url) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success");
        resolve(res)
      },
      fail: function(res) {
        reject(res)
        console.log('failed')
      }
    })
  })
}

function getIndexData() {
  return index.index
}

function getIndexNextData() {
  return index_next.next
}

function getDiscoveryData() {
  return discovery.discovery
}

function getDiscoveryNextData() {
  return discovery_next.next
}

module.exports = {
  getIndexData: getIndexData,
  getIndexNextData: getIndexNextData,
  getDiscoveryData: getDiscoveryData,
  getDiscoveryNextData: getDiscoveryNextData
}
