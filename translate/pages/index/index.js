// pages/index/index.js
import md5 from '../../utils/md5.min.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    translation: "翻译结果",
    input: "",
    range: [
      { chs:"中文", lang:"zh", index:0 },
      { chs: "英语", lang: "en", index: 1 },
      { chs: "粤语", lang: "yue", index: 2 },
      { chs: "文言文", lang: "wyw", index: 3 },
      { chs: "日语", lang: "jp", index: 4 },
      { chs: "韩语", lang: "kor", index: 5 },
      { chs: "法语", lang: "fra", index: 6 },
      { chs: "西班牙语", lang: "spa", index: 7 },
      { chs: "泰语", lang: "th", index: 8 },
      { chs: "阿拉伯语", lang: "ara", index: 9 },
      { chs: "俄语", lang: "ru", index: 10 },
      { chs: "葡萄牙语", lang: "pt", index: 11 },
      { chs: "德语", lang: "de", index: 12 },
      { chs: "意大利语", lang: "it", index: 13 },
      { chs: "希腊语", lang: "el", index: 14 },
      { chs: "荷兰语", lang: "nl", index: 15 },
      { chs: "波兰语", lang: "pl", index: 16 },
      { chs: "保加利亚语", lang: "bul", index: 17 },
      { chs: "爱沙尼亚语", lang: "est", index: 18 },
      { chs: "丹麦语", lang: "dan", index: 19 },
      { chs: "芬兰语", lang: "fin", index: 20 },
      { chs: "捷克语", lang: "cs", index: 21 },
      { chs: "罗马尼亚语", lang: "rom", index: 22 },
      { chs: "斯洛文尼亚语", lang: "slo", index: 23 },
      { chs: "瑞典语", lang: "swe", index: 24 },
      { chs: "匈牙利语", lang: "hu", index: 25 },
      { chs: "繁体中文", lang: "cht", index: 26 },
      { chs: "越南语", lang: "vie", index: 27 }
    ],
    index: 0,
  },

  changeTo:function(e) {
    // console.log(e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },

  listenerInput:function(e) {
    // console.log(e.detail.value)
    this.setData({
      input:e.detail.value
    })
  },

  translate:function() {
    var that = this
    const appid = "20200229000390679"
    const key = "RNrOTAVj9Y_zhXAwS1IR"
    var q = that.data.input
    var salt = "20180317"
      
    var str = md5(`${appid}${q}${salt}${key}`)
    // console.log(str)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q: that.data.input,
        from: 'auto',
        to: that.data.range[that.data.index].lang,
        appid: '20200229000390679',
        salt: '20180317',
        sign: str
      },
      success: function (res) {
        // console.log(res.data.trans_result[0]);
        if (res.data.trans_result[0]) {
          that.setData({
            translation: res.data.trans_result[0].dst
          })
          that.updateRecord();
        }
      }
    })
  },

  updateRecord:function() {
    let history = wx.getStorageSync('history') || [{ input: ".", translation: "." }]
    if (history[0].input != this.data.input || history[0].translation != this.data.translation) {
      history.unshift({ 
        input: this.data.input,
        translation: this.data.translation
      })
    }
    history.length = history.length > 15 ? 15 : history.length
    wx.setStorageSync("history", history)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.input) {
      this.setData({ 
        input: options.input,
        translation: options.translation
      })
    }
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