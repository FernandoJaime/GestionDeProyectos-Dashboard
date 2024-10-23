import { useState, useEffect } from 'react' // Hook de react para manejar estados de componentes
import { Link, useLocation, useNavigate } from 'react-router-dom';  // Importa Link para manejar la navegación
import { Layout, Users, Network, FolderGit2, CircleUserRound, CheckCircle, Clock, XCircle, AlertCircle, ThumbsUp} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { getEmpleadoData, getProyectos} from '../api'; 

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard'}, // path se usa para navegar a la ruta correspondiente
  { icon: FolderGit2, label: 'Proyectos', path: '/proyectos'},
  { icon: Users, label: 'Clientes', path: '/clientes'},
  { icon: Network, label: 'Departamentos', path: '/departamentos'}
] // Array de objetos con los íconos y etiquetas de los elementos del menú lateral

const activeProjects = [
    { nombre: "Proyecto A", fechaInicio: "2023-01-15", fechaEntrega: "2023-06-30", situacion: "En progreso", cliente: "Cliente X", estado: "Activo", costo: 50000 },
    { nombre: "Proyecto B", fechaInicio: "2023-02-01", fechaEntrega: "2023-08-31", situacion: "Retrasado", cliente: "Cliente Y", estado: "Activo", costo: 75000 },
    { nombre: "Proyecto C", fechaInicio: "2023-03-10", fechaEntrega: "2023-07-15", situacion: "A tiempo", cliente: "Cliente Z", estado: "Activo", costo: 60000 },
  ]

