import { Component,
    CanvasStyles,
    StylesheetBuilder,
    Stylesheet,
    ComponentBuilder,
    InlineComponentFactory
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger } from "coreutil_v1";

const LOG = new Logger("FullHeightPanel");

export class FullHeightPanel {


    /**
     * 
     */
    constructor() {

        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {

        return stylesheetBuilder
            .selector(".full-height-panel")
            .open()
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("width", "100%")
            .close()
            
            .selector(".full-height-panel > *")
            .open()
                .style("flex-grow", "1")
                .style("flex-shrink", "0")
                .style("flex-basis", "auto")
            .close()

            .build();
    }

    setContent(component) {
        this.component.setChild("content", component);
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=content", "class=full-height-panel")
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(FullHeightPanel);
        CanvasStyles.enableStyle(FullHeightPanel.name);
    }

}