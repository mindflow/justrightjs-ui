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
     * @param {Event} event 
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

	async play() {
		await containerbridge_v1.ContainerAsync.pause(100);
		/** @type {VideoElement} */
		const video = this.component.get("video");
		video.mute();
		video.play();
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

        this.component.get("bannerLabelMessageCloseButton").listenTo("click", () => {
            this.eventManager.trigger(BannerLabelMessage.EVENT_CLOSE_CLICKED);
        });
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

    static EVENT_CLICKED = "click";

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
    }
    
    postConfig() {
        this.component = this.componentFactory.create(DialogBox.COMPONENT_NAME);
        this.component.set("backShadeContainer", this.backShade.component);
        this.component.get("closeButton").listenTo("click", new coreutil_v1.Method(this, this.close));
        justright_core_v1.CanvasRoot.listenToFocusEscape(new coreutil_v1.Method(this, this.close), this.component.get("dialogBoxOverlay"));
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
     * @param {Event} event 
     * @returns 
     */
    hide(event) {
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
     * @param {Event} event 
     * @param {Array<string>} temporaryOptions
     * @returns 
     */
    show(event, temporaryOptions) {
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
        return coreutil_v1.TimePromise.asPromise(100,  () => {
                this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-block dialogbox-overlay-show");
            }
        );
    }

    getDialogBoxOverlay() { return this.component.get("dialogBoxOverlay"); }

    getDialogBox() { return this.component.get("dialogBox"); }

    scrollLock() {
        containerbridge_v1.ContainerElement.scrollLockTo(this.component.get("dialogBoxContent").element, 0, 0, 1000);
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
     * @param {Event} event 
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
        this.component.get("content").element.focus();
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
     * @param {Event} event 
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

    static get EVENT_CLICKED() { return "clicked"; }
    static get EVENT_ENTERED() { return "entered"; }
    static get EVENT_KEYUPPED() { return "keyUpped"; }
    static get EVENT_CHANGED() { return "changd"; }
    static get EVENT_BLURRED() { return "blurred"; }

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
        inputElementId = "input",
        errorElementId = "error") {


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

        this.eventManager = new justright_core_v1.EventManager();
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentName);

        justright_core_v1.CanvasStyles.enableStyle(this.componentName, this.component.componentIndex);

        this.component.get(this.inputElementId).setAttributeValue("name", this.name);
        this.component.get(this.inputElementId).setAttributeValue("placeholder", ":  " +  this.placeholder);

        if(this.validator) {
            this.validator.withValidListener(new coreutil_v1.Method(this,this.hideValidationError));
        }

        if(this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
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

        this.component.get(this.errorElementId)
            .listenTo("click", new coreutil_v1.Method(this, this.errorClicked));
    }

    get events() { return this.eventManager; }

    /**
     * 
     * @param {Event} event 
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
     * @param {Event} event 
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

	static COMPONENT_NAME = "LinkPanel";
    static TEMPLATE_URL = "/assets/justrightjs-ui/linkPanel.html";
    static STYLES_URL = "/assets/justrightjs-ui/linkPanel.css";

    static EVENT_CLICKED = "click";

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

const LOG$2 = new coreutil_v1.Logger("TreePanelEntry");

class TreePanelEntry {

	static COMPONENT_NAME = "TreePanelEntry";
	static TEMPLATE_URL = "/assets/justrightjs-ui/treePanelEntry.html";
	static STYLES_URL = "/assets/justrightjs-ui/treePanelEntry.css";

	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";

    constructor(showExpandButton = false, record = null) {

		/** @type {boolean} */
		this.showExpandButton = showExpandButton;

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
		this.treePanelEntryProvier = mindi_v1.InjectionPoint.provider(TreePanelEntry);

		/** @type {Button} */
		this.expandButton = mindi_v1.InjectionPoint.instance(Button, ["+", Button.TYPE_PRIMARY]);

        /** @type {any} */
        this.record = record;
    }

    async postConfig() {
		this.component = this.componentFactory.create(TreePanelEntry.COMPONENT_NAME);
		justright_core_v1.CanvasStyles.enableStyle(TreePanelEntry.COMPONENT_NAME);

		this.expandButton.events.listenTo(Button.EVENT_CLICKED, new coreutil_v1.Method(this, this.loadSubRecordsClicked));

		this.component.setChild("expandButton", this.expandButton.component);

		if (!this.showExpandButton) {
			this.component.get("subrecordIndent").remove();
			this.component.get("recordElementContainer").remove();
		}

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
        const recordElement = await this.eventManager.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [null, record]);
        
		if (!recordElement) {
			return;
		}
		
		const treePanelEntry = await this.treePanelEntryProvier.get([true, record]);
		treePanelEntry.component.setChild("recordElement", recordElement.component);

		treePanelEntry.events
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, new coreutil_v1.Method(this, this.entryRequested));

		treePanelEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, new coreutil_v1.Method(this, this.subRecordsUpdateRequested));
	
		panel.component.addChild("panel", treePanelEntry.component);
    }

	/**
	 * @param {Event} event 
	 * @param {any} record
	 */
	async entryRequested(event, record) {
		try {
			return await this.events.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [event, record]);
		} catch (error) {
			LOG$2.error(error);
		}
	}

	/**
	 * @param {Event} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 */
	async subRecordsUpdateRequested(event, record, stateManager) {
		try {
			await this.events
				.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager]);
		} catch (error) {
			LOG$2.error(error);
		}
	}

	/**
	 * @param {Event} event 
	 */
    loadSubRecordsClicked(event) {
        this.eventManager
			.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, this.record, this.arrayState]);
    }

}

const LOG$1 = new coreutil_v1.Logger("TreePanel");

class TreePanel {

	static COMPONENT_NAME = "TreePanel";
	static TEMPLATE_URL = "/assets/justrightjs-ui/treePanel.html";
	static STYLES_URL = "/assets/justrightjs-ui/treePanel.css";

