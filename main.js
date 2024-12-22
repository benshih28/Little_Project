// 主程式入口: main.js

// 匯入模組
import { addDragEvents } from './modules/dragAndDrop.js';
import { updateCssDisplay, resetCanvasAndCss, addCssRule } from './modules/cssTools.js';
import { updateCodeDisplay, updateCodeDisplayCSS_HTML, clearCanvas, addCustomHTML } from './modules/htmlTools.js';
import { adjustCanvasPosition, initializeCanvas } from './modules/canvasManager.js';
import { createModal, showDefaultModal } from './modules/modalBuilder.js';

// 初始化主要元件
const canvas = document.getElementById('canvas');
const cssDisplay = document.getElementById('cssDisplay');
const codeDisplay = document.getElementById('codeDisplay');
const dragItemsContainer = document.getElementById('dragItems');

// 初始化畫布
initializeCanvas(canvas, cssDisplay, adjustCanvasPosition);

// 添加拖放功能
addDragEvents();

// 預設標籤載入
const loadDefaultTags = () => {
    const defaultTags = `
        <div class="drag-item" draggable="true" data-html="<p>這是一段文字</p>">段落 (p)</div>
        <div class="drag-item" draggable="true" data-html="<h1>標題 H1</h1>">標題 (h1)</div>
        <div class="drag-item" draggable="true" data-html="<a href='#'>連結</a>">連結 (a)</div>
    `;
    dragItemsContainer.innerHTML = defaultTags;
    addDragEvents();
};
loadDefaultTags();

// 自訂 HTML 功能
const customHTMLInput = document.getElementById('customHTML');
const addCustomHTMLButton = document.getElementById('addCustomHTML');
addCustomHTMLButton.addEventListener('click', () => {
    const customHTML = customHTMLInput.value;
    addCustomHTML(customHTML, dragItemsContainer, addDragEvents);
    customHTMLInput.value = '';
});

// 清空畫布功能
const clearCanvasButton = document.getElementById('clearCanvas');
clearCanvasButton.addEventListener('click', () => {
    clearCanvas(canvas, [], cssDisplay);
    updateCodeDisplay(canvas, codeDisplay);
});

// 提示示例模態框
const showInfoButton = document.getElementById('showInfo');
showInfoButton.addEventListener('click', () => {
    showDefaultModal('提示', '這是示例模態框的內容！');
});

// 畫布變更後更新程式碼顯示
canvas.addEventListener('DOMSubtreeModified', () => {
    updateCodeDisplay(canvas, codeDisplay);
});
