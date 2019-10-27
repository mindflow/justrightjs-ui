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

const LOG = new Logger("PasswordMatcherInput");

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

        this.validator = new RequiredValidator()
            .withValidListener(new ObjectFunction(this, this.hideValidationError));
    }

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("PasswordMatcherInput");
    }

    postConfig() {
        CanvasStyles.enableStyle(PasswordMatcherInput.COMPONENT_NAME);

        let idx = this.component.getComponentIndex();
        let passwordMatcherInput = this.component.get("passwordMatcherInput");
        let passwordMatcherError = this.component.get("passwordMatcherError");

        passwordMatcherInput.setAttributeValue("name",this.name);

        this.eventRegistry.attach(passwordMatcherInput, "onblur", "//event:passwordMatcherInputBlur", idx);
        this.eventRegistry.attach(passwordMatcherError, "onclick", "//event:passwordMatcherErrorClicked", idx);
        this.eventRegistry.attach(passwordMatcherInput, "onkeyup", "//event:passwordMatcherInputEnter", idx);

        this.eventRegistry.listen("//event:passwordMatcherInputBlur", new ObjectFunction(this, this.passwordMatcherInputBlurred), idx);

        this.eventRegistry.listen("//event:passwordMatcherErrorClicked", new ObjectFunction(this, this.hideValidationError), idx);

        let enterCheck = new ObjectFunction(this, (event) => {
            if (event.getKeyCode() === 13 && !this.validator.isValid()) {
                this.showValidationError();
                this.selectAll();
            }
        });
        this.eventRegistry.listen("//event:passwordMatcherInputEnter", enterCheck, this.component.getComponentIndex());

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
                .link(model, this.validator)
                .to(this.component.get("passwordMatcherInput"))
        );
        return this;
    }

    withPlaceholder(placeholderValue, controlPlaceHolderValue) {
        this.component.get("passwordMatcherInput").setAttributeValue("placeholder",placeholderValue);
        this.component.get("passwordMatcherControlInput").setAttributeValue("placeholder",controlPlaceHolderValue);
        return this;
    }

    withEnterListener(listener) {
        let enterCheck = new ObjectFunction(this,(event) => { if(event.getKeyCode() === 13 && this.validator.isValid()) { listener.call(); } });
        this.eventRegistry.listen("//event:passwordMatcherInputEnter", enterCheck, this.component.getComponentIndex());
        return this;
    }

    passwordMatcherInputBlurred() {
        if(this.validator.isValid()) {
            this.hideValidationError();
        } else {
            this.showValidationError();
        }
    }

    showValidationError() {
        this.component.get("passwordMatcherError").setStyle("display","block");
    }
    
    hideValidationError() {
        this.component.get("passwordMatcherError").setStyle("display","none");
    }

    focus() {
        this.component.get("passwordMatcherInput").focus();
    }

    selectAll() {
        this.component.get("passwordMatcherInput").selectAll();
    }
}