import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import dataActions from '../store/actions/data.actions';

export default function UpdateForm() {
  const dispatch = useDispatch();
  const [fechaIndicador, setFechaIndicador] = useState('');
  const [codigoIndicador, setCodigoIndicador] = useState('');
  const [nuevoValorIndicador, setNuevoValorIndicador] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(dataActions.updateData({
        fechaIndicador,
        codigoIndicador,
        nuevoValorIndicador,
      })).then((response) => {
        if (response.payload && response.payload.message === 'Datos actualizados correctamente') {
          setConfirmMessage(`Actualizado correctamente, el nuevo valor de ${codigoIndicador} de la fecha ${fechaIndicador} es ${nuevoValorIndicador}`);
          setEditMode(true);
        } else {
          console.error('Error al actualizar el dato');
        }
      });
    } catch (error) {
      console.error('Error en la comunicación con el servidor:', error);
    }

    setFechaIndicador('');
    setCodigoIndicador('');
    setNuevoValorIndicador('');
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  return (
    <div>
    <Link to="/" className="back-button">Volver a Home</Link>
    <div className="form-container">
      <h2>Actualizar Valor Indicador</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha Indicador:</label>
          <input
            type="text"
            value={fechaIndicador}
            onChange={(e) => setFechaIndicador(e.target.value)}
            placeholder="YYYY-MM-DD"
            required
          />
        </div>
        <div className="form-group">
          <label>Codigo Indicador:</label>
          <input
            type="text"
            value={codigoIndicador}
            onChange={(e) => setCodigoIndicador(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nuevo Valor Indicador:</label>
          {editMode ? (
            <input
              type="text"
              value={nuevoValorIndicador}
              onChange={(e) => setNuevoValorIndicador(e.target.value)}
              required
            />
          ) : (
            <p>{nuevoValorIndicador}</p>
          )}
        </div>
        {editMode ? (
          <>
            <p className="ChartErrorMessage">{confirmMessage}</p>
            <button type="button" onClick={() => setEditMode(false)} className='back-button'>Editar</button>
          </>
        ) : (
          <button type="button" onClick={handleEditMode}  className='back-button'>Editar</button>
        )}
        {editMode && (
          <button type="submit" className="back-button">Actualizar</button>
        )}
      </form>
    </div>
    </div>
  );
}
