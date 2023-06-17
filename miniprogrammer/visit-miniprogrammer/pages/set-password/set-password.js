Page({
    data: {
        baixiId:"",
        studentName:"",
    },
    onLoad(options) {
      this.startScan();
    },
    startScan(e){
     // innerAudioContext.play() // 提示音
      wx.scanCode({
        success: res => {
         this.setData({baixiId: res.result})
        },
        complete: () => {
          console.log("complete");
        },
        fail: (res) => {
          wx.showToast({
            title: '扫码失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
    },
    onScan(e){
        console.log("onScan...",e.detail.result) // 打印出扫码结果
        this.startScan() // 继续扫码
    },
    onIdChange(e){
        this.setData({ baixiId: e.detail })
    },
    onNameChange(e){
      this.setData({ studentName: e.detail })
    },
    onSetPasswordClick(){
      if(!this.data.baixiId){
        wx.showToast({
          title: '请输入百蹊编号',
          icon: 'error',
          duration: 1000
        })
      }
      if(!this.data.studentName){
        wx.showToast({
          title: '请输入学生姓名',
          icon: 'error',
          duration: 1000
        })
      }

      let param = {
          "baixiId": this.data.baixiId,
          "studentName": this.data.studentName,
      }

      wx.navigateTo({
        url: '/pages/input-password/input-password',
        success: function(res) {
          res.eventChannel.emit('fullData', { data: param })
        }
      })
       
      console.log("param",param)
       
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