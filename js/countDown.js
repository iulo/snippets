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
      callback: function () {},
      endCallback: function () {}
    }

    for (var key in opts) {
      this[key] = opts[key];
    }

    this.setTime(this.startTime, this.endTime, this.diffTime);
    this.start();
  };

  CountDown.prototype = {
    setTime: function (startTime, endTime, diffTime) {
      this.startTime = startTime || this.startTime;
      this.endTime = endTime || this.endTime;

      // 传开始时间
      if (startTime) {
        this.diffTime =  this.endTime -  this.startTime;

      // 传差值
      } else if (diffTime) {
        this.diffTime = diffTime;
      
      // 静默失败
      } else {
        console.log('update error: please check the arguments');
      }
    },
    start: function () {
      var _this = this;
      _this.callback && _this.callback( _this.__formatData() );
      _this.diffTime -= 1000;
      if (_this.diffTime > 0) {
        // console.log(_this.diffTime);
        // 递归timeout
        this.__timeout = setTimeout(function() {
          _this.start();
        }, 1000);
      
      // 倒数到0
      } else {
        _this.endCallback &&  _this.endCallback();
      }
    },
    __formatData: function () {
      var t = this.diffTime / 1000;
      var days = Math.floor(t / (60 * 60 * 24));
      var hours = Math.floor((t / (60 * 60)) % 24);
      var minutes = Math.floor((t / 60) % 60);
      var seconds = Math.floor(t % 60);
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
          data[key] = this.__leftPad(data[key]);
        }

        data[key] = this.__splitData(data[key]);
      }

      return data;
    },
    __leftPad: function (arg) {
      var str = arg.toString();
      if (str.length < 2) {
        return '0' + str;
      } 
      return str;
    },
    __splitData: function (originData) {
      var dataArr = [];
      dataArr.push(originData);
      dataArr = dataArr.concat(originData.split(''));
      return dataArr;
    }
  }

  return CountDown;
}));