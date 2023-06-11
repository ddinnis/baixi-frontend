Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  methods: {
    onTapVideo() {
      const item = this.properties.itemData;
      wx.navigateTo({
        url: `/packageVideo/pages/detail-video/detail-video?id=${item.id}`,
      });
    },
  },
});
