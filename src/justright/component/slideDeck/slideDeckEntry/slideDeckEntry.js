import { TimePromise } from "coreutil_v1";
import { BaseElement,
    CanvasStyles,
    Component,
    StyleClassAccessor,
    StylesheetBuilder,
    ComponentBuilder,
    Stylesheet,
    InlineComponentFactory
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";

export class SlideDeckEntry {

    //static TEMPLATE_URL = "/assets/justrightjs-ui/slideDeckEntry.html";
    //static STYLES_URL = "/assets/justrightjs-ui/slideDeckEntry.css";

    static DEFAULT_CLASS = "slide-deck-entry";

    static ENTRY_POSITION_FRONT = "position-front";
    static ENTRY_POSITION_BEHIND = "position-behind";
    static ENTRY_POSITION_RIGHT = "position-right";

    static CONTENT_EXISTANCE_PRESENT = "existance-present";
    static CONTENT_EXISTANCE_REMOVED = "existance-removed";

    constructor() {
        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Number} */
        this.index = 0;

        /** @type {String} */
        this.position = SlideDeckEntry.ENTRY_POSITION_FRONT;
    }

    /**
     * @returns {Stylesheet}
     * @param {StylesheetBuilder} stylesheetBuilder 
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .add(".slide-deck-entry")
                .set("box-shadow", "0px 0px 10px 10px #cccccc")
                .set("position", "relative")
                .set("background-color", "#ffffff")
                .set("grid-column", "1")
                .set("grid-row", "1")
                .set("width", "100%")
                .set("height", "100%")
                .set("min-height", "0")
            .add(".slide-deck-entry.position-front")
                .set("transform", "translate(0%, 0%)")
                .set("transition", "transform .6s")
            .add(".slide-deck-entry.position-behind")
                .set("transform", "translate(0%, 0%)")
                .set("transition", "transform .6s")
            .add(".slide-deck-entry.position-right")
                .set("transform", "translate(+105%, 0%)")
                .set("transition", "transform .6s")
            .add(".slide-deck-entry-content.existance-removed")
                .set("display", "none")
            .add(".slide-deck-entry-content.existance-present")
                .set("position", "relative")
                .set("height", "100%")
            .build()
    }

    /**
     * @returns {Component}
     * @param {ComponentBuilder} componentBuilder 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=slideDeckEntry", "class=slide-deck-entry")
            .open()
                .add("div", "id=slideDeckEntryContent", "class=slide-deck-entry-content")
            .close()
            .build();
    }

    /**
     * @returns {BaseElement}
     */
    get contentElement() {
        return this.component.get("slideDeckEntryContent");
    }

    /**
     * @returns {BaseElement}
     */
    get entryElement() {
        return this.component.get("slideDeckEntry");
    }

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeckEntry);
        CanvasStyles.enableStyle(SlideDeckEntry.name);
    }

    setIndex(index) {
        this.index = index;
    }

    setContent(component) {
        this.contentElement.setChild(component);
    }

    show() {
        this.setContentVisibility(SlideDeckEntry.CONTENT_EXISTANCE_PRESENT);
        this.setShift(SlideDeckEntry.ENTRY_POSITION_FRONT);
    }

    hide(nextIndex) {
        if (nextIndex > this.index) {
            this.setShift(SlideDeckEntry.ENTRY_POSITION_BEHIND);
        } else {
            this.setShift(SlideDeckEntry.ENTRY_POSITION_RIGHT);
        }
        this.adjustWhenHidden();
    }

    adjustWhenHidden() {
        TimePromise.asPromise(600, () => {
            if (this.position === SlideDeckEntry.ENTRY_POSITION_FRONT) {
                return;
            }
            this.setContentVisibility(SlideDeckEntry.CONTENT_EXISTANCE_REMOVED);
        });
    }

    setContentVisibility(contentVisibility) {
        StyleClassAccessor.from(this.contentElement).replace("existance-", contentVisibility);
    }

    setShift(position) {
        this.position = position;
        StyleClassAccessor.from(this.entryElement).replace("position-", position);
    }

}