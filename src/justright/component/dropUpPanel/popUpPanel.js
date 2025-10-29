import {
    CanvasStyles,
    Component,
    CanvasRoot,
    HTML,
    StyleSelectorAccessor,
    StyleAccessor,
    StylesheetBuilder,
    Stylesheet,
    ComponentBuilder,
    InlineComponentFactory
} from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";
import { Logger, Method } from "coreutil_v1";
import { ContainerEvent } from "containerbridge_v1";

const LOG = new Logger("PopUpPanel");

export class PopUpPanel {

    static TYPE_PRIMARY = "pop-up-panel-button-primary";
    static TYPE_SECONDARY = "pop-up-panel-button-secondary";
    static TYPE_SUCCESS = "pop-up-panel-button-success";
    static TYPE_INFO = "pop-up-panel-button-info";
    static TYPE_WARNING = "pop-up-panel-button-warning";
    static TYPE_DANGER = "pop-up-panel-button-danger";
    static TYPE_LIGHT = "pop-up-panel-button-light";
    static TYPE_DARK = "pop-up-panel-button-dark";

    static SIZE_MEDIUM = "pop-up-panel-button-medium";
    static SIZE_LARGE = "pop-up-panel-button-large";

    static ORIENTATION_LEFT = "pop-up-panel-left";
    static ORIENTATION_RIGHT = "pop-up-panel-right";

