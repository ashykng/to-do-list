import React, {useState} from "react";

function ToDoList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setnewTask] = useState("");
    const [checkedTasks, setCheckedTasks] = useState(Array(tasks.length).fill(false));

    function handleInputChange(event){
        setnewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks([...tasks, newTask]);
            setCheckedTasks([...checkedTasks, false]);
            setnewTask("");
        }
    }

    function deleteTask(index){
        setTasks(tasks.filter((_, i) => i!== index));
        setCheckedTasks(checkedTasks.filter((_, i) => i!== index));
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index - 1]] =
            [updatedTask[index - 1], updatedTask[index]];

            setTasks(updatedTask);
            const updatedCheckedTasks = [...checkedTasks];
            [updatedCheckedTasks[index], updatedCheckedTasks[index - 1]] =
            [updatedCheckedTasks[index - 1], updatedCheckedTasks[index]];
            setCheckedTasks(updatedCheckedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index + 1]] =
            [updatedTask[index + 1], updatedTask[index]];

            setTasks(updatedTask);
            const updatedCheckedTasks = [...checkedTasks];
            [updatedCheckedTasks[index], updatedCheckedTasks[index + 1]] =
            [updatedCheckedTasks[index + 1], updatedCheckedTasks[index]];
            setCheckedTasks(updatedCheckedTasks);
        }
    }

    function handleCheckboxChange(index){
        const updatedCheckedTasks = [...checkedTasks];
        updatedCheckedTasks[index] = !updatedCheckedTasks[index];
        setCheckedTasks(updatedCheckedTasks);
    }

    return( <div className="container">
                <h1>To-Do-List</h1>

                <div>
                    <input type="text" 
                    onChange={handleInputChange} 
                    placeholder="Enter a Task ..." 
                    value={newTask}/>

                    <button onClick={addTask} className="addBtn">Add</button>
                </div>

                <ol>
                    {tasks.map((task, index) => 
                    <li key={index}>
                        <input type="checkbox" checked={checkedTasks[index]} onChange={() => handleCheckboxChange(index)}/>
                        <span className="text">{task}</span>
                        <button className="deleteBtn" onClick={() => deleteTask(index)}>Delete</button>
                        <button className="upBtn" onClick={() => moveTaskUp(index)}>⬆️</button>
                        <button className="downBtn" onClick={() => moveTaskDown(index)}>⬇️</button>
                    </li>)}
                </ol>
            </div>);
}

export default ToDoList