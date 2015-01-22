/*!
 * spidersweb version 4.0.0
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
      imageAlt: "featured",
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
            } else {
              return "";
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

self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};

var Prism = function() {
  var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, t = self.Prism = {
    util: {
      encode: function(e) {
        return e instanceof n ? new n(e.type, t.util.encode(e.content), e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      },
      type: function(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      },
      clone: function(e) {
        var n = t.util.type(e);
        switch (n) {
         case "Object":
          var a = {};
          for (var r in e) e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
          return a;

         case "Array":
          return e.map(function(e) {
            return t.util.clone(e);
          });
        }
        return e;
      }
    },
    languages: {
      extend: function(e, n) {
        var a = t.util.clone(t.languages[e]);
        for (var r in n) a[r] = n[r];
        return a;
      },
      insertBefore: function(e, n, a, r) {
        r = r || t.languages;
        var i = r[e];
        if (2 == arguments.length) {
          a = arguments[1];
          for (var l in a) a.hasOwnProperty(l) && (i[l] = a[l]);
          return i;
        }
        var o = {};
        for (var s in i) if (i.hasOwnProperty(s)) {
          if (s == n) for (var l in a) a.hasOwnProperty(l) && (o[l] = a[l]);
          o[s] = i[s];
        }
        return t.languages.DFS(t.languages, function(t, n) {
          n === r[e] && t != e && (this[t] = o);
        }), r[e] = o;
      },
      DFS: function(e, n, a) {
        for (var r in e) e.hasOwnProperty(r) && (n.call(e, r, e[r], a || r), "Object" === t.util.type(e[r]) ? t.languages.DFS(e[r], n) : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r));
      }
    },
    highlightAll: function(e, n) {
      for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++]; ) t.highlightElement(a, e === !0, n);
    },
    highlightElement: function(a, r, i) {
      for (var l, o, s = a; s && !e.test(s.className); ) s = s.parentNode;
      if (s && (l = (s.className.match(e) || [ , "" ])[1], o = t.languages[l]), o) {
        a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, 
        s = a.parentNode, /pre/i.test(s.nodeName) && (s.className = s.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);
        var g = a.textContent;
        if (g) {
          g = g.replace(/^(?:\r?\n|\r)/, "");
          var u = {
            element: a,
            language: l,
            grammar: o,
            code: g
          };
          if (t.hooks.run("before-highlight", u), r && self.Worker) {
            var c = new Worker(t.filename);
            c.onmessage = function(e) {
              u.highlightedCode = n.stringify(JSON.parse(e.data), l), t.hooks.run("before-insert", u), 
              u.element.innerHTML = u.highlightedCode, i && i.call(u.element), t.hooks.run("after-highlight", u);
            }, c.postMessage(JSON.stringify({
              language: u.language,
              code: u.code
            }));
          } else u.highlightedCode = t.highlight(u.code, u.grammar, u.language), t.hooks.run("before-insert", u), 
          u.element.innerHTML = u.highlightedCode, i && i.call(a), t.hooks.run("after-highlight", u);
        }
      }
    },
    highlight: function(e, a, r) {
      var i = t.tokenize(e, a);
      return n.stringify(t.util.encode(i), r);
    },
    tokenize: function(e, n) {
      var a = t.Token, r = [ e ], i = n.rest;
      if (i) {
        for (var l in i) n[l] = i[l];
        delete n.rest;
      }
      e: for (var l in n) if (n.hasOwnProperty(l) && n[l]) {
        var o = n[l];
        o = "Array" === t.util.type(o) ? o : [ o ];
        for (var s = 0; s < o.length; ++s) {
          var g = o[s], u = g.inside, c = !!g.lookbehind, f = 0, h = g.alias;
          g = g.pattern || g;
          for (var p = 0; p < r.length; p++) {
            var d = r[p];
            if (r.length > e.length) break e;
            if (!(d instanceof a)) {
              g.lastIndex = 0;
              var m = g.exec(d);
              if (m) {
                c && (f = m[1].length);
                var y = m.index - 1 + f, m = m[0].slice(f), v = m.length, k = y + v, b = d.slice(0, y + 1), w = d.slice(k + 1), O = [ p, 1 ];
                b && O.push(b);
                var N = new a(l, u ? t.tokenize(m, u) : m, h);
                O.push(N), w && O.push(w), Array.prototype.splice.apply(r, O);
              }
            }
          }
        }
      }
      return r;
    },
    hooks: {
      all: {},
      add: function(e, n) {
        var a = t.hooks.all;
        a[e] = a[e] || [], a[e].push(n);
      },
      run: function(e, n) {
        var a = t.hooks.all[e];
        if (a && a.length) for (var r, i = 0; r = a[i++]; ) r(n);
      }
    }
  }, n = t.Token = function(e, t, n) {
    this.type = e, this.content = t, this.alias = n;
  };
  if (n.stringify = function(e, a, r) {
    if ("string" == typeof e) return e;
    if ("[object Array]" == Object.prototype.toString.call(e)) return e.map(function(t) {
      return n.stringify(t, a, e);
    }).join("");
    var i = {
      type: e.type,
      content: n.stringify(e.content, a, r),
      tag: "span",
      classes: [ "token", e.type ],
      attributes: {},
      language: a,
      parent: r
    };
    if ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
      var l = "Array" === t.util.type(e.alias) ? e.alias : [ e.alias ];
      Array.prototype.push.apply(i.classes, l);
    }
    t.hooks.run("wrap", i);
    var o = "";
    for (var s in i.attributes) o += s + '="' + (i.attributes[s] || "") + '"';
    return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + o + ">" + i.content + "</" + i.tag + ">";
  }, !self.document) return self.addEventListener ? (self.addEventListener("message", function(e) {
    var n = JSON.parse(e.data), a = n.language, r = n.code;
    self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r, t.languages[a])))), 
    self.close();
  }, !1), self.Prism) : self.Prism;
  var a = document.getElementsByTagName("script");
  return a = a[a.length - 1], a && (t.filename = a.src, document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), 
  self.Prism;
}();

"undefined" != typeof module && module.exports && (module.exports = Prism);

Prism.languages.markup = {
  comment: /<!--[\w\W]*?-->/g,
  prolog: /<\?.+?\?>/,
  doctype: /<!DOCTYPE.+?>/,
  cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
  tag: {
    pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
    inside: {
      tag: {
        pattern: /^<\/?[\w:-]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[\w-]+?:/
        }
      },
      "attr-value": {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          punctuation: /=|>|"/g
        }
      },
      punctuation: /\/?>/g,
      "attr-name": {
        pattern: /[\w:-]+/g,
        inside: {
          namespace: /^[\w-]+?:/
        }
      }
    }
  },
  entity: /&#?[\da-z]{1,8};/gi
}, Prism.hooks.add("wrap", function(t) {
  "entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"));
});

Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//g,
  atrule: {
    pattern: /@[\w-]+?.*?(;|(?=\s*\{))/gi,
    inside: {
      punctuation: /[;:]/g
    }
  },
  url: /url\((["']?).*?\1\)/gi,
  selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  property: /(\b|\B)[\w-]+(?=\s*:)/gi,
  string: /("|')(\\\n|\\?.)*?\1/g,
  important: /\B!important\b/gi,
  punctuation: /[\{\};:]/g,
  "function": /[-a-z0-9]+(?=\()/gi
}, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
  style: {
    pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
    inside: {
      tag: {
        pattern: /<style[\w\W]*?>|<\/style>/gi,
        inside: Prism.languages.markup.tag.inside
      },
      rest: Prism.languages.css
    },
    alias: "language-css"
  }
}), Prism.languages.insertBefore("inside", "attr-value", {
  "style-attr": {
    pattern: /\s*style=("|').+?\1/gi,
    inside: {
      "attr-name": {
        pattern: /^\s*style/gi,
        inside: Prism.languages.markup.tag.inside
      },
      punctuation: /^\s*=\s*['"]|['"]\s*$/,
      "attr-value": {
        pattern: /.+/gi,
        inside: Prism.languages.css
      }
    },
    alias: "language-css"
  }
}, Prism.languages.markup.tag));

Prism.languages.clike = {
  comment: [ {
    pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
    lookbehind: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
    lookbehind: !0
  } ],
  string: /("|')(\\\n|\\?.)*?\1/g,
  "class-name": {
    pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
    lookbehind: !0,
    inside: {
      punctuation: /(\.|\\)/
    }
  },
  keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
  "boolean": /\b(true|false)\b/g,
  "function": {
    pattern: /[a-z0-9_]+\(/gi,
    inside: {
      punctuation: /\(/
    }
  },
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/g,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[{}[\];(),.:]/g
};

Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g,
  "function": /(?!\d)[a-z0-9_$]+(?=\()/gi
}), Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: !0
  }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  script: {
    pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
    inside: {
      tag: {
        pattern: /<script[\w\W]*?>|<\/script>/gi,
        inside: Prism.languages.markup.tag.inside
      },
      rest: Prism.languages.javascript
    },
    alias: "language-javascript"
  }
});

Prism.languages.php = Prism.languages.extend("clike", {
  keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,
  constant: /\b[A-Z0-9_]{2,}\b/g,
  comment: {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,
    lookbehind: !0
  }
}), Prism.languages.insertBefore("php", "keyword", {
  delimiter: /(\?>|<\?php|<\?)/gi,
  variable: /(\$\w+)\b/gi,
  "package": {
    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,
    lookbehind: !0,
    inside: {
      punctuation: /\\/
    }
  }
}), Prism.languages.insertBefore("php", "operator", {
  property: {
    pattern: /(->)[\w]+/g,
    lookbehind: !0
  }
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(e) {
  "php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(n) {
    return e.tokenStack.push(n), "{{{PHP" + e.tokenStack.length + "}}}";
  }));
}), Prism.hooks.add("before-insert", function(e) {
  "php" === e.language && (e.code = e.backupCode, delete e.backupCode);
}), Prism.hooks.add("after-highlight", function(e) {
  if ("php" === e.language) {
    for (var n, a = 0; n = e.tokenStack[a]; a++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (a + 1) + "}}}", Prism.highlight(n, e.grammar, "php"));
    e.element.innerHTML = e.highlightedCode;
  }
}), Prism.hooks.add("wrap", function(e) {
  "php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore("php", "comment", {
  markup: {
    pattern: /<[^?]\/?(.*?)>/g,
    inside: Prism.languages.markup
  },
  php: /\{\{\{PHP[0-9]+\}\}\}/g
}));

Prism.languages.insertBefore("php", "variable", {
  "this": /\$this/g,
  global: /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g,
  scope: {
    pattern: /\b[\w\\]+::/g,
    inside: {
      keyword: /(static|self|parent)/,
      punctuation: /(::|\\)/
    }
  }
});

Prism.languages.scss = Prism.languages.extend("css", {
  comment: {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
    lookbehind: !0
  },
  atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi,
  url: /([-a-z]+-)*url(?=\()/gi,
  selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
}), Prism.languages.insertBefore("scss", "atrule", {
  keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i
}), Prism.languages.insertBefore("scss", "property", {
  variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
}), Prism.languages.insertBefore("scss", "function", {
  placeholder: /%[-_\w]+/i,
  statement: /\B!(default|optional)\b/gi,
  "boolean": /\b(true|false)\b/g,
  "null": /\b(null)\b/g,
  operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|%)\s+/g
});

Prism.languages.bash = Prism.languages.extend("clike", {
  comment: {
    pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
    lookbehind: !0
  },
  string: {
    pattern: /("|')(\\?[\s\S])*?\1/g,
    inside: {
      property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
    }
  },
  keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
}), Prism.languages.insertBefore("bash", "keyword", {
  property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
}), Prism.languages.insertBefore("bash", "comment", {
  important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
});

Prism.languages.c = Prism.languages.extend("clike", {
  string: /("|')([^\n\\\1]|\\.|\\\r*\n)*?\1/g,
  keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,
  operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\//g
}), Prism.languages.insertBefore("c", "string", {
  property: {
    pattern: /((^|\n)\s*)#\s*[a-z]+([^\n\\]|\\.|\\\r*\n)*/gi,
    lookbehind: !0,
    inside: {
      string: {
        pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/g,
        lookbehind: !0
      }
    }
  }
}), delete Prism.languages.c["class-name"], delete Prism.languages.c["boolean"];