	static EVENT_REFRESH_CLICKED = "refreshClicked";
	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";


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
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, new coreutil_v1.Method(this, this.subRecordsUpdateRequested));

	}

	/**
	 * @type { EventManager }
	 */
	get events() { return this.eventManager; }

	/**
	 * Called by the root TreePanelEntry when it's or one of it's subordinate elements need to be rendered
	 * 
	 * @param {Event} event 
	 * @param {any} record
	 */
	async entryRequested(event, record) {
		try {
			return await this.events.trigger(TreePanel.RECORD_ELEMENT_REQUESTED, [event, record]);
		} catch (error) {
			LOG$1.error(error);
		}
	}

	/**
	 * Called by the root TreePanelEntry when it's or one of it's subordinate elements need the state of the subrecords to be updated,
	 * for example when the expand button is clicked
	 * 
	 * @param {Event} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 * @returns {Promise<TreePanelEntry[]>}
	 */
	async subRecordsUpdateRequested(event, record, stateManager) {
		try {
			return await this.events.trigger(TreePanel.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager]);
		} catch (error) {
			LOG$1.error(error);
		}
	}

	/**
	 * Reset
	 * 
	 * @param {Event} event 
	 */
	async reset(event) {
		await this.subRecordsUpdateRequested(event, null, this.treePanelEntry.arrayState);
		this.component.setChild("rootelement", this.treePanelEntry.component);
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
    
    static EVENT_CLICKED = "click";

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
        this.component.get("radioButton").setAttributeValue("name",this.name);

        if (this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("radioButton"));
        }

        this.component.get("radioButton").listenTo("click", new coreutil_v1.Method(this, this.clicked));
    }

    clicked(event) {
        this.events.trigger(RadioButton.EVENT_CLICKED, [event]);
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

const LOG = new coreutil_v1.Logger("ToggleSwitch");

class ToggleSwitch {

    static COMPONENT_NAME = "ToggleSwitch";
    static TEMPLATE_URL = "/assets/justrightjs-ui/toggleSwitch.html";
    static STYLES_URL = "/assets/justrightjs-ui/toggleSwitch.css";
    
    static EVENT_ENABLED = "enabled";
    static EVENT_DISABLED = "disabled";
    static EVENT_CHANGED = "changed";

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
        this.component = this.componentFactory.create(ToggleSwitch.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(ToggleSwitch.COMPONENT_NAME);

        if (this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("toggleSwitch"));
        }

        this.component.get("toggleSwitch").listenTo("change", new coreutil_v1.Method(this, this.toggled));
    }

    /**
     * 
     * @param {Event} event 
     */
    toggled(event) {
        const oldValue = this.checked;
        this.checked = event.target.mappedElement.checked;

        if (oldValue !== this.checked) {
            this.events.trigger(ToggleSwitch.EVENT_CHANGED, [event]);
        }

        if (this.checked) {
            this.events.trigger(ToggleSwitch.EVENT_ENABLED, [event]);
        } else {
            this.events.trigger(ToggleSwitch.EVENT_DISABLED, [event]);
        }
        
    }

    clicked(event) {
        // Additional click handling if needed
        LOG.info("Toggle switch clicked");
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
            this.component.get("toggleSwitch").mappedElement.click();
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

exports.BackShade = BackShade;
exports.BackShadeListeners = BackShadeListeners;
exports.Background = Background;
exports.BackgroundVideo = BackgroundVideo;
exports.BannerLabel = BannerLabel;
exports.BannerLabelMessage = BannerLabelMessage;
exports.BannerMessage = BannerMessage;
exports.Button = Button;
exports.CheckBox = CheckBox;
exports.CommonInput = CommonInput;
exports.CustomAppearance = CustomAppearance;
exports.Dependencies = Dependencies;
exports.DialogBox = DialogBox;
exports.DropDownPanel = DropDownPanel;
exports.EmailInput = EmailInput;
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
exports.SlideDeck = SlideDeck;
exports.SlideDeckEntry = SlideDeckEntry;
exports.TextInput = TextInput$1;
exports.ToggleSwitch = ToggleSwitch;
exports.TreePanel = TreePanel;
exports.TreePanelEntry = TreePanelEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGVwZW5kZW5jaWVzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrZ3JvdW5kVmlkZW8vYmFja2dyb3VuZFZpZGVvLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTGFiZWwvYmFubmVyTGFiZWxNZXNzYWdlL2Jhbm5lckxhYmVsTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTWVzc2FnZS9iYW5uZXJNZXNzYWdlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYnV0dG9uL2J1dHRvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9kcm9wRG93blBhbmVsL2Ryb3BEb3duUGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9kcm9wVXBQYW5lbC9wb3BVcFBhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvY29tbW9uSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9saW5rUGFuZWwvbGlua1BhbmVsLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvcGFuZWwvcGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9zbGlkZURlY2svc2xpZGVEZWNrRW50cnkvc2xpZGVEZWNrRW50cnkuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9zbGlkZURlY2svc2xpZGVEZWNrLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvdHJlZVBhbmVsL3RyZWVQYW5lbEVudHJ5L3RyZWVQYW5lbEVudHJ5LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvdHJlZVBhbmVsL3RyZWVQYW5lbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvZW1haWxJbnB1dC9lbWFpbElucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvbnVtYmVySW5wdXQvbnVtYmVySW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZElucHV0L3Bhc3N3b3JkSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVyTW9kZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bob25lSW5wdXQvcGhvbmVJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3JhZGlvQnV0dG9uL3JhZGlvQnV0dG9uLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvdGV4dElucHV0L3RleHRJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3RvZ2dsZVN3aXRjaC90b2dnbGVTd2l0Y2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEN1c3RvbUFwcGVhcmFuY2Uge1xuXG4gICAgc3RhdGljIFNJWkVfREVGQVVMID0gXCJzaXplLWRlZmF1bHRcIjtcbiAgICBzdGF0aWMgU0laRV9TTUFMTCA9IFwic2l6ZS1zbWFsbFwiO1xuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwic2l6ZS1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwic2l6ZS1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNIQVBFX0RFQUZVTFQgPSBcInNoYXBlLWRlZmF1bHRcIjtcbiAgICBzdGF0aWMgU0hBUEVfUk9VTkQgPSBcInNoYXBlLXJvdW5kXCI7XG4gICAgc3RhdGljIFNIQVBFX1NRVUFSRSA9IFwic2hhcGUtc3F1YXJlXCI7XG5cbiAgICBzdGF0aWMgVklTSUJJTElUWV9ERUFGVUxUID0gXCJ2aXNpYmlsaXR5LWRlZmF1bHRcIjtcbiAgICBzdGF0aWMgVklTSUJJTElUWV9WSVNJQkxFID0gXCJ2aXNpYmlsaXR5LXZpc2libGVcIjtcbiAgICBzdGF0aWMgVklTSUJJTElUWV9ISURERU4gPSBcInZpc2liaWxpdHktaGlkZGVuXCI7XG5cbiAgICBzdGF0aWMgU1BBQ0lOR19ERUZBVUxUID0gXCJzcGFjaW5nLWRlZmF1bHRcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19OT05FID0gXCJzcGFjaW5nLW5vbmVcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19BQk9WRSA9IFwic3BhY2luZy1hYm92ZVwiO1xuICAgIHN0YXRpYyBTUEFDSU5HX0JFTE9XID0gXCJzcGFjaW5nLWJlbG93XCI7XG4gICAgc3RhdGljIFNQQUNJTkdfQUJPVkVfQkVMT1cgPSBcInNwYWNpbmctYWJvdmUtYmVsb3dcIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNpemUgPSBDdXN0b21BcHBlYXJhbmNlLlNJWkVfREVGQVVMVDtcbiAgICAgICAgdGhpcy5zaGFwZSA9IEN1c3RvbUFwcGVhcmFuY2UuU0hBUEVfREVBRlVMVDtcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gQ3VzdG9tQXBwZWFyYW5jZS5TUEFDSU5HX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IEN1c3RvbUFwcGVhcmFuY2UuVklTSUJJTElUWV9ERUFGVUxUO1xuICAgICAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHdpdGhTaXplKHNpemUpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFNoYXBlKHNoYXBlKSB7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFNwYWNpbmcoc3BhY2luZykge1xuICAgICAgICB0aGlzLnNwYWNpbmcgPSBzcGFjaW5nO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB3aXRoVmlzaWJpbGl0eSh2aXNpYmlsaXR5KSB7XG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IHZpc2liaWxpdHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuXG5leHBvcnQgY2xhc3MgRGVwZW5kZW5jaWVzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudENsYXNzID0gQ29tcG9uZW50O1xuICAgIH1cblxufSIsImltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlTGlzdGVuZXJzIHtcblxuICAgIGNvbnN0cnVjdG9yKGV4aXN0aW5nTGlzdGVuZXJzID0gbnVsbCkge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgPSAoZXhpc3RpbmdMaXN0ZW5lcnMgJiYgZXhpc3RpbmdMaXN0ZW5lcnMuZ2V0QmFja2dyb3VuZENsaWNrZWQpID8gZXhpc3RpbmdMaXN0ZW5lcnMuZ2V0QmFja2dyb3VuZENsaWNrZWQoKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgXG4gICAgICovXG4gICAgd2l0aEJhY2tncm91bmRDbGlja2VkKGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyID0gYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBnZXRCYWNrZ3JvdW5kQ2xpY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBjYWxsQmFja2dyb3VuZENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyLCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNhbGxMaXN0ZW5lcihsaXN0ZW5lciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKG51bGwgIT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQmFzZUVsZW1lbnRcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQmFja1NoYWRlTGlzdGVuZXJzIH0gZnJvbSBcIi4vYmFja1NoYWRlTGlzdGVuZXJzLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGUge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiQmFja1NoYWRlXCI7XG5cdHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYWNrU2hhZGUuY3NzXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihiYWNrU2hhZGVMaXN0ZW5lcnMgPSBuZXcgQmFja1NoYWRlTGlzdGVuZXJzKCkpe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0Jhc2VFbGVtZW50fSAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtCYWNrU2hhZGVMaXN0ZW5lcnN9ICovXG4gICAgICAgIHRoaXMuYmFja1NoYWRlTGlzdGVuZXJzID0gYmFja1NoYWRlTGlzdGVuZXJzO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblx0fVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSk7XG4gICAgfVxuXG4gICAgaGlkZUFmdGVyKG1pbGxpU2Vjb25kcykge1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7cmVzb2x2ZSgpO30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGVcIik7XG4gICAgICAgIGNvbnN0IGhpZGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKG1pbGxpU2Vjb25kcyxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGlzYWJsZVN0eWxlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZShtaWxsaVNlY29uZHMgKyAxLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2VdKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsXG4gICAgICAgICAgICAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlIHNob3dcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5LCBDYW52YXNTdHlsZXMsIFN0eWxlIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrZ3JvdW5kXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZCB7XG5cblx0c3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJCYWNrZ3JvdW5kXCI7XG5cdHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja2dyb3VuZC5odG1sXCI7XG5cdHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tncm91bmQuY3NzXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihiYWNrZ3JvdW5kSW1hZ2VQYXRoKXtcblx0XHQvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge3N0cmluZ30gKi9cblx0XHR0aGlzLmJhY2tncm91bmRJbWFnZVBhdGggPSBiYWNrZ3JvdW5kSW1hZ2VQYXRoO1xuXHR9XG5cblx0c2V0KGtleSx2YWwpIHtcblx0XHR0aGlzLmNvbXBvbmVudC5zZXQoa2V5LHZhbCk7XG5cdH1cblxuXHRwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYWNrZ3JvdW5kLkNPTVBPTkVOVF9OQU1FKTtcblx0XHRpZiAodGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoKSB7XG4gICAgICAgICAgICBTdHlsZS5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJhY2tncm91bmRcIikpXG4gICAgICAgICAgICAgICAgLnNldChcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoXFxcIlwiICsgdGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoICsgXCJcXFwiKVwiKTtcblx0XHR9XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmQuQ09NUE9ORU5UX05BTUUpO1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBWaWRlb0VsZW1lbnQsIENhbnZhc1N0eWxlcywgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb250YWluZXJBc3luYyB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIlxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja2dyb3VuZFZpZGVvXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZFZpZGVvIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkJhY2tncm91bmRWaWRlb1wiO1xuXHRzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tncm91bmRWaWRlby5odG1sXCI7XG5cdHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tncm91bmRWaWRlby5jc3NcIjtcblxuICAgIGNvbnN0cnVjdG9yKHZpZGVvU3JjKXtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnZpZGVvU3JjID0gdmlkZW9TcmM7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmRWaWRlby5DT01QT05FTlRfTkFNRSk7XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmRWaWRlby5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwic291cmNlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwic3JjXCIsIHRoaXMudmlkZW9TcmMpO1xuXHR9XG5cblx0YXN5bmMgcGxheSgpIHtcblx0XHRhd2FpdCBDb250YWluZXJBc3luYy5wYXVzZSgxMDApO1xuXHRcdC8qKiBAdHlwZSB7VmlkZW9FbGVtZW50fSAqL1xuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidmlkZW9cIik7XG5cdFx0dmlkZW8ubXV0ZSgpO1xuXHRcdHZpZGVvLnBsYXkoKTtcblx0fVxuXG59IiwiaW1wb3J0IHsgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcywgQ29tcG9uZW50RmFjdG9yeSwgQ1NTLCBFdmVudE1hbmFnZXIsIFN0eWxlIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi8uLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJMYWJlbE1lc3NhZ2Uge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJhbm5lckxhYmVsTWVzc2FnZVwiOyB9XG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFubmVyTGFiZWxNZXNzYWdlLmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJMYWJlbE1lc3NhZ2UuY3NzXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgRVZFTlRfQ0xPU0VfQ0xJQ0tFRCgpIHsgcmV0dXJuIFwiY2xvc2VDbGlja2VkXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgVFlQRV9BTEVSVCgpIHsgcmV0dXJuIFwidHlwZS1hbGVydFwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX0lORk8oKSB7IHJldHVybiBcInR5cGUtaW5mb1wiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSB7IHJldHVybiBcInR5cGUtc3VjY2Vzc1wiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1dBUk5JTkcoKSB7IHJldHVybiBcInR5cGUtd2FybmluZ1wiOyB9XG5cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBiYW5uZXJUeXBlID0gQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfSU5GTywgY3VzdG9tQXBwZWFyYW5jZSA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaGVhZGVyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYW5uZXJUeXBlID0gYmFubmVyVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge0N1c3RvbUFwcGVhcmFuY2V9ICovXG4gICAgICAgIHRoaXMuY3VzdG9tQXBwZWFyYW5jZSA9IGN1c3RvbUFwcGVhcmFuY2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYW5uZXJMYWJlbE1lc3NhZ2UuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTGFiZWxNZXNzYWdlLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ1NTLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2VcIilcbiAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1cIiArIHRoaXMuYmFubmVyVHlwZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZSAmJiB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgIENTUy5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZSAmJiB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSkge1xuICAgICAgICAgICAgQ1NTLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UgJiYgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNwYWNpbmcpIHtcbiAgICAgICAgICAgIENTUy5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZUNsb3NlQnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIENTUy5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgLmRpc2FibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgU3R5bGUuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VcIikpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgU3R5bGUuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VcIikpXG4gICAgICAgICAgICAuc2V0KFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuXG4gICAgICAgIFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgQ1NTLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5kaXNhYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldCBtZXNzYWdlQ29udGVudEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VDb250ZW50XCIpO1xuICAgIH1cblxuICAgIHNldE1lc3NhZ2UoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlIZWFkZXIoaGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZUhlYWRlclwiKS5zZXRDaGlsZCh0aGlzLmhlYWRlcik7XG4gICAgfVxuXG4gICAgYXBwbHlNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlVGV4dFwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cblxufSIsImltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5pbXBvcnQgeyBCYW5uZXJMYWJlbE1lc3NhZ2UgfSBmcm9tIFwiLi9iYW5uZXJMYWJlbE1lc3NhZ2UvYmFubmVyTGFiZWxNZXNzYWdlLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJMYWJlbCB7XG5cblx0c3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJCYW5uZXJMYWJlbFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFubmVyTGFiZWwuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lckxhYmVsLmNzc1wiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdHRoaXMuYXBwZWFyYW5jZSA9IG5ldyBDdXN0b21BcHBlYXJhbmNlKClcblx0XHRcdC53aXRoU2l6ZShDdXN0b21BcHBlYXJhbmNlLlNJWkVfU01BTEwpXG5cdFx0XHQud2l0aFNoYXBlKEN1c3RvbUFwcGVhcmFuY2UuU0hBUEVfUk9VTkQpXG5cdFx0XHQud2l0aFNwYWNpbmcoQ3VzdG9tQXBwZWFyYW5jZS5TUEFDSU5HX0JFTE9XKTtcblxuXHRcdC8qKiBAdHlwZSB7QmFubmVyTGFiZWxNZXNzYWdlfSAqL1xuXHRcdHRoaXMuc3VjY2VzcyA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfU1VDQ0VTUywgdGhpcy5hcHBlYXJhbmNlXSk7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsTWVzc2FnZX0gKi9cblx0XHR0aGlzLndhcm5pbmcgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX1dBUk5JTkcsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG5cdFx0LyoqIEB0eXBlIHtCYW5uZXJMYWJlbE1lc3NhZ2V9ICovXG5cdFx0dGhpcy5lcnJvciA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfQUxFUlQsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lckxhYmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lckxhYmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5zdWNjZXNzLmhpZGUoKTtcbiAgICAgICAgdGhpcy53YXJuaW5nLmhpZGUoKTtcbiAgICAgICAgdGhpcy5lcnJvci5oaWRlKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLmFkZENoaWxkKHRoaXMuc3VjY2Vzcy5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5hZGRDaGlsZCh0aGlzLndhcm5pbmcuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuYWRkQ2hpbGQodGhpcy5lcnJvci5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSkpO1xuICAgICAgICB0aGlzLndhcm5pbmcuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSkpO1xuICAgICAgICB0aGlzLmVycm9yLmV2ZW50TWFuYWdlci5saXN0ZW5UbyhCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpKTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLnN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzaG93U3VjY2VzcyhoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93QmFubmVyKHRoaXMuc3VjY2VzcywgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIHNob3dXYXJuaW5nKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy53YXJuaW5nLCBoZWFkZXIsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgc2hvd0Vycm9yKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy5lcnJvciwgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIGhpZGUoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhbm5lci1sYWJlbCBiYW5uZXItbGFiZWwtaGlkZGVuXCIpO1xuICAgICAgICB0aGlzLmFjdGl2ZS5oaWRlKCk7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCYW5uZXJMYWJlbE1lc3NhZ2V9IGJhbm5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqL1xuICAgICBzaG93QmFubmVyKGJhbm5lciwgaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXHRcdGJhbm5lci5zZXRNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSk7XG4gICAgICAgIGJhbm5lci5zaG93KCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYW5uZXItbGFiZWwgYmFubmVyLWxhYmVsLXZpc2libGVcIik7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcblx0XHR0aGlzLmFjdGl2ZSA9IGJhbm5lcjtcbiAgICB9XG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnRcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhbm5lck1lc3NhZ2VcIik7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJNZXNzYWdlIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkJhbm5lck1lc3NhZ2VcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lck1lc3NhZ2UuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lck1lc3NhZ2UuY3NzXCI7XG5cbiAgICBzdGF0aWMgVFlQRV9BTEVSVCA9IFwidHlwZS1hbGVydFwiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcInR5cGUtaW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcInR5cGUtc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcInR5cGUtd2FybmluZ1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhbm5lclR5cGUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjbG9zZWFibGUgXG4gICAgICogQHBhcmFtIHtDdXN0b21BcHBlYXJhbmNlfSBjdXN0b21BcHBlYXJhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lck1lc3NhZ2UuVFlQRV9JTkZPLCBjbG9zZWFibGUgPSBmYWxzZSwgY3VzdG9tQXBwZWFyYW5jZSA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYW5uZXJUeXBlID0gYmFubmVyVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge01ldGhvZH0gKi9cbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkJhbm5lck1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQoXCJBbGVydFwiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZU1lc3NhZ2VcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBmYWRlXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsdGhpcy5oaWRlKSk7XG4gICAgfVxuXG4gICAgYXBwbHlDbGFzc2VzKGJhc2VDbGFzc2VzKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gYmFzZUNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmJhbm5lclR5cGU7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLGNsYXNzZXMpO1xuICAgIH1cbiAgICBcbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGNsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25IaWRlTGlzdGVuZXIgXG4gICAgICovXG4gICAgb25IaWRlKG9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBvbkhpZGVMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25TaG93TGlzdGVuZXIgXG4gICAgICovXG4gICAgb25TaG93KG9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBvblNob3dMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGhpZGVcIik7XG4gICAgICAgIGF3YWl0IFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MDAsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vbkhpZGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzaG93KG5ld0hlYWRlciA9IG51bGwsIG5ld01lc3NhZ2UgPSBudWxsKSB7XG4gICAgICAgIGlmIChuZXdIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlIZWFkZXIobmV3SGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3TWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1lc3NhZ2UobmV3TWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UuQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICBhd2FpdCBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLCgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIHNob3dcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLm9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyLmNhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBDU1MsXG4gICAgSFRNTFxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQnV0dG9uXCIpO1xuXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkJ1dHRvblwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYnV0dG9uLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9idXR0b24uY3NzXCI7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJidXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwiYnV0dG9uLXNlY29uZGFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcImJ1dHRvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwiYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJidXR0b24td2FybmluZ1wiO1xuICAgIHN0YXRpYyBUWVBFX0RBTkdFUiA9IFwiYnV0dG9uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJidXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJidXR0b24tZGFya1wiO1xuXG4gICAgc3RhdGljIFNJWkVfTUVESVVNID0gXCJidXR0b24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNQSU5ORVJfVklTSUJMRSA9IFwiYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLXZpc2libGVcIjtcbiAgICBzdGF0aWMgU1BJTk5FUl9ISURERU4gPSBcImJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIjtcblxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gXCJjbGlja1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJ1dHRvblR5cGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWNvbkNsYXNzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGJ1dHRvblR5cGUgPSBCdXR0b24uVFlQRV9QUklNQVJZLCBidXR0b25TaXplID0gQnV0dG9uLlNJWkVfTUVESVVNLCBpY29uQ2xhc3MpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5idXR0b25UeXBlID0gYnV0dG9uVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5idXR0b25TaXplID0gYnV0dG9uU2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8QnV0dG9uPn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8QnV0dG9uPn0gKi9cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkJ1dHRvblwiKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJ1dHRvbi5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIGlmICh0aGlzLmljb25DbGFzcykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmFkZENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBDU1MuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYnV0dG9uXCIpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuYnV0dG9uU2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5idXR0b25UeXBlKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihCdXR0b24uRVZFTlRfQ0xJQ0tFRCwgZXZlbnQpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG1ldGhvZCBcbiAgICAgKi9cbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihtZXRob2QpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbWV0aG9kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZW5hYmxlTG9hZGluZygpIHtcbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lckNvbnRhaW5lclwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKEJ1dHRvbi5TUElOTkVSX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUoQnV0dG9uLlNQSU5ORVJfVklTSUJMRSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxvYWRpbmcoKSB7XG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJDb250YWluZXJcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShCdXR0b24uU1BJTk5FUl9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShCdXR0b24uU1BJTk5FUl9ISURERU4pO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDYW52YXNSb290LFxuICAgIEV2ZW50LFxuICAgIE5hdmlnYXRpb25cbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBUaW1lUHJvbWlzZSwgTG9nZ2VyLCBNZXRob2QsIExpc3QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGUgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZS5qc1wiO1xuaW1wb3J0IHsgQmFja1NoYWRlTGlzdGVuZXJzIH0gZnJvbSBcIi4uL2JhY2tTaGFkZS9iYWNrU2hhZGVMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckVsZW1lbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRpYWxvZ0JveFwiKTtcblxuZXhwb3J0IGNsYXNzIERpYWxvZ0JveCB7XG5cblx0c3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJEaWFsb2dCb3hcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2RpYWxvZ0JveC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZGlhbG9nQm94LmNzc1wiO1xuICAgIFxuICAgIHN0YXRpYyBPUFRJT05fQkFDS19PTl9DTE9TRSA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0T3B0aW9ucyA9IFtdKXtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7QmFja1NoYWRlfSAqL1xuICAgICAgICB0aGlzLmJhY2tTaGFkZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEJhY2tTaGFkZSwgW1xuICAgICAgICAgICAgbmV3IEJhY2tTaGFkZUxpc3RlbmVycygpXG4gICAgICAgICAgICAgICAgLndpdGhCYWNrZ3JvdW5kQ2xpY2tlZChuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSkpXSk7XG5cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc3dhbGxvd0ZvY3VzRXNjYXBlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5vd25pbmdUcmlnZ2VyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0xpc3Q8c3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IG5ldyBMaXN0KGRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvKiogQHR5cGUge0xpc3Q8c3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IExpc3QoZGVmYXVsdE9wdGlvbnMpO1xuICAgIH1cbiAgICBcbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0KFwiYmFja1NoYWRlQ29udGFpbmVyXCIsIHRoaXMuYmFja1NoYWRlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNsb3NlQnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsb3NlKSk7XG4gICAgICAgIENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZShuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xvc2UpLCB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hPdmVybGF5XCIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBcbiAgICAgKi9cbiAgICBzZXRUaXRsZSh0ZXh0KXsgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJ0aXRsZVwiLCB0ZXh0KTsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcbiAgICAgKi9cbiAgICBzZXRGb290ZXIoY29tcG9uZW50KXtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94Rm9vdGVyXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImRpYWxvZ0JveEZvb3RlclwiLCBjb21wb25lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXG4gICAgICovXG4gICAgc2V0Q29udGVudChjb21wb25lbnQpeyB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImRpYWxvZ0JveENvbnRlbnRcIixjb21wb25lbnQpOyB9XG5cblx0c2V0KGtleSx2YWwpIHsgdGhpcy5jb21wb25lbnQuc2V0KGtleSx2YWwpOyB9XG4gICAgXG4gICAgYXN5bmMgY2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGF3YWl0IHRoaXMuaGlkZSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5jb250YWlucyhEaWFsb2dCb3guT1BUSU9OX0JBQ0tfT05fQ0xPU0UpKSB7XG4gICAgICAgICAgICBOYXZpZ2F0aW9uLmluc3RhbmNlKCkuYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgaGlkZShldmVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIpO1xuICAgICAgICBjb25zdCBoaWRlQmFja1NoYWRlUHJvbWlzZSA9IHRoaXMuYmFja1NoYWRlLmhpZGVBZnRlcigzMDApO1xuICAgICAgICBjb25zdCBoaWRlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZSgyMDAsICgpID0+IHsgXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKDIwMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtoaWRlUHJvbWlzZSwgZGlzYWJsZVN0eWxlUHJvbWlzZSwgaGlkZUJhY2tTaGFkZVByb21pc2VdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHRlbXBvcmFyeU9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzaG93KGV2ZW50LCB0ZW1wb3JhcnlPcHRpb25zKSB7XG4gICAgICAgIGlmICh0ZW1wb3JhcnlPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgTGlzdCh0ZW1wb3JhcnlPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBDYW52YXNSb290LnN3YWxsb3dGb2N1c0VzY2FwZSg1MDApO1xuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuYmFja1NoYWRlLnNob3coKTtcbiAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9ja1wiKTtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9jayBkaWFsb2dib3gtb3ZlcmxheS1zaG93XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldERpYWxvZ0JveE92ZXJsYXkoKSB7IHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hPdmVybGF5XCIpOyB9XG5cbiAgICBnZXREaWFsb2dCb3goKSB7IHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hcIik7IH1cblxuICAgIHNjcm9sbExvY2soKSB7XG4gICAgICAgIENvbnRhaW5lckVsZW1lbnQuc2Nyb2xsTG9ja1RvKHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveENvbnRlbnRcIikuZWxlbWVudCwgMCwgMCwgMTAwMCk7XG4gICAgfVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50LFxuICAgIENhbnZhc1Jvb3QsXG4gICAgSFRNTCxcbiAgICBDU1MsXG4gICAgU3R5bGVcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRyb3BEb3duUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBEcm9wRG93blBhbmVsIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIkRyb3BEb3duUGFuZWxcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Ryb3BEb3duUGFuZWwuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Ryb3BEb3duUGFuZWwuY3NzXCI7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXByaW1hcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TRUNPTkRBUlkgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tc2Vjb25kYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU1VDQ0VTUyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1pbmZvXCI7XG4gICAgc3RhdGljIFRZUEVfV0FSTklORyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi13YXJuaW5nXCI7XG4gICAgc3RhdGljIFRZUEVfREFOR0VSID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRZUEVfREFSSyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1kYXJrXCI7XG5cbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9MRUZUID0gXCJkcm9wLWRvd24tcGFuZWwtbGVmdFwiO1xuICAgIHN0YXRpYyBPUklFTlRBVElPTl9SSUdIVCA9IFwiZHJvcC1kb3duLXBhbmVsLXJpZ2h0XCI7XG5cbiAgICBzdGF0aWMgQ09OVEVOVF9WSVNJQkxFID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC12aXNpYmxlXCI7XG4gICAgc3RhdGljIENPTlRFTlRfSElEREVOID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC1oaWRkZW5cIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9FWFBBTkQgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWV4cGFuZFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0NPTExBUFNFID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC1jb2xsYXBzZVwiO1xuICAgIHN0YXRpYyBDT05URU5UID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudFwiO1xuICAgIHN0YXRpYyBCVVRUT04gPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uQ2xhc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmllbnRhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGljb25DbGFzcywgdHlwZSA9IERyb3BEb3duUGFuZWwuVFlQRV9EQVJLLCBzaXplID0gRHJvcERvd25QYW5lbC5TSVpFX01FRElVTSwgb3JpZW50YXRpb24gPSBEcm9wRG93blBhbmVsLk9SSUVOVEFUSU9OX0xFRlQpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbkNsYXNzID0gaWNvbkNsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRHJvcERvd25QYW5lbC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEcm9wRG93blBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuXG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5CVVRUT04pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSk7XG5cbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UKVxuICAgICAgICAgICAgLmRpc2FibGUoRHJvcERvd25QYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5vcmllbnRhdGlvbik7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKTtcbiAgICAgICAgQ2FudmFzUm9vdC5saXN0ZW5Ub0ZvY3VzRXNjYXBlKG5ldyBNZXRob2QodGhpcywgdGhpcy5oaWRlKSwgdGhpcy5jb21wb25lbnQuZ2V0KFwiZHJvcERvd25QYW5lbFJvb3RcIikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBkcm9wRG93blBhbmVsQ29udGVudCBcbiAgICAgKi9cbiAgICBzZXRQYW5lbENvbnRlbnQoZHJvcERvd25QYW5lbENvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5zZXRDaGlsZChkcm9wRG93blBhbmVsQ29udGVudC5jb21wb25lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ29udGVudCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbnRlbnQoKSB7XG4gICAgICAgIGlmICghU3R5bGUuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSkuaXMoXCJkaXNwbGF5XCIsXCJibG9ja1wiKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSk7XG4gICAgICAgIFN0eWxlLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikpXG4gICAgICAgICAgICAuc2V0KFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLmVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBDU1MuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoRHJvcERvd25QYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9ISURERU4pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnQsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBIVE1MLFxuICAgIENTUyxcbiAgICBTdHlsZVxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUG9wVXBQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIFBvcFVwUGFuZWwge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUG9wVXBQYW5lbFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcG9wVXBQYW5lbC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcG9wVXBQYW5lbC5jc3NcIjtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcInBvcC11cC1wYW5lbC1idXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcInBvcC11cC1wYW5lbC1idXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcInBvcC11cC1wYW5lbC1idXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0xFRlQgPSBcInBvcC11cC1wYW5lbC1sZWZ0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1JJR0hUID0gXCJwb3AtdXAtcGFuZWwtcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX1ZJU0lCTEUgPSBcInBvcC11cC1wYW5lbC1jb250ZW50LXZpc2libGVcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9ISURERU4gPSBcInBvcC11cC1wYW5lbC1jb250ZW50LWhpZGRlblwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYUEFORCA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtZXhwYW5kXCI7XG4gICAgc3RhdGljIENPTlRFTlRfQ09MTEFQU0UgPSBcInBvcC11cC1wYW5lbC1jb250ZW50LWNvbGxhcHNlXCI7XG4gICAgc3RhdGljIENPTlRFTlQgPSBcInBvcC11cC1wYW5lbC1jb250ZW50XCI7XG4gICAgc3RhdGljIEJVVFRPTiA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWNvbkNsYXNzLCB0eXBlID0gUG9wVXBQYW5lbC5UWVBFX0RBUkssIHNpemUgPSBQb3BVcFBhbmVsLlNJWkVfTUVESVVNLCBvcmllbnRhdGlvbiA9IFBvcFVwUGFuZWwuT1JJRU5UQVRJT05fTEVGVCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQb3BVcFBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBvcFVwUGFuZWwuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0Q2hpbGQoSFRNTC5pKFwiXCIsIHRoaXMuaWNvbkNsYXNzKSk7XG5cbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkJVVFRPTilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy50eXBlKTtcblxuICAgICAgICBDU1MuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlQpXG4gICAgICAgICAgICAuZGlzYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5zaXplKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLm9yaWVudGF0aW9uKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xpY2tlZCkpO1xuICAgICAgICBDYW52YXNSb290Lmxpc3RlblRvRm9jdXNFc2NhcGUobmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpLCB0aGlzLmNvbXBvbmVudC5nZXQoXCJwb3BVcFBhbmVsUm9vdFwiKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IHBvcFVwUGFuZWxDb250ZW50IFxuICAgICAqL1xuICAgIHNldFBhbmVsQ29udGVudChwb3BVcFBhbmVsQ29udGVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLnNldENoaWxkKHBvcFVwUGFuZWxDb250ZW50LmNvbXBvbmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50b2dnbGVDb250ZW50KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQ29udGVudCgpIHtcbiAgICAgICAgaWYgKCFTdHlsZS5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpKS5pcyhcImRpc3BsYXlcIixcImJsb2NrXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9WSVNJQkxFKTtcbiAgICAgICAgU3R5bGUuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSlcbiAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuZWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIENTUy5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UX0hJRERFTik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNZXRob2QsIExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsIEFic3RyYWN0VmFsaWRhdG9yLCBDb21wb25lbnRGYWN0b3J5LCBDYW52YXNTdHlsZXMsIEV2ZW50LCBDb21wb25lbnQsIEV2ZW50TWFuYWdlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNvbW1vbklucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIGdldCBFVkVOVF9DTElDS0VEKCkgeyByZXR1cm4gXCJjbGlja2VkXCI7IH1cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0VOVEVSRUQoKSB7IHJldHVybiBcImVudGVyZWRcIjsgfVxuICAgIHN0YXRpYyBnZXQgRVZFTlRfS0VZVVBQRUQoKSB7IHJldHVybiBcImtleVVwcGVkXCI7IH1cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0NIQU5HRUQoKSB7IHJldHVybiBcImNoYW5nZFwiOyB9XG4gICAgc3RhdGljIGdldCBFVkVOVF9CTFVSUkVEKCkgeyByZXR1cm4gXCJibHVycmVkXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0VmFsaWRhdG9yfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRFbGVtZW50SWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JFbGVtZW50SWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnROYW1lLFxuICAgICAgICBuYW1lLFxuICAgICAgICBtb2RlbCA9IG51bGwsXG4gICAgICAgIHZhbGlkYXRvciA9IG51bGwsIFxuICAgICAgICBwbGFjZWhvbGRlciA9IG51bGwsXG4gICAgICAgIGlucHV0RWxlbWVudElkID0gXCJpbnB1dFwiLFxuICAgICAgICBlcnJvckVsZW1lbnRJZCA9IFwiZXJyb3JcIikge1xuXG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QWJzdHJhY3RWYWxpZGF0b3J9ICovXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50SWQgPSBpbnB1dEVsZW1lbnRJZDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5lcnJvckVsZW1lbnRJZCA9IGVycm9yRWxlbWVudElkO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUodGhpcy5jb21wb25lbnROYW1lKTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUodGhpcy5jb21wb25lbnROYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLCB0aGlzLm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLCBcIjogIFwiICsgIHRoaXMucGxhY2Vob2xkZXIpO1xuXG4gICAgICAgIGlmKHRoaXMudmFsaWRhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci53aXRoVmFsaWRMaXN0ZW5lcihuZXcgTWV0aG9kKHRoaXMsdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwsIHRoaXMudmFsaWRhdG9yKS50byh0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJrZXl1cFwiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMua2V5dXBwZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiY2hhbmdlXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jaGFuZ2VkKSlcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImJsdXJcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmJsdXJyZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwia2V5dXBcIiwgbmV3IE1ldGhvZCh0aGlzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNLZXlDb2RlKDEzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyZWQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZClcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5lcnJvckNsaWNrZWQpKTtcbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGtleXVwcGVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaXNLZXlDb2RlKDEzKSAmJiAhZXZlbnQuaXNLZXlDb2RlKDE2KSAmJiAhZXZlbnQuaXNLZXlDb2RlKDkpKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcIlwiID09PSBldmVudC50YXJnZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwiXCIgPT09IGV2ZW50LnRhcmdldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0NIQU5HRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQ0xJQ0tFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0VOVEVSRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBibHVycmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy50YWludGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpO1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0JMVVJSRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBlcnJvckNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5mb2N1cygpOyB9XG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2VsZWN0QWxsKCk7IH1cbiAgICBlbmFibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5lbmFibGUoKTsgfVxuICAgIGRpc2FibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5kaXNhYmxlKCk7IH1cbiAgICBjbGVhcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnZhbHVlID0gXCJcIjsgdGhpcy50YWludGVkID0gZmFsc2U7IHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpOyB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgQ1NTXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJMaW5rUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBMaW5rUGFuZWwge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiTGlua1BhbmVsXCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9saW5rUGFuZWwuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2xpbmtQYW5lbC5jc3NcIjtcblxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gXCJjbGlja1wiO1xuXG4gICAgc3RhdGljIFNJWkVfU01BTEwgPSBcImxpbmstcGFuZWwtc21hbGxcIjtcbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcImxpbmstcGFuZWwtbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImxpbmstcGFuZWwtbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9GTEFUID0gXCJsaW5rLXBhbmVsLWZsYXRcIjtcbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fU1RBQ0tFRCA9IFwibGluay1wYW5lbC1zdGFja2VkXCI7XG5cbiAgICBzdGF0aWMgVEhFTUVfREFSSyA9IFwibGluay1wYW5lbC1kYXJrXCI7XG4gICAgc3RhdGljIFRIRU1FX0xJR0hUID0gXCJsaW5rLXBhbmVsLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRIRU1FX0RBTkdFUiA9IFwibGluay1wYW5lbC1kYW5nZXJcIjtcbiAgICBzdGF0aWMgVEhFTUVfSU5GTyA9IFwibGluay1wYW5lbC1pbmZvXCI7XG4gICAgc3RhdGljIFRIRU1FX1NVQ0NFU1MgPSBcImxpbmstcGFuZWwtc3VjY2Vzc1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGljb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYWJlbCwgaWNvbiwgdGhlbWUgPSBMaW5rUGFuZWwuVEhFTUVfREFSSywgb3JpZW50YXRpb24gPSBMaW5rUGFuZWwuT1JJRU5UQVRJT05fRkxBVCwgc2l6ZSA9IExpbmtQYW5lbC5TSVpFX1NNQUxMKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy50aGVtZSA9IHRoZW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyPExpbmtQYW5lbD59ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyPExpbmtQYW5lbD59ICovXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoTGlua1BhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKExpbmtQYW5lbC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIFxuICAgICAgICBDU1MuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJsaW5rXCIpKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMub3JpZW50YXRpb24pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudGhlbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKS5zZXRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xuICAgICAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKSlcbiAgICAgICAgICAgICAgICAuY2xlYXIoKVxuICAgICAgICAgICAgICAgIC5lbmFibGUodGhpcy5pY29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImljb25cIikucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxpbmtcIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihMaW5rUGFuZWwuRVZFTlRfQ0xJQ0tFRCwgZXZlbnQpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG1ldGhvZCBcbiAgICAgKi9cbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihtZXRob2QpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGlua1wiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG1ldGhvZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudCwgQ2FudmFzU3R5bGVzLCBDU1MgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFuZWwge1xuXG5cdHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUGFuZWxcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3BhbmVsLmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYW5lbC5jc3NcIjtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU5fUk9PVCA9IFwicGFuZWwtdHlwZS1jb2x1bW4tcm9vdFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU4gPSBcInBhbmVsLXR5cGUtY29sdW1uXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9UWVBFX1JPVyA9IFwicGFuZWwtdHlwZS1yb3dcIjtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9MRUZUID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWxlZnRcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fUklHSFQgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tcmlnaHRcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fQ0VOVEVSID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWNlbnRlclwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9KVVNUSUZZID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWp1c3RpZnlcIjtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfU0laRV9BVVRPID0gXCJwYW5lbC1zaXplLWF1dG9cIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1NJWkVfTUlOSU1BTCA9IFwicGFuZWwtc2l6ZS1taW5pbWFsXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9TSVpFX1JFU1BPTlNJVkUgPSBcInBhbmVsLXNpemUtcmVzcG9uc2l2ZVwiO1xuXG4gICAgc3RhdGljIE9QVElPTl9TVFlMRV9DT05URU5UX1BBRERJTkdfU01BTEwgPSBcInBhbmVsLWNvbnRlbnQtcGFkZGluZy1zbWFsbFwiO1xuICAgIHN0YXRpYyBPUFRJT05fU1RZTEVfQ09OVEVOVF9QQURESU5HX0xBUkdFID0gXCJwYW5lbC1jb250ZW50LXBhZGRpbmctbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUFRJT05fU1RZTEVfQk9SREVSX1NIQURPVyA9IFwicGFuZWwtYm9yZGVyLXNoYWRvd1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRBbGlnbiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2l6ZSBcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG9wdGlvbnMgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodHlwZSA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTl9ST09ULFxuICAgICAgICBjb250ZW50QWxpZ24gPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9DRU5URVIsXG4gICAgICAgIHNpemUgPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfU0laRV9BVVRPLFxuICAgICAgICBvcHRpb25zID0gW10pIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29udGVudEFsaWduID0gY29udGVudEFsaWduO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQYW5lbC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYW5lbC5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwicGFuZWxcIikpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5jb250ZW50QWxpZ24pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEJhc2VFbGVtZW50LCBDYW52YXNTdHlsZXMsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgQ1NTIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5leHBvcnQgY2xhc3MgU2xpZGVEZWNrRW50cnkge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJTbGlkZURlY2tFbnRyeVwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2xpZGVEZWNrRW50cnkuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3NsaWRlRGVja0VudHJ5LmNzc1wiO1xuXG4gICAgc3RhdGljIERFRkFVTFRfQ0xBU1MgPSBcInNsaWRlLWRlY2stZW50cnlcIjtcblxuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9GUk9OVCA9IFwicG9zaXRpb24tZnJvbnRcIjtcbiAgICBzdGF0aWMgRU5UUllfUE9TSVRJT05fQkVISU5EID0gXCJwb3NpdGlvbi1iZWhpbmRcIjtcbiAgICBzdGF0aWMgRU5UUllfUE9TSVRJT05fUklHSFQgPSBcInBvc2l0aW9uLXJpZ2h0XCI7XG5cbiAgICBzdGF0aWMgQ09OVEVOVF9FWElTVEFOQ0VfUFJFU0VOVCA9IFwiZXhpc3RhbmNlLXByZXNlbnRcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9FWElTVEFOQ0VfUkVNT1ZFRCA9IFwiZXhpc3RhbmNlLXJlbW92ZWRcIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtOdW1iZXJ9ICovXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fRlJPTlQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0Jhc2VFbGVtZW50fVxuICAgICAqL1xuICAgIGdldCBjb250ZW50RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5Q29udGVudFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7QmFzZUVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0IGVudHJ5RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5XCIpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTbGlkZURlY2tFbnRyeS5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTbGlkZURlY2tFbnRyeS5DT01QT05FTlRfTkFNRSk7XG4gICAgfVxuXG4gICAgc2V0SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIH1cblxuICAgIHNldENvbnRlbnQoY29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuc2V0Q2hpbGQoY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLnNldENvbnRlbnRWaXNpYmlsaXR5KFNsaWRlRGVja0VudHJ5LkNPTlRFTlRfRVhJU1RBTkNFX1BSRVNFTlQpO1xuICAgICAgICB0aGlzLnNldFNoaWZ0KFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0ZST05UKTtcbiAgICB9XG5cbiAgICBoaWRlKG5leHRJbmRleCkge1xuICAgICAgICBpZiAobmV4dEluZGV4ID4gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaGlmdChTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9CRUhJTkQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTaGlmdChTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9SSUdIVCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGp1c3RXaGVuSGlkZGVuKCk7XG4gICAgfVxuXG4gICAgYWRqdXN0V2hlbkhpZGRlbigpIHtcbiAgICAgICAgVGltZVByb21pc2UuYXNQcm9taXNlKDYwMCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0ZST05UKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50VmlzaWJpbGl0eShTbGlkZURlY2tFbnRyeS5DT05URU5UX0VYSVNUQU5DRV9SRU1PVkVEKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudFZpc2liaWxpdHkoY29udGVudFZpc2liaWxpdHkpIHtcbiAgICAgICAgQ1NTLmZyb20odGhpcy5jb250ZW50RWxlbWVudCkucmVwbGFjZShcImV4aXN0YW5jZS1cIiwgY29udGVudFZpc2liaWxpdHkpO1xuICAgIH1cblxuICAgIHNldFNoaWZ0KHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgQ1NTLmZyb20odGhpcy5lbnRyeUVsZW1lbnQpLnJlcGxhY2UoXCJwb3NpdGlvbi1cIiwgcG9zaXRpb24pO1xuICAgIH1cblxufSIsImltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIEV2ZW50TWFuYWdlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBTbGlkZURlY2tFbnRyeSB9IGZyb20gXCIuL3NsaWRlRGVja0VudHJ5L3NsaWRlRGVja0VudHJ5LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZURlY2sge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJTbGlkZURlY2tcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3NsaWRlRGVjay5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2xpZGVEZWNrLmNzc1wiO1xuXG4gICAgc3RhdGljIEVWRU5UX0VOVFJZX0NIQU5HRUQgPSBcImV2ZW50RW50cnlDaGFuZ2VkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcDxDb21wb25lbnQ+fSBjb21wb25lbnRNYXAgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TWFwKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPENvbXBvbmVudD59ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFwID0gY29tcG9uZW50TWFwO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UHJvdmlkZXI8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihTbGlkZURlY2tFbnRyeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QgPSBuZXcgTGlzdCgpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge01hcDxOdW1iZXI+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5SW5kZXhNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTbGlkZURlY2tFbnRyeX0gKi9cbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoU2xpZGVEZWNrLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFNsaWRlRGVjay5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50TWFwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVFbnRyaWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzbGlkZURlY2tFbnRyaWVzXCIpLmVsZW1lbnQucGFyZW50RWxlbWVudC5zY3JvbGxUbygwLDApO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByZXBhcmVFbnRyaWVzKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hcC5mb3JFYWNoKGFzeW5jIChrZXksIGNvbXBvbmVudCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBzbGlkZURlY2tFbnRyeSA9IGF3YWl0IHRoaXMuc2xpZGVEZWNrRW50cnlQcm92aWRlci5nZXQoKTtcblxuICAgICAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jdXJyZW50RW50cnkpIHtcbiAgICAgICAgICAgICAgICBzbGlkZURlY2tFbnRyeS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBzbGlkZURlY2tFbnRyeTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5zZXQoa2V5LCBzbGlkZURlY2tFbnRyeSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5hZGQoc2xpZGVEZWNrRW50cnkpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUluZGV4TWFwLnNldChrZXksIHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSAtMSk7XG5cbiAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNldENvbnRlbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNldEluZGV4KHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSAtIDEpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcInNsaWRlRGVja0VudHJpZXNcIiwgc2xpZGVEZWNrRW50cnkuY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBzbGlkZU5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCArIDEgPj0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3Quc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4ICsgMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2xpZGVEZWNrLkVWRU5UX0VOVFJZX0NIQU5HRUQpO1xuICAgIH1cblxuICAgIHNsaWRlUHJldmlvdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4IC0gMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbiAgICBzbGlkZVRvKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5nZXQobmFtZSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIEV2ZW50TWFuYWdlciwgU3RhdGVNYW5hZ2VyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdmlkZXIgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuLi8uLi9idXR0b24vYnV0dG9uLmpzXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi8uLi9wYW5lbC9wYW5lbC5qc1wiO1xuXG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUcmVlUGFuZWxFbnRyeVwiKTtcblxuZXhwb3J0IGNsYXNzIFRyZWVQYW5lbEVudHJ5IHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIlRyZWVQYW5lbEVudHJ5XCI7XG5cdHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdHJlZVBhbmVsRW50cnkuaHRtbFwiO1xuXHRzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90cmVlUGFuZWxFbnRyeS5jc3NcIjtcblxuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBTVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJzdWJSZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblxuICAgIGNvbnN0cnVjdG9yKHNob3dFeHBhbmRCdXR0b24gPSBmYWxzZSwgcmVjb3JkID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdHRoaXMuc2hvd0V4cGFuZEJ1dHRvbiA9IHNob3dFeHBhbmRCdXR0b247XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPFBhbmVsPn0gKi9cblx0XHR0aGlzLnBhbmVsUHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihQYW5lbCk7XG5cblx0XHQvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cblx0XHR0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge1N0YXRlTWFuYWdlcjxhbnlbXT59ICovXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFN0YXRlTWFuYWdlcik7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPFRyZWVQYW5lbEVudHJ5Pn0gKi9cblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmllciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFRyZWVQYW5lbEVudHJ5KTtcblxuXHRcdC8qKiBAdHlwZSB7QnV0dG9ufSAqL1xuXHRcdHRoaXMuZXhwYW5kQnV0dG9uID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQnV0dG9uLCBbXCIrXCIsIEJ1dHRvbi5UWVBFX1BSSU1BUlldKTtcblxuICAgICAgICAvKiogQHR5cGUge2FueX0gKi9cbiAgICAgICAgdGhpcy5yZWNvcmQgPSByZWNvcmQ7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVHJlZVBhbmVsRW50cnkuQ09NUE9ORU5UX05BTUUpO1xuXHRcdENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShUcmVlUGFuZWxFbnRyeS5DT01QT05FTlRfTkFNRSk7XG5cblx0XHR0aGlzLmV4cGFuZEJ1dHRvbi5ldmVudHMubGlzdGVuVG8oQnV0dG9uLkVWRU5UX0NMSUNLRUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5sb2FkU3ViUmVjb3Jkc0NsaWNrZWQpKTtcblxuXHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiZXhwYW5kQnV0dG9uXCIsIHRoaXMuZXhwYW5kQnV0dG9uLmNvbXBvbmVudCk7XG5cblx0XHRpZiAoIXRoaXMuc2hvd0V4cGFuZEJ1dHRvbikge1xuXHRcdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwic3VicmVjb3JkSW5kZW50XCIpLnJlbW92ZSgpO1xuXHRcdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwicmVjb3JkRWxlbWVudENvbnRhaW5lclwiKS5yZW1vdmUoKTtcblx0XHR9XG5cbiAgICAgICAgdGhpcy5hcnJheVN0YXRlLnJlYWN0KG5ldyBNZXRob2QodGhpcywgdGhpcy5oYW5kbGVBcnJheVN0YXRlKSk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZUFycmF5U3RhdGUoYXJyYXkpIHtcblx0XHRjb25zdCBwYW5lbCA9IGF3YWl0IHRoaXMucGFuZWxQcm92aWRlci5nZXQoW1xuXHRcdFx0UGFuZWwuUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OLCBcblx0XHRcdFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0xFRlQsIFxuXHRcdFx0UGFuZWwuUEFSQU1FVEVSX1NUWUxFX1NJWkVfTUlOSU1BTF0pO1xuXHRcdGFycmF5LmZvckVhY2goYXN5bmMgKHJlY29yZCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wb3B1bGF0ZVJlY29yZChwYW5lbCwgcmVjb3JkKTtcbiAgICAgICAgfSk7XG5cblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInN1YnJlY29yZEVsZW1lbnRzXCIsIHBhbmVsLmNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50fSBwYW5lbFxuICAgICAqIEBwYXJhbSB7YW55fSByZWNvcmQgXG4gICAgICovXG4gICAgYXN5bmMgcG9wdWxhdGVSZWNvcmQocGFuZWwsIHJlY29yZCkge1xuICAgICAgICBjb25zdCByZWNvcmRFbGVtZW50ID0gYXdhaXQgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtudWxsLCByZWNvcmRdKTtcbiAgICAgICAgXG5cdFx0aWYgKCFyZWNvcmRFbGVtZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdGNvbnN0IHRyZWVQYW5lbEVudHJ5ID0gYXdhaXQgdGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZXIuZ2V0KFt0cnVlLCByZWNvcmRdKTtcblx0XHR0cmVlUGFuZWxFbnRyeS5jb21wb25lbnQuc2V0Q2hpbGQoXCJyZWNvcmRFbGVtZW50XCIsIHJlY29yZEVsZW1lbnQuY29tcG9uZW50KTtcblxuXHRcdHRyZWVQYW5lbEVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmVudHJ5UmVxdWVzdGVkKSk7XG5cblx0XHR0cmVlUGFuZWxFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZCkpO1xuXHRcblx0XHRwYW5lbC5jb21wb25lbnQuYWRkQ2hpbGQoXCJwYW5lbFwiLCB0cmVlUGFuZWxFbnRyeS5jb21wb25lbnQpO1xuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICovXG5cdGFzeW5jIGVudHJ5UmVxdWVzdGVkKGV2ZW50LCByZWNvcmQpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGF3YWl0IHRoaXMuZXZlbnRzLnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZF0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcblx0ICogQHBhcmFtIHthbnl9IHJlY29yZFxuXHQgKiBAcGFyYW0ge1N0YXRlTWFuYWdlcjxhbnlbXT59IHN0YXRlTWFuYWdlclxuXHQgKi9cblx0YXN5bmMgc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCBzdGF0ZU1hbmFnZXIpIHtcblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgW2V2ZW50LCByZWNvcmQsIHN0YXRlTWFuYWdlcl0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcblx0ICovXG4gICAgbG9hZFN1YlJlY29yZHNDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyXG5cdFx0XHQudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHRoaXMucmVjb3JkLCB0aGlzLmFycmF5U3RhdGVdKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3ZpZGVyIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIENhbnZhc1N0eWxlcywgRXZlbnRNYW5hZ2VyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBUcmVlUGFuZWxFbnRyeSB9IGZyb20gXCIuL3RyZWVQYW5lbEVudHJ5L3RyZWVQYW5lbEVudHJ5LmpzXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi9wYW5lbC9wYW5lbC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVHJlZVBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgVHJlZVBhbmVsIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIlRyZWVQYW5lbFwiO1xuXHRzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RyZWVQYW5lbC5odG1sXCI7XG5cdHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RyZWVQYW5lbC5jc3NcIjtcblxuXHRzdGF0aWMgRVZFTlRfUkVGUkVTSF9DTElDS0VEID0gXCJyZWZyZXNoQ2xpY2tlZFwiO1xuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBTVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJzdWJSZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtQYW5lbH0gYnV0dG9uUGFuZWwgXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihidXR0b25QYW5lbCA9IG51bGwpIHtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblx0XHRcblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cblx0XHR0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8VHJlZVBhbmVsRW50cnk+fSAqL1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnlQcm92aWVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoVHJlZVBhbmVsRW50cnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtUcmVlUGFuZWxFbnRyeX0gKi9cblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7UGFuZWx9ICovXG5cdFx0dGhpcy5idXR0b25QYW5lbCA9IGJ1dHRvblBhbmVsO1xuXG5cdH1cblxuXHRhc3luYyBwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShUcmVlUGFuZWwuQ09NUE9ORU5UX05BTUUpO1xuXHRcdENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShUcmVlUGFuZWwuQ09NUE9ORU5UX05BTUUpO1xuXG5cdFx0aWYgKHRoaXMuYnV0dG9uUGFuZWwpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiYnV0dG9ucGFuZWxcIiwgdGhpcy5idXR0b25QYW5lbC5jb21wb25lbnQpO1xuXHRcdH1cblxuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkgPSBhd2FpdCB0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmllci5nZXQoKTtcblxuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkuZXZlbnRzXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZW50cnlSZXF1ZXN0ZWQpKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIG5ldyBNZXRob2QodGhpcywgdGhpcy5zdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKSk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZSB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSByb290IFRyZWVQYW5lbEVudHJ5IHdoZW4gaXQncyBvciBvbmUgb2YgaXQncyBzdWJvcmRpbmF0ZSBlbGVtZW50cyBuZWVkIHRvIGJlIHJlbmRlcmVkXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcblx0ICogQHBhcmFtIHthbnl9IHJlY29yZFxuXHQgKi9cblx0YXN5bmMgZW50cnlSZXF1ZXN0ZWQoZXZlbnQsIHJlY29yZCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5ldmVudHMudHJpZ2dlcihUcmVlUGFuZWwuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZF0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIHJvb3QgVHJlZVBhbmVsRW50cnkgd2hlbiBpdCdzIG9yIG9uZSBvZiBpdCdzIHN1Ym9yZGluYXRlIGVsZW1lbnRzIG5lZWQgdGhlIHN0YXRlIG9mIHRoZSBzdWJyZWNvcmRzIHRvIGJlIHVwZGF0ZWQsXG5cdCAqIGZvciBleGFtcGxlIHdoZW4gdGhlIGV4cGFuZCBidXR0b24gaXMgY2xpY2tlZFxuXHQgKiBcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICogQHBhcmFtIHtTdGF0ZU1hbmFnZXI8YW55W10+fSBzdGF0ZU1hbmFnZXJcblx0ICogQHJldHVybnMge1Byb21pc2U8VHJlZVBhbmVsRW50cnlbXT59XG5cdCAqL1xuXHRhc3luYyBzdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKGV2ZW50LCByZWNvcmQsIHN0YXRlTWFuYWdlcikge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5ldmVudHMudHJpZ2dlcihUcmVlUGFuZWwuU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgW2V2ZW50LCByZWNvcmQsIHN0YXRlTWFuYWdlcl0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNldFxuXHQgKiBcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG5cdCAqL1xuXHRhc3luYyByZXNldChldmVudCkge1xuXHRcdGF3YWl0IHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChldmVudCwgbnVsbCwgdGhpcy50cmVlUGFuZWxFbnRyeS5hcnJheVN0YXRlKTtcblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInJvb3RlbGVtZW50XCIsIHRoaXMudHJlZVBhbmVsRW50cnkuY29tcG9uZW50KTtcblx0fVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ2hlY2tCb3hcIik7XG5cbmV4cG9ydCBjbGFzcyBDaGVja0JveCB7XG5cblx0c3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJDaGVja0JveFwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2NoZWNrQm94LmNzc1wiO1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCkge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQ2hlY2tCb3guQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQ2hlY2tCb3guQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xuXG4gICAgICAgIGlmKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgRW1haWxWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkVtYWlsSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBFbWFpbElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJFbWFpbElucHV0XCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9lbWFpbElucHV0Lmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9lbWFpbElucHV0LmNzc1wiO1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIkVtYWlsXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKEVtYWlsSW5wdXQuQ09NUE9ORU5UX05BTUUsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgRW1haWxWYWxpZGF0b3IobWFuZGF0b3J5LCAhbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJlbWFpbElucHV0XCIsXG4gICAgICAgICAgICBcImVtYWlsRXJyb3JcIik7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJlbWFpbC1pbnB1dC1lcnJvciBlbWFpbC1pbnB1dC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJlbWFpbC1pbnB1dC1lcnJvciBlbWFpbC1pbnB1dC1lcnJvci1oaWRkZW5cIik7IH1cblxufSIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgTnVtYmVyVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVGV4dElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgTnVtYmVySW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIk51bWJlcklucHV0XCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9udW1iZXJJbnB1dC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvbnVtYmVySW5wdXQuY3NzXCI7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiTnVtYmVyXCI7XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gTnVtYmVySW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihOdW1iZXJJbnB1dC5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBOdW1iZXJWYWxpZGF0b3IobWFuZGF0b3J5LCAhbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJudW1iZXJJbnB1dFwiLFxuICAgICAgICAgICAgXCJudW1iZXJFcnJvclwiKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcIm51bWJlci1pbnB1dC1lcnJvciBudW1iZXItaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwibnVtYmVyLWlucHV0LWVycm9yIG51bWJlci1pbnB1dC1lcnJvci1oaWRkZW5cIik7IH1cbn0iLCJpbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG4gICAgXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJQYXNzd29yZElucHV0XCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0Lmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0LmNzc1wiO1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlBhc3N3b3JkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkSW5wdXQuQ09NUE9ORU5UX05BTUUsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGFzc3dvcmRJbnB1dFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZEVycm9yXCIpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG59IiwiaW1wb3J0IHsgUGFzc3dvcmRWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuICAgIFxuICAgIHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiO1xuICAgIHN0YXRpYyBURU1QTEFURV9VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jc3NcIjtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJOZXcgcGFzc3dvcmRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBQYXNzd29yZFZhbGlkYXRvcihtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlRXJyb3JcIik7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IEVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuICAgIFxuICAgIHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jc3NcIjtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJDb25maXJtIHBhc3N3b3JkXCI7XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUixcbiAgICAgICAgICAgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuQ09NUE9ORU5UX05BTUUsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IobWFuZGF0b3J5LCBmYWxzZSwgbW9kZWwsIG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWUpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEZpZWxkXCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEVycm9yXCIpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3IgcGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yLWhpZGRlblwiKTsgfVxufSIsImV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJNb2RlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udHJvbFBhc3N3b3JkID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXROZXdQYXNzd29yZChuZXdQYXNzd29yZCkge1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkID0gbmV3UGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgZ2V0TmV3UGFzc3dvcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld1Bhc3N3b3JkO1xuICAgIH1cblxuICAgIHNldENvbnRyb2xQYXNzd29yZChjb250cm9sUGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sUGFzc3dvcmQgPSBjb250cm9sUGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgZ2V0Q29udHJvbFBhc3N3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sUGFzc3dvcmQ7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQW5kVmFsaWRhdG9yU2V0LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBQcm9wZXJ0eUFjY2Vzc29yLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanNcIjtcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuanNcIjtcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlck1vZGVsIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVyTW9kZWwuanNcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlcklucHV0IHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIlBhc3N3b3JkTWF0Y2hlcklucHV0XCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXQuY3NzXCI7XG5cblx0c3RhdGljIEVWRU5UX1ZBTElEQVRFRF9FTlRFUkVEID0gXCJ2YWxpZGF0ZWRFbnRlcmVkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250cm9sUGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsXG4gICAgICAgIG1vZGVsID0gbnVsbCxcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBcbiAgICAgICAgY29udHJvbFBsYWNlaG9sZGVyID0gUGFzc3dvcmRNYXRjaGVySW5wdXQuREVGQVVMVF9DT05UUk9MX1BMQUNFSE9MREVSLFxuICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBudWxsO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwgPSBuZXcgUGFzc3dvcmRNYXRjaGVyTW9kZWwoKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlfSAqL1xuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUsXG4gICAgICAgICAgICBbXCJuZXdQYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLCBwbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxuXHRcdCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2x9ICovXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wsXG4gICAgICAgICAgICBbXCJjb250cm9sUGFzc3dvcmRcIiwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCwgXCJuZXdQYXNzd29yZFwiLCBjb250cm9sUGxhY2Vob2xkZXIsIG1hbmRhdG9yeV1cblx0XHQpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IGF3YWl0IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUGFzc3dvcmRNYXRjaGVySW5wdXQuQ09NUE9ORU5UX05BTUUpO1xuXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYXNzd29yZE1hdGNoZXJJbnB1dC5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY29tcG9uZW50KTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLnBhc3N3b3JkVmFsdWVFbnRlcmVkKSlcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLnBhc3N3b3JkVmFsdWVDaGFuZ2VkKSk7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLnBhc3N3b3JkQ29udHJvbEVudGVyZWQpKTtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgQW5kVmFsaWRhdG9yU2V0KClcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkYXRvcih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE1ldGhvZCh0aGlzLCB0aGlzLnBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCkpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBwYXNzd29yZE1hdGNoZXJWYWxpZE9jY3VyZWQoKSB7XG4gICAgICAgIFByb3BlcnR5QWNjZXNzb3Iuc2V0VmFsdWUodGhpcy5tb2RlbCwgdGhpcy5uYW1lLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLmdldE5ld1Bhc3N3b3JkKCkpXG4gICAgfVxuXG4gICAgcGFzc3dvcmRWYWx1ZUVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzc3dvcmRWYWx1ZUNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwYXNzd29yZENvbnRyb2xFbnRlcmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUGFzc3dvcmRNYXRjaGVySW5wdXQuRVZFTlRfVkFMSURBVEVEX0VOVEVSRUQsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZm9jdXMoKTsgfVxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnNlbGVjdEFsbCgpOyB9XG4gICAgZW5hYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZW5hYmxlKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmRpc2FibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZGlzYWJsZSgpOyB9XG4gICAgY2xlYXIoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jbGVhcigpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jbGVhcigpOyB9XG59IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgUGhvbmVWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBob25lSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQaG9uZUlucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJQaG9uZUlucHV0XCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9waG9uZUlucHV0Lmh0bWxcIjtcbiAgICBzdGF0aWMgU1RZTEVTX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9waG9uZUlucHV0LmNzc1wiO1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlBob25lXCI7XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQaG9uZUlucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFBob25lVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGhvbmVJbnB1dFwiLFxuICAgICAgICAgICAgXCJwaG9uZUVycm9yXCIpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGhvbmUtaW5wdXQtZXJyb3IgcGhvbmUtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGhvbmUtaW5wdXQtZXJyb3IgcGhvbmUtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgRXZlbnRNYW5hZ2VyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb0J1dHRvblwiKTtcblxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uIHtcblxuXHRzdGF0aWMgQ09NUE9ORU5UX05BTUUgPSBcIlJhZGlvQnV0dG9uXCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9yYWRpb0J1dHRvbi5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcmFkaW9CdXR0b24uY3NzXCI7XG4gICAgXG4gICAgc3RhdGljIEVWRU5UX0NMSUNLRUQgPSBcImNsaWNrXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShSYWRpb0J1dHRvbi5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShSYWRpb0J1dHRvbi5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvQnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9CdXR0b25cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9CdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xpY2tlZCkpO1xuICAgIH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb0J1dHRvbi5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XG5pbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVGV4dElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIENPTVBPTkVOVF9OQU1FID0gXCJUZXh0SW5wdXRcIjtcbiAgICBzdGF0aWMgVEVNUExBVEVfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RleHRJbnB1dC5odG1sXCI7XG4gICAgc3RhdGljIFNUWUxFU19VUkwgPSBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdGV4dElucHV0LmNzc1wiO1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlRleHRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoVGV4dElucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKGZhbHNlLCBtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInRleHRJbnB1dFwiLFxuICAgICAgICAgICAgXCJ0ZXh0RXJyb3JcIik7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJ0ZXh0LWlucHV0LWVycm9yIHRleHQtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwidGV4dC1pbnB1dC1lcnJvciB0ZXh0LWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBFdmVudFxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVG9nZ2xlU3dpdGNoXCIpO1xuXG5leHBvcnQgY2xhc3MgVG9nZ2xlU3dpdGNoIHtcblxuICAgIHN0YXRpYyBDT01QT05FTlRfTkFNRSA9IFwiVG9nZ2xlU3dpdGNoXCI7XG4gICAgc3RhdGljIFRFTVBMQVRFX1VSTCA9IFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90b2dnbGVTd2l0Y2guaHRtbFwiO1xuICAgIHN0YXRpYyBTVFlMRVNfVVJMID0gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RvZ2dsZVN3aXRjaC5jc3NcIjtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfRU5BQkxFRCA9IFwiZW5hYmxlZFwiO1xuICAgIHN0YXRpYyBFVkVOVF9ESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcbiAgICBzdGF0aWMgRVZFTlRfQ0hBTkdFRCA9IFwiY2hhbmdlZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShUb2dnbGVTd2l0Y2guQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVG9nZ2xlU3dpdGNoLkNPTVBPTkVOVF9OQU1FKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJ0b2dnbGVTd2l0Y2hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwidG9nZ2xlU3dpdGNoXCIpLmxpc3RlblRvKFwiY2hhbmdlXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy50b2dnbGVkKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgdG9nZ2xlZChldmVudCkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0Lm1hcHBlZEVsZW1lbnQuY2hlY2tlZDtcblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihUb2dnbGVTd2l0Y2guRVZFTlRfQ0hBTkdFRCwgW2V2ZW50XSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFRvZ2dsZVN3aXRjaC5FVkVOVF9FTkFCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoVG9nZ2xlU3dpdGNoLkVWRU5UX0RJU0FCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIC8vIEFkZGl0aW9uYWwgY2xpY2sgaGFuZGxpbmcgaWYgbmVlZGVkXG4gICAgICAgIExPRy5pbmZvKFwiVG9nZ2xlIHN3aXRjaCBjbGlja2VkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdG9nZ2xlIHN0YXRlIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgXG4gICAgICovXG4gICAgdG9nZ2xlKGNoZWNrZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInRvZ2dsZVN3aXRjaFwiKS5tYXBwZWRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdG9nZ2xlIHN0YXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgIH1cblxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkxvZ2dlciIsIkluamVjdGlvblBvaW50IiwiQ29tcG9uZW50RmFjdG9yeSIsIlRpbWVQcm9taXNlIiwiQ2FudmFzU3R5bGVzIiwiU3R5bGUiLCJDb250YWluZXJBc3luYyIsIkV2ZW50TWFuYWdlciIsIkNTUyIsIk1ldGhvZCIsIkhUTUwiLCJMaXN0IiwiQ2FudmFzUm9vdCIsIk5hdmlnYXRpb24iLCJDb250YWluZXJFbGVtZW50IiwiSW5wdXRFbGVtZW50RGF0YUJpbmRpbmciLCJNYXAiLCJMT0ciLCJTdGF0ZU1hbmFnZXIiLCJFbWFpbFZhbGlkYXRvciIsIk51bWJlclZhbGlkYXRvciIsIlJlcXVpcmVkVmFsaWRhdG9yIiwiUGFzc3dvcmRWYWxpZGF0b3IiLCJFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvciIsIkFuZFZhbGlkYXRvclNldCIsIlByb3BlcnR5QWNjZXNzb3IiLCJQaG9uZVZhbGlkYXRvciIsIlRleHRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QjtBQUNBLElBQUksT0FBTyxXQUFXLEdBQUcsY0FBYyxDQUFDO0FBQ3hDLElBQUksT0FBTyxVQUFVLEdBQUcsWUFBWSxDQUFDO0FB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
