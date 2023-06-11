// pages/detail-video/detail-video.js
import { getMVUrl, getMVInfo, getMVRelated } from "../../../service/video-api";
Page({
  data: {
    id: 0,
    mvUrl: "",
    mvInfo: {},
    relatedList: [],
  },

  onLoad(options) {
    this.setData({ id: options.id });
    this.toGetMVUrl();
    this.toGetMVInfo();
    this.toGetMVRelated();
  },
  async toGetMVUrl() {
    const res = await getMVUrl(this.data.id);
    const url = res.data.url;
    this.setData({ mvUrl: url });
  },
  async toGetMVInfo() {
    const res = await getMVInfo(this.data.id);
    this.setData({ mvInfo: res.data });
  },
  async toGetMVRelated() {
    const res = await getMVRelated(this.data.id);
    this.setData({ relatedList: res.data });
  },
});
