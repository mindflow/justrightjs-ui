import { Method, TimePromise } from "coreutil_v1";
import {
    CanvasStyles,
    StyleClassAccessor,
    EventManager,
    StyleAccessor,
    Component,
    InlineComponentFactory,
    ComponentBuilder,
    StylesheetBuilder
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { CustomAppearance } from "../../customAppearance.js";

export class BannerLabelMessage {

    static get EVENT_CLOSE_CLICKED() { return "closeClicked"; }

    static get TYPE_ALERT() { return "type-alert"; }
    static get TYPE_INFO() { return "type-info"; }
    static get TYPE_SUCCESS() { return "type-success"; }
    static get TYPE_WARNING() { return "type-warning"; }

    constructor(message, bannerType = BannerLabelMessage.TYPE_INFO, customAppearance = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.header = null;

        /** @type {String} */
        this.message = message;

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {CustomAppearance} */
        this.customAppearance = customAppearance;

        /** @type {EventManager} */
        this.eventManager = new EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns 
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .add(".banner-label-message")
                .set("color", "white")
                .set("width", "100%")

            .add(".banner-label-message-visible")
                .set("opacity", "0.8")
                .set("transition", "opacity .5s .1s")

            .add(".banner-label-message-hidden")
                .set("opacity", "0")
                .set("transition", "opacity .5s 0s")

            .add(".banner-label-message-close-button")
                .set("margin-left", "15pt")
                .set("color", "white")
                .set("font-weight", "bold")
                .set("float", "right")
                .set("font-size", "22pt")
                .set("line-height", "14pt")
                .set("cursor", "pointer")
                .set("transition", "0.3s")

            .add(".banner-label-message-header")
                .set("color", "white")

            .add(".banner-label-message-text")
                .set("margin-left", "15px")

            .add(".banner-label-message-type-alert")
                .set("background-color", "#f44336")

            .add(".banner-label-message-type-success")
                .set("background-color", "#4CAF50")

            .add(".banner-label-message-type-info")
                .set("background-color", "#2196F3")

            .add(".banner-label-message-type-warning")
                .set("background-color", "#ff9800")

            .add(".banner-label-message-size-large")
                .set("padding", "18pt")

            .add(".banner-label-message-size-default")
                .set("padding", "12pt")

            .add(".banner-label-message-size-small")
                .set("padding-left", "10pt")
                .set("padding-right", "10px")
                .set("padding-bottom", "8px")
                .set("padding-top", "8px")

            .add(".banner-label-message-shape-square")
                .set("border-radius", "0px")

            .add(".banner-label-message-shape-round")
                .set("border-radius", "3px")

            .add(".banner-label-message-spacing-none")
                .set("margin", "0pt")

            .add(".banner-label-message-spacing-above")
                .set("margin-top", "1rem")

            .add(".banner-label-message-spacing-below")
                .set("margin-bottom", "1rem")

            .add(".banner-label-message-spacing-above-below")
                .set("margin-top", "1rem")
                .set("margin-bottom", "1rem")
                
            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=bannerLabelMessage", "style=display:none;")
            .open()
                .add("div", "id=bannerLabelMessageContent", "class=banner-label-message banner-label-message-hidden")
                .open()
                    .add("span", "id=bannerLabelMessageCloseButton", "class=banner-label-message-close-button")
                    .open()
                        .addText("×")
                    .close()
                    .add("span", "id=bannerLabelMessageHeader", "class=banner-label-message-header")
                    .add("span", "id=bannerLabelMessageText", "class=banner-label-message-text")
                .close()
            .close()
            .build();
    }

    async postConfig() {

        /** @type {Component} */
        this.component = this.componentFactory.create(BannerLabelMessage);
        CanvasStyles.enableStyle(BannerLabelMessage.name);
        StyleClassAccessor.from(this.messageContentElement)
            .enable("banner-label-message")
            .enable("banner-label-message-" + this.bannerType);

        if (this.customAppearance && this.customAppearance.shape) {
            StyleClassAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.shape);
        }
        if (this.customAppearance && this.customAppearance.size) {
            StyleClassAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.size);
        }
        if (this.customAppearance && this.customAppearance.spacing) {
            StyleClassAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.spacing);
        }

        this.component.get("bannerLabelMessageCloseButton").listenTo("click", new Method(this, this.closeClicked));
    }

    closeClicked(event) {
        this.eventManager.trigger(BannerLabelMessage.EVENT_CLOSE_CLICKED);
    }

    hide() {
        StyleClassAccessor.from(this.messageContentElement)
            .disable("banner-label-message-visible")
            .enable("banner-label-message-hidden");

        this.isVisible = false;
        
        TimePromise.asPromise(500, () => {
            if (!this.isVisible) {
                StyleAccessor.from(this.component.get("bannerLabelMessage"))
                    .set("display", "none");
            }
        });
    }

    show() {
        StyleAccessor.from(this.component.get("bannerLabelMessage"))
            .set("display", "block");

        TimePromise.asPromise(50, () => {
            if (this.isVisible) {
                StyleClassAccessor.from(this.messageContentElement)
                    .disable("banner-label-message-hidden")
                    .enable("banner-label-message-visible")
            }
        });
        
        this.isVisible = true;
    }

    get messageContentElement() {
        return this.component.get("bannerLabelMessageContent");
    }

    setMessage(header, message) {
        if (header) {
            this.applyHeader(header);
        }
        if (message) {
            this.applyMessage(message);
        }
    }

    applyHeader(header) {
        this.header = header;
        this.component.get("bannerLabelMessageHeader").setChild(this.header);
    }

    applyMessage(message) {
        this.message = message;
        this.component.get("bannerLabelMessageText").setChild(this.message);
    }

}