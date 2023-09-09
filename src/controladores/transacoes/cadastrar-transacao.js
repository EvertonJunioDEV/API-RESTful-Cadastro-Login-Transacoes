const pool = require('../../dados-sensiveis/conexao');

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {

        const querySelect = `INSERT INTO transacoes 
        (descricao, valor, data, categoria_id, usuario_id, tipo)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

        const values = [descricao, valor, data, categoria_id, req.idToken, tipo];

        const novoCadastro = await pool.query(querySelect, values);
        const categoria_nome = await pool.query('SELECT descricao FROM categorias WHERE id = $1',[categoria_id])
        
        const conteudoTransacao = {
            id: novoCadastro.rows[0].id,
            tipo: tipo,
            descricao: descricao,
            valor: valor,
            data: data,
            usuario_id: req.idToken,
            categoria_id: categoria_id,
            categoria_nome: categoria_nome.rows[0].descricao
        };

        return res.status(201).json(conteudoTransacao);

    } catch (error) {
        return res.status(500).json({ "mensagem": `${error.message}` });
    };
};

module.exports = cadastrarTransacao;