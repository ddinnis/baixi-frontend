// pages/article/article.js
Page({
  data: {
    images: [], // 临时图片的路径
    countIndex: 6,
  },
  /*图片浏览及上传 */
  browse (e) {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: (res) => {
        this.chooseWxImage();
      }
    })
  },
  chooseWxImage() {
    wx.chooseMedia({
      count: this.data.countIndex,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        let images = [];
        res.tempFiles.forEach((item)=>{
          images.push(item.tempFilePath)
        })
        this.setData({images});
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    console.log("e.target.dataset",e.target.dataset)
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  submitForm(e) {
    const title = this.data.title
    const content = this.data.content

    if (title && content) {
      wx.showLoading({
        title: '正在创建...',
        mask: true
      })

      // 将选择的图片组成一个Promise数组，准备进行并行上传
      const arr = this.data.images.map(path => {
        return wxUploadFile({
          url: config.urls.question + '/image/upload',
          filePath: path,
          name: 'qimg',
        })
      })

      // 开始并行上传图片
      Promise.all(arr).then(res => {
        // 上传成功，获取这些图片在服务器上的地址，组成一个数组
        return res.map(item => JSON.parse(item.data).url)
      }).catch(err => {
        console.log(">>>> upload images error:", err)
      }).then(urls => {
        // 调用保存问题的后端接口
        return createQuestion({
          title: title,
          content: content,
          images: urls
        })
      }).then(res => {
        // 保存问题成功，返回上一页（通常是一个问题列表页）
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        const prevPage = pages[pages.length - 2];

        // 将新创建的问题，添加到前一页（问题列表页）第一行
        prevPage.data.questions.unshift(res)
        $digest(prevPage)

        wx.navigateBack()
      }).catch(err => {
        console.log(">>>> create question error:", err)
      }).then(() => {
        wx.hideLoading()
      })
    }
  },
  /**上传：图片到服务器 */
  upLoadImgFun(tempFilePathsData) {
    let orderCommentMaterial = []; // 每次选择添加的图片并上传到服务器后的图片信息
    tempFilePathsData.forEach((item, index) => {
      wx.uploadFile({
        url: HTTP.uploadFileUrl(), // 上传服务器的后台请求接口地址
        filePath: item, // 要上传的图片数据对象
        name: 'file', // 上传类型
        header: {
          'content-Type': 'multipart/form-data' // 此处加上，用form表单的格式传
        },
        // 要携带的参数
        formData: {
          "systemCode": "aaa",
          "belongCode": "cccccc",
          "belongID": "123456"
        },
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
        },
        complete(all) {
          console.log(all);
        }
      });
    });
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  // format(e) {
  //     let { name,value } = e.target.dataset
  //     if (!name) return
  //     this.editorCtx.format(name, value)
  //     console.log("name,value",name,value)
  // },

  // undo() {
  //     this.editorCtx.undo()
  // },
  // redo() {
  //     this.editorCtx.redo()
  // },
  // clear() {
  //     this.editorCtx.clear({
  //         success: function (res) {
  //             console.log("clear success")
  //         }
  //     })
  // },
})