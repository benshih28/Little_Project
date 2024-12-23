// 匯入模組
import { domReferences } from './domReferences.js';
import { handlersConfig } from './handlersConfig.js';
import { setupTagHandlers } from './tagHandlers.js';
import { adjustCanvasPosition, addDragEvents, updateCodeDisplay } from './utils.js';
//import { loadDefaultTags } from './defaultTags.js';

// 初始畫布位置調整
adjustCanvasPosition();
window.addEventListener('resize', adjustCanvasPosition);

// 綁定事件處理器
setupTagHandlers(
    handlersConfig,
    domReferences.dragItemsContainer,
    addDragEvents,
    domReferences.customHtmlContainer
);

// 設定拖拽事件
addDragEvents();

// 清空畫布功能
domReferences.clearCanvasButton.addEventListener('click', updateCodeDisplay);

// 初始化預設標籤
//loadDefaultTags();
