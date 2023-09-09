const pool = require('../../dados-sensiveis/conexao');

const listarTransacoesCategoria = async (req, res) => {
    const usuarioId = req.idToken;

    if (req.query.filtro) {

        const queryFiltrada = `
        SELECT t.id, t.tipo, t.descricao, t.valor, t.data,
                t.usuario_id, c.id as categoria_id, c.descricao as categoria_nome
        FROM transacoes t
        JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = $1
        AND c.descricao = ANY($2)`;

        const filtros = req.query.filtro || [];
        const filtrosCaps = filtros.map(filtro => filtro.charAt(0).toUpperCase() + filtro.slice(1));

        try {
            const resultadoTransacoes = await pool.query(queryFiltrada, [usuarioId, filtrosCaps]);

            const conteudoTransacoes = resultadoTransacoes.rows.map((transacao) => ({
                id: transacao.id,
                tipo: transacao.tipo,
                descricao: transacao.descricao,
                valor: transacao.valor,
                data: transacao.data,
                usuario_id: usuarioId,
                categoria_id: transacao.categoria_id,
                categoria_nome: transacao.categoria_nome
            }));

            return res.json(conteudoTransacoes);
        } catch (error) {
            return res.status(500).json({ "mensagem": `${error.message}` });
        };
    };

    try {

        const query = `SELECT t.*, d.descricao AS categoria_nome
               FROM transacoes t
               LEFT JOIN categorias d ON t.categoria_id = d.id
               WHERE t.usuario_id = $1`;
        const usuarioId = req.idToken;

        const resultadoTransacoes = await pool.query(query, [usuarioId]);

        const conteudoTransacoes = resultadoTransacoes.rows.map((transacao) => ({
            id: transacao.id,
            tipo: transacao.tipo,
            descricao: transacao.descricao,
            valor: transacao.valor,
            data: transacao.data,
            usuario_id: usuarioId,
            categoria_id: transacao.categoria_id,
            categoria_nome: transacao.categoria_nome
        }));

        return res.json(conteudoTransacoes);
    } catch (error) {
        return res.status(500).json({ "mensagem": `${error.message}` });
    };
};

module.exports = listarTransacoesCategoria;