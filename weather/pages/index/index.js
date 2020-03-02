// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
    cond_code: "999",
    now:""
  },

  changeRegion:function(e) {
    this.setData({
      region:e.detail.value
    })
    this.getWeather();  //实时更新天气
  },

  getWeather:function() {
    var that = this;  //this不可以直接在wxAPI函数内部使用
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        location:that.data.region[1],
        key:"021c6939921f4d2abf6e599908252d4d"
      },
      success:function(res) {
        //console.log(res.data)
        that.setData({
          now:res.data.HeWeather6[0].now,
          cond_code: res.data.HeWeather6[0].now.cond_code,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getWeather();
    var that = this
    wx.getLocation({
      success:function(res) {
        var locat = res.latitude.toString() + "," + res.longitude.toString();
        wx.request({
          url: "https://api.map.baidu.com/reverse_geocoding/v3",
          data: {
            ak: "IAcvnjGB277dDRdbGP6EbaYFntaUePuF",
            location: locat,
            output: "json"
          },
          success:function(res) {
            // console.log(res)
            that.setData({
              region: [res.data.result.addressComponent.province,res.data.result.addressComponent.city, res.data.result.addressComponent.district]
              
            });
            // console.log(that.data.region + "  11111")
            that.getWeather();
          }
        })
        // console.log(that.data.region + "  22222")
      }
    })
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