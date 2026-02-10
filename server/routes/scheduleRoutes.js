const { Router } = require("express");
const scheduleController = require("../controllers/scheduleController");

const scheduleRoutes = new Router();

scheduleRoutes.get('/list', scheduleController.getTasks);
scheduleRoutes.post('/add', scheduleController.addTask);
scheduleRoutes.delete('/delete', scheduleController.deleteTask);
scheduleRoutes.patch('/list/:id', scheduleController.updateTask);
scheduleRoutes.patch('/list/:id/notification', scheduleController.updateTaskNotification);

module.exports = scheduleRoutes;