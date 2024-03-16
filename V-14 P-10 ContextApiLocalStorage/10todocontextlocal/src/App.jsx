import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts';
import { TodoForm, TodoItem } from './components';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    
    const todos=JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length>0){
          setTodos(todos)
    }
  },[])

  useEffect(()=>{
    
    localStorage.setItem("todos",JSON.stringify(todos));

  },[todos])


  const addTodo=(todo)=>{
    console.log(todo);
      setTodos((prev)=>{return [...prev,{id:Date.now(),...todo}]});
  }

  const updateTodo=(id, todo)=>{
      setTodos(
        (prev)=>prev.map((prevTodo)=> prevTodo.id == id? todo : prevTodo)) 
  }

  const removeTodo=(id)=>{
    setTodos((prevTodos)=> prevTodos.filter((prevTodo)=>prevTodo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodos((prevTodos)=>prevTodos.map(prevTodo=>prevTodo.id==id? {...prevTodo,completed:!prevTodo.completed} :  prevTodo))
  }



  return (
    <TodoProvider value={{todos,addTodo,removeTodo,updateTodo,toggleComplete}}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TodoForm /> 
                    </div>
                    <div className="flex flex-col flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        
                        {todos.length>0 && todos.map(todo=>(<div key={todo.id}><TodoItem todo={todo} /></div>))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
