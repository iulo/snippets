// 参考： https://github.com/umdjs/umd

;(function (window, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    window.Demo = factory();
  }
}(this, function () {
  function Demo() {
    if (!(this instanceof Demo)) return new Demo();
  }

  Demo.prototype = {
    
  }
}));

