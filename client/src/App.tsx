import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ClientesPage } from './pages/ClientesPage'  // Importamos la página Clientes
import { DepartamentosPage } from './pages/DepartamentosPage'  // Importamos la página Departamentos

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/clientes" element={<ClientesPage />} />  {/* Nueva ruta para Clientes */}
      <Route path="/departamentos" element={<DepartamentosPage />} />  {/* Nueva ruta para Departamentos */}
    </Routes>
  </BrowserRouter>
  )
}

export default App;