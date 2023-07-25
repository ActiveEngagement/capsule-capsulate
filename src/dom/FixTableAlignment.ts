import { CheerioAPI } from 'cheerio';
import BaseDomPlugin from '../DomPlugin';

export default class FixTableAlignment extends BaseDomPlugin {

    async postprocess($: CheerioAPI) {
        for(const el of $('table')) {
            const $el = $(el);

            if(!$el.attr('align')) {
                if($el.style('margin').marginLeft === 'auto' && $el.style('margin').marginRight === 'auto') {
                    $el.attr('align', 'center');
                }
                else if($el.style('margin').marginLeft === 'auto') {
                    $el.attr('align', 'right');
                }
                else if($el.style('margin').marginRight === 'auto') {
                    $el.attr('align', 'left');
                }
            }
        }

        // $('table').each((i, el) => {
        //     if(!el.getAttribute('align')) {
        //         if(el.style.marginLeft === 'auto' && el.style.marginRight === 'auto') {
        //             el.setAttribute('align', 'center');
        //         }
        //         else if(el.style.marginLeft === 'auto') {
        //             el.setAttribute('align', 'right');
        //         }
        //         else if(el.style.marginRight === 'auto') {
        //             el.setAttribute('align', 'left');
        //         }
        //     }
        // });

        return $;
    }
}