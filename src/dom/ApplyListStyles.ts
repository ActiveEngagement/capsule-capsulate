import { CheerioAPI } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';

export default class ApplyListStyles extends BaseDomPlugin {

    async postprocess($: CheerioAPI) {
        for(const el of $('ul,ol')) {
            const $el = $(el);

            if(!$el.attr('align')) {
                $el.attr('align', 'left');
            }
            
            if(!$el.attr('type')) {
                $el.attr('type', el.tagName === 'ol' ? '1' : 'disc')
            }

            if(!$el.padding()) {
                $el.css('padding', '0px');
            }

            if(!$el.margin()) {
                $el.css('margin', '0px 0px 0px 25px');
            }
        }
        
        // $('ul, ol').each((i, el) => {
        //     if(!el.getAttribute('align')) {
        //         el.setAttribute('align', 'left');
        //     }

        //     if(!el.getAttribute('type')) {
        //         el.setAttribute('type', el.tagName === 'OL' ? '1' : 'disc');
        //     }

        //     if(!el.style.padding) {
        //         el.style.padding = 0;
        //     }
            
        //     if(!el.style.margin) {
        //         el.style.margin = 0;
        //         el.style.marginLeft = '25px';
        //     }
        // });

        return $;
    }

};