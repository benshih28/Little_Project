// CSS 選擇器標籤
export  const cssTags = `
    <div class="drag-item" draggable="true" data-css="tag">標籤選擇器 (tag)</div>
    <div class="drag-item" draggable="true" data-css="#id">ID選擇器 (#id)</div>
    <div class="drag-item" draggable="true" data-css=".class">類別選擇器 (.class)</div>
    <div class="drag-item" draggable="true" data-css="!important">!important</div>
`;

// CSS 親屬標籤
export  const cssFamilyTags = `
    <div class="drag-item" draggable="true" data-css="div > h1">子選擇器 (&gt;)</div>
    <div class="drag-item" draggable="true" data-css="div h1">子孫選擇器 (space)</div>
    <div class="drag-item" draggable="true" data-css="div + h1">相鄰兄弟選擇器 (+)</div>
    <div class="drag-item" draggable="true" data-css="div ~ h1">全體兄弟選擇器 (~)</div>
`;

// CSS 虛擬類別
export  const cssPseudoClassTags = `
    <div class="drag-item" draggable="true" data-css=":link">:link</div>
    <div class="drag-item" draggable="true" data-css=":visited">:visited</div>
    <div class="drag-item" draggable="true" data-css=":hover">:hover</div>
    <div class="drag-item" draggable="true" data-css=":active">:active</div>
`;

// CSS 虛擬類別結構相關
export  const cssStructurePseudoClassTags = `
    <div class="drag-item" draggable="true" data-css=":first-child">:first-child</div>
    <div class="drag-item" draggable="true" data-css=":last-child">:last-child</div>
    <div class="drag-item" draggable="true" data-css=":nth-child(n)">:nth-child(n)</div>
    <div class="drag-item" draggable="true" data-css=":nth-of-type(n)">:nth-of-type(n)</div>
    <div class="drag-item" draggable="true" data-css=":not(selector)">:not(selector)</div>
`;
//CSS 虛擬類別選擇器
export  const cssAttributePseudoClassTags = `
    <div class="drag-item" draggable="true" data-css="::before">::before</div>
    <div class="drag-item" draggable="true" data-css="::after">::after</div>
    <div class="drag-item" draggable="true" data-css="^=">^= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="*=">*= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="$=">$= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="[]">[] 完全匹配選擇器</div>
`;

// CSS 邊框標籤
export  const cssBorderTags = `
    <div class="drag-item" draggable="true" data-css="border">預設邊框</div>
    <button id="configureBorderButton" class="btn btn-info">配置邊框屬性</button>
`;

// 初始化畫庫（CSS 第一項）
export const loadCssTags = (dragItemsContainer, canvas, cssRules, updateCssDisplay) => {
    dragItemsContainer.innerHTML = cssTags; // 加载拖曳标签
    addDragEvents();
    resetCanvasAndCss(canvas, cssRules, updateCssDisplay);
    clearCanvas(canvas, cssRules, updateCssDisplay);
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改親屬（CSS 第二項）
export const loadCssFamilyTags = (dragItemsContainer, canvas, cssRules, updateCssDisplay, updateCodeDisplayCSS_HTML) => {
    dragItemsContainer.innerHTML = cssFamilyTags;
    addDragEvents();
    resetCanvasAndCss(canvas, cssRules, updateCssDisplay);
    clearCanvasFamily(canvas, cssRules, updateCssDisplay, updateCodeDisplayCSS_HTML);
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改虛擬標籤超連結（CSS 第三項）
export const loadCssPseudoClassTags = (dragItemsContainer, canvas, cssRules, updateCssDisplay, updateCodeDisplayCSS_HTML) => {
    dragItemsContainer.innerHTML = cssPseudoClassTags;
    addDragEvents();
    resetCanvasAndCss(canvas, cssRules, updateCssDisplay);
    clearCanvasPseudoClass(canvas, cssRules, updateCssDisplay, updateCodeDisplayCSS_HTML);
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改結構相關虛擬類別（CSS 第四項）
export const loadCssStructurePseudoClassTags = (dragItemsContainer, canvas, cssRules, updateCssDisplay, updateCodeDisplayCSS_HTML) => {
    dragItemsContainer.innerHTML = cssStructurePseudoClassTags;
    addDragEvents();
    resetCanvasAndCss(canvas, cssRules, updateCssDisplay);
    clearCanvasStructurePseudoClass(canvas, cssRules, updateCssDisplay, updateCodeDisplayCSS_HTML);
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改虛擬類別選擇器（CSS 第五項）
export const loadCssAttributePseudoClassTags = (dragItemsContainer, canvas, cssRules, updateCssDisplay, updateCodeDisplayCSS_HTML) => {
    dragItemsContainer.innerHTML = cssAttributePseudoClassTags;
    addDragEvents();
    resetCanvasAndCss(canvas, cssRules, updateCssDisplay);
    clearCanvasAttributePseudoClass(canvas, cssRules, updateCssDisplay, updateCodeDisplayCSS_HTML);
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改邊框選項（CSS 第六項）
export const loadCssBorderTags = (dragItemsContainer, canvas, cssRules, updateCssDisplay) => {
    dragItemsContainer.innerHTML = cssBorderTags;
    addDragEvents();
    resetCanvasAndCss(canvas, cssRules, updateCssDisplay);
    clearCanvas(canvas, cssRules, updateCssDisplay);
    document.getElementById('customHtmlContainer').style.display = 'none';

    // 绑定配置边框按钮事件
    document.getElementById('configureBorderButton').addEventListener('click', showBorderConfigModal);
};