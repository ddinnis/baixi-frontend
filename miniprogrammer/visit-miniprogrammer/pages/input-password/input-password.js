Page({
    data: {
        baixiId:"",
        isConfirm:false,
        password:"",
        confirmPassword:"",
        studentName:"",
        isFocus:false,
        inputLen:5,
        isSetSuccess:false
    },
    onLoad(options) {
      const eventChannel = this.getOpenerEventChannel();   //取到事件对象
      eventChannel.on("fullData", data => {
        const { baixiId, studentName } = data.data;
        this.setData({
          baixiId,
          studentName
        })
      });
    },
    onFocus(e){
      this.setData({isFocus:true});
    },
    onPasswordChange(e){
      this.setData({ password: e.detail.value });
    },
    onConfirmPasswordChange(e){
      this.setData({ confirmPassword: e.detail.value });
    },
    onIdChange(e){
        let value = e.detail;
        this.setData({ baixiId: value })
    },
    onNameChange(e){
      let value = e.detail;
      this.setData({ studentName: value })
    },
    onReinputClick(){
      this.setData({ password: "",baixiId:"",studentName:"" });
    },
    onConfirmClick(){
        let param = {
            "baiXiId": this.data.baixiId,
            "password": this.data.password,
            "studentName":this.data.studentName
        }
        console.log("param",param)
        if (!this.data.isConfirm) {
          // 第一次输入密码
          if (!this.data.password) {
            wx.showToast({
              title: '请输入密码',
              icon: 'none',
            });
          } else {
            this.setData({
              isConfirm: true,
            });
          }
        } else {
          // 再次输入密码
          if (this.data.password === '') {
            wx.showToast({
              title: '请输入确认密码',
              icon: 'none',
            });
          } else if (this.data.password !== this.data.confirmPassword) {
            wx.showToast({
              title: '两次输入密码不一致，请重新输入',
              icon: 'none',
            });
            this.setData({
              confirmPassword:"",
              password: '',
              isConfirm:false
            });
          }else{
            this.setData({isSetSuccess:true})
          }
        }
    },
    onReturnClick(){
      wx.redirectTo({
        url: '/pages/set-password/set-password',
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