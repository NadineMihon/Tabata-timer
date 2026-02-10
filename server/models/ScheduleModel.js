const { Schema, model } = require("mongoose");

const ScheduleSchema = new Schema({
    timerId: {
        type: String,
        required: [true, 'ID таймера обязателен!']
    },
    title: {
        type: String,
        required: [true, 'Название задачи обязательно!']
    },
    date: {
        type: Date,
        required: [true, 'Дата обязательна!']   
    },
    time: {
        type: String,
        required: [true, 'Время обязательно!']
    },
    status: {
        type: String,
        required: [true, 'Статус обязателен!']
    },
    notified: Boolean,
    completedAt: Date,
    showNotification: Boolean
});

module.exports = model('Tasks', ScheduleSchema);