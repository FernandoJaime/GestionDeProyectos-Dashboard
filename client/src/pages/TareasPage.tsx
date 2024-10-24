import { useState, useEffect } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { Layout, Users, Network, FolderGit2, CircleUserRound, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { getEmpleadoData, getProyectoData, getProyectoTareas, getTareasPorcentaje } from '../api';

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard' }, // path se usa para navegar a la ruta correspondiente
  { icon: FolderGit2, label: 'Proyectos', path: '/proyectos' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: Network, label: 'Departamentos', path: '/departamentos' }
] // Array de objetos con los íconos y etiquetas de los elementos del menú lateral

const COLORS = ['#e8e220', '#00C49F', '#0088FE', '#ff5842']

export function TareasPage() {
  const location = useLocation(); // Obtenemos la ruta actual para resaltar el elemento activo de la barra lateral
  const navigate = useNavigate();  // Para navegar a la página de departamentos
  const { id } = useParams();
  const [activeItem, setActiveItem] = useState<string>("");
  const [employee, setEmployee] = useState<any>(null);
  const [proyecto, setProyecto] = useState<any>(null);
  const [tareas, setTareas] = useState<any[]>([]);
  const [porcentajeTareas, setPorcentajeTareas] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

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

        if (id) {
          const proyectoData = await getProyectoData(Number(id));
          const tareasData = await getProyectoTareas(Number(id));
          const porcentajeTareasData = await getTareasPorcentaje(Number(id));
          setProyecto(proyectoData);
          setTareas(tareasData);
          setPorcentajeTareas(porcentajeTareasData);
        }
        else {
          setError("No se encontró el código del proyecto.");
        }

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

  const handleProjectClick = (depaID: number) => {
    navigate(`/empleados/${depaID}`);  // Navega a la página de tareas con el ID del proyecto para cargar las tareas correspondientes
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 shadow-md">
        <div className="p-3">
          <p className='p-0.5 text-gray-800'>pa que coincida</p>
        </div>

        {/* Mapeamos los elementos de arriba y generamos botones. El botón seleccionado se resalta con un fondo más oscuro */}
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            item.path ? ( // Solo agrega el Link si el elemento tiene un 'path'
              <Link to={item.path} key={item.label}>
                <button
                  className={`flex items-center w-full px-4 py-2 text-left ${location.pathname === item.path // Comparamos con la ruta actual
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
                className={`flex items-center w-full px-4 py-2 text-left ${activeItem === item.label ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow">
          <h2 className="text-3xl font-semibold text-white whitespace-nowrap">{proyecto ? `Proyecto - ${proyecto.nom_proyecto}` : 'Cargando...'}</h2>
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

        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          <div className="mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Estado de las tareas</CardTitle>
                <CardDescription className="text-gray-400 tex-base">Porcentaje de la totalidad de tareas en cada estado</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={porcentajeTareas}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {porcentajeTareas.map((_, index) => (
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
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Tareas</CardTitle>
                <CardDescription className="text-gray-400 text-base">Lista de todas las tareas del proyecto</CardDescription>
              </CardHeader>
              <CardContent>
              <Table>
              <TableHeader>
                <TableRow className="bg-gray-700 border-b">
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Código</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Nombre</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Descripción</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-5 ">Costo</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Duración</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Proyecto</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Departamento</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tareas.map((tarea) => {
                  const { color, icon } = getEstadoInfo(tarea.cod_estado);
                  return (
                    <TableRow key={tarea.cod_tarea} className="cursor-pointer hover:bg-gray-700" onClick={() => handleProjectClick(tarea.cod_departamento)}>
                      <TableCell className="text-gray-300 text-base py-2 px-4 ">{tarea.cod_tarea}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 ">{tarea.nom_tarea}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 ">{tarea.desc_tarea}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 ">$ {tarea.costo_tarea}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 ">{tarea.duracion_tarea} min</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 ">{tarea.cod_proyecto}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 ">{tarea.nom_departamento}</TableCell>
                      <TableCell className={`text-base py-2 px-4 flex items-center ${color}`}>
                        {icon}
                        <span className="ml-2">{tarea.cod_estado}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
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