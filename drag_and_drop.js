const dragItemsContainer = document.getElementById('dragItems');
const canvas = document.getElementById('canvas');
const codeDisplay = document.getElementById('codeDisplay');

const defaultTags = `
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="headingDropdown" data-bs-toggle="dropdown" aria-expanded="false">標題 (h1-h6)
    </button>
            <ul class="dropdown-menu" aria-labelledby="headingDropdown">
                <li><a class="dropdown-item drag-item" draggable="true" data-html="<h1>標題 H1</h1>">H1</a></li>
                <li><a class="dropdown-item drag-item" draggable="true" data-html="<h2>標題 H2</h2>">H2</a></li>
                <li><a class="dropdown-item drag-item" draggable="true" data-html="<h3>標題 H3</h3>">H3</a></li>
                <li><a class="dropdown-item drag-item" draggable="true" data-html="<h4>標題 H4</h4>">H4</a></li>
                <li><a class="dropdown-item drag-item" draggable="true" data-html="<h5>標題 H5</h5>">H5</a></li>
                <li><a class="dropdown-item drag-item" draggable="true" data-html="<h6>標題 H6</h6>">H6</a></li>
            </ul>
    </div>
    <div class="drag-item" draggable="true" data-html="<p>這是一段文字</p>">段落 (p)</div>
    <div class="drag-item" draggable="true" data-html="<a href='#'>連結</a>">連結 (a)</div>
    <div class="drag-item" draggable="true" data-html="<ul><li>項目1</li><li>項目2</li></ul>">無序列表 (ul)</div>
    <div class="drag-item" draggable="true" data-html="<img src='https://via.placeholder.com/150' alt='範例圖片'>">圖片 (img)</div>
`;


// 風格與語氣標籤
const styleTags = `
    <div class="drag-item" draggable="true" data-html="<b>粗體文字</b>">風格 (b)</div>
    <div class="drag-item" draggable="true" data-html="<i>斜體文字</i>">風格 (i)</div>
    <div class="drag-item" draggable="true" data-html="<s>刪除線文字</s>">風格 (s)</div>
    <div class="drag-item" draggable="true" data-html="<u>底線文字</u>">風格 (u)</div>
    <div class="drag-item" draggable="true" data-html="<strong>加重文字</strong>">語氣 (strong)</div>
    <div class="drag-item" draggable="true" data-html="<em>強調文字</em>">語氣 (em)</div>
    <div class="drag-item" draggable="true" data-html="<del>刪除文字</del>">語氣 (del)</div>
    <div class="drag-item" draggable="true" data-html="<ins>新增文字</ins>">語氣 (ins)</div>
`;

// 結構標籤
const structureTags = `
    <div class="drag-item" draggable="true" data-html="<h1>H1</h1>">H1</div>
    <div class="drag-item" draggable="true" data-html="<h2>H2</h2>">H2</div>
    <div class="drag-item" draggable="true" data-html="<h3>H3</h3>">H3</div>
    <div class="drag-item" draggable="true" data-html="<h4>H4</h4>">H4</div>
    <div class="drag-item" draggable="true" data-html="<h5>H5</h5>">H5</div>
    <div class="drag-item" draggable="true" data-html="<h6>H6</h6>">H6</div>
    <div class="drag-item" draggable="true" data-html="<p>段落</p>">段落 (p)</div>
    <div class="drag-item" draggable="true" data-html="<hr>">水平線 (hr)</div>
    <div class="drag-item" draggable="true" data-html="<pre>預格式化文字</pre>">預格式化文字 (pre)</div>
    <div class="drag-item" draggable="true" data-html="<div>區塊元素</div>">區塊 (div)</div>
    <div class="drag-item" draggable="true" data-html="<span style='color:red;'>紅色文字</span>">行內元素 (紅色)</div>
    <div class="drag-item" draggable="true" data-html="<span style='color:blue;'>藍色文字</span>">行內元素 (藍色)</div>
    <div class="drag-item" draggable="true" data-html="<span style='color:green;'>綠色文字</span>">行內元素 (綠色)</div>
`;

