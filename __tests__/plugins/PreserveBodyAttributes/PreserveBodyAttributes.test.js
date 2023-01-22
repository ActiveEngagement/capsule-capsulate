const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const run = require('../../../lib/run');
const Beautify = require('../../../plugins/Beautify');
const PreserveBodyAttributes = require('../../../plugins/PreserveBodyAttributes');

test('preserving the body attributes', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/PreserveBodyAttributes/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/PreserveBodyAttributes/expected.html'), 'utf8'
    );

    const response = await run(error, [
        new Beautify,
        new PreserveBodyAttributes
    ]);

    expect(response).toBe(expected);
});