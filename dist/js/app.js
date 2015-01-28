/*!
 * spidersweb version 4.0.0
 * markquery theme for tistory
 * repository : https://github.com/markquery/spidersweb.git
 * Author : Ungki.H <ungki.h@gmail.com>
 * Homepage : http://markquery.com
 * Licensed under MIT
 */
+function($) {
  "use strict";
  function transitionEnd() {
    var el = document.createElement("bootstrap");
    var transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }
    return false;
  }
  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;
    $(this).one("bsTransitionEnd", function() {
      called = true;
    });
    var callback = function() {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };
  $(function() {
    $.support.transition = transitionEnd();
    if (!$.support.transition) return;
    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function(e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
}(jQuery);

+function($) {
  "use strict";
  var dismiss = '[data-dismiss="alert"]';
  var Alert = function(el) {
    $(el).on("click", dismiss, this.close);
  };
  Alert.VERSION = "3.3.1";
  Alert.TRANSITION_DURATION = 150;
  Alert.prototype.close = function(e) {
    var $this = $(this);
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = $(selector);
    if (e) e.preventDefault();
    if (!$parent.length) {
      $parent = $this.closest(".entry-admin");
    }
    $parent.trigger(e = $.Event("close.bs.alert"));
    if (e.isDefaultPrevented()) return;
    $parent.removeClass("in");
    function removeElement() {
      $parent.detach().trigger("closed.bs.alert").remove();
    }
    $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
  };
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.entry-admin");
      if (!data) $this.data("bs.entry-admin", data = new Alert(this));
      if (typeof option == "string") data[option].call($this);
    });
  }
  var old = $.fn.alert;
  $.fn.alert = Plugin;
  $.fn.alert.Constructor = Alert;
  $.fn.alert.noConflict = function() {
    $.fn.alert = old;
    return this;
  };
  $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
}(jQuery);

+function($) {
  "use strict";
  var backdrop = ".dropdown-backdrop";
  var toggle = '[data-toggle="dropdown"]';
  var nav = ".drawer-nav";
  var Dropdown = function(element) {
    $(element).on("click.bs.dropdown", this.toggle);
  };
  Dropdown.VERSION = "3.3.1";
  Dropdown.prototype.toggle = function(e) {
    var $this = $(this);
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    clearMenus();
    if (!isActive) {
      if ("ontouchstart" in document.documentElement && !$parent.closest(nav).length) {
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click", clearMenus);
      }
      var relatedTarget = {
        relatedTarget: this
      };
      $parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.trigger("focus").attr("aria-expanded", "true");
      $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget);
    }
    return false;
  };
  Dropdown.prototype.keydown = function(e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger("focus");
      return $this.trigger("click");
    }
    var desc = " li:not(.divider):visible a";
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);
    if (!$items.length) return;
    var index = $items.index(e.target);
    if (e.which == 38 && index > 0) index--;
    if (e.which == 40 && index < $items.length - 1) index++;
    if (!~index) index = 0;
    $items.eq(index).trigger("focus");
  };
  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function() {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = {
        relatedTarget: this
      };
      if (!$parent.hasClass("open")) return;
      $parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.attr("aria-expanded", "false");
      $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget);
    });
  }
  function getParent($this) {
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = selector && $(selector);
    return $parent && $parent.length ? $parent : $this.parent();
  }
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.dropdown");
      if (!data) $this.data("bs.dropdown", data = new Dropdown(this));
      if (typeof option == "string") data[option].call($this);
    });
  }
  var old = $.fn.dropdown;
  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown;
  $.fn.dropdown.noConflict = function() {
    $.fn.dropdown = old;
    return this;
  };
  $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
    e.stopPropagation();
  }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', Dropdown.prototype.keydown);
}(jQuery);

