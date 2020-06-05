import {
    ComponentFactory,
    EventRegistry,
    CanvasStyles
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("Button");

export class Submit {

	static get COMPONENT_NAME() { return "Submit"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/submit.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/submit.css"; }

    static get TYPE_PRIMARY() { return "btn-primary"; }
    static get TYPE_SECONDARY() { return "btn-secondary"; }
    static get TYPE_SUCCESS() { return "btn-success"; }
    static get TYPE_INFO() { return "btn-info"; }
    static get TYPE_WARNING() { return "btn-warning"; }
    static get TYPE_DANGER() { return "btn-danger"; }
    static get TYPE_LIGHT() { return "btn-light"; }
    static get TYPE_DARK() { return "btn-dark"; }

    /**
     * 
     * @param {string} label 
     * @param {string} buttonType 
     */
    constructor(label, buttonType = Button.TYPE_PRIMARY) {

        /** @type {string} */
        this.label = label;

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {string} */
        this.buttonType = buttonType;

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);
    }

    postConfig() {
        this.component = this.componentFactory.create("Submit");
        CanvasStyles.enableStyle(Submit.COMPONENT_NAME);
        this.component.get("submit").setAttributeValue("value", this.label);
        this.component.get("submit").setAttributeValue("class","btn " + this.buttonType);
    }

	getComponent(){
		return this.component;
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    withClickListener(clickListener) {
        this.eventRegistry.attach(this.component.get("submit"), "onclick", "//event:submitClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:submitClicked", clickListener, this.component.getComponentIndex());
        return this;
    }

    disable() {
        this.getComponent().get("submit").setAttributeValue("disabled","true");
    }

    enable() {
        this.getComponent().get("submit").removeAttribute("disabled");
    }
}