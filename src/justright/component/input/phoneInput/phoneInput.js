import {
    AbstractValidator,
    PhoneValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    InputElementDataBinding,
    Component
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction, StringUtils } from "coreutil_v1";

const LOG = new Logger("PhoneInput");

export class PhoneInput {

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
    constructor(name, mandatory = false, placeholder = PhoneInput.DEFAULT_PLACEHOLDER) {
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {String} */
        this.name = name;

        /** @type {PhoneValidator} */
        this.validator = new PhoneValidator(mandatory)
            .withValidListener(new ObjectFunction(this, this.hideValidationError));

        /** @type {Boolean} */
        this.changed = false;

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.placeholder = placeholder;
    }

    postConfig() {
        
        this.component = this.componentFactory.create(PhoneInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(PhoneInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(PhoneInput.INPUT_ELEMENT_ID);
        const error = this.component.get(PhoneInput.ERROR_ELEMENT_ID);

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
            .to(this.component.get(PhoneInput.INPUT_ELEMENT_ID));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get(PhoneInput.INPUT_ELEMENT_ID).setAttributeValue("placeholder",placeholderValue);
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

    showValidationError() { this.component.get(PhoneInput.ERROR_ELEMENT_ID).setStyle("display","block"); }
    hideValidationError() { this.component.get(PhoneInput.ERROR_ELEMENT_ID).setStyle("display","none"); }
    focus() { this.component.get(PhoneInput.INPUT_ELEMENT_ID).focus(); }
    selectAll() { this.component.get(PhoneInput.INPUT_ELEMENT_ID).selectAll(); }
    enable() { this.component.get(PhoneInput.INPUT_ELEMENT_ID).enable(); }
    disable() { this.component.get(PhoneInput.INPUT_ELEMENT_ID).disable(); }
}