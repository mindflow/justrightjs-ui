import {
    Component,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    BaseElement
} from "justright_core_v1";
import { Logger, ObjectFunction, TimePromise } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";
import { BackShadeListeners } from "./backShadeListeners.js";

const LOG = new Logger("BackShade");

export class BackShade {

	static get COMPONENT_NAME() { return "BackShade"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/backShade.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/backShade.css"; }

    /**
     * 
     */
    constructor(backShadeListeners = new BackShadeListeners()){

		/** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {BaseElement} */
        this.container = null;

        /**
         * @type {BackShadeListeners}
         */
        this.backShadeListeners = backShadeListeners;

        this.hidden = true;
	}

    postConfig() {
        this.component = this.componentFactory.create(BackShade.COMPONENT_NAME);
        this.eventRegistry.attach(this.component.get("backShade"), "onclick", "//event:backShadeClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:backShadeClicked", new ObjectFunction(this, this.backgroundClickOccured), this.component.getComponentIndex());
    }

    /**
     * @return {Component}
     */
	getComponent(){ return this.component; }

    backgroundClickOccured() {
        this.backShadeListeners.callBackgroundClicked();
    }

    hideAfter(milliSeconds) {
        if (this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = true;
        this.getComponent().get("backShade").setAttributeValue("class", "back-shade fade");
        const hidePromise = TimePromise.asPromise(milliSeconds,
            () => {
                this.getComponent().get("backShade").setStyle("display", "none");
            }
        );
        const disableStylePromise = TimePromise.asPromise(milliSeconds + 1,
            () => {
                CanvasStyles.disableStyle(BackShade.COMPONENT_NAME, this.component.getComponentIndex());
            }
        );
        return Promise.all([hidePromise, disableStylePromise]);
    }

    hide() { return this.disableAfter(500); }

    show() {
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        CanvasStyles.enableStyle(BackShade.COMPONENT_NAME, this.component.getComponentIndex());
        this.getComponent().get("backShade").setStyle("display", "block");
        return TimePromise.asPromise(100,
            () => { 
                this.getComponent().get("backShade").setAttributeValue("class", "back-shade fade show")
            }
        );
    }
    
}