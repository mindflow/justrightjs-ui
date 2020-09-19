import { ComponentFactory, EventRegistry, CanvasStyles, StylesRegistry, InputElementDataBinding, EmailValidator, RequiredValidator, PasswordValidator, EqualsPropertyValidator, AndValidatorSet, PhoneValidator } from './justright_core_v1.js'
import { ObjectFunction, Logger, TimePromise, PropertyAccessor } from './coreutil_v1.js'
import { InjectionPoint } from './mindi_v1.js'

class BackShadeListeners {

    constructor(existingListeners = null) {
        this.backgroundClickedListener = (existingListeners && existingListeners.getBackgroundClicked) ? existingListeners.getBackgroundClicked() : null;
    }

    /**
     * 
     * @param {object} targetObject 
     * @param {function} targetFunction 
     */
    withBackgroundClicked(targetObject, targetFunction) {
        this.backgroundClickedListener = new ObjectFunction(targetObject, targetFunction);
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
     * @param {ObjectFunction} listener 
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

		/** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

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
        this.eventRegistry.attach(this.component.get("backShade"), "onclick", "//event:backShadeClicked", this.component.componentIndex);
        this.eventRegistry.listen("//event:backShadeClicked", new ObjectFunction(this, this.backgroundClickOccured), this.component.componentIndex);
    }

    backgroundClickOccured() {
        this.backShadeListeners.callBackgroundClicked();
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

    hide() { return this.disableAfter(500); }

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

const LOG$1 = new Logger("BannerMessage");

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

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {ObjectFunction} */
        this.onHideListener = null;

        /** @type {ObjectFunction} */
        this.onShowListener = null;

        /** @type {CustomAppearance} */
        this.customAppearance = customAppearance;

    }

