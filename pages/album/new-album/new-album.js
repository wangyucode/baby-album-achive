// pages/album/new-album/new-album.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    name: "",
    owner: {},
    photos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.newAlbum();
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
    if (this.data.id > 0) {
      this.getAlbumPhotos();
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
    if (this.data.id > 0) {

    } else {
      return;
    }

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
          this.getAlbumPhotos();
        }
      }
    })
  },

  inputAlbumName: function(e) {
    this.data.name = e.detail.value
  },

  onTapOk: function() {
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/album/enableAlbum',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.id
      },
      success: function (res) {
        console.log("enableAlbum->", res)
        if (res.statusCode == 200 && res.data.success) {
            wx.showToast({
              title: "相册已建立!"
            });
          setTimeout(() => { wx.navigateBack({}) }, 1200);
        } else {
          wx.hideLoading()
        }
      },
      fail: (res) => {
        wx.hideLoading()
      }
    })
  },

  toUpload: function() {
    wx.navigateTo({
      url: './new-photo/new-photo?id=' + this.data.id
    })
  },

  getAlbumPhotos:function(){
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/album/getAlbumPhotos',
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.id,
        'page': 0,
        'size': 100, //TODO 分页没做
      },
      success: res => {
        console.log("getAlbumPhotos->", res)
        if (res.statusCode == 200 && res.data.success) {
          this.setData({
            photos: res.data.data.content
          })
          wx.hideLoading()
        }
      }
    })
  }

})