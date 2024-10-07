import { useState } from 'react' // Hook de react para manejar estados de componentes

import { Layout, Users, Network, SquareCheckBig, CircleUserRound} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

const sidebarItems = [
  { icon: Layout, label: 'Dashboard' },
  { icon: Users, label: 'Clientes' },
  { icon: Network, label: 'Departamentos' },
  { icon: SquareCheckBig, label: 'Tareas' },
] // Array de objetos con los íconos y etiquetas de los elementos del menú lateral

const activeProjects = [
  { nombre: 'Proyecto A', fechaInicio: '2023-01-15', fechaEntrega: '2023-06-30', situacion: 'En progreso', cliente: 'Cliente X', estado: 'Activo', costo: '$50,000' },
  { nombre: 'Proyecto B', fechaInicio: '2023-02-01', fechaEntrega: '2023-08-31', situacion: 'Retrasado', cliente: 'Cliente Y', estado: 'Activo', costo: '$75,000' },
  { nombre: 'Proyecto C', fechaInicio: '2023-03-10', fechaEntrega: '2023-07-15', situacion: 'A tiempo', cliente: 'Cliente Z', estado: 'Activo', costo: '$60,000' },
] // Array de objetos con información de proyectos activos

const mainClients = [
  { codigo: 'CLT001', nombre: 'Empresa ABC', email: 'contacto@abc.com', telefono: '+1234567890', direccion: 'Calle Principal 123, Ciudad' },
  { codigo: 'CLT002', nombre: 'Corporación XYZ', email: 'info@xyz.com', telefono: '+0987654321', direccion: 'Avenida Central 456, Metrópolis' },
  { codigo: 'CLT003', nombre: 'Industrias 123', email: 'ventas@123.com', telefono: '+1122334455', direccion: 'Plaza Mayor 789, Villa' },
] // Array de objetos con información de clientes principales

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
] // Datos de ventas mensuales, usados para el gráfico de líneas que muestra el rendimiento de ventas

const userActivityData = [
  { name: 'Mon', active: 3000, new: 1400 },
  { name: 'Tue', active: 3500, new: 1200 },
  { name: 'Wed', active: 4000, new: 1600 },
  { name: 'Thu', active: 3700, new: 1300 },
  { name: 'Fri', active: 3900, new: 1500 },
  { name: 'Sat', active: 3300, new: 1000 },
  { name: 'Sun', active: 3000, new: 900 },
] // Datos de actividad del usuario durante la semana, que se mostrarán en un gráfico de barras

const userLogin = [
  { Icon: CircleUserRound, name: 'John Doe'},
] // Datos de inicio de sesión del usuario

const projectStatusData = [
  { name: 'Completed', value: 30 },
  { name: 'In Progress', value: 45 },
  { name: 'Pending', value: 25 },
] // Estado de los proyectos en forma de porcentaje, usado para el gráfico torta

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'] // Array de colores para los segmentos del gráfico torta

