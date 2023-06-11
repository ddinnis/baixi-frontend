import { HYEventStore } from "hy-event-store";
import { getPlaylistDetail } from "../service/music-api";
// 新歌 id=3779629  原创 id=2884035  飙升 id=19723756
export const rankingsMap = {
  newRanking: 3779629,
  originRanking: 2884035,
  upRanking: 19723756,
};

const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    originRanking: {},
    upRanking: {},
  },
  actions: {
    toGetRankingList(ctx) {
      for (const key in rankingsMap) {
        const id = rankingsMap[key];
        getPlaylistDetail(id).then((res) => {
          ctx[key] = res.playlist;
        });
      }
    },
  },
});

export default rankingStore;
