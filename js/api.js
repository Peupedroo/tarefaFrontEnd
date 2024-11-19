function obterMensagens() {
    var retorno = [];

    $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).done(function(data) {
        retorno = data;
    }).fail(function() {
        console.error('Erro ao obter mensagens.');
    });

    return retorno;
}

function inserirMensagem(nome, email, mensagemTexto) {
    var mensagem = {
        nome: nome,
        email: email,
        mensagem: mensagemTexto
    };

    $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        success: function() {
            console.log('Mensagem enviada com sucesso!');
            atualizarTabelaMensagens(); 
        },
        error: function() {
            console.error('Erro ao enviar mensagem.');
        }
    });
}

function handleMensagem() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagemTexto = document.getElementById('msg').value;

    if (nome && email && mensagemTexto) {
        inserirMensagem(nome, email, mensagemTexto);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function atualizarTabelaMensagens() {
    const mensagens = obterMensagens();
    const tabelaMensagens = document.getElementById('tabelaMensagens').getElementsByTagName('tbody')[0];
    tabelaMensagens.innerHTML = ''; 

    mensagens.forEach(mensagem => {
        inserirMensagemNaTabela(mensagem);
    });
}

function inserirMensagemNaTabela(mensagem) {
    const { nome, email, mensagem: conteudoMensagem } = mensagem;
    const tabelaMensagens = document.getElementById('tabelaMensagens');

    if (tabelaMensagens) {
        const tbody = tabelaMensagens.getElementsByTagName('tbody')[0];
        const newRow = tbody.insertRow();

        createAndAppendCell(newRow, nome);
        createAndAppendCell(newRow, email);
        createAndAppendCell(newRow, conteudoMensagem);

        console.log('Mensagem inserida na tabela:', mensagem);
    } else {
        console.error('Elemento tabelaMensagens não encontrado.');
    }
}

function createAndAppendCell(row, text) {
    const newColumn = row.insertCell();
    newColumn.appendChild(document.createTextNode(text));
}
