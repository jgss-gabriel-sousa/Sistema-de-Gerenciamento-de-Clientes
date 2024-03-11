const pool = require("../config/connection");

const registerClient = async (req, res) => {
    const { name, email, phone, coord_x, coord_y } = req.body;

    try {
        console.log("hello")

        const emailAlreadyRegistered = await pool.query(
            "SELECT * FROM clients WHERE email = $1",
            [email]
        )


        if (emailAlreadyRegistered.rowCount > 0) {
            return res.status(400).json({
                message: "Já existe usuário cadastrado com o e-mail informado.",
            });
        }

        const query = `
            INSERT INTO clients (nome, email, telefone, coord_x, coord_y)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [name, email, phone, coord_x, coord_y];

        const { rows } = await pool.query(query, values);

        console.log(rows)
        

        const clientRegistered = {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email,
            phone: rows[0].phone,
            coordinate_x: rows[0].coordinate_x,
            coordinate_y: rows[0].coordinate_y,
        }

        return res.status(201).json(clientRegistered);
        
        return res.status(201)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = { registerClient };