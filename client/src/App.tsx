import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ClientesPage } from './pages/ClientesPage'  // Importamos la página Clientes
import { DepartamentosPage } from './pages/DepartamentosPage'  // Importamos la página Departamentos
import { EmpleadoPage } from './pages/EmpleadoPage'
import { ProyectosPage } from './pages/ProyectosPage'  // Importamos la página Proyectos
import { TareasPage } from './pages/TareasPage'
import { EmpleadosDepPage } from './pages/EmpleadosDepPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/clientes" element={<ClientesPage />} /> 
      <Route path="/departamentos" element={<DepartamentosPage />} />  
      <Route path="/empleado" element={<EmpleadoPage />} />
      <Route path="/proyectos" element={<ProyectosPage/>} />
      <Route path="/tareas/:id" element={<TareasPage/>}/>
      <Route path="/empleados/:id" element={<EmpleadosDepPage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;