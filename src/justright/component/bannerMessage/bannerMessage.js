import {
    CanvasStyles,
    Component,
    StylesheetBuilder,
    ComponentBuilder,
    InlineComponentFactory
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method, TimePromise } from "coreutil_v1";
import { CustomAppearance } from "../customAppearance.js";

const LOG = new Logger("BannerMessage");

export class BannerMessage {

    static TYPE_ALERT = "type-alert";
    static TYPE_INFO = "type-info";
    static TYPE_SUCCESS = "type-success";
    static TYPE_WARNING = "type-warning";

    /**
     * 
     * @param {string} message 
     * @param {string} bannerType 
     * @param {boolean} closeable 
     * @param {CustomAppearance} customAppearance
     */
    constructor(message, bannerType = BannerMessage.TYPE_INFO, closeable = false, customAppearance = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.message = message;

        /** @type {boolean} */
        this.closeable = closeable;

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {Method} */
        this.onHideListener = null;

        /** @type {Method} */
        this.onShowListener = null;

        /** @type {CustomAppearance} */
        this.customAppearance = customAppearance;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .add(".banner-message-size-large")
                .set("padding", "18pt")

            .add(".banner-message-size-default, .banner-message-size-medium")
                .set("padding", "12pt")

            .add(".banner-message-size-small")
                .set("padding-left", "10pt")
                .set("padding-right", "10px")
                .set("padding-bottom", "8px")
                .set("padding-top", "8px")

            .add(".banner-message-shape-default, .banner-message-shape-square")
                .set("border-radius", "0px")

            .add(".banner-message-shape-round")
                .set("border-radius", "3px")

            .add(".banner-message-spacing-default, .banner-message-spacing-none")
                .set("margin", "0pt")

            .add(".banner-message-spacing-above")
                .set("margin-top", "1rem")

            .add(".banner-message-spacing-below")
                .set("margin-bottom", "1rem")

            .add(".banner-message-spacing-above-below")
                .set("margin-top", "1rem")
                .set("margin-bottom", "1rem")

            .add(".banner-message")
                .set("color", "white")
                .set("width", "100%")
                .set("transition", "opacity 0.5s")

            .add(".banner-message.hide")
                .set("opacity", "0")

            .add(".banner-message.show")
                .set("opacity", "0.90")

            .add(".banner-message-type-alert")
                .set("background-color", "#f44336")

            .add(".banner-message-type-success")
                .set("background-color", "#4CAF50")

            .add(".banner-message-type-info")
                .set("background-color", "#2196F3")

            .add(".banner-message-type-warning")
                .set("background-color", "#ff9800")

            .add(".banner-message-close-button")
                .set("margin-left", "15pt")
                .set("color", "white")
                .set("font-weight", "bold")
                .set("float", "right")
                .set("font-size", "22pt")
                .set("line-height", "14pt")
                .set("cursor", "pointer")
                .set("transition", "0.3s")

            .add(".banner-message-close-button:hover")
                .set("color", "black")

            .add(".banner-message-message")
                .set("margin-left", "15px")

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=bannerMessage", "class=banner-message")
            .open()
                .add("span", "id=bannerMessageCloseButton", "class=banner-message-close-button")
                .open()
                    .addText("×")
                .close()
                .add("span", "id=bannerMessageHeader", "class=banner-message-header")
                .add("span", "id=bannerMessageMessage", "class=banner-message-message")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(BannerMessage);
        this.component.get("bannerMessageHeader").setChild("Alert");
        this.component.get("bannerMessageMessage").setChild(this.message);
        this.applyClasses("banner-message fade");
        this.component.get("bannerMessageCloseButton").listenTo("click", new Method(this,this.hide));
    }

    applyClasses(baseClasses) {
        let classes = baseClasses;
        classes = classes + " banner-message-" + this.bannerType;
        if (this.customAppearance) {
            if (this.customAppearance.shape) {
                classes = classes + " banner-message-" + this.customAppearance.shape;
            }
            if (this.customAppearance.size) {
                classes = classes + " banner-message-" + this.customAppearance.size;
            }
            if (this.customAppearance.spacing) {
                classes = classes + " banner-message-" + this.customAppearance.spacing;
            }
        }
        this.component.get("bannerMessage").setAttributeValue("class",classes);
    }
    
    applyHeader(header) {
        this.header = header;
        this.component.get("bannerMessageHeader").setChild(this.header);
    }

    applyMessage(message) {
        this.message = message;
        this.component.get("bannerMessageMessage").setChild(this.message);
    }

    /**
     * 
     * @param {Method} clickedListener 
     */
    remove() {
        return this.component.remove();
    }

    /**
     * 
     * @param {Method} onHideListener 
     */
    onHide(onHideListener) {
        this.onHideListener = onHideListener;
    }

    /**
     * 
     * @param {Method} onShowListener 
     */
    onShow(onShowListener) {
        this.onShowListener = onShowListener;
    }

    async hide() {
        this.applyClasses("banner-message hide");
        await TimePromise.asPromise(500, () => { 
            this.component.get("bannerMessage").setStyle("display","none");
            CanvasStyles.disableStyle(BannerMessage.name, this.component.componentIndex);
        });
        if(this.onHideListener) {
            this.onHideListener.call();
        }
    }

    async show(newHeader = null, newMessage = null) {
        if (newHeader) {
            this.applyHeader(newHeader);
        }
        if (newMessage) {
            this.applyMessage(newMessage);
        }
        CanvasStyles.enableStyle(BannerMessage.name, this.component.componentIndex);
        this.component.get("bannerMessage").setStyle("display","block");
        await TimePromise.asPromise(100,() => { 
            this.applyClasses("banner-message show");
        });
        if(this.onShowListener) {
            this.onShowListener.call();
        }
    }

}