// 模組化: cssTools.js

// 儲存所有 CSS 規則
const cssRules = [];

// 更新 CSS 顯示功能
const updateCssDisplay = (cssDisplay) => {
    cssDisplay.textContent = cssRules.join('\n');
};

// 計算選擇器的優先級
const calculateCssSpecificity = (selector) => {
    const ids = (selector.match(/#/g) || []).length; // ID 選擇器
    const classes = (selector.match(/(\.[\w-]+|\[[^\]]+\]|::?[\w-]+)/g) || []).length; // 類別、屬性選擇器、伪类
    const tags = (selector.match(/^[a-zA-Z]+|[ >+~][a-zA-Z]+/g) || []).length; // 標籤選擇器和伪元素
    return ids * 100 + classes * 10 + tags;
};

// 顯示選擇器優先級
const showCssSpecificity = (canvas, selector) => {
    const specificity = calculateCssSpecificity(selector);
    const specificityDisplay = document.createElement('p');
    specificityDisplay.textContent = `選擇器: ${selector}，優先級: ${specificity}`;
    canvas.appendChild(specificityDisplay);
};

// 清空 CSS 規則與畫布
const resetCanvasAndCss = (canvas, cssDisplay) => {
    canvas.innerHTML = ''; // 清空畫布內容
    cssRules.length = 0; // 清空 CSS 規則陣列
    updateCssDisplay(cssDisplay); // 更新 CSS 顯示
};

// 新增 CSS 規則到陣列並更新顯示
const addCssRule = (rule, cssDisplay) => {
    cssRules.push(rule);
    updateCssDisplay(cssDisplay);
};

// 匯出模組函數
export {
    updateCssDisplay,
    calculateCssSpecificity,
    showCssSpecificity,
    resetCanvasAndCss,
    addCssRule
};
