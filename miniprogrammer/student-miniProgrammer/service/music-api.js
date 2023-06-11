import { myRequest } from "./request";

export function getMusicBanner(type = 0) {
  return myRequest.get({
    url: "/banner",
    data: {
      type,
    },
  });
}

// 新歌 id=3779629 原创 id=2884035 飙升 id=19723756 热歌 id=3778678

export function getPlaylistDetail(id) {
  return myRequest.get({
    url: "/playlist/detail",
    data: {
      id,
    },
  });
}

export function getSongMenuList(cat = "全部", limit = 6, offset = 0) {
  return myRequest.get({
    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset,
    },
  });
}

export function getSongMenuTag() {
  return myRequest.get({
    url: "/playlist/hot",
  });
}
