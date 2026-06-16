import fs from 'node:fs';
import path from 'node:path';
import { ReplaceQueryStrings } from '../../../src/dom/ReplaceQueryStrings';
import { manipulate } from '../../../src/helpers';

test('wrapping mso on correct divs', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ReplaceQueryStrings/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ReplaceQueryStrings/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [
        new ReplaceQueryStrings({
            sourceCodes: [
                { key: 'a', from: '1', to: '2' },
                { key: 'c', from: 'test', to: 'with space' },
                { key: 'utm_test', from: '${Gears.foo}', to: '${Gears.bar}' },
                { key: 'source_code', from: 'xxxxx', to: 'xxxxx-updated' },
                { key: 'source_code', from: 'yyyyy', to: 'yyyyy-updated' },
                { key: 'source_code', from: 'zzzzz', to: 'zzzzz-updated' },
                { key: 'segmentCode', from: 'xxxxx', to: 'xxxxx-updated' }
            ]
        })
    ])).toBe(expected);
});

test('upserts new params across anchors and mso comments while editing existing ones', async() => {
    const html = [
        '<div>',
        '<a href="https://google.com/?source_code=xxxxx">has code</a>',
        '<a href="https://google.com/">no params</a>',
        '<a href="mailto:foo@bar.com">email</a>',
        '<!--[if mso]><v:roundrect href="https://google.com/?source_code=xxxxx"><![endif]-->',
        '</div>'
    ].join('');

    const result = await manipulate(html, [
        new ReplaceQueryStrings({
            sourceCodes: [
                // edit an existing code (has `from`)
                { key: 'source_code', from: 'xxxxx', to: 'xxxxx-updated' },
                // upsert a new param (no `from`)
                { key: 'utm', to: 'spring' }
            ]
        })
    ]);

    // Anchor with an existing param: edited AND gains the upserted param.
    expect(result).toContain('href="https://google.com/?source_code=xxxxx-updated&amp;utm=spring"');

    // Anchor with no query string: gains only the upsert, never the keyed edit.
    expect(result).toContain('href="https://google.com/?utm=spring"');
    expect(result).not.toContain('source_code=xxxxx-updated&amp;utm=spring">no params');

    // mailto is left untouched.
    expect(result).toContain('href="mailto:foo@bar.com"');
    expect(result).not.toContain('mailto:foo@bar.com?');

    // MSO conditional-comment URL is upserted too (raw `&`, since it is comment text).
    expect(result).toContain('href="https://google.com/?source_code=xxxxx-updated&utm=spring"');
});