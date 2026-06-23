(function () {
  const m = document.createElement("link").relList;
  if (m && m.supports && m.supports("modulepreload")) return;
  for (const U of document.querySelectorAll('link[rel="modulepreload"]')) s(U);
  new MutationObserver((U) => {
    for (const A of U)
      if (A.type === "childList")
        for (const B of A.addedNodes) B.tagName === "LINK" && B.rel === "modulepreload" && s(B);
  }).observe(document, { childList: !0, subtree: !0 });
  function b(U) {
    const A = {};
    return (
      U.integrity && (A.integrity = U.integrity),
      U.referrerPolicy && (A.referrerPolicy = U.referrerPolicy),
      U.crossOrigin === "use-credentials"
        ? (A.credentials = "include")
        : U.crossOrigin === "anonymous"
          ? (A.credentials = "omit")
          : (A.credentials = "same-origin"),
      A
    );
  }
  function s(U) {
    if (U.ep) return;
    U.ep = !0;
    const A = b(U);
    fetch(U.href, A);
  }
})();
var cc = { exports: {} },
  Eu = {};
var br;
function id() {
  if (br) return Eu;
  br = 1;
  var M = Symbol.for("react.transitional.element"),
    m = Symbol.for("react.fragment");
  function b(s, U, A) {
    var B = null;
    if ((A !== void 0 && (B = "" + A), U.key !== void 0 && (B = "" + U.key), "key" in U)) {
      A = {};
      for (var L in U) L !== "key" && (A[L] = U[L]);
    } else A = U;
    return ((U = A.ref), { $$typeof: M, type: s, key: B, ref: U !== void 0 ? U : null, props: A });
  }
  return ((Eu.Fragment = m), (Eu.jsx = b), (Eu.jsxs = b), Eu);
}
var pr;
function fd() {
  return (pr || ((pr = 1), (cc.exports = id())), cc.exports);
}
var x = fd(),
  sc = { exports: {} },
  V = {};
