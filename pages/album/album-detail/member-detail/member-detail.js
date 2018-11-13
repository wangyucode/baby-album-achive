// pages/album/album-detail/member-detail/member-detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    albumId: -1,
    permission: 0,
    nickName: "",
    avatarUrl: "",
    isOwner: false,
    isSelf: false,
    permissions: [
      { name: "上传相片", value: 2, checked: false },
      { name: "删除相片", value: 4, checked: false },
      { name: "邀请成员", value: 8, checked: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.id = options.id
    this.data.albumId = options.albumId
    this.data.permission = parseInt(options.permission)
    this.setPermission();
    this.setData({
      nickName: decodeURIComponent(options.nickName),
      avatarUrl: options.avatarUrl,
      permissions: this.data.permissions,
      isOwner: options.isOwner == 'true',
      isSelf: options.isSelf == 'true'
    })
    console.log(this.data)
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

  setPermission: function () {
    this.data.permissions[0].checked = ((this.data.permission & 2) == 2)
    this.data.permissions[1].checked = ((this.data.permission & 4) == 4)
    this.data.permissions[2].checked = ((this.data.permission & 8) == 8)
  },

  permissionChange: function (e) {
    this.data.permission = 1;
    e.detail.value.forEach(element => {
      this.data.permission += parseInt(element)
    });
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/album/changePermission',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.albumId,
        'memberId': this.data.id,
        'permission': this.data.permission,
      },
      success: function (res) {
        console.log("permissionChange->", res)
        if (res.statusCode == 200 && res.data.success) {
          wx.showToast({
            title: "修改成功!",
            mask: true
          });
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.error
          })
        }
      }
    })
  },

  onTapKick: function () {
    var that = this
    wx.showModal({
      title: '请确认！',
      content: '确定将 ' + this.data.nickName + ' 踢出此相册吗？',
      success(res) {
        if (res.confirm) {
          that.deleteMember();
        }
      }
    })
  },

  onTapQuit: function () {
    var that = this
    wx.showModal({
      title: '请确认！',
      content: '确定退出此相册吗？',
      success(res) {
        if (res.confirm) {
          that.deleteMember();
        }
      }
    })
  },

  deleteMember:function(){
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/album/deleteMember',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accessKey': app.globalData.accessKey,
        'albumId': this.data.albumId,
        'memberId': this.data.id
      },
      success: function (res) {
        console.log("deleteMember->", res)
        if (res.statusCode == 200 && res.data.success) {
          wx.showToast({
            title: "删除成功!",
            mask: true
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
  }
})