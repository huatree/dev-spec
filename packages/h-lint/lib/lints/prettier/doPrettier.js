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
exports.doPrettier = void 0;
var fast_glob_1 = __importDefault(require("fast-glob"));
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var prettier_1 = __importDefault(require("prettier"));
var constants_1 = require("../../utils/constants");
function doPrettier(options) {
    return __awaiter(this, void 0, void 0, function () {
        var files, pattern;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = [];
                    if (!options.files) return [3, 1];
                    files = options.files.filter(function (name) { return constants_1.PRETTIER_FILE_EXT.includes((0, path_1.extname)(name)); });
                    return [3, 3];
                case 1:
                    pattern = (0, path_1.join)(options.include, "**/*.{".concat(constants_1.PRETTIER_FILE_EXT.map(function (t) { return t.replace(/^\./, ''); }).join(','), "}"));
                    return [4, (0, fast_glob_1.default)(pattern, {
                            cwd: options.cwd,
                            ignore: constants_1.PRETTIER_IGNORE_PATTERN,
                        })];
                case 2:
                    files = _a.sent();
                    _a.label = 3;
                case 3: return [4, Promise.all(files.map(formatFile))];
                case 4:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.doPrettier = doPrettier;
function formatFile(filepath) {
    return __awaiter(this, void 0, void 0, function () {
        var text, options, formatted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, fs_extra_1.readFile)(filepath, 'utf8')];
                case 1:
                    text = _a.sent();
                    return [4, prettier_1.default.resolveConfig(filepath)];
                case 2:
                    options = _a.sent();
                    formatted = prettier_1.default.format(text, __assign(__assign({}, options), { filepath: filepath }));
                    return [4, (0, fs_extra_1.writeFile)(filepath, formatted, 'utf8')];
                case 3:
                    _a.sent();
                    return [2];
            }
        });
    });
}
