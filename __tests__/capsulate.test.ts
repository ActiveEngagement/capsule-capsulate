import { capsulate } from '../src/capsulate';

test('that the capsulate() function.', async() => {
    const results = await capsulate('<div id="contents">Contents</div>', {
        template: {
            src: '<div id="wrapper">{{ contents }}</div>'
        }
    });

    expect(results).toBe('<div id="wrapper"><div id="contents">Contents</div></div>');
});
