'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var justright_core_v1 = require('justright_core_v1');
var coreutil_v1 = require('coreutil_v1');
var mindi_v1 = require('mindi_v1');

class CustomAppearance {

    static get SIZE_DEFAULT() { return "size-default"; }
    static get SIZE_SMALL() { return "size-small"; }
    static get SIZE_MEDIUM() { return "size-medium"; }
    static get SIZE_LARGE() { return "size-large"; }

    static get SHAPE_DEAFULT() { return "shape-default"; }
    static get SHAPE_ROUND() { return "shape-round"; }
    static get SHAPE_SQUARE() { return "shape-square"; }

    static get VISIBILITY_DEAFULT() { return "visibility-default"; }
    static get VISIBILITY_VISIBLE() { return "visibility-visible"; }
    static get VISIBILITY_HIDDEN() { return "visibility-hidden"; }

    static get SPACING_DEFAULT() { return "spacing-default"; }
    static get SPACING_NONE() { return "spacing-none"; }
    static get SPACING_ABOVE() { return "spacing-above"; }
    static get SPACING_BELOW() { return "spacing-below"; }
    static get SPACING_ABOVE_BELOW() { return "spacing-above-below"; }

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

const LOG = new coreutil_v1.Logger("BackShade");

class BackShade {

	static get COMPONENT_NAME() { return "BackShade"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/backShade.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/backShade.css"; }

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

        /**
         * @type {BackShadeListeners}
         */
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

const LOG$1 = new coreutil_v1.Logger("Background");

class Background {

	static get COMPONENT_NAME() { return "Background"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/background.html"; }
	static get STYLES_URL() { return "/assets/justrightjs-ui/background.css"; }

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
			this.component.get("background").setAttributeValue("style", "background-image: url(\"" + this.backgroundImagePath + "\")");
		}
		justright_core_v1.CanvasStyles.enableStyle(Background.COMPONENT_NAME);
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
        this.applyClasses("banner-label-message");
        this.component.get("bannerLabelMessageCloseButton").listenTo("click", () => {
            this.eventManager.trigger(BannerLabelMessage.EVENT_CLOSE_CLICKED);
        });
    }

    hide() {
        this.applyClasses("banner-label-message banner-label-message-hidden");
        this.isVisible = false;
        this.toggleDisplay();
    }

    toggleDisplay() {
        coreutil_v1.TimePromise.asPromise(500, () => {
            if (!this.isVisible) {
                this.component.get("bannerLabelMessage").setAttributeValue("style", "display:none");
            }
        });
    }

    toggleVisibility() {
        coreutil_v1.TimePromise.asPromise(50, () => {
            if (this.isVisible) {
                this.applyClasses("banner-label-message banner-label-message-visible");
            }
        });
    }

    show() {
        this.component.get("bannerLabelMessage").setAttributeValue("style", "display:block");
        this.toggleVisibility();
        this.isVisible = true;
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

    applyClasses(baseClasses) {
        let classes = baseClasses;
        classes = classes + " banner-label-message-" + this.bannerType;
        if (this.customAppearance) {
            if (this.customAppearance.shape) {
                classes = classes + " banner-label-message-" + this.customAppearance.shape;
            }
            if (this.customAppearance.size) {
                classes = classes + " banner-label-message-" + this.customAppearance.size;
            }
            if (this.customAppearance.spacing) {
                classes = classes + " banner-label-message-" + this.customAppearance.spacing;
            }
        }
        this.component.get("bannerLabelMessageContent").setAttributeValue("class", classes);
    }
}

class BannerLabel {

	static get COMPONENT_NAME() { return "BannerLabel"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/bannerLabel.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/bannerLabel.css"; }

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

const LOG$2 = new coreutil_v1.Logger("BannerMessage");

class BannerMessage {

	static get COMPONENT_NAME() { return "BannerMessage"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/bannerMessage.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/bannerMessage.css"; }

    static get TYPE_ALERT() { return "type-alert"; }
    static get TYPE_INFO() { return "type-info"; }
    static get TYPE_SUCCESS() { return "type-success"; }
    static get TYPE_WARNING() { return "type-warning"; }

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

const LOG$3 = new coreutil_v1.Logger("Button");

class Button {

	static get COMPONENT_NAME() { return "Button"; }
    static get TEMPLATE_URL()   { return "/assets/justrightjs-ui/button.html"; }
    static get STYLES_URL()     { return "/assets/justrightjs-ui/button.css"; }

    static get TYPE_PRIMARY()   { return "button-primary"; }
    static get TYPE_SECONDARY() { return "button-secondary"; }
    static get TYPE_SUCCESS()   { return "button-success"; }
    static get TYPE_INFO()      { return "button-info"; }
    static get TYPE_WARNING()   { return "button-warning"; }
    static get TYPE_DANGER()    { return "button-danger"; }
    static get TYPE_LIGHT()     { return "button-light"; }
    static get TYPE_DARK()      { return "button-dark"; }

    static get EVENT_CLICKED()      { return "click"; }

    /**
     * 
     * @param {string} label
     * @param {string} buttonType
     */
    constructor(label, buttonType = Button.TYPE_PRIMARY) {

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.label = label;

        /** @type {string} */
        this.buttonType = buttonType;

        /** @type {EventManager<Button>} */
        this.eventManager = new justright_core_v1.EventManager();
    }

    /** @type {EventManager<Button>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create("Button");
        justright_core_v1.CanvasStyles.enableStyle(Button.COMPONENT_NAME);
        this.component.get("button").setChild(this.label);
        this.component.get("button").setAttributeValue("class","button " + this.buttonType);
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
        this.component.get("spinnerContainer").setAttributeValue("class","button-spinner-container-visible");
    }

    disableLoading() {
        this.component.get("spinnerContainer").setAttributeValue("class","button-spinner-container-hidden");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled","true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}

const LOG$4 = new coreutil_v1.Logger("DialogBox");

class DialogBox {

	static get COMPONENT_NAME() { return "DialogBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/dialogBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/dialogBox.css"; }
    
    static get OPTION_BACK_ON_CLOSE() { return 1; }

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
        const options = this.options;
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
}

const LOG$5 = new coreutil_v1.Logger("DropDownPanel");

class DropDownPanel {

	static get COMPONENT_NAME()    { return "DropDownPanel"; }
    static get TEMPLATE_URL()      { return "/assets/justrightjs-ui/dropDownPanel.html"; }
    static get STYLES_URL()        { return "/assets/justrightjs-ui/dropDownPanel.css"; }

    static get TYPE_PRIMARY()      { return " drop-down-panel-button-primary "; }
    static get TYPE_SECONDARY()    { return " drop-down-panel-button-secondary "; }
    static get TYPE_SUCCESS()      { return " drop-down-panel-button-success "; }
    static get TYPE_INFO()         { return " drop-down-panel-button-info "; }
    static get TYPE_WARNING()      { return " drop-down-panel-button-warning "; }
    static get TYPE_DANGER()       { return " drop-down-panel-button-danger "; }
    static get TYPE_LIGHT()        { return " drop-down-panel-button-light "; }
    static get TYPE_DARK()         { return " drop-down-panel-button-dark "; }

    static get ORIENTATION_LEFT()  { return " drop-down-panel-content-left "; }
    static get ORIENTATION_RIGHT() { return " drop-down-panel-content-right "; }

    static get CONTENT_VISIBLE()   { return " drop-down-panel-content-visible "; }
    static get CONTENT_HIDDEN()    { return " drop-down-panel-content-hidden "; }
    static get CONTENT_EXPAND()    { return " drop-down-panel-content-expand "; }
    static get CONTENT_COLLAPSE()  { return " drop-down-panel-content-collapse "; }
    static get CONTENT()           { return " drop-down-panel-content "; }
    static get BUTTON()            { return " drop-down-panel-button "; }

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = DropDownPanel.TYPE_DARK, orientation = DropDownPanel.ORIENTATION_LEFT) {

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.iconClass = iconClass;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.orientation = orientation;

    }

    postConfig() {
        this.component = this.componentFactory.create(DropDownPanel.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(DropDownPanel.COMPONENT_NAME);
        this.component.get("button").setChild(justright_core_v1.HTML.i("", this.iconClass));
        this.component.get("button").setAttributeValue("class", DropDownPanel.BUTTON + this.type);
        this.component.get("content").setAttributeValue("class", DropDownPanel.CONTENT + DropDownPanel.CONTENT_HIDDEN + this.orientation);
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
        if (this.component.get("arrow").getStyle("display") !== "block") {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        this.component.get("content").setAttributeValue("class", DropDownPanel.CONTENT + DropDownPanel.CONTENT_VISIBLE + this.orientation);
        this.component.get("arrow").setStyle("display", "block");
        this.component.get("content").element.focus();
    }

    hide() {
        this.component.get("content").setAttributeValue("class", DropDownPanel.CONTENT + DropDownPanel.CONTENT_HIDDEN + this.orientation);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}

const LOG$6 = new coreutil_v1.Logger("CommonInput");

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
        this.component.get(this.inputElementId).setAttributeValue("placeholder", this.placeholder);

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
        if ("" === event.getTargetValue()) {
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
        if ("" === event.getTargetValue()) {
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

const LOG$7 = new coreutil_v1.Logger("Panel");

class Panel {

	static get COMPONENT_NAME() { return "Panel"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/panel.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/panel.css"; }

    static get PARAMETER_STYLE_TYPE_COLUMN_ROOT() { return " panel-type-column-root "; }
    static get PARAMETER_STYLE_TYPE_COLUMN() { return " panel-type-column "; }
    static get PARAMETER_STYLE_TYPE_ROW() { return " panel-type-row "; }

    static get PARAMETER_STYLE_CONTENT_ALIGN_LEFT() { return " panel-content-align-left "; }
    static get PARAMETER_STYLE_CONTENT_ALIGN_RIGHT() { return " panel-content-align-right "; }
    static get PARAMETER_STYLE_CONTENT_ALIGN_CENTER() { return " panel-content-align-center "; }
    static get PARAMETER_STYLE_CONTENT_ALIGN_JUSTIFY() { return " panel-content-align-justify "; }

    static get PARAMETER_STYLE_SIZE_AUTO() { return " panel-size-auto "; }
    static get PARAMETER_STYLE_SIZE_MINIMAL() { return " panel-size-minimal "; }
    static get PARAMETER_STYLE_SIZE_RESPONSIVE() { return " panel-size-responsive "; }

    static get OPTION_STYLE_CONTENT_PADDING_SMALL() { return " panel-content-padding-small "; }
    static get OPTION_STYLE_CONTENT_PADDING_LARGE() { return " panel-content-padding-large "; }

    static get OPTION_STYLE_BORDER_SHADOW() { return " panel-border-shadow "; }

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
        this.component = this.componentFactory.create("Panel");
        let classString = "";
        classString = classString + this.type;
        classString = classString + this.contentAlign;
        classString = classString + this.size;
        this.options.forEach(value => {
            classString = classString + value;
        });
        this.component.get("panel").setAttributeValue("class", classString);
        justright_core_v1.CanvasStyles.enableStyle(Panel.COMPONENT_NAME);
    }

}

class SlideDeckEntry {

    static get COMPONENT_NAME() { return "SlideDeckEntry"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/slideDeckEntry.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/slideDeckEntry.css"; }

    constructor() {
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Number} */
        this.index = 0;

        this.isVisible = false;
    }

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeckEntry.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(SlideDeckEntry.COMPONENT_NAME);
    }

    setIndex(index) {
        this.index = index;
    }

    setContent(component) {
        this.component.setChild("slideDeckEntryContent", component);
    }

    show() {
        this.component.get("slideDeckEntryContent").setAttributeValue("style", "display:block");
        this.component.get("slideDeckEntry").setAttributeValue("class", "slide-deck-entry-visible");
        this.isVisible = true;
        
    }

    hide(nextIndex) {
        if (nextIndex > this.index) {
            this.component.get("slideDeckEntry").setAttributeValue("class", "slide-deck-entry-hidden slide-deck-entry-move-left");
        } else {
            this.component.get("slideDeckEntry").setAttributeValue("class", "slide-deck-entry-hidden slide-deck-entry-move-right");
        }
        this.isVisible = false;
        this.toggleDisplay();
    }

    toggleDisplay() {
        coreutil_v1.TimePromise.asPromise(1000, () => {
            if (!this.isVisible) {
                this.component.get("slideDeckEntryContent").setAttributeValue("style", "display:none");
            }
        });
    }

}

class SlideDeck {

    static get COMPONENT_NAME() { return "SlideDeck"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/slideDeck.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/slideDeck.css"; }

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
    }

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeck.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(SlideDeck.COMPONENT_NAME);

        if (this.componentMap) {
            this.prepareEntries();
        }
    }

    prepareEntries() {
        this.componentMap.forEach(async (key, component, parent) => {

            const slideDeckEntry = await this.slideDeckEntryProvider.get();

            
            if (null == this.currentEntry) {
                slideDeckEntry.show(0);
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
    }

    slidePrevious() {
        if (this.currentEntry.index <= 0) {
            return;
        }
        const nextEntry = this.slideDeckEntryList.get(this.currentEntry.index - 1);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();
    }

    slideTo(name) {
        const nextEntry = this.slideDeckEntryMap.get(name);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();
    }

}

const LOG$8 = new coreutil_v1.Logger("CheckBox");

class CheckBox {

	static get COMPONENT_NAME() { return "CheckBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/checkBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/checkBox.css"; }
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

const LOG$9 = new coreutil_v1.Logger("EmailInput");

class EmailInput extends CommonInput {

    static get COMPONENT_NAME() { return "EmailInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Email"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }

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

const LOG$a = new coreutil_v1.Logger("PasswordInput");

class PasswordInput extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

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

const LOG$b = new coreutil_v1.Logger("PasswordMatcherInputValue");

class PasswordMatcherInputValue extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputValue"; }
    static get DEFAULT_PLACEHOLDER() { return "New password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.css"; }

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

const LOG$c = new coreutil_v1.Logger("PasswordMatcherInputControl");

class PasswordMatcherInputControl extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputControl"; }
    static get DEFAULT_PLACEHOLDER() { return "Confirm password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.css"; }

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

const LOG$d = new coreutil_v1.Logger("PasswordMatcherInput");

class PasswordMatcherInput {

	static get COMPONENT_NAME() { return "PasswordMatcherInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.css"; }

	static get EVENT_VALIDATED_ENTERED() { return "validatedEntered"; }

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

const LOG$e = new coreutil_v1.Logger("TextInput");

class TextInput$1 extends CommonInput {

    static get COMPONENT_NAME() { return "TextInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Text"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }

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

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "phone-input-error phone-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "phone-input-error phone-input-error-hidden"); }
}

const LOG$f = new coreutil_v1.Logger("PhoneInput");

class PhoneInput extends CommonInput {

    static get COMPONENT_NAME() { return "PhoneInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Phone"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/phoneInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/phoneInput.css"; }

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

exports.BackShade = BackShade;
exports.BackShadeListeners = BackShadeListeners;
exports.Background = Background;
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
exports.Panel = Panel;
exports.PasswordInput = PasswordInput;
exports.PasswordMatcherInput = PasswordMatcherInput;
exports.PasswordMatcherInputControl = PasswordMatcherInputControl;
exports.PasswordMatcherInputValue = PasswordMatcherInputValue;
exports.PasswordMatcherModel = PasswordMatcherModel;
exports.PhoneInput = PhoneInput;
exports.SlideDeck = SlideDeck;
exports.SlideDeckEntry = SlideDeckEntry;
exports.TextInput = TextInput$1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGVwZW5kZW5jaWVzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYW5uZXJMYWJlbC9iYW5uZXJMYWJlbE1lc3NhZ2UvYmFubmVyTGFiZWxNZXNzYWdlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTGFiZWwvYmFubmVyTGFiZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYW5uZXJNZXNzYWdlL2Jhbm5lck1lc3NhZ2UuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9idXR0b24vYnV0dG9uLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGlhbG9nQm94L2RpYWxvZ0JveC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2Ryb3BEb3duUGFuZWwvZHJvcERvd25QYW5lbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2NvbW1vbklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvcGFuZWwvcGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9zbGlkZURlY2svc2xpZGVEZWNrRW50cnkvc2xpZGVEZWNrRW50cnkuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9zbGlkZURlY2svc2xpZGVEZWNrLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvY2hlY2tCb3gvY2hlY2tCb3guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9lbWFpbElucHV0L2VtYWlsSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZElucHV0L3Bhc3N3b3JkSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVyTW9kZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3RleHRJbnB1dC90ZXh0SW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9waG9uZUlucHV0L3Bob25lSW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEN1c3RvbUFwcGVhcmFuY2Uge1xuXG4gICAgc3RhdGljIGdldCBTSVpFX0RFRkFVTFQoKSB7IHJldHVybiBcInNpemUtZGVmYXVsdFwiOyB9XG4gICAgc3RhdGljIGdldCBTSVpFX1NNQUxMKCkgeyByZXR1cm4gXCJzaXplLXNtYWxsXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNJWkVfTUVESVVNKCkgeyByZXR1cm4gXCJzaXplLW1lZGl1bVwiOyB9XG4gICAgc3RhdGljIGdldCBTSVpFX0xBUkdFKCkgeyByZXR1cm4gXCJzaXplLWxhcmdlXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgU0hBUEVfREVBRlVMVCgpIHsgcmV0dXJuIFwic2hhcGUtZGVmYXVsdFwiOyB9XG4gICAgc3RhdGljIGdldCBTSEFQRV9ST1VORCgpIHsgcmV0dXJuIFwic2hhcGUtcm91bmRcIjsgfVxuICAgIHN0YXRpYyBnZXQgU0hBUEVfU1FVQVJFKCkgeyByZXR1cm4gXCJzaGFwZS1zcXVhcmVcIjsgfVxuXG4gICAgc3RhdGljIGdldCBWSVNJQklMSVRZX0RFQUZVTFQoKSB7IHJldHVybiBcInZpc2liaWxpdHktZGVmYXVsdFwiOyB9XG4gICAgc3RhdGljIGdldCBWSVNJQklMSVRZX1ZJU0lCTEUoKSB7IHJldHVybiBcInZpc2liaWxpdHktdmlzaWJsZVwiOyB9XG4gICAgc3RhdGljIGdldCBWSVNJQklMSVRZX0hJRERFTigpIHsgcmV0dXJuIFwidmlzaWJpbGl0eS1oaWRkZW5cIjsgfVxuXG4gICAgc3RhdGljIGdldCBTUEFDSU5HX0RFRkFVTFQoKSB7IHJldHVybiBcInNwYWNpbmctZGVmYXVsdFwiOyB9XG4gICAgc3RhdGljIGdldCBTUEFDSU5HX05PTkUoKSB7IHJldHVybiBcInNwYWNpbmctbm9uZVwiOyB9XG4gICAgc3RhdGljIGdldCBTUEFDSU5HX0FCT1ZFKCkgeyByZXR1cm4gXCJzcGFjaW5nLWFib3ZlXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNQQUNJTkdfQkVMT1coKSB7IHJldHVybiBcInNwYWNpbmctYmVsb3dcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1BBQ0lOR19BQk9WRV9CRUxPVygpIHsgcmV0dXJuIFwic3BhY2luZy1hYm92ZS1iZWxvd1wiOyB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zaXplID0gQ3VzdG9tQXBwZWFyYW5jZS5TSVpFX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBDdXN0b21BcHBlYXJhbmNlLlNIQVBFX0RFQUZVTFQ7XG4gICAgICAgIHRoaXMuc3BhY2luZyA9IEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19ERUZBVUxUO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSBDdXN0b21BcHBlYXJhbmNlLlZJU0lCSUxJVFlfREVBRlVMVDtcbiAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB3aXRoU2l6ZShzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTaGFwZShzaGFwZSkge1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTcGFjaW5nKHNwYWNpbmcpIHtcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gc3BhY2luZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFZpc2liaWxpdHkodmlzaWJpbGl0eSkge1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcblxuZXhwb3J0IGNsYXNzIERlcGVuZGVuY2llcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRDbGFzcyA9IENvbXBvbmVudDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuZXhwb3J0IGNsYXNzIEJhY2tTaGFkZUxpc3RlbmVycyB7XG5cbiAgICBjb25zdHJ1Y3RvcihleGlzdGluZ0xpc3RlbmVycyA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyID0gKGV4aXN0aW5nTGlzdGVuZXJzICYmIGV4aXN0aW5nTGlzdGVuZXJzLmdldEJhY2tncm91bmRDbGlja2VkKSA/IGV4aXN0aW5nTGlzdGVuZXJzLmdldEJhY2tncm91bmRDbGlja2VkKCkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBiYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyIFxuICAgICAqL1xuICAgIHdpdGhCYWNrZ3JvdW5kQ2xpY2tlZChiYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciA9IGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgZ2V0QmFja2dyb3VuZENsaWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXI7XG4gICAgfVxuXG4gICAgY2FsbEJhY2tncm91bmRDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2FsbExpc3RlbmVyKHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciwgZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjYWxsTGlzdGVuZXIobGlzdGVuZXIsIGV2ZW50KSB7XG4gICAgICAgIGlmIChudWxsICE9IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBsaXN0ZW5lci5jYWxsKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIEJhc2VFbGVtZW50XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQmFja1NoYWRlTGlzdGVuZXJzIH0gZnJvbSBcIi4vYmFja1NoYWRlTGlzdGVuZXJzLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGUge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJhY2tTaGFkZVwiOyB9XG5cdHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tTaGFkZS5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmNzc1wiOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihiYWNrU2hhZGVMaXN0ZW5lcnMgPSBuZXcgQmFja1NoYWRlTGlzdGVuZXJzKCkpe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0Jhc2VFbGVtZW50fSAqL1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtCYWNrU2hhZGVMaXN0ZW5lcnN9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmJhY2tTaGFkZUxpc3RlbmVycyA9IGJhY2tTaGFkZUxpc3RlbmVycztcblxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cdH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYWNrU2hhZGUuQ09NUE9ORU5UX05BTUUpO1xuICAgIH1cblxuICAgIGhpZGVBZnRlcihtaWxsaVNlY29uZHMpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlXCIpO1xuICAgICAgICBjb25zdCBoaWRlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZShtaWxsaVNlY29uZHMsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpc2FibGVTdHlsZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UobWlsbGlTZWNvbmRzICsgMSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2hpZGVQcm9taXNlLCBkaXNhYmxlU3R5bGVQcm9taXNlXSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHJldHVybiBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLFxuICAgICAgICAgICAgKCkgPT4geyBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZSBzaG93XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxufSIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgQ2FudmFzU3R5bGVzIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrZ3JvdW5kXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZCB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFja2dyb3VuZFwiOyB9XG5cdHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tncm91bmQuaHRtbFwiOyB9XG5cdHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYWNrZ3JvdW5kLmNzc1wiOyB9XG5cbiAgICBjb25zdHJ1Y3RvcihiYWNrZ3JvdW5kSW1hZ2VQYXRoKXtcblx0XHQvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge3N0cmluZ30gKi9cblx0XHR0aGlzLmJhY2tncm91bmRJbWFnZVBhdGggPSBiYWNrZ3JvdW5kSW1hZ2VQYXRoO1xuXHR9XG5cblx0c2V0KGtleSx2YWwpIHtcblx0XHR0aGlzLmNvbXBvbmVudC5zZXQoa2V5LHZhbCk7XG5cdH1cblxuXHRwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYWNrZ3JvdW5kLkNPTVBPTkVOVF9OQU1FKTtcblx0XHRpZiAodGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoKSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrZ3JvdW5kXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIlwiICsgdGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoICsgXCJcXFwiKVwiKTtcblx0XHR9XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmQuQ09NUE9ORU5UX05BTUUpO1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnRGYWN0b3J5LCBFdmVudE1hbmFnZXIgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uLy4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJhbm5lckxhYmVsTWVzc2FnZSB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFubmVyTGFiZWxNZXNzYWdlXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJMYWJlbE1lc3NhZ2UuaHRtbFwiOyB9XG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lckxhYmVsTWVzc2FnZS5jc3NcIjsgfVxuXG4gICAgc3RhdGljIGdldCBFVkVOVF9DTE9TRV9DTElDS0VEKCkgeyByZXR1cm4gXCJjbG9zZUNsaWNrZWRcIjsgfVxuXG4gICAgc3RhdGljIGdldCBUWVBFX0FMRVJUKCkgeyByZXR1cm4gXCJ0eXBlLWFsZXJ0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpIHsgcmV0dXJuIFwidHlwZS1pbmZvXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfU1VDQ0VTUygpIHsgcmV0dXJuIFwidHlwZS1zdWNjZXNzXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwidHlwZS13YXJuaW5nXCI7IH1cblxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGJhbm5lclR5cGUgPSBCYW5uZXJMYWJlbE1lc3NhZ2UuVFlQRV9JTkZPLCBjdXN0b21BcHBlYXJhbmNlID0gbnVsbCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmJhbm5lclR5cGUgPSBiYW5uZXJUeXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lckxhYmVsTWVzc2FnZS5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYW5uZXJMYWJlbE1lc3NhZ2UuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1sYWJlbC1tZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VDbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1sYWJlbC1tZXNzYWdlIGJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKTtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50b2dnbGVEaXNwbGF5KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRGlzcGxheSgpIHtcbiAgICAgICAgVGltZVByb21pc2UuYXNQcm9taXNlKDUwMCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlDbGFzc2VzKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UgYmFubmVyLWxhYmVsLW1lc3NhZ2UtdmlzaWJsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJkaXNwbGF5OmJsb2NrXCIpO1xuICAgICAgICB0aGlzLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHNldE1lc3NhZ2UoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlIZWFkZXIoaGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZUhlYWRlclwiKS5zZXRDaGlsZCh0aGlzLmhlYWRlcik7XG4gICAgfVxuXG4gICAgYXBwbHlNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlVGV4dFwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGFwcGx5Q2xhc3NlcyhiYXNlQ2xhc3Nlcykge1xuICAgICAgICBsZXQgY2xhc3NlcyA9IGJhc2VDbGFzc2VzO1xuICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5iYW5uZXJUeXBlO1xuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbGFiZWwtbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZykge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VDb250ZW50XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgY2xhc3Nlcyk7XG4gICAgfVxufSIsImltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5pbXBvcnQgeyBCYW5uZXJMYWJlbE1lc3NhZ2UgfSBmcm9tIFwiLi9iYW5uZXJMYWJlbE1lc3NhZ2UvYmFubmVyTGFiZWxNZXNzYWdlLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJMYWJlbCB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFubmVyTGFiZWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lckxhYmVsLmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJMYWJlbC5jc3NcIjsgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdHRoaXMuYXBwZWFyYW5jZSA9IG5ldyBDdXN0b21BcHBlYXJhbmNlKClcblx0XHRcdC53aXRoU2l6ZShDdXN0b21BcHBlYXJhbmNlLlNJWkVfU01BTEwpXG5cdFx0XHQud2l0aFNoYXBlKEN1c3RvbUFwcGVhcmFuY2UuU0hBUEVfUk9VTkQpXG5cdFx0XHQud2l0aFNwYWNpbmcoQ3VzdG9tQXBwZWFyYW5jZS5TUEFDSU5HX0JFTE9XKTtcblxuXHRcdC8qKiBAdHlwZSB7QmFubmVyTGFiZWxNZXNzYWdlfSAqL1xuXHRcdHRoaXMuc3VjY2VzcyA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfU1VDQ0VTUywgdGhpcy5hcHBlYXJhbmNlXSk7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsTWVzc2FnZX0gKi9cblx0XHR0aGlzLndhcm5pbmcgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX1dBUk5JTkcsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG5cdFx0LyoqIEB0eXBlIHtCYW5uZXJMYWJlbE1lc3NhZ2V9ICovXG5cdFx0dGhpcy5lcnJvciA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfQUxFUlQsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lckxhYmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lckxhYmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5zdWNjZXNzLmhpZGUoKTtcbiAgICAgICAgdGhpcy53YXJuaW5nLmhpZGUoKTtcbiAgICAgICAgdGhpcy5lcnJvci5oaWRlKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLmFkZENoaWxkKHRoaXMuc3VjY2Vzcy5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5hZGRDaGlsZCh0aGlzLndhcm5pbmcuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuYWRkQ2hpbGQodGhpcy5lcnJvci5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSkpO1xuICAgICAgICB0aGlzLndhcm5pbmcuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSkpO1xuICAgICAgICB0aGlzLmVycm9yLmV2ZW50TWFuYWdlci5saXN0ZW5UbyhCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpKTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLnN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzaG93U3VjY2VzcyhoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93QmFubmVyKHRoaXMuc3VjY2VzcywgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIHNob3dXYXJuaW5nKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy53YXJuaW5nLCBoZWFkZXIsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgc2hvd0Vycm9yKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy5lcnJvciwgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIGhpZGUoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhbm5lci1sYWJlbCBiYW5uZXItbGFiZWwtaGlkZGVuXCIpO1xuICAgICAgICB0aGlzLmFjdGl2ZS5oaWRlKCk7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCYW5uZXJMYWJlbE1lc3NhZ2V9IGJhbm5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqL1xuICAgICBzaG93QmFubmVyKGJhbm5lciwgaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXHRcdGJhbm5lci5zZXRNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSk7XG4gICAgICAgIGJhbm5lci5zaG93KCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYW5uZXItbGFiZWwgYmFubmVyLWxhYmVsLXZpc2libGVcIik7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcblx0XHR0aGlzLmFjdGl2ZSA9IGJhbm5lcjtcbiAgICB9XG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnRcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhbm5lck1lc3NhZ2VcIik7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJNZXNzYWdlIHtcblxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJCYW5uZXJNZXNzYWdlXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJNZXNzYWdlLmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJNZXNzYWdlLmNzc1wiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFRZUEVfQUxFUlQoKSB7IHJldHVybiBcInR5cGUtYWxlcnRcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJ0eXBlLWluZm9cIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJ0eXBlLXN1Y2Nlc3NcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgeyByZXR1cm4gXCJ0eXBlLXdhcm5pbmdcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhbm5lclR5cGUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjbG9zZWFibGUgXG4gICAgICogQHBhcmFtIHtDdXN0b21BcHBlYXJhbmNlfSBjdXN0b21BcHBlYXJhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lck1lc3NhZ2UuVFlQRV9JTkZPLCBjbG9zZWFibGUgPSBmYWxzZSwgY3VzdG9tQXBwZWFyYW5jZSA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYW5uZXJUeXBlID0gYmFubmVyVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge01ldGhvZH0gKi9cbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkJhbm5lck1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQoXCJBbGVydFwiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZU1lc3NhZ2VcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBmYWRlXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsdGhpcy5oaWRlKSk7XG4gICAgfVxuXG4gICAgYXBwbHlDbGFzc2VzKGJhc2VDbGFzc2VzKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gYmFzZUNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmJhbm5lclR5cGU7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLGNsYXNzZXMpO1xuICAgIH1cbiAgICBcbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGNsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25IaWRlTGlzdGVuZXIgXG4gICAgICovXG4gICAgb25IaWRlKG9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBvbkhpZGVMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25TaG93TGlzdGVuZXIgXG4gICAgICovXG4gICAgb25TaG93KG9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBvblNob3dMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGhpZGVcIik7XG4gICAgICAgIGF3YWl0IFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MDAsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vbkhpZGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzaG93KG5ld0hlYWRlciA9IG51bGwsIG5ld01lc3NhZ2UgPSBudWxsKSB7XG4gICAgICAgIGlmIChuZXdIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlIZWFkZXIobmV3SGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3TWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1lc3NhZ2UobmV3TWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UuQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuICAgICAgICBhd2FpdCBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLCgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIHNob3dcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLm9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyLmNhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQnV0dG9uXCIpO1xuXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcblxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJCdXR0b25cIjsgfVxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgICB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYnV0dG9uLmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpICAgICB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYnV0dG9uLmNzc1wiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFRZUEVfUFJJTUFSWSgpICAgeyByZXR1cm4gXCJidXR0b24tcHJpbWFyeVwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1NFQ09OREFSWSgpIHsgcmV0dXJuIFwiYnV0dG9uLXNlY29uZGFyeVwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSAgIHsgcmV0dXJuIFwiYnV0dG9uLXN1Y2Nlc3NcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgICAgICB7IHJldHVybiBcImJ1dHRvbi1pbmZvXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpICAgeyByZXR1cm4gXCJidXR0b24td2FybmluZ1wiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX0RBTkdFUigpICAgIHsgcmV0dXJuIFwiYnV0dG9uLWRhbmdlclwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX0xJR0hUKCkgICAgIHsgcmV0dXJuIFwiYnV0dG9uLWxpZ2h0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFSSygpICAgICAgeyByZXR1cm4gXCJidXR0b24tZGFya1wiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0NMSUNLRUQoKSAgICAgIHsgcmV0dXJuIFwiY2xpY2tcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvblR5cGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYWJlbCwgYnV0dG9uVHlwZSA9IEJ1dHRvbi5UWVBFX1BSSU1BUlkpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5idXR0b25UeXBlID0gYnV0dG9uVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxCdXR0b24+fSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxCdXR0b24+fSAqL1xuICAgIGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiQnV0dG9uXCIpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQnV0dG9uLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYnV0dG9uIFwiICsgdGhpcy5idXR0b25UeXBlKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQnV0dG9uLkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBtZXRob2QgXG4gICAgICovXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobWV0aG9kKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG1ldGhvZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGVuYWJsZUxvYWRpbmcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJDb250YWluZXJcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLXZpc2libGVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxvYWRpbmcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJDb250YWluZXJcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBFdmVudCxcbiAgICBOYXZpZ2F0aW9uXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgVGltZVByb21pc2UsIExvZ2dlciwgTWV0aG9kLCBMaXN0IH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQmFja1NoYWRlIH0gZnJvbSBcIi4uL2JhY2tTaGFkZS9iYWNrU2hhZGUuanNcIjtcbmltcG9ydCB7IEJhY2tTaGFkZUxpc3RlbmVycyB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlTGlzdGVuZXJzLmpzXCI7XG5cblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRpYWxvZ0JveFwiKTtcblxuZXhwb3J0IGNsYXNzIERpYWxvZ0JveCB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiRGlhbG9nQm94XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9kaWFsb2dCb3guaHRtbFwiOyB9XG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2RpYWxvZ0JveC5jc3NcIjsgfVxuICAgIFxuICAgIHN0YXRpYyBnZXQgT1BUSU9OX0JBQ0tfT05fQ0xPU0UoKSB7IHJldHVybiAxOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0T3B0aW9ucyA9IFtdKXtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7QmFja1NoYWRlfSAqL1xuICAgICAgICB0aGlzLmJhY2tTaGFkZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEJhY2tTaGFkZSwgW1xuICAgICAgICAgICAgbmV3IEJhY2tTaGFkZUxpc3RlbmVycygpXG4gICAgICAgICAgICAgICAgLndpdGhCYWNrZ3JvdW5kQ2xpY2tlZChuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSkpXSk7XG5cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc3dhbGxvd0ZvY3VzRXNjYXBlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5vd25pbmdUcmlnZ2VyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0xpc3Q8c3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IG5ldyBMaXN0KGRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvKiogQHR5cGUge0xpc3Q8c3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IExpc3QoZGVmYXVsdE9wdGlvbnMpO1xuICAgIH1cbiAgICBcbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0KFwiYmFja1NoYWRlQ29udGFpbmVyXCIsIHRoaXMuYmFja1NoYWRlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNsb3NlQnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsb3NlKSk7XG4gICAgICAgIENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZShuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2xvc2UpLCB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hPdmVybGF5XCIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBcbiAgICAgKi9cbiAgICBzZXRUaXRsZSh0ZXh0KXsgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJ0aXRsZVwiLCB0ZXh0KTsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcbiAgICAgKi9cbiAgICBzZXRGb290ZXIoY29tcG9uZW50KXtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94Rm9vdGVyXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImRpYWxvZ0JveEZvb3RlclwiLCBjb21wb25lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXG4gICAgICovXG4gICAgc2V0Q29udGVudChjb21wb25lbnQpeyB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImRpYWxvZ0JveENvbnRlbnRcIixjb21wb25lbnQpOyB9XG5cblx0c2V0KGtleSx2YWwpIHsgdGhpcy5jb21wb25lbnQuc2V0KGtleSx2YWwpOyB9XG4gICAgXG4gICAgYXN5bmMgY2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGF3YWl0IHRoaXMuaGlkZSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5jb250YWlucyhEaWFsb2dCb3guT1BUSU9OX0JBQ0tfT05fQ0xPU0UpKSB7XG4gICAgICAgICAgICBOYXZpZ2F0aW9uLmluc3RhbmNlKCkuYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgaGlkZShldmVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIpO1xuICAgICAgICBjb25zdCBoaWRlQmFja1NoYWRlUHJvbWlzZSA9IHRoaXMuYmFja1NoYWRlLmhpZGVBZnRlcigzMDApO1xuICAgICAgICBjb25zdCBoaWRlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZSgyMDAsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LW5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpc2FibGVTdHlsZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMjAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3goKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKERpYWxvZ0JveC5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2hpZGVQcm9taXNlLCBkaXNhYmxlU3R5bGVQcm9taXNlLCBoaWRlQmFja1NoYWRlUHJvbWlzZV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gdGVtcG9yYXJ5T3B0aW9uc1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHNob3coZXZlbnQsIHRlbXBvcmFyeU9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRlbXBvcmFyeU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBMaXN0KHRlbXBvcmFyeU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIENhbnZhc1Jvb3Quc3dhbGxvd0ZvY3VzRXNjYXBlKDUwMCk7XG4gICAgICAgIGlmICghdGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7cmVzb2x2ZSgpO30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUuc2hvdygpO1xuICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrXCIpO1xuICAgICAgICByZXR1cm4gVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrIGRpYWxvZ2JveC1vdmVybGF5LXNob3dcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0RGlhbG9nQm94T3ZlcmxheSgpIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveE92ZXJsYXlcIik7IH1cblxuICAgIGdldERpYWxvZ0JveCgpIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveFwiKTsgfVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50LFxuICAgIENhbnZhc1Jvb3QsXG4gICAgSFRNTFxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRHJvcERvd25QYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIERyb3BEb3duUGFuZWwge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSAgICB7IHJldHVybiBcIkRyb3BEb3duUGFuZWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgICAgICB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZHJvcERvd25QYW5lbC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSAgICAgICAgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Ryb3BEb3duUGFuZWwuY3NzXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgVFlQRV9QUklNQVJZKCkgICAgICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXByaW1hcnkgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfU0VDT05EQVJZKCkgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zZWNvbmRhcnkgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfU1VDQ0VTUygpICAgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zdWNjZXNzIFwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX0lORk8oKSAgICAgICAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1idXR0b24taW5mbyBcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgICAgICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXdhcm5pbmcgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFOR0VSKCkgICAgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1kYW5nZXIgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfTElHSFQoKSAgICAgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1saWdodCBcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9EQVJLKCkgICAgICAgICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWRhcmsgXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgT1JJRU5UQVRJT05fTEVGVCgpICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtY29udGVudC1sZWZ0IFwiOyB9XG4gICAgc3RhdGljIGdldCBPUklFTlRBVElPTl9SSUdIVCgpIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1jb250ZW50LXJpZ2h0IFwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IENPTlRFTlRfVklTSUJMRSgpICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtdmlzaWJsZSBcIjsgfVxuICAgIHN0YXRpYyBnZXQgQ09OVEVOVF9ISURERU4oKSAgICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtY29udGVudC1oaWRkZW4gXCI7IH1cbiAgICBzdGF0aWMgZ2V0IENPTlRFTlRfRVhQQU5EKCkgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtZXhwYW5kIFwiOyB9XG4gICAgc3RhdGljIGdldCBDT05URU5UX0NPTExBUFNFKCkgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1jb250ZW50LWNvbGxhcHNlIFwiOyB9XG4gICAgc3RhdGljIGdldCBDT05URU5UKCkgICAgICAgICAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1jb250ZW50IFwiOyB9XG4gICAgc3RhdGljIGdldCBCVVRUT04oKSAgICAgICAgICAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1idXR0b24gXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uQ2xhc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmllbnRhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGljb25DbGFzcywgdHlwZSA9IERyb3BEb3duUGFuZWwuVFlQRV9EQVJLLCBvcmllbnRhdGlvbiA9IERyb3BEb3duUGFuZWwuT1JJRU5UQVRJT05fTEVGVCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShEcm9wRG93blBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERyb3BEb3duUGFuZWwuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0Q2hpbGQoSFRNTC5pKFwiXCIsIHRoaXMuaWNvbkNsYXNzKSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIERyb3BEb3duUGFuZWwuQlVUVE9OICsgdGhpcy50eXBlKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIERyb3BEb3duUGFuZWwuQ09OVEVOVCArIERyb3BEb3duUGFuZWwuQ09OVEVOVF9ISURERU4gKyB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKTtcbiAgICAgICAgQ2FudmFzUm9vdC5saXN0ZW5Ub0ZvY3VzRXNjYXBlKG5ldyBNZXRob2QodGhpcywgdGhpcy5oaWRlKSwgdGhpcy5jb21wb25lbnQuZ2V0KFwiZHJvcERvd25QYW5lbFJvb3RcIikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBkcm9wRG93blBhbmVsQ29udGVudCBcbiAgICAgKi9cbiAgICBzZXRQYW5lbENvbnRlbnQoZHJvcERvd25QYW5lbENvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5zZXRDaGlsZChkcm9wRG93blBhbmVsQ29udGVudC5jb21wb25lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ29udGVudCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKS5nZXRTdHlsZShcImRpc3BsYXlcIikgIT09IFwiYmxvY2tcIikge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBEcm9wRG93blBhbmVsLkNPTlRFTlQgKyBEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSArIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5lbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIERyb3BEb3duUGFuZWwuQ09OVEVOVCArIERyb3BEb3duUGFuZWwuQ09OVEVOVF9ISURERU4gKyB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgfVxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgfVxufSIsImltcG9ydCB7IE1ldGhvZCwgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbnB1dEVsZW1lbnREYXRhQmluZGluZywgQWJzdHJhY3RWYWxpZGF0b3IsIENvbXBvbmVudEZhY3RvcnksIENhbnZhc1N0eWxlcywgRXZlbnQsIENvbXBvbmVudCwgRXZlbnRNYW5hZ2VyIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ29tbW9uSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0NMSUNLRUQoKSB7IHJldHVybiBcImNsaWNrZWRcIjsgfVxuICAgIHN0YXRpYyBnZXQgRVZFTlRfRU5URVJFRCgpIHsgcmV0dXJuIFwiZW50ZXJlZFwiOyB9XG4gICAgc3RhdGljIGdldCBFVkVOVF9LRVlVUFBFRCgpIHsgcmV0dXJuIFwia2V5VXBwZWRcIjsgfVxuICAgIHN0YXRpYyBnZXQgRVZFTlRfQ0hBTkdFRCgpIHsgcmV0dXJuIFwiY2hhbmdkXCI7IH1cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0JMVVJSRUQoKSB7IHJldHVybiBcImJsdXJyZWRcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7QWJzdHJhY3RWYWxpZGF0b3J9IHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dEVsZW1lbnRJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckVsZW1lbnRJZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudE5hbWUsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG1vZGVsID0gbnVsbCxcbiAgICAgICAgdmFsaWRhdG9yID0gbnVsbCwgXG4gICAgICAgIHBsYWNlaG9sZGVyID0gbnVsbCxcbiAgICAgICAgaW5wdXRFbGVtZW50SWQgPSBcImlucHV0XCIsXG4gICAgICAgIGVycm9yRWxlbWVudElkID0gXCJlcnJvclwiKSB7XG5cblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBYnN0cmFjdFZhbGlkYXRvcn0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSB2YWxpZGF0b3I7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnRJZCA9IGlucHV0RWxlbWVudElkO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmVycm9yRWxlbWVudElkID0gZXJyb3JFbGVtZW50SWQ7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMudGFpbnRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZSh0aGlzLmNvbXBvbmVudE5hbWUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIsIHRoaXMucGxhY2Vob2xkZXIpO1xuXG4gICAgICAgIGlmKHRoaXMudmFsaWRhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci53aXRoVmFsaWRMaXN0ZW5lcihuZXcgTWV0aG9kKHRoaXMsdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwsIHRoaXMudmFsaWRhdG9yKS50byh0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJrZXl1cFwiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMua2V5dXBwZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiY2hhbmdlXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jaGFuZ2VkKSlcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImJsdXJcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmJsdXJyZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsaWNrZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwia2V5dXBcIiwgbmV3IE1ldGhvZCh0aGlzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNLZXlDb2RlKDEzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyZWQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZClcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5lcnJvckNsaWNrZWQpKTtcbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGtleXVwcGVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaXNLZXlDb2RlKDEzKSAmJiAhZXZlbnQuaXNLZXlDb2RlKDE2KSAmJiAhZXZlbnQuaXNLZXlDb2RlKDkpKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcIlwiID09PSBldmVudC5nZXRUYXJnZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0tFWVVQUEVELCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoXCJcIiA9PT0gZXZlbnQuZ2V0VGFyZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9DSEFOR0VELCBldmVudCk7XG4gICAgfVxuXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBlbnRlcmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9FTlRFUkVELCBldmVudCk7XG4gICAgfVxuXG4gICAgYmx1cnJlZChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudGFpbnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9CTFVSUkVELCBldmVudCk7XG4gICAgfVxuXG4gICAgZXJyb3JDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpO1xuICAgIH1cblxuICAgIGZvY3VzKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuZm9jdXMoKTsgfVxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNlbGVjdEFsbCgpOyB9XG4gICAgZW5hYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuZW5hYmxlKCk7IH1cbiAgICBkaXNhYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuZGlzYWJsZSgpOyB9XG4gICAgY2xlYXIoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS52YWx1ZSA9IFwiXCI7IHRoaXMudGFpbnRlZCA9IGZhbHNlOyB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTsgfVxuXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50LCBDYW52YXNTdHlsZXMgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFuZWwge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhbmVsXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYW5lbC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFuZWwuY3NzXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OX1JPT1QoKSB7IHJldHVybiBcIiBwYW5lbC10eXBlLWNvbHVtbi1yb290IFwiOyB9XG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU4oKSB7IHJldHVybiBcIiBwYW5lbC10eXBlLWNvbHVtbiBcIjsgfVxuICAgIHN0YXRpYyBnZXQgUEFSQU1FVEVSX1NUWUxFX1RZUEVfUk9XKCkgeyByZXR1cm4gXCIgcGFuZWwtdHlwZS1yb3cgXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fTEVGVCgpIHsgcmV0dXJuIFwiIHBhbmVsLWNvbnRlbnQtYWxpZ24tbGVmdCBcIjsgfVxuICAgIHN0YXRpYyBnZXQgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fUklHSFQoKSB7IHJldHVybiBcIiBwYW5lbC1jb250ZW50LWFsaWduLXJpZ2h0IFwiOyB9XG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9DRU5URVIoKSB7IHJldHVybiBcIiBwYW5lbC1jb250ZW50LWFsaWduLWNlbnRlciBcIjsgfVxuICAgIHN0YXRpYyBnZXQgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fSlVTVElGWSgpIHsgcmV0dXJuIFwiIHBhbmVsLWNvbnRlbnQtYWxpZ24tanVzdGlmeSBcIjsgfVxuXG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfU0laRV9BVVRPKCkgeyByZXR1cm4gXCIgcGFuZWwtc2l6ZS1hdXRvIFwiOyB9XG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfU0laRV9NSU5JTUFMKCkgeyByZXR1cm4gXCIgcGFuZWwtc2l6ZS1taW5pbWFsIFwiOyB9XG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfU0laRV9SRVNQT05TSVZFKCkgeyByZXR1cm4gXCIgcGFuZWwtc2l6ZS1yZXNwb25zaXZlIFwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IE9QVElPTl9TVFlMRV9DT05URU5UX1BBRERJTkdfU01BTEwoKSB7IHJldHVybiBcIiBwYW5lbC1jb250ZW50LXBhZGRpbmctc21hbGwgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IE9QVElPTl9TVFlMRV9DT05URU5UX1BBRERJTkdfTEFSR0UoKSB7IHJldHVybiBcIiBwYW5lbC1jb250ZW50LXBhZGRpbmctbGFyZ2UgXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgT1BUSU9OX1NUWUxFX0JPUkRFUl9TSEFET1coKSB7IHJldHVybiBcIiBwYW5lbC1ib3JkZXItc2hhZG93IFwiOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudEFsaWduIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gb3B0aW9ucyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0eXBlID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OX1JPT1QsXG4gICAgICAgIGNvbnRlbnRBbGlnbiA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0NFTlRFUixcbiAgICAgICAgc2l6ZSA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9TSVpFX0FVVE8sXG4gICAgICAgIG9wdGlvbnMgPSBbXSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5jb250ZW50QWxpZ24gPSBjb250ZW50QWxpZ247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheTxTdHJpbmc+fSAqL1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiUGFuZWxcIik7XG4gICAgICAgIGxldCBjbGFzc1N0cmluZyA9IFwiXCI7XG4gICAgICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyB0aGlzLnR5cGU7XG4gICAgICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyB0aGlzLmNvbnRlbnRBbGlnbjtcbiAgICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHRoaXMuc2l6ZTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicGFuZWxcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBjbGFzc1N0cmluZyk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYW5lbC5DT01QT05FTlRfTkFNRSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcywgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5leHBvcnQgY2xhc3MgU2xpZGVEZWNrRW50cnkge1xuXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiU2xpZGVEZWNrRW50cnlcIjsgfVxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3NsaWRlRGVja0VudHJ5Lmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9zbGlkZURlY2tFbnRyeS5jc3NcIjsgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge051bWJlcn0gKi9cbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG5cbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoU2xpZGVEZWNrRW50cnkuQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoU2xpZGVEZWNrRW50cnkuQ09NUE9ORU5UX05BTUUpO1xuICAgIH1cblxuICAgIHNldEluZGV4KGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInNsaWRlRGVja0VudHJ5Q29udGVudFwiLCBjb21wb25lbnQpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5Q29udGVudFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiZGlzcGxheTpibG9ja1wiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwic2xpZGVEZWNrRW50cnlcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInNsaWRlLWRlY2stZW50cnktdmlzaWJsZVwiKTtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBoaWRlKG5leHRJbmRleCkge1xuICAgICAgICBpZiAobmV4dEluZGV4ID4gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwic2xpZGVEZWNrRW50cnlcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInNsaWRlLWRlY2stZW50cnktaGlkZGVuIHNsaWRlLWRlY2stZW50cnktbW92ZS1sZWZ0XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwic2xpZGVEZWNrRW50cnlcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInNsaWRlLWRlY2stZW50cnktaGlkZGVuIHNsaWRlLWRlY2stZW50cnktbW92ZS1yaWdodFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvZ2dsZURpc3BsYXkoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVEaXNwbGF5KCkge1xuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwMCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5Q29udGVudFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiZGlzcGxheTpub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcywgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdmlkZXIgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IFNsaWRlRGVja0VudHJ5IH0gZnJvbSBcIi4vc2xpZGVEZWNrRW50cnkvc2xpZGVEZWNrRW50cnkuanNcIjtcblxuZXhwb3J0IGNsYXNzIFNsaWRlRGVjayB7XG5cbiAgICBzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJTbGlkZURlY2tcIjsgfVxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3NsaWRlRGVjay5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc2xpZGVEZWNrLmNzc1wiOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcDxDb21wb25lbnQ+fSBjb21wb25lbnRNYXAgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TWFwKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPENvbXBvbmVudD59ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFwID0gY29tcG9uZW50TWFwO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UHJvdmlkZXI8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihTbGlkZURlY2tFbnRyeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QgPSBuZXcgTGlzdCgpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge01hcDxOdW1iZXI+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5SW5kZXhNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTbGlkZURlY2tFbnRyeX0gKi9cbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBudWxsO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTbGlkZURlY2suQ09NUE9ORU5UX05BTUUpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoU2xpZGVEZWNrLkNPTVBPTkVOVF9OQU1FKTtcblxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRNYXApIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZUVudHJpZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXBhcmVFbnRyaWVzKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hcC5mb3JFYWNoKGFzeW5jIChrZXksIGNvbXBvbmVudCwgcGFyZW50KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHNsaWRlRGVja0VudHJ5ID0gYXdhaXQgdGhpcy5zbGlkZURlY2tFbnRyeVByb3ZpZGVyLmdldCgpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChudWxsID09IHRoaXMuY3VycmVudEVudHJ5KSB7XG4gICAgICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuc2hvdygwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IHNsaWRlRGVja0VudHJ5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzbGlkZURlY2tFbnRyeS5oaWRlKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TWFwLnNldChrZXksIHNsaWRlRGVja0VudHJ5KTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LmFkZChzbGlkZURlY2tFbnRyeSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5SW5kZXhNYXAuc2V0KGtleSwgdGhpcy5zbGlkZURlY2tFbnRyeUxpc3Quc2l6ZSgpIC0xKTtcblxuICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuc2V0Q29udGVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuc2V0SW5kZXgodGhpcy5zbGlkZURlY2tFbnRyeUxpc3Quc2l6ZSgpIC0gMSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmFkZENoaWxkKFwic2xpZGVEZWNrRW50cmllc1wiLCBzbGlkZURlY2tFbnRyeS5jb21wb25lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIHNsaWRlTmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEVudHJ5LmluZGV4ICsgMSA+PSB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0RW50cnkgPSB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5nZXQodGhpcy5jdXJyZW50RW50cnkuaW5kZXggKyAxKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuaGlkZShuZXh0RW50cnkuaW5kZXgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IG5leHRFbnRyeTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuc2hvdygpO1xuICAgIH1cblxuICAgIHNsaWRlUHJldmlvdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4IC0gMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcbiAgICB9XG5cbiAgICBzbGlkZVRvKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5nZXQobmFtZSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNoZWNrQm94XCIpO1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tCb3gge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkNoZWNrQm94XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9jaGVja0JveC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guY3NzXCI7IH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKENoZWNrQm94LkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKENoZWNrQm94LkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcblxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IEVtYWlsVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFbWFpbElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgRW1haWxJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkVtYWlsSW5wdXRcIjsgfVxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiRW1haWxcIjsgfVxuXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZW1haWxJbnB1dC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZW1haWxJbnB1dC5jc3NcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihFbWFpbElucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IEVtYWlsVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwiZW1haWxJbnB1dFwiLFxuICAgICAgICAgICAgXCJlbWFpbEVycm9yXCIpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG5cbn0iLCJpbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG4gICAgXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRJbnB1dFwiOyB9XG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJQYXNzd29yZFwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0Lmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0LmNzc1wiOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkSW5wdXQuQ09NUE9ORU5UX05BTUUsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGFzc3dvcmRJbnB1dFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZEVycm9yXCIpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG59IiwiaW1wb3J0IHsgUGFzc3dvcmRWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuICAgIFxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIjsgfVxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiTmV3IHBhc3N3b3JkXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuaHRtbFwiOyB9XG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuY3NzXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBQYXNzd29yZFZhbGlkYXRvcihtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlRXJyb3JcIik7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLWhpZGRlblwiKTsgfVxufSIsImltcG9ydCB7IEVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuICAgIFxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiOyB9XG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJDb25maXJtIHBhc3N3b3JkXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNzc1wiOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWUgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLFxuICAgICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvcihtYW5kYXRvcnksIGZhbHNlLCBtb2RlbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRmllbGRcIixcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRXJyb3JcIik7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3IgcGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3ItaGlkZGVuXCIpOyB9XG59IiwiZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlck1vZGVsIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250cm9sUGFzc3dvcmQgPSBudWxsO1xuICAgIH1cblxuICAgIHNldE5ld1Bhc3N3b3JkKG5ld1Bhc3N3b3JkKSB7XG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmQgPSBuZXdQYXNzd29yZDtcbiAgICB9XG5cbiAgICBnZXROZXdQYXNzd29yZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3UGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgc2V0Q29udHJvbFBhc3N3b3JkKGNvbnRyb2xQYXNzd29yZCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xQYXNzd29yZCA9IGNvbnRyb2xQYXNzd29yZDtcbiAgICB9XG5cbiAgICBnZXRDb250cm9sUGFzc3dvcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xQYXNzd29yZDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBBbmRWYWxpZGF0b3JTZXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIFByb3BlcnR5QWNjZXNzb3IsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5qc1wiO1xuaW1wb3J0IHsgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5qc1wiO1xuaW1wb3J0IHsgUGFzc3dvcmRNYXRjaGVyTW9kZWwgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJNb2RlbC5qc1wiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXQge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkTWF0Y2hlcklucHV0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXQuY3NzXCI7IH1cblxuXHRzdGF0aWMgZ2V0IEVWRU5UX1ZBTElEQVRFRF9FTlRFUkVEKCkgeyByZXR1cm4gXCJ2YWxpZGF0ZWRFbnRlcmVkXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRyb2xQbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSxcbiAgICAgICAgbW9kZWwgPSBudWxsLFxuICAgICAgICBwbGFjZWhvbGRlciA9IFBhc3N3b3JkTWF0Y2hlcklucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIFxuICAgICAgICBjb250cm9sUGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX0NPTlRST0xfUExBQ0VIT0xERVIsXG4gICAgICAgIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QW5kVmFsaWRhdG9yU2V0fSAqL1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCA9IG5ldyBQYXNzd29yZE1hdGNoZXJNb2RlbCgpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWV9ICovXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIFtcIm5ld1Bhc3N3b3JkXCIsIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwsIHBsYWNlaG9sZGVyLCBtYW5kYXRvcnldXG5cdFx0KTtcblxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbH0gKi9cblx0XHR0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCxcbiAgICAgICAgICAgIFtcImNvbnRyb2xQYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLCBcIm5ld1Bhc3N3b3JkXCIsIGNvbnRyb2xQbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxuXHRcdCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gYXdhaXQgdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQYXNzd29yZE1hdGNoZXJJbnB1dC5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTVBPTkVOVF9OQU1FKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIix0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIix0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5ldmVudHNcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9FTlRFUkVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMucGFzc3dvcmRWYWx1ZUVudGVyZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKENvbW1vbklucHV0LkVWRU5UX0tFWVVQUEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMucGFzc3dvcmRWYWx1ZUNoYW5nZWQpKTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5ldmVudHNcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9FTlRFUkVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMucGFzc3dvcmRDb250cm9sRW50ZXJlZCkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QW5kVmFsaWRhdG9yU2V0fSAqL1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5ldyBBbmRWYWxpZGF0b3JTZXQoKVxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnZhbGlkYXRvcilcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLnZhbGlkYXRvcilcbiAgICAgICAgICAgIC53aXRoVmFsaWRMaXN0ZW5lcihuZXcgTWV0aG9kKHRoaXMsIHRoaXMucGFzc3dvcmRNYXRjaGVyVmFsaWRPY2N1cmVkKSk7XG5cbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCgpIHtcbiAgICAgICAgUHJvcGVydHlBY2Nlc3Nvci5zZXRWYWx1ZSh0aGlzLm1vZGVsLCB0aGlzLm5hbWUsIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwuZ2V0TmV3UGFzc3dvcmQoKSlcbiAgICB9XG5cbiAgICBwYXNzd29yZFZhbHVlRW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXNzd29yZFZhbHVlQ2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jbGVhcigpO1xuICAgIH1cblxuICAgIHBhc3N3b3JkQ29udHJvbEVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihQYXNzd29yZE1hdGNoZXJJbnB1dC5FVkVOVF9WQUxJREFURURfRU5URVJFRCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5mb2N1cygpOyB9XG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuc2VsZWN0QWxsKCk7IH1cbiAgICBlbmFibGUoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5lbmFibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZW5hYmxlKCk7IH1cbiAgICBkaXNhYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZGlzYWJsZSgpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5kaXNhYmxlKCk7IH1cbiAgICBjbGVhcigpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNsZWFyKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNsZWFyKCk7IH1cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XG5pbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVGV4dElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiVGV4dElucHV0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlRleHRcIjsgfVxuXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdGV4dElucHV0Lmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90ZXh0SW5wdXQuY3NzXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoVGV4dElucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKGZhbHNlLCBtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInRleHRJbnB1dFwiLFxuICAgICAgICAgICAgXCJ0ZXh0RXJyb3JcIik7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwaG9uZS1pbnB1dC1lcnJvciBwaG9uZS1pbnB1dC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwaG9uZS1pbnB1dC1lcnJvciBwaG9uZS1pbnB1dC1lcnJvci1oaWRkZW5cIik7IH1cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5pbXBvcnQgeyBQaG9uZVZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGhvbmVJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFBob25lSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQaG9uZUlucHV0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlBob25lXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bob25lSW5wdXQuaHRtbFwiOyB9XG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bob25lSW5wdXQuY3NzXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGhvbmVJbnB1dC5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBQaG9uZVZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBob25lSW5wdXRcIixcbiAgICAgICAgICAgIFwicGhvbmVFcnJvclwiKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInBob25lLWlucHV0LWVycm9yIHBob25lLWlucHV0LWVycm9yLXZpc2libGVcIik7IH1cbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInBob25lLWlucHV0LWVycm9yIHBob25lLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufSJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJMb2dnZXIiLCJJbmplY3Rpb25Qb2ludCIsIkNvbXBvbmVudEZhY3RvcnkiLCJUaW1lUHJvbWlzZSIsIkNhbnZhc1N0eWxlcyIsIkxPRyIsIkV2ZW50TWFuYWdlciIsIk1ldGhvZCIsIkxpc3QiLCJDYW52YXNSb290IiwiTmF2aWdhdGlvbiIsIkhUTUwiLCJJbnB1dEVsZW1lbnREYXRhQmluZGluZyIsIk1hcCIsIkVtYWlsVmFsaWRhdG9yIiwiUmVxdWlyZWRWYWxpZGF0b3IiLCJQYXNzd29yZFZhbGlkYXRvciIsIkVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yIiwiQW5kVmFsaWRhdG9yU2V0IiwiUHJvcGVydHlBY2Nlc3NvciIsIlRleHRJbnB1dCIsIlBob25lVmFsaWRhdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUI7QUFDQSxJQUFJLFdBQVcsWUFBWSxHQUFHLEVBQUUsT0FBTyxjQUFjLENBQUMsRUFBRTtBQUN4RCxJQUFJLFdBQVcsVUFBVSxHQUFHLEVBQUUsT0FBTyxZQUFZLENBQUMsRUFBRTtBQUNwRCxJQUFJLFdBQVcsV0FBVyxHQUFHLEVBQUUsT0FBTyxhQUFhLENBQUMsRUFBRTtBQUN0RCxJQUFJLFdBQVcsVUFBVSxHQUFHLEVBQUUsT0FBTyxZQUFZLENBQUMsRUFBRTtBQUNwRDtBQUNBLElBQUksV0FBVyxh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
