const pool = require('../../dados-sensiveis/conexao');

const detalharTransacaoUsuario = async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.idToken;

    try {
        const querySelect = 'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2';
        const transacoes = await pool.query(querySelect, [id, idUsuario]);

        if (transacoes.rowCount < 1) {
            return res.status(404).json({ "mensagem": "Transação não encontrada." });
        };
        const categoria_nome = await pool.query('SELECT descricao FROM categorias WHERE id = $1',[transacoes.rows[0].categoria_id]);
  
        const transacao = transacoes.rows[0];
        transacao.categoria_nome = categoria_nome.rows[0].descricao;

        return res.json(transacao);

    } catch (error) {
        return res.json({ 'mensagem': `${error.message}` });
    };
};

module.exports = detalharTransacaoUsuario;