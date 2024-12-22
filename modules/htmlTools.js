// 模組化: htmlTools.js

// 更新畫布程式碼顯示
const updateCodeDisplay = (canvas, codeDisplay) => {
    const content = Array.from(canvas.children)
        .filter(child => !(child.tagName === 'P' && child.classList.contains('text-muted')))
        .map(child => child.outerHTML)
        .join('\n');
    codeDisplay.textContent = content;
};

// 更新畫布程式碼顯示 (CSS 預設 HTML)
const updateCodeDisplayCSS_HTML = (canvas, codeDisplay) => {
    const content = canvas.innerHTML
        .replace(/></g, '><') // 格式化 HTML，顯示巢狀結構
        .trim();
    codeDisplay.textContent = content;
};

// 清空畫布內容
const clearCanvas = (canvas, cssRules, cssDisplay) => {
    canvas.innerHTML = '<p class="text-muted">將標籤拖拽到這裡</p>';
    cssRules.length = 0;
    cssDisplay.textContent = '';
};

// 新增自訂 HTML 項目
const addCustomHTML = (customHTML, dragItemsContainer, addDragEvents) => {
    if (customHTML.trim()) {
        const newItem = document.createElement('div');
        newItem.className = 'drag-item';
        newItem.draggable = true;
        newItem.setAttribute('data-html', customHTML.trim());
        newItem.textContent = `自訂項目 - ${customHTML.slice(0, 15)}...`;
        dragItemsContainer.appendChild(newItem);
        addDragEvents();
    } else {
        alert('請輸入有效的 HTML 代碼！');
    }
};

// 匯出模組函數
export {
    updateCodeDisplay,
    updateCodeDisplayCSS_HTML,
    clearCanvas,
    addCustomHTML
};
