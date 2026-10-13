import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import ProductDetails from './components/ProductDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>
    </>
  )
}

export default App
