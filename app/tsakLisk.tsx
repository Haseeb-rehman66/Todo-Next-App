"use client";

import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}


interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {

  const [taskList, setTaskList] = useState<Task[]>(tasks || []);

  const handleChange = (id: number) => {
    const updatedTasks = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
    console.log(updatedTasks);
  };

  return (
    <ul>
      {taskList.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={() => handleChange(task.id)}
            style={{ marginRight: "10px", 
            width: "30px", 
            height: "30px", 
            accentColor: "black", 
         }}
          />
          {task?.text || "Task"}
        </li>
      ))}
    </ul>
  );
}
