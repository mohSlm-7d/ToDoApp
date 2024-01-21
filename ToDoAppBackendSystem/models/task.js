import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    "taskTitle": {type: String, required: true},
    "taskDescription": {type: String, required: true},
    taskCompleted: {type: Boolean, default: false}
});

export default mongoose.model('Task', taskSchema);