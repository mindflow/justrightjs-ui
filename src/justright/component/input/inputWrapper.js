export class InputWrapper {

    constructor(component) {
        this.component = component;
    }

    wireup(componentName, inputElementId, errorElementId) {

        CanvasStyles.enableStyle(componentName);

        const idx = this.component.getComponentIndex();
        const input = this.component.get(inputElementId);
        const error = this.component.get(errorElementId);

        input.setAttributeValue("name",this.name);

        this.eventRegistry.attach(input, "onblur", PhoneInput.BLUR_EVENT, idx);
        this.eventRegistry.attach(input, "onkeyup", PhoneInput.KEYUP_EVENT, idx);
        this.eventRegistry.attach(input, "onchange", PhoneInput.CHANGE_EVENT, idx);
        this.eventRegistry.attach(error, "onclick", PhoneInput.ERROR_CLICK_EVENT, idx);

        this.eventRegistry.listen(PhoneInput.BLUR_EVENT, new ObjectFunction(this, this.blurred), idx);
        this.eventRegistry.listen(PhoneInput.KEYUP_EVENT, new ObjectFunction(this, this.keyUp), idx);
        this.eventRegistry.listen(PhoneInput.CHANGE_EVENT, new ObjectFunction(this, this.change), idx);
        this.eventRegistry.listen(PhoneInput.ERROR_CLICK_EVENT, new ObjectFunction(this, this.hideValidationError), idx);

        this.withPlaceholder(this.placeholder);
    }

}