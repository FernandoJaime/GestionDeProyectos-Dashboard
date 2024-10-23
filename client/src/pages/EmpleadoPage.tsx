import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserCircle, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from 'react';
import { getEmpleadoData, getEmpleadoTareas } from '../api';  // Importar la nueva función

export function EmpleadoPage() {
  const [employee, setEmployee] = useState<any>(null);
  const [tareas, setTareas] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEmpleadoData = async () => {
      try {
        const codEmpleado = localStorage.getItem('code');

        if (codEmpleado) {
          const codEmpleadoNumber = Number(codEmpleado);
          const empleadoData = await getEmpleadoData(codEmpleadoNumber);
          const tareasData = await getEmpleadoTareas(codEmpleadoNumber);
          setEmployee(empleadoData);
          setTareas(tareasData);
        } else {
          setError("No se encontró el código del empleado.");
        }
      } catch (error) {
        setError("Error al obtener los datos del empleado.");
        console.error(error);
      }
    };

    fetchEmpleadoData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>Cargando datos del empleado...</div>;
  }

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

  const calcularEdad = (fechaNacimiento: string) => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();

    if (
      diferenciaMeses < 0 || 
      (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }

    return edad;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-900 text-gray-100 min-h-screen">
      <div className="w-full lg:w-auto lg:min-w-[400px]">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center space-x-4">
            <UserCircle className="w-10 h-10 text-blue-500" />
            <CardTitle className="text-white text-2xl">Información de empleado</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex">
                <dt className="text-gray-400 w-1/2">Nombre:</dt>
                <dd className="text-white w-2/3">{employee.nom_empleado} {employee.ape_empleado}</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-400 w-1/2">Código:</dt>
                <dd className="text-gray-200 w-2/3">{employee.cod_empleado}</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-400 w-1/2">Edad:</dt>
                <dd className="text-gray-200 w-2/3">{calcularEdad(employee.fecha_nacimiento)} años</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-400 w-1/2">Email:</dt>
                <dd className="text-gray-200 w-2/3">{employee.email_empleado}</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-400 w-1/2">Telefono:</dt>
                <dd className="text-gray-200 w-2/3">{employee.tel_empleado}</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-400 w-1/2">Domicilio:</dt>
                <dd className="text-gray-200 w-2/3">{employee.direc_empleado}</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-400 w-1/2">Ingreso:</dt>
                <dd className="text-gray-200 w-2/3">{employee.fecha_creacion}</dd>
              </div>
              <div className="flex">
                <dt className="text-gray-400 w-1/2">Departamento:</dt>
                <dd className="text-gray-200 w-2/3">{employee.cod_departamento}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full lg:flex-grow bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-3xl">Lista de tareas</CardTitle>
          <CardDescription className="text-gray-400">Todas las tareas del departamento al que perteneces</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700 border-b border-gray-600">
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 border-r border-gray-600">Código</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 border-r border-gray-600">Nombre</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 border-r border-gray-600">Descripción</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-5 border-r border-gray-600">Costo</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 border-r border-gray-600">Duración</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 border-r border-gray-600">Proyecto</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4 border-r border-gray-600">Departamento</TableHead>
                  <TableHead className="text-gray-200 text-base font-bold py-3 px-4">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tareas.map((tarea, index) => {
                  const { color, icon } = getEstadoInfo(tarea.cod_estado);
                  return (
                    <TableRow key={tarea.cod_tarea} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} border-b border-gray-600`}>
                      <TableCell className="text-gray-300 text-base py-2 px-4 border-r border-gray-700">{tarea.cod_tarea}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 border-r border-gray-700">{tarea.nom_tarea}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 border-r border-gray-700">{tarea.desc_tarea}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 border-r border-gray-700">$ {tarea.costo_tarea}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 border-r border-gray-700">{tarea.duracion_tarea} min</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 border-r border-gray-700">{tarea.cod_proyecto}</TableCell>
                      <TableCell className="text-gray-300 text-base py-2 px-4 border-r border-gray-700">{tarea.cod_departamento}</TableCell>
                      <TableCell className={`text-base py-2 px-4 flex items-center ${color}`}>
                        {icon}
                        <span className="ml-2">{tarea.cod_estado}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}