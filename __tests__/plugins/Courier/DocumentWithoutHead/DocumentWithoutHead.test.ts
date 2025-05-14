import fs from 'node:fs';
import path from 'node:path';
import { Beautify } from '../../../../src';
import { TaskRunner } from '../../../../src/TaskRunner';
import { Courier } from '../../../../src/plugins/Courier';

test('inserting the Courier request ID without a head', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Courier/DocumentWithoutHead/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Courier/DocumentWithoutHead/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Courier({
            requestId: '123'
        }),
        new Beautify()
    ]);

    expect(await runner.process(error)).toBe(expected);
});