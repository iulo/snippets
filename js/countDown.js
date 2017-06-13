;(function (window, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    window.CountDown = factory();
  }
}(this, function () {
  function CountDown(opts) {
    if (!(this instanceof CountDown)) return new CountDown(opts);
    opts = opts || {};
    var defaluts = {
      startTime: 0,
      endTime: 0,
      diffTime: 0,
      callback: function () {}
    }

    for (var key in opts) {
      this[key] = opts[key];
    }

    this.diffTime = this.diffTime ||  (this.endTime - this.startTime); 
    console.log(this.diffTime);
    this.init();
  };

  CountDown.prototype = {
    init: function () {
      var _this = this;
      _this.callback && _this.callback( _this.formatData() );
      _this.diffTime -= 1000;
      setTimeout(function() {
        _this.countDown();
      }, 1000);      
    },
    update: function () {
      
    },
    formatData: function () {
      var t = this.diffTime;
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      days = days.toString();
      
      var data = {
        days: days.toString(),
        hours: hours.toString(),
        minutes: minutes.toString(),
        seconds: seconds.toString(),
      }

      for (var key in data) {
        if (key === 'days') {
          data[key] = data[key].toString();
        } else {
          data[key] = this.leftPad(data[key]);
        }

        data[key] = this.splitData(data[key]);
      }

      return data;
    },
    leftPad: function (arg) {
      var str = arg.toString();
      if (str.length < 2) {
        return '0' + str;
      } 
      return str;
    },
    splitData: function (originData) {
      var dataArr = [];
      dataArr.push(originData);
      dataArr = dataArr.concat(originData.split(''));
      return dataArr;
    }
  }

  return CountDown;
}));