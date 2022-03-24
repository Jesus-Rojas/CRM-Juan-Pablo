import { useEffect, useState } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {
  // hooks
  const [clientes, setClientes] = useState([])

  //methods
  const handleDelete = async (id) => { 
    const confirmar = confirm('¿Desea eliminar este cliente?')
    if (confirmar) {
      try {
          const url = `${import.meta.env.VITE_API_URL}/${id}`
          const respuesta = await fetch(url, {
            method: 'DELETE',
          })
          await respuesta.json()
          obtenerClientesAPI();
      } catch (error) {
        console.log(error)
      }
    }
  }
  const obtenerClientesAPI = async () => {
    try {
      const url = import.meta.env.VITE_API_URL
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      setClientes(resultado)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerClientesAPI();
  }, [])
  
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map( cliente => (
            <Cliente 
              key={cliente.id}
              cliente={cliente}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inicio