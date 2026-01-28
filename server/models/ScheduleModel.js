const { Schema, model } = require("mongoose");

const ScheduleSchema = new Schema({
    timerId: {
        type: String,
        required: [true, 'ID таймера обязателен!']
    },
    date: {
        type: String,
        required: [true, 'Дата обязательна!']   
    },
    time: {
        type: String,
        required: [true, 'Время обязательно!']
    },
    status: {
        type: String,
        required: [true, 'Статус обязателен!']
    }
});

module.exports = model('Tasks', ScheduleSchema);