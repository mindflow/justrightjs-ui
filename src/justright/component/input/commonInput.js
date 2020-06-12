import { ObjectFunction } from "coreutil_v1";
import { InputElementDataBinding, AbstractValidator, ComponentFactory, EventRegistry, CanvasStyles } from "justright_core_v1";
import { InjectionPoint } from "mindi_v1";

export class CommonInput {

    static get INPUT_CLICK_EVENT_ID() { return "//event:inputClicked"; }
    static get INPUT_KEYUP_EVENT_ID() { return "//event:inputKeyUp"; }
    static get INPUT_ENTER_EVENT_ID() { return "//event:inputEnter"; }
    static get INPUT_CHANGE_EVENT_ID() { return "//event:inputChange"; }
    static get INPUT_BLUR_EVENT_ID() { return "//event:inputBlur"; }
    static get ERROR_CLICKED_EVENT_ID() { return "//event:errorClicked"; }

    static get ON_CLICK() { return "onclick"; }
    static get ON_KEYUP() { return "onkeyup"; }
    static get ON_CHANGE() { return "onchange"; }
    static get ON_BLUR() { return "onblur"; }

    /**
     * 
     * @param {string} componentName 
     * @param {string} name 
     * @param {string} placeholder 
     * @param {string} inputElementId 
     * @param {string} errorElementId 
     * @param {object} model 
     * @param {AbstractValidator} validator 
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(componentName, name, placeholder, inputElementId, errorElementId, model = null, validator = null, 
            clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        /** @type {string} */
        this.componentName = componentName;

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.placeholder = placeholder;

        /** @type {string} */
        this.inputElementId = inputElementId;

        /** @type {string} */
        this.errorElementId = errorElementId;

        /** @type {object} */
        this.model = model;

        /** @type {AbstractValidator} */
        this.validator = validator;

        /** @type {ObjectFunction} */
        this.clickListener = clickListener;

        /** @type {ObjectFunction} */
        this.keyupListener = keyupListener;

        /** @type {ObjectFunction} */
        this.enterListener = enterListener;

        /** @type {ObjectFunction} */
        this.changeListener = changeListener;

        /** @type {ObjectFunction} */
        this.blurListener = blurListener;

        /** @type {ComponentFactory} */
        this.componentFactory = InjectionPoint.instance(ComponentFactory);

        /** @type {EventRegistry} */
        this.eventRegistry = InjectionPoint.instance(EventRegistry);

        /** @type {boolean} */
        this.tainted = false;
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentName);

        CanvasStyles.enableStyle(this.componentName);

        this.component.get(this.inputElementId).setAttributeValue("name", this.name);
        this.component.get(this.inputElementId).setAttributeValue("placeholder", this.placeholder);

        if(this.validator) {
            this.validator.withValidListener(new ObjectFunction(this,this.hideValidationError));
        }

        if(this.model) {
            InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
        }

        this.registerListener(new ObjectFunction(this, this.entered), CommonInput.ON_KEYUP, CommonInput.INPUT_ENTER_EVENT_ID, (event) => { return event.getKeyCode() === 13; } );
        this.registerListener(new ObjectFunction(this, this.keyupped), CommonInput.ON_KEYUP, CommonInput.INPUT_BLUR_EVENT_ID);
        this.registerListener(new ObjectFunction(this, this.changed), CommonInput.ON_CHANGE, CommonInput.INPUT_CHANGE_EVENT_ID);
        this.registerListener(new ObjectFunction(this, this.blurred), CommonInput.ON_BLUR, CommonInput.INPUT_BLUR_EVENT_ID);
        this.registerListener(new ObjectFunction(this, this.clicked), CommonInput.ON_CLICK, CommonInput.INPUT_BLUR_EVENT_ID);
        this.registerListener(new ObjectFunction(this, this.errorClicked), CommonInput.ON_CLICK, CommonInput.ERROR_CLICKED_EVENT_ID);
    }

    getComponent() {
        return this.component;
    }

    getValidator() {
        return this.validator;
    }

    /**
     * 
     * @param {ObjectFunction} listener 
     * @param {string} eventName 
     * @param {string} eventId 
     * @param {function} eventFilter 
     */
    registerListener(listener, eventName, eventId, eventFilter = null) {
        this.eventRegistry.attach(this.component.get(this.inputElementId), eventName, eventId, this.component.getComponentIndex());
        let filteredListener = listener;
        if(eventFilter) { filteredListener = new ObjectFunction(this,(event) => { if(eventFilter.call(this,event)) { listener.call(event); } }); }
        this.eventRegistry.listen(eventId, filteredListener, this.component.getComponentIndex());
        return this;
    }

    keyupped(event) {
        this.tainted = true;
        if (this.keyupListener) {
            this.keyupListener.call(event);
        }
    }

    changed(event) {
        this.tainted = true;
        if (this.changedListener) {
            this.changedListener.call(event);
        }
    }

    clicked(event) {
        if (this.clickListener) {
            this.clickListener.call(event);
        }
    }

    entered(event) {
        if (!this.validator.isValid()) {
            this.showValidationError();
            this.selectAll();
            return;
        }

        if (this.enterListener) {
            this.enterListener.call(event);
        }
    }

    blurred(event) {
        if (!this.tainted) {
            return;
        }
        if (!this.validator.isValid()) {
            this.showValidationError();
            return;
        }
        this.hideValidationError();

        if (this.blurListener) {
            this.blurListener.call(event);
        }
    }

    errorClicked(event) {
        this.hideValidationError();

        if (this.errorClickListener) {
            this.errorClickListener.call(event);
        }
    }


    showValidationError() { this.component.get(this.errorElementId).setStyle("display", "block"); }
    hideValidationError() { this.component.get(this.errorElementId).setStyle("display", "none"); }
    focus() { this.component.get(this.inputElementId).focus(); }
    selectAll() { this.component.get(this.inputElementId).selectAll(); }
    enable() { this.component.get(this.inputElementId).enable(); }
    disable() { this.component.get(this.inputElementId).disable(); }
    clear() { this.component.get(this.inputElementId).setValue(""); }

}