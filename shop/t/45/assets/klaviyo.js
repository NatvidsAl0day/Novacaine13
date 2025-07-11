function _typeof(e) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, _typeof(e)
}

function ownKeys(e, t) {
    var o = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), o.push.apply(o, r)
    }
    return o
}

function _objectSpread(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ownKeys(Object(o), !0).forEach((function(t) {
            _defineProperty(e, t, o[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : ownKeys(Object(o)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
        }))
    }
    return e
}

function _defineProperty(e, t, o) {
    return (t = _toPropertyKey(t)) in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e
}

function _toPropertyKey(e) {
    var t = _toPrimitive(e, "string");
    return "symbol" == _typeof(t) ? t : t + ""
}

function _toPrimitive(e, t) {
    if ("object" != _typeof(e) || !e) return e;
    var o = e[Symbol.toPrimitive];
    if (void 0 !== o) {
        var r = o.call(e, t || "default");
        if ("object" != _typeof(r)) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === t ? String : Number)(e)
}
var KLAVIYO_JS_REGEX = /(\/onsite\/js\/([a-zA-Z]{6})\/klaviyo\.js\?company_id=([a-zA-Z0-9]{6}).*|\/onsite\/js\/klaviyo\.js\?company_id=([a-zA-Z0-9]{6}).*)/;

function logFailedKlaviyoJsLoad(e, t, o) {
    var r = {
        metric_group: "onsite",
        events: [{
            metric: "klaviyoJsCompanyIdMisMatch",
            log_to_statsd: !0,
            log_to_s3: !0,
            log_to_metrics_service: !1,
            event_details: {
                script: e,
                templated_company_id: t,
                fastly_forwarded: o,
                hostname: window.location.hostname
            }
        }]
    };
    fetch("https://a.klaviyo.com/onsite/track-analytics?company_id=".concat(t), {
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(r),
        method: "POST",
        mode: "cors",
        credentials: "omit"
    })
}! function(e) {
    var t = "ReuVbg",
        o = JSON.parse("[]"),
        r = "true" === "False".toLowerCase();
    if (!(document.currentScript && document.currentScript instanceof HTMLScriptElement && document.currentScript.src && document.currentScript.src.match(KLAVIYO_JS_REGEX)) || null !== (e = document.currentScript.src) && void 0 !== e && e.includes(t)) {
        var n = window.klaviyoModulesObject;
        if (/musical_ly|bytedance/i.test(navigator.userAgent) && (window.tikTokEvent = {
                company_id: t,
                kl_key: window.__klKey,
                fastly_forwarded: r
            }, n)) {
            var i = n,
                c = i.companyId,
                a = i.serverSideRendered;
            window.tikTokEvent = _objectSpread(_objectSpread({}, window.tikTokEvent), {}, {
                window_company_id: c,
                server_side_rendered: a
            })
        }
        var s = new URL(window.location.href);
        if (s.searchParams.has("crawler") && "tiktok_preloading" === s.searchParams.get("crawler") && (window.tikTokCrawler = {
                company_id: t,
                kl_key: window.__klKey
            }), window.klKeyCollision = window.__klKey && window.__klKey !== t ? {
                companyId: t,
                klKey: window.__klKey
            } : void 0, window._learnq = window._learnq || [], window.__klKey = window.__klKey || t, n || (window._learnq.push(["account", t]), n = {
                companyId: t,
                loadTime: new Date,
                loadedModules: {},
                loadedCss: {},
                serverSideRendered: !0,
                assetSource: "",
                v2Route: r,
                extendedIdIdentifiers: o
            }, Object.defineProperty(window, "klaviyoModulesObject", {
                value: n,
                enumerable: !1
            })), t === n.companyId && n.serverSideRendered) {
            var d, l, y, p = {},
                u = document,
                f = u.head,
                w = JSON.parse("noModule" in u.createElement("script") || function() {
                    try {
                        return new Function('import("")'), !0
                    } catch (e) {
                        return !1
                    }
                }() ? "99aedb4bfc97bc3.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/vendors~in_app_forms~signup_f.7b8bb44ce06b964e3631.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/default~in_app_forms~signup_forms~onsite\u002Dtriggering.7a64e488a2e875dd465a.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/default~in_ap~signup_forms.fcc3a143c64fb2b31734.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/signup_forms.a8cbfce61e5f030aaeae.js?cb\u003D1\u0022]}, \u0022event_adapter\u0022: {\u0022js\u0022: [\u0022https://static.klaviyo.com/onsite/js/runtime.d8c161514e5ebe096fc7.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/event_adapter.7cf9e35416b96205a69b.js?cb\u003D1\u0022]}}" : "{\u0022static\u0022: {\u0022js\u0022: [\u0022https://static\u002Dtracking.klaviyo.com/onsite/js/fender_analytics.5fc1ffdd7712f047a625.js?cb\u003D1\u0022, \u0022https://static\u002Dtracking.klaviyo.com/onsite/js/static.870c4d2b6540aba4c64c.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/runtime.0ae6b01b5fabc979ead7.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/sharedUtils.53add35503a2c730efac.js?cb\u003D1\u0022]}, \u0022signup_forms\u0022: {\u0022js\u0022: [\u0022https://static.klaviyo.com/onsite/js/runtime.0ae6b01b5fabc979ead7.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/sharedUtils.53add35503a2c730efac.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/vendors~in_app_forms~signup_forms~post_identification_sync~web_personalization~reviews~atlas.114530157d07eb90d07a.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/vendors~in_app_forms~signup_forms~onsite\u002Dtriggering~customerHubRoot~renderWishlistButton.7a1f438ac3beb0f0aa8e.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/vendors~in_app_forms~signup_forms~reviews~atlas.817198d7f6c498ff8c4d.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/vendors~in_app_forms~signup_forms.7b8bb44ce06b964e3631.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/default~in_app_forms~signup_forms~onsite\u002Dtriggering.d8d9f244ea7e1b05f660.js?cb\u003D1\u0022, \u0022https://static.klaviyo.com/onsite/js/default~in_app_fc.klaviyo.com/onsite/js/signup_forms.39fffef1a7d87ab7f070.js?cb\u003D1\u0022]}, \u0022event_adapter\u0022: {\u0022js\u0022: [\u0022https://static.klaviyo.com/onsite/js/runtime.0ae6b01b5fabc979ead7.js?cb\u003D1\u0022, \u0022https://static.klaviyo."),
                m = n,
                _ = m.loadedCss,
                v = m.loadedModules;
            for (d in w)
                if (w.hasOwnProperty(d)) {
                    var b = w[d];
                    b.js.forEach((function(e) {
                        var t = e.split("?")[0];
                        t && !v[t] && (k(e), v[t] = (new Date).toISOString())
                    }));
                    var S = b.css;
                    S && !_[S] && (l = S, y = void 0, (y = u.createElement("link")).rel = "stylesheet", y.href = l, f.appendChild(y), _[S] = (new Date).toISOString())
                }
        } else console.warn("Already loaded for account ".concat(n.companyId, ". Skipping account ").concat(t, "."))
    } else {
        console.warn("Not loading ".concat(document.currentScript.src, " for ").concat(t));
        try {
            logFailedKlaviyoJsLoad(document.currentScript.src, t, r)
        } catch (e) {
            console.warn("Error logging klaviyo.js company mismatch")
        }
    }

    function k(e) {
        if (!p[e]) {
            var t = u.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = e, t.crossOrigin = "anonymous", f.appendChild(t), p[e] = !0
        }
    }
}();