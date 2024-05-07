const fs = require('fs');
const { dialog } = require('@electron/remote/main').initialize();
''
function salvarTextoComo() {
    const conteudo = document.getElementById('editor').innerText;
    dialog.showSaveDialog({
        title: 'Salvar como',
        buttonLabel: 'Salvar',
        filters: [
            { name: 'Text Files', extensions: ['txt', 'doc'] }
        ]
    }).then(file => {
        if (!file.canceled && file.filePath) {
            fs.writeFile(file.filePath, conteudo, (err) => {
                if (err) {
                    alert('Erro ao salvar o arquivo: ' + err.message);
                } else {
                    alert('Arquivo salvo com sucesso!');
                }
            });
        }
    }).catch(err => {
        alert('Erro ao salvar o arquivo: ' + err.message);
    });
}

function execCommand(command, defaultUi = false, value = null) {
    document.execCommand(command, defaultUi, value);
}

function alternarMarcaTexto() {
    const highlightColor = 'rgba(255, 255, 0, 0.5)';
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    let range = selection.getRangeAt(0);
    let container = range.commonAncestorContainer;
    container = container.nodeType === 3 ? container.parentNode : container;

    if (container.style.backgroundColor === highlightColor) {
        container.style.backgroundColor = ''; 
    } else {
        const newSpan = document.createElement('span');
        newSpan.style.backgroundColor = highlightColor;
        range.surroundContents(newSpan);
    }
}