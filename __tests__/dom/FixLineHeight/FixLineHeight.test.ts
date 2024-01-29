import fs from 'node:fs';
import path from 'node:path';
import { FixLineHeight } from '../../../src/dom/FixLineHeight';
import { manipulate } from '../../../src/helpers';

test('fixing line heights', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixLineHeight/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixLineHeight/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixLineHeight()])).toBe(expected);
});