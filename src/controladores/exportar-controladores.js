const cadastrarUsuario = require('./usuarios/cadastrar-usuario');
const listarCategorias = require('./categorias/listar-categorias');
const loginUsuario = require('./usuarios/login-usuario');
const detalharUsuario = require('./usuarios/detalhar-usuario');
const cadastrarTransacao = require('./transacoes/cadastrar-transacao');
const listarTransacoesCategoria = require('./transacoes/listar-transacoes-categoria');
const atualizarUsuario = require('./usuarios/atualizar-usuario');
const detalharTransacaoUsuario = require('./transacoes/detalhar-transacao-usuario');
const atualizarTransacaoUsuario = require('./transacoes/atualizar-transacao-usuario');
const deletarTransacao = require('./transacoes/deletar-transacao');
const obterExtrato = require('./transacoes/obter-extrato');

module.exports = {
    cadastrarUsuario,
    listarCategorias,
    loginUsuario,
    detalharUsuario,
    cadastrarTransacao,
    listarTransacoesCategoria,
    atualizarUsuario,
    detalharTransacaoUsuario,
    atualizarTransacaoUsuario,
    deletarTransacao,
    obterExtrato,
};
