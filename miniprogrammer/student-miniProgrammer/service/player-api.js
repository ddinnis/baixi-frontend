import { myRequest } from "./request";

export function getSongDetail(ids) {
  return myRequest.get({
    url: "/song/detail",
    data: {
      ids,
    },
  });
}

export function getSongLyric(id) {
  return myRequest.get({
    url: "/lyric",
    data: {
      id,
    },
  });
}
