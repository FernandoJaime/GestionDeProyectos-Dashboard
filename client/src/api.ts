const API_URL = 'http://127.0.0.1:8000/api/';

// Funcion para el login 

export const loginEmpleado = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_empleado: email, pass_hash:password }),
    });

    // Si el backend devuelve un código de error, capturamos el mensaje del backend
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en la solicitud');
    }

    return await response.json();

  } catch (error) {
    console.error('Error login:', error);
    throw error; 
  }
};

// Función para obtener los datos del empleado

export const getEmpleadoData = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}empleado/${id}`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al obtener los datos del empleado');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo los datos del empleado:', error);
    throw error;
  }
};

// Funcion para obtener las tareas del empleado 

export const getEmpleadoTareas = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}empleado/tareas/${id}`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo las tareas del empleado');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo las tareas del empleado:', error);
    throw error;
  }
};

// Funcion para obtener los proyecto activos osea "en proceso"

export const getProyectosEnProceso = async () => {
  try {
    const response = await fetch(`${API_URL}proyectos/enproceso`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo los proyectos activos.');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo los proyectos activos: ', error);
    throw error;
  }
};

// Funcion para obtener los cinco clientes principales (con mas proyectos)

export const getClientesPrincipales = async () => {
  try {
    const response = await fetch(`${API_URL}clientes/principales`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo los clientes principales.');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo los clientes principales: ', error);
    throw error;
  }
};

// Funcion para obtener la cantidad de proyectos con su estado y ganancia para el grafico de barras de la DashboardPage

export const getProyectosEstadoGanancia = async () => {
  try {
    const response = await fetch(`${API_URL}proyectos/estados_ganancia`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo cantidad de proyectos, estados y ganancias.');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo cantidad de proyectos, estados y ganancias: ', error);
    throw error;
  }
};

// Funcion para obtener la cantidad de proyectos iniciados cada mes para el grafico de la DashboardPage

export const getProyectosIniciados = async () => {
  try {
    const response = await fetch(`${API_URL}proyectos/iniciados`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo cantidad de proyectos iniciados.');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo cantidad de proyectos iniciados: ', error);
    throw error;
  }
};

// Funcion para obtener todos los proyectos

export const getProyectos = async () => {
  try {
    const response = await fetch(`${API_URL}proyectos`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo todos los proyectos.');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo todos los proyectos: ', error);
    throw error;
  }
};