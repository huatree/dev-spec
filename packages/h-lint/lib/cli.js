#!/usr/bin/env node
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
var child_process_1 = require("child_process");
var commander_1 = require("commander");
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = __importDefault(require("glob"));
var ora_1 = __importDefault(require("ora"));
var path_1 = __importDefault(require("path"));
var init_1 = __importDefault(require("./actions/init"));
var scan_1 = __importDefault(require("./actions/scan"));
var update_1 = __importDefault(require("./actions/update"));
var constants_1 = require("./utils/constants");
var generate_template_1 = __importDefault(require("./utils/generate-template"));
var git_1 = require("./utils/git");
var log_1 = __importDefault(require("./utils/log"));
var npm_type_1 = __importDefault(require("./utils/npm-type"));
var print_report_1 = __importDefault(require("./utils/print-report"));
var cwd = process.cwd();
var installDepsIfThereNo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var lintConfigFiles, nodeModulesPath, npm;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lintConfigFiles = [].concat(glob_1.default.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd: cwd }), glob_1.default.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd: cwd }), glob_1.default.sync('.markdownlint(.@(yaml|yml|json))', { cwd: cwd }));
                nodeModulesPath = path_1.default.resolve(cwd, 'node_modules');
                if (!(!fs_extra_1.default.existsSync(nodeModulesPath) && lintConfigFiles.length > 0)) return [3, 2];
                return [4, npm_type_1.default];
            case 1:
                npm = _a.sent();
                log_1.default.info("\u4F7F\u7528\u9879\u76EE Lint \u914D\u7F6E\uFF0C\u68C0\u6D4B\u5230\u9879\u76EE\u672A\u5B89\u88C5\u4F9D\u8D56\uFF0C\u5C06\u8FDB\u884C\u5B89\u88C5\uFF08\u6267\u884C ".concat(npm, " install\uFF09"));
                (0, child_process_1.execSync)("cd ".concat(cwd, " && ").concat(npm, " i"));
                _a.label = 2;
            case 2: return [2];
        }
    });
}); };
commander_1.program
    .version(constants_1.PKG_VERSION)
    .description("".concat(constants_1.PKG_NAME, " \u662F \u524D\u7AEF\u5F00\u53D1\u7F16\u7801\u89C4\u8303\u5DE5\u7A0B\u5316 \u7684\u914D\u5957 Lint \u5DE5\u5177\uFF0C\u63D0\u4F9B\u7B80\u5355\u7684 CLI \u548C Node.js API\uFF0C\u8BA9\u9879\u76EE\u80FD\u591F\u4E00\u952E\u63A5\u5165\u3001\u4E00\u952E\u626B\u63CF\u3001\u4E00\u952E\u4FEE\u590D\u3001\u4E00\u952E\u5347\u7EA7\uFF0C\u5E76\u4E3A\u9879\u76EE\u914D\u7F6E git commit \u5361\u70B9\uFF0C\u964D\u4F4E\u9879\u76EE\u5B9E\u65BD\u89C4\u8303\u7684\u6210\u672C"));
