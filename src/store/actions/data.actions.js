import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllData = createAsyncThunk('getAllData', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/datas/UF');
        return {
            data: response.data,
            message: 'Datos obtenidos exitosamente',
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            message: 'Error al obtener los datos',
        };
    }
});

const createData = createAsyncThunk('createData', async (createData) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/datas/create',
            createData
        );
        return {
            data: response.data,
            message: 'Datos creados exitosamente',
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            message: 'Error al crear los datos',
        };
    }
});

const updateData = createAsyncThunk('updateData', async (updateData) => {
    try {
        const { fechaIndicador, codigoIndicador, nuevoValorIndicador } = updateData;
        const response = await axios.put(
            `http://localhost:3000/api/datas/${fechaIndicador}/${codigoIndicador}`,
            { nuevoValorIndicador }
        );
        return {
            data: response.data,
            message: 'Datos actualizados correctamente',
        };
    } catch (error) {
        console.log(error);
        return {
            data: null,
            message: 'Error al actualizar los datos',
        };
    }
});

const deleteData = createAsyncThunk('deleteData', async ({ fechaIndicador, codigoIndicador }) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/datas/${fechaIndicador}/${codigoIndicador}`);
        if (response.data && response.data.message === 'Datos eliminados exitosamente') {
            return {
                data: response.data.dataId,
                message: 'Dato eliminado correctamente',
            };
        } else {
            throw new Error('Error al eliminar el dato');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error en la comunicación con el servidor');
    }
});



const dataActions = {
    getAllData,
    createData,
    deleteData,
    updateData,
};

export default dataActions;
