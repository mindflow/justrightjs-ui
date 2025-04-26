import { Logger, Method } from "coreutil_v1";
import { InjectionPoint, Provider } from "mindi_v1";
import { Component, ComponentFactory, CanvasStyles, EventManager } from "justright_core_v1";
import { TreePanelEntry } from "./treePanelEntry/treePanelEntry.js";
import { Button } from "../button/button.js";

const LOG = new Logger("TreePanel");

export class TreePanel {

	static COMPONENT_NAME = "TreePanel";
	static TEMPLATE_URL = "/assets/justrightjs-ui/treePanel.html";
	static STYLES_URL = "/assets/justrightjs-ui/treePanel.css";

	static EVENT_REFRESH_CLICKED = "refreshClicked";
	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";


	constructor() {

		/** @type {ComponentFactory} */
		this.componentFactory = InjectionPoint.instance(ComponentFactory);
		
		/** @type {Component} */
		this.component = null;

		/** @type {EventManager} */
		this.eventManager = new EventManager();

		/** @type {Button} */
		this.refreshButton = InjectionPoint.instance(Button, ["Refresh", Button.TYPE_PRIMARY]);

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvier = InjectionPoint.provider(TreePanelEntry);

		/** @type {TreePanelEntry} */
		this.treePanelEntry = null;

	}

	async postConfig() {
		this.component = this.componentFactory.create(TreePanel.COMPONENT_NAME);
		CanvasStyles.enableStyle(TreePanel.COMPONENT_NAME);

		this.refreshButton.events.listenTo(Button.EVENT_CLICKED, new Method(this, this.refreshClicked));
		this.component.setChild("buttons", this.refreshButton.component);

		this.treePanelEntry = await this.treePanelEntryProvier.get();

		this.treePanelEntry.events
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, new Method(this, this.entryRequested));
		this.treePanelEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, new Method(this, this.subRecordsUpdateRequested));

	}

	/**
	 * @type { EventManager }
	 */
	get events() { return this.eventManager; }

	/**
	 * Called by the root TreePanelEntry when it's or one of it's subordinate elements need to be rendered
	 * 
	 * @param {Event} event 
	 * @param {any} record
	 */
	async entryRequested(event, record) {
		try {
			return await this.events.trigger(TreePanel.RECORD_ELEMENT_REQUESTED, [event, record]);
		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * Called by the root TreePanelEntry when it's or one of it's subordinate elements need the state of the subrecords to be updated,
	 * for example when the expand button is clicked
	 * 
	 * @param {Event} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 * @returns {Promise<TreePanelEntry[]>}
	 */
	async subRecordsUpdateRequested(event, record, stateManager) {
		try {
			return await this.events.trigger(TreePanel.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager]);
		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * Called by the root TreePanelEntry when the expand button is clicked
	 * 
	 * @param {Event} event 
	 */
	async refreshClicked(event) {
		await this.subRecordsUpdateRequested(event, null, this.treePanelEntry.arrayState);
		this.component.setChild("rootelement", this.treePanelEntry.component);
	}
}