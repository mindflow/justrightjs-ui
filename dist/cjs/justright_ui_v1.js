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
        this.component.get("bannerMessageCloseButton").listenTo("click", this.hide, this);
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

        this.component.get("bannerLabelMessageCloseButton").listenTo("click", this.closeClicked, this);
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
        this.success.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
        this.warning.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
        this.error.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
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
                .withBackgroundClicked(new coreutil_v1.Method(this.hide, this))]);

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
        this.component.get("closeButton").listenTo("click", this.close, this);
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
            this.component.get("dialogBoxOverlay"), this.close, this, 
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
        containerbridge_v1.ContainerElementUtils.scrollLockTo(this.component.get("dialogBoxContent").containerElement, 0, 0, 1000);
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

        this.component.get("button").listenTo("click", this.clicked, this);
        justright_core_v1.CanvasRoot.listenToFocusEscape(this.component.get("dropDownPanelRoot"), this.hide, this);
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

new coreutil_v1.Logger("FillPanel");

class FillPanel {


    /**
     * 
     */
    constructor() {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

    }

    setContent(component) {
        this.component.setChild("content", component);
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=content", "class=cntr cntr-rows cntr-grow-only width-full")
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(FillPanel);
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
            this.validator.withValidListener(new coreutil_v1.Method(this.hideValidationError, this));
        }

        if(this.model) {
            this.dataBinding = justright_core_v1.InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
        }

        this.component.get(this.inputElementId)
            .listenTo("keyup", this.keyupped, this)
            .listenTo("change", this.changed, this)
            .listenTo("blur", this.blurred, this)
            .listenTo("click", this.clicked, this)
            .listenTo("keyup", (event) => {
                if (event.isKeyCode(13)) {
                    this.entered(event);
                }
            }, this);

        if (this.errorElementId) {
            this.component.get(this.errorElementId)
                .listenTo("click", this.errorClicked, this);
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
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=cntr cntr-columns cntr-gap-small", "id=recordElement")

			.build();
	}

    async postConfig() {
		this.component = this.componentFactory.create(LinePanelEntry);
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
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=cntr cntr-gap-small cntr-rows cntr-prevent-size-change padding-small")
			.open()
				.node("div", "id=buttonPanel")
				.node("div", "class=cntr-override-grow-only cntr cntr-rows cntr-gap-medium", "id=recordElements")
			.close()
			.build();
	}

	async postConfig() {
		this.component = this.componentFactory.create(LinePanel);

		if (this.buttonPanel) {
			this.component.setChild("buttonPanel", this.buttonPanel.component);
		}

		this.arrayState.react(new coreutil_v1.Method(this.handleArrayState, this));


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
		array.forEach(async (record) => {
            this.component.addChild("recordElements", 
				await this.populateRecord(record));
        });

		
    }

	/**
     * @param {any} record 
     */
    async populateRecord(record) {
        const recordElement = await this.eventManager.trigger(LinePanel.RECORD_ELEMENT_REQUESTED, [null, record]);
        
		if (!recordElement) {
			return;
		}

		const linePanelEntry = await this.linePanelEntryProvider.get([true, record]);
		linePanelEntry.component.setChild("recordElement", recordElement.component);

		return linePanelEntry.component;
    }
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


        this.component.get("link").listenTo("click", (event) => {
            this.eventManager.trigger(LinkPanel.EVENT_CLICKED, event);
        }, this);
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

        this.component.get("button").listenTo("click", this.clicked, this);
        justright_core_v1.CanvasRoot.listenToFocusEscape(this.component.get("popUpPanelRoot"), this.hide, this);
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

        const radio = this.getRadio();
        radio.setAttributeValue("name", this.name);
        radio.listenTo("click", this.clicked, this);

        const id = radio.getAttributeValue("id");

        const label = this.component.get("label");
        label.setAttributeValue("for", id);

        const icon = this.component.get("icon");
        icon.setAttributeValue("class", this.icon);

