const Timers = require('../models/TimersModel');
const Tasks = require('../models/ScheduleModel');

const NOTIFY_OFFSET_MINUTES = 5;
const DEADLINE = 30;

async function runScheduleTasksJob() {
    const now = new Date();

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const schedule = await Tasks.find({
        date: { $gte: startOfDay, $lte: endOfDay },
        status: { $ne: 'completed' }
    }).exec();

    for (const task of schedule) {
        await processSchedule(task, now);
    }

    const overdueScheduledTasks = await Tasks.find({
        date: { $lt: startOfDay },
        status: 'scheduled'
    }).exec();

    for (const task of overdueScheduledTasks) {
        await skipTask(task);
    }
};

async function processSchedule(task, now) {
    const timer = await Timers.findById(task.timerId).exec();

    if (!timer) {
        console.warn('Таймер для этой задачи не найден', task._id);

        return;
    }

    const totalDurationSecond = (timer.workTime + timer.restTime) * timer.cycles;

    const totalDurationMinutes = totalDurationSecond / 60;

    const [hours, minutes] = task.time.split(':').map(Number);
    const startMinutesFromMidnight = hours * 60 + minutes;

    const notifyMinutesFromMidnight = startMinutesFromMidnight - NOTIFY_OFFSET_MINUTES;

    const nowMinutesFromMidnight = now.getHours() * 60 + now.getMinutes();

    const shouldNotify = 
        nowMinutesFromMidnight >= notifyMinutesFromMidnight && 
        nowMinutesFromMidnight < startMinutesFromMidnight;

    if (shouldNotify && !task.notified) {
        await sendNotification(task, timer);

        task.notified = true;
        task.showNotification = true;
        await task.save();    
    }

    if (task.status === 'completed' || task.status === 'skipped') {
        return;
    }

    const skipDeadline = startMinutesFromMidnight + totalDurationMinutes + DEADLINE;

    if (nowMinutesFromMidnight > skipDeadline && task.status === 'scheduled') {
        skipTask(task);
    }    
};

async function sendNotification(task, timer) {
    console.log(`тренировка ${timer.title} запланирована в ${task.time}`)
};

async function skipTask(task) {
    task.status = 'skipped';
    await task.save();
};

module.exports = runScheduleTasksJob;