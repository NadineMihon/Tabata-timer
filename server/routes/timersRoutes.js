const { Router } = require('express');
const timersController = require('../controllers/timersController');

const timersRoutes = new Router();

timersRoutes.get('/list', timersController.getTimers);
timersRoutes.get('/:id', timersController.getTimer);
timersRoutes.post('/add', timersController.addTimer);
timersRoutes.delete('/delete', timersController.deleteTimer);

module.exports = timersRoutes;