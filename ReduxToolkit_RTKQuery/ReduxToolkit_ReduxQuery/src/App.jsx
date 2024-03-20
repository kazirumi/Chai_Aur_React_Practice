import './App.css'
import {  useSelector,useDispatch } from 'react-redux'
import { addTodo,removeTodo } from './features/todo/todoSlice'
import { useState } from 'react'

import { useGetPostsQuery,useCreatePostMutation } from './app/services/jsonServerApi'

function App() {

  // RTK Tool kit Example
  // const todos = useSelector((state)=>state.todo1.todos);

  // console.log(todos)

  // const [text, setText] = useState('');
  // // initial the dispatch here
  // const dispatch = useDispatch();

  // const addTodoHandler = (event) => {
  //   event.preventDefault();
  //   // update the state here using addTodo action
  //   // action only receive one parameter, which is payload
  //   dispatch(addTodo(text));
  //   setText('');
  // };


  // RTK query example
  const [page, setPage] = useState(1);
 const [postForm, setPostForm] = useState({title:'',views:0})

  const [createPost,{isLoading:creatingLoading}]= useCreatePostMutation()

  const {data: posts,
    isLoading,
    isFetching,
    isError,
    error} = useGetPostsQuery(page);


  if(isLoading || isFetching)
  return <div>loading.....</div>

  if(isError){
    console.log({error})
    return <div>{error.status}</div> 
  }

  const submitPost=(event)=>{
    event.preventDefault();
    createPost(postForm);
    event.target.reset();
  }

  return (
    <div>
      {/* RTK Toolkit example */}
      {/* <form onSubmit={addTodoHandler}>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Add todo</button>
    </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={()=>dispatch(removeTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul> */}

      {/* rtk query example */}
      {page}
      <form onSubmit={(e) => submitPost(e)}>
      <h3>New Album</h3>
      <div>
        <label htmlFor='title'>Title:</label>{' '}
        <input type='text' id='title' value={postForm.title} onChange={(e)=>setPostForm({...postForm,title:e.target.value})} />
      </div>

      <br />
      <div>
        <label htmlFor='views'>Views:</label>{' '}
        <input type='number' id='views' value={postForm.views} onChange={(e)=>setPostForm({...postForm,views:e.target.value})} />
      </div>

      <br />

      <div>
        <input type='submit' 
          value='Add New Post' 
          disabled={creatingLoading}   
        />
        {creatingLoading && ' Loading...'}
      </div>
    </form>
    <br></br>
      <ul>
        {posts?.data?.map((post)=>(<li key={post.id}>{post.title}</li>))}
      </ul>
      <button 
        disabled={page <= 1} 
        onClick={() => setPage((prev) => prev - 1)}
      >
        Prev
      </button>
      <button
        disabled={posts.pages<=page}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default App
