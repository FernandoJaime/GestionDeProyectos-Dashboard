import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Users, Network, CircleUserRound, FolderGit2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getEmpleadoData, getDepartamentosGraficos, getDepartamentosTotal } from '../api';

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard' },
  { icon: FolderGit2, label: 'Proyectos', path: '/proyectos' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: Network, label: 'Departamentos', path: '/departamentos' }
];

export function DepartamentosPage() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>("");
  const [departamentosTotal, setDepartamentosTotal] = useState<any[]>([]);
  const [employee, setEmployee] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [departamentosGraficos, setDepartamentosGraficos] = useState<any>(null);

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

  useEffect(() => {
    const fetchGraficos = async () => {
      try {
        const graficosData = await getDepartamentosGraficos();
        setDepartamentosGraficos(graficosData);
        console.log(graficosData);
      } catch (error) {
        setError("Error al obtener los gráficos de departamentos.");
        console.error(error);
      }
    };
    fetchGraficos();
  }, []);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const totalData = await getDepartamentosTotal();
        setDepartamentosTotal(totalData);
        console.log(totalData);
      } catch (error) {
        setError("Error al obtener el total de departamentos.");
        console.error(error);
      }
    };
    fetchTotal();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const userLogin = employee
    ? [
        {
          Icon: CircleUserRound,
          name: `${employee.nom_empleado} ${employee.ape_empleado}`,
        },
      ]
    : [];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 shadow-md">
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <Link to={item.path} key={item.label}>
              <button
                className={`flex items-center w-full px-4 py-2 text-left ${
                  location.pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setActiveItem(item.label)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow">
          <h2 className="text-3xl font-semibold text-white">Gestión de proyectos</h2>
          <div className="flex items-center space-x-2">
            {userLogin.map((user, index) => (
              <div key={index} className="flex items-center space-x-1">
                <user.Icon className="w-6 h-6 text-gray-200" />
                <span className="text-gray-200">{user.name}</span>
              </div>
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {/* Contenedor para los dos gráficos */}
          <div className="flex space-x-6">
            {/* Radar Chart */}
            <Card className="flex-1 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Resumen por Departamento</CardTitle>
                <CardDescription className="text-gray-400">Comparación de costos, duración, y proyectos</CardDescription>
              </CardHeader>
              <CardContent>
                {departamentosGraficos ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={departamentosGraficos['radar_data']}>
                      <PolarGrid stroke="#4B5563" />
                      <PolarAngleAxis dataKey="departamento" stroke="#9CA3AF" />
                      <PolarRadiusAxis />
                      <Radar name="Costo Total" dataKey="costo_total" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      <Radar name="Duración Total" dataKey="duracion_total" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-gray-400">Cargando datos...</div>
                )}
              </CardContent>
            </Card>

            {/* Scatter Chart */}
            <Card className="flex-1 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Relación entre Costo y Duración</CardTitle>
                <CardDescription className="text-gray-400">Costo vs. duración para cada departamento</CardDescription>
              </CardHeader>
              <CardContent>
                {departamentosGraficos ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                      <XAxis dataKey="x" name="Costo Total" stroke="#9CA3AF" />
                      <YAxis dataKey="y" name="Duración Total" stroke="#9CA3AF" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter name="Departamentos" data={departamentosGraficos['scatter_data']} fill="#F97316" />
                    </ScatterChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-gray-400">Cargando datos...</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Departamentos */}
          <div className="grid grid-cols-1 gap-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Departamentos</CardTitle>
                <CardDescription className="text-gray-400">Información de los departamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-700"></TableRow>
                      <TableHead className="text-gray-200 text-base font-bold">Nombre</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Empleados</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold">Proyectos</TableHead>
                  </TableHeader>
                  <TableBody>
                    {departamentosTotal && departamentosTotal.map((departamento) => (
                      <TableRow key={departamento.cod_departamento}>
                        <TableCell className="text-gray-300 text-base">{departamento.nom_departamento}</TableCell>
                        <TableCell className="text-gray-300 text-base">{departamento.empleados_count}</TableCell>
                        <TableCell className="text-gray-300 text-base">{departamento.proyectos_count}</TableCell>
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
  );
}