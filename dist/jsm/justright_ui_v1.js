import { Component, ComponentFactory, CanvasStyles, EventManager, CanvasRoot, Navigation, HTML, InputElementDataBinding, EmailValidator, RequiredValidator, PhoneValidator, PasswordValidator, EqualsPropertyValidator, AndValidatorSet } from './justright_core_v1.js';
import { Logger, TimePromise, Method, List, PropertyAccessor } from './coreutil_v1.js';
import { InjectionPoint } from './mindi_v1.js';

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
        this.componentClass = Component;
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

const LOG = new Logger("BackShade");

class BackShade {

	static get COMPONENT_NAME() { return "BackShade"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/backShade.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/backShade.css"; }

    /**
     * 
     */
    constructor(backShadeListeners = new BackShadeListeners()){

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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
        const hidePromise = TimePromise.asPromise(milliSeconds,
            () => {
                this.component.get("backShade").setStyle("display", "none");
            }
        );
        const disableStylePromise = TimePromise.asPromise(milliSeconds + 1,
            () => {
                CanvasStyles.disableStyle(BackShade.COMPONENT_NAME, this.component.componentIndex);
            }
        );
        return Promise.all([hidePromise, disableStylePromise]);
    }

    show() {
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        CanvasStyles.enableStyle(BackShade.COMPONENT_NAME, this.component.componentIndex);
        this.component.get("backShade").setStyle("display", "block");
        return TimePromise.asPromise(100,
            () => { 
                this.component.get("backShade").setAttributeValue("class", "back-shade fade show");
            }
        );
    }
    
}

const LOG$1 = new Logger("Background");

class Background {

	static get COMPONENT_NAME() { return "Background"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/background.html"; }
	static get STYLES_URL() { return "/assets/justrightjs-ui/background.css"; }

    constructor(backgroundImagePath){
		/** @type {ComponentFactory} */
		this.componentFactory = InjectionPoint.instance(ComponentFactory);

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
		CanvasStyles.enableStyle(Background.COMPONENT_NAME);
	}

}

const LOG$2 = new Logger("BannerMessage");

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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
        this.component.get("bannerMessageCloseButton").listenTo("click", new Method(this,this.hide));
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
        await TimePromise.asPromise(500, () => { 
            this.component.get("bannerMessage").setStyle("display","none");
            CanvasStyles.disableStyle(BannerMessage.COMPONENT_NAME, this.component.componentIndex);
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
        CanvasStyles.enableStyle(BannerMessage.COMPONENT_NAME, this.component.componentIndex);
        this.component.get("bannerMessage").setStyle("display","block");
        await TimePromise.asPromise(100,() => { 
            this.applyClasses("banner-message show");
        });
        if(this.onShowListener) {
            this.onShowListener.call();
        }
    }

}

const LOG$3 = new Logger("Button");

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.label = label;

        /** @type {string} */
        this.buttonType = buttonType;

        /** @type {EventManager<Button>} */
        this.eventManager = new EventManager();
    }

    /** @type {EventManager<Button>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create("Button");
        CanvasStyles.enableStyle(Button.COMPONENT_NAME);
        this.component.get("button").setChild(this.label);
        this.component.get("button").setAttributeValue("class","button " + this.buttonType);
        this.component.get("button").listenTo("click", new Method(this, (event) => {
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

const LOG$4 = new Logger("DialogBox");

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

		/** @type {Component} */
        this.component = null;
        
        /** @type {BackShade} */
        this.backShade = InjectionPoint.instance(BackShade, [
            new BackShadeListeners()
                .withBackgroundClicked(new Method(this, this.hide))]);

        this.hidden = true;

        this.swallowFocusEscape = false;

        this.owningTrigger = null;

        /** @type {List<string>} */
        this.defaultOptions = new List(defaultOptions);

        /** @type {List<string>} */
        this.options = new List(defaultOptions);
    }
    
    postConfig() {
        this.component = this.componentFactory.create(DialogBox.COMPONENT_NAME);
        this.component.set("backShadeContainer", this.backShade.component);
        this.component.get("closeButton").listenTo("click", new Method(this, this.close));
        CanvasRoot.listenToFocusEscape(new Method(this, this.close), this.component.get("dialogBoxOverlay"));
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
            Navigation.instance().back();
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
        const hidePromise = TimePromise.asPromise(200, () => { 
            this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-none");
            }
        );
        const disableStylePromise = TimePromise.asPromise(201, () => {
                this.getDialogBox().remove();
                CanvasStyles.disableStyle(DialogBox.COMPONENT_NAME, this.component.componentIndex);
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
            this.options = new List(temporaryOptions);
        }
        CanvasRoot.swallowFocusEscape(500);
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        CanvasStyles.enableStyle(DialogBox.COMPONENT_NAME, this.component.componentIndex);
        this.backShade.show();
        this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-block");
        return TimePromise.asPromise(100,  () => {
                this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-block dialogbox-overlay-show");
            }
        );
    }

    getDialogBoxOverlay() { return this.component.get("dialogBoxOverlay"); }

    getDialogBox() { return this.component.get("dialogBox"); }
}

const LOG$5 = new Logger("DropDownPanel");

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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
        CanvasStyles.enableStyle(DropDownPanel.COMPONENT_NAME);
        this.component.get("button").setChild(HTML.i("", this.iconClass));
        this.component.get("button").setAttributeValue("class", DropDownPanel.BUTTON + this.type);
        this.component.get("content").setAttributeValue("class", DropDownPanel.CONTENT + DropDownPanel.CONTENT_HIDDEN + this.orientation);
        this.component.get("button").listenTo("click", new Method(this, this.clicked));
        CanvasRoot.listenToFocusEscape(new Method(this, this.hide), this.component.get("dropDownPanelRoot"));
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