export function DashboardPage() {

  // Este estado determina qué elemento de la barra lateral está seleccionado
  const [activeItem, setActiveItem] = useState('Dashboard')

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
          {sidebarItems.map((item) => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Tarjeta con el gráfico de lineas de ventas */}
            <Card className="bg-gray-800 border-gray-700">
              
              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <CardTitle className="text-white">Sales Overview</CardTitle>
                <CardDescription className="text-gray-400">Monthly sales data</CardDescription>
              </CardHeader>
              
              {/* Contenido de la tarjeta */}
              <CardContent>
                {/* Se agarra de los datos de 'salesData' */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" /> {/* Esto agrega una cuadrícula al gráfico */}
                    <XAxis dataKey="name" stroke="#9CA3AF" /> {/* Esto agrega el eje X con los nombres de los meses */}
                    <YAxis stroke="#9CA3AF" /> {/* Esto agrega el eje Y con color */}
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#F3F4F6' }} /> {/* Esto cambia el estilo del tooltip que es el cuadrito cuando pones el mouse arriba */}
                    <Legend />  
                    <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} /> {/* Esto agrega la línea de ventas con color y grosor */}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>

            </Card>

            {/* Tarjeta con el gráfico de barras de actividad de usuarios */}
            <Card className="bg-gray-800 border-gray-700">
              
              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <CardTitle className="text-white">User Activity</CardTitle>
                <CardDescription className="text-gray-400">Weekly active and new users</CardDescription>
              </CardHeader>

              {/* Contenido de la tarjeta */}
              <CardContent>
                {/* Se agarra de los datos de 'userActivityData' */}
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" /> {/* Esto agrega una cuadrícula al gráfico */}
                    <XAxis dataKey="name" stroke="#9CA3AF" /> {/* Esto agrega el eje X con los nombres de los días */}
                    <YAxis stroke="#9CA3AF" /> {/* Esto agrega el eje Y con color */}
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#F3F4F6' }} /> {/* Esto cambia el estilo del tooltip que es el cuadrito cuando pones el mouse arriba */}
                    <Legend /> 
                    <Bar dataKey="active" fill="#3B82F6" /> {/* Esto agrega la barra de actividad de usuarios activos */}
                    <Bar dataKey="new" fill="#10B981" /> {/* Esto agrega la barra de actividad de usuarios nuevos */}
                  </RechartsBarChart> 
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tarjeta con el gráfico torta de estado de proyectos */}
            <Card className="bg-gray-800 border-gray-700">
              
              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <CardTitle className="text-white">Project Status</CardTitle>
                <CardDescription className="text-gray-400">Distribution of project statuses</CardDescription>
              </CardHeader>

              {/* Contenido de la tarjeta */}
              <CardContent>
                {/* Se agarra de los datos de 'projectStatusData' */}
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%" // Esto centra el gráfico en el contenedor
                      cy="50%" // Esto centra el gráfico en el contenedor
                      labelLine={false} // Esto quita las líneas que conectan los segmentos con las etiquetas
                      outerRadius={80} // Esto cambia el tamaño del gráfico
                      fill="#8884d8" // Esto cambia el color del gráfico
                      dataKey="value" // Esto determina qué valor se usa para calcular el tamaño de los segmentos
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Esto muestra el nombre y el porcentaje de cada segmento
                    >
                      {projectStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))} {/* Esto asigna un color a cada segmento del gráfico, segun los colores definidos arriba */}
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
                  </RechartsPieChart>
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
                <CardTitle className="text-white">Proyectos Activos</CardTitle>
                <CardDescription className="text-gray-400">Lista de proyectos en curso</CardDescription>
              </CardHeader>

              {/* Contenido de la tarjeta */}
              <CardContent>
                <Table>
                  {/* Encabezados de la tabla */}
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

                  {/* Cuerpo de la tabla */}
                  <TableBody>
                    {/* Mapeamos los datos de 'activeProjects' y generamos filas con la información de cada proyecto */}
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
              
            {/* Tarjeta con la lista de clientes principales */}
            <Card className="bg-gray-800 border-gray-700">

              {/* Encabezado de la tarjeta */}
              <CardHeader>
                <CardTitle className="text-white">Clientes Principales</CardTitle>
                <CardDescription className="text-gray-400">Información de clientes clave</CardDescription>
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
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {mainClients.map((client) => (
                      <TableRow key={client.codigo}>
                        <TableCell className="text-gray-300 text-base">{client.codigo}</TableCell>
                        <TableCell className="text-gray-300 text-base">{client.nombre}</TableCell>
                        <TableCell className="text-gray-300 text-base">{client.email}</TableCell>
                        <TableCell className="text-gray-300 text-base">{client.telefono}</TableCell>
                        <TableCell className="text-gray-300 text-base">{client.direccion}</TableCell>
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