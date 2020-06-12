import { RequiredValidator, PasswordValidator } from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";
import { CommonInput } from "../../commonInput";

const LOG = new Logger("PasswordMatcherInputValue");

export class PasswordMatcherInputValue extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputValue"; }
    static get DEFAULT_PLACEHOLDER() { return "New password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.css"; }

    /**
     * 
     * @param {string} name
     * @param {boolean} mandatory
     * @param {string} placeholder
     * @param {object} model
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER, model = null, 
        clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        super(PasswordMatcherInputValue.COMPONENT_NAME,
            name,
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError",
            model,
            new PasswordValidator(mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }
}