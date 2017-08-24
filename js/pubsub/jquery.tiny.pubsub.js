/* jQuery Tiny Pub/Sub */
(function ($) {
  // 避免重复定义
  if ($.subscribe) {
    return;
  }

  var o = $({});

  $.subscribe = function () {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function () {
    o.off.apply(o, arguments);
  };

  $.publish = function () {
    o.trigger.apply(o, arguments);
  };

}(jQuery || $));