        if (this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(radio);
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
     * @param {boolean} silent
     */
    toggle(checked, silent = false) {
        if (this.checked === checked) {
            return; // No change
        }
        this.checked = checked;
        if (!this.component) {
            return;
        }
        if (!silent) {
            this.getRadio().containerElement.click();
            return;
        }
        if (checked) {
            this.getRadio().checked = true;
        } else {
            this.getRadio().checked = false;
        }
        this.refreshColors();
    }

    /** @returns {RadioInputElement} */
    getRadio() {
        return this.component.get("radio");
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
     * @param {String} label
     * @param {Boolean} checked
     */
    constructor(name = "?", model = null, label = null, checked = false) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.checked = checked;

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
        this.events = new justright_core_v1.EventManager();
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

    postConfig() {
        this.component = this.componentFactory.create(ToggleIcon);
        justright_core_v1.CanvasStyles.enableStyle(ToggleIcon.name);

        const checkbox = this.getCheckbox();
        checkbox.setAttributeValue("name", this.name);
        checkbox.listenTo("change", this.changed, this);
        if (this.checked) {
            checkbox.setAttributeValue("checked", "checked");
        }

        const container = this.component.get("container");
        container.listenTo("mouseover", this.enableHover, this);
        container.listenTo("mouseout", this.disableHover, this);

        const id = checkbox.getAttributeValue("id");

        const label = this.component.get("label");
        label.setAttributeValue("for", id);

        this.refreshColors();

    }

    async refreshColors() {
        if (this.checked) {
            this.applyIcon(this.enabledIcon);
            this.applyColor(this.enabledColor);
            
        } else {
            this.applyIcon(this.disabledIcon);
            this.applyColor(this.disabledColor);
        }
    }

    loadIcons(disabledIcon, enabledIcon) {
        this.disabledIcon = disabledIcon;
        this.enabledIcon = enabledIcon;
        this.checked ? this.applyIcon(this.enabledIcon) : this.applyIcon(this.disabledIcon);
    }

    loadColors(disabled, checked, hover) {
        this.disabledColor = disabled;
        this.enabledColor = checked;
        this.hoverColor = hover;
        this.checked ? this.applyColor(this.enabledColor) : this.applyColor(this.disabledColor);
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.getCheckbox().listenTo("click", method);
        return this;
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} checked 
     * @param {boolean} silent
     */
    toggle(checked, silent = false) {
        if (this.checked === checked) {
            return; // No change
        }
        this.checked = checked;
        if (!this.component) {
            return;
        }
        if (!silent) {
            this.getCheckbox().containerElement.click();
            return;
        }
        if (checked) {
            this.getCheckbox().checked = true;
        } else {
            this.getCheckbox().checked = false;
        }
        this.refreshColors();
    }

    /**
     * 
     * @returns {CheckboxInputElement}
     */
    getCheckbox() {
        return this.component.get("checkbox");
    }

    /**
     * @param {ContainerEvent} event 
     * @returns 
     */
    changed(event) {
        this.checked = event.target.checked;

        this.refreshColors();

        if (this.checked) {
            this.events.trigger(ToggleIcon.EVENT_ENABLED, event);
            return;
        }
        
        this.events.trigger(ToggleIcon.EVENT_DISABLED, event);
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
        if (!this.checked) {
            container.setAttributeValue("style", "color: " + this.hoverColor);
        }
    }

    disableHover() {
        const container = this.component.get("container");
        if (this.checked) {
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

				.selector(".tree-panel-entry-bordered")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
					.style("border", "2pt solid #dddddd")
					.style("border-radius", "8pt 8pt 8pt 8pt")
					.style("padding-top", "6pt")
					.style("padding-left", "6pt")
					.style("margin-bottom", "2pt")
					.style("margin-right", "2pt")
				.close()

				.selector(".tree-panel-entry-record-element")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
					.style("margin-bottom", "3pt")
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

				.selector(".tree-panel-entry-bordered")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
					.style("border", "2pt solid #dddddd")
					.style("border-radius", "8pt 8pt 8pt 8pt")
					.style("padding-top", "6pt")
					.style("padding-left", "6pt")
					.style("margin-bottom", "2pt")
					.style("margin-right", "2pt")
				.close()

				.selector(".tree-panel-entry-record-element")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
					.style("margin-bottom", "3pt")
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
			.root("div", "class=tree-panel-entry", "id=root")
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

		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_ENABLED, this.loadSubRecordsClicked, this);
		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_DISABLED, this.hideSubRecordsClicked, this);

		this.component.setChild("expandButton", this.expandToggle.component);

        this.arrayState.react(new coreutil_v1.Method(this.handleStateChange, this));

    }

	async enableBorder() {
		this.component.get("root").setAttributeValue("class", "tree-panel-entry-bordered");
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
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, this.entryRequested, this);

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, this.expandToggleOverride, this);

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, this.subRecordsUpdateRequested, this);

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
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, this.entryRequested, this);
		this.treePanelEntry.events
			.listenTo(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, this.expandToggleOverride, this);
		this.treePanelEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, this.subRecordsUpdateRequested, this);
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

        this.component.get("button").listenTo("click", (event) => {
            this.eventManager.trigger(Button.EVENT_CLICKED, event);
        }, this);
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
        removeButton.listenTo("click", this.removeCliked, this);

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
        uploadBox.listenTo("dragover", this.dragOver, this);
        uploadBox.listenTo("dragleave", this.dragLeave, this);
        uploadBox.listenTo("drop", this.fileDropped, this);
        uploadBox.listenTo("click", this.fileInputClicked, this);

        if (this.multiple) {
            const fileInput = this.component.get("fileInput");
            fileInput.containerElement.setAttributeValue("multiple", "multiple");
        }

        const fileInput = this.component.get("fileInput");
        fileInput.listenTo("change", this.fileInputChanged, this);

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
            fileEntry.events.listenTo(FileUploadEntry.EVENT_REMOVE_CLICKED, this.removeFileEntry, this);
            this.fileArrayState.reactTo(file.name, new coreutil_v1.Method(fileEntry.updateProgress, fileEntry));
            fileList.addChild(fileEntry.component);
        }
        this.fileArrayState.react(new coreutil_v1.Method(this.checkFileUploadComplete, this));
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
            .listenTo(CommonInput.EVENT_ENTERED, this.passwordValueEntered, this)
            .listenTo(CommonInput.EVENT_KEYUPPED, this.passwordValueChanged, this);

        this.passwordMatcherInputControl.events
            .listenTo(CommonInput.EVENT_ENTERED, this.passwordControlEntered, this);

        /** @type {AndValidatorSet} */
        this.validator = new justright_core_v1.AndValidatorSet()
            .withValidator(this.passwordMatcherInputValue.validator)
            .withValidator(this.passwordMatcherInputControl.validator)
            .withValidListener(new coreutil_v1.Method(this.passwordMatcherValidOccured, this));

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

        this.component.get("radio").listenTo("click", this.clicked, this);
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

        this.component.get("checkbox").listenTo("change", this.clicked, this);
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        const oldValue = this.checked;
        this.checked = event.target.checked;

        if (oldValue !== this.checked) {
            this.events.trigger(RadioToggleSwitch.EVENT_CHANGED, [event, this.checked]);
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

        select.listenTo("click", this.clicked, this);
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
exports.FillPanel = FillPanel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jb2xvclBhbGV0dGUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGVwZW5kZW5jaWVzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja2dyb3VuZFZpZGVvL2JhY2tncm91bmRWaWRlby5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2Jhbm5lck1lc3NhZ2UvYmFubmVyTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsTWVzc2FnZS9iYW5uZXJMYWJlbE1lc3NhZ2UuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYW5uZXJMYWJlbC9iYW5uZXJMYWJlbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2NvbW1vbi9jb2xvckFwcGxpY2F0b3IuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jb21tb24vY29tbW9uRXZlbnRzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3IuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrU2hhZGUvYmFja1NoYWRlTGlzdGVuZXJzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja1NoYWRlL2JhY2tTaGFkZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9kcm9wRG93blBhbmVsL2Ryb3BEb3duUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9maWxsUGFuZWwvZmlsbFBhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvY29tbW9uSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9wYW5lbC9wYW5lbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2xpbmVQYW5lbC9saW5lUGFuZWxFbnRyeS9saW5lUGFuZWxFbnRyeS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2xpbmVQYW5lbC9saW5lUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9saW5rUGFuZWwvbGlua1BhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvcG9wVXBQYW5lbC9wb3BVcFBhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvc2xpZGVEZWNrL3NsaWRlRGVja0VudHJ5L3NsaWRlRGVja0VudHJ5LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvc2xpZGVEZWNrL3NsaWRlRGVjay5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3JhZGlvVG9nZ2xlSWNvbi9yYWRpb1RvZ2dsZUljb24uanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC90b2dnbGVJY29uL3RvZ2dsZUljb24uanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC90cmVlUGFuZWwvdHJlZVBhbmVsRW50cnkvdHJlZVBhbmVsRW50cnkuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC90cmVlUGFuZWwvdHJlZVBhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvYnV0dG9uL2J1dHRvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvZmlsZVVwbG9hZC9maWxlVXBsb2FkRW50cnkvZmlsZVVwbG9hZEVudHJ5LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvZmlsZVVwbG9hZC9maWxlVXBsb2FkLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvbnVtYmVySW5wdXQvbnVtYmVySW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZElucHV0L3Bhc3N3b3JkSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVyTW9kZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bob25lSW5wdXQvcGhvbmVJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3JhZGlvQnV0dG9uL3JhZGlvQnV0dG9uLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcmFkaW9Ub2dnbGVTd2l0Y2gvcmFkaW9Ub2dnbGVTd2l0Y2guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9zZWxlY3Qvc2VsZWN0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvdGV4dElucHV0L3RleHRJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2hpZGRlbklucHV0L2hpZGRlbklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvZW1haWxJbnB1dC9lbWFpbElucHV0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGRlc2NyaXB0aW9uIEZvbnQgY29sb3IsIGJhY2tncm91bmQgY29sb3IsIGFuZCBib3JkZXIgY29sb3IgcGFsZXR0ZXMgZm9yIHZhcmlvdXMgbW9kZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGUge1xuXG4gICAgc3RhdGljIFBSSU1BUllfQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiIzAwN2JmZlwiLFwiIzAwN2JmZlwiXTtcbiAgICBzdGF0aWMgUFJJTUFSWV9IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjMDA2OWQ5XCIsXCIjMDA2MmNjXCJdO1xuICAgIHN0YXRpYyBQUklNQVJZX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiM1ZWFiZmRcIixcIiM1ZWFiZmRcIl07XG4gICAgc3RhdGljIFBSSU1BUllfQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiIzAwNjJjY1wiLFwiIzAwNWNiZlwiXTtcblxuICAgIHN0YXRpYyBTRUNPTkRBUllfQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiIzZjNzU3ZFwiLFwiIzZjNzU3ZFwiXTtcbiAgICBzdGF0aWMgU0VDT05EQVJZX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiM1YTYyNjhcIixcIiM1NDViNjJcIl07XG4gICAgc3RhdGljIFNFQ09OREFSWV9ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjNmM3NTdkXCIsXCIjNmM3NTdkXCJdO1xuICAgIHN0YXRpYyBTRUNPTkRBUllfQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiIzU0NWI2MlwiLFwiIzRlNTU1YlwiXTtcblxuICAgIHN0YXRpYyBTVUNDRVNTX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiMyOGE3NDVcIixcIiMyOGE3NDVcIl07XG4gICAgc3RhdGljIFNVQ0NFU1NfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzIxODgzOFwiLFwiIzFlN2UzNFwiXTtcbiAgICBzdGF0aWMgU1VDQ0VTU19ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjMjhhNzQ1XCIsXCIjMjhhNzQ1XCJdO1xuICAgIHN0YXRpYyBTVUNDRVNTX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiMxZTdlMzRcIixcIiMxYzc0MzBcIl07XG5cbiAgICBzdGF0aWMgSU5GT19DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjMTdhMmI4XCIsXCIjMTdhMmI4XCJdO1xuICAgIHN0YXRpYyBJTkZPX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiMxMzg0OTZcIixcIiMxMTdhOGJcIl07XG4gICAgc3RhdGljIElORk9fRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzE3YTJiOFwiLFwiIzE3YTJiOFwiXTtcbiAgICBzdGF0aWMgSU5GT19BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjMTE3YThiXCIsXCIjMTA3MDdmXCJdO1xuXG4gICAgc3RhdGljIFdBUk5JTkdfQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiI2ZmYzEwN1wiLFwiI2ZmYzEwN1wiXTtcbiAgICBzdGF0aWMgV0FSTklOR19IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjZTBhODAwXCIsXCIjZDM5ZTAwXCJdO1xuICAgIHN0YXRpYyBXQVJOSU5HX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiNmZmMxMDdcIixcIiNmZmMxMDdcIl07XG4gICAgc3RhdGljIFdBUk5JTkdfQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiI2QzOWUwMFwiLFwiI2M2OTUwMFwiXTtcblxuICAgIHN0YXRpYyBEQU5HRVJfQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiI2RjMzU0NVwiLFwiI2RjMzU0NVwiXTtcbiAgICBzdGF0aWMgREFOR0VSX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiNjODIzMzNcIixcIiNiZDIxMzBcIl07XG4gICAgc3RhdGljIERBTkdFUl9ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjZGMzNTQ1XCIsXCIjZGMzNTQ1XCJdO1xuICAgIHN0YXRpYyBEQU5HRVJfQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiI2JkMjEzMFwiLFwiI2IyMWYyZFwiXTtcblxuICAgIHN0YXRpYyBMSUdIVF9DT0xPUlMgPSAgICAgICAgICBbXCIjMjEyNTI5XCIsXCIjZjhmOWZhXCIsXCIjZjhmOWZhXCJdO1xuICAgIHN0YXRpYyBMSUdIVF9IT1ZFUl9DT0xPUlMgPSAgICBbXCIjMjEyNTI5XCIsXCIjZTJlNmVhXCIsXCIjZGFlMGU1XCJdO1xuICAgIHN0YXRpYyBMSUdIVF9ESVNBQkxFRF9DT0xPUlMgPSBbXCIjMjEyNTI5XCIsXCIjZjhmOWZhXCIsXCIjZjhmOWZhXCJdO1xuICAgIHN0YXRpYyBMSUdIVF9BQ1RJVkVfQ09MT1JTID0gICBbXCIjMjEyNTI5XCIsXCIjZGFlMGU1XCIsXCIjZDNkOWRmXCJdO1xuXG4gICAgc3RhdGljIERBUktfQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiIzM0M2E0MFwiLFwiIzM0M2E0MFwiXTtcbiAgICBzdGF0aWMgREFSS19IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjMjMyNzJiXCIsXCIjMWQyMTI0XCJdO1xuICAgIHN0YXRpYyBEQVJLX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiMzNDNhNDBcIixcIiMzNDNhNDBcIl07XG4gICAgc3RhdGljIERBUktfQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiIzFkMjEyNFwiLFwiIzE3MWExZFwiXTtcbn0iLCJleHBvcnQgY2xhc3MgQ3VzdG9tQXBwZWFyYW5jZSB7XG5cbiAgICBzdGF0aWMgU0laRV9ERUZBVUwgPSBcInNpemUtZGVmYXVsdFwiO1xuICAgIHN0YXRpYyBTSVpFX1NNQUxMID0gXCJzaXplLXNtYWxsXCI7XG4gICAgc3RhdGljIFNJWkVfTUVESVVNID0gXCJzaXplLW1lZGl1bVwiO1xuICAgIHN0YXRpYyBTSVpFX0xBUkdFID0gXCJzaXplLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgU0hBUEVfREVBRlVMVCA9IFwic2hhcGUtZGVmYXVsdFwiO1xuICAgIHN0YXRpYyBTSEFQRV9ST1VORCA9IFwic2hhcGUtcm91bmRcIjtcbiAgICBzdGF0aWMgU0hBUEVfU1FVQVJFID0gXCJzaGFwZS1zcXVhcmVcIjtcblxuICAgIHN0YXRpYyBWSVNJQklMSVRZX0RFQUZVTFQgPSBcInZpc2liaWxpdHktZGVmYXVsdFwiO1xuICAgIHN0YXRpYyBWSVNJQklMSVRZX1ZJU0lCTEUgPSBcInZpc2liaWxpdHktdmlzaWJsZVwiO1xuICAgIHN0YXRpYyBWSVNJQklMSVRZX0hJRERFTiA9IFwidmlzaWJpbGl0eS1oaWRkZW5cIjtcblxuICAgIHN0YXRpYyBTUEFDSU5HX0RFRkFVTFQgPSBcInNwYWNpbmctZGVmYXVsdFwiO1xuICAgIHN0YXRpYyBTUEFDSU5HX05PTkUgPSBcInNwYWNpbmctbm9uZVwiO1xuICAgIHN0YXRpYyBTUEFDSU5HX0FCT1ZFID0gXCJzcGFjaW5nLWFib3ZlXCI7XG4gICAgc3RhdGljIFNQQUNJTkdfQkVMT1cgPSBcInNwYWNpbmctYmVsb3dcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19BQk9WRV9CRUxPVyA9IFwic3BhY2luZy1hYm92ZS1iZWxvd1wiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IEN1c3RvbUFwcGVhcmFuY2UuU0laRV9ERUZBVUxUO1xuICAgICAgICB0aGlzLnNoYXBlID0gQ3VzdG9tQXBwZWFyYW5jZS5TSEFQRV9ERUFGVUxUO1xuICAgICAgICB0aGlzLnNwYWNpbmcgPSBDdXN0b21BcHBlYXJhbmNlLlNQQUNJTkdfREVGQVVMVDtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gQ3VzdG9tQXBwZWFyYW5jZS5WSVNJQklMSVRZX0RFQUZVTFQ7XG4gICAgICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgd2l0aFNpemUoc2l6ZSkge1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB3aXRoU2hhcGUoc2hhcGUpIHtcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB3aXRoU3BhY2luZyhzcGFjaW5nKSB7XG4gICAgICAgIHRoaXMuc3BhY2luZyA9IHNwYWNpbmc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhWaXNpYmlsaXR5KHZpc2liaWxpdHkpIHtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gdmlzaWJpbGl0eTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmNpZXMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Q2xhc3MgPSBDb21wb25lbnQ7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LFxuXHRDYW52YXNTdHlsZXMsXG5cdFN0eWxlQWNjZXNzb3IsXG5cdFN0eWxlc2hlZXRCdWlsZGVyLFxuXHRDb21wb25lbnRCdWlsZGVyLFxuXHRJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuXHRTdHlsZXNoZWV0XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja2dyb3VuZFwiKTtcblxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmQge1xuXG4gICAgY29uc3RydWN0b3IoYmFja2dyb3VuZEltYWdlUGF0aCl7XG5cblx0XHQvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge3N0cmluZ30gKi9cblx0XHR0aGlzLmJhY2tncm91bmRJbWFnZVBhdGggPSBiYWNrZ3JvdW5kSW1hZ2VQYXRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2tncm91bmRcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInJnYigxNTAsIDE5NywgMjU1KVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiLCBcIm5vLXJlcGVhdFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLXhcIiwgXCJjZW50ZXJcIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1wb3NpdGlvbi15XCIsIFwiY2VudGVyXCIpXG5cdFx0XHRcdC5zdHlsZShcImJhY2tncm91bmQtYXR0YWNobWVudFwiLCBcInNjcm9sbFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCJjb3ZlclwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmb250LWZhbWlseVwiLCBcIlNvdXJjZSBTYW5zIFByb1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjMwMFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gdW5pcXVlSWRSZWdpc3RyeVxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJpZD1iYWNrZ3JvdW5kXCIsIFwiY2xhc3M9YmFja2dyb3VuZFwiKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmQpO1xuXHRcdGlmICh0aGlzLmJhY2tncm91bmRJbWFnZVBhdGgpIHtcbiAgICAgICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrZ3JvdW5kXCIpKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIFwidXJsKFxcXCJcIiArIHRoaXMuYmFja2dyb3VuZEltYWdlUGF0aCArIFwiXFxcIilcIik7XG5cdFx0fVxuXHRcdENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYWNrZ3JvdW5kLm5hbWUpO1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBWaWRlb0VsZW1lbnQsXG5cdENhbnZhc1N0eWxlcyxcblx0Q29tcG9uZW50LFxuXHRTdHlsZXNoZWV0QnVpbGRlcixcblx0Q29tcG9uZW50QnVpbGRlcixcblx0SW5saW5lQ29tcG9uZW50RmFjdG9yeSwgXG5cdFN0eWxlc2hlZXRcbiB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ29udGFpbmVyQXN5bmMgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCJcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhY2tncm91bmRWaWRlb1wiKTtcblxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmRWaWRlbyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih2aWRlb1NyYyl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy52aWRlb1NyYyA9IHZpZGVvU3JjO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2tncm91bmQtdmlkZW9cIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5zZWxlY3RvcihcIi5iYWNrZ3JvdW5kLXZpZGVvLXBsYXllclwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcImZpeGVkXCIpXG5cdFx0XHRcdC5zdHlsZShcInRvcFwiLCBcIjUwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJsZWZ0XCIsIFwiNTAlXCIpXG5cdFx0XHRcdC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwibWluLWhlaWdodFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpXCIpXG5cdFx0XHRcdC5zdHlsZShcInotaW5kZXhcIiwgXCIwXCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFja2dyb3VuZC12aWRlby1vdmVybGF5XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcblx0XHRcdFx0LnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMTAwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJtaW4taGVpZ2h0XCIsIFwiMTAwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJ3aWR0aFwiLCBcImF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzExNDRhYVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC4zXCIpXG5cdFx0XHRcdC5zdHlsZShcInotaW5kZXhcIiwgXCIxXCIpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0XHRcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXJcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiaWQ9YmFja2dyb3VuZFZpZGVvXCIsIFwiY2xhc3M9YmFja2dyb3VuZC12aWRlb1wiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPWJhY2tncm91bmQtdmlkZW8tb3ZlcmxheVwiKVxuXHRcdFx0XHQubm9kZShcInZpZGVvXCIsIFwiaWQ9dmlkZW9cIiwgXCJjbGFzcz1iYWNrZ3JvdW5kLXZpZGVvLXBsYXllclwiLFxuXHRcdFx0XHQgICAgICAgIFwicGxheXNpbmxpbmU9cGxheXNpbmxpbmVcIixcblx0XHRcdFx0XHRcdFwiYXV0b3BsYXk9dHJ1ZVwiLFxuXHRcdFx0XHQgICAgICAgIFwibXV0ZWQ9dHJ1ZVwiLCBcImxvb3A9bG9vcFwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0Lm5vZGUoXCJzb3VyY2VcIiwgXCJpZD1zb3VyY2VcIiwgXCJzcmM9XCIsIFwidHlwZT12aWRlby9tcDRcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdHNldChrZXksdmFsKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuc2V0KGtleSx2YWwpO1xuXHR9XG5cblx0cG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFja2dyb3VuZFZpZGVvKTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja2dyb3VuZFZpZGVvLm5hbWUpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInNvdXJjZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInNyY1wiLCB0aGlzLnZpZGVvU3JjKTtcblx0fVxuXG5cdGFzeW5jIHBsYXlNdXRlZCgpIHtcblx0XHRhd2FpdCBDb250YWluZXJBc3luYy5wYXVzZSgxMDApO1xuXHRcdC8qKiBAdHlwZSB7VmlkZW9FbGVtZW50fSAqL1xuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidmlkZW9cIik7XG5cdFx0dmlkZW8ucGxheU11dGVkKCk7XG5cdH1cblxufSIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgU3R5bGVzaGVldFxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCwgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEN1c3RvbUFwcGVhcmFuY2UgfSBmcm9tIFwiLi4vY3VzdG9tQXBwZWFyYW5jZS5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFubmVyTWVzc2FnZVwiKTtcblxuZXhwb3J0IGNsYXNzIEJhbm5lck1lc3NhZ2Uge1xuXG4gICAgc3RhdGljIFRZUEVfQUxFUlQgPSBcInR5cGUtYWxlcnRcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJ0eXBlLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJ0eXBlLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJ0eXBlLXdhcm5pbmdcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYW5uZXJUeXBlIFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xvc2VhYmxlIFxuICAgICAqIEBwYXJhbSB7Q3VzdG9tQXBwZWFyYW5jZX0gY3VzdG9tQXBwZWFyYW5jZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGJhbm5lclR5cGUgPSBCYW5uZXJNZXNzYWdlLlRZUEVfSU5GTywgY2xvc2VhYmxlID0gZmFsc2UsIGN1c3RvbUFwcGVhcmFuY2UgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5jbG9zZWFibGUgPSBjbG9zZWFibGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYmFubmVyVHlwZSA9IGJhbm5lclR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWV0aG9kfSAqL1xuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0N1c3RvbUFwcGVhcmFuY2V9ICovXG4gICAgICAgIHRoaXMuY3VzdG9tQXBwZWFyYW5jZSA9IGN1c3RvbUFwcGVhcmFuY2U7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNpemUtbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMThwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNpemUtZGVmYXVsdCwgLmJhbm5lci1tZXNzYWdlLXNpemUtbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEycHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zaXplLXNtYWxsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsIFwiMTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctcmlnaHRcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1ib3R0b21cIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLXRvcFwiLCBcIjhweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNoYXBlLWRlZmF1bHQsIC5iYW5uZXItbWVzc2FnZS1zaGFwZS1zcXVhcmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2hhcGUtcm91bmRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiM3B4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1kZWZhdWx0LCAuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1ub25lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1hYm92ZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1iZWxvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1hYm92ZS1iZWxvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAwLjVzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UuaGlkZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Uuc2hvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjkwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtdHlwZS1hbGVydFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjQ0MzM2XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtdHlwZS1zdWNjZXNzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiM0Q0FGNTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS10eXBlLWluZm9cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXR5cGUtd2FybmluZ1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmY5ODAwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsb2F0XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyMnB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIwLjNzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtY2xvc2UtYnV0dG9uOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJibGFja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLW1lc3NhZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWJhbm5lck1lc3NhZ2VcIiwgXCJjbGFzcz1iYW5uZXItbWVzc2FnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImlkPWJhbm5lck1lc3NhZ2VDbG9zZUJ1dHRvblwiLCBcImNsYXNzPWJhbm5lci1tZXNzYWdlLWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCLDl1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTWVzc2FnZUhlYWRlclwiLCBcImNsYXNzPWJhbm5lci1tZXNzYWdlLWhlYWRlclwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImlkPWJhbm5lck1lc3NhZ2VNZXNzYWdlXCIsIFwiY2xhc3M9YmFubmVyLW1lc3NhZ2UtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYW5uZXJNZXNzYWdlKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZUhlYWRlclwiKS5zZXRDaGlsZChcIkFsZXJ0XCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGZhZGVcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VDbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgYXBwbHlDbGFzc2VzKGJhc2VDbGFzc2VzKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gYmFzZUNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmJhbm5lclR5cGU7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLGNsYXNzZXMpO1xuICAgIH1cbiAgICBcbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGNsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25IaWRlTGlzdGVuZXIgXG4gICAgICovXG4gICAgb25IaWRlKG9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBvbkhpZGVMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25TaG93TGlzdGVuZXIgXG4gICAgICovXG4gICAgb25TaG93KG9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBvblNob3dMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGhpZGVcIik7XG4gICAgICAgIGF3YWl0IFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MDAsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLm9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyLmNhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNob3cobmV3SGVhZGVyID0gbnVsbCwgbmV3TWVzc2FnZSA9IG51bGwpIHtcbiAgICAgICAgaWYgKG5ld0hlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5hcHBseUhlYWRlcihuZXdIZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdNZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWVzc2FnZShuZXdNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgYXdhaXQgVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBzaG93XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vblNob3dMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIENvbXBvbmVudCxcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi8uLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJMYWJlbE1lc3NhZ2Uge1xuXG4gICAgc3RhdGljIGdldCBFVkVOVF9DTE9TRV9DTElDS0VEKCkgeyByZXR1cm4gXCJjbG9zZUNsaWNrZWRcIjsgfVxuXG4gICAgc3RhdGljIGdldCBUWVBFX0FMRVJUKCkgeyByZXR1cm4gXCJ0eXBlLWFsZXJ0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpIHsgcmV0dXJuIFwidHlwZS1pbmZvXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfU1VDQ0VTUygpIHsgcmV0dXJuIFwidHlwZS1zdWNjZXNzXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwidHlwZS13YXJuaW5nXCI7IH1cblxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGJhbm5lclR5cGUgPSBCYW5uZXJMYWJlbE1lc3NhZ2UuVFlQRV9JTkZPLCBjdXN0b21BcHBlYXJhbmNlID0gbnVsbCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmJhbm5lclR5cGUgPSBiYW5uZXJUeXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuOFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IC41cyAuMXNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IC41cyAwc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiMTVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbG9hdFwiLCBcInJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMjJwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMTRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiMC4zc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLWhlYWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10ZXh0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtdHlwZS1hbGVydFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjQ0MzM2XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtdHlwZS1zdWNjZXNzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiM0Q0FGNTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10eXBlLWluZm9cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXR5cGUtd2FybmluZ1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmY5ODAwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc2l6ZS1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxOHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc2l6ZS1kZWZhdWx0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEycHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaXplLXNtYWxsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsIFwiMTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctcmlnaHRcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1ib3R0b21cIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLXRvcFwiLCBcIjhweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNoYXBlLXNxdWFyZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaGFwZS1yb3VuZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIzcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zcGFjaW5nLW5vbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zcGFjaW5nLWFib3ZlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zcGFjaW5nLWJlbG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zcGFjaW5nLWFib3ZlLWJlbG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWJhbm5lckxhYmVsTWVzc2FnZVwiLCBcInN0eWxlPWRpc3BsYXk6bm9uZTtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJhbm5lckxhYmVsTWVzc2FnZUNvbnRlbnRcIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwtbWVzc2FnZSBiYW5uZXItbGFiZWwtbWVzc2FnZS1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImlkPWJhbm5lckxhYmVsTWVzc2FnZUNsb3NlQnV0dG9uXCIsIFwiY2xhc3M9YmFubmVyLWxhYmVsLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiw5dcIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlSGVhZGVyXCIsIFwiY2xhc3M9YmFubmVyLWxhYmVsLW1lc3NhZ2UtaGVhZGVyXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImlkPWJhbm5lckxhYmVsTWVzc2FnZVRleHRcIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwtbWVzc2FnZS10ZXh0XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFubmVyTGFiZWxNZXNzYWdlKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lckxhYmVsTWVzc2FnZS5uYW1lKTtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2VcIilcbiAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1cIiArIHRoaXMuYmFubmVyVHlwZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZSAmJiB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZSAmJiB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSkge1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UgJiYgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNwYWNpbmcpIHtcbiAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZUNsb3NlQnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUNsaWNrZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIGNsb3NlQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VEKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgIC5kaXNhYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtdmlzaWJsZVwiKVxuICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKTtcblxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgVGltZVByb21pc2UuYXNQcm9taXNlKDUwMCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VcIikpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZVwiKSlcbiAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG5cbiAgICAgICAgVGltZVByb21pc2UuYXNQcm9taXNlKDUwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgLmRpc2FibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLXZpc2libGVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IG1lc3NhZ2VDb250ZW50RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZUNvbnRlbnRcIik7XG4gICAgfVxuXG4gICAgc2V0TWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5hcHBseUhlYWRlcihoZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlSGVhZGVyXCIpLnNldENoaWxkKHRoaXMuaGVhZGVyKTtcbiAgICB9XG5cbiAgICBhcHBseU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VUZXh0XCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnRCdWlsZGVyLCBJbmxpbmVDb21wb25lbnRGYWN0b3J5LCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEN1c3RvbUFwcGVhcmFuY2UgfSBmcm9tIFwiLi4vY3VzdG9tQXBwZWFyYW5jZS5qc1wiO1xuaW1wb3J0IHsgQmFubmVyTGFiZWxNZXNzYWdlIH0gZnJvbSBcIi4vYmFubmVyTGFiZWxNZXNzYWdlL2Jhbm5lckxhYmVsTWVzc2FnZS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgQmFubmVyTGFiZWwge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdHRoaXMuYXBwZWFyYW5jZSA9IG5ldyBDdXN0b21BcHBlYXJhbmNlKClcblx0XHRcdC53aXRoU2l6ZShDdXN0b21BcHBlYXJhbmNlLlNJWkVfU01BTEwpXG5cdFx0XHQud2l0aFNoYXBlKEN1c3RvbUFwcGVhcmFuY2UuU0hBUEVfUk9VTkQpXG5cdFx0XHQud2l0aFNwYWNpbmcoQ3VzdG9tQXBwZWFyYW5jZS5TUEFDSU5HX0JFTE9XKTtcblxuXHRcdC8qKiBAdHlwZSB7QmFubmVyTGFiZWxNZXNzYWdlfSAqL1xuXHRcdHRoaXMuc3VjY2VzcyA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfU1VDQ0VTUywgdGhpcy5hcHBlYXJhbmNlXSk7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsTWVzc2FnZX0gKi9cblx0XHR0aGlzLndhcm5pbmcgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX1dBUk5JTkcsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG5cdFx0LyoqIEB0eXBlIHtCYW5uZXJMYWJlbE1lc3NhZ2V9ICovXG5cdFx0dGhpcy5lcnJvciA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfQUxFUlQsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzLCB2aXNpYmlsaXR5IDBzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4zcywgdmlzaWJpbGl0eSAwcyAuM3NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1iYW5uZXJMYWJlbFwiLCBcImNsYXNzPWJhbm5lci1sYWJlbCBiYW5uZXItbGFiZWwtaGlkZGVuXCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYW5uZXJMYWJlbCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYW5uZXJMYWJlbC5uYW1lKTtcbiAgICAgICAgdGhpcy5zdWNjZXNzLmhpZGUoKTtcbiAgICAgICAgdGhpcy53YXJuaW5nLmhpZGUoKTtcbiAgICAgICAgdGhpcy5lcnJvci5oaWRlKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLmFkZENoaWxkKHRoaXMuc3VjY2Vzcy5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5hZGRDaGlsZCh0aGlzLndhcm5pbmcuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuYWRkQ2hpbGQodGhpcy5lcnJvci5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCB0aGlzLmhpZGUsIHRoaXMpO1xuICAgICAgICB0aGlzLndhcm5pbmcuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCB0aGlzLmhpZGUsIHRoaXMpO1xuICAgICAgICB0aGlzLmVycm9yLmV2ZW50TWFuYWdlci5saXN0ZW5UbyhCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCwgdGhpcy5oaWRlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLnN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzaG93U3VjY2VzcyhoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93QmFubmVyKHRoaXMuc3VjY2VzcywgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIHNob3dXYXJuaW5nKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy53YXJuaW5nLCBoZWFkZXIsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgc2hvd0Vycm9yKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy5lcnJvciwgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIGhpZGUoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhbm5lci1sYWJlbCBiYW5uZXItbGFiZWwtaGlkZGVuXCIpO1xuICAgICAgICB0aGlzLmFjdGl2ZS5oaWRlKCk7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCYW5uZXJMYWJlbE1lc3NhZ2V9IGJhbm5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqL1xuICAgICBzaG93QmFubmVyKGJhbm5lciwgaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXHRcdGJhbm5lci5zZXRNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSk7XG4gICAgICAgIGJhbm5lci5zaG93KCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYW5uZXItbGFiZWwgYmFubmVyLWxhYmVsLXZpc2libGVcIik7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcblx0XHR0aGlzLmFjdGl2ZSA9IGJhbm5lcjtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIENvbG9yQXBwbGljYXRvciB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvbnRDb2xvciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYmFja2dyb3VuZENvbG9yIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib3JkZXJDb2xvciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIHNlbGVjdG9yLCBmb250Q29sb3IsIGJhY2tncm91bmRDb2xvciwgYm9yZGVyQ29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLnNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIGZvbnRDb2xvcilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGJhY2tncm91bmRDb2xvcilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItY29sb3JcIiwgYm9yZGVyQ29sb3IpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgQ29tbW9uRXZlbnRzIHtcblxuICAgIHN0YXRpYyBIT1ZFUkVEID0gXCJob3ZlcmVkXCI7XG4gICAgc3RhdGljIFVOSE9WRVJFRCA9IFwidW5ob3ZlcmVkXCI7XG4gICAgc3RhdGljIENMSUNLRUQgPSBcImNsaWNrZWRcIjtcbiAgICBzdGF0aWMgRE9VQkxFX0NMSUNLRUQgPSBcImRvdWJsZUNsaWNrZWRcIjtcblxuICAgIHN0YXRpYyBFTlRFUkVEID0gXCJlbnRlcmVkXCI7XG4gICAgc3RhdGljIEtFWVVQUEVEID0gXCJrZXlVcHBlZFwiO1xuICAgIHN0YXRpYyBGT0NVU0VEID0gXCJmb2N1c2VkXCI7XG4gICAgc3RhdGljIEJMVVJSRUQgPSBcImJsdXJyZWRcIjtcblxuICAgIHN0YXRpYyBDSEFOR0VEID0gXCJjaGFuZ2VkXCI7XG4gICAgc3RhdGljIEVOQUJMRUQgPSBcImVuYWJsZWRcIjtcbiAgICBzdGF0aWMgRElTQUJMRUQgPSBcImRpc2FibGVkXCI7XG4gICAgc3RhdGljIFNFTEVDVEVEID0gXCJzZWxlY3RlZFwiO1xuXG4gICAgc3RhdGljIERSQUdfU1RBUlRFRCA9IFwiZHJhZ1N0YXJ0ZWRcIjtcbiAgICBzdGF0aWMgRFJBR19FTkRFRCA9IFwiZHJhZ0VuZGVkXCI7XG4gICAgc3RhdGljIERST1BQRUQgPSBcImRyb3BwZWRcIjtcbiAgICBcbn0iLCJpbXBvcnQgeyBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgQ29sb3JBcHBsaWNhdG9yIH0gZnJvbSBcIi4vY29sb3JBcHBsaWNhdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50VGhlbWVBcHBsaWNhdG9yIHtcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NQcmVmaXhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbW9kZU5hbWUgXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gZGVmYXVsdENvbG9ycyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBob3ZlckNvbG9ycyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBkaXNhYmxlZENvbG9ycyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBhY3RpdmVDb2xvcnMgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJveFNoYWRvd0ZvY3VzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib3hTaGFkb3dBY3RpdmVGb2N1cyBcbiAgICAgKiBAcmV0dXJuIHtTdHlsZXNoZWV0QnVpbGRlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIGNsYXNzUHJlZml4LCBtb2RlTmFtZSxcbiAgICAgICAgICAgIGRlZmF1bHRDb2xvcnMsIGhvdmVyQ29sb3JzLCBkaXNhYmxlZENvbG9ycywgYWN0aXZlQ29sb3JzLFxuICAgICAgICAgICAgYm94U2hhZG93Rm9jdXMsIGJveFNoYWRvd0FjdGl2ZUZvY3VzKSB7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX1gLFxuICAgICAgICAgICAgZGVmYXVsdENvbG9yc1swXSwgZGVmYXVsdENvbG9yc1sxXSwgZGVmYXVsdENvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpob3ZlcmAsXG4gICAgICAgICAgICBob3ZlckNvbG9yc1swXSwgaG92ZXJDb2xvcnNbMV0sIGhvdmVyQ29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9OmZvY3VzLCAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZm9jdXNgLFxuICAgICAgICAgICAgaG92ZXJDb2xvcnNbMF0sIGhvdmVyQ29sb3JzWzFdLCBob3ZlckNvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5kaXNhYmxlZCwgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9OmRpc2FibGVkYCxcbiAgICAgICAgICAgIGRpc2FibGVkQ29sb3JzWzBdLCBkaXNhYmxlZENvbG9yc1sxXSwgZGlzYWJsZWRDb2xvcnNbMl0pO1xuXG4gICAgICAgIENvbG9yQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlcixcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlLGAgK1xuICAgICAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCkuYWN0aXZlLGAgK1xuICAgICAgICAgICAgICAgIGAuc2hvdyA+IC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5kcm9wZG93bi10b2dnbGVgLFxuICAgICAgICAgICAgYWN0aXZlQ29sb3JzWzBdLCBhY3RpdmVDb2xvcnNbMV0sIGFjdGl2ZUNvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMsYCArXG4gICAgICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKS5hY3RpdmU6Zm9jdXMsYCArXG4gICAgICAgICAgICAgICAgYC5zaG93ID4gLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmRyb3Bkb3duLXRvZ2dsZTpmb2N1c2AsXG4gICAgICAgICAgICBhY3RpdmVDb2xvcnNbMF0sIGFjdGl2ZUNvbG9yc1sxXSwgYWN0aXZlQ29sb3JzWzJdKTtcblxuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlOmZvY3VzLGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKS5hY3RpdmU6Zm9jdXMsYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgLnNob3cgPiAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZHJvcGRvd24tdG9nZ2xlOmZvY3VzYClcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIGJveFNoYWRvd0FjdGl2ZUZvY3VzKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06Zm9jdXMsYCArIFxuICAgICAgICAgICAgICAgICAgICAgICAgYCR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmZvY3VzYClcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIGJveFNoYWRvd0ZvY3VzKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgfVxufSIsImltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGVMaXN0ZW5lcnMge1xuXG4gICAgY29uc3RydWN0b3IoZXhpc3RpbmdMaXN0ZW5lcnMgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciA9IChleGlzdGluZ0xpc3RlbmVycyAmJiBleGlzdGluZ0xpc3RlbmVycy5nZXRCYWNrZ3JvdW5kQ2xpY2tlZCkgPyBleGlzdGluZ0xpc3RlbmVycy5nZXRCYWNrZ3JvdW5kQ2xpY2tlZCgpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICB3aXRoQmFja2dyb3VuZENsaWNrZWQoYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgPSBiYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIGdldEJhY2tncm91bmRDbGlja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyO1xuICAgIH1cblxuICAgIGNhbGxCYWNrZ3JvdW5kQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcih0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIsIGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2FsbExpc3RlbmVyKGxpc3RlbmVyLCBldmVudCkge1xuICAgICAgICBpZiAobnVsbCAhPSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXIuY2FsbChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQmFzZUVsZW1lbnQsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXRcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQmFja1NoYWRlTGlzdGVuZXJzIH0gZnJvbSBcIi4vYmFja1NoYWRlTGlzdGVuZXJzLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYWNrU2hhZGVMaXN0ZW5lcnN9IGJhY2tTaGFkZUxpc3RlbmVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGJhY2tTaGFkZUxpc3RlbmVycyA9IG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QmFzZUVsZW1lbnR9ICovXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZUxpc3RlbmVyc30gKi9cbiAgICAgICAgdGhpcy5iYWNrU2hhZGVMaXN0ZW5lcnMgPSBiYWNrU2hhZGVMaXN0ZW5lcnM7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXJcblx0ICogQHJldHVybnMge1N0eWxlc2hlZXR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFjay1zaGFkZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCIxMDQwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDB2d1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMHZoXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYWNrLXNoYWRlLnNob3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC41XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFjay1zaGFkZS5mYWRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otdHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlclxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJpZD1iYWNrU2hhZGVcIiwgXCJzdHlsZT16LWluZGV4OjM7ZGlzcGxheTpub25lO1wiLCBcImNsYXNzPWJhY2stc2hhZGVcIilcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFja1NoYWRlKTtcbiAgICB9XG5cbiAgICBoaWRlQWZ0ZXIobWlsbGlTZWNvbmRzKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZVwiKTtcbiAgICAgICAgY29uc3QgaGlkZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UobWlsbGlTZWNvbmRzLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKG1pbGxpU2Vjb25kcyArIDEsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShCYWNrU2hhZGUubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2hpZGVQcm9taXNlLCBkaXNhYmxlU3R5bGVQcm9taXNlXSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tTaGFkZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsXG4gICAgICAgICAgICAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlIHNob3dcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENhbnZhc1Jvb3QsXG4gICAgTmF2aWdhdGlvbixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IFRpbWVQcm9taXNlLCBMb2dnZXIsIE1ldGhvZCwgTGlzdCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEJhY2tTaGFkZSB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlLmpzXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRWxlbWVudFV0aWxzLCBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRGlhbG9nQm94XCIpO1xuXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94IHtcbiAgICBcbiAgICBzdGF0aWMgT1BUSU9OX0JBQ0tfT05fQ0xPU0UgPSAxO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdE9wdGlvbnMgPSBbXSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZX0gKi9cbiAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYWNrU2hhZGUsIFtcbiAgICAgICAgICAgIG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgICAgIC53aXRoQmFja2dyb3VuZENsaWNrZWQobmV3IE1ldGhvZCh0aGlzLmhpZGUsIHRoaXMpKV0pO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN3YWxsb3dGb2N1c0VzY2FwZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub3duaW5nVHJpZ2dlciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBuZXcgTGlzdChkZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBMaXN0KGRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvKiogQHR5cGUge0Z1bmN0aW9ufSAqL1xuICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy15XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy14XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgKG1pbi13aWR0aDogNTAxcHgpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCI1NHB0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC01MCUsMClcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9pbnRlci1ldmVudHNcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWJvZHlcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXhcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1oZWFkZXJcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3AtbGVmdC1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXRvcC1yaWdodC1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS5kaWFsb2dib3gtZmFkZSAuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZhZGVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW9wZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vcGVuIC5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXhcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy15XCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LWZhZGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAwLjE1cyBsaW5lYXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ub25lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS1mYWRlOm5vdCguZGlhbG9nYm94LW92ZXJsYXktc2hvdylcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LmRpYWxvZ2JveC1vdmVybGF5LWZhZGUgLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCItd2Via2l0LXRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcInRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcInRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0LCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCwgLTUwcHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsIC01MHB4KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LmRpYWxvZ2JveC1vdmVybGF5LXNob3cgLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtaGVhZGVyIC5kaWFsb2dib3gtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuN3JlbSAxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiLTAuN3JlbSAtMXJlbSAtMC43cmVtIGF1dG9cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtdGl0bGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWJvZHlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXhcIiwgXCIxIDEgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIxIDEgYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mb290ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiLW1zLWZsZXhib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtZmxleC1wYWNrXCIsIFwiZW5kXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwiZmxleC1lbmRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3BcIiwgXCIxcHggc29saWQgI2RlZTJlNlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzXCIsIFwiMC4zcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c1wiLCBcIjAuM3JlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mb290ZXIgPiA6bm90KDpmaXJzdC1jaGlsZClcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi4yNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mb290ZXIgPiA6bm90KDpsYXN0LWNoaWxkKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1yaWdodFwiLCBcIi4yNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCIxMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3V0bGluZVwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiLW1zLWZsZXhib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9pbnRlci1ldmVudHNcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1oZWFkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiLW1zLWZsZXhib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjOTk5OTk5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtYWxpZ25cIiwgXCJzdGFydFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiZmxleC1zdGFydFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LXBhY2tcIiwgXCJqdXN0aWZ5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwic3BhY2UtYmV0d2VlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjdyZW0gMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1ib3R0b21cIiwgXCIxcHggc29saWQgI2RlZTJlNlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbG9hdFwiLCBcInJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI3MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LXNoYWRvd1wiLCBcIjAgMXB4IDAgI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIuNVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jbG9zZS1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNsb3NlLWJ1dHRvbjpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTpob3ZlciwgLmRpYWxvZ2JveC1jbG9zZS1idXR0b246bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6Zm9jdXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiLjc1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCJidXR0b24uZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LWFwcGVhcmFuY2VcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9ZGlhbG9nQm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlPXotaW5kZXg6LTFcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJhY2tTaGFkZUNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZGlhbG9nQm94T3ZlcmxheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3M9ZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9jayBkaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJpbmRleD0tMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZT1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieT1kaWFsb2dMYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1kaWFsb2dib3g9dHJ1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWRpYWxvZ2JveC1mcmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZT16LWluZGV4OjJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZT1kb2N1bWVudFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1kaWFsb2dib3gtY29udGVudFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9ZGlhbG9nYm94LWhlYWRlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImg1XCIsIFwiaWQ9dGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtdGl0bGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcIk1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImJ1dHRvblwiLCBcImlkPWNsb3NlQnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlPWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3M9ZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1kaXNtaXNzPWRpYWxvZ2JveFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbD1DbG9zZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiY2xhc3M9ZmEgZmEtd2luZG93LWNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1oaWRkZW49dHJ1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1kaWFsb2dCb3hDb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtYm9keVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKERpYWxvZ0JveCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldChcImJhY2tTaGFkZUNvbnRhaW5lclwiLCB0aGlzLmJhY2tTaGFkZS5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xvc2UsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFxuICAgICAqL1xuICAgIHNldFRpdGxlKHRleHQpeyB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInRpdGxlXCIsIHRleHQpOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxuICAgICAqL1xuICAgIHNldEZvb3Rlcihjb21wb25lbnQpe1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hGb290ZXJcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiZGlhbG9nQm94Rm9vdGVyXCIsIGNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcbiAgICAgKi9cbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCl7IHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiZGlhbG9nQm94Q29udGVudFwiLGNvbXBvbmVudCk7IH1cblxuXHRzZXQoa2V5LHZhbCkgeyB0aGlzLmNvbXBvbmVudC5zZXQoa2V5LHZhbCk7IH1cbiAgICBcbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgYXdhaXQgdGhpcy5oaWRlKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRhaW5zKERpYWxvZ0JveC5PUFRJT05fQkFDS19PTl9DTE9TRSkpIHtcbiAgICAgICAgICAgIE5hdmlnYXRpb24uaW5zdGFuY2UoKS5iYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBoaWRlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIpO1xuICAgICAgICBjb25zdCBoaWRlQmFja1NoYWRlUHJvbWlzZSA9IHRoaXMuYmFja1NoYWRlLmhpZGVBZnRlcigzMDApO1xuICAgICAgICBjb25zdCBoaWRlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZSgyMDAsICgpID0+IHsgXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKDIwMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3gubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2hpZGVQcm9taXNlLCBkaXNhYmxlU3R5bGVQcm9taXNlLCBoaWRlQmFja1NoYWRlUHJvbWlzZV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gdGVtcG9yYXJ5T3B0aW9uc1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHNob3coZXZlbnQsIHRlbXBvcmFyeU9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBDYW52YXNSb290Lmxpc3RlblRvRm9jdXNFc2NhcGUoXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hPdmVybGF5XCIpLCB0aGlzLmNsb3NlLCB0aGlzLCBcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGVtcG9yYXJ5T3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IExpc3QodGVtcG9yYXJ5T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgQ2FudmFzUm9vdC5zd2FsbG93Rm9jdXNFc2NhcGUoNTAwKTtcbiAgICAgICAgaWYgKCF0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERpYWxvZ0JveC5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuYmFja1NoYWRlLnNob3coKTtcbiAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9ja1wiKTtcbiAgICAgICAgQ2FudmFzUm9vdC5tb3VzZURvd25FbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94Q29udGVudFwiKS5jb250YWluZXJFbGVtZW50O1xuICAgICAgICByZXR1cm4gVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrIGRpYWxvZ2JveC1vdmVybGF5LXNob3dcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0RGlhbG9nQm94T3ZlcmxheSgpIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveE92ZXJsYXlcIik7IH1cblxuICAgIGdldERpYWxvZ0JveCgpIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveFwiKTsgfVxuXG4gICAgc2Nyb2xsTG9jaygpIHtcbiAgICAgICAgQ29udGFpbmVyRWxlbWVudFV0aWxzLnNjcm9sbExvY2tUbyh0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hDb250ZW50XCIpLmNvbnRhaW5lckVsZW1lbnQsIDAsIDAsIDEwMDApO1xuICAgIH1cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBIVE1MLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGUgfSBmcm9tIFwiLi4vY29sb3JQYWxldHRlXCI7XG5pbXBvcnQgeyBFbGVtZW50VGhlbWVBcHBsaWNhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi9lbGVtZW50VGhlbWVBcHBsaWNhdG9yXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJEcm9wRG93blBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgRHJvcERvd25QYW5lbCB7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXByaW1hcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TRUNPTkRBUlkgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tc2Vjb25kYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU1VDQ0VTUyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1pbmZvXCI7XG4gICAgc3RhdGljIFRZUEVfV0FSTklORyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi13YXJuaW5nXCI7XG4gICAgc3RhdGljIFRZUEVfREFOR0VSID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRZUEVfREFSSyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1kYXJrXCI7XG5cbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9MRUZUID0gXCJkcm9wLWRvd24tcGFuZWwtbGVmdFwiO1xuICAgIHN0YXRpYyBPUklFTlRBVElPTl9SSUdIVCA9IFwiZHJvcC1kb3duLXBhbmVsLXJpZ2h0XCI7XG5cbiAgICBzdGF0aWMgQ09OVEVOVF9WSVNJQkxFID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC12aXNpYmxlXCI7XG4gICAgc3RhdGljIENPTlRFTlRfSElEREVOID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC1oaWRkZW5cIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9FWFBBTkQgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWV4cGFuZFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0NPTExBUFNFID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC1jb2xsYXBzZVwiO1xuICAgIHN0YXRpYyBDT05URU5UID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudFwiO1xuICAgIHN0YXRpYyBCVVRUT04gPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uQ2xhc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmllbnRhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGljb25DbGFzcywgdHlwZSA9IERyb3BEb3duUGFuZWwuVFlQRV9EQVJLLCBzaXplID0gRHJvcERvd25QYW5lbC5TSVpFX01FRElVTSwgb3JpZW50YXRpb24gPSBEcm9wRG93blBhbmVsLk9SSUVOVEFUSU9OX0xFRlQpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbkNsYXNzID0gaWNvbkNsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAubWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMzVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIHRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uLW1lZGl1bVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIxNTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC13aWR0aFwiLCBcIjQ1MHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjhwdCAxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1jb250ZW50LmRyb3AtZG93bi1wYW5lbC1sZWZ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAlLCAxMHB0KSB0cmFuc2xhdGUoMCUsMHB4KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1jb250ZW50LmRyb3AtZG93bi1wYW5lbC1yaWdodFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtMTAwJSwgMTBwdCkgdHJhbnNsYXRlKDM1cHQsMHB4KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1jb250ZW50LXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtY29udGVudC1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWFycm93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIDUwJSkgdHJhbnNsYXRlKDAlLC0zcHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWFycm93IGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiNDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIi0yMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWFycm93IGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIicnXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMThweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSg1MCUsNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtZGVjb3JhdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uOmZvY3VzLFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24uZm9jdXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdXRsaW5lXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDAgMCAwLjJyZW0gcmdiYSgwLCAxMjMsIDI1NSwgMC4yNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uLmRpc2FibGVkLFwiKyBcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b246ZGlzYWJsZWRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC42NVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwic2Vjb25kYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcbiAgICAgICAgXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDcyLCAxODAsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDcyLCAxODAsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcImluZm9cIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg1OCwgMTc2LCAxOTUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwid2FybmluZ1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyMiwgMTcwLCAxMiwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJkYW5nZXJcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjI1LCA4MywgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjI1LCA4MywgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwibGlnaHRcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMTYsIDIxNywgMjE5LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwiZGFya1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoODIsIDg4LCA5MywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9ZHJvcERvd25QYW5lbFJvb3RcIiwgXCJjbGFzcz1kcm9wLWRvd24tcGFuZWwtb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiYnV0dG9uXCIsIFwiaWQ9YnV0dG9uXCIsIFwiY2xhc3M9ZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YXJyb3dcIiwgXCJjbGFzcz1kcm9wLWRvd24tcGFuZWwtYXJyb3dcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1jb250ZW50XCIsIFwiY2xhc3M9ZHJvcC1kb3duLXBhbmVsLWNvbnRlbnRcIiwgXCJ0YWJpbmRleD0wXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRHJvcERvd25QYW5lbCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEcm9wRG93blBhbmVsLm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0Q2hpbGQoSFRNTC5pKFwiXCIsIHRoaXMuaWNvbkNsYXNzKSk7XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkJVVFRPTilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy50eXBlKTtcblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlQpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5zaXplKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLm9yaWVudGF0aW9uKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsaWNrZWQsIHRoaXMpO1xuICAgICAgICBDYW52YXNSb290Lmxpc3RlblRvRm9jdXNFc2NhcGUodGhpcy5jb21wb25lbnQuZ2V0KFwiZHJvcERvd25QYW5lbFJvb3RcIiksIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGRyb3BEb3duUGFuZWxDb250ZW50IFxuICAgICAqL1xuICAgIHNldFBhbmVsQ29udGVudChkcm9wRG93blBhbmVsQ29udGVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLnNldENoaWxkKGRyb3BEb3duUGFuZWxDb250ZW50LmNvbXBvbmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50b2dnbGVDb250ZW50KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQ29udGVudCgpIHtcbiAgICAgICAgaWYgKCFTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikpLmlzKFwiZGlzcGxheVwiLFwiYmxvY2tcIikpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoRHJvcERvd25QYW5lbC5DT05URU5UX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UX1ZJU0lCTEUpO1xuICAgICAgICBTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikpXG4gICAgICAgICAgICAuc2V0KFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLmNvbnRhaW5lckVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoRHJvcERvd25QYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9ISURERU4pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJGaWxsUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBGaWxsUGFuZWwge1xuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImNvbnRlbnRcIiwgY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1jb250ZW50XCIsIFwiY2xhc3M9Y250ciBjbnRyLXJvd3MgY250ci1ncm93LW9ubHkgd2lkdGgtZnVsbFwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEZpbGxQYW5lbCk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgTWV0aG9kLCBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IElucHV0RWxlbWVudERhdGFCaW5kaW5nLCBBYnN0cmFjdFZhbGlkYXRvciwgVGVtcGxhdGVDb21wb25lbnRGYWN0b3J5LCBDYW52YXNTdHlsZXMsIENvbXBvbmVudCwgRXZlbnRNYW5hZ2VyLCBJbmxpbmVDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ29tbW9uSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuICAgIHN0YXRpYyBFVkVOVF9FTlRFUkVEID0gQ29tbW9uRXZlbnRzLkVOVEVSRUQ7XG4gICAgc3RhdGljIEVWRU5UX0tFWVVQUEVEID0gQ29tbW9uRXZlbnRzLktFWVVQUEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG4gICAgc3RhdGljIEVWRU5UX0JMVVJSRUQgPSBDb21tb25FdmVudHMuQkxVUlJFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBvbmVudENsYXNzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0VmFsaWRhdG9yfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRFbGVtZW50SWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JFbGVtZW50SWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRDbGFzcyxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbW9kZWwgPSBudWxsLFxuICAgICAgICB2YWxpZGF0b3IgPSBudWxsLCBcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBudWxsLFxuICAgICAgICBpbnB1dEVsZW1lbnRJZCA9IG51bGwsXG4gICAgICAgIGVycm9yRWxlbWVudElkID0gbnVsbCkge1xuXG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QWJzdHJhY3RWYWxpZGF0b3J9ICovXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RnVuY3Rpb259ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50Q2xhc3MgPSBjb21wb25lbnRDbGFzcztcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudElkID0gaW5wdXRFbGVtZW50SWQ7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZXJyb3JFbGVtZW50SWQgPSBlcnJvckVsZW1lbnRJZDtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5wdXRFbGVtZW50RGF0YUJpbmRpbmd9ICovXG4gICAgICAgIHRoaXMuZGF0YUJpbmRpbmcgPSBudWxsO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmNvbXBvbmVudENsYXNzKTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUodGhpcy5jb21wb25lbnRDbGFzcy5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLCB0aGlzLm5hbWUpO1xuICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwicGxhY2Vob2xkZXJcIiwgXCI6ICBcIiArICB0aGlzLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMudmFsaWRhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci53aXRoVmFsaWRMaXN0ZW5lcihuZXcgTWV0aG9kKHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvciwgdGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhQmluZGluZyA9IElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCwgdGhpcy52YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZClcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImtleXVwXCIsIHRoaXMua2V5dXBwZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5jaGFuZ2VkLCB0aGlzKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiYmx1clwiLCB0aGlzLmJsdXJyZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsaWNrZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNLZXlDb2RlKDEzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyZWQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmVycm9yRWxlbWVudElkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZClcbiAgICAgICAgICAgICAgICAubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmVycm9yQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIGdldCB2YWx1ZSgpIHsgXG4gICAgICAgIC8qKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH0gKi9cbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCk7XG4gICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgLyoqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YUJpbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUJpbmRpbmcucHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAga2V5dXBwZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5pc0tleUNvZGUoMTMpICYmICFldmVudC5pc0tleUNvZGUoMTYpICYmICFldmVudC5pc0tleUNvZGUoOSkpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiXCIgPT09IGV2ZW50LnRhcmdldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0tFWVVQUEVELCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoXCJcIiA9PT0gZXZlbnQudGFyZ2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQ0hBTkdFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9DTElDS0VELCBldmVudCk7XG4gICAgfVxuXG4gICAgZW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGJsdXJyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhaW50ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQkxVUlJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGVycm9yQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmZvY3VzKCk7IH1cbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZWxlY3RBbGwoKTsgfVxuICAgIGVuYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmRpc2FibGUoKTsgfVxuICAgIGNsZWFyKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkudmFsdWUgPSBcIlwiOyB0aGlzLnRhaW50ZWQgPSBmYWxzZTsgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7IH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudCxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBQYW5lbCB7XG5cbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OX1JPT1QgPSBcInBhbmVsLXR5cGUtY29sdW1uLXJvb3RcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OID0gXCJwYW5lbC10eXBlLWNvbHVtblwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfVFlQRV9ST1cgPSBcInBhbmVsLXR5cGUtcm93XCI7XG5cbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fTEVGVCA9IFwicGFuZWwtY29udGVudC1hbGlnbi1sZWZ0XCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX1JJR0hUID0gXCJwYW5lbC1jb250ZW50LWFsaWduLXJpZ2h0XCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0NFTlRFUiA9IFwicGFuZWwtY29udGVudC1hbGlnbi1jZW50ZXJcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fSlVTVElGWSA9IFwicGFuZWwtY29udGVudC1hbGlnbi1qdXN0aWZ5XCI7XG5cbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1NJWkVfQVVUTyA9IFwicGFuZWwtc2l6ZS1hdXRvXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9TSVpFX01JTklNQUwgPSBcInBhbmVsLXNpemUtbWluaW1hbFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfU0laRV9SRVNQT05TSVZFID0gXCJwYW5lbC1zaXplLXJlc3BvbnNpdmVcIjtcblxuICAgIHN0YXRpYyBPUFRJT05fU1RZTEVfQ09OVEVOVF9QQURESU5HX1NNQUxMID0gXCJwYW5lbC1jb250ZW50LXBhZGRpbmctc21hbGxcIjtcbiAgICBzdGF0aWMgT1BUSU9OX1NUWUxFX0NPTlRFTlRfUEFERElOR19MQVJHRSA9IFwicGFuZWwtY29udGVudC1wYWRkaW5nLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgT1BUSU9OX1NUWUxFX0JPUkRFUl9TSEFET1cgPSBcInBhbmVsLWJvcmRlci1zaGFkb3dcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50QWxpZ24gXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpemUgXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBvcHRpb25zIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHR5cGUgPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU5fUk9PVCxcbiAgICAgICAgY29udGVudEFsaWduID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fQ0VOVEVSLFxuICAgICAgICBzaXplID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX1NJWkVfQVVUTyxcbiAgICAgICAgb3B0aW9ucyA9IFtdKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbnRlbnRBbGlnbiA9IGNvbnRlbnRBbGlnbjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge0FycmF5PFN0cmluZz59ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA4NTBwdClcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1yZXNwb25zaXZlXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCI4MDBwdFwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDg0OXB0KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1zaXplLXJlc3BvbnNpdmVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjUwMHB0XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTAwcHQpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtcmVzcG9uc2l2ZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1iYXNpc1wiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtdHlwZS1jb2x1bW4tcm9vdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXR5cGUtY29sdW1uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC10eXBlLXJvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1hbGlnbi1sZWZ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwibGVmdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtYWxpZ24tcmlnaHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtYWxpZ24tY2VudGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LWFsaWduLWp1c3RpZnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJzcGFjZS1iZXR3ZWVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1hdXRvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1ncm93XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtc2hyaW5rXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1taW5pbWFsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1ncm93XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtc2hyaW5rXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1wYWRkaW5nLXNtYWxsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjJwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtcGFkZGluZy1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI2cHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1ib3JkZXItc2hhZG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPXBhbmVsXCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUGFuZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUGFuZWwubmFtZSk7XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwicGFuZWxcIikpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5jb250ZW50QWxpZ24pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIElubGluZUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJMaW5lUGFuZWxFbnRyeVwiKTtcblxuZXhwb3J0IGNsYXNzIExpbmVQYW5lbEVudHJ5IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1jbnRyIGNudHItY29sdW1ucyBjbnRyLWdhcC1zbWFsbFwiLCBcImlkPXJlY29yZEVsZW1lbnRcIilcblxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKExpbmVQYW5lbEVudHJ5KTtcbiAgICB9XG5cblxufSIsImltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdmlkZXIgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRNYW5hZ2VyLCBTdGF0ZU1hbmFnZXIsIElubGluZUNvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudEJ1aWxkZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSBcIi4uL3BhbmVsL3BhbmVsLmpzXCI7XG5pbXBvcnQgeyBMaW5lUGFuZWxFbnRyeSB9IGZyb20gXCIuL2xpbmVQYW5lbEVudHJ5L2xpbmVQYW5lbEVudHJ5LmpzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkxpbmVQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIExpbmVQYW5lbCB7XG5cblx0c3RhdGljIEVWRU5UX1JFRlJFU0hfQ0xJQ0tFRCA9IFwicmVmcmVzaENsaWNrZWRcIjtcblx0c3RhdGljIFJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwicmVjb3JkRWxlbWVudFJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJyZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7UGFuZWx9IGJ1dHRvblBhbmVsIFxuXHQgKi9cblx0Y29uc3RydWN0b3IoYnV0dG9uUGFuZWwgPSBudWxsKSB7XG5cblx0XHQvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cdFx0XG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG5cdFx0dGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPExpbmVQYW5lbEVudHJ5Pn0gKi9cblx0XHR0aGlzLmxpbmVQYW5lbEVudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihMaW5lUGFuZWxFbnRyeSk7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPFBhbmVsPn0gKi9cblx0XHR0aGlzLnBhbmVsUHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihQYW5lbCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdGF0ZU1hbmFnZXI8YW55W10+fSAqL1xuICAgICAgICB0aGlzLmFycmF5U3RhdGUgPSBuZXcgU3RhdGVNYW5hZ2VyKCk7XG5cblx0XHQvKiogQHR5cGUge1BhbmVsfSAqL1xuXHRcdHRoaXMuYnV0dG9uUGFuZWwgPSBidXR0b25QYW5lbDtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiY2xhc3M9Y250ciBjbnRyLWdhcC1zbWFsbCBjbnRyLXJvd3MgY250ci1wcmV2ZW50LXNpemUtY2hhbmdlIHBhZGRpbmctc21hbGxcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25QYW5lbFwiKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPWNudHItb3ZlcnJpZGUtZ3Jvdy1vbmx5IGNudHIgY250ci1yb3dzIGNudHItZ2FwLW1lZGl1bVwiLCBcImlkPXJlY29yZEVsZW1lbnRzXCIpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRhc3luYyBwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShMaW5lUGFuZWwpO1xuXG5cdFx0aWYgKHRoaXMuYnV0dG9uUGFuZWwpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiYnV0dG9uUGFuZWxcIiwgdGhpcy5idXR0b25QYW5lbC5jb21wb25lbnQpO1xuXHRcdH1cblxuXHRcdHRoaXMuYXJyYXlTdGF0ZS5yZWFjdChuZXcgTWV0aG9kKHRoaXMuaGFuZGxlQXJyYXlTdGF0ZSwgdGhpcykpO1xuXG5cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZSB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuXHQvKipcblx0ICogQHR5cGUgeyBFdmVudE1hbmFnZXIgfVxuXHQgKi9cblx0Z2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cblx0LyoqXG5cdCAqIFJlc2V0XG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG5cdGFzeW5jIHJlc2V0KGV2ZW50KSB7XG5cdFx0dGhpcy5ldmVudHMudHJpZ2dlcihMaW5lUGFuZWwuUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHRoaXMuYXJyYXlTdGF0ZV0pO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBcbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGVBcnJheVN0YXRlKGFycmF5KSB7XG5cdFx0YXJyYXkuZm9yRWFjaChhc3luYyAocmVjb3JkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcInJlY29yZEVsZW1lbnRzXCIsIFxuXHRcdFx0XHRhd2FpdCB0aGlzLnBvcHVsYXRlUmVjb3JkKHJlY29yZCkpO1xuICAgICAgICB9KTtcblxuXHRcdFxuICAgIH1cblxuXHQvKipcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVjb3JkIFxuICAgICAqL1xuICAgIGFzeW5jIHBvcHVsYXRlUmVjb3JkKHJlY29yZCkge1xuICAgICAgICBjb25zdCByZWNvcmRFbGVtZW50ID0gYXdhaXQgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihMaW5lUGFuZWwuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbbnVsbCwgcmVjb3JkXSk7XG4gICAgICAgIFxuXHRcdGlmICghcmVjb3JkRWxlbWVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGxpbmVQYW5lbEVudHJ5ID0gYXdhaXQgdGhpcy5saW5lUGFuZWxFbnRyeVByb3ZpZGVyLmdldChbdHJ1ZSwgcmVjb3JkXSk7XG5cdFx0bGluZVBhbmVsRW50cnkuY29tcG9uZW50LnNldENoaWxkKFwicmVjb3JkRWxlbWVudFwiLCByZWNvcmRFbGVtZW50LmNvbXBvbmVudCk7XG5cblx0XHRyZXR1cm4gbGluZVBhbmVsRW50cnkuY29tcG9uZW50O1xuICAgIH1cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkxpbmtQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIExpbmtQYW5lbCB7XG5cbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgc3RhdGljIFNJWkVfU01BTEwgPSBcImxpbmstcGFuZWwtc21hbGxcIjtcbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcImxpbmstcGFuZWwtbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImxpbmstcGFuZWwtbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9GTEFUID0gXCJsaW5rLXBhbmVsLWZsYXRcIjtcbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fU1RBQ0tFRCA9IFwibGluay1wYW5lbC1zdGFja2VkXCI7XG5cbiAgICBzdGF0aWMgVEhFTUVfREFSSyA9IFwibGluay1wYW5lbC1kYXJrXCI7XG4gICAgc3RhdGljIFRIRU1FX0xJR0hUID0gXCJsaW5rLXBhbmVsLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRIRU1FX0RBTkdFUiA9IFwibGluay1wYW5lbC1kYW5nZXJcIjtcbiAgICBzdGF0aWMgVEhFTUVfSU5GTyA9IFwibGluay1wYW5lbC1pbmZvXCI7XG4gICAgc3RhdGljIFRIRU1FX1NVQ0NFU1MgPSBcImxpbmstcGFuZWwtc3VjY2Vzc1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGljb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYWJlbCwgaWNvbiwgdGhlbWUgPSBMaW5rUGFuZWwuVEhFTUVfREFSSywgb3JpZW50YXRpb24gPSBMaW5rUGFuZWwuT1JJRU5UQVRJT05fRkxBVCwgc2l6ZSA9IExpbmtQYW5lbC5TSVpFX1NNQUxMKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy50aGVtZSA9IHRoZW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyPExpbmtQYW5lbD59ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJzdHJldGNoXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMnB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC43NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1mbGF0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWZsYXQgPiAubGluay1wYW5lbC1pY29uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIycmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1zdGFja2VkXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLXNtYWxsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS4ycmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEuNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZGFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZGFyazpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjYmZiZmJmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1saWdodFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtbGlnaHQ6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzhmOGY4ZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZGFuZ2VyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZmYwMDAwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1kYW5nZXI6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2JmYmZiZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtaW5mb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzAwMDBmZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtaW5mbzpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjYmZiZmJmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1zdWNjZXNzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMDBmZjAwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1zdWNjZXNzOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZmZmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWljb25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLXJpZ2h0XCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9bGlua1wiLCBcImNsYXNzPWxpbmstcGFuZWxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWxpbmstcGFuZWwtaWNvblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiaWQ9aWNvblwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1saW5rLXBhbmVsLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImFcIiwgXCJpZD1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8TGlua1BhbmVsPn0gKi9cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShMaW5rUGFuZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoTGlua1BhbmVsLm5hbWUpO1xuICAgICAgICBcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwibGlua1wiKSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5zaXplKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLm9yaWVudGF0aW9uKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnRoZW1lKTtcblxuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGFiZWxcIikuc2V0Q2hpbGQodGhpcy5sYWJlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmljb24pIHtcbiAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImljb25cIikpXG4gICAgICAgICAgICAgICAgLmNsZWFyKClcbiAgICAgICAgICAgICAgICAuZW5hYmxlKHRoaXMuaWNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsaW5rXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKExpbmtQYW5lbC5FVkVOVF9DTElDS0VELCBldmVudCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBtZXRob2QgXG4gICAgICovXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobWV0aG9kKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxpbmtcIikubGlzdGVuVG8oXCJjbGlja1wiLCBtZXRob2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBIVE1MLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGUgfSBmcm9tIFwiLi4vY29sb3JQYWxldHRlXCI7XG5pbXBvcnQgeyBFbGVtZW50VGhlbWVBcHBsaWNhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi9lbGVtZW50VGhlbWVBcHBsaWNhdG9yXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQb3BVcFBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgUG9wVXBQYW5lbCB7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXByaW1hcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TRUNPTkRBUlkgPSBcInBvcC11cC1wYW5lbC1idXR0b24tc2Vjb25kYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU1VDQ0VTUyA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1pbmZvXCI7XG4gICAgc3RhdGljIFRZUEVfV0FSTklORyA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi13YXJuaW5nXCI7XG4gICAgc3RhdGljIFRZUEVfREFOR0VSID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRZUEVfREFSSyA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1kYXJrXCI7XG5cbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcInBvcC11cC1wYW5lbC1idXR0b24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcInBvcC11cC1wYW5lbC1idXR0b24tbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9MRUZUID0gXCJwb3AtdXAtcGFuZWwtbGVmdFwiO1xuICAgIHN0YXRpYyBPUklFTlRBVElPTl9SSUdIVCA9IFwicG9wLXVwLXBhbmVsLXJpZ2h0XCI7XG5cbiAgICBzdGF0aWMgQ09OVEVOVF9WSVNJQkxFID0gXCJwb3AtdXAtcGFuZWwtY29udGVudC12aXNpYmxlXCI7XG4gICAgc3RhdGljIENPTlRFTlRfSElEREVOID0gXCJwb3AtdXAtcGFuZWwtY29udGVudC1oaWRkZW5cIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9FWFBBTkQgPSBcInBvcC11cC1wYW5lbC1jb250ZW50LWV4cGFuZFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0NPTExBUFNFID0gXCJwb3AtdXAtcGFuZWwtY29udGVudC1jb2xsYXBzZVwiO1xuICAgIHN0YXRpYyBDT05URU5UID0gXCJwb3AtdXAtcGFuZWwtY29udGVudFwiO1xuICAgIHN0YXRpYyBCVVRUT04gPSBcInBvcC11cC1wYW5lbC1idXR0b25cIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uQ2xhc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmllbnRhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGljb25DbGFzcywgdHlwZSA9IFBvcFVwUGFuZWwuVFlQRV9EQVJLLCBzaXplID0gUG9wVXBQYW5lbC5TSVpFX01FRElVTSwgb3JpZW50YXRpb24gPSBQb3BVcFBhbmVsLk9SSUVOVEFUSU9OX0xFRlQpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbkNsYXNzID0gaWNvbkNsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1vdXRsaW5lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjM1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgdHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b24tbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b24tbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtY29udGVudFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjE1MHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LXdpZHRoXCIsIFwiNDUwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiOHB0IDE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnQucG9wLXVwLXBhbmVsLWxlZnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIC0xMDAlKSB0cmFuc2xhdGUoMCUsIC00MnB0KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50LnBvcC11cC1wYW5lbC1yaWdodFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtMTAwJSwgLTEwMCUpIHRyYW5zbGF0ZSgzNXB0LC00MnB0KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50LXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtY29udGVudC1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWFycm93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5NlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIC0xMDAlKSB0cmFuc2xhdGUoMCUsLTM4cHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWFycm93IGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiNDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjQwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIi0yMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWFycm93IGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIicnXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTZweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE2cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSg1MCUsNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtZGVjb3JhdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uOmZvY3VzLCAucG9wLXVwLXBhbmVsLWJ1dHRvbi5mb2N1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm91dGxpbmVcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMCAwIDAuMnJlbSByZ2JhKDAsIDEyMywgMjU1LCAwLjI1KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b24uZGlzYWJsZWQsIC5wb3AtdXAtcGFuZWwtYnV0dG9uOmRpc2FibGVkXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuNjVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcInByaW1hcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcInNlY29uZGFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG4gICAgICAgIFxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJpbmZvXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg1OCwgMTc2LCAxOTUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcIndhcm5pbmdcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyMiwgMTcwLCAxMiwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcImxpZ2h0XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMTYsIDIxNywgMjE5LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcImRhcmtcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoODIsIDg4LCA5MywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9cG9wVXBQYW5lbFJvb3RcIiwgXCJjbGFzcz1wb3AtdXAtcGFuZWwtb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiYnV0dG9uXCIsIFwiaWQ9YnV0dG9uXCIsIFwiY2xhc3M9cG9wLXVwLXBhbmVsLWJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YXJyb3dcIiwgXCJjbGFzcz1wb3AtdXAtcGFuZWwtYXJyb3dcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1jb250ZW50XCIsIFwiY2xhc3M9cG9wLXVwLXBhbmVsLWNvbnRlbnRcIiwgXCJ0YWJpbmRleD0wXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBvcFVwUGFuZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUG9wVXBQYW5lbC5uYW1lKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5CVVRUT04pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSk7XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UKVxuICAgICAgICAgICAgLmRpc2FibGUoUG9wVXBQYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5vcmllbnRhdGlvbik7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcbiAgICAgICAgQ2FudmFzUm9vdC5saXN0ZW5Ub0ZvY3VzRXNjYXBlKHRoaXMuY29tcG9uZW50LmdldChcInBvcFVwUGFuZWxSb290XCIpLCB0aGlzLmhpZGUsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBwb3BVcFBhbmVsQ29udGVudCBcbiAgICAgKi9cbiAgICBzZXRQYW5lbENvbnRlbnQocG9wVXBQYW5lbENvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5zZXRDaGlsZChwb3BVcFBhbmVsQ29udGVudC5jb21wb25lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ29udGVudCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbnRlbnQoKSB7XG4gICAgICAgIGlmICghU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpKS5pcyhcImRpc3BsYXlcIixcImJsb2NrXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9WSVNJQkxFKTtcbiAgICAgICAgU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpKVxuICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5jb250YWluZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfSElEREVOKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgfVxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgfVxufSIsImltcG9ydCB7IFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBCYXNlRWxlbWVudCxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZURlY2tFbnRyeSB7XG5cbiAgICAvL3N0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2xpZGVEZWNrRW50cnkuaHRtbFwiO1xuICAgIC8vc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2xpZGVEZWNrRW50cnkuY3NzXCI7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9DTEFTUyA9IFwic2xpZGUtZGVjay1lbnRyeVwiO1xuXG4gICAgc3RhdGljIEVOVFJZX1BPU0lUSU9OX0ZST05UID0gXCJwb3NpdGlvbi1mcm9udFwiO1xuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9CRUhJTkQgPSBcInBvc2l0aW9uLWJlaGluZFwiO1xuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9SSUdIVCA9IFwicG9zaXRpb24tcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX0VYSVNUQU5DRV9QUkVTRU5UID0gXCJleGlzdGFuY2UtcHJlc2VudFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYSVNUQU5DRV9SRU1PVkVEID0gXCJleGlzdGFuY2UtcmVtb3ZlZFwiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge051bWJlcn0gKi9cbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9GUk9OVDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMHB4IDBweCAxMHB4IDEwcHggI2NjY2NjY1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImdyaWQtY29sdW1uXCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImdyaWQtcm93XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4taGVpZ2h0XCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnkucG9zaXRpb24tZnJvbnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIDAlKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJ0cmFuc2Zvcm0gLjZzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVjay1lbnRyeS5wb3NpdGlvbi1iZWhpbmRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIDAlKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJ0cmFuc2Zvcm0gLjZzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVjay1lbnRyeS5wb3NpdGlvbi1yaWdodFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrMTA1JSwgMCUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcInRyYW5zZm9ybSAuNnNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zbGlkZS1kZWNrLWVudHJ5LWNvbnRlbnQuZXhpc3RhbmNlLXJlbW92ZWRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnktY29udGVudC5leGlzdGFuY2UtcHJlc2VudFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPXNsaWRlRGVja0VudHJ5XCIsIFwiY2xhc3M9c2xpZGUtZGVjay1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9c2xpZGVEZWNrRW50cnlDb250ZW50XCIsIFwiY2xhc3M9c2xpZGUtZGVjay1lbnRyeS1jb250ZW50XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0Jhc2VFbGVtZW50fVxuICAgICAqL1xuICAgIGdldCBjb250ZW50RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5Q29udGVudFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7QmFzZUVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0IGVudHJ5RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5XCIpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTbGlkZURlY2tFbnRyeSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTbGlkZURlY2tFbnRyeS5uYW1lKTtcbiAgICB9XG5cbiAgICBzZXRJbmRleChpbmRleCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudChjb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5zZXRDaGlsZChjb21wb25lbnQpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuc2V0Q29udGVudFZpc2liaWxpdHkoU2xpZGVEZWNrRW50cnkuQ09OVEVOVF9FWElTVEFOQ0VfUFJFU0VOVCk7XG4gICAgICAgIHRoaXMuc2V0U2hpZnQoU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fRlJPTlQpO1xuICAgIH1cblxuICAgIGhpZGUobmV4dEluZGV4KSB7XG4gICAgICAgIGlmIChuZXh0SW5kZXggPiB0aGlzLmluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldFNoaWZ0KFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0JFSElORCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFNoaWZ0KFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX1JJR0hUKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkanVzdFdoZW5IaWRkZW4oKTtcbiAgICB9XG5cbiAgICBhZGp1c3RXaGVuSGlkZGVuKCkge1xuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNjAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fRlJPTlQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRWaXNpYmlsaXR5KFNsaWRlRGVja0VudHJ5LkNPTlRFTlRfRVhJU1RBTkNFX1JFTU9WRUQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50VmlzaWJpbGl0eShjb250ZW50VmlzaWJpbGl0eSkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbnRlbnRFbGVtZW50KS5yZXBsYWNlKFwiZXhpc3RhbmNlLVwiLCBjb250ZW50VmlzaWJpbGl0eSk7XG4gICAgfVxuXG4gICAgc2V0U2hpZnQocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmVudHJ5RWxlbWVudCkucmVwbGFjZShcInBvc2l0aW9uLVwiLCBwb3NpdGlvbik7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBTbGlkZURlY2tFbnRyeSB9IGZyb20gXCIuL3NsaWRlRGVja0VudHJ5L3NsaWRlRGVja0VudHJ5LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZURlY2sge1xuXG4gICAgc3RhdGljIEVWRU5UX0VOVFJZX0NIQU5HRUQgPSBcImV2ZW50RW50cnlDaGFuZ2VkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcDxDb21wb25lbnQ+fSBjb21wb25lbnRNYXAgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TWFwKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPENvbXBvbmVudD59ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFwID0gY29tcG9uZW50TWFwO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UHJvdmlkZXI8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihTbGlkZURlY2tFbnRyeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QgPSBuZXcgTGlzdCgpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge01hcDxOdW1iZXI+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5SW5kZXhNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTbGlkZURlY2tFbnRyeX0gKi9cbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2tcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmMWYxZjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZ3JpZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1zbGlkZURlY2tFbnRyaWVzXCIsIFwiY2xhc3M9c2xpZGUtZGVja1wiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFNsaWRlRGVjayk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTbGlkZURlY2submFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50TWFwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVFbnRyaWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzbGlkZURlY2tFbnRyaWVzXCIpLmVsZW1lbnQucGFyZW50RWxlbWVudC5zY3JvbGxUbygwLDApO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByZXBhcmVFbnRyaWVzKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hcC5mb3JFYWNoKGFzeW5jIChrZXksIGNvbXBvbmVudCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBzbGlkZURlY2tFbnRyeSA9IGF3YWl0IHRoaXMuc2xpZGVEZWNrRW50cnlQcm92aWRlci5nZXQoKTtcblxuICAgICAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jdXJyZW50RW50cnkpIHtcbiAgICAgICAgICAgICAgICBzbGlkZURlY2tFbnRyeS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBzbGlkZURlY2tFbnRyeTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5zZXQoa2V5LCBzbGlkZURlY2tFbnRyeSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5hZGQoc2xpZGVEZWNrRW50cnkpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUluZGV4TWFwLnNldChrZXksIHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSAtMSk7XG5cbiAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNldENvbnRlbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNldEluZGV4KHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSAtIDEpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcInNsaWRlRGVja0VudHJpZXNcIiwgc2xpZGVEZWNrRW50cnkuY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBzbGlkZU5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCArIDEgPj0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3Quc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4ICsgMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2xpZGVEZWNrLkVWRU5UX0VOVFJZX0NIQU5HRUQpO1xuICAgIH1cblxuICAgIHNsaWRlUHJldmlvdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4IC0gMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbiAgICBzbGlkZVRvKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5nZXQobmFtZSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIFRlbXBsYXRlQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBSYWRpb0lucHV0RWxlbWVudFxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlJhZGlvVG9nZ2xlSWNvblwiKTtcblxuZXhwb3J0IGNsYXNzIFJhZGlvVG9nZ2xlSWNvbiB7XG4gICAgXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0NIQU5HRUQgPSBDb21tb25FdmVudHMuQ0hBTkdFRDtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSBcIj9cIiwgbW9kZWwgPSBudWxsLCBpY29uID0gXCJmYXMgZmEtcXVlc3Rpb25cIiwgbGFiZWwgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLWljb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYmFja2dyb3VuZC1jb2xvciAwLjNzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjI0cHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1yYWRpb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYWxsIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lciBpbnB1dFt0eXBlPSdyYWRpbyddOm5vdCg6aXMoOmNoZWNrZWQpKSArIGxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJsaWdodGdyYXlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1jb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTpub3QoOmlzKDpjaGVja2VkKSkgKyBsYWJlbDpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiZ3JheVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lciBpbnB1dFt0eXBlPSdyYWRpbyddOmlzKDpjaGVja2VkKSArIGxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJzcGFuXCIsIFwiaWQ9Y29udGFpbmVyXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLWljb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXJhZGlvXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLWljb24tcmFkaW9cIiwgXCJ0eXBlPXJhZGlvXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJsYWJlbFwiLCBcImlkPWxhYmVsXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLWljb24tbGFiZWxcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiLCBcImlkPWljb25cIiwgXCJ0aXRsZT1cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShSYWRpb1RvZ2dsZUljb24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUmFkaW9Ub2dnbGVJY29uLm5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHJhZGlvID0gdGhpcy5nZXRSYWRpbygpO1xuICAgICAgICByYWRpby5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcbiAgICAgICAgcmFkaW8ubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsaWNrZWQsIHRoaXMpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gcmFkaW8uZ2V0QXR0cmlidXRlVmFsdWUoXCJpZFwiKTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGVWYWx1ZShcImZvclwiLCBpZCk7XG5cbiAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMuY29tcG9uZW50LmdldChcImljb25cIik7XG4gICAgICAgIGljb24uc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCB0aGlzLmljb24pO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHJhZGlvKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0NIQU5HRUQsIFtldmVudF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZUljb24uRVZFTlRfRU5BQkxFRCwgW2V2ZW50XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9ESVNBQkxFRCwgW2V2ZW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0b2dnbGUgc3RhdGUgcHJvZ3JhbW1hdGljYWxseVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCBcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNpbGVudFxuICAgICAqL1xuICAgIHRvZ2dsZShjaGVja2VkLCBzaWxlbnQgPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkID09PSBjaGVja2VkKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIE5vIGNoYW5nZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgIGlmICghdGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICAgICAgdGhpcy5nZXRSYWRpbygpLmNvbnRhaW5lckVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5nZXRSYWRpbygpLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRSYWRpbygpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZnJlc2hDb2xvcnMoKTtcbiAgICB9XG5cbiAgICAvKiogQHJldHVybnMge1JhZGlvSW5wdXRFbGVtZW50fSAqL1xuICAgIGdldFJhZGlvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHRvZ2dsZSBzdGF0ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENoZWNrYm94SW5wdXRFbGVtZW50XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUb2dnbGVJY29uXCIpO1xuXG5leHBvcnQgY2xhc3MgVG9nZ2xlSWNvbiB7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJ0b2dnbGVJY29uLXByaW1hcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TRUNPTkRBUlkgPSBcInRvZ2dsZUljb24tc2Vjb25kYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU1VDQ0VTUyA9IFwidG9nZ2xlSWNvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwidG9nZ2xlSWNvbi1pbmZvXCI7XG4gICAgc3RhdGljIFRZUEVfV0FSTklORyA9IFwidG9nZ2xlSWNvbi13YXJuaW5nXCI7XG4gICAgc3RhdGljIFRZUEVfREFOR0VSID0gXCJ0b2dnbGVJY29uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJ0b2dnbGVJY29uLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRZUEVfREFSSyA9IFwidG9nZ2xlSWNvbi1kYXJrXCI7XG5cbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcInRvZ2dsZUljb24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcInRvZ2dsZUljb24tbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBTUElOTkVSX1ZJU0lCTEUgPSBcInRvZ2dsZUljb24tc3Bpbm5lci1jb250YWluZXItdmlzaWJsZVwiO1xuICAgIHN0YXRpYyBTUElOTkVSX0hJRERFTiA9IFwidG9nZ2xlSWNvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIjtcblxuICAgIHN0YXRpYyBFVkVOVF9FTkFCTEVEID0gQ29tbW9uRXZlbnRzLkVOQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0RJU0FCTEVEID0gQ29tbW9uRXZlbnRzLkRJU0FCTEVEXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gY2hlY2tlZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSBcIj9cIiwgbW9kZWwgPSBudWxsLCBsYWJlbCA9IG51bGwsIGNoZWNrZWQgPSBmYWxzZSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmVuYWJsZWRJY29uID0gXCJmYXMgZmEtY2lyY2xlLWNoZWNrXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZGlzYWJsZWRJY29uID0gXCJmYXMgZmEtY2lyY2xlXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZGlzYWJsZWRDb2xvciA9IFwibGlnaHRncmF5XCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZW5hYmxlZENvbG9yID0gXCIjMjE5NkYzXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaG92ZXJDb2xvciA9IFwiZ3JheVwiO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudG9nZ2xlLWljb24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjFwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYmFja2dyb3VuZC1jb2xvciAwLjNzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMjBwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvZ2dsZS1pY29uLXJhZGlvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYWxsIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwic3BhblwiLCBcImlkPWNvbnRhaW5lclwiLCBcImNsYXNzPXRvZ2dsZS1pY29uLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1jaGVja2JveFwiLCBcImNsYXNzPXRvZ2dsZS1pY29uLXJhZGlvXCIsIFwidHlwZT1jaGVja2JveFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwibGFiZWxcIiwgXCJpZD1sYWJlbFwiLCBcImNsYXNzPXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJpZD1pY29uXCIsIFwidGl0bGU9XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVG9nZ2xlSWNvbik7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShUb2dnbGVJY29uLm5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gdGhpcy5nZXRDaGVja2JveCgpO1xuICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcbiAgICAgICAgY2hlY2tib3gubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5jaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlVmFsdWUoXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29tcG9uZW50LmdldChcImNvbnRhaW5lclwiKTtcbiAgICAgICAgY29udGFpbmVyLmxpc3RlblRvKFwibW91c2VvdmVyXCIsIHRoaXMuZW5hYmxlSG92ZXIsIHRoaXMpO1xuICAgICAgICBjb250YWluZXIubGlzdGVuVG8oXCJtb3VzZW91dFwiLCB0aGlzLmRpc2FibGVIb3ZlciwgdGhpcyk7XG5cbiAgICAgICAgY29uc3QgaWQgPSBjaGVja2JveC5nZXRBdHRyaWJ1dGVWYWx1ZShcImlkXCIpO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5jb21wb25lbnQuZ2V0KFwibGFiZWxcIik7XG4gICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZVZhbHVlKFwiZm9yXCIsIGlkKTtcblxuICAgICAgICB0aGlzLnJlZnJlc2hDb2xvcnMoKTtcblxuICAgIH1cblxuICAgIGFzeW5jIHJlZnJlc2hDb2xvcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlJY29uKHRoaXMuZW5hYmxlZEljb24pO1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbG9yKHRoaXMuZW5hYmxlZENvbG9yKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBseUljb24odGhpcy5kaXNhYmxlZEljb24pO1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbG9yKHRoaXMuZGlzYWJsZWRDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkSWNvbnMoZGlzYWJsZWRJY29uLCBlbmFibGVkSWNvbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkSWNvbiA9IGRpc2FibGVkSWNvbjtcbiAgICAgICAgdGhpcy5lbmFibGVkSWNvbiA9IGVuYWJsZWRJY29uO1xuICAgICAgICB0aGlzLmNoZWNrZWQgPyB0aGlzLmFwcGx5SWNvbih0aGlzLmVuYWJsZWRJY29uKSA6IHRoaXMuYXBwbHlJY29uKHRoaXMuZGlzYWJsZWRJY29uKTtcbiAgICB9XG5cbiAgICBsb2FkQ29sb3JzKGRpc2FibGVkLCBjaGVja2VkLCBob3Zlcikge1xuICAgICAgICB0aGlzLmRpc2FibGVkQ29sb3IgPSBkaXNhYmxlZDtcbiAgICAgICAgdGhpcy5lbmFibGVkQ29sb3IgPSBjaGVja2VkO1xuICAgICAgICB0aGlzLmhvdmVyQ29sb3IgPSBob3ZlcjtcbiAgICAgICAgdGhpcy5jaGVja2VkID8gdGhpcy5hcHBseUNvbG9yKHRoaXMuZW5hYmxlZENvbG9yKSA6IHRoaXMuYXBwbHlDb2xvcih0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBtZXRob2QgXG4gICAgICovXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobWV0aG9kKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2hlY2tib3goKS5saXN0ZW5UbyhcImNsaWNrXCIsIG1ldGhvZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdG9nZ2xlIHN0YXRlIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzaWxlbnRcbiAgICAgKi9cbiAgICB0b2dnbGUoY2hlY2tlZCwgc2lsZW50ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2hlY2tib3goKS5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2hlY2tib3goKS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2hlY2tib3goKS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHJldHVybnMge0NoZWNrYm94SW5wdXRFbGVtZW50fVxuICAgICAqL1xuICAgIGdldENoZWNrYm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgY2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcblxuICAgICAgICB0aGlzLnJlZnJlc2hDb2xvcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFRvZ2dsZUljb24uRVZFTlRfRU5BQkxFRCwgZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFRvZ2dsZUljb24uRVZFTlRfRElTQUJMRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yKGNvbG9yKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29tcG9uZW50LmdldChcImNvbnRhaW5lclwiKTtcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyBjb2xvcik7XG4gICAgfVxuXG4gICAgYXBwbHlJY29uKGljb24pIHtcbiAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpO1xuICAgICAgICBpY29uRWxlbWVudC5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIGljb24pO1xuICAgIH1cblxuICAgIGVuYWJsZUhvdmVyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGlmICghdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlVmFsdWUoXCJzdHlsZVwiLCBcImNvbG9yOiBcIiArIHRoaXMuaG92ZXJDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlSG92ZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29tcG9uZW50LmdldChcImNvbnRhaW5lclwiKTtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmVuYWJsZWRDb2xvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlVmFsdWUoXCJzdHlsZVwiLCBcImNvbG9yOiBcIiArIHRoaXMuZGlzYWJsZWRDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcblx0Q29tcG9uZW50LFxuXHRFdmVudE1hbmFnZXIsXG5cdFNpbXBsZUVsZW1lbnQsXG5cdFN0YXRlTWFuYWdlcixcblx0U3R5bGVzaGVldEJ1aWxkZXIsXG5cdENvbXBvbmVudEJ1aWxkZXIsXG5cdElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdmlkZXIgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSBcIi4uLy4uL3BhbmVsL3BhbmVsLmpzXCI7XG5pbXBvcnQgeyBSYWRpb1RvZ2dsZUljb24gfSBmcm9tIFwiLi4vLi4vaW5wdXQvcmFkaW9Ub2dnbGVJY29uL3JhZGlvVG9nZ2xlSWNvbi5qc1wiO1xuaW1wb3J0IHsgVG9nZ2xlSWNvbiB9IGZyb20gXCIuLi8uLi9pbnB1dC90b2dnbGVJY29uL3RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUcmVlUGFuZWxFbnRyeVwiKTtcblxuZXhwb3J0IGNsYXNzIFRyZWVQYW5lbEVudHJ5IHtcblxuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBTVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJzdWJSZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIEVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUgPSBcImV4cGFuZFRvZ2dsZU92ZXJyaWRlXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWNvcmQgPSBudWxsKSB7XG5cblx0XHQvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPFBhbmVsPn0gKi9cblx0XHR0aGlzLnBhbmVsUHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihQYW5lbCk7XG5cblx0XHQvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cblx0XHR0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge1N0YXRlTWFuYWdlcjxhbnlbXT59ICovXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZSA9IG5ldyBTdGF0ZU1hbmFnZXIoKTtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8VHJlZVBhbmVsRW50cnk+fSAqL1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFRyZWVQYW5lbEVudHJ5KTtcblxuXHRcdC8qKiBAdHlwZSB7VG9nZ2xlSWNvbn0gKi9cblx0XHR0aGlzLmV4cGFuZFRvZ2dsZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFRvZ2dsZUljb24pO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7YW55fSAqL1xuICAgICAgICB0aGlzLnJlY29yZCA9IHJlY29yZDtcbiAgICB9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcblx0ICogQHJldHVybnMge1N0eWxlc2hlZXR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG5cdFx0XHQubWVkaWEoXCJAbWVkaWEgKG1pbi13aWR0aDogNzM0cHgpXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5XCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LWJvcmRlcmVkXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImJvcmRlclwiLCBcIjJwdCBzb2xpZCAjZGRkZGRkXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjhwdCA4cHQgOHB0IDhwdFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiNnB0XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsIFwiNnB0XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjJwdFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcIm1hcmdpbi1yaWdodFwiLCBcIjJwdFwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LXJlY29yZC1lbGVtZW50XCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIzcHRcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1yZWNvcmQtc3VicmVjb3JkLWVsZW1lbnRzLWNvbnRhaW5lclwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1zdWJyZWNvcmQtZWxlbWVudHNcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMSAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktYnV0dG9ucy1jb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktYnV0dG9uc1wiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5tZWRpYShcIkBtZWRpYSAobWF4LXdpZHRoOiA3MzNweClcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnlcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktYm9yZGVyZWRcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiYm9yZGVyXCIsIFwiMnB0IHNvbGlkICNkZGRkZGRcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB0IDhwdCA4cHQgOHB0XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwicGFkZGluZy10b3BcIiwgXCI2cHRcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCI2cHRcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMnB0XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwibWFyZ2luLXJpZ2h0XCIsIFwiMnB0XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktcmVjb3JkLWVsZW1lbnRcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMSAwIGF1dG9cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjNwdFwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LXJlY29yZC1zdWJyZWNvcmQtZWxlbWVudHMtY29udGFpbmVyXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LXN1YnJlY29yZC1lbGVtZW50c1wiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1idXR0b25zLWNvbnRhaW5lclwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1idXR0b25zXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWwtZW50cnktZXhwYW5kXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMSBhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdC5zdHlsZShcInBhZGRpbmctcmlnaHRcIiwgXCI1cHhcIilcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LXN1YnJlY29yZC1lbGVtZW50cy1pbmRlbnRcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIDE4cHRcIilcblx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5zZWxlY3RvcihcIi50cmVlLXBhbmVsLWVudHJ5LXJlY29yZC1lbGVtZW50XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1lbnRyeS1idXR0b25zLWluZGVudFwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG5cdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIwIDAgMThwdFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImNsYXNzPXRyZWUtcGFuZWwtZW50cnlcIiwgXCJpZD1yb290XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1yZWNvcmQtZWxlbWVudFwiLCBcImlkPXJlY29yZEVsZW1lbnRDb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1leHBhbmRcIiwgXCJpZD1leHBhbmRCdXR0b25cIilcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPXRyZWUtcGFuZWwtZW50cnktcmVjb3JkLWVsZW1lbnRcIiwgXCJpZD1yZWNvcmRFbGVtZW50XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1idXR0b25zLWNvbnRhaW5lclwiLCBcImlkPWJ1dHRvbnNDb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1idXR0b25zLWluZGVudFwiLCBcImlkPWJ1dHRvbnNJbmRlbnRcIilcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPXRyZWUtcGFuZWwtZW50cnktYnV0dG9uc1wiLCBcImlkPWJ1dHRvbnNcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsLWVudHJ5LXJlY29yZC1zdWJyZWNvcmQtZWxlbWVudHMtY29udGFpbmVyXCIsIFwiaWQ9c3VicmVjb3JkRWxlbWVudHNDb250YWluZXJcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1lbnRyeS1zdWJyZWNvcmQtZWxlbWVudHMtaW5kZW50XCIsIFwiaWQ9c3VicmVjb3JkSW5kZW50XCIpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsLWVudHJ5LXN1YnJlY29yZC1lbGVtZW50c1wiLCBcImlkPXN1YnJlY29yZEVsZW1lbnRzXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRyZWVQYW5lbEVudHJ5KTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVHJlZVBhbmVsRW50cnkubmFtZSk7XG5cblx0XHR0aGlzLmV4cGFuZFRvZ2dsZS5ldmVudHMubGlzdGVuVG8oUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIHRoaXMubG9hZFN1YlJlY29yZHNDbGlja2VkLCB0aGlzKTtcblx0XHR0aGlzLmV4cGFuZFRvZ2dsZS5ldmVudHMubGlzdGVuVG8oUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0RJU0FCTEVELCB0aGlzLmhpZGVTdWJSZWNvcmRzQ2xpY2tlZCwgdGhpcyk7XG5cblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImV4cGFuZEJ1dHRvblwiLCB0aGlzLmV4cGFuZFRvZ2dsZS5jb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZS5yZWFjdChuZXcgTWV0aG9kKHRoaXMuaGFuZGxlU3RhdGVDaGFuZ2UsIHRoaXMpKTtcblxuICAgIH1cblxuXHRhc3luYyBlbmFibGVCb3JkZXIoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwicm9vdFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwidHJlZS1wYW5lbC1lbnRyeS1ib3JkZXJlZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlU3RhdGVDaGFuZ2Uob2JqZWN0KSB7XG5cdFx0aWYgKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRjb25zdCBwYW5lbCA9IGF3YWl0IHRoaXMucGFuZWxQcm92aWRlci5nZXQoW1xuXHRcdFx0XHRQYW5lbC5QQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU4sIFxuXHRcdFx0XHRQYW5lbC5QQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9MRUZULCBcblx0XHRcdFx0UGFuZWwuUEFSQU1FVEVSX1NUWUxFX1NJWkVfTUlOSU1BTF0pO1xuXG5cdFx0XHRvYmplY3QuZm9yRWFjaChhc3luYyAocmVjb3JkKSA9PiB7XG5cdFx0XHRcdGF3YWl0IHRoaXMucG9wdWxhdGVSZWNvcmQocGFuZWwsIHJlY29yZCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJzdWJyZWNvcmRFbGVtZW50c1wiLCBwYW5lbC5jb21wb25lbnQpO1xuXHRcdH1cbiAgICB9XG5cbiAgICAvKipcblx0ICogQHBhcmFtIHtDb21wb25lbnR9IHBhbmVsXG4gICAgICogQHBhcmFtIHthbnl9IHJlY29yZCBcbiAgICAgKi9cbiAgICBhc3luYyBwb3B1bGF0ZVJlY29yZChwYW5lbCwgcmVjb3JkKSB7XG5cdFx0Y29uc3QgdHJlZVBhbmVsU3ViRW50cnkgPSBhd2FpdCB0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmlkZXIuZ2V0KFtyZWNvcmRdKTtcblxuXHRcdGNvbnN0IHJlY29yZEVsZW1lbnQgPSBhd2FpdCB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgW251bGwsIHJlY29yZCwgdHJlZVBhbmVsU3ViRW50cnksIHRoaXNdKTtcbiAgICAgICAgXG5cdFx0aWYgKCFyZWNvcmRFbGVtZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dHJlZVBhbmVsU3ViRW50cnkuY29tcG9uZW50LnNldENoaWxkKFwicmVjb3JkRWxlbWVudFwiLCByZWNvcmRFbGVtZW50LmNvbXBvbmVudCk7XG5cblx0XHRhd2FpdCB0aGlzLmV2ZW50TWFuYWdlclxuXHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgW251bGwsIHRyZWVQYW5lbFN1YkVudHJ5LCByZWNvcmRdKTtcblxuXHRcdHRyZWVQYW5lbFN1YkVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgdGhpcy5lbnRyeVJlcXVlc3RlZCwgdGhpcyk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCB0aGlzLmV4cGFuZFRvZ2dsZU92ZXJyaWRlLCB0aGlzKTtcblxuXHRcdHRyZWVQYW5lbFN1YkVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZCwgdGhpcyk7XG5cblx0XHRwYW5lbC5jb21wb25lbnQuYWRkQ2hpbGQoXCJwYW5lbFwiLCB0cmVlUGFuZWxTdWJFbnRyeS5jb21wb25lbnQpO1xuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7VHJlZVBhbmVsRW50cnl9IHRyZWVQYW5lbEVudHJ5XG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICovXG5cdGFzeW5jIGVudHJ5UmVxdWVzdGVkKGV2ZW50LCByZWNvcmQsIHRyZWVQYW5lbEVudHJ5LCBwYXJlbnRUcmVlUGFuZWxFbnRyeSkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5ldmVudHMudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnldKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7VHJlZVBhbmVsRW50cnl9IHRyZWVQYW5lbEVudHJ5XG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICovXG5cdGFzeW5jIGV4cGFuZFRvZ2dsZU92ZXJyaWRlKGV2ZW50LCB0cmVlUGFuZWxFbnRyeSwgcmVjb3JkKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBhd2FpdCB0aGlzLmV2ZW50cy50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIFtldmVudCwgdHJlZVBhbmVsRW50cnksIHJlY29yZF0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHJlbG9hZFN1YlJlY29yZHMoKSB7XG5cdFx0Y29uc3QgZWxlbWVudEJ1dHRvbnNDb250YWluZXIgPSBhd2FpdCB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25zXCIpO1xuXHRcdGF3YWl0IHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChudWxsLCB0aGlzLnJlY29yZCwgdGhpcy5hcnJheVN0YXRlLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcik7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICogQHBhcmFtIHtTdGF0ZU1hbmFnZXI8YW55W10+fSBzdGF0ZU1hbmFnZXJcblx0ICogQHBhcmFtIHtTaW1wbGVFbGVtZW50fSBlbGVtZW50QnV0dG9uc0NvbnRhaW5lclxuXHQgKi9cblx0YXN5bmMgc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCBzdGF0ZU1hbmFnZXIsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGF3YWl0IHRoaXMuZXZlbnRzXG5cdFx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIFtldmVudCwgcmVjb3JkLCBzdGF0ZU1hbmFnZXIsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyXSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKi9cbiAgICBhc3luYyBsb2FkU3ViUmVjb3Jkc0NsaWNrZWQoZXZlbnQpIHtcblx0XHRjb25zdCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lciA9IGF3YWl0IHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvbnNcIik7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyXG5cdFx0XHQudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHRoaXMucmVjb3JkLCB0aGlzLmFycmF5U3RhdGUsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyXSk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG4gICAgaGlkZVN1YlJlY29yZHNDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInN1YnJlY29yZEVsZW1lbnRzXCIpLmNsZWFyKCk7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKS5jbGVhcigpO1xuICAgIH1cblxufSIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENhbnZhc1N0eWxlcywgRXZlbnRNYW5hZ2VyLCBTaW1wbGVFbGVtZW50LCBTdHlsZXNoZWV0QnVpbGRlciwgQ29tcG9uZW50QnVpbGRlciwgSW5saW5lQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgVHJlZVBhbmVsRW50cnkgfSBmcm9tIFwiLi90cmVlUGFuZWxFbnRyeS90cmVlUGFuZWxFbnRyeS5qc1wiO1xuaW1wb3J0IHsgUGFuZWwgfSBmcm9tIFwiLi4vcGFuZWwvcGFuZWwuanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVHJlZVBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgVHJlZVBhbmVsIHtcblxuXHRzdGF0aWMgRVZFTlRfUkVGUkVTSF9DTElDS0VEID0gXCJyZWZyZXNoQ2xpY2tlZFwiO1xuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBTVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJzdWJSZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIEVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUgPSBcImV4cGFuZFRvZ2dsZU92ZXJyaWRlXCI7XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge1BhbmVsfSBidXR0b25QYW5lbCBcblx0ICovXG5cdGNvbnN0cnVjdG9yKGJ1dHRvblBhbmVsID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxUcmVlUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihUcmVlUGFuZWxFbnRyeSk7XG5cblx0XHQvKiogQHR5cGUge1RyZWVQYW5lbEVudHJ5fSAqL1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtQYW5lbH0gKi9cblx0XHR0aGlzLmJ1dHRvblBhbmVsID0gYnV0dG9uUGFuZWw7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0Lm1lZGlhKFwiQG1lZGlhIChtaW4td2lkdGg6IDczNHB4KVwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbFwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXhcIiwgXCIxIDAgYXV0b1wiKVxuXHRcdFx0XHRcdC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0XHQuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJ0b3BcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuXHRcdFx0XHRcdC5zdHlsZShcInBhZGRpbmdcIiwgXCI1cHhcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5tZWRpYShcIkBtZWRpYSAobWF4LXdpZHRoOiA3MzNweClcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnNlbGVjdG9yKFwiLnRyZWUtcGFuZWxcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuXHRcdFx0XHRcdC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG5cdFx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZmZmZcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcblx0XHRcdFx0XHQuc3R5bGUoXCJwYWRkaW5nXCIsIFwiNXB4XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1jb250ZW50XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjEgMCBhdXRvXCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIudHJlZS1wYW5lbC1idXR0b25zXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcblx0XHRcdFx0LnN0eWxlKFwiZmxleFwiLCBcIjAgMSBhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcInBhZGRpbmctYm90dG9tXCIsIFwiNXB4XCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9dHJlZS1wYW5lbC1idXR0b25zXCIsIFwiaWQ9YnV0dG9ucGFuZWxcIilcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz10cmVlLXBhbmVsLWNvbnRlbnRcIiwgXCJpZD1yb290ZWxlbWVudFwiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0YXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVHJlZVBhbmVsKTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVHJlZVBhbmVsLm5hbWUpO1xuXG5cdFx0aWYgKHRoaXMuYnV0dG9uUGFuZWwpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiYnV0dG9ucGFuZWxcIiwgdGhpcy5idXR0b25QYW5lbC5jb21wb25lbnQpO1xuXHRcdH1cblxuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkgPSBhd2FpdCB0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmllci5nZXQoKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgdGhpcy5lbnRyeVJlcXVlc3RlZCwgdGhpcyk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCB0aGlzLmV4cGFuZFRvZ2dsZU92ZXJyaWRlLCB0aGlzKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZCwgdGhpcyk7XG5cdFx0Ly8gUm9vdCBlbGVtZW50IGhhcyBubyByZWNvcmRcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRJbmRlbnRcIikucmVtb3ZlKCk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5jb21wb25lbnQuZ2V0KFwicmVjb3JkRWxlbWVudENvbnRhaW5lclwiKS5yZW1vdmUoKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlIHsgRXZlbnRNYW5hZ2VyIH1cblx0ICovXG5cdGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIHJvb3QgVHJlZVBhbmVsRW50cnkgd2hlbiBpdCdzIG9yIG9uZSBvZiBpdCdzIHN1Ym9yZGluYXRlIGVsZW1lbnRzIG5lZWQgdG8gYmUgcmVuZGVyZWRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBlbnRyeVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnkpIHtcblx0XHR0cnkge1xuXG5cdFx0XHQvKiogQHR5cGUge2FueX0gKi9cblx0XHRcdGNvbnN0IHBhbmVsID0gYXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsLlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgW2V2ZW50LCByZWNvcmQsIHRyZWVQYW5lbEVudHJ5LCBwYXJlbnRUcmVlUGFuZWxFbnRyeV0pO1xuXG5cdFx0XHRyZXR1cm4gcGFuZWw7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgcm9vdCBUcmVlUGFuZWxFbnRyeSBpdCBhc2tzIGZvciB0aGUgZXhwYW5kIHRvZ2dsZSB0byBiZSBvdmVycmlkZGVuXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICogQHBhcmFtIHtUcmVlUGFuZWxFbnRyeX0gdHJlZVBhbmVsRW50cnlcblx0ICogQHBhcmFtIHthbnl9IHJlY29yZFxuXHQgKi9cblx0YXN5bmMgZXhwYW5kVG9nZ2xlT3ZlcnJpZGUoZXZlbnQsIHRyZWVQYW5lbEVudHJ5LCByZWNvcmQpIHtcblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsLkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIFt0cmVlUGFuZWxFbnRyeS5leHBhbmRUb2dnbGUsIHJlY29yZF0pO1xuXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgcm9vdCBUcmVlUGFuZWxFbnRyeSB3aGVuIGl0J3Mgb3Igb25lIG9mIGl0J3Mgc3Vib3JkaW5hdGUgZWxlbWVudHMgbmVlZCB0aGUgc3RhdGUgb2YgdGhlIHN1YnJlY29yZHMgdG8gYmUgdXBkYXRlZCxcblx0ICogZm9yIGV4YW1wbGUgd2hlbiB0aGUgZXhwYW5kIGJ1dHRvbiBpcyBjbGlja2VkXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICogQHBhcmFtIHthbnl9IHJlY29yZFxuXHQgKiBAcGFyYW0ge1N0YXRlTWFuYWdlcjxhbnlbXT59IHN0YXRlTWFuYWdlclxuXHQgKiBAcGFyYW0ge1NpbXBsZUVsZW1lbnR9IGVsZW1lbnRCdXR0b25zQ29udGFpbmVyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPFRyZWVQYW5lbEVudHJ5W10+fVxuXHQgKi9cblx0YXN5bmMgc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCBzdGF0ZU1hbmFnZXIsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGF3YWl0IHRoaXMuZXZlbnRzXG5cdFx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbC5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlc2V0XG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG5cdGFzeW5jIHJlc2V0KGV2ZW50KSB7XG5cdFx0YXdhaXQgdGhpcy5zdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKGV2ZW50LCBudWxsLCB0aGlzLnRyZWVQYW5lbEVudHJ5LmFycmF5U3RhdGUpO1xuXHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicm9vdGVsZW1lbnRcIiwgdGhpcy50cmVlUGFuZWxFbnRyeS5jb21wb25lbnQpO1xuXHR9XG59IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IsXG4gICAgSFRNTCxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcbmltcG9ydCB7IEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3JcIjtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZSB9IGZyb20gXCIuLi8uLi9jb2xvclBhbGV0dGVcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJ1dHRvblwiKTtcblxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJidXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwiYnV0dG9uLXNlY29uZGFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcImJ1dHRvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwiYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJidXR0b24td2FybmluZ1wiO1xuICAgIHN0YXRpYyBUWVBFX0RBTkdFUiA9IFwiYnV0dG9uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJidXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJidXR0b24tZGFya1wiO1xuXG4gICAgc3RhdGljIFNJWkVfTUVESVVNID0gXCJidXR0b24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNQSU5ORVJfVklTSUJMRSA9IFwiYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLXZpc2libGVcIjtcbiAgICBzdGF0aWMgU1BJTk5FUl9ISURERU4gPSBcImJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIjtcblxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYnV0dG9uVHlwZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpY29uQ2xhc3NcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYWJlbCwgYnV0dG9uVHlwZSA9IEJ1dHRvbi5UWVBFX1BSSU1BUlksIGJ1dHRvblNpemUgPSBCdXR0b24uU0laRV9NRURJVU0sIGljb25DbGFzcykge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmJ1dHRvblR5cGUgPSBidXR0b25UeXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmJ1dHRvblNpemUgPSBidXR0b25TaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmljb25DbGFzcyA9IGljb25DbGFzcztcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxCdXR0b24+fSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAubWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b25cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5tZWRpYShcIkAtd2Via2l0LWtleWZyYW1lcyBidXR0b24tc3Bpbm5lci1yb3RhdGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIwJVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIiwgXCJyb3RhdGUoMGRlZylcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKDBkZWcpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsIFwicm90YXRlKDM2MGRlZylcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKDM2MGRlZylcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLm1lZGlhKFwiQGtleWZyYW1lcyBidXR0b24tc3Bpbm5lci1yb3RhdGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIwJVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIiwgXCJyb3RhdGUoMGRlZylcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKDBkZWcpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsIFwicm90YXRlKDM2MGRlZylcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKDM2MGRlZylcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbi1vdXRsaW5lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLXNwaW5uZXIsIC5idXR0b24tc3Bpbm5lcjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEuNWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMS41ZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24tc3Bpbm5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjAuNWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3BcIiwgXCIwLjJlbSBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMilcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmlnaHRcIiwgXCIwLjJlbSBzb2xpZCByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMilcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItYm90dG9tXCIsIFwiMC4yZW0gc29saWQgcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjIpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWxlZnRcIiwgXCIwLjJlbSBzb2xpZCAjOTk5OTk5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVaKDApXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVooMClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVaKDApXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC1hbmltYXRpb25cIiwgXCJidXR0b24tc3Bpbm5lci1yb3RhdGUgMS4xcyBpbmZpbml0ZSBsaW5lYXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbmltYXRpb25cIiwgXCJidXR0b24tc3Bpbm5lci1yb3RhdGUgMS4xcyBpbmZpbml0ZSBsaW5lYXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24tc3Bpbm5lci1jb250YWluZXItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIyLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMi41ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIHRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24tbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbi1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEuNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtZGVjb3JhdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b246Zm9jdXMsIC5idXR0b24uZm9jdXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdXRsaW5lXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDAgMCAwLjJyZW0gcmdiYSgwLCAxMjMsIDI1NSwgMC4yNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24uZGlzYWJsZWQsIC5idXR0b246ZGlzYWJsZWRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC42NVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcInNlY29uZGFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG4gICAgICAgIFxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDcyLCAxODAsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDcyLCAxODAsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwiaW5mb1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcIndhcm5pbmdcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyMiwgMTcwLCAxMiwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJkYW5nZXJcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjI1LCA4MywgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjI1LCA4MywgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJsaWdodFwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcImRhcmtcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoODIsIDg4LCA5MywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1idXR0b24tb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiYnV0dG9uXCIsIFwiY2xhc3M9YnV0dG9uXCIsIFwiaWQ9YnV0dG9uXCIsIFwidHlwZT1idXR0b25cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIiwgXCJpZD1zcGlubmVyQ29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWJ1dHRvbi1zcGlubmVyXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxCdXR0b24+fSAqL1xuICAgIGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJ1dHRvbik7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCdXR0b24ubmFtZSk7XG4gICAgICAgIGlmICh0aGlzLmljb25DbGFzcykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmFkZENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYnV0dG9uXCIpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuYnV0dG9uU2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5idXR0b25UeXBlKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQnV0dG9uLkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG1ldGhvZCBcbiAgICAgKi9cbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihtZXRob2QpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbWV0aG9kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZW5hYmxlTG9hZGluZygpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lckNvbnRhaW5lclwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKEJ1dHRvbi5TUElOTkVSX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUoQnV0dG9uLlNQSU5ORVJfVklTSUJMRSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxvYWRpbmcoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJDb250YWluZXJcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShCdXR0b24uU1BJTk5FUl9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShCdXR0b24uU1BJTk5FUl9ISURERU4pO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJDaGVja0JveFwiKTtcblxuZXhwb3J0IGNsYXNzIENoZWNrQm94IHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCkge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIixcIjJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIixcIjAuNWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC11c2VyLXNlbGVjdFwiLFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otdXNlci1zZWxlY3RcIixcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdXNlci1zZWxlY3RcIixcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIixcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3ggaW5wdXRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIixcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLFwiY2FsYygxZW0gKyAwLjVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsXCJjYWxjKDFlbSArIDAuNXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCIjZWVlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94OmhvdmVyIGlucHV0IH4gLmNoZWNrLWJveC1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLFwiI2NjY1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveCBpbnB1dDpjaGVja2VkIH4gLmNoZWNrLWJveC1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveC1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLFwiXFxcIlxcXCJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94IGlucHV0OmNoZWNrZWQgfiAuY2hlY2stYm94LW1hcms6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveCAuY2hlY2stYm94LW1hcms6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsXCIwLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLFwiMC40ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLFwiMC42ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIixcIjAuNmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsXCJzb2xpZCB3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci13aWR0aFwiLFwiMCAzcHggM3B4IDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXRyYW5zZm9ybVwiLFwicm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy10cmFuc2Zvcm1cIixcInJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIixcInJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJsYWJlbFwiLCBcImlkPWNoZWNrLWJveFwiLCBcImNsYXNzPWNoZWNrLWJveFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1jaGVja0JveFwiLCBcInR5cGU9Y2hlY2tib3hcIilcbiAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJjbGFzcz1jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgICAgIC50ZXh0KFwiIFN0YXkgbG9nZ2VkIGluXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQ2hlY2tCb3gpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQ2hlY2tCb3gubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XG5cbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb250YWluZXJFdmVudCwgQ29udGFpbmVyRmlsZURhdGEgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkRW50cnkge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9SRU1PVkVfQ0xJQ0tFRCA9IFwicmVtb3ZlQ2xpY2tlZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YX0gZmlsZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbnRhaW5lckZpbGVEYXRhfSAqL1xuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5maWxlU2l6ZSA9IGZpbGUuc2l6ZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmZpbGVUeXBlID0gZmlsZS50eXBlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3BcIiwgXCIxcHggc29saWQgI2RkZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHMtbmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI1MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tcmlnaHRcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktZGV0YWlscy10eXBlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNjY2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMC45ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tcmlnaHRcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcmVtb3ZlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiZ3JheVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJhY2tncm91bmQtY29sb3IgMC4yc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LXJlbW92ZTpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjhmOWZhXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJnYXBcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3Mtc2l6ZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNjY2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiODBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLWJhclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNlOWVjZWZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3MtYmFyLWZpbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyOGE3NDVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIndpZHRoIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1zdGF0dXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIwLjllbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzY2NlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjgwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHNcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZU5hbWVcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzLW5hbWVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJGaWxlbmFtZVwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVUeXBlXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktZGV0YWlscy10eXBlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiRmlsZSBUeXBlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVtb3ZlQnV0dG9uXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktcmVtb3ZlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiLCBcImNsYXNzPWZhcyBmYS10cmFzaFwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzc1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1maWxlU2l6ZVwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLXNpemVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJGaWxlIFNpemVcIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1iYXJcIiwgXCJpZD1maWxlUHJvZ3Jlc3NcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1iYXItZmlsbFwiLCBcImlkPWZpbGVQcm9ncmVzc0JhclwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVTdGF0dXNcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1zdGF0dXNcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEZpbGVVcGxvYWRFbnRyeSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShGaWxlVXBsb2FkRW50cnkubmFtZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmaWxlTmFtZUVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlTmFtZVwiKTtcbiAgICAgICAgZmlsZU5hbWVFbGVtZW50LnNldENoaWxkKHRoaXMuZmlsZU5hbWUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZmlsZVNpemVFbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVNpemVcIik7XG4gICAgICAgIGZpbGVTaXplRWxlbWVudC5zZXRDaGlsZCgodGhpcy5maWxlU2l6ZSAvIDEwMjQpLnRvRml4ZWQoMikgKyBcIiBLQlwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZpbGVUeXBlRWxlbWVudCA9IHRoaXMuY29tcG9uZW50LmdldChcImZpbGVUeXBlXCIpO1xuICAgICAgICBmaWxlVHlwZUVsZW1lbnQuc2V0Q2hpbGQodGhpcy5maWxlVHlwZSA/IHRoaXMuZmlsZVR5cGUgOiBcIlVua25vd25cIik7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gdGhpcy5jb21wb25lbnQuZ2V0KFwicmVtb3ZlQnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdXR0b24ubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLnJlbW92ZUNsaWtlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcyh0aGlzLmZpbGUsIHRoaXMuZmlsZS5uYW1lKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgcmVtb3ZlQ2xpa2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZEVudHJ5LkVWRU5UX1JFTU9WRV9DTElDS0VELCBbZXZlbnQsIHRoaXMuZmlsZV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRmlsZURhdGF9IGZpbGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9ncmVzcyhmaWxlLCBrZXkpIHtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzQmFyID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVByb2dyZXNzQmFyXCIpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuc2V0U3R5bGUoXCJ3aWR0aFwiLCBmaWxlLnVwbG9hZFBlcmNlbnRhZ2UgKyBcIiVcIik7XG4gICAgICAgICAgICBpZiAoZmlsZS51cGxvYWRQZXJjZW50YWdlID49IDEwMCkge1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IENvbnRhaW5lckV2ZW50LCBDb250YWluZXJGaWxlRGF0YSB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTaW1wbGVFbGVtZW50LFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBIVE1MLFxuICAgIFN0YXRlTWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm92aWRlciB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgRmlsZVVwbG9hZEVudHJ5IH0gZnJvbSBcIi4vZmlsZVVwbG9hZEVudHJ5L2ZpbGVVcGxvYWRFbnRyeS5qc1wiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHMuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkZpbGVVcGxvYWRcIik7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkIHtcblxuXHRzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiRmlsZVVwbG9hZFwiO1xuXG5cdHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG4gICAgc3RhdGljIEVWRU5UX0ZJTEVfQURERUQgPSBcImZpbGVBZGRlZFwiO1xuICAgIHN0YXRpYyBFVkVOVF9GSUxFX1JFTU9WRUQgPSBcImZpbGVSZW1vdmVkXCI7XG4gICAgc3RhdGljIEVWRU5UX1VQTE9BRF9DT01QTEVURSA9IFwidXBsb2FkQ29tcGxldGVcIjtcbiAgICBzdGF0aWMgRVZFTlRfVVBMT0FEX1JFU0VUID0gXCJ1cGxvYWRSZXNldFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtdWx0aXBsZVxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZmlsZVR5cGVBcnJheVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG11bHRpcGxlID0gZmFsc2UsIGZpbGVUeXBlQXJyYXkgPSBbXSkge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMubXVsdGlwbGUgPSBtdWx0aXBsZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gICAgICAgIHRoaXMuZmlsZVR5cGVBcnJheSA9IGZpbGVUeXBlQXJyYXk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdGF0ZU1hbmFnZXI8Q29udGFpbmVyRmlsZURhdGE+fSAgKi9cbiAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZSA9IG5ldyBTdGF0ZU1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge1Byb3ZpZGVyPEZpbGVVcGxvYWRFbnRyeT59ICovXG4gICAgICAgIHRoaXMuZmlsZVVwbG9hZEVudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihGaWxlVXBsb2FkRW50cnkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lcnJvclwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzLCBwYWRkaW5nIC4ycywgb3BhY2l0eSAuMnMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVycm9yIGlcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtYm94XCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIycHggZGFzaGVkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMTVwdFwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnMtaWNvblwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0OHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiNDhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjAgYXV0byAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCJjb250YWluXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1yZXBlYXRcIiwgXCJuby1yZXBlYXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZTFlMWUxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiM3JlbVwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zLXRleHRcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM2Yzc1N2RcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2U5ZWNlZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiM4MGJkZmZcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtaW5wdXRcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLXVuc3VwcG9ydGVkLWZpbGVcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiI2RjMzU0NVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuODc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMjVyZW0gMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1sZWZ0XCIsIFwiM3B4IHNvbGlkICNkYzM1NDVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMC41MHJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjhkN2RhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZVVwbG9hZEVycm9yXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZXJyb3IgZmlsZS11cGxvYWQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIkludmFsaWQgZmlsZS11cGxvYWRcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXVwbG9hZEJveFwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWJveFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1pbnN0cnVjdGlvbnNcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1maWxlSW5wdXRcIiwgXCJ0eXBlPWZpbGVcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1pbnB1dFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD11cGxvYWRCb3hJY29uXCIsIFwiY2xhc3M9ZmFzIGZhLXVwbG9hZCBmaWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zLWljb25cIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD11bnN1cHBvcnRlZFwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVMaXN0XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShGaWxlVXBsb2FkKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEZpbGVVcGxvYWQubmFtZSk7XG5cbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7U2ltcGxlRWxlbWVudH0gKi9cbiAgICAgICAgY29uc3QgdXBsb2FkQm94ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidXBsb2FkQm94XCIpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVyLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiZHJhZ2xlYXZlXCIsIHRoaXMuZHJhZ0xlYXZlLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiZHJvcFwiLCB0aGlzLmZpbGVEcm9wcGVkLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5maWxlSW5wdXRDbGlja2VkLCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICAgICAgZmlsZUlucHV0LmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJtdWx0aXBsZVwiLCBcIm11bHRpcGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICBmaWxlSW5wdXQubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5maWxlSW5wdXRDaGFuZ2VkLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGZpbGVJbnB1dENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICBmaWxlSW5wdXQuY29udGFpbmVyRWxlbWVudC52YWx1ZSA9IG51bGw7XG4gICAgICAgIGZpbGVJbnB1dC5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGZpbGVJbnB1dENoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzRmlsZXMoZXZlbnQuZmlsZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdXBsb2FkZWQgZmlsZXMgYW5kIHZhbGlkYXRlIGFnYWluc3QgZmlsZSB0eXBlIGFycmF5XG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YVtdfSBmaWxlc1xuICAgICAqL1xuICAgIGFzeW5jIHByb2Nlc3NGaWxlcyhmaWxlcykge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRGaWxlcyA9IFtdO1xuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZEZpbGVzID0gW107XG4gICAgICAgIGNvbnN0IGFkZGVkRmlsZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZEZpbGUgPSB0aGlzLmlzRmlsZVR5cGVTdXBwb3J0ZWQoZmlsZSk7XG4gICAgICAgICAgICBjb25zdCBmaWxlQWxyZWFkeVNlbGV0ZWQgPSB0aGlzLmZpbGVBbHJlYWR5U2VsZXRlZChmaWxlKTtcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWRGaWxlICYmICFmaWxlQWxyZWFkeVNlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdXBwb3J0ZWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIHN1cHBvcnRlZCBmaWxlc1xuICAgICAgICBpZiAoc3VwcG9ydGVkRmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHN1cHBvcnRlZEZpbGVzKSB7XG4gICAgICAgICAgICAgICAgYWRkZWRGaWxlcy5wdXNoKGF3YWl0IHRoaXMuZmlsZUFycmF5U3RhdGUudXBkYXRlKGZpbGUsIGZpbGUubmFtZSkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaG93IHVuc3VwcG9ydGVkIGZpbGVzXG4gICAgICAgIHRoaXMuc2hvd1Vuc3VwcG9ydGVkRmlsZXModW5zdXBwb3J0ZWRGaWxlcyk7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIGZpbGUgYWRkZWQgZXZlbnQgZm9yIGVhY2ggc3VwcG9ydGVkIGZpbGVcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGFkZGVkRmlsZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9GSUxFX0FEREVELCBbZmlsZV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsZUFscmVhZHlTZWxldGVkKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZUFycmF5U3RhdGUub2JqZWN0TWFwLmhhcyhmaWxlLm5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGZpbGUgdHlwZSBpcyBzdXBwb3J0ZWRcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhfSBmaWxlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNGaWxlVHlwZVN1cHBvcnRlZChmaWxlKSB7XG4gICAgICAgIC8vIElmIGZpbGVUeXBlQXJyYXkgaXMgZW1wdHksIGFjY2VwdCBhbGwgZmlsZXNcbiAgICAgICAgaWYgKHRoaXMuZmlsZVR5cGVBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZmlsZSdzIE1JTUUgdHlwZSBtYXRjaGVzIGFueSBpbiB0aGUgZmlsZVR5cGVBcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5maWxlVHlwZUFycmF5LmluY2x1ZGVzKGZpbGUudHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSB1bnN1cHBvcnRlZCBmaWxlcyBpbiB0aGUgdW5zdXBwb3J0ZWQgZGl2XG4gICAgICogQHBhcmFtIHtBcnJheTxGaWxlPn0gdW5zdXBwb3J0ZWRGaWxlc1xuICAgICAqL1xuICAgIHNob3dVbnN1cHBvcnRlZEZpbGVzKHVuc3VwcG9ydGVkRmlsZXMpIHtcbiAgICAgICAgY29uc3QgdW5zdXBwb3J0ZWREaXYgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICAgICAgdW5zdXBwb3J0ZWREaXYuY2xlYXIoKTtcblxuICAgICAgICBpZiAodW5zdXBwb3J0ZWRGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHVuc3VwcG9ydGVkRmlsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IEhUTUwuY3VzdG9tKFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImZpbGUtdXBsb2FkLXVuc3VwcG9ydGVkLWZpbGVcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQuc2V0Q2hpbGQoYEZpbGUgXCIke2ZpbGUubmFtZX1cIiBpcyBub3Qgc3VwcG9ydGVkLmApO1xuICAgICAgICAgICAgICAgIHVuc3VwcG9ydGVkRGl2LmFkZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgdXBsb2FkQm94ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidXBsb2FkQm94XCIpO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh1cGxvYWRCb3gpLmVuYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGRyYWdMZWF2ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHVwbG9hZEJveCkuZGlzYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBmaWxlRHJvcHBlZChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHVwbG9hZEJveCkuZGlzYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcblxuICAgICAgICB0aGlzLnByb2Nlc3NGaWxlcyhldmVudC5maWxlcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlRmlsZUxpc3QoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVMaXN0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUxpc3RcIik7XG4gICAgICAgIGZpbGVMaXN0LmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfUkVTRVQpO1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5maWxlQXJyYXlTdGF0ZS5vYmplY3RNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGF3YWl0IHRoaXMuZmlsZVVwbG9hZEVudHJ5UHJvdmlkZXIuZ2V0KFtmaWxlXSk7XG4gICAgICAgICAgICBmaWxlRW50cnkuZXZlbnRzLmxpc3RlblRvKEZpbGVVcGxvYWRFbnRyeS5FVkVOVF9SRU1PVkVfQ0xJQ0tFRCwgdGhpcy5yZW1vdmVGaWxlRW50cnksIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdFRvKGZpbGUubmFtZSwgbmV3IE1ldGhvZChmaWxlRW50cnkudXBkYXRlUHJvZ3Jlc3MsIGZpbGVFbnRyeSkpO1xuICAgICAgICAgICAgZmlsZUxpc3QuYWRkQ2hpbGQoZmlsZUVudHJ5LmNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdChuZXcgTWV0aG9kKHRoaXMuY2hlY2tGaWxlVXBsb2FkQ29tcGxldGUsIHRoaXMpKTtcbiAgICB9XG5cbiAgICBjaGVja0ZpbGVVcGxvYWRDb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUFycmF5U3RhdGUub2JqZWN0TWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfUkVTRVQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdE1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKCFmaWxlLnVwbG9hZENvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfQ09NUExFVEUsIFt0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdEFycmF5XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0ZpbGV9IGZpbGVcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJnc1xuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUZpbGVFbnRyeShldmVudCwgZmlsZSwgYXJncykge1xuICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlLmRlbGV0ZShmaWxlLm5hbWUpO1xuICAgICAgICAvLyBDbGVhciB1bnN1cHBvcnRlZCBmaWxlcyB3aGVuIHVwZGF0aW5nIGZpbGUgbGlzdFxuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZERpdiA9IHRoaXMuY29tcG9uZW50LmdldChcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUZpbGVMaXN0KCk7XG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGNsaWNrIGV2ZW50IGZyb20gYnViYmxpbmcgdXAgdG8gdGhlIHVwbG9hZCBib3hcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGaWxlVXBsb2FkQ29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcblxuICAgIH1cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgTnVtYmVyVmFsaWRhdG9yLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRleHRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIE51bWJlcklucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIk51bWJlclwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBOdW1iZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKE51bWJlcklucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IE51bWJlclZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcIm51bWJlcklucHV0XCIsXG4gICAgICAgICAgICBcIm51bWJlckVycm9yXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1pbnB1dC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPW51bWJlckVycm9yXCIsIFwiY2xhc3M9bnVtYmVyLWlucHV0LWVycm9yIG51bWJlci1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCB2YWx1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1udW1iZXJJbnB1dFwiLCBcInR5cGU9bnVtYmVyXCIsIFwicGF0dGVybj1bMC05XSpcIiwgXCJpbnB1dG1vZGU9bnVtZXJpY1wiLCBcImNsYXNzPW51bWJlci1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwibnVtYmVyLWlucHV0LWVycm9yIG51bWJlci1pbnB1dC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJudW1iZXItaW5wdXQtZXJyb3IgbnVtYmVyLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgUmVxdWlyZWRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJQYXNzd29yZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQYXNzd29yZElucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkSW5wdXRcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRFcnJvclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1pbnB1dC1lcnJvclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcyAuMnMsIHBhZGRpbmcgLjNzIC4ycywgb3BhY2l0eSAuMnMgMHMsIHZpc2liaWxpdHkgMHMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMHB4IDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3IgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1wYXNzd29yZEVycm9yXCIsIFwiY2xhc3M9cGFzc3dvcmQtaW5wdXQtZXJyb3IgcGFzc3dvcmQtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIlBhc3N3b3JkIHJlcXVpcmVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXBhc3N3b3JkSW5wdXRcIiwgXCJ0eXBlPXBhc3N3b3JkXCIsIFwiY2xhc3M9cGFzc3dvcmQtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgUGFzc3dvcmRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJOZXcgcGFzc3dvcmRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBQYXNzd29yZFZhbGlkYXRvcihtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlRXJyb3JcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIyNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1jcmllcmlhLWxpc3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1pbmxpbmUtc3RhcnRcIiwgXCIyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUVycm9yXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJNaW5pbXVtIDggY2hhcmFjdGVycyBjb250YWluaW5nOlwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInVsXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1jcmllcmlhLWxpc3RcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTGV0dGVyKHMpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTnVtYmVyKHMpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiU3BlY2lhbCBjaGFyYWN0ZXIocykgIz8hQCQlXiYqLVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiYXV0b2NvbXBsZXRlPW5ldy1wYXNzd29yZFwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLCBcInR5cGU9cGFzc3dvcmRcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIkNvbmZpcm0gcGFzc3dvcmRcIjtcbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWUgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLFxuICAgICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvcihtYW5kYXRvcnksIGZhbHNlLCBtb2RlbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRmllbGRcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRXJyb3JcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImNhbGMoMS41ZW0gKyAwLjc1cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY2xpcFwiLCBcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEVycm9yXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiUGFzc3dvcmRzIG11c3QgbWF0Y2hcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9cGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRmllbGRcIiwgXCJ0eXBlPXBhc3N3b3JkXCIsIFwiYXV0b2NvbXBsZXRlPW5ldy1wYXNzd29yZFwiLCBcImNsYXNzPXBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3IgcGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yLWhpZGRlblwiKTsgfVxufSIsImV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJNb2RlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udHJvbFBhc3N3b3JkID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXROZXdQYXNzd29yZChuZXdQYXNzd29yZCkge1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkID0gbmV3UGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgZ2V0TmV3UGFzc3dvcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld1Bhc3N3b3JkO1xuICAgIH1cblxuICAgIHNldENvbnRyb2xQYXNzd29yZChjb250cm9sUGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sUGFzc3dvcmQgPSBjb250cm9sUGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgZ2V0Q29udHJvbFBhc3N3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sUGFzc3dvcmQ7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIEFuZFZhbGlkYXRvclNldCxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgUHJvcGVydHlBY2Nlc3NvciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJNb2RlbCB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlck1vZGVsLmpzXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dCB7XG5cblx0c3RhdGljIEVWRU5UX1ZBTElEQVRFRF9FTlRFUkVEID0gXCJ2YWxpZGF0ZWRFbnRlcmVkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250cm9sUGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsXG4gICAgICAgIG1vZGVsID0gbnVsbCxcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBcbiAgICAgICAgY29udHJvbFBsYWNlaG9sZGVyID0gUGFzc3dvcmRNYXRjaGVySW5wdXQuREVGQVVMVF9DT05UUk9MX1BMQUNFSE9MREVSLFxuICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBudWxsO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwgPSBuZXcgUGFzc3dvcmRNYXRjaGVyTW9kZWwoKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlfSAqL1xuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUsXG4gICAgICAgICAgICBbXCJuZXdQYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLCBwbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxuXHRcdCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2x9ICovXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wsXG4gICAgICAgICAgICBbXCJjb250cm9sUGFzc3dvcmRcIiwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCwgXCJuZXdQYXNzd29yZFwiLCBjb250cm9sUGxhY2Vob2xkZXIsIG1hbmRhdG9yeV1cblx0XHQpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtaGludFwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM4ODg4ODhcIilcbiAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOGVtXCIpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgLnN0eWxlKFwid2hpdGUtc3BhY2VcIiwgXCJub3dyYXBcIilcbiAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXJvb3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1oaW50XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIiogTXVzdCBjb250YWluIGxldHRlcnMsIG51bWJlcnMgYW5kIHNwZWNpYWwgY2hhcmFjdGVyc1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhc3N3b3JkTWF0Y2hlcklucHV0KTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUGFzc3dvcmRNYXRjaGVySW5wdXQubmFtZSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY29tcG9uZW50KTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgdGhpcy5wYXNzd29yZFZhbHVlRW50ZXJlZCwgdGhpcylcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgdGhpcy5wYXNzd29yZFZhbHVlQ2hhbmdlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgdGhpcy5wYXNzd29yZENvbnRyb2xFbnRlcmVkLCB0aGlzKTtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgQW5kVmFsaWRhdG9yU2V0KClcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkYXRvcih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE1ldGhvZCh0aGlzLnBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCwgdGhpcykpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBwYXNzd29yZE1hdGNoZXJWYWxpZE9jY3VyZWQoKSB7XG4gICAgICAgIFByb3BlcnR5QWNjZXNzb3Iuc2V0VmFsdWUodGhpcy5tb2RlbCwgdGhpcy5uYW1lLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLmdldE5ld1Bhc3N3b3JkKCkpXG4gICAgfVxuXG4gICAgcGFzc3dvcmRWYWx1ZUVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzc3dvcmRWYWx1ZUNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwYXNzd29yZENvbnRyb2xFbnRlcmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUGFzc3dvcmRNYXRjaGVySW5wdXQuRVZFTlRfVkFMSURBVEVEX0VOVEVSRUQsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZm9jdXMoKTsgfVxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnNlbGVjdEFsbCgpOyB9XG4gICAgZW5hYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZW5hYmxlKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmRpc2FibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZGlzYWJsZSgpOyB9XG4gICAgY2xlYXIoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jbGVhcigpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jbGVhcigpOyB9XG59IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBQaG9uZVZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBob25lSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQaG9uZUlucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlBob25lXCI7XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQaG9uZUlucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFBob25lVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGhvbmVJbnB1dFwiLFxuICAgICAgICAgICAgXCJwaG9uZUVycm9yXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiY2FsYygxLjVlbSArIDAuNzVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jbGlwXCIsIFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtaW5wdXQtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5waG9uZS1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWlucHV0LWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMTUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtaW5wdXQtZXJyb3IgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5waG9uZS1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cGhvbmVFcnJvclwiLCBcImNsYXNzPXBob25lLWlucHV0LWVycm9yIHBob25lLWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJJbnZhbGlkIHBob25lIG51bWJlclwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInVsXCIsIFwiY2xhc3M9cGhvbmUtbWF0Y2hlci1pbnB1dC12YWx1ZS1jcmllcmlhLWxpc3RcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTXVzdCBzdGFydCB3aXRoICsgc2lnblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwibGlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcImZvbGxvd2VkIGJ5IG1pbmltdW0gOCBudW1iZXJzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1waG9uZUlucHV0XCIsIFwidHlwZT10ZXh0XCIsIFwiY2xhc3M9cGhvbmUtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGhvbmUtaW5wdXQtZXJyb3IgcGhvbmUtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGhvbmUtaW5wdXQtZXJyb3IgcGhvbmUtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG59IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb0J1dHRvblwiKTtcblxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uIHtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctbGVmdFwiLCBcIjJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIwLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uIGlucHV0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24tbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIyMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNkZGRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXdpZHRoXCIsIFwiMXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXN0eWxlXCIsIFwic29saWRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItY29sb3JcIiwgXCIjYmJiXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uOmhvdmVyIGlucHV0IH4gLmNoZWNrLWJveC1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyMTk2RjNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24gaW5wdXQ6Y2hlY2tlZCB+IC5yYWRpby1idXR0b24tbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZGRkXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uLW1hcms6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiXFxcIlxcXCJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24gaW5wdXQ6Y2hlY2tlZCB+IC5yYWRpby1idXR0b24tbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbiAucmFkaW8tYnV0dG9uLW1hcms6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC01MCUsIC01MCUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjUwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImxhYmVsXCIsIFwiY2xhc3M9cmFkaW8tYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXJhZGlvXCIsIFwidHlwZT1yYWRpb1wiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImNsYXNzPXJhZGlvLWJ1dHRvbi1tYXJrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFJhZGlvQnV0dG9uKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFJhZGlvQnV0dG9uLm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJyYWRpb1wiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9CdXR0b24uRVZFTlRfQ0xJQ0tFRCwgW2V2ZW50XSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlJhZGlvVG9nZ2xlU3dpdGNoXCIpO1xuXG5leHBvcnQgY2xhc3MgUmFkaW9Ub2dnbGVTd2l0Y2gge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9FTkFCTEVEID0gQ29tbW9uRXZlbnRzLkVOQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0RJU0FCTEVEID0gQ29tbW9uRXZlbnRzLkRJU0FCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0MXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMjRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJyaWdodFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3R0b21cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNjY2NcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMjRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIuNHNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItd2lkdGhcIiwgXCIxcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItc3R5bGVcIiwgXCJzb2xpZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiNiYmJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlcjpiZWZvcmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIlxcXCJcXFwiXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTdwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTdwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzLjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvdHRvbVwiLCBcIjMuNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIuNHNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDApXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaDpob3ZlciAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2JiYlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWNvbG9yXCIsIFwiIzE5NzZEMlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlcjpiZWZvcmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDE3cHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dDpmb2N1cyArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDAgMXB0ICMyMTk2RjNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0OmRpc2FibGVkICsgLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuNlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcIm5vdC1hbGxvd2VkXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dDpkaXNhYmxlZDpob3ZlciArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjY2NjXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbm1wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbm1wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb25tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJsYWJlbFwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1zd2l0Y2hcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9Y2hlY2tib3hcIiwgXCJ0eXBlPWNoZWNrYm94XCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUmFkaW9Ub2dnbGVTd2l0Y2gpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUmFkaW9Ub2dnbGVTd2l0Y2gubmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZVN3aXRjaC5FVkVOVF9DSEFOR0VELCBbZXZlbnQsIHRoaXMuY2hlY2tlZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZVN3aXRjaC5FVkVOVF9FTkFCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVTd2l0Y2guRVZFTlRfRElTQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdG9nZ2xlIHN0YXRlIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgXG4gICAgICovXG4gICAgdG9nZ2xlKGNoZWNrZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpLmNvbnRhaW5lckVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB0b2dnbGUgc3RhdGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyxcbiAgICBPcHRpb25FbGVtZW50LFxuICAgIFNlbGVjdEVsZW1lbnQsIFxuICAgIFN0eWxlc2hlZXQsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJTZWxlY3RcIik7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Qge1xuXG5cdHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJTZWxlY3RcIjtcblxuXHRzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtBcnJheTxPcHRpb25FbGVtZW50Pn0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBvcHRpb25zID0gW10sIHBsYWNlaG9sZGVyID0gU2VsZWN0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXk8T3B0aW9uRWxlbWVudD59ICovXG4gICAgICAgIHRoaXMub3B0aW9uc0FycmF5ID0gb3B0aW9ucztcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5tYW5kYXRvcnkgPSBtYW5kYXRvcnk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImNhbGMoMS41ZW0gKyAwLjc1cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY2xpcFwiLCBcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB0IHNvbGlkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFwcGVhcmFuY2VcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC1hcHBlYXJhbmNlXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIFwidXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIGZpbGw9JzIxOTZGMycgaGVpZ2h0PScyMCcgdmlld0JveD0nMCAwIDIwIDIwJyB3aWR0aD0nMjAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48L3N2Zz5cXFwiKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtcmVwZWF0XCIsIFwibm8tcmVwZWF0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1wb3NpdGlvblwiLCBcInJpZ2h0IDAuNzVyZW0gY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1zaXplXCIsIFwiMS41ZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHQgOHB0IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFwdCA4cHQgcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXNlbGVjdEVycm9yXCIsIFwiY2xhc3M9c2VsZWN0LWVycm9yIHNlbGVjdC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCBzZWxlY3Rpb25cIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcInNlbGVjdFwiLCBcImlkPXNlbGVjdFwiLCBcImNsYXNzPXNlbGVjdC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFNlbGVjdCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTZWxlY3QubmFtZSk7XG5cblx0XHQvKiogQHR5cGUge1NlbGVjdEVsZW1lbnR9ICovXG5cdFx0Y29uc3Qgc2VsZWN0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpO1xuXG4gICAgICAgIHNlbGVjdC5uYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcInNlbGVjdFwiKSk7XG4gICAgICAgIH1cblxuXHRcdGlmICh0aGlzLm9wdGlvbnNBcnJheSAmJiB0aGlzLm9wdGlvbnNBcnJheS5sZW5ndGggPiAwKSB7XG5cdFx0XHRzZWxlY3Qub3B0aW9ucyA9IHRoaXMub3B0aW9uc0FycmF5O1xuXHRcdH1cblxuICAgICAgICBzZWxlY3QubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsaWNrZWQsIHRoaXMpO1xuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtBcnJheTxPcHRpb25FbGVtZW50Pn0gb3B0aW9uc0FycmF5XG5cdCAqL1xuXHRzZXQgb3B0aW9ucyhvcHRpb25zQXJyYXkpIHtcblx0XHR0aGlzLm9wdGlvbnNBcnJheSA9IG9wdGlvbnNBcnJheTtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdC8qKiBAdHlwZSB7U2VsZWN0RWxlbWVudH0gKi9cblx0XHRcdGNvbnN0IHNlbGVjdCA9IHRoaXMuY29tcG9uZW50LmdldChcInNlbGVjdFwiKTtcblx0XHRcdGlmIChzZWxlY3QgJiYgdGhpcy5vcHRpb25zQXJyYXkgJiYgdGhpcy5vcHRpb25zQXJyYXkubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRzZWxlY3Qub3B0aW9ucyA9IHRoaXMub3B0aW9uc0FycmF5O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNlbGVjdC5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXRcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgUmVxdWlyZWRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUZXh0SW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiVGV4dFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihUZXh0SW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoZmFsc2UsIG1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwidGV4dElucHV0XCIsXG4gICAgICAgICAgICBcInRleHRFcnJvclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiY2FsYygxLjVlbSArIDAuNzVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jbGlwXCIsIFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudGV4dC1pbnB1dC1lcnJvclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRleHQtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWlucHV0LWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWlucHV0LWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudGV4dC1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXRleHRFcnJvclwiLCBcImNsYXNzPXRleHQtaW5wdXQtZXJyb3IgdGV4dC1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCB2YWx1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD10ZXh0SW5wdXRcIiwgXCJ0eXBlPXRleHRcIiwgXCJjbGFzcz10ZXh0LWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJ0ZXh0LWlucHV0LWVycm9yIHRleHQtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwidGV4dC1pbnB1dC1lcnJvciB0ZXh0LWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXRcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkhpZGRlbklucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgSGlkZGVuSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCkge1xuXG4gICAgICAgIHN1cGVyKEhpZGRlbklucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBcImhpZGRlbklucHV0XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuaGlkZGVuLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJpbnB1dFwiLCBcImlkPWhpZGRlbklucHV0XCIsIFwidHlwZT1oaWRkZW5cIiwgXCJjbGFzcz1oaWRkZW4taW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgRW1haWxWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFbWFpbElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgRW1haWxJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJFbWFpbFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihFbWFpbElucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IEVtYWlsVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwiZW1haWxJbnB1dFwiLFxuICAgICAgICAgICAgXCJlbWFpbEVycm9yXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiY2FsYygxLjVlbSArIDAuNzVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIixcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jbGlwXCIsXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLFwiMXB4IHNvbGlkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWVycm9yXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIixcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIixcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIixcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIixcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZW1haWwtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIixcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5lbWFpbC1pbnB1dC1lcnJvci12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIixcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5lbWFpbC1pbnB1dC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIixcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIixcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZW1haWwtaW5wdXQtZXJyb3IgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIixcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZW1haWxFcnJvclwiLCBcImNsYXNzPWVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJJbnZhbGlkIGVtYWlsIGFkZHJlc3NcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9ZW1haWxJbnB1dFwiLCBcInR5cGU9dGV4dFwiLCBcImNsYXNzPWVtYWlsLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxuXG59Il0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkxvZ2dlciIsIkluamVjdGlvblBvaW50IiwiSW5saW5lQ29tcG9uZW50RmFjdG9yeSIsIlN0eWxlQWNjZXNzb3IiLCJDYW52YXNTdHlsZXMiLCJDb250YWluZXJBc3luYyIsIlRpbWVQcm9taXNlIiwiRXZlbnRNYW5hZ2VyIiwiU3R5bGVTZWxlY3RvckFjY2Vzc29yIiwiTWV0aG9kIiwiTGlzdCIsIk5hdmlnYXRpb24iLCJDYW52YXNSb290IiwiQ29udGFpbmVyRWxlbWVudFV0aWxzIiwiSFRNTCIsIklucHV0RWxlbWVudERhdGFCaW5kaW5nIiwiU3RhdGVNYW5hZ2VyIiwiTWFwIiwiTE9HIiwiTnVtYmVyVmFsaWRhdG9yIiwiUmVxdWlyZWRWYWxpZGF0b3IiLCJQYXNzd29yZFZhbGlkYXRvciIsIkVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yIiwiQW5kVmFsaWRhdG9yU2V0IiwiUHJvcGVydHlBY2Nlc3NvciIsIlBob25lVmFsaWRhdG9yIiwiVGV4dElucHV0IiwiRW1haWxWYWxpZGF0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sWUFBWSxDQUFD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
