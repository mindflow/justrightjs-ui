import { ComponentFactory, Component, CanvasStyles, CSS } from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger } from "coreutil_v1";

const LOG = new Logger("Panel");

export class Panel {

	static get COMPONENT_NAME() { return "Panel"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/panel.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/panel.css"; }

    static get PARAMETER_STYLE_TYPE_COLUMN_ROOT() { return " panel-type-column-root "; }
    static get PARAMETER_STYLE_TYPE_COLUMN() { return " panel-type-column "; }
    static get PARAMETER_STYLE_TYPE_ROW() { return " panel-type-row "; }

    static get PARAMETER_STYLE_CONTENT_ALIGN_LEFT() { return " panel-content-align-left "; }
    static get PARAMETER_STYLE_CONTENT_ALIGN_RIGHT() { return " panel-content-align-right "; }
    static get PARAMETER_STYLE_CONTENT_ALIGN_CENTER() { return " panel-content-align-center "; }
    static get PARAMETER_STYLE_CONTENT_ALIGN_JUSTIFY() { return " panel-content-align-justify "; }

    static get PARAMETER_STYLE_SIZE_AUTO() { return " panel-size-auto "; }
    static get PARAMETER_STYLE_SIZE_MINIMAL() { return " panel-size-minimal "; }
    static get PARAMETER_STYLE_SIZE_RESPONSIVE() { return " panel-size-responsive "; }

    static get OPTION_STYLE_CONTENT_PADDING_SMALL() { return " panel-content-padding-small "; }
    static get OPTION_STYLE_CONTENT_PADDING_LARGE() { return " panel-content-padding-large "; }

    static get OPTION_STYLE_BORDER_SHADOW() { return " panel-border-shadow "; }

    /**
     * 
     * @param {string} type 
     * @param {string} contentAlign 
     * @param {string} size 
     * @param {Array<string>} options 
     */
    constructor(type = Panel.PARAMETER_STYLE_TYPE_COLUMN_ROOT,
        contentAlign = Panel.PARAMETER_STYLE_CONTENT_ALIGN_CENTER,
        size = Panel.PARAMETER_STYLE_SIZE_AUTO,
        options = []) {

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.contentAlign = contentAlign;

        /** @type {string} */
        this.size = size;

        /** @type {Array<String>} */
        this.options = options;

    }

    postConfig() {
        this.component = this.componentFactory.create("Panel");

        CSS.from(this.component.get("panel"))
            .enable(this.type)
            .enable(this.contentAlign)
            .enable(this.size);
        CanvasStyles.enableStyle(Panel.COMPONENT_NAME);
    }

}