// pages/email/email.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onLoad(options) {

    },
    onEditorReady() {
        wx.createSelectorQuery().select('#editor').context(function (res) {
            this.editorCtx = res.context
        }).exec()
    },
    format(e) {
        let { name,value } = e.target.dataset
        if (!name) return
        this.editorCtx.format(name, value)
        console.log("name,value",name,value)
    },
    onStatusChange(e) {
        const formats = e.detail
        this.setData({ formats })
    },
})