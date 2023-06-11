import { HYEventStore } from "hy-event-store";
import { getSongDetail, getSongLyric } from "../service/player-api";
import { parseLyric } from "../utils/parse-lyric";
import { historyCollection } from "../database/index";

export const audioContext = wx.createInnerAudioContext();

const playStore = new HYEventStore({
  state: {
    // 播放列表
    playSongsList: [],
    playSongsIndex: 0,
    //
    id: 0,
    curSong: {},
    currentTime: 0,
    durationTime: 0,
    lyricInfos: [],
    curLyricIndex: -1,
    curLyric: "",

    isFirstTimePlay: true,
    sliderValue: 0,
    isPlaying: false,
    playModeIndex: 0,
  },
  actions: {
    playSongsWithIdActions(ctx, id) {
      // 再获取下一首歌数据前 将上一首歌的数据清空
      ctx.curSong = {};
      ctx.currentTime = 0;
      ctx.durationTime = 0;
      ctx.sliderValue = 0;

      ctx.id = id;
      ctx.isPlaying = true;

      getSongDetail(id).then((res) => {
        ctx.curSong = res.songs[0];
        ctx.durationTime = res.songs[0].dt;

        historyCollection.add(res.songs[0]);
      });

      getSongLyric(id).then((res) => {
        const lyricString = res.lrc.lyric;
        const lyricInfos = parseLyric(lyricString);
        ctx.lyricInfos = lyricInfos;
      });

      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      audioContext.autoplay = true;

      // 监听播放进度
      if (ctx.isFirstTimePlay) {
        ctx.isFirstTimePlay = false;
        audioContext.onTimeUpdate(() => {
          ctx.currentTime = audioContext.currentTime * 1000;
          // 没有滑动的时候

          // 匹配歌词进度 获取歌词的索引index 和文本
          if (!ctx.lyricInfos.length) return;
          // 并保证拿到最后一句歌词
          let index = ctx.lyricInfos.length - 1;

          for (let i = 0; i < ctx.lyricInfos.length; i++) {
            // this.data 里面拿数据 500ms 更新一次
            const info = ctx.lyricInfos[i];

            if (info.time > audioContext.currentTime * 1000) {
              index = i - 1;
              break;
            }
          }
          if (index === ctx.curLyricIndex || index === -1) return;

          // 匹配当前的文本text
          const curLyric = ctx.lyricInfos[index].text;
          // 35是歌词的高度

          ctx.curLyric = curLyric;

          ctx.curLyricIndex = index;
        });
        audioContext.onWaiting(() => {
          audioContext.pause();
        });
        audioContext.onCanplay(() => {
          audioContext.play();
        });
        audioContext.onEnded(() => {
          // 切换歌曲
          this.dispatch("changeNewSongActions");
        });
      }
    },
    changeMusicStatusActions(ctx) {
      if (ctx.isPlaying) {
        audioContext.pause();
        ctx.isPlaying = false;
      } else {
        audioContext.play();
        ctx.isPlaying = true;
      }
    },
    changePlayModeNameAction(ctx) {
      let modeIndex = ctx.playModeIndex;
      modeIndex = modeIndex + 1;
      if (modeIndex === 3) modeIndex = 0;
      ctx.playModeIndex = modeIndex;
    },
    changeNewSongActions(ctx, isNext = true) {
      let index = ctx.playSongsIndex;
      const length = ctx.playSongsList.length;

      switch (ctx.playModeIndex) {
        case 0: // 顺序播放
          index = isNext ? index + 1 : index - 1;
          if (index === length) index = 0;
          if (index === -1) index = length - 1;
          break;
        case 1: // 单曲播放
          break;
        case 2: // 随机播放
          index = Math.floor(Math.random() * length);
          break;
      }

      const nextSong = ctx.playSongsList[index];

      // 播放新歌
      this.dispatch("playSongsWithIdActions", nextSong.id);
      // 保存最新的索引 应该在共享里面
      ctx.playSongsIndex = index;
    },
  },
});

export default playStore;
