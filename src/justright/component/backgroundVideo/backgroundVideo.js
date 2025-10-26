import { VideoElement, CanvasStyles, Component, TemplateComponentFactory } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";
import { ContainerAsync } from "containerbridge_v1"

const LOG = new Logger("BackgroundVideo");

export class BackgroundVideo {

	static TEMPLATE_URL = "/assets/justrightjs-ui/backgroundVideo.html";
	static STYLES_URL = "/assets/justrightjs-ui/backgroundVideo.css";

    constructor(videoSrc){

        /** @type {TemplateComponentFactory} */
        this.componentFactory = InjectionPoint.instance(TemplateComponentFactory);

		/** @type {Component} */
		this.component = null;

        /** @type {String} */
        this.videoSrc = videoSrc;
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(BackgroundVideo);
		CanvasStyles.enableStyle(BackgroundVideo.name);

        this.component.get("source").setAttributeValue("src", this.videoSrc);
	}

	async playMuted() {
		await ContainerAsync.pause(100);
		/** @type {VideoElement} */
		const video = this.component.get("video");
		video.playMuted();
	}

}