(function(window, document, Math) {
  var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1e3 / 60);
  };
  var utils = function() {
    var me = {};
    var _elementStyle = document.createElement("div").style;
    var _vendor = function() {
      var vendors = [ "t", "webkitT", "MozT", "msT", "OT" ], transform, i = 0, l = vendors.length;
      for (;i < l; i++) {
        transform = vendors[i] + "ransform";
        if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
      }
      return false;
    }();
    function _prefixStyle(style) {
      if (_vendor === false) return false;
      if (_vendor === "") return style;
      return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }
    me.getTime = Date.now || function getTime() {
      return new Date().getTime();
    };
    me.extend = function(target, obj) {
      for (var i in obj) {
        target[i] = obj[i];
      }
    };
    me.addEvent = function(el, type, fn, capture) {
      el.addEventListener(type, fn, !!capture);
    };
    me.removeEvent = function(el, type, fn, capture) {
      el.removeEventListener(type, fn, !!capture);
    };
    me.prefixPointerEvent = function(pointerEvent) {
      return window.MSPointerEvent ? "MSPointer" + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
    };
    me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
      var distance = current - start, speed = Math.abs(distance) / time, destination, duration;
      deceleration = deceleration === undefined ? 6e-4 : deceleration;
      destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
      duration = speed / deceleration;
      if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
      } else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
      }
      return {
        destination: Math.round(destination),
        duration: duration
      };
    };
    var _transform = _prefixStyle("transform");
    me.extend(me, {
      hasTransform: _transform !== false,
      hasPerspective: _prefixStyle("perspective") in _elementStyle,
      hasTouch: "ontouchstart" in window,
      hasPointer: window.PointerEvent || window.MSPointerEvent,
      hasTransition: _prefixStyle("transition") in _elementStyle
    });
    me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion);
    me.extend(me.style = {}, {
      transform: _transform,
      transitionTimingFunction: _prefixStyle("transitionTimingFunction"),
      transitionDuration: _prefixStyle("transitionDuration"),
      transitionDelay: _prefixStyle("transitionDelay"),
      transformOrigin: _prefixStyle("transformOrigin")
    });
    me.hasClass = function(e, c) {
      var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
      return re.test(e.className);
    };
    me.addClass = function(e, c) {
      if (me.hasClass(e, c)) {
        return;
      }
      var newclass = e.className.split(" ");
      newclass.push(c);
      e.className = newclass.join(" ");
    };
    me.removeClass = function(e, c) {
      if (!me.hasClass(e, c)) {
        return;
      }
      var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
      e.className = e.className.replace(re, " ");
    };
    me.offset = function(el) {
      var left = -el.offsetLeft, top = -el.offsetTop;
      while (el = el.offsetParent) {
        left -= el.offsetLeft;
        top -= el.offsetTop;
      }
      return {
        left: left,
        top: top
      };
    };
    me.preventDefaultException = function(el, exceptions) {
      for (var i in exceptions) {
        if (exceptions[i].test(el[i])) {
          return true;
        }
      }
      return false;
    };
    me.extend(me.eventType = {}, {
      touchstart: 1,
      touchmove: 1,
      touchend: 1,
      mousedown: 2,
      mousemove: 2,
      mouseup: 2,
      pointerdown: 3,
      pointermove: 3,
      pointerup: 3,
      MSPointerDown: 3,
      MSPointerMove: 3,
      MSPointerUp: 3
    });
    me.extend(me.ease = {}, {
      quadratic: {
        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fn: function(k) {
          return k * (2 - k);
        }
      },
      circular: {
        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
        fn: function(k) {
          return Math.sqrt(1 - --k * k);
        }
      },
      back: {
        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        fn: function(k) {
          var b = 4;
          return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        }
      },
      bounce: {
        style: "",
        fn: function(k) {
          if ((k /= 1) < 1 / 2.75) {
            return 7.5625 * k * k;
          } else if (k < 2 / 2.75) {
            return 7.5625 * (k -= 1.5 / 2.75) * k + .75;
          } else if (k < 2.5 / 2.75) {
            return 7.5625 * (k -= 2.25 / 2.75) * k + .9375;
          } else {
            return 7.5625 * (k -= 2.625 / 2.75) * k + .984375;
          }
        }
      },
      elastic: {
        style: "",
        fn: function(k) {
          var f = .22, e = .4;
          if (k === 0) {
            return 0;
          }
          if (k == 1) {
            return 1;
          }
          return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
        }
      }
    });
    me.tap = function(e, eventName) {
      var ev = document.createEvent("Event");
      ev.initEvent(eventName, true, true);
      ev.pageX = e.pageX;
      ev.pageY = e.pageY;
      e.target.dispatchEvent(ev);
    };
    me.click = function(e) {
      var target = e.target, ev;
      if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
        ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
        ev._constructed = true;
        target.dispatchEvent(ev);
      }
    };
    return me;
  }();
  function IScroll(el, options) {
    this.wrapper = typeof el == "string" ? document.querySelector(el) : el;
    this.scroller = this.wrapper.children[0];
    this.scrollerStyle = this.scroller.style;
    this.options = {
      mouseWheelSpeed: 20,
      startX: 0,
      startY: 0,
      scrollY: true,
      directionLockThreshold: 5,
      momentum: true,
      bounce: true,
      bounceTime: 600,
      bounceEasing: "",
      preventDefault: true,
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
      },
      HWCompositing: true,
      useTransition: true,
      useTransform: true
    };
    for (var i in options) {
      this.options[i] = options[i];
    }
    this.translateZ = this.options.HWCompositing && utils.hasPerspective ? " translateZ(0)" : "";
    this.options.useTransition = utils.hasTransition && this.options.useTransition;
    this.options.useTransform = utils.hasTransform && this.options.useTransform;
    this.options.eventPassthrough = this.options.eventPassthrough === true ? "vertical" : this.options.eventPassthrough;
    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
    this.options.scrollY = this.options.eventPassthrough == "vertical" ? false : this.options.scrollY;
    this.options.scrollX = this.options.eventPassthrough == "horizontal" ? false : this.options.scrollX;
    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
    this.options.bounceEasing = typeof this.options.bounceEasing == "string" ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;
    this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
    if (this.options.tap === true) {
      this.options.tap = "tap";
    }
    this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
    this.x = 0;
    this.y = 0;
    this.directionX = 0;
    this.directionY = 0;
    this._events = {};
    this._init();
    this.refresh();
    this.scrollTo(this.options.startX, this.options.startY);
    this.enable();
  }
  IScroll.prototype = {
    version: "5.1.3",
    _init: function() {
      this._initEvents();
      if (this.options.mouseWheel) {
        this._initWheel();
      }
    },
    destroy: function() {
      this._initEvents(true);
      this._execEvent("destroy");
    },
    _transitionEnd: function(e) {
      if (e.target != this.scroller || !this.isInTransition) {
        return;
      }
      this._transitionTime();
      if (!this.resetPosition(this.options.bounceTime)) {
        this.isInTransition = false;
        this._execEvent("scrollEnd");
      }
    },
    _start: function(e) {
      if (utils.eventType[e.type] != 1) {
        if (e.button !== 0) {
          return;
        }
      }
      if (!this.enabled || this.initiated && utils.eventType[e.type] !== this.initiated) {
        return;
      }
      if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        e.preventDefault();
      }
      var point = e.touches ? e.touches[0] : e, pos;
      this.initiated = utils.eventType[e.type];
      this.moved = false;
      this.distX = 0;
      this.distY = 0;
      this.directionX = 0;
      this.directionY = 0;
      this.directionLocked = 0;
      this._transitionTime();
      this.startTime = utils.getTime();
      if (this.options.useTransition && this.isInTransition) {
        this.isInTransition = false;
        pos = this.getComputedPosition();
        this._translate(Math.round(pos.x), Math.round(pos.y));
        this._execEvent("scrollEnd");
      } else if (!this.options.useTransition && this.isAnimating) {
        this.isAnimating = false;
        this._execEvent("scrollEnd");
      }
      this.startX = this.x;
      this.startY = this.y;
      this.absStartX = this.x;
      this.absStartY = this.y;
      this.pointX = point.pageX;
      this.pointY = point.pageY;
      this._execEvent("beforeScrollStart");
    },
    _move: function(e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }
      if (this.options.preventDefault) {
        e.preventDefault();
      }
      var point = e.touches ? e.touches[0] : e, deltaX = point.pageX - this.pointX, deltaY = point.pageY - this.pointY, timestamp = utils.getTime(), newX, newY, absDistX, absDistY;
      this.pointX = point.pageX;
      this.pointY = point.pageY;
      this.distX += deltaX;
      this.distY += deltaY;
      absDistX = Math.abs(this.distX);
      absDistY = Math.abs(this.distY);
      if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
        return;
      }
      if (!this.directionLocked && !this.options.freeScroll) {
        if (absDistX > absDistY + this.options.directionLockThreshold) {
          this.directionLocked = "h";
        } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
          this.directionLocked = "v";
        } else {
          this.directionLocked = "n";
        }
      }
      if (this.directionLocked == "h") {
        if (this.options.eventPassthrough == "vertical") {
          e.preventDefault();
        } else if (this.options.eventPassthrough == "horizontal") {
          this.initiated = false;
          return;
        }
        deltaY = 0;
      } else if (this.directionLocked == "v") {
        if (this.options.eventPassthrough == "horizontal") {
          e.preventDefault();
        } else if (this.options.eventPassthrough == "vertical") {
          this.initiated = false;
          return;
        }
        deltaX = 0;
      }
      deltaX = this.hasHorizontalScroll ? deltaX : 0;
      deltaY = this.hasVerticalScroll ? deltaY : 0;
      newX = this.x + deltaX;
      newY = this.y + deltaY;
      if (newX > 0 || newX < this.maxScrollX) {
        newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
      }
      if (newY > 0 || newY < this.maxScrollY) {
        newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
      }
      this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
      this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
      if (!this.moved) {
        this._execEvent("scrollStart");
      }
      this.moved = true;
      this._translate(newX, newY);
      if (timestamp - this.startTime > 300) {
        this.startTime = timestamp;
        this.startX = this.x;
        this.startY = this.y;
      }
    },
    _end: function(e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }
      if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        e.preventDefault();
      }
      var point = e.changedTouches ? e.changedTouches[0] : e, momentumX, momentumY, duration = utils.getTime() - this.startTime, newX = Math.round(this.x), newY = Math.round(this.y), distanceX = Math.abs(newX - this.startX), distanceY = Math.abs(newY - this.startY), time = 0, easing = "";
      this.isInTransition = 0;
      this.initiated = 0;
      this.endTime = utils.getTime();
      if (this.resetPosition(this.options.bounceTime)) {
        return;
      }
      this.scrollTo(newX, newY);
      if (!this.moved) {
        if (this.options.tap) {
          utils.tap(e, this.options.tap);
        }
        if (this.options.click) {
          utils.click(e);
        }
        this._execEvent("scrollCancel");
        return;
      }
      if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
        this._execEvent("flick");
        return;
      }
      if (this.options.momentum && duration < 300) {
        momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
          destination: newX,
          duration: 0
        };
        momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
          destination: newY,
          duration: 0
        };
        newX = momentumX.destination;
        newY = momentumY.destination;
        time = Math.max(momentumX.duration, momentumY.duration);
        this.isInTransition = 1;
      }
      if (newX != this.x || newY != this.y) {
        if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
          easing = utils.ease.quadratic;
        }
        this.scrollTo(newX, newY, time, easing);
        return;
      }
      this._execEvent("scrollEnd");
    },
    _resize: function() {
      var that = this;
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(function() {
        that.refresh();
      }, this.options.resizePolling);
    },
    resetPosition: function(time) {
      var x = this.x, y = this.y;
      time = time || 0;
      if (!this.hasHorizontalScroll || this.x > 0) {
        x = 0;
      } else if (this.x < this.maxScrollX) {
        x = this.maxScrollX;
      }
      if (!this.hasVerticalScroll || this.y > 0) {
        y = 0;
      } else if (this.y < this.maxScrollY) {
        y = this.maxScrollY;
      }
      if (x == this.x && y == this.y) {
        return false;
      }
      this.scrollTo(x, y, time, this.options.bounceEasing);
      return true;
    },
    disable: function() {
      this.enabled = false;
    },
    enable: function() {
      this.enabled = true;
    },
    refresh: function() {
      var rf = this.wrapper.offsetHeight;
      this.wrapperWidth = this.wrapper.clientWidth;
      this.wrapperHeight = this.wrapper.clientHeight;
      this.scrollerWidth = this.scroller.offsetWidth;
      this.scrollerHeight = this.scroller.offsetHeight;
      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
      this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
      this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
      this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
      if (!this.hasHorizontalScroll) {
        this.maxScrollX = 0;
        this.scrollerWidth = this.wrapperWidth;
      }
      if (!this.hasVerticalScroll) {
        this.maxScrollY = 0;
        this.scrollerHeight = this.wrapperHeight;
      }
      this.endTime = 0;
      this.directionX = 0;
      this.directionY = 0;
      this.wrapperOffset = utils.offset(this.wrapper);
      this._execEvent("refresh");
      this.resetPosition();
    },
    on: function(type, fn) {
      if (!this._events[type]) {
        this._events[type] = [];
      }
      this._events[type].push(fn);
    },
    off: function(type, fn) {
      if (!this._events[type]) {
        return;
      }
      var index = this._events[type].indexOf(fn);
      if (index > -1) {
        this._events[type].splice(index, 1);
      }
    },
    _execEvent: function(type) {
      if (!this._events[type]) {
        return;
      }
      var i = 0, l = this._events[type].length;
      if (!l) {
        return;
      }
      for (;i < l; i++) {
        this._events[type][i].apply(this, [].slice.call(arguments, 1));
      }
    },
    scrollBy: function(x, y, time, easing) {
      x = this.x + x;
      y = this.y + y;
      time = time || 0;
      this.scrollTo(x, y, time, easing);
    },
    scrollTo: function(x, y, time, easing) {
      easing = easing || utils.ease.circular;
      this.isInTransition = this.options.useTransition && time > 0;
      if (!time || this.options.useTransition && easing.style) {
        this._transitionTimingFunction(easing.style);
        this._transitionTime(time);
        this._translate(x, y);
      } else {
        this._animate(x, y, time, easing.fn);
      }
    },
    scrollToElement: function(el, time, offsetX, offsetY, easing) {
      el = el.nodeType ? el : this.scroller.querySelector(el);
      if (!el) {
        return;
      }
      var pos = utils.offset(el);
      pos.left -= this.wrapperOffset.left;
      pos.top -= this.wrapperOffset.top;
      if (offsetX === true) {
        offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
      }
      if (offsetY === true) {
        offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
      }
      pos.left -= offsetX || 0;
      pos.top -= offsetY || 0;
      pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
      pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;
      time = time === undefined || time === null || time === "auto" ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;
      this.scrollTo(pos.left, pos.top, time, easing);
    },
    _transitionTime: function(time) {
      time = time || 0;
      this.scrollerStyle[utils.style.transitionDuration] = time + "ms";
      if (!time && utils.isBadAndroid) {
        this.scrollerStyle[utils.style.transitionDuration] = "0.001s";
      }
    },
    _transitionTimingFunction: function(easing) {
      this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
    },
    _translate: function(x, y) {
      if (this.options.useTransform) {
        this.scrollerStyle[utils.style.transform] = "translate(" + x + "px," + y + "px)" + this.translateZ;
      } else {
        x = Math.round(x);
        y = Math.round(y);
        this.scrollerStyle.left = x + "px";
        this.scrollerStyle.top = y + "px";
      }
      this.x = x;
      this.y = y;
    },
    _initEvents: function(remove) {
      var eventType = remove ? utils.removeEvent : utils.addEvent, target = this.options.bindToWrapper ? this.wrapper : window;
      eventType(window, "orientationchange", this);
      eventType(window, "resize", this);
      if (this.options.click) {
        eventType(this.wrapper, "click", this, true);
      }
      if (!this.options.disableMouse) {
        eventType(this.wrapper, "mousedown", this);
        eventType(target, "mousemove", this);
        eventType(target, "mousecancel", this);
        eventType(target, "mouseup", this);
      }
      if (utils.hasPointer && !this.options.disablePointer) {
        eventType(this.wrapper, utils.prefixPointerEvent("pointerdown"), this);
        eventType(target, utils.prefixPointerEvent("pointermove"), this);
        eventType(target, utils.prefixPointerEvent("pointercancel"), this);
        eventType(target, utils.prefixPointerEvent("pointerup"), this);
      }
      if (utils.hasTouch && !this.options.disableTouch) {
        eventType(this.wrapper, "touchstart", this);
        eventType(target, "touchmove", this);
        eventType(target, "touchcancel", this);
        eventType(target, "touchend", this);
      }
      eventType(this.scroller, "transitionend", this);
      eventType(this.scroller, "webkitTransitionEnd", this);
      eventType(this.scroller, "oTransitionEnd", this);
      eventType(this.scroller, "MSTransitionEnd", this);
    },
    getComputedPosition: function() {
      var matrix = window.getComputedStyle(this.scroller, null), x, y;
      if (this.options.useTransform) {
        matrix = matrix[utils.style.transform].split(")")[0].split(", ");
        x = +(matrix[12] || matrix[4]);
        y = +(matrix[13] || matrix[5]);
      } else {
        x = +matrix.left.replace(/[^-\d.]/g, "");
        y = +matrix.top.replace(/[^-\d.]/g, "");
      }
      return {
        x: x,
        y: y
      };
    },
    _initWheel: function() {
      utils.addEvent(this.wrapper, "wheel", this);
      utils.addEvent(this.wrapper, "mousewheel", this);
      utils.addEvent(this.wrapper, "DOMMouseScroll", this);
      this.on("destroy", function() {
        utils.removeEvent(this.wrapper, "wheel", this);
        utils.removeEvent(this.wrapper, "mousewheel", this);
        utils.removeEvent(this.wrapper, "DOMMouseScroll", this);
      });
    },
    _wheel: function(e) {
      if (!this.enabled) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      var wheelDeltaX, wheelDeltaY, newX, newY, that = this;
      if (this.wheelTimeout === undefined) {
        that._execEvent("scrollStart");
      }
      clearTimeout(this.wheelTimeout);
      this.wheelTimeout = setTimeout(function() {
        that._execEvent("scrollEnd");
        that.wheelTimeout = undefined;
      }, 400);
      if ("deltaX" in e) {
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
          wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
        } else {
          wheelDeltaX = -e.deltaX;
          wheelDeltaY = -e.deltaY;
        }
      } else if ("wheelDeltaX" in e) {
        wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
        wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
      } else if ("wheelDelta" in e) {
        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
      } else if ("detail" in e) {
        wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
      } else {
        return;
      }
      wheelDeltaX *= this.options.invertWheelDirection;
      wheelDeltaY *= this.options.invertWheelDirection;
      if (!this.hasVerticalScroll) {
        wheelDeltaX = wheelDeltaY;
        wheelDeltaY = 0;
      }
      if (this.options.snap) {
        newX = this.currentPage.pageX;
        newY = this.currentPage.pageY;
        if (wheelDeltaX > 0) {
          newX--;
        } else if (wheelDeltaX < 0) {
          newX++;
        }
        if (wheelDeltaY > 0) {
          newY--;
        } else if (wheelDeltaY < 0) {
          newY++;
        }
        this.goToPage(newX, newY);
        return;
      }
      newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
      newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
      if (newX > 0) {
        newX = 0;
      } else if (newX < this.maxScrollX) {
        newX = this.maxScrollX;
      }
      if (newY > 0) {
        newY = 0;
      } else if (newY < this.maxScrollY) {
        newY = this.maxScrollY;
      }
      this.scrollTo(newX, newY, 0);
    },
    _animate: function(destX, destY, duration, easingFn) {
      var that = this, startX = this.x, startY = this.y, startTime = utils.getTime(), destTime = startTime + duration;
      function step() {
        var now = utils.getTime(), newX, newY, easing;
        if (now >= destTime) {
          that.isAnimating = false;
          that._translate(destX, destY);
          if (!that.resetPosition(that.options.bounceTime)) {
            that._execEvent("scrollEnd");
          }
          return;
        }
        now = (now - startTime) / duration;
        easing = easingFn(now);
        newX = (destX - startX) * easing + startX;
        newY = (destY - startY) * easing + startY;
        that._translate(newX, newY);
        if (that.isAnimating) {
          rAF(step);
        }
      }
      this.isAnimating = true;
      step();
    },
    handleEvent: function(e) {
      switch (e.type) {
       case "touchstart":
       case "pointerdown":
       case "MSPointerDown":
       case "mousedown":
        this._start(e);
        break;

       case "touchmove":
       case "pointermove":
       case "MSPointerMove":
       case "mousemove":
        this._move(e);
        break;

       case "touchend":
       case "pointerup":
       case "MSPointerUp":
       case "mouseup":
       case "touchcancel":
       case "pointercancel":
       case "MSPointerCancel":
       case "mousecancel":
        this._end(e);
        break;

       case "orientationchange":
       case "resize":
        this._resize();
        break;

       case "transitionend":
       case "webkitTransitionEnd":
       case "oTransitionEnd":
       case "MSTransitionEnd":
        this._transitionEnd(e);
        break;

       case "wheel":
       case "DOMMouseScroll":
       case "mousewheel":
        this._wheel(e);
        break;

       case "keydown":
        this._key(e);
        break;

       case "click":
        if (!e._constructed) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      }
    }
  };
  IScroll.utils = utils;
  if (typeof module != "undefined" && module.exports) {
    module.exports = IScroll;
  } else {
    window.IScroll = IScroll;
  }
})(window, document, Math);

