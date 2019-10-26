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
        this.eventRegistry = justright_core_v1.EventRegistry;

        /** @type {ComponentFactory} */
        this.componentFactory = justright_core_v1.ComponentFactory;
	}

    createComponent() {
        LOG.info("creating component");
        this.component = this.componentFactory.create("BackShade");
    }

    postConfig() {

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
        if(!this.getComponent().getRootElement().isMounted()) {
            justright_core_v1.CanvasRoot.addBodyElement(this.getComponent().getRootElement());
        }
    }

    removeSelf() {
        this.getComponent().remove();
    }
    
}

const LOG$1 = new coreutil_v1.Logger("Button");

class Button {

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
    constructor(label, buttonType = Button.TYPE_PRIMARY) {

        /** @type {string} */
        this.label = label;

        /** @type {ComponentFactory} */
        this.componentFactory = justright_core_v1.ComponentFactory;

        /** @type {string} */
        this.buttonType = buttonType;

        /** @type {EventRegistry} */
        this.eventRegistry = justright_core_v1.EventRegistry;
    }

    createComponent() {
        this.component = this.componentFactory.create("Button");
    }

    postConfig() {
        justright_core_v1.CanvasStyles.enableStyle(Button.COMPONENT_NAME);
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

const LOG$2 = new coreutil_v1.Logger("DialogBox");

class DialogBox {

	static get COMPONENT_NAME() { return "DialogBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/dialogBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/dialogBox.css"; }
    
    /**
     * 
     */
    constructor(){

		/** @type {EventRegistry} */
		this.eventRegistry = justright_core_v1.EventRegistry;

        /** @type {ComponentFactory} */
        this.componentFactory = justright_core_v1.ComponentFactory;

        /** @type {Injector} */
        this.injector = mindi_v1.Injector;

		/** @type {Component} */
        this.component = null;
        
        /** @type {BackShade} */
        this.backShade = null;

        /** @type {StylesRegistry} */
        this.stylesRegistry = justright_core_v1.StylesRegistry;
	}

    createComponent() {
        LOG$2.info("creating component");
        this.component = this.componentFactory.create("DialogBox");
    }

    postConfig() {
        this.eventRegistry.attach(this.component.get("closeButton"), "onclick", "//event:closeClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:closeClicked", new coreutil_v1.ObjectFunction(this, this.hide),this.component.getComponentIndex());
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
        this.initBackShade();
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
        this.initBackShade();
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
            justright_core_v1.CanvasRoot.addBodyElement(this.getComponent().getRootElement());
        }
    }

    initBackShade() {
        if(!this.backShade) {
            this.backShade = this.injector.prototypeInstance(BackShade)
                .withClickListener(new coreutil_v1.ObjectFunction(this, this.hide));
            this.backShade.mountSelf();
        }
    }

    removeSelf() {
        justright_core_v1.CanvasStyles.removeStyle(DialogBox.COMPONENT_NAME);
        this.getComponent().removeSelf();
    }
}

const LOG$3 = new coreutil_v1.Logger("CheckBox");

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
        this.componentFactory = justright_core_v1.ComponentFactory;

        /** @type {EventRegistry} */
        this.eventRegistry = justright_core_v1.EventRegistry;

        /** @type {DataBindRegistry} */
        this.dataBindRegistry = justright_core_v1.DataBindRegistry;

