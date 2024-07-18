import { YTNode } from '../../../helpers.js';
import NavigationEndpoint from '../../NavigationEndpoint.js';
import Author from '../../misc/Author.js';
import Text from '../../misc/Text.js';
import Thumbnail from '../../misc/Thumbnail.js';
class LiveChatPaidSticker extends YTNode {
    constructor(data) {
        super();
        this.id = data.id;
        this.author = new Author(data.authorName, data.authorBadges, data.authorPhoto, data.authorExternalChannelId);
        this.money_chip_background_color = data.moneyChipBackgroundColor;
        this.money_chip_text_color = data.moneyChipTextColor;
        this.background_color = data.backgroundColor;
        this.author_name_text_color = data.authorNameTextColor;
        this.sticker = Thumbnail.fromResponse(data.sticker);
        this.purchase_amount = new Text(data.purchaseAmountText).toString();
        this.menu_endpoint = new NavigationEndpoint(data.contextMenuEndpoint);
        this.context_menu = this.menu_endpoint;
        this.timestamp = Math.floor(parseInt(data.timestampUsec) / 1000);
    }
}
LiveChatPaidSticker.type = 'LiveChatPaidSticker';
export default LiveChatPaidSticker;
//# sourceMappingURL=LiveChatPaidSticker.js.map