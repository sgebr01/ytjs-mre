var _TranscriptInfo_page, _TranscriptInfo_actions;
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Parser } from '../index.js';
import Transcript from '../classes/Transcript.js';
class TranscriptInfo {
    constructor(actions, response) {
        _TranscriptInfo_page.set(this, void 0);
        _TranscriptInfo_actions.set(this, void 0);
        __classPrivateFieldSet(this, _TranscriptInfo_page, Parser.parseResponse(response.data), "f");
        __classPrivateFieldSet(this, _TranscriptInfo_actions, actions, "f");
        this.transcript = __classPrivateFieldGet(this, _TranscriptInfo_page, "f").actions_memo.getType(Transcript).first();
    }
    /**
     * Selects a language from the language menu and returns the updated transcript.
     * @param language - Language to select.
     */
    selectLanguage(language) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const target_menu_item = (_d = (_c = (_b = (_a = this.transcript.content) === null || _a === void 0 ? void 0 : _a.footer) === null || _b === void 0 ? void 0 : _b.language_menu) === null || _c === void 0 ? void 0 : _c.sub_menu_items) === null || _d === void 0 ? void 0 : _d.find((item) => item.title.toString() === language);
            if (!target_menu_item)
                throw new Error(`Language not found: ${language}`);
            if (target_menu_item.selected)
                return this;
            const response = yield __classPrivateFieldGet(this, _TranscriptInfo_actions, "f").execute('/get_transcript', {
                params: target_menu_item.continuation
            });
            return new TranscriptInfo(__classPrivateFieldGet(this, _TranscriptInfo_actions, "f"), response);
        });
    }
    /**
     * Returns available languages.
     */
    get languages() {
        var _a, _b, _c, _d;
        return ((_d = (_c = (_b = (_a = this.transcript.content) === null || _a === void 0 ? void 0 : _a.footer) === null || _b === void 0 ? void 0 : _b.language_menu) === null || _c === void 0 ? void 0 : _c.sub_menu_items) === null || _d === void 0 ? void 0 : _d.map((item) => item.title.toString())) || [];
    }
    /**
     * Returns the currently selected language.
     */
    get selectedLanguage() {
        var _a, _b, _c, _d, _e;
        return ((_e = (_d = (_c = (_b = (_a = this.transcript.content) === null || _a === void 0 ? void 0 : _a.footer) === null || _b === void 0 ? void 0 : _b.language_menu) === null || _c === void 0 ? void 0 : _c.sub_menu_items) === null || _d === void 0 ? void 0 : _d.find((item) => item.selected)) === null || _e === void 0 ? void 0 : _e.title.toString()) || '';
    }
    get page() {
        return __classPrivateFieldGet(this, _TranscriptInfo_page, "f");
    }
}
_TranscriptInfo_page = new WeakMap(), _TranscriptInfo_actions = new WeakMap();
export default TranscriptInfo;
//# sourceMappingURL=TranscriptInfo.js.map