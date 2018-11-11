// pages/my/capacity/capacity.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    countMax: 0,
    sizePercent:0,
    countPercent:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCapacity()
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getCapacity:function(){
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/album/getCapacity',
      data: {
        'accessKey': app.globalData.accessKey
      },
      success: res => {
        console.log("getCapacity->", res)
        if (res.statusCode == 200 && res.data.success) {
          this.setData({
            count: res.data.data.count,
            countMax: res.data.data.countMax,
            sizePercent: (res.data.data.size / res.data.data.sizeMax * 100).toFixed(2),
            countPercent: (res.data.data.count / res.data.data.countMax * 100).toFixed(0)
          })
        }
      },
      complete:()=>{
        wx.hideLoading()
      }
    })
  }
})