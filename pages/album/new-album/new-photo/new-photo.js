// pages/album/new-album/new-photo/new-photo.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumId: -1,
    image: "/assets/icons/add_image.png",
    isUploading: false,
    progress: 0,
    isAdding: false,
    tempFileName: "",
    desc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.albumId = options.id
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

  chooseImage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      success: res => {
        this.data.tempFileName = ""
        // tempFilePath可以作为img标签的src属性显示图片
        this.setData({
          image: res.tempFilePaths[0],
          isUploading: true
        })

        this.uploadImage(res.tempFilePaths[0])
      }
    })
  },

  uploadImage: function(path) {

    wx.showLoading({
      title: '请稍候...',
      mask: true
    })

    const uploadTask = wx.uploadFile({
      url: 'https://wycode.cn/web/api/public/upload',
      filePath: path,
      name: 'file',
      success: (res) => {
        let data = JSON.parse(res.data);
        console.log("uploadImage->", res)
        if (res.statusCode == 200 && data.success) {
          this.data.tempFileName = data.data
          wx.showToast({
            title: "上传成功!"
          });
        }
      },
      fail: function(res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        });
      },
      complete: (res) => {
        this.setData({
          isUploading: false
        })
      },
    })

    uploadTask.onProgressUpdate((res) => {
      this.setData({
        progress: res.progress
      })
    })
  },

  inputDesc: function(e) {
    this.data.desc = e.detail.value
  },

  onTapAdd: function() {
    if (this.data.tempFileName == "") {
      wx.showToast({
        title: "请先选择图片",
        icon: 'none'
      });
      return;
    }

    this.addPhoto()
  },

  addPhoto: function() {
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })

    this.setData({
      isAdding: true
    })

    wx.request({
      url: 'https://wycode.cn/web/api/public/album/newPhoto',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.albumId,
        'desc': this.data.desc,
        'fileName': this.data.tempFileName
      },
      success: function(res) {
        console.log("addPhoto->", res)
        if (res.statusCode == 200) {
          if (res.data.success){
            wx.showToast({
              title: "添加成功!"
            });
          }else{
            wx.showToast({
              title: res.data.error
            });
          }
          
        }else{
          wx.hideLoading()
        }
      },
      fail: (res) => {
        wx.hideLoading()
      },
      complete:()=>{
        this.setData({
          isAdding: false
        })
      }
    })
  }
})