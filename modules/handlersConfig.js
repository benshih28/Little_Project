import { 
    cssTags, 
    cssFamilyTags, 
    cssPseudoClassTags, 
    cssStructurePseudoClassTags, 
    cssAttributePseudoClassTags, 
    cssBorderTags,
    cssInheritanceTags, // 新增引入
    cssVariableTags, // 新增引入
    defaultTags, 
    styleTags, 
    structureTags, 
    listTags, 
    linkTags, 
    mediaTags, 
    tableTags, 
    formTags, 
    metaTags, 
    rwdTags // 修正引入錯誤
} from './tagsContent.js';


import { 
    clearCanvas, 
    clearCanvasFamily, 
    clearCanvasPseudoClass, 
    clearCanvasStructurePseudoClass, 
    clearCanvasAttributePseudoClass,
    clearCanvasInheritance,
    clearCanvasCssVariables
} from './canvasClearHandlers.js';

import { 
    showBorderConfigModal, 
    showOlForm, 
    showLiForm, 
    showTableForm, 
    showFormContentBuilder,
    simulateMobileWidth, 
    simulateTabletWidth, 
    simulateDesktopWidth,
} from './htmlUtils.js'; // 修改為 htmlUtils.js


import{showCssVariableConfigModal} from './cssUtils.js';

export const handlersConfig = [
    { type: 'css', id: 'loadCssTags', content: cssTags, clearCanvas: clearCanvas },
    { type: 'css', id: 'loadCssFamilyTags', content: cssFamilyTags, clearCanvas: clearCanvasFamily },
    { type: 'css', id: 'loadCssPseudoClassTags', content: cssPseudoClassTags, clearCanvas: clearCanvasPseudoClass },
    { type: 'css', id: 'loadCssStructurePseudoClassTags', content: cssStructurePseudoClassTags, clearCanvas: clearCanvasStructurePseudoClass },
    { type: 'css', id: 'loadCssAttributePseudoClassTags', content: cssAttributePseudoClassTags, clearCanvas: clearCanvasAttributePseudoClass },
    { type: 'css', id: 'loadCssBorderTags', content: cssBorderTags, clearCanvas: clearCanvas, extraHandlers: [
        { buttonId: 'configureBorderButton', handler: showBorderConfigModal },
    ]},
    { type: 'css', id: 'loadCssInheritanceTags', content: cssInheritanceTags, clearCanvas: clearCanvasInheritance }, // 新增配置
    { type: 'css', id: 'loadCssVariableTags', content: cssVariableTags, clearCanvas: clearCanvasCssVariables, extraHandlers: [
        { buttonId: 'configureCssVariableButton', handler: showCssVariableConfigModal },
    ]}, // 新增配置
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
    { type: 'html', id: 'loadmetaTags', content: metaTags },
    { type: 'html', id: 'loadRWDTags', content: rwdTags, extraHandlers: [
        { buttonId: 'simulateMobileWidth', handler: simulateMobileWidth },
        { buttonId: 'simulateTabletWidth', handler: simulateTabletWidth },
        { buttonId: 'simulateDesktopWidth', handler: simulateDesktopWidth },
    ]},
];
