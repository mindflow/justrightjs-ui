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
    constructor(label, buttonType = Button$1.TYPE_PRIMARY) {

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
        this.component = this.componentFactory.create("Button");
        justright_core_v1.CanvasStyles.enableStyle(Button$1.COMPONENT_NAME);
        this.component.get("button").setChild(this.label);
        this.component.get("button").setAttributeValue("class","btn " + this.buttonType);
    }

	getComponent(){
		return this.component;
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    withClickListener(clickListener) {
        this.eventRegistry.attach(this.component.get("button"), "onclick", "//event:buttonClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:buttonClicked", clickListener, this.component.getComponentIndex());
        return this;
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
     */
    constructor(name) {
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {string} */
        this.name = name;
    }

    postConfig() {
        this.component = this.componentFactory.create(CheckBox.COMPONENT_NAME);
        justright_core_v1.CanvasStyles.enableStyle(CheckBox.COMPONENT_NAME);
        this.component.get("checkBox").setAttributeValue("name",this.name);
    }

	getComponent(){
		return this.component;
    }

    withModel(model, validator) {
        justright_core_v1.InputElementDataBinding.link(model, validator).to(this.component.get("checkBox"));
        return this;
    }

    withClickListener(listener) {
        this.eventRegistry.attach(this.component.get("checkBox"), "onclick", "//event:checkBoxClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:checkBoxClicked", listener,this.component.getComponentIndex());
        return this;
    }

    withEnterListener(listener) {
        this.eventRegistry.attach(this.component.get("checkBox"), "onkeyup", "//event:checkBoxEnter", this.component.getComponentIndex());
        let enterCheck = new coreutil_v1.ObjectFunction(this,(event) => { if(event.getKeyCode() === 13) { listener.call(); } });
        this.eventRegistry.listen("//event:checkBoxEnter", enterCheck, this.component.getComponentIndex());
        return this;
    }

}

const LOG$5 = new coreutil_v1.Logger("EmailInput");

class EmailInput {

	static get COMPONENT_NAME() { return "EmailInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }

    static get BLUR_EVENT() { return "//event:emailInputBlur"; }
    static get KEYUP_EVENT() { return "//event:emailInputKeyUp"; }
    static get CHANGE_EVENT() { return "//event:emailInputChange"; }
    static get ERROR_CLICK_EVENT() { return "//event:emailErrorClicked"; }
    
    static get DEFAULT_PLACEHOLDER() { return "Email"; }
    
    static get INPUT_ELEMENT_ID() { return "emailInput"; }
    static get ERROR_ELEMENT_ID() { return "emailError"; }

    /**
     * 
     * @param {string} name 
     */
    constructor(name, mandatory = false, placeholder = EmailInput.DEFAULT_PLACEHOLDER) {

        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {String} */
        this.name = name;

        /** @type {EmailValidator} */
        this.validator = new justright_core_v1.EmailValidator(mandatory)
            .withValidListener(new coreutil_v1.ObjectFunction(this, this.hideValidationError));

        /** @type {Boolean} */
        this.changed = false;

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.placeholder = placeholder;
    }

    postConfig() {
        
        this.component = this.componentFactory.create(EmailInput.COMPONENT_NAME);

        justright_core_v1.CanvasStyles.enableStyle(EmailInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(EmailInput.INPUT_ELEMENT_ID);
        const error = this.component.get(EmailInput.ERROR_ELEMENT_ID);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", EmailInput.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", EmailInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", EmailInput.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", EmailInput.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(EmailInput.BLUR_EVENT, new coreutil_v1.ObjectFunction(this, this.blurred), idx);
        this.eventRegistry.listen(EmailInput.KEYUP_EVENT, new coreutil_v1.ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(EmailInput.CHANGE_EVENT, new coreutil_v1.ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(EmailInput.ERROR_CLICK_EVENT, new coreutil_v1.ObjectFunction(this, this.hideValidationError), idx);

        this.withPlaceholder(this.placeholder);
    }

	getComponent(){
		return this.component;
    }

    change(event) {
        this.changed = true;
    }

    keyUp(event) {
        this.changed = true;
        if (event.getKeyCode() !== 13) {
            return;
        }
        if (!this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
            return;
        }
        if (this.enterListener) {
            this.enterListener.call();
        }
    }

    /**
     * @returns {AbstractValidator}
     */
    getValidator() {
        return this.validator;
    }

    withModel(model) {
        justright_core_v1.InputElementDataBinding
            .link(model, this.validator)
            .to(this.component.get(EmailInput.INPUT_ELEMENT_ID));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get(EmailInput.INPUT_ELEMENT_ID).setAttributeValue("placeholder",placeholderValue);
        return this;
    }

    withEnterListener(listener) {
        this.enterListener = listener;
        return this;
    }

    blurred(event) {
        if (!this.changed) {
            return;
        }
        if (!this.validator.isValid()) {
            this.showValidationError();
            return;
        }
        this.hideValidationError();
    }

    showValidationError() { this.component.get(EmailInput.ERROR_ELEMENT_ID).setStyle("display","block"); }
    hideValidationError() { this.component.get(EmailInput.ERROR_ELEMENT_ID).setStyle("display","none"); }
    focus() { this.component.get(EmailInput.INPUT_ELEMENT_ID).focus(); }
    selectAll() { this.component.get(EmailInput.INPUT_ELEMENT_ID).selectAll(); }
    enable() { this.component.get(EmailInput.INPUT_ELEMENT_ID).enable(); }
    disable() { this.component.get(EmailInput.INPUT_ELEMENT_ID).disable(); }
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

class PasswordInput {

	static get COMPONENT_NAME() { return "PasswordInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

    static get BLUR_EVENT() { return "//event:passwordInputBlur"; }
    static get KEYUP_EVENT() { return "//event:passwordInputKeyUp"; }
    static get CHANGE_EVENT() { return "//event:passwordInputChange"; }
    static get ERROR_CLICK_EVENT() { return "//event:passwordErrorClicked"; }
    
    static get DEFAULT_PLACEHOLDER() { return "Password"; }
    
    static get INPUT_ELEMENT_ID() { return "passwordInput"; }
    static get ERROR_ELEMENT_ID() { return "passwordError"; }

    /**
     * 
     * @param {string} name 
     */
    constructor(name, mandatory = false, placeholder = PasswordInput.DEFAULT_PLACEHOLDER) {
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {String} */
        this.name = name;

        /** @type {RequiredValidator} */
        this.validator = new justright_core_v1.RequiredValidator(mandatory)
            .withValidListener(new coreutil_v1.ObjectFunction(this, this.hideValidationError));

        /** @type {Boolean} */
        this.changed = false;

        /** @type {String} */
        this.placeholder = placeholder;
    }

    postConfig() {
        this.component = this.componentFactory.create(PasswordInput.COMPONENT_NAME);

        justright_core_v1.CanvasStyles.enableStyle(PasswordInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(PasswordInput.INPUT_ELEMENT_ID);
        const error = this.component.get(PasswordInput.ERROR_ELEMENT_ID);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", PasswordInput.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", PasswordInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", PasswordInput.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", PasswordInput.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(PasswordInput.BLUR_EVENT, new coreutil_v1.ObjectFunction(this, this.passwordInputBlurred), idx);
        this.eventRegistry.listen(PasswordInput.KEYUP_EVENT, new coreutil_v1.ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(PasswordInput.CHANGE_EVENT, new coreutil_v1.ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(PasswordInput.ERROR_CLICK_EVENT, new coreutil_v1.ObjectFunction(this, this.hideValidationError), idx);

        this.withPlaceholder(this.placeholder);
    }

	getComponent(){
		return this.component;
    }

    change() {
        this.changed = true;
    }

    keyUp(event) {
        this.changed = true;
        if (event.getKeyCode() !== 13) {
            return;
        }
        if (!this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
            return;
        }
        if (this.enterListener) {
            this.enterListener.call();
        }
    }

    /**
     * @returns {AbstractValidator}
     */
    getValidator() {
        return this.validator;
    }

    withModel(model) {
        justright_core_v1.InputElementDataBinding
            .link(model, this.validator)
            .to(this.component.get(PasswordInput.INPUT_ELEMENT_ID));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get(PasswordInput.INPUT_ELEMENT_ID).setAttributeValue("placeholder",placeholderValue);
        return this;
    }

    withEnterListener(listener) {
        this.enterListener = listener;
        return this;
    }

    passwordInputBlurred() {
        if (!this.changed) {
            return;
        }
        if (!this.validator.isValid()) {
            this.showValidationError();
            return;
        }
        this.hideValidationError();
        
    }

    showValidationError() { this.component.get(PasswordInput.ERROR_ELEMENT_ID).setStyle("display","block"); }
    hideValidationError() { this.component.get(PasswordInput.ERROR_ELEMENT_ID).setStyle("display","none"); }
    focus() { this.component.get(PasswordInput.INPUT_ELEMENT_ID).focus(); }
    selectAll() { this.component.get(PasswordInput.INPUT_ELEMENT_ID).selectAll(); }
    enable() { this.component.get(PasswordInput.INPUT_ELEMENT_ID).enable(); }
    disable() { this.component.get(PasswordInput.INPUT_ELEMENT_ID).disable(); }
}

const LOG$7 = new coreutil_v1.Logger("PasswordMatcherInput");

class PasswordMatcherInput {

	static get COMPONENT_NAME() { return "PasswordMatcherInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.css"; }

    static get BLUR_EVENT() { return "//event:passwordMatcherInputBlur"; }
    static get KEYUP_EVENT() { return "//event:passwordMatcherInputKeyUp"; }
    static get CHANGE_EVENT() { return "//event:passwordMatcherInputChange"; }
    static get ERROR_CLICK_EVENT() { return "//event:passwordMatcherErrorClicked"; }
    
    static get CONTROL_BLUR_EVENT() { return "//event:passwordMatcherControlInputBlur"; }
    static get CONTROL_KEYUP_EVENT() { return "//event:passwordMatcherControlInputKeyUp"; }
    static get CONTROL_CHANGE_EVENT() { return "//event:passwordMatcherControlInputChange"; }
    static get CONTROL_ERROR_CLICK_EVENT() { return "//event:passwordMatcherControlErrorClicked"; }
    
    static get DEFAULT_PLACEHOLDER() { return "Password"; }
    static get DEFAULT_CONTROL_PLACEHOLDER() { return "Confirm password"; }
    
    static get INPUT_ELEMENT_ID() { return "passwordMatcherInput"; }
    static get CONTROL_INPUT_ELEMENT_ID() { return "passwordMatcherControlInput"; }
    static get ERROR_ELEMENT_ID() { return "passwordMatcherError"; }
    static get CONTROL_ERROR_ELEMENT_ID() { return "passwordMatcherControlError"; }

    /**
     * 
     * @param {string} name 
     */
    constructor(name, mandatory = false, placeholder = PasswordMatcherInput.DEFAULT_PLACEHOLDER, controlPlaceholder = PasswordMatcherInput.DEFAULT_CONTROL_PLACEHOLDER) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {String} */
        this.name = name;

        /** @type {PasswordValidator} */
        this.passwordValidator = new justright_core_v1.PasswordValidator(mandatory)
            .withValidListener(new coreutil_v1.ObjectFunction(this, this.hidePasswordValidationError));

        /** @type {EqualsValidator} */
        this.controlValidator = new justright_core_v1.EqualsValidator(mandatory)
            .withValidListener(new coreutil_v1.ObjectFunction(this, this.hideControlValidationError));

        /** @type {AndValidatorSet} */
        this.validator = new justright_core_v1.AndValidatorSet()
            .withValidator(this.passwordValidator)
            .withValidator(this.controlValidator);

        /** @type {Boolean} */
        this.changed = false;

        /** @type {Boolean} */
        this.controlChanged = false;

        /** @type {String} */
        this.placeholder = placeholder;

        /** @type {String} */
        this.controlPlaceholder = controlPlaceholder;
    }

    postConfig() {
        this.component = this.componentFactory.create(PasswordMatcherInput.COMPONENT_NAME);

        justright_core_v1.CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();

        const input = this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID);
        const error = this.component.get(PasswordMatcherInput.ERROR_ELEMENT_ID);

        const controlInput = this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID);
        const controlError = this.component.get(PasswordMatcherInput.CONTROL_ERROR_ELEMENT_ID);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", PasswordMatcherInput.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", PasswordMatcherInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", PasswordMatcherInput.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", PasswordMatcherInput.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.attach(controlInput, "onblur", PasswordMatcherInput.CONTROL_BLUR_EVENT, idx);
        this.eventRegistry.attach(controlInput, "onkeyup", PasswordMatcherInput.CONTROL_KEYUP_EVENT, idx);
        this.eventRegistry.attach(controlInput, "onchange", PasswordMatcherInput.CONTROL_CHANGE_EVENT, idx);
        this.eventRegistry.attach(controlError, "onclick", PasswordMatcherInput.CONTROL_ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(PasswordMatcherInput.BLUR_EVENT, new coreutil_v1.ObjectFunction(this, this.blur), idx);
        this.eventRegistry.listen(PasswordMatcherInput.KEYUP_EVENT, new coreutil_v1.ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(PasswordMatcherInput.CHANGE_EVENT, new coreutil_v1.ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(PasswordMatcherInput.ERROR_CLICK_EVENT, new coreutil_v1.ObjectFunction(this, this.hidePasswordValidationError), idx);

        this.eventRegistry.listen(PasswordMatcherInput.CONTROL_BLUR_EVENT, new coreutil_v1.ObjectFunction(this, this.controlBlur), idx);
        this.eventRegistry.listen(PasswordMatcherInput.CONTROL_KEYUP_EVENT, new coreutil_v1.ObjectFunction(this, this.controlKeyUp), idx);
        this.eventRegistry.listen(PasswordMatcherInput.CONTROL_CHANGE_EVENT, new coreutil_v1.ObjectFunction(this, this.controlChange), idx);
        this.eventRegistry.listen(PasswordMatcherInput.CONTROL_ERROR_CLICK_EVENT, new coreutil_v1.ObjectFunction(this, this.hideControlValidationError), idx);

        this.withPlaceholder(this.placeholder, this.controlPlaceholder);
    }

    controlChange() {
        this.changed = true;
    }

    controlKeyUp(event) {
        if(this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).getValue() !== "") {
            this.controlChanged = true;
        }
        if (event.getKeyCode() !== 13) {
            return;
        }
        if (!this.controlValidator.isValid()) {
            this.showControlValidationError();
            this.selectAllControl();
            return;
        }
        if (this.enterListener) {
            this.enterListener.call();
        }
    }

    change() {
        if(this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).getValue() !== this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).getValue()) {
            this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).setValue("");
        }
        this.changed = true;
    }

    keyUp(event) {
        if(this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).getValue() !== "") {
            this.changed = true;
        }
        this.controlValidator.setValue(this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).getValue());
        this.controlValidator.validate(this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).getValue());
        if (event.getKeyCode() !== 13) {
            return;
        }
        if (!this.passwordValidator.isValid()) {
            this.showPasswordValidationError();
            this.selectAll();
            return;
        }
        this.focusControl();
        this.selectAllControl();
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

    withModel(model) {
        justright_core_v1.InputElementDataBinding
            .link(model, this.passwordValidator)
            .to(this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID));
        
        justright_core_v1.InputElementDataBinding
            .link(model, this.controlValidator)
            .to(this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID));
        return this;
    }

    withPlaceholder(placeholderValue, controlPlaceHolderValue) {
        this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).setAttributeValue("placeholder",placeholderValue);
        this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).setAttributeValue("placeholder",controlPlaceHolderValue);
        return this;
    }

    withEnterListener(listener) {
        this.enterListener = listener;
        return this;
    }

    controlBlur() {
        if (!this.controlChanged) {
            return;
        }
        if (!this.controlValidator.isValid()) {
            this.showControlValidationError();
            return;
        }
        this.hideControlValidationError();
    }

    blur() {
        if (!this.changed) {
            return;
        }
        if (!this.passwordValidator.isValid()) {
            this.showPasswordValidationError();
            return;
        }
        this.hidePasswordValidationError();
    }

    showPasswordValidationError() { this.component.get(PasswordMatcherInput.ERROR_ELEMENT_ID).setStyle("display","block"); }
    hidePasswordValidationError() { this.component.get(PasswordMatcherInput.ERROR_ELEMENT_ID).setStyle("display","none"); }
    showControlValidationError() { this.component.get(PasswordMatcherInput.CONTROL_ERROR_ELEMENT_ID).setStyle("display","block"); }
    hideControlValidationError() { this.component.get(PasswordMatcherInput.CONTROL_ERROR_ELEMENT_ID).setStyle("display","none"); }
    focus() { this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).focus(); }
    focusControl() { this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).focus(); }
    selectAll() { this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).selectAll(); }
    selectAllControl() { this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).selectAll(); }
    enable() { this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).enable(); this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).enable(); }
    disable() { this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).disable(); this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).disable(); }
    enableControl() { this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).enable(); }
    disableControl() { this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).disable(); }
}

