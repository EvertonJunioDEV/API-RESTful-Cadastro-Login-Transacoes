const pool = require('../../dados-sensiveis/conexao');

const obterExtrato = async (req, res) => {
    const idUsuario = req.idToken;

    try {
        const querySelect = "SELECT sum(valor) FROM transacoes WHERE usuario_id = $1 AND tipo = $2"

        const { rows: somaEntrada } = await pool.query(querySelect, [idUsuario, 'entrada']);
        const { rows: somaSaida } = await pool.query(querySelect, [idUsuario, 'saida']);

        const entrada = somaEntrada[0].sum || 0;
        const saida = somaSaida[0].sum || 0;

        return res.json({
            entrada,
            saida
        });

    } catch (error) {
        res.status(500).json({ 'mensagem': `${error.message}` });
    };

};

module.exports = obterExtrato;