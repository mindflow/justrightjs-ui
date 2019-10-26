'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var justright_core_v1 = require('justright_core_v1');
var coreutil_v1 = require('coreutil_v1');
var mindi_v1 = require('mindi_v1');

const LOG = new coreutil_v1.Logger("BackShade");

class BackShade {

	static get COMPONENT_NAME() { return "BackShade"; }
	static get TEMPLATE_URL() { return "/component/backShade/backShade.html"; }
    static get STYLES_URL() { return "/component/backShade/backShade.css"; }

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
    static get TEMPLATE_URL() { return "/component/button/button.html"; }
    static get STYLES_URL() { return "/component/button/button.css"; }

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
    static get TEMPLATE_URL() { return "/component/dialogBox/dialogBox.html"; }
    static get STYLES_URL() { return "/component/dialogBox/dialogBox.css"; }
    
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
    static get TEMPLATE_URL() { return "/component/input/checkBox/checkBox.html"; }
    static get STYLES_URL() { return "/component/input/checkBox/checkBox.css"; }
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
    static get TEMPLATE_URL() { return "/component/input/emailInput/emailInput.html"; }
    static get STYLES_URL() { return "/component/input/emailInput/emailInput.css"; }
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
    static get TEMPLATE_URL() { return "/component/input/passwordInput/passwordInput.html"; }
    static get STYLES_URL() { return "/component/input/passwordInput/passwordInput.css"; }

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
    static get TEMPLATE_URL() { return "/component/input/textInput/textInput.html"; }
    static get STYLES_URL() { return "/component/input/textInput/textInput.css"; }
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
exports.DialogBox = DialogBox;
exports.CheckBox = CheckBox;
exports.EmailInput = EmailInput;
exports.PasswordInput = PasswordInput;
exports.TextInput = TextInput;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudC9iYWNrU2hhZGUvYmFja1NoYWRlLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudC9idXR0b24vYnV0dG9uLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudC9kaWFsb2dCb3gvZGlhbG9nQm94LmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudC9pbnB1dC9jaGVja0JveC9jaGVja0JveC5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnQvaW5wdXQvZW1haWxJbnB1dC9lbWFpbElucHV0LmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZElucHV0L3Bhc3N3b3JkSW5wdXQuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50L2lucHV0L3RleHRJbnB1dC90ZXh0SW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgQ2FudmFzUm9vdFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja1NoYWRlXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhY2tTaGFkZSB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJhY2tTaGFkZVwiOyB9XHJcblx0c3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9jb21wb25lbnQvYmFja1NoYWRlL2JhY2tTaGFkZS5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2NvbXBvbmVudC9iYWNrU2hhZGUvYmFja1NoYWRlLmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcblx0XHQvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gRXZlbnRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3Rvcnk7XHJcblx0fVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICBMT0cuaW5mbyhcImNyZWF0aW5nIGNvbXBvbmVudFwiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJCYWNrU2hhZGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XHJcbiAgICAgKi9cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihjbGlja2VkTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKSwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDpiYWNrU2hhZGVDbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmJhY2tTaGFkZUNsaWNrZWRcIiwgY2xpY2tlZExpc3RlbmVyLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlQWZ0ZXIobWlsbGlTZWNvbmRzKSB7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYWNrU2hhZGVcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICB9LCBtaWxsaVNlY29uZHMpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgfSwgbWlsbGlTZWNvbmRzICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVBZnRlcig1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpIHtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja1NoYWRlLkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLm1vdW50U2VsZigpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZSBzaG93XCIpIFxyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW91bnRTZWxmKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICAgICAgQ2FudmFzUm9vdC5hZGRCb2R5RWxlbWVudCh0aGlzLmdldENvbXBvbmVudCgpLmdldFJvb3RFbGVtZW50KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxmKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsImltcG9ydCB7XHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgRXZlbnRSZWdpc3RyeSxcclxuICAgIENhbnZhc1N0eWxlc1xyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQnV0dG9uXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJ1dHRvblwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2NvbXBvbmVudC9idXR0b24vYnV0dG9uLmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvY29tcG9uZW50L2J1dHRvbi9idXR0b24uY3NzXCI7IH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfUFJJTUFSWSgpIHsgcmV0dXJuIFwiYnRuLXByaW1hcnlcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1NFQ09OREFSWSgpIHsgcmV0dXJuIFwiYnRuLXNlY29uZGFyeVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfU1VDQ0VTUygpIHsgcmV0dXJuIFwiYnRuLXN1Y2Nlc3NcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0lORk8oKSB7IHJldHVybiBcImJ0bi1pbmZvXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgeyByZXR1cm4gXCJidG4td2FybmluZ1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfREFOR0VSKCkgeyByZXR1cm4gXCJidG4tZGFuZ2VyXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9MSUdIVCgpIHsgcmV0dXJuIFwiYnRuLWxpZ2h0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9EQVJLKCkgeyByZXR1cm4gXCJidG4tZGFya1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25UeXBlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihsYWJlbCwgYnV0dG9uVHlwZSA9IEJ1dHRvbi5UWVBFX1BSSU1BUlkpIHtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gQ29tcG9uZW50RmFjdG9yeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXHJcbiAgICAgICAgdGhpcy5idXR0b25UeXBlID0gYnV0dG9uVHlwZTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEV2ZW50UmVnaXN0cnk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9uZW50KCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIkJ1dHRvblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCdXR0b24uQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRDaGlsZCh0aGlzLmxhYmVsKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiYnRuIFwiICsgdGhpcy5idXR0b25UeXBlKTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNsaWNrZWRMaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIoY2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmJ1dHRvbkNsaWNrZWRcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6YnV0dG9uQ2xpY2tlZFwiLCBjbGlja0xpc3RlbmVyLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIixcInRydWVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgU3R5bGVzUmVnaXN0cnksXHJcbiAgICBDYW52YXNSb290XHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tIFwibWluZGlfdjFcIjtcclxuaW1wb3J0IHsgQmFja1NoYWRlIH0gZnJvbSBcIi4uL2JhY2tTaGFkZS9iYWNrU2hhZGUuanNcIjtcclxuXHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRGlhbG9nQm94XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpYWxvZ0JveCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkRpYWxvZ0JveFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2NvbXBvbmVudC9kaWFsb2dCb3gvZGlhbG9nQm94Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guY3NzXCI7IH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcblx0XHQvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcblx0XHR0aGlzLmV2ZW50UmVnaXN0cnkgPSBFdmVudFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gQ29tcG9uZW50RmFjdG9yeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtJbmplY3Rvcn0gKi9cclxuICAgICAgICB0aGlzLmluamVjdG9yID0gSW5qZWN0b3I7XHJcblxyXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKiBAdHlwZSB7QmFja1NoYWRlfSAqL1xyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtTdHlsZXNSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLnN0eWxlc1JlZ2lzdHJ5ID0gU3R5bGVzUmVnaXN0cnk7XHJcblx0fVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICBMT0cuaW5mbyhcImNyZWF0aW5nIGNvbXBvbmVudFwiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJEaWFsb2dCb3hcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImNsb3NlQnV0dG9uXCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmNsb3NlQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpjbG9zZUNsaWNrZWRcIiwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZSksdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XHJcbiAgICAgKi9cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXHJcbiAgICAgKi9cclxuICAgIHNldFRpdGxlKHRleHQpe1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuc2V0Q2hpbGQoXCJ0aXRsZVwiLCB0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcclxuICAgICAqL1xyXG4gICAgc2V0Rm9vdGVyKGNvbXBvbmVudCl7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJmb290ZXJcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5zZXRDaGlsZChcImZvb3RlclwiLCBjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxyXG4gICAgICovXHJcbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCl7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5zZXRDaGlsZChcImNvbnRlbnRcIixjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuXHRzZXQoa2V5LHZhbCkge1xyXG5cdFx0dGhpcy5nZXRDb21wb25lbnQoKS5zZXQoa2V5LHZhbCk7XHJcblx0fVxyXG4gICAgXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tTaGFkZSgpO1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZGlhbG9nQm94XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiAsIFwiZGlhbG9nYm94IGZhZGVcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYmFja1NoYWRlLmRpc2FibGVBZnRlcig1MDApO1xyXG4gICAgICAgIH0sMjAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIH0sMjAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tTaGFkZSgpO1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlLmVuYWJsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJkaWFsb2dCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJkaWFsb2dib3ggZmFkZSBzaG93XCIpIDtcclxuICAgICAgICB9LDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIHRoaXMgY29tcG9uZW50IGluIHRoZSBjb250YWluZXIgYXQgdGhlIHByb3ZpZGVkIGlkXHJcbiAgICAgKi9cclxuICAgIG1vdW50U2VsZigpIHtcclxuICAgICAgICBpZighdGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpLmlzTW91bnRlZCgpKSB7XHJcbiAgICAgICAgICAgIENhbnZhc1Jvb3QuYWRkQm9keUVsZW1lbnQodGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJhY2tTaGFkZSgpIHtcclxuICAgICAgICBpZighdGhpcy5iYWNrU2hhZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSB0aGlzLmluamVjdG9yLnByb3RvdHlwZUluc3RhbmNlKEJhY2tTaGFkZSlcclxuICAgICAgICAgICAgICAgIC53aXRoQ2xpY2tMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFja1NoYWRlLm1vdW50U2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxmKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5yZW1vdmVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlU2VsZigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgRGF0YUJpbmRSZWdpc3RyeSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nXHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJDaGVja0JveFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVja0JveCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkNoZWNrQm94XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmNzc1wiOyB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gQ29tcG9uZW50RmFjdG9yeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEV2ZW50UmVnaXN0cnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RGF0YUJpbmRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnkgPSBEYXRhQmluZFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJDaGVja0JveFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShDaGVja0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aE1vZGVsKG1vZGVsLCB2YWxpZGF0b3IpIHtcclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnlcclxuICAgICAgICAgICAgLmFkZChJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKG1vZGVsLCB2YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmNoZWNrQm94Q2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpjaGVja0JveENsaWNrZWRcIiwgbGlzdGVuZXIsdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpLCBcIm9ua2V5dXBcIiwgXCIvL2V2ZW50OmNoZWNrQm94RW50ZXJcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgbGV0IGVudGVyQ2hlY2sgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywoZXZlbnQpID0+IHsgaWYoZXZlbnQuZ2V0S2V5Q29kZSgpID09PSAxMykgeyBsaXN0ZW5lci5jYWxsKCk7IH0gfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6Y2hlY2tCb3hFbnRlclwiLCBlbnRlckNoZWNrLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQWJzdHJhY3RWYWxpZGF0b3IsXHJcbiAgICBFbWFpbFZhbGlkYXRvcixcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgRGF0YUJpbmRSZWdpc3RyeSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nXHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFbWFpbElucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJFbWFpbElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvY29tcG9uZW50L2lucHV0L2VtYWlsSW5wdXQvZW1haWxJbnB1dC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2NvbXBvbmVudC9pbnB1dC9lbWFpbElucHV0L2VtYWlsSW5wdXQuY3NzXCI7IH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gRXZlbnRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtEYXRhQmluZFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZGF0YUJpbmRSZWdpc3RyeSA9IERhdGFCaW5kUmVnaXN0cnk7XHJcblxyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbmV3IEVtYWlsVmFsaWRhdG9yKClcclxuICAgICAgICAgICAgLndpdGhWYWxpZExpc3RlbmVyKG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDb21wb25lbnQoKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiRW1haWxJbnB1dFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShFbWFpbElucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCk7XHJcbiAgICAgICAgbGV0IGVtYWlsSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJlbWFpbElucHV0XCIpO1xyXG4gICAgICAgIGxldCBlbWFpbEVycm9yID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZW1haWxFcnJvclwiKTtcclxuXHJcbiAgICAgICAgZW1haWxJbnB1dC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKGVtYWlsSW5wdXQsIFwib25ibHVyXCIsIFwiLy9ldmVudDplbWFpbElucHV0Qmx1clwiLCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goZW1haWxFcnJvciwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDplbWFpbEVycm9yQ2xpY2tlZFwiLCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goZW1haWxJbnB1dCwgXCJvbmtleXVwXCIsIFwiLy9ldmVudDplbWFpbElucHV0RW50ZXJcIiwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6ZW1haWxJbnB1dEJsdXJcIiwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuZW1haWxJbnB1dEJsdXJyZWQpLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDplbWFpbEVycm9yQ2xpY2tlZFwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSwgaWR4KTtcclxuXHJcbiAgICAgICAgbGV0IGVudGVyQ2hlY2sgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5nZXRLZXlDb2RlKCkgPT09IDEzICYmICF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmVtYWlsSW5wdXRFbnRlclwiLCBlbnRlckNoZWNrLCBpZHgpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtBYnN0cmFjdFZhbGlkYXRvcn1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsaWRhdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwpIHtcclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnkuYWRkKFxyXG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xyXG4gICAgICAgICAgICAgICAgLmxpbmsobW9kZWwsIHRoaXMudmFsaWRhdG9yKVxyXG4gICAgICAgICAgICAgICAgLnRvKHRoaXMuY29tcG9uZW50LmdldChcImVtYWlsSW5wdXRcIikpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoUGxhY2Vob2xkZXIocGxhY2Vob2xkZXJWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImVtYWlsSW5wdXRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLHBsYWNlaG9sZGVyVmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhFbnRlckxpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgbGV0IGVudGVyQ2hlY2sgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgKGV2ZW50KSA9PiB7IGlmIChldmVudC5nZXRLZXlDb2RlKCkgPT09IDEzICYmIHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkgeyBsaXN0ZW5lci5jYWxsKCk7IH0gfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6ZW1haWxJbnB1dEVudGVyXCIsIGVudGVyQ2hlY2ssIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtYWlsSW5wdXRCbHVycmVkKCkge1xyXG4gICAgICAgIGlmKHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJlbWFpbEVycm9yXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZW1haWxFcnJvclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZW1haWxJbnB1dFwiKS5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEFsbCgpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJlbWFpbElucHV0XCIpLnNlbGVjdEFsbCgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFxyXG4gICAgQWJzdHJhY3RWYWxpZGF0b3IsXHJcbiAgICBSZXF1aXJlZFZhbGlkYXRvcixcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgRGF0YUJpbmRSZWdpc3RyeSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nIFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRJbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZElucHV0IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiUGFzc3dvcmRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZElucHV0L3Bhc3N3b3JkSW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRJbnB1dC9wYXNzd29yZElucHV0LmNzc1wiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3Rvcnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBFdmVudFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0RhdGFCaW5kUmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5kYXRhQmluZFJlZ2lzdHJ5ID0gRGF0YUJpbmRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoKVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJQYXNzd29yZElucHV0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhc3N3b3JkSW5wdXQuQ09NUE9ORU5UX05BTUUpO1xyXG5cclxuICAgICAgICBsZXQgaWR4ID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKTtcclxuICAgICAgICBsZXQgcGFzc3dvcmRJbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChcInBhc3N3b3JkSW5wdXRcIik7XHJcbiAgICAgICAgbGV0IHBhc3N3b3JkRXJyb3IgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZEVycm9yXCIpO1xyXG5cclxuICAgICAgICBwYXNzd29yZElucHV0LnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2gocGFzc3dvcmRJbnB1dCwgXCJvbmJsdXJcIiwgXCIvL2V2ZW50OnBhc3N3b3JkSW5wdXRCbHVyXCIsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChwYXNzd29yZEVycm9yLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OnBhc3N3b3JkRXJyb3JDbGlja2VkXCIsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChwYXNzd29yZElucHV0LCBcIm9ua2V5dXBcIiwgXCIvL2V2ZW50OnBhc3N3b3JkSW5wdXRFbnRlclwiLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpwYXNzd29yZElucHV0Qmx1clwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5wYXNzd29yZElucHV0Qmx1cnJlZCksIGlkeCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OnBhc3N3b3JkRXJyb3JDbGlja2VkXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpLCBpZHgpO1xyXG5cclxuICAgICAgICBsZXQgZW50ZXJDaGVjayA9IG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmdldEtleUNvZGUoKSA9PT0gMTMgJiYgIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6cGFzc3dvcmRJbnB1dEVudGVyXCIsIGVudGVyQ2hlY2ssIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtBYnN0cmFjdFZhbGlkYXRvcn1cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsaWRhdG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTW9kZWwobW9kZWwpIHtcclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnkuYWRkKFxyXG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZ1xyXG4gICAgICAgICAgICAgICAgLmxpbmsobW9kZWwsIHRoaXMudmFsaWRhdG9yKVxyXG4gICAgICAgICAgICAgICAgLnRvKHRoaXMuY29tcG9uZW50LmdldChcInBhc3N3b3JkSW5wdXRcIikpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoUGxhY2Vob2xkZXIocGxhY2Vob2xkZXJWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInBhc3N3b3JkSW5wdXRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJwbGFjZWhvbGRlclwiLHBsYWNlaG9sZGVyVmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhFbnRlckxpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZElucHV0XCIpLCBcIm9ua2V5dXBcIiwgXCIvL2V2ZW50OnBhc3N3b3JkSW5wdXRFbnRlclwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICBsZXQgZW50ZXJDaGVjayA9IG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLChldmVudCkgPT4geyBpZihldmVudC5nZXRLZXlDb2RlKCkgPT09IDEzICYmIHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkgeyBsaXN0ZW5lci5jYWxsKCk7IH0gfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6cGFzc3dvcmRJbnB1dEVudGVyXCIsIGVudGVyQ2hlY2ssIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHBhc3N3b3JkSW5wdXRCbHVycmVkKCkge1xyXG4gICAgICAgIGlmKHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZEVycm9yXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicGFzc3dvcmRFcnJvclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicGFzc3dvcmRJbnB1dFwiKS5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEFsbCgpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZElucHV0XCIpLnNlbGVjdEFsbCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSwgRXZlbnRSZWdpc3RyeSwgQ2FudmFzU3R5bGVzLCBEYXRhQmluZFJlZ2lzdHJ5LCBDb21wb25lbnQsIElucHV0RWxlbWVudERhdGFCaW5kaW5nIH0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUZXh0SW5wdXRcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiVGV4dElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvY29tcG9uZW50L2lucHV0L3RleHRJbnB1dC90ZXh0SW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9jb21wb25lbnQvaW5wdXQvdGV4dElucHV0L3RleHRJbnB1dC5jc3NcIjsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gQ29tcG9uZW50RmFjdG9yeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEV2ZW50UmVnaXN0cnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RGF0YUJpbmRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnkgPSBEYXRhQmluZFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJUZXh0SW5wdXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVGV4dElucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJ0ZXh0SW5wdXRcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XHJcbiAgICB9XHJcblxyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhNb2RlbChtb2RlbCwgdmFsaWRhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhQmluZFJlZ2lzdHJ5XHJcbiAgICAgICAgICAgIC5hZGQoSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayhtb2RlbCwgdmFsaWRhdG9yKS50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJ0ZXh0SW5wdXRcIikpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoUGxhY2Vob2xkZXIocGxhY2Vob2xkZXJWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInRleHRJbnB1dFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIsIHBsYWNlaG9sZGVyVmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhDbGlja0xpc3RlbmVyKGNsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcInRleHRJbnB1dFwiKSwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDp0ZXh0SW5wdXRDbGlja2VkXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OnRleHRJbnB1dENsaWNrZWRcIiwgY2xpY2tMaXN0ZW5lciwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcInRleHRJbnB1dFwiKSwgXCJvbmtleXVwXCIsIFwiLy9ldmVudDp0ZXh0SW5wdXRFbnRlclwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICBsZXQgZW50ZXJDaGVjayA9IG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCAoZXZlbnQpID0+IHsgaWYgKGV2ZW50LmdldEtleUNvZGUoKSA9PT0gMTMpIHsgbGlzdGVuZXIuY2FsbCgpOyB9IH0pO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OnRleHRJbnB1dEVudGVyXCIsIGVudGVyQ2hlY2ssIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxufSJdLCJuYW1lcyI6WyJMb2dnZXIiLCJFdmVudFJlZ2lzdHJ5IiwiQ29tcG9uZW50RmFjdG9yeSIsIkNhbnZhc1N0eWxlcyIsIkNhbnZhc1Jvb3QiLCJMT0ciLCJJbmplY3RvciIsIlN0eWxlc1JlZ2lzdHJ5IiwiT2JqZWN0RnVuY3Rpb24iLCJEYXRhQmluZFJlZ2lzdHJ5IiwiSW5wdXRFbGVtZW50RGF0YUJpbmRpbmciLCJFbWFpbFZhbGlkYXRvciIsIlJlcXVpcmVkVmFsaWRhdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVNBLE1BQU0sR0FBRyxHQUFHLElBQUlBLGtCQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXBDLEFBQU8sTUFBTSxTQUFTLENBQUM7O0NBRXRCLFdBQVcsY0FBYyxHQUFHLEVBQUUsT0FBTyxXQUFXLENBQUMsRUFBRTtDQUNuRCxXQUFXLFlBQVksR0FBRyxFQUFFLE9BQU8scUNBQXFDLENBQUMsRUFBRTtJQUN4RSxXQUFXLFVBQVUsR0FBRyxFQUFFLE9BQU8sb0NBQW9DLENBQUMsRUFBRTs7Ozs7SUFLeEUsV0FBVyxFQUFFOzs7UUFHVCxJQUFJLENBQUMsYUFBYSxHQUFHQywrQkFBYSxDQUFDOzs7UUFHbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHQyxrQ0FBZ0IsQ0FBQztFQUMvQzs7SUFFRSxlQUFlLEdBQUc7UUFDZCxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzlEOztJQUVELFVBQVUsR0FBRzs7S0FFWjs7Ozs7Q0FLSixZQUFZLEVBQUU7RUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDbkI7Ozs7OztJQU1ELGlCQUFpQixDQUFDLGVBQWUsRUFBRTtRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0s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
