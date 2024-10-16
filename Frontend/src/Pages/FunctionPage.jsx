import React , {useContext,useState, useEffect} from 'react'
import { MyContext } from '../Context/Context'
import TodoList from '../components/TodoList'
import CREDTodo from '../components/CREDTodo'

function FunctionPage() {
    const {userInfo,setUserInfo , navigate} = useContext(MyContext)

    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        if(!userInfo){
            navigate("/")
        }
    }, [userInfo, navigate])


    const logout = () => {
        localStorage.removeItem("userInfo")
        setUserInfo(null)
        navigate("/")
    }



  return (
    <div className='w-screen h-screen flex justify-center flex-col items-center'>
        <div id="navbarholder" className='w-full h-[5vh] flex justify-around items-center'>
            <div className=' md:w-[90vw] lg:w-[95vw] xl:w-[95vw] h-[5vh] w-[90vw] bg-violet-500 border-2 border-white rounded-xl flex justify-center items-center text-white text-2xl font-bold'>
                The 2-Do App
            </div>
            <div onClick={() => setShowProfile(!showProfile)} className='w-[10vw] md:w-[10vw] lg:w-[5vw] xl:w-[5vw] relative h-[5vh] hover:bg-violet-700 bg-violet-500 border-2 rounded-xl flex justify-center items-center text-white text-[20px] font-semibold'>
                {userInfo && userInfo.name}
                {showProfile && <div id="logout" onClick={logout} className='z-40 cursor-pointer bg-red-500 absolute right-0  rounded-xl px-4 py-2 my-[2px] top-[100%]'>Logout</div>}
            </div>
        </div>
        <div className='w-full h-[95vh] bg-violet-500 rounded-t-xl flex flex-col md:flex-row justify-around items-center text-white text-2xl font-bold'>
            <div id="todospg" style={{boxShadow: "0px 0px 10px black"}} className='relative w-[90vw] md:w-[50vw] overflow-y-scroll h-[50vh] md:h-[75vh] flex flex-col justify-start items-center bg-white rounded-xl mb-4 md:mb-0' >
                <TodoList/>
            </div>
            <CREDTodo/>
        </div>
    </div>
  )
}

export default FunctionPage