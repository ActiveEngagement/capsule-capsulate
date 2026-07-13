import { CheerioAPI } from 'cheerio';
import juice from 'juice';
type Options = juice.Options;
import { BasePlugin } from '../Plugin';
import { cheerio, encodeFreemarkerTags } from '../helpers';

export type InlineCssOptions = Options;

// PostCSS's CssSyntaxError carries a `reason` (e.g. "Missed semicolon") plus the
// offending line/column. Pull those into a short, human-readable string; fall
// back to the raw message for any other error shape.
function cssErrorDetail(e: unknown): string {
    if(e && typeof e === 'object') {
        const error = e as { reason?: string, line?: number, column?: number, message?: string };

        if(error.reason) {
            const location = error.line != null && error.column != null
                ? ` (line ${error.line}, column ${error.column})`
                : '';

            return `${error.reason}${location}.`;
        }

        if(error.message) {
            return error.message;
        }
    }

    return '';
}

export class InlineCss extends BasePlugin<InlineCssOptions> {

    defaultOptions(): InlineCssOptions {
        return {
            applyStyleTags: true,
            removeStyleTags: true,
        };
    }

    async process($: CheerioAPI) {
        return await this.inlineCss($);
    }

    async postprocess($: CheerioAPI) {
        return await this.inlineCss($);
    }

    protected async inlineCss($: CheerioAPI) {
        try {
            return cheerio(juice(encodeFreemarkerTags($.html()), this.options));
        }
        catch (e) {
            // juice inlines styles with PostCSS, which throws a CssSyntaxError
            // (with a human-readable `reason` and source location) on malformed
            // CSS — most often a bad inline `style` attribute or `<style>` block.
            // Surface that detail so the failure is actionable instead of the
            // opaque "invalid CSS" it used to report. `capsule-lint`'s
            // `valid-style-attrs` rule catches these before we ever reach here;
            // this is the last-resort message when linting was skipped.
            const detail = cssErrorDetail(e);

            const error = new Error(
                'There is invalid CSS or <link> tags in this document.'
                + (detail ? ` ${detail}` : '')
            );
            // Preserve the original error for callers that inspect the chain,
            // without relying on the ES2022 `cause` constructor option (this
            // package targets an older lib).
            (error as Error & { cause?: unknown }).cause = e;

            throw error;
        }
    }

};