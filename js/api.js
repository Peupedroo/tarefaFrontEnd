function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });
    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function handleMensagem() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagemTexto = document.getElementById('msg').value;

    if (nome && email && mensagemTexto) {
        inserirMensagem(nome, email, mensagemTexto);
        document.getElementById('contactForm').reset();
        alert("Mensagem enviada com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos.");
    }
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
        dataType: 'text', // Modificado para 'text' para capturar qualquer tipo de resposta
        contentType: 'application/json',
    }).done(function(response) {
        // Aqui tentaremos parsear para JSON para garantir manipulabilidade
        try {
            var jsonResponse = JSON.parse(response);
            console.log('Sucesso:', jsonResponse);
        } catch(e) {
            console.warn('A resposta não está em formato JSON:', response);
        }

        // Insira a mensagem na tabela
        inserirMensagemNaTabela(mensagem);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Erro na comunicação com o servidor:', textStatus, errorThrown);
        alert('Erro ao enviar mensagem.');
    });
}

function validarUsuario() {
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha').value;

    console.log(`Tentando validar usuário com Email: ${email}, Senha: ${senha}`);

    const usuarioValido = {
        email: email,
        senha: senha
    };

    $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuarioValido),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).done(function(response) {
        console.log("Resposta da API: ", response);

        // Ajuste aqui conforme a estrutura da sua resposta da API:
        // Se a resposta for um objeto com { valido: true }
        if (response === true || response.valido === true) {
            console.log("Usuário validado com sucesso!");
            localStorage.setItem('adminAutenticado', 'true');
            window.location.href = 'mensagens.html';
        } else {
            console.log("Email ou senha inválidos!");
            alert('Email ou senha inválidos!');
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Erro na comunicação com o servidor:', textStatus, errorThrown);
        alert('Erro na comunicação com o servidor.');
    });
}
function inserirMensagemNaTabela(mensagem) {
    const { nome, email, mensagem: conteudoMensagem } = mensagem;
    const tabelaMensagens = document.getElementById('tabelaMensagens');

    // Verifique se a tabela existe
    if (tabelaMensagens) {
        const tbody = tabelaMensagens.getElementsByTagName('tbody')[0];
        const newRow = tbody.insertRow();

        createAndAppendCell(newRow, nome);
        createAndAppendCell(newRow, email);
        createAndAppendCell(newRow, conteudoMensagem);

        console.log('Mensagem inserida na tabela:', mensagem); // Para depuração
    } else {
        console.error('Elemento tabelaMensagens não encontrado.');
    }
}

function createAndAppendCell(row, text) {
    const newColumn = row.insertCell();
    newColumn.appendChild(document.createTextNode(text));
}

function handleMensagem() {
    // Capte os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagemTexto = document.getElementById('msg').value;

    // Envie a mensagem
    inserirMensagem(nome, email, mensagemTexto);
}

// Adiciona um listener para o evento DOMContentLoaded para garantir que o DOM está completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Simulação de envio de mensagem para teste
    //inserirMensagem('João', 'joao@example.com', 'Esta é uma mensagem de teste.');
});