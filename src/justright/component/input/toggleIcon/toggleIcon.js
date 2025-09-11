import {
    ComponentFactory,
    CanvasStyles,
    Component,
    EventManager,
    CSS,
    HTML
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method } from "coreutil_v1";
import { CommonEvents } from "../../common/commonEvents";

const LOG = new Logger("ToggleIcon");

export class ToggleIcon {

	static COMPONENT_NAME = "ToggleIcon";
    static TEMPLATE_URL = "/assets/justrightjs-ui/toggleIcon.html";
    static STYLES_URL = "/assets/justrightjs-ui/toggleIcon.css";

    static TYPE_PRIMARY = "toggleIcon-primary";
    static TYPE_SECONDARY = "toggleIcon-secondary";
    static TYPE_SUCCESS = "toggleIcon-success";
    static TYPE_INFO = "toggleIcon-info";
    static TYPE_WARNING = "toggleIcon-warning";
    static TYPE_DANGER = "toggleIcon-danger";
    static TYPE_LIGHT = "toggleIcon-light";
    static TYPE_DARK = "toggleIcon-dark";

    static SIZE_MEDIUM = "toggleIcon-medium";
    static SIZE_LARGE = "toggleIcon-large";

    static SPINNER_VISIBLE = "toggleIcon-spinner-container-visible";
    static SPINNER_HIDDEN = "toggleIcon-spinner-container-hidden";

    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED

    /**
     * 
     * @param {String} label
     * @param {String} iconClass
     */
    constructor(label, toggleIconSize = ToggleIcon.SIZE_MEDIUM, iconClass) {

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.label = label;

        /** @type {String} */
        this.toggleIconSize = toggleIconSize;

        /** @type {String} */
        this.iconClass = iconClass;

        /** @type {EventManager<ToggleIcon>} */
        this.eventManager = new EventManager();
    }

    /** @type {EventManager<ToggleIcon>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create("ToggleIcon");
        CanvasStyles.enableStyle(ToggleIcon.COMPONENT_NAME);

        if (this.iconClass) {
            this.component.get("checkbox").addChild(HTML.i("", this.iconClass));
        }
        if (this.label) {
            this.component.get("checkbox").addChild(this.label);
        }

        CSS.from(this.component.get("checkbox"))
            .enable("toggleIcon")
            .enable(this.toggleIconSize);

        this.component.get("checkbox").listenTo("change", new Method(this, (event) => {
            if (event.target.element.checked) {
                this.eventManager.trigger(ToggleIcon.EVENT_ENABLED, event);
                return;
            }
            this.eventManager.trigger(ToggleIcon.EVENT_DISABLED, event);
        }));
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("checkbox").listenTo("click", method);
        return this;
    }

    enableLoading() {
        CSS.from(this.component.get("spinnerContainer"))
            .disable(ToggleIcon.SPINNER_HIDDEN)
            .enable(ToggleIcon.SPINNER_VISIBLE);
    }

    disableLoading() {
        CSS.from(this.component.get("spinnerContainer"))
            .disable(ToggleIcon.SPINNER_VISIBLE)
            .enable(ToggleIcon.SPINNER_HIDDEN);
    }

    disable() {
        this.component.get("checkbox").setAttributeValue("disabled","true");
    }

    enable() {
        this.component.get("checkbox").removeAttribute("disabled");
    }
}