import { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Layout, Users, Network, FolderGit2, CircleUserRound } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getEmpleadoData, getEmpleadosDepartamento } from '../api';

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard' }, // path se usa para navegar a la ruta correspondiente
  { icon: FolderGit2, label: 'Proyectos', path: '/proyectos' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: Network, label: 'Departamentos', path: '/departamentos' }
] // Array de objetos con los íconos y etiquetas de los elementos del menú lateral

export function EmpleadosDepPage() {
  const location = useLocation(); // Obtenemos la ruta actual para resaltar el elemento activo de la barra lateral
  const { id } = useParams();
  const [activeItem, setActiveItem] = useState<string>("");
  const [employee, setEmployee] = useState<any>(null);
  const [empleadosDepa, setEmpleadosDepa] = useState<any[]>([]);
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
          const departamentoData = await getEmpleadosDepartamento(Number(id));
          setEmpleadosDepa(departamentoData);
        }
        else {
          setError("No se encontró el código del departamento.");
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
          <h2 className="text-3xl font-semibold text-white whitespace-nowrap">
            {empleadosDepa.length > 0 && empleadosDepa[1]?.nom_departamento
              ? `Departamento - ${empleadosDepa[1].nom_departamento}`
              : 'Cargando...'}
          </h2>
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
          <div className="grid gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Empleados</CardTitle>
                <CardDescription className="text-gray-400 text-base">Lista de todos los empleados del departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-700 border-b">
                      <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Código</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Nombre</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Fecha nacimiento</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold py-3 px-5 ">Email</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Contacto</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Direccion</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold py-3 px-4 ">Ingreso</TableHead>
                      <TableHead className="text-gray-200 text-base font-bold py-3 px-4">Departamento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {empleadosDepa.map((emp) => {
                      return (
                        <TableRow key={emp.cod_empleado}>
                          <TableCell className="text-gray-300 text-base py-2 px-4 ">{emp.cod_empleado}</TableCell>
                          <TableCell className="text-gray-300 text-base py-2 px-4 ">{emp.nom_empledo} {emp.ape_empleado}</TableCell>
                          <TableCell className="text-gray-300 text-base py-2 px-4 ">{emp.fecha_nacimiento}</TableCell>
                          <TableCell className="text-gray-300 text-base py-2 px-4 ">{emp.email_empleado}</TableCell>
                          <TableCell className="text-gray-300 text-base py-2 px-4 ">{emp.tel_empleado}</TableCell>
                          <TableCell className="text-gray-300 text-base py-2 px-4 ">{emp.direc_empleado}</TableCell>
                          <TableCell className="text-gray-300 text-base py-2 px-4 ">{emp.fecha_creacion}</TableCell>
                          <TableCell className="text-gray-300 text-base py-2 px-4 ">{emp.nom_departamento}</TableCell>
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