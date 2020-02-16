import { 
    AbstractValidator,
    EqualsValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    Component,
    InputElementDataBinding, 
    AndValidatorSet,
    PasswordValidator,
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("PasswordMatcherInput");

const INPUT = "passwordMatcherInput";
const CONTROL_INPUT ="passwordMatcherControlInput"
const ERROR = "passwordMatcherError";
const CONTROL_ERROR = "passwordMatcherControlError";

const BLUR_EVENT = "//event:passwordMatcherInputBlur";
const KEYUP_EVENT = "//event:passwordMatcherInputKeyUp";
const CHANGE_EVENT = "//event:passwordMatcherInputChange";
const ERROR_CLICK_EVENT = "//event:passwordMatcherErrorClicked";

const CONTROL_BLUR_EVENT = "//event:passwordMatcherControlInputBlur";
const CONTROL_KEYUP_EVENT = "//event:passwordMatcherControlInputKeyUp";
const CONTROL_CHANGE_EVENT = "//event:passwordMatcherControlInputChange";
const CONTROL_ERROR_CLICK_EVENT = "//event:passwordMatcherControlErrorClicked";

export class PasswordMatcherInput {

	static get COMPONENT_NAME() { return "PasswordMatcherInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.css"; }

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

        this.passwordValidator = new PasswordValidator()
            .withValidListener(new ObjectFunction(this, this.hidePasswordValidationError));

        this.controlValidator = new EqualsValidator()
            .withValidListener(new ObjectFunction(this, this.hideControlValidationError));

        this.validator = new AndValidatorSet()
            .withValidator(this.passwordValidator)
            .withValidator(this.controlValidator);

        this.changed = false;
        this.controlChanged = false;
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("PasswordMatcherInput");
    }

    postConfig() {
        CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();

        const input = this.component.get(INPUT);
        const error = this.component.get(ERROR);

        const controlInput = this.component.get(CONTROL_INPUT);
        const controlError = this.component.get(CONTROL_ERROR);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", ERROR_CLICK_EVENT, idx);

        this.eventRegistry.attach(controlInput, "onblur", CONTROL_BLUR_EVENT, idx);
        this.eventRegistry.attach(controlInput, "onkeyup", CONTROL_KEYUP_EVENT, idx);
        this.eventRegistry.attach(controlInput, "onchange", CONTROL_CHANGE_EVENT, idx);
        this.eventRegistry.attach(controlError, "onclick", CONTROL_ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(BLUR_EVENT, new ObjectFunction(this, this.blur), idx);
        this.eventRegistry.listen(KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(CHANGE_EVENT, new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(ERROR_CLICK_EVENT, new ObjectFunction(this, this.hidePasswordValidationError), idx);

        this.eventRegistry.listen(CONTROL_BLUR_EVENT, new ObjectFunction(this, this.controlBlur), idx);
        this.eventRegistry.listen(CONTROL_KEYUP_EVENT, new ObjectFunction(this, this.controlKeyUp), idx);
        this.eventRegistry.listen(CONTROL_CHANGE_EVENT, new ObjectFunction(this, this.controlChange), idx);
        this.eventRegistry.listen(CONTROL_ERROR_CLICK_EVENT, new ObjectFunction(this, this.hideControlValidationError), idx);

        this.withPlaceholder("Password", "Confirm password");
    }

    controlChange() {
        this.changed = true;
    }

    controlKeyUp(event) {
        if(this.component.get(CONTROL_INPUT).getValue() !== "") {
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
        if(this.component.get(CONTROL_INPUT).getValue() !== this.component.get(INPUT).getValue()) {
            this.component.get(CONTROL_INPUT).setValue("");
        }
        this.changed = true;
    }

    keyUp(event) {
        if(this.component.get(INPUT).getValue() !== "") {
            this.changed = true;
        }
        this.controlValidator.setValue(this.component.get(INPUT).getValue());
        this.controlValidator.validate(this.component.get(CONTROL_INPUT).getValue());
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
            .to(this.component.get(INPUT));
        
        InputElementDataBinding
            .link(model, this.controlValidator)
            .to(this.component.get(CONTROL_INPUT));
        return this;
    }

    withPlaceholder(placeholderValue, controlPlaceHolderValue) {
        this.component.get(INPUT).setAttributeValue("placeholder",placeholderValue);
        this.component.get(CONTROL_INPUT).setAttributeValue("placeholder",controlPlaceHolderValue);
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

    showPasswordValidationError() { this.component.get(ERROR).setStyle("display","block"); }
    hidePasswordValidationError() { this.component.get(ERROR).setStyle("display","none"); }
    showControlValidationError() { this.component.get(CONTROL_ERROR).setStyle("display","block"); }
    hideControlValidationError() { this.component.get(CONTROL_ERROR).setStyle("display","none"); }
    focus() { this.component.get(INPUT).focus(); }
    focusControl() { this.component.get(CONTROL_INPUT).focus(); }
    selectAll() { this.component.get(INPUT).selectAll(); }
    selectAllControl() { this.component.get(CONTROL_INPUT).selectAll(); }
    enable() { this.component.get(INPUT).enable(); }
    disable() { this.component.get(INPUT).disable(); }
    enableControl() { this.component.get(CONTROL_INPUT).enable(); }
    disableControl() { this.component.get(CONTROL_INPUT).disable(); }
}