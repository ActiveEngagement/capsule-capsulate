import fs from 'node:fs';
import path from 'node:path';
import { ApplyListStyles } from '../../../src/dom/ApplyListStyles';
import { manipulate } from '../../../src/helpers';

test('applying the default styles', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ApplyListStyles/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ApplyListStyles/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new ApplyListStyles()])).toBe(expected);
});