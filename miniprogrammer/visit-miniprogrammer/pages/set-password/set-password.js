Page({
    data: {
        baixiId:"",
        password:"",
    },
    onLoad(options) {

    },
    scancode(e){
      innerAudioContext.play() // 提示音
      let baixiId = e.detail.result // 校验扫描结果，并处理
      this.setData({baixiId})
    },
    onIdChange(e){
        let value = e.detail;
        this.setData({ baixiId: value })
    },
    onSetPasswordClick(){
        let param = {
            "baiXiId": this.data.baixiId,
            "password": this.data.password,
        }
        console.log("param",param)

        // wx.navigateTo({
        //     url: "/pages/welcome/welcome",
        // });
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})