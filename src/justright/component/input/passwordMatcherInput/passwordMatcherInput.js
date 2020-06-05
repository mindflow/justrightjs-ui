import { 
    AbstractValidator,
    EqualsValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    InputElementDataBinding, 
    AndValidatorSet,
    PasswordValidator,
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("PasswordMatcherInput");

export class PasswordMatcherInput {

	static get COMPONENT_NAME() { return "PasswordMatcherInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.css"; }

    static get BLUR_EVENT() { return "//event:passwordMatcherInputBlur"; }
    static get KEYUP_EVENT() { return "//event:passwordMatcherInputKeyUp"; }
    static get CHANGE_EVENT() { return "//event:passwordMatcherInputChange"; }
    static get ERROR_CLICK_EVENT() { return "//event:passwordMatcherErrorClicked"; }
    
    static get CONTROL_BLUR_EVENT() { return "//event:passwordMatcherControlInputBlur"; }
    static get CONTROL_KEYUP_EVENT() { return "//event:passwordMatcherControlInputKeyUp"; }
    static get CONTROL_CHANGE_EVENT() { return "//event:passwordMatcherControlInputChange"; }
    static get CONTROL_ERROR_CLICK_EVENT() { return "//event:passwordMatcherControlErrorClicked"; }
    
    static get DEFAULT_PLACEHOLDER() { return "Password"; }
    static get DEFAULT_CONTROL_PLACEHOLDER() { return "Confirm password"; }
    
    static get INPUT_ELEMENT_ID() { return "passwordMatcherInput"; }
    static get CONTROL_INPUT_ELEMENT_ID() { return "passwordMatcherControlInput"; }
    static get ERROR_ELEMENT_ID() { return "passwordMatcherError"; }
    static get CONTROL_ERROR_ELEMENT_ID() { return "passwordMatcherControlError"; }

    /**
     * 
     * @param {string} name 
     */
    constructor(name, mandatory = false, placeholder = PasswordMatcherInput.DEFAULT_PLACEHOLDER, controlPlaceholder = PasswordMatcherInput.DEFAULT_CONTROL_PLACEHOLDER) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {String} */
        this.name = name;

        /** @type {PasswordValidator} */
        this.passwordValidator = new PasswordValidator(mandatory)
            .withValidListener(new ObjectFunction(this, this.hidePasswordValidationError));

        /** @type {EqualsValidator} */
        this.controlValidator = new EqualsValidator(mandatory)
            .withValidListener(new ObjectFunction(this, this.hideControlValidationError));

        /** @type {AndValidatorSet} */
        this.validator = new AndValidatorSet()
            .withValidator(this.passwordValidator)
            .withValidator(this.controlValidator);

        /** @type {Boolean} */
        this.changed = false;

        /** @type {Boolean} */
        this.controlChanged = false;

        /** @type {String} */
        this.placeholder = placeholder;

        /** @type {String} */
        this.controlPlaceholder = controlPlaceholder;
    }

    postConfig() {
        this.component = this.componentFactory.create(PasswordMatcherInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();

        const input = this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID);
        const error = this.component.get(PasswordMatcherInput.ERROR_ELEMENT_ID);

        const controlInput = this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID);
        const controlError = this.component.get(PasswordMatcherInput.CONTROL_ERROR_ELEMENT_ID);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", PasswordMatcherInput.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", PasswordMatcherInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", PasswordMatcherInput.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", PasswordMatcherInput.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.attach(controlInput, "onblur", PasswordMatcherInput.CONTROL_BLUR_EVENT, idx);
        this.eventRegistry.attach(controlInput, "onkeyup", PasswordMatcherInput.CONTROL_KEYUP_EVENT, idx);
        this.eventRegistry.attach(controlInput, "onchange", PasswordMatcherInput.CONTROL_CHANGE_EVENT, idx);
        this.eventRegistry.attach(controlError, "onclick", PasswordMatcherInput.CONTROL_ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(PasswordMatcherInput.BLUR_EVENT, new ObjectFunction(this, this.blur), idx);
        this.eventRegistry.listen(PasswordMatcherInput.KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(PasswordMatcherInput.CHANGE_EVENT, new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(PasswordMatcherInput.ERROR_CLICK_EVENT, new ObjectFunction(this, this.hidePasswordValidationError), idx);

        this.eventRegistry.listen(PasswordMatcherInput.CONTROL_BLUR_EVENT, new ObjectFunction(this, this.controlBlur), idx);
        this.eventRegistry.listen(PasswordMatcherInput.CONTROL_KEYUP_EVENT, new ObjectFunction(this, this.controlKeyUp), idx);
        this.eventRegistry.listen(PasswordMatcherInput.CONTROL_CHANGE_EVENT, new ObjectFunction(this, this.controlChange), idx);
        this.eventRegistry.listen(PasswordMatcherInput.CONTROL_ERROR_CLICK_EVENT, new ObjectFunction(this, this.hideControlValidationError), idx);

        this.withPlaceholder(this.placeholder, this.controlPlaceholder);
    }

    controlChange() {
        this.changed = true;
    }

    controlKeyUp(event) {
        if(this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).getValue() !== "") {
            this.controlChanged = true;
        }
        if (event.getKeyCode() !== 13) {
            return;
        }
        if (!this.controlValidator.isValid()) {
            this.showControlValidationError();
            this.selectAllControl();
            return;
        }
        if (this.enterListener) {
            this.enterListener.call();
        }
    }

    change() {
        if(this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).getValue() !== this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).getValue()) {
            this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).setValue("");
        }
        this.changed = true;
    }

    keyUp(event) {
        if(this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).getValue() !== "") {
            this.changed = true;
        }
        this.controlValidator.setValue(this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).getValue());
        this.controlValidator.validate(this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).getValue());
        if (event.getKeyCode() !== 13) {
            return;
        }
        if (!this.passwordValidator.isValid()) {
            this.showPasswordValidationError();
            this.selectAll();
            return;
        }
        this.focusControl();
        this.selectAllControl();
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

    withModel(model) {
        InputElementDataBinding
            .link(model, this.passwordValidator)
            .to(this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID));
        
        InputElementDataBinding
            .link(model, this.controlValidator)
            .to(this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID));
        return this;
    }

    withPlaceholder(placeholderValue, controlPlaceHolderValue) {
        this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).setAttributeValue("placeholder",placeholderValue);
        this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).setAttributeValue("placeholder",controlPlaceHolderValue);
        return this;
    }

    withEnterListener(listener) {
        this.enterListener = listener;
        return this;
    }

    controlBlur() {
        if (!this.controlChanged) {
            return;
        }
        if (!this.controlValidator.isValid()) {
            this.showControlValidationError();
            return;
        }
        this.hideControlValidationError();
    }

    blur() {
        if (!this.changed) {
            return;
        }
        if (!this.passwordValidator.isValid()) {
            this.showPasswordValidationError();
            return;
        }
        this.hidePasswordValidationError();
    }

    showPasswordValidationError() { this.component.get(PasswordMatcherInput.ERROR_ELEMENT_ID).setStyle("display","block"); }
    hidePasswordValidationError() { this.component.get(PasswordMatcherInput.ERROR_ELEMENT_ID).setStyle("display","none"); }
    showControlValidationError() { this.component.get(PasswordMatcherInput.CONTROL_ERROR_ELEMENT_ID).setStyle("display","block"); }
    hideControlValidationError() { this.component.get(PasswordMatcherInput.CONTROL_ERROR_ELEMENT_ID).setStyle("display","none"); }
    focus() { this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).focus(); }
    focusControl() { this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).focus(); }
    selectAll() { this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).selectAll(); }
    selectAllControl() { this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).selectAll(); }
    enable() { this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).enable(); this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).enable(); }
    disable() { this.component.get(PasswordMatcherInput.INPUT_ELEMENT_ID).disable(); this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).disable(); }
    enableControl() { this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).enable(); }
    disableControl() { this.component.get(PasswordMatcherInput.CONTROL_INPUT_ELEMENT_ID).disable(); }
}