commander_1.program
    .command('init')
    .description('一键接入：为项目初始化规范工具和配置，可以根据项目类型和需求进行定制')
    .option('--vscode', '写入.vscode/setting.json配置')
    .action(function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var configPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!cmd.vscode) return [3, 1];
                configPath = path_1.default.resolve(cwd, "".concat(constants_1.PKG_NAME, ".config.js"));
                (0, generate_template_1.default)(cwd, require(configPath), true);
                return [3, 3];
            case 1: return [4, (0, init_1.default)({
                    cwd: cwd,
                    checkVersionUpdate: true,
                })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2];
        }
    });
}); });
commander_1.program
    .command('scan')
    .description('一键扫描：对项目进行代码规范问题扫描')
    .option('-q, --quiet', '仅报告错误信息 - 默认: false')
    .option('-o, --output-report', '输出扫描出的规范问题日志')
    .option('-i, --include <dirpath>', '指定要进行规范扫描的目录')
    .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
    .action(function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var checking, _a, results, errorCount, warningCount, runErrors, type;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4, installDepsIfThereNo()];
            case 1:
                _b.sent();
                checking = (0, ora_1.default)();
                checking.start("\u6267\u884C ".concat(constants_1.PKG_NAME, " \u4EE3\u7801\u68C0\u67E5"));
                return [4, (0, scan_1.default)({
                        cwd: cwd,
                        fix: false,
                        include: cmd.include || cwd,
                        quiet: Boolean(cmd.quiet),
                        outputReport: Boolean(cmd.outputReport),
                        ignore: cmd.ignore,
                    })];
            case 2:
                _a = _b.sent(), results = _a.results, errorCount = _a.errorCount, warningCount = _a.warningCount, runErrors = _a.runErrors;
                type = 'succeed';
                if (runErrors.length > 0 || errorCount > 0) {
                    type = 'fail';
                }
                else if (warningCount > 0) {
                    type = 'warn';
                }
                checking[type]();
                if (results.length > 0)
                    (0, print_report_1.default)(results, false);
                runErrors.forEach(function (e) { return console.log(e); });
                return [2];
        }
    });
}); });
commander_1.program
    .command('commit-msg-scan')
    .description('commit message 检查: git commit 时对 commit message 进行检查')
    .action(function () {
    var result = cross_spawn_1.default.sync('commitlint', ['-E', 'HUSKY_GIT_PARAMS'], { stdio: 'inherit' });
    if (result.status !== 0) {
        process.exit(result.status);
    }
});
commander_1.program
    .command('commit-file-scan')
    .description('代码提交检查: git commit 时对提交代码进行规范问题扫描')
    .option('-s, --strict', '严格模式，对 warn 和 error 问题都卡口，默认仅对 error 问题卡口')
    .action(function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var files, checking, _a, results, errorCount, warningCount, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4, installDepsIfThereNo()];
            case 1:
                _d.sent();
                return [4, (0, git_1.getAmendFiles)()];
            case 2:
                files = _d.sent();
                if (files)
                    log_1.default.warn("[".concat(constants_1.PKG_NAME, "] changes not staged for commit: \n").concat(files, "\n"));
                checking = (0, ora_1.default)();
                checking.start("\u6267\u884C ".concat(constants_1.PKG_NAME, " \u4EE3\u7801\u63D0\u4EA4\u68C0\u67E5"));
                _b = scan_1.default;
                _c = {
                    cwd: cwd,
                    include: cwd,
                    quiet: !cmd.strict
                };
                return [4, (0, git_1.getCommitFiles)()];
            case 3: return [4, _b.apply(void 0, [(_c.files = _d.sent(),
                        _c)])];
            case 4:
                _a = _d.sent(), results = _a.results, errorCount = _a.errorCount, warningCount = _a.warningCount;
                if (errorCount > 0 || (cmd.strict && warningCount > 0)) {
                    checking.fail();
                    (0, print_report_1.default)(results, false);
                    process.exitCode = 1;
                }
                else {
                    checking.succeed();
                }
                return [2];
        }
    });
}); });
commander_1.program
    .command('fix')
    .description('一键修复：自动修复项目的代码规范扫描问题')
    .option('-i, --include <dirpath>', '指定要进行修复扫描的目录')
    .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
    .action(function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var checking, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, installDepsIfThereNo()];
            case 1:
                _a.sent();
                checking = (0, ora_1.default)();
                checking.start("\u6267\u884C ".concat(constants_1.PKG_NAME, " \u4EE3\u7801\u4FEE\u590D"));
                return [4, (0, scan_1.default)({
                        cwd: cwd,
                        fix: true,
                        include: cmd.include || cwd,
                        ignore: cmd.ignore,
                    })];
            case 2:
                results = (_a.sent()).results;
                checking.succeed();
                if (results.length > 0)
                    (0, print_report_1.default)(results, true);
                return [2];
        }
    });
}); });
commander_1.program
    .command('update')
    .description("\u66F4\u65B0 ".concat(constants_1.PKG_NAME, " \u81F3\u6700\u65B0\u7248\u672C"))
    .action(function () { return (0, update_1.default)(true); });
commander_1.program.parse(process.argv);
