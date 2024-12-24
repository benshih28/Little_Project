import { updateCssDisplay } from './utils.js';

/**
 * 通用清空畫布函式
 * @param {HTMLElement} canvas - 畫布元素
 * @param {Array} cssRules - CSS 規則陣列
 * @param {HTMLElement} cssDisplay - CSS 顯示區域
 * @param {string} content - 要填充到畫布的 HTML
 */
export const clearCanvas = (canvas, cssRules, cssDisplay, content = '') => {
    
    //測試調用
    if (!canvas) {
        console.error('Canvas element is undefined');
        return;
    }
    
    
    canvas.innerHTML = content; // 清空畫布並填充內容
    cssRules.length = 0; // 清空 CSS 規則
    updateCssDisplay(cssRules); // 更新 CSS 顯示

    // 移除所有應用的樣式
    const existingStyles = document.querySelectorAll('style');
    existingStyles.forEach(styleTag => styleTag.remove());
};

// 預設清空畫布
export const clearCanvasDefault = (canvas, cssRules, cssDisplay) => {
    clearCanvas(canvas, cssRules, cssDisplay, '<p class="text-muted">將標籤拖拽到這裡</p>');
};

// 清空畫布 (親屬結構)
export const clearCanvasFamily = (canvas, cssRules, cssDisplay) => {
    clearCanvas(
        canvas,
        cssRules,
        cssDisplay,
        `
        <div>
            <h1>兒子-1</h1>
            <section>
                <h1>孫子</h1>
                <section>
                    <h1>曾孫</h1>
                </section>
            </section>
            <h1>兒子-2</h1>
        </div>
        <h1>伯父</h1>
        <h1>叔叔</h1>
        <p>隔壁鄰居-1</p>
        `
    );
};

// 清空畫布 (虛擬標籤)
export const clearCanvasPseudoClass = (canvas, cssRules, cssDisplay) => {
    clearCanvas(
        canvas,
        cssRules,
        cssDisplay,
        `
        <p>
            <a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">CSS Pseudo-classes</a>
        </p>
        `
    );
};

// 清空畫布 (結構相關虛擬類別)
export const clearCanvasStructurePseudoClass = (canvas, cssRules, cssDisplay) => {
    clearCanvas(
        canvas,
        cssRules,
        cssDisplay,
        `
        <div class="containerPseudoClass">
            <p>Paragraph 1</p>
            <span>Span 1</span>
            <p>Paragraph 2</p>
            <span class="exclude">Span 2</span>
            <p>Paragraph 3</p>
        </div>
        `
    );
};

// 清空畫布 (屬性相關虛擬類別)
export const clearCanvasAttributePseudoClass = (canvas, cssRules, cssDisplay) => {
    clearCanvas(
        canvas,
        cssRules,
        cssDisplay,
        `
        <div class="container">
            <p id="intro" data-info="start">Introduction</p>
            <p class="content" data-info="middle">Main Content</p>
            <p class="content" data-info="end">Conclusion</p>
            <a href="https://example.com" class="link" data-category="external">Visit Example</a>
        </div>
        `
    );
};

/**
 * 清空畫布並初始化
 * @param {HTMLElement} canvas - 畫布元素
 * @param {Array} cssRules - CSS 規則陣列
 * @param {HTMLElement} cssDisplay - CSS 顯示區域
 */
export const resetCanvasAndCss = (canvas, cssRules, cssDisplay) => {
    resetCanvasWithContent(canvas, cssRules, cssDisplay, '<p class="text-muted">將標籤拖拽到這裡</p>');
};

/**
 * 通用函式：清空畫布並更新
 * @param {HTMLElement} canvas - 畫布元素
 * @param {Array} cssRules - CSS 規則陣列
 * @param {HTMLElement} cssDisplay - CSS 顯示區域
 * @param {string} content - 要填充到畫布的 HTML
 */
export const resetCanvasWithContent = (canvas, cssRules, cssDisplay, content = '') => {
    clearCanvas(canvas, cssRules, cssDisplay, content);
};