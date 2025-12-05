'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var justright_core_v1 = require('justright_core_v1');
var coreutil_v1 = require('coreutil_v1');
var mindi_v1 = require('mindi_v1');
var containerbridge_v1 = require('containerbridge_v1');

/**
 * @description Font color, background color, and border color palettes for various modes.
 */
class ColorPalette {

    static PRIMARY_COLORS =          ["#fff","#007bff","#007bff"];
    static PRIMARY_HOVER_COLORS =    ["#fff","#0069d9","#0062cc"];
    static PRIMARY_DISABLED_COLORS = ["#fff","#5eabfd","#5eabfd"];
    static PRIMARY_ACTIVE_COLORS =   ["#fff","#0062cc","#005cbf"];

    static SECONDARY_COLORS =          ["#fff","#6c757d","#6c757d"];
    static SECONDARY_HOVER_COLORS =    ["#fff","#5a6268","#545b62"];
    static SECONDARY_DISABLED_COLORS = ["#fff","#6c757d","#6c757d"];
    static SECONDARY_ACTIVE_COLORS =   ["#fff","#545b62","#4e555b"];

    static SUCCESS_COLORS =          ["#fff","#28a745","#28a745"];
    static SUCCESS_HOVER_COLORS =    ["#fff","#218838","#1e7e34"];
    static SUCCESS_DISABLED_COLORS = ["#fff","#28a745","#28a745"];
    static SUCCESS_ACTIVE_COLORS =   ["#fff","#1e7e34","#1c7430"];

    static INFO_COLORS =          ["#fff","#17a2b8","#17a2b8"];
    static INFO_HOVER_COLORS =    ["#fff","#138496","#117a8b"];
    static INFO_DISABLED_COLORS = ["#fff","#17a2b8","#17a2b8"];
    static INFO_ACTIVE_COLORS =   ["#fff","#117a8b","#10707f"];

    static WARNING_COLORS =          ["#fff","#ffc107","#ffc107"];
    static WARNING_HOVER_COLORS =    ["#fff","#e0a800","#d39e00"];
    static WARNING_DISABLED_COLORS = ["#fff","#ffc107","#ffc107"];
    static WARNING_ACTIVE_COLORS =   ["#fff","#d39e00","#c69500"];

    static DANGER_COLORS =          ["#fff","#dc3545","#dc3545"];
    static DANGER_HOVER_COLORS =    ["#fff","#c82333","#bd2130"];
    static DANGER_DISABLED_COLORS = ["#fff","#dc3545","#dc3545"];
    static DANGER_ACTIVE_COLORS =   ["#fff","#bd2130","#b21f2d"];

    static LIGHT_COLORS =          ["#212529","#f8f9fa","#f8f9fa"];
    static LIGHT_HOVER_COLORS =    ["#212529","#e2e6ea","#dae0e5"];
    static LIGHT_DISABLED_COLORS = ["#212529","#f8f9fa","#f8f9fa"];
    static LIGHT_ACTIVE_COLORS =   ["#212529","#dae0e5","#d3d9df"];

    static DARK_COLORS =          ["#fff","#343a40","#343a40"];
    static DARK_HOVER_COLORS =    ["#fff","#23272b","#1d2124"];
    static DARK_DISABLED_COLORS = ["#fff","#343a40","#343a40"];
    static DARK_ACTIVE_COLORS =   ["#fff","#1d2124","#171a1d"];
}

class CustomAppearance {

    static SIZE_DEFAUL = "size-default";
    static SIZE_SMALL = "size-small";
    static SIZE_MEDIUM = "size-medium";
    static SIZE_LARGE = "size-large";

    static SHAPE_DEAFULT = "shape-default";
    static SHAPE_ROUND = "shape-round";
    static SHAPE_SQUARE = "shape-square";

    static VISIBILITY_DEAFULT = "visibility-default";
    static VISIBILITY_VISIBLE = "visibility-visible";
    static VISIBILITY_HIDDEN = "visibility-hidden";

    static SPACING_DEFAULT = "spacing-default";
    static SPACING_NONE = "spacing-none";
    static SPACING_ABOVE = "spacing-above";
    static SPACING_BELOW = "spacing-below";
    static SPACING_ABOVE_BELOW = "spacing-above-below";

    constructor() {
        this.size = CustomAppearance.SIZE_DEFAULT;
        this.shape = CustomAppearance.SHAPE_DEAFULT;
        this.spacing = CustomAppearance.SPACING_DEFAULT;
        this.visibility = CustomAppearance.VISIBILITY_DEAFULT;
        this.locked = false;
    }

    withSize(size) {
        this.size = size;
        return this;
    }

    withShape(shape) {
        this.shape = shape;
        return this;
    }

    withSpacing(spacing) {
        this.spacing = spacing;
        return this;
    }

    withVisibility(visibility) {
        this.visibility = visibility;
        return this;
    }

}

class Dependencies {

    constructor() {
        this.componentClass = justright_core_v1.Component;
    }

}

class BackShadeListeners {

    constructor(existingListeners = null) {
        this.backgroundClickedListener = (existingListeners && existingListeners.getBackgroundClicked) ? existingListeners.getBackgroundClicked() : null;
    }

    /**
     * 
     * @param {Method} backgroundClickedListener 
     */
    withBackgroundClicked(backgroundClickedListener) {
        this.backgroundClickedListener = backgroundClickedListener;
        return this;
    }


    getBackgroundClicked() {
        return this.backgroundClickedListener;
    }

    callBackgroundClicked(event) {
        this.callListener(this.backgroundClickedListener, event);
    }

    /**
     * 
     * @param {Method} listener 
     * @param {ContainerEvent} event 
     */
    callListener(listener, event) {
        if (null != listener) {
            listener.call(event);
        }
    }

}

new coreutil_v1.Logger("BackShade");

class BackShade {

    /**
     * @param {BackShadeListeners} backShadeListeners
     */
    constructor(backShadeListeners = new BackShadeListeners()){

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {BaseElement} */
        this.container = null;

        /** @type {BackShadeListeners} */
        this.backShadeListeners = backShadeListeners;

        /** @type {boolean} */
        this.hidden = true;
	}

	/**
	 * 
     * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.selector(".back-shade")
            .open()
                .style("opacity", "0")
                .style("position", "fixed")
                .style("top", "0")
                .style("left", "0")
                .style("z-index", "1040")
                .style("width", "100vw")
                .style("height", "100vh")
                .style("background-color", "#000")
            .close()

            .selector(".back-shade.show")
            .open()
                .style("opacity", "0.5")
            .close()

            .selector(".back-shade.fade")
            .open()
                .style("transition", "opacity 0.3s ease-in-out")
                .style("-moz-transition", "opacity 0.3s ease-in-out")
                .style("-webkit-transition", "opacity 0.3s ease-in-out")
            .close()

			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=backShade", "style=z-index:3;display:none;", "class=back-shade")
			.build();
	}

    postConfig() {
        this.component = this.componentFactory.create(BackShade);
    }

    hideAfter(milliSeconds) {
        if (this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = true;
        this.component.get("backShade").setAttributeValue("class", "back-shade fade");
        const hidePromise = coreutil_v1.TimePromise.asPromise(milliSeconds,
            () => {
                this.component.get("backShade").setStyle("display", "none");
            }
        );
        const disableStylePromise = coreutil_v1.TimePromise.asPromise(milliSeconds + 1,
            () => {
                justright_core_v1.CanvasStyles.disableStyle(BackShade.name, this.component.componentIndex);
            }
        );
        return Promise.all([hidePromise, disableStylePromise]);
    }

    show() {
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        justright_core_v1.CanvasStyles.enableStyle(BackShade.name, this.component.componentIndex);
        this.component.get("backShade").setStyle("display", "block");
        return coreutil_v1.TimePromise.asPromise(100,
            () => { 
                this.component.get("backShade").setAttributeValue("class", "back-shade fade show");
            }
        );
    }
    
}

new coreutil_v1.Logger("Background");

class Background {

    constructor(backgroundImagePath){

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {string} */
		this.backgroundImagePath = backgroundImagePath;
	}

	/**
	 * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.selector(".background")
			.open()
				.style("background-color", "rgb(150, 197, 255)")
				.style("background-repeat", "no-repeat")
				.style("background-position-x", "center")
				.style("background-position-y", "center")
				.style("background-attachment", "scroll")
				.style("background-size", "cover")
				.style("font-family", "Source Sans Pro")
				.style("font-weight", "300")
				.style("height", "100%")
			.close()
			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} uniqueIdRegistry
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=background", "class=background")
			.build();
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(Background);
		if (this.backgroundImagePath) {
            justright_core_v1.StyleAccessor.from(this.component.get("background"))
                .set("background-image", "url(\"" + this.backgroundImagePath + "\")");
		}
		justright_core_v1.CanvasStyles.enableStyle(Background.name);
	}

}

new coreutil_v1.Logger("BackgroundVideo");

class BackgroundVideo {

    constructor(videoSrc){

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

        /** @type {String} */
        this.videoSrc = videoSrc;
	}

	/**
	 * 
     * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.selector(".background-video")
			.open()
				.style("width", "auto")
				.style("height", "auto")
			.close()

			.selector(".background-video-player")
			.open()
				.style("position", "fixed")
				.style("top", "50%")
				.style("left", "50%")
				.style("min-width", "100%")
				.style("min-height", "100%")
				.style("width", "auto")
				.style("height", "auto")
				.style("transform", "translateX(-50%) translateY(-50%)")
				.style("z-index", "0")
			.close()

			.selector(".background-video-overlay")
			.open()
				.style("position", "absolute")
				.style("min-width", "100%")
				.style("min-height", "100%")
				.style("width", "auto")
				.style("height", "auto")
				.style("background-color", "#1144aa")
				.style("opacity", "0.3")
				.style("z-index", "1")
			.close()
				
			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=backgroundVideo", "class=background-video")
			.open()
				.node("div", "class=background-video-overlay")
				.node("video", "id=video", "class=background-video-player",
				        "playsinline=playsinline",
						"autoplay=true",
				        "muted=true", "loop=loop")
				.open()
					.node("source", "id=source", "src=", "type=video/mp4")
				.close()
			.close()
			.build();
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(BackgroundVideo);
		justright_core_v1.CanvasStyles.enableStyle(BackgroundVideo.name);

        this.component.get("source").setAttributeValue("src", this.videoSrc);
	}

	async playMuted() {
		await containerbridge_v1.ContainerAsync.pause(100);
		/** @type {VideoElement} */
		const video = this.component.get("video");
		video.playMuted();
	}

}

class BannerLabelMessage {

    static get EVENT_CLOSE_CLICKED() { return "closeClicked"; }

    static get TYPE_ALERT() { return "type-alert"; }
    static get TYPE_INFO() { return "type-info"; }
    static get TYPE_SUCCESS() { return "type-success"; }
    static get TYPE_WARNING() { return "type-warning"; }

    constructor(message, bannerType = BannerLabelMessage.TYPE_INFO, customAppearance = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.header = null;

        /** @type {String} */
        this.message = message;

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {CustomAppearance} */
        this.customAppearance = customAppearance;

        /** @type {EventManager} */
        this.eventManager = new justright_core_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns 
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".banner-label-message")
            .open()
                .style("color", "white")
                .style("width", "100%")
            .close()

            .selector(".banner-label-message-visible")
            .open()
                .style("opacity", "0.8")
                .style("transition", "opacity .5s .1s")
            .close()

            .selector(".banner-label-message-hidden")
            .open()
                .style("opacity", "0")
                .style("transition", "opacity .5s 0s")
            .close()

            .selector(".banner-label-message-close-button")
            .open()
                .style("margin-left", "15pt")
                .style("color", "white")
                .style("font-weight", "bold")
                .style("float", "right")
                .style("font-size", "22pt")
                .style("line-height", "14pt")
                .style("cursor", "pointer")
                .style("transition", "0.3s")
            .close()

            .selector(".banner-label-message-header")
            .open()
                .style("color", "white")
            .close()

            .selector(".banner-label-message-text")
            .open()
                .style("margin-left", "15px")
            .close()

            .selector(".banner-label-message-type-alert")
            .open()
                .style("background-color", "#f44336")
            .close()

            .selector(".banner-label-message-type-success")
            .open()
                .style("background-color", "#4CAF50")
            .close()

            .selector(".banner-label-message-type-info")
            .open()
                .style("background-color", "#2196F3")
            .close()

            .selector(".banner-label-message-type-warning")
            .open()
                .style("background-color", "#ff9800")
            .close()

            .selector(".banner-label-message-size-large")
            .open()
                .style("padding", "18pt")
            .close()

            .selector(".banner-label-message-size-default")
            .open()
                .style("padding", "12pt")
            .close()

            .selector(".banner-label-message-size-small")
            .open()
                .style("padding-left", "10pt")
                .style("padding-right", "10px")
                .style("padding-bottom", "8px")
                .style("padding-top", "8px")
            .close()

            .selector(".banner-label-message-shape-square")
            .open()
                .style("border-radius", "0px")
            .close()

            .selector(".banner-label-message-shape-round")
            .open()
                .style("border-radius", "3px")
            .close()

            .selector(".banner-label-message-spacing-none")
            .open()
                .style("margin", "0pt")
            .close()

            .selector(".banner-label-message-spacing-above")
            .open()
                .style("margin-top", "1rem")
            .close()

            .selector(".banner-label-message-spacing-below")
            .open()
                .style("margin-bottom", "1rem")
            .close()

            .selector(".banner-label-message-spacing-above-below")
            .open()
                .style("margin-top", "1rem")
                .style("margin-bottom", "1rem")
            .close()

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=bannerLabelMessage", "style=display:none;")
            .open()
                .node("div", "id=bannerLabelMessageContent", "class=banner-label-message banner-label-message-hidden")
                .open()
                    .node("span", "id=bannerLabelMessageCloseButton", "class=banner-label-message-close-button")
                    .open()
                        .text("×")
                    .close()
                    .node("span", "id=bannerLabelMessageHeader", "class=banner-label-message-header")
                    .node("span", "id=bannerLabelMessageText", "class=banner-label-message-text")
                .close()
            .close()
            .build();
    }

    async postConfig() {

        /** @type {Component} */
        this.component = this.componentFactory.create(BannerLabelMessage);
        justright_core_v1.CanvasStyles.enableStyle(BannerLabelMessage.name);
        justright_core_v1.StyleSelectorAccessor.from(this.messageContentElement)
            .enable("banner-label-message")
            .enable("banner-label-message-" + this.bannerType);

        if (this.customAppearance && this.customAppearance.shape) {
            justright_core_v1.StyleSelectorAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.shape);
        }
        if (this.customAppearance && this.customAppearance.size) {
            justright_core_v1.StyleSelectorAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.size);
        }
        if (this.customAppearance && this.customAppearance.spacing) {
            justright_core_v1.StyleSelectorAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.spacing);
        }

        this.component.get("bannerLabelMessageCloseButton").listenTo("click", new coreutil_v1.Method(this, this.closeClicked));
    }

    closeClicked(event) {
        this.eventManager.trigger(BannerLabelMessage.EVENT_CLOSE_CLICKED);
    }

    hide() {
        justright_core_v1.StyleSelectorAccessor.from(this.messageContentElement)
            .disable("banner-label-message-visible")
            .enable("banner-label-message-hidden");

        this.isVisible = false;
        
        coreutil_v1.TimePromise.asPromise(500, () => {
            if (!this.isVisible) {
                justright_core_v1.StyleAccessor.from(this.component.get("bannerLabelMessage"))
                    .set("display", "none");
            }
        });
    }

    show() {
        justright_core_v1.StyleAccessor.from(this.component.get("bannerLabelMessage"))
            .set("display", "block");

        coreutil_v1.TimePromise.asPromise(50, () => {
            if (this.isVisible) {
                justright_core_v1.StyleSelectorAccessor.from(this.messageContentElement)
                    .disable("banner-label-message-hidden")
                    .enable("banner-label-message-visible");
            }
        });
        
        this.isVisible = true;
    }

    get messageContentElement() {
        return this.component.get("bannerLabelMessageContent");
    }

    setMessage(header, message) {
        if (header) {
            this.applyHeader(header);
        }
        if (message) {
            this.applyMessage(message);
        }
    }

    applyHeader(header) {
        this.header = header;
        this.component.get("bannerLabelMessageHeader").setChild(this.header);
    }

    applyMessage(message) {
        this.message = message;
        this.component.get("bannerLabelMessageText").setChild(this.message);
    }

}

class BannerLabel {

    constructor() {
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

		this.appearance = new CustomAppearance()
			.withSize(CustomAppearance.SIZE_SMALL)
			.withShape(CustomAppearance.SHAPE_ROUND)
			.withSpacing(CustomAppearance.SPACING_BELOW);

		/** @type {BannerLabelMessage} */
		this.success = mindi_v1.InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_SUCCESS, this.appearance]);

		/** @type {BannerLabelMessage} */
		this.warning = mindi_v1.InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_WARNING, this.appearance]);

		/** @type {BannerLabelMessage} */
		this.error = mindi_v1.InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_ALERT, this.appearance]);

        this.isVisible = false;
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".banner-label")
            .open()
                .style("color", "white")
                .style("width", "100%")
                .style("overflow", "hidden")
                .style("position", "relative")
            .close()

            .selector(".banner-label-visible")
            .open()
                .style("max-height", "50px")
                .style("visibility", "visible")
                .style("transition", "max-height .3s, visibility 0s")
            .close()

            .selector(".banner-label-hidden")
            .open()
                .style("max-height", "0px")
                .style("visibility", "hidden")
                .style("transition", "max-height .3s .3s, visibility 0s .3s")
            .close()

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=bannerLabel", "class=banner-label banner-label-hidden")
            .build();
    }


    async postConfig() {
        this.component = this.componentFactory.create(BannerLabel);
        justright_core_v1.CanvasStyles.enableStyle(BannerLabel.name);
        this.success.hide();
        this.warning.hide();
        this.error.hide();
        this.component.get("bannerLabel").addChild(this.success.component);
        this.component.get("bannerLabel").addChild(this.warning.component);
        this.component.get("bannerLabel").addChild(this.error.component);
        this.success.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, new coreutil_v1.Method(this, this.hide));
        this.warning.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, new coreutil_v1.Method(this, this.hide));
        this.error.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, new coreutil_v1.Method(this, this.hide));
        this.active = this.success;
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    showSuccess(header, message) {
        this.showBanner(this.success, header, message);
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    showWarning(header, message) {
        this.showBanner(this.warning, header, message);
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    showError(header, message) {
        this.showBanner(this.error, header, message);
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    hide() {
		this.component.get("bannerLabel").setAttributeValue("class", "banner-label banner-label-hidden");
        this.active.hide();
        this.isVisible = false;
    }

    /**
     * 
     * @param {BannerLabelMessage} banner
     * @param {String} header
     * @param {String} message
     */
     showBanner(banner, header, message) {
        this.hide();
		banner.setMessage(header, message);
        banner.show();
        this.component.get("bannerLabel").setAttributeValue("class", "banner-label banner-label-visible");
        this.isVisible = true;
		this.active = banner;
    }
}

class ColorApplicator {

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @param {String} selector 
     * @param {String} fontColor 
     * @param {String} backgroundColor 
     * @param {String} borderColor 
     * @returns 
     */
    static apply(stylesheetBuilder, selector, fontColor, backgroundColor, borderColor) {
        return stylesheetBuilder.selector(selector)
            .open()
                .style("color", fontColor)
                .style("background-color", backgroundColor)
                .style("border-color", borderColor)
            .close();
    }

}

new coreutil_v1.Logger("BannerMessage");

class BannerMessage {

    static TYPE_ALERT = "type-alert";
    static TYPE_INFO = "type-info";
    static TYPE_SUCCESS = "type-success";
    static TYPE_WARNING = "type-warning";

    /**
     * 
     * @param {string} message 
     * @param {string} bannerType 
     * @param {boolean} closeable 
     * @param {CustomAppearance} customAppearance
     */
    constructor(message, bannerType = BannerMessage.TYPE_INFO, closeable = false, customAppearance = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.message = message;

        /** @type {boolean} */
        this.closeable = closeable;

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {Method} */
        this.onHideListener = null;

        /** @type {Method} */
        this.onShowListener = null;

        /** @type {CustomAppearance} */
        this.customAppearance = customAppearance;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".banner-message-size-large")
            .open()
                .style("padding", "18pt")
            .close()

            .selector(".banner-message-size-default, .banner-message-size-medium")
            .open()
                .style("padding", "12pt")
            .close()

            .selector(".banner-message-size-small")
            .open()
                .style("padding-left", "10pt")
                .style("padding-right", "10px")
                .style("padding-bottom", "8px")
                .style("padding-top", "8px")
            .close()

            .selector(".banner-message-shape-default, .banner-message-shape-square")
            .open()
                .style("border-radius", "0px")
            .close()

            .selector(".banner-message-shape-round")
            .open()
                .style("border-radius", "3px")
            .close()

            .selector(".banner-message-spacing-default, .banner-message-spacing-none")
            .open()
                .style("margin", "0pt")
            .close()

            .selector(".banner-message-spacing-above")
            .open()
                .style("margin-top", "1rem")
            .close()

            .selector(".banner-message-spacing-below")
            .open()
                .style("margin-bottom", "1rem")
            .close()

            .selector(".banner-message-spacing-above-below")
            .open()
                .style("margin-top", "1rem")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".banner-message")
            .open()
                .style("color", "white")
                .style("width", "100%")
                .style("transition", "opacity 0.5s")
            .close()

            .selector(".banner-message.hide")
            .open()
                .style("opacity", "0")
            .close()

            .selector(".banner-message.show")
            .open()
                .style("opacity", "0.90")
            .close()

            .selector(".banner-message-type-alert")
            .open()
                .style("background-color", "#f44336")
            .close()

            .selector(".banner-message-type-success")
            .open()
                .style("background-color", "#4CAF50")
            .close()

            .selector(".banner-message-type-info")
            .open()
                .style("background-color", "#2196F3")
            .close()

            .selector(".banner-message-type-warning")
            .open()
                .style("background-color", "#ff9800")
            .close()

            .selector(".banner-message-close-button")
            .open()
                .style("margin-left", "15pt")
                .style("color", "white")
                .style("font-weight", "bold")
                .style("float", "right")
                .style("font-size", "22pt")
                .style("line-height", "14pt")
                .style("cursor", "pointer")
                .style("transition", "0.3s")
            .close()

            .selector(".banner-message-close-button:hover")
            .open()
                .style("color", "black")
            .close()

            .selector(".banner-message-message")
            .open()
                .style("margin-left", "15px")
            .close()

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=bannerMessage", "class=banner-message")
            .open()
                .node("span", "id=bannerMessageCloseButton", "class=banner-message-close-button")
                .open()
                    .text("×")
                .close()
                .node("span", "id=bannerMessageHeader", "class=banner-message-header")
                .node("span", "id=bannerMessageMessage", "class=banner-message-message")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(BannerMessage);
        this.component.get("bannerMessageHeader").setChild("Alert");
        this.component.get("bannerMessageMessage").setChild(this.message);
        this.applyClasses("banner-message fade");
        this.component.get("bannerMessageCloseButton").listenTo("click", new coreutil_v1.Method(this,this.hide));
    }

    applyClasses(baseClasses) {
        let classes = baseClasses;
        classes = classes + " banner-message-" + this.bannerType;
        if (this.customAppearance) {
            if (this.customAppearance.shape) {
                classes = classes + " banner-message-" + this.customAppearance.shape;
            }
            if (this.customAppearance.size) {
                classes = classes + " banner-message-" + this.customAppearance.size;
            }
            if (this.customAppearance.spacing) {
                classes = classes + " banner-message-" + this.customAppearance.spacing;
            }
        }
        this.component.get("bannerMessage").setAttributeValue("class",classes);
    }
    
    applyHeader(header) {
        this.header = header;
        this.component.get("bannerMessageHeader").setChild(this.header);
    }

    applyMessage(message) {
        this.message = message;
        this.component.get("bannerMessageMessage").setChild(this.message);
    }

    /**
     * 
     * @param {Method} clickedListener 
     */
    remove() {
        return this.component.remove();
    }

    /**
     * 
     * @param {Method} onHideListener 
     */
    onHide(onHideListener) {
        this.onHideListener = onHideListener;
    }

    /**
     * 
     * @param {Method} onShowListener 
     */
    onShow(onShowListener) {
        this.onShowListener = onShowListener;
    }

    async hide() {
        this.applyClasses("banner-message hide");
        await coreutil_v1.TimePromise.asPromise(500, () => { 
            this.component.get("bannerMessage").setStyle("display","none");
            justright_core_v1.CanvasStyles.disableStyle(BannerMessage.name, this.component.componentIndex);
        });
        if(this.onHideListener) {
            this.onHideListener.call();
        }
    }

    async show(newHeader = null, newMessage = null) {
        if (newHeader) {
            this.applyHeader(newHeader);
        }
        if (newMessage) {
            this.applyMessage(newMessage);
        }
        justright_core_v1.CanvasStyles.enableStyle(BannerMessage.name, this.component.componentIndex);
        this.component.get("bannerMessage").setStyle("display","block");
        await coreutil_v1.TimePromise.asPromise(100,() => { 
            this.applyClasses("banner-message show");
        });
        if(this.onShowListener) {
            this.onShowListener.call();
        }
    }

}

class CommonEvents {

    static HOVERED = "hovered";
    static UNHOVERED = "unhovered";
    static CLICKED = "clicked";
    static DOUBLE_CLICKED = "doubleClicked";

    static ENTERED = "entered";
    static KEYUPPED = "keyUpped";
    static FOCUSED = "focused";
    static BLURRED = "blurred";

    static CHANGED = "changed";
    static ENABLED = "enabled";
    static DISABLED = "disabled";
    static SELECTED = "selected";

    static DRAG_STARTED = "dragStarted";
    static DRAG_ENDED = "dragEnded";
    static DROPPED = "dropped";
    
}

new coreutil_v1.Logger("DialogBox");

class DialogBox {
    
    static OPTION_BACK_ON_CLOSE = 1;

    /**
     * 
     */
    constructor(defaultOptions = []){

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

		/** @type {Component} */
        this.component = null;
        
        /** @type {BackShade} */
        this.backShade = mindi_v1.InjectionPoint.instance(BackShade, [
            new BackShadeListeners()
                .withBackgroundClicked(new coreutil_v1.Method(this, this.hide))]);

        this.hidden = true;

        this.swallowFocusEscape = false;

        this.owningTrigger = null;

        /** @type {List<string>} */
        this.defaultOptions = new coreutil_v1.List(defaultOptions);

        /** @type {List<string>} */
        this.options = new coreutil_v1.List(defaultOptions);

        /** @type {Function} */
        this.destroyFocusEscapeListener = null;
    }
    
    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       return stylesheetBuilder
            .media("@media (max-width: 500px)")
            .open()
                .selector(".dialogbox-overlay")
                .open()
                    .style("position", "fixed")
                    .style("left", "0")
                    .style("width", "100%")
                    .style("height", "100%")
                .close()

                .selector(".dialogbox-frame")
                .open()
                    .style("position", "absolute")
                    .style("margin", "0")
                    .style("width", "100%")
                    .style("height", "100%")
                .close()

                .selector(".dialogbox-content")
                .open()
                    .style("position", "relative")
                    .style("height", "100%")
                .close()

                .selector(".dialogbox-body")
                .open()
                    .style("overflow-y", "visible")
                    .style("overflow-x", "hidden")
                .close()
            .close()
            .media("@media (min-width: 501px)")
            .open()
                .selector(".dialogbox-overlay")
                .open()
                    .style("position", "absolute")
                    .style("margin-top", "54pt")
                    .style("padding-top", "1.5rem")
                    .style("left", "50%")
                    .style("transform", "translate(-50%,0)")
                    .style("width", "auto")
                    .style("height", "auto")
                .close()

                .selector(".dialogbox-frame")
                .open()
                    .style("position", "relative")
                    .style("width", "auto")
                    .style("height", "auto")
                    .style("margin", "0.5rem")
                    .style("pointer-events", "none")
                .close()

                .selector(".dialogbox-content")
                .open()
                    .style("position", "relative")
                    .style("border", "1px solid rgba(0, 0, 0, 0.2)")
                    .style("border-radius", "0.3rem")
                    .style("height", "auto")
                .close()

                .selector(".dialogbox-body")
                .open()
                    .style("overflow-y", "visible")
                    .style("overflow-x", "hidden")
                .close()

                .selector(".dialogbox-header")
                .open()
                    .style("border-top-left-radius", "0.3rem")
                    .style("border-top-right-radius", "0.3rem")
                .close()
            .close()
            .media("@media (prefers-reduced-motion: reduce)")
            .open()
                .selector(".dialogbox-overlay.dialogbox-fade .dialogbox-frame")
                .open()
                    .style("transition", "none")
                .close()

                .selector(".dialogbox-fade")
                .open()
                    .style("transition", "none")
                .close()
            .close()
            .selector(".dialogbox-open")
            .open()
                .style("overflow", "hidden")
            .close()

            .selector(".dialogbox-open .dialogbox-overlay")
            .open()
                .style("overflow-x", "hidden")
                .style("overflow-y", "auto")
            .close()

            .selector(".dialogbox-overlay-fade")
            .open()
                .style("transition", "opacity 0.15s linear")
            .close()

            .selector(".dialogbox-overlay-display-block")
            .open()
                .style("display", "block")
            .close()

            .selector(".dialogbox-overlay-display-none")
            .open()
                .style("display", "none")
            .close()

            .selector(".dialogbox-overlay-fade:not(.dialogbox-overlay-show)")
            .open()
                .style("opacity", "0")
            .close()

            .selector(".dialogbox-overlay.dialogbox-overlay-fade .dialogbox-frame")
            .open()
                .style("transition", "-webkit-transform 0.3s ease-out")
                .style("transition", "transform 0.3s ease-out")
                .style("transition", "transform 0.3s ease-out, -webkit-transform 0.3s ease-out")
                .style("-webkit-transform", "translate(0, -50px)")
                .style("transform", "translate(0, -50px)")
            .close()

            .selector(".dialogbox-overlay.dialogbox-overlay-show .dialogbox-frame")
            .open()
                .style("-webkit-transform", "none")
                .style("transform", "none")
            .close()

            .selector(".dialogbox-header .dialogbox-close-button")
            .open()
                .style("padding", "0.7rem 1rem")
                .style("margin", "-0.7rem -1rem -0.7rem auto")
            .close()

            .selector(".dialogbox-title")
            .open()
                .style("margin-bottom", "0")
                .style("line-height", "1.5")
            .close()

            .selector(".dialogbox-body")
            .open()
                .style("position", "relative")
                .style("-ms-flex", "1 1 auto")
                .style("flex", "1 1 auto")
            .close()

            .selector(".dialogbox-footer")
            .open()
                .style("display", "-ms-flexbox")
                .style("display", "flex")
                .style("-ms-flex-align", "center")
                .style("align-items", "center")
                .style("-ms-flex-pack", "end")
                .style("justify-content", "flex-end")
                .style("padding", "1rem")
                .style("border-top", "1px solid #dee2e6")
                .style("border-bottom-right-radius", "0.3rem")
                .style("border-bottom-left-radius", "0.3rem")
            .close()

            .selector(".dialogbox-footer > :not(:first-child)")
            .open()
                .style("margin-left", ".25rem")
            .close()

            .selector(".dialogbox-footer > :not(:last-child)")
            .open()
                .style("margin-right", ".25rem")
            .close()

            .selector(".dialogbox-overlay")
            .open()
                .style("top", "0")
                .style("z-index", "10")
                .style("overflow", "hidden")
                .style("outline", "0")
            .close()

            .selector(".dialogbox-frame")
            .open()
                .style("margin", "0")
            .close()

            .selector(".dialogbox-content")
            .open()
                .style("display", "-ms-flexbox")
                .style("display", "flex")
                .style("-ms-flex-direction", "column")
                .style("flex-direction", "column")
                .style("width", "100%")
                .style("pointer-events", "auto")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
            .close()

            .selector(".dialogbox-header")
            .open()
                .style("display", "-ms-flexbox")
                .style("display", "flex")
                .style("background-color", "#999999")
                .style("color", "#ffffff")
                .style("-ms-flex-align", "start")
                .style("align-items", "flex-start")
                .style("-ms-flex-pack", "justify")
                .style("justify-content", "space-between")
                .style("padding", "0.7rem 1rem")
                .style("border-bottom", "1px solid #dee2e6")
            .close()

            .selector(".dialogbox-close-button")
            .open()
                .style("float", "right")
                .style("font-size", "1.5rem")
                .style("font-weight", "700")
                .style("line-height", "1")
                .style("color", "#000")
                .style("text-shadow", "0 1px 0 #fff")
                .style("opacity", ".5")
            .close()

            .selector(".dialogbox-close-button:hover")
            .open()
                .style("color", "#000")
                .style("text-decoration", "none")
            .close()

            .selector(".dialogbox-close-button:not(:disabled):not(.disabled):hover, .dialogbox-close-button:not(:disabled):not(.disabled):focus")
            .open()
                .style("opacity", ".75")
            .close()

            .selector("button.dialogbox-close-button")
            .open()
                .style("padding", "0")
                .style("background-color", "transparent")
                .style("border", "0")
                .style("-webkit-appearance", "none")
                .style("-moz-appearance", "none")
                .style("appearance", "none")
            .close()
            
            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
       return componentBuilder
            .root("div", "id=dialogBox",
                        "style=z-index:-1")
            .open()
                .node("div", "id=backShadeContainer")
                .node("div", "id=dialogBoxOverlay",
                            "class=dialogbox-overlay dialogbox-overlay-display-block dialogbox-overlay-fade",
                            "tabindex=-1",
                            "role=dialog",
                            "aria-labelledby=dialogLabel",
                            "aria-dialogbox=true")
                    .open()
                        .node("div", "class=dialogbox-frame",
                                    "style=z-index:2",
                                    "role=document")
                            .open()
                                .node("div", "class=dialogbox-content")
                                    .open()
                                        .node("div", "class=dialogbox-header")
                                            .open()
                                                .node("h5", "id=title",
                                                        "class=dialogbox-title")
                                                .open()
                                                    .text("Message")
                                                .close()
                                                .node("button", "id=closeButton",
                                                                "type=button",
                                                                "class=dialogbox-close-button",
                                                                "data-dismiss=dialogbox",
                                                                "aria-label=Close")
                                                    .open()
                                                        .node("i", "class=fa fa-window-close",
                                                                    "aria-hidden=true")
                                                    .close()
                                            .close()
                                        .node("div", "id=dialogBoxContent",
                                                    "class=dialogbox-body")
                                    .close()
                            .close()
                    .close()
            .close()

            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(DialogBox);
        this.component.set("backShadeContainer", this.backShade.component);
        this.component.get("closeButton").listenTo("click", new coreutil_v1.Method(this, this.close));
    }

    /**
     * 
     * @param {string} text 
     */
    setTitle(text){ this.component.setChild("title", text); }

    /**
     * 
     * @param {Component} component 
     */
    setFooter(component){
        this.component.get("dialogBoxFooter").setStyle("display", "block");
        this.component.setChild("dialogBoxFooter", component);
    }

    /**
     * 
     * @param {Component} component 
     */
    setContent(component){ this.component.setChild("dialogBoxContent",component); }

	set(key,val) { this.component.set(key,val); }
    
    async close() {
        const options = this.options;
        await this.hide();
        if (options.contains(DialogBox.OPTION_BACK_ON_CLOSE)) {
            justright_core_v1.Navigation.instance().back();
        }
    }

    /**
     * 
     * @param {ContainerEvent} event 
     * @returns 
     */
    hide(event) {
        if (this.destroyFocusEscapeListener) {
            this.destroyFocusEscapeListener();
            this.destroyFocusEscapeListener = null;
        }
        this.options;
        if (this.hidden) {
            return Promise.resolve();
        }
        this.hidden = true;
        this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade");
        const hideBackShadePromise = this.backShade.hideAfter(300);
        const hidePromise = coreutil_v1.TimePromise.asPromise(200, () => { 
                this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-none");
            }
        );
        const disableStylePromise = coreutil_v1.TimePromise.asPromise(201, () => {
                this.getDialogBox().remove();
                justright_core_v1.CanvasStyles.disableStyle(DialogBox.name, this.component.componentIndex);
            }
        );
        this.options = this.defaultOptions;
        return Promise.all([hidePromise, disableStylePromise, hideBackShadePromise]);
    }

    /**
     * 
     * @param {ContainerEvent} event 
     * @param {Array<string>} temporaryOptions
     * @returns 
     */
    show(event, temporaryOptions) {
        if (this.destroyFocusEscapeListener) {
            this.destroyFocusEscapeListener();
            this.destroyFocusEscapeListener = null;
        }
        this.destroyFocusEscapeListener = justright_core_v1.CanvasRoot.listenToFocusEscape(
            new coreutil_v1.Method(this, this.close), this.component.get("dialogBoxOverlay")
        );

        if (temporaryOptions) {
            this.options = new coreutil_v1.List(temporaryOptions);
        }
        justright_core_v1.CanvasRoot.swallowFocusEscape(500);
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        justright_core_v1.CanvasStyles.enableStyle(DialogBox.name, this.component.componentIndex);
        this.backShade.show();
        this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-block");
        justright_core_v1.CanvasRoot.mouseDownElement = this.component.get("dialogBoxContent").containerElement;
        return coreutil_v1.TimePromise.asPromise(100,  () => {
                this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-block dialogbox-overlay-show");
            }
        );
    }

    getDialogBoxOverlay() { return this.component.get("dialogBoxOverlay"); }

    getDialogBox() { return this.component.get("dialogBox"); }

    scrollLock() {
        containerbridge_v1.ContainerElementUtils.scrollLockTo(this.component.get("dialogBoxContent").element, 0, 0, 1000);
    }
}

