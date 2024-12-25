import { domReferences } from './domReferences.js';

/**
 * 更新代碼顯示
 */
export const updateCodeDisplay = () => {
    const content = Array.from(domReferences.canvas.children)
        .filter(child => !(child.tagName === 'P' && child.classList.contains('text-muted')))
        .filter(child => !(child.tagName === 'P' && child.textContent.includes('用於設定網頁字符編碼，通常設置為 UTF-8。')))
        .filter(child => !(child.tagName === 'P' && child.textContent.includes('用於優化行動裝置上的顯示。')))
        .filter(child => !(child.tagName === 'P' && child.textContent.includes('已被大多數搜尋引擎忽略，現在通常不用。')))
        .filter(child => !(child.tagName === 'P' && child.textContent.includes('指示搜尋引擎是否應該索引該頁面，以及是否應跟隨頁面上的連結。')))
        .filter(child => !(child.tagName === 'P' && child.textContent.includes('用於優化社群平台上的分享效果，例如 Facebook 和 LinkedIn。')))
        .filter(child => !(child.tagName === 'P' && child.textContent.includes('告訴搜尋引擎網頁的正規版本，避免重複內容問題。')))
        .map(child => child.outerHTML)
        .join('\n');
    domReferences.codeDisplay.textContent = content;
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

        const newDragItem = document.createElement('div');
        newDragItem.className = 'drag-item';
        newDragItem.draggable = true;
        newDragItem.setAttribute('data-html', tableHtml);
        newDragItem.textContent = `表格 (${rows}x${cols})`;

        domReferences.dragItemsContainer.appendChild(newDragItem);
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

        domReferences.dragItemsContainer.appendChild(dragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    document.getElementById('closeFormContentBuilder').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};

/**
 * 處理 HTML 的拖放邏輯
 * @param {string} htmlData - 拖放的 HTML 數據
 */
export const handleHtmlDrop = (htmlData) => {
    const wrapper = document.createElement('div'); // 創建一個包裝 div
    wrapper.innerHTML = htmlData; // 將 HTML 數據設置為包裝 div 的內容
    const content = wrapper.firstElementChild; // 獲取包裝 div 的第一個子元素
    if (content) {
        if (content.tagName === 'META' || content.tagName === 'LINK') {
            let description = '';
            if (content.hasAttribute('charset')) {
                description = '用於設定網頁字符編碼，通常設置為 UTF-8。';
            } else {
                switch (content.getAttribute('name') || content.getAttribute('property') || content.getAttribute('rel')) {
                    case 'viewport':
                        description = '用於優化行動裝置上的顯示。';
                        break;
                    case 'keywords':
                        description = '已被大多數搜尋引擎忽略，現在通常不用。';
                        break;
                    case 'robots':
                        description = '指示搜尋引擎是否應該索引該頁面，以及是否應跟隨頁面上的連結。';
                        break;
                    case 'og:title':
                    case 'og:description':
                    case 'og:image':
                    case 'og:url':
                        description = '用於優化社群平台上的分享效果，例如 Facebook 和 LinkedIn。';
                        break;
                    case 'canonical':
                        description = '告訴搜尋引擎網頁的正規版本，避免重複內容問題。';
                        break;
                    default:
                        description = 'Meta 標籤';
                }
            }
            const metaDescription = document.createElement('p');
            metaDescription.textContent = description;
            domReferences.canvas.appendChild(metaDescription);
        }
        domReferences.canvas.appendChild(content); // 將內容添加到畫布
    }
};

/**
 * 將 HTML 內容添加到畫布
 * @param {string} html - 要添加到畫布的 HTML 內容
 */
export const appendHtmlToCanvas = (html) => {
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

export const simulateMobileWidth = () => {
    document.body.style.width = '375px';
    document.body.style.margin = '0 auto';
    updateCanvasMessage('手機模式: 畫布縮小到 375px');
};

export const simulateTabletWidth = () => {
    document.body.style.width = '768px';
    document.body.style.margin = '0 auto';
    updateCanvasMessage('平板模式: 畫布縮小到 768px');
};

export const simulateDesktopWidth = () => {
    document.body.style.width = '1024px';
    document.body.style.margin = '0 auto';
    updateCanvasMessage('桌面模式: 畫布放大到 1024px');
};

const updateCanvasMessage = (message) => {
    const canvas = domReferences.canvas;
    canvas.innerHTML = `<p class="text-muted">${message}</p>`;
};

// 設定拖拽事件
export const addDragEvents = () => {
    document.querySelectorAll('.drag-item').forEach(item => {
        item.addEventListener('dragstart', e => {
            const cssData = item.getAttribute('data-css');
            const htmlData = item.getAttribute('data-html');
            const cssVariable = item.getAttribute('data-css-variable');

            if (cssData) {
                e.dataTransfer.setData('text/css', cssData);
            }
            if (htmlData) {
                e.dataTransfer.setData('text/html', htmlData);
            }
            if (cssVariable) {
                e.dataTransfer.setData('text/css-variable', cssVariable);
            }
        });
    });
};
