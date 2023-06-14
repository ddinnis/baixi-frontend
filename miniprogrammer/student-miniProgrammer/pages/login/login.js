
// pages/login/login.js
Page({
    data: {
        baixiId:"",
        password:"",
        inputLen:5,
        isFocus:false,
        isAgree:false
    },
    onLoad(options) {

    },
    onFocus(e){
        this.setData({isFocus:true});
      },
    setValue(e){
        this.setData({ password: e.detail.value });
    },
    onNoChange(e){
        let value = e.detail;
        this.setData({ baixiId: value })
    },
    inputValue(e) {
        let value = e.detail;
        console.log('e',e)
        let arr = [...value];
        this.setData({ password: arr })
      },
    onAgreeClick(){
        this.setData({isAgree:!this.data.isAgree})
    },
    onNoticeClick() {
        wx.navigateTo({
            url: "/pages/notice/notice",
        });
    },
    onLoginClick(){
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