import {
    Component,
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    StylesRegistry,
    BaseElement
} from "justright_core_v1";
import { TimePromise, Logger, ObjectFunction } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";
import { BackShade } from "../backShade/backShade.js";


const LOG = new Logger("DialogBox");

export class DialogBox {

	static get COMPONENT_NAME() { return "DialogBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/dialogBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/dialogBox.css"; }
    
    /**
     * 
     */
    constructor(){

		/** @type {EventRegistry} */
		this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

		/** @type {Component} */
        this.component = null;
        
        /** @type {BackShade} */
        this.backShade = InjectionPoint.instance(BackShade);

        /** @type {StylesRegistry} */
        this.stylesRegistry = InjectionPoint.instance(StylesRegistry);

        /** @type {BaseElement} */
        this.container = null;
    }
    
    postConfig() {
        LOG.info("Post config")
        this.component = this.componentFactory.create("DialogBox");
        this.eventRegistry.attach(this.component.get("closeButton"), "onclick", "//event:closeClicked", this.component.getComponentIndex());
        this.eventRegistry.listen("//event:closeClicked", new ObjectFunction(this, this.hide),this.component.getComponentIndex());
        this.backShade = this.backShade.withClickListener(new ObjectFunction(this, this.hide));
        this.component.set("backShadeContainer", this.backShade.getComponent());
    }


    /**
     * @return {Component}
     */
	getComponent(){ return this.component; }

    /**
     * 
     * @param {string} text 
     */
    setTitle(text){ this.getComponent().setChild("title", text); }

    /**
     * 
     * @param {Component} component 
     */
    setFooter(component){
        this.getComponent().get("dialogBoxFooter").setStyle("display", "block");
        this.getComponent().setChild("dialogBoxFooter", component);
    }

    /**
     * 
     * @param {Component} component 
     */
    setContent(component){ this.getComponent().setChild("dialogBoxContent",component); }

	set(key,val) { this.getComponent().set(key,val); }
    
    hide() {
        this.getDialogBoxWindow().setAttributeValue("class" , "dialogbox fade");
        const hidePromise = TimePromise.asPromise(200,
            () => { 
                this.getDialogBoxWindow().setStyle("display","none");
                this.backShade.hideAfter(500);
            }
        );
        const disableStylePromise = TimePromise.asPromise(201,
            () => {
                CanvasStyles.disableStyle(DialogBox.COMPONENT_NAME, this.component.getComponentIndex());
            }
        );
        return Promise.all([hidePromise, disableStylePromise]);
    }

    show() {
        CanvasStyles.enableStyle(DialogBox.COMPONENT_NAME, this.component.getComponentIndex());
        this.backShade.show();
        this.getDialogBoxWindow().setStyle("display","block");
        return TimePromise.asPromise(100, 
            () => {
                this.getDialogBoxWindow().setAttributeValue("class", "dialogbox fade show");
            }
        );
    }

    removeSelf() {
        CanvasStyles.disableStyle(DialogBox.COMPONENT_NAME, this.component.getComponentIndex());
        this.getComponent().removeSelf();
    }

    getDialogBoxWindow() {
        return this.getComponent().get("dialogBoxWindow");
    }
}