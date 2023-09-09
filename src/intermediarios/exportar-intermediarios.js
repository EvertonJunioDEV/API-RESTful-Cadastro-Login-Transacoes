const validarEmailCadastro = require('./usuarios/validar-email-cadastro');
const validarSenhaEEmailLogin = require('./usuarios/validar-senhaEmail-login');
const validarToken = require('./usuarios/validar-token');
const validarDados = require('./transacoes/validar-dados');
const validarAtualizacaoUsuario = require('./usuarios/validar-atualizacao-usuario');
const validarAtualizarTransacao = require('./transacoes/validar-atualizacao-transacao');
const validarExclusao = require('./transacoes/validar-exclusao');
 
module.exports = {
    validarEmailCadastro,
    validarSenhaEEmailLogin,
    validarToken,
    validarDados,
    validarAtualizacaoUsuario,
    validarAtualizarTransacao,
    validarExclusao,
};