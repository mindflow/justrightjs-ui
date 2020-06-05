import {
    AbstractValidator,
    EmailValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    InputElementDataBinding,
    Component
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("EmailInput");

export class EmailInput {

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {String} */
        this.name = name;

        /** @type {EmailValidator} */
        this.validator = new EmailValidator(mandatory)
            .withValidListener(new ObjectFunction(this, this.hideValidationError));

        /** @type {Boolean} */
        this.changed = false;

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.placeholder = placeholder;
    }

    postConfig() {
        
        this.component = this.componentFactory.create(EmailInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(EmailInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(EmailInput.INPUT_ELEMENT_ID);
        const error = this.component.get(EmailInput.ERROR_ELEMENT_ID);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", EmailInput.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", EmailInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", EmailInput.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", EmailInput.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(EmailInput.BLUR_EVENT, new ObjectFunction(this, this.blurred), idx);
        this.eventRegistry.listen(EmailInput.KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(EmailInput.CHANGE_EVENT, new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(EmailInput.ERROR_CLICK_EVENT, new ObjectFunction(this, this.hideValidationError), idx);

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
        InputElementDataBinding
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