class ElementThemeApplicator {
    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @param {String} classPrefix
     * @param {String} modeName 
     * @param {String[]} defaultColors 
     * @param {String[]} hoverColors 
     * @param {String[]} disabledColors 
     * @param {String[]} activeColors 
     * @param {String} boxShadowFocus 
     * @param {String} boxShadowActiveFocus 
     * @return {StylesheetBuilder}
     */
    static apply(stylesheetBuilder, classPrefix, modeName,
            defaultColors, hoverColors, disabledColors, activeColors,
            boxShadowFocus, boxShadowActiveFocus) {

        ColorApplicator.apply(stylesheetBuilder, 
            `.${classPrefix}-${modeName}`,
            defaultColors[0], defaultColors[1], defaultColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}:hover`,
            hoverColors[0], hoverColors[1], hoverColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}:focus, .${classPrefix}-${modeName}.focus`,
            hoverColors[0], hoverColors[1], hoverColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}.disabled, .${classPrefix}-${modeName}:disabled`,
            disabledColors[0], disabledColors[1], disabledColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}:not(:disabled):not(.disabled):active,` +
                `.${classPrefix}-${modeName}:not(:disabled):not(.disabled).active,` +
                `.show > .${classPrefix}-${modeName}.dropdown-toggle`,
            activeColors[0], activeColors[1], activeColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}:not(:disabled):not(.disabled):active:focus,` +
                `.${classPrefix}-${modeName}:not(:disabled):not(.disabled).active:focus,` +
                `.show > .${classPrefix}-${modeName}.dropdown-toggle:focus`,
            activeColors[0], activeColors[1], activeColors[2]);


        return stylesheetBuilder
            .selector(`.${classPrefix}-${modeName}:not(:disabled):not(.disabled):active:focus,` +
                        `.${classPrefix}-${modeName}:not(:disabled):not(.disabled).active:focus,` +
                        `.show > .${classPrefix}-${modeName}.dropdown-toggle:focus`)
            .open()
                .style("box-shadow", boxShadowActiveFocus)
            .close()

            .selector(`.${classPrefix}-${modeName}:focus,` + 
                        `${classPrefix}-${modeName}.focus`)
            .open()
                .style("box-shadow", boxShadowFocus)
            .close();
    }
}

new coreutil_v1.Logger("DropDownPanel");

class DropDownPanel {

    static TYPE_PRIMARY = "drop-down-panel-button-primary";
    static TYPE_SECONDARY = "drop-down-panel-button-secondary";
    static TYPE_SUCCESS = "drop-down-panel-button-success";
    static TYPE_INFO = "drop-down-panel-button-info";
    static TYPE_WARNING = "drop-down-panel-button-warning";
    static TYPE_DANGER = "drop-down-panel-button-danger";
    static TYPE_LIGHT = "drop-down-panel-button-light";
    static TYPE_DARK = "drop-down-panel-button-dark";

    static SIZE_MEDIUM = "drop-down-panel-button-medium";
    static SIZE_LARGE = "drop-down-panel-button-large";

    static ORIENTATION_LEFT = "drop-down-panel-left";
    static ORIENTATION_RIGHT = "drop-down-panel-right";

    static CONTENT_VISIBLE = "drop-down-panel-content-visible";
    static CONTENT_HIDDEN = "drop-down-panel-content-hidden";
    static CONTENT_EXPAND = "drop-down-panel-content-expand";
    static CONTENT_COLLAPSE = "drop-down-panel-content-collapse";
    static CONTENT = "drop-down-panel-content";
    static BUTTON = "drop-down-panel-button";

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = DropDownPanel.TYPE_DARK, size = DropDownPanel.SIZE_MEDIUM, orientation = DropDownPanel.ORIENTATION_LEFT) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.iconClass = iconClass;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.size = size;

        /** @type {string} */
        this.orientation = orientation;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .media("(prefers-reduced-motion: reduce)")
            .open()
                .selector(".drop-down-panel-button")
                .open()
                    .style("transition", "none")
                .close()
            .close()

            .selector(".drop-down-panel-outline")
            .open()
                .style("display", "inline-block")
                .style("vertical-align", "middle")
            .close()

            .selector(".drop-down-panel-button")
            .open()
                .style("min-width", "35pt")
                .style("display", "inline-block")
                .style("font-weight", "400")
                .style("color", "#212529")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("-webkit-user-select", "none")
                .style("-moz-user-select", "none")
                .style("-ms-user-select", "none")
                .style("user-select", "none")
                .style("background-color", "transparent")
                .style("border", "1px solid transparent")
                .style("padding", "0.375rem 0.75rem")
                .style("line-height", "1.5")
                .style("border-radius", "0.25rem")
                .style("transition", "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".drop-down-panel-button-medium")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".drop-down-panel-button-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".drop-down-panel-content")
            .open()
                .style("min-width", "150pt")
                .style("max-width", "450pt")
                .style("padding", "8pt 14pt")
                .style("color", "#333333")
                .style("background-color", "#ffffff")
                .style("border-radius", "5pt")
                .style("position", "absolute")
                .style("z-index", "99999997")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("overflow", "hidden")
            .close()

            .selector(".drop-down-panel-content.drop-down-panel-left")
            .open()
                .style("transform", "translate(0%, 10pt) translate(0%,0px)")
            .close()

            .selector(".drop-down-panel-content.drop-down-panel-right")
            .open()
                .style("transform", "translate(-100%, 10pt) translate(35pt,0px)")
            .close()

            .selector(".drop-down-panel-content-visible")
            .open()
                .style("display","block")
            .close()
                
            .selector(".drop-down-panel-content-hidden")
            .open()
                .style("display","none")
            .close()

            .selector(".drop-down-panel-arrow")
            .open()
                .style("padding", "10px 20px")
                .style("color", "#333333")
                .style("font-weight", "normal")
                .style("position", "absolute")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("display", "none")
                .style("transform", "translate(0%, 50%) translate(0%,-3pt)")
            .close()

            .selector(".drop-down-panel-arrow i")
            .open()
                .style("position", "absolute")
                .style("margin-left", "-15px")
                .style("width", "40px")
                .style("height", "15px")
                .style("overflow", "hidden")
                .style("top", "-20%")
                .style("left", "30%")
            .close()

            .selector(".drop-down-panel-arrow i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "18px")
                .style("height", "15px")
                .style("background-color", "#ffffff")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("left", "30%")
                .style("transform", "translate(50%,50%) rotate(45deg)")
            .close()

            .selector(".drop-down-panel-button:hover")
            .open()
                .style("color", "#212529")
                .style("text-decoration", "none")
            .close()

            .selector(".drop-down-panel-button:focus," +
                        ".drop-down-panel-button.focus")
            .open()
                .style("outline", "0")
                .style("box-shadow", "0 0 0 0.2rem rgba(0, 123, 255, 0.25)")
            .close()

            .selector(".drop-down-panel-button.disabled,"+ 
                        ".drop-down-panel-button:disabled")
            .open()
                .style("opacity", "0.65")
            .close();

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "primary",
            ColorPalette.PRIMARY_COLORS,
            ColorPalette.PRIMARY_HOVER_COLORS,
            ColorPalette.PRIMARY_DISABLED_COLORS,
            ColorPalette.PRIMARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus


        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "secondary",
            ColorPalette.SECONDARY_COLORS,
            ColorPalette.SECONDARY_HOVER_COLORS,
            ColorPalette.SECONDARY_DISABLED_COLORS,
            ColorPalette.SECONDARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus
        
        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "success",
            ColorPalette.SUCCESS_COLORS,
            ColorPalette.SUCCESS_HOVER_COLORS,
            ColorPalette.SUCCESS_DISABLED_COLORS,
            ColorPalette.SUCCESS_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "info",
            ColorPalette.INFO_COLORS,
            ColorPalette.INFO_HOVER_COLORS,
            ColorPalette.INFO_DISABLED_COLORS,
            ColorPalette.INFO_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "warning",
            ColorPalette.WARNING_COLORS,
            ColorPalette.WARNING_HOVER_COLORS,
            ColorPalette.WARNING_DISABLED_COLORS,
            ColorPalette.WARNING_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "danger",
            ColorPalette.DANGER_COLORS,
            ColorPalette.DANGER_HOVER_COLORS,
            ColorPalette.DANGER_DISABLED_COLORS,
            ColorPalette.DANGER_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "light",
            ColorPalette.LIGHT_COLORS,
            ColorPalette.LIGHT_HOVER_COLORS,
            ColorPalette.LIGHT_DISABLED_COLORS,
            ColorPalette.LIGHT_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "dark",
            ColorPalette.DARK_COLORS,
            ColorPalette.DARK_HOVER_COLORS,
            ColorPalette.DARK_DISABLED_COLORS,
            ColorPalette.DARK_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)"); // boxShadowActiveFocus

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
       return componentBuilder
            .root("div", "id=dropDownPanelRoot", "class=drop-down-panel-outline")
            .open()
                .node("button", "id=button", "class=drop-down-panel-button")
                .node("div", "id=arrow", "class=drop-down-panel-arrow")
                .open()
                    .node("i")
                .close()
                .node("div", "id=content", "class=drop-down-panel-content", "tabindex=0")
            .close()

            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(DropDownPanel);
        justright_core_v1.CanvasStyles.enableStyle(DropDownPanel.name);
        this.component.get("button").setChild(justright_core_v1.HTML.i("", this.iconClass));

        justright_core_v1.StyleSelectorAccessor.from(this.component.get("button"))
            .enable(DropDownPanel.BUTTON)
            .enable(this.type);

        justright_core_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .enable(DropDownPanel.CONTENT)
            .disable(DropDownPanel.CONTENT_VISIBLE)
            .enable(DropDownPanel.CONTENT_HIDDEN)
            .enable(this.size)
            .enable(this.orientation);

        this.component.get("button").listenTo("click", new coreutil_v1.Method(this, this.clicked));
        justright_core_v1.CanvasRoot.listenToFocusEscape(new coreutil_v1.Method(this, this.hide), this.component.get("dropDownPanelRoot"));
    }

    /**
     * 
     * @param {Component} dropDownPanelContent 
     */
    setPanelContent(dropDownPanelContent) {
        this.component.get("content").setChild(dropDownPanelContent.component);
    }
    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        this.toggleContent();
    }

    toggleContent() {
        if (!justright_core_v1.StyleAccessor.from(this.component.get("arrow")).is("display","block")) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        justright_core_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .disable(DropDownPanel.CONTENT_HIDDEN)
            .enable(DropDownPanel.CONTENT_VISIBLE);
        justright_core_v1.StyleAccessor.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").containerElement.focus();
    }

    hide() {
        justright_core_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .disable(DropDownPanel.CONTENT_VISIBLE)
            .enable(DropDownPanel.CONTENT_HIDDEN);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}

new coreutil_v1.Logger("CommonInput");

class CommonInput {

    static EVENT_CLICKED = CommonEvents.CLICKED;
    static EVENT_ENTERED = CommonEvents.ENTERED;
    static EVENT_KEYUPPED = CommonEvents.KEYUPPED;
    static EVENT_CHANGED = CommonEvents.CHANGED;
    static EVENT_BLURRED = CommonEvents.BLURRED;

    /**
     * 
     * @param {Function} componentClass
     * @param {string} name
     * @param {object} model
     * @param {AbstractValidator} validator
     * @param {string} placeholder
     * @param {string} inputElementId
     * @param {string} errorElementId
     */
    constructor(componentClass,
        name,
        model = null,
        validator = null, 
        placeholder = null,
        inputElementId = null,
        errorElementId = null) {


        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {AbstractValidator} */
        this.validator = validator;

        /** @type {Function} */
        this.componentClass = componentClass;

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.placeholder = placeholder;

        /** @type {string} */
        this.inputElementId = inputElementId;

        /** @type {string} */
        this.errorElementId = errorElementId;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.tainted = false;

        /** @type {EventManager} */
        this.eventManager = new justright_core_v1.EventManager();

        /** @type {InputElementDataBinding} */
        this.dataBinding = null;
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentClass);

        justright_core_v1.CanvasStyles.enableStyle(this.componentClass.name, this.component.componentIndex);

        this.component.get(this.inputElementId).setAttributeValue("name", this.name);
        if (this.placeholder) {
            this.component.get(this.inputElementId).setAttributeValue("placeholder", ":  " +  this.placeholder);
        }

        if(this.validator) {
            this.validator.withValidListener(new coreutil_v1.Method(this,this.hideValidationError));
        }

        if(this.model) {
            this.dataBinding = justright_core_v1.InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
        }

        this.component.get(this.inputElementId)
            .listenTo("keyup", new coreutil_v1.Method(this, this.keyupped))
            .listenTo("change", new coreutil_v1.Method(this, this.changed))
            .listenTo("blur", new coreutil_v1.Method(this, this.blurred))
            .listenTo("click", new coreutil_v1.Method(this, this.clicked))
            .listenTo("keyup", new coreutil_v1.Method(this, (event) => {
                if (event.isKeyCode(13)) {
                    this.entered(event);
                }
            }));

        if (this.errorElementId) {
            this.component.get(this.errorElementId)
                .listenTo("click", new coreutil_v1.Method(this, this.errorClicked));
        }
    }

    get events() { return this.eventManager; }

    get value() { 
        /** @type {HTMLInputElement} */
        const input = this.component.get(this.inputElementId);
        return input.value;
    }

    set value(value) {
        /** @type {HTMLInputElement} */
        const input = this.component.get(this.inputElementId);
        input.value = value;
        if (this.dataBinding) {
            this.dataBinding.push();
        }
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    keyupped(event) {
        if (!event.isKeyCode(13) && !event.isKeyCode(16) && !event.isKeyCode(9)) {
            this.tainted = true;
        }
        if ("" === event.targetValue) {
            this.tainted = false;
        }
        this.events.trigger(CommonInput.EVENT_KEYUPPED, event);
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    changed(event) {
        this.tainted = true;
        if ("" === event.targetValue) {
            this.tainted = false;
        }
        this.events.trigger(CommonInput.EVENT_CHANGED, event);
    }

    clicked(event) {
        this.events.trigger(CommonInput.EVENT_CLICKED, event);
    }

    entered(event) {
        if (!this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
            return;
        }
        this.events.trigger(CommonInput.EVENT_ENTERED, event);
    }

    blurred(event) {
        if (!this.tainted) {
            return;
        }
        if (!this.validator.isValid()) {
            this.showValidationError();
            return;
        }
        this.hideValidationError();
        this.events.trigger(CommonInput.EVENT_BLURRED, event);
    }

    errorClicked(event) {
        this.hideValidationError();
    }

    focus() { this.component.get(this.inputElementId).focus(); }
    selectAll() { this.component.get(this.inputElementId).selectAll(); }
    enable() { this.component.get(this.inputElementId).enable(); }
    disable() { this.component.get(this.inputElementId).disable(); }
    clear() { this.component.get(this.inputElementId).value = ""; this.tainted = false; this.hideValidationError(); }

}

new coreutil_v1.Logger("LinkPanel");

class LinkPanel {

    static EVENT_CLICKED = CommonEvents.CLICKED;

    static SIZE_SMALL = "link-panel-small";
    static SIZE_MEDIUM = "link-panel-medium";
    static SIZE_LARGE = "link-panel-large";

    static ORIENTATION_FLAT = "link-panel-flat";
    static ORIENTATION_STACKED = "link-panel-stacked";

    static THEME_DARK = "link-panel-dark";
    static THEME_LIGHT = "link-panel-light";
    static THEME_DANGER = "link-panel-danger";
    static THEME_INFO = "link-panel-info";
    static THEME_SUCCESS = "link-panel-success";

    /**
     * 
     * @param {String} label
     * @param {String} icon
     */
    constructor(label, icon, theme = LinkPanel.THEME_DARK, orientation = LinkPanel.ORIENTATION_FLAT, size = LinkPanel.SIZE_SMALL) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.label = label;

        /** @type {String} */
        this.icon = icon;

        /** @type {String} */
        this.orientation = orientation;

        /** @type {String} */
        this.size = size;

        /** @type {String} */
        this.theme = theme;

        /** @type {EventManager<LinkPanel>} */
        this.eventManager = new justright_core_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".link-panel")
            .open()
                .style("display", "flex")
                .style("align-items", "stretch")
                .style("margin", "2pt")
                .style("border-radius", "5pt")
                .style("cursor", "pointer")
                .style("padding", "0.75rem 0.75rem")
                .style("user-select", "none")
            .close()

            .selector(".link-panel-flat")
            .open()
                .style("flex-direction", "row")
            .close()

            .selector(".link-panel-flat > .link-panel-icon")
            .open()
                .style("width", "2rem")
            .close()

            .selector(".link-panel-stacked")
            .open()
                .style("flex-direction", "column")
            .close()

            .selector(".link-panel-small")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".link-panel-medium")
            .open()
                .style("font-size", "1.2rem")
            .close()

            .selector(".link-panel-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".link-panel-dark")
            .open()
                .style("color", "#212529")
            .close()

            .selector(".link-panel-dark:hover")
            .open()
                .style("background-color", "#bfbfbf")
            .close()

            .selector(".link-panel-light")
            .open()
                .style("color", "#ffffff")
            .close()

            .selector(".link-panel-light:hover")
            .open()
                .style("background-color", "#8f8f8f")
            .close()

            .selector(".link-panel-danger")
            .open()
                .style("color", "#ff0000")
            .close()

            .selector(".link-panel-danger:hover")
            .open()
                .style("background-color", "#bfbfbf")
            .close()

            .selector(".link-panel-info")
            .open()
                .style("color", "#0000ff")
            .close()

            .selector(".link-panel-info:hover")
            .open()
                .style("background-color", "#bfbfbf")
            .close()

            .selector(".link-panel-success")
            .open()
                .style("color", "#00ff00")
            .close()

            .selector(".link-panel-success:hover")
            .open()
                .style("background-color", "#ffffff")
            .close()

            .selector(".link-panel-icon")
            .open()
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("user-select", "none")
            .close()

            .selector(".link-panel-label")
            .open()
                .style("font-weight", "400")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("padding-left", "5pt")
                .style("padding-right", "5pt")
                .style("user-select", "none")
                .style("transition", "color 0.15s ease-in-out, " +
                    "background-color 0.15s ease-in-out, " +
                    "border-color 0.15s ease-in-out, " +
                    "box-shadow 0.15s ease-in-out")
            .close()

            .build();

    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=link", "class=link-panel")
            .open()
                .node("div", "class=link-panel-icon")
                .open()
                    .node("i", "id=icon")
                .close()
                .node("div", "class=link-panel-label")
                .open()
                    .node("a", "id=label")
                .close()
            .close()
            .build();
    }

    /** @type {EventManager<LinkPanel>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create(LinkPanel);
        justright_core_v1.CanvasStyles.enableStyle(LinkPanel.name);
        
        justright_core_v1.StyleSelectorAccessor.from(this.component.get("link"))
            .enable(this.size)
            .enable(this.orientation)
            .enable(this.theme);

        if (this.label) {
            this.component.get("label").setChild(this.label);
        } else {
            this.component.get("label").remove();
        }

        if (this.icon) {
            justright_core_v1.StyleSelectorAccessor.from(this.component.get("icon"))
                .clear()
                .enable(this.icon);
        } else {
            this.component.get("icon").remove();
        }


        this.component.get("link").listenTo("click", new coreutil_v1.Method(this, (event) => {
            this.eventManager.trigger(LinkPanel.EVENT_CLICKED, event);
        }));
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("link").listenTo("click", method);
        return this;
    }

}

new coreutil_v1.Logger("Panel");

class Panel {

    static PARAMETER_STYLE_TYPE_COLUMN_ROOT = "panel-type-column-root";
    static PARAMETER_STYLE_TYPE_COLUMN = "panel-type-column";
    static PARAMETER_STYLE_TYPE_ROW = "panel-type-row";

    static PARAMETER_STYLE_CONTENT_ALIGN_LEFT = "panel-content-align-left";
    static PARAMETER_STYLE_CONTENT_ALIGN_RIGHT = "panel-content-align-right";
    static PARAMETER_STYLE_CONTENT_ALIGN_CENTER = "panel-content-align-center";
    static PARAMETER_STYLE_CONTENT_ALIGN_JUSTIFY = "panel-content-align-justify";

    static PARAMETER_STYLE_SIZE_AUTO = "panel-size-auto";
    static PARAMETER_STYLE_SIZE_MINIMAL = "panel-size-minimal";
    static PARAMETER_STYLE_SIZE_RESPONSIVE = "panel-size-responsive";

    static OPTION_STYLE_CONTENT_PADDING_SMALL = "panel-content-padding-small";
    static OPTION_STYLE_CONTENT_PADDING_LARGE = "panel-content-padding-large";

    static OPTION_STYLE_BORDER_SHADOW = "panel-border-shadow";

    /**
     * 
     * @param {string} type 
     * @param {string} contentAlign 
     * @param {string} size 
     * @param {Array<string>} options 
     */
    constructor(type = Panel.PARAMETER_STYLE_TYPE_COLUMN_ROOT,
        contentAlign = Panel.PARAMETER_STYLE_CONTENT_ALIGN_CENTER,
        size = Panel.PARAMETER_STYLE_SIZE_AUTO,
        options = []) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.contentAlign = contentAlign;

        /** @type {string} */
        this.size = size;

        /** @type {Array<String>} */
        this.options = options;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .media("@media only screen and (min-width: 850pt)")
            .open()
                .selector(".panel-size-responsive")
                .open()
                    .style("flex-basis", "100%")
                    .style("min-width", "800pt")
                .close()
            .close()

            .media("@media only screen and (max-width: 849pt)")
            .open()
                .selector(".panel-size-responsive")
                .open()
                    .style("flex-basis", "100%")
                    .style("min-width", "500pt")
                .close()
            .close()

            .media("@media only screen and (max-width: 500pt)")
            .open()
                .selector(".panel-size-responsive")
                .open()
                    .style("flex-basis", "100%")
                    .style("min-width", "100%")
                .close()
            .close()

            .selector(".panel-type-column-root")
            .open()
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("box-sizing", "border-box")
                .style("height", "100%")
                .style("border", "0")
                .style("margin", "0")
            .close()

            .selector(".panel-type-column")
            .open()
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("box-sizing", "border-box")
                .style("margin", "0")
                .style("border", "0")
            .close()

            .selector(".panel-type-row")
            .open()
                .style("display", "flex")
                .style("flex-direction", "row")
                .style("box-sizing", "border-box")
                .style("margin", "0")
                .style("border", "0")
            .close()

            .selector(".panel-content-align-left")
            .open()
                .style("justify-content", "left")
            .close()

            .selector(".panel-content-align-right")
            .open()
                .style("justify-content", "right")
            .close()

            .selector(".panel-content-align-center")
            .open()
                .style("align-items", "center")
                .style("justify-content", "center")
            .close()

            .selector(".panel-content-align-justify")
            .open()
                .style("justify-content", "space-between")
            .close()

            .selector(".panel-size-auto")
            .open()
                .style("flex-grow", "1")
                .style("flex-shrink", "0")
                .style("flex-basis", "auto")
            .close()

            .selector(".panel-size-minimal")
            .open()
                .style("flex-grow", "0")
                .style("flex-shrink", "0")
                .style("flex-basis", "auto")
            .close()

            .selector(".panel-content-padding-small")
            .open()
                .style("padding", "2pt")
            .close()

            .selector(".panel-content-padding-large")
            .open()
                .style("padding", "6pt")
            .close()

            .selector(".panel-border-shadow")
            .open()
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close()

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=panel")
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(Panel);
        justright_core_v1.CanvasStyles.enableStyle(Panel.name);

        justright_core_v1.StyleSelectorAccessor.from(this.component.get("panel"))
            .enable(this.type)
            .enable(this.contentAlign)
            .enable(this.size);
    }

}

new coreutil_v1.Logger("LinePanelEntry");

class LinePanelEntry {

    constructor() {

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

    }

	/**
	 * 
	 * @param {StylesheetBuilder} stylesheetBuilder 
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.media("@media (min-width: 734px)")
			.open()
				.selector(".line-panel-entry")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()

				.selector(".line-panel-entry-record-element")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
					.style("margin-bottom", "5px")
				.close()

				.selector(".line-panel-entry-record-subrecordelements-container")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
				.close()

				.selector(".line-panel-entry-subrecord-elements")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()
			.close()

			.media("@media (max-width: 733px)")
			.open()
				.selector(".line-panel-entry")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()

				.selector(".line-panel-entry-record-element")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
					.style("margin-bottom", "5px")
				.close()

				.selector(".line-panel-entry-record-subrecordelements-container")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
				.close()

				.selector(".line-panel-entry-subrecord-elements")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()
			.close()

			.selector(".line-panel-entry-expand")
			.open()
				.style("position", "relative")
				.style("flex", "0 1 auto")
				.style("display", "flex")
				.style("padding-right", "5px")
			.close()

			.selector(".line-panel-entry-subrecord-elements-indent")
			.open()
				.style("position", "relative")
				.style("flex", "0 0 35px")
				.style("display", "flex")
				.style("flex-direction", "row")
			.close()

			.selector(".line-panel-entry-record-element")
			.open()
				.style("position", "relative")
				.style("flex", "1 0 auto")
				.style("display", "flex")
				.style("flex-direction", "row")
			.close()

			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=line-panel-entry")
			.open()
				.node("div", "class=line-panel-entry-record-element", "id=recordElementContainer")
				.open()
					.node("div", "class=line-panel-entry-record-element", "id=recordElement")
				.close()
			.close()

			.build();
	}

    async postConfig() {
		this.component = this.componentFactory.create(LinePanelEntry);
		justright_core_v1.CanvasStyles.enableStyle(LinePanelEntry.name);
    }


}

new coreutil_v1.Logger("LinePanel");

class LinePanel {

	static EVENT_REFRESH_CLICKED = "refreshClicked";
	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static RECORDS_STATE_UPDATE_REQUESTED = "recordsStateUpdateRequested";

	/**
	 * 
	 * @param {Panel} buttonPanel 
	 */
	constructor(buttonPanel = null) {

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);
		
		/** @type {Component} */
		this.component = null;

		/** @type {EventManager} */
		this.eventManager = new justright_core_v1.EventManager();

		/** @type {Provider<LinePanelEntry>} */
		this.linePanelEntryProvider = mindi_v1.InjectionPoint.provider(LinePanelEntry);

		/** @type {Provider<Panel>} */
		this.panelProvider = mindi_v1.InjectionPoint.provider(Panel);

        /** @type {StateManager<any[]>} */
        this.arrayState = new justright_core_v1.StateManager();

		/** @type {Panel} */
		this.buttonPanel = buttonPanel;

	}

	/**
	 * 
	 * @param {StylesheetBuilder} stylesheetBuilder 
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.media("@media (min-width: 734px)")
			.open()
				.selector(".line-panel")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
					.style("justify-content", "top")
					.style("background-color", "#ffffff")
					.style("padding", "5px")
				.close()
			.close()

			.media("@media (max-width: 733px)")
			.open()
				.selector(".line-panel")
				.open()
					.style("position", "relative")
					.style("display", "flex")
					.style("flex-direction", "column")
					.style("background-color", "#ffffff")
					.style("width", "100%")
					.style("padding", "5px")
				.close()
			.close()

			.selector(".line-panel-content")
			.open()
				.style("position", "relative")
				.style("display", "flex")
				.style("flex-direction", "column")
				.style("flex", "1 0 auto")
			.close()

			.selector(".line-panel-buttons")
			.open()
				.style("position", "relative")
				.style("flex", "0 1 auto")
				.style("padding-bottom", "5px")
			.close()

			.build();
	}

	/**
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=line-panel")
			.open()
				.node("div", "class=line-panel-buttons", "id=buttonPanel")
				.node("div", "class=line-panel-content", "id=recordElements")
			.close()
			.build();
	}

	async postConfig() {
		this.component = this.componentFactory.create(LinePanel);
		justright_core_v1.CanvasStyles.enableStyle(LinePanel.name);

		if (this.buttonPanel) {
			this.component.setChild("buttonPanel", this.buttonPanel.component);
		}

		this.arrayState.react(new coreutil_v1.Method(this, this.handleArrayState));


	}

	/**
	 * @type { EventManager }
	 */
	get events() { return this.eventManager; }

	/**
	 * @type { EventManager }
	 */
	get events() { return this.eventManager; }

	/**
	 * Reset
	 * 
	 * @param {ContainerEvent} event 
	 */
	async reset(event) {
		this.events.trigger(LinePanel.RECORDS_STATE_UPDATE_REQUESTED, [event, this.arrayState]);
	}

    /**
     * @param {Array} array 
     */
    async handleArrayState(array) {
		const panel = await this.panelProvider.get([
			Panel.PARAMETER_STYLE_TYPE_COLUMN, 
			Panel.PARAMETER_STYLE_CONTENT_ALIGN_LEFT, 
			Panel.PARAMETER_STYLE_SIZE_MINIMAL]);
		array.forEach(async (record) => {
            await this.populateRecord(panel, record);
        });

		this.component.setChild("recordElements", panel.component);
    }

	    /**`
	 * @param {Component} panel
     * @param {any} record 
     */
    async populateRecord(panel, record) {
        const recordElement = await this.eventManager.trigger(LinePanel.RECORD_ELEMENT_REQUESTED, [null, record]);
        
		if (!recordElement) {
			return;
		}

		const linePanelEntry = await this.linePanelEntryProvider.get([true, record]);
		linePanelEntry.component.setChild("recordElement", recordElement.component);

		panel.component.addChild("panel", linePanelEntry.component);
    }
}

new coreutil_v1.Logger("PopUpPanel");

class PopUpPanel {

    static TYPE_PRIMARY = "pop-up-panel-button-primary";
    static TYPE_SECONDARY = "pop-up-panel-button-secondary";
    static TYPE_SUCCESS = "pop-up-panel-button-success";
    static TYPE_INFO = "pop-up-panel-button-info";
    static TYPE_WARNING = "pop-up-panel-button-warning";
    static TYPE_DANGER = "pop-up-panel-button-danger";
    static TYPE_LIGHT = "pop-up-panel-button-light";
    static TYPE_DARK = "pop-up-panel-button-dark";

    static SIZE_MEDIUM = "pop-up-panel-button-medium";
    static SIZE_LARGE = "pop-up-panel-button-large";

    static ORIENTATION_LEFT = "pop-up-panel-left";
    static ORIENTATION_RIGHT = "pop-up-panel-right";

    static CONTENT_VISIBLE = "pop-up-panel-content-visible";
    static CONTENT_HIDDEN = "pop-up-panel-content-hidden";
    static CONTENT_EXPAND = "pop-up-panel-content-expand";
    static CONTENT_COLLAPSE = "pop-up-panel-content-collapse";
    static CONTENT = "pop-up-panel-content";
    static BUTTON = "pop-up-panel-button";

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = PopUpPanel.TYPE_DARK, size = PopUpPanel.SIZE_MEDIUM, orientation = PopUpPanel.ORIENTATION_LEFT) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.iconClass = iconClass;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.size = size;

        /** @type {string} */
        this.orientation = orientation;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .media("@media (prefers-reduced-motion: reduce)")
            .open()
                .selector(".pop-up-panel-button")
                .open()
                    .style("transition", "none")
                .close()
            .close()

            .selector(".pop-up-panel-outline")
            .open()
                .style("display", "inline-block")
                .style("vertical-align", "middle")
            .close()

            .selector(".pop-up-panel-button")
            .open()
                .style("min-width", "35pt")
                .style("display", "inline-block")
                .style("font-weight", "400")
                .style("color", "#212529")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("user-select", "none")
                .style("background-color", "transparent")
                .style("border", "1px solid transparent")
                .style("padding", "0.375rem 0.75rem")
                .style("line-height", "1.5")
                .style("border-radius", "0.25rem")
                .style("transition", "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".pop-up-panel-button-medium")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".pop-up-panel-button-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".pop-up-panel-content")
            .open()
                .style("min-width", "150pt")
                .style("max-width", "450pt")
                .style("padding", "8pt 14pt")
                .style("color", "#333333")
                .style("background-color", "#ffffff")
                .style("border-radius", "5pt")
                .style("position", "absolute")
                .style("z-index", "99999997")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("overflow", "hidden")
            .close()

            .selector(".pop-up-panel-content.pop-up-panel-left")
            .open()
                .style("transform", "translate(0%, -100%) translate(0%, -42pt)")
            .close()

            .selector(".pop-up-panel-content.pop-up-panel-right")
            .open()
                .style("transform", "translate(-100%, -100%) translate(35pt,-42pt)")
            .close()

            .selector(".pop-up-panel-content-visible")
            .open()
                .style("display","block")
            .close()
                
            .selector(".pop-up-panel-content-hidden")
            .open()
                .style("display","none")
            .close()

            .selector(".pop-up-panel-arrow")
            .open()
                .style("padding", "10px 20px")
                .style("color", "#333333")
                .style("font-weight", "normal")
                .style("position", "absolute")
                .style("z-index", "99999996")
                .style("box-sizing", "border-box")
                .style("display", "none")
                .style("transform", "translate(0%, -100%) translate(0%,-38pt)")
            .close()

            .selector(".pop-up-panel-arrow i")
            .open()
                .style("position", "absolute")
                .style("margin-left", "-15px")
                .style("width", "40px")
                .style("height", "40px")
                .style("overflow", "hidden")
                .style("top", "-20%")
                .style("left", "30%")
            .close()

            .selector(".pop-up-panel-arrow i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "16px")
                .style("height", "16px")
                .style("background-color", "#ffffff")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("left", "30%")
                .style("transform", "translate(50%,50%) rotate(45deg)")
            .close()

            .selector(".pop-up-panel-button:hover")
            .open()
                .style("color", "#212529")
                .style("text-decoration", "none")
            .close()

            .selector(".pop-up-panel-button:focus, .pop-up-panel-button.focus")
            .open()
                .style("outline", "0")
                .style("box-shadow", "0 0 0 0.2rem rgba(0, 123, 255, 0.25)")
            .close()

            .selector(".pop-up-panel-button.disabled, .pop-up-panel-button:disabled")
            .open()
                .style("opacity", "0.65")
            .close();

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "primary",
            ColorPalette.PRIMARY_COLORS,
            ColorPalette.PRIMARY_HOVER_COLORS,
            ColorPalette.PRIMARY_DISABLED_COLORS,
            ColorPalette.PRIMARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus


        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "secondary",
            ColorPalette.SECONDARY_COLORS,
            ColorPalette.SECONDARY_HOVER_COLORS,
            ColorPalette.SECONDARY_DISABLED_COLORS,
            ColorPalette.SECONDARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus
        
        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "success",
            ColorPalette.SUCCESS_COLORS,
            ColorPalette.SUCCESS_HOVER_COLORS,
            ColorPalette.SUCCESS_DISABLED_COLORS,
            ColorPalette.SUCCESS_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "info",
            ColorPalette.INFO_COLORS,
            ColorPalette.INFO_HOVER_COLORS,
            ColorPalette.INFO_DISABLED_COLORS,
            ColorPalette.INFO_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "warning",
            ColorPalette.WARNING_COLORS,
            ColorPalette.WARNING_HOVER_COLORS,
            ColorPalette.WARNING_DISABLED_COLORS,
            ColorPalette.WARNING_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "danger",
            ColorPalette.DANGER_COLORS,
            ColorPalette.DANGER_HOVER_COLORS,
            ColorPalette.DANGER_DISABLED_COLORS,
            ColorPalette.DANGER_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "light",
            ColorPalette.LIGHT_COLORS,
            ColorPalette.LIGHT_HOVER_COLORS,
            ColorPalette.LIGHT_DISABLED_COLORS,
            ColorPalette.LIGHT_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "dark",
            ColorPalette.DARK_COLORS,
            ColorPalette.DARK_HOVER_COLORS,
            ColorPalette.DARK_DISABLED_COLORS,
            ColorPalette.DARK_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)"); // boxShadowActiveFocus

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=popUpPanelRoot", "class=pop-up-panel-outline")
            .open()
                .node("button", "id=button", "class=pop-up-panel-button")
                .node("div", "id=arrow", "class=pop-up-panel-arrow")
                .open()
                    .node("i")
                .close()
                .node("div", "id=content", "class=pop-up-panel-content", "tabindex=0")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(PopUpPanel);
        justright_core_v1.CanvasStyles.enableStyle(PopUpPanel.name);
        this.component.get("button").setChild(justright_core_v1.HTML.i("", this.iconClass));

        justright_core_v1.StyleSelectorAccessor.from(this.component.get("button"))
            .enable(PopUpPanel.BUTTON)
            .enable(this.type);

        justright_core_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .enable(PopUpPanel.CONTENT)
            .disable(PopUpPanel.CONTENT_VISIBLE)
            .enable(PopUpPanel.CONTENT_HIDDEN)
            .enable(this.size)
            .enable(this.orientation);

        this.component.get("button").listenTo("click", new coreutil_v1.Method(this, this.clicked));
        justright_core_v1.CanvasRoot.listenToFocusEscape(new coreutil_v1.Method(this, this.hide), this.component.get("popUpPanelRoot"));
    }

    /**
     * 
     * @param {Component} popUpPanelContent 
     */
    setPanelContent(popUpPanelContent) {
        this.component.get("content").setChild(popUpPanelContent.component);
    }
    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        this.toggleContent();
    }

    toggleContent() {
        if (!justright_core_v1.StyleAccessor.from(this.component.get("arrow")).is("display","block")) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        justright_core_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_HIDDEN)
            .enable(PopUpPanel.CONTENT_VISIBLE);
        justright_core_v1.StyleAccessor.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").containerElement.focus();
    }

    hide() {
        justright_core_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_VISIBLE)
            .enable(PopUpPanel.CONTENT_HIDDEN);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}

