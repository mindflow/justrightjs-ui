import {
    AbstractValidator,
    EmailValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    Component,
    InputElementDataBinding
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("EmailInput");

const BLUR_EVENT = "//event:emailInputBlur";
const KEYUP_EVENT = "//event:emailInputKeyUp";
const CHANGE_EVENT = "//event:emailInputChange";
const ERROR_CLICK_EVENT = "//event:emailErrorClicked";

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        this.name = name;

        this.validator = new EmailValidator()
            .withValidListener(new ObjectFunction(this, this.hideValidationError));

        this.changed = false;
    }

    postConfig() {
        this.component = this.componentFactory.create("EmailInput");

        CanvasStyles.enableStyle(EmailInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();
        const input = this.component.get("emailInput");
        const error = this.component.get("emailError");

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(BLUR_EVENT, new ObjectFunction(this, this.blurred), idx);
        this.eventRegistry.listen(KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(CHANGE_EVENT, new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(ERROR_CLICK_EVENT, new ObjectFunction(this, this.hideValidationError), idx);

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