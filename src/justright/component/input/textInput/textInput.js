import { ComponentFactory, EventRegistry, CanvasStyles, InputElementDataBinding } from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";

const LOG = new Logger("TextInput");

export class TextInput {

	static get COMPONENT_NAME() { return "TextInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }

    static get KEYUP_EVENT() { return "//event:textInputKeyUp"; }
    static get CLICK_EVENT() { return "//event:textInputClicked"; }

    static get DEFAULT_PLACEHOLDER() { return "Text"; }

    static get INPUT_ELEMENT_ID() { return "textInput"; }
    static get ERROR_ELEMENT_ID() { return "textError"; }

    /**
     * 
     * @param {string} name
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER) {
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.placeholder = placeholder;

        /** @type {Boolean} */
        this.mandatory = mandatory;

    }

    keyUp(event) {
        if(event.getKeyCode() !== 13) {
            return;
        }
        if(this.enterListener) {
            this.enterListener.call();
        }
    }

    click(event) {
        if(this.clickListener) {
            this.clickListener.call();
        }
    }

    postConfig() {
        this.component = this.componentFactory.create(TextInput.COMPONENT_NAME);

        CanvasStyles.enableStyle(TextInput.COMPONENT_NAME);
        
        this.component.get(TextInput.INPUT_ELEMENT_ID).setAttributeValue("name", this.name);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(TextInput.INPUT_ELEMENT_ID);

        this.eventRegistry.attach(input, "onkeyup", TextInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onclick", TextInput.CLICK_EVENT, idx);

        this.eventRegistry.listen(TextInput.KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(TextInput.CLICK_EVENT, new ObjectFunction(this, this.click), idx);

        this.withPlaceholder(this.placeholder);
    }

	getComponent(){
		return this.component;
    }

    withModel(model, validator) {
        InputElementDataBinding.link(model, validator).to(this.component.get(TextInput.INPUT_ELEMENT_ID));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get(TextInput.INPUT_ELEMENT_ID).setAttributeValue("placeholder", placeholderValue);
        return this;
    }

    withClickListener(listener) {
        this.clickListener = listener;
        return this;
    }

    withEnterListener(listener) {
        this.enterListener = listener;
        return this;
    }

    showValidationError() { this.component.get(TextInput.ERROR_ELEMENT_ID).setStyle("display","block"); }
    hideValidationError() { this.component.get(TextInput.ERROR_ELEMENT_ID).setStyle("display","none"); }
    focus() { this.component.get(TextInput.INPUT_ELEMENT_ID).focus(); }
    selectAll() { this.component.get(TextInput.INPUT_ELEMENT_ID).selectAll(); }
    enable() { this.component.get(TextInput.INPUT_ELEMENT_ID).enable(); }
    disable() { this.component.get(TextInput.INPUT_ELEMENT_ID).disable(); }

}