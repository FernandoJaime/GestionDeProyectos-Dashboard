import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Users, Network, CircleUserRound, FolderGit2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { getEmpleadoData, getClientes, getProyectosCliente } from '../api'; 

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard'}, // path se usa para navegar a la ruta correspondiente
  { icon: FolderGit2, label: 'Proyectos', path: '/proyectos'},
  { icon: Users, label: 'Clientes', path: '/clientes'},
  { icon: Network, label: 'Departamentos', path: '/departamentos'}
] // Array de objetos con los íconos y etiquetas de los elementos del menú lateral

const COLORS = ['#00C49F', '#e8e220', '#ff5842', '#0088FE']; // Colores para el gráfico de torta

export function ClientesPage() {
  const location = useLocation(); // Obtenemos la ruta actual para resaltar el elemento activo de la barra lateral
  const [activeItem, setActiveItem] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [clientesData, setClientesData] = useState<any[]>([]);
  const [employee, setEmployee] = useState<any>(null);
  const [proyectosData, setProyectosData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");


  const filteredProyectos = selectedClient
  ? proyectosData.filter((proyecto) => {
      console.log(`Comparando proyecto cod_cliente ${proyecto.cod_cliente} con selectedClient ${selectedClient}`);
      return proyecto.cod_cliente === selectedClient;
    })
  : [];

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientesData(data);
      } catch (error) {
        setError("Error al obtener los datos de clientes.");
        console.error(error);
      }
    };
    fetchClientes();
  }, []);

  const fetchProyectos = async (clientId: string) => {
    try {
      const data = await getProyectosCliente(clientId);
      setProyectosData(data);
      console.log(data);
    } catch (error) {
      setError("Error al obtener los datos de proyectos.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedClient) {
      fetchProyectos(selectedClient);
    }
  }, [selectedClient]);

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


  // Datos para el gráfico de torta
  const pieChartData = useMemo(() => {
    const counts = { completado: 0, proceso: 0, cancelado: 0, pendiente: 0 };
    filteredProyectos.forEach(proyecto => {
      if (proyecto.estado === 'Completado') counts.completado++;
      else if (proyecto.estado === 'En Proceso') counts.proceso++;
      else if (proyecto.estado === 'Cancelado') counts.cancelado++;
      else if (proyecto.estado === 'Pendiente') counts.pendiente++;
    });
    return [
      { name: 'Completado', value: counts.completado },
      { name: 'En Proceso', value: counts.proceso },
      { name: 'Cancelado', value: counts.cancelado },
      { name: 'Pendiente', value: counts.pendiente }
    ];
  }, [filteredProyectos]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const userLogin = employee
    ? [{ Icon: CircleUserRound, name: `${employee.nom_empleado} ${employee.ape_empleado}` }]
    : [];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 shadow-md">
        <div className="p-3">
          <p className="p-0.5 text-gray-800">pa que coincida</p>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) =>
            item.path ? (
              <Link to={item.path} key={item.label}>
                <button
                  className={`flex items-center w-full px-4 py-2 text-left ${
                    location.pathname === item.path
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setActiveItem(item.label)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </Link>
            ) : (
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
          )}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow">
          <h2 className="text-3xl font-semibold text-white whitespace-nowrap">Gestión de proyectos</h2>
          <div className="flex items-center">
            {userLogin.map((user, index) => (
              <div key={index} className="flex items-center space-x-1">
                <user.Icon className="w-6 h-6 text-gray-200" />
                <span className="text-gray-200">{user.name}</span>
              </div>
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {/* Gráfico de Torta */}
          {selectedClient ? (

          <div className="mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Estado de Proyectos del Cliente</CardTitle>
                <CardDescription className="text-gray-400">Proyectos Completados, En Proceso , Pendientes y Cancelados</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
         ) : (
          <div className="mb-6 text-gray-400">Seleccione un cliente para ver el estado de sus proyectos.</div>
        )}

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
                      <TableHead className="text-gray-200 text-base font-bold">Tiempo</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Estado</TableHead>
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
                        <TableCell className={`text-gray-300 text-base ${proyecto.tiempo === 'Atrasado' ? 'text-red-500' : proyecto.tiempo === 'A tiempo' ? 'text-green-500' : proyecto.tiempo === 'Entregado' ? 'text-blue-500' : ''}`}>{proyecto.tiempo}</TableCell>
                        <TableCell className={`text-gray-300 text-base ${proyecto.estado === 'Cancelado' ? 'text-red-500' : proyecto.estado === 'Completado' ? 'text-green-500' : proyecto.estado === 'En Proceso' ? 'text-yellow-500' : proyecto.estado === 'Pendiente' ? 'text-blue-500' : ''}`}>{proyecto.estado}</TableCell>
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