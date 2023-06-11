// pages/main-profile/main-profile.js
import { menuCollection, db } from "../../database/index";
import { menuStore } from "../../store/menuStore";

Page({
  data: {
    isLogin: false,
    userInfo: {},

    tabs: [
      { name: "我的收藏", type: "favor" },
      { name: "我的喜欢", type: "like" },
      { name: "历史记录", type: "history" },
    ],

    // 创建歌单的弹出框
    isShowDialog: false,
    menuName: "",
    menuList: [],
  },
  onLoad() {
    // 判断用户是否登录
    const openid = wx.getStorageSync("openid");
    const userInfo = wx.getStorageSync("openid");
    this.setData({ isLogin: !!openid });
    if (this.data.isLogin) {
      this.setData({ userInfo });
      menuStore.dispatch("toGetMenuListAction");
      menuStore.onState("menuList", this.handleMneuList);
    }
  },

  async onUserInfoTap() {
    const res = await wx.getUserProfile({
      desc: "获取您的头像和昵称",
    });

    // 获取 oppenid
    const loginRes = await wx.cloud.callFunction({
      name: "music-login",
    });
    const openid = loginRes.result.openid;

    // 保存再本地
    wx.setStorageSync("openid", openid);
    wx.setStorageSync("userInfo", res.userInfo);
    this.setData({ userInfo: res.userInfo, isLogin: true });
  },
  onTabsTap(event) {
    const item = event.currentTarget.dataset.item;
    if (this.data.isLogin) {
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=profile&title=${item.name}&tabname=${item.type}`,
      });
    } else {
      wx.showToast({
        title: "请先登录",
        icon: "error",
      });
    }
  },
  onShowDialogTap() {
    this.setData({ isShowDialog: true });
  },
  async onConfirmDialog() {
    const menuName = this.data.menuName;
    console.log(menuName);
    const menuRecord = {
      name: menuName,
      songLists: [],
    };
    const res = await menuCollection.add(menuRecord);
    if (res) {
      wx.showToast({
        title: "创建歌单成功",
      });
      menuStore.dispatch("toGetMenuListAction");
    }
    console.log(res);
  },
  onInputValue() {},
  handleMneuList(value) {
    this.setData({ menuList: value });
  },
  async handleMenu(event) {
    const id = event.currentTarget.dataset.item._id;
    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=mymenu&id=${id}`,
    });
  },
});
