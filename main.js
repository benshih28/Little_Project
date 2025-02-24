import { domReferences } from './modules/domReferences.js'; // 引入 DOM 參考
import { handlersConfig } from './modules/handlersConfig.js'; // 引入事件處理器配置
import { setupTagHandlers } from './modules/tagHandlers.js'; // 引入標籤處理器設置函數
import { adjustCanvasPosition, addDragEvents, updateCodeDisplay } from './modules/htmlUtils.js'; // 修改為 htmlUtils.js
import {initializeCanvasEvents} from './modules/cssUtils.js'; // 引入初始化畫布事件
import { clearCanvas } from './modules/canvasClearHandlers.js'; // 引入清空畫布函數

// 初始畫布位置調整
adjustCanvasPosition();
window.addEventListener('resize', adjustCanvasPosition); // 當窗口大小改變時調整畫布位置

const cssRules = []; // 確保 cssRules 被初始化為一個陣列

console.log('Setting up tag handlers'); // 調試訊息

// 綁定事件處理器
setupTagHandlers(
    handlersConfig, // 事件處理器配置
    domReferences.dragItemsContainer, // 拖曳項目容器
    addDragEvents, // 添加拖曳事件
    domReferences.customHtmlContainer, // 自訂 HTML 容器
    cssRules // CSS 規則陣列
);

console.log('Tag handlers setup complete'); // 調試訊息

// 設定拖拽事件
addDragEvents(); // 為拖曳項目添加拖曳事件
console.log('Drag events added'); // 調試訊息

// 初始化 canvas 事件
initializeCanvasEvents(cssRules); // 初始化畫布的拖放事件

// 清空畫布功能
domReferences.clearCanvasButton.addEventListener('click', () => {
    clearCanvas(domReferences.canvas, cssRules, domReferences.cssDisplay); // 清空畫布並更新 CSS 顯示
    updateCodeDisplay(); // 更新代碼顯示
});

// 綁定新增自訂 HTML 按鈕事件
domReferences.addCustomHTMLButton.addEventListener('click', () => {
    const customHTML = document.getElementById('customHTML').value.trim();
    if (customHTML) {
        const newItem = document.createElement('div');
        newItem.className = 'drag-item';
        newItem.draggable = true;
        newItem.setAttribute('data-html', customHTML);
        newItem.textContent = `自訂項目 - ${customHTML.slice(0, 15)}...`;
        domReferences.dragItemsContainer.appendChild(newItem);
        addDragEvents(); // 為新添加的項目添加拖拽事件
        document.getElementById('customHTML').value = '';
        console.log('Custom HTML added'); // 調試訊息
    } else {
        alert('請輸入有效的 HTML 代碼！');
    }
});
