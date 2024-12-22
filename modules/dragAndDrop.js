// 取得畫布元素與拖放容器
const canvas = document.getElementById('canvas');
const dragItemsContainer = document.getElementById('dragItems');

// 設定拖放事件
const addDragEvents = () => {
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


canvas.addEventListener('dragover', e => e.preventDefault());
canvas.addEventListener('drop', e => {
    e.preventDefault();
    const cssData = e.dataTransfer.getData('text/css');
    const htmlData = e.dataTransfer.getData('text/html');

    const isCssFirstSection = dragItemsContainer.innerHTML.includes('標籤選擇器 (tag)'); // 判斷當前是不是CSS第一項



    if (cssData) {
        const styleTag = document.createElement('style');
        let uniqueClass = '';
        let newHtml = ''; // 用於存放新增的 HTML 結構

        // CSS 親屬選擇器
        if (cssData === 'div > h1') {
            styleTag.textContent = '#canvas > div > h1 { background-color: red; }'; // 子選擇器
        } else if (cssData === 'div h1') {
            styleTag.textContent = '#canvas div h1 { background-color: orange; }'; // 子孫選擇器
        } else if (cssData === 'div + h1') {
            styleTag.textContent = '#canvas div + h1 { background-color: green; }'; // 相鄰兄弟選擇器
        } else if (cssData === 'div ~ h1') {
            styleTag.textContent = '#canvas div ~ h1 { background-color: blue; }'; // 全體兄弟選擇器


            // CSS 虛擬類別
        } else if (cssData === ':link') {
            styleTag.textContent = '#canvas > p > a:link { color: yellowgreen; }'; // :link
            const newHtml = '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">設定超連結未連結時的顏色</a></p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === ':visited') {
            styleTag.textContent = '#canvas > p > a:visited { color: lightcoral; }'; // :visited
            const newHtml = '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">設定超連結已連結過的顏色</a></p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === ':hover') {
            styleTag.textContent = '#canvas > p > a:hover { color: lightskyblue; }'; // :hover
            const newHtml = '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">設定滑鼠移至連結上方時的顏色</a></p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === ':active') {
            styleTag.textContent = '#canvas > p > a:active { color: black; }'; // :active
            const newHtml = '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">設定超連結點選連結當下的顏色</a></p>';
            canvas.innerHTML += newHtml;


            // CSS 結構相關虛擬類別
        } else if (cssData === ':first-child') {
            styleTag.textContent = '.containerPseudoClass :first-child { color: red; }'; // 將第一個子元素設為紅色 
            const newHtml = '<p>將第一個子元素設為紅色 </p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === ':last-child') {
            styleTag.textContent = '.containerPseudoClass :last-child { color: blue; }'; // 將最後一個子元素設為藍色
            const newHtml = '<p>將最後一個子元素設為藍色 </p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === ':nth-child(n)') {
            styleTag.textContent = '.containerPseudoClass :nth-child(2) { background-color: lightgreen; }'; // 將第二個子元素背景設為淺綠色
            const newHtml = '<p>將第二個子元素背景設為淺綠色 </p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === ':nth-of-type(n)') {
            styleTag.textContent = '.containerPseudoClass p:nth-of-type(2) { font-weight: bold; }';// 將第二個 <p> 設為加粗 *
            const newHtml = '<p>參數設2 ，將第二個 &lt;p&gt; 設為加粗 </p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === ':not(selector)') {
            styleTag.textContent = '.containerPseudoClass :not(.exclude) { text-decoration: underline; }';// 不帶有 .exclude 類的元素加下劃線 
            const newHtml = '<p>參數設.exclude ，將不帶有 .exclude 類的元素加下劃線</p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === '::before') {
            styleTag.textContent = '.container p::before { content: "• "; color: orange; }'; //在段落前添加內容
            const newHtml = '<p>在段落前添加橙色圓點</p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === '::after') {
            styleTag.textContent = '.container p::after { content: " (end)"; color: gray; }'; //在段落後添加結束標記
            const newHtml = '<p>在段落後添加灰色結尾</p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === '^=') {
            styleTag.textContent = '[data-info^="start"] { font-weight: bold; }'; // 選擇屬性值開頭為 "start" 的元素
            const newHtml = '<p>選擇屬性值開頭為 "設定內容" 的元素加粗</p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === '*=') {
            styleTag.textContent = '[data-info*="middle"] { background-color: lightyellow; }';// 選擇屬性值包含 "middle" 的元素
            const newHtml = '<p>選擇屬性值包含 "設定內容" 的元素背景設為淺黃色</p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === '$=') {
            styleTag.textContent = '[data-info$="end"] { color: green; }'; //選擇屬性值結尾為 "end" 的元素
            const newHtml = '<p>選擇屬性值結尾為 "設定內容" 的元素文字顏色設為綠色</p>';
            canvas.innerHTML += newHtml;
        } else if (cssData === '[]') {
            styleTag.textContent = '[data-category="external"] { text-decoration: underline; color: blue; }'; // 完全匹配 data-category="external" 
            const newHtml = '<p>完全匹配屬性值添加下劃線，文字顏色設為藍色 </p>';
            canvas.innerHTML += newHtml;


            // CSS 邊框設定（第六項）
        } else if (cssData.includes('border')) {
            const uniqueClass = `border-item-${Date.now()}`; // 確保類名唯一
            styleTag.textContent = `.${uniqueClass} { ${cssData} }`; // 動態生成樣式
            newHtml = `<div class="${uniqueClass}"><p>${cssData}</p></div>`;
        }


        // 如果是CSS第一項，顯示選擇器優先級
        if (isCssFirstSection) {
            if (cssData === 'tag') {
                styleTag.textContent = 'p { color: green; }';
            } else if (cssData === '#id') {
                styleTag.textContent = '#example-id { color: blue; }';
            } else if (cssData === '.class') {
                styleTag.textContent = '.example-class { color: orange; }';
            } else if (cssData === '!important') {
                styleTag.textContent = 'p { color: red !important; }';
            }

            // 計算並顯示選擇器優先級
            showCssSpecificity(cssData);
        }

        // 添加樣式到畫布
        if (styleTag.textContent) {
            document.head.appendChild(styleTag);
            cssRules.push(styleTag.textContent);
            updateCssDisplay();
        }

        // 如果有新增的 HTML 結構，將其添加到畫庫
        if (newHtml) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = newHtml;
            const content = wrapper.firstElementChild;
            if (content) {
                canvas.appendChild(content);
            }
        }
    }

    if (htmlData) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = htmlData;
        const content = wrapper.firstElementChild;
        if (content) {
            canvas.appendChild(content);
        }
        updateCodeDisplay();
    }
});


// 初始化拖放事件
addDragEvents();

// 匯出模組函數
export { addDragEvents };