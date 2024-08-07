var _TabbedFeed_tabs, _TabbedFeed_actions;
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Feed } from './index.js';
import { InnertubeError } from '../../utils/Utils.js';
import Tab from '../../parser/classes/Tab.js';
class TabbedFeed extends Feed {
    constructor(actions, data, already_parsed = false) {
        var _a;
        super(actions, data, already_parsed);
        _TabbedFeed_tabs.set(this, void 0);
        _TabbedFeed_actions.set(this, void 0);
        __classPrivateFieldSet(this, _TabbedFeed_actions, actions, "f");
        __classPrivateFieldSet(this, _TabbedFeed_tabs, (_a = this.page.contents_memo) === null || _a === void 0 ? void 0 : _a.getType(Tab), "f");
    }
    get tabs() {
        var _a, _b;
        return (_b = (_a = __classPrivateFieldGet(this, _TabbedFeed_tabs, "f")) === null || _a === void 0 ? void 0 : _a.map((tab) => tab.title.toString())) !== null && _b !== void 0 ? _b : [];
    }
    getTabByName(title) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const tab = (_a = __classPrivateFieldGet(this, _TabbedFeed_tabs, "f")) === null || _a === void 0 ? void 0 : _a.find((tab) => tab.title.toLowerCase() === title.toLowerCase());
            if (!tab)
                throw new InnertubeError(`Tab "${title}" not found`);
            if (tab.selected)
                return this;
            const response = yield tab.endpoint.call(__classPrivateFieldGet(this, _TabbedFeed_actions, "f"));
            return new TabbedFeed(__classPrivateFieldGet(this, _TabbedFeed_actions, "f"), response, false);
        });
    }
    getTabByURL(url) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const tab = (_a = __classPrivateFieldGet(this, _TabbedFeed_tabs, "f")) === null || _a === void 0 ? void 0 : _a.find((tab) => { var _a; return ((_a = tab.endpoint.metadata.url) === null || _a === void 0 ? void 0 : _a.split('/').pop()) === url; });
            if (!tab)
                throw new InnertubeError(`Tab "${url}" not found`);
            if (tab.selected)
                return this;
            const response = yield tab.endpoint.call(__classPrivateFieldGet(this, _TabbedFeed_actions, "f"));
            return new TabbedFeed(__classPrivateFieldGet(this, _TabbedFeed_actions, "f"), response, false);
        });
    }
    hasTabWithURL(url) {
        var _a, _b;
        return (_b = (_a = __classPrivateFieldGet(this, _TabbedFeed_tabs, "f")) === null || _a === void 0 ? void 0 : _a.some((tab) => { var _a; return ((_a = tab.endpoint.metadata.url) === null || _a === void 0 ? void 0 : _a.split('/').pop()) === url; })) !== null && _b !== void 0 ? _b : false;
    }
    get title() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.page.contents_memo) === null || _a === void 0 ? void 0 : _a.getType(Tab)) === null || _b === void 0 ? void 0 : _b.find((tab) => tab.selected)) === null || _c === void 0 ? void 0 : _c.title.toString();
    }
}
_TabbedFeed_tabs = new WeakMap(), _TabbedFeed_actions = new WeakMap();
export default TabbedFeed;
//# sourceMappingURL=TabbedFeed.js.map