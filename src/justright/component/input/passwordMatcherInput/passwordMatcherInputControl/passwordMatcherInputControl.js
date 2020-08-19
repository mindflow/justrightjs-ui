import { EqualsPropertyValidator } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { CommonInput } from "../../commonInput";
import { ListenerBundle } from "../../../listenerBundle";

const LOG = new Logger("PasswordMatcherInputControl");

export class PasswordMatcherInputControl extends CommonInput {
    
    static get COMPONENT_NAME() { return "PasswordMatcherInputControl"; }
    static get DEFAULT_PLACEHOLDER() { return "Confirm password"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/passwordMatcherInputControl.css"; }



    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {string} modelComparedPropertyName
     * @param {boolean} mandatory
     */
    constructor(name, model = null, modelComparedPropertyName = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER,
           mandatory = false) {

        super(PasswordMatcherInputControl.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new EqualsPropertyValidator(mandatory, false, model, modelComparedPropertyName),
            placeholder,
            "passwordMatcherInputControlField",
            "passwordMatcherInputControlError");
    }
}