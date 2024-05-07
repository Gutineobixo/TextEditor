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
    const highlightColor = 'rgba(255, 255, 0, 0.5)'; // Cor do marca-texto
    const selection = window.getSelection(); // Obter a seleção atual

    if (!selection.rangeCount || selection.isCollapsed) return; // Não fazer nada se não há seleção ou se ela é um ponto de inserção

    const range = selection.getRangeAt(0); // Obter o range da seleção
    const selectedText = range.toString(); // Obter o texto selecionado

    if (selectedText.length === 0) return; // Se não há texto selecionado, retorna

    const documentFragment = range.extractContents(); // Extrair o conteúdo da seleção
    const span = document.createElement('span'); // Criar um novo elemento span
    span.style.backgroundColor = highlightColor; // Definir a cor de fundo do span
    span.appendChild(documentFragment); // Adicionar o conteúdo extraído ao span

    range.insertNode(span); // Inserir o span no lugar original

    // Limpar a seleção para evitar múltiplas marcações ao clicar repetidamente
    selection.removeAllRanges();
    const newRange = document.createRange(); // Criar um novo range
    newRange.selectNodeContents(span); // Selecionar o conteúdo do novo span
    selection.addRange(newRange); // Adicionar o novo range à seleção
}
