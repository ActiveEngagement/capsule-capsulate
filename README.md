# capsule-capsulate

HTML document converter and processor for email templates. Transforms raw HTML through a composable plugin pipeline — inlining CSS, replacing query strings, fixing email client quirks, rendering templates, and more.

## Installation

```bash
npm install capsule-capsulate
# or
pnpm add capsule-capsulate
# or
yarn add capsule-capsulate
```

**Peer dependencies:**

```bash
npm install capsule-lint vue
```

## Quick Start

```typescript
import { capsulate } from 'capsule-capsulate';

const html = await capsulate('<div id="contents">Hello world</div>', {
  template: {
    src: '<html><body>{{ contents }}</body></html>'
  }
});
```

## API

### `capsulate(src, opts?)`

Main function. Runs the full default plugin pipeline against an HTML string.

```typescript
capsulate(src: string, opts?: Partial<CapsulateOptions> | (() => Partial<CapsulateOptions>)): Promise<string>
```

Options can be a plain object or a factory function (useful when options depend on runtime state).

### `only(options)`

Create an options object that runs **only** the specified plugins — all others are disabled.

```typescript
import { capsulate, only } from 'capsule-capsulate';

// Run only the HTML minifier
const result = await capsulate(html, only({ htmlMinifier: {} }));
```

### `defaultOptions(options?)`

Merge partial options with sensible defaults. Useful for building option objects programmatically.

### `run(src, plugins)`

Execute a custom plugin sequence directly.

```typescript
import { run, ManipulateDom, DecodeHrefAmpersands } from 'capsule-capsulate';
import { ReplaceQueryStrings } from 'capsule-capsulate';

const result = await run(html, [
  new ManipulateDom([
    new ReplaceQueryStrings({ sourceCodes: [{ key: 'utm', to: 'newsletter' }] })
  ]),
  new DecodeHrefAmpersands()
]);
```

### `manipulate(src, plugins)`

Convenience wrapper — run only DOM manipulation plugins.

---

## Configuration

All options are optional. Set a key to `false` to disable that plugin entirely.

```typescript
type CapsulateOptions = {
  extractTarget?: ExtractTargetOptions | false;
  htmlMinifier?: HtmlMinifierOptions | false;
  preserveHeadTag?: false;
  template?: TemplateOptions | false;
  dom?: DomOptions | false;
  preserveBodyAttributes?: false;
  previewText?: PreviewTextOptions | false;
  decodeHrefAmpersands?: false;
  courier?: CourierOptions | false;
  inlineCss?: InlineCssOptions | false;   // runs last
};
```

### Template

Wrap the document in a Nunjucks template. The processed content is available as `{{ contents }}`.

```typescript
template: {
  src: '<html><body>{{ contents }}</body></html>',
  data: { title: 'My Email' },          // variables for the template
  nunjucks: { autoescape: false }        // nunjucks configure options
}
```

### HTML Minifier

