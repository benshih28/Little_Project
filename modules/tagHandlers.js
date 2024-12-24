import { domReferences } from './domReferences.js';

/**
 * 綁定按鈕點擊事件的通用處理
 * @param {Array} handlersConfig - 配置每個按鈕的行為
 * @param {HTMLElement} dragItemsContainer - 放置拖曳標籤的容器
 * @param {Function} addDragEvents - 用於新增拖曳事件的函式
 * @param {HTMLElement} customHtmlContainer - 自訂 HTML 的容器
 * @param {Array} cssRules - CSS 規則陣列
 */
export const setupTagHandlers = (handlersConfig, dragItemsContainer, addDragEvents, customHtmlContainer, cssRules) => {
    handlersConfig.forEach(({ id, content, clearCanvas, extraHandlers }) => {
        const button = document.getElementById(id); // 獲取按鈕元素
        if (button) {
            button.addEventListener('click', () => {
                if (content) {
                    dragItemsContainer.innerHTML = content; // 更新標籤內容
                    addDragEvents(); // 添加拖拽事件
                    customHtmlContainer.style.display = 'block'; // 顯示自訂 HTML 區域
                }
                if (clearCanvas) clearCanvas(domReferences.canvas, cssRules, domReferences.cssDisplay); // 清空畫布

                // 綁定額外的按鈕事件
                if (extraHandlers) {
                    extraHandlers.forEach(({ buttonId, handler }) => {
                        const extraButton = document.getElementById(buttonId); // 獲取額外按鈕元素
                        if (extraButton) {
                            extraButton.addEventListener('click', handler); // 綁定額外按鈕事件
                        }
                    });
                }
            });
        }
    });
};



