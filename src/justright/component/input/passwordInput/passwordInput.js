import { 
    AbstractValidator,
    RequiredValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    Component,
    InputElementDataBinding 
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("PasswordInput");

export class PasswordInput {

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
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {String} */
        this.name = name;

        /** @type {RequiredValidator} */
        this.validator = new RequiredValidator(mandatory)
            .withValidListener(new ObjectFunction(this, this.hideValidationError));

        /** @type {Boolean} */
        this.changed = false;

        /** @type {String} */
        this.placeholder = placeholder;
    }

    postConfig() {
        this.component = this.componentFactory.create(PasswordInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(PasswordInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(PasswordInput.INPUT_ELEMENT_ID);
        const error = this.component.get(PasswordInput.ERROR_ELEMENT_ID);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", PasswordInput.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", PasswordInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", PasswordInput.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", PasswordInput.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(PasswordInput.BLUR_EVENT, new ObjectFunction(this, this.passwordInputBlurred), idx);
        this.eventRegistry.listen(PasswordInput.KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(PasswordInput.CHANGE_EVENT, new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(PasswordInput.ERROR_CLICK_EVENT, new ObjectFunction(this, this.hideValidationError), idx);

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