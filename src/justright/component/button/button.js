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

const LOG = new Logger("Button");

export class Button {

	static get COMPONENT_NAME()  { return "Button"; }
    static get TEMPLATE_URL()    { return "/assets/justrightjs-ui/button.html"; }
    static get STYLES_URL()      { return "/assets/justrightjs-ui/button.css"; }

    static get TYPE_PRIMARY()    { return "button-primary"; }
    static get TYPE_SECONDARY()  { return "button-secondary"; }
    static get TYPE_SUCCESS()    { return "button-success"; }
    static get TYPE_INFO()       { return "button-info"; }
    static get TYPE_WARNING()    { return "button-warning"; }
    static get TYPE_DANGER()     { return "button-danger"; }
    static get TYPE_LIGHT()      { return "button-light"; }
    static get TYPE_DARK()       { return "button-dark"; }

    static get SIZE_MEDIUM()     { return "button-medium"; }
    static get SIZE_LARGE()      { return "button-large"; }

    static get SPINNER_VISIBLE() { return "button-spinner-container-visible"; }
    static get SPINNER_HIDDEN()  { return "button-spinner-container-hidden"; }

    static get EVENT_CLICKED()   { return "click"; }

    /**
     * 
     * @param {String} label
     * @param {String} buttonType
     * @param {String} iconClass
     */
    constructor(label, buttonType = Button.TYPE_PRIMARY, buttonSize = Button.SIZE_MEDIUM, iconClass) {

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.label = label;

        /** @type {String} */
        this.buttonType = buttonType;

        /** @type {String} */
        this.buttonSize = buttonSize;

        /** @type {String} */
        this.iconClass = iconClass;

        /** @type {EventManager<Button>} */
        this.eventManager = new EventManager();
    }

    /** @type {EventManager<Button>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create("Button");
        CanvasStyles.enableStyle(Button.COMPONENT_NAME);
        if (this.iconClass) {
            this.component.get("button").addChild(HTML.i("", this.iconClass));
        }
        if (this.label) {
            this.component.get("button").addChild(this.label);
        }

        CSS.from(this.component.get("button"))
            .enable("button")
            .enable(this.buttonSize)
            .enable(this.buttonType);

        this.component.get("button").listenTo("click", new Method(this, (event) => {
            this.eventManager.trigger(Button.EVENT_CLICKED, event);
        }));
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("button").listenTo("click", method);
        return this;
    }

    enableLoading() {
        CSS.from(this.component.get("spinnerContainer"))
            .disable(Button.SPINNER_HIDDEN)
            .enable(Button.SPINNER_VISIBLE);
    }

    disableLoading() {
        CSS.from(this.component.get("spinnerContainer"))
            .disable(Button.SPINNER_VISIBLE)
            .enable(Button.SPINNER_HIDDEN);
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled","true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}