(function($) {
  "use strict";
  var namespace = "drawer";
  var touches = typeof document.ontouchstart != "undefined";
  var methods = {
    init: function(options) {
      options = $.extend({
        mastaClass: "drawer-main",
        overlayClass: "drawer-overlay",
        toggleClass: "drawer-toggle",
        upperClass: "drawer-overlay-upper",
        openClass: "drawer-open",
        closeClass: "drawer-close",
        apiToggleClass: "drawer-api-toggle",
        responsiveClass: "drawer-responsive",
        dropdownClass: "dropdown",
        dropdownShown: "shown.bs.dropdown",
        dropdownHidden: "hidden.bs.dropdown"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        var $upper = $("<div>").addClass(options.upperClass + " " + options.toggleClass);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }
        $this.append($upper);
        var drawerScroll = new IScroll("." + options.mastaClass, {
          mouseWheel: true,
          preventDefault: false
        });
        $("." + options.toggleClass + ", ." + options.apiToggleClass).off("click." + namespace).on("click." + namespace, function() {
          methods.toggle.call(_this);
          drawerScroll.refresh();
        });
        $(window).resize(function() {
          methods.close.call(_this);
          drawerScroll.refresh();
        });
        $("." + options.dropdownClass).on(options.dropdownShown, function() {
          drawerScroll.refresh();
        }).on(options.dropdownHidden, function() {
          drawerScroll.refresh();
        });
      });
    },
    toggle: function(options) {
      var _this = this;
      var $this = $(this);
      options = $this.data(namespace).options;
      var open = $this.hasClass(options.openClass);
      open ? methods.close.call(_this) : methods.open.call(_this);
    },
    open: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
      var upperWidth = windowWidth - $("." + options.mastaClass).outerWidth();
      if (touches) {
        $this.on("touchmove." + namespace, function(event) {
          event.preventDefault();
        });
      }
      $this.removeClass(options.closeClass).addClass(options.openClass).transitionEnd(function() {
        $("." + options.upperClass).css({
          width: upperWidth,
          display: "block"
        });
        $this.css({
          overflow: "hidden"
        }).trigger("drawer.opened");
      });
    },
    close: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      if (touches) {
        $this.off("touchmove." + namespace);
      }
      $("." + options.upperClass).css({
        display: "none"
      });
      $this.removeClass(options.openClass).addClass(options.closeClass).transitionEnd(function() {
        $this.css({
          overflow: "auto"
        }).trigger("drawer.closed");
        $("." + options.upperClass).css({
          display: "none"
        });
      });
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.drawer = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  "use strict";
  $.fn.transitionEnd = function(callback) {
    var end = "transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd MSTransitionEnd";
    return this.each(function() {
      $(this).bind(end, function() {
        $(this).unbind(end);
        return callback.call(this);
      });
    });
  };
})(jQuery);

