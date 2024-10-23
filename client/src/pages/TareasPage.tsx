import { useState, useEffect } from 'react'
import { Link, useLocation} from 'react-router-dom'
import { Layout, Users, Network, CircleUserRound, FolderGit2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { getEmpleadoData } from '../api'; 

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard'}, // path se usa para navegar a la ruta correspondiente
  { icon: FolderGit2, label: 'Proyectos', path: '/proyectos'},
  { icon: Users, label: 'Clientes', path: '/clientes'},
  { icon: Network, label: 'Departamentos', path: '/departamentos'}
] // Array de objetos con los íconos y etiquetas de los elementos del menú lateral

const activeProjects = [
  { nombre: 'Proyecto A', fechaInicio: '2023-01-15', fechaEntrega: '2023-06-30', situacion: 'En progreso', cliente: 'Cliente X', estado: 'Activo', costo: '$50,000' },
  { nombre: 'Proyecto B', fechaInicio: '2023-02-01', fechaEntrega: '2023-08-31', situacion: 'Retrasado', cliente: 'Cliente Y', estado: 'Activo', costo: '$75,000' },
  { nombre: 'Proyecto C', fechaInicio: '2023-03-10', fechaEntrega: '2023-07-15', situacion: 'A tiempo', cliente: 'Cliente Z', estado: 'Activo', costo: '$60,000' },
  { nombre: 'Proyecto C', fechaInicio: '2023-03-10', fechaEntrega: '2023-07-15', situacion: 'A tiempo', cliente: 'Cliente Z', estado: 'Activo', costo: '$60,000' },
]

const projectStatusData = [
    { name: 'Completed', value: 30 },
    { name: 'In Progress', value: 45 },
    { name: 'Pending', value: 25 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function TareasPage() {
    const location = useLocation(); // Obtenemos la ruta actual para resaltar el elemento activo de la barra lateral
    const [activeItem, setActiveItem] = useState<string>("");
    const [employee, setEmployee] = useState<any>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const codEmpleado = localStorage.getItem('code');
          if (codEmpleado) {
            const codEmpleadoNumber = Number(codEmpleado);
            const empleadoData = await getEmpleadoData(codEmpleadoNumber);
            setEmployee(empleadoData);
          } else {
            setError("No se encontró el código del empleado.");
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow">
          <h2 className="text-3xl font-semibold text-white whitespace-nowrap">Gestión de proyectos</h2>
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
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Proyectos Activos</CardTitle>
                <CardDescription className="text-gray-400">Lista de proyectos en curso</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-700">
                      <TableHead className="text-gray-200 text-base font-bold">Nombre</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Fecha Inicio</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Fecha Entrega</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Situación</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Cliente</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Estado</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Costo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeProjects.map((project) => (
                      <TableRow key={project.nombre}>
                        <TableCell className="text-gray-300 text-base">{project.nombre}</TableCell>
                        <TableCell className="text-gray-300 text-base">{project.fechaInicio}</TableCell>
                        <TableCell className="text-gray-300 text-base">{project.fechaEntrega}</TableCell>
                        <TableCell className="text-gray-300 text-base">{project.situacion}</TableCell>
                        <TableCell className="text-gray-300 text-base">{project.cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{project.estado}</TableCell>
                        <TableCell className="text-gray-300 text-base">{project.costo}</TableCell>
                      </TableRow>
                    ))}
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