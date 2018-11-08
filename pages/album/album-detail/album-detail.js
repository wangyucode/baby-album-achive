// pages/album/album-detail/album-detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    name: "",
    nameChange:"",
    ownerName: "",
    ownerIcon: "",
    photos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.data.id = options.id;
    this.setData({
      name: options.name,
      ownerName: options.ownerName,
      ownerIcon: options.ownerIcon
    })
    this.data.nameChange = this.data.name;
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
    this.getAlbumPhotos();
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

  inputAlbumName: function(e) {
    this.data.nameChange = e.detail.value
  },

  onTapOk: function() {
    if (this.data.nameChange== this.data.name){
      wx.navigateBack({})
    }else{
      this.changeAlbum()
    }
    
  },

  toUpload: function() {
    wx.navigateTo({
      url: '../new-album/new-photo/new-photo?id=' + this.data.id
    })
  },

  getAlbumPhotos: function() {
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
  },

  toPhotoDetail:function(e){
    let photo = this.data.photos[e.currentTarget.dataset.index]
    console.log(photo)
    wx.navigateTo({
      url: './photo-detail/photo-detail?id=' + photo.id +
        '&desc=' + photo.desc +
        '&path=' + photo.path +
        '&albumId=' + this.data.id +
        '&ownerName=' + photo.uploadUser.nickName +
        '&ownerIcon=' + photo.uploadUser.avatarUrl
    })
  },

  changeAlbum:function(){
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })

    wx.request({
      url: 'https://wycode.cn/web/api/public/album/editAlbum',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.id,
        'name': this.data.nameChange,
      },
      success: function (res) {
        console.log("changeAlbum->", res)
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