// pages/detail-menu/detail-menu.js
import { getSongMenuTag, getSongMenuList } from "../../service/music-api";
Page({
  data: {
    songMenus: [],
  },

  onLoad(options) {
    this.toGetSongMenuTag();
  },
  async toGetSongMenuTag() {
    const res = await getSongMenuTag();
    const tags = res.tags;

    let allPromises = [];
    for (let tag of tags) {
      const promise = getSongMenuList(tag.name);
      allPromises.push(promise);
    }
    Promise.all(allPromises).then((res) => {
      //   const newSongMneus = [...this.data.songMenus, ...res.playlists];
      console.log(res);
      this.setData({ songMenus: res });
    });
  },
});
