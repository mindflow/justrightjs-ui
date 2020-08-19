import { EmailValidator } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { CommonInput } from "../commonInput";
import { ListenerBundle } from "../../listenerBundle";

const LOG = new Logger("EmailInput");

export class EmailInput extends CommonInput {

    static get COMPONENT_NAME() { return "EmailInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Email"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/emailInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/emailInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(EmailInput.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new EmailValidator(mandatory, !mandatory),
            placeholder,
            "emailInput",
            "emailError");
    }

}