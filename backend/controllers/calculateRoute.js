const math = require("mathjs");
const db = require("../database");

const calculateRoute = async (req, res) => {
    try {
        const clients = await db.query("SELECT * FROM clientes");

        const coordinates = clients.map((client) => ({
            id: client.id,
            name: client.nome,
            email: client.email,
            phone: client.telefone,
            x: client.coord_x,
            y: client.coord_y,
        }));

        const calcDistance = (pointA, pointB) => math.distance([pointA.x, pointB.y], [pointA.x, pointB.y]);

        const findNearestNeighbor = (point, availablePoints) => {
            let minimumDistance = Number.MAX_SAFE_INTEGER;
            let nearestNeighbor = null;

            for (const availablePoint of availablePoints) {
                const distance = calcDistance(point, availablePoint);

                if (distance < minimumDistance) {
                    minimumDistance = distance;
                    nearestNeighbor = availablePoint;
                }
            }

            return nearestNeighbor;
        }

        const route = [{ id: 0, company: "Facilita Jurídico", email: "facilita.juridico@facilita.juridico", phone: "99 99999999", x: 0, y: 0 }];
        let currentPoint = { x: 0, y: 0 }

        while (coordinates.length > 0) {
            const nearestNeighbor = findNearestNeighbor(currentPoint, coordinates)
            route.push(nearestNeighbor);
            currentPoint = nearestNeighbor;
            coordinates.splice(coordinates.findIndex((point) => point.id === nearestNeighbor.id), 1);
        }

        route.push({ id: 0, company: "Facilita Jurídico", email: "facilita.juridico@facilita.juridico", phone: "99 99999999", x: 0, y: 0 });

        return res.status(200).json(route);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = { calculateRoute }