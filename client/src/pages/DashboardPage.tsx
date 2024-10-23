import { useState, useEffect } from 'react' // Hook de react para manejar estados de componentes

import { Link, useLocation } from 'react-router-dom';  // Importa Link para manejar la navegación

import { Layout, Users, Network, FolderGit2, CircleUserRound, CheckCircle, Clock, XCircle, AlertCircle, ThumbsUp} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import { getProyectosEnProceso, getClientesPrincipales, getProyectosEstadoGanancia, getProyectosIniciados, getEmpleadoData } from '../api';  // Importar la nueva función

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard'}, // path se usa para navegar a la ruta correspondiente
  { icon: FolderGit2, label: 'Proyectos', path: '/proyectos'},
  { icon: Users, label: 'Clientes', path: '/clientes'},
  { icon: Network, label: 'Departamentos', path: '/departamentos'}
] // Array de objetos con los íconos y etiquetas de los elementos del menú lateral

export function DashboardPage() {

  // Este estado determina qué elemento de la barra lateral está seleccionado
  const location = useLocation(); // Obtenemos la ruta actual para resaltar el elemento activo de la barra lateral
  const [activeItem, setActiveItem] = useState<string>("");
  const [employee, setEmployee] = useState<any>(null);

  const [proyectos, setProyectos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [proyectosEstadoGanancia, setProyectosEstadoGanancia] = useState<any[]>([]);
  const [proyectosIniciados, setProyectosIniciados] = useState<any[]>([]);
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

        const proyectosData = await getProyectosEnProceso();
        const clientesData = await getClientesPrincipales();
        const proyectosEstadoGananciaData = await getProyectosEstadoGanancia();
        const proyectosIniciadosData = await getProyectosIniciados();
        setProyectos(proyectosData);
        setClientes(clientesData);

        const ChartData = proyectosEstadoGananciaData.map((proyecto: any) => ({
          name: proyecto.estado,
          cantidad: proyecto.cantidad,
          ganancia: proyecto.ganancia,
        }));
        setProyectosEstadoGanancia(ChartData);

        const ChartData2 = proyectosIniciadosData.map((proyecto: any) => ({
          name: proyecto.mes,
          cantidad: proyecto.cantidad
        }));
        setProyectosIniciados(ChartData2);

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

          {/* Disposición en cuadrícula con tres columnas (los 3 graficos pongo aca) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Tarjeta con el gráfico de lineas */}
            <Card className="bg-gray-800 border-gray-700">
              
              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <CardTitle className="text-white text-xl">Proyectos iniciados</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Se observa la cantidad de proyectos que se inician por mes
                </CardDescription>
              </CardHeader>
              
              {/* Contenido de la tarjeta */}
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={proyectosIniciados}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" /> {/* Esto agrega una cuadrícula al gráfico */}
                    <XAxis dataKey="name" stroke="#9CA3AF" /> {/* Esto agrega el eje X con los nombres de los meses */}
                    <YAxis stroke="#9CA3AF" /> {/* Esto agrega el eje Y con color */}
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#F3F4F6', borderRadius: '8px', }} /> {/* Esto cambia el estilo del tooltip que es el cuadrito cuando pones el mouse arriba */}
                    <Legend />  
                    <Line type="monotone" dataKey="cantidad" name='Cantidad de proyectos' stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} /> {/* Esto agrega la línea de cantidad con color y grosor */}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tarjeta con el gráfico de barras */}
            <Card className="w-full max-w-3xl bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Proyectos por estado y ganancia</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Se observa la cantidad de proyectos por estado y su respectiva ganancia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsBarChart
                    data={proyectosEstadoGanancia}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis yAxisId="left" orientation="left" stroke="#9CA3AF" />
                    <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        color: '#F3F4F6',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="cantidad"
                      yAxisId="left"
                      name="Cantidad de proyectos"
                      fill="#0088FE" // Color azul para la barra de cantidad
                    />
                    <Bar
                      dataKey="ganancia"
                      yAxisId="right"
                      name="Ganancia"
                      fill="#00C49F" // Color verde para la barra de ganancia
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Disposición en cuadrícula con dos columnas (los 2 tablas pongo aca) */}
          <div className="grid grid-cols-1 gap-6">

            {/* Tarjeta con la lista de proyectos activos */}
            <Card className="bg-gray-800 border-gray-700">
              
              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <CardTitle className="text-white text-xl">Proyectos activos</CardTitle>
                <CardDescription className="text-gray-400 text-base">Lista de los proyectos que estan actualmente en proceso</CardDescription>
              </CardHeader>

              {/* Contenido de la tarjeta */}
              <CardContent>
                <Table>
                  {/* Encabezados de la tabla */}
                  <TableHeader>
                    <TableRow className="bg-gray-700">
                      <TableHead className="text-gray-200 text-base font-bold">Nombre</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Descripcion</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Situación</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Cliente</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Estado</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Ganancia</TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* Cuerpo de la tabla */}
                  <TableBody>
                    {/* Mapeamos los datos de 'activeProjects' y generamos filas con la información de cada proyecto */}
                    {proyectos.map((proyecto) => {
                      const { color, icon } = getEstadoInfo(proyecto.cod_estado);
                      const { colorTiempo, iconTiempo } = getTiempoInfo(proyecto.cod_tiempo);
                      return (
                        <TableRow key={proyecto.cod_proyecto}>
                          <TableCell className="text-gray-300 text-base">{proyecto.nom_proyecto}</TableCell>
                          <TableCell className="text-gray-300 text-base">{proyecto.desc_proyecto}</TableCell>
                          <TableCell className={`text-base py-2 px-4 flex items-center ${colorTiempo}`}>{iconTiempo}
                            <span className="ml-2">{proyecto.cod_tiempo}</span>
                          </TableCell>
                          <TableCell className="text-gray-300 text-base w-1/15">{proyecto.cod_cliente}</TableCell>
                          <TableCell className={`text-base py-2 px-4 flex items-center ${color}`}>{icon}
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
              
            {/* Tarjeta con la lista de clientes principales */}
            <Card className="bg-gray-800 border-gray-700">

              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <CardTitle className="text-white text-xl">Clientes principales</CardTitle>
                <CardDescription className="text-gray-400 text-base">Información de los cinco clientes principales de la empresa</CardDescription>
              </CardHeader>

              {/* Contenido de la tarjeta*/}
              <CardContent>
                <Table>

                  {/* Todo lo mismo que la tabala de arriba */}
                  <TableHeader>
                    <TableRow className="bg-gray-700">
                      <TableHead className="text-gray-200 text-base font-bold">Código</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Nombre</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Email</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Teléfono</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Dirección</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Cantidad de proyectos</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {clientes.map((cliente) => (
                      <TableRow key={cliente.cod_cliente}>
                        <TableCell className="text-gray-300 text-base">{cliente.cod_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.nom_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.email_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.tel_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.direc_cliente}</TableCell>
                        <TableCell className="text-gray-300 text-base">{cliente.cantidad_proyectos}</TableCell>
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