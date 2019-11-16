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
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("PasswordMatcherInput");

const INPUT = "passwordMatcherInput";
const CONTROL_INPUT ="passwordMatcherControlInput"
const ERROR = "passwordMatcherError";
const CONTROL_ERROR = "passwordMatcherControlError";

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
        this.componentFactory = ComponentFactory;

        /** @type {EventRegistry} */
        this.eventRegistry = EventRegistry;

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

        let idx = this.component.getComponentIndex();
        let passwordMatcherInput = this.component.get(INPUT);
        let passwordMatcherError = this.component.get(ERROR);

        let passwordMatcherControlInput = this.component.get(CONTROL_INPUT);
        let passwordMatcherControlError = this.component.get(CONTROL_ERROR);

        passwordMatcherInput.setAttributeValue("name",this.name);

        this.eventRegistry.attach(passwordMatcherInput, "onblur", "//event:passwordMatcherInputBlur", idx);
        this.eventRegistry.attach(passwordMatcherInput, "onkeyup", "//event:passwordMatcherInputKeyUp", idx);
        this.eventRegistry.attach(passwordMatcherInput, "onchange", "//event:passwordMatcherInputChange", idx);
        this.eventRegistry.attach(passwordMatcherError, "onclick", "//event:passwordMatcherErrorClicked", idx);

        this.eventRegistry.attach(passwordMatcherControlInput, "onblur", "//event:passwordMatcherControlInputBlur", idx);
        this.eventRegistry.attach(passwordMatcherControlInput, "onkeyup", "//event:passwordMatcherControlInputKeyUp", idx);
        this.eventRegistry.attach(passwordMatcherControlInput, "onchange", "//event:passwordMatcherControlInputChange", idx);
        this.eventRegistry.attach(passwordMatcherControlError, "onclick", "//event:passwordMatcherControlErrorClicked", idx);

        this.eventRegistry.listen("//event:passwordMatcherInputBlur", new ObjectFunction(this, this.passwordMatcherInputBlurred), idx);
        this.eventRegistry.listen("//event:passwordMatcherInputKeyUp",  new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen("//event:passwordMatcherInputChange",  new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen("//event:passwordMatcherErrorClicked", new ObjectFunction(this, this.hidePasswordValidationError), idx);

        this.eventRegistry.listen("//event:passwordMatcherControlInputBlur", new ObjectFunction(this, this.passwordMatcherControlInputBlurred), idx);
        this.eventRegistry.listen("//event:passwordMatcherControlInputKeyUp", new ObjectFunction(this, this.controlKeyUp), idx);
        this.eventRegistry.listen("//event:passwordMatcherControlInputChange", new ObjectFunction(this, this.controlChange), idx);
        this.eventRegistry.listen("//event:passwordMatcherControlErrorClicked", new ObjectFunction(this, this.hideControlValidationError), idx);

        this.withPlaceholder("Password", "Confirm password");
    }

    controlChange() {
        this.changed = true;
    }

    controlKeyUp(event) {
        this.controlChanged = true;
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
        this.changed = true;
    }

    keyUp(event) {
        this.changed = true;
        this.controlValidator.setValue(this.component.get(INPUT).getValue());
        this.controlValidator.invalid();
        this.component.get(CONTROL_INPUT).setValue("");
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

    passwordMatcherControlInputBlurred() {
        if (!this.controlChanged) {
            return;
        }
        if (!this.controlValidator.isValid()) {
            this.showControlValidationError();
            return;
        }
        this.hideControlValidationError();
    }

    passwordMatcherInputBlurred() {
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