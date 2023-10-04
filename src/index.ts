import BasePlugin from '../dist/Plugin';
import ConvertListsToTables from '../dist/dom/ConvertListsToTables';
import Beautify from '../dist/plugins/Beautify';
import DecodeHrefAmpersands from '../dist/plugins/DecodeHrefAmpersands';
import ExtractTarget from '../dist/plugins/ExtractTarget';
import PreserveBodyAttributes from '../dist/plugins/PreserveBodyAttributes';
import PreserveHeadTag from '../dist/plugins/PreserveHeadTag';
import Template from '../dist/plugins/Template';
import BaseDomPlugin from './DomPlugin';
import ManipulateDom from './ManipulateDom';
import TaskRunner from './TaskRunner';
import ApplyHeadStyles from './dom/ApplyHeadStyles';
import ApplyListStyles from './dom/ApplyListStyles';
import FixBackgroundColor from './dom/FixBackgroundColor';
import FixFloatAlignment from './dom/FixFloatAlignment';
import FixFontColor from './dom/FixFontColor';
import FixHrefQueryStrings from './dom/FixHrefQueryStrings';
import FixLineHeight from './dom/FixLineHeight';
import FixMsoButtons from './dom/FixMsoButtons';
import FixMsoWrapper from './dom/FixMsoWrapper';
import FixResponsiveImages from './dom/FixResponsiveImages';
import FixTableAlignment from './dom/FixTableAlignment';
import RemoveDisplayNone from './dom/RemoveDisplayNone';
import RemoveScriptTags from './dom/RemoveScriptTags';
import ReplaceQueryStrings from './dom/ReplaceQueryStrings';
import HtmlMinifier from './plugins/HtmlMinifier';
import InlineCss from './plugins/InlineCss';

export * from './capsulate';
export * from './helpers';

export {
    ApplyHeadStyles,
    ApplyListStyles,
    BaseDomPlugin,
    BasePlugin,
    Beautify,
    ConvertListsToTables,
    DecodeHrefAmpersands,
    ExtractTarget,
    FixBackgroundColor,
    FixFloatAlignment,
    FixFontColor,
    FixHrefQueryStrings,
    FixLineHeight,
    FixMsoButtons,
    FixMsoWrapper,
    FixResponsiveImages,
    FixTableAlignment,
    HtmlMinifier,
    InlineCss,
    ManipulateDom,
    PreserveBodyAttributes,
    PreserveHeadTag,
    RemoveDisplayNone,
    RemoveScriptTags,
    ReplaceQueryStrings,
    TaskRunner,
    Template
};

