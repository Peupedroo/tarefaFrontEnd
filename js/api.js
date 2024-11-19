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

function atualizarTabelaMensagens() {
    const mensagens = obterMensagens(); 
    const tabelaMensagens = document.getElementById('tabelaMensagens').getElementsByTagName('tbody')[0];
    tabelaMensagens.innerHTML = ''; 
    console.log(mensagens)
    
    for (let i = 0; i < mensagens.length; i++) {
        const mensagem = mensagens[i];
        const novaLinha = tabelaMensagens.insertRow();

       
        const celulaNome = novaLinha.insertCell(0);
        const celulaEmail = novaLinha.insertCell(1);
        const celulaMensagem = novaLinha.insertCell(2);

        celulaNome.textContent = mensagem.nome;
        celulaEmail.textContent = mensagem.email;
        celulaMensagem.textContent = mensagem.mensagem;
        console.log("Mensagem " + i + ": ", mensagem);

    }
}

function inserirMensagem(mensagem) {

    /*

    var mensagem = {
            nome: "nome da pessoa", 
            email: "email informado", 
            mensagem: "a mensagem informada"} 

    */

    var inserir = $.ajax({

        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function handleMensagem() {
    const txtNome = document.getElementById('nome').value;
    const txtEmail = document.getElementById('email').value;
    const txtMensagem = document.getElementById('msg').value;

    var obj = {
        nome: txtNome,
        email: txtEmail,
        mensagem: txtMensagem
    }

    
        inserirMensagem(obj);
        
        console.log(obj)
  
}




function validarUsuario() {
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha').value;

   
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