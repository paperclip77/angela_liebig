/*!
 * Paperclip: 2014
 * @author Leroux van As
 * @version 1.0.0
 * Copyright 2014.
 */
!function($, window, document) {
    "use strict";
    Foundation.libs.abide = {
        name: "abide",
        version: "{{VERSION}}",
        settings: {
            live_validate: !0,
            focus_on_invalid: !0,
            error_labels: !0,
            timeout: 1e3,
            patterns: {
                alpha: /^[a-zA-Z]+$/,
                alpha_numeric: /^[a-zA-Z0-9]+$/,
                integer: /^[-+]?\d+$/,
                number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
                card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
                cvv: /^([0-9]){3,4}$/,
                email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
                url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
                domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
                datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
                date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
                time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
                dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
                month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
                day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
                color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
            },
            validators: {
                equalTo: function(el) {
                    var from = document.getElementById(el.getAttribute(this.add_namespace("data-equalto"))).value, to = el.value, valid = from === to;
                    return valid;
                }
            }
        },
        timer: null,
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function(scope) {
            var self = this, form = self.S(scope).attr("novalidate", "novalidate"), settings = form.data(this.attr_name(!0) + "-init") || {};
            this.invalid_attr = this.add_namespace("data-invalid"), form.off(".abide").on("submit.fndtn.abide validate.fndtn.abide", function(e) {
                var is_ajax = /ajax/i.test(self.S(this).attr(self.attr_name()));
                return self.validate(self.S(this).find("input, textarea, select").get(), e, is_ajax);
            }).on("reset", function() {
                return self.reset($(this));
            }).find("input, textarea, select").off(".abide").on("blur.fndtn.abide change.fndtn.abide", function(e) {
                self.validate([ this ], e);
            }).on("keydown.fndtn.abide", function(e) {
                settings.live_validate === !0 && (clearTimeout(self.timer), self.timer = setTimeout(function() {
                    self.validate([ this ], e);
                }.bind(this), settings.timeout));
            });
        },
        reset: function(form) {
            form.removeAttr(this.invalid_attr), $(this.invalid_attr, form).removeAttr(this.invalid_attr), 
            $(".error", form).not("small").removeClass("error");
        },
        validate: function(els, e, is_ajax) {
            for (var validations = this.parse_patterns(els), validation_count = validations.length, form = this.S(els[0]).closest("form"), submit_event = /submit/.test(e.type), i = 0; validation_count > i; i++) if (!validations[i] && (submit_event || is_ajax)) return this.settings.focus_on_invalid && els[i].focus(), 
            form.trigger("invalid"), this.S(els[i]).closest("form").attr(this.invalid_attr, ""), 
            !1;
            return (submit_event || is_ajax) && form.trigger("valid"), form.removeAttr(this.invalid_attr), 
            is_ajax ? !1 : !0;
        },
        parse_patterns: function(els) {
            for (var i = els.length, el_patterns = []; i--; ) el_patterns.push(this.pattern(els[i]));
            return this.check_validation_and_apply_styles(el_patterns);
        },
        pattern: function(el) {
            var type = el.getAttribute("type"), required = "string" == typeof el.getAttribute("required"), pattern = el.getAttribute("pattern") || "";
            return this.settings.patterns.hasOwnProperty(pattern) && pattern.length > 0 ? [ el, this.settings.patterns[pattern], required ] : pattern.length > 0 ? [ el, new RegExp(pattern), required ] : this.settings.patterns.hasOwnProperty(type) ? [ el, this.settings.patterns[type], required ] : (pattern = /.*/, 
            [ el, pattern, required ]);
        },
        check_validation_and_apply_styles: function(el_patterns) {
            var i = el_patterns.length, validations = [], form = this.S(el_patterns[0][0]).closest("[data-" + this.attr_name(!0) + "]");
            for (form.data(this.attr_name(!0) + "-init") || {}; i--; ) {
                var parent, valid, el = el_patterns[i][0], required = el_patterns[i][2], value = el.value.trim(), direct_parent = this.S(el).parent(), validator = el.getAttribute(this.add_namespace("data-abide-validator")), is_radio = "radio" === el.type, is_checkbox = "checkbox" === el.type, label = this.S('label[for="' + el.getAttribute("id") + '"]'), valid_length = required ? el.value.length > 0 : !0, el_validations = [];
                if (el.getAttribute(this.add_namespace("data-equalto")) && (validator = "equalTo"), 
                parent = direct_parent.is("label") ? direct_parent.parent() : direct_parent, validator && (valid = this.settings.validators[validator].apply(this, [ el, required, parent ]), 
                el_validations.push(valid)), is_radio && required) el_validations.push(this.valid_radio(el, required)); else if (is_checkbox && required) el_validations.push(this.valid_checkbox(el, required)); else {
                    if (el_validations.push(el_patterns[i][1].test(value) && valid_length || !required && el.value.length < 1 || $(el).attr("disabled") ? !0 : !1), 
                    el_validations = [ el_validations.every(function(valid) {
                        return valid;
                    }) ], el_validations[0]) this.S(el).removeAttr(this.invalid_attr), el.setAttribute("aria-invalid", "false"), 
                    el.removeAttribute("aria-describedby"), parent.removeClass("error"), label.length > 0 && this.settings.error_labels && label.removeClass("error").removeAttr("role"), 
                    $(el).triggerHandler("valid"); else {
                        this.S(el).attr(this.invalid_attr, ""), el.setAttribute("aria-invalid", "true");
                        var errorElem = parent.find("small.error, span.error"), errorID = errorElem.length > 0 ? errorElem[0].id : "";
                        errorID.length > 0 && el.setAttribute("aria-describedby", errorID), parent.addClass("error"), 
                        label.length > 0 && this.settings.error_labels && label.addClass("error").attr("role", "alert"), 
                        $(el).triggerHandler("invalid");
                    }
                    validations.push(el_validations[0]);
                }
            }
            return validations = [ validations.every(function(valid) {
                return valid;
            }) ];
        },
        valid_checkbox: function(el, required) {
            var el = this.S(el), valid = el.is(":checked") || !required;
            return valid ? el.removeAttr(this.invalid_attr).parent().removeClass("error") : el.attr(this.invalid_attr, "").parent().addClass("error"), 
            valid;
        },
        valid_radio: function(el) {
            for (var name = el.getAttribute("name"), group = this.S(el).closest("[data-" + this.attr_name(!0) + "]").find("[name='" + name + "']"), count = group.length, valid = !1, i = 0; count > i; i++) group[i].checked && (valid = !0);
            for (var i = 0; count > i; i++) valid ? this.S(group[i]).removeAttr(this.invalid_attr).parent().removeClass("error") : this.S(group[i]).attr(this.invalid_attr, "").parent().addClass("error");
            return valid;
        },
        valid_equal: function(el, required, parent) {
            var from = document.getElementById(el.getAttribute(this.add_namespace("data-equalto"))).value, to = el.value, valid = from === to;
            return valid ? (this.S(el).removeAttr(this.invalid_attr), parent.removeClass("error")) : (this.S(el).attr(this.invalid_attr, ""), 
            parent.addClass("error")), valid;
        },
        valid_oneof: function(el, required, parent, doNotValidateOthers) {
            var el = this.S(el), others = this.S("[" + this.add_namespace("data-oneof") + "]"), valid = others.filter(":checked").length > 0;
            if (valid ? el.removeAttr(this.invalid_attr).parent().removeClass("error") : el.attr(this.invalid_attr, "").parent().addClass("error"), 
            !doNotValidateOthers) {
                var _this = this;
                others.each(function() {
                    _this.valid_oneof.call(_this, this, null, null, !0);
                });
            }
            return valid;
        }
    };
}(jQuery, window, window.document), function($) {
    "use strict";
    Foundation.libs.accordion = {
        name: "accordion",
        version: "{{VERSION}}",
        settings: {
            active_class: "active",
            multi_expand: !1,
            toggleable: !0,
            callback: function() {}
        },
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this, S = this.S;
            S(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion", "[" + this.attr_name() + "] > dd > a", function(e) {
                var accordion = S(this).closest("[" + self.attr_name() + "]"), groupSelector = self.attr_name() + "=" + accordion.attr(self.attr_name()), settings = accordion.data(self.attr_name(!0) + "-init"), target = S("#" + this.href.split("#")[1]), aunts = $("> dd", accordion), siblings = aunts.children(".content"), active_content = siblings.filter("." + settings.active_class);
                return e.preventDefault(), accordion.attr(self.attr_name()) && (siblings = siblings.add("[" + groupSelector + "] dd > .content"), 
                aunts = aunts.add("[" + groupSelector + "] dd")), settings.toggleable && target.is(active_content) ? (target.parent("dd").toggleClass(settings.active_class, !1), 
                target.toggleClass(settings.active_class, !1), settings.callback(target), target.triggerHandler("toggled", [ accordion ]), 
                void accordion.triggerHandler("toggled", [ target ])) : (settings.multi_expand || (siblings.removeClass(settings.active_class), 
                aunts.removeClass(settings.active_class)), target.addClass(settings.active_class).parent().addClass(settings.active_class), 
                settings.callback(target), target.triggerHandler("toggled", [ accordion ]), void accordion.triggerHandler("toggled", [ target ]));
            });
        },
        off: function() {},
        reflow: function() {}
    };
}(jQuery, window, window.document), function($) {
    "use strict";
    Foundation.libs.alert = {
        name: "alert",
        version: "{{VERSION}}",
        settings: {
            callback: function() {}
        },
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this, S = this.S;
            $(this.scope).off(".alert").on("click.fndtn.alert", "[" + this.attr_name() + "] .close", function(e) {
                var alertBox = S(this).closest("[" + self.attr_name() + "]"), settings = alertBox.data(self.attr_name(!0) + "-init") || self.settings;
                e.preventDefault(), Modernizr.csstransitions ? (alertBox.addClass("alert-close"), 
                alertBox.on("transitionend webkitTransitionEnd oTransitionEnd", function() {
                    S(this).trigger("close").trigger("close.fndtn.alert").remove(), settings.callback();
                })) : alertBox.fadeOut(300, function() {
                    S(this).trigger("close").trigger("close.fndtn.alert").remove(), settings.callback();
                });
            });
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function($, window, document, undefined) {
    "use strict";
    Foundation.libs.clearing = {
        name: "clearing",
        version: "{{VERSION}}",
        settings: {
            templates: {
                viewing: '<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'
            },
            close_selectors: ".clearing-close, div.clearing-blackout",
            open_selectors: "",
            skip_selector: "",
            touch_label: "",
            init: !1,
            locked: !1
        },
        init: function(scope, method, options) {
            var self = this;
            Foundation.inherit(this, "throttle image_loaded"), this.bindings(method, options), 
            self.S(this.scope).is("[" + this.attr_name() + "]") ? this.assemble(self.S("li", this.scope)) : self.S("[" + this.attr_name() + "]", this.scope).each(function() {
                self.assemble(self.S("li", this));
            });
        },
        events: function(scope) {
            var self = this, S = self.S, $scroll_container = $(".scroll-container");
            $scroll_container.length > 0 && (this.scope = $scroll_container), S(this.scope).off(".clearing").on("click.fndtn.clearing", "ul[" + this.attr_name() + "] li " + this.settings.open_selectors, function(e, current, target) {
                var current = current || S(this), target = target || current, next = current.next("li"), settings = current.closest("[" + self.attr_name() + "]").data(self.attr_name(!0) + "-init"), image = S(e.target);
                e.preventDefault(), settings || (self.init(), settings = current.closest("[" + self.attr_name() + "]").data(self.attr_name(!0) + "-init")), 
                target.hasClass("visible") && current[0] === target[0] && next.length > 0 && self.is_open(current) && (target = next, 
                image = S("img", target)), self.open(image, current, target), self.update_paddles(target);
            }).on("click.fndtn.clearing", ".clearing-main-next", function(e) {
                self.nav(e, "next");
            }).on("click.fndtn.clearing", ".clearing-main-prev", function(e) {
                self.nav(e, "prev");
            }).on("click.fndtn.clearing", this.settings.close_selectors, function(e) {
                Foundation.libs.clearing.close(e, this);
            }), $(document).on("keydown.fndtn.clearing", function(e) {
                self.keydown(e);
            }), S(window).off(".clearing").on("resize.fndtn.clearing", function() {
                self.resize();
            }), this.swipe_events(scope);
        },
        swipe_events: function() {
            var self = this, S = self.S;
            S(this.scope).on("touchstart.fndtn.clearing", ".visible-img", function(e) {
                e.touches || (e = e.originalEvent);
                var data = {
                    start_page_x: e.touches[0].pageX,
                    start_page_y: e.touches[0].pageY,
                    start_time: new Date().getTime(),
                    delta_x: 0,
                    is_scrolling: undefined
                };
                S(this).data("swipe-transition", data), e.stopPropagation();
            }).on("touchmove.fndtn.clearing", ".visible-img", function(e) {
                if (e.touches || (e = e.originalEvent), !(e.touches.length > 1 || e.scale && 1 !== e.scale)) {
                    var data = S(this).data("swipe-transition");
                    if ("undefined" == typeof data && (data = {}), data.delta_x = e.touches[0].pageX - data.start_page_x, 
                    Foundation.rtl && (data.delta_x = -data.delta_x), "undefined" == typeof data.is_scrolling && (data.is_scrolling = !!(data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y))), 
                    !data.is_scrolling && !data.active) {
                        e.preventDefault();
                        var direction = data.delta_x < 0 ? "next" : "prev";
                        data.active = !0, self.nav(e, direction);
                    }
                }
            }).on("touchend.fndtn.clearing", ".visible-img", function(e) {
                S(this).data("swipe-transition", {}), e.stopPropagation();
            });
        },
        assemble: function($li) {
            var $el = $li.parent();
            if (!$el.parent().hasClass("carousel")) {
                $el.after('<div id="foundationClearingHolder"></div>');
                var grid = $el.detach(), grid_outerHTML = "";
                if (null != grid[0]) {
                    grid_outerHTML = grid[0].outerHTML;
                    var holder = this.S("#foundationClearingHolder"), settings = $el.data(this.attr_name(!0) + "-init"), data = {
                        grid: '<div class="carousel">' + grid_outerHTML + "</div>",
                        viewing: settings.templates.viewing
                    }, wrapper = '<div class="clearing-assembled"><div>' + data.viewing + data.grid + "</div></div>", touch_label = this.settings.touch_label;
                    Modernizr.touch && (wrapper = $(wrapper).find(".clearing-touch-label").html(touch_label).end()), 
                    holder.after(wrapper).remove();
                }
            }
        },
        open: function($image, current, target) {
            function startLoad() {
                setTimeout(function() {
                    this.image_loaded(image, function() {
                        1 !== image.outerWidth() || error ? cb.call(this, image) : startLoad.call(this);
                    }.bind(this));
                }.bind(this), 100);
            }
            function cb(image) {
                var $image = $(image);
                $image.css("visibility", "visible"), body.css("overflow", "hidden"), root.addClass("clearing-blackout"), 
                container.addClass("clearing-container"), visible_image.show(), this.fix_height(target).caption(self.S(".clearing-caption", visible_image), self.S("img", target)).center_and_label(image, label).shift(current, target, function() {
                    target.closest("li").siblings().removeClass("visible"), target.closest("li").addClass("visible");
                }), visible_image.trigger("opened.fndtn.clearing");
            }
            var self = this, body = $(document.body), root = target.closest(".clearing-assembled"), container = self.S("div", root).first(), visible_image = self.S(".visible-img", container), image = self.S("img", visible_image).not($image), label = self.S(".clearing-touch-label", container), error = !1;
            $("body").on("touchmove", function(e) {
                e.preventDefault();
            }), image.error(function() {
                error = !0;
            }), this.locked() || (visible_image.trigger("open.fndtn.clearing"), image.attr("src", this.load($image)).css("visibility", "hidden"), 
            startLoad.call(this));
        },
        close: function(e, el) {
            e.preventDefault();
            var container, visible_image, root = function(target) {
                return /blackout/.test(target.selector) ? target : target.closest(".clearing-blackout");
            }($(el)), body = $(document.body);
            return el === e.target && root && (body.css("overflow", ""), container = $("div", root).first(), 
            visible_image = $(".visible-img", container), visible_image.trigger("close.fndtn.clearing"), 
            this.settings.prev_index = 0, $("ul[" + this.attr_name() + "]", root).attr("style", "").closest(".clearing-blackout").removeClass("clearing-blackout"), 
            container.removeClass("clearing-container"), visible_image.hide(), visible_image.trigger("closed.fndtn.clearing")), 
            $("body").off("touchmove"), !1;
        },
        is_open: function(current) {
            return current.parent().prop("style").length > 0;
        },
        keydown: function(e) {
            var clearing = $(".clearing-blackout ul[" + this.attr_name() + "]"), NEXT_KEY = this.rtl ? 37 : 39, PREV_KEY = this.rtl ? 39 : 37, ESC_KEY = 27;
            e.which === NEXT_KEY && this.go(clearing, "next"), e.which === PREV_KEY && this.go(clearing, "prev"), 
            e.which === ESC_KEY && this.S("a.clearing-close").trigger("click").trigger("click.fndtn.clearing");
        },
        nav: function(e, direction) {
            var clearing = $("ul[" + this.attr_name() + "]", ".clearing-blackout");
            e.preventDefault(), this.go(clearing, direction);
        },
        resize: function() {
            var image = $("img", ".clearing-blackout .visible-img"), label = $(".clearing-touch-label", ".clearing-blackout");
            image.length && (this.center_and_label(image, label), image.trigger("resized.fndtn.clearing"));
        },
        fix_height: function(target) {
            var lis = target.parent().children(), self = this;
            return lis.each(function() {
                var li = self.S(this), image = li.find("img");
                li.height() > image.outerHeight() && li.addClass("fix-height");
            }).closest("ul").width(100 * lis.length + "%"), this;
        },
        update_paddles: function(target) {
            target = target.closest("li");
            var visible_image = target.closest(".carousel").siblings(".visible-img");
            target.next().length > 0 ? this.S(".clearing-main-next", visible_image).removeClass("disabled") : this.S(".clearing-main-next", visible_image).addClass("disabled"), 
            target.prev().length > 0 ? this.S(".clearing-main-prev", visible_image).removeClass("disabled") : this.S(".clearing-main-prev", visible_image).addClass("disabled");
        },
        center_and_label: function(target, label) {
            return this.rtl ? (target.css({
                marginRight: -(target.outerWidth() / 2),
                marginTop: -(target.outerHeight() / 2),
                left: "auto",
                right: "50%"
            }), label.length > 0 && label.css({
                marginRight: -(label.outerWidth() / 2),
                marginTop: -(target.outerHeight() / 2) - label.outerHeight() - 10,
                left: "auto",
                right: "50%"
            })) : (target.css({
                marginLeft: -(target.outerWidth() / 2),
                marginTop: -(target.outerHeight() / 2)
            }), label.length > 0 && label.css({
                marginLeft: -(label.outerWidth() / 2),
                marginTop: -(target.outerHeight() / 2) - label.outerHeight() - 10
            })), this;
        },
        load: function($image) {
            var href;
            return href = "A" === $image[0].nodeName ? $image.attr("href") : $image.parent().attr("href"), 
            this.preload($image), href ? href : $image.attr("src");
        },
        preload: function($image) {
            this.img($image.closest("li").next()).img($image.closest("li").prev());
        },
        img: function(img) {
            if (img.length) {
                var new_img = new Image(), new_a = this.S("a", img);
                new_img.src = new_a.length ? new_a.attr("href") : this.S("img", img).attr("src");
            }
            return this;
        },
        caption: function(container, $image) {
            var caption = $image.attr("data-caption");
            return caption ? container.html(caption).show() : container.text("").hide(), this;
        },
        go: function($ul, direction) {
            var current = this.S(".visible", $ul), target = current[direction]();
            this.settings.skip_selector && 0 != target.find(this.settings.skip_selector).length && (target = target[direction]()), 
            target.length && this.S("img", target).trigger("click", [ current, target ]).trigger("click.fndtn.clearing", [ current, target ]).trigger("change.fndtn.clearing");
        },
        shift: function(current, target, callback) {
            var skip_shift, clearing = target.parent(), old_index = this.settings.prev_index || target.index(), direction = this.direction(clearing, current, target), dir = this.rtl ? "right" : "left", left = parseInt(clearing.css("left"), 10), width = target.outerWidth(), dir_obj = {};
            target.index() === old_index || /skip/.test(direction) ? /skip/.test(direction) && (skip_shift = target.index() - this.settings.up_count, 
            this.lock(), skip_shift > 0 ? (dir_obj[dir] = -(skip_shift * width), clearing.animate(dir_obj, 300, this.unlock())) : (dir_obj[dir] = 0, 
            clearing.animate(dir_obj, 300, this.unlock()))) : /left/.test(direction) ? (this.lock(), 
            dir_obj[dir] = left + width, clearing.animate(dir_obj, 300, this.unlock())) : /right/.test(direction) && (this.lock(), 
            dir_obj[dir] = left - width, clearing.animate(dir_obj, 300, this.unlock())), callback();
        },
        direction: function($el, current, target) {
            var response, lis = this.S("li", $el), li_width = lis.outerWidth() + lis.outerWidth() / 4, up_count = Math.floor(this.S(".clearing-container").outerWidth() / li_width) - 1, target_index = lis.index(target);
            return this.settings.up_count = up_count, response = this.adjacent(this.settings.prev_index, target_index) ? target_index > up_count && target_index > this.settings.prev_index ? "right" : target_index > up_count - 1 && target_index <= this.settings.prev_index ? "left" : !1 : "skip", 
            this.settings.prev_index = target_index, response;
        },
        adjacent: function(current_index, target_index) {
            for (var i = target_index + 1; i >= target_index - 1; i--) if (i === current_index) return !0;
            return !1;
        },
        lock: function() {
            this.settings.locked = !0;
        },
        unlock: function() {
            this.settings.locked = !1;
        },
        locked: function() {
            return this.settings.locked;
        },
        off: function() {
            this.S(this.scope).off(".fndtn.clearing"), this.S(window).off(".fndtn.clearing");
        },
        reflow: function() {
            this.init();
        }
    };
}(jQuery, window, window.document), function($, window) {
    "use strict";
    Foundation.libs.dropdown = {
        name: "dropdown",
        version: "{{VERSION}}",
        settings: {
            active_class: "open",
            mega_class: "mega",
            align: "bottom",
            is_hover: !1,
            smart_position: !0,
            smart_position_arrays: {
                right: [ "right", "bottom", "top", "left", "right" ],
                left: [ "left", "right", "bottom", "top", "left" ],
                top: [ "top", "right", "bottom", "left", "top" ],
                bottom: [ "bottom", "top", "right", "left", "bottom" ]
            },
            opened: function() {},
            closed: function() {}
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle"), this.bindings(method, options);
        },
        events: function() {
            var self = this, S = self.S;
            S(this.scope).off(".dropdown").on("click.fndtn.dropdown", "[" + this.attr_name() + "]", function(e) {
                var settings = S(this).data(self.attr_name(!0) + "-init") || self.settings;
                (!settings.is_hover || Modernizr.touch) && (e.preventDefault(), self.toggle($(this)));
            }).on("mouseenter.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function(e) {
                var dropdown, target, $this = S(this);
                clearTimeout(self.timeout), $this.data(self.data_attr()) ? (dropdown = S("#" + $this.data(self.data_attr())), 
                target = $this) : (dropdown = $this, target = S("[" + self.attr_name() + "='" + dropdown.attr("id") + "']"));
                var settings = target.data(self.attr_name(!0) + "-init") || self.settings;
                S(e.target).data(self.data_attr()) && settings.is_hover && self.closeall.call(self), 
                settings.is_hover && self.open.apply(self, [ dropdown, target ]);
            }).on("mouseleave.fndtn.dropdown", "[" + this.attr_name() + "], [" + this.attr_name() + "-content]", function() {
                var $this = S(this);
                self.timeout = setTimeout(function() {
                    if ($this.data(self.data_attr())) {
                        var settings = $this.data(self.data_attr(!0) + "-init") || self.settings;
                        settings.is_hover && self.close.call(self, S("#" + $this.data(self.data_attr())));
                    } else {
                        var target = S("[" + self.attr_name() + '="' + S(this).attr("id") + '"]'), settings = target.data(self.attr_name(!0) + "-init") || self.settings;
                        settings.is_hover && self.close.call(self, $this);
                    }
                }.bind(this), 150);
            }).on("click.fndtn.dropdown", function(e) {
                var parent = S(e.target).closest("[" + self.attr_name() + "-content]");
                if (!(S(e.target).closest("[" + self.attr_name() + "]").length > 0)) return !S(e.target).data("revealId") && parent.length > 0 && (S(e.target).is("[" + self.attr_name() + "-content]") || $.contains(parent.first()[0], e.target)) ? void e.stopPropagation() : void self.close.call(self, S("[" + self.attr_name() + "-content]"));
            }).on("opened.fndtn.dropdown", "[" + self.attr_name() + "-content]", function() {
                self.settings.opened.call(this);
            }).on("closed.fndtn.dropdown", "[" + self.attr_name() + "-content]", function() {
                self.settings.closed.call(this);
            }), S(window).off(".dropdown").on("resize.fndtn.dropdown", self.throttle(function() {
                self.resize.call(self);
            }, 50)), this.resize();
        },
        close: function(dropdown) {
            var self = this;
            dropdown.each(function() {
                var original_target = $("[" + self.attr_name() + "=" + dropdown[0].id + "]") || $("aria-controls=" + dropdown[0].id + "]");
                original_target.attr("aria-expanded", "false"), self.S(this).hasClass(self.settings.active_class) && (self.S(this).css(Foundation.rtl ? "right" : "left", "-99999px").attr("aria-hidden", "true").removeClass(self.settings.active_class).prev("[" + self.attr_name() + "]").removeClass(self.settings.active_class).removeData("target"), 
                self.S(this).trigger("closed").trigger("closed.fndtn.dropdown", [ dropdown ]));
            });
        },
        closeall: function() {
            var self = this;
            $.each(self.S("[" + this.attr_name() + "-content]"), function() {
                self.close.call(self, self.S(this));
            });
        },
        open: function(dropdown, target) {
            this.css(dropdown.addClass(this.settings.active_class), target), dropdown.prev("[" + this.attr_name() + "]").addClass(this.settings.active_class), 
            dropdown.data("target", target.get(0)).trigger("opened").trigger("opened.fndtn.dropdown", [ dropdown, target ]), 
            dropdown.attr("aria-hidden", "false"), target.attr("aria-expanded", "true"), dropdown.focus();
        },
        data_attr: function() {
            return this.namespace.length > 0 ? this.namespace + "-" + this.name : this.name;
        },
        toggle: function(target) {
            var dropdown = this.S("#" + target.data(this.data_attr()));
            0 !== dropdown.length && (this.close.call(this, this.S("[" + this.attr_name() + "-content]").not(dropdown)), 
            dropdown.hasClass(this.settings.active_class) ? (this.close.call(this, dropdown), 
            dropdown.data("target") !== target.get(0) && this.open.call(this, dropdown, target)) : this.open.call(this, dropdown, target));
        },
        resize: function() {
            var dropdown = this.S("[" + this.attr_name() + "-content].open"), target = this.S("[" + this.attr_name() + "='" + dropdown.attr("id") + "']");
            dropdown.length && target.length && this.css(dropdown, target);
        },
        css: function(dropdown, target) {
            var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8), settings = target.data(this.attr_name(!0) + "-init") || this.settings;
            if (this.clear_idx(), this.small()) {
                var p = this.dirs.bottom.call(dropdown, target, settings);
                dropdown.attr("style", "").removeClass("drop-left drop-right drop-top").css({
                    position: "absolute",
                    width: "95%",
                    "max-width": "none",
                    top: p.top
                }), dropdown.css(Foundation.rtl ? "right" : "left", left_offset);
            } else this.style(dropdown, target, settings);
            return dropdown;
        },
        style: function(dropdown, target, settings) {
            var css = $.extend({
                position: "absolute"
            }, this.position(dropdown, target, settings));
            dropdown.attr("style", "").css(css);
        },
        position: function(d, t, s) {
            var res = {}, vp = {}, list = s.smart_position_arrays[s.align], len = list.length, dd_w = d.outerWidth(), dd_h = d.outerHeight(), o = d.offsetParent().offset();
            if (s.smart_position) {
                var $win = $(window);
                vp.top = $win.scrollTop(), vp.left = $win.scrollLeft(), vp.right = vp.left + $win.width(), 
                vp.bottom = vp.top + $win.height();
                for (var i = 0; len > i && (res = this.dirs[list[i]].call(d, t, s), this.is_out(vp, res.top + o.top, res.left + o.left, dd_w, dd_h, 3) !== !1); i++) ;
            } else res = this.dirs[s.align].call(d, t, s);
            return res;
        },
        is_out: function(vp, top, left, width, height, buffer) {
            return top < vp.top + buffer || left < vp.left + buffer || top + height > vp.bottom - buffer || left + width > vp.right - buffer;
        },
        dirs: {
            _base: function(t) {
                var o_p = this.offsetParent(), o = o_p.offset(), p = t.offset();
                return p.top -= o.top, p.left -= o.left, p;
            },
            top: function(t, s) {
                var self = Foundation.libs.dropdown, p = self.dirs._base.call(this, t);
                return this.addClass("drop-top"), (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) && self.adjust_pip(this, t, s, p), 
                Foundation.rtl ? {
                    left: p.left - this.outerWidth() + t.outerWidth(),
                    top: p.top - this.outerHeight()
                } : {
                    left: p.left,
                    top: p.top - this.outerHeight()
                };
            },
            bottom: function(t, s) {
                var self = Foundation.libs.dropdown, p = self.dirs._base.call(this, t);
                return (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) && self.adjust_pip(this, t, s, p), 
                self.rtl ? {
                    left: p.left - this.outerWidth() + t.outerWidth(),
                    top: p.top + t.outerHeight()
                } : {
                    left: p.left,
                    top: p.top + t.outerHeight()
                };
            },
            left: function(t) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t);
                return this.addClass("drop-left"), {
                    left: p.left - this.outerWidth(),
                    top: p.top
                };
            },
            right: function(t) {
                var p = Foundation.libs.dropdown.dirs._base.call(this, t);
                return this.addClass("drop-right"), {
                    left: p.left + t.outerWidth(),
                    top: p.top
                };
            }
        },
        adjust_pip: function(dropdown, target, settings, position) {
            var sheet = Foundation.stylesheet, pip_offset_base = 8;
            dropdown.hasClass(settings.mega_class) ? pip_offset_base = position.left + target.outerWidth() / 2 - 8 : this.small() && (pip_offset_base += position.left - 8), 
            this.rule_idx = sheet.cssRules.length;
            var sel_before = ".f-dropdown.open:before", sel_after = ".f-dropdown.open:after", css_before = "left: " + pip_offset_base + "px;", css_after = "left: " + (pip_offset_base - 1) + "px;";
            sheet.insertRule ? (sheet.insertRule([ sel_before, "{", css_before, "}" ].join(" "), this.rule_idx), 
            sheet.insertRule([ sel_after, "{", css_after, "}" ].join(" "), this.rule_idx + 1)) : (sheet.addRule(sel_before, css_before, this.rule_idx), 
            sheet.addRule(sel_after, css_after, this.rule_idx + 1));
        },
        clear_idx: function() {
            var sheet = Foundation.stylesheet;
            this.rule_idx && (sheet.deleteRule(this.rule_idx), sheet.deleteRule(this.rule_idx), 
            delete this.rule_idx);
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        off: function() {
            this.S(this.scope).off(".fndtn.dropdown"), this.S("html, body").off(".fndtn.dropdown"), 
            this.S(window).off(".fndtn.dropdown"), this.S("[data-dropdown-content]").off(".fndtn.dropdown");
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function($, window) {
    "use strict";
    Foundation.libs.equalizer = {
        name: "equalizer",
        version: "{{VERSION}}",
        settings: {
            use_tallest: !0,
            before_height_change: $.noop,
            after_height_change: $.noop,
            equalize_on_stack: !1
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "image_loaded"), this.bindings(method, options), this.reflow();
        },
        events: function() {
            this.S(window).off(".equalizer").on("resize.fndtn.equalizer", function() {
                this.reflow();
            }.bind(this));
        },
        equalize: function(equalizer) {
            var isStacked = !1, vals = equalizer.find("[" + this.attr_name() + "-watch]:visible"), settings = equalizer.data(this.attr_name(!0) + "-init");
            if (0 !== vals.length) {
                var firstTopOffset = vals.first().offset().top;
                if (settings.before_height_change(), equalizer.trigger("before-height-change").trigger("before-height-change.fndth.equalizer"), 
                vals.height("inherit"), vals.each(function() {
                    var el = $(this);
                    el.offset().top !== firstTopOffset && (isStacked = !0);
                }), settings.equalize_on_stack !== !1 || !isStacked) {
                    var heights = vals.map(function() {
                        return $(this).outerHeight(!1);
                    }).get();
                    if (settings.use_tallest) {
                        var max = Math.max.apply(null, heights);
                        vals.css("height", max);
                    } else {
                        var min = Math.min.apply(null, heights);
                        vals.css("height", min);
                    }
                    settings.after_height_change(), equalizer.trigger("after-height-change").trigger("after-height-change.fndtn.equalizer");
                }
            }
        },
        reflow: function() {
            var self = this;
            this.S("[" + this.attr_name() + "]", this.scope).each(function() {
                var $eq_target = $(this);
                self.image_loaded(self.S("img", this), function() {
                    self.equalize($eq_target);
                });
            });
        }
    };
}(jQuery, window, window.document), function($, window) {
    "use strict";
    Foundation.libs.interchange = {
        name: "interchange",
        version: "{{VERSION}}",
        cache: {},
        images_loaded: !1,
        nodes_loaded: !1,
        settings: {
            load_attr: "interchange",
            named_queries: {
                "default": "only screen",
                small: Foundation.media_queries.small,
                medium: Foundation.media_queries.medium,
                large: Foundation.media_queries.large,
                xlarge: Foundation.media_queries.xlarge,
                xxlarge: Foundation.media_queries.xxlarge,
                landscape: "only screen and (orientation: landscape)",
                portrait: "only screen and (orientation: portrait)",
                retina: "only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"
            },
            directives: {
                replace: function(el, path, trigger) {
                    if (/IMG/.test(el[0].nodeName)) {
                        var orig_path = el[0].src;
                        if (new RegExp(path, "i").test(orig_path)) return;
                        return el[0].src = path, trigger(el[0].src);
                    }
                    var last_path = el.data(this.data_attr + "-last-path"), self = this;
                    if (last_path != path) return /\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(path) ? ($(el).css("background-image", "url(" + path + ")"), 
                    el.data("interchange-last-path", path), trigger(path)) : $.get(path, function(response) {
                        el.html(response), el.data(self.data_attr + "-last-path", path), trigger();
                    });
                }
            }
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle random_str"), this.data_attr = this.set_data_attr(), 
            $.extend(!0, this.settings, method, options), this.bindings(method, options), this.load("images"), 
            this.load("nodes");
        },
        get_media_hash: function() {
            var mediaHash = "";
            for (var queryName in this.settings.named_queries) mediaHash += matchMedia(this.settings.named_queries[queryName]).matches.toString();
            return mediaHash;
        },
        events: function() {
            var prevMediaHash, self = this;
            return $(window).off(".interchange").on("resize.fndtn.interchange", self.throttle(function() {
                var currMediaHash = self.get_media_hash();
                currMediaHash !== prevMediaHash && self.resize(), prevMediaHash = currMediaHash;
            }, 50)), this;
        },
        resize: function() {
            var cache = this.cache;
            if (!this.images_loaded || !this.nodes_loaded) return void setTimeout($.proxy(this.resize, this), 50);
            for (var uuid in cache) if (cache.hasOwnProperty(uuid)) {
                var passed = this.results(uuid, cache[uuid]);
                passed && this.settings.directives[passed.scenario[1]].call(this, passed.el, passed.scenario[0], function() {
                    if (arguments[0] instanceof Array) var args = arguments[0]; else var args = Array.prototype.slice.call(arguments, 0);
                    passed.el.trigger(passed.scenario[1], args);
                });
            }
        },
        results: function(uuid, scenarios) {
            var count = scenarios.length;
            if (count > 0) for (var el = this.S("[" + this.add_namespace("data-uuid") + '="' + uuid + '"]'); count--; ) {
                var mq, rule = scenarios[count][2];
                if (mq = matchMedia(this.settings.named_queries.hasOwnProperty(rule) ? this.settings.named_queries[rule] : rule), 
                mq.matches) return {
                    el: el,
                    scenario: scenarios[count]
                };
            }
            return !1;
        },
        load: function(type, force_update) {
            return ("undefined" == typeof this["cached_" + type] || force_update) && this["update_" + type](), 
            this["cached_" + type];
        },
        update_images: function() {
            var images = this.S("img[" + this.data_attr + "]"), count = images.length, i = count, loaded_count = 0, data_attr = this.data_attr;
            for (this.cache = {}, this.cached_images = [], this.images_loaded = 0 === count; i--; ) {
                if (loaded_count++, images[i]) {
                    var str = images[i].getAttribute(data_attr) || "";
                    str.length > 0 && this.cached_images.push(images[i]);
                }
                loaded_count === count && (this.images_loaded = !0, this.enhance("images"));
            }
            return this;
        },
        update_nodes: function() {
            var nodes = this.S("[" + this.data_attr + "]").not("img"), count = nodes.length, i = count, loaded_count = 0, data_attr = this.data_attr;
            for (this.cached_nodes = [], this.nodes_loaded = 0 === count; i--; ) {
                loaded_count++;
                var str = nodes[i].getAttribute(data_attr) || "";
                str.length > 0 && this.cached_nodes.push(nodes[i]), loaded_count === count && (this.nodes_loaded = !0, 
                this.enhance("nodes"));
            }
            return this;
        },
        enhance: function(type) {
            for (var i = this["cached_" + type].length; i--; ) this.object($(this["cached_" + type][i]));
            return $(window).trigger("resize").trigger("resize.fndtn.interchange");
        },
        convert_directive: function(directive) {
            var trimmed = this.trim(directive);
            return trimmed.length > 0 ? trimmed : "replace";
        },
        parse_scenario: function(scenario) {
            var directive_match = scenario[0].match(/(.+),\s*(\w+)\s*$/), media_query = scenario[1];
            if (directive_match) var path = directive_match[1], directive = directive_match[2]; else var cached_split = scenario[0].split(/,\s*$/), path = cached_split[0], directive = "";
            return [ this.trim(path), this.convert_directive(directive), this.trim(media_query) ];
        },
        object: function(el) {
            var raw_arr = this.parse_data_attr(el), scenarios = [], i = raw_arr.length;
            if (i > 0) for (;i--; ) {
                var split = raw_arr[i].split(/\((.*?)(\))$/);
                if (split.length > 1) {
                    var params = this.parse_scenario(split);
                    scenarios.push(params);
                }
            }
            return this.store(el, scenarios);
        },
        store: function(el, scenarios) {
            var uuid = this.random_str(), current_uuid = el.data(this.add_namespace("uuid", !0));
            return this.cache[current_uuid] ? this.cache[current_uuid] : (el.attr(this.add_namespace("data-uuid"), uuid), 
            this.cache[uuid] = scenarios);
        },
        trim: function(str) {
            return "string" == typeof str ? $.trim(str) : str;
        },
        set_data_attr: function(init) {
            return init ? this.namespace.length > 0 ? this.namespace + "-" + this.settings.load_attr : this.settings.load_attr : this.namespace.length > 0 ? "data-" + this.namespace + "-" + this.settings.load_attr : "data-" + this.settings.load_attr;
        },
        parse_data_attr: function(el) {
            for (var raw = el.attr(this.attr_name()).split(/\[(.*?)\]/), i = raw.length, output = []; i--; ) raw[i].replace(/[\W\d]+/, "").length > 4 && output.push(raw[i]);
            return output;
        },
        reflow: function() {
            this.load("images", !0), this.load("nodes", !0);
        }
    };
}(jQuery, window, window.document), function($, window, document, undefined) {
    "use strict";
    Foundation.libs.joyride = {
        name: "joyride",
        version: "{{VERSION}}",
        defaults: {
            expose: !1,
            modal: !0,
            keyboard: !0,
            tip_location: "bottom",
            nub_position: "auto",
            scroll_speed: 1500,
            scroll_animation: "linear",
            timer: 0,
            start_timer_on_click: !0,
            start_offset: 0,
            next_button: !0,
            prev_button: !0,
            tip_animation: "fade",
            pause_after: [],
            exposed: [],
            tip_animation_fade_speed: 300,
            cookie_monster: !1,
            cookie_name: "joyride",
            cookie_domain: !1,
            cookie_expires: 365,
            tip_container: "body",
            abort_on_close: !0,
            tip_location_patterns: {
                top: [ "bottom" ],
                bottom: [],
                left: [ "right", "top", "bottom" ],
                right: [ "left", "top", "bottom" ]
            },
            post_ride_callback: function() {},
            post_step_callback: function() {},
            pre_step_callback: function() {},
            pre_ride_callback: function() {},
            post_expose_callback: function() {},
            template: {
                link: '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper: '<div class="joyride-content-wrapper"></div>',
                button: '<a href="#" class="small button joyride-next-tip"></a>',
                prev_button: '<a href="#" class="small button joyride-prev-tip"></a>',
                modal: '<div class="joyride-modal-bg"></div>',
                expose: '<div class="joyride-expose-wrapper"></div>',
                expose_cover: '<div class="joyride-expose-cover"></div>'
            },
            expose_add_class: ""
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle random_str"), this.settings = this.settings || $.extend({}, this.defaults, options || method), 
            this.bindings(method, options);
        },
        go_next: function() {
            this.settings.$li.next().length < 1 ? this.end() : this.settings.timer > 0 ? (clearTimeout(this.settings.automate), 
            this.hide(), this.show(), this.startTimer()) : (this.hide(), this.show());
        },
        go_prev: function() {
            this.settings.$li.prev().length < 1 || (this.settings.timer > 0 ? (clearTimeout(this.settings.automate), 
            this.hide(), this.show(null, !0), this.startTimer()) : (this.hide(), this.show(null, !0)));
        },
        events: function() {
            var self = this;
            $(this.scope).off(".joyride").on("click.fndtn.joyride", ".joyride-next-tip, .joyride-modal-bg", function(e) {
                e.preventDefault(), this.go_next();
            }.bind(this)).on("click.fndtn.joyride", ".joyride-prev-tip", function(e) {
                e.preventDefault(), this.go_prev();
            }.bind(this)).on("click.fndtn.joyride", ".joyride-close-tip", function(e) {
                e.preventDefault(), this.end(this.settings.abort_on_close);
            }.bind(this)).on("keyup.joyride", function(e) {
                if (this.settings.keyboard) switch (e.which) {
                  case 39:
                    e.preventDefault(), this.go_next();
                    break;

                  case 37:
                    e.preventDefault(), this.go_prev();
                    break;

                  case 27:
                    e.preventDefault(), this.end(this.settings.abort_on_close);
                }
            }.bind(this)), $(window).off(".joyride").on("resize.fndtn.joyride", self.throttle(function() {
                if ($("[" + self.attr_name() + "]").length > 0 && self.settings.$next_tip && self.settings.riding) {
                    if (self.settings.exposed.length > 0) {
                        var $els = $(self.settings.exposed);
                        $els.each(function() {
                            var $this = $(this);
                            self.un_expose($this), self.expose($this);
                        });
                    }
                    self.is_phone() ? self.pos_phone() : self.pos_default(!1);
                }
            }, 100));
        },
        start: function() {
            var self = this, $this = $("[" + this.attr_name() + "]", this.scope), integer_settings = [ "timer", "scrollSpeed", "startOffset", "tipAnimationFadeSpeed", "cookieExpires" ], int_settings_count = integer_settings.length;
            !$this.length > 0 || (this.settings.init || this.events(), this.settings = $this.data(this.attr_name(!0) + "-init"), 
            this.settings.$content_el = $this, this.settings.$body = $(this.settings.tip_container), 
            this.settings.body_offset = $(this.settings.tip_container).position(), this.settings.$tip_content = this.settings.$content_el.find("> li"), 
            this.settings.paused = !1, this.settings.attempts = 0, this.settings.riding = !0, 
            "function" != typeof $.cookie && (this.settings.cookie_monster = !1), (!this.settings.cookie_monster || this.settings.cookie_monster && !$.cookie(this.settings.cookie_name)) && (this.settings.$tip_content.each(function(index) {
                var $this = $(this);
                this.settings = $.extend({}, self.defaults, self.data_options($this));
                for (var i = int_settings_count; i--; ) self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
                self.create({
                    $li: $this,
                    index: index
                });
            }), !this.settings.start_timer_on_click && this.settings.timer > 0 ? (this.show("init"), 
            this.startTimer()) : this.show("init")));
        },
        resume: function() {
            this.set_li(), this.show();
        },
        tip_template: function(opts) {
            var $blank, content;
            return opts.tip_class = opts.tip_class || "", $blank = $(this.settings.template.tip).addClass(opts.tip_class), 
            content = $.trim($(opts.li).html()) + this.prev_button_text(opts.prev_button_text, opts.index) + this.button_text(opts.button_text) + this.settings.template.link + this.timer_instance(opts.index), 
            $blank.append($(this.settings.template.wrapper)), $blank.first().attr(this.add_namespace("data-index"), opts.index), 
            $(".joyride-content-wrapper", $blank).append(content), $blank[0];
        },
        timer_instance: function(index) {
            var txt;
            return txt = 0 === index && this.settings.start_timer_on_click && this.settings.timer > 0 || 0 === this.settings.timer ? "" : $(this.settings.template.timer)[0].outerHTML;
        },
        button_text: function(txt) {
            return this.settings.tip_settings.next_button ? (txt = $.trim(txt) || "Next", txt = $(this.settings.template.button).append(txt)[0].outerHTML) : txt = "", 
            txt;
        },
        prev_button_text: function(txt, idx) {
            return this.settings.tip_settings.prev_button ? (txt = $.trim(txt) || "Previous", 
            txt = 0 == idx ? $(this.settings.template.prev_button).append(txt).addClass("disabled")[0].outerHTML : $(this.settings.template.prev_button).append(txt)[0].outerHTML) : txt = "", 
            txt;
        },
        create: function(opts) {
            this.settings.tip_settings = $.extend({}, this.settings, this.data_options(opts.$li));
            var buttonText = opts.$li.attr(this.add_namespace("data-button")) || opts.$li.attr(this.add_namespace("data-text")), prevButtonText = opts.$li.attr(this.add_namespace("data-button-prev")) || opts.$li.attr(this.add_namespace("data-prev-text")), tipClass = opts.$li.attr("class"), $tip_content = $(this.tip_template({
                tip_class: tipClass,
                index: opts.index,
                button_text: buttonText,
                prev_button_text: prevButtonText,
                li: opts.$li
            }));
            $(this.settings.tip_container).append($tip_content);
        },
        show: function(init, is_prev) {
            var $timer = null;
            this.settings.$li === undefined || -1 === $.inArray(this.settings.$li.index(), this.settings.pause_after) ? (this.settings.paused ? this.settings.paused = !1 : this.set_li(init, is_prev), 
            this.settings.attempts = 0, this.settings.$li.length && this.settings.$target.length > 0 ? (init && (this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip), 
            this.settings.modal && this.show_modal()), this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip), 
            this.settings.modal && this.settings.expose && this.expose(), this.settings.tip_settings = $.extend({}, this.settings, this.data_options(this.settings.$li)), 
            this.settings.timer = parseInt(this.settings.timer, 10), this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location], 
            /body/i.test(this.settings.$target.selector) || this.scroll_to(), this.is_phone() ? this.pos_phone(!0) : this.pos_default(!0), 
            $timer = this.settings.$next_tip.find(".joyride-timer-indicator"), /pop/i.test(this.settings.tip_animation) ? ($timer.width(0), 
            this.settings.timer > 0 ? (this.settings.$next_tip.show(), setTimeout(function() {
                $timer.animate({
                    width: $timer.parent().width()
                }, this.settings.timer, "linear");
            }.bind(this), this.settings.tip_animation_fade_speed)) : this.settings.$next_tip.show()) : /fade/i.test(this.settings.tip_animation) && ($timer.width(0), 
            this.settings.timer > 0 ? (this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(), 
            setTimeout(function() {
                $timer.animate({
                    width: $timer.parent().width()
                }, this.settings.timer, "linear");
            }.bind(this), this.settings.tip_animation_fade_speed)) : this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)), 
            this.settings.$current_tip = this.settings.$next_tip) : this.settings.$li && this.settings.$target.length < 1 ? this.show() : this.end()) : this.settings.paused = !0;
        },
        is_phone: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        hide: function() {
            this.settings.modal && this.settings.expose && this.un_expose(), this.settings.modal || $(".joyride-modal-bg").hide(), 
            this.settings.$current_tip.css("visibility", "hidden"), setTimeout($.proxy(function() {
                this.hide(), this.css("visibility", "visible");
            }, this.settings.$current_tip), 0), this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
        },
        set_li: function(init, is_prev) {
            init ? (this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset), 
            this.set_next_tip(), this.settings.$current_tip = this.settings.$next_tip) : (this.settings.$li = is_prev ? this.settings.$li.prev() : this.settings.$li.next(), 
            this.set_next_tip()), this.set_target();
        },
        set_next_tip: function() {
            this.settings.$next_tip = $(".joyride-tip-guide").eq(this.settings.$li.index()), 
            this.settings.$next_tip.data("closed", "");
        },
        set_target: function() {
            var cl = this.settings.$li.attr(this.add_namespace("data-class")), id = this.settings.$li.attr(this.add_namespace("data-id")), $sel = function() {
                return id ? $(document.getElementById(id)) : cl ? $("." + cl).first() : $("body");
            };
            this.settings.$target = $sel();
        },
        scroll_to: function() {
            var window_half, tipOffset;
            window_half = $(window).height() / 2, tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()), 
            0 != tipOffset && $("html, body").stop().animate({
                scrollTop: tipOffset
            }, this.settings.scroll_speed, "swing");
        },
        paused: function() {
            return -1 === $.inArray(this.settings.$li.index() + 1, this.settings.pause_after);
        },
        restart: function() {
            this.hide(), this.settings.$li = undefined, this.show("init");
        },
        pos_default: function(init) {
            var $nub = this.settings.$next_tip.find(".joyride-nub"), nub_width = Math.ceil($nub.outerWidth() / 2), nub_height = Math.ceil($nub.outerHeight() / 2), toggle = init || !1;
            if (toggle && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), 
            /body/i.test(this.settings.$target.selector)) this.settings.$li.length && this.pos_modal($nub); else {
                var topAdjustment = this.settings.tip_settings.tipAdjustmentY ? parseInt(this.settings.tip_settings.tipAdjustmentY) : 0, leftAdjustment = this.settings.tip_settings.tipAdjustmentX ? parseInt(this.settings.tip_settings.tipAdjustmentX) : 0;
                this.bottom() ? (this.settings.$next_tip.css(this.rtl ? {
                    top: this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment,
                    left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth() + leftAdjustment
                } : {
                    top: this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight() + topAdjustment,
                    left: this.settings.$target.offset().left + leftAdjustment
                }), this.nub_position($nub, this.settings.tip_settings.nub_position, "top")) : this.top() ? (this.settings.$next_tip.css(this.rtl ? {
                    top: this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment,
                    left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()
                } : {
                    top: this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height + topAdjustment,
                    left: this.settings.$target.offset().left + leftAdjustment
                }), this.nub_position($nub, this.settings.tip_settings.nub_position, "bottom")) : this.right() ? (this.settings.$next_tip.css({
                    top: this.settings.$target.offset().top + topAdjustment,
                    left: this.settings.$target.outerWidth() + this.settings.$target.offset().left + nub_width + leftAdjustment
                }), this.nub_position($nub, this.settings.tip_settings.nub_position, "left")) : this.left() && (this.settings.$next_tip.css({
                    top: this.settings.$target.offset().top + topAdjustment,
                    left: this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - nub_width + leftAdjustment
                }), this.nub_position($nub, this.settings.tip_settings.nub_position, "right")), 
                !this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length && ($nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), 
                this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts], 
                this.settings.attempts++, this.pos_default());
            }
            toggle && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"));
        },
        pos_phone: function(init) {
            var tip_height = this.settings.$next_tip.outerHeight(), target_height = (this.settings.$next_tip.offset(), 
            this.settings.$target.outerHeight()), $nub = $(".joyride-nub", this.settings.$next_tip), nub_height = Math.ceil($nub.outerHeight() / 2), toggle = init || !1;
            $nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), 
            toggle && (this.settings.$next_tip.css("visibility", "hidden"), this.settings.$next_tip.show()), 
            /body/i.test(this.settings.$target.selector) ? this.settings.$li.length && this.pos_modal($nub) : this.top() ? (this.settings.$next_tip.offset({
                top: this.settings.$target.offset().top - tip_height - nub_height
            }), $nub.addClass("bottom")) : (this.settings.$next_tip.offset({
                top: this.settings.$target.offset().top + target_height + nub_height
            }), $nub.addClass("top")), toggle && (this.settings.$next_tip.hide(), this.settings.$next_tip.css("visibility", "visible"));
        },
        pos_modal: function($nub) {
            this.center(), $nub.hide(), this.show_modal();
        },
        show_modal: function() {
            if (!this.settings.$next_tip.data("closed")) {
                var joyridemodalbg = $(".joyride-modal-bg");
                joyridemodalbg.length < 1 && $("body").append(this.settings.template.modal).show(), 
                /pop/i.test(this.settings.tip_animation) ? joyridemodalbg.show() : joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed);
            }
        },
        expose: function() {
            var expose, exposeCover, el, origCSS, origClasses, randId = "expose-" + this.random_str(6);
            if (arguments.length > 0 && arguments[0] instanceof $) el = arguments[0]; else {
                if (!this.settings.$target || /body/i.test(this.settings.$target.selector)) return !1;
                el = this.settings.$target;
            }
            return el.length < 1 ? (window.console && console.error("element not valid", el), 
            !1) : (expose = $(this.settings.template.expose), this.settings.$body.append(expose), 
            expose.css({
                top: el.offset().top,
                left: el.offset().left,
                width: el.outerWidth(!0),
                height: el.outerHeight(!0)
            }), exposeCover = $(this.settings.template.expose_cover), origCSS = {
                zIndex: el.css("z-index"),
                position: el.css("position")
            }, origClasses = null == el.attr("class") ? "" : el.attr("class"), el.css("z-index", parseInt(expose.css("z-index")) + 1), 
            "static" == origCSS.position && el.css("position", "relative"), el.data("expose-css", origCSS), 
            el.data("orig-class", origClasses), el.attr("class", origClasses + " " + this.settings.expose_add_class), 
            exposeCover.css({
                top: el.offset().top,
                left: el.offset().left,
                width: el.outerWidth(!0),
                height: el.outerHeight(!0)
            }), this.settings.modal && this.show_modal(), this.settings.$body.append(exposeCover), 
            expose.addClass(randId), exposeCover.addClass(randId), el.data("expose", randId), 
            this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, el), 
            void this.add_exposed(el));
        },
        un_expose: function() {
            var exposeId, el, expose, origCSS, origClasses, clearAll = !1;
            if (arguments.length > 0 && arguments[0] instanceof $) el = arguments[0]; else {
                if (!this.settings.$target || /body/i.test(this.settings.$target.selector)) return !1;
                el = this.settings.$target;
            }
            return el.length < 1 ? (window.console && console.error("element not valid", el), 
            !1) : (exposeId = el.data("expose"), expose = $("." + exposeId), arguments.length > 1 && (clearAll = arguments[1]), 
            clearAll === !0 ? $(".joyride-expose-wrapper,.joyride-expose-cover").remove() : expose.remove(), 
            origCSS = el.data("expose-css"), "auto" == origCSS.zIndex ? el.css("z-index", "") : el.css("z-index", origCSS.zIndex), 
            origCSS.position != el.css("position") && ("static" == origCSS.position ? el.css("position", "") : el.css("position", origCSS.position)), 
            origClasses = el.data("orig-class"), el.attr("class", origClasses), el.removeData("orig-classes"), 
            el.removeData("expose"), el.removeData("expose-z-index"), void this.remove_exposed(el));
        },
        add_exposed: function(el) {
            this.settings.exposed = this.settings.exposed || [], el instanceof $ || "object" == typeof el ? this.settings.exposed.push(el[0]) : "string" == typeof el && this.settings.exposed.push(el);
        },
        remove_exposed: function(el) {
            var search, i;
            for (el instanceof $ ? search = el[0] : "string" == typeof el && (search = el), 
            this.settings.exposed = this.settings.exposed || [], i = this.settings.exposed.length; i--; ) if (this.settings.exposed[i] == search) return void this.settings.exposed.splice(i, 1);
        },
        center: function() {
            var $w = $(window);
            return this.settings.$next_tip.css({
                top: ($w.height() - this.settings.$next_tip.outerHeight()) / 2 + $w.scrollTop(),
                left: ($w.width() - this.settings.$next_tip.outerWidth()) / 2 + $w.scrollLeft()
            }), !0;
        },
        bottom: function() {
            return /bottom/i.test(this.settings.tip_settings.tip_location);
        },
        top: function() {
            return /top/i.test(this.settings.tip_settings.tip_location);
        },
        right: function() {
            return /right/i.test(this.settings.tip_settings.tip_location);
        },
        left: function() {
            return /left/i.test(this.settings.tip_settings.tip_location);
        },
        corners: function(el) {
            var w = $(window), window_half = w.height() / 2, tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()), right = w.width() + w.scrollLeft(), offsetBottom = w.height() + tipOffset, bottom = w.height() + w.scrollTop(), top = w.scrollTop();
            return top > tipOffset && (top = 0 > tipOffset ? 0 : tipOffset), offsetBottom > bottom && (bottom = offsetBottom), 
            [ el.offset().top < top, right < el.offset().left + el.outerWidth(), bottom < el.offset().top + el.outerHeight(), w.scrollLeft() > el.offset().left ];
        },
        visible: function(hidden_corners) {
            for (var i = hidden_corners.length; i--; ) if (hidden_corners[i]) return !1;
            return !0;
        },
        nub_position: function(nub, pos, def) {
            nub.addClass("auto" === pos ? def : pos);
        },
        startTimer: function() {
            this.settings.$li.length ? this.settings.automate = setTimeout(function() {
                this.hide(), this.show(), this.startTimer();
            }.bind(this), this.settings.timer) : clearTimeout(this.settings.automate);
        },
        end: function(abort) {
            this.settings.cookie_monster && $.cookie(this.settings.cookie_name, "ridden", {
                expires: this.settings.cookie_expires,
                domain: this.settings.cookie_domain
            }), this.settings.timer > 0 && clearTimeout(this.settings.automate), this.settings.modal && this.settings.expose && this.un_expose(), 
            $(this.scope).off("keyup.joyride"), this.settings.$next_tip.data("closed", !0), 
            this.settings.riding = !1, $(".joyride-modal-bg").hide(), this.settings.$current_tip.hide(), 
            ("undefined" == typeof abort || abort === !1) && (this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip), 
            this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip)), 
            $(".joyride-tip-guide").remove();
        },
        off: function() {
            $(this.scope).off(".joyride"), $(window).off(".joyride"), $(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"), 
            $(".joyride-tip-guide, .joyride-modal-bg").remove(), clearTimeout(this.settings.automate), 
            this.settings = {};
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function($, window, document, undefined) {
    "use strict";
    function removeQuotes(string) {
        return ("string" == typeof string || string instanceof String) && (string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, "")), 
        string;
    }
    var header_helpers = function(class_array) {
        for (var i = class_array.length, head = $("head"); i--; ) 0 === head.has("." + class_array[i]).length && head.append('<meta class="' + class_array[i] + '" />');
    };
    header_helpers([ "foundation-mq-small", "foundation-mq-medium", "foundation-mq-large", "foundation-mq-xlarge", "foundation-mq-xxlarge", "foundation-data-attribute-namespace" ]), 
    $(function() {
        "undefined" != typeof FastClick && "undefined" != typeof document.body && FastClick.attach(document.body);
    });
    var S = function(selector, context) {
        if ("string" == typeof selector) {
            if (context) {
                var cont;
                if (context.jquery) {
                    if (cont = context[0], !cont) return context;
                } else cont = context;
                return $(cont.querySelectorAll(selector));
            }
            return $(document.querySelectorAll(selector));
        }
        return $(selector, context);
    }, attr_name = function(init) {
        var arr = [];
        return init || arr.push("data"), this.namespace.length > 0 && arr.push(this.namespace), 
        arr.push(this.name), arr.join("-");
    }, add_namespace = function(str) {
        for (var parts = str.split("-"), i = parts.length, arr = []; i--; ) 0 !== i ? arr.push(parts[i]) : this.namespace.length > 0 ? arr.push(this.namespace, parts[i]) : arr.push(parts[i]);
        return arr.reverse().join("-");
    }, bindings = function(method, options) {
        var self = this, should_bind_events = !S(this).data(this.attr_name(!0));
        return S(this.scope).is("[" + this.attr_name() + "]") ? (S(this.scope).data(this.attr_name(!0) + "-init", $.extend({}, this.settings, options || method, this.data_options(S(this.scope)))), 
        should_bind_events && this.events(this.scope)) : S("[" + this.attr_name() + "]", this.scope).each(function() {
            var should_bind_events = !S(this).data(self.attr_name(!0) + "-init");
            S(this).data(self.attr_name(!0) + "-init", $.extend({}, self.settings, options || method, self.data_options(S(this)))), 
            should_bind_events && self.events(this);
        }), "string" == typeof method ? this[method].call(this, options) : void 0;
    }, single_image_loaded = function(image, callback) {
        function loaded() {
            callback(image[0]);
        }
        function bindLoad() {
            if (this.one("load", loaded), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var src = this.attr("src"), param = src.match(/\?/) ? "&" : "?";
                param += "random=" + new Date().getTime(), this.attr("src", src + param);
            }
        }
        return image.attr("src") ? void (image[0].complete || 4 === image[0].readyState ? loaded() : bindLoad.call(image)) : void loaded();
    };
    window.matchMedia = window.matchMedia || function(doc) {
        var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild, fakeBody = doc.createElement("body"), div = doc.createElement("div");
        return div.id = "mq-test-1", div.style.cssText = "position:absolute;top:-100em", 
        fakeBody.style.background = "none", fakeBody.appendChild(div), function(q) {
            return div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>', 
            docElem.insertBefore(fakeBody, refNode), bool = 42 === div.offsetWidth, docElem.removeChild(fakeBody), 
            {
                matches: bool,
                media: q
            };
        };
    }(document), function() {
        function raf() {
            animating && (requestAnimationFrame(raf), jqueryFxAvailable && jQuery.fx.tick());
        }
        for (var animating, lastTime = 0, vendors = [ "webkit", "moz" ], requestAnimationFrame = window.requestAnimationFrame, cancelAnimationFrame = window.cancelAnimationFrame, jqueryFxAvailable = "undefined" != typeof jQuery.fx; lastTime < vendors.length && !requestAnimationFrame; lastTime++) requestAnimationFrame = window[vendors[lastTime] + "RequestAnimationFrame"], 
        cancelAnimationFrame = cancelAnimationFrame || window[vendors[lastTime] + "CancelAnimationFrame"] || window[vendors[lastTime] + "CancelRequestAnimationFrame"];
        requestAnimationFrame ? (window.requestAnimationFrame = requestAnimationFrame, window.cancelAnimationFrame = cancelAnimationFrame, 
        jqueryFxAvailable && (jQuery.fx.timer = function(timer) {
            timer() && jQuery.timers.push(timer) && !animating && (animating = !0, raf());
        }, jQuery.fx.stop = function() {
            animating = !1;
        })) : (window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            return lastTime = currTime + timeToCall, id;
        }, window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        });
    }(jQuery), window.Foundation = {
        name: "Foundation",
        version: "{{VERSION}}",
        media_queries: {
            small: S(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            medium: S(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            large: S(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            xlarge: S(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""),
            xxlarge: S(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, "")
        },
        stylesheet: $("<style></style>").appendTo("head")[0].sheet,
        global: {
            namespace: undefined
        },
        init: function(scope, libraries, method, options, response) {
            var args = [ scope, method, options, response ], responses = [];
            if (this.rtl = /rtl/i.test(S("html").attr("dir")), this.scope = scope || this.scope, 
            this.set_namespace(), libraries && "string" == typeof libraries && !/reflow/i.test(libraries)) this.libs.hasOwnProperty(libraries) && responses.push(this.init_lib(libraries, args)); else for (var lib in this.libs) responses.push(this.init_lib(lib, libraries));
            return S(window).load(function() {
                S(window).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider");
            }), scope;
        },
        init_lib: function(lib, args) {
            return this.libs.hasOwnProperty(lib) ? (this.patch(this.libs[lib]), args && args.hasOwnProperty(lib) ? ("undefined" != typeof this.libs[lib].settings ? $.extend(!0, this.libs[lib].settings, args[lib]) : "undefined" != typeof this.libs[lib].defaults && $.extend(!0, this.libs[lib].defaults, args[lib]), 
            this.libs[lib].init.apply(this.libs[lib], [ this.scope, args[lib] ])) : (args = args instanceof Array ? args : new Array(args), 
            this.libs[lib].init.apply(this.libs[lib], args))) : function() {};
        },
        patch: function(lib) {
            lib.scope = this.scope, lib.namespace = this.global.namespace, lib.rtl = this.rtl, 
            lib.data_options = this.utils.data_options, lib.attr_name = attr_name, lib.add_namespace = add_namespace, 
            lib.bindings = bindings, lib.S = this.utils.S;
        },
        inherit: function(scope, methods) {
            for (var methods_arr = methods.split(" "), i = methods_arr.length; i--; ) this.utils.hasOwnProperty(methods_arr[i]) && (scope[methods_arr[i]] = this.utils[methods_arr[i]]);
        },
        set_namespace: function() {
            var namespace = this.global.namespace === undefined ? $(".foundation-data-attribute-namespace").css("font-family") : this.global.namespace;
            this.global.namespace = namespace === undefined || /false/i.test(namespace) ? "" : namespace;
        },
        libs: {},
        utils: {
            S: S,
            throttle: function(func, delay) {
                var timer = null;
                return function() {
                    var context = this, args = arguments;
                    null == timer && (timer = setTimeout(function() {
                        func.apply(context, args), timer = null;
                    }, delay));
                };
            },
            debounce: function(func, delay, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later = function() {
                        timeout = null, immediate || (result = func.apply(context, args));
                    }, callNow = immediate && !timeout;
                    return clearTimeout(timeout), timeout = setTimeout(later, delay), callNow && (result = func.apply(context, args)), 
                    result;
                };
            },
            data_options: function(el, data_attr_name) {
                function isNumber(o) {
                    return !isNaN(o - 0) && null !== o && "" !== o && o !== !1 && o !== !0;
                }
                function trim(str) {
                    return "string" == typeof str ? $.trim(str) : str;
                }
                data_attr_name = data_attr_name || "options";
                var ii, p, opts_arr, opts = {}, data_options = function(el) {
                    var namespace = Foundation.global.namespace;
                    return el.data(namespace.length > 0 ? namespace + "-" + data_attr_name : data_attr_name);
                }, cached_options = data_options(el);
                if ("object" == typeof cached_options) return cached_options;
                for (opts_arr = (cached_options || ":").split(";"), ii = opts_arr.length; ii--; ) p = opts_arr[ii].split(":"), 
                p = [ p[0], p.slice(1).join(":") ], /true/i.test(p[1]) && (p[1] = !0), /false/i.test(p[1]) && (p[1] = !1), 
                isNumber(p[1]) && (p[1] = -1 === p[1].indexOf(".") ? parseInt(p[1], 10) : parseFloat(p[1])), 
                2 === p.length && p[0].length > 0 && (opts[trim(p[0])] = trim(p[1]));
                return opts;
            },
            register_media: function(media, media_class) {
                Foundation.media_queries[media] === undefined && ($("head").append('<meta class="' + media_class + '"/>'), 
                Foundation.media_queries[media] = removeQuotes($("." + media_class).css("font-family")));
            },
            add_custom_rule: function(rule, media) {
                if (media === undefined && Foundation.stylesheet) Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length); else {
                    var query = Foundation.media_queries[media];
                    query !== undefined && Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[media] + "{ " + rule + " }");
                }
            },
            image_loaded: function(images, callback) {
                var self = this, unloaded = images.length;
                0 === unloaded && callback(images), images.each(function() {
                    single_image_loaded(self.S(this), function() {
                        unloaded -= 1, 0 === unloaded && callback(images);
                    });
                });
            },
            random_str: function() {
                return this.fidx || (this.fidx = 0), this.prefix = this.prefix || [ this.name || "F", (+new Date()).toString(36) ].join("-"), 
                this.prefix + (this.fidx++).toString(36);
            }
        }
    }, $.fn.foundation = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            return Foundation.init.apply(Foundation, [ this ].concat(args)), this;
        });
    };
}(jQuery, window, window.document), function($, window) {
    "use strict";
    Foundation.libs["magellan-expedition"] = {
        name: "magellan-expedition",
        version: "{{VERSION}}",
        settings: {
            active_class: "active",
            threshold: 0,
            destination_threshold: 20,
            throttle_delay: 30,
            fixed_top: 0
        },
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle"), this.bindings(method, options);
        },
        events: function() {
            var self = this, S = self.S, settings = self.settings;
            self.set_expedition_position(), S(self.scope).off(".magellan").on("click.fndtn.magellan", "[" + self.add_namespace("data-magellan-arrival") + '] a[href^="#"]', function(e) {
                e.preventDefault();
                var expedition = $(this).closest("[" + self.attr_name() + "]"), settings = expedition.data("magellan-expedition-init"), hash = this.hash.split("#").join(""), target = $("a[name='" + hash + "']");
                0 === target.length && (target = $("#" + hash));
                var scroll_top = target.offset().top - settings.destination_threshold + 1;
                scroll_top -= expedition.outerHeight(), $("html, body").stop().animate({
                    scrollTop: scroll_top
                }, 700, "swing", function() {
                    history.pushState ? history.pushState(null, null, "#" + hash) : location.hash = "#" + hash;
                });
            }).on("scroll.fndtn.magellan", self.throttle(this.check_for_arrivals.bind(this), settings.throttle_delay)), 
            $(window).on("resize.fndtn.magellan", self.throttle(this.set_expedition_position.bind(this), settings.throttle_delay));
        },
        check_for_arrivals: function() {
            var self = this;
            self.update_arrivals(), self.update_expedition_positions();
        },
        set_expedition_position: function() {
            var self = this;
            $("[" + this.attr_name() + "=fixed]", self.scope).each(function() {
                var top_offset, fixed_top, expedition = $(this), settings = expedition.data("magellan-expedition-init"), styles = expedition.attr("styles");
                expedition.attr("style", ""), top_offset = expedition.offset().top + settings.threshold, 
                fixed_top = parseInt(expedition.data("magellan-fixed-top")), isNaN(fixed_top) || (self.settings.fixed_top = fixed_top), 
                expedition.data(self.data_attr("magellan-top-offset"), top_offset), expedition.attr("style", styles);
            });
        },
        update_expedition_positions: function() {
            var self = this, window_top_offset = $(window).scrollTop();
            $("[" + this.attr_name() + "=fixed]", self.scope).each(function() {
                var expedition = $(this), settings = expedition.data("magellan-expedition-init"), styles = expedition.attr("style"), top_offset = expedition.data("magellan-top-offset");
                if (window_top_offset + self.settings.fixed_top >= top_offset) {
                    var placeholder = expedition.prev("[" + self.add_namespace("data-magellan-expedition-clone") + "]");
                    0 === placeholder.length && (placeholder = expedition.clone(), placeholder.removeAttr(self.attr_name()), 
                    placeholder.attr(self.add_namespace("data-magellan-expedition-clone"), ""), expedition.before(placeholder)), 
                    expedition.css({
                        position: "fixed",
                        top: settings.fixed_top
                    }).addClass("fixed");
                } else expedition.prev("[" + self.add_namespace("data-magellan-expedition-clone") + "]").remove(), 
                expedition.attr("style", styles).css("position", "").css("top", "").removeClass("fixed");
            });
        },
        update_arrivals: function() {
            var self = this, window_top_offset = $(window).scrollTop();
            $("[" + this.attr_name() + "]", self.scope).each(function() {
                var expedition = $(this), settings = expedition.data(self.attr_name(!0) + "-init"), offsets = self.offsets(expedition, window_top_offset), arrivals = expedition.find("[" + self.add_namespace("data-magellan-arrival") + "]"), active_item = !1;
                offsets.each(function(idx, item) {
                    if (item.viewport_offset >= item.top_offset) {
                        var arrivals = expedition.find("[" + self.add_namespace("data-magellan-arrival") + "]");
                        return arrivals.not(item.arrival).removeClass(settings.active_class), item.arrival.addClass(settings.active_class), 
                        active_item = !0, !0;
                    }
                }), active_item || arrivals.removeClass(settings.active_class);
            });
        },
        offsets: function(expedition, window_offset) {
            var self = this, settings = expedition.data(self.attr_name(!0) + "-init"), viewport_offset = window_offset;
            return expedition.find("[" + self.add_namespace("data-magellan-arrival") + "]").map(function() {
                var name = $(this).data(self.data_attr("magellan-arrival")), dest = $("[" + self.add_namespace("data-magellan-destination") + "=" + name + "]");
                if (dest.length > 0) {
                    var top_offset = Math.floor(dest.offset().top - settings.destination_threshold - expedition.outerHeight());
                    return {
                        destination: dest,
                        arrival: $(this),
                        top_offset: top_offset,
                        viewport_offset: viewport_offset
                    };
                }
            }).sort(function(a, b) {
                return a.top_offset < b.top_offset ? -1 : a.top_offset > b.top_offset ? 1 : 0;
            });
        },
        data_attr: function(str) {
            return this.namespace.length > 0 ? this.namespace + "-" + str : str;
        },
        off: function() {
            this.S(this.scope).off(".magellan"), this.S(window).off(".magellan");
        },
        reflow: function() {
            var self = this;
            $("[" + self.add_namespace("data-magellan-expedition-clone") + "]", self.scope).remove();
        }
    };
}(jQuery, window, window.document), function($) {
    "use strict";
    Foundation.libs.offcanvas = {
        name: "offcanvas",
        version: "{{VERSION}}",
        settings: {
            open_method: "move",
            close_on_click: !1
        },
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function() {
            var self = this, S = self.S, move_class = "", right_postfix = "", left_postfix = "";
            "move" === this.settings.open_method ? (move_class = "move-", right_postfix = "right", 
            left_postfix = "left") : "overlap_single" === this.settings.open_method ? (move_class = "offcanvas-overlap-", 
            right_postfix = "right", left_postfix = "left") : "overlap" === this.settings.open_method && (move_class = "offcanvas-overlap"), 
            S(this.scope).off(".offcanvas").on("click.fndtn.offcanvas", ".left-off-canvas-toggle", function(e) {
                self.click_toggle_class(e, move_class + right_postfix), "overlap" !== self.settings.open_method && S(".left-submenu").removeClass(move_class + right_postfix), 
                $(".left-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".left-off-canvas-menu a", function(e) {
                var settings = self.get_settings(e), parent = S(this).parent();
                !settings.close_on_click || parent.hasClass("has-submenu") || parent.hasClass("back") ? S(this).parent().hasClass("has-submenu") ? (e.preventDefault(), 
                S(this).siblings(".left-submenu").toggleClass(move_class + right_postfix)) : parent.hasClass("back") && (e.preventDefault(), 
                parent.parent().removeClass(move_class + right_postfix)) : (self.hide.call(self, move_class + right_postfix, self.get_wrapper(e)), 
                parent.parent().removeClass(move_class + right_postfix)), $(".left-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".right-off-canvas-toggle", function(e) {
                self.click_toggle_class(e, move_class + left_postfix), "overlap" !== self.settings.open_method && S(".right-submenu").removeClass(move_class + left_postfix), 
                $(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".right-off-canvas-menu a", function(e) {
                var settings = self.get_settings(e), parent = S(this).parent();
                !settings.close_on_click || parent.hasClass("has-submenu") || parent.hasClass("back") ? S(this).parent().hasClass("has-submenu") ? (e.preventDefault(), 
                S(this).siblings(".right-submenu").toggleClass(move_class + left_postfix)) : parent.hasClass("back") && (e.preventDefault(), 
                parent.parent().removeClass(move_class + left_postfix)) : (self.hide.call(self, move_class + left_postfix, self.get_wrapper(e)), 
                parent.parent().removeClass(move_class + left_postfix)), $(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
                self.click_remove_class(e, move_class + left_postfix), S(".right-submenu").removeClass(move_class + left_postfix), 
                right_postfix && (self.click_remove_class(e, move_class + right_postfix), S(".left-submenu").removeClass(move_class + left_postfix)), 
                $(".right-off-canvas-toggle").attr("aria-expanded", "true");
            }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(e) {
                self.click_remove_class(e, move_class + left_postfix), $(".left-off-canvas-toggle").attr("aria-expanded", "false"), 
                right_postfix && (self.click_remove_class(e, move_class + right_postfix), $(".right-off-canvas-toggle").attr("aria-expanded", "false"));
            });
        },
        toggle: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper(), $off_canvas.is("." + class_name) ? this.hide(class_name, $off_canvas) : this.show(class_name, $off_canvas);
        },
        show: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper(), $off_canvas.trigger("open").trigger("open.fndtn.offcanvas"), 
            $off_canvas.addClass(class_name);
        },
        hide: function(class_name, $off_canvas) {
            $off_canvas = $off_canvas || this.get_wrapper(), $off_canvas.trigger("close").trigger("close.fndtn.offcanvas"), 
            $off_canvas.removeClass(class_name);
        },
        click_toggle_class: function(e, class_name) {
            e.preventDefault();
            var $off_canvas = this.get_wrapper(e);
            this.toggle(class_name, $off_canvas);
        },
        click_remove_class: function(e, class_name) {
            e.preventDefault();
            var $off_canvas = this.get_wrapper(e);
            this.hide(class_name, $off_canvas);
        },
        get_settings: function(e) {
            var offcanvas = this.S(e.target).closest("[" + this.attr_name() + "]");
            return offcanvas.data(this.attr_name(!0) + "-init") || this.settings;
        },
        get_wrapper: function(e) {
            var $off_canvas = this.S(e ? e.target : this.scope).closest(".off-canvas-wrap");
            return 0 === $off_canvas.length && ($off_canvas = this.S(".off-canvas-wrap")), $off_canvas;
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function($, window, document, undefined) {
    "use strict";
    var noop = function() {}, Orbit = function(el, settings) {
        if (el.hasClass(settings.slides_container_class)) return this;
        var container, number_container, bullets_container, timer_container, animate, timer, self = this, slides_container = el, idx = 0, locked = !1;
        self.slides = function() {
            return slides_container.children(settings.slide_selector);
        }, self.slides().first().addClass(settings.active_slide_class), self.update_slide_number = function(index) {
            settings.slide_number && (number_container.find("span:first").text(parseInt(index) + 1), 
            number_container.find("span:last").text(self.slides().length)), settings.bullets && (bullets_container.children().removeClass(settings.bullets_active_class), 
            $(bullets_container.children().get(index)).addClass(settings.bullets_active_class));
        }, self.update_active_link = function(index) {
            var link = $('[data-orbit-link="' + self.slides().eq(index).attr("data-orbit-slide") + '"]');
            link.siblings().removeClass(settings.bullets_active_class), link.addClass(settings.bullets_active_class);
        }, self.build_markup = function() {
            slides_container.wrap('<div class="' + settings.container_class + '"></div>'), container = slides_container.parent(), 
            slides_container.addClass(settings.slides_container_class), settings.stack_on_small && container.addClass(settings.stack_on_small_class), 
            settings.navigation_arrows && (container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class)), 
            container.append($('<a href="#"><span></span></a>').addClass(settings.next_class))), 
            settings.timer && (timer_container = $("<div>").addClass(settings.timer_container_class), 
            timer_container.append("<span>"), timer_container.append($("<div>").addClass(settings.timer_progress_class)), 
            timer_container.addClass(settings.timer_paused_class), container.append(timer_container)), 
            settings.slide_number && (number_container = $("<div>").addClass(settings.slide_number_class), 
            number_container.append("<span></span> " + settings.slide_number_text + " <span></span>"), 
            container.append(number_container)), settings.bullets && (bullets_container = $("<ol>").addClass(settings.bullets_container_class), 
            container.append(bullets_container), bullets_container.wrap('<div class="orbit-bullets-container"></div>'), 
            self.slides().each(function(idx) {
                var bullet = $("<li>").attr("data-orbit-slide", idx).on("click", self.link_bullet);
                bullets_container.append(bullet);
            }));
        }, self._goto = function(next_idx, start_timer) {
            if (next_idx === idx) return !1;
            "object" == typeof timer && timer.restart();
            var slides = self.slides(), dir = "next";
            if (locked = !0, idx > next_idx && (dir = "prev"), next_idx >= slides.length) {
                if (!settings.circular) return !1;
                next_idx = 0;
            } else if (0 > next_idx) {
                if (!settings.circular) return !1;
                next_idx = slides.length - 1;
            }
            var current = $(slides.get(idx)), next = $(slides.get(next_idx));
            current.css("zIndex", 2), current.removeClass(settings.active_slide_class), next.css("zIndex", 4).addClass(settings.active_slide_class), 
            slides_container.trigger("before-slide-change.fndtn.orbit"), settings.before_slide_change(), 
            self.update_active_link(next_idx);
            var callback = function() {
                var unlock = function() {
                    idx = next_idx, locked = !1, start_timer === !0 && (timer = self.create_timer(), 
                    timer.start()), self.update_slide_number(idx), slides_container.trigger("after-slide-change.fndtn.orbit", [ {
                        slide_number: idx,
                        total_slides: slides.length
                    } ]), settings.after_slide_change(idx, slides.length);
                };
                slides_container.height() != next.height() && settings.variable_height ? slides_container.animate({
                    height: next.height()
                }, 250, "linear", unlock) : unlock();
            };
            if (1 === slides.length) return callback(), !1;
            var start_animation = function() {
                "next" === dir && animate.next(current, next, callback), "prev" === dir && animate.prev(current, next, callback);
            };
            next.height() > slides_container.height() && settings.variable_height ? slides_container.animate({
                height: next.height()
            }, 250, "linear", start_animation) : start_animation();
        }, self.next = function(e) {
            e.stopImmediatePropagation(), e.preventDefault(), self._goto(idx + 1);
        }, self.prev = function(e) {
            e.stopImmediatePropagation(), e.preventDefault(), self._goto(idx - 1);
        }, self.link_custom = function(e) {
            e.preventDefault();
            var link = $(this).attr("data-orbit-link");
            if ("string" == typeof link && "" != (link = $.trim(link))) {
                var slide = container.find("[data-orbit-slide=" + link + "]");
                -1 != slide.index() && self._goto(slide.index());
            }
        }, self.link_bullet = function() {
            var index = $(this).attr("data-orbit-slide");
            if ("string" == typeof index && "" != (index = $.trim(index))) if (isNaN(parseInt(index))) {
                var slide = container.find("[data-orbit-slide=" + index + "]");
                -1 != slide.index() && self._goto(slide.index() + 1);
            } else self._goto(parseInt(index));
        }, self.timer_callback = function() {
            self._goto(idx + 1, !0);
        }, self.compute_dimensions = function() {
            var current = $(self.slides().get(idx)), h = current.height();
            settings.variable_height || self.slides().each(function() {
                $(this).height() > h && (h = $(this).height());
            }), slides_container.height(h);
        }, self.create_timer = function() {
            var t = new Timer(container.find("." + settings.timer_container_class), settings, self.timer_callback);
            return t;
        }, self.stop_timer = function() {
            "object" == typeof timer && timer.stop();
        }, self.toggle_timer = function() {
            var t = container.find("." + settings.timer_container_class);
            t.hasClass(settings.timer_paused_class) ? ("undefined" == typeof timer && (timer = self.create_timer()), 
            timer.start()) : "object" == typeof timer && timer.stop();
        }, self.init = function() {
            self.build_markup(), settings.timer && (timer = self.create_timer(), Foundation.utils.image_loaded(this.slides().children("img"), timer.start)), 
            animate = new FadeAnimation(settings, slides_container), "slide" === settings.animation && (animate = new SlideAnimation(settings, slides_container)), 
            container.on("click", "." + settings.next_class, self.next), container.on("click", "." + settings.prev_class, self.prev), 
            settings.next_on_click && container.on("click", "." + settings.slides_container_class + " [data-orbit-slide]", self.link_bullet), 
            container.on("click", self.toggle_timer), settings.swipe && container.on("touchstart.fndtn.orbit", function(e) {
                e.touches || (e = e.originalEvent);
                var data = {
                    start_page_x: e.touches[0].pageX,
                    start_page_y: e.touches[0].pageY,
                    start_time: new Date().getTime(),
                    delta_x: 0,
                    is_scrolling: undefined
                };
                container.data("swipe-transition", data), e.stopPropagation();
            }).on("touchmove.fndtn.orbit", function(e) {
                if (e.touches || (e = e.originalEvent), !(e.touches.length > 1 || e.scale && 1 !== e.scale)) {
                    var data = container.data("swipe-transition");
                    if ("undefined" == typeof data && (data = {}), data.delta_x = e.touches[0].pageX - data.start_page_x, 
                    "undefined" == typeof data.is_scrolling && (data.is_scrolling = !!(data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y))), 
                    !data.is_scrolling && !data.active) {
                        e.preventDefault();
                        var direction = data.delta_x < 0 ? idx + 1 : idx - 1;
                        data.active = !0, self._goto(direction);
                    }
                }
            }).on("touchend.fndtn.orbit", function(e) {
                container.data("swipe-transition", {}), e.stopPropagation();
            }), container.on("mouseenter.fndtn.orbit", function() {
                settings.timer && settings.pause_on_hover && self.stop_timer();
            }).on("mouseleave.fndtn.orbit", function() {
                settings.timer && settings.resume_on_mouseout && timer.start();
            }), $(document).on("click", "[data-orbit-link]", self.link_custom), $(window).on("load resize", self.compute_dimensions), 
            Foundation.utils.image_loaded(this.slides().children("img"), self.compute_dimensions), 
            Foundation.utils.image_loaded(this.slides().children("img"), function() {
                container.prev("." + settings.preloader_class).css("display", "none"), self.update_slide_number(0), 
                self.update_active_link(0), slides_container.trigger("ready.fndtn.orbit");
            });
        }, self.init();
    }, Timer = function(el, settings, callback) {
        var start, timeout, self = this, duration = settings.timer_speed, progress = el.find("." + settings.timer_progress_class), left = -1;
        this.update_progress = function(w) {
            var new_progress = progress.clone();
            new_progress.attr("style", ""), new_progress.css("width", w + "%"), progress.replaceWith(new_progress), 
            progress = new_progress;
        }, this.restart = function() {
            clearTimeout(timeout), el.addClass(settings.timer_paused_class), left = -1, self.update_progress(0);
        }, this.start = function() {
            return el.hasClass(settings.timer_paused_class) ? (left = -1 === left ? duration : left, 
            el.removeClass(settings.timer_paused_class), start = new Date().getTime(), progress.animate({
                width: "100%"
            }, left, "linear"), timeout = setTimeout(function() {
                self.restart(), callback();
            }, left), void el.trigger("timer-started.fndtn.orbit")) : !0;
        }, this.stop = function() {
            if (el.hasClass(settings.timer_paused_class)) return !0;
            clearTimeout(timeout), el.addClass(settings.timer_paused_class);
            var end = new Date().getTime();
            left -= end - start;
            var w = 100 - left / duration * 100;
            self.update_progress(w), el.trigger("timer-stopped.fndtn.orbit");
        };
    }, SlideAnimation = function(settings) {
        var duration = settings.animation_speed, is_rtl = 1 === $("html[dir=rtl]").length, margin = is_rtl ? "marginRight" : "marginLeft", animMargin = {};
        animMargin[margin] = "0%", this.next = function(current, next, callback) {
            current.animate({
                marginLeft: "-100%"
            }, duration), next.animate(animMargin, duration, function() {
                current.css(margin, "100%"), callback();
            });
        }, this.prev = function(current, prev, callback) {
            current.animate({
                marginLeft: "100%"
            }, duration), prev.css(margin, "-100%"), prev.animate(animMargin, duration, function() {
                current.css(margin, "100%"), callback();
            });
        };
    }, FadeAnimation = function(settings) {
        {
            var duration = settings.animation_speed;
            1 === $("html[dir=rtl]").length;
        }
        this.next = function(current, next, callback) {
            next.css({
                margin: "0%",
                opacity: "0.01"
            }), next.animate({
                opacity: "1"
            }, duration, "linear", function() {
                current.css("margin", "100%"), callback();
            });
        }, this.prev = function(current, prev, callback) {
            prev.css({
                margin: "0%",
                opacity: "0.01"
            }), prev.animate({
                opacity: "1"
            }, duration, "linear", function() {
                current.css("margin", "100%"), callback();
            });
        };
    };
    Foundation.libs = Foundation.libs || {}, Foundation.libs.orbit = {
        name: "orbit",
        version: "{{VERSION}}",
        settings: {
            animation: "slide",
            timer_speed: 1e4,
            pause_on_hover: !0,
            resume_on_mouseout: !1,
            next_on_click: !0,
            animation_speed: 500,
            stack_on_small: !1,
            navigation_arrows: !0,
            slide_number: !0,
            slide_number_text: "of",
            container_class: "orbit-container",
            stack_on_small_class: "orbit-stack-on-small",
            next_class: "orbit-next",
            prev_class: "orbit-prev",
            timer_container_class: "orbit-timer",
            timer_paused_class: "paused",
            timer_progress_class: "orbit-progress",
            slides_container_class: "orbit-slides-container",
            preloader_class: "preloader",
            slide_selector: "*",
            bullets_container_class: "orbit-bullets",
            bullets_active_class: "active",
            slide_number_class: "orbit-slide-number",
            caption_class: "orbit-caption",
            active_slide_class: "active",
            orbit_transition_class: "orbit-transitioning",
            bullets: !0,
            circular: !0,
            timer: !0,
            variable_height: !1,
            swipe: !0,
            before_slide_change: noop,
            after_slide_change: noop
        },
        init: function(scope, method, options) {
            this.bindings(method, options);
        },
        events: function(instance) {
            var orbit_instance = new Orbit(this.S(instance), this.S(instance).data("orbit-init"));
            this.S(instance).data(this.name + "-instance", orbit_instance);
        },
        reflow: function() {
            var self = this;
            if (self.S(self.scope).is("[data-orbit]")) {
                var $el = self.S(self.scope), instance = $el.data(self.name + "-instance");
                instance.compute_dimensions();
            } else self.S("[data-orbit]", self.scope).each(function(idx, el) {
                var $el = self.S(el), instance = (self.data_options($el), $el.data(self.name + "-instance"));
                instance.compute_dimensions();
            });
        }
    };
}(jQuery, window, window.document), function($, window, document, undefined) {
    "use strict";
    function getAnimationData(str) {
        var fade = /fade/i.test(str), pop = /pop/i.test(str);
        return {
            animate: fade || pop,
            pop: pop,
            fade: fade
        };
    }
    Foundation.libs.reveal = {
        name: "reveal",
        version: "{{VERSION}}",
        locked: !1,
        settings: {
            animation: "fadeAndPop",
            animation_speed: 250,
            close_on_background_click: !0,
            close_on_esc: !0,
            dismiss_modal_class: "close-reveal-modal",
            bg_class: "reveal-modal-bg",
            root_element: "body",
            open: function() {},
            opened: function() {},
            close: function() {},
            closed: function() {},
            bg: $(".reveal-modal-bg"),
            css: {
                open: {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                },
                close: {
                    opacity: 1,
                    visibility: "hidden",
                    display: "none"
                }
            }
        },
        init: function(scope, method, options) {
            $.extend(!0, this.settings, method, options), this.bindings(method, options);
        },
        events: function() {
            var self = this, S = self.S;
            return S(this.scope).off(".reveal").on("click.fndtn.reveal", "[" + this.add_namespace("data-reveal-id") + "]:not([disabled])", function(e) {
                if (e.preventDefault(), !self.locked) {
                    var element = S(this), ajax = element.data(self.data_attr("reveal-ajax"));
                    if (self.locked = !0, "undefined" == typeof ajax) self.open.call(self, element); else {
                        var url = ajax === !0 ? element.attr("href") : ajax;
                        self.open.call(self, element, {
                            url: url
                        });
                    }
                }
            }), S(document).on("click.fndtn.reveal", this.close_targets(), function(e) {
                if (e.preventDefault(), !self.locked) {
                    var settings = S("[" + self.attr_name() + "].open").data(self.attr_name(!0) + "-init"), bg_clicked = S(e.target)[0] === S("." + settings.bg_class)[0];
                    if (bg_clicked) {
                        if (!settings.close_on_background_click) return;
                        e.stopPropagation();
                    }
                    self.locked = !0, self.close.call(self, bg_clicked ? S("[" + self.attr_name() + "].open") : S(this).closest("[" + self.attr_name() + "]"));
                }
            }), S("[" + self.attr_name() + "]", this.scope).length > 0 ? S(this.scope).on("open.fndtn.reveal", this.settings.open).on("opened.fndtn.reveal", this.settings.opened).on("opened.fndtn.reveal", this.open_video).on("close.fndtn.reveal", this.settings.close).on("closed.fndtn.reveal", this.settings.closed).on("closed.fndtn.reveal", this.close_video) : S(this.scope).on("open.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.open).on("opened.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.opened).on("opened.fndtn.reveal", "[" + self.attr_name() + "]", this.open_video).on("close.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.close).on("closed.fndtn.reveal", "[" + self.attr_name() + "]", this.settings.closed).on("closed.fndtn.reveal", "[" + self.attr_name() + "]", this.close_video), 
            !0;
        },
        key_up_on: function() {
            var self = this;
            return self.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal", function(event) {
                var open_modal = self.S("[" + self.attr_name() + "].open"), settings = open_modal.data(self.attr_name(!0) + "-init") || self.settings;
                settings && 27 === event.which && settings.close_on_esc && !self.locked && self.close.call(self, open_modal);
            }), !0;
        },
        key_up_off: function() {
            return this.S("body").off("keyup.fndtn.reveal"), !0;
        },
        open: function(target, ajax_settings) {
            var modal, self = this;
            target ? "undefined" != typeof target.selector ? modal = self.S("#" + target.data(self.data_attr("reveal-id"))).first() : (modal = self.S(this.scope), 
            ajax_settings = target) : modal = self.S(this.scope);
            var settings = modal.data(self.attr_name(!0) + "-init");
            if (settings = settings || this.settings, modal.hasClass("open") && target.attr("data-reveal-id") == modal.attr("id")) return self.close(modal);
            if (!modal.hasClass("open")) {
                var open_modal = self.S("[" + self.attr_name() + "].open");
                if ("undefined" == typeof modal.data("css-top") && modal.data("css-top", parseInt(modal.css("top"), 10)).data("offset", this.cache_offset(modal)), 
                this.key_up_on(modal), modal.trigger("open").trigger("open.fndtn.reveal"), open_modal.length < 1 && this.toggle_bg(modal, !0), 
                "string" == typeof ajax_settings && (ajax_settings = {
                    url: ajax_settings
                }), "undefined" != typeof ajax_settings && ajax_settings.url) {
                    var old_success = "undefined" != typeof ajax_settings.success ? ajax_settings.success : null;
                    $.extend(ajax_settings, {
                        success: function(data, textStatus, jqXHR) {
                            $.isFunction(old_success) && old_success(data, textStatus, jqXHR), modal.html(data), 
                            self.S(modal).foundation("section", "reflow"), self.S(modal).children().foundation(), 
                            open_modal.length > 0 && self.hide(open_modal, settings.css.close), self.show(modal, settings.css.open);
                        }
                    }), $.ajax(ajax_settings);
                } else open_modal.length > 0 && this.hide(open_modal, settings.css.close), this.show(modal, settings.css.open);
            }
            self.S(window).trigger("resize");
        },
        close: function(modal) {
            var modal = modal && modal.length ? modal : this.S(this.scope), open_modals = this.S("[" + this.attr_name() + "].open"), settings = modal.data(this.attr_name(!0) + "-init") || this.settings;
            open_modals.length > 0 && (this.locked = !0, this.key_up_off(modal), modal.trigger("close").trigger("close.fndtn.reveal"), 
            this.toggle_bg(modal, !1), this.hide(open_modals, settings.css.close, settings));
        },
        close_targets: function() {
            var base = "." + this.settings.dismiss_modal_class;
            return this.settings.close_on_background_click ? base + ", ." + this.settings.bg_class : base;
        },
        toggle_bg: function(modal, state) {
            0 === this.S("." + this.settings.bg_class).length && (this.settings.bg = $("<div />", {
                "class": this.settings.bg_class
            }).appendTo("body").hide());
            var visible = this.settings.bg.filter(":visible").length > 0;
            state != visible && ((state == undefined ? visible : !state) ? this.hide(this.settings.bg) : this.show(this.settings.bg));
        },
        show: function(el, css) {
            if (css) {
                var settings = el.data(this.attr_name(!0) + "-init") || this.settings, root_element = settings.root_element;
                if (0 === el.parent(root_element).length) {
                    var placeholder = el.wrap('<div style="display: none;" />').parent();
                    el.on("closed.fndtn.reveal.wrapped", function() {
                        el.detach().appendTo(placeholder), el.unwrap().unbind("closed.fndtn.reveal.wrapped");
                    }), el.detach().appendTo(root_element);
                }
                var animData = getAnimationData(settings.animation);
                if (animData.animate || (this.locked = !1), animData.pop) {
                    css.top = $(window).scrollTop() - el.data("offset") + "px";
                    var end_css = {
                        top: $(window).scrollTop() + el.data("css-top") + "px",
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return el.css(css).animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = !1, el.trigger("opened").trigger("opened.fndtn.reveal");
                        }.bind(this)).addClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                if (animData.fade) {
                    css.top = $(window).scrollTop() + el.data("css-top") + "px";
                    var end_css = {
                        opacity: 1
                    };
                    return setTimeout(function() {
                        return el.css(css).animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = !1, el.trigger("opened").trigger("opened.fndtn.reveal");
                        }.bind(this)).addClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                return el.css(css).show().css({
                    opacity: 1
                }).addClass("open").trigger("opened").trigger("opened.fndtn.reveal");
            }
            var settings = this.settings;
            return getAnimationData(settings.animation).fade ? el.fadeIn(settings.animation_speed / 2) : (this.locked = !1, 
            el.show());
        },
        hide: function(el, css) {
            if (css) {
                var settings = el.data(this.attr_name(!0) + "-init");
                settings = settings || this.settings;
                var animData = getAnimationData(settings.animation);
                if (animData.animate || (this.locked = !1), animData.pop) {
                    var end_css = {
                        top: -$(window).scrollTop() - el.data("offset") + "px",
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return el.animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = !1, el.css(css).trigger("closed").trigger("closed.fndtn.reveal");
                        }.bind(this)).removeClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                if (animData.fade) {
                    var end_css = {
                        opacity: 0
                    };
                    return setTimeout(function() {
                        return el.animate(end_css, settings.animation_speed, "linear", function() {
                            this.locked = !1, el.css(css).trigger("closed").trigger("closed.fndtn.reveal");
                        }.bind(this)).removeClass("open");
                    }.bind(this), settings.animation_speed / 2);
                }
                return el.hide().css(css).removeClass("open").trigger("closed").trigger("closed.fndtn.reveal");
            }
            var settings = this.settings;
            return getAnimationData(settings.animation).fade ? el.fadeOut(settings.animation_speed / 2) : el.hide();
        },
        close_video: function(e) {
            var video = $(".flex-video", e.target), iframe = $("iframe", video);
            iframe.length > 0 && (iframe.attr("data-src", iframe[0].src), iframe.attr("src", iframe.attr("src")), 
            video.hide());
        },
        open_video: function(e) {
            var video = $(".flex-video", e.target), iframe = video.find("iframe");
            if (iframe.length > 0) {
                var data_src = iframe.attr("data-src");
                if ("string" == typeof data_src) iframe[0].src = iframe.attr("data-src"); else {
                    var src = iframe[0].src;
                    iframe[0].src = undefined, iframe[0].src = src;
                }
                video.show();
            }
        },
        data_attr: function(str) {
            return this.namespace.length > 0 ? this.namespace + "-" + str : str;
        },
        cache_offset: function(modal) {
            var offset = modal.show().height() + parseInt(modal.css("top"), 10);
            return modal.hide(), offset;
        },
        off: function() {
            $(this.scope).off(".fndtn.reveal");
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function($, window) {
    "use strict";
    Foundation.libs.slider = {
        name: "slider",
        version: "{{VERSION}}",
        settings: {
            start: 0,
            end: 100,
            step: 1,
            initial: null,
            display_selector: "",
            vertical: !1,
            on_change: function() {}
        },
        cache: {},
        init: function(scope, method, options) {
            Foundation.inherit(this, "throttle"), this.bindings(method, options), this.reflow();
        },
        events: function() {
            var self = this;
            $(this.scope).off(".slider").on("mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider", "[" + self.attr_name() + "]:not(.disabled, [disabled]) .range-slider-handle", function(e) {
                self.cache.active || (e.preventDefault(), self.set_active_slider($(e.target)));
            }).on("mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider", function(e) {
                if (self.cache.active) if (e.preventDefault(), $.data(self.cache.active[0], "settings").vertical) {
                    var scroll_offset = 0;
                    e.pageY || (scroll_offset = window.scrollY), self.calculate_position(self.cache.active, (e.pageY || e.originalEvent.clientY || e.originalEvent.touches[0].clientY || e.currentPoint.y) + scroll_offset);
                } else self.calculate_position(self.cache.active, e.pageX || e.originalEvent.clientX || e.originalEvent.touches[0].clientX || e.currentPoint.x);
            }).on("mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider", function() {
                self.remove_active_slider();
            }).on("change.fndtn.slider", function() {
                self.settings.on_change();
            }), self.S(window).on("resize.fndtn.slider", self.throttle(function() {
                self.reflow();
            }, 300));
        },
        set_active_slider: function($handle) {
            this.cache.active = $handle;
        },
        remove_active_slider: function() {
            this.cache.active = null;
        },
        calculate_position: function($handle, cursor_x) {
            var self = this, settings = $.data($handle[0], "settings"), bar_l = ($.data($handle[0], "handle_l"), 
            $.data($handle[0], "handle_o"), $.data($handle[0], "bar_l")), bar_o = $.data($handle[0], "bar_o");
            requestAnimationFrame(function() {
                var pct;
                pct = Foundation.rtl && !settings.vertical ? self.limit_to((bar_o + bar_l - cursor_x) / bar_l, 0, 1) : self.limit_to((cursor_x - bar_o) / bar_l, 0, 1), 
                pct = settings.vertical ? 1 - pct : pct;
                var norm = self.normalized_value(pct, settings.start, settings.end, settings.step);
                self.set_ui($handle, norm);
            });
        },
        set_ui: function($handle, value) {
            var settings = $.data($handle[0], "settings"), handle_l = $.data($handle[0], "handle_l"), bar_l = $.data($handle[0], "bar_l"), norm_pct = this.normalized_percentage(value, settings.start, settings.end), handle_offset = norm_pct * (bar_l - handle_l) - 1, progress_bar_length = 100 * norm_pct;
            Foundation.rtl && !settings.vertical && (handle_offset = -handle_offset), handle_offset = settings.vertical ? -handle_offset + bar_l - handle_l + 1 : handle_offset, 
            this.set_translate($handle, handle_offset, settings.vertical), settings.vertical ? $handle.siblings(".range-slider-active-segment").css("height", progress_bar_length + "%") : $handle.siblings(".range-slider-active-segment").css("width", progress_bar_length + "%"), 
            $handle.parent().attr(this.attr_name(), value).trigger("change").trigger("change.fndtn.slider"), 
            $handle.parent().children("input[type=hidden]").val(value), $handle[0].hasAttribute("aria-valuemin") || $handle.attr({
                "aria-valuemin": settings.start,
                "aria-valuemax": settings.end
            }), $handle.attr("aria-valuenow", value);
        },
        normalized_percentage: function(val, start, end) {
            return Math.min(1, (val - start) / (end - start));
        },
        normalized_value: function(val, start, end, step) {
            var range = end - start, point = val * range, mod = (point - point % step) / step, rem = point % step, round = rem >= .5 * step ? step : 0;
            return mod * step + round + start;
        },
        set_translate: function(ele, offset, vertical) {
            vertical ? $(ele).css("-webkit-transform", "translateY(" + offset + "px)").css("-moz-transform", "translateY(" + offset + "px)").css("-ms-transform", "translateY(" + offset + "px)").css("-o-transform", "translateY(" + offset + "px)").css("transform", "translateY(" + offset + "px)") : $(ele).css("-webkit-transform", "translateX(" + offset + "px)").css("-moz-transform", "translateX(" + offset + "px)").css("-ms-transform", "translateX(" + offset + "px)").css("-o-transform", "translateX(" + offset + "px)").css("transform", "translateX(" + offset + "px)");
        },
        limit_to: function(val, min, max) {
            return Math.min(Math.max(val, min), max);
        },
        initialize_settings: function(handle) {
            var settings = $.extend({}, this.settings, this.data_options($(handle).parent()));
            settings.vertical ? ($.data(handle, "bar_o", $(handle).parent().offset().top), $.data(handle, "bar_l", $(handle).parent().outerHeight()), 
            $.data(handle, "handle_o", $(handle).offset().top), $.data(handle, "handle_l", $(handle).outerHeight())) : ($.data(handle, "bar_o", $(handle).parent().offset().left), 
            $.data(handle, "bar_l", $(handle).parent().outerWidth()), $.data(handle, "handle_o", $(handle).offset().left), 
            $.data(handle, "handle_l", $(handle).outerWidth())), $.data(handle, "bar", $(handle).parent()), 
            $.data(handle, "settings", settings);
        },
        set_initial_position: function($ele) {
            var settings = $.data($ele.children(".range-slider-handle")[0], "settings"), initial = settings.initial ? settings.initial : Math.floor(.5 * (settings.end - settings.start) / settings.step) * settings.step + settings.start, $handle = $ele.children(".range-slider-handle");
            this.set_ui($handle, initial);
        },
        set_value: function(value) {
            var self = this;
            $("[" + self.attr_name() + "]", this.scope).each(function() {
                $(this).attr(self.attr_name(), value);
            }), $(this.scope).attr(self.attr_name()) && $(this.scope).attr(self.attr_name(), value), 
            self.reflow();
        },
        reflow: function() {
            var self = this;
            self.S("[" + this.attr_name() + "]").each(function() {
                var handle = $(this).children(".range-slider-handle")[0], val = $(this).attr(self.attr_name());
                self.initialize_settings(handle), val ? self.set_ui($(handle), parseFloat(val)) : self.set_initial_position($(this));
            });
        }
    };
}(jQuery, window, window.document), function($, window, document, undefined) {
    "use strict";
    Foundation.libs.tab = {
        name: "tab",
        version: "{{VERSION}}",
        settings: {
            active_class: "active",
            callback: function() {},
            deep_linking: !1,
            scroll_to_content: !0,
            is_hover: !1
        },
        default_tab_hashes: [],
        init: function(scope, method, options) {
            var self = this, S = this.S;
            this.bindings(method, options), this.handle_location_hash_change(), S("[" + this.attr_name() + "] > .active > a", this.scope).each(function() {
                self.default_tab_hashes.push(this.hash);
            });
        },
        events: function() {
            var self = this, S = this.S, usual_tab_behavior = function(e) {
                var settings = S(this).closest("[" + self.attr_name() + "]").data(self.attr_name(!0) + "-init");
                (!settings.is_hover || Modernizr.touch) && (e.preventDefault(), e.stopPropagation(), 
                self.toggle_active_tab(S(this).parent()));
            };
            S(this.scope).off(".tab").on("focus.fndtn.tab", "[" + this.attr_name() + "] > * > a", usual_tab_behavior).on("click.fndtn.tab", "[" + this.attr_name() + "] > * > a", usual_tab_behavior).on("mouseenter.fndtn.tab", "[" + this.attr_name() + "] > * > a", function() {
                var settings = S(this).closest("[" + self.attr_name() + "]").data(self.attr_name(!0) + "-init");
                settings.is_hover && self.toggle_active_tab(S(this).parent());
            }), S(window).on("hashchange.fndtn.tab", function(e) {
                e.preventDefault(), self.handle_location_hash_change();
            }).on("keyup", function(e) {
                9 == e.keyword && console.log(document.querySelector("[data-tab] .tab-title :focus"));
            });
        },
        handle_location_hash_change: function() {
            var self = this, S = this.S;
            S("[" + this.attr_name() + "]", this.scope).each(function() {
                var settings = S(this).data(self.attr_name(!0) + "-init");
                if (settings.deep_linking) {
                    var hash;
                    if (hash = settings.scroll_to_content ? self.scope.location.hash : self.scope.location.hash.replace("fndtn-", ""), 
                    "" != hash) {
                        var hash_element = S(hash);
                        if (hash_element.hasClass("content") && hash_element.parent().hasClass("tab-content")) self.toggle_active_tab($("[" + self.attr_name() + "] > * > a[href=" + hash + "]").parent()); else {
                            var hash_tab_container_id = hash_element.closest(".content").attr("id");
                            hash_tab_container_id != undefined && self.toggle_active_tab($("[" + self.attr_name() + "] > * > a[href=#" + hash_tab_container_id + "]").parent(), hash);
                        }
                    } else for (var ind in self.default_tab_hashes) self.toggle_active_tab($("[" + self.attr_name() + "] > * > a[href=" + self.default_tab_hashes[ind] + "]").parent());
                }
            });
        },
        toggle_active_tab: function(tab, location_hash) {
            var S = this.S, tabs = tab.closest("[" + this.attr_name() + "]"), tab_link = tab.find("a"), anchor = tab.children("a").first(), target_hash = "#" + anchor.attr("href").split("#")[1], target = S(target_hash), siblings = tab.siblings(), settings = tabs.data(this.attr_name(!0) + "-init"), interpret_keyup_action = function(e) {
                var $target, $original = $(this), $prev = $(this).parents("li").prev().children('[role="tab"]'), $next = $(this).parents("li").next().children('[role="tab"]');
                switch (e.keyCode) {
                  case 37:
                    $target = $prev;
                    break;

                  case 39:
                    $target = $next;
                    break;

                  default:
                    $target = !1;
                }
                $target.length && ($original.attr({
                    tabindex: "-1",
                    "aria-selected": null
                }), $target.attr({
                    tabindex: "0",
                    "aria-selected": !0
                }).focus()), $('[role="tabpanel"]').attr("aria-hidden", "true"), $("#" + $(document.activeElement).attr("href").substring(1)).attr("aria-hidden", null);
            };
            S(this).data(this.data_attr("tab-content")) && (target_hash = "#" + S(this).data(this.data_attr("tab-content")).split("#")[1], 
            target = S(target_hash)), settings.deep_linking && (settings.scroll_to_content ? (window.location.hash = location_hash || target_hash, 
            location_hash == undefined || location_hash == target_hash ? tab.parent()[0].scrollIntoView() : S(target_hash)[0].scrollIntoView()) : window.location.hash = location_hash != undefined ? "fndtn-" + location_hash.replace("#", "") : "fndtn-" + target_hash.replace("#", "")), 
            tab.addClass(settings.active_class).triggerHandler("opened"), tab_link.attr({
                "aria-selected": "true",
                tabindex: 0
            }), siblings.removeClass(settings.active_class), siblings.find("a").attr({
                "aria-selected": "false",
                tabindex: -1
            }), target.siblings().removeClass(settings.active_class).attr({
                "aria-hidden": "true",
                tabindex: -1
            }).end().addClass(settings.active_class).attr("aria-hidden", "false").find(":first-child").attr("tabindex", 0), 
            settings.callback(tab), target.children().attr("tab-index", 0), target.triggerHandler("toggled", [ tab ]), 
            tabs.triggerHandler("toggled", [ target ]), tab_link.on("keydown", interpret_keyup_action);
        },
        data_attr: function(str) {
            return this.namespace.length > 0 ? this.namespace + "-" + str : str;
        },
        off: function() {},
        reflow: function() {}
    };
}(jQuery, window, window.document), function($, window) {
    "use strict";
    Foundation.libs.tooltip = {
        name: "tooltip",
        version: "{{VERSION}}",
        settings: {
            additional_inheritable_classes: [],
            tooltip_class: ".tooltip",
            append_to: "body",
            touch_close_text: "Tap To Close",
            disable_for_touch: !1,
            hover_delay: 200,
            show_on: "all",
            tip_template: function(selector, content) {
                return '<span data-selector="' + selector + '" id="' + selector + '" class="' + Foundation.libs.tooltip.settings.tooltip_class.substring(1) + '" role="tooltip">' + content + '<span class="nub"></span></span>';
            }
        },
        cache: {},
        init: function(scope, method, options) {
            Foundation.inherit(this, "random_str"), this.bindings(method, options);
        },
        should_show: function(target) {
            var settings = $.extend({}, this.settings, this.data_options(target));
            return "all" === settings.show_on ? !0 : this.small() && "small" === settings.show_on ? !0 : this.medium() && "medium" === settings.show_on ? !0 : this.large() && "large" === settings.show_on ? !0 : !1;
        },
        medium: function() {
            return matchMedia(Foundation.media_queries.medium).matches;
        },
        large: function() {
            return matchMedia(Foundation.media_queries.large).matches;
        },
        events: function(instance) {
            var self = this, S = self.S;
            self.create(this.S(instance)), $(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "]", function(e) {
                var $this = S(this), settings = $.extend({}, self.settings, self.data_options($this)), is_touch = !1;
                if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && S(e.target).is("a")) return !1;
                if (/mouse/i.test(e.type) && self.ie_touch(e)) return !1;
                if ($this.hasClass("open")) Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && e.preventDefault(), 
                self.hide($this); else {
                    if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) return;
                    !settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type) && (e.preventDefault(), 
                    S(settings.tooltip_class + ".open").hide(), is_touch = !0), /enter|over/i.test(e.type) ? this.timer = setTimeout(function() {
                        self.showTip($this);
                    }.bind(this), self.settings.hover_delay) : "mouseout" === e.type || "mouseleave" === e.type ? (clearTimeout(this.timer), 
                    self.hide($this)) : self.showTip($this);
                }
            }).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", "[" + this.attr_name() + "].open", function(e) {
                return /mouse/i.test(e.type) && self.ie_touch(e) ? !1 : void (("touch" != $(this).data("tooltip-open-event-type") || "mouseleave" != e.type) && ("mouse" == $(this).data("tooltip-open-event-type") && /MSPointerDown|touchstart/i.test(e.type) ? self.convert_to_touch($(this)) : self.hide($(this))));
            }).on("DOMNodeRemoved DOMAttrModified", "[" + this.attr_name() + "]:not(a)", function() {
                self.hide(S(this));
            });
        },
        ie_touch: function() {
            return !1;
        },
        showTip: function($target) {
            var $tip = this.getTip($target);
            return this.should_show($target, $tip) ? this.show($target) : void 0;
        },
        getTip: function($target) {
            var selector = this.selector($target), settings = $.extend({}, this.settings, this.data_options($target)), tip = null;
            return selector && (tip = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class)), 
            "object" == typeof tip ? tip : !1;
        },
        selector: function($target) {
            var id = $target.attr("id"), dataSelector = $target.attr(this.attr_name()) || $target.attr("data-selector");
            return (id && id.length < 1 || !id) && "string" != typeof dataSelector && (dataSelector = this.random_str(6), 
            $target.attr("data-selector", dataSelector).attr("aria-describedby", dataSelector)), 
            id && id.length > 0 ? id : dataSelector;
        },
        create: function($target) {
            var self = this, settings = $.extend({}, this.settings, this.data_options($target)), tip_template = this.settings.tip_template;
            "string" == typeof settings.tip_template && window.hasOwnProperty(settings.tip_template) && (tip_template = window[settings.tip_template]);
            var $tip = $(tip_template(this.selector($target), $("<div></div>").html($target.attr("title")).html())), classes = this.inheritable_classes($target);
            $tip.addClass(classes).appendTo(settings.append_to), Modernizr.touch && ($tip.append('<span class="tap-to-close">' + settings.touch_close_text + "</span>"), 
            $tip.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip", function() {
                self.hide($target);
            })), $target.removeAttr("title").attr("title", "");
        },
        reposition: function(target, tip, classes) {
            var width, nub, nubHeight, nubWidth, objPos;
            if (tip.css("visibility", "hidden").show(), width = target.data("width"), nub = tip.children(".nub"), 
            nubHeight = nub.outerHeight(), nubWidth = nub.outerHeight(), tip.css(this.small() ? {
                width: "100%"
            } : {
                width: width ? width : "auto"
            }), objPos = function(obj, top, right, bottom, left) {
                return obj.css({
                    top: top ? top : "auto",
                    bottom: bottom ? bottom : "auto",
                    left: left ? left : "auto",
                    right: right ? right : "auto"
                }).end();
            }, objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", target.offset().left), 
            this.small()) objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", 12.5, $(this.scope).width()), 
            tip.addClass("tip-override"), objPos(nub, -nubHeight, "auto", "auto", target.offset().left); else {
                var left = target.offset().left;
                Foundation.rtl && (nub.addClass("rtl"), left = target.offset().left + target.outerWidth() - tip.outerWidth()), 
                objPos(tip, target.offset().top + target.outerHeight() + 10, "auto", "auto", left), 
                tip.removeClass("tip-override"), classes && classes.indexOf("tip-top") > -1 ? (Foundation.rtl && nub.addClass("rtl"), 
                objPos(tip, target.offset().top - tip.outerHeight(), "auto", "auto", left).removeClass("tip-override")) : classes && classes.indexOf("tip-left") > -1 ? (objPos(tip, target.offset().top + target.outerHeight() / 2 - tip.outerHeight() / 2, "auto", "auto", target.offset().left - tip.outerWidth() - nubHeight).removeClass("tip-override"), 
                nub.removeClass("rtl")) : classes && classes.indexOf("tip-right") > -1 && (objPos(tip, target.offset().top + target.outerHeight() / 2 - tip.outerHeight() / 2, "auto", "auto", target.offset().left + target.outerWidth() + nubHeight).removeClass("tip-override"), 
                nub.removeClass("rtl"));
            }
            tip.css("visibility", "visible").hide();
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches;
        },
        inheritable_classes: function($target) {
            var settings = $.extend({}, this.settings, this.data_options($target)), inheritables = [ "tip-top", "tip-left", "tip-bottom", "tip-right", "radius", "round" ].concat(settings.additional_inheritable_classes), classes = $target.attr("class"), filtered = classes ? $.map(classes.split(" "), function(el) {
                return -1 !== $.inArray(el, inheritables) ? el : void 0;
            }).join(" ") : "";
            return $.trim(filtered);
        },
        convert_to_touch: function($target) {
            var self = this, $tip = self.getTip($target), settings = $.extend({}, self.settings, self.data_options($target));
            0 === $tip.find(".tap-to-close").length && ($tip.append('<span class="tap-to-close">' + settings.touch_close_text + "</span>"), 
            $tip.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose", function() {
                self.hide($target);
            })), $target.data("tooltip-open-event-type", "touch");
        },
        show: function($target) {
            var $tip = this.getTip($target);
            "touch" == $target.data("tooltip-open-event-type") && this.convert_to_touch($target), 
            this.reposition($target, $tip, $target.attr("class")), $target.addClass("open"), 
            $tip.fadeIn(150);
        },
        hide: function($target) {
            var $tip = this.getTip($target);
            $tip.fadeOut(150, function() {
                $tip.find(".tap-to-close").remove(), $tip.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"), 
                $target.removeClass("open");
            });
        },
        off: function() {
            var self = this;
            this.S(this.scope).off(".fndtn.tooltip"), this.S(this.settings.tooltip_class).each(function(i) {
                $("[" + self.attr_name() + "]").eq(i).attr("title", $(this).text());
            }).remove();
        },
        reflow: function() {}
    };
}(jQuery, window, window.document), function($, window, document) {
    "use strict";
    Foundation.libs.topbar = {
        name: "topbar",
        version: "{{VERSION}}",
        settings: {
            index: 0,
            sticky_class: "sticky",
            custom_back_text: !0,
            back_text: "Back",
            mobile_show_parent_link: !0,
            is_hover: !0,
            scrolltop: !0,
            sticky_on: "all"
        },
        init: function(section, method, options) {
            Foundation.inherit(this, "add_custom_rule register_media throttle");
            var self = this;
            self.register_media("topbar", "foundation-mq-topbar"), this.bindings(method, options), 
            self.S("[" + this.attr_name() + "]", this.scope).each(function() {
                {
                    var topbar = $(this), settings = topbar.data(self.attr_name(!0) + "-init");
                    self.S("section, .top-bar-section", this);
                }
                topbar.data("index", 0);
                var topbarContainer = topbar.parent();
                topbarContainer.hasClass("fixed") || self.is_sticky(topbar, topbarContainer, settings) ? (self.settings.sticky_class = settings.sticky_class, 
                self.settings.sticky_topbar = topbar, topbar.data("height", topbarContainer.outerHeight()), 
                topbar.data("stickyoffset", topbarContainer.offset().top)) : topbar.data("height", topbar.outerHeight()), 
                settings.assembled || self.assemble(topbar), settings.is_hover ? self.S(".has-dropdown", topbar).addClass("not-click") : self.S(".has-dropdown", topbar).removeClass("not-click"), 
                self.add_custom_rule(".f-topbar-fixed { padding-top: " + topbar.data("height") + "px }"), 
                topbarContainer.hasClass("fixed") && self.S("body").addClass("f-topbar-fixed");
            });
        },
        is_sticky: function(topbar, topbarContainer, settings) {
            var sticky = topbarContainer.hasClass(settings.sticky_class);
            return sticky && "all" === settings.sticky_on ? !0 : sticky && this.small() && "small" === settings.sticky_on ? matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches && !matchMedia(Foundation.media_queries.large).matches : sticky && this.medium() && "medium" === settings.sticky_on ? matchMedia(Foundation.media_queries.small).matches && matchMedia(Foundation.media_queries.medium).matches && !matchMedia(Foundation.media_queries.large).matches : sticky && this.large() && "large" === settings.sticky_on ? matchMedia(Foundation.media_queries.small).matches && matchMedia(Foundation.media_queries.medium).matches && matchMedia(Foundation.media_queries.large).matches : !1;
        },
        toggle: function(toggleEl) {
            var topbar, self = this;
            topbar = toggleEl ? self.S(toggleEl).closest("[" + this.attr_name() + "]") : self.S("[" + this.attr_name() + "]");
            var settings = topbar.data(this.attr_name(!0) + "-init"), section = self.S("section, .top-bar-section", topbar);
            self.breakpoint() && (self.rtl ? (section.css({
                right: "0%"
            }), $(">.name", section).css({
                right: "100%"
            })) : (section.css({
                left: "0%"
            }), $(">.name", section).css({
                left: "100%"
            })), self.S("li.moved", section).removeClass("moved"), topbar.data("index", 0), 
            topbar.toggleClass("expanded").css("height", "")), settings.scrolltop ? topbar.hasClass("expanded") ? topbar.parent().hasClass("fixed") && (settings.scrolltop ? (topbar.parent().removeClass("fixed"), 
            topbar.addClass("fixed"), self.S("body").removeClass("f-topbar-fixed"), window.scrollTo(0, 0)) : topbar.parent().removeClass("expanded")) : topbar.hasClass("fixed") && (topbar.parent().addClass("fixed"), 
            topbar.removeClass("fixed"), self.S("body").addClass("f-topbar-fixed")) : (self.is_sticky(topbar, topbar.parent(), settings) && topbar.parent().addClass("fixed"), 
            topbar.parent().hasClass("fixed") && (topbar.hasClass("expanded") ? (topbar.addClass("fixed"), 
            topbar.parent().addClass("expanded"), self.S("body").addClass("f-topbar-fixed")) : (topbar.removeClass("fixed"), 
            topbar.parent().removeClass("expanded"), self.update_sticky_positioning())));
        },
        timer: null,
        events: function() {
            var self = this, S = this.S;
            S(this.scope).off(".topbar").on("click.fndtn.topbar", "[" + this.attr_name() + "] .toggle-topbar", function(e) {
                e.preventDefault(), self.toggle(this);
            }).on("click.fndtn.topbar", '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function() {
                var li = $(this).closest("li");
                !self.breakpoint() || li.hasClass("back") || li.hasClass("has-dropdown") || self.toggle();
            }).on("click.fndtn.topbar", "[" + this.attr_name() + "] li.has-dropdown", function(e) {
                var li = S(this), target = S(e.target), topbar = li.closest("[" + self.attr_name() + "]"), settings = topbar.data(self.attr_name(!0) + "-init");
                return target.data("revealId") ? void self.toggle() : void (self.breakpoint() || (!settings.is_hover || Modernizr.touch) && (e.stopImmediatePropagation(), 
                li.hasClass("hover") ? (li.removeClass("hover").find("li").removeClass("hover"), 
                li.parents("li.hover").removeClass("hover")) : (li.addClass("hover"), $(li).siblings().removeClass("hover"), 
                "A" === target[0].nodeName && target.parent().hasClass("has-dropdown") && e.preventDefault())));
            }).on("click.fndtn.topbar", "[" + this.attr_name() + "] .has-dropdown>a", function(e) {
                if (self.breakpoint()) {
                    e.preventDefault();
                    var $this = S(this), topbar = $this.closest("[" + self.attr_name() + "]"), section = topbar.find("section, .top-bar-section"), $selectedLi = ($this.next(".dropdown").outerHeight(), 
                    $this.closest("li"));
                    topbar.data("index", topbar.data("index") + 1), $selectedLi.addClass("moved"), self.rtl ? (section.css({
                        right: -(100 * topbar.data("index")) + "%"
                    }), section.find(">.name").css({
                        right: 100 * topbar.data("index") + "%"
                    })) : (section.css({
                        left: -(100 * topbar.data("index")) + "%"
                    }), section.find(">.name").css({
                        left: 100 * topbar.data("index") + "%"
                    })), topbar.css("height", $this.siblings("ul").outerHeight(!0) + topbar.data("height"));
                }
            }), S(window).off(".topbar").on("resize.fndtn.topbar", self.throttle(function() {
                self.resize.call(self);
            }, 50)).trigger("resize").trigger("resize.fndtn.topbar").load(function() {
                S(this).trigger("resize.fndtn.topbar");
            }), S("body").off(".topbar").on("click.fndtn.topbar", function(e) {
                var parent = S(e.target).closest("li").closest("li.hover");
                parent.length > 0 || S("[" + self.attr_name() + "] li.hover").removeClass("hover");
            }), S(this.scope).on("click.fndtn.topbar", "[" + this.attr_name() + "] .has-dropdown .back", function(e) {
                e.preventDefault();
                var $this = S(this), topbar = $this.closest("[" + self.attr_name() + "]"), section = topbar.find("section, .top-bar-section"), $movedLi = (topbar.data(self.attr_name(!0) + "-init"), 
                $this.closest("li.moved")), $previousLevelUl = $movedLi.parent();
                topbar.data("index", topbar.data("index") - 1), self.rtl ? (section.css({
                    right: -(100 * topbar.data("index")) + "%"
                }), section.find(">.name").css({
                    right: 100 * topbar.data("index") + "%"
                })) : (section.css({
                    left: -(100 * topbar.data("index")) + "%"
                }), section.find(">.name").css({
                    left: 100 * topbar.data("index") + "%"
                })), 0 === topbar.data("index") ? topbar.css("height", "") : topbar.css("height", $previousLevelUl.outerHeight(!0) + topbar.data("height")), 
                setTimeout(function() {
                    $movedLi.removeClass("moved");
                }, 300);
            }), S(this.scope).find(".dropdown a").focus(function() {
                $(this).parents(".has-dropdown").addClass("hover");
            }).blur(function() {
                $(this).parents(".has-dropdown").removeClass("hover");
            });
        },
        resize: function() {
            var self = this;
            self.S("[" + this.attr_name() + "]").each(function() {
                var stickyOffset, topbar = self.S(this), settings = topbar.data(self.attr_name(!0) + "-init"), stickyContainer = topbar.parent("." + self.settings.sticky_class);
                if (!self.breakpoint()) {
                    var doToggle = topbar.hasClass("expanded");
                    topbar.css("height", "").removeClass("expanded").find("li").removeClass("hover"), 
                    doToggle && self.toggle(topbar);
                }
                self.is_sticky(topbar, stickyContainer, settings) && (stickyContainer.hasClass("fixed") ? (stickyContainer.removeClass("fixed"), 
                stickyOffset = stickyContainer.offset().top, self.S(document.body).hasClass("f-topbar-fixed") && (stickyOffset -= topbar.data("height")), 
                topbar.data("stickyoffset", stickyOffset), stickyContainer.addClass("fixed")) : (stickyOffset = stickyContainer.offset().top, 
                topbar.data("stickyoffset", stickyOffset)));
            });
        },
        breakpoint: function() {
            return !matchMedia(Foundation.media_queries.topbar).matches;
        },
        small: function() {
            return matchMedia(Foundation.media_queries.small).matches;
        },
        medium: function() {
            return matchMedia(Foundation.media_queries.medium).matches;
        },
        large: function() {
            return matchMedia(Foundation.media_queries.large).matches;
        },
        assemble: function(topbar) {
            var self = this, settings = topbar.data(this.attr_name(!0) + "-init"), section = self.S("section, .top-bar-section", topbar);
            section.detach(), self.S(".has-dropdown>a", section).each(function() {
                var $titleLi, $link = self.S(this), $dropdown = $link.siblings(".dropdown"), url = $link.attr("href");
                $dropdown.find(".title.back").length || ($titleLi = $(1 == settings.mobile_show_parent_link && url ? '<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link show-for-small"><a class="parent-link js-generated" href="' + url + '">' + $link.html() + "</a></li>" : '<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>'), 
                $("h5>a", $titleLi).html(1 == settings.custom_back_text ? settings.back_text : "&laquo; " + $link.html()), 
                $dropdown.prepend($titleLi));
            }), section.appendTo(topbar), this.sticky(), this.assembled(topbar);
        },
        assembled: function(topbar) {
            topbar.data(this.attr_name(!0), $.extend({}, topbar.data(this.attr_name(!0)), {
                assembled: !0
            }));
        },
        height: function(ul) {
            var total = 0, self = this;
            return $("> li", ul).each(function() {
                total += self.S(this).outerHeight(!0);
            }), total;
        },
        sticky: function() {
            var self = this;
            this.S(window).on("scroll", function() {
                self.update_sticky_positioning();
            });
        },
        update_sticky_positioning: function() {
            var klass = "." + this.settings.sticky_class, $window = this.S(window), self = this;
            if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar, this.settings.sticky_topbar.parent(), this.settings)) {
                var distance = this.settings.sticky_topbar.data("stickyoffset");
                self.S(klass).hasClass("expanded") || ($window.scrollTop() > distance ? self.S(klass).hasClass("fixed") || (self.S(klass).addClass("fixed"), 
                self.S("body").addClass("f-topbar-fixed")) : $window.scrollTop() <= distance && self.S(klass).hasClass("fixed") && (self.S(klass).removeClass("fixed"), 
                self.S("body").removeClass("f-topbar-fixed")));
            }
        },
        off: function() {
            this.S(this.scope).off(".fndtn.topbar"), this.S(window).off(".fndtn.topbar");
        },
        reflow: function() {}
    };
}(jQuery, window, window.document);