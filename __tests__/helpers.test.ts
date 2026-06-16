import fs from 'node:fs';
import path from 'node:path';
import { decodeFreemarkerTags, encodeFreemarkerTags, extractSourceCodes, replaceQueryString } from '../src/helpers';

describe('extractSourceCodes()', () => {
    test('extracting source codes.', async() => {
        const html = fs.readFileSync(
            path.resolve('__tests__/dom/ReplaceQueryStrings/error.html'), 'utf8'
        );

        expect(extractSourceCodes(html)).toEqual({
            'source_code': {
                'ignore': 1,
                'xxxxx': 3,
                'yyyyy': 3,
                'zzzzz': 3,
            },
            'segmentCode':  {
                'xxxxx': 1,
            },
            'a': {
                '1': 1
            },
            'c': {
                'test': 1
            },
            'utm_test':  {
                '${Gears.foo}': 2,
            }
        });
    });
});

describe('replaceQueryStrings()', function() {
    test('does not replace anything on a query without query strings', async() => {
        expect(replaceQueryString('https://google.com/', [{
            key: 'a',
            from: '1',
            to: '2'
        }])).toBe('https://google.com/');
    });

    test('replaces query strings with a key, from, and to using', async() => {
        expect(replaceQueryString('https://google.com/?a=1', [{
            key: 'a',
            from: '1',
            to: '2'
        }])).toBe('https://google.com/?a=2');
    });

    test('replaces query strings with a from and to', async() => {
        expect(replaceQueryString('https://google.com/?a=1&b=1', [{
            from: '1',
            to: '2'
        }])).toBe('https://google.com/?a=2&b=2');
    });

    test('replaces query strings with a key and to', async() => {
        expect(replaceQueryString('https://google.com/?a=1&b=1', [{
            key: 'a',
            to: '2'
        }])).toBe('https://google.com/?a=2&b=1');
    });

    test('replaces query strings with a regex', async() => {
        expect(replaceQueryString('https://google.com/?a=xxxxx', [{
            from: /(x{3})+/,
            to: '2'
        }])).toBe('https://google.com/?a=2');
    });

    test('replaces query strings with matching key with a regex', async() => {
        expect(replaceQueryString('https://google.com/?a=xxxxx&b=xxxxx', [{
            key: 'a',
            from: /(x{3})+/,
            to: '2'
        }])).toBe('https://google.com/?a=2&b=xxxxx');
    });

    test('replaces multiple query strings', async() => {
        expect(replaceQueryString('https://google.com/?a=xxxxx&b=xxxxx', [{
            key: 'a',
            from: /(x{3})+/,
            to: '2'
        },{
            key: 'b',
            to: '2'
        }])).toBe('https://google.com/?a=2&b=2');
    });

    test('replaces query string with space', async() => {
        expect(replaceQueryString('https://google.com/?a=foo', [{
            key: 'a',
            to: 'foo bar'
        }])).toBe('https://google.com/?a=foo%20bar');
    });

    test('replaces freemarker tags', async() => {
        expect(replaceQueryString('https://google.com/?a=${Gears.foo}', [{
            key: 'a',
            to: '${Gears.bar}'
        }])).toBe('https://google.com/?a=${Gears.bar}');
    });

    test('upserts a missing key onto a url with existing params', async() => {
        expect(replaceQueryString('https://google.com/?a=1', [{
            key: 'utm',
            to: 'x'
        }])).toBe('https://google.com/?a=1&utm=x');
    });

    test('upserts a missing key onto a url with no query string', async() => {
        expect(replaceQueryString('https://google.com/', [{
            key: 'utm',
            to: 'x'
        }])).toBe('https://google.com/?utm=x');
    });

    test('upsert sets the value when the key already exists', async() => {
        expect(replaceQueryString('https://google.com/?utm=old', [{
            key: 'utm',
            to: 'new'
        }])).toBe('https://google.com/?utm=new');
    });

    test('upsert encodes spaces and preserves freemarker tags', async() => {
        expect(replaceQueryString('https://google.com/', [{
            key: 'utm',
            to: 'spring sale'
        }])).toBe('https://google.com/?utm=spring%20sale');

        expect(replaceQueryString('https://google.com/', [{
            key: 'utm',
            to: '${Gears.code}'
        }])).toBe('https://google.com/?utm=${Gears.code}');
    });

    test('edits an existing param and upserts a new one in the same call', async() => {
        expect(replaceQueryString('https://google.com/?a=1', [{
            key: 'a',
            from: '1',
            to: '2'
        }, {
            key: 'utm',
            to: 'x'
        }])).toBe('https://google.com/?a=2&utm=x');
    });

    // Backwards-compat guard: a keyed edit (has `from`) must NOT create a missing
    // key. The composable broadcasts every extracted code to every link, so creating
    // here would copy params onto links that never had them.
    test('keyed edit does not create a missing key', async() => {
        expect(replaceQueryString('https://google.com/?a=1', [{
            key: 'utm',
            from: 'x',
            to: 'y'
        }])).toBe('https://google.com/?a=1');
    });

    // Backwards-compat guard: a value-only edit (`{from, to}`) never creates.
    test('value-only edit does not create on a url with no query string', async() => {
        expect(replaceQueryString('https://google.com/', [{
            from: '1',
            to: '2'
        }])).toBe('https://google.com/');
    });

    test('does not touch mailto, tel, fragment, or javascript urls when upserting', async() => {
        const replacements = [{ key: 'utm', to: 'x' }];

        expect(replaceQueryString('mailto:foo@bar.com', replacements)).toBe('mailto:foo@bar.com');
        expect(replaceQueryString('tel:+15551234567', replacements)).toBe('tel:+15551234567');
        expect(replaceQueryString('#anchor', replacements)).toBe('#anchor');
        expect(replaceQueryString('javascript:void(0)', replacements)).toBe('javascript:void(0)');
    });
});

test('encoding and decoding freemarker tags', () => {
    const raw = `
    <div><#if a>test</#if></div>
    <#if (c > a == b < d)>
        inner then
        
        <#if (c < a == b > d)>
            inner then
        <#else>
            inner else
        </#if>
    <#elseif a>
        inner elseif
    <#else>
        else
    </#if>
    after
    `;

    const encoded = `
    <div>{{#if a#}}test{{/#if#}}</div>
    {{#if (c &gt; a == b &lt; d)#}}
        inner then
        
        {{#if (c &lt; a == b &gt; d)#}}
            inner then
        {{#else#}}
            inner else
        {{/#if#}}
    {{#elseif a#}}
        inner elseif
    {{#else#}}
        else
    {{/#if#}}
    after
    `;
    
    expect(encodeFreemarkerTags(raw)).toBe(encoded);
    expect(decodeFreemarkerTags(encoded)).toBe(raw);
});