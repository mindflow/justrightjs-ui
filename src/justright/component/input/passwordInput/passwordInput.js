import { RequiredValidator } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { CommonInput } from "../commonInput";
import { ListenerBundle } from "../../listenerBundle";

const LOG = new Logger("PasswordInput");

export class PasswordInput extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordInput.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new RequiredValidator(!mandatory),
            placeholder,
            "passwordInput",
            "passwordError");
    }
}