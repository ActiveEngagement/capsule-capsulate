import fs from 'node:fs';
import path from 'node:path';
import FixFontColor from '../../../src/dom/FixFontColor';
import { manipulate } from '../../../src/helpers';

test('fixing font color', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixFontColor/error.html'), 'utf8'
    );
        
    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixFontColor/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixFontColor()])).toBe(expected);
});