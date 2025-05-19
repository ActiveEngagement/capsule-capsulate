import fs from 'node:fs';
import path from 'node:path';
import { ReplaceSourceCode } from '../../../src';
import { TaskRunner } from '../../../src/TaskRunner';
import { Beautify } from '../../../src/plugins/Beautify';

test('replacing source codes with xxxxx', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/ReplaceSourceCode/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/ReplaceSourceCode/expected.html'), 'utf8'
    );

    const runner = new TaskRunner([
        new ReplaceSourceCode({
            sourceCode: 'SOME_SOURCE'
        }),
        new Beautify,
    ]);

    expect(await runner.process(error)).toBe(expected);
});