// pages/detail-search/detail-search.js
import {
  getSearchHotList,
  getSearchSuggest,
  getSearchRes,
} from "../../service/search";
import { throttle } from "underscore";
Page({
  data: {
    hotList: [],
    searchValue: "",
    searchSuggestList: [],
    searchResList: [],
  },

  onLoad() {
    this.toGetHotList();
  },
  toGetHotList() {
    getSearchHotList().then((res) => {
      const hotList = res.result.hots;
      this.setData({ hotList });
    });
  },
  onChange: throttle(function (event) {
    this.setData({ searchValue: event.detail });
    getSearchSuggest(event.detail).then((res) => {
      this.setData({ searchSuggestList: res.result });
    });
  }),
  onSearch() {
    getSearchRes(this.data.searchValue).then((res) => {
      this.setData({ searchResList: res.result.songs });
    });
  },
  onHotItemTap(event) {
    const searchValue = event.currentTarget.dataset.item.first;
    this.setData({ searchValue });
    this.onSearch();
  },
});
