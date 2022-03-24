import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'


const Formulario = ({ cliente, cargando }) => {
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo')
      .required('El nombre es obligatorio'),
    empresa: Yup.string()
      .required('La empresa es obligatoria'),
    email: Yup.string()
      .email('El correo no es valido')
      .required('El correo es obligatorio'),
    telefono: Yup.number()
      .positive('El número no es valido')
      .integer('El número no es valido')
      .typeError('El número no es valido')
  })
  const navigate = useNavigate();

  //methods
  const handleSubmit = async (value) => { 
    try {
      let respuesta;
      if (cliente?.id) {
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(value),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        const url = import.meta.env.VITE_API_URL
        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(value),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      await respuesta.json();
      navigate('/clientes')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    cargando
    ? <Spinner />
    : (
      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
          { cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente' }
        </h1>
        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? '',
            empresa: cliente?.empresa ?? '',
            email: cliente?.email ?? '',
            telefono: cliente?.telefono ?? '',
            notas: cliente?.notas ?? '',
          }}
          enableReinitialize={true}
          onSubmit={async (value, { resetForm }) => {
            await handleSubmit(value)
            resetForm()
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({errors, touched}) => (
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
                  name='nombre'
                  type='text'
                  placeholder='Nombre del Cliente'
                />
                { errors.nombre && touched.nombre 
                ? <Alerta>{errors.nombre}</Alerta>
                : null }
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
                  name='empresa'
                  placeholder='Empresa del Cliente'
                />
                { errors.empresa && touched.empresa 
                ? <Alerta>{errors.empresa}</Alerta>
                : null }
              </div>
              <div className='mb-4'>
                <label 
                  htmlFor="email"
                  className='text-gray-800'
                >Correo:</label>
                <Field
                  className='mt-2 block w-full p-3 bg-gray-50'
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Correo del Cliente'
                />
                { errors.email && touched.email 
                ? <Alerta>{errors.email}</Alerta>
                : null }
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
                  name='telefono'
                  placeholder='Teléfono del Cliente'
                />
                { errors.telefono && touched.telefono 
                ? <Alerta>{errors.telefono}</Alerta>
                : null }
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
                  name='notas'
                  id='notas'
                  placeholder='Notas del Cliente'
                />
              </div>
              <input 
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer'
                type="submit" 
                value={ cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente' }
              />
            </Form>
          )}
        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario