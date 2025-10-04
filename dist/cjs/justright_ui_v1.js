'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var justright_core_v1 = require('justright_core_v1');
var coreutil_v1 = require('coreutil_v1');
var mindi_v1 = require('mindi_v1');
var containerbridge_v1 = require('containerbridge_v1');

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

	static COMPONENT_NAME = "BackShade";
	static TEMPLATE_URL = "/assets/justrightjs-ui/backShade.html";
    static STYLES_URL = "/assets/justrightjs-ui/backShade.css";

    /**
     * 
     */
    constructor(backShadeListeners = new BackShadeListeners()){

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {BaseElement} */
        this.container = null;

        /** @type {BackShadeListeners} */
        this.backShadeListeners = backShadeListeners;

        this.hidden = true;
	}

    postConfig() {
        this.component = this.componentFactory.create(BackShade.COMPONENT_NAME);
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
                justright_core_v1.CanvasStyles.disableStyle(BackShade.COMPONENT_NAME, this.component.componentIndex);
            }
        );
        return Promise.all([hidePromise, disableStylePromise]);
    }

    show() {
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        justright_core_v1.CanvasStyles.enableStyle(BackShade.COMPONENT_NAME, this.component.componentIndex);
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

	static COMPONENT_NAME = "Background";
	static TEMPLATE_URL = "/assets/justrightjs-ui/background.html";
	static STYLES_URL = "/assets/justrightjs-ui/background.css";

    constructor(backgroundImagePath){
		/** @type {ComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {string} */
		this.backgroundImagePath = backgroundImagePath;
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(Background.COMPONENT_NAME);
		if (this.backgroundImagePath) {
            justright_core_v1.Style.from(this.component.get("background"))
                .set("background-image", "url(\"" + this.backgroundImagePath + "\")");
		}
		justright_core_v1.CanvasStyles.enableStyle(Background.COMPONENT_NAME);
	}

}

new coreutil_v1.Logger("BackgroundVideo");

class BackgroundVideo {

	static COMPONENT_NAME = "BackgroundVideo";
	static TEMPLATE_URL = "/assets/justrightjs-ui/backgroundVideo.html";
	static STYLES_URL = "/assets/justrightjs-ui/backgroundVideo.css";

