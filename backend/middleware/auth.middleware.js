const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Si no existe el header, no hay token
    if (!authHeader) {
        return res.status(401).json({
            message: 'Token requerido'
        });
    }

    // El token viene así: Bearer TOKEN
    const token = authHeader.split(' ')[1];

    // Si no hay token después de Bearer
    if (!token) {
        return res.status(403).json({
            message: 'Token inválido'
        });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (error, decoded) => {

            if (error) {
                return res.status(401).json({
                    message: 'Token no autorizado'
                });
            }

            req.user = decoded;

            next();
        }
    );
};

module.exports = verifyToken;
