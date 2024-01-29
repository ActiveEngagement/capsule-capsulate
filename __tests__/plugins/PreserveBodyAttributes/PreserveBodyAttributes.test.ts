import { CheerioAPI } from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';
import { BasePlugin } from '../../../src/Plugin';
import { TaskRunner } from '../../../src/TaskRunner';
import { Beautify } from '../../../src/plugins/Beautify';
import { PreserveBodyAttributes } from '../../../src/plugins/PreserveBodyAttributes';

test('preserving the body attributes', async() => {
    const error = fs.readFileSync(
        path.resolve('__tests__/plugins/PreserveBodyAttributes/error.html'), 'utf8'
    );
    
    const expected = fs.readFileSync(
        path.resolve('__tests__/plugins/PreserveBodyAttributes/expected.html'), 'utf8'
    );

    class RemoveBodyTags extends BasePlugin {
        async process($: CheerioAPI) {
            const keys = Object.keys($('body').attr() as object);
            
            for(const key of keys) {
                $('body').removeAttr(key);
            }

            return $;
        }
    }

    const runner = new TaskRunner([
        new PreserveBodyAttributes,
        new RemoveBodyTags,
        new Beautify,
    ]);

    expect(await runner.process(error)).toBe(expected);
});