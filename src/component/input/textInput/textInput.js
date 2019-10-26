import { ComponentFactory, EventRegistry, CanvasStyles, DataBindRegistry, Component, InputElementDataBinding } from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("TextInput");

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

        /** @type {DataBindRegistry} */
        this.dataBindRegistry = DataBindRegistry;

        /** @type {string} */
        this.name = name;
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
        this.dataBindRegistry
            .add(InputElementDataBinding.link(model, validator).to(this.component.get("textInput")));
        return this;
    }

    withPlaceholder(placeholderValue) {
        this.component.get("textInput").setAttributeValue("placeholder", placeholderValue);
        return this;
    }

    withClickListener(clickListener) {
        this.eventRegistry.attach(this.component.get("textInput"), "onclick", "//event:textInputClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:textInputClicked", clickListener, this.component.getComponentIndex());
        return this;
    }

    withEnterListener(listener) {
        this.eventRegistry.attach(this.component.get("textInput"), "onkeyup", "//event:textInputEnter", this.component.getComponentIndex());
        let enterCheck = new ObjectFunction(this, (event) => { if (event.getKeyCode() === 13) { listener.call(); } });
        this.eventRegistry.listen("//event:textInputEnter", enterCheck, this.component.getComponentIndex());
        return this;
    }

}