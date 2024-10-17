import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context/Context'
import axios from 'axios'

function CREDTodo() {
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const {userInfo, load, setload, isEdit, setIsEdit} = useContext(MyContext)

    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    useEffect(() => {
        if (isEdit) {
            setTitle(isEdit.title)
        }
    }, [isEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
            };
            if (!isEdit) {
                await axios.post("/api/todo/create", { title, id: userInfo._id }, config)
            } else {
                await axios.post("/api/todo/UpdateTodo", { title, id: isEdit.id }, config)
                setIsEdit(false)
            }
            setTitle("")
            setload((prev) => !prev)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div id="todocrt" style={{ boxShadow: "0px 0px 10px black" }} className='w-[90vw] md:w-[30vw] h-[35vh] border-2 border-white rounded-xl'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center h-full'>
                <input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    placeholder="Todo Title"
                    className='w-[80vw] md:w-[25vw] h-[5vh] text-violet-500 mb-4 p-2 border-2 border-gray-300 rounded-md'
                />
                <button
                    type="submit"
                    className='min-w-[30vw] md:min-w-[10vw] w-fit px-2 h-[5vh] bg-white text-violet-500 font-bold rounded-md flex justify-center items-center'
                    disabled={loading}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        isEdit ? "Update Todo" : "Add Todo"
                    )}
                </button>
            </form>
        </div>
    )
}

export default CREDTodo