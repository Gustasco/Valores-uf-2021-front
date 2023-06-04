import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import dataActions from '../store/actions/data.actions';
import ChartComponent from '../components/chart.view.component';

const { getAllData } = dataActions;

export default function DataView() {
  const data = useSelector((store) => store.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData()); // Invoca la acción dataActions dentro del dispatch
  }, []);

  return (
    <div className="mainContainer">
      <h1 className="Title">Valor Uf 2021</h1>
      <div className="chart-actions">
        <Link to="/create" className='back-button'>Crear</Link>
        <Link to="/update" className='back-button'>Actualizar</Link>
        <Link to="/delete" className='back-button'>Eliminar</Link>
      </div>
      <ChartComponent datos={data} />
    </div>
  );
}