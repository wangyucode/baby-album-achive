// pages/album/join-album/join-album.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:-1,
    album:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id
    
    if(new Date().getTime()-options.time>10*60*1000){
      wx.showToast({
        icon: "none",
        title: '邀请已超时',
        mask: true
      })
      setTimeout(() => {
        wx.reLaunch({url:"/pages/album/album"})
      }, 1200);
      return
    }
    app.loginCallback = this.getAlbum;
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

 

  getAlbum:function(){
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/album/getAlbum',
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.id
      },
      success: res => {
        console.log("getAlbum->", res)
        if (res.statusCode == 200 && res.data.success) {
          this.setData({
            album: res.data.data
          })
          wx.hideLoading()
        }else{
          wx.showToast({
            icon: "none",
            title: res.data.error
          })
        }
      }
    })
  },

  getUserInfoResult: function(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo;
      app.postUserInfo();
      this.joinAlbum();
    } else {
      wx.showToast({
        icon: "none",
        title: '请授予昵称权限！'
      })
    }
  },

  joinAlbum:function () {
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })

    wx.request({
      url: 'https://wycode.cn/web/api/public/album/joinAlbum',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.id
      },
      success: function(res) {
        console.log("joinAlbum->", res)
        if (res.statusCode == 200 && res.data.success) {
          wx.showToast({
            title: "加入成功!",
            mask:true
          });
          setTimeout(() => {
            wx.reLaunch({url:"/pages/album/album"})
          }, 1200);
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.error
          })
          setTimeout(() => {
            wx.reLaunch({url:"/pages/album/album"})
          }, 1200);
        }
      },
      fail: (res) => {
        wx.hideLoading()
      }
    })
  }
})