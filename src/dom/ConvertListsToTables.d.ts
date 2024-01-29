import { CheerioAPI } from 'cheerio';
import { BaseDomPlugin } from '../DomPlugin';
export type ConvertListsToTablesOptions = {
    symbol: string;
};
export class ConvertListsToTables extends BaseDomPlugin<ConvertListsToTablesOptions> {
    defaultOptions(): ConvertListsToTablesOptions;
    postprocess($: CheerioAPI): Promise<CheerioAPI>;
}
