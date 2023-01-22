const { test, expect } = global;
const fs = require('fs');
const path = require('path');
const manipulate = require('../../../lib/manipulate');
const FixMsoButtons = require('../../../dom/FixMsoButtons');

test('omitting mso button with children', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/OmitMsoButtonWithChildDomNodes/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/OmitMsoButtonWithChildDomNodes/expected.html'), 'utf8'
    );

    expect(await manipulate(error, new FixMsoButtons())).toBe(expected);
});