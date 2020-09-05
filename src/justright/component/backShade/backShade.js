import {
    Component,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    BaseElement
} from "justright_core_v1";
import { Logger, ObjectFunction, TimePromise } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";

const LOG = new Logger("BackShade");

export class BackShade {

	static get COMPONENT_NAME() { return "BackShade"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/backShade.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/backShade.css"; }

    /**
     * 
     */
    constructor(){

		/** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {BaseElement} */
        this.container = null;
	}

    postConfig() {
        LOG.info("Post config");
        this.component = this.componentFactory.create("BackShade");
    }

    /**
     * @return {Component}
     */
	getComponent(){ return this.component; }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    withClickListener(clickedListener) {
        this.eventRegistry.attach(this.component.get("backShade"), "onclick", "//event:backShadeClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:backShadeClicked", clickedListener, this.component.getComponentIndex());
        return this;
    }

    hideAfter(milliSeconds) {
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

    hide() { this.disableAfter(500); }

    show() {
        CanvasStyles.enableStyle(BackShade.COMPONENT_NAME, this.component.getComponentIndex());
        this.getComponent().get("backShade").setStyle("display", "block");
        return TimePromise.asPromise(100,
            () => { 
                this.getComponent().get("backShade").setAttributeValue("class", "back-shade fade show")
            }
        );
    }

    removeSelf() { this.getComponent().remove(); }
    
}