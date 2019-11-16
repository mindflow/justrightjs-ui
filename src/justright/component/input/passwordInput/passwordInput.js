import { 
    AbstractValidator,
    RequiredValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    Component,
    InputElementDataBinding 
} from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("PasswordInput");

const INPUT = "passwordInput";
const ERROR = "passwordError";

export class PasswordInput {

	static get COMPONENT_NAME() { return "PasswordInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        /** @type {ComponentFactory} */
        this.componentFactory = ComponentFactory;

        /** @type {EventRegistry} */
        this.eventRegistry = EventRegistry;

        this.name = name;

        this.validator = new RequiredValidator()
            .withValidListener(new ObjectFunction(this, this.hideValidationError));

        this.changed = false;
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("PasswordInput");
    }

    postConfig() {
        CanvasStyles.enableStyle(PasswordInput.COMPONENT_NAME);

        let idx = this.component.getComponentIndex();
        let passwordInput = this.component.get(INPUT);
        let passwordError = this.component.get(ERROR);

        passwordInput.setAttributeValue("name",this.name);

        this.eventRegistry.attach(passwordInput, "onblur", "//event:passwordInputBlur", idx);
        this.eventRegistry.attach(passwordInput, "onkeyup", "//event:passwordInputKeyUp", idx);
        this.eventRegistry.attach(passwordInput, "onchange", "//event:passwordInputChange", idx);
        this.eventRegistry.attach(passwordError, "onclick", "//event:passwordErrorClicked", idx);

        this.eventRegistry.listen("//event:passwordInputBlur", new ObjectFunction(this, this.passwordInputBlurred), idx);
        this.eventRegistry.listen("//event:passwordInputKeyUp", new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen("//event:passwordInputChange", new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen("//event:passwordErrorClicked", new ObjectFunction(this, this.hideValidationError), idx);

        this.withPlaceholder("Password");
    }

	getComponent(){
		return this.component;
    }

    change() {
        this.changed = true;
    }

    keyUp(event) {
        this.changed = true;
        if (event.getKeyCode() === 13 && !this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
        }
    }

    /**
     * @returns {AbstractValidator}
     */
    getValidator() {
        return this.validator;
    }

    withModel(model) {
        InputElementDataBinding
            .link(model, this.validator)
            .to(this.component.get(INPUT));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get(INPUT).setAttributeValue("placeholder",placeholderValue);
        return this;
    }

    withEnterListener(listener) {
        let enterCheck = new ObjectFunction(this,(event) => { if(event.getKeyCode() === 13 && this.validator.isValid()) { listener.call(); } });
        this.eventRegistry.listen("//event:passwordInputKeyUp", enterCheck, this.component.getComponentIndex());
        return this;
    }

    passwordInputBlurred() {
        if (!this.changed) {
            return;
        }
        if (this.validator.isValid()) {
            this.hideValidationError();
        } else {
            this.showValidationError();
        }
    }

    showValidationError() { this.component.get(ERROR).setStyle("display","block"); }
    hideValidationError() { this.component.get(ERROR).setStyle("display","none"); }
    focus() { this.component.get(INPUT).focus(); }
    selectAll() { this.component.get(INPUT).selectAll(); }
    enable() { this.component.get(INPUT).enable(); }
    disable() { this.component.get(INPUT).disable(); }
}