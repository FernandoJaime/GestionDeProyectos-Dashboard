from django.urls import path
from rest_framework.documentation import include_docs_urls
from .viewsLogin import login, logout
from .viewsEmpleado import get_empleados, get_empleado, crear_empleado, get_empleados_departamento
from .viewsTareas import get_tareas_emp, get_tareas_proyecto, get_tareas_porcentaje_estados
from .viewsProyectos import get_proyectos_enproceso, get_proyectos_estados_ganancia, get_proyecto_iniciados, get_proyectos, get_proyecto_terminados_ganancia, get_proyectos_porcentaje_estados, get_proyecto
from .viewsClientes import get_clientes_principales, get_clientes,get_cliente_proyectos
from .viewsDepartamentos import get_departamentos_total, get_departamentos_graficos
urlpatterns = [
# Cliente
path('clientes/principales', get_clientes_principales, name='clientes_principales'),
path('clientes', get_clientes, name='clientes'),
path('cliente/proyectos/<int:id>', get_cliente_proyectos, name='cliente_proyectos'),

# Login
path('login', login, name='login'),
path('logout', logout, name='logout'),

# Departamento
path('empleados/departamento/<int:id>', get_empleados_departamento, name='empleados_departamento'),

# Empleado
path('empleados', get_empleados, name='empleados'),
path('empleado/<int:id>', get_empleado, name='empleado'),
path('empleado/tareas/<int:id>', get_tareas_emp, name='tareas_empleado'),
path('empleado/crear', crear_empleado, name='crear_empleado'),

# Proyecto
path('docs', include_docs_urls(title='Documentación API de Gestión de Proyectos')),
path('proyectos/enproceso', get_proyectos_enproceso, name='proyectos_enproceso'),
path('proyectos/estados_ganancia', get_proyectos_estados_ganancia, name='proyectos_estados_ganancia'),
path('proyectos/iniciados', get_proyecto_iniciados, name='proyectos_iniciados'),
path('proyectos', get_proyectos, name='proyectos'),
path('proyectos/terminados_ganancia', get_proyecto_terminados_ganancia, name='proyectos_terminados_ganancia'),
path('proyectos/porcentaje_estados', get_proyectos_porcentaje_estados, name='proyectos_porcentaje_estados'),
path('proyecto/<int:id>', get_proyecto, name='proyecto'),
path('proyecto/tareas/<int:id>', get_tareas_proyecto, name='tareas_proyecto'),

# Departamento
path('departamentos/total', get_departamentos_total, name='departamentos'),
path('departamentos/graficos', get_departamentos_graficos, name='departamentos_graficos'),
# Tareas
path('tareas/porcentaje_estados/<int:id>', get_tareas_porcentaje_estados, name='tareas_porcentaje_estados')
]
