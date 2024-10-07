// src/api.ts

const API_URL = 'http://127.0.0.1:8000/api/';

export interface Empleado {
  id: number;
  name: string;
}

export const getEmpleados = async (): Promise<Empleado[]> => {
  try {
    const response = await fetch(`${API_URL}empleados`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching empleados');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching empleados:', error);
    throw error;
  }
};

// authService.ts
export const loginEmpleado = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_empleado: email, pass_hash:password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud');
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};