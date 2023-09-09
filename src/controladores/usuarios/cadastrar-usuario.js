const pool = require('../../dados-sensiveis/conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const querySelect = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
    
        const novoUsuario = await pool.query(querySelect, [nome, email, senhaCriptografada]);

        const conteudoUsuario = {
            id: novoUsuario.rows[0].id,
            nome: novoUsuario.rows[0].nome,
            email: novoUsuario.rows[0].email
        };

        return res.status(201).json(conteudoUsuario);

    } catch (error) {
        return res.status(500).json({ "mensagem": `${error.mensagem}` });
    };
};

module.exports = cadastrarUsuario;