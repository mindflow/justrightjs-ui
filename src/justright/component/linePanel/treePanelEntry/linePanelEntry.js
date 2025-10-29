import { Logger } from "coreutil_v1";
import { CanvasStyles, Component, ComponentBuilder, InlineComponentFactory, Stylesheet, StylesheetBuilder } from "justright_core_v1";
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
	 * @param {StylesheetBuilder} stylesheetBuilder 
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.media("@media (min-width: 734px)")
			.open()
				.selector(".line-panel-entry")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()

				.selector(".line-panel-entry-record-element")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
					.style("margin-bottom", "5px")
				.close()

				.selector(".line-panel-entry-record-subrecordelements-container")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
				.close()

				.selector(".line-panel-entry-subrecord-elements")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()
			.close()

			.media("@media (max-width: 733px)")
			.open()
				.selector(".line-panel-entry")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()

				.selector(".line-panel-entry-record-element")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
					.style("margin-bottom", "5px")
				.close()

				.selector(".line-panel-entry-record-subrecordelements-container")
				.open()
					.style("position", "relative")
					.style("flex", "0 0 auto")
					.style("display", "flex")
					.style("flex-direction", "row")
				.close()

				.selector(".line-panel-entry-subrecord-elements")
				.open()
					.style("position", "relative")
					.style("flex", "1 0 auto")
					.style("display", "flex")
					.style("flex-direction", "column")
				.close()
			.close()

			.selector(".line-panel-entry-expand")
			.open()
				.style("position", "relative")
				.style("flex", "0 1 auto")
				.style("display", "flex")
				.style("padding-right", "5px")
			.close()

			.selector(".line-panel-entry-subrecord-elements-indent")
			.open()
				.style("position", "relative")
				.style("flex", "0 0 35px")
				.style("display", "flex")
				.style("flex-direction", "row")
			.close()

			.selector(".line-panel-entry-record-element")
			.open()
				.style("position", "relative")
				.style("flex", "1 0 auto")
				.style("display", "flex")
				.style("flex-direction", "row")
			.close()

			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=line-panel-entry")
			.open()
				.node("div", "class=line-panel-entry-record-element", "id=recordElementContainer")
				.open()
					.node("div", "class=line-panel-entry-record-element", "id=recordElement")
				.close()
			.close()

			.build();
	}

    async postConfig() {
		this.component = this.componentFactory.create(LinePanelEntry);
		CanvasStyles.enableStyle(LinePanelEntry.name);
    }


}