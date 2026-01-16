const TimersModel = require('../models/TimersModel');

class TimersController {
    async getTimers (req, res) {
        try {
            const result = await TimersModel.find({});

            return res.status(200).json({ timers: result });
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при получении' });
        }
    };

    async getTimer (req, res) {
        try {
            const result = await TimersModel.findOne({ title: req.body.title });

            return res.status(200).json({ timer: result });
        } catch (e) {
           return res.status(400).json({ message: 'Произошла ошибка при получении' }); 
        }
    };

    async addTimer (req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).json({ message: 'Пожалуйста, добавьте название' });
            }

            if (!req.body.cycles) {
                return res.status(400).json({ message: 'Пожалуйста, добавьте количество циклов' });
            }

            if (!req.body.workTime) {
                return res.status(400).json({ message: 'Пожалуйста, добавьте время работы' });
            }

            if (!req.body.restTime) {
                return res.status(400).json({ message: 'Пожалуйста, добавьте время отдыха' });
            }

            const timerModel = new TimersModel({
                title: req.body.title,
                cycles: req.body.cycles,
                workTime: req.body.workTime,
                restTime: req.body.restTime,
                info: req.body.info
            });

            await timerModel.save();

            return res.status(200).json({ message: 'Тренировка успешно добавлена' });
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при добавлении' });
        }
    };

    async deleteTimer (req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).json({ message: 'Пожалуйста, добавьте название' });
            }

            const { deletedCount } = await TimersModel.deleteOne({ title: req.body.title });

            if (deletedCount === 0) {
                return res.status(400).json({ message: 'К сожалению, не получилось удалить таймер' });
            }

            return res.status(200).json({ message: 'Таймер успешно удален' });
        } catch (e) {
           return res.status(400).json({ message: 'Произошла ошибка при удалении' }); 
        }
    };
};

module.exports = new TimersController();