var _FilterableFeed_chips;
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import Feed from './Feed.js';
import ChipCloudChip from '../../parser/classes/ChipCloudChip.js';
import FeedFilterChipBar from '../../parser/classes/FeedFilterChipBar.js';
import { InnertubeError } from '../../utils/Utils.js';
class FilterableFeed extends Feed {
    constructor(actions, data, already_parsed = false) {
        super(actions, data, already_parsed);
        _FilterableFeed_chips.set(this, void 0);
    }
    /**
     * Returns the filter chips.
     */
    get filter_chips() {
        var _a, _b;
        if (__classPrivateFieldGet(this, _FilterableFeed_chips, "f"))
            return __classPrivateFieldGet(this, _FilterableFeed_chips, "f") || [];
        if (((_a = this.memo.getType(FeedFilterChipBar)) === null || _a === void 0 ? void 0 : _a.length) > 1)
            throw new InnertubeError('There are too many feed filter chipbars, you\'ll need to find the correct one yourself in this.page');
        if (((_b = this.memo.getType(FeedFilterChipBar)) === null || _b === void 0 ? void 0 : _b.length) === 0)
            throw new InnertubeError('There are no feed filter chipbars');
        __classPrivateFieldSet(this, _FilterableFeed_chips, this.memo.getType(ChipCloudChip), "f");
        return __classPrivateFieldGet(this, _FilterableFeed_chips, "f") || [];
    }
    /**
     * Returns available filters.
     */
    get filters() {
        return this.filter_chips.map((chip) => chip.text.toString()) || [];
    }
    /**
     * Applies given filter and returns a new {@link Feed} object.
     */
    getFilteredFeed(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let target_filter;
            if (typeof filter === 'string') {
                if (!this.filters.includes(filter))
                    throw new InnertubeError('Filter not found', { available_filters: this.filters });
                target_filter = this.filter_chips.find((chip) => chip.text.toString() === filter);
            }
            else if (filter.type === 'ChipCloudChip') {
                target_filter = filter;
            }
            else {
                throw new InnertubeError('Invalid filter');
            }
            if (!target_filter)
                throw new InnertubeError('Filter not found');
            if (target_filter.is_selected)
                return this;
            const response = yield ((_a = target_filter.endpoint) === null || _a === void 0 ? void 0 : _a.call(this.actions, { parse: true }));
            if (!response)
                throw new InnertubeError('Failed to get filtered feed');
            return new Feed(this.actions, response, true);
        });
    }
}
_FilterableFeed_chips = new WeakMap();
export default FilterableFeed;
//# sourceMappingURL=FilterableFeed.js.map