/*!
 * Spider's Web version 4.0.0
 * markquery theme for tistory
 * repository : https://github.com/markquery/spidersweb.git
 * Author : Ungki.H <ungki.h@gmail.com>
 * Homepage : http://markquery.com
 * Licensed under MIT
 */
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

(function() {
  var block = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: noop,
    hr: /^( *[-*_]){3,} *(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
    nptable: noop,
    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
    blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
    table: noop,
    paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
    text: /^[^\n]+/
  };
  block.bullet = /(?:[*+-]|\d+\.)/;
  block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
  block.item = replace(block.item, "gm")(/bull/g, block.bullet)();
  block.list = replace(block.list)(/bull/g, block.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + block.def.source + ")")();
  block.blockquote = replace(block.blockquote)("def", block.def)();
  block._tag = "(?!(?:" + "a|em|strong|small|s|cite|q|dfn|abbr|data|time|code" + "|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo" + "|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";
  block.html = replace(block.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, block._tag)();
  block.paragraph = replace(block.paragraph)("hr", block.hr)("heading", block.heading)("lheading", block.lheading)("blockquote", block.blockquote)("tag", "<" + block._tag)("def", block.def)();
  block.normal = merge({}, block);
  block.gfm = merge({}, block.normal, {
    fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
    paragraph: /^/
  });
  block.gfm.paragraph = replace(block.paragraph)("(?!", "(?!" + block.gfm.fences.source.replace("\\1", "\\2") + "|" + block.list.source.replace("\\1", "\\3") + "|")();
  block.tables = merge({}, block.gfm, {
    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
  });
  function Lexer(options) {
    this.tokens = [];
    this.tokens.links = {};
    this.options = options || marked.defaults;
    this.rules = block.normal;
    if (this.options.gfm) {
      if (this.options.tables) {
        this.rules = block.tables;
      } else {
        this.rules = block.gfm;
      }
    }
  }
  Lexer.rules = block;
  Lexer.lex = function(src, options) {
    var lexer = new Lexer(options);
    return lexer.lex(src);
  };
  Lexer.prototype.lex = function(src) {
    src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n");
    return this.token(src, true);
  };
  Lexer.prototype.token = function(src, top, bq) {
    var src = src.replace(/^ +$/gm, ""), next, loose, cap, bull, b, item, space, i, l;
    while (src) {
      if (cap = this.rules.newline.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[0].length > 1) {
          this.tokens.push({
            type: "space"
          });
        }
      }
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        cap = cap[0].replace(/^ {4}/gm, "");
        this.tokens.push({
          type: "code",
          text: !this.options.pedantic ? cap.replace(/\n+$/, "") : cap
        });
        continue;
      }
      if (cap = this.rules.fences.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "code",
          lang: cap[2],
          text: cap[3]
        });
        continue;
      }
      if (cap = this.rules.heading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "heading",
          depth: cap[1].length,
          text: cap[2]
        });
        continue;
      }
      if (top && (cap = this.rules.nptable.exec(src))) {
        src = src.substring(cap[0].length);
        item = {
          type: "table",
          header: cap[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
          align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: cap[3].replace(/\n$/, "").split("\n")
        };
        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = item.cells[i].split(/ *\| */);
        }
        this.tokens.push(item);
        continue;
      }
      if (cap = this.rules.lheading.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "heading",
          depth: cap[2] === "=" ? 1 : 2,
          text: cap[1]
        });
        continue;
      }
      if (cap = this.rules.hr.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "hr"
        });
        continue;
      }
      if (cap = this.rules.blockquote.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "blockquote_start"
        });
        cap = cap[0].replace(/^ *> ?/gm, "");
        this.token(cap, top, true);
        this.tokens.push({
          type: "blockquote_end"
        });
        continue;
      }
      if (cap = this.rules.list.exec(src)) {
        src = src.substring(cap[0].length);
        bull = cap[2];
        this.tokens.push({
          type: "list_start",
          ordered: bull.length > 1
        });
        cap = cap[0].match(this.rules.item);
        next = false;
        l = cap.length;
        i = 0;
        for (;i < l; i++) {
          item = cap[i];
          space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) +/, "");
          if (~item.indexOf("\n ")) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "");
          }
          if (this.options.smartLists && i !== l - 1) {
            b = block.bullet.exec(cap[i + 1])[0];
            if (bull !== b && !(bull.length > 1 && b.length > 1)) {
              src = cap.slice(i + 1).join("\n") + src;
              i = l - 1;
            }
          }
          loose = next || /\n\n(?!\s*$)/.test(item);
          if (i !== l - 1) {
            next = item.charAt(item.length - 1) === "\n";
            if (!loose) loose = next;
          }
          this.tokens.push({
            type: loose ? "loose_item_start" : "list_item_start"
          });
          this.token(item, false, bq);
          this.tokens.push({
            type: "list_item_end"
          });
        }
        this.tokens.push({
          type: "list_end"
        });
        continue;
      }
      if (cap = this.rules.html.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: this.options.sanitize ? "paragraph" : "html",
          pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
          text: cap[0]
        });
        continue;
      }
      if (!bq && top && (cap = this.rules.def.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.links[cap[1].toLowerCase()] = {
          href: cap[2],
          title: cap[3]
        };
        continue;
      }
      if (top && (cap = this.rules.table.exec(src))) {
        src = src.substring(cap[0].length);
        item = {
          type: "table",
          header: cap[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
          align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: cap[3].replace(/(?: *\| *)?\n$/, "").split("\n")
        };
        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = item.cells[i].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
        }
        this.tokens.push(item);
        continue;
      }
      if (top && (cap = this.rules.paragraph.exec(src))) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "paragraph",
          text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1]
        });
        continue;
      }
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        this.tokens.push({
          type: "text",
          text: cap[0]
        });
        continue;
      }
      if (src) {
        throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
      }
    }
    return this.tokens;
  };
  var inline = {
    escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
    autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
    url: noop,
    tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
    link: /^!?\[(inside)\]\(href\)/,
    reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
    nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
    strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
    em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
    code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
    br: /^ {2,}\n(?!\s*$)/,
    del: noop,
    text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
  };
  inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
  inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
  inline.link = replace(inline.link)("inside", inline._inside)("href", inline._href)();
  inline.reflink = replace(inline.reflink)("inside", inline._inside)();
  inline.normal = merge({}, inline);
  inline.pedantic = merge({}, inline.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
  });
  inline.gfm = merge({}, inline.normal, {
    escape: replace(inline.escape)("])", "~|])")(),
    url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
    del: /^~~(?=\S)([\s\S]*?\S)~~/,
    text: replace(inline.text)("]|", "~]|")("|", "|https?://|")()
  });
  inline.breaks = merge({}, inline.gfm, {
    br: replace(inline.br)("{2,}", "*")(),
    text: replace(inline.gfm.text)("{2,}", "*")()
  });
  function InlineLexer(links, options) {
    this.options = options || marked.defaults;
    this.links = links;
    this.rules = inline.normal;
    this.renderer = this.options.renderer || new Renderer();
    this.renderer.options = this.options;
    if (!this.links) {
      throw new Error("Tokens array requires a `links` property.");
    }
    if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    } else if (this.options.pedantic) {
      this.rules = inline.pedantic;
    }
  }
  InlineLexer.rules = inline;
  InlineLexer.output = function(src, links, options) {
    var inline = new InlineLexer(links, options);
    return inline.output(src);
  };
  InlineLexer.prototype.output = function(src) {
    var out = "", link, text, href, cap;
    while (src) {
      if (cap = this.rules.escape.exec(src)) {
        src = src.substring(cap[0].length);
        out += cap[1];
        continue;
      }
      if (cap = this.rules.autolink.exec(src)) {
        src = src.substring(cap[0].length);
        if (cap[2] === "@") {
          text = cap[1].charAt(6) === ":" ? this.mangle(cap[1].substring(7)) : this.mangle(cap[1]);
          href = this.mangle("mailto:") + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        out += this.renderer.link(href, null, text);
        continue;
      }
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        src = src.substring(cap[0].length);
        text = escape(cap[1]);
        href = text;
        out += this.renderer.link(href, null, text);
        continue;
      }
      if (cap = this.rules.tag.exec(src)) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }
        src = src.substring(cap[0].length);
        out += this.options.sanitize ? escape(cap[0]) : cap[0];
        continue;
      }
      if (cap = this.rules.link.exec(src)) {
        src = src.substring(cap[0].length);
        this.inLink = true;
        out += this.outputLink(cap, {
          href: cap[2],
          title: cap[3]
        });
        this.inLink = false;
        continue;
      }
      if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, " ");
        link = this.links[link.toLowerCase()];
        if (!link || !link.href) {
          out += cap[0].charAt(0);
          src = cap[0].substring(1) + src;
          continue;
        }
        this.inLink = true;
        out += this.outputLink(cap, link);
        this.inLink = false;
        continue;
      }
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.strong(this.output(cap[2] || cap[1]));
        continue;
      }
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.em(this.output(cap[2] || cap[1]));
        continue;
      }
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.codespan(escape(cap[2], true));
        continue;
      }
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.br();
        continue;
      }
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out += this.renderer.del(this.output(cap[1]));
        continue;
      }
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        out += escape(this.smartypants(cap[0]));
        continue;
      }
      if (src) {
        throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
      }
    }
    return out;
  };
  InlineLexer.prototype.outputLink = function(cap, link) {
    var href = escape(link.href), title = link.title ? escape(link.title) : null;
    return cap[0].charAt(0) !== "!" ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
  };
  InlineLexer.prototype.smartypants = function(text) {
    if (!this.options.smartypants) return text;
    return text.replace(/--/g, "—").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
  };
  InlineLexer.prototype.mangle = function(text) {
    var out = "", l = text.length, i = 0, ch;
    for (;i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > .5) {
        ch = "x" + ch.toString(16);
      }
      out += "&#" + ch + ";";
    }
    return out;
  };
  function Renderer(options) {
    this.options = options || {};
  }
  Renderer.prototype.code = function(code, lang, escaped) {
    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "\n</code></pre>";
    }
    return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + "\n</code></pre>\n";
  };
  Renderer.prototype.blockquote = function(quote) {
    return "<blockquote>\n" + quote + "</blockquote>\n";
  };
  Renderer.prototype.html = function(html) {
    return html;
  };
  Renderer.prototype.heading = function(text, level, raw) {
    return "<h" + level + ' id="' + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, "-") + '">' + text + "</h" + level + ">\n";
  };
  Renderer.prototype.hr = function() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  };
  Renderer.prototype.list = function(body, ordered) {
    var type = ordered ? "ol" : "ul";
    return "<" + type + ">\n" + body + "</" + type + ">\n";
  };
  Renderer.prototype.listitem = function(text) {
    return "<li>" + text + "</li>\n";
  };
  Renderer.prototype.paragraph = function(text) {
    return "<p>" + text + "</p>\n";
  };
  Renderer.prototype.table = function(header, body) {
    return "<table>\n" + "<thead>\n" + header + "</thead>\n" + "<tbody>\n" + body + "</tbody>\n" + "</table>\n";
  };
  Renderer.prototype.tablerow = function(content) {
    return "<tr>\n" + content + "</tr>\n";
  };
  Renderer.prototype.tablecell = function(content, flags) {
    var type = flags.header ? "th" : "td";
    var tag = flags.align ? "<" + type + ' style="text-align:' + flags.align + '">' : "<" + type + ">";
    return tag + content + "</" + type + ">\n";
  };
  Renderer.prototype.strong = function(text) {
    return "<strong>" + text + "</strong>";
  };
  Renderer.prototype.em = function(text) {
    return "<em>" + text + "</em>";
  };
  Renderer.prototype.codespan = function(text) {
    return "<code>" + text + "</code>";
  };
  Renderer.prototype.br = function() {
    return this.options.xhtml ? "<br/>" : "<br>";
  };
  Renderer.prototype.del = function(text) {
    return "<del>" + text + "</del>";
  };
  Renderer.prototype.link = function(href, title, text) {
    if (this.options.sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, "").toLowerCase();
      } catch (e) {
        return "";
      }
      if (prot.indexOf("javascript:") === 0) {
        return "";
      }
    }
    var out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  };
  Renderer.prototype.image = function(href, title, text) {
    var out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  };
  function Parser(options) {
    this.tokens = [];
    this.token = null;
    this.options = options || marked.defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
  }
  Parser.parse = function(src, options, renderer) {
    var parser = new Parser(options, renderer);
    return parser.parse(src);
  };
  Parser.prototype.parse = function(src) {
    this.inline = new InlineLexer(src.links, this.options, this.renderer);
    this.tokens = src.reverse();
    var out = "";
    while (this.next()) {
      out += this.tok();
    }
    return out;
  };
  Parser.prototype.next = function() {
    return this.token = this.tokens.pop();
  };
  Parser.prototype.peek = function() {
    return this.tokens[this.tokens.length - 1] || 0;
  };
  Parser.prototype.parseText = function() {
    var body = this.token.text;
    while (this.peek().type === "text") {
      body += "\n" + this.next().text;
    }
    return this.inline.output(body);
  };
  Parser.prototype.tok = function() {
    switch (this.token.type) {
     case "space":
      {
        return "";
      }

     case "hr":
      {
        return this.renderer.hr();
      }

     case "heading":
      {
        return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
      }

     case "code":
      {
        return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
      }

     case "table":
      {
        var header = "", body = "", i, row, cell, flags, j;
        cell = "";
        for (i = 0; i < this.token.header.length; i++) {
          flags = {
            header: true,
            align: this.token.align[i]
          };
          cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), {
            header: true,
            align: this.token.align[i]
          });
        }
        header += this.renderer.tablerow(cell);
        for (i = 0; i < this.token.cells.length; i++) {
          row = this.token.cells[i];
          cell = "";
          for (j = 0; j < row.length; j++) {
            cell += this.renderer.tablecell(this.inline.output(row[j]), {
              header: false,
              align: this.token.align[j]
            });
          }
          body += this.renderer.tablerow(cell);
        }
        return this.renderer.table(header, body);
      }

     case "blockquote_start":
      {
        var body = "";
        while (this.next().type !== "blockquote_end") {
          body += this.tok();
        }
        return this.renderer.blockquote(body);
      }

     case "list_start":
      {
        var body = "", ordered = this.token.ordered;
        while (this.next().type !== "list_end") {
          body += this.tok();
        }
        return this.renderer.list(body, ordered);
      }

     case "list_item_start":
      {
        var body = "";
        while (this.next().type !== "list_item_end") {
          body += this.token.type === "text" ? this.parseText() : this.tok();
        }
        return this.renderer.listitem(body);
      }

     case "loose_item_start":
      {
        var body = "";
        while (this.next().type !== "list_item_end") {
          body += this.tok();
        }
        return this.renderer.listitem(body);
      }

     case "html":
      {
        var html = !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;
        return this.renderer.html(html);
      }

     case "paragraph":
      {
        return this.renderer.paragraph(this.inline.output(this.token.text));
      }

     case "text":
      {
        return this.renderer.paragraph(this.parseText());
      }
    }
  };
  function escape(html, encode) {
    return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function unescape(html) {
    return html.replace(/&([#\w]+);/g, function(_, n) {
      n = n.toLowerCase();
      if (n === "colon") return ":";
      if (n.charAt(0) === "#") {
        return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }
      return "";
    });
  }
  function replace(regex, opt) {
    regex = regex.source;
    opt = opt || "";
    return function self(name, val) {
      if (!name) return new RegExp(regex, opt);
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, "$1");
      regex = regex.replace(name, val);
      return self;
    };
  }
  function noop() {}
  noop.exec = noop;
  function merge(obj) {
    var i = 1, target, key;
    for (;i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }
    return obj;
  }
  function marked(src, opt, callback) {
    if (callback || typeof opt === "function") {
      if (!callback) {
        callback = opt;
        opt = null;
      }
      opt = merge({}, marked.defaults, opt || {});
      var highlight = opt.highlight, tokens, pending, i = 0;
      try {
        tokens = Lexer.lex(src, opt);
      } catch (e) {
        return callback(e);
      }
      pending = tokens.length;
      var done = function(err) {
        if (err) {
          opt.highlight = highlight;
          return callback(err);
        }
        var out;
        try {
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!pending) return done();
      for (;i < tokens.length; i++) {
        (function(token) {
          if (token.type !== "code") {
            return --pending || done();
          }
          return highlight(token.text, token.lang, function(err, code) {
            if (err) return done(err);
            if (code == null || code === token.text) {
              return --pending || done();
            }
            token.text = code;
            token.escaped = true;
            --pending || done();
          });
        })(tokens[i]);
      }
      return;
    }
    try {
      if (opt) opt = merge({}, marked.defaults, opt);
      return Parser.parse(Lexer.lex(src, opt), opt);
    } catch (e) {
      e.message += "\nPlease report this to https://github.com/chjj/marked.";
      if ((opt || marked.defaults).silent) {
        return "<p>An error occured:</p><pre>" + escape(e.message + "", true) + "</pre>";
      }
      throw e;
    }
  }
  marked.options = marked.setOptions = function(opt) {
    merge(marked.defaults, opt);
    return marked;
  };
  marked.defaults = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: false,
    silent: false,
    highlight: null,
    langPrefix: "lang-",
    smartypants: false,
    headerPrefix: "",
    renderer: new Renderer(),
    xhtml: false
  };
  marked.Parser = Parser;
  marked.parser = Parser.parse;
  marked.Renderer = Renderer;
  marked.Lexer = Lexer;
  marked.lexer = Lexer.lex;
  marked.InlineLexer = InlineLexer;
  marked.inlineLexer = InlineLexer.output;
  marked.parse = marked;
  if (typeof module !== "undefined" && typeof exports === "object") {
    module.exports = marked;
  } else if (typeof define === "function" && define.amd) {
    define(function() {
      return marked;
    });
  } else {
    this.marked = marked;
  }
}).call(function() {
  return this || (typeof window !== "undefined" ? window : global);
}());

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
        var ndate = apidate.getFullYear() + "년" + (apidate.getMonth() + 1) + "월" + apidate.getDate() + "일";
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
          return entry.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1];
        } catch (e) {
          return "";
        }
      }(entry),
      featuredImageUrl: function(entry) {
        for (var i in entry.content.match(/(<img.*?>)/gi)) {
          if (entry.content.match(/(<img.*?>)/gi)[i].indexOf("featured") > 0) {
            try {
              return entry.content.match(/(<img.*?>)/gi)[i].match(/src="(.*?)"/)[1];
            } catch (e) {
              return "";
            }
          } else {
            try {
              return entry.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1];
            } catch (e) {
              return "";
            }
          }
        }
      }(entry),
      featuredImageAlt: function(entry) {
        for (var i in entry.content.match(/(<img.*?>)/gi)) {
          if (entry.content.match(/(<img.*?>)/gi)[i].indexOf("featured") > 0) {
            try {
              return entry.content.match(/(<img.*?>)/gi)[i].match(/alt="(.*?)"/)[1];
            } catch (e) {
              return "";
            }
          } else {
            try {
              return entry.content.match(/(<img.*?>)/gi)[0].match(/alt="(.*?)"/)[1];
            } catch (e) {
              return "";
            }
          }
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
      console.warn('When you difine "store: true", store script is required (https://github.com/ramonvictor/rv-jquery-fontsize/blob/master/js/store.min.js)');
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
      var containerId = "is-font-available-container";
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
      console.log(defaultFf);
      if (_self.options.userFontFamily) {
        if (_self.options.store === true && _self.options.storeIsDefined && store.enabled && _self.detectFontFamily(defaultFf)) {
          var getFf = store.get("Ff") || defaultFf;
          $("#js-user-font").css("font-family", getFf);
          console.log(getFf);
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
            $("#js-user-font").css("font-family", currentFf);
          } else {
            console.log(currentFf + "is not installed");
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
      console.log(currentfontsize);
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

$(function() {
  $("a[href=#]").click(function(e) {
    e.preventDefault();
  });
  $(".drawer").drawer();
  $(".drawer-dropdown-hover").hover(function() {
    $('[data-toggle="dropdown"]', this).trigger("click");
  });
  $(".widget-feed").rss(markqueryRSS, {
    limit: 5,
    effect: "slideFast",
    layoutTemplate: '<ul class="media-list">{entries}</ul>',
    entryTemplate: '<li class="media"><a class="pull-left" href="{url}"><img class="media-object media-thumbnail" src="{featuredImageUrl}" alt="{featuredImageAlt}"></a><div class="media-body"><h4><a href="{url}">{title}</a></h4><small>{kdate}</small></div></li>'
  });
  $(".tab-access").focus(function() {
    var e = $(this);
    if (e.offset().top - $(window).scrollTop() < 51) {
      $("html, body").animate({
        scrollTop: element.offset().top - 51
      }, 500);
    }
  });
  $("#js-user-font").userFont({
    store: true,
    userFontFamily: true,
    startFontFamily: "malgun gothic"
  });
  var getMarkdown = document.getElementById("marked");
  if (getMarkdown) {
    var setMarkdown = getMarkdown.innerText ? getMarkdown.innerText : getMarkdown.textContent;
    $(".entry-markdown").html(marked(setMarkdown));
  }
  var splitURL = window.location.host + window.location.pathname;
  var pathArray = splitURL.split("/");
  if (pathArray[1] == "") {
    $(".cover").addClass("cover-init");
  }
});

function printButton() {
  window.print();
}

function searchURL() {
  window.location.href = "/search/" + looseURIEncode(document.getElementsByName("q")[0].value) + "?cx=" + customSearchAPI + "&cof=FORID%3A11&q=" + looseURIEncode(document.getElementsByName("q")[0].value);
}