(function($) {
  "use strict";
  var RSS = function(target, url, options, callback) {
    this.target = target;
    this.url = url;
    this.html = [];
    this.effectQueue = [];
    this.options = $.extend({
      ssl: false,
      limit: null,
      key: null,
      layoutTemplate: "<ul>{entries}</ul>",
      entryTemplate: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',
      tokens: {},
      outputMode: "json",
      effect: "show",
      thumbnailSize: "C60x60",
      imageAlt: null,
      error: function() {
        console.log("jQuery RSS: url doesn't link to RSS-Feed");
      },
      success: function() {}
    }, options || {});
    this.callback = callback || this.options.success;
  };
  RSS.htmlTags = [ "doctype", "html", "head", "title", "base", "link", "meta", "style", "script", "noscript", "body", "article", "nav", "aside", "section", "header", "footer", "h1-h6", "hgroup", "address", "p", "hr", "pre", "blockquote", "ol", "ul", "li", "dl", "dt", "dd", "figure", "figcaption", "div", "table", "caption", "thead", "tbody", "tfoot", "tr", "th", "td", "col", "colgroup", "form", "fieldset", "legend", "label", "input", "button", "select", "datalist", "optgroup", "option", "textarea", "keygen", "output", "progress", "meter", "details", "summary", "command", "menu", "del", "ins", "img", "iframe", "embed", "object", "param", "video", "audio", "source", "canvas", "track", "map", "area", "a", "em", "strong", "i", "b", "u", "s", "small", "abbr", "q", "cite", "dfn", "sub", "sup", "time", "code", "kbd", "samp", "var", "mark", "bdi", "bdo", "ruby", "rt", "rp", "span", "br", "wbr" ];
  RSS.prototype.load = function(callback) {
    var apiProtocol = "http" + (this.options.ssl ? "s" : ""), apiHost = apiProtocol + "://ajax.googleapis.com/ajax/services/feed/load", apiUrl = apiHost + "?v=1.0&output=" + this.options.outputMode + "&callback=?&q=" + encodeURIComponent(this.url);
    if (this.options.limit != null) apiUrl += "&num=" + this.options.limit;
    if (this.options.key != null) apiUrl += "&key=" + this.options.key;
    $.getJSON(apiUrl, callback);
  };
  RSS.prototype.render = function() {
    var self = this;
    this.load(function(data) {
      try {
        self.feed = data.responseData.feed;
        self.entries = data.responseData.feed.entries;
      } catch (e) {
        self.entries = [];
        self.feed = null;
        return self.options.error.call(self);
      }
      var html = self.generateHTMLForEntries();
      self.target.append(html.layout);
      if (html.entries.length !== 0) {
        self.appendEntriesAndApplyEffects($("entries", html.layout), html.entries);
      }
      if (self.effectQueue.length > 0) {
        self.executeEffectQueue(self.callback);
      } else {
        $.isFunction(self.callback) && self.callback.call(self);
      }
    });
  };
  RSS.prototype.appendEntriesAndApplyEffects = function(target, entries) {
    var self = this;
    $.each(entries, function(idx, entry) {
      var $html = self.wrapContent(entry);
      if (self.options.effect === "show") {
        target.before($html);
      } else {
        $html.css({
          display: "none"
        });
        target.before($html);
        self.applyEffect($html, self.options.effect);
      }
    });
    target.remove();
  };
  RSS.prototype.generateHTMLForEntries = function() {
    var self = this, result = {
      entries: [],
      layout: null
    };
    $(this.entries).each(function() {
      var entry = this;
      if (self.isRelevant(entry)) {
        var evaluatedString = self.evaluateStringForEntry(self.options.entryTemplate, entry);
        result.entries.push(evaluatedString);
      }
    });
    if (!!this.options.entryTemplate) {
      result.layout = this.wrapContent(this.options.layoutTemplate.replace("{entries}", "<entries></entries>"));
    } else {
      result.layout = this.wrapContent("<div><entries></entries></div>");
    }
    return result;
  };
  RSS.prototype.wrapContent = function(content) {
    if ($.trim(content).indexOf("<") !== 0) {
      return $("<div>" + content + "</div>");
    } else {
      return $(content);
    }
  };
  RSS.prototype.applyEffect = function($element, effect, callback) {
    var self = this;
    switch (effect) {
     case "slide":
      $element.slideDown("slow", callback);
      break;

     case "slideFast":
      $element.slideDown(callback);
      break;

     case "slideSynced":
      self.effectQueue.push({
        element: $element,
        effect: "slide"
      });
      break;

     case "slideFastSynced":
      self.effectQueue.push({
        element: $element,
        effect: "slideFast"
      });
      break;
    }
  };
  RSS.prototype.executeEffectQueue = function(callback) {
    var self = this;
    this.effectQueue.reverse();
    var executeEffectQueueItem = function() {
      var item = self.effectQueue.pop();
      if (item) {
        self.applyEffect(item.element, item.effect, executeEffectQueueItem);
      } else {
        callback && callback();
      }
    };
    executeEffectQueueItem();
  };
  RSS.prototype.evaluateStringForEntry = function(string, entry) {
    var result = string, self = this;
    $(string.match(/(\{.*?\})/g)).each(function() {
      var token = this.toString();
      result = result.replace(token, self.getValueForToken(token, entry));
    });
    return result;
  };
  RSS.prototype.isRelevant = function(entry) {
    var tokenMap = this.getTokenMap(entry);
    if (this.options.filter) {
      if (this.options.filterLimit && this.options.filterLimit == this.html.length) {
        return false;
      } else {
        return this.options.filter(entry, tokenMap);
      }
    } else {
      return true;
    }
  };
  RSS.prototype.getTokenMap = function(entry) {
    var _self = this;
    if (!this.feedTokens) {
      var feed = JSON.parse(JSON.stringify(this.feed));
      delete feed.entries;
      this.feedTokens = feed;
    }
    return $.extend({
      feed: this.feedTokens,
      url: entry.link,
      author: entry.author,
      date: entry.publishedDate,
      kdate: function(entry) {
        var apidate = new Date(entry.publishedDate);
        var ndate = apidate.getFullYear() + "년\n" + (apidate.getMonth() + 1) + "월\n" + apidate.getDate() + "일";
        return ndate;
      }(entry),
      title: entry.title,
      body: entry.content,
      shortBody: entry.contentSnippet,
      bodyPlain: function(entry) {
        var result = entry.content.replace(/<script[\\r\\\s\S]*<\/script>/gim, "").replace(/<\/?[^>]+>/gi, "");
        for (var i = 0; i < RSS.htmlTags.length; i++) {
          result = result.replace(new RegExp("<" + RSS.htmlTags[i], "gi"), "");
        }
        return result;
      }(entry),
      shortBodyPlain: entry.contentSnippet.replace(/<\/?[^>]+>/gi, ""),
      index: $.inArray(entry, this.entries),
      totalEntries: this.entries.length,
      teaserImage: function(entry) {
        try {
          return entry.content.match(/(<img.*?>)/gi)[0];
        } catch (e) {
          return "";
        }
      }(entry),
      teaserImageUrl: function(entry) {
        try {
          return entry.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1].replace(/image|original/i, _self.options.thumbnailSize);
        } catch (e) {
          return "";
        }
      }(entry),
      featuredImageUrl: function(entry) {
        try {
          for (var i in entry.content.match(/(<img.*?>)/gi)) {
            if (entry.content.match(/(<img.*?>)/gi)[i].indexOf(_self.options.imageAlt) > 0) {
              return entry.content.match(/(<img.*?>)/gi)[i].match(/src="(.*?)"/)[1].replace(/image|original/i, _self.options.thumbnailSize);
            }
          }
        } catch (e) {
          return entry.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1].replace(/image|original/i, _self.options.thumbnailSize);
        }
      }(entry),
      featuredImageAlt: function(entry) {
        try {
          for (var i in entry.content.match(/(<img.*?>)/gi)) {
            if (entry.content.match(/(<img.*?>)/gi)[i].indexOf(_self.options.imageAlt) > 0) {
              return entry.content.match(/(<img.*?>)/gi)[i].match(/alt="(.*?)"/)[1];
            }
          }
        } catch (e) {
          return "";
        }
      }(entry)
    }, this.options.tokens);
  };
  RSS.prototype.getValueForToken = function(_token, entry) {
    var tokenMap = this.getTokenMap(entry), token = _token.replace(/[\{\}]/g, ""), result = tokenMap[token];
    if (typeof result != "undefined") return typeof result == "function" ? result(entry, tokenMap) : result; else throw new Error("Unknown token: " + _token);
  };
  $.fn.rss = function(url, options, callback) {
    new RSS(this, url, options, callback).render();
    return this;
  };
})(jQuery);

