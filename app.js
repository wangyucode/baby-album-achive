//app.js
App({
    onLaunch: function() {
        // wx.showLoading({
        //     title: '登录中...',
        // })
        // 登录
        // this.doLogin();
    },
    globalData: {
        userInfo: null,
        accessKey: ''
    },

    doLogin: function() {
        var that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    wx.request({
                        url: 'https://wycode.cn/web/api/public/album/wx/getSession',
                        data: {
                            'jsCode': res.code
                        },
                        success: function(res) {
                            if (res.statusCode == 200 && res.data.success) {
                                let key = res.data.data;
                                that.globalData.accessKey = key;
                                wx.hideLoading()
                            }
                        }
                    })
                } else {
                    wx.showToast({
                        title: res.errMsg,
                        icon: 'none'
                    })
                }
            }
        })
    },

    tryGetUserInfo: function() {
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            this.postUserInfo();

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            // if (this.userInfoReadyCallback) {
                            //     this.userInfoReadyCallback(res)
                            // }
                        }
                    })
                }
            }
        })
    },

    postUserInfo: function() {

    }
})