import { createSlice } from "@reduxjs/toolkit";


export const todoSlice = createSlice({
    name:'todos',
    initialState:{
        todos:[]
    },
    reducers:{
        addTodo:(state,action)=>{
            const todo ={
                id : Date.now(),
                text:action.payload,

            }
            state.todos.push(todo);
        },
        removeTodo:(state,action)=>{
            let index = state.todos.find(x=>x.id==action.payload);

            if(index)
            state.todos.splice(index,1)
        }
    }
});


export const {addTodo,removeTodo} = todoSlice.actions;

export default todoSlice.reducer;