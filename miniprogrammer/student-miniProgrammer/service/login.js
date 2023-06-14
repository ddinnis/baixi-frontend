import { myRequest } from "./request";

export function login(cat = "全部", limit = 6, offset = 0) {
	return myRequest.get({
	  url: "/top/playlist",
	  data: {
		cat,
		limit,
		offset,
	  },
	});
  }