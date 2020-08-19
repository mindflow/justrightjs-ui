import { Logger } from "coreutil_v1";
import { CommonInput } from "../commonInput";
import { PhoneValidator } from "justright_core_v1";
import { ListenerBundle } from "../../listenerBundle";

const LOG = new Logger("PhoneInput");

export class PhoneInput extends CommonInput {

    static get COMPONENT_NAME() { return "PhoneInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Phone"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/phoneInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/phoneInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PhoneInput.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new PhoneValidator(mandatory, !mandatory),
            placeholder,
            "phoneInput",
            "phoneError");
    }
}