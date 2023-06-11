// components/custom-navbar/custom-navbar.js
const app = getApp();
Component({
  options: {
    multipleSlots: true,
  },
  data: {
    statusHeight: 20,
  },
  properties: {
    title: {
      type: String,
      value: "导航标题",
    },
  },
  lifetimes: {
    attached() {
      this.setData({ statusHeight: app.globalData.statusHeight });
    },
  },
  methods: {
    onArrowLeftTap() {
      wx.navigateBack();
    },
  },
});
