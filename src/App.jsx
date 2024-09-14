import { useState, useEffect } from 'react'

import './App.css'
import Navbar from './components/Navbar'

// const {v4: uuidv4} = require('uuid')
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";


function App() {
  const [todo, setTodo]= useState("")
  const [todos, setTodos]=useState([])
  const [showFinished, setShowFinished]= useState(true)

  useEffect(()=>{
    console.log(todos)
    let todoString= window.localStorage.getItem("todos")
    if(todoString!==null){
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }

  }, [])

  const savetoLS = ()=>{
    window.localStorage.setItem('todos', JSON.stringify(todos))
  }
  const toggleFinished=(e)=>{
    setShowFinished(!showFinished)
  }
  const handleDelete=(e, id)=>{
    // let index = todos.findIndex(item=>{
    //   return item.id ===id;
    // })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    savetoLS()


  }

  const handleEdit=(e, id)=>{
    let t= todos.filter(i=> i.id===id)
    setTodo(t[0].todo)
    //Deleting the todo
    let index = todos.findIndex(item=>{
      return item.id ===id;
    })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    savetoLS()

  }

  const handleAdd=()=>{
  setTodos([...todos, {checkboxid: uuidv4(),id: uuidv4(), todo, isCompleted:false}])
  setTodo("")
  console.log(todos)
  savetoLS()
  }

  const handleChange =(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
    let id= e.target.name
    
    let index = todos.findIndex(item=>{
      return item.id ===id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    savetoLS()
  }


  return (
    <>
      <Navbar/>
      <div className=' mx-auto my-5  p-5 '>
        <div className="addTodo ">
          <div className='text-lg font-bold flex bg-yellow-100 rounded-lg flex-col px-2'>Add a Todo

          <div className='flex '>
          <input type="text" className=' border border-black w-1/2 rounded-[7vw] ' onChange={handleChange}  value={todo}  />
          <button onClick={handleAdd}
          disabled={todo.length<3}
          className='rounded-sm text-bold bg-violet-400 mx-8 border border-black hover:text-white hover:bg-violet-900 transition-all'>
            <FaRegSave />
          </button>
          </div>
          </div>
        </div>

        <div className='flex bg-yellow-100 rounded-lg  mt-6 justify-center'>

          <div className='text-xl font-bold flex items-center '>Your Todos

          </div>

          
        </div>
        <div className='flex'>
        <input
          onChange={toggleFinished}
          type="checkbox" 
          checked={showFinished}
          id='gr1' 
          />
          <label className='text-white cursor-pointer' htmlFor='gr1' >Show finished</label>
          </div>
          <div className="todos">
            {todos ==null || todos.length===0 &&  <div className='text-white font-bold text-3xl text-center'>No todos to display</div> }
            {todos.map(item=>{
              return (showFinished|| !item.isCompleted) &&<div key ={item.id} className="todo flex  bg-violet-100 rounded-sm h-auto items-center justify-between">
                <input name = {item.id} onChange={handleCheckbox} type="checkbox" id={item.id} checked={item.isCompleted} />
                <div className='text text-xl px-2 overflow-hidden hover:overflow-auto' >
                  <div className={item.isCompleted? "line-through": ""}> 
                    <label className='cursor-pointer
                    ' htmlFor= {item.id}>
                  
                  {item.todo}
                  </label>
                  </div>

                </div>
                <div className="buttons mx-2 flex">
                  <button onClick={(e)=>{ handleEdit(e, item.id)}}
                  className='font-bold  mx-2 bg-violet-400 border border-black rounded-md hover:text-white hover:bg-violet-900 transition-all'><FaEdit /></button>
                  <button onClick={(e)=>{handleDelete(e, item.id)}}
                   className='font-bold bg-violet-400 border border-black rounded-md hover:text-white hover:bg-violet-900 transition-all '><MdDelete /></button>
                </div>
              </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
