import playStore, { audioContext } from "../../../store/playStore";
import { throttle } from "underscore";

const app = getApp();
const modelNames = ["order", "repeat", "random"];
Page({
  data: {
    playInfosKeys: [
      "id",
      "curSong",
      "currentTime",
      "durationTime",
      "lyricInfos",
      "curLyricIndex",
      "curLyric",
      "isFirstTimePlay",
      "sliderValue",
      "isPlaying",
      "playModeIndex",
    ],
    currentPage: 0,

    // music 界面
    contentHeight: 500,
    statusHeight: 20,

    isFirstTimePlay: true,
    // lyric 界面
    paddingValue: 0,

    // 歌词
    lyricScrollTop: "",

    // 播放条
    id: 0,
    curSong: {},
    currentTime: 0,
    durationTime: 0,
    lyricInfos: [],
    curLyricIndex: 0,
    curLyric: "",

    sliderValue: 0,
    isSliderChange: false,

    // 播放按钮
    isPlaying: true,
    // 播放列表
    playSongsList: [],
    // 0. 顺序播放 1. 单曲播放 2. 随机播放
    playSongsIndex: 0,
    // 播放模式
    playModeName: "order",
  },
  onLoad(options) {
    const id = options.id;
    if (id) {
      playStore.dispatch("playSongsWithIdActions", id);
    }
    // 共享数据 播发列表
    playStore.onStates(
      ["playSongsList", "playSongsIndex"],
      this.getPlaySongsInfo
    );
    playStore.onStates(this.data.playInfosKeys, this.getPlayInfos);
    this.setData({
      contentHeight: app.globalData.contentHeight,
      statusHeight: app.globalData.statusHeight,
    });
  },
  updateProgress: throttle(
    function (currentTime) {
      if (!this.data.isSliderChange) {
        const sliderValue = (currentTime / this.data.durationTime) * 100;

        this.setData({
          currentTime,
          sliderValue,
        });
      }
    },
    800,
    { leading: false, trailing: false }
  ),
  onSwiperChange(e) {
    const current = e.detail.current;
    this.setData({ currentPage: current });
  },
  // 进行节流
  onSliderChange: throttle(function (event) {
    const value = event.detail.value;
    const currentTime = (value / 100) * this.data.durationTime;
    audioContext.seek(currentTime / 1000);
    this.setData({ currentTime });
  }),
  onSliderChanging(event) {
    const value = event.detail.value;
    const currentTime = (value / 100) * this.data.durationTime;
    audioContext.seek(currentTime / 1000);
    this.setData({ currentTime, isSliderChange: true });
  },
  onNavTapItemTap(event) {
    const index = event.currentTarget.dataset.index;
    this.setData({ currentPage: index });
  },
  onPlayOrPauseTap() {
    playStore.dispatch("changeMusicStatusActions");
  },
  onPrevBtnTap() {
    playStore.dispatch("changeNewSongActions", false);
  },
  onNextBtnTap() {
    playStore.dispatch("changeNewSongActions");
  },
  onModeBtnTap() {
    playStore.dispatch("changePlayModeNameAction");
  },
  getPlaySongsInfo(value) {
    // 哪一个变化就传哪一个值
    if (value.playSongsIndex !== undefined) {
      this.setData({ playSongsIndex: value.playSongsIndex });
    }
    if (value.playSongsList) {
      this.setData({ playSongsList: value.playSongsList });
    }
  },
  getPlayInfos({
    id,
    curSong,
    currentTime,
    durationTime,
    lyricInfos,
    curLyricIndex,
    curLyric,
    isFirstTimePlay,
    sliderValue,
    isPlaying,
    playModeIndex,
  }) {
    if (id !== undefined) {
      this.setData({ id });
    }
    if (lyricInfos) {
      this.setData({ lyricInfos });
    }
    if (curSong) {
      this.setData({ curSong });
    }
    if (currentTime !== undefined) {
      // this.setData({ currentTime });
      this.updateProgress(currentTime);
    }
    if (durationTime !== undefined) {
      this.setData({ durationTime });
    }
    if (curLyricIndex !== undefined) {
      this.setData({ curLyricIndex, lyricScrollTop: 35 * curLyricIndex });
    }
    if (curLyric) {
      this.setData({ curLyric });
    }
    if (isFirstTimePlay) {
      this.setData({ isFirstTimePlay });
    }
    if (sliderValue !== undefined) {
      this.setData({ sliderValue });
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying });
    }
    if (playModeIndex !== undefined) {
      this.setData({ playModeName: modelNames[playModeIndex] });
    }
  },
  onUnload() {
    playStore.offStates(
      ["playSongsList", "playSongsIndex"],
      this.getPlaySongsInfo
    );
    // audioContext.pause();
    playStore.offStates(this.data.playInfosKeys, this.getPlayInfos);
  },
  onShareAppMessage() {
    return {
      title: `${this.data.curSong.name} - ${this.data.curSong.ar[0].name}`,
      path: `/pages/music-player/music-player?id=${this.data.id}`,
      imageUrl: this.data.curSong.al.picUrl,
    };
  },
});
