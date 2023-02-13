/* Bootstrap */
if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+(function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] };
        return !1;
    }
    (a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one(a.support.transition.end, function() {
            c = !0;
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end);
        };
        return setTimeout(e, b), this;
    }),
        a(function() {
            a.support.transition = b();
        });
})(jQuery),
    +(function(a) {
        "use strict";
        var b = '[data-dismiss="alert"]',
            c = function(c) {
                a(c).on("click", b, this.close);
            };
        c.prototype.close = function(b) {
            function c() {
                f.trigger("closed.bs.alert").remove();
            }
            var d = a(this),
                e = d.attr("data-target");
            e ||
                ((e = d.attr("href")),
                (e = e && e.replace(/.*(?=#[^\s]*$)/, "")));
            var f = a(e);
            b && b.preventDefault(),
                f.length || (f = d.hasClass("alert") ? d : d.parent()),
                f.trigger((b = a.Event("close.bs.alert"))),
                b.isDefaultPrevented() ||
                    (f.removeClass("in"),
                    a.support.transition && f.hasClass("fade")
                        ? f
                              .one(a.support.transition.end, c)
                              .emulateTransitionEnd(150)
                        : c());
        };
        var d = a.fn.alert;
        (a.fn.alert = function(b) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.alert");
                e || d.data("bs.alert", (e = new c(this))),
                    "string" == typeof b && e[b].call(d);
            });
        }),
            (a.fn.alert.Constructor = c),
            (a.fn.alert.noConflict = function() {
                return (a.fn.alert = d), this;
            }),
            a(document).on("click.bs.alert.data-api", b, c.prototype.close);
    })(jQuery),
    +(function(a) {
        "use strict";
        var b = function(c, d) {
            (this.$element = a(c)),
                (this.options = a.extend({}, b.DEFAULTS, d)),
                (this.isLoading = !1);
        };
        (b.DEFAULTS = { loadingText: "loading..." }),
            (b.prototype.setState = function(b) {
                var c = "disabled",
                    d = this.$element,
                    e = d.is("input") ? "val" : "html",
                    f = d.data();
                (b += "Text"),
                    f.resetText || d.data("resetText", d[e]()),
                    d[e](f[b] || this.options[b]),
                    setTimeout(
                        a.proxy(function() {
                            "loadingText" == b
                                ? ((this.isLoading = !0),
                                  d.addClass(c).attr(c, c))
                                : this.isLoading &&
                                  ((this.isLoading = !1),
                                  d.removeClass(c).removeAttr(c));
                        }, this),
                        0
                    );
            }),
            (b.prototype.toggle = function() {
                var a = !0,
                    b = this.$element.closest('[data-toggle="buttons"]');
                if (b.length) {
                    var c = this.$element.find("input");
                    "radio" == c.prop("type") &&
                        (c.prop("checked") && this.$element.hasClass("active")
                            ? (a = !1)
                            : b.find(".active").removeClass("active")),
                        a &&
                            c
                                .prop(
                                    "checked",
                                    !this.$element.hasClass("active")
                                )
                                .trigger("change");
                }
                a && this.$element.toggleClass("active");
            });
        var c = a.fn.button;
        (a.fn.button = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.button"),
                    f = "object" == typeof c && c;
                e || d.data("bs.button", (e = new b(this, f))),
                    "toggle" == c ? e.toggle() : c && e.setState(c);
            });
        }),
            (a.fn.button.Constructor = b),
            (a.fn.button.noConflict = function() {
                return (a.fn.button = c), this;
            }),
            a(document).on(
                "click.bs.button.data-api",
                "[data-toggle^=button]",
                function(b) {
                    var c = a(b.target);
                    c.hasClass("btn") || (c = c.closest(".btn")),
                        c.button("toggle"),
                        b.preventDefault();
                }
            );
    })(jQuery),
    +(function(a) {
        "use strict";
        var b = function(b, c) {
            (this.$element = a(b)),
                (this.$indicators = this.$element.find(".carousel-indicators")),
                (this.options = c),
                (this.paused = this.sliding = this.interval = this.$active = this.$items = null),
                "hover" == this.options.pause &&
                    this.$element
                        .on("mouseenter", a.proxy(this.pause, this))
                        .on("mouseleave", a.proxy(this.cycle, this));
        };
        (b.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 }),
            (b.prototype.cycle = function(b) {
                return (
                    b || (this.paused = !1),
                    this.interval && clearInterval(this.interval),
                    this.options.interval &&
                        !this.paused &&
                        (this.interval = setInterval(
                            a.proxy(this.next, this),
                            this.options.interval
                        )),
                    this
                );
            }),
            (b.prototype.getActiveIndex = function() {
                return (
                    (this.$active = this.$element.find(".item.active")),
                    (this.$items = this.$active.parent().children()),
                    this.$items.index(this.$active)
                );
            }),
            (b.prototype.to = function(b) {
                var c = this,
                    d = this.getActiveIndex();
                return b > this.$items.length - 1 || 0 > b
                    ? void 0
                    : this.sliding
                    ? this.$element.one("slid.bs.carousel", function() {
                          c.to(b);
                      })
                    : d == b
                    ? this.pause().cycle()
                    : this.slide(b > d ? "next" : "prev", a(this.$items[b]));
            }),
            (b.prototype.pause = function(b) {
                return (
                    b || (this.paused = !0),
                    this.$element.find(".next, .prev").length &&
                        a.support.transition &&
                        (this.$element.trigger(a.support.transition.end),
                        this.cycle(!0)),
                    (this.interval = clearInterval(this.interval)),
                    this
                );
            }),
            (b.prototype.next = function() {
                return this.sliding ? void 0 : this.slide("next");
            }),
            (b.prototype.prev = function() {
                return this.sliding ? void 0 : this.slide("prev");
            }),
            (b.prototype.slide = function(b, c) {
                var d = this.$element.find(".item.active"),
                    e = c || d[b](),
                    f = this.interval,
                    g = "next" == b ? "left" : "right",
                    h = "next" == b ? "first" : "last",
                    i = this;
                if (!e.length) {
                    if (!this.options.wrap) return;
                    e = this.$element.find(".item")[h]();
                }
                if (e.hasClass("active")) return (this.sliding = !1);
                var j = a.Event("slide.bs.carousel", {
                    relatedTarget: e[0],
                    direction: g
                });
                return (
                    this.$element.trigger(j),
                    j.isDefaultPrevented()
                        ? void 0
                        : ((this.sliding = !0),
                          f && this.pause(),
                          this.$indicators.length &&
                              (this.$indicators
                                  .find(".active")
                                  .removeClass("active"),
                              this.$element.one("slid.bs.carousel", function() {
                                  var b = a(
                                      i.$indicators.children()[
                                          i.getActiveIndex()
                                      ]
                                  );
                                  b && b.addClass("active");
                              })),
                          a.support.transition &&
                          this.$element.hasClass("slide")
                              ? (e.addClass(b),
                                e[0].offsetWidth,
                                d.addClass(g),
                                e.addClass(g),
                                d
                                    .one(a.support.transition.end, function() {
                                        e
                                            .removeClass([b, g].join(" "))
                                            .addClass("active"),
                                            d.removeClass(
                                                ["active", g].join(" ")
                                            ),
                                            (i.sliding = !1),
                                            setTimeout(function() {
                                                i.$element.trigger(
                                                    "slid.bs.carousel"
                                                );
                                            }, 0);
                                    })
                                    .emulateTransitionEnd(
                                        1e3 *
                                            d
                                                .css("transition-duration")
                                                .slice(0, -1)
                                    ))
                              : (d.removeClass("active"),
                                e.addClass("active"),
                                (this.sliding = !1),
                                this.$element.trigger("slid.bs.carousel")),
                          f && this.cycle(),
                          this)
                );
            });
        var c = a.fn.carousel;
        (a.fn.carousel = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.carousel"),
                    f = a.extend(
                        {},
                        b.DEFAULTS,
                        d.data(),
                        "object" == typeof c && c
                    ),
                    g = "string" == typeof c ? c : f.slide;
                e || d.data("bs.carousel", (e = new b(this, f))),
                    "number" == typeof c
                        ? e.to(c)
                        : g
                        ? e[g]()
                        : f.interval && e.pause().cycle();
            });
        }),
            (a.fn.carousel.Constructor = b),
            (a.fn.carousel.noConflict = function() {
                return (a.fn.carousel = c), this;
            }),
            a(document).on(
                "click.bs.carousel.data-api",
                "[data-slide], [data-slide-to]",
                function(b) {
                    var c,
                        d = a(this),
                        e = a(
                            d.attr("data-target") ||
                                ((c = d.attr("href")) &&
                                    c.replace(/.*(?=#[^\s]+$)/, ""))
                        ),
                        f = a.extend({}, e.data(), d.data()),
                        g = d.attr("data-slide-to");
                    g && (f.interval = !1),
                        e.carousel(f),
                        (g = d.attr("data-slide-to")) &&
                            e.data("bs.carousel").to(g),
                        b.preventDefault();
                }
            ),
            a(window).on("load", function() {
                a('[data-ride="carousel"]').each(function() {
                    var b = a(this);
                    b.carousel(b.data());
                });
            });
    })(jQuery),
    +(function(a) {
        "use strict";
        var b = function(c, d) {
            (this.$element = a(c)),
                (this.options = a.extend({}, b.DEFAULTS, d)),
                (this.transitioning = null),
                this.options.parent && (this.$parent = a(this.options.parent)),
                this.options.toggle && this.toggle();
        };
        (b.DEFAULTS = { toggle: !0 }),
            (b.prototype.dimension = function() {
                var a = this.$element.hasClass("width");
                return a ? "width" : "height";
            }),
            (b.prototype.show = function() {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var b = a.Event("show.bs.collapse");
                    if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
                        var c =
                            this.$parent && this.$parent.find("> .panel > .in");
                        if (c && c.length) {
                            var d = c.data("bs.collapse");
                            if (d && d.transitioning) return;
                            c.collapse("hide"),
                                d || c.data("bs.collapse", null);
                        }
                        var e = this.dimension();
                        this.$element
                            .removeClass("collapse")
                            .addClass("collapsing")
                            [e](0),
                            (this.transitioning = 1);
                        var f = function() {
                            this.$element
                                .removeClass("collapsing")
                                .addClass("collapse in")
                                [e]("auto"),
                                (this.transitioning = 0),
                                this.$element.trigger("shown.bs.collapse");
                        };
                        if (!a.support.transition) return f.call(this);
                        var g = a.camelCase(["scroll", e].join("-"));
                        this.$element
                            .one(a.support.transition.end, a.proxy(f, this))
                            .emulateTransitionEnd(350)
                            [e](this.$element[0][g]);
                    }
                }
            }),
            (b.prototype.hide = function() {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var b = a.Event("hide.bs.collapse");
                    if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
                        var c = this.dimension();
                        this.$element[c](this.$element[c]())[0].offsetHeight,
                            this.$element
                                .addClass("collapsing")
                                .removeClass("collapse")
                                .removeClass("in"),
                            (this.transitioning = 1);
                        var d = function() {
                            (this.transitioning = 0),
                                this.$element
                                    .trigger("hidden.bs.collapse")
                                    .removeClass("collapsing")
                                    .addClass("collapse");
                        };
                        return a.support.transition
                            ? void this.$element[c](0)
                                  .one(
                                      a.support.transition.end,
                                      a.proxy(d, this)
                                  )
                                  .emulateTransitionEnd(350)
                            : d.call(this);
                    }
                }
            }),
            (b.prototype.toggle = function() {
                this[this.$element.hasClass("in") ? "hide" : "show"]();
            });
        var c = a.fn.collapse;
        (a.fn.collapse = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.collapse"),
                    f = a.extend(
                        {},
                        b.DEFAULTS,
                        d.data(),
                        "object" == typeof c && c
                    );
                !e && f.toggle && "show" == c && (c = !c),
                    e || d.data("bs.collapse", (e = new b(this, f))),
                    "string" == typeof c && e[c]();
            });
        }),
            (a.fn.collapse.Constructor = b),
            (a.fn.collapse.noConflict = function() {
                return (a.fn.collapse = c), this;
            }),
            a(document).on(
                "click.bs.collapse.data-api",
                "[data-toggle=collapse]",
                function(b) {
                    var c,
                        d = a(this),
                        e =
                            d.attr("data-target") ||
                            b.preventDefault() ||
                            ((c = d.attr("href")) &&
                                c.replace(/.*(?=#[^\s]+$)/, "")),
                        f = a(e),
                        g = f.data("bs.collapse"),
                        h = g ? "toggle" : d.data(),
                        i = d.attr("data-parent"),
                        j = i && a(i);
                    (g && g.transitioning) ||
                        (j &&
                            j
                                .find(
                                    '[data-toggle=collapse][data-parent="' +
                                        i +
                                        '"]'
                                )
                                .not(d)
                                .addClass("collapsed"),
                        d[f.hasClass("in") ? "addClass" : "removeClass"](
                            "collapsed"
                        )),
                        f.collapse(h);
                }
            );
    })(jQuery),
    +(function(a) {
        "use strict";
        function b(b) {
            a(d).remove(),
                a(e).each(function() {
                    var d = c(a(this)),
                        e = { relatedTarget: this };
                    d.hasClass("open") &&
                        (d.trigger((b = a.Event("hide.bs.dropdown", e))),
                        b.isDefaultPrevented() ||
                            d
                                .removeClass("open")
                                .trigger("hidden.bs.dropdown", e));
                });
        }
        function c(b) {
            var c = b.attr("data-target");
            c ||
                ((c = b.attr("href")),
                (c =
                    c &&
                    /#[A-Za-z]/.test(c) &&
                    c.replace(/.*(?=#[^\s]*$)/, "")));
            var d = c && a(c);
            return d && d.length ? d : b.parent();
        }
        var d = ".dropdown-backdrop",
            e = "[data-toggle=dropdown]",
            f = function(b) {
                a(b).on("click.bs.dropdown", this.toggle);
            };
        (f.prototype.toggle = function(d) {
            var e = a(this);
            if (!e.is(".disabled, :disabled")) {
                var f = c(e),
                    g = f.hasClass("open");
                if ((b(), !g)) {
                    "ontouchstart" in document.documentElement &&
                        !f.closest(".navbar-nav").length &&
                        a('<div class="dropdown-backdrop"/>')
                            .insertAfter(a(this))
                            .on("click", b);
                    var h = { relatedTarget: this };
                    if (
                        (f.trigger((d = a.Event("show.bs.dropdown", h))),
                        d.isDefaultPrevented())
                    )
                        return;
                    f.toggleClass("open").trigger("shown.bs.dropdown", h),
                        e.focus();
                }
                return !1;
            }
        }),
            (f.prototype.keydown = function(b) {
                if (/(38|40|27)/.test(b.keyCode)) {
                    var d = a(this);
                    if (
                        (b.preventDefault(),
                        b.stopPropagation(),
                        !d.is(".disabled, :disabled"))
                    ) {
                        var f = c(d),
                            g = f.hasClass("open");
                        if (!g || (g && 27 == b.keyCode))
                            return (
                                27 == b.which && f.find(e).focus(), d.click()
                            );
                        var h = " li:not(.divider):visible a",
                            i = f.find(
                                "[role=menu]" + h + ", [role=listbox]" + h
                            );
                        if (i.length) {
                            var j = i.index(i.filter(":focus"));
                            38 == b.keyCode && j > 0 && j--,
                                40 == b.keyCode && j < i.length - 1 && j++,
                                ~j || (j = 0),
                                i.eq(j).focus();
                        }
                    }
                }
            });
        var g = a.fn.dropdown;
        (a.fn.dropdown = function(b) {
            return this.each(function() {
                var c = a(this),
                    d = c.data("bs.dropdown");
                d || c.data("bs.dropdown", (d = new f(this))),
                    "string" == typeof b && d[b].call(c);
            });
        }),
            (a.fn.dropdown.Constructor = f),
            (a.fn.dropdown.noConflict = function() {
                return (a.fn.dropdown = g), this;
            }),
            a(document)
                .on("click.bs.dropdown.data-api", b)
                .on("click.bs.dropdown.data-api", ".dropdown form", function(
                    a
                ) {
                    a.stopPropagation();
                })
                .on("click.bs.dropdown.data-api", e, f.prototype.toggle)
                .on(
                    "keydown.bs.dropdown.data-api",
                    e + ", [role=menu], [role=listbox]",
                    f.prototype.keydown
                );
    })(jQuery),
    +(function(a) {
        "use strict";
        var b = function(b, c) {
            (this.options = c),
                (this.$element = a(b)),
                (this.$backdrop = this.isShown = null),
                this.options.remote &&
                    this.$element.find(".modal-content").load(
                        this.options.remote,
                        a.proxy(function() {
                            this.$element.trigger("loaded.bs.modal");
                        }, this)
                    );
        };
        (b.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
            (b.prototype.toggle = function(a) {
                return this[this.isShown ? "hide" : "show"](a);
            }),
            (b.prototype.show = function(b) {
                var c = this,
                    d = a.Event("show.bs.modal", { relatedTarget: b });
                this.$element.trigger(d),
                    this.isShown ||
                        d.isDefaultPrevented() ||
                        ((this.isShown = !0),
                        this.escape(),
                        this.$element.on(
                            "click.dismiss.bs.modal",
                            '[data-dismiss="modal"]',
                            a.proxy(this.hide, this)
                        ),
                        this.backdrop(function() {
                            var d =
                                a.support.transition &&
                                c.$element.hasClass("fade");
                            c.$element.parent().length ||
                                c.$element.appendTo(document.body),
                                c.$element.show().scrollTop(0),
                                d && c.$element[0].offsetWidth,
                                c.$element
                                    .addClass("in")
                                    .attr("aria-hidden", !1),
                                c.enforceFocus();
                            var e = a.Event("shown.bs.modal", {
                                relatedTarget: b
                            });
                            d
                                ? c.$element
                                      .find(".modal-dialog")
                                      .one(
                                          a.support.transition.end,
                                          function() {
                                              c.$element.focus().trigger(e);
                                          }
                                      )
                                      .emulateTransitionEnd(300)
                                : c.$element.focus().trigger(e);
                        }));
            }),
            (b.prototype.hide = function(b) {
                b && b.preventDefault(),
                    (b = a.Event("hide.bs.modal")),
                    this.$element.trigger(b),
                    this.isShown &&
                        !b.isDefaultPrevented() &&
                        ((this.isShown = !1),
                        this.escape(),
                        a(document).off("focusin.bs.modal"),
                        this.$element
                            .removeClass("in")
                            .attr("aria-hidden", !0)
                            .off("click.dismiss.bs.modal"),
                        a.support.transition && this.$element.hasClass("fade")
                            ? this.$element
                                  .one(
                                      a.support.transition.end,
                                      a.proxy(this.hideModal, this)
                                  )
                                  .emulateTransitionEnd(300)
                            : this.hideModal());
            }),
            (b.prototype.enforceFocus = function() {
                a(document)
                    .off("focusin.bs.modal")
                    .on(
                        "focusin.bs.modal",
                        a.proxy(function(a) {
                            this.$element[0] === a.target ||
                                this.$element.has(a.target).length ||
                                this.$element.focus();
                        }, this)
                    );
            }),
            (b.prototype.escape = function() {
                this.isShown && this.options.keyboard
                    ? this.$element.on(
                          "keyup.dismiss.bs.modal",
                          a.proxy(function(a) {
                              27 == a.which && this.hide();
                          }, this)
                      )
                    : this.isShown ||
                      this.$element.off("keyup.dismiss.bs.modal");
            }),
            (b.prototype.hideModal = function() {
                var a = this;
                this.$element.hide(),
                    this.backdrop(function() {
                        a.removeBackdrop(),
                            a.$element.trigger("hidden.bs.modal");
                    });
            }),
            (b.prototype.removeBackdrop = function() {
                this.$backdrop && this.$backdrop.remove(),
                    (this.$backdrop = null);
            }),
            (b.prototype.backdrop = function(b) {
                var c = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var d = a.support.transition && c;
                    if (
                        ((this.$backdrop = a(
                            '<div class="modal-backdrop ' + c + '" />'
                        ).appendTo(document.body)),
                        this.$element.on(
                            "click.dismiss.bs.modal",
                            a.proxy(function(a) {
                                a.target === a.currentTarget &&
                                    ("static" == this.options.backdrop
                                        ? this.$element[0].focus.call(
                                              this.$element[0]
                                          )
                                        : this.hide.call(this));
                            }, this)
                        ),
                        d && this.$backdrop[0].offsetWidth,
                        this.$backdrop.addClass("in"),
                        !b)
                    )
                        return;
                    d
                        ? this.$backdrop
                              .one(a.support.transition.end, b)
                              .emulateTransitionEnd(150)
                        : b();
                } else
                    !this.isShown && this.$backdrop
                        ? (this.$backdrop.removeClass("in"),
                          a.support.transition && this.$element.hasClass("fade")
                              ? this.$backdrop
                                    .one(a.support.transition.end, b)
                                    .emulateTransitionEnd(150)
                              : b())
                        : b && b();
            });
        var c = a.fn.modal;
        (a.fn.modal = function(c, d) {
            return this.each(function() {
                var e = a(this),
                    f = e.data("bs.modal"),
                    g = a.extend(
                        {},
                        b.DEFAULTS,
                        e.data(),
                        "object" == typeof c && c
                    );
                f || e.data("bs.modal", (f = new b(this, g))),
                    "string" == typeof c ? f[c](d) : g.show && f.show(d);
            });
        }),
            (a.fn.modal.Constructor = b),
            (a.fn.modal.noConflict = function() {
                return (a.fn.modal = c), this;
            }),
            a(document).on(
                "click.bs.modal.data-api",
                '[data-toggle="modal"]',
                function(b) {
                    var c = a(this),
                        d = c.attr("href"),
                        e = a(
                            c.attr("data-target") ||
                                (d && d.replace(/.*(?=#[^\s]+$)/, ""))
                        ),
                        f = e.data("bs.modal")
                            ? "toggle"
                            : a.extend(
                                  { remote: !/#/.test(d) && d },
                                  e.data(),
                                  c.data()
                              );
                    c.is("a") && b.preventDefault(),
                        e.modal(f, this).one("hide", function() {
                            c.is(":visible") && c.focus();
                        });
                }
            ),
            a(document)
                .on("show.bs.modal", ".modal", function() {
                    a(document.body).addClass("modal-open");
                })
                .on("hidden.bs.modal", ".modal", function() {
                    a(document.body).removeClass("modal-open");
                });
    })(jQuery),
    +(function(a) {
        "use strict";
        var b = function(a, b) {
            (this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null),
                this.init("tooltip", a, b);
        };
        (b.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template:
                '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1
        }),
            (b.prototype.init = function(b, c, d) {
                (this.enabled = !0),
                    (this.type = b),
                    (this.$element = a(c)),
                    (this.options = this.getOptions(d));
                for (
                    var e = this.options.trigger.split(" "), f = e.length;
                    f--;

                ) {
                    var g = e[f];
                    if ("click" == g)
                        this.$element.on(
                            "click." + this.type,
                            this.options.selector,
                            a.proxy(this.toggle, this)
                        );
                    else if ("manual" != g) {
                        var h = "hover" == g ? "mouseenter" : "focusin",
                            i = "hover" == g ? "mouseleave" : "focusout";
                        this.$element.on(
                            h + "." + this.type,
                            this.options.selector,
                            a.proxy(this.enter, this)
                        ),
                            this.$element.on(
                                i + "." + this.type,
                                this.options.selector,
                                a.proxy(this.leave, this)
                            );
                    }
                }
                this.options.selector
                    ? (this._options = a.extend({}, this.options, {
                          trigger: "manual",
                          selector: ""
                      }))
                    : this.fixTitle();
            }),
            (b.prototype.getDefaults = function() {
                return b.DEFAULTS;
            }),
            (b.prototype.getOptions = function(b) {
                return (
                    (b = a.extend(
                        {},
                        this.getDefaults(),
                        this.$element.data(),
                        b
                    )),
                    b.delay &&
                        "number" == typeof b.delay &&
                        (b.delay = { show: b.delay, hide: b.delay }),
                    b
                );
            }),
            (b.prototype.getDelegateOptions = function() {
                var b = {},
                    c = this.getDefaults();
                return (
                    this._options &&
                        a.each(this._options, function(a, d) {
                            c[a] != d && (b[a] = d);
                        }),
                    b
                );
            }),
            (b.prototype.enter = function(b) {
                var c =
                    b instanceof this.constructor
                        ? b
                        : a(b.currentTarget)
                              [this.type](this.getDelegateOptions())
                              .data("bs." + this.type);
                return (
                    clearTimeout(c.timeout),
                    (c.hoverState = "in"),
                    c.options.delay && c.options.delay.show
                        ? void (c.timeout = setTimeout(function() {
                              "in" == c.hoverState && c.show();
                          }, c.options.delay.show))
                        : c.show()
                );
            }),
            (b.prototype.leave = function(b) {
                var c =
                    b instanceof this.constructor
                        ? b
                        : a(b.currentTarget)
                              [this.type](this.getDelegateOptions())
                              .data("bs." + this.type);
                return (
                    clearTimeout(c.timeout),
                    (c.hoverState = "out"),
                    c.options.delay && c.options.delay.hide
                        ? void (c.timeout = setTimeout(function() {
                              "out" == c.hoverState && c.hide();
                          }, c.options.delay.hide))
                        : c.hide()
                );
            }),
            (b.prototype.show = function() {
                var b = a.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    if ((this.$element.trigger(b), b.isDefaultPrevented()))
                        return;
                    var c = this,
                        d = this.tip();
                    this.setContent(),
                        this.options.animation && d.addClass("fade");
                    var e =
                            "function" == typeof this.options.placement
                                ? this.options.placement.call(
                                      this,
                                      d[0],
                                      this.$element[0]
                                  )
                                : this.options.placement,
                        f = /\s?auto?\s?/i,
                        g = f.test(e);
                    g && (e = e.replace(f, "") || "top"),
                        d
                            .detach()
                            .css({ top: 0, left: 0, display: "block" })
                            .addClass(e),
                        this.options.container
                            ? d.appendTo(this.options.container)
                            : d.insertAfter(this.$element);
                    var h = this.getPosition(),
                        i = d[0].offsetWidth,
                        j = d[0].offsetHeight;
                    if (g) {
                        var k = this.$element.parent(),
                            l = e,
                            m =
                                document.documentElement.scrollTop ||
                                document.body.scrollTop,
                            n =
                                "body" == this.options.container
                                    ? window.innerWidth
                                    : k.outerWidth(),
                            o =
                                "body" == this.options.container
                                    ? window.innerHeight
                                    : k.outerHeight(),
                            p =
                                "body" == this.options.container
                                    ? 0
                                    : k.offset().left;
                        (e =
                            "bottom" == e && h.top + h.height + j - m > o
                                ? "top"
                                : "top" == e && h.top - m - j < 0
                                ? "bottom"
                                : "right" == e && h.right + i > n
                                ? "left"
                                : "left" == e && h.left - i < p
                                ? "right"
                                : e),
                            d.removeClass(l).addClass(e);
                    }
                    var q = this.getCalculatedOffset(e, h, i, j);
                    this.applyPlacement(q, e), (this.hoverState = null);
                    var r = function() {
                        c.$element.trigger("shown.bs." + c.type);
                    };
                    a.support.transition && this.$tip.hasClass("fade")
                        ? d
                              .one(a.support.transition.end, r)
                              .emulateTransitionEnd(150)
                        : r();
                }
            }),
            (b.prototype.applyPlacement = function(b, c) {
                var d,
                    e = this.tip(),
                    f = e[0].offsetWidth,
                    g = e[0].offsetHeight,
                    h = parseInt(e.css("margin-top"), 10),
                    i = parseInt(e.css("margin-left"), 10);
                isNaN(h) && (h = 0),
                    isNaN(i) && (i = 0),
                    (b.top = b.top + h),
                    (b.left = b.left + i),
                    a.offset.setOffset(
                        e[0],
                        a.extend(
                            {
                                using: function(a) {
                                    e.css({
                                        top: Math.round(a.top),
                                        left: Math.round(a.left)
                                    });
                                }
                            },
                            b
                        ),
                        0
                    ),
                    e.addClass("in");
                var j = e[0].offsetWidth,
                    k = e[0].offsetHeight;
                if (
                    ("top" == c &&
                        k != g &&
                        ((d = !0), (b.top = b.top + g - k)),
                    /bottom|top/.test(c))
                ) {
                    var l = 0;
                    b.left < 0 &&
                        ((l = -2 * b.left),
                        (b.left = 0),
                        e.offset(b),
                        (j = e[0].offsetWidth),
                        (k = e[0].offsetHeight)),
                        this.replaceArrow(l - f + j, j, "left");
                } else this.replaceArrow(k - g, k, "top");
                d && e.offset(b);
            }),
            (b.prototype.replaceArrow = function(a, b, c) {
                this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
            }),
            (b.prototype.setContent = function() {
                var a = this.tip(),
                    b = this.getTitle();
                a
                    .find(".tooltip-inner")
                    [this.options.html ? "html" : "text"](b),
                    a.removeClass("fade in top bottom left right");
            }),
            (b.prototype.hide = function() {
                function b() {
                    "in" != c.hoverState && d.detach(),
                        c.$element.trigger("hidden.bs." + c.type);
                }
                var c = this,
                    d = this.tip(),
                    e = a.Event("hide.bs." + this.type);
                return (
                    this.$element.trigger(e),
                    e.isDefaultPrevented()
                        ? void 0
                        : (d.removeClass("in"),
                          a.support.transition && this.$tip.hasClass("fade")
                              ? d
                                    .one(a.support.transition.end, b)
                                    .emulateTransitionEnd(150)
                              : b(),
                          (this.hoverState = null),
                          this)
                );
            }),
            (b.prototype.fixTitle = function() {
                var a = this.$element;
                (a.attr("title") ||
                    "string" != typeof a.attr("data-original-title")) &&
                    a
                        .attr("data-original-title", a.attr("title") || "")
                        .attr("title", "");
            }),
            (b.prototype.hasContent = function() {
                return this.getTitle();
            }),
            (b.prototype.getPosition = function() {
                var b = this.$element[0];
                return a.extend(
                    {},
                    "function" == typeof b.getBoundingClientRect
                        ? b.getBoundingClientRect()
                        : { width: b.offsetWidth, height: b.offsetHeight },
                    this.$element.offset()
                );
            }),
            (b.prototype.getCalculatedOffset = function(a, b, c, d) {
                return "bottom" == a
                    ? {
                          top: b.top + b.height,
                          left: b.left + b.width / 2 - c / 2
                      }
                    : "top" == a
                    ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 }
                    : "left" == a
                    ? { top: b.top + b.height / 2 - d / 2, left: b.left - c }
                    : {
                          top: b.top + b.height / 2 - d / 2,
                          left: b.left + b.width
                      };
            }),
            (b.prototype.getTitle = function() {
                var a,
                    b = this.$element,
                    c = this.options;
                return (a =
                    b.attr("data-original-title") ||
                    ("function" == typeof c.title
                        ? c.title.call(b[0])
                        : c.title));
            }),
            (b.prototype.tip = function() {
                return (this.$tip = this.$tip || a(this.options.template));
            }),
            (b.prototype.arrow = function() {
                return (this.$arrow =
                    this.$arrow || this.tip().find(".tooltip-arrow"));
            }),
            (b.prototype.validate = function() {
                this.$element[0].parentNode ||
                    (this.hide(),
                    (this.$element = null),
                    (this.options = null));
            }),
            (b.prototype.enable = function() {
                this.enabled = !0;
            }),
            (b.prototype.disable = function() {
                this.enabled = !1;
            }),
            (b.prototype.toggleEnabled = function() {
                this.enabled = !this.enabled;
            }),
            (b.prototype.toggle = function(b) {
                var c = b
                    ? a(b.currentTarget)
                          [this.type](this.getDelegateOptions())
                          .data("bs." + this.type)
                    : this;
                c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
            }),
            (b.prototype.destroy = function() {
                clearTimeout(this.timeout),
                    this.hide()
                        .$element.off("." + this.type)
                        .removeData("bs." + this.type);
            });
        var c = a.fn.tooltip;
        (a.fn.tooltip = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.tooltip"),
                    f = "object" == typeof c && c;
                (e || "destroy" != c) &&
                    (e || d.data("bs.tooltip", (e = new b(this, f))),
                    "string" == typeof c && e[c]());
            });
        }),
            (a.fn.tooltip.Constructor = b),
            (a.fn.tooltip.noConflict = function() {
                return (a.fn.tooltip = c), this;
            });
    })(jQuery),
    +(function(a) {
        "use strict";
        var b = function(a, b) {
            this.init("popover", a, b);
        };
        if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
        (b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template:
                '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        })),
            (b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)),
            (b.prototype.constructor = b),
            (b.prototype.getDefaults = function() {
                return b.DEFAULTS;
            }),
            (b.prototype.setContent = function() {
                var a = this.tip(),
                    b = this.getTitle(),
                    c = this.getContent();
                a
                    .find(".popover-title")
                    [this.options.html ? "html" : "text"](b),
                    a
                        .find(".popover-content")
                        [
                            this.options.html
                                ? "string" == typeof c
                                    ? "html"
                                    : "append"
                                : "text"
                        ](c),
                    a.removeClass("fade top bottom left right in"),
                    a.find(".popover-title").html() ||
                        a.find(".popover-title").hide();
            }),
            (b.prototype.hasContent = function() {
                return this.getTitle() || this.getContent();
            }),
            (b.prototype.getContent = function() {
                var a = this.$element,
                    b = this.options;
                return (
                    a.attr("data-content") ||
                    ("function" == typeof b.content
                        ? b.content.call(a[0])
                        : b.content)
                );
            }),
            (b.prototype.arrow = function() {
                return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
            }),
            (b.prototype.tip = function() {
                return (
                    this.$tip || (this.$tip = a(this.options.template)),
                    this.$tip
                );
            });
        var c = a.fn.popover;
        (a.fn.popover = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.popover"),
                    f = "object" == typeof c && c;
                (e || "destroy" != c) &&
                    (e || d.data("bs.popover", (e = new b(this, f))),
                    "string" == typeof c && e[c]());
            });
        }),
            (a.fn.popover.Constructor = b),
            (a.fn.popover.noConflict = function() {
                return (a.fn.popover = c), this;
            });
    })(jQuery),
    +(function(a) {
        "use strict";
        function b(c, d) {
            var e,
                f = a.proxy(this.process, this);
            (this.$element = a(a(c).is("body") ? window : c)),
                (this.$body = a("body")),
                (this.$scrollElement = this.$element.on(
                    "scroll.bs.scroll-spy.data-api",
                    f
                )),
                (this.options = a.extend({}, b.DEFAULTS, d)),
                (this.selector =
                    (this.options.target ||
                        ((e = a(c).attr("href")) &&
                            e.replace(/.*(?=#[^\s]+$)/, "")) ||
                        "") + " .nav li > a"),
                (this.offsets = a([])),
                (this.targets = a([])),
                (this.activeTarget = null),
                this.refresh(),
                this.process();
        }
        (b.DEFAULTS = { offset: 10 }),
            (b.prototype.refresh = function() {
                var b = this.$element[0] == window ? "offset" : "position";
                (this.offsets = a([])), (this.targets = a([]));
                {
                    var c = this;
                    this.$body
                        .find(this.selector)
                        .map(function() {
                            var d = a(this),
                                e = d.data("target") || d.attr("href"),
                                f = /^#./.test(e) && a(e);
                            return (
                                (f &&
                                    f.length &&
                                    f.is(":visible") && [
                                        [
                                            f[b]().top +
                                                (!a.isWindow(
                                                    c.$scrollElement.get(0)
                                                ) &&
                                                    c.$scrollElement.scrollTop()),
                                            e
                                        ]
                                    ]) ||
                                null
                            );
                        })
                        .sort(function(a, b) {
                            return a[0] - b[0];
                        })
                        .each(function() {
                            c.offsets.push(this[0]), c.targets.push(this[1]);
                        });
                }
            }),
            (b.prototype.process = function() {
                var a,
                    b = this.$scrollElement.scrollTop() + this.options.offset,
                    c =
                        this.$scrollElement[0].scrollHeight ||
                        this.$body[0].scrollHeight,
                    d = c - this.$scrollElement.height(),
                    e = this.offsets,
                    f = this.targets,
                    g = this.activeTarget;
                if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
                if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
                for (a = e.length; a--; )
                    g != f[a] &&
                        b >= e[a] &&
                        (!e[a + 1] || b <= e[a + 1]) &&
                        this.activate(f[a]);
            }),
            (b.prototype.activate = function(b) {
                (this.activeTarget = b),
                    a(this.selector)
                        .parentsUntil(this.options.target, ".active")
                        .removeClass("active");
                var c =
                        this.selector +
                        '[data-target="' +
                        b +
                        '"],' +
                        this.selector +
                        '[href="' +
                        b +
                        '"]',
                    d = a(c)
                        .parents("li")
                        .addClass("active");
                d.parent(".dropdown-menu").length &&
                    (d = d.closest("li.dropdown").addClass("active")),
                    d.trigger("activate.bs.scrollspy");
            });
        var c = a.fn.scrollspy;
        (a.fn.scrollspy = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.scrollspy"),
                    f = "object" == typeof c && c;
                e || d.data("bs.scrollspy", (e = new b(this, f))),
                    "string" == typeof c && e[c]();
            });
        }),
            (a.fn.scrollspy.Constructor = b),
            (a.fn.scrollspy.noConflict = function() {
                return (a.fn.scrollspy = c), this;
            }),
            a(window).on("load", function() {
                a('[data-spy="scroll"]').each(function() {
                    var b = a(this);
                    b.scrollspy(b.data());
                });
            });
    })(jQuery),
    +(function(a) {
        "use strict";
        var b = function(b) {
            this.element = a(b);
        };
        (b.prototype.show = function() {
            var b = this.element,
                c = b.closest("ul:not(.dropdown-menu)"),
                d = b.data("target");
            if (
                (d ||
                    ((d = b.attr("href")),
                    (d = d && d.replace(/.*(?=#[^\s]*$)/, ""))),
                !b.parent("li").hasClass("active"))
            ) {
                var e = c.find(".active:last a")[0],
                    f = a.Event("show.bs.tab", { relatedTarget: e });
                if ((b.trigger(f), !f.isDefaultPrevented())) {
                    var g = a(d);
                    this.activate(b.parent("li"), c),
                        this.activate(g, g.parent(), function() {
                            b.trigger({
                                type: "shown.bs.tab",
                                relatedTarget: e
                            });
                        });
                }
            }
        }),
            (b.prototype.activate = function(b, c, d) {
                function e() {
                    f
                        .removeClass("active")
                        .find("> .dropdown-menu > .active")
                        .removeClass("active"),
                        b.addClass("active"),
                        g
                            ? (b[0].offsetWidth, b.addClass("in"))
                            : b.removeClass("fade"),
                        b.parent(".dropdown-menu") &&
                            b.closest("li.dropdown").addClass("active"),
                        d && d();
                }
                var f = c.find("> .active"),
                    g = d && a.support.transition && f.hasClass("fade");
                g
                    ? f
                          .one(a.support.transition.end, e)
                          .emulateTransitionEnd(150)
                    : e(),
                    f.removeClass("in");
            });
        var c = a.fn.tab;
        (a.fn.tab = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.tab");
                e || d.data("bs.tab", (e = new b(this))),
                    "string" == typeof c && e[c]();
            });
        }),
            (a.fn.tab.Constructor = b),
            (a.fn.tab.noConflict = function() {
                return (a.fn.tab = c), this;
            }),
            a(document).on(
                "click.bs.tab.data-api",
                '[data-toggle="tab"], [data-toggle="pill"]',
                function(b) {
                    b.preventDefault(), a(this).tab("show");
                }
            );
    })(jQuery),
    +(function(a) {
        "use strict";
        var b = function(c, d) {
            (this.options = a.extend({}, b.DEFAULTS, d)),
                (this.$window = a(window)
                    .on(
                        "scroll.bs.affix.data-api",
                        a.proxy(this.checkPosition, this)
                    )
                    .on(
                        "click.bs.affix.data-api",
                        a.proxy(this.checkPositionWithEventLoop, this)
                    )),
                (this.$element = a(c)),
                (this.affixed = this.unpin = this.pinnedOffset = null),
                this.checkPosition();
        };
        (b.RESET = "affix affix-top affix-bottom"),
            (b.DEFAULTS = { offset: 0 }),
            (b.prototype.getPinnedOffset = function() {
                if (this.pinnedOffset) return this.pinnedOffset;
                this.$element.removeClass(b.RESET).addClass("affix");
                var a = this.$window.scrollTop(),
                    c = this.$element.offset();
                return (this.pinnedOffset = c.top - a);
            }),
            (b.prototype.checkPositionWithEventLoop = function() {
                setTimeout(a.proxy(this.checkPosition, this), 1);
            }),
            (b.prototype.checkPosition = function() {
                if (this.$element.is(":visible")) {
                    var c = a(document).height(),
                        d = this.$window.scrollTop(),
                        e = this.$element.offset(),
                        f = this.options.offset,
                        g = f.top,
                        h = f.bottom;
                    "top" == this.affixed && (e.top += d),
                        "object" != typeof f && (h = g = f),
                        "function" == typeof g && (g = f.top(this.$element)),
                        "function" == typeof h && (h = f.bottom(this.$element));
                    var i =
                        null != this.unpin && d + this.unpin <= e.top
                            ? !1
                            : null != h &&
                              e.top + this.$element.height() >= c - h
                            ? "bottom"
                            : null != g && g >= d
                            ? "top"
                            : !1;
                    if (this.affixed !== i) {
                        this.unpin && this.$element.css("top", "");
                        var j = "affix" + (i ? "-" + i : ""),
                            k = a.Event(j + ".bs.affix");
                        this.$element.trigger(k),
                            k.isDefaultPrevented() ||
                                ((this.affixed = i),
                                (this.unpin =
                                    "bottom" == i
                                        ? this.getPinnedOffset()
                                        : null),
                                this.$element
                                    .removeClass(b.RESET)
                                    .addClass(j)
                                    .trigger(
                                        a.Event(j.replace("affix", "affixed"))
                                    ),
                                "bottom" == i &&
                                    this.$element.offset({
                                        top: c - h - this.$element.height()
                                    }));
                    }
                }
            });
        var c = a.fn.affix;
        (a.fn.affix = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.affix"),
                    f = "object" == typeof c && c;
                e || d.data("bs.affix", (e = new b(this, f))),
                    "string" == typeof c && e[c]();
            });
        }),
            (a.fn.affix.Constructor = b),
            (a.fn.affix.noConflict = function() {
                return (a.fn.affix = c), this;
            }),
            a(window).on("load", function() {
                a('[data-spy="affix"]').each(function() {
                    var b = a(this),
                        c = b.data();
                    (c.offset = c.offset || {}),
                        c.offsetBottom && (c.offset.bottom = c.offsetBottom),
                        c.offsetTop && (c.offset.top = c.offsetTop),
                        b.affix(c);
                });
            });
    })(jQuery);
