import fs from 'node:fs';
import path from 'node:path';
import { Beautify } from '../../../../src';
import { TaskRunner } from '../../../../src/TaskRunner';
import { Courier } from '../../../../src/plugins/Courier';

test('inserting the Courier request ID into the head', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/Courier/DocumentWithHead/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/Courier/DocumentWithHead/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Courier({
            requestId: 'some-courier-id'
        }),
        new Beautify()
    ]);

    expect(await runner.process(error)).toBe(expected);
});