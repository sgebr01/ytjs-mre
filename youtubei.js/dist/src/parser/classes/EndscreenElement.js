import { Parser } from '../index.js';
import Thumbnail from './misc/Thumbnail.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import Text from './misc/Text.js';
import { YTNode } from '../helpers.js';
class EndscreenElement extends YTNode {
    constructor(data) {
        super();
        this.style = data.style;
        this.title = new Text(data.title);
        this.endpoint = new NavigationEndpoint(data.endpoint);
        if (Reflect.has(data, 'image')) {
            this.image = Thumbnail.fromResponse(data.image);
        }
        if (Reflect.has(data, 'icon')) {
            this.icon = Thumbnail.fromResponse(data.icon);
        }
        if (Reflect.has(data, 'metadata')) {
            this.metadata = new Text(data.metadata);
        }
        if (Reflect.has(data, 'callToAction')) {
            this.call_to_action = new Text(data.callToAction);
        }
        if (Reflect.has(data, 'hovercardButton')) {
            this.hovercard_button = Parser.parseItem(data.hovercardButton);
        }
        if (Reflect.has(data, 'isSubscribe')) {
            this.is_subscribe = !!data.isSubscribe;
        }
        if (Reflect.has(data, 'playlistLength')) {
            this.playlist_length = new Text(data.playlistLength);
        }
        if (Reflect.has(data, 'thumbnailOverlays')) {
            this.thumbnail_overlays = Parser.parseArray(data.thumbnailOverlays);
        }
        this.left = parseFloat(data.left);
        this.width = parseFloat(data.width);
        this.top = parseFloat(data.top);
        this.aspect_ratio = parseFloat(data.aspectRatio);
        this.start_ms = parseFloat(data.startMs);
        this.end_ms = parseFloat(data.endMs);
        this.id = data.id;
    }
}
EndscreenElement.type = 'EndscreenElement';
export default EndscreenElement;
//# sourceMappingURL=EndscreenElement.js.map