    static CONTENT_VISIBLE = "pop-up-panel-content-visible";
    static CONTENT_HIDDEN = "pop-up-panel-content-hidden";
    static CONTENT_EXPAND = "pop-up-panel-content-expand";
    static CONTENT_COLLAPSE = "pop-up-panel-content-collapse";
    static CONTENT = "pop-up-panel-content";
    static BUTTON = "pop-up-panel-button";

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = PopUpPanel.TYPE_DARK, size = PopUpPanel.SIZE_MEDIUM, orientation = PopUpPanel.ORIENTATION_LEFT) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.iconClass = iconClass;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.size = size;

        /** @type {string} */
        this.orientation = orientation;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .media("@media (prefers-reduced-motion: reduce)")
            .open()
                .selector(".pop-up-panel-button")
                .open()
                    .style("transition", "none")
                .close()
            .close()

            .selector(".pop-up-panel-outline")
            .open()
                .style("display", "inline-block")
                .style("vertical-align", "middle")
            .close()

            .selector(".pop-up-panel-button")
            .open()
                .style("min-width", "35pt")
                .style("display", "inline-block")
                .style("font-weight", "400")
                .style("color", "#212529")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("user-select", "none")
                .style("background-color", "transparent")
                .style("border", "1px solid transparent")
                .style("padding", "0.375rem 0.75rem")
                .style("line-height", "1.5")
                .style("border-radius", "0.25rem")
                .style("transition", "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".pop-up-panel-button-medium")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".pop-up-panel-button-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".pop-up-panel-content")
            .open()
                .style("min-width", "150pt")
                .style("max-width", "450pt")
                .style("padding", "8pt 14pt")
                .style("color", "#333333")
                .style("background-color", "#ffffff")
                .style("border-radius", "5pt")
                .style("position", "absolute")
                .style("z-index", "99999997")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("overflow", "hidden")
            .close()

            .selector(".pop-up-panel-content.pop-up-panel-left")
            .open()
                .style("transform", "translate(0%, -100%) translate(0%, -42pt)")
            .close()

            .selector(".pop-up-panel-content.pop-up-panel-right")
            .open()
                .style("transform", "translate(-100%, -100%) translate(35pt,-42pt)")
            .close()

            .selector(".pop-up-panel-content-visible")
            .open()
                .style("display","block")
            .close()
                
            .selector(".pop-up-panel-content-hidden")
            .open()
                .style("display","none")
            .close()

            .selector(".pop-up-panel-arrow")
            .open()
                .style("padding", "10px 20px")
                .style("color", "#333333")
                .style("font-weight", "normal")
                .style("position", "absolute")
                .style("z-index", "99999996")
                .style("box-sizing", "border-box")
                .style("display", "none")
                .style("transform", "translate(0%, -100%) translate(0%,-38pt)")
            .close()

            .selector(".pop-up-panel-arrow i")
            .open()
                .style("position", "absolute")
                .style("margin-left", "-15px")
                .style("width", "40px")
                .style("height", "40px")
                .style("overflow", "hidden")
                .style("top", "-20%")
                .style("left", "30%")
            .close()

            .selector(".pop-up-panel-arrow i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "16px")
                .style("height", "16px")
                .style("background-color", "#ffffff")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("left", "30%")
                .style("transform", "translate(50%,50%) rotate(45deg)")
            .close()

            .selector(".pop-up-panel-button:hover")
            .open()
                .style("color", "#212529")
                .style("text-decoration", "none")
            .close()

            .selector(".pop-up-panel-button:focus, .pop-up-panel-button.focus")
            .open()
                .style("outline", "0")
                .style("box-shadow", "0 0 0 0.2rem rgba(0, 123, 255, 0.25)")
            .close()

            .selector(".pop-up-panel-button.disabled, .pop-up-panel-button:disabled")
            .open()
                .style("opacity", "0.65")
            .close()

            .selector(".pop-up-panel-button-primary")
            .open()
                .style("color", "#fff")
                .style("background-color", "#007bff")
                .style("border-color", "#007bff")
            .close()

            .selector(".pop-up-panel-button-primary:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#0069d9")
                .style("border-color", "#0062cc")
            .close()

            .selector(".pop-up-panel-button-primary:focus, .pop-up-panel-button-primary.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(38, 143, 255, 0.5)")
            .close()

            .selector(".pop-up-panel-button-primary.disabled, .pop-up-panel-button-primary:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#5eabfd")
                .style("border-color", "#5eabfd")
            .close()

            .selector(".pop-up-panel-button-primary:not(:disabled):not(.disabled):active, " +
                ".pop-up-panel-button-primary:not(:disabled):not(.disabled).active, " +
                ".show > .pop-up-panel-button-primary.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#0062cc")
                .style("border-color", "#005cbf")
            .close()

            .selector(".pop-up-panel-button-primary:not(:disabled):not(.disabled):active:focus, " +
                ".pop-up-panel-button-primary:not(:disabled):not(.disabled).active:focus, " +
                ".show > .pop-up-panel-button-primary.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(38, 143, 255, 0.5)")
            .close()

            .selector(".pop-up-panel-button-secondary")
            .open()
                .style("color", "#fff")
                .style("background-color", "#6c757d")
                .style("border-color", "#6c757d")
            .close()

            .selector(".pop-up-panel-button-secondary:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#5a6268")
                .style("border-color", "#545b62")
            .close()

            .selector(".pop-up-panel-button-secondary:focus, .pop-up-panel-button-secondary.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(130, 138, 145, 0.5)")
            .close()

            .selector(".pop-up-panel-button-secondary.disabled, .pop-up-panel-button-secondary:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#6c757d")
                .style("border-color", "#6c757d")
            .close()

            .selector(".pop-up-panel-button-secondary:not(:disabled):not(.disabled):active, " +
                ".pop-up-panel-button-secondary:not(:disabled):not(.disabled).active, " +
                ".show > .pop-up-panel-button-secondary.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#545b62")
                .style("border-color", "#4e555b")
            .close()

            .selector(".pop-up-panel-button-secondary:not(:disabled):not(.disabled):active:focus, " +
                ".pop-up-panel-button-secondary:not(:disabled):not(.disabled).active:focus, " +
                ".show > .pop-up-panel-button-secondary.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(130, 138, 145, 0.5)")
            .close()

            .selector(".pop-up-panel-button-success")
            .open()
                .style("color", "#fff")
                .style("background-color", "#28a745")
                .style("border-color", "#28a745")
            .close()

            .selector(".pop-up-panel-button-success:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#218838")
                .style("border-color", "#1e7e34")
            .close()

            .selector(".pop-up-panel-button-success:focus, .pop-up-panel-button-success.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(72, 180, 97, 0.5)")
            .close()

            .selector(".pop-up-panel-button-success.disabled, .pop-up-panel-button-success:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#28a745")
                .style("border-color", "#28a745")
            .close()

            .selector(".pop-up-panel-button-success:not(:disabled):not(.disabled):active, " +
                ".pop-up-panel-button-success:not(:disabled):not(.disabled).active, " +
                ".show > .pop-up-panel-button-success.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#1e7e34")
                .style("border-color", "#1c7430")
            .close()

            .selector(".pop-up-panel-button-success:not(:disabled):not(.disabled):active:focus, " +
                ".pop-up-panel-button-success:not(:disabled):not(.disabled).active:focus, " +
                ".show > .pop-up-panel-button-success.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(72, 180, 97, 0.5)")
            .close()

            .selector(".pop-up-panel-button-info")
            .open()
                .style("color", "#fff")
                .style("background-color", "#17a2b8")
                .style("border-color", "#17a2b8")
            .close()

            .selector(".pop-up-panel-button-info:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#138496")
                .style("border-color", "#117a8b")
            .close()

            .selector(".pop-up-panel-button-info:focus, .pop-up-panel-button-info.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(58, 176, 195, 0.5)")
            .close()

            .selector(".pop-up-panel-button-info.disabled, .pop-up-panel-button-info:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#17a2b8")
                .style("border-color", "#17a2b8")
            .close()

            .selector(".pop-up-panel-button-info:not(:disabled):not(.disabled):active, " +
                ".pop-up-panel-button-info:not(:disabled):not(.disabled).active, " +
                ".show > .pop-up-panel-button-info.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#117a8b")
                .style("border-color", "#10707f")
            .close()

            .selector(".pop-up-panel-button-info:not(:disabled):not(.disabled):active:focus, " +
                ".pop-up-panel-button-info:not(:disabled):not(.disabled).active:focus, " +
                ".show > .pop-up-panel-button-info.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(58, 176, 195, 0.5)")
            .close()

            .selector(".pop-up-panel-button-warning")
            .open()
                .style("color", "#212529")
                .style("background-color", "#ffc107")
                .style("border-color", "#ffc107")
            .close()

            .selector(".pop-up-panel-button-warning:hover")
            .open()
                .style("color", "#212529")
                .style("background-color", "#e0a800")
                .style("border-color", "#d39e00")
            .close()

            .selector(".pop-up-panel-button-warning:focus, .pop-up-panel-button-warning.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(222, 170, 12, 0.5)")
            .close()

            .selector(".pop-up-panel-button-warning.disabled, .pop-up-panel-button-warning:disabled")
            .open()
                .style("color", "#212529")
                .style("background-color", "#ffc107")
                .style("border-color", "#ffc107")
            .close()

            .selector(".pop-up-panel-button-warning:not(:disabled):not(.disabled):active:focus, " +
                ".pop-up-panel-button-warning:not(:disabled):not(.disabled).active:focus, " +
                ".show > .pop-up-panel-button-warning.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(222, 170, 12, 0.5)")
            .close()

            .selector(".pop-up-panel-button-danger")
            .open()
                .style("color", "#fff")
                .style("background-color", "#dc3545")
                .style("border-color", "#dc3545")
            .close()

            .selector(".pop-up-panel-button-danger:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#c82333")
                .style("border-color", "#bd2130")
            .close()

            .selector(".pop-up-panel-button-danger:focus, .pop-up-panel-button-danger.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(225, 83, 97, 0.5)")
            .close()

            .selector(".pop-up-panel-button-danger.disabled, .pop-up-panel-button-danger:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#dc3545")
                .style("border-color", "#dc3545")
            .close()

            .selector(".pop-up-panel-button-danger:not(:disabled):not(.disabled):active, " +
                ".pop-up-panel-button-danger:not(:disabled):not(.disabled).active, " +
                ".show > .pop-up-panel-button-danger.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#bd2130")
                .style("border-color", "#b21f2d")
            .close()

            .selector(".pop-up-panel-button-danger:not(:disabled):not(.disabled):active:focus, " +
                ".pop-up-panel-button-danger:not(:disabled):not(.disabled).active:focus, " +
                ".show > .pop-up-panel-button-danger.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(225, 83, 97, 0.5)")
            .close()

            .selector(".pop-up-panel-button-light")
            .open()
                .style("color", "#212529")
                .style("background-color", "#f8f9fa")
                .style("border-color", "#f8f9fa")
            .close()

            .selector(".pop-up-panel-button-light:hover")
            .open()
                .style("color", "#212529")
                .style("background-color", "#e2e6ea")
                .style("border-color", "#dae0e5")
            .close()

            .selector(".pop-up-panel-button-light:focus, .pop-up-panel-button-light.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(216, 217, 219, 0.5)")
            .close()

            .selector(".pop-up-panel-button-light.disabled, .pop-up-panel-button-light:disabled")
            .open()
                .style("color", "#212529")
                .style("background-color", "#f8f9fa")
                .style("border-color", "#f8f9fa")
            .close()

            .selector(".pop-up-panel-button-light:not(:disabled):not(.disabled):active, " +
                ".pop-up-panel-button-light:not(:disabled):not(.disabled).active, " +
                ".show > .pop-up-panel-button-light.dropdown-toggle")
            .open()
                .style("color", "#212529")
                .style("background-color", "#dae0e5")
                .style("border-color", "#d3d9df")
            .close()

            .selector(".pop-up-panel-button-light:not(:disabled):not(.disabled):active:focus, " +
                ".pop-up-panel-button-light:not(:disabled):not(.disabled).active:focus, " +
                ".show > .pop-up-panel-button-light.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(216, 217, 219, 0.5)")
            .close()

            .selector(".pop-up-panel-button-dark")
            .open()
                .style("color", "#fff")
                .style("background-color", "#343a40")
                .style("border-color", "#343a40")
            .close()

            .selector(".pop-up-panel-button-dark:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#23272b")
                .style("border-color", "#1d2124")
            .close()

            .selector(".pop-up-panel-button-dark:focus, .pop-up-panel-button-dark.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(82, 88, 93, 0.5)")
            .close()

            .selector(".pop-up-panel-button-dark.disabled, .pop-up-panel-button-dark:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#343a40")
                .style("border-color", "#343a40")
            .close()

            .selector(".pop-up-panel-button-dark:not(:disabled):not(.disabled):active, " +
                ".pop-up-panel-button-dark:not(:disabled):not(.disabled).active, " +
                ".show > .pop-up-panel-button-dark.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#1d2124")
                .style("border-color", "#171a1d")
            .close()

            .selector(".pop-up-panel-button-dark:not(:disabled):not(.disabled):active:focus, " +
                ".pop-up-panel-button-dark:not(:disabled):not(.disabled).active:focus, " +
                ".show > .pop-up-panel-button-dark.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(82, 88, 93, 0.5)")
            .close()

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=popUpPanelRoot", "class=pop-up-panel-outline")
            .open()
                .node("button", "id=button", "class=pop-up-panel-button")
                .node("div", "id=arrow", "class=pop-up-panel-arrow")
                .open()
                    .node("i")
                .close()
                .node("div", "id=content", "class=pop-up-panel-content", "tabindex=0")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(PopUpPanel);
        CanvasStyles.enableStyle(PopUpPanel.name);
        this.component.get("button").setChild(HTML.i("", this.iconClass));

        StyleSelectorAccessor.from(this.component.get("button"))
            .enable(PopUpPanel.BUTTON)
            .enable(this.type);

        StyleSelectorAccessor.from(this.component.get("content"))
            .enable(PopUpPanel.CONTENT)
            .disable(PopUpPanel.CONTENT_VISIBLE)
            .enable(PopUpPanel.CONTENT_HIDDEN)
            .enable(this.size)
            .enable(this.orientation);

        this.component.get("button").listenTo("click", new Method(this, this.clicked));
        CanvasRoot.listenToFocusEscape(new Method(this, this.hide), this.component.get("popUpPanelRoot"));
    }

    /**
     * 
     * @param {Component} popUpPanelContent 
     */
    setPanelContent(popUpPanelContent) {
        this.component.get("content").setChild(popUpPanelContent.component);
    }
    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        this.toggleContent();
    }

    toggleContent() {
        if (!StyleAccessor.from(this.component.get("arrow")).is("display","block")) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        StyleSelectorAccessor.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_HIDDEN)
            .enable(PopUpPanel.CONTENT_VISIBLE);
        StyleAccessor.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").containerElement.focus();
    }

    hide() {
        StyleSelectorAccessor.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_VISIBLE)
            .enable(PopUpPanel.CONTENT_HIDDEN);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}