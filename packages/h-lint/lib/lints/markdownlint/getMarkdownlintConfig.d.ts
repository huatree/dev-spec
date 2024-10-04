import markdownLint from 'markdownlint';
import type { Config, PKG, ScanOptions } from '../../types';
type LintOptions = markdownLint.Options & {
    fix?: boolean;
};
export declare function getMarkdownlintConfig(opts: ScanOptions, pkg: PKG, config: Config): LintOptions;
export {};