var _r;
function cd() {
  if (_r) return V;
  _r = 1;
  var M = Symbol.for("react.transitional.element"),
    m = Symbol.for("react.portal"),
    b = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    U = Symbol.for("react.profiler"),
    A = Symbol.for("react.consumer"),
    B = Symbol.for("react.context"),
    L = Symbol.for("react.forward_ref"),
    D = Symbol.for("react.suspense"),
    E = Symbol.for("react.memo"),
    Q = Symbol.for("react.lazy"),
    q = Symbol.for("react.activity"),
    tt = Symbol.iterator;
  function Kt(r) {
    return r === null || typeof r != "object"
      ? null
      : ((r = (tt && r[tt]) || r["@@iterator"]), typeof r == "function" ? r : null);
  }
  var vt = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Ht = Object.assign,
    ml = {};
  function Xt(r, z, R) {
    ((this.props = r), (this.context = z), (this.refs = ml), (this.updater = R || vt));
  }
  ((Xt.prototype.isReactComponent = {}),
    (Xt.prototype.setState = function (r, z) {
      if (typeof r != "object" && typeof r != "function" && r != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, r, z, "setState");
    }),
    (Xt.prototype.forceUpdate = function (r) {
      this.updater.enqueueForceUpdate(this, r, "forceUpdate");
    }));
  function Ol() {}
  Ol.prototype = Xt.prototype;
  function pt(r, z, R) {
    ((this.props = r), (this.context = z), (this.refs = ml), (this.updater = R || vt));
  }
  var Wt = (pt.prototype = new Ol());
  ((Wt.constructor = pt), Ht(Wt, Xt.prototype), (Wt.isPureReactComponent = !0));
  var Rt = Array.isArray;
  function Lt() {}
  var W = { H: null, A: null, T: null, S: null },
    Qt = Object.prototype.hasOwnProperty;
  function dl(r, z, R) {
    var C = R.ref;
    return { $$typeof: M, type: r, key: z, ref: C !== void 0 ? C : null, props: R };
  }
  function Ul(r, z) {
    return dl(r.type, z, r.props);
  }
  function al(r) {
    return typeof r == "object" && r !== null && r.$$typeof === M;
  }
  function Zt(r) {
    var z = { "=": "=0", ":": "=2" };
    return (
      "$" +
      r.replace(/[=:]/g, function (R) {
        return z[R];
      })
    );
  }
  var N = /\/+/g;
  function lt(r, z) {
    return typeof r == "object" && r !== null && r.key != null ? Zt("" + r.key) : z.toString(36);
  }
  function ft(r) {
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
                function (z) {
                  r.status === "pending" && ((r.status = "fulfilled"), (r.value = z));
                },
                function (z) {
                  r.status === "pending" && ((r.status = "rejected"), (r.reason = z));
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
  function S(r, z, R, C, Z) {
    var w = typeof r;
    (w === "undefined" || w === "boolean") && (r = null);
    var at = !1;
    if (r === null) at = !0;
    else
      switch (w) {
        case "bigint":
        case "string":
        case "number":
          at = !0;
          break;
        case "object":
          switch (r.$$typeof) {
            case M:
            case m:
              at = !0;
              break;
            case Q:
              return ((at = r._init), S(at(r._payload), z, R, C, Z));
          }
      }
    if (at)
      return (
        (Z = Z(r)),
        (at = C === "" ? "." + lt(r, 0) : C),
        Rt(Z)
          ? ((R = ""),
            at != null && (R = at.replace(N, "$&/") + "/"),
            S(Z, z, R, "", function (Ue) {
              return Ue;
            }))
          : Z != null &&
            (al(Z) &&
              (Z = Ul(
                Z,
                R +
                  (Z.key == null || (r && r.key === Z.key)
                    ? ""
                    : ("" + Z.key).replace(N, "$&/") + "/") +
                  at,
              )),
            z.push(Z)),
        1
      );
    at = 0;
    var Jt = C === "" ? "." : C + ":";
    if (Rt(r))
      for (var Tt = 0; Tt < r.length; Tt++)
        ((C = r[Tt]), (w = Jt + lt(C, Tt)), (at += S(C, z, R, w, Z)));
    else if (((Tt = Kt(r)), typeof Tt == "function"))
      for (r = Tt.call(r), Tt = 0; !(C = r.next()).done; )
        ((C = C.value), (w = Jt + lt(C, Tt++)), (at += S(C, z, R, w, Z)));
    else if (w === "object") {
      if (typeof r.then == "function") return S(ft(r), z, R, C, Z);
      throw (
        (z = String(r)),
        Error(
          "Objects are not valid as a React child (found: " +
            (z === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : z) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return at;
  }
  function O(r, z, R) {
    if (r == null) return r;
    var C = [],
      Z = 0;
    return (
      S(r, C, "", "", function (w) {
        return z.call(R, w, Z++);
      }),
      C
    );
  }
  function G(r) {
    if (r._status === -1) {
      var z = r._result;
      ((z = z()),
        z.then(
          function (R) {
            (r._status === 0 || r._status === -1) && ((r._status = 1), (r._result = R));
          },
          function (R) {
            (r._status === 0 || r._status === -1) && ((r._status = 2), (r._result = R));
          },
        ),
        r._status === -1 && ((r._status = 0), (r._result = z)));
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var nt =
      typeof reportError == "function"
        ? reportError
        : function (r) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var z = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof r == "object" && r !== null && typeof r.message == "string"
                    ? String(r.message)
                    : String(r),
                error: r,
              });
              if (!window.dispatchEvent(z)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", r);
              return;
            }
            console.error(r);
          },
    ct = {
      map: O,
      forEach: function (r, z, R) {
        O(
          r,
          function () {
            z.apply(this, arguments);
          },
          R,
        );
      },
      count: function (r) {
        var z = 0;
        return (
          O(r, function () {
            z++;
          }),
          z
        );
      },
      toArray: function (r) {
        return (
          O(r, function (z) {
            return z;
          }) || []
        );
      },
      only: function (r) {
        if (!al(r))
          throw Error("React.Children.only expected to receive a single React element child.");
        return r;
      },
    };
  return (
    (V.Activity = q),
    (V.Children = ct),
    (V.Component = Xt),
    (V.Fragment = b),
    (V.Profiler = U),
    (V.PureComponent = pt),
    (V.StrictMode = s),
    (V.Suspense = D),
    (V.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W),
    (V.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (r) {
        return W.H.useMemoCache(r);
      },
    }),
    (V.cache = function (r) {
      return function () {
        return r.apply(null, arguments);
      };
    }),
    (V.cacheSignal = function () {
      return null;
    }),
    (V.cloneElement = function (r, z, R) {
      if (r == null) throw Error("The argument must be a React element, but you passed " + r + ".");
      var C = Ht({}, r.props),
        Z = r.key;
      if (z != null)
        for (w in (z.key !== void 0 && (Z = "" + z.key), z))
          !Qt.call(z, w) ||
            w === "key" ||
            w === "__self" ||
            w === "__source" ||
            (w === "ref" && z.ref === void 0) ||
            (C[w] = z[w]);
      var w = arguments.length - 2;
      if (w === 1) C.children = R;
      else if (1 < w) {
        for (var at = Array(w), Jt = 0; Jt < w; Jt++) at[Jt] = arguments[Jt + 2];
        C.children = at;
      }
      return dl(r.type, Z, C);
    }),
    (V.createContext = function (r) {
      return (
        (r = {
          $$typeof: B,
          _currentValue: r,
          _currentValue2: r,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (r.Provider = r),
        (r.Consumer = { $$typeof: A, _context: r }),
        r
      );
    }),
    (V.createElement = function (r, z, R) {
      var C,
        Z = {},
        w = null;
      if (z != null)
        for (C in (z.key !== void 0 && (w = "" + z.key), z))
          Qt.call(z, C) && C !== "key" && C !== "__self" && C !== "__source" && (Z[C] = z[C]);
      var at = arguments.length - 2;
      if (at === 1) Z.children = R;
      else if (1 < at) {
        for (var Jt = Array(at), Tt = 0; Tt < at; Tt++) Jt[Tt] = arguments[Tt + 2];
        Z.children = Jt;
      }
      if (r && r.defaultProps)
        for (C in ((at = r.defaultProps), at)) Z[C] === void 0 && (Z[C] = at[C]);
      return dl(r, w, Z);
    }),
    (V.createRef = function () {
      return { current: null };
    }),
    (V.forwardRef = function (r) {
      return { $$typeof: L, render: r };
    }),
    (V.isValidElement = al),
    (V.lazy = function (r) {
      return { $$typeof: Q, _payload: { _status: -1, _result: r }, _init: G };
    }),
    (V.memo = function (r, z) {
      return { $$typeof: E, type: r, compare: z === void 0 ? null : z };
    }),
    (V.startTransition = function (r) {
      var z = W.T,
        R = {};
      W.T = R;
      try {
        var C = r(),
          Z = W.S;
        (Z !== null && Z(R, C),
          typeof C == "object" && C !== null && typeof C.then == "function" && C.then(Lt, nt));
      } catch (w) {
        nt(w);
      } finally {
        (z !== null && R.types !== null && (z.types = R.types), (W.T = z));
      }
    }),
    (V.unstable_useCacheRefresh = function () {
      return W.H.useCacheRefresh();
    }),
    (V.use = function (r) {
      return W.H.use(r);
    }),
    (V.useActionState = function (r, z, R) {
      return W.H.useActionState(r, z, R);
    }),
    (V.useCallback = function (r, z) {
      return W.H.useCallback(r, z);
    }),
    (V.useContext = function (r) {
      return W.H.useContext(r);
    }),
    (V.useDebugValue = function () {}),
    (V.useDeferredValue = function (r, z) {
      return W.H.useDeferredValue(r, z);
    }),
    (V.useEffect = function (r, z) {
      return W.H.useEffect(r, z);
    }),
    (V.useEffectEvent = function (r) {
      return W.H.useEffectEvent(r);
    }),
    (V.useId = function () {
      return W.H.useId();
    }),
    (V.useImperativeHandle = function (r, z, R) {
      return W.H.useImperativeHandle(r, z, R);
    }),
    (V.useInsertionEffect = function (r, z) {
      return W.H.useInsertionEffect(r, z);
    }),
    (V.useLayoutEffect = function (r, z) {
      return W.H.useLayoutEffect(r, z);
    }),
    (V.useMemo = function (r, z) {
      return W.H.useMemo(r, z);
    }),
    (V.useOptimistic = function (r, z) {
      return W.H.useOptimistic(r, z);
    }),
    (V.useReducer = function (r, z, R) {
      return W.H.useReducer(r, z, R);
    }),
    (V.useRef = function (r) {
      return W.H.useRef(r);
    }),
    (V.useState = function (r) {
      return W.H.useState(r);
    }),
    (V.useSyncExternalStore = function (r, z, R) {
      return W.H.useSyncExternalStore(r, z, R);
    }),
    (V.useTransition = function () {
      return W.H.useTransition();
    }),
    (V.version = "19.2.7"),
    V
  );
}
var Er;
function yc() {
  return (Er || ((Er = 1), (sc.exports = cd())), sc.exports);
}
var St = yc(),
  oc = { exports: {} },
  Tu = {},
  rc = { exports: {} },
  hc = {};
var Tr;
function sd() {
  return (
    Tr ||
      ((Tr = 1),
      (function (M) {
        function m(S, O) {
          var G = S.length;
          S.push(O);
          t: for (; 0 < G; ) {
            var nt = (G - 1) >>> 1,
              ct = S[nt];
            if (0 < U(ct, O)) ((S[nt] = O), (S[G] = ct), (G = nt));
            else break t;
          }
        }
        function b(S) {
          return S.length === 0 ? null : S[0];
        }
        function s(S) {
          if (S.length === 0) return null;
          var O = S[0],
            G = S.pop();
          if (G !== O) {
            S[0] = G;
            t: for (var nt = 0, ct = S.length, r = ct >>> 1; nt < r; ) {
              var z = 2 * (nt + 1) - 1,
                R = S[z],
                C = z + 1,
                Z = S[C];
              if (0 > U(R, G))
                C < ct && 0 > U(Z, R)
                  ? ((S[nt] = Z), (S[C] = G), (nt = C))
                  : ((S[nt] = R), (S[z] = G), (nt = z));
              else if (C < ct && 0 > U(Z, G)) ((S[nt] = Z), (S[C] = G), (nt = C));
              else break t;
            }
          }
          return O;
        }
        function U(S, O) {
          var G = S.sortIndex - O.sortIndex;
          return G !== 0 ? G : S.id - O.id;
        }
        if (
          ((M.unstable_now = void 0),
          typeof performance == "object" && typeof performance.now == "function")
        ) {
          var A = performance;
          M.unstable_now = function () {
            return A.now();
          };
        } else {
          var B = Date,
            L = B.now();
          M.unstable_now = function () {
            return B.now() - L;
          };
        }
        var D = [],
          E = [],
          Q = 1,
          q = null,
          tt = 3,
          Kt = !1,
          vt = !1,
          Ht = !1,
          ml = !1,
          Xt = typeof setTimeout == "function" ? setTimeout : null,
          Ol = typeof clearTimeout == "function" ? clearTimeout : null,
          pt = typeof setImmediate < "u" ? setImmediate : null;
        function Wt(S) {
          for (var O = b(E); O !== null; ) {
            if (O.callback === null) s(E);
            else if (O.startTime <= S) (s(E), (O.sortIndex = O.expirationTime), m(D, O));
            else break;
            O = b(E);
          }
        }
        function Rt(S) {
          if (((Ht = !1), Wt(S), !vt))
            if (b(D) !== null) ((vt = !0), Lt || ((Lt = !0), Zt()));
            else {
              var O = b(E);
              O !== null && ft(Rt, O.startTime - S);
            }
        }
        var Lt = !1,
          W = -1,
          Qt = 5,
          dl = -1;
        function Ul() {
          return ml ? !0 : !(M.unstable_now() - dl < Qt);
        }
        function al() {
          if (((ml = !1), Lt)) {
            var S = M.unstable_now();
            dl = S;
            var O = !0;
            try {
              t: {
                ((vt = !1), Ht && ((Ht = !1), Ol(W), (W = -1)), (Kt = !0));
                var G = tt;
                try {
                  l: {
                    for (Wt(S), q = b(D); q !== null && !(q.expirationTime > S && Ul()); ) {
                      var nt = q.callback;
                      if (typeof nt == "function") {
                        ((q.callback = null), (tt = q.priorityLevel));
                        var ct = nt(q.expirationTime <= S);
                        if (((S = M.unstable_now()), typeof ct == "function")) {
                          ((q.callback = ct), Wt(S), (O = !0));
                          break l;
                        }
                        (q === b(D) && s(D), Wt(S));
                      } else s(D);
                      q = b(D);
                    }
                    if (q !== null) O = !0;
                    else {
                      var r = b(E);
                      (r !== null && ft(Rt, r.startTime - S), (O = !1));
                    }
                  }
                  break t;
                } finally {
                  ((q = null), (tt = G), (Kt = !1));
                }
                O = void 0;
              }
            } finally {
              O ? Zt() : (Lt = !1);
            }
          }
        }
        var Zt;
        if (typeof pt == "function")
          Zt = function () {
            pt(al);
          };
        else if (typeof MessageChannel < "u") {
          var N = new MessageChannel(),
            lt = N.port2;
          ((N.port1.onmessage = al),
            (Zt = function () {
              lt.postMessage(null);
            }));
        } else
          Zt = function () {
            Xt(al, 0);
          };
        function ft(S, O) {
          W = Xt(function () {
            S(M.unstable_now());
          }, O);
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
            return tt;
          }),
          (M.unstable_next = function (S) {
            switch (tt) {
              case 1:
              case 2:
              case 3:
                var O = 3;
                break;
              default:
                O = tt;
            }
            var G = tt;
            tt = O;
            try {
              return S();
            } finally {
              tt = G;
            }
          }),
          (M.unstable_requestPaint = function () {
            ml = !0;
          }),
          (M.unstable_runWithPriority = function (S, O) {
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
            var G = tt;
            tt = S;
            try {
              return O();
            } finally {
              tt = G;
            }
          }),
          (M.unstable_scheduleCallback = function (S, O, G) {
            var nt = M.unstable_now();
            switch (
              (typeof G == "object" && G !== null
                ? ((G = G.delay), (G = typeof G == "number" && 0 < G ? nt + G : nt))
                : (G = nt),
              S)
            ) {
              case 1:
                var ct = -1;
                break;
              case 2:
                ct = 250;
                break;
              case 5:
                ct = 1073741823;
                break;
              case 4:
                ct = 1e4;
                break;
              default:
                ct = 5e3;
            }
            return (
              (ct = G + ct),
              (S = {
                id: Q++,
                callback: O,
                priorityLevel: S,
                startTime: G,
                expirationTime: ct,
                sortIndex: -1,
              }),
              G > nt
                ? ((S.sortIndex = G),
                  m(E, S),
                  b(D) === null &&
                    S === b(E) &&
                    (Ht ? (Ol(W), (W = -1)) : (Ht = !0), ft(Rt, G - nt)))
                : ((S.sortIndex = ct), m(D, S), vt || Kt || ((vt = !0), Lt || ((Lt = !0), Zt()))),
              S
            );
          }),
          (M.unstable_shouldYield = Ul),
          (M.unstable_wrapCallback = function (S) {
            var O = tt;
            return function () {
              var G = tt;
              tt = O;
              try {
                return S.apply(this, arguments);
              } finally {
                tt = G;
              }
            };
          }));
      })(hc)),
    hc
  );
}
var zr;
function od() {
  return (zr || ((zr = 1), (rc.exports = sd())), rc.exports);
}
var mc = { exports: {} },
  Vt = {};
var Ar;
function rd() {
  if (Ar) return Vt;
  Ar = 1;
  var M = yc();
  function m(D) {
    var E = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Q = 2; Q < arguments.length; Q++) E += "&args[]=" + encodeURIComponent(arguments[Q]);
    }
    return (
      "Minified React error #" +
      D +
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
          throw Error(m(522));
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
    U = Symbol.for("react.portal");
  function A(D, E, Q) {
    var q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: U,
      key: q == null ? null : "" + q,
      children: D,
      containerInfo: E,
      implementation: Q,
    };
  }
  var B = M.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function L(D, E) {
    if (D === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  return (
    (Vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (Vt.createPortal = function (D, E) {
      var Q = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!E || (E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11)) throw Error(m(299));
      return A(D, E, null, Q);
    }),
    (Vt.flushSync = function (D) {
      var E = B.T,
        Q = s.p;
      try {
        if (((B.T = null), (s.p = 2), D)) return D();
      } finally {
        ((B.T = E), (s.p = Q), s.d.f());
      }
    }),
    (Vt.preconnect = function (D, E) {
      typeof D == "string" &&
        (E
          ? ((E = E.crossOrigin),
            (E = typeof E == "string" ? (E === "use-credentials" ? E : "") : void 0))
          : (E = null),
        s.d.C(D, E));
    }),
    (Vt.prefetchDNS = function (D) {
      typeof D == "string" && s.d.D(D);
    }),
    (Vt.preinit = function (D, E) {
      if (typeof D == "string" && E && typeof E.as == "string") {
        var Q = E.as,
          q = L(Q, E.crossOrigin),
          tt = typeof E.integrity == "string" ? E.integrity : void 0,
          Kt = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
        Q === "style"
          ? s.d.S(D, typeof E.precedence == "string" ? E.precedence : void 0, {
              crossOrigin: q,
              integrity: tt,
              fetchPriority: Kt,
            })
          : Q === "script" &&
            s.d.X(D, {
              crossOrigin: q,
              integrity: tt,
              fetchPriority: Kt,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
      }
    }),
    (Vt.preinitModule = function (D, E) {
      if (typeof D == "string")
        if (typeof E == "object" && E !== null) {
          if (E.as == null || E.as === "script") {
            var Q = L(E.as, E.crossOrigin);
            s.d.M(D, {
              crossOrigin: Q,
              integrity: typeof E.integrity == "string" ? E.integrity : void 0,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
          }
        } else E == null && s.d.M(D);
    }),
    (Vt.preload = function (D, E) {
      if (typeof D == "string" && typeof E == "object" && E !== null && typeof E.as == "string") {
        var Q = E.as,
          q = L(Q, E.crossOrigin);
        s.d.L(D, Q, {
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
    (Vt.preloadModule = function (D, E) {
      if (typeof D == "string")
        if (E) {
          var Q = L(E.as, E.crossOrigin);
          s.d.m(D, {
            as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
            crossOrigin: Q,
            integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          });
        } else s.d.m(D);
    }),
    (Vt.requestFormReset = function (D) {
      s.d.r(D);
    }),
    (Vt.unstable_batchedUpdates = function (D, E) {
      return D(E);
    }),
    (Vt.useFormState = function (D, E, Q) {
      return B.H.useFormState(D, E, Q);
    }),
    (Vt.useFormStatus = function () {
      return B.H.useHostTransitionStatus();
    }),
    (Vt.version = "19.2.7"),
    Vt
  );
}
var Mr;
function hd() {
  if (Mr) return mc.exports;
  Mr = 1;
  function M() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(M);
      } catch (m) {
        console.error(m);
      }
  }
  return (M(), (mc.exports = rd()), mc.exports);
}
var Dr;
function md() {
  if (Dr) return Tu;
  Dr = 1;
  var M = od(),
    m = yc(),
    b = hd();
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
  function U(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function A(t) {
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
  function B(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if ((l === null && ((t = t.alternate), t !== null && (l = t.memoizedState)), l !== null))
        return l.dehydrated;
    }
    return null;
  }
  function L(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if ((l === null && ((t = t.alternate), t !== null && (l = t.memoizedState)), l !== null))
        return l.dehydrated;
    }
    return null;
  }
  function D(t) {
    if (A(t) !== t) throw Error(s(188));
  }
  function E(t) {
    var l = t.alternate;
    if (!l) {
      if (((l = A(t)), l === null)) throw Error(s(188));
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
          if (n === a) return (D(u), t);
          if (n === e) return (D(u), l);
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
  function Q(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((l = Q(t)), l !== null)) return l;
      t = t.sibling;
    }
    return null;
  }
  var q = Object.assign,
    tt = Symbol.for("react.element"),
    Kt = Symbol.for("react.transitional.element"),
    vt = Symbol.for("react.portal"),
    Ht = Symbol.for("react.fragment"),
    ml = Symbol.for("react.strict_mode"),
    Xt = Symbol.for("react.profiler"),
    Ol = Symbol.for("react.consumer"),
    pt = Symbol.for("react.context"),
    Wt = Symbol.for("react.forward_ref"),
    Rt = Symbol.for("react.suspense"),
    Lt = Symbol.for("react.suspense_list"),
    W = Symbol.for("react.memo"),
    Qt = Symbol.for("react.lazy"),
    dl = Symbol.for("react.activity"),
    Ul = Symbol.for("react.memo_cache_sentinel"),
    al = Symbol.iterator;
  function Zt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (al && t[al]) || t["@@iterator"]), typeof t == "function" ? t : null);
  }
  var N = Symbol.for("react.client.reference");
  function lt(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.$$typeof === N ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case Ht:
        return "Fragment";
      case Xt:
        return "Profiler";
      case ml:
        return "StrictMode";
      case Rt:
        return "Suspense";
      case Lt:
        return "SuspenseList";
      case dl:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case vt:
          return "Portal";
        case pt:
          return t.displayName || "Context";
        case Ol:
          return (t._context.displayName || "Context") + ".Consumer";
        case Wt:
          var l = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = l.displayName || l.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case W:
          return ((l = t.displayName || null), l !== null ? l : lt(t.type) || "Memo");
        case Qt:
          ((l = t._payload), (t = t._init));
          try {
            return lt(t(l));
          } catch {}
      }
    return null;
  }
  var ft = Array.isArray,
    S = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    O = b.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    G = { pending: !1, data: null, method: null, action: null },
    nt = [],
    ct = -1;
  function r(t) {
    return { current: t };
  }
  function z(t) {
    0 > ct || ((t.current = nt[ct]), (nt[ct] = null), ct--);
  }
  function R(t, l) {
    (ct++, (nt[ct] = t.current), (t.current = l));
  }
  var C = r(null),
    Z = r(null),
    w = r(null),
    at = r(null);
  function Jt(t, l) {
    switch ((R(w, l), R(Z, t), R(C, null), l.nodeType)) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Q0(t) : 0;
        break;
      default:
        if (((t = l.tagName), (l = l.namespaceURI))) ((l = Q0(l)), (t = Z0(l, t)));
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
    (z(C), R(C, t));
  }
  function Tt() {
    (z(C), z(Z), z(w));
  }
  function Ue(t) {
    t.memoizedState !== null && R(at, t);
    var l = C.current,
      a = Z0(l, t.type);
    l !== a && (R(Z, t), R(C, a));
  }
  function zu(t) {
    (Z.current === t && (z(C), z(Z)), at.current === t && (z(at), (Su._currentValue = G)));
  }
  var Zn, gc;
  function za(t) {
    if (Zn === void 0)
      try {
        throw Error();
      } catch (a) {
        var l = a.stack.trim().match(/\n( *(at )?)/);
        ((Zn = (l && l[1]) || ""),
          (gc =
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
      gc
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
          v = f.split(`
`);
        for (u = e = 0; e < c.length && !c[e].includes("DetermineComponentFrameRoot"); ) e++;
        for (; u < v.length && !v[u].includes("DetermineComponentFrameRoot"); ) u++;
        if (e === c.length || u === v.length)
          for (e = c.length - 1, u = v.length - 1; 1 <= e && 0 <= u && c[e] !== v[u]; ) u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (c[e] !== v[u]) {
            if (e !== 1 || u !== 1)
              do
                if ((e--, u--, 0 > u || c[e] !== v[u])) {
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
    return (a = t ? t.displayName || t.name : "") ? za(a) : "";
  }
  function qr(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return za(t.type);
      case 16:
        return za("Lazy");
      case 13:
        return t.child !== l && l !== null ? za("Suspense Fallback") : za("Suspense");
      case 19:
        return za("SuspenseList");
      case 0:
      case 15:
        return Kn(t.type, !1);
      case 11:
        return Kn(t.type.render, !1);
      case 1:
        return Kn(t.type, !0);
      case 31:
        return za("Activity");
      default:
        return "";
    }
  }
  function Sc(t) {
    try {
      var l = "",
        a = null;
      do ((l += qr(t, a)), (a = t), (t = t.return));
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
    Yr = M.unstable_shouldYield,
    Gr = M.unstable_requestPaint,
    el = M.unstable_now,
    Xr = M.unstable_getCurrentPriorityLevel,
    bc = M.unstable_ImmediatePriority,
    pc = M.unstable_UserBlockingPriority,
    Au = M.unstable_NormalPriority,
    Lr = M.unstable_LowPriority,
    _c = M.unstable_IdlePriority,
    Qr = M.log,
    Zr = M.unstable_setDisableYieldValue,
    Re = null,
    ul = null;
  function Il(t) {
    if ((typeof Qr == "function" && Zr(t), ul && typeof ul.setStrictMode == "function"))
      try {
        ul.setStrictMode(Re, t);
      } catch {}
  }
  var nl = Math.clz32 ? Math.clz32 : Jr,
    Vr = Math.log,
    Kr = Math.LN2;
  function Jr(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Vr(t) / Kr) | 0)) | 0);
  }
  var Mu = 256,
    Du = 262144,
    Ou = 4194304;
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
  function Uu(t, l, a) {
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
  function xe(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function wr(t, l) {
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
  function Ec() {
    var t = Ou;
    return ((Ou <<= 1), (Ou & 62914560) === 0 && (Ou = 4194304), t);
  }
  function Fn(t) {
    for (var l = [], a = 0; 31 > a; a++) l.push(t);
    return l;
  }
  function Ne(t, l) {
    ((t.pendingLanes |= l),
      l !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function Wr(t, l, a, e, u, n) {
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
      v = t.hiddenUpdates;
    for (a = i & ~a; 0 < a; ) {
      var p = 31 - nl(a),
        T = 1 << p;
      ((f[p] = 0), (c[p] = -1));
      var y = v[p];
      if (y !== null)
        for (v[p] = null, p = 0; p < y.length; p++) {
          var g = y[p];
          g !== null && (g.lane &= -536870913);
        }
      a &= ~T;
    }
    (e !== 0 && Tc(t, e, 0),
      n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l)));
  }
  function Tc(t, l, a) {
    ((t.pendingLanes |= l), (t.suspendedLanes &= ~l));
    var e = 31 - nl(l);
    ((t.entangledLanes |= l),
      (t.entanglements[e] = t.entanglements[e] | 1073741824 | (a & 261930)));
  }
  function zc(t, l) {
    var a = (t.entangledLanes |= l);
    for (t = t.entanglements; a; ) {
      var e = 31 - nl(a),
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
  function Mc() {
    var t = O.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : hr(t.type));
  }
  function Dc(t, l) {
    var a = O.p;
    try {
      return ((O.p = t), l());
    } finally {
      O.p = a;
    }
  }
  var Pl = Math.random().toString(36).slice(2),
    Bt = "__reactFiber$" + Pl,
    Ft = "__reactProps$" + Pl,
    Va = "__reactContainer$" + Pl,
    In = "__reactEvents$" + Pl,
    Fr = "__reactListeners$" + Pl,
    $r = "__reactHandles$" + Pl,
    Oc = "__reactResources$" + Pl,
    Ce = "__reactMarker$" + Pl;
  function Pn(t) {
    (delete t[Bt], delete t[Ft], delete t[In], delete t[Fr], delete t[$r]);
  }
  function Ka(t) {
    var l = t[Bt];
    if (l) return l;
    for (var a = t.parentNode; a; ) {
      if ((l = a[Va] || a[Bt])) {
        if (((a = l.alternate), l.child !== null || (a !== null && a.child !== null)))
          for (t = $0(t); t !== null; ) {
            if ((a = t[Bt])) return a;
            t = $0(t);
          }
        return l;
      }
      ((t = a), (a = t.parentNode));
    }
    return null;
  }
  function Ja(t) {
    if ((t = t[Bt] || t[Va])) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3) return t;
    }
    return null;
  }
  function He(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function wa(t) {
    var l = t[Oc];
    return (l || (l = t[Oc] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), l);
  }
  function Nt(t) {
    t[Ce] = !0;
  }
  var Uc = new Set(),
    Rc = {};
  function Ma(t, l) {
    (Wa(t, l), Wa(t + "Capture", l));
  }
  function Wa(t, l) {
    for (Rc[t] = l, t = 0; t < l.length; t++) Uc.add(l[t]);
  }
  var kr = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    xc = {},
    Nc = {};
  function Ir(t) {
    return Jn.call(Nc, t)
      ? !0
      : Jn.call(xc, t)
        ? !1
        : kr.test(t)
          ? (Nc[t] = !0)
          : ((xc[t] = !0), !1);
  }
  function Ru(t, l, a) {
    if (Ir(l))
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
  function xu(t, l, a) {
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
  function vl(t) {
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
  function Cc(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Pr(t, l, a) {
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
      var l = Cc(t) ? "checked" : "value";
      t._valueTracker = Pr(t, l, "" + t[l]);
    }
  }
  function Hc(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var a = l.getValue(),
      e = "";
    return (
      t && (e = Cc(t) ? (t.checked ? "true" : "false") : t.value),
      (t = e),
      t !== a ? (l.setValue(t), !0) : !1
    );
  }
  function Nu(t) {
    if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var th = /[\n"\\]/g;
  function yl(t) {
    return t.replace(th, function (l) {
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
          ? ((l === 0 && t.value === "") || t.value != l) && (t.value = "" + vl(l))
          : t.value !== "" + vl(l) && (t.value = "" + vl(l))
        : (i !== "submit" && i !== "reset") || t.removeAttribute("value"),
      l != null
        ? ai(t, i, vl(l))
        : a != null
          ? ai(t, i, vl(a))
          : e != null && t.removeAttribute("value"),
      u == null && n != null && (t.defaultChecked = !!n),
      u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean"
        ? (t.name = "" + vl(f))
        : t.removeAttribute("name"));
  }
  function Bc(t, l, a, e, u, n, i, f) {
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
      ((a = a != null ? "" + vl(a) : ""),
        (l = l != null ? "" + vl(l) : a),
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
    (l === "number" && Nu(t.ownerDocument) === t) ||
      t.defaultValue === "" + a ||
      (t.defaultValue = "" + a);
  }
  function Fa(t, l, a, e) {
    if (((t = t.options), l)) {
      l = {};
      for (var u = 0; u < a.length; u++) l["$" + a[u]] = !0;
      for (a = 0; a < t.length; a++)
        ((u = l.hasOwnProperty("$" + t[a].value)),
          t[a].selected !== u && (t[a].selected = u),
          u && e && (t[a].defaultSelected = !0));
    } else {
      for (a = "" + vl(a), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === a) {
          ((t[u].selected = !0), e && (t[u].defaultSelected = !0));
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function jc(t, l, a) {
    if (l != null && ((l = "" + vl(l)), l !== t.value && (t.value = l), a == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = a != null ? "" + vl(a) : "";
  }
  function qc(t, l, a, e) {
    if (l == null) {
      if (e != null) {
        if (a != null) throw Error(s(92));
        if (ft(e)) {
          if (1 < e.length) throw Error(s(93));
          e = e[0];
        }
        a = e;
      }
      (a == null && (a = ""), (l = a));
    }
    ((a = vl(l)),
      (t.defaultValue = a),
      (e = t.textContent),
      e === a && e !== "" && e !== null && (t.value = e),
      ti(t));
  }
  function $a(t, l) {
    if (l) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var lh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Yc(t, l, a) {
    var e = l.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? e
        ? t.setProperty(l, "")
        : l === "float"
          ? (t.cssFloat = "")
          : (t[l] = "")
      : e
        ? t.setProperty(l, a)
        : typeof a != "number" || a === 0 || lh.has(l)
          ? l === "float"
            ? (t.cssFloat = a)
            : (t[l] = ("" + a).trim())
          : (t[l] = a + "px");
  }
  function Gc(t, l, a) {
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
      for (var u in l) ((e = l[u]), l.hasOwnProperty(u) && a[u] !== e && Yc(t, u, e));
    } else for (var n in l) l.hasOwnProperty(n) && Yc(t, n, l[n]);
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
  var ah = new Map([
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
    eh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Cu(t) {
    return eh.test("" + t)
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
  var ka = null,
    Ia = null;
  function Xc(t) {
    var l = Ja(t);
    if (l && (t = l.stateNode)) {
      var a = t[Ft] || null;
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
              a = a.querySelectorAll('input[name="' + yl("" + l) + '"][type="radio"]'), l = 0;
              l < a.length;
              l++
            ) {
              var e = a[l];
              if (e !== t && e.form === t.form) {
                var u = e[Ft] || null;
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
            for (l = 0; l < a.length; l++) ((e = a[l]), e.form === t.form && Hc(e));
          }
          break t;
        case "textarea":
          jc(t, a.value, a.defaultValue);
          break t;
        case "select":
          ((l = a.value), l != null && Fa(t, !!a.multiple, l, !1));
      }
    }
  }
  var ii = !1;
  function Lc(t, l, a) {
    if (ii) return t(l, a);
    ii = !0;
    try {
      var e = t(l);
      return e;
    } finally {
      if (
        ((ii = !1),
        (ka !== null || Ia !== null) &&
          (_n(), ka && ((l = ka), (t = Ia), (Ia = ka = null), Xc(l), t)))
      )
        for (l = 0; l < t.length; l++) Xc(t[l]);
    }
  }
  function Be(t, l) {
    var a = t.stateNode;
    if (a === null) return null;
    var e = a[Ft] || null;
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
  var jl = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    fi = !1;
  if (jl)
    try {
      var je = {};
      (Object.defineProperty(je, "passive", {
        get: function () {
          fi = !0;
        },
      }),
        window.addEventListener("test", je, je),
        window.removeEventListener("test", je, je));
    } catch {
      fi = !1;
    }
  var ta = null,
    ci = null,
    Hu = null;
  function Qc() {
    if (Hu) return Hu;
    var t,
      l = ci,
      a = l.length,
      e,
      u = "value" in ta ? ta.value : ta.textContent,
      n = u.length;
    for (t = 0; t < a && l[t] === u[t]; t++);
    var i = a - t;
    for (e = 1; e <= i && l[a - e] === u[n - e]; e++);
    return (Hu = u.slice(t, 1 < e ? 1 - e : void 0));
  }
  function Bu(t) {
    var l = t.keyCode;
    return (
      "charCode" in t ? ((t = t.charCode), t === 0 && l === 13 && (t = 13)) : (t = l),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function ju() {
    return !0;
  }
  function Zc() {
    return !1;
  }
  function $t(t) {
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
          ? ju
          : Zc),
        (this.isPropagationStopped = Zc),
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
            (this.isDefaultPrevented = ju));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = ju));
        },
        persist: function () {},
        isPersistent: ju,
      }),
      l
    );
  }
  var Da = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    qu = $t(Da),
    qe = q({}, Da, { view: 0, detail: 0 }),
    uh = $t(qe),
    si,
    oi,
    Ye,
    Yu = q({}, qe, {
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
      getModifierState: hi,
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
          : (t !== Ye &&
              (Ye && t.type === "mousemove"
                ? ((si = t.screenX - Ye.screenX), (oi = t.screenY - Ye.screenY))
                : (oi = si = 0),
              (Ye = t)),
            si);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : oi;
      },
    }),
    Vc = $t(Yu),
    nh = q({}, Yu, { dataTransfer: 0 }),
    ih = $t(nh),
    fh = q({}, qe, { relatedTarget: 0 }),
    ri = $t(fh),
    ch = q({}, Da, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    sh = $t(ch),
    oh = q({}, Da, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    rh = $t(oh),
    hh = q({}, Da, { data: 0 }),
    Kc = $t(hh),
    mh = {
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
    dh = {
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
    vh = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function yh(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = vh[t]) ? !!l[t] : !1;
  }
  function hi() {
    return yh;
  }
  var gh = q({}, qe, {
      key: function (t) {
        if (t.key) {
          var l = mh[t.key] || t.key;
          if (l !== "Unidentified") return l;
        }
        return t.type === "keypress"
          ? ((t = Bu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? dh[t.keyCode] || "Unidentified"
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
      getModifierState: hi,
      charCode: function (t) {
        return t.type === "keypress" ? Bu(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Bu(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    Sh = $t(gh),
    bh = q({}, Yu, {
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
    Jc = $t(bh),
    ph = q({}, qe, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: hi,
    }),
    _h = $t(ph),
    Eh = q({}, Da, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Th = $t(Eh),
    zh = q({}, Yu, {
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
    Ah = $t(zh),
    Mh = q({}, Da, { newState: 0, oldState: 0 }),
    Dh = $t(Mh),
    Oh = [9, 13, 27, 32],
    mi = jl && "CompositionEvent" in window,
    Ge = null;
  jl && "documentMode" in document && (Ge = document.documentMode);
  var Uh = jl && "TextEvent" in window && !Ge,
    wc = jl && (!mi || (Ge && 8 < Ge && 11 >= Ge)),
    Wc = " ",
    Fc = !1;
  function $c(t, l) {
    switch (t) {
      case "keyup":
        return Oh.indexOf(l.keyCode) !== -1;
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
  function kc(t) {
    return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
  }
  var Pa = !1;
  function Rh(t, l) {
    switch (t) {
      case "compositionend":
        return kc(l);
      case "keypress":
        return l.which !== 32 ? null : ((Fc = !0), Wc);
      case "textInput":
        return ((t = l.data), t === Wc && Fc ? null : t);
      default:
        return null;
    }
  }
  function xh(t, l) {
    if (Pa)
      return t === "compositionend" || (!mi && $c(t, l))
        ? ((t = Qc()), (Hu = ci = ta = null), (Pa = !1), t)
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
        return wc && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var Nh = {
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
  function Ic(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Nh[t.type] : l === "textarea";
  }
  function Pc(t, l, a, e) {
    (ka ? (Ia ? Ia.push(e) : (Ia = [e])) : (ka = e),
      (l = On(l, "onChange")),
      0 < l.length &&
        ((a = new qu("onChange", "change", null, a, e)), t.push({ event: a, listeners: l })));
  }
  var Xe = null,
    Le = null;
  function Ch(t) {
    j0(t, 0);
  }
  function Gu(t) {
    var l = He(t);
    if (Hc(l)) return t;
  }
  function ts(t, l) {
    if (t === "change") return l;
  }
  var ls = !1;
  if (jl) {
    var di;
    if (jl) {
      var vi = "oninput" in document;
      if (!vi) {
        var as = document.createElement("div");
        (as.setAttribute("oninput", "return;"), (vi = typeof as.oninput == "function"));
      }
      di = vi;
    } else di = !1;
    ls = di && (!document.documentMode || 9 < document.documentMode);
  }
  function es() {
    Xe && (Xe.detachEvent("onpropertychange", us), (Le = Xe = null));
  }
  function us(t) {
    if (t.propertyName === "value" && Gu(Le)) {
      var l = [];
      (Pc(l, Le, t, ni(t)), Lc(Ch, l));
    }
  }
  function Hh(t, l, a) {
    t === "focusin"
      ? (es(), (Xe = l), (Le = a), Xe.attachEvent("onpropertychange", us))
      : t === "focusout" && es();
  }
  function Bh(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") return Gu(Le);
  }
  function jh(t, l) {
    if (t === "click") return Gu(l);
  }
  function qh(t, l) {
    if (t === "input" || t === "change") return Gu(l);
  }
  function Yh(t, l) {
    return (t === l && (t !== 0 || 1 / t === 1 / l)) || (t !== t && l !== l);
  }
  var il = typeof Object.is == "function" ? Object.is : Yh;
  function Qe(t, l) {
    if (il(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null) return !1;
    var a = Object.keys(t),
      e = Object.keys(l);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!Jn.call(l, u) || !il(t[u], l[u])) return !1;
    }
    return !0;
  }
  function ns(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function is(t, l) {
    var a = ns(t);
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
      a = ns(a);
    }
  }
  function fs(t, l) {
    return t && l
      ? t === l
        ? !0
        : t && t.nodeType === 3
          ? !1
          : l && l.nodeType === 3
            ? fs(t, l.parentNode)
            : "contains" in t
              ? t.contains(l)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(l) & 16)
                : !1
      : !1;
  }
  function cs(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var l = Nu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof l.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = l.contentWindow;
      else break;
      l = Nu(t.document);
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
  var Gh = jl && "documentMode" in document && 11 >= document.documentMode,
    te = null,
    gi = null,
    Ze = null,
    Si = !1;
  function ss(t, l, a) {
    var e = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Si ||
      te == null ||
      te !== Nu(e) ||
      ((e = te),
      "selectionStart" in e && yi(e)
        ? (e = { start: e.selectionStart, end: e.selectionEnd })
        : ((e = ((e.ownerDocument && e.ownerDocument.defaultView) || window).getSelection()),
          (e = {
            anchorNode: e.anchorNode,
            anchorOffset: e.anchorOffset,
            focusNode: e.focusNode,
            focusOffset: e.focusOffset,
          })),
      (Ze && Qe(Ze, e)) ||
        ((Ze = e),
        (e = On(gi, "onSelect")),
        0 < e.length &&
          ((l = new qu("onSelect", "select", null, l, a)),
          t.push({ event: l, listeners: e }),
          (l.target = te))));
  }
  function Oa(t, l) {
    var a = {};
    return (
      (a[t.toLowerCase()] = l.toLowerCase()),
      (a["Webkit" + t] = "webkit" + l),
      (a["Moz" + t] = "moz" + l),
      a
    );
  }
  var le = {
      animationend: Oa("Animation", "AnimationEnd"),
      animationiteration: Oa("Animation", "AnimationIteration"),
      animationstart: Oa("Animation", "AnimationStart"),
      transitionrun: Oa("Transition", "TransitionRun"),
      transitionstart: Oa("Transition", "TransitionStart"),
      transitioncancel: Oa("Transition", "TransitionCancel"),
      transitionend: Oa("Transition", "TransitionEnd"),
    },
    bi = {},
    os = {};
  jl &&
    ((os = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete le.animationend.animation,
      delete le.animationiteration.animation,
      delete le.animationstart.animation),
    "TransitionEvent" in window || delete le.transitionend.transition);
  function Ua(t) {
    if (bi[t]) return bi[t];
    if (!le[t]) return t;
    var l = le[t],
      a;
    for (a in l) if (l.hasOwnProperty(a) && a in os) return (bi[t] = l[a]);
    return t;
  }
  var rs = Ua("animationend"),
    hs = Ua("animationiteration"),
    ms = Ua("animationstart"),
    Xh = Ua("transitionrun"),
    Lh = Ua("transitionstart"),
    Qh = Ua("transitioncancel"),
    ds = Ua("transitionend"),
    vs = new Map(),
    pi =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  pi.push("scrollEnd");
  function Al(t, l) {
    (vs.set(t, l), Ma(l, [t]));
  }
  var Xu =
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
    gl = [],
    ae = 0,
    _i = 0;
  function Lu() {
    for (var t = ae, l = (_i = ae = 0); l < t; ) {
      var a = gl[l];
      gl[l++] = null;
      var e = gl[l];
      gl[l++] = null;
      var u = gl[l];
      gl[l++] = null;
      var n = gl[l];
      if (((gl[l++] = null), e !== null && u !== null)) {
        var i = e.pending;
        (i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)), (e.pending = u));
      }
      n !== 0 && ys(a, u, n);
    }
  }
  function Qu(t, l, a, e) {
    ((gl[ae++] = t),
      (gl[ae++] = l),
      (gl[ae++] = a),
      (gl[ae++] = e),
      (_i |= e),
      (t.lanes |= e),
      (t = t.alternate),
      t !== null && (t.lanes |= e));
  }
  function Ei(t, l, a, e) {
    return (Qu(t, l, a, e), Zu(t));
  }
  function Ra(t, l) {
    return (Qu(t, null, null, l), Zu(t));
  }
  function ys(t, l, a) {
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
          ((u = 31 - nl(a)),
          (t = n.hiddenUpdates),
          (e = t[u]),
          e === null ? (t[u] = [l]) : e.push(l),
          (l.lane = a | 536870912)),
        n)
      : null;
  }
  function Zu(t) {
    if (50 < ru) throw ((ru = 0), (Nf = null), Error(s(185)));
    for (var l = t.return; l !== null; ) ((t = l), (l = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var ee = {};
  function Zh(t, l, a, e) {
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
  function fl(t, l, a, e) {
    return new Zh(t, l, a, e);
  }
  function Ti(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function ql(t, l) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = fl(t.tag, l, t.key, t.mode)),
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
  function gs(t, l) {
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
  function Vu(t, l, a, e, u, n) {
    var i = 0;
    if (((e = t), typeof t == "function")) Ti(t) && (i = 1);
    else if (typeof t == "string")
      i = Wm(t, a, C.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case dl:
          return ((t = fl(31, a, l, u)), (t.elementType = dl), (t.lanes = n), t);
        case Ht:
          return xa(a.children, u, n, l);
        case ml:
          ((i = 8), (u |= 24));
          break;
        case Xt:
          return ((t = fl(12, a, l, u | 2)), (t.elementType = Xt), (t.lanes = n), t);
        case Rt:
          return ((t = fl(13, a, l, u)), (t.elementType = Rt), (t.lanes = n), t);
        case Lt:
          return ((t = fl(19, a, l, u)), (t.elementType = Lt), (t.lanes = n), t);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case pt:
                i = 10;
                break t;
              case Ol:
                i = 9;
                break t;
              case Wt:
                i = 11;
                break t;
              case W:
                i = 14;
                break t;
              case Qt:
                ((i = 16), (e = null));
                break t;
            }
          ((i = 29), (a = Error(s(130, t === null ? "null" : typeof t, ""))), (e = null));
      }
    return ((l = fl(i, a, l, u)), (l.elementType = t), (l.type = e), (l.lanes = n), l);
  }
  function xa(t, l, a, e) {
    return ((t = fl(7, t, e, l)), (t.lanes = a), t);
  }
  function zi(t, l, a) {
    return ((t = fl(6, t, null, l)), (t.lanes = a), t);
  }
  function Ss(t) {
    var l = fl(18, null, null, 0);
    return ((l.stateNode = t), l);
  }
  function Ai(t, l, a) {
    return (
      (l = fl(4, t.children !== null ? t.children : [], t.key, l)),
      (l.lanes = a),
      (l.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      l
    );
  }
  var bs = new WeakMap();
  function Sl(t, l) {
    if (typeof t == "object" && t !== null) {
      var a = bs.get(t);
      return a !== void 0 ? a : ((l = { value: t, source: l, stack: Sc(l) }), bs.set(t, l), l);
    }
    return { value: t, source: l, stack: Sc(l) };
  }
  var ue = [],
    ne = 0,
    Ku = null,
    Ve = 0,
    bl = [],
    pl = 0,
    la = null,
    Rl = 1,
    xl = "";
  function Yl(t, l) {
    ((ue[ne++] = Ve), (ue[ne++] = Ku), (Ku = t), (Ve = l));
  }
  function ps(t, l, a) {
    ((bl[pl++] = Rl), (bl[pl++] = xl), (bl[pl++] = la), (la = t));
    var e = Rl;
    t = xl;
    var u = 32 - nl(e) - 1;
    ((e &= ~(1 << u)), (a += 1));
    var n = 32 - nl(l) + u;
    if (30 < n) {
      var i = u - (u % 5);
      ((n = (e & ((1 << i) - 1)).toString(32)),
        (e >>= i),
        (u -= i),
        (Rl = (1 << (32 - nl(l) + u)) | (a << u) | e),
        (xl = n + t));
    } else ((Rl = (1 << n) | (a << u) | e), (xl = t));
  }
  function Mi(t) {
    t.return !== null && (Yl(t, 1), ps(t, 1, 0));
  }
  function Di(t) {
    for (; t === Ku; ) ((Ku = ue[--ne]), (ue[ne] = null), (Ve = ue[--ne]), (ue[ne] = null));
    for (; t === la; )
      ((la = bl[--pl]),
        (bl[pl] = null),
        (xl = bl[--pl]),
        (bl[pl] = null),
        (Rl = bl[--pl]),
        (bl[pl] = null));
  }
  function _s(t, l) {
    ((bl[pl++] = Rl), (bl[pl++] = xl), (bl[pl++] = la), (Rl = l.id), (xl = l.overflow), (la = t));
  }
  var jt = null,
    yt = null,
    P = !1,
    aa = null,
    _l = !1,
    Oi = Error(s(519));
  function ea(t) {
    var l = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""),
    );
    throw (Ke(Sl(l, t)), Oi);
  }
  function Es(t) {
    var l = t.stateNode,
      a = t.type,
      e = t.memoizedProps;
    switch (((l[Bt] = t), (l[Ft] = e), a)) {
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
        for (a = 0; a < mu.length; a++) $(mu[a], l);
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
          Bc(l, e.value, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name, !0));
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
      X0(l.textContent, a)
        ? (e.popover != null && ($("beforetoggle", l), $("toggle", l)),
          e.onScroll != null && $("scroll", l),
          e.onScrollEnd != null && $("scrollend", l),
          e.onClick != null && (l.onclick = Bl),
          (l = !0))
        : (l = !1),
      l || ea(t, !0));
  }
  function Ts(t) {
    for (jt = t.return; jt; )
      switch (jt.tag) {
        case 5:
        case 31:
        case 13:
          _l = !1;
          return;
        case 27:
        case 3:
          _l = !0;
          return;
        default:
          jt = jt.return;
      }
  }
  function ie(t) {
    if (t !== jt) return !1;
    if (!P) return (Ts(t), (P = !0), !1);
    var l = t.tag,
      a;
    if (
      ((a = l !== 3 && l !== 27) &&
        ((a = l === 5) &&
          ((a = t.type), (a = !(a !== "form" && a !== "button") || wf(t.type, t.memoizedProps))),
        (a = !a)),
      a && yt && ea(t),
      Ts(t),
      l === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      yt = F0(t);
    } else if (l === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      yt = F0(t);
    } else
      l === 27
        ? ((l = yt), ga(t.type) ? ((t = If), (If = null), (yt = t)) : (yt = l))
        : (yt = jt ? Tl(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Na() {
    ((yt = jt = null), (P = !1));
  }
  function Ui() {
    var t = aa;
    return (t !== null && (tl === null ? (tl = t) : tl.push.apply(tl, t), (aa = null)), t);
  }
  function Ke(t) {
    aa === null ? (aa = [t]) : aa.push(t);
  }
  var Ri = r(null),
    Ca = null,
    Gl = null;
  function ua(t, l, a) {
    (R(Ri, l._currentValue), (l._currentValue = a));
  }
  function Xl(t) {
    ((t._currentValue = Ri.current), z(Ri));
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
  function fe(t, l, a, e) {
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
          il(u.pendingProps.value, i.value) || (t !== null ? t.push(f) : (t = [f]));
        }
      } else if (u === at.current) {
        if (((i = u.alternate), i === null)) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(Su) : (t = [Su]));
      }
      u = u.return;
    }
    (t !== null && Ni(l, t, a, e), (l.flags |= 262144));
  }
  function Ju(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!il(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Ha(t) {
    ((Ca = t), (Gl = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function qt(t) {
    return zs(Ca, t);
  }
  function wu(t, l) {
    return (Ca === null && Ha(t), zs(t, l));
  }
  function zs(t, l) {
    var a = l._currentValue;
    if (((l = { context: l, memoizedValue: a, next: null }), Gl === null)) {
      if (t === null) throw Error(s(308));
      ((Gl = l), (t.dependencies = { lanes: 0, firstContext: l }), (t.flags |= 524288));
    } else Gl = Gl.next = l;
    return a;
  }
  var Vh =
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
    Kh = M.unstable_scheduleCallback,
    Jh = M.unstable_NormalPriority,
    Mt = {
      $$typeof: pt,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Ci() {
    return { controller: new Vh(), data: new Map(), refCount: 0 };
  }
  function Je(t) {
    (t.refCount--,
      t.refCount === 0 &&
        Kh(Jh, function () {
          t.controller.abort();
        }));
  }
  var we = null,
    Hi = 0,
    ce = 0,
    se = null;
  function wh(t, l) {
    if (we === null) {
      var a = (we = []);
      ((Hi = 0),
        (ce = Yf()),
        (se = {
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
    if (--Hi === 0 && we !== null) {
      se !== null && (se.status = "fulfilled");
      var t = we;
      ((we = null), (ce = 0), (se = null));
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Wh(t, l) {
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
  var Ms = S.S;
  S.S = function (t, l) {
    ((o0 = el()),
      typeof l == "object" && l !== null && typeof l.then == "function" && wh(t, l),
      Ms !== null && Ms(t, l));
  };
  var Ba = r(null);
  function Bi() {
    var t = Ba.current;
    return t !== null ? t : dt.pooledCache;
  }
  function Wu(t, l) {
    l === null ? R(Ba, Ba.current) : R(Ba, l.pool);
  }
  function Ds() {
    var t = Bi();
    return t === null ? null : { parent: Mt._currentValue, pool: t };
  }
  var oe = Error(s(460)),
    ji = Error(s(474)),
    Fu = Error(s(542)),
    $u = { then: function () {} };
  function Os(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function Us(t, l, a) {
    switch (
      ((a = t[a]), a === void 0 ? t.push(l) : a !== l && (l.then(Bl, Bl), (l = a)), l.status)
    ) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw ((t = l.reason), xs(t), t);
      default:
        if (typeof l.status == "string") l.then(Bl, Bl);
        else {
          if (((t = dt), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
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
            throw ((t = l.reason), xs(t), t);
        }
        throw ((qa = l), oe);
    }
  }
  function ja(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? ((qa = a), oe) : a;
    }
  }
  var qa = null;
  function Rs() {
    if (qa === null) throw Error(s(459));
    var t = qa;
    return ((qa = null), t);
  }
  function xs(t) {
    if (t === oe || t === Fu) throw Error(s(483));
  }
  var re = null,
    We = 0;
  function ku(t) {
    var l = We;
    return ((We += 1), re === null && (re = []), Us(re, t, l));
  }
  function Fe(t, l) {
    ((l = l.props.ref), (t.ref = l !== void 0 ? l : null));
  }
  function Iu(t, l) {
    throw l.$$typeof === tt
      ? Error(s(525))
      : ((t = Object.prototype.toString.call(l)),
        Error(
          s(
            31,
            t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t,
          ),
        ));
  }
  function Ns(t) {
    function l(h, o) {
      if (t) {
        var d = h.deletions;
        d === null ? ((h.deletions = [o]), (h.flags |= 16)) : d.push(o);
      }
    }
    function a(h, o) {
      if (!t) return null;
      for (; o !== null; ) (l(h, o), (o = o.sibling));
      return null;
    }
    function e(h) {
      for (var o = new Map(); h !== null; )
        (h.key !== null ? o.set(h.key, h) : o.set(h.index, h), (h = h.sibling));
      return o;
    }
    function u(h, o) {
      return ((h = ql(h, o)), (h.index = 0), (h.sibling = null), h);
    }
    function n(h, o, d) {
      return (
        (h.index = d),
        t
          ? ((d = h.alternate),
            d !== null
              ? ((d = d.index), d < o ? ((h.flags |= 67108866), o) : d)
              : ((h.flags |= 67108866), o))
          : ((h.flags |= 1048576), o)
      );
    }
    function i(h) {
      return (t && h.alternate === null && (h.flags |= 67108866), h);
    }
    function f(h, o, d, _) {
      return o === null || o.tag !== 6
        ? ((o = zi(d, h.mode, _)), (o.return = h), o)
        : ((o = u(o, d)), (o.return = h), o);
    }
    function c(h, o, d, _) {
      var Y = d.type;
      return Y === Ht
        ? p(h, o, d.props.children, _, d.key)
        : o !== null &&
            (o.elementType === Y ||
              (typeof Y == "object" && Y !== null && Y.$$typeof === Qt && ja(Y) === o.type))
          ? ((o = u(o, d.props)), Fe(o, d), (o.return = h), o)
          : ((o = Vu(d.type, d.key, d.props, null, h.mode, _)), Fe(o, d), (o.return = h), o);
    }
    function v(h, o, d, _) {
      return o === null ||
        o.tag !== 4 ||
        o.stateNode.containerInfo !== d.containerInfo ||
        o.stateNode.implementation !== d.implementation
        ? ((o = Ai(d, h.mode, _)), (o.return = h), o)
        : ((o = u(o, d.children || [])), (o.return = h), o);
    }
    function p(h, o, d, _, Y) {
      return o === null || o.tag !== 7
        ? ((o = xa(d, h.mode, _, Y)), (o.return = h), o)
        : ((o = u(o, d)), (o.return = h), o);
    }
    function T(h, o, d) {
      if ((typeof o == "string" && o !== "") || typeof o == "number" || typeof o == "bigint")
        return ((o = zi("" + o, h.mode, d)), (o.return = h), o);
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case Kt:
            return ((d = Vu(o.type, o.key, o.props, null, h.mode, d)), Fe(d, o), (d.return = h), d);
          case vt:
            return ((o = Ai(o, h.mode, d)), (o.return = h), o);
          case Qt:
            return ((o = ja(o)), T(h, o, d));
        }
        if (ft(o) || Zt(o)) return ((o = xa(o, h.mode, d, null)), (o.return = h), o);
        if (typeof o.then == "function") return T(h, ku(o), d);
        if (o.$$typeof === pt) return T(h, wu(h, o), d);
        Iu(h, o);
      }
      return null;
    }
    function y(h, o, d, _) {
      var Y = o !== null ? o.key : null;
      if ((typeof d == "string" && d !== "") || typeof d == "number" || typeof d == "bigint")
        return Y !== null ? null : f(h, o, "" + d, _);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Kt:
            return d.key === Y ? c(h, o, d, _) : null;
          case vt:
            return d.key === Y ? v(h, o, d, _) : null;
          case Qt:
            return ((d = ja(d)), y(h, o, d, _));
        }
        if (ft(d) || Zt(d)) return Y !== null ? null : p(h, o, d, _, null);
        if (typeof d.then == "function") return y(h, o, ku(d), _);
        if (d.$$typeof === pt) return y(h, o, wu(h, d), _);
        Iu(h, d);
      }
      return null;
    }
    function g(h, o, d, _, Y) {
      if ((typeof _ == "string" && _ !== "") || typeof _ == "number" || typeof _ == "bigint")
        return ((h = h.get(d) || null), f(o, h, "" + _, Y));
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case Kt:
            return ((h = h.get(_.key === null ? d : _.key) || null), c(o, h, _, Y));
          case vt:
            return ((h = h.get(_.key === null ? d : _.key) || null), v(o, h, _, Y));
          case Qt:
            return ((_ = ja(_)), g(h, o, d, _, Y));
        }
        if (ft(_) || Zt(_)) return ((h = h.get(d) || null), p(o, h, _, Y, null));
        if (typeof _.then == "function") return g(h, o, d, ku(_), Y);
        if (_.$$typeof === pt) return g(h, o, d, wu(o, _), Y);
        Iu(o, _);
      }
      return null;
    }
    function H(h, o, d, _) {
      for (var Y = null, et = null, j = o, J = (o = 0), I = null; j !== null && J < d.length; J++) {
        j.index > J ? ((I = j), (j = null)) : (I = j.sibling);
        var ut = y(h, j, d[J], _);
        if (ut === null) {
          j === null && (j = I);
          break;
        }
        (t && j && ut.alternate === null && l(h, j),
          (o = n(ut, o, J)),
          et === null ? (Y = ut) : (et.sibling = ut),
          (et = ut),
          (j = I));
      }
      if (J === d.length) return (a(h, j), P && Yl(h, J), Y);
      if (j === null) {
        for (; J < d.length; J++)
          ((j = T(h, d[J], _)),
            j !== null && ((o = n(j, o, J)), et === null ? (Y = j) : (et.sibling = j), (et = j)));
        return (P && Yl(h, J), Y);
      }
      for (j = e(j); J < d.length; J++)
        ((I = g(j, h, J, d[J], _)),
          I !== null &&
            (t && I.alternate !== null && j.delete(I.key === null ? J : I.key),
            (o = n(I, o, J)),
            et === null ? (Y = I) : (et.sibling = I),
            (et = I)));
      return (
        t &&
          j.forEach(function (Ea) {
            return l(h, Ea);
          }),
        P && Yl(h, J),
        Y
      );
    }
    function X(h, o, d, _) {
      if (d == null) throw Error(s(151));
      for (
        var Y = null, et = null, j = o, J = (o = 0), I = null, ut = d.next();
        j !== null && !ut.done;
        J++, ut = d.next()
      ) {
        j.index > J ? ((I = j), (j = null)) : (I = j.sibling);
        var Ea = y(h, j, ut.value, _);
        if (Ea === null) {
          j === null && (j = I);
          break;
        }
        (t && j && Ea.alternate === null && l(h, j),
          (o = n(Ea, o, J)),
          et === null ? (Y = Ea) : (et.sibling = Ea),
          (et = Ea),
          (j = I));
      }
      if (ut.done) return (a(h, j), P && Yl(h, J), Y);
      if (j === null) {
        for (; !ut.done; J++, ut = d.next())
          ((ut = T(h, ut.value, _)),
            ut !== null &&
              ((o = n(ut, o, J)), et === null ? (Y = ut) : (et.sibling = ut), (et = ut)));
        return (P && Yl(h, J), Y);
      }
      for (j = e(j); !ut.done; J++, ut = d.next())
        ((ut = g(j, h, J, ut.value, _)),
          ut !== null &&
            (t && ut.alternate !== null && j.delete(ut.key === null ? J : ut.key),
            (o = n(ut, o, J)),
            et === null ? (Y = ut) : (et.sibling = ut),
            (et = ut)));
      return (
        t &&
          j.forEach(function (nd) {
            return l(h, nd);
          }),
        P && Yl(h, J),
        Y
      );
    }
    function mt(h, o, d, _) {
      if (
        (typeof d == "object" &&
          d !== null &&
          d.type === Ht &&
          d.key === null &&
          (d = d.props.children),
        typeof d == "object" && d !== null)
      ) {
        switch (d.$$typeof) {
          case Kt:
            t: {
              for (var Y = d.key; o !== null; ) {
                if (o.key === Y) {
                  if (((Y = d.type), Y === Ht)) {
                    if (o.tag === 7) {
                      (a(h, o.sibling), (_ = u(o, d.props.children)), (_.return = h), (h = _));
                      break t;
                    }
                  } else if (
                    o.elementType === Y ||
                    (typeof Y == "object" && Y !== null && Y.$$typeof === Qt && ja(Y) === o.type)
                  ) {
                    (a(h, o.sibling), (_ = u(o, d.props)), Fe(_, d), (_.return = h), (h = _));
                    break t;
                  }
                  a(h, o);
                  break;
                } else l(h, o);
                o = o.sibling;
              }
              d.type === Ht
                ? ((_ = xa(d.props.children, h.mode, _, d.key)), (_.return = h), (h = _))
                : ((_ = Vu(d.type, d.key, d.props, null, h.mode, _)),
                  Fe(_, d),
                  (_.return = h),
                  (h = _));
            }
            return i(h);
          case vt:
            t: {
              for (Y = d.key; o !== null; ) {
                if (o.key === Y)
                  if (
                    o.tag === 4 &&
                    o.stateNode.containerInfo === d.containerInfo &&
                    o.stateNode.implementation === d.implementation
                  ) {
                    (a(h, o.sibling), (_ = u(o, d.children || [])), (_.return = h), (h = _));
                    break t;
                  } else {
                    a(h, o);
                    break;
                  }
                else l(h, o);
                o = o.sibling;
              }
              ((_ = Ai(d, h.mode, _)), (_.return = h), (h = _));
            }
            return i(h);
          case Qt:
            return ((d = ja(d)), mt(h, o, d, _));
        }
        if (ft(d)) return H(h, o, d, _);
        if (Zt(d)) {
          if (((Y = Zt(d)), typeof Y != "function")) throw Error(s(150));
          return ((d = Y.call(d)), X(h, o, d, _));
        }
        if (typeof d.then == "function") return mt(h, o, ku(d), _);
        if (d.$$typeof === pt) return mt(h, o, wu(h, d), _);
        Iu(h, d);
      }
      return (typeof d == "string" && d !== "") || typeof d == "number" || typeof d == "bigint"
        ? ((d = "" + d),
          o !== null && o.tag === 6
            ? (a(h, o.sibling), (_ = u(o, d)), (_.return = h), (h = _))
            : (a(h, o), (_ = zi(d, h.mode, _)), (_.return = h), (h = _)),
          i(h))
        : a(h, o);
    }
    return function (h, o, d, _) {
      try {
        We = 0;
        var Y = mt(h, o, d, _);
        return ((re = null), Y);
      } catch (j) {
        if (j === oe || j === Fu) throw j;
        var et = fl(29, j, null, h.mode);
        return ((et.lanes = _), (et.return = h), et);
      }
    };
  }
  var Ya = Ns(!0),
    Cs = Ns(!1),
    na = !1;
  function qi(t) {
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
    if (((e = e.shared), (it & 2) !== 0)) {
      var u = e.pending;
      return (
        u === null ? (l.next = l) : ((l.next = u.next), (u.next = l)),
        (e.pending = l),
        (l = Zu(t)),
        ys(t, null, a),
        l
      );
    }
    return (Qu(t, e, l, a), Zu(t));
  }
  function $e(t, l, a) {
    if (((l = l.updateQueue), l !== null && ((l = l.shared), (a & 4194048) !== 0))) {
      var e = l.lanes;
      ((e &= t.pendingLanes), (a |= e), (l.lanes = a), zc(t, a));
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
  function ke() {
    if (Xi) {
      var t = se;
      if (t !== null) throw t;
    }
  }
  function Ie(t, l, a, e) {
    Xi = !1;
    var u = t.updateQueue;
    na = !1;
    var n = u.firstBaseUpdate,
      i = u.lastBaseUpdate,
      f = u.shared.pending;
    if (f !== null) {
      u.shared.pending = null;
      var c = f,
        v = c.next;
      ((c.next = null), i === null ? (n = v) : (i.next = v), (i = c));
      var p = t.alternate;
      p !== null &&
        ((p = p.updateQueue),
        (f = p.lastBaseUpdate),
        f !== i && (f === null ? (p.firstBaseUpdate = v) : (f.next = v), (p.lastBaseUpdate = c)));
    }
    if (n !== null) {
      var T = u.baseState;
      ((i = 0), (p = v = c = null), (f = n));
      do {
        var y = f.lane & -536870913,
          g = y !== f.lane;
        if (g ? (k & y) === y : (e & y) === y) {
          (y !== 0 && y === ce && (Xi = !0),
            p !== null &&
              (p = p.next =
                { lane: 0, tag: f.tag, payload: f.payload, callback: null, next: null }));
          t: {
            var H = t,
              X = f;
            y = l;
            var mt = a;
            switch (X.tag) {
              case 1:
                if (((H = X.payload), typeof H == "function")) {
                  T = H.call(mt, T, y);
                  break t;
                }
                T = H;
                break t;
              case 3:
                H.flags = (H.flags & -65537) | 128;
              case 0:
                if (
                  ((H = X.payload), (y = typeof H == "function" ? H.call(mt, T, y) : H), y == null)
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
            p === null ? ((v = p = g), (c = T)) : (p = p.next = g),
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
        (u.firstBaseUpdate = v),
        (u.lastBaseUpdate = p),
        n === null && (u.shared.lanes = 0),
        (ha |= i),
        (t.lanes = i),
        (t.memoizedState = T));
    }
  }
  function Hs(t, l) {
    if (typeof t != "function") throw Error(s(191, t));
    t.call(l);
  }
  function Bs(t, l) {
    var a = t.callbacks;
    if (a !== null) for (t.callbacks = null, t = 0; t < a.length; t++) Hs(a[t], l);
  }
  var he = r(null),
    Pu = r(0);
  function js(t, l) {
    ((t = Fl), R(Pu, t), R(he, l), (Fl = t | l.baseLanes));
  }
  function Li() {
    (R(Pu, Fl), R(he, he.current));
  }
  function Qi() {
    ((Fl = Pu.current), z(he), z(Pu));
  }
  var cl = r(null),
    El = null;
  function ca(t) {
    var l = t.alternate;
    (R(zt, zt.current & 1),
      R(cl, t),
      El === null && (l === null || he.current !== null || l.memoizedState !== null) && (El = t));
  }
  function Zi(t) {
    (R(zt, zt.current), R(cl, t), El === null && (El = t));
  }
  function qs(t) {
    t.tag === 22 ? (R(zt, zt.current), R(cl, t), El === null && (El = t)) : sa();
  }
  function sa() {
    (R(zt, zt.current), R(cl, cl.current));
  }
  function sl(t) {
    (z(cl), El === t && (El = null), z(zt));
  }
  var zt = r(0);
  function tn(t) {
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
    K = null,
    rt = null,
    Dt = null,
    ln = !1,
    me = !1,
    Ga = !1,
    an = 0,
    Pe = 0,
    de = null,
    Fh = 0;
  function _t() {
    throw Error(s(321));
  }
  function Vi(t, l) {
    if (l === null) return !1;
    for (var a = 0; a < l.length && a < t.length; a++) if (!il(t[a], l[a])) return !1;
    return !0;
  }
  function Ki(t, l, a, e, u, n) {
    return (
      (Ll = n),
      (K = l),
      (l.memoizedState = null),
      (l.updateQueue = null),
      (l.lanes = 0),
      (S.H = t === null || t.memoizedState === null ? _o : ff),
      (Ga = !1),
      (n = a(e, u)),
      (Ga = !1),
      me && (n = Gs(l, a, e, u)),
      Ys(t),
      n
    );
  }
  function Ys(t) {
    S.H = au;
    var l = rt !== null && rt.next !== null;
    if (((Ll = 0), (Dt = rt = K = null), (ln = !1), (Pe = 0), (de = null), l)) throw Error(s(300));
    t === null || Ot || ((t = t.dependencies), t !== null && Ju(t) && (Ot = !0));
  }
  function Gs(t, l, a, e) {
    K = t;
    var u = 0;
    do {
      if ((me && (de = null), (Pe = 0), (me = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (Dt = rt = null), t.updateQueue != null)) {
        var n = t.updateQueue;
        ((n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0));
      }
      ((S.H = Eo), (n = l(a, e)));
    } while (me);
    return n;
  }
  function $h() {
    var t = S.H,
      l = t.useState()[0];
    return (
      (l = typeof l.then == "function" ? tu(l) : l),
      (t = t.useState()[0]),
      (rt !== null ? rt.memoizedState : null) !== t && (K.flags |= 1024),
      l
    );
  }
  function Ji() {
    var t = an !== 0;
    return ((an = 0), t);
  }
  function wi(t, l, a) {
    ((l.updateQueue = t.updateQueue), (l.flags &= -2053), (t.lanes &= ~a));
  }
  function Wi(t) {
    if (ln) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        (l !== null && (l.pending = null), (t = t.next));
      }
      ln = !1;
    }
    ((Ll = 0), (Dt = rt = K = null), (me = !1), (Pe = an = 0), (de = null));
  }
  function wt() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Dt === null ? (K.memoizedState = Dt = t) : (Dt = Dt.next = t), Dt);
  }
  function At() {
    if (rt === null) {
      var t = K.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = rt.next;
    var l = Dt === null ? K.memoizedState : Dt.next;
    if (l !== null) ((Dt = l), (rt = t));
    else {
      if (t === null) throw K.alternate === null ? Error(s(467)) : Error(s(310));
      ((rt = t),
        (t = {
          memoizedState: rt.memoizedState,
          baseState: rt.baseState,
          baseQueue: rt.baseQueue,
          queue: rt.queue,
          next: null,
        }),
        Dt === null ? (K.memoizedState = Dt = t) : (Dt = Dt.next = t));
    }
    return Dt;
  }
  function en() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function tu(t) {
    var l = Pe;
    return (
      (Pe += 1),
      de === null && (de = []),
      (t = Us(de, t, l)),
      (l = K),
      (Dt === null ? l.memoizedState : Dt.next) === null &&
        ((l = l.alternate), (S.H = l === null || l.memoizedState === null ? _o : ff)),
      t
    );
  }
  function un(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return tu(t);
      if (t.$$typeof === pt) return qt(t);
    }
    throw Error(s(438, String(t)));
  }
  function Fi(t) {
    var l = null,
      a = K.updateQueue;
    if ((a !== null && (l = a.memoCache), l == null)) {
      var e = K.alternate;
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
      a === null && ((a = en()), (K.updateQueue = a)),
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
  function nn(t) {
    var l = At();
    return $i(l, rt, t);
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
        v = l,
        p = !1;
      do {
        var T = v.lane & -536870913;
        if (T !== v.lane ? (k & T) === T : (Ll & T) === T) {
          var y = v.revertLane;
          if (y === 0)
            (c !== null &&
              (c = c.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: v.action,
                  hasEagerState: v.hasEagerState,
                  eagerState: v.eagerState,
                  next: null,
                }),
              T === ce && (p = !0));
          else if ((Ll & y) === y) {
            ((v = v.next), y === ce && (p = !0));
            continue;
          } else
            ((T = {
              lane: 0,
              revertLane: v.revertLane,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null,
            }),
              c === null ? ((f = c = T), (i = n)) : (c = c.next = T),
              (K.lanes |= y),
              (ha |= y));
          ((T = v.action), Ga && a(n, T), (n = v.hasEagerState ? v.eagerState : a(n, T)));
        } else
          ((y = {
            lane: T,
            revertLane: v.revertLane,
            gesture: v.gesture,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null,
          }),
            c === null ? ((f = c = y), (i = n)) : (c = c.next = y),
            (K.lanes |= T),
            (ha |= T));
        v = v.next;
      } while (v !== null && v !== l);
      if (
        (c === null ? (i = n) : (c.next = f),
        !il(n, t.memoizedState) && ((Ot = !0), p && ((a = se), a !== null)))
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
      (il(n, l.memoizedState) || (Ot = !0),
        (l.memoizedState = n),
        l.baseQueue === null && (l.baseState = n),
        (a.lastRenderedState = n));
    }
    return [n, e];
  }
  function Xs(t, l, a) {
    var e = K,
      u = At(),
      n = P;
    if (n) {
      if (a === void 0) throw Error(s(407));
      a = a();
    } else a = l();
    var i = !il((rt || u).memoizedState, a);
    if (
      (i && ((u.memoizedState = a), (Ot = !0)),
      (u = u.queue),
      tf(Zs.bind(null, e, u, t), [t]),
      u.getSnapshot !== l || i || (Dt !== null && Dt.memoizedState.tag & 1))
    ) {
      if (
        ((e.flags |= 2048),
        ve(9, { destroy: void 0 }, Qs.bind(null, e, u, a, l), null),
        dt === null)
      )
        throw Error(s(349));
      n || (Ll & 127) !== 0 || Ls(e, l, a);
    }
    return a;
  }
  function Ls(t, l, a) {
    ((t.flags |= 16384),
      (t = { getSnapshot: l, value: a }),
      (l = K.updateQueue),
      l === null
        ? ((l = en()), (K.updateQueue = l), (l.stores = [t]))
        : ((a = l.stores), a === null ? (l.stores = [t]) : a.push(t)));
  }
  function Qs(t, l, a, e) {
    ((l.value = a), (l.getSnapshot = e), Vs(l) && Ks(t));
  }
  function Zs(t, l, a) {
    return a(function () {
      Vs(l) && Ks(t);
    });
  }
  function Vs(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var a = l();
      return !il(t, a);
    } catch {
      return !0;
    }
  }
  function Ks(t) {
    var l = Ra(t, 2);
    l !== null && ll(l, t, 2);
  }
  function Ii(t) {
    var l = wt();
    if (typeof t == "function") {
      var a = t;
      if (((t = a()), Ga)) {
        Il(!0);
        try {
          a();
        } finally {
          Il(!1);
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
  function Js(t, l, a, e) {
    return ((t.baseState = a), $i(t, rt, typeof e == "function" ? e : Ql));
  }
  function kh(t, l, a, e, u) {
    if (sn(t)) throw Error(s(485));
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
          ? ((n.next = l.pending = n), ws(l, n))
          : ((n.next = a.next), (l.pending = a.next = n)));
    }
  }
  function ws(t, l) {
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
        (c !== null && c(i, f), Ws(t, l, f));
      } catch (v) {
        Pi(t, l, v);
      } finally {
        (n !== null && i.types !== null && (n.types = i.types), (S.T = n));
      }
    } else
      try {
        ((n = a(u, e)), Ws(t, l, n));
      } catch (v) {
        Pi(t, l, v);
      }
  }
  function Ws(t, l, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (e) {
            Fs(t, l, e);
          },
          function (e) {
            return Pi(t, l, e);
          },
        )
      : Fs(t, l, a);
  }
  function Fs(t, l, a) {
    ((l.status = "fulfilled"),
      (l.value = a),
      $s(l),
      (t.state = a),
      (l = t.pending),
      l !== null &&
        ((a = l.next), a === l ? (t.pending = null) : ((a = a.next), (l.next = a), ws(t, a))));
  }
  function Pi(t, l, a) {
    var e = t.pending;
    if (((t.pending = null), e !== null)) {
      e = e.next;
      do ((l.status = "rejected"), (l.reason = a), $s(l), (l = l.next));
      while (l !== e);
    }
    t.action = null;
  }
  function $s(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function ks(t, l) {
    return l;
  }
  function Is(t, l) {
    if (P) {
      var a = dt.formState;
      if (a !== null) {
        t: {
          var e = K;
          if (P) {
            if (yt) {
              l: {
                for (var u = yt, n = _l; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (((u = Tl(u.nextSibling)), u === null)) {
                    u = null;
                    break l;
                  }
                }
                ((n = u.data), (u = n === "F!" || n === "F" ? u : null));
              }
              if (u) {
                ((yt = Tl(u.nextSibling)), (e = u.data === "F!"));
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
      (a = wt()),
      (a.memoizedState = a.baseState = l),
      (e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ks,
        lastRenderedState: l,
      }),
      (a.queue = e),
      (a = So.bind(null, K, e)),
      (e.dispatch = a),
      (e = Ii(!1)),
      (n = nf.bind(null, K, !1, e.queue)),
      (e = wt()),
      (u = { state: l, dispatch: null, action: t, pending: null }),
      (e.queue = u),
      (a = kh.bind(null, K, u, n, a)),
      (u.dispatch = a),
      (e.memoizedState = t),
      [l, a, !1]
    );
  }
  function Ps(t) {
    var l = At();
    return to(l, rt, t);
  }
  function to(t, l, a) {
    if (
      ((l = $i(t, l, ks)[0]),
      (t = nn(Ql)[0]),
      typeof l == "object" && l !== null && typeof l.then == "function")
    )
      try {
        var e = tu(l);
      } catch (i) {
        throw i === oe ? Fu : i;
      }
    else e = l;
    l = At();
    var u = l.queue,
      n = u.dispatch;
    return (
      a !== l.memoizedState &&
        ((K.flags |= 2048), ve(9, { destroy: void 0 }, Ih.bind(null, u, a), null)),
      [e, n, t]
    );
  }
  function Ih(t, l) {
    t.action = l;
  }
  function lo(t) {
    var l = At(),
      a = rt;
    if (a !== null) return to(l, a, t);
    (At(), (l = l.memoizedState), (a = At()));
    var e = a.queue.dispatch;
    return ((a.memoizedState = t), [l, e, !1]);
  }
  function ve(t, l, a, e) {
    return (
      (t = { tag: t, create: a, deps: e, inst: l, next: null }),
      (l = K.updateQueue),
      l === null && ((l = en()), (K.updateQueue = l)),
      (a = l.lastEffect),
      a === null
        ? (l.lastEffect = t.next = t)
        : ((e = a.next), (a.next = t), (t.next = e), (l.lastEffect = t)),
      t
    );
  }
  function ao() {
    return At().memoizedState;
  }
  function fn(t, l, a, e) {
    var u = wt();
    ((K.flags |= t),
      (u.memoizedState = ve(1 | l, { destroy: void 0 }, a, e === void 0 ? null : e)));
  }
  function cn(t, l, a, e) {
    var u = At();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    rt !== null && e !== null && Vi(e, rt.memoizedState.deps)
      ? (u.memoizedState = ve(l, n, a, e))
      : ((K.flags |= t), (u.memoizedState = ve(1 | l, n, a, e)));
  }
  function eo(t, l) {
    fn(8390656, 8, t, l);
  }
  function tf(t, l) {
    cn(2048, 8, t, l);
  }
  function Ph(t) {
    K.flags |= 4;
    var l = K.updateQueue;
    if (l === null) ((l = en()), (K.updateQueue = l), (l.events = [t]));
    else {
      var a = l.events;
      a === null ? (l.events = [t]) : a.push(t);
    }
  }
  function uo(t) {
    var l = At().memoizedState;
    return (
      Ph({ ref: l, nextImpl: t }),
      function () {
        if ((it & 2) !== 0) throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      }
    );
  }
  function no(t, l) {
    return cn(4, 2, t, l);
  }
  function io(t, l) {
    return cn(4, 4, t, l);
  }
  function fo(t, l) {
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
  function co(t, l, a) {
    ((a = a != null ? a.concat([t]) : null), cn(4, 4, fo.bind(null, l, t), a));
  }
  function lf() {}
  function so(t, l) {
    var a = At();
    l = l === void 0 ? null : l;
    var e = a.memoizedState;
    return l !== null && Vi(l, e[1]) ? e[0] : ((a.memoizedState = [t, l]), t);
  }
  function oo(t, l) {
    var a = At();
    l = l === void 0 ? null : l;
    var e = a.memoizedState;
    if (l !== null && Vi(l, e[1])) return e[0];
    if (((e = t()), Ga)) {
      Il(!0);
      try {
        t();
      } finally {
        Il(!1);
      }
    }
    return ((a.memoizedState = [e, l]), e);
  }
  function af(t, l, a) {
    return a === void 0 || ((Ll & 1073741824) !== 0 && (k & 261930) === 0)
      ? (t.memoizedState = l)
      : ((t.memoizedState = a), (t = h0()), (K.lanes |= t), (ha |= t), a);
  }
  function ro(t, l, a, e) {
    return il(a, l)
      ? a
      : he.current !== null
        ? ((t = af(t, a, e)), il(t, l) || (Ot = !0), t)
        : (Ll & 42) === 0 || ((Ll & 1073741824) !== 0 && (k & 261930) === 0)
          ? ((Ot = !0), (t.memoizedState = a))
          : ((t = h0()), (K.lanes |= t), (ha |= t), l);
  }
  function ho(t, l, a, e, u) {
    var n = O.p;
    O.p = n !== 0 && 8 > n ? n : 8;
    var i = S.T,
      f = {};
    ((S.T = f), nf(t, !1, l, a));
    try {
      var c = u(),
        v = S.S;
      if (
        (v !== null && v(f, c), c !== null && typeof c == "object" && typeof c.then == "function")
      ) {
        var p = Wh(c, e);
        lu(t, l, p, hl(t));
      } else lu(t, l, e, hl(t));
    } catch (T) {
      lu(t, l, { then: function () {}, status: "rejected", reason: T }, hl());
    } finally {
      ((O.p = n), i !== null && f.types !== null && (i.types = f.types), (S.T = i));
    }
  }
  function tm() {}
  function ef(t, l, a, e) {
    if (t.tag !== 5) throw Error(s(476));
    var u = mo(t).queue;
    ho(
      t,
      u,
      l,
      G,
      a === null
        ? tm
        : function () {
            return (vo(t), a(e));
          },
    );
  }
  function mo(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: G,
      baseState: G,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ql,
        lastRenderedState: G,
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
  function vo(t) {
    var l = mo(t);
    (l.next === null && (l = t.alternate.memoizedState), lu(t, l.next.queue, {}, hl()));
  }
  function uf() {
    return qt(Su);
  }
  function yo() {
    return At().memoizedState;
  }
  function go() {
    return At().memoizedState;
  }
  function lm(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var a = hl();
          t = ia(a);
          var e = fa(l, t, a);
          (e !== null && (ll(e, l, a), $e(e, l, a)), (l = { cache: Ci() }), (t.payload = l));
          return;
      }
      l = l.return;
    }
  }
  function am(t, l, a) {
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
      sn(t) ? bo(l, a) : ((a = Ei(t, l, a, e)), a !== null && (ll(a, t, e), po(a, l, e))));
  }
  function So(t, l, a) {
    var e = hl();
    lu(t, l, a, e);
  }
  function lu(t, l, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (sn(t)) bo(l, u);
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
          if (((u.hasEagerState = !0), (u.eagerState = f), il(f, i)))
            return (Qu(t, l, u, 0), dt === null && Lu(), !1);
        } catch {}
      if (((a = Ei(t, l, u, e)), a !== null)) return (ll(a, t, e), po(a, l, e), !0);
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
      sn(t))
    ) {
      if (l) throw Error(s(479));
    } else ((l = Ei(t, a, e, 2)), l !== null && ll(l, t, 2));
  }
  function sn(t) {
    var l = t.alternate;
    return t === K || (l !== null && l === K);
  }
  function bo(t, l) {
    me = ln = !0;
    var a = t.pending;
    (a === null ? (l.next = l) : ((l.next = a.next), (a.next = l)), (t.pending = l));
  }
  function po(t, l, a) {
    if ((a & 4194048) !== 0) {
      var e = l.lanes;
      ((e &= t.pendingLanes), (a |= e), (l.lanes = a), zc(t, a));
    }
  }
  var au = {
    readContext: qt,
    use: un,
    useCallback: _t,
    useContext: _t,
    useEffect: _t,
    useImperativeHandle: _t,
    useLayoutEffect: _t,
    useInsertionEffect: _t,
    useMemo: _t,
    useReducer: _t,
    useRef: _t,
    useState: _t,
    useDebugValue: _t,
    useDeferredValue: _t,
    useTransition: _t,
    useSyncExternalStore: _t,
    useId: _t,
    useHostTransitionStatus: _t,
    useFormState: _t,
    useActionState: _t,
    useOptimistic: _t,
    useMemoCache: _t,
    useCacheRefresh: _t,
  };
  au.useEffectEvent = _t;
  var _o = {
      readContext: qt,
      use: un,
      useCallback: function (t, l) {
        return ((wt().memoizedState = [t, l === void 0 ? null : l]), t);
      },
      useContext: qt,
      useEffect: eo,
      useImperativeHandle: function (t, l, a) {
        ((a = a != null ? a.concat([t]) : null), fn(4194308, 4, fo.bind(null, l, t), a));
      },
      useLayoutEffect: function (t, l) {
        return fn(4194308, 4, t, l);
      },
      useInsertionEffect: function (t, l) {
        fn(4, 2, t, l);
      },
      useMemo: function (t, l) {
        var a = wt();
        l = l === void 0 ? null : l;
        var e = t();
        if (Ga) {
          Il(!0);
          try {
            t();
          } finally {
            Il(!1);
          }
        }
        return ((a.memoizedState = [e, l]), e);
      },
      useReducer: function (t, l, a) {
        var e = wt();
        if (a !== void 0) {
          var u = a(l);
          if (Ga) {
            Il(!0);
            try {
              a(l);
            } finally {
              Il(!1);
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
          (t = t.dispatch = am.bind(null, K, t)),
          [e.memoizedState, t]
        );
      },
      useRef: function (t) {
        var l = wt();
        return ((t = { current: t }), (l.memoizedState = t));
      },
      useState: function (t) {
        t = Ii(t);
        var l = t.queue,
          a = So.bind(null, K, l);
        return ((l.dispatch = a), [t.memoizedState, a]);
      },
      useDebugValue: lf,
      useDeferredValue: function (t, l) {
        var a = wt();
        return af(a, t, l);
      },
      useTransition: function () {
        var t = Ii(!1);
        return ((t = ho.bind(null, K, t.queue, !0, !1)), (wt().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, l, a) {
        var e = K,
          u = wt();
        if (P) {
          if (a === void 0) throw Error(s(407));
          a = a();
        } else {
          if (((a = l()), dt === null)) throw Error(s(349));
          (k & 127) !== 0 || Ls(e, l, a);
        }
        u.memoizedState = a;
        var n = { value: a, getSnapshot: l };
        return (
          (u.queue = n),
          eo(Zs.bind(null, e, n, t), [t]),
          (e.flags |= 2048),
          ve(9, { destroy: void 0 }, Qs.bind(null, e, n, a, l), null),
          a
        );
      },
      useId: function () {
        var t = wt(),
          l = dt.identifierPrefix;
        if (P) {
          var a = xl,
            e = Rl;
          ((a = (e & ~(1 << (32 - nl(e) - 1))).toString(32) + a),
            (l = "_" + l + "R_" + a),
            (a = an++),
            0 < a && (l += "H" + a.toString(32)),
            (l += "_"));
        } else ((a = Fh++), (l = "_" + l + "r_" + a.toString(32) + "_"));
        return (t.memoizedState = l);
      },
      useHostTransitionStatus: uf,
      useFormState: Is,
      useActionState: Is,
      useOptimistic: function (t) {
        var l = wt();
        l.memoizedState = l.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((l.queue = a), (l = nf.bind(null, K, !0, a)), (a.dispatch = l), [t, l]);
      },
      useMemoCache: Fi,
      useCacheRefresh: function () {
        return (wt().memoizedState = lm.bind(null, K));
      },
      useEffectEvent: function (t) {
        var l = wt(),
          a = { impl: t };
        return (
          (l.memoizedState = a),
          function () {
            if ((it & 2) !== 0) throw Error(s(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ff = {
      readContext: qt,
      use: un,
      useCallback: so,
      useContext: qt,
      useEffect: tf,
      useImperativeHandle: co,
      useInsertionEffect: no,
      useLayoutEffect: io,
      useMemo: oo,
      useReducer: nn,
      useRef: ao,
      useState: function () {
        return nn(Ql);
      },
      useDebugValue: lf,
      useDeferredValue: function (t, l) {
        var a = At();
        return ro(a, rt.memoizedState, t, l);
      },
      useTransition: function () {
        var t = nn(Ql)[0],
          l = At().memoizedState;
        return [typeof t == "boolean" ? t : tu(t), l];
      },
      useSyncExternalStore: Xs,
      useId: yo,
      useHostTransitionStatus: uf,
      useFormState: Ps,
      useActionState: Ps,
      useOptimistic: function (t, l) {
        var a = At();
        return Js(a, rt, t, l);
      },
      useMemoCache: Fi,
      useCacheRefresh: go,
    };
  ff.useEffectEvent = uo;
  var Eo = {
    readContext: qt,
    use: un,
    useCallback: so,
    useContext: qt,
    useEffect: tf,
    useImperativeHandle: co,
    useInsertionEffect: no,
    useLayoutEffect: io,
    useMemo: oo,
    useReducer: ki,
    useRef: ao,
    useState: function () {
      return ki(Ql);
    },
    useDebugValue: lf,
    useDeferredValue: function (t, l) {
      var a = At();
      return rt === null ? af(a, t, l) : ro(a, rt.memoizedState, t, l);
    },
    useTransition: function () {
      var t = ki(Ql)[0],
        l = At().memoizedState;
      return [typeof t == "boolean" ? t : tu(t), l];
    },
    useSyncExternalStore: Xs,
    useId: yo,
    useHostTransitionStatus: uf,
    useFormState: lo,
    useActionState: lo,
    useOptimistic: function (t, l) {
      var a = At();
      return rt !== null ? Js(a, rt, t, l) : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: Fi,
    useCacheRefresh: go,
  };
  Eo.useEffectEvent = uo;
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
        l !== null && (ll(l, t, e), $e(l, t, e)));
    },
    enqueueReplaceState: function (t, l, a) {
      t = t._reactInternals;
      var e = hl(),
        u = ia(e);
      ((u.tag = 1),
        (u.payload = l),
        a != null && (u.callback = a),
        (l = fa(t, u, e)),
        l !== null && (ll(l, t, e), $e(l, t, e)));
    },
    enqueueForceUpdate: function (t, l) {
      t = t._reactInternals;
      var a = hl(),
        e = ia(a);
      ((e.tag = 2),
        l != null && (e.callback = l),
        (l = fa(t, e, a)),
        l !== null && (ll(l, t, a), $e(l, t, a)));
    },
  };
  function To(t, l, a, e, u, n, i) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(e, n, i)
        : l.prototype && l.prototype.isPureReactComponent
          ? !Qe(a, e) || !Qe(u, n)
          : !0
    );
  }
  function zo(t, l, a, e) {
    ((t = l.state),
      typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(a, e),
      typeof l.UNSAFE_componentWillReceiveProps == "function" &&
        l.UNSAFE_componentWillReceiveProps(a, e),
      l.state !== t && sf.enqueueReplaceState(l, l.state, null));
  }
  function Xa(t, l) {
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
    Xu(t);
  }
  function Mo(t) {
    console.error(t);
  }
  function Do(t) {
    Xu(t);
  }
  function on(t, l) {
    try {
      var a = t.onUncaughtError;
      a(l.value, { componentStack: l.stack });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function Oo(t, l, a) {
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
        on(t, l);
      }),
      a
    );
  }
  function Uo(t) {
    return ((t = ia(t)), (t.tag = 3), t);
  }
  function Ro(t, l, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      ((t.payload = function () {
        return u(n);
      }),
        (t.callback = function () {
          Oo(l, a, e);
        }));
    }
    var i = a.stateNode;
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (t.callback = function () {
        (Oo(l, a, e),
          typeof u != "function" && (ma === null ? (ma = new Set([this])) : ma.add(this)));
        var f = e.stack;
        this.componentDidCatch(e.value, { componentStack: f !== null ? f : "" });
      });
  }
  function em(t, l, a, e, u) {
    if (((a.flags |= 32768), e !== null && typeof e == "object" && typeof e.then == "function")) {
      if (((l = a.alternate), l !== null && fe(l, a, u, !0), (a = cl.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              El === null ? En() : a.alternate === null && Et === 0 && (Et = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              e === $u
                ? (a.flags |= 16384)
                : ((l = a.updateQueue),
                  l === null ? (a.updateQueue = new Set([e])) : l.add(e),
                  Bf(t, e, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              e === $u
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
      return (Bf(t, e, u), En(), !1);
    }
    if (P)
      return (
        (l = cl.current),
        l !== null
          ? ((l.flags & 65536) === 0 && (l.flags |= 256),
            (l.flags |= 65536),
            (l.lanes = u),
            e !== Oi && ((t = Error(s(422), { cause: e })), Ke(Sl(t, a))))
          : (e !== Oi && ((l = Error(s(423), { cause: e })), Ke(Sl(l, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (e = Sl(e, a)),
            (u = of(t.stateNode, e, u)),
            Gi(t, u),
            Et !== 4 && (Et = 2)),
        !1
      );
    var n = Error(s(520), { cause: e });
    if (((n = Sl(n, a)), ou === null ? (ou = [n]) : ou.push(n), Et !== 4 && (Et = 2), l === null))
      return !0;
    ((e = Sl(e, a)), (a = l));
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
                  (ma === null || !ma.has(n)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = Uo(u)),
              Ro(u, t, a, e),
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
    l.child = t === null ? Cs(l, null, a, e) : Ya(l, t.child, a, e);
  }
  function xo(t, l, a, e, u) {
    a = a.render;
    var n = l.ref;
    if ("ref" in e) {
      var i = {};
      for (var f in e) f !== "ref" && (i[f] = e[f]);
    } else i = e;
    return (
      Ha(l),
      (e = Ki(t, l, a, i, n, u)),
      (f = Ji()),
      t !== null && !Ot
        ? (wi(t, l, u), Zl(t, l, u))
        : (P && f && Mi(l), (l.flags |= 1), Yt(t, l, e, u), l.child)
    );
  }
  function No(t, l, a, e, u) {
    if (t === null) {
      var n = a.type;
      return typeof n == "function" && !Ti(n) && n.defaultProps === void 0 && a.compare === null
        ? ((l.tag = 15), (l.type = n), Co(t, l, n, e, u))
        : ((t = Vu(a.type, null, e, l, l.mode, u)), (t.ref = l.ref), (t.return = l), (l.child = t));
    }
    if (((n = t.child), !bf(t, u))) {
      var i = n.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : Qe), a(i, e) && t.ref === l.ref))
        return Zl(t, l, u);
    }
    return ((l.flags |= 1), (t = ql(n, e)), (t.ref = l.ref), (t.return = l), (l.child = t));
  }
  function Co(t, l, a, e, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (Qe(n, e) && t.ref === l.ref)
        if (((Ot = !1), (l.pendingProps = e = n), bf(t, u))) (t.flags & 131072) !== 0 && (Ot = !0);
        else return ((l.lanes = t.lanes), Zl(t, l, u));
    }
    return hf(t, l, a, e, u);
  }
  function Ho(t, l, a, e) {
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
        return Bo(t, l, n, a, e);
      }
      if ((a & 536870912) !== 0)
        ((l.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Wu(l, n !== null ? n.cachePool : null),
          n !== null ? js(l, n) : Li(),
          qs(l));
      else return ((e = l.lanes = 536870912), Bo(t, l, n !== null ? n.baseLanes | a : a, a, e));
    } else
      n !== null
        ? (Wu(l, n.cachePool), js(l, n), sa(), (l.memoizedState = null))
        : (t !== null && Wu(l, null), Li(), sa());
    return (Yt(t, l, u, a), l.child);
  }
  function eu(t, l) {
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
  function Bo(t, l, a, e, u) {
    var n = Bi();
    return (
      (n = n === null ? null : { parent: Mt._currentValue, pool: n }),
      (l.memoizedState = { baseLanes: a, cachePool: n }),
      t !== null && Wu(l, null),
      Li(),
      qs(l),
      t !== null && fe(t, l, e, !0),
      (l.childLanes = u),
      null
    );
  }
  function rn(t, l) {
    return (
      (l = mn({ mode: l.mode, children: l.children }, t.mode)),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function jo(t, l, a) {
    return (
      Ya(l, t.child, null, a),
      (t = rn(l, l.pendingProps)),
      (t.flags |= 2),
      sl(l),
      (l.memoizedState = null),
      t
    );
  }
  function um(t, l, a) {
    var e = l.pendingProps,
      u = (l.flags & 128) !== 0;
    if (((l.flags &= -129), t === null)) {
      if (P) {
        if (e.mode === "hidden") return ((t = rn(l, e)), (l.lanes = 536870912), eu(null, t));
        if (
          (Zi(l),
          (t = yt)
            ? ((t = W0(t, _l)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((l.memoizedState = {
                  dehydrated: t,
                  treeContext: la !== null ? { id: Rl, overflow: xl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Ss(t)),
                (a.return = l),
                (l.child = a),
                (jt = l),
                (yt = null)))
            : (t = null),
          t === null)
        )
          throw ea(l);
        return ((l.lanes = 536870912), null);
      }
      return rn(l, e);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if ((Zi(l), u))
        if (l.flags & 256) ((l.flags &= -257), (l = jo(t, l, a)));
        else if (l.memoizedState !== null) ((l.child = t.child), (l.flags |= 128), (l = null));
        else throw Error(s(558));
      else if ((Ot || fe(t, l, a, !1), (u = (a & t.childLanes) !== 0), Ot || u)) {
        if (((e = dt), e !== null && ((i = Ac(e, a)), i !== 0 && i !== n.retryLane)))
          throw ((n.retryLane = i), Ra(t, i), ll(e, t, i), rf);
        (En(), (l = jo(t, l, a)));
      } else
        ((t = n.treeContext),
          (yt = Tl(i.nextSibling)),
          (jt = l),
          (P = !0),
          (aa = null),
          (_l = !1),
          t !== null && _s(l, t),
          (l = rn(l, e)),
          (l.flags |= 4096));
      return l;
    }
    return (
      (t = ql(t.child, { mode: e.mode, children: e.children })),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function hn(t, l) {
    var a = l.ref;
    if (a === null) t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(s(284));
      (t === null || t.ref !== a) && (l.flags |= 4194816);
    }
  }
  function hf(t, l, a, e, u) {
    return (
      Ha(l),
      (a = Ki(t, l, a, e, void 0, u)),
      (e = Ji()),
      t !== null && !Ot
        ? (wi(t, l, u), Zl(t, l, u))
        : (P && e && Mi(l), (l.flags |= 1), Yt(t, l, a, u), l.child)
    );
  }
  function qo(t, l, a, e, u, n) {
    return (
      Ha(l),
      (l.updateQueue = null),
      (a = Gs(l, e, a, u)),
      Ys(t),
      (e = Ji()),
      t !== null && !Ot
        ? (wi(t, l, n), Zl(t, l, n))
        : (P && e && Mi(l), (l.flags |= 1), Yt(t, l, a, n), l.child)
    );
  }
  function Yo(t, l, a, e, u) {
    if ((Ha(l), l.stateNode === null)) {
      var n = ee,
        i = a.contextType;
      (typeof i == "object" && i !== null && (n = qt(i)),
        (n = new a(e, n)),
        (l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = sf),
        (l.stateNode = n),
        (n._reactInternals = l),
        (n = l.stateNode),
        (n.props = e),
        (n.state = l.memoizedState),
        (n.refs = {}),
        qi(l),
        (i = a.contextType),
        (n.context = typeof i == "object" && i !== null ? qt(i) : ee),
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
          Ie(l, e, n, u),
          ke(),
          (n.state = l.memoizedState)),
        typeof n.componentDidMount == "function" && (l.flags |= 4194308),
        (e = !0));
    } else if (t === null) {
      n = l.stateNode;
      var f = l.memoizedProps,
        c = Xa(a, f);
      n.props = c;
      var v = n.context,
        p = a.contextType;
      ((i = ee), typeof p == "object" && p !== null && (i = qt(p)));
      var T = a.getDerivedStateFromProps;
      ((p = typeof T == "function" || typeof n.getSnapshotBeforeUpdate == "function"),
        (f = l.pendingProps !== f),
        p ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((f || v !== i) && zo(l, n, e, i)),
        (na = !1));
      var y = l.memoizedState;
      ((n.state = y),
        Ie(l, e, n, u),
        ke(),
        (v = l.memoizedState),
        f || y !== v || na
          ? (typeof T == "function" && (cf(l, a, T, e), (v = l.memoizedState)),
            (c = na || To(l, a, c, e, y, v, i))
              ? (p ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" && n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" && (l.flags |= 4194308))
              : (typeof n.componentDidMount == "function" && (l.flags |= 4194308),
                (l.memoizedProps = e),
                (l.memoizedState = v)),
            (n.props = e),
            (n.state = v),
            (n.context = i),
            (e = c))
          : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), (e = !1)));
    } else {
      ((n = l.stateNode),
        Yi(t, l),
        (i = l.memoizedProps),
        (p = Xa(a, i)),
        (n.props = p),
        (T = l.pendingProps),
        (y = n.context),
        (v = a.contextType),
        (c = ee),
        typeof v == "object" && v !== null && (c = qt(v)),
        (f = a.getDerivedStateFromProps),
        (v = typeof f == "function" || typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i !== T || y !== c) && zo(l, n, e, c)),
        (na = !1),
        (y = l.memoizedState),
        (n.state = y),
        Ie(l, e, n, u),
        ke());
      var g = l.memoizedState;
      i !== T || y !== g || na || (t !== null && t.dependencies !== null && Ju(t.dependencies))
        ? (typeof f == "function" && (cf(l, a, f, e), (g = l.memoizedState)),
          (p =
            na ||
            To(l, a, p, e, y, g, c) ||
            (t !== null && t.dependencies !== null && Ju(t.dependencies)))
            ? (v ||
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
      hn(t, l),
      (e = (l.flags & 128) !== 0),
      n || e
        ? ((n = l.stateNode),
          (a = e && typeof a.getDerivedStateFromError != "function" ? null : n.render()),
          (l.flags |= 1),
          t !== null && e
            ? ((l.child = Ya(l, t.child, null, u)), (l.child = Ya(l, null, a, u)))
            : Yt(t, l, a, u),
          (l.memoizedState = n.state),
          (t = l.child))
        : (t = Zl(t, l, u)),
      t
    );
  }
  function Go(t, l, a, e) {
    return (Na(), (l.flags |= 256), Yt(t, l, a, e), l.child);
  }
  var mf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function df(t) {
    return { baseLanes: t, cachePool: Ds() };
  }
  function vf(t, l, a) {
    return ((t = t !== null ? t.childLanes & ~a : 0), l && (t |= rl), t);
  }
  function Xo(t, l, a) {
    var e = l.pendingProps,
      u = !1,
      n = (l.flags & 128) !== 0,
      i;
    if (
      ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (zt.current & 2) !== 0),
      i && ((u = !0), (l.flags &= -129)),
      (i = (l.flags & 32) !== 0),
      (l.flags &= -33),
      t === null)
    ) {
      if (P) {
        if (
          (u ? ca(l) : sa(),
          (t = yt)
            ? ((t = W0(t, _l)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((l.memoizedState = {
                  dehydrated: t,
                  treeContext: la !== null ? { id: Rl, overflow: xl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Ss(t)),
                (a.return = l),
                (l.child = a),
                (jt = l),
                (yt = null)))
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
            (f = mn({ mode: "hidden", children: f }, u)),
            (e = xa(e, u, a, null)),
            (f.return = l),
            (e.return = l),
            (f.sibling = e),
            (l.child = f),
            (e = l.child),
            (e.memoizedState = df(a)),
            (e.childLanes = vf(t, i, a)),
            (l.memoizedState = mf),
            eu(null, e))
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
              (e = mn({ mode: "visible", children: e.children }, u)),
              (f = xa(f, u, a, null)),
              (f.flags |= 2),
              (e.return = l),
              (f.return = l),
              (e.sibling = f),
              (l.child = e),
              Ya(l, t.child, null, a),
              (e = l.child),
              (e.memoizedState = df(a)),
              (e.childLanes = vf(t, i, a)),
              (l.memoizedState = mf),
              (l = eu(null, e)));
      else if ((ca(l), kf(f))) {
        if (((i = f.nextSibling && f.nextSibling.dataset), i)) var v = i.dgst;
        ((i = v),
          (e = Error(s(419))),
          (e.stack = ""),
          (e.digest = i),
          Ke({ value: e, source: null, stack: null }),
          (l = gf(t, l, a)));
      } else if ((Ot || fe(t, l, a, !1), (i = (a & t.childLanes) !== 0), Ot || i)) {
        if (((i = dt), i !== null && ((e = Ac(i, a)), e !== 0 && e !== c.retryLane)))
          throw ((c.retryLane = e), Ra(t, e), ll(i, t, e), rf);
        ($f(f) || En(), (l = gf(t, l, a)));
      } else
        $f(f)
          ? ((l.flags |= 192), (l.child = t.child), (l = null))
          : ((t = c.treeContext),
            (yt = Tl(f.nextSibling)),
            (jt = l),
            (P = !0),
            (aa = null),
            (_l = !1),
            t !== null && _s(l, t),
            (l = yf(l, e.children)),
            (l.flags |= 4096));
      return l;
    }
    return u
      ? (sa(),
        (f = e.fallback),
        (u = l.mode),
        (c = t.child),
        (v = c.sibling),
        (e = ql(c, { mode: "hidden", children: e.children })),
        (e.subtreeFlags = c.subtreeFlags & 65011712),
        v !== null ? (f = ql(v, f)) : ((f = xa(f, u, a, null)), (f.flags |= 2)),
        (f.return = l),
        (e.return = l),
        (e.sibling = f),
        (l.child = e),
        eu(null, e),
        (e = l.child),
        (f = t.child.memoizedState),
        f === null
          ? (f = df(a))
          : ((u = f.cachePool),
            u !== null
              ? ((c = Mt._currentValue), (u = u.parent !== c ? { parent: c, pool: c } : u))
              : (u = Ds()),
            (f = { baseLanes: f.baseLanes | a, cachePool: u })),
        (e.memoizedState = f),
        (e.childLanes = vf(t, i, a)),
        (l.memoizedState = mf),
        eu(t.child, e))
      : (ca(l),
        (a = t.child),
        (t = a.sibling),
        (a = ql(a, { mode: "visible", children: e.children })),
        (a.return = l),
        (a.sibling = null),
        t !== null &&
          ((i = l.deletions), i === null ? ((l.deletions = [t]), (l.flags |= 16)) : i.push(t)),
        (l.child = a),
        (l.memoizedState = null),
        a);
  }
  function yf(t, l) {
    return ((l = mn({ mode: "visible", children: l }, t.mode)), (l.return = t), (t.child = l));
  }
  function mn(t, l) {
    return ((t = fl(22, t, null, l)), (t.lanes = 0), t);
  }
  function gf(t, l, a) {
    return (
      Ya(l, t.child, null, a),
      (t = yf(l, l.pendingProps.children)),
      (t.flags |= 2),
      (l.memoizedState = null),
      t
    );
  }
  function Lo(t, l, a) {
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
  function Qo(t, l, a) {
    var e = l.pendingProps,
      u = e.revealOrder,
      n = e.tail;
    e = e.children;
    var i = zt.current,
      f = (i & 2) !== 0;
    if (
      (f ? ((i = (i & 1) | 2), (l.flags |= 128)) : (i &= 1),
      R(zt, i),
      Yt(t, l, e, a),
      (e = P ? Ve : 0),
      !f && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Lo(t, a, l);
        else if (t.tag === 19) Lo(t, a, l);
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
          ((t = a.alternate), t !== null && tn(t) === null && (u = a), (a = a.sibling));
        ((a = u),
          a === null ? ((u = l.child), (l.child = null)) : ((u = a.sibling), (a.sibling = null)),
          Sf(l, !1, u, a, n, e));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = l.child, l.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && tn(t) === null)) {
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
      (t !== null && (l.dependencies = t.dependencies), (ha |= l.lanes), (a & l.childLanes) === 0)
    )
      if (t !== null) {
        if ((fe(t, l, a, !1), (a & l.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && l.child !== t.child) throw Error(s(153));
    if (l.child !== null) {
      for (t = l.child, a = ql(t, t.pendingProps), l.child = a, a.return = l; t.sibling !== null; )
        ((t = t.sibling), (a = a.sibling = ql(t, t.pendingProps)), (a.return = l));
      a.sibling = null;
    }
    return l.child;
  }
  function bf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Ju(t)));
  }
  function nm(t, l, a) {
    switch (l.tag) {
      case 3:
        (Jt(l, l.stateNode.containerInfo), ua(l, Mt, t.memoizedState.cache), Na());
        break;
      case 27:
      case 5:
        Ue(l);
        break;
      case 4:
        Jt(l, l.stateNode.containerInfo);
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
              ? Xo(t, l, a)
              : (ca(l), (t = Zl(t, l, a)), t !== null ? t.sibling : null);
        ca(l);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((e = (a & l.childLanes) !== 0),
          e || (fe(t, l, a, !1), (e = (a & l.childLanes) !== 0)),
          u)
        ) {
          if (e) return Qo(t, l, a);
          l.flags |= 128;
        }
        if (
          ((u = l.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          R(zt, zt.current),
          e)
        )
          break;
        return null;
      case 22:
        return ((l.lanes = 0), Ho(t, l, a, l.pendingProps));
      case 24:
        ua(l, Mt, t.memoizedState.cache);
    }
    return Zl(t, l, a);
  }
  function Zo(t, l, a) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps) Ot = !0;
      else {
        if (!bf(t, a) && (l.flags & 128) === 0) return ((Ot = !1), nm(t, l, a));
        Ot = (t.flags & 131072) !== 0;
      }
    else ((Ot = !1), P && (l.flags & 1048576) !== 0 && ps(l, Ve, l.index));
    switch (((l.lanes = 0), l.tag)) {
      case 16:
        t: {
          var e = l.pendingProps;
          if (((t = ja(l.elementType)), (l.type = t), typeof t == "function"))
            Ti(t)
              ? ((e = Xa(t, e)), (l.tag = 1), (l = Yo(null, l, t, e, a)))
              : ((l.tag = 0), (l = hf(null, l, t, e, a)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === Wt) {
                ((l.tag = 11), (l = xo(null, l, t, e, a)));
                break t;
              } else if (u === W) {
                ((l.tag = 14), (l = No(null, l, t, e, a)));
                break t;
              }
            }
            throw ((l = lt(t) || t), Error(s(306, l, "")));
          }
        }
        return l;
      case 0:
        return hf(t, l, l.type, l.pendingProps, a);
      case 1:
        return ((e = l.type), (u = Xa(e, l.pendingProps)), Yo(t, l, e, u, a));
      case 3:
        t: {
          if ((Jt(l, l.stateNode.containerInfo), t === null)) throw Error(s(387));
          e = l.pendingProps;
          var n = l.memoizedState;
          ((u = n.element), Yi(t, l), Ie(l, e, null, a));
          var i = l.memoizedState;
          if (
            ((e = i.cache),
            ua(l, Mt, e),
            e !== n.cache && Ni(l, [Mt], a, !0),
            ke(),
            (e = i.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: e, isDehydrated: !1, cache: i.cache }),
              (l.updateQueue.baseState = n),
              (l.memoizedState = n),
              l.flags & 256)
            ) {
              l = Go(t, l, e, a);
              break t;
            } else if (e !== u) {
              ((u = Sl(Error(s(424)), l)), Ke(u), (l = Go(t, l, e, a)));
              break t;
            } else
              for (
                t = l.stateNode.containerInfo,
                  t.nodeType === 9
                    ? (t = t.body)
                    : (t = t.nodeName === "HTML" ? t.ownerDocument.body : t),
                  yt = Tl(t.firstChild),
                  jt = l,
                  P = !0,
                  aa = null,
                  _l = !0,
                  a = Cs(l, null, e, a),
                  l.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
          else {
            if ((Na(), e === u)) {
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
          hn(t, l),
          t === null
            ? (a = tr(l.type, null, l.pendingProps, null))
              ? (l.memoizedState = a)
              : P ||
                ((a = l.type),
                (t = l.pendingProps),
                (e = Un(w.current).createElement(a)),
                (e[Bt] = l),
                (e[Ft] = t),
                Gt(e, a, t),
                Nt(e),
                (l.stateNode = e))
            : (l.memoizedState = tr(l.type, t.memoizedProps, l.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          Ue(l),
          t === null &&
            P &&
            ((e = l.stateNode = k0(l.type, l.pendingProps, w.current)),
            (jt = l),
            (_l = !0),
            (u = yt),
            ga(l.type) ? ((If = u), (yt = Tl(e.firstChild))) : (yt = u)),
          Yt(t, l, l.pendingProps.children, a),
          hn(t, l),
          t === null && (l.flags |= 4194304),
          l.child
        );
      case 5:
        return (
          t === null &&
            P &&
            ((u = e = yt) &&
              ((e = Bm(e, l.type, l.pendingProps, _l)),
              e !== null
                ? ((l.stateNode = e), (jt = l), (yt = Tl(e.firstChild)), (_l = !1), (u = !0))
                : (u = !1)),
            u || ea(l)),
          Ue(l),
          (u = l.type),
          (n = l.pendingProps),
          (i = t !== null ? t.memoizedProps : null),
          (e = n.children),
          wf(u, n) ? (e = null) : i !== null && wf(u, i) && (l.flags |= 32),
          l.memoizedState !== null && ((u = Ki(t, l, $h, null, null, a)), (Su._currentValue = u)),
          hn(t, l),
          Yt(t, l, e, a),
          l.child
        );
      case 6:
        return (
          t === null &&
            P &&
            ((t = a = yt) &&
              ((a = jm(a, l.pendingProps, _l)),
              a !== null ? ((l.stateNode = a), (jt = l), (yt = null), (t = !0)) : (t = !1)),
            t || ea(l)),
          null
        );
      case 13:
        return Xo(t, l, a);
      case 4:
        return (
          Jt(l, l.stateNode.containerInfo),
          (e = l.pendingProps),
          t === null ? (l.child = Ya(l, null, e, a)) : Yt(t, l, e, a),
          l.child
        );
      case 11:
        return xo(t, l, l.type, l.pendingProps, a);
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
          Ha(l),
          (u = qt(u)),
          (e = e(u)),
          (l.flags |= 1),
          Yt(t, l, e, a),
          l.child
        );
      case 14:
        return No(t, l, l.type, l.pendingProps, a);
      case 15:
        return Co(t, l, l.type, l.pendingProps, a);
      case 19:
        return Qo(t, l, a);
      case 31:
        return um(t, l, a);
      case 22:
        return Ho(t, l, a, l.pendingProps);
      case 24:
        return (
          Ha(l),
          (e = qt(Mt)),
          t === null
            ? ((u = Bi()),
              u === null &&
                ((u = dt),
                (n = Ci()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= a),
                (u = n)),
              (l.memoizedState = { parent: e, cache: u }),
              qi(l),
              ua(l, Mt, u))
            : ((t.lanes & a) !== 0 && (Yi(t, l), Ie(l, null, null, a), ke()),
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
        else if (y0()) t.flags |= 8192;
        else throw ((qa = $u), ji);
    } else t.flags &= -16777217;
  }
  function Vo(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !nr(l)))
      if (y0()) t.flags |= 8192;
      else throw ((qa = $u), ji);
  }
  function dn(t, l) {
    (l !== null && (t.flags |= 4),
      t.flags & 16384 && ((l = t.tag !== 22 ? Ec() : 536870912), (t.lanes |= l), (be |= l)));
  }
  function uu(t, l) {
    if (!P)
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
  function gt(t) {
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
  function im(t, l, a) {
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
        return (gt(l), null);
      case 1:
        return (gt(l), null);
      case 3:
        return (
          (a = l.stateNode),
          (e = null),
          t !== null && (e = t.memoizedState.cache),
          l.memoizedState.cache !== e && (l.flags |= 2048),
          Xl(Mt),
          Tt(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (ie(l)
              ? Vl(l)
              : t === null ||
                (t.memoizedState.isDehydrated && (l.flags & 256) === 0) ||
                ((l.flags |= 1024), Ui())),
          gt(l),
          null
        );
      case 26:
        var u = l.type,
          n = l.memoizedState;
        return (
          t === null
            ? (Vl(l), n !== null ? (gt(l), Vo(l, n)) : (gt(l), pf(l, u, null, e, a)))
            : n
              ? n !== t.memoizedState
                ? (Vl(l), gt(l), Vo(l, n))
                : (gt(l), (l.flags &= -16777217))
              : ((t = t.memoizedProps), t !== e && Vl(l), gt(l), pf(l, u, t, e, a)),
          null
        );
      case 27:
        if ((zu(l), (a = w.current), (u = l.type), t !== null && l.stateNode != null))
          t.memoizedProps !== e && Vl(l);
        else {
          if (!e) {
            if (l.stateNode === null) throw Error(s(166));
            return (gt(l), null);
          }
          ((t = C.current), ie(l) ? Es(l) : ((t = k0(u, e, a)), (l.stateNode = t), Vl(l)));
        }
        return (gt(l), null);
      case 5:
        if ((zu(l), (u = l.type), t !== null && l.stateNode != null))
          t.memoizedProps !== e && Vl(l);
        else {
          if (!e) {
            if (l.stateNode === null) throw Error(s(166));
            return (gt(l), null);
          }
          if (((n = C.current), ie(l))) Es(l);
          else {
            var i = Un(w.current);
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
            ((n[Bt] = l), (n[Ft] = e));
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
        return (gt(l), pf(l, l.type, t === null ? null : t.memoizedProps, l.pendingProps, a), null);
      case 6:
        if (t && l.stateNode != null) t.memoizedProps !== e && Vl(l);
        else {
          if (typeof e != "string" && l.stateNode === null) throw Error(s(166));
          if (((t = w.current), ie(l))) {
            if (((t = l.stateNode), (a = l.memoizedProps), (e = null), (u = jt), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            ((t[Bt] = l),
              (t = !!(
                t.nodeValue === a ||
                (e !== null && e.suppressHydrationWarning === !0) ||
                X0(t.nodeValue, a)
              )),
              t || ea(l, !0));
          } else ((t = Un(t).createTextNode(e)), (t[Bt] = l), (l.stateNode = t));
        }
        return (gt(l), null);
      case 31:
        if (((a = l.memoizedState), t === null || t.memoizedState !== null)) {
          if (((e = ie(l)), a !== null)) {
            if (t === null) {
              if (!e) throw Error(s(318));
              if (((t = l.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(s(557));
              t[Bt] = l;
            } else (Na(), (l.flags & 128) === 0 && (l.memoizedState = null), (l.flags |= 4));
            (gt(l), (t = !1));
          } else
            ((a = Ui()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a),
              (t = !0));
          if (!t) return l.flags & 256 ? (sl(l), l) : (sl(l), null);
          if ((l.flags & 128) !== 0) throw Error(s(558));
        }
        return (gt(l), null);
      case 13:
        if (
          ((e = l.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = ie(l)), e !== null && e.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (((u = l.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                throw Error(s(317));
              u[Bt] = l;
            } else (Na(), (l.flags & 128) === 0 && (l.memoizedState = null), (l.flags |= 4));
            (gt(l), (u = !1));
          } else
            ((u = Ui()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return l.flags & 256 ? (sl(l), l) : (sl(l), null);
        }
        return (
          sl(l),
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
              dn(l, l.updateQueue),
              gt(l),
              null)
        );
      case 4:
        return (Tt(), t === null && Qf(l.stateNode.containerInfo), gt(l), null);
      case 10:
        return (Xl(l.type), gt(l), null);
      case 19:
        if ((z(zt), (e = l.memoizedState), e === null)) return (gt(l), null);
        if (((u = (l.flags & 128) !== 0), (n = e.rendering), n === null))
          if (u) uu(e, !1);
          else {
            if (Et !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = l.child; t !== null; ) {
                if (((n = tn(t)), n !== null)) {
                  for (
                    l.flags |= 128,
                      uu(e, !1),
                      t = n.updateQueue,
                      l.updateQueue = t,
                      dn(l, t),
                      l.subtreeFlags = 0,
                      t = a,
                      a = l.child;
                    a !== null;
                  )
                    (gs(a, t), (a = a.sibling));
                  return (R(zt, (zt.current & 1) | 2), P && Yl(l, e.treeForkCount), l.child);
                }
                t = t.sibling;
              }
            e.tail !== null &&
              el() > bn &&
              ((l.flags |= 128), (u = !0), uu(e, !1), (l.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = tn(n)), t !== null)) {
              if (
                ((l.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (l.updateQueue = t),
                dn(l, t),
                uu(e, !0),
                e.tail === null && e.tailMode === "hidden" && !n.alternate && !P)
              )
                return (gt(l), null);
            } else
              2 * el() - e.renderingStartTime > bn &&
                a !== 536870912 &&
                ((l.flags |= 128), (u = !0), uu(e, !1), (l.lanes = 4194304));
          e.isBackwards
            ? ((n.sibling = l.child), (l.child = n))
            : ((t = e.last), t !== null ? (t.sibling = n) : (l.child = n), (e.last = n));
        }
        return e.tail !== null
          ? ((t = e.tail),
            (e.rendering = t),
            (e.tail = t.sibling),
            (e.renderingStartTime = el()),
            (t.sibling = null),
            (a = zt.current),
            R(zt, u ? (a & 1) | 2 : a & 1),
            P && Yl(l, e.treeForkCount),
            t)
          : (gt(l), null);
      case 22:
      case 23:
        return (
          sl(l),
          Qi(),
          (e = l.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== e && (l.flags |= 8192)
            : e && (l.flags |= 8192),
          e
            ? (a & 536870912) !== 0 &&
              (l.flags & 128) === 0 &&
              (gt(l), l.subtreeFlags & 6 && (l.flags |= 8192))
            : gt(l),
          (a = l.updateQueue),
          a !== null && dn(l, a.retryQueue),
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
          t !== null && z(Ba),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          l.memoizedState.cache !== a && (l.flags |= 2048),
          Xl(Mt),
          gt(l),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, l.tag));
  }
  function fm(t, l) {
    switch ((Di(l), l.tag)) {
      case 1:
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 3:
        return (
          Xl(Mt),
          Tt(),
          (t = l.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((l.flags = (t & -65537) | 128), l) : null
        );
      case 26:
      case 27:
      case 5:
        return (zu(l), null);
      case 31:
        if (l.memoizedState !== null) {
          if ((sl(l), l.alternate === null)) throw Error(s(340));
          Na();
        }
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 13:
        if ((sl(l), (t = l.memoizedState), t !== null && t.dehydrated !== null)) {
          if (l.alternate === null) throw Error(s(340));
          Na();
        }
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 19:
        return (z(zt), null);
      case 4:
        return (Tt(), null);
      case 10:
        return (Xl(l.type), null);
      case 22:
      case 23:
        return (
          sl(l),
          Qi(),
          t !== null && z(Ba),
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
  function Ko(t, l) {
    switch ((Di(l), l.tag)) {
      case 3:
        (Xl(Mt), Tt());
        break;
      case 26:
      case 27:
      case 5:
        zu(l);
        break;
      case 4:
        Tt();
        break;
      case 31:
        l.memoizedState !== null && sl(l);
        break;
      case 13:
        sl(l);
        break;
      case 19:
        z(zt);
        break;
      case 10:
        Xl(l.type);
        break;
      case 22:
      case 23:
        (sl(l), Qi(), t !== null && z(Ba));
        break;
      case 24:
        Xl(Mt);
    }
  }
  function nu(t, l) {
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
      ot(l, l.return, f);
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
                v = f;
              try {
                v();
              } catch (p) {
                ot(u, c, p);
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (p) {
      ot(l, l.return, p);
    }
  }
  function Jo(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var a = t.stateNode;
      try {
        Bs(l, a);
      } catch (e) {
        ot(t, t.return, e);
      }
    }
  }
  function wo(t, l, a) {
    ((a.props = Xa(t.type, t.memoizedProps)), (a.state = t.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (e) {
      ot(t, l, e);
    }
  }
  function iu(t, l) {
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
      ot(t, l, u);
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
          ot(t, l, u);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          ot(t, l, u);
        }
      else a.current = null;
  }
  function Wo(t) {
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
      ot(t, t.return, u);
    }
  }
  function _f(t, l, a) {
    try {
      var e = t.stateNode;
      (Um(e, t.type, a, l), (e[Ft] = l));
    } catch (u) {
      ot(t, t.return, u);
    }
  }
  function Fo(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && ga(t.type)) || t.tag === 4
    );
  }
  function Ef(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Fo(t.return)) return null;
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
  function vn(t, l, a) {
    var e = t.tag;
    if (e === 5 || e === 6) ((t = t.stateNode), l ? a.insertBefore(t, l) : a.appendChild(t));
    else if (e !== 4 && (e === 27 && ga(t.type) && (a = t.stateNode), (t = t.child), t !== null))
      for (vn(t, l, a), t = t.sibling; t !== null; ) (vn(t, l, a), (t = t.sibling));
  }
  function $o(t) {
    var l = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var e = t.type, u = l.attributes; u.length; ) l.removeAttributeNode(u[0]);
      (Gt(l, e, a), (l[Bt] = t), (l[Ft] = a));
    } catch (n) {
      ot(t, t.return, n);
    }
  }
  var Kl = !1,
    Ut = !1,
    zf = !1,
    ko = typeof WeakSet == "function" ? WeakSet : Set,
    Ct = null;
  function cm(t, l) {
    if (((t = t.containerInfo), (Kf = jn), (t = cs(t)), yi(t))) {
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
              v = 0,
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
                  (y === a && ++v === u && (f = i),
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
    for (Jf = { focusedElem: t, selectionRange: a }, jn = !1, Ct = l; Ct !== null; )
      if (((l = Ct), (t = l.child), (l.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = l), (Ct = t));
      else
        for (; Ct !== null; ) {
          switch (((l = Ct), (n = l.alternate), (t = l.flags), l.tag)) {
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
                  var H = Xa(a.type, u);
                  ((t = e.getSnapshotBeforeUpdate(H, n)),
                    (e.__reactInternalSnapshotBeforeUpdate = t));
                } catch (X) {
                  ot(a, a.return, X);
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
            ((t.return = l.return), (Ct = t));
            break;
          }
          Ct = l.return;
        }
  }
  function Io(t, l, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (wl(t, a), e & 4 && nu(5, a));
        break;
      case 1:
        if ((wl(t, a), e & 4))
          if (((t = a.stateNode), l === null))
            try {
              t.componentDidMount();
            } catch (i) {
              ot(a, a.return, i);
            }
          else {
            var u = Xa(a.type, l.memoizedProps);
            l = l.memoizedState;
            try {
              t.componentDidUpdate(u, l, t.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              ot(a, a.return, i);
            }
          }
        (e & 64 && Jo(a), e & 512 && iu(a, a.return));
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
            Bs(t, l);
          } catch (i) {
            ot(a, a.return, i);
          }
        }
        break;
      case 27:
        l === null && e & 4 && $o(a);
      case 26:
      case 5:
        (wl(t, a), l === null && e & 4 && Wo(a), e & 512 && iu(a, a.return));
        break;
      case 12:
        wl(t, a);
        break;
      case 31:
        (wl(t, a), e & 4 && l0(t, a));
        break;
      case 13:
        (wl(t, a),
          e & 4 && a0(t, a),
          e & 64 &&
            ((t = a.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((a = gm.bind(null, a)), qm(t, a)))));
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
      t.tag === 5 && ((l = t.stateNode), l !== null && Pn(l)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var bt = null,
    kt = !1;
  function Jl(t, l, a) {
    for (a = a.child; a !== null; ) (t0(t, l, a), (a = a.sibling));
  }
  function t0(t, l, a) {
    if (ul && typeof ul.onCommitFiberUnmount == "function")
      try {
        ul.onCommitFiberUnmount(Re, a);
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
        var e = bt,
          u = kt;
        (ga(a.type) && ((bt = a.stateNode), (kt = !1)),
          Jl(t, l, a),
          vu(a.stateNode),
          (bt = e),
          (kt = u));
        break;
      case 5:
        Ut || Nl(a, l);
      case 6:
        if (((e = bt), (u = kt), (bt = null), Jl(t, l, a), (bt = e), (kt = u), bt !== null))
          if (kt)
            try {
              (bt.nodeType === 9
                ? bt.body
                : bt.nodeName === "HTML"
                  ? bt.ownerDocument.body
                  : bt
              ).removeChild(a.stateNode);
            } catch (n) {
              ot(a, l, n);
            }
          else
            try {
              bt.removeChild(a.stateNode);
            } catch (n) {
              ot(a, l, n);
            }
        break;
      case 18:
        bt !== null &&
          (kt
            ? ((t = bt),
              J0(
                t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
                a.stateNode,
              ),
              De(t))
            : J0(bt, a.stateNode));
        break;
      case 4:
        ((e = bt),
          (u = kt),
          (bt = a.stateNode.containerInfo),
          (kt = !0),
          Jl(t, l, a),
          (bt = e),
          (kt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (oa(2, a, l), Ut || oa(4, a, l), Jl(t, l, a));
        break;
      case 1:
        (Ut ||
          (Nl(a, l), (e = a.stateNode), typeof e.componentWillUnmount == "function" && wo(a, l, e)),
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
  function l0(t, l) {
    if (
      l.memoizedState === null &&
      ((t = l.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        De(t);
      } catch (a) {
        ot(l, l.return, a);
      }
    }
  }
  function a0(t, l) {
    if (
      l.memoizedState === null &&
      ((t = l.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        De(t);
      } catch (a) {
        ot(l, l.return, a);
      }
  }
  function sm(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return (l === null && (l = t.stateNode = new ko()), l);
      case 22:
        return (
          (t = t.stateNode), (l = t._retryCache), l === null && (l = t._retryCache = new ko()), l
        );
      default:
        throw Error(s(435, t.tag));
    }
  }
  function yn(t, l) {
    var a = sm(t);
    l.forEach(function (e) {
      if (!a.has(e)) {
        a.add(e);
        var u = Sm.bind(null, t, e);
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
                ((bt = f.stateNode), (kt = !1));
                break t;
              }
              break;
            case 5:
              ((bt = f.stateNode), (kt = !1));
              break t;
            case 3:
            case 4:
              ((bt = f.stateNode.containerInfo), (kt = !0));
              break t;
          }
          f = f.return;
        }
        if (bt === null) throw Error(s(160));
        (t0(n, i, u),
          (bt = null),
          (kt = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null));
      }
    if (l.subtreeFlags & 13886) for (l = l.child; l !== null; ) (e0(l, t), (l = l.sibling));
  }
  var Ml = null;
  function e0(t, l) {
    var a = t.alternate,
      e = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (It(l, t), Pt(t), e & 4 && (oa(3, t, t.return), nu(3, t), oa(5, t, t.return)));
        break;
      case 1:
        (It(l, t),
          Pt(t),
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
        var u = Ml;
        if ((It(l, t), Pt(t), e & 512 && (Ut || a === null || Nl(a, a.return)), e & 4)) {
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
                          n[Ce] ||
                          n[Bt] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(e)),
                          u.head.insertBefore(n, u.querySelector("head > title"))),
                        Gt(n, e, a),
                        (n[Bt] = t),
                        Nt(n),
                        (e = n));
                      break t;
                    case "link":
                      var i = er("link", "href", u).get(e + (a.href || ""));
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
                      if ((i = er("meta", "content", u).get(e + (a.content || "")))) {
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
                  ((n[Bt] = t), Nt(n), (e = n));
                }
                t.stateNode = e;
              } else ur(u, t.type, t.stateNode);
            else t.stateNode = ar(u, e, t.memoizedProps);
          else
            n !== e
              ? (n === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : n.count--,
                e === null ? ur(u, t.type, t.stateNode) : ar(u, e, t.memoizedProps))
              : e === null && t.stateNode !== null && _f(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (It(l, t),
          Pt(t),
          e & 512 && (Ut || a === null || Nl(a, a.return)),
          a !== null && e & 4 && _f(t, t.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((It(l, t), Pt(t), e & 512 && (Ut || a === null || Nl(a, a.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            $a(u, "");
          } catch (H) {
            ot(t, t.return, H);
          }
        }
        (e & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), _f(t, u, a !== null ? a.memoizedProps : u)),
          e & 1024 && (zf = !0));
        break;
      case 6:
        if ((It(l, t), Pt(t), e & 4)) {
          if (t.stateNode === null) throw Error(s(162));
          ((e = t.memoizedProps), (a = t.stateNode));
          try {
            a.nodeValue = e;
          } catch (H) {
            ot(t, t.return, H);
          }
        }
        break;
      case 3:
        if (
          ((Nn = null),
          (u = Ml),
          (Ml = Rn(l.containerInfo)),
          It(l, t),
          (Ml = u),
          Pt(t),
          e & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            De(l.containerInfo);
          } catch (H) {
            ot(t, t.return, H);
          }
        zf && ((zf = !1), u0(t));
        break;
      case 4:
        ((e = Ml), (Ml = Rn(t.stateNode.containerInfo)), It(l, t), Pt(t), (Ml = e));
        break;
      case 12:
        (It(l, t), Pt(t));
        break;
      case 31:
        (It(l, t),
          Pt(t),
          e & 4 && ((e = t.updateQueue), e !== null && ((t.updateQueue = null), yn(t, e))));
        break;
      case 13:
        (It(l, t),
          Pt(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Sn = el()),
          e & 4 && ((e = t.updateQueue), e !== null && ((t.updateQueue = null), yn(t, e))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var c = a !== null && a.memoizedState !== null,
          v = Kl,
          p = Ut;
        if (((Kl = v || u), (Ut = p || c), It(l, t), (Ut = p), (Kl = v), Pt(t), e & 8192))
          t: for (
            l = t.stateNode,
              l._visibility = u ? l._visibility & -2 : l._visibility | 1,
              u && (a === null || c || Kl || Ut || La(t)),
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
                  ot(c, c.return, H);
                }
              }
            } else if (l.tag === 6) {
              if (a === null) {
                c = l;
                try {
                  c.stateNode.nodeValue = u ? "" : c.memoizedProps;
                } catch (H) {
                  ot(c, c.return, H);
                }
              }
            } else if (l.tag === 18) {
              if (a === null) {
                c = l;
                try {
                  var g = c.stateNode;
                  u ? w0(g, !0) : w0(c.stateNode, !1);
                } catch (H) {
                  ot(c, c.return, H);
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
          e !== null && ((a = e.retryQueue), a !== null && ((e.retryQueue = null), yn(t, a))));
        break;
      case 19:
        (It(l, t),
          Pt(t),
          e & 4 && ((e = t.updateQueue), e !== null && ((t.updateQueue = null), yn(t, e))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (It(l, t), Pt(t));
    }
  }
  function Pt(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var a, e = t.return; e !== null; ) {
          if (Fo(e)) {
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
            vn(t, n, u);
            break;
          case 5:
            var i = a.stateNode;
            a.flags & 32 && ($a(i, ""), (a.flags &= -33));
            var f = Ef(t);
            vn(t, f, i);
            break;
          case 3:
          case 4:
            var c = a.stateNode.containerInfo,
              v = Ef(t);
            Tf(t, v, c);
            break;
          default:
            throw Error(s(161));
        }
      } catch (p) {
        ot(t, t.return, p);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function u0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        (u0(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), (t = t.sibling));
      }
  }
  function wl(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; ) (Io(t, l.alternate, l), (l = l.sibling));
  }
  function La(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (oa(4, l, l.return), La(l));
          break;
        case 1:
          Nl(l, l.return);
          var a = l.stateNode;
          (typeof a.componentWillUnmount == "function" && wo(l, l.return, a), La(l));
          break;
        case 27:
          vu(l.stateNode);
        case 26:
        case 5:
          (Nl(l, l.return), La(l));
          break;
        case 22:
          l.memoizedState === null && La(l);
          break;
        case 30:
          La(l);
          break;
        default:
          La(l);
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
          (Wl(u, n, a), nu(4, n));
          break;
        case 1:
          if ((Wl(u, n, a), (e = n), (u = e.stateNode), typeof u.componentDidMount == "function"))
            try {
              u.componentDidMount();
            } catch (v) {
              ot(e, e.return, v);
            }
          if (((e = n), (u = e.updateQueue), u !== null)) {
            var f = e.stateNode;
            try {
              var c = u.shared.hiddenCallbacks;
              if (c !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < c.length; u++) Hs(c[u], f);
            } catch (v) {
              ot(e, e.return, v);
            }
          }
          (a && i & 64 && Jo(n), iu(n, n.return));
          break;
        case 27:
          $o(n);
        case 26:
        case 5:
          (Wl(u, n, a), a && e === null && i & 4 && Wo(n), iu(n, n.return));
          break;
        case 12:
          Wl(u, n, a);
          break;
        case 31:
          (Wl(u, n, a), a && i & 4 && l0(u, n));
          break;
        case 13:
          (Wl(u, n, a), a && i & 4 && a0(u, n));
          break;
        case 22:
          (n.memoizedState === null && Wl(u, n, a), iu(n, n.return));
          break;
        case 30:
          break;
        default:
          Wl(u, n, a);
      }
      l = l.sibling;
    }
  }
  function Af(t, l) {
    var a = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      l.memoizedState !== null &&
        l.memoizedState.cachePool !== null &&
        (t = l.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && Je(a)));
  }
  function Mf(t, l) {
    ((t = null),
      l.alternate !== null && (t = l.alternate.memoizedState.cache),
      (l = l.memoizedState.cache),
      l !== t && (l.refCount++, t != null && Je(t)));
  }
  function Dl(t, l, a, e) {
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) (n0(t, l, a, e), (l = l.sibling));
  }
  function n0(t, l, a, e) {
    var u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Dl(t, l, a, e), u & 2048 && nu(9, l));
        break;
      case 1:
        Dl(t, l, a, e);
        break;
      case 3:
        (Dl(t, l, a, e),
          u & 2048 &&
            ((t = null),
            l.alternate !== null && (t = l.alternate.memoizedState.cache),
            (l = l.memoizedState.cache),
            l !== t && (l.refCount++, t != null && Je(t))));
        break;
      case 12:
        if (u & 2048) {
          (Dl(t, l, a, e), (t = l.stateNode));
          try {
            var n = l.memoizedProps,
              i = n.id,
              f = n.onPostCommit;
            typeof f == "function" &&
              f(i, l.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
          } catch (c) {
            ot(l, l.return, c);
          }
        } else Dl(t, l, a, e);
        break;
      case 31:
        Dl(t, l, a, e);
        break;
      case 13:
        Dl(t, l, a, e);
        break;
      case 23:
        break;
      case 22:
        ((n = l.stateNode),
          (i = l.alternate),
          l.memoizedState !== null
            ? n._visibility & 2
              ? Dl(t, l, a, e)
              : fu(t, l)
            : n._visibility & 2
              ? Dl(t, l, a, e)
              : ((n._visibility |= 2), ye(t, l, a, e, (l.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Af(i, l));
        break;
      case 24:
        (Dl(t, l, a, e), u & 2048 && Mf(l.alternate, l));
        break;
      default:
        Dl(t, l, a, e);
    }
  }
  function ye(t, l, a, e, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t,
        i = l,
        f = a,
        c = e,
        v = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (ye(n, i, f, c, u), nu(8, i));
          break;
        case 23:
          break;
        case 22:
          var p = i.stateNode;
          (i.memoizedState !== null
            ? p._visibility & 2
              ? ye(n, i, f, c, u)
              : fu(n, i)
            : ((p._visibility |= 2), ye(n, i, f, c, u)),
            u && v & 2048 && Af(i.alternate, i));
          break;
        case 24:
          (ye(n, i, f, c, u), u && v & 2048 && Mf(i.alternate, i));
          break;
        default:
          ye(n, i, f, c, u);
      }
      l = l.sibling;
    }
  }
  function fu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var a = t,
          e = l,
          u = e.flags;
        switch (e.tag) {
          case 22:
            (fu(a, e), u & 2048 && Af(e.alternate, e));
            break;
          case 24:
            (fu(a, e), u & 2048 && Mf(e.alternate, e));
            break;
          default:
            fu(a, e);
        }
        l = l.sibling;
      }
  }
  var cu = 8192;
  function ge(t, l, a) {
    if (t.subtreeFlags & cu) for (t = t.child; t !== null; ) (i0(t, l, a), (t = t.sibling));
  }
  function i0(t, l, a) {
    switch (t.tag) {
      case 26:
        (ge(t, l, a),
          t.flags & cu && t.memoizedState !== null && Fm(a, Ml, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        ge(t, l, a);
        break;
      case 3:
      case 4:
        var e = Ml;
        ((Ml = Rn(t.stateNode.containerInfo)), ge(t, l, a), (Ml = e));
        break;
      case 22:
        t.memoizedState === null &&
          ((e = t.alternate),
          e !== null && e.memoizedState !== null
            ? ((e = cu), (cu = 16777216), ge(t, l, a), (cu = e))
            : ge(t, l, a));
        break;
      default:
        ge(t, l, a);
    }
  }
  function f0(t) {
    var l = t.alternate;
    if (l !== null && ((t = l.child), t !== null)) {
      l.child = null;
      do ((l = t.sibling), (t.sibling = null), (t = l));
      while (t !== null);
    }
  }
  function su(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var e = l[a];
          ((Ct = e), s0(e, t));
        }
      f0(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (c0(t), (t = t.sibling));
  }
  function c0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (su(t), t.flags & 2048 && oa(9, t, t.return));
        break;
      case 3:
        su(t);
        break;
      case 12:
        su(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((l._visibility &= -3), gn(t))
          : su(t);
        break;
      default:
        su(t);
    }
  }
  function gn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var e = l[a];
          ((Ct = e), s0(e, t));
        }
      f0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((l = t), l.tag)) {
        case 0:
        case 11:
        case 15:
          (oa(8, l, l.return), gn(l));
          break;
        case 22:
          ((a = l.stateNode), a._visibility & 2 && ((a._visibility &= -3), gn(l)));
          break;
        default:
          gn(l);
      }
      t = t.sibling;
    }
  }
  function s0(t, l) {
    for (; Ct !== null; ) {
      var a = Ct;
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
          Je(a.memoizedState.cache);
      }
      if (((e = a.child), e !== null)) ((e.return = a), (Ct = e));
      else
        t: for (a = t; Ct !== null; ) {
          e = Ct;
          var u = e.sibling,
            n = e.return;
          if ((Po(e), e === a)) {
            Ct = null;
            break t;
          }
          if (u !== null) {
            ((u.return = n), (Ct = u));
            break t;
          }
          Ct = n;
        }
    }
  }
  var om = {
      getCacheForType: function (t) {
        var l = qt(Mt),
          a = l.data.get(t);
        return (a === void 0 && ((a = t()), l.data.set(t, a)), a);
      },
      cacheSignal: function () {
        return qt(Mt).controller.signal;
      },
    },
    rm = typeof WeakMap == "function" ? WeakMap : Map,
    it = 0,
    dt = null,
    F = null,
    k = 0,
    st = 0,
    ol = null,
    ra = !1,
    Se = !1,
    Df = !1,
    Fl = 0,
    Et = 0,
    ha = 0,
    Qa = 0,
    Of = 0,
    rl = 0,
    be = 0,
    ou = null,
    tl = null,
    Uf = !1,
    Sn = 0,
    o0 = 0,
    bn = 1 / 0,
    pn = null,
    ma = null,
    xt = 0,
    da = null,
    pe = null,
    $l = 0,
    Rf = 0,
    xf = null,
    r0 = null,
    ru = 0,
    Nf = null;
  function hl() {
    return (it & 2) !== 0 && k !== 0 ? k & -k : S.T !== null ? Yf() : Mc();
  }
  function h0() {
    if (rl === 0)
      if ((k & 536870912) === 0 || P) {
        var t = Du;
        ((Du <<= 1), (Du & 3932160) === 0 && (Du = 262144), (rl = t));
      } else rl = 536870912;
    return ((t = cl.current), t !== null && (t.flags |= 32), rl);
  }
  function ll(t, l, a) {
    (((t === dt && (st === 2 || st === 9)) || t.cancelPendingCommit !== null) &&
      (_e(t, 0), va(t, k, rl, !1)),
      Ne(t, a),
      ((it & 2) === 0 || t !== dt) &&
        (t === dt && ((it & 2) === 0 && (Qa |= a), Et === 4 && va(t, k, rl, !1)), Cl(t)));
  }
  function m0(t, l, a) {
    if ((it & 6) !== 0) throw Error(s(327));
    var e = (!a && (l & 127) === 0 && (l & t.expiredLanes) === 0) || xe(t, l),
      u = e ? dm(t, l) : Hf(t, l, !0),
      n = e;
    do {
      if (u === 0) {
        Se && !e && va(t, l, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), n && !hm(a))) {
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
              u = ou;
              var c = f.current.memoizedState.isDehydrated;
              if ((c && (_e(f, i).flags |= 256), (i = Hf(f, i, !1)), i !== 2)) {
                if (Df && !c) {
                  ((f.errorRecoveryDisabledLanes |= n), (Qa |= n), (u = 4));
                  break t;
                }
                ((n = tl), (tl = u), n !== null && (tl === null ? (tl = n) : tl.push.apply(tl, n)));
              }
              u = i;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (_e(t, 0), va(t, l, 0, !0));
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
              va(e, l, rl, !ra);
              break t;
            case 2:
              tl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((l & 62914560) === l && ((u = Sn + 300 - el()), 10 < u)) {
            if ((va(e, l, rl, !ra), Uu(e, 0, !0) !== 0)) break t;
            (($l = l),
              (e.timeoutHandle = V0(
                d0.bind(null, e, a, tl, pn, Uf, l, rl, Qa, be, ra, n, "Throttled", -0, 0),
                u,
              )));
            break t;
          }
          d0(e, a, tl, pn, Uf, l, rl, Qa, be, ra, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Cl(t);
  }
  function d0(t, l, a, e, u, n, i, f, c, v, p, T, y, g) {
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
        i0(l, n, T));
      var H = (n & 62914560) === n ? Sn - el() : (n & 4194048) === n ? o0 - el() : 0;
      if (((H = $m(T, H)), H !== null)) {
        (($l = n),
          (t.cancelPendingCommit = H(E0.bind(null, t, l, n, a, e, u, i, f, c, p, T, null, y, g))),
          va(t, n, i, !v));
        return;
      }
    }
    E0(t, l, n, a, e, u, i, f, c);
  }
  function hm(t) {
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
            if (!il(n(), u)) return !1;
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
  function va(t, l, a, e) {
    ((l &= ~Of),
      (l &= ~Qa),
      (t.suspendedLanes |= l),
      (t.pingedLanes &= ~l),
      e && (t.warmLanes |= l),
      (e = t.expirationTimes));
    for (var u = l; 0 < u; ) {
      var n = 31 - nl(u),
        i = 1 << n;
      ((e[n] = -1), (u &= ~i));
    }
    a !== 0 && Tc(t, a, l);
  }
  function _n() {
    return (it & 6) === 0 ? (hu(0), !1) : !0;
  }
  function Cf() {
    if (F !== null) {
      if (st === 0) var t = F.return;
      else ((t = F), (Gl = Ca = null), Wi(t), (re = null), (We = 0), (t = F));
      for (; t !== null; ) (Ko(t.alternate, t), (t = t.return));
      F = null;
    }
  }
  function _e(t, l) {
    var a = t.timeoutHandle;
    (a !== -1 && ((t.timeoutHandle = -1), Nm(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      ($l = 0),
      Cf(),
      (dt = t),
      (F = a = ql(t.current, null)),
      (k = l),
      (st = 0),
      (ol = null),
      (ra = !1),
      (Se = xe(t, l)),
      (Df = !1),
      (be = rl = Of = Qa = ha = Et = 0),
      (tl = ou = null),
      (Uf = !1),
      (l & 8) !== 0 && (l |= l & 32));
    var e = t.entangledLanes;
    if (e !== 0)
      for (t = t.entanglements, e &= l; 0 < e; ) {
        var u = 31 - nl(e),
          n = 1 << u;
        ((l |= t[u]), (e &= ~n));
      }
    return ((Fl = l), Lu(), a);
  }
  function v0(t, l) {
    ((K = null),
      (S.H = au),
      l === oe || l === Fu
        ? ((l = Rs()), (st = 3))
        : l === ji
          ? ((l = Rs()), (st = 4))
          : (st =
              l === rf
                ? 8
                : l !== null && typeof l == "object" && typeof l.then == "function"
                  ? 6
                  : 1),
      (ol = l),
      F === null && ((Et = 1), on(t, Sl(l, t.current))));
  }
  function y0() {
    var t = cl.current;
    return t === null
      ? !0
      : (k & 4194048) === k
        ? El === null
        : (k & 62914560) === k || (k & 536870912) !== 0
          ? t === El
          : !1;
  }
  function g0() {
    var t = S.H;
    return ((S.H = au), t === null ? au : t);
  }
  function S0() {
    var t = S.A;
    return ((S.A = om), t);
  }
  function En() {
    ((Et = 4),
      ra || ((k & 4194048) !== k && cl.current !== null) || (Se = !0),
      ((ha & 134217727) === 0 && (Qa & 134217727) === 0) || dt === null || va(dt, k, rl, !1));
  }
  function Hf(t, l, a) {
    var e = it;
    it |= 2;
    var u = g0(),
      n = S0();
    ((dt !== t || k !== l) && ((pn = null), _e(t, l)), (l = !1));
    var i = Et;
    t: do
      try {
        if (st !== 0 && F !== null) {
          var f = F,
            c = ol;
          switch (st) {
            case 8:
              (Cf(), (i = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              cl.current === null && (l = !0);
              var v = st;
              if (((st = 0), (ol = null), Ee(t, f, c, v), a && Se)) {
                i = 0;
                break t;
              }
              break;
            default:
              ((v = st), (st = 0), (ol = null), Ee(t, f, c, v));
          }
        }
        (mm(), (i = Et));
        break;
      } catch (p) {
        v0(t, p);
      }
    while (!0);
    return (
      l && t.shellSuspendCounter++,
      (Gl = Ca = null),
      (it = e),
      (S.H = u),
      (S.A = n),
      F === null && ((dt = null), (k = 0), Lu()),
      i
    );
  }
  function mm() {
    for (; F !== null; ) b0(F);
  }
  function dm(t, l) {
    var a = it;
    it |= 2;
    var e = g0(),
      u = S0();
    dt !== t || k !== l ? ((pn = null), (bn = el() + 500), _e(t, l)) : (Se = xe(t, l));
    t: do
      try {
        if (st !== 0 && F !== null) {
          l = F;
          var n = ol;
          l: switch (st) {
            case 1:
              ((st = 0), (ol = null), Ee(t, l, n, 1));
              break;
            case 2:
            case 9:
              if (Os(n)) {
                ((st = 0), (ol = null), p0(l));
                break;
              }
              ((l = function () {
                ((st !== 2 && st !== 9) || dt !== t || (st = 7), Cl(t));
              }),
                n.then(l, l));
              break t;
            case 3:
              st = 7;
              break t;
            case 4:
              st = 5;
              break t;
            case 7:
              Os(n) ? ((st = 0), (ol = null), p0(l)) : ((st = 0), (ol = null), Ee(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (F.tag) {
                case 26:
                  i = F.memoizedState;
                case 5:
                case 27:
                  var f = F;
                  if (i ? nr(i) : f.stateNode.complete) {
                    ((st = 0), (ol = null));
                    var c = f.sibling;
                    if (c !== null) F = c;
                    else {
                      var v = f.return;
                      v !== null ? ((F = v), Tn(v)) : (F = null);
                    }
                    break l;
                  }
              }
              ((st = 0), (ol = null), Ee(t, l, n, 5));
              break;
            case 6:
              ((st = 0), (ol = null), Ee(t, l, n, 6));
              break;
            case 8:
              (Cf(), (Et = 6));
              break t;
            default:
              throw Error(s(462));
          }
        }
        vm();
        break;
      } catch (p) {
        v0(t, p);
      }
    while (!0);
    return (
      (Gl = Ca = null),
      (S.H = e),
      (S.A = u),
      (it = a),
      F !== null ? 0 : ((dt = null), (k = 0), Lu(), Et)
    );
  }
  function vm() {
    for (; F !== null && !Yr(); ) b0(F);
  }
  function b0(t) {
    var l = Zo(t.alternate, t, Fl);
    ((t.memoizedProps = t.pendingProps), l === null ? Tn(t) : (F = l));
  }
  function p0(t) {
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
        (Ko(a, l), (l = F = gs(l, Fl)), (l = Zo(a, l, Fl)));
    }
    ((t.memoizedProps = t.pendingProps), l === null ? Tn(t) : (F = l));
  }
  function Ee(t, l, a, e) {
    ((Gl = Ca = null), Wi(l), (re = null), (We = 0));
    var u = l.return;
    try {
      if (em(t, u, l, a, k)) {
        ((Et = 1), on(t, Sl(a, t.current)), (F = null));
        return;
      }
    } catch (n) {
      if (u !== null) throw ((F = u), n);
      ((Et = 1), on(t, Sl(a, t.current)), (F = null));
      return;
    }
    l.flags & 32768
      ? (P || e === 1
          ? (t = !0)
          : Se || (k & 536870912) !== 0
            ? (t = !1)
            : ((ra = t = !0),
              (e === 2 || e === 9 || e === 3 || e === 6) &&
                ((e = cl.current), e !== null && e.tag === 13 && (e.flags |= 16384))),
        _0(l, t))
      : Tn(l);
  }
  function Tn(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        _0(l, ra);
        return;
      }
      t = l.return;
      var a = im(l.alternate, l, Fl);
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
    Et === 0 && (Et = 5);
  }
  function _0(t, l) {
    do {
      var a = fm(t.alternate, t);
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
    ((Et = 6), (F = null));
  }
  function E0(t, l, a, e, u, n, i, f, c) {
    t.cancelPendingCommit = null;
    do zn();
    while (xt !== 0);
    if ((it & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      if (
        ((n = l.lanes | l.childLanes),
        (n |= _i),
        Wr(t, a, n, i, f, c),
        t === dt && ((F = dt = null), (k = 0)),
        (pe = l),
        (da = t),
        ($l = a),
        (Rf = n),
        (xf = u),
        (r0 = e),
        (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            bm(Au, function () {
              return (D0(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (e = (l.flags & 13878) !== 0),
        (l.subtreeFlags & 13878) !== 0 || e)
      ) {
        ((e = S.T), (S.T = null), (u = O.p), (O.p = 2), (i = it), (it |= 4));
        try {
          cm(t, l, a);
        } finally {
          ((it = i), (O.p = u), (S.T = e));
        }
      }
      ((xt = 1), T0(), z0(), A0());
    }
  }
  function T0() {
    if (xt === 1) {
      xt = 0;
      var t = da,
        l = pe,
        a = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || a) {
        ((a = S.T), (S.T = null));
        var e = O.p;
        O.p = 2;
        var u = it;
        it |= 4;
        try {
          e0(l, t);
          var n = Jf,
            i = cs(t.containerInfo),
            f = n.focusedElem,
            c = n.selectionRange;
          if (i !== f && f && f.ownerDocument && fs(f.ownerDocument.documentElement, f)) {
            if (c !== null && yi(f)) {
              var v = c.start,
                p = c.end;
              if ((p === void 0 && (p = v), "selectionStart" in f))
                ((f.selectionStart = v), (f.selectionEnd = Math.min(p, f.value.length)));
              else {
                var T = f.ownerDocument || document,
                  y = (T && T.defaultView) || window;
                if (y.getSelection) {
                  var g = y.getSelection(),
                    H = f.textContent.length,
                    X = Math.min(c.start, H),
                    mt = c.end === void 0 ? X : Math.min(c.end, H);
                  !g.extend && X > mt && ((i = mt), (mt = X), (X = i));
                  var h = is(f, X),
                    o = is(f, mt);
                  if (
                    h &&
                    o &&
                    (g.rangeCount !== 1 ||
                      g.anchorNode !== h.node ||
                      g.anchorOffset !== h.offset ||
                      g.focusNode !== o.node ||
                      g.focusOffset !== o.offset)
                  ) {
                    var d = T.createRange();
                    (d.setStart(h.node, h.offset),
                      g.removeAllRanges(),
                      X > mt
                        ? (g.addRange(d), g.extend(o.node, o.offset))
                        : (d.setEnd(o.node, o.offset), g.addRange(d)));
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
          ((jn = !!Kf), (Jf = Kf = null));
        } finally {
          ((it = u), (O.p = e), (S.T = a));
        }
      }
      ((t.current = l), (xt = 2));
    }
  }
  function z0() {
    if (xt === 2) {
      xt = 0;
      var t = da,
        l = pe,
        a = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || a) {
        ((a = S.T), (S.T = null));
        var e = O.p;
        O.p = 2;
        var u = it;
        it |= 4;
        try {
          Io(t, l.alternate, l);
        } finally {
          ((it = u), (O.p = e), (S.T = a));
        }
      }
      xt = 3;
    }
  }
  function A0() {
    if (xt === 4 || xt === 3) {
      ((xt = 0), Gr());
      var t = da,
        l = pe,
        a = $l,
        e = r0;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0
        ? (xt = 5)
        : ((xt = 0), (pe = da = null), M0(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (ma = null),
        kn(a),
        (l = l.stateNode),
        ul && typeof ul.onCommitFiberRoot == "function")
      )
        try {
          ul.onCommitFiberRoot(Re, l, void 0, (l.current.flags & 128) === 128);
        } catch {}
      if (e !== null) {
        ((l = S.T), (u = O.p), (O.p = 2), (S.T = null));
        try {
          for (var n = t.onRecoverableError, i = 0; i < e.length; i++) {
            var f = e[i];
            n(f.value, { componentStack: f.stack });
          }
        } finally {
          ((S.T = l), (O.p = u));
        }
      }
      (($l & 3) !== 0 && zn(),
        Cl(t),
        (u = t.pendingLanes),
        (a & 261930) !== 0 && (u & 42) !== 0 ? (t === Nf ? ru++ : ((ru = 0), (Nf = t))) : (ru = 0),
        hu(0));
    }
  }
  function M0(t, l) {
    (t.pooledCacheLanes &= l) === 0 &&
      ((l = t.pooledCache), l != null && ((t.pooledCache = null), Je(l)));
  }
  function zn() {
    return (T0(), z0(), A0(), D0());
  }
  function D0() {
    if (xt !== 5) return !1;
    var t = da,
      l = Rf;
    Rf = 0;
    var a = kn($l),
      e = S.T,
      u = O.p;
    try {
      ((O.p = 32 > a ? 32 : a), (S.T = null), (a = xf), (xf = null));
      var n = da,
        i = $l;
      if (((xt = 0), (pe = da = null), ($l = 0), (it & 6) !== 0)) throw Error(s(331));
      var f = it;
      if (
        ((it |= 4),
        c0(n.current),
        n0(n, n.current, i, a),
        (it = f),
        hu(0, !1),
        ul && typeof ul.onPostCommitFiberRoot == "function")
      )
        try {
          ul.onPostCommitFiberRoot(Re, n);
        } catch {}
      return !0;
    } finally {
      ((O.p = u), (S.T = e), M0(t, l));
    }
  }
  function O0(t, l, a) {
    ((l = Sl(a, l)),
      (l = of(t.stateNode, l, 2)),
      (t = fa(t, l, 2)),
      t !== null && (Ne(t, 2), Cl(t)));
  }
  function ot(t, l, a) {
    if (t.tag === 3) O0(t, t, a);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          O0(l, t, a);
          break;
        } else if (l.tag === 1) {
          var e = l.stateNode;
          if (
            typeof l.type.getDerivedStateFromError == "function" ||
            (typeof e.componentDidCatch == "function" && (ma === null || !ma.has(e)))
          ) {
            ((t = Sl(a, t)),
              (a = Uo(2)),
              (e = fa(l, a, 2)),
              e !== null && (Ro(a, e, l, t), Ne(e, 2), Cl(e)));
            break;
          }
        }
        l = l.return;
      }
  }
  function Bf(t, l, a) {
    var e = t.pingCache;
    if (e === null) {
      e = t.pingCache = new rm();
      var u = new Set();
      e.set(l, u);
    } else ((u = e.get(l)), u === void 0 && ((u = new Set()), e.set(l, u)));
    u.has(a) || ((Df = !0), u.add(a), (t = ym.bind(null, t, l, a)), l.then(t, t));
  }
  function ym(t, l, a) {
    var e = t.pingCache;
    (e !== null && e.delete(l),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      dt === t &&
        (k & a) === a &&
        (Et === 4 || (Et === 3 && (k & 62914560) === k && 300 > el() - Sn)
          ? (it & 2) === 0 && _e(t, 0)
          : (Of |= a),
        be === k && (be = 0)),
      Cl(t));
  }
  function U0(t, l) {
    (l === 0 && (l = Ec()), (t = Ra(t, l)), t !== null && (Ne(t, l), Cl(t)));
  }
  function gm(t) {
    var l = t.memoizedState,
      a = 0;
    (l !== null && (a = l.retryLane), U0(t, a));
  }
  function Sm(t, l) {
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
    (e !== null && e.delete(l), U0(t, a));
  }
  function bm(t, l) {
    return wn(t, l);
  }
  var An = null,
    Te = null,
    jf = !1,
    Mn = !1,
    qf = !1,
    ya = 0;
  function Cl(t) {
    (t !== Te && t.next === null && (Te === null ? (An = Te = t) : (Te = Te.next = t)),
      (Mn = !0),
      jf || ((jf = !0), _m()));
  }
  function hu(t, l) {
    if (!qf && Mn) {
      qf = !0;
      do
        for (var a = !1, e = An; e !== null; ) {
          if (t !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = e.suspendedLanes,
                f = e.pingedLanes;
              ((n = (1 << (31 - nl(42 | t) + 1)) - 1),
                (n &= u & ~(i & ~f)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((a = !0), C0(e, n));
          } else
            ((n = k),
              (n = Uu(
                e,
                e === dt ? n : 0,
                e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
              )),
              (n & 3) === 0 || xe(e, n) || ((a = !0), C0(e, n)));
          e = e.next;
        }
      while (a);
      qf = !1;
    }
  }
  function pm() {
    R0();
  }
  function R0() {
    Mn = jf = !1;
    var t = 0;
    ya !== 0 && xm() && (t = ya);
    for (var l = el(), a = null, e = An; e !== null; ) {
      var u = e.next,
        n = x0(e, l);
      (n === 0
        ? ((e.next = null), a === null ? (An = u) : (a.next = u), u === null && (Te = a))
        : ((a = e), (t !== 0 || (n & 3) !== 0) && (Mn = !0)),
        (e = u));
    }
    ((xt !== 0 && xt !== 5) || hu(t), ya !== 0 && (ya = 0));
  }
  function x0(t, l) {
    for (
      var a = t.suspendedLanes,
        e = t.pingedLanes,
        u = t.expirationTimes,
        n = t.pendingLanes & -62914561;
      0 < n;
    ) {
      var i = 31 - nl(n),
        f = 1 << i,
        c = u[i];
      (c === -1
        ? ((f & a) === 0 || (f & e) !== 0) && (u[i] = wr(f, l))
        : c <= l && (t.expiredLanes |= f),
        (n &= ~f));
    }
    if (
      ((l = dt),
      (a = k),
      (a = Uu(t, t === l ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (e = t.callbackNode),
      a === 0 || (t === l && (st === 2 || st === 9)) || t.cancelPendingCommit !== null)
    )
      return (e !== null && e !== null && Wn(e), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((a & 3) === 0 || xe(t, a)) {
      if (((l = a & -a), l === t.callbackPriority)) return l;
      switch ((e !== null && Wn(e), kn(a))) {
        case 2:
        case 8:
          a = pc;
          break;
        case 32:
          a = Au;
          break;
        case 268435456:
          a = _c;
          break;
        default:
          a = Au;
      }
      return (
        (e = N0.bind(null, t)), (a = wn(a, e)), (t.callbackPriority = l), (t.callbackNode = a), l
      );
    }
    return (
      e !== null && e !== null && Wn(e), (t.callbackPriority = 2), (t.callbackNode = null), 2
    );
  }
  function N0(t, l) {
    if (xt !== 0 && xt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var a = t.callbackNode;
    if (zn() && t.callbackNode !== a) return null;
    var e = k;
    return (
      (e = Uu(t, t === dt ? e : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      e === 0
        ? null
        : (m0(t, e, l),
          x0(t, el()),
          t.callbackNode != null && t.callbackNode === a ? N0.bind(null, t) : null)
    );
  }
  function C0(t, l) {
    if (zn()) return null;
    m0(t, l, !0);
  }
  function _m() {
    Cm(function () {
      (it & 6) !== 0 ? wn(bc, pm) : R0();
    });
  }
  function Yf() {
    if (ya === 0) {
      var t = ce;
      (t === 0 && ((t = Mu), (Mu <<= 1), (Mu & 261888) === 0 && (Mu = 256)), (ya = t));
    }
    return ya;
  }
  function H0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : Cu("" + t);
  }
  function B0(t, l) {
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
  function Em(t, l, a, e, u) {
    if (l === "submit" && a && a.stateNode === u) {
      var n = H0((u[Ft] || null).action),
        i = e.submitter;
      i &&
        ((l = (l = i[Ft] || null) ? H0(l.formAction) : i.getAttribute("formAction")),
        l !== null && ((n = l), (i = null)));
      var f = new qu("action", "action", null, e, u);
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (e.defaultPrevented) {
                if (ya !== 0) {
                  var c = i ? B0(u, i) : new FormData(u);
                  ef(a, { pending: !0, data: c, method: u.method, action: n }, null, c);
                }
              } else
                typeof n == "function" &&
                  (f.preventDefault(),
                  (c = i ? B0(u, i) : new FormData(u)),
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
      Tm = Xf.toLowerCase(),
      zm = Xf[0].toUpperCase() + Xf.slice(1);
    Al(Tm, "on" + zm);
  }
  (Al(rs, "onAnimationEnd"),
    Al(hs, "onAnimationIteration"),
    Al(ms, "onAnimationStart"),
    Al("dblclick", "onDoubleClick"),
    Al("focusin", "onFocus"),
    Al("focusout", "onBlur"),
    Al(Xh, "onTransitionRun"),
    Al(Lh, "onTransitionStart"),
    Al(Qh, "onTransitionCancel"),
    Al(ds, "onTransitionEnd"),
    Wa("onMouseEnter", ["mouseout", "mouseover"]),
    Wa("onMouseLeave", ["mouseout", "mouseover"]),
    Wa("onPointerEnter", ["pointerout", "pointerover"]),
    Wa("onPointerLeave", ["pointerout", "pointerover"]),
    Ma("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    Ma(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Ma("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ma("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    Ma(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Ma(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var mu =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Am = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mu),
    );
  function j0(t, l) {
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
              v = f.currentTarget;
            if (((f = f.listener), c !== n && u.isPropagationStopped())) break t;
            ((n = f), (u.currentTarget = v));
            try {
              n(u);
            } catch (p) {
              Xu(p);
            }
            ((u.currentTarget = null), (n = c));
          }
        else
          for (i = 0; i < e.length; i++) {
            if (
              ((f = e[i]),
              (c = f.instance),
              (v = f.currentTarget),
              (f = f.listener),
              c !== n && u.isPropagationStopped())
            )
              break t;
            ((n = f), (u.currentTarget = v));
            try {
              n(u);
            } catch (p) {
              Xu(p);
            }
            ((u.currentTarget = null), (n = c));
          }
      }
    }
  }
  function $(t, l) {
    var a = l[In];
    a === void 0 && (a = l[In] = new Set());
    var e = t + "__bubble";
    a.has(e) || (q0(l, t, 2, !1), a.add(e));
  }
  function Lf(t, l, a) {
    var e = 0;
    (l && (e |= 4), q0(a, t, e, l));
  }
  var Dn = "_reactListening" + Math.random().toString(36).slice(2);
  function Qf(t) {
    if (!t[Dn]) {
      ((t[Dn] = !0),
        Uc.forEach(function (a) {
          a !== "selectionchange" && (Am.has(a) || Lf(a, !1, t), Lf(a, !0, t));
        }));
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[Dn] || ((l[Dn] = !0), Lf("selectionchange", !1, l));
    }
  }
  function q0(t, l, a, e) {
    switch (hr(l)) {
      case 2:
        var u = Pm;
        break;
      case 8:
        u = td;
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
            if (((i = Ka(f)), i === null)) return;
            if (((c = i.tag), c === 5 || c === 6 || c === 26 || c === 27)) {
              e = n = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        e = e.return;
      }
    Lc(function () {
      var v = n,
        p = ni(a),
        T = [];
      t: {
        var y = vs.get(t);
        if (y !== void 0) {
          var g = qu,
            H = t;
          switch (t) {
            case "keypress":
              if (Bu(a) === 0) break t;
            case "keydown":
            case "keyup":
              g = Sh;
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
              g = Vc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = ih;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = _h;
              break;
            case rs:
            case hs:
            case ms:
              g = sh;
              break;
            case ds:
              g = Th;
              break;
            case "scroll":
            case "scrollend":
              g = uh;
              break;
            case "wheel":
              g = Ah;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = rh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Jc;
              break;
            case "toggle":
            case "beforetoggle":
              g = Dh;
          }
          var X = (l & 4) !== 0,
            mt = !X && (t === "scroll" || t === "scrollend"),
            h = X ? (y !== null ? y + "Capture" : null) : y;
          X = [];
          for (var o = v, d; o !== null; ) {
            var _ = o;
            if (
              ((d = _.stateNode),
              (_ = _.tag),
              (_ !== 5 && _ !== 26 && _ !== 27) ||
                d === null ||
                h === null ||
                ((_ = Be(o, h)), _ != null && X.push(du(o, _, d))),
              mt)
            )
              break;
            o = o.return;
          }
          0 < X.length && ((y = new g(y, H, null, a, p)), T.push({ event: y, listeners: X }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (
            ((y = t === "mouseover" || t === "pointerover"),
            (g = t === "mouseout" || t === "pointerout"),
            y && a !== ui && (H = a.relatedTarget || a.fromElement) && (Ka(H) || H[Va]))
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
                (g = v),
                (H = H ? Ka(H) : null),
                H !== null &&
                  ((mt = A(H)), (X = H.tag), H !== mt || (X !== 5 && X !== 27 && X !== 6)) &&
                  (H = null))
              : ((g = null), (H = v)),
            g !== H)
          ) {
            if (
              ((X = Vc),
              (_ = "onMouseLeave"),
              (h = "onMouseEnter"),
              (o = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((X = Jc), (_ = "onPointerLeave"), (h = "onPointerEnter"), (o = "pointer")),
              (mt = g == null ? y : He(g)),
              (d = H == null ? y : He(H)),
              (y = new X(_, o + "leave", g, a, p)),
              (y.target = mt),
              (y.relatedTarget = d),
              (_ = null),
              Ka(p) === v &&
                ((X = new X(h, o + "enter", H, a, p)),
                (X.target = d),
                (X.relatedTarget = mt),
                (_ = X)),
              (mt = _),
              g && H)
            )
              l: {
                for (X = Mm, h = g, o = H, d = 0, _ = h; _; _ = X(_)) d++;
                _ = 0;
                for (var Y = o; Y; Y = X(Y)) _++;
                for (; 0 < d - _; ) ((h = X(h)), d--);
                for (; 0 < _ - d; ) ((o = X(o)), _--);
                for (; d--; ) {
                  if (h === o || (o !== null && h === o.alternate)) {
                    X = h;
                    break l;
                  }
                  ((h = X(h)), (o = X(o)));
                }
                X = null;
              }
            else X = null;
            (g !== null && Y0(T, y, g, X, !1), H !== null && mt !== null && Y0(T, mt, H, X, !0));
          }
        }
        t: {
          if (
            ((y = v ? He(v) : window),
            (g = y.nodeName && y.nodeName.toLowerCase()),
            g === "select" || (g === "input" && y.type === "file"))
          )
            var et = ts;
          else if (Ic(y))
            if (ls) et = qh;
            else {
              et = Bh;
              var j = Hh;
            }
          else
            ((g = y.nodeName),
              !g || g.toLowerCase() !== "input" || (y.type !== "checkbox" && y.type !== "radio")
                ? v && ei(v.elementType) && (et = ts)
                : (et = jh));
          if (et && (et = et(t, v))) {
            Pc(T, et, a, p);
            break t;
          }
          (j && j(t, y, v),
            t === "focusout" &&
              v &&
              y.type === "number" &&
              v.memoizedProps.value != null &&
              ai(y, "number", y.value));
        }
        switch (((j = v ? He(v) : window), t)) {
          case "focusin":
            (Ic(j) || j.contentEditable === "true") && ((te = j), (gi = v), (Ze = null));
            break;
          case "focusout":
            Ze = gi = te = null;
            break;
          case "mousedown":
            Si = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Si = !1), ss(T, a, p));
            break;
          case "selectionchange":
            if (Gh) break;
          case "keydown":
          case "keyup":
            ss(T, a, p);
        }
        var J;
        if (mi)
          t: {
            switch (t) {
              case "compositionstart":
                var I = "onCompositionStart";
                break t;
              case "compositionend":
                I = "onCompositionEnd";
                break t;
              case "compositionupdate":
                I = "onCompositionUpdate";
                break t;
            }
            I = void 0;
          }
        else
          Pa
            ? $c(t, a) && (I = "onCompositionEnd")
            : t === "keydown" && a.keyCode === 229 && (I = "onCompositionStart");
        (I &&
          (wc &&
            a.locale !== "ko" &&
            (Pa || I !== "onCompositionStart"
              ? I === "onCompositionEnd" && Pa && (J = Qc())
              : ((ta = p), (ci = "value" in ta ? ta.value : ta.textContent), (Pa = !0))),
          (j = On(v, I)),
          0 < j.length &&
            ((I = new Kc(I, t, null, a, p)),
            T.push({ event: I, listeners: j }),
            J ? (I.data = J) : ((J = kc(a)), J !== null && (I.data = J)))),
          (J = Uh ? Rh(t, a) : xh(t, a)) &&
            ((I = On(v, "onBeforeInput")),
            0 < I.length &&
              ((j = new Kc("onBeforeInput", "beforeinput", null, a, p)),
              T.push({ event: j, listeners: I }),
              (j.data = J))),
          Em(T, t, v, a, p));
      }
      j0(T, l);
    });
  }
  function du(t, l, a) {
    return { instance: t, listener: l, currentTarget: a };
  }
  function On(t, l) {
    for (var a = l + "Capture", e = []; t !== null; ) {
      var u = t,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Be(t, a)),
          u != null && e.unshift(du(t, u, n)),
          (u = Be(t, l)),
          u != null && e.push(du(t, u, n))),
        t.tag === 3)
      )
        return e;
      t = t.return;
    }
    return [];
  }
  function Mm(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Y0(t, l, a, e, u) {
    for (var n = l._reactName, i = []; a !== null && a !== e; ) {
      var f = a,
        c = f.alternate,
        v = f.stateNode;
      if (((f = f.tag), c !== null && c === e)) break;
      ((f !== 5 && f !== 26 && f !== 27) ||
        v === null ||
        ((c = v),
        u
          ? ((v = Be(a, n)), v != null && i.unshift(du(a, v, c)))
          : u || ((v = Be(a, n)), v != null && i.push(du(a, v, c)))),
        (a = a.return));
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Dm = /\r\n?/g,
    Om = /\u0000|\uFFFD/g;
  function G0(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        Dm,
        `
`,
      )
      .replace(Om, "");
  }
  function X0(t, l) {
    return ((l = G0(l)), G0(t) === l);
  }
  function ht(t, l, a, e, u, n) {
    switch (a) {
      case "children":
        typeof e == "string"
          ? l === "body" || (l === "textarea" && e === "") || $a(t, e)
          : (typeof e == "number" || typeof e == "bigint") && l !== "body" && $a(t, "" + e);
        break;
      case "className":
        xu(t, "class", e);
        break;
      case "tabIndex":
        xu(t, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        xu(t, a, e);
        break;
      case "style":
        Gc(t, e, n);
        break;
      case "data":
        if (l !== "object") {
          xu(t, "data", e);
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
        ((e = Cu("" + e)), t.setAttribute(a, e));
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
              ? (l !== "input" && ht(t, l, "name", u.name, u, null),
                ht(t, l, "formEncType", u.formEncType, u, null),
                ht(t, l, "formMethod", u.formMethod, u, null),
                ht(t, l, "formTarget", u.formTarget, u, null))
              : (ht(t, l, "encType", u.encType, u, null),
                ht(t, l, "method", u.method, u, null),
                ht(t, l, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          t.removeAttribute(a);
          break;
        }
        ((e = Cu("" + e)), t.setAttribute(a, e));
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
        ((a = Cu("" + e)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
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
        ($("beforetoggle", t), $("toggle", t), Ru(t, "popover", e));
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
        Ru(t, "is", e);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || (a[0] !== "o" && a[0] !== "O") || (a[1] !== "n" && a[1] !== "N")) &&
          ((a = ah.get(a) || a), Ru(t, a, e));
    }
  }
  function Vf(t, l, a, e, u, n) {
    switch (a) {
      case "style":
        Gc(t, e, n);
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
          ? $a(t, e)
          : (typeof e == "number" || typeof e == "bigint") && $a(t, "" + e);
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
        if (!Rc.hasOwnProperty(a))
          t: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (l = a.slice(2, u ? a.length - 7 : void 0)),
              (n = t[Ft] || null),
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
            a in t ? (t[a] = e) : e === !0 ? t.setAttribute(a, "") : Ru(t, a, e);
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
                  ht(t, l, n, i, a, null);
              }
          }
        (u && ht(t, l, "srcSet", a.srcSet, a, null), e && ht(t, l, "src", a.src, a, null));
        return;
      case "input":
        $("invalid", t);
        var f = (n = i = u = null),
          c = null,
          v = null;
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
                  v = p;
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
                  ht(t, l, e, p, a, null);
              }
          }
        Bc(t, n, f, c, v, i, u, !1);
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
                ht(t, l, u, f, a, null);
            }
        ((l = n),
          (a = i),
          (t.multiple = !!e),
          l != null ? Fa(t, !!e, l, !1) : a != null && Fa(t, !!e, a, !0));
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
                ht(t, l, i, f, a, null);
            }
        qc(t, e, u, n);
        return;
      case "option":
        for (c in a)
          a.hasOwnProperty(c) &&
            ((e = a[c]), e != null) &&
            (c === "selected"
              ? (t.selected = e && typeof e != "function" && typeof e != "symbol")
              : ht(t, l, c, e, a, null));
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
        for (e = 0; e < mu.length; e++) $(mu[e], t);
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
        for (v in a)
          if (a.hasOwnProperty(v) && ((e = a[v]), e != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                ht(t, l, v, e, a, null);
            }
        return;
      default:
        if (ei(l)) {
          for (p in a)
            a.hasOwnProperty(p) && ((e = a[p]), e !== void 0 && Vf(t, l, p, e, a, void 0));
          return;
        }
    }
    for (f in a) a.hasOwnProperty(f) && ((e = a[f]), e != null && ht(t, l, f, e, a, null));
  }
  function Um(t, l, a, e) {
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
          v = null,
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
                e.hasOwnProperty(g) || ht(t, l, g, null, e, T);
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
                v = g;
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
                g !== T && ht(t, l, y, g, e, T);
            }
        }
        li(t, i, f, c, v, p, n, u);
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
                e.hasOwnProperty(n) || ht(t, l, n, null, e, c);
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
                n !== c && ht(t, l, u, n, e, c);
            }
        ((l = f),
          (a = i),
          (e = g),
          y != null
            ? Fa(t, !!a, y, !1)
            : !!e != !!a && (l != null ? Fa(t, !!a, l, !0) : Fa(t, !!a, a ? [] : "", !1)));
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
                ht(t, l, f, null, e, u);
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
                u !== n && ht(t, l, i, u, e, n);
            }
        jc(t, y, g);
        return;
      case "option":
        for (var H in a)
          ((y = a[H]),
            a.hasOwnProperty(H) &&
              y != null &&
              !e.hasOwnProperty(H) &&
              (H === "selected" ? (t.selected = !1) : ht(t, l, H, null, e, y)));
        for (c in e)
          ((y = e[c]),
            (g = a[c]),
            e.hasOwnProperty(c) &&
              y !== g &&
              (y != null || g != null) &&
              (c === "selected"
                ? (t.selected = y && typeof y != "function" && typeof y != "symbol")
                : ht(t, l, c, y, e, g)));
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
        for (var X in a)
          ((y = a[X]),
            a.hasOwnProperty(X) && y != null && !e.hasOwnProperty(X) && ht(t, l, X, null, e, y));
        for (v in e)
          if (((y = e[v]), (g = a[v]), e.hasOwnProperty(v) && y !== g && (y != null || g != null)))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(s(137, l));
                break;
              default:
                ht(t, l, v, y, e, g);
            }
        return;
      default:
        if (ei(l)) {
          for (var mt in a)
            ((y = a[mt]),
              a.hasOwnProperty(mt) &&
                y !== void 0 &&
                !e.hasOwnProperty(mt) &&
                Vf(t, l, mt, void 0, e, y));
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
    for (var h in a)
      ((y = a[h]),
        a.hasOwnProperty(h) && y != null && !e.hasOwnProperty(h) && ht(t, l, h, null, e, y));
    for (T in e)
      ((y = e[T]),
        (g = a[T]),
        !e.hasOwnProperty(T) || y === g || (y == null && g == null) || ht(t, l, T, y, e, g));
  }
  function L0(t) {
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
  function Rm() {
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
        if (n && f && L0(i)) {
          for (i = 0, f = u.responseEnd, e += 1; e < a.length; e++) {
            var c = a[e],
              v = c.startTime;
            if (v > f) break;
            var p = c.transferSize,
              T = c.initiatorType;
            p && L0(T) && ((c = c.responseEnd), (i += p * (c < f ? 1 : (f - v) / (c - v))));
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
  function Un(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Q0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Z0(t, l) {
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
  function xm() {
    var t = window.event;
    return t && t.type === "popstate" ? (t === Wf ? !1 : ((Wf = t), !0)) : ((Wf = null), !1);
  }
  var V0 = typeof setTimeout == "function" ? setTimeout : void 0,
    Nm = typeof clearTimeout == "function" ? clearTimeout : void 0,
    K0 = typeof Promise == "function" ? Promise : void 0,
    Cm =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof K0 < "u"
          ? function (t) {
              return K0.resolve(null).then(t).catch(Hm);
            }
          : V0;
  function Hm(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function ga(t) {
    return t === "head";
  }
  function J0(t, l) {
    var a = l,
      e = 0;
    do {
      var u = a.nextSibling;
      if ((t.removeChild(a), u && u.nodeType === 8))
        if (((a = u.data), a === "/$" || a === "/&")) {
          if (e === 0) {
            (t.removeChild(u), De(l));
            return;
          }
          e--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") e++;
        else if (a === "html") vu(t.ownerDocument.documentElement);
        else if (a === "head") {
          ((a = t.ownerDocument.head), vu(a));
          for (var n = a.firstChild; n; ) {
            var i = n.nextSibling,
              f = n.nodeName;
            (n[Ce] ||
              f === "SCRIPT" ||
              f === "STYLE" ||
              (f === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(n),
              (n = i));
          }
        } else a === "body" && vu(t.ownerDocument.body);
      a = u;
    } while (a);
    De(l);
  }
  function w0(t, l) {
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
          (Ff(a), Pn(a));
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
  function Bm(t, l, a, e) {
    for (; t.nodeType === 1; ) {
      var u = a;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!e && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (e) {
        if (!t[Ce])
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
      if (((t = Tl(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function jm(t, l, a) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a) ||
        ((t = Tl(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function W0(t, l) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l) ||
        ((t = Tl(t.nextSibling)), t === null)
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
  function qm(t, l) {
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
  function Tl(t) {
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
  var If = null;
  function F0(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "/$" || a === "/&") {
          if (l === 0) return Tl(t.nextSibling);
          l--;
        } else (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function $0(t) {
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
  function k0(t, l, a) {
    switch (((l = Un(a)), t)) {
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
  function vu(t) {
    for (var l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
    Pn(t);
  }
  var zl = new Map(),
    I0 = new Set();
  function Rn(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var kl = O.d;
  O.d = { f: Ym, r: Gm, D: Xm, C: Lm, L: Qm, m: Zm, X: Km, S: Vm, M: Jm };
  function Ym() {
    var t = kl.f(),
      l = _n();
    return t || l;
  }
  function Gm(t) {
    var l = Ja(t);
    l !== null && l.tag === 5 && l.type === "form" ? vo(l) : kl.r(t);
  }
  var ze = typeof document > "u" ? null : document;
  function P0(t, l, a) {
    var e = ze;
    if (e && typeof l == "string" && l) {
      var u = yl(l);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        I0.has(u) ||
          (I0.add(u),
          (t = { rel: t, crossOrigin: a, href: l }),
          e.querySelector(u) === null &&
            ((l = e.createElement("link")), Gt(l, "link", t), Nt(l), e.head.appendChild(l))));
    }
  }
  function Xm(t) {
    (kl.D(t), P0("dns-prefetch", t, null));
  }
  function Lm(t, l) {
    (kl.C(t, l), P0("preconnect", t, l));
  }
  function Qm(t, l, a) {
    kl.L(t, l, a);
    var e = ze;
    if (e && t && l) {
      var u = 'link[rel="preload"][as="' + yl(l) + '"]';
      l === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + yl(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" && (u += '[imagesizes="' + yl(a.imageSizes) + '"]'))
        : (u += '[href="' + yl(t) + '"]');
      var n = u;
      switch (l) {
        case "style":
          n = Ae(t);
          break;
        case "script":
          n = Me(t);
      }
      zl.has(n) ||
        ((t = q(
          { rel: "preload", href: l === "image" && a && a.imageSrcSet ? void 0 : t, as: l },
          a,
        )),
        zl.set(n, t),
        e.querySelector(u) !== null ||
          (l === "style" && e.querySelector(yu(n))) ||
          (l === "script" && e.querySelector(gu(n))) ||
          ((l = e.createElement("link")), Gt(l, "link", t), Nt(l), e.head.appendChild(l)));
    }
  }
  function Zm(t, l) {
    kl.m(t, l);
    var a = ze;
    if (a && t) {
      var e = l && typeof l.as == "string" ? l.as : "script",
        u = 'link[rel="modulepreload"][as="' + yl(e) + '"][href="' + yl(t) + '"]',
        n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Me(t);
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
            if (a.querySelector(gu(n))) return;
        }
        ((e = a.createElement("link")), Gt(e, "link", t), Nt(e), a.head.appendChild(e));
      }
    }
  }
  function Vm(t, l, a) {
    kl.S(t, l, a);
    var e = ze;
    if (e && t) {
      var u = wa(e).hoistableStyles,
        n = Ae(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var f = { loading: 0, preload: null };
        if ((i = e.querySelector(yu(n)))) f.loading = 5;
        else {
          ((t = q({ rel: "stylesheet", href: t, "data-precedence": l }, a)),
            (a = zl.get(n)) && Pf(t, a));
          var c = (i = e.createElement("link"));
          (Nt(c),
            Gt(c, "link", t),
            (c._p = new Promise(function (v, p) {
              ((c.onload = v), (c.onerror = p));
            })),
            c.addEventListener("load", function () {
              f.loading |= 1;
            }),
            c.addEventListener("error", function () {
              f.loading |= 2;
            }),
            (f.loading |= 4),
            xn(i, l, e));
        }
        ((i = { type: "stylesheet", instance: i, count: 1, state: f }), u.set(n, i));
      }
    }
  }
  function Km(t, l) {
    kl.X(t, l);
    var a = ze;
    if (a && t) {
      var e = wa(a).hoistableScripts,
        u = Me(t),
        n = e.get(u);
      n ||
        ((n = a.querySelector(gu(u))),
        n ||
          ((t = q({ src: t, async: !0 }, l)),
          (l = zl.get(u)) && tc(t, l),
          (n = a.createElement("script")),
          Nt(n),
          Gt(n, "link", t),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function Jm(t, l) {
    kl.M(t, l);
    var a = ze;
    if (a && t) {
      var e = wa(a).hoistableScripts,
        u = Me(t),
        n = e.get(u);
      n ||
        ((n = a.querySelector(gu(u))),
        n ||
          ((t = q({ src: t, async: !0, type: "module" }, l)),
          (l = zl.get(u)) && tc(t, l),
          (n = a.createElement("script")),
          Nt(n),
          Gt(n, "link", t),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function tr(t, l, a, e) {
    var u = (u = w.current) ? Rn(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((l = Ae(a.href)),
            (a = wa(u).hoistableStyles),
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
          var n = wa(u).hoistableStyles,
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
              (n = u.querySelector(yu(t))) && !n._p && ((i.instance = n), (i.state.loading = 5)),
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
                n || wm(u, t, a, i.state))),
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
            ? ((l = Me(a)),
              (a = wa(u).hoistableScripts),
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
    return 'href="' + yl(t) + '"';
  }
  function yu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function lr(t) {
    return q({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function wm(t, l, a, e) {
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
        Nt(l),
        t.head.appendChild(l));
  }
  function Me(t) {
    return '[src="' + yl(t) + '"]';
  }
  function gu(t) {
    return "script[async]" + t;
  }
  function ar(t, l, a) {
    if ((l.count++, l.instance === null))
      switch (l.type) {
        case "style":
          var e = t.querySelector('style[data-href~="' + yl(a.href) + '"]');
          if (e) return ((l.instance = e), Nt(e), e);
          var u = q({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (e = (t.ownerDocument || t).createElement("style")),
            Nt(e),
            Gt(e, "style", u),
            xn(e, a.precedence, t),
            (l.instance = e)
          );
        case "stylesheet":
          u = Ae(a.href);
          var n = t.querySelector(yu(u));
          if (n) return ((l.state.loading |= 4), (l.instance = n), Nt(n), n);
          ((e = lr(a)),
            (u = zl.get(u)) && Pf(e, u),
            (n = (t.ownerDocument || t).createElement("link")),
            Nt(n));
          var i = n;
          return (
            (i._p = new Promise(function (f, c) {
              ((i.onload = f), (i.onerror = c));
            })),
            Gt(n, "link", e),
            (l.state.loading |= 4),
            xn(n, a.precedence, t),
            (l.instance = n)
          );
        case "script":
          return (
            (n = Me(a.src)),
            (u = t.querySelector(gu(n)))
              ? ((l.instance = u), Nt(u), u)
              : ((e = a),
                (u = zl.get(n)) && ((e = q({}, a)), tc(e, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                Nt(u),
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
        ((e = l.instance), (l.state.loading |= 4), xn(e, a.precedence, t));
    return l.instance;
  }
  function xn(t, l, a) {
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
  function Pf(t, l) {
    (t.crossOrigin == null && (t.crossOrigin = l.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy),
      t.title == null && (t.title = l.title));
  }
  function tc(t, l) {
    (t.crossOrigin == null && (t.crossOrigin = l.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy),
      t.integrity == null && (t.integrity = l.integrity));
  }
  var Nn = null;
  function er(t, l, a) {
    if (Nn === null) {
      var e = new Map(),
        u = (Nn = new Map());
      u.set(a, e);
    } else ((u = Nn), (e = u.get(a)), e || ((e = new Map()), u.set(a, e)));
    if (e.has(t)) return e;
    for (e.set(t, null), a = a.getElementsByTagName(t), u = 0; u < a.length; u++) {
      var n = a[u];
      if (
        !(n[Ce] || n[Bt] || (t === "link" && n.getAttribute("rel") === "stylesheet")) &&
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
  function ur(t, l, a) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(a, l === "title" ? t.querySelector("head > title") : null));
  }
  function Wm(t, l, a) {
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
  function nr(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Fm(t, l, a, e) {
    if (
      a.type === "stylesheet" &&
      (typeof e.media != "string" || matchMedia(e.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var u = Ae(e.href),
          n = l.querySelector(yu(u));
        if (n) {
          ((l = n._p),
            l !== null &&
              typeof l == "object" &&
              typeof l.then == "function" &&
              (t.count++, (t = Cn.bind(t)), l.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = n),
            Nt(n));
          return;
        }
        ((n = l.ownerDocument || l),
          (e = lr(e)),
          (u = zl.get(u)) && Pf(e, u),
          (n = n.createElement("link")),
          Nt(n));
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
          (a = Cn.bind(t)),
          l.addEventListener("load", a),
          l.addEventListener("error", a)));
    }
  }
  var lc = 0;
  function $m(t, l) {
    return (
      t.stylesheets && t.count === 0 && Bn(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var e = setTimeout(function () {
              if ((t.stylesheets && Bn(t, t.stylesheets), t.unsuspend)) {
                var n = t.unsuspend;
                ((t.unsuspend = null), n());
              }
            }, 6e4 + l);
            0 < t.imgBytes && lc === 0 && (lc = 62500 * Rm());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Bn(t, t.stylesheets), t.unsuspend))
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
  function Cn() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Bn(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Hn = null;
  function Bn(t, l) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Hn = new Map()), l.forEach(km, t), (Hn = null), Cn.call(t)));
  }
  function km(t, l) {
    if (!(l.state.loading & 4)) {
      var a = Hn.get(t);
      if (a) var e = a.get(null);
      else {
        ((a = new Map()), Hn.set(t, a));
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
        (e = Cn.bind(this)),
        u.addEventListener("load", e),
        u.addEventListener("error", e),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (l.state.loading |= 4));
    }
  }
  var Su = {
    $$typeof: pt,
    Provider: null,
    Consumer: null,
    _currentValue: G,
    _currentValue2: G,
    _threadCount: 0,
  };
  function Im(t, l, a, e, u, n, i, f, c) {
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
  function ir(t, l, a, e, u, n, i, f, c, v, p, T) {
    return (
      (t = new Im(t, l, a, i, c, v, p, T, f)),
      (l = 1),
      n === !0 && (l |= 24),
      (n = fl(3, null, null, l)),
      (t.current = n),
      (n.stateNode = t),
      (l = Ci()),
      l.refCount++,
      (t.pooledCache = l),
      l.refCount++,
      (n.memoizedState = { element: e, isDehydrated: a, cache: l }),
      qi(n),
      t
    );
  }
  function fr(t) {
    return t ? ((t = ee), t) : ee;
  }
  function cr(t, l, a, e, u, n) {
    ((u = fr(u)),
      e.context === null ? (e.context = u) : (e.pendingContext = u),
      (e = ia(l)),
      (e.payload = { element: a }),
      (n = n === void 0 ? null : n),
      n !== null && (e.callback = n),
      (a = fa(t, e, l)),
      a !== null && (ll(a, t, l), $e(a, t, l)));
  }
  function sr(t, l) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < l ? a : l;
    }
  }
  function ac(t, l) {
    (sr(t, l), (t = t.alternate) && sr(t, l));
  }
  function or(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ra(t, 67108864);
      (l !== null && ll(l, t, 67108864), ac(t, 67108864));
    }
  }
  function rr(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = hl();
      l = $n(l);
      var a = Ra(t, l);
      (a !== null && ll(a, t, l), ac(t, l));
    }
  }
  var jn = !0;
  function Pm(t, l, a, e) {
    var u = S.T;
    S.T = null;
    var n = O.p;
    try {
      ((O.p = 2), ec(t, l, a, e));
    } finally {
      ((O.p = n), (S.T = u));
    }
  }
  function td(t, l, a, e) {
    var u = S.T;
    S.T = null;
    var n = O.p;
    try {
      ((O.p = 8), ec(t, l, a, e));
    } finally {
      ((O.p = n), (S.T = u));
    }
  }
  function ec(t, l, a, e) {
    if (jn) {
      var u = uc(e);
      if (u === null) (Zf(t, l, e, qn, a), mr(t, e));
      else if (ad(u, t, l, a, e)) e.stopPropagation();
      else if ((mr(t, e), l & 4 && -1 < ld.indexOf(t))) {
        for (; u !== null; ) {
          var n = Ja(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var i = Aa(n.pendingLanes);
                  if (i !== 0) {
                    var f = n;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var c = 1 << (31 - nl(i));
                      ((f.entanglements[1] |= c), (i &= ~c));
                    }
                    (Cl(n), (it & 6) === 0 && ((bn = el() + 500), hu(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((f = Ra(n, 2)), f !== null && ll(f, n, 2), _n(), ac(n, 2));
            }
          if (((n = uc(e)), n === null && Zf(t, l, e, qn, a), n === u)) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else Zf(t, l, e, null, a);
    }
  }
  function uc(t) {
    return ((t = ni(t)), nc(t));
  }
  var qn = null;
  function nc(t) {
    if (((qn = null), (t = Ka(t)), t !== null)) {
      var l = A(t);
      if (l === null) t = null;
      else {
        var a = l.tag;
        if (a === 13) {
          if (((t = B(l)), t !== null)) return t;
          t = null;
        } else if (a === 31) {
          if (((t = L(l)), t !== null)) return t;
          t = null;
        } else if (a === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return ((qn = t), null);
  }
  function hr(t) {
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
        switch (Xr()) {
          case bc:
            return 2;
          case pc:
            return 8;
          case Au:
          case Lr:
            return 32;
          case _c:
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
    bu = new Map(),
    pu = new Map(),
    _a = [],
    ld =
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
        bu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        pu.delete(l.pointerId);
    }
  }
  function _u(t, l, a, e, u, n) {
    return t === null || t.nativeEvent !== n
      ? ((t = {
          blockedOn: l,
          domEventName: a,
          eventSystemFlags: e,
          nativeEvent: n,
          targetContainers: [u],
        }),
        l !== null && ((l = Ja(l)), l !== null && or(l)),
        t)
      : ((t.eventSystemFlags |= e),
        (l = t.targetContainers),
        u !== null && l.indexOf(u) === -1 && l.push(u),
        t);
  }
  function ad(t, l, a, e, u) {
    switch (l) {
      case "focusin":
        return ((Sa = _u(Sa, t, l, a, e, u)), !0);
      case "dragenter":
        return ((ba = _u(ba, t, l, a, e, u)), !0);
      case "mouseover":
        return ((pa = _u(pa, t, l, a, e, u)), !0);
      case "pointerover":
        var n = u.pointerId;
        return (bu.set(n, _u(bu.get(n) || null, t, l, a, e, u)), !0);
      case "gotpointercapture":
        return ((n = u.pointerId), pu.set(n, _u(pu.get(n) || null, t, l, a, e, u)), !0);
    }
    return !1;
  }
  function dr(t) {
    var l = Ka(t.target);
    if (l !== null) {
      var a = A(l);
      if (a !== null) {
        if (((l = a.tag), l === 13)) {
          if (((l = B(a)), l !== null)) {
            ((t.blockedOn = l),
              Dc(t.priority, function () {
                rr(a);
              }));
            return;
          }
        } else if (l === 31) {
          if (((l = L(a)), l !== null)) {
            ((t.blockedOn = l),
              Dc(t.priority, function () {
                rr(a);
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
  function Yn(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var a = uc(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var e = new a.constructor(a.type, a);
        ((ui = e), a.target.dispatchEvent(e), (ui = null));
      } else return ((l = Ja(a)), l !== null && or(l), (t.blockedOn = a), !1);
      l.shift();
    }
    return !0;
  }
  function vr(t, l, a) {
    Yn(t) && a.delete(l);
  }
  function ed() {
    ((ic = !1),
      Sa !== null && Yn(Sa) && (Sa = null),
      ba !== null && Yn(ba) && (ba = null),
      pa !== null && Yn(pa) && (pa = null),
      bu.forEach(vr),
      pu.forEach(vr));
  }
  function Gn(t, l) {
    t.blockedOn === l &&
      ((t.blockedOn = null),
      ic || ((ic = !0), M.unstable_scheduleCallback(M.unstable_NormalPriority, ed)));
  }
  var Xn = null;
  function yr(t) {
    Xn !== t &&
      ((Xn = t),
      M.unstable_scheduleCallback(M.unstable_NormalPriority, function () {
        Xn === t && (Xn = null);
        for (var l = 0; l < t.length; l += 3) {
          var a = t[l],
            e = t[l + 1],
            u = t[l + 2];
          if (typeof e != "function") {
            if (nc(e || a) === null) continue;
            break;
          }
          var n = Ja(a);
          n !== null &&
            (t.splice(l, 3),
            (l -= 3),
            ef(n, { pending: !0, data: u, method: a.method, action: e }, e, u));
        }
      }));
  }
  function De(t) {
    function l(c) {
      return Gn(c, t);
    }
    (Sa !== null && Gn(Sa, t),
      ba !== null && Gn(ba, t),
      pa !== null && Gn(pa, t),
      bu.forEach(l),
      pu.forEach(l));
    for (var a = 0; a < _a.length; a++) {
      var e = _a[a];
      e.blockedOn === t && (e.blockedOn = null);
    }
    for (; 0 < _a.length && ((a = _a[0]), a.blockedOn === null); )
      (dr(a), a.blockedOn === null && _a.shift());
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (e = 0; e < a.length; e += 3) {
        var u = a[e],
          n = a[e + 1],
          i = u[Ft] || null;
        if (typeof n == "function") i || yr(a);
        else if (i) {
          var f = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (i = n[Ft] || null))) f = i.formAction;
            else if (nc(u) !== null) continue;
          } else f = i.action;
          (typeof f == "function" ? (a[e + 1] = f) : (a.splice(e, 3), (e -= 3)), yr(a));
        }
      }
  }
  function gr() {
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
  ((Ln.prototype.render = fc.prototype.render =
    function (t) {
      var l = this._internalRoot;
      if (l === null) throw Error(s(409));
      var a = l.current,
        e = hl();
      cr(a, e, t, l, null, null);
    }),
    (Ln.prototype.unmount = fc.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var l = t.containerInfo;
          (cr(t.current, 2, null, t, null, null), _n(), (l[Va] = null));
        }
      }));
  function Ln(t) {
    this._internalRoot = t;
  }
  Ln.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var l = Mc();
      t = { blockedOn: null, target: t, priority: l };
      for (var a = 0; a < _a.length && l !== 0 && l < _a[a].priority; a++);
      (_a.splice(a, 0, t), a === 0 && dr(t));
    }
  };
  var Sr = m.version;
  if (Sr !== "19.2.7") throw Error(s(527, Sr, "19.2.7"));
  O.findDOMNode = function (t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function"
        ? Error(s(188))
        : ((t = Object.keys(t).join(",")), Error(s(268, t)));
    return ((t = E(l)), (t = t !== null ? Q(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var ud = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: S,
    reconcilerVersion: "19.2.7",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qn.isDisabled && Qn.supportsFiber)
      try {
        ((Re = Qn.inject(ud)), (ul = Qn));
      } catch {}
  }
  return (
    (Tu.createRoot = function (t, l) {
      if (!U(t)) throw Error(s(299));
      var a = !1,
        e = "",
        u = Ao,
        n = Mo,
        i = Do;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (e = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
          l.onCaughtError !== void 0 && (n = l.onCaughtError),
          l.onRecoverableError !== void 0 && (i = l.onRecoverableError)),
        (l = ir(t, 1, !1, null, null, a, e, null, u, n, i, gr)),
        (t[Va] = l.current),
        Qf(t),
        new fc(l)
      );
    }),
    (Tu.hydrateRoot = function (t, l, a) {
      if (!U(t)) throw Error(s(299));
      var e = !1,
        u = "",
        n = Ao,
        i = Mo,
        f = Do,
        c = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (e = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (n = a.onUncaughtError),
          a.onCaughtError !== void 0 && (i = a.onCaughtError),
          a.onRecoverableError !== void 0 && (f = a.onRecoverableError),
          a.formState !== void 0 && (c = a.formState)),
        (l = ir(t, 1, !0, l, a ?? null, e, u, c, n, i, f, gr)),
        (l.context = fr(null)),
        (a = l.current),
        (e = hl()),
        (e = $n(e)),
        (u = ia(e)),
        (u.callback = null),
        fa(a, u, e),
        (a = e),
        (l.current.lanes = a),
        Ne(l, a),
        Cl(l),
        (t[Va] = l.current),
        Qf(t),
        new Ln(l)
      );
    }),
    (Tu.version = "19.2.7"),
    Tu
  );
}
var Or;
function dd() {
  if (Or) return oc.exports;
  Or = 1;
  function M() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(M);
      } catch (m) {
        console.error(m);
      }
  }
  return (M(), (oc.exports = md()), oc.exports);
}
var vd = dd();
const yd = (M) => M.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  gd = (M) =>
    M.replace(/^([A-Z])|[\s-_]+(\w)/g, (m, b, s) => (s ? s.toUpperCase() : b.toLowerCase())),
  Ur = (M) => {
    const m = gd(M);
    return m.charAt(0).toUpperCase() + m.slice(1);
  },
  Br = (...M) =>
    M.filter((m, b, s) => !!m && m.trim() !== "" && s.indexOf(m) === b)
      .join(" ")
      .trim(),
  Sd = (M) => {
    for (const m in M) if (m.startsWith("aria-") || m === "role" || m === "title") return !0;
  };
var bd = {
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
const pd = St.forwardRef(
  (
    {
      color: M = "currentColor",
      size: m = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: s,
      className: U = "",
      children: A,
      iconNode: B,
      ...L
    },
    D,
  ) =>
    St.createElement(
      "svg",
      {
        ref: D,
        ...bd,
        width: m,
        height: m,
        stroke: M,
        strokeWidth: s ? (Number(b) * 24) / Number(m) : b,
        className: Br("lucide", U),
        ...(!A && !Sd(L) && { "aria-hidden": "true" }),
        ...L,
      },
      [...B.map(([E, Q]) => St.createElement(E, Q)), ...(Array.isArray(A) ? A : [A])],
    ),
);
const Ta = (M, m) => {
  const b = St.forwardRef(({ className: s, ...U }, A) =>
    St.createElement(pd, {
      ref: A,
      iconNode: m,
      className: Br(`lucide-${yd(Ur(M))}`, `lucide-${M}`, s),
      ...U,
    }),
  );
  return ((b.displayName = Ur(M)), b);
};
const _d = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }],
  ],
  Ed = Ta("download", _d);
const Td = [
    [
      "path",
      {
        d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
        key: "1ptgy4",
      },
    ],
    [
      "path",
      {
        d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
        key: "1sl1rz",
      },
    ],
  ],
  Rr = Ta("droplets", Td);
const zd = [
    ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
    ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }],
  ],
  xr = Ta("gauge", zd);
const Ad = [
    ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
    ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }],
  ],
  Md = Ta("pause", Ad);
const Dd = [
    [
      "path",
      {
        d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
        key: "10ikf1",
      },
    ],
  ],
  Od = Ta("play", Dd);
const Ud = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ],
  jr = Ta("rotate-ccw", Ud);
const Rd = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr",
      },
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }],
  ],
  dc = Ta("sparkles", Rd);
const xd = [
    [
      "path",
      {
        d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
        key: "knzxuh",
      },
    ],
    [
      "path",
      {
        d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
        key: "2jd2cc",
      },
    ],
    [
      "path",
      {
        d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
        key: "rd2r6e",
      },
    ],
  ],
  Nr = Ta("waves", xd),
  Nd = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
  vc = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,
  Cd = `
precision highp float;

uniform sampler2D u_state;
uniform vec2 u_texel;
uniform float u_time;
uniform float u_flow;
uniform float u_retention;
uniform float u_resistance;
uniform float u_wetness;
uniform float u_paper;

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
  vec2 swirl = curl(v_uv * (2.6 + u_wetness * 2.4) + vec2(u_time * 0.038, -u_time * 0.026));
  float mobility = mix(0.00045, 0.0042, u_flow) * mix(1.25, 0.32, u_resistance);
  mobility *= mix(0.7, 1.55, u_wetness) * (0.25 + center.a * 1.5);
  vec2 advectUv = clamp(v_uv - swirl * mobility, vec2(0.001), vec2(0.999));

  vec4 advected = texture2D(u_state, advectUv);
  vec4 blurred = (north + south + east + west + center * 1.5) / 5.5;
  float diffusion = mix(0.035, 0.36, u_wetness) * mix(1.0, 0.42, u_resistance);
  vec4 pigment = mix(advected, blurred, diffusion);

  float granulation = mix(1.0, 0.92 + paper * 0.12, u_paper);
  float fade = mix(0.973, 0.9986, u_retention);
  pigment.rgb *= fade * granulation;
  pigment.a *= fade * mix(0.992, 0.972 + paper * 0.04, u_paper * 0.55);

  pigment.rgb = clamp(pigment.rgb, 0.0, 1.0);
  pigment.a = clamp(pigment.a, 0.0, 0.96);
  gl_FragColor = pigment;
}
`,
  Hd = `
precision highp float;

uniform vec2 u_point;
uniform float u_radius;
uniform float u_aspect;
uniform float u_strength;
uniform float u_wetness;
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
  float bloom = smoothstep(1.15, 0.52, d) * 0.22 * u_wetness;
  float ring = smoothstep(0.96, 0.72, d) * smoothstep(0.38, 0.72, d);
  float grain = noise(v_uv * 190.0 + u_time * 2.0);
  float pigment = clamp(pow(soft, 0.68) + bloom + ring * 0.34, 0.0, 1.0);
  pigment *= mix(0.78, 1.18, grain);
  pigment *= u_strength;

  vec3 tint = mix(u_color, u_color * (0.74 + ring * 0.18), ring * 0.65);
  gl_FragColor = vec4(tint, pigment);
}
`,
  Bd = `
precision highp float;

uniform sampler2D u_state;
uniform vec2 u_texel;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_edge;
uniform float u_paper;
uniform float u_lighting;

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
  paperColor += (paper - 0.5) * vec3(0.07, 0.06, 0.045) * u_paper;

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
  pigment = mix(pigment, pigment * (0.77 + paper * 0.28), u_paper * 0.65);
  vec3 color = mix(paperColor, pigment, clamp(a * 1.08, 0.0, 0.96));
  color = mix(color, pigment * 0.56, boundary * u_edge * 0.72);

  float glow = smoothstep(0.08, 0.58, a) * (1.0 - boundary * 0.55);
  color += vec3(0.045, 0.07, 0.08) * glow * u_lighting;
  color += vec3(0.03, 0.025, 0.018) * (paper - 0.5) * u_paper * (1.0 - a);

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`,
  jd = {
    renderer: "WebGL",
    quality: "low",
    simWidth: 0,
    simHeight: 0,
    fps: 0,
    detail: "initializing",
  };
class qd {
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
  constructor(m, b, s) {
    ((this.canvas = m), (this.params = b), (this.onStatus = s));
    const U = {
        alpha: !1,
        antialias: !1,
        depth: !1,
        stencil: !1,
        preserveDrawingBuffer: !0,
        powerPreference: "high-performance",
      },
      A =
        m.getContext("webgl2", U) ??
        m.getContext("webgl", U) ??
        m.getContext("experimental-webgl", U);
    if (!A) throw new Error("WebGL is not available on this device.");
    ((this.gl = A),
      (this.isWebGL2 = typeof WebGL2RenderingContext < "u" && A instanceof WebGL2RenderingContext));
    const B = !!(
      A.getExtension("EXT_color_buffer_float") ??
      A.getExtension("WEBGL_color_buffer_float") ??
      A.getExtension("OES_texture_float")
    );
    ((this.quality = this.isWebGL2 && B ? "high" : this.isWebGL2 ? "medium" : "low"),
      (this.quadBuffer = this.must(A.createBuffer(), "Unable to create quad buffer.")),
      (this.stepProgram = this.createProgram(vc, Cd)),
      (this.splatProgram = this.createProgram(vc, Hd)),
      (this.displayProgram = this.createProgram(vc, Bd)),
      A.bindBuffer(A.ARRAY_BUFFER, this.quadBuffer),
      A.bufferData(A.ARRAY_BUFFER, Nd, A.STATIC_DRAW),
      A.disable(A.DEPTH_TEST),
      A.disable(A.CULL_FACE),
      A.clearColor(0, 0, 0, 0),
      this.resize(!0),
      this.clear());
  }
  setParams(m) {
    this.params = m;
  }
  getStatus() {
    return {
      ...jd,
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
  resize(m = !1) {
    const b = this.canvas.getBoundingClientRect(),
      s = Math.max(2, b.width),
      U = Math.max(2, b.height),
      A = Math.min(window.devicePixelRatio || 1, 2),
      B = Math.max(2, Math.floor(s * A)),
      L = Math.max(2, Math.floor(U * A));
    if (!m && this.canvas.width === B && this.canvas.height === L) return !1;
    ((this.canvas.width = B), (this.canvas.height = L));
    const D = Math.min(s, U) < 720,
      E = this.quality === "high" ? (D ? 0.42 : 0.52) : D ? 0.34 : 0.42,
      Q = this.quality === "high" ? 1080 : 860,
      q = Math.min(1, Q / Math.max(B, L));
    return (
      (this.simWidth = Math.max(32, Math.floor(B * E * q))),
      (this.simHeight = Math.max(32, Math.floor(L * E * q))),
      this.rebuildTargets(),
      this.clear(),
      this.pushStatus(),
      !0
    );
  }
  clear() {
    const m = this.gl;
    (m.disable(m.BLEND), m.viewport(0, 0, this.simWidth, this.simHeight));
    for (const b of this.framebuffers)
      (m.bindFramebuffer(m.FRAMEBUFFER, b), m.clear(m.COLOR_BUFFER_BIT));
    (m.bindFramebuffer(m.FRAMEBUFFER, null),
      (this.readIndex = 0),
      this.render(performance.now() / 1e3));
  }
  inject(m, b, s, U = 0.8) {
    const A = this.canvas.getBoundingClientRect();
    if (A.width <= 0 || A.height <= 0) return;
    const B = (m - A.left) / A.width,
      L = 1 - (b - A.top) / A.height;
    if (B < -0.08 || B > 1.08 || L < -0.08 || L > 1.08) return;
    const D = this.gl,
      E = this.params.brushSize / Math.min(A.width, A.height),
      Q = Math.min(0.88, Math.max(0.08, U) * (0.28 + this.params.flow * 0.64));
    (D.bindFramebuffer(D.FRAMEBUFFER, this.framebuffers[this.readIndex]),
      D.viewport(0, 0, this.simWidth, this.simHeight),
      D.useProgram(this.splatProgram),
      this.bindQuad(this.splatProgram),
      D.enable(D.BLEND),
      D.blendFuncSeparate(D.SRC_ALPHA, D.ONE_MINUS_SRC_ALPHA, D.ONE, D.ONE_MINUS_SRC_ALPHA),
      this.uniform2f(this.splatProgram, "u_point", B, L),
      this.uniform1f(this.splatProgram, "u_radius", E * (0.72 + this.params.wetness * 0.42)),
      this.uniform1f(this.splatProgram, "u_aspect", this.simWidth / this.simHeight),
      this.uniform1f(this.splatProgram, "u_strength", Q),
      this.uniform1f(this.splatProgram, "u_wetness", this.params.wetness),
      this.uniform1f(this.splatProgram, "u_time", performance.now() / 1e3),
      this.uniform3f(this.splatProgram, "u_color", s[0], s[1], s[2]),
      D.drawArrays(D.TRIANGLE_STRIP, 0, 4),
      D.disable(D.BLEND),
      D.bindFramebuffer(D.FRAMEBUFFER, null),
      this.render(performance.now() / 1e3));
  }
  update(m, b) {
    (this.resize(), b || this.step(m), this.render(m), this.trackFps());
  }
  render(m) {
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
      this.uniform1f(this.displayProgram, "u_time", m),
      this.uniform1f(this.displayProgram, "u_edge", this.params.edgeDarkening),
      this.uniform1f(this.displayProgram, "u_paper", this.params.paperGrain),
      this.uniform1f(this.displayProgram, "u_lighting", this.params.lighting ? 1 : 0),
      b.drawArrays(b.TRIANGLE_STRIP, 0, 4));
  }
  destroy() {
    const m = this.gl;
    for (const b of this.textures) m.deleteTexture(b);
    for (const b of this.framebuffers) m.deleteFramebuffer(b);
    (m.deleteBuffer(this.quadBuffer),
      m.deleteProgram(this.stepProgram),
      m.deleteProgram(this.splatProgram),
      m.deleteProgram(this.displayProgram));
  }
  step(m) {
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
      this.uniform1f(this.stepProgram, "u_time", m),
      this.uniform1f(this.stepProgram, "u_flow", this.params.flow),
      this.uniform1f(this.stepProgram, "u_retention", this.params.retention),
      this.uniform1f(this.stepProgram, "u_resistance", this.params.resistance),
      this.uniform1f(this.stepProgram, "u_wetness", this.params.wetness),
      this.uniform1f(this.stepProgram, "u_paper", this.params.paperGrain),
      b.drawArrays(b.TRIANGLE_STRIP, 0, 4),
      b.bindFramebuffer(b.FRAMEBUFFER, null),
      (this.readIndex = s));
  }
  rebuildTargets() {
    const m = this.gl;
    for (const b of this.textures) m.deleteTexture(b);
    for (const b of this.framebuffers) m.deleteFramebuffer(b);
    ((this.textures = []), (this.framebuffers = []));
    for (let b = 0; b < 2; b++) {
      const s = this.must(m.createTexture(), "Unable to create watercolor texture.");
      (m.bindTexture(m.TEXTURE_2D, s),
        m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MIN_FILTER, m.LINEAR),
        m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MAG_FILTER, m.LINEAR),
        m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_S, m.CLAMP_TO_EDGE),
        m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_T, m.CLAMP_TO_EDGE),
        m.texImage2D(
          m.TEXTURE_2D,
          0,
          m.RGBA,
          this.simWidth,
          this.simHeight,
          0,
          m.RGBA,
          m.UNSIGNED_BYTE,
          null,
        ));
      const U = this.must(m.createFramebuffer(), "Unable to create watercolor target.");
      if (
        (m.bindFramebuffer(m.FRAMEBUFFER, U),
        m.framebufferTexture2D(m.FRAMEBUFFER, m.COLOR_ATTACHMENT0, m.TEXTURE_2D, s, 0),
        m.checkFramebufferStatus(m.FRAMEBUFFER) !== m.FRAMEBUFFER_COMPLETE)
      )
        throw new Error("WebGL framebuffer is incomplete; watercolor simulation cannot start.");
      (this.textures.push(s), this.framebuffers.push(U));
    }
    (m.bindTexture(m.TEXTURE_2D, null),
      m.bindFramebuffer(m.FRAMEBUFFER, null),
      (this.readIndex = 0));
  }
  createProgram(m, b) {
    const s = this.gl,
      U = this.compileShader(s.VERTEX_SHADER, m),
      A = this.compileShader(s.FRAGMENT_SHADER, b),
      B = this.must(s.createProgram(), "Unable to create shader program.");
    if (
      (s.attachShader(B, U),
      s.attachShader(B, A),
      s.linkProgram(B),
      s.deleteShader(U),
      s.deleteShader(A),
      !s.getProgramParameter(B, s.LINK_STATUS))
    ) {
      const L = s.getProgramInfoLog(B) ?? "Unknown shader link error.";
      throw (s.deleteProgram(B), new Error(L));
    }
    return B;
  }
  compileShader(m, b) {
    const s = this.gl,
      U = this.must(s.createShader(m), "Unable to create shader.");
    if ((s.shaderSource(U, b), s.compileShader(U), !s.getShaderParameter(U, s.COMPILE_STATUS))) {
      const A = s.getShaderInfoLog(U) ?? "Unknown shader compile error.";
      throw (s.deleteShader(U), new Error(A));
    }
    return U;
  }
  bindQuad(m) {
    const b = this.gl,
      s = b.getAttribLocation(m, "a_position");
    (b.bindBuffer(b.ARRAY_BUFFER, this.quadBuffer),
      b.enableVertexAttribArray(s),
      b.vertexAttribPointer(s, 2, b.FLOAT, !1, 0, 0));
  }
  uniform1i(m, b, s) {
    const U = this.gl.getUniformLocation(m, b);
    U && this.gl.uniform1i(U, s);
  }
  uniform1f(m, b, s) {
    const U = this.gl.getUniformLocation(m, b);
    U && this.gl.uniform1f(U, s);
  }
  uniform2f(m, b, s, U) {
    const A = this.gl.getUniformLocation(m, b);
    A && this.gl.uniform2f(A, s, U);
  }
  uniform3f(m, b, s, U, A) {
    const B = this.gl.getUniformLocation(m, b);
    B && this.gl.uniform3f(B, s, U, A);
  }
  trackFps() {
    this.frameCount += 1;
    const m = performance.now();
    m - this.frameWindowStart >= 700 &&
      ((this.fps = Math.round((this.frameCount * 1e3) / (m - this.frameWindowStart))),
      (this.frameCount = 0),
      (this.frameWindowStart = m),
      this.pushStatus());
  }
  pushStatus() {
    this.onStatus(this.getStatus());
  }
  must(m, b) {
    if (!m) throw new Error(b);
    return m;
  }
}
const Cr = {
    brushSize: 48,
    flow: 0.72,
    retention: 0.86,
    resistance: 0.34,
    wetness: 0.82,
    edgeDarkening: 0.72,
    paperGrain: 0.82,
    lighting: !0,
  },
  Oe = [
    { name: "青蓝", rgb: [0.08, 0.76, 0.92], swatch: "#13c2ea" },
    { name: "湖蓝", rgb: [0.09, 0.48, 0.91], swatch: "#167be8" },
    { name: "雾紫", rgb: [0.54, 0.34, 0.93], swatch: "#8957ed" },
    { name: "薄荷", rgb: [0.28, 0.82, 0.68], swatch: "#48d1ad" },
    { name: "玫瑰", rgb: [0.92, 0.35, 0.62], swatch: "#eb599e" },
  ],
  Yd = { active: !1, title: "", message: "" };
function Gd() {
  const M = St.useRef(null),
    m = St.useRef(null),
    b = St.useRef(null),
    s = St.useRef(!1),
    U = St.useRef(Cr),
    A = St.useRef(null),
    B = St.useRef(0),
    L = St.useRef(!1),
    [D, E] = St.useState(Cr),
    [Q, q] = St.useState(!1),
    [tt, Kt] = St.useState([0, 1, 2]),
    [vt, Ht] = St.useState(null),
    [ml, Xt] = St.useState(Yd),
    [Ol, pt] = St.useState("就绪"),
    Wt = St.useMemo(() => {
      if (!vt) return "初始化";
      const N = vt.quality === "high" ? "高质量" : vt.quality === "medium" ? "中质量" : "低质量";
      return `${vt.renderer} · ${N} · ${vt.fps || 0} FPS`;
    }, [vt]);
  (St.useEffect(() => {
    ((U.current = D), m.current?.setParams(D));
  }, [D]),
    St.useEffect(() => {
      s.current = Q;
    }, [Q]),
    St.useEffect(() => {
      const N = M.current;
      if (!N) return;
      const lt = (ft) => {
        (ft.preventDefault(),
          Xt({
            active: !0,
            title: "WebGL context 已丢失",
            message: "当前设备或浏览器回收了图形上下文，请重载页面恢复画布。",
          }));
      };
      N.addEventListener("webglcontextlost", lt, !1);
      try {
        const ft = new qd(N, U.current, Ht);
        ((m.current = ft), Ld(ft, N));
        const S = (O) => {
          (m.current?.update(O / 1e3, s.current), (b.current = requestAnimationFrame(S)));
        };
        b.current = requestAnimationFrame(S);
      } catch (ft) {
        Xt({
          active: !0,
          title: "WebGL 不可用",
          message:
            ft instanceof Error ? ft.message : "当前浏览器没有可用的 WebGL 能力，已进入静态预览。",
        });
      }
      return () => {
        (b.current !== null && cancelAnimationFrame(b.current),
          m.current?.destroy(),
          (m.current = null),
          N.removeEventListener("webglcontextlost", lt));
      };
    }, []));
  const Rt = (N, lt) => {
      E((ft) => ({ ...ft, [N]: lt }));
    },
    Lt = (N) => {
      Kt((lt) => {
        const ft = lt.includes(N);
        if (ft && lt.length === 1) return (pt("至少保留 1 色"), lt);
        const S = ft ? lt.filter((O) => O !== N) : [...lt, N].sort((O, G) => O - G);
        return (pt(`已选 ${S.length} 色`), S);
      });
    },
    W = St.useCallback(
      (N) => {
        const lt = m.current;
        if (!lt) return;
        const ft = N.pressure && N.pressure > 0 ? N.pressure : 0.78,
          S = { x: N.clientX, y: N.clientY },
          O = A.current,
          G = Math.max(4, U.current.brushSize * 0.24);
        if (!O) {
          (Qd(lt, S.x, S.y, tt, ft), (A.current = S));
          return;
        }
        const nt = S.x - O.x,
          ct = S.y - O.y,
          r = Math.hypot(nt, ct),
          z = Math.max(1, Math.ceil(r / G));
        for (let R = 1; R <= z; R += 1) {
          const C = R / z,
            Z = O.x + nt * C,
            w = O.y + ct * C,
            at = Zd(tt, Z, w, B.current + r * C, U.current.brushSize);
          lt.inject(Z, w, at, ft);
        }
        ((B.current += r), (A.current = S));
      },
      [tt],
    ),
    Qt = (N) => {
      ((L.current = !0),
        (A.current = null),
        (B.current = 0),
        N.currentTarget.setPointerCapture(N.pointerId),
        W(N));
    },
    dl = (N) => {
      L.current && W(N);
    },
    Ul = (N) => {
      ((L.current = !1),
        (A.current = null),
        (B.current = 0),
        N.currentTarget.hasPointerCapture(N.pointerId) &&
          N.currentTarget.releasePointerCapture(N.pointerId));
    },
    al = () => {
      (m.current?.clear(), (A.current = null), (B.current = 0), (L.current = !1), pt("已重置"));
    },
    Zt = () => {
      const N = M.current,
        lt = m.current;
      if (!N || !lt) {
        pt("导出失败：画布不可用");
        return;
      }
      (lt.render(performance.now() / 1e3),
        N.toBlob((ft) => {
          if (!ft) {
            pt("导出失败：浏览器未生成 PNG");
            return;
          }
          const S = URL.createObjectURL(ft),
            O = document.createElement("a");
          ((O.href = S),
            (O.download = `watercolor-${new Date().toISOString().replace(/[:.]/g, "-")}.png`),
            O.click(),
            window.setTimeout(() => URL.revokeObjectURL(S), 1e3),
            pt("PNG 已导出"));
        }, "image/png"));
    };
  return x.jsxs("main", {
    className: "appShell",
    children: [
      x.jsxs("section", {
        className: "canvasStage",
        "aria-label": "WebGL 水彩画布",
        children: [
          ml.active ? x.jsx(Xd, { fallback: ml, onReset: al }) : null,
          x.jsx("canvas", {
            ref: M,
            className: "watercolorCanvas",
            onPointerDown: Qt,
            onPointerMove: dl,
            onPointerUp: Ul,
            onPointerCancel: Ul,
            onPointerLeave: (N) => {
              L.current && Ul(N);
            },
          }),
          x.jsxs("div", {
            className: "topRail",
            children: [
              x.jsxs("div", {
                children: [
                  x.jsx("p", { className: "eyebrow", children: "WebGL watercolor field" }),
                  x.jsx("h1", { children: "水彩流场" }),
                ],
              }),
              x.jsx("span", { className: "statusPill", children: Wt }),
            ],
          }),
        ],
      }),
      x.jsxs("aside", {
        className: "controlPanel",
        "aria-label": "水彩参数",
        children: [
          x.jsxs("div", {
            className: "panelHeader",
            children: [
              x.jsx(Nr, { "aria-hidden": "true", size: 20 }),
              x.jsxs("div", {
                children: [x.jsx("h2", { children: "参数" }), x.jsx("p", { children: Ol })],
              }),
            ],
          }),
          x.jsx("fieldset", {
            className: "swatches",
            "aria-label": "颜色",
            children: Oe.map((N, lt) =>
              x.jsx(
                "button",
                {
                  type: "button",
                  className: `swatch ${tt.includes(lt) ? "isSelected" : ""}`,
                  style: { "--swatch": N.swatch },
                  "aria-label": `${N.name}${tt.includes(lt) ? " 已选" : ""}`,
                  "aria-pressed": tt.includes(lt),
                  title: N.name,
                  onClick: () => Lt(lt),
                },
                N.name,
              ),
            ),
          }),
          x.jsx(Za, {
            icon: x.jsx(Rr, { size: 17, "aria-hidden": "true" }),
            label: "笔刷大小",
            value: D.brushSize,
            min: 10,
            max: 128,
            step: 1,
            suffix: "px",
            onChange: (N) => Rt("brushSize", N),
          }),
          x.jsx(Za, {
            icon: x.jsx(Nr, { size: 17, "aria-hidden": "true" }),
            label: "水流强度",
            value: D.flow,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: (N) => Rt("flow", N),
          }),
          x.jsx(Za, {
            icon: x.jsx(xr, { size: 17, "aria-hidden": "true" }),
            label: "颜料保留",
            value: D.retention,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: (N) => Rt("retention", N),
          }),
          x.jsx(Za, {
            icon: x.jsx(xr, { size: 17, "aria-hidden": "true" }),
            label: "水流阻力",
            value: D.resistance,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: (N) => Rt("resistance", N),
          }),
          x.jsx(Za, {
            icon: x.jsx(Rr, { size: 17, "aria-hidden": "true" }),
            label: "湿润程度",
            value: D.wetness,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: (N) => Rt("wetness", N),
          }),
          x.jsx(Za, {
            icon: x.jsx(dc, { size: 17, "aria-hidden": "true" }),
            label: "边缘加深",
            value: D.edgeDarkening,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: (N) => Rt("edgeDarkening", N),
          }),
          x.jsx(Za, {
            icon: x.jsx(dc, { size: 17, "aria-hidden": "true" }),
            label: "纸纹强度",
            value: D.paperGrain,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: (N) => Rt("paperGrain", N),
          }),
          x.jsxs("label", {
            className: "toggleRow",
            children: [
              x.jsxs("span", {
                children: [x.jsx(dc, { size: 17, "aria-hidden": "true" }), "光效"],
              }),
              x.jsx("input", {
                type: "checkbox",
                checked: D.lighting,
                onChange: (N) => Rt("lighting", N.currentTarget.checked),
              }),
            ],
          }),
          x.jsxs("div", {
            className: "actionGrid",
            children: [
              x.jsxs("button", {
                type: "button",
                className: "toolButton",
                onClick: () => q((N) => !N),
                "aria-label": Q ? "继续" : "暂停",
                title: Q ? "继续" : "暂停",
                children: [
                  Q
                    ? x.jsx(Od, { size: 18, "aria-hidden": "true" })
                    : x.jsx(Md, { size: 18, "aria-hidden": "true" }),
                  x.jsx("span", { children: Q ? "继续" : "暂停" }),
                ],
              }),
              x.jsxs("button", {
                type: "button",
                className: "toolButton",
                onClick: al,
                "aria-label": "重置",
                title: "重置",
                children: [
                  x.jsx(jr, { size: 18, "aria-hidden": "true" }),
                  x.jsx("span", { children: "重置" }),
                ],
              }),
              x.jsxs("button", {
                type: "button",
                className: "toolButton primary",
                onClick: Zt,
                "aria-label": "导出",
                title: "导出",
                children: [
                  x.jsx(Ed, { size: 18, "aria-hidden": "true" }),
                  x.jsx("span", { children: "导出" }),
                ],
              }),
            ],
          }),
          x.jsxs("dl", {
            className: "telemetry",
            children: [
              x.jsxs("div", {
                children: [
                  x.jsx("dt", { children: "模拟" }),
                  x.jsx("dd", { children: vt ? `${vt.simWidth} x ${vt.simHeight}` : "待机" }),
                ],
              }),
              x.jsxs("div", {
                children: [
                  x.jsx("dt", { children: "模式" }),
                  x.jsx("dd", { children: vt?.quality ?? "fallback" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Za({ icon: M, label: m, value: b, min: s, max: U, step: A, suffix: B, onChange: L }) {
  const D = B ? `${Math.round(b)}${B}` : `${Math.round(b * 100)}%`;
  return x.jsxs("label", {
    className: "controlRow",
    children: [
      x.jsxs("span", {
        className: "controlMeta",
        children: [x.jsxs("span", { children: [M, m] }), x.jsx("strong", { children: D })],
      }),
      x.jsx("input", {
        type: "range",
        min: s,
        max: U,
        step: A,
        value: b,
        onChange: (E) => L(Number(E.currentTarget.value)),
      }),
    ],
  });
}
function Xd({ fallback: M, onReset: m }) {
  return x.jsxs("div", {
    className: "fallbackLayer",
    role: "alert",
    children: [
      x.jsxs("div", {
        className: "staticWash",
        "aria-hidden": "true",
        children: [x.jsx("span", {}), x.jsx("span", {}), x.jsx("span", {})],
      }),
      x.jsxs("div", {
        className: "fallbackCopy",
        children: [
          x.jsx("p", { className: "eyebrow", children: "fallback" }),
          x.jsx("h2", { children: M.title }),
          x.jsx("p", { children: M.message }),
          x.jsxs("div", {
            className: "fallbackActions",
            children: [
              x.jsxs("button", {
                type: "button",
                className: "toolButton",
                onClick: m,
                children: [
                  x.jsx(jr, { size: 18, "aria-hidden": "true" }),
                  x.jsx("span", { children: "重置" }),
                ],
              }),
              x.jsx("button", {
                type: "button",
                className: "toolButton",
                onClick: () => window.history.back(),
                children: x.jsx("span", { children: "返回" }),
              }),
              x.jsx("button", {
                type: "button",
                className: "toolButton primary",
                onClick: () => window.location.reload(),
                children: x.jsx("span", { children: "重载" }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Ld(M, m) {
  const b = m.getBoundingClientRect();
  if (b.width <= 2 || b.height <= 2) return;
  const s = 72;
  for (let U = 0; U < s; U += 1) {
    const A = U / (s - 1),
      B = b.left + b.width * (0.08 + A * 0.84),
      L =
        b.top +
        b.height *
          (0.58 - Math.sin(A * Math.PI * 2.2) * 0.16 + Math.sin(A * Math.PI * 6.1) * 0.035),
      D = A < 0.38 ? Oe[0].rgb : A < 0.7 ? Oe[1].rgb : Oe[2].rgb;
    M.inject(B, L, D, 0.5);
  }
}
function Qd(M, m, b, s, U) {
  const A = s.map((B) => Oe[B].rgb);
  if (A.length === 1) {
    M.inject(m, b, A[0], U);
    return;
  }
  A.forEach((B, L) => {
    const D = (L / A.length) * Math.PI * 2,
      E = L === 0 ? 0 : 7 + L * 1.5;
    M.inject(m + Math.cos(D) * E, b + Math.sin(D) * E, B, U * (L === 0 ? 0.86 : 0.52));
  });
}
function Zd(M, m, b, s, U) {
  const A = M.map((tt) => Oe[tt].rgb);
  if (A.length === 1) return A[0];
  const B = Math.max(74, U * 2.1),
    L = Math.sin((m * 0.018 + b * 0.014) * Math.PI) * 0.18,
    D = s / B + L,
    E = Hr(Math.floor(D), A.length),
    Q = Hr(E + 1, A.length),
    q = Kd(D - Math.floor(D));
  return Vd(A[E], A[Q], q);
}
function Vd(M, m, b) {
  return [M[0] + (m[0] - M[0]) * b, M[1] + (m[1] - M[1]) * b, M[2] + (m[2] - M[2]) * b];
}
function Kd(M) {
  const m = Math.min(1, Math.max(0, M));
  return m * m * (3 - 2 * m);
}
function Hr(M, m) {
  return ((M % m) + m) % m;
}
vd.createRoot(document.getElementById("root")).render(
  x.jsx(St.StrictMode, { children: x.jsx(Gd, {}) }),
);
