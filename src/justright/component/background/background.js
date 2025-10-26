import { Component, TemplateComponentFactory, CanvasStyles, Style, HtmlBuilder, StylesheetBuilder } from "justright_core_v1";
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

	set(key,val) {
		this.component.set(key,val);
	}

	/**
	 * 
	 * @returns {BaseElement}
	 */
	static getComponentElement() {
		return HtmlBuilder.create()
			.add("div", "id:background", "class:background").open()
				.add("div")
			.close()
			.build();
	}

	static getComponentStylesheet() {
		return StylesheetBuilder.create()
			.add(".background")
				.set("position", "fixed")
				.set("top", "0")
				.set("left", "0")
				.set("width", "100%")
				.set("height", "100%")
				.set("z-index", "-1")
				.set("background-size", "cover")
				.set("background-position", "center")
			.build();
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