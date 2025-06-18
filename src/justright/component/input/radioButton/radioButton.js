import {
    ComponentFactory,
    CanvasStyles,
    Component,
    InputElementDataBinding,
    EventManager
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method } from "coreutil_v1";

const LOG = new Logger("RadioButton");

export class RadioButton {

	static COMPONENT_NAME = "RadioButton";
    static TEMPLATE_URL = "/assets/justrightjs-ui/radioButton.html";
    static STYLES_URL = "/assets/justrightjs-ui/radioButton.css";
    
    static EVENT_CLICKED = "click";

    /**
     * 
     * @param {string} name 
     * @param {object} model
     */
    constructor(name, model = null) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventManager} */
        this.events = new EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

    }

    postConfig() {
        this.component = this.componentFactory.create(RadioButton.COMPONENT_NAME);
        CanvasStyles.enableStyle(RadioButton.COMPONENT_NAME);
        this.component.get("radioButton").setAttributeValue("name",this.name);

        if (this.model) {
            InputElementDataBinding.link(this.model).to(this.component.get("radioButton"));
        }

        this.component.get("radioButton").listenTo("click", new Method(this, this.clicked));
    }

    clicked(event) {
        this.events.trigger(RadioButton.EVENT_CLICKED, [event]);
    }

}