(function() {
  function o() {
    try {
      return r in t && t[r];
    } catch (e) {
      return !1;
    }
  }
  var e = {}, t = window, n = t.document, r = "localStorage", i = "__storejs__", s;
  e.disabled = !1, e.set = function(e, t) {}, e.get = function(e) {}, e.remove = function(e) {}, 
  e.clear = function() {}, e.transact = function(t, n, r) {
    var i = e.get(t);
    r == null && (r = n, n = null), typeof i == "undefined" && (i = n || {}), r(i), 
    e.set(t, i);
  }, e.getAll = function() {}, e.serialize = function(e) {
    return JSON.stringify(e);
  }, e.deserialize = function(e) {
    if (typeof e != "string") return undefined;
    try {
      return JSON.parse(e);
    } catch (t) {
      return e || undefined;
    }
  };
  if (o()) s = t[r], e.set = function(t, n) {
    return n === undefined ? e.remove(t) : (s.setItem(t, e.serialize(n)), n);
  }, e.get = function(t) {
    return e.deserialize(s.getItem(t));
  }, e.remove = function(e) {
    s.removeItem(e);
  }, e.clear = function() {
    s.clear();
  }, e.getAll = function() {
    var t = {};
    for (var n = 0; n < s.length; ++n) {
      var r = s.key(n);
      t[r] = e.get(r);
    }
    return t;
  }; else if (n.documentElement.addBehavior) {
    var u, a;
    try {
      a = new ActiveXObject("htmlfile"), a.open(), a.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'), 
      a.close(), u = a.w.frames[0].document, s = u.createElement("div");
    } catch (f) {
      s = n.createElement("div"), u = n.body;
    }
    function l(t) {
      return function() {
        var n = Array.prototype.slice.call(arguments, 0);
        n.unshift(s), u.appendChild(s), s.addBehavior("#default#userData"), s.load(r);
        var i = t.apply(e, n);
        return u.removeChild(s), i;
      };
    }
    var c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
    function h(e) {
      return e.replace(c, "___");
    }
    e.set = l(function(t, n, i) {
      return n = h(n), i === undefined ? e.remove(n) : (t.setAttribute(n, e.serialize(i)), 
      t.save(r), i);
    }), e.get = l(function(t, n) {
      return n = h(n), e.deserialize(t.getAttribute(n));
    }), e.remove = l(function(e, t) {
      t = h(t), e.removeAttribute(t), e.save(r);
    }), e.clear = l(function(e) {
      var t = e.XMLDocument.documentElement.attributes;
      e.load(r);
      for (var n = 0, i; i = t[n]; n++) e.removeAttribute(i.name);
      e.save(r);
    }), e.getAll = l(function(t) {
      var n = t.XMLDocument.documentElement.attributes, r = {};
      for (var i = 0, s; s = n[i]; ++i) {
        var o = h(s.name);
        r[s.name] = e.deserialize(t.getAttribute(o));
      }
      return r;
    });
  }
  try {
    e.set(i, i), e.get(i) != i && (e.disabled = !0), e.remove(i);
  } catch (f) {
    e.disabled = !0;
  }
  e.enabled = !e.disabled, typeof module != "undefined" && typeof module != "function" ? module.exports = e : typeof define == "function" && define.amd ? define(e) : this.store = e;
})();