/* API Haravan */
function floatToString(a, r) {
    var t = a.toFixed(r).toString();
    return (
        t.replace(".", Haravan.decimal),
        t.match("^[." + Haravan.decimal + "]d+") ? "0" + t : t
    );
}
function attributeToString(a) {
    return (
        "string" != typeof a && ((a += ""), "undefined" === a && (a = "")),
        jQuery.trim(a)
    );
}
"undefined" == typeof Haravan && (Haravan = {}),
    (Haravan.cultures = [
        {
            code: "vi-VN",
            thousands: ",",
            decimal: ".",
            numberdecimal: 0,
            money_format: ""
        },
        {
            code: "en-US",
            thousands: ",",
            decimal: ".",
            numberdecimal: 2,
            money_format: ""
        }
    ]),
    (Haravan.getCulture = function(a) {
        var r;
        for (n = 0; n < Haravan.cultures.length; n++)
            if (Haravan.cultures[n].code == a) {
                r = Haravan.cultures[n];
                break;
            }
        return r || (r = Haravan.cultures[0]), r;
    }),
    (Haravan.format = Haravan.getCulture(Haravan.culture)),
    (Haravan.money_format = ""),
    (Haravan.onError = function(XMLHttpRequest, textStatus) {
        var data = eval("(" + XMLHttpRequest.responseText + ")");
        data.message
            ? alert(data.message + "(" + data.status + "): " + data.description)
            : alert(
                  "Error : " +
                      Haravan.fullMessagesFromErrors(data).join("; ") +
                      "."
              );
    }),
    (Haravan.fullMessagesFromErrors = function(a) {
        var r = [];
        return (
            jQuery.each(a, function(a, t) {
                jQuery.each(t, function(t, n) {
                    r.push(a + " " + n);
                });
            }),
            r
        );
    }),
    (Haravan.onCartUpdate = function(a) {
        alert("There are now " + a.item_count + " items in the cart.");
    }),
    (Haravan.onCartShippingRatesUpdate = function(a, r) {
        var t = "";
        r.zip && (t += r.zip + ", "),
            r.province && (t += r.province + ", "),
            (t += r.country),
            alert(
                "There are " +
                    a.length +
                    " shipping rates available for " +
                    t +
                    ", starting at " +
                    Haravan.formatMoney(a[0].price) +
                    "."
            );
    }),
    (Haravan.onItemAdded = function(a) {
        alert(a.title + " was added to your shopping cart.");
    }),
    (Haravan.onProduct = function(a) {
        alert("Received everything we ever wanted to know about " + a.title);
    }),
    (Haravan.formatMoney = function(a, r) {
        function t(a) {
            return a.replace(
                /(\d)(?=(\d\d\d)+(?!\d))/g,
                "$1" + Haravan.format.thousands
            );
        }
        (a /= 100),
            "string" == typeof a &&
                (a = a.replace(Haravan.format.thousands, ""));
        var n = "",
            e = /\{\{\s*(\w+)\s*\}\}/,
            o = r || this.money_format;
        switch (o.match(e)[1]) {
            case "amount":
                n = t(floatToString(a, Haravan.format.numberdecimal));
                break;
            case "amount_no_decimals":
                n = t(floatToString(a, 0));
                break;
            case "amount_with_comma_separator":
                n = floatToString(a, Haravan.format.numberdecimal).replace(
                    /\./,
                    ","
                );
                break;
            case "amount_no_decimals_with_comma_separator":
                n = t(floatToString(a, 0)).replace(/\./, ",");
        }
        return o.replace(e, n);
    }),
    (Haravan.resizeImage = function(a, r) {
        try {
            if ("original" == r) return a;
            var t = a.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
            return t[1].replace(/http:/g, "") + "_" + r + "." + t[2];
        } catch (n) {
            return a.replace(/http:/g, "");
        }
    }),
    (Haravan.addItem = function(a, r, t) {
        var r = r || 1,
            n = {
                type: "POST",
                url: "/cart/add.js",
                data: "quantity=" + r + "&id=" + a,
                dataType: "json",
                success: function(a) {
                    "function" == typeof t ? t(a) : Haravan.onItemAdded(a);
                },
                error: function(a, r) {
                    Haravan.onError(a, r);
                }
            };
        jQuery.ajax(n);
    }),
    (Haravan.addItemFromForm = function(a, r) {
        var t = {
            type: "POST",
            url: "/cart/add.js",
            data: jQuery("#" + a).serialize(),
            dataType: "json",
            success: function(a) {
                "function" == typeof r ? r(a) : Haravan.onItemAdded(a);
            },
            error: function(a, r) {
                Haravan.onError(a, r);
            }
        };
        jQuery.ajax(t);
    }),
    (Haravan.getCart = function(a) {
        jQuery.getJSON("/cart.js", function(r) {
            "function" == typeof a ? a(r) : Haravan.onCartUpdate(r);
        });
    }),
    (Haravan.getCartShippingRatesForDestination = function(a, r) {
        var t = {
            type: "GET",
            url: "/cart/shipping_rates.json",
            data: Haravan.param({ shipping_address: a }),
            dataType: "json",
            success: function(t) {
                (rates = t.shipping_rates),
                    "function" == typeof r
                        ? r(rates, a)
                        : Haravan.onCartShippingRatesUpdate(rates, a);
            },
            error: function(a, r) {
                Haravan.onError(a, r);
            }
        };
        jQuery.ajax(t);
    }),
    (Haravan.getProduct = function(a, r) {
        jQuery.getJSON("/products/" + a + ".js", function(a) {
            "function" == typeof r ? r(a) : Haravan.onProduct(a);
        });
    }),
    (Haravan.changeItem = function(a, r, t) {
        var n = {
            type: "POST",
            url: "/cart/change.js",
            data: "quantity=" + r + "&id=" + a,
            dataType: "json",
            success: function(a) {
                "function" == typeof t ? t(a) : Haravan.onCartUpdate(a);
            },
            error: function(a, r) {
                Haravan.onError(a, r);
            }
        };
        jQuery.ajax(n);
    }),
    (Haravan.removeItem = function(a, r) {
        var t = {
            type: "POST",
            url: "/cart/change.js",
            data: "quantity=0&id=" + a,
            dataType: "json",
            success: function(a) {
                "function" == typeof r ? r(a) : Haravan.onCartUpdate(a);
            },
            error: function(a, r) {
                Haravan.onError(a, r);
            }
        };
        jQuery.ajax(t);
    }),
    (Haravan.clear = function(a) {
        var r = {
            type: "POST",
            url: "/cart/clear.js",
            data: "",
            dataType: "json",
            success: function(r) {
                "function" == typeof a ? a(r) : Haravan.onCartUpdate(r);
            },
            error: function(a, r) {
                Haravan.onError(a, r);
            }
        };
        jQuery.ajax(r);
    }),
    (Haravan.updateCartFromForm = function(a, r) {
        var t = {
            type: "POST",
            url: "/cart/update.js",
            data: jQuery("#" + a).serialize(),
            dataType: "json",
            success: function(a) {
                "function" == typeof r ? r(a) : Haravan.onCartUpdate(a);
            },
            error: function(a, r) {
                Haravan.onError(a, r);
            }
        };
        jQuery.ajax(t);
    }),
    (Haravan.updateCartAttributes = function(a, r) {
        var t = "";
        jQuery.isArray(a)
            ? jQuery.each(a, function(a, r) {
                  var n = attributeToString(r.key);
                  "" !== n &&
                      (t +=
                          "attributes[" +
                          n +
                          "]=" +
                          attributeToString(r.value) +
                          "&");
              })
            : "object" == typeof a &&
              null !== a &&
              jQuery.each(a, function(a, r) {
                  t +=
                      "attributes[" +
                      attributeToString(a) +
                      "]=" +
                      attributeToString(r) +
                      "&";
              });
        var n = {
            type: "POST",
            url: "/cart/update.js",
            data: t,
            dataType: "json",
            success: function(a) {
                "function" == typeof r ? r(a) : Haravan.onCartUpdate(a);
            },
            error: function(a, r) {
                Haravan.onError(a, r);
            }
        };
        jQuery.ajax(n);
    }),
    (Haravan.updateCartNote = function(a, r) {
        var t = {
            type: "POST",
            url: "/cart/update.js",
            data: "note=" + attributeToString(a),
            dataType: "json",
            success: function(a) {
                "function" == typeof r ? r(a) : Haravan.onCartUpdate(a);
            },
            error: function(a, r) {
                Haravan.onError(a, r);
            }
        };
        jQuery.ajax(t);
    }),
    jQuery.fn.jquery >= "1.4"
        ? (Haravan.param = jQuery.param)
        : ((Haravan.param = function(a) {
              var r = [],
                  t = function(a, t) {
                      (t = jQuery.isFunction(t) ? t() : t),
                          (r[r.length] =
                              encodeURIComponent(a) +
                              "=" +
                              encodeURIComponent(t));
                  };
              if (jQuery.isArray(a) || a.jquery)
                  jQuery.each(a, function() {
                      t(this.name, this.value);
                  });
              else for (var n in a) Haravan.buildParams(n, a[n], t);
              return r.join("&").replace(/%20/g, "+");
          }),
          (Haravan.buildParams = function(a, r, t) {
              jQuery.isArray(r) && r.length
                  ? jQuery.each(r, function(r, n) {
                        rbracket.test(a)
                            ? t(a, n)
                            : Haravan.buildParams(
                                  a +
                                      "[" +
                                      ("object" == typeof n || jQuery.isArray(n)
                                          ? r
                                          : "") +
                                      "]",
                                  n,
                                  t
                              );
                    })
                  : null != r && "object" == typeof r
                  ? Haravan.isEmptyObject(r)
                      ? t(a, "")
                      : jQuery.each(r, function(r, n) {
                            Haravan.buildParams(a + "[" + r + "]", n, t);
                        })
                  : t(a, r);
          }),
          (Haravan.isEmptyObject = function(a) {
              for (var r in a) return !1;
              return !0;
          }));
/* Selection Haravan */
function floatToString(t, e) {
    var a = t.toFixed(e).toString();
    return (
        a.replace(".", Haravan.decimal),
        a.match("^[." + Haravan.decimal + "]d+") ? "0" + a : a
    );
}
if ("undefined" == typeof Haravan) var Haravan = {};
(Haravan.cultures = [
    {
        code: "vi-VN",
        thousands: ",",
        decimal: ".",
        numberdecimal: 0,
        money_format: ""
    },
    {
        code: "en-US",
        thousands: ",",
        decimal: ".",
        numberdecimal: 2,
        money_format: ""
    }
]),
    (Haravan.getCulture = function(t) {
        var e;
        for (n = 0; n < Haravan.cultures.length; n++)
            if (Haravan.cultures[n].code == t) {
                e = Haravan.cultures[n];
                break;
            }
        return e || (e = Haravan.cultures[0]), e;
    }),
    (Haravan.format = Haravan.getCulture(Haravan.culture)),
    (Haravan.money_format = ""),
    (Haravan.each = function(t, e) {
        for (var a = 0; a < t.length; a++) e(t[a], a);
    }),
    (Haravan.map = function(t, e) {
        for (var a = [], r = 0; r < t.length; r++) a.push(e(t[r], r));
        return a;
    }),
    (Haravan.arrayIncludes = function(t, e) {
        for (var a = 0; a < t.length; a++) if (t[a] == e) return !0;
        return !1;
    }),
    (Haravan.uniq = function(t) {
        for (var e = [], a = 0; a < t.length; a++)
            Haravan.arrayIncludes(e, t[a]) || e.push(t[a]);
        return e;
    }),
    (Haravan.isDefined = function(t) {
        return "undefined" != typeof t;
    }),
    (Haravan.getClass = function(t) {
        return Object.prototype.toString.call(t).slice(8, -1);
    }),
    (Haravan.extend = function(t, e) {
        function a() {}
        (a.prototype = e.prototype),
            (t.prototype = new a()),
            (t.prototype.constructor = t),
            (t.baseConstructor = e),
            (t.superClass = e.prototype);
    }),
    (Haravan.urlParam = function(t) {
        var e = RegExp("[?&]" + t + "=([^&]*)").exec(window.location.search);
        return e && decodeURIComponent(e[1].replace(/\+/g, " "));
    }),
    (Haravan.Product = function(t) {
        Haravan.isDefined(t) && this.update(t);
    }),
    (Haravan.Product.prototype.update = function(t) {
        for (property in t) this[property] = t[property];
    }),
    (Haravan.Product.prototype.optionNames = function() {
        return "Array" == Haravan.getClass(this.options) ? this.options : [];
    }),
    (Haravan.Product.prototype.optionValues = function(t) {
        if (!Haravan.isDefined(this.variants)) return null;
        var e = Haravan.map(this.variants, function(e) {
            var a = "option" + (t + 1);
            return void 0 == e[a] ? null : e[a];
        });
        return null == e[0] ? null : Haravan.uniq(e);
    }),
    (Haravan.Product.prototype.getVariant = function(t) {
        var e = null;
        return t.length != this.options.length
            ? e
            : (Haravan.each(this.variants, function(a) {
                  for (var r = !0, n = 0; n < t.length; n++) {
                      var o = "option" + (n + 1);
                      a[o] != t[n] && (r = !1);
                  }
                  return 1 == r ? void (e = a) : void 0;
              }),
              e);
    }),
    (Haravan.Product.prototype.getVariantById = function(t) {
        for (var e = 0; e < this.variants.length; e++) {
            var a = this.variants[e];
            if (t == a.id) return a;
        }
        return null;
    }),
    (Haravan.formatMoney = function(t, e) {
        function a(t) {
            return t.replace(
                /(\d)(?=(\d\d\d)+(?!\d))/g,
                "$1" + Haravan.format.thousands
            );
        }
        (t /= 100),
            "string" == typeof t &&
                (t = t.replace(Haravan.format.thousands, ""));
        var r = "",
            n = /\{\{\s*(\w+)\s*\}\}/,
            o = e || this.money_format;
        switch (o.match(n)[1]) {
            case "amount":
                r = a(floatToString(t, Haravan.format.numberdecimal));
                break;
            case "amount_no_decimals":
                r = a(floatToString(t, 0));
                break;
            case "amount_with_comma_separator":
                r = floatToString(t, Haravan.format.numberdecimal).replace(
                    /\./,
                    ","
                );
                break;
            case "amount_no_decimals_with_comma_separator":
                r = a(floatToString(t, 0)).replace(/\./, ",");
        }
        return o.replace(n, r);
    }),
    (Haravan.OptionSelectors = function(t, e) {
        return (
            (this.selectorDivClass = "selector-wrapper"),
            (this.selectorClass = "single-option-selector"),
            (this.variantIdFieldIdSuffix = "-variant-id"),
            (this.variantIdField = null),
            (this.historyState = null),
            (this.selectors = []),
            (this.domIdPrefix = t),
            (this.product = new Haravan.Product(e.product)),
            (this.onVariantSelected = Haravan.isDefined(e.onVariantSelected)
                ? e.onVariantSelected
                : function() {}),
            this.replaceSelector(t),
            this.initDropdown(),
            e.enableHistoryState &&
                (this.historyState = new Haravan.OptionSelectors.HistoryState(
                    this
                )),
            !0
        );
    }),
    (Haravan.OptionSelectors.prototype.initDropdown = function() {
        var t = { initialLoad: !0 },
            e = this.selectVariantFromDropdown(t);
        if (!e) {
            var a = this;
            setTimeout(function() {
                a.selectVariantFromParams(t) ||
                    a.fireOnChangeForFirstDropdown.call(a, t);
            });
        }
    }),
    (Haravan.OptionSelectors.prototype.fireOnChangeForFirstDropdown = function(
        t
    ) {
        !this.selectors &&
            !this.selectors.length &&
            this.selectors.length > 0 &&
            this.selectors[0].element.onchange(t);
    }),
    (Haravan.OptionSelectors.prototype.selectVariantFromParamsOrDropdown = function(
        t
    ) {
        var e = this.selectVariantFromParams(t);
        e || this.selectVariantFromDropdown(t);
    }),
    (Haravan.OptionSelectors.prototype.replaceSelector = function(t) {
        var e = document.getElementById(t);
        if (null != e) {
            var a = e.parentNode;
            Haravan.each(this.buildSelectors(), function(t) {
                a.insertBefore(t, e);
            }),
                (e.style.display = "none"),
                (this.variantIdField = e);
        }
    }),
    (Haravan.OptionSelectors.prototype.selectVariantFromDropdown = function(t) {
        var e = document.getElementById(this.domIdPrefix);
        if (!e) return !1;
        if (((e = e.querySelector("[selected]")), null != e)) {
            var a = e.value;
            return this.selectVariant(a, t);
        }
        return !1;
    }),
    (Haravan.OptionSelectors.prototype.selectVariantFromParams = function(t) {
        var e = Haravan.urlParam("variant");
        return this.selectVariant(e, t);
    }),
    (Haravan.OptionSelectors.prototype.selectVariant = function(t, e) {
        var a = this.product.getVariantById(t);
        if (null == a) return !1;
        for (var r = 0; r < this.selectors.length; r++) {
            var n = this.selectors[r].element,
                o = n.getAttribute("data-option"),
                i = a[o];
            null != i && this.optionExistInSelect(n, i) && (n.value = i);
        }
        return (
            "undefined" != typeof jQuery
                ? jQuery(this.selectors[0].element).trigger("change", e)
                : this.selectors[0].element.onchange(e),
            !0
        );
    }),
    (Haravan.OptionSelectors.prototype.optionExistInSelect = function(t, e) {
        for (var a = 0; a < t.options.length; a++)
            if (t.options[a].value == e) return !0;
    }),
    (Haravan.OptionSelectors.prototype.insertSelectors = function(t, e) {
        Haravan.isDefined(e) && this.setMessageElement(e),
            (this.domIdPrefix =
                "product-" + this.product.id + "-variant-selector");
        var a = document.getElementById(t);
        return a
            ? void Haravan.each(this.buildSelectors(), function(t) {
                  a.appendChild(t);
              })
            : !1;
    }),
    (Haravan.OptionSelectors.prototype.buildSelectors = function() {
        for (var t = 0; t < this.product.optionNames().length; t++) {
            var e = new Haravan.SingleOptionSelector(
                this,
                t,
                this.product.optionNames()[t],
                this.product.optionValues(t)
            );
            (e.element.disabled = !1), this.selectors.push(e);
        }
        var a = this.selectorDivClass,
            r = this.product.optionNames(),
            n = Haravan.map(this.selectors, function(t) {
                var e = document.createElement("div");
                if ((e.setAttribute("class", a), r.length > 1)) {
                    var n = document.createElement("label");
                    (n.htmlFor = t.element.id),
                        (n.innerHTML = t.name),
                        e.appendChild(n);
                }
                return e.appendChild(t.element), e;
            });
        return n;
    }),
    (Haravan.OptionSelectors.prototype.selectedValues = function() {
        for (var t = [], e = 0; e < this.selectors.length; e++) {
            var a = this.selectors[e].element.value;
            t.push(a);
        }
        return t;
    }),
    (Haravan.OptionSelectors.prototype.updateSelectors = function(t, e) {
        var a = this.selectedValues(),
            r = this.product.getVariant(a);
        r
            ? ((this.variantIdField.disabled = !1),
              (this.variantIdField.value = r.id))
            : (this.variantIdField.disabled = !0),
            this.onVariantSelected(r, this, e),
            null != this.historyState &&
                this.historyState.onVariantChange(r, this, e);
    }),
    (Haravan.OptionSelectorsFromDOM = function(t, e) {
        var a = e.optionNames || [],
            r = e.priceFieldExists || !0,
            n = e.delimiter || "/",
            o = this.createProductFromSelector(t, a, r, n);
        (e.product = o),
            Haravan.OptionSelectorsFromDOM.baseConstructor.call(this, t, e);
    }),
    Haravan.extend(Haravan.OptionSelectorsFromDOM, Haravan.OptionSelectors),
    (Haravan.OptionSelectorsFromDOM.prototype.createProductFromSelector = function(
        t,
        e,
        a,
        r
    ) {
        if (!Haravan.isDefined(a)) var a = !0;
        if (!Haravan.isDefined(r)) var r = "/";
        var n = document.getElementById(t);
        if (!n) return !1;
        var o = n.childNodes,
            i = (n.parentNode, e.length),
            s = [];
        Haravan.each(o, function(t) {
            if (1 == t.nodeType && "option" == t.tagName.toLowerCase()) {
                var n = t.innerHTML.split(new RegExp("\\s*\\" + r + "\\s*"));
                0 == e.length && (i = n.length - (a ? 1 : 0));
                var o = n.slice(0, i),
                    l = a ? n[i] : "",
                    c =
                        (t.getAttribute("value"),
                        {
                            available: !t.disabled,
                            id: parseFloat(t.value),
                            price: l,
                            option1: o[0],
                            option2: o[1],
                            option3: o[2]
                        });
                s.push(c);
            }
        });
        var l = { variants: s };
        if (0 == e.length) {
            l.options = [];
            for (var c = 0; i > c; c++) l.options[c] = "option " + (c + 1);
        } else l.options = e;
        return l;
    }),
    (Haravan.SingleOptionSelector = function(t, e, a, r) {
        if (
            ((this.multiSelector = t),
            (this.values = r),
            (this.index = e),
            (this.name = a),
            (this.element = document.createElement("select")),
            void 0 != this.values)
        )
            for (var n = 0; n < this.values.length; n++) {
                var o = document.createElement("option");
                (o.value = r[n]),
                    (o.innerHTML = r[n]),
                    this.element.appendChild(o);
            }
        return (
            this.element.setAttribute(
                "class",
                this.multiSelector.selectorClass
            ),
            this.element.setAttribute("data-option", "option" + (e + 1)),
            (this.element.id = t.domIdPrefix + "-option-" + e),
            (this.element.onchange = function(a, r) {
                (r = r || {}), t.updateSelectors(e, r);
            }),
            !0
        );
    }),
    (Haravan.Image = {
        preload: function(t, e) {
            for (var a = 0; a < t.length; a++) {
                var r = t[a];
                this.loadImage(this.getSizedImageUrl(r, e));
            }
        },
        loadImage: function(t) {
            new Image().src = t;
        },
        switchImage: function(t, e, a) {
            if (t) {
                var r = this.imageSize(e.src),
                    n = this.getSizedImageUrl(t.src, r);
                a ? a(n, t, e) : (e.src = n);
            }
        },
        imageSize: function(t) {
            var e = t.match(
                /(1024x1024|2048x2048|pico|icon|thumb|small|compact|medium|large|grande)\./
            );
            return null != e ? e[1] : null;
        },
        getSizedImageUrl: function(t, e) {
            if (null == e) return t;
            if ("master" == e) return this.removeProtocol(t);
            var a = t.match(
                /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?/
            );
            if (null != a) {
                var r = t.split(a[0]),
                    n = a[0];
                return this.removeProtocol(r[0] + "_" + e + n);
            }
            return null;
        },
        removeProtocol: function(t) {
            return t.replace(/http(s)?:/, "");
        }
    }),
    (Haravan.OptionSelectors.HistoryState = function(t) {
        this.browserSupports() && this.register(t);
    }),
    (Haravan.OptionSelectors.HistoryState.prototype.register = function(t) {
        window.addEventListener("popstate", function() {
            t.selectVariantFromParamsOrDropdown({ popStateCall: !0 });
        });
    }),
    (Haravan.OptionSelectors.HistoryState.prototype.onVariantChange = function(
        t,
        e,
        a
    ) {
        this.browserSupports() &&
            (!t ||
                a.initialLoad ||
                a.popStateCall ||
                window.history.pushState(
                    {},
                    document.title,
                    "?variant=" + t.id
                ));
    }),
    (Haravan.OptionSelectors.HistoryState.prototype.browserSupports = function() {
        return window.history && window.history.pushState;
    });
