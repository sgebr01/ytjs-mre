import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Button from './Button.js';
import Author from './misc/Author.js';
import Text from './misc/Text.js';
import Thumbnail from './misc/Thumbnail.js';
class PlayerOverlayAutoplay extends YTNode {
    constructor(data) {
        super();
        this.title = new Text(data.title);
        this.video_id = data.videoId;
        this.video_title = new Text(data.videoTitle);
        this.short_view_count = new Text(data.shortViewCountText);
        this.prefer_immediate_redirect = data.preferImmediateRedirect;
        this.count_down_secs_for_fullscreen = data.countDownSecsForFullscreen;
        this.published = new Text(data.publishedTimeText);
        this.background = Thumbnail.fromResponse(data.background);
        this.thumbnail_overlays = Parser.parseArray(data.thumbnailOverlays);
        this.author = new Author(data.byline);
        this.cancel_button = Parser.parseItem(data.cancelButton, Button);
        this.next_button = Parser.parseItem(data.nextButton, Button);
        this.close_button = Parser.parseItem(data.closeButton, Button);
    }
}
PlayerOverlayAutoplay.type = 'PlayerOverlayAutoplay';
export default PlayerOverlayAutoplay;
//# sourceMappingURL=PlayerOverlayAutoplay.js.map