const db = require("../database");

const registerClient = async (req, res) => {
    const { name, email, phone, coord_x, coord_y } = req.body;

    try {
        const emailRegistered = await db.oneOrNone("SELECT * FROM clientes WHERE email = $1", email);

        if(emailRegistered) {
            return res.status(400).json({
                message: "Este endereço de e-mail já está em uso por outro usuário existente.",
            });
        }

        const query = `
            INSERT INTO clientes (nome, email, telefone, coord_x, coord_y)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const result = await db.query(query, [name, email, phone, coord_x, coord_y]);
        
        return result ? res.status(201).json(result) : res.status(500);
        
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = { registerClient };