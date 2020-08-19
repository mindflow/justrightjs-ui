import { PasswordValidator } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { CommonInput } from "../../commonInput";
import { ListenerBundle } from "../../../listenerBundle";

const LOG = new Logger("PasswordMatcherInputValue");

export class PasswordMatcherInputValue extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputValue"; }
    static get DEFAULT_PLACEHOLDER() { return "New password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputValue.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordMatcherInputValue.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new PasswordValidator(mandatory),
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError");
    }
}