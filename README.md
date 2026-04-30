<h1 align="center">📊 Gestion de proyectos</h1>

Aplicación web para la gestión, visualización y seguimiento de proyectos, tareas, empleados, clientes y departamentos. El sistema está orientado principalmente a consultas operativas y analíticas, con un dashboard visual que resume el estado general de la organización.

El proyecto está dividido en dos partes:

- **💻 Frontend** con React, TypeScript, Vite y Tailwind CSS.
- **⚙️ Backend** con Django REST Framework, JWT y MySQL.

## 📄 Características principales

- Inicio de sesión para empleados con autenticación JWT.
- Redirección según rol entre vista de administrador y vista de empleado.
- Dashboard administrativo con gráficos de proyectos iniciados, proyectos por estado, ganancia y clientes principales.
- Listado general de proyectos con cálculo de ganancia por tareas asociadas.
- Vista de detalle de tareas por proyecto con porcentaje por estado.
- Vista de perfil del empleado con sus datos personales y tareas del departamento.
- Listado de clientes y detalle de sus proyectos.
- Resumen de departamentos con métricas y gráficos de costos, duración y cantidad de tareas/proyectos.
- Documentación interactiva de la API en `/api/docs`.

## 🛠️ Tecnologías

### 💻 Frontend

- React 18.3
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- Radix UI
- Lucide React
- React Hook Form
- React Hot Toast
- Axios

### ⚙️ Backend

- Python
- Django 5.1.2
- Django REST Framework
- djangorestframework-simplejwt
- django-cors-headers
- bcrypt
- MySQL
- mysqlclient
- coreapi

## 🗃️ Estructura del proyecto

```text
GestionDeProyectos-Dashboard/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── dashboard_api/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   └── gestion_proyectos/
│       ├── models.py
│       ├── serializer.py
│       ├── decorators.py
│       ├── urls.py
│       ├── viewsLogin.py
│       ├── viewsEmpleado.py
│       ├── viewsProyectos.py
│       ├── viewsClientes.py
│       ├── viewsDepartamentos.py
│       └── viewsTareas.py
├── client/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── api.ts
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       └── pages/
│           ├── LoginPage.tsx
│           ├── DashboardPage.tsx
│           ├── ProyectosPage.tsx
│           ├── TareasPage.tsx
│           ├── ClientesPage.tsx
│           ├── DepartamentosPage.tsx
│           ├── EmpleadoPage.tsx
│           └── EmpleadosDepPage.tsx
├── db/
├── docs/
└── README.md
```

## 🧮 Módulos funcionales

- **Login:** autenticación de empleados con JWT y cookie `access_token`.
- **Dashboard:** visualización de proyectos activos, clientes principales y gráficos de desempeño.
- **Proyectos:** listado general, ganancias por proyecto y porcentaje por estado.
- **Tareas:** detalle de tareas por proyecto y distribución por estado.
- **Clientes:** listado de clientes y proyectos asociados.
- **Departamentos:** métricas de carga de trabajo, costos y duración.
- **Empleado:** vista personal con datos del usuario y tareas del departamento al que pertenece.

## 🗄️ Modelo de datos

El backend trabaja sobre las siguientes entidades principales:

- Rol
- Departamento
- Empleado
- Cliente
- Estado
- Tiempo
- Proyecto
- Tarea

El esquema de datos se encuentra definido en los modelos de Django dentro de `backend/gestion_proyectos/models.py`.

## 🛰️ API principal

Rutas montadas en el backend bajo el prefijo `/api/`:

- `/api/login`
- `/api/logout`
- `/api/empleados`
- `/api/empleado/<id>`
- `/api/empleado/crear`
- `/api/empleado/tareas/<id>`
- `/api/empleados/departamento/<id>`
- `/api/clientes`
- `/api/clientes/principales`
- `/api/cliente/proyectos/<id>`
- `/api/proyectos`
- `/api/proyectos/enproceso`
- `/api/proyectos/estados_ganancia`
- `/api/proyectos/iniciados`
- `/api/proyectos/terminados_ganancia`
- `/api/proyectos/porcentaje_estados`
- `/api/proyecto/<id>`
- `/api/proyecto/tareas/<id>`
- `/api/departamentos/total`
- `/api/departamentos/graficos`
- `/api/tareas/porcentaje_estados/<id>`
- `/api/docs`

## 🪪 Requisitos

- Node.js 18 o superior
- npm 9 o superior
- Python 3.10 o superior
- MySQL 8 o superior

## ⚙️ Configuración del backend

El proyecto usa una base de datos MySQL local y una clave secreta de Django definidas en `backend/dashboard_api/settings.py`.

Antes de ejecutar el entorno, revisá estos valores y adaptalos a tu instalación:

- nombre de la base de datos
- usuario de MySQL
- contraseña de MySQL
- host y puerto
- `SECRET_KEY`

## ⬇️ Instalación y ejecucion

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd GestionDeProyectos-Dashboard

# 2. Instalar dependencias del backend
cd backend
pip install -r requirements.txt

# 3. Preparar la base de datos
python manage.py migrate

# 4. Instalar dependencias del frontend
cd ../client
npm install

# Backend
cd backend
python manage.py runserver

# Frontend
cd client
npm run dev

# El backend queda disponible en http://127.0.0.1:8000 y el frontend en http://localhost:5173.
```

## 🔐 Autenticación y flujo de uso

- El login se realiza desde la pantalla de acceso con correo electrónico y contraseña.
- El backend valida las credenciales contra la tabla de empleados.
- Si el login es correcto, se devuelve un JWT y se guarda `access_token` en una cookie HttpOnly.
- El frontend también guarda el código del empleado en `localStorage` para consultar su perfil y sus vistas asociadas.
- Los administradores acceden al dashboard principal; los empleados son redirigidos a su vista personal.

---

<h3 align="center">Última actualización: Octubre 2024 </h3>