    postConfig() {
        this.component = this.componentFactory.create("BannerMessage");
        this.component.get("bannerMessageHeader").setChild("Alert");
        this.component.get("bannerMessageMessage").setChild(this.message);
        this.applyClasses("banner-message fade");
        this.eventRegistry.attach(this.component.get("bannerMessageCloseButton"), "onclick", "//event:bannerMessageCloseButtonClicked", this.component.componentIndex);
        this.eventRegistry.listen("//event:bannerMessageCloseButtonClicked", new ObjectFunction(this,this.hide), this.component.componentIndex);
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
    
    setHeader(header) {
        this.header = header;
        this.component.get("bannerMessageHeader").setChild(this.header);
    }

    setMessage(message) {
        this.message = message;
        this.component.get("bannerMessageMessage").setChild(this.message);
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    remove() {
        return this.component.remove();
    }

    /**
     * 
     * @param {ObjectFunction} onHideListener 
     */
    onHide(onHideListener) {
        this.onHideListener = onHideListener;
    }

    /**
     * 
     * @param {ObjectFunction} onShowListener 
     */
    onShow(onShowListener) {
        this.onShowListener = onShowListener;
    }

    hide() {
        this.applyClasses("banner-message hide");
        setTimeout(() => { 
            this.component.get("bannerMessage").setStyle("display","none");
        },500);
        setTimeout(() => {
            CanvasStyles.disableStyle(BannerMessage.COMPONENT_NAME, this.component.componentIndex);
        },501);
        if(this.onHideListener) {
            this.onHideListener.call();
        }
    }

    show(newHeader = null, newMessage = null) {
        if (newHeader) {
            this.setHeader(newHeader);
        }
        if (newMessage) {
            this.setMessage(newMessage);
        }
        CanvasStyles.enableStyle(BannerMessage.COMPONENT_NAME, this.component.componentIndex);
        this.component.get("bannerMessage").setStyle("display","block");
        setTimeout(() => { 
            this.applyClasses("banner-message show");
        },100);
        if(this.onShowListener) {
            this.onShowListener.call();
        }
    }

}

class CommonListeners {
    
    constructor() {

    }

    /**
     * 
     * @param {object} targetObject 
     * @param {function} targetFunction 
     */
    withClickListener(targetObject, targetFunction) {
        this.clickListener = new ObjectFunction(targetObject, targetFunction);
        return this;
    }

    /**
     * 
     * @param {object} targetObject 
     * @param {function} targetFunction 
     */
    withKeyUpListener(targetObject, targetFunction) {
        this.keyUpListener = new ObjectFunction(targetObject, targetFunction);
        return this;
    }

    /**
     * 
     * @param {object} targetObject 
     * @param {function} targetFunction 
     */
    withEnterListener(targetObject, targetFunction) {
        this.enterListener = new ObjectFunction(targetObject, targetFunction);
        return this;
    }

    /**
     * 
     * @param {object} targetObject 
     * @param {function} targetFunction 
     */
    withBlurListener(targetObject, targetFunction) {
        this.blurListener = new ObjectFunction(targetObject, targetFunction);
        return this;
    }

    /**
     * 
     * @param {object} targetObject 
     * @param {function} targetFunction 
     */
    withChangeListener(targetObject, targetFunction) {
        this.changeListener = new ObjectFunction(targetObject, targetFunction);
        return this;
    }

    /**
     * 
     * @param {object} targetObject 
     * @param {function} targetFunction 
     */
    withFocusListener(targetObject, targetFunction) {
        this.focusListener = new ObjectFunction(targetObject, targetFunction);
        return this;
    }

    callClick(event) {
        this.callListener(this.clickListener, event);
    }

    callKeyUp(event) {
        this.callListener(this.keyUpListener, event);
    }

    callEnter(event) {
        this.callListener(this.enterListener, event);
    }

    callBlur(event) {
        this.callListener(this.blurListener, event);
    }

    callChange(event) {
        this.callListener(this.changeListener, event);
    }

    callFocus(event) {
        this.callListener(this.focusListener, event);
    }

    /**
     * 
     * @param {ObjectFunction} listener 
     * @param {Event} event 
     */
    callListener(listener, event) {
        if (null != listener) {
            listener.call(event);
        }
    }
}

const LOG$2 = new Logger("Button");

class Button {

	static get COMPONENT_NAME() { return "Button"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/button.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/button.css"; }

    static get TYPE_PRIMARY() { return "button-primary"; }
    static get TYPE_SECONDARY() { return "button-secondary"; }
    static get TYPE_SUCCESS() { return "button-success"; }
    static get TYPE_INFO() { return "button-info"; }
    static get TYPE_WARNING() { return "button-warning"; }
    static get TYPE_DANGER() { return "button-danger"; }
    static get TYPE_LIGHT() { return "button-light"; }
    static get TYPE_DARK() { return "button-dark"; }

    /**
     * 
     * @param {string} label
     * @param {CommonListeners} commonListeners
     * @param {string} buttonType
     */
    constructor(label, commonListeners = null, buttonType = Button.TYPE_PRIMARY) {

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.label = label;

        /** @type {CommonListeners} */
        this.commonListeners = (null != commonListeners) ? commonListeners : new CommonListeners();

        /** @type {string} */
        this.buttonType = buttonType;

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);
    }

    postConfig() {
        this.component = this.componentFactory.create("Button");
        CanvasStyles.enableStyle(Button.COMPONENT_NAME);
        this.component.get("button").setChild(this.label);
        this.component.get("button").setAttributeValue("class","button " + this.buttonType);
        this.registerClickListener();
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    registerClickListener() {
        this.eventRegistry.attach(this.component.get("button"), "onclick", "//event:buttonClicked", this.component.componentIndex);
        this.eventRegistry.listen("//event:buttonClicked", new ObjectFunction(this, this.clicked), this.component.componentIndex);
        return this;
    }

    clicked(event) {
        this.commonListeners.callClick(event);
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

const LOG$3 = new Logger("DialogBox");

class DialogBox {

	static get COMPONENT_NAME() { return "DialogBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/dialogBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/dialogBox.css"; }
    
    /**
     * 
     */
    constructor(){

		/** @type {EventRegistry} */
		this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

		/** @type {Component} */
        this.component = null;
        
        /** @type {BackShade} */
        this.backShade = InjectionPoint.instance(BackShade, [new BackShadeListeners()
            .withBackgroundClicked(this, this.backshadeBackgroundClickOccured)]);

        /** @type {StylesRegistry} */
        this.stylesRegistry = InjectionPoint.instance(StylesRegistry);

        /** @type {BaseElement} */
        this.container = null;

        this.hidden = true;
    }
    
    postConfig() {
        this.component = this.componentFactory.create(DialogBox.COMPONENT_NAME);
        this.component.set("backShadeContainer", this.backShade.component);

        this.eventRegistry.attach(this.component.get("closeButton"), "onclick", "//event:closeClicked", this.component.componentIndex);
        this.eventRegistry.listen("//event:closeClicked", new ObjectFunction(this, this.hide),this.component.componentIndex);
    }

    /**
     * 
     * @param {string} text 
     */
    setTitle(text){ this.component.setChild("title", text); }

    backshadeBackgroundClickOccured() { this.hide(); }

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
    
    hide() {
        if (this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = true;
        this.getDialogBoxWindow().setAttributeValue("class", "dialogbox fade");
        const hideBackShadePromise = this.backShade.hideAfter(300);
        const hidePromise = TimePromise.asPromise(200,
            () => { 
                this.getDialogBoxWindow().setStyle("display", "none");
            }
        );
        const disableStylePromise = TimePromise.asPromise(201,
            () => {
                CanvasStyles.disableStyle(DialogBox.COMPONENT_NAME, this.component.componentIndex);
            }
        );
        return Promise.all([hidePromise, disableStylePromise, hideBackShadePromise]);
    }

    show() {
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        CanvasStyles.enableStyle(DialogBox.COMPONENT_NAME, this.component.componentIndex);
        this.backShade.show();
        this.getDialogBoxWindow().setStyle("display", "block");
        return TimePromise.asPromise(100, 
            () => {
                this.getDialogBoxWindow().setAttributeValue("class", "dialogbox fade show");
            }
        );
    }

    getDialogBoxWindow() { return this.component.get("dialogBoxWindow"); }
}

const LOG$4 = new Logger("CheckBox");

class CheckBox {

	static get COMPONENT_NAME() { return "CheckBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/checkBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/checkBox.css"; }
    /**
     * 
     * @param {string} name 
     * @param {object} model
     * @param {CommonListeners} commonListeners
     */
    constructor(name, model = null, commonListeners = null) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;


        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

        /** @type {ObjectFunction} */
        this.commonListeners = (null != commonListeners) ? commonListeners : new CommonListeners();
        

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

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

const LOG$5 = new Logger("CommonInput");

class CommonInput {

    static get INPUT_CLICK_EVENT_ID() { return "//event:inputClicked"; }
    static get INPUT_KEYUP_EVENT_ID() { return "//event:inputKeyUp"; }
    static get INPUT_ENTER_EVENT_ID() { return "//event:inputEnter"; }
    static get INPUT_CHANGE_EVENT_ID() { return "//event:inputChange"; }
    static get INPUT_BLUR_EVENT_ID() { return "//event:inputBlur"; }
    static get ERROR_CLICK_EVENT_ID() { return "//event:errorClicked"; }

    static get ON_CLICK() { return "onclick"; }
    static get ON_KEYUP() { return "onkeyup"; }
    static get ON_CHANGE() { return "onchange"; }
    static get ON_BLUR() { return "onblur"; }

    /**
     * 
     * @param {string} componentName
     * @param {string} name
     * @param {object} model
     * @param {CommonListeners} commonListeners
     * @param {AbstractValidator} validator
     * @param {string} placeholder
     * @param {string} inputElementId
     * @param {string} errorElementId
     */
    constructor(componentName,
        name,
        model = null, 
        commonListeners = null,
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

        
        /** @type {CommonListeners} */
        this.commonListeners = (null != commonListeners) ? commonListeners : new CommonListeners();

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {boolean} */
        this.tainted = false;
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentName);

        CanvasStyles.enableStyle(this.componentName, this.component.componentIndex);

        this.component.get(this.inputElementId).setAttributeValue("name", this.name);
        this.component.get(this.inputElementId).setAttributeValue("placeholder", this.placeholder);

        if(this.validator) {
            this.validator.withValidListener(new ObjectFunction(this,this.hideValidationError));
        }

        if(this.model) {
            InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
        }

        this.registerListener(this.inputElementId, new ObjectFunction(this, this.entered), CommonInput.ON_KEYUP, CommonInput.INPUT_ENTER_EVENT_ID, (event) => { return event.isKeyCode(13); } );
        this.registerListener(this.inputElementId, new ObjectFunction(this, this.keyupped), CommonInput.ON_KEYUP, CommonInput.INPUT_KEYUP_EVENT_ID);
        this.registerListener(this.inputElementId, new ObjectFunction(this, this.changed), CommonInput.ON_CHANGE, CommonInput.INPUT_CHANGE_EVENT_ID);
        this.registerListener(this.inputElementId, new ObjectFunction(this, this.blurred), CommonInput.ON_BLUR, CommonInput.INPUT_BLUR_EVENT_ID);
        this.registerListener(this.inputElementId, new ObjectFunction(this, this.clicked), CommonInput.ON_CLICK, CommonInput.INPUT_CLICK_EVENT_ID);
        this.registerListener(this.errorElementId, new ObjectFunction(this, this.errorClicked), CommonInput.ON_CLICK, CommonInput.ERROR_CLICK_EVENT_ID);
    }

    /**
     * 
     * @param {string} elementId 
     * @param {ObjectFunction} listener 
     * @param {string} eventName 
     * @param {string} eventId 
     * @param {function} eventFilter 
     */
    registerListener(elementId, listener, eventName, eventId, eventFilter = null) {
        this.eventRegistry.attach(this.component.get(elementId), eventName, eventId, this.component.componentIndex);
        let filteredListener = listener;
        if (eventFilter) { filteredListener = new ObjectFunction(this,(event) => { if(eventFilter.call(this,event)) { listener.call(event); } }); }
        this.eventRegistry.listen(eventId, filteredListener, this.component.componentIndex);
        return this;
    }

    /**
     * 
     * @param {Event} event 
     */
    keyupped(event) {
        if (!event.isKeyCode(13) && !event.isKeyCode(16) && !event.isKeyCode(9)) {
            this.tainted = true;
        }
        this.commonListeners.callKeyUp(event);
    }

    changed(event) {
        this.tainted = true;
        this.commonListeners.callChange(event);
    }

    clicked(event) {
        this.commonListeners.callClick(event);
    }

    entered(event) {
        if (!this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
            return;
        }
        this.commonListeners.callEnter(event);
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
        this.commonListeners.callBlur(event);
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

const LOG$6 = new Logger("EmailInput");

class EmailInput extends CommonInput {

    static get COMPONENT_NAME() { return "EmailInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Email"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {CommonListeners} commonListeners
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, commonListeners = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(EmailInput.COMPONENT_NAME,
            name,
            model,
            commonListeners,
            new EmailValidator(mandatory, !mandatory),
            placeholder,
            "emailInput",
            "emailError");
    }

}

const LOG$7 = new Logger("PasswordInput");

class PasswordInput extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {CommonListeners} commonListeners
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, commonListeners = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordInput.COMPONENT_NAME,
            name,
            model,
            commonListeners,
            new RequiredValidator(!mandatory),
            placeholder,
            "passwordInput",
            "passwordError");
    }
}

const LOG$8 = new Logger("PasswordMatcherInputValue");

class PasswordMatcherInputValue extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputValue"; }
    static get DEFAULT_PLACEHOLDER() { return "New password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {CommonListeners} commonListeners
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, commonListeners = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordMatcherInputValue.COMPONENT_NAME,
            name,
            model,
            commonListeners,
            new PasswordValidator(mandatory),
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError");
    }
}

const LOG$9 = new Logger("PasswordMatcherInputControl");

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
     * @param {CommonListeners} commonListeners
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, modelComparedPropertyName = null, commonListeners = null, placeholder = TextInput.DEFAULT_PLACEHOLDER,
           mandatory = false) {

        super(PasswordMatcherInputControl.COMPONENT_NAME,
            name,
            model,
            commonListeners,
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

const LOG$a = new Logger("PasswordMatcherInput");

class PasswordMatcherInput {

	static get COMPONENT_NAME() { return "PasswordMatcherInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {CommonListeners} commonListeners
     * @param {string} placeholder
     * @param {string} controlPlaceholder
     * @param {boolean} mandatory
     */
    constructor(name,
        model = null,
        commonListeners = null, 
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
		this.passwordMatcherInputValue = InjectionPoint.instance(
            PasswordMatcherInputValue, ["newPassword", this.passwordMatcherModel, 
                new CommonListeners()
                    .withEnterListener(this, this.passwordEntered)
                    .withKeyUpListener(this, this.passwordChanged),
                placeholder,  mandatory]
		);

        /** @type {PasswordMatcherInputControl} */
		this.passwordMatcherInputControl = InjectionPoint.instance(
            PasswordMatcherInputControl, ["controlPassword", this.passwordMatcherModel, "newPassword", commonListeners, controlPlaceholder, mandatory]
		);
    }

    postConfig() {
        this.component = this.componentFactory.create(PasswordMatcherInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        this.component.setChild("passwordMatcherInputValue",this.passwordMatcherInputValue.component);
        this.component.setChild("passwordMatcherInputControl",this.passwordMatcherInputControl.component);

        /** @type {AndValidatorSet} */
        this.validator = new AndValidatorSet()
            .withValidator(this.passwordMatcherInputValue.validator)
            .withValidator(this.passwordMatcherInputControl.validator)
            .withValidListener(new ObjectFunction(this, this.passwordMatcherValidOccured));

    }

    passwordMatcherValidOccured() {
        PropertyAccessor.setValue(this.model, this.name, this.passwordMatcherModel.getNewPassword());
    }

    passwordEntered() {
        if(this.passwordMatcherInputValue.validator.isValid()) {
            this.passwordMatcherInputControl.focus();
        }
    }

    passwordChanged() {
        this.passwordMatcherInputControl.clear();
    }

    focus() { this.passwordMatcherInputValue.focus(); }
    selectAll() { this.passwordMatcherInputValue.selectAll(); }
    enable() { this.passwordMatcherInputValue.enable(); this.passwordMatcherInputControl.enable(); }
    disable() { this.passwordMatcherInputValue.disable(); this.passwordMatcherInputControl.disable(); }
    clear() { this.passwordMatcherInputValue.clear(); this.passwordMatcherInputControl.clear(); }
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
     * @param {CommonListeners} commonListeners
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, commonListeners = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PhoneInput.COMPONENT_NAME,
            name,
            model,
            commonListeners,
            new PhoneValidator(mandatory, !mandatory),
            placeholder,
            "phoneInput",
            "phoneError");
    }
}

const LOG$c = new Logger("TextInput");

class TextInput$1 extends CommonInput {

    static get COMPONENT_NAME() { return "TextInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Text"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {CommonListeners} commonListeners
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, commonListeners = null, placeholder = TextInput$1.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(TextInput$1.COMPONENT_NAME,
            name,
            model,
            commonListeners,
            new RequiredValidator(false, mandatory),
            placeholder,
            "textInput",
            "textError");
    }

}

export { BackShade, BackShadeListeners, BannerMessage, Button, CheckBox, CommonInput, CommonListeners, CustomAppearance, DialogBox, EmailInput, PasswordInput, PasswordMatcherInput, PasswordMatcherInputControl, PasswordMatcherInputValue, PasswordMatcherModel, PhoneInput, TextInput$1 as TextInput };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrU2hhZGUvYmFja1NoYWRlTGlzdGVuZXJzLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFja1NoYWRlL2JhY2tTaGFkZS5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2N1c3RvbUFwcGVhcmFuY2UuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYW5uZXJNZXNzYWdlL2Jhbm5lck1lc3NhZ2UuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9jb21tb25MaXN0ZW5lcnMuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9idXR0b24vYnV0dG9uLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGlhbG9nQm94L2RpYWxvZ0JveC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvY29tbW9uSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9lbWFpbElucHV0L2VtYWlsSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZElucHV0L3Bhc3N3b3JkSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVyTW9kZWwuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bob25lSW5wdXQvcGhvbmVJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3RleHRJbnB1dC90ZXh0SW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGVMaXN0ZW5lcnMge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4aXN0aW5nTGlzdGVuZXJzID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciA9IChleGlzdGluZ0xpc3RlbmVycyAmJiBleGlzdGluZ0xpc3RlbmVycy5nZXRCYWNrZ3JvdW5kQ2xpY2tlZCkgPyBleGlzdGluZ0xpc3RlbmVycy5nZXRCYWNrZ3JvdW5kQ2xpY2tlZCgpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldE9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHRhcmdldEZ1bmN0aW9uIFxyXG4gICAgICovXHJcbiAgICB3aXRoQmFja2dyb3VuZENsaWNrZWQodGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciA9IG5ldyBPYmplY3RGdW5jdGlvbih0YXJnZXRPYmplY3QsIHRhcmdldEZ1bmN0aW9uKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0QmFja2dyb3VuZENsaWNrZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQmFja2dyb3VuZENsaWNrZWQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcih0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gbGlzdGVuZXIgXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBcclxuICAgICAqL1xyXG4gICAgY2FsbExpc3RlbmVyKGxpc3RlbmVyLCBldmVudCkge1xyXG4gICAgICAgIGlmIChudWxsICE9IGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXMsXHJcbiAgICBCYXNlRWxlbWVudFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uLCBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi9iYWNrU2hhZGVMaXN0ZW5lcnMuanNcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlIHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFja1NoYWRlXCI7IH1cclxuXHRzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYWNrU2hhZGUuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYmFja1NoYWRlTGlzdGVuZXJzID0gbmV3IEJhY2tTaGFkZUxpc3RlbmVycygpKXtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XHJcblxyXG5cdFx0LyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEV2ZW50UmVnaXN0cnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0Jhc2VFbGVtZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge0JhY2tTaGFkZUxpc3RlbmVyc31cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJhY2tTaGFkZUxpc3RlbmVycyA9IGJhY2tTaGFkZUxpc3RlbmVycztcclxuXHJcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xyXG5cdH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYWNrU2hhZGUuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmJhY2tTaGFkZUNsaWNrZWRcIiwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmJhY2tTaGFkZUNsaWNrZWRcIiwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuYmFja2dyb3VuZENsaWNrT2NjdXJlZCksIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBiYWNrZ3JvdW5kQ2xpY2tPY2N1cmVkKCkge1xyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlTGlzdGVuZXJzLmNhbGxCYWNrZ3JvdW5kQ2xpY2tlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVBZnRlcihtaWxsaVNlY29uZHMpIHtcclxuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZVwiKTtcclxuICAgICAgICBjb25zdCBoaWRlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZShtaWxsaVNlY29uZHMsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKG1pbGxpU2Vjb25kcyArIDEsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2VdKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkgeyByZXR1cm4gdGhpcy5kaXNhYmxlQWZ0ZXIoNTAwKTsgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhpZGRlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHJldHVybiBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLFxyXG4gICAgICAgICAgICAoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGUgc2hvd1wiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG59IiwiZXhwb3J0IGNsYXNzIEN1c3RvbUFwcGVhcmFuY2Uge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgU0laRV9ERUZBVUxUKCkgeyByZXR1cm4gXCJzaXplLWRlZmF1bHRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTSVpFX1NNQUxMKCkgeyByZXR1cm4gXCJzaXplLXNtYWxsXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU0laRV9NRURJVU0oKSB7IHJldHVybiBcInNpemUtbWVkaXVtXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU0laRV9MQVJHRSgpIHsgcmV0dXJuIFwic2l6ZS1sYXJnZVwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBTSEFQRV9ERUFGVUxUKCkgeyByZXR1cm4gXCJzaGFwZS1kZWZhdWx0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU0hBUEVfUk9VTkQoKSB7IHJldHVybiBcInNoYXBlLXJvdW5kXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU0hBUEVfU1FVQVJFKCkgeyByZXR1cm4gXCJzaGFwZS1zcXVhcmVcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVklTSUJJTElUWV9ERUFGVUxUKCkgeyByZXR1cm4gXCJ2aXNpYmlsaXR5LWRlZmF1bHRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBWSVNJQklMSVRZX1ZJU0lCTEUoKSB7IHJldHVybiBcInZpc2liaWxpdHktdmlzaWJsZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFZJU0lCSUxJVFlfSElEREVOKCkgeyByZXR1cm4gXCJ2aXNpYmlsaXR5LWhpZGRlblwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBTUEFDSU5HX0RFRkFVTFQoKSB7IHJldHVybiBcInNwYWNpbmctZGVmYXVsdFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNQQUNJTkdfTk9ORSgpIHsgcmV0dXJuIFwic3BhY2luZy1ub25lXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1BBQ0lOR19BQk9WRSgpIHsgcmV0dXJuIFwic3BhY2luZy1hYm92ZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNQQUNJTkdfQkVMT1coKSB7IHJldHVybiBcInNwYWNpbmctYmVsb3dcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTUEFDSU5HX0FCT1ZFX0JFTE9XKCkgeyByZXR1cm4gXCJzcGFjaW5nLWFib3ZlLWJlbG93XCI7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNpemUgPSBDdXN0b21BcHBlYXJhbmNlLlNJWkVfREVGQVVMVDtcclxuICAgICAgICB0aGlzLnNoYXBlID0gQ3VzdG9tQXBwZWFyYW5jZS5TSEFQRV9ERUFGVUxUO1xyXG4gICAgICAgIHRoaXMuc3BhY2luZyA9IEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19ERUZBVUxUO1xyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IEN1c3RvbUFwcGVhcmFuY2UuVklTSUJJTElUWV9ERUFGVUxUO1xyXG4gICAgICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aFNpemUoc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aFNoYXBlKHNoYXBlKSB7XHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhTcGFjaW5nKHNwYWNpbmcpIHtcclxuICAgICAgICB0aGlzLnNwYWNpbmcgPSBzcGFjaW5nO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhWaXNpYmlsaXR5KHZpc2liaWxpdHkpIHtcclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIENvbXBvbmVudFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IEN1c3RvbUFwcGVhcmFuY2UgfSBmcm9tIFwiLi4vY3VzdG9tQXBwZWFyYW5jZS5qc1wiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhbm5lck1lc3NhZ2VcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFubmVyTWVzc2FnZSB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJhbm5lck1lc3NhZ2VcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFubmVyTWVzc2FnZS5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJNZXNzYWdlLmNzc1wiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBUWVBFX0FMRVJUKCkgeyByZXR1cm4gXCJ0eXBlLWFsZXJ0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJ0eXBlLWluZm9cIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSB7IHJldHVybiBcInR5cGUtc3VjY2Vzc1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwidHlwZS13YXJuaW5nXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmFubmVyVHlwZSBcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xvc2VhYmxlIFxyXG4gICAgICogQHBhcmFtIHtDdXN0b21BcHBlYXJhbmNlfSBjdXN0b21BcHBlYXJhbmNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGJhbm5lclR5cGUgPSBCYW5uZXJNZXNzYWdlLlRZUEVfSU5GTywgY2xvc2VhYmxlID0gZmFsc2UsIGN1c3RvbUFwcGVhcmFuY2UgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXHJcbiAgICAgICAgdGhpcy5jbG9zZWFibGUgPSBjbG9zZWFibGU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMuYmFubmVyVHlwZSA9IGJhbm5lclR5cGU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShFdmVudFJlZ2lzdHJ5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDdXN0b21BcHBlYXJhbmNlfSAqL1xyXG4gICAgICAgIHRoaXMuY3VzdG9tQXBwZWFyYW5jZSA9IGN1c3RvbUFwcGVhcmFuY2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiQmFubmVyTWVzc2FnZVwiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlSGVhZGVyXCIpLnNldENoaWxkKFwiQWxlcnRcIik7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZU1lc3NhZ2VcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGZhZGVcIik7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6YmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uQ2xpY2tlZFwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcyx0aGlzLmhpZGUpLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlDbGFzc2VzKGJhc2VDbGFzc2VzKSB7XHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBiYXNlQ2xhc3NlcztcclxuICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5iYW5uZXJUeXBlO1xyXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZSkge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlLnNpemUpIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlLnNwYWNpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixjbGFzc2VzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZU1lc3NhZ2VcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBvbkhpZGVMaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgb25IaWRlKG9uSGlkZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG9uSGlkZUxpc3RlbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBvblNob3dMaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgb25TaG93KG9uU2hvd0xpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lciA9IG9uU2hvd0xpc3RlbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBoaWRlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgfSw1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UuQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICB9LDUwMSk7XHJcbiAgICAgICAgaWYodGhpcy5vbkhpZGVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyLmNhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhuZXdIZWFkZXIgPSBudWxsLCBuZXdNZXNzYWdlID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChuZXdIZWFkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXIobmV3SGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5ld01lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG5ld01lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDbGFzc2VzKFwiYmFubmVyLW1lc3NhZ2Ugc2hvd1wiKTtcclxuICAgICAgICB9LDEwMCk7XHJcbiAgICAgICAgaWYodGhpcy5vblNob3dMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyLmNhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21tb25MaXN0ZW5lcnMge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRPYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0YXJnZXRGdW5jdGlvbiBcclxuICAgICAqL1xyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIodGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuY2xpY2tMaXN0ZW5lciA9IG5ldyBPYmplY3RGdW5jdGlvbih0YXJnZXRPYmplY3QsIHRhcmdldEZ1bmN0aW9uKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldE9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHRhcmdldEZ1bmN0aW9uIFxyXG4gICAgICovXHJcbiAgICB3aXRoS2V5VXBMaXN0ZW5lcih0YXJnZXRPYmplY3QsIHRhcmdldEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5rZXlVcExpc3RlbmVyID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0T2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdGFyZ2V0RnVuY3Rpb24gXHJcbiAgICAgKi9cclxuICAgIHdpdGhFbnRlckxpc3RlbmVyKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRPYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0YXJnZXRGdW5jdGlvbiBcclxuICAgICAqL1xyXG4gICAgd2l0aEJsdXJMaXN0ZW5lcih0YXJnZXRPYmplY3QsIHRhcmdldEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5ibHVyTGlzdGVuZXIgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRPYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0YXJnZXRGdW5jdGlvbiBcclxuICAgICAqL1xyXG4gICAgd2l0aENoYW5nZUxpc3RlbmVyKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUxpc3RlbmVyID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0T2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdGFyZ2V0RnVuY3Rpb24gXHJcbiAgICAgKi9cclxuICAgIHdpdGhGb2N1c0xpc3RlbmVyKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZvY3VzTGlzdGVuZXIgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5jbGlja0xpc3RlbmVyLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEtleVVwKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5rZXlVcExpc3RlbmVyLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEVudGVyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5lbnRlckxpc3RlbmVyLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEJsdXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcih0aGlzLmJsdXJMaXN0ZW5lciwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxDaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcih0aGlzLmNoYW5nZUxpc3RlbmVyLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEZvY3VzKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5mb2N1c0xpc3RlbmVyLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGxpc3RlbmVyIFxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXHJcbiAgICAgKi9cclxuICAgIGNhbGxMaXN0ZW5lcihsaXN0ZW5lciwgZXZlbnQpIHtcclxuICAgICAgICBpZiAobnVsbCAhPSBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5jYWxsKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXMsXHJcbiAgICBDb21wb25lbnRcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBDb21tb25MaXN0ZW5lcnMgfSBmcm9tIFwiLi4vY29tbW9uTGlzdGVuZXJzLmpzXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQnV0dG9uXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJ1dHRvblwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9idXR0b24uaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYnV0dG9uLmNzc1wiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBUWVBFX1BSSU1BUlkoKSB7IHJldHVybiBcImJ1dHRvbi1wcmltYXJ5XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TRUNPTkRBUlkoKSB7IHJldHVybiBcImJ1dHRvbi1zZWNvbmRhcnlcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSB7IHJldHVybiBcImJ1dHRvbi1zdWNjZXNzXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJidXR0b24taW5mb1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwiYnV0dG9uLXdhcm5pbmdcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0RBTkdFUigpIHsgcmV0dXJuIFwiYnV0dG9uLWRhbmdlclwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfTElHSFQoKSB7IHJldHVybiBcImJ1dHRvbi1saWdodFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFSSygpIHsgcmV0dXJuIFwiYnV0dG9uLWRhcmtcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxcclxuICAgICAqIEBwYXJhbSB7Q29tbW9uTGlzdGVuZXJzfSBjb21tb25MaXN0ZW5lcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25UeXBlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBjb21tb25MaXN0ZW5lcnMgPSBudWxsLCBidXR0b25UeXBlID0gQnV0dG9uLlRZUEVfUFJJTUFSWSkge1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbW1vbkxpc3RlbmVyc30gKi9cclxuICAgICAgICB0aGlzLmNvbW1vbkxpc3RlbmVycyA9IChudWxsICE9IGNvbW1vbkxpc3RlbmVycykgPyBjb21tb25MaXN0ZW5lcnMgOiBuZXcgQ29tbW9uTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMuYnV0dG9uVHlwZSA9IGJ1dHRvblR5cGU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShFdmVudFJlZ2lzdHJ5KTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkJ1dHRvblwiKTtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQnV0dG9uLkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0Q2hpbGQodGhpcy5sYWJlbCk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImJ1dHRvbiBcIiArIHRoaXMuYnV0dG9uVHlwZSk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckNsaWNrTGlzdGVuZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICByZWdpc3RlckNsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YnV0dG9uQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6YnV0dG9uQ2xpY2tlZFwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5jbGlja2VkKSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrZWQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNvbW1vbkxpc3RlbmVycy5jYWxsQ2xpY2soZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUxvYWRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lckNvbnRhaW5lclwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsXCJidXR0b24tc3Bpbm5lci1jb250YWluZXItdmlzaWJsZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlTG9hZGluZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyQ29udGFpbmVyXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgU3R5bGVzUmVnaXN0cnksXHJcbiAgICBCYXNlRWxlbWVudFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBUaW1lUHJvbWlzZSwgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBCYWNrU2hhZGUgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZS5qc1wiO1xyXG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qc1wiO1xyXG5cclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJEaWFsb2dCb3hcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiRGlhbG9nQm94XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2RpYWxvZ0JveC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9kaWFsb2dCb3guY3NzXCI7IH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcblx0XHQvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcblx0XHR0aGlzLmV2ZW50UmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShFdmVudFJlZ2lzdHJ5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcclxuICAgICAgICBcclxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZX0gKi9cclxuICAgICAgICB0aGlzLmJhY2tTaGFkZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEJhY2tTaGFkZSwgW25ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKVxyXG4gICAgICAgICAgICAud2l0aEJhY2tncm91bmRDbGlja2VkKHRoaXMsIHRoaXMuYmFja3NoYWRlQmFja2dyb3VuZENsaWNrT2NjdXJlZCldKTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtTdHlsZXNSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLnN0eWxlc1JlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoU3R5bGVzUmVnaXN0cnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0Jhc2VFbGVtZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldChcImJhY2tTaGFkZUNvbnRhaW5lclwiLCB0aGlzLmJhY2tTaGFkZS5jb21wb25lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImNsb3NlQnV0dG9uXCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmNsb3NlQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6Y2xvc2VDbGlja2VkXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGUpLHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXHJcbiAgICAgKi9cclxuICAgIHNldFRpdGxlKHRleHQpeyB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInRpdGxlXCIsIHRleHQpOyB9XHJcblxyXG4gICAgYmFja3NoYWRlQmFja2dyb3VuZENsaWNrT2NjdXJlZCgpIHsgdGhpcy5oaWRlKCk7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcclxuICAgICAqL1xyXG4gICAgc2V0Rm9vdGVyKGNvbXBvbmVudCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94Rm9vdGVyXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiZGlhbG9nQm94Rm9vdGVyXCIsIGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXHJcbiAgICAgKi9cclxuICAgIHNldENvbnRlbnQoY29tcG9uZW50KXsgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJkaWFsb2dCb3hDb250ZW50XCIsY29tcG9uZW50KTsgfVxyXG5cclxuXHRzZXQoa2V5LHZhbCkgeyB0aGlzLmNvbXBvbmVudC5zZXQoa2V5LHZhbCk7IH1cclxuICAgIFxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdldERpYWxvZ0JveFdpbmRvdygpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3ggZmFkZVwiKTtcclxuICAgICAgICBjb25zdCBoaWRlQmFja1NoYWRlUHJvbWlzZSA9IHRoaXMuYmFja1NoYWRlLmhpZGVBZnRlcigzMDApO1xyXG4gICAgICAgIGNvbnN0IGhpZGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKDIwMCxcclxuICAgICAgICAgICAgKCkgPT4geyBcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94V2luZG93KCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZGlzYWJsZVN0eWxlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZSgyMDEsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2UsIGhpZGVCYWNrU2hhZGVQcm9taXNlXSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7cmVzb2x2ZSgpO30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICB0aGlzLmJhY2tTaGFkZS5zaG93KCk7XHJcbiAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hXaW5kb3coKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICByZXR1cm4gVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwgXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94V2luZG93KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveCBmYWRlIHNob3dcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERpYWxvZ0JveFdpbmRvdygpIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveFdpbmRvd1wiKTsgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBDb21tb25MaXN0ZW5lcnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uTGlzdGVuZXJzLmpzXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ2hlY2tCb3hcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tCb3gge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJDaGVja0JveFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9jaGVja0JveC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9jaGVja0JveC5jc3NcIjsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge0NvbW1vbkxpc3RlbmVyc30gY29tbW9uTGlzdGVuZXJzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgY29tbW9uTGlzdGVuZXJzID0gbnVsbCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xyXG5cclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge09iamVjdEZ1bmN0aW9ufSAqL1xyXG4gICAgICAgIHRoaXMuY29tbW9uTGlzdGVuZXJzID0gKG51bGwgIT0gY29tbW9uTGlzdGVuZXJzKSA/IGNvbW1vbkxpc3RlbmVycyA6IG5ldyBDb21tb25MaXN0ZW5lcnMoKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEV2ZW50UmVnaXN0cnkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShDaGVja0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKENoZWNrQm94LkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XHJcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBPYmplY3RGdW5jdGlvbiwgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IElucHV0RWxlbWVudERhdGFCaW5kaW5nLCBBYnN0cmFjdFZhbGlkYXRvciwgQ29tcG9uZW50RmFjdG9yeSwgRXZlbnRSZWdpc3RyeSwgQ2FudmFzU3R5bGVzLCBFdmVudCwgQ29tcG9uZW50IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcbmltcG9ydCB7IENvbW1vbkxpc3RlbmVycyB9IGZyb20gXCIuLi9jb21tb25MaXN0ZW5lcnMuanNcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJDb21tb25JbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21tb25JbnB1dCB7XHJcblxyXG4gICAgc3RhdGljIGdldCBJTlBVVF9DTElDS19FVkVOVF9JRCgpIHsgcmV0dXJuIFwiLy9ldmVudDppbnB1dENsaWNrZWRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBJTlBVVF9LRVlVUF9FVkVOVF9JRCgpIHsgcmV0dXJuIFwiLy9ldmVudDppbnB1dEtleVVwXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgSU5QVVRfRU5URVJfRVZFTlRfSUQoKSB7IHJldHVybiBcIi8vZXZlbnQ6aW5wdXRFbnRlclwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IElOUFVUX0NIQU5HRV9FVkVOVF9JRCgpIHsgcmV0dXJuIFwiLy9ldmVudDppbnB1dENoYW5nZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IElOUFVUX0JMVVJfRVZFTlRfSUQoKSB7IHJldHVybiBcIi8vZXZlbnQ6aW5wdXRCbHVyXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgRVJST1JfQ0xJQ0tfRVZFTlRfSUQoKSB7IHJldHVybiBcIi8vZXZlbnQ6ZXJyb3JDbGlja2VkXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IE9OX0NMSUNLKCkgeyByZXR1cm4gXCJvbmNsaWNrXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgT05fS0VZVVAoKSB7IHJldHVybiBcIm9ua2V5dXBcIjsgfVxyXG4gICAgc3RhdGljIGdldCBPTl9DSEFOR0UoKSB7IHJldHVybiBcIm9uY2hhbmdlXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgT05fQkxVUigpIHsgcmV0dXJuIFwib25ibHVyXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7Q29tbW9uTGlzdGVuZXJzfSBjb21tb25MaXN0ZW5lcnNcclxuICAgICAqIEBwYXJhbSB7QWJzdHJhY3RWYWxpZGF0b3J9IHZhbGlkYXRvclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRFbGVtZW50SWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckVsZW1lbnRJZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnROYW1lLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgbW9kZWwgPSBudWxsLCBcclxuICAgICAgICBjb21tb25MaXN0ZW5lcnMgPSBudWxsLFxyXG4gICAgICAgIHZhbGlkYXRvciA9IG51bGwsIFxyXG4gICAgICAgIHBsYWNlaG9sZGVyID0gbnVsbCxcclxuICAgICAgICBpbnB1dEVsZW1lbnRJZCA9IFwiaW5wdXRcIixcclxuICAgICAgICBlcnJvckVsZW1lbnRJZCA9IFwiZXJyb3JcIikge1xyXG5cclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7QWJzdHJhY3RWYWxpZGF0b3J9ICovXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSB2YWxpZGF0b3I7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnRJZCA9IGlucHV0RWxlbWVudElkO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmVycm9yRWxlbWVudElkID0gZXJyb3JFbGVtZW50SWQ7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21tb25MaXN0ZW5lcnN9ICovXHJcbiAgICAgICAgdGhpcy5jb21tb25MaXN0ZW5lcnMgPSAobnVsbCAhPSBjb21tb25MaXN0ZW5lcnMpID8gY29tbW9uTGlzdGVuZXJzIDogbmV3IENvbW1vbkxpc3RlbmVycygpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cclxuICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmNvbXBvbmVudE5hbWUpO1xyXG5cclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUodGhpcy5jb21wb25lbnROYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLCB0aGlzLnBsYWNlaG9sZGVyKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3Iud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XHJcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCwgdGhpcy52YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIodGhpcy5pbnB1dEVsZW1lbnRJZCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuZW50ZXJlZCksIENvbW1vbklucHV0Lk9OX0tFWVVQLCBDb21tb25JbnB1dC5JTlBVVF9FTlRFUl9FVkVOVF9JRCwgKGV2ZW50KSA9PiB7IHJldHVybiBldmVudC5pc0tleUNvZGUoMTMpOyB9ICk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVyKHRoaXMuaW5wdXRFbGVtZW50SWQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmtleXVwcGVkKSwgQ29tbW9uSW5wdXQuT05fS0VZVVAsIENvbW1vbklucHV0LklOUFVUX0tFWVVQX0VWRU5UX0lEKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIodGhpcy5pbnB1dEVsZW1lbnRJZCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuY2hhbmdlZCksIENvbW1vbklucHV0Lk9OX0NIQU5HRSwgQ29tbW9uSW5wdXQuSU5QVVRfQ0hBTkdFX0VWRU5UX0lEKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIodGhpcy5pbnB1dEVsZW1lbnRJZCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuYmx1cnJlZCksIENvbW1vbklucHV0Lk9OX0JMVVIsIENvbW1vbklucHV0LklOUFVUX0JMVVJfRVZFTlRfSUQpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcih0aGlzLmlucHV0RWxlbWVudElkLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5jbGlja2VkKSwgQ29tbW9uSW5wdXQuT05fQ0xJQ0ssIENvbW1vbklucHV0LklOUFVUX0NMSUNLX0VWRU5UX0lEKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIodGhpcy5lcnJvckVsZW1lbnRJZCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuZXJyb3JDbGlja2VkKSwgQ29tbW9uSW5wdXQuT05fQ0xJQ0ssIENvbW1vbklucHV0LkVSUk9SX0NMSUNLX0VWRU5UX0lEKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGxpc3RlbmVyIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudElkIFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZXZlbnRGaWx0ZXIgXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXIoZWxlbWVudElkLCBsaXN0ZW5lciwgZXZlbnROYW1lLCBldmVudElkLCBldmVudEZpbHRlciA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChlbGVtZW50SWQpLCBldmVudE5hbWUsIGV2ZW50SWQsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICBsZXQgZmlsdGVyZWRMaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIGlmIChldmVudEZpbHRlcikgeyBmaWx0ZXJlZExpc3RlbmVyID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsKGV2ZW50KSA9PiB7IGlmKGV2ZW50RmlsdGVyLmNhbGwodGhpcyxldmVudCkpIHsgbGlzdGVuZXIuY2FsbChldmVudCk7IH0gfSk7IH1cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKGV2ZW50SWQsIGZpbHRlcmVkTGlzdGVuZXIsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgXHJcbiAgICAgKi9cclxuICAgIGtleXVwcGVkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCFldmVudC5pc0tleUNvZGUoMTMpICYmICFldmVudC5pc0tleUNvZGUoMTYpICYmICFldmVudC5pc0tleUNvZGUoOSkpIHtcclxuICAgICAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21tb25MaXN0ZW5lcnMuY2FsbEtleVVwKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VkKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbW1vbkxpc3RlbmVycy5jYWxsQ2hhbmdlKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja2VkKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jb21tb25MaXN0ZW5lcnMuY2FsbENsaWNrKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBlbnRlcmVkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21tb25MaXN0ZW5lcnMuY2FsbEVudGVyKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBibHVycmVkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhaW50ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB0aGlzLmNvbW1vbkxpc3RlbmVycy5jYWxsQmx1cihldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXJyb3JDbGlja2VkKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTsgfVxyXG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7IH1cclxuICAgIGZvY3VzKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuZm9jdXMoKTsgfVxyXG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2VsZWN0QWxsKCk7IH1cclxuICAgIGVuYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmVuYWJsZSgpOyB9XHJcbiAgICBkaXNhYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuZGlzYWJsZSgpOyB9XHJcbiAgICBjbGVhcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnZhbHVlID0gXCJcIjsgdGhpcy50YWludGVkID0gZmFsc2U7IHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpOyB9XHJcblxyXG59IiwiaW1wb3J0IHsgRW1haWxWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XHJcbmltcG9ydCB7IENvbW1vbkxpc3RlbmVycyB9IGZyb20gXCIuLi8uLi9jb21tb25MaXN0ZW5lcnMuanNcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFbWFpbElucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XHJcblxyXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiRW1haWxJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIkVtYWlsXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9lbWFpbElucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2VtYWlsSW5wdXQuY3NzXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtDb21tb25MaXN0ZW5lcnN9IGNvbW1vbkxpc3RlbmVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGNvbW1vbkxpc3RlbmVycyA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKEVtYWlsSW5wdXQuQ09NUE9ORU5UX05BTUUsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIG1vZGVsLFxyXG4gICAgICAgICAgICBjb21tb25MaXN0ZW5lcnMsXHJcbiAgICAgICAgICAgIG5ldyBFbWFpbFZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgICAgICAgXCJlbWFpbElucHV0XCIsXHJcbiAgICAgICAgICAgIFwiZW1haWxFcnJvclwiKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcclxuaW1wb3J0IHsgQ29tbW9uTGlzdGVuZXJzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbkxpc3RlbmVycy5qc1wiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkSW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcclxuICAgIFxyXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlBhc3N3b3JkXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkSW5wdXQuY3NzXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtDb21tb25MaXN0ZW5lcnN9IGNvbW1vbkxpc3RlbmVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGNvbW1vbkxpc3RlbmVycyA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkSW5wdXQuQ09NUE9ORU5UX05BTUUsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIG1vZGVsLFxyXG4gICAgICAgICAgICBjb21tb25MaXN0ZW5lcnMsXHJcbiAgICAgICAgICAgIG5ldyBSZXF1aXJlZFZhbGlkYXRvcighbWFuZGF0b3J5KSxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRJbnB1dFwiLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkRXJyb3JcIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQYXNzd29yZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uSW5wdXQuanNcIjtcclxuaW1wb3J0IHsgQ29tbW9uTGlzdGVuZXJzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbkxpc3RlbmVycy5qc1wiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSBleHRlbmRzIENvbW1vbklucHV0IHtcclxuICAgIFxyXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIk5ldyBwYXNzd29yZFwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7Q29tbW9uTGlzdGVuZXJzfSBjb21tb25MaXN0ZW5lcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBjb21tb25MaXN0ZW5lcnMgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xyXG5cclxuICAgICAgICBzdXBlcihQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLkNPTVBPTkVOVF9OQU1FLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBtb2RlbCxcclxuICAgICAgICAgICAgY29tbW9uTGlzdGVuZXJzLFxyXG4gICAgICAgICAgICBuZXcgUGFzc3dvcmRWYWxpZGF0b3IobWFuZGF0b3J5KSxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUZpZWxkXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUVycm9yXCIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XHJcbmltcG9ydCB7IENvbW1vbkxpc3RlbmVycyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb25MaXN0ZW5lcnMuanNcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xyXG4gICAgXHJcbiAgICBzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIjsgfVxyXG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJDb25maXJtIHBhc3N3b3JkXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNzc1wiOyB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWVcclxuICAgICAqIEBwYXJhbSB7Q29tbW9uTGlzdGVuZXJzfSBjb21tb25MaXN0ZW5lcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lID0gbnVsbCwgY29tbW9uTGlzdGVuZXJzID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUixcclxuICAgICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xyXG5cclxuICAgICAgICBzdXBlcihQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuQ09NUE9ORU5UX05BTUUsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIG1vZGVsLFxyXG4gICAgICAgICAgICBjb21tb25MaXN0ZW5lcnMsXHJcbiAgICAgICAgICAgIG5ldyBFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvcihtYW5kYXRvcnksIGZhbHNlLCBtb2RlbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSksXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEZpZWxkXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRXJyb3JcIik7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVyTW9kZWwge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFBhc3N3b3JkID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXROZXdQYXNzd29yZChuZXdQYXNzd29yZCkge1xyXG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmQgPSBuZXdQYXNzd29yZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXROZXdQYXNzd29yZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uZXdQYXNzd29yZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb250cm9sUGFzc3dvcmQoY29udHJvbFBhc3N3b3JkKSB7XHJcbiAgICAgICAgdGhpcy5jb250cm9sUGFzc3dvcmQgPSBjb250cm9sUGFzc3dvcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29udHJvbFBhc3N3b3JkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xQYXNzd29yZDtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBcclxuICAgIEFic3RyYWN0VmFsaWRhdG9yLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIEFuZFZhbGlkYXRvclNldCxcclxuICAgIENvbXBvbmVudFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIFByb3BlcnR5QWNjZXNzb3IsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanNcIjtcclxuaW1wb3J0IHsgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5qc1wiO1xyXG5pbXBvcnQgeyBDb21tb25MaXN0ZW5lcnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uTGlzdGVuZXJzLmpzXCI7XHJcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlck1vZGVsIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVyTW9kZWwuanNcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkTWF0Y2hlcklucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0LmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7Q29tbW9uTGlzdGVuZXJzfSBjb21tb25MaXN0ZW5lcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRyb2xQbGFjZWhvbGRlclxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSxcclxuICAgICAgICBtb2RlbCA9IG51bGwsXHJcbiAgICAgICAgY29tbW9uTGlzdGVuZXJzID0gbnVsbCwgXHJcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBcclxuICAgICAgICBjb250cm9sUGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX0NPTlRST0xfUExBQ0VIT0xERVIsXHJcbiAgICAgICAgbWFuZGF0b3J5ID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7QW5kVmFsaWRhdG9yU2V0fSAqL1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCA9IG5ldyBQYXNzd29yZE1hdGNoZXJNb2RlbCgpO1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlfSAqL1xyXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoXHJcbiAgICAgICAgICAgIFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUsIFtcIm5ld1Bhc3N3b3JkXCIsIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwsIFxyXG4gICAgICAgICAgICAgICAgbmV3IENvbW1vbkxpc3RlbmVycygpXHJcbiAgICAgICAgICAgICAgICAgICAgLndpdGhFbnRlckxpc3RlbmVyKHRoaXMsIHRoaXMucGFzc3dvcmRFbnRlcmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIC53aXRoS2V5VXBMaXN0ZW5lcih0aGlzLCB0aGlzLnBhc3N3b3JkQ2hhbmdlZCksXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciwgIG1hbmRhdG9yeV1cclxuXHRcdCk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7UGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sfSAqL1xyXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShcclxuICAgICAgICAgICAgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLCBbXCJjb250cm9sUGFzc3dvcmRcIiwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCwgXCJuZXdQYXNzd29yZFwiLCBjb21tb25MaXN0ZW5lcnMsIGNvbnRyb2xQbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxyXG5cdFx0KTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQYXNzd29yZE1hdGNoZXJJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcblxyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYXNzd29yZE1hdGNoZXJJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiLHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jb21wb25lbnQpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtBbmRWYWxpZGF0b3JTZXR9ICovXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgQW5kVmFsaWRhdG9yU2V0KClcclxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnZhbGlkYXRvcilcclxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wudmFsaWRhdG9yKVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMucGFzc3dvcmRNYXRjaGVyVmFsaWRPY2N1cmVkKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCgpIHtcclxuICAgICAgICBQcm9wZXJ0eUFjY2Vzc29yLnNldFZhbHVlKHRoaXMubW9kZWwsIHRoaXMubmFtZSwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbC5nZXROZXdQYXNzd29yZCgpKVxyXG4gICAgfVxyXG5cclxuICAgIHBhc3N3b3JkRW50ZXJlZCgpIHtcclxuICAgICAgICBpZih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYXNzd29yZENoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBmb2N1cygpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmZvY3VzKCk7IH1cclxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnNlbGVjdEFsbCgpOyB9XHJcbiAgICBlbmFibGUoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5lbmFibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZW5hYmxlKCk7IH1cclxuICAgIGRpc2FibGUoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5kaXNhYmxlKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmRpc2FibGUoKTsgfVxyXG4gICAgY2xlYXIoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jbGVhcigpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jbGVhcigpOyB9XHJcbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcclxuaW1wb3J0IHsgUGhvbmVWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uTGlzdGVuZXJzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbkxpc3RlbmVycy5qc1wiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBob25lSW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGhvbmVJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQaG9uZUlucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiUGhvbmVcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bob25lSW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGhvbmVJbnB1dC5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge0NvbW1vbkxpc3RlbmVyc30gY29tbW9uTGlzdGVuZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgY29tbW9uTGlzdGVuZXJzID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoUGhvbmVJbnB1dC5DT01QT05FTlRfTkFNRSxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIGNvbW1vbkxpc3RlbmVycyxcclxuICAgICAgICAgICAgbmV3IFBob25lVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICBcInBob25lSW5wdXRcIixcclxuICAgICAgICAgICAgXCJwaG9uZUVycm9yXCIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XHJcbmltcG9ydCB7IFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IENvbW1vbkxpc3RlbmVycyB9IGZyb20gXCIuLi8uLi9jb21tb25MaXN0ZW5lcnMuanNcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUZXh0SW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlRleHRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlRleHRcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RleHRJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90ZXh0SW5wdXQuY3NzXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtDb21tb25MaXN0ZW5lcnN9IGNvbW1vbkxpc3RlbmVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGNvbW1vbkxpc3RlbmVycyA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKFRleHRJbnB1dC5DT01QT05FTlRfTkFNRSxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIGNvbW1vbkxpc3RlbmVycyxcclxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKGZhbHNlLCBtYW5kYXRvcnkpLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgICAgICAgXCJ0ZXh0SW5wdXRcIixcclxuICAgICAgICAgICAgXCJ0ZXh0RXJyb3JcIik7XHJcbiAgICB9XHJcblxyXG59Il0sIm5hbWVzIjpbIkxPRyIsIlRleHRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7OztBQUVPLE1BQU0sa0JBQWtCLENBQUM7O0lBRTVCLFdBQVcsQ0FB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