// 列表標籤
const listTags = `
    <div class="drag-item" draggable="true" data-html='<ul><li>無序列表項目</li></ul>'>無序列表 (ul)</div>
    <div class="drag-item" draggable="true" data-html="<ol><li>有序列表項目</li><li>有序列表項目</li></ol>" ondblclick="showOlEditForm(this)">有序列表 (ol)</div>
    <div class="drag-item" draggable="true" data-html="<dl><dt>定義標題</dt><dd>定義內容</dd></dl>">定義列表 (dl)</div>
    <button id="configureOlButton" class="btn btn-info">設定 OL 屬性</button>
    <button id="configureLiButton" class="btn btn-warning">設定 LI 屬性</button>
`;

// 連結標籤
const linkTags = `
    <div class="drag-item" draggable="true" data-html='<a href="https://google.com" target="_blank">外部網址</a>'>外部網址</div>
    <div class="drag-item" draggable="true" data-html='<a href="internal.html">內部網頁檔案</a>'>內部網頁</div>
    <div class="drag-item" draggable="true" data-html='<a href="image.png" download>圖片下載</a>'>圖片下載</div>
    <div class="drag-item" draggable="true" data-html='<a href="mailto:example@example.com">Email</a>'>Email</div>
    <div class="drag-item" draggable="true" data-html='<a href="#codeDisplay">跳轉到段落</a>'>跳轉到段落</div>
    <div class="drag-item" draggable="true" data-html='<a href="#" target="_self">本頁導航</a>'>本頁導航</div>
`;

// 媒體標籤
const mediaTags = `
    <div class="drag-item" draggable="true" data-html='<img src="https://via.placeholder.com/150" alt="範例圖片">'>圖片</div>
    <div class="drag-item" draggable="true" data-html='<figure><img src="https://via.placeholder.com/150" alt="帶有標題的圖片"><figcaption>圖片標題</figcaption></figure>'>帶標題圖片</div>
    <div class="drag-item" draggable="true" data-html='<video src="example.mp4" controls>您的瀏覽器不支援影片播放</video>'>影片 (controls)</div>
    <div class="drag-item" draggable="true" data-html='<video src="example.mp4" loop muted poster="poster.jpg">您的瀏覽器不支援影片播放</video>'>影片 (loop, muted, poster)</div>
`;

// 表格標籤
const tableTags = `
    <div class="drag-item" draggable="true" data-html='<table border="1" style="border-collapse: collapse;">
        <thead>
            <tr>
                <th style="border: 1px solid black;">A</th>
                <th style="border: 1px solid black;">B</th>
                <th style="border: 1px solid black;">C</th>
                <th style="border: 1px solid black;">D</th>
                <th style="border: 1px solid black;">E</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid black;">A1</td>
                <td style="border: 1px solid black;">B1</td>
                <td style="border: 1px solid black;">C1</td>
                <td style="border: 1px solid black;">D1</td>
                <td style="border: 1px solid black;">E1</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;">A2</td>
                <td style="border: 1px solid black;">B2</td>
                <td style="border: 1px solid black;">C2</td>
                <td style="border: 1px solid black;">D2</td>
                <td style="border: 1px solid black;">E2</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;">A3</td>
                <td style="border: 1px solid black;">B3</td>
                <td style="border: 1px solid black;">C3</td>
                <td style="border: 1px solid black;">D3</td>
                <td style="border: 1px solid black;">E3</td>
            </tr>

        </tbody>
    </table>'>表格 (預設 4x5)</div>
    <button id="configureTableButton" class="btn btn-success">設定表格屬性</button>
`;


