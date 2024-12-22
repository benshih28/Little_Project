// CSS 選擇器標籤
const cssTags = `
    <div class="drag-item" draggable="true" data-css="tag">標籤選擇器 (tag)</div>
    <div class="drag-item" draggable="true" data-css="#id">ID選擇器 (#id)</div>
    <div class="drag-item" draggable="true" data-css=".class">類別選擇器 (.class)</div>
    <div class="drag-item" draggable="true" data-css="!important">!important</div>
`;

// CSS 親屬標籤
const cssFamilyTags = `
    <div class="drag-item" draggable="true" data-css="div > h1">子選擇器 (&gt;)</div>
    <div class="drag-item" draggable="true" data-css="div h1">子孫選擇器 (space)</div>
    <div class="drag-item" draggable="true" data-css="div + h1">相鄰兄弟選擇器 (+)</div>
    <div class="drag-item" draggable="true" data-css="div ~ h1">全體兄弟選擇器 (~)</div>
`;

// CSS 虛擬類別
const cssPseudoClassTags = `
    <div class="drag-item" draggable="true" data-css=":link">:link</div>
    <div class="drag-item" draggable="true" data-css=":visited">:visited</div>
    <div class="drag-item" draggable="true" data-css=":hover">:hover</div>
    <div class="drag-item" draggable="true" data-css=":active">:active</div>
`;

// CSS 虛擬類別結構相關
const cssStructurePseudoClassTags = `
    <div class="drag-item" draggable="true" data-css=":first-child">:first-child</div>
    <div class="drag-item" draggable="true" data-css=":last-child">:last-child</div>
    <div class="drag-item" draggable="true" data-css=":nth-child(n)">:nth-child(n)</div>
    <div class="drag-item" draggable="true" data-css=":nth-of-type(n)">:nth-of-type(n)</div>
    <div class="drag-item" draggable="true" data-css=":not(selector)">:not(selector)</div>
`;

// CSS 虛擬類別選擇器
const cssAttributePseudoClassTags = `
    <div class="drag-item" draggable="true" data-css="::before">::before</div>
    <div class="drag-item" draggable="true" data-css="::after">::after</div>
    <div class="drag-item" draggable="true" data-css="^=">^= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="*=">*= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="$=">$= 選擇器</div>
    <div class="drag-item" draggable="true" data-css="[]">[] 完全匹配選擇器</div>
`;

// CSS 邊框標籤
const cssBorderTags = `
    <div class="drag-item" draggable="true" data-css="border">預設邊框</div>
    <button id="configureBorderButton" class="btn btn-info">配置邊框屬性</button>
`;

// 匯出所有標籤
export {
    cssTags,
    cssFamilyTags,
    cssPseudoClassTags,
    cssStructurePseudoClassTags,
    cssAttributePseudoClassTags,
    cssBorderTags
};
