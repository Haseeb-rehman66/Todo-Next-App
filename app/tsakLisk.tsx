"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  _id: string;
  text: string;
  completed: boolean;
}

export default function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks');
        setTaskList(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const res = await axios.post('/api/tasks', { text: newTask });
      setTaskList([...taskList, res.data]);
      setNewTask("");
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id: string) => {
    const taskToToggle = taskList.find(task => task._id === id);
    if (taskToToggle) {
      try {
        const res = await axios.put('/api/tasks', { ...taskToToggle, completed: !taskToToggle.completed });
        setTaskList(taskList.map(task => task._id === id ? res.data : task));
      } catch (error) {
        console.error('Error toggling task:', error);
      }
    }
  };

  const removeTask = async (id: string) => {
    try {
      await axios.delete('/api/tasks', { data: { _id: id } });
      setTaskList(taskList.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="New Task" 
      />
      <button onClick={addTask} style={{marginLeft: "10px"}}>Add Task</button>
      <ul>
        {taskList.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={() => toggleTask(task._id)}
              style={{ marginRight: "10px", width: "15px", height: "15px", accentColor: "black" }}
            />
            {task.text}
            <button onClick={() => removeTask(task._id)} style={{ marginLeft: "10px" }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