class SlideDeckEntry {

    //static TEMPLATE_URL = "/assets/justrightjs-ui/slideDeckEntry.html";
    //static STYLES_URL = "/assets/justrightjs-ui/slideDeckEntry.css";

    static DEFAULT_CLASS = "slide-deck-entry";

    static ENTRY_POSITION_FRONT = "position-front";
    static ENTRY_POSITION_BEHIND = "position-behind";
    static ENTRY_POSITION_RIGHT = "position-right";

    static CONTENT_EXISTANCE_PRESENT = "existance-present";
    static CONTENT_EXISTANCE_REMOVED = "existance-removed";

    constructor() {
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Number} */
        this.index = 0;

        /** @type {String} */
        this.position = SlideDeckEntry.ENTRY_POSITION_FRONT;
    }

    /**
     * @returns {Stylesheet}
     * @param {StylesheetBuilder} stylesheetBuilder 
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".slide-deck-entry")
            .open()
                .style("box-shadow", "0px 0px 10px 10px #cccccc")
                .style("position", "relative")
                .style("background-color", "#ffffff")
                .style("grid-column", "1")
                .style("grid-row", "1")
                .style("width", "100%")
                .style("height", "100%")
                .style("min-height", "0")
            .close()

            .selector(".slide-deck-entry.position-front")
            .open()
                .style("transform", "translate(0%, 0%)")
                .style("transition", "transform .6s")
            .close()

            .selector(".slide-deck-entry.position-behind")
            .open()
                .style("transform", "translate(0%, 0%)")
                .style("transition", "transform .6s")
            .close()

            .selector(".slide-deck-entry.position-right")
            .open()
                .style("transform", "translate(+105%, 0%)")
                .style("transition", "transform .6s")
            .close()

            .selector(".slide-deck-entry-content.existance-removed")
            .open()
                .style("display", "none")
            .close()

            .selector(".slide-deck-entry-content.existance-present")
            .open()
                .style("position", "relative")
                .style("height", "100%")
            .close()

            .build()
    }

    /**
     * @returns {Component}
     * @param {ComponentBuilder} componentBuilder 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=slideDeckEntry", "class=slide-deck-entry")
            .open()
                .node("div", "id=slideDeckEntryContent", "class=slide-deck-entry-content")
            .close()
            .build();
    }

    /**
     * @returns {BaseElement}
     */
    get contentElement() {
        return this.component.get("slideDeckEntryContent");
    }

    /**
     * @returns {BaseElement}
     */
    get entryElement() {
        return this.component.get("slideDeckEntry");
    }

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeckEntry);
        justright_core_v1.CanvasStyles.enableStyle(SlideDeckEntry.name);
    }

    setIndex(index) {
        this.index = index;
    }

    setContent(component) {
        this.contentElement.setChild(component);
    }

    show() {
        this.setContentVisibility(SlideDeckEntry.CONTENT_EXISTANCE_PRESENT);
        this.setShift(SlideDeckEntry.ENTRY_POSITION_FRONT);
    }

    hide(nextIndex) {
        if (nextIndex > this.index) {
            this.setShift(SlideDeckEntry.ENTRY_POSITION_BEHIND);
        } else {
            this.setShift(SlideDeckEntry.ENTRY_POSITION_RIGHT);
        }
        this.adjustWhenHidden();
    }

    adjustWhenHidden() {
        coreutil_v1.TimePromise.asPromise(600, () => {
            if (this.position === SlideDeckEntry.ENTRY_POSITION_FRONT) {
                return;
            }
            this.setContentVisibility(SlideDeckEntry.CONTENT_EXISTANCE_REMOVED);
        });
    }

    setContentVisibility(contentVisibility) {
        justright_core_v1.StyleSelectorAccessor.from(this.contentElement).replace("existance-", contentVisibility);
    }

    setShift(position) {
        this.position = position;
        justright_core_v1.StyleSelectorAccessor.from(this.entryElement).replace("position-", position);
    }

}

class SlideDeck {

    static EVENT_ENTRY_CHANGED = "eventEntryChanged";

    /**
     * 
     * @param {Map<Component>} componentMap 
     */
    constructor(componentMap) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Map<Component>} */
        this.componentMap = componentMap;

        /** @type {Provider<SlideDeckEntry>} */
        this.slideDeckEntryProvider = mindi_v1.InjectionPoint.provider(SlideDeckEntry);

        /** @type {List<SlideDeckEntry>} */
        this.slideDeckEntryList = new coreutil_v1.List();

        /** @type {Map<SlideDeckEntry>} */
        this.slideDeckEntryMap = new coreutil_v1.Map();

        /** @type {Map<Number>} */
        this.slideDeckEntryIndexMap = new coreutil_v1.Map();

        /** @type {SlideDeckEntry} */
        this.currentEntry = null;

        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns 
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".slide-deck")
            .open()
                .style("position", "relative")
                .style("background-color", "#f1f1f1")
                .style("display", "grid")
                .style("height", "100%")
            .close()
            .build();
    }

    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=slideDeckEntries", "class=slide-deck")
            .build();
    }

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeck);
        justright_core_v1.CanvasStyles.enableStyle(SlideDeck.name);

        if (this.componentMap) {
            this.prepareEntries();
        }

        this.scrollback = () => {
            this.component.get("slideDeckEntries").element.parentElement.scrollTo(0,0);
        };
    }

    prepareEntries() {
        this.componentMap.forEach(async (key, component) => {

            const slideDeckEntry = await this.slideDeckEntryProvider.get();

            if (null == this.currentEntry) {
                slideDeckEntry.show();
                this.currentEntry = slideDeckEntry;
            } else {
                slideDeckEntry.hide(0);
            }

            this.slideDeckEntryMap.set(key, slideDeckEntry);
            this.slideDeckEntryList.add(slideDeckEntry);
            this.slideDeckEntryIndexMap.set(key, this.slideDeckEntryList.size() -1);

            slideDeckEntry.setContent(component);
            slideDeckEntry.setIndex(this.slideDeckEntryList.size() - 1);

            this.component.addChild("slideDeckEntries", slideDeckEntry.component);
            return true;
        }, this);
    }

    slideNext() {
        if (this.currentEntry.index + 1 >= this.slideDeckEntryList.size()) {
            return;
        }
        const nextEntry = this.slideDeckEntryList.get(this.currentEntry.index + 1);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();
        
        this.events.trigger(SlideDeck.EVENT_ENTRY_CHANGED);
    }

    slidePrevious() {
        if (this.currentEntry.index <= 0) {
            return;
        }
        const nextEntry = this.slideDeckEntryList.get(this.currentEntry.index - 1);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();

        this.events.trigger(SlideDeck.EVENT_ENTRY_CHANGED);
    }

    slideTo(name) {
        const nextEntry = this.slideDeckEntryMap.get(name);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();

        this.events.trigger(SlideDeck.EVENT_ENTRY_CHANGED);
    }

}

new coreutil_v1.Logger("RadioToggleIcon");

class RadioToggleIcon {
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * @param {object} model
     */
    constructor(name = "?", model = null, icon = "fas fa-question", label = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.enabled = false;

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.icon = icon;

        /** @type {string} */
        this.label = label;

        /** @type {boolean} */
        this.checked = false;
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".radio-toggle-icon-container")
            .open()
                .style("display", "inline-block")
                .style("margin", "5pt")
                .style("border-radius", "50%")
                .style("background-color", "transparent")
                .style("transition", "background-color 0.3s")
                .style("cursor", "pointer")
                .style("text-align", "center")
                .style("line-height", "24pt")
            .close()

            .selector(".radio-toggle-icon-radio")
            .open()
                .style("opacity", "0")
                .style("position", "absolute")
            .close()

            .selector(".radio-toggle-icon-label")
            .open()
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("transition", "all 0.3s ease")
            .close()

            .selector(".radio-toggle-icon-container input[type='radio']:not(:is(:checked)) + label")
            .open()
                .style("color", "lightgray")
            .close()

            .selector(".radio-toggle-icon-container input[type='radio']:not(:is(:checked)) + label:hover")
            .open()
                .style("color", "gray")
            .close()

            .selector(".radio-toggle-icon-container input[type='radio']:is(:checked) + label")
            .open()
                .style("color", "#2196F3")
            .close();
        return stylesheetBuilder.build();

    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("span", "id=container", "class=radio-toggle-icon-container")
            .open()
                .node("input", "id=radio", "class=radio-toggle-icon-radio", "type=radio")
                .node("label", "id=label", "class=radio-toggle-icon-label")
                .open()
                    .node("i", "id=icon", "title=")
                .close()
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(RadioToggleIcon);
        justright_core_v1.CanvasStyles.enableStyle(RadioToggleIcon.name);

        const radio = this.component.get("radio");
        radio.setAttributeValue("name", this.name);
        radio.listenTo("click", new coreutil_v1.Method(this, this.clicked));

        const id = radio.getAttributeValue("id");

        const label = this.component.get("label");
        label.setAttributeValue("for", id);

        const icon = this.component.get("icon");
        icon.setAttributeValue("class", this.icon);

        if (this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("radio"));
        }

    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        const oldValue = this.checked;
        this.checked = event.target.checked;

        if (oldValue !== this.checked) {
            this.events.trigger(RadioToggleIcon.EVENT_CHANGED, [event]);
        }

        if (this.checked) {
            this.events.trigger(RadioToggleIcon.EVENT_ENABLED, [event]);
        } else {
            this.events.trigger(RadioToggleIcon.EVENT_DISABLED, [event]);
        }
        
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} checked 
     */
    toggle(checked) {
        if (this.checked === checked) {
            return; // No change
        }
        this.checked = checked;
        if (this.component) {
            this.component.get("radio").containerElement.click();
        }
    }

    /**
     * Get the current toggle state
     * @returns {boolean}
     */
    isChecked() {
        return this.checked;
    }
}

new coreutil_v1.Logger("ToggleIcon");

class ToggleIcon {

    static TYPE_PRIMARY = "toggleIcon-primary";
    static TYPE_SECONDARY = "toggleIcon-secondary";
    static TYPE_SUCCESS = "toggleIcon-success";
    static TYPE_INFO = "toggleIcon-info";
    static TYPE_WARNING = "toggleIcon-warning";
    static TYPE_DANGER = "toggleIcon-danger";
    static TYPE_LIGHT = "toggleIcon-light";
    static TYPE_DARK = "toggleIcon-dark";

    static SIZE_MEDIUM = "toggleIcon-medium";
    static SIZE_LARGE = "toggleIcon-large";

    static SPINNER_VISIBLE = "toggleIcon-spinner-container-visible";
    static SPINNER_HIDDEN = "toggleIcon-spinner-container-hidden";

    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED

    /**
     * 
     * @param {String} name
     * @param {Object} model
     * @param {String} icon
     * @param {String} label
     */
    constructor(name = "?", model = null, label = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.enabled = false;

        /** @type {string} */
        this.name = name;

        /** @type {String} */
        this.label = label;

        /** @type {string} */
        this.enabledIcon = "fas fa-circle-check";

        /** @type {string} */
        this.disabledIcon = "fas fa-circle";

        /** @type {string} */
        this.disabledColor = "lightgray";

        /** @type {string} */
        this.enabledColor = "#2196F3";

        /** @type {string} */
        this.hoverColor = "gray";

        /** @type {EventManager} */
        this.eventManager = new justright_core_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".toggle-icon-container")
            .open()
                .style("display", "inline-block")
                .style("margin", "1pt")
                .style("border-radius", "50%")
                .style("background-color", "transparent")
                .style("transition", "background-color 0.3s")
                .style("text-align", "center")
                .style("line-height", "20pt")
            .close()

            .selector(".toggle-icon-radio")
            .open()
                .style("opacity", "0")
                .style("position", "absolute")
                .style("cursor", "pointer")
            .close()

            .selector(".toggle-icon-label")
            .open()
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("transition", "all 0.3s ease")
                .style("font-size", "20pt")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @return {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("span", "id=container", "class=toggle-icon-container")
            .open()
                .node("input", "id=checkbox", "class=toggle-icon-radio", "type=checkbox")
                .node("label", "id=label", "class=toggle-icon-label")
                .open()
                    .node("i", "id=icon", "title=")
                .close()
            .close()
            .build();
    }

    /** @type {EventManager<ToggleIcon>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create(ToggleIcon);
        justright_core_v1.CanvasStyles.enableStyle(ToggleIcon.name);

        const checkbox = this.component.get("checkbox");
        checkbox.setAttributeValue("name", this.name);
        checkbox.listenTo("change", new coreutil_v1.Method(this, this.changed));

        const container = this.component.get("container");
        container.listenTo("mouseover", new coreutil_v1.Method(this, this.enableHover));
        container.listenTo("mouseout", new coreutil_v1.Method(this, this.disableHover));

        const id = checkbox.getAttributeValue("id");

        const label = this.component.get("label");
        label.setAttributeValue("for", id);

        this.applyIcon(this.disabledIcon);
        this.applyColor(this.disabledColor);

    }

    loadIcons(disabledIcon, enabledIcon) {
        this.disabledIcon = disabledIcon;
        this.enabledIcon = enabledIcon;
        this.enabled ? this.applyIcon(this.enabledIcon) : this.applyIcon(this.disabledIcon);
    }

    loadColors(disabled, enabled, hover) {
        this.disabledColor = disabled;
        this.enabledColor = enabled;
        this.hoverColor = hover;
        this.enabled ? this.applyColor(this.enabledColor) : this.applyColor(this.disabledColor);
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("checkbox").listenTo("click", method);
        return this;
    }

    disable() {
        this.component.get("checkbox").setAttributeValue("disabled","true");
    }

    enable() {
        this.component.get("checkbox").removeAttribute("disabled");
    }

    /**
     * 
     * @param {ContainerEvent} event 
     * @returns 
     */
    changed(event) {
        this.enabled = event.target.checked;

        if (this.enabled) {
            this.applyIcon(this.enabledIcon);
            this.applyColor(this.enabledColor);
            this.eventManager.trigger(ToggleIcon.EVENT_ENABLED, event);
            return;
        }
        
        this.applyIcon(this.disabledIcon);
        this.applyColor(this.disabledColor);
        this.eventManager.trigger(ToggleIcon.EVENT_DISABLED, event);
    }

    applyColor(color) {
        const container = this.component.get("container");
        container.setAttributeValue("style", "color: " + color);
    }

    applyIcon(icon) {
        const iconElement = this.component.get("icon");
        iconElement.setAttributeValue("class", icon);
    }

    enableHover() {
        const container = this.component.get("container");
        if (!this.enabled) {
            container.setAttributeValue("style", "color: " + this.hoverColor);
        }
    }

    disableHover() {
        const container = this.component.get("container");
        if (this.enabled) {
            container.setAttributeValue("style", "color: " + this.enabledColor);
        } else {
            container.setAttributeValue("style", "color: " + this.disabledColor);
        }
    }
}

const LOG$1 = new coreutil_v1.Logger("TreePanelEntry");

class TreePanelEntry {

	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";
	static EVENT_EXPAND_TOGGLE_OVERRIDE = "expandToggleOverride";

    constructor(record = null) {

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {Provider<Panel>} */
		this.panelProvider = mindi_v1.InjectionPoint.provider(Panel);

		/** @type {EventManager} */
		this.eventManager = new justright_core_v1.EventManager();

        /** @type {StateManager<any[]>} */
        this.arrayState = new justright_core_v1.StateManager();

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvider = mindi_v1.InjectionPoint.provider(TreePanelEntry);

		/** @type {ToggleIcon} */
		this.expandToggle = mindi_v1.InjectionPoint.instance(ToggleIcon);

        /** @type {any} */
        this.record = record;
    }

	/**
	 * 
	 * @param {StylesheetBuilder} stylesheetBuilder 
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.media("@media (min-width: 734px)")
			.open()
				.selector(".tree-panel-entry")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()

				.selector(".tree-panel-entry-record-element")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
					.style("margin-bottom", "5px")
				.close()

				.selector(".tree-panel-entry-record-subrecord-elements-container")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
				.close()

				.selector(".tree-panel-entry-subrecord-elements")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()

				.selector(".tree-panel-entry-buttons-container")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
				.close()

				.selector(".tree-panel-entry-buttons")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()
			.close()

			.media("@media (max-width: 733px)")
			.open()
				.selector(".tree-panel-entry")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()

				.selector(".tree-panel-entry-record-element")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
					.style("margin-bottom", "5px")
				.close()

				.selector(".tree-panel-entry-record-subrecord-elements-container")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
				.close()

				.selector(".tree-panel-entry-subrecord-elements")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()

				.selector(".tree-panel-entry-buttons-container")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
				.close()

				.selector(".tree-panel-entry-buttons")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()
			.close()

			.selector(".tree-panel-entry-expand")
			.open()
				.style("position", "relative")
				.style("flex", "0 1 auto")
				.style("display", "flex")
				.style("padding-right", "5px")
			.close()

			.selector(".tree-panel-entry-subrecord-elements-indent")
			.open()
				.style("position", "relative")
				.style("flex", "0 0 18pt")
				.style("display", "flex")
				.style("flex-direction", "row")
			.close()

			.selector(".tree-panel-entry-record-element")
			.open()
				.style("position", "relative")
				.style("flex", "1 0 auto")
				.style("display", "flex")
				.style("flex-direction", "row")
			.close()

			.selector(".tree-panel-entry-buttons-indent")
			.open()
				.style("position", "relative")
				.style("flex", "0 0 18pt")
				.style("display", "flex")
				.style("flex-direction", "row")
			.close()
			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=tree-panel-entry")
			.open()
				.node("div", "class=tree-panel-entry-record-element", "id=recordElementContainer")
				.open()
					.node("div", "class=tree-panel-entry-expand", "id=expandButton")
					.node("div", "class=tree-panel-entry-record-element", "id=recordElement")
				.close()
				.node("div", "class=tree-panel-entry-buttons-container", "id=buttonsContainer")
				.open()
					.node("div", "class=tree-panel-entry-buttons-indent", "id=buttonsIndent")
					.node("div", "class=tree-panel-entry-buttons", "id=buttons")
				.close()
				.node("div", "class=tree-panel-entry-record-subrecord-elements-container", "id=subrecordElementsContainer")
				.open()
					.node("div", "class=tree-panel-entry-subrecord-elements-indent", "id=subrecordIndent")
					.node("div", "class=tree-panel-entry-subrecord-elements", "id=subrecordElements")
				.close()
			.close()
			.build();
	}

    async postConfig() {
		this.component = this.componentFactory.create(TreePanelEntry);
		justright_core_v1.CanvasStyles.enableStyle(TreePanelEntry.name);

		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_ENABLED, new coreutil_v1.Method(this, this.loadSubRecordsClicked));
		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_DISABLED, new coreutil_v1.Method(this, this.hideSubRecordsClicked));

		this.component.setChild("expandButton", this.expandToggle.component);

        this.arrayState.react(new coreutil_v1.Method(this, this.handleStateChange));

    }

	/**
	 * @returns { EventManager }
	 */
	get events() { return this.eventManager; }

    /**
     * @param {Object} object 
     */
    async handleStateChange(object) {
		if (object instanceof Array) {
			const panel = await this.panelProvider.get([
				Panel.PARAMETER_STYLE_TYPE_COLUMN, 
				Panel.PARAMETER_STYLE_CONTENT_ALIGN_LEFT, 
				Panel.PARAMETER_STYLE_SIZE_MINIMAL]);

			object.forEach(async (record) => {
				await this.populateRecord(panel, record);
			});

			this.component.setChild("subrecordElements", panel.component);
		}
    }

    /**
	 * @param {Component} panel
     * @param {any} record 
     */
    async populateRecord(panel, record) {
		const treePanelSubEntry = await this.treePanelEntryProvider.get([record]);

		const recordElement = await this.eventManager.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [null, record, treePanelSubEntry, this]);
        
		if (!recordElement) {
			return;
		}

		treePanelSubEntry.component.setChild("recordElement", recordElement.component);

		await this.eventManager
			.trigger(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, [null, treePanelSubEntry, record]);

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, new coreutil_v1.Method(this, this.entryRequested));

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, new coreutil_v1.Method(this, this.expandToggleOverride));

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, new coreutil_v1.Method(this, this.subRecordsUpdateRequested));

		panel.component.addChild("panel", treePanelSubEntry.component);
    }

	/**
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async entryRequested(event, record, treePanelEntry, parentTreePanelEntry) {
		try {
			return await this.events.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [event, record, treePanelEntry, parentTreePanelEntry]);
		} catch (error) {
			LOG$1.error(error);
		}
	}

	/**
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async expandToggleOverride(event, treePanelEntry, record) {
		try {
			return await this.events.trigger(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, [event, treePanelEntry, record]);
		} catch (error) {
			LOG$1.error(error);
		}
	}

	async reloadSubRecords() {
		const elementButtonsContainer = await this.component.get("buttons");
		await this.subRecordsUpdateRequested(null, this.record, this.arrayState, elementButtonsContainer);
	}

	/**
	 * @param {ContainerEvent} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 * @param {SimpleElement} elementButtonsContainer
	 */
	async subRecordsUpdateRequested(event, record, stateManager, elementButtonsContainer) {
		try {
			await this.events
				.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager, elementButtonsContainer]);
		} catch (error) {
			LOG$1.error(error);
		}
	}

	/**
	 * @param {ContainerEvent} event 
	 */
    async loadSubRecordsClicked(event) {
		const elementButtonsContainer = await this.component.get("buttons");
        this.eventManager
			.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, this.record, this.arrayState, elementButtonsContainer]);
    }

	/**
	 * @param {ContainerEvent} event 
	 */
    hideSubRecordsClicked(event) {
        this.component.get("subrecordElements").clear();
		this.component.get("buttons").clear();
    }

}

const LOG = new coreutil_v1.Logger("TreePanel");

class TreePanel {

	static EVENT_REFRESH_CLICKED = "refreshClicked";
	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";
	static EVENT_EXPAND_TOGGLE_OVERRIDE = "expandToggleOverride";

	/**
	 * 
	 * @param {Panel} buttonPanel 
	 */
	constructor(buttonPanel = null) {

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);
		
		/** @type {Component} */
		this.component = null;

		/** @type {EventManager} */
		this.eventManager = new justright_core_v1.EventManager();

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvier = mindi_v1.InjectionPoint.provider(TreePanelEntry);

		/** @type {TreePanelEntry} */
		this.treePanelEntry = null;

		/** @type {Panel} */
		this.buttonPanel = buttonPanel;

	}

	/**
	 * 
	 * @param {StylesheetBuilder} stylesheetBuilder 
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.media("@media (min-width: 734px)")
			.open()
				.selector(".tree-panel")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
					.style("justify-content", "top")
					.style("background-color", "#ffffff")
					.style("padding", "5px")
				.close()
			.close()

			.media("@media (max-width: 733px)")
			.open()
				.selector(".tree-panel")
				.open()
					.style("position", "relative")
					.style("display", "flex")
					.style("flex-direction", "column")
					.style("background-color", "#ffffff")
					.style("width", "100%")
					.style("padding", "5px")
				.close()
			.close()

			.selector(".tree-panel-content")
			.open()
				.style("position", "relative")
				.style("display", "flex")
				.style("flex-direction", "column")
				.style("flex", "1 0 auto")
			.close()

			.selector(".tree-panel-buttons")
			.open()
				.style("position", "relative")
				.style("flex", "0 1 auto")
				.style("padding-bottom", "5px")
			.close()

			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=tree-panel")
			.open()
				.node("div", "class=tree-panel-buttons", "id=buttonpanel")
				.node("div", "class=tree-panel-content", "id=rootelement")
			.close()
			.build();
	}

	async postConfig() {
		this.component = this.componentFactory.create(TreePanel);
		justright_core_v1.CanvasStyles.enableStyle(TreePanel.name);

		if (this.buttonPanel) {
			this.component.setChild("buttonpanel", this.buttonPanel.component);
		}

		this.treePanelEntry = await this.treePanelEntryProvier.get();
		this.treePanelEntry.events
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, new coreutil_v1.Method(this, this.entryRequested));
		this.treePanelEntry.events
			.listenTo(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, new coreutil_v1.Method(this, this.expandToggleOverride));
		this.treePanelEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, new coreutil_v1.Method(this, this.subRecordsUpdateRequested));
		// Root element has no record
		this.treePanelEntry.component.get("subrecordIndent").remove();
		this.treePanelEntry.component.get("recordElementContainer").remove();

	}

	/**
	 * @type { EventManager }
	 */
	get events() { return this.eventManager; }

	/**
	 * Called by the root TreePanelEntry when it's or one of it's subordinate elements need to be rendered
	 * 
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async entryRequested(event, record, treePanelEntry, parentTreePanelEntry) {
		LOG.info("Entry requested");
		try {

			/** @type {any} */
			const panel = await this.events
				.trigger(TreePanel.RECORD_ELEMENT_REQUESTED, [event, record, treePanelEntry, parentTreePanelEntry]);

			return panel;
		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * Called by the root TreePanelEntry it asks for the expand toggle to be overridden
	 * 
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async expandToggleOverride(event, treePanelEntry, record) {
		LOG.info("Expand Toggle Override requested");
		try {

			await this.events
				.trigger(TreePanel.EVENT_EXPAND_TOGGLE_OVERRIDE, [treePanelEntry.expandToggle, record]);

		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * Called by the root TreePanelEntry when it's or one of it's subordinate elements need the state of the subrecords to be updated,
	 * for example when the expand button is clicked
	 * 
	 * @param {ContainerEvent} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 * @param {SimpleElement} elementButtonsContainer
	 * @returns {Promise<TreePanelEntry[]>}
	 */
	async subRecordsUpdateRequested(event, record, stateManager, elementButtonsContainer) {
		try {
			await this.events
				.trigger(TreePanel.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager, elementButtonsContainer]);

		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * Reset
	 * 
	 * @param {ContainerEvent} event 
	 */
	async reset(event) {
		await this.subRecordsUpdateRequested(event, null, this.treePanelEntry.arrayState);
		this.component.setChild("rootelement", this.treePanelEntry.component);
	}
}

new coreutil_v1.Logger("Button");

class Button {

    static TYPE_PRIMARY = "button-primary";
    static TYPE_SECONDARY = "button-secondary";
    static TYPE_SUCCESS = "button-success";
    static TYPE_INFO = "button-info";
    static TYPE_WARNING = "button-warning";
    static TYPE_DANGER = "button-danger";
    static TYPE_LIGHT = "button-light";
    static TYPE_DARK = "button-dark";

    static SIZE_MEDIUM = "button-medium";
    static SIZE_LARGE = "button-large";

    static SPINNER_VISIBLE = "button-spinner-container-visible";
    static SPINNER_HIDDEN = "button-spinner-container-hidden";

    static EVENT_CLICKED = CommonEvents.CLICKED;

    /**
     * 
     * @param {String} label
     * @param {String} buttonType
     * @param {String} iconClass
     */
    constructor(label, buttonType = Button.TYPE_PRIMARY, buttonSize = Button.SIZE_MEDIUM, iconClass) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.label = label;

        /** @type {String} */
        this.buttonType = buttonType;

        /** @type {String} */
        this.buttonSize = buttonSize;

        /** @type {String} */
        this.iconClass = iconClass;

        /** @type {EventManager<Button>} */
        this.eventManager = new justright_core_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .media("(prefers-reduced-motion: reduce)")
            .open()
                .selector(".button")
                .open()
                    .style("transition", "none")
                .close()
            .close()

            .media("@-webkit-keyframes button-spinner-rotate")
            .open()
                .selector("0%")
                .open()
                    .style("-webkit-transform", "rotate(0deg)")
                    .style("transform", "rotate(0deg)")
                .close()

                .selector("100%")
                .open()
                    .style("-webkit-transform", "rotate(360deg)")
                    .style("transform", "rotate(360deg)")
                .close()
            .close()

            .media("@keyframes button-spinner-rotate")
            .open()
                .selector("0%")
                .open()
                    .style("-webkit-transform", "rotate(0deg)")
                    .style("transform", "rotate(0deg)")
                .close()

                .selector("100%")
                .open()
                    .style("-webkit-transform", "rotate(360deg)")
                    .style("transform", "rotate(360deg)")
                .close()
            .close()

            .selector(".button-outline")
            .open()
                .style("display", "inline-block")
                .style("vertical-align", "middle")
            .close()

            .selector(".button-spinner, .button-spinner:after")
            .open()
                .style("border-radius", "50%")
                .style("width", "1.5em")
                .style("height", "1.5em")
            .close()

            .selector(".button-spinner")
            .open()
                .style("margin", "0.5em")
                .style("display", "inline-block")
                .style("border-top", "0.2em solid rgba(128, 128, 128, 0.2)")
                .style("border-right", "0.2em solid rgba(128, 128, 128, 0.2)")
                .style("border-bottom", "0.2em solid rgba(128, 128, 128, 0.2)")
                .style("border-left", "0.2em solid #999999")
                .style("-webkit-transform", "translateZ(0)")
                .style("-ms-transform", "translateZ(0)")
                .style("transform", "translateZ(0)")
                .style("-webkit-animation", "button-spinner-rotate 1.1s infinite linear")
                .style("animation", "button-spinner-rotate 1.1s infinite linear")
            .close()

            .selector(".button-spinner-container-visible")
            .open()
                .style("display", "inline-block")
                .style("height", "2.5em")
                .style("vertical-align", "middle")
            .close()

            .selector(".button-spinner-container-hidden")
            .open()
                .style("display", "none")
                .style("height", "2.5em")
                .style("vertical-align", "middle")
            .close()

            .selector(".button")
            .open()
                .style("display", "inline-block")
                .style("font-weight", "400")
                .style("color", "#212529")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("-webkit-user-select", "none")
                .style("-moz-user-select", "none")
                .style("-ms-user-select", "none")
                .style("user-select", "none")
                .style("background-color", "transparent")
                .style("border", "1px solid transparent")
                .style("padding", "0.375rem 0.75rem")
                .style("line-height", "1.5")
                .style("border-radius", "0.25rem")
                .style("transition", "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".button-medium")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".button-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".button:hover")
            .open()
                .style("color", "#212529")
                .style("text-decoration", "none")
            .close()

            .selector(".button:focus, .button.focus")
            .open()
                .style("outline", "0")
                .style("box-shadow", "0 0 0 0.2rem rgba(0, 123, 255, 0.25)")
            .close()

            .selector(".button.disabled, .button:disabled")
            .open()
                .style("opacity", "0.65")
            .close();

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "primary",
            ColorPalette.PRIMARY_COLORS,
            ColorPalette.PRIMARY_HOVER_COLORS,
            ColorPalette.PRIMARY_DISABLED_COLORS,
            ColorPalette.PRIMARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus


        ElementThemeApplicator.apply(stylesheetBuilder, "button", "secondary",
            ColorPalette.SECONDARY_COLORS,
            ColorPalette.SECONDARY_HOVER_COLORS,
            ColorPalette.SECONDARY_DISABLED_COLORS,
            ColorPalette.SECONDARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus
        
        ElementThemeApplicator.apply(stylesheetBuilder, "button", "success",
            ColorPalette.SUCCESS_COLORS,
            ColorPalette.SUCCESS_HOVER_COLORS,
            ColorPalette.SUCCESS_DISABLED_COLORS,
            ColorPalette.SUCCESS_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "info",
            ColorPalette.INFO_COLORS,
            ColorPalette.INFO_HOVER_COLORS,
            ColorPalette.INFO_DISABLED_COLORS,
            ColorPalette.INFO_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "warning",
            ColorPalette.WARNING_COLORS,
            ColorPalette.WARNING_HOVER_COLORS,
            ColorPalette.WARNING_DISABLED_COLORS,
            ColorPalette.WARNING_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "danger",
            ColorPalette.DANGER_COLORS,
            ColorPalette.DANGER_HOVER_COLORS,
            ColorPalette.DANGER_DISABLED_COLORS,
            ColorPalette.DANGER_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "light",
            ColorPalette.LIGHT_COLORS,
            ColorPalette.LIGHT_HOVER_COLORS,
            ColorPalette.LIGHT_DISABLED_COLORS,
            ColorPalette.LIGHT_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "dark",
            ColorPalette.DARK_COLORS,
            ColorPalette.DARK_HOVER_COLORS,
            ColorPalette.DARK_DISABLED_COLORS,
            ColorPalette.DARK_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)"); // boxShadowActiveFocus

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=button-outline")
            .open()
                .node("button", "class=button", "id=button", "type=button")
                .node("div", "class=button-spinner-container-hidden", "id=spinnerContainer")
                .open()
                    .node("div", "class=button-spinner")
                .close()
            .close()
            .build();
    }

    /** @type {EventManager<Button>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create(Button);
        justright_core_v1.CanvasStyles.enableStyle(Button.name);
        if (this.iconClass) {
            this.component.get("button").addChild(justright_core_v1.HTML.i("", this.iconClass));
        }
        if (this.label) {
            this.component.get("button").addChild(this.label);
        }

        justright_core_v1.StyleSelectorAccessor.from(this.component.get("button"))
            .enable("button")
            .enable(this.buttonSize)
            .enable(this.buttonType);

        this.component.get("button").listenTo("click", new coreutil_v1.Method(this, (event) => {
            this.eventManager.trigger(Button.EVENT_CLICKED, event);
        }));
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("button").listenTo("click", method);
        return this;
    }

    enableLoading() {
        justright_core_v1.StyleSelectorAccessor.from(this.component.get("spinnerContainer"))
            .disable(Button.SPINNER_HIDDEN)
            .enable(Button.SPINNER_VISIBLE);
    }

    disableLoading() {
        justright_core_v1.StyleSelectorAccessor.from(this.component.get("spinnerContainer"))
            .disable(Button.SPINNER_VISIBLE)
            .enable(Button.SPINNER_HIDDEN);
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled","true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}

new coreutil_v1.Logger("CheckBox");

class CheckBox {

    /**
     * 
     * @param {string} name 
     * @param {object} model
     */
    constructor(name, model = null) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".check-box")
            .open()
                .style("display","block")
                .style("position","relative")
                .style("padding-left","2em")
                .style("margin-bottom","0.5em")
                .style("cursor","pointer")
                .style("-webkit-user-select","none")
                .style("-moz-user-select","none")
                .style("-ms-user-select","none")
                .style("user-select","none")
                .style("margin-bottom","1rem")
            .close()

            .selector(".check-box input")
            .open()
                .style("position","absolute")
                .style("opacity","0")
                .style("cursor","pointer")
                .style("height","0")
                .style("width","0")
            .close()

            .selector(".check-box-mark")
            .open()
                .style("position","absolute")
                .style("top","0")
                .style("left","0")
                .style("width","calc(1em + 0.5rem + 2px)")
                .style("height","calc(1em + 0.5rem + 2px)")
                .style("background-color","#eee")
            .close()

            .selector(".check-box:hover input ~ .check-box-mark")
            .open()
                .style("background-color","#ccc")
            .close()

            .selector(".check-box input:checked ~ .check-box-mark")
            .open()
                .style("background-color","#2196F3")
            .close()

            .selector(".check-box-mark:after")
            .open()
                .style("content","\"\"")
                .style("position","absolute")
                .style("display","none")
            .close()

            .selector(".check-box input:checked ~ .check-box-mark:after")
            .open()
                .style("display","block")
            .close()

            .selector(".check-box .check-box-mark:after")
            .open()
                .style("left","0.5em")
                .style("top","0.4em")
                .style("width","0.6em")
                .style("height","0.6em")
                .style("border","solid white")
                .style("border-width","0 3px 3px 0")
                .style("-webkit-transform","rotate(45deg)")
                .style("-ms-transform","rotate(45deg)")
                .style("transform","rotate(45deg)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
       componentBuilder
            .root("label", "id=check-box", "class=check-box")
            .open()
                .node("input", "id=checkBox", "type=checkbox")
                .node("span", "class=check-box-mark")
                .text(" Stay logged in")
            .close();
        return componentBuilder.build();
    }

    postConfig() {
        this.component = this.componentFactory.create(CheckBox);
        justright_core_v1.CanvasStyles.enableStyle(CheckBox.name);
        this.component.get("checkBox").setAttributeValue("name",this.name);

        if(this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("checkBox"));
        }
    }

}

new coreutil_v1.Logger("EmailInput");

