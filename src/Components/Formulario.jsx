import React, { Fragment, useState } from "react";
import uuid from 'uuid/dist/v4';
import PropType from 'prop-types';

const Formulario = ({crearCita}) => {
  //Crear state en citas
  const [cita, updateCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  //funcion a ejecutar cada vez que el usuario escribe
  //recordar que siempre se toma una copia del state anterior si no lo va ha sobreescribir y se pierde la informacion anterior
  const updateState = e => {
      updateCita({
          ...cita,
          [e.target.name]: e.target.value
      })
  }

  //state para validar el formulario
  const [ error, updateError ] = useState(false)

  //extrayendo valores
  const {mascota, propietario, fecha, hora, sintomas} = cita;

  //cuando se envia el forkulario
  const submitCita = e => {
      e.preventDefault(); //para prevenir el evento por default

      //validar
      //trim() elimina los espacios en blanco que el usuario deja al inicio o fin
     if( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
         updateError(true);
         return;
     }

     //Eliminar mensaje
     updateError(false);
      
      //asignar un ID
      cita.id = uuid();

      //crear la cita
      crearCita(cita);

      //reinicar el from
      updateCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
      });
  }

  return (
    <Fragment>
      <h2>Crear Citas</h2>
      {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
      <form
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={updateState}
          value={mascota}
        ></input>

        <label>Nombre de Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={updateState}
          value={propietario}
        ></input>

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={updateState}
          value={fecha}
        ></input>

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={updateState}
          value={hora}
        ></input>

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={updateState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.PropType = {
  crearCita: PropType.func.isRequired
}

export default Formulario;