// 顯示列表OL屬性
const showOlForm = () => {
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

            <button type="button" id="applyOlAttributes" class="btn btn-primary mt-3">Apply Attributes</button>
            <button type="button" id="closeOlForm" class="btn btn-secondary mt-3">Close</button>
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

        dragItemsContainer.appendChild(dragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    document.getElementById('closeOlForm').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};
//// 顯示列表LI屬性
const showLiForm = () => {
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

    modal.innerHTML = `
        <form id="liForm">
            <label for="liValue">LI Value:</label>
            <input type="number" id="liValue" name="value" placeholder="設定 LI 值" class="form-control">

            <button type="button" id="applyLiAttributes" class="btn btn-primary mt-3">Apply Attributes</button>
            <button type="button" id="closeLiForm" class="btn btn-secondary mt-3">Close</button>
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

        dragItemsContainer.appendChild(dragItem);
        addDragEvents();

        document.body.removeChild(modal);
    });

    document.getElementById('closeLiForm').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
};


//顯示自訂表格標籤
const showTableForm = () => {
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

            <button type="button" id="applyTableAttributes" class="btn btn-primary mt-3">Apply</button>
            <button type="button" id="closeTableForm" class="btn btn-secondary mt-3">Close</button>
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

        for (let i = 0; i < rows-1; i++) {
            tableHtml += '<tr>';
            for (let j = 0; j < cols; j++) {
                if (j === 0 && i === 0) {
                    tableHtml += `<td style="border: 1px solid black;" rowspan="${rowspan}">A1</td>`;
                 } else if (0<i && i<rowspan && j===1){

                }
                else{
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



// 調整畫布和內容的偏移量
const adjustCanvasPosition = () => {
    const navHeight = document.querySelector('nav').offsetHeight;
    document.querySelector('.container').style.marginTop = `${navHeight + 20}px`;
};

// 初始調整
adjustCanvasPosition();
window.addEventListener('resize', adjustCanvasPosition);

// 設定拖拽事件
const addDragEvents = () => {
    document.querySelectorAll('.drag-item').forEach(item => {
        item.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/html', item.getAttribute('data-html'));
        });
    });
};

// 載入預設標籤
const loadDefaultTags = () => {
    dragItemsContainer.innerHTML = defaultTags;
    addDragEvents();
};




// 點擊「風格與語氣標籤」
document.getElementById('loadStyleTags').addEventListener('click', () => {
    dragItemsContainer.innerHTML = styleTags;
    addDragEvents();
});



// 點擊「結構標籤」
document.getElementById('loadStructureTags').addEventListener('click', () => {
    dragItemsContainer.innerHTML = structureTags;
    addDragEvents();
});


// 點擊「列表標籤」
document.getElementById('loadListTags').addEventListener('click', () => {
    dragItemsContainer.innerHTML = listTags;
    addDragEvents();

    document.getElementById('configureOlButton').addEventListener('click', showOlForm);
    document.getElementById('configureLiButton').addEventListener('click', showLiForm);
});

// 點擊「連結標籤」
document.getElementById('loadLinkTags').addEventListener('click', () => {
    dragItemsContainer.innerHTML = linkTags;
    addDragEvents();
});

// 點擊「媒體標籤」
document.getElementById('loadMediaTags').addEventListener('click', () => {
    dragItemsContainer.innerHTML = mediaTags;
    addDragEvents();
});


// 點擊「表格標籤」
document.getElementById('loadTableTags').addEventListener('click', () => {
    dragItemsContainer.innerHTML = tableTags;
    addDragEvents();

    document.getElementById('configureTableButton').addEventListener('click', showTableForm);
});


// 點擊「HTML 工具」時，回到預設標籤
document.querySelector('.navbar-brand').addEventListener('click', (e) => {
    e.preventDefault(); // 防止頁面跳轉
    loadDefaultTags();
});

addDragEvents();





// 畫庫拖放事件
canvas.addEventListener('dragover', e => e.preventDefault());
canvas.addEventListener('drop', e => {
    e.preventDefault();
    const html = e.dataTransfer.getData('text/html');
    canvas.insertAdjacentHTML('beforeend', html);
    updateCodeDisplay();
});

// 清空畫庫功能
document.getElementById('clearCanvas').addEventListener('click', () => {
    canvas.innerHTML = '<p class="text-muted">將標籤拖拽到這裡</p>';
    updateCodeDisplay();
});

// 自訂 HTML 新增功能
document.getElementById('addCustomHTML').addEventListener('click', () => {
    const customHTML = document.getElementById('customHTML').value.trim();
    if (customHTML) {
        const newItem = document.createElement('div');
        newItem.className = 'drag-item';
        newItem.draggable = true;
        newItem.setAttribute('data-html', customHTML);
        newItem.textContent = `自訂項目 - ${customHTML.slice(0, 15)}...`;
        dragItemsContainer.appendChild(newItem);
        addDragEvents();
        document.getElementById('customHTML').value = '';
    } else {
        alert('請輸入有效的 HTML 代碼！');
    }
});

// 顯示畫庫中的程式碼
function updateCodeDisplay() {
    const content = Array.from(canvas.children)
        .filter(child => !(child.tagName === 'P' && child.classList.contains('text-muted')))
        .map(child => child.outerHTML)
        .join('\n');
    codeDisplay.textContent = content;
}

document.getElementById('showCode').addEventListener('click', updateCodeDisplay);

// 初始化預設標籤
loadDefaultTags();