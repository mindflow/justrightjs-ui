import { Logger, Method } from "coreutil_v1";
import { CanvasStyles, Component, ComponentFactory, EventManager, StateManager } from "justright_core_v1";
import { InjectionPoint, Provider } from "mindi_v1";
import { Panel } from "../../panel/panel.js";
import { RadioToggleIcon } from "../../input/radioToggleIcon/radioToggleIcon.js";


const LOG = new Logger("TreePanelEntry");

export class TreePanelEntry {

	static COMPONENT_NAME = "TreePanelEntry";
	static TEMPLATE_URL = "/assets/justrightjs-ui/treePanelEntry.html";
	static STYLES_URL = "/assets/justrightjs-ui/treePanelEntry.css";

	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";

    constructor(expandToggleProvider = null, record = null) {

		/** @type {ComponentFactory} */
		this.componentFactory = InjectionPoint.instance(ComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {Provider<Panel>} */
		this.panelProvider = InjectionPoint.provider(Panel);

		/** @type {EventManager} */
		this.eventManager = new EventManager();

        /** @type {StateManager<any[]>} */
        this.arrayState = InjectionPoint.instance(StateManager);

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvider = InjectionPoint.provider(TreePanelEntry);

		/** @type {Provider<RadioToggleIcon>} */
		this.expandToggleProvider = expandToggleProvider;

        /** @type {any} */
        this.record = record;
    }

    async postConfig() {
		this.component = this.componentFactory.create(TreePanelEntry.COMPONENT_NAME);
		CanvasStyles.enableStyle(TreePanelEntry.COMPONENT_NAME);

		const expandToggle = await this.expandToggleProvider.get()
		expandToggle.events.listenTo(RadioToggleIcon.EVENT_ENABLED, new Method(this, this.loadSubRecordsClicked));
		expandToggle.events.listenTo(RadioToggleIcon.EVENT_DISABLED, new Method(this, this.hideSubRecordsClicked));

		this.component.setChild("expandButton", expandToggle.component);

        this.arrayState.react(new Method(this, this.handleArrayState));
    }

	/**
	 * @returns { EventManager }
	 */
	get events() { return this.eventManager; }

    /**
     * @param {Array} array 
     */
    async handleArrayState(array) {
		const panel = await this.panelProvider.get([
			Panel.PARAMETER_STYLE_TYPE_COLUMN, 
			Panel.PARAMETER_STYLE_CONTENT_ALIGN_LEFT, 
			Panel.PARAMETER_STYLE_SIZE_MINIMAL]);

		array.forEach(async (record) => {
            await this.populateRecord(panel, record);
        });

		this.component.setChild("subrecordElements", panel.component);
    }

    /**
	 * @param {Component} panel
     * @param {any} record 
     */
    async populateRecord(panel, record) {
        const recordElement = await this.eventManager.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [null, record]);
        
		if (!recordElement) {
			return;
		}
		
		const treePanelEntry = await this.treePanelEntryProvider.get([this.expandToggleProvider, record]);
		treePanelEntry.component.setChild("recordElement", recordElement.component);

		treePanelEntry.events
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, new Method(this, this.entryRequested));

		treePanelEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, new Method(this, this.subRecordsUpdateRequested));

		panel.component.addChild("panel", treePanelEntry.component);
    }

	/**
	 * @param {Event} event 
	 * @param {any} record
	 */
	async entryRequested(event, record) {
		try {
			return await this.events.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [event, record]);
		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * @param {Event} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 */
	async subRecordsUpdateRequested(event, record, stateManager) {
		try {
			await this.events
				.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager]);
		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * @param {Event} event 
	 */
    loadSubRecordsClicked(event) {
        this.eventManager
			.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, this.record, this.arrayState]);
    }

	/**
	 * @param {Event} event 
	 */
    hideSubRecordsClicked(event) {
        this.component.get("subrecordElements").clear();
    }

}