// pages/detail-song/detail-song.js
import recommendStore from "../../store/recommendStore";
import rankingStore from "../../store/rankingStore";
import { getPlaylistDetail } from "../../service/music-api";
import playStore from "../../store/playStore";
import { menuStore } from "../../store/menuStore";

const db = wx.cloud.database();
const menuCol = db.collection("c_menu");
Page({
  data: {
    type: "ranking",
    key: "newRanking",
    id: "",
    songInfo: {},
    menuList: [],
  },
  onLoad(options) {
    // 进入的时候监听
    const type = options.type;
    this.setData({ type });

    // 获取store中榜单数据
    if (type === "ranking") {
      const key = options.key;
      this.data.key = key;
      rankingStore.onState(key, this.handleRanking);
    } else if (type === "recommend") {
      recommendStore.onState("recommendSongsInfo", this.handleRanking);
    } else if (type === "menu") {
      this.data.id = options.id;
      this.toGetMenuSongInfo();
    } else if (type === "profile") {
      // 个人中心
      const { title, tabname } = options;

      this.handleProfileTabInfo(title, tabname);
    } else if (type === "mymenu") {
      const id = options.id;
      this.handleMyMenuInfo(id);
    }

    // 拿取歌单数据
    menuStore.dispatch("toGetMenuListAction");

    menuStore.onState("menuList", this.handleMenuList);
  },
  async handleProfileTabInfo(title, tabname) {
    const collection = db.collection(`c_${tabname}`);
    const res = await collection
      .where({ _openid: wx.getStorageSync("openid") })
      .get();
    console.log("handleProfileTabInfo", res);
    this.setData({
      songInfo: {
        name: title,
        tracks: res.data,
      },
    });
  },
  handleRecommednState(value) {
    this.setData({ songs: value });
  },
  async toGetMenuSongInfo() {
    const res = await getPlaylistDetail(this.data.id);
    this.setData({ songInfo: res.playlist });
  },
  handleRanking(value) {
    this.setData({ songInfo: value });

    wx.setNavigationBarTitle({
      title: value.name,
    });
  },
  onSongItemTap(e) {
    playStore.setState("playSongsList", this.data.songInfo.tracks);
    playStore.setState("playSongsIndex", e.currentTarget.dataset.index);
  },
  handleMenuList(value) {
    this.setData({ menuList: value });
  },
  async handleMyMenuInfo(id) {
    const res = await menuCol.doc(id).get();

    this.setData({
      songInfo: {
        name: res.data.name,
        tracks: res.data.songLists,
      },
    });
  },
  onUnload() {
    // 退出的时候不需要监听
    if (this.data.type === "ranking") {
      rankingStore.offState(this.data.key, this.handleRanking);
    } else if (this.data.type === "recommend") {
      recommendStore.offState("recommendSongsInfo", this.handleRanking);
    }

    menuStore.offState("meunList", this.handleMenuList);
  },
});
