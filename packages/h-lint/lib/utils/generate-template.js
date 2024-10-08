"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ejs_1 = __importDefault(require("ejs"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = __importDefault(require("glob"));
var lodash_1 = __importDefault(require("lodash"));
var path_1 = __importDefault(require("path"));
var constants_1 = require("./constants");
var mergeVSCodeConfig = function (filepath, content) {
    if (!fs_extra_1.default.existsSync(filepath))
        return content;
    try {
        var targetData = fs_extra_1.default.readJSONSync(filepath);
        var sourceData = JSON.parse(content);
        return JSON.stringify(lodash_1.default.mergeWith(targetData, sourceData, function (target, source) {
            if (Array.isArray(target) && Array.isArray(source)) {
                return __spreadArray([], __read(new Set(source.concat(target))), false);
            }
        }), null, 2);
    }
    catch (e) {
        return '';
    }
};
exports.default = (function (cwd, data, vscode) {
    var e_1, _a;
    var templatePath = path_1.default.resolve(__dirname, '../config');
    var templates = glob_1.default.sync("".concat(vscode ? '_vscode' : '**', "/*.ejs"), { cwd: templatePath });
    try {
        for (var templates_1 = __values(templates), templates_1_1 = templates_1.next(); !templates_1_1.done; templates_1_1 = templates_1.next()) {
            var name_1 = templates_1_1.value;
            var filepath = path_1.default.resolve(cwd, name_1.replace(/\.ejs$/, '').replace(/^_/, '.'));
            var content = ejs_1.default.render(fs_extra_1.default.readFileSync(path_1.default.resolve(templatePath, name_1), 'utf8'), __assign({ eslintIgnores: constants_1.ESLINT_IGNORE_PATTERN, stylelintExt: constants_1.STYLELINT_FILE_EXT, stylelintIgnores: constants_1.STYLELINT_IGNORE_PATTERN, markdownLintIgnores: constants_1.MARKDOWN_LINT_IGNORE_PATTERN }, data));
            if (/^_vscode/.test(name_1)) {
                content = mergeVSCodeConfig(filepath, content);
            }
            if (!content.trim())
                continue;
            fs_extra_1.default.outputFileSync(filepath, content, 'utf8');
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (templates_1_1 && !templates_1_1.done && (_a = templates_1.return)) _a.call(templates_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
