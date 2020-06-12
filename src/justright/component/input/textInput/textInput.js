import { Logger, ObjectFunction } from "coreutil_v1";
import { CommonInput } from "../commonInput";
import { RequiredValidator } from "justright_core_v1";

const LOG = new Logger("TextInput");

export class TextInput extends CommonInput {

    static get COMPONENT_NAME() { return "TextInput"; }
    static get DEFAULT_PLACEHOLDER() { return "Text"; }

    static get TEMPLATE_URL() { return "/assets/justrightjs-ui/textInput.html"; }
    static get STYLES_URL() { return "/assets/justrightjs-ui/textInput.css"; }

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

        super(TextInput.COMPONENT_NAME,
            name,
            placeholder,
            "textInput",
            "textError",
            model,
            new RequiredValidator(mandatory),
            clickListener,
            keyupListener,
            enterListener,
            changeListener,
            blurListener);
    }

}