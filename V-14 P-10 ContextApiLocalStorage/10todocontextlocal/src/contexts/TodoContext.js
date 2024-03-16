import { useContext,createContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            todo:"to msg",
            completed:false
        }
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    removeTodo:(id)=>{},
    toggleComplete:(id)=>{}
});

export const useTodo = () =>{
    return useContext(TodoContext);
}


export const TodoProvider = TodoContext.Provider 