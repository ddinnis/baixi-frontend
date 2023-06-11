// components/menu-item/menu-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  methods: {
    onMenuItemTap() {
      const menuId = this.properties.itemData.id;
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=menu&id=${menuId}`,
      });
    },
  },
});
