const db = require('../config/db');

exports.readTasks = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT task_id, title
        FROM tasks
        WHERE id_user = ?
    `;

    db.query(
        sql,
        [userId],
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

    const { title } = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({
            message: 'Debe capturar el título'
        });
    }

    const sql = `
        INSERT INTO tasks(title, id_user)
        VALUES(?, ?)
    `;

    db.query(
        sql,
        [title, userId],
        (error, result) => {

            if (error) {
                return res.status(500).json({
                    message: 'No se pudo crear la tarea'
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

    const { task_id } = req.body;
    const userId = req.user.id;

    if (!task_id) {
        return res.status(400).json({
            message: 'Debe proporcionar una tarea'
        });
    }

    const sql = `
        SELECT task_id, title
        FROM tasks
        WHERE task_id = ?
        AND id_user = ?
    `;

    db.query(
        sql,
        [task_id, userId],
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

    const { task_id, title } = req.body;
    const userId = req.user.id;

    if (!task_id || !title) {
        return res.status(400).json({
            message: 'Debe proporcionar todos los datos'
        });
    }

    const sql = `
        UPDATE tasks
        SET title = ?
        WHERE task_id = ?
        AND id_user = ?
    `;

    db.query(
        sql,
        [title, task_id, userId],
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

    const { task_id } = req.body;
    const userId = req.user.id;

    if (!task_id) {
        return res.status(400).json({
            message: 'Debe proporcionar una tarea'
        });
    }

    const sql = `
        DELETE FROM tasks
        WHERE task_id = ?
        AND id_user = ?
    `;

    db.query(
        sql,
        [task_id, userId],
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