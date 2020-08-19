import { Logger } from "coreutil_v1";
import { CommonInput } from "../commonInput";
import { RequiredValidator } from "justright_core_v1";
import { ListenerBundle } from "../../listenerBundle";

const LOG = new Logger("TextInput");

export class TextInput extends CommonInput {

    static get COMPONENT_NAME() { return "TextInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Text"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {ListenerBundle} listenerBundle
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, listenerBundle = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(TextInput.COMPONENT_NAME,
            name,
            model,
            listenerBundle,
            new RequiredValidator(!mandatory),
            placeholder,
            "textInput",
            "textError");
    }

}