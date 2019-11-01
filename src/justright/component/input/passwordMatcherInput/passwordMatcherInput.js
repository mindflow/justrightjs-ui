import { 
    AbstractValidator,
    EqualsValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    DataBindRegistry,
    Component,
    InputElementDataBinding, 
    AndValidatorSet,
    PasswordValidator
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

        /** @type {DataBindRegistry} */
        this.dataBindRegistry = DataBindRegistry;

        this.name = name;

        this.passwordValidator = new PasswordValidator()
            .withValidListener(new ObjectFunction(this, this.hidePasswordValidationError));

        this.controlValidator = new EqualsValidator()
            .withValidListener(new ObjectFunction(this, this.hideControlValidationError));

        this.validator = new AndValidatorSet()
            .withValidator(this.passwordValidator)
            .withValidator(this.controlValidator);
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
        this.eventRegistry.attach(passwordMatcherInput, "onkeyup", "//event:passwordMatcherInputEnter", idx);
        this.eventRegistry.attach(passwordMatcherError, "onclick", "//event:passwordMatcherErrorClicked", idx);

        this.eventRegistry.attach(passwordMatcherControlInput, "onblur", "//event:passwordMatcherControlInputBlur", idx);
        this.eventRegistry.attach(passwordMatcherControlInput, "onkeyup", "//event:passwordMatcherControlInputEnter", idx);
        this.eventRegistry.attach(passwordMatcherControlError, "onclick", "//event:passwordMatcherControlErrorClicked", idx);

        this.eventRegistry.listen("//event:passwordMatcherInputBlur", new ObjectFunction(this, this.passwordMatcherInputBlurred), idx);
        this.eventRegistry.listen("//event:passwordMatcherControlInputBlur", new ObjectFunction(this, this.passwordMatcherControlInputBlurred), idx);

        this.eventRegistry.listen("//event:passwordMatcherErrorClicked", new ObjectFunction(this, this.hidePasswordValidationError), idx);
        this.eventRegistry.listen("//event:passwordMatcherControlErrorClicked", new ObjectFunction(this, this.hideControlValidationError), idx);

        let enterCheck = new ObjectFunction(this, (event) => {
            this.controlValidator.setValue(this.component.get(INPUT).getValue());
            this.controlValidator.invalid();
            this.component.get(CONTROL_INPUT).setValue("");
            if (event.getKeyCode() === 13) {
                if (!this.passwordValidator.isValid()) {
                    this.showPasswordValidationError();
                    this.selectAll();
                } else {
                    this.focusControl();
                    this.selectAllControl();
                }
            }
        });
        this.eventRegistry.listen("//event:passwordMatcherInputEnter", enterCheck, this.component.getComponentIndex());

        let controlEnterCheck = new ObjectFunction(this, (event) => {
            if (event.getKeyCode() === 13) {
                if (!this.controlValidator.isValid()) {
                    this.showControlValidationError();
                    this.selectAllControl();
                }
            }
        });
        this.eventRegistry.listen("//event:passwordMatcherControlInputEnter", controlEnterCheck, this.component.getComponentIndex());

        this.withPlaceholder("Password", "Confirm password");
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
            InputElementDataBinding
                .link(model, this.passwordValidator)
                .to(this.component.get(INPUT))
        );
        this.dataBindRegistry.add(
            InputElementDataBinding
                .link(model, this.controlValidator)
                .to(this.component.get(CONTROL_INPUT))
        );
        return this;
    }

    withPlaceholder(placeholderValue, controlPlaceHolderValue) {
        this.component.get(INPUT).setAttributeValue("placeholder",placeholderValue);
        this.component.get(CONTROL_INPUT).setAttributeValue("placeholder",controlPlaceHolderValue);
        return this;
    }

    withEnterListener(listener) {
        let enterCheck = new ObjectFunction(this,(event) => { if(event.getKeyCode() === 13 && this.validator.isValid()) { listener.call(); } });
        this.eventRegistry.listen("//event:passwordMatcherControlInputEnter", enterCheck, this.component.getComponentIndex());
        return this;
    }

    passwordMatcherControlInputBlurred() {
        if(this.controlValidator.isValid()) {
            this.hideControlValidationError();
        } else {
            this.showControlValidationError();
        }
    }

    passwordMatcherInputBlurred() {
        if(this.passwordValidator.isValid()) {
            this.hidePasswordValidationError();
        } else {
            this.showPasswordValidationError();
        }
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