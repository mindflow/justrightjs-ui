import {
    AbstractValidator,
    EmailValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    Component,
    InputElementDataBinding
} from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("EmailInput");

export class EmailInput {

	static get COMPONENT_NAME() { return "EmailInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }
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

        this.validator = new EmailValidator()
            .withValidListener(new ObjectFunction(this, this.hideValidationError));

        this.changed = false;
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("EmailInput");
    }

    postConfig() {
        CanvasStyles.enableStyle(EmailInput.COMPONENT_NAME);

        let idx = this.component.getComponentIndex();
        let emailInput = this.component.get("emailInput");
        let emailError = this.component.get("emailError");

        emailInput.setAttributeValue("name",this.name);

        this.eventRegistry.attach(emailInput, "onblur", "//event:emailInputBlur", idx);
        this.eventRegistry.attach(emailInput, "onkeyup", "//event:emailInputKeyUp", idx);
        this.eventRegistry.attach(emailInput, "onchange", "//event:emailInputChange", idx);
        this.eventRegistry.attach(emailError, "onclick", "//event:emailErrorClicked", idx);

        this.eventRegistry.listen("//event:emailInputBlur", new ObjectFunction(this, this.blurred), idx);
        this.eventRegistry.listen("//event:emailInputKeyUp", new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen("//event:emailInputChange", new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen("//event:emailErrorClicked", new ObjectFunction(this, this.hideValidationError), idx);

        this.withPlaceholder("Email");
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
        InputElementDataBinding
            .link(model, this.validator)
            .to(this.component.get("emailInput"));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get("emailInput").setAttributeValue("placeholder",placeholderValue);
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

    showValidationError() { this.component.get("emailError").setStyle("display","block"); }
    hideValidationError() { this.component.get("emailError").setStyle("display","none"); }
    focus() { this.component.get("emailInput").focus(); }
    selectAll() { this.component.get("emailInput").selectAll(); }
    enable() { this.component.get("emailInput").enable(); }
    disable() { this.component.get("emailInput").disable(); }
}