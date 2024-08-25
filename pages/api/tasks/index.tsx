import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { Task } from '../db/model/schema';

const connectDB = async () => {
      try{
        await mongoose.connect('mongodb://localhost:27017/todo-app');
      }
      catch(error){
        console.log("DB connection Error:", error);
      }
  
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  
  const { method } = req;
  
  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
      }
      break;

    case 'POST':
      try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
      }
      break;

    case 'PUT':
      try {
        const { _id, ...updateData } = req.body;
        const updatedtask = await Task.findByIdAndUpdate(_id, updateData, { new: true });
        res.status(200).json(updatedtask);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
      }
      break;

    case 'DELETE':
      try {
        const { _id } = req.body;
        await Task.findByIdAndDelete(_id);
        res.status(200).json({ message: 'task deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
      }
      break;

    default:
      res.status(405).json({ error: `Method ${method} not allowed` });
      break;
  }
}