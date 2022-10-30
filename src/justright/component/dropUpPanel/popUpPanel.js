import {
    ComponentFactory,
    CanvasStyles,
    Component,
    Event,
    CanvasRoot,
    HTML,
    CSS,
    Style
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method } from "coreutil_v1";

const LOG = new Logger("PopUpPanel");

export class PopUpPanel {

	static get COMPONENT_NAME()    { return "PopUpPanel"; }
    static get TEMPLATE_URL()      { return "/assets/justrightjs-ui/popUpPanel.html"; }
    static get STYLES_URL()        { return "/assets/justrightjs-ui/popUpPanel.css"; }

    static get TYPE_PRIMARY()      { return "pop-up-panel-button-primary"; }
    static get TYPE_SECONDARY()    { return "pop-up-panel-button-secondary"; }
    static get TYPE_SUCCESS()      { return "pop-up-panel-button-success"; }
    static get TYPE_INFO()         { return "pop-up-panel-button-info"; }
    static get TYPE_WARNING()      { return "pop-up-panel-button-warning"; }
    static get TYPE_DANGER()       { return "pop-up-panel-button-danger"; }
    static get TYPE_LIGHT()        { return "pop-up-panel-button-light"; }
    static get TYPE_DARK()         { return "pop-up-panel-button-dark"; }

    static get SIZE_MEDIUM()       { return "pop-up-panel-button-medium"; }
    static get SIZE_LARGE()        { return "pop-up-panel-button-large"; }

    static get ORIENTATION_LEFT()     { return "pop-up-panel-left"; }
    static get ORIENTATION_RIGHT()    { return "pop-up-panel-right"; }

    static get CONTENT_VISIBLE()   { return "pop-up-panel-content-visible"; }
    static get CONTENT_HIDDEN()    { return "pop-up-panel-content-hidden"; }
    static get CONTENT_EXPAND()    { return "pop-up-panel-content-expand"; }
    static get CONTENT_COLLAPSE()  { return "pop-up-panel-content-collapse"; }
    static get CONTENT()           { return "pop-up-panel-content"; }
    static get BUTTON()            { return "pop-up-panel-button"; }

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = PopUpPanel.TYPE_DARK, size = PopUpPanel.SIZE_MEDIUM, orientation = PopUpPanel.ORIENTATION_LEFT) {

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.iconClass = iconClass;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.size = size;

        /** @type {string} */
        this.orientation = orientation;

    }

    postConfig() {
        this.component = this.componentFactory.create(PopUpPanel.COMPONENT_NAME);
        CanvasStyles.enableStyle(PopUpPanel.COMPONENT_NAME);
        this.component.get("button").setChild(HTML.i("", this.iconClass));

        CSS.from(this.component.get("button"))
            .enable(PopUpPanel.BUTTON)
            .enable(this.type);

        CSS.from(this.component.get("content"))
            .enable(PopUpPanel.CONTENT)
            .disable(PopUpPanel.CONTENT_VISIBLE)
            .enable(PopUpPanel.CONTENT_HIDDEN)
            .enable(this.size)
            .enable(this.orientation);

        this.component.get("button").listenTo("click", new Method(this, this.clicked));
        CanvasRoot.listenToFocusEscape(new Method(this, this.hide), this.component.get("popUpPanelRoot"));
    }

    /**
     * 
     * @param {Component} popUpPanelContent 
     */
    setPanelContent(popUpPanelContent) {
        this.component.get("content").setChild(popUpPanelContent.component);
    }
    /**
     * 
     * @param {Event} event 
     */
    clicked(event) {
        this.toggleContent();
    }

    toggleContent() {
        if (!Style.from(this.component.get("arrow")).is("display","block")) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        CSS.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_HIDDEN)
            .enable(PopUpPanel.CONTENT_VISIBLE);
        Style.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").element.focus();
    }

    hide() {
        CSS.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_VISIBLE)
            .enable(PopUpPanel.CONTENT_HIDDEN);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}