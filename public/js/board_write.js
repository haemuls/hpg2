// script.js
document.addEventListener("DOMContentLoaded", function() {
    const Editor = toastui.Editor;
    const editor = new Editor({
        el: document.querySelector('#editor'),
        height: '400px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        toolbarItems: [
            'heading', 'bold', 'italic', 'strike', 'divider', 'hr', 'quote', 'divider',
            'ul', 'ol', 'task', 'indent', 'outdent', 'divider', 'table', 'image', 'link', 'divider',
            'code', 'codeblock', 'divider', 'scrollSync', 'preview', 'fullscreen'
        ]
    });
});