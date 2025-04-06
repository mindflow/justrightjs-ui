import { Component, ComponentFactory, CanvasStyles, Style } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";

const LOG = new Logger("Background");

export class Background {

	static COMPONENT_NAME = "Background";
	static TEMPLATE_URL = "/assets/justrightjs-ui/background.html";
	static STYLES_URL = "/assets/justrightjs-ui/background.css";

    constructor(backgroundImagePath){
		/** @type {ComponentFactory} */
		this.componentFactory = InjectionPoint.instance(ComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {string} */
		this.backgroundImagePath = backgroundImagePath;
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(Background.COMPONENT_NAME);
		if (this.backgroundImagePath) {
            Style.from(this.component.get("background"))
                .set("background-image", "url(\"" + this.backgroundImagePath + "\")");
		}
		CanvasStyles.enableStyle(Background.COMPONENT_NAME);
	}

}