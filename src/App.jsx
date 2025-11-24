import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function App() {
  const [item, setItem] = useState('')
  const [todoList, setTodoList] = useState(()=>{
    const localValue=localStorage.getItem("ITEMS")
      if(localValue==null){
        return[]
      }
      else{
        return JSON.parse(localValue)
      }
    
  })
  const[editId,setEditId]=useState(null)

  const addItem = () => {
    if(!item.trim())return;
    setTodoList([...todoList, {
      id: crypto.randomUUID(),
      name: item,
      isFinished: false
    }])
    setItem('')
    document.getElementById('i1').focus()
  }

  useEffect(() => {
   localStorage.setItem("ITEMS",JSON.stringify(todoList))
  }, [todoList])


  const toggleTodo = (id) => {
    setTodoList(
      todoList.map(todo =>
        todo.id === id
          ? { ...todo, isFinished: !todo.isFinished }
          : todo
      )
    );
  };

  const deleteTask=(id)=>{
    setTodoList(todoList.filter(todo=>todo.id !==id));


  };
  const startEdit=(task)=>{
    setEditId(task.id);
    setItem(task.name);
    document.getElementById("i1").focus();
  }
  const updateItem=()=>{
    setTodoList(
      todoList.map(todo =>
        todo.id === editId
          ? { ...todo, name: item }
          : todo
      )
    );
     setEditId(null);
    setItem('');
    document.getElementById("taskInput").focus();
  }
  
  return (
    <>
      <input type="text" value = {item} id="i1" onChange={
        (e) => setItem(e.target.value)} />
        {editId?(
          <button onClick={updateItem}>Update</button>
        ):(
          <button onClick={addItem}>Add Task</button>
        )}
      
      <div>
        {todoList.map((task) =>
          <div>
            <input
              type="checkbox"
              checked={task.isFinished}
              onChange={() => toggleTodo(task.id)}
            />
            {task.isFinished ? (
              <span>
                <del>{task.name}</del>
              </span>
            ) : (
              <span>{task.name}</span>
            )}
            <button onClick={()=>deleteTask(task.id)}><MdDelete /></button>
            <button onClick={()=>startEdit(task)}><FaEdit /></button>
          </div>

        )}
      </div>
    </>
  );
}

export default App;