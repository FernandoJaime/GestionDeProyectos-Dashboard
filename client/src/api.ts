// src/api.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export interface Empleado {
  id: number;
  name: string;
}

export const getEmpleados = async (): Promise<Empleado[]> => {
  try {
    const response = await axios.get<Empleado[]>(`${API_URL}empleados`);
    return response.data;
  } catch (error) {
    console.error('Error fetching empleados:', error);
    throw error;
  }
};

export const loginEmpleado = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}login`, { 
      email_empleado: email, pass_hash: password 
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};