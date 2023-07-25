import fs from 'node:fs';
import path from 'node:path';
import FixBackgroundColor from '../../../src/dom/FixBackgroundColor';
import { manipulate } from '../../../src/helpers';

test('fixing background color', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixBackgroundColor/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixBackgroundColor/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixBackgroundColor()])).toBe(expected);
});