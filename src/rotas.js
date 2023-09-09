const express = require('express');

const { cadastrarUsuario, listarCategorias, loginUsuario, detalharUsuario, cadastrarTransacao,
    listarTransacoesCategoria, atualizarUsuario, detalharTransacaoUsuario, atualizarTransacaoUsuario,
    deletarTransacao, obterExtrato } = require('./controladores/exportar-controladores');

const { validarEmailCadastro, validarSenhaEEmailLogin, validarToken, validarDados, validarAtualizacaoUsuario,
    validarAtualizarTransacao, validarExclusao, } = require('./intermediarios/exportar-intermediarios');

const rotas = express();



rotas.post('/usuario', validarEmailCadastro, cadastrarUsuario);
rotas.post('/login', validarSenhaEEmailLogin, loginUsuario);

rotas.use(validarToken);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarAtualizacaoUsuario, atualizarUsuario);
rotas.get('/categoria', listarCategorias);
rotas.post('/transacao', validarDados, cadastrarTransacao);
rotas.get('/transacao', listarTransacoesCategoria);
rotas.get('/transacao/extrato', obterExtrato)
rotas.get('/transacao/:id', detalharTransacaoUsuario);
rotas.put('/transacao/:id', validarAtualizarTransacao, atualizarTransacaoUsuario);
rotas.delete('/transacao/:id', validarExclusao, deletarTransacao);

module.exports = rotas;