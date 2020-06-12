import { 
    AbstractValidator,
    ComponentFactory,
    CanvasStyles,
    AndValidatorSet,
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";
import { PasswordMatcherInputValue } from "./passwordMatcherInputValue/passwordMatcherInputValue";
import { PasswordMatcherInputControl } from "./passwordMatcherInputControl/passwordMatcherInputControl";

const LOG = new Logger("PasswordMatcherInput");

export class PasswordMatcherInput {

	static get COMPONENT_NAME() { return "PasswordMatcherInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInput.css"; }

    /**
     * 
     * @param {string} name 
     * @param {boolean} mandatory 
     * @param {string} placeholder 
     * @param {string} controlPlaceholder 
     * @param {object} model 
     * @param {ObjectFunction} comparedValueFunction 
     * @param {ObjectFunction} passwordEnteredListener 
     */
    constructor(name, controlName, mandatory = false, 
        placeholder = PasswordMatcherInput.DEFAULT_PLACEHOLDER, 
        controlPlaceholder = PasswordMatcherInput.DEFAULT_CONTROL_PLACEHOLDER,
        model = null,
        comparedValueFunction = null,
        passwordEnteredListener = null) {


        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {PasswordMatcherInputValue} */
		this.passwordMatcherInputValue = InjectionPoint.instance(
			PasswordMatcherInputValue, [name, mandatory, placeholder, model, null, null, new ObjectFunction(this, this.passwordEntered)]
		);

        /** @type {PasswordMatcherInputControl} */
		this.passwordMatcherInputControl = InjectionPoint.instance(
			PasswordMatcherInputControl, [controlName, mandatory, controlPlaceholder, model, comparedValueFunction, null, null, passwordEnteredListener]
		);
    }

    postConfig() {
        this.component = this.componentFactory.create(PasswordMatcherInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        this.component.setChild("passwordMatcherInputValue",this.passwordMatcherInputValue.getComponent());
        this.component.setChild("passwordMatcherInputControl",this.passwordMatcherInputControl.getComponent());

        /** @type {AndValidatorSet} */
        this.validator = new AndValidatorSet()
            .withValidator(this.passwordMatcherInputValue.getValidator())
            .withValidator(this.passwordMatcherInputControl.getValidator());

    }

    passwordEntered() {
        if(this.passwordMatcherInputValue.getValidator().isValid()) {
            this.passwordMatcherInputControl.focus();
        }
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

    focus() { this.passwordMatcherInputValue.focus(); }
    selectAll() { this.passwordMatcherInputValue.selectAll(); }
    enable() { this.passwordMatcherInputValue.enable(); this.passwordMatcherInputControl.enable(); }
    disable() { this.passwordMatcherInputValue.disable(); this.passwordMatcherInputControl.disable(); }
    clear() { this.passwordMatcherInputValue.clear(); this.passwordMatcherInputControl.clear(); }
}