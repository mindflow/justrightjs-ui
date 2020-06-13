'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var justright_core_v1 = require('justright_core_v1');
var coreutil_v1 = require('coreutil_v1');
var mindi_v1 = require('mindi_v1');

const LOG = new coreutil_v1.Logger("BackShade");

class BackShade {

	static get COMPONENT_NAME() { return "BackShade"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/backShade.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/backShade.css"; }

    /**
     * 
     */
    constructor(){

		/** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {BaseElement} */
        this.container = null;
	}

    postConfig() {
        LOG.info("Post config");
        this.component = this.componentFactory.create("BackShade");
    }

    /**
     * 
     * @param {BaseElement} container 
     */
    setContainer(container) {
        this.container = container;
    }

    /**
     * @return {Component}
     */
	getComponent(){
		return this.component;
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    withClickListener(clickedListener) {
        this.eventRegistry.attach(this.component.get("backShade"), "onclick", "//event:backShadeClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:backShadeClicked", clickedListener, this.component.getComponentIndex());
        return this;
    }

    disableAfter(milliSeconds) {
        this.mountSelf();
        this.getComponent().get("backShade").setAttributeValue("class", "back-shade fade");
        setTimeout(() => { 
            this.getComponent().get("backShade").setStyle("display", "none");
        }, milliSeconds);
        setTimeout(() => {
            justright_core_v1.CanvasStyles.disableStyle(BackShade.COMPONENT_NAME);
        }, milliSeconds + 1);
    }

    disable() {
        this.disableAfter(500);
    }

    enable() {
        justright_core_v1.CanvasStyles.enableStyle(BackShade.COMPONENT_NAME);
        this.mountSelf();
        this.getComponent().get("backShade").setStyle("display", "block");
        setTimeout(() => { 
            this.getComponent().get("backShade").setAttributeValue("class", "back-shade fade show"); 
        }, 100);
    }

    mountSelf() {
        if (!this.getComponent().getRootElement().isMounted()) {
            if(this.container) {
                this.container.addChild(this.getComponent());
            }else{
                justright_core_v1.CanvasRoot.prependBodyElement(this.getComponent().getRootElement());
            }
        }
    }

    removeSelf() {
        this.getComponent().remove();
    }
    
}

const LOG$1 = new coreutil_v1.Logger("BannerMessage");

class BannerMessage {

	static get COMPONENT_NAME() { return "BannerMessage"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/bannerMessage.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/bannerMessage.css"; }

    static get TYPE_ALERT() { return "banner-message-alert"; }
    static get TYPE_INFO() { return "banner-message-info"; }
    static get TYPE_SUCCESS() { return "banner-message-success"; }
    static get TYPE_WARNING() { return "banner-message-warning"; }

    /**
     * 
     * @param {string} message 
     * @param {string} bannerType 
     * @param {boolean} closeable 
     */
    constructor(message, bannerType = BannerMessage.TYPE_PRIMARY, closeable = false) {

        /** @type {string} */
        this.message = message;

        /** @type {boolean} */
        this.closeable = closeable;

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {ObjectFunction} */
        this.onHideListener = null;

        /** @type {ObjectFunction} */
        this.onShowListener = null;
    }

    postConfig() {
        this.component = this.componentFactory.create("BannerMessage");
        this.component.get("bannerMessageHeader").setChild("Alert");
        this.component.get("bannerMessageMessage").setChild(this.message);
        this.component.get("bannerMessage").setAttributeValue("class","banner-message fade " + this.bannerType);
        this.eventRegistry.attach(this.component.get("bannerMessageCloseButton"), "onclick", "//event:bannerMessageCloseButtonClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:bannerMessageCloseButtonClicked", new coreutil_v1.ObjectFunction(this,this.hide), this.component.getComponentIndex());
    }

	getComponent(){
		return this.component;
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
        return this.getComponent().remove();
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
        this.getComponent().get("bannerMessage").setAttributeValue("class" , "banner-message hide " + this.bannerType);
        setTimeout(() => { 
            this.getComponent().get("bannerMessage").setStyle("display","none");
        },500);
        setTimeout(() => {
            justright_core_v1.CanvasStyles.disableStyle(BannerMessage.COMPONENT_NAME);
        },501);
        if(this.onHideListener) {
            this.onHideListener.call();
        }
    }

    show() {
        justright_core_v1.CanvasStyles.enableStyle(BannerMessage.COMPONENT_NAME);
        this.getComponent().get("bannerMessage").setStyle("display","block");
        setTimeout(() => { 
            this.getComponent().get("bannerMessage").setAttributeValue("class" , "banner-message show "  + this.bannerType) ;
        },100);
        if(this.onShowListener) {
            this.onShowListener.call();
        }
    }

}

const LOG$2 = new coreutil_v1.Logger("Button");

class Button$1 {

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
     * @param {string} buttonType 
     * @param {ObjectFunction} clickListener
     */
    constructor(label, buttonType = Button$1.TYPE_PRIMARY, clickListener = null) {

        /** @type {string} */
        this.label = label;

        /** @type {ObjectFunction} */
        this.clickListener = clickListener;

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {string} */
        this.buttonType = buttonType;

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);
    }

    postConfig() {
        this.component = this.componentFactory.create("Button");
        justright_core_v1.CanvasStyles.enableStyle(Button$1.COMPONENT_NAME);
        this.component.get("button").setChild(this.label);
        this.component.get("button").setAttributeValue("class","button " + this.buttonType);
        if(this.clickListener) {
            this.registerClickListener(this.clickListener);
        }
    }

	getComponent(){
		return this.component;
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    registerClickListener(clickListener) {
        this.eventRegistry.attach(this.component.get("button"), "onclick", "//event:buttonClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:buttonClicked", clickListener, this.component.getComponentIndex());
        return this;
    }

    enableLoading() {
        this.getComponent().get("spinnerContainer").setAttributeValue("class","button-spinner-container-visible");
    }

    disableLoading() {
        this.getComponent().get("spinnerContainer").setAttributeValue("class","button-spinner-container-hidden");
    }

    disable() {
        this.getComponent().get("button").setAttributeValue("disabled","true");
    }

    enable() {
        this.getComponent().get("button").removeAttribute("disabled");
    }
}

const LOG$3 = new coreutil_v1.Logger("DialogBox");

class DialogBox {

	static get COMPONENT_NAME() { return "DialogBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/dialogBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/dialogBox.css"; }
    
    /**
     * 
     */
    constructor(){

		/** @type {EventRegistry} */
		this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);


		/** @type {Component} */
        this.component = null;
        
        /** @type {BackShade} */
        this.backShade = mindi_v1.InjectionPoint.instance(BackShade);

        /** @type {StylesRegistry} */
        this.stylesRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.StylesRegistry);

        /** @type {BaseElement} */
        this.container = null;
    }
    
    postConfig() {
        LOG$3.info("Post config");
        this.component = this.componentFactory.create("DialogBox");
        this.eventRegistry.attach(this.component.get("closeButton"), "onclick", "//event:closeClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:closeClicked", new coreutil_v1.ObjectFunction(this, this.hide),this.component.getComponentIndex());
        this.backShade = this.backShade
            .withClickListener(new coreutil_v1.ObjectFunction(this, this.hide));
    }

    /**
     * 
     * @param {BaseElement} container 
     */
    setContainer(container) {
        this.container = container;
        this.backShade.setContainer(this.container);
    }


    /**
     * @return {Component}
     */
	getComponent(){
		return this.component;
    }

    /**
     * 
     * @param {string} text 
     */
    setTitle(text){
        this.getComponent().setChild("title", text);
    }

    /**
     * 
     * @param {Component} component 
     */
    setFooter(component){
        this.getComponent().get("footer").setStyle("display", "block");
        this.getComponent().setChild("footer", component);
    }

    /**
     * 
     * @param {Component} component 
     */
    setContent(component){
        this.getComponent().setChild("content",component);
    }

	set(key,val) {
		this.getComponent().set(key,val);
	}
    
    hide() {
        this.backShade.mountSelf();
        this.mountSelf();

        this.getComponent().get("dialogBox").setAttributeValue("class" , "dialogbox fade");
        setTimeout(() => { 
            this.getComponent().get("dialogBox").setStyle("display","none");
            this.backShade.disableAfter(500);
        },200);
        setTimeout(() => {
            justright_core_v1.CanvasStyles.disableStyle(DialogBox.COMPONENT_NAME);
        },201);
    }

    show() {
        justright_core_v1.CanvasStyles.enableStyle(DialogBox.COMPONENT_NAME);
        this.backShade.mountSelf();
        this.mountSelf();

        this.backShade.enable();

        this.getComponent().get("dialogBox").setStyle("display","block");
        setTimeout(() => { 
            this.getComponent().get("dialogBox").setAttributeValue("class" , "dialogbox fade show") ;
        },100);
    }

    /**
     * Inserts this component in the container at the provided id
     */
    mountSelf() {
        if(!this.getComponent().getRootElement().isMounted()) {
            if(this.container) {
                this.container.addChild(this.getComponent());
            }else{
                justright_core_v1.CanvasRoot.prependBodyElement(this.getComponent().getRootElement());
            }
        }
    }

    removeSelf() {
        justright_core_v1.CanvasStyles.removeStyle(DialogBox.COMPONENT_NAME);
        this.getComponent().removeSelf();
    }
}

const LOG$4 = new coreutil_v1.Logger("CheckBox");

class CheckBox {

