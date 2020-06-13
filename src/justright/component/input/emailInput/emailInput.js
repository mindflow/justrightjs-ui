import { EmailValidator } from "justright_core_v1";
import { Logger, ObjectFunction } from "coreutil_v1";
import { CommonInput } from "../commonInput";

const LOG = new Logger("EmailInput");

export class EmailInput extends CommonInput {

    static get COMPONENT_NAME() { return "EmailInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Email"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }

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

        super(EmailInput.COMPONENT_NAME,
            name,
            placeholder,
            "emailInput",
            "emailError",
            model,
            new EmailValidator(mandatory, !mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }

}