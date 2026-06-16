const express = require('express');
const router = express.Router();

const verifyToken =
    require('../middleware/auth.middleware');

const appController =
    require('../controllers/app.controller');

router.use(verifyToken);

router.post(
    '/readTasks',
    appController.readTasks
);

router.post(
    '/createTask',
    appController.createTask
);

router.post(
    '/readTask',
    appController.readTask
);

router.post(
    '/updateTask',
    appController.updateTask
);

router.post(
    '/deleteTask',
    appController.deleteTask
);

module.exports = router;