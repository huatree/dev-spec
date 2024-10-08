"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getESLintConfig = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = __importDefault(require("glob"));
var path_1 = __importDefault(require("path"));
var constants_1 = require("../../utils/constants");
var getESLintConfigType_1 = require("./getESLintConfigType");
function getESLintConfig(opts, pkg, config) {
    var cwd = opts.cwd, fix = opts.fix, ignore = opts.ignore;
    var lintConfig = {
        cwd: cwd,
        fix: fix,
        ignore: ignore,
        extensions: constants_1.ESLINT_FILE_EXT,
        errorOnUnmatchedPattern: false,
    };
    if (config.eslintOptions) {
        Object.assign(lintConfig, config.eslintOptions);
    }
    else {
        var lintConfigFiles = glob_1.default.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd: cwd });
        if (lintConfigFiles.length === 0 && !pkg.eslintConfig) {
            lintConfig.resolvePluginsRelativeTo = path_1.default.resolve(__dirname, '../../');
            lintConfig.useEslintrc = false;
            lintConfig.baseConfig = {
                extends: __spreadArray([
                    (0, getESLintConfigType_1.getESLintConfigType)(cwd, pkg)
                ], __read((config.enablePrettier ? ['prettier'] : [])), false),
            };
        }
        var lintIgnoreFile = path_1.default.resolve(cwd, '.eslintignore');
        if (!fs_extra_1.default.existsSync(lintIgnoreFile) && !pkg.eslintIgnore) {
            lintConfig.ignorePath = path_1.default.resolve(__dirname, '../config/_eslintignore.ejs');
        }
    }
    return lintConfig;
}
exports.getESLintConfig = getESLintConfig;
