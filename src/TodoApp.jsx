import React, { useState, useEffect } from "react";

function TodoApp() {
     const [tasks, setTasks] = useState([]);
     const [newTask, setNewTask] = useState("");
     const [editId, setEditId] = useState(null);
     const [editValue, setEditValue] = useState("");

     useEffect(() => {
       const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
       setTasks(savedTasks);
     }, []);

     useEffect(() => {
       localStorage.setItem("tasks", JSON.stringify(tasks));
     }, [tasks]);

     const handleAddTask = () => {
       if (!newTask.trim()) return;
       setTasks([...tasks, { id: Date.now(), text: newTask }]);
       setNewTask("");
     };

     const handleDeleteTask = (id) => {
       setTasks(tasks.filter((task) => task.id !== id));
     };

     const handleEditTask = (id, text) => {
       setEditId(id);
       setEditValue(text);
     };

     const handleSaveEdit = () => {
       setTasks(
         tasks.map((task) =>
           task.id === editId ? { ...task, text: editValue } : task
         )
       );
       setEditId(null);
       setEditValue("");
     };
  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Todo App</h1>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
              />
              <button className="btn btn-primary" onClick={handleAddTask}>
                Add
              </button>
            </div>
            <ul className="list-group">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {editId === task.id ? (
                    <div className="d-flex flex-grow-1">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-grow-1">{task.text}</span>
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditTask(task.id, task.text)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoApp;