const LOG$8 = new coreutil_v1.Logger("PhoneInput");

class PhoneInput$1 {

	static get COMPONENT_NAME() { return "PhoneInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/phoneInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/phoneInput.css"; }

    static get BLUR_EVENT() { return "//event:phoneInputBlur"; }
    static get KEYUP_EVENT() { return "//event:phoneInputKeyUp"; }
    static get CHANGE_EVENT() { return "//event:phoneInputChange"; }
    static get ERROR_CLICK_EVENT() { return "//event:phoneErrorClicked"; }
    
    static get DEFAULT_PLACEHOLDER() { return "Phone"; }
    
    static get INPUT_ELEMENT_ID() { return "phoneInput"; }
    static get ERROR_ELEMENT_ID() { return "phoneError"; }

    /**
     * 
     * @param {string} name 
     */
    constructor(name, mandatory = false, placeholder = PhoneInput$1.DEFAULT_PLACEHOLDER) {
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {String} */
        this.name = name;

        /** @type {PhoneValidator} */
        this.validator = new justright_core_v1.PhoneValidator(mandatory)
            .withValidListener(new coreutil_v1.ObjectFunction(this, this.hideValidationError));

        /** @type {Boolean} */
        this.changed = false;

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.placeholder = placeholder;
    }