	static get COMPONENT_NAME() { return "CheckBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/checkBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/checkBox.css"; }
    /**
     * 
     * @param {string} name 
     * @param {object} model
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, model = null, clickListener = null, enterListener = null, changeListener = null, blurListener) {
        
        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

        /** @type {ObjectFunction} */
        this.clickListener = clickListener;

        /** @type {ObjectFunction} */
        this.enterListener = enterListener;

        /** @type {ObjectFunction} */
        this.changeListener = changeListener;

        /** @type {ObjectFunction} */
        this.blurListener = blurListener;
        
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

    }

    postConfig() {
        this.component = this.componentFactory.create(CheckBox.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(CheckBox.COMPONENT_NAME);
        this.component.get("checkBox").setAttributeValue("name",this.name);

        if(this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model).to(this.component.get("checkBox"));
        }
    }

	getComponent(){
		return this.component;
    }

}

class CommonInput {

    static get INPUT_CLICK_EVENT_ID() { return "//event:inputClicked"; }
    static get INPUT_KEYUP_EVENT_ID() { return "//event:inputKeyUp"; }
    static get INPUT_ENTER_EVENT_ID() { return "//event:inputEnter"; }
    static get INPUT_CHANGE_EVENT_ID() { return "//event:inputChange"; }
    static get INPUT_BLUR_EVENT_ID() { return "//event:inputBlur"; }
    static get ERROR_CLICKED_EVENT_ID() { return "//event:errorClicked"; }

    static get ON_CLICK() { return "onclick"; }
    static get ON_KEYUP() { return "onkeyup"; }
    static get ON_CHANGE() { return "onchange"; }
    static get ON_BLUR() { return "onblur"; }

    /**
     * 
     * @param {string} componentName 
     * @param {string} name 
     * @param {string} placeholder 
     * @param {string} inputElementId 
     * @param {string} errorElementId 
     * @param {object} model 
     * @param {AbstractValidator} validator 
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(componentName, name, placeholder, inputElementId, errorElementId, model = null, validator = null, 
            clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

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

        /** @type {AbstractValidator} */
        this.validator = validator;

        /** @type {ObjectFunction} */
        this.clickListener = clickListener;

        /** @type {ObjectFunction} */
        this.keyupListener = keyupListener;

        /** @type {ObjectFunction} */
        this.enterListener = enterListener;

        /** @type {ObjectFunction} */
        this.changeListener = changeListener;

        /** @type {ObjectFunction} */
        this.blurListener = blurListener;

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {boolean} */
        this.tainted = false;
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentName);

        justright_core_v1.CanvasStyles.enableStyle(this.componentName);

        this.component.get(this.inputElementId).setAttributeValue("name", this.name);
        this.component.get(this.inputElementId).setAttributeValue("placeholder", this.placeholder);

        if(this.validator) {
            this.validator.withValidListener(new coreutil_v1.ObjectFunction(this,this.hideValidationError));
        }

        if(this.model) {
            justright_core_v1.InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
        }

        this.registerListener(new coreutil_v1.ObjectFunction(this, this.entered), CommonInput.ON_KEYUP, CommonInput.INPUT_ENTER_EVENT_ID, (event) => { return event.getKeyCode() === 13; } );
        this.registerListener(new coreutil_v1.ObjectFunction(this, this.keyupped), CommonInput.ON_KEYUP, CommonInput.INPUT_BLUR_EVENT_ID);
        this.registerListener(new coreutil_v1.ObjectFunction(this, this.changed), CommonInput.ON_CHANGE, CommonInput.INPUT_CHANGE_EVENT_ID);
        this.registerListener(new coreutil_v1.ObjectFunction(this, this.blurred), CommonInput.ON_BLUR, CommonInput.INPUT_BLUR_EVENT_ID);
        this.registerListener(new coreutil_v1.ObjectFunction(this, this.clicked), CommonInput.ON_CLICK, CommonInput.INPUT_BLUR_EVENT_ID);
        this.registerListener(new coreutil_v1.ObjectFunction(this, this.errorClicked), CommonInput.ON_CLICK, CommonInput.ERROR_CLICKED_EVENT_ID);
    }

    getComponent() {
        return this.component;
    }

    getValidator() {
        return this.validator;
    }

    /**
     * 
     * @param {ObjectFunction} listener 
     * @param {string} eventName 
     * @param {string} eventId 
     * @param {function} eventFilter 
     */
    registerListener(listener, eventName, eventId, eventFilter = null) {
        this.eventRegistry.attach(this.component.get(this.inputElementId), eventName, eventId, this.component.getComponentIndex());
        let filteredListener = listener;
        if(eventFilter) { filteredListener = new coreutil_v1.ObjectFunction(this,(event) => { if(eventFilter.call(this,event)) { listener.call(event); } }); }
        this.eventRegistry.listen(eventId, filteredListener, this.component.getComponentIndex());
        return this;
    }

    keyupped(event) {
        this.tainted = true;
        if (this.keyupListener) {
            this.keyupListener.call(event);
        }
    }

    changed(event) {
        this.tainted = true;
        if (this.changedListener) {
            this.changedListener.call(event);
        }
    }

    clicked(event) {
        if (this.clickListener) {
            this.clickListener.call(event);
        }
    }

    entered(event) {
        if (!this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
            return;
        }

        if (this.enterListener) {
            this.enterListener.call(event);
        }
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

        if (this.blurListener) {
            this.blurListener.call(event);
        }
    }

    errorClicked(event) {
        this.hideValidationError();

        if (this.errorClickListener) {
            this.errorClickListener.call(event);
        }
    }


    showValidationError() { this.component.get(this.errorElementId).setStyle("display", "block"); }
    hideValidationError() { this.component.get(this.errorElementId).setStyle("display", "none"); }
    focus() { this.component.get(this.inputElementId).focus(); }
    selectAll() { this.component.get(this.inputElementId).selectAll(); }
    enable() { this.component.get(this.inputElementId).enable(); }
    disable() { this.component.get(this.inputElementId).disable(); }
    clear() { this.component.get(this.inputElementId).setValue(""); }

}

