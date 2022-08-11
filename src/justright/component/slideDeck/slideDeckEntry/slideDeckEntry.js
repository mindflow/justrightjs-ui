import { TimePromise } from "coreutil_v1";
import { CanvasStyles, Component, ComponentFactory } from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";

export class SlideDeckEntry {

    static get COMPONENT_NAME() { return "SlideDeckEntry"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/slideDeckEntry.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/slideDeckEntry.css"; }

    static get DEFAULT() { return "slide-deck-entry"; }

    static get SHIFT_VISIBLE() { return "slide-deck-entry-shift-visible" };
    static get SHIFT_BEHIND() { return "slide-deck-entry-shift-behind" };
    static get SHIFT_RIGHT() { return "slide-deck-entry-shift-right" };

    static get CONTENT_DEFAULT() { return "slide-deck-entry-content" };
    static get CONTENT_HIDDEN() { return "slide-deck-entry-content-removed" };

    constructor() {
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Number} */
        this.index = 0;

        this.shift = SlideDeckEntry.SHIFT_VISIBLE;
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
        this.setContentVisibility("");
        this.setShift(SlideDeckEntry.SHIFT_VISIBLE, SlideDeckEntry.HEIGHT_VISIBLE);
    }

    hide(nextIndex) {
        if (nextIndex > this.index) {
            this.setShift(SlideDeckEntry.SHIFT_BEHIND, SlideDeckEntry.HEIGHT_VISIBLE);
        } else {
            this.setShift(SlideDeckEntry.SHIFT_RIGHT, SlideDeckEntry.HEIGHT_VISIBLE);
        }
        this.adjustWhenHidden();
    }

    adjustWhenHidden() {
        TimePromise.asPromise(600, () => {
            if (this.shift === SlideDeckEntry.SHIFT_VISIBLE) {
                return;
            }
            this.setContentVisibility(SlideDeckEntry.CONTENT_HIDDEN);
        });
    }

    setContentVisibility(contentVisibility) {
        this.component.get("slideDeckEntryContent").setAttributeValue("class", contentVisibility + " " + SlideDeckEntry.CONTENT_DEFAULT);
    }

    setShift(shift, height) {
        this.shift = shift;
        this.height = height;
        this.component.get("slideDeckEntry").setAttributeValue("class", this.shift + " " + this.height + " " + SlideDeckEntry.DEFAULT);
    }

}