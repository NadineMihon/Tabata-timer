const { Schema, model } = require("mongoose");

const TimersSchema = new Schema({
    title: { 
        type: String, 
        required: [true, 'Название тренировки обязательно!'] 
    },
    cycles: { 
        type: Number, 
        required: true, 
        min: [1, 'Минимум 1 цикл'] 
    },
    workTime: {
        type: Number,
        required: true,
        min: [1, 'Время работы должно быть больше 0 секунд']
    },
    restTime: {
        type: Number,
        required: true,
        min: [1, 'Время отдыха должно быть больше 0 секунд']
    },
    info: String
});

module.exports = model('Timers', TimersSchema);