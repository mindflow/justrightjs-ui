import { Component, ComponentFactory, CanvasStyles } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";

const LOG = new Logger("Background");

export class Background {

	static get COMPONENT_NAME() { return "Background"; }
	static get TEMPLATE_URL() { return "/assets/justrightjs-ui/background.html"; }
	static get STYLES_URL() { return "/assets/justrightjs-ui/background.css"; }

    constructor(){
		/** @type {ComponentFactory} */
		this.componentFactory = InjectionPoint.instance(ComponentFactory);

		/** @type {Component} */
		this.component = null;
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(Background.COMPONENT_NAME);
		CanvasStyles.enableStyle(Background.COMPONENT_NAME);
	}

}