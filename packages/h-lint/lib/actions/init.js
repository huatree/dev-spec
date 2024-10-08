"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var path_1 = __importDefault(require("path"));
var conflict_resolve_1 = __importDefault(require("../utils/conflict-resolve"));
var constants_1 = require("../utils/constants");
var generate_template_1 = __importDefault(require("../utils/generate-template"));
var log_1 = __importDefault(require("../utils/log"));
var npm_type_1 = __importDefault(require("../utils/npm-type"));
var update_1 = __importDefault(require("./update"));
var step = 0;
var chooseEslintType = function () { return __awaiter(void 0, void 0, void 0, function () {
    var type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, inquirer_1.default.prompt({
                    type: 'list',
                    name: 'type',
                    message: "Step ".concat(++step, ". \u8BF7\u9009\u62E9\u9879\u76EE\u7684\u8BED\u8A00\uFF08JS/TS\uFF09\u548C\u6846\u67B6\uFF08React/Vue\uFF09\u7C7B\u578B\uFF1A"),
                    choices: constants_1.PROJECT_TYPES,
                })];
            case 1:
                type = (_a.sent()).type;
                return [2, type];
        }
    });
}); };
var chooseEnableStylelint = function (defaultValue) { return __awaiter(void 0, void 0, void 0, function () {
    var enable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, inquirer_1.default.prompt({
                    type: 'confirm',
                    name: 'enable',
                    message: "Step ".concat(++step, ". \u662F\u5426\u9700\u8981\u4F7F\u7528 stylelint\uFF08\u82E5\u6CA1\u6709\u6837\u5F0F\u6587\u4EF6\u5219\u4E0D\u9700\u8981\uFF09\uFF1A"),
                    default: defaultValue,
                })];
            case 1:
                enable = (_a.sent()).enable;
                return [2, enable];
        }
    });
}); };
var chooseEnableMarkdownLint = function () { return __awaiter(void 0, void 0, void 0, function () {
    var enable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, inquirer_1.default.prompt({
                    type: 'confirm',
                    name: 'enable',
                    message: "Step ".concat(++step, ". \u662F\u5426\u9700\u8981\u4F7F\u7528 markdownlint\uFF08\u82E5\u6CA1\u6709 Markdown \u6587\u4EF6\u5219\u4E0D\u9700\u8981\uFF09\uFF1A"),
                    default: true,
                })];
            case 1:
                enable = (_a.sent()).enable;
                return [2, enable];
        }
    });
}); };
var chooseEnablePrettier = function () { return __awaiter(void 0, void 0, void 0, function () {
    var enable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, inquirer_1.default.prompt({
                    type: 'confirm',
                    name: 'enable',
                    message: "Step ".concat(++step, ". \u662F\u5426\u9700\u8981\u4F7F\u7528 Prettier \u683C\u5F0F\u5316\u4EE3\u7801\uFF1A"),
                    default: true,
                })];
            case 1:
                enable = (_a.sent()).enable;
                return [2, enable];
        }
    });
}); };
exports.default = (function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var cwd, isTest, checkVersionUpdate, disableNpmInstall, config, pkgPath, pkg, _a, _b, _c, _d, npm, logs;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                cwd = options.cwd || process.cwd();
                isTest = process.env.NODE_ENV === 'test';
                checkVersionUpdate = options.checkVersionUpdate || false;
                disableNpmInstall = options.disableNpmInstall || false;
                config = {};
                pkgPath = path_1.default.resolve(cwd, 'package.json');
                pkg = fs_extra_1.default.readJSONSync(pkgPath);
                if (!(!isTest && checkVersionUpdate)) return [3, 2];
                return [4, (0, update_1.default)(false)];
            case 1:
                _e.sent();
                _e.label = 2;
            case 2:
                if (typeof options.enableESLint === 'boolean') {
                    config.enableESLint = options.enableESLint;
                }
                else {
                    config.enableESLint = true;
                }
                if (!(options.eslintType && constants_1.PROJECT_TYPES.find(function (choice) { return choice.value === options.eslintType; }))) return [3, 3];
                config.eslintType = options.eslintType;
                return [3, 5];
            case 3:
                _a = config;
                return [4, chooseEslintType()];
            case 4:
                _a.eslintType = _e.sent();
                _e.label = 5;
            case 5:
                if (!(typeof options.enableStylelint === 'boolean')) return [3, 6];
                config.enableStylelint = options.enableStylelint;
                return [3, 8];
            case 6:
                _b = config;
                return [4, chooseEnableStylelint(!/node/.test(config.eslintType))];
            case 7:
                _b.enableStylelint = _e.sent();
                _e.label = 8;
            case 8:
                if (!(typeof options.enableMarkdownlint === 'boolean')) return [3, 9];
                config.enableMarkdownlint = options.enableMarkdownlint;
                return [3, 11];
            case 9:
                _c = config;
                return [4, chooseEnableMarkdownLint()];
            case 10:
                _c.enableMarkdownlint = _e.sent();
                _e.label = 11;
            case 11:
                if (!(typeof options.enablePrettier === 'boolean')) return [3, 12];
                config.enablePrettier = options.enablePrettier;
                return [3, 14];
            case 12:
                _d = config;
                return [4, chooseEnablePrettier()];
            case 13:
                _d.enablePrettier = _e.sent();
                _e.label = 14;
            case 14:
                if (!!isTest) return [3, 17];
                log_1.default.info("Step ".concat(++step, ". \u68C0\u67E5\u5E76\u5904\u7406\u9879\u76EE\u4E2D\u53EF\u80FD\u5B58\u5728\u7684\u4F9D\u8D56\u548C\u914D\u7F6E\u51B2\u7A81"));
                return [4, (0, conflict_resolve_1.default)(cwd, options.rewriteConfig)];
            case 15:
                pkg = _e.sent();
                log_1.default.success("Step ".concat(step, ". \u5DF2\u5B8C\u6210\u9879\u76EE\u4F9D\u8D56\u548C\u914D\u7F6E\u51B2\u7A81\u68C0\u67E5\u5904\u7406 :D"));
                if (!!disableNpmInstall) return [3, 17];
                log_1.default.info("Step ".concat(++step, ". \u5B89\u88C5\u4F9D\u8D56"));
                return [4, npm_type_1.default];
            case 16:
                npm = _e.sent();
                cross_spawn_1.default.sync(npm, ['i', '-D', constants_1.PKG_NAME], { stdio: 'inherit', cwd: cwd });
                log_1.default.success("Step ".concat(step, ". \u5B89\u88C5\u4F9D\u8D56\u6210\u529F :D"));
                _e.label = 17;
            case 17:
                pkg = fs_extra_1.default.readJSONSync(pkgPath);
                if (!pkg.scripts) {
                    pkg.scripts = {};
                }
                if (!pkg.scripts["".concat(constants_1.PKG_NAME, "-scan")]) {
                    pkg.scripts["".concat(constants_1.PKG_NAME, "-scan")] = "".concat(constants_1.PKG_NAME, " scan");
                }
                if (!pkg.scripts["".concat(constants_1.PKG_NAME, "-fix")]) {
                    pkg.scripts["".concat(constants_1.PKG_NAME, "-fix")] = "".concat(constants_1.PKG_NAME, " fix");
                }
                log_1.default.info("Step ".concat(++step, ". \u914D\u7F6E git commit \u5361\u70B9"));
                if (!pkg.husky)
                    pkg.husky = {};
                if (!pkg.husky.hooks)
                    pkg.husky.hooks = {};
                pkg.husky.hooks['pre-commit'] = "".concat(constants_1.PKG_NAME, " commit-file-scan");
                pkg.husky.hooks['commit-msg'] = "".concat(constants_1.PKG_NAME, " commit-msg-scan");
                fs_extra_1.default.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
                log_1.default.success("Step ".concat(step, ". \u914D\u7F6E git commit \u5361\u70B9\u6210\u529F :D"));
                log_1.default.info("Step ".concat(++step, ". \u5199\u5165\u914D\u7F6E\u6587\u4EF6"));
                (0, generate_template_1.default)(cwd, config);
                log_1.default.success("Step ".concat(step, ". \u5199\u5165\u914D\u7F6E\u6587\u4EF6\u6210\u529F :D"));
                logs = ["".concat(constants_1.PKG_NAME, " \u521D\u59CB\u5316\u5B8C\u6210 :D")].join('\r\n');
                log_1.default.success(logs);
                return [2];
        }
    });
}); });
