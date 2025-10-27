import { VideoElement,
	CanvasStyles,
	Component,
	StylesheetBuilder,
	ComponentBuilder,
	InlineComponentFactory 
 } from "justright_core_v1";
import { Logger } from "coreutil_v1";
import { InjectionPoint } from "mindi_v1";
import { ContainerAsync } from "containerbridge_v1"

const LOG = new Logger("BackgroundVideo");

export class BackgroundVideo {

    constructor(videoSrc){

        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

        /** @type {String} */
        this.videoSrc = videoSrc;
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=backgroundVideo", "class=background-video")
			.open()
				.add("div", "class=background-video-overlay")
				.add("video", "id=video", "class=background-video-player",
				              "playsinline=playsinline", "autoplay=true",
				              "muted=true", "loop=loop")
				.open()
					.add("source", "id=source", "src=", "type=video/mp4")
				.close()
			.close()
			.build();
	}

	/**
	 * 
     * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {String}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.add(".background-video")
				.set("width", "auto")
				.set("height", "auto")

			.add(".background-video-player")
				.set("position", "fixed")
				.set("top", "50%")
				.set("left", "50%")
				.set("min-width", "100%")
				.set("min-height", "100%")
				.set("width", "auto")
				.set("height", "auto")
				.set("transform", "translateX(-50%) translateY(-50%)")
				.set("z-index", "0")

			.add(".background-video-overlay")
				.set("position", "absolute")
				.set("min-width", "100%")
				.set("min-height", "100%")
				.set("width", "auto")
				.set("height", "auto")
				.set("background-color", "#1144aa")
				.set("opacity", "0.3")
				.set("z-index", "1")
				
			.build();
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