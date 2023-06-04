import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dataActions from '../store/actions/data.actions';

export default function DeleteForm() {
  const dispatch = useDispatch();
  const [fechaIndicador, setFechaIndicador] = useState('');
  const [codigoIndicador, setCodigoIndicador] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(dataActions.deleteData({ fechaIndicador, codigoIndicador }));

    setConfirmMessage(`Dato eliminado para el código de indicador ${codigoIndicador} de la fecha ${fechaIndicador}`);
    setFechaIndicador('');
    setCodigoIndicador('');
  };

  return (
    <div>
      <Link to="/" className="back-button">
        Volver a Home
      </Link>
      <div className="form-container">
        <h2>Eliminar Dato</h2>
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
          {confirmMessage && <p className="confirm-message">{confirmMessage}</p>}
          <button type="submit" className="back-button">
            Eliminar
          </button>
        </form>
      </div>
    </div>
  );
}
