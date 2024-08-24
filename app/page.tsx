import TaskList from './tsakLisk';

let tasks = [
  {id:1, text: "Task 1", completed: false},
  {id:2, text: "Task 2", completed: false},
  {id:3, text: "Task 3", completed: false},
]


export default function Home() {
  return (
   <div>
    <h1 style={{color:"red",}}>To-Do List</h1>
    <TaskList tasks={tasks}/>
   </div>
  );
}