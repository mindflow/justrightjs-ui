import {
    ComponentFactory,
    EventRegistry,
    CanvasStyles,
    Component,
    InputElementDataBinding
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, ObjectFunction } from "coreutil_v1";

const LOG = new Logger("CheckBox");

export class CheckBox {

	static get COMPONENT_NAME() { return "CheckBox"; }
    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/checkBox.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/checkBox.css"; }
    /**
     * 
     * @param {string} name 
     * @param {object} model
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, model = null, clickListener = null, enterListener = null, changeListener = null, blurListener) {
        
        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

        /** @type {ObjectFunction} */
        this.clickListener = clickListener;

        /** @type {ObjectFunction} */
        this.enterListener = enterListener;

        /** @type {ObjectFunction} */
        this.changeListener = changeListener;

        /** @type {ObjectFunction} */
        this.blurListener = blurListener;
        
        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

    }

    postConfig() {
        this.component = this.componentFactory.create(CheckBox.COMPONENT_NAME);
        CanvasStyles.enableStyle(CheckBox.COMPONENT_NAME);
        this.component.get("checkBox").setAttributeValue("name",this.name);

        if(this.model) {
            InputElementDataBinding.link(this.model).to(this.component.get("checkBox"));
        }
    }

	getComponent(){
		return this.component;
    }

}