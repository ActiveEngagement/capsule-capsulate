import fs from 'node:fs';
import path from 'node:path';
import { ReplaceQueryStrings } from '../../../src/dom/ReplaceQueryStrings';
import { manipulate } from '../../../src/helpers';

test('wrapping mso on correct divs', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/dom/ReplaceQueryStrings/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/dom/ReplaceQueryStrings/expected.html'), 'utf8'
    );

    expect(await manipulate(error, [
        new ReplaceQueryStrings({
            sourceCodes: [
                { key: 'a', from: '1', to: '2' },
                { key: 'c', from: 'test', to: 'with space' },
                { key: 'utm_test', from: '${Gears.foo}', to: '${Gears.bar}' },
                { key: 'source_code', from: 'xxxxx', to: 'xxxxx-updated' },
                { key: 'source_code', from: 'yyyyy', to: 'yyyyy-updated' },
                { key: 'source_code', from: 'zzzzz', to: 'zzzzz-updated' },
                { key: 'segmentCode', from: 'xxxxx', to: 'xxxxx-updated' }
            ]
        })
    ])).toBe(expected);
});