// pages/album/album.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    albums: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.loginCallback = this.getAlbums;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.accessKey.length > 0) {
      this.getAlbums()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getAlbums: function() {
    wx.request({
      url: 'https://wycode.cn/web/api/public/album/getAlbums',
      data: {
        'accessKey': app.globalData.accessKey
      },
      success: res => {
        console.log("getAlbums->", res)
        if (res.statusCode == 200 && res.data.success) {
          this.setData({
            albums: res.data.data
          })
        }
      }
    })
  },

  getUserInfoResult: function(e) {
    console.log("getUserInfoResult->", e)
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo;
      app.postUserInfo();
      this.newAlbum();
    } else {
      wx.showToast({
        icon: "none",
        title: '请授予昵称权限！'
      })
    }
  },

  onTapAlbum: function(e) {
    console.log(e)
    wx.navigateTo({
      url: './album-detail/album-detail?id=' + e.currentTarget.dataset.id +
        '&name=' + e.currentTarget.dataset.name+
        '&ownerName=' + encodeURIComponent(e.currentTarget.dataset.ownername) +
        '&ownerIcon=' + e.currentTarget.dataset.ownericon+
        '&cover=' + e.currentTarget.dataset.cover
    })
  },


  newAlbum: function() {
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/album/newAlbum',
      data: {
        'accessKey': app.globalData.accessKey
      },
      success: res => {
        console.log("newAlbum->", res)
        if (res.statusCode == 200 && res.data.success) {
          this.setData({
            id: res.data.data.id,
            name: res.data.data.name,
            owner: res.data.data.owner
          })
          wx.hideLoading()
          this.getAlbums();
        }else{
          wx.showToast({
            icon: "none",
            title: res.data.error
          })
        }
      }
    })
  },
})