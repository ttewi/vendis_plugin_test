(function(i, v, c, r, o, C, R, g) {
    "use strict";
    const k = c.findByName("MurmurHashV3");

    function d(e) {
        let a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : .75,
            t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : .6;
        const n = k(e) % 360,
            l = o.chroma.hsl(n, a, t);
        return o.ReactNative.processColor(l.toString())
    }
    const {
        ScrollView: z
    } = R.General, {
        TableRowGroup: N,
        TableSwitchRow: h,
        TableRowIcon: f
    } = c.findByProps("TableRowGroup");

    function S() {
        C.useProxy(r.storage);
        const e = o.React.createElement(f, {
                source: g.getAssetIDByName("ic_tag"),
                variant: "blurple"
            }),
            a = o.React.createElement(f, {
                source: g.getAssetIDByName("ic_webhook_24px"),
                variant: "blurple"
            }),
            t = o.React.createElement(f, {
                source: g.getAssetIDByName("ic_messages"),
                variant: "blurple"
            });
        return o.React.createElement(z, {
            style: {
                flex: 1
            }
        }, o.React.createElement(N, null, o.React.createElement(h, {
            label: "Pastelize all",
            subLabel: "Ignores checking for no role",
            icon: e,
            value: r.storage.pastelizeAll ?? !1,
            onValueChange: function(n) {
                return r.storage.pastelizeAll = n
            }
        }), o.React.createElement(h, {
            label: "Pastelize webhooks by display name",
            subLabel: "Otherwise uses the webhook ID",
            icon: a,
            value: r.storage.webhookName ?? !0,
            onValueChange: function(n) {
                return r.storage.webhookName = n
            }
        }), o.React.createElement(h, {
            label: "Pastelize message content",
            subLabel: "Use RoleColorEverywhere for coloring if not using Pastelize All. Same caveats with tapping message content apply.",
            icon: t,
            value: r.storage.pastelizeContent ?? !1,
            onValueChange: function(n) {
                return r.storage.pastelizeContent = n
            }
        })))
    }
    const A = c.findByName("RowManager"),
        b = c.findByStoreName("GuildMemberStore"),
        w = c.findByProps("int2hex");
    let y;

    function p(e, a) {
        for (const t of e)
            if (t.type == "mention" && t.userId != null && t.colorString == null) {
                const n = b.getMember(a, t.userId);
                if (a != null && n == null) return;
                const l = w.int2hex(d(t.userId, .85, .75)),
                    u = w.hex2int(l);
                t.roleColor = u, t.color = u, t.colorString = l
            } else Array.isArray(t.content) && p(t.content, a)
    }

    function I(e, a) {
        const t = b.getMember(e.guildId, e.authorId);
        if (e.content && p(e.content, e.guildId), e.guildId && t == null && a?.webhookId == null) return;
        const n = r.storage.pastelizeAll ?? !1,
            l = r.storage.webhookName ?? !0,
            u = r.storage.pastelizeContent ?? !1;
        let s;
        if (a?.webhookId != null ? l ? s = e.username : s = a.webhookId : (!(a?.colorString ?? e.roleColor) && !n || n) && (s = e.authorId), s) {
            const m = d(s);
            if (e.roleColor = m, e.usernameColor = m, e.colorString = m, u && e.content) {
                const M = d(s, .85, .75);
                e.content = [{
                    content: e.content,
                    type: "link",
                    target: "usernameOnClick",
                    context: {
                        username: 1,
                        usernameOnClick: {
                            action: "0",
                            userId: "0",
                            linkColor: M,
                            messageChannelId: "0"
                        },
                        medium: !0
                    }
                }]
            }
        }
    }
    const E = function() {
            y = v.after("generate", A.prototype, function(e, a) {
                let [t] = e, {
                    message: n
                } = a;
                t.rowType === 1 && (n.shouldShowRoleOnName = !0, I(n, t.message), n.referencedMessage?.message && I(n.referencedMessage.message, null))
            })
        },
        B = function() {
            y?.()
        };
    return i.onLoad = E, i.onUnload = B, i.settings = S, i
})({}, vendetta.patcher, vendetta.metro, vendetta.plugin, vendetta.metro.common, vendetta.storage, vendetta.ui.components, vendetta.ui.assets);