import fs from 'node:fs';
import path from 'node:path';
import { decodeFreemarkerTags, encodeFreemarkerTags, extractSourceCodes } from '../src/helpers';

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