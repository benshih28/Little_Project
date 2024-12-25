import { domReferences } from './domReferences.js';
import { handleHtmlDrop, updateCodeDisplay, appendHtmlToCanvas, addDragEvents } from './htmlUtils.js'; // 修改為從 htmlUtils.js 導入 handleHtmlDrop, updateCodeDisplay, appendHtmlToCanvas 和 addDragEvents

/**
 * 更新 CSS 顯示
 * @param {Array} cssRules - CSS 規則陣列
 */
export const updateCssDisplay = (cssRules) => {
    if (domReferences.cssDisplay && cssRules) {
        domReferences.cssDisplay.textContent = cssRules.join('\n');
    }
};

/**
 * 計算選擇器的 CSS 優先級
 * @param {string} selector - CSS 選擇器
 * @returns {number} - 優先級數值
 */
export const calculateCssSpecificity = (selector) => {
    if (!selector) {
        return 0;
    }
    const ids = (selector.match(/#/g) || []).length;
    const classes = (selector.match(/(\.[\w-]+|\[[^\]]+\]|::?[\w-]+)/g) || []).length;
    const tags = (selector.match(/^[a-zA-Z]+|[ >+~][a-zA-Z]+/g) || []).length;
    return ids * 100 + classes * 10 + tags;
};

/**
 * 顯示 CSS 選擇器的優先級
 * @param {string} selector - CSS 選擇器
 */
export const showCssSpecificity = (selector) => {
    const canvas = domReferences.canvas;
    if (!canvas || !(canvas instanceof HTMLElement)) {
        console.error('Invalid canvas element');
        return;
    }
    const specificity = calculateCssSpecificity(selector);
    const specificityElement = document.createElement('p');
    specificityElement.textContent = `選擇器: ${selector}，優先級: ${specificity}`;
    canvas.appendChild(specificityElement);
};

/**
 * 顯示 CSS 變數配置彈窗
 */
export const showCssVariableConfigModal = () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    modal.style.width = '400px';

    modal.innerHTML = `
        <form id="cssVariableForm">
            <h5>配置 CSS 變數</h5>
            <label for="mainColor">主色調:</label>
            <input type="color" id="mainColor" class="form-control" value="#4caf50">

            <label for="padding" class="mt-2">內距 (px):</label>
            <input type="number" id="padding" class="form-control" placeholder="例如：20">

            <label for="fontSize" class="mt-2">字體大小 (px):</label>
            <input type="number" id="fontSize" class="form-control" placeholder="例如：16">

            <button type="button" id="applyCssVariables" class="btn btn-primary mt-3">生成拖曳標籤</button>
            <button type="button" id="closeCssVariableConfigModal" class="btn btn-secondary mt-3">關閉</button>
        </form>
    `;

    document.body.appendChild(modal);

    // 生成拖曳標籤
    document.getElementById('applyCssVariables').addEventListener('click', () => {
        const mainColor = document.getElementById('mainColor').value;
        const padding = document.getElementById('padding').value || '20';
        const fontSize = document.getElementById('fontSize').value || '16';

        const cssVariables = `
            --main-color: ${mainColor};
            --padding: ${padding}px;
            --font-size: ${fontSize}px;
        `;

        const newDragItem = document.createElement('div');
        newDragItem.className = 'drag-item';
        newDragItem.draggable = true;
        newDragItem.setAttribute('data-css-variable', cssVariables);
        newDragItem.textContent = `CSS 變數 (主色調: ${mainColor}, 內距: ${padding}px, 字體大小: ${fontSize}px)`;
        domReferences.dragItemsContainer.appendChild(newDragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    // 關閉彈窗
    document.getElementById('closeCssVariableConfigModal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};

// 處理 CSS 變數的拖放邏輯
const handleCssVariableDrop = (cssVariable, cssRules = []) => {
    const rootStyle = document.documentElement.style;
    const variables = cssVariable.split(';').filter(Boolean);
    variables.forEach(variable => {
        const [name, value] = variable.split(':');
        if (name && value) {
            rootStyle.setProperty(name.trim(), value.trim());
        }
    });

    // 更新或添加 CSS 變數的規則
    let styleTag = document.querySelector('style[data-css-variables]');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.setAttribute('data-css-variables', 'true');
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = `
        :root {
            ${cssVariable}
        }
    `;
    cssRules.push(styleTag.textContent);
    updateCssDisplay(cssRules);
}; 

// 新增 canvas 的 dragover 和 drop 事件處理器
export const initializeCanvasEvents = (cssRules) => {
    const canvas = domReferences.canvas;
    if (!canvas) {
        console.error('Invalid canvas element');
        return;
    }
    canvas.addEventListener('dragover', (e) => e.preventDefault()); // 防止默認行為以允許拖放
    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const htmlData = e.dataTransfer.getData('text/html');
        const cssData = e.dataTransfer.getData('text/css');
        const cssVariable = e.dataTransfer.getData('text/css-variable');
        const isCssFirstSection = checkIsCssFirstSection();
        if (cssData) {
            handleCssDrop(cssData, isCssFirstSection, cssRules);
        }
        if (htmlData) {
            handleHtmlDrop(htmlData);
        }
        if (cssVariable) {
            handleCssVariableDrop(cssVariable, cssRules);
        }
        updateCodeDisplay();
    });
};

const checkIsCssFirstSection = () => {
    return domReferences.dragItemsContainer.innerHTML.includes('標籤選擇器 (tag)');
};

const handleCssDrop = (cssData, isCssFirstSection, cssRules) => {
    const styleTag = document.createElement('style'); // 創建一個 <style> 標籤
    let newHtml = ''; // 用於存放新增的 HTML 結構

    // CSS 選擇器和樣式的映射表
    const cssRulesMap = {
        'div > h1': '#canvas > div > h1 { background-color: red; }',
        'div h1': '#canvas div h1 { background-color: orange; }',
        'div + h1': '#canvas div + h1 { background-color: green; }',
        'div ~ h1': '#canvas div ~ h1 { background-color: blue; }',
        ':link': '#canvas > p > a:link { color: yellowgreen; }',
        ':visited': '#canvas > p > a:visited { color: lightcoral; }',
        ':hover': '#canvas > p > a:hover { color: lightskyblue; }',
        ':active': '#canvas > p > a:active { color: black; }',
        ':first-child': '.containerPseudoClass :first-child { color: red; }',
        ':last-child': '.containerPseudoClass :last-child { color: blue; }',
        ':nth-child(n)': '.containerPseudoClass :nth-child(2) { background-color: lightgreen; }',
        ':nth-of-type(n)': '.containerPseudoClass p:nth-of-type(2) { font-weight: bold; }',
        ':not(selector)': '.containerPseudoClass :not(.exclude) { text-decoration: underline; }',
        '::before': '.container p::before { content: "• "; color: orange; }',
        '::after': '.container p::after { content: " (end)"; color: gray; }',
        '^=': '[data-info^="start"] { font-weight: bold; }',
        '*=': '[data-info*="middle"] { background-color: lightyellow; }',
        '$=': '[data-info$="end"] { color: green; }',
        '[]': '[data-category="external"] { text-decoration: underline; color: blue; }',
        'inheritance': '.child { border: 1px dashed gray; padding: 5px; }',
    };

    // 將 CSS 對應的 HTML 內容添加到畫布的映射表
    const htmlContentMap = {
        ':link': '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">設定超連結未連結時的顏色</a></p>',
        ':visited': '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">設定超連結已連結過的顏色</a></p>',
        ':hover': '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">設定滑鼠移至連結上方時的顏色</a></p>',
        ':active': '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">設定超連結點選連結當下的顏色</a></p>',
        ':first-child': '<p>將第一個子元素設為紅色 </p>',
        ':last-child': '<p>將最後一個子元素設為藍色 </p>',
        ':nth-child(n)': '<p>將第二個子元素背景設為淺綠色 </p>',
        ':nth-of-type(n)': '<p>參數設2 ，將第二個 &lt;p&gt; 設為加粗 </p>',
        ':not(selector)': '<p>參數設.exclude ，將不帶有 .exclude 類的元素加下劃線</p>',
        '::before': '<p>在段落前添加橙色圓點</p>',
        '::after': '<p>在段落後添加灰色結尾</p>',
        '^=': '<p>選擇屬性值開頭為 "設定內容" 的元素加粗</p>',
        '*=': '<p>選擇屬性值包含 "設定內容" 的元素背景設為淺綠色</p>',
        '$=': '<p>選擇屬性值結尾為 "設定內容" 的元素文字顏色設為綠色</p>',
        '[]': '<p>完全匹配屬性值添加下劃線，文字顏色設為藍色 </p>',
    };

    // 檢查是否有對應的 CSS 規則
    if (cssRulesMap[cssData]) {
        styleTag.textContent = cssRulesMap[cssData]; // 添加 CSS 規則
        newHtml = htmlContentMap[cssData] || ''; // 獲取對應的 HTML
    } else if (cssData.includes('border')) {
        // 對於邊框樣式生成動態類
        const uniqueClass = `border-item-${Date.now()}`; // 確保類名唯一
        styleTag.textContent = `.${uniqueClass} { ${cssData} }`; // 動態生成樣式
        newHtml = `<div class="${uniqueClass}"><p>${cssData}</p></div>`;
    }

    // 如果是 CSS 第一部分，特殊處理
    if (isCssFirstSection) {
        handleCssFirstSection(cssData, styleTag);
    }

    // 如果有樣式則添加到文檔中
    if (styleTag.textContent) {
        document.head.appendChild(styleTag); // 將樣式添加到 <head>
        cssRules.push(styleTag.textContent); // 更新 CSS 規則
        updateCssDisplay(cssRules); // 刷新顯示
    }

    // 如果有 HTML 則添加到畫布中
    if (newHtml) {
        appendHtmlToCanvas(newHtml);
    }
};

/**
 * 處理 CSS 第一部分的特殊邏輯
 * @param {string} cssData - CSS 數據
 * @param {HTMLElement} styleTag - 用於存放 CSS 規則的 style 標籤
 */
const handleCssFirstSection = (cssData, styleTag) => {
    const canvas = domReferences.canvas;
    const cssFirstSectionMap = {
        tag: 'p { color: green; }',
        '#id': '#example-id { color: blue; }',
        '.class': '.example-class { color: orange; }',
        '!important': 'p { color: red !important; }',
    };

    if (cssFirstSectionMap[cssData]) {
        styleTag.textContent = cssFirstSectionMap[cssData]; // 設置對應的 CSS
        showCssSpecificity(cssFirstSectionMap[cssData]); // 顯示 CSS 特異性
    }
};