class EmailInput extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Email";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(EmailInput,
            name,
            model,
            new justright_core_v1.EmailValidator(mandatory, !mandatory),
            placeholder,
            "emailInput",
            "emailError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".email-input-entry")
            .open()
                .style("display","block")
                .style("width","100%")
                .style("height","calc(1.5em + 0.75rem + 2px)")
                .style("padding","0.375rem 0.75rem")
                .style("font-size","1rem")
                .style("font-weight","400")
                .style("line-height","1.5")
                .style("color","#495057")
                .style("background-color","#fff")
                .style("background-clip","padding-box")
                .style("border","1px solid #ced4da")
                .style("border-radius","0.25rem")
                .style("transition","border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom","1rem")
            .close()

            .selector(".email-input-error")
            .open()
                .style("width","fit-content")
                .style("color","#333333")
                .style("transform","translate(+5px,-5px)")
                .style("background-color","#FFFFE0")
                .style("font-weight","normal")
                .style("font-size","14px")
                .style("border-radius","8px")
                .style("position","relative")
                .style("z-index","99999998")
                .style("box-sizing","border-box")
                .style("box-shadow","0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor","pointer")
            .close()

            .selector(".email-input-error-hidden")
            .open()
                .style("transition","max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity","0")
                .style("padding","0px 0px")
                .style("max-height","0px")
                .style("display","block")
                .style("visibility","hidden")
            .close()

            .selector(".email-input-error-visible")
            .open()
                .style("transition","max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity","1")
                .style("padding","10px 20px")
                .style("max-height","50px")
                .style("display","block")
                .style("visibility","visible")
                .style("margin-top","10px")
            .close()

            .selector(".email-input-error i")
            .open()
                .style("position","absolute")
                .style("top","100%")
                .style("left","30%")
                .style("margin-left","-15px")
                .style("width","30px")
                .style("height","15px")
                .style("overflow","hidden")
            .close()

            .selector(".email-input-error i::after")
            .open()
                .style("content","''")
                .style("position","absolute")
                .style("width","15px")
                .style("height","15px")
                .style("left","50%")
                .style("transform","translate(-50%,-50%) rotate(45deg)")
                .style("background-color","#FFFFE0")
                .style("box-shadow","0 1px 8px rgba(0,0,0,0.5)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @return {Component}
     */
    static buildComponent(componentBuilder) {
       componentBuilder
            .root("div")
            .open()
                .node("div", "id=emailError", "class=email-input-error email-input-error-hidden")
                .open()
                    .text("Invalid email address")
                    .node("i")
                .close()
                .node("input", "id=emailInput", "type=text", "class=email-input-entry")
            .close();
        return componentBuilder.build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-hidden"); }

}

class FileUploadEntry {
    
    static EVENT_REMOVE_CLICKED = "removeClicked";

    /**
     * 
     * @param {ContainerFileData} file 
     */
    constructor(file) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);
        
        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();
        
        /** @type {Component} */
        this.component = null;
        
        /** @type {ContainerFileData} */
        this.file = file;
        
        /** @type {string} */
        this.fileName = file.name;
        
        /** @type {number} */
        this.fileSize = file.size;
        
        /** @type {string} */
        this.fileType = file.type;
    }
    
    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".file-upload-entry")
            .open()
                .style("border-top", "1px solid #ddd")
                .style("padding-top", "5pt")
                .style("margin-top", "10pt")
            .close()

            .selector(".file-upload-entry-details")
            .open()
                .style("display", "flex")
                .style("flex-direction", "row")
                .style("align-items", "center")
                .style("margin-bottom", "8px")
            .close()

            .selector(".file-upload-entry-details-name")
            .open()
                .style("flex", "1")
                .style("font-weight", "500")
                .style("margin-right", "12px")
            .close()

            .selector(".file-upload-entry-details-type")
            .open()
                .style("flex", "0 0 auto")
                .style("color", "#666")
                .style("font-size", "0.9em")
                .style("margin-right", "12px")
            .close()

            .selector(".file-upload-entry-remove")
            .open()
                .style("flex", "0 0 auto")
                .style("margin-left", "auto")
                .style("cursor", "pointer")
                .style("color", "gray")
                .style("padding", "4px")
                .style("border-radius", "4px")
                .style("transition", "background-color 0.2s")
            .close()

            .selector(".file-upload-entry-remove:hover")
            .open()
                .style("background-color", "#f8f9fa")
            .close()

            .selector(".file-upload-entry-progress")
            .open()
                .style("display", "flex")
                .style("flex-direction", "row")
                .style("align-items", "center")
                .style("gap", "12px")
            .close()

            .selector(".file-upload-entry-progress-size")
            .open()
                .style("flex", "0 0 auto")
                .style("font-size", "0.9em")
                .style("color", "#666")
                .style("min-width", "80px")
            .close()

            .selector(".file-upload-entry-progress-bar")
            .open()
                .style("flex", "1")
                .style("height", "8px")
                .style("background-color", "#e9ecef")
                .style("border-radius", "4px")
                .style("overflow", "hidden")
                .style("position", "relative")
            .close()

            .selector(".file-upload-entry-progress-bar-fill")
            .open()
                .style("height", "100%")
                .style("background-color", "#28a745")
                .style("border-radius", "4px")
                .style("transition", "width 0.3s ease")
                .style("width", "0%")
            .close()

            .selector(".file-upload-entry-progress-status")
            .open()
                .style("flex", "0 0 auto")
                .style("font-size", "0.9em")
                .style("color", "#666")
                .style("min-width", "80px")
                .style("text-align", "right")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        componentBuilder
            .root("div", "class=file-upload-entry")
            .open()
                .node("div", "class=file-upload-entry-details")
                .open()
                    .node("div", "id=fileName", "class=file-upload-entry-details-name")
                    .open()
                        .text("Filename")
                    .close()
                    .node("div", "id=fileType", "class=file-upload-entry-details-type")
                    .open()
                        .text("File Type")
                    .close()
                    .node("div", "id=removeButton", "class=file-upload-entry-remove")
                    .open()
                        .node("i", "class=fas fa-trash")
                    .close()
                .close()
                .node("div", "class=file-upload-entry-progress")
                .open()
                    .node("div", "id=fileSize", "class=file-upload-entry-progress-size")
                    .open()
                        .text("File Size")
                    .close()
                    .node("div", "class=file-upload-entry-progress-bar", "id=fileProgress")
                    .open()
                        .node("div", "class=file-upload-entry-progress-bar-fill", "id=fileProgressBar")
                    .close()
                    .node("div", "id=fileStatus", "class=file-upload-entry-progress-status")
                .close()
            .close();
        return componentBuilder.build();
    }

    async postConfig() {
        this.component = this.componentFactory.create(FileUploadEntry);
        justright_core_v1.CanvasStyles.enableStyle(FileUploadEntry.name);
        
        const fileNameElement = this.component.get("fileName");
        fileNameElement.setChild(this.fileName);
        
        const fileSizeElement = this.component.get("fileSize");
        fileSizeElement.setChild((this.fileSize / 1024).toFixed(2) + " KB");
        
        const fileTypeElement = this.component.get("fileType");
        fileTypeElement.setChild(this.fileType ? this.fileType : "Unknown");

        const removeButton = this.component.get("removeButton");
        removeButton.listenTo("click", new coreutil_v1.Method(this, this.removeCliked));

        this.updateProgress(this.file, this.file.name);

        
    }
    
    /**
     * 
     * @param {ContainerEvent} event 
     */
    removeCliked(event) {
        this.events.trigger(FileUploadEntry.EVENT_REMOVE_CLICKED, [event, this.file]);
    }

    /**
     * 
     * @param {ContainerFileData} file 
     * @param {string} key 
     */
    updateProgress(file, key) {
        if (file) {
            const progressBar = this.component.get("fileProgressBar");
            progressBar.setStyle("width", file.uploadPercentage + "%");
            if (file.uploadPercentage >= 100) {
                file.uploadComplete = true;
            }
        }
    }
}

new coreutil_v1.Logger("FileUpload");

class FileUpload {

	static DEFAULT_PLACEHOLDER = "FileUpload";

	static EVENT_CLICKED = CommonEvents.CLICKED;
    static EVENT_FILE_ADDED = "fileAdded";
    static EVENT_FILE_REMOVED = "fileRemoved";
    static EVENT_UPLOAD_COMPLETE = "uploadComplete";
    static EVENT_UPLOAD_RESET = "uploadReset";

    /**
     * 
     * @param {string} name 
     * @param {boolean} multiple
     * @param {Array<string>} fileTypeArray
     */
    constructor(name, multiple = false, fileTypeArray = []) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {boolean} */
        this.multiple = multiple;
        
        /** @type {string[]} */
        this.fileTypeArray = fileTypeArray;

        /** @type {StateManager<ContainerFileData>}  */
        this.fileArrayState = new justright_core_v1.StateManager();

        /** @type {Provider<FileUploadEntry>} */
        this.fileUploadEntryProvider = mindi_v1.InjectionPoint.provider(FileUploadEntry);

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
           .selector(".file-upload-error")
           .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
           .close()

           .selector(".file-upload-error-hidden")
           .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
           .close()

           .selector(".file-upload-error-visible")
           .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
           .close()

           .selector(".file-upload-error i")
           .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
           .close()

           .selector(".file-upload-box")
           .open()
                .style("border", "2px dashed #ced4da")
                .style("border-radius", "0.25rem")
                .style("padding", "1rem")
                .style("cursor", "pointer")
                .style("transition", "background-color 0.15s ease-in-out, border-color 0.15s ease-in-out")
                .style("margin-bottom", "15pt")
           .close()

           .selector(".file-upload-box-instructions")
           .open()
                .style("text-align", "center")
           .close()

           .selector(".file-upload-box-instructions-icon")
           .open()
                .style("width", "48px")
                .style("height", "48px")
                .style("margin", "0 auto 0 auto")
                .style("background-size", "contain")
                .style("background-repeat", "no-repeat")
                .style("background-position", "center")
                .style("color", "#e1e1e1")
                .style("font-size", "3rem")
           .close()

           .selector(".file-upload-box-instructions-text")
           .open()
                .style("font-size", "1rem")
                .style("color", "#6c757d")
           .close()

           .selector(".file-upload-box-dragover")
           .open()
                .style("background-color", "#e9ecef")
                .style("border-color", "#80bdff")
           .close()

           .selector(".file-upload-input")
           .open()
                .style("display", "none")
           .close()

           .selector(".file-upload-unsupported-file")
           .open()
                .style("color", "#dc3545")
                .style("font-size", "0.875rem")
                .style("padding", "0.25rem 0")
                .style("border-left", "3px solid #dc3545")
                .style("padding-left", "0.5rem")
                .style("margin-top", "0.50rem")
                .style("background-color", "#f8d7da")
                .style("border-radius", "0.25rem")
           .close();
         return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        componentBuilder
            .root("div")
            .open()
                .node("div", "id=fileUploadError", "class=file-upload-error file-upload-error-hidden")
                .open()
                    .text("Invalid file-upload")
                    .node("i")
                .close()
                .node("div", "id=uploadBox", "class=file-upload-box")
                .open()
                    .node("div", "id=instructions", "class=file-upload-box-instructions")
                    .open()
                        .node("input", "id=fileInput", "type=file", "class=file-upload-input")
                        .node("div", "id=uploadBoxIcon", "class=fas fa-upload file-upload-box-instructions-icon")
                    .close()
                    .node("div", "id=unsupported")
                    .node("div", "id=fileList")
                .close()
            .close();
        return componentBuilder.build();
    }

    postConfig() {
        this.component = this.componentFactory.create(FileUpload);
        justright_core_v1.CanvasStyles.enableStyle(FileUpload.name);

        
        /** @type {SimpleElement} */
        const uploadBox = this.component.get("uploadBox");
        uploadBox.listenTo("dragover", new coreutil_v1.Method(this, this.dragOver));
        uploadBox.listenTo("dragleave", new coreutil_v1.Method(this, this.dragLeave));
        uploadBox.listenTo("drop", new coreutil_v1.Method(this, this.fileDropped));
        uploadBox.listenTo("click", new coreutil_v1.Method(this, this.fileInputClicked));

        if (this.multiple) {
            const fileInput = this.component.get("fileInput");
            fileInput.containerElement.setAttributeValue("multiple", "multiple");
        }

        const fileInput = this.component.get("fileInput");
        fileInput.listenTo("change", new coreutil_v1.Method(this, this.fileInputChanged));

    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    fileInputClicked(event) {
        const fileInput = this.component.get("fileInput");
        fileInput.containerElement.value = null;
        fileInput.containerElement.click();
    }


    /**
     * @param {ContainerEvent} event
     */
    fileInputChanged(event) {
        this.processFiles(event.files);
    }

    /**
     * Process uploaded files and validate against file type array
     * @param {ContainerFileData[]} files
     */
    async processFiles(files) {
        const supportedFiles = [];
        const unsupportedFiles = [];
        const addedFiles = [];

        for (const file of files) {
            const supportedFile = this.isFileTypeSupported(file);
            const fileAlreadySeleted = this.fileAlreadySeleted(file);
            if (supportedFile && !fileAlreadySeleted) {
                supportedFiles.push(file);
            }
            if (!supportedFile) {
                unsupportedFiles.push(file);
            }
        }

        // Handle supported files
        if (supportedFiles.length > 0) {
            if (this.multiple === false) {
                this.fileArrayState.clear();
            }
            for (const file of supportedFiles) {
                addedFiles.push(await this.fileArrayState.update(file, file.name));
                if (this.multiple === false) {
                    break;
                }
            }
        }

        // Show unsupported files
        this.showUnsupportedFiles(unsupportedFiles);
        await this.updateFileList();

        // Trigger file added event for each supported file
        for (const file of addedFiles) {
            this.events.trigger(FileUpload.EVENT_FILE_ADDED, [file]);
        }
    }

    fileAlreadySeleted(file) {
        return this.fileArrayState.objectMap.has(file.name);
    }

    /**
     * Check if file type is supported
     * @param {ContainerFileData} file
     * @returns {boolean}
     */
    isFileTypeSupported(file) {
        // If fileTypeArray is empty, accept all files
        if (this.fileTypeArray.length === 0) {
            return true;
        }

        // Check if file's MIME type matches any in the fileTypeArray
        return this.fileTypeArray.includes(file.type);
    }

    /**
     * Display unsupported files in the unsupported div
     * @param {Array<File>} unsupportedFiles
     */
    showUnsupportedFiles(unsupportedFiles) {
        const unsupportedDiv = this.component.get("unsupported");
        unsupportedDiv.clear();

        if (unsupportedFiles.length > 0) {
            unsupportedDiv.clear();
            for (const file of unsupportedFiles) {
                const messageElement = justright_core_v1.HTML.custom("div");
                messageElement.setAttributeValue("class","file-upload-unsupported-file");
                messageElement.setChild(`File "${file.name}" is not supported.`);
                unsupportedDiv.addChild(messageElement);
            }
        }
    }

    /**
     * @param {ContainerEvent} event
     */
    dragOver(event) {
        event.preventDefault();
        event.stopPropagation();

        const uploadBox = this.component.get("uploadBox");
        justright_core_v1.StyleSelectorAccessor.from(uploadBox).enable("file-upload-box-dragover");
    }

    /**
     * @param {ContainerEvent} event
     */
    dragLeave(event) {
        event.preventDefault();
        event.stopPropagation();

        const uploadBox = this.component.get("uploadBox");
        justright_core_v1.StyleSelectorAccessor.from(uploadBox).disable("file-upload-box-dragover");
    }

    /**
     *  @param {ContainerEvent} event
     */
    fileDropped(event) {
        event.preventDefault();
        event.stopPropagation();

        const uploadBox = this.component.get("uploadBox");
        justright_core_v1.StyleSelectorAccessor.from(uploadBox).disable("file-upload-box-dragover");

        this.processFiles(event.files);
    }

    async updateFileList() {
        const fileList = this.component.get("fileList");
        fileList.clear();
        this.events.trigger(FileUpload.EVENT_UPLOAD_RESET);
        for (const file of this.fileArrayState.objectMap.values()) {
            const fileEntry = await this.fileUploadEntryProvider.get([file]);
            fileEntry.events.listenTo(FileUploadEntry.EVENT_REMOVE_CLICKED, new coreutil_v1.Method(this, this.removeFileEntry, [fileEntry]));
            this.fileArrayState.reactTo(file.name, new coreutil_v1.Method(fileEntry, fileEntry.updateProgress));
            fileList.addChild(fileEntry.component);
        }
        this.fileArrayState.react(new coreutil_v1.Method(this, this.checkFileUploadComplete));
    }

    checkFileUploadComplete() {
        if (this.fileArrayState.objectMap.size === 0) {
            this.events.trigger(FileUpload.EVENT_UPLOAD_RESET);
            return;
        }
        for (const file of this.fileArrayState.objectMap.values()) {
            if (!file.uploadComplete) {
                return;
            }
        }
        this.events.trigger(FileUpload.EVENT_UPLOAD_COMPLETE, [this.fileArrayState.objectArray]);
    }

    /**
     * 
     * @param {ContainerEvent} event
     * @param {File} file
     * @param {any} args
     */
    async removeFileEntry(event, file, args) {
        this.fileArrayState.delete(file.name);
        // Clear unsupported files when updating file list
        const unsupportedDiv = this.component.get("unsupported");
        unsupportedDiv.clear();
        await this.updateFileList();
        // Prevent the click event from bubbling up to the upload box
        event.stopPropagation();
        this.checkFileUploadComplete();
    }

    clicked(event) {
        this.events.trigger(FileUpload.EVENT_CLICKED, [event]);
    }

    focus() {

    }
}

new coreutil_v1.Logger("HiddenInput");

class HiddenInput extends CommonInput {

    /**
     * 
     * @param {string} name
     * @param {object} model
     */
    constructor(name, model = null) {

        super(HiddenInput,
            name,
            model,
            null,
            null,
            "hiddenInput");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".hidden-input-entry")
            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("input", "id=hiddenInput", "type=hidden", "class=hidden-input-entry")
            .build();
    }

}

new coreutil_v1.Logger("TextInput");

class NumberInput extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Number";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = NumberInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(NumberInput,
            name,
            model,
            new justright_core_v1.NumberValidator(mandatory, !mandatory),
            placeholder,
            "numberInput",
            "numberError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".number-input-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".number-input-error")
            .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
            .close()

            .selector(".number-input-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".number-input-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".number-input-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".number-input-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div")
            .open()
                .node("div", "id=numberError", "class=number-input-error number-input-error-hidden")
                .open()
                    .text("Invalid value")
                    .node("i")
                .close()
                .node("input", "id=numberInput", "type=number", "pattern=[0-9]*", "inputmode=numeric", "class=number-input-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "number-input-error number-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "number-input-error number-input-error-hidden"); }
}

new coreutil_v1.Logger("PasswordInput");

class PasswordInput extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordInput,
            name,
            model,
            new justright_core_v1.RequiredValidator(!mandatory),
            placeholder,
            "passwordInput",
            "passwordError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".password-input-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".password-input-error")
            .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
            .close()

            .selector(".password-input-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".password-input-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".password-input-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".password-input-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div")
            .open()
                .node("div", "id=passwordError", "class=password-input-error password-input-error-hidden")
                .open()
                    .text("Password required")
                    .node("i")
                .close()
                .node("input", "id=passwordInput", "type=password", "class=password-input-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-hidden"); }
}

new coreutil_v1.Logger("PasswordMatcherInputValue");

class PasswordMatcherInputValue extends CommonInput {

    static DEFAULT_PLACEHOLDER = "New password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordMatcherInputValue,
            name,
            model,
            new justright_core_v1.PasswordValidator(mandatory),
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".password-matcher-input-value-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".password-matcher-input-value-error")
            .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
            .close()

            .selector(".password-matcher-input-value-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".password-matcher-input-value-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "250px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".password-matcher-input-value-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".password-matcher-input-value-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close()

            .selector(".password-matcher-input-value-crieria-list")
            .open()
                .style("margin-top", "0")
                .style("margin-bottom", "0")
                .style("padding-inline-start", "2em")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div")
            .open()
                .node("div", "id=passwordMatcherInputValueError", "class=password-matcher-input-value-error password-matcher-input-value-error-hidden")
                .open()
                    .text("Minimum 8 characters containing:")
                    .node("ul", "class=password-matcher-input-value-crieria-list")
                    .open()
                        .node("li")
                        .open()
                            .text("Letter(s)")
                        .close()
                        .node("li")
                        .open()
                            .text("Number(s)")
                        .close()
                        .node("li")
                        .open()
                            .text("Special character(s) #?!@$%^&*-")
                        .close()
                    .close()
                    .node("i")
                .close()
                .node("input", "autocomplete=new-password", "id=passwordMatcherInputValueField", "type=password", "class=password-matcher-input-value-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-value-error password-matcher-input-value-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-value-error password-matcher-input-value-error-hidden"); }
}

new coreutil_v1.Logger("PasswordMatcherInputControl");

class PasswordMatcherInputControl extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Confirm password";
    
    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} modelComparedPropertyName
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, modelComparedPropertyName = null, placeholder = TextInput.DEFAULT_PLACEHOLDER,
           mandatory = false) {

        super(PasswordMatcherInputControl,
            name,
            model,
            new justright_core_v1.EqualsPropertyValidator(mandatory, false, model, modelComparedPropertyName),
            placeholder,
            "passwordMatcherInputControlField",
            "passwordMatcherInputControlError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".password-matcher-input-control-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".password-matcher-input-control-error")
            .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
            .close()

            .selector(".password-matcher-input-control-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".password-matcher-input-control-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".password-matcher-input-control-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".password-matcher-input-control-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div")
            .open()
                .node("div", "id=passwordMatcherInputControlError", "class=password-matcher-input-control-error password-matcher-input-control-error-hidden")
                .open()
                    .text("Passwords must match")
                    .node("i")
                .close()
                .node("input", "id=passwordMatcherInputControlField", "type=password", "autocomplete=new-password", "class=password-matcher-input-control-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-control-error password-matcher-input-control-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-control-error password-matcher-input-control-error-hidden"); }
}

class PasswordMatcherModel {

    constructor() {
        this.newPassword = null;
        this.controlPassword = null;
    }

    setNewPassword(newPassword) {
        this.newPassword = newPassword;
    }

    getNewPassword() {
        return this.newPassword;
    }

    setControlPassword(controlPassword) {
        this.controlPassword = controlPassword;
    }

    getControlPassword() {
        return this.controlPassword;
    }

}

new coreutil_v1.Logger("PasswordMatcherInput");

class PasswordMatcherInput {

	static EVENT_VALIDATED_ENTERED = "validatedEntered";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {string} controlPlaceholder
     * @param {boolean} mandatory
     */
    constructor(name,
        model = null,
        placeholder = PasswordMatcherInput.DEFAULT_PLACEHOLDER, 
        controlPlaceholder = PasswordMatcherInput.DEFAULT_CONTROL_PLACEHOLDER,
        mandatory = false) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {AndValidatorSet} */
        this.validator = null;

        this.passwordMatcherModel = new PasswordMatcherModel();

        this.name = name;
        this.model = model;

        /** @type {PasswordMatcherInputValue} */
		this.passwordMatcherInputValue = mindi_v1.InjectionPoint.instance(PasswordMatcherInputValue,
            ["newPassword", this.passwordMatcherModel, placeholder, mandatory]
		);

        /** @type {PasswordMatcherInputControl} */
		this.passwordMatcherInputControl = mindi_v1.InjectionPoint.instance(PasswordMatcherInputControl,
            ["controlPassword", this.passwordMatcherModel, "newPassword", controlPlaceholder, mandatory]
		);

        /** @type {EventManager} */
        this.eventManager = new justright_core_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
           .selector(".password-matcher-input-hint")
           .open()
               .style("color", "#888888")
               .style("font-size", "0.8em")
               .style("margin-bottom", "1rem")
               .style("white-space", "nowrap")
           .close();

       return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=password-matcher-input-root")
            .open()
                .node("div", "id=passwordMatcherInputValue")
                .node("div", "id=passwordMatcherInputControl")
                .node("div", "class=password-matcher-input-hint")
                .open()
                    .text("* Must contain letters, numbers and special characters")
                .close()
            .close()
            .build();
    }

    async postConfig() {
        this.component = this.componentFactory.create(PasswordMatcherInput);

        justright_core_v1.CanvasStyles.enableStyle(PasswordMatcherInput.name);

        this.component.setChild("passwordMatcherInputValue",this.passwordMatcherInputValue.component);
        this.component.setChild("passwordMatcherInputControl",this.passwordMatcherInputControl.component);

        this.passwordMatcherInputValue.events
            .listenTo(CommonInput.EVENT_ENTERED, new coreutil_v1.Method(this, this.passwordValueEntered))
            .listenTo(CommonInput.EVENT_KEYUPPED, new coreutil_v1.Method(this, this.passwordValueChanged));

        this.passwordMatcherInputControl.events
            .listenTo(CommonInput.EVENT_ENTERED, new coreutil_v1.Method(this, this.passwordControlEntered));

        /** @type {AndValidatorSet} */
        this.validator = new justright_core_v1.AndValidatorSet()
            .withValidator(this.passwordMatcherInputValue.validator)
            .withValidator(this.passwordMatcherInputControl.validator)
            .withValidListener(new coreutil_v1.Method(this, this.passwordMatcherValidOccured));

    }

    get events() { return this.eventManager; }

    passwordMatcherValidOccured() {
        coreutil_v1.PropertyAccessor.setValue(this.model, this.name, this.passwordMatcherModel.getNewPassword());
    }

    passwordValueEntered(event) {
        if (this.passwordMatcherInputValue.validator.isValid()) {
            this.passwordMatcherInputControl.focus();
        }
    }

    passwordValueChanged(event) {
        this.passwordMatcherInputControl.clear();
    }

    passwordControlEntered(event) {
        if (this.validator.isValid()) {
            this.events.trigger(PasswordMatcherInput.EVENT_VALIDATED_ENTERED, event);
        }
    }

    focus() { this.passwordMatcherInputValue.focus(); }
    selectAll() { this.passwordMatcherInputValue.selectAll(); }
    enable() { this.passwordMatcherInputValue.enable(); this.passwordMatcherInputControl.enable(); }
    disable() { this.passwordMatcherInputValue.disable(); this.passwordMatcherInputControl.disable(); }
    clear() { this.passwordMatcherInputValue.clear(); this.passwordMatcherInputControl.clear(); }
}

new coreutil_v1.Logger("PhoneInput");

class PhoneInput extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Phone";
    
    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PhoneInput,
            name,
            model,
            new justright_core_v1.PhoneValidator(mandatory, !mandatory),
            placeholder,
            "phoneInput",
            "phoneError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".phone-input-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".phone-input-error")
            .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
            .close()

            .selector(".phone-input-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".phone-input-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "150px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".phone-input-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".phone-input-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        componentBuilder
            .root("div")
            .open()
                .node("div", "id=phoneError", "class=phone-input-error phone-input-error-hidden")
                .open()
                    .text("Invalid phone number")
                    .node("ul", "class=phone-matcher-input-value-crieria-list")
                    .open()
                        .node("li")
                        .open()
                            .text("Must start with + sign")
                        .close()
                        .node("li")
                        .open()
                            .text("followed by minimum 8 numbers")
                        .close()
                    .close()
                    .node("i")
                .close()
                .node("input", "id=phoneInput", "type=text", "class=phone-input-entry")
            .close();
        return componentBuilder.build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "phone-input-error phone-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "phone-input-error phone-input-error-hidden"); }
}

new coreutil_v1.Logger("RadioButton");

class RadioButton {
    
    static EVENT_CLICKED = CommonEvents.CLICKED;

    /**
     * 
     * @param {string} name 
     * @param {object} model
     */
    constructor(name, model = null) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".radio-button")
            .open()
                .style("display", "block")
                .style("position", "relative")
                .style("padding-left", "2em")
                .style("margin-bottom", "0.5em")
                .style("cursor", "pointer")
                .style("-webkit-user-select", "none")
                .style("-moz-user-select", "none")
                .style("-ms-user-select", "none")
                .style("user-select", "none")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".radio-button input")
            .open()
                .style("position", "absolute")
                .style("opacity", "0")
                .style("cursor", "pointer")
                .style("height", "0")
                .style("width", "0")
            .close()

            .selector(".radio-button-mark")
            .open()
                .style("position", "absolute")
                .style("top", "0")
                .style("left", "0")
                .style("width", "20pt")
                .style("height", "20pt")
                .style("background-color", "#ddd")
                .style("border-radius", "50%")
                .style("border-width", "1pt")
                .style("border-style", "solid")
                .style("border-color", "#bbb")
            .close()

            .selector(".radio-button:hover input ~ .check-box-mark")
            .open()
                .style("background-color", "#2196F3")
            .close()

            .selector(".radio-button input:checked ~ .radio-button-mark")
            .open()
                .style("background-color", "#ddd")
            .close()

            .selector(".radio-button-mark:after")
            .open()
                .style("content", "\"\"")
                .style("position", "absolute")
                .style("display", "none")
            .close()

            .selector(".radio-button input:checked ~ .radio-button-mark:after")
            .open()
                .style("display", "block")
            .close()

            .selector(".radio-button .radio-button-mark:after")
            .open()
                .style("left", "50%")
                .style("top", "50%")
                .style("transform", "translate(-50%, -50%)")
                .style("width", "14pt")
                .style("height", "14pt")
                .style("background-color", "#2196F3")
                .style("border-radius", "50%")
            .close();
        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("label", "class=radio-button")
            .open()
                .node("input", "id=radio", "type=radio")
                .node("span", "class=radio-button-mark")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(RadioButton);
        justright_core_v1.CanvasStyles.enableStyle(RadioButton.name);
        this.component.get("radio").setAttributeValue("name",this.name);

        if (this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("radio"));
        }

        this.component.get("radio").listenTo("click", new coreutil_v1.Method(this, this.clicked));
    }

    clicked(event) {
        this.events.trigger(RadioButton.EVENT_CLICKED, [event]);
    }

}

new coreutil_v1.Logger("RadioToggleSwitch");

class RadioToggleSwitch {
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * 
     * @param {object} model
     */
    constructor(model = null) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.checked = false;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".radio-toggle-switch")
            .open()
                .style("position", "relative")
                .style("display", "inline-block")
                .style("width", "41pt")
                .style("height", "24pt")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".radio-toggle-switch input")
            .open()
                .style("opacity", "0")
                .style("width", "0")
                .style("height", "0")
            .close()

            .selector(".radio-toggle-switch-slider")
            .open()
                .style("position", "absolute")
                .style("cursor", "pointer")
                .style("top", "0")
                .style("left", "0")
                .style("right", "0")
                .style("bottom", "0")
                .style("background-color", "#ccc")
                .style("border-radius", "24pt")
                .style("transition", ".4s")
                .style("border-width", "1pt")
                .style("border-style", "solid")
                .style("border-color", "#bbb")
            .close()

            .selector(".radio-toggle-switch-slider:before")
            .open()
                .style("position", "absolute")
                .style("content", "\"\"")
                .style("height", "17pt")
                .style("width", "17pt")
                .style("left", "3.5pt")
                .style("bottom", "3.5pt")
                .style("background-color", "white")
                .style("border-radius", "50%")
                .style("transition", ".4s")
                .style("transform", "translateX(0)")
            .close()

            .selector(".radio-toggle-switch:hover .radio-toggle-switch-slider")
            .open()
                .style("background-color", "#bbb")
            .close()

            .selector(".radio-toggle-switch input:checked + .radio-toggle-switch-slider")
            .open()
                .style("background-color", "#2196F3")
                .style("border-color", "#1976D2")
            .close()

            .selector(".radio-toggle-switch input:checked + .radio-toggle-switch-slider:before")
            .open()
                .style("transform", "translateX(17pt)")
            .close()

            .selector(".radio-toggle-switch input:focus + .radio-toggle-switch-slider")
            .open()
                .style("box-shadow", "0 0 1pt #2196F3")
            .close()

            .selector(".radio-toggle-switch input:disabled + .radio-toggle-switch-slider")
            .open()
                .style("opacity", "0.6")
                .style("cursor", "not-allowed")
            .close()

            .selector(".radio-toggle-switch input:disabled:hover + .radio-toggle-switch-slider")
            .open()
                .style("background-color", "#ccc")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} conmponentBuilder 
     * @returns {Component}
     */
    static buildComponent(conmponentBuilder) {
        return conmponentBuilder
            .root("label", "class=radio-toggle-switch")
            .open()
                .node("input", "id=checkbox", "type=checkbox")
                .node("span", "class=radio-toggle-switch-slider")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(RadioToggleSwitch);
        justright_core_v1.CanvasStyles.enableStyle(RadioToggleSwitch.name);

        if (this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("checkbox"));
        }

        this.component.get("checkbox").listenTo("change", new coreutil_v1.Method(this, this.clicked));
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        const oldValue = this.checked;
        this.checked = event.target.checked;

        if (oldValue !== this.checked) {
            this.events.trigger(RadioToggleSwitch.EVENT_CHANGED, [event]);
        }

        if (this.checked) {
            this.events.trigger(RadioToggleSwitch.EVENT_ENABLED, [event]);
        } else {
            this.events.trigger(RadioToggleSwitch.EVENT_DISABLED, [event]);
        }
        
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} checked 
     */
    toggle(checked) {
        if (this.checked === checked) {
            return; // No change
        }
        this.checked = checked;
        if (this.component) {
            this.component.get("checkbox").containerElement.click();
        }
    }

    /**
     * Get the current toggle state
     * @returns {boolean}
     */
    isChecked() {
        return this.checked;
    }

}

new coreutil_v1.Logger("Select");

class Select {

	static DEFAULT_PLACEHOLDER = "Select";

	static EVENT_CLICKED = CommonEvents.CLICKED;

    /**
     * 
     * @param {string} name 
     * @param {object} model
     * @param {Array<OptionElement>} options
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, options = [], placeholder = Select.DEFAULT_PLACEHOLDER, mandatory = false) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {Array<OptionElement>} */
        this.optionsArray = options;

        /** @type {string} */
        this.placeholder = placeholder;

        /** @type {boolean} */
        this.mandatory = mandatory;

        /** @type {object} */
        this.model = model;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".select-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1pt solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
                .style("appearance", "none")
                .style("-webkit-appearance", "none")
                .style("-moz-appearance", "none")
                .style("background-image", "url(\"data:image/svg+xml;utf8,<svg fill='2196F3' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")")
                .style("background-repeat", "no-repeat")
                .style("background-position", "right 0.75rem center")
                .style("background-size", "1.5em")
            .close()

            .selector(".select-error")
            .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1pt 8pt rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
            .close()

            .selector(".select-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".select-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".select-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15pt")
                .style("width", "30pt")
                .style("height", "15pt")
                .style("overflow", "hidden")
            .close()

            .selector(".select-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15pt")
                .style("height", "15pt")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1pt 8pt rgba(0,0,0,0.5)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div")
            .open()
                .node("div", "id=selectError", "class=select-error select-error-hidden")
                .open()
                    .text("Invalid selection")
                    .node("i")
                .close()
                .node("select", "id=select", "class=select-entry")
            .close();
    }

    postConfig() {
        this.component = this.componentFactory.create(Select);
        justright_core_v1.CanvasStyles.enableStyle(Select.name);

		/** @type {SelectElement} */
		const select = this.component.get("select");

        select.name = this.name;

        if (this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("select"));
        }

		if (this.optionsArray && this.optionsArray.length > 0) {
			select.options = this.optionsArray;
		}

        select.listenTo("click", new coreutil_v1.Method(this, this.clicked));
    }

	/**
	 * @param {Array<OptionElement>} optionsArray
	 */
	set options(optionsArray) {
		this.optionsArray = optionsArray;
		if (this.component) {
			/** @type {SelectElement} */
			const select = this.component.get("select");
			if (select && this.optionsArray && this.optionsArray.length > 0) {
				select.options = this.optionsArray;
			}
		}
	}

    clicked(event) {
        this.events.trigger(Select.EVENT_CLICKED, [event]);
    }

}

new coreutil_v1.Logger("TextInput");

class TextInput$1 extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Text";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput$1.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(TextInput$1,
            name,
            model,
            new justright_core_v1.RequiredValidator(false, mandatory),
            placeholder,
            "textInput",
            "textError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".text-input-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".text-input-error")
            .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
            .close()

            .selector(".text-input-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".text-input-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".text-input-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".text-input-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                 .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div")
            .open()
                .node("div", "id=textError", "class=text-input-error text-input-error-hidden")
                .open()
                    .text("Invalid value")
                    .node("i")
                .close()
                .node("input", "id=textInput", "type=text", "class=text-input-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "text-input-error text-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "text-input-error text-input-error-hidden"); }
}