/* rangeslider */
(function(f) {
    "function" === typeof define && define.amd
        ? define(["jquery"], function(n) {
              return f(n, document, window, navigator);
          })
        : "object" === typeof exports
        ? f(require("jquery"), document, window, navigator)
        : f(jQuery, document, window, navigator);
})(function(f, n, k, r, p) {
    var t = 0,
        m = (function() {
            var a = r.userAgent,
                b = /msie\s\d+/i;
            return 0 < a.search(b) &&
                ((a = b.exec(a).toString()), (a = a.split(" ")[1]), 9 > a)
                ? (f("html").addClass("lt-ie9"), !0)
                : !1;
        })();
    Function.prototype.bind ||
        (Function.prototype.bind = function(a) {
            var b = this,
                d = [].slice;
            if ("function" != typeof b) throw new TypeError();
            var c = d.call(arguments, 1),
                e = function() {
                    if (this instanceof e) {
                        var g = function() {};
                        g.prototype = b.prototype;
                        var g = new g(),
                            l = b.apply(g, c.concat(d.call(arguments)));
                        return Object(l) === l ? l : g;
                    }
                    return b.apply(a, c.concat(d.call(arguments)));
                };
            return e;
        });
    Array.prototype.indexOf ||
        (Array.prototype.indexOf = function(a, b) {
            if (null == this)
                throw new TypeError('"this" is null or not defined');
            var d = Object(this),
                c = d.length >>> 0;
            if (0 === c) return -1;
            var e = +b || 0;
            Infinity === Math.abs(e) && (e = 0);
            if (e >= c) return -1;
            for (e = Math.max(0 <= e ? e : c - Math.abs(e), 0); e < c; ) {
                if (e in d && d[e] === a) return e;
                e++;
            }
            return -1;
        });
    var q = function(a, b, d) {
        this.VERSION = "2.2.0";
        this.input = a;
        this.plugin_count = d;
        this.old_to = this.old_from = this.update_tm = this.calc_count = this.current_plugin = 0;
        this.raf_id = this.old_min_interval = null;
        this.no_diapason = this.force_redraw = this.dragging = !1;
        this.has_tab_index = !0;
        this.is_update = this.is_key = !1;
        this.is_start = !0;
        this.is_click = this.is_resize = this.is_active = this.is_finish = !1;
        b = b || {};
        this.$cache = {
            win: f(k),
            body: f(n.body),
            input: f(a),
            cont: null,
            rs: null,
            min: null,
            max: null,
            from: null,
            to: null,
            single: null,
            bar: null,
            line: null,
            s_single: null,
            s_from: null,
            s_to: null,
            shad_single: null,
            shad_from: null,
            shad_to: null,
            edge: null,
            grid: null,
            grid_labels: []
        };
        this.coords = {
            x_gap: 0,
            x_pointer: 0,
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single_fake: 0,
            p_single_real: 0,
            p_from_fake: 0,
            p_from_real: 0,
            p_to_fake: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        };
        this.labels = {
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,
            p_min: 0,
            p_max: 0,
            p_from_fake: 0,
            p_from_left: 0,
            p_to_fake: 0,
            p_to_left: 0,
            p_single_fake: 0,
            p_single_left: 0
        };
        var c = this.$cache.input;
        a = c.prop("value");
        var e;
        d = {
            type: "single",
            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,
            min_interval: 0,
            max_interval: 0,
            drag_interval: !1,
            values: [],
            p_values: [],
            from_fixed: !1,
            from_min: null,
            from_max: null,
            from_shadow: !1,
            to_fixed: !1,
            to_min: null,
            to_max: null,
            to_shadow: !1,
            prettify_enabled: !0,
            prettify_separator: " ",
            prettify: null,
            force_edges: !1,
            keyboard: !0,
            grid: !1,
            grid_margin: !0,
            grid_num: 4,
            grid_snap: !1,
            hide_min_max: !1,
            hide_from_to: !1,
            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: !0,
            values_separator: " \u2014 ",
            input_values_separator: ";",
            disable: !1,
            block: !1,
            extra_classes: "",
            scope: null,
            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null
        };
        "INPUT" !== c[0].nodeName &&
            console &&
            console.warn &&
            console.warn("Base element should be <input>!", c[0]);
        c = {
            type: c.data("type"),
            min: c.data("min"),
            max: c.data("max"),
            from: c.data("from"),
            to: c.data("to"),
            step: c.data("step"),
            min_interval: c.data("minInterval"),
            max_interval: c.data("maxInterval"),
            drag_interval: c.data("dragInterval"),
            values: c.data("values"),
            from_fixed: c.data("fromFixed"),
            from_min: c.data("fromMin"),
            from_max: c.data("fromMax"),
            from_shadow: c.data("fromShadow"),
            to_fixed: c.data("toFixed"),
            to_min: c.data("toMin"),
            to_max: c.data("toMax"),
            to_shadow: c.data("toShadow"),
            prettify_enabled: c.data("prettifyEnabled"),
            prettify_separator: c.data("prettifySeparator"),
            force_edges: c.data("forceEdges"),
            keyboard: c.data("keyboard"),
            grid: c.data("grid"),
            grid_margin: c.data("gridMargin"),
            grid_num: c.data("gridNum"),
            grid_snap: c.data("gridSnap"),
            hide_min_max: c.data("hideMinMax"),
            hide_from_to: c.data("hideFromTo"),
            prefix: c.data("prefix"),
            postfix: c.data("postfix"),
            max_postfix: c.data("maxPostfix"),
            decorate_both: c.data("decorateBoth"),
            values_separator: c.data("valuesSeparator"),
            input_values_separator: c.data("inputValuesSeparator"),
            disable: c.data("disable"),
            block: c.data("block"),
            extra_classes: c.data("extraClasses")
        };
        c.values = c.values && c.values.split(",");
        for (e in c)
            c.hasOwnProperty(e) && ((c[e] !== p && "" !== c[e]) || delete c[e]);
        a !== p &&
            "" !== a &&
            ((a = a.split(
                c.input_values_separator || b.input_values_separator || ";"
            )),
            a[0] && a[0] == +a[0] && (a[0] = +a[0]),
            a[1] && a[1] == +a[1] && (a[1] = +a[1]),
            b && b.values && b.values.length
                ? ((d.from = a[0] && b.values.indexOf(a[0])),
                  (d.to = a[1] && b.values.indexOf(a[1])))
                : ((d.from = a[0] && +a[0]), (d.to = a[1] && +a[1])));
        f.extend(d, b);
        f.extend(d, c);
        this.options = d;
        this.update_check = {};
        this.validate();
        this.result = {
            input: this.$cache.input,
            slider: null,
            min: this.options.min,
            max: this.options.max,
            from: this.options.from,
            from_percent: 0,
            from_value: null,
            to: this.options.to,
            to_percent: 0,
            to_value: null
        };
        this.init();
    };
    q.prototype = {
        init: function(a) {
            this.no_diapason = !1;
            this.coords.p_step = this.convertToPercent(this.options.step, !0);
            this.target = "base";
            this.toggleInput();
            this.append();
            this.setMinMax();
            a
                ? ((this.force_redraw = !0), this.calc(!0), this.callOnUpdate())
                : ((this.force_redraw = !0), this.calc(!0), this.callOnStart());
            this.updateScene();
        },
        append: function() {
            this.$cache.input.before(
                '<span class="irs js-irs-' +
                    this.plugin_count +
                    " " +
                    this.options.extra_classes +
                    '"></span>'
            );
            this.$cache.input.prop("readonly", !0);
            this.$cache.cont = this.$cache.input.prev();
            this.result.slider = this.$cache.cont;
            this.$cache.cont.html(
                '<span class="irs"><span class="irs-line" tabindex="0"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>'
            );
            this.$cache.rs = this.$cache.cont.find(".irs");
            this.$cache.min = this.$cache.cont.find(".irs-min");
            this.$cache.max = this.$cache.cont.find(".irs-max");
            this.$cache.from = this.$cache.cont.find(".irs-from");
            this.$cache.to = this.$cache.cont.find(".irs-to");
            this.$cache.single = this.$cache.cont.find(".irs-single");
            this.$cache.bar = this.$cache.cont.find(".irs-bar");
            this.$cache.line = this.$cache.cont.find(".irs-line");
            this.$cache.grid = this.$cache.cont.find(".irs-grid");
            "single" === this.options.type
                ? (this.$cache.cont.append(
                      '<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'
                  ),
                  (this.$cache.edge = this.$cache.cont.find(".irs-bar-edge")),
                  (this.$cache.s_single = this.$cache.cont.find(".single")),
                  (this.$cache.from[0].style.visibility = "hidden"),
                  (this.$cache.to[0].style.visibility = "hidden"),
                  (this.$cache.shad_single = this.$cache.cont.find(
                      ".shadow-single"
                  )))
                : (this.$cache.cont.append(
                      '<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'
                  ),
                  (this.$cache.s_from = this.$cache.cont.find(".from")),
                  (this.$cache.s_to = this.$cache.cont.find(".to")),
                  (this.$cache.shad_from = this.$cache.cont.find(
                      ".shadow-from"
                  )),
                  (this.$cache.shad_to = this.$cache.cont.find(".shadow-to")),
                  this.setTopHandler());
            this.options.hide_from_to &&
                ((this.$cache.from[0].style.display = "none"),
                (this.$cache.to[0].style.display = "none"),
                (this.$cache.single[0].style.display = "none"));
            this.appendGrid();
            this.options.disable
                ? (this.appendDisableMask(),
                  (this.$cache.input[0].disabled = !0))
                : ((this.$cache.input[0].disabled = !1),
                  this.removeDisableMask(),
                  this.bindEvents());
            this.options.disable ||
                (this.options.block
                    ? this.appendDisableMask()
                    : this.removeDisableMask());
            this.options.drag_interval &&
                (this.$cache.bar[0].style.cursor = "ew-resize");
        },
        setTopHandler: function() {
            var a = this.options.max,
                b = this.options.to;
            this.options.from > this.options.min && b === a
                ? this.$cache.s_from.addClass("type_last")
                : b < a && this.$cache.s_to.addClass("type_last");
        },
        changeLevel: function(a) {
            switch (a) {
                case "single":
                    this.coords.p_gap = this.toFixed(
                        this.coords.p_pointer - this.coords.p_single_fake
                    );
                    this.$cache.s_single.addClass("state_hover");
                    break;
                case "from":
                    this.coords.p_gap = this.toFixed(
                        this.coords.p_pointer - this.coords.p_from_fake
                    );
                    this.$cache.s_from.addClass("state_hover");
                    this.$cache.s_from.addClass("type_last");
                    this.$cache.s_to.removeClass("type_last");
                    break;
                case "to":
                    this.coords.p_gap = this.toFixed(
                        this.coords.p_pointer - this.coords.p_to_fake
                    );
                    this.$cache.s_to.addClass("state_hover");
                    this.$cache.s_to.addClass("type_last");
                    this.$cache.s_from.removeClass("type_last");
                    break;
                case "both":
                    (this.coords.p_gap_left = this.toFixed(
                        this.coords.p_pointer - this.coords.p_from_fake
                    )),
                        (this.coords.p_gap_right = this.toFixed(
                            this.coords.p_to_fake - this.coords.p_pointer
                        )),
                        this.$cache.s_to.removeClass("type_last"),
                        this.$cache.s_from.removeClass("type_last");
            }
        },
        appendDisableMask: function() {
            this.$cache.cont.append('<span class="irs-disable-mask"></span>');
            this.$cache.cont.addClass("irs-disabled");
        },
        removeDisableMask: function() {
            this.$cache.cont.remove(".irs-disable-mask");
            this.$cache.cont.removeClass("irs-disabled");
        },
        remove: function() {
            this.$cache.cont.remove();
            this.$cache.cont = null;
            this.$cache.line.off("keydown.irs_" + this.plugin_count);
            this.$cache.body.off("touchmove.irs_" + this.plugin_count);
            this.$cache.body.off("mousemove.irs_" + this.plugin_count);
            this.$cache.win.off("touchend.irs_" + this.plugin_count);
            this.$cache.win.off("mouseup.irs_" + this.plugin_count);
            m &&
                (this.$cache.body.off("mouseup.irs_" + this.plugin_count),
                this.$cache.body.off("mouseleave.irs_" + this.plugin_count));
            this.$cache.grid_labels = [];
            this.coords.big = [];
            this.coords.big_w = [];
            this.coords.big_p = [];
            this.coords.big_x = [];
            cancelAnimationFrame(this.raf_id);
        },
        bindEvents: function() {
            if (!this.no_diapason) {
                this.$cache.body.on(
                    "touchmove.irs_" + this.plugin_count,
                    this.pointerMove.bind(this)
                );
                this.$cache.body.on(
                    "mousemove.irs_" + this.plugin_count,
                    this.pointerMove.bind(this)
                );
                this.$cache.win.on(
                    "touchend.irs_" + this.plugin_count,
                    this.pointerUp.bind(this)
                );
                this.$cache.win.on(
                    "mouseup.irs_" + this.plugin_count,
                    this.pointerUp.bind(this)
                );
                this.$cache.line.on(
                    "touchstart.irs_" + this.plugin_count,
                    this.pointerClick.bind(this, "click")
                );
                this.$cache.line.on(
                    "mousedown.irs_" + this.plugin_count,
                    this.pointerClick.bind(this, "click")
                );
                this.$cache.line.on(
                    "focus.irs_" + this.plugin_count,
                    this.pointerFocus.bind(this)
                );
                this.options.drag_interval && "double" === this.options.type
                    ? (this.$cache.bar.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "both")
                      ),
                      this.$cache.bar.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "both")
                      ))
                    : (this.$cache.bar.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.bar.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ));
                "single" === this.options.type
                    ? (this.$cache.single.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "single")
                      ),
                      this.$cache.s_single.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "single")
                      ),
                      this.$cache.shad_single.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.single.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "single")
                      ),
                      this.$cache.s_single.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "single")
                      ),
                      this.$cache.edge.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.shad_single.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ))
                    : (this.$cache.single.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, null)
                      ),
                      this.$cache.single.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, null)
                      ),
                      this.$cache.from.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "from")
                      ),
                      this.$cache.s_from.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "from")
                      ),
                      this.$cache.to.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "to")
                      ),
                      this.$cache.s_to.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "to")
                      ),
                      this.$cache.shad_from.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.shad_to.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.from.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "from")
                      ),
                      this.$cache.s_from.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "from")
                      ),
                      this.$cache.to.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "to")
                      ),
                      this.$cache.s_to.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "to")
                      ),
                      this.$cache.shad_from.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.shad_to.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ));
                if (this.options.keyboard)
                    this.$cache.line.on(
                        "keydown.irs_" + this.plugin_count,
                        this.key.bind(this, "keyboard")
                    );
                m &&
                    (this.$cache.body.on(
                        "mouseup.irs_" + this.plugin_count,
                        this.pointerUp.bind(this)
                    ),
                    this.$cache.body.on(
                        "mouseleave.irs_" + this.plugin_count,
                        this.pointerUp.bind(this)
                    ));
            }
        },
        pointerFocus: function(a) {
            if (!this.target) {
                var b =
                    "single" === this.options.type
                        ? this.$cache.single
                        : this.$cache.from;
                a = b.offset().left;
                a += b.width() / 2 - 1;
                this.pointerClick("single", {
                    preventDefault: function() {},
                    pageX: a
                });
            }
        },
        pointerMove: function(a) {
            this.dragging &&
                ((this.coords.x_pointer =
                    (a.pageX ||
                        (a.originalEvent.touches &&
                            a.originalEvent.touches[0].pageX)) -
                    this.coords.x_gap),
                this.calc());
        },
        pointerUp: function(a) {
            this.current_plugin === this.plugin_count &&
                this.is_active &&
                ((this.is_active = !1),
                this.$cache.cont
                    .find(".state_hover")
                    .removeClass("state_hover"),
                (this.force_redraw = !0),
                m && f("*").prop("unselectable", !1),
                this.updateScene(),
                this.restoreOriginalMinInterval(),
                (f.contains(this.$cache.cont[0], a.target) || this.dragging) &&
                    this.callOnFinish(),
                (this.dragging = !1));
        },
        pointerDown: function(a, b) {
            b.preventDefault();
            var d =
                b.pageX ||
                (b.originalEvent.touches && b.originalEvent.touches[0].pageX);
            2 !== b.button &&
                ("both" === a && this.setTempMinInterval(),
                a || (a = this.target || "from"),
                (this.current_plugin = this.plugin_count),
                (this.target = a),
                (this.dragging = this.is_active = !0),
                (this.coords.x_gap = this.$cache.rs.offset().left),
                (this.coords.x_pointer = d - this.coords.x_gap),
                this.calcPointerPercent(),
                this.changeLevel(a),
                m && f("*").prop("unselectable", !0),
                this.$cache.line.trigger("focus"),
                this.updateScene());
        },
        pointerClick: function(a, b) {
            b.preventDefault();
            var d =
                b.pageX ||
                (b.originalEvent.touches && b.originalEvent.touches[0].pageX);
            2 !== b.button &&
                ((this.current_plugin = this.plugin_count),
                (this.target = a),
                (this.is_click = !0),
                (this.coords.x_gap = this.$cache.rs.offset().left),
                (this.coords.x_pointer = +(d - this.coords.x_gap).toFixed()),
                (this.force_redraw = !0),
                this.calc(),
                this.$cache.line.trigger("focus"));
        },
        key: function(a, b) {
            if (
                !(
                    this.current_plugin !== this.plugin_count ||
                    b.altKey ||
                    b.ctrlKey ||
                    b.shiftKey ||
                    b.metaKey
                )
            ) {
                switch (b.which) {
                    case 83:
                    case 65:
                    case 40:
                    case 37:
                        b.preventDefault();
                        this.moveByKey(!1);
                        break;
                    case 87:
                    case 68:
                    case 38:
                    case 39:
                        b.preventDefault(), this.moveByKey(!0);
                }
                return !0;
            }
        },
        moveByKey: function(a) {
            var b = this.coords.p_pointer,
                d = (this.options.max - this.options.min) / 100,
                d = this.options.step / d;
            this.coords.x_pointer = this.toFixed(
                (this.coords.w_rs / 100) * (a ? b + d : b - d)
            );
            this.is_key = !0;
            this.calc();
        },
        setMinMax: function() {
            if (this.options)
                if (this.options.hide_min_max)
                    (this.$cache.min[0].style.display = "none"),
                        (this.$cache.max[0].style.display = "none");
                else {
                    if (this.options.values.length)
                        this.$cache.min.html(
                            this.decorate(
                                this.options.p_values[this.options.min]
                            )
                        ),
                            this.$cache.max.html(
                                this.decorate(
                                    this.options.p_values[this.options.max]
                                )
                            );
                    else {
                        var a = this._prettify(this.options.min),
                            b = this._prettify(this.options.max);
                        this.result.min_pretty = a;
                        this.result.max_pretty = b;
                        this.$cache.min.html(
                            this.decorate(a, this.options.min)
                        );
                        this.$cache.max.html(
                            this.decorate(b, this.options.max)
                        );
                    }
                    this.labels.w_min = this.$cache.min.outerWidth(!1);
                    this.labels.w_max = this.$cache.max.outerWidth(!1);
                }
        },
        setTempMinInterval: function() {
            var a = this.result.to - this.result.from;
            null === this.old_min_interval &&
                (this.old_min_interval = this.options.min_interval);
            this.options.min_interval = a;
        },
        restoreOriginalMinInterval: function() {
            null !== this.old_min_interval &&
                ((this.options.min_interval = this.old_min_interval),
                (this.old_min_interval = null));
        },
        calc: function(a) {
            if (this.options) {
                this.calc_count++;
                if (10 === this.calc_count || a)
                    (this.calc_count = 0),
                        (this.coords.w_rs = this.$cache.rs.outerWidth(!1)),
                        this.calcHandlePercent();
                if (this.coords.w_rs) {
                    this.calcPointerPercent();
                    a = this.getHandleX();
                    "both" === this.target &&
                        ((this.coords.p_gap = 0), (a = this.getHandleX()));
                    "click" === this.target &&
                        ((this.coords.p_gap = this.coords.p_handle / 2),
                        (a = this.getHandleX()),
                        (this.target = this.options.drag_interval
                            ? "both_one"
                            : this.chooseHandle(a)));
                    switch (this.target) {
                        case "base":
                            var b = (this.options.max - this.options.min) / 100;
                            a = (this.result.from - this.options.min) / b;
                            b = (this.result.to - this.options.min) / b;
                            this.coords.p_single_real = this.toFixed(a);
                            this.coords.p_from_real = this.toFixed(a);
                            this.coords.p_to_real = this.toFixed(b);
                            this.coords.p_single_real = this.checkDiapason(
                                this.coords.p_single_real,
                                this.options.from_min,
                                this.options.from_max
                            );
                            this.coords.p_from_real = this.checkDiapason(
                                this.coords.p_from_real,
                                this.options.from_min,
                                this.options.from_max
                            );
                            this.coords.p_to_real = this.checkDiapason(
                                this.coords.p_to_real,
                                this.options.to_min,
                                this.options.to_max
                            );
                            this.coords.p_single_fake = this.convertToFakePercent(
                                this.coords.p_single_real
                            );
                            this.coords.p_from_fake = this.convertToFakePercent(
                                this.coords.p_from_real
                            );
                            this.coords.p_to_fake = this.convertToFakePercent(
                                this.coords.p_to_real
                            );
                            this.target = null;
                            break;
                        case "single":
                            if (this.options.from_fixed) break;
                            this.coords.p_single_real = this.convertToRealPercent(
                                a
                            );
                            this.coords.p_single_real = this.calcWithStep(
                                this.coords.p_single_real
                            );
                            this.coords.p_single_real = this.checkDiapason(
                                this.coords.p_single_real,
                                this.options.from_min,
                                this.options.from_max
                            );
                            this.coords.p_single_fake = this.convertToFakePercent(
                                this.coords.p_single_real
                            );
                            break;
                        case "from":
                            if (this.options.from_fixed) break;
                            this.coords.p_from_real = this.convertToRealPercent(
                                a
                            );
                            this.coords.p_from_real = this.calcWithStep(
                                this.coords.p_from_real
                            );
                            this.coords.p_from_real > this.coords.p_to_real &&
                                (this.coords.p_from_real = this.coords.p_to_real);
                            this.coords.p_from_real = this.checkDiapason(
                                this.coords.p_from_real,
                                this.options.from_min,
                                this.options.from_max
                            );
                            this.coords.p_from_real = this.checkMinInterval(
                                this.coords.p_from_real,
                                this.coords.p_to_real,
                                "from"
                            );
                            this.coords.p_from_real = this.checkMaxInterval(
                                this.coords.p_from_real,
                                this.coords.p_to_real,
                                "from"
                            );
                            this.coords.p_from_fake = this.convertToFakePercent(
                                this.coords.p_from_real
                            );
                            break;
                        case "to":
                            if (this.options.to_fixed) break;
                            this.coords.p_to_real = this.convertToRealPercent(
                                a
                            );
                            this.coords.p_to_real = this.calcWithStep(
                                this.coords.p_to_real
                            );
                            this.coords.p_to_real < this.coords.p_from_real &&
                                (this.coords.p_to_real = this.coords.p_from_real);
                            this.coords.p_to_real = this.checkDiapason(
                                this.coords.p_to_real,
                                this.options.to_min,
                                this.options.to_max
                            );
                            this.coords.p_to_real = this.checkMinInterval(
                                this.coords.p_to_real,
                                this.coords.p_from_real,
                                "to"
                            );
                            this.coords.p_to_real = this.checkMaxInterval(
                                this.coords.p_to_real,
                                this.coords.p_from_real,
                                "to"
                            );
                            this.coords.p_to_fake = this.convertToFakePercent(
                                this.coords.p_to_real
                            );
                            break;
                        case "both":
                            if (
                                this.options.from_fixed ||
                                this.options.to_fixed
                            )
                                break;
                            a = this.toFixed(a + 0.001 * this.coords.p_handle);
                            this.coords.p_from_real =
                                this.convertToRealPercent(a) -
                                this.coords.p_gap_left;
                            this.coords.p_from_real = this.calcWithStep(
                                this.coords.p_from_real
                            );
                            this.coords.p_from_real = this.checkDiapason(
                                this.coords.p_from_real,
                                this.options.from_min,
                                this.options.from_max
                            );
                            this.coords.p_from_real = this.checkMinInterval(
                                this.coords.p_from_real,
                                this.coords.p_to_real,
                                "from"
                            );
                            this.coords.p_from_fake = this.convertToFakePercent(
                                this.coords.p_from_real
                            );
                            this.coords.p_to_real =
                                this.convertToRealPercent(a) +
                                this.coords.p_gap_right;
                            this.coords.p_to_real = this.calcWithStep(
                                this.coords.p_to_real
                            );
                            this.coords.p_to_real = this.checkDiapason(
                                this.coords.p_to_real,
                                this.options.to_min,
                                this.options.to_max
                            );
                            this.coords.p_to_real = this.checkMinInterval(
                                this.coords.p_to_real,
                                this.coords.p_from_real,
                                "to"
                            );
                            this.coords.p_to_fake = this.convertToFakePercent(
                                this.coords.p_to_real
                            );
                            break;
                        case "both_one":
                            if (
                                !this.options.from_fixed &&
                                !this.options.to_fixed
                            ) {
                                var d = this.convertToRealPercent(a);
                                a =
                                    this.result.to_percent -
                                    this.result.from_percent;
                                var c = a / 2,
                                    b = d - c,
                                    d = d + c;
                                0 > b && ((b = 0), (d = b + a));
                                100 < d && ((d = 100), (b = d - a));
                                this.coords.p_from_real = this.calcWithStep(b);
                                this.coords.p_from_real = this.checkDiapason(
                                    this.coords.p_from_real,
                                    this.options.from_min,
                                    this.options.from_max
                                );
                                this.coords.p_from_fake = this.convertToFakePercent(
                                    this.coords.p_from_real
                                );
                                this.coords.p_to_real = this.calcWithStep(d);
                                this.coords.p_to_real = this.checkDiapason(
                                    this.coords.p_to_real,
                                    this.options.to_min,
                                    this.options.to_max
                                );
                                this.coords.p_to_fake = this.convertToFakePercent(
                                    this.coords.p_to_real
                                );
                            }
                    }
                    "single" === this.options.type
                        ? ((this.coords.p_bar_x = this.coords.p_handle / 2),
                          (this.coords.p_bar_w = this.coords.p_single_fake),
                          (this.result.from_percent = this.coords.p_single_real),
                          (this.result.from = this.convertToValue(
                              this.coords.p_single_real
                          )),
                          (this.result.from_pretty = this._prettify(
                              this.result.from
                          )),
                          this.options.values.length &&
                              (this.result.from_value = this.options.values[
                                  this.result.from
                              ]))
                        : ((this.coords.p_bar_x = this.toFixed(
                              this.coords.p_from_fake + this.coords.p_handle / 2
                          )),
                          (this.coords.p_bar_w = this.toFixed(
                              this.coords.p_to_fake - this.coords.p_from_fake
                          )),
                          (this.result.from_percent = this.coords.p_from_real),
                          (this.result.from = this.convertToValue(
                              this.coords.p_from_real
                          )),
                          (this.result.from_pretty = this._prettify(
                              this.result.from
                          )),
                          (this.result.to_percent = this.coords.p_to_real),
                          (this.result.to = this.convertToValue(
                              this.coords.p_to_real
                          )),
                          (this.result.to_pretty = this._prettify(
                              this.result.to
                          )),
                          this.options.values.length &&
                              ((this.result.from_value = this.options.values[
                                  this.result.from
                              ]),
                              (this.result.to_value = this.options.values[
                                  this.result.to
                              ])));
                    this.calcMinMax();
                    this.calcLabels();
                }
            }
        },
        calcPointerPercent: function() {
            this.coords.w_rs
                ? (0 > this.coords.x_pointer || isNaN(this.coords.x_pointer)
                      ? (this.coords.x_pointer = 0)
                      : this.coords.x_pointer > this.coords.w_rs &&
                        (this.coords.x_pointer = this.coords.w_rs),
                  (this.coords.p_pointer = this.toFixed(
                      (this.coords.x_pointer / this.coords.w_rs) * 100
                  )))
                : (this.coords.p_pointer = 0);
        },
        convertToRealPercent: function(a) {
            return (a / (100 - this.coords.p_handle)) * 100;
        },
        convertToFakePercent: function(a) {
            return (a / 100) * (100 - this.coords.p_handle);
        },
        getHandleX: function() {
            var a = 100 - this.coords.p_handle,
                b = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
            0 > b ? (b = 0) : b > a && (b = a);
            return b;
        },
        calcHandlePercent: function() {
            this.coords.w_handle =
                "single" === this.options.type
                    ? this.$cache.s_single.outerWidth(!1)
                    : this.$cache.s_from.outerWidth(!1);
            this.coords.p_handle = this.toFixed(
                (this.coords.w_handle / this.coords.w_rs) * 100
            );
        },
        chooseHandle: function(a) {
            return "single" === this.options.type
                ? "single"
                : a >=
                  this.coords.p_from_real +
                      (this.coords.p_to_real - this.coords.p_from_real) / 2
                ? this.options.to_fixed
                    ? "from"
                    : "to"
                : this.options.from_fixed
                ? "to"
                : "from";
        },
        calcMinMax: function() {
            this.coords.w_rs &&
                ((this.labels.p_min =
                    (this.labels.w_min / this.coords.w_rs) * 100),
                (this.labels.p_max =
                    (this.labels.w_max / this.coords.w_rs) * 100));
        },
        calcLabels: function() {
            this.coords.w_rs &&
                !this.options.hide_from_to &&
                ("single" === this.options.type
                    ? ((this.labels.w_single = this.$cache.single.outerWidth(
                          !1
                      )),
                      (this.labels.p_single_fake =
                          (this.labels.w_single / this.coords.w_rs) * 100),
                      (this.labels.p_single_left =
                          this.coords.p_single_fake +
                          this.coords.p_handle / 2 -
                          this.labels.p_single_fake / 2))
                    : ((this.labels.w_from = this.$cache.from.outerWidth(!1)),
                      (this.labels.p_from_fake =
                          (this.labels.w_from / this.coords.w_rs) * 100),
                      (this.labels.p_from_left =
                          this.coords.p_from_fake +
                          this.coords.p_handle / 2 -
                          this.labels.p_from_fake / 2),
                      (this.labels.p_from_left = this.toFixed(
                          this.labels.p_from_left
                      )),
                      (this.labels.p_from_left = this.checkEdges(
                          this.labels.p_from_left,
                          this.labels.p_from_fake
                      )),
                      (this.labels.w_to = this.$cache.to.outerWidth(!1)),
                      (this.labels.p_to_fake =
                          (this.labels.w_to / this.coords.w_rs) * 100),
                      (this.labels.p_to_left =
                          this.coords.p_to_fake +
                          this.coords.p_handle / 2 -
                          this.labels.p_to_fake / 2),
                      (this.labels.p_to_left = this.toFixed(
                          this.labels.p_to_left
                      )),
                      (this.labels.p_to_left = this.checkEdges(
                          this.labels.p_to_left,
                          this.labels.p_to_fake
                      )),
                      (this.labels.w_single = this.$cache.single.outerWidth(
                          !1
                      )),
                      (this.labels.p_single_fake =
                          (this.labels.w_single / this.coords.w_rs) * 100),
                      (this.labels.p_single_left =
                          (this.labels.p_from_left +
                              this.labels.p_to_left +
                              this.labels.p_to_fake) /
                              2 -
                          this.labels.p_single_fake / 2),
                      (this.labels.p_single_left = this.toFixed(
                          this.labels.p_single_left
                      ))),
                (this.labels.p_single_left = this.checkEdges(
                    this.labels.p_single_left,
                    this.labels.p_single_fake
                )));
        },
        updateScene: function() {
            this.raf_id &&
                (cancelAnimationFrame(this.raf_id), (this.raf_id = null));
            clearTimeout(this.update_tm);
            this.update_tm = null;
            this.options &&
                (this.drawHandles(),
                this.is_active
                    ? (this.raf_id = requestAnimationFrame(
                          this.updateScene.bind(this)
                      ))
                    : (this.update_tm = setTimeout(
                          this.updateScene.bind(this),
                          300
                      )));
        },
        drawHandles: function() {
            this.coords.w_rs = this.$cache.rs.outerWidth(!1);
            if (this.coords.w_rs) {
                this.coords.w_rs !== this.coords.w_rs_old &&
                    ((this.target = "base"), (this.is_resize = !0));
                if (
                    this.coords.w_rs !== this.coords.w_rs_old ||
                    this.force_redraw
                )
                    this.setMinMax(),
                        this.calc(!0),
                        this.drawLabels(),
                        this.options.grid &&
                            (this.calcGridMargin(), this.calcGridLabels()),
                        (this.force_redraw = !0),
                        (this.coords.w_rs_old = this.coords.w_rs),
                        this.drawShadow();
                if (
                    this.coords.w_rs &&
                    (this.dragging || this.force_redraw || this.is_key)
                ) {
                    if (
                        this.old_from !== this.result.from ||
                        this.old_to !== this.result.to ||
                        this.force_redraw ||
                        this.is_key
                    ) {
                        this.drawLabels();
                        this.$cache.bar[0].style.left =
                            this.coords.p_bar_x + "%";
                        this.$cache.bar[0].style.width =
                            this.coords.p_bar_w + "%";
                        if ("single" === this.options.type)
                            this.$cache.s_single[0].style.left =
                                this.coords.p_single_fake + "%";
                        else {
                            this.$cache.s_from[0].style.left =
                                this.coords.p_from_fake + "%";
                            this.$cache.s_to[0].style.left =
                                this.coords.p_to_fake + "%";
                            if (
                                this.old_from !== this.result.from ||
                                this.force_redraw
                            )
                                this.$cache.from[0].style.left =
                                    this.labels.p_from_left + "%";
                            if (
                                this.old_to !== this.result.to ||
                                this.force_redraw
                            )
                                this.$cache.to[0].style.left =
                                    this.labels.p_to_left + "%";
                        }
                        this.$cache.single[0].style.left =
                            this.labels.p_single_left + "%";
                        this.writeToInput();
                        (this.old_from === this.result.from &&
                            this.old_to === this.result.to) ||
                            this.is_start ||
                            (this.$cache.input.trigger("change"),
                            this.$cache.input.trigger("input"));
                        this.old_from = this.result.from;
                        this.old_to = this.result.to;
                        this.is_resize ||
                            this.is_update ||
                            this.is_start ||
                            this.is_finish ||
                            this.callOnChange();
                        if (this.is_key || this.is_click)
                            (this.is_click = this.is_key = !1),
                                this.callOnFinish();
                        this.is_finish = this.is_resize = this.is_update = !1;
                    }
                    this.force_redraw = this.is_click = this.is_key = this.is_start = !1;
                }
            }
        },
        drawLabels: function() {
            if (this.options) {
                var a = this.options.values.length,
                    b = this.options.p_values;
                if (!this.options.hide_from_to)
                    if ("single" === this.options.type) {
                        if (a) a = this.decorate(b[this.result.from]);
                        else {
                            var d = this._prettify(this.result.from);
                            a = this.decorate(d, this.result.from);
                        }
                        this.$cache.single.html(a);
                        this.calcLabels();
                        this.$cache.min[0].style.visibility =
                            this.labels.p_single_left < this.labels.p_min + 1
                                ? "hidden"
                                : "visible";
                        this.$cache.max[0].style.visibility =
                            this.labels.p_single_left +
                                this.labels.p_single_fake >
                            100 - this.labels.p_max - 1
                                ? "hidden"
                                : "visible";
                    } else {
                        a
                            ? (this.options.decorate_both
                                  ? ((a = this.decorate(b[this.result.from])),
                                    (a += this.options.values_separator),
                                    (a += this.decorate(b[this.result.to])))
                                  : (a = this.decorate(
                                        b[this.result.from] +
                                            this.options.values_separator +
                                            b[this.result.to]
                                    )),
                              (d = this.decorate(b[this.result.from])),
                              (b = this.decorate(b[this.result.to])))
                            : ((d = this._prettify(this.result.from)),
                              (b = this._prettify(this.result.to)),
                              this.options.decorate_both
                                  ? ((a = this.decorate(d, this.result.from)),
                                    (a += this.options.values_separator),
                                    (a += this.decorate(b, this.result.to)))
                                  : (a = this.decorate(
                                        d + this.options.values_separator + b,
                                        this.result.to
                                    )),
                              (d = this.decorate(d, this.result.from)),
                              (b = this.decorate(b, this.result.to)));
                        this.$cache.single.html(a);
                        this.$cache.from.html(d);
                        this.$cache.to.html(b);
                        this.calcLabels();
                        a = Math.min(
                            this.labels.p_single_left,
                            this.labels.p_from_left
                        );
                        d =
                            this.labels.p_single_left +
                            this.labels.p_single_fake;
                        var b = this.labels.p_to_left + this.labels.p_to_fake,
                            c = Math.max(d, b);
                        this.labels.p_from_left + this.labels.p_from_fake >=
                        this.labels.p_to_left
                            ? ((this.$cache.from[0].style.visibility =
                                  "hidden"),
                              (this.$cache.to[0].style.visibility = "hidden"),
                              (this.$cache.single[0].style.visibility =
                                  "visible"),
                              this.result.from === this.result.to
                                  ? ("from" === this.target
                                        ? (this.$cache.from[0].style.visibility =
                                              "visible")
                                        : "to" === this.target
                                        ? (this.$cache.to[0].style.visibility =
                                              "visible")
                                        : this.target ||
                                          (this.$cache.from[0].style.visibility =
                                              "visible"),
                                    (this.$cache.single[0].style.visibility =
                                        "hidden"),
                                    (c = b))
                                  : ((this.$cache.from[0].style.visibility =
                                        "hidden"),
                                    (this.$cache.to[0].style.visibility =
                                        "hidden"),
                                    (this.$cache.single[0].style.visibility =
                                        "visible"),
                                    (c = Math.max(d, b))))
                            : ((this.$cache.from[0].style.visibility =
                                  "visible"),
                              (this.$cache.to[0].style.visibility = "visible"),
                              (this.$cache.single[0].style.visibility =
                                  "hidden"));
                        this.$cache.min[0].style.visibility =
                            a < this.labels.p_min + 1 ? "hidden" : "visible";
                        this.$cache.max[0].style.visibility =
                            c > 100 - this.labels.p_max - 1
                                ? "hidden"
                                : "visible";
                    }
            }
        },
        drawShadow: function() {
            var a = this.options,
                b = this.$cache,
                d = "number" === typeof a.from_min && !isNaN(a.from_min),
                c = "number" === typeof a.from_max && !isNaN(a.from_max),
                e = "number" === typeof a.to_min && !isNaN(a.to_min),
                g = "number" === typeof a.to_max && !isNaN(a.to_max);
            "single" === a.type
                ? a.from_shadow && (d || c)
                    ? ((d = this.convertToPercent(d ? a.from_min : a.min)),
                      (c = this.convertToPercent(c ? a.from_max : a.max) - d),
                      (d = this.toFixed(d - (this.coords.p_handle / 100) * d)),
                      (c = this.toFixed(c - (this.coords.p_handle / 100) * c)),
                      (d += this.coords.p_handle / 2),
                      (b.shad_single[0].style.display = "block"),
                      (b.shad_single[0].style.left = d + "%"),
                      (b.shad_single[0].style.width = c + "%"))
                    : (b.shad_single[0].style.display = "none")
                : (a.from_shadow && (d || c)
                      ? ((d = this.convertToPercent(d ? a.from_min : a.min)),
                        (c = this.convertToPercent(c ? a.from_max : a.max) - d),
                        (d = this.toFixed(
                            d - (this.coords.p_handle / 100) * d
                        )),
                        (c = this.toFixed(
                            c - (this.coords.p_handle / 100) * c
                        )),
                        (d += this.coords.p_handle / 2),
                        (b.shad_from[0].style.display = "block"),
                        (b.shad_from[0].style.left = d + "%"),
                        (b.shad_from[0].style.width = c + "%"))
                      : (b.shad_from[0].style.display = "none"),
                  a.to_shadow && (e || g)
                      ? ((e = this.convertToPercent(e ? a.to_min : a.min)),
                        (a = this.convertToPercent(g ? a.to_max : a.max) - e),
                        (e = this.toFixed(
                            e - (this.coords.p_handle / 100) * e
                        )),
                        (a = this.toFixed(
                            a - (this.coords.p_handle / 100) * a
                        )),
                        (e += this.coords.p_handle / 2),
                        (b.shad_to[0].style.display = "block"),
                        (b.shad_to[0].style.left = e + "%"),
                        (b.shad_to[0].style.width = a + "%"))
                      : (b.shad_to[0].style.display = "none"));
        },
        writeToInput: function() {
            "single" === this.options.type
                ? (this.options.values.length
                      ? this.$cache.input.prop("value", this.result.from_value)
                      : this.$cache.input.prop("value", this.result.from),
                  this.$cache.input.data("from", this.result.from))
                : (this.options.values.length
                      ? this.$cache.input.prop(
                            "value",
                            this.result.from_value +
                                this.options.input_values_separator +
                                this.result.to_value
                        )
                      : this.$cache.input.prop(
                            "value",
                            this.result.from +
                                this.options.input_values_separator +
                                this.result.to
                        ),
                  this.$cache.input.data("from", this.result.from),
                  this.$cache.input.data("to", this.result.to));
        },
        callOnStart: function() {
            this.writeToInput();
            if (
                this.options.onStart &&
                "function" === typeof this.options.onStart
            )
                if (this.options.scope)
                    this.options.onStart.call(this.options.scope, this.result);
                else this.options.onStart(this.result);
        },
        callOnChange: function() {
            this.writeToInput();
            if (
                this.options.onChange &&
                "function" === typeof this.options.onChange
            )
                if (this.options.scope)
                    this.options.onChange.call(this.options.scope, this.result);
                else this.options.onChange(this.result);
        },
        callOnFinish: function() {
            this.writeToInput();
            if (
                this.options.onFinish &&
                "function" === typeof this.options.onFinish
            )
                if (this.options.scope)
                    this.options.onFinish.call(this.options.scope, this.result);
                else this.options.onFinish(this.result);
        },
        callOnUpdate: function() {
            this.writeToInput();
            if (
                this.options.onUpdate &&
                "function" === typeof this.options.onUpdate
            )
                if (this.options.scope)
                    this.options.onUpdate.call(this.options.scope, this.result);
                else this.options.onUpdate(this.result);
        },
        toggleInput: function() {
            this.$cache.input.toggleClass("irs-hidden-input");
            this.has_tab_index
                ? this.$cache.input.prop("tabindex", -1)
                : this.$cache.input.removeProp("tabindex");
            this.has_tab_index = !this.has_tab_index;
        },
        convertToPercent: function(a, b) {
            var d = this.options.max - this.options.min;
            return d
                ? this.toFixed((b ? a : a - this.options.min) / (d / 100))
                : ((this.no_diapason = !0), 0);
        },
        convertToValue: function(a) {
            var b = this.options.min,
                d = this.options.max,
                c = b.toString().split(".")[1],
                e = d.toString().split(".")[1],
                g,
                l,
                f = 0,
                h = 0;
            if (0 === a) return this.options.min;
            if (100 === a) return this.options.max;
            c && (f = g = c.length);
            e && (f = l = e.length);
            g && l && (f = g >= l ? g : l);
            0 > b &&
                ((h = Math.abs(b)),
                (b = +(b + h).toFixed(f)),
                (d = +(d + h).toFixed(f)));
            a = ((d - b) / 100) * a + b;
            (b = this.options.step.toString().split(".")[1])
                ? (a = +a.toFixed(b.length))
                : ((a /= this.options.step),
                  (a *= this.options.step),
                  (a = +a.toFixed(0)));
            h && (a -= h);
            h = b ? +a.toFixed(b.length) : this.toFixed(a);
            h < this.options.min
                ? (h = this.options.min)
                : h > this.options.max && (h = this.options.max);
            return h;
        },
        calcWithStep: function(a) {
            var b = Math.round(a / this.coords.p_step) * this.coords.p_step;
            100 < b && (b = 100);
            100 === a && (b = 100);
            return this.toFixed(b);
        },
        checkMinInterval: function(a, b, d) {
            var c = this.options;
            if (!c.min_interval) return a;
            a = this.convertToValue(a);
            b = this.convertToValue(b);
            "from" === d
                ? b - a < c.min_interval && (a = b - c.min_interval)
                : a - b < c.min_interval && (a = b + c.min_interval);
            return this.convertToPercent(a);
        },
        checkMaxInterval: function(a, b, d) {
            var c = this.options;
            if (!c.max_interval) return a;
            a = this.convertToValue(a);
            b = this.convertToValue(b);
            "from" === d
                ? b - a > c.max_interval && (a = b - c.max_interval)
                : a - b > c.max_interval && (a = b + c.max_interval);
            return this.convertToPercent(a);
        },
        checkDiapason: function(a, b, d) {
            a = this.convertToValue(a);
            var c = this.options;
            "number" !== typeof b && (b = c.min);
            "number" !== typeof d && (d = c.max);
            a < b && (a = b);
            a > d && (a = d);
            return this.convertToPercent(a);
        },
        toFixed: function(a) {
            a = a.toFixed(20);
            return +a;
        },
        _prettify: function(a) {
            return this.options.prettify_enabled
                ? this.options.prettify &&
                  "function" === typeof this.options.prettify
                    ? this.options.prettify(a)
                    : this.prettify(a)
                : a;
        },
        prettify: function(a) {
            return a
                .toString()
                .replace(
                    /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
                    "$1" + this.options.prettify_separator
                );
        },
        checkEdges: function(a, b) {
            if (!this.options.force_edges) return this.toFixed(a);
            0 > a ? (a = 0) : a > 100 - b && (a = 100 - b);
            return this.toFixed(a);
        },
        validate: function() {
            var a = this.options,
                b = this.result,
                d = a.values,
                c = d.length,
                e;
            "string" === typeof a.min && (a.min = +a.min);
            "string" === typeof a.max && (a.max = +a.max);
            "string" === typeof a.from && (a.from = +a.from);
            "string" === typeof a.to && (a.to = +a.to);
            "string" === typeof a.step && (a.step = +a.step);
            "string" === typeof a.from_min && (a.from_min = +a.from_min);
            "string" === typeof a.from_max && (a.from_max = +a.from_max);
            "string" === typeof a.to_min && (a.to_min = +a.to_min);
            "string" === typeof a.to_max && (a.to_max = +a.to_max);
            "string" === typeof a.grid_num && (a.grid_num = +a.grid_num);
            a.max < a.min && (a.max = a.min);
            if (c)
                for (
                    a.p_values = [],
                        a.min = 0,
                        a.max = c - 1,
                        a.step = 1,
                        a.grid_num = a.max,
                        a.grid_snap = !0,
                        e = 0;
                    e < c;
                    e++
                ) {
                    var g = +d[e];
                    isNaN(g)
                        ? (g = d[e])
                        : ((d[e] = g), (g = this._prettify(g)));
                    a.p_values.push(g);
                }
            if ("number" !== typeof a.from || isNaN(a.from)) a.from = a.min;
            if ("number" !== typeof a.to || isNaN(a.to)) a.to = a.max;
            "single" === a.type
                ? (a.from < a.min && (a.from = a.min),
                  a.from > a.max && (a.from = a.max))
                : (a.from < a.min && (a.from = a.min),
                  a.from > a.max && (a.from = a.max),
                  a.to < a.min && (a.to = a.min),
                  a.to > a.max && (a.to = a.max),
                  this.update_check.from &&
                      (this.update_check.from !== a.from &&
                          a.from > a.to &&
                          (a.from = a.to),
                      this.update_check.to !== a.to &&
                          a.to < a.from &&
                          (a.to = a.from)),
                  a.from > a.to && (a.from = a.to),
                  a.to < a.from && (a.to = a.from));
            if (
                "number" !== typeof a.step ||
                isNaN(a.step) ||
                !a.step ||
                0 > a.step
            )
                a.step = 1;
            "number" === typeof a.from_min &&
                a.from < a.from_min &&
                (a.from = a.from_min);
            "number" === typeof a.from_max &&
                a.from > a.from_max &&
                (a.from = a.from_max);
            "number" === typeof a.to_min &&
                a.to < a.to_min &&
                (a.to = a.to_min);
            "number" === typeof a.to_max &&
                a.from > a.to_max &&
                (a.to = a.to_max);
            if (b) {
                b.min !== a.min && (b.min = a.min);
                b.max !== a.max && (b.max = a.max);
                if (b.from < b.min || b.from > b.max) b.from = a.from;
                if (b.to < b.min || b.to > b.max) b.to = a.to;
            }
            if (
                "number" !== typeof a.min_interval ||
                isNaN(a.min_interval) ||
                !a.min_interval ||
                0 > a.min_interval
            )
                a.min_interval = 0;
            if (
                "number" !== typeof a.max_interval ||
                isNaN(a.max_interval) ||
                !a.max_interval ||
                0 > a.max_interval
            )
                a.max_interval = 0;
            a.min_interval &&
                a.min_interval > a.max - a.min &&
                (a.min_interval = a.max - a.min);
            a.max_interval &&
                a.max_interval > a.max - a.min &&
                (a.max_interval = a.max - a.min);
        },
        decorate: function(a, b) {
            var d = "",
                c = this.options;
            c.prefix && (d += c.prefix);
            d += a;
            c.max_postfix &&
                (c.values.length && a === c.p_values[c.max]
                    ? ((d += c.max_postfix), c.postfix && (d += " "))
                    : b === c.max &&
                      ((d += c.max_postfix), c.postfix && (d += " ")));
            c.postfix && (d += c.postfix);
            return d;
        },
        updateFrom: function() {
            this.result.from = this.options.from;
            this.result.from_percent = this.convertToPercent(this.result.from);
            this.result.from_pretty = this._prettify(this.result.from);
            this.options.values &&
                (this.result.from_value = this.options.values[
                    this.result.from
                ]);
        },
        updateTo: function() {
            this.result.to = this.options.to;
            this.result.to_percent = this.convertToPercent(this.result.to);
            this.result.to_pretty = this._prettify(this.result.to);
            this.options.values &&
                (this.result.to_value = this.options.values[this.result.to]);
        },
        updateResult: function() {
            this.result.min = this.options.min;
            this.result.max = this.options.max;
            this.updateFrom();
            this.updateTo();
        },
        appendGrid: function() {
            if (this.options.grid) {
                var a = this.options,
                    b;
                var d = a.max - a.min;
                var c = a.grid_num,
                    e = 4,
                    g = "";
                this.calcGridMargin();
                if (a.grid_snap)
                    if (50 < d) {
                        c = 50 / a.step;
                        var f = this.toFixed(a.step / 0.5);
                    } else
                        (c = d / a.step),
                            (f = this.toFixed(a.step / (d / 100)));
                else f = this.toFixed(100 / c);
                4 < c && (e = 3);
                7 < c && (e = 2);
                14 < c && (e = 1);
                28 < c && (e = 0);
                for (d = 0; d < c + 1; d++) {
                    var k = e;
                    var h = this.toFixed(f * d);
                    100 < h && (h = 100);
                    this.coords.big[d] = h;
                    var m = (h - f * (d - 1)) / (k + 1);
                    for (b = 1; b <= k && 0 !== h; b++) {
                        var n = this.toFixed(h - m * b);
                        g +=
                            '<span class="irs-grid-pol small" style="left: ' +
                            n +
                            '%"></span>';
                    }
                    g +=
                        '<span class="irs-grid-pol" style="left: ' +
                        h +
                        '%"></span>';
                    b = this.convertToValue(h);
                    b = a.values.length ? a.p_values[b] : this._prettify(b);
                    g +=
                        '<span class="irs-grid-text js-grid-text-' +
                        d +
                        '" style="left: ' +
                        h +
                        '%">' +
                        b +
                        "</span>";
                }
                this.coords.big_num = Math.ceil(c + 1);
                this.$cache.cont.addClass("irs-with-grid");
                this.$cache.grid.html(g);
                this.cacheGridLabels();
            }
        },
        cacheGridLabels: function() {
            var a,
                b = this.coords.big_num;
            for (a = 0; a < b; a++) {
                var d = this.$cache.grid.find(".js-grid-text-" + a);
                this.$cache.grid_labels.push(d);
            }
            this.calcGridLabels();
        },
        calcGridLabels: function() {
            var a;
            var b = [];
            var d = [],
                c = this.coords.big_num;
            for (a = 0; a < c; a++)
                (this.coords.big_w[a] = this.$cache.grid_labels[a].outerWidth(
                    !1
                )),
                    (this.coords.big_p[a] = this.toFixed(
                        (this.coords.big_w[a] / this.coords.w_rs) * 100
                    )),
                    (this.coords.big_x[a] = this.toFixed(
                        this.coords.big_p[a] / 2
                    )),
                    (b[a] = this.toFixed(
                        this.coords.big[a] - this.coords.big_x[a]
                    )),
                    (d[a] = this.toFixed(b[a] + this.coords.big_p[a]));
            this.options.force_edges &&
                (b[0] < -this.coords.grid_gap &&
                    ((b[0] = -this.coords.grid_gap),
                    (d[0] = this.toFixed(b[0] + this.coords.big_p[0])),
                    (this.coords.big_x[0] = this.coords.grid_gap)),
                d[c - 1] > 100 + this.coords.grid_gap &&
                    ((d[c - 1] = 100 + this.coords.grid_gap),
                    (b[c - 1] = this.toFixed(
                        d[c - 1] - this.coords.big_p[c - 1]
                    )),
                    (this.coords.big_x[c - 1] = this.toFixed(
                        this.coords.big_p[c - 1] - this.coords.grid_gap
                    ))));
            this.calcGridCollision(2, b, d);
            this.calcGridCollision(4, b, d);
            for (a = 0; a < c; a++)
                (b = this.$cache.grid_labels[a][0]),
                    this.coords.big_x[a] !== Number.POSITIVE_INFINITY &&
                        (b.style.marginLeft = -this.coords.big_x[a] + "%");
        },
        calcGridCollision: function(a, b, d) {
            var c,
                e = this.coords.big_num;
            for (c = 0; c < e; c += a) {
                var g = c + a / 2;
                if (g >= e) break;
                var f = this.$cache.grid_labels[g][0];
                f.style.visibility = d[c] <= b[g] ? "visible" : "hidden";
            }
        },
        calcGridMargin: function() {
            this.options.grid_margin &&
                ((this.coords.w_rs = this.$cache.rs.outerWidth(!1)),
                this.coords.w_rs &&
                    ((this.coords.w_handle =
                        "single" === this.options.type
                            ? this.$cache.s_single.outerWidth(!1)
                            : this.$cache.s_from.outerWidth(!1)),
                    (this.coords.p_handle = this.toFixed(
                        (this.coords.w_handle / this.coords.w_rs) * 100
                    )),
                    (this.coords.grid_gap = this.toFixed(
                        this.coords.p_handle / 2 - 0.1
                    )),
                    (this.$cache.grid[0].style.width =
                        this.toFixed(100 - this.coords.p_handle) + "%"),
                    (this.$cache.grid[0].style.left =
                        this.coords.grid_gap + "%")));
        },
        update: function(a) {
            this.input &&
                ((this.is_update = !0),
                (this.options.from = this.result.from),
                (this.options.to = this.result.to),
                (this.update_check.from = this.result.from),
                (this.update_check.to = this.result.to),
                (this.options = f.extend(this.options, a)),
                this.validate(),
                this.updateResult(a),
                this.toggleInput(),
                this.remove(),
                this.init(!0));
        },
        reset: function() {
            this.input && (this.updateResult(), this.update());
        },
        destroy: function() {
            this.input &&
                (this.toggleInput(),
                this.$cache.input.prop("readonly", !1),
                f.data(this.input, "ionRangeSlider", null),
                this.remove(),
                (this.options = this.input = null));
        }
    };
    f.fn.ionRangeSlider = function(a) {
        return this.each(function() {
            f.data(this, "ionRangeSlider") ||
                f.data(this, "ionRangeSlider", new q(this, a, t++));
        });
    };
    (function() {
        for (
            var a = 0, b = ["ms", "moz", "webkit", "o"], d = 0;
            d < b.length && !k.requestAnimationFrame;
            ++d
        )
            (k.requestAnimationFrame = k[b[d] + "RequestAnimationFrame"]),
                (k.cancelAnimationFrame =
                    k[b[d] + "CancelAnimationFrame"] ||
                    k[b[d] + "CancelRequestAnimationFrame"]);
        k.requestAnimationFrame ||
            (k.requestAnimationFrame = function(b, d) {
                var c = new Date().getTime(),
                    e = Math.max(0, 16 - (c - a)),
                    f = k.setTimeout(function() {
                        b(c + e);
                    }, e);
                a = c + e;
                return f;
            });
        k.cancelAnimationFrame ||
            (k.cancelAnimationFrame = function(a) {
                clearTimeout(a);
            });
    })();
});
/* flickity */
!(function(t, e) {
    "function" == typeof define && define.amd
        ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
              return e(t, i);
          })
        : "object" == typeof module && module.exports
        ? (module.exports = e(t, require("jquery")))
        : (t.jQueryBridget = e(t, t.jQuery));
})(window, function(t, e) {
    "use strict";
    function i(i, o, a) {
        function l(t, e, n) {
            var s,
                o = "$()." + i + '("' + e + '")';
            return (
                t.each(function(t, l) {
                    var h = a.data(l, i);
                    if (!h)
                        return void r(
                            i +
                                " not initialized. Cannot call methods, i.e. " +
                                o
                        );
                    var c = h[e];
                    if (!c || "_" == e.charAt(0))
                        return void r(o + " is not a valid method");
                    var d = c.apply(h, n);
                    s = void 0 === s ? d : s;
                }),
                void 0 !== s ? s : t
            );
        }
        function h(t, e) {
            t.each(function(t, n) {
                var s = a.data(n, i);
                s
                    ? (s.option(e), s._init())
                    : ((s = new o(n, e)), a.data(n, i, s));
            });
        }
        (a = a || e || t.jQuery),
            a &&
                (o.prototype.option ||
                    (o.prototype.option = function(t) {
                        a.isPlainObject(t) &&
                            (this.options = a.extend(!0, this.options, t));
                    }),
                (a.fn[i] = function(t) {
                    if ("string" == typeof t) {
                        var e = s.call(arguments, 1);
                        return l(this, t, e);
                    }
                    return h(this, t), this;
                }),
                n(a));
    }
    function n(t) {
        !t || (t && t.bridget) || (t.bridget = i);
    }
    var s = Array.prototype.slice,
        o = t.console,
        r =
            "undefined" == typeof o
                ? function() {}
                : function(t) {
                      o.error(t);
                  };
    return n(e || t.jQuery), i;
}),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("ev-emitter/ev-emitter", e)
            : "object" == typeof module && module.exports
            ? (module.exports = e())
            : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function() {
        function t() {}
        var e = t.prototype;
        return (
            (e.on = function(t, e) {
                if (t && e) {
                    var i = (this._events = this._events || {}),
                        n = (i[t] = i[t] || []);
                    return n.indexOf(e) == -1 && n.push(e), this;
                }
            }),
            (e.once = function(t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = (this._onceEvents = this._onceEvents || {}),
                        n = (i[t] = i[t] || {});
                    return (n[e] = !0), this;
                }
            }),
            (e.off = function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return n != -1 && i.splice(n, 1), this;
                }
            }),
            (e.emitEvent = function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    (i = i.slice(0)), (e = e || []);
                    for (
                        var n = this._onceEvents && this._onceEvents[t], s = 0;
                        s < i.length;
                        s++
                    ) {
                        var o = i[s],
                            r = n && n[o];
                        r && (this.off(t, o), delete n[o]), o.apply(this, e);
                    }
                    return this;
                }
            }),
            (e.allOff = function() {
                delete this._events, delete this._onceEvents;
            }),
            t
        );
    }),
    (function(t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("get-size/get-size", [], function() {
                  return e();
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e())
            : (t.getSize = e());
    })(window, function() {
        "use strict";
        function t(t) {
            var e = parseFloat(t),
                i = t.indexOf("%") == -1 && !isNaN(e);
            return i && e;
        }
        function e() {}
        function i() {
            for (
                var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    },
                    e = 0;
                e < h;
                e++
            ) {
                var i = l[e];
                t[i] = 0;
            }
            return t;
        }
        function n(t) {
            var e = getComputedStyle(t);
            return (
                e ||
                    a(
                        "Style returned " +
                            e +
                            ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                    ),
                e
            );
        }
        function s() {
            if (!c) {
                c = !0;
                var e = document.createElement("div");
                (e.style.width = "200px"),
                    (e.style.padding = "1px 2px 3px 4px"),
                    (e.style.borderStyle = "solid"),
                    (e.style.borderWidth = "1px 2px 3px 4px"),
                    (e.style.boxSizing = "border-box");
                var i = document.body || document.documentElement;
                i.appendChild(e);
                var s = n(e);
                (o.isBoxSizeOuter = r = 200 == t(s.width)), i.removeChild(e);
            }
        }
        function o(e) {
            if (
                (s(),
                "string" == typeof e && (e = document.querySelector(e)),
                e && "object" == typeof e && e.nodeType)
            ) {
                var o = n(e);
                if ("none" == o.display) return i();
                var a = {};
                (a.width = e.offsetWidth), (a.height = e.offsetHeight);
                for (
                    var c = (a.isBorderBox = "border-box" == o.boxSizing),
                        d = 0;
                    d < h;
                    d++
                ) {
                    var u = l[d],
                        f = o[u],
                        p = parseFloat(f);
                    a[u] = isNaN(p) ? 0 : p;
                }
                var g = a.paddingLeft + a.paddingRight,
                    v = a.paddingTop + a.paddingBottom,
                    m = a.marginLeft + a.marginRight,
                    y = a.marginTop + a.marginBottom,
                    b = a.borderLeftWidth + a.borderRightWidth,
                    E = a.borderTopWidth + a.borderBottomWidth,
                    S = c && r,
                    x = t(o.width);
                x !== !1 && (a.width = x + (S ? 0 : g + b));
                var C = t(o.height);
                return (
                    C !== !1 && (a.height = C + (S ? 0 : v + E)),
                    (a.innerWidth = a.width - (g + b)),
                    (a.innerHeight = a.height - (v + E)),
                    (a.outerWidth = a.width + m),
                    (a.outerHeight = a.height + y),
                    a
                );
            }
        }
        var r,
            a =
                "undefined" == typeof console
                    ? e
                    : function(t) {
                          console.error(t);
                      },
            l = [
                "paddingLeft",
                "paddingRight",
                "paddingTop",
                "paddingBottom",
                "marginLeft",
                "marginRight",
                "marginTop",
                "marginBottom",
                "borderLeftWidth",
                "borderRightWidth",
                "borderTopWidth",
                "borderBottomWidth"
            ],
            h = l.length,
            c = !1;
        return o;
    }),
    (function(t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("desandro-matches-selector/matches-selector", e)
            : "object" == typeof module && module.exports
            ? (module.exports = e())
            : (t.matchesSelector = e());
    })(window, function() {
        "use strict";
        var t = (function() {
            var t = window.Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (
                var e = ["webkit", "moz", "ms", "o"], i = 0;
                i < e.length;
                i++
            ) {
                var n = e[i],
                    s = n + "MatchesSelector";
                if (t[s]) return s;
            }
        })();
        return function(e, i) {
            return e[t](i);
        };
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("fizzy-ui-utils/utils", [
                  "desandro-matches-selector/matches-selector"
              ], function(i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("desandro-matches-selector")))
            : (t.fizzyUIUtils = e(t, t.matchesSelector));
    })(window, function(t, e) {
        var i = {};
        (i.extend = function(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }),
            (i.modulo = function(t, e) {
                return ((t % e) + e) % e;
            });
        var n = Array.prototype.slice;
        (i.makeArray = function(t) {
            if (Array.isArray(t)) return t;
            if (null === t || void 0 === t) return [];
            var e = "object" == typeof t && "number" == typeof t.length;
            return e ? n.call(t) : [t];
        }),
            (i.removeFrom = function(t, e) {
                var i = t.indexOf(e);
                i != -1 && t.splice(i, 1);
            }),
            (i.getParent = function(t, i) {
                for (; t.parentNode && t != document.body; )
                    if (((t = t.parentNode), e(t, i))) return t;
            }),
            (i.getQueryElement = function(t) {
                return "string" == typeof t ? document.querySelector(t) : t;
            }),
            (i.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (i.filterFindElements = function(t, n) {
                t = i.makeArray(t);
                var s = [];
                return (
                    t.forEach(function(t) {
                        if (t instanceof HTMLElement) {
                            if (!n) return void s.push(t);
                            e(t, n) && s.push(t);
                            for (
                                var i = t.querySelectorAll(n), o = 0;
                                o < i.length;
                                o++
                            )
                                s.push(i[o]);
                        }
                    }),
                    s
                );
            }),
            (i.debounceMethod = function(t, e, i) {
                i = i || 100;
                var n = t.prototype[e],
                    s = e + "Timeout";
                t.prototype[e] = function() {
                    var t = this[s];
                    clearTimeout(t);
                    var e = arguments,
                        o = this;
                    this[s] = setTimeout(function() {
                        n.apply(o, e), delete o[s];
                    }, i);
                };
            }),
            (i.docReady = function(t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e
                    ? setTimeout(t)
                    : document.addEventListener("DOMContentLoaded", t);
            }),
            (i.toDashed = function(t) {
                return t
                    .replace(/(.)([A-Z])/g, function(t, e, i) {
                        return e + "-" + i;
                    })
                    .toLowerCase();
            });
        var s = t.console;
        return (
            (i.htmlInit = function(e, n) {
                i.docReady(function() {
                    var o = i.toDashed(n),
                        r = "data-" + o,
                        a = document.querySelectorAll("[" + r + "]"),
                        l = document.querySelectorAll(".js-" + o),
                        h = i.makeArray(a).concat(i.makeArray(l)),
                        c = r + "-options",
                        d = t.jQuery;
                    h.forEach(function(t) {
                        var i,
                            o = t.getAttribute(r) || t.getAttribute(c);
                        try {
                            i = o && JSON.parse(o);
                        } catch (a) {
                            return void (
                                s &&
                                s.error(
                                    "Error parsing " +
                                        r +
                                        " on " +
                                        t.className +
                                        ": " +
                                        a
                                )
                            );
                        }
                        var l = new e(t, i);
                        d && d.data(t, n, l);
                    });
                });
            }),
            i
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/cell", ["get-size/get-size"], function(i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("get-size")))
            : ((t.Flickity = t.Flickity || {}),
              (t.Flickity.Cell = e(t, t.getSize)));
    })(window, function(t, e) {
        function i(t, e) {
            (this.element = t), (this.parent = e), this.create();
        }
        var n = i.prototype;
        return (
            (n.create = function() {
                (this.element.style.position = "absolute"),
                    this.element.setAttribute("aria-selected", "false"),
                    (this.x = 0),
                    (this.shift = 0);
            }),
            (n.destroy = function() {
                this.element.style.position = "";
                var t = this.parent.originSide;
                this.element.removeAttribute("aria-selected"),
                    (this.element.style[t] = "");
            }),
            (n.getSize = function() {
                this.size = e(this.element);
            }),
            (n.setPosition = function(t) {
                (this.x = t), this.updateTarget(), this.renderPosition(t);
            }),
            (n.updateTarget = n.setDefaultTarget = function() {
                var t =
                    "left" == this.parent.originSide
                        ? "marginLeft"
                        : "marginRight";
                this.target =
                    this.x +
                    this.size[t] +
                    this.size.width * this.parent.cellAlign;
            }),
            (n.renderPosition = function(t) {
                var e = this.parent.originSide;
                this.element.style[e] = this.parent.getPositionValue(t);
            }),
            (n.wrapShift = function(t) {
                (this.shift = t),
                    this.renderPosition(
                        this.x + this.parent.slideableWidth * t
                    );
            }),
            (n.remove = function() {
                this.element.parentNode.removeChild(this.element);
            }),
            i
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/slide", e)
            : "object" == typeof module && module.exports
            ? (module.exports = e())
            : ((t.Flickity = t.Flickity || {}), (t.Flickity.Slide = e()));
    })(window, function() {
        "use strict";
        function t(t) {
            (this.parent = t),
                (this.isOriginLeft = "left" == t.originSide),
                (this.cells = []),
                (this.outerWidth = 0),
                (this.height = 0);
        }
        var e = t.prototype;
        return (
            (e.addCell = function(t) {
                if (
                    (this.cells.push(t),
                    (this.outerWidth += t.size.outerWidth),
                    (this.height = Math.max(t.size.outerHeight, this.height)),
                    1 == this.cells.length)
                ) {
                    this.x = t.x;
                    var e = this.isOriginLeft ? "marginLeft" : "marginRight";
                    this.firstMargin = t.size[e];
                }
            }),
            (e.updateTarget = function() {
                var t = this.isOriginLeft ? "marginRight" : "marginLeft",
                    e = this.getLastCell(),
                    i = e ? e.size[t] : 0,
                    n = this.outerWidth - (this.firstMargin + i);
                this.target =
                    this.x + this.firstMargin + n * this.parent.cellAlign;
            }),
            (e.getLastCell = function() {
                return this.cells[this.cells.length - 1];
            }),
            (e.select = function() {
                this.changeSelected(!0);
            }),
            (e.unselect = function() {
                this.changeSelected(!1);
            }),
            (e.changeSelected = function(t) {
                var e = t ? "add" : "remove";
                this.cells.forEach(function(i) {
                    i.element.classList[e]("is-selected"),
                        i.element.setAttribute("aria-selected", t.toString());
                });
            }),
            (e.getCellElements = function() {
                return this.cells.map(function(t) {
                    return t.element;
                });
            }),
            t
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(
                  i
              ) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("fizzy-ui-utils")))
            : ((t.Flickity = t.Flickity || {}),
              (t.Flickity.animatePrototype = e(t, t.fizzyUIUtils)));
    })(window, function(t, e) {
        var i = t.requestAnimationFrame || t.webkitRequestAnimationFrame,
            n = 0;
        i ||
            (i = function(t) {
                var e = new Date().getTime(),
                    i = Math.max(0, 16 - (e - n)),
                    s = setTimeout(t, i);
                return (n = e + i), s;
            });
        var s = {};
        (s.startAnimation = function() {
            this.isAnimating ||
                ((this.isAnimating = !0),
                (this.restingFrames = 0),
                this.animate());
        }),
            (s.animate = function() {
                this.applyDragForce(), this.applySelectedAttraction();
                var t = this.x;
                if (
                    (this.integratePhysics(),
                    this.positionSlider(),
                    this.settle(t),
                    this.isAnimating)
                ) {
                    var e = this;
                    i(function() {
                        e.animate();
                    });
                }
            });
        var o = (function() {
            var t = document.documentElement.style;
            return "string" == typeof t.transform
                ? "transform"
                : "WebkitTransform";
        })();
        return (
            (s.positionSlider = function() {
                var t = this.x;
                this.options.wrapAround &&
                    this.cells.length > 1 &&
                    ((t = e.modulo(t, this.slideableWidth)),
                    (t -= this.slideableWidth),
                    this.shiftWrapCells(t)),
                    (t += this.cursorPosition),
                    (t = this.options.rightToLeft && o ? -t : t);
                var i = this.getPositionValue(t);
                this.slider.style[o] = this.isAnimating
                    ? "translate3d(" + i + ",0,0)"
                    : "translateX(" + i + ")";
                var n = this.slides[0];
                if (n) {
                    var s = -this.x - n.target,
                        r = s / this.slidesWidth;
                    this.dispatchEvent("scroll", null, [r, s]);
                }
            }),
            (s.positionSliderAtSelected = function() {
                this.cells.length &&
                    ((this.x = -this.selectedSlide.target),
                    (this.velocity = 0),
                    this.positionSlider());
            }),
            (s.getPositionValue = function(t) {
                return this.options.percentPosition
                    ? 0.01 * Math.round((t / this.size.innerWidth) * 1e4) + "%"
                    : Math.round(t) + "px";
            }),
            (s.settle = function(t) {
                this.isPointerDown ||
                    Math.round(100 * this.x) != Math.round(100 * t) ||
                    this.restingFrames++,
                    this.restingFrames > 2 &&
                        ((this.isAnimating = !1),
                        delete this.isFreeScrolling,
                        this.positionSlider(),
                        this.dispatchEvent("settle", null, [
                            this.selectedIndex
                        ]));
            }),
            (s.shiftWrapCells = function(t) {
                var e = this.cursorPosition + t;
                this._shiftCells(this.beforeShiftCells, e, -1);
                var i =
                    this.size.innerWidth -
                    (t + this.slideableWidth + this.cursorPosition);
                this._shiftCells(this.afterShiftCells, i, 1);
            }),
            (s._shiftCells = function(t, e, i) {
                for (var n = 0; n < t.length; n++) {
                    var s = t[n],
                        o = e > 0 ? i : 0;
                    s.wrapShift(o), (e -= s.size.outerWidth);
                }
            }),
            (s._unshiftCells = function(t) {
                if (t && t.length)
                    for (var e = 0; e < t.length; e++) t[e].wrapShift(0);
            }),
            (s.integratePhysics = function() {
                (this.x += this.velocity),
                    (this.velocity *= this.getFrictionFactor());
            }),
            (s.applyForce = function(t) {
                this.velocity += t;
            }),
            (s.getFrictionFactor = function() {
                return (
                    1 -
                    this.options[
                        this.isFreeScrolling ? "freeScrollFriction" : "friction"
                    ]
                );
            }),
            (s.getRestingPosition = function() {
                return this.x + this.velocity / (1 - this.getFrictionFactor());
            }),
            (s.applyDragForce = function() {
                if (this.isDraggable && this.isPointerDown) {
                    var t = this.dragX - this.x,
                        e = t - this.velocity;
                    this.applyForce(e);
                }
            }),
            (s.applySelectedAttraction = function() {
                var t = this.isDraggable && this.isPointerDown;
                if (!t && !this.isFreeScrolling && this.slides.length) {
                    var e = this.selectedSlide.target * -1 - this.x,
                        i = e * this.options.selectedAttraction;
                    this.applyForce(i);
                }
            }),
            s
        );
    }),
    (function(t, e) {
        if ("function" == typeof define && define.amd)
            define("flickity/js/flickity", [
                "ev-emitter/ev-emitter",
                "get-size/get-size",
                "fizzy-ui-utils/utils",
                "./cell",
                "./slide",
                "./animate"
            ], function(i, n, s, o, r, a) {
                return e(t, i, n, s, o, r, a);
            });
        else if ("object" == typeof module && module.exports)
            module.exports = e(
                t,
                require("ev-emitter"),
                require("get-size"),
                require("fizzy-ui-utils"),
                require("./cell"),
                require("./slide"),
                require("./animate")
            );
        else {
            var i = t.Flickity;
            t.Flickity = e(
                t,
                t.EvEmitter,
                t.getSize,
                t.fizzyUIUtils,
                i.Cell,
                i.Slide,
                i.animatePrototype
            );
        }
    })(window, function(t, e, i, n, s, o, r) {
        function a(t, e) {
            for (t = n.makeArray(t); t.length; ) e.appendChild(t.shift());
        }
        function l(t, e) {
            var i = n.getQueryElement(t);
            if (!i)
                return void (
                    d && d.error("Bad element for Flickity: " + (i || t))
                );
            if (((this.element = i), this.element.flickityGUID)) {
                var s = f[this.element.flickityGUID];
                return s.option(e), s;
            }
            h && (this.$element = h(this.element)),
                (this.options = n.extend({}, this.constructor.defaults)),
                this.option(e),
                this._create();
        }
        var h = t.jQuery,
            c = t.getComputedStyle,
            d = t.console,
            u = 0,
            f = {};
        (l.defaults = {
            accessibility: !0,
            cellAlign: "center",
            freeScrollFriction: 0.075,
            friction: 0.28,
            namespaceJQueryEvents: !0,
            percentPosition: !0,
            resize: !0,
            selectedAttraction: 0.025,
            setGallerySize: !0
        }),
            (l.createMethods = []);
        var p = l.prototype;
        n.extend(p, e.prototype),
            (p._create = function() {
                var e = (this.guid = ++u);
                (this.element.flickityGUID = e),
                    (f[e] = this),
                    (this.selectedIndex = 0),
                    (this.restingFrames = 0),
                    (this.x = 0),
                    (this.velocity = 0),
                    (this.originSide = this.options.rightToLeft
                        ? "right"
                        : "left"),
                    (this.viewport = document.createElement("div")),
                    (this.viewport.className = "flickity-viewport"),
                    this._createSlider(),
                    (this.options.resize || this.options.watchCSS) &&
                        t.addEventListener("resize", this);
                for (var i in this.options.on) {
                    var n = this.options.on[i];
                    this.on(i, n);
                }
                l.createMethods.forEach(function(t) {
                    this[t]();
                }, this),
                    this.options.watchCSS ? this.watchCSS() : this.activate();
            }),
            (p.option = function(t) {
                n.extend(this.options, t);
            }),
            (p.activate = function() {
                if (!this.isActive) {
                    (this.isActive = !0),
                        this.element.classList.add("flickity-enabled"),
                        this.options.rightToLeft &&
                            this.element.classList.add("flickity-rtl"),
                        this.getSize();
                    var t = this._filterFindCellElements(this.element.children);
                    a(t, this.slider),
                        this.viewport.appendChild(this.slider),
                        this.element.appendChild(this.viewport),
                        this.reloadCells(),
                        this.options.accessibility &&
                            ((this.element.tabIndex = 0),
                            this.element.addEventListener("keydown", this)),
                        this.emitEvent("activate");
                    var e,
                        i = this.options.initialIndex;
                    (e = this.isInitActivated
                        ? this.selectedIndex
                        : void 0 !== i && this.cells[i]
                        ? i
                        : 0),
                        this.select(e, !1, !0),
                        (this.isInitActivated = !0),
                        this.dispatchEvent("ready");
                }
            }),
            (p._createSlider = function() {
                var t = document.createElement("div");
                (t.className = "flickity-slider"),
                    (t.style[this.originSide] = 0),
                    (this.slider = t);
            }),
            (p._filterFindCellElements = function(t) {
                return n.filterFindElements(t, this.options.cellSelector);
            }),
            (p.reloadCells = function() {
                (this.cells = this._makeCells(this.slider.children)),
                    this.positionCells(),
                    this._getWrapShiftCells(),
                    this.setGallerySize();
            }),
            (p._makeCells = function(t) {
                var e = this._filterFindCellElements(t),
                    i = e.map(function(t) {
                        return new s(t, this);
                    }, this);
                return i;
            }),
            (p.getLastCell = function() {
                return this.cells[this.cells.length - 1];
            }),
            (p.getLastSlide = function() {
                return this.slides[this.slides.length - 1];
            }),
            (p.positionCells = function() {
                this._sizeCells(this.cells), this._positionCells(0);
            }),
            (p._positionCells = function(t) {
                (t = t || 0),
                    (this.maxCellHeight = t ? this.maxCellHeight || 0 : 0);
                var e = 0;
                if (t > 0) {
                    var i = this.cells[t - 1];
                    e = i.x + i.size.outerWidth;
                }
                for (var n = this.cells.length, s = t; s < n; s++) {
                    var o = this.cells[s];
                    o.setPosition(e),
                        (e += o.size.outerWidth),
                        (this.maxCellHeight = Math.max(
                            o.size.outerHeight,
                            this.maxCellHeight
                        ));
                }
                (this.slideableWidth = e),
                    this.updateSlides(),
                    this._containSlides(),
                    (this.slidesWidth = n
                        ? this.getLastSlide().target - this.slides[0].target
                        : 0);
            }),
            (p._sizeCells = function(t) {
                t.forEach(function(t) {
                    t.getSize();
                });
            }),
            (p.updateSlides = function() {
                if (((this.slides = []), this.cells.length)) {
                    var t = new o(this);
                    this.slides.push(t);
                    var e = "left" == this.originSide,
                        i = e ? "marginRight" : "marginLeft",
                        n = this._getCanCellFit();
                    this.cells.forEach(function(e, s) {
                        if (!t.cells.length) return void t.addCell(e);
                        var r =
                            t.outerWidth -
                            t.firstMargin +
                            (e.size.outerWidth - e.size[i]);
                        n.call(this, s, r)
                            ? t.addCell(e)
                            : (t.updateTarget(),
                              (t = new o(this)),
                              this.slides.push(t),
                              t.addCell(e));
                    }, this),
                        t.updateTarget(),
                        this.updateSelectedSlide();
                }
            }),
            (p._getCanCellFit = function() {
                var t = this.options.groupCells;
                if (!t)
                    return function() {
                        return !1;
                    };
                if ("number" == typeof t) {
                    var e = parseInt(t, 10);
                    return function(t) {
                        return t % e !== 0;
                    };
                }
                var i = "string" == typeof t && t.match(/^(\d+)%$/),
                    n = i ? parseInt(i[1], 10) / 100 : 1;
                return function(t, e) {
                    return e <= (this.size.innerWidth + 1) * n;
                };
            }),
            (p._init = p.reposition = function() {
                this.positionCells(), this.positionSliderAtSelected();
            }),
            (p.getSize = function() {
                (this.size = i(this.element)),
                    this.setCellAlign(),
                    (this.cursorPosition =
                        this.size.innerWidth * this.cellAlign);
            });
        var g = {
            center: { left: 0.5, right: 0.5 },
            left: { left: 0, right: 1 },
            right: { right: 0, left: 1 }
        };
        return (
            (p.setCellAlign = function() {
                var t = g[this.options.cellAlign];
                this.cellAlign = t
                    ? t[this.originSide]
                    : this.options.cellAlign;
            }),
            (p.setGallerySize = function() {
                if (this.options.setGallerySize) {
                    var t =
                        this.options.adaptiveHeight && this.selectedSlide
                            ? this.selectedSlide.height
                            : this.maxCellHeight;
                    this.viewport.style.height = t + "px";
                }
            }),
            (p._getWrapShiftCells = function() {
                if (this.options.wrapAround) {
                    this._unshiftCells(this.beforeShiftCells),
                        this._unshiftCells(this.afterShiftCells);
                    var t = this.cursorPosition,
                        e = this.cells.length - 1;
                    (this.beforeShiftCells = this._getGapCells(t, e, -1)),
                        (t = this.size.innerWidth - this.cursorPosition),
                        (this.afterShiftCells = this._getGapCells(t, 0, 1));
                }
            }),
            (p._getGapCells = function(t, e, i) {
                for (var n = []; t > 0; ) {
                    var s = this.cells[e];
                    if (!s) break;
                    n.push(s), (e += i), (t -= s.size.outerWidth);
                }
                return n;
            }),
            (p._containSlides = function() {
                if (
                    this.options.contain &&
                    !this.options.wrapAround &&
                    this.cells.length
                ) {
                    var t = this.options.rightToLeft,
                        e = t ? "marginRight" : "marginLeft",
                        i = t ? "marginLeft" : "marginRight",
                        n = this.slideableWidth - this.getLastCell().size[i],
                        s = n < this.size.innerWidth,
                        o = this.cursorPosition + this.cells[0].size[e],
                        r = n - this.size.innerWidth * (1 - this.cellAlign);
                    this.slides.forEach(function(t) {
                        s
                            ? (t.target = n * this.cellAlign)
                            : ((t.target = Math.max(t.target, o)),
                              (t.target = Math.min(t.target, r)));
                    }, this);
                }
            }),
            (p.dispatchEvent = function(t, e, i) {
                var n = e ? [e].concat(i) : i;
                if ((this.emitEvent(t, n), h && this.$element)) {
                    t += this.options.namespaceJQueryEvents ? ".flickity" : "";
                    var s = t;
                    if (e) {
                        var o = h.Event(e);
                        (o.type = t), (s = o);
                    }
                    this.$element.trigger(s, i);
                }
            }),
            (p.select = function(t, e, i) {
                if (
                    this.isActive &&
                    ((t = parseInt(t, 10)),
                    this._wrapSelect(t),
                    (this.options.wrapAround || e) &&
                        (t = n.modulo(t, this.slides.length)),
                    this.slides[t])
                ) {
                    var s = this.selectedIndex;
                    (this.selectedIndex = t),
                        this.updateSelectedSlide(),
                        i
                            ? this.positionSliderAtSelected()
                            : this.startAnimation(),
                        this.options.adaptiveHeight && this.setGallerySize(),
                        this.dispatchEvent("select", null, [t]),
                        t != s && this.dispatchEvent("change", null, [t]),
                        this.dispatchEvent("cellSelect");
                }
            }),
            (p._wrapSelect = function(t) {
                var e = this.slides.length,
                    i = this.options.wrapAround && e > 1;
                if (!i) return t;
                var s = n.modulo(t, e),
                    o = Math.abs(s - this.selectedIndex),
                    r = Math.abs(s + e - this.selectedIndex),
                    a = Math.abs(s - e - this.selectedIndex);
                !this.isDragSelect && r < o
                    ? (t += e)
                    : !this.isDragSelect && a < o && (t -= e),
                    t < 0
                        ? (this.x -= this.slideableWidth)
                        : t >= e && (this.x += this.slideableWidth);
            }),
            (p.previous = function(t, e) {
                this.select(this.selectedIndex - 1, t, e);
            }),
            (p.next = function(t, e) {
                this.select(this.selectedIndex + 1, t, e);
            }),
            (p.updateSelectedSlide = function() {
                var t = this.slides[this.selectedIndex];
                t &&
                    (this.unselectSelectedSlide(),
                    (this.selectedSlide = t),
                    t.select(),
                    (this.selectedCells = t.cells),
                    (this.selectedElements = t.getCellElements()),
                    (this.selectedCell = t.cells[0]),
                    (this.selectedElement = this.selectedElements[0]));
            }),
            (p.unselectSelectedSlide = function() {
                this.selectedSlide && this.selectedSlide.unselect();
            }),
            (p.selectCell = function(t, e, i) {
                var n = this.queryCell(t);
                if (n) {
                    var s = this.getCellSlideIndex(n);
                    this.select(s, e, i);
                }
            }),
            (p.getCellSlideIndex = function(t) {
                for (var e = 0; e < this.slides.length; e++) {
                    var i = this.slides[e],
                        n = i.cells.indexOf(t);
                    if (n != -1) return e;
                }
            }),
            (p.getCell = function(t) {
                for (var e = 0; e < this.cells.length; e++) {
                    var i = this.cells[e];
                    if (i.element == t) return i;
                }
            }),
            (p.getCells = function(t) {
                t = n.makeArray(t);
                var e = [];
                return (
                    t.forEach(function(t) {
                        var i = this.getCell(t);
                        i && e.push(i);
                    }, this),
                    e
                );
            }),
            (p.getCellElements = function() {
                return this.cells.map(function(t) {
                    return t.element;
                });
            }),
            (p.getParentCell = function(t) {
                var e = this.getCell(t);
                return e
                    ? e
                    : ((t = n.getParent(t, ".flickity-slider > *")),
                      this.getCell(t));
            }),
            (p.getAdjacentCellElements = function(t, e) {
                if (!t) return this.selectedSlide.getCellElements();
                e = void 0 === e ? this.selectedIndex : e;
                var i = this.slides.length;
                if (1 + 2 * t >= i) return this.getCellElements();
                for (var s = [], o = e - t; o <= e + t; o++) {
                    var r = this.options.wrapAround ? n.modulo(o, i) : o,
                        a = this.slides[r];
                    a && (s = s.concat(a.getCellElements()));
                }
                return s;
            }),
            (p.queryCell = function(t) {
                return "number" == typeof t
                    ? this.cells[t]
                    : ("string" == typeof t &&
                          (t = this.element.querySelector(t)),
                      this.getCell(t));
            }),
            (p.uiChange = function() {
                this.emitEvent("uiChange");
            }),
            (p.childUIPointerDown = function(t) {
                this.emitEvent("childUIPointerDown", [t]);
            }),
            (p.onresize = function() {
                this.watchCSS(), this.resize();
            }),
            n.debounceMethod(l, "onresize", 150),
            (p.resize = function() {
                if (this.isActive) {
                    this.getSize(),
                        this.options.wrapAround &&
                            (this.x = n.modulo(this.x, this.slideableWidth)),
                        this.positionCells(),
                        this._getWrapShiftCells(),
                        this.setGallerySize(),
                        this.emitEvent("resize");
                    var t = this.selectedElements && this.selectedElements[0];
                    this.selectCell(t, !1, !0);
                }
            }),
            (p.watchCSS = function() {
                var t = this.options.watchCSS;
                if (t) {
                    var e = c(this.element, ":after").content;
                    e.indexOf("flickity") != -1
                        ? this.activate()
                        : this.deactivate();
                }
            }),
            (p.onkeydown = function(t) {
                var e =
                    document.activeElement &&
                    document.activeElement != this.element;
                if (this.options.accessibility && !e) {
                    var i = l.keyboardHandlers[t.keyCode];
                    i && i.call(this);
                }
            }),
            (l.keyboardHandlers = {
                37: function() {
                    var t = this.options.rightToLeft ? "next" : "previous";
                    this.uiChange(), this[t]();
                },
                39: function() {
                    var t = this.options.rightToLeft ? "previous" : "next";
                    this.uiChange(), this[t]();
                }
            }),
            (p.focus = function() {
                var e = t.pageYOffset;
                this.element.focus(),
                    t.pageYOffset != e && t.scrollTo(t.pageXOffset, e);
            }),
            (p.deactivate = function() {
                this.isActive &&
                    (this.element.classList.remove("flickity-enabled"),
                    this.element.classList.remove("flickity-rtl"),
                    this.unselectSelectedSlide(),
                    this.cells.forEach(function(t) {
                        t.destroy();
                    }),
                    this.element.removeChild(this.viewport),
                    a(this.slider.children, this.element),
                    this.options.accessibility &&
                        (this.element.removeAttribute("tabIndex"),
                        this.element.removeEventListener("keydown", this)),
                    (this.isActive = !1),
                    this.emitEvent("deactivate"));
            }),
            (p.destroy = function() {
                this.deactivate(),
                    t.removeEventListener("resize", this),
                    this.emitEvent("destroy"),
                    h &&
                        this.$element &&
                        h.removeData(this.element, "flickity"),
                    delete this.element.flickityGUID,
                    delete f[this.guid];
            }),
            n.extend(p, r),
            (l.data = function(t) {
                t = n.getQueryElement(t);
                var e = t && t.flickityGUID;
                return e && f[e];
            }),
            n.htmlInit(l, "flickity"),
            h && h.bridget && h.bridget("flickity", l),
            (l.setJQuery = function(t) {
                h = t;
            }),
            (l.Cell = s),
            l
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("unipointer/unipointer", [
                  "ev-emitter/ev-emitter"
              ], function(i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter")))
            : (t.Unipointer = e(t, t.EvEmitter));
    })(window, function(t, e) {
        function i() {}
        function n() {}
        var s = (n.prototype = Object.create(e.prototype));
        (s.bindStartEvent = function(t) {
            this._bindStartEvent(t, !0);
        }),
            (s.unbindStartEvent = function(t) {
                this._bindStartEvent(t, !1);
            }),
            (s._bindStartEvent = function(e, i) {
                i = void 0 === i || !!i;
                var n = i ? "addEventListener" : "removeEventListener";
                t.PointerEvent
                    ? e[n]("pointerdown", this)
                    : (e[n]("mousedown", this), e[n]("touchstart", this));
            }),
            (s.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (s.getTouch = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    if (i.identifier == this.pointerIdentifier) return i;
                }
            }),
            (s.onmousedown = function(t) {
                var e = t.button;
                (e && 0 !== e && 1 !== e) || this._pointerDown(t, t);
            }),
            (s.ontouchstart = function(t) {
                this._pointerDown(t, t.changedTouches[0]);
            }),
            (s.onpointerdown = function(t) {
                this._pointerDown(t, t);
            }),
            (s._pointerDown = function(t, e) {
                t.button ||
                    this.isPointerDown ||
                    ((this.isPointerDown = !0),
                    (this.pointerIdentifier =
                        void 0 !== e.pointerId ? e.pointerId : e.identifier),
                    this.pointerDown(t, e));
            }),
            (s.pointerDown = function(t, e) {
                this._bindPostStartEvents(t),
                    this.emitEvent("pointerDown", [t, e]);
            });
        var o = {
            mousedown: ["mousemove", "mouseup"],
            touchstart: ["touchmove", "touchend", "touchcancel"],
            pointerdown: ["pointermove", "pointerup", "pointercancel"]
        };
        return (
            (s._bindPostStartEvents = function(e) {
                if (e) {
                    var i = o[e.type];
                    i.forEach(function(e) {
                        t.addEventListener(e, this);
                    }, this),
                        (this._boundPointerEvents = i);
                }
            }),
            (s._unbindPostStartEvents = function() {
                this._boundPointerEvents &&
                    (this._boundPointerEvents.forEach(function(e) {
                        t.removeEventListener(e, this);
                    }, this),
                    delete this._boundPointerEvents);
            }),
            (s.onmousemove = function(t) {
                this._pointerMove(t, t);
            }),
            (s.onpointermove = function(t) {
                t.pointerId == this.pointerIdentifier &&
                    this._pointerMove(t, t);
            }),
            (s.ontouchmove = function(t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerMove(t, e);
            }),
            (s._pointerMove = function(t, e) {
                this.pointerMove(t, e);
            }),
            (s.pointerMove = function(t, e) {
                this.emitEvent("pointerMove", [t, e]);
            }),
            (s.onmouseup = function(t) {
                this._pointerUp(t, t);
            }),
            (s.onpointerup = function(t) {
                t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
            }),
            (s.ontouchend = function(t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerUp(t, e);
            }),
            (s._pointerUp = function(t, e) {
                this._pointerDone(), this.pointerUp(t, e);
            }),
            (s.pointerUp = function(t, e) {
                this.emitEvent("pointerUp", [t, e]);
            }),
            (s._pointerDone = function() {
                (this.isPointerDown = !1),
                    delete this.pointerIdentifier,
                    this._unbindPostStartEvents(),
                    this.pointerDone();
            }),
            (s.pointerDone = i),
            (s.onpointercancel = function(t) {
                t.pointerId == this.pointerIdentifier &&
                    this._pointerCancel(t, t);
            }),
            (s.ontouchcancel = function(t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerCancel(t, e);
            }),
            (s._pointerCancel = function(t, e) {
                this._pointerDone(), this.pointerCancel(t, e);
            }),
            (s.pointerCancel = function(t, e) {
                this.emitEvent("pointerCancel", [t, e]);
            }),
            (n.getPointerPoint = function(t) {
                return { x: t.pageX, y: t.pageY };
            }),
            n
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("unidragger/unidragger", [
                  "unipointer/unipointer"
              ], function(i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("unipointer")))
            : (t.Unidragger = e(t, t.Unipointer));
    })(window, function(t, e) {
        function i() {}
        var n = (i.prototype = Object.create(e.prototype));
        return (
            (n.bindHandles = function() {
                this._bindHandles(!0);
            }),
            (n.unbindHandles = function() {
                this._bindHandles(!1);
            }),
            (n._bindHandles = function(e) {
                e = void 0 === e || !!e;
                for (
                    var i = e ? "addEventListener" : "removeEventListener",
                        n = 0;
                    n < this.handles.length;
                    n++
                ) {
                    var s = this.handles[n];
                    this._bindStartEvent(s, e),
                        s[i]("click", this),
                        t.PointerEvent &&
                            (s.style.touchAction = e
                                ? this._touchActionValue
                                : "");
                }
            }),
            (n._touchActionValue = "none"),
            (n.pointerDown = function(t, e) {
                if ("INPUT" == t.target.nodeName && "range" == t.target.type)
                    return (
                        (this.isPointerDown = !1),
                        void delete this.pointerIdentifier
                    );
                this._dragPointerDown(t, e);
                var i = document.activeElement;
                i && i.blur && i.blur(),
                    this._bindPostStartEvents(t),
                    this.emitEvent("pointerDown", [t, e]);
            }),
            (n._dragPointerDown = function(t, i) {
                this.pointerDownPoint = e.getPointerPoint(i);
                var n = this.canPreventDefaultOnPointerDown(t, i);
                n && t.preventDefault();
            }),
            (n.canPreventDefaultOnPointerDown = function(t) {
                return "SELECT" != t.target.nodeName;
            }),
            (n.pointerMove = function(t, e) {
                var i = this._dragPointerMove(t, e);
                this.emitEvent("pointerMove", [t, e, i]),
                    this._dragMove(t, e, i);
            }),
            (n._dragPointerMove = function(t, i) {
                var n = e.getPointerPoint(i),
                    s = {
                        x: n.x - this.pointerDownPoint.x,
                        y: n.y - this.pointerDownPoint.y
                    };
                return (
                    !this.isDragging &&
                        this.hasDragStarted(s) &&
                        this._dragStart(t, i),
                    s
                );
            }),
            (n.hasDragStarted = function(t) {
                return Math.abs(t.x) > 3 || Math.abs(t.y) > 3;
            }),
            (n.pointerUp = function(t, e) {
                this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e);
            }),
            (n._dragPointerUp = function(t, e) {
                this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
            }),
            (n._dragStart = function(t, i) {
                (this.isDragging = !0),
                    (this.dragStartPoint = e.getPointerPoint(i)),
                    (this.isPreventingClicks = !0),
                    this.dragStart(t, i);
            }),
            (n.dragStart = function(t, e) {
                this.emitEvent("dragStart", [t, e]);
            }),
            (n._dragMove = function(t, e, i) {
                this.isDragging && this.dragMove(t, e, i);
            }),
            (n.dragMove = function(t, e, i) {
                t.preventDefault(), this.emitEvent("dragMove", [t, e, i]);
            }),
            (n._dragEnd = function(t, e) {
                (this.isDragging = !1),
                    setTimeout(
                        function() {
                            delete this.isPreventingClicks;
                        }.bind(this)
                    ),
                    this.dragEnd(t, e);
            }),
            (n.dragEnd = function(t, e) {
                this.emitEvent("dragEnd", [t, e]);
            }),
            (n.onclick = function(t) {
                this.isPreventingClicks && t.preventDefault();
            }),
            (n._staticClick = function(t, e) {
                if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
                    var i = t.target.nodeName;
                    ("INPUT" != i && "TEXTAREA" != i) || t.target.focus(),
                        this.staticClick(t, e),
                        "mouseup" != t.type &&
                            ((this.isIgnoringMouseUp = !0),
                            setTimeout(
                                function() {
                                    delete this.isIgnoringMouseUp;
                                }.bind(this),
                                400
                            ));
                }
            }),
            (n.staticClick = function(t, e) {
                this.emitEvent("staticClick", [t, e]);
            }),
            (i.getPointerPoint = e.getPointerPoint),
            i
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/drag", [
                  "./flickity",
                  "unidragger/unidragger",
                  "fizzy-ui-utils/utils"
              ], function(i, n, s) {
                  return e(t, i, n, s);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  t,
                  require("./flickity"),
                  require("unidragger"),
                  require("fizzy-ui-utils")
              ))
            : (t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils));
    })(window, function(t, e, i, n) {
        function s(t) {
            var e = "touchstart" == t.type,
                i = "touch" == t.pointerType,
                n = d[t.target.nodeName];
            return e || i || n;
        }
        function o() {
            return { x: t.pageXOffset, y: t.pageYOffset };
        }
        n.extend(e.defaults, { draggable: ">1", dragThreshold: 3 }),
            e.createMethods.push("_createDrag");
        var r = e.prototype;
        n.extend(r, i.prototype), (r._touchActionValue = "pan-y");
        var a = "createTouch" in document,
            l = !1;
        (r._createDrag = function() {
            this.on("activate", this.onActivateDrag),
                this.on("uiChange", this._uiChangeDrag),
                this.on("childUIPointerDown", this._childUIPointerDownDrag),
                this.on("deactivate", this.unbindDrag),
                this.on("cellChange", this.updateDraggable),
                a &&
                    !l &&
                    (t.addEventListener("touchmove", function() {}), (l = !0));
        }),
            (r.onActivateDrag = function() {
                (this.handles = [this.viewport]),
                    this.bindHandles(),
                    this.updateDraggable();
            }),
            (r.onDeactivateDrag = function() {
                this.unbindHandles(),
                    this.element.classList.remove("is-draggable");
            }),
            (r.updateDraggable = function() {
                ">1" == this.options.draggable
                    ? (this.isDraggable = this.slides.length > 1)
                    : (this.isDraggable = this.options.draggable),
                    this.isDraggable
                        ? this.element.classList.add("is-draggable")
                        : this.element.classList.remove("is-draggable");
            }),
            (r.bindDrag = function() {
                (this.options.draggable = !0), this.updateDraggable();
            }),
            (r.unbindDrag = function() {
                (this.options.draggable = !1), this.updateDraggable();
            }),
            (r._uiChangeDrag = function() {
                delete this.isFreeScrolling;
            }),
            (r._childUIPointerDownDrag = function(t) {
                this.isDraggable &&
                    (t.preventDefault(), this.pointerDownFocus(t));
            });
        var h = { TEXTAREA: !0, INPUT: !0, OPTION: !0 },
            c = {
                radio: !0,
                checkbox: !0,
                button: !0,
                submit: !0,
                image: !0,
                file: !0
            };
        (r.pointerDown = function(e, i) {
            if (!this.isDraggable) return void this._pointerDownDefault(e, i);
            var n = h[e.target.nodeName] && !c[e.target.type];
            if (n)
                return (
                    (this.isPointerDown = !1),
                    void delete this.pointerIdentifier
                );
            var s = document.activeElement,
                r = s && s.blur && s != this.element && s != document.body;
            r && s.blur(),
                this.pointerDownFocus(e),
                (this.dragX = this.x),
                this.viewport.classList.add("is-pointer-down"),
                (this.pointerDownScroll = o()),
                t.addEventListener("scroll", this),
                this._pointerDownDefault(e, i);
        }),
            (r._pointerDownDefault = function(t, e) {
                this._dragPointerDown(t, e),
                    this._bindPostStartEvents(t),
                    this.dispatchEvent("pointerDown", t, [e]);
            }),
            (r.pointerDownFocus = function(t) {
                var e = s(t);
                e || this.focus();
            });
        var d = { INPUT: !0, SELECT: !0 };
        return (
            (r.canPreventDefaultOnPointerDown = function(t) {
                var e = s(t);
                return this.isDraggable && !e;
            }),
            (r.hasDragStarted = function(t) {
                return Math.abs(t.x) > this.options.dragThreshold;
            }),
            (r.pointerUp = function(t, e) {
                delete this.isTouchScrolling,
                    this.viewport.classList.remove("is-pointer-down"),
                    this.dispatchEvent("pointerUp", t, [e]),
                    this._dragPointerUp(t, e);
            }),
            (r.pointerDone = function() {
                t.removeEventListener("scroll", this),
                    delete this.pointerDownScroll;
            }),
            (r.dragStart = function(e, i) {
                this.isDraggable &&
                    ((this.dragStartPosition = this.x),
                    this.startAnimation(),
                    t.removeEventListener("scroll", this),
                    this.dispatchEvent("dragStart", e, [i]));
            }),
            (r.pointerMove = function(t, e) {
                var i = this._dragPointerMove(t, e);
                this.dispatchEvent("pointerMove", t, [e, i]),
                    this._dragMove(t, e, i);
            }),
            (r.dragMove = function(t, e, i) {
                if (this.isDraggable) {
                    t.preventDefault(), (this.previousDragX = this.dragX);
                    var n = this.options.rightToLeft ? -1 : 1;
                    this.options.wrapAround &&
                        (i.x = i.x % this.slideableWidth);
                    var s = this.dragStartPosition + i.x * n;
                    if (!this.options.wrapAround && this.slides.length) {
                        var o = Math.max(
                            -this.slides[0].target,
                            this.dragStartPosition
                        );
                        s = s > o ? 0.5 * (s + o) : s;
                        var r = Math.min(
                            -this.getLastSlide().target,
                            this.dragStartPosition
                        );
                        s = s < r ? 0.5 * (s + r) : s;
                    }
                    (this.dragX = s),
                        (this.dragMoveTime = new Date()),
                        this.dispatchEvent("dragMove", t, [e, i]);
                }
            }),
            (r.dragEnd = function(t, e) {
                if (this.isDraggable) {
                    this.options.freeScroll && (this.isFreeScrolling = !0);
                    var i = this.dragEndRestingSelect();
                    if (this.options.freeScroll && !this.options.wrapAround) {
                        var n = this.getRestingPosition();
                        this.isFreeScrolling =
                            -n > this.slides[0].target &&
                            -n < this.getLastSlide().target;
                    } else
                        this.options.freeScroll ||
                            i != this.selectedIndex ||
                            (i += this.dragEndBoostSelect());
                    delete this.previousDragX,
                        (this.isDragSelect = this.options.wrapAround),
                        this.select(i),
                        delete this.isDragSelect,
                        this.dispatchEvent("dragEnd", t, [e]);
                }
            }),
            (r.dragEndRestingSelect = function() {
                var t = this.getRestingPosition(),
                    e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
                    i = this._getClosestResting(t, e, 1),
                    n = this._getClosestResting(t, e, -1),
                    s = i.distance < n.distance ? i.index : n.index;
                return s;
            }),
            (r._getClosestResting = function(t, e, i) {
                for (
                    var n = this.selectedIndex,
                        s = 1 / 0,
                        o =
                            this.options.contain && !this.options.wrapAround
                                ? function(t, e) {
                                      return t <= e;
                                  }
                                : function(t, e) {
                                      return t < e;
                                  };
                    o(e, s) &&
                    ((n += i),
                    (s = e),
                    (e = this.getSlideDistance(-t, n)),
                    null !== e);

                )
                    e = Math.abs(e);
                return { distance: s, index: n - i };
            }),
            (r.getSlideDistance = function(t, e) {
                var i = this.slides.length,
                    s = this.options.wrapAround && i > 1,
                    o = s ? n.modulo(e, i) : e,
                    r = this.slides[o];
                if (!r) return null;
                var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
                return t - (r.target + a);
            }),
            (r.dragEndBoostSelect = function() {
                if (
                    void 0 === this.previousDragX ||
                    !this.dragMoveTime ||
                    new Date() - this.dragMoveTime > 100
                )
                    return 0;
                var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
                    e = this.previousDragX - this.dragX;
                return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0;
            }),
            (r.staticClick = function(t, e) {
                var i = this.getParentCell(t.target),
                    n = i && i.element,
                    s = i && this.cells.indexOf(i);
                this.dispatchEvent("staticClick", t, [e, n, s]);
            }),
            (r.onscroll = function() {
                var t = o(),
                    e = this.pointerDownScroll.x - t.x,
                    i = this.pointerDownScroll.y - t.y;
                (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone();
            }),
            e
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("tap-listener/tap-listener", [
                  "unipointer/unipointer"
              ], function(i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("unipointer")))
            : (t.TapListener = e(t, t.Unipointer));
    })(window, function(t, e) {
        function i(t) {
            this.bindTap(t);
        }
        var n = (i.prototype = Object.create(e.prototype));
        return (
            (n.bindTap = function(t) {
                t &&
                    (this.unbindTap(),
                    (this.tapElement = t),
                    this._bindStartEvent(t, !0));
            }),
            (n.unbindTap = function() {
                this.tapElement &&
                    (this._bindStartEvent(this.tapElement, !0),
                    delete this.tapElement);
            }),
            (n.pointerUp = function(i, n) {
                if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
                    var s = e.getPointerPoint(n),
                        o = this.tapElement.getBoundingClientRect(),
                        r = t.pageXOffset,
                        a = t.pageYOffset,
                        l =
                            s.x >= o.left + r &&
                            s.x <= o.right + r &&
                            s.y >= o.top + a &&
                            s.y <= o.bottom + a;
                    if (
                        (l && this.emitEvent("tap", [i, n]),
                        "mouseup" != i.type)
                    ) {
                        this.isIgnoringMouseUp = !0;
                        var h = this;
                        setTimeout(function() {
                            delete h.isIgnoringMouseUp;
                        }, 400);
                    }
                }
            }),
            (n.destroy = function() {
                this.pointerDone(), this.unbindTap();
            }),
            i
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/prev-next-button", [
                  "./flickity",
                  "tap-listener/tap-listener",
                  "fizzy-ui-utils/utils"
              ], function(i, n, s) {
                  return e(t, i, n, s);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  t,
                  require("./flickity"),
                  require("tap-listener"),
                  require("fizzy-ui-utils")
              ))
            : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils);
    })(window, function(t, e, i, n) {
        "use strict";
        function s(t, e) {
            (this.direction = t), (this.parent = e), this._create();
        }
        function o(t) {
            return "string" == typeof t
                ? t
                : "M " +
                      t.x0 +
                      ",50 L " +
                      t.x1 +
                      "," +
                      (t.y1 + 50) +
                      " L " +
                      t.x2 +
                      "," +
                      (t.y2 + 50) +
                      " L " +
                      t.x3 +
                      ",50  L " +
                      t.x2 +
                      "," +
                      (50 - t.y2) +
                      " L " +
                      t.x1 +
                      "," +
                      (50 - t.y1) +
                      " Z";
        }
        var r = "http://www.w3.org/2000/svg";
        (s.prototype = Object.create(i.prototype)),
            (s.prototype._create = function() {
                (this.isEnabled = !0), (this.isPrevious = this.direction == -1);
                var t = this.parent.options.rightToLeft ? 1 : -1;
                this.isLeft = this.direction == t;
                var e = (this.element = document.createElement("button"));
                (e.className = "flickity-button flickity-prev-next-button"),
                    (e.className += this.isPrevious ? " previous" : " next"),
                    e.setAttribute("type", "button"),
                    this.disable(),
                    e.setAttribute(
                        "aria-label",
                        this.isPrevious ? "Previous" : "Next"
                    );
                var i = this.createSVG();
                e.appendChild(i),
                    this.on("tap", this.onTap),
                    this.parent.on("select", this.update.bind(this)),
                    this.on(
                        "pointerDown",
                        this.parent.childUIPointerDown.bind(this.parent)
                    );
            }),
            (s.prototype.activate = function() {
                this.bindTap(this.element),
                    this.element.addEventListener("click", this),
                    this.parent.element.appendChild(this.element);
            }),
            (s.prototype.deactivate = function() {
                this.parent.element.removeChild(this.element),
                    i.prototype.destroy.call(this),
                    this.element.removeEventListener("click", this);
            }),
            (s.prototype.createSVG = function() {
                var t = document.createElementNS(r, "svg");
                t.setAttribute("class", "flickity-button-icon"),
                    t.setAttribute("viewBox", "0 0 100 100");
                var e = document.createElementNS(r, "path"),
                    i = o(this.parent.options.arrowShape);
                return (
                    e.setAttribute("d", i),
                    e.setAttribute("class", "arrow"),
                    this.isLeft ||
                        e.setAttribute(
                            "transform",
                            "translate(100, 100) rotate(180) "
                        ),
                    t.appendChild(e),
                    t
                );
            }),
            (s.prototype.onTap = function() {
                if (this.isEnabled) {
                    this.parent.uiChange();
                    var t = this.isPrevious ? "previous" : "next";
                    this.parent[t]();
                }
            }),
            (s.prototype.handleEvent = n.handleEvent),
            (s.prototype.onclick = function() {
                var t = document.activeElement;
                t && t == this.element && this.onTap();
            }),
            (s.prototype.enable = function() {
                this.isEnabled ||
                    ((this.element.disabled = !1), (this.isEnabled = !0));
            }),
            (s.prototype.disable = function() {
                this.isEnabled &&
                    ((this.element.disabled = !0), (this.isEnabled = !1));
            }),
            (s.prototype.update = function() {
                var t = this.parent.slides;
                if (this.parent.options.wrapAround && t.length > 1)
                    return void this.enable();
                var e = t.length ? t.length - 1 : 0,
                    i = this.isPrevious ? 0 : e,
                    n = this.parent.selectedIndex == i ? "disable" : "enable";
                this[n]();
            }),
            (s.prototype.destroy = function() {
                this.deactivate();
            }),
            n.extend(e.defaults, {
                prevNextButtons: !0,
                arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 }
            }),
            e.createMethods.push("_createPrevNextButtons");
        var a = e.prototype;
        return (
            (a._createPrevNextButtons = function() {
                this.options.prevNextButtons &&
                    ((this.prevButton = new s(-1, this)),
                    (this.nextButton = new s(1, this)),
                    this.on("activate", this.activatePrevNextButtons));
            }),
            (a.activatePrevNextButtons = function() {
                this.prevButton.activate(),
                    this.nextButton.activate(),
                    this.on("deactivate", this.deactivatePrevNextButtons);
            }),
            (a.deactivatePrevNextButtons = function() {
                this.prevButton.deactivate(),
                    this.nextButton.deactivate(),
                    this.off("deactivate", this.deactivatePrevNextButtons);
            }),
            (e.PrevNextButton = s),
            e
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/page-dots", [
                  "./flickity",
                  "tap-listener/tap-listener",
                  "fizzy-ui-utils/utils"
              ], function(i, n, s) {
                  return e(t, i, n, s);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  t,
                  require("./flickity"),
                  require("tap-listener"),
                  require("fizzy-ui-utils")
              ))
            : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils);
    })(window, function(t, e, i, n) {
        function s(t) {
            (this.parent = t), this._create();
        }
        (s.prototype = new i()),
            (s.prototype._create = function() {
                (this.holder = document.createElement("ol")),
                    (this.holder.className = "flickity-page-dots"),
                    (this.dots = []),
                    this.on("tap", this.onTap),
                    this.on(
                        "pointerDown",
                        this.parent.childUIPointerDown.bind(this.parent)
                    );
            }),
            (s.prototype.activate = function() {
                this.setDots(),
                    this.bindTap(this.holder),
                    this.parent.element.appendChild(this.holder);
            }),
            (s.prototype.deactivate = function() {
                this.parent.element.removeChild(this.holder),
                    i.prototype.destroy.call(this);
            }),
            (s.prototype.setDots = function() {
                var t = this.parent.slides.length - this.dots.length;
                t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t);
            }),
            (s.prototype.addDots = function(t) {
                for (
                    var e = document.createDocumentFragment(),
                        i = [],
                        n = this.dots.length,
                        s = n + t,
                        o = n;
                    o < s;
                    o++
                ) {
                    var r = document.createElement("li");
                    (r.className = "dot"),
                        r.setAttribute("aria-label", "Page dot " + (o + 1)),
                        e.appendChild(r),
                        i.push(r);
                }
                this.holder.appendChild(e), (this.dots = this.dots.concat(i));
            }),
            (s.prototype.removeDots = function(t) {
                var e = this.dots.splice(this.dots.length - t, t);
                e.forEach(function(t) {
                    this.holder.removeChild(t);
                }, this);
            }),
            (s.prototype.updateSelected = function() {
                this.selectedDot &&
                    ((this.selectedDot.className = "dot"),
                    this.selectedDot.removeAttribute("aria-current")),
                    this.dots.length &&
                        ((this.selectedDot = this.dots[
                            this.parent.selectedIndex
                        ]),
                        (this.selectedDot.className = "dot is-selected"),
                        this.selectedDot.setAttribute("aria-current", "step"));
            }),
            (s.prototype.onTap = function(t) {
                var e = t.target;
                if ("LI" == e.nodeName) {
                    this.parent.uiChange();
                    var i = this.dots.indexOf(e);
                    this.parent.select(i);
                }
            }),
            (s.prototype.destroy = function() {
                this.deactivate();
            }),
            (e.PageDots = s),
            n.extend(e.defaults, { pageDots: !0 }),
            e.createMethods.push("_createPageDots");
        var o = e.prototype;
        return (
            (o._createPageDots = function() {
                this.options.pageDots &&
                    ((this.pageDots = new s(this)),
                    this.on("activate", this.activatePageDots),
                    this.on("select", this.updateSelectedPageDots),
                    this.on("cellChange", this.updatePageDots),
                    this.on("resize", this.updatePageDots),
                    this.on("deactivate", this.deactivatePageDots));
            }),
            (o.activatePageDots = function() {
                this.pageDots.activate();
            }),
            (o.updateSelectedPageDots = function() {
                this.pageDots.updateSelected();
            }),
            (o.updatePageDots = function() {
                this.pageDots.setDots();
            }),
            (o.deactivatePageDots = function() {
                this.pageDots.deactivate();
            }),
            (e.PageDots = s),
            e
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/player", [
                  "ev-emitter/ev-emitter",
                  "fizzy-ui-utils/utils",
                  "./flickity"
              ], function(t, i, n) {
                  return e(t, i, n);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  require("ev-emitter"),
                  require("fizzy-ui-utils"),
                  require("./flickity")
              ))
            : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity);
    })(window, function(t, e, i) {
        function n(t) {
            (this.parent = t),
                (this.state = "stopped"),
                o &&
                    ((this.onVisibilityChange = function() {
                        this.visibilityChange();
                    }.bind(this)),
                    (this.onVisibilityPlay = function() {
                        this.visibilityPlay();
                    }.bind(this)));
        }
        var s, o;
        "hidden" in document
            ? ((s = "hidden"), (o = "visibilitychange"))
            : "webkitHidden" in document &&
              ((s = "webkitHidden"), (o = "webkitvisibilitychange")),
            (n.prototype = Object.create(t.prototype)),
            (n.prototype.play = function() {
                if ("playing" != this.state) {
                    var t = document[s];
                    if (o && t)
                        return void document.addEventListener(
                            o,
                            this.onVisibilityPlay
                        );
                    (this.state = "playing"),
                        o &&
                            document.addEventListener(
                                o,
                                this.onVisibilityChange
                            ),
                        this.tick();
                }
            }),
            (n.prototype.tick = function() {
                if ("playing" == this.state) {
                    var t = this.parent.options.autoPlay;
                    t = "number" == typeof t ? t : 3e3;
                    var e = this;
                    this.clear(),
                        (this.timeout = setTimeout(function() {
                            e.parent.next(!0), e.tick();
                        }, t));
                }
            }),
            (n.prototype.stop = function() {
                (this.state = "stopped"),
                    this.clear(),
                    o &&
                        document.removeEventListener(
                            o,
                            this.onVisibilityChange
                        );
            }),
            (n.prototype.clear = function() {
                clearTimeout(this.timeout);
            }),
            (n.prototype.pause = function() {
                "playing" == this.state &&
                    ((this.state = "paused"), this.clear());
            }),
            (n.prototype.unpause = function() {
                "paused" == this.state && this.play();
            }),
            (n.prototype.visibilityChange = function() {
                var t = document[s];
                this[t ? "pause" : "unpause"]();
            }),
            (n.prototype.visibilityPlay = function() {
                this.play(),
                    document.removeEventListener(o, this.onVisibilityPlay);
            }),
            e.extend(i.defaults, { pauseAutoPlayOnHover: !0 }),
            i.createMethods.push("_createPlayer");
        var r = i.prototype;
        return (
            (r._createPlayer = function() {
                (this.player = new n(this)),
                    this.on("activate", this.activatePlayer),
                    this.on("uiChange", this.stopPlayer),
                    this.on("pointerDown", this.stopPlayer),
                    this.on("deactivate", this.deactivatePlayer);
            }),
            (r.activatePlayer = function() {
                this.options.autoPlay &&
                    (this.player.play(),
                    this.element.addEventListener("mouseenter", this));
            }),
            (r.playPlayer = function() {
                this.player.play();
            }),
            (r.stopPlayer = function() {
                this.player.stop();
            }),
            (r.pausePlayer = function() {
                this.player.pause();
            }),
            (r.unpausePlayer = function() {
                this.player.unpause();
            }),
            (r.deactivatePlayer = function() {
                this.player.stop(),
                    this.element.removeEventListener("mouseenter", this);
            }),
            (r.onmouseenter = function() {
                this.options.pauseAutoPlayOnHover &&
                    (this.player.pause(),
                    this.element.addEventListener("mouseleave", this));
            }),
            (r.onmouseleave = function() {
                this.player.unpause(),
                    this.element.removeEventListener("mouseleave", this);
            }),
            (i.Player = n),
            i
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/add-remove-cell", [
                  "./flickity",
                  "fizzy-ui-utils/utils"
              ], function(i, n) {
                  return e(t, i, n);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  t,
                  require("./flickity"),
                  require("fizzy-ui-utils")
              ))
            : e(t, t.Flickity, t.fizzyUIUtils);
    })(window, function(t, e, i) {
        function n(t) {
            var e = document.createDocumentFragment();
            return (
                t.forEach(function(t) {
                    e.appendChild(t.element);
                }),
                e
            );
        }
        var s = e.prototype;
        return (
            (s.insert = function(t, e) {
                var i = this._makeCells(t);
                if (i && i.length) {
                    var s = this.cells.length;
                    e = void 0 === e ? s : e;
                    var o = n(i),
                        r = e == s;
                    if (r) this.slider.appendChild(o);
                    else {
                        var a = this.cells[e].element;
                        this.slider.insertBefore(o, a);
                    }
                    if (0 === e) this.cells = i.concat(this.cells);
                    else if (r) this.cells = this.cells.concat(i);
                    else {
                        var l = this.cells.splice(e, s - e);
                        this.cells = this.cells.concat(i).concat(l);
                    }
                    this._sizeCells(i), this.cellChange(e, !0);
                }
            }),
            (s.append = function(t) {
                this.insert(t, this.cells.length);
            }),
            (s.prepend = function(t) {
                this.insert(t, 0);
            }),
            (s.remove = function(t) {
                var e = this.getCells(t);
                if (e && e.length) {
                    var n = this.cells.length - 1;
                    e.forEach(function(t) {
                        t.remove();
                        var e = this.cells.indexOf(t);
                        (n = Math.min(e, n)), i.removeFrom(this.cells, t);
                    }, this),
                        this.cellChange(n, !0);
                }
            }),
            (s.cellSizeChange = function(t) {
                var e = this.getCell(t);
                if (e) {
                    e.getSize();
                    var i = this.cells.indexOf(e);
                    this.cellChange(i);
                }
            }),
            (s.cellChange = function(t, e) {
                var i = this.selectedElement;
                this._positionCells(t),
                    this._getWrapShiftCells(),
                    this.setGallerySize();
                var n = this.getCell(i);
                n && (this.selectedIndex = this.getCellSlideIndex(n)),
                    (this.selectedIndex = Math.min(
                        this.slides.length - 1,
                        this.selectedIndex
                    )),
                    this.emitEvent("cellChange", [t]),
                    this.select(this.selectedIndex),
                    e && this.positionSliderAtSelected();
            }),
            e
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/lazyload", [
                  "./flickity",
                  "fizzy-ui-utils/utils"
              ], function(i, n) {
                  return e(t, i, n);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  t,
                  require("./flickity"),
                  require("fizzy-ui-utils")
              ))
            : e(t, t.Flickity, t.fizzyUIUtils);
    })(window, function(t, e, i) {
        "use strict";
        function n(t) {
            if ("IMG" == t.nodeName) {
                var e = t.getAttribute("data-flickity-lazyload"),
                    n = t.getAttribute("data-flickity-lazyload-src"),
                    s = t.getAttribute("data-flickity-lazyload-srcset");
                if (e || n || s) return [t];
            }
            var o =
                    "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]",
                r = t.querySelectorAll(o);
            return i.makeArray(r);
        }
        function s(t, e) {
            (this.img = t), (this.flickity = e), this.load();
        }
        e.createMethods.push("_createLazyload");
        var o = e.prototype;
        return (
            (o._createLazyload = function() {
                this.on("select", this.lazyLoad);
            }),
            (o.lazyLoad = function() {
                var t = this.options.lazyLoad;
                if (t) {
                    var e = "number" == typeof t ? t : 0,
                        i = this.getAdjacentCellElements(e),
                        o = [];
                    i.forEach(function(t) {
                        var e = n(t);
                        o = o.concat(e);
                    }),
                        o.forEach(function(t) {
                            new s(t, this);
                        }, this);
                }
            }),
            (s.prototype.handleEvent = i.handleEvent),
            (s.prototype.load = function() {
                this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this);
                var t =
                        this.img.getAttribute("data-flickity-lazyload") ||
                        this.img.getAttribute("data-flickity-lazyload-src"),
                    e = this.img.getAttribute("data-flickity-lazyload-srcset");
                (this.img.src = t),
                    e && this.img.setAttribute("srcset", e),
                    this.img.removeAttribute("data-flickity-lazyload"),
                    this.img.removeAttribute("data-flickity-lazyload-src"),
                    this.img.removeAttribute("data-flickity-lazyload-srcset");
            }),
            (s.prototype.onload = function(t) {
                this.complete(t, "flickity-lazyloaded");
            }),
            (s.prototype.onerror = function(t) {
                this.complete(t, "flickity-lazyerror");
            }),
            (s.prototype.complete = function(t, e) {
                this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
                var i = this.flickity.getParentCell(this.img),
                    n = i && i.element;
                this.flickity.cellSizeChange(n),
                    this.img.classList.add(e),
                    this.flickity.dispatchEvent("lazyLoad", t, n);
            }),
            (e.LazyLoader = s),
            e
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity/js/index", [
                  "./flickity",
                  "./drag",
                  "./prev-next-button",
                  "./page-dots",
                  "./player",
                  "./add-remove-cell",
                  "./lazyload"
              ], e)
            : "object" == typeof module &&
              module.exports &&
              (module.exports = e(
                  require("./flickity"),
                  require("./drag"),
                  require("./prev-next-button"),
                  require("./page-dots"),
                  require("./player"),
                  require("./add-remove-cell"),
                  require("./lazyload")
              ));
    })(window, function(t) {
        return t;
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define("flickity-as-nav-for/as-nav-for", [
                  "flickity/js/index",
                  "fizzy-ui-utils/utils"
              ], e)
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  require("flickity"),
                  require("fizzy-ui-utils")
              ))
            : (t.Flickity = e(t.Flickity, t.fizzyUIUtils));
    })(window, function(t, e) {
        function i(t, e, i) {
            return (e - t) * i + t;
        }
        t.createMethods.push("_createAsNavFor");
        var n = t.prototype;
        return (
            (n._createAsNavFor = function() {
                this.on("activate", this.activateAsNavFor),
                    this.on("deactivate", this.deactivateAsNavFor),
                    this.on("destroy", this.destroyAsNavFor);
                var t = this.options.asNavFor;
                if (t) {
                    var e = this;
                    setTimeout(function() {
                        e.setNavCompanion(t);
                    });
                }
            }),
            (n.setNavCompanion = function(i) {
                i = e.getQueryElement(i);
                var n = t.data(i);
                if (n && n != this) {
                    this.navCompanion = n;
                    var s = this;
                    (this.onNavCompanionSelect = function() {
                        s.navCompanionSelect();
                    }),
                        n.on("select", this.onNavCompanionSelect),
                        this.on("staticClick", this.onNavStaticClick),
                        this.navCompanionSelect(!0);
                }
            }),
            (n.navCompanionSelect = function(t) {
                if (this.navCompanion) {
                    var e = this.navCompanion.selectedCells[0],
                        n = this.navCompanion.cells.indexOf(e),
                        s = n + this.navCompanion.selectedCells.length - 1,
                        o = Math.floor(i(n, s, this.navCompanion.cellAlign));
                    if (
                        (this.selectCell(o, !1, t),
                        this.removeNavSelectedElements(),
                        !(o >= this.cells.length))
                    ) {
                        var r = this.cells.slice(n, s + 1);
                        (this.navSelectedElements = r.map(function(t) {
                            return t.element;
                        })),
                            this.changeNavSelectedClass("add");
                    }
                }
            }),
            (n.changeNavSelectedClass = function(t) {
                this.navSelectedElements.forEach(function(e) {
                    e.classList[t]("is-nav-selected");
                });
            }),
            (n.activateAsNavFor = function() {
                this.navCompanionSelect(!0);
            }),
            (n.removeNavSelectedElements = function() {
                this.navSelectedElements &&
                    (this.changeNavSelectedClass("remove"),
                    delete this.navSelectedElements);
            }),
            (n.onNavStaticClick = function(t, e, i, n) {
                "number" == typeof n && this.navCompanion.selectCell(n);
            }),
            (n.deactivateAsNavFor = function() {
                this.removeNavSelectedElements();
            }),
            (n.destroyAsNavFor = function() {
                this.navCompanion &&
                    (this.navCompanion.off("select", this.onNavCompanionSelect),
                    this.off("staticClick", this.onNavStaticClick),
                    delete this.navCompanion);
            }),
            t
        );
    }),
    (function(t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("imagesloaded/imagesloaded", [
                  "ev-emitter/ev-emitter"
              ], function(i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter")))
            : (t.imagesLoaded = e(t, t.EvEmitter));
    })("undefined" != typeof window ? window : this, function(t, e) {
        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }
        function n(t) {
            if (Array.isArray(t)) return t;
            var e = "object" == typeof t && "number" == typeof t.length;
            return e ? h.call(t) : [t];
        }
        function s(t, e, o) {
            if (!(this instanceof s)) return new s(t, e, o);
            var r = t;
            return (
                "string" == typeof t && (r = document.querySelectorAll(t)),
                r
                    ? ((this.elements = n(r)),
                      (this.options = i({}, this.options)),
                      "function" == typeof e ? (o = e) : i(this.options, e),
                      o && this.on("always", o),
                      this.getImages(),
                      a && (this.jqDeferred = new a.Deferred()),
                      void setTimeout(this.check.bind(this)))
                    : void l.error("Bad element for imagesLoaded " + (r || t))
            );
        }
        function o(t) {
            this.img = t;
        }
        function r(t, e) {
            (this.url = t), (this.element = e), (this.img = new Image());
        }
        var a = t.jQuery,
            l = t.console,
            h = Array.prototype.slice;
        (s.prototype = Object.create(e.prototype)),
            (s.prototype.options = {}),
            (s.prototype.getImages = function() {
                (this.images = []),
                    this.elements.forEach(this.addElementImages, this);
            }),
            (s.prototype.addElementImages = function(t) {
                "IMG" == t.nodeName && this.addImage(t),
                    this.options.background === !0 &&
                        this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && c[e]) {
                    for (
                        var i = t.querySelectorAll("img"), n = 0;
                        n < i.length;
                        n++
                    ) {
                        var s = i[n];
                        this.addImage(s);
                    }
                    if ("string" == typeof this.options.background) {
                        var o = t.querySelectorAll(this.options.background);
                        for (n = 0; n < o.length; n++) {
                            var r = o[n];
                            this.addElementBackgroundImages(r);
                        }
                    }
                }
            });
        var c = { 1: !0, 9: !0, 11: !0 };
        return (
            (s.prototype.addElementBackgroundImages = function(t) {
                var e = getComputedStyle(t);
                if (e)
                    for (
                        var i = /url\((['"])?(.*?)\1\)/gi,
                            n = i.exec(e.backgroundImage);
                        null !== n;

                    ) {
                        var s = n && n[2];
                        s && this.addBackground(s, t),
                            (n = i.exec(e.backgroundImage));
                    }
            }),
            (s.prototype.addImage = function(t) {
                var e = new o(t);
                this.images.push(e);
            }),
            (s.prototype.addBackground = function(t, e) {
                var i = new r(t, e);
                this.images.push(i);
            }),
            (s.prototype.check = function() {
                function t(t, i, n) {
                    setTimeout(function() {
                        e.progress(t, i, n);
                    });
                }
                var e = this;
                return (
                    (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                        ? void this.images.forEach(function(e) {
                              e.once("progress", t), e.check();
                          })
                        : void this.complete()
                );
            }),
            (s.prototype.progress = function(t, e, i) {
                this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred &&
                        this.jqDeferred.notify &&
                        this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length &&
                        this.complete(),
                    this.options.debug && l && l.log("progress: " + i, t, e);
            }),
            (s.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (
                    ((this.isComplete = !0),
                    this.emitEvent(t, [this]),
                    this.emitEvent("always", [this]),
                    this.jqDeferred)
                ) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this);
                }
            }),
            (o.prototype = Object.create(e.prototype)),
            (o.prototype.check = function() {
                var t = this.getIsImageComplete();
                return t
                    ? void this.confirm(
                          0 !== this.img.naturalWidth,
                          "naturalWidth"
                      )
                    : ((this.proxyImage = new Image()),
                      this.proxyImage.addEventListener("load", this),
                      this.proxyImage.addEventListener("error", this),
                      this.img.addEventListener("load", this),
                      this.img.addEventListener("error", this),
                      void (this.proxyImage.src = this.img.src));
            }),
            (o.prototype.getIsImageComplete = function() {
                return this.img.complete && this.img.naturalWidth;
            }),
            (o.prototype.confirm = function(t, e) {
                (this.isLoaded = t),
                    this.emitEvent("progress", [this, this.img, e]);
            }),
            (o.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (o.prototype.onload = function() {
                this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (o.prototype.onerror = function() {
                this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (o.prototype.unbindEvents = function() {
                this.proxyImage.removeEventListener("load", this),
                    this.proxyImage.removeEventListener("error", this),
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
            }),
            (r.prototype = Object.create(o.prototype)),
            (r.prototype.check = function() {
                this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    (this.img.src = this.url);
                var t = this.getIsImageComplete();
                t &&
                    (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                    this.unbindEvents());
            }),
            (r.prototype.unbindEvents = function() {
                this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
            }),
            (r.prototype.confirm = function(t, e) {
                (this.isLoaded = t),
                    this.emitEvent("progress", [this, this.element, e]);
            }),
            (s.makeJQueryPlugin = function(e) {
                (e = e || t.jQuery),
                    e &&
                        ((a = e),
                        (a.fn.imagesLoaded = function(t, e) {
                            var i = new s(this, t, e);
                            return i.jqDeferred.promise(a(this));
                        }));
            }),
            s.makeJQueryPlugin(),
            s
        );
    }),
    (function(t, e) {
        "function" == typeof define && define.amd
            ? define([
                  "flickity/js/index",
                  "imagesloaded/imagesloaded"
              ], function(i, n) {
                  return e(t, i, n);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(
                  t,
                  require("flickity"),
                  require("imagesloaded")
              ))
            : (t.Flickity = e(t, t.Flickity, t.imagesLoaded));
    })(window, function(t, e, i) {
        "use strict";
        e.createMethods.push("_createImagesLoaded");
        var n = e.prototype;
        return (
            (n._createImagesLoaded = function() {
                this.on("activate", this.imagesLoaded);
            }),
            (n.imagesLoaded = function() {
                function t(t, i) {
                    var n = e.getParentCell(i.img);
                    e.cellSizeChange(n && n.element),
                        e.options.freeScroll || e.positionSliderAtSelected();
                }
                if (this.options.imagesLoaded) {
                    var e = this;
                    i(this.slider).on("progress", t);
                }
            }),
            e
        );
    });
/* imagesloaded */
!(function(t, e) {
    "function" == typeof define && define.amd
        ? define("ev-emitter/ev-emitter", e)
        : "object" == typeof module && module.exports
        ? (module.exports = e())
        : (t.EvEmitter = e());
})("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return (
        (e.on = function(t, e) {
            if (t && e) {
                var i = (this._events = this._events || {}),
                    n = (i[t] = i[t] || []);
                return -1 == n.indexOf(e) && n.push(e), this;
            }
        }),
        (e.once = function(t, e) {
            if (t && e) {
                this.on(t, e);
                var i = (this._onceEvents = this._onceEvents || {}),
                    n = (i[t] = i[t] || {});
                return (n[e] = !0), this;
            }
        }),
        (e.off = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1), this;
            }
        }),
        (e.emitEvent = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0,
                    o = i[n];
                e = e || [];
                for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
                    var s = r && r[o];
                    s && (this.off(t, o), delete r[o]),
                        o.apply(this, e),
                        (n += s ? 0 : 1),
                        (o = i[n]);
                }
                return this;
            }
        }),
        t
    );
}),
    (function(t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(["ev-emitter/ev-emitter"], function(i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter")))
            : (t.imagesLoaded = e(t, t.EvEmitter));
    })("undefined" != typeof window ? window : this, function(t, e) {
        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }
        function n(t) {
            var e = [];
            if (Array.isArray(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0; i < t.length; i++) e.push(t[i]);
            else e.push(t);
            return e;
        }
        function o(t, e, r) {
            return this instanceof o
                ? ("string" == typeof t && (t = document.querySelectorAll(t)),
                  (this.elements = n(t)),
                  (this.options = i({}, this.options)),
                  "function" == typeof e ? (r = e) : i(this.options, e),
                  r && this.on("always", r),
                  this.getImages(),
                  h && (this.jqDeferred = new h.Deferred()),
                  void setTimeout(
                      function() {
                          this.check();
                      }.bind(this)
                  ))
                : new o(t, e, r);
        }
        function r(t) {
            this.img = t;
        }
        function s(t, e) {
            (this.url = t), (this.element = e), (this.img = new Image());
        }
        var h = t.jQuery,
            a = t.console;
        (o.prototype = Object.create(e.prototype)),
            (o.prototype.options = {}),
            (o.prototype.getImages = function() {
                (this.images = []),
                    this.elements.forEach(this.addElementImages, this);
            }),
            (o.prototype.addElementImages = function(t) {
                "IMG" == t.nodeName && this.addImage(t),
                    this.options.background === !0 &&
                        this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && d[e]) {
                    for (
                        var i = t.querySelectorAll("img"), n = 0;
                        n < i.length;
                        n++
                    ) {
                        var o = i[n];
                        this.addImage(o);
                    }
                    if ("string" == typeof this.options.background) {
                        var r = t.querySelectorAll(this.options.background);
                        for (n = 0; n < r.length; n++) {
                            var s = r[n];
                            this.addElementBackgroundImages(s);
                        }
                    }
                }
            });
        var d = { 1: !0, 9: !0, 11: !0 };
        return (
            (o.prototype.addElementBackgroundImages = function(t) {
                var e = getComputedStyle(t);
                if (e)
                    for (
                        var i = /url\((['"])?(.*?)\1\)/gi,
                            n = i.exec(e.backgroundImage);
                        null !== n;

                    ) {
                        var o = n && n[2];
                        o && this.addBackground(o, t),
                            (n = i.exec(e.backgroundImage));
                    }
            }),
            (o.prototype.addImage = function(t) {
                var e = new r(t);
                this.images.push(e);
            }),
            (o.prototype.addBackground = function(t, e) {
                var i = new s(t, e);
                this.images.push(i);
            }),
            (o.prototype.check = function() {
                function t(t, i, n) {
                    setTimeout(function() {
                        e.progress(t, i, n);
                    });
                }
                var e = this;
                return (
                    (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                        ? void this.images.forEach(function(e) {
                              e.once("progress", t), e.check();
                          })
                        : void this.complete()
                );
            }),
            (o.prototype.progress = function(t, e, i) {
                this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred &&
                        this.jqDeferred.notify &&
                        this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length &&
                        this.complete(),
                    this.options.debug && a && a.log("progress: " + i, t, e);
            }),
            (o.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (
                    ((this.isComplete = !0),
                    this.emitEvent(t, [this]),
                    this.emitEvent("always", [this]),
                    this.jqDeferred)
                ) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this);
                }
            }),
            (r.prototype = Object.create(e.prototype)),
            (r.prototype.check = function() {
                var t = this.getIsImageComplete();
                return t
                    ? void this.confirm(
                          0 !== this.img.naturalWidth,
                          "naturalWidth"
                      )
                    : ((this.proxyImage = new Image()),
                      this.proxyImage.addEventListener("load", this),
                      this.proxyImage.addEventListener("error", this),
                      this.img.addEventListener("load", this),
                      this.img.addEventListener("error", this),
                      void (this.proxyImage.src = this.img.src));
            }),
            (r.prototype.getIsImageComplete = function() {
                return this.img.complete && void 0 !== this.img.naturalWidth;
            }),
            (r.prototype.confirm = function(t, e) {
                (this.isLoaded = t),
                    this.emitEvent("progress", [this, this.img, e]);
            }),
            (r.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (r.prototype.onload = function() {
                this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (r.prototype.onerror = function() {
                this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (r.prototype.unbindEvents = function() {
                this.proxyImage.removeEventListener("load", this),
                    this.proxyImage.removeEventListener("error", this),
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
            }),
            (s.prototype = Object.create(r.prototype)),
            (s.prototype.check = function() {
                this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    (this.img.src = this.url);
                var t = this.getIsImageComplete();
                t &&
                    (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                    this.unbindEvents());
            }),
            (s.prototype.unbindEvents = function() {
                this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
            }),
            (s.prototype.confirm = function(t, e) {
                (this.isLoaded = t),
                    this.emitEvent("progress", [this, this.element, e]);
            }),
            (o.makeJQueryPlugin = function(e) {
                (e = e || t.jQuery),
                    e &&
                        ((h = e),
                        (h.fn.imagesLoaded = function(t, e) {
                            var i = new o(this, t, e);
                            return i.jqDeferred.promise(h(this));
                        }));
            }),
            o.makeJQueryPlugin(),
            o
        );
    });
/* Carousel */
!(function(t, e, i, s) {
    function n(e, i) {
        (this.settings = null),
            (this.options = t.extend({}, n.Defaults, i)),
            (this.$element = t(e)),
            (this.drag = t.extend({}, p)),
            (this.state = t.extend({}, u)),
            (this.e = t.extend({}, g)),
            (this._plugins = {}),
            (this._supress = {}),
            (this._current = null),
            (this._speed = null),
            (this._coordinates = []),
            (this._breakpoint = null),
            (this._width = null),
            (this._items = []),
            (this._clones = []),
            (this._mergers = []),
            (this._invalidated = {}),
            (this._pipe = []),
            t.each(
                n.Plugins,
                t.proxy(function(t, e) {
                    this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(
                        this
                    );
                }, this)
            ),
            t.each(
                n.Pipe,
                t.proxy(function(e, i) {
                    this._pipe.push({
                        filter: i.filter,
                        run: t.proxy(i.run, this)
                    });
                }, this)
            ),
            this.setup(),
            this.initialize();
    }
    function o(t) {
        if (t.touches !== s)
            return { x: t.touches[0].pageX, y: t.touches[0].pageY };
        if (t.touches === s) {
            if (t.pageX !== s) return { x: t.pageX, y: t.pageY };
            if (t.pageX === s) return { x: t.clientX, y: t.clientY };
        }
    }
    function r(t) {
        var e,
            s,
            n = i.createElement("div"),
            o = t;
        for (e in o)
            if (((s = o[e]), "undefined" != typeof n.style[s]))
                return (n = null), [s, e];
        return [!1];
    }
    function a() {
        return r([
            "transition",
            "WebkitTransition",
            "MozTransition",
            "OTransition"
        ])[1];
    }
    function h() {
        return r([
            "transform",
            "WebkitTransform",
            "MozTransform",
            "OTransform",
            "msTransform"
        ])[0];
    }
    function l() {
        return r([
            "perspective",
            "webkitPerspective",
            "MozPerspective",
            "OPerspective",
            "MsPerspective"
        ])[0];
    }
    function c() {
        return "ontouchstart" in e || !!navigator.msMaxTouchPoints;
    }
    function d() {
        return e.navigator.msPointerEnabled;
    }
    var p, u, g;
    (p = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }),
        (u = {
            isTouch: !1,
            isScrolling: !1,
            isSwiping: !1,
            direction: !1,
            inMotion: !1
        }),
        (g = {
            _onDragStart: null,
            _onDragMove: null,
            _onDragEnd: null,
            _transitionEnd: null,
            _resizer: null,
            _responsiveCall: null,
            _goToLoop: null,
            _checkVisibile: null
        }),
        (n.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            responsiveClass: !1,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            themeClass: "owl-theme",
            baseClass: "owl-carousel",
            itemClass: "owl-item",
            centerClass: "center",
            activeClass: "active"
        }),
        (n.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
        (n.Plugins = {}),
        (n.Pipe = [
            {
                filter: ["width", "items", "settings"],
                run: function(t) {
                    t.current =
                        this._items &&
                        this._items[this.relative(this._current)];
                }
            },
            {
                filter: ["items", "settings"],
                run: function() {
                    var t = this._clones,
                        e = this.$stage.children(".cloned");
                    (e.length !== t.length ||
                        (!this.settings.loop && t.length > 0)) &&
                        (this.$stage.children(".cloned").remove(),
                        (this._clones = []));
                }
            },
            {
                filter: ["items", "settings"],
                run: function() {
                    var t,
                        e,
                        i = this._clones,
                        s = this._items,
                        n = this.settings.loop
                            ? i.length - Math.max(2 * this.settings.items, 4)
                            : 0;
                    for (t = 0, e = Math.abs(n / 2); e > t; t++)
                        n > 0
                            ? (this.$stage
                                  .children()
                                  .eq(s.length + i.length - 1)
                                  .remove(),
                              i.pop(),
                              this.$stage
                                  .children()
                                  .eq(0)
                                  .remove(),
                              i.pop())
                            : (i.push(i.length / 2),
                              this.$stage.append(
                                  s[i[i.length - 1]].clone().addClass("cloned")
                              ),
                              i.push(s.length - 1 - (i.length - 1) / 2),
                              this.$stage.prepend(
                                  s[i[i.length - 1]].clone().addClass("cloned")
                              ));
                }
            },
            {
                filter: ["width", "items", "settings"],
                run: function() {
                    var t,
                        e,
                        i,
                        s = this.settings.rtl ? 1 : -1,
                        n = (this.width() / this.settings.items).toFixed(3),
                        o = 0;
                    for (
                        this._coordinates = [],
                            e = 0,
                            i = this._clones.length + this._items.length;
                        i > e;
                        e++
                    )
                        (t = this._mergers[this.relative(e)]),
                            (t =
                                (this.settings.mergeFit &&
                                    Math.min(t, this.settings.items)) ||
                                t),
                            (o +=
                                (this.settings.autoWidth
                                    ? this._items[this.relative(e)].width() +
                                      this.settings.margin
                                    : n * t) * s),
                            this._coordinates.push(o);
                }
            },
            {
                filter: ["width", "items", "settings"],
                run: function() {
                    var e,
                        i,
                        s = (this.width() / this.settings.items).toFixed(3),
                        n = {
                            width:
                                Math.abs(
                                    this._coordinates[
                                        this._coordinates.length - 1
                                    ]
                                ) +
                                2 * this.settings.stagePadding,
                            "padding-left": this.settings.stagePadding || "",
                            "padding-right": this.settings.stagePadding || ""
                        };
                    if (
                        (this.$stage.css(n),
                        (n = {
                            width: this.settings.autoWidth
                                ? "auto"
                                : s - this.settings.margin
                        }),
                        (n[
                            this.settings.rtl ? "margin-left" : "margin-right"
                        ] = this.settings.margin),
                        !this.settings.autoWidth &&
                            t.grep(this._mergers, function(t) {
                                return t > 1;
                            }).length > 0)
                    )
                        for (e = 0, i = this._coordinates.length; i > e; e++)
                            (n.width =
                                Math.abs(this._coordinates[e]) -
                                Math.abs(this._coordinates[e - 1] || 0) -
                                this.settings.margin),
                                this.$stage
                                    .children()
                                    .eq(e)
                                    .css(n);
                    else this.$stage.children().css(n);
                }
            },
            {
                filter: ["width", "items", "settings"],
                run: function(t) {
                    t.current &&
                        this.reset(this.$stage.children().index(t.current));
                }
            },
            {
                filter: ["position"],
                run: function() {
                    this.animate(this.coordinates(this._current));
                }
            },
            {
                filter: ["width", "position", "items", "settings"],
                run: function() {
                    var t,
                        e,
                        i,
                        s,
                        n = this.settings.rtl ? 1 : -1,
                        o = 2 * this.settings.stagePadding,
                        r = this.coordinates(this.current()) + o,
                        a = r + this.width() * n,
                        h = [];
                    for (i = 0, s = this._coordinates.length; s > i; i++)
                        (t = this._coordinates[i - 1] || 0),
                            (e = Math.abs(this._coordinates[i]) + o * n),
                            ((this.op(t, "<=", r) && this.op(t, ">", a)) ||
                                (this.op(e, "<", r) && this.op(e, ">", a))) &&
                                h.push(i);
                    this.$stage
                        .children("." + this.settings.activeClass)
                        .removeClass(this.settings.activeClass),
                        this.$stage
                            .children(":eq(" + h.join("), :eq(") + ")")
                            .addClass(this.settings.activeClass),
                        this.settings.center &&
                            (this.$stage
                                .children("." + this.settings.centerClass)
                                .removeClass(this.settings.centerClass),
                            this.$stage
                                .children()
                                .eq(this.current())
                                .addClass(this.settings.centerClass));
                }
            }
        ]),
        (n.prototype.initialize = function() {
            if (
                (this.trigger("initialize"),
                this.$element
                    .addClass(this.settings.baseClass)
                    .addClass(this.settings.themeClass)
                    .toggleClass("owl-rtl", this.settings.rtl),
                this.browserSupport(),
                this.settings.autoWidth && this.state.imagesLoaded !== !0)
            ) {
                var e, i, n;
                if (
                    ((e = this.$element.find("img")),
                    (i = this.settings.nestedItemSelector
                        ? "." + this.settings.nestedItemSelector
                        : s),
                    (n = this.$element.children(i).width()),
                    e.length && 0 >= n)
                )
                    return this.preloadAutoWidthImages(e), !1;
            }
            this.$element.addClass("owl-loading"),
                (this.$stage = t(
                    "<" + this.settings.stageElement + ' class="owl-stage"/>'
                ).wrap('<div class="owl-stage-outer">')),
                this.$element.append(this.$stage.parent()),
                this.replace(
                    this.$element.children().not(this.$stage.parent())
                ),
                (this._width = this.$element.width()),
                this.refresh(),
                this.$element.removeClass("owl-loading").addClass("owl-loaded"),
                this.eventsCall(),
                this.internalEvents(),
                this.addTriggerableEvents(),
                this.trigger("initialized");
        }),
        (n.prototype.setup = function() {
            var e = this.viewport(),
                i = this.options.responsive,
                s = -1,
                n = null;
            i
                ? (t.each(i, function(t) {
                      e >= t && t > s && (s = Number(t));
                  }),
                  (n = t.extend({}, this.options, i[s])),
                  delete n.responsive,
                  n.responsiveClass &&
                      this.$element
                          .attr("class", function(t, e) {
                              return e.replace(/\b owl-responsive-\S+/g, "");
                          })
                          .addClass("owl-responsive-" + s))
                : (n = t.extend({}, this.options)),
                (null !== this.settings && this._breakpoint === s) ||
                    (this.trigger("change", {
                        property: { name: "settings", value: n }
                    }),
                    (this._breakpoint = s),
                    (this.settings = n),
                    this.invalidate("settings"),
                    this.trigger("changed", {
                        property: { name: "settings", value: this.settings }
                    }));
        }),
        (n.prototype.optionsLogic = function() {
            this.$element.toggleClass("owl-center", this.settings.center),
                this.settings.loop &&
                    this._items.length < this.settings.items &&
                    (this.settings.loop = !1),
                this.settings.autoWidth &&
                    ((this.settings.stagePadding = !1),
                    (this.settings.merge = !1));
        }),
        (n.prototype.prepare = function(e) {
            var i = this.trigger("prepare", { content: e });
            return (
                i.data ||
                    (i.data = t("<" + this.settings.itemElement + "/>")
                        .addClass(this.settings.itemClass)
                        .append(e)),
                this.trigger("prepared", { content: i.data }),
                i.data
            );
        }),
        (n.prototype.update = function() {
            for (
                var e = 0,
                    i = this._pipe.length,
                    s = t.proxy(function(t) {
                        return this[t];
                    }, this._invalidated),
                    n = {};
                i > e;

            )
                (this._invalidated.all ||
                    t.grep(this._pipe[e].filter, s).length > 0) &&
                    this._pipe[e].run(n),
                    e++;
            this._invalidated = {};
        }),
        (n.prototype.width = function(t) {
            switch ((t = t || n.Width.Default)) {
                case n.Width.Inner:
                case n.Width.Outer:
                    return this._width;
                default:
                    return (
                        this._width -
                        2 * this.settings.stagePadding +
                        this.settings.margin
                    );
            }
        }),
        (n.prototype.refresh = function() {
            if (0 === this._items.length) return !1;
            new Date().getTime();
            this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$stage.addClass("owl-refresh"),
                this.update(),
                this.$stage.removeClass("owl-refresh"),
                (this.state.orientation = e.orientation),
                this.watchVisibility(),
                this.trigger("refreshed");
        }),
        (n.prototype.eventsCall = function() {
            (this.e._onDragStart = t.proxy(function(t) {
                this.onDragStart(t);
            }, this)),
                (this.e._onDragMove = t.proxy(function(t) {
                    this.onDragMove(t);
                }, this)),
                (this.e._onDragEnd = t.proxy(function(t) {
                    this.onDragEnd(t);
                }, this)),
                (this.e._onResize = t.proxy(function(t) {
                    this.onResize(t);
                }, this)),
                (this.e._transitionEnd = t.proxy(function(t) {
                    this.transitionEnd(t);
                }, this)),
                (this.e._preventClick = t.proxy(function(t) {
                    this.preventClick(t);
                }, this));
        }),
        (n.prototype.onThrottledResize = function() {
            e.clearTimeout(this.resizeTimer),
                (this.resizeTimer = e.setTimeout(
                    this.e._onResize,
                    this.settings.responsiveRefreshRate
                ));
        }),
        (n.prototype.onResize = function() {
            return this._items.length
                ? this._width === this.$element.width()
                    ? !1
                    : this.trigger("resize").isDefaultPrevented()
                    ? !1
                    : ((this._width = this.$element.width()),
                      this.invalidate("width"),
                      this.refresh(),
                      void this.trigger("resized"))
                : !1;
        }),
        (n.prototype.eventsRouter = function(t) {
            var e = t.type;
            "mousedown" === e || "touchstart" === e
                ? this.onDragStart(t)
                : "mousemove" === e || "touchmove" === e
                ? this.onDragMove(t)
                : "mouseup" === e || "touchend" === e
                ? this.onDragEnd(t)
                : "touchcancel" === e && this.onDragEnd(t);
        }),
        (n.prototype.internalEvents = function() {
            var i = (c(), d());
            this.settings.mouseDrag
                ? (this.$stage.on(
                      "mousedown",
                      t.proxy(function(t) {
                          this.eventsRouter(t);
                      }, this)
                  ),
                  this.$stage.on("dragstart", function() {
                      return !1;
                  }),
                  (this.$stage.get(0).onselectstart = function() {
                      return !1;
                  }))
                : this.$element.addClass("owl-text-select-on"),
                this.settings.touchDrag &&
                    !i &&
                    this.$stage.on(
                        "touchstart touchcancel",
                        t.proxy(function(t) {
                            this.eventsRouter(t);
                        }, this)
                    ),
                this.transitionEndVendor &&
                    this.on(
                        this.$stage.get(0),
                        this.transitionEndVendor,
                        this.e._transitionEnd,
                        !1
                    ),
                this.settings.responsive !== !1 &&
                    this.on(e, "resize", t.proxy(this.onThrottledResize, this));
        }),
        (n.prototype.onDragStart = function(s) {
            var n, r, a, h;
            if (
                ((n = s.originalEvent || s || e.event),
                3 === n.which || this.state.isTouch)
            )
                return !1;
            if (
                ("mousedown" === n.type && this.$stage.addClass("owl-grab"),
                this.trigger("drag"),
                (this.drag.startTime = new Date().getTime()),
                this.speed(0),
                (this.state.isTouch = !0),
                (this.state.isScrolling = !1),
                (this.state.isSwiping = !1),
                (this.drag.distance = 0),
                (r = o(n).x),
                (a = o(n).y),
                (this.drag.offsetX = this.$stage.position().left),
                (this.drag.offsetY = this.$stage.position().top),
                this.settings.rtl &&
                    (this.drag.offsetX =
                        this.$stage.position().left +
                        this.$stage.width() -
                        this.width() +
                        this.settings.margin),
                this.state.inMotion && this.support3d)
            )
                (h = this.getTransformProperty()),
                    (this.drag.offsetX = h),
                    this.animate(h),
                    (this.state.inMotion = !0);
            else if (this.state.inMotion && !this.support3d)
                return (this.state.inMotion = !1), !1;
            (this.drag.startX = r - this.drag.offsetX),
                (this.drag.startY = a - this.drag.offsetY),
                (this.drag.start = r - this.drag.startX),
                (this.drag.targetEl = n.target || n.srcElement),
                (this.drag.updatedX = this.drag.start),
                ("IMG" !== this.drag.targetEl.tagName &&
                    "A" !== this.drag.targetEl.tagName) ||
                    (this.drag.targetEl.draggable = !1),
                t(i).on(
                    "mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",
                    t.proxy(function(t) {
                        this.eventsRouter(t);
                    }, this)
                );
        }),
        (n.prototype.onDragMove = function(t) {
            var i, n, r, a, h, l;
            this.state.isTouch &&
                (this.state.isScrolling ||
                    ((i = t.originalEvent || t || e.event),
                    (n = o(i).x),
                    (r = o(i).y),
                    (this.drag.currentX = n - this.drag.startX),
                    (this.drag.currentY = r - this.drag.startY),
                    (this.drag.distance =
                        this.drag.currentX - this.drag.offsetX),
                    this.drag.distance < 0
                        ? (this.state.direction = this.settings.rtl
                              ? "right"
                              : "left")
                        : this.drag.distance > 0 &&
                          (this.state.direction = this.settings.rtl
                              ? "left"
                              : "right"),
                    this.settings.loop
                        ? this.op(
                              this.drag.currentX,
                              ">",
                              this.coordinates(this.minimum())
                          ) && "right" === this.state.direction
                            ? (this.drag.currentX -=
                                  (this.settings.center &&
                                      this.coordinates(0)) -
                                  this.coordinates(this._items.length))
                            : this.op(
                                  this.drag.currentX,
                                  "<",
                                  this.coordinates(this.maximum())
                              ) &&
                              "left" === this.state.direction &&
                              (this.drag.currentX +=
                                  (this.settings.center &&
                                      this.coordinates(0)) -
                                  this.coordinates(this._items.length))
                        : ((a = this.settings.rtl
                              ? this.coordinates(this.maximum())
                              : this.coordinates(this.minimum())),
                          (h = this.settings.rtl
                              ? this.coordinates(this.minimum())
                              : this.coordinates(this.maximum())),
                          (l = this.settings.pullDrag
                              ? this.drag.distance / 5
                              : 0),
                          (this.drag.currentX = Math.max(
                              Math.min(this.drag.currentX, a + l),
                              h + l
                          ))),
                    (this.drag.distance > 8 || this.drag.distance < -8) &&
                        (i.preventDefault !== s
                            ? i.preventDefault()
                            : (i.returnValue = !1),
                        (this.state.isSwiping = !0)),
                    (this.drag.updatedX = this.drag.currentX),
                    (this.drag.currentY > 16 || this.drag.currentY < -16) &&
                        this.state.isSwiping === !1 &&
                        ((this.state.isScrolling = !0),
                        (this.drag.updatedX = this.drag.start)),
                    this.animate(this.drag.updatedX)));
        }),
        (n.prototype.onDragEnd = function(e) {
            var s, n, o;
            if (this.state.isTouch) {
                if (
                    ("mouseup" === e.type &&
                        this.$stage.removeClass("owl-grab"),
                    this.trigger("dragged"),
                    this.drag.targetEl.removeAttribute("draggable"),
                    (this.state.isTouch = !1),
                    (this.state.isScrolling = !1),
                    (this.state.isSwiping = !1),
                    0 === this.drag.distance && this.state.inMotion !== !0)
                )
                    return (this.state.inMotion = !1), !1;
                (this.drag.endTime = new Date().getTime()),
                    (s = this.drag.endTime - this.drag.startTime),
                    (n = Math.abs(this.drag.distance)),
                    (n > 3 || s > 300) && this.removeClick(this.drag.targetEl),
                    (o = this.closest(this.drag.updatedX)),
                    this.speed(
                        this.settings.dragEndSpeed || this.settings.smartSpeed
                    ),
                    this.current(o),
                    this.invalidate("position"),
                    this.update(),
                    this.settings.pullDrag ||
                        this.drag.updatedX !== this.coordinates(o) ||
                        this.transitionEnd(),
                    (this.drag.distance = 0),
                    t(i).off(".owl.dragEvents");
            }
        }),
        (n.prototype.removeClick = function(i) {
            (this.drag.targetEl = i),
                t(i).on("click.preventClick", this.e._preventClick),
                e.setTimeout(function() {
                    t(i).off("click.preventClick");
                }, 300);
        }),
        (n.prototype.preventClick = function(e) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                e.stopPropagation && e.stopPropagation(),
                t(e.target).off("click.preventClick");
        }),
        (n.prototype.getTransformProperty = function() {
            var t, i;
            return (
                (t = e
                    .getComputedStyle(this.$stage.get(0), null)
                    .getPropertyValue(this.vendorName + "transform")),
                (t = t.replace(/matrix(3d)?\(|\)/g, "").split(",")),
                (i = 16 === t.length),
                i !== !0 ? t[4] : t[12]
            );
        }),
        (n.prototype.closest = function(e) {
            var i = -1,
                s = 30,
                n = this.width(),
                o = this.coordinates();
            return (
                this.settings.freeDrag ||
                    t.each(
                        o,
                        t.proxy(function(t, r) {
                            return (
                                e > r - s && r + s > e
                                    ? (i = t)
                                    : this.op(e, "<", r) &&
                                      this.op(e, ">", o[t + 1] || r - n) &&
                                      (i =
                                          "left" === this.state.direction
                                              ? t + 1
                                              : t),
                                -1 === i
                            );
                        }, this)
                    ),
                this.settings.loop ||
                    (this.op(e, ">", o[this.minimum()])
                        ? (i = e = this.minimum())
                        : this.op(e, "<", o[this.maximum()]) &&
                          (i = e = this.maximum())),
                i
            );
        }),
        (n.prototype.animate = function(e) {
            this.trigger("translate"),
                (this.state.inMotion = this.speed() > 0),
                this.support3d
                    ? this.$stage.css({
                          transform: "translate3d(" + e + "px,0px, 0px)",
                          transition: this.speed() / 1e3 + "s"
                      })
                    : this.state.isTouch
                    ? this.$stage.css({ left: e + "px" })
                    : this.$stage.animate(
                          { left: e },
                          this.speed() / 1e3,
                          this.settings.fallbackEasing,
                          t.proxy(function() {
                              this.state.inMotion && this.transitionEnd();
                          }, this)
                      );
        }),
        (n.prototype.current = function(t) {
            if (t === s) return this._current;
            if (0 === this._items.length) return s;
            if (((t = this.normalize(t)), this._current !== t)) {
                var e = this.trigger("change", {
                    property: { name: "position", value: t }
                });
                e.data !== s && (t = this.normalize(e.data)),
                    (this._current = t),
                    this.invalidate("position"),
                    this.trigger("changed", {
                        property: { name: "position", value: this._current }
                    });
            }
            return this._current;
        }),
        (n.prototype.invalidate = function(t) {
            this._invalidated[t] = !0;
        }),
        (n.prototype.reset = function(t) {
            (t = this.normalize(t)),
                t !== s &&
                    ((this._speed = 0),
                    (this._current = t),
                    this.suppress(["translate", "translated"]),
                    this.animate(this.coordinates(t)),
                    this.release(["translate", "translated"]));
        }),
        (n.prototype.normalize = function(e, i) {
            var n = i
                ? this._items.length
                : this._items.length + this._clones.length;
            return !t.isNumeric(e) || 1 > n
                ? s
                : (e = this._clones.length
                      ? ((e % n) + n) % n
                      : Math.max(
                            this.minimum(i),
                            Math.min(this.maximum(i), e)
                        ));
        }),
        (n.prototype.relative = function(t) {
            return (
                (t = this.normalize(t)),
                (t -= this._clones.length / 2),
                this.normalize(t, !0)
            );
        }),
        (n.prototype.maximum = function(t) {
            var e,
                i,
                s,
                n = 0,
                o = this.settings;
            if (t) return this._items.length - 1;
            if (!o.loop && o.center) e = this._items.length - 1;
            else if (o.loop || o.center)
                if (o.loop || o.center) e = this._items.length + o.items;
                else {
                    if (!o.autoWidth && !o.merge)
                        throw "Can not detect maximum absolute position.";
                    for (
                        revert = o.rtl ? 1 : -1,
                            i = this.$stage.width() - this.$element.width();
                        (s = this.coordinates(n)) && !(s * revert >= i);

                    )
                        e = ++n;
                }
            else e = this._items.length - o.items;
            return e;
        }),
        (n.prototype.minimum = function(t) {
            return t ? 0 : this._clones.length / 2;
        }),
        (n.prototype.items = function(t) {
            return t === s
                ? this._items.slice()
                : ((t = this.normalize(t, !0)), this._items[t]);
        }),
        (n.prototype.mergers = function(t) {
            return t === s
                ? this._mergers.slice()
                : ((t = this.normalize(t, !0)), this._mergers[t]);
        }),
        (n.prototype.clones = function(e) {
            var i = this._clones.length / 2,
                n = i + this._items.length,
                o = function(t) {
                    return t % 2 === 0 ? n + t / 2 : i - (t + 1) / 2;
                };
            return e === s
                ? t.map(this._clones, function(t, e) {
                      return o(e);
                  })
                : t.map(this._clones, function(t, i) {
                      return t === e ? o(i) : null;
                  });
        }),
        (n.prototype.speed = function(t) {
            return t !== s && (this._speed = t), this._speed;
        }),
        (n.prototype.coordinates = function(e) {
            var i = null;
            return e === s
                ? t.map(
                      this._coordinates,
                      t.proxy(function(t, e) {
                          return this.coordinates(e);
                      }, this)
                  )
                : (this.settings.center
                      ? ((i = this._coordinates[e]),
                        (i +=
                            ((this.width() -
                                i +
                                (this._coordinates[e - 1] || 0)) /
                                2) *
                            (this.settings.rtl ? -1 : 1)))
                      : (i = this._coordinates[e - 1] || 0),
                  i);
        }),
        (n.prototype.duration = function(t, e, i) {
            return (
                Math.min(Math.max(Math.abs(e - t), 1), 6) *
                Math.abs(i || this.settings.smartSpeed)
            );
        }),
        (n.prototype.to = function(i, s) {
            if (this.settings.loop) {
                var n = i - this.relative(this.current()),
                    o = this.current(),
                    r = this.current(),
                    a = this.current() + n,
                    h = 0 > r - a,
                    l = this._clones.length + this._items.length;
                a < this.settings.items && h === !1
                    ? ((o = r + this._items.length), this.reset(o))
                    : a >= l - this.settings.items &&
                      h === !0 &&
                      ((o = r - this._items.length), this.reset(o)),
                    e.clearTimeout(this.e._goToLoop),
                    (this.e._goToLoop = e.setTimeout(
                        t.proxy(function() {
                            this.speed(this.duration(this.current(), o + n, s)),
                                this.current(o + n),
                                this.update();
                        }, this),
                        30
                    ));
            } else
                this.speed(this.duration(this.current(), i, s)),
                    this.current(i),
                    this.update();
        }),
        (n.prototype.next = function(t) {
            (t = t || !1), this.to(this.relative(this.current()) + 1, t);
        }),
        (n.prototype.prev = function(t) {
            (t = t || !1), this.to(this.relative(this.current()) - 1, t);
        }),
        (n.prototype.transitionEnd = function(t) {
            return t !== s &&
                (t.stopPropagation(),
                (t.target || t.srcElement || t.originalTarget) !==
                    this.$stage.get(0))
                ? !1
                : ((this.state.inMotion = !1), void this.trigger("translated"));
        }),
        (n.prototype.viewport = function() {
            var s;
            if (this.options.responsiveBaseElement !== e)
                s = t(this.options.responsiveBaseElement).width();
            else if (e.innerWidth) s = e.innerWidth;
            else {
                if (!i.documentElement || !i.documentElement.clientWidth)
                    throw "Can not detect viewport width.";
                s = i.documentElement.clientWidth;
            }
            return s;
        }),
        (n.prototype.replace = function(e) {
            this.$stage.empty(),
                (this._items = []),
                e && (e = e instanceof jQuery ? e : t(e)),
                this.settings.nestedItemSelector &&
                    (e = e.find("." + this.settings.nestedItemSelector)),
                e
                    .filter(function() {
                        return 1 === this.nodeType;
                    })
                    .each(
                        t.proxy(function(t, e) {
                            (e = this.prepare(e)),
                                this.$stage.append(e),
                                this._items.push(e),
                                this._mergers.push(
                                    1 *
                                        e
                                            .find("[data-merge]")
                                            .andSelf("[data-merge]")
                                            .attr("data-merge") || 1
                                );
                        }, this)
                    ),
                this.reset(
                    t.isNumeric(this.settings.startPosition)
                        ? this.settings.startPosition
                        : 0
                ),
                this.invalidate("items");
        }),
        (n.prototype.add = function(t, e) {
            (e = e === s ? this._items.length : this.normalize(e, !0)),
                this.trigger("add", { content: t, position: e }),
                0 === this._items.length || e === this._items.length
                    ? (this.$stage.append(t),
                      this._items.push(t),
                      this._mergers.push(
                          1 *
                              t
                                  .find("[data-merge]")
                                  .andSelf("[data-merge]")
                                  .attr("data-merge") || 1
                      ))
                    : (this._items[e].before(t),
                      this._items.splice(e, 0, t),
                      this._mergers.splice(
                          e,
                          0,
                          1 *
                              t
                                  .find("[data-merge]")
                                  .andSelf("[data-merge]")
                                  .attr("data-merge") || 1
                      )),
                this.invalidate("items"),
                this.trigger("added", { content: t, position: e });
        }),
        (n.prototype.remove = function(t) {
            (t = this.normalize(t, !0)),
                t !== s &&
                    (this.trigger("remove", {
                        content: this._items[t],
                        position: t
                    }),
                    this._items[t].remove(),
                    this._items.splice(t, 1),
                    this._mergers.splice(t, 1),
                    this.invalidate("items"),
                    this.trigger("removed", { content: null, position: t }));
        }),
        (n.prototype.addTriggerableEvents = function() {
            var e = t.proxy(function(e, i) {
                return t.proxy(function(t) {
                    t.relatedTarget !== this &&
                        (this.suppress([i]),
                        e.apply(this, [].slice.call(arguments, 1)),
                        this.release([i]));
                }, this);
            }, this);
            t.each(
                {
                    next: this.next,
                    prev: this.prev,
                    to: this.to,
                    destroy: this.destroy,
                    refresh: this.refresh,
                    replace: this.replace,
                    add: this.add,
                    remove: this.remove
                },
                t.proxy(function(t, i) {
                    this.$element.on(
                        t + ".owl.carousel",
                        e(i, t + ".owl.carousel")
                    );
                }, this)
            );
        }),
        (n.prototype.watchVisibility = function() {
            function i(t) {
                return t.offsetWidth > 0 && t.offsetHeight > 0;
            }
            function s() {
                i(this.$element.get(0)) &&
                    (this.$element.removeClass("owl-hidden"),
                    this.refresh(),
                    e.clearInterval(this.e._checkVisibile));
            }
            i(this.$element.get(0)) ||
                (this.$element.addClass("owl-hidden"),
                e.clearInterval(this.e._checkVisibile),
                (this.e._checkVisibile = e.setInterval(t.proxy(s, this), 500)));
        }),
        (n.prototype.preloadAutoWidthImages = function(e) {
            var i, s, n, o;
            (i = 0),
                (s = this),
                e.each(function(r, a) {
                    (n = t(a)),
                        (o = new Image()),
                        (o.onload = function() {
                            i++,
                                n.attr("src", o.src),
                                n.css("opacity", 1),
                                i >= e.length &&
                                    ((s.state.imagesLoaded = !0),
                                    s.initialize());
                        }),
                        (o.src =
                            n.attr("src") ||
                            n.attr("data-src") ||
                            n.attr("data-src-retina"));
                });
        }),
        (n.prototype.destroy = function() {
            this.$element.hasClass(this.settings.themeClass) &&
                this.$element.removeClass(this.settings.themeClass),
                this.settings.responsive !== !1 &&
                    t(e).off("resize.owl.carousel"),
                this.transitionEndVendor &&
                    this.off(
                        this.$stage.get(0),
                        this.transitionEndVendor,
                        this.e._transitionEnd
                    );
            for (var s in this._plugins) this._plugins[s].destroy();
            (this.settings.mouseDrag || this.settings.touchDrag) &&
                (this.$stage.off("mousedown touchstart touchcancel"),
                t(i).off(".owl.dragEvents"),
                (this.$stage.get(0).onselectstart = function() {}),
                this.$stage.off("dragstart", function() {
                    return !1;
                })),
                this.$element.off(".owl"),
                this.$stage.children(".cloned").remove(),
                (this.e = null),
                this.$element.removeData("owlCarousel"),
                this.$stage
                    .children()
                    .contents()
                    .unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.unwrap();
        }),
        (n.prototype.op = function(t, e, i) {
            var s = this.settings.rtl;
            switch (e) {
                case "<":
                    return s ? t > i : i > t;
                case ">":
                    return s ? i > t : t > i;
                case ">=":
                    return s ? i >= t : t >= i;
                case "<=":
                    return s ? t >= i : i >= t;
            }
        }),
        (n.prototype.on = function(t, e, i, s) {
            t.addEventListener
                ? t.addEventListener(e, i, s)
                : t.attachEvent && t.attachEvent("on" + e, i);
        }),
        (n.prototype.off = function(t, e, i, s) {
            t.removeEventListener
                ? t.removeEventListener(e, i, s)
                : t.detachEvent && t.detachEvent("on" + e, i);
        }),
        (n.prototype.trigger = function(e, i, s) {
            var n = {
                    item: { count: this._items.length, index: this.current() }
                },
                o = t.camelCase(
                    t
                        .grep(["on", e, s], function(t) {
                            return t;
                        })
                        .join("-")
                        .toLowerCase()
                ),
                r = t.Event(
                    [e, "owl", s || "carousel"].join(".").toLowerCase(),
                    t.extend({ relatedTarget: this }, n, i)
                );
            return (
                this._supress[e] ||
                    (t.each(this._plugins, function(t, e) {
                        e.onTrigger && e.onTrigger(r);
                    }),
                    this.$element.trigger(r),
                    this.settings &&
                        "function" == typeof this.settings[o] &&
                        this.settings[o].apply(this, r)),
                r
            );
        }),
        (n.prototype.suppress = function(e) {
            t.each(
                e,
                t.proxy(function(t, e) {
                    this._supress[e] = !0;
                }, this)
            );
        }),
        (n.prototype.release = function(e) {
            t.each(
                e,
                t.proxy(function(t, e) {
                    delete this._supress[e];
                }, this)
            );
        }),
        (n.prototype.browserSupport = function() {
            if (((this.support3d = l()), this.support3d)) {
                this.transformVendor = h();
                var t = [
                    "transitionend",
                    "webkitTransitionEnd",
                    "transitionend",
                    "oTransitionEnd"
                ];
                (this.transitionEndVendor = t[a()]),
                    (this.vendorName = this.transformVendor.replace(
                        /Transform/i,
                        ""
                    )),
                    (this.vendorName =
                        "" !== this.vendorName
                            ? "-" + this.vendorName.toLowerCase() + "-"
                            : "");
            }
            this.state.orientation = e.orientation;
        }),
        (t.fn.owlCarousel = function(e) {
            return this.each(function() {
                t(this).data("owlCarousel") ||
                    t(this).data("owlCarousel", new n(this, e));
            });
        }),
        (t.fn.owlCarousel.Constructor = n);
})(window.Zepto || window.jQuery, window, document),
    (function(t, e) {
        var i = function(e) {
            (this._core = e),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel": t.proxy(
                        function(e) {
                            if (
                                e.namespace &&
                                this._core.settings &&
                                this._core.settings.lazyLoad &&
                                ((e.property &&
                                    "position" == e.property.name) ||
                                    "initialized" == e.type)
                            )
                                for (
                                    var i = this._core.settings,
                                        s =
                                            (i.center &&
                                                Math.ceil(i.items / 2)) ||
                                            i.items,
                                        n = (i.center && -1 * s) || 0,
                                        o =
                                            ((e.property && e.property.value) ||
                                                this._core.current()) + n,
                                        r = this._core.clones().length,
                                        a = t.proxy(function(t, e) {
                                            this.load(e);
                                        }, this);
                                    n++ < s;

                                )
                                    this.load(r / 2 + this._core.relative(o)),
                                        r &&
                                            t.each(
                                                this._core.clones(
                                                    this._core.relative(o++)
                                                ),
                                                a
                                            );
                        },
                        this
                    )
                }),
                (this._core.options = t.extend(
                    {},
                    i.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers);
        };
        (i.Defaults = { lazyLoad: !1 }),
            (i.prototype.load = function(i) {
                var s = this._core.$stage.children().eq(i),
                    n = s && s.find(".owl-lazy");
                !n ||
                    t.inArray(s.get(0), this._loaded) > -1 ||
                    (n.each(
                        t.proxy(function(i, s) {
                            var n,
                                o = t(s),
                                r =
                                    (e.devicePixelRatio > 1 &&
                                        o.attr("data-src-retina")) ||
                                    o.attr("data-src");
                            this._core.trigger(
                                "load",
                                { element: o, url: r },
                                "lazy"
                            ),
                                o.is("img")
                                    ? o
                                          .one(
                                              "load.owl.lazy",
                                              t.proxy(function() {
                                                  o.css("opacity", 1),
                                                      this._core.trigger(
                                                          "loaded",
                                                          {
                                                              element: o,
                                                              url: r
                                                          },
                                                          "lazy"
                                                      );
                                              }, this)
                                          )
                                          .attr("src", r)
                                    : ((n = new Image()),
                                      (n.onload = t.proxy(function() {
                                          o.css({
                                              "background-image":
                                                  "url(" + r + ")",
                                              opacity: "1"
                                          }),
                                              this._core.trigger(
                                                  "loaded",
                                                  { element: o, url: r },
                                                  "lazy"
                                              );
                                      }, this)),
                                      (n.src = r));
                        }, this)
                    ),
                    this._loaded.push(s.get(0)));
            }),
            (i.prototype.destroy = function() {
                var t, e;
                for (t in this.handlers)
                    this._core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Lazy = i);
    })(window.Zepto || window.jQuery, window, document),
    (function(t) {
        var e = function(i) {
            (this._core = i),
                (this._handlers = {
                    "initialized.owl.carousel": t.proxy(function() {
                        this._core.settings.autoHeight && this.update();
                    }, this),
                    "changed.owl.carousel": t.proxy(function(t) {
                        this._core.settings.autoHeight &&
                            "position" == t.property.name &&
                            this.update();
                    }, this),
                    "loaded.owl.lazy": t.proxy(function(t) {
                        this._core.settings.autoHeight &&
                            t.element.closest(
                                "." + this._core.settings.itemClass
                            ) ===
                                this._core.$stage
                                    .children()
                                    .eq(this._core.current()) &&
                            this.update();
                    }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers);
        };
        (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (e.prototype.update = function() {
                this._core.$stage
                    .parent()
                    .height(
                        this._core.$stage
                            .children()
                            .eq(this._core.current())
                            .height()
                    )
                    .addClass(this._core.settings.autoHeightClass);
            }),
            (e.prototype.destroy = function() {
                var t, e;
                for (t in this._handlers)
                    this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
    })(window.Zepto || window.jQuery, window, document),
    (function(t, e, i) {
        var s = function(e) {
            (this._core = e),
                (this._videos = {}),
                (this._playing = null),
                (this._fullscreen = !1),
                (this._handlers = {
                    "resize.owl.carousel": t.proxy(function(t) {
                        this._core.settings.video &&
                            !this.isInFullScreen() &&
                            t.preventDefault();
                    }, this),
                    "refresh.owl.carousel changed.owl.carousel": t.proxy(
                        function() {
                            this._playing && this.stop();
                        },
                        this
                    ),
                    "prepared.owl.carousel": t.proxy(function(e) {
                        var i = t(e.content).find(".owl-video");
                        i.length &&
                            (i.css("display", "none"),
                            this.fetch(i, t(e.content)));
                    }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    s.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    t.proxy(function(t) {
                        this.play(t);
                    }, this)
                );
        };
        (s.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (s.prototype.fetch = function(t, e) {
                var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube",
                    s = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
                    n = t.attr("data-width") || this._core.settings.videoWidth,
                    o =
                        t.attr("data-height") ||
                        this._core.settings.videoHeight,
                    r = t.attr("href");
                if (!r) throw new Error("Missing video URL.");
                if (
                    ((s = r.match(
                        /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    )),
                    s[3].indexOf("youtu") > -1)
                )
                    i = "youtube";
                else {
                    if (!(s[3].indexOf("vimeo") > -1))
                        throw new Error("Video URL not supported.");
                    i = "vimeo";
                }
                (s = s[6]),
                    (this._videos[r] = { type: i, id: s, width: n, height: o }),
                    e.attr("data-video", r),
                    this.thumbnail(t, this._videos[r]);
            }),
            (s.prototype.thumbnail = function(e, i) {
                var s,
                    n,
                    o,
                    r =
                        i.width && i.height
                            ? 'style="width:' +
                              i.width +
                              "px;height:" +
                              i.height +
                              'px;"'
                            : "",
                    a = e.find("img"),
                    h = "src",
                    l = "",
                    c = this._core.settings,
                    d = function(t) {
                        (n = '<div class="owl-video-play-icon"></div>'),
                            (s = c.lazyLoad
                                ? '<div class="owl-video-tn ' +
                                  l +
                                  '" ' +
                                  h +
                                  '="' +
                                  t +
                                  '"></div>'
                                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                                  t +
                                  ')"></div>'),
                            e.after(s),
                            e.after(n);
                    };
                return (
                    e.wrap('<div class="owl-video-wrapper"' + r + "></div>"),
                    this._core.settings.lazyLoad &&
                        ((h = "data-src"), (l = "owl-lazy")),
                    a.length
                        ? (d(a.attr(h)), a.remove(), !1)
                        : void ("youtube" === i.type
                              ? ((o =
                                    "http://img.youtube.com/vi/" +
                                    i.id +
                                    "/hqdefault.jpg"),
                                d(o))
                              : "vimeo" === i.type &&
                                t.ajax({
                                    type: "GET",
                                    url:
                                        "http://vimeo.com/api/v2/video/" +
                                        i.id +
                                        ".json",
                                    jsonp: "callback",
                                    dataType: "jsonp",
                                    success: function(t) {
                                        (o = t[0].thumbnail_large), d(o);
                                    }
                                }))
                );
            }),
            (s.prototype.stop = function() {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null);
            }),
            (s.prototype.play = function(e) {
                this._core.trigger("play", null, "video"),
                    this._playing && this.stop();
                var i,
                    s,
                    n = t(e.target || e.srcElement),
                    o = n.closest("." + this._core.settings.itemClass),
                    r = this._videos[o.attr("data-video")],
                    a = r.width || "100%",
                    h = r.height || this._core.$stage.height();
                "youtube" === r.type
                    ? (i =
                          '<iframe width="' +
                          a +
                          '" height="' +
                          h +
                          '" src="http://www.youtube.com/embed/' +
                          r.id +
                          "?autoplay=1&v=" +
                          r.id +
                          '" frameborder="0" allowfullscreen></iframe>')
                    : "vimeo" === r.type &&
                      (i =
                          '<iframe src="http://player.vimeo.com/video/' +
                          r.id +
                          '?autoplay=1" width="' +
                          a +
                          '" height="' +
                          h +
                          '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
                    o.addClass("owl-video-playing"),
                    (this._playing = o),
                    (s = t(
                        '<div style="height:' +
                            h +
                            "px; width:" +
                            a +
                            'px" class="owl-video-frame">' +
                            i +
                            "</div>"
                    )),
                    n.after(s);
            }),
            (s.prototype.isInFullScreen = function() {
                var s =
                    i.fullscreenElement ||
                    i.mozFullScreenElement ||
                    i.webkitFullscreenElement;
                return (
                    s &&
                        t(s)
                            .parent()
                            .hasClass("owl-video-frame") &&
                        (this._core.speed(0), (this._fullscreen = !0)),
                    s && this._fullscreen && this._playing
                        ? !1
                        : this._fullscreen
                        ? ((this._fullscreen = !1), !1)
                        : this._playing &&
                          this._core.state.orientation !== e.orientation
                        ? ((this._core.state.orientation = e.orientation), !1)
                        : !0
                );
            }),
            (s.prototype.destroy = function() {
                var t, e;
                this._core.$element.off("click.owl.video");
                for (t in this._handlers)
                    this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Video = s);
    })(window.Zepto || window.jQuery, window, document),
    (function(t, e, i, s) {
        var n = function(e) {
            (this.core = e),
                (this.core.options = t.extend(
                    {},
                    n.Defaults,
                    this.core.options
                )),
                (this.swapping = !0),
                (this.previous = s),
                (this.next = s),
                (this.handlers = {
                    "change.owl.carousel": t.proxy(function(t) {
                        "position" == t.property.name &&
                            ((this.previous = this.core.current()),
                            (this.next = t.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(
                        function(t) {
                            this.swapping = "translated" == t.type;
                        },
                        this
                    ),
                    "translate.owl.carousel": t.proxy(function() {
                        this.swapping &&
                            (this.core.options.animateOut ||
                                this.core.options.animateIn) &&
                            this.swap();
                    }, this)
                }),
                this.core.$element.on(this.handlers);
        };
        (n.Defaults = { animateOut: !1, animateIn: !1 }),
            (n.prototype.swap = function() {
                if (1 === this.core.settings.items && this.core.support3d) {
                    this.core.speed(0);
                    var e,
                        i = t.proxy(this.clear, this),
                        s = this.core.$stage.children().eq(this.previous),
                        n = this.core.$stage.children().eq(this.next),
                        o = this.core.settings.animateIn,
                        r = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (r &&
                            ((e =
                                this.core.coordinates(this.previous) -
                                this.core.coordinates(this.next)),
                            s
                                .css({ left: e + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(r)
                                .one(
                                    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                                    i
                                )),
                        o &&
                            n
                                .addClass("animated owl-animated-in")
                                .addClass(o)
                                .one(
                                    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                                    i
                                ));
                }
            }),
            (n.prototype.clear = function(e) {
                t(e.target)
                    .css({ left: "" })
                    .removeClass("animated owl-animated-out owl-animated-in")
                    .removeClass(this.core.settings.animateIn)
                    .removeClass(this.core.settings.animateOut),
                    this.core.transitionEnd();
            }),
            (n.prototype.destroy = function() {
                var t, e;
                for (t in this.handlers)
                    this.core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Animate = n);
    })(window.Zepto || window.jQuery, window, document),
    (function(t, e, i) {
        var s = function(e) {
            (this.core = e),
                (this.core.options = t.extend(
                    {},
                    s.Defaults,
                    this.core.options
                )),
                (this.handlers = {
                    "translated.owl.carousel refreshed.owl.carousel": t.proxy(
                        function() {
                            this.autoplay();
                        },
                        this
                    ),
                    "play.owl.autoplay": t.proxy(function(t, e, i) {
                        this.play(e, i);
                    }, this),
                    "stop.owl.autoplay": t.proxy(function() {
                        this.stop();
                    }, this),
                    "mouseover.owl.autoplay": t.proxy(function() {
                        this.core.settings.autoplayHoverPause && this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": t.proxy(function() {
                        this.core.settings.autoplayHoverPause &&
                            this.autoplay();
                    }, this)
                }),
                this.core.$element.on(this.handlers);
        };
        (s.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }),
            (s.prototype.autoplay = function() {
                this.core.settings.autoplay && !this.core.state.videoPlay
                    ? (e.clearInterval(this.interval),
                      (this.interval = e.setInterval(
                          t.proxy(function() {
                              this.play();
                          }, this),
                          this.core.settings.autoplayTimeout
                      )))
                    : e.clearInterval(this.interval);
            }),
            (s.prototype.play = function() {
                return i.hidden === !0 ||
                    this.core.state.isTouch ||
                    this.core.state.isScrolling ||
                    this.core.state.isSwiping ||
                    this.core.state.inMotion
                    ? void 0
                    : this.core.settings.autoplay === !1
                    ? void e.clearInterval(this.interval)
                    : void this.core.next(this.core.settings.autoplaySpeed);
            }),
            (s.prototype.stop = function() {
                e.clearInterval(this.interval);
            }),
            (s.prototype.pause = function() {
                e.clearInterval(this.interval);
            }),
            (s.prototype.destroy = function() {
                var t, i;
                e.clearInterval(this.interval);
                for (t in this.handlers)
                    this.core.$element.off(t, this.handlers[t]);
                for (i in Object.getOwnPropertyNames(this))
                    "function" != typeof this[i] && (this[i] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.autoplay = s);
    })(window.Zepto || window.jQuery, window, document),
    (function(t) {
        "use strict";
        var e = function(i) {
            (this._core = i),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to
                }),
                (this._handlers = {
                    "prepared.owl.carousel": t.proxy(function(e) {
                        this._core.settings.dotsData &&
                            this._templates.push(
                                t(e.content)
                                    .find("[data-dot]")
                                    .andSelf("[data-dot]")
                                    .attr("data-dot")
                            );
                    }, this),
                    "add.owl.carousel": t.proxy(function(e) {
                        this._core.settings.dotsData &&
                            this._templates.splice(
                                e.position,
                                0,
                                t(e.content)
                                    .find("[data-dot]")
                                    .andSelf("[data-dot]")
                                    .attr("data-dot")
                            );
                    }, this),
                    "remove.owl.carousel prepared.owl.carousel": t.proxy(
                        function(t) {
                            this._core.settings.dotsData &&
                                this._templates.splice(t.position, 1);
                        },
                        this
                    ),
                    "change.owl.carousel": t.proxy(function(t) {
                        if (
                            "position" == t.property.name &&
                            !this._core.state.revert &&
                            !this._core.settings.loop &&
                            this._core.settings.navRewind
                        ) {
                            var e = this._core.current(),
                                i = this._core.maximum(),
                                s = this._core.minimum();
                            t.data =
                                t.property.value > i
                                    ? e >= i
                                        ? s
                                        : i
                                    : t.property.value < s
                                    ? i
                                    : t.property.value;
                        }
                    }, this),
                    "changed.owl.carousel": t.proxy(function(t) {
                        "position" == t.property.name && this.draw();
                    }, this),
                    "refreshed.owl.carousel": t.proxy(function() {
                        this._initialized ||
                            (this.initialize(), (this._initialized = !0)),
                            this._core.trigger("refresh", null, "navigation"),
                            this.update(),
                            this.draw(),
                            this._core.trigger("refreshed", null, "navigation");
                    }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this.$element.on(this._handlers);
        };
        (e.Defaults = {
            nav: !1,
            navRewind: !0,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
            controlsClass: "owl-controls"
        }),
            (e.prototype.initialize = function() {
                var e,
                    i,
                    s = this._core.settings;
                s.dotsData ||
                    (this._templates = [
                        t("<div>")
                            .addClass(s.dotClass)
                            .append(t("<span>"))
                            .prop("outerHTML")
                    ]),
                    (s.navContainer && s.dotsContainer) ||
                        (this._controls.$container = t("<div>")
                            .addClass(s.controlsClass)
                            .appendTo(this.$element)),
                    (this._controls.$indicators = s.dotsContainer
                        ? t(s.dotsContainer)
                        : t("<div>")
                              .hide()
                              .addClass(s.dotsClass)
                              .appendTo(this._controls.$container)),
                    this._controls.$indicators.on(
                        "click",
                        "div",
                        t.proxy(function(e) {
                            var i = t(e.target)
                                .parent()
                                .is(this._controls.$indicators)
                                ? t(e.target).index()
                                : t(e.target)
                                      .parent()
                                      .index();
                            e.preventDefault(), this.to(i, s.dotsSpeed);
                        }, this)
                    ),
                    (e = s.navContainer
                        ? t(s.navContainer)
                        : t("<div>")
                              .addClass(s.navContainerClass)
                              .prependTo(this._controls.$container)),
                    (this._controls.$next = t("<" + s.navElement + ">")),
                    (this._controls.$previous = this._controls.$next.clone()),
                    this._controls.$previous
                        .addClass(s.navClass[0])
                        .html(s.navText[0])
                        .hide()
                        .prependTo(e)
                        .on(
                            "click",
                            t.proxy(function() {
                                this.prev(s.navSpeed);
                            }, this)
                        ),
                    this._controls.$next
                        .addClass(s.navClass[1])
                        .html(s.navText[1])
                        .hide()
                        .appendTo(e)
                        .on(
                            "click",
                            t.proxy(function() {
                                this.next(s.navSpeed);
                            }, this)
                        );
                for (i in this._overrides)
                    this._core[i] = t.proxy(this[i], this);
            }),
            (e.prototype.destroy = function() {
                var t, e, i, s;
                for (t in this._handlers)
                    this.$element.off(t, this._handlers[t]);
                for (e in this._controls) this._controls[e].remove();
                for (s in this.overides) this._core[s] = this._overrides[s];
                for (i in Object.getOwnPropertyNames(this))
                    "function" != typeof this[i] && (this[i] = null);
            }),
            (e.prototype.update = function() {
                var t,
                    e,
                    i,
                    s = this._core.settings,
                    n = this._core.clones().length / 2,
                    o = n + this._core.items().length,
                    r =
                        s.center || s.autoWidth || s.dotData
                            ? 1
                            : s.dotsEach || s.items;
                if (
                    ("page" !== s.slideBy &&
                        (s.slideBy = Math.min(s.slideBy, s.items)),
                    s.dots || "page" == s.slideBy)
                )
                    for (this._pages = [], t = n, e = 0, i = 0; o > t; t++)
                        (e >= r || 0 === e) &&
                            (this._pages.push({
                                start: t - n,
                                end: t - n + r - 1
                            }),
                            (e = 0),
                            ++i),
                            (e += this._core.mergers(this._core.relative(t)));
            }),
            (e.prototype.draw = function() {
                var e,
                    i,
                    s = "",
                    n = this._core.settings,
                    o =
                        (this._core.$stage.children(),
                        this._core.relative(this._core.current()));
                if (
                    (!n.nav ||
                        n.loop ||
                        n.navRewind ||
                        (this._controls.$previous.toggleClass(
                            "disabled",
                            0 >= o
                        ),
                        this._controls.$next.toggleClass(
                            "disabled",
                            o >= this._core.maximum()
                        )),
                    this._controls.$previous.toggle(n.nav),
                    this._controls.$next.toggle(n.nav),
                    n.dots)
                ) {
                    if (
                        ((e =
                            this._pages.length -
                            this._controls.$indicators.children().length),
                        n.dotData && 0 !== e)
                    ) {
                        for (
                            i = 0;
                            i < this._controls.$indicators.children().length;
                            i++
                        )
                            s += this._templates[this._core.relative(i)];
                        this._controls.$indicators.html(s);
                    } else
                        e > 0
                            ? ((s = new Array(e + 1).join(this._templates[0])),
                              this._controls.$indicators.append(s))
                            : 0 > e &&
                              this._controls.$indicators
                                  .children()
                                  .slice(e)
                                  .remove();
                    this._controls.$indicators
                        .find(".active")
                        .removeClass("active"),
                        this._controls.$indicators
                            .children()
                            .eq(t.inArray(this.current(), this._pages))
                            .addClass("active");
                }
                this._controls.$indicators.toggle(n.dots);
            }),
            (e.prototype.onTrigger = function(e) {
                var i = this._core.settings;
                e.page = {
                    index: t.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size:
                        i &&
                        (i.center || i.autoWidth || i.dotData
                            ? 1
                            : i.dotsEach || i.items)
                };
            }),
            (e.prototype.current = function() {
                var e = this._core.relative(this._core.current());
                return t
                    .grep(this._pages, function(t) {
                        return t.start <= e && t.end >= e;
                    })
                    .pop();
            }),
            (e.prototype.getPosition = function(e) {
                var i,
                    s,
                    n = this._core.settings;
                return (
                    "page" == n.slideBy
                        ? ((i = t.inArray(this.current(), this._pages)),
                          (s = this._pages.length),
                          e ? ++i : --i,
                          (i = this._pages[((i % s) + s) % s].start))
                        : ((i = this._core.relative(this._core.current())),
                          (s = this._core.items().length),
                          e ? (i += n.slideBy) : (i -= n.slideBy)),
                    i
                );
            }),
            (e.prototype.next = function(e) {
                t.proxy(this._overrides.to, this._core)(
                    this.getPosition(!0),
                    e
                );
            }),
            (e.prototype.prev = function(e) {
                t.proxy(this._overrides.to, this._core)(
                    this.getPosition(!1),
                    e
                );
            }),
            (e.prototype.to = function(e, i, s) {
                var n;
                s
                    ? t.proxy(this._overrides.to, this._core)(e, i)
                    : ((n = this._pages.length),
                      t.proxy(this._overrides.to, this._core)(
                          this._pages[((e % n) + n) % n].start,
                          i
                      ));
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Navigation = e);
    })(window.Zepto || window.jQuery, window, document);
!(function(t, s) {
    "use strict";
    var e = function(n) {
        (this._core = n),
            (this._hashes = {}),
            (this.$element = this._core.$element),
            (this._handlers = {
                "initialized.owl.carousel": t.proxy(function() {
                    "URLHash" == this._core.settings.startPosition &&
                        t(s).trigger("hashchange.owl.navigation");
                }, this),
                "prepared.owl.carousel": t.proxy(function(s) {
                    var e = t(s.content)
                        .find("[data-hash]")
                        .andSelf("[data-hash]")
                        .attr("data-hash");
                    this._hashes[e] = s.content;
                }, this)
            }),
            (this._core.options = t.extend({}, e.Defaults, this._core.options)),
            this.$element.on(this._handlers),
            t(s).on(
                "hashchange.owl.navigation",
                t.proxy(function() {
                    var t = s.location.hash.substring(1),
                        e = this._core.$stage.children(),
                        n = (this._hashes[t] && e.index(this._hashes[t])) || 0;
                    return t ? void this._core.to(n, !1, !0) : !1;
                }, this)
            );
    };
    (e.Defaults = { URLhashListener: !1 }),
        (e.prototype.destroy = function() {
            var e, n;
            t(s).off("hashchange.owl.navigation");
            for (e in this._handlers)
                this._core.$element.off(e, this._handlers[e]);
            for (n in Object.getOwnPropertyNames(this))
                "function" != typeof this[n] && (this[n] = null);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.Hash = e);
})(window.Zepto || window.jQuery, window, document);
/* js_main */
window.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
window.blockStickyHeader = !1;
(function(a) {
    window.CUBER = {
        Nav: {
            $siteHeader: null,
            $siteNav: null,
            $siteOverlay: null,
            mount: function() {
                this.$siteHeader = a("#site-header");
                this.$siteNav = a("#site-nav--mobile");
                this.$siteOverlay = a("#site-overlay");
                a("#site-menu-handle").on(
                    "click focusin",
                    function() {
                        this.$siteNav.hasClass("active") ||
                            (this.$siteNav.addClass("active"),
                            this.$siteNav
                                .removeClass("show-filters")
                                .removeClass("show-cart")
                                .removeClass("show-search"),
                            this.$siteOverlay.addClass("active"),
                            a(".main-body").addClass("sidebar-move"));
                    }.bind(this)
                );
                a("#site-cart-handle a").on(
                    "click",
                    function(b) {
                        b.preventDefault();
                        getCartModal();
                        this.$siteNav.hasClass("active") ||
                            (this.$siteNav.addClass("active"),
                            this.$siteNav
                                .removeClass("show-filters")
                                .removeClass("show-search")
                                .addClass("show-cart"),
                            this.$siteOverlay.addClass("active"),
                            a(".main-body").addClass("sidebar-move"));
                    }.bind(this)
                );
                a("#site-search-handle a").on(
                    "click",
                    function(b) {
                        b.preventDefault();
                        this.$siteNav.hasClass("active") ||
                            (this.$siteNav.addClass("active"),
                            this.$siteNav
                                .removeClass("show-filters")
                                .removeClass("show-cart")
                                .addClass("show-search"),
                            this.$siteOverlay.addClass("active"),
                            a(".main-body").addClass("sidebar-move"));
                    }.bind(this)
                );
                if (0 < a("#site-filter-handle").length)
                    a("#site-filter-handle").on(
                        "click",
                        function() {
                            this.$siteNav.hasClass("active") ||
                                (this.$siteNav.addClass("active"),
                                this.$siteNav
                                    .removeClass("show-cart")
                                    .removeClass("show-search")
                                    .addClass("show-filters"),
                                this.$siteOverlay.addClass("active"),
                                a(".main-body").addClass("sidebar-move"));
                        }.bind(this)
                    );
                a(".site-close-handle, #site-overlay").on(
                    "click",
                    function() {
                        this.$siteNav.hasClass("active") &&
                            (this.$siteNav.removeClass("active"),
                            this.$siteOverlay.removeClass("active"),
                            a(".main-body").removeClass("sidebar-move"));
                    }.bind(this)
                );
            },
            unmount: function() {
                a("#site-menu-handle").off("click");
                a("#site-cart-handle a").off("click");
                a("#site-filter-handle").off("click");
                this.$siteNav.removeClass("active");
                this.$siteOverlay.removeClass("active");
                a(".main-body").removeClass("sidebar-move");
            }
        },
        Product: {
            $productGallery: null,
            $productGalleryButton: null,
            $productGalleryItem: null,
            $productGalleryIndex: null,
            $productCarousel: null,
            $productCarouselImgs: null,
            mount: function(b) {
                var c = {};
                b.data("po", c);
                c.$productGallery = b.find(".box__product-gallery");
                c.$productGalleryButton = b.find(
                    ".box__product-gallery .product-image__button"
                );
                c.$productGalleryItem = b.find(
                    ".box__product-gallery .gallery-item"
                );
                c.$productGalleryButton.append(
                    '<div class="gallery-index icon-pr-fix"><span class="current">' +
                        (void 0 != window.CuberProductImageIndex
                            ? window.CuberProductImageIndex + 1
                            : 1) +
                        '</span> / <span class="total">' +
                        c.$productGalleryItem.length +
                        "</span></div>"
                );
                c.$productGalleryIndex = c.$productGallery.find(
                    ".gallery-index .current"
                );
                c.$productCarousel = c.$productGallery.children(
                    ".site-box-content"
                );
                c.$productGallery.hasClass("scroll") &&
                    a(window)
                        .on(
                            "scroll.product-gallery",
                            function() {
                                c.$productCarousel.hasClass(
                                    "flickity-enabled"
                                ) ||
                                    c.$productGalleryItem.each(
                                        function(b, d) {
                                            a(window).scrollTop() +
                                                a(window).height() >
                                                a(d).offset().top +
                                                    a(window).height() / 2 &&
                                            !a(d).hasClass("current")
                                                ? (a(d).addClass("current"),
                                                  c.$productGalleryIndex.html(
                                                      a(d).index() + 1
                                                  ),
                                                  $(
                                                      ".product-gallery__thumb"
                                                  ).removeClass("active"),
                                                  $(
                                                      '.product-gallery__thumb img[data-image="' +
                                                          a(d)
                                                              .find("img")
                                                              .attr("src") +
                                                          '"]'
                                                  )
                                                      .parents(
                                                          ".product-gallery__thumb"
                                                      )
                                                      .addClass("active"))
                                                : a(window).scrollTop() +
                                                      a(window).height() <
                                                      a(d).offset().top +
                                                          a(window).height() /
                                                              2 &&
                                                  a(d).hasClass("current") &&
                                                  (a(d).removeClass("current"),
                                                  c.$productGalleryIndex.html(
                                                      a(d).index()
                                                  ),
                                                  $(
                                                      ".product-gallery__thumb"
                                                  ).removeClass("active"),
                                                  $(
                                                      '.product-gallery__thumb img[data-image="' +
                                                          a(d)
                                                              .find("img")
                                                              .attr("src") +
                                                          '"]'
                                                  )
                                                      .parents(
                                                          ".product-gallery__thumb"
                                                      )
                                                      .prev()
                                                      .addClass("active"));
                                        }.bind(c)
                                    );
                            }.bind(c)
                        )
                        .trigger("scroll.product-gallery");
                window.CUBER.Main._mountScrollMovers({
                    parent: c.$productGallery,
                    items: a(".gallery-index, .product-sharing, .product-zoom")
                });
                c.$productCarousel.flickity({
                    cellSelector: ".gallery-item",
                    adaptiveHeight: true,
                    initialIndex:
                        void 0 != window.CuberProductImageIndex
                            ? window.CuberProductImageIndex
                            : 0,
                    wrapAround: !0,
                    prevNextButtons: !1,
                    pageDots: !0,
                    watchCSS: c.$productGallery.hasClass("scroll") ? !0 : !1,
                    resize: !1
                });
            },
            unmount: function(b) {
                b = b.data("po");
                a(window).off("scroll.product-gallery");
                b.$productCarousel.off("scroll.flickity");
            }
        },
        Main: {
            _mountScrollMovers: function(b) {
                var c = b.parent,
                    d = !1;
                setTimeout(function() {
                    b.items.removeClass("out-with-you");
                }, 1e3);
                b.items.addClass("icon-pr-fix");
                a(window).on(
                    "scroll.scroll-movers",
                    function() {
                        !d &&
                        a(window).scrollTop() + a(window).height() >
                            c.offset().top + c.height()
                            ? (b.items.addClass("out-with-you"), (d = !0))
                            : d &&
                              a(window).scrollTop() + a(window).height() <=
                                  c.offset().top + c.height() &&
                              ((d = !1), b.items.removeClass("out-with-you"));
                    }.bind(this)
                );
            }
        },
        SplitSlider: {
            _mountFlickity: function() {
                a(".responsive-flickity").flickity({
                    cellSelector: ".slideshow-item",
                    wrapAround: !0,
                    prevNextButtons: !1,
                    pageDots: !1,
                    watchCSS: !0,
                    resize: !0
                });
                var b = a(".box__slideshow-split"),
                    c = a(".responsive-flickity").data("flickity");
                b.find(".slideshow-item");
                0 >= b.find(".slider-meta").length &&
                    (b.find(".slider-meta").remove(),
                    b.append(
                        '<div class="slider-meta hide lap--show"><div class="slider-index"><span class="current">1</span> / <span class="total">' +
                            sliderT +
                            '</span></div><div class="slider-nav"><span class="go-prev">' +
                            a.themeAssets.arrowRight +
                            '</span><span class="go-next">' +
                            a.themeAssets.arrowRight +
                            "</span></div>"
                    ),
                    b.find(".go-prev").on(
                        "click",
                        function() {
                            c.previous();
                        }.bind(this)
                    ),
                    b.find(".go-next").on(
                        "click",
                        function() {
                            c.next();
                        }.bind(this)
                    ),
                    a(".responsive-flickity").on("select.flickity", function() {
                        b.find(".slider-index .current").html(
                            c.selectedIndex + 1
                        );
                    }),
                    setTimeout(function() {
                        b.find(".slider-meta").addClass("active");
                    }, 1e3));
            },
            mount: function(b) {
                var c = a(".box__slideshow-split"),
                    d = c.find(".slideshow-item"),
                    e = c
                        .find(".site-box-background-container")
                        .children("div"),
                    f = [];
                currentScroll = a(window).scrollTop();
                sliderI = Math.min(
                    Math.ceil(currentScroll / a(window).height()),
                    d.length - 1
                );
                sliderJ = sliderI - 1;
                sliderT = d.length;
                b && this._mountFlickity();
                a(".responsive-flickity").hasClass("flickity-enabled")
                    ? (c.height(
                          a(window).height() - a("#site-header").outerHeight()
                      ),
                      c.addClass("remove-min-height"))
                    : (c.css("height", "auto"),
                      c.removeClass("remove-min-height"));
                e.each(function(c) {
                    0 < c
                        ? c < sliderI
                            ? a(this).css(
                                  "clip",
                                  "rect(0 " +
                                      Math.ceil(a(window).width() / 2) +
                                      "px " +
                                      a(window).height() +
                                      "px 0)"
                              )
                            : c == sliderI
                            ? a(this).css(
                                  "clip",
                                  "rect(0 " +
                                      Math.ceil(a(window).width() / 2) +
                                      "px " +
                                      Math.ceil(
                                          a(window).scrollTop() -
                                              a(window).height() * sliderJ
                                      ) +
                                      "px 0)"
                              )
                            : a(this).css(
                                  "clip",
                                  "rect(0 " +
                                      Math.ceil(a(window).width() / 2) +
                                      "px 0 0)"
                              )
                        : (0 == c) & b &&
                          (a(this).css({
                              clip:
                                  "rect(0 " +
                                  Math.ceil(a(window).width() / 2) +
                                  "px 0 0)",
                              opacity: 0
                          }),
                          a(this).addClass("clip-transition"),
                          setTimeout(
                              function() {
                                  a(this).css({
                                      clip:
                                          "rect(0 " +
                                          Math.ceil(a(window).width() / 2) +
                                          "px " +
                                          a(window).height() +
                                          "px 0)",
                                      opacity: 1
                                  });
                              }.bind(this),
                              10
                          ),
                          setTimeout(
                              function() {
                                  a(this).removeClass("clip-transition");
                              }.bind(this),
                              650
                          ));
                    a(this).addClass("active");
                    0 >= a(this).find(".site-box-black-overlay").length &&
                        a(this).append(
                            '<span class="site-box-black-overlay" />'
                        );
                    f.push(a(this).find(".site-box-black-overlay"));
                });
                a(window)
                    .on("scroll.split-slider", function(b) {
                        if (currentScroll < a(window).scrollTop())
                            0 < d.eq(sliderI + 1).length &&
                            a(window).scrollTop() + a(window).height() >=
                                d.eq(sliderI + 1).offset().top
                                ? (0 != sliderI &&
                                      (e
                                          .eq(sliderI)
                                          .css(
                                              "clip",
                                              "rect(0 " +
                                                  Math.ceil(
                                                      a(window).width() / 2
                                                  ) +
                                                  "px " +
                                                  a(window).height() +
                                                  "px 0)"
                                          ),
                                      f[sliderJ] &&
                                          f[sliderJ].css("opacity", 0.5)),
                                  (sliderJ = sliderI),
                                  sliderI++,
                                  (down = !0))
                                : a(window).scrollTop() + a(window).height() >=
                                      c.height() &&
                                  !c.hasClass("back-to-normal") &&
                                  (c.addClass("back-to-normal"),
                                  e
                                      .eq(sliderI)
                                      .css(
                                          "clip",
                                          "rect(0 " +
                                              Math.ceil(a(window).width() / 2) +
                                              "px " +
                                              a(window).height() +
                                              "px 0)"
                                      ));
                        else if (
                            0 < d.eq(sliderI).length &&
                            0 < d.eq(sliderI - 1).length &&
                            a(window).scrollTop() + a(window).height() <
                                d.eq(sliderI).offset().top
                        ) {
                            var g = e.eq(sliderI).hasClass("obs") ? 1 : 0;
                            e.eq(sliderI).css(
                                "clip",
                                "rect(0 " +
                                    Math.ceil(a(window).width() / 2) +
                                    "px " +
                                    g +
                                    "px 0)"
                            );
                            f[sliderJ] && f[sliderJ].css("opacity", 0);
                            sliderI--;
                            sliderJ = sliderI - 1;
                            down = !1;
                        } else
                            a(window).scrollTop() + a(window).height() <=
                                c.height() &&
                                c.hasClass("back-to-normal") &&
                                c.removeClass("back-to-normal");
                        c.hasClass("back-to-normal") ||
                            ((b = Math.ceil(
                                a(window).scrollTop() -
                                    a(window).height() * sliderJ
                            )),
                            (g = e.eq(sliderI).hasClass("obs") ? 1 : 0),
                            e
                                .eq(sliderI)
                                .css(
                                    "clip",
                                    "rect(0 " +
                                        Math.ceil(a(window).width() / 2) +
                                        "px " +
                                        Math.max(g, b) +
                                        "px 0)"
                                ),
                            f[sliderJ] &&
                                f[sliderJ].css(
                                    "opacity",
                                    Math.ceil((50 * b) / a(window).height()) /
                                        100
                                ),
                            (g = Math.round(a(window).height() / 6)),
                            d
                                .eq(sliderJ)
                                .find(".caption")
                                .css(
                                    "transform",
                                    "translateY(" +
                                        (0 -
                                            Math.ceil(
                                                (1 * b * g) / a(window).height()
                                            )) +
                                        "px)"
                                ),
                            d
                                .eq(sliderJ)
                                .find(".title")
                                .css(
                                    "transform",
                                    "translateY(" +
                                        (0 -
                                            Math.ceil(
                                                (0.75 * b * g) /
                                                    a(window).height()
                                            )) +
                                        "px)"
                                ),
                            d
                                .eq(sliderJ)
                                .find(".subtitle")
                                .css(
                                    "transform",
                                    "translateY(" +
                                        (0 -
                                            Math.ceil(
                                                (0.5 * b * g) /
                                                    a(window).height()
                                            )) +
                                        "px)"
                                ),
                            d
                                .eq(sliderJ)
                                .find(".button")
                                .css(
                                    "transform",
                                    "translateY(" +
                                        (0 -
                                            Math.ceil(
                                                (0.25 * b * g) /
                                                    a(window).height()
                                            )) +
                                        "px)"
                                ),
                            d
                                .eq(sliderI)
                                .find(".caption")
                                .css(
                                    "transform",
                                    "translateY(" +
                                        (Math.ceil(
                                            (1 * b * g) / a(window).height()
                                        ) -
                                            1 * g) +
                                        "px)"
                                ),
                            d
                                .eq(sliderI)
                                .find(".title")
                                .css(
                                    "transform",
                                    "translateY(" +
                                        (Math.ceil(
                                            (0.75 * b * g) / a(window).height()
                                        ) -
                                            0.75 * g) +
                                        "px)"
                                ),
                            d
                                .eq(sliderI)
                                .find(".subtitle")
                                .css(
                                    "transform",
                                    "translateY(" +
                                        (Math.ceil(
                                            (0.5 * b * g) / a(window).height()
                                        ) -
                                            0.5 * g) +
                                        "px)"
                                ),
                            d
                                .eq(sliderI)
                                .find(".button")
                                .css(
                                    "transform",
                                    "translateY(" +
                                        (Math.ceil(
                                            (0.25 * b * g) / a(window).height()
                                        ) -
                                            0.25 * g) +
                                        "px)"
                                ));
                        currentScroll = a(window).scrollTop();
                    })
                    .trigger("scroll.split-slider");
                a(window).on(
                    "resize.split-slider",
                    window.debounce(
                        function() {
                            this.unmount();
                            this.mount(!1);
                        }.bind(this),
                        250
                    )
                );
            },
            unmount: function() {
                a(window).off("scroll.split-slider");
            }
        }
    };
    a(document).on("ready", function() {
        window.CUBER.Nav.mount();
        0 < a(".productDetail-page").length &&
            a(".productDetail-page").each(function() {
                window.CUBER.Product.mount(a(this));
            });
        0 < a(".box__slideshow-split").length &&
            window.CUBER.SplitSlider.mount(!0);
        a(window).on("resize", function() {
            a(window).width();
        });
    });
})(jQuery);
