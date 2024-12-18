const dragItemsContainer = document.getElementById('dragItems');
const canvas = document.getElementById('canvas');
const codeDisplay = document.getElementById('codeDisplay');

const defaultTags = `
    <div class="drag-item" draggable="true" data-html="<h1>標題 H1</h1>">標題 (h1)</div>
    <div class="drag-item" draggable="true" data-html="<p>這是一段文字</p>">段落 (p)</div>
    <div class="drag-item" draggable="true" data-html="<a href='#'>連結</a>">連結 (a)</div>
    <div class="drag-item" draggable="true" data-html="<ul><li>項目1</li><li>項目2</li></ul>">無序列表 (ul)</div>
    <div class="drag-item" draggable="true" data-html="<img src='https://via.placeholder.com/150' alt='範例圖片'>">圖片 (img)</div>
`;



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




// 點擊 HTML 第一個選項，載入「風格與語氣標籤」
document.getElementById('loadStyleTags').addEventListener('click', () => {
    dragItemsContainer.innerHTML = `
        <div class="drag-item" draggable="true" data-html="<b>粗體文字</b>">風格 (b)</div>
        <div class="drag-item" draggable="true" data-html="<i>斜體文字</i>">風格 (i)</div>
        <div class="drag-item" draggable="true" data-html="<s>刪除線文字</s>">風格 (s)</div>
        <div class="drag-item" draggable="true" data-html="<u>底線文字</u>">風格 (u)</div>
        <div class="drag-item" draggable="true" data-html="<strong>加重文字</strong>">語氣 (strong)</div>
        <div class="drag-item" draggable="true" data-html="<em>強調文字</em>">語氣 (em)</div>
        <div class="drag-item" draggable="true" data-html="<del>刪除文字</del>">語氣 (del)</div>
        <div class="drag-item" draggable="true" data-html="<ins>新增文字</ins>">語氣 (ins)</div>
    `;
    addDragEvents();
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