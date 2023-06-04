import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dataActions from "../store/actions/data.actions";
const { createData } = dataActions;

const CreateDataForm = () => {
  const dispatch = useDispatch();
  const [newData, setNewData] = useState({
    nombreIndicador: "",
    codigoIndicador: "",
    unidadMedidaIndicador: "",
    valorIndicador: "",
    fechaIndicador: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createData(newData));
      setSuccessMessage("¡Dato creado exitosamente!");
      setNewData({
        nombreIndicador: "",
        codigoIndicador: "",
        unidadMedidaIndicador: "",
        valorIndicador: "",
        fechaIndicador: "",
      });
    } catch (error) {
      console.error("Error al crear el dato:", error);
      // Puedes manejar el error aquí si lo deseas
    }
  };

  return (
    <div>
      <Link to="/" className="back-button">
        Volver a Home
      </Link>
      <form onSubmit={handleSubmit} className="form-container">
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="input">
          <label>Nombre del Indicador:</label>
          <input
            type="text"
            name="nombreIndicador"
            value={newData.nombreIndicador}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Código del Indicador:</label>
          <input
            type="text"
            name="codigoIndicador"
            value={newData.codigoIndicador}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Unidad de Medida del Indicador:</label>
          <input
            type="text"
            name="unidadMedidaIndicador"
            value={newData.unidadMedidaIndicador}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Valor del Indicador:</label>
          <input
            type="number"
            name="valorIndicador"
            value={newData.valorIndicador}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Fecha del Indicador:</label>
          <input
            type="text"
            name="fechaIndicador"
            value={newData.fechaIndicador}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateDataForm;
