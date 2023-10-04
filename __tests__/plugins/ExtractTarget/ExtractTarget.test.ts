import fs from 'node:fs';
import path from 'node:path';
import TaskRunner from '../../../src/TaskRunner';
import Beautify from '../../../src/plugins/Beautify';
import ExtractTarget from '../../../src/plugins/ExtractTarget';

test('extracting a target dom element', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/ExtractTarget/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/ExtractTarget/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new Beautify,
        new ExtractTarget({
            selector: '.target'
        })
    ]);

    expect(await runner.process(error)).toBe(expected);
});