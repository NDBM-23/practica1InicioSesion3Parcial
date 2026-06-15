const db = require('../config/db');

exports.readTasks = (req, res) => {

    const { user } = req.body;

    if (!user) {
        return res.status(400).json({
            message: 'Debe proporcionar un usuario'
        });
    }

    const sql = `
        SELECT t.task_id, t.title
        FROM tasks t
        INNER JOIN users u
        ON t.id_user = u.user_id
        WHERE u.username = ?
    `;

    db.query(
        sql,
        [user],
        (error, results) => {

            if (error) {
                return res.status(500).json({
                    message: 'Error del servidor'
                });
            }

            res.status(200).json(results);
        }
    );
};

exports.createTask = (req, res) => {

    const { user, title } = req.body;

    if (!user || !title) {
        return res.status(400).json({
            message: 'Debe capturar todos los datos'
        });
    }

    const sql = `
        INSERT INTO tasks(title, id_user)
        SELECT ?, user_id
        FROM users
        WHERE username = ?
    `;

    db.query(
        sql,
        [title, user],
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    message: 'No se pudo crear la tarea'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }

            res.status(201).json({
                message: 'Tarea creada correctamente',
                task_id: result.insertId
            });
        }
    );
};

exports.readTask = (req, res) => {

    const { user, task_id } = req.body;

    if (!user || !task_id) {
        return res.status(400).json({
            message: 'Debe proporcionar usuario y tarea'
        });
    }

    const sql = `
        SELECT t.task_id, t.title
        FROM tasks t
        INNER JOIN users u
        ON t.id_user = u.user_id
        WHERE t.task_id = ?
        AND u.username = ?
    `;

    db.query(
        sql,
        [task_id, user],
        (error, results) => {

            if (error) {
                return res.status(500).json({
                    message: 'Error del servidor'
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: 'Tarea no encontrada'
                });
            }

            res.status(200).json(results[0]);
        }
    );
};

exports.updateTask = (req, res) => {

    const { user, task_id, title } = req.body;

    if (!user || !task_id || !title) {
        return res.status(400).json({
            message: 'Debe proporcionar todos los datos'
        });
    }

    const sql = `
        UPDATE tasks t
        INNER JOIN users u
        ON t.id_user = u.user_id
        SET t.title = ?
        WHERE t.task_id = ?
        AND u.username = ?
    `;

    db.query(
        sql,
        [title, task_id, user],
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    message: 'No se pudo actualizar la tarea'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Tarea no encontrada'
                });
            }

            res.status(200).json({
                message: 'Tarea actualizada correctamente'
            });
        }
    );
};

exports.deleteTask = (req, res) => {

    const { user, task_id } = req.body;

    if (!user || !task_id) {
        return res.status(400).json({
            message: 'Debe proporcionar usuario y tarea'
        });
    }

    const sql = `
        DELETE t
        FROM tasks t
        INNER JOIN users u
        ON t.id_user = u.user_id
        WHERE t.task_id = ?
        AND u.username = ?
    `;

    db.query(
        sql,
        [task_id, user],
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    message: 'No se pudo eliminar la tarea'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Tarea no encontrada'
                });
            }

            res.status(200).json({
                message: 'Tarea eliminada correctamente'
            });
        }
    );
};