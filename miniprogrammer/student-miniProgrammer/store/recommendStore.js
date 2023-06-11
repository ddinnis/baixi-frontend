import { HYEventStore } from "hy-event-store";
import { getPlaylistDetail } from "../service/music-api";

const recommendStore = new HYEventStore({
  state: {
    recommendSongsInfo: [],
  },
  actions: {
    // 推荐歌曲
    toGetPlaylistDetail(ctx) {
      getPlaylistDetail(3779629).then((res) => {
        ctx.recommendSongsInfo = res.playlist;
      });
    },
  },
});

export default recommendStore;
