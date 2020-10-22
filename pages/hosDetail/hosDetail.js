// pages/hosDetail/hosDetail.js
import { Patient } from "./hosDetail_modle"
let patientInfo = new Patient();
var utils = require("../../utils/util.js");
import { uploadUtil } from "../../utils/uploadUtil.js";
const uploadutil = new uploadUtil();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: "",
    hospital: "",
    createTime: "",
    goodsName: "",
    feedbackMan: "",
    content: "",
    feedList: [],
    replyContent: "",
    replyPhotos: [],
    replyId: "",
    message: "",
    imageList: [],
    tempData: [],
    travelResource: [],
    setState: 1,
    picNum: 0,
  },
  // 上传图片
  delPic(e) {
    const index = e.currentTarget.dataset.index;
    let newTempData = this.data.tempData;
    let travelResource = this.data.travelResource;
    newTempData.splice(index, 1);
    travelResource.splice(index, 1);
    this.setData({
      tempData: newTempData,
      travelResource: travelResource
    });
    this.setData({
      picNum: this.data.picNum - 1
    });
    console.log(this.data.tempData);
    console.log(this.data.travelResource);
  },
  uploadPic() {
    let that = this;
    if (!this.data.setState) {
      return false;
    }
    wx.chooseImage({
      count: 9 - that.data.picNum,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        let newTempFilePaths = tempFilePaths.map((tempFile) => {
          return {
            progress: 0,
            url: tempFile,
            flag: 1
          }
        });
        let picNum = that.data.picNum + res.tempFilePaths.length;
        that.setData({
          tempData: that.data.tempData.concat(newTempFilePaths),
          setState: 0,
          picNum: picNum
        });
        wx.showLoading({
          title: '上传图片中',
        })
        uploadutil.uploadImg(tempFilePaths, res => {
          let newPicInfo = res.map((pic, index) => {
            console.log(index);
            console.log(res.length);
            let picUrl = pic.data;
            that.setData({
              travelResource: that.data.travelResource.concat(picUrl),
              setState: 1
            });
            if (index == res.length - 1) {
              wx.hideLoading();
            }
          });
          console.log(that.data.travelResource);
        }, err => {
          console.log(err);
        }, upData => {
          let file = upData['file'];
          let tempData = that.data.tempData;
          tempData.map((temp, index) => {
            if (temp.url == file) {
              temp.progress = upData["progress"];
            }
          });
          that.setData({
            tempData: tempData
          });
        });
      },
      fail(err) {
        if (err.errMsg === "chooseImage:fail cancel") {
          wx.showToast({
            title: '取消选择',
            icon: "none"
          })
        }
      }
    })
  },

  bindEdit: function (e) {
    this.setData({
      message: e.detail.value
    })

  },
  // 点击回复按钮
  replyBtn: function (e) {
    let that = this
    if (that.data.message == "") {
      wx.showToast({
        title: '回复内容不能为空',
        icon: "none"
      })
      return
    } else {
      // 调用列表页的获取数据函数
      patientInfo.replayInfo(this.data.replyId, this.data.message, this.data.travelResource, (res) => {
        wx.setStorageSync('isreplay', 1);
        wx.switchTab({
          url: '/pages/patient/index',
        })
      });
    }
  },
  // 预览图片
  preViewImg: function (e) {
    var url = utils.getDataSet(e, "url");
    var urls = [];
    urls.push(url);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 获取详情
  getDetail: function () {
    patientInfo.getUserInfo(this.data.replyId, (res) => {
      console.log(res);
      this.setData({
        hospital: res.data.hospital,
        createTime: res.data.createTime,
        goodsName: res.data.goodsName,
        feedbackMan: res.data.userType,
        content: res.data.content,
        feedList: res.data.feedbackPhotos,
        replyContent: res.data.replyContent,
        replyPhotos: res.data.replyPhotos
      })

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      state: options.state,
      replyId: options.id
    })
    this.getDetail()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})