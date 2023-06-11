import { HYEventStore } from "hy-event-store";
import { menuCollection } from "../database/index";

// 我的 页面，歌单数据
export const menuStore = new HYEventStore({
  state: {
    menuList: [],
  },
  actions: {
    async toGetMenuListAction(ctx) {
      const res = await menuCollection.query();
      ctx.menuList = res.data;
    },
  },
});
