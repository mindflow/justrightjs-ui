import {
    Component,
    CanvasStyles,
    BaseElement,
    StylesheetBuilder,
    InlineComponentFactory,
    ComponentBuilder
} from "justright_core_v1";
import { Logger, TimePromise } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";
import { BackShadeListeners } from "./backShadeListeners.js";

const LOG = new Logger("BackShade");

export class BackShade {

    /**
     * @param {BackShadeListeners} backShadeListeners
     */
    constructor(backShadeListeners = new BackShadeListeners()){

        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {BaseElement} */
        this.container = null;

        /** @type {BackShadeListeners} */
        this.backShadeListeners = backShadeListeners;

        /** @type {boolean} */
        this.hidden = true;
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=backShade", "style=z-index:3;display:none;", "class=back-shade")
			.build();
	}

	/**
	 * 
     * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {String}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.add(".back-shade")
                .set("opacity", "0")
                .set("position", "fixed")
                .set("top", "0")
                .set("left", "0")
                .set("z-index", "1040")
                .set("width", "100vw")
                .set("height", "100vh")
                .set("background-color", "#000")

            .add(".back-shade.show")
                .set("opacity", "0.5")

            .add(".back-shade.fade")
                .set("transition", "opacity 0.3s ease-in-out")
                .set("-moz-transition", "opacity 0.3s ease-in-out")
                .set("-webkit-transition", "opacity 0.3s ease-in-out")

			.build();
	}


    postConfig() {
        this.component = this.componentFactory.create(BackShade);
    }

    hideAfter(milliSeconds) {
        if (this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = true;
        this.component.get("backShade").setAttributeValue("class", "back-shade fade");
        const hidePromise = TimePromise.asPromise(milliSeconds,
            () => {
                this.component.get("backShade").setStyle("display", "none");
            }
        );
        const disableStylePromise = TimePromise.asPromise(milliSeconds + 1,
            () => {
                CanvasStyles.disableStyle(BackShade.name, this.component.componentIndex);
            }
        );
        return Promise.all([hidePromise, disableStylePromise]);
    }

    show() {
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        CanvasStyles.enableStyle(BackShade.name, this.component.componentIndex);
        this.component.get("backShade").setStyle("display", "block");
        return TimePromise.asPromise(100,
            () => { 
                this.component.get("backShade").setAttributeValue("class", "back-shade fade show")
            }
        );
    }
    
}