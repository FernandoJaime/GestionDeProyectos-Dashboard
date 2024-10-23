import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Users, Network, CircleUserRound, FolderGit2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getEmpleadoData } from '../api'; 

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard'}, // path se usa para navegar a la ruta correspondiente
  { icon: FolderGit2, label: 'Proyectos', path: '/proyectos'},
  { icon: Users, label: 'Clientes', path: '/clientes'},
  { icon: Network, label: 'Departamentos', path: '/departamentos'}
] // Array de objetos con los íconos y etiquetas de los elementos del menú lateral

const clientesData = [
  { cod_cliente: 'C001', nom_cliente: 'Empresa ABC', email_cliente: 'contacto@abc.com', tel_cliente: '+1234567890', direc_cliente: 'Calle Principal 123, Ciudad' },
  { cod_cliente: 'C002', nom_cliente: 'Corporación XYZ', email_cliente: 'info@xyz.com', tel_cliente: '+0987654321', direc_cliente: 'Avenida Central 456, Metrópolis' },
  { cod_cliente: 'C003', nom_cliente: 'Industrias 123', email_cliente: 'ventas@123.com', tel_cliente: '+1122334455', direc_cliente: 'Plaza Mayor 789, Villa' },
]

const proyectosData = [
  { cod_proyecto: 'P001', nom_proyecto: 'Proyecto A', desc_proyecto: 'Desarrollo de software', fecha_inicio: '2023-01-15', fecha_entrega: '2023-06-30', cod_tiempo: 'T001', cod_cliente: 'C001', cod_estado: 'E001' },
  { cod_proyecto: 'P002', nom_proyecto: 'Proyecto B', desc_proyecto: 'Implementación de red', fecha_inicio: '2023-02-01', fecha_entrega: '2023-08-31', cod_tiempo: 'T002', cod_cliente: 'C001', cod_estado: 'E002' },
  { cod_proyecto: 'P003', nom_proyecto: 'Proyecto C', desc_proyecto: 'Consultoría de procesos', fecha_inicio: '2023-03-10', fecha_entrega: '2023-07-15', cod_tiempo: 'T003', cod_cliente: 'C002', cod_estado: 'E001' },
  { cod_proyecto: 'P004', nom_proyecto: 'Proyecto D', desc_proyecto: 'Desarrollo de app móvil', fecha_inicio: '2023-04-01', fecha_entrega: '2023-09-30', cod_tiempo: 'T004', cod_cliente: 'C003', cod_estado: 'E003' },
]

const userActivityData = [
  { name: 'Mon', active: 3000, new: 1400 },
  { name: 'Tue', active: 3500, new: 1200 },
  { name: 'Wed', active: 4000, new: 1600 },
  { name: 'Thu', active: 3700, new: 1300 },
  { name: 'Fri', active: 3900, new: 1500 },
  { name: 'Sat', active: 3300, new: 1000 },
  { name: 'Sun', active: 3000, new: 900 },
]

export function ClientesPage() {
  const location = useLocation(); // Obtenemos la ruta actual para resaltar el elemento activo de la barra lateral
  const [activeItem, setActiveItem] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [employee, setEmployee] = useState<any>(null);
  const [error, setError] = useState<string>("");


  const filteredProyectos = selectedClient
    ? proyectosData.filter(proyecto => proyecto.cod_cliente === selectedClient)
    : []

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
                <CardTitle className="text-white">User Activity</CardTitle>
                <CardDescription className="text-gray-400">Weekly active and new users</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#F3F4F6', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="active" fill="#3B82F6" />
                    <Bar dataKey="new" fill="#10B981" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Clientes</CardTitle>
                <CardDescription className="text-gray-400">Información de clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-700">
                      <TableHead className="text-gray-200 text-base font-bold">Código</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Nombre</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Email</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Teléfono</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Dirección</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientesData.map((cliente) => (
                      <TableRow 
                        key={cliente.cod_cliente} 
                        className={`cursor-pointer ${selectedClient === cliente.cod_cliente ? 'bg-gray-700' : ''}`}
                        onClick={() => setSelectedClient(cliente.cod_cliente)}
                      >
                        <TableCell className="text-gray-300 text-base">{cliente.cod_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.nom_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.email_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.tel_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.direc_cliente}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Proyectos del Cliente</CardTitle>
                <CardDescription className="text-gray-400">
                  {selectedClient ? `Proyectos del cliente ${selectedClient}` : 'Seleccione un cliente para ver sus proyectos'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-700">
                      <TableHead className="text-gray-200 text-base font-bold">Código</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Nombre</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Descripción</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Fecha Inicio</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Fecha Entrega</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Código Tiempo</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Código Cliente</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Código Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProyectos.map((proyecto) => (
                      <TableRow key={proyecto.cod_proyecto}>
                        <TableCell className="text-gray-300 text-base">{proyecto.cod_proyecto}</TableCell>
                        <TableCell className="text-gray-300 text-base">{proyecto.nom_proyecto}</TableCell>
                        <TableCell className="text-gray-300 text-base">{proyecto.desc_proyecto}</TableCell>
                        <TableCell className="text-gray-300 text-base">{proyecto.fecha_inicio}</TableCell>
                        <TableCell className="text-gray-300 text-base">{proyecto.fecha_entrega}</TableCell>
                        <TableCell className="text-gray-300 text-base">{proyecto.cod_tiempo}</TableCell>
                        <TableCell className="text-gray-300 text-base">{proyecto.cod_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{proyecto.cod_estado}</TableCell>
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