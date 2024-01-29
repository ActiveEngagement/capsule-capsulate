import fs from 'node:fs';
import path from 'node:path';
import { FixTableAlignment } from '../../../src/dom/FixTableAlignment';
import { manipulate } from '../../../src/helpers';

test('adding right alignment on table', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixHorizontalAutoMarginRight/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixHorizontalAutoMarginRight/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixTableAlignment()])).toBe(expected);
});