Page({
    data: {
        current: 0,
        letterList: [{
                writer: "百蹊义工",
                receiveTime: "2023年3月20日",
                // content: "显示信件文本或图片",
                picUrlList: ["https://img.yzcdn.cn/vant/cat.jpeg", "https://img.yzcdn.cn/vant/cat.jpeg", "https://img.yzcdn.cn/vant/cat.jpeg", "https://img.yzcdn.cn/vant/cat.jpeg"]
            },
            {
                writer: "百蹊义工aaa",
                receiveTime: "2023年3月21日",
                content: "显示信件文本或图片,显示信件文本或图片"
            },
            {
                writer: "百蹊义工ccc",
                receiveTime: "2023年3月21日",
                content: "显示信件文本或图片,显示信件文本或图片"
            }
        ],
        readOnly: true
    },
    onLoad(options) {

    },
    prevImg: function () {
        let current = this.data.current;
        current = current > 0 ? current - 1 : this.data.letterList.length - 1;
        this.setData({
            current
        })
    },

    nextImg: function () {
        let current = this.data.current;
        current = current < (this.data.letterList.length - 1) ? current + 1 : 0;
        this.setData({
            current
        })
    },
})