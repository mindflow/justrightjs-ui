import {
    ComponentFactory,
    CanvasStyles,
    Component,
    EventManager,
    CSS,
    Style
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method } from "coreutil_v1";

const LOG = new Logger("LinkPanel");

export class LinkPanel {

	static get COMPONENT_NAME() { return "LinkPanel"; }
    static get TEMPLATE_URL()   { return "/assets/justrightjs-ui/linkPanel.html"; }
    static get STYLES_URL()     { return "/assets/justrightjs-ui/linkPanel.css"; }

    static get EVENT_CLICKED()  { return "click"; }

    static get SIZE_SMALL()  { return "link-panel-small"; }
    static get SIZE_MEDIUM() { return "link-panel-medium"; }
    static get SIZE_LARGE()  { return "link-panel-large"; }

    static get ORIENTATION_FLAT()    { return "link-panel-flat"; }
    static get ORIENTATION_STACKED() { return "link-panel-stacked"; }

    static get THEME_DARK()    { return "link-panel-dark"; }
    static get THEME_LIGHT()   { return "link-panel-light"; }
    static get THEME_DANGER()  { return "link-panel-danger"; }
    static get THEME_INFO()    { return "link-panel-info"; }
    static get THEME_SUCCESS() { return "link-panel-success"; }

    /**
     * 
     * @param {String} label
     * @param {String} icon
     */
    constructor(label, icon, theme = LinkPanel.THEME_DARK, orientation = LinkPanel.ORIENTATION_FLAT, size = LinkPanel.SIZE_SMALL) {

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.label = label;

        /** @type {String} */
        this.icon = icon;

        /** @type {String} */
        this.orientation = orientation;

        /** @type {String} */
        this.size = size;

        /** @type {String} */
        this.theme = theme;

        /** @type {EventManager<LinkPanel>} */
        this.eventManager = new EventManager();
    }

    /** @type {EventManager<LinkPanel>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create(LinkPanel.COMPONENT_NAME);
        CanvasStyles.enableStyle(LinkPanel.COMPONENT_NAME);
        
        CSS.from(this.component.get("link"))
            .enable(this.size)
            .enable(this.orientation)
            .enable(this.theme);

        if (this.label) {
            this.component.get("label").setChild(this.label);
        } else {
            this.component.get("label").remove();
        }

        if (this.icon) {
            CSS.from(this.component.get("icon"))
                .clear()
                .enable(this.icon);
        } else {
            this.component.get("icon").remove();
        }


        this.component.get("link").listenTo("click", new Method(this, (event) => {
            this.eventManager.trigger(LinkPanel.EVENT_CLICKED, event);
        }));
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("link").listenTo("click", method);
        return this;
    }

}