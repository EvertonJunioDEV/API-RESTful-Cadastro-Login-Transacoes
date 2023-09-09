const pool = require('../../dados-sensiveis/conexao');

const validarExclusao = async (req, res, next) => {
    const { id } = req.params;
    const idUsuario = req.idToken;

    const querySelect = 'SELECT * FROM transacoes WHERE usuario_id = $1 AND id = $2';
    const { rowCount } = await pool.query(querySelect, [idUsuario, id]);

    if (rowCount < 1) {
        return res.status(404).json({ "mensagem": "Transacao não encontrada." });
    };

    next();
};

module.exports = validarExclusao;