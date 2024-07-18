var _a;
class Log {
    static doLog(level, tag, args) {
        if (!this.log_map_[level] || !this.log_level_.includes(level))
            return;
        const tags = [`[${this.YTJS_TAG}]`];
        if (tag)
            tags.push(`[${tag}]`);
        this.log_map_[level](`${tags.join('')}:`, ...(args || []));
    }
    static setLevel(...args) {
        this.log_level_ = args;
    }
}
_a = Log;
Log.YTJS_TAG = 'YOUTUBEJS';
Log.Level = {
    NONE: 0,
    ERROR: 1,
    WARNING: 2,
    INFO: 3,
    DEBUG: 4
};
Log.log_map_ = {
    [_a.Level.ERROR]: (...args) => console.error(...args),
    [_a.Level.WARNING]: (...args) => console.warn(...args),
    [_a.Level.INFO]: (...args) => console.info(...args),
    [_a.Level.DEBUG]: (...args) => console.debug(...args)
};
Log.log_level_ = [_a.Level.WARNING];
Log.one_time_warnings_issued_ = new Set();
Log.warnOnce = (id, ...args) => {
    if (_a.one_time_warnings_issued_.has(id))
        return;
    _a.doLog(_a.Level.WARNING, id, args);
    _a.one_time_warnings_issued_.add(id);
};
Log.warn = (tag, ...args) => _a.doLog(_a.Level.WARNING, tag, args);
Log.error = (tag, ...args) => _a.doLog(_a.Level.ERROR, tag, args);
Log.info = (tag, ...args) => _a.doLog(_a.Level.INFO, tag, args);
Log.debug = (tag, ...args) => _a.doLog(_a.Level.DEBUG, tag, args);
export default Log;
//# sourceMappingURL=Log.js.map