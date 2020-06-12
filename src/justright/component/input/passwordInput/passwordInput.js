import { RequiredValidator } from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";
import { CommonInput } from "../commonInput";

const LOG = new Logger("PasswordInput");

export class PasswordInput extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

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

        super(PasswordInput.COMPONENT_NAME,
            name,
            placeholder,
            "passwordInput",
            "passwordError",
            model,
            new RequiredValidator(mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }
}