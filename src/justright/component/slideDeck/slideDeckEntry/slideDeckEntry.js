import { TimePromise } from "coreutil_v1";
import { CanvasStyles, Component, ComponentFactory } from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";

export class SlideDeckEntry {

    static get COMPONENT_NAME() { return "SlideDeckEntry"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/slideDeckEntry.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/slideDeckEntry.css"; }

    constructor() {
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Number} */
        this.index = 0;

        this.isVisible = false;
    }

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeckEntry.COMPONENT_NAME);
        CanvasStyles.enableStyle(SlideDeckEntry.COMPONENT_NAME);
    }

    setIndex(index) {
        this.index = index;
    }

    setContent(component) {
        this.component.setChild("slideDeckEntryContent", component);
    }

    show() {
        this.component.get("slideDeckEntryContent").setAttributeValue("style", "display:block");
        this.component.get("slideDeckEntry").setAttributeValue("class", "slide-deck-entry-visible");
        this.isVisible = true;
        
    }

    hide(nextIndex) {
        if (nextIndex > this.index) {
            this.component.get("slideDeckEntry").setAttributeValue("class", "slide-deck-entry-hidden slide-deck-entry-move-left");
        } else {
            this.component.get("slideDeckEntry").setAttributeValue("class", "slide-deck-entry-hidden slide-deck-entry-move-right");
        }
        this.isVisible = false;
        this.toggleDisplay();
    }

    toggleDisplay() {
        TimePromise.asPromise(1000, () => {
            if (!this.isVisible) {
                this.component.get("slideDeckEntryContent").setAttributeValue("style", "display:none");
            }
        });
    }

}