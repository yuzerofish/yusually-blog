(function () {
  const h = document.createElement("link").relList;
  if (h && h.supports && h.supports("modulepreload")) return;
  for (const O of document.querySelectorAll('link[rel="modulepreload"]')) s(O);
  new MutationObserver((O) => {
    for (const z of O)
      if (z.type === "childList")
        for (const N of z.addedNodes) N.tagName === "LINK" && N.rel === "modulepreload" && s(N);
  }).observe(document, { childList: !0, subtree: !0 });
  function b(O) {
    const z = {};
    return (
      O.integrity && (z.integrity = O.integrity),
      O.referrerPolicy && (z.referrerPolicy = O.referrerPolicy),
      O.crossOrigin === "use-credentials"
        ? (z.credentials = "include")
        : O.crossOrigin === "anonymous"
          ? (z.credentials = "omit")
          : (z.credentials = "same-origin"),
      z
    );
  }
  function s(O) {
    if (O.ep) return;
    O.ep = !0;
    const z = b(O);
    fetch(O.href, z);
  }
})();
var cc = { exports: {} },
  pu = {};
var Sr;
function lv() {
  if (Sr) return pu;
  Sr = 1;
  var M = Symbol.for("react.transitional.element"),
    h = Symbol.for("react.fragment");
  function b(s, O, z) {
    var N = null;
    if ((z !== void 0 && (N = "" + z), O.key !== void 0 && (N = "" + O.key), "key" in O)) {
      z = {};
      for (var X in O) X !== "key" && (z[X] = O[X]);
    } else z = O;
    return ((O = z.ref), { $$typeof: M, type: s, key: N, ref: O !== void 0 ? O : null, props: z });
  }
  return ((pu.Fragment = h), (pu.jsx = b), (pu.jsxs = b), pu);
}
var br;
function av() {
  return (br || ((br = 1), (cc.exports = lv())), cc.exports);
}
var B = av(),
  sc = { exports: {} },
  Z = {};
var pr;
function ev() {
  if (pr) return Z;
  pr = 1;
  var M = Symbol.for("react.transitional.element"),
    h = Symbol.for("react.portal"),
    b = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    O = Symbol.for("react.profiler"),
    z = Symbol.for("react.consumer"),
    N = Symbol.for("react.context"),
    X = Symbol.for("react.forward_ref"),
    U = Symbol.for("react.suspense"),
    E = Symbol.for("react.memo"),
    J = Symbol.for("react.lazy"),
    q = Symbol.for("react.activity"),
    mt = Symbol.iterator;
  function xt(r) {
    return r === null || typeof r != "object"
      ? null
      : ((r = (mt && r[mt]) || r["@@iterator"]), typeof r == "function" ? r : null);
  }
  var Xt = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Nt = Object.assign,
    vl = {};
  function Kt(r, A, R) {
    ((this.props = r), (this.context = A), (this.refs = vl), (this.updater = R || Xt));
  }
  ((Kt.prototype.isReactComponent = {}),
    (Kt.prototype.setState = function (r, A) {
      if (typeof r != "object" && typeof r != "function" && r != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, r, A, "setState");
    }),
    (Kt.prototype.forceUpdate = function (r) {
      this.updater.enqueueForceUpdate(this, r, "forceUpdate");
    }));
  function Jt() {}
  Jt.prototype = Kt.prototype;
  function zt(r, A, R) {
    ((this.props = r), (this.context = A), (this.refs = vl), (this.updater = R || Xt));
  }
  var Ft = (zt.prototype = new Jt());
  ((Ft.constructor = zt), Nt(Ft, Kt.prototype), (Ft.isPureReactComponent = !0));
  var bt = Array.isArray;
  function Lt() {}
  var w = { H: null, A: null, T: null, S: null },
    Qt = Object.prototype.hasOwnProperty;
  function dl(r, A, R) {
    var x = R.ref;
    return { $$typeof: M, type: r, key: A, ref: x !== void 0 ? x : null, props: R };
  }
  function Ul(r, A) {
    return dl(r.type, A, r.props);
  }
  function el(r) {
    return typeof r == "object" && r !== null && r.$$typeof === M;
  }
  function Zt(r) {
    var A = { "=": "=0", ":": "=2" };
    return (
      "$" +
      r.replace(/[=:]/g, function (R) {
        return A[R];
      })
    );
  }
  var C = /\/+/g;
  function St(r, A) {
    return typeof r == "object" && r !== null && r.key != null ? Zt("" + r.key) : A.toString(36);
  }
  function it(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (
          (typeof r.status == "string"
            ? r.then(Lt, Lt)
            : ((r.status = "pending"),
              r.then(
                function (A) {
                  r.status === "pending" && ((r.status = "fulfilled"), (r.value = A));
                },
                function (A) {
                  r.status === "pending" && ((r.status = "rejected"), (r.reason = A));
                },
              )),
          r.status)
        ) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
    }
    throw r;
  }
  function S(r, A, R, x, Q) {
    var W = typeof r;
    (W === "undefined" || W === "boolean") && (r = null);
    var nt = !1;
    if (r === null) nt = !0;
    else
      switch (W) {
        case "bigint":
        case "string":
        case "number":
          nt = !0;
          break;
        case "object":
          switch (r.$$typeof) {
            case M:
            case h:
              nt = !0;
              break;
            case J:
              return ((nt = r._init), S(nt(r._payload), A, R, x, Q));
          }
      }
    if (nt)
      return (
        (Q = Q(r)),
        (nt = x === "" ? "." + St(r, 0) : x),
        bt(Q)
          ? ((R = ""),
            nt != null && (R = nt.replace(C, "$&/") + "/"),
            S(Q, A, R, "", function (De) {
              return De;
            }))
          : Q != null &&
            (el(Q) &&
              (Q = Ul(
                Q,
                R +
                  (Q.key == null || (r && r.key === Q.key)
                    ? ""
                    : ("" + Q.key).replace(C, "$&/") + "/") +
                  nt,
              )),
            A.push(Q)),
        1
      );
    nt = 0;
    var wt = x === "" ? "." : x + ":";
    if (bt(r))
      for (var Et = 0; Et < r.length; Et++)
        ((x = r[Et]), (W = wt + St(x, Et)), (nt += S(x, A, R, W, Q)));
    else if (((Et = xt(r)), typeof Et == "function"))
      for (r = Et.call(r), Et = 0; !(x = r.next()).done; )
        ((x = x.value), (W = wt + St(x, Et++)), (nt += S(x, A, R, W, Q)));
    else if (W === "object") {
      if (typeof r.then == "function") return S(it(r), A, R, x, Q);
      throw (
        (A = String(r)),
        Error(
          "Objects are not valid as a React child (found: " +
            (A === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : A) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return nt;
  }
  function D(r, A, R) {
    if (r == null) return r;
    var x = [],
      Q = 0;
    return (
      S(r, x, "", "", function (W) {
        return A.call(R, W, Q++);
      }),
      x
    );
  }
  function L(r) {
    if (r._status === -1) {
      var A = r._result;
      ((A = A()),
        A.then(
          function (R) {
            (r._status === 0 || r._status === -1) && ((r._status = 1), (r._result = R));
          },
          function (R) {
            (r._status === 0 || r._status === -1) && ((r._status = 2), (r._result = R));
          },
        ),
        r._status === -1 && ((r._status = 0), (r._result = A)));
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var et =
      typeof reportError == "function"
        ? reportError
        : function (r) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var A = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof r == "object" && r !== null && typeof r.message == "string"
                    ? String(r.message)
                    : String(r),
                error: r,
              });
              if (!window.dispatchEvent(A)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", r);
              return;
            }
            console.error(r);
          },
    ut = {
      map: D,
      forEach: function (r, A, R) {
        D(
          r,
          function () {
            A.apply(this, arguments);
          },
          R,
        );
      },
      count: function (r) {
        var A = 0;
        return (
          D(r, function () {
            A++;
          }),
          A
        );
      },
      toArray: function (r) {
        return (
          D(r, function (A) {
            return A;
          }) || []
        );
      },
      only: function (r) {
        if (!el(r))
          throw Error("React.Children.only expected to receive a single React element child.");
        return r;
      },
    };
  return (
    (Z.Activity = q),
    (Z.Children = ut),
    (Z.Component = Kt),
    (Z.Fragment = b),
    (Z.Profiler = O),
    (Z.PureComponent = zt),
    (Z.StrictMode = s),
    (Z.Suspense = U),
    (Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w),
    (Z.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (r) {
        return w.H.useMemoCache(r);
      },
    }),
    (Z.cache = function (r) {
      return function () {
        return r.apply(null, arguments);
      };
    }),
    (Z.cacheSignal = function () {
      return null;
    }),
    (Z.cloneElement = function (r, A, R) {
      if (r == null) throw Error("The argument must be a React element, but you passed " + r + ".");
      var x = Nt({}, r.props),
        Q = r.key;
      if (A != null)
        for (W in (A.key !== void 0 && (Q = "" + A.key), A))
          !Qt.call(A, W) ||
            W === "key" ||
            W === "__self" ||
            W === "__source" ||
            (W === "ref" && A.ref === void 0) ||
            (x[W] = A[W]);
      var W = arguments.length - 2;
      if (W === 1) x.children = R;
      else if (1 < W) {
        for (var nt = Array(W), wt = 0; wt < W; wt++) nt[wt] = arguments[wt + 2];
        x.children = nt;
      }
      return dl(r.type, Q, x);
    }),
    (Z.createContext = function (r) {
      return (
        (r = {
          $$typeof: N,
          _currentValue: r,
          _currentValue2: r,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (r.Provider = r),
        (r.Consumer = { $$typeof: z, _context: r }),
        r
      );
    }),
    (Z.createElement = function (r, A, R) {
      var x,
        Q = {},
        W = null;
      if (A != null)
        for (x in (A.key !== void 0 && (W = "" + A.key), A))
          Qt.call(A, x) && x !== "key" && x !== "__self" && x !== "__source" && (Q[x] = A[x]);
      var nt = arguments.length - 2;
      if (nt === 1) Q.children = R;
      else if (1 < nt) {
        for (var wt = Array(nt), Et = 0; Et < nt; Et++) wt[Et] = arguments[Et + 2];
        Q.children = wt;
      }
      if (r && r.defaultProps)
        for (x in ((nt = r.defaultProps), nt)) Q[x] === void 0 && (Q[x] = nt[x]);
      return dl(r, W, Q);
    }),
    (Z.createRef = function () {
      return { current: null };
    }),
    (Z.forwardRef = function (r) {
      return { $$typeof: X, render: r };
    }),
    (Z.isValidElement = el),
    (Z.lazy = function (r) {
      return { $$typeof: J, _payload: { _status: -1, _result: r }, _init: L };
    }),
    (Z.memo = function (r, A) {
      return { $$typeof: E, type: r, compare: A === void 0 ? null : A };
    }),
    (Z.startTransition = function (r) {
      var A = w.T,
        R = {};
      w.T = R;
      try {
        var x = r(),
          Q = w.S;
        (Q !== null && Q(R, x),
          typeof x == "object" && x !== null && typeof x.then == "function" && x.then(Lt, et));
      } catch (W) {
        et(W);
      } finally {
        (A !== null && R.types !== null && (A.types = R.types), (w.T = A));
      }
    }),
    (Z.unstable_useCacheRefresh = function () {
      return w.H.useCacheRefresh();
    }),
    (Z.use = function (r) {
      return w.H.use(r);
    }),
    (Z.useActionState = function (r, A, R) {
      return w.H.useActionState(r, A, R);
    }),
    (Z.useCallback = function (r, A) {
      return w.H.useCallback(r, A);
    }),
    (Z.useContext = function (r) {
      return w.H.useContext(r);
    }),
    (Z.useDebugValue = function () {}),
    (Z.useDeferredValue = function (r, A) {
      return w.H.useDeferredValue(r, A);
    }),
    (Z.useEffect = function (r, A) {
      return w.H.useEffect(r, A);
    }),
    (Z.useEffectEvent = function (r) {
      return w.H.useEffectEvent(r);
    }),
    (Z.useId = function () {
      return w.H.useId();
    }),
    (Z.useImperativeHandle = function (r, A, R) {
      return w.H.useImperativeHandle(r, A, R);
    }),
    (Z.useInsertionEffect = function (r, A) {
      return w.H.useInsertionEffect(r, A);
    }),
    (Z.useLayoutEffect = function (r, A) {
      return w.H.useLayoutEffect(r, A);
    }),
    (Z.useMemo = function (r, A) {
      return w.H.useMemo(r, A);
    }),
    (Z.useOptimistic = function (r, A) {
      return w.H.useOptimistic(r, A);
    }),
    (Z.useReducer = function (r, A, R) {
      return w.H.useReducer(r, A, R);
    }),
    (Z.useRef = function (r) {
      return w.H.useRef(r);
    }),
    (Z.useState = function (r) {
      return w.H.useState(r);
    }),
    (Z.useSyncExternalStore = function (r, A, R) {
      return w.H.useSyncExternalStore(r, A, R);
    }),
    (Z.useTransition = function () {
      return w.H.useTransition();
    }),
    (Z.version = "19.2.7"),
    Z
  );
}
var _r;
function dc() {
  return (_r || ((_r = 1), (sc.exports = ev())), sc.exports);
}
var gt = dc(),
  oc = { exports: {} },
  _u = {},
  rc = { exports: {} },
  mc = {};
var Er;
function uv() {
  return (
    Er ||
      ((Er = 1),
      (function (M) {
        function h(S, D) {
          var L = S.length;
          S.push(D);
          t: for (; 0 < L; ) {
            var et = (L - 1) >>> 1,
              ut = S[et];
            if (0 < O(ut, D)) ((S[et] = D), (S[L] = ut), (L = et));
            else break t;
          }
        }
        function b(S) {
          return S.length === 0 ? null : S[0];
        }
        function s(S) {
          if (S.length === 0) return null;
          var D = S[0],
            L = S.pop();
          if (L !== D) {
            S[0] = L;
            t: for (var et = 0, ut = S.length, r = ut >>> 1; et < r; ) {
              var A = 2 * (et + 1) - 1,
                R = S[A],
                x = A + 1,
                Q = S[x];
              if (0 > O(R, L))
                x < ut && 0 > O(Q, R)
                  ? ((S[et] = Q), (S[x] = L), (et = x))
                  : ((S[et] = R), (S[A] = L), (et = A));
              else if (x < ut && 0 > O(Q, L)) ((S[et] = Q), (S[x] = L), (et = x));
              else break t;
            }
          }
          return D;
        }
        function O(S, D) {
          var L = S.sortIndex - D.sortIndex;
          return L !== 0 ? L : S.id - D.id;
        }
        if (
          ((M.unstable_now = void 0),
          typeof performance == "object" && typeof performance.now == "function")
        ) {
          var z = performance;
          M.unstable_now = function () {
            return z.now();
          };
        } else {
          var N = Date,
            X = N.now();
          M.unstable_now = function () {
            return N.now() - X;
          };
        }
        var U = [],
          E = [],
          J = 1,
          q = null,
          mt = 3,
          xt = !1,
          Xt = !1,
          Nt = !1,
          vl = !1,
          Kt = typeof setTimeout == "function" ? setTimeout : null,
          Jt = typeof clearTimeout == "function" ? clearTimeout : null,
          zt = typeof setImmediate < "u" ? setImmediate : null;
        function Ft(S) {
          for (var D = b(E); D !== null; ) {
            if (D.callback === null) s(E);
            else if (D.startTime <= S) (s(E), (D.sortIndex = D.expirationTime), h(U, D));
            else break;
            D = b(E);
          }
        }
        function bt(S) {
          if (((Nt = !1), Ft(S), !Xt))
            if (b(U) !== null) ((Xt = !0), Lt || ((Lt = !0), Zt()));
            else {
              var D = b(E);
              D !== null && it(bt, D.startTime - S);
            }
        }
        var Lt = !1,
          w = -1,
          Qt = 5,
          dl = -1;
        function Ul() {
          return vl ? !0 : !(M.unstable_now() - dl < Qt);
        }
        function el() {
          if (((vl = !1), Lt)) {
            var S = M.unstable_now();
            dl = S;
            var D = !0;
            try {
              t: {
                ((Xt = !1), Nt && ((Nt = !1), Jt(w), (w = -1)), (xt = !0));
                var L = mt;
                try {
                  l: {
                    for (Ft(S), q = b(U); q !== null && !(q.expirationTime > S && Ul()); ) {
                      var et = q.callback;
                      if (typeof et == "function") {
                        ((q.callback = null), (mt = q.priorityLevel));
                        var ut = et(q.expirationTime <= S);
                        if (((S = M.unstable_now()), typeof ut == "function")) {
                          ((q.callback = ut), Ft(S), (D = !0));
                          break l;
                        }
                        (q === b(U) && s(U), Ft(S));
                      } else s(U);
                      q = b(U);
                    }
                    if (q !== null) D = !0;
                    else {
                      var r = b(E);
                      (r !== null && it(bt, r.startTime - S), (D = !1));
                    }
                  }
                  break t;
                } finally {
                  ((q = null), (mt = L), (xt = !1));
                }
                D = void 0;
              }
            } finally {
              D ? Zt() : (Lt = !1);
            }
          }
        }
        var Zt;
        if (typeof zt == "function")
          Zt = function () {
            zt(el);
          };
        else if (typeof MessageChannel < "u") {
          var C = new MessageChannel(),
            St = C.port2;
          ((C.port1.onmessage = el),
            (Zt = function () {
              St.postMessage(null);
            }));
        } else
          Zt = function () {
            Kt(el, 0);
          };
        function it(S, D) {
          w = Kt(function () {
            S(M.unstable_now());
          }, D);
        }
        ((M.unstable_IdlePriority = 5),
          (M.unstable_ImmediatePriority = 1),
          (M.unstable_LowPriority = 4),
          (M.unstable_NormalPriority = 3),
          (M.unstable_Profiling = null),
          (M.unstable_UserBlockingPriority = 2),
          (M.unstable_cancelCallback = function (S) {
            S.callback = null;
          }),
          (M.unstable_forceFrameRate = function (S) {
            0 > S || 125 < S
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Qt = 0 < S ? Math.floor(1e3 / S) : 5);
          }),
          (M.unstable_getCurrentPriorityLevel = function () {
            return mt;
          }),
          (M.unstable_next = function (S) {
            switch (mt) {
              case 1:
              case 2:
              case 3:
                var D = 3;
                break;
              default:
                D = mt;
            }
            var L = mt;
            mt = D;
            try {
              return S();
            } finally {
              mt = L;
            }
          }),
          (M.unstable_requestPaint = function () {
            vl = !0;
          }),
          (M.unstable_runWithPriority = function (S, D) {
            switch (S) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                S = 3;
            }
            var L = mt;
            mt = S;
            try {
              return D();
            } finally {
              mt = L;
            }
          }),
          (M.unstable_scheduleCallback = function (S, D, L) {
            var et = M.unstable_now();
            switch (
              (typeof L == "object" && L !== null
                ? ((L = L.delay), (L = typeof L == "number" && 0 < L ? et + L : et))
                : (L = et),
              S)
            ) {
              case 1:
                var ut = -1;
                break;
              case 2:
                ut = 250;
                break;
              case 5:
                ut = 1073741823;
                break;
              case 4:
                ut = 1e4;
                break;
              default:
                ut = 5e3;
            }
            return (
              (ut = L + ut),
              (S = {
                id: J++,
                callback: D,
                priorityLevel: S,
                startTime: L,
                expirationTime: ut,
                sortIndex: -1,
              }),
              L > et
                ? ((S.sortIndex = L),
                  h(E, S),
                  b(U) === null &&
                    S === b(E) &&
                    (Nt ? (Jt(w), (w = -1)) : (Nt = !0), it(bt, L - et)))
                : ((S.sortIndex = ut), h(U, S), Xt || xt || ((Xt = !0), Lt || ((Lt = !0), Zt()))),
              S
            );
          }),
          (M.unstable_shouldYield = Ul),
          (M.unstable_wrapCallback = function (S) {
            var D = mt;
            return function () {
              var L = mt;
              mt = D;
              try {
                return S.apply(this, arguments);
              } finally {
                mt = L;
              }
            };
          }));
      })(mc)),
    mc
  );
}
var Tr;
function nv() {
  return (Tr || ((Tr = 1), (rc.exports = uv())), rc.exports);
}
var hc = { exports: {} },
  Vt = {};
