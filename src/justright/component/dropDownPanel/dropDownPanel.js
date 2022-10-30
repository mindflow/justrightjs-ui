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

const LOG = new Logger("DropDownPanel");

export class DropDownPanel {

	static get COMPONENT_NAME()    { return "DropDownPanel"; }
    static get TEMPLATE_URL()      { return "/assets/justrightjs-ui/dropDownPanel.html"; }
    static get STYLES_URL()        { return "/assets/justrightjs-ui/dropDownPanel.css"; }

    static get TYPE_PRIMARY()      { return "drop-down-panel-button-primary"; }
    static get TYPE_SECONDARY()    { return "drop-down-panel-button-secondary"; }
    static get TYPE_SUCCESS()      { return "drop-down-panel-button-success"; }
    static get TYPE_INFO()         { return "drop-down-panel-button-info"; }
    static get TYPE_WARNING()      { return "drop-down-panel-button-warning"; }
    static get TYPE_DANGER()       { return "drop-down-panel-button-danger"; }
    static get TYPE_LIGHT()        { return "drop-down-panel-button-light"; }
    static get TYPE_DARK()         { return "drop-down-panel-button-dark"; }

    static get SIZE_MEDIUM()       { return "drop-down-panel-button-medium"; }
    static get SIZE_LARGE()        { return "drop-down-panel-button-large"; }

    static get ORIENTATION_LEFT()     { return "drop-down-panel-left"; }
    static get ORIENTATION_RIGHT()    { return "drop-down-panel-right"; }

    static get CONTENT_VISIBLE()   { return "drop-down-panel-content-visible"; }
    static get CONTENT_HIDDEN()    { return "drop-down-panel-content-hidden"; }
    static get CONTENT_EXPAND()    { return "drop-down-panel-content-expand"; }
    static get CONTENT_COLLAPSE()  { return "drop-down-panel-content-collapse"; }
    static get CONTENT()           { return "drop-down-panel-content"; }
    static get BUTTON()            { return "drop-down-panel-button"; }

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = DropDownPanel.TYPE_DARK, size = DropDownPanel.SIZE_MEDIUM, orientation = DropDownPanel.ORIENTATION_LEFT) {

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
        this.component = this.componentFactory.create(DropDownPanel.COMPONENT_NAME);
        CanvasStyles.enableStyle(DropDownPanel.COMPONENT_NAME);
        this.component.get("button").setChild(HTML.i("", this.iconClass));

        CSS.from(this.component.get("button"))
            .enable(DropDownPanel.BUTTON)
            .enable(this.type);

        CSS.from(this.component.get("content"))
            .enable(DropDownPanel.CONTENT)
            .disable(DropDownPanel.CONTENT_VISIBLE)
            .enable(DropDownPanel.CONTENT_HIDDEN)
            .enable(this.size)
            .enable(this.orientation);

        this.component.get("button").listenTo("click", new Method(this, this.clicked));
        CanvasRoot.listenToFocusEscape(new Method(this, this.hide), this.component.get("dropDownPanelRoot"));
    }

    /**
     * 
     * @param {Component} dropDownPanelContent 
     */
    setPanelContent(dropDownPanelContent) {
        this.component.get("content").setChild(dropDownPanelContent.component);
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
            .disable(DropDownPanel.CONTENT_HIDDEN)
            .enable(DropDownPanel.CONTENT_VISIBLE);
        Style.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").element.focus();
    }

    hide() {
        CSS.from(this.component.get("content"))
            .disable(DropDownPanel.CONTENT_VISIBLE)
            .enable(DropDownPanel.CONTENT_HIDDEN);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}