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

const LOG = new Logger("DropDownPanel");

export class DropDownPanel {

    static TYPE_PRIMARY = "drop-down-panel-button-primary";
    static TYPE_SECONDARY = "drop-down-panel-button-secondary";
    static TYPE_SUCCESS = "drop-down-panel-button-success";
    static TYPE_INFO = "drop-down-panel-button-info";
    static TYPE_WARNING = "drop-down-panel-button-warning";
    static TYPE_DANGER = "drop-down-panel-button-danger";
    static TYPE_LIGHT = "drop-down-panel-button-light";
    static TYPE_DARK = "drop-down-panel-button-dark";

    static SIZE_MEDIUM = "drop-down-panel-button-medium";
    static SIZE_LARGE = "drop-down-panel-button-large";

    static ORIENTATION_LEFT = "drop-down-panel-left";
    static ORIENTATION_RIGHT = "drop-down-panel-right";

    static CONTENT_VISIBLE = "drop-down-panel-content-visible";
    static CONTENT_HIDDEN = "drop-down-panel-content-hidden";
    static CONTENT_EXPAND = "drop-down-panel-content-expand";
    static CONTENT_COLLAPSE = "drop-down-panel-content-collapse";
    static CONTENT = "drop-down-panel-content";
    static BUTTON = "drop-down-panel-button";

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = DropDownPanel.TYPE_DARK, size = DropDownPanel.SIZE_MEDIUM, orientation = DropDownPanel.ORIENTATION_LEFT) {

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
            .media("(prefers-reduced-motion: reduce)")
            .open()
                .selector(".drop-down-panel-button")
                .open()
                    .style("transition", "none")
                .close()
            .close()

            .selector(".drop-down-panel-outline")
            .open()
                .style("display", "inline-block")
                .style("vertical-align", "middle")
            .close()

            .selector(".drop-down-panel-button")
            .open()
                .style("min-width", "35pt")
                .style("display", "inline-block")
                .style("font-weight", "400")
                .style("color", "#212529")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("-webkit-user-select", "none")
                .style("-moz-user-select", "none")
                .style("-ms-user-select", "none")
                .style("user-select", "none")
                .style("background-color", "transparent")
                .style("border", "1px solid transparent")
                .style("padding", "0.375rem 0.75rem")
                .style("line-height", "1.5")
                .style("border-radius", "0.25rem")
                .style("transition", "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".drop-down-panel-button-medium")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".drop-down-panel-button-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".drop-down-panel-content")
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

            .selector(".drop-down-panel-content.drop-down-panel-left")
            .open()
                .style("transform", "translate(0%, 10pt) translate(0%,0px)")
            .close()

            .selector(".drop-down-panel-content.drop-down-panel-right")
            .open()
                .style("transform", "translate(-100%, 10pt) translate(35pt,0px)")
            .close()

            .selector(".drop-down-panel-content-visible")
            .open()
                .style("display","block")
            .close()
                
            .selector(".drop-down-panel-content-hidden")
            .open()
                .style("display","none")
            .close()

            .selector(".drop-down-panel-arrow")
            .open()
                .style("padding", "10px 20px")
                .style("color", "#333333")
                .style("font-weight", "normal")
                .style("position", "absolute")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("display", "none")
                .style("transform", "translate(0%, 50%) translate(0%,-3pt)")
            .close()

            .selector(".drop-down-panel-arrow i")
            .open()
                .style("position", "absolute")
                .style("margin-left", "-15px")
                .style("width", "40px")
                .style("height", "15px")
                .style("overflow", "hidden")
                .style("top", "-20%")
                .style("left", "30%")
            .close()

            .selector(".drop-down-panel-arrow i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "18px")
                .style("height", "15px")
                .style("background-color", "#ffffff")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("left", "30%")
                .style("transform", "translate(50%,50%) rotate(45deg)")
            .close()

            .selector(".drop-down-panel-button:hover")
            .open()
                .style("color", "#212529")
                .style("text-decoration", "none")
            .close()

            .selector(".drop-down-panel-button:focus," +
                        ".drop-down-panel-button.focus")
            .open()
                .style("outline", "0")
                .style("box-shadow", "0 0 0 0.2rem rgba(0, 123, 255, 0.25)")
            .close()

            .selector(".drop-down-panel-button.disabled,"+ 
                        ".drop-down-panel-button:disabled")
            .open()
                .style("opacity", "0.65")
            .close()

            .selector(".drop-down-panel-button-primary")
            .open()
                .style("color", "#fff")
                .style("background-color", "#007bff")
                .style("border-color", "#007bff")
            .close()
        
            .selector(".drop-down-panel-button-primary:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#0069d9")
                .style("border-color", "#0062cc")
            .close()
        
            .selector(".drop-down-panel-button-primary:focus," +
                        ".drop-down-panel-button-primary.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(38, 143, 255, 0.5)")
            .close()

            .selector(".drop-down-panel-button-primary.disabled," +
                        ".drop-down-panel-button-primary:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#5eabfd")
                .style("border-color", "#5eabfd")
            .close()

            .selector(".drop-down-panel-button-primary:not(:disabled):not(.disabled):active," +
                        ".drop-down-panel-button-primary:not(:disabled):not(.disabled).active," +
                        ".show > .drop-down-panel-button-primary.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#0062cc")
                .style("border-color", "#005cbf")
            .close()
        
            .selector(".drop-down-panel-button-primary:not(:disabled):not(.disabled):active:focus," +
                        ".drop-down-panel-button-primary:not(:disabled):not(.disabled).active:focus," + 
                        ".show > .drop-down-panel-button-primary.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(38, 143, 255, 0.5)")
            .close()

            .selector(".drop-down-panel-button-secondary")
            .open()
                .style("color", "#fff")
                .style("background-color", "#6c757d")
                .style("border-color", "#6c757d")
            .close()
        
            .selector(".drop-down-panel-button-secondary:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#5a6268")
                .style("border-color", "#545b62")
            .close()
        
            .selector(".drop-down-panel-button-secondary:focus," + 
                        ".drop-down-panel-button-secondary.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(130, 138, 145, 0.5)")
            .close()

            .selector(".drop-down-panel-button-secondary.disabled," +
                        ".drop-down-panel-button-secondary:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#6c757d")
                .style("border-color", "#6c757d")
            .close()

            .selector(".drop-down-panel-button-secondary:not(:disabled):not(.disabled):active," +
                        ".drop-down-panel-button-secondary:not(:disabled):not(.disabled).active," +
                        ".show > .drop-down-panel-button-secondary.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#545b62")
                .style("border-color", "#4e555b")
            .close()

            .selector(".drop-down-panel-button-secondary:not(:disabled):not(.disabled):active:focus," +
                        ".drop-down-panel-button-secondary:not(:disabled):not(.disabled).active:focus," +
                        ".show > .drop-down-panel-button-secondary.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(130, 138, 145, 0.5)")
            .close()

            .selector(".drop-down-panel-button-secondary.disabled," +
                        ".drop-down-panel-button-secondary:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#6c757d")
                .style("border-color", "#6c757d")
            .close()

            .selector(".drop-down-panel-button-secondary:not(:disabled):not(.disabled):active," +
                        ".drop-down-panel-button-secondary:not(:disabled):not(.disabled).active," +
                        ".show > .drop-down-panel-button-secondary.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#545b62")
                .style("border-color", "#4e555b")
            .close()

            .selector(".drop-down-panel-button-secondary:not(:disabled):not(.disabled):active:focus," +
                        ".drop-down-panel-button-secondary:not(:disabled):not(.disabled).active:focus," +
                        ".show > .drop-down-panel-button-secondary.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(130, 138, 145, 0.5)")
            .close()
        
            .selector(".drop-down-panel-button-success")
            .open()
                .style("color", "#fff")
                .style("background-color", "#28a745")
                .style("border-color", "#28a745")
            .close()
        
            .selector(".drop-down-panel-button-success:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#218838")
                .style("border-color", "#1e7e34")
            .close()
        
            .selector(".drop-down-panel-button-success:focus," +
                        ".drop-down-panel-button-success.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(72, 180, 97, 0.5)")
            .close()
        
            .selector(".drop-down-panel-button-success.disabled," + 
                        ".drop-down-panel-button-success:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#28a745")
                .style("border-color", "#28a745")
            .close()

            .selector(".drop-down-panel-button-success:not(:disabled):not(.disabled):active," +
                        ".drop-down-panel-button-success:not(:disabled):not(.disabled).active," +
                        ".show > .drop-down-panel-button-success.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#1e7e34")
                .style("border-color", "#1c7430")
            .close()

            .selector(".drop-down-panel-button-success:not(:disabled):not(.disabled):active:focus," +
                        ".drop-down-panel-button-success:not(:disabled):not(.disabled).active:focus," +
                        ".show > .drop-down-panel-button-success.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(72, 180, 97, 0.5)")
            .close()

            .selector(".drop-down-panel-button-info")
            .open()
                .style("color", "#fff")
                .style("background-color", "#17a2b8")
                .style("border-color", "#17a2b8")
            .close()

            .selector(".drop-down-panel-button-info:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#138496")
                .style("border-color", "#117a8b")
            .close()

            .selector(".drop-down-panel-button-info:focus," + 
                        ".drop-down-panel-button-info.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(58, 176, 195, 0.5)")
            .close()

            .selector(".drop-down-panel-button-info.disabled," + 
                        ".drop-down-panel-button-info:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#17a2b8")
                .style("border-color", "#17a2b8")
            .close()

            .selector(".drop-down-panel-button-info:not(:disabled):not(.disabled):active," + 
                        ".drop-down-panel-button-info:not(:disabled):not(.disabled).active," + 
                        ".show > .drop-down-panel-button-info.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#117a8b")
                .style("border-color", "#10707f")
            .close()

            .selector(".drop-down-panel-button-info:not(:disabled):not(.disabled):active:focus," + 
                ".drop-down-panel-button-info:not(:disabled):not(.disabled).active:focus," + 
                ".show > .drop-down-panel-button-info.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(58, 176, 195, 0.5)")
            .close()

            .selector(".drop-down-panel-button-warning")
            .open()
                .style("color", "#212529")
                .style("background-color", "#ffc107")
                .style("border-color", "#ffc107")
            .close()

            .selector(".drop-down-panel-button-warning:hover")
            .open()
                .style("color", "#212529")
                .style("background-color", "#e0a800")
                .style("border-color", "#d39e00")
            .close()

            .selector(".drop-down-panel-button-warning:focus," +
                        ".drop-down-panel-button-warning.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(222, 170, 12, 0.5)")
            .close()

            .selector(".drop-down-panel-button-warning.disabled," + 
                        ".drop-down-panel-button-warning:disabled")
            .open()
                .style("color", "#212529")
                .style("background-color", "#ffc107")
                .style("border-color", "#ffc107")
            .close()

            .selector(".drop-down-panel-button-warning:not(:disabled):not(.disabled):active:focus," + 
                        ".drop-down-panel-button-warning:not(:disabled):not(.disabled).active:focus," + 
                        ".show > .drop-down-panel-button-warning.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(222, 170, 12, 0.5)")
            .close()

            .selector(".drop-down-panel-button-danger")
            .open()
                .style("color", "#fff")
                .style("background-color", "#dc3545")
                .style("border-color", "#dc3545")
            .close()

            .selector(".drop-down-panel-button-danger:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#c82333")
                .style("border-color", "#bd2130")
            .close()

            .selector(".drop-down-panel-button-danger:focus, .drop-down-panel-button-danger.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(225, 83, 97, 0.5)")
            .close()

            .selector(".drop-down-panel-button-danger.disabled," + 
                        ".drop-down-panel-button-danger:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#dc3545")
                .style("border-color", "#dc3545")
            .close()

            .selector(".drop-down-panel-button-danger:not(:disabled):not(.disabled):active," + 
                        ".drop-down-panel-button-danger:not(:disabled):not(.disabled).active," + 
                        ".show > .drop-down-panel-button-danger.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#bd2130")
                .style("border-color", "#b21f2d")
            .close()

            .selector(".drop-down-panel-button-danger:not(:disabled):not(.disabled):active:focus," + 
                        ".drop-down-panel-button-danger:not(:disabled):not(.disabled).active:focus," + 
                        ".show > .drop-down-panel-button-danger.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(225, 83, 97, 0.5)")
            .close()
            
            .selector(".drop-down-panel-button-light")
            .open()
                .style("color", "#212529")
                .style("background-color", "#f8f9fa")
                .style("border-color", "#f8f9fa")
            .close()
        
            .selector(".drop-down-panel-button-light:hover")
            .open()
                .style("color", "#212529")
                .style("background-color", "#e2e6ea")
                .style("border-color", "#dae0e5")
            .close()
        
            .selector(".drop-down-panel-button-light:focus," + 
                        ".drop-down-panel-button-light.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(216, 217, 219, 0.5)")
            .close()
        
            .selector(".drop-down-panel-button-light.disabled," + 
                        ".drop-down-panel-button-light:disabled")
            .open()
                .style("color", "#212529")
                .style("background-color", "#f8f9fa")
                .style("border-color", "#f8f9fa")
            .close()
        
            .selector(".drop-down-panel-button-light:not(:disabled):not(.disabled):active," + 
                        ".drop-down-panel-button-light:not(:disabled):not(.disabled).active," + 
                        ".show > .drop-down-panel-button-light.dropdown-toggle")
            .open()
                .style("color", "#212529")
                .style("background-color", "#dae0e5")
                .style("border-color", "#d3d9df")
            .close()

            .selector(".drop-down-panel-button-light:not(:disabled):not(.disabled):active:focus," + 
                        ".drop-down-panel-button-light:not(:disabled):not(.disabled).active:focus," + 
                        ".show > .drop-down-panel-button-light.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(216, 217, 219, 0.5)")
            .close()

            .selector(".drop-down-panel-button-dark")
            .open()
                .style("color", "#fff")
                .style("background-color", "#343a40")
                .style("border-color", "#343a40")
            .close()
        
            .selector(".drop-down-panel-button-dark:hover")
            .open()
                .style("color", "#fff")
                .style("background-color", "#23272b")
                .style("border-color", "#1d2124")
            .close()
        
            .selector(".drop-down-panel-button-dark:focus," + 
                        ".drop-down-panel-button-dark.focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(82, 88, 93, 0.5)")
            .close()
        
            .selector(".drop-down-panel-button-dark.disabled," + 
                        ".drop-down-panel-button-dark:disabled")
            .open()
                .style("color", "#fff")
                .style("background-color", "#343a40")
                .style("border-color", "#343a40")
            .close()

            .selector(".drop-down-panel-button-dark:not(:disabled):not(.disabled):active," + 
                        ".drop-down-panel-button-dark:not(:disabled):not(.disabled).active," + 
                        ".show > .drop-down-panel-button-dark.dropdown-toggle")
            .open()
                .style("color", "#fff")
                .style("background-color", "#1d2124")
                .style("border-color", "#171a1d")
            .close()

            .selector(".drop-down-panel-button-dark:not(:disabled):not(.disabled):active:focus," + 
                        ".drop-down-panel-button-dark:not(:disabled):not(.disabled).active:focus," + 
                        ".show > .drop-down-panel-button-dark.dropdown-toggle:focus")
            .open()
                .style("box-shadow", "0 0 0 0.2rem rgba(82, 88, 93, 0.5)")
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
            .root("div", "id=dropDownPanelRoot", "class=drop-down-panel-outline")
            .open()
                .node("button", "id=button", "class=drop-down-panel-button")
                .node("div", "id=arrow", "class=drop-down-panel-arrow")
                .open()
                    .node("i")
                .close()
                .node("div", "id=content", "class=drop-down-panel-content", "tabindex=0")
            .close()

            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(DropDownPanel);
        CanvasStyles.enableStyle(DropDownPanel.name);
        this.component.get("button").setChild(HTML.i("", this.iconClass));

        StyleSelectorAccessor.from(this.component.get("button"))
            .enable(DropDownPanel.BUTTON)
            .enable(this.type);

        StyleSelectorAccessor.from(this.component.get("content"))
            .enable(DropDownPanel.CONTENT)
            .disable(DropDownPanel.CONTENT_VISIBLE)
            .enable(DropDownPanel.CONTENT_HIDDEN)
            .enable(this.size)
            .enable(this.orientation);

        this.component.get("button").listenTo("click", new Method(this, this.clicked));
        CanvasRoot.listenToFocusEscape(new Method(this, this.hide), this.component.get("dropDownPanelRoot"));
    }

    /**
     * 
     * @param {Component} dropDownPanelContent 
     */
    setPanelContent(dropDownPanelContent) {
        this.component.get("content").setChild(dropDownPanelContent.component);
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
            .disable(DropDownPanel.CONTENT_HIDDEN)
            .enable(DropDownPanel.CONTENT_VISIBLE);
        StyleAccessor.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").containerElement.focus();
    }

    hide() {
        StyleSelectorAccessor.from(this.component.get("content"))
            .disable(DropDownPanel.CONTENT_VISIBLE)
            .enable(DropDownPanel.CONTENT_HIDDEN);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}