! function e(t, n, o) {
  function a(i, s) {
    if (!n[i]) {
      if (!t[i]) {
        var l = "function" == typeof require && require;
        if (!s && l) return l(i, !0);
        if (r) return r(i, !0);
        var d = new Error("Cannot find module '" + i + "'");
        throw d.code = "MODULE_NOT_FOUND", d
      }
      var c = n[i] = {
        exports: {}
      };
      t[i][0].call(c.exports, function(e) {
        var n = t[i][1][e];
        return a(n || e)
      }, c, c.exports, e, t, n, o)
    }
    return n[i].exports
  }
  for (var r = "function" == typeof require && require, i = 0; i < o.length; i++) a(o[i]);
  return a
}({
  1: [function(e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = e("./common/modules");
    (function() {
      function e() {
        document.getElementById("checkout-css") || (document.getElementsByTagName("head")[0].innerHTML += '<style id="checkout-css">.im-modal{overflow-y:auto}.im-modal iframe{height:100%;width:100%}@-webkit-keyframes pace-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes pace-spinner{0%{-moz-transform:rotate(0deg);transform:rotate(0deg)}100%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes pace-spinner{0%{-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-o-transform:rotate(360deg);transform:rotate(360deg)}}@-ms-keyframes pace-spinner{0%{-ms-transform:rotate(0deg);transform:rotate(0deg)}100%{-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes pace-spinner{0%{transform:rotate(0deg);transform:rotate(0deg)}100%{transform:rotate(360deg);transform:rotate(360deg)}}.iframe-container{height:100%}.iframe-container .iframe-loader-wrapper{display:none}.iframe-container .iframe{transition:all 0.2s;visibility:visible;opacity:1;height:100%;position:relative;background:none;display:block;border:0px none transparent;margin:0px;padding:0px}.iframe-container.loader .iframe-loader-wrapper{display:block;position:relative;height:100%}.iframe-container.loader .iframe-loader-wrapper .iframe-loader{display:block;position:fixed;top:50%;left:50%;margin-left:-20px;margin-top:-20px;width:40px;height:40px;border:solid 2px transparent;border-top-color:#46DF89;border-left-color:#46DF89;border-radius:40px;-webkit-animation:pace-spinner 800ms linear infinite;-moz-animation:pace-spinner 800ms linear infinite;-ms-animation:pace-spinner 800ms linear infinite;-o-animation:pace-spinner 800ms linear infinite;animation:pace-spinner 800ms linear infinite}.iframe-container.loader .iframe{visibility:hidden;opacity:0}.im-background-overlay{min-height:100%;transition:0.3s ease-out;position:fixed;top:0px;left:0px;width:100%;height:100%;background:rgba(0,0,0,0.85098)}.im-checkout{max-width:300px;margin-bottom:20px}iframe{border:none !important}</style>')
      }
      var t = o.defaultModalOptions;
      window.Instamojo = window.Instamojo || {}, window.Instamojo.open = function(n) {
        return o.loadPaymentModal(n, e, t)
      }, window.Instamojo.close = function() {
        return o.closePaymentModal(t)
      }, window.Instamojo.configure = function(e) {
        t = o.configureOptions(e)
      }
    }).call(this)
  }, {
    "./common/modules": 4
  }],
  2: [function(e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = window.addEventListener ? "addEventListener" : "attachEvent";
    n.eventMethod = o;
    var a = window.removeEventListener ? "removeEventListener" : "detachEvent";
    n.removeEventMethod = a;
    var r = function() {
        return "attachEvent" === o
      },
      i = r() ? "onkeydown" : "keydown";
    n.keydownEvent = i;
    var s = r() ? "onmessage" : "message";
    n.messageEvent = s;
    var l = r() ? "onload" : "load";
    n.loadEvent = l;
    var d = r() ? "onclick" : "click";
    n.clickEvent = d
  }, {}],
  3: [function(e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.onModalOpenHandler = function(e) {
      if ("object" == typeof e.handlers) {
        var t = e.handlers.onOpen;
        "function" == typeof t && t()
      }
    }, n.onModalCloseHandler = function(e) {
      if ("object" == typeof e.handlers) {
        var t = e.handlers.onClose;
        "function" == typeof t && t()
      }
    }, n.onPaymentSuccessHandler = function(e, t) {
      if ("object" == typeof e.handlers) {
        var n = e.handlers.onSuccess;
        "function" == typeof n && n(t)
      }
    }, n.onPaymentFailureHandler = function(e, t) {
      if ("object" == typeof e.handlers) {
        var n = e.handlers.onFailure;
        "function" == typeof n && n(t)
      }
    }
  }, {}],
  4: [function(e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o, a = e("./clientHandlers"),
      r = e("./EventUtils"),
      i = e("./utils"),
      s = e("../modal"),
      l = !1,
      d = null,
      c = !1;

    function m(e) {
      var t, r = e[e.message ? "message" : "data"];
      if (c || "onRequestShow" === r && (u(!0), n.freezeBackgroundScrolling(), l || (a.onModalOpenHandler(o), l = !0)), "onRequestClose" === r && f(o), "changingIframeUrl" === r && (t = i.getIframeContainer(), i.addClass(i.closest(t, ".iframe-container"), "loader"), c = !1), "object" == typeof r && r.paymentId) {
        var s = r.status;
        "success" === s ? a.onPaymentSuccessHandler(o, r) : "failure" === s && a.onPaymentFailureHandler(o, r)
      }
    }

    function f(e) {
      window[r.removeEventMethod](r.messageEvent, m),
        function() {
          try {
            document.getElementById("instamojo-viewport").remove(), d && document.head.appendChild(d)
          } catch (e) {}
        }(), n.restoreBackgroundScrolling(), a.onModalCloseHandler(e), l = !1, c = !1
    }

    function u(e) {
      var t = i.getIframeContainer();
      if (i.removeClass(i.closest(t, ".iframe-container"), "loader"), e) try {
        var n = document.querySelector('meta[name="viewport"]');
        (d = n ? n.cloneNode() : null) && i.remove(n);
        var o = document.createElement("meta");
        o.name = "viewport", o.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no", o.id = "instamojo-viewport", document.head.appendChild(o)
      } catch (e) {}
      window.innerWidth < 640 && (i.closest(t, ".im-modal-container").style.position = "absolute", window.scrollTo(0, 0)), c = !0
    }
    n.getModalOptions = function(e) {
      var t, n, a, r, s = {
        content: '<div class="im-background-overlay"></div><div class="iframe-container loader"><div class="iframe-loader-wrapper"><div class="iframe-loader"></div></div><iframe class="iframe" src="' + (t = e, n = o.isInternalCheckout, a = o.directPaymentMode, r = t + (t.indexOf("?") > 0 ? "&" : "?"), (n ? r + "iframe=1&embed=form" : r + "checkout=remote&iframe=1&embed=form") + (a ? "&directPaymentMode=" + a : "")) + '" seamless id="imojo-rc-iframe"></iframe></div>'
      };
      return i.isIOSDevice || (s.modalContentStyle = {
        position: "fixed",
        width: "100%",
        height: "100%"
      }), s
    }, n.preLoadHandler = function() {
      var e = i.getIframeContainer();
      window[r.eventMethod](r.messageEvent, m, !1), e[r.eventMethod](r.loadEvent, function() {
        c || u(!1)
      })
    }, n.loadPaymentModal = function(e, t, a) {
      e && (o = a, t(), s.loadModal(n.getModalOptions(e)), n.preLoadHandler())
    }, n.closePaymentModal = function(e) {
      s.closeModal(), f(e)
    }, n.freezeBackgroundScrolling = function() {
      document.getElementsByTagName("html")[0].style.overflowY = "hidden", i.isIOSDevice && document.body.clientHeight < 1500 && (document.getElementsByTagName("body")[0].style.height = "1500px")
    }, n.restoreBackgroundScrolling = function() {
      document.getElementsByTagName("html")[0].style.overflowY = "auto", document.getElementsByTagName("body")[0].style.height = "auto"
    }, n.defaultModalOptions = {
      isInternalCheckout: !1,
      directPaymentMode: "",
      handlers: {}
    }, n.configureOptions = function(e) {
      try {
        var t = !0;
        if (!("object" == typeof e)) return console && console.error("Invalid Options", e), n.defaultModalOptions;
        var o = e.handlers,
          a = e.handlers,
          r = void 0 === a ? {} : a,
          i = r.onOpen,
          s = void 0 === i ? function() {} : i,
          l = r.onClose,
          d = void 0 === l ? function() {} : l,
          c = r.onSuccess,
          m = void 0 === c ? function(e) {} : c,
          f = r.onFailure;
        return (!o || "object" == typeof o) && (!o || o && "function" == typeof s) && (!o || o && "function" == typeof d) && (!o || o && "function" == typeof m) && (!o || o && "function" == typeof(void 0 === f ? function(e) {} : f)) || (t = !1), t ? e : (console && console.error("Invalid Options", e), n.defaultModalOptions)
      } catch (e) {}
    }
  }, {
    "../modal": 6,
    "./EventUtils": 2,
    "./clientHandlers": 3,
    "./utils": 5
  }],
  5: [function(e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.isIOSDevice = /iPhone|iPad|iPod/i.test(window.navigator.userAgent), n.getIframeContainer = function() {
      return document.getElementById("imojo-rc-iframe")
    }, n.closest = function(e, t) {
      var n, o, a = e;
      for (["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].some(function(e) {
          return "function" == typeof document.body[e] && (n = e, !0)
        }); a;) {
        if ((o = a.parentElement) && o[n](t)) return o;
        a = o
      }
      return null
    }, n.remove = function(e) {
      return e.parentNode.removeChild(e)
    }, n.hasClass = function(e, t) {
      return e.classList ? e.classList.contains(t) : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
    }, n.addClass = function(e, t) {
      e.classList ? e.classList.add(t) : n.hasClass(e, t) || (e.className += " " + t)
    }, n.removeClass = function(e, t) {
      if (e.classList) e.classList.remove(t);
      else if (n.hasClass(e, t)) {
        var o = new RegExp("(\\s|^)" + t + "(\\s|$)");
        e.className = e.className.replace(o, " ")
      }
    }
  }, {}],
  6: [function(e, t, n) {
    "use strict";
    var o = this && this.__assign || Object.assign || function(e) {
      for (var t, n = 1, o = arguments.length; n < o; n++) {
        t = arguments[n];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
      }
      return e
    };
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var a = e("./utils"),
      r = e("../common/EventUtils");
    n.loadModal = function(e) {
      void 0 === e && (e = a.defaultOptions);
      var t = o({}, a.defaultOptions, e);
      i(t), s(t), l(t)
    };
    var i = function(e) {
        var t = e.modalContainerClass,
          n = e.modalClass,
          o = e.modalContentClass;
        if (!document.querySelector("." + t)) {
          var a = document.querySelector("body"),
            r = document.documentElement,
            i = a || r,
            s = document.createElement("div");
          s.setAttribute("class", t), s.style.display = "none", s.innerHTML = '<div class="' + n + '"><div class="' + o + '"></div></div>', i.appendChild(s)
        }
      },
      s = function(e) {
        window[r.eventMethod](r.keydownEvent, function(e) {
          if (27 === e.keyCode) return n.closeModal()
        }), window[r.eventMethod](r.messageEvent, function(e) {
          if ("onRequestClose" === e[e.message ? "message" : "data"]) return n.closeModal()
        }, !1)
      },
      l = function(e) {
        var t = e.content,
          n = e.modalClass,
          o = e.modalContainerClass,
          r = e.modalContainerStyle,
          i = e.modalContentClass,
          s = e.modalContentStyle,
          l = e.modalStyle,
          d = document.querySelector("." + o),
          c = d.querySelector("." + n),
          m = d.querySelector("." + i);
        a.applyStyles(d, r), a.applyStyles(c, l), a.applyStyles(m, s), m.innerHTML = t
      };
    n.closeModal = function() {
      var e = a.defaultOptions.modalContainerClass,
        t = a.defaultOptions.modalContentClass,
        n = document.querySelector("." + e);
      n.style.display = "none", n.querySelector("." + t).innerHTML = ""
    }
  }, {
    "../common/EventUtils": 2,
    "./utils": 7
  }],
  7: [function(e, t, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.defaultOptions = {
      content: "",
      modalClass: "im-modal",
      modalContainerClass: "im-modal-container",
      modalContentClass: "im-modal-content",
      modalContainer: !1,
      modalStyle: {
        position: "relative",
        top: "0",
        left: "0",
        width: "100%",
        "max-width": "100%",
        height: "100%",
        transform: "none!important",
        margin: "0 auto",
        background: "transparent",
        "box-shadow": "none",
        "overflow-y": "visible"
      },
      modalContainerStyle: {
        position: "fixed",
        top: "0px",
        display: "block",
        left: "0px",
        height: "100%",
        width: "100%",
        background: "transparent",
        "backface-visibility": "hidden",
        "-webkit-overflow-scrolling": "touch",
        "overflow-y": "visible",
        "z-index": "10000001"
      },
      modalContentStyle: {
        width: "100%",
        height: "100%"
      }
    }, n.applyStyles = function(e, t) {
      e.style.cssText = o(t)
    };
    var o = function(e) {
      return Object.keys(e).reduce(function(t, n, o) {
        return "" + t + n + ":" + e[n] + ";"
      }, "")
    }
  }, {}]
}, {}, [1]);
//# sourceMappingURL=checkout.min.js.map
