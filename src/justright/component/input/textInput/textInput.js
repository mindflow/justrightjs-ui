import { ComponentFactory, EventRegistry, CanvasStyles, Component, InputElementDataBinding } from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("TextInput");

const KEYUP_EVENT = "//event:textInputKeyUp";
const CLICK_EVENT = "//event:textInputClicked";

export class TextInput {

	static get COMPONENT_NAME() { return "TextInput"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }
    /**
     * 
     * @param {string} name
     */
    constructor(name) {
        /** @type {ComponentFactory} */
        this.componentFactory = ComponentFactory;

        /** @type {EventRegistry} */
        this.eventRegistry = EventRegistry;

        /** @type {string} */
        this.name = name;

        const idx = this.component.getComponentIndex();
        const input = this.component.get("textInput");

        this.eventRegistry.attach(input, "onkeyup", KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onclick", CLICK_EVENT, idx);

        this.eventRegistry.listen(KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(CLICK_EVENT, new ObjectFunction(this, this.click), idx);

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

    createComponent() {
        /** @type {Component} */
        this.component = this.componentFactory.create("TextInput");
    }

    postConfig() {
        CanvasStyles.enableStyle(TextInput.COMPONENT_NAME);
        this.component.get("textInput").setAttributeValue("name", this.name);
    }

	getComponent(){
		return this.component;
    }

    withModel(model, validator) {
        InputElementDataBinding.link(model, validator).to(this.component.get("textInput"));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get("textInput").setAttributeValue("placeholder", placeholderValue);
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

}