// utils.js: 通用工具函式

import { domReferences } from './domReferences.js';

/**
 * 更新 CSS 顯示
 * @param {HTMLElement} cssDisplay - 顯示 CSS 規則的元素
 * @param {Array} cssRules - CSS 規則陣列
 */
export const updateCssDisplay = (cssRules) => {
    domReferences.cssDisplay.textContent = cssRules.join('\n');
};


export const updateCodeDisplay = () => {
    const content = Array.from(domReferences.canvas.children)
        .filter(child => !(child.tagName === 'P' && child.classList.contains('text-muted')))
        .map(child => child.outerHTML)
        .join('\n');
    domReferences.codeDisplay.textContent = content;
};

/**
 * 計算選擇器的 CSS 優先級
 * @param {string} selector - CSS 選擇器
 * @returns {number} - 優先級數值
 */
export const calculateCssSpecificity = (selector) => {
    const ids = (selector.match(/#/g) || []).length;
    const classes = (selector.match(/(\.[\w-]+|\[[^\]]+\]|::?[\w-]+)/g) || []).length;
    const tags = (selector.match(/^[a-zA-Z]+|[ >+~][a-zA-Z]+/g) || []).length;
    return ids * 100 + classes * 10 + tags;
};

/**
 * 顯示 CSS 選擇器的優先級
 * @param {HTMLElement} canvas - 畫布元素
 * @param {string} selector - CSS 選擇器
 */
export const showCssSpecificity = (canvas, selector) => {
    const specificity = calculateCssSpecificity(selector);
    const specificityDisplay = document.createElement('p');
    specificityDisplay.textContent = `選擇器: ${selector}，優先級: ${specificity}`;
    canvas.appendChild(specificityDisplay);
};


//顯示CSS自訂邊框屬性
export const showBorderConfigModal = () => {
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
        <form id="borderForm">
            <h5>配置邊框屬性</h5>
            <label><input type="checkbox" id="borderTop" value="top"> 上邊框 (5px)</label><br>
            <label><input type="checkbox" id="borderRight" value="right"> 右邊框 (5px)</label><br>
            <label><input type="checkbox" id="borderBottom" value="bottom"> 下邊框 (5px)</label><br>
            <label><input type="checkbox" id="borderLeft" value="left"> 左邊框 (5px)</label><br>
            
            <h5>邊框樣式</h5>
            <select id="borderStyle">
                <option value="solid">實線 (solid)</option>
                <option value="dashed">虛線 (dashed)</option>
                <option value="dotted">點狀 (dotted)</option>
                <option value="double">雙線 (double)</option>
            </select>
              
            <h5>邊框顏色</h5>
            <input type="color" id="borderColor" class="form-control" value="#000000">

            <h5>邊框圓角 (px)</h5>
            <input type="number" id="borderRadius" class="form-control" placeholder="例如：10">

            
            <button type="button" id="applyBorderStyles" class="btn btn-primary mt-3">生成拖曳標籤</button>
            <button type="button" id="closeBorderConfigModal" class="btn btn-secondary mt-3">關閉</button>
        </form>
    `;

    document.body.appendChild(modal);

    // 生成拖曳標籤
    document.getElementById('applyBorderStyles').addEventListener('click', () => {
        const top = document.getElementById('borderTop').checked ? '5px' : '0';
        const right = document.getElementById('borderRight').checked ? '5px' : '0';
        const bottom = document.getElementById('borderBottom').checked ? '5px' : '0';
        const left = document.getElementById('borderLeft').checked ? '5px' : '0';
        const style = document.getElementById('borderStyle').value;
        const color = document.getElementById('borderColor').value;
        const radius = document.getElementById('borderRadius').value || '0';

        const borderCss = `
            border-top: ${top} ${style} ${color};
            border-right: ${right} ${style} ${color};
            border-bottom: ${bottom} ${style} ${color};
            border-left: ${left} ${style} ${color};
            border-radius: ${radius}px;
        `;

        const newDragItem = document.createElement('div');
        newDragItem.className = 'drag-item';
        newDragItem.draggable = true;
        newDragItem.setAttribute('data-css', borderCss);
        newDragItem.textContent = `邊框設定 (${style}, 顏色: ${color}, 圓角: ${radius}px)`;
        domReferences.dragItemsContainer.appendChild(newDragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    // 關閉彈窗
    document.getElementById('closeBorderConfigModal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};


// 顯示列表OL屬性
export const showOlForm = () => {
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
        <form id="olForm">
            <label for="olType">Type:</label>
            <input type="text" id="olType" name="type" placeholder="1, a, A, i, I" class="form-control">

            <label for="olStart">Start:</label>
            <input type="number" id="olStart" name="start" placeholder="起始數字" class="form-control">

            <div class="form-check">
                <input type="checkbox" id="olReversed" name="reversed" class="form-check-input">
                <label class="form-check-label" for="olReversed">Reversed</label>
            </div>

            <button type="button" id="applyOlAttributes" class="btn btn-primary mt-3">新增</button>
            <button type="button" id="closeOlForm" class="btn btn-secondary mt-3">關閉</button>
        </form>
    `;
    document.body.appendChild(modal);

    document.getElementById('applyOlAttributes').addEventListener('click', () => {
        const type = document.getElementById('olType').value;
        const start = document.getElementById('olStart').value;
        const reversed = document.getElementById('olReversed').checked;

        let olAttributes = '';
        if (type) olAttributes += ` type="${type}"`;
        if (start) olAttributes += ` start="${start}"`;
        if (reversed) olAttributes += ` reversed`;

        const olHtml = `<ol${olAttributes}><li>有序列表項目</li><li>有序列表項目</li><li>有序列表項目</li></ol>`;

        const dragItem = document.createElement('div');
        dragItem.className = 'drag-item';
        dragItem.draggable = true;
        dragItem.setAttribute('data-html', olHtml);
        dragItem.textContent = `有序列表 (type=${type || 'default'})`;

        domReferences.dragItemsContainer.appendChild(dragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    document.getElementById('closeOlForm').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};


// 顯示列表LI屬性
export const showLiForm = () => {
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
        <form id="liForm">
            <label for="liValue">LI Value:</label>
            <input type="number" id="liValue" name="value" placeholder="設定 LI 值" class="form-control">

            <button type="button" id="applyLiAttributes" class="btn btn-primary mt-3">新增</button>
            <button type="button" id="closeLiForm" class="btn btn-secondary mt-3">關閉</button>
        </form>
    `;
    document.body.appendChild(modal);

    document.getElementById('applyLiAttributes').addEventListener('click', () => {
        const value = document.getElementById('liValue').value;

        const liHtml = `<ol><li value="${value}">有序列表項目</li><li>有序列表項目</li><li>有序列表項目</li></ol>`;

        const dragItem = document.createElement('div');
        dragItem.className = 'drag-item';
        dragItem.draggable = true;
        dragItem.setAttribute('data-html', liHtml);
        dragItem.textContent = `LI (value=${value || 'default'})`;

        domReferences.dragItemsContainer.appendChild(dragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    document.getElementById('closeLiForm').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};

//顯示自訂表格標籤
export const showTableForm = () => {
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
        <form id="tableForm">
            <label for="rows">行數:</label>
            <input type="number" id="rows" name="rows" value="4" class="form-control">

            <label for="cols">列數:</label>
            <input type="number" id="cols" name="cols" value="5" class="form-control">

            <label for="colspan">Colspan (標題列):</label>
            <input type="number" id="colspan" name="colspan" value="2" class="form-control">

            <label for="rowspan">Rowspan (第一行):</label>
            <input type="number" id="rowspan" name="rowspan" value="2" class="form-control">

            <button type="button" id="applyTableAttributes" class="btn btn-primary mt-3">新增</button>
            <button type="button" id="closeTableForm" class="btn btn-secondary mt-3">關閉</button>
        </form>
    `;
    document.body.appendChild(modal);

    document.getElementById('applyTableAttributes').addEventListener('click', () => {
        const rows = document.getElementById('rows').value;
        const cols = document.getElementById('cols').value;
        const colspan = document.getElementById('colspan').value;
        const rowspan = document.getElementById('rowspan').value;

        let tableHtml = '<table border="1" style="border-collapse: collapse;">';

        tableHtml += '<thead><tr>';
        for (let i = 0; i < cols; i++) {
            if (i < colspan) {
                tableHtml += `<th style="border: 1px solid black;" colspan="${colspan}">A</th>`;
                i += colspan - 1;
            } else {
                tableHtml += `<th style="border: 1px solid black;">標題</th>`;
            }
        }
        tableHtml += '</tr></thead><tbody>';

        for (let i = 0; i < rows - 1; i++) {
            tableHtml += '<tr>';
            for (let j = 0; j < cols; j++) {
                if (j === 0 && i === 0) {
                    tableHtml += `<td style="border: 1px solid black;" rowspan="${rowspan}">A1</td>`;
                } else if (0 < i && i < rowspan && j === 1) {

                }
                else {
                    tableHtml += `<td style="border: 1px solid black;">資料</td>`;
                }
            }
            tableHtml += '</tr>';
        }

        tableHtml += '</tbody></table>';




        const dragItem = document.createElement('div');
        dragItem.className = 'drag-item';
        dragItem.draggable = true;
        dragItem.setAttribute('data-html', tableHtml);
        dragItem.textContent = `表格 (${rows}x${cols})`;

        dragItemsContainer.appendChild(dragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    document.getElementById('closeTableForm').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};

//顯示自訂表單標籤
export const showFormContentBuilder = () => {
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
        <form id="formContentBuilder">
            <label>選擇表單內部元素:</label>
            <div>
                <label><input type="checkbox" value="fieldset"> 外框 (fieldset)</label>
            </div>
            <div>
                <label><input type="checkbox" value="legend"> 外框說明 (legend)</label>
            </div>
            <div>
                <label><input type="checkbox" value="label"> 標籤 (label)</label>
            </div>
            <div>
                <label><input type="checkbox" value="select"> 下拉選單 (select)</label>
            </div>
            <div>
                <label><input type="checkbox" value="option"> 選項 (option)</label>
            </div>
            <div>
                <label><input type="checkbox" value="optgroup"> 選項群組 (optgroup)</label>
            </div>
            <div>
                <label><input type="checkbox" value="datalist"> 資料清單 (datalist)</label>
            </div>
            <div>
                <label><input type="checkbox" value="input-text"> 輸入框 (text)</label>
            </div>
            <div>
                <label><input type="checkbox" value="input-number"> 輸入框 (number)</label>
            </div>
            <div>
                <label><input type="checkbox" value="input-radio"> 單選框 (radio)</label>
            </div>
            <div>
                <label><input type="checkbox" value="input-date"> 日期輸入框 (date)</label>
            </div>
            <div>
                <label><input type="checkbox" value="input-tel"> 電話輸入框 (tel)</label>
            </div>
            <div>
                <label><input type="checkbox" value="input-password"> 密碼輸入框 (password)</label>
            </div>
            <div>
                <label><input type="checkbox" value="input-checkbox"> 多選框 (checkbox)</label>
            </div>

            <label for="additionalAttributes" class="mt-2">其他屬性 (適用於全部標籤):</label>
            <input type="text" id="additionalAttributes" class="form-control" placeholder="例如: placeholder='輸入文字'">

            <button type="button" id="addFormContentElements" class="btn btn-primary mt-3">新增</button>
            <button type="button" id="closeFormContentBuilder" class="btn btn-secondary mt-3">關閉</button>
        </form>
    `;
    document.body.appendChild(modal);

    document.getElementById('addFormContentElements').addEventListener('click', () => {
        const checkedElements = Array.from(modal.querySelectorAll('input[type=checkbox]:checked'));
        const additionalAttributes = document.getElementById('additionalAttributes').value;

        let formContent = '<form>';
        let fieldsetContent = '';
        let useFieldset = false;

        checkedElements.forEach(checkbox => {
            switch (checkbox.value) {
                case 'fieldset':
                    useFieldset = true;
                    fieldsetContent += `<fieldset ${additionalAttributes} style="border: 1px solid black; padding: 10px;">
                        <legend>外框說明</legend>`;
                    break;
                case 'legend':
                    fieldsetContent += `<legend ${additionalAttributes}>外框說明</legend>`;
                    break;
                case 'label':
                    fieldsetContent += `<label ${additionalAttributes}>標籤</label><br>`;
                    break;
                case 'select':
                    fieldsetContent += `<select ${additionalAttributes}><option>預設選項</option></select><br>`;
                    break;
                case 'option':
                    fieldsetContent += `<option ${additionalAttributes}>新選項</option>`;
                    break;
                case 'optgroup':
                    fieldsetContent += `<optgroup ${additionalAttributes} label='群組'><option>選項1</option></optgroup>`;
                    break;
                case 'datalist':
                    fieldsetContent += `<input list="exampleList" placeholder="選擇或輸入..."><datalist ${additionalAttributes} id='exampleList'><option value='選項一'></option><option value='選項二'></option></datalist><br>`;
                    break;
                case 'input-text':
                    fieldsetContent += `<input type="text" ${additionalAttributes}><br>`;
                    break;
                case 'input-number':
                    fieldsetContent += `<input type="number" ${additionalAttributes}><br>`;
                    break;
                case 'input-radio':
                    fieldsetContent += `<input type="radio" ${additionalAttributes}><br>`;
                    break;
                case 'input-date':
                    fieldsetContent += `<input type="date" ${additionalAttributes}><br>`;
                    break;
                case 'input-tel':
                    fieldsetContent += `<input type="tel" ${additionalAttributes}><br>`;
                    break;
                case 'input-password':
                    fieldsetContent += `<input type="password" ${additionalAttributes}><br>`;
                    break;
                case 'input-checkbox':
                    fieldsetContent += `<input type="checkbox" ${additionalAttributes}><br>`;
                    break;
            }
        });

        if (useFieldset) {
            fieldsetContent += '</fieldset>';
            formContent += fieldsetContent;
        } else {
            formContent += fieldsetContent;
        }

        formContent += '</form>';

        const dragItem = document.createElement('div');
        dragItem.className = 'drag-item';
        dragItem.draggable = true;
        dragItem.setAttribute('data-html', formContent);
        dragItem.textContent = '自訂表單';

        dragItemsContainer.appendChild(dragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    document.getElementById('closeFormContentBuilder').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};


// 設定拖拽事件
export const addDragEvents = () => {
    document.querySelectorAll('.drag-item').forEach(item => {
        item.addEventListener('dragstart', e => {

            const cssData = item.getAttribute('data-css');
            const htmlData = item.getAttribute('data-html');

            if (cssData) {
                e.dataTransfer.setData('text/css', cssData);
            }
            if (htmlData) {
                e.dataTransfer.setData('text/html', htmlData);
            }
        });
    });
};

// 新增 canvas 的 dragover 和 drop 事件處理器
export const initializeCanvasEvents = (cssRules) => {
    domReferences.canvas.addEventListener('dragover', (e) => e.preventDefault()); // 防止默認行為以允許拖放
    domReferences.canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const htmlData = e.dataTransfer.getData('text/html');
        const cssData = e.dataTransfer.getData('text/css');
        const isCssFirstSection = checkIsCssFirstSection();
        if (cssData) {
            handleCssDrop(cssData, isCssFirstSection, cssRules);
        }
        if (htmlData) {
            handleHtmlDrop(htmlData);
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
        '*=': '<p>選擇屬性值包含 "設定內容" 的元素背景設為淺黃色</p>',
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
 * 處理 HTML 的拖放邏輯
 * @param {string} htmlData - 拖放的 HTML 數據
 */
const handleHtmlDrop = (htmlData) => {
    const wrapper = document.createElement('div'); // 創建一個包裝 div
    wrapper.innerHTML = htmlData; // 將 HTML 數據設置為包裝 div 的內容
    const content = wrapper.firstElementChild; // 獲取包裝 div 的第一個子元素
    if (content) {
        domReferences.canvas.appendChild(content); // 將內容添加到畫布
    }
};

/**
 * 處理 CSS 第一部分的特殊邏輯
 * @param {string} cssData - CSS 數據
 * @param {HTMLElement} styleTag - 用於存放 CSS 規則的 style 標籤
 */
const handleCssFirstSection = (cssData, styleTag) => {
    const cssFirstSectionMap = {
        tag: 'p { color: green; }',
        '#id': '#example-id { color: blue; }',
        '.class': '.example-class { color: orange; }',
        '!important': 'p { color: red !important; }',
    };

    if (cssFirstSectionMap[cssData]) {
        styleTag.textContent = cssFirstSectionMap[cssData]; // 設置對應的 CSS
        showCssSpecificity(cssData); // 顯示 CSS 特異性
    }
};

/**
 * 將 HTML 內容添加到畫布
 * @param {string} html - 要添加到畫布的 HTML 內容
 */
const appendHtmlToCanvas = (html) => {
    const wrapper = document.createElement('div'); // 創建一個包裝 div
    wrapper.innerHTML = html; // 將 HTML 設置為包裝 div 的內容
    const content = wrapper.firstElementChild; // 獲取包裝 div 的第一個子元素
    if (content) {
        domReferences.canvas.appendChild(content); // 將內容添加到畫布
    }
};


// 初始調整
export const adjustCanvasPosition = () => {
    const navHeight = document.querySelector('nav').offsetHeight;
    document.querySelector('.container').style.marginTop = `${navHeight + 20}px`;
};
adjustCanvasPosition();
window.addEventListener('resize', adjustCanvasPosition);