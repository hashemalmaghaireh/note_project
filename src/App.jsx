import { useEffect, useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./App.css"; // ربط ملف الـ CSS

function App() {
  const [item, setItem] = useState("");
  
  // استرجاع البيانات
  const [todoList, setTodoList] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  // حفظ البيانات
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todoList));
  }, [todoList]);

  const addItem = () => {
    if (!item.trim()) return;
    setTodoList([
      ...todoList,
      { id: crypto.randomUUID(), name: item, isFinished: false },
    ]);
    setItem("");
    inputRef.current.focus();
  };

  const toggleTodo = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setItem(task.name);
    inputRef.current.focus();
  };

  const updateItem = () => {
    if (!item.trim()) return;
    setTodoList(
      todoList.map((todo) =>
        todo.id === editId ? { ...todo, name: item } : todo
      )
    );
    setEditId(null);
    setItem("");
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      editId ? updateItem() : addItem();
    }
  };

  return (
    <div className="app-container">
      <h1>Notavia Tasks 📝</h1>
      
      <div className="input-group">
        <input
          type="text"
          value={item}
          ref={inputRef}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
        />
        {editId ? (
          <button className="btn-primary" onClick={updateItem}>Update</button>
        ) : (
          <button className="btn-primary" onClick={addItem}>Add Task</button>
        )}
      </div>

      <div className="todo-list">
        {todoList.length === 0 && (
          <p style={{ textAlign: "center", color: "#888", marginTop: "10px" }}>
            No tasks yet. Add one above!
          </p>
        )}

        {todoList.map((task) => (
          <div className="todo-item" key={task.id}>
            <div className="todo-content">
              <input
                type="checkbox"
                checked={task.isFinished}
                onChange={() => toggleTodo(task.id)}
              />
              <span className={task.isFinished ? "completed" : ""}>
                {task.name}
              </span>
            </div>
            
            <div className="actions">
              <button 
                className="btn-icon btn-edit" 
                onClick={() => startEdit(task)}
              >
                <FaEdit />
              </button>
              <button 
                className="btn-icon btn-delete" 
                onClick={() => deleteTask(task.id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
