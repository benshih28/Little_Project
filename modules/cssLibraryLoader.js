import { addDragEvents } from './dragAndDrop.js';
import { resetCanvasAndCss } from './cssTools.js';
import { clearCanvas, clearCanvasFamily, clearCanvasPseudoClass, clearCanvasStructurePseudoClass, clearCanvasAttributePseudoClass } from './htmlTools.js';
import { showBorderConfigModal } from './modalBuilder.js';
import {
    cssTags,
    cssFamilyTags,
    cssPseudoClassTags,
    cssStructurePseudoClassTags,
    cssAttributePseudoClassTags,
    cssBorderTags
} from './cssSelectorTags.js';

// 初始化畫庫（CSS 第一項）
const loadCssTags = (dragItemsContainer, cssDisplay) => {
    dragItemsContainer.innerHTML = cssTags;
    addDragEvents();
    resetCanvasAndCss(document.getElementById('canvas'), cssDisplay);
    clearCanvas(document.getElementById('canvas'), [], cssDisplay);
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改親屬（CSS 第二項）
const loadCssFamilyTags = (dragItemsContainer, cssDisplay) => {
    dragItemsContainer.innerHTML = cssFamilyTags;
    addDragEvents();
    resetCanvasAndCss(document.getElementById('canvas'), cssDisplay);
    clearCanvasFamily(document.getElementById('canvas'));
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改虛擬標籤超連結（CSS 第三項）
const loadCssPseudoClassTags = (dragItemsContainer, cssDisplay) => {
    dragItemsContainer.innerHTML = cssPseudoClassTags;
    addDragEvents();
    resetCanvasAndCss(document.getElementById('canvas'), cssDisplay);
    clearCanvasPseudoClass(document.getElementById('canvas'));
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改結構相關虛擬類別（CSS 第四項）
const loadCssStructurePseudoClassTags = (dragItemsContainer, cssDisplay) => {
    dragItemsContainer.innerHTML = cssStructurePseudoClassTags;
    addDragEvents();
    resetCanvasAndCss(document.getElementById('canvas'), cssDisplay);
    clearCanvasStructurePseudoClass(document.getElementById('canvas'));
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改虛擬類別選擇器（CSS 第五項）
const loadCssAttributePseudoClassTags = (dragItemsContainer, cssDisplay) => {
    dragItemsContainer.innerHTML = cssAttributePseudoClassTags;
    addDragEvents();
    resetCanvasAndCss(document.getElementById('canvas'), cssDisplay);
    clearCanvasAttributePseudoClass(document.getElementById('canvas'));
    document.getElementById('customHtmlContainer').style.display = 'none';
};

// 初始化畫庫預設標籤畫庫改邊框選項（CSS 第六項）
const loadCssBorderTags = (dragItemsContainer, cssDisplay) => {
    dragItemsContainer.innerHTML = cssBorderTags;
    addDragEvents();
    resetCanvasAndCss(document.getElementById('canvas'), cssDisplay);
    clearCanvas(document.getElementById('canvas'), [], cssDisplay);
    document.getElementById('customHtmlContainer').style.display = 'none';
    document.getElementById('configureBorderButton').addEventListener('click', showBorderConfigModal);
};

const clearCanvasFamily = () => {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = `
        <div>
    <h1>兒子-1</h1>
    <section>
        <h1>孫子</h1>
        <section>
            <h1>曾孫</h1>
        </section>
    </section>
    <h1>兒子-2</h1>
</div>
<h1>伯父</h1>
<h1>叔叔</h1>
<p>隔壁鄰居-1</p>
    `;

    const existingStyles = document.querySelectorAll('style');
    existingStyles.forEach(styleTag => styleTag.remove());

    const cssRules = [];
    resetCanvasAndCss(canvas, cssRules);
};

const clearCanvasPseudoClass = () => {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '<p><a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">CSS Pseudo-classes</a></p>';
    const cssRules = [];

    const existingStyles = document.querySelectorAll('style');
    existingStyles.forEach(styleTag => styleTag.remove());
    resetCanvasAndCss(canvas, cssRules);
};

const clearCanvasStructurePseudoClass = () => {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = `
<div class="containerPseudoClass">
    <p>Paragraph 1</p>
    <span>Span 1</span>
    <p>Paragraph 2</p>
    <span class="exclude">Span 2</span>
    <p>Paragraph 3</p>
</div>
    `;
    const cssRules = [];
    const existingStyles = document.querySelectorAll('style');
    existingStyles.forEach(styleTag => styleTag.remove());
    resetCanvasAndCss(canvas, cssRules);
};

const clearCanvasAttributePseudoClass = () => {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = `
<div class="container">
    <p id="intro" data-info="start">Introduction</p>
    <p class="content" data-info="middle">Main Content</p>
    <p class="content" data-info="end">Conclusion</p>
    <a href="https://example.com" class="link" data-category="external">Visit Example</a>
</div>
    `;
    const cssRules = [];
    resetCanvasAndCss(canvas, cssRules);
};

export {
    loadCssTags,
    loadCssFamilyTags,
    loadCssPseudoClassTags,
    loadCssStructurePseudoClassTags,
    loadCssAttributePseudoClassTags,
    loadCssBorderTags,
    clearCanvasFamily,
    clearCanvasPseudoClass,
    clearCanvasStructurePseudoClass,
    clearCanvasAttributePseudoClass
};