exports.BackShade = BackShade;
exports.BackShadeListeners = BackShadeListeners;
exports.Background = Background;
exports.BackgroundVideo = BackgroundVideo;
exports.BannerLabel = BannerLabel;
exports.BannerLabelMessage = BannerLabelMessage;
exports.BannerMessage = BannerMessage;
exports.Button = Button;
exports.CheckBox = CheckBox;
exports.ColorApplicator = ColorApplicator;
exports.ColorPalette = ColorPalette;
exports.CommonEvents = CommonEvents;
exports.CommonInput = CommonInput;
exports.CustomAppearance = CustomAppearance;
exports.Dependencies = Dependencies;
exports.DialogBox = DialogBox;
exports.DropDownPanel = DropDownPanel;
exports.ElementThemeApplicator = ElementThemeApplicator;
exports.EmailInput = EmailInput;
exports.FileUpload = FileUpload;
exports.FileUploadEntry = FileUploadEntry;
exports.HiddenInput = HiddenInput;
exports.LinePanel = LinePanel;
exports.LinePanelEntry = LinePanelEntry;
exports.LinkPanel = LinkPanel;
exports.NumberInput = NumberInput;
exports.Panel = Panel;
exports.PasswordInput = PasswordInput;
exports.PasswordMatcherInput = PasswordMatcherInput;
exports.PasswordMatcherInputControl = PasswordMatcherInputControl;
exports.PasswordMatcherInputValue = PasswordMatcherInputValue;
exports.PasswordMatcherModel = PasswordMatcherModel;
exports.PhoneInput = PhoneInput;
exports.PopUpPanel = PopUpPanel;
exports.RadioButton = RadioButton;
exports.RadioToggleIcon = RadioToggleIcon;
exports.RadioToggleSwitch = RadioToggleSwitch;
exports.Select = Select;
exports.SlideDeck = SlideDeck;
exports.SlideDeckEntry = SlideDeckEntry;
exports.TextInput = TextInput$1;
exports.ToggleIcon = ToggleIcon;
exports.TreePanel = TreePanel;
exports.TreePanelEntry = TreePanelEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jb2xvclBhbGV0dGUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGVwZW5kZW5jaWVzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrZ3JvdW5kVmlkZW8vYmFja2dyb3VuZFZpZGVvLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTGFiZWwvYmFubmVyTGFiZWxNZXNzYWdlL2Jhbm5lckxhYmVsTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvY29tbW9uL2NvbG9yQXBwbGljYXRvci5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2Jhbm5lck1lc3NhZ2UvYmFubmVyTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2NvbW1vbi9jb21tb25FdmVudHMuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9kaWFsb2dCb3gvZGlhbG9nQm94LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3IuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9kcm9wRG93blBhbmVsL2Ryb3BEb3duUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9jb21tb25JbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2xpbmtQYW5lbC9saW5rUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9wYW5lbC9wYW5lbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2xpbmVQYW5lbC90cmVlUGFuZWxFbnRyeS9saW5lUGFuZWxFbnRyeS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2xpbmVQYW5lbC9saW5lUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9wb3BVcFBhbmVsL3BvcFVwUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9zbGlkZURlY2svc2xpZGVEZWNrRW50cnkvc2xpZGVEZWNrRW50cnkuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9zbGlkZURlY2svc2xpZGVEZWNrLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcmFkaW9Ub2dnbGVJY29uL3JhZGlvVG9nZ2xlSWNvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3RvZ2dsZUljb24vdG9nZ2xlSWNvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L3RyZWVQYW5lbC90cmVlUGFuZWxFbnRyeS90cmVlUGFuZWxFbnRyeS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L3RyZWVQYW5lbC90cmVlUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9idXR0b24vYnV0dG9uLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvY2hlY2tCb3gvY2hlY2tCb3guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9lbWFpbElucHV0L2VtYWlsSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9maWxlVXBsb2FkL2ZpbGVVcGxvYWRFbnRyeS9maWxlVXBsb2FkRW50cnkuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9maWxlVXBsb2FkL2ZpbGVVcGxvYWQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9oaWRkZW5JbnB1dC9oaWRkZW5JbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L251bWJlcklucHV0L251bWJlcklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRJbnB1dC9wYXNzd29yZElucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlck1vZGVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9waG9uZUlucHV0L3Bob25lSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9yYWRpb0J1dHRvbi9yYWRpb0J1dHRvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3JhZGlvVG9nZ2xlU3dpdGNoL3JhZGlvVG9nZ2xlU3dpdGNoLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvc2VsZWN0L3NlbGVjdC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3RleHRJbnB1dC90ZXh0SW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzY3JpcHRpb24gRm9udCBjb2xvciwgYmFja2dyb3VuZCBjb2xvciwgYW5kIGJvcmRlciBjb2xvciBwYWxldHRlcyBmb3IgdmFyaW91cyBtb2Rlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZSB7XG5cbiAgICBzdGF0aWMgUFJJTUFSWV9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjMDA3YmZmXCIsXCIjMDA3YmZmXCJdO1xuICAgIHN0YXRpYyBQUklNQVJZX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiMwMDY5ZDlcIixcIiMwMDYyY2NcIl07XG4gICAgc3RhdGljIFBSSU1BUllfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzVlYWJmZFwiLFwiIzVlYWJmZFwiXTtcbiAgICBzdGF0aWMgUFJJTUFSWV9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjMDA2MmNjXCIsXCIjMDA1Y2JmXCJdO1xuXG4gICAgc3RhdGljIFNFQ09OREFSWV9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjNmM3NTdkXCIsXCIjNmM3NTdkXCJdO1xuICAgIHN0YXRpYyBTRUNPTkRBUllfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzVhNjI2OFwiLFwiIzU0NWI2MlwiXTtcbiAgICBzdGF0aWMgU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiM2Yzc1N2RcIixcIiM2Yzc1N2RcIl07XG4gICAgc3RhdGljIFNFQ09OREFSWV9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjNTQ1YjYyXCIsXCIjNGU1NTViXCJdO1xuXG4gICAgc3RhdGljIFNVQ0NFU1NfQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiIzI4YTc0NVwiLFwiIzI4YTc0NVwiXTtcbiAgICBzdGF0aWMgU1VDQ0VTU19IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjMjE4ODM4XCIsXCIjMWU3ZTM0XCJdO1xuICAgIHN0YXRpYyBTVUNDRVNTX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiMyOGE3NDVcIixcIiMyOGE3NDVcIl07XG4gICAgc3RhdGljIFNVQ0NFU1NfQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiIzFlN2UzNFwiLFwiIzFjNzQzMFwiXTtcblxuICAgIHN0YXRpYyBJTkZPX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiMxN2EyYjhcIixcIiMxN2EyYjhcIl07XG4gICAgc3RhdGljIElORk9fSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzEzODQ5NlwiLFwiIzExN2E4YlwiXTtcbiAgICBzdGF0aWMgSU5GT19ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjMTdhMmI4XCIsXCIjMTdhMmI4XCJdO1xuICAgIHN0YXRpYyBJTkZPX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiMxMTdhOGJcIixcIiMxMDcwN2ZcIl07XG5cbiAgICBzdGF0aWMgV0FSTklOR19DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjZmZjMTA3XCIsXCIjZmZjMTA3XCJdO1xuICAgIHN0YXRpYyBXQVJOSU5HX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiNlMGE4MDBcIixcIiNkMzllMDBcIl07XG4gICAgc3RhdGljIFdBUk5JTkdfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiI2ZmYzEwN1wiLFwiI2ZmYzEwN1wiXTtcbiAgICBzdGF0aWMgV0FSTklOR19BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjZDM5ZTAwXCIsXCIjYzY5NTAwXCJdO1xuXG4gICAgc3RhdGljIERBTkdFUl9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjZGMzNTQ1XCIsXCIjZGMzNTQ1XCJdO1xuICAgIHN0YXRpYyBEQU5HRVJfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiI2M4MjMzM1wiLFwiI2JkMjEzMFwiXTtcbiAgICBzdGF0aWMgREFOR0VSX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiNkYzM1NDVcIixcIiNkYzM1NDVcIl07XG4gICAgc3RhdGljIERBTkdFUl9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjYmQyMTMwXCIsXCIjYjIxZjJkXCJdO1xuXG4gICAgc3RhdGljIExJR0hUX0NPTE9SUyA9ICAgICAgICAgIFtcIiMyMTI1MjlcIixcIiNmOGY5ZmFcIixcIiNmOGY5ZmFcIl07XG4gICAgc3RhdGljIExJR0hUX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiMyMTI1MjlcIixcIiNlMmU2ZWFcIixcIiNkYWUwZTVcIl07XG4gICAgc3RhdGljIExJR0hUX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiMyMTI1MjlcIixcIiNmOGY5ZmFcIixcIiNmOGY5ZmFcIl07XG4gICAgc3RhdGljIExJR0hUX0FDVElWRV9DT0xPUlMgPSAgIFtcIiMyMTI1MjlcIixcIiNkYWUwZTVcIixcIiNkM2Q5ZGZcIl07XG5cbiAgICBzdGF0aWMgREFSS19DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjMzQzYTQwXCIsXCIjMzQzYTQwXCJdO1xuICAgIHN0YXRpYyBEQVJLX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiMyMzI3MmJcIixcIiMxZDIxMjRcIl07XG4gICAgc3RhdGljIERBUktfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzM0M2E0MFwiLFwiIzM0M2E0MFwiXTtcbiAgICBzdGF0aWMgREFSS19BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjMWQyMTI0XCIsXCIjMTcxYTFkXCJdO1xufSIsImV4cG9ydCBjbGFzcyBDdXN0b21BcHBlYXJhbmNlIHtcblxuICAgIHN0YXRpYyBTSVpFX0RFRkFVTCA9IFwic2l6ZS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNJWkVfU01BTEwgPSBcInNpemUtc21hbGxcIjtcbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcInNpemUtbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcInNpemUtbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBTSEFQRV9ERUFGVUxUID0gXCJzaGFwZS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNIQVBFX1JPVU5EID0gXCJzaGFwZS1yb3VuZFwiO1xuICAgIHN0YXRpYyBTSEFQRV9TUVVBUkUgPSBcInNoYXBlLXNxdWFyZVwiO1xuXG4gICAgc3RhdGljIFZJU0lCSUxJVFlfREVBRlVMVCA9IFwidmlzaWJpbGl0eS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFZJU0lCSUxJVFlfVklTSUJMRSA9IFwidmlzaWJpbGl0eS12aXNpYmxlXCI7XG4gICAgc3RhdGljIFZJU0lCSUxJVFlfSElEREVOID0gXCJ2aXNpYmlsaXR5LWhpZGRlblwiO1xuXG4gICAgc3RhdGljIFNQQUNJTkdfREVGQVVMVCA9IFwic3BhY2luZy1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNQQUNJTkdfTk9ORSA9IFwic3BhY2luZy1ub25lXCI7XG4gICAgc3RhdGljIFNQQUNJTkdfQUJPVkUgPSBcInNwYWNpbmctYWJvdmVcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19CRUxPVyA9IFwic3BhY2luZy1iZWxvd1wiO1xuICAgIHN0YXRpYyBTUEFDSU5HX0FCT1ZFX0JFTE9XID0gXCJzcGFjaW5nLWFib3ZlLWJlbG93XCI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zaXplID0gQ3VzdG9tQXBwZWFyYW5jZS5TSVpFX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBDdXN0b21BcHBlYXJhbmNlLlNIQVBFX0RFQUZVTFQ7XG4gICAgICAgIHRoaXMuc3BhY2luZyA9IEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19ERUZBVUxUO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSBDdXN0b21BcHBlYXJhbmNlLlZJU0lCSUxJVFlfREVBRlVMVDtcbiAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB3aXRoU2l6ZShzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTaGFwZShzaGFwZSkge1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTcGFjaW5nKHNwYWNpbmcpIHtcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gc3BhY2luZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFZpc2liaWxpdHkodmlzaWJpbGl0eSkge1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcblxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY2llcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRDbGFzcyA9IENvbXBvbmVudDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlTGlzdGVuZXJzIHtcblxuICAgIGNvbnN0cnVjdG9yKGV4aXN0aW5nTGlzdGVuZXJzID0gbnVsbCkge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgPSAoZXhpc3RpbmdMaXN0ZW5lcnMgJiYgZXhpc3RpbmdMaXN0ZW5lcnMuZ2V0QmFja2dyb3VuZENsaWNrZWQpID8gZXhpc3RpbmdMaXN0ZW5lcnMuZ2V0QmFja2dyb3VuZENsaWNrZWQoKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgXG4gICAgICovXG4gICAgd2l0aEJhY2tncm91bmRDbGlja2VkKGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyID0gYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBnZXRCYWNrZ3JvdW5kQ2xpY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBjYWxsQmFja2dyb3VuZENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyLCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNhbGxMaXN0ZW5lcihsaXN0ZW5lciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKG51bGwgIT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIEJhc2VFbGVtZW50LFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEJhY2tTaGFkZUxpc3RlbmVycyB9IGZyb20gXCIuL2JhY2tTaGFkZUxpc3RlbmVycy5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja1NoYWRlXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QmFja1NoYWRlTGlzdGVuZXJzfSBiYWNrU2hhZGVMaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihiYWNrU2hhZGVMaXN0ZW5lcnMgPSBuZXcgQmFja1NoYWRlTGlzdGVuZXJzKCkpe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0Jhc2VFbGVtZW50fSAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtCYWNrU2hhZGVMaXN0ZW5lcnN9ICovXG4gICAgICAgIHRoaXMuYmFja1NoYWRlTGlzdGVuZXJzID0gYmFja1NoYWRlTGlzdGVuZXJzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2stc2hhZGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiZml4ZWRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMTA0MFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwdndcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDB2aFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMDAwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFjay1zaGFkZS5zaG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuNVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhY2stc2hhZGUuZmFkZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXJcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiaWQ9YmFja1NoYWRlXCIsIFwic3R5bGU9ei1pbmRleDozO2Rpc3BsYXk6bm9uZTtcIiwgXCJjbGFzcz1iYWNrLXNoYWRlXCIpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tTaGFkZSk7XG4gICAgfVxuXG4gICAgaGlkZUFmdGVyKG1pbGxpU2Vjb25kcykge1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7cmVzb2x2ZSgpO30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGVcIik7XG4gICAgICAgIGNvbnN0IGhpZGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKG1pbGxpU2Vjb25kcyxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGlzYWJsZVN0eWxlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZShtaWxsaVNlY29uZHMgKyAxLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFja1NoYWRlLm5hbWUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtoaWRlUHJvbWlzZSwgZGlzYWJsZVN0eWxlUHJvbWlzZV0pO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICghdGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7cmVzb2x2ZSgpO30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYWNrU2hhZGUubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHJldHVybiBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLFxuICAgICAgICAgICAgKCkgPT4geyBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZSBzaG93XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxufSIsImltcG9ydCB7IENvbXBvbmVudCxcblx0Q2FudmFzU3R5bGVzLFxuXHRTdHlsZUFjY2Vzc29yLFxuXHRTdHlsZXNoZWV0QnVpbGRlcixcblx0Q29tcG9uZW50QnVpbGRlcixcblx0SW5saW5lQ29tcG9uZW50RmFjdG9yeSxcblx0U3R5bGVzaGVldFxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhY2tncm91bmRcIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kIHtcblxuICAgIGNvbnN0cnVjdG9yKGJhY2tncm91bmRJbWFnZVBhdGgpe1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtzdHJpbmd9ICovXG5cdFx0dGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoID0gYmFja2dyb3VuZEltYWdlUGF0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlclxuXHQgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cblx0ICovXG5cdHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcblx0XHRcdC5zZWxlY3RvcihcIi5iYWNrZ3JvdW5kXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJyZ2IoMTUwLCAxOTcsIDI1NSlcIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1yZXBlYXRcIiwgXCJuby1yZXBlYXRcIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1wb3NpdGlvbi14XCIsIFwiY2VudGVyXCIpXG5cdFx0XHRcdC5zdHlsZShcImJhY2tncm91bmQtcG9zaXRpb24teVwiLCBcImNlbnRlclwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLWF0dGFjaG1lbnRcIiwgXCJzY3JvbGxcIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1zaXplXCIsIFwiY292ZXJcIilcblx0XHRcdFx0LnN0eWxlKFwiZm9udC1mYW1pbHlcIiwgXCJTb3VyY2UgU2FucyBQcm9cIilcblx0XHRcdFx0LnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCIzMDBcIilcblx0XHRcdFx0LnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IHVuaXF1ZUlkUmVnaXN0cnlcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiaWQ9YmFja2dyb3VuZFwiLCBcImNsYXNzPWJhY2tncm91bmRcIilcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0c2V0KGtleSx2YWwpIHtcblx0XHR0aGlzLmNvbXBvbmVudC5zZXQoa2V5LHZhbCk7XG5cdH1cblxuXHRwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYWNrZ3JvdW5kKTtcblx0XHRpZiAodGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoKSB7XG4gICAgICAgICAgICBTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja2dyb3VuZFwiKSlcbiAgICAgICAgICAgICAgICAuc2V0KFwiYmFja2dyb3VuZC1pbWFnZVwiLCBcInVybChcXFwiXCIgKyB0aGlzLmJhY2tncm91bmRJbWFnZVBhdGggKyBcIlxcXCIpXCIpO1xuXHRcdH1cblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja2dyb3VuZC5uYW1lKTtcblx0fVxuXG59IiwiaW1wb3J0IHsgVmlkZW9FbGVtZW50LFxuXHRDYW52YXNTdHlsZXMsXG5cdENvbXBvbmVudCxcblx0U3R5bGVzaGVldEJ1aWxkZXIsXG5cdENvbXBvbmVudEJ1aWxkZXIsXG5cdElubGluZUNvbXBvbmVudEZhY3RvcnksIFxuXHRTdHlsZXNoZWV0XG4gfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbnRhaW5lckFzeW5jIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiXG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrZ3JvdW5kVmlkZW9cIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kVmlkZW8ge1xuXG4gICAgY29uc3RydWN0b3IodmlkZW9TcmMpe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMudmlkZW9TcmMgPSB2aWRlb1NyYztcblx0fVxuXG5cdC8qKlxuXHQgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlclxuXHQgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cblx0ICovXG5cdHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcblx0XHRcdC5zZWxlY3RvcihcIi5iYWNrZ3JvdW5kLXZpZGVvXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcIndpZHRoXCIsIFwiYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFja2dyb3VuZC12aWRlby1wbGF5ZXJcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJ0b3BcIiwgXCI1MCVcIilcblx0XHRcdFx0LnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIxMDAlXCIpXG5cdFx0XHRcdC5zdHlsZShcIm1pbi1oZWlnaHRcIiwgXCIxMDAlXCIpXG5cdFx0XHRcdC5zdHlsZShcIndpZHRoXCIsIFwiYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMFwiKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2tncm91bmQtdmlkZW8tb3ZlcmxheVwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG5cdFx0XHRcdC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwibWluLWhlaWdodFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMxMTQ0YWFcIilcblx0XHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuM1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMVwiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdFx0XG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImlkPWJhY2tncm91bmRWaWRlb1wiLCBcImNsYXNzPWJhY2tncm91bmQtdmlkZW9cIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1iYWNrZ3JvdW5kLXZpZGVvLW92ZXJsYXlcIilcblx0XHRcdFx0Lm5vZGUoXCJ2aWRlb1wiLCBcImlkPXZpZGVvXCIsIFwiY2xhc3M9YmFja2dyb3VuZC12aWRlby1wbGF5ZXJcIixcblx0XHRcdFx0ICAgICAgICBcInBsYXlzaW5saW5lPXBsYXlzaW5saW5lXCIsXG5cdFx0XHRcdFx0XHRcImF1dG9wbGF5PXRydWVcIixcblx0XHRcdFx0ICAgICAgICBcIm11dGVkPXRydWVcIiwgXCJsb29wPWxvb3BcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwic291cmNlXCIsIFwiaWQ9c291cmNlXCIsIFwic3JjPVwiLCBcInR5cGU9dmlkZW8vbXA0XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmRWaWRlbyk7XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmRWaWRlby5uYW1lKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzb3VyY2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJzcmNcIiwgdGhpcy52aWRlb1NyYyk7XG5cdH1cblxuXHRhc3luYyBwbGF5TXV0ZWQoKSB7XG5cdFx0YXdhaXQgQ29udGFpbmVyQXN5bmMucGF1c2UoMTAwKTtcblx0XHQvKiogQHR5cGUge1ZpZGVvRWxlbWVudH0gKi9cblx0XHRjb25zdCB2aWRlbyA9IHRoaXMuY29tcG9uZW50LmdldChcInZpZGVvXCIpO1xuXHRcdHZpZGVvLnBsYXlNdXRlZCgpO1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBNZXRob2QsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlQWNjZXNzb3IsXG4gICAgQ29tcG9uZW50LFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uLy4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJhbm5lckxhYmVsTWVzc2FnZSB7XG5cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0NMT1NFX0NMSUNLRUQoKSB7IHJldHVybiBcImNsb3NlQ2xpY2tlZFwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFRZUEVfQUxFUlQoKSB7IHJldHVybiBcInR5cGUtYWxlcnRcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJ0eXBlLWluZm9cIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJ0eXBlLXN1Y2Nlc3NcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgeyByZXR1cm4gXCJ0eXBlLXdhcm5pbmdcIjsgfVxuXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX0lORk8sIGN1c3RvbUFwcGVhcmFuY2UgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYmFubmVyVHlwZSA9IGJhbm5lclR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDdXN0b21BcHBlYXJhbmNlfSAqL1xuICAgICAgICB0aGlzLmN1c3RvbUFwcGVhcmFuY2UgPSBjdXN0b21BcHBlYXJhbmNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC44XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgLjVzIC4xc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgLjVzIDBzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsb2F0XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyMnB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIwLjNzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGVhZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXRleHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10eXBlLWFsZXJ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmNDQzMzZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10eXBlLXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzRDQUY1MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXR5cGUtaW5mb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtdHlwZS13YXJuaW5nXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZjk4MDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaXplLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjE4cHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaXplLWRlZmF1bHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTJwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNpemUtc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIxMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1yaWdodFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc2hhcGUtc3F1YXJlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNoYXBlLXJvdW5kXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjNweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctbm9uZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYWJvdmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYmVsb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYWJvdmUtYmVsb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlXCIsIFwic3R5bGU9ZGlzcGxheTpub25lO1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlQ29udGVudFwiLCBcImNsYXNzPWJhbm5lci1sYWJlbC1tZXNzYWdlIGJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlQ2xvc2VCdXR0b25cIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwtbWVzc2FnZS1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCLDl1wiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJpZD1iYW5uZXJMYWJlbE1lc3NhZ2VIZWFkZXJcIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwtbWVzc2FnZS1oZWFkZXJcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlVGV4dFwiLCBcImNsYXNzPWJhbm5lci1sYWJlbC1tZXNzYWdlLXRleHRcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYW5uZXJMYWJlbE1lc3NhZ2UpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTGFiZWxNZXNzYWdlLm5hbWUpO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5iYW5uZXJUeXBlKTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZSkge1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZSAmJiB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZykge1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNwYWNpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlQ2xvc2VCdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xvc2VDbGlja2VkKSk7XG4gICAgfVxuXG4gICAgY2xvc2VDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgLmRpc2FibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZVwiKSlcbiAgICAgICAgICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlXCIpKVxuICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcblxuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAuZGlzYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtdmlzaWJsZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgbWVzc2FnZUNvbnRlbnRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlQ29udGVudFwiKTtcbiAgICB9XG5cbiAgICBzZXRNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SGVhZGVyKGhlYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZVRleHRcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcywgQ29tcG9uZW50QnVpbGRlciwgSW5saW5lQ29tcG9uZW50RmFjdG9yeSwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcbmltcG9ydCB7IEJhbm5lckxhYmVsTWVzc2FnZSB9IGZyb20gXCIuL2Jhbm5lckxhYmVsTWVzc2FnZS9iYW5uZXJMYWJlbE1lc3NhZ2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJhbm5lckxhYmVsIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHR0aGlzLmFwcGVhcmFuY2UgPSBuZXcgQ3VzdG9tQXBwZWFyYW5jZSgpXG5cdFx0XHQud2l0aFNpemUoQ3VzdG9tQXBwZWFyYW5jZS5TSVpFX1NNQUxMKVxuXHRcdFx0LndpdGhTaGFwZShDdXN0b21BcHBlYXJhbmNlLlNIQVBFX1JPVU5EKVxuXHRcdFx0LndpdGhTcGFjaW5nKEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19CRUxPVyk7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsTWVzc2FnZX0gKi9cblx0XHR0aGlzLnN1Y2Nlc3MgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX1NVQ0NFU1MsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG5cdFx0LyoqIEB0eXBlIHtCYW5uZXJMYWJlbE1lc3NhZ2V9ICovXG5cdFx0dGhpcy53YXJuaW5nID0gSW5qZWN0aW9uUG9pbnRcblx0XHRcdC5pbnN0YW5jZShCYW5uZXJMYWJlbE1lc3NhZ2UsIFtcIlwiLCBCYW5uZXJMYWJlbE1lc3NhZ2UuVFlQRV9XQVJOSU5HLCB0aGlzLmFwcGVhcmFuY2VdKTtcblxuXHRcdC8qKiBAdHlwZSB7QmFubmVyTGFiZWxNZXNzYWdlfSAqL1xuXHRcdHRoaXMuZXJyb3IgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX0FMRVJULCB0aGlzLmFwcGVhcmFuY2VdKTtcblxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgdmlzaWJpbGl0eSAwc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcyAuM3MsIHZpc2liaWxpdHkgMHMgLjNzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YmFubmVyTGFiZWxcIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwgYmFubmVyLWxhYmVsLWhpZGRlblwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFubmVyTGFiZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTGFiZWwubmFtZSk7XG4gICAgICAgIHRoaXMuc3VjY2Vzcy5oaWRlKCk7XG4gICAgICAgIHRoaXMud2FybmluZy5oaWRlKCk7XG4gICAgICAgIHRoaXMuZXJyb3IuaGlkZSgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5hZGRDaGlsZCh0aGlzLnN1Y2Nlc3MuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuYWRkQ2hpbGQodGhpcy53YXJuaW5nLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLmFkZENoaWxkKHRoaXMuZXJyb3IuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5zdWNjZXNzLmV2ZW50TWFuYWdlci5saXN0ZW5UbyhCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpKTtcbiAgICAgICAgdGhpcy53YXJuaW5nLmV2ZW50TWFuYWdlci5saXN0ZW5UbyhCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpKTtcbiAgICAgICAgdGhpcy5lcnJvci5ldmVudE1hbmFnZXIubGlzdGVuVG8oQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5oaWRlKSk7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5zdWNjZXNzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgc2hvd1N1Y2Nlc3MoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lcih0aGlzLnN1Y2Nlc3MsIGhlYWRlciwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzaG93V2FybmluZyhoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93QmFubmVyKHRoaXMud2FybmluZywgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIHNob3dFcnJvcihoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93QmFubmVyKHRoaXMuZXJyb3IsIGhlYWRlciwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBoaWRlKCkge1xuXHRcdHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYW5uZXItbGFiZWwgYmFubmVyLWxhYmVsLWhpZGRlblwiKTtcbiAgICAgICAgdGhpcy5hY3RpdmUuaGlkZSgpO1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QmFubmVyTGFiZWxNZXNzYWdlfSBiYW5uZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICAgKi9cbiAgICAgc2hvd0Jhbm5lcihiYW5uZXIsIGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcblx0XHRiYW5uZXIuc2V0TWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UpO1xuICAgICAgICBiYW5uZXIuc2hvdygpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFubmVyLWxhYmVsIGJhbm5lci1sYWJlbC12aXNpYmxlXCIpO1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG5cdFx0dGhpcy5hY3RpdmUgPSBiYW5uZXI7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBDb2xvckFwcGxpY2F0b3Ige1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb250Q29sb3IgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJhY2tncm91bmRDb2xvciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9yZGVyQ29sb3IgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBzZWxlY3RvciwgZm9udENvbG9yLCBiYWNrZ3JvdW5kQ29sb3IsIGJvcmRlckNvbG9yKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5zZWxlY3RvcihzZWxlY3RvcilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBmb250Q29sb3IpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBiYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWNvbG9yXCIsIGJvcmRlckNvbG9yKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBTdHlsZXNoZWV0XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kLCBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYW5uZXJNZXNzYWdlXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFubmVyTWVzc2FnZSB7XG5cbiAgICBzdGF0aWMgVFlQRV9BTEVSVCA9IFwidHlwZS1hbGVydFwiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcInR5cGUtaW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcInR5cGUtc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcInR5cGUtd2FybmluZ1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhbm5lclR5cGUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjbG9zZWFibGUgXG4gICAgICogQHBhcmFtIHtDdXN0b21BcHBlYXJhbmNlfSBjdXN0b21BcHBlYXJhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lck1lc3NhZ2UuVFlQRV9JTkZPLCBjbG9zZWFibGUgPSBmYWxzZSwgY3VzdG9tQXBwZWFyYW5jZSA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYW5uZXJUeXBlID0gYmFubmVyVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge01ldGhvZH0gKi9cbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2l6ZS1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxOHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2l6ZS1kZWZhdWx0LCAuYmFubmVyLW1lc3NhZ2Utc2l6ZS1tZWRpdW1cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTJwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNpemUtc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIxMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1yaWdodFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2hhcGUtZGVmYXVsdCwgLmJhbm5lci1tZXNzYWdlLXNoYXBlLXNxdWFyZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zaGFwZS1yb3VuZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIzcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWRlZmF1bHQsIC5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLW5vbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWFib3ZlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWJlbG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWFib3ZlLWJlbG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IDAuNXNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS5oaWRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS5zaG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuOTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS10eXBlLWFsZXJ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmNDQzMzZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS10eXBlLXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzRDQUY1MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXR5cGUtaW5mb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtdHlwZS13YXJuaW5nXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZjk4MDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxvYXRcIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIycHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIjAuM3NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1jbG9zZS1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImJsYWNrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YmFubmVyTWVzc2FnZVwiLCBcImNsYXNzPWJhbm5lci1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uXCIsIFwiY2xhc3M9YmFubmVyLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIsOXXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJpZD1iYW5uZXJNZXNzYWdlSGVhZGVyXCIsIFwiY2xhc3M9YmFubmVyLW1lc3NhZ2UtaGVhZGVyXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTWVzc2FnZU1lc3NhZ2VcIiwgXCJjbGFzcz1iYW5uZXItbWVzc2FnZS1tZXNzYWdlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lck1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlSGVhZGVyXCIpLnNldENoaWxkKFwiQWxlcnRcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgICAgIHRoaXMuYXBwbHlDbGFzc2VzKFwiYmFubmVyLW1lc3NhZ2UgZmFkZVwiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLHRoaXMuaGlkZSkpO1xuICAgIH1cblxuICAgIGFwcGx5Q2xhc3NlcyhiYXNlQ2xhc3Nlcykge1xuICAgICAgICBsZXQgY2xhc3NlcyA9IGJhc2VDbGFzc2VzO1xuICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5iYW5uZXJUeXBlO1xuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZykge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixjbGFzc2VzKTtcbiAgICB9XG4gICAgXG4gICAgYXBwbHlIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlSGVhZGVyXCIpLnNldENoaWxkKHRoaXMuaGVhZGVyKTtcbiAgICB9XG5cbiAgICBhcHBseU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBjbGlja2VkTGlzdGVuZXIgXG4gICAgICovXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG9uSGlkZUxpc3RlbmVyIFxuICAgICAqL1xuICAgIG9uSGlkZShvbkhpZGVMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyID0gb25IaWRlTGlzdGVuZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG9uU2hvd0xpc3RlbmVyIFxuICAgICAqL1xuICAgIG9uU2hvdyhvblNob3dMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gb25TaG93TGlzdGVuZXI7XG4gICAgfVxuXG4gICAgYXN5bmMgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBoaWRlXCIpO1xuICAgICAgICBhd2FpdCBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAwLCAoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vbkhpZGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzaG93KG5ld0hlYWRlciA9IG51bGwsIG5ld01lc3NhZ2UgPSBudWxsKSB7XG4gICAgICAgIGlmIChuZXdIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlIZWFkZXIobmV3SGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3TWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1lc3NhZ2UobmV3TWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG4gICAgICAgIGF3YWl0IFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsKCkgPT4geyBcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDbGFzc2VzKFwiYmFubmVyLW1lc3NhZ2Ugc2hvd1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHRoaXMub25TaG93TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIuY2FsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIENvbW1vbkV2ZW50cyB7XG5cbiAgICBzdGF0aWMgSE9WRVJFRCA9IFwiaG92ZXJlZFwiO1xuICAgIHN0YXRpYyBVTkhPVkVSRUQgPSBcInVuaG92ZXJlZFwiO1xuICAgIHN0YXRpYyBDTElDS0VEID0gXCJjbGlja2VkXCI7XG4gICAgc3RhdGljIERPVUJMRV9DTElDS0VEID0gXCJkb3VibGVDbGlja2VkXCI7XG5cbiAgICBzdGF0aWMgRU5URVJFRCA9IFwiZW50ZXJlZFwiO1xuICAgIHN0YXRpYyBLRVlVUFBFRCA9IFwia2V5VXBwZWRcIjtcbiAgICBzdGF0aWMgRk9DVVNFRCA9IFwiZm9jdXNlZFwiO1xuICAgIHN0YXRpYyBCTFVSUkVEID0gXCJibHVycmVkXCI7XG5cbiAgICBzdGF0aWMgQ0hBTkdFRCA9IFwiY2hhbmdlZFwiO1xuICAgIHN0YXRpYyBFTkFCTEVEID0gXCJlbmFibGVkXCI7XG4gICAgc3RhdGljIERJU0FCTEVEID0gXCJkaXNhYmxlZFwiO1xuICAgIHN0YXRpYyBTRUxFQ1RFRCA9IFwic2VsZWN0ZWRcIjtcblxuICAgIHN0YXRpYyBEUkFHX1NUQVJURUQgPSBcImRyYWdTdGFydGVkXCI7XG4gICAgc3RhdGljIERSQUdfRU5ERUQgPSBcImRyYWdFbmRlZFwiO1xuICAgIHN0YXRpYyBEUk9QUEVEID0gXCJkcm9wcGVkXCI7XG4gICAgXG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENhbnZhc1Jvb3QsXG4gICAgTmF2aWdhdGlvbixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IFRpbWVQcm9taXNlLCBMb2dnZXIsIE1ldGhvZCwgTGlzdCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEJhY2tTaGFkZSB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlLmpzXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRWxlbWVudFV0aWxzLCBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRGlhbG9nQm94XCIpO1xuXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94IHtcbiAgICBcbiAgICBzdGF0aWMgT1BUSU9OX0JBQ0tfT05fQ0xPU0UgPSAxO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdE9wdGlvbnMgPSBbXSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZX0gKi9cbiAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYWNrU2hhZGUsIFtcbiAgICAgICAgICAgIG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgICAgIC53aXRoQmFja2dyb3VuZENsaWNrZWQobmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpKV0pO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN3YWxsb3dGb2N1c0VzY2FwZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub3duaW5nVHJpZ2dlciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBuZXcgTGlzdChkZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBMaXN0KGRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvKiogQHR5cGUge0Z1bmN0aW9ufSAqL1xuICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy15XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy14XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgKG1pbi13aWR0aDogNTAxcHgpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCI1NHB0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC01MCUsMClcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9pbnRlci1ldmVudHNcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWJvZHlcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXhcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1oZWFkZXJcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3AtbGVmdC1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXRvcC1yaWdodC1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS5kaWFsb2dib3gtZmFkZSAuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZhZGVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW9wZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vcGVuIC5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXhcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy15XCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LWZhZGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAwLjE1cyBsaW5lYXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ub25lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS1mYWRlOm5vdCguZGlhbG9nYm94LW92ZXJsYXktc2hvdylcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LmRpYWxvZ2JveC1vdmVybGF5LWZhZGUgLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCItd2Via2l0LXRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcInRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcInRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0LCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCwgLTUwcHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsIC01MHB4KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LmRpYWxvZ2JveC1vdmVybGF5LXNob3cgLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtaGVhZGVyIC5kaWFsb2dib3gtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuN3JlbSAxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiLTAuN3JlbSAtMXJlbSAtMC43cmVtIGF1dG9cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtdGl0bGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWJvZHlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXhcIiwgXCIxIDEgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIxIDEgYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mb290ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiLW1zLWZsZXhib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtZmxleC1wYWNrXCIsIFwiZW5kXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwiZmxleC1lbmRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3BcIiwgXCIxcHggc29saWQgI2RlZTJlNlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzXCIsIFwiMC4zcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c1wiLCBcIjAuM3JlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mb290ZXIgPiA6bm90KDpmaXJzdC1jaGlsZClcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi4yNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mb290ZXIgPiA6bm90KDpsYXN0LWNoaWxkKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1yaWdodFwiLCBcIi4yNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCIxMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3V0bGluZVwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiLW1zLWZsZXhib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9pbnRlci1ldmVudHNcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1oZWFkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiLW1zLWZsZXhib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjOTk5OTk5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtYWxpZ25cIiwgXCJzdGFydFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiZmxleC1zdGFydFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LXBhY2tcIiwgXCJqdXN0aWZ5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwic3BhY2UtYmV0d2VlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjdyZW0gMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1ib3R0b21cIiwgXCIxcHggc29saWQgI2RlZTJlNlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbG9hdFwiLCBcInJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI3MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LXNoYWRvd1wiLCBcIjAgMXB4IDAgI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIuNVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jbG9zZS1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNsb3NlLWJ1dHRvbjpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTpob3ZlciwgLmRpYWxvZ2JveC1jbG9zZS1idXR0b246bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6Zm9jdXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiLjc1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCJidXR0b24uZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LWFwcGVhcmFuY2VcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9ZGlhbG9nQm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlPXotaW5kZXg6LTFcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJhY2tTaGFkZUNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZGlhbG9nQm94T3ZlcmxheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3M9ZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9jayBkaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJpbmRleD0tMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZT1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieT1kaWFsb2dMYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1kaWFsb2dib3g9dHJ1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWRpYWxvZ2JveC1mcmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZT16LWluZGV4OjJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZT1kb2N1bWVudFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1kaWFsb2dib3gtY29udGVudFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9ZGlhbG9nYm94LWhlYWRlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImg1XCIsIFwiaWQ9dGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtdGl0bGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcIk1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImJ1dHRvblwiLCBcImlkPWNsb3NlQnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlPWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3M9ZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1kaXNtaXNzPWRpYWxvZ2JveFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbD1DbG9zZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiY2xhc3M9ZmEgZmEtd2luZG93LWNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1oaWRkZW49dHJ1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1kaWFsb2dCb3hDb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtYm9keVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKERpYWxvZ0JveCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldChcImJhY2tTaGFkZUNvbnRhaW5lclwiLCB0aGlzLmJhY2tTaGFkZS5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbG9zZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFxuICAgICAqL1xuICAgIHNldFRpdGxlKHRleHQpeyB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInRpdGxlXCIsIHRleHQpOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxuICAgICAqL1xuICAgIHNldEZvb3Rlcihjb21wb25lbnQpe1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hGb290ZXJcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiZGlhbG9nQm94Rm9vdGVyXCIsIGNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcbiAgICAgKi9cbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCl7IHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiZGlhbG9nQm94Q29udGVudFwiLGNvbXBvbmVudCk7IH1cblxuXHRzZXQoa2V5LHZhbCkgeyB0aGlzLmNvbXBvbmVudC5zZXQoa2V5LHZhbCk7IH1cbiAgICBcbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgYXdhaXQgdGhpcy5oaWRlKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRhaW5zKERpYWxvZ0JveC5PUFRJT05fQkFDS19PTl9DTE9TRSkpIHtcbiAgICAgICAgICAgIE5hdmlnYXRpb24uaW5zdGFuY2UoKS5iYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBoaWRlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIpO1xuICAgICAgICBjb25zdCBoaWRlQmFja1NoYWRlUHJvbWlzZSA9IHRoaXMuYmFja1NoYWRlLmhpZGVBZnRlcigzMDApO1xuICAgICAgICBjb25zdCBoaWRlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZSgyMDAsICgpID0+IHsgXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKDIwMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3gubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2hpZGVQcm9taXNlLCBkaXNhYmxlU3R5bGVQcm9taXNlLCBoaWRlQmFja1NoYWRlUHJvbWlzZV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gdGVtcG9yYXJ5T3B0aW9uc1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHNob3coZXZlbnQsIHRlbXBvcmFyeU9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBDYW52YXNSb290Lmxpc3RlblRvRm9jdXNFc2NhcGUoXG4gICAgICAgICAgICBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xvc2UpLCB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hPdmVybGF5XCIpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRlbXBvcmFyeU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBMaXN0KHRlbXBvcmFyeU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIENhbnZhc1Jvb3Quc3dhbGxvd0ZvY3VzRXNjYXBlKDUwMCk7XG4gICAgICAgIGlmICghdGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7cmVzb2x2ZSgpO30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEaWFsb2dCb3gubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB0aGlzLmJhY2tTaGFkZS5zaG93KCk7XG4gICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlIGRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktYmxvY2tcIik7XG4gICAgICAgIENhbnZhc1Jvb3QubW91c2VEb3duRWxlbWVudCA9IHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveENvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudDtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9jayBkaWFsb2dib3gtb3ZlcmxheS1zaG93XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldERpYWxvZ0JveE92ZXJsYXkoKSB7IHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hPdmVybGF5XCIpOyB9XG5cbiAgICBnZXREaWFsb2dCb3goKSB7IHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hcIik7IH1cblxuICAgIHNjcm9sbExvY2soKSB7XG4gICAgICAgIENvbnRhaW5lckVsZW1lbnRVdGlscy5zY3JvbGxMb2NrVG8odGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94Q29udGVudFwiKS5lbGVtZW50LCAwLCAwLCAxMDAwKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IENvbG9yQXBwbGljYXRvciB9IGZyb20gXCIuL2NvbG9yQXBwbGljYXRvclwiO1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudFRoZW1lQXBwbGljYXRvciB7XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzUHJlZml4XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1vZGVOYW1lIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGRlZmF1bHRDb2xvcnMgXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gaG92ZXJDb2xvcnMgXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gZGlzYWJsZWRDb2xvcnMgXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gYWN0aXZlQ29sb3JzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib3hTaGFkb3dGb2N1cyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm94U2hhZG93QWN0aXZlRm9jdXMgXG4gICAgICogQHJldHVybiB7U3R5bGVzaGVldEJ1aWxkZXJ9XG4gICAgICovXG4gICAgc3RhdGljIGFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBjbGFzc1ByZWZpeCwgbW9kZU5hbWUsXG4gICAgICAgICAgICBkZWZhdWx0Q29sb3JzLCBob3ZlckNvbG9ycywgZGlzYWJsZWRDb2xvcnMsIGFjdGl2ZUNvbG9ycyxcbiAgICAgICAgICAgIGJveFNoYWRvd0ZvY3VzLCBib3hTaGFkb3dBY3RpdmVGb2N1cykge1xuXG4gICAgICAgIENvbG9yQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9YCxcbiAgICAgICAgICAgIGRlZmF1bHRDb2xvcnNbMF0sIGRlZmF1bHRDb2xvcnNbMV0sIGRlZmF1bHRDb2xvcnNbMl0pO1xuXG4gICAgICAgIENvbG9yQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlcixcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06aG92ZXJgLFxuICAgICAgICAgICAgaG92ZXJDb2xvcnNbMF0sIGhvdmVyQ29sb3JzWzFdLCBob3ZlckNvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpmb2N1cywgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmZvY3VzYCxcbiAgICAgICAgICAgIGhvdmVyQ29sb3JzWzBdLCBob3ZlckNvbG9yc1sxXSwgaG92ZXJDb2xvcnNbMl0pO1xuXG4gICAgICAgIENvbG9yQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlcixcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZGlzYWJsZWQsIC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpkaXNhYmxlZGAsXG4gICAgICAgICAgICBkaXNhYmxlZENvbG9yc1swXSwgZGlzYWJsZWRDb2xvcnNbMV0sIGRpc2FibGVkQ29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZSxgICtcbiAgICAgICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZSxgICtcbiAgICAgICAgICAgICAgICBgLnNob3cgPiAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZHJvcGRvd24tdG9nZ2xlYCxcbiAgICAgICAgICAgIGFjdGl2ZUNvbG9yc1swXSwgYWN0aXZlQ29sb3JzWzFdLCBhY3RpdmVDb2xvcnNbMl0pO1xuXG4gICAgICAgIENvbG9yQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlcixcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlOmZvY3VzLGAgK1xuICAgICAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCkuYWN0aXZlOmZvY3VzLGAgK1xuICAgICAgICAgICAgICAgIGAuc2hvdyA+IC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5kcm9wZG93bi10b2dnbGU6Zm9jdXNgLFxuICAgICAgICAgICAgYWN0aXZlQ29sb3JzWzBdLCBhY3RpdmVDb2xvcnNbMV0sIGFjdGl2ZUNvbG9yc1syXSk7XG5cblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZTpmb2N1cyxgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCkuYWN0aXZlOmZvY3VzLGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYC5zaG93ID4gLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmRyb3Bkb3duLXRvZ2dsZTpmb2N1c2ApXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBib3hTaGFkb3dBY3RpdmVGb2N1cylcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9OmZvY3VzLGAgKyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5mb2N1c2ApXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBib3hTaGFkb3dGb2N1cylcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgIH1cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBIVE1MLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZSB9IGZyb20gXCIuLi9jb2xvclBhbGV0dGVcIjtcbmltcG9ydCB7IEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IgfSBmcm9tIFwiLi4vY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3JcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRyb3BEb3duUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBEcm9wRG93blBhbmVsIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0xFRlQgPSBcImRyb3AtZG93bi1wYW5lbC1sZWZ0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1JJR0hUID0gXCJkcm9wLWRvd24tcGFuZWwtcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX1ZJU0lCTEUgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LXZpc2libGVcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9ISURERU4gPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWhpZGRlblwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYUEFORCA9IFwiZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtZXhwYW5kXCI7XG4gICAgc3RhdGljIENPTlRFTlRfQ09MTEFQU0UgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWNvbGxhcHNlXCI7XG4gICAgc3RhdGljIENPTlRFTlQgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50XCI7XG4gICAgc3RhdGljIEJVVFRPTiA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWNvbkNsYXNzLCB0eXBlID0gRHJvcERvd25QYW5lbC5UWVBFX0RBUkssIHNpemUgPSBEcm9wRG93blBhbmVsLlNJWkVfTUVESVVNLCBvcmllbnRhdGlvbiA9IERyb3BEb3duUGFuZWwuT1JJRU5UQVRJT05fTEVGVCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5tZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIzNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgdHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24tbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24tbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtY29udGVudFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjE1MHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LXdpZHRoXCIsIFwiNDUwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiOHB0IDE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQuZHJvcC1kb3duLXBhbmVsLWxlZnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIDEwcHQpIHRyYW5zbGF0ZSgwJSwwcHgpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQuZHJvcC1kb3duLXBhbmVsLXJpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC0xMDAlLCAxMHB0KSB0cmFuc2xhdGUoMzVwdCwwcHgpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1jb250ZW50LWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYXJyb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgNTAlKSB0cmFuc2xhdGUoMCUsLTNwdClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYXJyb3cgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiLTIwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYXJyb3cgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDUwJSw1MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1kZWNvcmF0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b246Zm9jdXMsXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi5mb2N1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm91dGxpbmVcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMCAwIDAuMnJlbSByZ2JhKDAsIDEyMywgMjU1LCAwLjI1KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24uZGlzYWJsZWQsXCIrIFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbjpkaXNhYmxlZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjY1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJzZWNvbmRhcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuICAgICAgICBcbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwiaW5mb1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcImRhbmdlclwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJsaWdodFwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJkYXJrXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1kcm9wRG93blBhbmVsUm9vdFwiLCBcImNsYXNzPWRyb3AtZG93bi1wYW5lbC1vdXRsaW5lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJidXR0b25cIiwgXCJpZD1idXR0b25cIiwgXCJjbGFzcz1kcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1hcnJvd1wiLCBcImNsYXNzPWRyb3AtZG93bi1wYW5lbC1hcnJvd1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWNvbnRlbnRcIiwgXCJjbGFzcz1kcm9wLWRvd24tcGFuZWwtY29udGVudFwiLCBcInRhYmluZGV4PTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShEcm9wRG93blBhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERyb3BEb3duUGFuZWwubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRDaGlsZChIVE1MLmkoXCJcIiwgdGhpcy5pY29uQ2xhc3MpKTtcblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQlVUVE9OKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnR5cGUpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVClcbiAgICAgICAgICAgIC5kaXNhYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMub3JpZW50YXRpb24pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbGlja2VkKSk7XG4gICAgICAgIENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZShuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSksIHRoaXMuY29tcG9uZW50LmdldChcImRyb3BEb3duUGFuZWxSb290XCIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gZHJvcERvd25QYW5lbENvbnRlbnQgXG4gICAgICovXG4gICAgc2V0UGFuZWxDb250ZW50KGRyb3BEb3duUGFuZWxDb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0Q2hpbGQoZHJvcERvd25QYW5lbENvbnRlbnQuY29tcG9uZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRlbnQoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb250ZW50KCkge1xuICAgICAgICBpZiAoIVN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSkuaXMoXCJkaXNwbGF5XCIsXCJibG9ja1wiKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSk7XG4gICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSlcbiAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UX0hJRERFTik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNZXRob2QsIExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsIEFic3RyYWN0VmFsaWRhdG9yLCBUZW1wbGF0ZUNvbXBvbmVudEZhY3RvcnksIENhbnZhc1N0eWxlcywgQ29tcG9uZW50LCBFdmVudE1hbmFnZXIsIElubGluZUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJDb21tb25JbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG4gICAgc3RhdGljIEVWRU5UX0VOVEVSRUQgPSBDb21tb25FdmVudHMuRU5URVJFRDtcbiAgICBzdGF0aWMgRVZFTlRfS0VZVVBQRUQgPSBDb21tb25FdmVudHMuS0VZVVBQRUQ7XG4gICAgc3RhdGljIEVWRU5UX0NIQU5HRUQgPSBDb21tb25FdmVudHMuQ0hBTkdFRDtcbiAgICBzdGF0aWMgRVZFTlRfQkxVUlJFRCA9IENvbW1vbkV2ZW50cy5CTFVSUkVEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcG9uZW50Q2xhc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7QWJzdHJhY3RWYWxpZGF0b3J9IHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dEVsZW1lbnRJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckVsZW1lbnRJZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudENsYXNzLFxuICAgICAgICBuYW1lLFxuICAgICAgICBtb2RlbCA9IG51bGwsXG4gICAgICAgIHZhbGlkYXRvciA9IG51bGwsIFxuICAgICAgICBwbGFjZWhvbGRlciA9IG51bGwsXG4gICAgICAgIGlucHV0RWxlbWVudElkID0gbnVsbCxcbiAgICAgICAgZXJyb3JFbGVtZW50SWQgPSBudWxsKSB7XG5cblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBYnN0cmFjdFZhbGlkYXRvcn0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSB2YWxpZGF0b3I7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtGdW5jdGlvbn0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRDbGFzcyA9IGNvbXBvbmVudENsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50SWQgPSBpbnB1dEVsZW1lbnRJZDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5lcnJvckVsZW1lbnRJZCA9IGVycm9yRWxlbWVudElkO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbnB1dEVsZW1lbnREYXRhQmluZGluZ30gKi9cbiAgICAgICAgdGhpcy5kYXRhQmluZGluZyA9IG51bGw7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKHRoaXMuY29tcG9uZW50Q2xhc3MpO1xuXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZSh0aGlzLmNvbXBvbmVudENsYXNzLm5hbWUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLCBcIjogIFwiICsgIHRoaXMucGxhY2Vob2xkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLndpdGhWYWxpZExpc3RlbmVyKG5ldyBNZXRob2QodGhpcyx0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUJpbmRpbmcgPSBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwsIHRoaXMudmFsaWRhdG9yKS50byh0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJrZXl1cFwiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMua2V5dXBwZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiY2hhbmdlXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jaGFuZ2VkKSlcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImJsdXJcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmJsdXJyZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwia2V5dXBcIiwgbmV3IE1ldGhvZCh0aGlzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNLZXlDb2RlKDEzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyZWQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBpZiAodGhpcy5lcnJvckVsZW1lbnRJZCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpXG4gICAgICAgICAgICAgICAgLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmVycm9yQ2xpY2tlZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBnZXQgdmFsdWUoKSB7IFxuICAgICAgICAvKiogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9ICovXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpO1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH0gKi9cbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmRhdGFCaW5kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFCaW5kaW5nLnB1c2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGtleXVwcGVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaXNLZXlDb2RlKDEzKSAmJiAhZXZlbnQuaXNLZXlDb2RlKDE2KSAmJiAhZXZlbnQuaXNLZXlDb2RlKDkpKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcIlwiID09PSBldmVudC50YXJnZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwiXCIgPT09IGV2ZW50LnRhcmdldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0NIQU5HRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQ0xJQ0tFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0VOVEVSRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBibHVycmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy50YWludGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpO1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0JMVVJSRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBlcnJvckNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5mb2N1cygpOyB9XG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2VsZWN0QWxsKCk7IH1cbiAgICBlbmFibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5lbmFibGUoKTsgfVxuICAgIGRpc2FibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5kaXNhYmxlKCk7IH1cbiAgICBjbGVhcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnZhbHVlID0gXCJcIjsgdGhpcy50YWludGVkID0gZmFsc2U7IHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpOyB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkxpbmtQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIExpbmtQYW5lbCB7XG5cbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgc3RhdGljIFNJWkVfU01BTEwgPSBcImxpbmstcGFuZWwtc21hbGxcIjtcbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcImxpbmstcGFuZWwtbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImxpbmstcGFuZWwtbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9GTEFUID0gXCJsaW5rLXBhbmVsLWZsYXRcIjtcbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fU1RBQ0tFRCA9IFwibGluay1wYW5lbC1zdGFja2VkXCI7XG5cbiAgICBzdGF0aWMgVEhFTUVfREFSSyA9IFwibGluay1wYW5lbC1kYXJrXCI7XG4gICAgc3RhdGljIFRIRU1FX0xJR0hUID0gXCJsaW5rLXBhbmVsLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRIRU1FX0RBTkdFUiA9IFwibGluay1wYW5lbC1kYW5nZXJcIjtcbiAgICBzdGF0aWMgVEhFTUVfSU5GTyA9IFwibGluay1wYW5lbC1pbmZvXCI7XG4gICAgc3RhdGljIFRIRU1FX1NVQ0NFU1MgPSBcImxpbmstcGFuZWwtc3VjY2Vzc1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGljb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYWJlbCwgaWNvbiwgdGhlbWUgPSBMaW5rUGFuZWwuVEhFTUVfREFSSywgb3JpZW50YXRpb24gPSBMaW5rUGFuZWwuT1JJRU5UQVRJT05fRkxBVCwgc2l6ZSA9IExpbmtQYW5lbC5TSVpFX1NNQUxMKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy50aGVtZSA9IHRoZW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyPExpbmtQYW5lbD59ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJzdHJldGNoXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMnB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC43NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1mbGF0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWZsYXQgPiAubGluay1wYW5lbC1pY29uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIycmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1zdGFja2VkXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLXNtYWxsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS4ycmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEuNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZGFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZGFyazpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjYmZiZmJmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1saWdodFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtbGlnaHQ6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzhmOGY4ZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZGFuZ2VyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZmYwMDAwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1kYW5nZXI6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2JmYmZiZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtaW5mb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzAwMDBmZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtaW5mbzpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjYmZiZmJmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1zdWNjZXNzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMDBmZjAwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1zdWNjZXNzOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZmZmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWljb25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLXJpZ2h0XCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9bGlua1wiLCBcImNsYXNzPWxpbmstcGFuZWxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWxpbmstcGFuZWwtaWNvblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiaWQ9aWNvblwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1saW5rLXBhbmVsLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImFcIiwgXCJpZD1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8TGlua1BhbmVsPn0gKi9cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShMaW5rUGFuZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoTGlua1BhbmVsLm5hbWUpO1xuICAgICAgICBcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwibGlua1wiKSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5zaXplKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLm9yaWVudGF0aW9uKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnRoZW1lKTtcblxuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGFiZWxcIikuc2V0Q2hpbGQodGhpcy5sYWJlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmljb24pIHtcbiAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImljb25cIikpXG4gICAgICAgICAgICAgICAgLmNsZWFyKClcbiAgICAgICAgICAgICAgICAuZW5hYmxlKHRoaXMuaWNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsaW5rXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoTGlua1BhbmVsLkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBtZXRob2QgXG4gICAgICovXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobWV0aG9kKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxpbmtcIikubGlzdGVuVG8oXCJjbGlja1wiLCBtZXRob2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFuZWwge1xuXG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTl9ST09UID0gXCJwYW5lbC10eXBlLWNvbHVtbi1yb290XCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTiA9IFwicGFuZWwtdHlwZS1jb2x1bW5cIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1RZUEVfUk9XID0gXCJwYW5lbC10eXBlLXJvd1wiO1xuXG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0xFRlQgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tbGVmdFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9SSUdIVCA9IFwicGFuZWwtY29udGVudC1hbGlnbi1yaWdodFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9DRU5URVIgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tY2VudGVyXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0pVU1RJRlkgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tanVzdGlmeVwiO1xuXG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9TSVpFX0FVVE8gPSBcInBhbmVsLXNpemUtYXV0b1wiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfU0laRV9NSU5JTUFMID0gXCJwYW5lbC1zaXplLW1pbmltYWxcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1NJWkVfUkVTUE9OU0lWRSA9IFwicGFuZWwtc2l6ZS1yZXNwb25zaXZlXCI7XG5cbiAgICBzdGF0aWMgT1BUSU9OX1NUWUxFX0NPTlRFTlRfUEFERElOR19TTUFMTCA9IFwicGFuZWwtY29udGVudC1wYWRkaW5nLXNtYWxsXCI7XG4gICAgc3RhdGljIE9QVElPTl9TVFlMRV9DT05URU5UX1BBRERJTkdfTEFSR0UgPSBcInBhbmVsLWNvbnRlbnQtcGFkZGluZy1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9QVElPTl9TVFlMRV9CT1JERVJfU0hBRE9XID0gXCJwYW5lbC1ib3JkZXItc2hhZG93XCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudEFsaWduIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gb3B0aW9ucyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0eXBlID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OX1JPT1QsXG4gICAgICAgIGNvbnRlbnRBbGlnbiA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0NFTlRFUixcbiAgICAgICAgc2l6ZSA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9TSVpFX0FVVE8sXG4gICAgICAgIG9wdGlvbnMgPSBbXSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5jb250ZW50QWxpZ24gPSBjb250ZW50QWxpZ247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheTxTdHJpbmc+fSAqL1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODUwcHQpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtcmVzcG9uc2l2ZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1iYXNpc1wiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiODAwcHRcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4NDlwdClcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1yZXNwb25zaXZlXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCI1MDBwdFwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB0KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1zaXplLXJlc3BvbnNpdmVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXR5cGUtY29sdW1uLXJvb3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC10eXBlLWNvbHVtblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtdHlwZS1yb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtYWxpZ24tbGVmdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImp1c3RpZnktY29udGVudFwiLCBcImxlZnRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LWFsaWduLXJpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LWFsaWduLWNlbnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1hbGlnbi1qdXN0aWZ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwic3BhY2UtYmV0d2VlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtYXV0b1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZ3Jvd1wiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LXNocmlua1wiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtbWluaW1hbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZ3Jvd1wiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LXNocmlua1wiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtcGFkZGluZy1zbWFsbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIycHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LXBhZGRpbmctbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiNnB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtYm9yZGVyLXNoYWRvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1wYW5lbFwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhbmVsLm5hbWUpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInBhbmVsXCIpKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnR5cGUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuY29udGVudEFsaWduKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpO1xuICAgIH1cblxufSIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIElubGluZUNvbXBvbmVudEZhY3RvcnksIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiTGluZVBhbmVsRW50cnlcIik7XG5cbmV4cG9ydCBjbGFzcyBMaW5lUGFuZWxFbnRyeSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuXHRcdC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgIH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cblx0ICovXG5cdHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcblx0XHRcdC5tZWRpYShcIkBtZWRpYSAobWluLXdpZHRoOiA3MzRweClcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnNlbGVjdG9yKFwiLmxpbmUtcGFuZWwtZW50cnlcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLmxpbmUtcGFuZWwtZW50cnktcmVjb3JkLWVsZW1lbnRcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMSAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjVweFwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5zZWxlY3RvcihcIi5saW5lLXBhbmVsLWVudHJ5LXJlY29yZC1zdWJyZWNvcmRlbGVtZW50cy1jb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLmxpbmUtcGFuZWwtZW50cnktc3VicmVjb3JkLWVsZW1lbnRzXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0Lm1lZGlhKFwiQG1lZGlhIChtYXgtd2lkdGg6IDczM3B4KVwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc2VsZWN0b3IoXCIubGluZS1wYW5lbC1lbnRyeVwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIubGluZS1wYW5lbC1lbnRyeS1yZWNvcmQtZWxlbWVudFwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiNXB4XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLmxpbmUtcGFuZWwtZW50cnktcmVjb3JkLXN1YnJlY29yZGVsZW1lbnRzLWNvbnRhaW5lclwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIubGluZS1wYW5lbC1lbnRyeS1zdWJyZWNvcmQtZWxlbWVudHNcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMSAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIubGluZS1wYW5lbC1lbnRyeS1leHBhbmRcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAxIGF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0LnN0eWxlKFwicGFkZGluZy1yaWdodFwiLCBcIjVweFwiKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0LnNlbGVjdG9yKFwiLmxpbmUtcGFuZWwtZW50cnktc3VicmVjb3JkLWVsZW1lbnRzLWluZGVudFwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDAgMzVweFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0LnNlbGVjdG9yKFwiLmxpbmUtcGFuZWwtZW50cnktcmVjb3JkLWVsZW1lbnRcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMSAwIGF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImNsYXNzPWxpbmUtcGFuZWwtZW50cnlcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1saW5lLXBhbmVsLWVudHJ5LXJlY29yZC1lbGVtZW50XCIsIFwiaWQ9cmVjb3JkRWxlbWVudENvbnRhaW5lclwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1saW5lLXBhbmVsLWVudHJ5LXJlY29yZC1lbGVtZW50XCIsIFwiaWQ9cmVjb3JkRWxlbWVudFwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKExpbmVQYW5lbEVudHJ5KTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoTGluZVBhbmVsRW50cnkubmFtZSk7XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENhbnZhc1N0eWxlcywgRXZlbnRNYW5hZ2VyLCBTdGF0ZU1hbmFnZXIsIFN0eWxlc2hlZXRCdWlsZGVyLCBJbmxpbmVDb21wb25lbnRGYWN0b3J5LCBTdHlsZXNoZWV0LCBDb21wb25lbnRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi9wYW5lbC9wYW5lbC5qc1wiO1xuaW1wb3J0IHsgTGluZVBhbmVsRW50cnkgfSBmcm9tIFwiLi90cmVlUGFuZWxFbnRyeS9saW5lUGFuZWxFbnRyeS5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJMaW5lUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBMaW5lUGFuZWwge1xuXG5cdHN0YXRpYyBFVkVOVF9SRUZSRVNIX0NMSUNLRUQgPSBcInJlZnJlc2hDbGlja2VkXCI7XG5cdHN0YXRpYyBSRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQgPSBcInJlY29yZEVsZW1lbnRSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIFJFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCA9IFwicmVjb3Jkc1N0YXRlVXBkYXRlUmVxdWVzdGVkXCI7XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge1BhbmVsfSBidXR0b25QYW5lbCBcblx0ICovXG5cdGNvbnN0cnVjdG9yKGJ1dHRvblBhbmVsID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxMaW5lUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy5saW5lUGFuZWxFbnRyeVByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoTGluZVBhbmVsRW50cnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxQYW5lbD59ICovXG5cdFx0dGhpcy5wYW5lbFByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoUGFuZWwpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gKi9cbiAgICAgICAgdGhpcy5hcnJheVN0YXRlID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQYW5lbH0gKi9cblx0XHR0aGlzLmJ1dHRvblBhbmVsID0gYnV0dG9uUGFuZWw7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0Lm1lZGlhKFwiQG1lZGlhIChtaW4td2lkdGg6IDczNHB4KVwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc2VsZWN0b3IoXCIubGluZS1wYW5lbFwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJ0b3BcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuXHRcdFx0XHRcdC5zdHlsZShcInBhZGRpbmdcIiwgXCI1cHhcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5tZWRpYShcIkBtZWRpYSAobWF4LXdpZHRoOiA3MzNweClcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnNlbGVjdG9yKFwiLmxpbmUtcGFuZWxcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZmZmZcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJwYWRkaW5nXCIsIFwiNXB4XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIubGluZS1wYW5lbC1jb250ZW50XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIubGluZS1wYW5lbC1idXR0b25zXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMSBhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcInBhZGRpbmctYm90dG9tXCIsIFwiNXB4XCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImNsYXNzPWxpbmUtcGFuZWxcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1saW5lLXBhbmVsLWJ1dHRvbnNcIiwgXCJpZD1idXR0b25QYW5lbFwiKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPWxpbmUtcGFuZWwtY29udGVudFwiLCBcImlkPXJlY29yZEVsZW1lbnRzXCIpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRhc3luYyBwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShMaW5lUGFuZWwpO1xuXHRcdENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShMaW5lUGFuZWwubmFtZSk7XG5cblx0XHRpZiAodGhpcy5idXR0b25QYW5lbCkge1xuXHRcdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJidXR0b25QYW5lbFwiLCB0aGlzLmJ1dHRvblBhbmVsLmNvbXBvbmVudCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hcnJheVN0YXRlLnJlYWN0KG5ldyBNZXRob2QodGhpcywgdGhpcy5oYW5kbGVBcnJheVN0YXRlKSk7XG5cblxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlIHsgRXZlbnRNYW5hZ2VyIH1cblx0ICovXG5cdGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG5cdC8qKlxuXHQgKiBAdHlwZSB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuXHQvKipcblx0ICogUmVzZXRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKi9cblx0YXN5bmMgcmVzZXQoZXZlbnQpIHtcblx0XHR0aGlzLmV2ZW50cy50cmlnZ2VyKExpbmVQYW5lbC5SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIFtldmVudCwgdGhpcy5hcnJheVN0YXRlXSk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZUFycmF5U3RhdGUoYXJyYXkpIHtcblx0XHRjb25zdCBwYW5lbCA9IGF3YWl0IHRoaXMucGFuZWxQcm92aWRlci5nZXQoW1xuXHRcdFx0UGFuZWwuUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OLCBcblx0XHRcdFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0xFRlQsIFxuXHRcdFx0UGFuZWwuUEFSQU1FVEVSX1NUWUxFX1NJWkVfTUlOSU1BTF0pO1xuXHRcdGFycmF5LmZvckVhY2goYXN5bmMgKHJlY29yZCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wb3B1bGF0ZVJlY29yZChwYW5lbCwgcmVjb3JkKTtcbiAgICAgICAgfSk7XG5cblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInJlY29yZEVsZW1lbnRzXCIsIHBhbmVsLmNvbXBvbmVudCk7XG4gICAgfVxuXG5cdCAgICAvKipgXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50fSBwYW5lbFxuICAgICAqIEBwYXJhbSB7YW55fSByZWNvcmQgXG4gICAgICovXG4gICAgYXN5bmMgcG9wdWxhdGVSZWNvcmQocGFuZWwsIHJlY29yZCkge1xuICAgICAgICBjb25zdCByZWNvcmRFbGVtZW50ID0gYXdhaXQgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihMaW5lUGFuZWwuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbbnVsbCwgcmVjb3JkXSk7XG4gICAgICAgIFxuXHRcdGlmICghcmVjb3JkRWxlbWVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGxpbmVQYW5lbEVudHJ5ID0gYXdhaXQgdGhpcy5saW5lUGFuZWxFbnRyeVByb3ZpZGVyLmdldChbdHJ1ZSwgcmVjb3JkXSk7XG5cdFx0bGluZVBhbmVsRW50cnkuY29tcG9uZW50LnNldENoaWxkKFwicmVjb3JkRWxlbWVudFwiLCByZWNvcmRFbGVtZW50LmNvbXBvbmVudCk7XG5cblx0XHRwYW5lbC5jb21wb25lbnQuYWRkQ2hpbGQoXCJwYW5lbFwiLCBsaW5lUGFuZWxFbnRyeS5jb21wb25lbnQpO1xuICAgIH1cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBIVE1MLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZSB9IGZyb20gXCIuLi9jb2xvclBhbGV0dGVcIjtcbmltcG9ydCB7IEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IgfSBmcm9tIFwiLi4vY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3JcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBvcFVwUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBQb3BVcFBhbmVsIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcInBvcC11cC1wYW5lbC1idXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcInBvcC11cC1wYW5lbC1idXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcInBvcC11cC1wYW5lbC1idXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0xFRlQgPSBcInBvcC11cC1wYW5lbC1sZWZ0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1JJR0hUID0gXCJwb3AtdXAtcGFuZWwtcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX1ZJU0lCTEUgPSBcInBvcC11cC1wYW5lbC1jb250ZW50LXZpc2libGVcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9ISURERU4gPSBcInBvcC11cC1wYW5lbC1jb250ZW50LWhpZGRlblwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYUEFORCA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtZXhwYW5kXCI7XG4gICAgc3RhdGljIENPTlRFTlRfQ09MTEFQU0UgPSBcInBvcC11cC1wYW5lbC1jb250ZW50LWNvbGxhcHNlXCI7XG4gICAgc3RhdGljIENPTlRFTlQgPSBcInBvcC11cC1wYW5lbC1jb250ZW50XCI7XG4gICAgc3RhdGljIEJVVFRPTiA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWNvbkNsYXNzLCB0eXBlID0gUG9wVXBQYW5lbC5UWVBFX0RBUkssIHNpemUgPSBQb3BVcFBhbmVsLlNJWkVfTUVESVVNLCBvcmllbnRhdGlvbiA9IFBvcFVwUGFuZWwuT1JJRU5UQVRJT05fTEVGVCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMzVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCB0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJjb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbi1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEuNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMTUwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtd2lkdGhcIiwgXCI0NTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI4cHQgMTRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtY29udGVudC5wb3AtdXAtcGFuZWwtbGVmdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgLTEwMCUpIHRyYW5zbGF0ZSgwJSwgLTQycHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnQucG9wLXVwLXBhbmVsLXJpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC0xMDAlLCAtMTAwJSkgdHJhbnNsYXRlKDM1cHQsLTQycHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnQtdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50LWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYXJyb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgLTEwMCUpIHRyYW5zbGF0ZSgwJSwtMzhwdClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYXJyb3cgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiNDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiLTIwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYXJyb3cgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNnB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTZweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDUwJSw1MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1kZWNvcmF0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b246Zm9jdXMsIC5wb3AtdXAtcGFuZWwtYnV0dG9uLmZvY3VzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3V0bGluZVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAwIDAgMC4ycmVtIHJnYmEoMCwgMTIzLCAyNTUsIDAuMjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbi5kaXNhYmxlZCwgLnBvcC11cC1wYW5lbC1idXR0b246ZGlzYWJsZWRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC42NVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwic2Vjb25kYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcbiAgICAgICAgXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDcyLCAxODAsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDcyLCAxODAsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcImluZm9cIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg1OCwgMTc2LCAxOTUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwid2FybmluZ1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyMiwgMTcwLCAxMiwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJkYW5nZXJcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjI1LCA4MywgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjI1LCA4MywgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwibGlnaHRcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMTYsIDIxNywgMjE5LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwiZGFya1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoODIsIDg4LCA5MywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1wb3BVcFBhbmVsUm9vdFwiLCBcImNsYXNzPXBvcC11cC1wYW5lbC1vdXRsaW5lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJidXR0b25cIiwgXCJpZD1idXR0b25cIiwgXCJjbGFzcz1wb3AtdXAtcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1hcnJvd1wiLCBcImNsYXNzPXBvcC11cC1wYW5lbC1hcnJvd1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWNvbnRlbnRcIiwgXCJjbGFzcz1wb3AtdXAtcGFuZWwtY29udGVudFwiLCBcInRhYmluZGV4PTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUG9wVXBQYW5lbCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQb3BVcFBhbmVsLm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0Q2hpbGQoSFRNTC5pKFwiXCIsIHRoaXMuaWNvbkNsYXNzKSk7XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkJVVFRPTilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy50eXBlKTtcblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlQpXG4gICAgICAgICAgICAuZGlzYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5zaXplKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLm9yaWVudGF0aW9uKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xpY2tlZCkpO1xuICAgICAgICBDYW52YXNSb290Lmxpc3RlblRvRm9jdXNFc2NhcGUobmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpLCB0aGlzLmNvbXBvbmVudC5nZXQoXCJwb3BVcFBhbmVsUm9vdFwiKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IHBvcFVwUGFuZWxDb250ZW50IFxuICAgICAqL1xuICAgIHNldFBhbmVsQ29udGVudChwb3BVcFBhbmVsQ29udGVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLnNldENoaWxkKHBvcFVwUGFuZWxDb250ZW50LmNvbXBvbmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50b2dnbGVDb250ZW50KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQ29udGVudCgpIHtcbiAgICAgICAgaWYgKCFTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikpLmlzKFwiZGlzcGxheVwiLFwiYmxvY2tcIikpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoUG9wVXBQYW5lbC5DT05URU5UX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UX1ZJU0lCTEUpO1xuICAgICAgICBTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikpXG4gICAgICAgICAgICAuc2V0KFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLmNvbnRhaW5lckVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoUG9wVXBQYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9ISURERU4pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEJhc2VFbGVtZW50LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuZXhwb3J0IGNsYXNzIFNsaWRlRGVja0VudHJ5IHtcblxuICAgIC8vc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9zbGlkZURlY2tFbnRyeS5odG1sXCI7XG4gICAgLy9zdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9zbGlkZURlY2tFbnRyeS5jc3NcIjtcblxuICAgIHN0YXRpYyBERUZBVUxUX0NMQVNTID0gXCJzbGlkZS1kZWNrLWVudHJ5XCI7XG5cbiAgICBzdGF0aWMgRU5UUllfUE9TSVRJT05fRlJPTlQgPSBcInBvc2l0aW9uLWZyb250XCI7XG4gICAgc3RhdGljIEVOVFJZX1BPU0lUSU9OX0JFSElORCA9IFwicG9zaXRpb24tYmVoaW5kXCI7XG4gICAgc3RhdGljIEVOVFJZX1BPU0lUSU9OX1JJR0hUID0gXCJwb3NpdGlvbi1yaWdodFwiO1xuXG4gICAgc3RhdGljIENPTlRFTlRfRVhJU1RBTkNFX1BSRVNFTlQgPSBcImV4aXN0YW5jZS1wcmVzZW50XCI7XG4gICAgc3RhdGljIENPTlRFTlRfRVhJU1RBTkNFX1JFTU9WRUQgPSBcImV4aXN0YW5jZS1yZW1vdmVkXCI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0ZST05UO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVjay1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwcHggMHB4IDEwcHggMTBweCAjY2NjY2NjXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZ3JpZC1jb2x1bW5cIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZ3JpZC1yb3dcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi1oZWlnaHRcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVjay1lbnRyeS5wb3NpdGlvbi1mcm9udFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgMCUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcInRyYW5zZm9ybSAuNnNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zbGlkZS1kZWNrLWVudHJ5LnBvc2l0aW9uLWJlaGluZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgMCUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcInRyYW5zZm9ybSAuNnNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zbGlkZS1kZWNrLWVudHJ5LnBvc2l0aW9uLXJpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCsxMDUlLCAwJSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwidHJhbnNmb3JtIC42c1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnktY29udGVudC5leGlzdGFuY2UtcmVtb3ZlZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVjay1lbnRyeS1jb250ZW50LmV4aXN0YW5jZS1wcmVzZW50XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9c2xpZGVEZWNrRW50cnlcIiwgXCJjbGFzcz1zbGlkZS1kZWNrLWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1zbGlkZURlY2tFbnRyeUNvbnRlbnRcIiwgXCJjbGFzcz1zbGlkZS1kZWNrLWVudHJ5LWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7QmFzZUVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwic2xpZGVEZWNrRW50cnlDb250ZW50XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtCYXNlRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXQgZW50cnlFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwic2xpZGVEZWNrRW50cnlcIik7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFNsaWRlRGVja0VudHJ5KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFNsaWRlRGVja0VudHJ5Lm5hbWUpO1xuICAgIH1cblxuICAgIHNldEluZGV4KGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LnNldENoaWxkKGNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50VmlzaWJpbGl0eShTbGlkZURlY2tFbnRyeS5DT05URU5UX0VYSVNUQU5DRV9QUkVTRU5UKTtcbiAgICAgICAgdGhpcy5zZXRTaGlmdChTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9GUk9OVCk7XG4gICAgfVxuXG4gICAgaGlkZShuZXh0SW5kZXgpIHtcbiAgICAgICAgaWYgKG5leHRJbmRleCA+IHRoaXMuaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZnQoU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fQkVISU5EKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZnQoU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fUklHSFQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRqdXN0V2hlbkhpZGRlbigpO1xuICAgIH1cblxuICAgIGFkanVzdFdoZW5IaWRkZW4oKSB7XG4gICAgICAgIFRpbWVQcm9taXNlLmFzUHJvbWlzZSg2MDAsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9GUk9OVCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudFZpc2liaWxpdHkoU2xpZGVEZWNrRW50cnkuQ09OVEVOVF9FWElTVEFOQ0VfUkVNT1ZFRCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldENvbnRlbnRWaXNpYmlsaXR5KGNvbnRlbnRWaXNpYmlsaXR5KSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29udGVudEVsZW1lbnQpLnJlcGxhY2UoXCJleGlzdGFuY2UtXCIsIGNvbnRlbnRWaXNpYmlsaXR5KTtcbiAgICB9XG5cbiAgICBzZXRTaGlmdChwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuZW50cnlFbGVtZW50KS5yZXBsYWNlKFwicG9zaXRpb24tXCIsIHBvc2l0aW9uKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdmlkZXIgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IFNsaWRlRGVja0VudHJ5IH0gZnJvbSBcIi4vc2xpZGVEZWNrRW50cnkvc2xpZGVEZWNrRW50cnkuanNcIjtcblxuZXhwb3J0IGNsYXNzIFNsaWRlRGVjayB7XG5cbiAgICBzdGF0aWMgRVZFTlRfRU5UUllfQ0hBTkdFRCA9IFwiZXZlbnRFbnRyeUNoYW5nZWRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWFwPENvbXBvbmVudD59IGNvbXBvbmVudE1hcCBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRNYXApIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNYXA8Q29tcG9uZW50Pn0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRNYXAgPSBjb21wb25lbnRNYXA7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQcm92aWRlcjxTbGlkZURlY2tFbnRyeT59ICovXG4gICAgICAgIHRoaXMuc2xpZGVEZWNrRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFNsaWRlRGVja0VudHJ5KTtcblxuICAgICAgICAvKiogQHR5cGUge0xpc3Q8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdCA9IG5ldyBMaXN0KCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNYXA8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPE51bWJlcj59ICovXG4gICAgICAgIHRoaXMuc2xpZGVEZWNrRW50cnlJbmRleE1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge1NsaWRlRGVja0VudHJ5fSAqL1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVja1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2YxZjFmMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJncmlkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPXNsaWRlRGVja0VudHJpZXNcIiwgXCJjbGFzcz1zbGlkZS1kZWNrXCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoU2xpZGVEZWNrKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFNsaWRlRGVjay5uYW1lKTtcblxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRNYXApIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZUVudHJpZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJpZXNcIikuZWxlbWVudC5wYXJlbnRFbGVtZW50LnNjcm9sbFRvKDAsMCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJlcGFyZUVudHJpZXMoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFwLmZvckVhY2goYXN5bmMgKGtleSwgY29tcG9uZW50KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHNsaWRlRGVja0VudHJ5ID0gYXdhaXQgdGhpcy5zbGlkZURlY2tFbnRyeVByb3ZpZGVyLmdldCgpO1xuXG4gICAgICAgICAgICBpZiAobnVsbCA9PSB0aGlzLmN1cnJlbnRFbnRyeSkge1xuICAgICAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IHNsaWRlRGVja0VudHJ5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzbGlkZURlY2tFbnRyeS5oaWRlKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TWFwLnNldChrZXksIHNsaWRlRGVja0VudHJ5KTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LmFkZChzbGlkZURlY2tFbnRyeSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5SW5kZXhNYXAuc2V0KGtleSwgdGhpcy5zbGlkZURlY2tFbnRyeUxpc3Quc2l6ZSgpIC0xKTtcblxuICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuc2V0Q29udGVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuc2V0SW5kZXgodGhpcy5zbGlkZURlY2tFbnRyeUxpc3Quc2l6ZSgpIC0gMSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmFkZENoaWxkKFwic2xpZGVEZWNrRW50cmllc1wiLCBzbGlkZURlY2tFbnRyeS5jb21wb25lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIHNsaWRlTmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEVudHJ5LmluZGV4ICsgMSA+PSB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0RW50cnkgPSB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5nZXQodGhpcy5jdXJyZW50RW50cnkuaW5kZXggKyAxKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuaGlkZShuZXh0RW50cnkuaW5kZXgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IG5leHRFbnRyeTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuc2hvdygpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihTbGlkZURlY2suRVZFTlRfRU5UUllfQ0hBTkdFRCk7XG4gICAgfVxuXG4gICAgc2xpZGVQcmV2aW91cygpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEVudHJ5LmluZGV4IDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0RW50cnkgPSB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5nZXQodGhpcy5jdXJyZW50RW50cnkuaW5kZXggLSAxKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuaGlkZShuZXh0RW50cnkuaW5kZXgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IG5leHRFbnRyeTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuc2hvdygpO1xuXG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2xpZGVEZWNrLkVWRU5UX0VOVFJZX0NIQU5HRUQpO1xuICAgIH1cblxuICAgIHNsaWRlVG8obmFtZSkge1xuICAgICAgICBjb25zdCBuZXh0RW50cnkgPSB0aGlzLnNsaWRlRGVja0VudHJ5TWFwLmdldChuYW1lKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuaGlkZShuZXh0RW50cnkuaW5kZXgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IG5leHRFbnRyeTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuc2hvdygpO1xuXG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2xpZGVEZWNrLkVWRU5UX0VOVFJZX0NIQU5HRUQpO1xuICAgIH1cblxufSIsImltcG9ydCB7XG4gICAgVGVtcGxhdGVDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb1RvZ2dsZUljb25cIik7XG5cbmV4cG9ydCBjbGFzcyBSYWRpb1RvZ2dsZUljb24ge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9FTkFCTEVEID0gQ29tbW9uRXZlbnRzLkVOQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0RJU0FCTEVEID0gQ29tbW9uRXZlbnRzLkRJU0FCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCI/XCIsIG1vZGVsID0gbnVsbCwgaWNvbiA9IFwiZmFzIGZhLXF1ZXN0aW9uXCIsIGxhYmVsID0gbnVsbCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLWljb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYmFja2dyb3VuZC1jb2xvciAwLjNzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjI0cHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1yYWRpb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYWxsIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lciBpbnB1dFt0eXBlPSdyYWRpbyddOm5vdCg6aXMoOmNoZWNrZWQpKSArIGxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJsaWdodGdyYXlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1jb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTpub3QoOmlzKDpjaGVja2VkKSkgKyBsYWJlbDpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiZ3JheVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lciBpbnB1dFt0eXBlPSdyYWRpbyddOmlzKDpjaGVja2VkKSArIGxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJzcGFuXCIsIFwiaWQ9Y29udGFpbmVyXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLWljb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXJhZGlvXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLWljb24tcmFkaW9cIiwgXCJ0eXBlPXJhZGlvXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJsYWJlbFwiLCBcImlkPWxhYmVsXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLWljb24tbGFiZWxcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiLCBcImlkPWljb25cIiwgXCJ0aXRsZT1cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShSYWRpb1RvZ2dsZUljb24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUmFkaW9Ub2dnbGVJY29uLm5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHJhZGlvID0gdGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9cIik7XG4gICAgICAgIHJhZGlvLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLCB0aGlzLm5hbWUpO1xuICAgICAgICByYWRpby5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbGlja2VkKSk7XG5cbiAgICAgICAgY29uc3QgaWQgPSByYWRpby5nZXRBdHRyaWJ1dGVWYWx1ZShcImlkXCIpO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5jb21wb25lbnQuZ2V0KFwibGFiZWxcIik7XG4gICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZVZhbHVlKFwiZm9yXCIsIGlkKTtcblxuICAgICAgICBjb25zdCBpY29uID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKTtcbiAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIHRoaXMuaWNvbik7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9cIikpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZUljb24uRVZFTlRfQ0hBTkdFRCwgW2V2ZW50XSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9FTkFCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0RJU0FCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRvZ2dsZSBzdGF0ZSBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkIFxuICAgICAqL1xuICAgIHRvZ2dsZShjaGVja2VkKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQgPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2hhbmdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJyYWRpb1wiKS5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdG9nZ2xlIHN0YXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRvZ2dsZUljb25cIik7XG5cbmV4cG9ydCBjbGFzcyBUb2dnbGVJY29uIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcInRvZ2dsZUljb24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwidG9nZ2xlSWNvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJ0b2dnbGVJY29uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJ0b2dnbGVJY29uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJ0b2dnbGVJY29uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcInRvZ2dsZUljb24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcInRvZ2dsZUljb24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJ0b2dnbGVJY29uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwidG9nZ2xlSWNvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwidG9nZ2xlSWNvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNQSU5ORVJfVklTSUJMRSA9IFwidG9nZ2xlSWNvbi1zcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCI7XG4gICAgc3RhdGljIFNQSU5ORVJfSElEREVOID0gXCJ0b2dnbGVJY29uLXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiO1xuXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRURcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGljb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCI/XCIsIG1vZGVsID0gbnVsbCwgbGFiZWwgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmVuYWJsZWRJY29uID0gXCJmYXMgZmEtY2lyY2xlLWNoZWNrXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZGlzYWJsZWRJY29uID0gXCJmYXMgZmEtY2lyY2xlXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZGlzYWJsZWRDb2xvciA9IFwibGlnaHRncmF5XCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZW5hYmxlZENvbG9yID0gXCIjMjE5NkYzXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaG92ZXJDb2xvciA9IFwiZ3JheVwiO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudG9nZ2xlLWljb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjFwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYmFja2dyb3VuZC1jb2xvciAwLjNzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMjBwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvZ2dsZS1pY29uLXJhZGlvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYWxsIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwic3BhblwiLCBcImlkPWNvbnRhaW5lclwiLCBcImNsYXNzPXRvZ2dsZS1pY29uLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1jaGVja2JveFwiLCBcImNsYXNzPXRvZ2dsZS1pY29uLXJhZGlvXCIsIFwidHlwZT1jaGVja2JveFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwibGFiZWxcIiwgXCJpZD1sYWJlbFwiLCBcImNsYXNzPXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJpZD1pY29uXCIsIFwidGl0bGU9XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxUb2dnbGVJY29uPn0gKi9cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShUb2dnbGVJY29uKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFRvZ2dsZUljb24ubmFtZSk7XG5cbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja2JveFwiKTtcbiAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIGNoZWNrYm94Lmxpc3RlblRvKFwiY2hhbmdlXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jaGFuZ2VkKSk7XG5cbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGFpbmVyXCIpO1xuICAgICAgICBjb250YWluZXIubGlzdGVuVG8oXCJtb3VzZW92ZXJcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmVuYWJsZUhvdmVyKSk7XG4gICAgICAgIGNvbnRhaW5lci5saXN0ZW5UbyhcIm1vdXNlb3V0XCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5kaXNhYmxlSG92ZXIpKTtcblxuICAgICAgICBjb25zdCBpZCA9IGNoZWNrYm94LmdldEF0dHJpYnV0ZVZhbHVlKFwiaWRcIik7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlVmFsdWUoXCJmb3JcIiwgaWQpO1xuXG4gICAgICAgIHRoaXMuYXBwbHlJY29uKHRoaXMuZGlzYWJsZWRJY29uKTtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yKHRoaXMuZGlzYWJsZWRDb2xvcik7XG5cbiAgICB9XG5cbiAgICBsb2FkSWNvbnMoZGlzYWJsZWRJY29uLCBlbmFibGVkSWNvbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkSWNvbiA9IGRpc2FibGVkSWNvbjtcbiAgICAgICAgdGhpcy5lbmFibGVkSWNvbiA9IGVuYWJsZWRJY29uO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPyB0aGlzLmFwcGx5SWNvbih0aGlzLmVuYWJsZWRJY29uKSA6IHRoaXMuYXBwbHlJY29uKHRoaXMuZGlzYWJsZWRJY29uKTtcbiAgICB9XG5cbiAgICBsb2FkQ29sb3JzKGRpc2FibGVkLCBlbmFibGVkLCBob3Zlcikge1xuICAgICAgICB0aGlzLmRpc2FibGVkQ29sb3IgPSBkaXNhYmxlZDtcbiAgICAgICAgdGhpcy5lbmFibGVkQ29sb3IgPSBlbmFibGVkO1xuICAgICAgICB0aGlzLmhvdmVyQ29sb3IgPSBob3ZlcjtcbiAgICAgICAgdGhpcy5lbmFibGVkID8gdGhpcy5hcHBseUNvbG9yKHRoaXMuZW5hYmxlZENvbG9yKSA6IHRoaXMuYXBwbHlDb2xvcih0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBtZXRob2QgXG4gICAgICovXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobWV0aG9kKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbWV0aG9kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hcHBseUljb24odGhpcy5lbmFibGVkSWNvbik7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sb3IodGhpcy5lbmFibGVkQ29sb3IpO1xuICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihUb2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5hcHBseUljb24odGhpcy5kaXNhYmxlZEljb24pO1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3IodGhpcy5kaXNhYmxlZENvbG9yKTtcbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihUb2dnbGVJY29uLkVWRU5UX0RJU0FCTEVELCBldmVudCk7XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvcihjb2xvcikge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiY29sb3I6IFwiICsgY29sb3IpO1xuICAgIH1cblxuICAgIGFwcGx5SWNvbihpY29uKSB7XG4gICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKTtcbiAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBpY29uKTtcbiAgICB9XG5cbiAgICBlbmFibGVIb3ZlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGFpbmVyXCIpO1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmhvdmVyQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUhvdmVyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiY29sb3I6IFwiICsgdGhpcy5lbmFibGVkQ29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG5cdENvbXBvbmVudCxcblx0RXZlbnRNYW5hZ2VyLFxuXHRTaW1wbGVFbGVtZW50LFxuXHRTdGF0ZU1hbmFnZXIsXG5cdFN0eWxlc2hlZXRCdWlsZGVyLFxuXHRDb21wb25lbnRCdWlsZGVyLFxuXHRJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi8uLi9wYW5lbC9wYW5lbC5qc1wiO1xuaW1wb3J0IHsgUmFkaW9Ub2dnbGVJY29uIH0gZnJvbSBcIi4uLy4uL2lucHV0L3JhZGlvVG9nZ2xlSWNvbi9yYWRpb1RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IFRvZ2dsZUljb24gfSBmcm9tIFwiLi4vLi4vaW5wdXQvdG9nZ2xlSWNvbi90b2dnbGVJY29uLmpzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVHJlZVBhbmVsRW50cnlcIik7XG5cbmV4cG9ydCBjbGFzcyBUcmVlUGFuZWxFbnRyeSB7XG5cblx0c3RhdGljIFJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwicmVjb3JkRWxlbWVudFJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCA9IFwic3ViUmVjb3Jkc1N0YXRlVXBkYXRlUmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBFVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFID0gXCJleHBhbmRUb2dnbGVPdmVycmlkZVwiO1xuXG4gICAgY29uc3RydWN0b3IocmVjb3JkID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxQYW5lbD59ICovXG5cdFx0dGhpcy5wYW5lbFByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoUGFuZWwpO1xuXG5cdFx0LyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG5cdFx0dGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdGF0ZU1hbmFnZXI8YW55W10+fSAqL1xuICAgICAgICB0aGlzLmFycmF5U3RhdGUgPSBuZXcgU3RhdGVNYW5hZ2VyKCk7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPFRyZWVQYW5lbEVudHJ5Pn0gKi9cblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihUcmVlUGFuZWxFbnRyeSk7XG5cblx0XHQvKiogQHR5cGUge1RvZ2dsZUljb259ICovXG5cdFx0dGhpcy5leHBhbmRUb2dnbGUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShUb2dnbGVJY29uKTtcblxuICAgICAgICAvKiogQHR5cGUge2FueX0gKi9cbiAgICAgICAgdGhpcy5yZWNvcmQgPSByZWNvcmQ7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0Lm1lZGlhKFwiQG1lZGlhIChtaW4td2lkdGg6IDczNHB4KVwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeVwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1yZWNvcmQtZWxlbWVudFwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiNXB4XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktcmVjb3JkLXN1YnJlY29yZC1lbGVtZW50cy1jb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktc3VicmVjb3JkLWVsZW1lbnRzXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LWJ1dHRvbnMtY29udGFpbmVyXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LWJ1dHRvbnNcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMSAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQubWVkaWEoXCJAbWVkaWEgKG1heC13aWR0aDogNzMzcHgpXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5XCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LXJlY29yZC1lbGVtZW50XCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCI1cHhcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1yZWNvcmQtc3VicmVjb3JkLWVsZW1lbnRzLWNvbnRhaW5lclwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1zdWJyZWNvcmQtZWxlbWVudHNcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMSAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktYnV0dG9ucy1jb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktYnV0dG9uc1wiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LWV4cGFuZFwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDEgYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJwYWRkaW5nLXJpZ2h0XCIsIFwiNXB4XCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1zdWJyZWNvcmQtZWxlbWVudHMtaW5kZW50XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMCAxOHB0XCIpXG5cdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1yZWNvcmQtZWxlbWVudFwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktYnV0dG9ucy1pbmRlbnRcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIDE4cHRcIilcblx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsLWVudHJ5XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1yZWNvcmQtZWxlbWVudFwiLCBcImlkPXJlY29yZEVsZW1lbnRDb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1leHBhbmRcIiwgXCJpZD1leHBhbmRCdXR0b25cIilcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPXRyZWUtcGFuZWwtZW50cnktcmVjb3JkLWVsZW1lbnRcIiwgXCJpZD1yZWNvcmRFbGVtZW50XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1idXR0b25zLWNvbnRhaW5lclwiLCBcImlkPWJ1dHRvbnNDb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1idXR0b25zLWluZGVudFwiLCBcImlkPWJ1dHRvbnNJbmRlbnRcIilcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPXRyZWUtcGFuZWwtZW50cnktYnV0dG9uc1wiLCBcImlkPWJ1dHRvbnNcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsLWVudHJ5LXJlY29yZC1zdWJyZWNvcmQtZWxlbWVudHMtY29udGFpbmVyXCIsIFwiaWQ9c3VicmVjb3JkRWxlbWVudHNDb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1zdWJyZWNvcmQtZWxlbWVudHMtaW5kZW50XCIsIFwiaWQ9c3VicmVjb3JkSW5kZW50XCIpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsLWVudHJ5LXN1YnJlY29yZC1lbGVtZW50c1wiLCBcImlkPXN1YnJlY29yZEVsZW1lbnRzXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRyZWVQYW5lbEVudHJ5KTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVHJlZVBhbmVsRW50cnkubmFtZSk7XG5cblx0XHR0aGlzLmV4cGFuZFRvZ2dsZS5ldmVudHMubGlzdGVuVG8oUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5sb2FkU3ViUmVjb3Jkc0NsaWNrZWQpKTtcblx0XHR0aGlzLmV4cGFuZFRvZ2dsZS5ldmVudHMubGlzdGVuVG8oUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0RJU0FCTEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZVN1YlJlY29yZHNDbGlja2VkKSk7XG5cblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImV4cGFuZEJ1dHRvblwiLCB0aGlzLmV4cGFuZFRvZ2dsZS5jb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZS5yZWFjdChuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGFuZGxlU3RhdGVDaGFuZ2UpKTtcblxuICAgIH1cblxuXHQvKipcblx0ICogQHJldHVybnMgeyBFdmVudE1hbmFnZXIgfVxuXHQgKi9cblx0Z2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZVN0YXRlQ2hhbmdlKG9iamVjdCkge1xuXHRcdGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0Y29uc3QgcGFuZWwgPSBhd2FpdCB0aGlzLnBhbmVsUHJvdmlkZXIuZ2V0KFtcblx0XHRcdFx0UGFuZWwuUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OLCBcblx0XHRcdFx0UGFuZWwuUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fTEVGVCwgXG5cdFx0XHRcdFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9TSVpFX01JTklNQUxdKTtcblxuXHRcdFx0b2JqZWN0LmZvckVhY2goYXN5bmMgKHJlY29yZCkgPT4ge1xuXHRcdFx0XHRhd2FpdCB0aGlzLnBvcHVsYXRlUmVjb3JkKHBhbmVsLCByZWNvcmQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwic3VicmVjb3JkRWxlbWVudHNcIiwgcGFuZWwuY29tcG9uZW50KTtcblx0XHR9XG4gICAgfVxuXG4gICAgLyoqXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50fSBwYW5lbFxuICAgICAqIEBwYXJhbSB7YW55fSByZWNvcmQgXG4gICAgICovXG4gICAgYXN5bmMgcG9wdWxhdGVSZWNvcmQocGFuZWwsIHJlY29yZCkge1xuXHRcdGNvbnN0IHRyZWVQYW5lbFN1YkVudHJ5ID0gYXdhaXQgdGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZGVyLmdldChbcmVjb3JkXSk7XG5cblx0XHRjb25zdCByZWNvcmRFbGVtZW50ID0gYXdhaXQgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtudWxsLCByZWNvcmQsIHRyZWVQYW5lbFN1YkVudHJ5LCB0aGlzXSk7XG4gICAgICAgIFxuXHRcdGlmICghcmVjb3JkRWxlbWVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRyZWVQYW5lbFN1YkVudHJ5LmNvbXBvbmVudC5zZXRDaGlsZChcInJlY29yZEVsZW1lbnRcIiwgcmVjb3JkRWxlbWVudC5jb21wb25lbnQpO1xuXG5cdFx0YXdhaXQgdGhpcy5ldmVudE1hbmFnZXJcblx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIFtudWxsLCB0cmVlUGFuZWxTdWJFbnRyeSwgcmVjb3JkXSk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5lbnRyeVJlcXVlc3RlZCkpO1xuXG5cdFx0dHJlZVBhbmVsU3ViRW50cnkuZXZlbnRzXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmV4cGFuZFRvZ2dsZU92ZXJyaWRlKSk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZCkpO1xuXG5cdFx0cGFuZWwuY29tcG9uZW50LmFkZENoaWxkKFwicGFuZWxcIiwgdHJlZVBhbmVsU3ViRW50cnkuY29tcG9uZW50KTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBlbnRyeVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnkpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGF3YWl0IHRoaXMuZXZlbnRzLnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgdHJlZVBhbmVsRW50cnksIHBhcmVudFRyZWVQYW5lbEVudHJ5XSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBleHBhbmRUb2dnbGVPdmVycmlkZShldmVudCwgdHJlZVBhbmVsRW50cnksIHJlY29yZCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5ldmVudHMudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCBbZXZlbnQsIHRyZWVQYW5lbEVudHJ5LCByZWNvcmRdKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyByZWxvYWRTdWJSZWNvcmRzKCkge1xuXHRcdGNvbnN0IGVsZW1lbnRCdXR0b25zQ29udGFpbmVyID0gYXdhaXQgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKTtcblx0XHRhd2FpdCB0aGlzLnN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQobnVsbCwgdGhpcy5yZWNvcmQsIHRoaXMuYXJyYXlTdGF0ZSwgZWxlbWVudEJ1dHRvbnNDb250YWluZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqIEBwYXJhbSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gc3RhdGVNYW5hZ2VyXG5cdCAqIEBwYXJhbSB7U2ltcGxlRWxlbWVudH0gZWxlbWVudEJ1dHRvbnNDb250YWluZXJcblx0ICovXG5cdGFzeW5jIHN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQoZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcikge1xuXHRcdHRyeSB7XG5cdFx0XHRhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0XHQudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG4gICAgYXN5bmMgbG9hZFN1YlJlY29yZHNDbGlja2VkKGV2ZW50KSB7XG5cdFx0Y29uc3QgZWxlbWVudEJ1dHRvbnNDb250YWluZXIgPSBhd2FpdCB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25zXCIpO1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlclxuXHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgW2V2ZW50LCB0aGlzLnJlY29yZCwgdGhpcy5hcnJheVN0YXRlLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqL1xuICAgIGhpZGVTdWJSZWNvcmRzQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRFbGVtZW50c1wiKS5jbGVhcigpO1xuXHRcdHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvbnNcIikuY2xlYXIoKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENhbnZhc1N0eWxlcywgRXZlbnRNYW5hZ2VyLCBTaW1wbGVFbGVtZW50LCBTdHlsZXNoZWV0QnVpbGRlciwgQ29tcG9uZW50QnVpbGRlciwgSW5saW5lQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgVHJlZVBhbmVsRW50cnkgfSBmcm9tIFwiLi90cmVlUGFuZWxFbnRyeS90cmVlUGFuZWxFbnRyeS5qc1wiO1xuaW1wb3J0IHsgUGFuZWwgfSBmcm9tIFwiLi4vcGFuZWwvcGFuZWwuanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVHJlZVBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgVHJlZVBhbmVsIHtcblxuXHRzdGF0aWMgRVZFTlRfUkVGUkVTSF9DTElDS0VEID0gXCJyZWZyZXNoQ2xpY2tlZFwiO1xuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBTVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJzdWJSZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIEVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUgPSBcImV4cGFuZFRvZ2dsZU92ZXJyaWRlXCI7XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge1BhbmVsfSBidXR0b25QYW5lbCBcblx0ICovXG5cdGNvbnN0cnVjdG9yKGJ1dHRvblBhbmVsID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxUcmVlUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihUcmVlUGFuZWxFbnRyeSk7XG5cblx0XHQvKiogQHR5cGUge1RyZWVQYW5lbEVudHJ5fSAqL1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtQYW5lbH0gKi9cblx0XHR0aGlzLmJ1dHRvblBhbmVsID0gYnV0dG9uUGFuZWw7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0Lm1lZGlhKFwiQG1lZGlhIChtaW4td2lkdGg6IDczNHB4KVwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbFwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJ0b3BcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuXHRcdFx0XHRcdC5zdHlsZShcInBhZGRpbmdcIiwgXCI1cHhcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5tZWRpYShcIkBtZWRpYSAobWF4LXdpZHRoOiA3MzNweClcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWxcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZmZmZcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJwYWRkaW5nXCIsIFwiNXB4XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1jb250ZW50XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1idXR0b25zXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMSBhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcInBhZGRpbmctYm90dG9tXCIsIFwiNXB4XCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1idXR0b25zXCIsIFwiaWQ9YnV0dG9ucGFuZWxcIilcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsLWNvbnRlbnRcIiwgXCJpZD1yb290ZWxlbWVudFwiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0YXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVHJlZVBhbmVsKTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVHJlZVBhbmVsLm5hbWUpO1xuXG5cdFx0aWYgKHRoaXMuYnV0dG9uUGFuZWwpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiYnV0dG9ucGFuZWxcIiwgdGhpcy5idXR0b25QYW5lbC5jb21wb25lbnQpO1xuXHRcdH1cblxuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkgPSBhd2FpdCB0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmllci5nZXQoKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmVudHJ5UmVxdWVzdGVkKSk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZXhwYW5kVG9nZ2xlT3ZlcnJpZGUpKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5zdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKSk7XG5cdFx0Ly8gUm9vdCBlbGVtZW50IGhhcyBubyByZWNvcmRcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRJbmRlbnRcIikucmVtb3ZlKCk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5jb21wb25lbnQuZ2V0KFwicmVjb3JkRWxlbWVudENvbnRhaW5lclwiKS5yZW1vdmUoKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlIHsgRXZlbnRNYW5hZ2VyIH1cblx0ICovXG5cdGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIHJvb3QgVHJlZVBhbmVsRW50cnkgd2hlbiBpdCdzIG9yIG9uZSBvZiBpdCdzIHN1Ym9yZGluYXRlIGVsZW1lbnRzIG5lZWQgdG8gYmUgcmVuZGVyZWRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBlbnRyeVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnkpIHtcblx0XHRMT0cuaW5mbyhcIkVudHJ5IHJlcXVlc3RlZFwiKTtcblx0XHR0cnkge1xuXG5cdFx0XHQvKiogQHR5cGUge2FueX0gKi9cblx0XHRcdGNvbnN0IHBhbmVsID0gYXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsLlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgW2V2ZW50LCByZWNvcmQsIHRyZWVQYW5lbEVudHJ5LCBwYXJlbnRUcmVlUGFuZWxFbnRyeV0pO1xuXG5cdFx0XHRyZXR1cm4gcGFuZWw7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgcm9vdCBUcmVlUGFuZWxFbnRyeSBpdCBhc2tzIGZvciB0aGUgZXhwYW5kIHRvZ2dsZSB0byBiZSBvdmVycmlkZGVuXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICogQHBhcmFtIHtUcmVlUGFuZWxFbnRyeX0gdHJlZVBhbmVsRW50cnlcblx0ICogQHBhcmFtIHthbnl9IHJlY29yZFxuXHQgKi9cblx0YXN5bmMgZXhwYW5kVG9nZ2xlT3ZlcnJpZGUoZXZlbnQsIHRyZWVQYW5lbEVudHJ5LCByZWNvcmQpIHtcblx0XHRMT0cuaW5mbyhcIkV4cGFuZCBUb2dnbGUgT3ZlcnJpZGUgcmVxdWVzdGVkXCIpO1xuXHRcdHRyeSB7XG5cblx0XHRcdGF3YWl0IHRoaXMuZXZlbnRzXG5cdFx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbC5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCBbdHJlZVBhbmVsRW50cnkuZXhwYW5kVG9nZ2xlLCByZWNvcmRdKTtcblxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIHJvb3QgVHJlZVBhbmVsRW50cnkgd2hlbiBpdCdzIG9yIG9uZSBvZiBpdCdzIHN1Ym9yZGluYXRlIGVsZW1lbnRzIG5lZWQgdGhlIHN0YXRlIG9mIHRoZSBzdWJyZWNvcmRzIHRvIGJlIHVwZGF0ZWQsXG5cdCAqIGZvciBleGFtcGxlIHdoZW4gdGhlIGV4cGFuZCBidXR0b24gaXMgY2xpY2tlZFxuXHQgKiBcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICogQHBhcmFtIHtTdGF0ZU1hbmFnZXI8YW55W10+fSBzdGF0ZU1hbmFnZXJcblx0ICogQHBhcmFtIHtTaW1wbGVFbGVtZW50fSBlbGVtZW50QnV0dG9uc0NvbnRhaW5lclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxUcmVlUGFuZWxFbnRyeVtdPn1cblx0ICovXG5cdGFzeW5jIHN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQoZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcikge1xuXHRcdHRyeSB7XG5cdFx0XHRhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0XHQudHJpZ2dlcihUcmVlUGFuZWwuU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgW2V2ZW50LCByZWNvcmQsIHN0YXRlTWFuYWdlciwgZWxlbWVudEJ1dHRvbnNDb250YWluZXJdKTtcblxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNldFxuXHQgKiBcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqL1xuXHRhc3luYyByZXNldChldmVudCkge1xuXHRcdGF3YWl0IHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChldmVudCwgbnVsbCwgdGhpcy50cmVlUGFuZWxFbnRyeS5hcnJheVN0YXRlKTtcblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInJvb3RlbGVtZW50XCIsIHRoaXMudHJlZVBhbmVsRW50cnkuY29tcG9uZW50KTtcblx0fVxufSIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIEhUTUwsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBFbGVtZW50VGhlbWVBcHBsaWNhdG9yIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9lbGVtZW50VGhlbWVBcHBsaWNhdG9yXCI7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGUgfSBmcm9tIFwiLi4vLi4vY29sb3JQYWxldHRlXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCdXR0b25cIik7XG5cbmV4cG9ydCBjbGFzcyBCdXR0b24ge1xuXG4gICAgc3RhdGljIFRZUEVfUFJJTUFSWSA9IFwiYnV0dG9uLXByaW1hcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TRUNPTkRBUlkgPSBcImJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJidXR0b24tc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcImJ1dHRvbi1pbmZvXCI7XG4gICAgc3RhdGljIFRZUEVfV0FSTklORyA9IFwiYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcImJ1dHRvbi1kYW5nZXJcIjtcbiAgICBzdGF0aWMgVFlQRV9MSUdIVCA9IFwiYnV0dG9uLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRZUEVfREFSSyA9IFwiYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwiYnV0dG9uLW1lZGl1bVwiO1xuICAgIHN0YXRpYyBTSVpFX0xBUkdFID0gXCJidXR0b24tbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBTUElOTkVSX1ZJU0lCTEUgPSBcImJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCI7XG4gICAgc3RhdGljIFNQSU5ORVJfSElEREVOID0gXCJidXR0b24tc3Bpbm5lci1jb250YWluZXItaGlkZGVuXCI7XG5cbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJ1dHRvblR5cGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWNvbkNsYXNzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGJ1dHRvblR5cGUgPSBCdXR0b24uVFlQRV9QUklNQVJZLCBidXR0b25TaXplID0gQnV0dG9uLlNJWkVfTUVESVVNLCBpY29uQ2xhc3MpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5idXR0b25UeXBlID0gYnV0dG9uVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5idXR0b25TaXplID0gYnV0dG9uU2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8QnV0dG9uPn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAubWVkaWEoXCJALXdlYmtpdC1rZXlmcmFtZXMgYnV0dG9uLXNwaW5uZXItcm90YXRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiMCVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsIFwicm90YXRlKDBkZWcpXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgwZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXRyYW5zZm9ybVwiLCBcInJvdGF0ZSgzNjBkZWcpXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgzNjBkZWcpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5tZWRpYShcIkBrZXlmcmFtZXMgYnV0dG9uLXNwaW5uZXItcm90YXRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiMCVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsIFwicm90YXRlKDBkZWcpXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgwZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXRyYW5zZm9ybVwiLCBcInJvdGF0ZSgzNjBkZWcpXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgzNjBkZWcpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24tb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbi1zcGlubmVyLCAuYnV0dG9uLXNwaW5uZXI6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEuNWVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLXNwaW5uZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItdG9wXCIsIFwiMC4yZW0gc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjIpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJpZ2h0XCIsIFwiMC4yZW0gc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjIpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWJvdHRvbVwiLCBcIjAuMmVtIHNvbGlkIHJnYmEoMTI4LCAxMjgsIDEyOCwgMC4yKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1sZWZ0XCIsIFwiMC4yZW0gc29saWQgIzk5OTk5OVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWigwKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy10cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVaKDApXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWigwKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtYW5pbWF0aW9uXCIsIFwiYnV0dG9uLXNwaW5uZXItcm90YXRlIDEuMXMgaW5maW5pdGUgbGluZWFyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYW5pbWF0aW9uXCIsIFwiYnV0dG9uLXNwaW5uZXItcm90YXRlIDEuMXMgaW5maW5pdGUgbGluZWFyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMi41ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjIuNWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCB0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJjb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLW1lZGl1bVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24tbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uOmZvY3VzLCAuYnV0dG9uLmZvY3VzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3V0bGluZVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAwIDAgMC4ycmVtIHJnYmEoMCwgMTIzLCAyNTUsIDAuMjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLmRpc2FibGVkLCAuYnV0dG9uOmRpc2FibGVkXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuNjVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJzZWNvbmRhcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuICAgICAgICBcbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcImluZm9cIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg1OCwgMTc2LCAxOTUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwibGlnaHRcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMTYsIDIxNywgMjE5LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJkYXJrXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9YnV0dG9uLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImJ1dHRvblwiLCBcImNsYXNzPWJ1dHRvblwiLCBcImlkPWJ1dHRvblwiLCBcInR5cGU9YnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1idXR0b24tc3Bpbm5lci1jb250YWluZXItaGlkZGVuXCIsIFwiaWQ9c3Bpbm5lckNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1idXR0b24tc3Bpbm5lclwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8QnV0dG9uPn0gKi9cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCdXR0b24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQnV0dG9uLm5hbWUpO1xuICAgICAgICBpZiAodGhpcy5pY29uQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5hZGRDaGlsZChIVE1MLmkoXCJcIiwgdGhpcy5pY29uQ2xhc3MpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmFkZENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpKVxuICAgICAgICAgICAgLmVuYWJsZShcImJ1dHRvblwiKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLmJ1dHRvblNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuYnV0dG9uVHlwZSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQnV0dG9uLkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBtZXRob2QgXG4gICAgICovXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobWV0aG9kKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG1ldGhvZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVuYWJsZUxvYWRpbmcoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJDb250YWluZXJcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShCdXR0b24uU1BJTk5FUl9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKEJ1dHRvbi5TUElOTkVSX1ZJU0lCTEUpO1xuICAgIH1cblxuICAgIGRpc2FibGVMb2FkaW5nKCkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyQ29udGFpbmVyXCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoQnV0dG9uLlNQSU5ORVJfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoQnV0dG9uLlNQSU5ORVJfSElEREVOKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ2hlY2tCb3hcIik7XG5cbmV4cG9ydCBjbGFzcyBDaGVja0JveCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsXCIyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsXCIwLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIixcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXVzZXItc2VsZWN0XCIsXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXVzZXItc2VsZWN0XCIsXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIixcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94IGlucHV0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIixcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcImNhbGMoMWVtICsgMC41cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiY2FsYygxZW0gKyAwLjVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLFwiI2VlZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveDpob3ZlciBpbnB1dCB+IC5jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiNjY2NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3ggaW5wdXQ6Y2hlY2tlZCB+IC5jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiMyMTk2RjNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3gtbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIixcIlxcXCJcXFwiXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveCBpbnB1dDpjaGVja2VkIH4gLmNoZWNrLWJveC1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3ggLmNoZWNrLWJveC1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLFwiMC41ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIixcIjAuNGVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcIjAuNmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsXCIwLjZlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLFwic29saWQgd2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItd2lkdGhcIixcIjAgM3B4IDNweCAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIixcInJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdHJhbnNmb3JtXCIsXCJyb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsXCJyb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwibGFiZWxcIiwgXCJpZD1jaGVjay1ib3hcIiwgXCJjbGFzcz1jaGVjay1ib3hcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9Y2hlY2tCb3hcIiwgXCJ0eXBlPWNoZWNrYm94XCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiY2xhc3M9Y2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgICAgICAudGV4dChcIiBTdGF5IGxvZ2dlZCBpblwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKENoZWNrQm94KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKENoZWNrQm94Lm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xuXG4gICAgICAgIGlmKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBFbWFpbFZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkVtYWlsSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBFbWFpbElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIkVtYWlsXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKEVtYWlsSW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgRW1haWxWYWxpZGF0b3IobWFuZGF0b3J5LCAhbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJlbWFpbElucHV0XCIsXG4gICAgICAgICAgICBcImVtYWlsRXJyb3JcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZW1haWwtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIixcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIixcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsXCIxcHggc29saWQgI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIixcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsXCJib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZW1haWwtaW5wdXQtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIixcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIixcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIixcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIixcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIixcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5lbWFpbC1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsXCJtYXgtaGVpZ2h0IC4zcyAuMnMsIHBhZGRpbmcgLjNzIC4ycywgb3BhY2l0eSAuMnMgMHMsIHZpc2liaWxpdHkgMHMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIixcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIixcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIixcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIixcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5lbWFpbC1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIixcIicnXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIixcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIixcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1lbWFpbEVycm9yXCIsIFwiY2xhc3M9ZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIkludmFsaWQgZW1haWwgYWRkcmVzc1wiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1lbWFpbElucHV0XCIsIFwidHlwZT10ZXh0XCIsIFwiY2xhc3M9ZW1haWwtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG5cbn0iLCJpbXBvcnQgeyBDb250YWluZXJFdmVudCwgQ29udGFpbmVyRmlsZURhdGEgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRFbnRyeSB7XG4gICAgXG4gICAgc3RhdGljIEVWRU5UX1JFTU9WRV9DTElDS0VEID0gXCJyZW1vdmVDbGlja2VkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhfSBmaWxlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGUpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29udGFpbmVyRmlsZURhdGF9ICovXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5maWxlTmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmZpbGVTaXplID0gZmlsZS5zaXplO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZmlsZVR5cGUgPSBmaWxlLnR5cGU7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXRvcFwiLCBcIjFweCBzb2xpZCAjZGRkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy10b3BcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktZGV0YWlscy1uYW1lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjUwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1yaWdodFwiLCBcIjEycHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzLXR5cGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM2NjZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIwLjllbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1yaWdodFwiLCBcIjEycHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1yZW1vdmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJncmF5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYmFja2dyb3VuZC1jb2xvciAwLjJzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcmVtb3ZlOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmOGY5ZmFcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzc1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImdhcFwiLCBcIjEycHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1zaXplXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMC45ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM2NjZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCI4MHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3MtYmFyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2U5ZWNlZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1iYXItZmlsbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzI4YTc0NVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwid2lkdGggMC4zcyBlYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLXN0YXR1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNjY2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiODBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktZGV0YWlsc1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1maWxlTmFtZVwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHMtbmFtZVwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcIkZpbGVuYW1lXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZVR5cGVcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzLXR5cGVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJGaWxlIFR5cGVcIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1yZW1vdmVCdXR0b25cIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1yZW1vdmVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiY2xhc3M9ZmFzIGZhLXRyYXNoXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVTaXplXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3Mtc2l6ZVwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcIkZpbGUgU2l6ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLWJhclwiLCBcImlkPWZpbGVQcm9ncmVzc1wiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLWJhci1maWxsXCIsIFwiaWQ9ZmlsZVByb2dyZXNzQmFyXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZVN0YXR1c1wiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLXN0YXR1c1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRmlsZVVwbG9hZEVudHJ5KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEZpbGVVcGxvYWRFbnRyeS5uYW1lKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lRWxlbWVudCA9IHRoaXMuY29tcG9uZW50LmdldChcImZpbGVOYW1lXCIpO1xuICAgICAgICBmaWxlTmFtZUVsZW1lbnQuc2V0Q2hpbGQodGhpcy5maWxlTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmaWxlU2l6ZUVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlU2l6ZVwiKTtcbiAgICAgICAgZmlsZVNpemVFbGVtZW50LnNldENoaWxkKCh0aGlzLmZpbGVTaXplIC8gMTAyNCkudG9GaXhlZCgyKSArIFwiIEtCXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZmlsZVR5cGVFbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVR5cGVcIik7XG4gICAgICAgIGZpbGVUeXBlRWxlbWVudC5zZXRDaGlsZCh0aGlzLmZpbGVUeXBlID8gdGhpcy5maWxlVHlwZSA6IFwiVW5rbm93blwiKTtcblxuICAgICAgICBjb25zdCByZW1vdmVCdXR0b24gPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJyZW1vdmVCdXR0b25cIik7XG4gICAgICAgIHJlbW92ZUJ1dHRvbi5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5yZW1vdmVDbGlrZWQpKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKHRoaXMuZmlsZSwgdGhpcy5maWxlLm5hbWUpO1xuXG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICByZW1vdmVDbGlrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkRW50cnkuRVZFTlRfUkVNT1ZFX0NMSUNLRUQsIFtldmVudCwgdGhpcy5maWxlXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YX0gZmlsZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqL1xuICAgIHVwZGF0ZVByb2dyZXNzKGZpbGUsIGtleSkge1xuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlUHJvZ3Jlc3NCYXJcIik7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5zZXRTdHlsZShcIndpZHRoXCIsIGZpbGUudXBsb2FkUGVyY2VudGFnZSArIFwiJVwiKTtcbiAgICAgICAgICAgIGlmIChmaWxlLnVwbG9hZFBlcmNlbnRhZ2UgPj0gMTAwKSB7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWRDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQsIENvbnRhaW5lckZpbGVEYXRhIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFNpbXBsZUVsZW1lbnQsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIEhUTUwsXG4gICAgU3RhdGVNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBGaWxlVXBsb2FkRW50cnkgfSBmcm9tIFwiLi9maWxlVXBsb2FkRW50cnkvZmlsZVVwbG9hZEVudHJ5LmpzXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50cy5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRmlsZVVwbG9hZFwiKTtcblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWQge1xuXG5cdHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJGaWxlVXBsb2FkXCI7XG5cblx0c3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcbiAgICBzdGF0aWMgRVZFTlRfRklMRV9BRERFRCA9IFwiZmlsZUFkZGVkXCI7XG4gICAgc3RhdGljIEVWRU5UX0ZJTEVfUkVNT1ZFRCA9IFwiZmlsZVJlbW92ZWRcIjtcbiAgICBzdGF0aWMgRVZFTlRfVVBMT0FEX0NPTVBMRVRFID0gXCJ1cGxvYWRDb21wbGV0ZVwiO1xuICAgIHN0YXRpYyBFVkVOVF9VUExPQURfUkVTRVQgPSBcInVwbG9hZFJlc2V0XCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG11bHRpcGxlXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBmaWxlVHlwZUFycmF5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbXVsdGlwbGUgPSBmYWxzZSwgZmlsZVR5cGVBcnJheSA9IFtdKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5tdWx0aXBsZSA9IG11bHRpcGxlO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgICAgICAgdGhpcy5maWxlVHlwZUFycmF5ID0gZmlsZVR5cGVBcnJheTtcblxuICAgICAgICAvKiogQHR5cGUge1N0YXRlTWFuYWdlcjxDb250YWluZXJGaWxlRGF0YT59ICAqL1xuICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UHJvdmlkZXI8RmlsZVVwbG9hZEVudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5maWxlVXBsb2FkRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKEZpbGVVcGxvYWRFbnRyeSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVycm9yXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lcnJvci12aXNpYmxlXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZXJyb3IgaVwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3hcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjJweCBkYXNoZWQgI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxNXB0XCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtYm94LWluc3RydWN0aW9ucy1pY29uXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjQ4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCI0OHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMCBhdXRvIDAgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtc2l6ZVwiLCBcImNvbnRhaW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiLCBcIm5vLXJlcGVhdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtcG9zaXRpb25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiNlMWUxZTFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIzcmVtXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnMtdGV4dFwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzZjNzU3ZFwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3gtZHJhZ292ZXJcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZTllY2VmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWNvbG9yXCIsIFwiIzgwYmRmZlwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1pbnB1dFwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtdW5zdXBwb3J0ZWQtZmlsZVwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZGMzNTQ1XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMC44NzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4yNXJlbSAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWxlZnRcIiwgXCIzcHggc29saWQgI2RjMzU0NVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctbGVmdFwiLCBcIjAuNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIwLjUwcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmOGQ3ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1maWxlVXBsb2FkRXJyb3JcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lcnJvciBmaWxlLXVwbG9hZC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCBmaWxlLXVwbG9hZFwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9dXBsb2FkQm94XCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtYm94XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWluc3RydWN0aW9uc1wiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWZpbGVJbnB1dFwiLCBcInR5cGU9ZmlsZVwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWlucHV0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXVwbG9hZEJveEljb25cIiwgXCJjbGFzcz1mYXMgZmEtdXBsb2FkIGZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnMtaWNvblwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXVuc3VwcG9ydGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZUxpc3RcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEZpbGVVcGxvYWQpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRmlsZVVwbG9hZC5uYW1lKTtcblxuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtTaW1wbGVFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIHVwbG9hZEJveC5saXN0ZW5UbyhcImRyYWdvdmVyXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5kcmFnT3ZlcikpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcmFnbGVhdmVcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmRyYWdMZWF2ZSkpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcm9wXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5maWxlRHJvcHBlZCkpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZmlsZUlucHV0Q2xpY2tlZCkpO1xuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgICAgICBmaWxlSW5wdXQuY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm11bHRpcGxlXCIsIFwibXVsdGlwbGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgIGZpbGVJbnB1dC5saXN0ZW5UbyhcImNoYW5nZVwiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZmlsZUlucHV0Q2hhbmdlZCkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgZmlsZUlucHV0Q2xpY2tlZChldmVudCkge1xuICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgIGZpbGVJbnB1dC5jb250YWluZXJFbGVtZW50LnZhbHVlID0gbnVsbDtcbiAgICAgICAgZmlsZUlucHV0LmNvbnRhaW5lckVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZmlsZUlucHV0Q2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnByb2Nlc3NGaWxlcyhldmVudC5maWxlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB1cGxvYWRlZCBmaWxlcyBhbmQgdmFsaWRhdGUgYWdhaW5zdCBmaWxlIHR5cGUgYXJyYXlcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhW119IGZpbGVzXG4gICAgICovXG4gICAgYXN5bmMgcHJvY2Vzc0ZpbGVzKGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEZpbGVzID0gW107XG4gICAgICAgIGNvbnN0IHVuc3VwcG9ydGVkRmlsZXMgPSBbXTtcbiAgICAgICAgY29uc3QgYWRkZWRGaWxlcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkRmlsZSA9IHRoaXMuaXNGaWxlVHlwZVN1cHBvcnRlZChmaWxlKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVBbHJlYWR5U2VsZXRlZCA9IHRoaXMuZmlsZUFscmVhZHlTZWxldGVkKGZpbGUpO1xuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZEZpbGUgJiYgIWZpbGVBbHJlYWR5U2VsZXRlZCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN1cHBvcnRlZEZpbGUpIHtcbiAgICAgICAgICAgICAgICB1bnN1cHBvcnRlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgc3VwcG9ydGVkIGZpbGVzXG4gICAgICAgIGlmIChzdXBwb3J0ZWRGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2Ygc3VwcG9ydGVkRmlsZXMpIHtcbiAgICAgICAgICAgICAgICBhZGRlZEZpbGVzLnB1c2goYXdhaXQgdGhpcy5maWxlQXJyYXlTdGF0ZS51cGRhdGUoZmlsZSwgZmlsZS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNob3cgdW5zdXBwb3J0ZWQgZmlsZXNcbiAgICAgICAgdGhpcy5zaG93VW5zdXBwb3J0ZWRGaWxlcyh1bnN1cHBvcnRlZEZpbGVzKTtcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVGaWxlTGlzdCgpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgZmlsZSBhZGRlZCBldmVudCBmb3IgZWFjaCBzdXBwb3J0ZWQgZmlsZVxuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgYWRkZWRGaWxlcykge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkLkVWRU5UX0ZJTEVfQURERUQsIFtmaWxlXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWxlQWxyZWFkeVNlbGV0ZWQoZmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlQXJyYXlTdGF0ZS5vYmplY3RNYXAuaGFzKGZpbGUubmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZmlsZSB0eXBlIGlzIHN1cHBvcnRlZFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRmlsZURhdGF9IGZpbGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZpbGVUeXBlU3VwcG9ydGVkKGZpbGUpIHtcbiAgICAgICAgLy8gSWYgZmlsZVR5cGVBcnJheSBpcyBlbXB0eSwgYWNjZXB0IGFsbCBmaWxlc1xuICAgICAgICBpZiAodGhpcy5maWxlVHlwZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBmaWxlJ3MgTUlNRSB0eXBlIG1hdGNoZXMgYW55IGluIHRoZSBmaWxlVHlwZUFycmF5XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVUeXBlQXJyYXkuaW5jbHVkZXMoZmlsZS50eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHVuc3VwcG9ydGVkIGZpbGVzIGluIHRoZSB1bnN1cHBvcnRlZCBkaXZcbiAgICAgKiBAcGFyYW0ge0FycmF5PEZpbGU+fSB1bnN1cHBvcnRlZEZpbGVzXG4gICAgICovXG4gICAgc2hvd1Vuc3VwcG9ydGVkRmlsZXModW5zdXBwb3J0ZWRGaWxlcykge1xuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZERpdiA9IHRoaXMuY29tcG9uZW50LmdldChcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuXG4gICAgICAgIGlmICh1bnN1cHBvcnRlZEZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHVuc3VwcG9ydGVkRGl2LmNsZWFyKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdW5zdXBwb3J0ZWRGaWxlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gSFRNTC5jdXN0b20oXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiZmlsZS11cGxvYWQtdW5zdXBwb3J0ZWQtZmlsZVwiKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC5zZXRDaGlsZChgRmlsZSBcIiR7ZmlsZS5uYW1lfVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWREaXYuYWRkQ2hpbGQobWVzc2FnZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBkcmFnT3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHVwbG9hZEJveCkuZW5hYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZEJveCA9IHRoaXMuY29tcG9uZW50LmdldChcInVwbG9hZEJveFwiKTtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odXBsb2FkQm94KS5kaXNhYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGZpbGVEcm9wcGVkKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZEJveCA9IHRoaXMuY29tcG9uZW50LmdldChcInVwbG9hZEJveFwiKTtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odXBsb2FkQm94KS5kaXNhYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc0ZpbGVzKGV2ZW50LmZpbGVzKTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVGaWxlTGlzdCgpIHtcbiAgICAgICAgY29uc3QgZmlsZUxpc3QgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlTGlzdFwiKTtcbiAgICAgICAgZmlsZUxpc3QuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkLkVWRU5UX1VQTE9BRF9SRVNFVCk7XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdE1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gYXdhaXQgdGhpcy5maWxlVXBsb2FkRW50cnlQcm92aWRlci5nZXQoW2ZpbGVdKTtcbiAgICAgICAgICAgIGZpbGVFbnRyeS5ldmVudHMubGlzdGVuVG8oRmlsZVVwbG9hZEVudHJ5LkVWRU5UX1JFTU9WRV9DTElDS0VELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMucmVtb3ZlRmlsZUVudHJ5LCBbZmlsZUVudHJ5XSkpO1xuICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdFRvKGZpbGUubmFtZSwgbmV3IE1ldGhvZChmaWxlRW50cnksIGZpbGVFbnRyeS51cGRhdGVQcm9ncmVzcykpO1xuICAgICAgICAgICAgZmlsZUxpc3QuYWRkQ2hpbGQoZmlsZUVudHJ5LmNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdChuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2hlY2tGaWxlVXBsb2FkQ29tcGxldGUpKTtcbiAgICB9XG5cbiAgICBjaGVja0ZpbGVVcGxvYWRDb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUFycmF5U3RhdGUub2JqZWN0TWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfUkVTRVQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdE1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKCFmaWxlLnVwbG9hZENvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfQ09NUExFVEUsIFt0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdEFycmF5XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0ZpbGV9IGZpbGVcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJnc1xuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUZpbGVFbnRyeShldmVudCwgZmlsZSwgYXJncykge1xuICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlLmRlbGV0ZShmaWxlLm5hbWUpO1xuICAgICAgICAvLyBDbGVhciB1bnN1cHBvcnRlZCBmaWxlcyB3aGVuIHVwZGF0aW5nIGZpbGUgbGlzdFxuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZERpdiA9IHRoaXMuY29tcG9uZW50LmdldChcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUZpbGVMaXN0KCk7XG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGNsaWNrIGV2ZW50IGZyb20gYnViYmxpbmcgdXAgdG8gdGhlIHVwbG9hZCBib3hcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGaWxlVXBsb2FkQ29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcblxuICAgIH1cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJIaWRkZW5JbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIEhpZGRlbklucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcblxuICAgICAgICBzdXBlcihIaWRkZW5JbnB1dCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgXCJoaWRkZW5JbnB1dFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmhpZGRlbi1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiaW5wdXRcIiwgXCJpZD1oaWRkZW5JbnB1dFwiLCBcInR5cGU9aGlkZGVuXCIsIFwiY2xhc3M9aGlkZGVuLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgTnVtYmVyVmFsaWRhdG9yLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRleHRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIE51bWJlcklucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIk51bWJlclwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBOdW1iZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKE51bWJlcklucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IE51bWJlclZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcIm51bWJlcklucHV0XCIsXG4gICAgICAgICAgICBcIm51bWJlckVycm9yXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1pbnB1dC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPW51bWJlckVycm9yXCIsIFwiY2xhc3M9bnVtYmVyLWlucHV0LWVycm9yIG51bWJlci1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCB2YWx1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1udW1iZXJJbnB1dFwiLCBcInR5cGU9bnVtYmVyXCIsIFwicGF0dGVybj1bMC05XSpcIiwgXCJpbnB1dG1vZGU9bnVtZXJpY1wiLCBcImNsYXNzPW51bWJlci1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwibnVtYmVyLWlucHV0LWVycm9yIG51bWJlci1pbnB1dC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJudW1iZXItaW5wdXQtZXJyb3IgbnVtYmVyLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgUmVxdWlyZWRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJQYXNzd29yZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQYXNzd29yZElucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkSW5wdXRcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRFcnJvclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1pbnB1dC1lcnJvclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcyAuMnMsIHBhZGRpbmcgLjNzIC4ycywgb3BhY2l0eSAuMnMgMHMsIHZpc2liaWxpdHkgMHMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMHB4IDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3IgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1wYXNzd29yZEVycm9yXCIsIFwiY2xhc3M9cGFzc3dvcmQtaW5wdXQtZXJyb3IgcGFzc3dvcmQtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIlBhc3N3b3JkIHJlcXVpcmVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXBhc3N3b3JkSW5wdXRcIiwgXCJ0eXBlPXBhc3N3b3JkXCIsIFwiY2xhc3M9cGFzc3dvcmQtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgUGFzc3dvcmRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJOZXcgcGFzc3dvcmRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBQYXNzd29yZFZhbGlkYXRvcihtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlRXJyb3JcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIyNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1jcmllcmlhLWxpc3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1pbmxpbmUtc3RhcnRcIiwgXCIyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUVycm9yXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJNaW5pbXVtIDggY2hhcmFjdGVycyBjb250YWluaW5nOlwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInVsXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1jcmllcmlhLWxpc3RcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTGV0dGVyKHMpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTnVtYmVyKHMpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiU3BlY2lhbCBjaGFyYWN0ZXIocykgIz8hQCQlXiYqLVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiYXV0b2NvbXBsZXRlPW5ldy1wYXNzd29yZFwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLCBcInR5cGU9cGFzc3dvcmRcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIkNvbmZpcm0gcGFzc3dvcmRcIjtcbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWUgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLFxuICAgICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvcihtYW5kYXRvcnksIGZhbHNlLCBtb2RlbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRmllbGRcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRXJyb3JcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImNhbGMoMS41ZW0gKyAwLjc1cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY2xpcFwiLCBcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEVycm9yXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiUGFzc3dvcmRzIG11c3QgbWF0Y2hcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9cGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRmllbGRcIiwgXCJ0eXBlPXBhc3N3b3JkXCIsIFwiYXV0b2NvbXBsZXRlPW5ldy1wYXNzd29yZFwiLCBcImNsYXNzPXBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3IgcGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yLWhpZGRlblwiKTsgfVxufSIsImV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJNb2RlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udHJvbFBhc3N3b3JkID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXROZXdQYXNzd29yZChuZXdQYXNzd29yZCkge1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkID0gbmV3UGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgZ2V0TmV3UGFzc3dvcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld1Bhc3N3b3JkO1xuICAgIH1cblxuICAgIHNldENvbnRyb2xQYXNzd29yZChjb250cm9sUGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sUGFzc3dvcmQgPSBjb250cm9sUGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgZ2V0Q29udHJvbFBhc3N3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sUGFzc3dvcmQ7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIEFuZFZhbGlkYXRvclNldCxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgUHJvcGVydHlBY2Nlc3NvciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJNb2RlbCB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlck1vZGVsLmpzXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dCB7XG5cblx0c3RhdGljIEVWRU5UX1ZBTElEQVRFRF9FTlRFUkVEID0gXCJ2YWxpZGF0ZWRFbnRlcmVkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250cm9sUGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsXG4gICAgICAgIG1vZGVsID0gbnVsbCxcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBcbiAgICAgICAgY29udHJvbFBsYWNlaG9sZGVyID0gUGFzc3dvcmRNYXRjaGVySW5wdXQuREVGQVVMVF9DT05UUk9MX1BMQUNFSE9MREVSLFxuICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBudWxsO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwgPSBuZXcgUGFzc3dvcmRNYXRjaGVyTW9kZWwoKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlfSAqL1xuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUsXG4gICAgICAgICAgICBbXCJuZXdQYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLCBwbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxuXHRcdCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2x9ICovXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wsXG4gICAgICAgICAgICBbXCJjb250cm9sUGFzc3dvcmRcIiwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCwgXCJuZXdQYXNzd29yZFwiLCBjb250cm9sUGxhY2Vob2xkZXIsIG1hbmRhdG9yeV1cblx0XHQpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtaGludFwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM4ODg4ODhcIilcbiAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOGVtXCIpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgLnN0eWxlKFwid2hpdGUtc3BhY2VcIiwgXCJub3dyYXBcIilcbiAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXJvb3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1oaW50XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIiogTXVzdCBjb250YWluIGxldHRlcnMsIG51bWJlcnMgYW5kIHNwZWNpYWwgY2hhcmFjdGVyc1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhc3N3b3JkTWF0Y2hlcklucHV0KTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUGFzc3dvcmRNYXRjaGVySW5wdXQubmFtZSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY29tcG9uZW50KTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLnBhc3N3b3JkVmFsdWVFbnRlcmVkKSlcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLnBhc3N3b3JkVmFsdWVDaGFuZ2VkKSk7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLnBhc3N3b3JkQ29udHJvbEVudGVyZWQpKTtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgQW5kVmFsaWRhdG9yU2V0KClcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkYXRvcih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE1ldGhvZCh0aGlzLCB0aGlzLnBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCkpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBwYXNzd29yZE1hdGNoZXJWYWxpZE9jY3VyZWQoKSB7XG4gICAgICAgIFByb3BlcnR5QWNjZXNzb3Iuc2V0VmFsdWUodGhpcy5tb2RlbCwgdGhpcy5uYW1lLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLmdldE5ld1Bhc3N3b3JkKCkpXG4gICAgfVxuXG4gICAgcGFzc3dvcmRWYWx1ZUVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzc3dvcmRWYWx1ZUNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwYXNzd29yZENvbnRyb2xFbnRlcmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUGFzc3dvcmRNYXRjaGVySW5wdXQuRVZFTlRfVkFMSURBVEVEX0VOVEVSRUQsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZm9jdXMoKTsgfVxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnNlbGVjdEFsbCgpOyB9XG4gICAgZW5hYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZW5hYmxlKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmRpc2FibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZGlzYWJsZSgpOyB9XG4gICAgY2xlYXIoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jbGVhcigpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jbGVhcigpOyB9XG59IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBQaG9uZVZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBob25lSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQaG9uZUlucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlBob25lXCI7XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQaG9uZUlucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFBob25lVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGhvbmVJbnB1dFwiLFxuICAgICAgICAgICAgXCJwaG9uZUVycm9yXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiY2FsYygxLjVlbSArIDAuNzVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jbGlwXCIsIFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtaW5wdXQtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5waG9uZS1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWlucHV0LWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMTUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtaW5wdXQtZXJyb3IgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5waG9uZS1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cGhvbmVFcnJvclwiLCBcImNsYXNzPXBob25lLWlucHV0LWVycm9yIHBob25lLWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJJbnZhbGlkIHBob25lIG51bWJlclwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInVsXCIsIFwiY2xhc3M9cGhvbmUtbWF0Y2hlci1pbnB1dC12YWx1ZS1jcmllcmlhLWxpc3RcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTXVzdCBzdGFydCB3aXRoICsgc2lnblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwibGlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcImZvbGxvd2VkIGJ5IG1pbmltdW0gOCBudW1iZXJzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1waG9uZUlucHV0XCIsIFwidHlwZT10ZXh0XCIsIFwiY2xhc3M9cGhvbmUtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGhvbmUtaW5wdXQtZXJyb3IgcGhvbmUtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGhvbmUtaW5wdXQtZXJyb3IgcGhvbmUtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG59IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlJhZGlvQnV0dG9uXCIpO1xuXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b24ge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsIFwiMmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjAuNWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24gaW5wdXRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbi1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMjBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItd2lkdGhcIiwgXCIxcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItc3R5bGVcIiwgXCJzb2xpZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiNiYmJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b246aG92ZXIgaW5wdXQgfiAuY2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbiBpbnB1dDpjaGVja2VkIH4gLnJhZGlvLWJ1dHRvbi1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNkZGRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24tbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCJcXFwiXFxcIlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbiBpbnB1dDpjaGVja2VkIH4gLnJhZGlvLWJ1dHRvbi1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uIC5yYWRpby1idXR0b24tbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyMTk2RjNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwibGFiZWxcIiwgXCJjbGFzcz1yYWRpby1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9cmFkaW9cIiwgXCJ0eXBlPXJhZGlvXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiY2xhc3M9cmFkaW8tYnV0dG9uLW1hcmtcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUmFkaW9CdXR0b24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUmFkaW9CdXR0b24ubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xpY2tlZCkpO1xuICAgIH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb0J1dHRvbi5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb1RvZ2dsZVN3aXRjaFwiKTtcblxuZXhwb3J0IGNsYXNzIFJhZGlvVG9nZ2xlU3dpdGNoIHtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfRU5BQkxFRCA9IENvbW1vbkV2ZW50cy5FTkFCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9ESVNBQkxFRCA9IENvbW1vbkV2ZW50cy5ESVNBQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfQ0hBTkdFRCA9IENvbW1vbkV2ZW50cy5DSEFOR0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2hcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiNDFwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjI0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicmlnaHRcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm90dG9tXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjY2NjXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjI0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiLjRzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXdpZHRoXCIsIFwiMXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXN0eWxlXCIsIFwic29saWRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItY29sb3JcIiwgXCIjYmJiXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXI6YmVmb3JlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCJcXFwiXFxcIlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE3cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE3cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMy41cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3R0b21cIiwgXCIzLjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiLjRzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgwKVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2g6aG92ZXIgLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNiYmJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0OmNoZWNrZWQgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiMxOTc2RDJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0OmNoZWNrZWQgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXI6YmVmb3JlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgxN3B0KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6Zm9jdXMgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAwIDFwdCAjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dDpkaXNhYmxlZCArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJub3QtYWxsb3dlZFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6ZGlzYWJsZWQ6aG92ZXIgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2NjY1wiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb25tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb25tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29ubXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwibGFiZWxcIiwgXCJjbGFzcz1yYWRpby10b2dnbGUtc3dpdGNoXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWNoZWNrYm94XCIsIFwidHlwZT1jaGVja2JveFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFJhZGlvVG9nZ2xlU3dpdGNoKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFJhZGlvVG9nZ2xlU3dpdGNoLm5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpLmxpc3RlblRvKFwiY2hhbmdlXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbGlja2VkKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVTd2l0Y2guRVZFTlRfQ0hBTkdFRCwgW2V2ZW50XSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlU3dpdGNoLkVWRU5UX0VOQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZVN3aXRjaC5FVkVOVF9ESVNBQkxFRCwgW2V2ZW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0b2dnbGUgc3RhdGUgcHJvZ3JhbW1hdGljYWxseVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCBcbiAgICAgKi9cbiAgICB0b2dnbGUoY2hlY2tlZCkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkID09PSBjaGVja2VkKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIE5vIGNoYW5nZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikuY29udGFpbmVyRWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHRvZ2dsZSBzdGF0ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgT3B0aW9uRWxlbWVudCxcbiAgICBTZWxlY3RFbGVtZW50LCBcbiAgICBTdHlsZXNoZWV0LFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiU2VsZWN0XCIpO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcblxuXHRzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiU2VsZWN0XCI7XG5cblx0c3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7QXJyYXk8T3B0aW9uRWxlbWVudD59IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgb3B0aW9ucyA9IFtdLCBwbGFjZWhvbGRlciA9IFNlbGVjdC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge0FycmF5PE9wdGlvbkVsZW1lbnQ+fSAqL1xuICAgICAgICB0aGlzLm9wdGlvbnNBcnJheSA9IG9wdGlvbnM7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMubWFuZGF0b3J5ID0gbWFuZGF0b3J5O1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFwdCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhcHBlYXJhbmNlXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LWFwcGVhcmFuY2VcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1pbWFnZVwiLCBcInVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsPHN2ZyBmaWxsPScyMTk2RjMnIGhlaWdodD0nMjAnIHZpZXdCb3g9JzAgMCAyMCAyMCcgd2lkdGg9JzIwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J003IDEwbDUgNSA1LTV6Jy8+PC9zdmc+XFxcIilcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiLCBcIm5vLXJlcGVhdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtcG9zaXRpb25cIiwgXCJyaWdodCAwLjc1cmVtIGNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtc2l6ZVwiLCBcIjEuNWVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB0IDhwdCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcyAuMnMsIHBhZGRpbmcgLjNzIC4ycywgb3BhY2l0eSAuMnMgMHMsIHZpc2liaWxpdHkgMHMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMHB4IDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZXJyb3IgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjMwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZXJyb3IgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHQgOHB0IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1zZWxlY3RFcnJvclwiLCBcImNsYXNzPXNlbGVjdC1lcnJvciBzZWxlY3QtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIkludmFsaWQgc2VsZWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzZWxlY3RcIiwgXCJpZD1zZWxlY3RcIiwgXCJjbGFzcz1zZWxlY3QtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTZWxlY3QpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoU2VsZWN0Lm5hbWUpO1xuXG5cdFx0LyoqIEB0eXBlIHtTZWxlY3RFbGVtZW50fSAqL1xuXHRcdGNvbnN0IHNlbGVjdCA9IHRoaXMuY29tcG9uZW50LmdldChcInNlbGVjdFwiKTtcblxuICAgICAgICBzZWxlY3QubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJzZWxlY3RcIikpO1xuICAgICAgICB9XG5cblx0XHRpZiAodGhpcy5vcHRpb25zQXJyYXkgJiYgdGhpcy5vcHRpb25zQXJyYXkubGVuZ3RoID4gMCkge1xuXHRcdFx0c2VsZWN0Lm9wdGlvbnMgPSB0aGlzLm9wdGlvbnNBcnJheTtcblx0XHR9XG5cbiAgICAgICAgc2VsZWN0Lmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7QXJyYXk8T3B0aW9uRWxlbWVudD59IG9wdGlvbnNBcnJheVxuXHQgKi9cblx0c2V0IG9wdGlvbnMob3B0aW9uc0FycmF5KSB7XG5cdFx0dGhpcy5vcHRpb25zQXJyYXkgPSBvcHRpb25zQXJyYXk7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHQvKiogQHR5cGUge1NlbGVjdEVsZW1lbnR9ICovXG5cdFx0XHRjb25zdCBzZWxlY3QgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJzZWxlY3RcIik7XG5cdFx0XHRpZiAoc2VsZWN0ICYmIHRoaXMub3B0aW9uc0FycmF5ICYmIHRoaXMub3B0aW9uc0FycmF5Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0c2VsZWN0Lm9wdGlvbnMgPSB0aGlzLm9wdGlvbnNBcnJheTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihTZWxlY3QuRVZFTlRfQ0xJQ0tFRCwgW2V2ZW50XSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIFJlcXVpcmVkVmFsaWRhdG9yLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVGV4dElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlRleHRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoVGV4dElucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKGZhbHNlLCBtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInRleHRJbnB1dFwiLFxuICAgICAgICAgICAgXCJ0ZXh0RXJyb3JcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudGV4dC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImNhbGMoMS41ZW0gKyAwLjc1cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY2xpcFwiLCBcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRleHQtaW5wdXQtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcyAuMnMsIHBhZGRpbmcgLjNzIC4ycywgb3BhY2l0eSAuMnMgMHMsIHZpc2liaWxpdHkgMHMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMHB4IDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudGV4dC1pbnB1dC1lcnJvci12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzLCBwYWRkaW5nIC4ycywgb3BhY2l0eSAuMnMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudGV4dC1pbnB1dC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRleHQtaW5wdXQtZXJyb3IgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC01MCUsLTUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9dGV4dEVycm9yXCIsIFwiY2xhc3M9dGV4dC1pbnB1dC1lcnJvciB0ZXh0LWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJJbnZhbGlkIHZhbHVlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXRleHRJbnB1dFwiLCBcInR5cGU9dGV4dFwiLCBcImNsYXNzPXRleHQtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInRleHQtaW5wdXQtZXJyb3IgdGV4dC1pbnB1dC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJ0ZXh0LWlucHV0LWVycm9yIHRleHQtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG59Il0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkxvZ2dlciIsIkluamVjdGlvblBvaW50IiwiSW5saW5lQ29tcG9uZW50RmFjdG9yeSIsIlRpbWVQcm9taXNlIiwiQ2FudmFzU3R5bGVzIiwiU3R5bGVBY2Nlc3NvciIsIkNvbnRhaW5lckFzeW5jIiwiRXZlbnRNYW5hZ2VyIiwiU3R5bGVTZWxlY3RvckFjY2Vzc29yIiwiTWV0aG9kIiwiTGlzdCIsIk5hdmlnYXRpb24iLCJDYW52YXNSb290IiwiQ29udGFpbmVyRWxlbWVudFV0aWxzIiwiSFRNTCIsIklucHV0RWxlbWVudERhdGFCaW5kaW5nIiwiU3RhdGVNYW5hZ2VyIiwiTWFwIiwiTE9HIiwiRW1haWxWYWxpZGF0b3IiLCJOdW1iZXJWYWxpZGF0b3IiLCJSZXF1aXJlZFZhbGlkYXRvciIsIlBhc3N3b3JkVmFsaWRhdG9yIiwiRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IiLCJBbmRWYWxpZGF0b3JTZXQiLCJQcm9wZXJ0eUFjY2Vzc29yIiwiUGhvbmVWYWxpZGF0b3IiLCJUZXh0SW5wdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sWUFBWSxDQUFDO0FBQzFCO0FBQ0EsSUFBSSxPQUFPLGNBQWMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEUsSUFBSSxPQUFPLG9CQUFvQixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsRSxJQUFJLE9BQU8sdUJBQXVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xFLElBQUksT0FBTyxxQkFBcUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEU7QUFDQSxJQUFJLE9BQU8sZ0JBQWdCLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BFLElBQUksT0FBTyxzQkFBc0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDcEUsSUFBSSxPQUFPLHlCQUF5QixHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNwRSxJQUFJLE9BQU8sdUJBQXVCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BFO0FBQ0EsSUFBSSxPQUFPLGNBQWMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEUsSUFBSSxPQUFPLG9CQUFvQixNQUFNLENBQUMsTUFBTSxDQUFDLFNB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
