// 获取 image 组件高度

export default function querySelector(selector) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec((res) => {
      resolve(res);
    });
  });
}
