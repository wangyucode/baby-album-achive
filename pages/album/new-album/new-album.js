// pages/album/new-album/new-album.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    name: "",
    owner: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.newAlbum();
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
    if (this.data.id > 0) {

    } else {
      return;
    }

  },

  newAlbum: function () {
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
        }
      }
    })
  },

  inputAlbumName: function (e) {
    this.data.name = e.detail.value
  },

  onTapOk: function () {

  },

  toUpload: function () {
    wx.navigateTo({
      url: './new-photo/new-photo?id=' + this.data.id
    })
  }

})