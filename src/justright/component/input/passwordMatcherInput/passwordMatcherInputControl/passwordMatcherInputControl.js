import { EqualsValidator } from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";
import { CommonInput } from "../../commonInput";

const LOG = new Logger("PasswordMatcherInputControl");

export class PasswordMatcherInputControl extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputControl"; }
    static get DEFAULT_PLACEHOLDER() { return "Confirm password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.css"; }

    /**
     * 
     * @param {string} name
     * @param {boolean} mandatory
     * @param {string} placeholder
     * @param {object} model
     * @param {ObjectFunction} comparedValueFunction
     * @param {ObjectFunction} clickListener
     * @param {ObjectFunction} keyupListener
     * @param {ObjectFunction} enterListener
     * @param {ObjectFunction} changeListener
     * @param {ObjectFunction} blurListener
     */
    constructor(name, mandatory = false, placeholder = TextInput.DEFAULT_PLACEHOLDER, model = null, comparedValueFunction = null,
        clickListener = null, keyupListener = null, enterListener = null, changeListener = null, blurListener = null) {

        super(PasswordMatcherInputControl.COMPONENT_NAME,
            name,
            placeholder,
            "passwordMatcherInputControlField",
            "passwordMatcherInputControlError",
            model,
            new EqualsValidator(mandatory, false, comparedValueFunction),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }
}