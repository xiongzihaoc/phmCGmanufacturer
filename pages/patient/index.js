import { Patient } from "./index_modle"
let patientInfo = new Patient();
var utils = require("../../utils/util.js");
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
 * 页面的初始数据
 */
  data: {
    name: "",
    timeType: 1,
    startTime: "",
    endTime: "",
    // 时间选择器
    searchTimerPopupShow: false,
    // 筛选选择
    closeIconShow: false,
    screenShow: false,
    // 筛选医院列表
    hospitalList: [],
    // 筛选器械列表
    instrumentList: [],
    loadmoreShow: "false",
    loadmoreType: "end",
    healthList: [],
    healthTotal: 0,
    healthPageNum: 1,
    healthPageSize: 5,
    isLogin: false,
    startDate: "",
    endDate: "",
    MaintList: [],
    years,
    months,
    days,
    value: [],
    chooseTime: "",
    parameterList: [],
    parameterNum: null,
    replayNum: null,
    officeList: [],
    officeNum: null,
    instrumentNum: null,
    instrumentAllNum: null,
    hosNum: null,
    hosAllNum: null,
    replayList: [
      { id: 1, name: "已回复", state: "1" },
      { id: 2, name: "未回复", state: "0" }
    ],
    parameterObj: {},
  },
  // 点击回复
  replay: function (e) {
    const replayId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hosDetail/hosDetail?id=' + replayId,
    })
  },
  // 点击查看
  examine: function (e) {
    const replayId = e.currentTarget.dataset.id
    var id = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '/pages/hosDetail/hosDetail?state=' + id + '&id=' + replayId,
    })
  },
  // 筛选
  screen: function () {
    let that = this
    this.setData({
      parameterNum: null,
      replayNum: null,
      officeNum: null,
      instrumentNum: null,
      instrumentAllNum: null,
      hosNum: null,
      hosAllNum: null,
      officeList: [],
      parameterList: [],
      screenShow: true,
    })

  },
  // 获取反馈列表
  getUserInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getUserInfo(that.data.healthPageNum, that.data.healthPageSize, that.data.startTime, that.data.endTime, that.data.parameterObj, (res) => {
      console.log(res);
      var num = Math.ceil(res.count / that.data.healthPageSize);
      that.setData({
        healthList: that.data.healthList.concat(res.data),
        healthTotal: num
      })
    });
  },
  // 获取医院科室列表
  getHospitalList: function () {
    patientInfo.getHospitalList((res) => {
      console.log(res);
      this.setData({
        hospitalList: res.data
      })
    });
  },
  // 获取器械列表
  getInstrumentList: function () {
    patientInfo.getInstrumentList((res) => {
      console.log(res);
      this.setData({
        instrumentList: res.data
      })
    });
  },
  // 回复选择
  replayState: function (e) {
    let that = this
    let state = e.currentTarget.dataset.state
    let replay = that.data.replayList
    this.setData({
      replayNum: state
    })
  },
  // 医院选择全部
  chooseHosAll: function (e) {
    let that = this
    let hosList = that.data.hospitalList
    let officeList = that.data.officeList
    let hosArr = []
    hosList.forEach(item => {
      hosArr.push(...item.child)
    })
    if (that.data.hosAllNum == null) {
      hosArr.forEach((item) => {
        item.choose = 0
      })
      that.setData({
        hosAllNum: 1,
        hosNum: null,
        officeList: hosArr
      })
    } else {
      that.setData({
        hosAllNum: null,
        officeNum: null,
        officeList: []
      })
    }

  },
  // 医院单选
  chooseHos: function (e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let info = e.currentTarget.dataset.info
    let hosList = that.data.hospitalList
    this.setData({
      hosNum: id,
      officeList: info
    });
  },
  // 科室单选多选
  chooseOffice: function (e) {
    let that = this
    let code = e.currentTarget.dataset.code
    let info = e.currentTarget.dataset.info
    let officeList = that.data.officeList
    officeList.forEach((item) => {
      if (item.code == code) {
        if (item.choose == 1) {
          item.choose = 0
        } else {
          item.choose = 1
        }
      }
    })
    that.setData({
      officeList: officeList
    })
  },
  // 科室全选
  chooseOfficeAll: function (e) {
    let that = this
    let officeList = that.data.officeList

    if (that.data.officeNum == null) {
      officeList.forEach((item) => {
        // console.log(that.data.officeNum);
        item.choose = 1
        that.setData({
          officeNum: 1
        })
      })
    } else {
      officeList.forEach((item) => {
        // console.log(that.data.officeNum);
        item.choose = 0
        that.setData({
          officeNum: null
        })
      })
    }
    that.setData({
      officeList: officeList
    })

  },
  // 器械选择全部
  chooseInstrumentAll: function () {
    let that = this
    let instrList = that.data.instrumentList
    let instrArr = []
    if (that.data.instrumentAllNum == null) {
      instrArr.forEach((item) => {
        item.choose = 0
      })
      that.setData({
        instrumentAllNum: 1,
        instrumentNum: null,
        parameterList: instrArr
      })
    } else {
      that.setData({
        instrumentAllNum: null,
        parameterNum: null,
        parameterList: []
      })
    }

  },
  // 器械单选
  chooseInstrument: function (e) {
    console.log(e.currentTarget.dataset.id);
    let that = this
    let id = e.currentTarget.dataset.id
    let instrList = that.data.instrumentList
    that.setData({
      instrumentNum: id,
    });
  },
  // 确认筛选
  btnScreen: function (e) {
    let that = this
    let officeList = that.data.officeList
    let officeArr = ""
    let instrumentList = that.data.instrumentList
    let instrumentArr = ""
    // 科室code集合
    officeList.forEach((item) => {
      if (item.choose == 1) {
        officeArr += item.code + ','
      }
    })
    officeArr = officeArr.slice(0, officeArr.length - 1)

    // 器械code集合
    if (that.data.instrumentAllNum == 1) {
      instrumentList.forEach(item => {
        instrumentArr += item.id
      })
      instrumentArr = instrumentArr.slice(0, instrumentArr.length - 1)
    } else {
      instrumentArr = that.data.instrumentNum
    }
    that.setData({
      parameterObj: {
        hospital: officeArr,
        goodsId: instrumentArr,
        status: that.data.replayNum
      },
      healthList: [],
      healthPageNum: 1,
      screenShow: false,
    })
    this.getUserInfo();
  },
  selectTimer: function () {
    if (this.data.startTime == '') {
      this.setData({
        startTime: utils.getCurrentDate(),
      });
    }
    if (this.data.endTime == '') {
      this.setData({
        endTime: utils.getCurrentDate(),
      });
    }
    this.setData({
      searchTimerPopupShow: true
    });
  },
  // 清除所选时间
  closeIcon: function (e) {
    this.setData({
      closeIconShow: false,
      healthList: [],
      chooseTime: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
    });
    this.getUserInfo()
  },
  done: function () {
    // console.log(this.data.startTime);
    var start = new Date(this.data.startTime).getTime()
    var end = new Date(this.data.endTime).getTime()
    if (start > end) {
      wx.showToast({
        title: '起始时间不能大于结束时间',
        icon: "none"
      })
      return
    } else {
      this.setData({
        closeIconShow: true,
        healthList: [],
        chooseTime: this.data.startTime + " / " + this.data.endTime,
        searchTimerPopupShow: false,
        healthPageNum: 1,
        healthTotal: 1
      });
      this.getUserInfo()
    }
  },
  clear: function () {
    this.setData({
      searchTimerPopupShow: false
    });
  },
  changeTimerType: function (e) {
    var type = utils.getDataSet(e, "type");
    this.setData({
      timeType: type
    });
  },
  bindChange(e) {
    console.log(e);

    let that = this;
    const val = e.detail.value;
    if (this.data.timeType == 1) {
      this.setData({
        startTime: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]],
        startDate: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]]
      });
    } else {
      this.setData({
        endTime: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]],
        endDate: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]]
      });
    }
    console.log(this.data.startTime);
    console.log(this.data.endTime);
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
    let that = this;
    let current = utils.getCurrentDate().split("-");
    current.forEach(element => {
      that.setData({
        value: that.data.value.concat(element - 1)
      });
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
  onShow: function (e) {
    let that = this;
    let openId = wx.getStorageSync('openId');
    let isExist = wx.getStorageSync('isExist');
    if (openId) {
      this.setData({
        isLogin: true
      });
      if (isExist == "0") {
        wx.navigateTo({
          url: '../bindNum/bindNum',
        })
      } else {
        if (this.data.healthList.length == 0 || this.data.healthList == null) {
          this.getUserInfo();
        } else {
          var isreplay = wx.getStorageSync('isreplay');
          if (isreplay == 1) {

            this.setData({
              healthList: [],
              healthPageNum: 1
            });
            this.getUserInfo();
            wx.setStorageSync('isreplay', 0);
          }
        }
        this.getHospitalList();
        this.getInstrumentList();
      }
    }
    // else {
    //   wx.clearStorage();
    //   wx.nextTick(() => {
    //     wx.navigateTo({
    //       url: '/pages/Authorization/index',
    //     })
    //   });
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */onUnload: function () {

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
    let that = this;
    if (this.data.healthTotal > this.data.healthPageNum) {
      this.setData({
        loadmoreShow: true,
        loadmoreType: "loading",
        healthPageNum: that.data.healthPageNum + 1
      });
      this.getUserInfo();
    } else {
      this.setData({
        loadmoreShow: true,
        loadmoreType: "end"
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})