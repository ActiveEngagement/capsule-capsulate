const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const run = require('../../../lib/run');
const Beautify = require('../../../plugins/Beautify');
const InlineCss = require('../../../plugins/InlineCss');

test('inlining the CSS in a template', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/InlineCss/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/InlineCss/expected.html'), 'utf8'
    );

    const response = await run(error, [
        new Beautify,
        new InlineCss
    ]);

    expect(response).toBe(expected);
});