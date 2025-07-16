import { only } from './src';

describe('only() function', () => {
    test('should convert all MaybeOption properties to false when no options provided', () => {
        const result = only({});

        expect(result).toEqual({
            extractTarget: false,
            htmlMinifier: false,
            preserveHeadTag: false,
            template: false,
            dom: {
                decodeEntitiesInStyleAttributes: false,
                fixHrefQueryStrings: false,
                fixBackgroundColor: false,
                fixFontColor: false,
                fixMsoWrapper: false,
                fixResponsiveImages: false,
                fixTableAlignment: false,
                removeDisplayNone: false,
                removeScriptTags: false,
                replaceQueryStrings: false,
                replaceNonAsciiChars: false,
            },
            preserveBodyAttributes: false,
            previewText: false,
            decodeHrefAmpersands: false,
            courier: false,
            inlineCss: false,
        });
    });

    test('should preserve explicitly provided values and set others to false', () => {
        const result = only({
            previewText: {
                html: 'test'
            }
        });

        expect(result).toEqual({
            extractTarget: false,
            htmlMinifier: false,
            preserveHeadTag: false,
            template: false,
            dom: {
                decodeEntitiesInStyleAttributes: false,
                fixHrefQueryStrings: false,
                fixBackgroundColor: false,
                fixFontColor: false,
                fixMsoWrapper: false,
                fixResponsiveImages: false,
                fixTableAlignment: false,
                removeDisplayNone: false,
                removeScriptTags: false,
                replaceQueryStrings: false,
                replaceNonAsciiChars: false,
            },
            preserveBodyAttributes: false,
            previewText: {
                html: 'test'
            },
            decodeHrefAmpersands: false,
            courier: false,
            inlineCss: false,
        });
    });

    test('should preserve undefined values when explicitly provided', () => {
        const result = only({
            extractTarget: undefined,
            dom: {
                fixBackgroundColor: undefined
            }
        });

        expect(result).toEqual({
            extractTarget: undefined,
            htmlMinifier: false,
            preserveHeadTag: false,
            template: false,
            dom: {
                decodeEntitiesInStyleAttributes: false,
                fixHrefQueryStrings: false,
                fixBackgroundColor: undefined,
                fixFontColor: false,
                fixMsoWrapper: false,
                fixResponsiveImages: false,
                fixTableAlignment: false,
                removeDisplayNone: false,
                removeScriptTags: false,
                replaceQueryStrings: false,
                replaceNonAsciiChars: false,
            },
            preserveBodyAttributes: false,
            previewText: false,
            decodeHrefAmpersands: false,
            courier: false,
            inlineCss: false,
        });
    });

    test('should handle multiple provided options', () => {
        const result = only({
            extractTarget: {
                selector: 'body'
            },
            htmlMinifier: {
                lineLengthLimit: 70
            },
            dom: {
                fixBackgroundColor: undefined,
                removeScriptTags: undefined
            },
            courier: {
                requestId: 'test'
            }
        });

        expect(result).toEqual({
            extractTarget: {
                selector: 'body'
            },
            htmlMinifier: {
                lineLengthLimit: 70
            },
            preserveHeadTag: false,
            template: false,
            dom: {
                decodeEntitiesInStyleAttributes: false,
                fixHrefQueryStrings: false,
                fixBackgroundColor: undefined,
                fixFontColor: false,
                fixMsoWrapper: false,
                fixResponsiveImages: false,
                fixTableAlignment: false,
                removeDisplayNone: false,
                removeScriptTags: undefined,
                replaceQueryStrings: false,
                replaceNonAsciiChars: false,
            },
            preserveBodyAttributes: false,
            previewText: false,
            decodeHrefAmpersands: false,
            courier: {
                requestId: 'test'
            },
            inlineCss: false,
        });
    });

    test('should handle false values explicitly provided', () => {
        const result = only({
            extractTarget: false,
            dom: {
                fixBackgroundColor: false,
                removeScriptTags: false
            }
        });

        expect(result).toEqual({
            extractTarget: false,
            htmlMinifier: false,
            preserveHeadTag: false,
            template: false,
            dom: {
                decodeEntitiesInStyleAttributes: false,
                fixHrefQueryStrings: false,
                fixBackgroundColor: false,
                fixFontColor: false,
                fixMsoWrapper: false,
                fixResponsiveImages: false,
                fixTableAlignment: false,
                removeDisplayNone: false,
                removeScriptTags: false,
                replaceQueryStrings: false,
                replaceNonAsciiChars: false,
            },
            preserveBodyAttributes: false,
            previewText: false,
            decodeHrefAmpersands: false,
            courier: false,
            inlineCss: false,
        });
    });

    test('should handle all dom properties provided', () => {
        const result = only({
            dom: {
                decodeEntitiesInStyleAttributes: false,
                fixHrefQueryStrings: undefined,
                fixBackgroundColor: false,
                fixFontColor: false,
                fixMsoWrapper: false,
                fixResponsiveImages: {
                    maxWidth: 200
                },
                fixTableAlignment: false,
                removeDisplayNone: false,
                removeScriptTags: false,
                replaceQueryStrings: false,
                replaceNonAsciiChars: false,
            }
        });

        expect(result.dom).toEqual({
            decodeEntitiesInStyleAttributes: false,
            fixHrefQueryStrings: undefined,
            fixBackgroundColor: false,
            fixFontColor: false,
            fixMsoWrapper: false,
            fixResponsiveImages: {
                maxWidth: 200
            },
            fixTableAlignment: false,
            removeDisplayNone: false,
            removeScriptTags: false,
            replaceQueryStrings: false,
            replaceNonAsciiChars: false,
        });
    });

    test('should handle partial dom object without overriding other dom properties', () => {
        const result = only({
            dom: {
                fixBackgroundColor: undefined,
                removeScriptTags: undefined
            }
        });

        expect(result.dom).toEqual({
            decodeEntitiesInStyleAttributes: false,
            fixHrefQueryStrings: false,
            fixBackgroundColor: undefined,
            fixFontColor: false,
            fixMsoWrapper: false,
            fixResponsiveImages: false,
            fixTableAlignment: false,
            removeDisplayNone: false,
            removeScriptTags: undefined,
            replaceQueryStrings: false,
            replaceNonAsciiChars: false,
        });
    });

    test('should maintain type safety', () => {
        const result = only({
            extractTarget: { selector: 'body' },
            previewText: { html: 'test' }
        });

        // TypeScript should enforce these types
        expect(typeof result.extractTarget).toBe('object');
        expect(typeof result.previewText).toBe('object');
        expect(result.htmlMinifier).toBe(false);
        expect(result.template).toBe(false);
    });
});