Prism.languages.cpp = Prism.languages.extend("c", {
  keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,
  "boolean": /\b(true|false)\b/g,
  operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g
}), Prism.languages.insertBefore("cpp", "keyword", {
  "class-name": {
    pattern: /(class\s+)[a-z0-9_]+/gi,
    lookbehind: !0
  }
});

Prism.languages.python = {
  comment: {
    pattern: /(^|[^\\])#.*?(\r?\n|$)/g,
    lookbehind: !0
  },
  string: /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/g,
  keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
  "boolean": /\b(True|False)\b/g,
  number: /\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/gi,
  operator: /[-+]|<=?|>=?|!|={1,2}|&{1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
  punctuation: /[{}[\];(),.:]/g
};

Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g,
    lookbehind: !0
  },
  string: {
    pattern: /(^|[^@])("|')(\\?[\s\S])*?\2/g,
    lookbehind: !0
  },
  variable: /@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/g,
  "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/gi,
  keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,
  "boolean": /\b(?:TRUE|FALSE|NULL)\b/gi,
  number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
  operator: /\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//gi,
  punctuation: /[;[\]()`,.]/g
};

Prism.languages.ruby = Prism.languages.extend("clike", {
  comment: /#[^\r\n]*(\r?\n|$)/g,
  keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
  builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
  constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
}), Prism.languages.insertBefore("ruby", "keyword", {
  regex: {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: !0
  },
  variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
  symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
});

Prism.languages.go = Prism.languages.extend("clike", {
  keyword: /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g,
  builtin: /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/g,
  "boolean": /\b(_|iota|nil|true|false)\b/g,
  operator: /([(){}\[\]]|[*\/%^!]=?|\+[=+]?|-[>=-]?|\|[=|]?|>[=>]?|<(<|[=-])?|==?|&(&|=|^=?)?|\.(\.\.)?|[,;]|:=?)/g,
  number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/gi,
  string: /("|'|`)(\\?.|\r|\n)*?\1/g
}), delete Prism.languages.go["class-name"];