    constructor(videoSrc){

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

		/** @type {Component} */
		this.component = null;

        /** @type {String} */
        this.videoSrc = videoSrc;
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(BackgroundVideo.COMPONENT_NAME);
		justright_core_v1.CanvasStyles.enableStyle(BackgroundVideo.COMPONENT_NAME);

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

	static get COMPONENT_NAME() { return "BannerLabelMessage"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/bannerLabelMessage.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/bannerLabelMessage.css"; }

    static get EVENT_CLOSE_CLICKED() { return "closeClicked"; }

    static get TYPE_ALERT() { return "type-alert"; }
    static get TYPE_INFO() { return "type-info"; }
    static get TYPE_SUCCESS() { return "type-success"; }
    static get TYPE_WARNING() { return "type-warning"; }

    constructor(message, bannerType = BannerLabelMessage.TYPE_INFO, customAppearance = null) {

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    async postConfig() {
        this.component = this.componentFactory.create(BannerLabelMessage.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(BannerLabelMessage.COMPONENT_NAME);
        justright_core_v1.CSS.from(this.messageContentElement)
            .enable("banner-label-message")
            .enable("banner-label-message-" + this.bannerType);

        if (this.customAppearance && this.customAppearance.shape) {
            justright_core_v1.CSS.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.shape);
        }
        if (this.customAppearance && this.customAppearance.size) {
            justright_core_v1.CSS.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.size);
        }
        if (this.customAppearance && this.customAppearance.spacing) {
            justright_core_v1.CSS.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.spacing);
        }

        this.component.get("bannerLabelMessageCloseButton").listenTo("click", new coreutil_v1.Method(this, this.closeClicked));
    }

    closeClicked(event) {
        this.eventManager.trigger(BannerLabelMessage.EVENT_CLOSE_CLICKED);
    }

    hide() {
        justright_core_v1.CSS.from(this.messageContentElement)
            .disable("banner-label-message-visible")
            .enable("banner-label-message-hidden");

        this.isVisible = false;
        
        coreutil_v1.TimePromise.asPromise(500, () => {
            if (!this.isVisible) {
                justright_core_v1.Style.from(this.component.get("bannerLabelMessage"))
                    .set("display", "none");
            }
        });
    }

    show() {
        justright_core_v1.Style.from(this.component.get("bannerLabelMessage"))
            .set("display", "block");

        coreutil_v1.TimePromise.asPromise(50, () => {
            if (this.isVisible) {
                justright_core_v1.CSS.from(this.messageContentElement)
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

	static COMPONENT_NAME = "BannerLabel";
    static TEMPLATE_URL = "/assets/justrightjs-ui/bannerLabel.html";
    static STYLES_URL = "/assets/justrightjs-ui/bannerLabel.css";

    constructor() {
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    async postConfig() {
        this.component = this.componentFactory.create(BannerLabel.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(BannerLabel.COMPONENT_NAME);
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

new coreutil_v1.Logger("BannerMessage");

class BannerMessage {

	static COMPONENT_NAME = "BannerMessage";
    static TEMPLATE_URL = "/assets/justrightjs-ui/bannerMessage.html";
    static STYLES_URL = "/assets/justrightjs-ui/bannerMessage.css";

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

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    postConfig() {
        this.component = this.componentFactory.create("BannerMessage");
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
            justright_core_v1.CanvasStyles.disableStyle(BannerMessage.COMPONENT_NAME, this.component.componentIndex);
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
        justright_core_v1.CanvasStyles.enableStyle(BannerMessage.COMPONENT_NAME, this.component.componentIndex);
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

	static COMPONENT_NAME = "DialogBox";
    static TEMPLATE_URL = "/assets/justrightjs-ui/dialogBox.html";
    static STYLES_URL = "/assets/justrightjs-ui/dialogBox.css";
    
    static OPTION_BACK_ON_CLOSE = 1;

    /**
     * 
     */
    constructor(defaultOptions = []){

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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
    
    postConfig() {
        this.component = this.componentFactory.create(DialogBox.COMPONENT_NAME);
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
                justright_core_v1.CanvasStyles.disableStyle(DialogBox.COMPONENT_NAME, this.component.componentIndex);
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
        justright_core_v1.CanvasStyles.enableStyle(DialogBox.COMPONENT_NAME, this.component.componentIndex);
        this.backShade.show();
        this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-block");
        justright_core_v1.CanvasRoot.mouseDownElement = this.component.get("dialogBoxContent");
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

new coreutil_v1.Logger("DropDownPanel");

class DropDownPanel {

	static COMPONENT_NAME = "DropDownPanel";
    static TEMPLATE_URL = "/assets/justrightjs-ui/dropDownPanel.html";
    static STYLES_URL = "/assets/justrightjs-ui/dropDownPanel.css";

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

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    postConfig() {
        this.component = this.componentFactory.create(DropDownPanel.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(DropDownPanel.COMPONENT_NAME);
        this.component.get("button").setChild(justright_core_v1.HTML.i("", this.iconClass));

        justright_core_v1.CSS.from(this.component.get("button"))
            .enable(DropDownPanel.BUTTON)
            .enable(this.type);

        justright_core_v1.CSS.from(this.component.get("content"))
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
        if (!justright_core_v1.Style.from(this.component.get("arrow")).is("display","block")) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        justright_core_v1.CSS.from(this.component.get("content"))
            .disable(DropDownPanel.CONTENT_HIDDEN)
            .enable(DropDownPanel.CONTENT_VISIBLE);
        justright_core_v1.Style.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").containerElement.focus();
    }

    hide() {
        justright_core_v1.CSS.from(this.component.get("content"))
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

new coreutil_v1.Logger("PopUpPanel");

class PopUpPanel {

	static COMPONENT_NAME = "PopUpPanel";
    static TEMPLATE_URL = "/assets/justrightjs-ui/popUpPanel.html";
    static STYLES_URL = "/assets/justrightjs-ui/popUpPanel.css";

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

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    postConfig() {
        this.component = this.componentFactory.create(PopUpPanel.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(PopUpPanel.COMPONENT_NAME);
        this.component.get("button").setChild(justright_core_v1.HTML.i("", this.iconClass));

        justright_core_v1.CSS.from(this.component.get("button"))
            .enable(PopUpPanel.BUTTON)
            .enable(this.type);

        justright_core_v1.CSS.from(this.component.get("content"))
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
        if (!justright_core_v1.Style.from(this.component.get("arrow")).is("display","block")) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        justright_core_v1.CSS.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_HIDDEN)
            .enable(PopUpPanel.CONTENT_VISIBLE);
        justright_core_v1.Style.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").element.focus();
    }

    hide() {
        justright_core_v1.CSS.from(this.component.get("content"))
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

new coreutil_v1.Logger("CommonInput");

class CommonInput {

    static EVENT_CLICKED = CommonEvents.CLICKED;
    static EVENT_ENTERED = CommonEvents.ENTERED;
    static EVENT_KEYUPPED = CommonEvents.KEYUPPED;
    static EVENT_CHANGED = CommonEvents.CHANGED;
    static EVENT_BLURRED = CommonEvents.BLURRED;

    /**
     * 
     * @param {string} componentName
     * @param {string} name
     * @param {object} model
     * @param {AbstractValidator} validator
     * @param {string} placeholder
     * @param {string} inputElementId
     * @param {string} errorElementId
     */
    constructor(componentName,
        name,
        model = null,
        validator = null, 
        placeholder = null,
        inputElementId = null,
        errorElementId = null) {


        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {AbstractValidator} */
        this.validator = validator;

        /** @type {string} */
        this.componentName = componentName;

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
        this.component = this.componentFactory.create(this.componentName);

        justright_core_v1.CanvasStyles.enableStyle(this.componentName, this.component.componentIndex);

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

new coreutil_v1.Logger("Panel");

class Panel {

	static COMPONENT_NAME = "Panel";
    static TEMPLATE_URL = "/assets/justrightjs-ui/panel.html";
    static STYLES_URL = "/assets/justrightjs-ui/panel.css";

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

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    postConfig() {
        this.component = this.componentFactory.create(Panel.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(Panel.COMPONENT_NAME);

        justright_core_v1.CSS.from(this.component.get("panel"))
            .enable(this.type)
            .enable(this.contentAlign)
            .enable(this.size);
    }

}

new coreutil_v1.Logger("LinePanelEntry");

class LinePanelEntry {

	static COMPONENT_NAME = "LinePanelEntry";
	static TEMPLATE_URL = "/assets/justrightjs-ui/linePanelEntry.html";
	static STYLES_URL = "/assets/justrightjs-ui/linePanelEntry.css";

    constructor() {

		/** @type {ComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

		/** @type {Component} */
		this.component = null;

    }

    async postConfig() {
		this.component = this.componentFactory.create(LinePanelEntry.COMPONENT_NAME);
		justright_core_v1.CanvasStyles.enableStyle(LinePanelEntry.COMPONENT_NAME);
    }


}

new coreutil_v1.Logger("LinePanel");

class LinePanel {

	static COMPONENT_NAME = "LinePanel";
	static TEMPLATE_URL = "/assets/justrightjs-ui/linePanel.html";
	static STYLES_URL = "/assets/justrightjs-ui/linePanel.css";

	static EVENT_REFRESH_CLICKED = "refreshClicked";
	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static RECORDS_STATE_UPDATE_REQUESTED = "recordsStateUpdateRequested";

	/**
	 * 
	 * @param {Panel} buttonPanel 
	 */
	constructor(buttonPanel = null) {

		/** @type {ComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);
		
		/** @type {Component} */
		this.component = null;

		/** @type {EventManager} */
		this.eventManager = new justright_core_v1.EventManager();

		/** @type {Provider<LinePanelEntry>} */
		this.linePanelEntryProvider = mindi_v1.InjectionPoint.provider(LinePanelEntry);

		/** @type {Provider<Panel>} */
		this.panelProvider = mindi_v1.InjectionPoint.provider(Panel);

        /** @type {StateManager<any[]>} */
        this.arrayState = mindi_v1.InjectionPoint.instance(justright_core_v1.StateManager);

		/** @type {Panel} */
		this.buttonPanel = buttonPanel;

	}

	async postConfig() {
		this.component = this.componentFactory.create(LinePanel.COMPONENT_NAME);
		justright_core_v1.CanvasStyles.enableStyle(LinePanel.COMPONENT_NAME);

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

new coreutil_v1.Logger("LinkPanel");

class LinkPanel {

	static COMPONENT_NAME = "LinkPanel";
    static TEMPLATE_URL = "/assets/justrightjs-ui/linkPanel.html";
    static STYLES_URL = "/assets/justrightjs-ui/linkPanel.css";

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

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    /** @type {EventManager<LinkPanel>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create(LinkPanel.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(LinkPanel.COMPONENT_NAME);
        
        justright_core_v1.CSS.from(this.component.get("link"))
            .enable(this.size)
            .enable(this.orientation)
            .enable(this.theme);

        if (this.label) {
            this.component.get("label").setChild(this.label);
        } else {
            this.component.get("label").remove();
        }

        if (this.icon) {
            justright_core_v1.CSS.from(this.component.get("icon"))
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

class SlideDeckEntry {

    static COMPONENT_NAME = "SlideDeckEntry";
    static TEMPLATE_URL = "/assets/justrightjs-ui/slideDeckEntry.html";
    static STYLES_URL = "/assets/justrightjs-ui/slideDeckEntry.css";

    static DEFAULT_CLASS = "slide-deck-entry";

    static ENTRY_POSITION_FRONT = "position-front";
    static ENTRY_POSITION_BEHIND = "position-behind";
    static ENTRY_POSITION_RIGHT = "position-right";

    static CONTENT_EXISTANCE_PRESENT = "existance-present";
    static CONTENT_EXISTANCE_REMOVED = "existance-removed";

    constructor() {
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Number} */
        this.index = 0;

        /** @type {String} */
        this.position = SlideDeckEntry.ENTRY_POSITION_FRONT;
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
        this.component = this.componentFactory.create(SlideDeckEntry.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(SlideDeckEntry.COMPONENT_NAME);
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
        justright_core_v1.CSS.from(this.contentElement).replace("existance-", contentVisibility);
    }

    setShift(position) {
        this.position = position;
        justright_core_v1.CSS.from(this.entryElement).replace("position-", position);
    }

}

class SlideDeck {

    static COMPONENT_NAME = "SlideDeck";
    static TEMPLATE_URL = "/assets/justrightjs-ui/slideDeck.html";
    static STYLES_URL = "/assets/justrightjs-ui/slideDeck.css";

    static EVENT_ENTRY_CHANGED = "eventEntryChanged";

    /**
     * 
     * @param {Map<Component>} componentMap 
     */
    constructor(componentMap) {

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeck.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(SlideDeck.COMPONENT_NAME);

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

    static COMPONENT_NAME = "RadioToggleIcon";
    static TEMPLATE_URL = "/assets/justrightjs-ui/radioToggleIcon.html";
    static STYLES_URL = "/assets/justrightjs-ui/radioToggleIcon.css";
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * @param {object} model
     */
    constructor(name = "?", model = null, icon = "fas fa-question", label = null) {

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    postConfig() {
        this.component = this.componentFactory.create(RadioToggleIcon.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(RadioToggleIcon.COMPONENT_NAME);

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

        this.component.get("radio").listenTo("change", new coreutil_v1.Method(this, this.clicked));

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

	static COMPONENT_NAME = "ToggleIcon";
    static TEMPLATE_URL = "/assets/justrightjs-ui/toggleIcon.html";
    static STYLES_URL = "/assets/justrightjs-ui/toggleIcon.css";

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

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    /** @type {EventManager<ToggleIcon>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create("ToggleIcon");
        justright_core_v1.CanvasStyles.enableStyle(ToggleIcon.COMPONENT_NAME);

        const checkbox = this.component.get("checkbox");
        checkbox.setAttributeValue("name", this.name);
        checkbox.listenTo("change", new coreutil_v1.Method(this, this.clicked));

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
    clicked(event) {
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

	static COMPONENT_NAME = "TreePanelEntry";
	static TEMPLATE_URL = "/assets/justrightjs-ui/treePanelEntry.html";
	static STYLES_URL = "/assets/justrightjs-ui/treePanelEntry.css";

	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";
	static EVENT_EXPAND_TOGGLE_OVERRIDE = "expandToggleOverride";

    constructor(record = null) {

		/** @type {ComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {Provider<Panel>} */
		this.panelProvider = mindi_v1.InjectionPoint.provider(Panel);

		/** @type {EventManager} */
		this.eventManager = new justright_core_v1.EventManager();

        /** @type {StateManager<any[]>} */
        this.arrayState = mindi_v1.InjectionPoint.instance(justright_core_v1.StateManager);

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvider = mindi_v1.InjectionPoint.provider(TreePanelEntry);

		/** @type {ToggleIcon} */
		this.expandToggle = mindi_v1.InjectionPoint.instance(ToggleIcon);

        /** @type {any} */
        this.record = record;
    }

    async postConfig() {
		this.component = this.componentFactory.create(TreePanelEntry.COMPONENT_NAME);
		justright_core_v1.CanvasStyles.enableStyle(TreePanelEntry.COMPONENT_NAME);

		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_ENABLED, new coreutil_v1.Method(this, this.loadSubRecordsClicked));
		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_DISABLED, new coreutil_v1.Method(this, this.hideSubRecordsClicked));

		this.component.setChild("expandButton", this.expandToggle.component);

        this.arrayState.react(new coreutil_v1.Method(this, this.handleArrayState));

    }

	/**
	 * @returns { EventManager }
	 */
	get events() { return this.eventManager; }

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

		this.component.setChild("subrecordElements", panel.component);
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

	static COMPONENT_NAME = "TreePanel";
	static TEMPLATE_URL = "/assets/justrightjs-ui/treePanel.html";
	static STYLES_URL = "/assets/justrightjs-ui/treePanel.css";

	static EVENT_REFRESH_CLICKED = "refreshClicked";
	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";
	static EVENT_EXPAND_TOGGLE_OVERRIDE = "expandToggleOverride";

	/**
	 * 
	 * @param {Panel} buttonPanel 
	 */
	constructor(buttonPanel = null) {

		/** @type {ComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);
		
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

	async postConfig() {
		this.component = this.componentFactory.create(TreePanel.COMPONENT_NAME);
		justright_core_v1.CanvasStyles.enableStyle(TreePanel.COMPONENT_NAME);

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

	static COMPONENT_NAME = "Button";
    static TEMPLATE_URL = "/assets/justrightjs-ui/button.html";
    static STYLES_URL = "/assets/justrightjs-ui/button.css";

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

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    /** @type {EventManager<Button>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create("Button");
        justright_core_v1.CanvasStyles.enableStyle(Button.COMPONENT_NAME);
        if (this.iconClass) {
            this.component.get("button").addChild(justright_core_v1.HTML.i("", this.iconClass));
        }
        if (this.label) {
            this.component.get("button").addChild(this.label);
        }

        justright_core_v1.CSS.from(this.component.get("button"))
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
        justright_core_v1.CSS.from(this.component.get("spinnerContainer"))
            .disable(Button.SPINNER_HIDDEN)
            .enable(Button.SPINNER_VISIBLE);
    }

    disableLoading() {
        justright_core_v1.CSS.from(this.component.get("spinnerContainer"))
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

	static COMPONENT_NAME = "CheckBox";
    static TEMPLATE_URL = "/assets/justrightjs-ui/checkBox.html";
    static STYLES_URL = "/assets/justrightjs-ui/checkBox.css";
    /**
     * 
     * @param {string} name 
     * @param {object} model
     */
    constructor(name, model = null) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

    }

    postConfig() {
        this.component = this.componentFactory.create(CheckBox.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(CheckBox.COMPONENT_NAME);
        this.component.get("checkBox").setAttributeValue("name",this.name);

        if(this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("checkBox"));
        }
    }

}

new coreutil_v1.Logger("EmailInput");

class EmailInput extends CommonInput {

    static COMPONENT_NAME = "EmailInput";
    static TEMPLATE_URL = "/assets/justrightjs-ui/emailInput.html";
    static STYLES_URL = "/assets/justrightjs-ui/emailInput.css";

    static DEFAULT_PLACEHOLDER = "Email";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(EmailInput.COMPONENT_NAME,
            name,
            model,
            new justright_core_v1.EmailValidator(mandatory, !mandatory),
            placeholder,
            "emailInput",
            "emailError");
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-hidden"); }

}

class FileUploadEntry {
    
    static COMPONENT_NAME = "FileUploadEntry"
    static TEMPLATE_URL = "/assets/justrightjs-ui/fileUploadEntry.html"
    static STYLES_URL = "/assets/justrightjs-ui/fileUploadEntry.css"
    
    static EVENT_REMOVE_CLICKED = "removeClicked";

    /**
     * 
     * @param {ContainerFileData} file 
     */
    constructor(file) {

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);
        
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
    
    async postConfig() {
        this.component = this.componentFactory.create(FileUploadEntry.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(FileUploadEntry.COMPONENT_NAME);
        
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
        }
    }
}

new coreutil_v1.Logger("FileUpload");

class FileUpload {

	static COMPONENT_NAME = "FileUpload";
	static TEMPLATE_URL = "/assets/justrightjs-ui/fileUpload.html";
	static STYLES_URL = "/assets/justrightjs-ui/fileUpload.css";

	static DEFAULT_PLACEHOLDER = "FileUpload";

	static EVENT_CLICKED = CommonEvents.CLICKED;
    static EVENT_FILE_ADDED = "fileAdded";
    static EVENT_FILE_REMOVED = "fileRemoved";

    /**
     * 
     * @param {string} name 
     * @param {boolean} multiple
     * @param {Array<string>} fileTypeArray
     */
    constructor(name, multiple = false, fileTypeArray = []) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    postConfig() {
        this.component = this.componentFactory.create(FileUpload.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(FileUpload.COMPONENT_NAME);

        
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
                this.fileArrayState.update(file, file.name);
                if (this.multiple === false) {
                    break;
                }
            }
        }

        // Show unsupported files
        this.showUnsupportedFiles(unsupportedFiles);
        await this.updateFileList();
        for (const file of this.fileArrayState.objectMap.values()) {
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
        justright_core_v1.CSS.from(uploadBox).enable("file-upload-box-dragover");
    }

    /**
     * @param {ContainerEvent} event
     */
    dragLeave(event) {
        event.preventDefault();
        event.stopPropagation();

        const uploadBox = this.component.get("uploadBox");
        justright_core_v1.CSS.from(uploadBox).disable("file-upload-box-dragover");
    }

    /**
     *  @param {ContainerEvent} event
     */
    fileDropped(event) {
        event.preventDefault();
        event.stopPropagation();

        const uploadBox = this.component.get("uploadBox");
        justright_core_v1.CSS.from(uploadBox).disable("file-upload-box-dragover");

        this.processFiles(event.files);
    }

    async updateFileList() {
        const fileList = this.component.get("fileList");
        fileList.clear();
        
        for (const file of this.fileArrayState.objectMap.values()) {
            const fileEntry = await this.fileUploadEntryProvider.get([file]);
            fileEntry.events.listenTo(FileUploadEntry.EVENT_REMOVE_CLICKED, new coreutil_v1.Method(this, this.removeFileEntry, [fileEntry]));
            this.fileArrayState.reactTo(file.name, new coreutil_v1.Method(fileEntry, fileEntry.updateProgress));
            fileList.addChild(fileEntry.component);
        }
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
    }

    clicked(event) {
        this.events.trigger(FileUpload.EVENT_CLICKED, [event]);
    }

    focus() {

    }
}

new coreutil_v1.Logger("HiddenInput");

class HiddenInput extends CommonInput {

    static COMPONENT_NAME = "HiddenInput";
    static TEMPLATE_URL = "/assets/justrightjs-ui/hiddenInput.html";
    static STYLES_URL = "/assets/justrightjs-ui/hiddenInput.css";


    /**
     * 
     * @param {string} name
     * @param {object} model
     */
    constructor(name, model = null) {

        super(HiddenInput.COMPONENT_NAME,
            name,
            model,
            null,
            null,
            "hiddenInput");
    }
}

new coreutil_v1.Logger("TextInput");

class NumberInput extends CommonInput {

    static COMPONENT_NAME = "NumberInput";
    static TEMPLATE_URL = "/assets/justrightjs-ui/numberInput.html";
    static STYLES_URL = "/assets/justrightjs-ui/numberInput.css";

    static DEFAULT_PLACEHOLDER = "Number";


    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = NumberInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(NumberInput.COMPONENT_NAME,
            name,
            model,
            new justright_core_v1.NumberValidator(mandatory, !mandatory),
            placeholder,
            "numberInput",
            "numberError");
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "number-input-error number-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "number-input-error number-input-error-hidden"); }
}

new coreutil_v1.Logger("PasswordInput");

class PasswordInput extends CommonInput {
    
    static COMPONENT_NAME = "PasswordInput";
    static TEMPLATE_URL = "/assets/justrightjs-ui/passwordInput.html";
    static STYLES_URL = "/assets/justrightjs-ui/passwordInput.css";

    static DEFAULT_PLACEHOLDER = "Password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordInput.COMPONENT_NAME,
            name,
            model,
            new justright_core_v1.RequiredValidator(!mandatory),
            placeholder,
            "passwordInput",
            "passwordError");
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-hidden"); }
}

new coreutil_v1.Logger("PasswordMatcherInputValue");

class PasswordMatcherInputValue extends CommonInput {
    
    static COMPONENT_NAME = "PasswordMatcherInputValue";
    static TEMPLATE_URL = "/assets/justrightjs-ui/passwordMatcherInputValue.html";
    static STYLES_URL = "/assets/justrightjs-ui/passwordMatcherInputValue.css";

    static DEFAULT_PLACEHOLDER = "New password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordMatcherInputValue.COMPONENT_NAME,
            name,
            model,
            new justright_core_v1.PasswordValidator(mandatory),
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError");
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-value-error password-matcher-input-value-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-value-error password-matcher-input-value-error-hidden"); }
}

new coreutil_v1.Logger("PasswordMatcherInputControl");

class PasswordMatcherInputControl extends CommonInput {
    
    static COMPONENT_NAME = "PasswordMatcherInputControl";
    static TEMPLATE_URL = "/assets/justrightjs-ui/passwordMatcherInputControl.html";
    static STYLES_URL = "/assets/justrightjs-ui/passwordMatcherInputControl.css";

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

        super(PasswordMatcherInputControl.COMPONENT_NAME,
            name,
            model,
            new justright_core_v1.EqualsPropertyValidator(mandatory, false, model, modelComparedPropertyName),
            placeholder,
            "passwordMatcherInputControlField",
            "passwordMatcherInputControlError");
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

	static COMPONENT_NAME = "PasswordMatcherInput";
    static TEMPLATE_URL = "/assets/justrightjs-ui/passwordMatcherInput.html";
    static STYLES_URL = "/assets/justrightjs-ui/passwordMatcherInput.css";

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

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    async postConfig() {
        this.component = await this.componentFactory.create(PasswordMatcherInput.COMPONENT_NAME);

        justright_core_v1.CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

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

    static COMPONENT_NAME = "PhoneInput";
    static TEMPLATE_URL = "/assets/justrightjs-ui/phoneInput.html";
    static STYLES_URL = "/assets/justrightjs-ui/phoneInput.css";

    static DEFAULT_PLACEHOLDER = "Phone";
    
    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PhoneInput.COMPONENT_NAME,
            name,
            model,
            new justright_core_v1.PhoneValidator(mandatory, !mandatory),
            placeholder,
            "phoneInput",
            "phoneError");
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "phone-input-error phone-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "phone-input-error phone-input-error-hidden"); }
}

new coreutil_v1.Logger("RadioButton");

class RadioButton {

	static COMPONENT_NAME = "RadioButton";
    static TEMPLATE_URL = "/assets/justrightjs-ui/radioButton.html";
    static STYLES_URL = "/assets/justrightjs-ui/radioButton.css";
    
    static EVENT_CLICKED = CommonEvents.CLICKED;

    /**
     * 
     * @param {string} name 
     * @param {object} model
     */
    constructor(name, model = null) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

    }

    postConfig() {
        this.component = this.componentFactory.create(RadioButton.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(RadioButton.COMPONENT_NAME);
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

    static COMPONENT_NAME = "RadioToggleSwitch";
    static TEMPLATE_URL = "/assets/justrightjs-ui/radioToggleSwitch.html";
    static STYLES_URL = "/assets/justrightjs-ui/radioToggleSwitch.css";
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * 
     * @param {object} model
     */
    constructor(model = null) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventManager} */
        this.events = new justright_core_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.checked = false;

    }

    postConfig() {
        this.component = this.componentFactory.create(RadioToggleSwitch.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(RadioToggleSwitch.COMPONENT_NAME);

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

	static COMPONENT_NAME = "Select";
	static TEMPLATE_URL = "/assets/justrightjs-ui/select.html";
	static STYLES_URL = "/assets/justrightjs-ui/select.css";

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
        
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

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

    postConfig() {
        this.component = this.componentFactory.create(Select.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(Select.COMPONENT_NAME);

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

    static COMPONENT_NAME = "TextInput";
    static TEMPLATE_URL = "/assets/justrightjs-ui/textInput.html";
    static STYLES_URL = "/assets/justrightjs-ui/textInput.css";

    static DEFAULT_PLACEHOLDER = "Text";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput$1.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(TextInput$1.COMPONENT_NAME,
            name,
            model,
            new justright_core_v1.RequiredValidator(false, mandatory),
            placeholder,
            "textInput",
            "textError");
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
exports.CommonEvents = CommonEvents;
exports.CommonInput = CommonInput;
exports.CustomAppearance = CustomAppearance;
exports.Dependencies = Dependencies;
exports.DialogBox = DialogBox;
exports.DropDownPanel = DropDownPanel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGVwZW5kZW5jaWVzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrZ3JvdW5kVmlkZW8vYmFja2dyb3VuZFZpZGVvLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTGFiZWwvYmFubmVyTGFiZWxNZXNzYWdlL2Jhbm5lckxhYmVsTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTWVzc2FnZS9iYW5uZXJNZXNzYWdlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvY29tbW9uL2NvbW1vbkV2ZW50cy5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9kcm9wRG93blBhbmVsL2Ryb3BEb3duUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9kcm9wVXBQYW5lbC9wb3BVcFBhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvY29tbW9uSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9wYW5lbC9wYW5lbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2xpbmVQYW5lbC90cmVlUGFuZWxFbnRyeS9saW5lUGFuZWxFbnRyeS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2xpbmVQYW5lbC9saW5lUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9saW5rUGFuZWwvbGlua1BhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvc2xpZGVEZWNrL3NsaWRlRGVja0VudHJ5L3NsaWRlRGVja0VudHJ5LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvc2xpZGVEZWNrL3NsaWRlRGVjay5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3JhZGlvVG9nZ2xlSWNvbi9yYWRpb1RvZ2dsZUljb24uanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC90b2dnbGVJY29uL3RvZ2dsZUljb24uanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC90cmVlUGFuZWwvdHJlZVBhbmVsRW50cnkvdHJlZVBhbmVsRW50cnkuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC90cmVlUGFuZWwvdHJlZVBhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvYnV0dG9uL2J1dHRvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvZW1haWxJbnB1dC9lbWFpbElucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvZmlsZVVwbG9hZC9maWxlVXBsb2FkRW50cnkvZmlsZVVwbG9hZEVudHJ5LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvZmlsZVVwbG9hZC9maWxlVXBsb2FkLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvaGlkZGVuSW5wdXQvaGlkZGVuSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9udW1iZXJJbnB1dC9udW1iZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkSW5wdXQvcGFzc3dvcmRJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJNb2RlbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGhvbmVJbnB1dC9waG9uZUlucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcmFkaW9CdXR0b24vcmFkaW9CdXR0b24uanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9yYWRpb1RvZ2dsZVN3aXRjaC9yYWRpb1RvZ2dsZVN3aXRjaC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3NlbGVjdC9zZWxlY3QuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC90ZXh0SW5wdXQvdGV4dElucHV0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDdXN0b21BcHBlYXJhbmNlIHtcblxuICAgIHN0YXRpYyBTSVpFX0RFRkFVTCA9IFwic2l6ZS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNJWkVfU01BTEwgPSBcInNpemUtc21hbGxcIjtcbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcInNpemUtbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcInNpemUtbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBTSEFQRV9ERUFGVUxUID0gXCJzaGFwZS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNIQVBFX1JPVU5EID0gXCJzaGFwZS1yb3VuZFwiO1xuICAgIHN0YXRpYyBTSEFQRV9TUVVBUkUgPSBcInNoYXBlLXNxdWFyZVwiO1xuXG4gICAgc3RhdGljIFZJU0lCSUxJVFlfREVBRlVMVCA9IFwidmlzaWJpbGl0eS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFZJU0lCSUxJVFlfVklTSUJMRSA9IFwidmlzaWJpbGl0eS12aXNpYmxlXCI7XG4gICAgc3RhdGljIFZJU0lCSUxJVFlfSElEREVOID0gXCJ2aXNpYmlsaXR5LWhpZGRlblwiO1xuXG4gICAgc3RhdGljIFNQQUNJTkdfREVGQVVMVCA9IFwic3BhY2luZy1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNQQUNJTkdfTk9ORSA9IFwic3BhY2luZy1ub25lXCI7XG4gICAgc3RhdGljIFNQQUNJTkdfQUJPVkUgPSBcInNwYWNpbmctYWJvdmVcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19CRUxPVyA9IFwic3BhY2luZy1iZWxvd1wiO1xuICAgIHN0YXRpYyBTUEFDSU5HX0FCT1ZFX0JFTE9XID0gXCJzcGFjaW5nLWFib3ZlLWJlbG93XCI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zaXplID0gQ3VzdG9tQXBwZWFyYW5jZS5TSVpFX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBDdXN0b21BcHBlYXJhbmNlLlNIQVBFX0RFQUZVTFQ7XG4gICAgICAgIHRoaXMuc3BhY2luZyA9IEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19ERUZBVUxUO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSBDdXN0b21BcHBlYXJhbmNlLlZJU0lCSUxJVFlfREVBRlVMVDtcbiAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB3aXRoU2l6ZShzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTaGFwZShzaGFwZSkge1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTcGFjaW5nKHNwYWNpbmcpIHtcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gc3BhY2luZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFZpc2liaWxpdHkodmlzaWJpbGl0eSkge1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcblxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY2llcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRDbGFzcyA9IENvbXBvbmVudDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlTGlzdGVuZXJzIHtcblxuICAgIGNvbnN0cnVjdG9yKGV4aXN0aW5nTGlzdGVuZXJzID0gbnVsbCkge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgPSAoZXhpc3RpbmdMaXN0ZW5lcnMgJiYgZXhpc3RpbmdMaXN0ZW5lcnMuZ2V0QmFja2dyb3VuZENsaWNrZWQpID8gZXhpc3RpbmdMaXN0ZW5lcnMuZ2V0QmFja2dyb3VuZENsaWNrZWQoKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgXG4gICAgICovXG4gICAgd2l0aEJhY2tncm91bmRDbGlja2VkKGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyID0gYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBnZXRCYWNrZ3JvdW5kQ2xpY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBjYWxsQmFja2dyb3VuZENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyLCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNhbGxMaXN0ZW5lcihsaXN0ZW5lciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKG51bGwgIT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQmFzZUVsZW1lbnRcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQmFja1NoYWRlTGlzdGVuZXJzIH0gZnJvbSBcIi4vYmFja1NoYWRlTGlzdGVuZXJzLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGUge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiQmFja1NoYWRlXCI7XG5cdHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYWNrU2hhZGUuY3NzXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihiYWNrU2hhZGVMaXN0ZW5lcnMgPSBuZXcgQmFja1NoYWRlTGlzdGVuZXJzKCkpe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0Jhc2VFbGVtZW50fSAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtCYWNrU2hhZGVMaXN0ZW5lcnN9ICovXG4gICAgICAgIHRoaXMuYmFja1NoYWRlTGlzdGVuZXJzID0gYmFja1NoYWRlTGlzdGVuZXJzO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblx0fVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSk7XG4gICAgfVxuXG4gICAgaGlkZUFmdGVyKG1pbGxpU2Vjb25kcykge1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7cmVzb2x2ZSgpO30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGVcIik7XG4gICAgICAgIGNvbnN0IGhpZGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKG1pbGxpU2Vjb25kcyxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGlzYWJsZVN0eWxlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZShtaWxsaVNlY29uZHMgKyAxLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2VdKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsXG4gICAgICAgICAgICAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlIHNob3dcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5LCBDYW52YXNTdHlsZXMsIFN0eWxlIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrZ3JvdW5kXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZCB7XG5cblx0c3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJCYWNrZ3JvdW5kXCI7XG5cdHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja2dyb3VuZC5odG1sXCI7XG5cdHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tncm91bmQuY3NzXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihiYWNrZ3JvdW5kSW1hZ2VQYXRoKXtcblx0XHQvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge3N0cmluZ30gKi9cblx0XHR0aGlzLmJhY2tncm91bmRJbWFnZVBhdGggPSBiYWNrZ3JvdW5kSW1hZ2VQYXRoO1xuXHR9XG5cblx0c2V0KGtleSx2YWwpIHtcblx0XHR0aGlzLmNvbXBvbmVudC5zZXQoa2V5LHZhbCk7XG5cdH1cblxuXHRwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYWNrZ3JvdW5kLkNPTVBPTkVOVF9OQU1FKTtcblx0XHRpZiAodGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoKSB7XG4gICAgICAgICAgICBTdHlsZS5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJhY2tncm91bmRcIikpXG4gICAgICAgICAgICAgICAgLnNldChcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoXFxcIlwiICsgdGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoICsgXCJcXFwiKVwiKTtcblx0XHR9XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmQuQ09NUE9ORU5UX05BTUUpO1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBWaWRlb0VsZW1lbnQsIENhbnZhc1N0eWxlcywgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb250YWluZXJBc3luYyB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIlxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja2dyb3VuZFZpZGVvXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZFZpZGVvIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkJhY2tncm91bmRWaWRlb1wiO1xuXHRzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tncm91bmRWaWRlby5odG1sXCI7XG5cdHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tncm91bmRWaWRlby5jc3NcIjtcblxuICAgIGNvbnN0cnVjdG9yKHZpZGVvU3JjKXtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnZpZGVvU3JjID0gdmlkZW9TcmM7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmRWaWRlby5DT01QT05FTlRfTkFNRSk7XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmRWaWRlby5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwic291cmNlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwic3JjXCIsIHRoaXMudmlkZW9TcmMpO1xuXHR9XG5cblx0YXN5bmMgcGxheU11dGVkKCkge1xuXHRcdGF3YWl0IENvbnRhaW5lckFzeW5jLnBhdXNlKDEwMCk7XG5cdFx0LyoqIEB0eXBlIHtWaWRlb0VsZW1lbnR9ICovXG5cdFx0Y29uc3QgdmlkZW8gPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ2aWRlb1wiKTtcblx0XHR2aWRlby5wbGF5TXV0ZWQoKTtcblx0fVxuXG59IiwiaW1wb3J0IHsgTWV0aG9kLCBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnRGYWN0b3J5LCBDU1MsIEV2ZW50TWFuYWdlciwgU3R5bGUgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uLy4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJhbm5lckxhYmVsTWVzc2FnZSB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFubmVyTGFiZWxNZXNzYWdlXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJMYWJlbE1lc3NhZ2UuaHRtbFwiOyB9XG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lckxhYmVsTWVzc2FnZS5jc3NcIjsgfVxuXG4gICAgc3RhdGljIGdldCBFVkVOVF9DTE9TRV9DTElDS0VEKCkgeyByZXR1cm4gXCJjbG9zZUNsaWNrZWRcIjsgfVxuXG4gICAgc3RhdGljIGdldCBUWVBFX0FMRVJUKCkgeyByZXR1cm4gXCJ0eXBlLWFsZXJ0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpIHsgcmV0dXJuIFwidHlwZS1pbmZvXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfU1VDQ0VTUygpIHsgcmV0dXJuIFwidHlwZS1zdWNjZXNzXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwidHlwZS13YXJuaW5nXCI7IH1cblxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGJhbm5lclR5cGUgPSBCYW5uZXJMYWJlbE1lc3NhZ2UuVFlQRV9JTkZPLCBjdXN0b21BcHBlYXJhbmNlID0gbnVsbCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmJhbm5lclR5cGUgPSBiYW5uZXJUeXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lckxhYmVsTWVzc2FnZS5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYW5uZXJMYWJlbE1lc3NhZ2UuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDU1MuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5iYW5uZXJUeXBlKTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZSkge1xuICAgICAgICAgICAgQ1NTLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICBDU1MuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZSAmJiB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZykge1xuICAgICAgICAgICAgQ1NTLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNwYWNpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlQ2xvc2VCdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xvc2VDbGlja2VkKSk7XG4gICAgfVxuXG4gICAgY2xvc2VDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIENTUy5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgLmRpc2FibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgU3R5bGUuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VcIikpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgU3R5bGUuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VcIikpXG4gICAgICAgICAgICAuc2V0KFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuXG4gICAgICAgIFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgQ1NTLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5kaXNhYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldCBtZXNzYWdlQ29udGVudEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VDb250ZW50XCIpO1xuICAgIH1cblxuICAgIHNldE1lc3NhZ2UoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlIZWFkZXIoaGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZUhlYWRlclwiKS5zZXRDaGlsZCh0aGlzLmhlYWRlcik7XG4gICAgfVxuXG4gICAgYXBwbHlNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlVGV4dFwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cblxufSIsImltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5pbXBvcnQgeyBCYW5uZXJMYWJlbE1lc3NhZ2UgfSBmcm9tIFwiLi9iYW5uZXJMYWJlbE1lc3NhZ2UvYmFubmVyTGFiZWxNZXNzYWdlLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJMYWJlbCB7XG5cblx0c3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJCYW5uZXJMYWJlbFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFubmVyTGFiZWwuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lckxhYmVsLmNzc1wiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdHRoaXMuYXBwZWFyYW5jZSA9IG5ldyBDdXN0b21BcHBlYXJhbmNlKClcblx0XHRcdC53aXRoU2l6ZShDdXN0b21BcHBlYXJhbmNlLlNJWkVfU01BTEwpXG5cdFx0XHQud2l0aFNoYXBlKEN1c3RvbUFwcGVhcmFuY2UuU0hBUEVfUk9VTkQpXG5cdFx0XHQud2l0aFNwYWNpbmcoQ3VzdG9tQXBwZWFyYW5jZS5TUEFDSU5HX0JFTE9XKTtcblxuXHRcdC8qKiBAdHlwZSB7QmFubmVyTGFiZWxNZXNzYWdlfSAqL1xuXHRcdHRoaXMuc3VjY2VzcyA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfU1VDQ0VTUywgdGhpcy5hcHBlYXJhbmNlXSk7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsTWVzc2FnZX0gKi9cblx0XHR0aGlzLndhcm5pbmcgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX1dBUk5JTkcsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG5cdFx0LyoqIEB0eXBlIHtCYW5uZXJMYWJlbE1lc3NhZ2V9ICovXG5cdFx0dGhpcy5lcnJvciA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfQUxFUlQsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lckxhYmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lckxhYmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5zdWNjZXNzLmhpZGUoKTtcbiAgICAgICAgdGhpcy53YXJuaW5nLmhpZGUoKTtcbiAgICAgICAgdGhpcy5lcnJvci5oaWRlKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLmFkZENoaWxkKHRoaXMuc3VjY2Vzcy5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5hZGRDaGlsZCh0aGlzLndhcm5pbmcuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuYWRkQ2hpbGQodGhpcy5lcnJvci5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSkpO1xuICAgICAgICB0aGlzLndhcm5pbmcuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSkpO1xuICAgICAgICB0aGlzLmVycm9yLmV2ZW50TWFuYWdlci5saXN0ZW5UbyhCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpKTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLnN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzaG93U3VjY2VzcyhoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93QmFubmVyKHRoaXMuc3VjY2VzcywgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIHNob3dXYXJuaW5nKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy53YXJuaW5nLCBoZWFkZXIsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgc2hvd0Vycm9yKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy5lcnJvciwgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIGhpZGUoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhbm5lci1sYWJlbCBiYW5uZXItbGFiZWwtaGlkZGVuXCIpO1xuICAgICAgICB0aGlzLmFjdGl2ZS5oaWRlKCk7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCYW5uZXJMYWJlbE1lc3NhZ2V9IGJhbm5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqL1xuICAgICBzaG93QmFubmVyKGJhbm5lciwgaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXHRcdGJhbm5lci5zZXRNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSk7XG4gICAgICAgIGJhbm5lci5zaG93KCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYW5uZXItbGFiZWwgYmFubmVyLWxhYmVsLXZpc2libGVcIik7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcblx0XHR0aGlzLmFjdGl2ZSA9IGJhbm5lcjtcbiAgICB9XG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnRcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhbm5lck1lc3NhZ2VcIik7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJNZXNzYWdlIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkJhbm5lck1lc3NhZ2VcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lck1lc3NhZ2UuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lck1lc3NhZ2UuY3NzXCI7XG5cbiAgICBzdGF0aWMgVFlQRV9BTEVSVCA9IFwidHlwZS1hbGVydFwiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcInR5cGUtaW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcInR5cGUtc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcInR5cGUtd2FybmluZ1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhbm5lclR5cGUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjbG9zZWFibGUgXG4gICAgICogQHBhcmFtIHtDdXN0b21BcHBlYXJhbmNlfSBjdXN0b21BcHBlYXJhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lck1lc3NhZ2UuVFlQRV9JTkZPLCBjbG9zZWFibGUgPSBmYWxzZSwgY3VzdG9tQXBwZWFyYW5jZSA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYW5uZXJUeXBlID0gYmFubmVyVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge01ldGhvZH0gKi9cbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkJhbm5lck1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQoXCJBbGVydFwiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZU1lc3NhZ2VcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBmYWRlXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsdGhpcy5oaWRlKSk7XG4gICAgfVxuXG4gICAgYXBwbHlDbGFzc2VzKGJhc2VDbGFzc2VzKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gYmFzZUNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmJhbm5lclR5cGU7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLGNsYXNzZXMpO1xuICAgIH1cbiAgICBcbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGNsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25IaWRlTGlzdGVuZXIgXG4gICAgICovXG4gICAgb25IaWRlKG9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBvbkhpZGVMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25TaG93TGlzdGVuZXIgXG4gICAgICovXG4gICAgb25TaG93KG9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBvblNob3dMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGhpZGVcIik7XG4gICAgICAgIGF3YWl0IFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MDAsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vbkhpZGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzaG93KG5ld0hlYWRlciA9IG51bGwsIG5ld01lc3NhZ2UgPSBudWxsKSB7XG4gICAgICAgIGlmIChuZXdIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlIZWFkZXIobmV3SGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3TWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1lc3NhZ2UobmV3TWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UuQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICBhd2FpdCBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLCgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIHNob3dcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLm9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyLmNhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBDb21tb25FdmVudHMge1xuXG4gICAgc3RhdGljIEhPVkVSRUQgPSBcImhvdmVyZWRcIjtcbiAgICBzdGF0aWMgVU5IT1ZFUkVEID0gXCJ1bmhvdmVyZWRcIjtcbiAgICBzdGF0aWMgQ0xJQ0tFRCA9IFwiY2xpY2tlZFwiO1xuICAgIHN0YXRpYyBET1VCTEVfQ0xJQ0tFRCA9IFwiZG91YmxlQ2xpY2tlZFwiO1xuXG4gICAgc3RhdGljIEVOVEVSRUQgPSBcImVudGVyZWRcIjtcbiAgICBzdGF0aWMgS0VZVVBQRUQgPSBcImtleVVwcGVkXCI7XG4gICAgc3RhdGljIEZPQ1VTRUQgPSBcImZvY3VzZWRcIjtcbiAgICBzdGF0aWMgQkxVUlJFRCA9IFwiYmx1cnJlZFwiO1xuXG4gICAgc3RhdGljIENIQU5HRUQgPSBcImNoYW5nZWRcIjtcbiAgICBzdGF0aWMgRU5BQkxFRCA9IFwiZW5hYmxlZFwiO1xuICAgIHN0YXRpYyBESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcbiAgICBzdGF0aWMgU0VMRUNURUQgPSBcInNlbGVjdGVkXCI7XG5cbiAgICBzdGF0aWMgRFJBR19TVEFSVEVEID0gXCJkcmFnU3RhcnRlZFwiO1xuICAgIHN0YXRpYyBEUkFHX0VOREVEID0gXCJkcmFnRW5kZWRcIjtcbiAgICBzdGF0aWMgRFJPUFBFRCA9IFwiZHJvcHBlZFwiO1xuICAgIFxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENhbnZhc1Jvb3QsXG4gICAgTmF2aWdhdGlvblxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IFRpbWVQcm9taXNlLCBMb2dnZXIsIE1ldGhvZCwgTGlzdCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEJhY2tTaGFkZSB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlLmpzXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRWxlbWVudFV0aWxzLCBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRGlhbG9nQm94XCIpO1xuXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94IHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkRpYWxvZ0JveFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZGlhbG9nQm94Lmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9kaWFsb2dCb3guY3NzXCI7XG4gICAgXG4gICAgc3RhdGljIE9QVElPTl9CQUNLX09OX0NMT1NFID0gMTtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRPcHRpb25zID0gW10pe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtCYWNrU2hhZGV9ICovXG4gICAgICAgIHRoaXMuYmFja1NoYWRlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQmFja1NoYWRlLCBbXG4gICAgICAgICAgICBuZXcgQmFja1NoYWRlTGlzdGVuZXJzKClcbiAgICAgICAgICAgICAgICAud2l0aEJhY2tncm91bmRDbGlja2VkKG5ldyBNZXRob2QodGhpcywgdGhpcy5oaWRlKSldKTtcblxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zd2FsbG93Rm9jdXNFc2NhcGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm93bmluZ1RyaWdnZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TGlzdDxzdHJpbmc+fSAqL1xuICAgICAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gbmV3IExpc3QoZGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TGlzdDxzdHJpbmc+fSAqL1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgTGlzdChkZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtGdW5jdGlvbn0gKi9cbiAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lciA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXQoXCJiYWNrU2hhZGVDb250YWluZXJcIiwgdGhpcy5iYWNrU2hhZGUuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2xvc2VCdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xvc2UpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBcbiAgICAgKi9cbiAgICBzZXRUaXRsZSh0ZXh0KXsgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJ0aXRsZVwiLCB0ZXh0KTsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcbiAgICAgKi9cbiAgICBzZXRGb290ZXIoY29tcG9uZW50KXtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94Rm9vdGVyXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImRpYWxvZ0JveEZvb3RlclwiLCBjb21wb25lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXG4gICAgICovXG4gICAgc2V0Q29udGVudChjb21wb25lbnQpeyB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImRpYWxvZ0JveENvbnRlbnRcIixjb21wb25lbnQpOyB9XG5cblx0c2V0KGtleSx2YWwpIHsgdGhpcy5jb21wb25lbnQuc2V0KGtleSx2YWwpOyB9XG4gICAgXG4gICAgYXN5bmMgY2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGF3YWl0IHRoaXMuaGlkZSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5jb250YWlucyhEaWFsb2dCb3guT1BUSU9OX0JBQ0tfT05fQ0xPU0UpKSB7XG4gICAgICAgICAgICBOYXZpZ2F0aW9uLmluc3RhbmNlKCkuYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgaGlkZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZVwiKTtcbiAgICAgICAgY29uc3QgaGlkZUJhY2tTaGFkZVByb21pc2UgPSB0aGlzLmJhY2tTaGFkZS5oaWRlQWZ0ZXIoMzAwKTtcbiAgICAgICAgY29uc3QgaGlkZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMjAwLCAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlIGRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktbm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGlzYWJsZVN0eWxlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZSgyMDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpYWxvZ0JveCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2UsIGhpZGVCYWNrU2hhZGVQcm9taXNlXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB0ZW1wb3JhcnlPcHRpb25zXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc2hvdyhldmVudCwgdGVtcG9yYXJ5T3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lciA9IENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZShcbiAgICAgICAgICAgIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbG9zZSksIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveE92ZXJsYXlcIilcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGVtcG9yYXJ5T3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IExpc3QodGVtcG9yYXJ5T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgQ2FudmFzUm9vdC5zd2FsbG93Rm9jdXNFc2NhcGUoNTAwKTtcbiAgICAgICAgaWYgKCF0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERpYWxvZ0JveC5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB0aGlzLmJhY2tTaGFkZS5zaG93KCk7XG4gICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlIGRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktYmxvY2tcIik7XG4gICAgICAgIENhbnZhc1Jvb3QubW91c2VEb3duRWxlbWVudCA9IHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveENvbnRlbnRcIik7XG4gICAgICAgIHJldHVybiBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLCAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlIGRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktYmxvY2sgZGlhbG9nYm94LW92ZXJsYXktc2hvd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXREaWFsb2dCb3hPdmVybGF5KCkgeyByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94T3ZlcmxheVwiKTsgfVxuXG4gICAgZ2V0RGlhbG9nQm94KCkgeyByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94XCIpOyB9XG5cbiAgICBzY3JvbGxMb2NrKCkge1xuICAgICAgICBDb250YWluZXJFbGVtZW50VXRpbHMuc2Nyb2xsTG9ja1RvKHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveENvbnRlbnRcIikuZWxlbWVudCwgMCwgMCwgMTAwMCk7XG4gICAgfVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIENhbnZhc1Jvb3QsXG4gICAgSFRNTCxcbiAgICBDU1MsXG4gICAgU3R5bGVcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRHJvcERvd25QYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIERyb3BEb3duUGFuZWwge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiRHJvcERvd25QYW5lbFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZHJvcERvd25QYW5lbC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZHJvcERvd25QYW5lbC5jc3NcIjtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0xFRlQgPSBcImRyb3AtZG93bi1wYW5lbC1sZWZ0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1JJR0hUID0gXCJkcm9wLWRvd24tcGFuZWwtcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX1ZJU0lCTEUgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LXZpc2libGVcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9ISURERU4gPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWhpZGRlblwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYUEFORCA9IFwiZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtZXhwYW5kXCI7XG4gICAgc3RhdGljIENPTlRFTlRfQ09MTEFQU0UgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWNvbGxhcHNlXCI7XG4gICAgc3RhdGljIENPTlRFTlQgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50XCI7XG4gICAgc3RhdGljIEJVVFRPTiA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWNvbkNsYXNzLCB0eXBlID0gRHJvcERvd25QYW5lbC5UWVBFX0RBUkssIHNpemUgPSBEcm9wRG93blBhbmVsLlNJWkVfTUVESVVNLCBvcmllbnRhdGlvbiA9IERyb3BEb3duUGFuZWwuT1JJRU5UQVRJT05fTEVGVCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShEcm9wRG93blBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERyb3BEb3duUGFuZWwuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0Q2hpbGQoSFRNTC5pKFwiXCIsIHRoaXMuaWNvbkNsYXNzKSk7XG5cbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkJVVFRPTilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy50eXBlKTtcblxuICAgICAgICBDU1MuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlQpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5zaXplKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLm9yaWVudGF0aW9uKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xpY2tlZCkpO1xuICAgICAgICBDYW52YXNSb290Lmxpc3RlblRvRm9jdXNFc2NhcGUobmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpLCB0aGlzLmNvbXBvbmVudC5nZXQoXCJkcm9wRG93blBhbmVsUm9vdFwiKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGRyb3BEb3duUGFuZWxDb250ZW50IFxuICAgICAqL1xuICAgIHNldFBhbmVsQ29udGVudChkcm9wRG93blBhbmVsQ29udGVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLnNldENoaWxkKGRyb3BEb3duUGFuZWxDb250ZW50LmNvbXBvbmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50b2dnbGVDb250ZW50KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQ29udGVudCgpIHtcbiAgICAgICAgaWYgKCFTdHlsZS5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpKS5pcyhcImRpc3BsYXlcIixcImJsb2NrXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9WSVNJQkxFKTtcbiAgICAgICAgU3R5bGUuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSlcbiAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UX0hJRERFTik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBDYW52YXNSb290LFxuICAgIEhUTUwsXG4gICAgQ1NTLFxuICAgIFN0eWxlXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBvcFVwUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBQb3BVcFBhbmVsIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIlBvcFVwUGFuZWxcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3BvcFVwUGFuZWwuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3BvcFVwUGFuZWwuY3NzXCI7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXByaW1hcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TRUNPTkRBUlkgPSBcInBvcC11cC1wYW5lbC1idXR0b24tc2Vjb25kYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU1VDQ0VTUyA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1pbmZvXCI7XG4gICAgc3RhdGljIFRZUEVfV0FSTklORyA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi13YXJuaW5nXCI7XG4gICAgc3RhdGljIFRZUEVfREFOR0VSID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRZUEVfREFSSyA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1kYXJrXCI7XG5cbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcInBvcC11cC1wYW5lbC1idXR0b24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcInBvcC11cC1wYW5lbC1idXR0b24tbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9MRUZUID0gXCJwb3AtdXAtcGFuZWwtbGVmdFwiO1xuICAgIHN0YXRpYyBPUklFTlRBVElPTl9SSUdIVCA9IFwicG9wLXVwLXBhbmVsLXJpZ2h0XCI7XG5cbiAgICBzdGF0aWMgQ09OVEVOVF9WSVNJQkxFID0gXCJwb3AtdXAtcGFuZWwtY29udGVudC12aXNpYmxlXCI7XG4gICAgc3RhdGljIENPTlRFTlRfSElEREVOID0gXCJwb3AtdXAtcGFuZWwtY29udGVudC1oaWRkZW5cIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9FWFBBTkQgPSBcInBvcC11cC1wYW5lbC1jb250ZW50LWV4cGFuZFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0NPTExBUFNFID0gXCJwb3AtdXAtcGFuZWwtY29udGVudC1jb2xsYXBzZVwiO1xuICAgIHN0YXRpYyBDT05URU5UID0gXCJwb3AtdXAtcGFuZWwtY29udGVudFwiO1xuICAgIHN0YXRpYyBCVVRUT04gPSBcInBvcC11cC1wYW5lbC1idXR0b25cIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uQ2xhc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmllbnRhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGljb25DbGFzcywgdHlwZSA9IFBvcFVwUGFuZWwuVFlQRV9EQVJLLCBzaXplID0gUG9wVXBQYW5lbC5TSVpFX01FRElVTSwgb3JpZW50YXRpb24gPSBQb3BVcFBhbmVsLk9SSUVOVEFUSU9OX0xFRlQpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbkNsYXNzID0gaWNvbkNsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUG9wVXBQYW5lbC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQb3BVcFBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuXG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5CVVRUT04pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSk7XG5cbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UKVxuICAgICAgICAgICAgLmRpc2FibGUoUG9wVXBQYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5vcmllbnRhdGlvbik7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKTtcbiAgICAgICAgQ2FudmFzUm9vdC5saXN0ZW5Ub0ZvY3VzRXNjYXBlKG5ldyBNZXRob2QodGhpcywgdGhpcy5oaWRlKSwgdGhpcy5jb21wb25lbnQuZ2V0KFwicG9wVXBQYW5lbFJvb3RcIikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBwb3BVcFBhbmVsQ29udGVudCBcbiAgICAgKi9cbiAgICBzZXRQYW5lbENvbnRlbnQocG9wVXBQYW5lbENvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5zZXRDaGlsZChwb3BVcFBhbmVsQ29udGVudC5jb21wb25lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ29udGVudCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbnRlbnQoKSB7XG4gICAgICAgIGlmICghU3R5bGUuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSkuaXMoXCJkaXNwbGF5XCIsXCJibG9ja1wiKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfVklTSUJMRSk7XG4gICAgICAgIFN0eWxlLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikpXG4gICAgICAgICAgICAuc2V0KFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLmVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBDU1MuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoUG9wVXBQYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9ISURERU4pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTWV0aG9kLCBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IElucHV0RWxlbWVudERhdGFCaW5kaW5nLCBBYnN0cmFjdFZhbGlkYXRvciwgQ29tcG9uZW50RmFjdG9yeSwgQ2FudmFzU3R5bGVzLCBDb21wb25lbnQsIEV2ZW50TWFuYWdlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNvbW1vbklucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcbiAgICBzdGF0aWMgRVZFTlRfRU5URVJFRCA9IENvbW1vbkV2ZW50cy5FTlRFUkVEO1xuICAgIHN0YXRpYyBFVkVOVF9LRVlVUFBFRCA9IENvbW1vbkV2ZW50cy5LRVlVUFBFRDtcbiAgICBzdGF0aWMgRVZFTlRfQ0hBTkdFRCA9IENvbW1vbkV2ZW50cy5DSEFOR0VEO1xuICAgIHN0YXRpYyBFVkVOVF9CTFVSUkVEID0gQ29tbW9uRXZlbnRzLkJMVVJSRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtBYnN0cmFjdFZhbGlkYXRvcn0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0RWxlbWVudElkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yRWxlbWVudElkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TmFtZSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbW9kZWwgPSBudWxsLFxuICAgICAgICB2YWxpZGF0b3IgPSBudWxsLCBcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBudWxsLFxuICAgICAgICBpbnB1dEVsZW1lbnRJZCA9IG51bGwsXG4gICAgICAgIGVycm9yRWxlbWVudElkID0gbnVsbCkge1xuXG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QWJzdHJhY3RWYWxpZGF0b3J9ICovXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50SWQgPSBpbnB1dEVsZW1lbnRJZDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5lcnJvckVsZW1lbnRJZCA9IGVycm9yRWxlbWVudElkO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbnB1dEVsZW1lbnREYXRhQmluZGluZ30gKi9cbiAgICAgICAgdGhpcy5kYXRhQmluZGluZyA9IG51bGw7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKHRoaXMuY29tcG9uZW50TmFtZSk7XG5cbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKHRoaXMuY29tcG9uZW50TmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcbiAgICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIsIFwiOiAgXCIgKyAgdGhpcy5wbGFjZWhvbGRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnZhbGlkYXRvcikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3Iud2l0aFZhbGlkTGlzdGVuZXIobmV3IE1ldGhvZCh0aGlzLHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhQmluZGluZyA9IElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCwgdGhpcy52YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZClcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImtleXVwXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5rZXl1cHBlZCkpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjaGFuZ2VcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNoYW5nZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiYmx1clwiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuYmx1cnJlZCkpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xpY2tlZCkpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJrZXl1cFwiLCBuZXcgTWV0aG9kKHRoaXMsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5pc0tleUNvZGUoMTMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJlZChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICh0aGlzLmVycm9yRWxlbWVudElkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZClcbiAgICAgICAgICAgICAgICAubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZXJyb3JDbGlja2VkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIGdldCB2YWx1ZSgpIHsgXG4gICAgICAgIC8qKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH0gKi9cbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCk7XG4gICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgLyoqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YUJpbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUJpbmRpbmcucHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAga2V5dXBwZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5pc0tleUNvZGUoMTMpICYmICFldmVudC5pc0tleUNvZGUoMTYpICYmICFldmVudC5pc0tleUNvZGUoOSkpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiXCIgPT09IGV2ZW50LnRhcmdldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0tFWVVQUEVELCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoXCJcIiA9PT0gZXZlbnQudGFyZ2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQ0hBTkdFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9DTElDS0VELCBldmVudCk7XG4gICAgfVxuXG4gICAgZW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGJsdXJyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhaW50ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQkxVUlJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGVycm9yQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmZvY3VzKCk7IH1cbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZWxlY3RBbGwoKTsgfVxuICAgIGVuYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmRpc2FibGUoKTsgfVxuICAgIGNsZWFyKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkudmFsdWUgPSBcIlwiOyB0aGlzLnRhaW50ZWQgPSBmYWxzZTsgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7IH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudCwgQ2FudmFzU3R5bGVzLCBDU1MgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFuZWwge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUGFuZWxcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3BhbmVsLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYW5lbC5jc3NcIjtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU5fUk9PVCA9IFwicGFuZWwtdHlwZS1jb2x1bW4tcm9vdFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU4gPSBcInBhbmVsLXR5cGUtY29sdW1uXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9UWVBFX1JPVyA9IFwicGFuZWwtdHlwZS1yb3dcIjtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9MRUZUID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWxlZnRcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fUklHSFQgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tcmlnaHRcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fQ0VOVEVSID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWNlbnRlclwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9KVVNUSUZZID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWp1c3RpZnlcIjtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfU0laRV9BVVRPID0gXCJwYW5lbC1zaXplLWF1dG9cIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1NJWkVfTUlOSU1BTCA9IFwicGFuZWwtc2l6ZS1taW5pbWFsXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9TSVpFX1JFU1BPTlNJVkUgPSBcInBhbmVsLXNpemUtcmVzcG9uc2l2ZVwiO1xuXG4gICAgc3RhdGljIE9QVElPTl9TVFlMRV9DT05URU5UX1BBRERJTkdfU01BTEwgPSBcInBhbmVsLWNvbnRlbnQtcGFkZGluZy1zbWFsbFwiO1xuICAgIHN0YXRpYyBPUFRJT05fU1RZTEVfQ09OVEVOVF9QQURESU5HX0xBUkdFID0gXCJwYW5lbC1jb250ZW50LXBhZGRpbmctbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUFRJT05fU1RZTEVfQk9SREVSX1NIQURPVyA9IFwicGFuZWwtYm9yZGVyLXNoYWRvd1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRBbGlnbiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2l6ZSBcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG9wdGlvbnMgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodHlwZSA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTl9ST09ULFxuICAgICAgICBjb250ZW50QWxpZ24gPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9DRU5URVIsXG4gICAgICAgIHNpemUgPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfU0laRV9BVVRPLFxuICAgICAgICBvcHRpb25zID0gW10pIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29udGVudEFsaWduID0gY29udGVudEFsaWduO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQYW5lbC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYW5lbC5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwicGFuZWxcIikpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5jb250ZW50QWxpZ24pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkxpbmVQYW5lbEVudHJ5XCIpO1xuXG5leHBvcnQgY2xhc3MgTGluZVBhbmVsRW50cnkge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiTGluZVBhbmVsRW50cnlcIjtcblx0c3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9saW5lUGFuZWxFbnRyeS5odG1sXCI7XG5cdHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2xpbmVQYW5lbEVudHJ5LmNzc1wiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShMaW5lUGFuZWxFbnRyeS5DT01QT05FTlRfTkFNRSk7XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKExpbmVQYW5lbEVudHJ5LkNPTVBPTkVOVF9OQU1FKTtcbiAgICB9XG5cblxufSIsImltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdmlkZXIgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgQ2FudmFzU3R5bGVzLCBFdmVudE1hbmFnZXIsIFN0YXRlTWFuYWdlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgUGFuZWwgfSBmcm9tIFwiLi4vcGFuZWwvcGFuZWwuanNcIjtcbmltcG9ydCB7IExpbmVQYW5lbEVudHJ5IH0gZnJvbSBcIi4vdHJlZVBhbmVsRW50cnkvbGluZVBhbmVsRW50cnkuanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiTGluZVBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgTGluZVBhbmVsIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkxpbmVQYW5lbFwiO1xuXHRzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2xpbmVQYW5lbC5odG1sXCI7XG5cdHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2xpbmVQYW5lbC5jc3NcIjtcblxuXHRzdGF0aWMgRVZFTlRfUkVGUkVTSF9DTElDS0VEID0gXCJyZWZyZXNoQ2xpY2tlZFwiO1xuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBSRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQgPSBcInJlY29yZHNTdGF0ZVVwZGF0ZVJlcXVlc3RlZFwiO1xuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtQYW5lbH0gYnV0dG9uUGFuZWwgXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihidXR0b25QYW5lbCA9IG51bGwpIHtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblx0XHRcblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cblx0XHR0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8TGluZVBhbmVsRW50cnk+fSAqL1xuXHRcdHRoaXMubGluZVBhbmVsRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKExpbmVQYW5lbEVudHJ5KTtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8UGFuZWw+fSAqL1xuXHRcdHRoaXMucGFuZWxQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFBhbmVsKTtcblxuICAgICAgICAvKiogQHR5cGUge1N0YXRlTWFuYWdlcjxhbnlbXT59ICovXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFN0YXRlTWFuYWdlcik7XG5cblx0XHQvKiogQHR5cGUge1BhbmVsfSAqL1xuXHRcdHRoaXMuYnV0dG9uUGFuZWwgPSBidXR0b25QYW5lbDtcblxuXHR9XG5cblx0YXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoTGluZVBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoTGluZVBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcblxuXHRcdGlmICh0aGlzLmJ1dHRvblBhbmVsKSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImJ1dHRvblBhbmVsXCIsIHRoaXMuYnV0dG9uUGFuZWwuY29tcG9uZW50KTtcblx0XHR9XG5cblx0XHR0aGlzLmFycmF5U3RhdGUucmVhY3QobmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhhbmRsZUFycmF5U3RhdGUpKTtcblxuXG5cdH1cblxuXHQvKipcblx0ICogQHR5cGUgeyBFdmVudE1hbmFnZXIgfVxuXHQgKi9cblx0Z2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cblx0LyoqXG5cdCAqIEB0eXBlIHsgRXZlbnRNYW5hZ2VyIH1cblx0ICovXG5cdGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG5cdC8qKlxuXHQgKiBSZXNldFxuXHQgKiBcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqL1xuXHRhc3luYyByZXNldChldmVudCkge1xuXHRcdHRoaXMuZXZlbnRzLnRyaWdnZXIoTGluZVBhbmVsLlJFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgW2V2ZW50LCB0aGlzLmFycmF5U3RhdGVdKTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlQXJyYXlTdGF0ZShhcnJheSkge1xuXHRcdGNvbnN0IHBhbmVsID0gYXdhaXQgdGhpcy5wYW5lbFByb3ZpZGVyLmdldChbXG5cdFx0XHRQYW5lbC5QQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU4sIFxuXHRcdFx0UGFuZWwuUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fTEVGVCwgXG5cdFx0XHRQYW5lbC5QQVJBTUVURVJfU1RZTEVfU0laRV9NSU5JTUFMXSk7XG5cdFx0YXJyYXkuZm9yRWFjaChhc3luYyAocmVjb3JkKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBvcHVsYXRlUmVjb3JkKHBhbmVsLCByZWNvcmQpO1xuICAgICAgICB9KTtcblxuXHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicmVjb3JkRWxlbWVudHNcIiwgcGFuZWwuY29tcG9uZW50KTtcbiAgICB9XG5cblx0ICAgIC8qKmBcblx0ICogQHBhcmFtIHtDb21wb25lbnR9IHBhbmVsXG4gICAgICogQHBhcmFtIHthbnl9IHJlY29yZCBcbiAgICAgKi9cbiAgICBhc3luYyBwb3B1bGF0ZVJlY29yZChwYW5lbCwgcmVjb3JkKSB7XG4gICAgICAgIGNvbnN0IHJlY29yZEVsZW1lbnQgPSBhd2FpdCB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKExpbmVQYW5lbC5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtudWxsLCByZWNvcmRdKTtcbiAgICAgICAgXG5cdFx0aWYgKCFyZWNvcmRFbGVtZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbGluZVBhbmVsRW50cnkgPSBhd2FpdCB0aGlzLmxpbmVQYW5lbEVudHJ5UHJvdmlkZXIuZ2V0KFt0cnVlLCByZWNvcmRdKTtcblx0XHRsaW5lUGFuZWxFbnRyeS5jb21wb25lbnQuc2V0Q2hpbGQoXCJyZWNvcmRFbGVtZW50XCIsIHJlY29yZEVsZW1lbnQuY29tcG9uZW50KTtcblxuXHRcdHBhbmVsLmNvbXBvbmVudC5hZGRDaGlsZChcInBhbmVsXCIsIGxpbmVQYW5lbEVudHJ5LmNvbXBvbmVudCk7XG4gICAgfVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBDU1Ncbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJMaW5rUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBMaW5rUGFuZWwge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiTGlua1BhbmVsXCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9saW5rUGFuZWwuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2xpbmtQYW5lbC5jc3NcIjtcblxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG5cbiAgICBzdGF0aWMgU0laRV9TTUFMTCA9IFwibGluay1wYW5lbC1zbWFsbFwiO1xuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwibGluay1wYW5lbC1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwibGluay1wYW5lbC1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0ZMQVQgPSBcImxpbmstcGFuZWwtZmxhdFwiO1xuICAgIHN0YXRpYyBPUklFTlRBVElPTl9TVEFDS0VEID0gXCJsaW5rLXBhbmVsLXN0YWNrZWRcIjtcblxuICAgIHN0YXRpYyBUSEVNRV9EQVJLID0gXCJsaW5rLXBhbmVsLWRhcmtcIjtcbiAgICBzdGF0aWMgVEhFTUVfTElHSFQgPSBcImxpbmstcGFuZWwtbGlnaHRcIjtcbiAgICBzdGF0aWMgVEhFTUVfREFOR0VSID0gXCJsaW5rLXBhbmVsLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUSEVNRV9JTkZPID0gXCJsaW5rLXBhbmVsLWluZm9cIjtcbiAgICBzdGF0aWMgVEhFTUVfU1VDQ0VTUyA9IFwibGluay1wYW5lbC1zdWNjZXNzXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWNvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBpY29uLCB0aGVtZSA9IExpbmtQYW5lbC5USEVNRV9EQVJLLCBvcmllbnRhdGlvbiA9IExpbmtQYW5lbC5PUklFTlRBVElPTl9GTEFULCBzaXplID0gTGlua1BhbmVsLlNJWkVfU01BTEwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnRoZW1lID0gdGhlbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8TGlua1BhbmVsPn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8TGlua1BhbmVsPn0gKi9cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShMaW5rUGFuZWwuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoTGlua1BhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgXG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImxpbmtcIikpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5vcmllbnRhdGlvbilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy50aGVtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpLnNldENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGFiZWxcIikucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pY29uKSB7XG4gICAgICAgICAgICBDU1MuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpKVxuICAgICAgICAgICAgICAgIC5jbGVhcigpXG4gICAgICAgICAgICAgICAgLmVuYWJsZSh0aGlzLmljb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGlua1wiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKExpbmtQYW5lbC5FVkVOVF9DTElDS0VELCBldmVudCk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFxuICAgICAqL1xuICAgIHdpdGhDbGlja0xpc3RlbmVyKG1ldGhvZCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsaW5rXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbWV0aG9kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEJhc2VFbGVtZW50LCBDYW52YXNTdHlsZXMsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgQ1NTIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5leHBvcnQgY2xhc3MgU2xpZGVEZWNrRW50cnkge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJTbGlkZURlY2tFbnRyeVwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2xpZGVEZWNrRW50cnkuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3NsaWRlRGVja0VudHJ5LmNzc1wiO1xuXG4gICAgc3RhdGljIERFRkFVTFRfQ0xBU1MgPSBcInNsaWRlLWRlY2stZW50cnlcIjtcblxuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9GUk9OVCA9IFwicG9zaXRpb24tZnJvbnRcIjtcbiAgICBzdGF0aWMgRU5UUllfUE9TSVRJT05fQkVISU5EID0gXCJwb3NpdGlvbi1iZWhpbmRcIjtcbiAgICBzdGF0aWMgRU5UUllfUE9TSVRJT05fUklHSFQgPSBcInBvc2l0aW9uLXJpZ2h0XCI7XG5cbiAgICBzdGF0aWMgQ09OVEVOVF9FWElTVEFOQ0VfUFJFU0VOVCA9IFwiZXhpc3RhbmNlLXByZXNlbnRcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9FWElTVEFOQ0VfUkVNT1ZFRCA9IFwiZXhpc3RhbmNlLXJlbW92ZWRcIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtOdW1iZXJ9ICovXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fRlJPTlQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0Jhc2VFbGVtZW50fVxuICAgICAqL1xuICAgIGdldCBjb250ZW50RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5Q29udGVudFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7QmFzZUVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0IGVudHJ5RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5XCIpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTbGlkZURlY2tFbnRyeS5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTbGlkZURlY2tFbnRyeS5DT01QT05FTlRfTkFNRSk7XG4gICAgfVxuXG4gICAgc2V0SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIH1cblxuICAgIHNldENvbnRlbnQoY29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuc2V0Q2hpbGQoY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLnNldENvbnRlbnRWaXNpYmlsaXR5KFNsaWRlRGVja0VudHJ5LkNPTlRFTlRfRVhJU1RBTkNFX1BSRVNFTlQpO1xuICAgICAgICB0aGlzLnNldFNoaWZ0KFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0ZST05UKTtcbiAgICB9XG5cbiAgICBoaWRlKG5leHRJbmRleCkge1xuICAgICAgICBpZiAobmV4dEluZGV4ID4gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaGlmdChTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9CRUhJTkQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTaGlmdChTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9SSUdIVCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGp1c3RXaGVuSGlkZGVuKCk7XG4gICAgfVxuXG4gICAgYWRqdXN0V2hlbkhpZGRlbigpIHtcbiAgICAgICAgVGltZVByb21pc2UuYXNQcm9taXNlKDYwMCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0ZST05UKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50VmlzaWJpbGl0eShTbGlkZURlY2tFbnRyeS5DT05URU5UX0VYSVNUQU5DRV9SRU1PVkVEKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudFZpc2liaWxpdHkoY29udGVudFZpc2liaWxpdHkpIHtcbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb250ZW50RWxlbWVudCkucmVwbGFjZShcImV4aXN0YW5jZS1cIiwgY29udGVudFZpc2liaWxpdHkpO1xuICAgIH1cblxuICAgIHNldFNoaWZ0KHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgQ1NTLmZyb20odGhpcy5lbnRyeUVsZW1lbnQpLnJlcGxhY2UoXCJwb3NpdGlvbi1cIiwgcG9zaXRpb24pO1xuICAgIH1cblxufSIsImltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIEV2ZW50TWFuYWdlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBTbGlkZURlY2tFbnRyeSB9IGZyb20gXCIuL3NsaWRlRGVja0VudHJ5L3NsaWRlRGVja0VudHJ5LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZURlY2sge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJTbGlkZURlY2tcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3NsaWRlRGVjay5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2xpZGVEZWNrLmNzc1wiO1xuXG4gICAgc3RhdGljIEVWRU5UX0VOVFJZX0NIQU5HRUQgPSBcImV2ZW50RW50cnlDaGFuZ2VkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcDxDb21wb25lbnQ+fSBjb21wb25lbnRNYXAgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TWFwKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPENvbXBvbmVudD59ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFwID0gY29tcG9uZW50TWFwO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UHJvdmlkZXI8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihTbGlkZURlY2tFbnRyeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QgPSBuZXcgTGlzdCgpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge01hcDxOdW1iZXI+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5SW5kZXhNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTbGlkZURlY2tFbnRyeX0gKi9cbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoU2xpZGVEZWNrLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFNsaWRlRGVjay5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50TWFwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVFbnRyaWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzbGlkZURlY2tFbnRyaWVzXCIpLmVsZW1lbnQucGFyZW50RWxlbWVudC5zY3JvbGxUbygwLDApO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByZXBhcmVFbnRyaWVzKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hcC5mb3JFYWNoKGFzeW5jIChrZXksIGNvbXBvbmVudCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBzbGlkZURlY2tFbnRyeSA9IGF3YWl0IHRoaXMuc2xpZGVEZWNrRW50cnlQcm92aWRlci5nZXQoKTtcblxuICAgICAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jdXJyZW50RW50cnkpIHtcbiAgICAgICAgICAgICAgICBzbGlkZURlY2tFbnRyeS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBzbGlkZURlY2tFbnRyeTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5zZXQoa2V5LCBzbGlkZURlY2tFbnRyeSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5hZGQoc2xpZGVEZWNrRW50cnkpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUluZGV4TWFwLnNldChrZXksIHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSAtMSk7XG5cbiAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNldENvbnRlbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNldEluZGV4KHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSAtIDEpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcInNsaWRlRGVja0VudHJpZXNcIiwgc2xpZGVEZWNrRW50cnkuY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBzbGlkZU5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCArIDEgPj0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3Quc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4ICsgMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2xpZGVEZWNrLkVWRU5UX0VOVFJZX0NIQU5HRUQpO1xuICAgIH1cblxuICAgIHNsaWRlUHJldmlvdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4IC0gMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbiAgICBzbGlkZVRvKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5nZXQobmFtZSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlJhZGlvVG9nZ2xlSWNvblwiKTtcblxuZXhwb3J0IGNsYXNzIFJhZGlvVG9nZ2xlSWNvbiB7XG5cbiAgICBzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIlJhZGlvVG9nZ2xlSWNvblwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcmFkaW9Ub2dnbGVJY29uLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9yYWRpb1RvZ2dsZUljb24uY3NzXCI7XG4gICAgXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0NIQU5HRUQgPSBDb21tb25FdmVudHMuQ0hBTkdFRDtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSBcIj9cIiwgbW9kZWwgPSBudWxsLCBpY29uID0gXCJmYXMgZmEtcXVlc3Rpb25cIiwgbGFiZWwgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShSYWRpb1RvZ2dsZUljb24uQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUmFkaW9Ub2dnbGVJY29uLkNPTVBPTkVOVF9OQU1FKTtcblxuICAgICAgICBjb25zdCByYWRpbyA9IHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpO1xuICAgICAgICByYWRpby5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcbiAgICAgICAgcmFkaW8ubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xpY2tlZCkpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gcmFkaW8uZ2V0QXR0cmlidXRlVmFsdWUoXCJpZFwiKTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGVWYWx1ZShcImZvclwiLCBpZCk7XG5cbiAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMuY29tcG9uZW50LmdldChcImljb25cIik7XG4gICAgICAgIGljb24uc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCB0aGlzLmljb24pO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpLmxpc3RlblRvKFwiY2hhbmdlXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbGlja2VkKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZUljb24uRVZFTlRfQ0hBTkdFRCwgW2V2ZW50XSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9FTkFCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0RJU0FCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRvZ2dsZSBzdGF0ZSBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkIFxuICAgICAqL1xuICAgIHRvZ2dsZShjaGVja2VkKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQgPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2hhbmdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJyYWRpb1wiKS5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdG9nZ2xlIHN0YXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBDU1MsXG4gICAgSFRNTFxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVG9nZ2xlSWNvblwiKTtcblxuZXhwb3J0IGNsYXNzIFRvZ2dsZUljb24ge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiVG9nZ2xlSWNvblwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdG9nZ2xlSWNvbi5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdG9nZ2xlSWNvbi5jc3NcIjtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcInRvZ2dsZUljb24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwidG9nZ2xlSWNvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJ0b2dnbGVJY29uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJ0b2dnbGVJY29uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJ0b2dnbGVJY29uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcInRvZ2dsZUljb24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcInRvZ2dsZUljb24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJ0b2dnbGVJY29uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwidG9nZ2xlSWNvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwidG9nZ2xlSWNvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNQSU5ORVJfVklTSUJMRSA9IFwidG9nZ2xlSWNvbi1zcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCI7XG4gICAgc3RhdGljIFNQSU5ORVJfSElEREVOID0gXCJ0b2dnbGVJY29uLXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiO1xuXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRURcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGljb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCI/XCIsIG1vZGVsID0gbnVsbCwgbGFiZWwgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmVuYWJsZWRJY29uID0gXCJmYXMgZmEtY2lyY2xlLWNoZWNrXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZGlzYWJsZWRJY29uID0gXCJmYXMgZmEtY2lyY2xlXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZGlzYWJsZWRDb2xvciA9IFwibGlnaHRncmF5XCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZW5hYmxlZENvbG9yID0gXCIjMjE5NkYzXCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaG92ZXJDb2xvciA9IFwiZ3JheVwiO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxUb2dnbGVJY29uPn0gKi9cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIlRvZ2dsZUljb25cIik7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShUb2dnbGVJY29uLkNPTVBPTkVOVF9OQU1FKTtcblxuICAgICAgICBjb25zdCBjaGVja2JveCA9IHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpO1xuICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcbiAgICAgICAgY2hlY2tib3gubGlzdGVuVG8oXCJjaGFuZ2VcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKTtcblxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lci5saXN0ZW5UbyhcIm1vdXNlb3ZlclwiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZW5hYmxlSG92ZXIpKTtcbiAgICAgICAgY29udGFpbmVyLmxpc3RlblRvKFwibW91c2VvdXRcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmRpc2FibGVIb3ZlcikpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gY2hlY2tib3guZ2V0QXR0cmlidXRlVmFsdWUoXCJpZFwiKTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGVWYWx1ZShcImZvclwiLCBpZCk7XG5cbiAgICAgICAgdGhpcy5hcHBseUljb24odGhpcy5kaXNhYmxlZEljb24pO1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3IodGhpcy5kaXNhYmxlZENvbG9yKTtcblxuICAgIH1cblxuICAgIGxvYWRJY29ucyhkaXNhYmxlZEljb24sIGVuYWJsZWRJY29uKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRJY29uID0gZGlzYWJsZWRJY29uO1xuICAgICAgICB0aGlzLmVuYWJsZWRJY29uID0gZW5hYmxlZEljb247XG4gICAgICAgIHRoaXMuZW5hYmxlZCA/IHRoaXMuYXBwbHlJY29uKHRoaXMuZW5hYmxlZEljb24pIDogdGhpcy5hcHBseUljb24odGhpcy5kaXNhYmxlZEljb24pO1xuICAgIH1cblxuICAgIGxvYWRDb2xvcnMoZGlzYWJsZWQsIGVuYWJsZWQsIGhvdmVyKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRDb2xvciA9IGRpc2FibGVkO1xuICAgICAgICB0aGlzLmVuYWJsZWRDb2xvciA9IGVuYWJsZWQ7XG4gICAgICAgIHRoaXMuaG92ZXJDb2xvciA9IGhvdmVyO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPyB0aGlzLmFwcGx5Q29sb3IodGhpcy5lbmFibGVkQ29sb3IpIDogdGhpcy5hcHBseUNvbG9yKHRoaXMuZGlzYWJsZWRDb2xvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG1ldGhvZCBcbiAgICAgKi9cbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihtZXRob2QpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikubGlzdGVuVG8oXCJjbGlja1wiLCBtZXRob2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja2JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SWNvbih0aGlzLmVuYWJsZWRJY29uKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xvcih0aGlzLmVuYWJsZWRDb2xvcik7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKFRvZ2dsZUljb24uRVZFTlRfRU5BQkxFRCwgZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFwcGx5SWNvbih0aGlzLmRpc2FibGVkSWNvbik7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvcih0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKFRvZ2dsZUljb24uRVZFTlRfRElTQUJMRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBhcHBseUNvbG9yKGNvbG9yKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29tcG9uZW50LmdldChcImNvbnRhaW5lclwiKTtcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyBjb2xvcik7XG4gICAgfVxuXG4gICAgYXBwbHlJY29uKGljb24pIHtcbiAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpO1xuICAgICAgICBpY29uRWxlbWVudC5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIGljb24pO1xuICAgIH1cblxuICAgIGVuYWJsZUhvdmVyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlVmFsdWUoXCJzdHlsZVwiLCBcImNvbG9yOiBcIiArIHRoaXMuaG92ZXJDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlSG92ZXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29tcG9uZW50LmdldChcImNvbnRhaW5lclwiKTtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmVuYWJsZWRDb2xvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlVmFsdWUoXCJzdHlsZVwiLCBcImNvbG9yOiBcIiArIHRoaXMuZGlzYWJsZWRDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcywgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5LCBFdmVudE1hbmFnZXIsIFNpbXBsZUVsZW1lbnQsIFN0YXRlTWFuYWdlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi8uLi9wYW5lbC9wYW5lbC5qc1wiO1xuaW1wb3J0IHsgUmFkaW9Ub2dnbGVJY29uIH0gZnJvbSBcIi4uLy4uL2lucHV0L3JhZGlvVG9nZ2xlSWNvbi9yYWRpb1RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IFRvZ2dsZUljb24gfSBmcm9tIFwiLi4vLi4vaW5wdXQvdG9nZ2xlSWNvbi90b2dnbGVJY29uLmpzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVHJlZVBhbmVsRW50cnlcIik7XG5cbmV4cG9ydCBjbGFzcyBUcmVlUGFuZWxFbnRyeSB7XG5cblx0c3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJUcmVlUGFuZWxFbnRyeVwiO1xuXHRzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RyZWVQYW5lbEVudHJ5Lmh0bWxcIjtcblx0c3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdHJlZVBhbmVsRW50cnkuY3NzXCI7XG5cblx0c3RhdGljIFJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwicmVjb3JkRWxlbWVudFJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCA9IFwic3ViUmVjb3Jkc1N0YXRlVXBkYXRlUmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBFVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFID0gXCJleHBhbmRUb2dnbGVPdmVycmlkZVwiO1xuXG4gICAgY29uc3RydWN0b3IocmVjb3JkID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxQYW5lbD59ICovXG5cdFx0dGhpcy5wYW5lbFByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoUGFuZWwpO1xuXG5cdFx0LyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG5cdFx0dGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdGF0ZU1hbmFnZXI8YW55W10+fSAqL1xuICAgICAgICB0aGlzLmFycmF5U3RhdGUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShTdGF0ZU1hbmFnZXIpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxUcmVlUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoVHJlZVBhbmVsRW50cnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtUb2dnbGVJY29ufSAqL1xuXHRcdHRoaXMuZXhwYW5kVG9nZ2xlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoVG9nZ2xlSWNvbik7XG5cbiAgICAgICAgLyoqIEB0eXBlIHthbnl9ICovXG4gICAgICAgIHRoaXMucmVjb3JkID0gcmVjb3JkO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRyZWVQYW5lbEVudHJ5LkNPTVBPTkVOVF9OQU1FKTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVHJlZVBhbmVsRW50cnkuQ09NUE9ORU5UX05BTUUpO1xuXG5cdFx0dGhpcy5leHBhbmRUb2dnbGUuZXZlbnRzLmxpc3RlblRvKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9FTkFCTEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMubG9hZFN1YlJlY29yZHNDbGlja2VkKSk7XG5cdFx0dGhpcy5leHBhbmRUb2dnbGUuZXZlbnRzLmxpc3RlblRvKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9ESVNBQkxFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGVTdWJSZWNvcmRzQ2xpY2tlZCkpO1xuXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJleHBhbmRCdXR0b25cIiwgdGhpcy5leHBhbmRUb2dnbGUuY29tcG9uZW50KTtcblxuICAgICAgICB0aGlzLmFycmF5U3RhdGUucmVhY3QobmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhhbmRsZUFycmF5U3RhdGUpKTtcblxuICAgIH1cblxuXHQvKipcblx0ICogQHJldHVybnMgeyBFdmVudE1hbmFnZXIgfVxuXHQgKi9cblx0Z2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBcbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGVBcnJheVN0YXRlKGFycmF5KSB7XG5cdFx0Y29uc3QgcGFuZWwgPSBhd2FpdCB0aGlzLnBhbmVsUHJvdmlkZXIuZ2V0KFtcblx0XHRcdFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTiwgXG5cdFx0XHRQYW5lbC5QQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9MRUZULCBcblx0XHRcdFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9TSVpFX01JTklNQUxdKTtcblxuXHRcdGFycmF5LmZvckVhY2goYXN5bmMgKHJlY29yZCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wb3B1bGF0ZVJlY29yZChwYW5lbCwgcmVjb3JkKTtcbiAgICAgICAgfSk7XG5cblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInN1YnJlY29yZEVsZW1lbnRzXCIsIHBhbmVsLmNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50fSBwYW5lbFxuICAgICAqIEBwYXJhbSB7YW55fSByZWNvcmQgXG4gICAgICovXG4gICAgYXN5bmMgcG9wdWxhdGVSZWNvcmQocGFuZWwsIHJlY29yZCkge1xuXHRcdGNvbnN0IHRyZWVQYW5lbFN1YkVudHJ5ID0gYXdhaXQgdGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZGVyLmdldChbcmVjb3JkXSk7XG5cblx0XHRjb25zdCByZWNvcmRFbGVtZW50ID0gYXdhaXQgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtudWxsLCByZWNvcmQsIHRyZWVQYW5lbFN1YkVudHJ5LCB0aGlzXSk7XG4gICAgICAgIFxuXHRcdGlmICghcmVjb3JkRWxlbWVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRyZWVQYW5lbFN1YkVudHJ5LmNvbXBvbmVudC5zZXRDaGlsZChcInJlY29yZEVsZW1lbnRcIiwgcmVjb3JkRWxlbWVudC5jb21wb25lbnQpO1xuXG5cdFx0YXdhaXQgdGhpcy5ldmVudE1hbmFnZXJcblx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIFtudWxsLCB0cmVlUGFuZWxTdWJFbnRyeSwgcmVjb3JkXSk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5lbnRyeVJlcXVlc3RlZCkpO1xuXG5cdFx0dHJlZVBhbmVsU3ViRW50cnkuZXZlbnRzXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmV4cGFuZFRvZ2dsZU92ZXJyaWRlKSk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZCkpO1xuXG5cdFx0cGFuZWwuY29tcG9uZW50LmFkZENoaWxkKFwicGFuZWxcIiwgdHJlZVBhbmVsU3ViRW50cnkuY29tcG9uZW50KTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBlbnRyeVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnkpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGF3YWl0IHRoaXMuZXZlbnRzLnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgdHJlZVBhbmVsRW50cnksIHBhcmVudFRyZWVQYW5lbEVudHJ5XSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBleHBhbmRUb2dnbGVPdmVycmlkZShldmVudCwgdHJlZVBhbmVsRW50cnksIHJlY29yZCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5ldmVudHMudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCBbZXZlbnQsIHRyZWVQYW5lbEVudHJ5LCByZWNvcmRdKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyByZWxvYWRTdWJSZWNvcmRzKCkge1xuXHRcdGNvbnN0IGVsZW1lbnRCdXR0b25zQ29udGFpbmVyID0gYXdhaXQgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKTtcblx0XHRhd2FpdCB0aGlzLnN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQobnVsbCwgdGhpcy5yZWNvcmQsIHRoaXMuYXJyYXlTdGF0ZSwgZWxlbWVudEJ1dHRvbnNDb250YWluZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqIEBwYXJhbSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gc3RhdGVNYW5hZ2VyXG5cdCAqIEBwYXJhbSB7U2ltcGxlRWxlbWVudH0gZWxlbWVudEJ1dHRvbnNDb250YWluZXJcblx0ICovXG5cdGFzeW5jIHN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQoZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcikge1xuXHRcdHRyeSB7XG5cdFx0XHRhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0XHQudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG4gICAgYXN5bmMgbG9hZFN1YlJlY29yZHNDbGlja2VkKGV2ZW50KSB7XG5cdFx0Y29uc3QgZWxlbWVudEJ1dHRvbnNDb250YWluZXIgPSBhd2FpdCB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25zXCIpO1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlclxuXHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgW2V2ZW50LCB0aGlzLnJlY29yZCwgdGhpcy5hcnJheVN0YXRlLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqL1xuICAgIGhpZGVTdWJSZWNvcmRzQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRFbGVtZW50c1wiKS5jbGVhcigpO1xuXHRcdHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvbnNcIikuY2xlYXIoKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIENhbnZhc1N0eWxlcywgRXZlbnRNYW5hZ2VyLCBTaW1wbGVFbGVtZW50IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBUcmVlUGFuZWxFbnRyeSB9IGZyb20gXCIuL3RyZWVQYW5lbEVudHJ5L3RyZWVQYW5lbEVudHJ5LmpzXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi9wYW5lbC9wYW5lbC5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUcmVlUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBUcmVlUGFuZWwge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiVHJlZVBhbmVsXCI7XG5cdHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdHJlZVBhbmVsLmh0bWxcIjtcblx0c3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdHJlZVBhbmVsLmNzc1wiO1xuXG5cdHN0YXRpYyBFVkVOVF9SRUZSRVNIX0NMSUNLRUQgPSBcInJlZnJlc2hDbGlja2VkXCI7XG5cdHN0YXRpYyBSRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQgPSBcInJlY29yZEVsZW1lbnRSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIFNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQgPSBcInN1YlJlY29yZHNTdGF0ZVVwZGF0ZVJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSA9IFwiZXhwYW5kVG9nZ2xlT3ZlcnJpZGVcIjtcblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7UGFuZWx9IGJ1dHRvblBhbmVsIFxuXHQgKi9cblx0Y29uc3RydWN0b3IoYnV0dG9uUGFuZWwgPSBudWxsKSB7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cdFx0XG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG5cdFx0dGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPFRyZWVQYW5lbEVudHJ5Pn0gKi9cblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmllciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFRyZWVQYW5lbEVudHJ5KTtcblxuXHRcdC8qKiBAdHlwZSB7VHJlZVBhbmVsRW50cnl9ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeSA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge1BhbmVsfSAqL1xuXHRcdHRoaXMuYnV0dG9uUGFuZWwgPSBidXR0b25QYW5lbDtcblxuXHR9XG5cblx0YXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVHJlZVBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVHJlZVBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcblxuXHRcdGlmICh0aGlzLmJ1dHRvblBhbmVsKSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImJ1dHRvbnBhbmVsXCIsIHRoaXMuYnV0dG9uUGFuZWwuY29tcG9uZW50KTtcblx0XHR9XG5cblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5ID0gYXdhaXQgdGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZXIuZ2V0KCk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5lbnRyeVJlcXVlc3RlZCkpO1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkuZXZlbnRzXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmV4cGFuZFRvZ2dsZU92ZXJyaWRlKSk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZCkpO1xuXHRcdC8vIFJvb3QgZWxlbWVudCBoYXMgbm8gcmVjb3JkXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5jb21wb25lbnQuZ2V0KFwic3VicmVjb3JkSW5kZW50XCIpLnJlbW92ZSgpO1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkuY29tcG9uZW50LmdldChcInJlY29yZEVsZW1lbnRDb250YWluZXJcIikucmVtb3ZlKCk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZSB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSByb290IFRyZWVQYW5lbEVudHJ5IHdoZW4gaXQncyBvciBvbmUgb2YgaXQncyBzdWJvcmRpbmF0ZSBlbGVtZW50cyBuZWVkIHRvIGJlIHJlbmRlcmVkXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICogQHBhcmFtIHtUcmVlUGFuZWxFbnRyeX0gdHJlZVBhbmVsRW50cnlcblx0ICogQHBhcmFtIHthbnl9IHJlY29yZFxuXHQgKi9cblx0YXN5bmMgZW50cnlSZXF1ZXN0ZWQoZXZlbnQsIHJlY29yZCwgdHJlZVBhbmVsRW50cnksIHBhcmVudFRyZWVQYW5lbEVudHJ5KSB7XG5cdFx0TE9HLmluZm8oXCJFbnRyeSByZXF1ZXN0ZWRcIik7XG5cdFx0dHJ5IHtcblxuXHRcdFx0LyoqIEB0eXBlIHthbnl9ICovXG5cdFx0XHRjb25zdCBwYW5lbCA9IGF3YWl0IHRoaXMuZXZlbnRzXG5cdFx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbC5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnldKTtcblxuXHRcdFx0cmV0dXJuIHBhbmVsO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIHJvb3QgVHJlZVBhbmVsRW50cnkgaXQgYXNrcyBmb3IgdGhlIGV4cGFuZCB0b2dnbGUgdG8gYmUgb3ZlcnJpZGRlblxuXHQgKiBcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7VHJlZVBhbmVsRW50cnl9IHRyZWVQYW5lbEVudHJ5XG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICovXG5cdGFzeW5jIGV4cGFuZFRvZ2dsZU92ZXJyaWRlKGV2ZW50LCB0cmVlUGFuZWxFbnRyeSwgcmVjb3JkKSB7XG5cdFx0TE9HLmluZm8oXCJFeHBhbmQgVG9nZ2xlIE92ZXJyaWRlIHJlcXVlc3RlZFwiKTtcblx0XHR0cnkge1xuXG5cdFx0XHRhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0XHQudHJpZ2dlcihUcmVlUGFuZWwuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgW3RyZWVQYW5lbEVudHJ5LmV4cGFuZFRvZ2dsZSwgcmVjb3JkXSk7XG5cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSByb290IFRyZWVQYW5lbEVudHJ5IHdoZW4gaXQncyBvciBvbmUgb2YgaXQncyBzdWJvcmRpbmF0ZSBlbGVtZW50cyBuZWVkIHRoZSBzdGF0ZSBvZiB0aGUgc3VicmVjb3JkcyB0byBiZSB1cGRhdGVkLFxuXHQgKiBmb3IgZXhhbXBsZSB3aGVuIHRoZSBleHBhbmQgYnV0dG9uIGlzIGNsaWNrZWRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqIEBwYXJhbSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gc3RhdGVNYW5hZ2VyXG5cdCAqIEBwYXJhbSB7U2ltcGxlRWxlbWVudH0gZWxlbWVudEJ1dHRvbnNDb250YWluZXJcblx0ICogQHJldHVybnMge1Byb21pc2U8VHJlZVBhbmVsRW50cnlbXT59XG5cdCAqL1xuXHRhc3luYyBzdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKGV2ZW50LCByZWNvcmQsIHN0YXRlTWFuYWdlciwgZWxlbWVudEJ1dHRvbnNDb250YWluZXIpIHtcblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsLlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIFtldmVudCwgcmVjb3JkLCBzdGF0ZU1hbmFnZXIsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyXSk7XG5cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVzZXRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKi9cblx0YXN5bmMgcmVzZXQoZXZlbnQpIHtcblx0XHRhd2FpdCB0aGlzLnN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQoZXZlbnQsIG51bGwsIHRoaXMudHJlZVBhbmVsRW50cnkuYXJyYXlTdGF0ZSk7XG5cdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJyb290ZWxlbWVudFwiLCB0aGlzLnRyZWVQYW5lbEVudHJ5LmNvbXBvbmVudCk7XG5cdH1cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgQ1NTLFxuICAgIEhUTUxcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCdXR0b25cIik7XG5cbmV4cG9ydCBjbGFzcyBCdXR0b24ge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiQnV0dG9uXCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9idXR0b24uaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2J1dHRvbi5jc3NcIjtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcImJ1dHRvbi1wcmltYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU0VDT05EQVJZID0gXCJidXR0b24tc2Vjb25kYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU1VDQ0VTUyA9IFwiYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJidXR0b24taW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcImJ1dHRvbi13YXJuaW5nXCI7XG4gICAgc3RhdGljIFRZUEVfREFOR0VSID0gXCJidXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcImJ1dHRvbi1saWdodFwiO1xuICAgIHN0YXRpYyBUWVBFX0RBUksgPSBcImJ1dHRvbi1kYXJrXCI7XG5cbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcImJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwiYnV0dG9uLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgU1BJTk5FUl9WSVNJQkxFID0gXCJidXR0b24tc3Bpbm5lci1jb250YWluZXItdmlzaWJsZVwiO1xuICAgIHN0YXRpYyBTUElOTkVSX0hJRERFTiA9IFwiYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiO1xuXG4gICAgc3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBidXR0b25UeXBlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGljb25DbGFzc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBidXR0b25UeXBlID0gQnV0dG9uLlRZUEVfUFJJTUFSWSwgYnV0dG9uU2l6ZSA9IEJ1dHRvbi5TSVpFX01FRElVTSwgaWNvbkNsYXNzKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYnV0dG9uVHlwZSA9IGJ1dHRvblR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYnV0dG9uU2l6ZSA9IGJ1dHRvblNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbkNsYXNzID0gaWNvbkNsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyPEJ1dHRvbj59ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyPEJ1dHRvbj59ICovXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCdXR0b25cIik7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCdXR0b24uQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBpZiAodGhpcy5pY29uQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5hZGRDaGlsZChIVE1MLmkoXCJcIiwgdGhpcy5pY29uQ2xhc3MpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmFkZENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpKVxuICAgICAgICAgICAgLmVuYWJsZShcImJ1dHRvblwiKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLmJ1dHRvblNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuYnV0dG9uVHlwZSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQnV0dG9uLkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBtZXRob2QgXG4gICAgICovXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobWV0aG9kKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG1ldGhvZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVuYWJsZUxvYWRpbmcoKSB7XG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJDb250YWluZXJcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShCdXR0b24uU1BJTk5FUl9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKEJ1dHRvbi5TUElOTkVSX1ZJU0lCTEUpO1xuICAgIH1cblxuICAgIGRpc2FibGVMb2FkaW5nKCkge1xuICAgICAgICBDU1MuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyQ29udGFpbmVyXCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoQnV0dG9uLlNQSU5ORVJfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoQnV0dG9uLlNQSU5ORVJfSElEREVOKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJDaGVja0JveFwiKTtcblxuZXhwb3J0IGNsYXNzIENoZWNrQm94IHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkNoZWNrQm94XCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9jaGVja0JveC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guY3NzXCI7XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShDaGVja0JveC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShDaGVja0JveC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XG5cbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBFbWFpbFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRW1haWxJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkVtYWlsSW5wdXRcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2VtYWlsSW5wdXQuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2VtYWlsSW5wdXQuY3NzXCI7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiRW1haWxcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoRW1haWxJbnB1dC5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBFbWFpbFZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcImVtYWlsSW5wdXRcIixcbiAgICAgICAgICAgIFwiZW1haWxFcnJvclwiKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxuXG59IiwiaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQsIENvbnRhaW5lckZpbGVEYXRhIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgRXZlbnRNYW5hZ2VyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZEVudHJ5IHtcbiAgICBcbiAgICBzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkZpbGVVcGxvYWRFbnRyeVwiXG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9maWxlVXBsb2FkRW50cnkuaHRtbFwiXG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZmlsZVVwbG9hZEVudHJ5LmNzc1wiXG4gICAgXG4gICAgc3RhdGljIEVWRU5UX1JFTU9WRV9DTElDS0VEID0gXCJyZW1vdmVDbGlja2VkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhfSBmaWxlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGUpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29udGFpbmVyRmlsZURhdGF9ICovXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5maWxlTmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmZpbGVTaXplID0gZmlsZS5zaXplO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZmlsZVR5cGUgPSBmaWxlLnR5cGU7XG4gICAgfVxuICAgIFxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShGaWxlVXBsb2FkRW50cnkuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRmlsZVVwbG9hZEVudHJ5LkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lRWxlbWVudCA9IHRoaXMuY29tcG9uZW50LmdldChcImZpbGVOYW1lXCIpO1xuICAgICAgICBmaWxlTmFtZUVsZW1lbnQuc2V0Q2hpbGQodGhpcy5maWxlTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmaWxlU2l6ZUVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlU2l6ZVwiKTtcbiAgICAgICAgZmlsZVNpemVFbGVtZW50LnNldENoaWxkKCh0aGlzLmZpbGVTaXplIC8gMTAyNCkudG9GaXhlZCgyKSArIFwiIEtCXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZmlsZVR5cGVFbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVR5cGVcIik7XG4gICAgICAgIGZpbGVUeXBlRWxlbWVudC5zZXRDaGlsZCh0aGlzLmZpbGVUeXBlID8gdGhpcy5maWxlVHlwZSA6IFwiVW5rbm93blwiKTtcblxuICAgICAgICBjb25zdCByZW1vdmVCdXR0b24gPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJyZW1vdmVCdXR0b25cIik7XG4gICAgICAgIHJlbW92ZUJ1dHRvbi5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5yZW1vdmVDbGlrZWQpKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKHRoaXMuZmlsZSwgdGhpcy5maWxlLm5hbWUpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICByZW1vdmVDbGlrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkRW50cnkuRVZFTlRfUkVNT1ZFX0NMSUNLRUQsIFtldmVudCwgdGhpcy5maWxlXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YX0gZmlsZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqL1xuICAgIHVwZGF0ZVByb2dyZXNzKGZpbGUsIGtleSkge1xuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlUHJvZ3Jlc3NCYXJcIik7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5zZXRTdHlsZShcIndpZHRoXCIsIGZpbGUudXBsb2FkUGVyY2VudGFnZSArIFwiJVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBDb250YWluZXJFdmVudCwgQ29udGFpbmVyRmlsZURhdGEgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIEV2ZW50TWFuYWdlciwgU2ltcGxlRWxlbWVudCwgQ1NTLCBIVE1MLCBTdGF0ZU1hbmFnZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm92aWRlciB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgRmlsZVVwbG9hZEVudHJ5IH0gZnJvbSBcIi4vZmlsZVVwbG9hZEVudHJ5L2ZpbGVVcGxvYWRFbnRyeS5qc1wiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHMuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkZpbGVVcGxvYWRcIik7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkZpbGVVcGxvYWRcIjtcblx0c3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9maWxlVXBsb2FkLmh0bWxcIjtcblx0c3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZmlsZVVwbG9hZC5jc3NcIjtcblxuXHRzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiRmlsZVVwbG9hZFwiO1xuXG5cdHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG4gICAgc3RhdGljIEVWRU5UX0ZJTEVfQURERUQgPSBcImZpbGVBZGRlZFwiO1xuICAgIHN0YXRpYyBFVkVOVF9GSUxFX1JFTU9WRUQgPSBcImZpbGVSZW1vdmVkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG11bHRpcGxlXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBmaWxlVHlwZUFycmF5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbXVsdGlwbGUgPSBmYWxzZSwgZmlsZVR5cGVBcnJheSA9IFtdKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5tdWx0aXBsZSA9IG11bHRpcGxlO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgICAgICAgdGhpcy5maWxlVHlwZUFycmF5ID0gZmlsZVR5cGVBcnJheTtcblxuICAgICAgICAvKiogQHR5cGUge1N0YXRlTWFuYWdlcjxDb250YWluZXJGaWxlRGF0YT59ICAqL1xuICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UHJvdmlkZXI8RmlsZVVwbG9hZEVudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5maWxlVXBsb2FkRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKEZpbGVVcGxvYWRFbnRyeSk7XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRmlsZVVwbG9hZC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShGaWxlVXBsb2FkLkNPTVBPTkVOVF9OQU1FKTtcblxuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtTaW1wbGVFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIHVwbG9hZEJveC5saXN0ZW5UbyhcImRyYWdvdmVyXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5kcmFnT3ZlcikpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcmFnbGVhdmVcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmRyYWdMZWF2ZSkpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcm9wXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5maWxlRHJvcHBlZCkpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZmlsZUlucHV0Q2xpY2tlZCkpO1xuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgICAgICBmaWxlSW5wdXQuY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm11bHRpcGxlXCIsIFwibXVsdGlwbGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgIGZpbGVJbnB1dC5saXN0ZW5UbyhcImNoYW5nZVwiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZmlsZUlucHV0Q2hhbmdlZCkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgZmlsZUlucHV0Q2xpY2tlZChldmVudCkge1xuICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgIGZpbGVJbnB1dC5jb250YWluZXJFbGVtZW50LnZhbHVlID0gbnVsbDtcbiAgICAgICAgZmlsZUlucHV0LmNvbnRhaW5lckVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZmlsZUlucHV0Q2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnByb2Nlc3NGaWxlcyhldmVudC5maWxlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB1cGxvYWRlZCBmaWxlcyBhbmQgdmFsaWRhdGUgYWdhaW5zdCBmaWxlIHR5cGUgYXJyYXlcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhW119IGZpbGVzXG4gICAgICovXG4gICAgYXN5bmMgcHJvY2Vzc0ZpbGVzKGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEZpbGVzID0gW107XG4gICAgICAgIGNvbnN0IHVuc3VwcG9ydGVkRmlsZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZEZpbGUgPSB0aGlzLmlzRmlsZVR5cGVTdXBwb3J0ZWQoZmlsZSk7XG4gICAgICAgICAgICBjb25zdCBmaWxlQWxyZWFkeVNlbGV0ZWQgPSB0aGlzLmZpbGVBbHJlYWR5U2VsZXRlZChmaWxlKTtcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWRGaWxlICYmICFmaWxlQWxyZWFkeVNlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdXBwb3J0ZWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIHN1cHBvcnRlZCBmaWxlc1xuICAgICAgICBpZiAoc3VwcG9ydGVkRmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHN1cHBvcnRlZEZpbGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS51cGRhdGUoZmlsZSwgZmlsZS5uYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2hvdyB1bnN1cHBvcnRlZCBmaWxlc1xuICAgICAgICB0aGlzLnNob3dVbnN1cHBvcnRlZEZpbGVzKHVuc3VwcG9ydGVkRmlsZXMpO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUZpbGVMaXN0KCk7XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdE1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkLkVWRU5UX0ZJTEVfQURERUQsIFtmaWxlXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWxlQWxyZWFkeVNlbGV0ZWQoZmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlQXJyYXlTdGF0ZS5vYmplY3RNYXAuaGFzKGZpbGUubmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZmlsZSB0eXBlIGlzIHN1cHBvcnRlZFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRmlsZURhdGF9IGZpbGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZpbGVUeXBlU3VwcG9ydGVkKGZpbGUpIHtcbiAgICAgICAgLy8gSWYgZmlsZVR5cGVBcnJheSBpcyBlbXB0eSwgYWNjZXB0IGFsbCBmaWxlc1xuICAgICAgICBpZiAodGhpcy5maWxlVHlwZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBmaWxlJ3MgTUlNRSB0eXBlIG1hdGNoZXMgYW55IGluIHRoZSBmaWxlVHlwZUFycmF5XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVUeXBlQXJyYXkuaW5jbHVkZXMoZmlsZS50eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHVuc3VwcG9ydGVkIGZpbGVzIGluIHRoZSB1bnN1cHBvcnRlZCBkaXZcbiAgICAgKiBAcGFyYW0ge0FycmF5PEZpbGU+fSB1bnN1cHBvcnRlZEZpbGVzXG4gICAgICovXG4gICAgc2hvd1Vuc3VwcG9ydGVkRmlsZXModW5zdXBwb3J0ZWRGaWxlcykge1xuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZERpdiA9IHRoaXMuY29tcG9uZW50LmdldChcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuXG4gICAgICAgIGlmICh1bnN1cHBvcnRlZEZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHVuc3VwcG9ydGVkRGl2LmNsZWFyKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdW5zdXBwb3J0ZWRGaWxlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gSFRNTC5jdXN0b20oXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiZmlsZS11cGxvYWQtdW5zdXBwb3J0ZWQtZmlsZVwiKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC5zZXRDaGlsZChgRmlsZSBcIiR7ZmlsZS5uYW1lfVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWREaXYuYWRkQ2hpbGQobWVzc2FnZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBkcmFnT3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIENTUy5mcm9tKHVwbG9hZEJveCkuZW5hYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZEJveCA9IHRoaXMuY29tcG9uZW50LmdldChcInVwbG9hZEJveFwiKTtcbiAgICAgICAgQ1NTLmZyb20odXBsb2FkQm94KS5kaXNhYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGZpbGVEcm9wcGVkKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZEJveCA9IHRoaXMuY29tcG9uZW50LmdldChcInVwbG9hZEJveFwiKTtcbiAgICAgICAgQ1NTLmZyb20odXBsb2FkQm94KS5kaXNhYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc0ZpbGVzKGV2ZW50LmZpbGVzKTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVGaWxlTGlzdCgpIHtcbiAgICAgICAgY29uc3QgZmlsZUxpc3QgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlTGlzdFwiKTtcbiAgICAgICAgZmlsZUxpc3QuY2xlYXIoKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdE1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gYXdhaXQgdGhpcy5maWxlVXBsb2FkRW50cnlQcm92aWRlci5nZXQoW2ZpbGVdKTtcbiAgICAgICAgICAgIGZpbGVFbnRyeS5ldmVudHMubGlzdGVuVG8oRmlsZVVwbG9hZEVudHJ5LkVWRU5UX1JFTU9WRV9DTElDS0VELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMucmVtb3ZlRmlsZUVudHJ5LCBbZmlsZUVudHJ5XSkpO1xuICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdFRvKGZpbGUubmFtZSwgbmV3IE1ldGhvZChmaWxlRW50cnksIGZpbGVFbnRyeS51cGRhdGVQcm9ncmVzcykpO1xuICAgICAgICAgICAgZmlsZUxpc3QuYWRkQ2hpbGQoZmlsZUVudHJ5LmNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqIEBwYXJhbSB7RmlsZX0gZmlsZVxuICAgICAqIEBwYXJhbSB7YW55fSBhcmdzXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlRmlsZUVudHJ5KGV2ZW50LCBmaWxlLCBhcmdzKSB7XG4gICAgICAgIHRoaXMuZmlsZUFycmF5U3RhdGUuZGVsZXRlKGZpbGUubmFtZSk7XG4gICAgICAgIC8vIENsZWFyIHVuc3VwcG9ydGVkIGZpbGVzIHdoZW4gdXBkYXRpbmcgZmlsZSBsaXN0XG4gICAgICAgIGNvbnN0IHVuc3VwcG9ydGVkRGl2ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICAgIHVuc3VwcG9ydGVkRGl2LmNsZWFyKCk7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgLy8gUHJldmVudCB0aGUgY2xpY2sgZXZlbnQgZnJvbSBidWJibGluZyB1cCB0byB0aGUgdXBsb2FkIGJveFxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcblxuICAgIH1cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJIaWRkZW5JbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIEhpZGRlbklucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJIaWRkZW5JbnB1dFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvaGlkZGVuSW5wdXQuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2hpZGRlbklucHV0LmNzc1wiO1xuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCkge1xuXG4gICAgICAgIHN1cGVyKEhpZGRlbklucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBcImhpZGRlbklucHV0XCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IE51bWJlclZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRleHRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIE51bWJlcklucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJOdW1iZXJJbnB1dFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvbnVtYmVySW5wdXQuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL251bWJlcklucHV0LmNzc1wiO1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIk51bWJlclwiO1xuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IE51bWJlcklucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoTnVtYmVySW5wdXQuQ09NUE9ORU5UX05BTUUsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgTnVtYmVyVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwibnVtYmVySW5wdXRcIixcbiAgICAgICAgICAgIFwibnVtYmVyRXJyb3JcIik7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJudW1iZXItaW5wdXQtZXJyb3IgbnVtYmVyLWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcIm51bWJlci1pbnB1dC1lcnJvciBudW1iZXItaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG59IiwiaW1wb3J0IHsgUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuICAgIFxuICAgIHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUGFzc3dvcmRJbnB1dFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRJbnB1dC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRJbnB1dC5jc3NcIjtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJQYXNzd29yZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQYXNzd29yZElucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkSW5wdXRcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRFcnJvclwiKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImVtYWlsLWlucHV0LWVycm9yIGVtYWlsLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IFBhc3N3b3JkVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSBleHRlbmRzIENvbW1vbklucHV0IHtcbiAgICBcbiAgICBzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIlBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuY3NzXCI7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiTmV3IHBhc3N3b3JkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuQ09NUE9ORU5UX05BTUUsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUGFzc3dvcmRWYWxpZGF0b3IobWFuZGF0b3J5KSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlRmllbGRcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUVycm9yXCIpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3IgcGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvci1oaWRkZW5cIik7IH1cbn0iLCJpbXBvcnQgeyBFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi8uLi9jb21tb25JbnB1dC5qc1wiO1xuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCBleHRlbmRzIENvbW1vbklucHV0IHtcbiAgICBcbiAgICBzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIlBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY3NzXCI7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiQ29uZmlybSBwYXNzd29yZFwiO1xuICAgIFxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsXG4gICAgICAgICAgIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IEVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yKG1hbmRhdG9yeSwgZmFsc2UsIG1vZGVsLCBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lKSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xGaWVsZFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xFcnJvclwiKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvci1oaWRkZW5cIik7IH1cbn0iLCJleHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVyTW9kZWwge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRyb2xQYXNzd29yZCA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0TmV3UGFzc3dvcmQobmV3UGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xuICAgIH1cblxuICAgIGdldE5ld1Bhc3N3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdQYXNzd29yZDtcbiAgICB9XG5cbiAgICBzZXRDb250cm9sUGFzc3dvcmQoY29udHJvbFBhc3N3b3JkKSB7XG4gICAgICAgIHRoaXMuY29udHJvbFBhc3N3b3JkID0gY29udHJvbFBhc3N3b3JkO1xuICAgIH1cblxuICAgIGdldENvbnRyb2xQYXNzd29yZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbFBhc3N3b3JkO1xuICAgIH1cblxufSIsImltcG9ydCB7IFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIEFuZFZhbGlkYXRvclNldCxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgUHJvcGVydHlBY2Nlc3NvciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJNb2RlbCB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlck1vZGVsLmpzXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dCB7XG5cblx0c3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJQYXNzd29yZE1hdGNoZXJJbnB1dFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXQuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0LmNzc1wiO1xuXG5cdHN0YXRpYyBFVkVOVF9WQUxJREFURURfRU5URVJFRCA9IFwidmFsaWRhdGVkRW50ZXJlZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udHJvbFBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLFxuICAgICAgICBtb2RlbCA9IG51bGwsXG4gICAgICAgIHBsYWNlaG9sZGVyID0gUGFzc3dvcmRNYXRjaGVySW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgXG4gICAgICAgIGNvbnRyb2xQbGFjZWhvbGRlciA9IFBhc3N3b3JkTWF0Y2hlcklucHV0LkRFRkFVTFRfQ09OVFJPTF9QTEFDRUhPTERFUixcbiAgICAgICAgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBbmRWYWxpZGF0b3JTZXR9ICovXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbnVsbDtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsID0gbmV3IFBhc3N3b3JkTWF0Y2hlck1vZGVsKCk7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZX0gKi9cblx0XHR0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLFxuICAgICAgICAgICAgW1wibmV3UGFzc3dvcmRcIiwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCwgcGxhY2Vob2xkZXIsIG1hbmRhdG9yeV1cblx0XHQpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sfSAqL1xuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLFxuICAgICAgICAgICAgW1wiY29udHJvbFBhc3N3b3JkXCIsIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwsIFwibmV3UGFzc3dvcmRcIiwgY29udHJvbFBsYWNlaG9sZGVyLCBtYW5kYXRvcnldXG5cdFx0KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBhd2FpdCB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTVBPTkVOVF9OQU1FKTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUGFzc3dvcmRNYXRjaGVySW5wdXQuQ09NUE9ORU5UX05BTUUpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiLHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiLHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNvbXBvbmVudCk7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmV2ZW50c1xuICAgICAgICAgICAgLmxpc3RlblRvKENvbW1vbklucHV0LkVWRU5UX0VOVEVSRUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5wYXNzd29yZFZhbHVlRW50ZXJlZCkpXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfS0VZVVBQRUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5wYXNzd29yZFZhbHVlQ2hhbmdlZCkpO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmV2ZW50c1xuICAgICAgICAgICAgLmxpc3RlblRvKENvbW1vbklucHV0LkVWRU5UX0VOVEVSRUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5wYXNzd29yZENvbnRyb2xFbnRlcmVkKSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBbmRWYWxpZGF0b3JTZXR9ICovXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbmV3IEFuZFZhbGlkYXRvclNldCgpXG4gICAgICAgICAgICAud2l0aFZhbGlkYXRvcih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUudmFsaWRhdG9yKVxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wudmFsaWRhdG9yKVxuICAgICAgICAgICAgLndpdGhWYWxpZExpc3RlbmVyKG5ldyBNZXRob2QodGhpcywgdGhpcy5wYXNzd29yZE1hdGNoZXJWYWxpZE9jY3VyZWQpKTtcblxuICAgIH1cblxuICAgIGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG4gICAgcGFzc3dvcmRNYXRjaGVyVmFsaWRPY2N1cmVkKCkge1xuICAgICAgICBQcm9wZXJ0eUFjY2Vzc29yLnNldFZhbHVlKHRoaXMubW9kZWwsIHRoaXMubmFtZSwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbC5nZXROZXdQYXNzd29yZCgpKVxuICAgIH1cblxuICAgIHBhc3N3b3JkVmFsdWVFbnRlcmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhc3N3b3JkVmFsdWVDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcGFzc3dvcmRDb250cm9sRW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFBhc3N3b3JkTWF0Y2hlcklucHV0LkVWRU5UX1ZBTElEQVRFRF9FTlRFUkVELCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmZvY3VzKCk7IH1cbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5zZWxlY3RBbGwoKTsgfVxuICAgIGVuYWJsZSgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmVuYWJsZSgpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5lbmFibGUoKTsgfVxuICAgIGRpc2FibGUoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5kaXNhYmxlKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmRpc2FibGUoKTsgfVxuICAgIGNsZWFyKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuY2xlYXIoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY2xlYXIoKTsgfVxufSIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IFBob25lVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQaG9uZUlucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgUGhvbmVJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUGhvbmVJbnB1dFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGhvbmVJbnB1dC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGhvbmVJbnB1dC5jc3NcIjtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJQaG9uZVwiO1xuICAgIFxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGhvbmVJbnB1dC5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBQaG9uZVZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBob25lSW5wdXRcIixcbiAgICAgICAgICAgIFwicGhvbmVFcnJvclwiKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInBob25lLWlucHV0LWVycm9yIHBob25lLWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInBob25lLWlucHV0LWVycm9yIHBob25lLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIEV2ZW50TWFuYWdlclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlJhZGlvQnV0dG9uXCIpO1xuXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b24ge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUmFkaW9CdXR0b25cIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3JhZGlvQnV0dG9uLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9yYWRpb0J1dHRvbi5jc3NcIjtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUmFkaW9CdXR0b24uQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUmFkaW9CdXR0b24uQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJyYWRpb1wiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9CdXR0b24uRVZFTlRfQ0xJQ0tFRCwgW2V2ZW50XSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIEV2ZW50XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb1RvZ2dsZVN3aXRjaFwiKTtcblxuZXhwb3J0IGNsYXNzIFJhZGlvVG9nZ2xlU3dpdGNoIHtcblxuICAgIHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUmFkaW9Ub2dnbGVTd2l0Y2hcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3JhZGlvVG9nZ2xlU3dpdGNoLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9yYWRpb1RvZ2dsZVN3aXRjaC5jc3NcIjtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfRU5BQkxFRCA9IENvbW1vbkV2ZW50cy5FTkFCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9ESVNBQkxFRCA9IENvbW1vbkV2ZW50cy5ESVNBQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfQ0hBTkdFRCA9IENvbW1vbkV2ZW50cy5DSEFOR0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShSYWRpb1RvZ2dsZVN3aXRjaC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShSYWRpb1RvZ2dsZVN3aXRjaC5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikubGlzdGVuVG8oXCJjaGFuZ2VcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZVN3aXRjaC5FVkVOVF9DSEFOR0VELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVTd2l0Y2guRVZFTlRfRU5BQkxFRCwgW2V2ZW50XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlU3dpdGNoLkVWRU5UX0RJU0FCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRvZ2dsZSBzdGF0ZSBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkIFxuICAgICAqL1xuICAgIHRvZ2dsZShjaGVja2VkKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQgPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2hhbmdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja2JveFwiKS5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdG9nZ2xlIHN0YXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgIH1cblxufSIsImltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgRXZlbnRNYW5hZ2VyLCBJbnB1dEVsZW1lbnREYXRhQmluZGluZywgT3B0aW9uRWxlbWVudCwgU2VsZWN0RWxlbWVudCB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJTZWxlY3RcIik7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Qge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiU2VsZWN0XCI7XG5cdHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2VsZWN0Lmh0bWxcIjtcblx0c3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2VsZWN0LmNzc1wiO1xuXG5cdHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJTZWxlY3RcIjtcblxuXHRzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtBcnJheTxPcHRpb25FbGVtZW50Pn0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBvcHRpb25zID0gW10sIHBsYWNlaG9sZGVyID0gU2VsZWN0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXk8T3B0aW9uRWxlbWVudD59ICovXG4gICAgICAgIHRoaXMub3B0aW9uc0FycmF5ID0gb3B0aW9ucztcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5tYW5kYXRvcnkgPSBtYW5kYXRvcnk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTZWxlY3QuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoU2VsZWN0LkNPTVBPTkVOVF9OQU1FKTtcblxuXHRcdC8qKiBAdHlwZSB7U2VsZWN0RWxlbWVudH0gKi9cblx0XHRjb25zdCBzZWxlY3QgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJzZWxlY3RcIik7XG5cbiAgICAgICAgc2VsZWN0Lm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpKTtcbiAgICAgICAgfVxuXG5cdFx0aWYgKHRoaXMub3B0aW9uc0FycmF5ICYmIHRoaXMub3B0aW9uc0FycmF5Lmxlbmd0aCA+IDApIHtcblx0XHRcdHNlbGVjdC5vcHRpb25zID0gdGhpcy5vcHRpb25zQXJyYXk7XG5cdFx0fVxuXG4gICAgICAgIHNlbGVjdC5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbGlja2VkKSk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0FycmF5PE9wdGlvbkVsZW1lbnQ+fSBvcHRpb25zQXJyYXlcblx0ICovXG5cdHNldCBvcHRpb25zKG9wdGlvbnNBcnJheSkge1xuXHRcdHRoaXMub3B0aW9uc0FycmF5ID0gb3B0aW9uc0FycmF5O1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xuXHRcdFx0LyoqIEB0eXBlIHtTZWxlY3RFbGVtZW50fSAqL1xuXHRcdFx0Y29uc3Qgc2VsZWN0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpO1xuXHRcdFx0aWYgKHNlbGVjdCAmJiB0aGlzLm9wdGlvbnNBcnJheSAmJiB0aGlzLm9wdGlvbnNBcnJheS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHNlbGVjdC5vcHRpb25zID0gdGhpcy5vcHRpb25zQXJyYXk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2VsZWN0LkVWRU5UX0NMSUNLRUQsIFtldmVudF0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dFwiO1xuaW1wb3J0IHsgUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRleHRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiVGV4dElucHV0XCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90ZXh0SW5wdXQuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RleHRJbnB1dC5jc3NcIjtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJUZXh0XCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFRleHRJbnB1dC5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBSZXF1aXJlZFZhbGlkYXRvcihmYWxzZSwgbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJ0ZXh0SW5wdXRcIixcbiAgICAgICAgICAgIFwidGV4dEVycm9yXCIpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwidGV4dC1pbnB1dC1lcnJvciB0ZXh0LWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInRleHQtaW5wdXQtZXJyb3IgdGV4dC1pbnB1dC1lcnJvci1oaWRkZW5cIik7IH1cbn0iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiTG9nZ2VyIiwiSW5qZWN0aW9uUG9pbnQiLCJDb21wb25lbnRGYWN0b3J5IiwiVGltZVByb21pc2UiLCJDYW52YXNTdHlsZXMiLCJTdHlsZSIsIkNvbnRhaW5lckFzeW5jIiwiRXZlbnRNYW5hZ2VyIiwiQ1NTIiwiTWV0aG9kIiwiTGlzdCIsIk5hdmlnYXRpb24iLCJDYW52YXNSb290IiwiQ29udGFpbmVyRWxlbWVudFV0aWxzIiwiSFRNTCIsIklucHV0RWxlbWVudERhdGFCaW5kaW5nIiwiU3RhdGVNYW5hZ2VyIiwiTWFwIiwiTE9HIiwiRW1haWxWYWxpZGF0b3IiLCJOdW1iZXJWYWxpZGF0b3IiLCJSZXF1aXJlZFZhbGlkYXRvciIsIlBhc3N3b3JkVmFsaWRhdG9yIiwiRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IiLCJBbmRWYWxpZGF0b3JTZXQiLCJQcm9wZXJ0eUFjY2Vzc29yIiwiUGhvbmVWYWxpZGF0b3IiLCJUZXh0SW5wdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUI7QUFDQSxJQUFJLE9BQU8sV0FBVyxHQUFHLGNBQWMsQ0FBQztBQUN4QyxJQUFJLE9BQU8sVUFBVSxHQUFHLFlBQVksQ0FBQztBQUNyQyxJQUFJLE9BQU8sV0FBVyxHQUFHLGFBQWEsQ0FBQztBQUN2QyxJQUFJLE9BQU8sVUFBVSxHQUFHLFlBQVksQ0FBQztBQUNyQztBQUNBLElBQUksT0FBTyxhQUFhLEdBQUcsZUFBZSxDQUFDO0FB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
