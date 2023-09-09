const pool = require('../../dados-sensiveis/conexao');

const deletarTransacao = async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.idToken;

    try {
        await pool.query('DELETE FROM transacoes WHERE usuario_id = $1 AND id = $2', [idUsuario, id])
        return res.status(201).json();

    } catch (error) {
        return res.json({ 'mensagem': `${error.message}` });
    };
};
module.exports = deletarTransacao;