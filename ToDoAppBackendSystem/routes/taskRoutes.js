import express from 'express';
import TaskModel from '../models/task.js';

const tasksRouter = express.Router();

// As an API and for Web App.
const fetchTasks =  async (req, res)=>{
    try{
        console.log("fetching!");
        // const tasks = await TaskModel.find({$and: [{taskCompleted: {$exists: true} }, {taskTitle: "Test task"}] }, {_id: false})
        const fetchedTasks = await TaskModel.find({}, {/* _id: false, */ __v: false}); 
        res.status(200).json(fetchedTasks);
    }catch(error){
        res.status(500).json({
            "error": error.message
        });
    }
};

// As an API and for Web App.
const addTask = async(req, res)=> {
    try{
        const newTask = req.body;
        const taskToPersist = new TaskModel(newTask);
        await taskToPersist.save();
        res.status(201).json({
            "message": "Task Added Successfully!"
        });
    }catch(error){
        res.status(500).json({
            "error": error.message
        });
    }
};

// For Web App.
const deleteSpecificTask = async(req, res)=>{
    try{
        console.log("Deleteing a task...");
        
        // const { taskId } = req.params;
        const taskId = req.body.taskId;

        await TaskModel.findByIdAndDelete(taskId);
        res.status(200).json({
            "message": "Successfully Deleted!"
        });
    }catch(error){
        res.status(500).json({
            "error": error.message
        });
    }
};
// For Web App.
const updateSpecificTask = async(req, res)=>{
    try{
        // const { taskId } = req.params;
        const taskToUpdate = req.body;
        await TaskModel.findByIdAndUpdate(taskToUpdate._id, taskToUpdate);
        res.status(200).json({
            "message": "Task Updated Successfully!"
        });
    }catch(error){
        res.status(500).json({
            "message": error.message
        });
    }
}





tasksRouter.delete('/delete/all', async(req, res)=>{
    try{
        await TaskModel.deleteMany();
        res.status(200).json({
            "message": "Deleted All Tasks Successfully!"
        });
    }catch(error){
        res.status(500).json({
            "error": error.message
        });
    }
});

tasksRouter.post('/add/all', async(req, res)=>{
    try{
        const tasksToAdd = req.body;
        const tasksToPersist = [];
        tasksToAdd.forEach(task=>{
            tasksToPersist.push(new TaskModel(task));
        });
        
        await TaskModel.bulkSave(tasksToPersist);
        res.status(201).json({
            "message": "Added All Tasks Successfully!"
        });
    }catch(error){
        res.status(500).json({
            "error": error.message
        });
    }
});

tasksRouter.put('/:taskId', async(req, res)=>{
    try{
        // const taskId = req.params.taskId;
        const { taskId } = req.params;
        const updatedTask = req.body;
        // const taskToUpdate = new TaskModel(updatedTask);
        // await TaskModel.deleteOne({_id: taskId});
        // await taskToUpdate.save();
        const taskAfterUpdated = await TaskModel.findByIdAndUpdate(taskId, updatedTask, {new: true});
        res.status(200).json({
            "message": "Task Updated Successfully!",
            "updatedTask": taskAfterUpdated
        });
    }catch(error){
        res.status(500).json({
            "error": error.message
        });
    }
});



tasksRouter.route('/')
.get(fetchTasks)
.post(addTask);

// For React.js Web App.
tasksRouter.post('/fetch/all', fetchTasks);
// tasksRouter.post('/delete/:taskId', deleteSpecificTask);
tasksRouter.post('/delete', deleteSpecificTask);
tasksRouter.post('/add', addTask);
tasksRouter.post('/update', updateSpecificTask);



export default tasksRouter;