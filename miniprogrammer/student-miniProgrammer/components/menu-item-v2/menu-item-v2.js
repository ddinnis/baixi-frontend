// components/menu-item-v2/menu-item-v2.js
import { menuCollection, db } from "../../database/index";
import { menuStore } from "../../store/menuStore";
const menuCol = db.collection("c_menu");
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  methods: {
    async deleteMenuTap() {
      const _id = this.properties.itemData._id;
      const res = await menuCollection.remove(_id);
      if (res) {
        menuStore.dispatch("toGetMenuListAction");
        wx.showToast({
          title: "删除歌单成功",
        });
      }
    },
  },
});
