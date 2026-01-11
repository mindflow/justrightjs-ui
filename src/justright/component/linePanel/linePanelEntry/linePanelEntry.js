import { Logger } from "coreutil_v1";
import { Component, ComponentBuilder, InlineComponentFactory } from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";

const LOG = new Logger("LinePanelEntry");

export class LinePanelEntry {

    constructor() {

		/** @type {InlineComponentFactory} */
		this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

    }

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=recordElement", "class=cntr cntr-columns cntr-gap-small")
			.build();
	}

    async postConfig() {
		this.component = this.componentFactory.create(LinePanelEntry);
    }


}