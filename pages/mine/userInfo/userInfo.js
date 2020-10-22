// pages/patient/patientDetail/userInfoDetail/index.js
import { UserInfo } from "./userInfo.modle"
let userInfo = new UserInfo();
import { Patient } from "../../patient/index_modle.js"
let patientInfo = new Patient();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    hospital:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = wx.getStorageSync('userName')
    let phone = wx.getStorageSync('phone')
    let hospital = wx.getStorageSync('hospital')
    this.setData({
      name:name,
      phone:phone,
      hospital:hospital
    });
    this.getHospitalList();
  },

  getHospitalList: function () {
    let that = this;
    patientInfo.getHospitalList((res) => {
      console.log(res);
      this.setData({
        hospitalList: res.data
      })
      var hospital='';
      that.data.hospitalList.forEach(element => {
        hospital += element.name+',';

      });
      if(hospital != ''){
        hospital = hospital.substr(0,hospital.length-1);
        that.setData({
          hospital:hospital
        });
        console.log(this.data.hospital);
        
      }
      
    });
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