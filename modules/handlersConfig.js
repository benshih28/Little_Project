import { 
    cssTags, 
    cssFamilyTags, 
    cssPseudoClassTags, 
    cssStructurePseudoClassTags, 
    cssAttributePseudoClassTags, 
    cssBorderTags,
    defaultTags, 
    styleTags, 
    structureTags, 
    listTags, 
    linkTags, 
    mediaTags, 
    tableTags, 
    formTags 
} from './tagsContent.js';


import { 
    clearCanvas, 
    clearCanvasFamily, 
    clearCanvasPseudoClass, 
    clearCanvasStructurePseudoClass, 
    clearCanvasAttributePseudoClass 
} from './canvasClearHandlers.js';

import { 
    showBorderConfigModal, 
    showOlForm, 
    showLiForm, 
    showTableForm, 
    showFormContentBuilder 
} from './utils.js';

export const handlersConfig = [
    { type: 'css', id: 'loadCssTags', content: cssTags, clearCanvas: clearCanvas },
    { type: 'css', id: 'loadCssFamilyTags', content: cssFamilyTags, clearCanvas: clearCanvasFamily },
    { type: 'css', id: 'loadCssPseudoClassTags', content: cssPseudoClassTags, clearCanvas: clearCanvasPseudoClass },
    { type: 'css', id: 'loadCssStructurePseudoClassTags', content: cssStructurePseudoClassTags, clearCanvas: clearCanvasStructurePseudoClass },
    { type: 'css', id: 'loadCssAttributePseudoClassTags', content: cssAttributePseudoClassTags, clearCanvas: clearCanvasAttributePseudoClass },
    { type: 'css', id: 'loadCssBorderTags', content: cssBorderTags, clearCanvas: clearCanvas, extraHandlers: [
        { buttonId: 'configureBorderButton', handler: showBorderConfigModal },
    ]},
    { type: 'html', id: 'loadStyleTags', content: styleTags },
    { type: 'html', id: 'loadStructureTags', content: structureTags },
    { type: 'html', id: 'loadListTags', content: listTags, extraHandlers: [
        { buttonId: 'configureOlButton', handler: showOlForm },
        { buttonId: 'configureLiButton', handler: showLiForm },
    ]},
    { type: 'html', id: 'loadLinkTags', content: linkTags },
    { type: 'html', id: 'loadMediaTags', content: mediaTags },
    { type: 'html', id: 'loadTableTags', content: tableTags, extraHandlers: [
        { buttonId: 'configureTableButton', handler: showTableForm },
    ]},
    { type: 'html', id: 'loadFormTags', content: formTags, extraHandlers: [
        { buttonId: 'configureFormButton', handler: showFormContentBuilder },
    ]},
];