(function($, window, document, undefined) {
  "use strict";
  var userFont = "userFont", defaults = {
    store: false,
    storeIsDefined: !(typeof store === "undefined"),
    userFontSizeRange: 7,
    userFontFamily: false,
    startFontFamily: ""
  };
  function Plugin(element, options) {
    var _self = this;
    _self.element = element;
    _self.options = $.extend({}, defaults, options);
    _self._defaults = defaults;
    _self._name = userFont;
    _self.init();
  }
  Plugin.prototype = {
    init: function() {
      var _self = this, fn = function() {
        _self.defineElements();
        _self.getDefaultFontSize();
        _self.getDefaultFontFamily();
      };
      fn();
      if (_self.options.store === true && !_self.options.storeIsDefined) {
        _self.dependencyWarning();
      }
    },
    dependencyWarning: function() {
      console.warn("store script is required");
    },
    bindControlerHandlers: function() {
      var _self = this;
      _self.$decreaseButton = $(".fontsize-decrease");
      if (_self.$decreaseButton.length) {
        _self.$decreaseButton.on("click", function(e) {
          e.preventDefault();
          var $el = $(this);
          if (!$el.hasClass("disabled")) {
            var n = _self.getCurrentVariation();
            if (n > 1) {
              _self.$target.removeClass("fontsize-" + n);
              _self.$target.attr("data-fontsize", n - 1);
              if (_self.options.store === true && store.enabled) {
                _self.storeCurrentSize();
              }
              _self.fontsizeChanged();
            }
          }
        });
      }
      _self.$increaseButton = $(".fontsize-increase");
      if (_self.$increaseButton.length) {
        _self.$increaseButton.on("click", function(e) {
          e.preventDefault();
          var $el = $(this);
          if (!$el.hasClass("disabled")) {
            var n = _self.getCurrentVariation();
            if (n < _self.options.userFontSizeRange) {
              _self.$target.removeClass("fontsize-" + n);
              _self.$target.attr("data-fontsize", n + 1);
              if (_self.options.store === true && store.enabled) {
                _self.storeCurrentSize();
              }
              _self.fontsizeChanged();
            }
          }
        });
      }
      _self.$resetButton = $(".fontsize-reset");
      if (_self.$resetButton.length) {
        _self.$resetButton.on("click", function(e) {
          e.preventDefault();
          var $el = $(this);
          if (!$el.hasClass("disabled")) {
            var n = _self.getCurrentVariation();
            _self.$target.removeClass("fontsize-" + n);
            _self.$target.attr("data-fontsize", _self.defaultFontsize);
            if (_self.options.store === true && store.enabled) {
              _self.storeCurrentSize();
            }
            _self.fontsizeChanged();
          }
        });
      }
    },
    defineElements: function() {
      var _self = this;
      _self.$target = _self.element;
      _self.bindControlerHandlers();
    },
    getDefaultFontSize: function() {
      var _self = this, v = _self.options.userFontSizeRange;
      _self.defaultFontsize = 0;
      if (v % 2 === 0) {
        _self.defaultFontsize = v / 2 + 1;
      } else {
        _self.defaultFontsize = parseInt(v / 2 + 1, 10);
      }
      _self.setDefaultFontSize();
    },
    detectFontFamily: function(font) {
      var testString = "~iomwIOMW";
      var containerId = "font-container";
      var fontArray = font instanceof Array;
      if (!fontArray) {
        font = [ font ];
      }
      var fontAvailability = [];
      var containerSel = "#" + containerId;
      var spanSel = containerSel + " span";
      var familySansSerif = "sans-serif";
      var familyMonospace = "monospace, monospace";
      $("body").append('<div id="' + containerId + '"></div>');
      $(containerSel).append("<span></span>");
      $(spanSel).append(document.createTextNode(testString));
      $(containerSel).css("visibility", "hidden");
      $(containerSel).css("position", "absolute");
      $(containerSel).css("left", "-9999px");
      $(containerSel).css("top", "0");
      $(containerSel).css("font-weight", "bold");
      $(containerSel).css("font-size", "200px !important");
      jQuery.each(font, function(i, v) {
        $(spanSel).css("font-family", v + "," + familyMonospace);
        var monospaceFallbackWidth = $(spanSel).width();
        var monospaceFallbackHeight = $(spanSel).height();
        $(spanSel).css("font-family", v + "," + familySansSerif);
        var sansSerifFallbackWidth = $(spanSel).width();
        var sansSerifFallbackHeight = $(spanSel).height();
        fontAvailability[i] = true && monospaceFallbackWidth == sansSerifFallbackWidth && monospaceFallbackHeight == sansSerifFallbackHeight;
      });
      $(containerSel).remove();
      if (!fontArray && fontAvailability.length == 1) {
        fontAvailability = fontAvailability[0];
      }
      return fontAvailability;
    },
    getDefaultFontFamily: function() {
      var _self = this;
      var defaultFf = _self.options.startFontFamily;
      if (_self.options.userFontFamily) {
        if (_self.options.store === true && _self.options.storeIsDefined && store.enabled && _self.detectFontFamily(defaultFf)) {
          var getFf = store.get("Ff") || defaultFf;
          $(".js-user-font").css("font-family", getFf);
        }
        _self.setDefaultFontFamily();
      }
    },
    setDefaultFontFamily: function() {
      var _self = this;
      _self.$fontFamilyButton = $(".fontfamily");
      if (_self.$fontFamilyButton.length) {
        _self.$fontFamilyButton.on("click", function(e) {
          e.preventDefault();
          var $el = $(this);
          var currentFf = $el.attr("data-fontfamily");
          if (_self.detectFontFamily(currentFf)) {
            store.set("Ff", currentFf);
            $(".js-user-font").css("font-family", currentFf);
          }
        });
      }
    },
    setDefaultFontSize: function() {
      var _self = this;
      if (_self.options.store === true && _self.options.storeIsDefined && store.enabled) {
        var currentFs = store.get("userfs") || _self.defaultFontsize;
        _self.$target.attr("data-fontsize", currentFs);
      } else {
        _self.$target.attr("data-fontsize", _self.defaultFontsize);
      }
      _self.fontsizeChanged();
    },
    storeCurrentSize: function() {
      var _self = this;
      if (_self.options.storeIsDefined) {
        var currentfontsize = store.set("userfs", _self.$target.attr("data-fontsize"));
      } else {
        _self.dependencyWarning();
      }
    },
    getCurrentVariation: function() {
      return parseInt(this.$target.attr("data-fontsize"), 10);
    },
    fontsizeChanged: function() {
      var _self = this, currentFs = _self.getCurrentVariation();
      _self.$target.addClass("fontsize-" + currentFs);
      if (currentFs === _self.defaultFontsize) {
        _self.$resetButton.addClass("button-disabled");
      } else {
        _self.$resetButton.removeClass("button-disabled");
      }
      if (currentFs === _self.options.userFontSizeRange) {
        _self.$increaseButton.addClass("button-disabled");
      } else {
        _self.$increaseButton.removeClass("button-disabled");
      }
      if (currentFs === 1) {
        _self.$decreaseButton.addClass("button-disabled");
      } else {
        _self.$decreaseButton.removeClass("button-disabled");
      }
    }
  };
  $.fn[userFont] = function(options) {
    var _self = this;
    return _self.each(function() {
      if (!$.data(_self, "plugin_" + userFont)) {
        $.data(_self, "plugin_" + userFont, new Plugin(_self, options));
      }
    });
  };
  $[userFont] = function() {
    var $window = $(window);
    return $window.userFont.apply($window, Array.prototype.slice.call(arguments, 0));
  };
})(jQuery, window, document);

(function() {
  $(function() {
    $("a[href=#]").click(function(e) {
      e.preventDefault();
    });
    $(".js-tab-access").focus(function() {
      var e = $(this);
      if (e.offset().top - $(window).scrollTop() < 51) {
        $("html, body").animate({
          scrollTop: e.offset().top - 51
        }, 500);
      }
    });
    $(".entry-tags").html(function(index, html) {
      return html.replace(/,/gi, "");
    });
  });
}).call(this);