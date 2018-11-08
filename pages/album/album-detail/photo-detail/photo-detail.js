var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    image: "",
    desc: "",
    descChange: "",
    albumId: -1,
    ownerIcon: "",
    ownerName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.id = options.id
    this.data.albumId = options.albumId
    this.setData({
      image: options.path,
      desc: options.desc,
      ownerName: options.ownerName,
      ownerIcon: options.ownerIcon
    })
    this.data.descChange = this.data.desc
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

  onTapImage: function() {
    wx.previewImage({
      urls: ["https://wycode-baby-album.oss-cn-zhangjiakou.aliyuncs.com/" + this.data.image]
    })
  },

  inputDesc: function(e) {
    this.data.descChange = e.detail.value
  },

  onTapOK: function() {
    if (this.data.descChange != this.data.desc) {
      this.changePhoto()
    } else {
      wx.navigateBack({})
    }
  },

  changePhoto: function() {
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })

    wx.request({
      url: 'https://wycode.cn/web/api/public/album/editAlbumPhoto',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.albumId,
        'desc': this.data.descChange,
        'photoId': this.data.id
      },
      success: function(res) {
        console.log("changePhoto->", res)
        if (res.statusCode == 200 && res.data.success) {
          wx.showToast({
            title: "修改成功!"
          });
          setTimeout(() => {
            wx.navigateBack({})
          }, 1200);
        } else {
          wx.hideLoading()
        }
      },
      fail: (res) => {
        wx.hideLoading()
      }
    })
  }
})