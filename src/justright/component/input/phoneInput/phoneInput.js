import { Logger, ObjectFunction } from "coreutil_v1";
import { CommonInput } from "../commonInput";
import { PhoneValidator } from "justright_core_v1";

const LOG = new Logger("PhoneInput");

export class PhoneInput extends CommonInput {

    static get COMPONENT_NAME() { return "PhoneInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Phone"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/phoneInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/phoneInput.css"; }

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

        super(PhoneInput.COMPONENT_NAME,
            name,
            placeholder,
            "phoneInput",
            "phoneError",
            model,
            new PhoneValidator(mandatory, !mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }
}