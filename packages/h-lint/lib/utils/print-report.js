"use strict";
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
var chalk_1 = __importDefault(require("chalk"));
var is_docker_1 = __importDefault(require("is-docker"));
var strip_ansi_1 = __importDefault(require("strip-ansi"));
var terminal_link_1 = __importDefault(require("terminal-link"));
var text_table_1 = __importDefault(require("text-table"));
var constants_1 = require("./constants");
exports.default = (function (results, fix) {
    var e_1, _a;
    var output = '\n';
    var errorCount = 0;
    var warningCount = 0;
    var fixableErrorCount = 0;
    var fixableWarningCount = 0;
    var summaryColor = 'yellow';
    var transformMessage = function (_a) {
        var line = _a.line, column = _a.column, rule = _a.rule, url = _a.url, message = _a.message, errored = _a.errored;
        if (errored)
            summaryColor = 'red';
        var text = '';
        if (rule && url) {
            text = (0, terminal_link_1.default)(chalk_1.default.blue(rule), chalk_1.default.dim(" ".concat(url, " ")), { fallback: !(0, is_docker_1.default)() });
        }
        else if (rule) {
            text = chalk_1.default.blue(rule);
        }
        return [
            '',
            chalk_1.default.dim("".concat(line, ":").concat(column)),
            errored ? chalk_1.default.red('error') : chalk_1.default.yellow('warning'),
            message,
            text,
        ];
    };
    try {
        for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
            var result = results_1_1.value;
            if (result.messages.length === 0)
                continue;
            var messages = result.messages;
            errorCount += result.errorCount;
            warningCount += result.warningCount;
            fixableErrorCount += result.fixableErrorCount;
            fixableWarningCount += result.fixableWarningCount;
            output += "".concat(chalk_1.default.underline(result.filePath), "\n");
            output += "".concat((0, text_table_1.default)(messages.map(transformMessage), {
                align: ['.', 'r', 'l'],
                stringLength: function (str) { return (0, strip_ansi_1.default)(str).length; },
            }), "\n\n");
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var total = errorCount + warningCount;
    var pluralize = function (word, count) { return (count === 1 ? word : "".concat(word, "s")); };
    if (fix)
        output += chalk_1.default.green('代码规范问题自动修复完成，请通过 git diff 确认修复效果 :D\n');
    if (fix && total > 0) {
        output += chalk_1.default.green('ps. 以上显示的是无法被自动修复的问题，需要手动进行修复\n');
    }
    if (!fix && total > 0) {
        output += chalk_1.default[summaryColor].bold([
            "".concat(constants_1.UNICODE.failure, " "),
            total,
            pluralize(' problem', total),
            ' (',
            errorCount,
            pluralize(' error', errorCount),
            ', ',
            warningCount,
            pluralize(' warning', warningCount),
            ')\n',
        ].join(''));
        if (fixableErrorCount > 0 || fixableWarningCount > 0) {
            output += chalk_1.default[summaryColor].bold([
                '  ',
                fixableErrorCount,
                pluralize(' error', fixableErrorCount),
                ' and ',
                fixableWarningCount,
                pluralize(' warning', fixableWarningCount),
                " potentially fixable with the `".concat(constants_1.PKG_NAME, " fix`"),
            ].join(''));
        }
    }
    if (!fix && total === 0)
        output = chalk_1.default.green.bold("".concat(constants_1.UNICODE.success, " no problems"));
    console.log(chalk_1.default.reset(output));
});