const LOG$6 = new Logger("CommonInput");

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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

        this.eventManager = new EventManager();
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentName);

        CanvasStyles.enableStyle(this.componentName, this.component.componentIndex);

        this.component.get(this.inputElementId).setAttributeValue("name", this.name);
        this.component.get(this.inputElementId).setAttributeValue("placeholder", this.placeholder);

        if(this.validator) {
            this.validator.withValidListener(new Method(this,this.hideValidationError));
        }

        if(this.model) {
            InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
        }

        this.component.get(this.inputElementId)
            .listenTo("keyup", new Method(this, this.keyupped))
            .listenTo("change", new Method(this, this.changed))
            .listenTo("blur", new Method(this, this.blurred))
            .listenTo("click", new Method(this, this.clicked))
            .listenTo("keyup", new Method(this, (event) => {
                if (event.isKeyCode(13)) {
                    this.entered(event);
                }
            }));

        this.component.get(this.errorElementId)
            .listenTo("click", new Method(this, this.errorClicked));
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


    showValidationError() { this.component.get(this.errorElementId).setStyle("display", "block"); }
    hideValidationError() { this.component.get(this.errorElementId).setStyle("display", "none"); }
    focus() { this.component.get(this.inputElementId).focus(); }
    selectAll() { this.component.get(this.inputElementId).selectAll(); }
    enable() { this.component.get(this.inputElementId).enable(); }
    disable() { this.component.get(this.inputElementId).disable(); }
    clear() { this.component.get(this.inputElementId).value = ""; this.tainted = false; this.hideValidationError(); }

}

const LOG$7 = new Logger("Panel");

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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
        CanvasStyles.enableStyle(Panel.COMPONENT_NAME);
    }

}

const LOG$8 = new Logger("CheckBox");

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

    }

    postConfig() {
        this.component = this.componentFactory.create(CheckBox.COMPONENT_NAME);
        CanvasStyles.enableStyle(CheckBox.COMPONENT_NAME);
        this.component.get("checkBox").setAttributeValue("name",this.name);

        if(this.model) {
            InputElementDataBinding.link(this.model).to(this.component.get("checkBox"));
        }
    }

}

const LOG$9 = new Logger("EmailInput");

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
            new EmailValidator(mandatory, !mandatory),
            placeholder,
            "emailInput",
            "emailError");
    }

}

const LOG$a = new Logger("PasswordInput");

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
            new RequiredValidator(!mandatory),
            placeholder,
            "passwordInput",
            "passwordError");
    }
}

const LOG$b = new Logger("PhoneInput");

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
            new PhoneValidator(mandatory, !mandatory),
            placeholder,
            "phoneInput",
            "phoneError");
    }
}

const LOG$c = new Logger("PasswordMatcherInputValue");

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
            new PasswordValidator(mandatory),
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError");
    }
}

const LOG$d = new Logger("PasswordMatcherInputControl");

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
            new EqualsPropertyValidator(mandatory, false, model, modelComparedPropertyName),
            placeholder,
            "passwordMatcherInputControlField",
            "passwordMatcherInputControlError");
    }
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

const LOG$e = new Logger("PasswordMatcherInput");

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {AndValidatorSet} */
        this.validator = null;

        this.passwordMatcherModel = new PasswordMatcherModel();

        this.name = name;
        this.model = model;

        /** @type {PasswordMatcherInputValue} */
		this.passwordMatcherInputValue = InjectionPoint.instance(PasswordMatcherInputValue,
            ["newPassword", this.passwordMatcherModel, placeholder, mandatory]
		);

        /** @type {PasswordMatcherInputControl} */
		this.passwordMatcherInputControl = InjectionPoint.instance(PasswordMatcherInputControl,
            ["controlPassword", this.passwordMatcherModel, "newPassword", controlPlaceholder, mandatory]
		);

        /** @type {EventManager} */
        this.eventManager = new EventManager();
    }

    async postConfig() {
        this.component = await this.componentFactory.create(PasswordMatcherInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        this.component.setChild("passwordMatcherInputValue",this.passwordMatcherInputValue.component);
        this.component.setChild("passwordMatcherInputControl",this.passwordMatcherInputControl.component);

        this.passwordMatcherInputValue.events
            .listenTo(CommonInput.EVENT_ENTERED, new Method(this, this.passwordValueEntered))
            .listenTo(CommonInput.EVENT_KEYUPPED, new Method(this, this.passwordValueChanged));

        this.passwordMatcherInputControl.events
            .listenTo(CommonInput.EVENT_ENTERED, new Method(this, this.passwordControlEntered));

        /** @type {AndValidatorSet} */
        this.validator = new AndValidatorSet()
            .withValidator(this.passwordMatcherInputValue.validator)
            .withValidator(this.passwordMatcherInputControl.validator)
            .withValidListener(new Method(this, this.passwordMatcherValidOccured));

    }

    get events() { return this.eventManager; }

    passwordMatcherValidOccured() {
        PropertyAccessor.setValue(this.model, this.name, this.passwordMatcherModel.getNewPassword());
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

const LOG$f = new Logger("TextInput");

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
            new RequiredValidator(false, mandatory),
            placeholder,
            "textInput",
            "textError");
    }

}

