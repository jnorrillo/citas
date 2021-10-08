import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './Components/Formulario'
import Cita from './Components/Cita'

function App() {

  //colocar citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el statecambia
  useEffect(() => {
    citasIniciales ? localStorage.setItem('citas', JSON.stringify(citas)) : localStorage.setItem('citas', JSON.stringify([]))
  }, [citas, citasIniciales]); //se le pasa un array vacio para que se ejecute solo una vez

  // funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita])
  }

  //funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            ></Formulario>
          </div>
          <div className="one-half column">
            {citas.length === 0 ? <h2>No hay citas</h2> : <h2>Administra tus citas</h2>}
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              ></Cita>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
