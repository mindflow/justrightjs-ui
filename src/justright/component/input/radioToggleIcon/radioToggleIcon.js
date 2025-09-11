import {
    ComponentFactory,
    CanvasStyles,
    Component,
    EventManager,
    Event,
    InputElementDataBinding
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method } from "coreutil_v1";
import { CommonEvents } from "../../common/commonEvents";

const LOG = new Logger("RadioToggleIcon");

export class RadioToggleIcon {

    static COMPONENT_NAME = "RadioToggleIcon";
    static TEMPLATE_URL = "/assets/justrightjs-ui/radioToggleIcon.html";
    static STYLES_URL = "/assets/justrightjs-ui/radioToggleIcon.css";
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * @param {object} model
     */
    constructor(name = "?", model = null, icon = "fas fa-question", label = null) {

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventManager} */
        this.events = new EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.enabled = false;

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.icon = icon;

        /** @type {string} */
        this.label = label;

        /** @type {boolean} */
        this.checked = false;
    }

    postConfig() {
        this.component = this.componentFactory.create(RadioToggleIcon.COMPONENT_NAME);
        CanvasStyles.enableStyle(RadioToggleIcon.COMPONENT_NAME);

        const radio = this.component.get("radio");
        radio.setAttributeValue("name", this.name);
        radio.listenTo("click", new Method(this, this.clicked));

        const id = radio.getAttributeValue("id");

        const label = this.component.get("label");
        label.setAttributeValue("for", id);

        const icon = this.component.get("icon");
        icon.setAttributeValue("class", this.icon);

        if (this.model) {
            InputElementDataBinding.link(this.model).to(this.component.get("radio"));
        }

        this.component.get("radio").listenTo("change", new Method(this, this.clicked));

    }

    /**
     * 
     * @param {Event} event 
     */
    clicked(event) {
        const oldValue = this.checked;
        this.checked = event.target.mappedElement.checked;

        if (oldValue !== this.checked) {
            this.events.trigger(RadioToggleIcon.EVENT_CHANGED, [event]);
        }

        if (this.checked) {
            this.events.trigger(RadioToggleIcon.EVENT_ENABLED, [event]);
        } else {
            this.events.trigger(RadioToggleIcon.EVENT_DISABLED, [event]);
        }
        
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} checked 
     */
    toggle(checked) {
        if (this.checked === checked) {
            return; // No change
        }
        this.checked = checked;
        if (this.component) {
            this.component.get("radio").mappedElement.click();
        }
    }

    /**
     * Get the current toggle state
     * @returns {boolean}
     */
    isChecked() {
        return this.checked;
    }
}