Prism.languages.objectivec = Prism.languages.extend("c", {
  keyword: /(\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b)|((?=[\w|@])(@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b)/g,
  string: /(?:("|')([^\n\\\1]|\\.|\\\r*\n)*?\1)|(@"([^\n\\"]|\\.|\\\r*\n)*?")/g,
  operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|@/g
});

Prism.languages.git = {
  comment: /^#.*$/m,
  string: /("|')(\\?.)*?\1/gm,
  command: {
    pattern: /^.*\$ git .*$/m,
    inside: {
      parameter: /\s(--|-)\w+/m
    }
  },
  coord: /^@@.*@@$/m,
  deleted: /^-(?!-).+$/m,
  inserted: /^\+(?!\+).+$/m,
  commit_sha1: /^commit \w{40}$/m
};

Prism.languages.perl = {
  comment: [ {
    pattern: /((?:^|\n)\s*)=\w+[\s\S]*?=cut.*/g,
    lookbehind: !0
  }, {
    pattern: /(^|[^\\$])#.*?(\r?\n|$)/g,
    lookbehind: !0
  } ],
  string: [ /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1/g, /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(\\?.)*?\s*\1/g, /\b(?:q|qq|qx|qw)\s*\(([^()]|\\.)*\s*\)/g, /\b(?:q|qq|qx|qw)\s*\{([^{}]|\\.)*\s*\}/g, /\b(?:q|qq|qx|qw)\s*\[([^[\]]|\\.)*\s*\]/g, /\b(?:q|qq|qx|qw)\s*<([^<>]|\\.)*\s*>/g, /("|'|`)(\\?.)*?\1/g ],
  regex: [ /\b(?:m|qr)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1[msixpodualgc]*/g, /\b(?:m|qr)\s+([a-zA-Z0-9])(\\?.)*?\s*\1[msixpodualgc]*/g, /\b(?:m|qr)\s*\(([^()]|\\.)*\s*\)[msixpodualgc]*/g, /\b(?:m|qr)\s*\{([^{}]|\\.)*\s*\}[msixpodualgc]*/g, /\b(?:m|qr)\s*\[([^[\]]|\\.)*\s*\][msixpodualgc]*/g, /\b(?:m|qr)\s*<([^<>]|\\.)*\s*>[msixpodualgc]*/g, /\b(?:s|tr|y)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1\s*((?!\1).|\\.)*\s*\1[msixpodualgcer]*/g, /\b(?:s|tr|y)\s+([a-zA-Z0-9])(\\?.)*?\s*\1\s*((?!\1).|\\.)*\s*\1[msixpodualgcer]*/g, /\b(?:s|tr|y)\s*\(([^()]|\\.)*\s*\)\s*\(\s*([^()]|\\.)*\s*\)[msixpodualgcer]*/g, /\b(?:s|tr|y)\s*\{([^{}]|\\.)*\s*\}\s*\{\s*([^{}]|\\.)*\s*\}[msixpodualgcer]*/g, /\b(?:s|tr|y)\s*\[([^[\]]|\\.)*\s*\]\s*\[\s*([^[\]]|\\.)*\s*\][msixpodualgcer]*/g, /\b(?:s|tr|y)\s*<([^<>]|\\.)*\s*>\s*<\s*([^<>]|\\.)*\s*>[msixpodualgcer]*/g, /\/(\[.+?]|\\.|[^\/\r\n])*\/[msixpodualgc]*(?=\s*($|[\r\n,.;})&|\-+*=~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/g ],
  variable: [ /[&*\$@%]\{\^[A-Z]+\}/g, /[&*\$@%]\^[A-Z_]/g, /[&*\$@%]#?(?=\{)/, /[&*\$@%]#?((::)*'?(?!\d)[\w$]+)+(::)*/gi, /[&*\$@%]\d+/g, /[\$@%][!"#\$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/g ],
  filehandle: {
    pattern: /<(?!=).*>|\b_\b/g,
    alias: "symbol"
  },
  vstring: {
    pattern: /v\d+(\.\d+)*|\d+(\.\d+){2,}/g,
    alias: "string"
  },
  "function": {
    pattern: /sub [a-z0-9_]+/gi,
    inside: {
      keyword: /sub/
    }
  },
  keyword: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/g,
  number: /(\n|\b)-?(0x[\dA-Fa-f](_?[\dA-Fa-f])*|0b[01](_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee]-?\d+)?)\b/g,
  operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|[-+*=~\/|&]{1,2}|<=?|>=?|\.{1,3}|[!?\\^]|\b(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b/g,
  punctuation: /[{}[\];(),:]/g
};

Prism.languages.less = Prism.languages.extend("css", {
  comment: [ /\/\*[\w\W]*?\*\//g, {
    pattern: /(^|[^\\])\/\/.+/g,
    lookbehind: !0
  } ],
  atrule: {
    pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/gi,
    inside: {
      punctuation: /[:()]/g
    }
  },
  selector: {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/g,
    inside: {
      variable: /@+[\w-]+/
    }
  },
  property: /(\b|\B)(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/gi,
  punctuation: /[{}();:,]/g,
  operator: /[+\-*\/]/
}), Prism.languages.insertBefore("less", "punctuation", {
  "function": Prism.languages.less.function
}), Prism.languages.insertBefore("less", "property", {
  variable: [ {
    pattern: /@[\w-]+\s*:/,
    inside: {
      punctuation: /:/
    }
  }, /@@?[\w-]+/ ],
  "mixin-usage": {
    pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
    lookbehind: !0,
    alias: "function"
  }
});

Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", {
  blockquote: {
    pattern: /(^|\n)>(?:[\t ]*>)*/,
    lookbehind: !0,
    alias: "punctuation"
  },
  code: [ {
    pattern: /(^|\n)(?: {4}|\t).+/,
    lookbehind: !0,
    alias: "keyword"
  }, {
    pattern: /``.+?``|`[^`\n]+`/,
    alias: "keyword"
  } ],
  title: [ {
    pattern: /\w+.*\n(?:==+|--+)/,
    alias: "important",
    inside: {
      punctuation: /==+$|--+$/
    }
  }, {
    pattern: /((?:^|\n)\s*)#+.+/,
    lookbehind: !0,
    alias: "important",
    inside: {
      punctuation: /^#+|#+$/
    }
  } ],
  hr: {
    pattern: /((?:^|\n)\s*)([*-])([\t ]*\2){2,}(?=\s*(?:\n|$))/,
    lookbehind: !0,
    alias: "punctuation"
  },
  list: {
    pattern: /((?:^|\n)\s*)(?:[*+-]|\d+\.)(?=[\t ].)/,
    lookbehind: !0,
    alias: "punctuation"
  },
  "url-reference": {
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:[^>]|\\>)+>)(?:[\t ]+(?:"(?:[^"]|\\")*"|'(?:[^']|\\')*'|\((?:[^)]|\\\))*\)))?/,
    inside: {
      variable: {
        pattern: /^(!?\[)[^\]]+/,
        lookbehind: !0
      },
      string: /(?:"(?:[^"]|\\")*"|'(?:[^']|\\')*'|\((?:[^)]|\\\))*\))$/,
      punctuation: /[[\]\(\)<>:]/
    },
    alias: "url"
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:\n(?!\n)|.)+?\2/,
    lookbehind: !0,
    inside: {
      punctuation: /^\*\*|^__|\*\*\s*$|__\s*$/
    }
  },
  italic: {
    pattern: /(^|[^\\])(?:\*(?:\n(?!\n)|.)+?\*|_(?:\n(?!\n)|.)+?_)/,
    lookbehind: !0,
    inside: {
      punctuation: /^[*_]|[*_]$/
    }
  },
  url: {
    pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:[^"]|\\")*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: {
        pattern: /(!?\[)[^\]]+(?=\]$)/,
        lookbehind: !0
      },
      string: {
        pattern: /"(?:[^"]|\\")*"(?=\)$)/
      }
    }
  }
}), Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url), 
Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url), 
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic), 
Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);

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

(function(window, $) {
  var markquery = {
    initialize: function() {
      $("a[href=#]").click(function(e) {
        e.preventDefault();
      });
      $(".animsition").animsition();
      $(".drawer").drawer();
      $(".drawer-dropdown-hover").hover(function() {
        $('[data-toggle="dropdown"]', this).trigger("click");
      });
      $("#js-user-font").userFont({
        store: true,
        userFontFamily: true,
        startFontFamily: "malgun gothic"
      });
      $(".tab-access").focus(function() {
        var e = $(this);
        if (e.offset().top - $(window).scrollTop() < 51) {
          $("html, body").animate({
            scrollTop: e.offset().top - 51
          }, 500);
        }
      });
    }
  };
  $(document).ready(function() {
    markquery.initialize();
  });
  window.markquery = window.markquery || {};
  window.markquery = markquery;
})(window, window.jQuery);