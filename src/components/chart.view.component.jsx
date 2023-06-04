import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import dataActions from '../store/actions/data.actions';
const { getAllData } = dataActions;

Chart.register(...registerables);

const ChartComponent = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.data.data);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filteredData = chartData?.filter((data) => {
    const dataDate = new Date(data.fechaIndicador);
    return (
      (!startDate || dataDate >= startDate) && (!endDate || dataDate <= endDate)
    );
  });

  const sortedData = [...filteredData].sort(
    (a, b) => new Date(a.fechaIndicador) - new Date(b.fechaIndicador)
  );

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (value === 0) return '0';
            if (value === 10000) return '10000';
            if (value === 20000) return '20000';
            if (value === 30000) return '30000';
            if (value === 40000) return '40000';
            return '';
          },
        },
      },
    },
  };

  return (
    <div className='chart-container'>
      <div className='Date'>
        <div>
          <label>Fecha de inicio:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(new Date(e.target.value))}
          />
        </div>
        <div>
          <label>Fecha de fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleEndDateChange(new Date(e.target.value))}
          />
        </div>
      </div>
      {sortedData.length > 0 ? (
        <Bar
          data={{
            labels: sortedData.map((data) => data.fechaIndicador),
            datasets: [
              {
                label: 'Valores',
                data: sortedData.map((data) => data.valorIndicador),
                backgroundColor: 'rgba(75, 192, 192, 1)',
              },
            ],
          }}
          options={options}
        />
      ) : (
        <p>No hay datos disponibles para el rango de fechas seleccionado.</p>
      )}
    </div>
  );
};

export default ChartComponent;