    postConfig() {
        
        this.component = this.componentFactory.create(PhoneInput$1.COMPONENT_NAME);

        justright_core_v1.CanvasStyles.enableStyle(PhoneInput$1.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(PhoneInput$1.INPUT_ELEMENT_ID);
        const error = this.component.get(PhoneInput$1.ERROR_ELEMENT_ID);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", PhoneInput$1.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", PhoneInput$1.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", PhoneInput$1.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", PhoneInput$1.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(PhoneInput$1.BLUR_EVENT, new coreutil_v1.ObjectFunction(this, this.blurred), idx);
        this.eventRegistry.listen(PhoneInput$1.KEYUP_EVENT, new coreutil_v1.ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(PhoneInput$1.CHANGE_EVENT, new coreutil_v1.ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(PhoneInput$1.ERROR_CLICK_EVENT, new coreutil_v1.ObjectFunction(this, this.hideValidationError), idx);

        this.withPlaceholder(this.placeholder);
    }

	getComponent(){
		return this.component;
    }

    change() {
        this.changed = true;
    }

    keyUp(event) {
        this.changed = true;
        if (event.getKeyCode() !== 13) {
            return;
        }
        if (!this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
            return;
        }
        if (this.enterListener) {
            this.enterListener.call();
        }
    }

    /**
     * @returns {AbstractValidator}
     */
    getValidator() {
        return this.validator;
    }

    withModel(model) {
        justright_core_v1.InputElementDataBinding
            .link(model, this.validator)
            .to(this.component.get(PhoneInput$1.INPUT_ELEMENT_ID));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get(PhoneInput$1.INPUT_ELEMENT_ID).setAttributeValue("placeholder",placeholderValue);
        return this;
    }

    withEnterListener(listener) {
        this.enterListener = listener;
        return this;
    }

    blurred() {
        if (!this.changed) {
            return;
        }
        if (!this.validator.isValid()) {
            this.showValidationError();
            return;
        }
        this.hideValidationError();
    }

    showValidationError() { this.component.get(PhoneInput$1.ERROR_ELEMENT_ID).setStyle("display","block"); }
    hideValidationError() { this.component.get(PhoneInput$1.ERROR_ELEMENT_ID).setStyle("display","none"); }
    focus() { this.component.get(PhoneInput$1.INPUT_ELEMENT_ID).focus(); }
    selectAll() { this.component.get(PhoneInput$1.INPUT_ELEMENT_ID).selectAll(); }
    enable() { this.component.get(PhoneInput$1.INPUT_ELEMENT_ID).enable(); }
    disable() { this.component.get(PhoneInput$1.INPUT_ELEMENT_ID).disable(); }
}

const LOG$9 = new coreutil_v1.Logger("TextInput");

class TextInput {

	static get COMPONENT_NAME() { return "TextInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }

    static get KEYUP_EVENT() { return "//event:textInputKeyUp"; }
    static get CLICK_EVENT() { return "//event:textInputClicked"; }

    static get DEFAULT_PLACEHOLDER() { return "Text"; }

    static get INPUT_ELEMENT_ID() { return "textInput"; }
    static get ERROR_ELEMENT_ID() { return "textError"; }

    /**
     * 
     * @param {string} name
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER) {
        /** @type {ComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(justright_core_v1.ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = mindi_v1.InjectionPoint.instance(justright_core_v1.EventRegistry);

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.placeholder = placeholder;

        /** @type {Boolean} */
        this.mandatory = mandatory;

    }

    keyUp(event) {
        if(event.getKeyCode() !== 13) {
            return;
        }
        if(this.enterListener) {
            this.enterListener.call();
        }
    }

    click(event) {
        if(this.clickListener) {
            this.clickListener.call();
        }
    }

    postConfig() {
        this.component = this.componentFactory.create(TextInput.COMPONENT_NAME);

        justright_core_v1.CanvasStyles.enableStyle(TextInput.COMPONENT_NAME);
        
        this.component.get(TextInput.INPUT_ELEMENT_ID).setAttributeValue("name", this.name);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(TextInput.INPUT_ELEMENT_ID);

        this.eventRegistry.attach(input, "onkeyup", TextInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onclick", TextInput.CLICK_EVENT, idx);

        this.eventRegistry.listen(TextInput.KEYUP_EVENT, new coreutil_v1.ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(TextInput.CLICK_EVENT, new coreutil_v1.ObjectFunction(this, this.click), idx);

        this.withPlaceholder(this.placeholder);
    }

	getComponent(){
		return this.component;
    }

    withModel(model, validator) {
        justright_core_v1.InputElementDataBinding.link(model, validator).to(this.component.get(TextInput.INPUT_ELEMENT_ID));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get(TextInput.INPUT_ELEMENT_ID).setAttributeValue("placeholder", placeholderValue);
        return this;
    }

    withClickListener(listener) {
        this.clickListener = listener;
        return this;
    }

    withEnterListener(listener) {
        this.enterListener = listener;
        return this;
    }

    showValidationError() { this.component.get(TextInput.ERROR_ELEMENT_ID).setStyle("display","block"); }
    hideValidationError() { this.component.get(TextInput.ERROR_ELEMENT_ID).setStyle("display","none"); }
    focus() { this.component.get(TextInput.INPUT_ELEMENT_ID).focus(); }
    selectAll() { this.component.get(TextInput.INPUT_ELEMENT_ID).selectAll(); }
    enable() { this.component.get(TextInput.INPUT_ELEMENT_ID).enable(); }
    disable() { this.component.get(TextInput.INPUT_ELEMENT_ID).disable(); }

}

const LOG$a = new coreutil_v1.Logger("Button");

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
exports.DialogBox = DialogBox;
exports.EmailInput = EmailInput;
exports.InputWrapper = InputWrapper;
exports.PasswordInput = PasswordInput;
exports.PasswordMatcherInput = PasswordMatcherInput;
exports.PhoneInput = PhoneInput$1;
exports.Submit = Submit;
exports.TextInput = TextInput;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrU2hhZGUvYmFja1NoYWRlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTWVzc2FnZS9iYW5uZXJNZXNzYWdlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYnV0dG9uL2J1dHRvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9jaGVja0JveC9jaGVja0JveC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2VtYWlsSW5wdXQvZW1haWxJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2lucHV0V3JhcHBlci5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkSW5wdXQvcGFzc3dvcmRJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGhvbmVJbnB1dC9waG9uZUlucHV0LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvdGV4dElucHV0L3RleHRJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L3N1Ym1pdC9zdWJtaXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgQ2FudmFzUm9vdCxcclxuICAgIEJhc2VFbGVtZW50XHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlIHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFja1NoYWRlXCI7IH1cclxuXHRzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYWNrU2hhZGUuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcblx0XHQvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtCYXNlRWxlbWVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XHJcblx0fVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgTE9HLmluZm8oXCJQb3N0IGNvbmZpZ1wiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCYWNrU2hhZGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QmFzZUVsZW1lbnR9IGNvbnRhaW5lciBcclxuICAgICAqL1xyXG4gICAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxyXG4gICAgICovXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNsaWNrZWRMaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIoY2xpY2tlZExpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YmFja1NoYWRlQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpiYWNrU2hhZGVDbGlja2VkXCIsIGNsaWNrZWRMaXN0ZW5lciwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUFmdGVyKG1pbGxpU2Vjb25kcykge1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgfSwgbWlsbGlTZWNvbmRzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShCYWNrU2hhZGUuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIH0sIG1pbGxpU2Vjb25kcyArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQWZ0ZXIoNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGUgc2hvd1wiKSBcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdW50U2VsZigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0Um9vdEVsZW1lbnQoKS5pc01vdW50ZWQoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYWRkQ2hpbGQodGhpcy5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzUm9vdC5wcmVwZW5kQm9keUVsZW1lbnQodGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxmKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlc1xyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFubmVyTWVzc2FnZVwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYW5uZXJNZXNzYWdlIHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFubmVyTWVzc2FnZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJNZXNzYWdlLmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2Jhbm5lck1lc3NhZ2UuY3NzXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfQUxFUlQoKSB7IHJldHVybiBcImJhbm5lci1tZXNzYWdlLWFsZXJ0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJiYW5uZXItbWVzc2FnZS1pbmZvXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJiYW5uZXItbWVzc2FnZS1zdWNjZXNzXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgeyByZXR1cm4gXCJiYW5uZXItbWVzc2FnZS13YXJuaW5nXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmFubmVyVHlwZSBcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xvc2VhYmxlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBiYW5uZXJUeXBlID0gQmFubmVyTWVzc2FnZS5UWVBFX1BSSU1BUlksIGNsb3NlYWJsZSA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cclxuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmJhbm5lclR5cGUgPSBiYW5uZXJUeXBlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXHJcbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG51bGw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0RnVuY3Rpb259ICovXHJcbiAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lciA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCYW5uZXJNZXNzYWdlXCIpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQoXCJBbGVydFwiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYmFubmVyLW1lc3NhZ2UgZmFkZSBcIiArIHRoaXMuYmFubmVyVHlwZSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25DbGlja2VkXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLHRoaXMuaGlkZSksIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZU1lc3NhZ2VcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IG9uSGlkZUxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBvbkhpZGUob25IaWRlTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyID0gb25IaWRlTGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IG9uU2hvd0xpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBvblNob3cob25TaG93TGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gb25TaG93TGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJiYW5uZXItbWVzc2FnZSBoaWRlIFwiICsgdGhpcy5iYW5uZXJUeXBlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgfSw1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhbm5lck1lc3NhZ2UuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIH0sNTAxKTtcclxuICAgICAgICBpZih0aGlzLm9uSGlkZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIuY2FsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYW5uZXJNZXNzYWdlLkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIgLCBcImJhbm5lci1tZXNzYWdlIHNob3cgXCIgICsgdGhpcy5iYW5uZXJUeXBlKSA7XHJcbiAgICAgICAgfSwxMDApO1xyXG4gICAgICAgIGlmKHRoaXMub25TaG93TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lci5jYWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlc1xyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQnV0dG9uXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJ1dHRvblwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9idXR0b24uaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYnV0dG9uLmNzc1wiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBUWVBFX1BSSU1BUlkoKSB7IHJldHVybiBcImJ0bi1wcmltYXJ5XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TRUNPTkRBUlkoKSB7IHJldHVybiBcImJ0bi1zZWNvbmRhcnlcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSB7IHJldHVybiBcImJ0bi1zdWNjZXNzXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJidG4taW5mb1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwiYnRuLXdhcm5pbmdcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0RBTkdFUigpIHsgcmV0dXJuIFwiYnRuLWRhbmdlclwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfTElHSFQoKSB7IHJldHVybiBcImJ0bi1saWdodFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFSSygpIHsgcmV0dXJuIFwiYnRuLWRhcmtcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uVHlwZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGJ1dHRvblR5cGUgPSBCdXR0b24uVFlQRV9QUklNQVJZKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmJ1dHRvblR5cGUgPSBidXR0b25UeXBlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCdXR0b25cIik7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJ1dHRvbi5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKHRoaXMubGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsXCJidG4gXCIgKyB0aGlzLmJ1dHRvblR5cGUpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihjbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YnV0dG9uQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpidXR0b25DbGlja2VkXCIsIGNsaWNrTGlzdGVuZXIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJidXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXMsXHJcbiAgICBTdHlsZXNSZWdpc3RyeSxcclxuICAgIENhbnZhc1Jvb3QsXHJcbiAgICBCYXNlRWxlbWVudFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcbmltcG9ydCB7IEJhY2tTaGFkZSB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlLmpzXCI7XHJcblxyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRpYWxvZ0JveFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dCb3gge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJEaWFsb2dCb3hcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZGlhbG9nQm94Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2RpYWxvZ0JveC5jc3NcIjsgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuXHRcdC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuXHRcdHRoaXMuZXZlbnRSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEV2ZW50UmVnaXN0cnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG5cclxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcclxuICAgICAgICBcclxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZX0gKi9cclxuICAgICAgICB0aGlzLmJhY2tTaGFkZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEJhY2tTaGFkZSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7U3R5bGVzUmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5zdHlsZXNSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFN0eWxlc1JlZ2lzdHJ5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtCYXNlRWxlbWVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgTE9HLmluZm8oXCJQb3N0IGNvbmZpZ1wiKVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkRpYWxvZ0JveFwiKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImNsb3NlQnV0dG9uXCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmNsb3NlQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpjbG9zZUNsaWNrZWRcIiwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZSksdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSB0aGlzLmJhY2tTaGFkZVxyXG4gICAgICAgICAgICAud2l0aENsaWNrTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VFbGVtZW50fSBjb250YWluZXIgXHJcbiAgICAgKi9cclxuICAgIHNldENvbnRhaW5lcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmJhY2tTaGFkZS5zZXRDb250YWluZXIodGhpcy5jb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cclxuICAgICAqL1xyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBcclxuICAgICAqL1xyXG4gICAgc2V0VGl0bGUodGV4dCl7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5zZXRDaGlsZChcInRpdGxlXCIsIHRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxyXG4gICAgICovXHJcbiAgICBzZXRGb290ZXIoY29tcG9uZW50KXtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImZvb3RlclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLnNldENoaWxkKFwiZm9vdGVyXCIsIGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXHJcbiAgICAgKi9cclxuICAgIHNldENvbnRlbnQoY29tcG9uZW50KXtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLnNldENoaWxkKFwiY29udGVudFwiLGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG5cdHNldChrZXksdmFsKSB7XHJcblx0XHR0aGlzLmdldENvbXBvbmVudCgpLnNldChrZXksdmFsKTtcclxuXHR9XHJcbiAgICBcclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUubW91bnRTZWxmKCk7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJkaWFsb2dCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJkaWFsb2dib3ggZmFkZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZGlhbG9nQm94XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5iYWNrU2hhZGUuZGlzYWJsZUFmdGVyKDUwMCk7XHJcbiAgICAgICAgfSwyMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKERpYWxvZ0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgfSwyMDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERpYWxvZ0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUubW91bnRTZWxmKCk7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuXHJcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUuZW5hYmxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZGlhbG9nQm94XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIgLCBcImRpYWxvZ2JveCBmYWRlIHNob3dcIikgO1xyXG4gICAgICAgIH0sMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhpcyBjb21wb25lbnQgaW4gdGhlIGNvbnRhaW5lciBhdCB0aGUgcHJvdmlkZWQgaWRcclxuICAgICAqL1xyXG4gICAgbW91bnRTZWxmKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFkZENoaWxkKHRoaXMuZ2V0Q29tcG9uZW50KCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIENhbnZhc1Jvb3QucHJlcGVuZEJvZHlFbGVtZW50KHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0Um9vdEVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU2VsZigpIHtcclxuICAgICAgICBDYW52YXNTdHlsZXMucmVtb3ZlU3R5bGUoRGlhbG9nQm94LkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLnJlbW92ZVNlbGYoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nXHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJDaGVja0JveFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVja0JveCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkNoZWNrQm94XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2NoZWNrQm94Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2NoZWNrQm94LmNzc1wiOyB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShFdmVudFJlZ2lzdHJ5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShDaGVja0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKENoZWNrQm94LkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwsIHZhbGlkYXRvcikge1xyXG4gICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsobW9kZWwsIHZhbGlkYXRvcikudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhDbGlja0xpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKSwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDpjaGVja0JveENsaWNrZWRcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6Y2hlY2tCb3hDbGlja2VkXCIsIGxpc3RlbmVyLHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhFbnRlckxpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKSwgXCJvbmtleXVwXCIsIFwiLy9ldmVudDpjaGVja0JveEVudGVyXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIGxldCBlbnRlckNoZWNrID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsKGV2ZW50KSA9PiB7IGlmKGV2ZW50LmdldEtleUNvZGUoKSA9PT0gMTMpIHsgbGlzdGVuZXIuY2FsbCgpOyB9IH0pO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmNoZWNrQm94RW50ZXJcIiwgZW50ZXJDaGVjaywgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIEFic3RyYWN0VmFsaWRhdG9yLFxyXG4gICAgRW1haWxWYWxpZGF0b3IsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxyXG4gICAgQ29tcG9uZW50XHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFbWFpbElucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJFbWFpbElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2VtYWlsSW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZW1haWxJbnB1dC5jc3NcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgQkxVUl9FVkVOVCgpIHsgcmV0dXJuIFwiLy9ldmVudDplbWFpbElucHV0Qmx1clwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEtFWVVQX0VWRU5UKCkgeyByZXR1cm4gXCIvL2V2ZW50OmVtYWlsSW5wdXRLZXlVcFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IENIQU5HRV9FVkVOVCgpIHsgcmV0dXJuIFwiLy9ldmVudDplbWFpbElucHV0Q2hhbmdlXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgRVJST1JfQ0xJQ0tfRVZFTlQoKSB7IHJldHVybiBcIi8vZXZlbnQ6ZW1haWxFcnJvckNsaWNrZWRcIjsgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIkVtYWlsXCI7IH1cclxuICAgIFxyXG4gICAgc3RhdGljIGdldCBJTlBVVF9FTEVNRU5UX0lEKCkgeyByZXR1cm4gXCJlbWFpbElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgRVJST1JfRUxFTUVOVF9JRCgpIHsgcmV0dXJuIFwiZW1haWxFcnJvclwiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtYW5kYXRvcnkgPSBmYWxzZSwgcGxhY2Vob2xkZXIgPSBFbWFpbElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIpIHtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RW1haWxWYWxpZGF0b3J9ICovXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgRW1haWxWYWxpZGF0b3IobWFuZGF0b3J5KVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcikpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0Jvb2xlYW59ICovXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEVtYWlsSW5wdXQuQ09NUE9ORU5UX05BTUUpO1xyXG5cclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRW1haWxJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCk7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoRW1haWxJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKTtcclxuICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuY29tcG9uZW50LmdldChFbWFpbElucHV0LkVSUk9SX0VMRU1FTlRfSUQpO1xyXG5cclxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGlucHV0LCBcIm9uYmx1clwiLCBFbWFpbElucHV0LkJMVVJfRVZFTlQsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChpbnB1dCwgXCJvbmtleXVwXCIsIEVtYWlsSW5wdXQuS0VZVVBfRVZFTlQsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChpbnB1dCwgXCJvbmNoYW5nZVwiLCBFbWFpbElucHV0LkNIQU5HRV9FVkVOVCwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGVycm9yLCBcIm9uY2xpY2tcIiwgRW1haWxJbnB1dC5FUlJPUl9DTElDS19FVkVOVCwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihFbWFpbElucHV0LkJMVVJfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmJsdXJyZWQpLCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oRW1haWxJbnB1dC5LRVlVUF9FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMua2V5VXApLCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oRW1haWxJbnB1dC5DSEFOR0VfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmNoYW5nZSksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihFbWFpbElucHV0LkVSUk9SX0NMSUNLX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy53aXRoUGxhY2Vob2xkZXIodGhpcy5wbGFjZWhvbGRlcik7XHJcbiAgICB9XHJcblxyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAga2V5VXAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChldmVudC5nZXRLZXlDb2RlKCkgIT09IDEzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZW50ZXJMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIuY2FsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtBYnN0cmFjdFZhbGlkYXRvcn1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsaWRhdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwpIHtcclxuICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xyXG4gICAgICAgICAgICAubGluayhtb2RlbCwgdGhpcy52YWxpZGF0b3IpXHJcbiAgICAgICAgICAgIC50byh0aGlzLmNvbXBvbmVudC5nZXQoRW1haWxJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyVmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoRW1haWxJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIscGxhY2Vob2xkZXJWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBibHVycmVkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYW5nZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoRW1haWxJbnB1dC5FUlJPUl9FTEVNRU5UX0lEKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpOyB9XHJcbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoRW1haWxJbnB1dC5FUlJPUl9FTEVNRU5UX0lEKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7IH1cclxuICAgIGZvY3VzKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoRW1haWxJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5mb2N1cygpOyB9XHJcbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMuY29tcG9uZW50LmdldChFbWFpbElucHV0LklOUFVUX0VMRU1FTlRfSUQpLnNlbGVjdEFsbCgpOyB9XHJcbiAgICBlbmFibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldChFbWFpbElucHV0LklOUFVUX0VMRU1FTlRfSUQpLmVuYWJsZSgpOyB9XHJcbiAgICBkaXNhYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoRW1haWxJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5kaXNhYmxlKCk7IH1cclxufSIsImV4cG9ydCBjbGFzcyBJbnB1dFdyYXBwZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHdpcmV1cChjb21wb25lbnROYW1lLCBpbnB1dEVsZW1lbnRJZCwgZXJyb3JFbGVtZW50SWQpIHtcclxuXHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKGNvbXBvbmVudE5hbWUpO1xyXG5cclxuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KGlucHV0RWxlbWVudElkKTtcclxuICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuY29tcG9uZW50LmdldChlcnJvckVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goaW5wdXQsIFwib25ibHVyXCIsIFBob25lSW5wdXQuQkxVUl9FVkVOVCwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGlucHV0LCBcIm9ua2V5dXBcIiwgUGhvbmVJbnB1dC5LRVlVUF9FVkVOVCwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGlucHV0LCBcIm9uY2hhbmdlXCIsIFBob25lSW5wdXQuQ0hBTkdFX0VWRU5ULCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goZXJyb3IsIFwib25jbGlja1wiLCBQaG9uZUlucHV0LkVSUk9SX0NMSUNLX0VWRU5ULCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFBob25lSW5wdXQuQkxVUl9FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuYmx1cnJlZCksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQaG9uZUlucHV0LktFWVVQX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5rZXlVcCksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQaG9uZUlucHV0LkNIQU5HRV9FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuY2hhbmdlKSwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFBob25lSW5wdXQuRVJST1JfQ0xJQ0tfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLndpdGhQbGFjZWhvbGRlcih0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBcclxuICAgIEFic3RyYWN0VmFsaWRhdG9yLFxyXG4gICAgUmVxdWlyZWRWYWxpZGF0b3IsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nIFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRJbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZElucHV0IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkSW5wdXQuY3NzXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IEJMVVJfRVZFTlQoKSB7IHJldHVybiBcIi8vZXZlbnQ6cGFzc3dvcmRJbnB1dEJsdXJcIjsgfVxyXG4gICAgc3RhdGljIGdldCBLRVlVUF9FVkVOVCgpIHsgcmV0dXJuIFwiLy9ldmVudDpwYXNzd29yZElucHV0S2V5VXBcIjsgfVxyXG4gICAgc3RhdGljIGdldCBDSEFOR0VfRVZFTlQoKSB7IHJldHVybiBcIi8vZXZlbnQ6cGFzc3dvcmRJbnB1dENoYW5nZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEVSUk9SX0NMSUNLX0VWRU5UKCkgeyByZXR1cm4gXCIvL2V2ZW50OnBhc3N3b3JkRXJyb3JDbGlja2VkXCI7IH1cclxuICAgIFxyXG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJQYXNzd29yZFwiOyB9XHJcbiAgICBcclxuICAgIHN0YXRpYyBnZXQgSU5QVVRfRUxFTUVOVF9JRCgpIHsgcmV0dXJuIFwicGFzc3dvcmRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEVSUk9SX0VMRU1FTlRfSUQoKSB7IHJldHVybiBcInBhc3N3b3JkRXJyb3JcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgbWFuZGF0b3J5ID0gZmFsc2UsIHBsYWNlaG9sZGVyID0gUGFzc3dvcmRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7UmVxdWlyZWRWYWxpZGF0b3J9ICovXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgUmVxdWlyZWRWYWxpZGF0b3IobWFuZGF0b3J5KVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcikpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0Jvb2xlYW59ICovXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQYXNzd29yZElucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhc3N3b3JkSW5wdXQuQ09NUE9ORU5UX05BTUUpO1xyXG5cclxuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFBhc3N3b3JkSW5wdXQuSU5QVVRfRUxFTUVOVF9JRCk7XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRJbnB1dC5FUlJPUl9FTEVNRU5UX0lEKTtcclxuXHJcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChpbnB1dCwgXCJvbmJsdXJcIiwgUGFzc3dvcmRJbnB1dC5CTFVSX0VWRU5ULCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goaW5wdXQsIFwib25rZXl1cFwiLCBQYXNzd29yZElucHV0LktFWVVQX0VWRU5ULCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goaW5wdXQsIFwib25jaGFuZ2VcIiwgUGFzc3dvcmRJbnB1dC5DSEFOR0VfRVZFTlQsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChlcnJvciwgXCJvbmNsaWNrXCIsIFBhc3N3b3JkSW5wdXQuRVJST1JfQ0xJQ0tfRVZFTlQsIGlkeCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oUGFzc3dvcmRJbnB1dC5CTFVSX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5wYXNzd29yZElucHV0Qmx1cnJlZCksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQYXNzd29yZElucHV0LktFWVVQX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5rZXlVcCksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQYXNzd29yZElucHV0LkNIQU5HRV9FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuY2hhbmdlKSwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFBhc3N3b3JkSW5wdXQuRVJST1JfQ0xJQ0tfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLndpdGhQbGFjZWhvbGRlcih0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAga2V5VXAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChldmVudC5nZXRLZXlDb2RlKCkgIT09IDEzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZW50ZXJMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIuY2FsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtBYnN0cmFjdFZhbGlkYXRvcn1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsaWRhdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwpIHtcclxuICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xyXG4gICAgICAgICAgICAubGluayhtb2RlbCwgdGhpcy52YWxpZGF0b3IpXHJcbiAgICAgICAgICAgIC50byh0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyVmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIscGxhY2Vob2xkZXJWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwYXNzd29yZElucHV0Qmx1cnJlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hhbmdlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZElucHV0LkVSUk9SX0VMRU1FTlRfSUQpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7IH1cclxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZElucHV0LkVSUk9SX0VMRU1FTlRfSUQpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTsgfVxyXG4gICAgZm9jdXMoKSB7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZElucHV0LklOUFVUX0VMRU1FTlRfSUQpLmZvY3VzKCk7IH1cclxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBhc3N3b3JkSW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuc2VsZWN0QWxsKCk7IH1cclxuICAgIGVuYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBhc3N3b3JkSW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuZW5hYmxlKCk7IH1cclxuICAgIGRpc2FibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZElucHV0LklOUFVUX0VMRU1FTlRfSUQpLmRpc2FibGUoKTsgfVxyXG59IiwiaW1wb3J0IHsgXHJcbiAgICBBYnN0cmFjdFZhbGlkYXRvcixcclxuICAgIEVxdWFsc1ZhbGlkYXRvcixcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsIFxyXG4gICAgQW5kVmFsaWRhdG9yU2V0LFxyXG4gICAgUGFzc3dvcmRWYWxpZGF0b3IsXHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkTWF0Y2hlcklucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0LmNzc1wiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBCTFVSX0VWRU5UKCkgeyByZXR1cm4gXCIvL2V2ZW50OnBhc3N3b3JkTWF0Y2hlcklucHV0Qmx1clwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEtFWVVQX0VWRU5UKCkgeyByZXR1cm4gXCIvL2V2ZW50OnBhc3N3b3JkTWF0Y2hlcklucHV0S2V5VXBcIjsgfVxyXG4gICAgc3RhdGljIGdldCBDSEFOR0VfRVZFTlQoKSB7IHJldHVybiBcIi8vZXZlbnQ6cGFzc3dvcmRNYXRjaGVySW5wdXRDaGFuZ2VcIjsgfVxyXG4gICAgc3RhdGljIGdldCBFUlJPUl9DTElDS19FVkVOVCgpIHsgcmV0dXJuIFwiLy9ldmVudDpwYXNzd29yZE1hdGNoZXJFcnJvckNsaWNrZWRcIjsgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgZ2V0IENPTlRST0xfQkxVUl9FVkVOVCgpIHsgcmV0dXJuIFwiLy9ldmVudDpwYXNzd29yZE1hdGNoZXJDb250cm9sSW5wdXRCbHVyXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgQ09OVFJPTF9LRVlVUF9FVkVOVCgpIHsgcmV0dXJuIFwiLy9ldmVudDpwYXNzd29yZE1hdGNoZXJDb250cm9sSW5wdXRLZXlVcFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IENPTlRST0xfQ0hBTkdFX0VWRU5UKCkgeyByZXR1cm4gXCIvL2V2ZW50OnBhc3N3b3JkTWF0Y2hlckNvbnRyb2xJbnB1dENoYW5nZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IENPTlRST0xfRVJST1JfQ0xJQ0tfRVZFTlQoKSB7IHJldHVybiBcIi8vZXZlbnQ6cGFzc3dvcmRNYXRjaGVyQ29udHJvbEVycm9yQ2xpY2tlZFwiOyB9XHJcbiAgICBcclxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiUGFzc3dvcmRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBERUZBVUxUX0NPTlRST0xfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIkNvbmZpcm0gcGFzc3dvcmRcIjsgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgZ2V0IElOUFVUX0VMRU1FTlRfSUQoKSB7IHJldHVybiBcInBhc3N3b3JkTWF0Y2hlcklucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgQ09OVFJPTF9JTlBVVF9FTEVNRU5UX0lEKCkgeyByZXR1cm4gXCJwYXNzd29yZE1hdGNoZXJDb250cm9sSW5wdXRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBFUlJPUl9FTEVNRU5UX0lEKCkgeyByZXR1cm4gXCJwYXNzd29yZE1hdGNoZXJFcnJvclwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IENPTlRST0xfRVJST1JfRUxFTUVOVF9JRCgpIHsgcmV0dXJuIFwicGFzc3dvcmRNYXRjaGVyQ29udHJvbEVycm9yXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1hbmRhdG9yeSA9IGZhbHNlLCBwbGFjZWhvbGRlciA9IFBhc3N3b3JkTWF0Y2hlcklucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIGNvbnRyb2xQbGFjZWhvbGRlciA9IFBhc3N3b3JkTWF0Y2hlcklucHV0LkRFRkFVTFRfQ09OVFJPTF9QTEFDRUhPTERFUikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEV2ZW50UmVnaXN0cnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkVmFsaWRhdG9yfSAqL1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmRWYWxpZGF0b3IgPSBuZXcgUGFzc3dvcmRWYWxpZGF0b3IobWFuZGF0b3J5KVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yKSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXF1YWxzVmFsaWRhdG9yfSAqL1xyXG4gICAgICAgIHRoaXMuY29udHJvbFZhbGlkYXRvciA9IG5ldyBFcXVhbHNWYWxpZGF0b3IobWFuZGF0b3J5KVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZUNvbnRyb2xWYWxpZGF0aW9uRXJyb3IpKTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtBbmRWYWxpZGF0b3JTZXR9ICovXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgQW5kVmFsaWRhdG9yU2V0KClcclxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZFZhbGlkYXRvcilcclxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5jb250cm9sVmFsaWRhdG9yKTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtCb29sZWFufSAqL1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0Jvb2xlYW59ICovXHJcbiAgICAgICAgdGhpcy5jb250cm9sQ2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMuY29udHJvbFBsYWNlaG9sZGVyID0gY29udHJvbFBsYWNlaG9sZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuSU5QVVRfRUxFTUVOVF9JRCk7XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuRVJST1JfRUxFTUVOVF9JRCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xJbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0lOUFVUX0VMRU1FTlRfSUQpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xFcnJvciA9IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0VSUk9SX0VMRU1FTlRfSUQpO1xyXG5cclxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGlucHV0LCBcIm9uYmx1clwiLCBQYXNzd29yZE1hdGNoZXJJbnB1dC5CTFVSX0VWRU5ULCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goaW5wdXQsIFwib25rZXl1cFwiLCBQYXNzd29yZE1hdGNoZXJJbnB1dC5LRVlVUF9FVkVOVCwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGlucHV0LCBcIm9uY2hhbmdlXCIsIFBhc3N3b3JkTWF0Y2hlcklucHV0LkNIQU5HRV9FVkVOVCwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGVycm9yLCBcIm9uY2xpY2tcIiwgUGFzc3dvcmRNYXRjaGVySW5wdXQuRVJST1JfQ0xJQ0tfRVZFTlQsIGlkeCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goY29udHJvbElucHV0LCBcIm9uYmx1clwiLCBQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0JMVVJfRVZFTlQsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChjb250cm9sSW5wdXQsIFwib25rZXl1cFwiLCBQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0tFWVVQX0VWRU5ULCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goY29udHJvbElucHV0LCBcIm9uY2hhbmdlXCIsIFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTlRST0xfQ0hBTkdFX0VWRU5ULCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goY29udHJvbEVycm9yLCBcIm9uY2xpY2tcIiwgUGFzc3dvcmRNYXRjaGVySW5wdXQuQ09OVFJPTF9FUlJPUl9DTElDS19FVkVOVCwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQYXNzd29yZE1hdGNoZXJJbnB1dC5CTFVSX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5ibHVyKSwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFBhc3N3b3JkTWF0Y2hlcklucHV0LktFWVVQX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5rZXlVcCksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQYXNzd29yZE1hdGNoZXJJbnB1dC5DSEFOR0VfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmNoYW5nZSksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQYXNzd29yZE1hdGNoZXJJbnB1dC5FUlJPUl9DTElDS19FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yKSwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0JMVVJfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmNvbnRyb2xCbHVyKSwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTlRST0xfS0VZVVBfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmNvbnRyb2xLZXlVcCksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0NIQU5HRV9FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuY29udHJvbENoYW5nZSksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0VSUk9SX0NMSUNLX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlQ29udHJvbFZhbGlkYXRpb25FcnJvciksIGlkeCk7XHJcblxyXG4gICAgICAgIHRoaXMud2l0aFBsYWNlaG9sZGVyKHRoaXMucGxhY2Vob2xkZXIsIHRoaXMuY29udHJvbFBsYWNlaG9sZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250cm9sQ2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29udHJvbEtleVVwKGV2ZW50KSB7XHJcbiAgICAgICAgaWYodGhpcy5jb21wb25lbnQuZ2V0KFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTlRST0xfSU5QVVRfRUxFTUVOVF9JRCkuZ2V0VmFsdWUoKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LmdldEtleUNvZGUoKSAhPT0gMTMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY29udHJvbFZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29udHJvbFZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbENvbnRyb2woKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5lbnRlckxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJMaXN0ZW5lci5jYWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZSgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuQ09OVFJPTF9JTlBVVF9FTEVNRU5UX0lEKS5nZXRWYWx1ZSgpICE9PSB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuZ2V0VmFsdWUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuQ09OVFJPTF9JTlBVVF9FTEVNRU5UX0lEKS5zZXRWYWx1ZShcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlVcChldmVudCkge1xyXG4gICAgICAgIGlmKHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5nZXRWYWx1ZSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udHJvbFZhbGlkYXRvci5zZXRWYWx1ZSh0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sVmFsaWRhdG9yLnZhbGlkYXRlKHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0lOUFVUX0VMRU1FTlRfSUQpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgIGlmIChldmVudC5nZXRLZXlDb2RlKCkgIT09IDEzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhc3N3b3JkVmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZFZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9jdXNDb250cm9sKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RBbGxDb250cm9sKCk7XHJcbiAgICB9XHJcblxyXG5cdGdldENvbXBvbmVudCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtBYnN0cmFjdFZhbGlkYXRvcn1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsaWRhdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwpIHtcclxuICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xyXG4gICAgICAgICAgICAubGluayhtb2RlbCwgdGhpcy5wYXNzd29yZFZhbGlkYXRvcilcclxuICAgICAgICAgICAgLnRvKHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcclxuICAgICAgICAgICAgLmxpbmsobW9kZWwsIHRoaXMuY29udHJvbFZhbGlkYXRvcilcclxuICAgICAgICAgICAgLnRvKHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0lOUFVUX0VMRU1FTlRfSUQpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoUGxhY2Vob2xkZXIocGxhY2Vob2xkZXJWYWx1ZSwgY29udHJvbFBsYWNlSG9sZGVyVmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLHBsYWNlaG9sZGVyVmFsdWUpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0lOUFVUX0VMRU1FTlRfSUQpLnNldEF0dHJpYnV0ZVZhbHVlKFwicGxhY2Vob2xkZXJcIixjb250cm9sUGxhY2VIb2xkZXJWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjb250cm9sQmx1cigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29udHJvbENoYW5nZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY29udHJvbFZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29udHJvbFZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZUNvbnRyb2xWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBibHVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhc3N3b3JkVmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZFZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Bhc3N3b3JkVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuRVJST1JfRUxFTUVOVF9JRCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTsgfVxyXG4gICAgaGlkZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuRVJST1JfRUxFTUVOVF9JRCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpOyB9XHJcbiAgICBzaG93Q29udHJvbFZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTlRST0xfRVJST1JfRUxFTUVOVF9JRCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTsgfVxyXG4gICAgaGlkZUNvbnRyb2xWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0VSUk9SX0VMRU1FTlRfSUQpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTsgfVxyXG4gICAgZm9jdXMoKSB7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5mb2N1cygpOyB9XHJcbiAgICBmb2N1c0NvbnRyb2woKSB7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0lOUFVUX0VMRU1FTlRfSUQpLmZvY3VzKCk7IH1cclxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBhc3N3b3JkTWF0Y2hlcklucHV0LklOUFVUX0VMRU1FTlRfSUQpLnNlbGVjdEFsbCgpOyB9XHJcbiAgICBzZWxlY3RBbGxDb250cm9sKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuQ09OVFJPTF9JTlBVVF9FTEVNRU5UX0lEKS5zZWxlY3RBbGwoKTsgfVxyXG4gICAgZW5hYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuZW5hYmxlKCk7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0lOUFVUX0VMRU1FTlRfSUQpLmVuYWJsZSgpOyB9XHJcbiAgICBkaXNhYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuZGlzYWJsZSgpOyB0aGlzLmNvbXBvbmVudC5nZXQoUGFzc3dvcmRNYXRjaGVySW5wdXQuQ09OVFJPTF9JTlBVVF9FTEVNRU5UX0lEKS5kaXNhYmxlKCk7IH1cclxuICAgIGVuYWJsZUNvbnRyb2woKSB7IHRoaXMuY29tcG9uZW50LmdldChQYXNzd29yZE1hdGNoZXJJbnB1dC5DT05UUk9MX0lOUFVUX0VMRU1FTlRfSUQpLmVuYWJsZSgpOyB9XHJcbiAgICBkaXNhYmxlQ29udHJvbCgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBhc3N3b3JkTWF0Y2hlcklucHV0LkNPTlRST0xfSU5QVVRfRUxFTUVOVF9JRCkuZGlzYWJsZSgpOyB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQWJzdHJhY3RWYWxpZGF0b3IsXHJcbiAgICBQaG9uZVZhbGlkYXRvcixcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXHJcbiAgICBDb21wb25lbnRcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiwgU3RyaW5nVXRpbHMgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQaG9uZUlucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBob25lSW5wdXQge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQaG9uZUlucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bob25lSW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGhvbmVJbnB1dC5jc3NcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgQkxVUl9FVkVOVCgpIHsgcmV0dXJuIFwiLy9ldmVudDpwaG9uZUlucHV0Qmx1clwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEtFWVVQX0VWRU5UKCkgeyByZXR1cm4gXCIvL2V2ZW50OnBob25lSW5wdXRLZXlVcFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IENIQU5HRV9FVkVOVCgpIHsgcmV0dXJuIFwiLy9ldmVudDpwaG9uZUlucHV0Q2hhbmdlXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgRVJST1JfQ0xJQ0tfRVZFTlQoKSB7IHJldHVybiBcIi8vZXZlbnQ6cGhvbmVFcnJvckNsaWNrZWRcIjsgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlBob25lXCI7IH1cclxuICAgIFxyXG4gICAgc3RhdGljIGdldCBJTlBVVF9FTEVNRU5UX0lEKCkgeyByZXR1cm4gXCJwaG9uZUlucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgRVJST1JfRUxFTUVOVF9JRCgpIHsgcmV0dXJuIFwicGhvbmVFcnJvclwiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtYW5kYXRvcnkgPSBmYWxzZSwgcGxhY2Vob2xkZXIgPSBQaG9uZUlucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShFdmVudFJlZ2lzdHJ5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtQaG9uZVZhbGlkYXRvcn0gKi9cclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5ldyBQaG9uZVZhbGlkYXRvcihtYW5kYXRvcnkpXHJcbiAgICAgICAgICAgIC53aXRoVmFsaWRMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Qm9vbGVhbn0gKi9cclxuICAgICAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUGhvbmVJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcblxyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQaG9uZUlucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChQaG9uZUlucHV0LklOUFVUX0VMRU1FTlRfSUQpO1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy5jb21wb25lbnQuZ2V0KFBob25lSW5wdXQuRVJST1JfRUxFTUVOVF9JRCk7XHJcblxyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goaW5wdXQsIFwib25ibHVyXCIsIFBob25lSW5wdXQuQkxVUl9FVkVOVCwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGlucHV0LCBcIm9ua2V5dXBcIiwgUGhvbmVJbnB1dC5LRVlVUF9FVkVOVCwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGlucHV0LCBcIm9uY2hhbmdlXCIsIFBob25lSW5wdXQuQ0hBTkdFX0VWRU5ULCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goZXJyb3IsIFwib25jbGlja1wiLCBQaG9uZUlucHV0LkVSUk9SX0NMSUNLX0VWRU5ULCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFBob25lSW5wdXQuQkxVUl9FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuYmx1cnJlZCksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQaG9uZUlucHV0LktFWVVQX0VWRU5ULCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5rZXlVcCksIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihQaG9uZUlucHV0LkNIQU5HRV9FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuY2hhbmdlKSwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFBob25lSW5wdXQuRVJST1JfQ0xJQ0tfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLndpdGhQbGFjZWhvbGRlcih0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAga2V5VXAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChldmVudC5nZXRLZXlDb2RlKCkgIT09IDEzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZW50ZXJMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIuY2FsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtBYnN0cmFjdFZhbGlkYXRvcn1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsaWRhdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwpIHtcclxuICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xyXG4gICAgICAgICAgICAubGluayhtb2RlbCwgdGhpcy52YWxpZGF0b3IpXHJcbiAgICAgICAgICAgIC50byh0aGlzLmNvbXBvbmVudC5nZXQoUGhvbmVJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyVmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoUGhvbmVJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIscGxhY2Vob2xkZXJWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBibHVycmVkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBob25lSW5wdXQuRVJST1JfRUxFTUVOVF9JRCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTsgfVxyXG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBob25lSW5wdXQuRVJST1JfRUxFTUVOVF9JRCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpOyB9XHJcbiAgICBmb2N1cygpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBob25lSW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuZm9jdXMoKTsgfVxyXG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoUGhvbmVJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5zZWxlY3RBbGwoKTsgfVxyXG4gICAgZW5hYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoUGhvbmVJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5lbmFibGUoKTsgfVxyXG4gICAgZGlzYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFBob25lSW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuZGlzYWJsZSgpOyB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5LCBFdmVudFJlZ2lzdHJ5LCBDYW52YXNTdHlsZXMsIElucHV0RWxlbWVudERhdGFCaW5kaW5nIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUZXh0SW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiVGV4dElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RleHRJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90ZXh0SW5wdXQuY3NzXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IEtFWVVQX0VWRU5UKCkgeyByZXR1cm4gXCIvL2V2ZW50OnRleHRJbnB1dEtleVVwXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgQ0xJQ0tfRVZFTlQoKSB7IHJldHVybiBcIi8vZXZlbnQ6dGV4dElucHV0Q2xpY2tlZFwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJUZXh0XCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IElOUFVUX0VMRU1FTlRfSUQoKSB7IHJldHVybiBcInRleHRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEVSUk9SX0VMRU1FTlRfSUQoKSB7IHJldHVybiBcInRleHRFcnJvclwiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1hbmRhdG9yeSA9IGZhbHNlLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtCb29sZWFufSAqL1xyXG4gICAgICAgIHRoaXMubWFuZGF0b3J5ID0gbWFuZGF0b3J5O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBrZXlVcChldmVudCkge1xyXG4gICAgICAgIGlmKGV2ZW50LmdldEtleUNvZGUoKSAhPT0gMTMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmVudGVyTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5lbnRlckxpc3RlbmVyLmNhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZih0aGlzLmNsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0xpc3RlbmVyLmNhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVGV4dElucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFRleHRJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFRleHRJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChUZXh0SW5wdXQuSU5QVVRfRUxFTUVOVF9JRCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goaW5wdXQsIFwib25rZXl1cFwiLCBUZXh0SW5wdXQuS0VZVVBfRVZFTlQsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChpbnB1dCwgXCJvbmNsaWNrXCIsIFRleHRJbnB1dC5DTElDS19FVkVOVCwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihUZXh0SW5wdXQuS0VZVVBfRVZFTlQsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmtleVVwKSwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFRleHRJbnB1dC5DTElDS19FVkVOVCwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuY2xpY2spLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLndpdGhQbGFjZWhvbGRlcih0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aE1vZGVsKG1vZGVsLCB2YWxpZGF0b3IpIHtcclxuICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKG1vZGVsLCB2YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldChUZXh0SW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhQbGFjZWhvbGRlcihwbGFjZWhvbGRlclZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFRleHRJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIsIHBsYWNlaG9sZGVyVmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhDbGlja0xpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja0xpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoVGV4dElucHV0LkVSUk9SX0VMRU1FTlRfSUQpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7IH1cclxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldChUZXh0SW5wdXQuRVJST1JfRUxFTUVOVF9JRCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpOyB9XHJcbiAgICBmb2N1cygpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFRleHRJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5mb2N1cygpOyB9XHJcbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMuY29tcG9uZW50LmdldChUZXh0SW5wdXQuSU5QVVRfRUxFTUVOVF9JRCkuc2VsZWN0QWxsKCk7IH1cclxuICAgIGVuYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFRleHRJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5lbmFibGUoKTsgfVxyXG4gICAgZGlzYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFRleHRJbnB1dC5JTlBVVF9FTEVNRU5UX0lEKS5kaXNhYmxlKCk7IH1cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXNcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJ1dHRvblwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWJtaXQge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJTdWJtaXRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvc3VibWl0Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3N1Ym1pdC5jc3NcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9QUklNQVJZKCkgeyByZXR1cm4gXCJidG4tcHJpbWFyeVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfU0VDT05EQVJZKCkgeyByZXR1cm4gXCJidG4tc2Vjb25kYXJ5XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJidG4tc3VjY2Vzc1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpIHsgcmV0dXJuIFwiYnRuLWluZm9cIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1dBUk5JTkcoKSB7IHJldHVybiBcImJ0bi13YXJuaW5nXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9EQU5HRVIoKSB7IHJldHVybiBcImJ0bi1kYW5nZXJcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0xJR0hUKCkgeyByZXR1cm4gXCJidG4tbGlnaHRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0RBUksoKSB7IHJldHVybiBcImJ0bi1kYXJrXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvblR5cGUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBidXR0b25UeXBlID0gQnV0dG9uLlRZUEVfUFJJTUFSWSkge1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5idXR0b25UeXBlID0gYnV0dG9uVHlwZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEV2ZW50UmVnaXN0cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiU3VibWl0XCIpO1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTdWJtaXQuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInN1Ym1pdFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInZhbHVlXCIsIHRoaXMubGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInN1Ym1pdFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsXCJidG4gXCIgKyB0aGlzLmJ1dHRvblR5cGUpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihjbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJzdWJtaXRcIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6c3VibWl0Q2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpzdWJtaXRDbGlja2VkXCIsIGNsaWNrTGlzdGVuZXIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJzdWJtaXRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJzdWJtaXRcIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOlsiTG9nZ2VyIiwiSW5qZWN0aW9uUG9pbnQiLCJFdmVudFJlZ2lzdHJ5IiwiQ29tcG9uZW50RmFjdG9yeSIsIkNhbnZhc1N0eWxlcyIsIkNhbnZhc1Jvb3QiLCJMT0ciLCJPYmplY3RGdW5jdGlvbiIsIkJ1dHRvbiIsIlN0eWxlc1JlZ2lzdHJ5IiwiSW5wdXRFbGVtZW50RGF0YUJpbmRpbmciLCJFbWFpbFZhbGlkYXRvciIsIlJlcXVpcmVkVmFsaWRhdG9yIiwiUGFzc3dvcmRWYWxpZGF0b3IiLCJFcXVhbHNWYWxpZGF0b3IiLCJBbmRWYWxpZGF0b3JTZXQiLCJQaG9uZUlucHV0IiwiUGhvbmVWYWxpZGF0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBV0EsTUFBTSxHQUFHLEdBQUcsSUFBSUEsa0JBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFcEMsQUFBTyxNQUFNLFNBQVMsQ0FBQzs7Q0FFdEIsV0FBVyxjQUFjLEdBQUcsRUFBRSxPQUFPLFdBQVcsQ0FBQyxFQUFFO0NBQ25ELFdBQVcsWUFBWSxH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