export { BackShade, BackShadeListeners, Background, BannerMessage, Button, CheckBox, CommonInput, CustomAppearance, Dependencies, DialogBox, DropDownPanel, EmailInput, Panel, PasswordInput, PasswordMatcherInput, PasswordMatcherInputControl, PasswordMatcherInputValue, PasswordMatcherModel, PhoneInput, TextInput$1 as TextInput };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGVwZW5kZW5jaWVzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYW5uZXJNZXNzYWdlL2Jhbm5lck1lc3NhZ2UuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9idXR0b24vYnV0dG9uLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGlhbG9nQm94L2RpYWxvZ0JveC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2Ryb3BEb3duUGFuZWwvZHJvcERvd25QYW5lbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2NvbW1vbklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvcGFuZWwvcGFuZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9jaGVja0JveC9jaGVja0JveC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2VtYWlsSW5wdXQvZW1haWxJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkSW5wdXQvcGFzc3dvcmRJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bob25lSW5wdXQvcGhvbmVJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJNb2RlbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvdGV4dElucHV0L3RleHRJbnB1dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ3VzdG9tQXBwZWFyYW5jZSB7XG5cbiAgICBzdGF0aWMgZ2V0IFNJWkVfREVGQVVMVCgpIHsgcmV0dXJuIFwic2l6ZS1kZWZhdWx0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNJWkVfU01BTEwoKSB7IHJldHVybiBcInNpemUtc21hbGxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU0laRV9NRURJVU0oKSB7IHJldHVybiBcInNpemUtbWVkaXVtXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNJWkVfTEFSR0UoKSB7IHJldHVybiBcInNpemUtbGFyZ2VcIjsgfVxuXG4gICAgc3RhdGljIGdldCBTSEFQRV9ERUFGVUxUKCkgeyByZXR1cm4gXCJzaGFwZS1kZWZhdWx0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNIQVBFX1JPVU5EKCkgeyByZXR1cm4gXCJzaGFwZS1yb3VuZFwiOyB9XG4gICAgc3RhdGljIGdldCBTSEFQRV9TUVVBUkUoKSB7IHJldHVybiBcInNoYXBlLXNxdWFyZVwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFZJU0lCSUxJVFlfREVBRlVMVCgpIHsgcmV0dXJuIFwidmlzaWJpbGl0eS1kZWZhdWx0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFZJU0lCSUxJVFlfVklTSUJMRSgpIHsgcmV0dXJuIFwidmlzaWJpbGl0eS12aXNpYmxlXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFZJU0lCSUxJVFlfSElEREVOKCkgeyByZXR1cm4gXCJ2aXNpYmlsaXR5LWhpZGRlblwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFNQQUNJTkdfREVGQVVMVCgpIHsgcmV0dXJuIFwic3BhY2luZy1kZWZhdWx0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNQQUNJTkdfTk9ORSgpIHsgcmV0dXJuIFwic3BhY2luZy1ub25lXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNQQUNJTkdfQUJPVkUoKSB7IHJldHVybiBcInNwYWNpbmctYWJvdmVcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1BBQ0lOR19CRUxPVygpIHsgcmV0dXJuIFwic3BhY2luZy1iZWxvd1wiOyB9XG4gICAgc3RhdGljIGdldCBTUEFDSU5HX0FCT1ZFX0JFTE9XKCkgeyByZXR1cm4gXCJzcGFjaW5nLWFib3ZlLWJlbG93XCI7IH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNpemUgPSBDdXN0b21BcHBlYXJhbmNlLlNJWkVfREVGQVVMVDtcbiAgICAgICAgdGhpcy5zaGFwZSA9IEN1c3RvbUFwcGVhcmFuY2UuU0hBUEVfREVBRlVMVDtcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gQ3VzdG9tQXBwZWFyYW5jZS5TUEFDSU5HX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IEN1c3RvbUFwcGVhcmFuY2UuVklTSUJJTElUWV9ERUFGVUxUO1xuICAgICAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHdpdGhTaXplKHNpemUpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFNoYXBlKHNoYXBlKSB7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFNwYWNpbmcoc3BhY2luZykge1xuICAgICAgICB0aGlzLnNwYWNpbmcgPSBzcGFjaW5nO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB3aXRoVmlzaWJpbGl0eSh2aXNpYmlsaXR5KSB7XG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IHZpc2liaWxpdHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuXG5leHBvcnQgY2xhc3MgRGVwZW5kZW5jaWVzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudENsYXNzID0gQ29tcG9uZW50O1xuICAgIH1cblxufSIsImltcG9ydCB7IE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlTGlzdGVuZXJzIHtcblxuICAgIGNvbnN0cnVjdG9yKGV4aXN0aW5nTGlzdGVuZXJzID0gbnVsbCkge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgPSAoZXhpc3RpbmdMaXN0ZW5lcnMgJiYgZXhpc3RpbmdMaXN0ZW5lcnMuZ2V0QmFja2dyb3VuZENsaWNrZWQpID8gZXhpc3RpbmdMaXN0ZW5lcnMuZ2V0QmFja2dyb3VuZENsaWNrZWQoKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgXG4gICAgICovXG4gICAgd2l0aEJhY2tncm91bmRDbGlja2VkKGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyID0gYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBnZXRCYWNrZ3JvdW5kQ2xpY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBjYWxsQmFja2dyb3VuZENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyLCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGxpc3RlbmVyIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNhbGxMaXN0ZW5lcihsaXN0ZW5lciwgZXZlbnQpIHtcbiAgICAgICAgaWYgKG51bGwgIT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQmFzZUVsZW1lbnRcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCwgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi9iYWNrU2hhZGVMaXN0ZW5lcnMuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhY2tTaGFkZVwiKTtcblxuZXhwb3J0IGNsYXNzIEJhY2tTaGFkZSB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFja1NoYWRlXCI7IH1cblx0c3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYWNrU2hhZGUuY3NzXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGJhY2tTaGFkZUxpc3RlbmVycyA9IG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QmFzZUVsZW1lbnR9ICovXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge0JhY2tTaGFkZUxpc3RlbmVyc31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYmFja1NoYWRlTGlzdGVuZXJzID0gYmFja1NoYWRlTGlzdGVuZXJzO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblx0fVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSk7XG4gICAgfVxuXG4gICAgaGlkZUFmdGVyKG1pbGxpU2Vjb25kcykge1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7cmVzb2x2ZSgpO30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGVcIik7XG4gICAgICAgIGNvbnN0IGhpZGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKG1pbGxpU2Vjb25kcyxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGlzYWJsZVN0eWxlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZShtaWxsaVNlY29uZHMgKyAxLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2VdKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsXG4gICAgICAgICAgICAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlIHNob3dcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5LCBDYW52YXNTdHlsZXMgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhY2tncm91bmRcIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kIHtcblxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJCYWNrZ3JvdW5kXCI7IH1cblx0c3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja2dyb3VuZC5odG1sXCI7IH1cblx0c3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tncm91bmQuY3NzXCI7IH1cblxuICAgIGNvbnN0cnVjdG9yKGJhY2tncm91bmRJbWFnZVBhdGgpe1xuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuXHRcdHRoaXMuYmFja2dyb3VuZEltYWdlUGF0aCA9IGJhY2tncm91bmRJbWFnZVBhdGg7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmQuQ09NUE9ORU5UX05BTUUpO1xuXHRcdGlmICh0aGlzLmJhY2tncm91bmRJbWFnZVBhdGgpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50LmdldChcImJhY2tncm91bmRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJzdHlsZVwiLCBcImJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiXCIgKyB0aGlzLmJhY2tncm91bmRJbWFnZVBhdGggKyBcIlxcXCIpXCIpO1xuXHRcdH1cblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja2dyb3VuZC5DT01QT05FTlRfTkFNRSk7XG5cdH1cblxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50XG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kLCBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYW5uZXJNZXNzYWdlXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFubmVyTWVzc2FnZSB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFubmVyTWVzc2FnZVwiOyB9XG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFubmVyTWVzc2FnZS5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFubmVyTWVzc2FnZS5jc3NcIjsgfVxuXG4gICAgc3RhdGljIGdldCBUWVBFX0FMRVJUKCkgeyByZXR1cm4gXCJ0eXBlLWFsZXJ0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpIHsgcmV0dXJuIFwidHlwZS1pbmZvXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfU1VDQ0VTUygpIHsgcmV0dXJuIFwidHlwZS1zdWNjZXNzXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwidHlwZS13YXJuaW5nXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYW5uZXJUeXBlIFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xvc2VhYmxlIFxuICAgICAqIEBwYXJhbSB7Q3VzdG9tQXBwZWFyYW5jZX0gY3VzdG9tQXBwZWFyYW5jZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGJhbm5lclR5cGUgPSBCYW5uZXJNZXNzYWdlLlRZUEVfSU5GTywgY2xvc2VhYmxlID0gZmFsc2UsIGN1c3RvbUFwcGVhcmFuY2UgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5jbG9zZWFibGUgPSBjbG9zZWFibGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYmFubmVyVHlwZSA9IGJhbm5lclR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWV0aG9kfSAqL1xuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0N1c3RvbUFwcGVhcmFuY2V9ICovXG4gICAgICAgIHRoaXMuY3VzdG9tQXBwZWFyYW5jZSA9IGN1c3RvbUFwcGVhcmFuY2U7XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCYW5uZXJNZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlSGVhZGVyXCIpLnNldENoaWxkKFwiQWxlcnRcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgICAgIHRoaXMuYXBwbHlDbGFzc2VzKFwiYmFubmVyLW1lc3NhZ2UgZmFkZVwiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbmV3IE1ldGhvZCh0aGlzLHRoaXMuaGlkZSkpO1xuICAgIH1cblxuICAgIGFwcGx5Q2xhc3NlcyhiYXNlQ2xhc3Nlcykge1xuICAgICAgICBsZXQgY2xhc3NlcyA9IGJhc2VDbGFzc2VzO1xuICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5iYW5uZXJUeXBlO1xuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZykge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixjbGFzc2VzKTtcbiAgICB9XG4gICAgXG4gICAgYXBwbHlIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlSGVhZGVyXCIpLnNldENoaWxkKHRoaXMuaGVhZGVyKTtcbiAgICB9XG5cbiAgICBhcHBseU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBjbGlja2VkTGlzdGVuZXIgXG4gICAgICovXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG9uSGlkZUxpc3RlbmVyIFxuICAgICAqL1xuICAgIG9uSGlkZShvbkhpZGVMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyID0gb25IaWRlTGlzdGVuZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG9uU2hvd0xpc3RlbmVyIFxuICAgICAqL1xuICAgIG9uU2hvdyhvblNob3dMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gb25TaG93TGlzdGVuZXI7XG4gICAgfVxuXG4gICAgYXN5bmMgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBoaWRlXCIpO1xuICAgICAgICBhd2FpdCBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAwLCAoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UuQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHRoaXMub25IaWRlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIuY2FsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc2hvdyhuZXdIZWFkZXIgPSBudWxsLCBuZXdNZXNzYWdlID0gbnVsbCkge1xuICAgICAgICBpZiAobmV3SGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SGVhZGVyKG5ld0hlYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld01lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNZXNzYWdlKG5ld01lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYW5uZXJNZXNzYWdlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgYXdhaXQgVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBzaG93XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vblNob3dMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJ1dHRvblwiKTtcblxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQnV0dG9uXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpICAgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2J1dHRvbi5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSAgICAgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2J1dHRvbi5jc3NcIjsgfVxuXG4gICAgc3RhdGljIGdldCBUWVBFX1BSSU1BUlkoKSAgIHsgcmV0dXJuIFwiYnV0dG9uLXByaW1hcnlcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9TRUNPTkRBUlkoKSB7IHJldHVybiBcImJ1dHRvbi1zZWNvbmRhcnlcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgICB7IHJldHVybiBcImJ1dHRvbi1zdWNjZXNzXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpICAgICAgeyByZXR1cm4gXCJidXR0b24taW5mb1wiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1dBUk5JTkcoKSAgIHsgcmV0dXJuIFwiYnV0dG9uLXdhcm5pbmdcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9EQU5HRVIoKSAgICB7IHJldHVybiBcImJ1dHRvbi1kYW5nZXJcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9MSUdIVCgpICAgICB7IHJldHVybiBcImJ1dHRvbi1saWdodFwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX0RBUksoKSAgICAgIHsgcmV0dXJuIFwiYnV0dG9uLWRhcmtcIjsgfVxuXG4gICAgc3RhdGljIGdldCBFVkVOVF9DTElDS0VEKCkgICAgICB7IHJldHVybiBcImNsaWNrXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25UeXBlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGJ1dHRvblR5cGUgPSBCdXR0b24uVFlQRV9QUklNQVJZKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYnV0dG9uVHlwZSA9IGJ1dHRvblR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8QnV0dG9uPn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8QnV0dG9uPn0gKi9cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkJ1dHRvblwiKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJ1dHRvbi5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImJ1dHRvbiBcIiArIHRoaXMuYnV0dG9uVHlwZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKEJ1dHRvbi5FVkVOVF9DTElDS0VELCBldmVudCk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFxuICAgICAqL1xuICAgIHdpdGhDbGlja0xpc3RlbmVyKG1ldGhvZCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBtZXRob2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBlbmFibGVMb2FkaW5nKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyQ29udGFpbmVyXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCIpO1xuICAgIH1cblxuICAgIGRpc2FibGVMb2FkaW5nKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyQ29udGFpbmVyXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIixcInRydWVcIik7XG4gICAgfVxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgfVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENhbnZhc1Jvb3QsXG4gICAgRXZlbnQsXG4gICAgTmF2aWdhdGlvblxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IFRpbWVQcm9taXNlLCBMb2dnZXIsIE1ldGhvZCwgTGlzdCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEJhY2tTaGFkZSB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlLmpzXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qc1wiO1xuXG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJEaWFsb2dCb3hcIik7XG5cbmV4cG9ydCBjbGFzcyBEaWFsb2dCb3gge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkRpYWxvZ0JveFwiOyB9XG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZGlhbG9nQm94Lmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9kaWFsb2dCb3guY3NzXCI7IH1cbiAgICBcbiAgICBzdGF0aWMgZ2V0IE9QVElPTl9CQUNLX09OX0NMT1NFKCkgeyByZXR1cm4gMTsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdE9wdGlvbnMgPSBbXSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZX0gKi9cbiAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYWNrU2hhZGUsIFtcbiAgICAgICAgICAgIG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgICAgIC53aXRoQmFja2dyb3VuZENsaWNrZWQobmV3IE1ldGhvZCh0aGlzLCB0aGlzLmhpZGUpKV0pO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN3YWxsb3dGb2N1c0VzY2FwZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub3duaW5nVHJpZ2dlciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBuZXcgTGlzdChkZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBMaXN0KGRlZmF1bHRPcHRpb25zKTtcbiAgICB9XG4gICAgXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKERpYWxvZ0JveC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldChcImJhY2tTaGFkZUNvbnRhaW5lclwiLCB0aGlzLmJhY2tTaGFkZS5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbG9zZSkpO1xuICAgICAgICBDYW52YXNSb290Lmxpc3RlblRvRm9jdXNFc2NhcGUobmV3IE1ldGhvZCh0aGlzLCB0aGlzLmNsb3NlKSwgdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94T3ZlcmxheVwiKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXG4gICAgICovXG4gICAgc2V0VGl0bGUodGV4dCl7IHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwidGl0bGVcIiwgdGV4dCk7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXG4gICAgICovXG4gICAgc2V0Rm9vdGVyKGNvbXBvbmVudCl7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveEZvb3RlclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJkaWFsb2dCb3hGb290ZXJcIiwgY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxuICAgICAqL1xuICAgIHNldENvbnRlbnQoY29tcG9uZW50KXsgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJkaWFsb2dCb3hDb250ZW50XCIsY29tcG9uZW50KTsgfVxuXG5cdHNldChrZXksdmFsKSB7IHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTsgfVxuICAgIFxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBhd2FpdCB0aGlzLmhpZGUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29udGFpbnMoRGlhbG9nQm94Lk9QVElPTl9CQUNLX09OX0NMT1NFKSkge1xuICAgICAgICAgICAgTmF2aWdhdGlvbi5pbnN0YW5jZSgpLmJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGhpZGUoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZVwiKTtcbiAgICAgICAgY29uc3QgaGlkZUJhY2tTaGFkZVByb21pc2UgPSB0aGlzLmJhY2tTaGFkZS5oaWRlQWZ0ZXIoMzAwKTtcbiAgICAgICAgY29uc3QgaGlkZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMjAwLCAoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKDIwMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtoaWRlUHJvbWlzZSwgZGlzYWJsZVN0eWxlUHJvbWlzZSwgaGlkZUJhY2tTaGFkZVByb21pc2VdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHRlbXBvcmFyeU9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzaG93KGV2ZW50LCB0ZW1wb3JhcnlPcHRpb25zKSB7XG4gICAgICAgIGlmICh0ZW1wb3JhcnlPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgTGlzdCh0ZW1wb3JhcnlPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBDYW52YXNSb290LnN3YWxsb3dGb2N1c0VzY2FwZSg1MDApO1xuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuYmFja1NoYWRlLnNob3coKTtcbiAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9ja1wiKTtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9jayBkaWFsb2dib3gtb3ZlcmxheS1zaG93XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldERpYWxvZ0JveE92ZXJsYXkoKSB7IHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hPdmVybGF5XCIpOyB9XG5cbiAgICBnZXREaWFsb2dCb3goKSB7IHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hcIik7IH1cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudCxcbiAgICBDYW52YXNSb290LFxuICAgIEhUTUxcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRyb3BEb3duUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBEcm9wRG93blBhbmVsIHtcblxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgICAgeyByZXR1cm4gXCJEcm9wRG93blBhbmVsXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpICAgICAgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Ryb3BEb3duUGFuZWwuaHRtbFwiOyB9XG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgICAgICAgIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9kcm9wRG93blBhbmVsLmNzc1wiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFRZUEVfUFJJTUFSWSgpICAgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1wcmltYXJ5IFwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1NFQ09OREFSWSgpICAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1idXR0b24tc2Vjb25kYXJ5IFwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSAgICAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1idXR0b24tc3VjY2VzcyBcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgICAgICAgICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWluZm8gXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpICAgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi13YXJuaW5nIFwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX0RBTkdFUigpICAgICAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1idXR0b24tZGFuZ2VyIFwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX0xJR0hUKCkgICAgICAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1idXR0b24tbGlnaHQgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFSSygpICAgICAgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1kYXJrIFwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IE9SSUVOVEFUSU9OX0xFRlQoKSAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtbGVmdCBcIjsgfVxuICAgIHN0YXRpYyBnZXQgT1JJRU5UQVRJT05fUklHSFQoKSB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtY29udGVudC1yaWdodCBcIjsgfVxuXG4gICAgc3RhdGljIGdldCBDT05URU5UX1ZJU0lCTEUoKSAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1jb250ZW50LXZpc2libGUgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IENPTlRFTlRfSElEREVOKCkgICAgeyByZXR1cm4gXCIgZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtaGlkZGVuIFwiOyB9XG4gICAgc3RhdGljIGdldCBDT05URU5UX0VYUEFORCgpICAgIHsgcmV0dXJuIFwiIGRyb3AtZG93bi1wYW5lbC1jb250ZW50LWV4cGFuZCBcIjsgfVxuICAgIHN0YXRpYyBnZXQgQ09OVEVOVF9DT0xMQVBTRSgpICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtY29udGVudC1jb2xsYXBzZSBcIjsgfVxuICAgIHN0YXRpYyBnZXQgQ09OVEVOVCgpICAgICAgICAgICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtY29udGVudCBcIjsgfVxuICAgIHN0YXRpYyBnZXQgQlVUVE9OKCkgICAgICAgICAgICB7IHJldHVybiBcIiBkcm9wLWRvd24tcGFuZWwtYnV0dG9uIFwiOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbkNsYXNzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZW50YXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpY29uQ2xhc3MsIHR5cGUgPSBEcm9wRG93blBhbmVsLlRZUEVfREFSSywgb3JpZW50YXRpb24gPSBEcm9wRG93blBhbmVsLk9SSUVOVEFUSU9OX0xFRlQpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbkNsYXNzID0gaWNvbkNsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRHJvcERvd25QYW5lbC5DT01QT05FTlRfTkFNRSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEcm9wRG93blBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBEcm9wRG93blBhbmVsLkJVVFRPTiArIHRoaXMudHlwZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBEcm9wRG93blBhbmVsLkNPTlRFTlQgKyBEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOICsgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbGlja2VkKSk7XG4gICAgICAgIENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZShuZXcgTWV0aG9kKHRoaXMsIHRoaXMuaGlkZSksIHRoaXMuY29tcG9uZW50LmdldChcImRyb3BEb3duUGFuZWxSb290XCIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gZHJvcERvd25QYW5lbENvbnRlbnQgXG4gICAgICovXG4gICAgc2V0UGFuZWxDb250ZW50KGRyb3BEb3duUGFuZWxDb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0Q2hpbGQoZHJvcERvd25QYW5lbENvbnRlbnQuY29tcG9uZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRlbnQoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikuZ2V0U3R5bGUoXCJkaXNwbGF5XCIpICE9PSBcImJsb2NrXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250ZW50XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgRHJvcERvd25QYW5lbC5DT05URU5UICsgRHJvcERvd25QYW5lbC5DT05URU5UX1ZJU0lCTEUgKyB0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuZWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBEcm9wRG93blBhbmVsLkNPTlRFTlQgKyBEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOICsgdGhpcy5vcmllbnRhdGlvbik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNZXRob2QsIExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsIEFic3RyYWN0VmFsaWRhdG9yLCBDb21wb25lbnRGYWN0b3J5LCBDYW52YXNTdHlsZXMsIEV2ZW50LCBDb21wb25lbnQsIEV2ZW50TWFuYWdlciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNvbW1vbklucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIGdldCBFVkVOVF9DTElDS0VEKCkgeyByZXR1cm4gXCJjbGlja2VkXCI7IH1cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0VOVEVSRUQoKSB7IHJldHVybiBcImVudGVyZWRcIjsgfVxuICAgIHN0YXRpYyBnZXQgRVZFTlRfS0VZVVBQRUQoKSB7IHJldHVybiBcImtleVVwcGVkXCI7IH1cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0NIQU5HRUQoKSB7IHJldHVybiBcImNoYW5nZFwiOyB9XG4gICAgc3RhdGljIGdldCBFVkVOVF9CTFVSUkVEKCkgeyByZXR1cm4gXCJibHVycmVkXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0VmFsaWRhdG9yfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRFbGVtZW50SWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JFbGVtZW50SWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnROYW1lLFxuICAgICAgICBuYW1lLFxuICAgICAgICBtb2RlbCA9IG51bGwsXG4gICAgICAgIHZhbGlkYXRvciA9IG51bGwsIFxuICAgICAgICBwbGFjZWhvbGRlciA9IG51bGwsXG4gICAgICAgIGlucHV0RWxlbWVudElkID0gXCJpbnB1dFwiLFxuICAgICAgICBlcnJvckVsZW1lbnRJZCA9IFwiZXJyb3JcIikge1xuXG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QWJzdHJhY3RWYWxpZGF0b3J9ICovXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50SWQgPSBpbnB1dEVsZW1lbnRJZDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5lcnJvckVsZW1lbnRJZCA9IGVycm9yRWxlbWVudElkO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUodGhpcy5jb21wb25lbnROYW1lKTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUodGhpcy5jb21wb25lbnROYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLCB0aGlzLm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLCB0aGlzLnBsYWNlaG9sZGVyKTtcblxuICAgICAgICBpZih0aGlzLnZhbGlkYXRvcikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3Iud2l0aFZhbGlkTGlzdGVuZXIobmV3IE1ldGhvZCh0aGlzLHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsLCB0aGlzLnZhbGlkYXRvcikudG8odGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwia2V5dXBcIiwgbmV3IE1ldGhvZCh0aGlzLCB0aGlzLmtleXVwcGVkKSlcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImNoYW5nZVwiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuY2hhbmdlZCkpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJibHVyXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5ibHVycmVkKSlcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImNsaWNrXCIsIG5ldyBNZXRob2QodGhpcywgdGhpcy5jbGlja2VkKSlcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImtleXVwXCIsIG5ldyBNZXRob2QodGhpcywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmlzS2V5Q29kZSgxMykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlcmVkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjbGlja1wiLCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMuZXJyb3JDbGlja2VkKSk7XG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBrZXl1cHBlZChldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LmlzS2V5Q29kZSgxMykgJiYgIWV2ZW50LmlzS2V5Q29kZSgxNikgJiYgIWV2ZW50LmlzS2V5Q29kZSg5KSkge1xuICAgICAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJcIiA9PT0gZXZlbnQuZ2V0VGFyZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwiXCIgPT09IGV2ZW50LmdldFRhcmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQ0hBTkdFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9DTElDS0VELCBldmVudCk7XG4gICAgfVxuXG4gICAgZW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGJsdXJyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhaW50ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQkxVUlJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGVycm9yQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICB9XG5cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpOyB9XG4gICAgZm9jdXMoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5mb2N1cygpOyB9XG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2VsZWN0QWxsKCk7IH1cbiAgICBlbmFibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5lbmFibGUoKTsgfVxuICAgIGRpc2FibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5kaXNhYmxlKCk7IH1cbiAgICBjbGVhcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnZhbHVlID0gXCJcIjsgdGhpcy50YWludGVkID0gZmFsc2U7IHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpOyB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnQsIENhbnZhc1N0eWxlcyB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBQYW5lbCB7XG5cblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFuZWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3BhbmVsLmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYW5lbC5jc3NcIjsgfVxuXG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU5fUk9PVCgpIHsgcmV0dXJuIFwiIHBhbmVsLXR5cGUtY29sdW1uLXJvb3QgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTigpIHsgcmV0dXJuIFwiIHBhbmVsLXR5cGUtY29sdW1uIFwiOyB9XG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfVFlQRV9ST1coKSB7IHJldHVybiBcIiBwYW5lbC10eXBlLXJvdyBcIjsgfVxuXG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9MRUZUKCkgeyByZXR1cm4gXCIgcGFuZWwtY29udGVudC1hbGlnbi1sZWZ0IFwiOyB9XG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9SSUdIVCgpIHsgcmV0dXJuIFwiIHBhbmVsLWNvbnRlbnQtYWxpZ24tcmlnaHQgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0NFTlRFUigpIHsgcmV0dXJuIFwiIHBhbmVsLWNvbnRlbnQtYWxpZ24tY2VudGVyIFwiOyB9XG4gICAgc3RhdGljIGdldCBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9KVVNUSUZZKCkgeyByZXR1cm4gXCIgcGFuZWwtY29udGVudC1hbGlnbi1qdXN0aWZ5IFwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFBBUkFNRVRFUl9TVFlMRV9TSVpFX0FVVE8oKSB7IHJldHVybiBcIiBwYW5lbC1zaXplLWF1dG8gXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFBBUkFNRVRFUl9TVFlMRV9TSVpFX01JTklNQUwoKSB7IHJldHVybiBcIiBwYW5lbC1zaXplLW1pbmltYWwgXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFBBUkFNRVRFUl9TVFlMRV9TSVpFX1JFU1BPTlNJVkUoKSB7IHJldHVybiBcIiBwYW5lbC1zaXplLXJlc3BvbnNpdmUgXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgT1BUSU9OX1NUWUxFX0NPTlRFTlRfUEFERElOR19TTUFMTCgpIHsgcmV0dXJuIFwiIHBhbmVsLWNvbnRlbnQtcGFkZGluZy1zbWFsbCBcIjsgfVxuICAgIHN0YXRpYyBnZXQgT1BUSU9OX1NUWUxFX0NPTlRFTlRfUEFERElOR19MQVJHRSgpIHsgcmV0dXJuIFwiIHBhbmVsLWNvbnRlbnQtcGFkZGluZy1sYXJnZSBcIjsgfVxuXG4gICAgc3RhdGljIGdldCBPUFRJT05fU1RZTEVfQk9SREVSX1NIQURPVygpIHsgcmV0dXJuIFwiIHBhbmVsLWJvcmRlci1zaGFkb3cgXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50QWxpZ24gXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpemUgXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBvcHRpb25zIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHR5cGUgPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU5fUk9PVCxcbiAgICAgICAgY29udGVudEFsaWduID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fQ0VOVEVSLFxuICAgICAgICBzaXplID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX1NJWkVfQVVUTyxcbiAgICAgICAgb3B0aW9ucyA9IFtdKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbnRlbnRBbGlnbiA9IGNvbnRlbnRBbGlnbjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge0FycmF5PFN0cmluZz59ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJQYW5lbFwiKTtcbiAgICAgICAgbGV0IGNsYXNzU3RyaW5nID0gXCJcIjtcbiAgICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHRoaXMudHlwZTtcbiAgICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHRoaXMuY29udGVudEFsaWduO1xuICAgICAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgdGhpcy5zaXplO1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYW5lbFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIGNsYXNzU3RyaW5nKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhbmVsLkNPTVBPTkVOVF9OQU1FKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNoZWNrQm94XCIpO1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tCb3gge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkNoZWNrQm94XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9jaGVja0JveC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guY3NzXCI7IH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKENoZWNrQm94LkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKENoZWNrQm94LkNPTVBPTkVOVF9OQU1FKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcblxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IEVtYWlsVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFbWFpbElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgRW1haWxJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkVtYWlsSW5wdXRcIjsgfVxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiRW1haWxcIjsgfVxuXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZW1haWxJbnB1dC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZW1haWxJbnB1dC5jc3NcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihFbWFpbElucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IEVtYWlsVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwiZW1haWxJbnB1dFwiLFxuICAgICAgICAgICAgXCJlbWFpbEVycm9yXCIpO1xuICAgIH1cblxufSIsImltcG9ydCB7IFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcbiAgICBcbiAgICBzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQYXNzd29yZElucHV0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlBhc3N3b3JkXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkSW5wdXQuaHRtbFwiOyB9XG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkSW5wdXQuY3NzXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRJbnB1dC5DT01QT05FTlRfTkFNRSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBSZXF1aXJlZFZhbGlkYXRvcighbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJwYXNzd29yZElucHV0XCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkRXJyb3JcIik7XG4gICAgfVxufSIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IFBob25lVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQaG9uZUlucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgUGhvbmVJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBob25lSW5wdXRcIjsgfVxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiUGhvbmVcIjsgfVxuXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGhvbmVJbnB1dC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGhvbmVJbnB1dC5jc3NcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQaG9uZUlucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFBob25lVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGhvbmVJbnB1dFwiLFxuICAgICAgICAgICAgXCJwaG9uZUVycm9yXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBQYXNzd29yZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi8uLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG4gICAgXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiOyB9XG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJOZXcgcGFzc3dvcmRcIjsgfVxuXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jc3NcIjsgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFBhc3N3b3JkVmFsaWRhdG9yKG1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUZpZWxkXCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVFcnJvclwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uSW5wdXQuanNcIjtcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG4gICAgXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIkNvbmZpcm0gcGFzc3dvcmRcIjsgfVxuXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY3NzXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsXG4gICAgICAgICAgIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IEVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yKG1hbmRhdG9yeSwgZmFsc2UsIG1vZGVsLCBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lKSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xGaWVsZFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xFcnJvclwiKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlck1vZGVsIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250cm9sUGFzc3dvcmQgPSBudWxsO1xuICAgIH1cblxuICAgIHNldE5ld1Bhc3N3b3JkKG5ld1Bhc3N3b3JkKSB7XG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmQgPSBuZXdQYXNzd29yZDtcbiAgICB9XG5cbiAgICBnZXROZXdQYXNzd29yZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3UGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgc2V0Q29udHJvbFBhc3N3b3JkKGNvbnRyb2xQYXNzd29yZCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xQYXNzd29yZCA9IGNvbnRyb2xQYXNzd29yZDtcbiAgICB9XG5cbiAgICBnZXRDb250cm9sUGFzc3dvcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xQYXNzd29yZDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBBbmRWYWxpZGF0b3JTZXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIFByb3BlcnR5QWNjZXNzb3IsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5qc1wiO1xuaW1wb3J0IHsgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5qc1wiO1xuaW1wb3J0IHsgUGFzc3dvcmRNYXRjaGVyTW9kZWwgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJNb2RlbC5qc1wiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXQge1xuXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkTWF0Y2hlcklucHV0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dC5odG1sXCI7IH1cbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXQuY3NzXCI7IH1cblxuXHRzdGF0aWMgZ2V0IEVWRU5UX1ZBTElEQVRFRF9FTlRFUkVEKCkgeyByZXR1cm4gXCJ2YWxpZGF0ZWRFbnRlcmVkXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRyb2xQbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSxcbiAgICAgICAgbW9kZWwgPSBudWxsLFxuICAgICAgICBwbGFjZWhvbGRlciA9IFBhc3N3b3JkTWF0Y2hlcklucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIFxuICAgICAgICBjb250cm9sUGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX0NPTlRST0xfUExBQ0VIT0xERVIsXG4gICAgICAgIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QW5kVmFsaWRhdG9yU2V0fSAqL1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCA9IG5ldyBQYXNzd29yZE1hdGNoZXJNb2RlbCgpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWV9ICovXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIFtcIm5ld1Bhc3N3b3JkXCIsIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwsIHBsYWNlaG9sZGVyLCBtYW5kYXRvcnldXG5cdFx0KTtcblxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbH0gKi9cblx0XHR0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCxcbiAgICAgICAgICAgIFtcImNvbnRyb2xQYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLCBcIm5ld1Bhc3N3b3JkXCIsIGNvbnRyb2xQbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxuXHRcdCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gYXdhaXQgdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQYXNzd29yZE1hdGNoZXJJbnB1dC5DT01QT05FTlRfTkFNRSk7XG5cbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTVBPTkVOVF9OQU1FKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIix0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIix0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5ldmVudHNcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9FTlRFUkVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMucGFzc3dvcmRWYWx1ZUVudGVyZWQpKVxuICAgICAgICAgICAgLmxpc3RlblRvKENvbW1vbklucHV0LkVWRU5UX0tFWVVQUEVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMucGFzc3dvcmRWYWx1ZUNoYW5nZWQpKTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5ldmVudHNcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9FTlRFUkVELCBuZXcgTWV0aG9kKHRoaXMsIHRoaXMucGFzc3dvcmRDb250cm9sRW50ZXJlZCkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QW5kVmFsaWRhdG9yU2V0fSAqL1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5ldyBBbmRWYWxpZGF0b3JTZXQoKVxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnZhbGlkYXRvcilcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLnZhbGlkYXRvcilcbiAgICAgICAgICAgIC53aXRoVmFsaWRMaXN0ZW5lcihuZXcgTWV0aG9kKHRoaXMsIHRoaXMucGFzc3dvcmRNYXRjaGVyVmFsaWRPY2N1cmVkKSk7XG5cbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCgpIHtcbiAgICAgICAgUHJvcGVydHlBY2Nlc3Nvci5zZXRWYWx1ZSh0aGlzLm1vZGVsLCB0aGlzLm5hbWUsIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwuZ2V0TmV3UGFzc3dvcmQoKSlcbiAgICB9XG5cbiAgICBwYXNzd29yZFZhbHVlRW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXNzd29yZFZhbHVlQ2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jbGVhcigpO1xuICAgIH1cblxuICAgIHBhc3N3b3JkQ29udHJvbEVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihQYXNzd29yZE1hdGNoZXJJbnB1dC5FVkVOVF9WQUxJREFURURfRU5URVJFRCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5mb2N1cygpOyB9XG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuc2VsZWN0QWxsKCk7IH1cbiAgICBlbmFibGUoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5lbmFibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZW5hYmxlKCk7IH1cbiAgICBkaXNhYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZGlzYWJsZSgpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5kaXNhYmxlKCk7IH1cbiAgICBjbGVhcigpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNsZWFyKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNsZWFyKCk7IH1cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XG5pbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVGV4dElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiVGV4dElucHV0XCI7IH1cbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlRleHRcIjsgfVxuXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdGV4dElucHV0Lmh0bWxcIjsgfVxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90ZXh0SW5wdXQuY3NzXCI7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoVGV4dElucHV0LkNPTVBPTkVOVF9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKGZhbHNlLCBtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInRleHRJbnB1dFwiLFxuICAgICAgICAgICAgXCJ0ZXh0RXJyb3JcIik7XG4gICAgfVxuXG59Il0sIm5hbWVzIjpbIkxPRyIsIlRleHRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUI7QUFDQSxJQUFJLFdBQVcsWUFBWSxHQUFHLEVBQUUsT0FBTyxjQUFjLENBQUMsRUFBRTtBQUN4RCxJQUFJLFdBQVcsVUFBVSxHQUFHLEVBQUUsT0FBTyxZQUFZLENBQUMsRUFBRTtBQUNwRCxJQUFJLFdBQVcsV0FBVyxHQUFHLEVBQUUsT0FBTyxhQUFhLENBQUMsRUFBRTtBQUN0RCxJQUFJLFdBQVcsVUFBVSxHQUFHLEVBQUUsT0FBTyxZQUFZLENBQUMsRUFBRTtBQUNwRDtBQUNBLElBQUksV0FBVyxhQUFhLEdBQUcsRUFBRSxPQUFPLGVBQWUsQ0FBQyxFQUFFO0FBQzFELElBQUksV0FBVyxXQUFXLEdBQUcsRUFBRSxPQUFPLGFBQWEsQ0FBQyxFQUFFO0FBQ3RELElBQUksV0FBVyxZQUFZLEdBQUcsRUFBRSxPQUFPLGNBQWMsQ0FBQyxFQUFFO0FBQ3hEO0FBQ0EsSUFBSSxXQUFXLGtCQUFrQixHQUFHLEVBQUUsT0FBTyxvQkFBb0IsQ0FBQyxFQUFFO0FBQ3BFLElBQUksV0FBVyxrQkFBa0IsR0FBRyxFQUFFLE9BQU8sb0JBQW9CLENBQUMsRUFBRTtBQUNwRSxJQUFJLFdBQVcsaUJBQWlCLEdBQUcsRUFBRSxPQUFPLG1CQUFtQixDQUFDLEVBQUU7QUFD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
