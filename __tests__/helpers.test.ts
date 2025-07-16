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