import React from 'react'
import { Formik, Form, Field } from 'formik'

const Formulario = () => {
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar Cliente</h1>
      <Formik>
        <Form
          className='mt-10'
        >
          <div className='mb-4'>
            <label 
              htmlFor="nombre"
              className='text-gray-800'
            >Nombre:</label>
            <Field
              className='mt-2 block w-full p-3 bg-gray-50'
              id='nombre'
              type='text'
              placeholder='Nombre del Cliente'
            />
          </div>
          <div className='mb-4'>
            <label 
              htmlFor="empresa"
              className='text-gray-800'
            >Empresa:</label>
            <Field
              className='mt-2 block w-full p-3 bg-gray-50'
              type='text'
              id='empresa'
              placeholder='Empresa del Cliente'
            />
          </div>
          <div className='mb-4'>
            <label 
              htmlFor="email"
              className='text-gray-800'
            >Correo:</label>
            <Field
              className='mt-2 block w-full p-3 bg-gray-50'
              type='email'
              id='email'
              placeholder='Correo del Cliente'
            />
          </div>
          <div className='mb-4'>
            <label 
              htmlFor="telefono"
              className='text-gray-800'
            >Telefono:</label>
            <Field
              className='mt-2 block w-full p-3 bg-gray-50'
              type='tel'
              id='telefono'
              placeholder='Teléfono del Cliente'
            />
          </div>
          <div className='mb-4'>
            <label 
              htmlFor="notas"
              className='text-gray-800'
            >Notas:</label>
            <Field
              className='mt-2 block w-full p-3 bg-gray-50 h-40'
              type='text'
              as='textarea'
              id='notas'
              placeholder='Notas del Cliente'
            />
          </div>
          <input 
            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
            type="submit" 
            value='Agregar Cliente'
          />
        </Form>
      </Formik>
    </div>
  )
}

export default Formulario