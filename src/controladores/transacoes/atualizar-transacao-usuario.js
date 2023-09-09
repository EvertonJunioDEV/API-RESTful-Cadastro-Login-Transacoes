const pool = require('../../dados-sensiveis/conexao');

const atualizarTransacaoUsuario = async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.idToken;

    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const querySelect = `UPDATE transacoes
        SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
        WHERE usuario_id = $6 AND id = $7`;

        const values = [descricao, valor, data, categoria_id, tipo, idUsuario, id];

        await pool.query(querySelect, values);

        return res.status(201).json();
    } catch (error) {
        return res.status(500).json({ 'mensagem': `${error.message}` });
    };
};

module.exports = atualizarTransacaoUsuario;