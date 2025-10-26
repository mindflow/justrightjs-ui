import { PasswordValidator } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { CommonInput } from "../../commonInput.js";

const LOG = new Logger("PasswordMatcherInputValue");

export class PasswordMatcherInputValue extends CommonInput {
    
    static TEMPLATE_URL = "/assets/justrightjs-ui/passwordMatcherInputValue.html";
    static STYLES_URL = "/assets/justrightjs-ui/passwordMatcherInputValue.css";

    static DEFAULT_PLACEHOLDER = "New password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordMatcherInputValue,
            name,
            model,
            new PasswordValidator(mandatory),
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError");
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-value-error password-matcher-input-value-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-value-error password-matcher-input-value-error-hidden"); }
}