const LOG$5 = new coreutil_v1.Logger("EmailInput");

class EmailInput extends CommonInput {

    static get COMPONENT_NAME() { return "EmailInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Email"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {boolean} mandatory
     * @param {string} placeholder
     * @param {object} model
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER, model = null, 
        clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        super(EmailInput.COMPONENT_NAME,
            name,
            placeholder,
            "emailInput",
            "emailError",
            model,
            new justright_core_v1.EmailValidator(mandatory, !mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }

}

class InputWrapper {

    constructor(component) {
        this.component = component;
    }

    wireup(componentName, inputElementId, errorElementId) {

        CanvasStyles.enableStyle(componentName);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(inputElementId);
        const error = this.component.get(errorElementId);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", PhoneInput.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", PhoneInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", PhoneInput.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", PhoneInput.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(PhoneInput.BLUR_EVENT, new ObjectFunction(this, this.blurred), idx);
        this.eventRegistry.listen(PhoneInput.KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(PhoneInput.CHANGE_EVENT, new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(PhoneInput.ERROR_CLICK_EVENT, new ObjectFunction(this, this.hideValidationError), idx);

        this.withPlaceholder(this.placeholder);
    }

}

const LOG$6 = new coreutil_v1.Logger("PasswordInput");

class PasswordInput extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {boolean} mandatory
     * @param {string} placeholder
     * @param {object} model
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER, model = null, 
        clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        super(PasswordInput.COMPONENT_NAME,
            name,
            placeholder,
            "passwordInput",
            "passwordError",
            model,
            new justright_core_v1.RequiredValidator(!mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }
}

const LOG$7 = new coreutil_v1.Logger("PasswordMatcherInputValue");

class PasswordMatcherInputValue extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputValue"; }
    static get DEFAULT_PLACEHOLDER() { return "New password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.css"; }

    /**
     * 
     * @param {string} name
     * @param {boolean} mandatory
     * @param {string} placeholder
     * @param {object} model
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER, model = null, 
        clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        super(PasswordMatcherInputValue.COMPONENT_NAME,
            name,
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError",
            model,
            new justright_core_v1.PasswordValidator(mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }
}

const LOG$8 = new coreutil_v1.Logger("PasswordMatcherInputControl");

class PasswordMatcherInputControl extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputControl"; }
    static get DEFAULT_PLACEHOLDER() { return "Confirm password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.css"; }

    /**
     * 
     * @param {string} name
     * @param {boolean} mandatory
     * @param {string} placeholder
     * @param {object} model
     * @param {ObjectFunction} comparedValueFunction
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER, model = null, comparedValueFunction = null,
        clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        super(PasswordMatcherInputControl.COMPONENT_NAME,
            name,
            placeholder,
            "passwordMatcherInputControlField",
            "passwordMatcherInputControlError",
            model,
            new justright_core_v1.EqualsValidator(mandatory, false, comparedValueFunction),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }
}

const LOG$9 = new coreutil_v1.Logger("PasswordMatcherInput");

class PasswordMatcherInput {

	static get COMPONENT_NAME() { return "PasswordMatcherInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.css"; }

    /**
     * 
     * @param {string} name 
     * @param {boolean} mandatory 
     * @param {string} placeholder 
     * @param {string} controlPlaceholder 
     * @param {object} model 
     * @param {ObjectFunction} comparedValueFunction 
     * @param {ObjectFunction} passwordEnteredListener 
     */
    constructor(name, controlName, mandatory = false, 
        placeholder = PasswordMatcherInput.DEFAULT_PLACEHOLDER, 
        controlPlaceholder = PasswordMatcherInput.DEFAULT_CONTROL_PLACEHOLDER,
        model = null,
        comparedValueFunction = null,
        passwordEnteredListener = null) {


        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {PasswordMatcherInputValue} */
		this.passwordMatcherInputValue = mindi_v1.InjectionPoint.instance(
			PasswordMatcherInputValue, [name, mandatory, placeholder, model, null, null, new coreutil_v1.ObjectFunction(this, this.passwordEntered)]
		);

        /** @type {PasswordMatcherInputControl} */
		this.passwordMatcherInputControl = mindi_v1.InjectionPoint.instance(
			PasswordMatcherInputControl, [controlName, mandatory, controlPlaceholder, model, comparedValueFunction, null, null, passwordEnteredListener]
		);
    }

    postConfig() {
        this.component = this.componentFactory.create(PasswordMatcherInput.COMPONENT_NAME);

        justright_core_v1.CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        this.component.setChild("passwordMatcherInputValue",this.passwordMatcherInputValue.getComponent());
        this.component.setChild("passwordMatcherInputControl",this.passwordMatcherInputControl.getComponent());

        /** @type {AndValidatorSet} */
        this.validator = new justright_core_v1.AndValidatorSet()
            .withValidator(this.passwordMatcherInputValue.getValidator())
            .withValidator(this.passwordMatcherInputControl.getValidator());

    }

    passwordEntered() {
        if(this.passwordMatcherInputValue.getValidator().isValid()) {
            this.passwordMatcherInputControl.focus();
        }
    }

	getComponent() {
		return this.component;
    }

    /**
     * @returns {AbstractValidator}
     */
    getValidator() {
        return this.validator;
    }

    focus() { this.passwordMatcherInputValue.focus(); }
    selectAll() { this.passwordMatcherInputValue.selectAll(); }
    enable() { this.passwordMatcherInputValue.enable(); this.passwordMatcherInputControl.enable(); }
    disable() { this.passwordMatcherInputValue.disable(); this.passwordMatcherInputControl.disable(); }
    clear() { this.passwordMatcherInputValue.clear(); this.passwordMatcherInputControl.clear(); }
}

const LOG$a = new coreutil_v1.Logger("PhoneInput");

class PhoneInput$1 extends CommonInput {

    static get COMPONENT_NAME() { return "PhoneInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Phone"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/phoneInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/phoneInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {boolean} mandatory
     * @param {string} placeholder
     * @param {object} model
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER, model = null, 
        clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        super(PhoneInput$1.COMPONENT_NAME,
            name,
            placeholder,
            "phoneInput",
            "phoneError",
            model,
            new justright_core_v1.PhoneValidator(mandatory, !mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }
}

const LOG$b = new coreutil_v1.Logger("TextInput");

class TextInput$1 extends CommonInput {

    static get COMPONENT_NAME() { return "TextInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Text"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {boolean} mandatory
     * @param {string} placeholder
     * @param {object} model
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, mandatory = false, placeholder = TextInput$1.DEFAULT_PLACEHOLDER, model = null, 
        clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        super(TextInput$1.COMPONENT_NAME,
            name,
            placeholder,
            "textInput",
            "textError",
            model,
            new justright_core_v1.RequiredValidator(!mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }

}

const LOG$c = new coreutil_v1.Logger("Button");

class Submit {

	static get COMPONENT_NAME() { return "Submit"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/submit.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/submit.css"; }

    static get TYPE_PRIMARY() { return "btn-primary"; }
    static get TYPE_SECONDARY() { return "btn-secondary"; }
    static get TYPE_SUCCESS() { return "btn-success"; }
    static get TYPE_INFO() { return "btn-info"; }
    static get TYPE_WARNING() { return "btn-warning"; }
    static get TYPE_DANGER() { return "btn-danger"; }
    static get TYPE_LIGHT() { return "btn-light"; }
    static get TYPE_DARK() { return "btn-dark"; }

    /**
     * 
     * @param {string} label 
     * @param {string} buttonType 
     */
    constructor(label, buttonType = Button.TYPE_PRIMARY) {

        /** @type {string} */
        this.label = label;

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {string} */
        this.buttonType = buttonType;

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);
    }

    postConfig() {
        this.component = this.componentFactory.create("Submit");
        justright_core_v1.CanvasStyles.enableStyle(Submit.COMPONENT_NAME);
        this.component.get("submit").setAttributeValue("value", this.label);
        this.component.get("submit").setAttributeValue("class","btn " + this.buttonType);
    }

	getComponent(){
		return this.component;
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    withClickListener(clickListener) {
        this.eventRegistry.attach(this.component.get("submit"), "onclick", "//event:submitClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:submitClicked", clickListener, this.component.getComponentIndex());
        return this;
    }

    disable() {
        this.getComponent().get("submit").setAttributeValue("disabled","true");
    }

    enable() {
        this.getComponent().get("submit").removeAttribute("disabled");
    }
}

exports.BackShade = BackShade;
exports.BannerMessage = BannerMessage;
exports.Button = Button$1;
exports.CheckBox = CheckBox;
exports.CommonInput = CommonInput;
exports.DialogBox = DialogBox;
exports.EmailInput = EmailInput;
exports.InputWrapper = InputWrapper;
exports.PasswordInput = PasswordInput;
exports.PasswordMatcherInput = PasswordMatcherInput;
exports.PasswordMatcherInputControl = PasswordMatcherInputControl;
exports.PasswordMatcherInputValue = PasswordMatcherInputValue;
exports.PhoneInput = PhoneInput$1;
exports.Submit = Submit;
exports.TextInput = TextInput$1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrU2hhZGUvYmFja1NoYWRlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTWVzc2FnZS9iYW5uZXJNZXNzYWdlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYnV0dG9uL2J1dHRvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9jaGVja0JveC9jaGVja0JveC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2NvbW1vbklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvZW1haWxJbnB1dC9lbWFpbElucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvaW5wdXRXcmFwcGVyLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRJbnB1dC9wYXNzd29yZElucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGhvbmVJbnB1dC9waG9uZUlucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvdGV4dElucHV0L3RleHRJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L3N1Ym1pdC9zdWJtaXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgQ2FudmFzUm9vdCxcclxuICAgIEJhc2VFbGVtZW50XHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlIHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFja1NoYWRlXCI7IH1cclxuXHRzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYWNrU2hhZGUuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcblx0XHQvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtCYXNlRWxlbWVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XHJcblx0fVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgTE9HLmluZm8oXCJQb3N0IGNvbmZpZ1wiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCYWNrU2hhZGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QmFzZUVsZW1lbnR9IGNvbnRhaW5lciBcclxuICAgICAqL1xyXG4gICAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxyXG4gICAgICovXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNsaWNrZWRMaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIoY2xpY2tlZExpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YmFja1NoYWRlQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpiYWNrU2hhZGVDbGlja2VkXCIsIGNsaWNrZWRMaXN0ZW5lciwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUFmdGVyKG1pbGxpU2Vjb25kcykge1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgfSwgbWlsbGlTZWNvbmRzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShCYWNrU2hhZGUuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIH0sIG1pbGxpU2Vjb25kcyArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQWZ0ZXIoNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGUgc2hvd1wiKSBcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdW50U2VsZigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0Um9vdEVsZW1lbnQoKS5pc01vdW50ZWQoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYWRkQ2hpbGQodGhpcy5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzUm9vdC5wcmVwZW5kQm9keUVsZW1lbnQodGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxmKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlc1xyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFubmVyTWVzc2FnZVwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYW5uZXJNZXNzYWdlIHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFubmVyTWVzc2FnZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJNZXNzYWdlLmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lck1lc3NhZ2UuY3NzXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfQUxFUlQoKSB7IHJldHVybiBcImJhbm5lci1tZXNzYWdlLWFsZXJ0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJiYW5uZXItbWVzc2FnZS1pbmZvXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJiYW5uZXItbWVzc2FnZS1zdWNjZXNzXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgeyByZXR1cm4gXCJiYW5uZXItbWVzc2FnZS13YXJuaW5nXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmFubmVyVHlwZSBcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xvc2VhYmxlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBiYW5uZXJUeXBlID0gQmFubmVyTWVzc2FnZS5UWVBFX1BSSU1BUlksIGNsb3NlYWJsZSA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cclxuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmJhbm5lclR5cGUgPSBiYW5uZXJUeXBlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXHJcbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG51bGw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXHJcbiAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lciA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCYW5uZXJNZXNzYWdlXCIpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQoXCJBbGVydFwiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYmFubmVyLW1lc3NhZ2UgZmFkZSBcIiArIHRoaXMuYmFubmVyVHlwZSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25DbGlja2VkXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLHRoaXMuaGlkZSksIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZU1lc3NhZ2VcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IG9uSGlkZUxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBvbkhpZGUob25IaWRlTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyID0gb25IaWRlTGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IG9uU2hvd0xpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBvblNob3cob25TaG93TGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gb25TaG93TGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJiYW5uZXItbWVzc2FnZSBoaWRlIFwiICsgdGhpcy5iYW5uZXJUeXBlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgfSw1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIH0sNTAxKTtcclxuICAgICAgICBpZih0aGlzLm9uSGlkZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIuY2FsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYW5uZXJNZXNzYWdlLkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIgLCBcImJhbm5lci1tZXNzYWdlIHNob3cgXCIgICsgdGhpcy5iYW5uZXJUeXBlKSA7XHJcbiAgICAgICAgfSwxMDApO1xyXG4gICAgICAgIGlmKHRoaXMub25TaG93TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lci5jYWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlc1xyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQnV0dG9uXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJ1dHRvblwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9idXR0b24uaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYnV0dG9uLmNzc1wiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBUWVBFX1BSSU1BUlkoKSB7IHJldHVybiBcImJ1dHRvbi1wcmltYXJ5XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TRUNPTkRBUlkoKSB7IHJldHVybiBcImJ1dHRvbi1zZWNvbmRhcnlcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSB7IHJldHVybiBcImJ1dHRvbi1zdWNjZXNzXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJidXR0b24taW5mb1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwiYnV0dG9uLXdhcm5pbmdcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0RBTkdFUigpIHsgcmV0dXJuIFwiYnV0dG9uLWRhbmdlclwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfTElHSFQoKSB7IHJldHVybiBcImJ1dHRvbi1saWdodFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFSSygpIHsgcmV0dXJuIFwiYnV0dG9uLWRhcmtcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uVHlwZSBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNsaWNrTGlzdGVuZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGJ1dHRvblR5cGUgPSBCdXR0b24uVFlQRV9QUklNQVJZLCBjbGlja0xpc3RlbmVyID0gbnVsbCkge1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXHJcbiAgICAgICAgdGhpcy5jbGlja0xpc3RlbmVyID0gY2xpY2tMaXN0ZW5lcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmJ1dHRvblR5cGUgPSBidXR0b25UeXBlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCdXR0b25cIik7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJ1dHRvbi5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKHRoaXMubGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsXCJidXR0b24gXCIgKyB0aGlzLmJ1dHRvblR5cGUpO1xyXG4gICAgICAgIGlmKHRoaXMuY2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ2xpY2tMaXN0ZW5lcih0aGlzLmNsaWNrTGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNsaWNrZWRMaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJDbGlja0xpc3RlbmVyKGNsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDpidXR0b25DbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmJ1dHRvbkNsaWNrZWRcIiwgY2xpY2tMaXN0ZW5lciwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlTG9hZGluZygpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcInNwaW5uZXJDb250YWluZXJcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLXZpc2libGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUxvYWRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJzcGlubmVyQ29udGFpbmVyXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsXCJ0cnVlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIFN0eWxlc1JlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzUm9vdCxcclxuICAgIEJhc2VFbGVtZW50XHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgQmFja1NoYWRlIH0gZnJvbSBcIi4uL2JhY2tTaGFkZS9iYWNrU2hhZGUuanNcIjtcclxuXHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRGlhbG9nQm94XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpYWxvZ0JveCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkRpYWxvZ0JveFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9kaWFsb2dCb3guaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZGlhbG9nQm94LmNzc1wiOyB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG5cdFx0LyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG5cdFx0dGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcblxyXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKiBAdHlwZSB7QmFja1NoYWRlfSAqL1xyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQmFja1NoYWRlKTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtTdHlsZXNSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLnN0eWxlc1JlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoU3R5bGVzUmVnaXN0cnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0Jhc2VFbGVtZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICBMT0cuaW5mbyhcIlBvc3QgY29uZmlnXCIpXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiRGlhbG9nQm94XCIpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwiY2xvc2VCdXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6Y2xvc2VDbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmNsb3NlQ2xpY2tlZFwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlKSx0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmJhY2tTaGFkZSA9IHRoaXMuYmFja1NoYWRlXHJcbiAgICAgICAgICAgIC53aXRoQ2xpY2tMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QmFzZUVsZW1lbnR9IGNvbnRhaW5lciBcclxuICAgICAqL1xyXG4gICAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlLnNldENvbnRhaW5lcih0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxyXG4gICAgICovXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFxyXG4gICAgICovXHJcbiAgICBzZXRUaXRsZSh0ZXh0KXtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLnNldENoaWxkKFwidGl0bGVcIiwgdGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXHJcbiAgICAgKi9cclxuICAgIHNldEZvb3Rlcihjb21wb25lbnQpe1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZm9vdGVyXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuc2V0Q2hpbGQoXCJmb290ZXJcIiwgY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcclxuICAgICAqL1xyXG4gICAgc2V0Q29udGVudChjb21wb25lbnQpe1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuc2V0Q2hpbGQoXCJjb250ZW50XCIsY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcblx0c2V0KGtleSx2YWwpIHtcclxuXHRcdHRoaXMuZ2V0Q29tcG9uZW50KCkuc2V0KGtleSx2YWwpO1xyXG5cdH1cclxuICAgIFxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmJhY2tTaGFkZS5tb3VudFNlbGYoKTtcclxuICAgICAgICB0aGlzLm1vdW50U2VsZigpO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIgLCBcImRpYWxvZ2JveCBmYWRlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJkaWFsb2dCb3hcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJhY2tTaGFkZS5kaXNhYmxlQWZ0ZXIoNTAwKTtcclxuICAgICAgICB9LDIwMCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB9LDIwMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmJhY2tTaGFkZS5tb3VudFNlbGYoKTtcclxuICAgICAgICB0aGlzLm1vdW50U2VsZigpO1xyXG5cclxuICAgICAgICB0aGlzLmJhY2tTaGFkZS5lbmFibGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJkaWFsb2dCb3hcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZGlhbG9nQm94XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiAsIFwiZGlhbG9nYm94IGZhZGUgc2hvd1wiKSA7XHJcbiAgICAgICAgfSwxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zZXJ0cyB0aGlzIGNvbXBvbmVudCBpbiB0aGUgY29udGFpbmVyIGF0IHRoZSBwcm92aWRlZCBpZFxyXG4gICAgICovXHJcbiAgICBtb3VudFNlbGYoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0Um9vdEVsZW1lbnQoKS5pc01vdW50ZWQoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYWRkQ2hpbGQodGhpcy5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzUm9vdC5wcmVwZW5kQm9keUVsZW1lbnQodGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxmKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5yZW1vdmVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlU2VsZigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNoZWNrQm94XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrQm94IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQ2hlY2tCb3hcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guY3NzXCI7IH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gZW50ZXJMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2hhbmdlTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGJsdXJMaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGNsaWNrTGlzdGVuZXIgPSBudWxsLCBlbnRlckxpc3RlbmVyID0gbnVsbCwgY2hhbmdlTGlzdGVuZXIgPSBudWxsLCBibHVyTGlzdGVuZXIpIHtcclxuICAgICAgICBcclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cclxuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXHJcbiAgICAgICAgdGhpcy5jbGlja0xpc3RlbmVyID0gY2xpY2tMaXN0ZW5lcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSBlbnRlckxpc3RlbmVyO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge09iamVjdEZ1bmN0aW9ufSAqL1xyXG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdGVuZXIgPSBjaGFuZ2VMaXN0ZW5lcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLmJsdXJMaXN0ZW5lciA9IGJsdXJMaXN0ZW5lcjtcclxuICAgICAgICBcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShFdmVudFJlZ2lzdHJ5KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQ2hlY2tCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShDaGVja0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xyXG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IElucHV0RWxlbWVudERhdGFCaW5kaW5nLCBBYnN0cmFjdFZhbGlkYXRvciwgQ29tcG9uZW50RmFjdG9yeSwgRXZlbnRSZWdpc3RyeSwgQ2FudmFzU3R5bGVzIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbW9uSW5wdXQge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgSU5QVVRfQ0xJQ0tfRVZFTlRfSUQoKSB7IHJldHVybiBcIi8vZXZlbnQ6aW5wdXRDbGlja2VkXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgSU5QVVRfS0VZVVBfRVZFTlRfSUQoKSB7IHJldHVybiBcIi8vZXZlbnQ6aW5wdXRLZXlVcFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IElOUFVUX0VOVEVSX0VWRU5UX0lEKCkgeyByZXR1cm4gXCIvL2V2ZW50OmlucHV0RW50ZXJcIjsgfVxyXG4gICAgc3RhdGljIGdldCBJTlBVVF9DSEFOR0VfRVZFTlRfSUQoKSB7IHJldHVybiBcIi8vZXZlbnQ6aW5wdXRDaGFuZ2VcIjsgfVxyXG4gICAgc3RhdGljIGdldCBJTlBVVF9CTFVSX0VWRU5UX0lEKCkgeyByZXR1cm4gXCIvL2V2ZW50OmlucHV0Qmx1clwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEVSUk9SX0NMSUNLRURfRVZFTlRfSUQoKSB7IHJldHVybiBcIi8vZXZlbnQ6ZXJyb3JDbGlja2VkXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IE9OX0NMSUNLKCkgeyByZXR1cm4gXCJvbmNsaWNrXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgT05fS0VZVVAoKSB7IHJldHVybiBcIm9ua2V5dXBcIjsgfVxyXG4gICAgc3RhdGljIGdldCBPTl9DSEFOR0UoKSB7IHJldHVybiBcIm9uY2hhbmdlXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgT05fQkxVUigpIHsgcmV0dXJuIFwib25ibHVyXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlciBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dEVsZW1lbnRJZCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckVsZW1lbnRJZCBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbCBcclxuICAgICAqIEBwYXJhbSB7QWJzdHJhY3RWYWxpZGF0b3J9IHZhbGlkYXRvciBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNsaWNrTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGtleXVwTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGVudGVyTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNoYW5nZUxpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBibHVyTGlzdGVuZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TmFtZSwgbmFtZSwgcGxhY2Vob2xkZXIsIGlucHV0RWxlbWVudElkLCBlcnJvckVsZW1lbnRJZCwgbW9kZWwgPSBudWxsLCB2YWxpZGF0b3IgPSBudWxsLCBcclxuICAgICAgICAgICAgY2xpY2tMaXN0ZW5lciA9IG51bGwsIGtleXVwTGlzdGVuZXIgPSBudWxsLCBlbnRlckxpc3RlbmVyID0gbnVsbCwgY2hhbmdlTGlzdGVuZXIgPSBudWxsLCBibHVyTGlzdGVuZXIgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnRJZCA9IGlucHV0RWxlbWVudElkO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmVycm9yRWxlbWVudElkID0gZXJyb3JFbGVtZW50SWQ7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtBYnN0cmFjdFZhbGlkYXRvcn0gKi9cclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IHZhbGlkYXRvcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLmNsaWNrTGlzdGVuZXIgPSBjbGlja0xpc3RlbmVyO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge09iamVjdEZ1bmN0aW9ufSAqL1xyXG4gICAgICAgIHRoaXMua2V5dXBMaXN0ZW5lciA9IGtleXVwTGlzdGVuZXI7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXHJcbiAgICAgICAgdGhpcy5lbnRlckxpc3RlbmVyID0gZW50ZXJMaXN0ZW5lcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLmNoYW5nZUxpc3RlbmVyID0gY2hhbmdlTGlzdGVuZXI7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXHJcbiAgICAgICAgdGhpcy5ibHVyTGlzdGVuZXIgPSBibHVyTGlzdGVuZXI7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEV2ZW50UmVnaXN0cnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXHJcbiAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUodGhpcy5jb21wb25lbnROYW1lKTtcclxuXHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKHRoaXMuY29tcG9uZW50TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLCB0aGlzLnBsYWNlaG9sZGVyKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3Iud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XHJcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCwgdGhpcy52YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuZW50ZXJlZCksIENvbW1vbklucHV0Lk9OX0tFWVVQLCBDb21tb25JbnB1dC5JTlBVVF9FTlRFUl9FVkVOVF9JRCwgKGV2ZW50KSA9PiB7IHJldHVybiBldmVudC5nZXRLZXlDb2RlKCkgPT09IDEzOyB9ICk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVyKG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmtleXVwcGVkKSwgQ29tbW9uSW5wdXQuT05fS0VZVVAsIENvbW1vbklucHV0LklOUFVUX0JMVVJfRVZFTlRfSUQpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5jaGFuZ2VkKSwgQ29tbW9uSW5wdXQuT05fQ0hBTkdFLCBDb21tb25JbnB1dC5JTlBVVF9DSEFOR0VfRVZFTlRfSUQpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5ibHVycmVkKSwgQ29tbW9uSW5wdXQuT05fQkxVUiwgQ29tbW9uSW5wdXQuSU5QVVRfQkxVUl9FVkVOVF9JRCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVyKG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmNsaWNrZWQpLCBDb21tb25JbnB1dC5PTl9DTElDSywgQ29tbW9uSW5wdXQuSU5QVVRfQkxVUl9FVkVOVF9JRCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVyKG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmVycm9yQ2xpY2tlZCksIENvbW1vbklucHV0Lk9OX0NMSUNLLCBDb21tb25JbnB1dC5FUlJPUl9DTElDS0VEX0VWRU5UX0lEKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb21wb25lbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbGlkYXRvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGxpc3RlbmVyIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudElkIFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZXZlbnRGaWx0ZXIgXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTGlzdGVuZXIobGlzdGVuZXIsIGV2ZW50TmFtZSwgZXZlbnRJZCwgZXZlbnRGaWx0ZXIgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCksIGV2ZW50TmFtZSwgZXZlbnRJZCwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgbGV0IGZpbHRlcmVkTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICBpZihldmVudEZpbHRlcikgeyBmaWx0ZXJlZExpc3RlbmVyID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsKGV2ZW50KSA9PiB7IGlmKGV2ZW50RmlsdGVyLmNhbGwodGhpcyxldmVudCkpIHsgbGlzdGVuZXIuY2FsbChldmVudCk7IH0gfSk7IH1cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKGV2ZW50SWQsIGZpbHRlcmVkTGlzdGVuZXIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGtleXVwcGVkKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5rZXl1cExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5dXBMaXN0ZW5lci5jYWxsKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlZChldmVudCkge1xyXG4gICAgICAgIHRoaXMudGFpbnRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlZExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZExpc3RlbmVyLmNhbGwoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja2VkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrTGlzdGVuZXIuY2FsbChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVudGVyZWQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZW50ZXJMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIuY2FsbChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJsdXJyZWQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMudGFpbnRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ibHVyTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5ibHVyTGlzdGVuZXIuY2FsbChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVycm9yQ2xpY2tlZChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lcnJvckNsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvckNsaWNrTGlzdGVuZXIuY2FsbChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7IH1cclxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpOyB9XHJcbiAgICBmb2N1cygpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmZvY3VzKCk7IH1cclxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNlbGVjdEFsbCgpOyB9XHJcbiAgICBlbmFibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5lbmFibGUoKTsgfVxyXG4gICAgZGlzYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmRpc2FibGUoKTsgfVxyXG4gICAgY2xlYXIoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZXRWYWx1ZShcIlwiKTsgfVxyXG5cclxufSIsImltcG9ydCB7IEVtYWlsVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXRcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFbWFpbElucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XHJcblxyXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiRW1haWxJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIkVtYWlsXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9lbWFpbElucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2VtYWlsSW5wdXQuY3NzXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0ga2V5dXBMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gZW50ZXJMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2hhbmdlTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGJsdXJMaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtYW5kYXRvcnkgPSBmYWxzZSwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbW9kZWwgPSBudWxsLCBcclxuICAgICAgICBjbGlja0xpc3RlbmVyID0gbnVsbCwga2V5dXBMaXN0ZW5lciA9IG51bGwsIGVudGVyTGlzdGVuZXIgPSBudWxsLCBjaGFuZ2VMaXN0ZW5lciA9IG51bGwsIGJsdXJMaXN0ZW5lciA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoRW1haWxJbnB1dC5DT01QT05FTlRfTkFNRSxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIFwiZW1haWxJbnB1dFwiLFxyXG4gICAgICAgICAgICBcImVtYWlsRXJyb3JcIixcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIG5ldyBFbWFpbFZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxyXG4gICAgICAgICAgICBjbGlja0xpc3RlbmVyLFxyXG4gICAgICAgICAgICBrZXl1cExpc3RlbmVyLFxyXG4gICAgICAgICAgICBlbnRlckxpc3RlbmVyLFxyXG4gICAgICAgICAgICBjaGFuZ2VMaXN0ZW5lcixcclxuICAgICAgICAgICAgYmx1ckxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgSW5wdXRXcmFwcGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnQpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICB3aXJldXAoY29tcG9uZW50TmFtZSwgaW5wdXRFbGVtZW50SWQsIGVycm9yRWxlbWVudElkKSB7XHJcblxyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShjb21wb25lbnROYW1lKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChpbnB1dEVsZW1lbnRJZCk7XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLmNvbXBvbmVudC5nZXQoZXJyb3JFbGVtZW50SWQpO1xyXG5cclxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGlucHV0LCBcIm9uYmx1clwiLCBQaG9uZUlucHV0LkJMVVJfRVZFTlQsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChpbnB1dCwgXCJvbmtleXVwXCIsIFBob25lSW5wdXQuS0VZVVBfRVZFTlQsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChpbnB1dCwgXCJvbmNoYW5nZVwiLCBQaG9uZUlucHV0LkNIQU5HRV9FVkVOVCwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGVycm9yLCBcIm9uY2xpY2tcIiwgUGhvbmVJbnB1dC5FUlJPUl9DTElDS19FVkVOVCwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQaG9uZUlucHV0LkJMVVJfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmJsdXJyZWQpLCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oUGhvbmVJbnB1dC5LRVlVUF9FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMua2V5VXApLCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oUGhvbmVJbnB1dC5DSEFOR0VfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmNoYW5nZSksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQaG9uZUlucHV0LkVSUk9SX0NMSUNLX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy53aXRoUGxhY2Vob2xkZXIodGhpcy5wbGFjZWhvbGRlcik7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dFwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkSW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcclxuICAgIFxyXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlBhc3N3b3JkXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkSW5wdXQuY3NzXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0ga2V5dXBMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gZW50ZXJMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2hhbmdlTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGJsdXJMaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtYW5kYXRvcnkgPSBmYWxzZSwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbW9kZWwgPSBudWxsLCBcclxuICAgICAgICBjbGlja0xpc3RlbmVyID0gbnVsbCwga2V5dXBMaXN0ZW5lciA9IG51bGwsIGVudGVyTGlzdGVuZXIgPSBudWxsLCBjaGFuZ2VMaXN0ZW5lciA9IG51bGwsIGJsdXJMaXN0ZW5lciA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoUGFzc3dvcmRJbnB1dC5DT01QT05FTlRfTkFNRSxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRJbnB1dFwiLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkRXJyb3JcIixcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIG5ldyBSZXF1aXJlZFZhbGlkYXRvcighbWFuZGF0b3J5KSxcclxuICAgICAgICAgICAgY2xpY2tMaXN0ZW5lcixcclxuICAgICAgICAgICAga2V5dXBMaXN0ZW5lcixcclxuICAgICAgICAgICAgZW50ZXJMaXN0ZW5lcixcclxuICAgICAgICAgICAgY2hhbmdlTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGJsdXJMaXN0ZW5lcik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciwgUGFzc3dvcmRWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi8uLi9jb21tb25JbnB1dFwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSBleHRlbmRzIENvbW1vbklucHV0IHtcclxuICAgIFxyXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIk5ldyBwYXNzd29yZFwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNsaWNrTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGtleXVwTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGVudGVyTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNoYW5nZUxpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBibHVyTGlzdGVuZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgbWFuZGF0b3J5ID0gZmFsc2UsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1vZGVsID0gbnVsbCwgXHJcbiAgICAgICAgY2xpY2tMaXN0ZW5lciA9IG51bGwsIGtleXVwTGlzdGVuZXIgPSBudWxsLCBlbnRlckxpc3RlbmVyID0gbnVsbCwgY2hhbmdlTGlzdGVuZXIgPSBudWxsLCBibHVyTGlzdGVuZXIgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuQ09NUE9ORU5UX05BTUUsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVFcnJvclwiLFxyXG4gICAgICAgICAgICBtb2RlbCxcclxuICAgICAgICAgICAgbmV3IFBhc3N3b3JkVmFsaWRhdG9yKG1hbmRhdG9yeSksXHJcbiAgICAgICAgICAgIGNsaWNrTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGtleXVwTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGVudGVyTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGNoYW5nZUxpc3RlbmVyLFxyXG4gICAgICAgICAgICBibHVyTGlzdGVuZXIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXF1YWxzVmFsaWRhdG9yIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uSW5wdXRcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xyXG4gICAgXHJcbiAgICBzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIjsgfVxyXG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJDb25maXJtIHBhc3N3b3JkXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNvbXBhcmVkVmFsdWVGdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0ga2V5dXBMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gZW50ZXJMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2hhbmdlTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGJsdXJMaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtYW5kYXRvcnkgPSBmYWxzZSwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbW9kZWwgPSBudWxsLCBjb21wYXJlZFZhbHVlRnVuY3Rpb24gPSBudWxsLFxyXG4gICAgICAgIGNsaWNrTGlzdGVuZXIgPSBudWxsLCBrZXl1cExpc3RlbmVyID0gbnVsbCwgZW50ZXJMaXN0ZW5lciA9IG51bGwsIGNoYW5nZUxpc3RlbmVyID0gbnVsbCwgYmx1ckxpc3RlbmVyID0gbnVsbCkge1xyXG5cclxuICAgICAgICBzdXBlcihQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuQ09NUE9ORU5UX05BTUUsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEZpZWxkXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRXJyb3JcIixcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIG5ldyBFcXVhbHNWYWxpZGF0b3IobWFuZGF0b3J5LCBmYWxzZSwgY29tcGFyZWRWYWx1ZUZ1bmN0aW9uKSxcclxuICAgICAgICAgICAgY2xpY2tMaXN0ZW5lcixcclxuICAgICAgICAgICAga2V5dXBMaXN0ZW5lcixcclxuICAgICAgICAgICAgZW50ZXJMaXN0ZW5lcixcclxuICAgICAgICAgICAgY2hhbmdlTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGJsdXJMaXN0ZW5lcik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBcclxuICAgIEFic3RyYWN0VmFsaWRhdG9yLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIEFuZFZhbGlkYXRvclNldCxcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCI7XHJcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkTWF0Y2hlcklucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0LmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnkgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXIgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udHJvbFBsYWNlaG9sZGVyIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY29tcGFyZWRWYWx1ZUZ1bmN0aW9uIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gcGFzc3dvcmRFbnRlcmVkTGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNvbnRyb2xOYW1lLCBtYW5kYXRvcnkgPSBmYWxzZSwgXHJcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBcclxuICAgICAgICBjb250cm9sUGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX0NPTlRST0xfUExBQ0VIT0xERVIsXHJcbiAgICAgICAgbW9kZWwgPSBudWxsLFxyXG4gICAgICAgIGNvbXBhcmVkVmFsdWVGdW5jdGlvbiA9IG51bGwsXHJcbiAgICAgICAgcGFzc3dvcmRFbnRlcmVkTGlzdGVuZXIgPSBudWxsKSB7XHJcblxyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7UGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZX0gKi9cclxuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFxyXG5cdFx0XHRQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLCBbbmFtZSwgbWFuZGF0b3J5LCBwbGFjZWhvbGRlciwgbW9kZWwsIG51bGwsIG51bGwsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLnBhc3N3b3JkRW50ZXJlZCldXHJcblx0XHQpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbH0gKi9cclxuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoXHJcblx0XHRcdFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCwgW2NvbnRyb2xOYW1lLCBtYW5kYXRvcnksIGNvbnRyb2xQbGFjZWhvbGRlciwgbW9kZWwsIGNvbXBhcmVkVmFsdWVGdW5jdGlvbiwgbnVsbCwgbnVsbCwgcGFzc3dvcmRFbnRlcmVkTGlzdGVuZXJdXHJcblx0XHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiLHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmdldENvbXBvbmVudCgpKTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtBbmRWYWxpZGF0b3JTZXR9ICovXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgQW5kVmFsaWRhdG9yU2V0KClcclxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmdldFZhbGlkYXRvcigpKVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkYXRvcih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5nZXRWYWxpZGF0b3IoKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBhc3N3b3JkRW50ZXJlZCgpIHtcclxuICAgICAgICBpZih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZ2V0VmFsaWRhdG9yKCkuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7QWJzdHJhY3RWYWxpZGF0b3J9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbGlkYXRvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXMoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5mb2N1cygpOyB9XHJcbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5zZWxlY3RBbGwoKTsgfVxyXG4gICAgZW5hYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZW5hYmxlKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmVuYWJsZSgpOyB9XHJcbiAgICBkaXNhYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZGlzYWJsZSgpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5kaXNhYmxlKCk7IH1cclxuICAgIGNsZWFyKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuY2xlYXIoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY2xlYXIoKTsgfVxyXG59IiwiaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dFwiO1xyXG5pbXBvcnQgeyBQaG9uZVZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBob25lSW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGhvbmVJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQaG9uZUlucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiUGhvbmVcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bob25lSW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGhvbmVJbnB1dC5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBjbGlja0xpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBrZXl1cExpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBlbnRlckxpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBjaGFuZ2VMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gYmx1ckxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1hbmRhdG9yeSA9IGZhbHNlLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtb2RlbCA9IG51bGwsIFxyXG4gICAgICAgIGNsaWNrTGlzdGVuZXIgPSBudWxsLCBrZXl1cExpc3RlbmVyID0gbnVsbCwgZW50ZXJMaXN0ZW5lciA9IG51bGwsIGNoYW5nZUxpc3RlbmVyID0gbnVsbCwgYmx1ckxpc3RlbmVyID0gbnVsbCkge1xyXG5cclxuICAgICAgICBzdXBlcihQaG9uZUlucHV0LkNPTVBPTkVOVF9OQU1FLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgICAgICAgXCJwaG9uZUlucHV0XCIsXHJcbiAgICAgICAgICAgIFwicGhvbmVFcnJvclwiLFxyXG4gICAgICAgICAgICBtb2RlbCxcclxuICAgICAgICAgICAgbmV3IFBob25lVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXHJcbiAgICAgICAgICAgIGNsaWNrTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGtleXVwTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGVudGVyTGlzdGVuZXIsXHJcbiAgICAgICAgICAgIGNoYW5nZUxpc3RlbmVyLFxyXG4gICAgICAgICAgICBibHVyTGlzdGVuZXIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dFwiO1xyXG5pbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRleHRJbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XHJcblxyXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiVGV4dElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiVGV4dFwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdGV4dElucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RleHRJbnB1dC5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBjbGlja0xpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBrZXl1cExpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBlbnRlckxpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBjaGFuZ2VMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gYmx1ckxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1hbmRhdG9yeSA9IGZhbHNlLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtb2RlbCA9IG51bGwsIFxyXG4gICAgICAgIGNsaWNrTGlzdGVuZXIgPSBudWxsLCBrZXl1cExpc3RlbmVyID0gbnVsbCwgZW50ZXJMaXN0ZW5lciA9IG51bGwsIGNoYW5nZUxpc3RlbmVyID0gbnVsbCwgYmx1ckxpc3RlbmVyID0gbnVsbCkge1xyXG5cclxuICAgICAgICBzdXBlcihUZXh0SW5wdXQuQ09NUE9ORU5UX05BTUUsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICBcInRleHRJbnB1dFwiLFxyXG4gICAgICAgICAgICBcInRleHRFcnJvclwiLFxyXG4gICAgICAgICAgICBtb2RlbCxcclxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCFtYW5kYXRvcnkpLFxyXG4gICAgICAgICAgICBjbGlja0xpc3RlbmVyLFxyXG4gICAgICAgICAgICBrZXl1cExpc3RlbmVyLFxyXG4gICAgICAgICAgICBlbnRlckxpc3RlbmVyLFxyXG4gICAgICAgICAgICBjaGFuZ2VMaXN0ZW5lcixcclxuICAgICAgICAgICAgYmx1ckxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXNcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJ1dHRvblwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWJtaXQge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJTdWJtaXRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc3VibWl0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3N1Ym1pdC5jc3NcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9QUklNQVJZKCkgeyByZXR1cm4gXCJidG4tcHJpbWFyeVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfU0VDT05EQVJZKCkgeyByZXR1cm4gXCJidG4tc2Vjb25kYXJ5XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJidG4tc3VjY2Vzc1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpIHsgcmV0dXJuIFwiYnRuLWluZm9cIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1dBUk5JTkcoKSB7IHJldHVybiBcImJ0bi13YXJuaW5nXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9EQU5HRVIoKSB7IHJldHVybiBcImJ0bi1kYW5nZXJcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0xJR0hUKCkgeyByZXR1cm4gXCJidG4tbGlnaHRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0RBUksoKSB7IHJldHVybiBcImJ0bi1kYXJrXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvblR5cGUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBidXR0b25UeXBlID0gQnV0dG9uLlRZUEVfUFJJTUFSWSkge1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5idXR0b25UeXBlID0gYnV0dG9uVHlwZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEV2ZW50UmVnaXN0cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiU3VibWl0XCIpO1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTdWJtaXQuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInN1Ym1pdFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInZhbHVlXCIsIHRoaXMubGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInN1Ym1pdFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsXCJidG4gXCIgKyB0aGlzLmJ1dHRvblR5cGUpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihjbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJzdWJtaXRcIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6c3VibWl0Q2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpzdWJtaXRDbGlja2VkXCIsIGNsaWNrTGlzdGVuZXIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJzdWJtaXRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJzdWJtaXRcIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOlsiTG9nZ2VyIiwiSW5qZWN0aW9uUG9pbnQiLCJFdmVudFJlZ2lzdHJ5IiwiQ29tcG9uZW50RmFjdG9yeSIsIkNhbnZhc1N0eWxlcyIsIkNhbnZhc1Jvb3QiLCJMT0ciLCJPYmplY3RGdW5jdGlvbiIsIkJ1dHRvbiIsIlN0eWxlc1JlZ2lzdHJ5IiwiSW5wdXRFbGVtZW50RGF0YUJpbmRpbmciLCJFbWFpbFZhbGlkYXRvciIsIlJlcXVpcmVkVmFsaWRhdG9yIiwiUGFzc3dvcmRWYWxpZGF0b3IiLCJFcXVhbHNWYWxpZGF0b3IiLCJBbmRWYWxpZGF0b3JTZXQiLCJQaG9uZUlucHV0IiwiUGhvbmVWYWxpZGF0b3IiLCJUZXh0SW5wdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBV0EsTUFBTSxHQUFHLEdBQUcsSUFBSUEsa0JBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFcEMs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
