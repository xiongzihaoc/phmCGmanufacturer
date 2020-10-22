import { Comm } from "../../utils/Common.js"
class Patient extends Comm {
  constructor() {
    super();
  }
  getUserInfo(replayId, callback) {
    // var doctorUuid = wx.getStorageSync('openId');
    let props = {
      url: "/api/vendor/getFeedbackInfo",
      contentType: 'application/json',
      data: {
        "id": replayId,
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
  replayInfo(replayId, content,imageList, callback) {
    // var doctorUuid = wx.getStorageSync('openId');
    let props = {
      url: "/api/vendor/reply",
      contentType: 'application/json',
      data: {
        "feedbackId":replayId,
        "content":content,
        "photos":imageList
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
}
export { Patient };