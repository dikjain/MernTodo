import React from 'react'
import {Routes , Route } from "react-router-dom"
import HomePage from './Pages/HomePage'
import FunctionPage from './Pages/FunctionPage' 

function App() {
  return (
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/function" element={<FunctionPage/>}/>
  </Routes>
  )
}

export default App