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
    ownerIcon: "",
    ownerName: "",
    albumId: -1,
    deletePermission:false
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
      ownerIcon: options.ownerIcon,
      deletePermission: options.deletePermission
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
        'desc': this.data.descChange,
        'photoId': this.data.id
      },
      success: function(res) {
        console.log("changePhoto->", res)
        if (res.statusCode == 200 && res.data.success) {
          wx.showToast({
            title: "修改成功!"
          });
        } else {
          wx.hideLoading()
        }
      },
      fail: (res) => {
        wx.hideLoading()
      }
    })
  },

  onTapDelete: function () {
    var that =this
    wx.showModal({
      title: '请确认！',
      content: '确定删除这张照片吗？',
      success(res) {
        if (res.confirm) {
          that.deletePhoto();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  deletePhoto:function(){
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })

    wx.request({
      url: 'https://wycode.cn/web/api/public/album/deleteAlbumPhoto',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.albumId,
        'photoId': this.data.id
      },
      success: function (res) {
        console.log("deletePhoto->", res)
        if (res.statusCode == 200 && res.data.success) {
          wx.showToast({
            title: "删除成功!"
          });
          setTimeout(() => {
            wx.navigateBack({})
          }, 1200);
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.error
          })
        }
      }
    })
  },

  onTapSetCover: function () {
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })

    wx.request({
      url: 'https://wycode.cn/web/api/public/album/setAlbumCover',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.albumId,
        'photoId': this.data.id
      },
      success: function (res) {
        console.log("onTapSetCover->", res)
        if (res.statusCode == 200 && res.data.success) {
          wx.showToast({
            title: "设置成功!"
          });
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.error
          })
        }
      }
    })
  }
})