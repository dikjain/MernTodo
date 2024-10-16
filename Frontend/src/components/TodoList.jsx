import React,{ useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "../Context/Context";

function TodoList() {
    const {userInfo, load, isEdit, setIsEdit} = useContext(MyContext)
    const [todos, setTodos] = useState([])


        const fetchTodos = async () => {
            if(userInfo){   
                const config = {
                    headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                }
            }
            try {
                const {data} = await axios.post("/api/todo/get", {
                    id: userInfo._id
                }, config)
                setTodos(data.todos)
            } catch (error) {
                console.log(error);
            }
        }
        
    }


    useEffect(() => {
        fetchTodos();
    }, [userInfo ,load])

    const handleDelete = async (id) => {
        const config = {
            headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${userInfo.token}`
            }
        }       
        try {
            
            await axios.post("/api/todo/delete", {
                id
            }, config)
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckbox = async (id, isDone) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        try {
            await axios.post("/api/todo/CheckTodo", {
                id,
                isDone
            }, config)
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    }

    
    

    return (
        <>
            <div id="todolist" style={{ boxShadow: "0px 2px 4px black" }} className="w-[100%] h-[5vh] bg-violet-500 border-2 border-white rounded-xl flex justify-center items-center text-white text-2xl font-bold">
                Todo List
            </div>
            {todos.length > 0 && todos.map((todo) => (
                <div id="todoitem" key={todo._id} style={{ boxShadow: "0px 2px 4px black" }} className=" w-[90%] mt-[10px] border-violet-500 border-2 min-h-[5vh] bg-white justify-between rounded-xl flex flex-col md:flex-row px-4 py-2 items-center text-violet-500 text-2xl font-medium">
                    <div id="todoitemtext" className="w-[80%] md:w-[70%] rounded-xl h-fit break-words border-2 bg-violet-500 text-white p-2 mb-2 md:mb-0" style={{ textDecoration: todo.isDone ? 'line-through black' : 'none' }}>
                        {todo.title}
                </div>
                <div id="todoitembtn" className="flex w-[100%] md:w-[30%] justify-around items-center">
                    <button onClick={() => setIsEdit({title :todo.title , id: todo._id})} className="text-violet-500 hover:text-violet-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button onClick={() => handleDelete(todo._id)} className="text-violet-500 hover:text-violet-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                    </button>
                    <input
                        type="checkbox"
                        className="w-5 h-5 mx-1 rounded-full hover:scale-110 transition-all duration-300 accent-violet-500 cursor-pointer"
                        checked={todo.isDone}
                        
                        onChange={() => handleCheckbox(todo._id, !todo.isDone)}
                    />
                </div>
            </div>
            ))}
        </>
    );
}

export default TodoList;
