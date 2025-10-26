import { Logger, Method } from "coreutil_v1";
import { CanvasStyles, Component, TemplateComponentFactory, EventManager, SimpleElement, StateManager } from "justright_core_v1";
import { InjectionPoint, Provider } from "mindi_v1";
import { Panel } from "../../panel/panel.js";
import { RadioToggleIcon } from "../../input/radioToggleIcon/radioToggleIcon.js";
import { ToggleIcon } from "../../input/toggleIcon/toggleIcon.js";
import { ContainerEvent } from "containerbridge_v1";


const LOG = new Logger("TreePanelEntry");

export class TreePanelEntry {

	static COMPONENT_NAME = "TreePanelEntry";
	static TEMPLATE_URL = "/assets/justrightjs-ui/treePanelEntry.html";
	static STYLES_URL = "/assets/justrightjs-ui/treePanelEntry.css";

	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";
	static EVENT_EXPAND_TOGGLE_OVERRIDE = "expandToggleOverride";

    constructor(record = null) {

		/** @type {TemplateComponentFactory} */
		this.templateComponentFactory = InjectionPoint.instance(TemplateComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {Provider<Panel>} */
		this.panelProvider = InjectionPoint.provider(Panel);

		/** @type {EventManager} */
		this.eventManager = new EventManager();

        /** @type {StateManager<any[]>} */
        this.arrayState = new StateManager();

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvider = InjectionPoint.provider(TreePanelEntry);

		/** @type {ToggleIcon} */
		this.expandToggle = InjectionPoint.instance(ToggleIcon);

        /** @type {any} */
        this.record = record;
    }

    async postConfig() {
		this.component = this.templateComponentFactory.create(TreePanelEntry.COMPONENT_NAME);
		CanvasStyles.enableStyle(TreePanelEntry.COMPONENT_NAME);

		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_ENABLED, new Method(this, this.loadSubRecordsClicked));
		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_DISABLED, new Method(this, this.hideSubRecordsClicked));

		this.component.setChild("expandButton", this.expandToggle.component);

        this.arrayState.react(new Method(this, this.handleStateChange));

    }

	/**
	 * @returns { EventManager }
	 */
	get events() { return this.eventManager; }

    /**
     * @param {Object} object 
     */
    async handleStateChange(object) {
		if (object instanceof Array) {
			const panel = await this.panelProvider.get([
				Panel.PARAMETER_STYLE_TYPE_COLUMN, 
				Panel.PARAMETER_STYLE_CONTENT_ALIGN_LEFT, 
				Panel.PARAMETER_STYLE_SIZE_MINIMAL]);

			object.forEach(async (record) => {
				await this.populateRecord(panel, record);
			});

			this.component.setChild("subrecordElements", panel.component);
		}
    }

    /**
	 * @param {Component} panel
     * @param {any} record 
     */
    async populateRecord(panel, record) {
		const treePanelSubEntry = await this.treePanelEntryProvider.get([record]);

		const recordElement = await this.eventManager.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [null, record, treePanelSubEntry, this]);
        
		if (!recordElement) {
			return;
		}

		treePanelSubEntry.component.setChild("recordElement", recordElement.component);

		await this.eventManager
			.trigger(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, [null, treePanelSubEntry, record]);

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, new Method(this, this.entryRequested));

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, new Method(this, this.expandToggleOverride));

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, new Method(this, this.subRecordsUpdateRequested));

		panel.component.addChild("panel", treePanelSubEntry.component);
    }

	/**
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async entryRequested(event, record, treePanelEntry, parentTreePanelEntry) {
		try {
			return await this.events.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [event, record, treePanelEntry, parentTreePanelEntry]);
		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async expandToggleOverride(event, treePanelEntry, record) {
		try {
			return await this.events.trigger(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, [event, treePanelEntry, record]);
		} catch (error) {
			LOG.error(error);
		}
	}

	async reloadSubRecords() {
		const elementButtonsContainer = await this.component.get("buttons");
		await this.subRecordsUpdateRequested(null, this.record, this.arrayState, elementButtonsContainer);
	}

	/**
	 * @param {ContainerEvent} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 * @param {SimpleElement} elementButtonsContainer
	 */
	async subRecordsUpdateRequested(event, record, stateManager, elementButtonsContainer) {
		try {
			await this.events
				.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager, elementButtonsContainer]);
		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * @param {ContainerEvent} event 
	 */
    async loadSubRecordsClicked(event) {
		const elementButtonsContainer = await this.component.get("buttons");
        this.eventManager
			.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, this.record, this.arrayState, elementButtonsContainer]);
    }

	/**
	 * @param {ContainerEvent} event 
	 */
    hideSubRecordsClicked(event) {
        this.component.get("subrecordElements").clear();
		this.component.get("buttons").clear();
    }

}