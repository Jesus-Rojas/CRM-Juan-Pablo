import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'
import VerCliente from './pages/VerCliente'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/clientes" element={<Layout />} >
          <Route index element={<Inicio />} />
          <Route path='nuevo' element={<NuevoCliente />} />
          <Route path='editar/:id' element={<EditarCliente />} />
          <Route path=':id' element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
