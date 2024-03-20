import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice"
import { setupListeners } from "@reduxjs/toolkit/query";
import { jsonServerApi } from "./services/jsonServerApi";

export const store =  configureStore({
    reducer: {
        todos:todoReducer,
        todo1:todoReducer,

        [jsonServerApi.reducerPath]: jsonServerApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(jsonServerApi.middleware)
    
});


setupListeners(store.dispatch)