import { myRequest } from "./request";

export function getSearchHotList() {
  return myRequest.get({
    url: "/search/hot",
  });
}

export function getSearchSuggest(keywords) {
  return myRequest.get({
    url: "/search/suggest",
    data: { keywords },
  });
}

export function getSearchRes(keywords, limit = 30, offset = 0) {
  return myRequest.get({
    url: "/cloudsearch",
    data: { keywords, limit, offset },
  });
}
