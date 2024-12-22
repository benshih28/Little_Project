// 模組化: canvasManager.js

// 調整畫布位置以適應導航欄
const adjustCanvasPosition = () => {
    const navHeight = document.querySelector('nav').offsetHeight;
    document.querySelector('.container').style.marginTop = `${navHeight + 20}px`;
};

// 清空畫布並添加預設內容
const resetCanvas = (canvas, cssRules, cssDisplay, updateCssDisplay) => {
    canvas.innerHTML = '<p class="text-muted">將標籤拖拽到這裡</p>';
    cssRules.length = 0;
    updateCssDisplay(cssDisplay);
};

// 加載自訂 HTML 到畫布
const loadCustomHtmlToCanvas = (canvas, customHtml) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = customHtml;
    const content = wrapper.firstElementChild;
    if (content) {
        canvas.appendChild(content);
    }
};

// 添加樣式到畫布
const applyCssToCanvas = (canvas, cssRule, cssRules, updateCssDisplay) => {
    const styleTag = document.createElement('style');
    styleTag.textContent = cssRule;
    document.head.appendChild(styleTag);
    cssRules.push(cssRule);
    updateCssDisplay();
};

// 初始化畫布相關功能
const initializeCanvas = (canvas, cssDisplay, adjustPositionCallback) => {
    adjustPositionCallback();
    window.addEventListener('resize', adjustPositionCallback);

    // 清空畫布按鈕事件綁定
    document.getElementById('clearCanvas').addEventListener('click', () => {
        resetCanvas(canvas, [], cssDisplay, () => {
            cssDisplay.textContent = '';
        });
    });
};

// 匯出模組函數
export {
    adjustCanvasPosition,
    resetCanvas,
    loadCustomHtmlToCanvas,
    applyCssToCanvas,
    initializeCanvas
};
