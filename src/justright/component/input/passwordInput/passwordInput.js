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

const INPUT = "passwordInput";
const ERROR = "passwordError";

const BLUR_EVENT = "//event:passwordInputBlur";
const KEYUP_EVENT = "//event:passwordInputKeyUp";
const CHANGE_EVENT = "//event:passwordInputChange";
const ERROR_CLICK_EVENT = "//event:passwordErrorClicked";

export class PasswordInput {

	static get COMPONENT_NAME() { return "PasswordInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

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

        this.validator = new RequiredValidator()
            .withValidListener(new ObjectFunction(this, this.hideValidationError));

        this.changed = false;
    }

    postConfig() {
        this.component = this.componentFactory.create("PasswordInput");

        CanvasStyles.enableStyle(PasswordInput.COMPONENT_NAME);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(INPUT);
        const error = this.component.get(ERROR);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(BLUR_EVENT, new ObjectFunction(this, this.passwordInputBlurred), idx);
        this.eventRegistry.listen(KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(CHANGE_EVENT, new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(ERROR_CLICK_EVENT, new ObjectFunction(this, this.hideValidationError), idx);

        this.withPlaceholder("Password");
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
            .to(this.component.get(INPUT));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get(INPUT).setAttributeValue("placeholder",placeholderValue);
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

    showValidationError() { this.component.get(ERROR).setStyle("display","block"); }
    hideValidationError() { this.component.get(ERROR).setStyle("display","none"); }
    focus() { this.component.get(INPUT).focus(); }
    selectAll() { this.component.get(INPUT).selectAll(); }
    enable() { this.component.get(INPUT).enable(); }
    disable() { this.component.get(INPUT).disable(); }
}