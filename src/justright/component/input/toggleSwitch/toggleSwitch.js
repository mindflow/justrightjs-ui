import {
    ComponentFactory,
    CanvasStyles,
    Component,
    InputElementDataBinding,
    EventManager
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method } from "coreutil_v1";

const LOG = new Logger("ToggleSwitch");

export class ToggleSwitch {

    static COMPONENT_NAME = "ToggleSwitch";
    static TEMPLATE_URL = "/assets/justrightjs-ui/toggleSwitch.html";
    static STYLES_URL = "/assets/justrightjs-ui/toggleSwitch.css";
    
    static EVENT_TOGGLED = "toggle";
    static EVENT_CHANGED = "change";

    /**
     * 
     * @param {object} model
     */
    constructor(model = null) {
        
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventManager} */
        this.events = new EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.checked = false;

    }

    postConfig() {
        this.component = this.componentFactory.create(ToggleSwitch.COMPONENT_NAME);
        CanvasStyles.enableStyle(ToggleSwitch.COMPONENT_NAME);

        if (this.model) {
            InputElementDataBinding.link(this.model).to(this.component.get("toggleSwitch"));
        }

        this.component.get("toggleSwitch").listenTo("change", new Method(this, this.toggled));
        this.component.get("toggleSwitch").listenTo("click", new Method(this, this.clicked));
    }

    toggled(event) {
        this.checked = event.target.checked;
        this.events.trigger(ToggleSwitch.EVENT_TOGGLED, [event, this.checked]);
        this.events.trigger(ToggleSwitch.EVENT_CHANGED, [event, this.checked]);
    }

    clicked(event) {
        // Additional click handling if needed
        LOG.info("Toggle switch clicked");
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} checked 
     */
    setChecked(checked) {
        this.checked = checked;
        if (this.component) {
            this.component.get("toggleSwitch").setAttributeValue("checked", checked);
        }
    }

    /**
     * Get the current toggle state
     * @returns {boolean}
     */
    isChecked() {
        return this.checked;
    }

    /**
     * Enable or disable the toggle switch
     * @param {boolean} enabled 
     */
    setEnabled(enabled) {
        if (this.component) {
            this.component.get("toggleSwitch").setAttributeValue("disabled", !enabled);
        }
    }

}
