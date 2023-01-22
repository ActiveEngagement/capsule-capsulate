const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const run = require('../../../lib/run');
const Beautify = require('../../../plugins/Beautify');
const ExtractTarget = require('../../../plugins/ExtractTarget');

test('extracting a target dom element', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/ExtractTarget/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/ExtractTarget/expected.html'), 'utf8'
    );

    const response = await run(error, [
        new Beautify,
        new ExtractTarget({
            selector: '.target'
        })
    ]);

    expect(response).toBe(expected);
});