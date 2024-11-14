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

function inserirMensagem(nome, email, mensagemTexto) {


    var mensagem = {
            nome: nome,
            email: email,
            mensagem: mensagemTexto
    }

    

    var inserir = $.ajax({

        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function validarUsuario(email, senha ) {

    //email: admin@admin.com
    // senha: '1234'
    const usuarioValido = {
        email: 'admin@admin.com',
        senha: '1234'
    };
    let validarEmail = false;
    let validarSenha = false;


    const objLoginSenha = {
            email: email,
            senha: senha
    }
    if (email === usuarioValido.email) {
        validarEmail = true;
    }
    if (senha === usuarioValido.senha) {
        validarSenha = true;
    }

    // Retorno da validação local
    if (validarEmail && validarSenha) {
        return true; // Caso o usuário e senha sejam válidos localmente
    }





    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    return retorno;
}