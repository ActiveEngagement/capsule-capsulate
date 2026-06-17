import { useReplaceQueryStrings } from '../src/helpers';

const html = [
    '<div>',
    '<a href="https://google.com/?source_code=xxxxx">has code</a>',
    '<a href="https://google.com/">no params</a>',
    '</div>'
].join('');

describe('useReplaceQueryStrings()', () => {
    test('extracts existing source codes into an editable model', () => {
        const { sourceCodes, model } = useReplaceQueryStrings(html);

        expect(sourceCodes.value).toEqual([
            ['source_code', [{ key: 'source_code', from: 'xxxxx', to: 'xxxxx', count: 1 }]]
        ]);

        // Only the extracted (keyed) edits, no new source codes yet.
        expect(model.value).toEqual([
            { key: 'source_code', from: 'xxxxx', to: 'xxxxx', count: 1 }
        ]);
    });

    test('editing an extracted code replaces it without adding new source codes', async() => {
        const { sourceCodes, replace } = useReplaceQueryStrings(html);

        sourceCodes.value[0][1][0].to = 'xxxxx-updated';

        const result = await replace();

        expect(result).toContain('href="https://google.com/?source_code=xxxxx-updated"');
        // The keyed edit must not be copied onto the link that never had it.
        expect(result).toContain('href="https://google.com/"');
        expect(result).not.toContain('?source_code=xxxxx-updated">no params');
    });

    test('new source codes are upserted onto every link', async() => {
        const { newSourceCodes, replace } = useReplaceQueryStrings(html);

        newSourceCodes.value.push({ key: 'utm', to: 'spring' });

        const result = await replace();

        // Created on the link that had a query string...
        expect(result).toContain('href="https://google.com/?source_code=xxxxx&amp;utm=spring"');
        // ...and on the link that had none.
        expect(result).toContain('href="https://google.com/?utm=spring"');
    });

    test('ignores new source codes with a blank key', async() => {
        const { newSourceCodes, model, replace } = useReplaceQueryStrings(html);

        newSourceCodes.value.push({ key: '   ', to: 'ignored' });

        expect(model.value).toEqual([
            { key: 'source_code', from: 'xxxxx', to: 'xxxxx', count: 1 }
        ]);

        const result = await replace();

        expect(result).not.toContain('ignored');
    });

    test('trims whitespace from new source code keys', () => {
        const { newSourceCodes, model } = useReplaceQueryStrings(html);

        newSourceCodes.value.push({ key: '  utm  ', to: 'spring' });

        expect(model.value).toContainEqual({ key: 'utm', to: 'spring' });
    });

    test('refreshes state from the committed HTML after replace()', async() => {
        const { sourceCodes, newSourceCodes, replace } = useReplaceQueryStrings(html);

        newSourceCodes.value.push({ key: 'utm', to: 'spring' });

        await replace();

        // Pending upsert clears and the new key surfaces in sourceCodes with counts.
        expect(newSourceCodes.value).toEqual([]);

        const keys = sourceCodes.value.map(([key]) => key);
        expect(keys).toContain('utm');

        const utm = sourceCodes.value.find(([key]) => key === 'utm')?.[1];
        expect(utm).toEqual([
            { key: 'utm', from: 'spring', to: 'spring', count: 2 }
        ]);
    });

    test('successive replace() calls each commit against the prior result', async() => {
        const { newSourceCodes, replace } = useReplaceQueryStrings(html);

        newSourceCodes.value.push({ key: 'utm_source', to: 'a' });
        await replace();

        // Simulate the user re-using the same composable for a second save.
        newSourceCodes.value.push({ key: 'utm_medium', to: 'b' });
        const result = await replace();

        // Both saves must survive — the second commit cannot drop the first.
        expect(result).toContain('utm_source=a');
        expect(result).toContain('utm_medium=b');
    });
});
