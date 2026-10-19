
import { useState } from 'react';
import './Mytodolist.css';

const Mytodolist = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [message, setMessage] = useState("");
    function addTask(newTask) {
        if (newTask.trim() === "") {
            return;
        }

        setTasks([...tasks, newTask.trim()]);
    }

    function removeTask(oldTask) {
        const modTasks = tasks.filter(obj =>
            oldTask !== obj
        );

        setTasks(modTasks);

        if (editTask === oldTask) {
            setEditTask(null);
            setTask("");
        }
    }

    function modifyTask(oldTask) {
        if (task.trim() === "") {
            return;
        }

        const modTasks = tasks.map(obj => {
            if (obj === oldTask) {
                return task.trim();
            }
            return obj;
        });

        setTasks(modTasks);
    }

    function handleSubmit() {
        if (task.trim() === "") {
            setMessage("Please enter a task");
            return;
        }
        setMessage("");
        if (editTask === null) {
            addTask(task);
        } else {
            modifyTask(editTask);
        }

        setTask("");
        setEditTask(null);
    }

    return (
        <>
            <h1 className="textContent">My Todo List</h1>

            <div className="input">
                <input
                    type="text"
                    value={task}
                    onChange={(event) => {
                        setTask(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                    placeholder="Enter a task"
                />
            </div>
             {message && (
    <p className="errorMessage">{message}</p>
)}
            <div className="addTask">
                <button
                    onClick={handleSubmit}
                    id="add"
                >
                    {editTask === null ? "Add" : "Save"}
                </button>
            </div>

            <h2 className="textContent">Tasks List</h2>

            {tasks.map((eachTask, index) => (
                <div
                    className="taskContent"
                    key={index}
                >
                    <h3>{eachTask}</h3>

                    <button
                        onClick={() => removeTask(eachTask)}
                        id="del"
                    >
                        Delete
                    </button>

                    <button
                        onClick={() => {
                            setEditTask(eachTask);
                            setTask(eachTask);
                        }}
                        id="mod"
                    >
                        Edit
                    </button>
                </div>
            ))}

            <h3 className="textContent">Total Tasks</h3>

            <h4 className="textContent">
                {tasks.length === 0
                    ? "No tasks yet"
                    : tasks.length}
            </h4>
        </>
    );
};

export default Mytodolist;
