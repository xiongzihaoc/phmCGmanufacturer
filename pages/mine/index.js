// pages/mine/index.js
import { RegModle } from './index.modle'
let RegModleInfo = new RegModle();
const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qCodeShow: false,
    userName: '',
    headerUrl: "",
    qrcode: '',
    isLogin: false,
  },
  // 跳转个人信息
  bindJumpUserInfo: function (e) {
    wx.navigateTo({
      url: '/pages/mine/userInfo/userInfo',
    })
  },
  login: function () {
    wx.clearStorage();
    wx.nextTick(() => {
      wx.navigateTo({
        url: '/pages/Authorization/index',
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openId = wx.getStorageSync('openId');
    var that = this;
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
    let that = this;
    let openId = wx.getStorageSync('openId');
    let name = wx.getStorageSync('nickName')
    let headerUrl = wx.getStorageSync('avatarUrl')
    if (openId) {
      that.setData({
        isLogin: true,
      });
      that.setData({
        userName: name,
        headerUrl: headerUrl
      });

    }
    // else {
    //   if (!app.userIndex) {
    //     app.userIndex = true;
    //     wx.clearStorage();
    //     wx.nextTick(() => {
    //       wx.navigateTo({
    //         url: '/pages/Authorization/index',
    //       })
    //     });
    //   }
    // }
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