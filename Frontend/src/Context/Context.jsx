import React, { createContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate()
  const [signup, setsignup] = useState(null)
  const [load, setload] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  return (
    <MyContext.Provider value={{ userInfo, setUserInfo , isEdit, setIsEdit, navigate, signup, setsignup, load, setload}}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
