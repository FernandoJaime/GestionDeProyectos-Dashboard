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

// Funcion para obtener los proyectos terminados con su gananci y ganancia total para grafico de ProyectosPage

export const getProyectosTerminadosGanancia = async () => {
  try {
    const response = await fetch(`${API_URL}proyectos/terminados_ganancia`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo proyectos terminados y ganancias.');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo proyectos terminados y ganancias: ', error);
    throw error;
  }
};


// Funcion para obtener los porcentajes de proyectos en cada estado para grafico de ProyectosPage

export const getProyectosPorcentajeEstados = async () => {
  try {
    const response = await fetch(`${API_URL}proyectos/porcentaje_estados`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo porcentaje de estados proyectos.');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo porcentaje de estados proyectos: ', error);
    throw error;
  }
};


// Función para obtener los datos del proyecto

export const getProyectoData = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}proyecto/${id}`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al obtener los datos del proyecto');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo los datos del proyecto:', error);
    throw error;
  }
};

// Funcion para obtener las tareas del proyecto 

export const getProyectoTareas = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}proyecto/tareas/${id}`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo las tareas del proyecto');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo las tareas del proyecto:', error);
    throw error;
  }
};

// Funcion para obtener las tareas del proyecto 

export const getTareasPorcentaje = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}tareas/porcentaje_estados/${id}`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo los porcentajes estados de tareas');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo los porcentajes estados de tareas:', error);
    throw error;
  }
};

// Funcion para obtener todos los empleados de un departamento

export const getEmpleadosDepartamento = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}empleados/departamento/${id}`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo los empleados del departamento');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo los empleados del departamento:', error);
    throw error;
  }
};

export const getDepartamentos = async () => {
  try {
    const response = await fetch(`${API_URL}departamentos`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo los departamentos');
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error obteniendo los departamentos:', error);
    throw error;
  }
};

export const getClientes = async () => {
  try {
    const response = await fetch(`${API_URL}clientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo los clientes');
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo los clientes:', error);
    throw error;
  }
};

export const getProyectosCliente = async (clientId: string) => {
  try {
    const response = await fetch(`${API_URL}cliente/proyectos/${clientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo los proyectos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo los proyectos:', error);
    throw error;
  }
};

export const getDepartamentosGraficos = async () => {
  try {
    const response = await fetch(`${API_URL}departamentos/graficos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo los gráficos de departamentos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo los gráficos de departamentos:', error);
    throw error;
  }
};
export const getDepartamentosTotal = async () => {
  try {
    const response = await fetch(`${API_URL}departamentos/total`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error obteniendo el total de departamentos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo el total de departamentos:', error);
    throw error;
  }
};