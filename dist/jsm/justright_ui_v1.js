import { EventRegistry, ComponentFactory, CanvasStyles, CanvasRoot, StylesRegistry, InputElementDataBinding, EmailValidator, RequiredValidator, PasswordValidator, EqualsPropertyValidator, AndValidatorSet, PhoneValidator } from './justright_core_v1.js'
import { Logger, ObjectFunction } from './coreutil_v1.js'
import { InjectionPoint } from './mindi_v1.js'

const LOG = new Logger("BackShade");

class BackShade {

	static get COMPONENT_NAME() { return "BackShade"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/backShade.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/backShade.css"; }

    /**
     * 
     */
    constructor(){

		/** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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
            CanvasStyles.disableStyle(BackShade.COMPONENT_NAME);
        }, milliSeconds + 1);
    }

    disable() {
        this.disableAfter(500);
    }

    enable() {
        CanvasStyles.enableStyle(BackShade.COMPONENT_NAME);
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
                CanvasRoot.prependBodyElement(this.getComponent().getRootElement());
            }
        }
    }

    removeSelf() {
        this.getComponent().remove();
    }
    
}

const LOG$1 = new Logger("BannerMessage");

class BannerMessage {

	static get COMPONENT_NAME() { return "BannerMessage"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/bannerMessage.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/bannerMessage.css"; }

    static get TYPE_ALERT() { return "banner-message-alert"; }
    static get TYPE_INFO() { return "banner-message-info"; }
    static get TYPE_SUCCESS() { return "banner-message-success"; }
    static get TYPE_WARNING() { return "banner-message-warning"; }

    static get SHAPE_LARGE_SQUARE() { return "banner-message-large-square"; }
    static get SHAPE_LARGE_ROUND() { return "banner-message-large-round"; }
    static get SHAPE_SMALL_SQUARE() { return "banner-message-small-square"; }
    static get SHAPE_SMALL_ROUND() { return "banner-message-small-round"; }

    /**
     * 
     * @param {string} message 
     * @param {string} bannerType 
     * @param {boolean} closeable 
     */
    constructor(message, bannerType = BannerMessage.TYPE_PRIMARY, closeable = false, bannerShape = BannerMessage.SHAPE_LARGE_SQUARE) {

        /** @type {string} */
        this.message = message;

        /** @type {boolean} */
        this.closeable = closeable;

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {string} */
        this.bannerShape = bannerShape;

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {ObjectFunction} */
        this.onHideListener = null;

        /** @type {ObjectFunction} */
        this.onShowListener = null;

    }

    postConfig() {
        this.component = this.componentFactory.create("BannerMessage");
        this.component.get("bannerMessageHeader").setChild("Alert");
        this.component.get("bannerMessageMessage").setChild(this.message);
        this.component.get("bannerMessage").setAttributeValue("class","banner-message fade " + this.bannerShape + " " + this.bannerType);
        this.eventRegistry.attach(this.component.get("bannerMessageCloseButton"), "onclick", "//event:bannerMessageCloseButtonClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:bannerMessageCloseButtonClicked", new ObjectFunction(this,this.hide), this.component.getComponentIndex());
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
        this.getComponent().get("bannerMessage").setAttributeValue("class" , "banner-message hide " + this.bannerShape + " " + this.bannerType);
        setTimeout(() => { 
            this.getComponent().get("bannerMessage").setStyle("display","none");
        },500);
        this.component.getComponentIndex();
        setTimeout(() => {
            CanvasStyles.disableStyle(BannerMessage.COMPONENT_NAME, this.component.getComponentIndex());
        },501);
        if(this.onHideListener) {
            this.onHideListener.call();
        }
    }

    show() {
        CanvasStyles.enableStyle(BannerMessage.COMPONENT_NAME, this.component.getComponentIndex());
        this.getComponent().get("bannerMessage").setStyle("display","block");
        setTimeout(() => { 
            this.getComponent().get("bannerMessage").setAttributeValue("class" , "banner-message show " + this.bannerShape + " " + this.bannerType) ;
        },100);
        if(this.onShowListener) {
            this.onShowListener.call();
        }
    }

}

class ListenerBundle {
    
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
    withErrorClickListener(targetObject, targetFunction) {
        this.errorClickListener = new ObjectFunction(targetObject, targetFunction);
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

    callErrorClick(event) {
        this.callListener(this.errorClickListener, event);
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
     * @param {ListenerBundle} listenerBundle
     * @param {string} buttonType
     */
    constructor(label, listenerBundle = null, buttonType = Button.TYPE_PRIMARY) {

        /** @type {string} */
        this.label = label;

        /** @type {ListenerBundle} */
        this.listenerBundle = (null != listenerBundle) ? listenerBundle : new ListenerBundle();

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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

	getComponent(){
		return this.component;
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    registerClickListener() {
        this.eventRegistry.attach(this.component.get("button"), "onclick", "//event:buttonClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:buttonClicked", new ObjectFunction(this, this.clicked), this.component.getComponentIndex());
        return this;
    }

    clicked(event) {
        this.listenerBundle.callClick(event);
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
        this.backShade = InjectionPoint.instance(BackShade);

        /** @type {StylesRegistry} */
        this.stylesRegistry = InjectionPoint.instance(StylesRegistry);

        /** @type {BaseElement} */
        this.container = null;
    }
    
    postConfig() {
        LOG$3.info("Post config");
        this.component = this.componentFactory.create("DialogBox");
        this.eventRegistry.attach(this.component.get("closeButton"), "onclick", "//event:closeClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:closeClicked", new ObjectFunction(this, this.hide),this.component.getComponentIndex());
        this.backShade = this.backShade
            .withClickListener(new ObjectFunction(this, this.hide));
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
            CanvasStyles.disableStyle(DialogBox.COMPONENT_NAME, this.component.getComponentIndex());
        },201);
    }

    show() {
        CanvasStyles.enableStyle(DialogBox.COMPONENT_NAME, this.component.getComponentIndex());
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
                CanvasRoot.prependBodyElement(this.getComponent().getRootElement());
            }
        }
    }

    removeSelf() {
        CanvasStyles.disableStyle(DialogBox.COMPONENT_NAME, this.component.getComponentIndex());
        this.getComponent().removeSelf();
    }
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
     * @param {ListenerBundle} listenerBundle
     */
    constructor(name, model = null, listenerBundle = null) {
        
        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

        /** @type {Component} */
        this.component = null;

        /** @type {ObjectFunction} */
        this.listenerBundle = (null != listenerBundle) ? listenerBundle : new ListenerBundle();
        
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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
     * @param {ListenerBundle} listenerBundle
     * @param {AbstractValidator} validator
     * @param {string} placeholder
     * @param {string} inputElementId
     * @param {string} errorElementId
     * 

     */
    constructor(componentName,
        name,
        model = null, 
        listenerBundle = null,
        validator = null, 
        placeholder = null,
        inputElementId = "input",
        errorElementId = "error") {

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

        /** @type {ListenerBundle} */
        this.listenerBundle = (null != listenerBundle) ? listenerBundle : new ListenerBundle();

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {boolean} */
        this.tainted = false;
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentName);

        CanvasStyles.enableStyle(this.componentName, this.component.getComponentIndex());

        this.component.get(this.inputElementId).setAttributeValue("name", this.name);
        this.component.get(this.inputElementId).setAttributeValue("placeholder", this.placeholder);

        if(this.validator) {
            this.validator.withValidListener(new ObjectFunction(this,this.hideValidationError));
        }

        if(this.model) {
            InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
        }

        this.registerListener(new ObjectFunction(this, this.entered), CommonInput.ON_KEYUP, CommonInput.INPUT_ENTER_EVENT_ID, (event) => { return event.isKeyCode(13); } );
        this.registerListener(new ObjectFunction(this, this.keyupped), CommonInput.ON_KEYUP, CommonInput.INPUT_KEYUP_EVENT_ID);
        this.registerListener(new ObjectFunction(this, this.changed), CommonInput.ON_CHANGE, CommonInput.INPUT_CHANGE_EVENT_ID);
        this.registerListener(new ObjectFunction(this, this.blurred), CommonInput.ON_BLUR, CommonInput.INPUT_BLUR_EVENT_ID);
        this.registerListener(new ObjectFunction(this, this.clicked), CommonInput.ON_CLICK, CommonInput.INPUT_CLICK_EVENT_ID);
        this.registerListener(new ObjectFunction(this, this.errorClicked), CommonInput.ON_CLICK, CommonInput.ERROR_CLICK_EVENT_ID);
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
        if(eventFilter) { filteredListener = new ObjectFunction(this,(event) => { if(eventFilter.call(this,event)) { listener.call(event); } }); }
        this.eventRegistry.listen(eventId, filteredListener, this.component.getComponentIndex());
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
        this.listenerBundle.callKeyUp(event);
    }

    changed(event) {
        this.tainted = true;
        this.listenerBundle.callChange(event);
    }

    clicked(event) {
        this.listenerBundle.callClick(event);
    }

    entered(event) {
        if (!this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
            return;
        }
        this.listenerBundle.callEnter(event);
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
        this.listenerBundle.callBlur(event);
    }

    errorClicked(event) {
        this.hideValidationError();
        this.listenerBundle.callErrorClick(event);
    }


    showValidationError() { this.component.get(this.errorElementId).setStyle("display", "block"); }
    hideValidationError() { this.component.get(this.errorElementId).setStyle("display", "none"); }
    focus() { this.component.get(this.inputElementId).focus(); }
    selectAll() { this.component.get(this.inputElementId).selectAll(); }
    enable() { this.component.get(this.inputElementId).enable(); }
    disable() { this.component.get(this.inputElementId).disable(); }
    clear() { this.tainted = false; this.component.get(this.inputElementId).setValue(""); }

}

const LOG$5 = new Logger("EmailInput");

class EmailInput extends CommonInput {

    static get COMPONENT_NAME() { return "EmailInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Email"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(EmailInput.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new EmailValidator(mandatory, !mandatory),
            placeholder,
            "emailInput",
            "emailError");
    }

}

const LOG$6 = new Logger("PasswordInput");

class PasswordInput extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordInput.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new RequiredValidator(!mandatory),
            placeholder,
            "passwordInput",
            "passwordError");
    }
}

