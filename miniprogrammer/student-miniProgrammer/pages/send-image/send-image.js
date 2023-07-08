// pages/email/email.js
Page({
    data: {
        imageList:[]
      },
      onLoad(options) {

    },
    afterRead(event) {
        const { file } = event.detail;
        const { imageList = [] } = this.data;
        file.forEach(element => {
            imageList.push({url:element.url,isImage:true});
        });
        
        this.setData({ imageList });
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
        //   filePath: file.url,
        //   name: 'file',
        //   formData: { user: 'test' },
        //   success(res) {
        //     const { imageList = [] } = this.data;
        //     imageList.push({ ...file, url: res.data });
        //     this.setData({ imageList });
        //   },
        // });
    },
    beforeRead(event) {
    const { file, callback } = event.detail;
    file.map((f)=>{
        callback(f.type === 'image')
    })
    // ;
    },
    onReturnClick(){
        wx.navigateTo({
            url: "/pages/overview/overview",
          });
    },
    deleteImg(event){
        let index= event.detail.index
        let imageLists = this.data.imageList;
        imageLists.splice(index,1);
        this.setData({imageList:imageLists});
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

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