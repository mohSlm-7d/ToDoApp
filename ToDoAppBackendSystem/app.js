import express from 'express';
import mongoose from 'mongoose';
import taskModel from './models/task.js';
import tasksRouter from './routes/taskRoutes.js';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

// DB Connection.
// mongodb(connection protocol on mongo DB): // admin(username):admin(password) @localhost:27017 /todo(DB name that U want to connect to)
// mongoose.connect('mongodb://admin:admin@localhost:27017/todo?authSource=admin',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect('mongodb://admin:admin@localhost:27017/todo?authSource=admin');
const db = mongoose.connection;

db.on('error', ()=>{
    console.log("Connection Error: Something wrong happened while connecting to DB!");
});


db.once('open', ()=>{
    console.log("Connected to DB!");
});

// db.model(taskModel);

// db.collection(taskModel);

app.use('/task', tasksRouter);
app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`);
});