const LOG$7 = new Logger("PasswordMatcherInputValue");

class PasswordMatcherInputValue extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputValue"; }
    static get DEFAULT_PLACEHOLDER() { return "New password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordMatcherInputValue.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new PasswordValidator(mandatory),
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError");
    }
}

const LOG$8 = new Logger("PasswordMatcherInputControl");

class PasswordMatcherInputControl extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputControl"; }
    static get DEFAULT_PLACEHOLDER() { return "Confirm password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.css"; }



    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {string} modelComparedPropertyName
     * @param {boolean} mandatory
     */
    constructor(name, model = null, modelComparedPropertyName = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER,
           mandatory = false) {

        super(PasswordMatcherInputControl.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new EqualsPropertyValidator(mandatory, false, model, modelComparedPropertyName),
            placeholder,
            "passwordMatcherInputControlField",
            "passwordMatcherInputControlError");
    }
}

const LOG$9 = new Logger("PasswordMatcherInput");

class PasswordMatcherInput {

	static get COMPONENT_NAME() { return "PasswordMatcherInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {string} controlName
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {string} controlPlaceholder
     * @param {boolean} mandatory
     */
    constructor(name, controlName,
        model = null,
        listenerBundle = null, 
        placeholder = PasswordMatcherInput.DEFAULT_PLACEHOLDER, 
        controlPlaceholder = PasswordMatcherInput.DEFAULT_CONTROL_PLACEHOLDER,
        mandatory = false) {


        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {PasswordMatcherInputValue} */
		this.passwordMatcherInputValue = InjectionPoint.instance(
            PasswordMatcherInputValue, [name, model, new ListenerBundle().withEnterListener(this, this.passwordEntered), placeholder,  mandatory]
		);

        /** @type {PasswordMatcherInputControl} */
		this.passwordMatcherInputControl = InjectionPoint.instance(
            PasswordMatcherInputControl, [controlName, model, name, listenerBundle, controlPlaceholder, mandatory]
		);
    }

    postConfig() {
        this.component = this.componentFactory.create(PasswordMatcherInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        this.component.setChild("passwordMatcherInputValue",this.passwordMatcherInputValue.getComponent());
        this.component.setChild("passwordMatcherInputControl",this.passwordMatcherInputControl.getComponent());

        /** @type {AndValidatorSet} */
        this.validator = new AndValidatorSet()
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

const LOG$a = new Logger("PhoneInput");

class PhoneInput extends CommonInput {

    static get COMPONENT_NAME() { return "PhoneInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Phone"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/phoneInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/phoneInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PhoneInput.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new PhoneValidator(mandatory, !mandatory),
            placeholder,
            "phoneInput",
            "phoneError");
    }
}

const LOG$b = new Logger("TextInput");

class TextInput$1 extends CommonInput {

    static get COMPONENT_NAME() { return "TextInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Text"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput$1.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(TextInput$1.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new RequiredValidator(!mandatory),
            placeholder,
            "textInput",
            "textError");
    }

}

export { BackShade, BannerMessage, Button, CheckBox, CommonInput, DialogBox, EmailInput, ListenerBundle, PasswordInput, PasswordMatcherInput, PasswordMatcherInputControl, PasswordMatcherInputValue, PhoneInput, TextInput$1 as TextInput };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrU2hhZGUvYmFja1NoYWRlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYmFubmVyTWVzc2FnZS9iYW5uZXJNZXNzYWdlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvbGlzdGVuZXJCdW5kbGUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9idXR0b24vYnV0dG9uLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvZGlhbG9nQm94L2RpYWxvZ0JveC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvY29tbW9uSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9lbWFpbElucHV0L2VtYWlsSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZElucHV0L3Bhc3N3b3JkSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9waG9uZUlucHV0L3Bob25lSW5wdXQuanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC90ZXh0SW5wdXQvdGV4dElucHV0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIENhbnZhc1Jvb3QsXHJcbiAgICBCYXNlRWxlbWVudFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja1NoYWRlXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhY2tTaGFkZSB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJhY2tTaGFkZVwiOyB9XHJcblx0c3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tTaGFkZS5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG5cdFx0LyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEV2ZW50UmVnaXN0cnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7QmFzZUVsZW1lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xyXG5cdH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIExPRy5pbmZvKFwiUG9zdCBjb25maWdcIik7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiQmFja1NoYWRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0Jhc2VFbGVtZW50fSBjb250YWluZXIgXHJcbiAgICAgKi9cclxuICAgIHNldENvbnRhaW5lcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cclxuICAgICAqL1xyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBjbGlja2VkTGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHdpdGhDbGlja0xpc3RlbmVyKGNsaWNrZWRMaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmJhY2tTaGFkZUNsaWNrZWRcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6YmFja1NoYWRlQ2xpY2tlZFwiLCBjbGlja2VkTGlzdGVuZXIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVBZnRlcihtaWxsaVNlY29uZHMpIHtcclxuICAgICAgICB0aGlzLm1vdW50U2VsZigpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGVcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgIH0sIG1pbGxpU2Vjb25kcyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB9LCBtaWxsaVNlY29uZHMgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUFmdGVyKDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYWNrU2hhZGUuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlIHNob3dcIikgXHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VudFNlbGYoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFkZENoaWxkKHRoaXMuZ2V0Q29tcG9uZW50KCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIENhbnZhc1Jvb3QucHJlcGVuZEJvZHlFbGVtZW50KHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0Um9vdEVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU2VsZigpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXNcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhbm5lck1lc3NhZ2VcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFubmVyTWVzc2FnZSB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJhbm5lck1lc3NhZ2VcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFubmVyTWVzc2FnZS5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYW5uZXJNZXNzYWdlLmNzc1wiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBUWVBFX0FMRVJUKCkgeyByZXR1cm4gXCJiYW5uZXItbWVzc2FnZS1hbGVydFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpIHsgcmV0dXJuIFwiYmFubmVyLW1lc3NhZ2UtaW5mb1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfU1VDQ0VTUygpIHsgcmV0dXJuIFwiYmFubmVyLW1lc3NhZ2Utc3VjY2Vzc1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwiYmFubmVyLW1lc3NhZ2Utd2FybmluZ1wiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBTSEFQRV9MQVJHRV9TUVVBUkUoKSB7IHJldHVybiBcImJhbm5lci1tZXNzYWdlLWxhcmdlLXNxdWFyZVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNIQVBFX0xBUkdFX1JPVU5EKCkgeyByZXR1cm4gXCJiYW5uZXItbWVzc2FnZS1sYXJnZS1yb3VuZFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNIQVBFX1NNQUxMX1NRVUFSRSgpIHsgcmV0dXJuIFwiYmFubmVyLW1lc3NhZ2Utc21hbGwtc3F1YXJlXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU0hBUEVfU01BTExfUk9VTkQoKSB7IHJldHVybiBcImJhbm5lci1tZXNzYWdlLXNtYWxsLXJvdW5kXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmFubmVyVHlwZSBcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xvc2VhYmxlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBiYW5uZXJUeXBlID0gQmFubmVyTWVzc2FnZS5UWVBFX1BSSU1BUlksIGNsb3NlYWJsZSA9IGZhbHNlLCBiYW5uZXJTaGFwZSA9IEJhbm5lck1lc3NhZ2UuU0hBUEVfTEFSR0VfU1FVQVJFKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cclxuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmJhbm5lclR5cGUgPSBiYW5uZXJUeXBlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmJhbm5lclNoYXBlID0gYmFubmVyU2hhcGU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShFdmVudFJlZ2lzdHJ5KTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCYW5uZXJNZXNzYWdlXCIpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQoXCJBbGVydFwiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYmFubmVyLW1lc3NhZ2UgZmFkZSBcIiArIHRoaXMuYmFubmVyU2hhcGUgKyBcIiBcIiArIHRoaXMuYmFubmVyVHlwZSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpiYW5uZXJNZXNzYWdlQ2xvc2VCdXR0b25DbGlja2VkXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLHRoaXMuaGlkZSksIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZU1lc3NhZ2VcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IG9uSGlkZUxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBvbkhpZGUob25IaWRlTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyID0gb25IaWRlTGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IG9uU2hvd0xpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBvblNob3cob25TaG93TGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gb25TaG93TGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJiYW5uZXItbWVzc2FnZSBoaWRlIFwiICsgdGhpcy5iYW5uZXJTaGFwZSArIFwiIFwiICsgdGhpcy5iYW5uZXJUeXBlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFubmVyTWVzc2FnZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgfSw1MDApO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KClcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShCYW5uZXJNZXNzYWdlLkNPTVBPTkVOVF9OQU1FLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB9LDUwMSk7XHJcbiAgICAgICAgaWYodGhpcy5vbkhpZGVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyLmNhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5DT01QT05FTlRfTkFNRSwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJiYW5uZXItbWVzc2FnZSBzaG93IFwiICsgdGhpcy5iYW5uZXJTaGFwZSArIFwiIFwiICsgdGhpcy5iYW5uZXJUeXBlKSA7XHJcbiAgICAgICAgfSwxMDApO1xyXG4gICAgICAgIGlmKHRoaXMub25TaG93TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lci5jYWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTGlzdGVuZXJCdW5kbGUge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRPYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0YXJnZXRGdW5jdGlvbiBcclxuICAgICAqL1xyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIodGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuY2xpY2tMaXN0ZW5lciA9IG5ldyBPYmplY3RGdW5jdGlvbih0YXJnZXRPYmplY3QsIHRhcmdldEZ1bmN0aW9uKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldE9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHRhcmdldEZ1bmN0aW9uIFxyXG4gICAgICovXHJcbiAgICB3aXRoRXJyb3JDbGlja0xpc3RlbmVyKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmVycm9yQ2xpY2tMaXN0ZW5lciA9IG5ldyBPYmplY3RGdW5jdGlvbih0YXJnZXRPYmplY3QsIHRhcmdldEZ1bmN0aW9uKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldE9iamVjdCBcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHRhcmdldEZ1bmN0aW9uIFxyXG4gICAgICovXHJcbiAgICB3aXRoS2V5VXBMaXN0ZW5lcih0YXJnZXRPYmplY3QsIHRhcmdldEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5rZXlVcExpc3RlbmVyID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0T2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdGFyZ2V0RnVuY3Rpb24gXHJcbiAgICAgKi9cclxuICAgIHdpdGhFbnRlckxpc3RlbmVyKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRPYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0YXJnZXRGdW5jdGlvbiBcclxuICAgICAqL1xyXG4gICAgd2l0aEJsdXJMaXN0ZW5lcih0YXJnZXRPYmplY3QsIHRhcmdldEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5ibHVyTGlzdGVuZXIgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRPYmplY3QgXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0YXJnZXRGdW5jdGlvbiBcclxuICAgICAqL1xyXG4gICAgd2l0aENoYW5nZUxpc3RlbmVyKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUxpc3RlbmVyID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0T2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdGFyZ2V0RnVuY3Rpb24gXHJcbiAgICAgKi9cclxuICAgIHdpdGhGb2N1c0xpc3RlbmVyKHRhcmdldE9iamVjdCwgdGFyZ2V0RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZvY3VzTGlzdGVuZXIgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGFyZ2V0T2JqZWN0LCB0YXJnZXRGdW5jdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5jbGlja0xpc3RlbmVyLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEVycm9yQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcih0aGlzLmVycm9yQ2xpY2tMaXN0ZW5lciwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxLZXlVcChldmVudCkge1xyXG4gICAgICAgIHRoaXMuY2FsbExpc3RlbmVyKHRoaXMua2V5VXBMaXN0ZW5lciwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxFbnRlcihldmVudCkge1xyXG4gICAgICAgIHRoaXMuY2FsbExpc3RlbmVyKHRoaXMuZW50ZXJMaXN0ZW5lciwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxCbHVyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5ibHVyTGlzdGVuZXIsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXIodGhpcy5jaGFuZ2VMaXN0ZW5lciwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxGb2N1cyhldmVudCkge1xyXG4gICAgICAgIHRoaXMuY2FsbExpc3RlbmVyKHRoaXMuZm9jdXNMaXN0ZW5lciwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBsaXN0ZW5lciBcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxyXG4gICAgICovXHJcbiAgICBjYWxsTGlzdGVuZXIobGlzdGVuZXIsIGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXIuY2FsbChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzXHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgTGlzdGVuZXJCdW5kbGUgfSBmcm9tIFwiLi4vbGlzdGVuZXJCdW5kbGVcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCdXR0b25cIik7XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQnV0dG9uXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2J1dHRvbi5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9idXR0b24uY3NzXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfUFJJTUFSWSgpIHsgcmV0dXJuIFwiYnV0dG9uLXByaW1hcnlcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1NFQ09OREFSWSgpIHsgcmV0dXJuIFwiYnV0dG9uLXNlY29uZGFyeVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfU1VDQ0VTUygpIHsgcmV0dXJuIFwiYnV0dG9uLXN1Y2Nlc3NcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0lORk8oKSB7IHJldHVybiBcImJ1dHRvbi1pbmZvXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgeyByZXR1cm4gXCJidXR0b24td2FybmluZ1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFOR0VSKCkgeyByZXR1cm4gXCJidXR0b24tZGFuZ2VyXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9MSUdIVCgpIHsgcmV0dXJuIFwiYnV0dG9uLWxpZ2h0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9EQVJLKCkgeyByZXR1cm4gXCJidXR0b24tZGFya1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxyXG4gICAgICogQHBhcmFtIHtMaXN0ZW5lckJ1bmRsZX0gbGlzdGVuZXJCdW5kbGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25UeXBlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBsaXN0ZW5lckJ1bmRsZSA9IG51bGwsIGJ1dHRvblR5cGUgPSBCdXR0b24uVFlQRV9QUklNQVJZKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0ZW5lckJ1bmRsZX0gKi9cclxuICAgICAgICB0aGlzLmxpc3RlbmVyQnVuZGxlID0gKG51bGwgIT0gbGlzdGVuZXJCdW5kbGUpID8gbGlzdGVuZXJCdW5kbGUgOiBuZXcgTGlzdGVuZXJCdW5kbGUoKTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmJ1dHRvblR5cGUgPSBidXR0b25UeXBlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCdXR0b25cIik7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJ1dHRvbi5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKHRoaXMubGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsXCJidXR0b24gXCIgKyB0aGlzLmJ1dHRvblR5cGUpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJDbGlja0xpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBjbGlja2VkTGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyQ2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDpidXR0b25DbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmJ1dHRvbkNsaWNrZWRcIiwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuY2xpY2tlZCksIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrZWQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyQnVuZGxlLmNhbGxDbGljayhldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlTG9hZGluZygpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcInNwaW5uZXJDb250YWluZXJcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYnV0dG9uLXNwaW5uZXItY29udGFpbmVyLXZpc2libGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUxvYWRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJzcGlubmVyQ29udGFpbmVyXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImJ1dHRvbi1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsXCJ0cnVlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIFN0eWxlc1JlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzUm9vdCxcclxuICAgIEJhc2VFbGVtZW50XHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgQmFja1NoYWRlIH0gZnJvbSBcIi4uL2JhY2tTaGFkZS9iYWNrU2hhZGUuanNcIjtcclxuXHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRGlhbG9nQm94XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpYWxvZ0JveCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkRpYWxvZ0JveFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9kaWFsb2dCb3guaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZGlhbG9nQm94LmNzc1wiOyB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG5cdFx0LyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG5cdFx0dGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShDb21wb25lbnRGYWN0b3J5KTtcclxuXHJcblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqIEB0eXBlIHtCYWNrU2hhZGV9ICovXHJcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYWNrU2hhZGUpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge1N0eWxlc1JlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuc3R5bGVzUmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShTdHlsZXNSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7QmFzZUVsZW1lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIExPRy5pbmZvKFwiUG9zdCBjb25maWdcIilcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJEaWFsb2dCb3hcIik7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJjbG9zZUJ1dHRvblwiKSwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDpjbG9zZUNsaWNrZWRcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6Y2xvc2VDbGlja2VkXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGUpLHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlID0gdGhpcy5iYWNrU2hhZGVcclxuICAgICAgICAgICAgLndpdGhDbGlja0xpc3RlbmVyKG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtCYXNlRWxlbWVudH0gY29udGFpbmVyIFxyXG4gICAgICovXHJcbiAgICBzZXRDb250YWluZXIoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUuc2V0Q29udGFpbmVyKHRoaXMuY29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XHJcbiAgICAgKi9cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXHJcbiAgICAgKi9cclxuICAgIHNldFRpdGxlKHRleHQpe1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuc2V0Q2hpbGQoXCJ0aXRsZVwiLCB0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcclxuICAgICAqL1xyXG4gICAgc2V0Rm9vdGVyKGNvbXBvbmVudCl7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJmb290ZXJcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5zZXRDaGlsZChcImZvb3RlclwiLCBjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxyXG4gICAgICovXHJcbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCl7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5zZXRDaGlsZChcImNvbnRlbnRcIixjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuXHRzZXQoa2V5LHZhbCkge1xyXG5cdFx0dGhpcy5nZXRDb21wb25lbnQoKS5zZXQoa2V5LHZhbCk7XHJcblx0fVxyXG4gICAgXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlLm1vdW50U2VsZigpO1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZGlhbG9nQm94XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiAsIFwiZGlhbG9nYm94IGZhZGVcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYmFja1NoYWRlLmRpc2FibGVBZnRlcig1MDApO1xyXG4gICAgICAgIH0sMjAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIH0sMjAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlLm1vdW50U2VsZigpO1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlLmVuYWJsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJkaWFsb2dCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJkaWFsb2dib3ggZmFkZSBzaG93XCIpIDtcclxuICAgICAgICB9LDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIHRoaXMgY29tcG9uZW50IGluIHRoZSBjb250YWluZXIgYXQgdGhlIHByb3ZpZGVkIGlkXHJcbiAgICAgKi9cclxuICAgIG1vdW50U2VsZigpIHtcclxuICAgICAgICBpZighdGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpLmlzTW91bnRlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRDaGlsZCh0aGlzLmdldENvbXBvbmVudCgpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBDYW52YXNSb290LnByZXBlbmRCb2R5RWxlbWVudCh0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVNlbGYoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlU2VsZigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBMaXN0ZW5lckJ1bmRsZSB9IGZyb20gXCIuLi8uLi9saXN0ZW5lckJ1bmRsZVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNoZWNrQm94XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrQm94IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQ2hlY2tCb3hcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guY3NzXCI7IH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtMaXN0ZW5lckJ1bmRsZX0gbGlzdGVuZXJCdW5kbGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBsaXN0ZW5lckJ1bmRsZSA9IG51bGwpIHtcclxuICAgICAgICBcclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cclxuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3RGdW5jdGlvbn0gKi9cclxuICAgICAgICB0aGlzLmxpc3RlbmVyQnVuZGxlID0gKG51bGwgIT0gbGlzdGVuZXJCdW5kbGUpID8gbGlzdGVuZXJCdW5kbGUgOiBuZXcgTGlzdGVuZXJCdW5kbGUoKTtcclxuICAgICAgICBcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShFdmVudFJlZ2lzdHJ5KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQ2hlY2tCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShDaGVja0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xyXG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IElucHV0RWxlbWVudERhdGFCaW5kaW5nLCBBYnN0cmFjdFZhbGlkYXRvciwgQ29tcG9uZW50RmFjdG9yeSwgRXZlbnRSZWdpc3RyeSwgQ2FudmFzU3R5bGVzLCBFdmVudCB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMaXN0ZW5lckJ1bmRsZSB9IGZyb20gXCIuLi9saXN0ZW5lckJ1bmRsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1vbklucHV0IHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IElOUFVUX0NMSUNLX0VWRU5UX0lEKCkgeyByZXR1cm4gXCIvL2V2ZW50OmlucHV0Q2xpY2tlZFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IElOUFVUX0tFWVVQX0VWRU5UX0lEKCkgeyByZXR1cm4gXCIvL2V2ZW50OmlucHV0S2V5VXBcIjsgfVxyXG4gICAgc3RhdGljIGdldCBJTlBVVF9FTlRFUl9FVkVOVF9JRCgpIHsgcmV0dXJuIFwiLy9ldmVudDppbnB1dEVudGVyXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgSU5QVVRfQ0hBTkdFX0VWRU5UX0lEKCkgeyByZXR1cm4gXCIvL2V2ZW50OmlucHV0Q2hhbmdlXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgSU5QVVRfQkxVUl9FVkVOVF9JRCgpIHsgcmV0dXJuIFwiLy9ldmVudDppbnB1dEJsdXJcIjsgfVxyXG4gICAgc3RhdGljIGdldCBFUlJPUl9DTElDS19FVkVOVF9JRCgpIHsgcmV0dXJuIFwiLy9ldmVudDplcnJvckNsaWNrZWRcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgT05fQ0xJQ0soKSB7IHJldHVybiBcIm9uY2xpY2tcIjsgfVxyXG4gICAgc3RhdGljIGdldCBPTl9LRVlVUCgpIHsgcmV0dXJuIFwib25rZXl1cFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IE9OX0NIQU5HRSgpIHsgcmV0dXJuIFwib25jaGFuZ2VcIjsgfVxyXG4gICAgc3RhdGljIGdldCBPTl9CTFVSKCkgeyByZXR1cm4gXCJvbmJsdXJcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtMaXN0ZW5lckJ1bmRsZX0gbGlzdGVuZXJCdW5kbGVcclxuICAgICAqIEBwYXJhbSB7QWJzdHJhY3RWYWxpZGF0b3J9IHZhbGlkYXRvclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRFbGVtZW50SWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckVsZW1lbnRJZFxyXG4gICAgICogXHJcblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnROYW1lLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgbW9kZWwgPSBudWxsLCBcclxuICAgICAgICBsaXN0ZW5lckJ1bmRsZSA9IG51bGwsXHJcbiAgICAgICAgdmFsaWRhdG9yID0gbnVsbCwgXHJcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBudWxsLFxyXG4gICAgICAgIGlucHV0RWxlbWVudElkID0gXCJpbnB1dFwiLFxyXG4gICAgICAgIGVycm9yRWxlbWVudElkID0gXCJlcnJvclwiKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnRJZCA9IGlucHV0RWxlbWVudElkO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmVycm9yRWxlbWVudElkID0gZXJyb3JFbGVtZW50SWQ7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtBYnN0cmFjdFZhbGlkYXRvcn0gKi9cclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IHZhbGlkYXRvcjtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0ZW5lckJ1bmRsZX0gKi9cclxuICAgICAgICB0aGlzLmxpc3RlbmVyQnVuZGxlID0gKG51bGwgIT0gbGlzdGVuZXJCdW5kbGUpID8gbGlzdGVuZXJCdW5kbGUgOiBuZXcgTGlzdGVuZXJCdW5kbGUoKTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKENvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoRXZlbnRSZWdpc3RyeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cclxuICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmNvbXBvbmVudE5hbWUpO1xyXG5cclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUodGhpcy5jb21wb25lbnROYW1lLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLCB0aGlzLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIsIHRoaXMucGxhY2Vob2xkZXIpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci53aXRoVmFsaWRMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcyx0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMubW9kZWwpIHtcclxuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsLCB0aGlzLnZhbGlkYXRvcikudG8odGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5lbnRlcmVkKSwgQ29tbW9uSW5wdXQuT05fS0VZVVAsIENvbW1vbklucHV0LklOUFVUX0VOVEVSX0VWRU5UX0lELCAoZXZlbnQpID0+IHsgcmV0dXJuIGV2ZW50LmlzS2V5Q29kZSgxMyk7IH0gKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMua2V5dXBwZWQpLCBDb21tb25JbnB1dC5PTl9LRVlVUCwgQ29tbW9uSW5wdXQuSU5QVVRfS0VZVVBfRVZFTlRfSUQpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5jaGFuZ2VkKSwgQ29tbW9uSW5wdXQuT05fQ0hBTkdFLCBDb21tb25JbnB1dC5JTlBVVF9DSEFOR0VfRVZFTlRfSUQpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5ibHVycmVkKSwgQ29tbW9uSW5wdXQuT05fQkxVUiwgQ29tbW9uSW5wdXQuSU5QVVRfQkxVUl9FVkVOVF9JRCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVyKG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmNsaWNrZWQpLCBDb21tb25JbnB1dC5PTl9DTElDSywgQ29tbW9uSW5wdXQuSU5QVVRfQ0xJQ0tfRVZFTlRfSUQpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5lcnJvckNsaWNrZWQpLCBDb21tb25JbnB1dC5PTl9DTElDSywgQ29tbW9uSW5wdXQuRVJST1JfQ0xJQ0tfRVZFTlRfSUQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbXBvbmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsaWRhdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gbGlzdGVuZXIgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50SWQgXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBldmVudEZpbHRlciBcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5lciwgZXZlbnROYW1lLCBldmVudElkLCBldmVudEZpbHRlciA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKSwgZXZlbnROYW1lLCBldmVudElkLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICBsZXQgZmlsdGVyZWRMaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIGlmKGV2ZW50RmlsdGVyKSB7IGZpbHRlcmVkTGlzdGVuZXIgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywoZXZlbnQpID0+IHsgaWYoZXZlbnRGaWx0ZXIuY2FsbCh0aGlzLGV2ZW50KSkgeyBsaXN0ZW5lci5jYWxsKGV2ZW50KTsgfSB9KTsgfVxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oZXZlbnRJZCwgZmlsdGVyZWRMaXN0ZW5lciwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFxyXG4gICAgICovXHJcbiAgICBrZXl1cHBlZChldmVudCkge1xyXG4gICAgICAgIGlmICghZXZlbnQuaXNLZXlDb2RlKDEzKSAmJiAhZXZlbnQuaXNLZXlDb2RlKDE2KSAmJiAhZXZlbnQuaXNLZXlDb2RlKDkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdGVuZXJCdW5kbGUuY2FsbEtleVVwKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VkKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyQnVuZGxlLmNhbGxDaGFuZ2UoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrZWQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyQnVuZGxlLmNhbGxDbGljayhldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW50ZXJlZChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdGVuZXJCdW5kbGUuY2FsbEVudGVyKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBibHVycmVkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhaW50ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyQnVuZGxlLmNhbGxCbHVyKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBlcnJvckNsaWNrZWQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyQnVuZGxlLmNhbGxFcnJvckNsaWNrKGV2ZW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpOyB9XHJcbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTsgfVxyXG4gICAgZm9jdXMoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5mb2N1cygpOyB9XHJcbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZWxlY3RBbGwoKTsgfVxyXG4gICAgZW5hYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkuZW5hYmxlKCk7IH1cclxuICAgIGRpc2FibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5kaXNhYmxlKCk7IH1cclxuICAgIGNsZWFyKCkgeyB0aGlzLnRhaW50ZWQgPSBmYWxzZTsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNldFZhbHVlKFwiXCIpOyB9XHJcblxyXG59IiwiaW1wb3J0IHsgRW1haWxWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XHJcbmltcG9ydCB7IExpc3RlbmVyQnVuZGxlIH0gZnJvbSBcIi4uLy4uL2xpc3RlbmVyQnVuZGxlXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRW1haWxJbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbWFpbElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkVtYWlsSW5wdXRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJFbWFpbFwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZW1haWxJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9lbWFpbElucHV0LmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7TGlzdGVuZXJCdW5kbGV9IGxpc3RlbmVyQnVuZGxlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgbGlzdGVuZXJCdW5kbGUgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xyXG5cclxuICAgICAgICBzdXBlcihFbWFpbElucHV0LkNPTVBPTkVOVF9OQU1FLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBtb2RlbCxcclxuICAgICAgICAgICAgbGlzdGVuZXJCdW5kbGUsXHJcbiAgICAgICAgICAgIG5ldyBFbWFpbFZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgICAgICAgXCJlbWFpbElucHV0XCIsXHJcbiAgICAgICAgICAgIFwiZW1haWxFcnJvclwiKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXRcIjtcclxuaW1wb3J0IHsgTGlzdGVuZXJCdW5kbGUgfSBmcm9tIFwiLi4vLi4vbGlzdGVuZXJCdW5kbGVcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZElucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkSW5wdXRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJQYXNzd29yZFwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0LmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7TGlzdGVuZXJCdW5kbGV9IGxpc3RlbmVyQnVuZGxlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgbGlzdGVuZXJCdW5kbGUgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xyXG5cclxuICAgICAgICBzdXBlcihQYXNzd29yZElucHV0LkNPTVBPTkVOVF9OQU1FLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBtb2RlbCxcclxuICAgICAgICAgICAgbGlzdGVuZXJCdW5kbGUsXHJcbiAgICAgICAgICAgIG5ldyBSZXF1aXJlZFZhbGlkYXRvcighbWFuZGF0b3J5KSxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRJbnB1dFwiLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkRXJyb3JcIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQYXNzd29yZFZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uSW5wdXRcIjtcclxuaW1wb3J0IHsgTGlzdGVuZXJCdW5kbGUgfSBmcm9tIFwiLi4vLi4vLi4vbGlzdGVuZXJCdW5kbGVcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUgZXh0ZW5kcyBDb21tb25JbnB1dCB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIjsgfVxyXG4gICAgc3RhdGljIGdldCBERUZBVUxUX1BMQUNFSE9MREVSKCkgeyByZXR1cm4gXCJOZXcgcGFzc3dvcmRcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge0xpc3RlbmVyQnVuZGxlfSBsaXN0ZW5lckJ1bmRsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGxpc3RlbmVyQnVuZGxlID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5DT01QT05FTlRfTkFNRSxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyQnVuZGxlLFxyXG4gICAgICAgICAgICBuZXcgUGFzc3dvcmRWYWxpZGF0b3IobWFuZGF0b3J5KSxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUZpZWxkXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUVycm9yXCIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0XCI7XHJcbmltcG9ydCB7IExpc3RlbmVyQnVuZGxlIH0gZnJvbSBcIi4uLy4uLy4uL2xpc3RlbmVyQnVuZGxlXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCBleHRlbmRzIENvbW1vbklucHV0IHtcclxuICAgIFxyXG4gICAgc3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiQ29uZmlybSBwYXNzd29yZFwiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jc3NcIjsgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7TGlzdGVuZXJCdW5kbGV9IGxpc3RlbmVyQnVuZGxlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWUgPSBudWxsLCBsaXN0ZW5lckJ1bmRsZSA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsXHJcbiAgICAgICAgICAgbWFuZGF0b3J5ID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLkNPTVBPTkVOVF9OQU1FLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBtb2RlbCxcclxuICAgICAgICAgICAgbGlzdGVuZXJCdW5kbGUsXHJcbiAgICAgICAgICAgIG5ldyBFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvcihtYW5kYXRvcnksIGZhbHNlLCBtb2RlbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSksXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEZpZWxkXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sRXJyb3JcIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBcclxuICAgIEFic3RyYWN0VmFsaWRhdG9yLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIEFuZFZhbGlkYXRvclNldFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiO1xyXG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCI7XHJcbmltcG9ydCB7IExpc3RlbmVyQnVuZGxlIH0gZnJvbSBcIi4uLy4uL2xpc3RlbmVyQnVuZGxlXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXQge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQYXNzd29yZE1hdGNoZXJJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZE1hdGNoZXJJbnB1dC5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRyb2xOYW1lXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcclxuICAgICAqIEBwYXJhbSB7TGlzdGVuZXJCdW5kbGV9IGxpc3RlbmVyQnVuZGxlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250cm9sUGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNvbnRyb2xOYW1lLFxyXG4gICAgICAgIG1vZGVsID0gbnVsbCxcclxuICAgICAgICBsaXN0ZW5lckJ1bmRsZSA9IG51bGwsIFxyXG4gICAgICAgIHBsYWNlaG9sZGVyID0gUGFzc3dvcmRNYXRjaGVySW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgXHJcbiAgICAgICAgY29udHJvbFBsYWNlaG9sZGVyID0gUGFzc3dvcmRNYXRjaGVySW5wdXQuREVGQVVMVF9DT05UUk9MX1BMQUNFSE9MREVSLFxyXG4gICAgICAgIG1hbmRhdG9yeSA9IGZhbHNlKSB7XHJcblxyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQ29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7UGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZX0gKi9cclxuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFxyXG4gICAgICAgICAgICBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLCBbbmFtZSwgbW9kZWwsIG5ldyBMaXN0ZW5lckJ1bmRsZSgpLndpdGhFbnRlckxpc3RlbmVyKHRoaXMsIHRoaXMucGFzc3dvcmRFbnRlcmVkKSwgcGxhY2Vob2xkZXIsICBtYW5kYXRvcnldXHJcblx0XHQpO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbH0gKi9cclxuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoXHJcbiAgICAgICAgICAgIFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCwgW2NvbnRyb2xOYW1lLCBtb2RlbCwgbmFtZSwgbGlzdGVuZXJCdW5kbGUsIGNvbnRyb2xQbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxyXG5cdFx0KTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQYXNzd29yZE1hdGNoZXJJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcblxyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYXNzd29yZE1hdGNoZXJJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiLHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5nZXRDb21wb25lbnQoKSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIix0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5nZXRDb21wb25lbnQoKSk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7QW5kVmFsaWRhdG9yU2V0fSAqL1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbmV3IEFuZFZhbGlkYXRvclNldCgpXHJcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5nZXRWYWxpZGF0b3IoKSlcclxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZ2V0VmFsaWRhdG9yKCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwYXNzd29yZEVudGVyZWQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmdldFZhbGlkYXRvcigpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybnMge0Fic3RyYWN0VmFsaWRhdG9yfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWxpZGF0b3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGZvY3VzKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZm9jdXMoKTsgfVxyXG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuc2VsZWN0QWxsKCk7IH1cclxuICAgIGVuYWJsZSgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmVuYWJsZSgpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5lbmFibGUoKTsgfVxyXG4gICAgZGlzYWJsZSgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmRpc2FibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZGlzYWJsZSgpOyB9XHJcbiAgICBjbGVhcigpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNsZWFyKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNsZWFyKCk7IH1cclxufSIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dFwiO1xyXG5pbXBvcnQgeyBQaG9uZVZhbGlkYXRvciB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMaXN0ZW5lckJ1bmRsZSB9IGZyb20gXCIuLi8uLi9saXN0ZW5lckJ1bmRsZVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBob25lSW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGhvbmVJbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQaG9uZUlucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgREVGQVVMVF9QTEFDRUhPTERFUigpIHsgcmV0dXJuIFwiUGhvbmVcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bob25lSW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGhvbmVJbnB1dC5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXHJcbiAgICAgKiBAcGFyYW0ge0xpc3RlbmVyQnVuZGxlfSBsaXN0ZW5lckJ1bmRsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGxpc3RlbmVyQnVuZGxlID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoUGhvbmVJbnB1dC5DT01QT05FTlRfTkFNRSxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyQnVuZGxlLFxyXG4gICAgICAgICAgICBuZXcgUGhvbmVWYWxpZGF0b3IobWFuZGF0b3J5LCAhbWFuZGF0b3J5KSxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIFwicGhvbmVJbnB1dFwiLFxyXG4gICAgICAgICAgICBcInBob25lRXJyb3JcIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXRcIjtcclxuaW1wb3J0IHsgUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTGlzdGVuZXJCdW5kbGUgfSBmcm9tIFwiLi4vLi4vbGlzdGVuZXJCdW5kbGVcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUZXh0SW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xyXG5cclxuICAgIHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlRleHRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IERFRkFVTFRfUExBQ0VIT0xERVIoKSB7IHJldHVybiBcIlRleHRcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RleHRJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90ZXh0SW5wdXQuY3NzXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHtMaXN0ZW5lckJ1bmRsZX0gbGlzdGVuZXJCdW5kbGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBsaXN0ZW5lckJ1bmRsZSA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKFRleHRJbnB1dC5DT01QT05FTlRfTkFNRSxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyQnVuZGxlLFxyXG4gICAgICAgICAgICBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoIW1hbmRhdG9yeSksXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICBcInRleHRJbnB1dFwiLFxyXG4gICAgICAgICAgICBcInRleHRFcnJvclwiKTtcclxuICAgIH1cclxuXHJcbn0iXSwibmFtZXMiOlsiTE9HIiwiVGV4dElucHV0Il0sIm1hcHBpbmdzIjoiOzs7O0FBV0EsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXBDLE1BQWEsU0FBUyxDQUFDOztDQUV0QixXQUFXLGNBQWMsR0FBRyxFQUFFLE9BQU8sV0FBVyxDQUFDLEVBQUU7Q0FDbkQsV0FBVyxZQUFZLEdBQUcsRUFBRSxPQUFPLHVDQUF1QyxDQUFDLEVBQUU7SUFDMUUsV0FBVyxVQUFVLEdBQUcsRUFBRSxPQUFPLHNDQUFzQyxDQUFDLEVBQUU7Ozs7O0lBSzFFLFdBQVcsRUFBRTs7O1FBR1QsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7UUFHNUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7O1FBR2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0VBQzVCOztJQUVFLFVBQVUsR0FBRztRQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzlEOzs7Ozs7SUFNRCxZQUFZLENBQUMsU0FBUyxFQUFFO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0tBQzlCOzs7OztDQUtKLFlBQVksRUFBRTtFQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNuQjs7Ozs7O0lBTUQsaUJBQWlCLENBQUMsZUFBZSxFQUFFO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUN0SSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDM0csT0FBTyxJQUFJLENBQUM7S0FDZjs7SUFFRCxZQUFZLENBQUMsWUFBWSxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ25GLFVBQVUsQ0FBQyxNQUFNO1lBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDakIsVUFBVSxDQUFDLE1BQU07WUFDYixZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN2RCxFQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN4Qjs7SUFFRCxPQUFPLEdBQUc7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFCOztJQUVELE1BQU0sR0FBRztRQUNMLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEUsVUFBVSxDQUFDLE1BQU07WUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBQztTQUMxRixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7O0lBRUQsU0FBUyxHQUFHO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNuRCxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDaEQsSUFBSTtnQkFDRCxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7YUFDdkU7U0FDSjtLQUNKOztJQUVELFVBQVUsR0FBRztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNoQzs7OztDQUVKLEtDOUZLQSxLQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRXhDLE1BQWEsYUFBYSxDQUFDOztDQUUxQixXQUFXLGNBQWMsR0FBRyxFQUFFLE9BQU8sZUFBZSxDQUFDLEVBQUU7SUFDcEQsV0FBVyxZQUFZLEdBQUcsRUFBRSxPQUFPLDJDQUEyQyxDQUFDLEVBQUU7SUFDakYsV0FBVyxVQUFVLEdBQUcsRUFBRSxPQUFPLDBDQUEwQyxDQUFDLEVBQUU7O0lBRTlFLFdBQVcsVUFBVSxHQUFHLEVBQUUsT0FBTyxzQkFBc0IsQ0FBQyxFQUFFO0lBQzFELFdBQVcsU0FBUyxHQUFHLEVBQUUsT0FBTyxxQkFBcUIsQ0FBQyxFQUFFO0lBQ3hELFdBQVcsWUFBWSxHQUFHLEVBQUUsT0FBTyx3QkFBd0IsQ0FBQyxFQUFFO0lBQzlELFdBQVcsWUFBWSxHQUFHLEVBQUUsT0FBTyx3QkFBd0IsQ0FBQyxFQUFFOztJQUU5RCxXQUFXLGtCQUFrQixHQUFHLEVBQUUsT0FBTyw2QkFBNkIsQ0FBQyxFQUFFO0lBQ3pFLFdBQVcsaUJBQWlCLEdBQUcsRUFBRSxPQUFPLDRCQUE0QixDQUFDLEVBQUU7SUFDdkUsV0FBVyxrQkFBa0IsR0FBRyxFQUFFLE9BQU8sNkJBQTZCLENBQUMsRUFBRTtJQUN6RSxXQUFXLGlCQUFpQixHQUFHLEVBQUUsT0FBTyw0QkFBNEIsQ0FBQyxFQUFFOzs7Ozs7OztJQVF2RSxXQUFXLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxhQUFhLENBQUMsWUFBWSxFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUUsV0FBVyxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRTs7O1FBRzdILElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7UUFHdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7OztRQUczQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzs7UUFHbEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7OztRQUc3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7O1FBRy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O1FBRzVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDOzs7UUFHM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7O0tBRTlCOztJQUVELFVBQVUsR0FBRztRQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLFNBQVMsRUFBRSx5Q0FBeUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNwSyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyx5Q0FBeUMsRUFBRSxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0tBQ2hKOztDQUVKLFlBQVksRUFBRTtFQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNuQjs7SUFFRCxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ25FOztJQUVELFVBQVUsQ0FBQyxPQUFPLEVBQUU7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7SUFNRCxNQUFNLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN2Qzs7Ozs7O0lBTUQsTUFBTSxDQUFDLGNBQWMsRUFBRTtRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztLQUN4Qzs7Ozs7O0lBTUQsTUFBTSxDQUFDLGNBQWMsRUFBRTtRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztLQUN4Qzs7SUFFRCxJQUFJLEdBQUc7UUFDSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEksVUFBVSxDQUFDLE1BQU07WUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUU7UUFDbEMsVUFBVSxDQUFDLE1BQU07WUFDYixZQUFZLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7U0FDL0YsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNQLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzlCO0tBQ0o7O0lBRUQsSUFBSSxHQUFHO1FBQ0gsWUFBWSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRSxVQUFVLENBQUMsTUFBTTtZQUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLHNCQUFzQixHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtTQUM1SSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDOUI7S0FDSjs7OztDQUVKLEtDaklZLGNBQWMsQ0FBQzs7SUFFeEIsV0FBVyxHQUFHOztLQUViOzs7Ozs7O0lBT0QsaUJBQWlCLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRTtRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksY0FBYyxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RSxPQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7O0lBT0Qsc0JBQXNCLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRTtRQUNqRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFPRCxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFPRCxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFPRCxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxjQUFjLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFPRCxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFPRCxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7O0lBRUQsU0FBUyxDQUFDLEtBQUssRUFBRTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNoRDs7SUFFRCxjQUFjLENBQUMsS0FBSyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JEOztJQUVELFNBQVMsQ0FBQyxLQUFLLEVBQUU7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDaEQ7O0lBRUQsU0FBUyxDQUFDLEtBQUssRUFBRTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNoRDs7SUFFRCxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQy9DOztJQUVELFVBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDakQ7O0lBRUQsU0FBUyxDQUFDLEtBQUssRUFBRTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNoRDs7Ozs7OztJQU9ELFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO1FBQzFCLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO0tBQ0o7OztDQUNKLEtDNUdLQSxLQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWpDLE1BQWEsTUFBTSxDQUFDOztDQUVuQixXQUFXLGNBQWMsR0FBRyxFQUFFLE9BQU8sUUFBUSxDQUFDLEVBQUU7SUFDN0MsV0FBVyxZQUFZLEdBQUcsRUFBRSxPQUFPLG9DQUFvQyxDQUFDLEVBQUU7SUFDMUUsV0FBVyxVQUFVLEdBQUcsRUFBRSxPQUFPLG1DQUFtQyxDQUFDLEVBQUU7O0lBRXZFLFdBQVcsWUFBWSxHQUFHLEVBQUUsT0FBTyxnQkFBZ0IsQ0FBQyxFQUFFO0lBQ3RELFdBQVcsY0FBYyxHQUFHLEVBQUUsT0FBTyxrQkFBa0IsQ0FBQyxFQUFFO0lBQzFELFdBQVcsWUFBWSxHQUFHLEVBQUUsT0FBTyxnQkFBZ0IsQ0FBQyxFQUFFO0lBQ3RELFdBQVcsU0FBUyxHQUFHLEVBQUUsT0FBTyxhQUFhLENBQUMsRUFBRTtJQUNoRCxXQUFXLFlBQVksR0FBRyxFQUFFLE9BQU8sZ0JBQWdCLENBQUMsRUFBRTtJQUN0RCxXQUFXLFdBQVcsR0FBRyxFQUFFLE9BQU8sZUFBZSxDQUFDLEVBQUU7SUFDcEQsV0FBVyxVQUFVLEdBQUcsRUFBRSxPQUFPLGNBQWMsQ0FBQyxFQUFFO0lBQ2xELFdBQVcsU0FBUyxHQUFHLEVBQUUsT0FBTyxhQUFhLENBQUMsRUFBRTs7Ozs7Ozs7SUFRaEQsV0FBVyxDQUFDLEtBQUssRUFBRSxjQUFjLEdBQUcsSUFBSSxFQUFFLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFOzs7UUFHeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7OztRQUduQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxJQUFJLGNBQWMsSUFBSSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQzs7O1FBR3ZGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7OztRQUdsRSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7O1FBRzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUMvRDs7SUFFRCxVQUFVLEdBQUc7UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztLQUNoQzs7Q0FFSixZQUFZLEVBQUU7RUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDbkI7Ozs7OztJQU1ELHFCQUFxQixHQUFHO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNoSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQy9ILE9BQU8sSUFBSSxDQUFDO0tBQ2Y7O0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRTtRQUNYLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hDOztJQUVELGFBQWEsR0FBRztRQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztLQUM3Rzs7SUFFRCxjQUFjLEdBQUc7UUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDNUc7O0lBRUQsT0FBTyxHQUFHO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUU7O0lBRUQsTUFBTSxHQUFHO1FBQ0wsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDakU7OztDQUNKLEtDN0VLQSxLQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXBDLE1BQWEsU0FBUyxDQUFDOztDQUV0QixXQUFXLGNBQWMsR0FBRyxFQUFFLE9BQU8sV0FBVyxDQUFDLEVBQUU7SUFDaEQsV0FBVyxZQUFZLEdBQUcsRUFBRSxPQUFPLHVDQUF1QyxDQUFDLEVBQUU7SUFDN0UsV0FBVyxVQUFVLEdBQUcsRUFBRSxPQUFPLHNDQUFzQyxDQUFDLEVBQUU7Ozs7O0lBSzFFLFdBQVcsRUFBRTs7O0VBR2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7UUFHdEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7O1FBR2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzs7UUFHdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7UUFHcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7UUFHOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7S0FDekI7O0lBRUQsVUFBVSxHQUFHO1FBQ1RBLEtBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxTQUFTLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDcEksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUMxSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTO2FBQzFCLGlCQUFpQixDQUFDLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUMvRDs7Ozs7O0lBTUQsWUFBWSxDQUFDLFNBQVMsRUFBRTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDL0M7Ozs7OztDQU1KLFlBQVksRUFBRTtFQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNuQjs7Ozs7O0lBTUQsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9DOzs7Ozs7SUFNRCxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUNyRDs7Ozs7O0lBTUQsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNyRDs7Q0FFSixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtFQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pDOztJQUVFLElBQUksR0FBRztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztRQUVqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25GLFVBQVUsQ0FBQyxNQUFNO1lBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUCxVQUFVLENBQUMsTUFBTTtZQUNiLFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztTQUMzRixDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ1Y7O0lBRUQsSUFBSSxHQUFHO1FBQ0gsWUFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztRQUVqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDOztRQUV4QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsVUFBVSxDQUFDLE1BQU07WUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxFQUFFO1NBQzVGLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDVjs7Ozs7SUFLRCxTQUFTLEdBQUc7UUFDUixHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2xELEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUNoRCxJQUFJO2dCQUNELFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzthQUN2RTtTQUNKO0tBQ0o7O0lBRUQsVUFBVSxHQUFHO1FBQ1QsWUFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNwQzs7O0NBQ0osS0N0SUtBLEtBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFbkMsTUFBYSxRQUFRLENBQUM7O0NBRXJCLFdBQVcsY0FBYyxHQUFHLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRTtJQUMvQyxXQUFXLFlBQVksR0FBRyxFQUFFLE9BQU8sc0NBQXNDLENBQUMsRUFBRTtJQUM1RSxXQUFXLFVBQVUsR0FBRyxFQUFFLE9BQU8scUNBQXFDLENBQUMsRUFBRTs7Ozs7OztJQU96RSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsY0FBYyxHQUFHLElBQUksRUFBRTs7O1FBR25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7UUFHakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7OztRQUduQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7O1FBR3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLElBQUksY0FBYyxJQUFJLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDOzs7UUFHdkYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7O1FBR2xFLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7S0FFL0Q7O0lBRUQsVUFBVSxHQUFHO1FBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RSxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUVuRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQy9FO0tBQ0o7O0NBRUosWUFBWSxFQUFFO0VBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ25COzs7O0NBRUosS0N2RFksV0FBVyxDQUFDOztJQUVyQixXQUFXLG9CQUFvQixHQUFHLEVBQUUsT0FBTyxzQkFBc0IsQ0FBQyxFQUFFO0lBQ3BFLFdBQVcsb0JBQW9CLEdBQUcsRUFBRSxPQUFPLG9CQUFvQixDQUFDLEVBQUU7SUFDbEUsV0FBVyxvQkFBb0IsR0FBRyxFQUFFLE9BQU8sb0JBQW9CLENBQUMsRUFBRTtJQUNsRSxXQUFXLHFCQUFxQixHQUFHLEVBQUUsT0FBTyxxQkFBcUIsQ0FBQyxFQUFFO0lBQ3BFLFdBQVcsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLG1CQUFtQixDQUFDLEVBQUU7SUFDaEUsV0FBVyxvQkFBb0IsR0FBRyxFQUFFLE9BQU8sc0JBQXNCLENBQUMsRUFBRTs7SUFFcEUsV0FBVyxRQUFRLEdBQUcsRUFBRSxPQUFPLFNBQVMsQ0FBQyxFQUFFO0lBQzNDLFdBQVcsUUFBUSxHQUFHLEVBQUUsT0FBTyxTQUFTLENBQUMsRUFBRTtJQUMzQyxXQUFXLFNBQVMsR0FBRyxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUU7SUFDN0MsV0FBVyxPQUFPLEdBQUcsRUFBRSxPQUFPLFFBQVEsQ0FBQyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7SUFlekMsV0FBVyxDQUFDLGFBQWE7UUFDckIsSUFBSTtRQUNKLEtBQUssR0FBRyxJQUFJO1FBQ1osY0FBYyxHQUFHLElBQUk7UUFDckIsU0FBUyxHQUFHLElBQUk7UUFDaEIsV0FBVyxHQUFHLElBQUk7UUFDbEIsY0FBYyxHQUFHLE9BQU87UUFDeEIsY0FBYyxHQUFHLE9BQU8sRUFBRTs7O1FBRzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDOzs7UUFHbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7OztRQUdqQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7O1FBRy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDOzs7UUFHckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7OztRQUdyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7O1FBR25CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOzs7UUFHM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksSUFBSSxjQUFjLElBQUksY0FBYyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7OztRQUd2RixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzs7UUFHbEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7UUFHNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7S0FDeEI7O0lBRUQsVUFBVSxHQUFHO1FBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7UUFFbEUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDOztRQUVqRixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFFM0YsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUN2Rjs7UUFFRCxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1NBQ3hHOztRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixFQUFFLENBQUMsS0FBSyxLQUFLLEVBQUUsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ25LLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdkgsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN4SCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3BILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdEgsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUM5SDs7SUFFRCxZQUFZLEdBQUc7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7O0lBRUQsWUFBWSxHQUFHO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3pCOzs7Ozs7Ozs7SUFTRCxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxXQUFXLEdBQUcsSUFBSSxFQUFFO1FBQy9ELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQzNILElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLEdBQUcsV0FBVyxFQUFFLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQzFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUN6RixPQUFPLElBQUksQ0FBQztLQUNmOzs7Ozs7SUFNRCxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hDOztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUU7UUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qzs7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEM7O0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4Qzs7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN2Qzs7SUFFRCxZQUFZLENBQUMsS0FBSyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzdDOzs7SUFHRCxtQkFBbUIsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7SUFDL0YsbUJBQW1CLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFO0lBQzlGLEtBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO0lBQzVELFNBQVMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFO0lBQ3BFLE1BQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBQzlELE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO0lBQ2hFLEtBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFOzs7O0NBRTFGLEtDNUtLQSxLQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRTlCLE1BQU0sVUFBVSxTQUFTLFdBQVcsQ0FBQzs7SUFFeEMsV0FBVyxjQUFjLEdBQUcsRUFBRSxPQUFPLFlBQVksQ0FBQyxFQUFFO0lBQ3BELFdBQVcsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLE9BQU8sQ0FBQyxFQUFFOztJQUVwRCxXQUFXLFlBQVksR0FBRyxFQUFFLE9BQU8sd0NBQXdDLENBQUMsRUFBRTtJQUM5RSxXQUFXLFVBQVUsR0FBRyxFQUFFLE9BQU8sdUNBQXVDLENBQUMsRUFBRTs7Ozs7Ozs7OztJQVUzRSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsY0FBYyxHQUFHLElBQUksRUFBRSxXQUFXLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUU7O1FBRW5ILEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYztZQUMzQixJQUFJO1lBQ0osS0FBSztZQUNMLGNBQWM7WUFDZCxJQUFJLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDekMsV0FBVztZQUNYLFlBQVk7WUFDWixZQUFZLENBQUMsQ0FBQztLQUNyQjs7OztDQUVKLEtDOUJLQSxLQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRWpDLE1BQU0sYUFBYSxTQUFTLFdBQVcsQ0FBQzs7SUFFM0MsV0FBVyxjQUFjLEdBQUcsRUFBRSxPQUFPLGVBQWUsQ0FBQyxFQUFFO0lBQ3ZELFdBQVcsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFOztJQUV2RCxXQUFXLFlBQVksR0FBRyxFQUFFLE9BQU8sMkNBQTJDLENBQUMsRUFBRTtJQUNqRixXQUFXLFVBQVUsR0FBRyxFQUFFLE9BQU8sMENBQTBDLENBQUMsRUFBRTs7Ozs7Ozs7OztJQVU5RSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsY0FBYyxHQUFHLElBQUksRUFBRSxXQUFXLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUU7O1FBRW5ILEtBQUssQ0FBQyxhQUFhLENBQUMsY0FBYztZQUM5QixJQUFJO1lBQ0osS0FBSztZQUNMLGNBQWM7WUFDZCxJQUFJLGlCQUFpQixDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ2pDLFdBQVc7WUFDWCxlQUFlO1lBQ2YsZUFBZSxDQUFDLENBQUM7S0FDeEI7OztDQUNKLEtDN0JLQSxLQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs7QUFFN0MsTUFBTSx5QkFBeUIsU0FBUyxXQUFXLENBQUM7O0lBRXZELFdBQVcsY0FBYyxHQUFHLEVBQUUsT0FBTywyQkFBMkIsQ0FBQyxFQUFFO0lBQ25FLFdBQVcsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLGNBQWMsQ0FBQyxFQUFFOztJQUUzRCxXQUFXLFlBQVksR0FBRyxFQUFFLE9BQU8sdURBQXVELENBQUMsRUFBRTtJQUM3RixXQUFXLFVBQVUsR0FBRyxFQUFFLE9BQU8sc0RBQXNELENBQUMsRUFBRTs7Ozs7Ozs7OztJQVUxRixXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsY0FBYyxHQUFHLElBQUksRUFBRSxXQUFXLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUU7O1FBRW5ILEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjO1lBQzFDLElBQUk7WUFDSixLQUFLO1lBQ0wsY0FBYztZQUNkLElBQUksaUJBQWlCLENBQUMsU0FBUyxDQUFDO1lBQ2hDLFdBQVc7WUFDWCxnQ0FBZ0M7WUFDaEMsZ0NBQWdDLENBQUMsQ0FBQztLQUN6Qzs7O0NBQ0osS0M3QktBLEtBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOztBQUUvQyxNQUFNLDJCQUEyQixTQUFTLFdBQVcsQ0FBQzs7SUFFekQsV0FBVyxjQUFjLEdBQUcsRUFBRSxPQUFPLDZCQUE2QixDQUFDLEVBQUU7SUFDckUsV0FBVyxtQkFBbUIsR0FBRyxFQUFFLE9BQU8sa0JBQWtCLENBQUMsRUFBRTs7SUFFL0QsV0FBVyxZQUFZLEdBQUcsRUFBRSxPQUFPLHlEQUF5RCxDQUFDLEVBQUU7SUFDL0YsV0FBVyxVQUFVLEdBQUcsRUFBRSxPQUFPLHdEQUF3RCxDQUFDLEVBQUU7Ozs7Ozs7Ozs7Ozs7SUFhNUYsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLHlCQUF5QixHQUFHLElBQUksRUFBRSxjQUFjLEdBQUcsSUFBSSxFQUFFLFdBQVcsR0FBRyxTQUFTLENBQUMsbUJBQW1CO1dBQzdILFNBQVMsR0FBRyxLQUFLLEVBQUU7O1FBRXRCLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxjQUFjO1lBQzVDLElBQUk7WUFDSixLQUFLO1lBQ0wsY0FBYztZQUNkLElBQUksdUJBQXVCLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUseUJBQXlCLENBQUM7WUFDL0UsV0FBVztZQUNYLGtDQUFrQztZQUNsQyxrQ0FBa0MsQ0FBQyxDQUFDO0tBQzNDOzs7Q0FDSixLQzFCS0EsS0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7O0FBRS9DLE1BQWEsb0JBQW9CLENBQUM7O0NBRWpDLFdBQVcsY0FBYyxHQUFHLEVBQUUsT0FBTyxzQkFBc0IsQ0FBQyxFQUFFO0lBQzNELFdBQVcsWUFBWSxHQUFHLEVBQUUsT0FBTyxrREFBa0QsQ0FBQyxFQUFFO0lBQ3hGLFdBQVcsVUFBVSxHQUFHLEVBQUUsT0FBTyxpREFBaUQsQ0FBQyxFQUFFOzs7Ozs7Ozs7Ozs7SUFZckYsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXO1FBQ3pCLEtBQUssR0FBRyxJQUFJO1FBQ1osY0FBYyxHQUFHLElBQUk7UUFDckIsV0FBVyxHQUFHLG9CQUFvQixDQUFDLG1CQUFtQjtRQUN0RCxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQywyQkFBMkI7UUFDckUsU0FBUyxHQUFHLEtBQUssRUFBRTs7OztRQUluQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzs7RUFHeEUsSUFBSSxDQUFDLHlCQUF5QixHQUFHLGNBQWMsQ0FBQyxRQUFRO1lBQzlDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLGNBQWMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsV0FBVyxHQUFHLFNBQVMsQ0FBQztHQUM5SSxDQUFDOzs7RUFHRixJQUFJLENBQUMsMkJBQTJCLEdBQUcsY0FBYyxDQUFDLFFBQVE7WUFDaEQsMkJBQTJCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxDQUFDO0dBQy9HLENBQUM7S0FDQzs7SUFFRCxVQUFVLEdBQUc7UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7O1FBRW5GLFlBQVksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7O1FBRTlELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ25HLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDOzs7UUFHdkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsRUFBRTthQUNqQyxhQUFhLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzVELGFBQWEsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzs7S0FFdkU7O0lBRUQsZUFBZSxHQUFHO1FBQ2QsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzVDO0tBQ0o7O0NBRUosWUFBWSxHQUFHO0VBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ25COzs7OztJQUtELFlBQVksR0FBRztRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN6Qjs7SUFFRCxLQUFLLEdBQUcsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtJQUNuRCxTQUFTLEdBQUcsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRTtJQUMzRCxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtJQUNoRyxPQUFPLEdBQUcsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtJQUNuRyxLQUFLLEdBQUcsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTs7O0NBQ2hHLEtDcEZLQSxLQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRTlCLE1BQU0sVUFBVSxTQUFTLFdBQVcsQ0FBQzs7SUFFeEMsV0FBVyxjQUFjLEdBQUcsRUFBRSxPQUFPLFlBQVksQ0FBQyxFQUFFO0lBQ3BELFdBQVcsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLE9BQU8sQ0FBQyxFQUFFOztJQUVwRCxXQUFXLFlBQVksR0FBRyxFQUFFLE9BQU8sd0NBQXdDLENBQUMsRUFBRTtJQUM5RSxXQUFXLFVBQVUsR0FBRyxFQUFFLE9BQU8sdUNBQXVDLENBQUMsRUFBRTs7Ozs7Ozs7OztJQVUzRSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsY0FBYyxHQUFHLElBQUksRUFBRSxXQUFXLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUU7O1FBRW5ILEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYztZQUMzQixJQUFJO1lBQ0osS0FBSztZQUNMLGNBQWM7WUFDZCxJQUFJLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDekMsV0FBVztZQUNYLFlBQVk7WUFDWixZQUFZLENBQUMsQ0FBQztLQUNyQjs7O0NBQ0osS0M3QktBLEtBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFN0IsTUFBTUMsV0FBUyxTQUFTLFdBQVcsQ0FBQzs7SUFFdkMsV0FBVyxjQUFjLEdBQUcsRUFBRSxPQUFPLFdBQVcsQ0FBQyxFQUFFO0lBQ25ELFdBQVcsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLE1BQU0sQ0FBQyxFQUFFOztJQUVuRCxXQUFXLFlBQVksR0FBRyxFQUFFLE9BQU8sdUNBQXVDLENBQUMsRUFBRTtJQUM3RSxXQUFXLFVBQVUsR0FBRyxFQUFFLE9BQU8sc0NBQXNDLENBQUMsRUFBRTs7Ozs7Ozs7OztJQVUxRSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsY0FBYyxHQUFHLElBQUksRUFBRSxXQUFXLEdBQUdBLFdBQVMsQ0FBQyxtQkFBbUIsRUFBRSxTQUFTLEdBQUcsS0FBSyxFQUFFOztRQUVuSCxLQUFLLENBQUNBLFdBQVMsQ0FBQyxjQUFjO1lBQzFCLElBQUk7WUFDSixLQUFLO1lBQ0wsY0FBYztZQUNkLElBQUksaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDakMsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXLENBQUMsQ0FBQztLQUNwQjs7OzsifQ==
