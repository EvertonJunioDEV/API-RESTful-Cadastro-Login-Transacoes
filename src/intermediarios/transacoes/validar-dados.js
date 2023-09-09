const pool = require('../../dados-sensiveis/conexao')

const validarDados = async (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ "mensagem": "Todos os campos são obrigatórios." });
    };

    const { rowCount } = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoria_id]);

    if (rowCount < 1) {
        return res.status(404).json({ "mensagem": "Categoria não encontrada." });
    }
   
    if (tipo !== "entrada" && tipo !== "saida") {
        return res.status(400).json({ "mensagem": "Os tipos aceitos são: entrada e saída." });
    };

    next();
};

module.exports = validarDados;