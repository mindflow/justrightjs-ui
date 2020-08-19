import {
    ComponentFactory,
    EventRegistry,
    CanvasStyles
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("BannerMessage");

export class BannerMessage {

	static get COMPONENT_NAME() { return "BannerMessage"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/bannerMessage.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/bannerMessage.css"; }

    static get TYPE_ALERT() { return "banner-message-alert"; }
    static get TYPE_INFO() { return "banner-message-info"; }
    static get TYPE_SUCCESS() { return "banner-message-success"; }
    static get TYPE_WARNING() { return "banner-message-warning"; }

    static get SHAPE_LARGE_SQUARE() { return "banner-message-large-square"; }
    static get SHAPE_LARGE_ROUND() { return "banner-message-large-round"; }
    static get SHAPE_SMALL_SQUARE() { return "banner-message-small-square"; }
    static get SHAPE_SMALL_ROUND() { return "banner-message-small-round"; }

    /**
     * 
     * @param {string} message 
     * @param {string} bannerType 
     * @param {boolean} closeable 
     */
    constructor(message, bannerType = BannerMessage.TYPE_PRIMARY, closeable = false, bannerShape = BannerMessage.SHAPE_LARGE_SQUARE) {

        /** @type {string} */
        this.message = message;

        /** @type {boolean} */
        this.closeable = closeable;

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {string} */
        this.bannerShape = bannerShape;

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {ObjectFunction} */
        this.onHideListener = null;

        /** @type {ObjectFunction} */
        this.onShowListener = null;

    }

    postConfig() {
        this.component = this.componentFactory.create("BannerMessage");
        this.component.get("bannerMessageHeader").setChild("Alert");
        this.component.get("bannerMessageMessage").setChild(this.message);
        this.component.get("bannerMessage").setAttributeValue("class","banner-message fade " + this.bannerShape + " " + this.bannerType);
        this.eventRegistry.attach(this.component.get("bannerMessageCloseButton"), "onclick", "//event:bannerMessageCloseButtonClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:bannerMessageCloseButtonClicked", new ObjectFunction(this,this.hide), this.component.getComponentIndex());
    }

	getComponent(){
		return this.component;
    }
    
    setHeader(header) {
        this.header = header;
        this.component.get("bannerMessageHeader").setChild(this.header);
    }

    setMessage(message) {
        this.message = message;
        this.component.get("bannerMessageMessage").setChild(this.message);
    }

    /**
     * 
     * @param {ObjectFunction} clickedListener 
     */
    remove() {
        return this.getComponent().remove();
    }

    /**
     * 
     * @param {ObjectFunction} onHideListener 
     */
    onHide(onHideListener) {
        this.onHideListener = onHideListener;
    }

    /**
     * 
     * @param {ObjectFunction} onShowListener 
     */
    onShow(onShowListener) {
        this.onShowListener = onShowListener;
    }

    hide() {
        this.getComponent().get("bannerMessage").setAttributeValue("class" , "banner-message hide " + this.bannerShape + " " + this.bannerType);
        setTimeout(() => { 
            this.getComponent().get("bannerMessage").setStyle("display","none");
        },500);
        this.component.getComponentIndex()
        setTimeout(() => {
            CanvasStyles.disableStyle(BannerMessage.COMPONENT_NAME, this.component.getComponentIndex());
        },501);
        if(this.onHideListener) {
            this.onHideListener.call();
        }
    }

    show() {
        CanvasStyles.enableStyle(BannerMessage.COMPONENT_NAME, this.component.getComponentIndex());
        this.getComponent().get("bannerMessage").setStyle("display","block");
        setTimeout(() => { 
            this.getComponent().get("bannerMessage").setAttributeValue("class" , "banner-message show " + this.bannerShape + " " + this.bannerType) ;
        },100);
        if(this.onShowListener) {
            this.onShowListener.call();
        }
    }

}