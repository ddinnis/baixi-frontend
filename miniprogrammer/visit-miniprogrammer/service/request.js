import { baseUrl } from "./config";
class MyRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  request(options) {
    const { url } = options;
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url: this.baseUrl + url,
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          console.log("err:".err);
        },
      });
    });
  }
  get(options) {
    return this.request({ ...options, methos: "get" });
  }
  post(options) {
    return this.request({ ...options, methos: "post" });
  }
}

export const myRequest = new MyRequest(baseUrl);
