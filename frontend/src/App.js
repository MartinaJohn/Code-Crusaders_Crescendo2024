import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Greeter from "./pages/Greeter"
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Greeter/>}/>
      <Route path="/Signin" element={<Signin/>}/>
      <Route path="/Signup" element={<Signup/>}/>
        
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;