import { YTNode } from '../../helpers.js';
import { Parser } from '../../index.js';
import LiveChatBanner from './items/LiveChatBanner.js';
class AddBannerToLiveChatCommand extends YTNode {
    constructor(data) {
        super();
        this.banner = Parser.parseItem(data.bannerRenderer, LiveChatBanner);
    }
}
AddBannerToLiveChatCommand.type = 'AddBannerToLiveChatCommand';
export default AddBannerToLiveChatCommand;
//# sourceMappingURL=AddBannerToLiveChatCommand.js.map