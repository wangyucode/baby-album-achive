// pages/album/join-album/join-album.js
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
      url: 'https://wycode.cn/web/api/public/album/newAlbum',
      data: {
        'accessKey': app.globalData.accessKey
      },
      success: res => {
        console.log("getAlbum->", res)
        if (res.statusCode == 200 && res.data.success) {
          this.setData({
            id: res.data.data.id,
            name: res.data.data.name,
            owner: res.data.data.owner
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
  }
})