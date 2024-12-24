// domReferences.js: 集中管理所有與 DOM 相關的引用
export const domReferences = {
    dragItemsContainer: document.getElementById('dragItems'),
    canvas: document.getElementById('canvas'),
    codeDisplay: document.getElementById('codeDisplay'),
    cssDisplay: document.getElementById('cssDisplay'),
    clearCanvasButton: document.getElementById('clearCanvas'), // 確保這一行正確
    customHtmlContainer: document.getElementById('customHtmlContainer'),
    addCustomHTMLButton: document.getElementById('addCustomHTML'),
};