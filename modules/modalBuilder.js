// 模組化: modalBuilder.js

// 創建模態框
const createModal = (title, content, buttons) => {
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

    const header = document.createElement('h5');
    header.textContent = title;
    modal.appendChild(header);

    const body = document.createElement('div');
    body.innerHTML = content;
    modal.appendChild(body);

    const footer = document.createElement('div');
    footer.style.marginTop = '15px';
    footer.style.textAlign = 'right';
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.label;
        btn.className = button.class || 'btn btn-secondary';
        btn.addEventListener('click', button.onClick);
        footer.appendChild(btn);
    });
    modal.appendChild(footer);

    document.body.appendChild(modal);

    return modal;
};

// 關閉模態框
const closeModal = (modal) => {
    document.body.removeChild(modal);
};

// 預設模態框示例
const showDefaultModal = (title, message) => {
    const modal = createModal(title, `<p>${message}</p>`, [
        {
            label: '關閉',
            class: 'btn btn-secondary',
            onClick: () => closeModal(modal)
        }
    ]);
};

// 匯出模組函數
export {
    createModal,
    closeModal,
    showDefaultModal
};
