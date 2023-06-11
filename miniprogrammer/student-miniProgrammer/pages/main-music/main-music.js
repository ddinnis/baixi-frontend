// pages/main-music/main-music.js
import { getMusicBanner, getSongMenuList } from "../../service/music-api";
import querySelector from "../../utils/query_selector";
import throttle from "../../utils/throttle";
import recommendStore from "../../store/recommendStore";
import rankingStore from "../../store/rankingStore";
import playStore from "../../store/playStore";

const querySelectorThrottle = throttle(querySelector);

Page({
  data: {
    bannerList: [],

    bannerHeight: 0,
    recommendSongsList: [],
    hotMenuList: [],
    recMenuList: [],
    // 榜单
    rankingInfos: {},
    isRankingData: false,
    // 当前播放的歌曲信息
    curSong: {},
    isPlaying: false,
  },

  onLoad() {
    rankingStore.onState("newRanking", this.handleNewRanking);
    rankingStore.onState("originRanking", this.handleOriginRanking);
    rankingStore.onState("upRanking", this.handleUpRanking);
    rankingStore.dispatch("toGetRankingList");

    // 监听 recommendSongs 的数据
    recommendStore.onState("recommendSongsInfo", this.handleRecommendStore);
    // 发起 actions toGetPlaylistDetail 的网络请求
    recommendStore.dispatch("toGetPlaylistDetail");
    playStore.onStates(["curSong", "isPlaying"], this.handlePlaySongInfos);

    this.toGetMusicBanner();
    this.toGetHotMenu();
  },
  onSearchClick() {
    wx.navigateTo({
      url: "/pages/detail-search/detail-search",
    });
  },

  async toGetMusicBanner() {
    const res = await getMusicBanner();
    this.setData({ bannerList: res.banners });
  },
  toGetHotMenu() {
    getSongMenuList().then((res) => {
      this.setData({ hotMenuList: res.playlists });
    });

    getSongMenuList("华语").then((res) => {
      this.setData({ recMenuList: res.playlists });
    });
  },
  onBannerImgLoad() {
    // 获取 image 组件高度
    querySelectorThrottle(".banner-img").then((res) => {
      this.setData({ bannerHeight: res[0].height });
    });
  },
  onRecommendClick() {
    wx.navigateTo({
      url: "/pages/detail-song/detail-song?type=recommend",
    });
  },
  handleRecommendStore(value) {
    if (!value.tracks) return;
    const recommendSongs = value.tracks.slice(0, 6);
    this.setData({ recommendSongsList: recommendSongs });
  },
  handleNewRanking(value) {
    if (!value.name) return;
    this.setData({ isRankingData: true });
    const newRankingInfos = { ...this.data.rankingInfos, newRanking: value };
    this.setData({ rankingInfos: newRankingInfos });
  },
  handleOriginRanking(value) {
    if (!value.name) return;
    this.setData({ isRankingData: true });
    const newRankingInfos = { ...this.data.rankingInfos, originRanking: value };
    this.setData({ rankingInfos: newRankingInfos });
  },
  handleUpRanking(value) {
    if (!value.name) return;
    this.setData({ isRankingData: true });
    const newRankingInfos = { ...this.data.rankingInfos, upRanking: value };
    this.setData({ rankingInfos: newRankingInfos });
  },
  onSongItemTap() {
    playStore.setState("playSongsList", this.data.recommendSongsList);
  },
  handlePlaySongInfos({ curSong, isPlaying }) {
    if (curSong) {
      this.setData({ curSong });
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying });
    }
  },
  onPlayOrPauseBtnTap() {
    playStore.dispatch("changeMusicStatusActions");
  },
  onCoverTap() {
    const id = this.data.curSong.id;
    wx.navigateTo({
      url: `/pages/music-player/music-player`,
    });
  },
  onUnload() {
    recommendStore.offState("recommendSongs", this.handleRecommendStore);
    rankingStore.offState("newRanking", this.handleNewRanking);
    rankingStore.offState("originRanking", this.handleOriginRanking);
    rankingStore.offState("upRanking", this.handleUpRanking);

    playStore.offStates("curSong", this, this.handlePlaySongInfos);
  },
});
