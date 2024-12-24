// CSS 選擇器標籤
export const cssTags = `
    <div class="drag-item" draggable="true" data-css="tag">標籤選擇器 (tag)</div>
    <div class="drag-item" draggable="true" data-css="#id">ID選擇器 (#id)</div>
    <div class="drag-item" draggable="true" data-css=".class">類別選擇器 (.class)</div>
    <div class="drag-item" draggable="true" data-css="!important">!important</div>
`;

// CSS 親屬標籤
export const cssFamilyTags = `
    <div class="drag-item" draggable="true" data-css="div > h1">子選擇器 (&gt;)</div>
    <div class="drag-item" draggable="true" data-css="div h1">子孫選擇器 (space)</div>
    <div class="drag-item" draggable="true" data-css="div + h1">相鄰兄弟選擇器 (+)</div>
    <div class="drag-item" draggable="true" data-css="div ~ h1">全體兄弟選擇器 (~)</div>
`;

// CSS 虛擬類別
export const cssPseudoClassTags = `
    <div class="drag-item" draggable="true" data-css=":link">:link</div>
    <div class="drag-item" draggable="true" data-css=":visited">:visited</div>
    <div class="drag-item" draggable="true" data-css=":hover">:hover</div>
    <div class="drag-item" draggable="true" data-css=":active">:active</div>
`;

// CSS 虛擬類別結構相關
export const cssStructurePseudoClassTags = `
    <div class="drag-item" draggable="true" data-css=":first-child">:first-child</div>
    <div class="drag-item" draggable="true" data-css=":last-child">:last-child</div>
    <div class="drag-item" draggable="true" data-css=":nth-child(n)">:nth-child(n)</div>
    <div class="drag-item" draggable="true" data-css=":nth-of-type(n)">:nth-of-type(n)</div>
    <div class="drag-item" draggable="true" data-css=":not(selector)">:not(selector)</div>
`;
//CSS 虛擬類別選擇器
export const cssAttributePseudoClassTags = `
    <div class="drag-item" draggable="true" data-css="::before">::before</div>
    <div class="drag-item" draggable="true" data-css="::after">::after</div>
    <div class="drag-item" draggable="true" data-css="^=">^= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="*=">*= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="$=">$= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="[]">[] 完全匹配選擇器</div>
`;

// CSS 邊框標籤
export const cssBorderTags = `
    <div class="drag-item" draggable="true" data-css="border">預設邊框</div>
    <button id="configureBorderButton" class="btn btn-info">配置邊框屬性</button>
`;


//跳轉首頁結構
export const defaultTags = `
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
export const styleTags = `
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
export const structureTags = `
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
export const listTags = `
    <div class="drag-item" draggable="true" data-html='<ul><li>無序列表項目</li></ul>'>無序列表 (ul)</div>
    <div class="drag-item" draggable="true" data-html="<ol><li>有序列表項目</li><li>有序列表項目</li></ol>" ondblclick="showOlEditForm(this)">有序列表 (ol)</div>
    <div class="drag-item" draggable="true" data-html="<dl><dt>定義標題</dt><dd>定義內容</dd></dl>">定義列表 (dl)</div>
    <button id="configureOlButton" class="btn btn-info">設定 OL 屬性</button>
    <button id="configureLiButton" class="btn btn-warning">設定 LI 屬性</button>
`;

// 連結標籤
export const linkTags = `
    <div class="drag-item" draggable="true" data-html='<a href="https://google.com" target="_blank">外部網址</a>'>外部網址</div>
    <div class="drag-item" draggable="true" data-html='<a href="internal.html">內部網頁檔案</a>'>內部網頁</div>
    <div class="drag-item" draggable="true" data-html='<a href="image.png" download>圖片下載</a>'>圖片下載</div>
    <div class="drag-item" draggable="true" data-html='<a href="mailto:example@example.com">Email</a>'>Email</div>
    <div class="drag-item" draggable="true" data-html='<a href="#codeDisplay">跳轉到段落</a>'>跳轉到段落</div>
    <div class="drag-item" draggable="true" data-html='<a href="#" target="_self">本頁導航</a>'>本頁導航</div>
`;

// 媒體標籤
export const mediaTags = `
    <div class="drag-item" draggable="true" data-html='<img src="https://via.placeholder.com/150" alt="範例圖片">'>圖片</div>
    <div class="drag-item" draggable="true" data-html='<figure><img src="https://via.placeholder.com/150" alt="帶有標題的圖片"><figcaption>圖片標題</figcaption></figure>'>帶標題圖片</div>
    <div class="drag-item" draggable="true" data-html='<video src="example.mp4" controls>您的瀏覽器不支援影片播放</video>'>影片 (controls)</div>
    <div class="drag-item" draggable="true" data-html='<video src="example.mp4" loop muted poster="poster.jpg">您的瀏覽器不支援影片播放</video>'>影片 (loop, muted, poster)</div>
`;

// 表格標籤
export const tableTags = `
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

// 表單標籤
export const formTags = `
    <div class="drag-item" draggable="true" data-html='<form><select><option>預設選項</option></select></form>'>表單 (form)</div>
    <button id="configureFormButton" class="btn btn-success">設定表單內容</button>
`;
