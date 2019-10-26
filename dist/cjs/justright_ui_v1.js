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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVzdHJpZ2h0X3VpX3YxLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9iYWNrU2hhZGUvYmFja1NoYWRlLmpzIiwiLi4vLi4vc3JjL2p1c3RyaWdodC9jb21wb25lbnQvYnV0dG9uL2J1dHRvbi5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guanMiLCIuLi8uLi9zcmMvanVzdHJpZ2h0L2NvbXBvbmVudC9pbnB1dC9jaGVja0JveC9jaGVja0JveC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L2VtYWlsSW5wdXQvZW1haWxJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkSW5wdXQvcGFzc3dvcmRJbnB1dC5qcyIsIi4uLy4uL3NyYy9qdXN0cmlnaHQvY29tcG9uZW50L2lucHV0L3RleHRJbnB1dC90ZXh0SW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgQ2FudmFzUm9vdFxyXG59IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja1NoYWRlXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhY2tTaGFkZSB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkJhY2tTaGFkZVwiOyB9XHJcblx0c3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYmFja1NoYWRlLmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2JhY2tTaGFkZS5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG5cdFx0LyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEV2ZW50UmVnaXN0cnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBDb21wb25lbnRGYWN0b3J5O1xyXG5cdH1cclxuXHJcbiAgICBjcmVhdGVDb21wb25lbnQoKSB7XHJcbiAgICAgICAgTE9HLmluZm8oXCJjcmVhdGluZyBjb21wb25lbnRcIik7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiQmFja1NoYWRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxyXG4gICAgICovXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0RnVuY3Rpb259IGNsaWNrZWRMaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIoY2xpY2tlZExpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YmFja1NoYWRlQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpiYWNrU2hhZGVDbGlja2VkXCIsIGNsaWNrZWRMaXN0ZW5lciwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUFmdGVyKG1pbGxpU2Vjb25kcykge1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgfSwgbWlsbGlTZWNvbmRzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShCYWNrU2hhZGUuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIH0sIG1pbGxpU2Vjb25kcyArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQWZ0ZXIoNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tTaGFkZS5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5tb3VudFNlbGYoKTtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGUgc2hvd1wiKSBcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdW50U2VsZigpIHtcclxuICAgICAgICBpZighdGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpLmlzTW91bnRlZCgpKSB7XHJcbiAgICAgICAgICAgIENhbnZhc1Jvb3QuYWRkQm9keUVsZW1lbnQodGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU2VsZigpIHtcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXNcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5cclxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJ1dHRvblwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b24ge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJCdXR0b25cIjsgfVxyXG4gICAgc3RhdGljIGdldCBURU1QTEFURV9VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvYnV0dG9uLmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2J1dHRvbi5jc3NcIjsgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9QUklNQVJZKCkgeyByZXR1cm4gXCJidG4tcHJpbWFyeVwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfU0VDT05EQVJZKCkgeyByZXR1cm4gXCJidG4tc2Vjb25kYXJ5XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJidG4tc3VjY2Vzc1wiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRZUEVfSU5GTygpIHsgcmV0dXJuIFwiYnRuLWluZm9cIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX1dBUk5JTkcoKSB7IHJldHVybiBcImJ0bi13YXJuaW5nXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVFlQRV9EQU5HRVIoKSB7IHJldHVybiBcImJ0bi1kYW5nZXJcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0xJR0hUKCkgeyByZXR1cm4gXCJidG4tbGlnaHRcIjsgfVxyXG4gICAgc3RhdGljIGdldCBUWVBFX0RBUksoKSB7IHJldHVybiBcImJ0bi1kYXJrXCI7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvblR5cGUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBidXR0b25UeXBlID0gQnV0dG9uLlRZUEVfUFJJTUFSWSkge1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLmJ1dHRvblR5cGUgPSBidXR0b25UeXBlO1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gRXZlbnRSZWdpc3RyeTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDb21wb25lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiQnV0dG9uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJ1dHRvbi5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKHRoaXMubGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsXCJidG4gXCIgKyB0aGlzLmJ1dHRvblR5cGUpO1xyXG4gICAgfVxyXG5cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3RGdW5jdGlvbn0gY2xpY2tlZExpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihjbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaCh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIiksIFwib25jbGlja1wiLCBcIi8vZXZlbnQ6YnV0dG9uQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpidXR0b25DbGlja2VkXCIsIGNsaWNrTGlzdGVuZXIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLFwidHJ1ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJidXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXMsXHJcbiAgICBTdHlsZXNSZWdpc3RyeSxcclxuICAgIENhbnZhc1Jvb3RcclxufSBmcm9tIFwianVzdHJpZ2h0X2NvcmVfdjFcIjtcclxuaW1wb3J0IHsgTG9nZ2VyLCBPYmplY3RGdW5jdGlvbiB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xyXG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gXCJtaW5kaV92MVwiO1xyXG5pbXBvcnQgeyBCYWNrU2hhZGUgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZS5qc1wiO1xyXG5cclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJEaWFsb2dCb3hcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94IHtcclxuXHJcblx0c3RhdGljIGdldCBDT01QT05FTlRfTkFNRSgpIHsgcmV0dXJuIFwiRGlhbG9nQm94XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2RpYWxvZ0JveC5odG1sXCI7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RZTEVTX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS9kaWFsb2dCb3guY3NzXCI7IH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcblx0XHQvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcblx0XHR0aGlzLmV2ZW50UmVnaXN0cnkgPSBFdmVudFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gQ29tcG9uZW50RmFjdG9yeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtJbmplY3Rvcn0gKi9cclxuICAgICAgICB0aGlzLmluamVjdG9yID0gSW5qZWN0b3I7XHJcblxyXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKiBAdHlwZSB7QmFja1NoYWRlfSAqL1xyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtTdHlsZXNSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLnN0eWxlc1JlZ2lzdHJ5ID0gU3R5bGVzUmVnaXN0cnk7XHJcblx0fVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICBMT0cuaW5mbyhcImNyZWF0aW5nIGNvbXBvbmVudFwiKTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJEaWFsb2dCb3hcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImNsb3NlQnV0dG9uXCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmNsb3NlQ2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpjbG9zZUNsaWNrZWRcIiwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZSksdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XHJcbiAgICAgKi9cclxuXHRnZXRDb21wb25lbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXHJcbiAgICAgKi9cclxuICAgIHNldFRpdGxlKHRleHQpe1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuc2V0Q2hpbGQoXCJ0aXRsZVwiLCB0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcclxuICAgICAqL1xyXG4gICAgc2V0Rm9vdGVyKGNvbXBvbmVudCl7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJmb290ZXJcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5zZXRDaGlsZChcImZvb3RlclwiLCBjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxyXG4gICAgICovXHJcbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCl7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5zZXRDaGlsZChcImNvbnRlbnRcIixjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuXHRzZXQoa2V5LHZhbCkge1xyXG5cdFx0dGhpcy5nZXRDb21wb25lbnQoKS5zZXQoa2V5LHZhbCk7XHJcblx0fVxyXG4gICAgXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tTaGFkZSgpO1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkuZ2V0KFwiZGlhbG9nQm94XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiAsIFwiZGlhbG9nYm94IGZhZGVcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYmFja1NoYWRlLmRpc2FibGVBZnRlcig1MDApO1xyXG4gICAgICAgIH0sMjAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIH0sMjAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tTaGFkZSgpO1xyXG4gICAgICAgIHRoaXMubW91bnRTZWxmKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYmFja1NoYWRlLmVuYWJsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudCgpLmdldChcImRpYWxvZ0JveFwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoKS5nZXQoXCJkaWFsb2dCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiICwgXCJkaWFsb2dib3ggZmFkZSBzaG93XCIpIDtcclxuICAgICAgICB9LDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIHRoaXMgY29tcG9uZW50IGluIHRoZSBjb250YWluZXIgYXQgdGhlIHByb3ZpZGVkIGlkXHJcbiAgICAgKi9cclxuICAgIG1vdW50U2VsZigpIHtcclxuICAgICAgICBpZighdGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpLmlzTW91bnRlZCgpKSB7XHJcbiAgICAgICAgICAgIENhbnZhc1Jvb3QuYWRkQm9keUVsZW1lbnQodGhpcy5nZXRDb21wb25lbnQoKS5nZXRSb290RWxlbWVudCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJhY2tTaGFkZSgpIHtcclxuICAgICAgICBpZighdGhpcy5iYWNrU2hhZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSB0aGlzLmluamVjdG9yLnByb3RvdHlwZUluc3RhbmNlKEJhY2tTaGFkZSlcclxuICAgICAgICAgICAgICAgIC53aXRoQ2xpY2tMaXN0ZW5lcihuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFja1NoYWRlLm1vdW50U2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTZWxmKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5yZW1vdmVTdHlsZShEaWFsb2dCb3guQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KCkucmVtb3ZlU2VsZigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgRGF0YUJpbmRSZWdpc3RyeSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nXHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJDaGVja0JveFwiKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVja0JveCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIkNoZWNrQm94XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2NoZWNrQm94Lmh0bWxcIjsgfVxyXG4gICAgc3RhdGljIGdldCBTVFlMRVNfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2NoZWNrQm94LmNzc1wiOyB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudEZhY3Rvcnl9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gQ29tcG9uZW50RmFjdG9yeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeSA9IEV2ZW50UmVnaXN0cnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RGF0YUJpbmRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnkgPSBEYXRhQmluZFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJDaGVja0JveFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShDaGVja0JveC5DT01QT05FTlRfTkFNRSk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aE1vZGVsKG1vZGVsLCB2YWxpZGF0b3IpIHtcclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnlcclxuICAgICAgICAgICAgLmFkZChJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKG1vZGVsLCB2YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmNoZWNrQm94Q2xpY2tlZFwiLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpjaGVja0JveENsaWNrZWRcIiwgbGlzdGVuZXIsdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpLCBcIm9ua2V5dXBcIiwgXCIvL2V2ZW50OmNoZWNrQm94RW50ZXJcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgbGV0IGVudGVyQ2hlY2sgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywoZXZlbnQpID0+IHsgaWYoZXZlbnQuZ2V0S2V5Q29kZSgpID09PSAxMykgeyBsaXN0ZW5lci5jYWxsKCk7IH0gfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6Y2hlY2tCb3hFbnRlclwiLCBlbnRlckNoZWNrLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQWJzdHJhY3RWYWxpZGF0b3IsXHJcbiAgICBFbWFpbFZhbGlkYXRvcixcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBFdmVudFJlZ2lzdHJ5LFxyXG4gICAgQ2FudmFzU3R5bGVzLFxyXG4gICAgRGF0YUJpbmRSZWdpc3RyeSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nXHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFbWFpbElucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJFbWFpbElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL2VtYWlsSW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvZW1haWxJbnB1dC5jc3NcIjsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnRGYWN0b3J5fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IENvbXBvbmVudEZhY3Rvcnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRSZWdpc3RyeX0gKi9cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkgPSBFdmVudFJlZ2lzdHJ5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0RhdGFCaW5kUmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5kYXRhQmluZFJlZ2lzdHJ5ID0gRGF0YUJpbmRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgRW1haWxWYWxpZGF0b3IoKVxyXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudCgpIHtcclxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoXCJFbWFpbElucHV0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3RDb25maWcoKSB7XHJcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEVtYWlsSW5wdXQuQ09NUE9ORU5UX05BTUUpO1xyXG5cclxuICAgICAgICBsZXQgaWR4ID0gdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKTtcclxuICAgICAgICBsZXQgZW1haWxJbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChcImVtYWlsSW5wdXRcIik7XHJcbiAgICAgICAgbGV0IGVtYWlsRXJyb3IgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJlbWFpbEVycm9yXCIpO1xyXG5cclxuICAgICAgICBlbWFpbElucHV0LnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2goZW1haWxJbnB1dCwgXCJvbmJsdXJcIiwgXCIvL2V2ZW50OmVtYWlsSW5wdXRCbHVyXCIsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChlbWFpbEVycm9yLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OmVtYWlsRXJyb3JDbGlja2VkXCIsIGlkeCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5LmF0dGFjaChlbWFpbElucHV0LCBcIm9ua2V5dXBcIiwgXCIvL2V2ZW50OmVtYWlsSW5wdXRFbnRlclwiLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDplbWFpbElucHV0Qmx1clwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5lbWFpbElucHV0Qmx1cnJlZCksIGlkeCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OmVtYWlsRXJyb3JDbGlja2VkXCIsIG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpLCBpZHgpO1xyXG5cclxuICAgICAgICBsZXQgZW50ZXJDaGVjayA9IG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmdldEtleUNvZGUoKSA9PT0gMTMgJiYgIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6ZW1haWxJbnB1dEVudGVyXCIsIGVudGVyQ2hlY2ssIGlkeCk7XHJcbiAgICB9XHJcblxyXG5cdGdldENvbXBvbmVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybnMge0Fic3RyYWN0VmFsaWRhdG9yfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWxpZGF0b3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhNb2RlbChtb2RlbCkge1xyXG4gICAgICAgIHRoaXMuZGF0YUJpbmRSZWdpc3RyeS5hZGQoXHJcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nXHJcbiAgICAgICAgICAgICAgICAubGluayhtb2RlbCwgdGhpcy52YWxpZGF0b3IpXHJcbiAgICAgICAgICAgICAgICAudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiZW1haWxJbnB1dFwiKSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhQbGFjZWhvbGRlcihwbGFjZWhvbGRlclZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiZW1haWxJbnB1dFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInBsYWNlaG9sZGVyXCIscGxhY2Vob2xkZXJWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aEVudGVyTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICBsZXQgZW50ZXJDaGVjayA9IG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCAoZXZlbnQpID0+IHsgaWYgKGV2ZW50LmdldEtleUNvZGUoKSA9PT0gMTMgJiYgdGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7IGxpc3RlbmVyLmNhbGwoKTsgfSB9KTtcclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDplbWFpbElucHV0RW50ZXJcIiwgZW50ZXJDaGVjaywgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZW1haWxJbnB1dEJsdXJyZWQoKSB7XHJcbiAgICAgICAgaWYodGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImVtYWlsRXJyb3JcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJlbWFpbEVycm9yXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmb2N1cygpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJlbWFpbElucHV0XCIpLmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0QWxsKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImVtYWlsSW5wdXRcIikuc2VsZWN0QWxsKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgXHJcbiAgICBBYnN0cmFjdFZhbGlkYXRvcixcclxuICAgIFJlcXVpcmVkVmFsaWRhdG9yLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcclxuICAgIEV2ZW50UmVnaXN0cnksXHJcbiAgICBDYW52YXNTdHlsZXMsXHJcbiAgICBEYXRhQmluZFJlZ2lzdHJ5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcgXHJcbn0gZnJvbSBcImp1c3RyaWdodF9jb3JlX3YxXCI7XHJcbmltcG9ydCB7IExvZ2dlciwgT2JqZWN0RnVuY3Rpb24gfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcclxuXHJcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZElucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkSW5wdXQge1xyXG5cclxuXHRzdGF0aWMgZ2V0IENPTVBPTkVOVF9OQU1FKCkgeyByZXR1cm4gXCJQYXNzd29yZElucHV0XCI7IH1cclxuICAgIHN0YXRpYyBnZXQgVEVNUExBVEVfVVJMKCkgeyByZXR1cm4gXCIvYXNzZXRzL2p1c3RyaWdodGpzLXVpL3Bhc3N3b3JkSW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvcGFzc3dvcmRJbnB1dC5jc3NcIjsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gRXZlbnRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtEYXRhQmluZFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZGF0YUJpbmRSZWdpc3RyeSA9IERhdGFCaW5kUmVnaXN0cnk7XHJcblxyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbmV3IFJlcXVpcmVkVmFsaWRhdG9yKClcclxuICAgICAgICAgICAgLndpdGhWYWxpZExpc3RlbmVyKG5ldyBPYmplY3RGdW5jdGlvbih0aGlzLCB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDb21wb25lbnQoKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFwiUGFzc3dvcmRJbnB1dFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYXNzd29yZElucHV0LkNPTVBPTkVOVF9OQU1FKTtcclxuXHJcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCk7XHJcbiAgICAgICAgbGV0IHBhc3N3b3JkSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZElucHV0XCIpO1xyXG4gICAgICAgIGxldCBwYXNzd29yZEVycm9yID0gdGhpcy5jb21wb25lbnQuZ2V0KFwicGFzc3dvcmRFcnJvclwiKTtcclxuXHJcbiAgICAgICAgcGFzc3dvcmRJbnB1dC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkuYXR0YWNoKHBhc3N3b3JkSW5wdXQsIFwib25ibHVyXCIsIFwiLy9ldmVudDpwYXNzd29yZElucHV0Qmx1clwiLCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2gocGFzc3dvcmRFcnJvciwgXCJvbmNsaWNrXCIsIFwiLy9ldmVudDpwYXNzd29yZEVycm9yQ2xpY2tlZFwiLCBpZHgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2gocGFzc3dvcmRJbnB1dCwgXCJvbmtleXVwXCIsIFwiLy9ldmVudDpwYXNzd29yZElucHV0RW50ZXJcIiwgaWR4KTtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6cGFzc3dvcmRJbnB1dEJsdXJcIiwgbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIHRoaXMucGFzc3dvcmRJbnB1dEJsdXJyZWQpLCBpZHgpO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UmVnaXN0cnkubGlzdGVuKFwiLy9ldmVudDpwYXNzd29yZEVycm9yQ2xpY2tlZFwiLCBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKSwgaWR4KTtcclxuXHJcbiAgICAgICAgbGV0IGVudGVyQ2hlY2sgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5nZXRLZXlDb2RlKCkgPT09IDEzICYmICF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25FcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OnBhc3N3b3JkSW5wdXRFbnRlclwiLCBlbnRlckNoZWNrLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJucyB7QWJzdHJhY3RWYWxpZGF0b3J9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbGlkYXRvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aE1vZGVsKG1vZGVsKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhQmluZFJlZ2lzdHJ5LmFkZChcclxuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmdcclxuICAgICAgICAgICAgICAgIC5saW5rKG1vZGVsLCB0aGlzLnZhbGlkYXRvcilcclxuICAgICAgICAgICAgICAgIC50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZElucHV0XCIpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyVmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJwYXNzd29yZElucHV0XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwicGxhY2Vob2xkZXJcIixwbGFjZWhvbGRlclZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoRW50ZXJMaXN0ZW5lcihsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwicGFzc3dvcmRJbnB1dFwiKSwgXCJvbmtleXVwXCIsIFwiLy9ldmVudDpwYXNzd29yZElucHV0RW50ZXJcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgbGV0IGVudGVyQ2hlY2sgPSBuZXcgT2JqZWN0RnVuY3Rpb24odGhpcywoZXZlbnQpID0+IHsgaWYoZXZlbnQuZ2V0S2V5Q29kZSgpID09PSAxMyAmJiB0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHsgbGlzdGVuZXIuY2FsbCgpOyB9IH0pO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5saXN0ZW4oXCIvL2V2ZW50OnBhc3N3b3JkSW5wdXRFbnRlclwiLCBlbnRlckNoZWNrLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwYXNzd29yZElucHV0Qmx1cnJlZCgpIHtcclxuICAgICAgICBpZih0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicGFzc3dvcmRFcnJvclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoaWRlVmFsaWRhdGlvbkVycm9yKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInBhc3N3b3JkRXJyb3JcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInBhc3N3b3JkSW5wdXRcIikuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBbGwoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicGFzc3dvcmRJbnB1dFwiKS5zZWxlY3RBbGwoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnksIEV2ZW50UmVnaXN0cnksIENhbnZhc1N0eWxlcywgRGF0YUJpbmRSZWdpc3RyeSwgQ29tcG9uZW50LCBJbnB1dEVsZW1lbnREYXRhQmluZGluZyB9IGZyb20gXCJqdXN0cmlnaHRfY29yZV92MVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIE9iamVjdEZ1bmN0aW9uIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XHJcblxyXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVGV4dElucHV0XCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dCB7XHJcblxyXG5cdHN0YXRpYyBnZXQgQ09NUE9ORU5UX05BTUUoKSB7IHJldHVybiBcIlRleHRJbnB1dFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFRFTVBMQVRFX1VSTCgpIHsgcmV0dXJuIFwiL2Fzc2V0cy9qdXN0cmlnaHRqcy11aS90ZXh0SW5wdXQuaHRtbFwiOyB9XHJcbiAgICBzdGF0aWMgZ2V0IFNUWUxFU19VUkwoKSB7IHJldHVybiBcIi9hc3NldHMvanVzdHJpZ2h0anMtdWkvdGV4dElucHV0LmNzc1wiOyB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50RmFjdG9yeX0gKi9cclxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBDb21wb25lbnRGYWN0b3J5O1xyXG5cclxuICAgICAgICAvKiogQHR5cGUge0V2ZW50UmVnaXN0cnl9ICovXHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5ID0gRXZlbnRSZWdpc3RyeTtcclxuXHJcbiAgICAgICAgLyoqIEB0eXBlIHtEYXRhQmluZFJlZ2lzdHJ5fSAqL1xyXG4gICAgICAgIHRoaXMuZGF0YUJpbmRSZWdpc3RyeSA9IERhdGFCaW5kUmVnaXN0cnk7XHJcblxyXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9uZW50KCkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcIlRleHRJbnB1dFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0Q29uZmlnKCkge1xyXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShUZXh0SW5wdXQuQ09NUE9ORU5UX05BTUUpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInRleHRJbnB1dFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcclxuICAgIH1cclxuXHJcblx0Z2V0Q29tcG9uZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aE1vZGVsKG1vZGVsLCB2YWxpZGF0b3IpIHtcclxuICAgICAgICB0aGlzLmRhdGFCaW5kUmVnaXN0cnlcclxuICAgICAgICAgICAgLmFkZChJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKG1vZGVsLCB2YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldChcInRleHRJbnB1dFwiKSkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdpdGhQbGFjZWhvbGRlcihwbGFjZWhvbGRlclZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwidGV4dElucHV0XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwicGxhY2Vob2xkZXJcIiwgcGxhY2Vob2xkZXJWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aENsaWNrTGlzdGVuZXIoY2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwidGV4dElucHV0XCIpLCBcIm9uY2xpY2tcIiwgXCIvL2V2ZW50OnRleHRJbnB1dENsaWNrZWRcIiwgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6dGV4dElucHV0Q2xpY2tlZFwiLCBjbGlja0xpc3RlbmVyLCB0aGlzLmNvbXBvbmVudC5nZXRDb21wb25lbnRJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoRW50ZXJMaXN0ZW5lcihsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRSZWdpc3RyeS5hdHRhY2godGhpcy5jb21wb25lbnQuZ2V0KFwidGV4dElucHV0XCIpLCBcIm9ua2V5dXBcIiwgXCIvL2V2ZW50OnRleHRJbnB1dEVudGVyXCIsIHRoaXMuY29tcG9uZW50LmdldENvbXBvbmVudEluZGV4KCkpO1xyXG4gICAgICAgIGxldCBlbnRlckNoZWNrID0gbmV3IE9iamVjdEZ1bmN0aW9uKHRoaXMsIChldmVudCkgPT4geyBpZiAoZXZlbnQuZ2V0S2V5Q29kZSgpID09PSAxMykgeyBsaXN0ZW5lci5jYWxsKCk7IH0gfSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJlZ2lzdHJ5Lmxpc3RlbihcIi8vZXZlbnQ6dGV4dElucHV0RW50ZXJcIiwgZW50ZXJDaGVjaywgdGhpcy5jb21wb25lbnQuZ2V0Q29tcG9uZW50SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG59Il0sIm5hbWVzIjpbIkxvZ2dlciIsIkV2ZW50UmVnaXN0cnkiLCJDb21wb25lbnRGYWN0b3J5IiwiQ2FudmFzU3R5bGVzIiwiQ2FudmFzUm9vdCIsIkxPRyIsIkluamVjdG9yIiwiU3R5bGVzUmVnaXN0cnkiLCJPYmplY3RGdW5jdGlvbiIsIkRhdGFCaW5kUmVnaXN0cnkiLCJJbnB1dEVsZW1lbnREYXRhQmluZGluZyIsIkVtYWlsVmFsaWRhdG9yIiwiUmVxdWlyZWRWYWxpZGF0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBU0EsTUFBTSxHQUFHLEdBQUcsSUFBSUEsa0JBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFcEMsQUFBTyxNQUFNLFNBQVMsQ0FBQzs7Q0FFdEIsV0FBVyxjQUFjLEdBQUcsRUFBRSxPQUFPLFdBQVcsQ0FBQyxFQUFFO0NBQ25ELFdBQVcsWUFBWSxHQUFHLEVBQUUsT0FBTyx1Q0FBdUMsQ0FBQyxFQUFFO0lBQzFFLFdBQVcsVUFBVSxHQUFHLEVBQUUsT0FBTyxzQ0FBc0MsQ0FBQyxFQUFFOzs7OztJQUsxRSxXQUFXLEVBQUU7OztRQUdULElBQUksQ0FBQyxhQUFhLEdBQUdDLCtCQUFhLENBQUM7OztRQUduQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUdDLGtDQUFnQixDQUFDO0VBQy9DOztJQUVFLGVBQWUsR0FBRztRQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDOUQ7O0lBRUQsVUFBVSxHQUFHOztLQUVaOzs7OztDQUtKLFlBQVksRUFBRTtFQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNuQjs7Ozs7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
