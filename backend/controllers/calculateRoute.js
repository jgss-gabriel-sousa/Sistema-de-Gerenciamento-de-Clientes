const math = require("mathjs");
const pool = require("../config/connection");

const calculateRoute = async (req, res) => {
    try {
        const clients = await pool.query("SELECT * FROM clients");

        console.log(clients)

        if (clients.rowCount === 0) {
            return res.status(404).json({ message: "Nenhum cliente cadastrado." });
        }
        
        const coordinates = clients.rows.map((client) => ({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            x: client.coordinate_x,
            y: client.coordinate_y,
        }))

        const calculateDistance = (point1, point2) =>
            math.distance([point1.x, point1.y], [point2.x, point2.y]);

        const findNearestNeighbor = (point, availablePoints) => {
            let minimumDistance = Number.MAX_SAFE_INTEGER;
            let nearestNeighbor = null;

            for (const availablePoint of availablePoints) {
                const distance = calculateDistance(point, availablePoint);

                if (distance < minimumDistance) {
                    minimumDistance = distance;
                    nearestNeighbor = availablePoint;
                }
            }

            return nearestNeighbor;
        }

        const route = [];
        let currentPoint = { x: 0, y: 0 }

        while (coordinates.length > 0) {
            const nearestNeighbor = findNearestNeighbor(
                currentPoint,
                coordinates,
            )
            route.push(nearestNeighbor);
            currentPoint = nearestNeighbor;
            coordinates.splice(coordinates.findIndex((point) => point.id === nearestNeighbor.id), 1);
        }

        route.push({ id: 0, company: "Facilita Jurídico", email: "@facilita.jurídico", phone: "15 99852-6603", x: 0, y: 0 });

        return res.status(200).json(route);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = { calculateRoute }