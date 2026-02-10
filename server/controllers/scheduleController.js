const ScheduleModel = require('../models/ScheduleModel');

class ScheduleController {
    async getTasks (req, res) {
        try {
            const result = await ScheduleModel.find({});

            return res.status(200).json({ tasks: result });
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при получении' });
        }
    };

    async addTask (req, res) {
        try {
            if (!req.body.timerId || !req.body.title) {
                return res.status(400).json({ message: 'Произошла ошибка при выборе тренировки' });
            }

            if (!req.body.date) {
                return res.status(400).json({ message: 'Пожалуйста, выберите корректную дату' });
            }

            if (!req.body.time) {
                return res.status(400).json({ message: 'Пожалуйста, выберите корректное время' });
            }

            const taskModel = new ScheduleModel({
                timerId: req.body.timerId,
                title: req.body.title,
                date: new Date(req.body.date),
                time: req.body.time,
                status: 'scheduled',
                notified: false,
                completedAt: '',
                showNotification: false,
            });

            await taskModel.save();

            return res.status(200).json({ message: 'Задача успешно добавлена' });
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при добавлении' });    
        }
    };

    async deleteTask (req, res) {
        try {
            const deletedTask = await ScheduleModel.findByIdAndDelete(req.body._id);

            if (!deletedTask) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }

            return res.status(200).json({
                message: 'Задача успешно удалена',
                deletedTask 
            });
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при удалении' });
        }
    };

    async updateTask (req, res) {
        try {
            const task = await ScheduleModel.findById(req.params.id);

            if (!task) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }

            let updateData = {};

            if (!req.body.completedAt) {
               return res.status(400).json({ message: 'completedAt не передан' });
            }

            if (task.completedAt) {
                return res.status(409).json({ message: 'Задача уже выполнена' });
            }

            if (task.status !== 'scheduled') {
                return res.status(409).json({ message: 'Задача не запланирована' });
            }

            updateData.completedAt = req.body.completedAt;
            updateData.status = 'completed';

            const updatedTask = await ScheduleModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }

            return res.status(200).json({
                message: 'Задача успешно обновлена',
                task: updatedTask
            });
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при обновлении' });
        }
    };
    async updateTaskNotification (req, res) {
        try {
            const task = await ScheduleModel.findById(req.params.id);

            if (!task) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }
            
            if (typeof req.body.showNotification === 'undefined') {
                return res.status(400).json({ message: 'showNotification не передан' });
            }

            const updatedTask = await ScheduleModel.findByIdAndUpdate(
                req.params.id,
                { showNotification: req.body.showNotification },
                { new: true, runValidators: true }
            )

            if (!updatedTask) {
                return res.status(404).json({ message: 'Задача не найдена' });
            }

            return res.status(200).json({
                message: 'Задача успешно обновлена',
                task: updatedTask
            });
            
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при обновлении' });
        } 
    };
};

module.exports = new ScheduleController();