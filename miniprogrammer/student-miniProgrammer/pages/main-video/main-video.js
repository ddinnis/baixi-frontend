// pages/main-video/main-video.js
import { getTopMV } from "../../service/video-api";
Page({
  data: {
    topMvList: [],
    offset: 0,
    hasMore: true,
  },
  onLoad() {
    this.toGetTopMV();
  },
  async toGetTopMV() {
    const res = await getTopMV(this.data.offset);

    const newVideoList = [...this.data.topMvList, ...res.data];

    this.setData({ topMvList: newVideoList });
    this.data.offset = this.data.topMvList.length;
    this.data.hasMore = res.hasMore;
  },

  onPullDownRefresh() {
    this.setData({ topMvList: [] });
    this.data.offset = 0;
    this.data.hasMore = true;
    this.toGetTopMV().then(() => {
      // 刷新成功有结果后就立即停止
      // 也可以用 async await
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom() {
    if (!this.data.hasMore) return;
    this.toGetTopMV();
  },
});
