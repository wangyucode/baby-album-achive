//app.js
App({
    onLaunch: function () {
        wx.showLoading({
            title: '登录中...',
            mask: true
        })
        // 登录
        this.doLogin();

    },
    globalData: {
        userInfo: null,
        accessKey: ''
    },

    doLogin: function () {
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
                        success: function (res) {
                            console.log("login->", res)
                            if (res.statusCode == 200 && res.data.success) {
                                that.globalData.accessKey = res.data.data;
                                if (that.loginCallback) {
                                    that.loginCallback();
                                }
                                wx.hideLoading()
                                that.tryGetUserInfo();
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

    tryGetUserInfo: function () {
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
                        }
                    })
                }
            }
        })
    },

    postUserInfo: function () {
        wx.request({
            url: 'https://wycode.cn/web/api/public/album/updateUserInfo',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                'accessKey': this.globalData.accessKey,
                'avatarUrl': this.globalData.userInfo.avatarUrl,
                'city': this.globalData.userInfo.city,
                'country': this.globalData.userInfo.country,
                'gender': this.globalData.userInfo.gender,
                'language': this.globalData.userInfo.language,
                'nickName': this.globalData.userInfo.nickName,
                'province': this.globalData.userInfo.province
            },
            success: (res)=> {
                console.log("postUserInfo->", res)
                if(res.statusCode == 200 && res.data.success){
                    this.globalData.userInfo = res.data.data
                }
            }
        })
    }
})