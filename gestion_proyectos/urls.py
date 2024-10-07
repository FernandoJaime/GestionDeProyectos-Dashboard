from django.urls import path
from rest_framework.documentation import include_docs_urls
from .viewsLogin import login, logout
from .viewsEmpleado import get_empleados, get_empleado, crear_empleado

urlpatterns = [
    path('docs', include_docs_urls(title='Documentación API de Gestión de Proyectos')),
    path('login', login, name='login'),
    path('logout', logout, name='logout'),
    path('empleados', get_empleados, name='empleados'),
    path('empleado/<int:id>', get_empleado, name='empleado'),
    path('empleado/crear', crear_empleado, name='crear_empleado'),
]
