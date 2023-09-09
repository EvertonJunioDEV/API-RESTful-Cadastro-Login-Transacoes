const pool = require('../../dados-sensiveis/conexao');
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
    const idUsuario = req.idToken;

    const { nome, email, senha } = req.body;

    try {
        const criptoSenha = await bcrypt.hash(senha, 10);

        querySelect = `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4`

        await pool.query(querySelect, [nome, email, criptoSenha, idUsuario]);

        return res.status(201).json();

    } catch (error) {
        return res.status(500).json({ 'mensagem': `${error.message}` });
    };
};

module.exports = atualizarUsuario;