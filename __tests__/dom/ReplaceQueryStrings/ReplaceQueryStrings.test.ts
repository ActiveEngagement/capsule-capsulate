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

// The realistic MSO button shape: the same URL appears on both the hidden <a>
// and the <v:roundrect>, alongside a regular anchor outside the comment.
function msoButton(url: string) {
    return `<div><a href="${url}" class="es-button">GET YOURS</a><!--[if mso]><a href="${url}" target="_blank" hidden><v:roundrect href="${url}"><![endif]--></div>`;
}

describe('replacements inside mso comments', () => {
    test('adds (upserts) a param once per href, including the regular anchor', async() => {
        const result = await manipulate(msoButton('https://google.com/?a=1'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'utm_term', to: '5' }
                ]
            })
        ]);

        expect(result).toBe(msoButton('https://google.com/?a=1&utm_term=5').replace('?a=1&utm_term=5"', '?a=1&amp;utm_term=5"'));
        expect(result.match(/utm_term=5/g)).toHaveLength(3);
        expect(result).not.toContain('utm_term=5&utm_term=5');
    });

    test('adds a param to an mso URL that has no query string', async() => {
        const result = await manipulate(msoButton('https://google.com/'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'utm_term', to: '5' }
                ]
            })
        ]);

        expect(result).toBe(msoButton('https://google.com/?utm_term=5'));
    });

    test('edits an existing param (keyed edit) on every duplicated mso href', async() => {
        const result = await manipulate(msoButton('https://google.com/?source_code=xxxxx&a=1'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'source_code', from: 'xxxxx', to: 'yyyyy' }
                ]
            })
        ]);

        expect(result.match(/source_code=yyyyy/g)).toHaveLength(3);
        expect(result).not.toContain('xxxxx');
        expect(result).toContain('<v:roundrect href="https://google.com/?source_code=yyyyy&a=1">');
    });

    test('edits by value across keys (no key) inside mso comments', async() => {
        const result = await manipulate(msoButton('https://google.com/?source_code=xxxxx&segment=xxxxx'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { from: 'xxxxx', to: 'yyyyy' }
                ]
            })
        ]);

        expect(result).toContain('<v:roundrect href="https://google.com/?source_code=yyyyy&segment=yyyyy">');
        expect(result).not.toContain('xxxxx');
    });

    test('deletes a param from every duplicated mso href', async() => {
        const result = await manipulate(msoButton('https://google.com/?a=1&utm_term=5'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'utm_term', delete: true }
                ]
            })
        ]);

        expect(result).not.toContain('utm_term');
        expect(result).toContain('<v:roundrect href="https://google.com/?a=1">');
    });

    test('deleting the only param strips the query string entirely', async() => {
        const result = await manipulate(msoButton('https://google.com/?utm_term=5'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'utm_term', delete: true }
                ]
            })
        ]);

        expect(result).toBe(msoButton('https://google.com/'));
    });

    test('applies add, edit, and delete together in one pass', async() => {
        const result = await manipulate(msoButton('https://google.com/?source_code=xxxxx&old=1'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'source_code', from: 'xxxxx', to: 'yyyyy' },
                    { key: 'old', delete: true },
                    { key: 'utm_term', to: '5' }
                ]
            })
        ]);

        expect(result).toContain('<v:roundrect href="https://google.com/?source_code=yyyyy&utm_term=5">');
        expect(result.match(/utm_term=5/g)).toHaveLength(3);
        expect(result).not.toContain('old=1');
        expect(result).not.toContain('xxxxx');
    });

    test('handles distinct URLs in one mso comment where one is a prefix of the other', async() => {
        const html = '<div><!--[if mso]><a href="https://google.com/?a=1" hidden><v:roundrect href="https://google.com/?a=1&b=2"><![endif]--></div>';

        const result = await manipulate(html, [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'utm_term', to: '5' }
                ]
            })
        ]);

        expect(result).toContain('<a href="https://google.com/?a=1&utm_term=5" hidden>');
        expect(result).toContain('<v:roundrect href="https://google.com/?a=1&b=2&utm_term=5">');
        expect(result).not.toContain('utm_term=5&utm_term=5');
    });

    test('handles URLs containing regex metacharacters', async() => {
        // `${Gears.foo}` and `(a)` must be treated literally when the URL is
        // located inside the comment text, not as regex syntax.
        const result = await manipulate(msoButton('https://google.com/?code=${Gears.foo}&q=(a)'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'code', from: '${Gears.foo}', to: '${Gears.bar}' },
                    { key: 'utm_term', to: '5' }
                ]
            })
        ]);

        expect(result).toContain('<v:roundrect href="https://google.com/?code=${Gears.bar}&q=(a)&utm_term=5">');
        expect(result.match(/utm_term=5/g)).toHaveLength(3);
        expect(result).not.toContain('Gears.foo');
    });

    test('processes multiple mso comments within the same element', async() => {
        const html = '<div>'
            + '<!--[if mso]><a href="https://google.com/?a=1" hidden><v:roundrect href="https://google.com/?a=1"><![endif]-->'
            + '<!--[if mso]><a href="https://google.com/?b=2" hidden><v:roundrect href="https://google.com/?b=2"><![endif]-->'
            + '</div>';

        const result = await manipulate(html, [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'utm_term', to: '5' }
                ]
            })
        ]);

        expect(result.match(/\?a=1&utm_term=5/g)).toHaveLength(2);
        expect(result.match(/\?b=2&utm_term=5/g)).toHaveLength(2);
        expect(result).not.toContain('utm_term=5&utm_term=5');
    });

    test('leaves mailto URLs inside mso comments untouched', async() => {
        const html = '<div><!--[if mso]><a href="mailto:foo@bar.com" hidden><v:roundrect href="https://google.com/?a=1"><![endif]--></div>';

        const result = await manipulate(html, [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'utm_term', to: '5' }
                ]
            })
        ]);

        expect(result).toContain('href="mailto:foo@bar.com"');
        expect(result).not.toContain('mailto:foo@bar.com?');
        expect(result).toContain('<v:roundrect href="https://google.com/?a=1&utm_term=5">');
    });

    test('encodes spaces in upserted values as %20', async() => {
        const result = await manipulate(msoButton('https://google.com/?a=1'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'utm_term', to: 'freedom shirt' }
                ]
            })
        ]);

        expect(result).toContain('<v:roundrect href="https://google.com/?a=1&utm_term=freedom%20shirt">');
        expect(result).not.toContain('freedom shirt');
    });

    test('preserves param order and untouched params when editing', async() => {
        const result = await manipulate(msoButton('https://google.com/?first=1&source_code=xxxxx&last=9'), [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'source_code', from: 'xxxxx', to: 'yyyyy' }
                ]
            })
        ]);

        expect(result).toContain('<v:roundrect href="https://google.com/?first=1&source_code=yyyyy&last=9">');
    });

    test('leaves mso URLs untouched when no replacement matches', async() => {
        const html = msoButton('https://google.com/?a=1');

        const result = await manipulate(html, [
            new ReplaceQueryStrings({
                sourceCodes: [
                    { key: 'missing', from: 'nope', to: 'never' },
                    { key: 'missing', delete: true }
                ]
            })
        ]);

        expect(result).toBe(html);
    });
});

test('upserts a param exactly once on each duplicated URL inside an mso comment', async() => {
    // MSO buttons carry the same URL twice: on the hidden <a> and the <v:roundrect>.
    const html = '<div><!--[if mso]><a href="https://google.com/?a=1" target="_blank" hidden><v:roundrect href="https://google.com/?a=1"><![endif]--></div>';

    const result = await manipulate(html, [
        new ReplaceQueryStrings({
            sourceCodes: [
                { key: 'utm_term', to: '5' }
            ]
        })
    ]);

    expect(result).toBe('<div><!--[if mso]><a href="https://google.com/?a=1&utm_term=5" target="_blank" hidden><v:roundrect href="https://google.com/?a=1&utm_term=5"><![endif]--></div>');
});