// components/song-item-v2/song-item-v2.js
import {
  favorCollection,
  likeCollection,
  menuCollection,
} from "../../database/index";

const db = wx.cloud.database();
// const favorCol = db.collection("c_favor");
// const likeCol = db.collection("c_like");
const menuCol = db.collection("c_menu");

Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
    index: {
      type: Number,
      value: -1,
    },
    menuList: {
      type: Array,
      value: [],
    },
    hasMore: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    onSongItemTap() {
      const id = this.properties.itemData.id;
      wx.navigateTo({
        url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
      });
    },
    onMoreIconTap() {
      wx.showActionSheet({
        itemList: ["收藏", "喜欢", "添加到歌单"],
        success: (res) => {
          const index = res.tapIndex;
          this.handleOperationResult(index);
        },
      });
    },
    async handleOperationResult(index) {
      let res = null;
      switch (index) {
        case 0: // 收藏
          res = await favorCollection.add(this.properties.itemData);
          break;
        case 1: // 喜欢
          res = await likeCollection.add(this.properties.itemData);
          break;
        case 2: // 喜欢
          const menuListName = this.properties.menuList.map(
            (item) => item.name
          );
          console.log(menuListName);
          wx.showActionSheet({
            itemList: menuListName,
            success: (res) => {
              const menuIndex = res.tapIndex;
              this.handleMenuIndex(menuIndex);
            },
          });
          // res = await menuCollection.add(this.properties.itemData);
          break;
      }

      if (res) {
        const title = index === 0 ? "收藏" : "喜欢";
        wx.showToast({
          title: `${title}成功`,
        });
      }
    },
    handleMenuIndex(index) {
      const menuItem = this.properties.menuList[index];
      const data = this.properties.itemData;
      const cmd = db.command;

      menuCol
        .doc(menuItem._id)
        .update({
          data: {
            songLists: cmd.push(data),
          },
        })
        .then((res) => {
          if (res) {
            wx.showToast({
              title: "成功添加到歌单",
            });
          }
        });
      // menuCollection.update(menuItem._id, {
      //   songLists: cmd.push(data),
      // });
    },
  },
});
