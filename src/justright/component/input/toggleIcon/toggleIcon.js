import {
    CanvasStyles,
    Component,
    EventManager,
    StylesheetBuilder,
    Stylesheet,
    ComponentBuilder,
    InlineComponentFactory
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method } from "coreutil_v1";
import { CommonEvents } from "../../common/commonEvents";
import { ContainerEvent } from "containerbridge_v1";

const LOG = new Logger("ToggleIcon");

export class ToggleIcon {

    static TYPE_PRIMARY = "toggleIcon-primary";
    static TYPE_SECONDARY = "toggleIcon-secondary";
    static TYPE_SUCCESS = "toggleIcon-success";
    static TYPE_INFO = "toggleIcon-info";
    static TYPE_WARNING = "toggleIcon-warning";
    static TYPE_DANGER = "toggleIcon-danger";
    static TYPE_LIGHT = "toggleIcon-light";
    static TYPE_DARK = "toggleIcon-dark";

    static SIZE_MEDIUM = "toggleIcon-medium";
    static SIZE_LARGE = "toggleIcon-large";

    static SPINNER_VISIBLE = "toggleIcon-spinner-container-visible";
    static SPINNER_HIDDEN = "toggleIcon-spinner-container-hidden";

    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED

    /**
     * 
     * @param {String} name
     * @param {Object} model
     * @param {String} icon
     * @param {String} label
     */
    constructor(name = "?", model = null, label = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.enabled = false;

        /** @type {string} */
        this.name = name;

        /** @type {String} */
        this.label = label;

        /** @type {string} */
        this.enabledIcon = "fas fa-circle-check";

        /** @type {string} */
        this.disabledIcon = "fas fa-circle";

        /** @type {string} */
        this.disabledColor = "lightgray";

        /** @type {string} */
        this.enabledColor = "#2196F3";

        /** @type {string} */
        this.hoverColor = "gray";

        /** @type {EventManager} */
        this.eventManager = new EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".toggle-icon-container")
            .open()
                .style("display", "inline-block")
                .style("margin", "1pt")
                .style("border-radius", "50%")
                .style("background-color", "transparent")
                .style("transition", "background-color 0.3s")
                .style("text-align", "center")
                .style("line-height", "20pt")
            .close()

            .selector(".toggle-icon-radio")
            .open()
                .style("opacity", "0")
                .style("position", "absolute")
                .style("cursor", "pointer")
            .close()

            .selector(".toggle-icon-label")
            .open()
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("transition", "all 0.3s ease")
                .style("font-size", "20pt")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @return {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("span", "id=container", "class=toggle-icon-container")
            .open()
                .node("input", "id=checkbox", "class=toggle-icon-radio", "type=checkbox")
                .node("label", "id=label", "class=toggle-icon-label")
                .open()
                    .node("i", "id=icon", "title=")
                .close()
            .close()
            .build();
    }

    /** @type {EventManager<ToggleIcon>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create(ToggleIcon);
        CanvasStyles.enableStyle(ToggleIcon.name);

        const checkbox = this.component.get("checkbox");
        checkbox.setAttributeValue("name", this.name);
        checkbox.listenTo("change", new Method(this, this.clicked));

        const container = this.component.get("container");
        container.listenTo("mouseover", new Method(this, this.enableHover));
        container.listenTo("mouseout", new Method(this, this.disableHover));

        const id = checkbox.getAttributeValue("id");

        const label = this.component.get("label");
        label.setAttributeValue("for", id);

        this.applyIcon(this.disabledIcon);
        this.applyColor(this.disabledColor);

    }

    loadIcons(disabledIcon, enabledIcon) {
        this.disabledIcon = disabledIcon;
        this.enabledIcon = enabledIcon;
        this.enabled ? this.applyIcon(this.enabledIcon) : this.applyIcon(this.disabledIcon);
    }

    loadColors(disabled, enabled, hover) {
        this.disabledColor = disabled;
        this.enabledColor = enabled;
        this.hoverColor = hover;
        this.enabled ? this.applyColor(this.enabledColor) : this.applyColor(this.disabledColor);
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("checkbox").listenTo("click", method);
        return this;
    }

    disable() {
        this.component.get("checkbox").setAttributeValue("disabled","true");
    }

    enable() {
        this.component.get("checkbox").removeAttribute("disabled");
    }

    /**
     * 
     * @param {ContainerEvent} event 
     * @returns 
     */
    clicked(event) {
        this.enabled = event.target.checked;

        if (this.enabled) {
            this.applyIcon(this.enabledIcon);
            this.applyColor(this.enabledColor);
            this.eventManager.trigger(ToggleIcon.EVENT_ENABLED, event);
            return;
        }
        
        this.applyIcon(this.disabledIcon);
        this.applyColor(this.disabledColor);
        this.eventManager.trigger(ToggleIcon.EVENT_DISABLED, event);
    }

    applyColor(color) {
        const container = this.component.get("container");
        container.setAttributeValue("style", "color: " + color);
    }

    applyIcon(icon) {
        const iconElement = this.component.get("icon");
        iconElement.setAttributeValue("class", icon);
    }

    enableHover() {
        const container = this.component.get("container");
        if (!this.enabled) {
            container.setAttributeValue("style", "color: " + this.hoverColor);
        }
    }

    disableHover() {
        const container = this.component.get("container");
        if (this.enabled) {
            container.setAttributeValue("style", "color: " + this.enabledColor);
        } else {
            container.setAttributeValue("style", "color: " + this.disabledColor);
        }
    }
}