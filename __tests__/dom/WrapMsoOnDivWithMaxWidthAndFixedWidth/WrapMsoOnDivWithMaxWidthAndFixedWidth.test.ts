import fs from 'node:fs';
import path from 'node:path';
import FixMsoWrapper from '../../../src/dom/FixMsoWrapper';
import { manipulate } from '../../../src/helpers';

test('wrapping mso on div with max and full widths', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/WrapMsoOnDivWithMaxWidthAndFixedWidth/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/WrapMsoOnDivWithMaxWidthAndFixedWidth/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [new FixMsoWrapper()])).toBe(expected);
});