const projectStatusData = [
    { name: 'Completed', value: 30 },
    { name: 'In Progress', value: 45 },
    { name: 'Pending', value: 25 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function ProyectosPage() {
  
    // Este estado determina qué elemento de la barra lateral está seleccionado
  const location = useLocation(); // Obtenemos la ruta actual para resaltar el elemento activo de la barra lateral

  const navigate = useNavigate();  // Para navegar a la página de tareas

  const [activeItem, setActiveItem] = useState<string>("");
  const [employee, setEmployee] = useState<any>(null);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const projectCostData = activeProjects.map((project) => ({
    name: project.nombre,
    costo: project.costo,
  }))

  const totalCost = activeProjects.reduce((sum, project) => sum + project.costo, 0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codEmpleado = localStorage.getItem('code');
        if (codEmpleado) {
          const codEmpleadoNumber = Number(codEmpleado);
          const empleadoData = await getEmpleadoData(codEmpleadoNumber);
          setEmployee(empleadoData);
        } 
        else {
          setError("No se encontró el código del empleado.");
        }

        const proyectosData = await getProyectos();
        setProyectos(proyectosData);

      } catch (error) {
        setError("Error al obtener los datos.");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Verifico que 'employee' no sea null
  const userLogin = employee
  ? [
      {
        Icon: CircleUserRound,
        name: `${employee.nom_empleado} ${employee.ape_empleado}`,
      },
    ]
  : []; // Si es null devuelvo un array vacío

  const getEstadoInfo = (estado: string) => {
    switch (estado) {
      case "Completado":
        return { color: "text-green-500", icon: <CheckCircle className="w-5 h-5" /> };
      case "Pendiente":
        return { color: "text-blue-500", icon: <AlertCircle className="w-5 h-5" /> };
      case "Cancelado":
        return { color: "text-red-500", icon: <XCircle className="w-5 h-5" /> };
      default:
        return { color: "text-yellow-300", icon: <Clock className="w-5 h-5" /> };
    }
  };

  const getTiempoInfo = (tiempo: string) => {
    switch (tiempo) {
      case "Entregado":
        return { colorTiempo: "text-blue-500", iconTiempo: <CheckCircle className="w-5 h-5" /> };
      case "Atrasado":
        return { colorTiempo: "text-red-500", iconTiempo: <XCircle className="w-5 h-5" /> };
      default:
        return { colorTiempo: "text-green-500", iconTiempo: <ThumbsUp className="w-5 h-5" /> };
    }
  };

  const handleProjectClick = (projectId: number) => {
    navigate(`/tareas/${projectId}`);  // Navega a la página de tareas con el ID del proyecto para cargar las tareas correspondientes
  };

  return (

    // Estructura de la página
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Barra lateral */}
      <aside className="w-64 bg-gray-800 shadow-md">
        <div className="p-3">
          <p className='p-0.5 text-gray-800'>pa que coincida</p> {/* Solo agregue esto para que coincidan las lineas, no se ve*/}
        </div>
        {/* Mapeamos los elementos de arriba y generamos botones. El botón seleccionado se resalta con un fondo más oscuro */}
        <nav className="mt-4">
          {sidebarItems.map((item) => ( // Solo agrega el Link si el elemento tiene un 'path'
            item.path ? (
              <Link to={item.path} key={item.label}>
                <button
                  className={`flex items-center w-full px-4 py-2 text-left ${
                    location.pathname === item.path // Comparamos con la ruta actual
                                    ? 'bg-gray-700 text-white' // Si coincide con la ruta actual, lo resaltamos
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setActiveItem(item.label)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </Link>
            ) : ( // Si no tiene 'path', solo renderizo el boton sin link
              <button
                key={item.label}
                className={`flex items-center w-full px-4 py-2 text-left ${
                  activeItem === item.label ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setActiveItem(item.label)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            )
          ))}
        </nav>
      </aside>

      {/* Contenido principal, que toma el resto del espacio disponible en la pantalla */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow">
          <h2 className="text-3xl font-semibold text-white whitespace-nowrap">Gestión de proyectos</h2>
          {/* Muestra los datos del usuario logueado arriba a la derecha */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              {userLogin.map((user, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <user.Icon className="w-6 h-6 text-gray-200" />
                  <span className="text-gray-200">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Contenido de Dashboard */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Costo de Proyectos</CardTitle>
                <CardDescription className="text-gray-400">Distribución de costos por proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-center">
                  <p className="text-sm text-gray-500">Costo Total de Proyectos</p>
                  <p className="text-2xl text-white font-bold">${totalCost.toLocaleString()}</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectCostData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#F3F4F6', borderRadius: '8px' }}/>
                    <Legend />
                    <Bar dataKey="costo" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Estado de Proyectos</CardTitle>
                <CardDescription className="text-gray-400">Distribución de estados de proyectos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {projectStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip  // Configuración del tooltip del grafico
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                      // Segun el color del fondo, configuro el color del texto
                      itemStyle={{ color: '#F3F4F6' }}  // Esto cambia el color del texto a blanco
                      labelStyle={{ color: '#F3F4F6' }} // Esto cambia el color del título del tooltip a blanco
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            
            {/* Tarjeta con la lista de proyectos activos */}
            <Card className="bg-gray-800 border-gray-700">
              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <CardTitle className="text-white">Proyectos Activos</CardTitle>
                <CardDescription className="text-gray-400">Lista de todos los proyectos ordenados por fecha</CardDescription>
              </CardHeader>
              {/* Contenido de la tarjeta */}
              <CardContent>
                <Table>
                  {/* Encabezados de la tabla */}
                  <TableHeader>
                  <TableRow className="bg-gray-700">
                      <TableHead className="text-gray-200 text-base font-bold">Codigo</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Nombre</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Descripcion</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Inicio</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Entrega</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Situación</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Cliente</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Estado</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Ganancia</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/* Cuerpo de la tabla */}
                  <TableBody>
                  {proyectos.map((proyecto) => {
                      const { color, icon } = getEstadoInfo(proyecto.cod_estado);
                      const { colorTiempo, iconTiempo } = getTiempoInfo(proyecto.cod_tiempo);
                      return (
                        <TableRow key={proyecto.cod_proyecto} className="cursor-pointer hover:bg-gray-700" onClick={() => handleProjectClick(proyecto.cod_proyecto)}>
                          <TableCell className="text-gray-300 text-base">{proyecto.cod_proyecto}</TableCell>
                          <TableCell className="text-gray-300 text-base w-1/5">{proyecto.nom_proyecto}</TableCell>
                          <TableCell className="text-gray-300 text-base w-1/4">{proyecto.desc_proyecto}</TableCell>
                          <TableCell className="text-gray-300 text-base whitespace-nowrap">{proyecto.fecha_inicio}</TableCell>
                          <TableCell className="text-gray-300 text-base whitespace-nowrap">{proyecto.fecha_entrega}</TableCell>
                          <TableCell className={`text-base px-4 flex items-center ${colorTiempo}`}>{iconTiempo}
                            <span className="ml-2">{proyecto.cod_tiempo}</span>
                          </TableCell>
                          <TableCell className="text-gray-300 text-base w-1/15">{proyecto.cod_cliente}</TableCell>
                          <TableCell className={`text-base py-4 px-4 flex items-center ${color}`}>{icon}
                            <span className="ml-2">{proyecto.cod_estado}</span>
                          </TableCell>
                          <TableCell className="text-gray-300 text-base">$ {proyecto.ganancia}</TableCell>
                      </TableRow>
                      )
                    }
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}