        /** @type {string} */
        this.name = name;
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("CheckBox");
    }

    postConfig() {
        justright_core_v1.CanvasStyles.enableStyle(CheckBox.COMPONENT_NAME);
        this.component.get("checkBox").setAttributeValue("name",this.name);
    }

	getComponent(){
		return this.component;
    }

    withModel(model, validator) {
        this.dataBindRegistry
            .add(justright_core_v1.InputElementDataBinding.link(model, validator).to(this.component.get("checkBox")));
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

const LOG$4 = new coreutil_v1.Logger("EmailInput");

class EmailInput {

	static get COMPONENT_NAME() { return "EmailInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        /** @type {ComponentFactory} */
        this.componentFactory = justright_core_v1.ComponentFactory;

        /** @type {EventRegistry} */
        this.eventRegistry = justright_core_v1.EventRegistry;

        /** @type {DataBindRegistry} */
        this.dataBindRegistry = justright_core_v1.DataBindRegistry;

        this.name = name;

        this.validator = new justright_core_v1.EmailValidator()
            .withValidListener(new coreutil_v1.ObjectFunction(this, this.hideValidationError));
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("EmailInput");
    }

    postConfig() {
        justright_core_v1.CanvasStyles.enableStyle(EmailInput.COMPONENT_NAME);

        let idx = this.component.getComponentIndex();
        let emailInput = this.component.get("emailInput");
        let emailError = this.component.get("emailError");

        emailInput.setAttributeValue("name",this.name);

        this.eventRegistry.attach(emailInput, "onblur", "//event:emailInputBlur", idx);
        this.eventRegistry.attach(emailError, "onclick", "//event:emailErrorClicked", idx);
        this.eventRegistry.attach(emailInput, "onkeyup", "//event:emailInputEnter", idx);

        this.eventRegistry.listen("//event:emailInputBlur", new coreutil_v1.ObjectFunction(this, this.emailInputBlurred), idx);

        this.eventRegistry.listen("//event:emailErrorClicked", new coreutil_v1.ObjectFunction(this, this.hideValidationError), idx);

        let enterCheck = new coreutil_v1.ObjectFunction(this, (event) => {
            if (event.getKeyCode() === 13 && !this.validator.isValid()) {
                this.showValidationError();
                this.selectAll();
            }
        });
        this.eventRegistry.listen("//event:emailInputEnter", enterCheck, idx);
    }

	getComponent(){
		return this.component;
    }

    /**
     * @returns {AbstractValidator}
     */
    getValidator() {
        return this.validator;
    }

    withModel(model) {
        this.dataBindRegistry.add(
            justright_core_v1.InputElementDataBinding
                .link(model, this.validator)
                .to(this.component.get("emailInput"))
        );
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get("emailInput").setAttributeValue("placeholder",placeholderValue);
        return this;
    }

    withEnterListener(listener) {
        let enterCheck = new coreutil_v1.ObjectFunction(this, (event) => { if (event.getKeyCode() === 13 && this.validator.isValid()) { listener.call(); } });
        this.eventRegistry.listen("//event:emailInputEnter", enterCheck, this.component.getComponentIndex());
        return this;
    }

    emailInputBlurred() {
        if(this.validator.isValid()) {
            this.hideValidationError();
        } else {
            this.showValidationError();
        }
    }

    showValidationError() {
        this.component.get("emailError").setStyle("display","block");
    }
    
    hideValidationError() {
        this.component.get("emailError").setStyle("display","none");
    }

    focus() {
        this.component.get("emailInput").focus();
    }

    selectAll() {
        this.component.get("emailInput").selectAll();
    }

}

const LOG$5 = new coreutil_v1.Logger("PasswordInput");

class PasswordInput {

	static get COMPONENT_NAME() { return "PasswordInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        /** @type {ComponentFactory} */
        this.componentFactory = justright_core_v1.ComponentFactory;

        /** @type {EventRegistry} */
        this.eventRegistry = justright_core_v1.EventRegistry;

        /** @type {DataBindRegistry} */
        this.dataBindRegistry = justright_core_v1.DataBindRegistry;

        this.name = name;

        this.validator = new justright_core_v1.RequiredValidator()
            .withValidListener(new coreutil_v1.ObjectFunction(this, this.hideValidationError));
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("PasswordInput");
    }

    postConfig() {
        justright_core_v1.CanvasStyles.enableStyle(PasswordInput.COMPONENT_NAME);

        let idx = this.component.getComponentIndex();
        let passwordInput = this.component.get("passwordInput");
        let passwordError = this.component.get("passwordError");

        passwordInput.setAttributeValue("name",this.name);

        this.eventRegistry.attach(passwordInput, "onblur", "//event:passwordInputBlur", idx);
        this.eventRegistry.attach(passwordError, "onclick", "//event:passwordErrorClicked", idx);
        this.eventRegistry.attach(passwordInput, "onkeyup", "//event:passwordInputEnter", idx);

        this.eventRegistry.listen("//event:passwordInputBlur", new coreutil_v1.ObjectFunction(this, this.passwordInputBlurred), idx);

        this.eventRegistry.listen("//event:passwordErrorClicked", new coreutil_v1.ObjectFunction(this, this.hideValidationError), idx);

        let enterCheck = new coreutil_v1.ObjectFunction(this, (event) => {
            if (event.getKeyCode() === 13 && !this.validator.isValid()) {
                this.showValidationError();
                this.selectAll();
            }
        });
        this.eventRegistry.listen("//event:passwordInputEnter", enterCheck, this.component.getComponentIndex());
    }

	getComponent(){
		return this.component;
    }

    /**
     * @returns {AbstractValidator}
     */
    getValidator() {
        return this.validator;
    }

    withModel(model) {
        this.dataBindRegistry.add(
            justright_core_v1.InputElementDataBinding
                .link(model, this.validator)
                .to(this.component.get("passwordInput"))
        );
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get("passwordInput").setAttributeValue("placeholder",placeholderValue);
        return this;
    }

    withEnterListener(listener) {
        this.eventRegistry.attach(this.component.get("passwordInput"), "onkeyup", "//event:passwordInputEnter", this.component.getComponentIndex());
        let enterCheck = new coreutil_v1.ObjectFunction(this,(event) => { if(event.getKeyCode() === 13 && this.validator.isValid()) { listener.call(); } });
        this.eventRegistry.listen("//event:passwordInputEnter", enterCheck, this.component.getComponentIndex());
        return this;
    }

    passwordInputBlurred() {
        if(this.validator.isValid()) {
            this.hideValidationError();
        } else {
            this.showValidationError();
        }
    }

    showValidationError() {
        this.component.get("passwordError").setStyle("display","block");
    }
    
    hideValidationError() {
        this.component.get("passwordError").setStyle("display","none");
    }

    focus() {
        this.component.get("passwordInput").focus();
    }

    selectAll() {
        this.component.get("passwordInput").selectAll();
    }
}

const LOG$6 = new coreutil_v1.Logger("TextInput");

class TextInput {

	static get COMPONENT_NAME() { return "TextInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }
    /**
     * 
     * @param {string} name
     */
    constructor(name) {
        /** @type {ComponentFactory} */
        this.componentFactory = justright_core_v1.ComponentFactory;

        /** @type {EventRegistry} */
        this.eventRegistry = justright_core_v1.EventRegistry;

        /** @type {DataBindRegistry} */
        this.dataBindRegistry = justright_core_v1.DataBindRegistry;

        /** @type {string} */
        this.name = name;
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("TextInput");
    }

    postConfig() {
        justright_core_v1.CanvasStyles.enableStyle(TextInput.COMPONENT_NAME);
        this.component.get("textInput").setAttributeValue("name", this.name);
    }

	getComponent(){
		return this.component;
    }

    withModel(model, validator) {
        this.dataBindRegistry
            .add(justright_core_v1.InputElementDataBinding.link(model, validator).to(this.component.get("textInput")));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get("textInput").setAttributeValue("placeholder", placeholderValue);
        return this;
    }

    withClickListener(clickListener) {
        this.eventRegistry.attach(this.component.get("textInput"), "onclick", "//event:textInputClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:textInputClicked", clickListener, this.component.getComponentIndex());
        return this;
    }

    withEnterListener(listener) {
        this.eventRegistry.attach(this.component.get("textInput"), "onkeyup", "//event:textInputEnter", this.component.getComponentIndex());
        let enterCheck = new coreutil_v1.ObjectFunction(this, (event) => { if (event.getKeyCode() === 13) { listener.call(); } });
        this.eventRegistry.listen("//event:textInputEnter", enterCheck, this.component.getComponentIndex());
        return this;
    }

}

exports.BackShade = BackShade;
exports.Button = Button;
exports.CheckBox = CheckBox;
exports.DialogBox = DialogBox;
exports.EmailInput = EmailInput;
exports.PasswordInput = PasswordInput;
exports.TextInput = TextInput;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50L2J1dHRvbi9idXR0b24uanMiLCIuLi8uLi9zcmMvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guanMiLCIuLi8uLi9zcmMvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudC9pbnB1dC9lbWFpbElucHV0L2VtYWlsSW5wdXQuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkSW5wdXQvcGFzc3dvcmRJbnB1dC5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnQvaW5wdXQvdGV4dElucHV0L3RleHRJbnB1dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXMsXHJcbiAgICBDYW52YXNSb290XHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFja1NoYWRlIHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQmFja1NoYWRlXCI7IH1cclxuXHRzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9iYWNrU2hhZGUuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcblx0XHQvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gRXZlbnRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3Rvcnk7XHJcblx0fVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICBMT0cuaW5mbyhcImNyZWF0aW5nIGNvbXBvbmVudFwiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCYWNrU2hhZGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XHJcbiAgICAgKi9cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihjbGlja2VkTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKSwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDpiYWNrU2hhZGVDbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmJhY2tTaGFkZUNsaWNrZWRcIiwgY2xpY2tlZExpc3RlbmVyLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlQWZ0ZXIobWlsbGlTZWNvbmRzKSB7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICB9LCBtaWxsaVNlY29uZHMpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgfSwgbWlsbGlTZWNvbmRzICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVBZnRlcig1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpIHtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLm1vdW50U2VsZigpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZSBzaG93XCIpIFxyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW91bnRTZWxmKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICAgICAgQ2FudmFzUm9vdC5hZGRCb2R5RWxlbWVudCh0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxmKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlc1xyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQnV0dG9uXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJ1dHRvblwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9idXR0b24uaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYnV0dG9uLmNzc1wiOyB9XHJcblxyXG4gICAgc3RhdGljIGdldCBUWVBFX1BSSU1BUlkoKSB7IHJldHVybiBcImJ0bi1wcmltYXJ5XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TRUNPTkRBUlkoKSB7IHJldHVybiBcImJ0bi1zZWNvbmRhcnlcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSB7IHJldHVybiBcImJ0bi1zdWNjZXNzXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJidG4taW5mb1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV0FSTklORygpIHsgcmV0dXJuIFwiYnRuLXdhcm5pbmdcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0RBTkdFUigpIHsgcmV0dXJuIFwiYnRuLWRhbmdlclwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfTElHSFQoKSB7IHJldHVybiBcImJ0bi1saWdodFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFSSygpIHsgcmV0dXJuIFwiYnRuLWRhcmtcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uVHlwZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGJ1dHRvblR5cGUgPSBCdXR0b24uVFlQRV9QUklNQVJZKSB7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3Rvcnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMuYnV0dG9uVHlwZSA9IGJ1dHRvblR5cGU7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBFdmVudFJlZ2lzdHJ5O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCdXR0b25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQnV0dG9uLkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0Q2hpbGQodGhpcy5sYWJlbCk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImJ0biBcIiArIHRoaXMuYnV0dG9uVHlwZSk7XHJcbiAgICB9XHJcblxyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdEZ1bmN0aW9ufSBjbGlja2VkTGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHdpdGhDbGlja0xpc3RlbmVyKGNsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDpidXR0b25DbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmJ1dHRvbkNsaWNrZWRcIiwgY2xpY2tMaXN0ZW5lciwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsXCJ0cnVlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJ1dHRvblwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIFN0eWxlc1JlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzUm9vdFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcbmltcG9ydCB7IEluamVjdG9yIH0gZnJvbSBcIm1pbmRpX3YxXCI7XHJcbmltcG9ydCB7IEJhY2tTaGFkZSB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlLmpzXCI7XHJcblxyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRpYWxvZ0JveFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dCb3gge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJEaWFsb2dCb3hcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZGlhbG9nQm94Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2RpYWxvZ0JveC5jc3NcIjsgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuXHRcdC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuXHRcdHRoaXMuZXZlbnRSZWdpc3RyeSA9IEV2ZW50UmVnaXN0cnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0luamVjdG9yfSAqL1xyXG4gICAgICAgIHRoaXMuaW5qZWN0b3IgPSBJbmplY3RvcjtcclxuXHJcblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqIEB0eXBlIHtCYWNrU2hhZGV9ICovXHJcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSBudWxsO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge1N0eWxlc1JlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuc3R5bGVzUmVnaXN0cnkgPSBTdHlsZXNSZWdpc3RyeTtcclxuXHR9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9uZW50KCkge1xyXG4gICAgICAgIExPRy5pbmZvKFwiY3JlYXRpbmcgY29tcG9uZW50XCIpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkRpYWxvZ0JveFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwiY2xvc2VCdXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6Y2xvc2VDbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmNsb3NlQ2xpY2tlZFwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlKSx0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH1cclxuICAgICAqL1xyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBcclxuICAgICAqL1xyXG4gICAgc2V0VGl0bGUodGV4dCl7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5zZXRDaGlsZChcInRpdGxlXCIsIHRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxyXG4gICAgICovXHJcbiAgICBzZXRGb290ZXIoY29tcG9uZW50KXtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImZvb3RlclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLnNldENoaWxkKFwiZm9vdGVyXCIsIGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXHJcbiAgICAgKi9cclxuICAgIHNldENvbnRlbnQoY29tcG9uZW50KXtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLnNldENoaWxkKFwiY29udGVudFwiLGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG5cdHNldChrZXksdmFsKSB7XHJcblx0XHR0aGlzLmdldENvbXBvbmVudCgpLnNldChrZXksdmFsKTtcclxuXHR9XHJcbiAgICBcclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0QmFja1NoYWRlKCk7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJkaWFsb2dCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJkaWFsb2dib3ggZmFkZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZGlhbG9nQm94XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5iYWNrU2hhZGUuZGlzYWJsZUFmdGVyKDUwMCk7XHJcbiAgICAgICAgfSwyMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKERpYWxvZ0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgfSwyMDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERpYWxvZ0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5pbml0QmFja1NoYWRlKCk7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuXHJcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUuZW5hYmxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZGlhbG9nQm94XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIgLCBcImRpYWxvZ2JveCBmYWRlIHNob3dcIikgO1xyXG4gICAgICAgIH0sMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhpcyBjb21wb25lbnQgaW4gdGhlIGNvbnRhaW5lciBhdCB0aGUgcHJvdmlkZWQgaWRcclxuICAgICAqL1xyXG4gICAgbW91bnRTZWxmKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICAgICAgQ2FudmFzUm9vdC5hZGRCb2R5RWxlbWVudCh0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0QmFja1NoYWRlKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmJhY2tTaGFkZSkge1xyXG4gICAgICAgICAgICB0aGlzLmJhY2tTaGFkZSA9IHRoaXMuaW5qZWN0b3IucHJvdG90eXBlSW5zdGFuY2UoQmFja1NoYWRlKVxyXG4gICAgICAgICAgICAgICAgLndpdGhDbGlja0xpc3RlbmVyKG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGUpKTtcclxuICAgICAgICAgICAgdGhpcy5iYWNrU2hhZGUubW91bnRTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVNlbGYoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLnJlbW92ZVN0eWxlKERpYWxvZ0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5yZW1vdmVTZWxmKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXMsXHJcbiAgICBEYXRhQmluZFJlZ2lzdHJ5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNoZWNrQm94XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrQm94IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiQ2hlY2tCb3hcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvY2hlY2tCb3guY3NzXCI7IH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gRXZlbnRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtEYXRhQmluZFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZGF0YUJpbmRSZWdpc3RyeSA9IERhdGFCaW5kUmVnaXN0cnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9uZW50KCkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkNoZWNrQm94XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKENoZWNrQm94LkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwsIHZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoaXMuZGF0YUJpbmRSZWdpc3RyeVxyXG4gICAgICAgICAgICAuYWRkKElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsobW9kZWwsIHZhbGlkYXRvcikudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6Y2hlY2tCb3hDbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmNoZWNrQm94Q2xpY2tlZFwiLCBsaXN0ZW5lcix0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoRW50ZXJMaXN0ZW5lcihsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIiksIFwib25rZXl1cFwiLCBcIi8vZXZlbnQ6Y2hlY2tCb3hFbnRlclwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICBsZXQgZW50ZXJDaGVjayA9IG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLChldmVudCkgPT4geyBpZihldmVudC5nZXRLZXlDb2RlKCkgPT09IDEzKSB7IGxpc3RlbmVyLmNhbGwoKTsgfSB9KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpjaGVja0JveEVudGVyXCIsIGVudGVyQ2hlY2ssIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBBYnN0cmFjdFZhbGlkYXRvcixcclxuICAgIEVtYWlsVmFsaWRhdG9yLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXMsXHJcbiAgICBEYXRhQmluZFJlZ2lzdHJ5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkVtYWlsSW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWxJbnB1dCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkVtYWlsSW5wdXRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZW1haWxJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9lbWFpbElucHV0LmNzc1wiOyB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gQ29tcG9uZW50RmFjdG9yeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEV2ZW50UmVnaXN0cnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RGF0YUJpbmRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnkgPSBEYXRhQmluZFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5ldyBFbWFpbFZhbGlkYXRvcigpXHJcbiAgICAgICAgICAgIC53aXRoVmFsaWRMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9uZW50KCkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkVtYWlsSW5wdXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRW1haWxJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcblxyXG4gICAgICAgIGxldCBpZHggPSB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpO1xyXG4gICAgICAgIGxldCBlbWFpbElucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZW1haWxJbnB1dFwiKTtcclxuICAgICAgICBsZXQgZW1haWxFcnJvciA9IHRoaXMuY29tcG9uZW50LmdldChcImVtYWlsRXJyb3JcIik7XHJcblxyXG4gICAgICAgIGVtYWlsSW5wdXQuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChlbWFpbElucHV0LCBcIm9uYmx1clwiLCBcIi8vZXZlbnQ6ZW1haWxJbnB1dEJsdXJcIiwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGVtYWlsRXJyb3IsIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6ZW1haWxFcnJvckNsaWNrZWRcIiwgaWR4KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGVtYWlsSW5wdXQsIFwib25rZXl1cFwiLCBcIi8vZXZlbnQ6ZW1haWxJbnB1dEVudGVyXCIsIGlkeCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmVtYWlsSW5wdXRCbHVyXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmVtYWlsSW5wdXRCbHVycmVkKSwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6ZW1haWxFcnJvckNsaWNrZWRcIiwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvciksIGlkeCk7XHJcblxyXG4gICAgICAgIGxldCBlbnRlckNoZWNrID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZ2V0S2V5Q29kZSgpID09PSAxMyAmJiAhdGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDplbWFpbElucHV0RW50ZXJcIiwgZW50ZXJDaGVjaywgaWR4KTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7QWJzdHJhY3RWYWxpZGF0b3J9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbGlkYXRvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aE1vZGVsKG1vZGVsKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhQmluZFJlZ2lzdHJ5LmFkZChcclxuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcclxuICAgICAgICAgICAgICAgIC5saW5rKG1vZGVsLCB0aGlzLnZhbGlkYXRvcilcclxuICAgICAgICAgICAgICAgIC50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJlbWFpbElucHV0XCIpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyVmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJlbWFpbElucHV0XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwicGxhY2Vob2xkZXJcIixwbGFjZWhvbGRlclZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoRW50ZXJMaXN0ZW5lcihsaXN0ZW5lcikge1xyXG4gICAgICAgIGxldCBlbnRlckNoZWNrID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIChldmVudCkgPT4geyBpZiAoZXZlbnQuZ2V0S2V5Q29kZSgpID09PSAxMyAmJiB0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHsgbGlzdGVuZXIuY2FsbCgpOyB9IH0pO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmVtYWlsSW5wdXRFbnRlclwiLCBlbnRlckNoZWNrLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbWFpbElucHV0Qmx1cnJlZCgpIHtcclxuICAgICAgICBpZih0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZW1haWxFcnJvclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImVtYWlsRXJyb3JcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImVtYWlsSW5wdXRcIikuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBbGwoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZW1haWxJbnB1dFwiKS5zZWxlY3RBbGwoKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBcclxuICAgIEFic3RyYWN0VmFsaWRhdG9yLFxyXG4gICAgUmVxdWlyZWRWYWxpZGF0b3IsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlcyxcclxuICAgIERhdGFCaW5kUmVnaXN0cnksXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyBcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkSW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRJbnB1dCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlBhc3N3b3JkSW5wdXRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9wYXNzd29yZElucHV0LmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3Rvcnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBFdmVudFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0RhdGFCaW5kUmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5kYXRhQmluZFJlZ2lzdHJ5ID0gRGF0YUJpbmRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoKVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJQYXNzd29yZElucHV0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhc3N3b3JkSW5wdXQuQ09NUE9ORU5UX05BTUUpO1xyXG5cclxuICAgICAgICBsZXQgaWR4ID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKTtcclxuICAgICAgICBsZXQgcGFzc3dvcmRJbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChcInBhc3N3b3JkSW5wdXRcIik7XHJcbiAgICAgICAgbGV0IHBhc3N3b3JkRXJyb3IgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZEVycm9yXCIpO1xyXG5cclxuICAgICAgICBwYXNzd29yZElucHV0LnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2gocGFzc3dvcmRJbnB1dCwgXCJvbmJsdXJcIiwgXCIvL2V2ZW50OnBhc3N3b3JkSW5wdXRCbHVyXCIsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChwYXNzd29yZEVycm9yLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OnBhc3N3b3JkRXJyb3JDbGlja2VkXCIsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChwYXNzd29yZElucHV0LCBcIm9ua2V5dXBcIiwgXCIvL2V2ZW50OnBhc3N3b3JkSW5wdXRFbnRlclwiLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpwYXNzd29yZElucHV0Qmx1clwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5wYXNzd29yZElucHV0Qmx1cnJlZCksIGlkeCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OnBhc3N3b3JkRXJyb3JDbGlja2VkXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpLCBpZHgpO1xyXG5cclxuICAgICAgICBsZXQgZW50ZXJDaGVjayA9IG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmdldEtleUNvZGUoKSA9PT0gMTMgJiYgIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6cGFzc3dvcmRJbnB1dEVudGVyXCIsIGVudGVyQ2hlY2ssIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtBYnN0cmFjdFZhbGlkYXRvcn1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsaWRhdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwpIHtcclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnkuYWRkKFxyXG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xyXG4gICAgICAgICAgICAgICAgLmxpbmsobW9kZWwsIHRoaXMudmFsaWRhdG9yKVxyXG4gICAgICAgICAgICAgICAgLnRvKHRoaXMuY29tcG9uZW50LmdldChcInBhc3N3b3JkSW5wdXRcIikpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoUGxhY2Vob2xkZXIocGxhY2Vob2xkZXJWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInBhc3N3b3JkSW5wdXRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLHBsYWNlaG9sZGVyVmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhFbnRlckxpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZElucHV0XCIpLCBcIm9ua2V5dXBcIiwgXCIvL2V2ZW50OnBhc3N3b3JkSW5wdXRFbnRlclwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICBsZXQgZW50ZXJDaGVjayA9IG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLChldmVudCkgPT4geyBpZihldmVudC5nZXRLZXlDb2RlKCkgPT09IDEzICYmIHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkgeyBsaXN0ZW5lci5jYWxsKCk7IH0gfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6cGFzc3dvcmRJbnB1dEVudGVyXCIsIGVudGVyQ2hlY2ssIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHBhc3N3b3JkSW5wdXRCbHVycmVkKCkge1xyXG4gICAgICAgIGlmKHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZEVycm9yXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicGFzc3dvcmRFcnJvclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicGFzc3dvcmRJbnB1dFwiKS5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEFsbCgpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZElucHV0XCIpLnNlbGVjdEFsbCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSwgRXZlbnRSZWdpc3RyeSwgQ2FudmFzU3R5bGVzLCBEYXRhQmluZFJlZ2lzdHJ5LCBDb21wb25lbnQsIElucHV0RWxlbWVudERhdGFCaW5kaW5nIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUZXh0SW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiVGV4dElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3RleHRJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90ZXh0SW5wdXQuY3NzXCI7IH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3Rvcnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBFdmVudFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0RhdGFCaW5kUmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5kYXRhQmluZFJlZ2lzdHJ5ID0gRGF0YUJpbmRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDb21wb25lbnQoKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiVGV4dElucHV0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFRleHRJbnB1dC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwidGV4dElucHV0XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLCB0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwsIHZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoaXMuZGF0YUJpbmRSZWdpc3RyeVxyXG4gICAgICAgICAgICAuYWRkKElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsobW9kZWwsIHZhbGlkYXRvcikudG8odGhpcy5jb21wb25lbnQuZ2V0KFwidGV4dElucHV0XCIpKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyVmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJ0ZXh0SW5wdXRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLCBwbGFjZWhvbGRlclZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihjbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJ0ZXh0SW5wdXRcIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6dGV4dElucHV0Q2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDp0ZXh0SW5wdXRDbGlja2VkXCIsIGNsaWNrTGlzdGVuZXIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhFbnRlckxpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJ0ZXh0SW5wdXRcIiksIFwib25rZXl1cFwiLCBcIi8vZXZlbnQ6dGV4dElucHV0RW50ZXJcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgbGV0IGVudGVyQ2hlY2sgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgKGV2ZW50KSA9PiB7IGlmIChldmVudC5nZXRLZXlDb2RlKCkgPT09IDEzKSB7IGxpc3RlbmVyLmNhbGwoKTsgfSB9KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDp0ZXh0SW5wdXRFbnRlclwiLCBlbnRlckNoZWNrLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbn0iXSwibmFtZXMiOlsiTG9nZ2VyIiwiRXZlbnRSZWdpc3RyeSIsIkNvbXBvbmVudEZhY3RvcnkiLCJDYW52YXNTdHlsZXMiLCJDYW52YXNSb290IiwiTE9HIiwiSW5qZWN0b3IiLCJTdHlsZXNSZWdpc3RyeSIsIk9iamVjdEZ1bmN0aW9uIiwiRGF0YUJpbmRSZWdpc3RyeSIsIklucHV0RWxlbWVudERhdGFCaW5kaW5nIiwiRW1haWxWYWxpZGF0b3IiLCJSZXF1aXJlZFZhbGlkYXRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQSxNQUFNLEdBQUcsR0FBRyxJQUFJQSxrQkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVwQyxBQUFPLE1BQU0sU0FBUyxDQUFDOztDQUV0QixXQUFXLGNBQWMsR0FBRyxFQUFFLE9BQU8sV0FBVyxDQUFDLEVBQUU7Q0FDbkQsV0FBVyxZQUFZLEdBQUcsRUFBRSxPQUFPLHVDQUF1QyxDQUFDLEVBQUU7SUFDMUUsV0FBVyxVQUFVLEdBQUcsRUFBRSxPQUFPLHNDQUFzQyxDQUFDLEVBQUU7Ozs7O0lBSzFFLFdBQVcsRUFBRTs7O1FBR1QsSUFBSSxDQUFDLGFBQWEsR0FBR0MsK0JBQWEsQ0FBQzs7O1FBR25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBR0Msa0NBQWdCLENBQUM7RUFDL0M7O0lBRUUsZUFBZSxHQUFHO1FBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUM5RDs7SUFFRCxVQUFVLEdBQUc7O0tBRVo7Ozs7O0NBS0osWUFBWSxFQUFFO0VBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ25COzs7Ozs7SUFNRCxpQkFBaUIsQ0FBQyxlQUFlLEVBQUU7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxD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
