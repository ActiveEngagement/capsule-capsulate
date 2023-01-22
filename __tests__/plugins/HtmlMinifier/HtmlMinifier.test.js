const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const run = require('../../../lib/run');
const Beautify = require('../../../plugins/Beautify');
const HtmlMinifier = require('../../../plugins/HtmlMinifier');

test('minifying a template', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/HtmlMinifier/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/HtmlMinifier/expected.html'), 'utf8'
    );

    const response = await run(error, [
        new Beautify,
        new HtmlMinifier
    ]);

    expect(response).toBe(expected);
});