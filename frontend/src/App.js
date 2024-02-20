import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Greeter from "./pages/Greeter"

const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Greeter/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;