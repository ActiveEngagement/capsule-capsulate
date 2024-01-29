import { ManipulateDom } from '../src/ManipulateDom';
import { capsulate } from '../src/capsulate';
import { ReplaceQueryStrings } from '../src/dom/ReplaceQueryStrings';
import { run } from '../src/helpers';
import { DecodeHrefAmpersands } from '../src/plugins/DecodeHrefAmpersands';

test('that the capsulate() function', async() => {
    const results = await capsulate('<div id="contents">Contents</div>', {
        template: {
            src: '<div id="wrapper">{{ contents }}</div>'
        }
    });

    expect(results).toBe('<div id="wrapper"><div id="contents">Contents</div></div>');
});

test('test a document with freemarker tags', async() => {
    expect(await capsulate('<div><#if (a>b == c<d)>test</#if></div>'))
        .toBe('<div><#if (a>b == c<d)>test</#if></div>');
});

test('test that source code replacement doesn\'t urlencode ampersands', async() => {
    expect(await run('<a href="https://google.com/?foo=bar&test=123">test</a>', [
        new ManipulateDom([
            new ReplaceQueryStrings([
                { key: 'foo', from: 'bar', to: 'bar-updated' }
            ])
        ]),
        new DecodeHrefAmpersands()
    ]))
        .toBe('<a href="https://google.com/?foo=bar-updated&test=123">test</a>');
});
