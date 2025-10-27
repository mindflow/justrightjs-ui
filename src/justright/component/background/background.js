import { Component,
	TemplateComponentFactory,
	CanvasStyles,
	Style,
	StylesheetBuilder,
	ComponentBuilder
} from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";

const LOG = new Logger("Background");

export class Background {

	static TEMPLATE_URL = "/assets/justrightjs-ui/background.html";
	static STYLES_URL = "/assets/justrightjs-ui/background.css";

    constructor(backgroundImagePath){

		/** @type {TemplateComponentFactory} */
		this.componentFactory = InjectionPoint.instance(TemplateComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {string} */
		this.backgroundImagePath = backgroundImagePath;
	}

	/**
	 * 
	 * @param {ComponentBuilder} uniqueIdRegistry
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root(uniqueIdRegistry, "div", "id:background", "class:background")
			.build();
	}

	/**
	 * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {String}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.add(".background")
				.set("background-color", "rgb(150, 197, 255)")
				.set("background-repeat", "no-repeat")
				.set("background-position-x", "center")
				.set("background-position-y", "center")
				.set("background-attachment", "scroll")
				.set("background-size", "cover")
				.set("font-family", "Source Sans Pro")
				.set("font-weight", "300")
				.set("height", "100%")
			.build();
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(Background);
		if (this.backgroundImagePath) {
            Style.from(this.component.get("background"))
                .set("background-image", "url(\"" + this.backgroundImagePath + "\")");
		}
		CanvasStyles.enableStyle(Background.name);
	}

}