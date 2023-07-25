import fs from 'node:fs';
import path from 'node:path';
import FixResponsiveImages from '../../../src/dom/FixResponsiveImages';
import { manipulate } from '../../../src/helpers';

test('fixing responsive images', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/FixResponsiveImages/error.html'), 'utf8'
    );

    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/FixResponsiveImages/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixResponsiveImages()])).toBe(expected);
});