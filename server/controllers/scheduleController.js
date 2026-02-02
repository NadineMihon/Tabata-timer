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
            if (!req.body.timerId) {
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
                date: req.body.date,
                time: req.body.time,
                status: 'scheduled'
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
            const updatedTask = await ScheduleModel.findByIdAndUpdate(
                req.params.id,
                { status: req.body.status },
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
};

module.exports = new ScheduleController();