import { TimePromise } from "coreutil_v1";
import { CanvasStyles, ComponentFactory, CSS, EventManager, Style } from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { CustomAppearance } from "../../customAppearance.js";

export class BannerLabelMessage {

	static get COMPONENT_NAME() { return "BannerLabelMessage"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/bannerLabelMessage.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/bannerLabelMessage.css"; }

    static get EVENT_CLOSE_CLICKED() { return "closeClicked"; }

    static get TYPE_ALERT() { return "type-alert"; }
    static get TYPE_INFO() { return "type-info"; }
    static get TYPE_SUCCESS() { return "type-success"; }
    static get TYPE_WARNING() { return "type-warning"; }

    constructor(message, bannerType = BannerLabelMessage.TYPE_INFO, customAppearance = null) {

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

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

    async postConfig() {
        this.component = this.componentFactory.create(BannerLabelMessage.COMPONENT_NAME);
        CanvasStyles.enableStyle(BannerLabelMessage.COMPONENT_NAME);
        CSS.from(this.messageContentElement)
            .enable("banner-label-message")
            .enable("banner-label-message-" + this.bannerType);

        if (this.customAppearance && this.customAppearance.shape) {
            CSS.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.shape);
        }
        if (this.customAppearance && this.customAppearance.size) {
            CSS.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.size);
        }
        if (this.customAppearance && this.customAppearance.spacing) {
            CSS.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.spacing);
        }

        this.component.get("bannerLabelMessageCloseButton").listenTo("click", () => {
            this.eventManager.trigger(BannerLabelMessage.EVENT_CLOSE_CLICKED);
        });
    }

    hide() {
        CSS.from(this.messageContentElement)
            .disable("banner-label-message-visible")
            .enable("banner-label-message-hidden");

        this.isVisible = false;
        
        TimePromise.asPromise(500, () => {
            if (!this.isVisible) {
                Style.from(this.component.get("bannerLabelMessage"))
                    .set("display", "none");
            }
        });
    }

    show() {
        Style.from(this.component.get("bannerLabelMessage"))
            .set("display", "block");

        TimePromise.asPromise(50, () => {
            if (this.isVisible) {
                CSS.from(this.messageContentElement)
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