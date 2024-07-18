var _MediaInfo_page, _MediaInfo_actions, _MediaInfo_cpn, _MediaInfo_playback_tracking;
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Constants, FormatUtils } from '../../utils/index.js';
import { InnertubeError } from '../../utils/Utils.js';
import { getStreamingInfo } from '../../utils/StreamingInfo.js';
import { Parser } from '../../parser/index.js';
import { TranscriptInfo } from '../../parser/youtube/index.js';
import ContinuationItem from '../../parser/classes/ContinuationItem.js';
class MediaInfo {
    constructor(data, actions, cpn) {
        var _a, _b;
        _MediaInfo_page.set(this, void 0);
        _MediaInfo_actions.set(this, void 0);
        _MediaInfo_cpn.set(this, void 0);
        _MediaInfo_playback_tracking.set(this, void 0);
        __classPrivateFieldSet(this, _MediaInfo_actions, actions, "f");
        const info = Parser.parseResponse(data[0].data);
        const next = ((_a = data === null || data === void 0 ? void 0 : data[1]) === null || _a === void 0 ? void 0 : _a.data) ? Parser.parseResponse(data[1].data) : undefined;
        __classPrivateFieldSet(this, _MediaInfo_page, [info, next], "f");
        __classPrivateFieldSet(this, _MediaInfo_cpn, cpn, "f");
        if (((_b = info.playability_status) === null || _b === void 0 ? void 0 : _b.status) === 'ERROR')
            throw new InnertubeError('This video is unavailable', info.playability_status);
        this.streaming_data = info.streaming_data;
        this.playability_status = info.playability_status;
        this.player_config = info.player_config;
        __classPrivateFieldSet(this, _MediaInfo_playback_tracking, info.playback_tracking, "f");
    }
    /**
     * Generates a DASH manifest from the streaming data.
     * @param url_transformer - Function to transform the URLs.
     * @param format_filter - Function to filter the formats.
     * @param options - Additional options to customise the manifest generation
     * @returns DASH manifest
     */
    toDash(url_transformer_1, format_filter_1) {
        return __awaiter(this, arguments, void 0, function* (url_transformer, format_filter, options = { include_thumbnails: false }) {
            var _a, _b;
            const player_response = __classPrivateFieldGet(this, _MediaInfo_page, "f")[0];
            if (player_response.video_details && (player_response.video_details.is_live)) {
                throw new InnertubeError('Generating DASH manifests for live videos is not supported. Please use the DASH and HLS manifests provided by YouTube in `streaming_data.dash_manifest_url` and `streaming_data.hls_manifest_url` instead.');
            }
            let storyboards;
            let captions;
            if (options.include_thumbnails && player_response.storyboards) {
                storyboards = player_response.storyboards;
            }
            if (typeof options.captions_format === 'string' && ((_a = player_response.captions) === null || _a === void 0 ? void 0 : _a.caption_tracks)) {
                captions = player_response.captions.caption_tracks;
            }
            return FormatUtils.toDash(this.streaming_data, (_b = this.page[0].video_details) === null || _b === void 0 ? void 0 : _b.is_post_live_dvr, url_transformer, format_filter, __classPrivateFieldGet(this, _MediaInfo_cpn, "f"), __classPrivateFieldGet(this, _MediaInfo_actions, "f").session.player, __classPrivateFieldGet(this, _MediaInfo_actions, "f"), storyboards, captions, options);
        });
    }
    /**
     * Get a cleaned up representation of the adaptive_formats
     */
    getStreamingInfo(url_transformer, format_filter) {
        var _a;
        return getStreamingInfo(this.streaming_data, (_a = this.page[0].video_details) === null || _a === void 0 ? void 0 : _a.is_post_live_dvr, url_transformer, format_filter, this.cpn, __classPrivateFieldGet(this, _MediaInfo_actions, "f").session.player, __classPrivateFieldGet(this, _MediaInfo_actions, "f"), __classPrivateFieldGet(this, _MediaInfo_page, "f")[0].storyboards ? __classPrivateFieldGet(this, _MediaInfo_page, "f")[0].storyboards : undefined);
    }
    /**
     * Selects the format that best matches the given options.
     * @param options - Options
     */
    chooseFormat(options) {
        return FormatUtils.chooseFormat(options, this.streaming_data);
    }
    /**
     * Downloads the video.
     * @param options - Download options.
     */
    download() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const player_response = __classPrivateFieldGet(this, _MediaInfo_page, "f")[0];
            if (player_response.video_details && (player_response.video_details.is_live || player_response.video_details.is_post_live_dvr)) {
                throw new InnertubeError('Downloading is not supported for live and Post-Live-DVR videos, as they are split up into 5 second segments that are individual files, which require using a tool such as ffmpeg to stitch them together, so they cannot be returned in a single stream.');
            }
            return FormatUtils.download(options, __classPrivateFieldGet(this, _MediaInfo_actions, "f"), this.playability_status, this.streaming_data, __classPrivateFieldGet(this, _MediaInfo_actions, "f").session.player, this.cpn);
        });
    }
    /**
     * Retrieves the video's transcript.
     * @param video_id - The video id.
     */
    getTranscript() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const next_response = this.page[1];
            if (!next_response)
                throw new InnertubeError('Cannot get transcript from basic video info.');
            if (!next_response.engagement_panels)
                throw new InnertubeError('Engagement panels not found. Video likely has no transcript.');
            const transcript_panel = next_response.engagement_panels.get({
                panel_identifier: 'engagement-panel-searchable-transcript'
            });
            if (!transcript_panel)
                throw new InnertubeError('Transcript panel not found. Video likely has no transcript.');
            const transcript_continuation = (_a = transcript_panel.content) === null || _a === void 0 ? void 0 : _a.as(ContinuationItem);
            if (!transcript_continuation)
                throw new InnertubeError('Transcript continuation not found.');
            const response = yield transcript_continuation.endpoint.call(this.actions);
            return new TranscriptInfo(this.actions, response);
        });
    }
    /**
     * Adds video to the watch history.
     */
    addToWatchHistory() {
        return __awaiter(this, arguments, void 0, function* (client_name = Constants.CLIENTS.WEB.NAME, client_version = Constants.CLIENTS.WEB.VERSION, replacement = 'https://www.') {
            if (!__classPrivateFieldGet(this, _MediaInfo_playback_tracking, "f"))
                throw new InnertubeError('Playback tracking not available');
            const url_params = {
                cpn: __classPrivateFieldGet(this, _MediaInfo_cpn, "f"),
                fmt: 251,
                rtn: 0,
                rt: 0
            };
            const url = __classPrivateFieldGet(this, _MediaInfo_playback_tracking, "f").videostats_playback_url.replace('https://s.', replacement);
            const response = yield __classPrivateFieldGet(this, _MediaInfo_actions, "f").stats(url, {
                client_name,
                client_version
            }, url_params);
            return response;
        });
    }
    /**
     * Actions instance.
     */
    get actions() {
        return __classPrivateFieldGet(this, _MediaInfo_actions, "f");
    }
    /**
     * Content Playback Nonce.
     */
    get cpn() {
        return __classPrivateFieldGet(this, _MediaInfo_cpn, "f");
    }
    /**
     * Original parsed InnerTube response.
     */
    get page() {
        return __classPrivateFieldGet(this, _MediaInfo_page, "f");
    }
}
_MediaInfo_page = new WeakMap(), _MediaInfo_actions = new WeakMap(), _MediaInfo_cpn = new WeakMap(), _MediaInfo_playback_tracking = new WeakMap();
export default MediaInfo;
//# sourceMappingURL=MediaInfo.js.map