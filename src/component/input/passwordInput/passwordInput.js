import { 
    AbstractValidator,
    RequiredValidator,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    DataBindRegistry,
    Component,
    InputElementDataBinding 
} from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("PasswordInput");

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
        this.componentFactory = ComponentFactory;

        /** @type {EventRegistry} */
        this.eventRegistry = EventRegistry;

        /** @type {DataBindRegistry} */
        this.dataBindRegistry = DataBindRegistry;

        this.name = name;

        this.validator = new RequiredValidator()
            .withValidListener(new ObjectFunction(this, this.hideValidationError));
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("PasswordInput");
    }

    postConfig() {
        CanvasStyles.enableStyle(PasswordInput.COMPONENT_NAME);

        let idx = this.component.getComponentIndex();
        let passwordInput = this.component.get("passwordInput");
        let passwordError = this.component.get("passwordError");

        passwordInput.setAttributeValue("name",this.name);

        this.eventRegistry.attach(passwordInput, "onblur", "//event:passwordInputBlur", idx);
        this.eventRegistry.attach(passwordError, "onclick", "//event:passwordErrorClicked", idx);
        this.eventRegistry.attach(passwordInput, "onkeyup", "//event:passwordInputEnter", idx);

        this.eventRegistry.listen("//event:passwordInputBlur", new ObjectFunction(this, this.passwordInputBlurred), idx);

        this.eventRegistry.listen("//event:passwordErrorClicked", new ObjectFunction(this, this.hideValidationError), idx);

        let enterCheck = new ObjectFunction(this, (event) => {
            if (event.getKeyCode() === 13 && !this.validator.isValid()) {
                this.showValidationError();
                this.selectAll();
            }
        });
        this.eventRegistry.listen("//event:passwordInputEnter", enterCheck, this.component.getComponentIndex());
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
                .link(model, this.validator)
                .to(this.component.get("passwordInput"))
        );
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get("passwordInput").setAttributeValue("placeholder",placeholderValue);
        return this;
    }

    withEnterListener(listener) {
        this.eventRegistry.attach(this.component.get("passwordInput"), "onkeyup", "//event:passwordInputEnter", this.component.getComponentIndex());
        let enterCheck = new ObjectFunction(this,(event) => { if(event.getKeyCode() === 13 && this.validator.isValid()) { listener.call(); } });
        this.eventRegistry.listen("//event:passwordInputEnter", enterCheck, this.component.getComponentIndex());
        return this;
    }

    passwordInputBlurred() {
        if(this.validator.isValid()) {
            this.hideValidationError();
        } else {
            this.showValidationError();
        }
    }

    showValidationError() {
        this.component.get("passwordError").setStyle("display","block");
    }
    
    hideValidationError() {
        this.component.get("passwordError").setStyle("display","none");
    }

    focus() {
        this.component.get("passwordInput").focus();
    }

    selectAll() {
        this.component.get("passwordInput").selectAll();
    }
}