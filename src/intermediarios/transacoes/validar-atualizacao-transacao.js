const pool = require('../../dados-sensiveis/conexao');

const validarAtualizarTransacao = async (req, res, next) => {
    const { id } = req.params;
    const idUsuario = req.idToken;

    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ "mensagem": "Todos os campos são obrigatórios." });
    };

    const querySelect = 'SELECT * FROM transacoes WHERE usuario_id = $1 AND id = $2';
    const { rowCount } = await pool.query(querySelect, [idUsuario, id]);

    if (rowCount < 1) {
        return res.status(404).json({ mensagem: "Transacao não encontrada." });
    };

    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({ mensagem: "Os tipos aceitos são: entrada e saida." });
    };

    next();
};

module.exports = validarAtualizarTransacao;