var Ar;
function iv() {
  if (Ar) return Vt;
  Ar = 1;
  var M = dc();
  function h(U) {
    var E = "https://react.dev/errors/" + U;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var J = 2; J < arguments.length; J++) E += "&args[]=" + encodeURIComponent(arguments[J]);
    }
    return (
      "Minified React error #" +
      U +
      "; visit " +
      E +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function b() {}
  var s = {
      d: {
        f: b,
        r: function () {
          throw Error(h(522));
        },
        D: b,
        C: b,
        L: b,
        m: b,
        X: b,
        S: b,
        M: b,
      },
      p: 0,
      findDOMNode: null,
    },
    O = Symbol.for("react.portal");
  function z(U, E, J) {
    var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: O,
      key: q == null ? null : "" + q,
      children: U,
      containerInfo: E,
      implementation: J,
    };
  }
  var N = M.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function X(U, E) {
    if (U === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  return (
    (Vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (Vt.createPortal = function (U, E) {
      var J = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!E || (E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11)) throw Error(h(299));
      return z(U, E, null, J);
    }),
    (Vt.flushSync = function (U) {
      var E = N.T,
        J = s.p;
      try {
        if (((N.T = null), (s.p = 2), U)) return U();
      } finally {
        ((N.T = E), (s.p = J), s.d.f());
      }
    }),
    (Vt.preconnect = function (U, E) {
      typeof U == "string" &&
        (E
          ? ((E = E.crossOrigin),
            (E = typeof E == "string" ? (E === "use-credentials" ? E : "") : void 0))
          : (E = null),
        s.d.C(U, E));
    }),
    (Vt.prefetchDNS = function (U) {
      typeof U == "string" && s.d.D(U);
    }),
    (Vt.preinit = function (U, E) {
      if (typeof U == "string" && E && typeof E.as == "string") {
        var J = E.as,
          q = X(J, E.crossOrigin),
          mt = typeof E.integrity == "string" ? E.integrity : void 0,
          xt = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
        J === "style"
          ? s.d.S(U, typeof E.precedence == "string" ? E.precedence : void 0, {
              crossOrigin: q,
              integrity: mt,
              fetchPriority: xt,
            })
          : J === "script" &&
            s.d.X(U, {
              crossOrigin: q,
              integrity: mt,
              fetchPriority: xt,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
      }
    }),
    (Vt.preinitModule = function (U, E) {
      if (typeof U == "string")
        if (typeof E == "object" && E !== null) {
          if (E.as == null || E.as === "script") {
            var J = X(E.as, E.crossOrigin);
            s.d.M(U, {
              crossOrigin: J,
              integrity: typeof E.integrity == "string" ? E.integrity : void 0,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
          }
        } else E == null && s.d.M(U);
    }),
    (Vt.preload = function (U, E) {
      if (typeof U == "string" && typeof E == "object" && E !== null && typeof E.as == "string") {
        var J = E.as,
          q = X(J, E.crossOrigin);
        s.d.L(U, J, {
          crossOrigin: q,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          nonce: typeof E.nonce == "string" ? E.nonce : void 0,
          type: typeof E.type == "string" ? E.type : void 0,
          fetchPriority: typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
          referrerPolicy: typeof E.referrerPolicy == "string" ? E.referrerPolicy : void 0,
          imageSrcSet: typeof E.imageSrcSet == "string" ? E.imageSrcSet : void 0,
          imageSizes: typeof E.imageSizes == "string" ? E.imageSizes : void 0,
          media: typeof E.media == "string" ? E.media : void 0,
        });
      }
    }),
    (Vt.preloadModule = function (U, E) {
      if (typeof U == "string")
        if (E) {
          var J = X(E.as, E.crossOrigin);
          s.d.m(U, {
            as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
            crossOrigin: J,
            integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          });
        } else s.d.m(U);
    }),
    (Vt.requestFormReset = function (U) {
      s.d.r(U);
    }),
    (Vt.unstable_batchedUpdates = function (U, E) {
      return U(E);
    }),
    (Vt.useFormState = function (U, E, J) {
      return N.H.useFormState(U, E, J);
    }),
    (Vt.useFormStatus = function () {
      return N.H.useHostTransitionStatus();
    }),
    (Vt.version = "19.2.7"),
    Vt
  );
}
var zr;
function fv() {
  if (zr) return hc.exports;
  zr = 1;
  function M() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(M);
      } catch (h) {
        console.error(h);
      }
  }
  return (M(), (hc.exports = iv()), hc.exports);
}
var Mr;
function cv() {
  if (Mr) return _u;
  Mr = 1;
  var M = nv(),
    h = dc(),
    b = fv();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) l += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      l +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function O(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function z(t) {
    var l = t,
      a = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do ((l = t), (l.flags & 4098) !== 0 && (a = l.return), (t = l.return));
      while (t);
    }
    return l.tag === 3 ? a : null;
  }
  function N(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if ((l === null && ((t = t.alternate), t !== null && (l = t.memoizedState)), l !== null))
        return l.dehydrated;
    }
    return null;
  }
  function X(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if ((l === null && ((t = t.alternate), t !== null && (l = t.memoizedState)), l !== null))
        return l.dehydrated;
    }
    return null;
  }
  function U(t) {
    if (z(t) !== t) throw Error(s(188));
  }
  function E(t) {
    var l = t.alternate;
    if (!l) {
      if (((l = z(t)), l === null)) throw Error(s(188));
      return l !== t ? null : t;
    }
    for (var a = t, e = l; ; ) {
      var u = a.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((e = u.return), e !== null)) {
          a = e;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === a) return (U(u), t);
          if (n === e) return (U(u), l);
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (a.return !== e.return) ((a = u), (e = n));
      else {
        for (var i = !1, f = u.child; f; ) {
          if (f === a) {
            ((i = !0), (a = u), (e = n));
            break;
          }
          if (f === e) {
            ((i = !0), (e = u), (a = n));
            break;
          }
          f = f.sibling;
        }
        if (!i) {
          for (f = n.child; f; ) {
            if (f === a) {
              ((i = !0), (a = n), (e = u));
              break;
            }
            if (f === e) {
              ((i = !0), (e = n), (a = u));
              break;
            }
            f = f.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (a.alternate !== e) throw Error(s(190));
    }
    if (a.tag !== 3) throw Error(s(188));
    return a.stateNode.current === a ? t : l;
  }
  function J(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((l = J(t)), l !== null)) return l;
      t = t.sibling;
    }
    return null;
  }
  var q = Object.assign,
    mt = Symbol.for("react.element"),
    xt = Symbol.for("react.transitional.element"),
    Xt = Symbol.for("react.portal"),
    Nt = Symbol.for("react.fragment"),
    vl = Symbol.for("react.strict_mode"),
    Kt = Symbol.for("react.profiler"),
    Jt = Symbol.for("react.consumer"),
    zt = Symbol.for("react.context"),
    Ft = Symbol.for("react.forward_ref"),
    bt = Symbol.for("react.suspense"),
    Lt = Symbol.for("react.suspense_list"),
    w = Symbol.for("react.memo"),
    Qt = Symbol.for("react.lazy"),
    dl = Symbol.for("react.activity"),
    Ul = Symbol.for("react.memo_cache_sentinel"),
    el = Symbol.iterator;
  function Zt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (el && t[el]) || t["@@iterator"]), typeof t == "function" ? t : null);
  }
  var C = Symbol.for("react.client.reference");
  function St(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.$$typeof === C ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case Nt:
        return "Fragment";
      case Kt:
        return "Profiler";
      case vl:
        return "StrictMode";
      case bt:
        return "Suspense";
      case Lt:
        return "SuspenseList";
      case dl:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Xt:
          return "Portal";
        case zt:
          return t.displayName || "Context";
        case Jt:
          return (t._context.displayName || "Context") + ".Consumer";
        case Ft:
          var l = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = l.displayName || l.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case w:
          return ((l = t.displayName || null), l !== null ? l : St(t.type) || "Memo");
        case Qt:
          ((l = t._payload), (t = t._init));
          try {
            return St(t(l));
          } catch {}
      }
    return null;
  }
  var it = Array.isArray,
    S = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    D = b.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    L = { pending: !1, data: null, method: null, action: null },
    et = [],
    ut = -1;
  function r(t) {
    return { current: t };
  }
  function A(t) {
    0 > ut || ((t.current = et[ut]), (et[ut] = null), ut--);
  }
  function R(t, l) {
    (ut++, (et[ut] = t.current), (t.current = l));
  }
  var x = r(null),
    Q = r(null),
    W = r(null),
    nt = r(null);
  function wt(t, l) {
    switch ((R(W, l), R(Q, t), R(x, null), l.nodeType)) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? L0(t) : 0;
        break;
      default:
        if (((t = l.tagName), (l = l.namespaceURI))) ((l = L0(l)), (t = Q0(l, t)));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (A(x), R(x, t));
  }
  function Et() {
    (A(x), A(Q), A(W));
  }
  function De(t) {
    t.memoizedState !== null && R(nt, t);
    var l = x.current,
      a = Q0(l, t.type);
    l !== a && (R(Q, t), R(x, a));
  }
  function Eu(t) {
    (Q.current === t && (A(x), A(Q)), nt.current === t && (A(nt), (yu._currentValue = L)));
  }
  var Zn, yc;
  function Ta(t) {
    if (Zn === void 0)
      try {
        throw Error();
      } catch (a) {
        var l = a.stack.trim().match(/\n( *(at )?)/);
        ((Zn = (l && l[1]) || ""),
          (yc =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Zn +
      t +
      yc
    );
  }
  var Vn = !1;
  function Kn(t, l) {
    if (!t || Vn) return "";
    Vn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var e = {
        DetermineComponentFrameRoot: function () {
          try {
            if (l) {
              var T = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(T.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(T, []);
                } catch (g) {
                  var y = g;
                }
                Reflect.construct(t, [], T);
              } else {
                try {
                  T.call();
                } catch (g) {
                  y = g;
                }
                t.call(T.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                y = g;
              }
              (T = t()) && typeof T.catch == "function" && T.catch(function () {});
            }
          } catch (g) {
            if (g && y && typeof g.stack == "string") return [g.stack, y.stack];
          }
          return [null, null];
        },
      };
      e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(e.DetermineComponentFrameRoot, "name");
      u &&
        u.configurable &&
        Object.defineProperty(e.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = e.DetermineComponentFrameRoot(),
        i = n[0],
        f = n[1];
      if (i && f) {
        var c = i.split(`
`),
          d = f.split(`
`);
        for (u = e = 0; e < c.length && !c[e].includes("DetermineComponentFrameRoot"); ) e++;
        for (; u < d.length && !d[u].includes("DetermineComponentFrameRoot"); ) u++;
        if (e === c.length || u === d.length)
          for (e = c.length - 1, u = d.length - 1; 1 <= e && 0 <= u && c[e] !== d[u]; ) u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (c[e] !== d[u]) {
            if (e !== 1 || u !== 1)
              do
                if ((e--, u--, 0 > u || c[e] !== d[u])) {
                  var p =
                    `
` + c[e].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      p.includes("<anonymous>") &&
                      (p = p.replace("<anonymous>", t.displayName)),
                    p
                  );
                }
              while (1 <= e && 0 <= u);
            break;
          }
      }
    } finally {
      ((Vn = !1), (Error.prepareStackTrace = a));
    }
    return (a = t ? t.displayName || t.name : "") ? Ta(a) : "";
  }
  function Nr(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ta(t.type);
      case 16:
        return Ta("Lazy");
      case 13:
        return t.child !== l && l !== null ? Ta("Suspense Fallback") : Ta("Suspense");
      case 19:
        return Ta("SuspenseList");
      case 0:
      case 15:
        return Kn(t.type, !1);
      case 11:
        return Kn(t.type.render, !1);
      case 1:
        return Kn(t.type, !0);
      case 31:
        return Ta("Activity");
      default:
        return "";
    }
  }
  function gc(t) {
    try {
      var l = "",
        a = null;
      do ((l += Nr(t, a)), (a = t), (t = t.return));
      while (t);
      return l;
    } catch (e) {
      return (
        `
Error generating stack: ` +
        e.message +
        `
` +
        e.stack
      );
    }
  }
  var Jn = Object.prototype.hasOwnProperty,
    wn = M.unstable_scheduleCallback,
    Wn = M.unstable_cancelCallback,
    Cr = M.unstable_shouldYield,
    Hr = M.unstable_requestPaint,
    ul = M.unstable_now,
    Br = M.unstable_getCurrentPriorityLevel,
    Sc = M.unstable_ImmediatePriority,
    bc = M.unstable_UserBlockingPriority,
    Tu = M.unstable_NormalPriority,
    qr = M.unstable_LowPriority,
    pc = M.unstable_IdlePriority,
    jr = M.log,
    Yr = M.unstable_setDisableYieldValue,
    Oe = null,
    nl = null;
  function Pl(t) {
    if ((typeof jr == "function" && Yr(t), nl && typeof nl.setStrictMode == "function"))
      try {
        nl.setStrictMode(Oe, t);
      } catch {}
  }
  var il = Math.clz32 ? Math.clz32 : Lr,
    Gr = Math.log,
    Xr = Math.LN2;
  function Lr(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Gr(t) / Xr) | 0)) | 0);
  }
  var Au = 256,
    zu = 262144,
    Mu = 4194304;
  function Aa(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Du(t, l, a) {
    var e = t.pendingLanes;
    if (e === 0) return 0;
    var u = 0,
      n = t.suspendedLanes,
      i = t.pingedLanes;
    t = t.warmLanes;
    var f = e & 134217727;
    return (
      f !== 0
        ? ((e = f & ~n),
          e !== 0
            ? (u = Aa(e))
            : ((i &= f), i !== 0 ? (u = Aa(i)) : a || ((a = f & ~t), a !== 0 && (u = Aa(a)))))
        : ((f = e & ~n),
          f !== 0
            ? (u = Aa(f))
            : i !== 0
              ? (u = Aa(i))
              : a || ((a = e & ~t), a !== 0 && (u = Aa(a)))),
      u === 0
        ? 0
        : l !== 0 &&
            l !== u &&
            (l & n) === 0 &&
            ((n = u & -u), (a = l & -l), n >= a || (n === 32 && (a & 4194048) !== 0))
          ? l
          : u
    );
  }
  function Ue(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Qr(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function _c() {
    var t = Mu;
    return ((Mu <<= 1), (Mu & 62914560) === 0 && (Mu = 4194304), t);
  }
  function Fn(t) {
    for (var l = [], a = 0; 31 > a; a++) l.push(t);
    return l;
  }
  function Re(t, l) {
    ((t.pendingLanes |= l),
      l !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function Zr(t, l, a, e, u, n) {
    var i = t.pendingLanes;
    ((t.pendingLanes = a),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= a),
      (t.entangledLanes &= a),
      (t.errorRecoveryDisabledLanes &= a),
      (t.shellSuspendCounter = 0));
    var f = t.entanglements,
      c = t.expirationTimes,
      d = t.hiddenUpdates;
    for (a = i & ~a; 0 < a; ) {
      var p = 31 - il(a),
        T = 1 << p;
      ((f[p] = 0), (c[p] = -1));
      var y = d[p];
      if (y !== null)
        for (d[p] = null, p = 0; p < y.length; p++) {
          var g = y[p];
          g !== null && (g.lane &= -536870913);
        }
      a &= ~T;
    }
    (e !== 0 && Ec(t, e, 0),
      n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l)));
  }
  function Ec(t, l, a) {
    ((t.pendingLanes |= l), (t.suspendedLanes &= ~l));
    var e = 31 - il(l);
    ((t.entangledLanes |= l),
      (t.entanglements[e] = t.entanglements[e] | 1073741824 | (a & 261930)));
  }
  function Tc(t, l) {
    var a = (t.entangledLanes |= l);
    for (t = t.entanglements; a; ) {
      var e = 31 - il(a),
        u = 1 << e;
      ((u & l) | (t[e] & l) && (t[e] |= l), (a &= ~u));
    }
  }
  function Ac(t, l) {
    var a = l & -l;
    return ((a = (a & 42) !== 0 ? 1 : $n(a)), (a & (t.suspendedLanes | l)) !== 0 ? 0 : a);
  }
  function $n(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function kn(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function zc() {
    var t = D.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : rr(t.type));
  }
  function Mc(t, l) {
    var a = D.p;
    try {
      return ((D.p = t), l());
    } finally {
      D.p = a;
    }
  }
  var Il = Math.random().toString(36).slice(2),
    Bt = "__reactFiber$" + Il,
    $t = "__reactProps$" + Il,
    Za = "__reactContainer$" + Il,
    Pn = "__reactEvents$" + Il,
    Vr = "__reactListeners$" + Il,
    Kr = "__reactHandles$" + Il,
    Dc = "__reactResources$" + Il,
    xe = "__reactMarker$" + Il;
  function In(t) {
    (delete t[Bt], delete t[$t], delete t[Pn], delete t[Vr], delete t[Kr]);
  }
  function Va(t) {
    var l = t[Bt];
    if (l) return l;
    for (var a = t.parentNode; a; ) {
      if ((l = a[Za] || a[Bt])) {
        if (((a = l.alternate), l.child !== null || (a !== null && a.child !== null)))
          for (t = F0(t); t !== null; ) {
            if ((a = t[Bt])) return a;
            t = F0(t);
          }
        return l;
      }
      ((t = a), (a = t.parentNode));
    }
    return null;
  }
  function Ka(t) {
    if ((t = t[Bt] || t[Za])) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3) return t;
    }
    return null;
  }
  function Ne(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function Ja(t) {
    var l = t[Dc];
    return (l || (l = t[Dc] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), l);
  }
  function Ct(t) {
    t[xe] = !0;
  }
  var Oc = new Set(),
    Uc = {};
  function za(t, l) {
    (wa(t, l), wa(t + "Capture", l));
  }
  function wa(t, l) {
    for (Uc[t] = l, t = 0; t < l.length; t++) Oc.add(l[t]);
  }
  var Jr = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Rc = {},
    xc = {};
  function wr(t) {
    return Jn.call(xc, t)
      ? !0
      : Jn.call(Rc, t)
        ? !1
        : Jr.test(t)
          ? (xc[t] = !0)
          : ((Rc[t] = !0), !1);
  }
  function Ou(t, l, a) {
    if (wr(l))
      if (a === null) t.removeAttribute(l);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var e = l.toLowerCase().slice(0, 5);
            if (e !== "data-" && e !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + a);
      }
  }
  function Uu(t, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + a);
    }
  }
  function Hl(t, l, a, e) {
    if (e === null) t.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(l, a, "" + e);
    }
  }
  function yl(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Nc(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Wr(t, l, a) {
    var e = Object.getOwnPropertyDescriptor(t.constructor.prototype, l);
    if (
      !t.hasOwnProperty(l) &&
      typeof e < "u" &&
      typeof e.get == "function" &&
      typeof e.set == "function"
    ) {
      var u = e.get,
        n = e.set;
      return (
        Object.defineProperty(t, l, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (i) {
            ((a = "" + i), n.call(this, i));
          },
        }),
        Object.defineProperty(t, l, { enumerable: e.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (i) {
            a = "" + i;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[l]);
          },
        }
      );
    }
  }
  function ti(t) {
    if (!t._valueTracker) {
      var l = Nc(t) ? "checked" : "value";
      t._valueTracker = Wr(t, l, "" + t[l]);
    }
  }
  function Cc(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var a = l.getValue(),
      e = "";
    return (
      t && (e = Nc(t) ? (t.checked ? "true" : "false") : t.value),
      (t = e),
      t !== a ? (l.setValue(t), !0) : !1
    );
  }
  function Ru(t) {
    if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Fr = /[\n"\\]/g;
  function gl(t) {
    return t.replace(Fr, function (l) {
      return "\\" + l.charCodeAt(0).toString(16) + " ";
    });
  }
  function li(t, l, a, e, u, n, i, f) {
    ((t.name = ""),
      i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean"
        ? (t.type = i)
        : t.removeAttribute("type"),
      l != null
        ? i === "number"
          ? ((l === 0 && t.value === "") || t.value != l) && (t.value = "" + yl(l))
          : t.value !== "" + yl(l) && (t.value = "" + yl(l))
        : (i !== "submit" && i !== "reset") || t.removeAttribute("value"),
      l != null
        ? ai(t, i, yl(l))
        : a != null
          ? ai(t, i, yl(a))
          : e != null && t.removeAttribute("value"),
      u == null && n != null && (t.defaultChecked = !!n),
      u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean"
        ? (t.name = "" + yl(f))
        : t.removeAttribute("name"));
  }
  function Hc(t, l, a, e, u, n, i, f) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (t.type = n),
      l != null || a != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || l != null)) {
        ti(t);
        return;
      }
      ((a = a != null ? "" + yl(a) : ""),
        (l = l != null ? "" + yl(l) : a),
        f || l === t.value || (t.value = l),
        (t.defaultValue = l));
    }
    ((e = e ?? u),
      (e = typeof e != "function" && typeof e != "symbol" && !!e),
      (t.checked = f ? t.checked : !!e),
      (t.defaultChecked = !!e),
      i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (t.name = i),
      ti(t));
  }
  function ai(t, l, a) {
    (l === "number" && Ru(t.ownerDocument) === t) ||
      t.defaultValue === "" + a ||
      (t.defaultValue = "" + a);
  }
  function Wa(t, l, a, e) {
    if (((t = t.options), l)) {
      l = {};
      for (var u = 0; u < a.length; u++) l["$" + a[u]] = !0;
      for (a = 0; a < t.length; a++)
        ((u = l.hasOwnProperty("$" + t[a].value)),
          t[a].selected !== u && (t[a].selected = u),
          u && e && (t[a].defaultSelected = !0));
    } else {
      for (a = "" + yl(a), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === a) {
          ((t[u].selected = !0), e && (t[u].defaultSelected = !0));
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function Bc(t, l, a) {
    if (l != null && ((l = "" + yl(l)), l !== t.value && (t.value = l), a == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = a != null ? "" + yl(a) : "";
  }
  function qc(t, l, a, e) {
    if (l == null) {
      if (e != null) {
        if (a != null) throw Error(s(92));
        if (it(e)) {
          if (1 < e.length) throw Error(s(93));
          e = e[0];
        }
        a = e;
      }
      (a == null && (a = ""), (l = a));
    }
    ((a = yl(l)),
      (t.defaultValue = a),
      (e = t.textContent),
      e === a && e !== "" && e !== null && (t.value = e),
      ti(t));
  }
  function Fa(t, l) {
    if (l) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var $r = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function jc(t, l, a) {
    var e = l.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? e
        ? t.setProperty(l, "")
        : l === "float"
          ? (t.cssFloat = "")
          : (t[l] = "")
      : e
        ? t.setProperty(l, a)
        : typeof a != "number" || a === 0 || $r.has(l)
          ? l === "float"
            ? (t.cssFloat = a)
            : (t[l] = ("" + a).trim())
          : (t[l] = a + "px");
  }
  function Yc(t, l, a) {
    if (l != null && typeof l != "object") throw Error(s(62));
    if (((t = t.style), a != null)) {
      for (var e in a)
        !a.hasOwnProperty(e) ||
          (l != null && l.hasOwnProperty(e)) ||
          (e.indexOf("--") === 0
            ? t.setProperty(e, "")
            : e === "float"
              ? (t.cssFloat = "")
              : (t[e] = ""));
      for (var u in l) ((e = l[u]), l.hasOwnProperty(u) && a[u] !== e && jc(t, u, e));
    } else for (var n in l) l.hasOwnProperty(n) && jc(t, n, l[n]);
  }
  function ei(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var kr = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Pr =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function xu(t) {
    return Pr.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Bl() {}
  var ui = null;
  function ni(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var $a = null,
    ka = null;
  function Gc(t) {
    var l = Ka(t);
    if (l && (t = l.stateNode)) {
      var a = t[$t] || null;
      t: switch (((t = l.stateNode), l.type)) {
        case "input":
          if (
            (li(
              t,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
            ),
            (l = a.name),
            a.type === "radio" && l != null)
          ) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll('input[name="' + gl("" + l) + '"][type="radio"]'), l = 0;
              l < a.length;
              l++
            ) {
              var e = a[l];
              if (e !== t && e.form === t.form) {
                var u = e[$t] || null;
                if (!u) throw Error(s(90));
                li(
                  e,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (l = 0; l < a.length; l++) ((e = a[l]), e.form === t.form && Cc(e));
          }
          break t;
        case "textarea":
          Bc(t, a.value, a.defaultValue);
          break t;
        case "select":
          ((l = a.value), l != null && Wa(t, !!a.multiple, l, !1));
      }
    }
  }
  var ii = !1;
  function Xc(t, l, a) {
    if (ii) return t(l, a);
    ii = !0;
    try {
      var e = t(l);
      return e;
    } finally {
      if (
        ((ii = !1),
        ($a !== null || ka !== null) &&
          (bn(), $a && ((l = $a), (t = ka), (ka = $a = null), Gc(l), t)))
      )
        for (l = 0; l < t.length; l++) Gc(t[l]);
    }
  }
  function Ce(t, l) {
    var a = t.stateNode;
    if (a === null) return null;
    var e = a[$t] || null;
    if (e === null) return null;
    a = e[l];
    t: switch (l) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((e = !e.disabled) ||
          ((t = t.type),
          (e = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
          (t = !e));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != "function") throw Error(s(231, l, typeof a));
    return a;
  }
  var ql = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    fi = !1;
  if (ql)
    try {
      var He = {};
      (Object.defineProperty(He, "passive", {
        get: function () {
          fi = !0;
        },
      }),
        window.addEventListener("test", He, He),
        window.removeEventListener("test", He, He));
    } catch {
      fi = !1;
    }
  var ta = null,
    ci = null,
    Nu = null;
  function Lc() {
    if (Nu) return Nu;
    var t,
      l = ci,
      a = l.length,
      e,
      u = "value" in ta ? ta.value : ta.textContent,
      n = u.length;
    for (t = 0; t < a && l[t] === u[t]; t++);
    var i = a - t;
    for (e = 1; e <= i && l[a - e] === u[n - e]; e++);
    return (Nu = u.slice(t, 1 < e ? 1 - e : void 0));
  }
  function Cu(t) {
    var l = t.keyCode;
    return (
      "charCode" in t ? ((t = t.charCode), t === 0 && l === 13 && (t = 13)) : (t = l),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Hu() {
    return !0;
  }
  function Qc() {
    return !1;
  }
  function kt(t) {
    function l(a, e, u, n, i) {
      ((this._reactName = a),
        (this._targetInst = u),
        (this.type = e),
        (this.nativeEvent = n),
        (this.target = i),
        (this.currentTarget = null));
      for (var f in t) t.hasOwnProperty(f) && ((a = t[f]), (this[f] = a ? a(n) : n[f]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Hu
          : Qc),
        (this.isPropagationStopped = Qc),
        this
      );
    }
    return (
      q(l.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = Hu));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = Hu));
        },
        persist: function () {},
        isPersistent: Hu,
      }),
      l
    );
  }
  var Ma = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Bu = kt(Ma),
    Be = q({}, Ma, { view: 0, detail: 0 }),
    Ir = kt(Be),
    si,
    oi,
    qe,
    qu = q({}, Be, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: mi,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== qe &&
              (qe && t.type === "mousemove"
                ? ((si = t.screenX - qe.screenX), (oi = t.screenY - qe.screenY))
                : (oi = si = 0),
              (qe = t)),
            si);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : oi;
      },
    }),
    Zc = kt(qu),
    tm = q({}, qu, { dataTransfer: 0 }),
    lm = kt(tm),
    am = q({}, Be, { relatedTarget: 0 }),
    ri = kt(am),
    em = q({}, Ma, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    um = kt(em),
    nm = q({}, Ma, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    im = kt(nm),
    fm = q({}, Ma, { data: 0 }),
    Vc = kt(fm),
    cm = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    sm = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    om = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function rm(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = om[t]) ? !!l[t] : !1;
  }
  function mi() {
    return rm;
  }
  var mm = q({}, Be, {
      key: function (t) {
        if (t.key) {
          var l = cm[t.key] || t.key;
          if (l !== "Unidentified") return l;
        }
        return t.type === "keypress"
          ? ((t = Cu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? sm[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: mi,
      charCode: function (t) {
        return t.type === "keypress" ? Cu(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Cu(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    hm = kt(mm),
    vm = q({}, qu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Kc = kt(vm),
    dm = q({}, Be, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: mi,
    }),
    ym = kt(dm),
    gm = q({}, Ma, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Sm = kt(gm),
    bm = q({}, qu, {
      deltaX: function (t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    pm = kt(bm),
    _m = q({}, Ma, { newState: 0, oldState: 0 }),
    Em = kt(_m),
    Tm = [9, 13, 27, 32],
    hi = ql && "CompositionEvent" in window,
    je = null;
  ql && "documentMode" in document && (je = document.documentMode);
  var Am = ql && "TextEvent" in window && !je,
    Jc = ql && (!hi || (je && 8 < je && 11 >= je)),
    wc = " ",
    Wc = !1;
  function Fc(t, l) {
    switch (t) {
      case "keyup":
        return Tm.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function $c(t) {
    return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
  }
  var Pa = !1;
  function zm(t, l) {
    switch (t) {
      case "compositionend":
        return $c(l);
      case "keypress":
        return l.which !== 32 ? null : ((Wc = !0), wc);
      case "textInput":
        return ((t = l.data), t === wc && Wc ? null : t);
      default:
        return null;
    }
  }
  function Mm(t, l) {
    if (Pa)
      return t === "compositionend" || (!hi && Fc(t, l))
        ? ((t = Lc()), (Nu = ci = ta = null), (Pa = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || (l.ctrlKey && l.altKey)) {
          if (l.char && 1 < l.char.length) return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return Jc && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var Dm = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function kc(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Dm[t.type] : l === "textarea";
  }
  function Pc(t, l, a, e) {
    ($a ? (ka ? ka.push(e) : (ka = [e])) : ($a = e),
      (l = Mn(l, "onChange")),
      0 < l.length &&
        ((a = new Bu("onChange", "change", null, a, e)), t.push({ event: a, listeners: l })));
  }
  var Ye = null,
    Ge = null;
  function Om(t) {
    B0(t, 0);
  }
  function ju(t) {
    var l = Ne(t);
    if (Cc(l)) return t;
  }
  function Ic(t, l) {
    if (t === "change") return l;
  }
  var ts = !1;
  if (ql) {
    var vi;
    if (ql) {
      var di = "oninput" in document;
      if (!di) {
        var ls = document.createElement("div");
        (ls.setAttribute("oninput", "return;"), (di = typeof ls.oninput == "function"));
      }
      vi = di;
    } else vi = !1;
    ts = vi && (!document.documentMode || 9 < document.documentMode);
  }
  function as() {
    Ye && (Ye.detachEvent("onpropertychange", es), (Ge = Ye = null));
  }
  function es(t) {
    if (t.propertyName === "value" && ju(Ge)) {
      var l = [];
      (Pc(l, Ge, t, ni(t)), Xc(Om, l));
    }
  }
  function Um(t, l, a) {
    t === "focusin"
      ? (as(), (Ye = l), (Ge = a), Ye.attachEvent("onpropertychange", es))
      : t === "focusout" && as();
  }
  function Rm(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") return ju(Ge);
  }
  function xm(t, l) {
    if (t === "click") return ju(l);
  }
  function Nm(t, l) {
    if (t === "input" || t === "change") return ju(l);
  }
  function Cm(t, l) {
    return (t === l && (t !== 0 || 1 / t === 1 / l)) || (t !== t && l !== l);
  }
  var fl = typeof Object.is == "function" ? Object.is : Cm;
  function Xe(t, l) {
    if (fl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null) return !1;
    var a = Object.keys(t),
      e = Object.keys(l);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!Jn.call(l, u) || !fl(t[u], l[u])) return !1;
    }
    return !0;
  }
  function us(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function ns(t, l) {
    var a = us(t);
    t = 0;
    for (var e; a; ) {
      if (a.nodeType === 3) {
        if (((e = t + a.textContent.length), t <= l && e >= l)) return { node: a, offset: l - t };
        t = e;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = us(a);
    }
  }
  function is(t, l) {
    return t && l
      ? t === l
        ? !0
        : t && t.nodeType === 3
          ? !1
          : l && l.nodeType === 3
            ? is(t, l.parentNode)
            : "contains" in t
              ? t.contains(l)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(l) & 16)
                : !1
      : !1;
  }
  function fs(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var l = Ru(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof l.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = l.contentWindow;
      else break;
      l = Ru(t.document);
    }
    return l;
  }
  function yi(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      l &&
      ((l === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        l === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var Hm = ql && "documentMode" in document && 11 >= document.documentMode,
    Ia = null,
    gi = null,
    Le = null,
    Si = !1;
  function cs(t, l, a) {
    var e = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Si ||
      Ia == null ||
      Ia !== Ru(e) ||
      ((e = Ia),
      "selectionStart" in e && yi(e)
        ? (e = { start: e.selectionStart, end: e.selectionEnd })
        : ((e = ((e.ownerDocument && e.ownerDocument.defaultView) || window).getSelection()),
          (e = {
            anchorNode: e.anchorNode,
            anchorOffset: e.anchorOffset,
            focusNode: e.focusNode,
            focusOffset: e.focusOffset,
          })),
      (Le && Xe(Le, e)) ||
        ((Le = e),
        (e = Mn(gi, "onSelect")),
        0 < e.length &&
          ((l = new Bu("onSelect", "select", null, l, a)),
          t.push({ event: l, listeners: e }),
          (l.target = Ia))));
  }
  function Da(t, l) {
    var a = {};
    return (
      (a[t.toLowerCase()] = l.toLowerCase()),
      (a["Webkit" + t] = "webkit" + l),
      (a["Moz" + t] = "moz" + l),
      a
    );
  }
  var te = {
      animationend: Da("Animation", "AnimationEnd"),
      animationiteration: Da("Animation", "AnimationIteration"),
      animationstart: Da("Animation", "AnimationStart"),
      transitionrun: Da("Transition", "TransitionRun"),
      transitionstart: Da("Transition", "TransitionStart"),
      transitioncancel: Da("Transition", "TransitionCancel"),
      transitionend: Da("Transition", "TransitionEnd"),
    },
    bi = {},
    ss = {};
  ql &&
    ((ss = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete te.animationend.animation,
      delete te.animationiteration.animation,
      delete te.animationstart.animation),
    "TransitionEvent" in window || delete te.transitionend.transition);
  function Oa(t) {
    if (bi[t]) return bi[t];
    if (!te[t]) return t;
    var l = te[t],
      a;
    for (a in l) if (l.hasOwnProperty(a) && a in ss) return (bi[t] = l[a]);
    return t;
  }
  var os = Oa("animationend"),
    rs = Oa("animationiteration"),
    ms = Oa("animationstart"),
    Bm = Oa("transitionrun"),
    qm = Oa("transitionstart"),
    jm = Oa("transitioncancel"),
    hs = Oa("transitionend"),
    vs = new Map(),
    pi =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  pi.push("scrollEnd");
  function Ml(t, l) {
    (vs.set(t, l), za(l, [t]));
  }
  var Yu =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var l = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" && t !== null && typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(l)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    Sl = [],
    le = 0,
    _i = 0;
  function Gu() {
    for (var t = le, l = (_i = le = 0); l < t; ) {
      var a = Sl[l];
      Sl[l++] = null;
      var e = Sl[l];
      Sl[l++] = null;
      var u = Sl[l];
      Sl[l++] = null;
      var n = Sl[l];
      if (((Sl[l++] = null), e !== null && u !== null)) {
        var i = e.pending;
        (i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)), (e.pending = u));
      }
      n !== 0 && ds(a, u, n);
    }
  }
  function Xu(t, l, a, e) {
    ((Sl[le++] = t),
      (Sl[le++] = l),
      (Sl[le++] = a),
      (Sl[le++] = e),
      (_i |= e),
      (t.lanes |= e),
      (t = t.alternate),
      t !== null && (t.lanes |= e));
  }
  function Ei(t, l, a, e) {
    return (Xu(t, l, a, e), Lu(t));
  }
  function Ua(t, l) {
    return (Xu(t, null, null, l), Lu(t));
  }
  function ds(t, l, a) {
    t.lanes |= a;
    var e = t.alternate;
    e !== null && (e.lanes |= a);
    for (var u = !1, n = t.return; n !== null; )
      ((n.childLanes |= a),
        (e = n.alternate),
        e !== null && (e.childLanes |= a),
        n.tag === 22 && ((t = n.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = n),
        (n = n.return));
    return t.tag === 3
      ? ((n = t.stateNode),
        u &&
          l !== null &&
          ((u = 31 - il(a)),
          (t = n.hiddenUpdates),
          (e = t[u]),
          e === null ? (t[u] = [l]) : e.push(l),
          (l.lane = a | 536870912)),
        n)
      : null;
  }
  function Lu(t) {
    if (50 < su) throw ((su = 0), (Nf = null), Error(s(185)));
    for (var l = t.return; l !== null; ) ((t = l), (l = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var ae = {};
  function Ym(t, l, a, e) {
    ((this.tag = t),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = l),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = e),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function cl(t, l, a, e) {
    return new Ym(t, l, a, e);
  }
  function Ti(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function jl(t, l) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = cl(t.tag, l, t.key, t.mode)),
          (a.elementType = t.elementType),
          (a.type = t.type),
          (a.stateNode = t.stateNode),
          (a.alternate = t),
          (t.alternate = a))
        : ((a.pendingProps = l),
          (a.type = t.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = t.flags & 65011712),
      (a.childLanes = t.childLanes),
      (a.lanes = t.lanes),
      (a.child = t.child),
      (a.memoizedProps = t.memoizedProps),
      (a.memoizedState = t.memoizedState),
      (a.updateQueue = t.updateQueue),
      (l = t.dependencies),
      (a.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }),
      (a.sibling = t.sibling),
      (a.index = t.index),
      (a.ref = t.ref),
      (a.refCleanup = t.refCleanup),
      a
    );
  }
  function ys(t, l) {
    t.flags &= 65011714;
    var a = t.alternate;
    return (
      a === null
        ? ((t.childLanes = 0),
          (t.lanes = l),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = a.childLanes),
          (t.lanes = a.lanes),
          (t.child = a.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = a.memoizedProps),
          (t.memoizedState = a.memoizedState),
          (t.updateQueue = a.updateQueue),
          (t.type = a.type),
          (l = a.dependencies),
          (t.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext })),
      t
    );
  }
  function Qu(t, l, a, e, u, n) {
    var i = 0;
    if (((e = t), typeof t == "function")) Ti(t) && (i = 1);
    else if (typeof t == "string")
      i = Zh(t, a, x.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case dl:
          return ((t = cl(31, a, l, u)), (t.elementType = dl), (t.lanes = n), t);
        case Nt:
          return Ra(a.children, u, n, l);
        case vl:
          ((i = 8), (u |= 24));
          break;
        case Kt:
          return ((t = cl(12, a, l, u | 2)), (t.elementType = Kt), (t.lanes = n), t);
        case bt:
          return ((t = cl(13, a, l, u)), (t.elementType = bt), (t.lanes = n), t);
        case Lt:
          return ((t = cl(19, a, l, u)), (t.elementType = Lt), (t.lanes = n), t);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case zt:
                i = 10;
                break t;
              case Jt:
                i = 9;
                break t;
              case Ft:
                i = 11;
                break t;
              case w:
                i = 14;
                break t;
              case Qt:
                ((i = 16), (e = null));
                break t;
            }
          ((i = 29), (a = Error(s(130, t === null ? "null" : typeof t, ""))), (e = null));
      }
    return ((l = cl(i, a, l, u)), (l.elementType = t), (l.type = e), (l.lanes = n), l);
  }
  function Ra(t, l, a, e) {
    return ((t = cl(7, t, e, l)), (t.lanes = a), t);
  }
  function Ai(t, l, a) {
    return ((t = cl(6, t, null, l)), (t.lanes = a), t);
  }
  function gs(t) {
    var l = cl(18, null, null, 0);
    return ((l.stateNode = t), l);
  }
  function zi(t, l, a) {
    return (
      (l = cl(4, t.children !== null ? t.children : [], t.key, l)),
      (l.lanes = a),
      (l.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      l
    );
  }
  var Ss = new WeakMap();
  function bl(t, l) {
    if (typeof t == "object" && t !== null) {
      var a = Ss.get(t);
      return a !== void 0 ? a : ((l = { value: t, source: l, stack: gc(l) }), Ss.set(t, l), l);
    }
    return { value: t, source: l, stack: gc(l) };
  }
  var ee = [],
    ue = 0,
    Zu = null,
    Qe = 0,
    pl = [],
    _l = 0,
    la = null,
    Rl = 1,
    xl = "";
  function Yl(t, l) {
    ((ee[ue++] = Qe), (ee[ue++] = Zu), (Zu = t), (Qe = l));
  }
  function bs(t, l, a) {
    ((pl[_l++] = Rl), (pl[_l++] = xl), (pl[_l++] = la), (la = t));
    var e = Rl;
    t = xl;
    var u = 32 - il(e) - 1;
    ((e &= ~(1 << u)), (a += 1));
    var n = 32 - il(l) + u;
    if (30 < n) {
      var i = u - (u % 5);
      ((n = (e & ((1 << i) - 1)).toString(32)),
        (e >>= i),
        (u -= i),
        (Rl = (1 << (32 - il(l) + u)) | (a << u) | e),
        (xl = n + t));
    } else ((Rl = (1 << n) | (a << u) | e), (xl = t));
  }
  function Mi(t) {
    t.return !== null && (Yl(t, 1), bs(t, 1, 0));
  }
  function Di(t) {
    for (; t === Zu; ) ((Zu = ee[--ue]), (ee[ue] = null), (Qe = ee[--ue]), (ee[ue] = null));
    for (; t === la; )
      ((la = pl[--_l]),
        (pl[_l] = null),
        (xl = pl[--_l]),
        (pl[_l] = null),
        (Rl = pl[--_l]),
        (pl[_l] = null));
  }
  function ps(t, l) {
    ((pl[_l++] = Rl), (pl[_l++] = xl), (pl[_l++] = la), (Rl = l.id), (xl = l.overflow), (la = t));
  }
  var qt = null,
    vt = null,
    I = !1,
    aa = null,
    El = !1,
    Oi = Error(s(519));
  function ea(t) {
    var l = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""),
    );
    throw (Ze(bl(l, t)), Oi);
  }
  function _s(t) {
    var l = t.stateNode,
      a = t.type,
      e = t.memoizedProps;
    switch (((l[Bt] = t), (l[$t] = e), a)) {
      case "dialog":
        ($("cancel", l), $("close", l));
        break;
      case "iframe":
      case "object":
      case "embed":
        $("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ru.length; a++) $(ru[a], l);
        break;
      case "source":
        $("error", l);
        break;
      case "img":
      case "image":
      case "link":
        ($("error", l), $("load", l));
        break;
      case "details":
        $("toggle", l);
        break;
      case "input":
        ($("invalid", l),
          Hc(l, e.value, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name, !0));
        break;
      case "select":
        $("invalid", l);
        break;
      case "textarea":
        ($("invalid", l), qc(l, e.value, e.defaultValue, e.children));
    }
    ((a = e.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      l.textContent === "" + a ||
      e.suppressHydrationWarning === !0 ||
      G0(l.textContent, a)
        ? (e.popover != null && ($("beforetoggle", l), $("toggle", l)),
          e.onScroll != null && $("scroll", l),
          e.onScrollEnd != null && $("scrollend", l),
          e.onClick != null && (l.onclick = Bl),
          (l = !0))
        : (l = !1),
      l || ea(t, !0));
  }
  function Es(t) {
    for (qt = t.return; qt; )
      switch (qt.tag) {
        case 5:
        case 31:
        case 13:
          El = !1;
          return;
        case 27:
        case 3:
          El = !0;
          return;
        default:
          qt = qt.return;
      }
  }
  function ne(t) {
    if (t !== qt) return !1;
    if (!I) return (Es(t), (I = !0), !1);
    var l = t.tag,
      a;
    if (
      ((a = l !== 3 && l !== 27) &&
        ((a = l === 5) &&
          ((a = t.type), (a = !(a !== "form" && a !== "button") || wf(t.type, t.memoizedProps))),
        (a = !a)),
      a && vt && ea(t),
      Es(t),
      l === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      vt = W0(t);
    } else if (l === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      vt = W0(t);
    } else
      l === 27
        ? ((l = vt), ga(t.type) ? ((t = Pf), (Pf = null), (vt = t)) : (vt = l))
        : (vt = qt ? Al(t.stateNode.nextSibling) : null);
    return !0;
  }
  function xa() {
    ((vt = qt = null), (I = !1));
  }
  function Ui() {
    var t = aa;
    return (t !== null && (ll === null ? (ll = t) : ll.push.apply(ll, t), (aa = null)), t);
  }
  function Ze(t) {
    aa === null ? (aa = [t]) : aa.push(t);
  }
  var Ri = r(null),
    Na = null,
    Gl = null;
  function ua(t, l, a) {
    (R(Ri, l._currentValue), (l._currentValue = a));
  }
  function Xl(t) {
    ((t._currentValue = Ri.current), A(Ri));
  }
  function xi(t, l, a) {
    for (; t !== null; ) {
      var e = t.alternate;
      if (
        ((t.childLanes & l) !== l
          ? ((t.childLanes |= l), e !== null && (e.childLanes |= l))
          : e !== null && (e.childLanes & l) !== l && (e.childLanes |= l),
        t === a)
      )
        break;
      t = t.return;
    }
  }
  function Ni(t, l, a, e) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var f = n;
          n = u;
          for (var c = 0; c < l.length; c++)
            if (f.context === l[c]) {
              ((n.lanes |= a),
                (f = n.alternate),
                f !== null && (f.lanes |= a),
                xi(n.return, a, t),
                e || (i = null));
              break t;
            }
          n = f.next;
        }
      } else if (u.tag === 18) {
        if (((i = u.return), i === null)) throw Error(s(341));
        ((i.lanes |= a), (n = i.alternate), n !== null && (n.lanes |= a), xi(i, a, t), (i = null));
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (((u = i.sibling), u !== null)) {
            ((u.return = i.return), (i = u));
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function ie(t, l, a, e) {
    t = null;
    for (var u = l, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(s(387));
        if (((i = i.memoizedProps), i !== null)) {
          var f = u.type;
          fl(u.pendingProps.value, i.value) || (t !== null ? t.push(f) : (t = [f]));
        }
      } else if (u === nt.current) {
        if (((i = u.alternate), i === null)) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(yu) : (t = [yu]));
      }
      u = u.return;
    }
    (t !== null && Ni(l, t, a, e), (l.flags |= 262144));
  }
  function Vu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!fl(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Ca(t) {
    ((Na = t), (Gl = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function jt(t) {
    return Ts(Na, t);
  }
  function Ku(t, l) {
    return (Na === null && Ca(t), Ts(t, l));
  }
  function Ts(t, l) {
    var a = l._currentValue;
    if (((l = { context: l, memoizedValue: a, next: null }), Gl === null)) {
      if (t === null) throw Error(s(308));
      ((Gl = l), (t.dependencies = { lanes: 0, firstContext: l }), (t.flags |= 524288));
    } else Gl = Gl.next = l;
    return a;
  }
  var Gm =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              l = (this.signal = {
                aborted: !1,
                addEventListener: function (a, e) {
                  t.push(e);
                },
              });
            this.abort = function () {
              ((l.aborted = !0),
                t.forEach(function (a) {
                  return a();
                }));
            };
          },
    Xm = M.unstable_scheduleCallback,
    Lm = M.unstable_NormalPriority,
    Mt = {
      $$typeof: zt,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Ci() {
    return { controller: new Gm(), data: new Map(), refCount: 0 };
  }
  function Ve(t) {
    (t.refCount--,
      t.refCount === 0 &&
        Xm(Lm, function () {
          t.controller.abort();
        }));
  }
  var Ke = null,
    Hi = 0,
    fe = 0,
    ce = null;
  function Qm(t, l) {
    if (Ke === null) {
      var a = (Ke = []);
      ((Hi = 0),
        (fe = Yf()),
        (ce = {
          status: "pending",
          value: void 0,
          then: function (e) {
            a.push(e);
          },
        }));
    }
    return (Hi++, l.then(As, As), l);
  }
  function As() {
    if (--Hi === 0 && Ke !== null) {
      ce !== null && (ce.status = "fulfilled");
      var t = Ke;
      ((Ke = null), (fe = 0), (ce = null));
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Zm(t, l) {
    var a = [],
      e = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          a.push(u);
        },
      };
    return (
      t.then(
        function () {
          ((e.status = "fulfilled"), (e.value = l));
          for (var u = 0; u < a.length; u++) (0, a[u])(l);
        },
        function (u) {
          for (e.status = "rejected", e.reason = u, u = 0; u < a.length; u++) (0, a[u])(void 0);
        },
      ),
      e
    );
  }
  var zs = S.S;
  S.S = function (t, l) {
    ((s0 = ul()),
      typeof l == "object" && l !== null && typeof l.then == "function" && Qm(t, l),
      zs !== null && zs(t, l));
  };
  var Ha = r(null);
  function Bi() {
    var t = Ha.current;
    return t !== null ? t : ht.pooledCache;
  }
  function Ju(t, l) {
    l === null ? R(Ha, Ha.current) : R(Ha, l.pool);
  }
  function Ms() {
    var t = Bi();
    return t === null ? null : { parent: Mt._currentValue, pool: t };
  }
  var se = Error(s(460)),
    qi = Error(s(474)),
    wu = Error(s(542)),
    Wu = { then: function () {} };
  function Ds(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function Os(t, l, a) {
    switch (
      ((a = t[a]), a === void 0 ? t.push(l) : a !== l && (l.then(Bl, Bl), (l = a)), l.status)
    ) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw ((t = l.reason), Rs(t), t);
      default:
        if (typeof l.status == "string") l.then(Bl, Bl);
        else {
          if (((t = ht), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
          ((t = l),
            (t.status = "pending"),
            t.then(
              function (e) {
                if (l.status === "pending") {
                  var u = l;
                  ((u.status = "fulfilled"), (u.value = e));
                }
              },
              function (e) {
                if (l.status === "pending") {
                  var u = l;
                  ((u.status = "rejected"), (u.reason = e));
                }
              },
            ));
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw ((t = l.reason), Rs(t), t);
        }
        throw ((qa = l), se);
    }
  }
  function Ba(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((qa = a), se) : a;
    }
  }
  var qa = null;
  function Us() {
    if (qa === null) throw Error(s(459));
    var t = qa;
    return ((qa = null), t);
  }
  function Rs(t) {
    if (t === se || t === wu) throw Error(s(483));
  }
  var oe = null,
    Je = 0;
  function Fu(t) {
    var l = Je;
    return ((Je += 1), oe === null && (oe = []), Os(oe, t, l));
  }
  function we(t, l) {
    ((l = l.props.ref), (t.ref = l !== void 0 ? l : null));
  }
  function $u(t, l) {
    throw l.$$typeof === mt
      ? Error(s(525))
      : ((t = Object.prototype.toString.call(l)),
        Error(
          s(
            31,
            t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t,
          ),
        ));
  }
  function xs(t) {
    function l(m, o) {
      if (t) {
        var v = m.deletions;
        v === null ? ((m.deletions = [o]), (m.flags |= 16)) : v.push(o);
      }
    }
    function a(m, o) {
      if (!t) return null;
      for (; o !== null; ) (l(m, o), (o = o.sibling));
      return null;
    }
    function e(m) {
      for (var o = new Map(); m !== null; )
        (m.key !== null ? o.set(m.key, m) : o.set(m.index, m), (m = m.sibling));
      return o;
    }
    function u(m, o) {
      return ((m = jl(m, o)), (m.index = 0), (m.sibling = null), m);
    }
    function n(m, o, v) {
      return (
        (m.index = v),
        t
          ? ((v = m.alternate),
            v !== null
              ? ((v = v.index), v < o ? ((m.flags |= 67108866), o) : v)
              : ((m.flags |= 67108866), o))
          : ((m.flags |= 1048576), o)
      );
    }
    function i(m) {
      return (t && m.alternate === null && (m.flags |= 67108866), m);
    }
    function f(m, o, v, _) {
      return o === null || o.tag !== 6
        ? ((o = Ai(v, m.mode, _)), (o.return = m), o)
        : ((o = u(o, v)), (o.return = m), o);
    }
    function c(m, o, v, _) {
      var Y = v.type;
      return Y === Nt
        ? p(m, o, v.props.children, _, v.key)
        : o !== null &&
            (o.elementType === Y ||
              (typeof Y == "object" && Y !== null && Y.$$typeof === Qt && Ba(Y) === o.type))
          ? ((o = u(o, v.props)), we(o, v), (o.return = m), o)
          : ((o = Qu(v.type, v.key, v.props, null, m.mode, _)), we(o, v), (o.return = m), o);
    }
    function d(m, o, v, _) {
      return o === null ||
        o.tag !== 4 ||
        o.stateNode.containerInfo !== v.containerInfo ||
        o.stateNode.implementation !== v.implementation
        ? ((o = zi(v, m.mode, _)), (o.return = m), o)
        : ((o = u(o, v.children || [])), (o.return = m), o);
    }
    function p(m, o, v, _, Y) {
      return o === null || o.tag !== 7
        ? ((o = Ra(v, m.mode, _, Y)), (o.return = m), o)
        : ((o = u(o, v)), (o.return = m), o);
    }
    function T(m, o, v) {
      if ((typeof o == "string" && o !== "") || typeof o == "number" || typeof o == "bigint")
        return ((o = Ai("" + o, m.mode, v)), (o.return = m), o);
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case xt:
            return ((v = Qu(o.type, o.key, o.props, null, m.mode, v)), we(v, o), (v.return = m), v);
          case Xt:
            return ((o = zi(o, m.mode, v)), (o.return = m), o);
          case Qt:
            return ((o = Ba(o)), T(m, o, v));
        }
        if (it(o) || Zt(o)) return ((o = Ra(o, m.mode, v, null)), (o.return = m), o);
        if (typeof o.then == "function") return T(m, Fu(o), v);
        if (o.$$typeof === zt) return T(m, Ku(m, o), v);
        $u(m, o);
      }
      return null;
    }
    function y(m, o, v, _) {
      var Y = o !== null ? o.key : null;
      if ((typeof v == "string" && v !== "") || typeof v == "number" || typeof v == "bigint")
        return Y !== null ? null : f(m, o, "" + v, _);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case xt:
            return v.key === Y ? c(m, o, v, _) : null;
          case Xt:
            return v.key === Y ? d(m, o, v, _) : null;
          case Qt:
            return ((v = Ba(v)), y(m, o, v, _));
        }
        if (it(v) || Zt(v)) return Y !== null ? null : p(m, o, v, _, null);
        if (typeof v.then == "function") return y(m, o, Fu(v), _);
        if (v.$$typeof === zt) return y(m, o, Ku(m, v), _);
        $u(m, v);
      }
      return null;
    }
    function g(m, o, v, _, Y) {
      if ((typeof _ == "string" && _ !== "") || typeof _ == "number" || typeof _ == "bigint")
        return ((m = m.get(v) || null), f(o, m, "" + _, Y));
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case xt:
            return ((m = m.get(_.key === null ? v : _.key) || null), c(o, m, _, Y));
          case Xt:
            return ((m = m.get(_.key === null ? v : _.key) || null), d(o, m, _, Y));
          case Qt:
            return ((_ = Ba(_)), g(m, o, v, _, Y));
        }
        if (it(_) || Zt(_)) return ((m = m.get(v) || null), p(o, m, _, Y, null));
        if (typeof _.then == "function") return g(m, o, v, Fu(_), Y);
        if (_.$$typeof === zt) return g(m, o, v, Ku(o, _), Y);
        $u(o, _);
      }
      return null;
    }
    function H(m, o, v, _) {
      for (var Y = null, tt = null, j = o, K = (o = 0), P = null; j !== null && K < v.length; K++) {
        j.index > K ? ((P = j), (j = null)) : (P = j.sibling);
        var lt = y(m, j, v[K], _);
        if (lt === null) {
          j === null && (j = P);
          break;
        }
        (t && j && lt.alternate === null && l(m, j),
          (o = n(lt, o, K)),
          tt === null ? (Y = lt) : (tt.sibling = lt),
          (tt = lt),
          (j = P));
      }
      if (K === v.length) return (a(m, j), I && Yl(m, K), Y);
      if (j === null) {
        for (; K < v.length; K++)
          ((j = T(m, v[K], _)),
            j !== null && ((o = n(j, o, K)), tt === null ? (Y = j) : (tt.sibling = j), (tt = j)));
        return (I && Yl(m, K), Y);
      }
      for (j = e(j); K < v.length; K++)
        ((P = g(j, m, K, v[K], _)),
          P !== null &&
            (t && P.alternate !== null && j.delete(P.key === null ? K : P.key),
            (o = n(P, o, K)),
            tt === null ? (Y = P) : (tt.sibling = P),
            (tt = P)));
      return (
        t &&
          j.forEach(function (Ea) {
            return l(m, Ea);
          }),
        I && Yl(m, K),
        Y
      );
    }
    function G(m, o, v, _) {
      if (v == null) throw Error(s(151));
      for (
        var Y = null, tt = null, j = o, K = (o = 0), P = null, lt = v.next();
        j !== null && !lt.done;
        K++, lt = v.next()
      ) {
        j.index > K ? ((P = j), (j = null)) : (P = j.sibling);
        var Ea = y(m, j, lt.value, _);
        if (Ea === null) {
          j === null && (j = P);
          break;
        }
        (t && j && Ea.alternate === null && l(m, j),
          (o = n(Ea, o, K)),
          tt === null ? (Y = Ea) : (tt.sibling = Ea),
          (tt = Ea),
          (j = P));
      }
      if (lt.done) return (a(m, j), I && Yl(m, K), Y);
      if (j === null) {
        for (; !lt.done; K++, lt = v.next())
          ((lt = T(m, lt.value, _)),
            lt !== null &&
              ((o = n(lt, o, K)), tt === null ? (Y = lt) : (tt.sibling = lt), (tt = lt)));
        return (I && Yl(m, K), Y);
      }
      for (j = e(j); !lt.done; K++, lt = v.next())
        ((lt = g(j, m, K, lt.value, _)),
          lt !== null &&
            (t && lt.alternate !== null && j.delete(lt.key === null ? K : lt.key),
            (o = n(lt, o, K)),
            tt === null ? (Y = lt) : (tt.sibling = lt),
            (tt = lt)));
      return (
        t &&
          j.forEach(function (tv) {
            return l(m, tv);
          }),
        I && Yl(m, K),
        Y
      );
    }
    function rt(m, o, v, _) {
      if (
        (typeof v == "object" &&
          v !== null &&
          v.type === Nt &&
          v.key === null &&
          (v = v.props.children),
        typeof v == "object" && v !== null)
      ) {
        switch (v.$$typeof) {
          case xt:
            t: {
              for (var Y = v.key; o !== null; ) {
                if (o.key === Y) {
                  if (((Y = v.type), Y === Nt)) {
                    if (o.tag === 7) {
                      (a(m, o.sibling), (_ = u(o, v.props.children)), (_.return = m), (m = _));
                      break t;
                    }
                  } else if (
                    o.elementType === Y ||
                    (typeof Y == "object" && Y !== null && Y.$$typeof === Qt && Ba(Y) === o.type)
                  ) {
                    (a(m, o.sibling), (_ = u(o, v.props)), we(_, v), (_.return = m), (m = _));
                    break t;
                  }
                  a(m, o);
                  break;
                } else l(m, o);
                o = o.sibling;
              }
              v.type === Nt
                ? ((_ = Ra(v.props.children, m.mode, _, v.key)), (_.return = m), (m = _))
                : ((_ = Qu(v.type, v.key, v.props, null, m.mode, _)),
                  we(_, v),
                  (_.return = m),
                  (m = _));
            }
            return i(m);
          case Xt:
            t: {
              for (Y = v.key; o !== null; ) {
                if (o.key === Y)
                  if (
                    o.tag === 4 &&
                    o.stateNode.containerInfo === v.containerInfo &&
                    o.stateNode.implementation === v.implementation
                  ) {
                    (a(m, o.sibling), (_ = u(o, v.children || [])), (_.return = m), (m = _));
                    break t;
                  } else {
                    a(m, o);
                    break;
                  }
                else l(m, o);
                o = o.sibling;
              }
              ((_ = zi(v, m.mode, _)), (_.return = m), (m = _));
            }
            return i(m);
          case Qt:
            return ((v = Ba(v)), rt(m, o, v, _));
        }
        if (it(v)) return H(m, o, v, _);
        if (Zt(v)) {
          if (((Y = Zt(v)), typeof Y != "function")) throw Error(s(150));
          return ((v = Y.call(v)), G(m, o, v, _));
        }
        if (typeof v.then == "function") return rt(m, o, Fu(v), _);
        if (v.$$typeof === zt) return rt(m, o, Ku(m, v), _);
        $u(m, v);
      }
      return (typeof v == "string" && v !== "") || typeof v == "number" || typeof v == "bigint"
        ? ((v = "" + v),
          o !== null && o.tag === 6
            ? (a(m, o.sibling), (_ = u(o, v)), (_.return = m), (m = _))
            : (a(m, o), (_ = Ai(v, m.mode, _)), (_.return = m), (m = _)),
          i(m))
        : a(m, o);
    }
    return function (m, o, v, _) {
      try {
        Je = 0;
        var Y = rt(m, o, v, _);
        return ((oe = null), Y);
      } catch (j) {
        if (j === se || j === wu) throw j;
        var tt = cl(29, j, null, m.mode);
        return ((tt.lanes = _), (tt.return = m), tt);
      }
    };
  }
  var ja = xs(!0),
    Ns = xs(!1),
    na = !1;
  function ji(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Yi(t, l) {
    ((t = t.updateQueue),
      l.updateQueue === t &&
        (l.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function ia(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function fa(t, l, a) {
    var e = t.updateQueue;
    if (e === null) return null;
    if (((e = e.shared), (at & 2) !== 0)) {
      var u = e.pending;
      return (
        u === null ? (l.next = l) : ((l.next = u.next), (u.next = l)),
        (e.pending = l),
        (l = Lu(t)),
        ds(t, null, a),
        l
      );
    }
    return (Xu(t, e, l, a), Lu(t));
  }
  function We(t, l, a) {
    if (((l = l.updateQueue), l !== null && ((l = l.shared), (a & 4194048) !== 0))) {
      var e = l.lanes;
      ((e &= t.pendingLanes), (a |= e), (l.lanes = a), Tc(t, a));
    }
  }
  function Gi(t, l) {
    var a = t.updateQueue,
      e = t.alternate;
    if (e !== null && ((e = e.updateQueue), a === e)) {
      var u = null,
        n = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var i = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (n === null ? (u = n = i) : (n = n.next = i), (a = a.next));
        } while (a !== null);
        n === null ? (u = n = l) : (n = n.next = l);
      } else u = n = l;
      ((a = {
        baseState: e.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: e.shared,
        callbacks: e.callbacks,
      }),
        (t.updateQueue = a));
      return;
    }
    ((t = a.lastBaseUpdate),
      t === null ? (a.firstBaseUpdate = l) : (t.next = l),
      (a.lastBaseUpdate = l));
  }
  var Xi = !1;
  function Fe() {
    if (Xi) {
      var t = ce;
      if (t !== null) throw t;
    }
  }
  function $e(t, l, a, e) {
    Xi = !1;
    var u = t.updateQueue;
    na = !1;
    var n = u.firstBaseUpdate,
      i = u.lastBaseUpdate,
      f = u.shared.pending;
    if (f !== null) {
      u.shared.pending = null;
      var c = f,
        d = c.next;
      ((c.next = null), i === null ? (n = d) : (i.next = d), (i = c));
      var p = t.alternate;
      p !== null &&
        ((p = p.updateQueue),
        (f = p.lastBaseUpdate),
        f !== i && (f === null ? (p.firstBaseUpdate = d) : (f.next = d), (p.lastBaseUpdate = c)));
    }
    if (n !== null) {
      var T = u.baseState;
      ((i = 0), (p = d = c = null), (f = n));
      do {
        var y = f.lane & -536870913,
          g = y !== f.lane;
        if (g ? (k & y) === y : (e & y) === y) {
          (y !== 0 && y === fe && (Xi = !0),
            p !== null &&
              (p = p.next =
                { lane: 0, tag: f.tag, payload: f.payload, callback: null, next: null }));
          t: {
            var H = t,
              G = f;
            y = l;
            var rt = a;
            switch (G.tag) {
              case 1:
                if (((H = G.payload), typeof H == "function")) {
                  T = H.call(rt, T, y);
                  break t;
                }
                T = H;
                break t;
              case 3:
                H.flags = (H.flags & -65537) | 128;
              case 0:
                if (
                  ((H = G.payload), (y = typeof H == "function" ? H.call(rt, T, y) : H), y == null)
                )
                  break t;
                T = q({}, T, y);
                break t;
              case 2:
                na = !0;
            }
          }
          ((y = f.callback),
            y !== null &&
              ((t.flags |= 64),
              g && (t.flags |= 8192),
              (g = u.callbacks),
              g === null ? (u.callbacks = [y]) : g.push(y)));
        } else
          ((g = { lane: y, tag: f.tag, payload: f.payload, callback: f.callback, next: null }),
            p === null ? ((d = p = g), (c = T)) : (p = p.next = g),
            (i |= y));
        if (((f = f.next), f === null)) {
          if (((f = u.shared.pending), f === null)) break;
          ((g = f),
            (f = g.next),
            (g.next = null),
            (u.lastBaseUpdate = g),
            (u.shared.pending = null));
        }
      } while (!0);
      (p === null && (c = T),
        (u.baseState = c),
        (u.firstBaseUpdate = d),
        (u.lastBaseUpdate = p),
        n === null && (u.shared.lanes = 0),
        (ma |= i),
        (t.lanes = i),
        (t.memoizedState = T));
    }
  }
  function Cs(t, l) {
    if (typeof t != "function") throw Error(s(191, t));
    t.call(l);
  }
  function Hs(t, l) {
    var a = t.callbacks;
    if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) Cs(a[t], l);
  }
  var re = r(null),
    ku = r(0);
  function Bs(t, l) {
    ((t = Fl), R(ku, t), R(re, l), (Fl = t | l.baseLanes));
  }
  function Li() {
    (R(ku, Fl), R(re, re.current));
  }
  function Qi() {
    ((Fl = ku.current), A(re), A(ku));
  }
  var sl = r(null),
    Tl = null;
  function ca(t) {
    var l = t.alternate;
    (R(Tt, Tt.current & 1),
      R(sl, t),
      Tl === null && (l === null || re.current !== null || l.memoizedState !== null) && (Tl = t));
  }
  function Zi(t) {
    (R(Tt, Tt.current), R(sl, t), Tl === null && (Tl = t));
  }
  function qs(t) {
    t.tag === 22 ? (R(Tt, Tt.current), R(sl, t), Tl === null && (Tl = t)) : sa();
  }
  function sa() {
    (R(Tt, Tt.current), R(sl, sl.current));
  }
  function ol(t) {
    (A(sl), Tl === t && (Tl = null), A(Tt));
  }
  var Tt = r(0);
  function Pu(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var a = l.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || $f(a) || kf(a))) return l;
      } else if (
        l.tag === 19 &&
        (l.memoizedProps.revealOrder === "forwards" ||
          l.memoizedProps.revealOrder === "backwards" ||
          l.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          l.memoizedProps.revealOrder === "together")
      ) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        ((l.child.return = l), (l = l.child));
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      ((l.sibling.return = l.return), (l = l.sibling));
    }
    return null;
  }
  var Ll = 0,
    V = null,
    st = null,
    Dt = null,
    Iu = !1,
    me = !1,
    Ya = !1,
    tn = 0,
    ke = 0,
    he = null,
    Vm = 0;
  function pt() {
    throw Error(s(321));
  }
  function Vi(t, l) {
    if (l === null) return !1;
    for (var a = 0; a < l.length && a < t.length; a++) if (!fl(t[a], l[a])) return !1;
    return !0;
  }
  function Ki(t, l, a, e, u, n) {
    return (
      (Ll = n),
      (V = l),
      (l.memoizedState = null),
      (l.updateQueue = null),
      (l.lanes = 0),
      (S.H = t === null || t.memoizedState === null ? po : ff),
      (Ya = !1),
      (n = a(e, u)),
      (Ya = !1),
      me && (n = Ys(l, a, e, u)),
      js(t),
      n
    );
  }
  function js(t) {
    S.H = tu;
    var l = st !== null && st.next !== null;
    if (((Ll = 0), (Dt = st = V = null), (Iu = !1), (ke = 0), (he = null), l)) throw Error(s(300));
    t === null || Ot || ((t = t.dependencies), t !== null && Vu(t) && (Ot = !0));
  }
  function Ys(t, l, a, e) {
    V = t;
    var u = 0;
    do {
      if ((me && (he = null), (ke = 0), (me = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (Dt = st = null), t.updateQueue != null)) {
        var n = t.updateQueue;
        ((n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0));
      }
      ((S.H = _o), (n = l(a, e)));
    } while (me);
    return n;
  }
  function Km() {
    var t = S.H,
      l = t.useState()[0];
    return (
      (l = typeof l.then == "function" ? Pe(l) : l),
      (t = t.useState()[0]),
      (st !== null ? st.memoizedState : null) !== t && (V.flags |= 1024),
      l
    );
  }
  function Ji() {
    var t = tn !== 0;
    return ((tn = 0), t);
  }
  function wi(t, l, a) {
    ((l.updateQueue = t.updateQueue), (l.flags &= -2053), (t.lanes &= ~a));
  }
  function Wi(t) {
    if (Iu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        (l !== null && (l.pending = null), (t = t.next));
      }
      Iu = !1;
    }
    ((Ll = 0), (Dt = st = V = null), (me = !1), (ke = tn = 0), (he = null));
  }
  function Wt() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Dt === null ? (V.memoizedState = Dt = t) : (Dt = Dt.next = t), Dt);
  }
  function At() {
    if (st === null) {
      var t = V.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = st.next;
    var l = Dt === null ? V.memoizedState : Dt.next;
    if (l !== null) ((Dt = l), (st = t));
    else {
      if (t === null) throw V.alternate === null ? Error(s(467)) : Error(s(310));
      ((st = t),
        (t = {
          memoizedState: st.memoizedState,
          baseState: st.baseState,
          baseQueue: st.baseQueue,
          queue: st.queue,
          next: null,
        }),
        Dt === null ? (V.memoizedState = Dt = t) : (Dt = Dt.next = t));
    }
    return Dt;
  }
  function ln() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pe(t) {
    var l = ke;
    return (
      (ke += 1),
      he === null && (he = []),
      (t = Os(he, t, l)),
      (l = V),
      (Dt === null ? l.memoizedState : Dt.next) === null &&
        ((l = l.alternate), (S.H = l === null || l.memoizedState === null ? po : ff)),
      t
    );
  }
  function an(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Pe(t);
      if (t.$$typeof === zt) return jt(t);
    }
    throw Error(s(438, String(t)));
  }
  function Fi(t) {
    var l = null,
      a = V.updateQueue;
    if ((a !== null && (l = a.memoCache), l == null)) {
      var e = V.alternate;
      e !== null &&
        ((e = e.updateQueue),
        e !== null &&
          ((e = e.memoCache),
          e != null &&
            (l = {
              data: e.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (l == null && (l = { data: [], index: 0 }),
      a === null && ((a = ln()), (V.updateQueue = a)),
      (a.memoCache = l),
      (a = l.data[l.index]),
      a === void 0)
    )
      for (a = l.data[l.index] = Array(t), e = 0; e < t; e++) a[e] = Ul;
    return (l.index++, a);
  }
  function Ql(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function en(t) {
    var l = At();
    return $i(l, st, t);
  }
  function $i(t, l, a) {
    var e = t.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = a;
    var u = t.baseQueue,
      n = e.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        ((u.next = n.next), (n.next = i));
      }
      ((l.baseQueue = u = n), (e.pending = null));
    }
    if (((n = t.baseState), u === null)) t.memoizedState = n;
    else {
      l = u.next;
      var f = (i = null),
        c = null,
        d = l,
        p = !1;
      do {
        var T = d.lane & -536870913;
        if (T !== d.lane ? (k & T) === T : (Ll & T) === T) {
          var y = d.revertLane;
          if (y === 0)
            (c !== null &&
              (c = c.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: d.action,
                  hasEagerState: d.hasEagerState,
                  eagerState: d.eagerState,
                  next: null,
                }),
              T === fe && (p = !0));
          else if ((Ll & y) === y) {
            ((d = d.next), y === fe && (p = !0));
            continue;
          } else
            ((T = {
              lane: 0,
              revertLane: d.revertLane,
              gesture: null,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
              c === null ? ((f = c = T), (i = n)) : (c = c.next = T),
              (V.lanes |= y),
              (ma |= y));
          ((T = d.action), Ya && a(n, T), (n = d.hasEagerState ? d.eagerState : a(n, T)));
        } else
          ((y = {
            lane: T,
            revertLane: d.revertLane,
            gesture: d.gesture,
            action: d.action,
            hasEagerState: d.hasEagerState,
            eagerState: d.eagerState,
            next: null,
          }),
            c === null ? ((f = c = y), (i = n)) : (c = c.next = y),
            (V.lanes |= T),
            (ma |= T));
        d = d.next;
      } while (d !== null && d !== l);
      if (
        (c === null ? (i = n) : (c.next = f),
        !fl(n, t.memoizedState) && ((Ot = !0), p && ((a = ce), a !== null)))
      )
        throw a;
      ((t.memoizedState = n), (t.baseState = i), (t.baseQueue = c), (e.lastRenderedState = n));
    }
    return (u === null && (e.lanes = 0), [t.memoizedState, e.dispatch]);
  }
  function ki(t) {
    var l = At(),
      a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = t;
    var e = a.dispatch,
      u = a.pending,
      n = l.memoizedState;
    if (u !== null) {
      a.pending = null;
      var i = (u = u.next);
      do ((n = t(n, i.action)), (i = i.next));
      while (i !== u);
      (fl(n, l.memoizedState) || (Ot = !0),
        (l.memoizedState = n),
        l.baseQueue === null && (l.baseState = n),
        (a.lastRenderedState = n));
    }
    return [n, e];
  }
  function Gs(t, l, a) {
    var e = V,
      u = At(),
      n = I;
    if (n) {
      if (a === void 0) throw Error(s(407));
      a = a();
    } else a = l();
    var i = !fl((st || u).memoizedState, a);
    if (
      (i && ((u.memoizedState = a), (Ot = !0)),
      (u = u.queue),
      tf(Qs.bind(null, e, u, t), [t]),
      u.getSnapshot !== l || i || (Dt !== null && Dt.memoizedState.tag & 1))
    ) {
      if (
        ((e.flags |= 2048),
        ve(9, { destroy: void 0 }, Ls.bind(null, e, u, a, l), null),
        ht === null)
      )
        throw Error(s(349));
      n || (Ll & 127) !== 0 || Xs(e, l, a);
    }
    return a;
  }
  function Xs(t, l, a) {
    ((t.flags |= 16384),
      (t = { getSnapshot: l, value: a }),
      (l = V.updateQueue),
      l === null
        ? ((l = ln()), (V.updateQueue = l), (l.stores = [t]))
        : ((a = l.stores), a === null ? (l.stores = [t]) : a.push(t)));
  }
  function Ls(t, l, a, e) {
    ((l.value = a), (l.getSnapshot = e), Zs(l) && Vs(t));
  }
  function Qs(t, l, a) {
    return a(function () {
      Zs(l) && Vs(t);
    });
  }
  function Zs(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var a = l();
      return !fl(t, a);
    } catch {
      return !0;
    }
  }
  function Vs(t) {
    var l = Ua(t, 2);
    l !== null && al(l, t, 2);
  }
  function Pi(t) {
    var l = Wt();
    if (typeof t == "function") {
      var a = t;
      if (((t = a()), Ya)) {
        Pl(!0);
        try {
          a();
        } finally {
          Pl(!1);
        }
      }
    }
    return (
      (l.memoizedState = l.baseState = t),
      (l.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ql,
        lastRenderedState: t,
      }),
      l
    );
  }
  function Ks(t, l, a, e) {
    return ((t.baseState = a), $i(t, st, typeof e == "function" ? e : Ql));
  }
  function Jm(t, l, a, e, u) {
    if (fn(t)) throw Error(s(485));
    if (((t = l.action), t !== null)) {
      var n = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (i) {
          n.listeners.push(i);
        },
      };
      (S.T !== null ? a(!0) : (n.isTransition = !1),
        e(n),
        (a = l.pending),
        a === null
          ? ((n.next = l.pending = n), Js(l, n))
          : ((n.next = a.next), (l.pending = a.next = n)));
    }
  }
  function Js(t, l) {
    var a = l.action,
      e = l.payload,
      u = t.state;
    if (l.isTransition) {
      var n = S.T,
        i = {};
      S.T = i;
      try {
        var f = a(u, e),
          c = S.S;
        (c !== null && c(i, f), ws(t, l, f));
      } catch (d) {
        Ii(t, l, d);
      } finally {
        (n !== null && i.types !== null && (n.types = i.types), (S.T = n));
      }
    } else
      try {
        ((n = a(u, e)), ws(t, l, n));
      } catch (d) {
        Ii(t, l, d);
      }
  }
  function ws(t, l, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (e) {
            Ws(t, l, e);
          },
          function (e) {
            return Ii(t, l, e);
          },
        )
      : Ws(t, l, a);
  }
  function Ws(t, l, a) {
    ((l.status = "fulfilled"),
      (l.value = a),
      Fs(l),
      (t.state = a),
      (l = t.pending),
      l !== null &&
        ((a = l.next), a === l ? (t.pending = null) : ((a = a.next), (l.next = a), Js(t, a))));
  }
  function Ii(t, l, a) {
    var e = t.pending;
    if (((t.pending = null), e !== null)) {
      e = e.next;
      do ((l.status = "rejected"), (l.reason = a), Fs(l), (l = l.next));
      while (l !== e);
    }
    t.action = null;
  }
  function Fs(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function $s(t, l) {
    return l;
  }
  function ks(t, l) {
    if (I) {
      var a = ht.formState;
      if (a !== null) {
        t: {
          var e = V;
          if (I) {
            if (vt) {
              l: {
                for (var u = vt, n = El; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (((u = Al(u.nextSibling)), u === null)) {
                    u = null;
                    break l;
                  }
                }
                ((n = u.data), (u = n === "F!" || n === "F" ? u : null));
              }
              if (u) {
                ((vt = Al(u.nextSibling)), (e = u.data === "F!"));
                break t;
              }
            }
            ea(e);
          }
          e = !1;
        }
        e && (l = a[0]);
      }
    }
    return (
      (a = Wt()),
      (a.memoizedState = a.baseState = l),
      (e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $s,
        lastRenderedState: l,
      }),
      (a.queue = e),
      (a = go.bind(null, V, e)),
      (e.dispatch = a),
      (e = Pi(!1)),
      (n = nf.bind(null, V, !1, e.queue)),
      (e = Wt()),
      (u = { state: l, dispatch: null, action: t, pending: null }),
      (e.queue = u),
      (a = Jm.bind(null, V, u, n, a)),
      (u.dispatch = a),
      (e.memoizedState = t),
      [l, a, !1]
    );
  }
  function Ps(t) {
    var l = At();
    return Is(l, st, t);
  }
  function Is(t, l, a) {
    if (
      ((l = $i(t, l, $s)[0]),
      (t = en(Ql)[0]),
      typeof l == "object" && l !== null && typeof l.then == "function")
    )
      try {
        var e = Pe(l);
      } catch (i) {
        throw i === se ? wu : i;
      }
    else e = l;
    l = At();
    var u = l.queue,
      n = u.dispatch;
    return (
      a !== l.memoizedState &&
        ((V.flags |= 2048), ve(9, { destroy: void 0 }, wm.bind(null, u, a), null)),
      [e, n, t]
    );
  }
  function wm(t, l) {
    t.action = l;
  }
  function to(t) {
    var l = At(),
      a = st;
    if (a !== null) return Is(l, a, t);
    (At(), (l = l.memoizedState), (a = At()));
    var e = a.queue.dispatch;
    return ((a.memoizedState = t), [l, e, !1]);
  }
  function ve(t, l, a, e) {
    return (
      (t = { tag: t, create: a, deps: e, inst: l, next: null }),
      (l = V.updateQueue),
      l === null && ((l = ln()), (V.updateQueue = l)),
      (a = l.lastEffect),
      a === null
        ? (l.lastEffect = t.next = t)
        : ((e = a.next), (a.next = t), (t.next = e), (l.lastEffect = t)),
      t
    );
  }
  function lo() {
    return At().memoizedState;
  }
  function un(t, l, a, e) {
    var u = Wt();
    ((V.flags |= t),
      (u.memoizedState = ve(1 | l, { destroy: void 0 }, a, e === void 0 ? null : e)));
  }
  function nn(t, l, a, e) {
    var u = At();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    st !== null && e !== null && Vi(e, st.memoizedState.deps)
      ? (u.memoizedState = ve(l, n, a, e))
      : ((V.flags |= t), (u.memoizedState = ve(1 | l, n, a, e)));
  }
  function ao(t, l) {
    un(8390656, 8, t, l);
  }
  function tf(t, l) {
    nn(2048, 8, t, l);
  }
  function Wm(t) {
    V.flags |= 4;
    var l = V.updateQueue;
    if (l === null) ((l = ln()), (V.updateQueue = l), (l.events = [t]));
    else {
      var a = l.events;
      a === null ? (l.events = [t]) : a.push(t);
    }
  }
  function eo(t) {
    var l = At().memoizedState;
    return (
      Wm({ ref: l, nextImpl: t }),
      function () {
        if ((at & 2) !== 0) throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      }
    );
  }
  function uo(t, l) {
    return nn(4, 2, t, l);
  }
  function no(t, l) {
    return nn(4, 4, t, l);
  }
  function io(t, l) {
    if (typeof l == "function") {
      t = t();
      var a = l(t);
      return function () {
        typeof a == "function" ? a() : l(null);
      };
    }
    if (l != null)
      return (
        (t = t()),
        (l.current = t),
        function () {
          l.current = null;
        }
      );
  }
  function fo(t, l, a) {
    ((a = a != null ? a.concat([t]) : null), nn(4, 4, io.bind(null, l, t), a));
  }
  function lf() {}
  function co(t, l) {
    var a = At();
    l = l === void 0 ? null : l;
    var e = a.memoizedState;
    return l !== null && Vi(l, e[1]) ? e[0] : ((a.memoizedState = [t, l]), t);
  }
  function so(t, l) {
    var a = At();
    l = l === void 0 ? null : l;
    var e = a.memoizedState;
    if (l !== null && Vi(l, e[1])) return e[0];
    if (((e = t()), Ya)) {
      Pl(!0);
      try {
        t();
      } finally {
        Pl(!1);
      }
    }
    return ((a.memoizedState = [e, l]), e);
  }
  function af(t, l, a) {
    return a === void 0 || ((Ll & 1073741824) !== 0 && (k & 261930) === 0)
      ? (t.memoizedState = l)
      : ((t.memoizedState = a), (t = r0()), (V.lanes |= t), (ma |= t), a);
  }
  function oo(t, l, a, e) {
    return fl(a, l)
      ? a
      : re.current !== null
        ? ((t = af(t, a, e)), fl(t, l) || (Ot = !0), t)
        : (Ll & 42) === 0 || ((Ll & 1073741824) !== 0 && (k & 261930) === 0)
          ? ((Ot = !0), (t.memoizedState = a))
          : ((t = r0()), (V.lanes |= t), (ma |= t), l);
  }
  function ro(t, l, a, e, u) {
    var n = D.p;
    D.p = n !== 0 && 8 > n ? n : 8;
    var i = S.T,
      f = {};
    ((S.T = f), nf(t, !1, l, a));
    try {
      var c = u(),
        d = S.S;
      if (
        (d !== null && d(f, c), c !== null && typeof c == "object" && typeof c.then == "function")
      ) {
        var p = Zm(c, e);
        Ie(t, l, p, hl(t));
      } else Ie(t, l, e, hl(t));
    } catch (T) {
      Ie(t, l, { then: function () {}, status: "rejected", reason: T }, hl());
    } finally {
      ((D.p = n), i !== null && f.types !== null && (i.types = f.types), (S.T = i));
    }
  }
  function Fm() {}
  function ef(t, l, a, e) {
    if (t.tag !== 5) throw Error(s(476));
    var u = mo(t).queue;
    ro(
      t,
      u,
      l,
      L,
      a === null
        ? Fm
        : function () {
            return (ho(t), a(e));
          },
    );
  }
  function mo(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: L,
      baseState: L,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ql,
        lastRenderedState: L,
      },
      next: null,
    };
    var a = {};
    return (
      (l.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ql,
          lastRenderedState: a,
        },
        next: null,
      }),
      (t.memoizedState = l),
      (t = t.alternate),
      t !== null && (t.memoizedState = l),
      l
    );
  }
  function ho(t) {
    var l = mo(t);
    (l.next === null && (l = t.alternate.memoizedState), Ie(t, l.next.queue, {}, hl()));
  }
  function uf() {
    return jt(yu);
  }
  function vo() {
    return At().memoizedState;
  }
  function yo() {
    return At().memoizedState;
  }
  function $m(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var a = hl();
          t = ia(a);
          var e = fa(l, t, a);
          (e !== null && (al(e, l, a), We(e, l, a)), (l = { cache: Ci() }), (t.payload = l));
          return;
      }
      l = l.return;
    }
  }
  function km(t, l, a) {
    var e = hl();
    ((a = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      fn(t) ? So(l, a) : ((a = Ei(t, l, a, e)), a !== null && (al(a, t, e), bo(a, l, e))));
  }
  function go(t, l, a) {
    var e = hl();
    Ie(t, l, a, e);
  }
  function Ie(t, l, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (fn(t)) So(l, u);
    else {
      var n = t.alternate;
      if (
        t.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = l.lastRenderedReducer), n !== null)
      )
        try {
          var i = l.lastRenderedState,
            f = n(i, a);
          if (((u.hasEagerState = !0), (u.eagerState = f), fl(f, i)))
            return (Xu(t, l, u, 0), ht === null && Gu(), !1);
        } catch {}
      if (((a = Ei(t, l, u, e)), a !== null)) return (al(a, t, e), bo(a, l, e), !0);
    }
    return !1;
  }
  function nf(t, l, a, e) {
    if (
      ((e = {
        lane: 2,
        revertLane: Yf(),
        gesture: null,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      fn(t))
    ) {
      if (l) throw Error(s(479));
    } else ((l = Ei(t, a, e, 2)), l !== null && al(l, t, 2));
  }
  function fn(t) {
    var l = t.alternate;
    return t === V || (l !== null && l === V);
  }
  function So(t, l) {
    me = Iu = !0;
    var a = t.pending;
    (a === null ? (l.next = l) : ((l.next = a.next), (a.next = l)), (t.pending = l));
  }
  function bo(t, l, a) {
    if ((a & 4194048) !== 0) {
      var e = l.lanes;
      ((e &= t.pendingLanes), (a |= e), (l.lanes = a), Tc(t, a));
    }
  }
  var tu = {
    readContext: jt,
    use: an,
    useCallback: pt,
    useContext: pt,
    useEffect: pt,
    useImperativeHandle: pt,
    useLayoutEffect: pt,
    useInsertionEffect: pt,
    useMemo: pt,
    useReducer: pt,
    useRef: pt,
    useState: pt,
    useDebugValue: pt,
    useDeferredValue: pt,
    useTransition: pt,
    useSyncExternalStore: pt,
    useId: pt,
    useHostTransitionStatus: pt,
    useFormState: pt,
    useActionState: pt,
    useOptimistic: pt,
    useMemoCache: pt,
    useCacheRefresh: pt,
  };
  tu.useEffectEvent = pt;
  var po = {
      readContext: jt,
      use: an,
      useCallback: function (t, l) {
        return ((Wt().memoizedState = [t, l === void 0 ? null : l]), t);
      },
      useContext: jt,
      useEffect: ao,
      useImperativeHandle: function (t, l, a) {
        ((a = a != null ? a.concat([t]) : null), un(4194308, 4, io.bind(null, l, t), a));
      },
      useLayoutEffect: function (t, l) {
        return un(4194308, 4, t, l);
      },
      useInsertionEffect: function (t, l) {
        un(4, 2, t, l);
      },
      useMemo: function (t, l) {
        var a = Wt();
        l = l === void 0 ? null : l;
        var e = t();
        if (Ya) {
          Pl(!0);
          try {
            t();
          } finally {
            Pl(!1);
          }
        }
        return ((a.memoizedState = [e, l]), e);
      },
      useReducer: function (t, l, a) {
        var e = Wt();
        if (a !== void 0) {
          var u = a(l);
          if (Ya) {
            Pl(!0);
            try {
              a(l);
            } finally {
              Pl(!1);
            }
          }
        } else u = l;
        return (
          (e.memoizedState = e.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (e.queue = t),
          (t = t.dispatch = km.bind(null, V, t)),
          [e.memoizedState, t]
        );
      },
      useRef: function (t) {
        var l = Wt();
        return ((t = { current: t }), (l.memoizedState = t));
      },
      useState: function (t) {
        t = Pi(t);
        var l = t.queue,
          a = go.bind(null, V, l);
        return ((l.dispatch = a), [t.memoizedState, a]);
      },
      useDebugValue: lf,
      useDeferredValue: function (t, l) {
        var a = Wt();
        return af(a, t, l);
      },
      useTransition: function () {
        var t = Pi(!1);
        return ((t = ro.bind(null, V, t.queue, !0, !1)), (Wt().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, l, a) {
        var e = V,
          u = Wt();
        if (I) {
          if (a === void 0) throw Error(s(407));
          a = a();
        } else {
          if (((a = l()), ht === null)) throw Error(s(349));
          (k & 127) !== 0 || Xs(e, l, a);
        }
        u.memoizedState = a;
        var n = { value: a, getSnapshot: l };
        return (
          (u.queue = n),
          ao(Qs.bind(null, e, n, t), [t]),
          (e.flags |= 2048),
          ve(9, { destroy: void 0 }, Ls.bind(null, e, n, a, l), null),
          a
        );
      },
      useId: function () {
        var t = Wt(),
          l = ht.identifierPrefix;
        if (I) {
          var a = xl,
            e = Rl;
          ((a = (e & ~(1 << (32 - il(e) - 1))).toString(32) + a),
            (l = "_" + l + "R_" + a),
            (a = tn++),
            0 < a && (l += "H" + a.toString(32)),
            (l += "_"));
        } else ((a = Vm++), (l = "_" + l + "r_" + a.toString(32) + "_"));
        return (t.memoizedState = l);
      },
      useHostTransitionStatus: uf,
      useFormState: ks,
      useActionState: ks,
      useOptimistic: function (t) {
        var l = Wt();
        l.memoizedState = l.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((l.queue = a), (l = nf.bind(null, V, !0, a)), (a.dispatch = l), [t, l]);
      },
      useMemoCache: Fi,
      useCacheRefresh: function () {
        return (Wt().memoizedState = $m.bind(null, V));
      },
      useEffectEvent: function (t) {
        var l = Wt(),
          a = { impl: t };
        return (
          (l.memoizedState = a),
          function () {
            if ((at & 2) !== 0) throw Error(s(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ff = {
      readContext: jt,
      use: an,
      useCallback: co,
      useContext: jt,
      useEffect: tf,
      useImperativeHandle: fo,
      useInsertionEffect: uo,
      useLayoutEffect: no,
      useMemo: so,
      useReducer: en,
      useRef: lo,
      useState: function () {
        return en(Ql);
      },
      useDebugValue: lf,
      useDeferredValue: function (t, l) {
        var a = At();
        return oo(a, st.memoizedState, t, l);
      },
      useTransition: function () {
        var t = en(Ql)[0],
          l = At().memoizedState;
        return [typeof t == "boolean" ? t : Pe(t), l];
      },
      useSyncExternalStore: Gs,
      useId: vo,
      useHostTransitionStatus: uf,
      useFormState: Ps,
      useActionState: Ps,
      useOptimistic: function (t, l) {
        var a = At();
        return Ks(a, st, t, l);
      },
      useMemoCache: Fi,
      useCacheRefresh: yo,
    };
  ff.useEffectEvent = eo;
  var _o = {
    readContext: jt,
    use: an,
    useCallback: co,
    useContext: jt,
    useEffect: tf,
    useImperativeHandle: fo,
    useInsertionEffect: uo,
    useLayoutEffect: no,
    useMemo: so,
    useReducer: ki,
    useRef: lo,
    useState: function () {
      return ki(Ql);
    },
    useDebugValue: lf,
    useDeferredValue: function (t, l) {
      var a = At();
      return st === null ? af(a, t, l) : oo(a, st.memoizedState, t, l);
    },
    useTransition: function () {
      var t = ki(Ql)[0],
        l = At().memoizedState;
      return [typeof t == "boolean" ? t : Pe(t), l];
    },
    useSyncExternalStore: Gs,
    useId: vo,
    useHostTransitionStatus: uf,
    useFormState: to,
    useActionState: to,
    useOptimistic: function (t, l) {
      var a = At();
      return st !== null ? Ks(a, st, t, l) : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: Fi,
    useCacheRefresh: yo,
  };
  _o.useEffectEvent = eo;
  function cf(t, l, a, e) {
    ((l = t.memoizedState),
      (a = a(e, l)),
      (a = a == null ? l : q({}, l, a)),
      (t.memoizedState = a),
      t.lanes === 0 && (t.updateQueue.baseState = a));
  }
  var sf = {
    enqueueSetState: function (t, l, a) {
      t = t._reactInternals;
      var e = hl(),
        u = ia(e);
      ((u.payload = l),
        a != null && (u.callback = a),
        (l = fa(t, u, e)),
        l !== null && (al(l, t, e), We(l, t, e)));
    },
    enqueueReplaceState: function (t, l, a) {
      t = t._reactInternals;
      var e = hl(),
        u = ia(e);
      ((u.tag = 1),
        (u.payload = l),
        a != null && (u.callback = a),
        (l = fa(t, u, e)),
        l !== null && (al(l, t, e), We(l, t, e)));
    },
    enqueueForceUpdate: function (t, l) {
      t = t._reactInternals;
      var a = hl(),
        e = ia(a);
      ((e.tag = 2),
        l != null && (e.callback = l),
        (l = fa(t, e, a)),
        l !== null && (al(l, t, a), We(l, t, a)));
    },
  };
  function Eo(t, l, a, e, u, n, i) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(e, n, i)
        : l.prototype && l.prototype.isPureReactComponent
          ? !Xe(a, e) || !Xe(u, n)
          : !0
    );
  }
  function To(t, l, a, e) {
    ((t = l.state),
      typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(a, e),
      typeof l.UNSAFE_componentWillReceiveProps == "function" &&
        l.UNSAFE_componentWillReceiveProps(a, e),
      l.state !== t && sf.enqueueReplaceState(l, l.state, null));
  }
  function Ga(t, l) {
    var a = l;
    if ("ref" in l) {
      a = {};
      for (var e in l) e !== "ref" && (a[e] = l[e]);
    }
    if ((t = t.defaultProps)) {
      a === l && (a = q({}, a));
      for (var u in t) a[u] === void 0 && (a[u] = t[u]);
    }
    return a;
  }
  function Ao(t) {
    Yu(t);
  }
  function zo(t) {
    console.error(t);
  }
  function Mo(t) {
    Yu(t);
  }
  function cn(t, l) {
    try {
      var a = t.onUncaughtError;
      a(l.value, { componentStack: l.stack });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function Do(t, l, a) {
    try {
      var e = t.onCaughtError;
      e(a.value, { componentStack: a.stack, errorBoundary: l.tag === 1 ? l.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function of(t, l, a) {
    return (
      (a = ia(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        cn(t, l);
      }),
      a
    );
  }
  function Oo(t) {
    return ((t = ia(t)), (t.tag = 3), t);
  }
  function Uo(t, l, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      ((t.payload = function () {
        return u(n);
      }),
        (t.callback = function () {
          Do(l, a, e);
        }));
    }
    var i = a.stateNode;
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (t.callback = function () {
        (Do(l, a, e),
          typeof u != "function" && (ha === null ? (ha = new Set([this])) : ha.add(this)));
        var f = e.stack;
        this.componentDidCatch(e.value, { componentStack: f !== null ? f : "" });
      });
  }
  function Pm(t, l, a, e, u) {
    if (((a.flags |= 32768), e !== null && typeof e == "object" && typeof e.then == "function")) {
      if (((l = a.alternate), l !== null && ie(l, a, u, !0), (a = sl.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Tl === null ? pn() : a.alternate === null && _t === 0 && (_t = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              e === Wu
                ? (a.flags |= 16384)
                : ((l = a.updateQueue),
                  l === null ? (a.updateQueue = new Set([e])) : l.add(e),
                  Bf(t, e, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              e === Wu
                ? (a.flags |= 16384)
                : ((l = a.updateQueue),
                  l === null
                    ? ((l = { transitions: null, markerInstances: null, retryQueue: new Set([e]) }),
                      (a.updateQueue = l))
                    : ((a = l.retryQueue), a === null ? (l.retryQueue = new Set([e])) : a.add(e)),
                  Bf(t, e, u)),
              !1
            );
        }
        throw Error(s(435, a.tag));
      }
      return (Bf(t, e, u), pn(), !1);
    }
    if (I)
      return (
        (l = sl.current),
        l !== null
          ? ((l.flags & 65536) === 0 && (l.flags |= 256),
            (l.flags |= 65536),
            (l.lanes = u),
            e !== Oi && ((t = Error(s(422), { cause: e })), Ze(bl(t, a))))
          : (e !== Oi && ((l = Error(s(423), { cause: e })), Ze(bl(l, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (e = bl(e, a)),
            (u = of(t.stateNode, e, u)),
            Gi(t, u),
            _t !== 4 && (_t = 2)),
        !1
      );
    var n = Error(s(520), { cause: e });
    if (((n = bl(n, a)), cu === null ? (cu = [n]) : cu.push(n), _t !== 4 && (_t = 2), l === null))
      return !0;
    ((e = bl(e, a)), (a = l));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (t = u & -u),
            (a.lanes |= t),
            (t = of(a.stateNode, e, t)),
            Gi(a, t),
            !1
          );
        case 1:
          if (
            ((l = a.type),
            (n = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof l.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (ha === null || !ha.has(n)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = Oo(u)),
              Uo(u, t, a, e),
              Gi(a, u),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var rf = Error(s(461)),
    Ot = !1;
  function Yt(t, l, a, e) {
    l.child = t === null ? Ns(l, null, a, e) : ja(l, t.child, a, e);
  }
  function Ro(t, l, a, e, u) {
    a = a.render;
    var n = l.ref;
    if ("ref" in e) {
      var i = {};
      for (var f in e) f !== "ref" && (i[f] = e[f]);
    } else i = e;
    return (
      Ca(l),
      (e = Ki(t, l, a, i, n, u)),
      (f = Ji()),
      t !== null && !Ot
        ? (wi(t, l, u), Zl(t, l, u))
        : (I && f && Mi(l), (l.flags |= 1), Yt(t, l, e, u), l.child)
    );
  }
  function xo(t, l, a, e, u) {
    if (t === null) {
      var n = a.type;
      return typeof n == "function" && !Ti(n) && n.defaultProps === void 0 && a.compare === null
        ? ((l.tag = 15), (l.type = n), No(t, l, n, e, u))
        : ((t = Qu(a.type, null, e, l, l.mode, u)), (t.ref = l.ref), (t.return = l), (l.child = t));
    }
    if (((n = t.child), !bf(t, u))) {
      var i = n.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Xe), a(i, e) && t.ref === l.ref))
        return Zl(t, l, u);
    }
    return ((l.flags |= 1), (t = jl(n, e)), (t.ref = l.ref), (t.return = l), (l.child = t));
  }
  function No(t, l, a, e, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (Xe(n, e) && t.ref === l.ref)
        if (((Ot = !1), (l.pendingProps = e = n), bf(t, u))) (t.flags & 131072) !== 0 && (Ot = !0);
        else return ((l.lanes = t.lanes), Zl(t, l, u));
    }
    return mf(t, l, a, e, u);
  }
  function Co(t, l, a, e) {
    var u = e.children,
      n = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        l.stateNode === null &&
        (l.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.mode === "hidden")
    ) {
      if ((l.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | a : a), t !== null)) {
          for (e = l.child = t.child, u = 0; e !== null; )
            ((u = u | e.lanes | e.childLanes), (e = e.sibling));
          e = u & ~n;
        } else ((e = 0), (l.child = null));
        return Ho(t, l, n, a, e);
      }
      if ((a & 536870912) !== 0)
        ((l.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Ju(l, n !== null ? n.cachePool : null),
          n !== null ? Bs(l, n) : Li(),
          qs(l));
      else return ((e = l.lanes = 536870912), Ho(t, l, n !== null ? n.baseLanes | a : a, a, e));
    } else
      n !== null
        ? (Ju(l, n.cachePool), Bs(l, n), sa(), (l.memoizedState = null))
        : (t !== null && Ju(l, null), Li(), sa());
    return (Yt(t, l, u, a), l.child);
  }
  function lu(t, l) {
    return (
      (t !== null && t.tag === 22) ||
        l.stateNode !== null ||
        (l.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      l.sibling
    );
  }
  function Ho(t, l, a, e, u) {
    var n = Bi();
    return (
      (n = n === null ? null : { parent: Mt._currentValue, pool: n }),
      (l.memoizedState = { baseLanes: a, cachePool: n }),
      t !== null && Ju(l, null),
      Li(),
      qs(l),
      t !== null && ie(t, l, e, !0),
      (l.childLanes = u),
      null
    );
  }
  function sn(t, l) {
    return (
      (l = rn({ mode: l.mode, children: l.children }, t.mode)),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function Bo(t, l, a) {
    return (
      ja(l, t.child, null, a),
      (t = sn(l, l.pendingProps)),
      (t.flags |= 2),
      ol(l),
      (l.memoizedState = null),
      t
    );
  }
  function Im(t, l, a) {
    var e = l.pendingProps,
      u = (l.flags & 128) !== 0;
    if (((l.flags &= -129), t === null)) {
      if (I) {
        if (e.mode === "hidden") return ((t = sn(l, e)), (l.lanes = 536870912), lu(null, t));
        if (
          (Zi(l),
          (t = vt)
            ? ((t = w0(t, El)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((l.memoizedState = {
                  dehydrated: t,
                  treeContext: la !== null ? { id: Rl, overflow: xl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = gs(t)),
                (a.return = l),
                (l.child = a),
                (qt = l),
                (vt = null)))
            : (t = null),
          t === null)
        )
          throw ea(l);
        return ((l.lanes = 536870912), null);
      }
      return sn(l, e);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if ((Zi(l), u))
        if (l.flags & 256) ((l.flags &= -257), (l = Bo(t, l, a)));
        else if (l.memoizedState !== null) ((l.child = t.child), (l.flags |= 128), (l = null));
        else throw Error(s(558));
      else if ((Ot || ie(t, l, a, !1), (u = (a & t.childLanes) !== 0), Ot || u)) {
        if (((e = ht), e !== null && ((i = Ac(e, a)), i !== 0 && i !== n.retryLane)))
          throw ((n.retryLane = i), Ua(t, i), al(e, t, i), rf);
        (pn(), (l = Bo(t, l, a)));
      } else
        ((t = n.treeContext),
          (vt = Al(i.nextSibling)),
          (qt = l),
          (I = !0),
          (aa = null),
          (El = !1),
          t !== null && ps(l, t),
          (l = sn(l, e)),
          (l.flags |= 4096));
      return l;
    }
    return (
      (t = jl(t.child, { mode: e.mode, children: e.children })),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function on(t, l) {
    var a = l.ref;
    if (a === null) t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(s(284));
      (t === null || t.ref !== a) && (l.flags |= 4194816);
    }
  }
  function mf(t, l, a, e, u) {
    return (
      Ca(l),
      (a = Ki(t, l, a, e, void 0, u)),
      (e = Ji()),
      t !== null && !Ot
        ? (wi(t, l, u), Zl(t, l, u))
        : (I && e && Mi(l), (l.flags |= 1), Yt(t, l, a, u), l.child)
    );
  }
  function qo(t, l, a, e, u, n) {
    return (
      Ca(l),
      (l.updateQueue = null),
      (a = Ys(l, e, a, u)),
      js(t),
      (e = Ji()),
      t !== null && !Ot
        ? (wi(t, l, n), Zl(t, l, n))
        : (I && e && Mi(l), (l.flags |= 1), Yt(t, l, a, n), l.child)
    );
  }
  function jo(t, l, a, e, u) {
    if ((Ca(l), l.stateNode === null)) {
      var n = ae,
        i = a.contextType;
      (typeof i == "object" && i !== null && (n = jt(i)),
        (n = new a(e, n)),
        (l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = sf),
        (l.stateNode = n),
        (n._reactInternals = l),
        (n = l.stateNode),
        (n.props = e),
        (n.state = l.memoizedState),
        (n.refs = {}),
        ji(l),
        (i = a.contextType),
        (n.context = typeof i == "object" && i !== null ? jt(i) : ae),
        (n.state = l.memoizedState),
        (i = a.getDerivedStateFromProps),
        typeof i == "function" && (cf(l, a, i, e), (n.state = l.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((i = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(),
          i !== n.state && sf.enqueueReplaceState(n, n.state, null),
          $e(l, e, n, u),
          Fe(),
          (n.state = l.memoizedState)),
        typeof n.componentDidMount == "function" && (l.flags |= 4194308),
        (e = !0));
    } else if (t === null) {
      n = l.stateNode;
      var f = l.memoizedProps,
        c = Ga(a, f);
      n.props = c;
      var d = n.context,
        p = a.contextType;
      ((i = ae), typeof p == "object" && p !== null && (i = jt(p)));
      var T = a.getDerivedStateFromProps;
      ((p = typeof T == "function" || typeof n.getSnapshotBeforeUpdate == "function"),
        (f = l.pendingProps !== f),
        p ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((f || d !== i) && To(l, n, e, i)),
        (na = !1));
      var y = l.memoizedState;
      ((n.state = y),
        $e(l, e, n, u),
        Fe(),
        (d = l.memoizedState),
        f || y !== d || na
          ? (typeof T == "function" && (cf(l, a, T, e), (d = l.memoizedState)),
            (c = na || Eo(l, a, c, e, y, d, i))
              ? (p ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" && n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" && (l.flags |= 4194308))
              : (typeof n.componentDidMount == "function" && (l.flags |= 4194308),
                (l.memoizedProps = e),
                (l.memoizedState = d)),
            (n.props = e),
            (n.state = d),
            (n.context = i),
            (e = c))
          : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), (e = !1)));
    } else {
      ((n = l.stateNode),
        Yi(t, l),
        (i = l.memoizedProps),
        (p = Ga(a, i)),
        (n.props = p),
        (T = l.pendingProps),
        (y = n.context),
        (d = a.contextType),
        (c = ae),
        typeof d == "object" && d !== null && (c = jt(d)),
        (f = a.getDerivedStateFromProps),
        (d = typeof f == "function" || typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i !== T || y !== c) && To(l, n, e, c)),
        (na = !1),
        (y = l.memoizedState),
        (n.state = y),
        $e(l, e, n, u),
        Fe());
      var g = l.memoizedState;
      i !== T || y !== g || na || (t !== null && t.dependencies !== null && Vu(t.dependencies))
        ? (typeof f == "function" && (cf(l, a, f, e), (g = l.memoizedState)),
          (p =
            na ||
            Eo(l, a, p, e, y, g, c) ||
            (t !== null && t.dependencies !== null && Vu(t.dependencies)))
            ? (d ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(e, g, c),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(e, g, c)),
              typeof n.componentDidUpdate == "function" && (l.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (i === t.memoizedProps && y === t.memoizedState) ||
                (l.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (i === t.memoizedProps && y === t.memoizedState) ||
                (l.flags |= 1024),
              (l.memoizedProps = e),
              (l.memoizedState = g)),
          (n.props = e),
          (n.state = g),
          (n.context = c),
          (e = p))
        : (typeof n.componentDidUpdate != "function" ||
            (i === t.memoizedProps && y === t.memoizedState) ||
            (l.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (i === t.memoizedProps && y === t.memoizedState) ||
            (l.flags |= 1024),
          (e = !1));
    }
    return (
      (n = e),
      on(t, l),
      (e = (l.flags & 128) !== 0),
      n || e
        ? ((n = l.stateNode),
          (a = e && typeof a.getDerivedStateFromError != "function" ? null : n.render()),
          (l.flags |= 1),
          t !== null && e
            ? ((l.child = ja(l, t.child, null, u)), (l.child = ja(l, null, a, u)))
            : Yt(t, l, a, u),
          (l.memoizedState = n.state),
          (t = l.child))
        : (t = Zl(t, l, u)),
      t
    );
  }
  function Yo(t, l, a, e) {
    return (xa(), (l.flags |= 256), Yt(t, l, a, e), l.child);
  }
  var hf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function vf(t) {
    return { baseLanes: t, cachePool: Ms() };
  }
  function df(t, l, a) {
    return ((t = t !== null ? t.childLanes & ~a : 0), l && (t |= ml), t);
  }
  function Go(t, l, a) {
    var e = l.pendingProps,
      u = !1,
      n = (l.flags & 128) !== 0,
      i;
    if (
      ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (Tt.current & 2) !== 0),
      i && ((u = !0), (l.flags &= -129)),
      (i = (l.flags & 32) !== 0),
      (l.flags &= -33),
      t === null)
    ) {
      if (I) {
        if (
          (u ? ca(l) : sa(),
          (t = vt)
            ? ((t = w0(t, El)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((l.memoizedState = {
                  dehydrated: t,
                  treeContext: la !== null ? { id: Rl, overflow: xl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = gs(t)),
                (a.return = l),
                (l.child = a),
                (qt = l),
                (vt = null)))
            : (t = null),
          t === null)
        )
          throw ea(l);
        return (kf(t) ? (l.lanes = 32) : (l.lanes = 536870912), null);
      }
      var f = e.children;
      return (
        (e = e.fallback),
        u
          ? (sa(),
            (u = l.mode),
            (f = rn({ mode: "hidden", children: f }, u)),
            (e = Ra(e, u, a, null)),
            (f.return = l),
            (e.return = l),
            (f.sibling = e),
            (l.child = f),
            (e = l.child),
            (e.memoizedState = vf(a)),
            (e.childLanes = df(t, i, a)),
            (l.memoizedState = hf),
            lu(null, e))
          : (ca(l), yf(l, f))
      );
    }
    var c = t.memoizedState;
    if (c !== null && ((f = c.dehydrated), f !== null)) {
      if (n)
        l.flags & 256
          ? (ca(l), (l.flags &= -257), (l = gf(t, l, a)))
          : l.memoizedState !== null
            ? (sa(), (l.child = t.child), (l.flags |= 128), (l = null))
            : (sa(),
              (f = e.fallback),
              (u = l.mode),
              (e = rn({ mode: "visible", children: e.children }, u)),
              (f = Ra(f, u, a, null)),
              (f.flags |= 2),
              (e.return = l),
              (f.return = l),
              (e.sibling = f),
              (l.child = e),
              ja(l, t.child, null, a),
              (e = l.child),
              (e.memoizedState = vf(a)),
              (e.childLanes = df(t, i, a)),
              (l.memoizedState = hf),
              (l = lu(null, e)));
      else if ((ca(l), kf(f))) {
        if (((i = f.nextSibling && f.nextSibling.dataset), i)) var d = i.dgst;
        ((i = d),
          (e = Error(s(419))),
          (e.stack = ""),
          (e.digest = i),
          Ze({ value: e, source: null, stack: null }),
          (l = gf(t, l, a)));
      } else if ((Ot || ie(t, l, a, !1), (i = (a & t.childLanes) !== 0), Ot || i)) {
        if (((i = ht), i !== null && ((e = Ac(i, a)), e !== 0 && e !== c.retryLane)))
          throw ((c.retryLane = e), Ua(t, e), al(i, t, e), rf);
        ($f(f) || pn(), (l = gf(t, l, a)));
      } else
        $f(f)
          ? ((l.flags |= 192), (l.child = t.child), (l = null))
          : ((t = c.treeContext),
            (vt = Al(f.nextSibling)),
            (qt = l),
            (I = !0),
            (aa = null),
            (El = !1),
            t !== null && ps(l, t),
            (l = yf(l, e.children)),
            (l.flags |= 4096));
      return l;
    }
    return u
      ? (sa(),
        (f = e.fallback),
        (u = l.mode),
        (c = t.child),
        (d = c.sibling),
        (e = jl(c, { mode: "hidden", children: e.children })),
        (e.subtreeFlags = c.subtreeFlags & 65011712),
        d !== null ? (f = jl(d, f)) : ((f = Ra(f, u, a, null)), (f.flags |= 2)),
        (f.return = l),
        (e.return = l),
        (e.sibling = f),
        (l.child = e),
        lu(null, e),
        (e = l.child),
        (f = t.child.memoizedState),
        f === null
          ? (f = vf(a))
          : ((u = f.cachePool),
            u !== null
              ? ((c = Mt._currentValue), (u = u.parent !== c ? { parent: c, pool: c } : u))
              : (u = Ms()),
            (f = { baseLanes: f.baseLanes | a, cachePool: u })),
        (e.memoizedState = f),
        (e.childLanes = df(t, i, a)),
        (l.memoizedState = hf),
        lu(t.child, e))
      : (ca(l),
        (a = t.child),
        (t = a.sibling),
        (a = jl(a, { mode: "visible", children: e.children })),
        (a.return = l),
        (a.sibling = null),
        t !== null &&
          ((i = l.deletions), i === null ? ((l.deletions = [t]), (l.flags |= 16)) : i.push(t)),
        (l.child = a),
        (l.memoizedState = null),
        a);
  }
  function yf(t, l) {
    return ((l = rn({ mode: "visible", children: l }, t.mode)), (l.return = t), (t.child = l));
  }
  function rn(t, l) {
    return ((t = cl(22, t, null, l)), (t.lanes = 0), t);
  }
  function gf(t, l, a) {
    return (
      ja(l, t.child, null, a),
      (t = yf(l, l.pendingProps.children)),
      (t.flags |= 2),
      (l.memoizedState = null),
      t
    );
  }
  function Xo(t, l, a) {
    t.lanes |= l;
    var e = t.alternate;
    (e !== null && (e.lanes |= l), xi(t.return, l, a));
  }
  function Sf(t, l, a, e, u, n) {
    var i = t.memoizedState;
    i === null
      ? (t.memoizedState = {
          isBackwards: l,
          rendering: null,
          renderingStartTime: 0,
          last: e,
          tail: a,
          tailMode: u,
          treeForkCount: n,
        })
      : ((i.isBackwards = l),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = e),
        (i.tail = a),
        (i.tailMode = u),
        (i.treeForkCount = n));
  }
  function Lo(t, l, a) {
    var e = l.pendingProps,
      u = e.revealOrder,
      n = e.tail;
    e = e.children;
    var i = Tt.current,
      f = (i & 2) !== 0;
    if (
      (f ? ((i = (i & 1) | 2), (l.flags |= 128)) : (i &= 1),
      R(Tt, i),
      Yt(t, l, e, a),
      (e = I ? Qe : 0),
      !f && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Xo(t, a, l);
        else if (t.tag === 19) Xo(t, a, l);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (u) {
      case "forwards":
        for (a = l.child, u = null; a !== null; )
          ((t = a.alternate), t !== null && Pu(t) === null && (u = a), (a = a.sibling));
        ((a = u),
          a === null ? ((u = l.child), (l.child = null)) : ((u = a.sibling), (a.sibling = null)),
          Sf(l, !1, u, a, n, e));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = l.child, l.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && Pu(t) === null)) {
            l.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = a), (a = u), (u = t));
        }
        Sf(l, !0, a, null, n, e);
        break;
      case "together":
        Sf(l, !1, null, null, void 0, e);
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function Zl(t, l, a) {
    if (
      (t !== null && (l.dependencies = t.dependencies), (ma |= l.lanes), (a & l.childLanes) === 0)
    )
      if (t !== null) {
        if ((ie(t, l, a, !1), (a & l.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && l.child !== t.child) throw Error(s(153));
    if (l.child !== null) {
      for (t = l.child, a = jl(t, t.pendingProps), l.child = a, a.return = l; t.sibling !== null; )
        ((t = t.sibling), (a = a.sibling = jl(t, t.pendingProps)), (a.return = l));
      a.sibling = null;
    }
    return l.child;
  }
  function bf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Vu(t)));
  }
  function th(t, l, a) {
    switch (l.tag) {
      case 3:
        (wt(l, l.stateNode.containerInfo), ua(l, Mt, t.memoizedState.cache), xa());
        break;
      case 27:
      case 5:
        De(l);
        break;
      case 4:
        wt(l, l.stateNode.containerInfo);
        break;
      case 10:
        ua(l, l.type, l.memoizedProps.value);
        break;
      case 31:
        if (l.memoizedState !== null) return ((l.flags |= 128), Zi(l), null);
        break;
      case 13:
        var e = l.memoizedState;
        if (e !== null)
          return e.dehydrated !== null
            ? (ca(l), (l.flags |= 128), null)
            : (a & l.child.childLanes) !== 0
              ? Go(t, l, a)
              : (ca(l), (t = Zl(t, l, a)), t !== null ? t.sibling : null);
        ca(l);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((e = (a & l.childLanes) !== 0),
          e || (ie(t, l, a, !1), (e = (a & l.childLanes) !== 0)),
          u)
        ) {
          if (e) return Lo(t, l, a);
          l.flags |= 128;
        }
        if (
          ((u = l.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          R(Tt, Tt.current),
          e)
        )
          break;
        return null;
      case 22:
        return ((l.lanes = 0), Co(t, l, a, l.pendingProps));
      case 24:
        ua(l, Mt, t.memoizedState.cache);
    }
    return Zl(t, l, a);
  }
  function Qo(t, l, a) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps) Ot = !0;
      else {
        if (!bf(t, a) && (l.flags & 128) === 0) return ((Ot = !1), th(t, l, a));
        Ot = (t.flags & 131072) !== 0;
      }
    else ((Ot = !1), I && (l.flags & 1048576) !== 0 && bs(l, Qe, l.index));
    switch (((l.lanes = 0), l.tag)) {
      case 16:
        t: {
          var e = l.pendingProps;
          if (((t = Ba(l.elementType)), (l.type = t), typeof t == "function"))
            Ti(t)
              ? ((e = Ga(t, e)), (l.tag = 1), (l = jo(null, l, t, e, a)))
              : ((l.tag = 0), (l = mf(null, l, t, e, a)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === Ft) {
                ((l.tag = 11), (l = Ro(null, l, t, e, a)));
                break t;
              } else if (u === w) {
                ((l.tag = 14), (l = xo(null, l, t, e, a)));
                break t;
              }
            }
            throw ((l = St(t) || t), Error(s(306, l, "")));
          }
        }
        return l;
      case 0:
        return mf(t, l, l.type, l.pendingProps, a);
      case 1:
        return ((e = l.type), (u = Ga(e, l.pendingProps)), jo(t, l, e, u, a));
      case 3:
        t: {
          if ((wt(l, l.stateNode.containerInfo), t === null)) throw Error(s(387));
          e = l.pendingProps;
          var n = l.memoizedState;
          ((u = n.element), Yi(t, l), $e(l, e, null, a));
          var i = l.memoizedState;
          if (
            ((e = i.cache),
            ua(l, Mt, e),
            e !== n.cache && Ni(l, [Mt], a, !0),
            Fe(),
            (e = i.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: e, isDehydrated: !1, cache: i.cache }),
              (l.updateQueue.baseState = n),
              (l.memoizedState = n),
              l.flags & 256)
            ) {
              l = Yo(t, l, e, a);
              break t;
            } else if (e !== u) {
              ((u = bl(Error(s(424)), l)), Ze(u), (l = Yo(t, l, e, a)));
              break t;
            } else
              for (
                t = l.stateNode.containerInfo,
                  t.nodeType === 9
                    ? (t = t.body)
                    : (t = t.nodeName === "HTML" ? t.ownerDocument.body : t),
                  vt = Al(t.firstChild),
                  qt = l,
                  I = !0,
                  aa = null,
                  El = !0,
                  a = Ns(l, null, e, a),
                  l.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
          else {
            if ((xa(), e === u)) {
              l = Zl(t, l, a);
              break t;
            }
            Yt(t, l, e, a);
          }
          l = l.child;
        }
        return l;
      case 26:
        return (
          on(t, l),
          t === null
            ? (a = I0(l.type, null, l.pendingProps, null))
              ? (l.memoizedState = a)
              : I ||
                ((a = l.type),
                (t = l.pendingProps),
                (e = Dn(W.current).createElement(a)),
                (e[Bt] = l),
                (e[$t] = t),
                Gt(e, a, t),
                Ct(e),
                (l.stateNode = e))
            : (l.memoizedState = I0(l.type, t.memoizedProps, l.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          De(l),
          t === null &&
            I &&
            ((e = l.stateNode = $0(l.type, l.pendingProps, W.current)),
            (qt = l),
            (El = !0),
            (u = vt),
            ga(l.type) ? ((Pf = u), (vt = Al(e.firstChild))) : (vt = u)),
          Yt(t, l, l.pendingProps.children, a),
          on(t, l),
          t === null && (l.flags |= 4194304),
          l.child
        );
      case 5:
        return (
          t === null &&
            I &&
            ((u = e = vt) &&
              ((e = Rh(e, l.type, l.pendingProps, El)),
              e !== null
                ? ((l.stateNode = e), (qt = l), (vt = Al(e.firstChild)), (El = !1), (u = !0))
                : (u = !1)),
            u || ea(l)),
          De(l),
          (u = l.type),
          (n = l.pendingProps),
          (i = t !== null ? t.memoizedProps : null),
          (e = n.children),
          wf(u, n) ? (e = null) : i !== null && wf(u, i) && (l.flags |= 32),
          l.memoizedState !== null && ((u = Ki(t, l, Km, null, null, a)), (yu._currentValue = u)),
          on(t, l),
          Yt(t, l, e, a),
          l.child
        );
      case 6:
        return (
          t === null &&
            I &&
            ((t = a = vt) &&
              ((a = xh(a, l.pendingProps, El)),
              a !== null ? ((l.stateNode = a), (qt = l), (vt = null), (t = !0)) : (t = !1)),
            t || ea(l)),
          null
        );
      case 13:
        return Go(t, l, a);
      case 4:
        return (
          wt(l, l.stateNode.containerInfo),
          (e = l.pendingProps),
          t === null ? (l.child = ja(l, null, e, a)) : Yt(t, l, e, a),
          l.child
        );
      case 11:
        return Ro(t, l, l.type, l.pendingProps, a);
      case 7:
        return (Yt(t, l, l.pendingProps, a), l.child);
      case 8:
        return (Yt(t, l, l.pendingProps.children, a), l.child);
      case 12:
        return (Yt(t, l, l.pendingProps.children, a), l.child);
      case 10:
        return ((e = l.pendingProps), ua(l, l.type, e.value), Yt(t, l, e.children, a), l.child);
      case 9:
        return (
          (u = l.type._context),
          (e = l.pendingProps.children),
          Ca(l),
          (u = jt(u)),
          (e = e(u)),
          (l.flags |= 1),
          Yt(t, l, e, a),
          l.child
        );
      case 14:
        return xo(t, l, l.type, l.pendingProps, a);
      case 15:
        return No(t, l, l.type, l.pendingProps, a);
      case 19:
        return Lo(t, l, a);
      case 31:
        return Im(t, l, a);
      case 22:
        return Co(t, l, a, l.pendingProps);
      case 24:
        return (
          Ca(l),
          (e = jt(Mt)),
          t === null
            ? ((u = Bi()),
              u === null &&
                ((u = ht),
                (n = Ci()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= a),
                (u = n)),
              (l.memoizedState = { parent: e, cache: u }),
              ji(l),
              ua(l, Mt, u))
            : ((t.lanes & a) !== 0 && (Yi(t, l), $e(l, null, null, a), Fe()),
              (u = t.memoizedState),
              (n = l.memoizedState),
              u.parent !== e
                ? ((u = { parent: e, cache: e }),
                  (l.memoizedState = u),
                  l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u),
                  ua(l, Mt, e))
                : ((e = n.cache), ua(l, Mt, e), e !== u.cache && Ni(l, [Mt], a, !0))),
          Yt(t, l, l.pendingProps.children, a),
          l.child
        );
      case 29:
        throw l.pendingProps;
    }
    throw Error(s(156, l.tag));
  }
  function Vl(t) {
    t.flags |= 4;
  }
  function pf(t, l, a, e, u) {
    if (((l = (t.mode & 32) !== 0) && (l = !1), l)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (d0()) t.flags |= 8192;
        else throw ((qa = Wu), qi);
    } else t.flags &= -16777217;
  }
  function Zo(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !ur(l)))
      if (d0()) t.flags |= 8192;
      else throw ((qa = Wu), qi);
  }
  function mn(t, l) {
    (l !== null && (t.flags |= 4),
      t.flags & 16384 && ((l = t.tag !== 22 ? _c() : 536870912), (t.lanes |= l), (Se |= l)));
  }
  function au(t, l) {
    if (!I)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var a = null; l !== null; ) (l.alternate !== null && (a = l), (l = l.sibling));
          a === null ? (t.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = t.tail;
          for (var e = null; a !== null; ) (a.alternate !== null && (e = a), (a = a.sibling));
          e === null
            ? l || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (e.sibling = null);
      }
  }
  function dt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child,
      a = 0,
      e = 0;
    if (l)
      for (var u = t.child; u !== null; )
        ((a |= u.lanes | u.childLanes),
          (e |= u.subtreeFlags & 65011712),
          (e |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling));
    else
      for (u = t.child; u !== null; )
        ((a |= u.lanes | u.childLanes),
          (e |= u.subtreeFlags),
          (e |= u.flags),
          (u.return = t),
          (u = u.sibling));
    return ((t.subtreeFlags |= e), (t.childLanes = a), l);
  }
  function lh(t, l, a) {
    var e = l.pendingProps;
    switch ((Di(l), l.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (dt(l), null);
      case 1:
        return (dt(l), null);
      case 3:
        return (
          (a = l.stateNode),
          (e = null),
          t !== null && (e = t.memoizedState.cache),
          l.memoizedState.cache !== e && (l.flags |= 2048),
          Xl(Mt),
          Et(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (ne(l)
              ? Vl(l)
              : t === null ||
                (t.memoizedState.isDehydrated && (l.flags & 256) === 0) ||
                ((l.flags |= 1024), Ui())),
          dt(l),
          null
        );
      case 26:
        var u = l.type,
          n = l.memoizedState;
        return (
          t === null
            ? (Vl(l), n !== null ? (dt(l), Zo(l, n)) : (dt(l), pf(l, u, null, e, a)))
            : n
              ? n !== t.memoizedState
                ? (Vl(l), dt(l), Zo(l, n))
                : (dt(l), (l.flags &= -16777217))
              : ((t = t.memoizedProps), t !== e && Vl(l), dt(l), pf(l, u, t, e, a)),
          null
        );
      case 27:
        if ((Eu(l), (a = W.current), (u = l.type), t !== null && l.stateNode != null))
          t.memoizedProps !== e && Vl(l);
        else {
          if (!e) {
            if (l.stateNode === null) throw Error(s(166));
            return (dt(l), null);
          }
          ((t = x.current), ne(l) ? _s(l) : ((t = $0(u, e, a)), (l.stateNode = t), Vl(l)));
        }
        return (dt(l), null);
      case 5:
        if ((Eu(l), (u = l.type), t !== null && l.stateNode != null))
          t.memoizedProps !== e && Vl(l);
        else {
          if (!e) {
            if (l.stateNode === null) throw Error(s(166));
            return (dt(l), null);
          }
          if (((n = x.current), ne(l))) _s(l);
          else {
            var i = Dn(W.current);
            switch (n) {
              case 1:
                n = i.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = i.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = i.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                    break;
                  case "script":
                    ((n = i.createElement("div")),
                      (n.innerHTML = "<script><\/script>"),
                      (n = n.removeChild(n.firstChild)));
                    break;
                  case "select":
                    ((n =
                      typeof e.is == "string"
                        ? i.createElement("select", { is: e.is })
                        : i.createElement("select")),
                      e.multiple ? (n.multiple = !0) : e.size && (n.size = e.size));
                    break;
                  default:
                    n =
                      typeof e.is == "string"
                        ? i.createElement(u, { is: e.is })
                        : i.createElement(u);
                }
            }
            ((n[Bt] = l), (n[$t] = e));
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                ((i.child.return = i), (i = i.child));
                continue;
              }
              if (i === l) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === l) break t;
                i = i.return;
              }
              ((i.sibling.return = i.return), (i = i.sibling));
            }
            l.stateNode = n;
            t: switch ((Gt(n, u, e), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!e.autoFocus;
                break t;
              case "img":
                e = !0;
                break t;
              default:
                e = !1;
            }
            e && Vl(l);
          }
        }
        return (dt(l), pf(l, l.type, t === null ? null : t.memoizedProps, l.pendingProps, a), null);
      case 6:
        if (t && l.stateNode != null) t.memoizedProps !== e && Vl(l);
        else {
          if (typeof e != "string" && l.stateNode === null) throw Error(s(166));
          if (((t = W.current), ne(l))) {
            if (((t = l.stateNode), (a = l.memoizedProps), (e = null), (u = qt), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            ((t[Bt] = l),
              (t = !!(
                t.nodeValue === a ||
                (e !== null && e.suppressHydrationWarning === !0) ||
                G0(t.nodeValue, a)
              )),
              t || ea(l, !0));
          } else ((t = Dn(t).createTextNode(e)), (t[Bt] = l), (l.stateNode = t));
        }
        return (dt(l), null);
      case 31:
        if (((a = l.memoizedState), t === null || t.memoizedState !== null)) {
          if (((e = ne(l)), a !== null)) {
            if (t === null) {
              if (!e) throw Error(s(318));
              if (((t = l.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(s(557));
              t[Bt] = l;
            } else (xa(), (l.flags & 128) === 0 && (l.memoizedState = null), (l.flags |= 4));
            (dt(l), (t = !1));
          } else
            ((a = Ui()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a),
              (t = !0));
          if (!t) return l.flags & 256 ? (ol(l), l) : (ol(l), null);
          if ((l.flags & 128) !== 0) throw Error(s(558));
        }
        return (dt(l), null);
      case 13:
        if (
          ((e = l.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = ne(l)), e !== null && e.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (((u = l.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                throw Error(s(317));
              u[Bt] = l;
            } else (xa(), (l.flags & 128) === 0 && (l.memoizedState = null), (l.flags |= 4));
            (dt(l), (u = !1));
          } else
            ((u = Ui()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return l.flags & 256 ? (ol(l), l) : (ol(l), null);
        }
        return (
          ol(l),
          (l.flags & 128) !== 0
            ? ((l.lanes = a), l)
            : ((a = e !== null),
              (t = t !== null && t.memoizedState !== null),
              a &&
                ((e = l.child),
                (u = null),
                e.alternate !== null &&
                  e.alternate.memoizedState !== null &&
                  e.alternate.memoizedState.cachePool !== null &&
                  (u = e.alternate.memoizedState.cachePool.pool),
                (n = null),
                e.memoizedState !== null &&
                  e.memoizedState.cachePool !== null &&
                  (n = e.memoizedState.cachePool.pool),
                n !== u && (e.flags |= 2048)),
              a !== t && a && (l.child.flags |= 8192),
              mn(l, l.updateQueue),
              dt(l),
              null)
        );
      case 4:
        return (Et(), t === null && Qf(l.stateNode.containerInfo), dt(l), null);
      case 10:
        return (Xl(l.type), dt(l), null);
      case 19:
        if ((A(Tt), (e = l.memoizedState), e === null)) return (dt(l), null);
        if (((u = (l.flags & 128) !== 0), (n = e.rendering), n === null))
          if (u) au(e, !1);
          else {
            if (_t !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = l.child; t !== null; ) {
                if (((n = Pu(t)), n !== null)) {
                  for (
                    l.flags |= 128,
                      au(e, !1),
                      t = n.updateQueue,
                      l.updateQueue = t,
                      mn(l, t),
                      l.subtreeFlags = 0,
                      t = a,
                      a = l.child;
                    a !== null;
                  )
                    (ys(a, t), (a = a.sibling));
                  return (R(Tt, (Tt.current & 1) | 2), I && Yl(l, e.treeForkCount), l.child);
                }
                t = t.sibling;
              }
            e.tail !== null &&
              ul() > gn &&
              ((l.flags |= 128), (u = !0), au(e, !1), (l.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = Pu(n)), t !== null)) {
              if (
                ((l.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (l.updateQueue = t),
                mn(l, t),
                au(e, !0),
                e.tail === null && e.tailMode === "hidden" && !n.alternate && !I)
              )
                return (dt(l), null);
            } else
              2 * ul() - e.renderingStartTime > gn &&
                a !== 536870912 &&
                ((l.flags |= 128), (u = !0), au(e, !1), (l.lanes = 4194304));
          e.isBackwards
            ? ((n.sibling = l.child), (l.child = n))
            : ((t = e.last), t !== null ? (t.sibling = n) : (l.child = n), (e.last = n));
        }
        return e.tail !== null
          ? ((t = e.tail),
            (e.rendering = t),
            (e.tail = t.sibling),
            (e.renderingStartTime = ul()),
            (t.sibling = null),
            (a = Tt.current),
            R(Tt, u ? (a & 1) | 2 : a & 1),
            I && Yl(l, e.treeForkCount),
            t)
          : (dt(l), null);
      case 22:
      case 23:
        return (
          ol(l),
          Qi(),
          (e = l.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== e && (l.flags |= 8192)
            : e && (l.flags |= 8192),
          e
            ? (a & 536870912) !== 0 &&
              (l.flags & 128) === 0 &&
              (dt(l), l.subtreeFlags & 6 && (l.flags |= 8192))
            : dt(l),
          (a = l.updateQueue),
          a !== null && mn(l, a.retryQueue),
          (a = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          (e = null),
          l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (e = l.memoizedState.cachePool.pool),
          e !== a && (l.flags |= 2048),
          t !== null && A(Ha),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          l.memoizedState.cache !== a && (l.flags |= 2048),
          Xl(Mt),
          dt(l),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, l.tag));
  }
  function ah(t, l) {
    switch ((Di(l), l.tag)) {
      case 1:
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 3:
        return (
          Xl(Mt),
          Et(),
          (t = l.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((l.flags = (t & -65537) | 128), l) : null
        );
      case 26:
      case 27:
      case 5:
        return (Eu(l), null);
      case 31:
        if (l.memoizedState !== null) {
          if ((ol(l), l.alternate === null)) throw Error(s(340));
          xa();
        }
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 13:
        if ((ol(l), (t = l.memoizedState), t !== null && t.dehydrated !== null)) {
          if (l.alternate === null) throw Error(s(340));
          xa();
        }
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 19:
        return (A(Tt), null);
      case 4:
        return (Et(), null);
      case 10:
        return (Xl(l.type), null);
      case 22:
      case 23:
        return (
          ol(l),
          Qi(),
          t !== null && A(Ha),
          (t = l.flags),
          t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null
        );
      case 24:
        return (Xl(Mt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Vo(t, l) {
    switch ((Di(l), l.tag)) {
      case 3:
        (Xl(Mt), Et());
        break;
      case 26:
      case 27:
      case 5:
        Eu(l);
        break;
      case 4:
        Et();
        break;
      case 31:
        l.memoizedState !== null && ol(l);
        break;
      case 13:
        ol(l);
        break;
      case 19:
        A(Tt);
        break;
      case 10:
        Xl(l.type);
        break;
      case 22:
      case 23:
        (ol(l), Qi(), t !== null && A(Ha));
        break;
      case 24:
        Xl(Mt);
    }
  }
  function eu(t, l) {
    try {
      var a = l.updateQueue,
        e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var u = e.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            e = void 0;
            var n = a.create,
              i = a.inst;
            ((e = n()), (i.destroy = e));
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (f) {
      ct(l, l.return, f);
    }
  }
  function oa(t, l, a) {
    try {
      var e = l.updateQueue,
        u = e !== null ? e.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        e = n;
        do {
          if ((e.tag & t) === t) {
            var i = e.inst,
              f = i.destroy;
            if (f !== void 0) {
              ((i.destroy = void 0), (u = l));
              var c = a,
                d = f;
              try {
                d();
              } catch (p) {
                ct(u, c, p);
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (p) {
      ct(l, l.return, p);
    }
  }
  function Ko(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var a = t.stateNode;
      try {
        Hs(l, a);
      } catch (e) {
        ct(t, t.return, e);
      }
    }
  }
  function Jo(t, l, a) {
    ((a.props = Ga(t.type, t.memoizedProps)), (a.state = t.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (e) {
      ct(t, l, e);
    }
  }
  function uu(t, l) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var e = t.stateNode;
            break;
          case 30:
            e = t.stateNode;
            break;
          default:
            e = t.stateNode;
        }
        typeof a == "function" ? (t.refCleanup = a(e)) : (a.current = e);
      }
    } catch (u) {
      ct(t, l, u);
    }
  }
  function Nl(t, l) {
    var a = t.ref,
      e = t.refCleanup;
    if (a !== null)
      if (typeof e == "function")
        try {
          e();
        } catch (u) {
          ct(t, l, u);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          ct(t, l, u);
        }
      else a.current = null;
  }
  function wo(t) {
    var l = t.type,
      a = t.memoizedProps,
      e = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break t;
        case "img":
          a.src ? (e.src = a.src) : a.srcSet && (e.srcset = a.srcSet);
      }
    } catch (u) {
      ct(t, t.return, u);
    }
  }
  function _f(t, l, a) {
    try {
      var e = t.stateNode;
      (Ah(e, t.type, a, l), (e[$t] = l));
    } catch (u) {
      ct(t, t.return, u);
    }
  }
  function Wo(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && ga(t.type)) || t.tag === 4
    );
  }
  function Ef(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Wo(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && ga(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Tf(t, l, a) {
    var e = t.tag;
    if (e === 5 || e === 6)
      ((t = t.stateNode),
        l
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a
            ).insertBefore(t, l)
          : ((l = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a),
            l.appendChild(t),
            (a = a._reactRootContainer),
            a != null || l.onclick !== null || (l.onclick = Bl)));
    else if (
      e !== 4 &&
      (e === 27 && ga(t.type) && ((a = t.stateNode), (l = null)), (t = t.child), t !== null)
    )
      for (Tf(t, l, a), t = t.sibling; t !== null; ) (Tf(t, l, a), (t = t.sibling));
  }
  function hn(t, l, a) {
    var e = t.tag;
    if (e === 5 || e === 6) ((t = t.stateNode), l ? a.insertBefore(t, l) : a.appendChild(t));
    else if (e !== 4 && (e === 27 && ga(t.type) && (a = t.stateNode), (t = t.child), t !== null))
      for (hn(t, l, a), t = t.sibling; t !== null; ) (hn(t, l, a), (t = t.sibling));
  }
  function Fo(t) {
    var l = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var e = t.type, u = l.attributes; u.length; ) l.removeAttributeNode(u[0]);
      (Gt(l, e, a), (l[Bt] = t), (l[$t] = a));
    } catch (n) {
      ct(t, t.return, n);
    }
  }
  var Kl = !1,
    Ut = !1,
    Af = !1,
    $o = typeof WeakSet == "function" ? WeakSet : Set,
    Ht = null;
  function eh(t, l) {
    if (((t = t.containerInfo), (Kf = Hn), (t = fs(t)), yi(t))) {
      if ("selectionStart" in t) var a = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          a = ((a = t.ownerDocument) && a.defaultView) || window;
          var e = a.getSelection && a.getSelection();
          if (e && e.rangeCount !== 0) {
            a = e.anchorNode;
            var u = e.anchorOffset,
              n = e.focusNode;
            e = e.focusOffset;
            try {
              (a.nodeType, n.nodeType);
            } catch {
              a = null;
              break t;
            }
            var i = 0,
              f = -1,
              c = -1,
              d = 0,
              p = 0,
              T = t,
              y = null;
            l: for (;;) {
              for (
                var g;
                T !== a || (u !== 0 && T.nodeType !== 3) || (f = i + u),
                  T !== n || (e !== 0 && T.nodeType !== 3) || (c = i + e),
                  T.nodeType === 3 && (i += T.nodeValue.length),
                  (g = T.firstChild) !== null;
              )
                ((y = T), (T = g));
              for (;;) {
                if (T === t) break l;
                if (
                  (y === a && ++d === u && (f = i),
                  y === n && ++p === e && (c = i),
                  (g = T.nextSibling) !== null)
                )
                  break;
                ((T = y), (y = T.parentNode));
              }
              T = g;
            }
            a = f === -1 || c === -1 ? null : { start: f, end: c };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Jf = { focusedElem: t, selectionRange: a }, Hn = !1, Ht = l; Ht !== null; )
      if (((l = Ht), (t = l.child), (l.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = l), (Ht = t));
      else
        for (; Ht !== null; ) {
          switch (((l = Ht), (n = l.alternate), (t = l.flags), l.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = l.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (a = 0; a < t.length; a++) ((u = t[a]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && n !== null) {
                ((t = void 0),
                  (a = l),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (e = a.stateNode));
                try {
                  var H = Ga(a.type, u);
                  ((t = e.getSnapshotBeforeUpdate(H, n)),
                    (e.__reactInternalSnapshotBeforeUpdate = t));
                } catch (G) {
                  ct(a, a.return, G);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = l.stateNode.containerInfo), (a = t.nodeType), a === 9)) Ff(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ff(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (((t = l.sibling), t !== null)) {
            ((t.return = l.return), (Ht = t));
            break;
          }
          Ht = l.return;
        }
  }
  function ko(t, l, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (wl(t, a), e & 4 && eu(5, a));
        break;
      case 1:
        if ((wl(t, a), e & 4))
          if (((t = a.stateNode), l === null))
            try {
              t.componentDidMount();
            } catch (i) {
              ct(a, a.return, i);
            }
          else {
            var u = Ga(a.type, l.memoizedProps);
            l = l.memoizedState;
            try {
              t.componentDidUpdate(u, l, t.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              ct(a, a.return, i);
            }
          }
        (e & 64 && Ko(a), e & 512 && uu(a, a.return));
        break;
      case 3:
        if ((wl(t, a), e & 64 && ((t = a.updateQueue), t !== null))) {
          if (((l = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                l = a.child.stateNode;
                break;
              case 1:
                l = a.child.stateNode;
            }
          try {
            Hs(t, l);
          } catch (i) {
            ct(a, a.return, i);
          }
        }
        break;
      case 27:
        l === null && e & 4 && Fo(a);
      case 26:
      case 5:
        (wl(t, a), l === null && e & 4 && wo(a), e & 512 && uu(a, a.return));
        break;
      case 12:
        wl(t, a);
        break;
      case 31:
        (wl(t, a), e & 4 && t0(t, a));
        break;
      case 13:
        (wl(t, a),
          e & 4 && l0(t, a),
          e & 64 &&
            ((t = a.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((a = mh.bind(null, a)), Nh(t, a)))));
        break;
      case 22:
        if (((e = a.memoizedState !== null || Kl), !e)) {
          ((l = (l !== null && l.memoizedState !== null) || Ut), (u = Kl));
          var n = Ut;
          ((Kl = e),
            (Ut = l) && !n ? Wl(t, a, (a.subtreeFlags & 8772) !== 0) : wl(t, a),
            (Kl = u),
            (Ut = n));
        }
        break;
      case 30:
        break;
      default:
        wl(t, a);
    }
  }
  function Po(t) {
    var l = t.alternate;
    (l !== null && ((t.alternate = null), Po(l)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((l = t.stateNode), l !== null && In(l)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var yt = null,
    Pt = !1;
  function Jl(t, l, a) {
    for (a = a.child; a !== null; ) (Io(t, l, a), (a = a.sibling));
  }
  function Io(t, l, a) {
    if (nl && typeof nl.onCommitFiberUnmount == "function")
      try {
        nl.onCommitFiberUnmount(Oe, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Ut || Nl(a, l),
          Jl(t, l, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Ut || Nl(a, l);
        var e = yt,
          u = Pt;
        (ga(a.type) && ((yt = a.stateNode), (Pt = !1)),
          Jl(t, l, a),
          hu(a.stateNode),
          (yt = e),
          (Pt = u));
        break;
      case 5:
        Ut || Nl(a, l);
      case 6:
        if (((e = yt), (u = Pt), (yt = null), Jl(t, l, a), (yt = e), (Pt = u), yt !== null))
          if (Pt)
            try {
              (yt.nodeType === 9
                ? yt.body
                : yt.nodeName === "HTML"
                  ? yt.ownerDocument.body
                  : yt
              ).removeChild(a.stateNode);
            } catch (n) {
              ct(a, l, n);
            }
          else
            try {
              yt.removeChild(a.stateNode);
            } catch (n) {
              ct(a, l, n);
            }
        break;
      case 18:
        yt !== null &&
          (Pt
            ? ((t = yt),
              K0(
                t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
                a.stateNode,
              ),
              Me(t))
            : K0(yt, a.stateNode));
        break;
      case 4:
        ((e = yt),
          (u = Pt),
          (yt = a.stateNode.containerInfo),
          (Pt = !0),
          Jl(t, l, a),
          (yt = e),
          (Pt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (oa(2, a, l), Ut || oa(4, a, l), Jl(t, l, a));
        break;
      case 1:
        (Ut ||
          (Nl(a, l), (e = a.stateNode), typeof e.componentWillUnmount == "function" && Jo(a, l, e)),
          Jl(t, l, a));
        break;
      case 21:
        Jl(t, l, a);
        break;
      case 22:
        ((Ut = (e = Ut) || a.memoizedState !== null), Jl(t, l, a), (Ut = e));
        break;
      default:
        Jl(t, l, a);
    }
  }
  function t0(t, l) {
    if (
      l.memoizedState === null &&
      ((t = l.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Me(t);
      } catch (a) {
        ct(l, l.return, a);
      }
    }
  }
  function l0(t, l) {
    if (
      l.memoizedState === null &&
      ((t = l.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Me(t);
      } catch (a) {
        ct(l, l.return, a);
      }
  }
  function uh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return (l === null && (l = t.stateNode = new $o()), l);
      case 22:
        return (
          (t = t.stateNode), (l = t._retryCache), l === null && (l = t._retryCache = new $o()), l
        );
      default:
        throw Error(s(435, t.tag));
    }
  }
  function vn(t, l) {
    var a = uh(t);
    l.forEach(function (e) {
      if (!a.has(e)) {
        a.add(e);
        var u = hh.bind(null, t, e);
        e.then(u, u);
      }
    });
  }
  function It(t, l) {
    var a = l.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e],
          n = t,
          i = l,
          f = i;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (ga(f.type)) {
                ((yt = f.stateNode), (Pt = !1));
                break t;
              }
              break;
            case 5:
              ((yt = f.stateNode), (Pt = !1));
              break t;
            case 3:
            case 4:
              ((yt = f.stateNode.containerInfo), (Pt = !0));
              break t;
          }
          f = f.return;
        }
        if (yt === null) throw Error(s(160));
        (Io(n, i, u),
          (yt = null),
          (Pt = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null));
      }
    if (l.subtreeFlags & 13886) for (l = l.child; l !== null; ) (a0(l, t), (l = l.sibling));
  }
  var Dl = null;
  function a0(t, l) {
    var a = t.alternate,
      e = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (It(l, t), tl(t), e & 4 && (oa(3, t, t.return), eu(3, t), oa(5, t, t.return)));
        break;
      case 1:
        (It(l, t),
          tl(t),
          e & 512 && (Ut || a === null || Nl(a, a.return)),
          e & 64 &&
            Kl &&
            ((t = t.updateQueue),
            t !== null &&
              ((e = t.callbacks),
              e !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? e : a.concat(e))))));
        break;
      case 26:
        var u = Dl;
        if ((It(l, t), tl(t), e & 512 && (Ut || a === null || Nl(a, a.return)), e & 4)) {
          var n = a !== null ? a.memoizedState : null;
          if (((e = t.memoizedState), a === null))
            if (e === null)
              if (t.stateNode === null) {
                t: {
                  ((e = t.type), (a = t.memoizedProps), (u = u.ownerDocument || u));
                  l: switch (e) {
                    case "title":
                      ((n = u.getElementsByTagName("title")[0]),
                        (!n ||
                          n[xe] ||
                          n[Bt] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(e)),
                          u.head.insertBefore(n, u.querySelector("head > title"))),
                        Gt(n, e, a),
                        (n[Bt] = t),
                        Ct(n),
                        (e = n));
                      break t;
                    case "link":
                      var i = ar("link", "href", u).get(e + (a.href || ""));
                      if (i) {
                        for (var f = 0; f < i.length; f++)
                          if (
                            ((n = i[f]),
                            n.getAttribute("href") ===
                              (a.href == null || a.href === "" ? null : a.href) &&
                              n.getAttribute("rel") === (a.rel == null ? null : a.rel) &&
                              n.getAttribute("title") === (a.title == null ? null : a.title) &&
                              n.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            i.splice(f, 1);
                            break l;
                          }
                      }
                      ((n = u.createElement(e)), Gt(n, e, a), u.head.appendChild(n));
                      break;
                    case "meta":
                      if ((i = ar("meta", "content", u).get(e + (a.content || "")))) {
                        for (f = 0; f < i.length; f++)
                          if (
                            ((n = i[f]),
                            n.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              n.getAttribute("name") === (a.name == null ? null : a.name) &&
                              n.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              n.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              n.getAttribute("charset") === (a.charSet == null ? null : a.charSet))
                          ) {
                            i.splice(f, 1);
                            break l;
                          }
                      }
                      ((n = u.createElement(e)), Gt(n, e, a), u.head.appendChild(n));
                      break;
                    default:
                      throw Error(s(468, e));
                  }
                  ((n[Bt] = t), Ct(n), (e = n));
                }
                t.stateNode = e;
              } else er(u, t.type, t.stateNode);
            else t.stateNode = lr(u, e, t.memoizedProps);
          else
            n !== e
              ? (n === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : n.count--,
                e === null ? er(u, t.type, t.stateNode) : lr(u, e, t.memoizedProps))
              : e === null && t.stateNode !== null && _f(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (It(l, t),
          tl(t),
          e & 512 && (Ut || a === null || Nl(a, a.return)),
          a !== null && e & 4 && _f(t, t.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((It(l, t), tl(t), e & 512 && (Ut || a === null || Nl(a, a.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            Fa(u, "");
          } catch (H) {
            ct(t, t.return, H);
          }
        }
        (e & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), _f(t, u, a !== null ? a.memoizedProps : u)),
          e & 1024 && (Af = !0));
        break;
      case 6:
        if ((It(l, t), tl(t), e & 4)) {
          if (t.stateNode === null) throw Error(s(162));
          ((e = t.memoizedProps), (a = t.stateNode));
          try {
            a.nodeValue = e;
          } catch (H) {
            ct(t, t.return, H);
          }
        }
        break;
      case 3:
        if (
          ((Rn = null),
          (u = Dl),
          (Dl = On(l.containerInfo)),
          It(l, t),
          (Dl = u),
          tl(t),
          e & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Me(l.containerInfo);
          } catch (H) {
            ct(t, t.return, H);
          }
        Af && ((Af = !1), e0(t));
        break;
      case 4:
        ((e = Dl), (Dl = On(t.stateNode.containerInfo)), It(l, t), tl(t), (Dl = e));
        break;
      case 12:
        (It(l, t), tl(t));
        break;
      case 31:
        (It(l, t),
          tl(t),
          e & 4 && ((e = t.updateQueue), e !== null && ((t.updateQueue = null), vn(t, e))));
        break;
      case 13:
        (It(l, t),
          tl(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (yn = ul()),
          e & 4 && ((e = t.updateQueue), e !== null && ((t.updateQueue = null), vn(t, e))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var c = a !== null && a.memoizedState !== null,
          d = Kl,
          p = Ut;
        if (((Kl = d || u), (Ut = p || c), It(l, t), (Ut = p), (Kl = d), tl(t), e & 8192))
          t: for (
            l = t.stateNode,
              l._visibility = u ? l._visibility & -2 : l._visibility | 1,
              u && (a === null || c || Kl || Ut || Xa(t)),
              a = null,
              l = t;
            ;
          ) {
            if (l.tag === 5 || l.tag === 26) {
              if (a === null) {
                c = a = l;
                try {
                  if (((n = c.stateNode), u))
                    ((i = n.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"));
                  else {
                    f = c.stateNode;
                    var T = c.memoizedProps.style,
                      y = T != null && T.hasOwnProperty("display") ? T.display : null;
                    f.style.display = y == null || typeof y == "boolean" ? "" : ("" + y).trim();
                  }
                } catch (H) {
                  ct(c, c.return, H);
                }
              }
            } else if (l.tag === 6) {
              if (a === null) {
                c = l;
                try {
                  c.stateNode.nodeValue = u ? "" : c.memoizedProps;
                } catch (H) {
                  ct(c, c.return, H);
                }
              }
            } else if (l.tag === 18) {
              if (a === null) {
                c = l;
                try {
                  var g = c.stateNode;
                  u ? J0(g, !0) : J0(c.stateNode, !1);
                } catch (H) {
                  ct(c, c.return, H);
                }
              }
            } else if (
              ((l.tag !== 22 && l.tag !== 23) || l.memoizedState === null || l === t) &&
              l.child !== null
            ) {
              ((l.child.return = l), (l = l.child));
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              (a === l && (a = null), (l = l.return));
            }
            (a === l && (a = null), (l.sibling.return = l.return), (l = l.sibling));
          }
        e & 4 &&
          ((e = t.updateQueue),
          e !== null && ((a = e.retryQueue), a !== null && ((e.retryQueue = null), vn(t, a))));
        break;
      case 19:
        (It(l, t),
          tl(t),
          e & 4 && ((e = t.updateQueue), e !== null && ((t.updateQueue = null), vn(t, e))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (It(l, t), tl(t));
    }
  }
  function tl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var a, e = t.return; e !== null; ) {
          if (Wo(e)) {
            a = e;
            break;
          }
          e = e.return;
        }
        if (a == null) throw Error(s(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode,
              n = Ef(t);
            hn(t, n, u);
            break;
          case 5:
            var i = a.stateNode;
            a.flags & 32 && (Fa(i, ""), (a.flags &= -33));
            var f = Ef(t);
            hn(t, f, i);
            break;
          case 3:
          case 4:
            var c = a.stateNode.containerInfo,
              d = Ef(t);
            Tf(t, d, c);
            break;
          default:
            throw Error(s(161));
        }
      } catch (p) {
        ct(t, t.return, p);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function e0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        (e0(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), (t = t.sibling));
      }
  }
  function wl(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; ) (ko(t, l.alternate, l), (l = l.sibling));
  }
  function Xa(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (oa(4, l, l.return), Xa(l));
          break;
        case 1:
          Nl(l, l.return);
          var a = l.stateNode;
          (typeof a.componentWillUnmount == "function" && Jo(l, l.return, a), Xa(l));
          break;
        case 27:
          hu(l.stateNode);
        case 26:
        case 5:
          (Nl(l, l.return), Xa(l));
          break;
        case 22:
          l.memoizedState === null && Xa(l);
          break;
        case 30:
          Xa(l);
          break;
        default:
          Xa(l);
      }
      t = t.sibling;
    }
  }
  function Wl(t, l, a) {
    for (a = a && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var e = l.alternate,
        u = t,
        n = l,
        i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (Wl(u, n, a), eu(4, n));
          break;
        case 1:
          if ((Wl(u, n, a), (e = n), (u = e.stateNode), typeof u.componentDidMount == "function"))
            try {
              u.componentDidMount();
            } catch (d) {
              ct(e, e.return, d);
            }
          if (((e = n), (u = e.updateQueue), u !== null)) {
            var f = e.stateNode;
            try {
              var c = u.shared.hiddenCallbacks;
              if (c !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < c.length; u++) Cs(c[u], f);
            } catch (d) {
              ct(e, e.return, d);
            }
          }
          (a && i & 64 && Ko(n), uu(n, n.return));
          break;
        case 27:
          Fo(n);
        case 26:
        case 5:
          (Wl(u, n, a), a && e === null && i & 4 && wo(n), uu(n, n.return));
          break;
        case 12:
          Wl(u, n, a);
          break;
        case 31:
          (Wl(u, n, a), a && i & 4 && t0(u, n));
          break;
        case 13:
          (Wl(u, n, a), a && i & 4 && l0(u, n));
          break;
        case 22:
          (n.memoizedState === null && Wl(u, n, a), uu(n, n.return));
          break;
        case 30:
          break;
        default:
          Wl(u, n, a);
      }
      l = l.sibling;
    }
  }
  function zf(t, l) {
    var a = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      l.memoizedState !== null &&
        l.memoizedState.cachePool !== null &&
        (t = l.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && Ve(a)));
  }
  function Mf(t, l) {
    ((t = null),
      l.alternate !== null && (t = l.alternate.memoizedState.cache),
      (l = l.memoizedState.cache),
      l !== t && (l.refCount++, t != null && Ve(t)));
  }
  function Ol(t, l, a, e) {
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) (u0(t, l, a, e), (l = l.sibling));
  }
  function u0(t, l, a, e) {
    var u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Ol(t, l, a, e), u & 2048 && eu(9, l));
        break;
      case 1:
        Ol(t, l, a, e);
        break;
      case 3:
        (Ol(t, l, a, e),
          u & 2048 &&
            ((t = null),
            l.alternate !== null && (t = l.alternate.memoizedState.cache),
            (l = l.memoizedState.cache),
            l !== t && (l.refCount++, t != null && Ve(t))));
        break;
      case 12:
        if (u & 2048) {
          (Ol(t, l, a, e), (t = l.stateNode));
          try {
            var n = l.memoizedProps,
              i = n.id,
              f = n.onPostCommit;
            typeof f == "function" &&
              f(i, l.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
          } catch (c) {
            ct(l, l.return, c);
          }
        } else Ol(t, l, a, e);
        break;
      case 31:
        Ol(t, l, a, e);
        break;
      case 13:
        Ol(t, l, a, e);
        break;
      case 23:
        break;
      case 22:
        ((n = l.stateNode),
          (i = l.alternate),
          l.memoizedState !== null
            ? n._visibility & 2
              ? Ol(t, l, a, e)
              : nu(t, l)
            : n._visibility & 2
              ? Ol(t, l, a, e)
              : ((n._visibility |= 2), de(t, l, a, e, (l.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && zf(i, l));
        break;
      case 24:
        (Ol(t, l, a, e), u & 2048 && Mf(l.alternate, l));
        break;
      default:
        Ol(t, l, a, e);
    }
  }
  function de(t, l, a, e, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t,
        i = l,
        f = a,
        c = e,
        d = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (de(n, i, f, c, u), eu(8, i));
          break;
        case 23:
          break;
        case 22:
          var p = i.stateNode;
          (i.memoizedState !== null
            ? p._visibility & 2
              ? de(n, i, f, c, u)
              : nu(n, i)
            : ((p._visibility |= 2), de(n, i, f, c, u)),
            u && d & 2048 && zf(i.alternate, i));
          break;
        case 24:
          (de(n, i, f, c, u), u && d & 2048 && Mf(i.alternate, i));
          break;
        default:
          de(n, i, f, c, u);
      }
      l = l.sibling;
    }
  }
  function nu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var a = t,
          e = l,
          u = e.flags;
        switch (e.tag) {
          case 22:
            (nu(a, e), u & 2048 && zf(e.alternate, e));
            break;
          case 24:
            (nu(a, e), u & 2048 && Mf(e.alternate, e));
            break;
          default:
            nu(a, e);
        }
        l = l.sibling;
      }
  }
  var iu = 8192;
  function ye(t, l, a) {
    if (t.subtreeFlags & iu) for (t = t.child; t !== null; ) (n0(t, l, a), (t = t.sibling));
  }
  function n0(t, l, a) {
    switch (t.tag) {
      case 26:
        (ye(t, l, a),
          t.flags & iu && t.memoizedState !== null && Vh(a, Dl, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        ye(t, l, a);
        break;
      case 3:
      case 4:
        var e = Dl;
        ((Dl = On(t.stateNode.containerInfo)), ye(t, l, a), (Dl = e));
        break;
      case 22:
        t.memoizedState === null &&
          ((e = t.alternate),
          e !== null && e.memoizedState !== null
            ? ((e = iu), (iu = 16777216), ye(t, l, a), (iu = e))
            : ye(t, l, a));
        break;
      default:
        ye(t, l, a);
    }
  }
  function i0(t) {
    var l = t.alternate;
    if (l !== null && ((t = l.child), t !== null)) {
      l.child = null;
      do ((l = t.sibling), (t.sibling = null), (t = l));
      while (t !== null);
    }
  }
  function fu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var e = l[a];
          ((Ht = e), c0(e, t));
        }
      i0(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (f0(t), (t = t.sibling));
  }
  function f0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (fu(t), t.flags & 2048 && oa(9, t, t.return));
        break;
      case 3:
        fu(t);
        break;
      case 12:
        fu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((l._visibility &= -3), dn(t))
          : fu(t);
        break;
      default:
        fu(t);
    }
  }
  function dn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var e = l[a];
          ((Ht = e), c0(e, t));
        }
      i0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((l = t), l.tag)) {
        case 0:
        case 11:
        case 15:
          (oa(8, l, l.return), dn(l));
          break;
        case 22:
          ((a = l.stateNode), a._visibility & 2 && ((a._visibility &= -3), dn(l)));
          break;
        default:
          dn(l);
      }
      t = t.sibling;
    }
  }
  function c0(t, l) {
    for (; Ht !== null; ) {
      var a = Ht;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, a, l);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var e = a.memoizedState.cachePool.pool;
            e != null && e.refCount++;
          }
          break;
        case 24:
          Ve(a.memoizedState.cache);
      }
      if (((e = a.child), e !== null)) ((e.return = a), (Ht = e));
      else
        t: for (a = t; Ht !== null; ) {
          e = Ht;
          var u = e.sibling,
            n = e.return;
          if ((Po(e), e === a)) {
            Ht = null;
            break t;
          }
          if (u !== null) {
            ((u.return = n), (Ht = u));
            break t;
          }
          Ht = n;
        }
    }
  }
  var nh = {
      getCacheForType: function (t) {
        var l = jt(Mt),
          a = l.data.get(t);
        return (a === void 0 && ((a = t()), l.data.set(t, a)), a);
      },
      cacheSignal: function () {
        return jt(Mt).controller.signal;
      },
    },
    ih = typeof WeakMap == "function" ? WeakMap : Map,
    at = 0,
    ht = null,
    F = null,
    k = 0,
    ft = 0,
    rl = null,
    ra = !1,
    ge = !1,
    Df = !1,
    Fl = 0,
    _t = 0,
    ma = 0,
    La = 0,
    Of = 0,
    ml = 0,
    Se = 0,
    cu = null,
    ll = null,
    Uf = !1,
    yn = 0,
    s0 = 0,
    gn = 1 / 0,
    Sn = null,
    ha = null,
    Rt = 0,
    va = null,
    be = null,
    $l = 0,
    Rf = 0,
    xf = null,
    o0 = null,
    su = 0,
    Nf = null;
  function hl() {
    return (at & 2) !== 0 && k !== 0 ? k & -k : S.T !== null ? Yf() : zc();
  }
  function r0() {
    if (ml === 0)
      if ((k & 536870912) === 0 || I) {
        var t = zu;
        ((zu <<= 1), (zu & 3932160) === 0 && (zu = 262144), (ml = t));
      } else ml = 536870912;
    return ((t = sl.current), t !== null && (t.flags |= 32), ml);
  }
  function al(t, l, a) {
    (((t === ht && (ft === 2 || ft === 9)) || t.cancelPendingCommit !== null) &&
      (pe(t, 0), da(t, k, ml, !1)),
      Re(t, a),
      ((at & 2) === 0 || t !== ht) &&
        (t === ht && ((at & 2) === 0 && (La |= a), _t === 4 && da(t, k, ml, !1)), Cl(t)));
  }
  function m0(t, l, a) {
    if ((at & 6) !== 0) throw Error(s(327));
    var e = (!a && (l & 127) === 0 && (l & t.expiredLanes) === 0) || Ue(t, l),
      u = e ? sh(t, l) : Hf(t, l, !0),
      n = e;
    do {
      if (u === 0) {
        ge && !e && da(t, l, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), n && !fh(a))) {
          ((u = Hf(t, l, !1)), (n = !1));
          continue;
        }
        if (u === 2) {
          if (((n = l), t.errorRecoveryDisabledLanes & n)) var i = 0;
          else
            ((i = t.pendingLanes & -536870913), (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
          if (i !== 0) {
            l = i;
            t: {
              var f = t;
              u = cu;
              var c = f.current.memoizedState.isDehydrated;
              if ((c && (pe(f, i).flags |= 256), (i = Hf(f, i, !1)), i !== 2)) {
                if (Df && !c) {
                  ((f.errorRecoveryDisabledLanes |= n), (La |= n), (u = 4));
                  break t;
                }
                ((n = ll), (ll = u), n !== null && (ll === null ? (ll = n) : ll.push.apply(ll, n)));
              }
              u = i;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (pe(t, 0), da(t, l, 0, !0));
          break;
        }
        t: {
          switch (((e = t), (n = u), n)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              da(e, l, ml, !ra);
              break t;
            case 2:
              ll = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((l & 62914560) === l && ((u = yn + 300 - ul()), 10 < u)) {
            if ((da(e, l, ml, !ra), Du(e, 0, !0) !== 0)) break t;
            (($l = l),
              (e.timeoutHandle = Z0(
                h0.bind(null, e, a, ll, Sn, Uf, l, ml, La, Se, ra, n, "Throttled", -0, 0),
                u,
              )));
            break t;
          }
          h0(e, a, ll, Sn, Uf, l, ml, La, Se, ra, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Cl(t);
  }
  function h0(t, l, a, e, u, n, i, f, c, d, p, T, y, g) {
    if (((t.timeoutHandle = -1), (T = l.subtreeFlags), T & 8192 || (T & 16785408) === 16785408)) {
      ((T = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bl,
      }),
        n0(l, n, T));
      var H = (n & 62914560) === n ? yn - ul() : (n & 4194048) === n ? s0 - ul() : 0;
      if (((H = Kh(T, H)), H !== null)) {
        (($l = n),
          (t.cancelPendingCommit = H(_0.bind(null, t, l, n, a, e, u, i, f, c, p, T, null, y, g))),
          da(t, n, i, !d));
        return;
      }
    }
    _0(t, l, n, a, e, u, i, f, c);
  }
  function fh(t) {
    for (var l = t; ; ) {
      var a = l.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        l.flags & 16384 &&
        ((a = l.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var e = 0; e < a.length; e++) {
          var u = a[e],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!fl(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = l.child), l.subtreeFlags & 16384 && a !== null)) ((a.return = l), (l = a));
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        ((l.sibling.return = l.return), (l = l.sibling));
      }
    }
    return !0;
  }
  function da(t, l, a, e) {
    ((l &= ~Of),
      (l &= ~La),
      (t.suspendedLanes |= l),
      (t.pingedLanes &= ~l),
      e && (t.warmLanes |= l),
      (e = t.expirationTimes));
    for (var u = l; 0 < u; ) {
      var n = 31 - il(u),
        i = 1 << n;
      ((e[n] = -1), (u &= ~i));
    }
    a !== 0 && Ec(t, a, l);
  }
  function bn() {
    return (at & 6) === 0 ? (ou(0), !1) : !0;
  }
  function Cf() {
    if (F !== null) {
      if (ft === 0) var t = F.return;
      else ((t = F), (Gl = Na = null), Wi(t), (oe = null), (Je = 0), (t = F));
      for (; t !== null; ) (Vo(t.alternate, t), (t = t.return));
      F = null;
    }
  }
  function pe(t, l) {
    var a = t.timeoutHandle;
    (a !== -1 && ((t.timeoutHandle = -1), Dh(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      ($l = 0),
      Cf(),
      (ht = t),
      (F = a = jl(t.current, null)),
      (k = l),
      (ft = 0),
      (rl = null),
      (ra = !1),
      (ge = Ue(t, l)),
      (Df = !1),
      (Se = ml = Of = La = ma = _t = 0),
      (ll = cu = null),
      (Uf = !1),
      (l & 8) !== 0 && (l |= l & 32));
    var e = t.entangledLanes;
    if (e !== 0)
      for (t = t.entanglements, e &= l; 0 < e; ) {
        var u = 31 - il(e),
          n = 1 << u;
        ((l |= t[u]), (e &= ~n));
      }
    return ((Fl = l), Gu(), a);
  }
  function v0(t, l) {
    ((V = null),
      (S.H = tu),
      l === se || l === wu
        ? ((l = Us()), (ft = 3))
        : l === qi
          ? ((l = Us()), (ft = 4))
          : (ft =
              l === rf
                ? 8
                : l !== null && typeof l == "object" && typeof l.then == "function"
                  ? 6
                  : 1),
      (rl = l),
      F === null && ((_t = 1), cn(t, bl(l, t.current))));
  }
  function d0() {
    var t = sl.current;
    return t === null
      ? !0
      : (k & 4194048) === k
        ? Tl === null
        : (k & 62914560) === k || (k & 536870912) !== 0
          ? t === Tl
          : !1;
  }
  function y0() {
    var t = S.H;
    return ((S.H = tu), t === null ? tu : t);
  }
  function g0() {
    var t = S.A;
    return ((S.A = nh), t);
  }
  function pn() {
    ((_t = 4),
      ra || ((k & 4194048) !== k && sl.current !== null) || (ge = !0),
      ((ma & 134217727) === 0 && (La & 134217727) === 0) || ht === null || da(ht, k, ml, !1));
  }
  function Hf(t, l, a) {
    var e = at;
    at |= 2;
    var u = y0(),
      n = g0();
    ((ht !== t || k !== l) && ((Sn = null), pe(t, l)), (l = !1));
    var i = _t;
    t: do
      try {
        if (ft !== 0 && F !== null) {
          var f = F,
            c = rl;
          switch (ft) {
            case 8:
              (Cf(), (i = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              sl.current === null && (l = !0);
              var d = ft;
              if (((ft = 0), (rl = null), _e(t, f, c, d), a && ge)) {
                i = 0;
                break t;
              }
              break;
            default:
              ((d = ft), (ft = 0), (rl = null), _e(t, f, c, d));
          }
        }
        (ch(), (i = _t));
        break;
      } catch (p) {
        v0(t, p);
      }
    while (!0);
    return (
      l && t.shellSuspendCounter++,
      (Gl = Na = null),
      (at = e),
      (S.H = u),
      (S.A = n),
      F === null && ((ht = null), (k = 0), Gu()),
      i
    );
  }
  function ch() {
    for (; F !== null; ) S0(F);
  }
  function sh(t, l) {
    var a = at;
    at |= 2;
    var e = y0(),
      u = g0();
    ht !== t || k !== l ? ((Sn = null), (gn = ul() + 500), pe(t, l)) : (ge = Ue(t, l));
    t: do
      try {
        if (ft !== 0 && F !== null) {
          l = F;
          var n = rl;
          l: switch (ft) {
            case 1:
              ((ft = 0), (rl = null), _e(t, l, n, 1));
              break;
            case 2:
            case 9:
              if (Ds(n)) {
                ((ft = 0), (rl = null), b0(l));
                break;
              }
              ((l = function () {
                ((ft !== 2 && ft !== 9) || ht !== t || (ft = 7), Cl(t));
              }),
                n.then(l, l));
              break t;
            case 3:
              ft = 7;
              break t;
            case 4:
              ft = 5;
              break t;
            case 7:
              Ds(n) ? ((ft = 0), (rl = null), b0(l)) : ((ft = 0), (rl = null), _e(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (F.tag) {
                case 26:
                  i = F.memoizedState;
                case 5:
                case 27:
                  var f = F;
                  if (i ? ur(i) : f.stateNode.complete) {
                    ((ft = 0), (rl = null));
                    var c = f.sibling;
                    if (c !== null) F = c;
                    else {
                      var d = f.return;
                      d !== null ? ((F = d), _n(d)) : (F = null);
                    }
                    break l;
                  }
              }
              ((ft = 0), (rl = null), _e(t, l, n, 5));
              break;
            case 6:
              ((ft = 0), (rl = null), _e(t, l, n, 6));
              break;
            case 8:
              (Cf(), (_t = 6));
              break t;
            default:
              throw Error(s(462));
          }
        }
        oh();
        break;
      } catch (p) {
        v0(t, p);
      }
    while (!0);
    return (
      (Gl = Na = null),
      (S.H = e),
      (S.A = u),
      (at = a),
      F !== null ? 0 : ((ht = null), (k = 0), Gu(), _t)
    );
  }
  function oh() {
    for (; F !== null && !Cr(); ) S0(F);
  }
  function S0(t) {
    var l = Qo(t.alternate, t, Fl);
    ((t.memoizedProps = t.pendingProps), l === null ? _n(t) : (F = l));
  }
  function b0(t) {
    var l = t,
      a = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = qo(a, l, l.pendingProps, l.type, void 0, k);
        break;
      case 11:
        l = qo(a, l, l.pendingProps, l.type.render, l.ref, k);
        break;
      case 5:
        Wi(l);
      default:
        (Vo(a, l), (l = F = ys(l, Fl)), (l = Qo(a, l, Fl)));
    }
    ((t.memoizedProps = t.pendingProps), l === null ? _n(t) : (F = l));
  }
  function _e(t, l, a, e) {
    ((Gl = Na = null), Wi(l), (oe = null), (Je = 0));
    var u = l.return;
    try {
      if (Pm(t, u, l, a, k)) {
        ((_t = 1), cn(t, bl(a, t.current)), (F = null));
        return;
      }
    } catch (n) {
      if (u !== null) throw ((F = u), n);
      ((_t = 1), cn(t, bl(a, t.current)), (F = null));
      return;
    }
    l.flags & 32768
      ? (I || e === 1
          ? (t = !0)
          : ge || (k & 536870912) !== 0
            ? (t = !1)
            : ((ra = t = !0),
              (e === 2 || e === 9 || e === 3 || e === 6) &&
                ((e = sl.current), e !== null && e.tag === 13 && (e.flags |= 16384))),
        p0(l, t))
      : _n(l);
  }
  function _n(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        p0(l, ra);
        return;
      }
      t = l.return;
      var a = lh(l.alternate, l, Fl);
      if (a !== null) {
        F = a;
        return;
      }
      if (((l = l.sibling), l !== null)) {
        F = l;
        return;
      }
      F = l = t;
    } while (l !== null);
    _t === 0 && (_t = 5);
  }
  function p0(t, l) {
    do {
      var a = ah(t.alternate, t);
      if (a !== null) {
        ((a.flags &= 32767), (F = a));
        return;
      }
      if (
        ((a = t.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !l && ((t = t.sibling), t !== null))
      ) {
        F = t;
        return;
      }
      F = t = a;
    } while (t !== null);
    ((_t = 6), (F = null));
  }
  function _0(t, l, a, e, u, n, i, f, c) {
    t.cancelPendingCommit = null;
    do En();
    while (Rt !== 0);
    if ((at & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      if (
        ((n = l.lanes | l.childLanes),
        (n |= _i),
        Zr(t, a, n, i, f, c),
        t === ht && ((F = ht = null), (k = 0)),
        (be = l),
        (va = t),
        ($l = a),
        (Rf = n),
        (xf = u),
        (o0 = e),
        (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            vh(Tu, function () {
              return (M0(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (e = (l.flags & 13878) !== 0),
        (l.subtreeFlags & 13878) !== 0 || e)
      ) {
        ((e = S.T), (S.T = null), (u = D.p), (D.p = 2), (i = at), (at |= 4));
        try {
          eh(t, l, a);
        } finally {
          ((at = i), (D.p = u), (S.T = e));
        }
      }
      ((Rt = 1), E0(), T0(), A0());
    }
  }
  function E0() {
    if (Rt === 1) {
      Rt = 0;
      var t = va,
        l = be,
        a = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || a) {
        ((a = S.T), (S.T = null));
        var e = D.p;
        D.p = 2;
        var u = at;
        at |= 4;
        try {
          a0(l, t);
          var n = Jf,
            i = fs(t.containerInfo),
            f = n.focusedElem,
            c = n.selectionRange;
          if (i !== f && f && f.ownerDocument && is(f.ownerDocument.documentElement, f)) {
            if (c !== null && yi(f)) {
              var d = c.start,
                p = c.end;
              if ((p === void 0 && (p = d), "selectionStart" in f))
                ((f.selectionStart = d), (f.selectionEnd = Math.min(p, f.value.length)));
              else {
                var T = f.ownerDocument || document,
                  y = (T && T.defaultView) || window;
                if (y.getSelection) {
                  var g = y.getSelection(),
                    H = f.textContent.length,
                    G = Math.min(c.start, H),
                    rt = c.end === void 0 ? G : Math.min(c.end, H);
                  !g.extend && G > rt && ((i = rt), (rt = G), (G = i));
                  var m = ns(f, G),
                    o = ns(f, rt);
                  if (
                    m &&
                    o &&
                    (g.rangeCount !== 1 ||
                      g.anchorNode !== m.node ||
                      g.anchorOffset !== m.offset ||
                      g.focusNode !== o.node ||
                      g.focusOffset !== o.offset)
                  ) {
                    var v = T.createRange();
                    (v.setStart(m.node, m.offset),
                      g.removeAllRanges(),
                      G > rt
                        ? (g.addRange(v), g.extend(o.node, o.offset))
                        : (v.setEnd(o.node, o.offset), g.addRange(v)));
                  }
                }
              }
            }
            for (T = [], g = f; (g = g.parentNode); )
              g.nodeType === 1 && T.push({ element: g, left: g.scrollLeft, top: g.scrollTop });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < T.length; f++) {
              var _ = T[f];
              ((_.element.scrollLeft = _.left), (_.element.scrollTop = _.top));
            }
          }
          ((Hn = !!Kf), (Jf = Kf = null));
        } finally {
          ((at = u), (D.p = e), (S.T = a));
        }
      }
      ((t.current = l), (Rt = 2));
    }
  }
  function T0() {
    if (Rt === 2) {
      Rt = 0;
      var t = va,
        l = be,
        a = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || a) {
        ((a = S.T), (S.T = null));
        var e = D.p;
        D.p = 2;
        var u = at;
        at |= 4;
        try {
          ko(t, l.alternate, l);
        } finally {
          ((at = u), (D.p = e), (S.T = a));
        }
      }
      Rt = 3;
    }
  }
  function A0() {
    if (Rt === 4 || Rt === 3) {
      ((Rt = 0), Hr());
      var t = va,
        l = be,
        a = $l,
        e = o0;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0
        ? (Rt = 5)
        : ((Rt = 0), (be = va = null), z0(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (ha = null),
        kn(a),
        (l = l.stateNode),
        nl && typeof nl.onCommitFiberRoot == "function")
      )
        try {
          nl.onCommitFiberRoot(Oe, l, void 0, (l.current.flags & 128) === 128);
        } catch {}
      if (e !== null) {
        ((l = S.T), (u = D.p), (D.p = 2), (S.T = null));
        try {
          for (var n = t.onRecoverableError, i = 0; i < e.length; i++) {
            var f = e[i];
            n(f.value, { componentStack: f.stack });
          }
        } finally {
          ((S.T = l), (D.p = u));
        }
      }
      (($l & 3) !== 0 && En(),
        Cl(t),
        (u = t.pendingLanes),
        (a & 261930) !== 0 && (u & 42) !== 0 ? (t === Nf ? su++ : ((su = 0), (Nf = t))) : (su = 0),
        ou(0));
    }
  }
  function z0(t, l) {
    (t.pooledCacheLanes &= l) === 0 &&
      ((l = t.pooledCache), l != null && ((t.pooledCache = null), Ve(l)));
  }
  function En() {
    return (E0(), T0(), A0(), M0());
  }
  function M0() {
    if (Rt !== 5) return !1;
    var t = va,
      l = Rf;
    Rf = 0;
    var a = kn($l),
      e = S.T,
      u = D.p;
    try {
      ((D.p = 32 > a ? 32 : a), (S.T = null), (a = xf), (xf = null));
      var n = va,
        i = $l;
      if (((Rt = 0), (be = va = null), ($l = 0), (at & 6) !== 0)) throw Error(s(331));
      var f = at;
      if (
        ((at |= 4),
        f0(n.current),
        u0(n, n.current, i, a),
        (at = f),
        ou(0, !1),
        nl && typeof nl.onPostCommitFiberRoot == "function")
      )
        try {
          nl.onPostCommitFiberRoot(Oe, n);
        } catch {}
      return !0;
    } finally {
      ((D.p = u), (S.T = e), z0(t, l));
    }
  }
  function D0(t, l, a) {
    ((l = bl(a, l)),
      (l = of(t.stateNode, l, 2)),
      (t = fa(t, l, 2)),
      t !== null && (Re(t, 2), Cl(t)));
  }
  function ct(t, l, a) {
    if (t.tag === 3) D0(t, t, a);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          D0(l, t, a);
          break;
        } else if (l.tag === 1) {
          var e = l.stateNode;
          if (
            typeof l.type.getDerivedStateFromError == "function" ||
            (typeof e.componentDidCatch == "function" && (ha === null || !ha.has(e)))
          ) {
            ((t = bl(a, t)),
              (a = Oo(2)),
              (e = fa(l, a, 2)),
              e !== null && (Uo(a, e, l, t), Re(e, 2), Cl(e)));
            break;
          }
        }
        l = l.return;
      }
  }
  function Bf(t, l, a) {
    var e = t.pingCache;
    if (e === null) {
      e = t.pingCache = new ih();
      var u = new Set();
      e.set(l, u);
    } else ((u = e.get(l)), u === void 0 && ((u = new Set()), e.set(l, u)));
    u.has(a) || ((Df = !0), u.add(a), (t = rh.bind(null, t, l, a)), l.then(t, t));
  }
  function rh(t, l, a) {
    var e = t.pingCache;
    (e !== null && e.delete(l),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      ht === t &&
        (k & a) === a &&
        (_t === 4 || (_t === 3 && (k & 62914560) === k && 300 > ul() - yn)
          ? (at & 2) === 0 && pe(t, 0)
          : (Of |= a),
        Se === k && (Se = 0)),
      Cl(t));
  }
  function O0(t, l) {
    (l === 0 && (l = _c()), (t = Ua(t, l)), t !== null && (Re(t, l), Cl(t)));
  }
  function mh(t) {
    var l = t.memoizedState,
      a = 0;
    (l !== null && (a = l.retryLane), O0(t, a));
  }
  function hh(t, l) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var e = t.stateNode,
          u = t.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        e = t.stateNode;
        break;
      case 22:
        e = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (e !== null && e.delete(l), O0(t, a));
  }
  function vh(t, l) {
    return wn(t, l);
  }
  var Tn = null,
    Ee = null,
    qf = !1,
    An = !1,
    jf = !1,
    ya = 0;
  function Cl(t) {
    (t !== Ee && t.next === null && (Ee === null ? (Tn = Ee = t) : (Ee = Ee.next = t)),
      (An = !0),
      qf || ((qf = !0), yh()));
  }
  function ou(t, l) {
    if (!jf && An) {
      jf = !0;
      do
        for (var a = !1, e = Tn; e !== null; ) {
          if (t !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = e.suspendedLanes,
                f = e.pingedLanes;
              ((n = (1 << (31 - il(42 | t) + 1)) - 1),
                (n &= u & ~(i & ~f)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((a = !0), N0(e, n));
          } else
            ((n = k),
              (n = Du(
                e,
                e === ht ? n : 0,
                e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
              )),
              (n & 3) === 0 || Ue(e, n) || ((a = !0), N0(e, n)));
          e = e.next;
        }
      while (a);
      jf = !1;
    }
  }
  function dh() {
    U0();
  }
  function U0() {
    An = qf = !1;
    var t = 0;
    ya !== 0 && Mh() && (t = ya);
    for (var l = ul(), a = null, e = Tn; e !== null; ) {
      var u = e.next,
        n = R0(e, l);
      (n === 0
        ? ((e.next = null), a === null ? (Tn = u) : (a.next = u), u === null && (Ee = a))
        : ((a = e), (t !== 0 || (n & 3) !== 0) && (An = !0)),
        (e = u));
    }
    ((Rt !== 0 && Rt !== 5) || ou(t), ya !== 0 && (ya = 0));
  }
  function R0(t, l) {
    for (
      var a = t.suspendedLanes,
        e = t.pingedLanes,
        u = t.expirationTimes,
        n = t.pendingLanes & -62914561;
      0 < n;
    ) {
      var i = 31 - il(n),
        f = 1 << i,
        c = u[i];
      (c === -1
        ? ((f & a) === 0 || (f & e) !== 0) && (u[i] = Qr(f, l))
        : c <= l && (t.expiredLanes |= f),
        (n &= ~f));
    }
    if (
      ((l = ht),
      (a = k),
      (a = Du(t, t === l ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (e = t.callbackNode),
      a === 0 || (t === l && (ft === 2 || ft === 9)) || t.cancelPendingCommit !== null)
    )
      return (e !== null && e !== null && Wn(e), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((a & 3) === 0 || Ue(t, a)) {
      if (((l = a & -a), l === t.callbackPriority)) return l;
      switch ((e !== null && Wn(e), kn(a))) {
        case 2:
        case 8:
          a = bc;
          break;
        case 32:
          a = Tu;
          break;
        case 268435456:
          a = pc;
          break;
        default:
          a = Tu;
      }
      return (
        (e = x0.bind(null, t)), (a = wn(a, e)), (t.callbackPriority = l), (t.callbackNode = a), l
      );
    }
    return (
      e !== null && e !== null && Wn(e), (t.callbackPriority = 2), (t.callbackNode = null), 2
    );
  }
  function x0(t, l) {
    if (Rt !== 0 && Rt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var a = t.callbackNode;
    if (En() && t.callbackNode !== a) return null;
    var e = k;
    return (
      (e = Du(t, t === ht ? e : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      e === 0
        ? null
        : (m0(t, e, l),
          R0(t, ul()),
          t.callbackNode != null && t.callbackNode === a ? x0.bind(null, t) : null)
    );
  }
  function N0(t, l) {
    if (En()) return null;
    m0(t, l, !0);
  }
  function yh() {
    Oh(function () {
      (at & 6) !== 0 ? wn(Sc, dh) : U0();
    });
  }
  function Yf() {
    if (ya === 0) {
      var t = fe;
      (t === 0 && ((t = Au), (Au <<= 1), (Au & 261888) === 0 && (Au = 256)), (ya = t));
    }
    return ya;
  }
  function C0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : xu("" + t);
  }
  function H0(t, l) {
    var a = l.ownerDocument.createElement("input");
    return (
      (a.name = l.name),
      (a.value = l.value),
      t.id && a.setAttribute("form", t.id),
      l.parentNode.insertBefore(a, l),
      (t = new FormData(t)),
      a.parentNode.removeChild(a),
      t
    );
  }
  function gh(t, l, a, e, u) {
    if (l === "submit" && a && a.stateNode === u) {
      var n = C0((u[$t] || null).action),
        i = e.submitter;
      i &&
        ((l = (l = i[$t] || null) ? C0(l.formAction) : i.getAttribute("formAction")),
        l !== null && ((n = l), (i = null)));
      var f = new Bu("action", "action", null, e, u);
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (e.defaultPrevented) {
                if (ya !== 0) {
                  var c = i ? H0(u, i) : new FormData(u);
                  ef(a, { pending: !0, data: c, method: u.method, action: n }, null, c);
                }
              } else
                typeof n == "function" &&
                  (f.preventDefault(),
                  (c = i ? H0(u, i) : new FormData(u)),
                  ef(a, { pending: !0, data: c, method: u.method, action: n }, n, c));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Gf = 0; Gf < pi.length; Gf++) {
    var Xf = pi[Gf],
      Sh = Xf.toLowerCase(),
      bh = Xf[0].toUpperCase() + Xf.slice(1);
    Ml(Sh, "on" + bh);
  }
  (Ml(os, "onAnimationEnd"),
    Ml(rs, "onAnimationIteration"),
    Ml(ms, "onAnimationStart"),
    Ml("dblclick", "onDoubleClick"),
    Ml("focusin", "onFocus"),
    Ml("focusout", "onBlur"),
    Ml(Bm, "onTransitionRun"),
    Ml(qm, "onTransitionStart"),
    Ml(jm, "onTransitionCancel"),
    Ml(hs, "onTransitionEnd"),
    wa("onMouseEnter", ["mouseout", "mouseover"]),
    wa("onMouseLeave", ["mouseout", "mouseover"]),
    wa("onPointerEnter", ["pointerout", "pointerover"]),
    wa("onPointerLeave", ["pointerout", "pointerover"]),
    za("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    za(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    za("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    za("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    za(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    za(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var ru =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    ph = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ru),
    );
  function B0(t, l) {
    l = (l & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var e = t[a],
        u = e.event;
      e = e.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = e.length - 1; 0 <= i; i--) {
            var f = e[i],
              c = f.instance,
              d = f.currentTarget;
            if (((f = f.listener), c !== n && u.isPropagationStopped())) break t;
            ((n = f), (u.currentTarget = d));
            try {
              n(u);
            } catch (p) {
              Yu(p);
            }
            ((u.currentTarget = null), (n = c));
          }
        else
          for (i = 0; i < e.length; i++) {
            if (
              ((f = e[i]),
              (c = f.instance),
              (d = f.currentTarget),
              (f = f.listener),
              c !== n && u.isPropagationStopped())
            )
              break t;
            ((n = f), (u.currentTarget = d));
            try {
              n(u);
            } catch (p) {
              Yu(p);
            }
            ((u.currentTarget = null), (n = c));
          }
      }
    }
  }
  function $(t, l) {
    var a = l[Pn];
    a === void 0 && (a = l[Pn] = new Set());
    var e = t + "__bubble";
    a.has(e) || (q0(l, t, 2, !1), a.add(e));
  }
  function Lf(t, l, a) {
    var e = 0;
    (l && (e |= 4), q0(a, t, e, l));
  }
  var zn = "_reactListening" + Math.random().toString(36).slice(2);
  function Qf(t) {
    if (!t[zn]) {
      ((t[zn] = !0),
        Oc.forEach(function (a) {
          a !== "selectionchange" && (ph.has(a) || Lf(a, !1, t), Lf(a, !0, t));
        }));
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[zn] || ((l[zn] = !0), Lf("selectionchange", !1, l));
    }
  }
  function q0(t, l, a, e) {
    switch (rr(l)) {
      case 2:
        var u = Wh;
        break;
      case 8:
        u = Fh;
        break;
      default:
        u = ec;
    }
    ((a = u.bind(null, l, a, t)),
      (u = void 0),
      !fi || (l !== "touchstart" && l !== "touchmove" && l !== "wheel") || (u = !0),
      e
        ? u !== void 0
          ? t.addEventListener(l, a, { capture: !0, passive: u })
          : t.addEventListener(l, a, !0)
        : u !== void 0
          ? t.addEventListener(l, a, { passive: u })
          : t.addEventListener(l, a, !1));
  }
  function Zf(t, l, a, e, u) {
    var n = e;
    if ((l & 1) === 0 && (l & 2) === 0 && e !== null)
      t: for (;;) {
        if (e === null) return;
        var i = e.tag;
        if (i === 3 || i === 4) {
          var f = e.stateNode.containerInfo;
          if (f === u) break;
          if (i === 4)
            for (i = e.return; i !== null; ) {
              var c = i.tag;
              if ((c === 3 || c === 4) && i.stateNode.containerInfo === u) return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (((i = Va(f)), i === null)) return;
            if (((c = i.tag), c === 5 || c === 6 || c === 26 || c === 27)) {
              e = n = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        e = e.return;
      }
    Xc(function () {
      var d = n,
        p = ni(a),
        T = [];
      t: {
        var y = vs.get(t);
        if (y !== void 0) {
          var g = Bu,
            H = t;
          switch (t) {
            case "keypress":
              if (Cu(a) === 0) break t;
            case "keydown":
            case "keyup":
              g = hm;
              break;
            case "focusin":
              ((H = "focus"), (g = ri));
              break;
            case "focusout":
              ((H = "blur"), (g = ri));
              break;
            case "beforeblur":
            case "afterblur":
              g = ri;
              break;
            case "click":
              if (a.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = Zc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = lm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = ym;
              break;
            case os:
            case rs:
            case ms:
              g = um;
              break;
            case hs:
              g = Sm;
              break;
            case "scroll":
            case "scrollend":
              g = Ir;
              break;
            case "wheel":
              g = pm;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = im;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Kc;
              break;
            case "toggle":
            case "beforetoggle":
              g = Em;
          }
          var G = (l & 4) !== 0,
            rt = !G && (t === "scroll" || t === "scrollend"),
            m = G ? (y !== null ? y + "Capture" : null) : y;
          G = [];
          for (var o = d, v; o !== null; ) {
            var _ = o;
            if (
              ((v = _.stateNode),
              (_ = _.tag),
              (_ !== 5 && _ !== 26 && _ !== 27) ||
                v === null ||
                m === null ||
                ((_ = Ce(o, m)), _ != null && G.push(mu(o, _, v))),
              rt)
            )
              break;
            o = o.return;
          }
          0 < G.length && ((y = new g(y, H, null, a, p)), T.push({ event: y, listeners: G }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (
            ((y = t === "mouseover" || t === "pointerover"),
            (g = t === "mouseout" || t === "pointerout"),
            y && a !== ui && (H = a.relatedTarget || a.fromElement) && (Va(H) || H[Za]))
          )
            break t;
          if (
            (g || y) &&
            ((y =
              p.window === p
                ? p
                : (y = p.ownerDocument)
                  ? y.defaultView || y.parentWindow
                  : window),
            g
              ? ((H = a.relatedTarget || a.toElement),
                (g = d),
                (H = H ? Va(H) : null),
                H !== null &&
                  ((rt = z(H)), (G = H.tag), H !== rt || (G !== 5 && G !== 27 && G !== 6)) &&
                  (H = null))
              : ((g = null), (H = d)),
            g !== H)
          ) {
            if (
              ((G = Zc),
              (_ = "onMouseLeave"),
              (m = "onMouseEnter"),
              (o = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((G = Kc), (_ = "onPointerLeave"), (m = "onPointerEnter"), (o = "pointer")),
              (rt = g == null ? y : Ne(g)),
              (v = H == null ? y : Ne(H)),
              (y = new G(_, o + "leave", g, a, p)),
              (y.target = rt),
              (y.relatedTarget = v),
              (_ = null),
              Va(p) === d &&
                ((G = new G(m, o + "enter", H, a, p)),
                (G.target = v),
                (G.relatedTarget = rt),
                (_ = G)),
              (rt = _),
              g && H)
            )
              l: {
                for (G = _h, m = g, o = H, v = 0, _ = m; _; _ = G(_)) v++;
                _ = 0;
                for (var Y = o; Y; Y = G(Y)) _++;
                for (; 0 < v - _; ) ((m = G(m)), v--);
                for (; 0 < _ - v; ) ((o = G(o)), _--);
                for (; v--; ) {
                  if (m === o || (o !== null && m === o.alternate)) {
                    G = m;
                    break l;
                  }
                  ((m = G(m)), (o = G(o)));
                }
                G = null;
              }
            else G = null;
            (g !== null && j0(T, y, g, G, !1), H !== null && rt !== null && j0(T, rt, H, G, !0));
          }
        }
        t: {
          if (
            ((y = d ? Ne(d) : window),
            (g = y.nodeName && y.nodeName.toLowerCase()),
            g === "select" || (g === "input" && y.type === "file"))
          )
            var tt = Ic;
          else if (kc(y))
            if (ts) tt = Nm;
            else {
              tt = Rm;
              var j = Um;
            }
          else
            ((g = y.nodeName),
              !g || g.toLowerCase() !== "input" || (y.type !== "checkbox" && y.type !== "radio")
                ? d && ei(d.elementType) && (tt = Ic)
                : (tt = xm));
          if (tt && (tt = tt(t, d))) {
            Pc(T, tt, a, p);
            break t;
          }
          (j && j(t, y, d),
            t === "focusout" &&
              d &&
              y.type === "number" &&
              d.memoizedProps.value != null &&
              ai(y, "number", y.value));
        }
        switch (((j = d ? Ne(d) : window), t)) {
          case "focusin":
            (kc(j) || j.contentEditable === "true") && ((Ia = j), (gi = d), (Le = null));
            break;
          case "focusout":
            Le = gi = Ia = null;
            break;
          case "mousedown":
            Si = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Si = !1), cs(T, a, p));
            break;
          case "selectionchange":
            if (Hm) break;
          case "keydown":
          case "keyup":
            cs(T, a, p);
        }
        var K;
        if (hi)
          t: {
            switch (t) {
              case "compositionstart":
                var P = "onCompositionStart";
                break t;
              case "compositionend":
                P = "onCompositionEnd";
                break t;
              case "compositionupdate":
                P = "onCompositionUpdate";
                break t;
            }
            P = void 0;
          }
        else
          Pa
            ? Fc(t, a) && (P = "onCompositionEnd")
            : t === "keydown" && a.keyCode === 229 && (P = "onCompositionStart");
        (P &&
          (Jc &&
            a.locale !== "ko" &&
            (Pa || P !== "onCompositionStart"
              ? P === "onCompositionEnd" && Pa && (K = Lc())
              : ((ta = p), (ci = "value" in ta ? ta.value : ta.textContent), (Pa = !0))),
          (j = Mn(d, P)),
          0 < j.length &&
            ((P = new Vc(P, t, null, a, p)),
            T.push({ event: P, listeners: j }),
            K ? (P.data = K) : ((K = $c(a)), K !== null && (P.data = K)))),
          (K = Am ? zm(t, a) : Mm(t, a)) &&
            ((P = Mn(d, "onBeforeInput")),
            0 < P.length &&
              ((j = new Vc("onBeforeInput", "beforeinput", null, a, p)),
              T.push({ event: j, listeners: P }),
              (j.data = K))),
          gh(T, t, d, a, p));
      }
      B0(T, l);
    });
  }
  function mu(t, l, a) {
    return { instance: t, listener: l, currentTarget: a };
  }
  function Mn(t, l) {
    for (var a = l + "Capture", e = []; t !== null; ) {
      var u = t,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Ce(t, a)),
          u != null && e.unshift(mu(t, u, n)),
          (u = Ce(t, l)),
          u != null && e.push(mu(t, u, n))),
        t.tag === 3)
      )
        return e;
      t = t.return;
    }
    return [];
  }
  function _h(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function j0(t, l, a, e, u) {
    for (var n = l._reactName, i = []; a !== null && a !== e; ) {
      var f = a,
        c = f.alternate,
        d = f.stateNode;
      if (((f = f.tag), c !== null && c === e)) break;
      ((f !== 5 && f !== 26 && f !== 27) ||
        d === null ||
        ((c = d),
        u
          ? ((d = Ce(a, n)), d != null && i.unshift(mu(a, d, c)))
          : u || ((d = Ce(a, n)), d != null && i.push(mu(a, d, c)))),
        (a = a.return));
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Eh = /\r\n?/g,
    Th = /\u0000|\uFFFD/g;
  function Y0(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        Eh,
        `
`,
      )
      .replace(Th, "");
  }
  function G0(t, l) {
    return ((l = Y0(l)), Y0(t) === l);
  }
  function ot(t, l, a, e, u, n) {
    switch (a) {
      case "children":
        typeof e == "string"
          ? l === "body" || (l === "textarea" && e === "") || Fa(t, e)
          : (typeof e == "number" || typeof e == "bigint") && l !== "body" && Fa(t, "" + e);
        break;
      case "className":
        Uu(t, "class", e);
        break;
      case "tabIndex":
        Uu(t, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Uu(t, a, e);
        break;
      case "style":
        Yc(t, e, n);
        break;
      case "data":
        if (l !== "object") {
          Uu(t, "data", e);
          break;
        }
      case "src":
      case "href":
        if (e === "" && (l !== "a" || a !== "href")) {
          t.removeAttribute(a);
          break;
        }
        if (e == null || typeof e == "function" || typeof e == "symbol" || typeof e == "boolean") {
          t.removeAttribute(a);
          break;
        }
        ((e = xu("" + e)), t.setAttribute(a, e));
        break;
      case "action":
      case "formAction":
        if (typeof e == "function") {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof n == "function" &&
            (a === "formAction"
              ? (l !== "input" && ot(t, l, "name", u.name, u, null),
                ot(t, l, "formEncType", u.formEncType, u, null),
                ot(t, l, "formMethod", u.formMethod, u, null),
                ot(t, l, "formTarget", u.formTarget, u, null))
              : (ot(t, l, "encType", u.encType, u, null),
                ot(t, l, "method", u.method, u, null),
                ot(t, l, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          t.removeAttribute(a);
          break;
        }
        ((e = xu("" + e)), t.setAttribute(a, e));
        break;
      case "onClick":
        e != null && (t.onclick = Bl);
        break;
      case "onScroll":
        e != null && $("scroll", t);
        break;
      case "onScrollEnd":
        e != null && $("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e)) throw Error(s(61));
          if (((a = e.__html), a != null)) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = a;
          }
        }
        break;
      case "multiple":
        t.multiple = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "muted":
        t.muted = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (e == null || typeof e == "function" || typeof e == "boolean" || typeof e == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        ((a = xu("" + e)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        e != null && typeof e != "function" && typeof e != "symbol"
          ? t.setAttribute(a, "" + e)
          : t.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        e && typeof e != "function" && typeof e != "symbol"
          ? t.setAttribute(a, "")
          : t.removeAttribute(a);
        break;
      case "capture":
      case "download":
        e === !0
          ? t.setAttribute(a, "")
          : e !== !1 && e != null && typeof e != "function" && typeof e != "symbol"
            ? t.setAttribute(a, e)
            : t.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        e != null && typeof e != "function" && typeof e != "symbol" && !isNaN(e) && 1 <= e
          ? t.setAttribute(a, e)
          : t.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        e == null || typeof e == "function" || typeof e == "symbol" || isNaN(e)
          ? t.removeAttribute(a)
          : t.setAttribute(a, e);
        break;
      case "popover":
        ($("beforetoggle", t), $("toggle", t), Ou(t, "popover", e));
        break;
      case "xlinkActuate":
        Hl(t, "http://www.w3.org/1999/xlink", "xlink:actuate", e);
        break;
      case "xlinkArcrole":
        Hl(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", e);
        break;
      case "xlinkRole":
        Hl(t, "http://www.w3.org/1999/xlink", "xlink:role", e);
        break;
      case "xlinkShow":
        Hl(t, "http://www.w3.org/1999/xlink", "xlink:show", e);
        break;
      case "xlinkTitle":
        Hl(t, "http://www.w3.org/1999/xlink", "xlink:title", e);
        break;
      case "xlinkType":
        Hl(t, "http://www.w3.org/1999/xlink", "xlink:type", e);
        break;
      case "xmlBase":
        Hl(t, "http://www.w3.org/XML/1998/namespace", "xml:base", e);
        break;
      case "xmlLang":
        Hl(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", e);
        break;
      case "xmlSpace":
        Hl(t, "http://www.w3.org/XML/1998/namespace", "xml:space", e);
        break;
      case "is":
        Ou(t, "is", e);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
          ((a = kr.get(a) || a), Ou(t, a, e));
    }
  }
  function Vf(t, l, a, e, u, n) {
    switch (a) {
      case "style":
        Yc(t, e, n);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e)) throw Error(s(61));
          if (((a = e.__html), a != null)) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof e == "string"
          ? Fa(t, e)
          : (typeof e == "number" || typeof e == "bigint") && Fa(t, "" + e);
        break;
      case "onScroll":
        e != null && $("scroll", t);
        break;
      case "onScrollEnd":
        e != null && $("scrollend", t);
        break;
      case "onClick":
        e != null && (t.onclick = Bl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Uc.hasOwnProperty(a))
          t: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (l = a.slice(2, u ? a.length - 7 : void 0)),
              (n = t[$t] || null),
              (n = n != null ? n[a] : null),
              typeof n == "function" && t.removeEventListener(l, n, u),
              typeof e == "function")
            ) {
              (typeof n != "function" &&
                n !== null &&
                (a in t ? (t[a] = null) : t.hasAttribute(a) && t.removeAttribute(a)),
                t.addEventListener(l, e, u));
              break t;
            }
            a in t ? (t[a] = e) : e === !0 ? t.setAttribute(a, "") : Ou(t, a, e);
          }
    }
  }
  function Gt(t, l, a) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ($("error", t), $("load", t));
        var e = !1,
          u = !1,
          n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var i = a[n];
            if (i != null)
              switch (n) {
                case "src":
                  e = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, l));
                default:
                  ot(t, l, n, i, a, null);
              }
          }
        (u && ot(t, l, "srcSet", a.srcSet, a, null), e && ot(t, l, "src", a.src, a, null));
        return;
      case "input":
        $("invalid", t);
        var f = (n = i = u = null),
          c = null,
          d = null;
        for (e in a)
          if (a.hasOwnProperty(e)) {
            var p = a[e];
            if (p != null)
              switch (e) {
                case "name":
                  u = p;
                  break;
                case "type":
                  i = p;
                  break;
                case "checked":
                  c = p;
                  break;
                case "defaultChecked":
                  d = p;
                  break;
                case "value":
                  n = p;
                  break;
                case "defaultValue":
                  f = p;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (p != null) throw Error(s(137, l));
                  break;
                default:
                  ot(t, l, e, p, a, null);
              }
          }
        Hc(t, n, f, c, d, i, u, !1);
        return;
      case "select":
        ($("invalid", t), (e = i = n = null));
        for (u in a)
          if (a.hasOwnProperty(u) && ((f = a[u]), f != null))
            switch (u) {
              case "value":
                n = f;
                break;
              case "defaultValue":
                i = f;
                break;
              case "multiple":
                e = f;
              default:
                ot(t, l, u, f, a, null);
            }
        ((l = n),
          (a = i),
          (t.multiple = !!e),
          l != null ? Wa(t, !!e, l, !1) : a != null && Wa(t, !!e, a, !0));
        return;
      case "textarea":
        ($("invalid", t), (n = u = e = null));
        for (i in a)
          if (a.hasOwnProperty(i) && ((f = a[i]), f != null))
            switch (i) {
              case "value":
                e = f;
                break;
              case "defaultValue":
                u = f;
                break;
              case "children":
                n = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(s(91));
                break;
              default:
                ot(t, l, i, f, a, null);
            }
        qc(t, e, u, n);
        return;
      case "option":
        for (c in a)
          a.hasOwnProperty(c) &&
            ((e = a[c]), e != null) &&
            (c === "selected"
              ? (t.selected = e && typeof e != "function" && typeof e != "symbol")
              : ot(t, l, c, e, a, null));
        return;
      case "dialog":
        ($("beforetoggle", t), $("toggle", t), $("cancel", t), $("close", t));
        break;
      case "iframe":
      case "object":
        $("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < ru.length; e++) $(ru[e], t);
        break;
      case "image":
        ($("error", t), $("load", t));
        break;
      case "details":
        $("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ($("error", t), $("load", t));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (d in a)
          if (a.hasOwnProperty(d) && ((e = a[d]), e != null))
            switch (d) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                ot(t, l, d, e, a, null);
            }
        return;
      default:
        if (ei(l)) {
          for (p in a)
            a.hasOwnProperty(p) && ((e = a[p]), e !== void 0 && Vf(t, l, p, e, a, void 0));
          return;
        }
    }
    for (f in a) a.hasOwnProperty(f) && ((e = a[f]), e != null && ot(t, l, f, e, a, null));
  }
  function Ah(t, l, a, e) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          n = null,
          i = null,
          f = null,
          c = null,
          d = null,
          p = null;
        for (g in a) {
          var T = a[g];
          if (a.hasOwnProperty(g) && T != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                c = T;
              default:
                e.hasOwnProperty(g) || ot(t, l, g, null, e, T);
            }
        }
        for (var y in e) {
          var g = e[y];
          if (((T = a[y]), e.hasOwnProperty(y) && (g != null || T != null)))
            switch (y) {
              case "type":
                n = g;
                break;
              case "name":
                u = g;
                break;
              case "checked":
                d = g;
                break;
              case "defaultChecked":
                p = g;
                break;
              case "value":
                i = g;
                break;
              case "defaultValue":
                f = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null) throw Error(s(137, l));
                break;
              default:
                g !== T && ot(t, l, y, g, e, T);
            }
        }
        li(t, i, f, c, d, p, n, u);
        return;
      case "select":
        g = i = f = y = null;
        for (n in a)
          if (((c = a[n]), a.hasOwnProperty(n) && c != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = c;
              default:
                e.hasOwnProperty(n) || ot(t, l, n, null, e, c);
            }
        for (u in e)
          if (((n = e[u]), (c = a[u]), e.hasOwnProperty(u) && (n != null || c != null)))
            switch (u) {
              case "value":
                y = n;
                break;
              case "defaultValue":
                f = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== c && ot(t, l, u, n, e, c);
            }
        ((l = f),
          (a = i),
          (e = g),
          y != null
            ? Wa(t, !!a, y, !1)
            : !!e != !!a && (l != null ? Wa(t, !!a, l, !0) : Wa(t, !!a, a ? [] : "", !1)));
        return;
      case "textarea":
        g = y = null;
        for (f in a)
          if (((u = a[f]), a.hasOwnProperty(f) && u != null && !e.hasOwnProperty(f)))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(t, l, f, null, e, u);
            }
        for (i in e)
          if (((u = e[i]), (n = a[i]), e.hasOwnProperty(i) && (u != null || n != null)))
            switch (i) {
              case "value":
                y = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && ot(t, l, i, u, e, n);
            }
        Bc(t, y, g);
        return;
      case "option":
        for (var H in a)
          ((y = a[H]),
            a.hasOwnProperty(H) &&
              y != null &&
              !e.hasOwnProperty(H) &&
              (H === "selected" ? (t.selected = !1) : ot(t, l, H, null, e, y)));
        for (c in e)
          ((y = e[c]),
            (g = a[c]),
            e.hasOwnProperty(c) &&
              y !== g &&
              (y != null || g != null) &&
              (c === "selected"
                ? (t.selected = y && typeof y != "function" && typeof y != "symbol")
                : ot(t, l, c, y, e, g)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var G in a)
          ((y = a[G]),
            a.hasOwnProperty(G) && y != null && !e.hasOwnProperty(G) && ot(t, l, G, null, e, y));
        for (d in e)
          if (((y = e[d]), (g = a[d]), e.hasOwnProperty(d) && y !== g && (y != null || g != null)))
            switch (d) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(s(137, l));
                break;
              default:
                ot(t, l, d, y, e, g);
            }
        return;
      default:
        if (ei(l)) {
          for (var rt in a)
            ((y = a[rt]),
              a.hasOwnProperty(rt) &&
                y !== void 0 &&
                !e.hasOwnProperty(rt) &&
                Vf(t, l, rt, void 0, e, y));
          for (p in e)
            ((y = e[p]),
              (g = a[p]),
              !e.hasOwnProperty(p) ||
                y === g ||
                (y === void 0 && g === void 0) ||
                Vf(t, l, p, y, e, g));
          return;
        }
    }
    for (var m in a)
      ((y = a[m]),
        a.hasOwnProperty(m) && y != null && !e.hasOwnProperty(m) && ot(t, l, m, null, e, y));
    for (T in e)
      ((y = e[T]),
        (g = a[T]),
        !e.hasOwnProperty(T) || y === g || (y == null && g == null) || ot(t, l, T, y, e, g));
  }
  function X0(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function zh() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, l = 0, a = performance.getEntriesByType("resource"), e = 0;
        e < a.length;
        e++
      ) {
        var u = a[e],
          n = u.transferSize,
          i = u.initiatorType,
          f = u.duration;
        if (n && f && X0(i)) {
          for (i = 0, f = u.responseEnd, e += 1; e < a.length; e++) {
            var c = a[e],
              d = c.startTime;
            if (d > f) break;
            var p = c.transferSize,
              T = c.initiatorType;
            p && X0(T) && ((c = c.responseEnd), (i += p * (c < f ? 1 : (f - d) / (c - d))));
          }
          if ((--e, (l += (8 * (n + i)) / (u.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var Kf = null,
    Jf = null;
  function Dn(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function L0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Q0(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function wf(t, l) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof l.children == "string" ||
      typeof l.children == "number" ||
      typeof l.children == "bigint" ||
      (typeof l.dangerouslySetInnerHTML == "object" &&
        l.dangerouslySetInnerHTML !== null &&
        l.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Wf = null;
  function Mh() {
    var t = window.event;
    return t && t.type === "popstate" ? (t === Wf ? !1 : ((Wf = t), !0)) : ((Wf = null), !1);
  }
  var Z0 = typeof setTimeout == "function" ? setTimeout : void 0,
    Dh = typeof clearTimeout == "function" ? clearTimeout : void 0,
    V0 = typeof Promise == "function" ? Promise : void 0,
    Oh =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof V0 < "u"
          ? function (t) {
              return V0.resolve(null).then(t).catch(Uh);
            }
          : Z0;
  function Uh(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function ga(t) {
    return t === "head";
  }
  function K0(t, l) {
    var a = l,
      e = 0;
    do {
      var u = a.nextSibling;
      if ((t.removeChild(a), u && u.nodeType === 8))
        if (((a = u.data), a === "/$" || a === "/&")) {
          if (e === 0) {
            (t.removeChild(u), Me(l));
            return;
          }
          e--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") e++;
        else if (a === "html") hu(t.ownerDocument.documentElement);
        else if (a === "head") {
          ((a = t.ownerDocument.head), hu(a));
          for (var n = a.firstChild; n; ) {
            var i = n.nextSibling,
              f = n.nodeName;
            (n[xe] ||
              f === "SCRIPT" ||
              f === "STYLE" ||
              (f === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(n),
              (n = i));
          }
        } else a === "body" && hu(t.ownerDocument.body);
      a = u;
    } while (a);
    Me(l);
  }
  function J0(t, l) {
    var a = t;
    t = 0;
    do {
      var e = a.nextSibling;
      if (
        (a.nodeType === 1
          ? l
            ? ((a._stashedDisplay = a.style.display), (a.style.display = "none"))
            : ((a.style.display = a._stashedDisplay || ""),
              a.getAttribute("style") === "" && a.removeAttribute("style"))
          : a.nodeType === 3 &&
            (l
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
              : (a.nodeValue = a._stashedText || "")),
        e && e.nodeType === 8)
      )
        if (((a = e.data), a === "/$")) {
          if (t === 0) break;
          t--;
        } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || t++;
      a = e;
    } while (a);
  }
  function Ff(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var a = l;
      switch (((l = l.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Ff(a), In(a));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function Rh(t, l, a, e) {
    for (; t.nodeType === 1; ) {
      var u = a;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!e && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (e) {
        if (!t[xe])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((n = t.getAttribute("rel")),
                n === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== u.rel ||
                t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) ||
                t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((n = t.getAttribute("src")),
                (n !== (u.src == null ? null : u.src) ||
                  t.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  t.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === n) return t;
      } else return t;
      if (((t = Al(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function xh(t, l, a) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
        ((t = Al(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function w0(t, l) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l) ||
        ((t = Al(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function $f(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function kf(t) {
    return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
  }
  function Nh(t, l) {
    var a = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || a.readyState !== "loading") l();
    else {
      var e = function () {
        (l(), a.removeEventListener("DOMContentLoaded", e));
      };
      (a.addEventListener("DOMContentLoaded", e), (t._reactRetry = e));
    }
  }
  function Al(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (
          ((l = t.data),
          l === "$" ||
            l === "$!" ||
            l === "$?" ||
            l === "$~" ||
            l === "&" ||
            l === "F!" ||
            l === "F")
        )
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var Pf = null;
  function W0(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "/$" || a === "/&") {
          if (l === 0) return Al(t.nextSibling);
          l--;
        } else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function F0(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (l === 0) return t;
          l--;
        } else (a !== "/$" && a !== "/&") || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function $0(t, l, a) {
    switch (((l = Dn(a)), t)) {
      case "html":
        if (((t = l.documentElement), !t)) throw Error(s(452));
        return t;
      case "head":
        if (((t = l.head), !t)) throw Error(s(453));
        return t;
      case "body":
        if (((t = l.body), !t)) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function hu(t) {
    for (var l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
    In(t);
  }
  var zl = new Map(),
    k0 = new Set();
  function On(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var kl = D.d;
  D.d = { f: Ch, r: Hh, D: Bh, C: qh, L: jh, m: Yh, X: Xh, S: Gh, M: Lh };
  function Ch() {
    var t = kl.f(),
      l = bn();
    return t || l;
  }
  function Hh(t) {
    var l = Ka(t);
    l !== null && l.tag === 5 && l.type === "form" ? ho(l) : kl.r(t);
  }
  var Te = typeof document > "u" ? null : document;
  function P0(t, l, a) {
    var e = Te;
    if (e && typeof l == "string" && l) {
      var u = gl(l);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        k0.has(u) ||
          (k0.add(u),
          (t = { rel: t, crossOrigin: a, href: l }),
          e.querySelector(u) === null &&
            ((l = e.createElement("link")), Gt(l, "link", t), Ct(l), e.head.appendChild(l))));
    }
  }
  function Bh(t) {
    (kl.D(t), P0("dns-prefetch", t, null));
  }
  function qh(t, l) {
    (kl.C(t, l), P0("preconnect", t, l));
  }
  function jh(t, l, a) {
    kl.L(t, l, a);
    var e = Te;
    if (e && t && l) {
      var u = 'link[rel="preload"][as="' + gl(l) + '"]';
      l === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + gl(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" && (u += '[imagesizes="' + gl(a.imageSizes) + '"]'))
        : (u += '[href="' + gl(t) + '"]');
      var n = u;
      switch (l) {
        case "style":
          n = Ae(t);
          break;
        case "script":
          n = ze(t);
      }
      zl.has(n) ||
        ((t = q(
          { rel: "preload", href: l === "image" && a && a.imageSrcSet ? void 0 : t, as: l },
          a,
        )),
        zl.set(n, t),
        e.querySelector(u) !== null ||
          (l === "style" && e.querySelector(vu(n))) ||
          (l === "script" && e.querySelector(du(n))) ||
          ((l = e.createElement("link")), Gt(l, "link", t), Ct(l), e.head.appendChild(l)));
    }
  }
  function Yh(t, l) {
    kl.m(t, l);
    var a = Te;
    if (a && t) {
      var e = l && typeof l.as == "string" ? l.as : "script",
        u = 'link[rel="modulepreload"][as="' + gl(e) + '"][href="' + gl(t) + '"]',
        n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = ze(t);
      }
      if (
        !zl.has(n) &&
        ((t = q({ rel: "modulepreload", href: t }, l)), zl.set(n, t), a.querySelector(u) === null)
      ) {
        switch (e) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(du(n))) return;
        }
        ((e = a.createElement("link")), Gt(e, "link", t), Ct(e), a.head.appendChild(e));
      }
    }
  }
  function Gh(t, l, a) {
    kl.S(t, l, a);
    var e = Te;
    if (e && t) {
      var u = Ja(e).hoistableStyles,
        n = Ae(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var f = { loading: 0, preload: null };
        if ((i = e.querySelector(vu(n)))) f.loading = 5;
        else {
          ((t = q({ rel: "stylesheet", href: t, "data-precedence": l }, a)),
            (a = zl.get(n)) && If(t, a));
          var c = (i = e.createElement("link"));
          (Ct(c),
            Gt(c, "link", t),
            (c._p = new Promise(function (d, p) {
              ((c.onload = d), (c.onerror = p));
            })),
            c.addEventListener("load", function () {
              f.loading |= 1;
            }),
            c.addEventListener("error", function () {
              f.loading |= 2;
            }),
            (f.loading |= 4),
            Un(i, l, e));
        }
        ((i = { type: "stylesheet", instance: i, count: 1, state: f }), u.set(n, i));
      }
    }
  }
  function Xh(t, l) {
    kl.X(t, l);
    var a = Te;
    if (a && t) {
      var e = Ja(a).hoistableScripts,
        u = ze(t),
        n = e.get(u);
      n ||
        ((n = a.querySelector(du(u))),
        n ||
          ((t = q({ src: t, async: !0 }, l)),
          (l = zl.get(u)) && tc(t, l),
          (n = a.createElement("script")),
          Ct(n),
          Gt(n, "link", t),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function Lh(t, l) {
    kl.M(t, l);
    var a = Te;
    if (a && t) {
      var e = Ja(a).hoistableScripts,
        u = ze(t),
        n = e.get(u);
      n ||
        ((n = a.querySelector(du(u))),
        n ||
          ((t = q({ src: t, async: !0, type: "module" }, l)),
          (l = zl.get(u)) && tc(t, l),
          (n = a.createElement("script")),
          Ct(n),
          Gt(n, "link", t),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function I0(t, l, a, e) {
    var u = (u = W.current) ? On(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((l = Ae(a.href)),
            (a = Ja(u).hoistableStyles),
            (e = a.get(l)),
            e || ((e = { type: "style", instance: null, count: 0, state: null }), a.set(l, e)),
            e)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          t = Ae(a.href);
          var n = Ja(u).hoistableStyles,
            i = n.get(t);
          if (
            (i ||
              ((u = u.ownerDocument || u),
              (i = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(t, i),
              (n = u.querySelector(vu(t))) && !n._p && ((i.instance = n), (i.state.loading = 5)),
              zl.has(t) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                zl.set(t, a),
                n || Qh(u, t, a, i.state))),
            l && e === null)
          )
            throw Error(s(528, ""));
          return i;
        }
        if (l && e !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return (
          (l = a.async),
          (a = a.src),
          typeof a == "string" && l && typeof l != "function" && typeof l != "symbol"
            ? ((l = ze(a)),
              (a = Ja(u).hoistableScripts),
              (e = a.get(l)),
              e || ((e = { type: "script", instance: null, count: 0, state: null }), a.set(l, e)),
              e)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, t));
    }
  }
  function Ae(t) {
    return 'href="' + gl(t) + '"';
  }
  function vu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function tr(t) {
    return q({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function Qh(t, l, a, e) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]")
      ? (e.loading = 1)
      : ((l = t.createElement("link")),
        (e.preload = l),
        l.addEventListener("load", function () {
          return (e.loading |= 1);
        }),
        l.addEventListener("error", function () {
          return (e.loading |= 2);
        }),
        Gt(l, "link", a),
        Ct(l),
        t.head.appendChild(l));
  }
  function ze(t) {
    return '[src="' + gl(t) + '"]';
  }
  function du(t) {
    return "script[async]" + t;
  }
  function lr(t, l, a) {
    if ((l.count++, l.instance === null))
      switch (l.type) {
        case "style":
          var e = t.querySelector('style[data-href~="' + gl(a.href) + '"]');
          if (e) return ((l.instance = e), Ct(e), e);
          var u = q({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (e = (t.ownerDocument || t).createElement("style")),
            Ct(e),
            Gt(e, "style", u),
            Un(e, a.precedence, t),
            (l.instance = e)
          );
        case "stylesheet":
          u = Ae(a.href);
          var n = t.querySelector(vu(u));
          if (n) return ((l.state.loading |= 4), (l.instance = n), Ct(n), n);
          ((e = tr(a)),
            (u = zl.get(u)) && If(e, u),
            (n = (t.ownerDocument || t).createElement("link")),
            Ct(n));
          var i = n;
          return (
            (i._p = new Promise(function (f, c) {
              ((i.onload = f), (i.onerror = c));
            })),
            Gt(n, "link", e),
            (l.state.loading |= 4),
            Un(n, a.precedence, t),
            (l.instance = n)
          );
        case "script":
          return (
            (n = ze(a.src)),
            (u = t.querySelector(du(n)))
              ? ((l.instance = u), Ct(u), u)
              : ((e = a),
                (u = zl.get(n)) && ((e = q({}, a)), tc(e, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                Ct(u),
                Gt(u, "link", e),
                t.head.appendChild(u),
                (l.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(s(443, l.type));
      }
    else
      l.type === "stylesheet" &&
        (l.state.loading & 4) === 0 &&
        ((e = l.instance), (l.state.loading |= 4), Un(e, a.precedence, t));
    return l.instance;
  }
  function Un(t, l, a) {
    for (
      var e = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = e.length ? e[e.length - 1] : null,
        n = u,
        i = 0;
      i < e.length;
      i++
    ) {
      var f = e[i];
      if (f.dataset.precedence === l) n = f;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(t, n.nextSibling)
      : ((l = a.nodeType === 9 ? a.head : a), l.insertBefore(t, l.firstChild));
  }
  function If(t, l) {
    (t.crossOrigin == null && (t.crossOrigin = l.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy),
      t.title == null && (t.title = l.title));
  }
  function tc(t, l) {
    (t.crossOrigin == null && (t.crossOrigin = l.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy),
      t.integrity == null && (t.integrity = l.integrity));
  }
  var Rn = null;
  function ar(t, l, a) {
    if (Rn === null) {
      var e = new Map(),
        u = (Rn = new Map());
      u.set(a, e);
    } else ((u = Rn), (e = u.get(a)), e || ((e = new Map()), u.set(a, e)));
    if (e.has(t)) return e;
    for (e.set(t, null), a = a.getElementsByTagName(t), u = 0; u < a.length; u++) {
      var n = a[u];
      if (
        !(n[xe] || n[Bt] || (t === "link" && n.getAttribute("rel") === "stylesheet")) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var i = n.getAttribute(l) || "";
        i = t + i;
        var f = e.get(i);
        f ? f.push(n) : e.set(i, [n]);
      }
    }
    return e;
  }
  function er(t, l, a) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(a, l === "title" ? t.querySelector("head > title") : null));
  }
  function Zh(t, l, a) {
    if (a === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "") break;
        return !0;
      case "link":
        if (
          typeof l.rel != "string" ||
          typeof l.href != "string" ||
          l.href === "" ||
          l.onLoad ||
          l.onError
        )
          break;
        return l.rel === "stylesheet"
          ? ((t = l.disabled), typeof l.precedence == "string" && t == null)
          : !0;
      case "script":
        if (
          l.async &&
          typeof l.async != "function" &&
          typeof l.async != "symbol" &&
          !l.onLoad &&
          !l.onError &&
          l.src &&
          typeof l.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function ur(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Vh(t, l, a, e) {
    if (
      a.type === "stylesheet" &&
      (typeof e.media != "string" || matchMedia(e.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var u = Ae(e.href),
          n = l.querySelector(vu(u));
        if (n) {
          ((l = n._p),
            l !== null &&
              typeof l == "object" &&
              typeof l.then == "function" &&
              (t.count++, (t = xn.bind(t)), l.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = n),
            Ct(n));
          return;
        }
        ((n = l.ownerDocument || l),
          (e = tr(e)),
          (u = zl.get(u)) && If(e, u),
          (n = n.createElement("link")),
          Ct(n));
        var i = n;
        ((i._p = new Promise(function (f, c) {
          ((i.onload = f), (i.onerror = c));
        })),
          Gt(n, "link", e),
          (a.instance = n));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, l),
        (l = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = xn.bind(t)),
          l.addEventListener("load", a),
          l.addEventListener("error", a)));
    }
  }
  var lc = 0;
  function Kh(t, l) {
    return (
      t.stylesheets && t.count === 0 && Cn(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var e = setTimeout(function () {
              if ((t.stylesheets && Cn(t, t.stylesheets), t.unsuspend)) {
                var n = t.unsuspend;
                ((t.unsuspend = null), n());
              }
            }, 6e4 + l);
            0 < t.imgBytes && lc === 0 && (lc = 62500 * zh());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Cn(t, t.stylesheets), t.unsuspend))
                ) {
                  var n = t.unsuspend;
                  ((t.unsuspend = null), n());
                }
              },
              (t.imgBytes > lc ? 50 : 800) + l,
            );
            return (
              (t.unsuspend = a),
              function () {
                ((t.unsuspend = null), clearTimeout(e), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function xn() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Cn(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Nn = null;
  function Cn(t, l) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Nn = new Map()), l.forEach(Jh, t), (Nn = null), xn.call(t)));
  }
  function Jh(t, l) {
    if (!(l.state.loading & 4)) {
      var a = Nn.get(t);
      if (a) var e = a.get(null);
      else {
        ((a = new Map()), Nn.set(t, a));
        for (
          var u = t.querySelectorAll("link[data-precedence],style[data-precedence]"), n = 0;
          n < u.length;
          n++
        ) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") &&
            (a.set(i.dataset.precedence, i), (e = i));
        }
        e && a.set(null, e);
      }
      ((u = l.instance),
        (i = u.getAttribute("data-precedence")),
        (n = a.get(i) || e),
        n === e && a.set(null, u),
        a.set(i, u),
        this.count++,
        (e = xn.bind(this)),
        u.addEventListener("load", e),
        u.addEventListener("error", e),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (l.state.loading |= 4));
    }
  }
  var yu = {
    $$typeof: zt,
    Provider: null,
    Consumer: null,
    _currentValue: L,
    _currentValue2: L,
    _threadCount: 0,
  };
  function wh(t, l, a, e, u, n, i, f, c) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Fn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Fn(0)),
      (this.hiddenUpdates = Fn(null)),
      (this.identifierPrefix = e),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = i),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = c),
      (this.incompleteTransitions = new Map()));
  }
  function nr(t, l, a, e, u, n, i, f, c, d, p, T) {
    return (
      (t = new wh(t, l, a, i, c, d, p, T, f)),
      (l = 1),
      n === !0 && (l |= 24),
      (n = cl(3, null, null, l)),
      (t.current = n),
      (n.stateNode = t),
      (l = Ci()),
      l.refCount++,
      (t.pooledCache = l),
      l.refCount++,
      (n.memoizedState = { element: e, isDehydrated: a, cache: l }),
      ji(n),
      t
    );
  }
  function ir(t) {
    return t ? ((t = ae), t) : ae;
  }
  function fr(t, l, a, e, u, n) {
    ((u = ir(u)),
      e.context === null ? (e.context = u) : (e.pendingContext = u),
      (e = ia(l)),
      (e.payload = { element: a }),
      (n = n === void 0 ? null : n),
      n !== null && (e.callback = n),
      (a = fa(t, e, l)),
      a !== null && (al(a, t, l), We(a, t, l)));
  }
  function cr(t, l) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < l ? a : l;
    }
  }
  function ac(t, l) {
    (cr(t, l), (t = t.alternate) && cr(t, l));
  }
  function sr(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ua(t, 67108864);
      (l !== null && al(l, t, 67108864), ac(t, 67108864));
    }
  }
  function or(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = hl();
      l = $n(l);
      var a = Ua(t, l);
      (a !== null && al(a, t, l), ac(t, l));
    }
  }
  var Hn = !0;
  function Wh(t, l, a, e) {
    var u = S.T;
    S.T = null;
    var n = D.p;
    try {
      ((D.p = 2), ec(t, l, a, e));
    } finally {
      ((D.p = n), (S.T = u));
    }
  }
  function Fh(t, l, a, e) {
    var u = S.T;
    S.T = null;
    var n = D.p;
    try {
      ((D.p = 8), ec(t, l, a, e));
    } finally {
      ((D.p = n), (S.T = u));
    }
  }
  function ec(t, l, a, e) {
    if (Hn) {
      var u = uc(e);
      if (u === null) (Zf(t, l, e, Bn, a), mr(t, e));
      else if (kh(u, t, l, a, e)) e.stopPropagation();
      else if ((mr(t, e), l & 4 && -1 < $h.indexOf(t))) {
        for (; u !== null; ) {
          var n = Ka(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var i = Aa(n.pendingLanes);
                  if (i !== 0) {
                    var f = n;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var c = 1 << (31 - il(i));
                      ((f.entanglements[1] |= c), (i &= ~c));
                    }
                    (Cl(n), (at & 6) === 0 && ((gn = ul() + 500), ou(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((f = Ua(n, 2)), f !== null && al(f, n, 2), bn(), ac(n, 2));
            }
          if (((n = uc(e)), n === null && Zf(t, l, e, Bn, a), n === u)) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else Zf(t, l, e, null, a);
    }
  }
  function uc(t) {
    return ((t = ni(t)), nc(t));
  }
  var Bn = null;
  function nc(t) {
    if (((Bn = null), (t = Va(t)), t !== null)) {
      var l = z(t);
      if (l === null) t = null;
      else {
        var a = l.tag;
        if (a === 13) {
          if (((t = N(l)), t !== null)) return t;
          t = null;
        } else if (a === 31) {
          if (((t = X(l)), t !== null)) return t;
          t = null;
        } else if (a === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return ((Bn = t), null);
  }
  function rr(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Br()) {
          case Sc:
            return 2;
          case bc:
            return 8;
          case Tu:
          case qr:
            return 32;
          case pc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ic = !1,
    Sa = null,
    ba = null,
    pa = null,
    gu = new Map(),
    Su = new Map(),
    _a = [],
    $h =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function mr(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Sa = null;
        break;
      case "dragenter":
      case "dragleave":
        ba = null;
        break;
      case "mouseover":
      case "mouseout":
        pa = null;
        break;
      case "pointerover":
      case "pointerout":
        gu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Su.delete(l.pointerId);
    }
  }
  function bu(t, l, a, e, u, n) {
    return t === null || t.nativeEvent !== n
      ? ((t = {
          blockedOn: l,
          domEventName: a,
          eventSystemFlags: e,
          nativeEvent: n,
          targetContainers: [u],
        }),
        l !== null && ((l = Ka(l)), l !== null && sr(l)),
        t)
      : ((t.eventSystemFlags |= e),
        (l = t.targetContainers),
        u !== null && l.indexOf(u) === -1 && l.push(u),
        t);
  }
  function kh(t, l, a, e, u) {
    switch (l) {
      case "focusin":
        return ((Sa = bu(Sa, t, l, a, e, u)), !0);
      case "dragenter":
        return ((ba = bu(ba, t, l, a, e, u)), !0);
      case "mouseover":
        return ((pa = bu(pa, t, l, a, e, u)), !0);
      case "pointerover":
        var n = u.pointerId;
        return (gu.set(n, bu(gu.get(n) || null, t, l, a, e, u)), !0);
      case "gotpointercapture":
        return ((n = u.pointerId), Su.set(n, bu(Su.get(n) || null, t, l, a, e, u)), !0);
    }
    return !1;
  }
  function hr(t) {
    var l = Va(t.target);
    if (l !== null) {
      var a = z(l);
      if (a !== null) {
        if (((l = a.tag), l === 13)) {
          if (((l = N(a)), l !== null)) {
            ((t.blockedOn = l),
              Mc(t.priority, function () {
                or(a);
              }));
            return;
          }
        } else if (l === 31) {
          if (((l = X(a)), l !== null)) {
            ((t.blockedOn = l),
              Mc(t.priority, function () {
                or(a);
              }));
            return;
          }
        } else if (l === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function qn(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var a = uc(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var e = new a.constructor(a.type, a);
        ((ui = e), a.target.dispatchEvent(e), (ui = null));
      } else return ((l = Ka(a)), l !== null && sr(l), (t.blockedOn = a), !1);
      l.shift();
    }
    return !0;
  }
  function vr(t, l, a) {
    qn(t) && a.delete(l);
  }
  function Ph() {
    ((ic = !1),
      Sa !== null && qn(Sa) && (Sa = null),
      ba !== null && qn(ba) && (ba = null),
      pa !== null && qn(pa) && (pa = null),
      gu.forEach(vr),
      Su.forEach(vr));
  }
  function jn(t, l) {
    t.blockedOn === l &&
      ((t.blockedOn = null),
      ic || ((ic = !0), M.unstable_scheduleCallback(M.unstable_NormalPriority, Ph)));
  }
  var Yn = null;
  function dr(t) {
    Yn !== t &&
      ((Yn = t),
      M.unstable_scheduleCallback(M.unstable_NormalPriority, function () {
        Yn === t && (Yn = null);
        for (var l = 0; l < t.length; l += 3) {
          var a = t[l],
            e = t[l + 1],
            u = t[l + 2];
          if (typeof e != "function") {
            if (nc(e || a) === null) continue;
            break;
          }
          var n = Ka(a);
          n !== null &&
            (t.splice(l, 3),
            (l -= 3),
            ef(n, { pending: !0, data: u, method: a.method, action: e }, e, u));
        }
      }));
  }
  function Me(t) {
    function l(c) {
      return jn(c, t);
    }
    (Sa !== null && jn(Sa, t),
      ba !== null && jn(ba, t),
      pa !== null && jn(pa, t),
      gu.forEach(l),
      Su.forEach(l));
    for (var a = 0; a < _a.length; a++) {
      var e = _a[a];
      e.blockedOn === t && (e.blockedOn = null);
    }
    for (; 0 < _a.length && ((a = _a[0]), a.blockedOn === null); )
      (hr(a), a.blockedOn === null && _a.shift());
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (e = 0; e < a.length; e += 3) {
        var u = a[e],
          n = a[e + 1],
          i = u[$t] || null;
        if (typeof n == "function") i || dr(a);
        else if (i) {
          var f = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (i = n[$t] || null))) f = i.formAction;
            else if (nc(u) !== null) continue;
          } else f = i.action;
          (typeof f == "function" ? (a[e + 1] = f) : (a.splice(e, 3), (e -= 3)), dr(a));
        }
      }
  }
  function yr() {
    function t(n) {
      n.canIntercept &&
        n.info === "react-transition" &&
        n.intercept({
          handler: function () {
            return new Promise(function (i) {
              return (u = i);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function l() {
      (u !== null && (u(), (u = null)), e || setTimeout(a, 20));
    }
    function a() {
      if (!e && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var e = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", l),
        navigation.addEventListener("navigateerror", l),
        setTimeout(a, 100),
        function () {
          ((e = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", l),
            navigation.removeEventListener("navigateerror", l),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function fc(t) {
    this._internalRoot = t;
  }
  ((Gn.prototype.render = fc.prototype.render =
    function (t) {
      var l = this._internalRoot;
      if (l === null) throw Error(s(409));
      var a = l.current,
        e = hl();
      fr(a, e, t, l, null, null);
    }),
    (Gn.prototype.unmount = fc.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var l = t.containerInfo;
          (fr(t.current, 2, null, t, null, null), bn(), (l[Za] = null));
        }
      }));
  function Gn(t) {
    this._internalRoot = t;
  }
  Gn.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var l = zc();
      t = { blockedOn: null, target: t, priority: l };
      for (var a = 0; a < _a.length && l !== 0 && l < _a[a].priority; a++);
      (_a.splice(a, 0, t), a === 0 && hr(t));
    }
  };
  var gr = h.version;
  if (gr !== "19.2.7") throw Error(s(527, gr, "19.2.7"));
  D.findDOMNode = function (t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function"
        ? Error(s(188))
        : ((t = Object.keys(t).join(",")), Error(s(268, t)));
    return ((t = E(l)), (t = t !== null ? J(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Ih = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: S,
    reconcilerVersion: "19.2.7",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xn.isDisabled && Xn.supportsFiber)
      try {
        ((Oe = Xn.inject(Ih)), (nl = Xn));
      } catch {}
  }
  return (
    (_u.createRoot = function (t, l) {
      if (!O(t)) throw Error(s(299));
      var a = !1,
        e = "",
        u = Ao,
        n = zo,
        i = Mo;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (e = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
          l.onCaughtError !== void 0 && (n = l.onCaughtError),
          l.onRecoverableError !== void 0 && (i = l.onRecoverableError)),
        (l = nr(t, 1, !1, null, null, a, e, null, u, n, i, yr)),
        (t[Za] = l.current),
        Qf(t),
        new fc(l)
      );
    }),
    (_u.hydrateRoot = function (t, l, a) {
      if (!O(t)) throw Error(s(299));
      var e = !1,
        u = "",
        n = Ao,
        i = zo,
        f = Mo,
        c = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (e = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (n = a.onUncaughtError),
          a.onCaughtError !== void 0 && (i = a.onCaughtError),
          a.onRecoverableError !== void 0 && (f = a.onRecoverableError),
          a.formState !== void 0 && (c = a.formState)),
        (l = nr(t, 1, !0, l, a ?? null, e, u, c, n, i, f, yr)),
        (l.context = ir(null)),
        (a = l.current),
        (e = hl()),
        (e = $n(e)),
        (u = ia(e)),
        (u.callback = null),
        fa(a, u, e),
        (a = e),
        (l.current.lanes = a),
        Re(l, a),
        Cl(l),
        (t[Za] = l.current),
        Qf(t),
        new Gn(l)
      );
    }),
    (_u.version = "19.2.7"),
    _u
  );
}
var Dr;
function sv() {
  if (Dr) return oc.exports;
  Dr = 1;
  function M() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(M);
      } catch (h) {
        console.error(h);
      }
  }
  return (M(), (oc.exports = cv()), oc.exports);
}
var ov = sv();
const rv = (M) => M.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  mv = (M) =>
    M.replace(/^([A-Z])|[\s-_]+(\w)/g, (h, b, s) => (s ? s.toUpperCase() : b.toLowerCase())),
  Or = (M) => {
    const h = mv(M);
    return h.charAt(0).toUpperCase() + h.slice(1);
  },
  Rr = (...M) =>
    M.filter((h, b, s) => !!h && h.trim() !== "" && s.indexOf(h) === b)
      .join(" ")
      .trim(),
  hv = (M) => {
    for (const h in M) if (h.startsWith("aria-") || h === "role" || h === "title") return !0;
  };
var vv = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const dv = gt.forwardRef(
  (
    {
      color: M = "currentColor",
      size: h = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: s,
      className: O = "",
      children: z,
      iconNode: N,
      ...X
    },
    U,
  ) =>
    gt.createElement(
      "svg",
      {
        ref: U,
        ...vv,
        width: h,
        height: h,
        stroke: M,
        strokeWidth: s ? (Number(b) * 24) / Number(h) : b,
        className: Rr("lucide", O),
        ...(!z && !hv(X) && { "aria-hidden": "true" }),
        ...X,
      },
      [...N.map(([E, J]) => gt.createElement(E, J)), ...(Array.isArray(z) ? z : [z])],
    ),
);
const Qn = (M, h) => {
  const b = gt.forwardRef(({ className: s, ...O }, z) =>
    gt.createElement(dv, {
      ref: z,
      iconNode: h,
      className: Rr(`lucide-${rv(Or(M))}`, `lucide-${M}`, s),
      ...O,
    }),
  );
  return ((b.displayName = Or(M)), b);
};
const yv = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }],
  ],
  gv = Qn("download", yv);
const Sv = [
    ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
    ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }],
  ],
  bv = Qn("pause", Sv);
const pv = [
    [
      "path",
      {
        d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
        key: "10ikf1",
      },
    ],
  ],
  _v = Qn("play", pv);
const Ev = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ],
  xr = Qn("rotate-ccw", Ev),
  Tv = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
  vc = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,
  Av = `
precision highp float;

uniform sampler2D u_state;
uniform vec2 u_texel;
uniform float u_time;
uniform float u_retention;
uniform float u_resistance;
uniform float u_paperPressure;
uniform float u_wetVortex;

varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 2; i++) {
    v += a * noise(p);
    p = m * p + 17.0;
    a *= 0.5;
  }
  return v;
}

vec2 curl(vec2 p) {
  float e = 0.025;
  float n1 = fbm(p + vec2(0.0, e));
  float n2 = fbm(p - vec2(0.0, e));
  float n3 = fbm(p + vec2(e, 0.0));
  float n4 = fbm(p - vec2(e, 0.0));
  return normalize(vec2(n1 - n2, n4 - n3) + 0.0001);
}

void main() {
  vec4 center = texture2D(u_state, v_uv);
  vec4 north = texture2D(u_state, v_uv + vec2(0.0, u_texel.y));
  vec4 south = texture2D(u_state, v_uv - vec2(0.0, u_texel.y));
  vec4 east = texture2D(u_state, v_uv + vec2(u_texel.x, 0.0));
  vec4 west = texture2D(u_state, v_uv - vec2(u_texel.x, 0.0));

  float paper = fbm(v_uv * vec2(31.0, 21.0));
  float vortex = clamp(u_wetVortex / 30.0, 0.0, 1.0);
  vec2 swirl = curl(v_uv * (2.15 + vortex * 5.2) + vec2(u_time * 0.028, -u_time * 0.021));
  float mobility = mix(0.00038, 0.0038, vortex) * mix(1.28, 0.38, u_resistance);
  mobility *= mix(0.72, 1.48, u_paperPressure) * (0.24 + center.a * 1.55);
  vec2 advectUv = clamp(v_uv - swirl * mobility, vec2(0.001), vec2(0.999));

  vec4 advected = texture2D(u_state, advectUv);
  vec4 blurred = (north + south + east + west + center * 1.5) / 5.5;
  float diffusion = mix(0.028, 0.35, u_paperPressure) * mix(0.7, 1.22, vortex) * mix(1.0, 0.44, u_resistance);
  vec4 pigment = mix(advected, blurred, diffusion);

  float granulation = mix(1.0, 0.9 + paper * 0.15, u_paperPressure);
  float fade = mix(0.973, 0.9986, u_retention);
  pigment.rgb *= fade * granulation;
  pigment.a *= fade * mix(0.992, 0.97 + paper * 0.045, u_paperPressure * 0.62);

  pigment.rgb = clamp(pigment.rgb, 0.0, 1.0);
  pigment.a = clamp(pigment.a, 0.0, 0.96);
  gl_FragColor = pigment;
}
`,
  zv = `
precision highp float;

uniform vec2 u_point;
uniform float u_radius;
uniform float u_aspect;
uniform float u_strength;
uniform float u_paperPressure;
uniform float u_colorDrift;
uniform float u_time;
uniform vec3 u_color;

varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(269.5, 183.3))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec2 p = v_uv - u_point;
  float d = length(p * vec2(u_aspect, 1.0)) / max(u_radius, 0.0001);
  float soft = smoothstep(1.0, 0.02, d);
  float bloom = smoothstep(1.15, 0.52, d) * 0.22 * u_paperPressure;
  float ring = smoothstep(0.96, 0.72, d) * smoothstep(0.38, 0.72, d);
  float grain = noise(v_uv * 190.0 + u_time * 2.0);
  float pigment = clamp(pow(soft, 0.68) + bloom + ring * 0.34, 0.0, 1.0);
  pigment *= mix(0.78, 1.18, grain);
  pigment *= u_strength;

  vec3 drift = vec3(
    noise(v_uv * 18.0 + u_time * 0.15),
    noise(v_uv * 21.0 - u_time * 0.11 + 17.0),
    noise(v_uv * 16.0 + 31.0)
  );
  vec3 driftedColor = clamp(mix(u_color, u_color * (0.82 + drift * 0.46), u_colorDrift * 0.58), 0.0, 1.0);
  vec3 tint = mix(driftedColor, driftedColor * (0.74 + ring * 0.18), ring * 0.65);
  gl_FragColor = vec4(tint, pigment);
}
`,
  Mv = `
precision highp float;

uniform sampler2D u_state;
uniform vec2 u_texel;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_paperPressure;
uniform float u_softStrength;
uniform float u_haloWeight;
uniform float u_pigmentShading;
uniform float u_softBloom;
uniform float u_lightBeams;

varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.7, 289.1))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.45, 0.82, -0.82, 1.45);
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = m * p + 11.2;
    a *= 0.52;
  }
  return v;
}

void main() {
  vec4 paint = texture2D(u_state, v_uv);
  float a = clamp(paint.a, 0.0, 1.0);
  float n = fbm(v_uv * vec2(54.0, 38.0));
  float fiberA = noise(vec2(v_uv.x * 480.0, v_uv.y * 80.0));
  float fiberB = noise(vec2(v_uv.x * 65.0, v_uv.y * 520.0));
  float paper = (n * 0.72 + fiberA * 0.16 + fiberB * 0.12);

  vec3 paperColor = vec3(0.964, 0.944, 0.894);
  paperColor += (paper - 0.5) * vec3(0.07, 0.06, 0.045) * u_paperPressure;

  float l = texture2D(u_state, v_uv - vec2(u_texel.x, 0.0)).a;
  float r = texture2D(u_state, v_uv + vec2(u_texel.x, 0.0)).a;
  float b = texture2D(u_state, v_uv - vec2(0.0, u_texel.y)).a;
  float t = texture2D(u_state, v_uv + vec2(0.0, u_texel.y)).a;
  float boundary = clamp((abs(a - l) + abs(a - r) + abs(a - b) + abs(a - t)) * 4.2, 0.0, 1.0);
  boundary += smoothstep(0.08, 0.22, a) * (1.0 - smoothstep(0.55, 0.94, a)) * 0.18;
  boundary = clamp(boundary, 0.0, 1.0);

  vec3 pigment = paint.rgb / max(a, 0.035);
  vec3 neutral = vec3(dot(pigment, vec3(0.30, 0.59, 0.11)));
  pigment = clamp(mix(neutral, pigment, 1.28) * 1.06, 0.0, 1.0);
  pigment = mix(pigment, pigment * (0.77 + paper * 0.28), u_pigmentShading * 0.72);
  vec3 color = mix(paperColor, pigment, clamp(a * 1.08, 0.0, 0.96));
  color = mix(color, pigment * 0.55, boundary * u_haloWeight * 0.72);

  float glow = smoothstep(0.08, 0.58, a) * (1.0 - boundary * 0.55);
  color += vec3(0.045, 0.07, 0.08) * glow * u_softStrength * u_softBloom;
  color += vec3(0.03, 0.025, 0.018) * (paper - 0.5) * u_paperPressure * (1.0 - a);

  float beam = smoothstep(0.98, 0.62, abs((v_uv.x * 0.72 + v_uv.y * 1.08) - 0.86));
  beam *= smoothstep(0.05, 0.85, v_uv.x) * (1.0 - smoothstep(0.72, 1.0, v_uv.y));
  color += vec3(0.10, 0.16, 0.13) * beam * u_lightBeams;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`,
  Dv = {
    renderer: "WebGL",
    quality: "low",
    simWidth: 0,
    simHeight: 0,
    fps: 0,
    detail: "initializing",
  };
class Ov {
  canvas;
  gl;
  isWebGL2;
  quadBuffer;
  stepProgram;
  splatProgram;
  displayProgram;
  onStatus;
  textures = [];
  framebuffers = [];
  readIndex = 0;
  simWidth = 0;
  simHeight = 0;
  params;
  quality = "low";
  frameCount = 0;
  frameWindowStart = performance.now();
  fps = 0;
  constructor(h, b, s) {
    ((this.canvas = h), (this.params = b), (this.onStatus = s));
    const O = {
        alpha: !1,
        antialias: !1,
        depth: !1,
        stencil: !1,
        preserveDrawingBuffer: !0,
        powerPreference: "high-performance",
      },
      z =
        h.getContext("webgl2", O) ??
        h.getContext("webgl", O) ??
        h.getContext("experimental-webgl", O);
    if (!z) throw new Error("WebGL is not available on this device.");
    ((this.gl = z),
      (this.isWebGL2 = typeof WebGL2RenderingContext < "u" && z instanceof WebGL2RenderingContext));
    const N = !!(
      z.getExtension("EXT_color_buffer_float") ??
      z.getExtension("WEBGL_color_buffer_float") ??
      z.getExtension("OES_texture_float")
    );
    ((this.quality = this.isWebGL2 && N ? "high" : this.isWebGL2 ? "medium" : "low"),
      (this.quadBuffer = this.must(z.createBuffer(), "Unable to create quad buffer.")),
      (this.stepProgram = this.createProgram(vc, Av)),
      (this.splatProgram = this.createProgram(vc, zv)),
      (this.displayProgram = this.createProgram(vc, Mv)),
      z.bindBuffer(z.ARRAY_BUFFER, this.quadBuffer),
      z.bufferData(z.ARRAY_BUFFER, Tv, z.STATIC_DRAW),
      z.disable(z.DEPTH_TEST),
      z.disable(z.CULL_FACE),
      z.clearColor(0, 0, 0, 0),
      this.resize(!0),
      this.clear());
  }
  setParams(h) {
    this.params = h;
  }
  getStatus() {
    return {
      ...Dv,
      renderer: this.isWebGL2 ? "WebGL2" : "WebGL",
      quality: this.quality,
      simWidth: this.simWidth,
      simHeight: this.simHeight,
      fps: this.fps,
      detail:
        this.quality === "high"
          ? "float-capable high quality"
          : "lower quality mode without high precision float rendering",
    };
  }
  resize(h = !1) {
    const b = this.canvas.getBoundingClientRect(),
      s = Math.max(2, b.width),
      O = Math.max(2, b.height),
      z = Math.min(window.devicePixelRatio || 1, 2),
      N = Math.max(2, Math.floor(s * z)),
      X = Math.max(2, Math.floor(O * z));
    if (!h && this.canvas.width === N && this.canvas.height === X) return !1;
    ((this.canvas.width = N), (this.canvas.height = X));
    const U = Math.min(s, O) < 720,
      E = this.quality === "high" ? (U ? 0.42 : 0.52) : U ? 0.34 : 0.42,
      J = this.quality === "high" ? 1080 : 860,
      q = Math.min(1, J / Math.max(N, X));
    return (
      (this.simWidth = Math.max(32, Math.floor(N * E * q))),
      (this.simHeight = Math.max(32, Math.floor(X * E * q))),
      this.rebuildTargets(),
      this.clear(),
      this.pushStatus(),
      !0
    );
  }
  clear() {
    const h = this.gl;
    (h.disable(h.BLEND), h.viewport(0, 0, this.simWidth, this.simHeight));
    for (const b of this.framebuffers)
      (h.bindFramebuffer(h.FRAMEBUFFER, b), h.clear(h.COLOR_BUFFER_BIT));
    (h.bindFramebuffer(h.FRAMEBUFFER, null),
      (this.readIndex = 0),
      this.render(performance.now() / 1e3));
  }
  inject(h, b, s, O = 0.8) {
    const z = this.canvas.getBoundingClientRect();
    if (z.width <= 0 || z.height <= 0) return;
    const N = (h - z.left) / z.width,
      X = 1 - (b - z.top) / z.height;
    if (N < -0.08 || N > 1.08 || X < -0.08 || X > 1.08) return;
    const U = this.gl,
      J = (14 + this.params.brushSize * 126) / Math.min(z.width, z.height),
      q = Math.min(0.9, Math.max(0.08, O) * (0.34 + this.params.paperPressure * 0.5));
    (U.bindFramebuffer(U.FRAMEBUFFER, this.framebuffers[this.readIndex]),
      U.viewport(0, 0, this.simWidth, this.simHeight),
      U.useProgram(this.splatProgram),
      this.bindQuad(this.splatProgram),
      U.enable(U.BLEND),
      U.blendFuncSeparate(U.SRC_ALPHA, U.ONE_MINUS_SRC_ALPHA, U.ONE, U.ONE_MINUS_SRC_ALPHA),
      this.uniform2f(this.splatProgram, "u_point", N, X),
      this.uniform1f(this.splatProgram, "u_radius", J * (0.76 + this.params.paperPressure * 0.36)),
      this.uniform1f(this.splatProgram, "u_aspect", this.simWidth / this.simHeight),
      this.uniform1f(this.splatProgram, "u_strength", q),
      this.uniform1f(this.splatProgram, "u_paperPressure", this.params.paperPressure),
      this.uniform1f(this.splatProgram, "u_colorDrift", this.params.colorDrift ? 1 : 0),
      this.uniform1f(this.splatProgram, "u_time", performance.now() / 1e3),
      this.uniform3f(this.splatProgram, "u_color", s[0], s[1], s[2]),
      U.drawArrays(U.TRIANGLE_STRIP, 0, 4),
      U.disable(U.BLEND),
      U.bindFramebuffer(U.FRAMEBUFFER, null),
      this.render(performance.now() / 1e3));
  }
  update(h, b) {
    (this.resize(), b || this.step(h), this.render(h), this.trackFps());
  }
  render(h) {
    const b = this.gl;
    (b.bindFramebuffer(b.FRAMEBUFFER, null),
      b.viewport(0, 0, this.canvas.width, this.canvas.height),
      b.useProgram(this.displayProgram),
      this.bindQuad(this.displayProgram),
      b.activeTexture(b.TEXTURE0),
      b.bindTexture(b.TEXTURE_2D, this.textures[this.readIndex]),
      this.uniform1i(this.displayProgram, "u_state", 0),
      this.uniform2f(this.displayProgram, "u_texel", 1 / this.simWidth, 1 / this.simHeight),
      this.uniform2f(this.displayProgram, "u_resolution", this.canvas.width, this.canvas.height),
      this.uniform1f(this.displayProgram, "u_time", h),
      this.uniform1f(this.displayProgram, "u_paperPressure", this.params.paperPressure),
      this.uniform1f(this.displayProgram, "u_softStrength", this.params.softStrength),
      this.uniform1f(this.displayProgram, "u_haloWeight", this.params.haloWeight),
      this.uniform1f(this.displayProgram, "u_pigmentShading", this.params.pigmentShading ? 1 : 0),
      this.uniform1f(this.displayProgram, "u_softBloom", this.params.softBloom ? 1 : 0),
      this.uniform1f(this.displayProgram, "u_lightBeams", this.params.lightBeams ? 1 : 0),
      b.drawArrays(b.TRIANGLE_STRIP, 0, 4));
  }
  destroy() {
    const h = this.gl;
    for (const b of this.textures) h.deleteTexture(b);
    for (const b of this.framebuffers) h.deleteFramebuffer(b);
    (h.deleteBuffer(this.quadBuffer),
      h.deleteProgram(this.stepProgram),
      h.deleteProgram(this.splatProgram),
      h.deleteProgram(this.displayProgram));
  }
  step(h) {
    const b = this.gl,
      s = 1 - this.readIndex;
    (b.disable(b.BLEND),
      b.bindFramebuffer(b.FRAMEBUFFER, this.framebuffers[s]),
      b.viewport(0, 0, this.simWidth, this.simHeight),
      b.useProgram(this.stepProgram),
      this.bindQuad(this.stepProgram),
      b.activeTexture(b.TEXTURE0),
      b.bindTexture(b.TEXTURE_2D, this.textures[this.readIndex]),
      this.uniform1i(this.stepProgram, "u_state", 0),
      this.uniform2f(this.stepProgram, "u_texel", 1 / this.simWidth, 1 / this.simHeight),
      this.uniform1f(this.stepProgram, "u_time", h),
      this.uniform1f(this.stepProgram, "u_retention", this.params.retention),
      this.uniform1f(this.stepProgram, "u_resistance", this.params.resistance),
      this.uniform1f(this.stepProgram, "u_paperPressure", this.params.paperPressure),
      this.uniform1f(this.stepProgram, "u_wetVortex", this.params.wetVortex),
      b.drawArrays(b.TRIANGLE_STRIP, 0, 4),
      b.bindFramebuffer(b.FRAMEBUFFER, null),
      (this.readIndex = s));
  }
  rebuildTargets() {
    const h = this.gl;
    for (const b of this.textures) h.deleteTexture(b);
    for (const b of this.framebuffers) h.deleteFramebuffer(b);
    ((this.textures = []), (this.framebuffers = []));
    for (let b = 0; b < 2; b++) {
      const s = this.must(h.createTexture(), "Unable to create watercolor texture.");
      (h.bindTexture(h.TEXTURE_2D, s),
        h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, h.LINEAR),
        h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, h.LINEAR),
        h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, h.CLAMP_TO_EDGE),
        h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T, h.CLAMP_TO_EDGE),
        h.texImage2D(
          h.TEXTURE_2D,
          0,
          h.RGBA,
          this.simWidth,
          this.simHeight,
          0,
          h.RGBA,
          h.UNSIGNED_BYTE,
          null,
        ));
      const O = this.must(h.createFramebuffer(), "Unable to create watercolor target.");
      if (
        (h.bindFramebuffer(h.FRAMEBUFFER, O),
        h.framebufferTexture2D(h.FRAMEBUFFER, h.COLOR_ATTACHMENT0, h.TEXTURE_2D, s, 0),
        h.checkFramebufferStatus(h.FRAMEBUFFER) !== h.FRAMEBUFFER_COMPLETE)
      )
        throw new Error("WebGL framebuffer is incomplete; watercolor simulation cannot start.");
      (this.textures.push(s), this.framebuffers.push(O));
    }
    (h.bindTexture(h.TEXTURE_2D, null),
      h.bindFramebuffer(h.FRAMEBUFFER, null),
      (this.readIndex = 0));
  }
  createProgram(h, b) {
    const s = this.gl,
      O = this.compileShader(s.VERTEX_SHADER, h),
      z = this.compileShader(s.FRAGMENT_SHADER, b),
      N = this.must(s.createProgram(), "Unable to create shader program.");
    if (
      (s.attachShader(N, O),
      s.attachShader(N, z),
      s.linkProgram(N),
      s.deleteShader(O),
      s.deleteShader(z),
      !s.getProgramParameter(N, s.LINK_STATUS))
    ) {
      const X = s.getProgramInfoLog(N) ?? "Unknown shader link error.";
      throw (s.deleteProgram(N), new Error(X));
    }
    return N;
  }
  compileShader(h, b) {
    const s = this.gl,
      O = this.must(s.createShader(h), "Unable to create shader.");
    if ((s.shaderSource(O, b), s.compileShader(O), !s.getShaderParameter(O, s.COMPILE_STATUS))) {
      const z = s.getShaderInfoLog(O) ?? "Unknown shader compile error.";
      throw (s.deleteShader(O), new Error(z));
    }
    return O;
  }
  bindQuad(h) {
    const b = this.gl,
      s = b.getAttribLocation(h, "a_position");
    (b.bindBuffer(b.ARRAY_BUFFER, this.quadBuffer),
      b.enableVertexAttribArray(s),
      b.vertexAttribPointer(s, 2, b.FLOAT, !1, 0, 0));
  }
  uniform1i(h, b, s) {
    const O = this.gl.getUniformLocation(h, b);
    O && this.gl.uniform1i(O, s);
  }
  uniform1f(h, b, s) {
    const O = this.gl.getUniformLocation(h, b);
    O && this.gl.uniform1f(O, s);
  }
  uniform2f(h, b, s, O) {
    const z = this.gl.getUniformLocation(h, b);
    z && this.gl.uniform2f(z, s, O);
  }
  uniform3f(h, b, s, O, z) {
    const N = this.gl.getUniformLocation(h, b);
    N && this.gl.uniform3f(N, s, O, z);
  }
  trackFps() {
    this.frameCount += 1;
    const h = performance.now();
    h - this.frameWindowStart >= 700 &&
      ((this.fps = Math.round((this.frameCount * 1e3) / (h - this.frameWindowStart))),
      (this.frameCount = 0),
      (this.frameWindowStart = h),
      this.pushStatus());
  }
  pushStatus() {
    this.onStatus(this.getStatus());
  }
  must(h, b) {
    if (!h) throw new Error(b);
    return h;
  }
}
const Ur = {
    brushSize: 0.34,
    retention: 0.995,
    resistance: 0.42,
    paperPressure: 0.72,
    wetVortex: 14,
    softStrength: 0.12,
    haloWeight: 0.88,
    colorDrift: !0,
    pigmentShading: !0,
    softBloom: !1,
    lightBeams: !1,
  },
  Uv = "#2f6f9f",
  Rv = { active: !1, title: "", message: "" };
function xv() {
  const M = gt.useRef(null),
    h = gt.useRef(null),
    b = gt.useRef(null),
    s = gt.useRef(!1),
    O = gt.useRef(Ur),
    z = gt.useRef(null),
    N = gt.useRef(!1),
    [X, U] = gt.useState(Ur),
    [E, J] = gt.useState(!1),
    [q, mt] = gt.useState(Uv),
    [xt, Xt] = gt.useState(null),
    [Nt, vl] = gt.useState(Rv),
    [Kt, Jt] = gt.useState("就绪"),
    zt = gt.useMemo(() => Hv(q), [q]),
    Ft = xt ? `${xt.renderer} / ${xt.quality} / ${xt.fps || 0}fps` : "初始化";
  (gt.useEffect(() => {
    ((O.current = X), h.current?.setParams(X));
  }, [X]),
    gt.useEffect(() => {
      s.current = E;
    }, [E]),
    gt.useEffect(() => {
      const C = M.current;
      if (!C) return;
      const St = (it) => {
        (it.preventDefault(),
          vl({
            active: !0,
            title: "WebGL context 已丢失",
            message: "当前设备或浏览器回收了图形上下文，请重载页面恢复画布。",
          }));
      };
      C.addEventListener("webglcontextlost", St, !1);
      try {
        const it = new Ov(C, O.current, Xt);
        ((h.current = it), Cv(it, C));
        const S = (D) => {
          (h.current?.update(D / 1e3, s.current), (b.current = requestAnimationFrame(S)));
        };
        b.current = requestAnimationFrame(S);
      } catch (it) {
        vl({
          active: !0,
          title: "WebGL 不可用",
          message:
            it instanceof Error ? it.message : "当前浏览器没有可用的 WebGL 能力，已进入静态预览。",
        });
      }
      return () => {
        (b.current !== null && cancelAnimationFrame(b.current),
          h.current?.destroy(),
          (h.current = null),
          C.removeEventListener("webglcontextlost", St));
      };
    }, []));
  const bt = (C, St) => {
      U((it) => ({ ...it, [C]: St }));
    },
    Lt = () => {
      const C = 185 + Math.random() * 92,
        St = 42 + Math.random() * 34,
        it = 34 + Math.random() * 22,
        S = Bv(C, St, it);
      (mt(S), Jt("已随机颜色"));
    },
    w = gt.useCallback(
      (C) => {
        const St = h.current;
        if (!St) return;
        const it = C.pressure && C.pressure > 0 ? C.pressure : 0.78,
          S = { x: C.clientX, y: C.clientY },
          D = z.current,
          L = 14 + O.current.brushSize * 126,
          et = Math.max(3, L * 0.22);
        if (!D) {
          (St.inject(S.x, S.y, zt, it), (z.current = S));
          return;
        }
        const ut = S.x - D.x,
          r = S.y - D.y,
          A = Math.hypot(ut, r),
          R = Math.max(1, Math.ceil(A / et));
        for (let x = 1; x <= R; x += 1) {
          const Q = x / R;
          St.inject(D.x + ut * Q, D.y + r * Q, zt, it);
        }
        z.current = S;
      },
      [zt],
    ),
    Qt = (C) => {
      ((N.current = !0), (z.current = null), C.currentTarget.setPointerCapture(C.pointerId), w(C));
    },
    dl = (C) => {
      N.current && w(C);
    },
    Ul = (C) => {
      ((N.current = !1),
        (z.current = null),
        C.currentTarget.hasPointerCapture(C.pointerId) &&
          C.currentTarget.releasePointerCapture(C.pointerId));
    },
    el = () => {
      (h.current?.clear(), (z.current = null), (N.current = !1), Jt("已重置"));
    },
    Zt = () => {
      const C = M.current,
        St = h.current;
      if (!C || !St) {
        Jt("导出失败");
        return;
      }
      (St.render(performance.now() / 1e3),
        C.toBlob((it) => {
          if (!it) {
            Jt("导出失败");
            return;
          }
          const S = URL.createObjectURL(it),
            D = document.createElement("a");
          ((D.href = S),
            (D.download = `watercolor-${new Date().toISOString().replace(/[:.]/g, "-")}.png`),
            D.click(),
            window.setTimeout(() => URL.revokeObjectURL(S), 1e3),
            Jt("PNG 已导出"));
        }, "image/png"));
    };
  return B.jsx("main", {
    className: "appShell",
    children: B.jsxs("section", {
      className: "canvasStage",
      "aria-label": "WebGL 水彩画布",
      children: [
        Nt.active ? B.jsx(Nv, { fallback: Nt, onReset: el }) : null,
        B.jsx("canvas", {
          ref: M,
          className: "watercolorCanvas",
          onPointerDown: Qt,
          onPointerMove: dl,
          onPointerUp: Ul,
          onPointerCancel: Ul,
          onPointerLeave: (C) => {
            N.current && Ul(C);
          },
        }),
        B.jsxs("aside", {
          className: "controlPanel",
          "aria-label": "水彩参数面板",
          children: [
            B.jsxs("div", {
              className: "actionGrid",
              children: [
                B.jsxs("button", {
                  type: "button",
                  className: "toolButton",
                  onClick: el,
                  children: [
                    B.jsx(xr, { size: 18, "aria-hidden": "true" }),
                    B.jsx("span", { children: "重置" }),
                  ],
                }),
                B.jsxs("button", {
                  type: "button",
                  className: "toolButton",
                  onClick: () => J((C) => !C),
                  children: [
                    E
                      ? B.jsx(_v, { size: 18, "aria-hidden": "true" })
                      : B.jsx(bv, { size: 18, "aria-hidden": "true" }),
                    B.jsx("span", { children: E ? "继续" : "暂停" }),
                  ],
                }),
              ],
            }),
            B.jsxs("div", {
              className: "colorHeader",
              children: [
                B.jsx("span", { children: "颜料颜色" }),
                B.jsx("strong", { children: q.toUpperCase() }),
              ],
            }),
            B.jsxs("div", {
              className: "colorField",
              children: [
                B.jsxs("label", {
                  className: "colorSwatch",
                  style: { "--paint": q },
                  children: [
                    B.jsx("span", { className: "srOnly", children: "选择颜料颜色" }),
                    B.jsx("input", {
                      type: "color",
                      value: q,
                      onChange: (C) => {
                        (mt(C.currentTarget.value), Jt("已改颜色"));
                      },
                    }),
                  ],
                }),
                B.jsx("button", {
                  type: "button",
                  className: "randomButton",
                  onClick: Lt,
                  children: "随机颜色",
                }),
              ],
            }),
            B.jsx(Qa, {
              label: "笔刷大小",
              value: X.brushSize,
              min: 0.08,
              max: 1,
              step: 0.01,
              decimals: 2,
              onChange: (C) => bt("brushSize", C),
            }),
            B.jsx(Qa, {
              label: "颜料保留",
              value: X.retention,
              min: 0.94,
              max: 0.999,
              step: 0.001,
              decimals: 3,
              onChange: (C) => bt("retention", C),
            }),
            B.jsx(Qa, {
              label: "水流阻力",
              value: X.resistance,
              min: 0,
              max: 1,
              step: 0.01,
              decimals: 2,
              onChange: (C) => bt("resistance", C),
            }),
            B.jsx(Qa, {
              label: "纸面压力",
              value: X.paperPressure,
              min: 0,
              max: 1,
              step: 0.01,
              decimals: 2,
              onChange: (C) => bt("paperPressure", C),
            }),
            B.jsx(Qa, {
              label: "湿润阴旋",
              value: X.wetVortex,
              min: 0,
              max: 30,
              step: 1,
              decimals: 0,
              onChange: (C) => bt("wetVortex", C),
            }),
            B.jsx(Qa, {
              label: "柔光强度",
              value: X.softStrength,
              min: 0,
              max: 1,
              step: 0.01,
              decimals: 2,
              onChange: (C) => bt("softStrength", C),
            }),
            B.jsx(Qa, {
              label: "光晕权重",
              value: X.haloWeight,
              min: 0,
              max: 1,
              step: 0.01,
              decimals: 2,
              onChange: (C) => bt("haloWeight", C),
            }),
            B.jsx(Ln, {
              label: "色彩漂移",
              checked: X.colorDrift,
              onChange: (C) => bt("colorDrift", C),
            }),
            B.jsx(Ln, {
              label: "颜料明暗",
              checked: X.pigmentShading,
              onChange: (C) => bt("pigmentShading", C),
            }),
            B.jsx(Ln, {
              label: "柔和辉光",
              checked: X.softBloom,
              onChange: (C) => bt("softBloom", C),
            }),
            B.jsx(Ln, {
              label: "光束效果",
              checked: X.lightBeams,
              onChange: (C) => bt("lightBeams", C),
            }),
            B.jsxs("div", {
              className: "panelFooter",
              children: [
                B.jsxs("span", { children: [Kt, " · ", Ft] }),
                B.jsxs("button", {
                  type: "button",
                  className: "exportButton",
                  onClick: Zt,
                  children: [B.jsx(gv, { size: 15, "aria-hidden": "true" }), "导出"],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Qa({ label: M, value: h, min: b, max: s, step: O, decimals: z, onChange: N }) {
  const X = ((h - b) / (s - b)) * 100;
  return B.jsxs("label", {
    className: "controlRow",
    children: [
      B.jsxs("span", {
        className: "controlMeta",
        children: [B.jsx("span", { children: M }), B.jsx("strong", { children: h.toFixed(z) })],
      }),
      B.jsx("input", {
        type: "range",
        min: b,
        max: s,
        step: O,
        value: h,
        style: { "--progress": `${X}%` },
        onChange: (U) => N(Number(U.currentTarget.value)),
      }),
    ],
  });
}
function Ln({ label: M, checked: h, onChange: b }) {
  return B.jsxs("label", {
    className: "toggleRow",
    children: [
      B.jsx("span", { children: M }),
      B.jsx("input", { type: "checkbox", checked: h, onChange: (s) => b(s.currentTarget.checked) }),
    ],
  });
}
function Nv({ fallback: M, onReset: h }) {
  return B.jsxs("div", {
    className: "fallbackLayer",
    role: "alert",
    children: [
      B.jsxs("div", {
        className: "staticWash",
        "aria-hidden": "true",
        children: [B.jsx("span", {}), B.jsx("span", {}), B.jsx("span", {})],
      }),
      B.jsxs("div", {
        className: "fallbackCopy",
        children: [
          B.jsx("p", { className: "eyebrow", children: "fallback" }),
          B.jsx("h2", { children: M.title }),
          B.jsx("p", { children: M.message }),
          B.jsxs("div", {
            className: "fallbackActions",
            children: [
              B.jsxs("button", {
                type: "button",
                className: "toolButton",
                onClick: h,
                children: [
                  B.jsx(xr, { size: 18, "aria-hidden": "true" }),
                  B.jsx("span", { children: "重置" }),
                ],
              }),
              B.jsx("button", {
                type: "button",
                className: "toolButton",
                onClick: () => window.history.back(),
                children: B.jsx("span", { children: "返回" }),
              }),
              B.jsx("button", {
                type: "button",
                className: "toolButton isPrimary",
                onClick: () => window.location.reload(),
                children: B.jsx("span", { children: "重载" }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Cv(M, h) {
  const b = h.getBoundingClientRect();
  if (b.width <= 2 || b.height <= 2) return;
  const s = [
      [0.18, 0.44, 0.62],
      [0.45, 0.87, 0.77],
      [0.58, 0.48, 0.88],
    ],
    O = 74;
  for (let z = 0; z < O; z += 1) {
    const N = z / (O - 1),
      X = b.left + b.width * (0.06 + N * 0.9),
      U =
        b.top +
        b.height * (0.6 - Math.sin(N * Math.PI * 2.1) * 0.17 + Math.sin(N * Math.PI * 5.5) * 0.032),
      E = s[Math.min(s.length - 1, Math.floor(N * s.length))];
    M.inject(X, U, E, 0.42);
  }
}
function Hv(M) {
  const h = M.replace("#", ""),
    b = Number.parseInt(h, 16);
  return [((b >> 16) & 255) / 255, ((b >> 8) & 255) / 255, (b & 255) / 255];
}
function Bv(M, h, b) {
  const s = h / 100,
    O = b / 100,
    z = (1 - Math.abs(2 * O - 1)) * s,
    N = z * (1 - Math.abs(((M / 60) % 2) - 1)),
    X = O - z / 2,
    [U, E, J] =
      M < 60
        ? [z, N, 0]
        : M < 120
          ? [N, z, 0]
          : M < 180
            ? [0, z, N]
            : M < 240
              ? [0, N, z]
              : M < 300
                ? [N, 0, z]
                : [z, 0, N];
  return `#${[U, E, J]
    .map((q) =>
      Math.round((q + X) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}
ov.createRoot(document.getElementById("root")).render(
  B.jsx(gt.StrictMode, { children: B.jsx(xv, {}) }),
);