Minifies with [html-crush](https://codsen.com/os/html-crush/).

```typescript
htmlMinifier: {
  lineLengthLimit: Infinity,
  removeIndentations: true,
  removeLineBreaks: true,
  removeHTMLComments: false,
  removeCSSComments: false,
  breakToTheLeftOf: [],
  mindTheInlineTags: []
}
```

### Inline CSS

Inlines `<style>` rules into element `style` attributes using [juice](https://github.com/Automattic/juice). This plugin always runs last.

```typescript
inlineCss: {
  // juice options — see https://github.com/Automattic/juice#options
  removeStyleTags: true
}
```

### Preview Text

Manage email preview text snippets.

```typescript
previewText: {
  html: '<span style="display:none">Preview text here</span>'
  // or a function: ($ : CheerioAPI) => PreviewTextHtml
}
```

### Extract Target

Extract a specific DOM element and discard the rest.

```typescript
extractTarget: {
  selector: '#contents'
}
```

### Courier

Attach a request ID attribute to trackable elements.

```typescript
courier: {
  requestId: 'abc-123'
}
```

### DOM Plugins

Fine-grained control over individual DOM manipulation plugins. Set any to `false` to disable.

```typescript
dom: {
  decodeEntitiesInStyleAttributes: {},
  fixHrefQueryStrings: {},
  fixBackgroundColor: {},
  fixFontColor: {},
  fixMsoWrapper: {},
  fixResponsiveImages: { /* FixResponsiveImagesOptions */ },
  fixTableAlignment: {},
  removeDisplayNone: {},
  removeScriptTags: {},
  replaceQueryStrings: { sourceCodes: [...] },
  replaceNonAsciiChars: {}
}
```

---

## Query String Helpers

### `replaceQueryString(href, replacements)`

Replace, upsert, or delete query parameters in a single URL.

```typescript
import { replaceQueryString } from 'capsule-capsulate';
```

**Replace an existing value:**

```typescript
replaceQueryString('https://example.com/?src=OLD', [
  { key: 'src', from: 'OLD', to: 'NEW' }
]);
// → 'https://example.com/?src=NEW'
```

**Replace a value across all keys (no `key` specified):**

```typescript
replaceQueryString('https://example.com/?a=foo&b=foo', [
  { from: 'foo', to: 'bar' }
]);
// → 'https://example.com/?a=bar&b=bar'
```

**Upsert — set a key regardless of whether it exists (no `from`):**

```typescript
replaceQueryString('https://example.com/', [
  { key: 'utm_source', to: 'newsletter' }
]);
// → 'https://example.com/?utm_source=newsletter'
```

**Delete — remove a key entirely:**

```typescript
replaceQueryString('https://example.com/?a=1&b=2', [
  { key: 'a', delete: true }
]);
// → 'https://example.com/?b=2'
```

`mailto:`, `tel:`, `#anchor`, and `javascript:` URLs are left untouched.

### `extractSourceCodes(html)`

Extract all query parameter values and their occurrence counts from every URL in an HTML document.

```typescript
import { extractSourceCodes } from 'capsule-capsulate';

const codes = extractSourceCodes(html);
// → { source_code: { 'ABC123': 3, 'XYZ789': 2 }, utm_campaign: { 'spring': 5 } }
```

### `extractUrls(html)`

Extract every valid URL found in `href` and `src` attributes.

```typescript
import { extractUrls } from 'capsule-capsulate';

const urls = extractUrls(html);
// → ['https://example.com/', ...]
```

### `useReplaceQueryStrings(src)` (Vue 3 composable)

Reactive composable for building interactive query-string editors.

```typescript
import { useReplaceQueryStrings } from 'capsule-capsulate';

const { sourceCodes, newSourceCodes, model, replace } = useReplaceQueryStrings(html);

// sourceCodes — reactive array of [key, replacements[]] pairs extracted from the HTML
// newSourceCodes — reactive array of upsert replacements to add to every link
// model — the current processed HTML (reactive)
// replace() — apply all replacements and return the updated HTML string
```

---

## Freemarker Helpers

If your HTML contains Freemarker tags (`<#if>`, `</#if>`, `${...}`, etc.), encode them before parsing to prevent conflicts with HTML parsers, then decode afterward.

```typescript
import { encodeFreemarkerTags, decodeFreemarkerTags } from 'capsule-capsulate';

const safe = encodeFreemarkerTags('<#if user.active>Hello</#if>');
// safe to pass through HTML parsers

const restored = decodeFreemarkerTags(safe);
// → '<#if user.active>Hello</#if>'
```

---

## Writing Custom Plugins

Extend `BasePlugin` for document-level transformations or `BaseDomPlugin` for per-element manipulation.

### Document Plugin

```typescript
import { BasePlugin } from 'capsule-capsulate';

class StripComments extends BasePlugin<{}> {
  async transform(src: string): Promise<string> {
    return src.replace(/<!--[\s\S]*?-->/g, '');
  }
}
```

Plugin lifecycle (each method is optional):

| Phase | Method | Description |
|---|---|---|
| 1 | `initialize()` | Set up state before processing |
| 2 | `preprocess(src)` | Transform the raw string before DOM parsing |
| 3 | `process($)` | Manipulate the Cheerio DOM |
| 4 | `postprocess(src)` | Transform the serialized HTML string |
| 5 | `transform(src)` | Final string transformation |

### DOM Plugin

```typescript
import { BaseDomPlugin } from 'capsule-capsulate';

class AddDataAttr extends BaseDomPlugin<{}> {
  async process($: CheerioAPI) {
    $('a').each((_, el) => {
      $(el).attr('data-tracked', 'true');
    });
  }
}
```

Use `ManipulateDom` to wrap DOM plugins for use in `run()`:

```typescript
import { run, ManipulateDom } from 'capsule-capsulate';

await run(html, [new ManipulateDom([new AddDataAttr({})])]);
```

---

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Type-check and build
pnpm run build

# Watch mode
pnpm run dev
```

**Output formats:**

| Format | Path |
|---|---|
| ESM | `dist/capsule-capsulate.js` |
| UMD | `dist/capsule-capsulate.umd.cjs` |
| Types | `dist/index.d.ts` |

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
