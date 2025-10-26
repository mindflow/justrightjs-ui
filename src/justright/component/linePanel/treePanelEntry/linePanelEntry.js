import { Logger } from "coreutil_v1";
import { CanvasStyles, Component, TemplateComponentFactory } from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";

const LOG = new Logger("LinePanelEntry");

export class LinePanelEntry {

	static COMPONENT_NAME = "LinePanelEntry";
	static TEMPLATE_URL = "/assets/justrightjs-ui/linePanelEntry.html";
	static STYLES_URL = "/assets/justrightjs-ui/linePanelEntry.css";

    constructor() {

		/** @type {TemplateComponentFactory} */
		this.templateComponentFactory = InjectionPoint.instance(TemplateComponentFactory);

		/** @type {Component} */
		this.component = null;

    }

    async postConfig() {
		this.component = this.templateComponentFactory.create(LinePanelEntry.COMPONENT_NAME);
		CanvasStyles.enableStyle(LinePanelEntry.COMPONENT_NAME);
    }


}